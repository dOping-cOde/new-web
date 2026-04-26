# Phase 4: Quality - Context

**Gathered:** 2026-04-26
**Status:** Ready for planning

<domain>
## Phase Boundary

SEO metadata completion, JSON-LD structured data, sitemap/robots, dynamic OG images, WCAG 2.1 AA accessibility audit, Lighthouse mobile performance validation (90+/100/100/100), image optimization, and README documentation. This is a polish/validation phase — no new features or pages. The site must be production-ready after this phase.

</domain>

<decisions>
## Implementation Decisions

### SEO Completeness
- **D-01:** Claude's discretion on JSON-LD architecture (inline per-page scripts vs shared utility). Must implement: Organization (root layout), WebSite (home), Service (6 instances on /services), Article + BreadcrumbList (each case study).
- **D-02:** Claude's discretion on dynamic OG image approach. Must generate: one default OG image + per-case-study OG images via Next.js capabilities.
- **D-03:** sitemap.xml via app/sitemap.ts — auto-generated, all 17+ routes. robots.txt via app/robots.ts — allow all, point to sitemap.
- **D-04:** Canonical URLs on every page. Metadata already exists on all routes (from Phase 2) — this phase completes any gaps.

### Accessibility Audit
- **D-05:** Claude's discretion on audit depth. Must achieve: WCAG 2.1 AA minimum, AAA for body text contrast, Lighthouse Accessibility 100. Cover keyboard nav, focus order, heading hierarchy, screen reader labels, color contrast.
- **D-06:** Existing a11y work from prior phases: skip-to-content in layout, focus rings on buttons, aria-live on ContactForm, prefers-reduced-motion across all animation systems, accessible names on interactive elements.

### Performance Optimization
- **D-07:** Claude's discretion on optimization focus. Must achieve: Lighthouse 90+ Performance mobile, LCP <2.0s, CLS <0.05, initial JS <250KB. Three.js lazy-loading is the highest-impact target.
- **D-08:** Claude's discretion on image optimization approach. Must use next/image with proper sizes, blur placeholders where applicable, AVIF/WebP. Priority on hero images only.
- **D-09:** pnpm build must produce no TypeScript or ESLint errors, no console warnings in production.

### Documentation
- **D-10:** Claude's discretion on README depth and structure. Must cover: how to run dev, how to edit a case study, how to deploy to Vercel, how to replace placeholder images. Every placeholder asset must have a TODO comment.
- **D-11:** Contact form TODO comment for Resend/Formspree integration must be present.

### Claude's Discretion
- JSON-LD architecture (inline vs utility) — D-01
- OG image generation approach — D-02
- Accessibility audit methodology and depth — D-05
- Performance optimization priorities — D-07
- Image optimization strategy for placeholders — D-08
- README detail level and structure — D-10

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### SEO Spec
- `/Users/george/Downloads/softwires_claude_code_prompt.md` §7 — Non-negotiable SEO requirements: metadata format, OG image specs (1200x630), JSON-LD schema types, sitemap auto-generation, semantic HTML rules, image SEO, performance budget, internal linking, URL structure

### Accessibility Spec
- `/Users/george/Downloads/softwires_claude_code_prompt.md` §8 — WCAG 2.1 AA minimum, AAA body text, keyboard nav, skip-to-content, focus visible, color independence, prefers-reduced-motion, aria-live forms, heading order

### Acceptance Criteria
- `/Users/george/Downloads/softwires_claude_code_prompt.md` §12 — Full checklist of what "done" looks like

### Design System
- `DESIGN.md` — Color contrast values, focus ring spec (2px indigo, 2px offset), semantic HTML guidance

### Existing Metadata
- `app/layout.tsx` — Root metadata (may need Organization JSON-LD)
- `app/page.tsx` — Home metadata (needs WebSite JSON-LD)
- `app/services/page.tsx` — Services metadata (needs Service JSON-LD x6)
- `app/portfolio/[slug]/page.tsx` — Case study generateMetadata (needs Article + BreadcrumbList JSON-LD)

### Research
- `.planning/research/STACK.md` — OG image generation with next/og, Edge runtime constraints
- `.planning/research/PITFALLS.md` — JSON-LD dev URL leaks, font loading LCP impact

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- Metadata exports on all 7 route files (titles, descriptions, OG tags from Phase 2)
- `app/layout.tsx` has skip-to-content link
- `components/forms/ContactForm.tsx` has aria-live="polite" on error messages
- All animated components have useReducedMotion checks
- Button has focus-visible:outline-2 focus-visible:outline-accent

### Established Patterns
- Metadata via Next.js Metadata API (static exports and generateMetadata)
- Server Components for all page files
- Design tokens accessible as CSS vars and Tailwind utilities

### Integration Points
- app/sitemap.ts and app/robots.ts need creation (missing)
- app/opengraph-image.tsx needs creation (missing)
- JSON-LD scripts need to be added to existing page components
- README.md needs creation at project root
- .env.example needs NEXT_PUBLIC_SITE_URL for canonical URLs

### What's Missing (from codebase scout)
- sitemap.ts — not created
- robots.ts — not created  
- opengraph-image.tsx — not created
- JSON-LD structured data — none exists
- README.md — not created
- Lighthouse audit — not run
- Heading hierarchy audit — not done
- Full keyboard nav test — not done systematically

</code_context>

<specifics>
## Specific Ideas

- OG images: 1200x630, project title + category + indigo accent line + Softwires wordmark
- URL structure: lowercase, hyphenated, no trailing slashes, no .html
- Internal linking: every case study links to 2 related (via relatedSlugs — already implemented)
- Semantic HTML: one h1 per page, descending hierarchy, main/article/section/nav/footer
- Performance budget: <250KB initial route JS, lazy-load Three.js scenes
- All images: descriptive alt text, width/height set, priority on hero images only

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 04-quality*
*Context gathered: 2026-04-26*
