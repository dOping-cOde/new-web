---
phase: 04-quality
plan: "01"
subsystem: SEO Infrastructure
tags: [seo, metadata, og-images, sitemap, robots, canonical-urls]
dependency_graph:
  requires: []
  provides:
    - sitemap.xml route
    - robots.txt route
    - default OG image at 1200x630
    - per-case-study dynamic OG images at 1200x630
    - metadataBase for canonical URL resolution
    - OG/Twitter tags on all routes
  affects:
    - app/layout.tsx
    - app/page.tsx
    - app/services/page.tsx
    - app/portfolio/page.tsx
    - app/about/page.tsx
    - app/contact/page.tsx
    - app/portfolio/[slug]/opengraph-image.tsx
tech_stack:
  added: []
  patterns:
    - Next.js MetadataRoute.Sitemap for auto-generated sitemap
    - Next.js MetadataRoute.Robots for robots.txt
    - next/og ImageResponse for OG image generation at build time
    - metadataBase for canonical URL resolution without per-page alternates.canonical
key_files:
  created:
    - app/sitemap.ts
    - app/robots.ts
    - app/opengraph-image.tsx
    - app/portfolio/[slug]/opengraph-image.tsx
  modified:
    - app/layout.tsx
    - app/page.tsx
    - app/services/page.tsx
    - app/portfolio/page.tsx
    - app/about/page.tsx
    - app/contact/page.tsx
decisions:
  - "metadataBase in root layout resolves all page-level metadata to absolute canonical URLs — no per-page alternates.canonical needed (Next.js handles this automatically)"
  - "Home page title shortened to 50 chars: 'Softwires Technologies — AI for the Physical World' (was 62 chars, over 60-char limit)"
  - "Services description shortened to 142 chars, Portfolio description to 143 chars (both were over 160-char limit)"
  - "OG image uses system fonts only — no custom font loading in edge runtime to avoid OG image generation failures"
  - "Per-slug OG image uses getCaseStudyBySlug (synchronous) not getAllCaseStudies — no async overhead at render time"
metrics:
  duration: "4 minutes"
  completed: "2026-04-26"
  tasks: 2
  files_created: 4
  files_modified: 6
---

# Phase 04 Plan 01: SEO Infrastructure Summary

**One-liner:** sitemap.ts + robots.ts + default/per-slug 1200x630 OG images + metadataBase canonical URL resolution + OG/Twitter tags across all 7 routes.

## What Was Built

### Task 1: sitemap.ts, robots.ts, default OG image

**app/sitemap.ts** — Auto-generated sitemap with 5 static routes plus all 11 case study dynamic routes (16 total). Uses `getCaseStudySlugs()` from `lib/portfolio.ts`. Base URL from `NEXT_PUBLIC_SITE_URL` with `https://softwires.in` fallback. Priority 1.0 for home, 0.8 for main pages, 0.6 for case studies.

**app/robots.ts** — Allows all crawlers (`*`), references `${baseUrl}/sitemap.xml`. Uses same env var pattern.

