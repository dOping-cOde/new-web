# Requirements: Softwires Technologies Marketing Website

**Defined:** 2026-04-26
**Core Value:** Convey engineered seriousness and convert technical buyers into conversations.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Foundation

- [x] **FOUND-01**: Project scaffolded with Next.js 15 (pinned), TypeScript strict, Tailwind v4, pnpm
- [x] **FOUND-02**: Design system tokens (colors, typography, spacing, borders, shadows, motion) implemented as CSS variables via Tailwind v4 `@theme`
- [x] **FOUND-03**: Fonts self-hosted via next/font: Fraunces (display), Inter (body), JetBrains Mono (technical)
- [x] **FOUND-04**: DESIGN.md placed at project root with complete design system spec
- [x] **FOUND-05**: Sticky navbar with backdrop-filter blur, theme-aware (light/dark auto-detection via IntersectionObserver)
- [x] **FOUND-06**: Footer with 4-column grid, dark background, consistent across all pages
- [x] **FOUND-07**: Core UI components: Button (primary/secondary), Pill, StatBlock, Caption, SectionHeader, Container
- [x] **FOUND-08**: Mobile responsive layout at all breakpoints (mobile, tablet, desktop)

### Pages

- [x] **PAGE-01**: Home page with hero (display-xl headline, dual CTAs), capability strip (6 tiles), featured case study (dark section), portfolio teaser (4 cards), manifesto band, CTA band
- [x] **PAGE-02**: Services page with page hero, sticky anchor nav (6 links), 6 service sections (alternating layout), engagement model band, CTA band
- [x] **PAGE-03**: Portfolio index with hero, filter bar (All/Energy/Healthcare/Infrastructure/Insurance/Data & Analytics), 3-column grid of 11 portfolio cards
- [x] **PAGE-04**: About page with hero, origin section, 3 numbered principles, sectors grid (5 tiles), partnerships placeholder band
- [x] **PAGE-05**: Contact page with hero, validated form (name/email/company/role/sector/description + optional fields), mailto submission, office strip
- [x] **PAGE-06**: Custom 404 page with navigation back to live pages

### Case Studies

- [x] **CASE-01**: MDX content pipeline with @next/mdx, gray-matter + Zod for typed frontmatter validation
- [x] **CASE-02**: 5 Tier A case study pages (iDTRM, BridgeSense, Salt-Lick, AI-Copter, FWA Platform) with dark hero, problem section, system section, architecture diagram, AI/ML stack grid, outcomes with stats, up-next navigation
- [x] **CASE-03**: 6 Tier B capability showcase pages (Unified Semantic Fabric, BI Acceleration Engine, Multidimensional OLAP Modernization, Cloud Analytics Cost Optimization, Conversational Data Agent, Enterprise Reporting Suite) with dark hero, what-it-does 3-column, tech stack, use-case examples
- [x] **CASE-04**: Dynamic routes via generateStaticParams for all 11 slugs
- [x] **CASE-05**: Related case study navigation (up-next links via relatedSlugs frontmatter)
- [x] **CASE-06**: Professional copy using technical-precision voice with real numbers from source decks
- [x] **CASE-07**: Esperer Bioresearch named; other clients use placeholders with TODO comments
- [x] **CASE-08**: iDTRM uses 8 DTRs (real deck figure, not 8,000)

### Animation

- [x] **ANIM-01**: GSAP ScrollTrigger: hero text word-by-word reveal (display-xl, 60ms stagger, cinematic duration)
- [x] **ANIM-02**: GSAP ScrollTrigger: scroll-pinned architecture sections on Tier A case study pages (pin for 100vh, bullet reveals on scroll)
- [x] **ANIM-03**: GSAP: image parallax on hero media (0.85x scroll speed)
- [x] **ANIM-04**: Framer Motion: animated metric counters on stat blocks (useMotionValue, trigger on scroll-enter)
- [ ] **ANIM-05**: Framer Motion: hover-lift on portfolio cards (translateY -4px, shadow transition, 320ms)
- [ ] **ANIM-06**: Framer Motion: portfolio filter with FLIP technique (layout prop)
- [ ] **ANIM-07**: Navbar theme transition: backdrop-filter blur + CSS variable color swap on light/dark section crossing (320ms)
- [ ] **ANIM-08**: Mobile nav: hamburger to full-screen overlay with stagger reveal
- [x] **ANIM-09**: Scroll reveal: fade-up on scroll into view for section content
- [x] **ANIM-10**: All animations use `@gsap/react` useGSAP hook for proper cleanup

