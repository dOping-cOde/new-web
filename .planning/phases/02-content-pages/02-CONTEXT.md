# Phase 2: Content & Pages - Context

**Gathered:** 2026-04-26
**Status:** Ready for planning

<domain>
## Phase Boundary

All 17 routes with professional copy: 5 top-level pages (Home, Services, Portfolio, About, Contact) + custom 404 + 11 case study detail pages (5 Tier A, 6 Tier B). MDX content pipeline with typed frontmatter. Portfolio filter. Contact form with mailto. Section and card components. No animations (Phase 3) or WebGL (Phase 3) — static content only.

</domain>

<decisions>
## Implementation Decisions

### MDX Content Structure
- **D-01:** MDX files use rich frontmatter (stats, techStack, tier, relatedSlugs, category, subcategory, client, year, heroImage, excerpt) validated with Zod schema at build time. Bad frontmatter = build error.
- **D-02:** MDX body uses custom components registered in mdx-components.tsx: `<ProblemSection>`, `<SystemSection>`, `<Architecture>`, `<AIStack>`, `<Outcomes>`, `<Quote>` for Tier A; lighter components for Tier B.
- **D-03:** Data loading uses gray-matter + globby: read MDX files at build time, parse frontmatter, generate static params via generateStaticParams. No content collections or separate data files.
- **D-04:** Tier A template (5 pages): dark hero → problem (light) → system (light) → architecture (dark, will be scroll-pinned in Phase 3) → AI/ML stack (light) → outcomes (light) → up-next (light). Tier B template (6 pages): dark hero → what-it-does 3-column (light) → tech stack (light) → use-case examples (light) → CTA → up-next.

### Copy Approach
- **D-05:** Full professional copy for ALL pages — production-ready text using technical-precision voice from DESIGN.md. Not placeholders. Ready to ship.
- **D-06:** All case study copy uses real numbers from source decks (iDTRM specs, BridgeSense LiDAR data, Salt-Lick cancer stats, AI-Copter use cases, FWA security specs). iDTRM uses 8 DTRs (real deck figure).
- **D-07:** Esperer Bioresearch named directly. Other clients use descriptive placeholders ("[A leading central-Indian DISCOM]", "[A Tier-1 public-sector general insurer]") with TODO comments for confirmation.
- **D-08:** No fabricated testimonials. TODO placeholders for quotes pending client approval. Pull-quote component renders but with placeholder content.
- **D-09:** Homepage hero: "AI engineered for the physical world." with "engineered" in accent. Sub-headline and all section copy written per build prompt section 4.1.
- **D-10:** Tier B capability pages never fabricate client names, deployment numbers, or testimonials. Framed as "when an enterprise needs to..." not "we deployed for..."

### Section Components
- **D-11:** Section components are FULLY REUSABLE with props. HeroDark shared by all 11 case studies (headline, stats, caption, heroImage props). HeroLight for home/services/about. CTABand shared by home/services/about. ManifestoBand for home.
- **D-12:** Build order: all card components first (PortfolioCard, ServiceTile, CapabilityCard), then section components, then pages. Clean dependency chain.

### Contact Form UX
- **D-13:** Claude's Discretion on form validation approach (HTML5 + custom styling vs React Hook Form) and submit UX (confirmation message vs silent mailto). Whatever feels most professional for technical buyers.
- **D-14:** Form fields per build prompt: Name (required), Work email (required), Company (required), Role (select), Sector (select), Description (textarea, required), optional timeline/budget. Submit constructs mailto payload. TODO comment for Resend/Formspree integration.
- **D-15:** Inline validation with custom error states in indigo. aria-live="polite" for error announcements.

