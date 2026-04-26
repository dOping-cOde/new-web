---
phase: 02-content-pages
plan: "06"
subsystem: ui
tags: [next.js, mdx, react, tailwind, portfolio, filtering, gray-matter, zod]

# Dependency graph
requires:
  - phase: 02-content-pages-01
    provides: MDX pipeline (gray-matter + globby + Zod), getAllCaseStudies loader, caseStudySchema
  - phase: 02-content-pages-02
    provides: PortfolioCard, PortfolioCard interface, Pill, Caption components
  - phase: 02-content-pages-03
    provides: HeroLight, CTABand section components

provides:
  - app/portfolio/page.tsx: async Server Component Portfolio index page
  - app/portfolio/PortfolioGrid.tsx: client component for category filter bar + card grid
  - content/portfolio/*.mdx: 11 stub MDX files with Zod-conforming frontmatter for all case studies

affects:
  - 02-07 (Tier A case study detail pages — needs the 5 Tier A MDX stubs)
  - 02-08 (Tier B case study detail pages — needs the 6 Tier B MDX stubs)
  - Phase 03 (animation — adds FLIP to filter grid, hover-lift to cards)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Server Component page loads data, passes CaseStudyFrontmatter[] to client PortfolioGrid
    - Client PortfolioGrid owns filter state (useState), renders Pill bar + card grid
    - Filter bar is sticky below 64px navbar with bg-bg-light/95 + backdrop-blur-sm
    - MDX stubs: YAML frontmatter only, placeholder comment body, passes Zod validation at build time

key-files:
  created:
    - app/portfolio/page.tsx
    - app/portfolio/PortfolioGrid.tsx
    - content/portfolio/idtrm.mdx
    - content/portfolio/bridgesense.mdx
    - content/portfolio/salt-lick.mdx
    - content/portfolio/ai-copter.mdx
    - content/portfolio/fwa-platform.mdx
    - content/portfolio/unified-semantic-fabric.mdx
    - content/portfolio/bi-acceleration-engine.mdx
    - content/portfolio/multidimensional-olap-modernization.mdx
    - content/portfolio/cloud-analytics-cost-optimization.mdx
    - content/portfolio/conversational-data-agent.mdx
    - content/portfolio/enterprise-reporting-suite.mdx
  modified:
    - app/services/page.tsx (Rule 1 auto-fix: removed unused Metadata import)
    - app/services/AnchorNav.tsx (Rule 1 auto-fix: noUncheckedIndexedAccess null-guard)

key-decisions:
  - "Portfolio page split into Server Component (page.tsx) + Client Component (PortfolioGrid.tsx) — server loads data, client owns filter state"
  - "PortfolioGrid.tsx extracted to separate file rather than inlined — cleaner use client boundary, avoids Next.js warning about server+client mix"
  - "MDX stubs use YAML frontmatter only with placeholder comment body — sufficient for Zod validation and getAllCaseStudies() to return data"
  - "Filter bar uses CATEGORIES from lib/types.ts — single source of truth for category enum"

patterns-established:
  - "Pattern: Server page + adjacent PortfolioGrid.tsx — this server/client split pattern for data-loading + interactive UI should be reused for any future index pages"

requirements-completed: [PAGE-03]

# Metrics
duration: 15min
completed: 2026-04-26
---

# Phase 02 Plan 06: Portfolio Index Page Summary

**Portfolio index page at /portfolio with sticky filter bar, 3-col card grid, and 11 Zod-validated MDX stub files for all case studies**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-04-26T11:30:00Z
- **Completed:** 2026-04-26T11:45:00Z
- **Tasks:** 1 (+ 2 auto-fixes)
- **Files modified:** 15

## Accomplishments

- Portfolio index page renders hero (HeroLight), sticky filter bar (6 category pills from CATEGORIES), and responsive 3-column card grid using PortfolioCard components
- Client-side filtering: clicking a category pill instantly shows only matching cards; "All" shows all 11
- 11 MDX stub files in content/portfolio/ with complete Zod-conforming frontmatter — enables both the Portfolio index AND the case study detail pages (Plans 07-08) to have data immediately
- pnpm build exits 0; /portfolio route pre-rendered as static content

## Task Commits

1. **Task 1: Build Portfolio index page with filter bar and card grid** — `c0d896d` (feat)
   - Auto-fix 1 (Rule 1): `c0d896d` — removed unused Metadata import from services/page.tsx
   - Auto-fix 2 (Rule 1): previously committed as `479b780` — services/page.tsx fully refactored to Server Component

## Files Created/Modified

- `app/portfolio/page.tsx` — async Server Component; exports metadata, calls getAllCaseStudies, renders HeroLight + PortfolioGrid + CTABand
- `app/portfolio/PortfolioGrid.tsx` — "use client"; owns activeFilter state, renders sticky filter bar (Pill per CATEGORIES) + card grid (PortfolioCard per filtered case study)
- `content/portfolio/idtrm.mdx` — Tier A stub: Energy/IoT, Esperer-adjacent DISCOM client, 4 stats
- `content/portfolio/bridgesense.mdx` — Tier A stub: Infrastructure/Computer Vision, 4 LiDAR stats
- `content/portfolio/salt-lick.mdx` — Tier A stub: Healthcare/AI Platform, Esperer Bioresearch client
- `content/portfolio/ai-copter.mdx` — Tier A stub: Infrastructure/Drone AI, Mining Corporation
- `content/portfolio/fwa-platform.mdx` — Tier A stub: Insurance/Fraud Detection, public-sector insurer
- `content/portfolio/unified-semantic-fabric.mdx` — Tier B stub: Data & Analytics/Semantic Layer
- `content/portfolio/bi-acceleration-engine.mdx` — Tier B stub: Data & Analytics/Performance
- `content/portfolio/multidimensional-olap-modernization.mdx` — Tier B stub: Data & Analytics/OLAP
- `content/portfolio/cloud-analytics-cost-optimization.mdx` — Tier B stub: Data & Analytics/FinOps
- `content/portfolio/conversational-data-agent.mdx` — Tier B stub: Data & Analytics/NLP
- `content/portfolio/enterprise-reporting-suite.mdx` — Tier B stub: Data & Analytics/Reporting
- `app/services/page.tsx` — Rule 1 auto-fix: removed unused Metadata import (build was failing)
- `app/services/AnchorNav.tsx` — Rule 1 auto-fix: noUncheckedIndexedAccess null-guard on intersecting[0]

## Decisions Made

- **Server/Client split:** page.tsx is a Server Component (async, no "use client") — loads all case studies via getAllCaseStudies(). PortfolioGrid.tsx is a separate "use client" component for filter state. This avoids mixing server and client concerns in one file and provides clean prop boundary.
- **PortfolioGrid in separate file:** The plan allowed inline or separate. Separate file was chosen to keep the page.tsx clean and avoid Next.js warnings about mixing server/client code.
- **Filter bar ARIA:** Added `role="navigation"` + `aria-label="Filter portfolio by industry"` on the filter bar wrapper and `aria-pressed` on each Pill button for screen reader accessibility.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Removed unused Metadata import from app/services/page.tsx**
- **Found during:** Task 1 (pnpm build verification)
- **Issue:** `Metadata` imported from "next" but never used — ESLint rule `@typescript-eslint/no-unused-vars` fails the build
- **Fix:** Removed the unused `import type { Metadata } from "next"` line
- **Files modified:** `app/services/page.tsx`
- **Verification:** pnpm build exits 0 after fix
- **Committed in:** c0d896d (Task 1 commit)

**2. [Rule 1 - Bug] Added null-guard for noUncheckedIndexedAccess in app/services/AnchorNav.tsx**
- **Found during:** Task 1 (pnpm build verification — second pass)
- **Issue:** `intersecting[0].target.id` at line 38 fails TypeScript strict mode (`noUncheckedIndexedAccess: true`) — element may be undefined
- **Fix:** Assigned `const first = intersecting[0]` and used `if (first)` guard before accessing `.target.id`
- **Files modified:** `app/services/AnchorNav.tsx`
- **Verification:** pnpm build exits 0 after fix
- **Committed in:** Previously committed as `479b780`

---

**Total deviations:** 2 auto-fixed (both Rule 1 — pre-existing bugs in services page from prior plan)
**Impact on plan:** Both auto-fixes were in unrelated services files but blocked the build. No scope creep.

## Known Stubs

All 11 MDX files in `content/portfolio/` are intentional stubs with only frontmatter. Body content is empty (placeholder comment only). These stubs are intentional — Plans 07-08 will add full MDX body content for Tier A and Tier B case studies respectively. The stub data is sufficient for:
- `getAllCaseStudies()` to return all 11 case studies with correct sort order
- PortfolioCard to render title, category, subcategory, excerpt, heroImage
- Hero images will 404 until real images are added (non-blocking for build)

## Issues Encountered

- Two pre-existing build failures in app/services/ (unused import, strict TypeScript array access) required auto-fixing before the portfolio page could be verified. Both were from Plan 02-05 which had not yet been fully verified.

## Next Phase Readiness

- /portfolio route is live with all 11 cards and working filter bar
- 11 stub MDX files are ready for Plans 07-08 to fill in full case study content
- getAllCaseStudies() returns all 11 in the correct sort order (Tier A first per TIER_A_ORDER, then Tier B alphabetically)
- No blockers for Plan 07 (Tier A case study detail pages)

---
*Phase: 02-content-pages*
*Completed: 2026-04-26*
