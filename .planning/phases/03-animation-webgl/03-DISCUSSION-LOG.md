# Phase 3: Animation & WebGL - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.

**Date:** 2026-04-26
**Phase:** 03-animation-webgl
**Areas discussed:** GSAP vs Framer Motion boundary, Three.js scene complexity, Reduced motion strategy, Scroll-pin behavior

---

## GSAP vs Framer Motion Boundary

### Domain Split

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, strict split (Recommended) | GSAP: scroll timelines. Framer: component interactions. Never both on same element | ✓ |
| GSAP for everything | One library for all animations | |
| You decide | Claude picks per-animation | |

**User's choice:** Yes, strict split (Recommended)

### Cleanup Pattern

| Option | Description | Selected |
|--------|-------------|----------|
| useGSAP everywhere (Recommended) | Every GSAP animation in useGSAP() from @gsap/react | ✓ |
| Manual useEffect cleanup | Standard useEffect with manual kill() | |
| You decide | Claude picks | |

**User's choice:** useGSAP everywhere (Recommended)

---

## Three.js Scene Complexity

### Particle Field

| Option | Description | Selected |
|--------|-------------|----------|
| Minimal ambient (Recommended) | ~2000 indigo particles, low opacity, slow drift. Single draw call. Atmospheric | ✓ |
| Interactive field | Particles react to mouse. More engaging but heavier | |
| You decide | Claude picks within <60KB budget | |

**User's choice:** Minimal ambient (Recommended)

### Point-Cloud Bridge

| Option | Description | Selected |
|--------|-------------|----------|
| Procedural bridge shape | Math-generated bridge points. No data file | |
| Static point positions | Hand-crafted JSON. More precise | |
| You decide | Claude picks for <60KB | ✓ |

### Fallback

| Option | Description | Selected |
|--------|-------------|----------|
| Static SVG noise pattern | Per build prompt spec | |
| Gradient background | Simple CSS gradient | |
| You decide | Claude picks appropriate fallback | ✓ |

---

## Reduced Motion Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Single hook, 3 consumers | One useReducedMotion() hook consumed by all systems | |
| Per-system checks | Each system checks independently | |
| You decide | Claude picks coordination approach | ✓ |

---

## Scroll-Pin Behavior

### Scope

| Option | Description | Selected |
|--------|-------------|----------|
| All 5 Tier A | Every real-client case study gets a pin | |
| Only 2-3 best candidates | Pin only where architecture is complex | |
| You decide | Claude picks which benefit from pinning | ✓ |

### Duration

| Option | Description | Selected |
|--------|-------------|----------|
| 100vh | Build prompt spec. 4-6 callouts reveal during pin | |
| 150vh | Slower reveals, more cinematic | |
| You decide | Claude picks based on content density | ✓ |

---

## Claude's Discretion

- BridgeSense point-cloud approach
- Reduced motion coordination architecture
- Which Tier A case studies get scroll-pinned sections
- Pin duration per case study
- Three.js fallback (SVG vs gradient)
- ScrollReveal component parameters

## Deferred Ideas

None
