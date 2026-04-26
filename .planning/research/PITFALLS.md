# Domain Pitfalls: Next.js 15 Premium Marketing Website

**Domain:** AI engineering firm marketing site (Next.js 15 + Tailwind v4 + GSAP + Three.js/R3F + MDX)
**Researched:** 2026-04-26
**Stack specificity:** All pitfalls are specific to the locked stack. Generic Next.js advice excluded.

---

## Critical Pitfalls

Mistakes that cause rewrites, failed Lighthouse targets, or inaccessible experiences.

---

### Pitfall 1: GSAP Without `useGSAP` — Duplicate Animations and Memory Leaks

**What goes wrong:** Using raw `useEffect` for GSAP initialisation in React 18 (which runs effects twice in Strict Mode during development) creates duplicate ScrollTrigger instances, conflicting `from()` tweens, and event listeners that survive component unmounts. On route navigation, leaked ScrollTriggers continue responding to scroll events from previous pages, causing invisible performance drain and animation glitches.

**Why it happens:** GSAP mutates the DOM imperatively. React 18 Strict Mode's double-invoke behaviour exposes the absence of cleanup. `useEffect` requires manual bookkeeping; most tutorials skip it.

**Consequences:**
- Duplicate animation playback on first load
- ScrollTrigger instances accumulate across client-side route navigations (no page reload means no natural cleanup)
- `pin-spacer` divs injected by ScrollTrigger conflict with React's virtual DOM reconciliation when siblings are added/removed
- Memory grows with every route visit — measurable on long sessions

**Prevention:**
- Install and use `@gsap/react` package exclusively: `useGSAP(() => { ... }, { scope: containerRef })` — this wraps `gsap.context()` and auto-reverts all animations and ScrollTriggers on unmount
- Never use raw `useEffect` for GSAP. Never call `gsap.to()` at module scope.
- Use `contextSafe()` wrapper for interaction-based animations (click handlers, hover callbacks) that fire outside the initial hook body
- Call `ScrollTrigger.refresh()` once after all animations initialise on a page to avoid trigger misalignment after first render
- Register plugins once at app root: `gsap.registerPlugin(ScrollTrigger)` in a central config file

**Warning signs:**
- Animations play twice on initial page load in dev
- Browser memory grows across route changes (measure with Chrome DevTools Memory tab)
- Console warnings about ScrollTrigger instances after navigation
- `pin-spacer` height wrong on resize

**Phase:** Foundation / animation setup (Phase 1–2). Fix before building any animated component.

---

### Pitfall 2: Three.js/R3F — No GPU Resource Disposal, Mobile OOM Crashes

**What goes wrong:** Three.js holds GPU memory for geometries, materials, and textures even after components unmount. A particle field on the homepage that doesn't call `dispose()` on unmount leaks ~16MB per 4K RGBA texture per navigation cycle. On mobile (limited VRAM), this triggers out-of-memory crashes or forces the browser to silently kill the WebGL context — leaving a black canvas with no error.

**Why it happens:** JavaScript garbage collection handles heap memory but has no visibility into GPU allocations. `scene.clear()` removes objects from the scene graph but does NOT free GPU memory. Three.js requires explicit `dispose()` calls.

**Consequences:**
- Progressive GPU memory growth across session
- WebGL context loss on mobile (black canvas, hard to debug)
- Heat generation on mobile, triggering thermal throttling and frame drops
- Particle scenes targeting <60KB per scene budget are blown if textures aren't compressed

**Prevention:**
- In R3F, use the `useLoader` hook (auto-caches assets) and dispose within `useEffect` cleanup:
  ```ts
  useEffect(() => {
    return () => {
      geometry.dispose()
      material.dispose()
      texture.dispose()
      renderer.dispose()
    }
  }, [])
  ```
