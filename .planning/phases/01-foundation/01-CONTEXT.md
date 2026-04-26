# Phase 1: Foundation - Context

**Gathered:** 2026-04-26
**Status:** Ready for planning

<domain>
## Phase Boundary

Project scaffold with Next.js 15 (pinned), TypeScript strict, Tailwind v4, and pnpm. Design system tokens (colors, typography, spacing, borders, shadows, motion) implemented as CSS variables via Tailwind v4 @theme. Self-hosted fonts (Fraunces, Inter, JetBrains Mono). Layout shell with sticky theme-aware navbar and dark footer. Core UI components: Button (primary/secondary), Pill, StatBlock, Caption, SectionHeader, Container. Responsive at mobile, tablet, and desktop breakpoints.

</domain>

<decisions>
## Implementation Decisions

### Design Token Strategy
- **D-01:** Typography scale uses custom Tailwind utilities — `text-display-xl`, `text-display-lg`, `text-display-md`, `text-h1`, `text-h2`, `text-h3`, `text-body-lg`, `text-body`, `text-body-sm`, `text-caption`, `text-mono-sm` — defined in @theme with exact sizes, weights, line-heights, and letter-spacing from DESIGN.md
- **D-02:** Color tokens defined as both CSS custom properties AND Tailwind color utilities via @theme. CSS vars for GSAP/JS access, Tailwind utilities (bg-bg-light, text-accent, etc.) for markup. @theme maps vars to utilities automatically in Tailwind v4
- **D-03:** Spacing scale from DESIGN.md (xs=4px through 5xl=192px) OVERRIDES Tailwind defaults. p-lg means 24px, not Tailwind's default. This is a full replacement, not an extension
- **D-04:** Easing and duration tokens defined as both CSS custom properties AND Tailwind utilities. `duration-fast`, `duration-normal`, `duration-slow`, `duration-cinematic` and `ease-out`, `ease-in-out`, `ease-spring` available as Tailwind transition classes. GSAP and Framer Motion also read CSS vars directly

### shadcn/ui Scope
- **D-05:** Claude's Discretion — Claude picks which shadcn/ui components to pull in based on accessibility complexity savings. "Only as needed" — most components are custom. Likely candidates: Select (for form dropdowns), Sheet (for mobile nav focus trapping). shadcn must use `new-york` style for Tailwind v4 compatibility

### Navbar Behavior
- **D-06:** Navbar detects dark sections via IntersectionObserver watching elements with `[data-theme="dark"]`. When navbar overlaps a dark section, CSS variables swap to dark-theme values
- **D-07:** Navbar theme transition is a smooth 320ms crossfade (CSS transitions on background-color and color). Matches `--duration-normal` from the design system
- **D-08:** Navbar background uses `backdrop-filter: blur(20px)` with semi-transparent background — `rgba(250, 250, 247, 0.72)` on light, `rgba(10, 11, 13, 0.72)` on dark

### Mobile Navigation
- **D-09:** Full-screen dark overlay (#0A0B0D) with nav links revealing via 60ms stagger from top. Logo stays visible. Clean X close button
- **D-10:** Hamburger icon morphs to X via CSS transforms, 320ms duration. Not a simple icon swap — animated transition between states
- **D-11:** Mobile overlay must handle focus trapping and body scroll lock for accessibility

### Claude's Discretion
- Which specific shadcn/ui components to include vs build custom (D-05)
- Loading skeleton design for components
- Exact breakpoint values (standard Tailwind breakpoints are fine unless design requires custom)
- Whether to use CSS layers for token organization

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design System
- `DESIGN.md` — Complete design system spec: colors, typography scale, spacing, borders, shadows, motion tokens, component specs, anti-patterns. This is the primary source of truth for all visual decisions.

### Build Prompt
- `/Users/george/Downloads/softwires_claude_code_prompt.md` — Original build brief with tech stack, page specs, component list, SEO requirements, accessibility requirements, build order. Sections 1-2 (Tech stack, DESIGN.md) are directly relevant to Phase 1.

### Research
- `.planning/research/STACK.md` — Verified library versions, Tailwind v4 migration notes, GSAP/R3F setup patterns
- `.planning/research/PITFALLS.md` — Critical pitfalls: Tailwind v4 config gotchas, shadcn OKLCH bug, font loading LCP impact

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None — greenfield project, no existing code

### Established Patterns
- None — patterns will be established in this phase and carried forward

### Integration Points
- This phase establishes the foundation that all subsequent phases build on
- Design tokens, layout shell, and core components must be stable before Phase 2 begins

</code_context>

<specifics>
## Specific Ideas

- Visual bar set by Apple product pages and Stripe marketing — "engineered seriousness" not "SaaS-startup energy"
- Fraunces 300 (thin display weight) is the typographic signature — display sizes only
- Max 2 font weights on any single screen: Fraunces 300 + Inter 400 is the default pair
- Section vertical padding: 192px desktop, 72px mobile
- Container max-width: 1200px for body, 1440px for full-bleed
- Borders are always 1px hairlines — never thicker, never colored (except focus rings)
- No decorative gradients, no drop shadows beyond sm, no emoji

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-foundation*
*Context gathered: 2026-04-26*
