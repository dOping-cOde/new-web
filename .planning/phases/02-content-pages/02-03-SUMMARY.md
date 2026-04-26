---
phase: 02-content-pages
plan: "03"
subsystem: ui
tags: [react, nextjs, tailwind, typescript, sections, hero, cta]

requires:
  - phase: 01-foundation
    provides: Design tokens (globals.css), Button, Caption, SectionHeader, StatBlock, Container components
  - phase: 02-content-pages
    plan: "01"
    provides: Type system and data loaders
  - phase: 02-content-pages
    plan: "02"
    provides: CapabilityCard and Pullquote components

provides:
  - HeroLight — shared light hero section for Home, Services, About, Contact, Portfolio pages
  - HeroDark — shared dark cinematic hero for all 11 case-study pages
  - CTABand — reusable CTA section for Home, Services, About pages
  - ManifestoBand — Home-page manifesto section (production copy included)

affects: [all pages in phase 02, case-study pages, home page composition]

tech-stack:
  added: []
  patterns:
    - Section components are Server Components with typed props and sensible defaults
    - data-theme='dark' attribute on dark sections for navbar IntersectionObserver detection
    - highlightWord prop pattern for inline accent color wrapping on a specific word in headline text
    - Scroll cue uses absolute positioning with a visual placeholder line (animation wired in Phase 3)
    - Stat row in HeroDark uses flex-1 with border-l dividers on md+, 2x2 grid on mobile

key-files:
  created:
    - components/sections/HeroLight.tsx
    - components/sections/HeroDark.tsx
    - components/sections/CTABand.tsx
    - components/sections/ManifestoBand.tsx
  modified: []

key-decisions:
  - "HeroLight renders headline as h1 (not h2) — this is the page-level heading per accessibility and SEO requirements"
  - "highlightWord finds substring by indexOf and wraps in text-accent span — simple and reliable for known single words"
  - "HeroDark stat row: flex row (md+) with border-l dividers, 2x2 grid on mobile — matches D-11 case study spec"
  - "ManifestoBand default paragraphs are production-ready copy about physical-world reliability; not placeholder text"

patterns-established:
  - "Section components: bg-bg-light/bg-bg-dark, py-3xl md:py-5xl, Container default size"
  - "Dark sections carry data-theme='dark' for IntersectionObserver-driven navbar theming"
  - "Scroll cue: absolute bottom-xl, centered, mono-sm text + 1px hairline div (GSAP animation in Phase 3)"

requirements-completed: []

duration: 12min
completed: 2026-04-26
---

# Phase 02 Plan 03: Section Components Summary

**Four reusable section components (HeroLight, HeroDark, CTABand, ManifestoBand) built as typed Server Components with design-system-aligned props, sensible defaults, and production-ready copy**

## Performance

- **Duration:** 12 min
- **Started:** 2026-04-26T11:17:31Z
- **Completed:** 2026-04-26T11:29:00Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- HeroLight: full-viewport light hero with kicker, accent-word highlighting (highlightWord prop), dual CTAs, and scroll cue for home page
- HeroDark: dark cinematic hero with data-theme="dark" for navbar detection, priority image loading (LCP), and responsive stat row using StatBlock
- CTABand: centered display-md headline with body text and primary CTA, sensible defaults pointing to /contact
- ManifestoBand: narrow-column (720px) manifesto section with production-grade copy about physical-world reliability

## Task Commits

1. **Task 1: Build HeroLight and HeroDark** - `c244020` (feat)
2. **Task 2: Build CTABand and ManifestoBand** - `c268fa4` (feat)

## Files Created/Modified
- `components/sections/HeroLight.tsx` - Shared light hero for Home, Services, About, Contact, Portfolio
- `components/sections/HeroDark.tsx` - Shared dark cinematic hero for all 11 case studies (data-theme="dark")
- `components/sections/CTABand.tsx` - Reusable CTA band (Home, Services, About) with /contact default
- `components/sections/ManifestoBand.tsx` - Home-only manifesto section with production copy

## Decisions Made
- HeroLight renders the headline as `<h1>` (not `<h2>`) since this is the page-level heading — correct for both SEO and WCAG accessibility
- highlightWord prop finds the exact substring in headline using `indexOf` and wraps it in `<span className="text-accent">` — simple and reliable for single-word accents
- HeroDark stat row uses `md:flex` with `border-l border-border-dark` dividers on desktop, `grid grid-cols-2` on mobile — matches the case-study spec
- ManifestoBand ships with production-ready default copy (not Lorem Ipsum) since it's Home-page only and the content voice is defined in DESIGN.md

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

All 4 section components are ready for page composition in upcoming plans:
- Home page can compose HeroLight + ManifestoBand + CTABand
- Services and About pages can compose HeroLight + CTABand
- All 11 case-study pages can use HeroDark as the page hero
- No blockers or concerns

---
*Phase: 02-content-pages*
*Completed: 2026-04-26*
