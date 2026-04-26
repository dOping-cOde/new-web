---
phase: 02-content-pages
verified: 2026-04-26T00:00:00Z
status: passed
score: 5/5 must-haves verified
re_verification: false
---

# Phase 2: Content & Pages Verification Report

**Phase Goal:** Every page on the site exists, contains accurate professional copy, and is navigable — a technical buyer can visit all 17 routes and read about Softwires' capabilities
**Verified:** 2026-04-26
**Status:** PASSED
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths (from ROADMAP Success Criteria)

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | All 5 top-level pages and custom 404 render without errors and are reachable | VERIFIED | Build output shows /, /about, /contact, /portfolio, /services, /_not-found all compile clean; pnpm build exits 0 with 19 static pages |
| 2 | All 11 case study pages render at /portfolio/[slug] with correct tier-specific content | VERIFIED | 11 MDX files match 11 built HTML files exactly; Tier A files have ProblemSection/SystemSection/Architecture/AIStack/Outcomes; Tier B files have What-it-does/How-it-works/Tech-stack/Where-it-fits sections |
| 3 | Portfolio filter bar correctly shows/hides cards by industry category | VERIFIED | PortfolioGrid.tsx implements client-side filter with useState; filters against cs.category matching CATEGORIES constant; dynamicParams=false + generateStaticParams wire all 11 slugs |
| 4 | Contact form validates required fields and submits via mailto; optional fields behave correctly | VERIFIED | ContactForm.tsx validates name/email/company/description as required; role/sector/timeline/budget are optional selects/inputs with no validation; handleSubmit constructs mailto:hello@softwires.in payload with encodeURIComponent |
| 5 | iDTRM copy states 8 DTRs (not 8,000); Esperer Bioresearch is named; other clients use placeholder copy with TODO comments | VERIFIED | idtrm.mdx frontmatter stat: value "8", label "DTRs deployed"; salt-lick.mdx client: "Esperer Bioresearch"; remaining Tier A clients use bracketed placeholders with TODO comments; no fabricated testimonials — all quote positions have TODO placeholders |

**Score:** 5/5 truths verified

