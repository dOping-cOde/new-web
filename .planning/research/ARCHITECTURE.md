# Architecture Patterns

**Project:** Softwires Technologies Marketing Website
**Domain:** Premium static marketing site — AI engineering firm
**Researched:** 2026-04-26
**Overall confidence:** HIGH (verified against official Next.js 15 docs, R3F docs, GSAP docs)

---

## Recommended Architecture

This site is a **static-first, component-island architecture** deployed on Vercel. Server Components handle all content rendering; Client Components are strictly limited to animation controllers, the Three.js canvas, and interactive form elements. Everything is statically generated at build time via `generateStaticParams`.

```
┌─────────────────────────────────────────────────────┐
│                   Build Pipeline                     │
│  MDX files → @next/mdx → RSC pages → Static HTML   │
│  TS content → typed imports → RSC pages             │
│  Tailwind v4 @theme → CSS variables → utility classes│
└─────────────────────────┬───────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────┐
│               Next.js App Router (SSG)               │
│                                                      │
│  layout.tsx (root shell: fonts, providers, SEO base) │
│     │                                                │
│     ├── (marketing)/                                 │
│     │      ├── page.tsx          /                   │
│     │      ├── services/page.tsx /services           │
│     │      ├── portfolio/page.tsx /portfolio          │
│     │      ├── about/page.tsx    /about              │
│     │      └── contact/page.tsx  /contact            │
│     │                                                │
│     └── portfolio/[slug]/                            │
│            ├── page.tsx          /portfolio/[slug]   │
│            └── opengraph-image.tsx                   │
└──────────────────────────────────────────────────────┘
```

---

## Component Boundaries

Every boundary below answers: **what is the component responsible for, and what does it talk to?**

### 1. Root Layout (`app/layout.tsx`) — Server Component

**Responsibility:** HTML shell, font loading, global providers, base metadata object.

**Communicates with:**
- `Providers` client wrapper (wraps GSAP context + any future state)
- `Navigation` (server-rendered shell, hydrated for mobile menu)
- `Footer` (pure server component, no interactivity)
- Next.js Metadata API (exports root `metadata` object)

**Rule:** Never import animation libraries here. Root layout is server-only.

---

### 2. Navigation — Split Server/Client

**Responsibility:** Site-wide nav with mobile hamburger.

**Pattern:** Server component renders the nav shell (links, logo). A thin `'use client'` `<MobileMenu>` child handles open/close state and the Framer Motion drawer animation. This keeps the nav largely server-rendered and out of the JS bundle.

**Communicates with:** Root layout (rendered as slot). No data fetching.

---

### 3. Page-Level Server Components (5 pages + 11 case study pages)

**Responsibility:** Compose section components, export `metadata` / `generateMetadata`, export `generateStaticParams` for dynamic routes.

**Data flow (case studies):**

```
MDX file (content/case-studies/[slug].mdx)
  → dynamic import(`@/content/case-studies/${slug}.mdx`)
  → Page Server Component
  → CaseStudyLayout (layout.tsx wrapping MDX content)
  → mdx-components.tsx (custom element overrides)
  → Rendered HTML
```

**Communicates with:**
- `content/` directory (MDX imports, TS data files)
- Section components (Hero, About, Services grid, etc.)
- SEO layer (exports metadata, opengraph-image.tsx co-located)
- `lib/case-studies.ts` utility (reads slugs for generateStaticParams)

---

### 4. Section Components (`components/sections/`)

**Responsibility:** Full-width page sections. Each section is a discrete visual block.

**Classification:**

| Section | Type | Reason |
|---------|------|--------|
| `HeroSection` | Client | GSAP text reveal, Three.js canvas |
| `ServicesGrid` | Server | Static content, no animation at component level |
| `PortfolioGrid` | Client | Framer Motion filter FLIP animation |
| `StatsReel` | Client | Framer Motion number counter |
| `ArchitectureDiagram` | Client | GSAP ScrollTrigger pin |
| `ContactForm` | Client | Form state, mailto submission |
| `CaseStudyHero` | Client | GSAP + possible Three.js point cloud |
| `TestimonialRow` | Server | Static placeholder copy |

**Rule:** Section components own their animation. They do not share GSAP contexts across sections — each initializes its own `useGSAP()` scope.

---

### 5. Animation Layer — GSAP + Framer Motion Coexistence

