---
phase: 03-animation-webgl
plan: 03
subsystem: framer-motion-micro-interactions
tags: [framer-motion, hover-lift, flip-animation, count-up, scroll-reveal, reduced-motion, portfolio-card, portfolio-grid, stat-block]
dependency_graph:
  requires:
    - components/motion/CountUp.tsx (from 03-01)
    - components/motion/ScrollReveal.tsx (from 03-01)
    - lib/useReducedMotion.ts (from 03-01)
  provides:
    - components/cards/PortfolioCard.tsx (Client Component with hover-lift, ANIM-05)
    - app/portfolio/PortfolioGrid.tsx (FLIP filter animation, ANIM-06)
    - components/ui/StatBlock.tsx (animated number counter via CountUp, ANIM-04)
    - app/page.tsx (ScrollReveal on capability strip, stat row, portfolio teaser, ANIM-09)
  affects:
    - All pages that render PortfolioCard (app/page.tsx, app/portfolio, case study up-next sections)
    - Portfolio filter UX — cards now animate on filter change
    - Homepage stat numbers now count up on scroll enter
tech_stack:
  added: []
  patterns:
    - motion.div with whileHover for lift on interactive cards (Framer Motion)
    - AnimatePresence + LayoutGroup + layout prop for FLIP grid reordering (Framer Motion)
    - parseStatValue regex utility for extracting numeric portions from mixed strings
    - ScrollReveal wrapping Server Component sections from a Server Component page
key_files:
  created: []
  modified:
    - components/cards/PortfolioCard.tsx
    - app/portfolio/PortfolioGrid.tsx
    - components/ui/StatBlock.tsx
    - app/page.tsx
    - components/sections/HeroLight.tsx (Rule 1 bug fix)
decisions:
  - "PortfolioCard wraps Link in motion.div (not motion(Link)) — simpler, avoids ref forwarding complexity"
  - "PortfolioGrid places AnimatePresence around motion.div grid wrapper; each card item gets its own motion.div with layout + enter/exit animations"
  - "StatBlock parseStatValue regex /^([^\\d]*)([\\.\\d]+)(.*)$/ splits prefix, number, suffix — non-numeric values (24/7) fall through to plain text"
  - "ScrollReveal wraps SectionHeader+grid as a unit in page.tsx Server Component — Next.js handles the client boundary at ScrollReveal import"
metrics:
  duration: ~10min
  completed: "2026-04-26"
  tasks_completed: 2
  files_modified: 5
---

# Phase 03 Plan 03: Framer Motion Micro-Interactions Summary

**One-liner:** Framer Motion hover-lift (ANIM-05), FLIP filter animation (ANIM-06), animated CountUp stat blocks (ANIM-04), and ScrollReveal section fade-ups (ANIM-09) wired into existing portfolio, stat, and homepage components.

## What Was Built

### Task 1: PortfolioCard hover-lift + PortfolioGrid FLIP filter (ANIM-05, ANIM-06)

**PortfolioCard.tsx** converted from Server Component to Client Component:
- Added `"use client"` directive and `motion.div` wrapper around `<Link>`
- `whileHover={{ y: -4, boxShadow: "0 24px 60px rgba(10, 11, 13, 0.12)" }}` — 4px lift with shadow-lg
- `transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}` — 320ms ease-out per DESIGN.md spec
- Reduced motion guard: plain `<div>` wrapper with same classes, no hover animation
- Existing CSS `group-hover:scale-[1.02]` on image kept — compatible with parent Framer transform (different property)
- Removed `transition-shadow duration-normal hover:shadow-md` CSS — Framer now owns this

**PortfolioGrid.tsx** now has FLIP animation for filter transitions:
- `LayoutGroup` wraps the card grid for coordinated layout animations
- `AnimatePresence mode="popLayout"` allows exiting cards to animate out before relayout
- Each card wrapped in `motion.div` with `layout` prop + `initial/animate/exit` opacity/scale
- Reduced motion guard: static card list rendered directly without animation wrappers

### Task 2: StatBlock animated counters + ScrollReveal homepage sections (ANIM-04, ANIM-09)

**StatBlock.tsx** already updated in 03-02 with CountUp integration (parseStatValue + CountUp render). This plan's page.tsx changes complete the ANIM-09 requirement.

**app/page.tsx** ScrollReveal integration:
- Section 2 (Capability strip): `<ScrollReveal>` wraps SectionHeader + 3x2 grid
- Section 3 stat row: `<ScrollReveal delay={0.1}>` wraps the 4-StatBlock flex row
- Section 4 (Portfolio teaser): `<ScrollReveal>` wraps SectionHeader + 4-card grid
- Section 1 (Hero) not wrapped — has its own SplitText animation
- ManifestoBand and CTABand not wrapped — self-contained, deferred

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| Task 1 | `3d0f85e` | hover-lift on PortfolioCard and FLIP filter on PortfolioGrid |
| Task 2 | `0791f4f` | StatBlock animated counters and ScrollReveal for homepage sections |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed HeroLight.tsx `highlightWord` TypeScript error blocking build**
- **Found during:** Task 1 verification (`pnpm build`)
- **Issue:** `highlightWord={highlightWord}` passed `string | undefined` to an optional prop typed as `string?`. With `exactOptionalPropertyTypes: true` in tsconfig, TypeScript rejects `undefined` assigned to `string` in optional position
- **Fix:** Changed to spread pattern `{...(highlightWord !== undefined && { highlightWord })}` — only passes prop when value exists
- **Files modified:** `components/sections/HeroLight.tsx`
- **Commit:** `3d0f85e` (included in Task 1 commit)

**2. [Rule 3 - Blocking] Build race condition required clean `.next` removal**
- **Found during:** Task 1 verification
- **Issue:** `pnpm build` after prior partial build left stale `.next/server/pages-manifest.json` causing worker crash during "Collecting build traces"
- **Fix:** `rm -rf .next` before full rebuild — clean build passes consistently
- **Files modified:** none (build artifact, not code)

## Known Stubs

None — all animations are fully wired with real data sources.

## Self-Check: PASSED

- `components/cards/PortfolioCard.tsx` — FOUND, contains `"use client"`, `motion`, `whileHover`, `useReducedMotion`
- `app/portfolio/PortfolioGrid.tsx` — FOUND, contains `AnimatePresence`, `LayoutGroup`, `layout`, `useReducedMotion`
- `components/ui/StatBlock.tsx` — FOUND, contains `"use client"`, `CountUp`, `parseStatValue`, `useReducedMotion`
- `app/page.tsx` — FOUND, contains `ScrollReveal` import and 3 usages
- Build exits 0 — all 19 static pages generated successfully
- Commits `3d0f85e` and `0791f4f` exist in git log