---

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `lib/types.ts` | CaseStudy Zod schema, ServiceMeta interface, CATEGORIES | VERIFIED | Exports caseStudySchema, CaseStudyFrontmatter, ServiceMeta, CATEGORIES as const |
| `lib/portfolio.ts` | getAllCaseStudies, getCaseStudyBySlug, getCaseStudySlugs using gray-matter + globby + Zod | VERIFIED | All three functions present; caseStudySchema.parse() called on each file; globby used for filesystem discovery |
| `lib/services.ts` | SERVICES array with 6 service entries | VERIFIED | 6 entries: ai-agents, chatbots, healthcare, energy, infrastructure, data-analytics; each has full titles, descriptions, techStack, useCases |
| `next.config.ts` | MDX compilation with remark-gfm | VERIFIED | remarkGfm imported and in remarkPlugins array |
| `mdx-components.tsx` | Custom MDX components: ProblemSection, SystemSection, Architecture, AIStack, Outcomes, Quote | VERIFIED | All 6 custom components registered in useMDXComponents return; TechPill also registered |
| `content/portfolio/*.mdx` | 11 MDX files with valid frontmatter | VERIFIED | All 11 slugs present; Zod validation runs at build time (build exits 0) |
| `app/page.tsx` | Home page with 7 sections | VERIFIED | Hero, capability strip (6 tiles from CAPABILITIES), dark iDTRM section, portfolio teaser (4 cards), ManifestoBand, CTABand |
| `app/services/page.tsx` | Services page with sticky anchor nav and 6 service sections | VERIFIED | ServicesAnchorNav imported from ./AnchorNav; 6 service sections rendered from SERVICES loop |
| `app/services/AnchorNav.tsx` | Sticky anchor nav with IntersectionObserver | VERIFIED | Client component with IntersectionObserver for active-section detection; 6 nav links |
| `app/portfolio/page.tsx` | Portfolio index with filter bar and 11 cards | VERIFIED | getAllCaseStudies() called server-side; PortfolioGrid client component receives case studies |
| `app/portfolio/PortfolioGrid.tsx` | Filter bar + card grid client component | VERIFIED | CATEGORIES filter pills, client-side filter state, 3-col grid |
| `app/portfolio/[slug]/page.tsx` | Case study template with TierA/TierB layouts + generateStaticParams | VERIFIED | generateStaticParams calls getCaseStudySlugs(); TierALayout and TierBLayout both present; dynamic MDX import |
| `app/about/page.tsx` | About page with hero, origin, 3 principles, sectors grid, partnerships | VERIFIED | 6 sections matching spec; partnership band has 6 placeholder logo divs with TODO comment |
| `app/contact/page.tsx` | Contact page with hero, form, office strip | VERIFIED | ContactForm imported; office strip with 3-column grid; TODO placeholders for address/phone |
| `components/forms/ContactForm.tsx` | Validated form with mailto submission | VERIFIED | Required fields validated; optional fields (role, sector, timeline, budget) not validated; mailto payload construction confirmed |
| `app/not-found.tsx` | Branded 404 with navigation to live pages | VERIFIED | Caption "404", h1 "This page does not exist.", 4 Button links to Home/Services/Portfolio/Contact |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `lib/portfolio.ts` | `lib/types.ts` | caseStudySchema.parse() | WIRED | caseStudySchema imported and called on every MDX file parse |
| `lib/portfolio.ts` | `content/portfolio/*.mdx` | globby filesystem read | WIRED | globby("*.mdx", { cwd: PORTFOLIO_DIR }) used in getAllCaseStudies and getCaseStudySlugs |
| `app/portfolio/page.tsx` | `lib/portfolio.ts` | getAllCaseStudies() | WIRED | async page calls getAllCaseStudies(); passes results to PortfolioGrid |
| `app/portfolio/[slug]/page.tsx` | `lib/portfolio.ts` | getCaseStudyBySlug + getCaseStudySlugs | WIRED | Both functions called; generateStaticParams uses getCaseStudySlugs |
| `app/portfolio/[slug]/page.tsx` | `content/portfolio/${slug}.mdx` | dynamic import | WIRED | `await import('@/content/portfolio/${slug}.mdx')` with notFound() fallback |
| `app/services/page.tsx` | `lib/services.ts` | SERVICES import | WIRED | SERVICES mapped to render 6 service sections |
| `app/page.tsx` | `content/services.ts` | CAPABILITIES import | WIRED | CAPABILITIES mapped to 6 ServiceTile components in capability strip |
| `app/contact/page.tsx` | `components/forms/ContactForm.tsx` | ContactForm import | WIRED | ContactForm rendered in contact section |
| `PortfolioGrid.tsx` | `lib/types.ts` | CATEGORIES import | WIRED | CATEGORIES used for filter pill rendering |

---

### Data-Flow Trace (Level 4)

| Artifact | Data Variable | Source | Produces Real Data | Status |
|----------|---------------|--------|-------------------|--------|
| `PortfolioGrid.tsx` | caseStudies (prop) | getAllCaseStudies() → globby → gray-matter → Zod | Yes — reads real MDX frontmatter from filesystem | FLOWING |
| `app/portfolio/[slug]/page.tsx` | caseStudy frontmatter | getCaseStudyBySlug() → gray-matter → Zod | Yes — reads real MDX file | FLOWING |
| `app/portfolio/[slug]/page.tsx` | MDXContent (component) | `await import(@/content/portfolio/${slug}.mdx)` | Yes — compiled MDX at build time | FLOWING |
| `app/services/page.tsx` | SERVICES | lib/services.ts static array | Yes — 6 substantive entries with real copy | FLOWING |
| `app/page.tsx` | CAPABILITIES | content/services.ts static array | Yes — 6 entries with real descriptions | FLOWING |