### WebGL

- [ ] **GL-01**: Homepage hero: Three.js particle field (indigo particles, low opacity, drifting) via R3F + drei, lazy-loaded, <60KB JS
- [ ] **GL-02**: BridgeSense case study: rotating point-cloud bridge visualization via R3F
- [ ] **GL-03**: All Three.js scenes loaded via next/dynamic with ssr: false
- [ ] **GL-04**: Static SVG fallback under prefers-reduced-motion
- [ ] **GL-05**: Explicit GPU resource disposal (geometry, material, texture) on unmount

### SEO

- [ ] **SEO-01**: Unique title (<60 chars) and meta description (<160 chars) on every route via Next.js Metadata API
- [ ] **SEO-02**: Open Graph and Twitter Card meta tags on every page
- [ ] **SEO-03**: Dynamic OG images per case study via generateMetadata + ImageResponse
- [ ] **SEO-04**: JSON-LD: Organization schema on every page (root layout)
- [ ] **SEO-05**: JSON-LD: WebSite schema with sitelinks search box on home
- [ ] **SEO-06**: JSON-LD: Service schema per service section (6 instances on /services)
- [ ] **SEO-07**: JSON-LD: Article schema with BreadcrumbList on each case study detail page
- [ ] **SEO-08**: Auto-generated sitemap.xml via app/sitemap.ts (all 17+ routes)
- [ ] **SEO-09**: robots.txt allowing all crawlers, pointing to sitemap
- [ ] **SEO-10**: Canonical URL on every page
- [ ] **SEO-11**: Semantic HTML: one h1 per page, descending hierarchy, main/article/section/nav/footer
- [ ] **SEO-12**: Every image has descriptive alt text, width/height set, priority on hero images only

### Accessibility

- [ ] **A11Y-01**: WCAG 2.1 AA compliance minimum, AAA for body text contrast
- [ ] **A11Y-02**: Full keyboard navigation: entire site usable without mouse
- [ ] **A11Y-03**: Visible focus indicators: 2px indigo ring, 2px offset, never outline:none without replacement
- [ ] **A11Y-04**: Skip-to-content link at top of every page
- [ ] **A11Y-05**: prefers-reduced-motion: GSAP timelines convert to instant state changes, Three.js scenes pause with static fallback, Framer Motion respects natively
- [ ] **A11Y-06**: Form errors announced via aria-live="polite"
- [ ] **A11Y-07**: All interactive elements have accessible names (ARIA labels on icon buttons)
- [ ] **A11Y-08**: Color is never the sole carrier of information
- [ ] **A11Y-09**: Heading order strictly enforced across all pages

### Performance

- [ ] **PERF-01**: Lighthouse mobile: 90+ Performance, 100 Accessibility, 100 Best Practices, 100 SEO
- [ ] **PERF-02**: LCP <2.0s on mobile
- [ ] **PERF-03**: CLS <0.05
- [ ] **PERF-04**: Total JS <250KB initial route
- [ ] **PERF-05**: Three.js scenes lazy-loaded, <60KB each
- [ ] **PERF-06**: All images use next/image with proper sizes, blur placeholders, AVIF/WebP
- [ ] **PERF-07**: Critical fonts preloaded, non-critical deferred
- [ ] **PERF-08**: pnpm build produces no TypeScript or ESLint errors, no console warnings

### Documentation

- [ ] **DOC-01**: README.md with setup instructions, content-edit guide, deployment notes
- [ ] **DOC-02**: Every placeholder asset has a TODO comment indicating what needs replacement
- [ ] **DOC-03**: Contact form has TODO comment showing where to wire Resend/Formspree

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Analytics

- **ANLY-01**: Privacy-first analytics integration (Plausible or Fathom)

### Content

- **CONT-01**: Blog section with MDX-based posts
- **CONT-02**: Real client testimonial quotes (pending client approval)
- **CONT-03**: Real photography replacing AI-generated placeholders

### Form

- **FORM-01**: Server-side contact form submission (Resend or Formspree)

### Partnerships

- **PART-01**: Real partner/client logos replacing placeholders on About page

## Out of Scope

