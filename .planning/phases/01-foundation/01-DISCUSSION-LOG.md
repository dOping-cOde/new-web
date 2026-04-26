# Phase 1: Foundation - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-26
**Phase:** 01-foundation
**Areas discussed:** Design token strategy, shadcn/ui scope, Navbar behavior, Mobile nav pattern

---

## Design Token Strategy

### Typography Mapping

| Option | Description | Selected |
|--------|-------------|----------|
| Custom utilities (Recommended) | Create text-display-xl, text-display-lg etc. as Tailwind utilities via @theme. Components use className='text-display-xl' | ✓ |
| Component-level classes | Define .display-xl, .body-lg in globals.css as plain CSS classes | |
| You decide | Claude picks the best approach for Tailwind v4 compatibility | |

**User's choice:** Custom utilities (Recommended)

### Color Tokens

| Option | Description | Selected |
|--------|-------------|----------|
| Both (Recommended) | CSS variables for GSAP/JS access + Tailwind utilities for markup. @theme maps vars to utilities automatically in v4 | ✓ |
| CSS variables only | Use style={{}} or arbitrary values in Tailwind. More explicit but verbose | |
| You decide | Claude picks based on Tailwind v4 best practices | |

**User's choice:** Both (Recommended)

### Spacing Scale

| Option | Description | Selected |
|--------|-------------|----------|
| Override Tailwind defaults | Replace Tailwind's spacing scale with DESIGN.md values in @theme. p-lg means 24px | ✓ |
| Extend with custom names | Keep Tailwind defaults, add space-section-y etc. for the custom values | |
| You decide | Claude picks the least confusing approach | |

**User's choice:** Override Tailwind defaults

### Motion Tokens

| Option | Description | Selected |
|--------|-------------|----------|
| CSS vars + Tailwind | duration-fast, ease-out as Tailwind utilities. transition-all duration-fast ease-out in markup | ✓ |
| CSS vars only | GSAP and Framer Motion read CSS vars directly. Tailwind transition classes use arbitrary values | |
| You decide | Claude picks based on which systems consume these tokens | |

**User's choice:** CSS vars + Tailwind

---

## shadcn/ui Scope

| Option | Description | Selected |
|--------|-------------|----------|
| Select (for form dropdowns) | Contact form has Role and Sector selects. shadcn Select is accessible and styled | |
| Sheet (for mobile nav) | Full-screen mobile nav overlay. shadcn Sheet handles focus trapping, body scroll lock | |
| None — all custom | Build every component from scratch. Maximum control | |
| You decide | Claude picks which shadcn components earn their place based on a11y complexity | ✓ |

**User's choice:** You decide
**Notes:** Claude has discretion to select shadcn components where they save significant accessibility implementation work.

---

## Navbar Behavior

### Theme Detection

| Option | Description | Selected |
|--------|-------------|----------|
| IntersectionObserver (Recommended) | Observe dark sections with IO. When the navbar overlaps a [data-theme='dark'] section, swap CSS variables | ✓ |
| Scroll position calculation | Calculate navbar position relative to dark section boundaries on scroll | |
| You decide | Claude picks the most performant approach | |

**User's choice:** IntersectionObserver (Recommended)

### Theme Transition

| Option | Description | Selected |
|--------|-------------|----------|
| Smooth crossfade (320ms) | Background and text colors transition smoothly via CSS transitions. Matches design spec duration-normal | ✓ |
| Instant swap | Snap to new colors immediately at the boundary | |
| You decide | Claude picks based on the editorial aesthetic | |

**User's choice:** Smooth crossfade (320ms)

---

## Mobile Nav Pattern

### Overlay Style

| Option | Description | Selected |
|--------|-------------|----------|
| Dark overlay with stagger | Full-screen dark background (#0A0B0D). Nav links reveal with 60ms stagger from top. Logo stays visible. Clean X close button | ✓ |
| Frosted glass overlay | Blurred backdrop showing page beneath. Links in large display type centered vertically | |
| You decide | Claude picks the approach that matches the editorial aesthetic | |

**User's choice:** Dark overlay with stagger

### Hamburger Animation

| Option | Description | Selected |
|--------|-------------|----------|
| Morph to X | Three lines animate into an X when open. CSS transforms, 320ms. Classic and reliable | ✓ |
| Simple swap | Icon swaps from Menu to X icon (Lucide). No morphing animation | |
| You decide | Claude picks based on the motion spec | |

**User's choice:** Morph to X

---

## Claude's Discretion

- Which specific shadcn/ui components to include vs build custom
- Loading skeleton design
- Exact breakpoint values
- CSS layer organization

## Deferred Ideas

None — discussion stayed within phase scope
