# Phase 3: Animation & WebGL - Context

**Gathered:** 2026-04-26
**Status:** Ready for planning

<domain>
## Phase Boundary

Layer GSAP ScrollTrigger, Framer Motion, and Two Three.js/R3F scenes onto the existing static pages. Hero text reveal, scroll-pinned architecture sections, image parallax, hover-lift, number counters, filter FLIP, scroll reveal, particle hero, point-cloud bridge. prefers-reduced-motion support across all 3 animation systems. No new pages or content — animation layer only.

</domain>

<decisions>
## Implementation Decisions

### GSAP vs Framer Motion Boundary
- **D-01:** STRICT domain separation. GSAP ScrollTrigger owns: hero text word-by-word reveal, scroll-pinned architecture sections, image parallax (0.85x), section-level scroll timelines. Framer Motion owns: hover-lift on cards, number counter animation, portfolio filter FLIP, fade-up scroll reveal, component-level micro-interactions. They MUST NEVER target the same CSS property on the same element.
- **D-02:** Every GSAP animation MUST use `useGSAP()` from `@gsap/react` for cleanup. No raw `useEffect` + `gsap.to()`. This is non-negotiable per research — React 18 Strict Mode double-invoke causes duplicate ScrollTrigger instances without it.
- **D-03:** Create a single `lib/gsap.ts` module that registers all GSAP plugins (ScrollTrigger, etc.) once. All components import from this module, not directly from `gsap`.

### Three.js Scene Complexity
- **D-04:** Homepage particle field: ~2000 indigo particles, low opacity, slow drift. Points geometry (single draw call). Purely atmospheric — background texture, not focal. No mouse interactivity. <60KB JS budget.
- **D-05:** BridgeSense point-cloud bridge: Claude's discretion on procedural vs static approach. Must auto-rotate slowly. <60KB JS budget. Should look like a bridge structure rendered as point cloud data.
- **D-06:** All Three.js scenes loaded via `next/dynamic` with `ssr: false`. Canvas renders inside a client component wrapper. `frameloop="demand"` for mobile battery.
- **D-07:** GPU disposal: explicit `geometry.dispose()`, `material.dispose()`, `texture.dispose()` on unmount in every Three.js component.

### Reduced Motion Strategy
- **D-08:** Claude's discretion on coordination approach. Must achieve: GSAP timelines jump to end state instantly, Three.js scenes show static fallback (no canvas), Framer Motion respects user preference. All three systems must be consistent — either all animate or none animate.

### Scroll-Pin Behavior
- **D-09:** Claude's discretion on which Tier A case studies get scroll-pinned architecture sections and pin duration. Build prompt specifies 100vh pin. 4-6 spec callouts reveal with stagger during pin.
- **D-10:** Architecture diagram is SVG-based. Static SVG in Phase 2 gets upgraded to scroll-pinned with GSAP in Phase 3. The SVG itself does not change — only the scroll behavior wrapping it.

### Claude's Discretion
- BridgeSense point-cloud approach (procedural vs static) — D-05
- Reduced motion coordination architecture — D-08
- Which Tier A case studies get scroll-pinned sections — D-09
- Pin duration per case study — D-09
- Static fallback for Three.js (SVG noise pattern vs CSS gradient) — D-07 related
- ScrollReveal component: threshold, stagger timing, opacity/translateY values

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Animation Spec
- `DESIGN.md` §Motion — Easing tokens, duration tokens, 7 motion patterns to implement, reduced-motion requirements
- `/Users/george/Downloads/softwires_claude_code_prompt.md` §2 (Motion section in DESIGN.md content) — Exact pattern specs: hero text reveal, scroll-pinned sections, image parallax, navbar transitions, number counters, hover-lift, no bouncy animations

### Research
- `.planning/research/STACK.md` — `@gsap/react` useGSAP requirement, `motion/react` import path, Three.js r184 + R3F v9 + drei v10 versions
- `.planning/research/PITFALLS.md` — GSAP without useGSAP = memory leaks, Three.js GPU disposal, GSAP + Framer Motion same-property conflict, prefers-reduced-motion implementation gaps
- `.planning/research/ARCHITECTURE.md` — GSAP/Framer domain separation, Three.js SSR guard pattern

### Existing Components (modify, don't rebuild)
- `components/sections/HeroLight.tsx` — Add hero text reveal animation (GSAP SplitText equivalent)
- `components/sections/HeroDark.tsx` — Add stat counter animations (Framer Motion)
- `components/ui/StatBlock.tsx` — Add number counter animation (Framer Motion useMotionValue)
- `components/cards/PortfolioCard.tsx` — Add hover-lift animation (Framer Motion)
- `app/portfolio/PortfolioGrid.tsx` — Add FLIP animation to filter (Framer Motion layout prop)

### Phase 1 Foundation
- `app/globals.css` — Duration and easing CSS variables already defined
- `components/layout/Navbar.tsx` — Already has 320ms theme transition (don't re-animate)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `components/motion/` — Empty directory, ready for SplitText.tsx, CountUp.tsx, ScrollReveal.tsx
- `components/three/` — Empty directory, ready for HeroParticleField.tsx, PointCloudBridge.tsx
- `lib/utils.ts` — cn() utility
- Design tokens: `--duration-fast` (180ms), `--duration-normal` (320ms), `--duration-slow` (600ms), `--duration-cinematic` (1200ms), `--ease-out`, `--ease-in-out`, `--ease-spring`

### Established Patterns
- Client components use `"use client"` directive
- Navbar already uses IntersectionObserver for dark section detection
- MobileNav already has 60ms stagger reveal pattern
- `data-theme="dark"` on dark sections (HeroDark, Footer)

### Integration Points
- HeroLight.tsx needs SplitText animation on the headline
- HeroDark.tsx needs stat counter animations
- StatBlock.tsx needs CountUp animation
- PortfolioCard.tsx needs hover-lift (Framer Motion)
- PortfolioGrid.tsx needs FLIP filter animation (Framer Motion layout)
- app/page.tsx hero section needs Three.js particle field behind it
- BridgeSense case study page needs Three.js point-cloud bridge
- All case study architecture sections need GSAP scroll-pin
- All section content needs ScrollReveal fade-up on enter

</code_context>

<specifics>
## Specific Ideas

- Hero text reveal: display-xl splits by word, each fades up with 60ms stagger, cinematic duration (1200ms), ease-out
- Scroll cue at bottom of hero: mono-sm "scroll" with 1px line drawing down on loop
- Number counters animate from 0 on scroll-enter (e.g., "8" DTRs, "1.4M" cancer cases)
- Hover-lift on portfolio cards: translateY(-4px) + shadow-md to shadow-lg, 320ms, ease-out
- Image parallax: hero media moves at 0.85x scroll speed
- No bouncy animations anywhere. No spring overshoot except the contact form "send" button success state
- Cinematic feel, not playful
- ONE scroll-pin moment per page max (build prompt anti-pattern: no scroll-jacking)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 03-animation-webgl*
*Context gathered: 2026-04-26*