- Use `frameloop="demand"` on `<Canvas>` for scenes that don't animate continuously (BridgeSense point-cloud when user is not interacting) — critical for mobile battery
- Keep draw calls under 200 for the particle field (use `InstancedMesh`, not individual `Mesh` per particle)
- Lazy-load all R3F components via `next/dynamic` with `{ ssr: false }` — Three.js cannot run server-side
- Test mobile GPU on real devices; Chrome DevTools GPU simulation is unreliable
- Use `devicePixelRatio` capping: `Math.min(window.devicePixelRatio, 2)` on the renderer

**Warning signs:**
- WebGL context loss message in console
- `THREE.WebGLRenderer: Context Lost` error
- Memory profiler shows steady heap growth across navigations
- Scene renders fine on desktop but black/frozen on Safari iOS

**Phase:** Homepage hero and BridgeSense case study implementation. Must apply before any Three.js scene is shipped.

---

### Pitfall 3: Tailwind v4 — CSS-First Config Breaks Assumed v3 Patterns

**What goes wrong:** Tailwind v4 is not a drop-in upgrade. The entire configuration model changed: `tailwind.config.js` is gone, all customisation lives in `globals.css` via `@theme {}`, and the PostCSS plugin changed from `tailwindcss` to `@tailwindcss/postcss`. Additionally, `bg-gradient-to-r` → `bg-linear-to-r` (breaking rename), border default changed from `gray-200` to `currentColor`, and the plugin API is incompatible with v3 plugins.

Since this project starts on v4, the risk is not migration debt — it is using v3 patterns from tutorials, documentation, or AI-generated code that will silently fail or produce wrong output.

**Why it happens:** The vast majority of Tailwind documentation, tutorials, Stack Overflow answers, and AI training data refers to v3. Copying any of it verbatim will introduce invisible bugs: classes that simply do nothing rather than throwing an error.