**Responsibility:** Scroll-driven and micro-interaction animations.

**Division of labour:**

```
GSAP + ScrollTrigger
  ├── Homepage hero text reveal (timeline)
  ├── Scroll-pinned architecture diagram sections
  ├── Parallax image layers
  └── Complex SVG/path morphs (if needed)

Framer Motion
  ├── Card hover-lift (whileHover)
  ├── Portfolio filter grid FLIP (layout prop)
  ├── Number counters (animate + useInView)
  ├── Page transition fade (AnimatePresence)
  └── Mobile nav drawer
```

**Cleanup architecture (HIGH confidence — from official GSAP docs):**

- Register all plugins once in `lib/gsap.ts` (centralized, guarded by `typeof window !== 'undefined'`)
- Use `useGSAP()` hook from `@gsap/react` inside every animated Client Component. All ScrollTriggers created within this hook are automatically reverted on unmount.
- Call `ScrollTrigger.refresh()` once after all page animations initialize (inside a `useEffect` with empty deps in the page-level client shell).
- Never call `ScrollTrigger.killAll()` — it destroys other components' triggers. Kill by scope.

**`lib/gsap.ts` pattern:**

```typescript
// lib/gsap.ts — import this everywhere, never import gsap directly
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export { gsap, ScrollTrigger }
```

---

### 6. Three.js Scene Layer (`components/three/`)

**Responsibility:** WebGL particle field (homepage hero) and point-cloud bridge (BridgeSense case study).

**Isolation pattern:**

```typescript
// components/three/HeroScene.tsx
'use client'
// ... R3F Canvas, useFrame, dispose

// app/(marketing)/page.tsx (Server Component)
import dynamic from 'next/dynamic'
const HeroScene = dynamic(
  () => import('@/components/three/HeroScene'),
  { ssr: false, loading: () => <div className="h-screen bg-canvas" /> }
)
```

**Rules:**
- All Three.js components: `ssr: false` via `next/dynamic`. Three.js requires browser globals.
- The wrapping component that calls `dynamic()` must be a Client Component (`'use client'`).
- Cap DPR: `<Canvas dpr={[1, 1.5]}>` — prevents 4K screens from rendering at native res.
- `frameloop="demand"` on non-animated scenes; `frameloop="always"` only on the hero.
- Dispose all geometries, materials, and textures in `useEffect` cleanup.
- Performance budget: each scene <60KB gzipped (enforced via bundle analyzer in CI).

**Communicates with:** Parent section component (receives config props only — colors, particle count). No upward data flow.

---

### 7. MDX Content Pipeline

**Responsibility:** Render 11 case study pages from `.mdx` source files with typed frontmatter and custom React component overrides.

**Pipeline:**

```
content/case-studies/[slug].mdx
  → @next/mdx (webpack loader, Turbopack-compatible with string plugin names)
  → remark-gfm (GitHub-Flavored Markdown: tables, strikethrough)
  → remark-frontmatter + remark-mdx-frontmatter (typed frontmatter export)
  → rehype-slug + rehype-autolink-headings (anchor links)
  → mdx-components.tsx (global overrides: h1, h2, img → next/image, code → syntax highlight)
  → Page Server Component renders <CaseStudyLayout><MDXContent /></CaseStudyLayout>
```

**Frontmatter schema (TypeScript):**

```typescript
// types/case-study.ts
export interface CaseStudyFrontmatter {
  title: string
  client: string          // "Esperer Bioresearch" or placeholder string
  tier: 'A' | 'B'
  sector: string
  heroImage: string
  summary: string         // ≤160 chars, used for meta description
  metrics: { label: string; value: string }[]
  tags: string[]
}
```

**Communicates with:**
- `next.config.mjs` (plugin registration)
- `mdx-components.tsx` (component overrides — root of project)
- `app/portfolio/[slug]/page.tsx` (dynamic import + generateStaticParams)
- `lib/case-studies.ts` (reads slug list for static generation and portfolio grid)

---

### 8. CSS Architecture — Tailwind v4 + Design Tokens

**Responsibility:** Single source of truth for the design system. All color, spacing, type, and shadow decisions live in CSS, not JavaScript.

