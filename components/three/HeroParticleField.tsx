"use client";

// Three.js scene — homepage particle field (GL-01, D-04)
// ~2000 indigo particles drifting slowly, single draw call via Points.
// Loaded via next/dynamic ssr:false (GL-03, D-06).
// GPU disposal on unmount (GL-05, D-07).
// Static SVG fallback under prefers-reduced-motion (GL-04).

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "@/lib/useReducedMotion";

// ── Inner scene component (rendered inside R3F Canvas) ──────────────────────

function ParticleScene() {
  const pointsRef = useRef<THREE.Points>(null!);

  // Generate ~2000 deterministic particle positions in a box volume.
  // x: -8..8, y: -4..4, z: -6..2
  // Seeded via simple LCG so positions are identical across renders.
  const positions = useMemo(() => {
    const count = 2000;
    const arr = new Float32Array(count * 3);
    // Simple seeded pseudo-random (LCG) for deterministic positions
    let seed = 0x12345678;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) & 0xffffffff;
      return (seed >>> 1) / 0x7fffffff; // 0..1
    };

    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = rand() * 16 - 8; // x: -8..8
      arr[i * 3 + 1] = rand() * 8 - 4;  // y: -4..4
      arr[i * 3 + 2] = rand() * 8 - 6;  // z: -6..2
    }
    return arr;
  }, []);

  // Slow drift via rotation — very low angular velocity for atmospheric effect
  useFrame((_state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.02;
    pointsRef.current.rotation.x += delta * 0.01;
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
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        color="#3D2BFF"
        size={0.03}
        transparent={true}
        opacity={0.4}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}

// ── Static SVG fallback (prefers-reduced-motion) ────────────────────────────

function ParticleFallbackSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="particle-pattern"
          x="0"
          y="0"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="4"  cy="4"  r="1" fill="#3D2BFF" opacity="0.25" />
          <circle cx="20" cy="14" r="0.8" fill="#3D2BFF" opacity="0.18" />
          <circle cx="36" cy="8"  r="1.2" fill="#3D2BFF" opacity="0.20" />
          <circle cx="12" cy="30" r="0.7" fill="#3D2BFF" opacity="0.15" />
          <circle cx="28" cy="36" r="1"   fill="#3D2BFF" opacity="0.22" />
          <circle cx="8"  cy="20" r="0.6" fill="#3D2BFF" opacity="0.12" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#particle-pattern)" />
    </svg>
  );
}

// ── Outer wrapper (exported — lazy-loaded by app/page.tsx) ──────────────────

export interface HeroParticleFieldProps {
  className?: string;
}

export default function HeroParticleField({ className = "" }: HeroParticleFieldProps) {
  const reducedMotion = useReducedMotion();

  // Reduced motion: static dot-pattern SVG instead of animated canvas (GL-04)
  if (reducedMotion) {
    return (
      <div className={className} aria-hidden="true">
        <ParticleFallbackSVG className="w-full h-full" />
      </div>
    );
  }

  return (
    <div className={className} aria-hidden="true">
      <Canvas
        frameloop="always"
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
        style={{ background: "transparent" }}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "high-performance",
        }}
      >
        <AdaptiveDpr pixelated />
        <ParticleScene />
      </Canvas>
    </div>
  );
}
