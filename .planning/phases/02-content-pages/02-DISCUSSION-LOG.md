# Phase 2: Content & Pages - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-26
**Phase:** 02-content-pages
**Areas discussed:** MDX content structure, Copy approach, Section components, Contact form UX

---

## MDX Content Structure

### File Structure

| Option | Description | Selected |
|--------|-------------|----------|
| Frontmatter + body sections | Rich frontmatter validated with Zod. Body uses custom MDX components | ✓ |
| Frontmatter + plain markdown | Standard markdown with headings, page template handles layout | |
| You decide | Claude picks the MDX architecture | |

**User's choice:** Frontmatter + body sections

### Frontmatter Validation

| Option | Description | Selected |
|--------|-------------|----------|
| Zod validation (Recommended) | Schema validates every MDX file on build. Bad frontmatter = build error | ✓ |
| Runtime validation only | TypeScript types but no build-time validation | |
| You decide | Claude picks based on pipeline complexity | |

**User's choice:** Zod validation (Recommended)

### Data Loading

| Option | Description | Selected |
|--------|-------------|----------|
| gray-matter + globby | Read MDX files at build time, parse frontmatter, generate static params | ✓ |
| Content collections (TS) | Separate TypeScript data file with all metadata | |
| You decide | Claude picks for App Router compatibility | |

**User's choice:** gray-matter + globby

---

## Copy Approach

### Copy Depth

| Option | Description | Selected |
|--------|-------------|----------|
| Full professional copy | Complete production-ready text for every section with real numbers | ✓ |
| Structured placeholders | Section headings + summaries + TODO markers | |
| Full for Tier A, light for Tier B | Full copy for real-client pages, shorter for capabilities | |

**User's choice:** Full professional copy

### Homepage Copy

| Option | Description | Selected |
|--------|-------------|----------|
| Final copy now | Write production hero, sub-headline, capability strip, manifesto per build prompt | ✓ |
| Draft with iteration | Initial copy marked for review | |
| You decide | Claude writes best copy given source material | |

**User's choice:** Final copy now

---

## Section Components

### Reusability

| Option | Description | Selected |
|--------|-------------|----------|
| Fully reusable (Recommended) | Each component accepts props, shared across pages | ✓ |
| Page-specific sections | Inline sections per page, less abstraction | |
| You decide | Claude decides which sections earn component status | |

**User's choice:** Fully reusable (Recommended)

### Card Build Order

| Option | Description | Selected |
|--------|-------------|----------|
| All cards first, then pages | Build all card components before pages. Clean deps | ✓ |
| Cards with their pages | Build each card with the page that uses it | |
| You decide | Claude picks to minimize rework | |

**User's choice:** All cards first, then pages

---

## Contact Form UX

### Validation

| Option | Description | Selected |
|--------|-------------|----------|
| HTML5 + custom styling | Native validation, custom indigo error states | |
| React Hook Form | Lightweight form library for complex validation | |
| You decide | Claude picks based on form complexity | ✓ |

**User's choice:** You decide

### Submit UX

| Option | Description | Selected |
|--------|-------------|----------|
| Mailto with confirmation | Opens mailto, shows confirmation message | |
| Mailto silent | Email client appearing is the feedback | |
| You decide | Claude picks most professional UX | ✓ |

**User's choice:** You decide

---

## Claude's Discretion

- Form validation approach and submit UX
- ArchitectureDiagram component complexity (static SVG for Phase 2)
- Services anchor nav active state detection
- Portfolio filter (working filter only — FLIP animation in Phase 3)

## Deferred Ideas

None — discussion stayed within phase scope
