# Softwires Technologies Marketing Website

## What This Is

A production-ready marketing website for Softwires Technologies, an AI engineering firm that ships real-world systems for energy, healthcare, and infrastructure. The site targets technocrats — CTOs, heads of engineering at utilities, hospital systems, insurers, mining companies, and public-sector buyers. Greenfield build, static-first, deployed on Vercel.

## Core Value

The site must convey engineered seriousness — the calm authority of a firm that ships hardware-software systems into the physical world — and convert technical buyers into conversations.

## Requirements

### Validated

- ✓ Next.js 15 App Router + TypeScript strict mode + Tailwind CSS v4 — Validated in Phase 1: Foundation
- ✓ Editorial Light aesthetic: off-white canvas, generous whitespace, large display type, single Deep Indigo (#3D2BFF) accent — Validated in Phase 1: Foundation
- ✓ Self-hosted fonts: Fraunces (display), Inter (body), JetBrains Mono (technical) — Validated in Phase 1: Foundation
- ✓ Responsive design: mobile, tablet, desktop breakpoints — Validated in Phase 1: Foundation
- ✓ 5 top-level pages: Home, Services, Portfolio, About, Contact — Validated in Phase 2: Content & Pages
- ✓ 11 case-study detail pages under Portfolio (5 Tier A, 6 Tier B) — Validated in Phase 2: Content & Pages
- ✓ Dark cinematic sections for case-study heroes — Validated in Phase 2: Content & Pages
- ✓ MDX-based case study content with typed frontmatter — Validated in Phase 2: Content & Pages
- ✓ Contact form with mailto fallback — Validated in Phase 2: Content & Pages

- ✓ WebGL hero (Three.js particle field) on homepage, point-cloud bridge on BridgeSense — Validated in Phase 3: Animation & WebGL
- ✓ GSAP ScrollTrigger for scroll-pinned architecture sections, hero text reveal, parallax — Validated in Phase 3: Animation & WebGL
- ✓ Framer Motion for component micro-interactions (hover-lift, number counters, filter FLIP) — Validated in Phase 3: Animation & WebGL

### Active

- [ ] Full SEO: metadata per route, JSON-LD schemas, sitemap, robots, dynamic OG images
- [ ] WCAG 2.1 AA accessibility, full keyboard nav, prefers-reduced-motion support
- [ ] Lighthouse mobile: 90+ Performance, 100 Accessibility, 100 Best Practices, 100 SEO
- [ ] No backend, no CMS, no database, no analytics/cookie banner for v1

### Out of Scope

- Backend API or database — static-first, no server logic
- CMS integration — content lives in MDX/TS files
- Cookie banner / analytics — no tracking that requires consent for v1
- Dark mode toggle — committed to Editorial Light with intentional dark sections
- Real-time form submission — mailto for now, server integration is a future TODO
- Mobile app — web only
- Blog — not in v1 sitemap
- User authentication — no gated content

## Context

**Audience:** Technical buyers (CTOs, heads of engineering) at utilities, hospital systems, insurers, mining companies, public-sector orgs. They judge harshly — the site must match the quality bar of Apple and Stripe marketing pages.

**Design direction:** "Editorial Light" — off-white canvas (#FAFAF7), generous whitespace, large display typography (Fraunces 300), restrained single accent (Deep Indigo #3D2BFF), dark cinematic sections sandwiched in for gravity moments. Full design system specified in DESIGN.md at project root.

**Content approach:** Agent writes all copy using technical-precision voice. Real numbers from Softwires' portfolio decks (iDTRM specs, BridgeSense LiDAR data, Salt-Lick cancer stats, AI-Copter use cases, FWA security specs). iDTRM uses 8 DTRs (real deck figure). Esperer Bioresearch named; other clients use placeholders with TODO comments. No fabricated testimonials — TODO placeholders only.

**Tech stack (locked):** Next.js 15, TypeScript strict, Tailwind v4, shadcn/ui (sparingly), GSAP + ScrollTrigger, Framer Motion, Three.js + R3F + drei, Lucide React, MDX, pnpm, Node 20+, Vercel deployment target.

**Portfolio:**
- Tier A (real client, full case study): iDTRM, BridgeSense, Salt-Lick, AI-Copter, FWA Platform
- Tier B (capability showcase, lighter layout): Unified Semantic Fabric, BI Acceleration Engine, Multidimensional OLAP Modernization, Cloud Analytics Cost Optimization, Conversational Data Agent, Enterprise Reporting Suite

## Constraints

- **Tech stack**: Locked as specified — Next.js 15, Tailwind v4, GSAP, Three.js, MDX, pnpm
- **Performance**: <250KB initial JS, LCP <2.0s, CLS <0.05, Three.js scenes <60KB each
- **Accessibility**: WCAG 2.1 AA minimum, AAA for body text contrast
- **Content accuracy**: Only use numbers from source decks; never invent deployment figures
- **Design discipline**: Max 2 font weights per screen, no decorative gradients, no drop shadows beyond sm, no emoji
- **Deployment**: Vercel-ready but do not deploy

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| iDTRM uses 8 DTRs (not 8,000) | Real figure from source deck; accuracy over impressiveness | — Pending |
| Name Esperer Bioresearch, placeholder other clients | Esperer is named in their deck; others need confirmation | — Pending |
| Full scope build (no phased trimming) | Client wants production-ready site in one pass | — Pending |
| Editorial Light aesthetic (not dark-first) | Conveys engineered seriousness without SaaS-startup energy | — Pending |
| mailto for contact form v1 | No backend needed; TODO comments for future Resend/Formspree | — Pending |
| MDX for case studies, TS for service metadata | Structured content without CMS overhead | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? -> Move to Out of Scope with reason
2. Requirements validated? -> Move to Validated with phase reference
3. New requirements emerged? -> Add to Active
4. Decisions to log? -> Add to Key Decisions
5. "What This Is" still accurate? -> Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-26 after Phase 3: Animation & WebGL complete*
