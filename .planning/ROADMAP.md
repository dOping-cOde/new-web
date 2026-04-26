# Roadmap: Softwires Technologies Marketing Website

## Overview

Four phases deliver a production-ready marketing site for technical buyers. Foundation establishes the design system and layout shell. Content & Pages builds all 17 routes with professional copy. Animation & WebGL layers in GSAP, Framer Motion, and Three.js scenes. Quality closes the loop on SEO, accessibility, performance, and documentation — validating against Lighthouse targets before handoff.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation** - Design system, scaffold, fonts, nav, footer, core components (completed 2026-04-26)
- [x] **Phase 2: Content & Pages** - All 17 routes (5 top-level + 11 case studies) with professional copy (completed 2026-04-26)
- [x] **Phase 3: Animation & WebGL** - GSAP scroll animations, Framer Motion interactions, Three.js scenes (completed 2026-04-26)
- [ ] **Phase 4: Quality** - SEO metadata, accessibility audit, performance validation, documentation

## Phase Details

### Phase 1: Foundation
**Goal**: The project compiles and runs with the correct design system, typography, and shared layout shell in place — every subsequent phase builds on a solid, correctly configured base
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05, FOUND-06, FOUND-07, FOUND-08
**Success Criteria** (what must be TRUE):
  1. `pnpm dev` starts without errors; `pnpm build` produces a clean build with no TypeScript or ESLint errors
  2. All design tokens (colors, typography scale, spacing, motion) are visible and correct when inspecting CSS variables in devtools
  3. Fraunces, Inter, and JetBrains Mono load from self-hosted files — no Google Fonts network requests appear in the network tab
  4. Sticky navbar switches color correctly as it crosses light/dark sections on a long test page, and the mobile nav opens as a full-screen overlay
  5. All core UI components (Button, Pill, StatBlock, Caption, SectionHeader, Container) render correctly at all three breakpoints
**Plans**: 4 plans
Plans:
- [x] 01-01-PLAN.md — Scaffold Next.js 15 project, install dependencies, create DESIGN.md, configure fonts, implement complete design token system
- [x] 01-02-PLAN.md — Build six core UI components (Button, Pill, StatBlock, Caption, SectionHeader, Container)
- [x] 01-03-PLAN.md — Build sticky theme-aware Navbar with mobile overlay and dark Footer, wire into layout
- [x] 01-04-PLAN.md — Automated verification of all requirements + human visual verification checkpoint
**UI hint**: yes

### Phase 2: Content & Pages
**Goal**: Every page on the site exists, contains accurate professional copy, and is navigable — a technical buyer can visit all 17 routes and read about Softwires' capabilities
**Depends on**: Phase 1
**Requirements**: PAGE-01, PAGE-02, PAGE-03, PAGE-04, PAGE-05, PAGE-06, CASE-01, CASE-02, CASE-03, CASE-04, CASE-05, CASE-06, CASE-07, CASE-08
**Success Criteria** (what must be TRUE):
  1. All 5 top-level pages (Home, Services, Portfolio, About, Contact) and the custom 404 render without errors and are reachable via navigation
  2. All 11 case study pages render at `/portfolio/[slug]` with correct content — Tier A pages show dark hero, problem, architecture, outcomes; Tier B pages show dark hero, what-it-does, tech stack, use-case examples
  3. The Portfolio filter bar correctly shows/hides cards by industry category (All/Energy/Healthcare/Infrastructure/Insurance/Data & Analytics)
  4. The contact form validates all required fields and submits via mailto; optional fields behave correctly
  5. iDTRM copy states 8 DTRs (not 8,000); Esperer Bioresearch is named; all other client references use placeholder copy with TODO comments
**Plans**: 9 plans
Plans:
- [x] 02-01-PLAN.md — MDX content pipeline: Zod schema, data loaders, service metadata, remark-gfm, custom MDX components
- [x] 02-02-PLAN.md — Card components: PortfolioCard, ServiceTile, CapabilityCard, Pullquote
- [x] 02-03-PLAN.md — Section components: HeroLight, HeroDark, CTABand, ManifestoBand
- [x] 02-04-PLAN.md — Home page with all 7 sections
- [x] 02-05-PLAN.md — Services page with sticky anchor nav and 6 service sections
- [x] 02-06-PLAN.md — Portfolio index with filter bar and 11 stub MDX files
- [x] 02-07-PLAN.md — Case study [slug] template + 5 Tier A MDX files with production copy
- [x] 02-08-PLAN.md — 6 Tier B capability showcase MDX files with production copy
- [x] 02-09-PLAN.md — About page, Contact page with form, branded 404, visual verification (all 17 routes approved)
**UI hint**: yes

