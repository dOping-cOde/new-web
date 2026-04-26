---
phase: 03-animation-webgl
plan: 01
subsystem: animation-foundation
tags: [gsap, framer-motion, motion, reduced-motion, animation, components]
dependency_graph:
  requires: []
  provides:
    - lib/gsap.ts (centralized GSAP plugin registration)
    - lib/useReducedMotion.ts (shared reduced-motion hook)
    - components/motion/SplitText.tsx (GSAP word-reveal component)
    - components/motion/CountUp.tsx (Framer Motion number counter)
    - components/motion/ScrollReveal.tsx (Framer Motion fade-up wrapper)
  affects:
    - All future GSAP consumers (must import from @/lib/gsap)
    - All future Framer Motion components (useReducedMotion available)
    - Three.js wrappers (useReducedMotion available)
tech_stack:
  added: []
  patterns:
    - Centralized GSAP plugin registration (D-03): single registerPlugin call at module scope
    - useGSAP for all GSAP animation (D-02/ANIM-10): never raw useEffect
    - Domain boundary (D-01): GSAP owns scroll/timelines, Framer owns micro-interactions
    - Shared reduced-motion hook (D-08): framework-agnostic, works with all 3 animation systems
key_files:
  created:
    - lib/gsap.ts
    - lib/useReducedMotion.ts
    - components/motion/SplitText.tsx
    - components/motion/CountUp.tsx
    - components/motion/ScrollReveal.tsx
  modified: []
decisions:
  - GSAP domain uses useGSAP with scope option for automatic cleanup — eliminates ScrollTrigger leaks across route navigations (Pitfall 1)
  - Custom useReducedMotion hook (not Framer's built-in) — framework-agnostic so it works identically with GSAP, Framer Motion, and Three.js (D-08)
  - SplitText renders words as overflow-hidden span wrappers — clean clip-path reveal without extra CSS
  - CountUp uses useEffect (not useGSAP) because it is in the Framer Motion domain and animate() from motion/react handles cleanup via controls.stop
  - ScrollReveal renders a plain Tag (no motion props) when reduced motion is active — avoids any motion library overhead for a11y users
metrics:
  duration: 1min
  completed_date: "2026-04-26"
  tasks_completed: 2
  files_created: 5
  files_modified: 0
---

# Phase 03 Plan 01: Animation Foundation Summary

## One-liner

Centralized GSAP plugin registration (D-03), framework-agnostic reduced-motion hook (D-08), and three reusable motion components with strict GSAP/Framer domain separation (D-01).

## What Was Built

### lib/gsap.ts
Single `"use client"` module that calls `gsap.registerPlugin(ScrollTrigger)` once at module scope and re-exports both `gsap` and `ScrollTrigger`. Every GSAP consumer in the project must import from `@/lib/gsap` — this prevents duplicate registration across routes.

### lib/useReducedMotion.ts
SSR-safe React hook that reads `window.matchMedia('(prefers-reduced-motion: reduce)')` on mount and subscribes to live changes via `addEventListener`. Returns `false` during SSR (safe default). Framework-agnostic — consumed by GSAP components, Framer Motion components, and Three.js wrappers identically.

### components/motion/SplitText.tsx
GSAP-powered word-by-word text reveal. Splits `text` prop into individual `<span>` elements per word, each in an overflow-hidden container. Uses `useGSAP()` with `scope` for automatic cleanup. Animates from `{ y: '100%', opacity: 0 }` to `{ y: '0%', opacity: 1 }` with configurable stagger (default 60ms) and duration (default 1200ms) using `"power3.out"` ease (GSAP equivalent of `--ease-out`). Supports optional `triggerRef` for ScrollTrigger-based entry. Zero animation when reduced motion is active.

### components/motion/CountUp.tsx
Framer Motion number counter using `useMotionValue` + `animate` from `motion/react`. Triggers on scroll-enter via `useInView` with `once: true, amount: 0.5`. Supports `prefix`, `suffix`, `decimals`, and `duration` props. When reduced motion is active, sets final value immediately with no animation.

### components/motion/ScrollReveal.tsx
Framer Motion fade-up wrapper using `whileInView` with `viewport={{ once: true, amount: 0.2 }}`. Transition matches design tokens: `duration: 0.6` (`--duration-slow: 600ms`), `ease: [0.16, 1, 0.3, 1]` (`--ease-out`). Supports `delay` and polymorphic `as` prop (`div` | `section`). When reduced motion is active, renders a plain wrapper with no animation props.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | GSAP plugin registration module and reduced-motion hook | 67c8eb5 | lib/gsap.ts, lib/useReducedMotion.ts |
| 2 | SplitText, CountUp, and ScrollReveal motion components | 63e3643 | components/motion/SplitText.tsx, components/motion/CountUp.tsx, components/motion/ScrollReveal.tsx |

## Decisions Made

1. **Custom useReducedMotion hook** — Not using Framer Motion's built-in `useReducedMotion()` because it would create a Framer dependency in code consumed by the GSAP and Three.js domains. The shared hook is framework-agnostic.

2. **useGSAP with scope** — The `scope` option in `useGSAP` wraps `gsap.context()` automatically, ensuring all ScrollTrigger instances and tweens are reverted on unmount. Eliminates Pitfall 1 (duplicate animations and memory leaks).

3. **CountUp uses native useEffect** — CountUp is in the Framer Motion domain and uses `animate()` from `motion/react`. This returns a controls object with `.stop()` for cleanup — the correct pattern for this domain.

4. **SplitText: overflow-hidden span wrapper per word** — Classic clip-path reveal pattern. Each word is contained in an outer `overflow: hidden` span, and the inner animated span slides up into view. Clean, no extra CSS needed.

5. **ScrollReveal: plain Tag on reduced motion** — Rather than rendering a `motion.div` with no animation props, we render a plain HTML tag entirely. This avoids any motion library overhead for accessibility users.

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — all five files are complete implementations with no placeholder data or TODO gaps.

## Self-Check: PASSED

Files confirmed to exist:
- FOUND: /Users/george/DEV/softwire/lib/gsap.ts
- FOUND: /Users/george/DEV/softwire/lib/useReducedMotion.ts
- FOUND: /Users/george/DEV/softwire/components/motion/SplitText.tsx
- FOUND: /Users/george/DEV/softwire/components/motion/CountUp.tsx
- FOUND: /Users/george/DEV/softwire/components/motion/ScrollReveal.tsx

Commits confirmed:
- FOUND: 67c8eb5 (Task 1)
- FOUND: 63e3643 (Task 2)

Build: pnpm build exits 0 — all routes compile cleanly.
