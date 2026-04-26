---
phase: 02-content-pages
plan: 07
subsystem: content
tags: [mdx, nextjs, case-study, dynamic-routing, tier-a, portfolio]

# Dependency graph
requires:
  - phase: 02-content-pages
    provides: "lib/portfolio.ts data loaders, lib/types.ts Zod schema, HeroDark.tsx component, PortfolioCard.tsx, mdx-components.tsx with ProblemSection/SystemSection/Architecture/AIStack/Outcomes"
provides:
  - "Dynamic /portfolio/[slug] route template with Tier A and Tier B layout rendering"
  - "5 complete Tier A MDX case study files with production copy and real deck numbers"
  - "generateStaticParams for all 11 case study slugs"
  - "Up-next navigation via relatedSlugs frontmatter"
affects: [phase-03-animation, phase-04-seo]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "dynamicParams = false with generateStaticParams for clean 404s on unknown slugs"
    - "Dynamic MDX import via @next/mdx compiled Server Components"
    - "Tier A/B layout split driven by frontmatter tier field"
    - "Related case study navigation resolved at render time from relatedSlugs"

key-files:
  created:
    - "app/portfolio/[slug]/page.tsx — Dynamic case study template with Tier A/B rendering and up-next navigation"
  modified:
    - "content/portfolio/idtrm.mdx — Full Tier A production copy, 8 DTRs stat (real deck figure)"
    - "content/portfolio/bridgesense.mdx — Full Tier A copy with 240kHz LiDAR specs, 3D-CNN ML stack"
    - "content/portfolio/salt-lick.mdx — Full Tier A copy naming Esperer Bioresearch, DPDP/NABH/IRDAI compliance"
    - "content/portfolio/ai-copter.mdx — Full Tier A copy with 6 use cases including boundary security"
    - "content/portfolio/fwa-platform.mdx — Full Tier A copy with AES-256/TLS 1.3 security specs"

key-decisions:
  - "dynamicParams = false ensures unknown slugs 404 cleanly without falling through to a catch-all"
  - "Tier A/B split is a runtime check (caseStudy.tier === 'A') not a build-time static route split"
  - "MDX body wrapped in plain <div> not prose container — each MDX section component handles its own padding and background"
  - "Up-next navigation resolves relatedSlugs against getAllCaseStudies() at render time — no additional data file needed"
  - "ai-copter.mdx fixed: replaced <30-second with sub-30-second to avoid MDX JSX parse error"

patterns-established:
  - "Dynamic MDX import: (await import('@/content/portfolio/${slug}.mdx')).default as React.ComponentType"
  - "Layout component pattern: TierALayout/TierBLayout inline in page.tsx — cleaner than separate files for page-specific layouts"
  - "Related studies filter: .filter((cs): cs is CaseStudyFrontmatter => cs !== undefined) for type-safe undefined filtering"

requirements-completed: [CASE-02, CASE-04, CASE-05, CASE-06, CASE-07, CASE-08]

# Metrics
duration: 25min
completed: 2026-04-26
---

# Phase 2 Plan 7: Case Study Template and Tier A MDX Summary

**Dynamic /portfolio/[slug] route template with Tier A/B layouts + 5 complete Tier A case study MDX files using real deck numbers from iDTRM, BridgeSense, Salt-Lick, AI-Copter, and FWA Platform**

## Performance

- **Duration:** ~25 min
- **Started:** 2026-04-26T12:00:00Z
- **Completed:** 2026-04-26T12:25:00Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments

- Built `app/portfolio/[slug]/page.tsx` with TierALayout and TierBLayout components, `generateStaticParams` for all 11 slugs, `generateMetadata` per case study, and up-next navigation via `relatedSlugs`
- Replaced all 5 Tier A MDX stubs with full production copy using real numbers from source decks: 8 DTRs (iDTRM), 240kHz LiDAR (BridgeSense), Esperer Bioresearch named (Salt-Lick), 6 use cases (AI-Copter), AES-256/TLS 1.3 (FWA Platform)
- Build passes: all 17 routes statically generated (5 top-level + 11 case studies + not-found), `pnpm build` exits 0

## Task Commits

1. **Task 1: Build the [slug] dynamic route template** - `d12ed43` (feat)
2. **Task 2: Write 5 Tier A case study MDX files** - `5f74428` (feat)

**Plan metadata:** (to be committed with this SUMMARY)

## Files Created/Modified

