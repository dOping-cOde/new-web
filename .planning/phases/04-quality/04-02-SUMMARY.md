---
phase: 04-quality
plan: "02"
subsystem: seo
tags: [json-ld, structured-data, semantic-html, heading-hierarchy, schema-dts]
dependency_graph:
  requires: [04-01]
  provides: [SEO-04, SEO-05, SEO-06, SEO-07, SEO-11]
  affects: [app/layout.tsx, app/page.tsx, app/services/page.tsx, app/portfolio/[slug]/page.tsx]
tech_stack:
  added: [schema-dts]
  patterns: [JSON-LD inline script injection, XSS-safe JSON serialization, semantic article element for case studies]
key_files:
  created:
    - lib/jsonld.ts
  modified:
    - app/layout.tsx
    - app/page.tsx
    - app/services/page.tsx
    - app/portfolio/[slug]/page.tsx
    - app/portfolio/[slug]/opengraph-image.tsx
decisions:
  - JSON-LD injected as inline <script type="application/ld+json"> tags using dangerouslySetInnerHTML with < escaped as \u003c — avoids XSS while keeping structured data in HTML source
  - Case study pages use <article> not <main> — layout.tsx already provides <main id="main-content">; article is semantically correct for case studies
  - organizationJsonLd injected in root layout body (not <head>) — valid per spec, ensures presence on all pages without per-route duplication
  - serviceJsonLd rendered via SERVICES.map so schema stays in sync with service metadata automatically
metrics:
  duration: 10min
  completed: 2026-04-26
  tasks_completed: 2
  files_modified: 5
---

# Phase 4 Plan 02: JSON-LD Structured Data and Heading Hierarchy Summary

**One-liner:** Type-safe JSON-LD via schema-dts for Organization (all pages), WebSite (home), 6 Services, and Article+BreadcrumbList (11 case studies); semantic HTML corrected with article elements and no nested main tags.

## Tasks Completed

| Task | Name | Commit | Key Files |
|------|------|--------|-----------|
| 1 | Create lib/jsonld.ts utility | 79bdb14 | lib/jsonld.ts (created) |
| 2 | Inject JSON-LD into pages and audit heading hierarchy | 021a90e | app/layout.tsx, app/page.tsx, app/services/page.tsx, app/portfolio/[slug]/page.tsx, app/portfolio/[slug]/opengraph-image.tsx |

## What Was Built

### lib/jsonld.ts

Five typed JSON-LD generator functions using schema-dts for compile-time validation:

- `organizationJsonLd()` — Organization schema with @id anchor (SEO-04)
- `websiteJsonLd()` — WebSite schema with publisher reference (SEO-05)
- `serviceJsonLd(service)` — Service schema linking to /services#{anchorId} (SEO-06)
- `articleJsonLd(caseStudy)` — Article schema with headline, description, author (SEO-07)
- `breadcrumbJsonLd(items)` — BreadcrumbList with Home > Portfolio > CaseStudy path (SEO-07)

All functions use `process.env.NEXT_PUBLIC_SITE_URL || 'https://softwires.in'` — no hardcoded localhost. The `jsonLdScript()` helper and inline serialization both escape `<` as `\u003c` for XSS safety.

### Page Injections

- **app/layout.tsx** — Organization JSON-LD in `<body>` before Navbar: present on every page
- **app/page.tsx** — WebSite JSON-LD as first child; `<main>` wrapper removed (layout.tsx already wraps children in `<main id="main-content">`)
- **app/services/page.tsx** — 6 Service JSON-LD scripts via `SERVICES.map` (stays in sync with service metadata automatically)
- **app/portfolio/[slug]/page.tsx** — Article + BreadcrumbList in both TierALayout and TierBLayout; `<main>` changed to `<article>` in both layouts

### Heading Hierarchy Audit

- Every page has exactly one h1 (rendered by HeroLight or HeroDark)
- Services page: h2 per service section, h3 for How We Work subsections (Discovery/Build/Operate) — correct hierarchy
- No heading levels skipped across any page
- No nested `<main>` tags — home page `<main>` removed; case study pages use `<article>`

## Verification

- `pnpm build` exits 0
- `app/layout.tsx` has 1 `application/ld+json` script
- `app/page.tsx` has 1 `application/ld+json` script
- `app/services/page.tsx` has 1 map generating 6 scripts at runtime
- `app/portfolio/[slug]/page.tsx` has 4 scripts (2 Article + 2 BreadcrumbList across TierA and TierB)
- No `localhost` in any JSON-LD URL (uses softwires.in fallback or NEXT_PUBLIC_SITE_URL)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed @vercel/og OG image rendering failure**
- **Found during:** Task 2 (pnpm build verification)
- **Issue:** OG image route at `app/portfolio/[slug]/opengraph-image.tsx` was failing with "Expected `<div>` to have explicit 'display: flex' or 'display: none' if it has more than one child node". The outer container lacked `position: relative` needed for the absolutely positioned softwires.in branding div. The failure was pre-existing (confirmed by stashing and rebuilding from commit 79bdb14).
- **Fix:** Added `position: 'relative'` to the container div. The linter had already added `display: 'flex'` to child divs and converted template literal concatenation.
- **Files modified:** `app/portfolio/[slug]/opengraph-image.tsx`
- **Commit:** 021a90e (included in Task 2 commit)

## Known Stubs

None — all JSON-LD data is wired to live data sources (SERVICES array, CaseStudyFrontmatter). No placeholder text flows to structured data output.

## Self-Check: PASSED

All files verified present on disk. Both task commits verified in git log.

| Check | Result |
|-------|--------|
| lib/jsonld.ts exists | FOUND |
| app/layout.tsx exists | FOUND |
| app/page.tsx exists | FOUND |
| app/services/page.tsx exists | FOUND |
| app/portfolio/[slug]/page.tsx exists | FOUND |
| commit 79bdb14 exists | FOUND |
| commit 021a90e exists | FOUND |