| Feature | Reason |
|---------|--------|
| Backend API / database | Static-first site, no server logic needed |
| CMS integration | MDX provides content management without CMS overhead |
| Cookie consent banner | No analytics/tracking in v1 that requires consent |
| Dark mode toggle | Committed to Editorial Light with intentional dark sections |
| User authentication | No gated content |
| Mobile app | Web only |
| Pricing page | Engineering engagements are scoped; public pricing signals commodity |
| Chatbot / live chat | Technical buyers reject being "helped" before evaluating |
| Video testimonials | High production cost, requires client approval |
| Social media feed embeds | Third-party scripts, layout risk, stale content |
| Infinite scroll | Breaks anchor behavior; buyers want to filter |
| Competitor comparison tables | Invites rebuttal, ages poorly |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Complete |
| FOUND-02 | Phase 1 | Complete |
| FOUND-03 | Phase 1 | Complete |
| FOUND-04 | Phase 1 | Complete |
| FOUND-05 | Phase 1 | Complete |
| FOUND-06 | Phase 1 | Complete |
| FOUND-07 | Phase 1 | Complete |
| FOUND-08 | Phase 1 | Complete |
| PAGE-01 | Phase 2 | Complete |
| PAGE-02 | Phase 2 | Complete |
| PAGE-03 | Phase 2 | Complete |
| PAGE-04 | Phase 2 | Complete |
| PAGE-05 | Phase 2 | Complete |
| PAGE-06 | Phase 2 | Complete |
| CASE-01 | Phase 2 | Complete |
| CASE-02 | Phase 2 | Complete |
| CASE-03 | Phase 2 | Complete |
| CASE-04 | Phase 2 | Complete |
| CASE-05 | Phase 2 | Complete |
| CASE-06 | Phase 2 | Complete |
| CASE-07 | Phase 2 | Complete |
| CASE-08 | Phase 2 | Complete |
| ANIM-01 | Phase 3 | Complete |
| ANIM-02 | Phase 3 | Complete |
| ANIM-03 | Phase 3 | Complete |
| ANIM-04 | Phase 3 | Complete |
| ANIM-05 | Phase 3 | Pending |
| ANIM-06 | Phase 3 | Pending |
| ANIM-07 | Phase 3 | Pending |
| ANIM-08 | Phase 3 | Pending |
| ANIM-09 | Phase 3 | Complete |
| ANIM-10 | Phase 3 | Complete |
| GL-01 | Phase 3 | Pending |
| GL-02 | Phase 3 | Pending |
| GL-03 | Phase 3 | Pending |
| GL-04 | Phase 3 | Pending |
| GL-05 | Phase 3 | Pending |
| SEO-01 | Phase 4 | Pending |
| SEO-02 | Phase 4 | Pending |
| SEO-03 | Phase 4 | Pending |
| SEO-04 | Phase 4 | Pending |
| SEO-05 | Phase 4 | Pending |
| SEO-06 | Phase 4 | Pending |
| SEO-07 | Phase 4 | Pending |
| SEO-08 | Phase 4 | Pending |
| SEO-09 | Phase 4 | Pending |
| SEO-10 | Phase 4 | Pending |
| SEO-11 | Phase 4 | Pending |
| SEO-12 | Phase 4 | Pending |
| A11Y-01 | Phase 4 | Pending |
| A11Y-02 | Phase 4 | Pending |
| A11Y-03 | Phase 4 | Pending |
| A11Y-04 | Phase 4 | Pending |
| A11Y-05 | Phase 4 | Pending |
| A11Y-06 | Phase 4 | Pending |
| A11Y-07 | Phase 4 | Pending |
| A11Y-08 | Phase 4 | Pending |
| A11Y-09 | Phase 4 | Pending |
| PERF-01 | Phase 4 | Pending |
| PERF-02 | Phase 4 | Pending |
| PERF-03 | Phase 4 | Pending |
| PERF-04 | Phase 4 | Pending |
| PERF-05 | Phase 4 | Pending |
| PERF-06 | Phase 4 | Pending |
| PERF-07 | Phase 4 | Pending |
| PERF-08 | Phase 4 | Pending |
| DOC-01 | Phase 4 | Pending |
| DOC-02 | Phase 4 | Pending |
| DOC-03 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 69 total (note: file previously stated 56 — count updated to reflect actual requirements)
- Mapped to phases: 69
- Unmapped: 0

---
*Requirements defined: 2026-04-26*
*Last updated: 2026-04-26 after roadmap creation*
