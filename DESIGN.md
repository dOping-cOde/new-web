---
name: Softwires Technologies
description: AI engineering for energy, healthcare, and infrastructure. Editorial Light aesthetic with cinematic dark case-study sections.
version: 1.0.0
tags: [ai-services, b2b, editorial, premium]
---

## Design Philosophy

Softwires builds systems that run in transformers, bridges, hospitals, and mines. The website must convey **engineered seriousness** — not SaaS-startup energy, not consultancy-deck energy, but the calm authority of a firm that ships hardware-software systems into the physical world.

The aesthetic borrows the editorial discipline of Apple's product pages and Stripe's marketing site: generous whitespace, large display type, single restrained accent, alternating light and dark sections that pace the reader through scroll. Every element earns its place. No decorative gradients. No drop shadows beyond `sm`. No more than two type weights on a single screen. No emoji. No icon-circle-card-grid clichés.

Dark sections are reserved for moments of **gravity** — case-study heroes, the "before/after" reveal, the technical-architecture diagram. Light sections are for **explanation and rhythm**.

## Colors

```
--color-bg-light:        #FAFAF7   /* warm off-white canvas, primary surface */
--color-bg-dark:         #0A0B0D   /* near-black, used for cinematic sections */
--color-surface:         #FFFFFF   /* card surfaces on light bg */
--color-surface-elevated: #1A1B1E  /* card surfaces on dark bg */
--color-border-light:    #E8E6DF   /* hairline borders on light bg, 1px */
--color-border-dark:     #1F2024   /* hairline borders on dark bg, 1px */
--color-text:            #0A0B0D   /* primary text on light bg */
--color-text-inverted:   #F5F4EE   /* primary text on dark bg */
--color-text-muted:      #5A5C61   /* secondary text on light bg */
--color-text-muted-dark: #8A8C92   /* secondary text on dark bg */
--color-accent:          #3D2BFF   /* deep indigo — single accent, used sparingly */
--color-accent-hover:    #2E1FCC
--color-accent-soft:     #EDE9FF   /* tinted background for accent zones */
```

**Rules:**
- Accent is used for: link hovers, primary buttons, one in-line word per hero, focus rings, and the underline on case-study category labels. Nowhere else.
- Never apply accent to large surface fills (no indigo hero blocks).
- Body copy is always `--color-text` on light, `--color-text-inverted` on dark — never muted.
- Muted gray is for metadata, captions, and disabled states only.

## Typography

```
--font-display: 'Fraunces', Georgia, serif
--font-body:    'Inter', system-ui, sans-serif
--font-mono:    'JetBrains Mono', monospace
```

### Scale (use these exact tokens)

| Token | Size (desktop) | Size (mobile) | Weight | Line-height | Letter-spacing | Use |
|-------|----------------|---------------|--------|-------------|----------------|-----|
| `display-xl` | 8rem (128px) | 3.5rem (56px) | 300 | 0.95 | -0.04em | Hero headline only |
| `display-lg` | 5rem (80px)  | 2.75rem (44px)| 300 | 1.0  | -0.03em | Section openers |
| `display-md` | 3.5rem (56px)| 2rem (32px)   | 400 | 1.05 | -0.025em| Page titles |
| `h1` | 2.5rem (40px) | 1.75rem (28px)| 400 | 1.15 | -0.02em | Page H1 in body content |
| `h2` | 1.875rem (30px)| 1.5rem (24px)| 500 | 1.2  | -0.015em| Subsection headers |
| `h3` | 1.25rem (20px) | 1.125rem (18px)| 500 | 1.3 | -0.01em | Card titles |
| `body-lg` | 1.25rem (20px) | 1.125rem (18px) | 400 | 1.55 | 0 | Lead paragraphs |
| `body` | 1.0625rem (17px) | 1rem (16px) | 400 | 1.6 | 0 | Body copy |
| `body-sm` | 0.9375rem (15px) | 0.875rem (14px)| 400 | 1.5 | 0 | Secondary text |
| `caption` | 0.8125rem (13px)| 0.75rem (12px) | 500 | 1.4 | 0.04em | Metadata, labels (UPPERCASE) |
| `mono-sm` | 0.8125rem (13px)| 0.75rem (12px)| 400 | 1.5 | 0 | Specs, technical readouts |

