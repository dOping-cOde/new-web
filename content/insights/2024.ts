import type { LocalArticle } from "./types";

export const articles2024: LocalArticle[] = [
  {
    slug: "react-19-what-changes",
    title: "React 19: What Actually Changes for Your Codebase",
    category: "React",
    date: "2024-12-05",
    image: "/images/insights/react-19-what-changes.svg",
    imageAlt: "React 19 — actions, form hooks, and the use API",
    excerpt:
      "React 19 is less about new syntax and more about removing boilerplate. Here are the changes that affect day-to-day code.",
    metaKeyword: "react 19, actions, useoptimistic, use hook, server actions",
    html: `
<p>React 19 isn't a dramatic rewrite, and that is precisely what makes it worth paying attention to. Where some major versions force migrations and break APIs, this release mostly sands down rough edges that have annoyed developers for years. Most of the changes quietly delete boilerplate you have been writing by hand, which means the upgrade tends to make existing code shorter rather than forcing you to rewrite it. The headline themes are async actions, smarter form handling, a more flexible way to read resources, and a quieter set of ergonomic wins around refs and context.</p>

<h2>Actions and form state</h2>
<p>The biggest theme is first-class support for async state transitions. For years, submitting a form meant the same tedious choreography: set a loading flag, wrap the request in a try-catch, clear the flag in a finally block, and surface any error in a separate piece of state. React 19 introduces actions, which let the framework track pending status, errors, and optimistic updates on your behalf. The spinner-and-try-catch dance around submissions largely disappears.</p>
<ul>
<li>Pending and error state for async actions are handled by the framework, not by ad-hoc booleans you wire up yourself.</li>
<li>Optimistic UI updates get a dedicated hook, so you no longer hand-roll rollback logic when a request fails.</li>
<li>Form handling wires inputs to actions with far less plumbing, and forms can work before the JavaScript even finishes loading.</li>
</ul>
<p>The practical effect is that a form component that used to span fifty lines of state management can shrink to something you can read at a glance. That is fewer places for bugs to hide, especially the classic ones where a loading flag never gets reset on an error path.</p>

<h2>The use API and refs</h2>
<p>The new <strong>use</strong> function lets you read promises and context more flexibly, including conditionally, which the old hook rules forbade. You can call <strong>use</strong> inside a branch, which opens up patterns that were previously awkward to express. Refs also get simpler: you can pass <strong>ref</strong> as a normal prop, retiring much of the <strong>forwardRef</strong> ceremony that wrapped so many reusable components.</p>
<blockquote>None of this forces a migration. React 19 is largely additive, so you can adopt the new patterns where they remove pain and leave the rest of your codebase exactly as it is.</blockquote>
<p>There are trade-offs to weigh. Optimistic updates feel magical until a request fails in a surprising way, so you still need to think about what the user sees during the rollback. And the flexibility of conditional <strong>use</strong> calls means you have to keep a clear mental model of what suspends and when, or you can introduce loading states in places you did not intend.</p>

<h2>What to do about it</h2>
<p>The pragmatic path is undramatic: upgrade, run your full test suite, and only then go looking for the boilerplate the new APIs replace. Do not refactor everything at once. Instead, target the screens where the payoff is highest.</p>
<ul>
<li>Form-heavy screens, where actions collapse the most repetitive state code.</li>
<li>Components drowning in <strong>forwardRef</strong>, which can shed a layer of indirection.</li>
<li>Spots where you fetch data in effects and juggle loading flags by hand.</li>
</ul>
<p>Treat the migration as a gradual cleanup rather than a project. The value of React 19 is not that it teaches you a new framework; it is that it lets you delete code you never enjoyed writing. Pick one painful component, rewrite it with the new patterns, and let the rest follow as you touch it.</p>
`,
  },
  {
    slug: "astro-islands-architecture",
    title: "Astro and the Islands Architecture",
    category: "Architecture",
    date: "2024-10-14",
    image: "/images/insights/astro-islands-architecture.svg",
    imageAlt: "Islands architecture — interactive islands in static HTML",
    excerpt:
      "The islands model ships HTML by default and hydrates only the interactive bits. For content-heavy sites, it's a huge performance win.",
    metaKeyword: "astro, islands architecture, partial hydration, performance",
    html: `
<p>For the better part of a decade, the default way to build a website was to ship the entire page as a JavaScript application, even when most of it was static text that never changed after it loaded. The islands architecture flips that assumption on its head: render everything to HTML on the server, then hydrate only the genuinely interactive pieces. The result is a sea of static content dotted with small islands of interactivity, each carrying only the JavaScript it actually needs.</p>

<h2>Why it's fast</h2>
<p>A typical content site, whether it is a blog, a documentation portal, or a marketing site, is overwhelmingly static. Estimates vary, but it is common for ninety-five percent of such a page to be text, images, and layout that require no client-side logic at all. Sending and executing a full client framework to render that content is pure waste. With islands, a search box or an image carousel ships its own small bundle, and the rest of the page ships zero JavaScript to the browser.</p>
<blockquote>The fastest JavaScript is the JavaScript you never send. Islands make none the default and some the deliberate exception, rather than the other way around.</blockquote>
<p>This matters most on the metrics that affect real users on real devices. Less JavaScript means a faster time to interactive, less main-thread work, and better behaviour on mid-range phones where parsing and executing scripts is genuinely expensive. It also tends to help search ranking, since the page renders meaningful content immediately rather than waiting on a hydration pass.</p>

<h2>Bring your own framework</h2>
<p>One of the more pragmatic aspects of the model is that it does not lock you into a single UI library. Tools like Astro let each island be written in whatever framework suits it, so you can mix React, Svelte, and Vue on the same page without conflict. That makes incremental adoption realistic: you can keep an existing React component and drop it onto an otherwise static page without rewriting it.</p>
<ul>
<li>HTML-first output, with interactivity hydrated selectively rather than wholesale.</li>
<li>Per-island loading strategies, so you can hydrate on load, on idle, on visible, or never at all.</li>
<li>The freedom to mix frameworks, or to use none at all for purely static pages.</li>
</ul>
<p>The per-island loading control is more powerful than it first appears. An expensive widget below the fold can defer its hydration until the user scrolls it into view, which keeps the initial load lean without sacrificing the feature.</p>

<h2>When to reach for it</h2>
<p>Islands are not a universal answer, and pretending otherwise leads teams astray. The model is ideal for content-driven sites where performance and SEO carry the most weight: documentation, blogs, ecommerce listing pages, and marketing sites. There the static-by-default approach is a clear win and the interactive needs are modest.</p>
<p>Highly interactive application dashboards are a different story. A page that is mostly stateful widgets, with constant updates and complex client-side coordination, may be better served by a full single-page app or a server-component framework that is designed for that kind of interactivity. Forcing a dashboard into the islands model can leave you fighting the architecture, passing state awkwardly between islands that were meant to be independent.</p>
<p>The honest guidance is to pick the model that matches how interactive the page truly is. Audit your pages, be ruthless about what actually needs to run in the browser, and let that audit decide. For most content on the web, the answer is far less than we have been shipping, and islands give you a clean way to act on that insight.</p>
`,
  },
  {
    slug: "css-has-parent-selector",
    title: "CSS :has() — The Parent Selector We Waited For",
    category: "CSS",
    date: "2024-08-21",
    image: "/images/insights/css-has-parent-selector.svg",
    imageAlt: "CSS :has() selector styling parents based on children",
    excerpt:
      "The :has() selector lets you style an element based on what it contains — solving problems that used to require JavaScript.",
    metaKeyword: "css has selector, parent selector, relational selectors",
    html: `
<p>For most of CSS's history, the cascade flowed in one direction. You could style children based on their parents, descendants based on ancestors, but never the reverse. Wanting to style an element based on what it contained meant reaching for JavaScript, adding a class on the parent in response to some condition, and keeping that class in sync as the DOM changed. The <strong>:has()</strong> relational selector finally closes that gap, letting an element be styled based on its descendants and eliminating a whole category of scripting hacks.</p>

<h2>What it unlocks</h2>
<p>Once you can ask whether an element contains something, a surprising number of common interface needs become pure CSS. A card can style itself differently when it happens to contain an image. A form field can highlight its label when the input inside it is invalid. A layout can adjust when a particular optional child is present. None of these require a single line of script anymore.</p>
<ul>
<li>Style a container based on the state of a descendant, such as a checked checkbox or a focused input.</li>
<li>React to form validity without any JavaScript, by combining <strong>:has()</strong> with pseudo-classes like <strong>:invalid</strong>.</li>
<li>Combine it with other selectors to build genuinely conditional layouts that respond to their own content.</li>
</ul>
<p>Consider a classic example: a navigation bar that should add spacing only when it contains a search field. Previously that meant a class toggle managed in script. Now the parent simply reacts to the presence of the child, and the logic lives entirely in the stylesheet where it belongs.</p>
<blockquote>Many we need JavaScript for this interactions, such as toggles, validation styling, and conditional layouts, collapse down to a single selector once <strong>:has()</strong> is available.</blockquote>

<h2>Use it with care</h2>
<p>Power invites misuse, and <strong>:has()</strong> is powerful. It is easy to write selectors that are hard to read or that quietly match more than you intended, especially when you chain several relational conditions together. A selector that reaches deep into a subtree and reacts to several states at once can become a small mystery for the next person who reads it.</p>
<p>The discipline is the same as with any sharp tool. Keep selectors shallow and specific. Prefer to react to a direct relationship rather than an arbitrarily deep one. Comment the non-obvious cases. And remember that the selector still has to be evaluated by the browser, so extremely broad relational matches across large documents can have a cost, even if it is rarely the bottleneck in practice. Browser support is now solid across the major engines, so it is safe to use in production with sensible fallbacks for the rare older client.</p>

<h2>The bigger shift</h2>
<p>It is tempting to treat <strong>:has()</strong> as a single neat trick, but it is better understood as part of a trend. Together with container queries, cascade layers, and modern selectors, it represents CSS reclaiming work that drifted into JavaScript over the past decade.</p>
<p>Each feature the platform absorbs is one less reason to ship script for layout and styling concerns. The cumulative effect is leaner pages, less code to maintain, and fewer moving parts that can break. When styling logic lives in the stylesheet rather than in event handlers scattered through your components, it is easier to reason about and far less likely to fall out of sync. The parent selector we waited so long for turns out to be a small piece of a much larger and very welcome rebalancing.</p>
`,
  },
  {
    slug: "bun-vs-node-runtime",
    title: "Bun vs Node: Choosing a JavaScript Runtime",
    category: "Tooling",
    date: "2024-06-11",
    image: "/images/insights/bun-vs-node-runtime.svg",
    imageAlt: "Bun versus Node.js runtime comparison",
    excerpt:
      "Bun promises speed and an all-in-one toolchain; Node brings a decade of stability. Here's how we decide which to use.",
    metaKeyword: "bun, node.js, javascript runtime, tooling, package manager",
    html: `
<p>For years, Node was the only serious server-side JavaScript runtime, and the only real decisions were about frameworks layered on top of it. Bun changed that conversation. It arrived promising dramatic speed and an all-in-one toolchain, bundling a runtime, a bundler, a test runner, and a package manager into a single binary. The question for teams is no longer only which framework to use, but increasingly which runtime to build on in the first place.</p>

<h2>What Bun offers</h2>
<p>Bun's pitch is speed and convenience, and on both counts it delivers something real. Package installs are notably fast, often dramatically so compared with the traditional tooling. The built-in toolchain removes a pile of separate dependencies you would otherwise install and configure, and many workloads simply run quicker thanks to its tuned engine and native code. For scripts, command-line tools, and greenfield services, that combination is genuinely appealing.</p>
<ul>
<li>Very fast package installs and quick process startup, which adds up across a busy day of development.</li>
<li>A bundler, test runner, and package manager built directly into the runtime, reducing tooling sprawl.</li>
<li>Strong TypeScript and JSX support out of the box, so you can run TypeScript files without a separate build step.</li>
</ul>
<p>The convenience matters more than benchmarks suggest. Cutting the number of tools a new contributor has to install and understand lowers the barrier to getting a project running, and a single binary that does several jobs means fewer version mismatches to debug.</p>

<h2>Why Node still wins for many</h2>
<p>Against all that, Node brings a decade of production hardening that should not be underestimated. It has the broadest ecosystem compatibility of any runtime, first-class support from every hosting platform, and a long track record of running critical workloads at scale. When you are operating a service that handles real traffic and revenue, that maturity is often worth more than a faster benchmark.</p>
<p>Compatibility is the crux. A large application with a deep dependency tree may rely, somewhere in that tree, on a package that assumes specific Node behaviours or native modules. Even small differences in how a runtime implements an API can surface as subtle, hard-to-diagnose bugs in production. The closer a runtime tracks Node's behaviour, the safer the swap, but parity is a moving target.</p>
<blockquote>Benchmarks win arguments; compatibility ships products. Test your actual dependencies before betting a production service on a runtime swap.</blockquote>

<h2>Our rule of thumb</h2>
<p>The way we resolve the question in practice is to match the runtime to the risk. We reach for Bun on tooling, scripts, and new self-contained services where its speed pays off every day and where the dependency surface is small enough to verify quickly. The faster feedback loop is a real productivity gain in exactly those contexts.</p>
<p>For large existing applications, and anywhere ecosystem compatibility is non-negotiable, we stay on Node. The cost of an obscure incompatibility in a core service far outweighs the time saved on installs. The sensible approach is to try Bun on something low-stakes first, run your real test suite against it, and only consider a broader move once you have evidence it behaves.</p>
<p>The encouraging news is that the gap is closing from both ends. Bun keeps improving its Node compatibility, and Node has absorbed many of the ergonomic features that made Bun attractive, including faster tooling and built-in test running. Whichever you choose today, the choice is less of a lock-in than it once felt, and the competition is making both runtimes better.</p>
`,
  },
  {
    slug: "shipping-ai-features",
    title: "Shipping AI Features Without a PhD",
    category: "AI",
    date: "2024-04-02",
    image: "/images/insights/shipping-ai-features.svg",
    imageAlt: "Shipping AI features — practical LLM integration",
    excerpt:
      "You don't need to train models to add real AI value. The hard part is product design, grounding, and guardrails — not the maths.",
    metaKeyword: "ai features, llm, rag, product, prompt engineering",
    html: `
<p>The barrier to adding AI to a product has collapsed over the past year or two. You no longer need to train a model, assemble a labelled dataset, or hire a research team. Instead, you call a capable model over an API and pay per request. That shift moves the hard work away from machine learning and toward product engineering: the real challenge is designing features that are useful, grounded in your data, and safe when the model inevitably gets something wrong.</p>

<h2>Start with the job, not the model</h2>
<p>The teams that ship genuinely good AI features almost always start from a concrete user problem rather than from a desire to add AI. Summarise this long document, draft a first version of that reply, answer questions about our documentation: each of these is a sharp, bounded job. Starting from let us add AI tends to produce a vague chatbot that impresses in a demo and frustrates in daily use.</p>
<p>A tight scope makes everything downstream easier. It tells you what context the model needs, what good output looks like, how to measure success, and where the dangerous failure modes are. A feature you can describe in one sentence is one you can actually evaluate.</p>

<h2>Ground the model in your data</h2>
<p>A raw model knows a great deal about the world in general and nothing at all about your business. Out of the box it cannot tell a user your refund policy or summarise a ticket it has never seen. Retrieval-augmented generation closes that gap: you fetch the relevant context from your own content and feed it to the model alongside the question, so the answer comes from your data rather than the model's general training.</p>
<ul>
<li>Retrieve the relevant context first, then ask the model to answer strictly from it rather than from memory.</li>
<li>Show sources alongside answers, so users can verify claims and so a wrong answer is easy to spot.</li>
<li>Cache and evaluate outputs over time, and treat your prompts like code that lives under version control.</li>
</ul>
<blockquote>The model is the easy part. Grounding, guardrails, and graceful failure are where the engineering actually lives.</blockquote>
<p>Treating prompts as code is more than a tidy habit. Prompts encode product behaviour, and a small wording change can shift outputs in ways you will want to track, review, and roll back. Versioning them means you can tie a change in quality to a change you made, rather than guessing.</p>

<h2>Design for being wrong</h2>
<p>Models make mistakes, and they make them confidently and fluently, which is exactly what makes those mistakes dangerous. A good AI feature assumes error from the start rather than hoping to eliminate it. That means keeping a human in the loop for anything high-stakes, never letting the model take an irreversible action on its own.</p>
<p>It also means making correction cheap. Let users edit, reject, or undo what the model produces, and make that path obvious. And plan for the model being slow or unavailable: a feature that breaks the whole page when the API times out is worse than one that degrades to a sensible fallback. Build in clear loading states, sane timeouts, and a path that works even when the AI does not.</p>
<p>Get those product fundamentals right and you can ship real, valuable AI features without a research background. The maths is increasingly someone else's problem, delivered through an API. The judgement about scope, grounding, and failure is yours, and it is where the durable value is created.</p>
`,
  },
  {
    slug: "performance-budgets-teams-keep",
    title: "Web Performance Budgets That Teams Actually Keep",
    category: "Performance",
    date: "2024-02-19",
    image: "/images/insights/performance-budgets-teams-keep.svg",
    imageAlt: "Performance budgets enforced in continuous integration",
    excerpt:
      "Performance regresses one small commit at a time. A budget enforced in CI is what keeps a fast site fast.",
    metaKeyword: "performance budget, ci, lighthouse, web performance, regression",
    html: `
<p>Sites rarely get slow overnight. They get slow gradually, one reasonable-looking change at a time: a slightly heavier hero image here, a convenient new dependency there, a third-party script someone added for analytics. Each change seems harmless in isolation. Then one day the page feels sluggish, users complain, and nobody can point to the single commit that did it, because no single commit did. A performance budget is how you stop that slow drift before it becomes a rescue project.</p>

<h2>Make the budget concrete</h2>
<p>A budget is a hard, numeric limit on the things that actually affect speed. That includes total JavaScript size, image weight, the number of network requests, and explicit thresholds for the Core Web Vitals. The key word is numeric. Vague goals such as keep it fast feel good in a planning meeting but do not survive contact with a deadline. A number written into a configuration file does survive, because it can be checked automatically and argued about objectively.</p>
<ul>
<li>Cap the JavaScript bundle size for your key routes, since script is usually the most expensive resource to parse and run.</li>
<li>Set explicit targets for the loading, interactivity, and layout-stability metrics that define a good experience.</li>
<li>Limit third-party scripts deliberately, because they are frequently the largest hidden cost and the hardest to see.</li>
</ul>
<p>Third-party scripts deserve particular attention. They are easy to add, often pull in their own dependencies, and run code you do not control. A budget that ignores them misses one of the most common causes of regression.</p>

<h2>Enforce it in CI</h2>
<p>A budget that nobody checks is just a wish written down. The discipline only holds if it is automated, which means wiring the budget into continuous integration so that a pull request which blows past the limit fails the build. When that happens, the conversation about performance moves to exactly the right moment: the instant the change is proposed, when its author has full context and the fix is cheap.</p>
<blockquote>The best time to catch a 200KB dependency is in the pull request that adds it, not in a quarterly performance audit months later.</blockquote>
<p>Contrast that with the alternative. Without enforcement, the same regression is found weeks later by a frustrated user or a periodic audit, by which point the dependency is woven into several features and removing it is a project of its own. Catching it at the gate turns a future excavation into a thirty-second conversation on the pull request.</p>
<p>There is a balance to strike. A budget set too tight will fail builds constantly and train the team to ignore or bypass it, which is worse than having no budget at all. Set the limits with a little headroom, review them as the product genuinely grows, and treat a breach as a real signal rather than noise.</p>

<h2>Make it a team habit</h2>
<p>Budgets work best when they are shared and visible rather than owned by one performance-minded individual. Surface the numbers directly in pull requests so everyone sees the impact of their change. Celebrate when the numbers improve, the same way you would celebrate fixing a bug. And when a regression does slip through, treat it as a defect to be tracked and fixed, not as an unavoidable fact of life.</p>
<p>Handled this way, performance stops being a heroic cleanup that one person undertakes twice a year and becomes a property the whole team quietly maintains. The budget does the remembering so individuals do not have to, and the build does the enforcing so nobody has to play the role of the performance police. A fast site, kept fast, is the result of that small, automated, everyday discipline rather than any single dramatic optimisation.</p>
`,
  },
];
