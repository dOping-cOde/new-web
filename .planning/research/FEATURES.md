# Feature Landscape

**Domain:** Premium B2B AI/Engineering Firm Marketing Website
**Project:** Softwires Technologies
**Researched:** 2026-04-26
**Confidence:** HIGH (verified against reference sites: Stripe, Vercel, Anthropic, Palantir, DeepMind; cross-referenced with B2B marketing research)

---

## Context

Softwires targets technical buyers — CTOs, heads of engineering at utilities, hospital systems, insurers, mining companies, public-sector orgs. These buyers are skeptical of marketing theater. They read source material, check GitHub, notice load time, and judge the site the same way they judge code: is it precise, does it work, does it earn trust? The quality bar is Apple product pages and Stripe marketing, not agency portfolio sites.

---

## Table Stakes

Features users expect. Missing = product feels incomplete or amateurish. Technical buyers in particular will leave if these are absent or broken.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Clear service proposition in hero | Buyers need to know within 5 seconds what you do and for whom | Low | Headline + subhead + single CTA. No cleverness without clarity. |
| Responsive design (mobile, tablet, desktop) | 63% of B2B buyers research on mobile; technical buyers check on phones | Medium | Three breakpoints minimum. Layout must not break on any. |
| Fast page load (<2.5s LCP) | 1-second delay reduces conversions 7%; slow sites signal poor engineering | High | Next.js static generation + Vercel CDN handles most of this. Three.js scenes need lazy loading. |
| Case study / portfolio section | B2B case studies influence 72% of buying decisions (HubSpot, 2026) | Medium | Cards with category/industry filters. Links to full case study pages. |
| Case study detail pages | Technical buyers read deeply before contacting anyone | High | Problem → Solution → Architecture → Results → CTA. Real numbers required. |
| Services listing | Buyers need to confirm you do what they need before going deeper | Low | Scan-friendly. Grouped by domain, not by internal org chart. |
| About / team section | Enterprise buyers need to verify humans with credentials exist | Low | Faces, names, and specific technical backgrounds carry more weight than bios. |
| Contact / inquiry form | The conversion goal of the entire site | Medium | Short form (4–6 fields). Clear next-step expectation set. No generic "Contact us." |
| WCAG 2.1 AA accessibility | Legal risk + signals discipline; public-sector buyers may require it | High | Full keyboard nav, aria labels, color contrast, reduced-motion support. |
| SEO basics (meta, sitemap, robots) | Organic discovery; GEO (AI search) increasingly important | Medium | Metadata per route, sitemap.xml, robots.txt, JSON-LD schemas. |
| Self-hosted / performant fonts | Flashing unstyled text and layout shift destroy premium perception | Low | Preload critical weights. woff2 only. No Google Fonts DNS round-trip. |
| HTTPS and security headers | Technical buyers check the certificate. Missing = immediate trust failure | Low | Handled by Vercel by default. Verify headers are configured. |
| Working navigation with clear IA | Users must find pages in ≤2 clicks without guessing | Low | Home / Services / Portfolio / About / Contact — no mega-menu needed at this scale. |
| 404 and error pages | Broken links happen; a broken fallback page signals low quality | Low | Branded, with navigation back to live pages. |
| Open Graph / social preview images | Links shared in Slack/email need readable previews; this is how referrals spread | Low | Dynamic OG images per page, especially case studies. |

---

## Differentiators

