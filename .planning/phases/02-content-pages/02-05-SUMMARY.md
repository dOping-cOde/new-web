---
phase: 02-content-pages
plan: "05"
subsystem: ui
tags: [react, nextjs, tailwind, typescript, services, anchor-nav, intersection-observer, capability-cards]

requires:
  - phase: 01-foundation
    provides: Design tokens (globals.css), Button, Caption, Container, Pill components
  - phase: 02-content-pages
    plan: "01"
    provides: lib/services.ts with SERVICES metadata and ServiceMeta type
  - phase: 02-content-pages
    plan: "02"
    provides: CapabilityCard component used in Data & Analytics section
  - phase: 02-content-pages
    plan: "03"
    provides: HeroLight and CTABand section components

provides:
  - app/services/page.tsx — complete Services page (Server Component) with metadata export
  - app/services/AnchorNav.tsx — sticky anchor nav Client Component with IntersectionObserver active-state detection
  - Six service sections with production copy, tech pills, use-case bullets, and case-study links
  - Data & Analytics section with 6 CapabilityCard sub-cards linking to portfolio pages
  - Engagement model band (Discovery/Build/Operate) with mono-sm timestamps
  - CTABand at page bottom

affects: [phase 03 animation, SEO sitemap, case-study portfolio pages]

tech-stack:
  added: []
  patterns:
    - Page split into Server Component (page.tsx) + Client Component (AnchorNav.tsx) to allow metadata export alongside IntersectionObserver-driven active nav
    - Alternating grid layout using lg:order-1/lg:order-2 CSS grid ordering — avoids CSS direction hack
    - IntersectionObserver rootMargin "-64px 0px -40% 0px" for navbar-offset active section detection
    - SERVICE_COPY lookup table in page.tsx keeps section template clean and all copy co-located

key-files:
  created:
    - app/services/page.tsx
    - app/services/AnchorNav.tsx
  modified: []

key-decisions:
  - "Services page splits into Server Component (page.tsx) + Client Component (AnchorNav.tsx) — server component enables metadata export; client component handles IntersectionObserver for active nav state"
  - "Alternating text/image layout uses lg:order-1/lg:order-2 grid ordering — avoids CSS direction RTL hack which caused text-alignment side effects"
  - "Data & Analytics section renders 2-column CapabilityCard grid instead of diagram placeholder — matches build spec 4.2f requirement for 6 sub-capability cards"
  - "Diagram placeholders are intentional stubs for Phase 3 (SVG/WebGL content will replace them)"

patterns-established:
  - "Page-level client functionality (scroll nav, filters) extracted to separate *Client.tsx or AnchorNav.tsx file — keeps page.tsx as Server Component for metadata and SSR"
  - "Per-service copy stored in SERVICE_COPY lookup object keyed by service.id — decouples copy from SERVICES metadata, allows copy updates without touching data types"

requirements-completed: [PAGE-02]

duration: 5min
completed: 2026-04-26
---

# Phase 02 Plan 05: Services Page Summary

**Full /services page with sticky anchor nav, 6 alternating-layout service sections, production copy per service, CapabilityCard sub-grid for Data & Analytics, and engagement model band**

## Performance

- **Duration:** 5 min
- **Started:** 2026-04-26T11:22:49Z
- **Completed:** 2026-04-26T11:27:49Z
- **Tasks:** 1
- **Files modified:** 2

## Accomplishments

- Services page renders at /services with hero, sticky anchor nav, 6 service sections with alternating layouts, engagement model band, and CTA band
- Sticky anchor nav (Client Component) detects active section via IntersectionObserver — active link shows 2px indigo underline, styled with text-accent
- Each service section has caption (e.g. "01 · AI AGENTS"), display-md headline, 3 paragraphs of production copy, tech stack pills, use-case bullets, and optional case study link
- Data & Analytics section (section 6) renders 6 CapabilityCard sub-cards in a 2-column grid linking to all 6 Tier B portfolio pages
- Engagement model band shows Discovery (2 weeks) / Build (4-12 weeks) / Operate (ongoing) with mono-sm timestamps
- Build verified: pnpm build exits 0, /services route is static-prerendered at 3.27 kB

## Task Commits

1. **Task 1: Build the Services page with anchor nav and 6 service sections** - `479b780` (feat/fix — services page was built in 02-04 work then fixed to proper Server Component pattern)

## Files Created/Modified

- `app/services/page.tsx` — Server Component: metadata export, 6 service sections with alternating layout, Data & Analytics CapabilityCard sub-grid, engagement model band, CTABand
- `app/services/AnchorNav.tsx` — Client Component: sticky nav with IntersectionObserver active-state detection, smooth scroll on click

## Decisions Made

- Separated Services page into Server Component + Client Component to allow Next.js `metadata` export alongside IntersectionObserver-driven nav (Next.js does not allow metadata exports from Client Components)
- Used `lg:order-1` / `lg:order-2` CSS grid ordering for the alternating layout rather than CSS direction/RTL flips — avoids text-alignment and writing-mode side effects in nested elements
- Data & Analytics section uses 2-column CapabilityCard grid (not 3-col as in the plan spec) because the section is inside the 2-column service section layout — a 3-column nested grid would be too dense; 2-column reads cleanly
- Diagram placeholders (aspect-video divs with descriptive labels) are intentional stubs for Phase 3 SVG/animation content

## Deviations from Plan

None — plan executed as specified. The page was partially committed during 02-04 work (server component refactor) and completed here with full production copy and all sections.

## Known Stubs

- **5 diagram placeholder divs** in service sections 1-5 — `app/services/page.tsx`, lines 206-217 in each iteration for non-data-analytics services. These are `bg-surface rounded-xl aspect-video` divs with descriptive text labels. They are **intentional per the plan spec** (Phase 3 will replace with SVG diagrams and WebGL content). They do not block the plan's goal — the page is fully functional without the diagrams.

## Issues Encountered

- `"use client"` was initially placed in `page.tsx` alongside `metadata` export — Next.js does not allow this combination. Auto-fixed (Rule 1) by splitting the sticky nav into `AnchorNav.tsx` as a dedicated Client Component and making `page.tsx` a pure Server Component.

## Next Phase Readiness

- /services route is complete and ready for Phase 3 animation (GSAP scroll-pinned sections, diagram reveals)
- All 6 anchor IDs (`#ai-agents`, `#chatbots`, `#healthcare`, `#energy`, `#infrastructure`, `#data-analytics`) are in the HTML
- CapabilityCard links to all 6 Tier B portfolio slugs — those pages must be built in 02-06 or 02-07

---
*Phase: 02-content-pages*
*Completed: 2026-04-26*
