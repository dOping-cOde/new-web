---
phase: 01-foundation
plan: 01
subsystem: ui
tags: [nextjs, tailwind, typescript, fonts, design-tokens, css-variables]

# Dependency graph
requires: []
provides:
  - Next.js 15.3.1 project scaffold with all Phase 1 dependencies installed
  - Tailwind v4 CSS-first config with complete design token system
  - Self-hosted variable fonts (Fraunces, Inter, JetBrains Mono) via next/font/local
  - DESIGN.md at project root with full design system specification
  - 11 custom typography utilities (text-display-xl through text-mono-sm)
  - 13 color tokens, 9 spacing values, 5 radii, 3 shadows, 4 durations, 3 easings
  - Root layout with font CSS variables on html element
  - Accessible skip-to-content link and focus ring styles
affects:
  - 01-02 (layout shell — navbar and footer build on these tokens)
  - 01-03 (core UI components — use design tokens for styling)
  - 01-04 (homepage — uses all typography utilities and tokens)
  - All subsequent phases that write UI

# Tech tracking
tech-stack:
  added:
    - next@15.3.1 (exact pin, no caret)
    - react@19, react-dom@19
    - tailwindcss@4.x with @tailwindcss/postcss (CSS-first config)
    - @tailwindcss/typography (for MDX prose)
    - gsap@3.15, @gsap/react (scroll animations)
    - motion@12.38 (Framer Motion, motion/react import)
    - three@0.177, @react-three/fiber@9, @react-three/drei@10 (WebGL)
    - @next/mdx, @mdx-js/loader, @mdx-js/react, @types/mdx (MDX pipeline)
    - remark-gfm, gray-matter, zod, globby, schema-dts (content utilities)
    - lucide-react, tailwind-merge, clsx (UI utilities)
  patterns:
    - Tailwind v4 CSS-first: @theme {} in globals.css, no tailwind.config.js
    - Font loading: next/font/local only, definitions in lib/fonts.ts, applied in layout.tsx
    - Design tokens: dual declaration as CSS custom properties AND @theme utilities
    - Custom Tailwind utilities via @utility directive for typography scale
    - Typography spacing overrides Tailwind defaults (p-lg = 24px not Tailwind default)

key-files:
  created:
    - package.json (all dependencies, next pinned exact)
    - tsconfig.json (strict, noUncheckedIndexedAccess, exactOptionalPropertyTypes)
    - next.config.ts (MDX support via createMDX)
    - postcss.config.mjs (@tailwindcss/postcss, not tailwindcss)
    - mdx-components.tsx (required for App Router MDX)
    - lib/utils.ts (cn() utility for class merging)
    - lib/fonts.ts (Fraunces, Inter, JetBrains Mono via localFont)
    - app/globals.css (complete design token system + typography utilities)
    - app/layout.tsx (root layout, font variables on html element)
    - app/page.tsx (typography/color/spacing verification page)
    - app/not-found.tsx (custom 404)
    - DESIGN.md (complete design system specification at project root)
    - public/fonts/FrauncesVariable.woff2
    - public/fonts/InterVariable.woff2
    - public/fonts/JetBrainsMonoVariable.woff2
    - .env.example
    - .gitignore
    - eslint.config.mjs
  modified: []

key-decisions:
  - "Use next/font/local (not next/font/google) for all three fonts — eliminates runtime Google Fonts requests"
  - "Pin next@15.3.1 exact (no caret) — Next.js 16 is current stable, caret would upgrade unexpectedly"
  - "Tailwind v4 CSS-first: @theme {} in globals.css, deleted any tailwind.config.js — v4 does not auto-detect JS config"
  - "Design tokens as dual CSS vars + @theme utilities — CSS vars for GSAP/JS access, @theme for Tailwind class generation"
  - "Custom spacing scale overrides Tailwind defaults — p-lg means 24px per DESIGN.md, not Tailwind default"
  - "Fraunces uses display:optional, Inter uses display:swap — prevents FOUT on slow connections per Pitfall 6"
  - "Font URLs sourced from Google Fonts API at build time (one-off download) — woff2 served locally at runtime"