**app/opengraph-image.tsx** — Default 1200x630 OG image: dark background (#0A0A0A), indigo accent line (#3D2BFF), "Softwires Technologies" in white, subtitle in muted grey. Uses `next/og` ImageResponse with system fonts to avoid edge runtime font loading issues.

### Task 2: Metadata completion and per-case-study OG images

**app/layout.tsx** — Added `metadataBase: new URL(baseUrl)`, `openGraph.type/locale/siteName`, and `twitter.card`. The metadataBase makes Next.js automatically resolve all page-level relative URLs to absolute canonical URLs.

**app/portfolio/[slug]/opengraph-image.tsx** — Per-case-study dynamic OG image at 1200x630. Shows category + subcategory kicker, indigo accent line, case study title, excerpt (truncated at 120 chars), and "softwires.in" watermark. `generateStaticParams()` pre-generates all 11 case study OG images at build time.

**All route metadata** — Added `openGraph.title` and `openGraph.description` to: home, services, portfolio, about, contact pages. Titles under 60 chars, descriptions under 160 chars for all routes.

## Success Criteria Verification

- [x] Every route has a unique title under 60 chars — verified (home: 50, services: 20, portfolio: 21, about: 17, contact: 19)
- [x] Every route has a meta description under 160 chars — verified (max: 156 chars)
- [x] Every page has Open Graph and Twitter Card meta tags — OG set per page, twitter.card in root layout
- [x] Each case study has a dynamically generated OG image at 1200x630 — 11 OG images generated at build time
- [x] sitemap.xml reachable at /sitemap.xml — confirmed in build output
- [x] robots.txt allows all crawlers and references sitemap — confirmed in robots.ts
- [x] Canonical URLs from NEXT_PUBLIC_SITE_URL via metadataBase — confirmed in layout.tsx
- [x] All images have descriptive alt text; hero images have priority — verified (HeroDark uses `priority`, PortfolioCard doesn't for non-hero cards)
- [x] `pnpm build` succeeds with 0 errors — confirmed (33/33 static pages generated)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Home page title exceeded 60-char limit**
- **Found during:** Task 2 (title audit)
- **Issue:** "Softwires Technologies — AI Engineering for the Physical World" = 62 chars (plan said "56 chars, OK" but actual Unicode count was 62)
- **Fix:** Shortened to "Softwires Technologies — AI for the Physical World" = 50 chars
- **Files modified:** app/page.tsx
- **Commit:** ca04735

**2. [Rule 1 - Bug] Services description exceeded 160-char limit**
- **Found during:** Task 2 (description audit)
- **Issue:** Original description = 161 chars
- **Fix:** Shortened to 142 chars: "Six AI engineering capabilities: autonomous agents to grid intelligence. Full-stack AI for energy, healthcare, infrastructure, and enterprise."
- **Files modified:** app/services/page.tsx
- **Commit:** ca04735

**3. [Rule 1 - Bug] Portfolio description exceeded 160-char limit**
- **Found during:** Task 2 (description audit)
- **Issue:** Original description = 174 chars
- **Fix:** Shortened to 143 chars: "Eleven AI systems built for production — transformer monitoring to cancer screening. Industries: Energy, Healthcare, Infrastructure, Insurance."
- **Files modified:** app/portfolio/page.tsx
- **Commit:** ca04735

### Note on Concurrent Plan Execution

Plan 04-02 (JSON-LD) ran concurrently and made beneficial modifications to files this plan also touched:
- Added `organizationJsonLd()` to layout.tsx
- Added `websiteJsonLd()` to app/page.tsx
- Added `serviceJsonLd()` to app/services/page.tsx
- Improved OG image inner divs with `display: 'flex'` (required by next/og)

These changes are complements to this plan's work, not conflicts. Both plans' changes are present in the working tree and will be committed by 04-02.

## Known Stubs

None — all SEO infrastructure is fully wired. OG images render real case study data (title, category, excerpt) from the MDX frontmatter.

## Self-Check: PASSED

Files verified:
- app/sitemap.ts — FOUND
- app/robots.ts — FOUND
- app/opengraph-image.tsx — FOUND
- app/portfolio/[slug]/opengraph-image.tsx — FOUND
- app/layout.tsx has metadataBase — VERIFIED
- app/page.tsx has openGraph — VERIFIED
- app/services/page.tsx has openGraph — VERIFIED
- app/portfolio/page.tsx has openGraph — VERIFIED
- app/about/page.tsx has openGraph — VERIFIED
- app/contact/page.tsx has openGraph — VERIFIED

Commits verified:
- c96859f — Task 1: sitemap.ts, robots.ts, opengraph-image.tsx
- ca04735 — Task 2: layout.tsx metadataBase + OG tags + per-slug OG image