### Claude's Discretion
- Form validation library choice and submit UX (D-13)
- ArchitectureDiagram component complexity (SVG-based, static for Phase 2 — scroll-pinning comes in Phase 3)
- How to structure the services anchor nav (sticky, with active state detection)
- Portfolio filter animation approach (FLIP comes in Phase 3 — Phase 2 just needs working filter)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Build Specification
- `/Users/george/Downloads/softwires_claude_code_prompt.md` — Complete build brief. Section 4 (page-by-page brief) is the primary source for all page layouts, section ordering, and copy guidance. Section 6 (content/data structure) defines MDX frontmatter schema. Section 9 (copy guidance) defines what to write vs fabricate.

### Design System
- `DESIGN.md` — Component specs (PortfolioCard, Navigation, Footer, StatBlock, Pull-quote), typography rules, color rules, anti-patterns. Section components must follow these specs exactly.

### Phase 1 Foundation
- `app/globals.css` — All design tokens, typography utilities, spacing scale
- `components/ui/Button.tsx` — Primary/secondary button (import for CTAs)
- `components/ui/Pill.tsx` — Filter pills for portfolio, tech tags for case studies
- `components/ui/StatBlock.tsx` — Animated number + label for outcomes
- `components/ui/Caption.tsx` — Uppercase mono kicker
- `components/ui/SectionHeader.tsx` — Caption + heading + intro
- `components/layout/Container.tsx` — Max-width wrapper (1200px/1440px)
- `components/layout/Navbar.tsx` — Navigation links must match the 5 pages
- `components/layout/Footer.tsx` — Footer links must match page structure

### Research
- `.planning/research/STACK.md` — MDX setup with @next/mdx, gray-matter + Zod, not next-mdx-remote
- `.planning/research/PITFALLS.md` — MDX + App Router gotchas, RSC compatibility, remark-frontmatter requirements
- `.planning/research/FEATURES.md` — Feature landscape, case study structure, anti-features list

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `components/ui/Button.tsx` — Primary/secondary button for all CTAs (home, services, about, contact, case studies)
- `components/ui/Pill.tsx` — Interactive filter mode for portfolio, static tag mode for tech stacks
- `components/ui/StatBlock.tsx` — Display-lg accent number + caption label for case study outcomes
- `components/ui/Caption.tsx` — Uppercase kicker for section labels ("CASE STUDY · ENERGY")
- `components/ui/SectionHeader.tsx` — Caption + display heading + optional intro for all section openers
- `components/layout/Container.tsx` — 1200px (default) / 1440px (wide) wrapper
- `lib/utils.ts` — cn() utility for className merging
- `mdx-components.tsx` — Exists from scaffold, needs custom component registration

### Established Patterns
- Client components use `"use client"` directive
- Design tokens accessed via Tailwind utilities (text-display-xl, bg-bg-light, etc.)
- Components accept `className` prop for composition
- Dark sections use `data-theme="dark"` attribute (detected by Navbar)

### Integration Points
- Navbar links array must be updated to include all 5 pages
- Footer links must match page structure
- `app/page.tsx` currently has test sections — needs to be replaced with actual home page content
- `app/not-found.tsx` needs branding update

</code_context>

<specifics>
## Specific Ideas

- Visual bar is Apple product pages and Stripe marketing — "engineered seriousness"
- Homepage hero has ONE word ("engineered") in accent color via inline span
- Dark sections reserved for "gravity moments" — case study heroes, architecture diagrams
- Case study stat rows: 4 KPIs in display-md numbers + caption labels
- Services page uses numbered captions ("01 · AI AGENTS", "02 · CONVERSATIONAL", etc.)
- Data & Analytics section has 6 small capability cards inside the section (not full portfolio cards)
- Portfolio cards: 16:10 image aspect ratio, hover-lift deferred to Phase 3 but structure must support it
- "We don't ship demos. We ship systems." — manifesto band headline
- Contact form placeholder: "A brief technical description. What runs today, what needs to change."
- Below contact form: "or write directly: hello@softwires.in" in mono-sm

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-content-pages*
*Context gathered: 2026-04-26*
