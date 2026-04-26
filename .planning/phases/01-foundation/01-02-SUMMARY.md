---
phase: 01-foundation
plan: 02
subsystem: ui
tags: [react, tailwind, typescript, components, design-system, accessibility]

# Dependency graph
requires:
  - phase: 01-foundation/01-01
    provides: Tailwind v4 design tokens (globals.css), cn() utility, fonts, DESIGN.md
provides:
  - Button component (primary/secondary variants, polymorphic a|button, arrow prop)
  - Caption component (polymorphic span|p|div, uppercase kicker text)
  - Pill component (interactive button and static span modes, active/inactive states)
  - Container component (1200px default / 1440px wide max-width, responsive gutters)
  - SectionHeader component (kicker + heading + intro, left/center align, dark variant)
  - StatBlock component (Fraunces display number in accent color + caption label)
  - Updated app/page.tsx showcasing all six components in light and dark sections
affects:
  - 01-03 (navbar and footer import Container, Button; page layout uses these components)
  - 01-04 (homepage sections use SectionHeader, StatBlock, Container, Button, Pill)
  - All subsequent phases that build pages or case studies

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Polymorphic component pattern: use explicit props interface (not ComponentProps<'span'>) when as prop changes element type — strict TypeScript requires explicit prop declaration to avoid ref type conflicts"
    - "Caption/Pill dual-mode: as prop accepts element variants; focus ring only applied for interactive (button) mode"
    - "Button polymorphic: renders as <a> when href provided, <button> otherwise — single component handles both nav links and action buttons"
    - "Dark section pattern: dark prop on SectionHeader/StatBlock swaps text to text-text-inverted/text-text-muted-dark for cinematic dark sections"

key-files:
  created:
    - components/ui/Button.tsx
    - components/ui/Caption.tsx
    - components/ui/Pill.tsx
    - components/ui/StatBlock.tsx
    - components/ui/SectionHeader.tsx
    - components/layout/Container.tsx
  modified:
    - app/page.tsx

key-decisions:
  - "Caption polymorphic typing uses explicit props interface instead of ComponentProps<'span'> — avoids ref type conflict when as='div' in strict TypeScript"
  - "rounded-[9999px] used instead of rounded-pill — @theme defines --radius-pill but Tailwind v4 may not auto-generate a rounded-pill utility class"
  - "Container mobile gutter uses max-sm:px-[20px] (20px) rather than matching desktop px-xl (32px) — tighter gutter on small screens per DESIGN.md"

patterns-established:
  - "Component pattern: all components accept className for override via cn(); spread ...props for native element pass-through"
  - "Dark variant pattern: dark boolean prop on presentational components (SectionHeader, StatBlock) switches text to inverted/muted-dark tokens"
  - "Pill dual-mode: as='button' for interactive filter pills (with focus ring), as='span' for static tech stack tags (no click handler)"

requirements-completed: [FOUND-07, FOUND-08]

# Metrics
duration: 2min
completed: 2026-04-26
---

# Phase 01 Plan 02: Core UI Components Summary

**Six atomic React components (Button, Caption, Pill, Container, SectionHeader, StatBlock) built with Tailwind v4 design tokens, polymorphic element support, and dark/light variants**

## Performance

- **Duration:** 2 min
- **Started:** 2026-04-26T10:12:28Z
- **Completed:** 2026-04-26T10:14:52Z
- **Tasks:** 2
- **Files modified:** 7 (6 created, 1 modified)

## Accomplishments

- Built six atomic components that encode all design system decisions from DESIGN.md into reusable, typed React components
- All components use design tokens from globals.css (Tailwind v4 utilities) and support className override via cn()
- All interactive components (Button, Pill) include accessible focus rings (2px indigo, 2px offset per DESIGN.md accessibility spec)
- Updated app/page.tsx to showcase all six components in both light (bg-bg-light) and dark (bg-bg-dark) sections across all breakpoints

## Task Commits

Each task was committed atomically:

1. **Task 1: Build Button, Caption, and Pill components** - `37df56c` (feat)
2. **Task 2: Build Container, SectionHeader, StatBlock; update page showcase** - `ddf337e` (feat)

## Files Created/Modified

- `/Users/george/DEV/softwire/components/ui/Button.tsx` - Primary/secondary variants; polymorphic a|button; pill radius; 180ms transition; accessible focus ring; arrow prop
- `/Users/george/DEV/softwire/components/ui/Caption.tsx` - Uppercase kicker text; polymorphic span|p|div; text-caption text-text-muted; explicit props interface
- `/Users/george/DEV/softwire/components/ui/Pill.tsx` - Filter pill (button, active/inactive) and tech tag (static span) modes; text-mono-sm; pill radius; focus ring for button mode
- `/Users/george/DEV/softwire/components/ui/StatBlock.tsx` - Fraunces display-lg value in accent color; uppercase caption label; dark prop
- `/Users/george/DEV/softwire/components/ui/SectionHeader.tsx` - Caption kicker + h2 heading + optional intro; headingSize (xl/lg/md); align (left/center); dark prop
- `/Users/george/DEV/softwire/components/layout/Container.tsx` - 1200px default / 1440px wide; 32px desktop gutter (px-xl); 20px mobile gutter (max-sm:px-[20px]); mx-auto
- `/Users/george/DEV/softwire/app/page.tsx` - Component showcase rendering all six components in light and dark sections with all variants

## Decisions Made

- **Caption polymorphic typing:** Used explicit props interface (`{ as?: "span" | "p" | "div"; className?: string; children?: React.ReactNode; ... }`) instead of `ComponentProps<"span">` — TypeScript strict mode rejects spreading span props onto a div due to ref type incompatibility; explicit props interface resolves the conflict cleanly
- **rounded-[9999px] over rounded-pill:** @theme defines `--radius-pill: 9999px` but Tailwind v4 does not auto-generate a `rounded-pill` utility from a CSS var — arbitrary value `[9999px]` is the reliable approach (confirmed by plan note)
- **Container mobile gutter 20px:** Used `max-sm:px-[20px]` (20px) on mobile per DESIGN.md spec rather than inheriting 32px desktop gutter — tighter gutters on small screens improve readability

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Caption polymorphic type caused TypeScript strict mode failure**
- **Found during:** Task 1 (build verification)
- **Issue:** `CaptionProps extends ComponentProps<"span">` then spreading props onto `<div>` caused a TypeScript error: `Ref<HTMLSpanElement>` is not assignable to `Ref<HTMLDivElement>` — strict TypeScript rejects this because HTMLSpanElement doesn't have the `align` property that HTMLDivElement requires
- **Fix:** Replaced `extends ComponentProps<"span">` with an explicit minimal props interface declaring only the props actually used (as, className, children, id, style)
- **Files modified:** components/ui/Caption.tsx
- **Verification:** `pnpm build` exits with code 0, no TypeScript errors
- **Committed in:** 37df56c (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - Bug)
**Impact on plan:** Caption typing fix was necessary for TypeScript strict mode compliance. No scope creep. All acceptance criteria met exactly as specified.

## Issues Encountered

- Caption polymorphic typing failed with TypeScript strict mode due to `ComponentProps<"span">` ref type when component renders as `div`. Resolved by switching to an explicit props interface — a cleaner approach that avoids the problem entirely.

## Known Stubs

None — all six components are fully implemented with real design tokens. app/page.tsx is an intentional component showcase, not a stub blocking the plan's goal. It will be replaced by the real homepage in Phase 2.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- All six atomic components are production-ready and stable
- `pnpm build` passes with zero TypeScript/ESLint errors
- Plan 01-03 (layout shell — navbar and footer) can immediately import Container, Button, Caption, and Pill
- Plan 01-04 (homepage) can immediately use SectionHeader, StatBlock, Container, Button, and Pill
- All components documented via TypeScript interfaces; props are discoverable via IDE autocomplete

---
*Phase: 01-foundation*
*Completed: 2026-04-26*
