import type { LocalArticle } from "./types";

export const articles2026: LocalArticle[] = [
  {
    slug: "core-web-vitals-field-guide",
    title: "Core Web Vitals in 2026: A Practical Field Guide",
    category: "Performance",
    date: "2026-06-10",
    image: "/images/insights/core-web-vitals.svg",
    imageAlt: "Core Web Vitals — LCP, INP, and CLS gauges on a dark dashboard",
    excerpt:
      "LCP, INP, and CLS decide whether your front-end feels fast. Here's how we hit the green thresholds on real projects — not just in the lab.",
    metaKeyword: "core web vitals, LCP, INP, CLS, web performance, frontend",
    html: `
<p>Performance is a feature, and Core Web Vitals are how the web measures it. Since INP replaced FID as a Core Web Vital, the three metrics that matter for the user experience are Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS). Hitting good on all three is less about clever tricks and more about a handful of disciplined defaults that you apply on every project from day one. The teams that struggle are usually the ones bolting performance work on at the end; the teams that pass are the ones who treat these three numbers as constraints, not aspirations.</p>

<h2>Largest Contentful Paint: ship the hero fast</h2>
<p>LCP measures how long it takes for the largest element in the viewport to render. On most marketing pages that is a hero image or a headline. The fixes are unglamorous but reliable: serve modern image formats, set explicit dimensions, preload the LCP asset, and keep render-blocking CSS and fonts small. The single biggest mistake we see is lazy-loading the hero image, which delays the very thing LCP is timing.</p>
<ul>
<li>Use a framework image component so images are sized, lazy-loaded only below the fold, and served as AVIF or WebP.</li>
<li>Preload the hero image and self-host fonts with <strong>font-display: swap</strong> to avoid invisible-text delays.</li>
<li>Inline critical CSS and defer the rest. A 2-second LCP budget evaporates fast on a mid-range phone on a flaky network.</li>
</ul>
<p>Test on a throttled connection and a real low-end device, not just your desktop. The gap between a developer laptop and a typical user phone is where most LCP regressions hide.</p>

<h2>Interaction to Next Paint: keep the main thread free</h2>
<p>INP captures the latency of every interaction across the page lifetime, then reports a high percentile. Slow interactions almost always trace back to a busy main thread: large JavaScript bundles, expensive re-renders, or synchronous work in event handlers. Unlike its predecessor, INP watches the whole session, so a single janky dropdown opened late in a visit can drag your score down.</p>
<blockquote>The cheapest INP win is shipping less JavaScript. The second cheapest is breaking up long tasks so the browser can respond between them.</blockquote>
<p>Code-split aggressively, hydrate only what needs interactivity, and move heavy computation off the main thread with web workers where it makes sense. Server Components help here: markup that never needs client JS simply does not ship any. When an interaction must do real work, yield to the browser between chunks so input stays responsive.</p>

<h2>Cumulative Layout Shift: reserve the space</h2>
<p>CLS punishes content that jumps around as the page loads. The cause is almost always un-reserved space: images without dimensions, ads and embeds that load late, or web fonts that reflow text. Reserve space for everything that loads asynchronously, and animate with transforms rather than properties that trigger layout. A late-arriving cookie banner that pushes the page down is a classic, avoidable offender.</p>

<h2>Measure the field, not just the lab</h2>
<p>Lighthouse runs in a controlled lab and is great for catching regressions in CI. But the score that affects your ranking and your users is field data: real sessions from real devices. Wire up a web-vitals library to send metrics to your analytics, and watch the 75th percentile. That is the number search engines use, and it is the number that tells you the truth about how your site behaves in the wild.</p>
<p>Treat Core Web Vitals as a continuous discipline rather than a one-off audit. Set budgets, watch field data weekly, and fix regressions while they are cheap. Do that, and fast stops being a heroic effort and becomes the natural state of your front-end.</p>
`,
  },
  {
    slug: "server-vs-client-components",
    title: "Server Components, Client Components: Drawing the Line",
    category: "Architecture",
    date: "2026-05-28",
    image: "/images/insights/server-client.svg",
    imageAlt: "Diagram contrasting server components and client components",
    excerpt:
      "The React Server Components model rewards a clear mental boundary. Here's the rule of thumb we use to decide what runs where.",
    metaKeyword: "react server components, next.js, client components, app router",
    html: `
<p>The App Router biggest shift is not a new API, it is a new default. Components render on the server unless you opt them into the client with <strong>use client</strong>. Used well, that default ships dramatically less JavaScript. Used carelessly, it produces confusing serialization errors and the client directive sprinkled everywhere. Getting the boundary right is the difference between an app that feels instant and one that drags a megabyte of script to render a paragraph of text.</p>

<h2>The default is server</h2>
<p>Server Components run only on the server. They can read from a database, call internal services, and use secrets, none of which ever reaches the browser. They also ship zero client JavaScript. For anything that is purely presentational or data-driven, that is exactly what you want. A product listing, an article body, a marketing section: all of these can render entirely on the server and arrive as plain HTML.</p>
<p>This matters beyond bundle size. Because a Server Component can talk to your data layer directly, you often delete an entire tier of API routes whose only job was to shuttle data to the client. The component fetches what it needs and renders it, full stop.</p>

<h2>Reach for the client only for interactivity</h2>
<p>You need a Client Component the moment you need state, effects, event handlers, or browser-only APIs. The trick is to push that boundary as far down the tree as possible, so the interactive part is a small island in a sea of static markup.</p>
<ul>
<li>A page can be a Server Component that fetches data and renders mostly static markup.</li>
<li>The one interactive widget, a filter bar, a carousel, a form, becomes a small Client Component leaf.</li>
<li>Pass data down as props; keep the heavy, static parts on the server.</li>
</ul>
<blockquote>Do not make a layout a Client Component just because one button inside it needs an onClick. Extract the button.</blockquote>
<p>A common anti-pattern is marking a top-level layout as a client file, which forces everything beneath it to be client-rendered too. The directive is contagious downward, so place it as deep as you can.</p>

<h2>Watch the serialization boundary</h2>
<p>Props passed from a Server Component to a Client Component must be serializable: no functions, no class instances, no Dates whose identity you rely on. When you hit a cannot be passed to a Client Component error, it is usually a signal to move the boundary, not to fight it. You can also pass Server Components as children to a Client Component, which lets an interactive wrapper hold static content without dragging that content onto the client.</p>

<h2>A simple decision rule</h2>
<p>Ask one question of every component: <em>does this need to run in the browser?</em> If the answer is no, leave it on the server. If yes, make it a small, focused client leaf and keep its parents on the server. That single discipline is most of what separates a fast App Router app from a slow one.</p>
<p>In practice, start every component as a Server Component and only reach for the client when a concrete need appears. This default-server posture keeps your JavaScript footprint small without requiring constant vigilance, and it makes the rare client boundaries genuinely meaningful rather than accidental. Over a whole codebase, that habit compounds into a measurably lighter, faster product.</p>
`,
  },
  {
    slug: "design-tokens-tailwind-v4",
    title: "Design Tokens That Scale: Theming with Tailwind v4",
    category: "Design Systems",
    date: "2026-05-15",
    image: "/images/insights/design-tokens.svg",
    imageAlt: "Color and spacing tokens mapped from CSS variables to utilities",
    excerpt:
      "A theme is only as maintainable as its tokens. Here's how we structure design tokens with CSS variables and Tailwind v4's @theme.",
    metaKeyword: "design tokens, tailwind v4, css variables, theming, design systems",
    html: `
<p>A design system lives or dies by its tokens: the named values for colour, spacing, type, and motion that every component references instead of hardcoding. Tailwind v4 CSS-first configuration makes tokens first-class, and it changes how we set up projects. Instead of a sprawling JavaScript config object, the tokens live in CSS where the browser, your animation code, and the utility generator can all read them.</p>

<h2>One source of truth, two consumers</h2>
<p>We define every token once as a CSS custom property, then expose it to Tailwind through an <strong>@theme</strong> block. The custom property is readable from JavaScript and animation libraries; the <strong>@theme</strong> mapping generates the utility classes. Same value, two ways to consume it, no drift. This is the crucial move: a colour you tween in a motion library and a colour you apply with a utility class are literally the same variable, so they can never fall out of sync.</p>
<ul>
<li><strong>Colour</strong> tokens: background, surface, border, text, and a single accent, named by role, not by hue.</li>
<li><strong>Spacing</strong> tokens on a consistent scale, so layouts stay rhythmic across every screen.</li>
<li><strong>Motion</strong> tokens: a small set of durations and easings shared across every transition.</li>
</ul>

<h2>Name by role, not by value</h2>
<p>A token called <strong>--color-accent</strong> can become yellow, blue, or anything else without a find-and-replace. A token called <strong>--color-yellow</strong> locks you in. Role-based naming is what lets a whole site re-theme from a dozen lines of CSS. The same logic applies to surfaces and text: name them <em>surface</em>, <em>surface-raised</em>, <em>text</em>, and <em>text-muted</em>, and the meaning survives any visual overhaul.</p>
<blockquote>If re-skinning your product means touching more than your token file, your tokens are not doing their job.</blockquote>

<h2>Theming becomes trivial</h2>
<p>Because components only ever reference roles, such as <strong>bg-surface</strong>, <strong>text-muted</strong>, and <strong>border</strong>, switching themes is a matter of swapping the underlying values. Light to dark, one brand to another, even per-tenant theming all reduce to changing the variables, not the components. A dark mode becomes a single block that overrides the custom properties under a data attribute or media query, and every component follows automatically with no extra work.</p>
<p>This is also where per-customer theming gets cheap. If you sell a white-label product, each tenant is just a set of variable overrides loaded at the root. The component code never changes, which means a new brand carries near-zero engineering cost.</p>

<h2>Mind the v4 migration details</h2>
<p>Tailwind v4 renamed a handful of utilities and changed defaults: shadows and radii shifted by one step, the default ring is now 1px, and arbitrary CSS-variable syntax uses parentheses. None are hard, but catching them up front saves a confusing afternoon. Pin the version, read the upgrade guide once, and codify the conventions in your tokens file so the whole team works from the same vocabulary.</p>
<p>Get the token layer right and everything above it gets simpler. Designers reason in roles, developers apply roles, and the system stays coherent as it grows. That coherence, more than any single utility, is what makes a design system scale.</p>
`,
  },
  {
    slug: "accessible-by-default",
    title: "Accessible by Default: Front-Ends to WCAG 2.2 AA",
    category: "Accessibility",
    date: "2026-04-30",
    image: "/images/insights/accessibility.svg",
    imageAlt: "Accessibility checklist with focus ring, contrast, and keyboard icons",
    excerpt:
      "Accessibility isn't a final audit — it's a set of defaults. Here are the habits that get a front-end to WCAG 2.2 AA without a scramble.",
    metaKeyword: "accessibility, wcag, a11y, frontend, inclusive design",
    html: `
<p>Most accessibility problems are not exotic. They are the same handful of issues, repeated: low contrast, missing focus styles, unlabeled controls, and keyboard traps. Treat the fixes as defaults rather than an end-of-project audit and WCAG 2.2 AA stops being a scramble. The teams that ship accessible products are not doing heroic remediation; they are making good choices early and consistently, so the work never piles up.</p>

<h2>Semantics first</h2>
<p>Use the right element for the job. A button is a button element, a link is an anchor, and headings descend in order. Native elements come with keyboard behaviour and screen-reader semantics for free, and re-implementing them with divs and ARIA is how bugs are born. The first rule of ARIA is to avoid ARIA when a native element will do, because the platform has already solved the hard parts for you.</p>
<p>Good semantics also pay off in maintainability. A page built from real headings, lists, and landmarks reads sensibly in a screen reader and in the document outline, which means the structure stays honest as the code changes.</p>

<h2>Visible focus, always</h2>
<p>Keyboard users need to see where they are. Never remove focus outlines without replacing them. We use <strong>:focus-visible</strong> so a clear ring appears for keyboard navigation without cluttering mouse interactions.</p>
<ul>
<li>Maintain a logical tab order that matches the visual layout.</li>
<li>Trap focus inside modals, and return it to the trigger on close.</li>
<li>Provide a skip to content link as the first focusable element.</li>
</ul>
<p>These three habits cover the bulk of keyboard accessibility. They cost little to implement and they are the difference between a usable interface and a frustrating one for anyone who does not use a mouse.</p>

<h2>Contrast is non-negotiable</h2>
<p>Body text needs a 4.5:1 contrast ratio; large text needs 3:1. On a dark theme this means muted greys still have to clear the bar against the background. Check it with a tool, and bake the passing values into your design tokens so nobody has to think about it again. A token that fails contrast should never make it into the palette in the first place.</p>
<blockquote>Respect prefers-reduced-motion. For users who set it, replace movement with instant transitions; your animation library can do this in one hook.</blockquote>

<h2>Test the way users do</h2>
<p>Automated checks catch perhaps half of all issues. The other half need a human: unplug the mouse and navigate with the keyboard, then turn on a screen reader and listen. Ten minutes of that on every feature catches more than any once-a-year audit, because it surfaces the awkward flows that a static scan can never see.</p>
<p>It also helps to test with a range of inputs and conditions: zoom the page to 200 percent and confirm nothing is cut off, tab through a form and check that every error is announced, and try the page in a high-contrast mode. Each of these takes a minute and catches issues that affect real people every day.</p>
<p>Accessibility is a property you build in, not a phase you bolt on. Make semantics, focus, contrast, and reduced motion part of your defaults, and add a short manual test to every feature. Do that consistently and meeting WCAG 2.2 AA becomes the quiet result of good engineering rather than a deadline-week emergency, and the product is better for everyone who uses it.</p>
`,
  },
  {
    slug: "state-management-2026",
    title: "State Management in 2026: When to Reach for What",
    category: "React",
    date: "2026-04-12",
    image: "/images/insights/state-management.svg",
    imageAlt: "Decision tree for choosing a state management approach",
    excerpt:
      "Server state, URL state, local state, global state — most apps need all four, and conflating them causes most state bugs.",
    metaKeyword: "state management, react, react query, zustand, url state",
    html: `
<p>What should we use for state? is the wrong question, because there is not one kind of state. Most of the tangles we untangle in code reviews come from treating four different things as if they were the same. Name them, server state, URL state, local state, and global state, and the right tool for each becomes obvious. The instinct to reach for one big store to hold everything is exactly what creates the bugs people then blame on the store.</p>

<h2>Server state is not client state</h2>
<p>Data that lives on the server, fetched, cached, and revalidated, has its own concerns: loading, errors, staleness, and refetching. A data-fetching library or the framework own caching handles those far better than stuffing server data into a global store and trying to keep it fresh by hand. The hard part of server state is not storing it, it is knowing when your copy is stale, and a purpose-built cache solves precisely that.</p>
<p>When you put server data in a manual store, you end up reimplementing caching, invalidation, and request deduplication badly. Let a query library own that layer and a whole class of bugs disappears.</p>

<h2>URL state is underused</h2>
<p>Filters, tabs, pagination, and search queries usually belong in the URL. Put them there and you get shareable links, working back buttons, and no extra state library, because the address bar <em>is</em> your store. A user who filters a product list and sends the link to a colleague should see the same view, and only URL state gives you that for free.</p>

<h2>Local state is the default</h2>
<p>Most state is local: a toggle, an input value, whether a menu is open. <strong>useState</strong> and <strong>useReducer</strong> handle the vast majority of it. Reach for context only when state is genuinely shared, and keep it small to avoid re-rendering the world.</p>
<ul>
<li><strong>Local UI state</strong> belongs in useState or useReducer.</li>
<li><strong>Shared, low-frequency state</strong> belongs in context, or a light store like Zustand.</li>
<li><strong>Server data</strong> belongs in a query or caching library.</li>
<li><strong>Navigation state</strong> belongs in the URL.</li>
</ul>
<blockquote>Most we need Redux moments are actually we put server data in the wrong place moments.</blockquote>

<h2>Choose late</h2>
<p>Start with local state and the URL. Introduce a store only when you feel real pain: prop drilling through many layers, or genuinely global state shared across distant parts of the tree. Choosing late means choosing with evidence, and it keeps the bundle lean. A premature global store tends to become a junk drawer that every feature reaches into, which makes the app harder to reason about over time.</p>
<p>It is worth revisiting these categories as an app grows, because state has a habit of migrating. A value that started as local UI state may need to be shared once two features depend on it, and a piece of data you kept in a store may turn out to belong on the server all along. Re-sorting periodically keeps the architecture honest.</p>
<p>The discipline here is not about picking the trendiest library; it is about matching each kind of state to the tool built for it. Sort your state into these four buckets first, and the question of which library to use mostly answers itself, which is exactly the calm, boring outcome you want from your state layer.</p>
`,
  },
  {
    slug: "micro-interactions-that-matter",
    title: "Micro-interactions That Earn Their Keep",
    category: "Motion",
    date: "2026-03-25",
    image: "/images/insights/micro-interactions.svg",
    imageAlt: "Subtle motion examples: hover lift, state transition, and feedback",
    excerpt:
      "Good motion is felt, not noticed. Here's how we use micro-interactions to make interfaces clearer — without the slideshow.",
    metaKeyword: "micro-interactions, animation, motion design, ux, frontend",
    html: `
<p>Animation is one of the easiest things to overdo. The goal of motion in an interface is not to impress, it is to communicate. A good micro-interaction answers a question the user was about to ask: did that work, where did this come from, what can I do here? When motion stops answering questions and starts performing, it becomes friction, and friction is the opposite of what good design is for.</p>

<h2>Motion with a job</h2>
<p>Every animation should earn its place by doing one of a few things:</p>
<ul>
<li><strong>Feedback</strong>, confirming a tap, a save, or a submission.</li>
<li><strong>Continuity</strong>, showing where a new element came from, so context is not lost.</li>
<li><strong>Affordance</strong>, a hover lift hinting that this is clickable.</li>
<li><strong>Status</strong>, a loading state that says we heard you, hold on.</li>
</ul>
<p>If an animation does none of these, it is decoration, and decoration is the first thing to cut. A useful test before adding any animation is to name the job it does. If you cannot, you probably do not need it.</p>

<h2>Fast, then out of the way</h2>
<p>Interface motion should be quick. Most transitions land between 150 and 300 milliseconds; anything longer starts to feel sluggish on repeat use. Ease-out curves feel responsive because they start fast and settle gently. Save longer, cinematic timing for once-per-page moments like a hero reveal, where the user sees it once rather than a hundred times a session.</p>
<p>Remember that an animation a designer sees a few times in review, a daily user will see thousands of times. What reads as elegant in a demo can become a tax on every interaction. When in doubt, shorten it.</p>

<blockquote>The best compliment a micro-interaction can get is none at all. Users should feel that the product is responsive, not notice that it is animated.</blockquote>

<h2>Performance and accessibility</h2>
<p>Animate only <strong>transform</strong> and <strong>opacity</strong>; they are cheap and do not trigger layout. Animating properties like width, height, or top forces the browser to recalculate layout on every frame, which is where janky motion comes from. And always honour <strong>prefers-reduced-motion</strong>: for users who have asked for less movement, swap transitions for instant state changes. Motion that ignores this setting can cause real discomfort for people with vestibular conditions, so it is a requirement, not a nicety.</p>

<h2>Restraint as a discipline</h2>
<p>The hardest part of motion design is knowing when to stop. A handful of purposeful micro-interactions will make an interface feel polished and alive; a dozen competing ones will make it feel cluttered and slow. Consistency matters as much as restraint: when similar actions across the product animate in similar ways, the motion becomes a language users learn without effort, and that shared vocabulary is far more valuable than any single flashy effect.</p>
<p>Treat motion as a layer of polish on top of an interface that already works perfectly without it. If you removed every animation and the product still made complete sense, you have built it on a solid foundation, and the motion you add will be the kind that earns its keep rather than the kind that gets in the way.</p>
`,
  },
];