Features that separate premium AI/engineering firm sites from average agency sites. Not universally expected, but when done well they signal that the firm operates at a higher level.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| WebGL / particle-field hero animation | Signals technical depth without a word of copy; Palantir, DeepMind, and Vercel all use motion as brand language | High | Three.js particle field on homepage. Must degrade gracefully (canvas hidden on prefers-reduced-motion). Keep <60KB scene. |
| Scroll-pinned architecture diagrams (ScrollTrigger) | Apple product pages use this pattern — features reveal as you scroll; ideal for explaining system architecture to technical buyers | High | GSAP ScrollTrigger. Pin a section while content animates through stages. Rare in consulting/engineering sites — strong differentiator. |
| Case study hero animations (per-project) | BridgeSense LiDAR point cloud, iDTRM network topology — shows rather than tells what the system does | Very High | R3F + drei for 3D scenes. Scoped per case study, lazy-loaded. Adds significant build time. |
| Metric counters with animation | Quantified outcomes rendered visually (e.g., "8 DTRs integrated," "40% reduction in manual review") feel earned and concrete vs static text | Low | Framer Motion number counter on scroll-enter. Low complexity, high perceived quality. |
| Industry vertical navigation / filtering | Palantir's homepage surfaces 25+ sectors; buyers self-select into relevant context | Medium | Portfolio filter by sector (Energy, Healthcare, Infrastructure, etc.). FLIP animation on reorder. |
| Dark cinematic sections for gravity moments | Creates visual contrast that signals "this matters" — used by Anthropic (research sections), Vercel (feature highlights), Linear (focus moments) | Medium | Full-bleed dark section for case study heroes and architecture diagrams. Design system already specifies this. |
| Per-case-study JSON-LD structured data | Makes case studies discoverable in AI-powered search (GEO) and Google rich results; peers rarely do this | Low | Already in scope. Signals technical rigor in SEO implementation. |
| Technical typography system (display + mono) | JetBrains Mono for code/specs signals technical credibility; Fraunces for display signals editorial intelligence. Vercel commissioned Geist, Linear uses custom type. | Low | Font system already locked. The value is in consistent, disciplined use. |
| Capability showcase (Tier B) case studies | Shows range and depth without requiring named clients; demonstrates engineering vocabulary in domains buyers recognize | Medium | Six capability-showcase pages with lighter layout than Tier A. Differentiates from firms that only show named-client work. |
| Hero text reveal animation | Stripe, Linear, Vercel all use choreographed text entry. Signals attention to craft. | Medium | GSAP text reveal on homepage hero. One pass, not looped. |
| Case study snapshot box above the fold | Leading with a KPI box (industry, size, key metric) means buyers self-qualify before reading — pattern used by top SaaS case studies | Low | Component: ClientSnapshotBox. Stat grid showing 3–4 callouts at top of case study. |

---

## Anti-Features

Things to explicitly NOT build. Each has a reason grounded in the target audience or site constraints.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Chatbot / live chat widget | Technical buyers reject being "helped" before they've evaluated anything. Chatbots on firm sites signal that human access is gated. Palantir and DeepMind don't have them. | Let the case studies and Contact page do the qualifying work. |
| Cookie consent banner / analytics (v1) | Interrupts first impression immediately. Kills premium perception. Technical buyers notice GDPR banners and are annoyed when they're unnecessary. | No tracking in v1. No banner needed. If analytics added later, use privacy-first analytics (Plausible, Fathom). |
| Aggressive exit-intent or email capture popups | Enterprise buyers are not leads to harvest. Popups on a firm site signal desperation. Anthropic, Stripe, Palantir have none. | Use newsletter in footer (optional), not modal. |
| Testimonials carousel / rotating quotes | Often perceived as fabricated or cherry-picked. Buyers in regulated industries are skeptical of unverifiable quotes. | Use real numbers in case studies. TODO placeholders for testimonials until confirmed by clients. No invented social proof. |
| Pricing page | Engineering/AI consulting engagements are scoped projects. Publishing rates signals commodity positioning and creates anchoring problems. | "Contact us to discuss your project" with clear next-step CTA. |
| Blog (v1) | Content marketing requires consistent production to work. A blog with 2 posts is worse than no blog — signals abandonment. | Out of scope for v1. Can be added when content cadence is confirmed. |
| Dark mode toggle | Splits design QA burden in two without a compelling audience reason. Editorial Light + intentional dark sections gives contrast without a toggle. | Commit to the editorial aesthetic. Use dark sections purposefully (case study heroes, architecture diagrams). |
| Stock photography of "diverse teams collaborating" | Instantly destroys technical credibility. Engineering buyers pattern-match stock photos as marketing theater. | Use technical artifacts: architecture diagrams, code snippets, sensor data visualizations. |
| Infinite scroll on portfolio | Adds complexity, breaks native scroll-to-anchor behavior, and makes it hard to find specific work. Buyers want to filter, not browse endlessly. | Paginated grid with industry filters. |
| Video testimonials / talking head videos (v1) | High production cost, requires client approval, easy to do poorly. | Defer. Use quantified outcomes in text. |
| Feature comparison tables against competitors | Invites rebuttal, ages poorly, and signals anxiety about the market position. Premium firms don't do this. | State what you do and for whom. Let the case studies compete. |
| Social media feed embeds | Third-party scripts, layout risk, and feeds quickly show stale content. | Footer links to social profiles only. |
| "Request a proposal" multi-step wizard | Over-engineering the contact flow. Technical buyers want to talk to a human, not fill out a qualification survey. | Single contact form: name, company, email, message, optional file attachment. |
| User authentication / gated content | No reason to gate content from buyers you're trying to convince. Gating reduces discoverability. | All content public. |