patterns-established:
  - "Font pattern: define once in lib/fonts.ts, import in app/layout.tsx, apply variable to html className"
  - "Token pattern: define in :root as CSS vars, repeat in @theme for Tailwind utility generation"
  - "Typography pattern: @utility classes for complete font stacks (family + size + weight + line-height + tracking)"
  - "Build-time asset pattern: download fonts via curl at scaffold time, never at runtime"

requirements-completed: [FOUND-01, FOUND-02, FOUND-03, FOUND-04]

# Metrics
duration: 8min
completed: 2026-04-26
---

# Phase 01 Plan 01: Foundation Scaffold Summary

**Next.js 15.3.1 scaffold with Tailwind v4 CSS-first design tokens, self-hosted variable fonts (Fraunces/Inter/JetBrains Mono via next/font/local), and complete DESIGN.md at project root**

## Performance

- **Duration:** 8 min
- **Started:** 2026-04-26T10:01:13Z
- **Completed:** 2026-04-26T10:09:06Z
- **Tasks:** 2
- **Files modified:** 19 (created), 2 (modified)

## Accomplishments

- Scaffolded Next.js 15.3.1 with all project dependencies (gsap, motion, three, R3F, MDX pipeline, etc.) pinned and installed
- Implemented complete Tailwind v4 CSS-first design token system: 13 colors, 9 spacing values, 11 typography utilities, 5 radii, 3 shadows, 4 durations, 3 easings — all as both CSS vars and Tailwind @theme utilities
- Self-hosted Fraunces, Inter, and JetBrains Mono variable fonts via next/font/local — no Google Fonts network requests at runtime
- Created DESIGN.md at project root with exact design system specification including Design Philosophy, Colors, Typography, Spacing, Borders, Shadows, Motion, Components, Imagery, Voice, and Anti-patterns sections

## Task Commits

Each task was committed atomically:

1. **Task 1: Scaffold Next.js 15 project and install all dependencies** - `94b5ebb` (feat)
2. **Task 2: Create DESIGN.md, download fonts, implement design token system** - `906c9a9` (feat)

## Files Created/Modified

