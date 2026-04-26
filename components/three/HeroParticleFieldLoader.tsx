"use client";

// Client-side loader for HeroParticleField.
// next/dynamic with ssr:false must live in a Client Component (GL-03, D-06).
// This thin wrapper keeps app/page.tsx as a Server Component.

import dynamic from "next/dynamic";

const HeroParticleField = dynamic(
  () => import("@/components/three/HeroParticleField"),
  { ssr: false }
);

export interface HeroParticleFieldLoaderProps {
  className?: string;
}

export function HeroParticleFieldLoader({ className = "" }: HeroParticleFieldLoaderProps) {
  return <HeroParticleField className={className} />;
}
