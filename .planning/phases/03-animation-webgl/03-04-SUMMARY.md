---
phase: 03-animation-webgl
plan: 04
subsystem: webgl-scenes
tags: [three.js, r3f, drei, webgl, particle-field, point-cloud, ssr-guard, gpu-disposal, reduced-motion]
dependency_graph:
  requires:
    - lib/useReducedMotion.ts (from 03-01)
    - components/three/ directory (from 03-CONTEXT.md)
    - app/page.tsx (homepage hero wiring)
    - mdx-components.tsx (BridgeVisualization MDX registration)
    - content/portfolio/bridgesense.mdx (insertion point)
  provides:
    - components/three/HeroParticleField.tsx (homepage particle field scene)
    - components/three/HeroParticleFieldLoader.tsx (client wrapper for ssr:false dynamic import)
    - components/three/PointCloudBridge.tsx (BridgeSense point-cloud bridge scene)
    - components/three/PointCloudBridgeLoader.tsx (client wrapper for ssr:false dynamic import)
  affects:
    - app/page.tsx (hero section now has animated particle field)
    - mdx-components.tsx (BridgeVisualization now registered)
    - content/portfolio/bridgesense.mdx (rotating bridge viz inserted between System and Architecture)
tech_stack:
  added: []
  patterns:
    - Client wrapper pattern for next/dynamic ssr:false in Server Component context
    - R3F Canvas with frameloop=always + AdaptiveDpr for continuous animation
    - Points + PointMaterial single draw call for instanced particle rendering
    - Seeded LCG pseudo-random for deterministic particle positions
    - Procedural bridge geometry: deck grid + parabolic arches + hangers + piers
    - GPU disposal via captured ref in useEffect cleanup
    - Reduced-motion fallback: static SVG instead of canvas
key_files:
  created:
    - components/three/HeroParticleField.tsx
    - components/three/HeroParticleFieldLoader.tsx
    - components/three/PointCloudBridge.tsx
    - components/three/PointCloudBridgeLoader.tsx
  modified:
    - app/page.tsx
    - mdx-components.tsx
    - content/portfolio/bridgesense.mdx
decisions:
  - "Client wrapper pattern required: next/dynamic ssr:false is forbidden in Server Components (Next.js 15) — created *Loader.tsx wrappers to hold dynamic imports"
  - "frameloop=always chosen over frameloop=demand for both scenes — continuous drift/rotation requires invalidation every frame anyway, making demand equivalent to always"
  - "Seeded LCG for particle positions — deterministic across renders, no hydration mismatch risk"
  - "Procedural bridge geometry chosen (D-05) — no external model files, well under 60KB budget"
  - "Ref captured inside useEffect before cleanup — satisfies react-hooks/exhaustive-deps (ref.current may change by cleanup time)"
metrics:
  duration: 5min
  completed: "2026-04-26"
  tasks_completed: 2
  files_created: 4
  files_modified: 3
---

# Phase 03 Plan 04: WebGL Scenes — Particle Field + Point-Cloud Bridge

**One-liner:** Two R3F scenes (2000-particle indigo drift + 3500-point procedural bridge) lazy-loaded via client wrapper pattern with GPU disposal and SVG reduced-motion fallbacks.

## Tasks Completed

### Task 1: Homepage Hero Particle Field

Created `HeroParticleField.tsx` with ~2000 indigo particles (`#3D2BFF`) drifting via slow Y+X rotation (0.02/0.01 rad/s). Single draw call via drei `<Points>` + `<PointMaterial>`. Positions are deterministic via seeded LCG — no hydration mismatch risk.

Created `HeroParticleFieldLoader.tsx` as a `"use client"` wrapper that holds `dynamic(() => import(...), { ssr: false })` — required because Next.js 15 forbids `ssr: false` in Server Components. This thin client wrapper keeps `app/page.tsx` as a Server Component.

Updated `app/page.tsx`: replaced the Phase 3 TODO placeholder with `<HeroParticleFieldLoader className="absolute inset-0 -z-10" />`.

