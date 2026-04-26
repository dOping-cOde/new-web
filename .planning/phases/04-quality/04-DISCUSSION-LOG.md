# Phase 4: Quality - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.

**Date:** 2026-04-26
**Phase:** 04-quality
**Areas discussed:** SEO completeness, Accessibility audit scope, Performance optimization, README content

---

## SEO Completeness

### JSON-LD Architecture
| Option | Description | Selected |
|--------|-------------|----------|
| Per-page inline scripts | Each page renders own script tag | |
| Shared utility function | lib/seo.ts helpers | |
| You decide | Claude picks | ✓ |

### OG Image Generation
| Option | Description | Selected |
|--------|-------------|----------|
| next/og ImageResponse | Route-level opengraph-image.tsx | |
| Static placeholder + TODO | One default image | |
| You decide | Claude picks | ✓ |

---

## Accessibility Audit Scope

### Audit Depth
| Option | Description | Selected |
|--------|-------------|----------|
| Automated + manual checklist | axe-core + manual keyboard/contrast/heading checks | |
| Lighthouse only | Fix what Lighthouse flags | |
| You decide | Claude determines right depth | ✓ |

### Contrast Scope
| Option | Description | Selected |
|--------|-------------|----------|
| Full contrast audit | All text against backgrounds | |
| Body text only | Only body AAA | |
| You decide | Claude audits for Lighthouse 100 | ✓ |

---

## Performance Optimization

### Focus Area
| Option | Description | Selected |
|--------|-------------|----------|
| Three.js bundle (Recommended) | Highest JS cost, verify lazy loading | |
| Full audit pass | Systematic Lighthouse on every route | |
| You decide | Claude targets highest-impact | ✓ |

### Image Optimization
| Option | Description | Selected |
|--------|-------------|----------|
| Optimize placeholders | Set up next/image pattern correctly | |
| Skip until real images | Focus elsewhere | |
| You decide | Claude picks for Lighthouse 90+ | ✓ |

---

## README Content

| Option | Description | Selected |
|--------|-------------|----------|
| Developer-focused | Setup, structure, MDX editing, deploy, placeholders | |
| Comprehensive guide | All above plus design system, animation, components | |
| You decide | Claude writes what maintainers need | ✓ |

---

## Claude's Discretion
- JSON-LD architecture
- OG image generation approach
- Accessibility audit depth
- Performance optimization priorities
- Image optimization for placeholders
- README depth and structure

## Deferred Ideas
None