- `/Users/george/DEV/softwire/app/portfolio/[slug]/page.tsx` — Dynamic case study template: TierALayout (dark hero → MDX body → up-next), TierBLayout (shorter hero → MDX body → CTABand → up-next), generateStaticParams returning all 11 slugs, dynamicParams = false
- `/Users/george/DEV/softwire/content/portfolio/idtrm.mdx` — iDTRM Tier A: GPRS telemetry, RS485 Modbus, 8 DTRs stat (CASE-08 compliance), ML pipeline for predictive failure/theft/load forecasting
- `/Users/george/DEV/softwire/content/portfolio/bridgesense.mdx` — BridgeSense Tier A: DJI Matrice 300/Zenmuse L2, 240kHz pulse rate, 3D-CNN + LSTM + Isolation Forest stack, 0.92 F1-score
- `/Users/george/DEV/softwire/content/portfolio/salt-lick.mdx` — Salt-Lick Tier A: Esperer Bioresearch named directly (D-07/CASE-07), 1.4M+ cancer cases stat, TensorFlow multi-class classifier, DPDP/NABH/IRDAI compliance
- `/Users/george/DEV/softwire/content/portfolio/ai-copter.mdx` — AI-Copter Tier A: 6 use cases (boundary security, traffic control, PPE compliance, illumination, project monitoring, unsafe activity detection), YOLO edge inference
- `/Users/george/DEV/softwire/content/portfolio/fwa-platform.mdx` — FWA Platform Tier A: AES-256/TLS 1.3 security stack, gradient boosting + network graph + isolation forest ML, IRDAI-compliant report generation

## Decisions Made

- `dynamicParams = false` ensures unknown slugs 404 cleanly without a runtime catch-all
- Tier A/B layout split is a runtime check (`caseStudy.tier === "A"`) — this is more maintainable than static route splits
- MDX body wrapped in plain `<div>` — each section component (ProblemSection, SystemSection, etc.) handles its own background color and padding, not the page wrapper
- Up-next navigation resolves `relatedSlugs` against `getAllCaseStudies()` at render time — no separate data file needed, resolved in Server Component
- `<30-second` in ai-copter.mdx caused MDX JSX parse error; fixed to "sub-30-second" (Rule 1 auto-fix)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed MDX JSX parse error in ai-copter.mdx**
- **Found during:** Task 2 (write MDX files — build verification step)
- **Issue:** `<30-second` in prose body was interpreted as a JSX tag start by the MDX compiler, causing `Unexpected character '3' before name` build error
- **Fix:** Replaced `<30-second` with `sub-30-second` — preserves meaning, eliminates parse error
- **Files modified:** `content/portfolio/ai-copter.mdx`
- **Verification:** `pnpm build` exits 0 with all 17 routes generated
- **Committed in:** `5f74428` (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 — bug fix)
**Impact on plan:** Single character fix, no scope creep.

## Known Stubs

- All 5 Tier A MDX files contain `{/* TODO: real client quote pending approval — D-08 */}` placeholder inside the Outcomes section. The Quote components are not rendered (no quote block in MDX body — just the comment). This is intentional per D-08 and CASE-08. No live stub content flows to UI rendering.
- Client names for iDTRM ("[A leading central-Indian DISCOM]"), BridgeSense ("[State Highway Authority]"), AI-Copter ("[Mining Corporation]"), and FWA Platform ("[A Tier-1 public-sector general insurer]") are placeholder strings per D-07. These render as-is in the hero kicker. FWA Platform has an additional TODO comment about naming NIACL publicly.
- Hero images (`/images/portfolio/*.jpg`) are placeholder paths — the `<HeroDark>` component renders an `<Image>` tag with the path but no physical file exists yet. The component handles missing images gracefully (no `<Image>` rendered if heroImage is falsy, but since all MDX frontmatter has heroImage set, it will render a broken image in dev). This is pre-existing behavior from Plan 03/04 stub creation.

## Issues Encountered

None beyond the MDX JSX parse error which was auto-fixed.

## Next Phase Readiness

- All 11 case study routes render via generateStaticParams — Phase 3 animation can target these routes immediately
- Tier A content uses real deck numbers throughout — copy is production-ready
- Architecture section in each MDX uses `data-theme="dark"` (via the Architecture component in mdx-components.tsx) — Phase 3 scroll-pinning can target this section directly
- Up-next navigation wired — related case studies link correctly
- Phase 3 can add GSAP ScrollTrigger to the Architecture section without changing the import contract (mdx-components.tsx Architecture stub is designed for this)

---
*Phase: 02-content-pages*
*Completed: 2026-04-26*