**Consequences:**
- Gradients that don't render (using `bg-gradient-to-r`)
- Custom colours not applied (using `theme()` function against `tailwind.config.js` that doesn't exist)
- shadcn/ui components render without backgrounds or with wrong colours if CSS variable mapping is wrong
- Dark-mode utilities broken if `@theme inline` bakes values at build time (OKLCH variables don't update on class toggle)

**Prevention:**
- Treat all v3 examples as invalid. Verify every class against Tailwind v4 docs before use.
- Custom colours via `@theme` in CSS only:
  ```css
  @theme {
    --color-indigo-deep: #3D2BFF;
    --color-canvas: #FAFAF7;
  }
  ```
- For shadcn/ui: use HSL variables in `:root` / `.dark`, then expose to Tailwind via `@theme inline`. Ensure variable names match exactly between `:root` and `@theme inline` mapping.
- Replace `tailwindcss-animate` with `tw-animate-css` (shadcn default for v4)
- Use `@tailwindcss/postcss` in PostCSS config, not the old `tailwindcss` plugin
- When adding typography for MDX prose, use `@tailwindcss/typography` — verify it has v4 compatibility before installing

**Warning signs:**
- Gradients not rendering
- shadcn components showing transparent backgrounds (reported Radix Select/Dropdown issue)
- Custom colours not applying
- Build warnings about unknown plugins

**Phase:** Project setup (Phase 0). Get the theme system right before writing a single component.

---

### Pitfall 4: shadcn/ui + Tailwind v4 — Transparent Component Bug and OKLCH Dark Mode Failure

**What goes wrong:** Two distinct bugs hit simultaneously after upgrade:

1. **Transparent Radix components:** Select dropdowns, context menus, popovers render as floating text with no background panel. Caused by CSS variable naming mismatch between `:root` definitions and `@theme inline` declarations.

2. **Dark mode that never switches:** Using `@theme inline` bakes OKLCH variable values at build time. When `.dark` class toggles, the underlying CSS variables change, but `@theme inline` utilities still reference hardcoded build-time values and don't update.

Since this project is Editorial Light (no dark mode toggle), pitfall 2 is lower risk — but any dark sections (case-study heroes) using shadcn components will hit it.

**Why it happens:** `@theme inline` is an optimisation for performance, but breaks the runtime CSS variable cascade. shadcn's v4 migration guide requires specific ordering of `:root` outside `@layer base`.

**Prevention:**
- Keep `:root` and `.dark` declarations outside `@layer base` (shadcn v4 requirement)
- In `@theme inline`, map exactly: `--color-background: hsl(var(--background))` — the `hsl()` wrapper goes in `:root`, not in `@theme inline`
- For dark cinematic sections (not dark mode toggle): use direct CSS custom properties on the section, not Tailwind dark utilities
- Validate shadcn components render correctly (background visible) before building on top of them
- Check the shadcn/ui Tailwind v4 changelog for component-by-component migration status before using any component

**Warning signs:**
- Dropdown appears but background is transparent
- Colours look correct in light sections but wrong in dark hero sections
- `bg-background` class not applying the correct colour

**Phase:** Project setup and component library integration (Phase 0–1).

---

### Pitfall 5: MDX + App Router — Wrong Library Choice Causes Architectural Rework

**What goes wrong:** Choosing `next-mdx-remote` when `@next/mdx` is the right fit (or vice versa) means fighting the framework for the rest of the project. As of 2025, `next-mdx-remote` has active maintenance concerns and documented RSC compatibility issues in 5.0.0 with Next.js 15.2+.

The critical constraint: **MDX Client Components cannot access React Context** in RSC mode. If any case-study MDX file imports an interactive component (diagram, code block with syntax highlighting), it must be a Client Component — but it cannot receive context from MDXProvider in RSC mode.

**Why it happens:** The RSC model fundamentally changes how MDX components are provided. The `MDXProvider` pattern from `@mdx-js/react` (v3 mental model) doesn't work in App Router RSC.

**Consequences:**
- Runtime errors: "Cannot read properties of undefined (reading 'mdxComponents')"
- Interactive components in MDX break silently
- Edge runtime errors if route inherits Edge config but needs Node.js for file system access
- `next-mdx-remote` 5.0.0 has confirmed bugs with Next.js 15.2+

**Prevention:**
- Use `@next/mdx` (not `next-mdx-remote`) for this project. Case studies are local MDX files in the repo, so dynamic remote loading is not needed. `@next/mdx` gets first-party maintenance from the Next.js team.
- Frontmatter: `@next/mdx` does not support frontmatter natively. Use `gray-matter` at build time to extract frontmatter from MDX files for listing pages (Portfolio index).
- Client components within MDX must be explicitly marked `'use client'` and imported into `mdx-components.tsx`
- Do NOT enable `mdxRs: true` (Rust-based experimental MDX compiler) — it breaks with some remark/rehype plugins and is not production-ready
- For Turbopack: remark/rehype plugins must be passed as strings, not function references

**Warning signs:**
- "Cannot use import statement outside module" in build logs
- MDX renders with no styling
- `runtime` errors on portfolio routes
- Syntax highlighting plugin not applying

**Phase:** Content infrastructure (Phase 1). Choose `@next/mdx` and validate the pattern with one case study before building all 11.

---

### Pitfall 6: `next/font` LCP Failure — Wrong Display Strategy or Missing Preload

**What goes wrong:** This project uses three self-hosted fonts: Fraunces (display, variable weight), Inter (body), JetBrains Mono (technical). If `display: 'swap'` is used without the Next.js automatic fallback metrics, font swap causes CLS. If `display: 'block'` is used, LCP is delayed while the browser waits for the font. If `preload: false` is set, fonts don't load until referenced in CSS — delaying LCP by 300–850ms on mobile.

The Lighthouse mobile performance target of 90+ means LCP must be under 2.0s. Self-hosted fonts via `next/font` are the right approach but require correct configuration.

**Why it happens:** `next/font`'s defaults are good but its fallback adjustment (`size-adjust`, `ascent-override`) only fires automatically for Google Fonts. For local fonts, these must be configured manually or the CLS mitigation doesn't apply.

**Consequences:**
- LCP 300–850ms worse on mobile than desktop (cable vs 4G difference)
- CLS from font metric mismatch between fallback and final font
- Lighthouse mobile score below 90 target purely from font loading
- JetBrains Mono (monospace) particularly prone to width-based layout shift in code blocks

**Prevention:**
- Use `display: 'swap'` for all three fonts with Next.js `adjustFontFallback: true` (automatic for Google Fonts; for local fonts, specify `fallback: ['system-ui']` and let Next.js calculate metrics)
- The hero headline (LCP candidate) uses Fraunces: ensure it has `fetchPriority="high"` if rendered as an `<h1>` with an image, or configure the font as preloaded
- Variable fonts reduce requests: Fraunces is available as a variable font (single file covers all weights) — use it to avoid multiple font file requests
- Test with WebPageTest on throttled 4G to verify LCP, not just local dev
- Inter subset to Latin: `subsets: ['latin']` reduces file size significantly

**Warning signs:**
- Lighthouse LCP on mobile 2.0–2.5s range
- PageSpeed reports render-blocking resources related to fonts
- Visual flash of system font before Fraunces loads in hero
- CLS score above 0.05

**Phase:** Design system / typography setup (Phase 0–1). Validate with a single page lighthouse run before building all pages.

---

### Pitfall 7: Framer Motion + GSAP on the Same Element

**What goes wrong:** Both libraries animate by writing directly to element styles. When Framer Motion manages `transform` on a card and GSAP also targets the same card's `transform` via ScrollTrigger (e.g., a parallax effect on hover-animated cards), they overwrite each other's values every frame. The result is jank or frozen animation.

**Why it happens:** They share no state and don't negotiate — both write imperatively to `element.style.transform`. The last writer wins each frame, producing flicker.

**Consequences:**
- Animations that stutter or freeze
- ScrollTrigger parallax breaks hover lift
- Hard to debug because both libraries succeed independently in isolation

**Prevention:**
- Strict domain separation: Framer Motion owns micro-interactions (hover lift, button states, number counters, filter FLIP). GSAP owns timeline and scroll-driven animations (hero text reveal, scroll-pinned architecture sections, parallax).
- Never target the same CSS property on the same element from both libraries
- For scroll-pinned sections: if the pinned element contains Framer Motion cards, animate the cards' `opacity` or `scale` with Framer (not `transform`) and let GSAP handle the section-level `y` parallax
- Rule of thumb: if GSAP has a ScrollTrigger on a parent, Framer Motion should not animate any `transform` property on that parent or its children

**Warning signs:**
- Card hover animation works in isolation but freezes on scroll
- ScrollTrigger parallax works without Framer Motion components but breaks when they're added
- `transform` values jumping erratically in DevTools Layers panel

**Phase:** Component animation implementation. Document the domain boundary in a comment at the top of each animated component.

---

## Moderate Pitfalls

---

### Pitfall 8: JSON-LD — Dev URLs in Production, Missing Required Fields, XSS Risk

**What goes wrong:** Three separate JSON-LD failure modes:

1. **URL mismatch:** `url` and `@id` fields hardcoded to `localhost:3000` in development, then shipped to production because `process.env.NEXT_PUBLIC_SITE_URL` was not set on Vercel. Google's Rich Results Test shows errors; no structured data is indexed.

2. **Missing required fields:** `Organization` schema missing `name` or `url`; `BreadcrumbList` missing `item` on each `ListItem`. Google silently ignores the schema — no rich results, no error in console.

3. **XSS via `dangerouslySetInnerHTML`:** JSON.stringify does not escape `</script>` sequences. Injecting case study titles containing `</script>` breaks the page.

**Prevention:**
- Use `NEXT_PUBLIC_SITE_URL` environment variable for all absolute URLs in schemas. Validate it is set in Vercel project settings.
- Use a typed JSON-LD library (`schema-dts` TypeScript types) to get compile-time validation of required fields
- Escape `<` characters in JSON-LD strings: replace with `\u003c` before injecting
- Validate with Google's Rich Results Test after each deploy, not just in dev

**Warning signs:**
- Rich Results Test shows "Invalid JSON-LD" warnings
- `@type: Organization` present but no rich results appear in Search Console after 2 weeks
- Build succeeds but JSON-LD script contains literal `localhost` in production

**Phase:** SEO implementation pass. Test against deployed preview URL, not `localhost`.

---

### Pitfall 9: Three.js SSR Error — `window is not defined` Crashes Build

**What goes wrong:** Three.js and React Three Fiber access `window`, `document`, and WebGL context during module initialisation. Importing them in a Server Component or without `ssr: false` causes the Next.js build to fail with `ReferenceError: window is not defined`.

**Prevention:**
- All R3F components: wrap with `dynamic(() => import('./SceneComponent'), { ssr: false })`
- The dynamic import path must be a string literal — template strings or variables break Next.js's bundle analysis
- Do not import `three` or `@react-three/fiber` in any file that is not inside a dynamic-imported Client Component

**Warning signs:**
- Build error: `ReferenceError: window is not defined`
- Works in dev (`next dev`) but fails in `next build`
- Canvas is blank with no console error (SSR rendered empty, client hydration didn't attach)

**Phase:** Any Three.js scene implementation. The SSR guard must be the first thing added.

---

### Pitfall 10: ScrollTrigger `pin-spacer` Invalidating CLS Score

**What goes wrong:** GSAP ScrollTrigger's `pin: true` option wraps the target element in a `<div class="pin-spacer">` with dynamically calculated height. If this height is set after layout (which it always is, because it depends on the viewport), it causes CLS. On slow connections or slow devices, the layout shift is visible and measurable.

React's reconciler also conflicts with pin-spacer: if siblings of a pinned element are conditionally added/removed (e.g., Framer Motion presence animations), React's DOM diffing can de-sync with ScrollTrigger's pinned wrapper.

**Prevention:**
- Reserve height for scroll-pinned sections with `min-height` in CSS before GSAP initialises
- Call `ScrollTrigger.refresh()` inside a `ResizeObserver` callback (not on every resize event — debounce to 150ms)
- Avoid conditionally mounting elements that are siblings of pinned elements
- For the architecture diagram scroll-pin sections: set a fixed explicit height in CSS that matches the pinned duration — do not rely on ScrollTrigger to determine height dynamically

**Warning signs:**
- CLS score above 0.05 in Lighthouse
- Architecture section layout jumps on initial page load
- pin-spacer has height `0` in DevTools after mount

**Phase:** GSAP scroll animation implementation. Validate CLS score before adding more pinned sections.

---

### Pitfall 11: Blur Placeholder Fails for Remote/Dynamic Images

**What goes wrong:** `placeholder="blur"` only works automatically with statically imported local images. For any image referenced by URL string (which case study images likely are if they come from a `/public` path with a dynamic filename), `blurDataURL` must be provided manually or the placeholder silently does nothing — showing a white flash instead of a blur.

**Prevention:**
- At build time, use `sharp` or `plaiceholder` to pre-generate `blurDataURL` strings for all case study images
- Store generated blur strings in the MDX frontmatter or a co-located TypeScript data file
- For hero images: use `loading="eager"` and `fetchPriority="high"` — blur placeholder is less critical here, speed is more important

**Warning signs:**
- White flash on image load for case study hero images
- `placeholder="blur"` prop present but no blur visible in production
- Lighthouse flags images without dimensions

**Phase:** Case study page implementation.

---

### Pitfall 12: `prefers-reduced-motion` Applied Inconsistently Across Animation Systems

**What goes wrong:** Three separate animation systems (GSAP ScrollTrigger, Framer Motion, Three.js render loop) must each independently respect `prefers-reduced-motion`. It is common to implement it in one system and forget the others:

- GSAP respects it → hero text reveal static, but Three.js particle field still animates
- Framer Motion `reducedMotion: "user"` enabled → micro-interactions static, but ScrollTrigger parallax still fires
- No system respects it → WCAG 2.1 AA failure (criterion 2.3.3 for motion)

The Lighthouse accessibility target is 100. Any missing `prefers-reduced-motion` support will be flagged.

**Prevention:**
- GSAP: use `gsap.matchMedia()` — define all ScrollTrigger animations inside a `"(prefers-reduced-motion: no-preference)"` media query block. Provide a static alternative state inside `"(prefers-reduced-motion: reduce)"`.
- Framer Motion: set `reducedMotion: "user"` on the `<MotionConfig>` provider wrapping the app in `layout.tsx`. This automatically disables transitions app-wide when the OS preference is set.
- Three.js: check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` before starting the animation loop. If true, render one static frame and stop (`frameloop="never"` on Canvas).
- "Reduced motion" does not mean no motion — opacity fades and simple reveals are acceptable. Parallax, auto-scrolling, and looping animations are the targets.

**Warning signs:**
- `prefers-reduced-motion: reduce` OS setting active but page still animates heavily
- Lighthouse accessibility audit flags motion-related issues
- QA on macOS with "Reduce Motion" enabled in Accessibility settings shows full animation

**Phase:** Animation implementation. Implement alongside each animation system, not as a retrofit pass at the end.

---

### Pitfall 13: Large Static Site (17 Routes) — Build OOM with Experimental Concurrency

**What goes wrong:** Next.js 15 added experimental `staticGenerationMaxConcurrency` and `staticGenerationMinPagesPerWorker` options. Increasing these to speed up the 17-route build on a CI machine with limited RAM can cause out-of-memory kills, particularly if each page builds its Three.js dynamic imports (which webpack must analyse per-route).

The default concurrency is deliberately conservative. With MDX processing (remark/rehype pipeline) and dynamic OG image generation per route, memory pressure is real on standard CI runners.

**Prevention:**
- Do not touch experimental concurrency settings unless build time exceeds 10 minutes on CI
- Use `generateStaticParams` + `dynamicParams = false` for case study routes to ensure static generation without runtime overhead
- OG images: generate at build time using `opengraph-image.tsx` file convention (static) rather than a dynamic route, to avoid per-request generation overhead
- If build becomes slow: profile with `NEXT_TELEMETRY_DEBUG=1` to identify slow routes, not blind concurrency tuning

**Warning signs:**
- CI build exits with code 137 (OOM kill)
- `next build` hangs at specific route number
- Individual route build times above 30 seconds

**Phase:** Build and deployment setup. Monitor build time from the first complete multi-page build.

---

## Minor Pitfalls

---

### Pitfall 14: `generateMetadata` Blocks Streaming for Static Pages

Using `generateMetadata` (async function) on routes that have fully static metadata adds unnecessary async overhead — Next.js waits for it to resolve before streaming the page. Use the static `export const metadata` object for all pages except any that require truly dynamic metadata generation.

**Prevention:** Use `export const metadata = { ... }` for all 5 top-level pages and all 11 case studies (their metadata is known at build time). Reserve `generateMetadata` for genuinely dynamic routes.

---

### Pitfall 15: Fraunces as Non-Variable Font Loads Multiple Weights

Fraunces has a variable font file. Loading individual weight files (300, 400, 600) instead of the variable font results in multiple network requests and prevents the browser from using CSS `font-weight` ranges. Next.js `localFont` supports variable fonts natively.

**Prevention:** Reference the single Fraunces variable font file in `next/font/local` with `weight: '100 900'` range declaration.

---

### Pitfall 16: Tailwind `@tailwindcss/typography` v4 Compatibility

The `@tailwindcss/typography` plugin (for MDX `prose` classes) had breaking changes for v4. As of early 2026, verify the plugin version supports Tailwind v4's `@plugin` directive before installing.

**Prevention:** Check npm for `@tailwindcss/typography` v4 compatibility before adding. The v4 API uses `@plugin "@tailwindcss/typography"` in CSS rather than `plugins: [require('@tailwindcss/typography')]` in config.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Project scaffold + theme | Tailwind v4 config model (CSS-first) | Never reference `tailwind.config.js`; use `@theme {}` in CSS only |
| shadcn/ui component setup | Transparent Radix components; OKLCH variable mapping | Validate each shadcn component renders with a visible background before building on top |
| MDX content infrastructure | `@next/mdx` vs `next-mdx-remote` choice; frontmatter support | Use `@next/mdx`; extract frontmatter via `gray-matter` at build time |
| Font loading | LCP degradation, CLS from font swap | Use variable fonts; validate LCP on throttled mobile before building all pages |
| GSAP scroll animations | ScrollTrigger leaks across route changes; pin-spacer CLS | `useGSAP()` exclusively; call `ScrollTrigger.refresh()` after mount |
| Three.js particle hero | SSR crash; GPU memory leak; mobile OOM | `dynamic(() => ..., { ssr: false })`; dispose all GPU resources on unmount |
| Framer Motion + GSAP together | transform property conflicts | Enforce strict domain boundary: Framer = micro-interactions, GSAP = scroll/timelines |
| Case study pages (11 routes) | Blur placeholder silent failure; MDX RSC client boundary | Pre-generate `blurDataURL` at build time; mark interactive MDX components as `'use client'` |
| SEO / JSON-LD | Dev URLs in production; XSS; missing required fields | Use `NEXT_PUBLIC_SITE_URL`; `schema-dts` types; escape `<` in JSON strings |
| Accessibility audit | `prefers-reduced-motion` missing in one or more animation systems | Implement motion preference check in GSAP, Framer, and Three.js simultaneously |
| Build / CI | OOM from experimental concurrency settings | Keep defaults; use `dynamicParams = false` on case study routes |

---

## Sources

- GSAP React docs: https://gsap.com/resources/React/
- `@gsap/react` GitHub: https://github.com/greensock/react
- GSAP ScrollTrigger cleanup forum: https://gsap.com/community/forums/topic/35810-scrolltrigger-and-react-component-cycle-cleanup/
- R3F Scaling Performance: https://r3f.docs.pmnd.rs/advanced/scaling-performance
- Next.js MDX guide (official, verified 2026-04-23): https://nextjs.org/docs/app/guides/mdx
- next-mdx-remote RSC bug (Next.js 15.2 + v5): https://github.com/hashicorp/next-mdx-remote/issues/488
- shadcn/ui Tailwind v4 guide: https://ui.shadcn.com/docs/tailwind-v4
- Tailwind v4 upgrade guide (official): https://tailwindcss.com/docs/upgrade-guide
- Radix transparent component bug report: https://github.com/tailwindlabs/tailwindcss/discussions/17137
- Three.js memory leak forum: https://discourse.threejs.org/t/does-threejs-leak-memory/51054
- Three.js GPU memory (Medium): https://ritik-chopra28.medium.com/why-your-three-js-app-is-secretly-eating-gpu-memory-and-how-to-stop-it-fe8ca6b2f72d
- GSAP accessibility (prefers-reduced-motion): https://gsap.com/resources/a11y/
- Next.js GSAP SSR patterns: https://stackademic.com/blog/how-to-use-gsap-with-nextjs-14-and-ssr
- DebugBear font performance guide: https://www.debugbear.com/blog/website-font-performance
- Next.js generateMetadata gotcha: https://miguel.cab/b/generate-metadata