### Phase 3: Animation & WebGL
**Goal**: The site moves with engineered restraint — scroll-driven reveals, micro-interactions, and two Three.js scenes operate smoothly without performance regression or memory leaks
**Depends on**: Phase 2
**Requirements**: ANIM-01, ANIM-02, ANIM-03, ANIM-04, ANIM-05, ANIM-06, ANIM-07, ANIM-08, ANIM-09, ANIM-10, GL-01, GL-02, GL-03, GL-04, GL-05
**Success Criteria** (what must be TRUE):
  1. Homepage hero text reveals word-by-word on load; architecture sections on Tier A case studies pin and reveal bullets as the user scrolls through them
  2. Portfolio cards lift 4px with shadow on hover; the filter reorders cards with a smooth FLIP animation; metric counters animate on scroll-enter
  3. The Three.js particle field renders on the homepage hero and the point-cloud bridge renders on BridgeSense — both loaded via `next/dynamic` with `ssr: false`, no SSR errors
  4. With `prefers-reduced-motion` enabled, all GSAP timelines jump to their end state instantly, Three.js scenes show a static SVG fallback, and no motion occurs
  5. Browser memory profile shows no growing heap after navigating between pages (no GSAP/Three.js resource leaks)
**Plans**: 5 plans
Plans:
- [x] 03-01-PLAN.md — Animation foundation: GSAP plugin registration, reduced-motion hook, SplitText/CountUp/ScrollReveal components
- [x] 03-02-PLAN.md — GSAP integrations: hero text reveal, scroll-pinned Architecture sections, image parallax
- [x] 03-03-PLAN.md — Framer Motion integrations: hover-lift, stat counters, FLIP filter, scroll reveal
- [x] 03-04-PLAN.md — Three.js scenes: homepage particle field, BridgeSense point-cloud bridge
- [x] 03-05-PLAN.md — Verification: automated checks (domain boundary, reduced motion, GPU disposal) + human visual inspection
**UI hint**: yes

### Phase 4: Quality
**Goal**: The site earns Lighthouse mobile 90+/100/100/100, passes WCAG 2.1 AA, and is fully documented — ready for a technical buyer to judge against Apple and Stripe marketing pages
**Depends on**: Phase 3
**Requirements**: SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, SEO-06, SEO-07, SEO-08, SEO-09, SEO-10, SEO-11, SEO-12, A11Y-01, A11Y-02, A11Y-03, A11Y-04, A11Y-05, A11Y-06, A11Y-07, A11Y-08, A11Y-09, PERF-01, PERF-02, PERF-03, PERF-04, PERF-05, PERF-06, PERF-07, PERF-08, DOC-01, DOC-02, DOC-03
**Success Criteria** (what must be TRUE):
  1. Lighthouse mobile scores: 90+ Performance, 100 Accessibility, 100 Best Practices, 100 SEO on the homepage and at least one case study page
  2. Every page has a unique `<title>`, meta description, OG/Twitter tags, canonical URL, and correct JSON-LD schema; sitemap.xml and robots.txt are reachable at their standard paths
  3. A tester can complete the entire site using only a keyboard — focus rings are always visible, skip-to-content works, form errors are announced via aria-live, and no interactive element lacks an accessible name
  4. LCP is under 2.0s on mobile, CLS is under 0.05, and total initial JS is under 250KB on the home route
  5. README.md exists with setup and content-edit instructions; all placeholder assets carry TODO comments; the contact form has a TODO comment for Resend/Formspree wiring
**Plans**: 5 plans
Plans:
- [x] 04-01-PLAN.md — SEO infrastructure: sitemap, robots, OG images, canonical URLs, metadata completion
- [x] 04-02-PLAN.md — JSON-LD structured data (Organization, WebSite, Service, Article+BreadcrumbList) and heading hierarchy audit
- [ ] 04-03-PLAN.md — Accessibility audit and fixes: keyboard nav, focus rings, ARIA labels, contrast, heading order
- [ ] 04-04-PLAN.md — Performance optimization (fonts, images, bundle) and documentation (README, TODO audit)
- [ ] 04-05-PLAN.md — Final verification: automated requirement checks + human visual sign-off
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 4/4 | Complete   | 2026-04-26 |
| 2. Content & Pages | 9/9 | Complete    | 2026-04-26 |
| 3. Animation & WebGL | 5/5 | Complete   | 2026-04-26 |
| 4. Quality | 2/5 | In Progress|  |
