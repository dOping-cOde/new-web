"use client";

// Client-side loader for PointCloudBridge.
// next/dynamic with ssr:false must live in a Client Component (GL-03, D-06).
// This thin wrapper is imported by mdx-components.tsx (which is module-level, no "use client").
// Pattern mirrors HeroParticleFieldLoader for consistency.

import dynamic from "next/dynamic";

const PointCloudBridge = dynamic(
  () => import("@/components/three/PointCloudBridge"),
  { ssr: false }
);

export interface PointCloudBridgeLoaderProps {
  className?: string;
}

export function PointCloudBridgeLoader({ className = "" }: PointCloudBridgeLoaderProps) {
  return <PointCloudBridge className={className} />;
}
