"use client";

// Three.js scene — BridgeSense point-cloud bridge (GL-02, D-05)
// Procedural bridge shape: deck + arches + piers, ~3500 points with LiDAR-scan noise.
// Auto-rotates slowly (one full turn ~42 s). Single draw call via Points.
// Loaded via next/dynamic ssr:false from mdx-components.tsx (GL-03, D-06).
// GPU disposal on unmount (GL-05, D-07).
// Static SVG bridge-silhouette fallback under prefers-reduced-motion (GL-04).

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "@/lib/useReducedMotion";

// ── Pseudo-random helpers (seeded LCG) ─────────────────────────────────────

function makeLCG(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 1) / 0x7fffffff; // 0..1
  };
}

// ── Procedural bridge geometry ──────────────────────────────────────────────

function generateBridgePoints(): Float32Array {
  const rand = makeLCG(0xdeadbeef);
  const noise = () => (rand() - 0.5) * 0.04; // ±0.02 LiDAR-scan jitter

  const points: number[] = [];

  const add = (x: number, y: number, z: number) => {
    points.push(x + noise(), y + noise(), z + noise());
  };

  // ── Bridge deck — flat rectangular grid ──────────────────────────────────
  // Length: -5..5 (10 units), Width: -1..1 (2 units), y=0
  const DECK_LONG = 40;
  const DECK_WIDE = 16;
  for (let i = 0; i < DECK_LONG; i++) {
    for (let j = 0; j < DECK_WIDE; j++) {
      const x = -5 + (i / (DECK_LONG - 1)) * 10;
      const z = -1 + (j / (DECK_WIDE - 1)) * 2;
      add(x, 0, z);
    }
  }

  // ── Two parabolic arch supports (left side z=-0.9, right side z=0.9) ─────
  // Arch: y = h * (1 - (x / half)^2), spanning x=-4.5..4.5, height 2.5
  const ARCH_POINTS = 80;
  const archHalf = 4.5;
  const archH = 2.5;
  for (const zi of [-0.9, 0.9]) {
    for (let i = 0; i < ARCH_POINTS; i++) {
      const t = i / (ARCH_POINTS - 1); // 0..1
      const x = -archHalf + t * archHalf * 2;
      const y = archH * (1 - (x / archHalf) ** 2);
      add(x, y, zi);
    }
  }

  // ── Hangers — vertical lines from arch to deck ───────────────────────────
  // 10 hangers per arch side, every ~1 unit along the span
  const HANGER_COUNT = 10;
  const HANGER_PTS = 8;
  for (const zi of [-0.9, 0.9]) {
    for (let h = 0; h < HANGER_COUNT; h++) {
      const t = (h + 1) / (HANGER_COUNT + 1); // avoid endpoints
      const x = -archHalf + t * archHalf * 2;
      const archY = archH * (1 - (x / archHalf) ** 2);
      for (let p = 0; p < HANGER_PTS; p++) {
        const y = (p / (HANGER_PTS - 1)) * archY;
        add(x, y, zi);
      }
    }
  }

  // ── Pier supports — vertical columns at each end and centre ─────────────
  // Piers at x=-4.5, 0, 4.5 — below deck, y: -2..0, z: -1..1
  const PIER_LONG = 6;  // points along z
  const PIER_VERT = 10; // points along y
  for (const px of [-4.5, 0, 4.5]) {
    for (let zi = 0; zi < PIER_LONG; zi++) {
      for (let yi = 0; yi < PIER_VERT; yi++) {
        const z = -1 + (zi / (PIER_LONG - 1)) * 2;
        const y = -2 + (yi / (PIER_VERT - 1)) * 2;
        add(px, y, z);
      }
    }
  }

  // ── Abutment caps — horizontal caps at x=-5 and x=5 ────────────────────
  const CAP_WIDE = 8;
  const CAP_DEPTH = 4;
  for (const cx of [-5, 5]) {
    for (let zi = 0; zi < CAP_WIDE; zi++) {
      for (let xi = 0; xi < CAP_DEPTH; xi++) {
        const z = -1.2 + (zi / (CAP_WIDE - 1)) * 2.4;
        const x = cx + (cx < 0 ? -0.3 : 0) + (xi / (CAP_DEPTH - 1)) * 0.3 * (cx < 0 ? 1 : -1);
        add(x, 0.05, z);
      }
    }
  }

  return new Float32Array(points);
}

