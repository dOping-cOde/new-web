---
phase: 01-foundation
plan: "03"
subsystem: ui
tags: [navbar, footer, layout, intersection-observer, mobile-nav, focus-trap, tailwind-v4, next-js]

# Dependency graph
requires:
  - phase: 01-foundation/01-01
    provides: design tokens in globals.css, cn utility, font variables in lib/fonts.ts
  - phase: 01-foundation/01-02
    provides: Button, Caption, Container component APIs; root layout.tsx scaffold

provides:
  - Sticky theme-aware Navbar with IntersectionObserver dark-section detection
  - Animated hamburger-to-X mobile toggle via CSS transforms
  - MobileNav full-screen overlay with focus trapping, scroll lock, stagger animation
  - Dark Footer with 4-column responsive grid and hairline border
  - Root layout shell (Navbar + Footer) wrapping all page content
  - Test page with light/dark/light sections for scroll-based navbar theme detection

affects:
  - All subsequent pages (inherit Navbar + Footer from layout.tsx)
  - Any dark cinematic section (must carry data-theme="dark" for navbar detection)
  - Homepage hero (Phase 2 — replaces placeholder page.tsx content)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - IntersectionObserver with boundingClientRect check against 64px navbar zone (not rootMargin trick)
    - Hamburger morphs to X via two <span> bars with translate-y + rotate-45 CSS transforms
    - data-theme="dark" attribute pattern for all dark sections consumed by navbar observer
    - Body scroll lock via document.body.style.overflow="hidden" in MobileNav useEffect cleanup
    - Focus trap via querySelectorAll focusable elements with Tab/Shift+Tab/Escape keydown handler
    - Button component supports both href (anchor) and button rendering with full prop spread

key-files:
  created:
    - components/layout/Navbar.tsx
    - components/layout/MobileNav.tsx
    - components/layout/Footer.tsx
  modified:
    - app/layout.tsx
    - app/page.tsx
    - components/ui/Button.tsx

key-decisions:
  - "IntersectionObserver uses boundingClientRect.top < 64 && bottom > 0 check (not rootMargin CSS calc workaround) — more precise navbar overlap detection"
  - "data-theme='dark' attribute on Footer and dark page sections — single pattern consumed by navbar observer for theme switching"
  - "Button.tsx split into ButtonAsAnchor | ButtonAsButton union type — allows onClick and other props to reach <a> element when href provided"

patterns-established:
  - "Pattern 1: All dark sections must carry data-theme='dark' for navbar IntersectionObserver to detect theme switches"
  - "Pattern 2: Mobile overlays use opacity/pointer-events toggle (not display:none) to allow CSS transitions"
  - "Pattern 3: tabIndex management in hidden overlays — tabIndex={isOpen ? 0 : -1} prevents Tab focus on invisible elements"

requirements-completed: [FOUND-05, FOUND-06, FOUND-08]

# Metrics
duration: 2min
completed: 2026-04-26
---

# Phase 01 Plan 03: Navbar, MobileNav, and Footer Summary

**Sticky theme-aware Navbar with IntersectionObserver dark-section detection, hamburger-to-X morph, full-screen MobileNav with focus trapping, and dark 4-column Footer wired into root layout**

## Performance

- **Duration:** 2 min
- **Started:** 2026-04-26T10:17:29Z
- **Completed:** 2026-04-26T10:20:16Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments

- Navbar detects dark sections via IntersectionObserver (boundingClientRect.top < 64) and transitions between rgba(250,250,247,0.72) and rgba(10,11,13,0.72) with 320ms CSS transition
- Hamburger morphs to X via two `<span>` bars with translate-y + rotate-45 transforms (no icon swap)
- MobileNav overlay has Tab/Shift+Tab focus trapping, Escape key close, body scroll lock, and 60ms stagger link reveal
- Footer renders with bg-bg-dark, hairline border-t border-border-dark, lg:grid-cols-4 / sm:grid-cols-2 / grid-cols-1 responsive grid, dynamic copyright year
- Root layout (Navbar + Footer) wraps all page content; homepage has light/dark/light scroll sections for end-to-end theme detection testing

## Task Commits

Each task was committed atomically:

1. **Task 1: Navbar with IntersectionObserver theme detection and MobileNav overlay** - `30c3c61` (feat)
2. **Task 2: Footer and wire Navbar + Footer into root layout with test sections** - `ddeebcb` (feat)

**Plan metadata:** _(pending final docs commit)_

## Files Created/Modified

- `components/layout/Navbar.tsx` - Sticky 64px nav with backdrop-blur, IntersectionObserver theme swap, hamburger-to-X morph, MobileNav toggle
- `components/layout/MobileNav.tsx` - Full-screen dark overlay, 60ms stagger links, focus trap, body scroll lock
- `components/layout/Footer.tsx` - Dark bg, 4-column grid, hairline border, contact links, dynamic copyright
- `app/layout.tsx` - Wired Navbar before `<main>` and Footer after; removed placeholder comments
- `app/page.tsx` - Three distinct `min-h-screen` sections (light/dark/light) with `data-theme="dark"` on dark section
- `components/ui/Button.tsx` - Split props type into ButtonAsAnchor | ButtonAsButton union; anchor variant now spreads all props including onClick

## Decisions Made

- **IntersectionObserver implementation:** Used `boundingClientRect.top < 64 && bottom > 0` check rather than the `rootMargin: "0px 0px -100% 0px"` trick. The rootMargin approach only fires at scroll entry of the element's top edge; the boundingClientRect approach correctly fires whenever any part of a dark section overlaps the 64px navbar zone.
- **data-theme="dark" pattern:** Footer carries `data-theme="dark"` so the navbar auto-detects it when the user scrolls near the page bottom. All future dark cinematic sections must follow this pattern.
- **Button.tsx union type refactor:** The original `ComponentProps<"button">` interface caused `onClick` to not reach the `<a>` element in the anchor render path. Fixed by introducing `ButtonAsAnchor | ButtonAsButton` discriminated union type.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed Button.tsx anchor variant not receiving onClick**
- **Found during:** Task 1 (MobileNav passes `onClick={onClose}` to `<Button href="/contact">`)
- **Issue:** Button.tsx typed props as `ComponentProps<"button">` and the anchor render path used `<a href={href} className={classes}>` without spreading `...props`, so `onClick` and other anchor-compatible props were silently dropped
- **Fix:** Refactored ButtonProps into a `ButtonAsAnchor | ButtonAsButton` discriminated union; anchor path now spreads `...props as ComponentProps<"a">` so onClick, tabIndex, etc. reach the element
- **Files modified:** `components/ui/Button.tsx`
- **Verification:** Build passes with strict TypeScript; onClick correctly reaches anchor element
- **Committed in:** `30c3c61` (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 — bug fix)
**Impact on plan:** Essential correctness fix — MobileNav CTA close handler would have been silently broken without it. No scope creep.

## Issues Encountered

None — build compiled on first attempt for both tasks.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Layout shell complete: every page now inherits Navbar + Footer from `app/layout.tsx`
- `data-theme="dark"` pattern established for all dark cinematic sections — Phase 2 hero and case-study sections must carry this attribute
- Homepage placeholder (light/dark/light test sections) ready to be replaced by real Phase 2 hero
- All foundation components (Plan 01-02) + layout shell (Plan 01-03) are production-ready

---
*Phase: 01-foundation*
*Completed: 2026-04-26*

## Self-Check: PASSED
