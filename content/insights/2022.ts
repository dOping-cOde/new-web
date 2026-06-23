import type { LocalArticle } from "./types";

export const articles2022: LocalArticle[] = [
  {
    slug: "react-server-components-first-look",
    title: "React Server Components: A First Look",
    category: "Architecture",
    date: "2022-11-22",
    image: "/images/insights/react-server-components-first-look.svg",
    imageAlt: "React Server Components rendering on the server",
    excerpt:
      "Server Components let parts of a React tree run only on the server, shipping zero JavaScript for them. It's a meaningful shift.",
    metaKeyword: "react server components, rsc, ssr, next.js, bundle size",
    html: `
<p>React Server Components are one of the most significant changes to the React model in years, and they are starting to arrive in real frameworks rather than living only in demos and conference talks. The core idea is deceptively simple: let some components render exclusively on the server, send their finished output to the browser, and never ship their code as JavaScript at all. That single shift reaches into bundle size, data access, and how we think about the boundary between server and client.</p>

<h2>Why it matters</h2>
<p>A huge fraction of most applications is presentational or data-driven. Article bodies, product descriptions, marketing copy, dashboards that only display numbers — none of this needs to be interactive in the browser. Yet today we ship all of it as client JavaScript anyway, because the component model historically gave us no other choice. Server Components change the default. The code that only renders markup can stay on the server, where it runs once, talks to your data directly, and sends nothing but HTML-like output to the client.</p>
<ul>
<li>Zero client JavaScript for non-interactive parts of the tree, which directly shrinks the bundle a user has to download and parse.</li>
<li>Direct access to server resources — a database, the filesystem, an internal service — without first building and maintaining a separate API layer.</li>
<li>Interactive pieces remain client components, composed together with server ones in the same tree.</li>
</ul>
<blockquote>The promise is the best of both worlds: the data access of server rendering with the composability of components.</blockquote>

<h2>How it differs from SSR</h2>
<p>It is tempting to file this under server-side rendering, but they solve different problems. Traditional SSR renders your components to an HTML string on the server, sends that down, and then hydrates the whole tree in the browser by re-running the same component code as JavaScript. You pay for the render twice and you ship every component to the client regardless. Server Components are not hydrated at all, because they have no interactivity to attach. They render once, on the server, and their JavaScript simply never enters the bundle. SSR and Server Components can and do coexist, but they are not the same mechanism.</p>

<h2>The mental model takes practice</h2>
<p>The hardest part of adopting this is not the API; it is unlearning old habits. You begin to ask of every component whether it genuinely needs to run in the browser. If it only displays data, it can be a Server Component and reach straight into your data source. If it needs state, an effect, an event handler, or a browser-only API, it has to be a client component, and you mark it as such. The skill is keeping that boundary as far down the tree as possible, so the interactive leaf is small and most of the page stays on the server.</p>
<ul>
<li>Server Components can import and render client components, but not the reverse in the usual way.</li>
<li>Props that cross from server to client must be serializable, which rules out functions and class instances.</li>
<li>Secrets and server-only logic stay on the server, never leaking into the shipped bundle.</li>
</ul>

<h2>Early days, clear direction</h2>
<p>This is genuinely a first look. The model is new, the tooling is still maturing, and the documentation is thin in places. You will hit rough edges, and some patterns that feel natural in a fully client-rendered app simply do not translate yet. But the direction is unmistakable. Framework authors are building this into their core rather than treating it as an experiment on the side, and the performance argument — less JavaScript, faster pages, simpler data access — is strong enough that it is worth understanding now.</p>
<p>You do not need to rewrite anything today. The right move is to read the proposal carefully, try a small feature on a new project, and start training your instinct for where the server and client boundary should fall. That instinct is the part that takes time, and it is where the ecosystem is clearly heading.</p>
`,
  },
  {
    slug: "state-of-css-2022",
    title: "State of CSS 2022: Grid, Subgrid, and Layers",
    category: "CSS",
    date: "2022-06-07",
    image: "/images/insights/state-of-css-2022.svg",
    imageAlt: "Modern CSS layout — grid, subgrid, and cascade layers",
    excerpt:
      "CSS is having a renaissance. Grid, subgrid, cascade layers, and logical properties are quietly making layout code simpler.",
    metaKeyword: "css, grid, subgrid, cascade layers, logical properties",
    html: `
<p>CSS spent years as the part of the stack people tolerated rather than enjoyed — the place where layouts fought back and specificity battles were won by shouting <strong>!important</strong> louder than the last person. That has genuinely changed. A wave of powerful features has landed in browsers, and together they remove a great deal of the workarounds that defined front-end layout for a decade. This is a good moment to take stock of what is now possible.</p>

<h2>Grid grows up</h2>
<p>CSS Grid made two-dimensional layout a first-class citizen, letting you define rows and columns and place elements into them directly. The newer addition is subgrid, which extends that power into nested elements so a child can align to its parent's grid lines instead of starting its own independent grid. This sounds small, but it solves a real and common pain: a row of cards whose headers, bodies, and footers all line up across the row, even when their content differs in length. Before subgrid you reached for fixed heights or JavaScript measurement; now it falls out of a couple of declarations.</p>

<h2>Cascade layers bring order</h2>
<p>Specificity wars are the oldest frustration in CSS — the endless escalation of selectors, the IDs added only to win, the <strong>!important</strong> sprinkled in desperation. Cascade layers offer a real structural fix. They let you declare an explicit order of precedence for whole groups of styles, so a reset layer, a framework layer, and your own overrides each have a defined place in the cascade regardless of selector specificity.</p>
<ul>
<li>Subgrid for aligning nested content to a shared parent grid.</li>
<li>Cascade layers to tame specificity at scale and make override order predictable.</li>
<li>Logical properties for layouts that adapt automatically to writing direction.</li>
</ul>
<blockquote>Most of these features replace a workaround you've used so long you forgot it was a workaround.</blockquote>

<h2>Logical properties think globally</h2>
<p>If you have ever built a site that needs to support both left-to-right and right-to-left languages, you know the pain of mirroring every margin, padding, and float by hand. Logical properties describe layout in terms of flow — inline-start and inline-end, block-start and block-end — rather than physical left and right. Write your spacing once with logical properties and the layout flips correctly for a right-to-left language with no extra stylesheet. Even for a single-language site, the vocabulary nudges you toward more robust, direction-agnostic code.</p>

<h2>The practical payoff</h2>
<p>What ties these features together is that they let CSS do jobs that drifted into JavaScript or into preprocessor hacks. Less script, fewer wrapper divs, and simpler markup are the direct results.</p>
<ul>
<li>Layouts that once needed measurement scripts now resolve in pure CSS.</li>
<li>Style architecture that no longer depends on specificity tricks to stay sane.</li>
<li>Internationalisation handled by the cascade rather than by duplicate rules.</li>
</ul>

<h2>Worth relearning</h2>
<p>If your mental model of CSS is a few years old, it is worth a deliberate refresh. The honest caveat is browser support: subgrid in particular is still landing across engines, so check what your audience runs and plan sensible fallbacks rather than assuming universal availability. But the trajectory is clear, and the modern toolkit makes layout code shorter, more robust, and far less reliant on the brittle tricks of the past. Spend an afternoon rebuilding a familiar layout with grid, subgrid, and layers — the gap between the old approach and the new one is the best argument for adopting them.</p>
`,
  },
  {
    slug: "nextjs-13-app-directory",
    title: "Next.js 13 and the App Directory",
    category: "Framework",
    date: "2022-10-26",
    image: "/images/insights/nextjs-13-app-directory.svg",
    imageAlt: "Next.js App Directory routing and layouts",
    excerpt:
      "The App Directory rethinks routing, layouts, and data fetching around Server Components. It is a big shift worth understanding early.",
    metaKeyword: "next.js 13, app directory, server components, layouts, routing",
    html: `
<p>Next.js 13 introduced a new way to build applications: the App Directory, a routing model built from the ground up around React Server Components. It is not a minor feature flag or a convenience helper. It is a substantial rethink of how layouts, data fetching, and rendering fit together, and it changes the default mental model of the framework. For anyone who has spent years inside the Pages Router, it is worth approaching carefully and learning early, because the direction is clear.</p>

<h2>What is new</h2>
<p>The headline changes are structural. Routes become folders rather than files, and a special file inside each folder defines the page. Layouts now nest and persist across navigation, so a shared sidebar or header stays mounted while the content below it changes — no more re-rendering the whole shell on every route change. Components fetch their own data on the server by default, which removes the old split between a data-fetching function and the component that consumes its result. Loading and error states become files you simply create, and streaming lets parts of a page arrive as they become ready instead of waiting for the slowest piece.</p>
<ul>
<li>Nested, persistent layouts without prop-drilling shared data through every level.</li>
<li>Server Components by default, which means less client JavaScript shipped for non-interactive parts.</li>
<li>Co-located data fetching, loading, and error handling, all living next to the route they belong to.</li>
</ul>
<blockquote>This is beta-stage and a real mental shift. Reading data on the server inside a component takes some unlearning.</blockquote>

<h2>The layout model is the quiet win</h2>
<p>It is easy to focus on Server Components, but the nested layout system may be the change you feel first day to day. In the old model, sharing layout meant a single wrapper component and a fair amount of plumbing to keep state alive across navigation. In the App Directory, a layout file wraps everything beneath it in the folder tree, persists across navigations within that segment, and can itself fetch data. The result is less code and a structure that mirrors the URL, so where a piece of UI lives in the file system tells you exactly where it appears in the app.</p>

<h2>Data fetching moves to the server</h2>
<p>Fetching data inside a Server Component, directly, with no separate lifecycle function, is the part that takes the most unlearning. There is no client round-trip for that initial data and no API route to maintain purely to feed your own pages. You request what you need where you need it, and the framework handles caching and deduplication. The trade-off is that you must keep a clear eye on the server and client boundary: anything interactive still has to be a client component, and you mark it explicitly.</p>
<ul>
<li>Static content stays on the server and ships no JavaScript.</li>
<li>Interactive widgets become small client leaves inside otherwise-server pages.</li>
<li>Streaming lets the fast parts of a page show while slower data is still loading.</li>
</ul>

<h2>How to approach it</h2>
<p>You do not have to migrate everything at once. The old and new routers can coexist in the same project, which is the sane way to adopt something this large. Start a new, low-risk feature in the App Directory to learn the model in earnest, keep a careful eye on the rough edges while it stabilises out of beta, and migrate existing routes incrementally as you touch them. Treat the early period as a learning investment rather than a wholesale rewrite. The direction is clearly where the framework is going, and the teams that understand the model now will be the ones who adopt it smoothly when it matures.</p>
`,
  },
  {
    slug: "typescript-satisfies-operator",
    title: "The TypeScript satisfies Operator",
    category: "TypeScript",
    date: "2022-09-13",
    image: "/images/insights/typescript-satisfies-operator.svg",
    imageAlt: "TypeScript satisfies operator preserving literal types",
    excerpt:
      "satisfies lets you check a value against a type without widening it — keeping precise inference and validation at once.",
    metaKeyword: "typescript, satisfies operator, type inference, literal types",
    html: `
<p>TypeScript 4.9 added a small operator that solves a long-standing annoyance, and like the best language features it is the kind of thing you miss the moment you go without it. Until now you had to choose between two imperfect options: annotate a value with a type and lose its precise inferred shape, or skip the annotation and lose validation entirely. The <strong>satisfies</strong> operator finally gives you both at once, and it removes a daily papercut that most TypeScript developers had simply learned to live with.</p>

<h2>The problem it solves</h2>
<p>Picture a configuration object. You want TypeScript to check that it conforms to some expected shape, so you annotate it with a broad type. The moment you do, TypeScript forgets the specific keys and literal values you actually wrote. Autocomplete on the result becomes generic, narrowing on individual properties stops working, and the precise information you had is gone. So you try the other path and remove the annotation. Now the exact shape is preserved, but a typo in a key or a value of the wrong kind sails through unchecked, because nothing is validating against your intended type. You were forced to pick safety or precision, never both.</p>

<h2>How satisfies helps</h2>
<p>Writing a value followed by <strong>satisfies</strong> and a type checks the value against that type — catching mistakes exactly as an annotation would — while preserving the exact inferred type of what you actually wrote. The result is that downstream code still sees the precise keys and literal values, so autocomplete stays sharp and narrowing keeps working, and at the same time the compiler has verified that your object genuinely conforms to the expected contract. You get validation and inference together, which previously felt mutually exclusive.</p>
<ul>
<li>Validation against a type, like an annotation, so typos and wrong shapes are caught.</li>
<li>Precise inference preserved, like having no annotation at all.</li>
<li>Especially handy for config objects, route maps, theme tokens, and lookup tables.</li>
</ul>
<blockquote>It is a small feature that quietly removes a daily papercut — no more choosing between safety and precision.</blockquote>

<h2>Where it shines in practice</h2>
<p>The pattern pays off anywhere you have an object whose precise shape you want to keep using, but whose correctness you also want enforced. A theme tokens object is a perfect example: you want each colour key validated against an allowed set, but you also want the exact keys available for autocomplete when you reference them later. The same applies to a map of route names to handlers, a set of feature flags, or a table of options where each entry has a slightly different literal type. In all of these, <strong>satisfies</strong> lets you state the contract without flattening the detail.</p>
<ul>
<li>Theme and design token objects where keys must be valid but stay specific.</li>
<li>Route or command maps where each value is checked yet individually typed.</li>
<li>Discriminated configuration where literal tags drive later narrowing.</li>
</ul>

<h2>When to reach for it</h2>
<p>The rule of thumb is simple. If you want a value validated against a type but you also want to keep using its exact inferred shape afterward, use <strong>satisfies</strong>. If you genuinely want the value widened to the broader type — for instance, to treat it uniformly as that interface and nothing more — a plain annotation is still the right tool. Most of the time, on the configuration and lookup objects that fill real codebases, the precise version is what you actually wanted all along. It is a modest addition with an outsized effect on everyday ergonomics, and it is worth reaching for as soon as your toolchain supports it.</p>
`,
  },
  {
    slug: "web-components-2022",
    title: "Web Components in 2022",
    category: "Standards",
    date: "2022-07-19",
    image: "/images/insights/web-components-2022.svg",
    imageAlt: "Web components — custom elements and shadow DOM",
    excerpt:
      "Framework-agnostic components built on web standards have matured. For design systems that must outlive frameworks, they are compelling.",
    metaKeyword: "web components, custom elements, shadow dom, design systems",
    html: `
<p>Web Components — custom elements, shadow DOM, and templates — are the platform's own answer to reusable UI. They have had a famously slow start, dismissed by some as a solution waiting for a problem while frameworks raced ahead. But the tooling and browser support have quietly matured to the point where they are now a serious option, particularly for work that has to span more than one framework or outlive the framework it started in.</p>

<h2>The appeal</h2>
<p>The central promise is independence from any single framework. A component built on web standards works anywhere HTML works — inside a React app, on a plain server-rendered page, in another framework entirely, or years from now when today's favourite library has been replaced. The shadow DOM adds genuine style encapsulation, so a component's internal styles cannot be accidentally broken by the page around it, and the page's styles cannot bleed in and distort the component. For shared UI that travels widely, that isolation is valuable.</p>
<ul>
<li>Framework-agnostic by design: write one component, consume it everywhere.</li>
<li>Style encapsulation via the shadow DOM, so components resist outside interference.</li>
<li>Longevity, because they are part of the platform rather than a third-party library.</li>
</ul>
<blockquote>If your design system must serve teams on different frameworks, standards-based components avoid maintaining one library per framework.</blockquote>

<h2>The case for design systems</h2>
<p>This is where the argument is strongest. A large organisation often has teams on different stacks — one product on React, another on an older framework, a marketing site on plain HTML. Maintaining a separate component library for each is expensive and guarantees drift, where the button in one place slowly diverges from the button in another. A single set of standards-based components can serve all of them from one source of truth. The button is the button, everywhere, and you maintain it once. For a company whose UI needs to outlast individual framework choices, that durability is the whole point.</p>

<h2>The trade-offs are real</h2>
<p>It would be dishonest to pretend the path is smooth. The raw APIs are verbose, and hand-writing custom elements with all their lifecycle plumbing is tedious enough that most teams reach for a thin library to smooth the rough edges. Server-side rendering has historically been awkward, which matters for performance and SEO. Form integration — getting a custom element to participate in a native form the way a built-in input does — has long been a sore spot, though the platform is steadily addressing it.</p>
<ul>
<li>Verbose native APIs that usually warrant a lightweight helper library.</li>
<li>Server-side rendering support that is improving but still less mature than framework-native options.</li>
<li>Form participation and accessibility wiring that take deliberate effort to get right.</li>
</ul>

<h2>Choosing wisely</h2>
<p>The decision comes down to context. For a product that is firmly committed to one framework, a framework-native component is often simpler, better integrated, and easier to render on the server — there is little reason to take on the extra ceremony of web components. But for cross-cutting design systems that must serve multiple teams and survive framework churn, standards-based components increasingly make sense, and the gap with framework-native options keeps narrowing. They are no longer a curiosity. They are a credible, maturing tool, and worth a serious look when longevity and framework independence are the goals.</p>
`,
  },
  {
    slug: "pnpm-monorepo-renaissance",
    title: "pnpm and the Monorepo Renaissance",
    category: "Tooling",
    date: "2022-04-05",
    image: "/images/insights/pnpm-monorepo-renaissance.svg",
    imageAlt: "pnpm workspace managing a monorepo",
    excerpt:
      "Faster installs, a stricter node_modules, and first-class workspaces made pnpm the backbone of a new wave of monorepos.",
    metaKeyword: "pnpm, monorepo, workspaces, turborepo, package manager",
    html: `
<p>Managing many related packages in one repository used to mean wrestling with painfully slow installs and a tangled, unpredictable dependency tree. The monorepo was an idea people admired in theory and dreaded in practice. A new generation of tooling — with pnpm at the centre — has made monorepos pleasant again, and the result is a genuine renaissance in how teams structure multi-package projects.</p>

<h2>Why pnpm</h2>
<p>pnpm's headline trick is how it stores dependencies. Instead of copying every package into every project's node_modules, it keeps a single content-addressable store on disk and links packages in from there. The same version of a library is stored once and shared across every project that needs it, which makes installs fast and dramatically more space-efficient. On a machine with several projects sharing common dependencies, the disk savings alone are striking, and cold installs that used to take minutes drop to seconds.</p>
<ul>
<li>Fast, disk-efficient installs via a content-addressable store that deduplicates packages.</li>
<li>Strict resolution that catches phantom dependencies before they cause production surprises.</li>
<li>First-class workspaces purpose-built for multi-package repositories.</li>
</ul>

<h2>The strictness is a feature</h2>
<p>The other big difference is pnpm's strict node_modules layout, and it is worth dwelling on because it prevents a class of bug that other tools quietly allow. With a flat node_modules, code can import a package it never declared as a dependency, simply because some other package happened to install it nearby. Everything works on your machine and then breaks for someone else when the transitive tree shifts. pnpm refuses to expose undeclared dependencies, so if you import something you have not listed, you find out immediately rather than weeks later in a confusing bug report. It is the kind of strictness that feels annoying for an afternoon and saves you for years.</p>
<blockquote>The win of a monorepo is atomic changes across packages — fix a library and its consumers in a single commit.</blockquote>

<h2>The monorepo stack</h2>
<p>pnpm rarely works alone. Paired with task runners that cache and parallelise builds across packages, workspaces make it genuinely practical to keep multiple apps and shared libraries in a single repository with one install and coordinated builds. Change a shared component and its consumers in the same commit, run only the tasks affected by what changed, and reuse cached results for everything that did not. The combination turns the old monorepo headache into a smooth, fast workflow.</p>
<ul>
<li>One install at the repository root covers every package in the workspace.</li>
<li>Task runners cache and parallelise builds so unchanged packages are skipped.</li>
<li>Shared code lives alongside the apps that use it, kept in lockstep automatically.</li>
</ul>

<h2>Is it for everyone?</h2>
<p>Honestly, no — and that is fine. A small project with a single deployable is perfectly happy as one package, and adopting a workspace structure there would add ceremony without payoff. The case for a monorepo strengthens once you have a handful of apps sharing components, types, and utilities, at which point the alternative is juggling versions and publishing internal packages just to share code between your own projects. That version-juggling pain is exactly what a workspace-based monorepo with pnpm removes. If you have crossed that threshold, this is one of the most worthwhile pieces of tooling to invest in right now.</p>
`,
  },
  {
    slug: "serverless-at-the-edge",
    title: "Serverless at the Edge",
    category: "Architecture",
    date: "2022-02-15",
    image: "/images/insights/serverless-at-the-edge.svg",
    imageAlt: "Serverless functions running at edge locations",
    excerpt:
      "Edge functions run your code in dozens of locations worldwide, milliseconds from users. The model is powerful, with real constraints.",
    metaKeyword: "edge functions, serverless, cdn, latency, middleware",
    html: `
<p>Serverless functions removed the need to manage servers, letting you deploy a piece of logic and let the platform handle scaling and provisioning. Edge functions take the next step. Instead of running in one central region, your code runs in many locations spread across the globe, each one close to the users it serves. The effect is to shave latency off every request by moving the computation to where the people are, rather than making the people wait on a distant data centre.</p>

<h2>What it is good for</h2>
<p>The sweet spot for the edge is small, fast, stateless logic that runs before or alongside a page. Think of the decisions that need to happen quickly and near the user: checking whether a request is authenticated, redirecting based on the visitor's location, deciding which variant of a page to show, or rewriting a request before it reaches your origin. Done at the edge, these add almost nothing to response time, because they happen milliseconds from the user instead of after a round-trip across continents.</p>
<ul>
<li>Personalisation and routing decided near the user, before the page renders.</li>
<li>Authentication and access checks performed before any content is served.</li>
<li>Lightweight APIs that need low latency everywhere in the world at once.</li>
</ul>
<blockquote>Edge runtimes trade power for proximity — a constrained environment in exchange for being everywhere at once.</blockquote>

<h2>Mind the constraints</h2>
<p>That trade is the heart of the matter, and ignoring it is how teams get burned. Edge environments are deliberately limited. They cap execution time, so long-running work is out. They restrict the available APIs, so code that depends on a full server runtime may not run. And crucially, they have no persistent connections, which means the comfortable pattern of a long-lived pool of database connections does not exist at the edge. Each invocation is short, isolated, and far from your data.</p>

<h2>The database problem</h2>
<p>This last point deserves emphasis because it is the most common mistake. It is tempting to move everything to the edge for the latency win, but if your database still lives in one region, every query from an edge location now crosses the globe to reach it and crosses back. You have moved the compute closer to the user and, in doing so, moved it further from the data. The result can be slower than a plain regional function, not faster. Heavy database work belongs near the data, at a regional origin, not scattered across dozens of edge locations each opening its own distant connection.</p>
<ul>
<li>Keep data-intensive work at a regional origin close to where the data lives.</li>
<li>Reserve the edge for the fast path: routing, auth, redirects, and personalisation.</li>
<li>Measure real latency from real regions rather than assuming the edge is always faster.</li>
</ul>

<h2>A practical architecture</h2>
<p>The architectures that work best treat the edge as a thin, fast layer in front of a more capable origin. The edge handles the quick decisions — who is this, where are they, where should they go, what should the first byte be — and then either serves a cached response or hands the request to a regional function that does the data-heavy work close to the database. Decide on a per-route basis rather than moving everything wholesale, and let measured latency guide you. Used this way, edge functions are a genuinely powerful tool. Used as a blanket replacement for regional compute, they become a source of subtle, hard-to-diagnose slowness. Respect the constraints, and the proximity pays off.</p>
`,
  },
];