**Tailwind v4 pattern (HIGH confidence — verified against official docs):**

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  /* Colors */
  --color-canvas: #FAFAF7;
  --color-ink: #111111;
  --color-accent: #3D2BFF;       /* Deep Indigo */
  --color-ink-muted: #6B7280;
  --color-surface-dark: #0D0D14; /* Cinematic dark sections */

  /* Typography */
  --font-display: 'Fraunces', Georgia, serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  /* Spacing (8px grid) */
  --spacing-section: 7rem;     /* 112px section padding */
  --spacing-gutter: 1.5rem;

  /* Animation */
  --ease-reveal: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-slow: 700ms;
}
```

**Rules:**
- No Tailwind config JS file in v4 — everything via `@theme` in CSS
- CSS variables from `@theme` are available as `var(--color-accent)` in arbitrary values and in GSAP/JS: `getComputedStyle(document.documentElement).getPropertyValue('--color-accent')`
- `@tailwindcss/typography` (`prose` classes) applied to MDX content wrapper in `CaseStudyLayout`

---

### 9. SEO Infrastructure

**Responsibility:** Per-route metadata, JSON-LD structured data, sitemap, robots, dynamic OG images.

**Architecture (HIGH confidence — verified against official Next.js docs):**

```
app/layout.tsx
  → exports root metadata object (site name, default OG, Twitter card)

app/(marketing)/[page]/page.tsx
  → exports static metadata object (page-specific title, description)

app/portfolio/[slug]/page.tsx
  → exports async generateMetadata() reading MDX frontmatter
  → memoizes with React cache() if frontmatter read is shared with page

app/portfolio/[slug]/opengraph-image.tsx
  → ImageResponse (next/og) — renders Softwires brand template with case study title
  → 1200×630px PNG, generated at build time for static routes

app/sitemap.ts
  → returns SitemapFile[] covering 5 pages + 11 case study slugs

app/robots.ts
  → returns static allow-all rules

JSON-LD (per page, embedded in <script type="application/ld+json">):
  → Home: Organization schema
  → Services: ProfessionalService schema
  → Case studies: Article schema with datePublished from frontmatter
  → Contact: ContactPage schema