**Rules:**
- Display sizes (`display-xl`, `display-lg`, `display-md`) use **Fraunces in weight 300** — the thin display weight is the signature.
- `h1`–`h3` and body use **Inter**.
- Mono is for technical specs (e.g. "240kHz pulse · ±2–5mm @ 100m" in BridgeSense), GPS coordinates, version numbers, KPI readouts on dashboard mocks.
- **Never** stack more than two weights on the same screen. `Fraunces 300` + `Inter 400` is the default pair. `Inter 500` may replace one of them when display type isn't present.
- All-caps `caption` style for kickers above headlines (e.g. "CASE STUDY · ENERGY").

## Spacing

Base: **4px**. Scale (Tailwind-aligned):

```
xs    4px
sm    8px
md   16px
lg   24px
xl   32px
2xl  48px
3xl  72px
4xl  120px
5xl  192px
```

- Section vertical padding: `5xl` (192px) on desktop, `3xl` (72px) on mobile.
- Container max-width: **1200px** for body content, **1440px** for full-bleed media frames.
- Gutter: 32px desktop, 20px mobile.
- Grid gap: 32px desktop, 16px mobile.

## Borders & Radii

```
--radius-sm: 4px    /* buttons, tags */
--radius-md: 8px    /* inputs, small cards */
--radius-lg: 16px   /* large cards, image frames */
--radius-xl: 24px   /* hero media containers */
--radius-pill: 9999px /* nav pills, status badges */
```

Borders are always **1px hairlines** in `--color-border-light` or `--color-border-dark`. Never thicker. Never colored (except focus rings).

## Shadows

Used **rarely**. Three tokens only:

```
--shadow-sm: 0 1px 2px rgba(10, 11, 13, 0.04)
--shadow-md: 0 4px 16px rgba(10, 11, 13, 0.06)
--shadow-lg: 0 24px 60px rgba(10, 11, 13, 0.12)  /* hero media frames only */
```

No shadows on dark sections. Glow effects only on the WebGL hero (handled in shader, not CSS).

## Motion

GSAP ScrollTrigger drives all scroll-based motion. Framer Motion handles component-level interactions.

**Easing tokens:**
```
--ease-out:    cubic-bezier(0.16, 1, 0.3, 1)
--ease-in-out: cubic-bezier(0.7, 0, 0.3, 1)
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1)
```

**Duration tokens:**
```
--duration-fast:    180ms   /* hovers, focus */
--duration-normal:  320ms   /* state changes */
--duration-slow:    600ms   /* section reveals */
--duration-cinematic: 1200ms /* hero text reveal, big moments */
```

**Patterns to implement:**
1. **Hero text reveal** — display-xl headline splits by word, each word fades up with 60ms stagger, `--duration-cinematic`, `--ease-out`. Triggered on mount.
2. **Scroll-pinned sections** — on case-study detail pages, the architecture diagram pins for 100vh while bullet points reveal on scroll. GSAP ScrollTrigger with `pin: true`.
3. **Image parallax** — hero media moves at 0.85x scroll speed.
4. **Section section transitions** — when the user crosses from a light to a dark section (or vice versa), the navbar background blends via `backdrop-filter: blur(20px)` and a CSS variable color swap. Smooth, 320ms.
5. **Number counters** — stat callouts (e.g. "1.4M cancer cases", "500+ bridges") animate from 0 on enter via Framer Motion's `useMotionValue`.
6. **Hover-lift on portfolio cards** — translateY(-4px) + shadow-md → shadow-lg, 320ms, `--ease-out`.
7. **No bouncy animations.** No spring overshoot except on the small "send" button success state. Cinematic feel, not playful.

**Reduced motion:** Respect `prefers-reduced-motion`. Replace all scroll-driven motion with instant state changes.

## Components

### Button — Primary
- Background: `--color-text` (near-black) on light, `--color-text-inverted` on dark
- Text: inverse of background
- Border: none
- Radius: `--radius-pill`
- Padding: `12px 24px`
- Font: Inter 500, 15px
- Hover: background → `--color-accent`, text stays white. 180ms.
- Focus: 2px ring, `--color-accent`, 2px offset.

