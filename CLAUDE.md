<!-- GSD:project-start source:PROJECT.md -->
## Project

**Softwires Technologies Marketing Website**

A production-ready marketing website for Softwires Technologies, an AI engineering firm that ships real-world systems for energy, healthcare, and infrastructure. The site targets technocrats — CTOs, heads of engineering at utilities, hospital systems, insurers, mining companies, and public-sector buyers. Greenfield build, static-first, deployed on Vercel.

**Core Value:** The site must convey engineered seriousness — the calm authority of a firm that ships hardware-software systems into the physical world — and convert technical buyers into conversations.

### Constraints

- **Tech stack**: Locked as specified — Next.js 15, Tailwind v4, GSAP, Three.js, MDX, pnpm
- **Performance**: <250KB initial JS, LCP <2.0s, CLS <0.05, Three.js scenes <60KB each
- **Accessibility**: WCAG 2.1 AA minimum, AAA for body text contrast
- **Content accuracy**: Only use numbers from source decks; never invent deployment figures
- **Design discipline**: Max 2 font weights per screen, no decorative gradients, no drop shadows beyond sm, no emoji
- **Deployment**: Vercel-ready but do not deploy
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

## Recommended Stack
### Core Framework
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js | 15.x (pin to `next@15`) | App Router, SSG, image optimisation, font loading | Stack is locked. Note: Next.js 16 is now current stable — pin explicitly to 15 to avoid an unintentional major upgrade. 15.5 is the final 15.x release. |
| TypeScript | 5.x (bundled with Next.js) | Type safety throughout | Strict mode required per PROJECT.md |
| React | 18.x or 19.x | UI runtime | Next.js 15 ships with React 19 by default; both are compatible with the rest of the stack. |
| pnpm | 9.x | Package manager | Locked per PROJECT.md. Faster installs, strict node_modules layout. |
### Styling
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Tailwind CSS | 4.x (latest v4 stable) | Utility-first CSS | Stack locked. v4 released Jan 2025; uses CSS-first config, Lightning CSS engine — 2-5x faster builds than v3. |
| @tailwindcss/postcss | 4.x | PostCSS integration | Required in v4 — the `tailwindcss` package is no longer a PostCSS plugin directly. Replace the v3 postcss.config with `"@tailwindcss/postcss": {}`. |
| @tailwindcss/typography | latest v4-compatible | Prose styling for MDX case studies | Official first-party plugin; v4-compatible version available. Import via `@plugin "@tailwindcss/typography"` in your CSS, not JS config. |
- Replace `@tailwind base/components/utilities` with `@import "tailwindcss"` — single line.
- `tailwind.config.js` is no longer auto-detected; use `@theme {}` blocks in CSS instead.
- Utility renames: `shadow-sm` → `shadow-xs`, `shadow` → `shadow-sm`, `rounded-sm` → `rounded-xs`, `rounded` → `rounded-sm`, `blur-sm` → `blur-xs`.
- `ring` default is now 1px (was 3px); write `ring-3` for the old v3 default behaviour.
- `outline-none` no longer removes the outline visually — use `outline-hidden` for the v3 equivalent.
- `bg-opacity-*` / `text-opacity-*` removed — use opacity modifiers (`bg-black/50`).
- Gradient utilities renamed: `bg-gradient-to-r` → `bg-linear-to-r`.
- Important modifier flipped: `!flex` (v3) → `flex!` (v4).
- Arbitrary CSS variable syntax changed: `bg-[--color]` → `bg-(--color)`.
- Default border colour changed to `currentColor` in v4 (was gray-200 in v3) — specify colours explicitly.
- Browser floor: Safari 16.4+, Chrome 111+, Firefox 128+ — fine for the target technical audience.
### UI Components
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| shadcn/ui | current (new-york style) | Accessible base components for form, dialog, buttons | Sparingly used per PROJECT.md. All components updated for Tailwind v4 and React 19 as of February 2025. |
| Radix UI | latest (pulled by shadcn) | Headless accessibility primitives | shadcn's dependency; do not pin separately. |
| Lucide React | latest | Icon set | Locked per PROJECT.md. shadcn/ui dependency — update alongside. |
| tailwind-merge | 3.x | Merge conflicting Tailwind classes | Required by shadcn; supports `size-*` in v4. |
| clsx | 2.x | Conditional class names | Required by shadcn; no changes for v4. |
- Use `new-york` style (default style is deprecated).
- Components no longer use `forwardRef`; they have `data-slot` attributes instead.
- HSL colours converted to OKLCH — update any direct CSS variable overrides.
- `toast` component deprecated — use `sonner` instead.
- Run `npx shadcn@latest init` targeting Tailwind v4 for new projects; the CLI handles correct config.
### Animation: Scroll & Micro-interactions
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| gsap | 3.15.x | ScrollTrigger scroll-pinning, hero text reveal, parallax | Stack locked. Version 3.15 is current stable. ALL plugins (ScrollTrigger, SplitText, etc.) are now freely available on npm — no Club GSAP subscription needed. |
| @gsap/react | latest (matches gsap) | `useGSAP` hook for React integration | Mandatory companion package. Provides the `useGSAP()` hook which replaces `useEffect`/`useLayoutEffect` and handles all animation/ScrollTrigger/SplitText cleanup automatically via `gsap.context()`. |
| motion | 12.x (`motion/react` import) | Component micro-interactions: hover-lift, number counters, filter FLIP | Stack locked. Formerly `framer-motion` — import from `"motion/react"`, install `motion` package. v12 (stable 12.37+) has full React 19 support. |
- All `<motion.*>` components must live in `"use client"` files.
- Use `useReducedMotion()` hook (built in) to respect the OS accessibility setting — required for WCAG 2.1 AA.
### WebGL / 3D
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| three | 0.184.x | WebGL renderer | Stack locked. r184 is current (released ~April 2026). |
| @react-three/fiber | 9.x | React renderer for Three.js | Stack locked. v9 pairs with React 19. Install: `pnpm add @react-three/fiber`. |
| @react-three/drei | 10.x | Utility helpers for R3F | Stack locked. v10.7 is current stable. Provides `<Stars>`, `<Points>`, `<Detailed>` (LOD), `<Preload>`, `<AdaptiveDpr>`, and `<PerformanceMonitor>` — all relevant to the particle hero. |
### Content
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| @next/mdx | latest | Compile MDX files as Server Components | Official Next.js package. Transforms MDX at build time; no client-side MDX runtime is shipped. Required for App Router. |
| @mdx-js/loader | latest | Webpack/Turbopack MDX loader | Peer dependency of `@next/mdx`. |
| @mdx-js/react | latest | MDX context provider | Peer dependency needed for component remapping via `mdx-components.tsx`. |
| @types/mdx | latest | TypeScript types for `.mdx` imports | Required for type-safe MDX imports in strict mode. |
| remark-gfm | latest | GitHub Flavored Markdown (tables, strikethrough) | Case studies use tables; GFM plugin adds support. ESM only — must use `next.config.mjs`. |
| gray-matter | 4.x | Parse YAML frontmatter from MDX files | Lightweight, widely used. Used in the `generateStaticParams` helper to read frontmatter from the filesystem without shipping a runtime. |
| zod | 3.x | Validate typed frontmatter schemas | Validates case study frontmatter at build time; build fails loudly on malformed data rather than silently rendering broken pages. Use `zod-matter` (HiDeoo) for a combined parse+validate utility. |
| globby | 14.x | Glob MDX file paths at build time | ESM-native. Used server-side only (in `generateStaticParams`, data loaders). Not shipped to client. |
- `mdx-components.tsx` at the project root is **required** for App Router — the build will fail without it.
- Use `await import(`@/content/case-studies/${slug}.mdx`)` in `page.tsx` for dynamic MDX loading.
- `generateStaticParams` reads the filesystem with `globby` + `gray-matter` to enumerate slugs.
- Set `dynamicParams = false` so unknown slugs 404 cleanly.
- Do NOT use `next-mdx-remote` or `next-mdx-remote-client` — they add client-side runtime overhead and are unnecessary when content is local. `@next/mdx` compiles to Server Components.
- Export frontmatter as a named constant from each `.mdx` file (`export const metadata = { ... }`). Validate the shape with Zod in the data loader, not at import time.
### Fonts
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| next/font/local | (built into Next.js) | Self-host Fraunces, Inter, JetBrains Mono | Eliminates external network requests, prevents layout shift, enables subsetting. Zero config beyond pointing at font files. |
- Define each font exactly once in `lib/fonts.ts` and import the resulting CSS variable into `app/layout.tsx`. Never re-call `localFont()` in child components.
- Use **variable** font files (`.woff2` with a range axis) for Fraunces and Inter — one file serves all weights, eliminating multiple HTTP requests.
- Set `display: 'swap'` for body text (Inter) and `display: 'optional'` for display text (Fraunces) to prevent FOUT on slow connections.
- Pass CSS custom properties to Tailwind via `--font-fraunces`, `--font-inter`, `--font-mono` in `@theme` so utility classes like `font-display` work.
- Subset each font to the Latin character range to reduce file size (Fraunces: ~30KB, Inter: ~25KB, JetBrains Mono: ~20KB in woff2 variable).
### SEO & Metadata
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js Metadata API | (built in) | Per-route `metadata` exports, JSON-LD, OG images | App Router native; no third-party library needed. Use `generateMetadata` for dynamic routes. |
| next/og (ImageResponse) | (built in) | Dynamic OG image generation per case study | Server-rendered, no canvas polyfill needed. Runs at build time with `generateStaticParams`. |
| schema-dts | 1.x | TypeScript types for JSON-LD schemas | Provides type-safe JSON-LD objects for `Organization`, `WebPage`, `Article`, `BreadcrumbList`. Prevents schema errors. |
### Infrastructure & Tooling
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Vercel | (platform) | Hosting and CDN | Target deployment per PROJECT.md. Static export (`output: 'export'`) or standard Next.js deployment both work; standard deployment gives more flexibility for future OG image routes. |
| Node.js | 20 LTS | Runtime | Minimum per PROJECT.md; matches Vercel's active LTS. |
| TypeScript | strict mode | Type safety | `strict: true`, `noUncheckedIndexedAccess: true`, `exactOptionalPropertyTypes: true` for case study data integrity. |
## Alternatives Considered and Rejected
| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Animation import | `motion` (`motion/react`) | `framer-motion` | `framer-motion` is deprecated/legacy branding; same codebase but old import path. New projects should use `motion`. |
| MDX remote loading | `@next/mdx` (local) | `next-mdx-remote` | Ships a client-side MDX runtime; unnecessary for local filesystem content; noted as poorly maintained as of 2025. |
| Typed frontmatter | gray-matter + Zod | `contentlayer` | Contentlayer is archived/unmaintained. gray-matter + Zod + globby achieves the same result with maintained packages. |
| Frontmatter validation | Zod + gray-matter | `remark-mdx-frontmatter` | `remark-mdx-frontmatter` provides no runtime type validation; Zod validates shape and fails the build loudly. |
| Tailwind config | CSS `@theme {}` | `tailwind.config.js` | JS config is no longer auto-detected in v4; must be explicitly loaded. CSS-first is the v4 idiomatic approach. |
| Static export | Standard Vercel Next.js | `output: 'export'` | Static export breaks dynamic OG image routes and limits future extensibility. Vercel's standard runtime serves pre-built pages at zero cold-start cost anyway. |
| Three.js in Server Components | `next/dynamic` + `ssr: false` | Direct import | Three.js accesses `window`/WebGL APIs at import time — SSR will crash. Must be client-side only. |
| Particle rendering | `<Points>` / `InstancedMesh` | Individual `<mesh>` per particle | Each mesh = 1 draw call; 5,000 particles × 1 draw call each = unusable frame rate. Instancing = 1 draw call for the entire field. |
## Installation
# Core
# Styling
# UI components (shadcn via CLI, not direct install)
# Animation
# WebGL
# MDX
# Content utilities (server-side only — not in client bundle)
# Dev
## Sources
- Next.js MDX guide (official, updated 2026-04-23): https://nextjs.org/docs/app/guides/mdx
- Tailwind CSS v4 upgrade guide: https://tailwindcss.com/docs/upgrade-guide
- shadcn/ui Tailwind v4 docs: https://ui.shadcn.com/docs/tailwind-v4
- GSAP React integration guide: https://gsap.com/resources/React/
- GSAP installation / licensing: https://gsap.com/docs/v3/Installation/
- React Three Fiber performance guide: https://r3f.docs.pmnd.rs/advanced/scaling-performance
- motion upgrade guide: https://motion.dev/docs/react-upgrade-guide
- Next.js font optimisation: https://nextjs.org/docs/app/getting-started/fonts
- zod-matter (typed frontmatter): https://github.com/HiDeoo/zod-matter
- npm registry cross-checks: three@0.184.0, @react-three/fiber@9.6.0, @react-three/drei@10.7.7, gsap@3.15.0, motion@12.38.0
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd:quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd:debug` for investigation and bug fixing
- `/gsd:execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd:profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
