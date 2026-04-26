---
phase: 03-animation-webgl
plan: 02
subsystem: gsap-animations
tags: [gsap, scroll-trigger, parallax, text-reveal, scroll-pin, reduced-motion, hero, mdx]
dependency_graph:
  requires:
    - 03-01 (lib/gsap.ts, useReducedMotion, SplitText — all imported here)
  provides:
    - components/sections/HeroLight.tsx (hero with GSAP word-by-word text reveal)
    - components/sections/HeroDark.tsx (dark hero with 0.85x image parallax)
    - components/motion/ScrollPinnedArchitecture.tsx (100vh scroll-pin with stagger reveal)
  affects:
    - All 5 Tier A case study pages (Architecture sections now scroll-pinned)
    - Homepage (HeroLight text reveal on page load)
    - All 11 case study pages (HeroDark parallax where heroImage is present)
tech_stack:
  added: []
  patterns:
    - useGSAP with scope for all GSAP animations (D-02/ANIM-10)
    - All GSAP imports via @/lib/gsap (D-03)
    - useReducedMotion guard in every animated component (D-08)
    - dynamic import with ssr:true to isolate GSAP from mdx-components module
    - ScrollTrigger.refresh() in useEffect after mount for hydration alignment (Pitfall 1)
    - min-h-screen on pinned section prevents CLS (Pitfall 10)
key_files:
  created:
    - components/motion/ScrollPinnedArchitecture.tsx
  modified:
    - components/sections/HeroLight.tsx
    - components/sections/HeroDark.tsx
    - components/motion/SplitText.tsx
    - mdx-components.tsx
    - components/ui/StatBlock.tsx (bug fix)
decisions:
  - HeroLight converts from Server to Client Component — SplitText (useGSAP) requires client boundary
  - HeroDark converts from Server to Client Component — useGSAP parallax requires client boundary
  - SplitText gains optional highlightWord prop — wraps matching word in text-accent class during word-split render
  - mdx-components.tsx stays module-level (no use client) — GSAP isolated inside ScrollPinnedArchitecture via dynamic import
  - All 5 Tier A case studies get scroll-pin via Architecture component in MDX (D-09)
  - Scroll cue line uses repeating GSAP yoyo timeline (opacity/scaleY loop) not CSS animation — stays in GSAP domain
metrics:
  duration: 4min
  completed_date: "2026-04-26"
  tasks_completed: 2
  files_created: 1
  files_modified: 5
---

# Phase 03 Plan 02: GSAP Scroll Animations Summary

## One-liner

GSAP word-by-word hero text reveal (60ms stagger), 0.85x image parallax on case-study heroes, and 100vh scroll-pinned Architecture sections — all via useGSAP with reduced-motion guards.

## What Was Built

### components/sections/HeroLight.tsx

Converted from Server Component to Client Component. The static `<h1>` rendered via `renderHeadlineWithHighlight()` is replaced with the `<SplitText>` component configured for `as="h1"`, `staggerMs={60}`, `durationMs={1200}`, and `triggerOnMount={true}`. The `highlightWord` prop is forwarded to `SplitText` to preserve per-hero accent word styling.

The scroll cue section now uses `useGSAP` to animate the 32px indicator line: a repeating `fromTo` timeline that cycles `opacity` and `scaleY` with `yoyo: true` (2s total, power2.out). Under reduced motion, the line renders statically with `opacity: 1` and no animation.

### components/sections/HeroDark.tsx

Converted from Server Component to Client Component. Adds `useRef` on both the section element (for `useGSAP` scope) and the image container div (for the parallax target). Inside `useGSAP`, a `ScrollTrigger` with `scrub: true` moves the image container by `window.innerHeight * 0.15` as the section scrolls from `top bottom` to `bottom top` — the 0.85x effective parallax rate. The `overflow-hidden` class on the image container clips the parallax offset cleanly. Under reduced motion, the entire `useGSAP` body is skipped via early return.

### components/motion/SplitText.tsx

Added optional `highlightWord?: string` prop. During word mapping, if `word === highlightWord`, the inner span receives `split-word text-accent` classes instead of just `split-word`. This preserves the GSAP animation targeting (`.split-word` selector still works) while adding the accent color styling that previously lived in the deleted `renderHeadlineWithHighlight` helper.

### components/motion/ScrollPinnedArchitecture.tsx (new)

Client Component implementing scroll-pin behavior for all Architecture MDX sections:

1. `ScrollTrigger.create({ trigger, pin: true, start: 'top top', end: '+=100vh', pinSpacing: true })` — pins the section for 100vh of scroll distance
2. `gsap.fromTo(revealTargets, { opacity: 0, y: 30 }, { ... scrub: true, stagger: 0.12 })` — stagger-reveals all `p`, `li`, `h2`, and `h3` elements within the content container during the pinned scroll
3. `ScrollTrigger.refresh()` in a `useEffect` after mount — corrects trigger positions after Next.js hydration
4. `min-h-screen` on the section element reserves height before GSAP injects the pin-spacer, preventing CLS (Pitfall 10)
5. Under reduced motion: no pin, no stagger — section scrolls normally with all content fully visible