```

**JSON-LD placement:** Rendered in Server Component `<head>` via a `<JsonLd>` utility component — not via `useEffect`. Bots receive it without executing JavaScript.

---

### 10. Image Optimization Pipeline

**Responsibility:** Deliver correctly-sized, correctly-formatted images with no layout shift.

**Rules:**
- All images use `<Image>` from `next/image` — never `<img>`
- Format negotiation: Next.js serves AVIF to supporting browsers, WebP as fallback, JPEG as baseline. Configure in `next.config.mjs`: `images: { formats: ['image/avif', 'image/webp'] }`
- Static local images (imported directly): blur placeholder generated automatically at build time
- Remote/dynamic images: generate `blurDataURL` manually via a build-time script or use a low-res inline base64 placeholder
- Hero images: `priority={true}` (preloaded, not lazy). All below-fold images: default lazy loading.
- Case study images: `sizes` prop tuned per breakpoint to avoid downloading oversized images on mobile

**In MDX:** The `mdx-components.tsx` overrides `img` to `next/image`:

```typescript
img: (props) => (
  <Image
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 72rem"
    style={{ width: '100%', height: 'auto' }}
    {...(props as ImageProps)}
  />
)
```

---

## Data Flow

Information moves in one direction: **content sources → build → static HTML → browser**.

```
Content Sources (at build time)
  ├── content/case-studies/*.mdx  →  MDX pipeline  →  RSC pages
  ├── content/services.ts         →  typed imports  →  RSC pages
  ├── content/portfolio-meta.ts   →  typed imports  →  Portfolio grid RSC
  └── public/fonts, images, icons →  Vercel CDN

Build Pipeline
  ├── generateStaticParams()      →  11 case study routes pre-rendered
  ├── sitemap.ts                  →  /sitemap.xml generated
  ├── opengraph-image.tsx         →  /portfolio/[slug]/og.png generated
  └── next/image                  →  AVIF/WebP variants generated on first request, cached

Browser Runtime
  ├── CSS (Tailwind v4)           →  no JS, pure CSS
  ├── GSAP (Client Components)    →  downloaded only when Client Component hydrates
  ├── Framer Motion               →  downloaded only when Client Component hydrates
  ├── Three.js + R3F              →  lazy loaded, ssr: false, only on pages that use it
  └── Contact form                →  mailto: fallback, no server round-trip
```

**No runtime data fetching.** This site has zero API calls at runtime. All content is embedded at build time.

---

## Component Library Organization

```
components/
  ├── ui/                     # shadcn/ui primitives (Button, Badge, Separator)
  │   └── [component].tsx     # 'use client' as needed — shadcn handles this
  │
  ├── layout/                 # Structural wrappers
  │   ├── Navigation.tsx      # Server shell + MobileMenu client child
  │   ├── Footer.tsx          # Server component
  │   ├── SectionContainer.tsx # Consistent padding/max-width wrapper
  │   └── CaseStudyLayout.tsx # MDX wrapper with prose styles
  │
  ├── sections/               # Full-width page sections
  │   ├── home/               # HomePage-specific sections
  │   ├── portfolio/          # Portfolio grid, filter
  │   └── case-study/         # Hero, metrics, diagram, CTA sections
  │
  ├── three/                  # WebGL scenes (all 'use client', all ssr: false)
  │   ├── HeroScene.tsx       # Homepage particle field
  │   └── BridgeSenseScene.tsx # Point-cloud bridge
  │
  ├── seo/                    # SEO utilities
  │   └── JsonLd.tsx          # Server component: renders JSON-LD script tag
  │
  └── providers/
      └── Providers.tsx       # 'use client': GSAP context, future state if needed

lib/
  ├── gsap.ts                 # Plugin registration, single export
  ├── case-studies.ts         # Reads MDX slugs + metadata for generateStaticParams
  └── fonts.ts                # next/font/local definitions

content/
  ├── case-studies/
  │   ├── idtrm.mdx
  │   ├── bridgesense.mdx
  │   ├── salt-lick.mdx
  │   ├── ai-copter.mdx
  │   ├── fwa-platform.mdx
  │   └── [6 Tier B slugs].mdx
  └── services.ts             # Typed service metadata

types/
  ├── case-study.ts           # CaseStudyFrontmatter interface
  └── mdx.d.ts                # TypeScript declarations for *.mdx imports
```

---

## Suggested Build Order (Phase Dependencies)

The following order respects hard dependencies — later phases depend on earlier ones being stable.

### Phase 1: Foundation (no dependencies)
- Project scaffold: Next.js 15, TypeScript strict, pnpm, ESLint, Prettier
- Tailwind v4 `@theme` with full design token set
- Self-hosted fonts (`next/font/local`: Fraunces, Inter, JetBrains Mono)
- Root layout, Navigation, Footer
- SEO base: root metadata, favicon, robots.ts, sitemap.ts stub

**Why first:** Everything else imports from here. Token system must be locked before sections are built. Navigation renders on every page.

### Phase 2: MDX Pipeline + Content Structure (depends on Phase 1)
- `@next/mdx` configuration with remark/rehype plugins
- `mdx-components.tsx` with typed overrides
- `content/case-studies/` directory with all 11 MDX files (stub content initially)
- `types/case-study.ts` frontmatter schema
- `lib/case-studies.ts` slug reader
- `app/portfolio/[slug]/page.tsx` with `generateStaticParams` and `dynamicParams = false`

**Why second:** Case study routes must exist before animation and SEO layers reference them. Getting the data pipeline right early prevents rework.

### Phase 3: Static Pages + Section Components (depends on Phase 1 + 2)
- All 5 top-level pages: Home, Services, Portfolio, About, Contact
- Server-rendered section components (non-animated): ServicesGrid, TestimonialRow, MetricsGrid, CTA blocks
- Portfolio grid (static, no filter animation yet)
- Contact form (static HTML, mailto action)
- Per-page `metadata` exports + `opengraph-image.tsx` for case study routes

**Why third:** Validates full routing tree and SEO infrastructure before adding animation complexity.

### Phase 4: Animation Layer (depends on Phase 3)
- `lib/gsap.ts` centralized plugin registration
- `Providers.tsx` GSAP context wrapper
- GSAP ScrollTrigger: hero text reveal, architecture diagram pin, parallax layers
- Framer Motion: card hover, portfolio filter FLIP, number counters, nav drawer
- `prefers-reduced-motion` respecting: conditional animation skip via `useReducedMotion()`

**Why fourth:** Animation depends on DOM structure being stable. Adding motion to moving targets causes rework.

### Phase 5: Three.js Scenes (depends on Phase 3)
- `components/three/HeroScene.tsx` — particle field, `frameloop="always"`, DPR capped
- `components/three/BridgeSenseScene.tsx` — point cloud, `frameloop="demand"`
- Dynamic import wrappers in parent sections with `ssr: false` and loading fallback
- Dispose cleanup in `useEffect`
- Bundle size validation: <60KB gzipped per scene

**Why fifth:** Three.js is the highest-risk dependency for Lighthouse scores. Isolated phase means performance can be benchmarked independently.

### Phase 6: Content Polish + Accessibility (depends on all prior phases)
- Real copy for all pages from source decks
- WCAG 2.1 AA audit: focus rings, skip-to-content link, aria-labels, keyboard nav
- `prefers-reduced-motion` audit across all animated components
- Image `alt` text, semantic HTML audit
- Lighthouse mobile audit: target 90+ Performance, 100 Accessibility/Best Practices/SEO

**Why last:** Accessibility audit needs complete DOM. Performance audit needs real assets.

---

## Anti-Patterns to Avoid

### 1. Importing GSAP in Server Components
**What goes wrong:** Build fails or hydration mismatch because GSAP references `window`.
**Prevention:** All GSAP imports only in files with `'use client'` directive. Use `lib/gsap.ts` as the single import point.

### 2. Calling `next/dynamic` with `ssr: false` from a Server Component
**What goes wrong:** Next.js 15 build-time error. The `dynamic()` call must be inside a file with `'use client'`.
**Prevention:** Create a `ThreeSceneWrapper.tsx` Client Component that holds the `dynamic()` call. Server Components import the wrapper.

### 3. Monolithic `HeroSection` Client Component
**What goes wrong:** Opt-ing the entire hero into the client bundle because it contains one animated element balloons JS.
**Prevention:** Hero is a Server Component that renders static markup + slots in two Client children: `<HeroTextReveal>` (GSAP) and `<HeroScene>` (Three.js). Static content stays server-rendered.

### 4. Sharing frontmatter reads between `generateMetadata` and the page without `cache()`
**What goes wrong:** MDX file is imported twice per request, doubling build time for 11 routes.
**Prevention:** Wrap the import in React's `cache()` function in `lib/case-studies.ts`.

### 5. Global ScrollTrigger cleanup with `killAll()`
**What goes wrong:** Unmounting one component kills ScrollTriggers owned by other components still in the DOM.
**Prevention:** Use `useGSAP()` scoped hooks. Each component cleans up only its own triggers.

### 6. Three.js canvas without explicit size constraints
**What goes wrong:** Canvas expands unboundedly, causes CLS, breaks Lighthouse.
**Prevention:** Wrap canvas in a `position: relative` container with explicit height. Use `style={{ position: 'absolute', inset: 0 }}` on the Canvas.

---

## Scalability Considerations

This is a static marketing site. Scalability concerns are primarily build-time and content-management concerns, not runtime concerns.

| Concern | Now (v1) | If content grows |
|---------|----------|-----------------|
| Case study count | 11 pages, fast build | >50 pages: add ISR or `output: 'export'` + CDN |
| OG image generation | 11 images at build | >100: pre-generate with script, store in public/ |
| MDX authoring | Files in repo | >20 authors: consider Contentlayer or a headless CMS |
| Animation complexity | GSAP + Framer Motion | If conflicts arise: consolidate to GSAP-only |
| Three.js scenes | 2 scenes | Each new scene: validate Lighthouse before merging |

---

## Sources

- Next.js official project structure docs (verified 2026-04-23): https://nextjs.org/docs/app/getting-started/project-structure
- Next.js official MDX guide (verified 2026-04-23): https://nextjs.org/docs/app/guides/mdx
- Next.js metadata and OG images (verified 2026-04-23): https://nextjs.org/docs/app/getting-started/metadata-and-og-images
- React Three Fiber performance scaling (official pmndrs docs): https://r3f.docs.pmnd.rs/advanced/scaling-performance
- GSAP React integration and cleanup (official GSAP docs): https://gsap.com/resources/React/
- GSAP Next.js 15 cleanup patterns (Thomas Augot, Medium, HIGH confidence — cross-referenced with GSAP official docs)
- Tailwind CSS v4 @theme design tokens: cross-referenced against multiple sources, all consistent (HIGH confidence)
