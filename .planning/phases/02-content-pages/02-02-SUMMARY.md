---
phase: 02-content-pages
plan: "02"
subsystem: ui
tags: [react, next-image, next-link, lucide-react, tailwind, cards, components]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: design tokens (globals.css), Caption, Pill, utils (cn), TypeScript strict setup

provides:
  - PortfolioCard: 16:10 image card linking to /portfolio/[slug] with category kicker, h3 title, line-clamp-2 excerpt
  - ServiceTile: capability strip tile with h3, description, mono tag, hover-reveal ArrowRight
  - CapabilityCard: Data & Analytics sub-grid card with Pill-based tech tags
  - Pullquote: Fraunces italic blockquote with indigo accent quote mark, optional attribution

affects: [02-04-home-page, 02-05-portfolio-index, 02-06-services-page, 02-07-case-study-template, 02-08-case-study-content]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Card components are Server Components — no use client; all interactivity is pure CSS (group-hover)"
    - "next/image fill prop requires relative positioning on parent — enforced in PortfolioCard image container"
    - "Pill as='span' pattern for non-interactive tags (CapabilityCard uses this)"
    - "Hover-reveal arrow uses group + opacity-0/-translate-x-2 -> opacity-100/translate-x-0 with transition-all duration-normal"
    - "blockquote for Pullquote — semantic HTML for accessibility (WCAG 2.1 AA)"

key-files:
  created:
    - components/cards/PortfolioCard.tsx
    - components/cards/ServiceTile.tsx
    - components/cards/CapabilityCard.tsx
    - components/ui/Pullquote.tsx
  modified: []

key-decisions:
  - "Card components are pure Server Components — hover states handled by CSS group-hover, no Framer Motion at this stage (Phase 3 adds animation)"
  - "PortfolioCard defines local prop interface mirroring CaseStudyFrontmatter fields — avoids cross-plan type dependency per plan spec"
  - "Pullquote uses &ldquo; (curly quote) not straight quote for typographic correctness"
  - "Caption gets text-accent override for PortfolioCard kicker — base Caption is text-muted, per DESIGN.md card spec"

patterns-established:
  - "Pattern: Server Component cards — all card/tile components are RSC with CSS-only hover states"
  - "Pattern: next/image fill always paired with relative parent and aspect-ratio sibling class"

requirements-completed: []

# Metrics
duration: 2min
completed: 2026-04-26
---

# Phase 02 Plan 02: Card Components Summary

**Four typed Server Component cards — PortfolioCard (16:10 next/image, accent kicker), ServiceTile (CSS hover-reveal ArrowRight), CapabilityCard (Pill tag row), Pullquote (Fraunces italic blockquote with indigo accent mark)**

## Performance

- **Duration:** 2 min
- **Started:** 2026-04-26T11:17:34Z
- **Completed:** 2026-04-26T11:19:34Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- PortfolioCard: 16:10 aspect-ratio card with next/image fill, accent-colored Caption kicker, h3 title, line-clamp-2 excerpt, group hover shadow + image scale, links to /portfolio/[slug]
- ServiceTile: capability strip tile with hover-reveal ArrowRight icon that slides from opacity-0/-translate-x-2 to opacity-100/translate-x-0
- CapabilityCard: Data & Analytics sub-grid card composing Pill as="span" for 3 tech-stack tags
- Pullquote: semantic blockquote with Fraunces display font, indigo decorative quote mark, optional attribution footer, TODO comment per D-08 (no fabricated testimonials)

## Task Commits

Each task was committed atomically:

1. **Task 1: Build PortfolioCard and ServiceTile components** - `1b6f1d6` (feat)
2. **Task 2: Build CapabilityCard and Pullquote components** - `09f3760` (feat)

## Files Created/Modified
- `components/cards/PortfolioCard.tsx` - 16:10 portfolio case study card linking to /portfolio/[slug]
- `components/cards/ServiceTile.tsx` - Capability strip tile with hover-reveal ArrowRight from lucide-react
- `components/cards/CapabilityCard.tsx` - Data & Analytics sub-grid card with Pill-based tech tags
- `components/ui/Pullquote.tsx` - Fraunces italic blockquote with indigo accent decorative quote mark

## Decisions Made
- PortfolioCard defines its own local prop interface (mirrors CaseStudyFrontmatter) to avoid cross-plan type dependency during parallel wave execution — type import can be updated after Plan 01 lands
- Pullquote uses `&ldquo;` curly quote character for typographic correctness per Editorial Light design philosophy
- Caption component used in PortfolioCard with `className="text-accent"` override — base Caption is text-muted, but DESIGN.md specifies accent color for card category kickers

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Added relative positioning to PortfolioCard image container**
- **Found during:** Task 1 (PortfolioCard implementation)
- **Issue:** next/image with fill prop requires the parent container to have position: relative — without it, the image does not render correctly at runtime
- **Fix:** Added `relative` to the image container div class list
- **Files modified:** components/cards/PortfolioCard.tsx
- **Verification:** TypeScript passes; fill + relative is the documented next/image pattern
- **Committed in:** 1b6f1d6 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 bug fix — missing relative positioning for next/image fill)
**Impact on plan:** Essential correctness fix. No scope creep.

## Issues Encountered
None beyond the next/image positioning fix documented above.

## User Setup Required
None — no external service configuration required.

## Known Stubs
None — all components are pure presentational with typed props. No hardcoded data or placeholder strings that flow to UI rendering. Pullquote has a TODO comment per D-08 (no fabricated testimonials), but this is an intentional design constraint, not a data stub — the component correctly renders only when real quote data is passed.

## Next Phase Readiness
- All 4 card/UI components ready for import by page plans (02-04 Home, 02-05 Portfolio Index, 02-06 Services, 02-07 Case Study Template)
- PortfolioCard accepts slug, title, category, subcategory, excerpt, heroImage, heroImageAlt — page plans should pass these from CaseStudyFrontmatter
- ServiceTile accepts title, description, tag, href — Services page passes anchor links
- CapabilityCard accepts title, description, tags[], href — Services page Data & Analytics sub-grid
- Pullquote accepts quote and optional attribution — case study outcome sections

---
*Phase: 02-content-pages*
*Completed: 2026-04-26*