### mdx-components.tsx

Added `dynamic` import of `ScrollPinnedArchitecture` with `{ ssr: true }`. The `Architecture` function body is replaced with a simple wrapper that passes `children` and `className` to `<ScrollPinnedArchitecture>`. The MDX file contract is unchanged — all 5 Tier A case studies continue using `<Architecture>` tags without modification. The file has no `"use client"` directive (required by Next.js MDX pipeline).

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Hero text reveal (HeroLight) and image parallax (HeroDark) | f2424a5 | components/sections/HeroLight.tsx, components/sections/HeroDark.tsx, components/motion/SplitText.tsx |
| 2 | Scroll-pinned Architecture section in MDX components | 8e87517 | components/motion/ScrollPinnedArchitecture.tsx, mdx-components.tsx, components/ui/StatBlock.tsx (bug fix) |

## Decisions Made

1. **HeroLight and HeroDark as Client Components** — Both files previously were Server Components. Adding `useGSAP` (a React hook) requires the client boundary. The conversion is minimal — only the "use client" directive and imports change; all props and JSX are preserved.

2. **SplitText highlightWord on the span** — Adding `text-accent` as a class alongside `split-word` preserves GSAP's selector targeting (`.split-word` query still matches all words). The highlight is purely styling applied at render time before animation runs.

3. **ScrollPinnedArchitecture via dynamic import** — `mdx-components.tsx` is a module-level file consumed by Next.js at build time. It cannot have a `"use client"` directive. Using `dynamic(() => import(...), { ssr: true })` isolates the GSAP client code while keeping SSR rendering for the dark section structure (content visible before JS hydrates).

4. **All 5 Tier A case studies get scroll-pin (D-09)** — All 5 Tier A MDX files (idtrm, bridgesense, salt-lick, ai-copter, fwa-platform) use the `<Architecture>` component. By upgrading the component itself rather than individual files, all 5 receive scroll-pin behavior automatically.

5. **ScrollTrigger.refresh() in useEffect not useGSAP** — The refresh is not an animation — it's a positional correction call after React hydration aligns the DOM. Putting it in `useGSAP` would be incorrect; it's a one-shot operation after mount, not a tween or trigger setup.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing critical functionality] SplitText did not have highlightWord prop**
- **Found during:** Task 1
- **Issue:** HeroLight passes `highlightWord` to SplitText, but SplitText did not accept or use this prop. The plan anticipates this: "If SplitText from Plan 01 does not have this prop, add it."
- **Fix:** Added optional `highlightWord?: string` prop to SplitText interface; inner word spans conditionally receive `text-accent` class when word matches `highlightWord`
- **Files modified:** components/motion/SplitText.tsx
- **Commit:** f2424a5

**2. [Rule 1 - Bug] StatBlock parseStatValue TypeScript strict type error**
- **Found during:** Task 2 build verification
- **Issue:** Uncommitted 03-03 plan changes to StatBlock.tsx had a TypeScript error: regex `match` destructuring returns `string | undefined`, but `parseFloat(numStr)` requires `string`. TypeScript strict (`noUncheckedIndexedAccess`) caught this at build time.
- **Fix:** Replaced array destructuring `const [, prefix, numStr, suffix] = match` with explicit `match[1]`, `match[2]`, `match[3]` indexed access with `?? ""` fallback. Removed now-redundant nullish coalescing on the return line.
- **Files modified:** components/ui/StatBlock.tsx
- **Commit:** 8e87517

## Known Stubs

None — all files are complete implementations. Architecture sections will render with scroll-pin behavior when running in a browser with JavaScript. The `heroImage` prop on HeroDark is optional; parallax only activates when an image is provided.

## Self-Check: PASSED

Files confirmed to exist:
- FOUND: /Users/george/DEV/softwire/components/sections/HeroLight.tsx
- FOUND: /Users/george/DEV/softwire/components/sections/HeroDark.tsx
- FOUND: /Users/george/DEV/softwire/components/motion/SplitText.tsx
- FOUND: /Users/george/DEV/softwire/components/motion/ScrollPinnedArchitecture.tsx
- FOUND: /Users/george/DEV/softwire/mdx-components.tsx

Commits confirmed:
- FOUND: f2424a5 (Task 1 — hero text reveal + parallax)
- FOUND: 8e87517 (Task 2 — scroll-pinned Architecture)

Build: pnpm build exits 0 — all 19 routes compile cleanly including 11 case study pages.
