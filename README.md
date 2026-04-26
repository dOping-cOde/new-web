# Softwires Technologies — Marketing Website

Production marketing site for Softwires Technologies, an AI engineering firm that ships real-world systems for energy, healthcare, and infrastructure.

Built with Next.js 15, Tailwind CSS v4, GSAP, Three.js, and MDX.

## Prerequisites

- Node.js 20+
- pnpm 9+

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Copy the environment file:
   ```bash
   cp .env.example .env.local
   ```
4. Start the development server:
   ```bash
   pnpm dev
   ```
5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/                    # Next.js App Router pages
  layout.tsx            # Root layout (nav, footer, fonts, metadata)
  page.tsx              # Home page
  services/             # Services page
  portfolio/            # Portfolio index + [slug] case studies
  about/                # About page
  contact/              # Contact page
  sitemap.ts            # Auto-generated sitemap
  robots.ts             # robots.txt
components/
  ui/                   # Design system primitives (Button, Pill, StatBlock, etc.)
  layout/               # Navbar, Footer, Container
  sections/             # Page sections (HeroLight, HeroDark, CTABand, etc.)
  cards/                # Card components (PortfolioCard, ServiceTile, etc.)
  forms/                # ContactForm
  motion/               # Animation wrappers (ScrollReveal, CountUp, etc.)
  three/                # Three.js scenes (particle field, point cloud bridge)
content/
  portfolio/            # MDX case study files (11 files)
lib/
  fonts.ts              # Self-hosted font definitions
  portfolio.ts          # Case study data loaders
  services.ts           # Service metadata
  types.ts              # TypeScript types and Zod schemas
  jsonld.ts             # JSON-LD structured data generators
  gsap.ts               # GSAP plugin registration
  useReducedMotion.ts   # Accessibility motion preference hook
public/
  fonts/                # Self-hosted .woff2 font files
  images/               # Static image assets
DESIGN.md               # Complete design system specification
```

## Editing Content

### Case Studies

Case studies live in `content/portfolio/` as MDX files. Each file has YAML frontmatter validated by Zod at build time.

To edit a case study:
1. Open `content/portfolio/{slug}.mdx`
2. Update frontmatter fields (title, excerpt, stats, techStack, etc.)
3. Edit the MDX body below the frontmatter
4. The build will fail if frontmatter is malformed — check `lib/types.ts` for the schema

To add a new case study:
1. Create `content/portfolio/{new-slug}.mdx` following existing file patterns
2. Add the slug to `relatedSlugs` in other case studies as needed
3. The sitemap and portfolio index update automatically

### Services

Service data is in `lib/services.ts`. Service copy is in `app/services/page.tsx`.

### Home Page

Featured case studies on the home page are hardcoded in `app/page.tsx` (`FEATURED_CARDS` array).

## Replacing Placeholder Assets

This site ships with placeholder images and TODO comments marking everything that needs real assets before launch.

Search for all placeholders:
```bash
grep -rn "TODO" --include="*.tsx" --include="*.ts" --include="*.mdx" .
```

Key placeholders:
- **Hero images**: Case study hero images referenced in MDX frontmatter (`heroImage` field) and `content/portfolio/*.mdx`
- **Portfolio card images**: Same hero images shown as thumbnails on `/portfolio`
- **Service diagrams**: Placeholder boxes in service sections on `/services`
- **Partner logos**: About page partnership section (`app/about/page.tsx`)
- **Client names**: Some case studies use bracketed placeholder names (confirm with client before launch)
- **Client quotes**: Pullquote components have placeholder text pending approval

## Contact Form

The contact form currently constructs a `mailto:` link. To wire server-side submission:
1. See the TODO in `components/forms/ContactForm.tsx` (line ~119)
2. Options: Resend (recommended) or Formspree
3. Create an API route at `app/api/contact/route.ts`

## Deployment

The site is configured for Vercel deployment (standard Next.js, not static export).

1. Push to GitHub
2. Import the repository in Vercel
3. Set the environment variable:
   - `NEXT_PUBLIC_SITE_URL` = your production domain (e.g., `https://softwires.in`)
4. Deploy

The site uses `pnpm` — Vercel auto-detects this from `pnpm-lock.yaml`.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js 15 | App Router, SSG, image optimization |
| Tailwind CSS v4 | Utility-first styling (CSS-first config) |
| GSAP 3 | Scroll animations, text reveals |
| Motion (Framer) | Micro-interactions, hover effects |
| Three.js + R3F | WebGL particle field, point-cloud bridge |
| MDX | Case study content |
| Zod | Frontmatter validation at build time |

## Design System

See `DESIGN.md` for the complete design system specification including colors, typography, spacing, and component patterns.
