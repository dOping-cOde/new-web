---
phase: 02-content-pages
plan: "04"
subsystem: ui
tags: [next.js, react, tailwind, home-page, server-components, typescript]

requires:
  - phase: 02-01
    provides: MDX pipeline, case study content in content/portfolio/*.mdx
  - phase: 02-02
    provides: PortfolioCard, ServiceTile, CapabilityCard components + PortfolioGrid client component
  - phase: 02-03
    provides: HeroLight, HeroDark, CTABand, ManifestoBand section components + StatBlock, SectionHeader UI components

provides:
  - Complete Home page at / with all 7 sections rendered in production order
  - content/services.ts: short-title capability data for home page ServiceTile grid
  - PortfolioCard graceful placeholder rendering when heroImage is empty string

affects:
  - phase-03-animation (adds GSAP/Framer Motion to home page hero, capability strip, portfolio teaser)
  - phase-03-webgl (adds Three.js particle field to hero section, HeroParticleField.tsx)

tech-stack:
  added: []
  patterns:
    - "Home page is a pure Server Component — no useState, no useEffect, no 'use client'"
    - "Section ordering follows build spec 4.1: Hero → Capability Strip → Featured Case Study (dark) → Portfolio Teaser → Manifesto → CTA"
    - "Featured cards in Portfolio Teaser are hardcoded (BridgeSense, Salt-Lick, AI-Copter, FWA Platform) per spec"
    - "PortfolioCard renders a styled div placeholder when heroImage is empty — no broken next/image calls"
    - "Capability strip imports from content/services.ts (short display titles) not lib/services.ts (full service metadata)"

key-files:
  created:
    - app/page.tsx
    - content/services.ts
  modified:
    - components/cards/PortfolioCard.tsx

key-decisions:
  - "content/services.ts created with short display titles for home page ServiceTile grid — lib/services.ts retains full metadata for services page"
  - "PortfolioCard heroImage treated as optional: empty string triggers placeholder div instead of broken Image"
  - "Featured Case Study section uses hardcoded iDTRM data inline (not fetched from MDX) — avoids async server component complexity on home page"
  - "StatBlock in dark section uses dark={true} prop — design system handles color inversion"

patterns-established:
  - "Home page Server Component pattern: all data sourced from static imports (CAPABILITIES), no async data fetching required"
  - "Placeholder pattern: empty heroImage string triggers fallback div with heroImageAlt as label text"

requirements-completed: [PAGE-01]

duration: 5min
completed: 2026-04-26
---

# Phase 2 Plan 4: Home Page Summary

**Complete Home page built with all 7 sections — Hero with accent highlight, 6-tile capability strip from content/services.ts, iDTRM dark cinematic section with 4 stat blocks, 4-card portfolio teaser, ManifestoBand and CTABand**

## Performance

- **Duration:** 5 min
- **Started:** 2026-04-26T11:22:48Z
- **Completed:** 2026-04-26T11:27:42Z
- **Tasks:** 1
- **Files modified:** 3 (+ 3 bug fixes in pre-existing files)

## Accomplishments

- Home page (`/`) renders all 7 sections in correct order with production-ready copy
- Hero headline "AI engineered for the physical world." with "engineered" in Deep Indigo accent via HeroLight highlightWord prop
- Capability strip renders 6 ServiceTile components from content/services.ts in 3×2 desktop grid
- Featured Case Study is a full-bleed dark section (data-theme="dark") with iDTRM content, 4 stat blocks, and dashboard placeholder
- Portfolio teaser shows 4 PortfolioCard components (BridgeSense, Salt-Lick, AI-Copter, FWA Platform) with placeholder images handled gracefully
- ManifestoBand and CTABand render with baked-in production copy from Wave 1 components
- pnpm build exits 0 — all 6 static routes generated successfully

## Task Commits

1. **Task 1: Build the Home page** - `1fd1fb7` (feat)
2. **Rule 3 fix: Convert services page to server component** - `479b780` (fix)

**Plan metadata:** (docs commit — see below)

## Files Created/Modified

- `app/page.tsx` - Complete Home page with all 7 sections as Server Component
- `content/services.ts` - Short-title capability tile data for home page ServiceTile grid
- `components/cards/PortfolioCard.tsx` - Added graceful placeholder rendering when heroImage is empty string
- `app/services/page.tsx` - (Rule 3) Converted from broken "use client" + metadata export to clean server component importing ServicesAnchorNav from AnchorNav.tsx
- `app/services/AnchorNav.tsx` - (Rule 3) Fixed noUncheckedIndexedAccess TS error: intersecting[0] guard
- `app/portfolio/page.tsx` - (already fixed by prior process) Proper server component page for portfolio index

## Decisions Made

- `content/services.ts` was created with short display titles (e.g. "AI Agent Development") for the home page capability strip. `lib/services.ts` retains full service metadata used by the services page. This keeps the home page tile copy lean and independent from the services page section copy.
- `PortfolioCard` heroImage is now treated as optional: passing an empty string renders a styled placeholder div with the heroImageAlt text. This allows home page to render correctly before real photography is available.
- The Featured Case Study iDTRM section uses inline hardcoded data rather than fetching from MDX. The home page is a Server Component and doesn't need async data loading for a single featured callout.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Fixed noUncheckedIndexedAccess TS error in app/services/page.tsx**
- **Found during:** Task 1 (pnpm build verification)
- **Issue:** `intersecting[0].target.id` — `intersecting[0]` is `IntersectionObserverEntry | undefined` under strict TS noUncheckedIndexedAccess. Build failed with type error.
- **Fix:** Added `const first = intersecting[0]; if (first) { setActiveId(first.target.id); }`
- **Files modified:** `app/services/page.tsx`
- **Verification:** pnpm build passed
- **Committed in:** 1fd1fb7

**2. [Rule 3 - Blocking] Fixed noUncheckedIndexedAccess TS error in app/services/AnchorNav.tsx**
- **Found during:** Task 1 (second pnpm build attempt after first fix)
- **Issue:** Same pattern as above but in the standalone AnchorNav client component.
- **Fix:** Same guard pattern: `const first = intersecting[0]; if (first) { setActiveId(first.target.id); }`
- **Files modified:** `app/services/AnchorNav.tsx`
- **Verification:** pnpm build passed
- **Committed in:** 1fd1fb7

**3. [Rule 3 - Blocking] Fixed services/page.tsx "use client" + metadata export conflict**
- **Found during:** Task 1 (pnpm build — Next.js 15 strict enforcement)
- **Issue:** `app/services/page.tsx` had `"use client"` directive AND `export const metadata: Metadata` — Next.js 15 forbids metadata exports from client components.
- **Fix:** File was restructured as a server component; `ServicesAnchorNav` imported from the pre-existing `AnchorNav.tsx` client component.
- **Files modified:** `app/services/page.tsx`
- **Verification:** pnpm build passed, /services route generates as static
- **Committed in:** 479b780

---

**Total deviations:** 3 auto-fixed (3 blocking build errors in pre-existing files from prior plans)
**Impact on plan:** All fixes necessary for build to succeed. No scope creep — each fix corrected a pre-existing error that surfaced during home page build verification.

## Known Stubs

- **`app/page.tsx` lines 36–62:** `FEATURED_CARDS` array uses `heroImage: ""` (empty string) for all 4 cards. PortfolioCard renders a placeholder div. Real photography will replace these in a future phase.
- **`app/page.tsx` around dark section:** Dashboard placeholder div with text "iDTRM Dashboard — geo-tagged map + live KPI tiles". Real SVG/HTML mock or screenshot needed.
- **`app/page.tsx` hero children:** `<div className="absolute inset-0 -z-10" />` placeholder for Three.js particle field. Phase 3 will add HeroParticleField.tsx.

## Issues Encountered

- Build revealed 3 pre-existing TypeScript errors in services/page.tsx and services/AnchorNav.tsx from prior plans (02-02, 02-03) that were not caught before because the build was not run against those files in isolation.

## Next Phase Readiness

- Home page complete — all 7 sections render with production copy
- `/` route generates as 183B static page (110kB first load JS)
- TODO items marked with comments for Phase 3: particle field, animation reveals, dashboard mock
- Services page (/services) also now builds correctly as a server component

---
*Phase: 02-content-pages*
*Completed: 2026-04-26*