### Button — Secondary
- Background: transparent
- Text: `--color-text` (or inverted)
- Border: 1px hairline
- Radius: `--radius-pill`
- Padding: `12px 24px`
- Hover: background → `--color-text` (5% alpha)

### Card — Portfolio
- Background: `--color-surface` on light, `--color-surface-elevated` on dark
- Border: 1px hairline
- Radius: `--radius-lg`
- Padding: 0 (image fills top), content area `lg` (24px)
- Image aspect-ratio: 16:10
- Image radius: `--radius-md` (inner)
- Caption (UPPERCASE kicker): "ENERGY · IOT" — `--color-accent`, mono-sm
- Title: h3
- Excerpt: body-sm, `--color-text-muted`, max 2 lines (line-clamp)
- Hover: lift 4px, shadow → lg, image scale 1.02

### Navigation
- Sticky, full-width, 64px tall
- Background: `rgba(250, 250, 247, 0.72)` with `backdrop-filter: blur(20px)` on light pages, `rgba(10, 11, 13, 0.72)` on dark pages — auto-detected via IntersectionObserver
- Logo on left, nav links centered, CTA on right
- Nav link hover: text → `--color-accent`, underline animates from 0 → 100% width, 320ms
- Mobile: hamburger → full-screen overlay, items reveal with stagger

### Footer
- Background: `--color-bg-dark` always (regardless of page)
- Padding: `4xl` top/bottom
- 4-column grid on desktop: Logo+blurb / Services / Portfolio / Contact
- Hairline border at top in `--color-border-dark`
- Copyright + legal links at bottom in caption style

### Stat Block
- Display: `display-lg` number in Fraunces 300, accent-colored
- Label: caption style, muted, below the number
- Used in hero, case-study impact sections, footer

### Pull-quote (case studies)
- Display-md text, Fraunces 300, italic
- Indigo accent quote mark (decorative, non-text-content)
- Attribution in caption style below

## Imagery rules

- Hero imagery: AI-generated placeholders (high-resolution, photorealistic where possible) — agent should add a TODO comment indicating these need replacement with real photography.
- Product screenshots: when a real screenshot exists in the source documents, recreate it as a clean SVG/HTML mock (not a raster). Otherwise use a placeholder frame with a "[Product UI]" label and TODO comment.
- 3D/WebGL: ONE moment per page maximum. Hero of homepage gets a particle/wave field. One case study (BridgeSense) gets a rotating point-cloud bridge. That's it. Performance budget: <60KB JS for Three.js scene.
- Photography style when real assets arrive: documentary, not stock. Wide shots of substations at dusk, hospital corridors, drone perspectives over mines. No smiling-people-in-meeting stock.
- All images must use `next/image` with proper sizes, blur placeholders, and AVIF/WebP.

## Voice & writing rules

- **Technical precision.** Use real numbers from the portfolio decks. Never round when a specific figure exists.
- **Short sentences.** Average 14 words. Vary rhythm.
- **No marketing fluff.** Banned: "leverage," "synergy," "transform your business," "cutting-edge," "best-in-class," "seamless," "robust," "world-class," "next-generation," "revolutionary," "game-changing."
- **Concrete verbs.** Build, ship, deploy, monitor, predict, detect, route, score.
- **Lead with the system.** Describe what it does before why it matters.
- **One headline rule:** every section headline must contain a noun the reader can point at. Not "Our Approach" — "Edge inference, central learning."

## Anti-patterns (do not produce)

- Decorative full-width colored bars or stripes
- Centered body text (only headlines and stat blocks center)
- More than 2 font weights on screen
- Glassmorphism beyond the navbar
- "Trusted by" logo bars without real logos
- Generic icon-grid feature lists with circle backgrounds
- Hero CTAs that say "Get Started" — say what the user gets
- Dark mode toggle (we commit to one mode per page type)
- Cookie banner (no analytics that need it for v1)
- Scroll-jacking (let users scroll naturally; pin only for one moment per page max)