// ── Inner scene component ──────────────────────────────────────────────────

function BridgeScene() {
  const groupRef = useRef<THREE.Group>(null!);
  const pointsRef = useRef<THREE.Points>(null!);

  const positions = useMemo(() => generateBridgePoints(), []);

  // Auto-rotate: ~42 s per full turn
  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.15;
  });

  // GPU disposal on unmount (GL-05, D-07)
  // Capture ref value at effect time — ref may change before cleanup runs
  useEffect(() => {
    const points = pointsRef.current;
    return () => {
      if (points) {
        points.geometry?.dispose();
        (points.material as THREE.Material)?.dispose();
      }
    };
  }, []);

  return (
    <group ref={groupRef}>
      <Points ref={pointsRef} positions={positions} stride={3}>
        <PointMaterial
          color="#3D2BFF"
          size={0.025}
          transparent={true}
          opacity={0.7}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

// ── Static SVG fallback (prefers-reduced-motion) ───────────────────────────

function BridgeFallbackSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {/* Bridge deck */}
      <line x1="40" y1="110" x2="360" y2="110" stroke="#3D2BFF" strokeWidth="2" opacity="0.6" />

      {/* Left arch */}
      <path
        d="M 80 110 Q 200 30 320 110"
        fill="none"
        stroke="#3D2BFF"
        strokeWidth="1.5"
        opacity="0.5"
      />

      {/* Hangers from arch to deck */}
      {[100, 130, 160, 190, 220, 250, 280, 310].map((x, i) => {
        // Parabola: y = 110 - 80 * (1 - ((x-200)/120)^2)
        const archY = 110 - 80 * (1 - ((x - 200) / 120) ** 2);
        return (
          <line
            key={i}
            x1={x}
            y1={archY}
            x2={x}
            y2={110}
            stroke="#3D2BFF"
            strokeWidth="0.8"
            opacity="0.35"
          />
        );
      })}

      {/* Piers */}
      <line x1="80"  y1="110" x2="80"  y2="150" stroke="#3D2BFF" strokeWidth="2" opacity="0.5" />
      <line x1="200" y1="110" x2="200" y2="155" stroke="#3D2BFF" strokeWidth="2" opacity="0.5" />
      <line x1="320" y1="110" x2="320" y2="150" stroke="#3D2BFF" strokeWidth="2" opacity="0.5" />

      {/* Abutments */}
      <line x1="40"  y1="148" x2="80"  y2="148" stroke="#3D2BFF" strokeWidth="2" opacity="0.5" />
      <line x1="320" y1="148" x2="360" y2="148" stroke="#3D2BFF" strokeWidth="2" opacity="0.5" />
    </svg>
  );
}

// ── Outer wrapper (exported — lazy-loaded by mdx-components.tsx) ───────────

export interface PointCloudBridgeProps {
  className?: string;
}

export default function PointCloudBridge({ className = "" }: PointCloudBridgeProps) {
  const reducedMotion = useReducedMotion();

  // Reduced motion: static bridge silhouette SVG instead of animated canvas (GL-04)
  if (reducedMotion) {
    return (
      <div
        className={className}
        role="img"
        aria-label="Rotating point-cloud visualization of a highway bridge structure"
      >
        <BridgeFallbackSVG className="w-full h-full" />
      </div>
    );
  }

  return (
    <div
      className={className}
      role="img"
      aria-label="Rotating point-cloud visualization of a highway bridge structure"
    >
      <Canvas
        frameloop="always"
        camera={{ position: [0, 2, 8], fov: 45 }}
        dpr={[1, 2]}
        style={{ background: "transparent" }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        <AdaptiveDpr pixelated />
        <BridgeScene />
      </Canvas>
    </div>
  );
}