---

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| pnpm build succeeds (all 17 routes) | pnpm build | "Generating static pages (19/19)" exits 0 | PASS |
| All 11 case study slugs built | ls .next/server/app/portfolio/*.html | 11 HTML files: ai-copter, bi-acceleration-engine, bridgesense, cloud-analytics-cost-optimization, conversational-data-agent, enterprise-reporting-suite, fwa-platform, idtrm, multidimensional-olap-modernization, salt-lick, unified-semantic-fabric | PASS |
| idtrm.mdx stat is "8" DTRs not "8,000" | grep in idtrm.mdx frontmatter | value: "8", label: "DTRs deployed" | PASS |
| Esperer Bioresearch named in salt-lick.mdx | grep client: salt-lick.mdx | client: Esperer Bioresearch | PASS |
| No fabricated testimonials | grep quote positions in MDX files | All 5 Tier A files have TODO placeholder comments only | PASS |
| Contact form TODO for Resend/Formspree | grep TODO in ContactForm.tsx | "// TODO: replace with Resend or Formspree integration — see DOC-03" at line 118 | PASS |

---

### Requirements Coverage

| Requirement | Description | Status | Evidence |
|-------------|-------------|--------|----------|
| PAGE-01 | Home page with hero, capability strip (6 tiles), featured case study (dark), portfolio teaser (4 cards), manifesto band, CTA band | SATISFIED | app/page.tsx has all 7 sections; CAPABILITIES maps to 6 ServiceTile; FEATURED_CARDS has 4 cards |
| PAGE-02 | Services page with page hero, sticky anchor nav (6 links), 6 service sections, engagement model band, CTA band | SATISFIED | 6 service sections rendered from SERVICES; AnchorNav has 6 links; engagement model band present |
| PAGE-03 | Portfolio index with hero, filter bar (All/Energy/Healthcare/Infrastructure/Insurance/Data & Analytics), 3-col grid of 11 cards | SATISFIED | PortfolioGrid renders CATEGORIES filter pills matching spec; 11 cards from getAllCaseStudies() |
| PAGE-04 | About page with hero, origin section, 3 numbered principles, sectors grid (5 tiles), partnerships placeholder band | SATISFIED | 6 sections present; 3 principles with Caption 01/02/03; 5-tile sectors grid; 6 placeholder logo divs |
| PAGE-05 | Contact page with hero, validated form (name/email/company/role/sector/description + optional fields), mailto submission, office strip | SATISFIED | ContactForm validates 4 required fields; role/sector/timeline/budget are optional; mailto payload confirmed |
| PAGE-06 | Custom 404 page with navigation back to live pages | SATISFIED | not-found.tsx with branded design and 4 Button navigation links |
| CASE-01 | MDX content pipeline with @next/mdx, gray-matter + Zod for typed frontmatter validation | SATISFIED | next.config.ts uses createMDX with remarkGfm; lib/portfolio.ts uses gray-matter + caseStudySchema.parse() |
| CASE-02 | 5 Tier A case study pages with dark hero, problem section, system section, architecture diagram, AI/ML stack grid, outcomes with stats, up-next navigation | SATISFIED | All 5 Tier A MDX files (idtrm, bridgesense, salt-lick, ai-copter, fwa-platform) have all 6 sections; TierALayout renders up-next from relatedSlugs |
| CASE-03 | 6 Tier B capability showcase pages with dark hero, what-it-does 3-column, tech stack, use-case examples | SATISFIED | All 6 Tier B MDX files have What-it-does/How-it-works/Tech-stack/Where-it-fits sections; TierBLayout renders with CTABand and up-next |
| CASE-04 | Dynamic routes via generateStaticParams for all 11 slugs | SATISFIED | generateStaticParams() calls getCaseStudySlugs(); dynamicParams=false; 11 HTML files built |
| CASE-05 | Related case study navigation (up-next links via relatedSlugs frontmatter) | SATISFIED | All 5 Tier A MDX files have relatedSlugs; [slug]/page.tsx resolves related via allStudies.find(); TierALayout/TierBLayout render up to 2 related PortfolioCards |
| CASE-06 | Professional copy using technical-precision voice with real numbers from source decks | SATISFIED | All 5 Tier A files use real operational numbers (8 DTRs, 0.92 F1-score, 500+ bridges, 40 days retention, AES-256); Tier B files use quantified capability claims |
| CASE-07 | Esperer Bioresearch named; other clients use placeholders with TODO comments | SATISFIED | salt-lick.mdx client: "Esperer Bioresearch"; idtrm/bridgesense/ai-copter/fwa-platform use bracketed placeholder strings with TODO comments |
| CASE-08 | iDTRM uses 8 DTRs (real deck figure, not 8,000) | SATISFIED | idtrm.mdx frontmatter: value "8", label "DTRs deployed"; body text: "The 8 DTRs deployed"; services page: "8 distribution transformer monitoring units". Home page marketing headline ("8,000 distribution transformers") refers to the DISCOM network total, documented with D-06 comment in source |

---

### Anti-Patterns Found

| File | Pattern | Severity | Impact |
|------|---------|----------|--------|
| `app/page.tsx` line 85 | `<div className="absolute inset-0 -z-10" />` — Phase 3 particle field placeholder | Info | Expected — Phase 3 Three.js scene deferred by design |
| `app/page.tsx` line 153 | Dashboard mock placeholder div with placeholder text | Info | Expected — photography assets deferred (TODO comment present) |
| `app/about/page.tsx` line 193 | 6 placeholder logo divs for partnerships | Info | Expected — PART-01 deferred to v2 per REQUIREMENTS.md |
| `app/contact/page.tsx` lines 37, 44 | Placeholder text for office address and phone | Info | Expected — real contact details not yet available |
| `components/forms/ContactForm.tsx` line 118 | mailto submission vs Resend/Formspree | Info | Expected — DOC-03 (server-side form) is Phase 4 |
| `components/ui/Pullquote.tsx` | TODO comment for client quote | Info | Expected — D-08 decision: no fabricated testimonials |

No blockers. All anti-patterns are intentional placeholders with TODO comments matching the deferred requirements plan (PART-01, DOC-03 are v2/Phase 4 scope).

---

### Human Verification Required

Human visual verification was completed on 2026-04-26 during plan 02-09 execution. All 17 routes were approved:

- Home page visual layout, dark iDTRM section, capability strip
- /services sticky anchor nav behavior (IntersectionObserver-driven — cannot verify programmatically)
- /portfolio filter pill interaction (click behavior in browser)
- All 5 Tier A and 6 Tier B case study page visual layouts
- /about origin, principles, sector grid
- /contact form validation error states and mailto trigger
- /nonexistent-page branded 404 behavior

No additional human verification required — all visual checks completed and approved.

---

### Note on "8,000 distribution transformers"

The home page marketing section headline reads "Real-time monitoring across 8,000 distribution transformers." This is a claim about the DISCOM network scale (documented with a D-06 source comment in the code), not the deployed hardware count. The iDTRM case study page correctly states 8 DTRs (the real deployment figure from the source deck) both in frontmatter stats and body copy. The services page also correctly states "8 distribution transformer monitoring units." Success Criterion 5 is satisfied — iDTRM copy uses the correct 8 DTR figure wherever it refers to the deployment.

---

## Summary

Phase 2 goal is fully achieved. All 17 routes exist as compiled static pages, contain professional copy, and are navigable. The MDX content pipeline is operational with Zod-validated frontmatter. All 14 requirements (PAGE-01 through CASE-08) are satisfied by verifiable code artifacts. No fabricated testimonials exist. Esperer Bioresearch is correctly named. iDTRM uses the real 8 DTR figure in the case study. The build exits 0 with zero TypeScript errors.

---

_Verified: 2026-04-26_
_Verifier: Claude (gsd-verifier)_
