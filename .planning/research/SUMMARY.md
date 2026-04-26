# Research Summary: Softwires Technologies Marketing Website

**Synthesized:** 2026-04-26
**Sources:** STACK.md, FEATURES.md, ARCHITECTURE.md, PITFALLS.md

## Executive Summary

Softwires Technologies needs a premium marketing website that earns trust with technical buyers — CTOs and engineering heads at utilities, hospital systems, insurers, mining companies, and public-sector organisations. The recommended architecture is a **static-first, component-island pattern** on Vercel: Next.js 15 App Router generates all 17 routes (5 top-level + 11 case studies) as static HTML at build time, with Client Components strictly limited to animation controllers, WebGL canvases, and the contact form.

## Stack Decisions

- **Pin `next@15` explicitly** — Next.js 16 is now current stable; unpinned installs land on the wrong major
- **Tailwind v4** uses CSS-first `@theme {}` config — all v3 patterns silently fail (no `tailwind.config.js`)
- **GSAP 3.15** — all plugins free on npm; `@gsap/react` package with `useGSAP()` is mandatory for cleanup
- **Import `motion/react`** not `framer-motion` — renamed package, v12 with React 19 support
- **Three.js r184 + @react-three/fiber v9 + drei v10** — verified stable
- **`@next/mdx`** for MDX (not `next-mdx-remote` or `contentlayer` — both have issues)
- **gray-matter + Zod** for typed frontmatter validation
- **shadcn/ui `new-york` style** — `default` style deprecated with Tailwind v4

## Feature Landscape

**Table stakes:** Hero proposition, responsive design, <2.5s LCP, case study listing with industry filter, 11 detail pages, services/about/contact pages, WCAG 2.1 AA, full SEO, self-hosted fonts, skip-to-content, 404 page.

**Differentiators:** WebGL particle-field hero, scroll-pinned architecture diagrams, animated metric counters, dark cinematic sections, per-case-study JSON-LD, case study snapshot boxes above the fold.

**Anti-features:** Chatbot, cookie banner, analytics (v1), popups, testimonial carousels, pricing page, blog, dark mode toggle, stock photography, infinite scroll, social embeds.

## Architecture Pattern

Static-first component-island model. Server Components render all content; Client Components scoped to:
- GSAP animation hooks (`useGSAP`)
- Framer Motion micro-interactions
- Three.js Canvas (via `next/dynamic` with `ssr: false`)
- Contact form
- Mobile navigation

**Domain separation:** GSAP owns scroll-driven timelines. Framer Motion owns component-level interactions. They must never target the same CSS property on the same element.

## Critical Pitfalls

1. **GSAP without `useGSAP`** → memory leaks, duplicate animations across routes
2. **Three.js without GPU disposal** → WebGL context loss on mobile
3. **Tailwind v4 with v3 patterns** → silent wrong output (no build errors)
4. **shadcn OKLCH variable mismatch** → transparent Radix component backgrounds
5. **`prefers-reduced-motion` missing in any animation system** → WCAG failure
6. **GSAP + Framer Motion targeting same transform** → unfixable animation jank

## Suggested Phase Structure

| Phase | Focus | Key Risk |
|-------|-------|----------|
| 1 | Foundation (tokens, fonts, layout, nav) | Tailwind v4/shadcn config errors cascade |
| 2 | MDX pipeline + content structure | Wrong MDX library = architectural rework |
| 3 | Static pages + section components | Lighthouse performance floor established |
| 4 | Animation layer (GSAP + Framer Motion) | Domain separation enforcement |
| 5 | Three.js scenes (WebGL hero + point cloud) | Performance budget validation |
| 6 | Content polish + accessibility audit | WCAG compliance across 3 animation systems |

## Confidence

**Overall: HIGH** — all research verified against official documentation (Next.js, GSAP, Tailwind, R3F) and npm registry as of 2026-04-26.

**Gaps:** BridgeSense 3D scene fidelity targets, blur placeholder tooling choice, real source deck copy, contact form backend (deferred to v2).
