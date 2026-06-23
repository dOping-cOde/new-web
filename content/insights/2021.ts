import type { LocalArticle } from "./types";

export const articles2021: LocalArticle[] = [
  {
    slug: "jamstack-in-practice",
    title: "Jamstack in Practice: Static-First Architecture",
    category: "Architecture",
    date: "2021-07-13",
    image: "/images/insights/jamstack-in-practice.svg",
    imageAlt: "Jamstack architecture — prebuilt pages on a CDN",
    excerpt:
      "Pre-render pages, serve them from a CDN, and add dynamic bits through APIs. The Jamstack model is fast, cheap, and secure.",
    metaKeyword: "jamstack, static site generation, cdn, ssg, architecture",
    html: `
<p>The Jamstack approach inverts the traditional request flow. Instead of building each page on the server for every visitor, you pre-render pages at build time, serve them as static files from a content delivery network, and layer in dynamic behaviour through APIs and JavaScript running in the browser. The name captures the three ingredients: JavaScript, APIs, and pre-built Markup. After a year of shipping projects this way, the pattern has stopped feeling like a trend and started feeling like a sensible default for a large class of sites.</p>

<h2>Why static-first wins</h2>
<p>A pre-built page sitting on a CDN is about as fast as the web gets. There is no application server to wait on, no database query to resolve, no template to render — just a file delivered from a location near the user. That single fact cascades into a set of advantages that are hard to match with a traditional server-rendered stack.</p>
<ul>
<li><strong>Performance</strong>: files are served from the edge with no per-request render, so the first byte arrives almost instantly wherever the visitor is.</li>
<li><strong>Security</strong>: there is no live origin server executing application code on every request, which removes a whole category of attack surface.</li>
<li><strong>Scale</strong>: a CDN absorbs traffic spikes effortlessly because serving a cached file costs almost nothing.</li>
<li><strong>Operations</strong>: with no server to keep patched and running, the maintenance burden shrinks and hosting bills often fall to a few dollars a month.</li>
</ul>

<h2>Handling the dynamic parts</h2>
<p>The obvious objection is that real products are not static. They have logins, search, comments, carts, and forms. The Jamstack answer is not to pretend otherwise but to push that dynamism to the edges. User-specific content, search, and form handling are served by APIs and serverless functions, called from the client after the static shell has loaded. The page skeleton is pre-built and instant; the personalised islands fill in as needed.</p>
<blockquote>Static where you can, dynamic where you must — the split is the whole point.</blockquote>
<p>In practice this means thinking carefully about what truly needs to be computed per request. A product listing can be pre-rendered nightly; the price the logged-in customer sees can be a small client-side fetch. A blog is entirely static; its comment thread is a third-party widget. Drawing that line well is the core skill of building this way.</p>

<h2>The trade-offs to weigh</h2>
<p>Static-first is not free of friction. Long build times are the most common complaint: a site with tens of thousands of pages can take many minutes to rebuild, and a one-word typo fix means regenerating everything. Content that changes constantly fits awkwardly into a model that assumes you rebuild on publish. And teams used to a single server now juggle a build pipeline, a CDN, and a scattering of functions.</p>
<p>None of these is fatal, but they are real. If your content updates every few seconds, or your editors expect changes to appear the instant they hit save, a pure build-time model will fight you. Be honest about your update frequency before committing.</p>

<h2>The evolution underway</h2>
<p>The ecosystem is already answering these pain points. Incremental builds rebuild only the pages that changed rather than the whole site, and hybrid rendering lets a single project mix pre-built pages with on-demand server rendering where freshness matters. These approaches blur the once-sharp line between static and dynamic, and that is healthy — the goal was never purity, it was speed.</p>
<p>What endures is the underlying insight: prebuild and serve from the edge by default, and reach for a live server only where you genuinely need one. Adopt that as your starting posture and you inherit fast, cheap, resilient sites almost for free. It remains one of the highest-leverage architectural decisions a small team can make.</p>
`,
  },
  {
    slug: "vite-dev-server",
    title: "Vite: Rethinking the Dev Server",
    category: "Tooling",
    date: "2021-11-30",
    image: "/images/insights/vite-dev-server.svg",
    imageAlt: "Vite serving modules over native ESM",
    excerpt:
      "Vite made slow dev startup a thing of the past by serving native modules and bundling only for production. The difference is dramatic.",
    metaKeyword: "vite, dev server, esbuild, hmr, bundler",
    html: `
<p>As front-end apps grew, the development experience quietly got worse. Every saved change asked the bundler to rebuild a large dependency graph before the browser could update, and the wait stretched from instant to a few seconds to an outright coffee break. Vite reframed the whole problem by leaning on native ES modules in the browser, and the result is a dev server that starts in milliseconds no matter how big the project gets.</p>

<h2>How it is so fast</h2>
<p>The traditional bundler treats development like a smaller version of production: assemble every module into bundles, then serve them. Vite refuses that premise. In development it serves your source files as native ES modules and transforms only the specific file the browser actually requests, exactly when it requests it. There is no upfront bundling step, so cold start does not grow with the size of your codebase.</p>
<ul>
<li>Near-instant cold start, even on large applications with thousands of modules.</li>
<li>Hot module replacement that stays snappy as the project grows, because it only ever touches the changed module.</li>
<li>Dependencies pre-bundled once with a fast native compiler, so third-party code does not slow the request path.</li>
<li>A sensible, optimised build for production using a mature bundler under the hood.</li>
</ul>
<blockquote>The old model rebuilt the world on every keystroke. Vite only does the work the browser actually asks for.</blockquote>

<h2>Why the feedback loop matters so much</h2>
<p>It is tempting to dismiss startup time as a one-off cost you pay each morning. The real win is the inner loop: the dozens of times an hour you save a file and glance at the browser. When that loop is instant, you stay in flow. When it takes three seconds, you context-switch, check a notification, and lose the thread. Multiply that across a whole team across a whole year and the difference is enormous, even though no single instance feels significant.</p>
<p>Fast feedback also changes behaviour for the better. When trying something costs nothing, you experiment more freely, refactor more willingly, and catch mistakes sooner because you see them immediately rather than batching changes to avoid the rebuild penalty.</p>

<h2>Where the native-module model has edges</h2>
<p>The approach is not entirely without cost. On first load, a large app may fire off many small module requests as the browser walks the dependency tree, which can feel briefly busy compared to one big bundle. Vite mitigates this by pre-bundling dependencies and caching aggressively, but it is worth understanding that development and production now use different mechanisms — what you run locally is not byte-for-byte what ships. In practice this rarely causes surprises, but you should still test the production build before release rather than trusting the dev server alone.</p>

<h2>Why it spread so quickly</h2>
<p>Tooling adoption usually moves slowly, yet Vite became a default under many frameworks in remarkably little time. The reason is simple: the benefit is felt within seconds of trying it, and it requires almost no configuration to get there. Developers do not need a benchmark to be convinced; they feel the difference the first time they restart the server and it is ready before they have finished blinking.</p>
<p>That immediacy is the lesson worth carrying forward. The best tools do not just perform better on paper — they change how it feels to work all day. A dev server that starts instantly and updates the moment you save makes the whole job more pleasant, and pleasant tools are the ones teams keep.</p>
`,
  },
  {
    slug: "state-beyond-redux",
    title: "State Management Beyond Redux",
    category: "React",
    date: "2021-09-21",
    image: "/images/insights/state-beyond-redux.svg",
    imageAlt: "Lightweight state stores beyond Redux",
    excerpt:
      "A wave of small state libraries challenged Redux's boilerplate. The lesson: most apps need far less global state than they think.",
    metaKeyword: "state management, redux, zustand, jotai, recoil, react query",
    html: `
<p>For years Redux was the reflexive answer to the question every growing React app eventually asks: how do we manage state? It brought genuine benefits — predictable updates, time-travel debugging, a single source of truth — but it also brought a reputation for boilerplate. Actions, action creators, reducers, and a tangle of wiring to connect components to the store. A new generation of libraries questioned whether all that ceremony was really necessary, and the answer, for most apps, turned out to be no.</p>

<h2>The new options</h2>
<p>The alternatives that emerged this year cluster into a few distinct philosophies, each attacking a different part of the problem.</p>
<ul>
<li><strong>Minimal global stores</strong> let you hold shared state with a fraction of the code — define a store, read from it with a hook, update it with a plain function. No reducers, no action constants.</li>
<li><strong>Atom-based libraries</strong> break state into small, independent pieces, so a component re-renders only when the specific atoms it reads actually change, rather than reacting to a single monolithic store.</li>
<li><strong>Data-fetching libraries</strong> took server state out of the global store entirely, handling caching, background refetching, and revalidation as a dedicated concern.</li>
</ul>

<h2>The realisation underneath</h2>
<p>The most important shift was not any single library but a change in how teams think about what they are storing. A great deal of what historically lived in Redux was never really client state at all — it was server data, fetched from an API and then manually cached, synced, and invalidated by hand inside the store. That manual synchronisation was the source of much of the complexity and many of the bugs.</p>
<blockquote>Much of what lived in Redux was server data in disguise. Move that to a data layer and the global store shrinks dramatically.</blockquote>
<p>Once you pull server data into a tool built for it, what remains in your global store is surprisingly little: a theme preference, the open or closed state of a sidebar, the currently authenticated user. That is a small, slow-changing set that almost any lightweight approach can handle comfortably.</p>

<h2>Choosing well</h2>
<p>The practical guidance that falls out of this is to categorise your state before reaching for any tool. Local UI state — a toggle, an input value — belongs in component state and nowhere else. Server data belongs in a data-fetching layer. Truly global, client-owned state, which is usually small, belongs in a minimal store or context. Match the tool to the kind of state and most of the apparent difficulty evaporates.</p>
<p>None of this means Redux was a mistake. For very large applications with complex, interdependent client state and a need for rich debugging, its structure still earns its keep. The point is that it became the default for problems that did not need it, and the new options let teams choose proportionally.</p>

<h2>The lasting lesson</h2>
<p>If there is one thing to take away, it is that the size of your state management problem is mostly a choice you make earlier, by deciding what counts as global state. Teams that assume everything must flow through one store inherit a large, complex problem. Teams that keep state local by default, lean on the URL and the server where they can, and reserve a global store for the genuinely shared remnants find the whole thing far more manageable. The library matters less than the discipline of putting each piece of state where it belongs.</p>
`,
  },
  {
    slug: "micro-frontends-module-federation",
    title: "Micro-Frontends with Module Federation",
    category: "Architecture",
    date: "2021-05-18",
    image: "/images/insights/micro-frontends-module-federation.svg",
    imageAlt: "Module federation composing micro-frontends",
    excerpt:
      "Module Federation lets separately-deployed apps share code at runtime, enabling micro-frontends. Powerful for big orgs, overkill for most.",
    metaKeyword: "micro-frontends, module federation, webpack, architecture",
    html: `
<p>As front-end codebases grew to the size of whole organisations, teams started asking whether one giant application behind a single deploy pipeline still made sense. When dozens of engineers across several teams all commit to the same repository and wait on the same release train, coordination becomes the bottleneck. Micro-frontends — and Module Federation, the technology that made them practical at runtime — emerged as one answer to that organisational strain.</p>

<h2>The idea</h2>
<p>Module Federation lets one application load code from another at runtime, even when the two were built and deployed entirely separately. A host application can pull in a module exposed by a remote application, sharing common dependencies rather than duplicating them. The upshot is that independent teams can own, build, and ship their slice of a larger experience on their own schedule, and the pieces compose into a single product in the user's browser.</p>
<ul>
<li>Independent deploys per team or business domain, with no shared release train.</li>
<li>Shared dependencies loaded once across the federation rather than bundled into every part.</li>
<li>A composed application assembled at runtime from separately-owned, separately-versioned parts.</li>
</ul>

<h2>The problem it actually solves</h2>
<p>It is worth being precise about what this buys you, because the technology is often adopted for the wrong reasons. Micro-frontends do not make your application faster, simpler, or smaller. What they do is decouple teams. If three teams can no longer ship without blocking each other, splitting the front-end so each owns and deploys its own piece removes that contention.</p>
<blockquote>Micro-frontends solve an organisational problem, not a technical one. If you do not have the org chart for it, you do not need it.</blockquote>
<p>That framing is the single most useful filter. When the pain you feel is coordination overhead between many independent teams, this architecture is a credible cure. When the pain is anything else, it is almost certainly the wrong tool.</p>

<h2>Proceed with caution</h2>
<p>The costs are substantial and easy to underestimate. Coordinating shared dependency versions across independently-built remotes is a perennial headache; a mismatch can break the host at runtime in ways that never show up in a single team's tests. Sharing state across boundaries is awkward, since each piece wants to be autonomous. End-to-end testing gets harder because the full application only exists once all the parts are assembled together. And the runtime composition adds operational complexity that a single bundle simply does not have.</p>
<p>For the large majority of products, a well-structured single application — clear module boundaries, good internal conventions, a healthy build — is simpler, faster, and easier to reason about. You get most of the organisational clarity from disciplined code structure without paying the runtime and coordination tax.</p>

<h2>When to reach for it</h2>
<p>Save micro-frontends for the situation they were designed for: many independent teams, each owning a distinct domain, who genuinely need to ship on their own cadence without blocking one another, working on an application large enough that a single codebase has become a coordination bottleneck. That is a real situation in big organisations, and there the architecture pays off handsomely. Outside it, reach for the monolith you can understand. The most sophisticated tool is rarely the right one until the problem actually demands it.</p>
`,
  },
  {
    slug: "hydration-cost-of-ssr",
    title: "Hydration: The Hidden Cost of SSR",
    category: "Performance",
    date: "2021-03-09",
    image: "/images/insights/hydration-cost-of-ssr.svg",
    imageAlt: "Hydration attaching interactivity to server-rendered HTML",
    excerpt:
      "Server rendering paints fast, but hydration can leave the page looking ready while it is not. Understanding it is key to real speed.",
    metaKeyword: "hydration, ssr, performance, interactivity, time to interactive",
    html: `
<p>Server-side rendering is one of the great performance wins of the modern front-end: the server sends fully-formed HTML, so the browser can paint meaningful content almost immediately instead of waiting for JavaScript to construct the page. But that fast paint hides a catch. The user cannot actually interact with the page until the JavaScript downloads and hydration runs — the process of re-attaching event handlers and reconstructing component state on top of the server-rendered markup. That gap between looking ready and being ready is one of the most common and most invisible performance traps on the web.</p>

<h2>Why it bites</h2>
<p>During hydration the page is a convincing illusion. The text is there, the buttons are drawn, the layout is complete — yet taps do nothing, inputs lag, and menus refuse to open. The user, reasonably, assumes the page is broken. On large applications, hydrating the entire component tree can occupy the main thread for a noticeable stretch, pushing real interactivity well past the moment the content first appeared.</p>
<ul>
<li><strong>Looks-ready-but-is-not</strong> is genuinely frustrating, and worse than a visibly loading page because it invites interaction that fails.</li>
<li><strong>Hydration cost scales with the app, not the screen</strong>: even off-screen and non-interactive components get hydrated, so the work grows with total code rather than visible content.</li>
<li><strong>It hides from the obvious metrics</strong>: a great first-paint score can sit right next to terrible interaction latency, so teams optimising for paint alone never see the problem.</li>
</ul>
<blockquote>A fast first paint is worthless if the page ignores taps for two seconds while it hydrates.</blockquote>

<h2>How to see it clearly</h2>
<p>The reason this trap persists is that the headline metrics reward the wrong thing. Time to first paint and content paint both look excellent under server rendering, because the markup arrives early. The cost lands in interactivity — how long before a tap is honoured — which lives in a different set of measurements entirely. If you only watch paint timings, hydration cost is genuinely invisible. Profile interaction readiness on a mid-range phone, not a developer laptop, and the gap becomes obvious.</p>

<h2>The ways out</h2>
<p>Every effective fix reduces how much hydration you do, because the cheapest hydration is the hydration you skip. The levers are straightforward to name even if they take work to apply.</p>
<ul>
<li>Ship less JavaScript overall — smaller bundles hydrate faster, full stop.</li>
<li>Hydrate interactive regions selectively rather than the whole tree at once.</li>
<li>Defer non-critical hydration until the browser is idle or the component scrolls into view.</li>
<li>Keep static content static, so it never needs hydrating in the first place.</li>
</ul>
<p>These ideas have names — partial hydration, progressive hydration, lazy hydration — but they share one principle: distinguish the parts of the page that genuinely need to come alive from the parts that are just pictures of text, and only pay for the former.</p>

<h2>Where this is heading</h2>
<p>The most interesting thing about hydration is that grappling with it is steering the whole ecosystem. The desire to hydrate less is precisely what motivates the islands architecture, which ships interactive components as isolated islands in a sea of static HTML, and the emerging server-component models that aim to send markup without the accompanying client code at all. Understanding hydration is therefore not just a tactical optimisation — it is the lens through which the next few years of front-end architecture come into focus.</p>
`,
  },
  {
    slug: "accessible-components-from-scratch",
    title: "Building Accessible Components from Scratch",
    category: "Accessibility",
    date: "2021-01-19",
    image: "/images/insights/accessible-components-from-scratch.svg",
    imageAlt: "Accessible custom components with keyboard and ARIA support",
    excerpt:
      "Custom dropdowns, modals, and tabs are where accessibility quietly breaks. Getting the keyboard and ARIA right is the hard 20%.",
    metaKeyword: "accessibility, aria, keyboard navigation, components, wai-aria",
    html: `
<p>Native HTML elements are accessible for free. A checkbox, a button, a select — each arrives with keyboard support, focus behaviour, and screen-reader semantics that browsers and assistive technology have agreed on for decades. The trouble starts the moment a product decides the native versions are not pretty or flexible enough and builds custom replacements: bespoke dropdowns, modals, tabs, and comboboxes that look exactly right and quietly drop everything the native elements gave away for nothing.</p>

<h2>The parts people miss</h2>
<p>A custom component is easy to get visually correct and surprisingly hard to get behaviourally correct. It looks finished in a screenshot, then falls apart the moment someone puts the mouse away. The work that is missing is precisely the work that does not show up in a design review: keyboard interaction, focus management, and the roles and states that let assistive technology describe what is happening.</p>
<ul>
<li><strong>Full keyboard operation</strong> — arrow keys to move between options, Enter to select, Escape to dismiss, and a tab order that makes sense.</li>
<li><strong>Focus management</strong> — trapping focus inside an open modal so it cannot escape to the page behind, and restoring it to the trigger element when the modal closes.</li>
<li><strong>Correct roles and states</strong> — so a screen reader announces a thing as a menu, knows which item is selected, and is told when something expands or collapses.</li>
</ul>
<blockquote>If a component only works with a mouse, it is not finished — it is a prototype.</blockquote>

<h2>Why it is genuinely hard</h2>
<p>It is tempting to think of accessibility as a checklist you run at the end, but the difficulty with custom widgets is structural. The expected keyboard behaviour for something like a combobox is intricate: which key moves focus, what happens at the end of the list, how typing filters options, how the selection is announced. These patterns have been worked out carefully and written down, but reproducing them faithfully from memory is the kind of task where small omissions are easy and almost invisible to a sighted developer testing with a mouse. The last twenty percent — the edge cases of focus and announcement — is where most of the real effort lives, and where most custom components fail.</p>

<h2>Test the way affected users do</h2>
<p>The single most effective habit is to stop testing only with the mouse. Unplug it, or simply set it aside, and operate your component with the keyboard alone. Can you reach every control? Open and close it? Make a selection? Then turn on a screen reader and listen to what it announces — you will quickly hear whether your component presents itself as a coherent control or as an undifferentiated pile of elements. Ten minutes of this on each component catches more than any automated scan, because automated tools can check that an attribute exists but not that the experience makes sense.</p>

<h2>Do not reinvent the wheel</h2>
<p>The encouraging news is that you rarely have to solve this from first principles. The accessibility patterns for common widgets are thoroughly documented, and a number of headless component libraries implement those patterns correctly while leaving the styling entirely to you. They give you the keyboard handling, focus management, and semantics as a foundation, and you build whatever visual design you like on top.</p>
<p>Before hand-rolling a combobox or a modal, reach for one of those foundations. Getting these patterns exactly right is genuinely difficult work that someone has already done with care, and standing on it lets you spend your effort where it actually differentiates the product rather than re-deriving keyboard handling that the platform almost gave you for free in the first place.</p>
`,
  },
];
