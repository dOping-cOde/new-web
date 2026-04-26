---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
status: verifying
stopped_at: "Checkpoint: 04-quality 04-05 Task 2 — awaiting human verification"
last_updated: "2026-04-26T15:53:47.024Z"
last_activity: 2026-04-26
progress:
  total_phases: 4
  completed_phases: 4
  total_plans: 23
  completed_plans: 23
  percent: 0
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-04-26)

**Core value:** Convey engineered seriousness and convert technical buyers into conversations.
**Current focus:** Phase 04 — quality

## Current Position

Phase: 04 (quality) — EXECUTING
Plan: 5 of 5
Status: Phase complete — ready for verification
Last activity: 2026-04-26

Progress: [░░░░░░░░░░] 0%

## Performance Metrics

**Velocity:**

- Total plans completed: 0
- Average duration: —
- Total execution time: 0 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| - | - | - | - |

**Recent Trend:**

- Last 5 plans: —
- Trend: —

*Updated after each plan completion*
| Phase 01-foundation P01 | 8 | 2 tasks | 19 files |
| Phase 01-foundation P02 | 2 | 2 tasks | 7 files |
| Phase 01-foundation P03 | 2 | 2 tasks | 6 files |
| Phase 01-foundation P04 | 2min | 1 tasks | 0 files |
| Phase 01-foundation P04 | 5min | 2 tasks | 0 files |
| Phase 02-content-pages P02 | 2min | 2 tasks | 4 files |
| Phase 02-content-pages P03 | 12min | 2 tasks | 4 files |
| Phase 02-content-pages P01 | 20min | 2 tasks | 5 files |
| Phase 02-content-pages P04 | 5min | 1 tasks | 6 files |
| Phase 02-content-pages P06 | 15min | 1 tasks | 15 files |
| Phase 02-content-pages P05 | 5min | 1 tasks | 2 files |
| Phase 02-content-pages P07 | 25min | 2 tasks | 6 files |
| Phase 02-content-pages P08 | 35min | 2 tasks | 6 files |
| Phase 02-content-pages P09 | 2.5min | 2 tasks | 4 files |
| Phase 03-animation-webgl P01 | 1min | 2 tasks | 5 files |
| Phase 03-animation-webgl P02 | 4min | 2 tasks | 6 files |
| Phase 03-animation-webgl P03 | 10min | 2 tasks | 5 files |
| Phase 03-animation-webgl P04 | 5min | 2 tasks | 7 files |
| Phase 03-animation-webgl P05 | 4min | 1 tasks | 0 files |
| Phase 03-animation-webgl P05 | 4min | 2 tasks | 0 files |
| Phase 04-quality P01 | 4min | 2 tasks | 10 files |
| Phase 04-quality P02 | 10min | 2 tasks | 5 files |
| Phase 04-quality P03 | 6min | 2 tasks | 9 files |
| Phase 04-quality P04 | 3min | 2 tasks | 3 files |
| Phase 04-quality P05 | 5min | 2 tasks | 0 files |

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- [Init]: Tailwind v4 uses CSS-first `@theme {}` — no tailwind.config.js; all v3 patterns silently fail
- [Init]: Import `motion/react` not `framer-motion` (renamed package, v12)
- [Init]: Pin `next@15` explicitly — Next.js 16 is current stable, unpinned installs land on wrong major
- [Init]: shadcn/ui `new-york` style (not `default` — deprecated with Tailwind v4)
- [Init]: GSAP and Framer Motion must never target the same CSS property on the same element
- [Phase 01-foundation]: Use next/font/local (not next/font/google) for all three fonts — eliminates runtime Google Fonts requests
- [Phase 01-foundation]: Pin next@15.3.1 exact (no caret) — Next.js 16 is current stable, caret would upgrade unexpectedly
- [Phase 01-foundation]: Tailwind v4 CSS-first: @theme {} in globals.css, no tailwind.config.js — v4 does not auto-detect JS config
- [Phase 01-foundation]: Design tokens dual-declared as CSS vars AND @theme utilities — CSS vars for GSAP/JS access, @theme for Tailwind utility generation
- [Phase 01-foundation]: Custom spacing overrides Tailwind defaults — p-lg = 24px per DESIGN.md; all future components must use DESIGN.md spacing not Tailwind defaults
- [Phase 01-foundation]: Caption polymorphic typing uses explicit props interface instead of ComponentProps<'span'> — avoids ref type conflict in strict TypeScript when as='div'
- [Phase 01-foundation]: Use rounded-[9999px] instead of rounded-pill — @theme defines --radius-pill but Tailwind v4 does not auto-generate a rounded-pill utility class from a CSS var
- [Phase 01-foundation]: IntersectionObserver uses boundingClientRect.top < 64 check (not rootMargin CSS calc workaround) for precise navbar overlap detection with dark sections
- [Phase 01-foundation]: data-theme='dark' attribute on all dark sections consumed by navbar observer — Footer and all future cinematic sections must carry this attribute
- [Phase 01-foundation]: Button.tsx uses ButtonAsAnchor | ButtonAsButton discriminated union type — allows onClick and all props to reach <a> element when href provided
- [Phase 01-foundation]: Phase 1 foundation verified complete via automated checks: all 8 FOUND requirements pass, build exits 0
- [Phase 01-foundation]: Phase 1 foundation verified complete — all 8 FOUND requirements pass both automated checks and human visual inspection
- [Phase 02-content-pages]: Card components are pure Server Components — hover states handled by CSS group-hover, no Framer Motion at this stage (Phase 3 adds animation)
- [Phase 02-content-pages]: PortfolioCard defines local prop interface mirroring CaseStudyFrontmatter fields — avoids cross-plan type dependency per plan spec
- [Phase 02-content-pages]: next/image fill prop always requires relative positioning on parent container
- [Phase 02-content-pages]: HeroLight renders headline as h1 for page-level heading (accessibility and SEO)
- [Phase 02-content-pages]: data-theme='dark' on HeroDark for IntersectionObserver-driven navbar theming (consistent with Phase 1 pattern)
- [Phase 02-content-pages]: highlightWord prop wraps exact substring in text-accent span for per-hero accent word
- [Phase 02-content-pages]: Tier A case study sort order hardcoded as TIER_A_ORDER array in portfolio.ts — idtrm, bridgesense, salt-lick, ai-copter, fwa-platform; Tier B sorts alphabetically
- [Phase 02-content-pages]: MDX stub components are plain Server Components with no layout logic — architecture preserved for Phase 3 scroll-pinning enhancement without changing import contracts
- [Phase 02-content-pages]: Portfolio page split: Server Component (page.tsx) loads data, Client Component (PortfolioGrid.tsx) owns filter state — clean server/client boundary
- [Phase 02-content-pages]: 11 MDX stubs created with Zod-conforming frontmatter in content/portfolio/ — enables getAllCaseStudies() to return data for both the Portfolio index and case study detail pages
- [Phase 02-content-pages]: Services page splits into Server Component (page.tsx) + Client Component (AnchorNav.tsx) — server component enables metadata export; client component handles IntersectionObserver for active nav state
- [Phase 02-content-pages]: Alternating text/image layout uses lg:order-1/lg:order-2 grid ordering — avoids CSS direction RTL hack which caused text-alignment side effects in nested elements
- [Phase 02-content-pages]: Case study [slug] template uses dynamicParams = false for clean 404s; Tier A/B split is runtime check not build-time static route split
- [Phase 02-content-pages]: MDX body not wrapped in prose container — each section component (ProblemSection/SystemSection/etc.) handles its own background and padding independently
- [Phase 02-content-pages]: Tier B MDX pages use plain Markdown h2/prose structure, not custom JSX section components — matches how the Tier B template renders MDX body without layout wrappers
- [Phase 02-content-pages]: Angle brackets in YAML frontmatter values cause MDX JSX parse errors — use Unicode ≤ or text alternatives like 'Under 15 min' instead of '<15 min'
- [Phase 02-content-pages]: HTML5 native validation chosen over React Hook Form for ContactForm — keeps bundle light and code readable for technical buyers who inspect source (D-13)
- [Phase 02-content-pages]: ContactForm is 'use client' wrapped by server component contact/page.tsx — enables metadata export from page while form manages state
- [Phase 02-content-pages]: Turbopack removed from pnpm dev script — MDX dynamic imports from content/ are unsupported under Turbopack; pnpm build unaffected
- [Phase 02-content-pages]: Phase 2 content-pages complete — all 17 routes verified by human visual inspection 2026-04-26
- [Phase 03-animation-webgl]: Custom useReducedMotion hook (not Framer built-in) — framework-agnostic so GSAP, Framer Motion, and Three.js domains all use the same hook identically (D-08)
- [Phase 03-animation-webgl]: All GSAP consumers import from @/lib/gsap not directly from 'gsap' — centralized plugin registration prevents duplicate registerPlugin calls across routes (D-03)
- [Phase 03-animation-webgl]: useGSAP with scope option used exclusively for GSAP animations — automatic gsap.context() cleanup eliminates ScrollTrigger leaks on route navigation (D-02/ANIM-10)
- [Phase 03-animation-webgl]: HeroLight and HeroDark converted from Server to Client Components for useGSAP integration — minimal change, all props and JSX preserved
- [Phase 03-animation-webgl]: mdx-components.tsx stays module-level (no use client); GSAP isolated inside ScrollPinnedArchitecture via dynamic import with ssr:true
- [Phase 03-animation-webgl]: SplitText highlightWord prop wraps matching word in text-accent class — GSAP .split-word selector still targets all words including highlighted one
- [Phase 03-animation-webgl]: PortfolioCard wraps Link in motion.div (not motion(Link)) for hover-lift — simpler, avoids ref forwarding complexity with Next.js Link
- [Phase 03-animation-webgl]: StatBlock parseStatValue regex splits numeric/prefix/suffix from mixed strings (5 min, 24/7, 0.92) — non-numeric values render as plain text
- [Phase 03-animation-webgl]: Client wrapper pattern for ssr:false: next/dynamic with ssr:false forbidden in Server Components — created *Loader.tsx client wrappers (HeroParticleFieldLoader, PointCloudBridgeLoader) to hold dynamic imports
- [Phase 03-animation-webgl]: frameloop=always for both Three.js scenes — continuous drift/rotation requires per-frame invalidation, making demand equivalent to always; AdaptiveDpr handles mobile DPR scaling
- [Phase 03-animation-webgl]: Procedural bridge geometry chosen for BridgeSense (D-05): deck grid + parabolic arches + hangers + piers, ~3500 pts with LiDAR-scan jitter, no external model files, well under 60KB
- [Phase 03-animation-webgl]: SSR guard via Loader pattern: ssr:false in HeroParticleFieldLoader + PointCloudBridgeLoader client wrappers, not in page.tsx or mdx-components.tsx — correct per D-06
- [Phase 03-animation-webgl]: Phase 3 complete — all 15 requirements (ANIM-01 through ANIM-10, GL-01 through GL-05) verified by automated checks and human visual sign-off 2026-04-26
- [Phase 03-animation-webgl]: Phase 3 Animation & WebGL complete — all 15 requirements verified by automated checks and human visual sign-off 2026-04-26
- [Phase 04-quality]: metadataBase in root layout resolves all page-level metadata to absolute canonical URLs — no per-page alternates.canonical needed
- [Phase 04-quality]: OG images use system fonts only — no custom font loading in edge runtime to avoid OG image generation failures
- [Phase 04-quality]: JSON-LD injected as inline script tags with < escaped as \u003c for XSS safety; case study pages use <article> not <main> since layout.tsx provides main wrapper; serviceJsonLd rendered via SERVICES.map so schema auto-syncs with metadata
- [Phase 04-quality]: aria-pressed and aria-current both applied to AnchorNav active buttons: pressed = toggle state, current = location context
- [Phase 04-quality]: MobileNav triggerRef prop: Navbar passes hamburgerRef so overlay can return focus on close without DOM coupling
- [Phase 04-quality]: focus-visible: Tailwind utilities for form inputs — ring shows on keyboard navigation only, not mouse clicks
- [Phase 04-quality]: Remove unused eslint-disable directive — TypeScript typing improved enough that no-explicit-any is no longer triggered on the MDX dynamic import
- [Phase 04-quality]: Service diagram placeholder comment changed to TODO format for consistent grep-discoverability via grep -rn TODO
- [Phase 04-quality]: All 32 Phase 4 requirements verified via automated checks — build exits 0, 33/33 static pages generated at 215KB initial JS

### Pending Todos

None yet.

### Blockers/Concerns

None yet.

## Session Continuity

Last session: 2026-04-26T15:53:47.021Z
Stopped at: Checkpoint: 04-quality 04-05 Task 2 — awaiting human verification
Resume file: None