---

## Feature Dependencies

```
WebGL hero animation
  └── Three.js particle field
        └── Canvas fallback (prefers-reduced-motion)
              └── CSS static background fallback

Case study detail pages
  └── MDX content + typed frontmatter
        ├── ClientSnapshotBox component (stats above fold)
        ├── Case study hero animation (per-project, optional)
        │     └── R3F + drei (BridgeSense, iDTRM)
        └── Scroll-pinned architecture section
              └── GSAP ScrollTrigger

Portfolio section (listing)
  └── Industry/sector filter (FLIP animation)
        └── Case study cards
              └── Dynamic OG image (per case study)

Contact form
  └── mailto fallback (v1)
        └── TODO: Resend/Formspree (future)

SEO system
  └── Metadata per route
        ├── JSON-LD schemas (Organization, WebPage, Service)
        ├── Dynamic OG images (next/og)
        ├── sitemap.xml
        └── robots.txt

Animation system
  ├── GSAP ScrollTrigger (scroll-pinned sections, hero reveal)
  ├── Framer Motion (micro-interactions, number counters, hover-lift)
  └── prefers-reduced-motion (disables all motion animations)
```

---

## MVP Recommendation

The site is scoped as a full build (no phased trimming per PROJECT.md). All table stakes features are required at launch. Prioritization within the build should follow this order:

**Ship first (table stakes, no site without these):**
1. Navigation + routing (5 pages + 11 case studies)
2. Services page with clear proposition
3. Portfolio listing with industry filters
4. Case study detail pages (Tier A: 5 pages, Tier B: 6 pages)
5. Contact form (mailto)
6. SEO: metadata, sitemap, robots, JSON-LD
7. Responsive layout across all breakpoints
8. Accessibility: WCAG 2.1 AA throughout

**Build second (differentiators, high leverage):**
9. Homepage WebGL hero (particle field)
10. Scroll-pinned architecture sections (GSAP ScrollTrigger)
11. Metric counter animations (Framer Motion)
12. Case study snapshot boxes
13. Dark cinematic hero sections
14. Dynamic OG images

**Build third (case study hero animations, highest complexity):**
15. BridgeSense LiDAR point cloud (R3F)
16. iDTRM network topology animation (R3F)
17. Other per-case-study 3D scenes

**Defer explicitly:**
- Blog: no content cadence confirmed
- Video testimonials: no approved client video
- Analytics: wait for privacy-first tooling decision
- CMS integration: MDX works; don't add complexity

---

## Sources

- Stripe homepage analysis (verified via WebFetch, April 2026): https://stripe.com
- Vercel homepage analysis (verified via WebFetch, April 2026): https://vercel.com
- Anthropic homepage analysis (verified via WebFetch, April 2026): https://anthropic.com
- Palantir homepage analysis (verified via WebFetch, April 2026): https://palantir.com
- DeepMind homepage analysis (verified via WebFetch, April 2026): https://deepmind.google
- B2B Website Design Best Practices 2025: https://www.trajectorywebdesign.com/blog/b2b-website-design-best-practices
- B2B Trust Signals: https://www.trajectorywebdesign.com/blog/b2b-website-trust-signals
- 14 Best B2B Case Study Examples (Webstacks): https://www.webstacks.com/blog/b2b-case-study
- Three.js performance guide 2026: https://www.utsubo.com/blog/top-threejs-agencies
- Apple scroll animation analysis: https://css-tricks.com/lets-make-one-of-those-fancy-scrolling-animations-used-on-apple-product-pages/
- Enterprise buyer frustration research (Forrester, via search): https://www.provisorsthoughtleadership.com/2025/05/7-trust-signals-to-boost-b2b-conversions/
- B2B case study conversion statistics (HubSpot 2026, via search): https://www.bopdesign.com/bop-blog/top-b2b-website-designs-2025/
- Top B2B website designs 2025: https://www.bopdesign.com/bop-blog/top-b2b-website-designs-2025/