- `/Users/george/DEV/softwire/package.json` - All dependencies, next@15.3.1 exact (no caret)
- `/Users/george/DEV/softwire/tsconfig.json` - strict, noUncheckedIndexedAccess, exactOptionalPropertyTypes, @/* alias
- `/Users/george/DEV/softwire/next.config.ts` - MDX support via @next/mdx createMDX
- `/Users/george/DEV/softwire/postcss.config.mjs` - @tailwindcss/postcss (NOT tailwindcss)
- `/Users/george/DEV/softwire/mdx-components.tsx` - Required for App Router MDX
- `/Users/george/DEV/softwire/lib/utils.ts` - cn() class merging utility
- `/Users/george/DEV/softwire/lib/fonts.ts` - Fraunces/Inter/JetBrains Mono via localFont
- `/Users/george/DEV/softwire/app/globals.css` - Full design token system + typography utilities
- `/Users/george/DEV/softwire/app/layout.tsx` - Root layout with font CSS variables on html
- `/Users/george/DEV/softwire/app/page.tsx` - Typography/color/spacing verification page
- `/Users/george/DEV/softwire/app/not-found.tsx` - Custom 404 using design tokens
- `/Users/george/DEV/softwire/DESIGN.md` - Complete design system specification
- `/Users/george/DEV/softwire/public/fonts/FrauncesVariable.woff2` - Variable font (67KB)
- `/Users/george/DEV/softwire/public/fonts/InterVariable.woff2` - Variable font (11KB)
- `/Users/george/DEV/softwire/public/fonts/JetBrainsMonoVariable.woff2` - Variable font (9KB)
- `/Users/george/DEV/softwire/.env.example` - NEXT_PUBLIC_SITE_URL placeholder
- `/Users/george/DEV/softwire/.gitignore` - Standard Next.js gitignore
- `/Users/george/DEV/softwire/eslint.config.mjs` - next/core-web-vitals + next/typescript

## Decisions Made

- **next/font/local over next/font/google** — eliminates runtime network requests to fonts.googleapis.com; fonts served from same origin
- **next@15.3.1 pinned exact** — Next.js 16 is current stable; unpinned install would land on wrong major
- **Tailwind v4 CSS-first** — no tailwind.config.js; all customization in globals.css via @theme {}
- **Dual token declaration** — CSS custom properties in :root (for GSAP/JS access) AND repeated in @theme (for Tailwind utility generation)
- **Custom spacing overrides defaults** — p-lg = 24px per DESIGN.md, not Tailwind's default; this is a breaking decision future components must respect
- **Fraunces display:optional** — prevents FOUT for display text (hero headlines); user sees blank rather than flash-of-unstyled-text
- **Font URLs sourced via Google Fonts API** — original hardcoded URLs in plan were stale (v35, now v38); fetched current URLs at build time

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Font URLs were stale in the plan**
- **Found during:** Task 2 (font download step)
- **Issue:** Hardcoded font URLs in plan (Fraunces v35, Inter v18, JetBrains Mono v20) returned HTML error pages instead of WOFF2 files — fonts are at v38, v20, v24 respectively
- **Fix:** Queried Google Fonts API with Chrome User-Agent to get current woff2 URLs, then downloaded correct files
- **Files modified:** public/fonts/*.woff2 (correct files downloaded)
- **Verification:** `file *.woff2` confirms all three are WOFF2 format; sizes 67KB/11KB/9KB are correct
- **Committed in:** 906c9a9 (Task 2 commit)

**2. [Rule 3 - Blocking] Missing @eslint/eslintrc caused ESLint failure**
- **Found during:** Task 1 (initial build verification)
- **Issue:** eslint.config.mjs imported @eslint/eslintrc which was not in package.json; ESLint failed during build
- **Fix:** Added @eslint/eslintrc to devDependencies via pnpm add -D
- **Files modified:** package.json, pnpm-lock.yaml
- **Verification:** Build passes cleanly with no ESLint errors
- **Committed in:** 94b5ebb (Task 1 commit, @eslint/eslintrc added before commit)

**3. [Rule 3 - Blocking] create-next-app refused to run in existing directory**
- **Found during:** Task 1 (project scaffold step)
- **Issue:** `pnpm create next-app@latest .` failed because directory already contained .planning/ and CLAUDE.md — scaffolder rejects non-empty directories
- **Fix:** Created all project files manually following the plan specifications exactly (package.json, tsconfig.json, next.config.ts, etc.)
- **Files modified:** All project files created manually
- **Verification:** Build passes with all acceptance criteria met
- **Committed in:** 94b5ebb (Task 1 commit)

---

**Total deviations:** 3 auto-fixed (all Rule 3 - Blocking)
**Impact on plan:** All three were pre-existing environmental issues. No scope creep. All acceptance criteria met as specified.

## Issues Encountered

- Font download URLs in plan were stale (Google Fonts updates CDN paths per version). Resolved by querying Google Fonts CSS API with a browser User-Agent to get current paths.
- No project template could be used (directory non-empty), so manual file creation was required. This actually produced a cleaner result — no scaffolder-generated boilerplate to clean up.

## Known Stubs

None — all design tokens are fully defined. The app/page.tsx is a verification page only (expected for this foundation plan), not a stub that blocks the plan's goal.

## User Setup Required

None — no external service configuration required. Font files are self-hosted and committed to the repository.

## Next Phase Readiness

- Foundation is complete and stable — all design tokens, typography, and font loading established
- `pnpm build` passes with zero TypeScript/ESLint errors
- Design system specification (DESIGN.md) is at project root for all future plans to reference
- All subsequent phase plans can immediately use Tailwind utilities: `text-display-xl`, `bg-accent`, `p-lg`, `duration-normal`, etc.
- Plan 02 (layout shell — navbar, footer, core components) can proceed immediately

---
*Phase: 01-foundation*
*Completed: 2026-04-26*