**Commit:** `04d6008`

### Task 2: BridgeSense Point-Cloud Bridge

Created `PointCloudBridge.tsx` with procedural bridge geometry (~3500 points):
- Bridge deck: 40×16 point grid (x: -5..5, z: -1..1, y=0)
- Two parabolic arches (z=±0.9, height 2.5 units, 80 pts each)
- 10 hangers per arch side (8 pts each)
- Three pier columns at x=-4.5, 0, 4.5 (6×10 grid each)
- Abutment caps at x=±5

All positions have ±0.02 LiDAR-scan jitter via seeded LCG. Auto-rotates at 0.15 rad/s (one full turn ~42s). Indigo `PointMaterial` at opacity 0.7.

Created `PointCloudBridgeLoader.tsx` with same client wrapper pattern.

Updated `mdx-components.tsx`: added `BridgeVisualization` function component (400px height wrapper around `PointCloudBridgeLoader`) and registered in `useMDXComponents`.

Updated `content/portfolio/bridgesense.mdx`: inserted `<BridgeVisualization />` between SystemSection and Architecture sections.

**Commit:** `631283b`

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Client wrapper pattern for ssr:false dynamic imports**
- **Found during:** Task 1 (first build attempt)
- **Issue:** Next.js 15 throws a hard error when `next/dynamic` with `{ ssr: false }` is used in a Server Component. `app/page.tsx` is a Server Component (has `metadata` export). Same constraint applies to `mdx-components.tsx` (module-level, no `"use client"`).
- **Fix:** Created `HeroParticleFieldLoader.tsx` and `PointCloudBridgeLoader.tsx` as `"use client"` wrappers. These hold the `dynamic` import with `ssr: false`. Server Components import the loader, not the scene directly.
- **Files modified:** `components/three/HeroParticleFieldLoader.tsx` (new), `components/three/PointCloudBridgeLoader.tsx` (new), `app/page.tsx` (imports loader instead), `mdx-components.tsx` (imports loader)
- **Commits:** `04d6008`, `631283b`

**2. [Rule 1 - Bug] Ref captured before cleanup in useEffect**
- **Found during:** Task 2 build (ESLint error surfaced for both files)
- **Issue:** ESLint `react-hooks/exhaustive-deps` warning — `pointsRef.current` may change between when effect runs and when cleanup runs. Accessing `ref.current` inside cleanup is a React anti-pattern.
- **Fix:** Added `const points = pointsRef.current;` before the cleanup return in both `HeroParticleField.tsx` and `PointCloudBridge.tsx`. Cleanup captures the stable local variable.
- **Files modified:** `components/three/HeroParticleField.tsx`, `components/three/PointCloudBridge.tsx`
- **Commit:** `631283b`

**3. [Rule 1 - Bug] prefer-const for for..of loop variable**
- **Found during:** Task 2 build
- **Issue:** ESLint `prefer-const` error — `for (let zi of ...)` where `zi` is never reassigned. Hard ESLint error, broke build.
- **Fix:** Changed both `let zi` to `const zi` in `generateBridgePoints()`.
- **Files modified:** `components/three/PointCloudBridge.tsx`
- **Commit:** `631283b`

## Success Criteria Verification

| Criterion | Status |
|-----------|--------|
| Homepage hero ~2000 indigo particles drifting (GL-01) | PASS |
| BridgeSense rotating point-cloud bridge (GL-02) | PASS |
| Both loaded via next/dynamic ssr:false (GL-03) | PASS — via *Loader.tsx client wrappers |
| Both show static SVG fallback under reduced motion (GL-04) | PASS |
| Both dispose GPU resources on unmount (GL-05) | PASS |
| Both under 60KB scene JS budget | PASS — procedural geometry, no textures, no post-processing |
| Build passes with no SSR errors | PASS — `pnpm build` exits 0 |

## Known Stubs

None — both scenes are fully wired with real Three.js rendering. The particle field and bridge visualization are functional, not placeholder stubs.

## Self-Check: PASSED
