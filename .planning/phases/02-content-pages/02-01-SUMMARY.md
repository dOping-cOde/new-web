---
phase: 02-content-pages
plan: "01"
subsystem: content-pipeline
tags: [mdx, types, zod, data-loading, services]
dependency_graph:
  requires: []
  provides:
    - CaseStudyFrontmatter type and caseStudySchema Zod validator
    - getAllCaseStudies / getCaseStudyBySlug / getCaseStudySlugs data loaders
    - SERVICES array with all 6 service metadata entries
    - remark-gfm MDX compilation
    - Custom MDX components (ProblemSection, SystemSection, Architecture, AIStack, Outcomes, Quote, TechPill)
  affects:
    - All downstream portfolio/case-study page plans
    - Services page data layer
    - MDX-based case study content compilation
tech_stack:
  added:
    - remark-gfm (ESM, added to withMDX remarkPlugins)
  patterns:
    - Zod schema validation at build time (malformed frontmatter = build error)
    - gray-matter + globby for server-side MDX data loading
    - Server-only data loaders (Node.js fs/path, no client bundle impact)
    - Stub MDX components scoped to phase — will be enhanced in Phase 2 Plan 05
key_files:
  created:
    - lib/types.ts — caseStudySchema, CaseStudyFrontmatter, ServiceMeta, CATEGORIES
    - lib/portfolio.ts — getAllCaseStudies, getCaseStudyBySlug, getCaseStudySlugs
    - lib/services.ts — SERVICES array (6 entries)
  modified:
    - next.config.ts — added remark-gfm plugin
    - mdx-components.tsx — full custom component registry + styled HTML elements
decisions:
  - "Tier A sort order hardcoded as TIER_A_ORDER array in portfolio.ts (idtrm, bridgesense, salt-lick, ai-copter, fwa-platform) — Tier B sorts alphabetically"
  - "MDX body loaded dynamically in page component (not in data loader) — only frontmatter parsed server-side"
  - "Stub MDX components are plain Server Components (no 'use client') — can be enhanced in Phase 3 without changing import contracts"
metrics:
  duration: "~20 min"
  completed: 2026-04-26
  tasks: 2
  files: 5
---

# Phase 2 Plan 01: MDX Content Pipeline and Data Layer Summary

Zod-validated MDX frontmatter schema, gray-matter/globby data loaders, 6-entry typed service metadata, remark-gfm MDX compilation, and full custom MDX component registry.

## What Was Built

### Task 1: Type System and Data Loaders

**lib/types.ts** — Shared type contracts:
- `caseStudySchema`: Zod schema matching build spec section 6 exactly (title, slug, tier, category, subcategory, client, year, heroImage, heroImageAlt, excerpt, stats, techStack, relatedSlugs)
- `CaseStudyFrontmatter`: Inferred TypeScript type from the schema
- `CATEGORIES`: `["All", "Energy", "Healthcare", "Infrastructure", "Insurance", "Data & Analytics"] as const`
- `ServiceMeta`: Interface with id, number, label, title, anchorId, description, techStack, useCases, caseStudySlug?

**lib/portfolio.ts** — Server-side data loaders:
- `getAllCaseStudies()`: Reads all `content/portfolio/*.mdx` files via globby, parses with gray-matter, validates with Zod. Tier A sorted in defined order (idtrm → bridgesense → salt-lick → ai-copter → fwa-platform), then Tier B alphabetically
- `getCaseStudyBySlug(slug)`: Reads single MDX file, parses and validates frontmatter
- `getCaseStudySlugs()`: Returns `{ slug: string }[]` for generateStaticParams

**lib/services.ts** — Service metadata:
- `SERVICES: ServiceMeta[]` with all 6 entries: AI Agents (01), Conversational (02), Healthcare (03), Energy (04), Infrastructure (05), Data & Analytics (06)
- Each entry has full title, description, techStack, useCases; healthcare/energy/infrastructure link to relevant case study slugs

### Task 2: MDX Pipeline and Custom Components

**next.config.ts** — Added `remark-gfm` to remarkPlugins for GFM table support in case study MDX files.

**mdx-components.tsx** — Full custom component registry:
- Custom section components: ProblemSection, SystemSection, Architecture (dark + data-theme="dark"), AIStack, Outcomes, Quote, TechPill
- Styled standard HTML elements: h1 (display-md), h2, h3, p (text-body), ul, ol, a (accent-colored), blockquote, code (mono-sm), table/th/td (GFM tables)
- All components are Server Components (no "use client") — can hold client components inside them in Phase 3
- Architecture stub carries `data-theme="dark"` for Navbar observer compatibility (established Phase 1 pattern)

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

The following are intentional stub components per plan specification (D-02 in 02-CONTEXT.md). They compile without errors but carry no layout logic:

| Stub | File | Line | Reason |
|------|------|------|--------|
| ProblemSection | mdx-components.tsx | ~25 | Layout logic added in Plan 05 (case study template) |
| SystemSection | mdx-components.tsx | ~40 | Layout logic (2-column + SVG diagram) added in Plan 05 |
| Architecture | mdx-components.tsx | ~55 | Scroll-pinning added in Phase 3 (GSAP); stub ensures dark section compiles |
| AIStack | mdx-components.tsx | ~70 | 4-column grid layout added in Plan 05 |
| Outcomes | mdx-components.tsx | ~85 | Stat blocks wired in Plan 05 |
| Quote | mdx-components.tsx | ~100 | Real client quotes pending approval (D-08) — TODO comments present |
| TechPill | mdx-components.tsx | ~115 | Functional; may be enhanced with Pill component in Plan 05 |

These stubs do NOT prevent the plan's goal: the MDX pipeline compiles, data loaders are operational, and downstream plans can import types/functions immediately.

## Self-Check: PASSED

- [FOUND] lib/types.ts — exports caseStudySchema, CaseStudyFrontmatter, ServiceMeta, CATEGORIES
- [FOUND] lib/portfolio.ts — exports getAllCaseStudies, getCaseStudyBySlug, getCaseStudySlugs
- [FOUND] lib/services.ts — exports SERVICES (6 entries)
- [FOUND] next.config.ts — contains remarkGfm
- [FOUND] mdx-components.tsx — contains ProblemSection, SystemSection, Architecture, AIStack, Outcomes, Quote
- [FOUND] Commits db6f58d and 11e78c2 in git log
- [VERIFIED] pnpm build exits 0
- [VERIFIED] npx tsc --noEmit exits 0 (no TypeScript errors)
