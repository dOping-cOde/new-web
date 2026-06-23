import type { LocalArticle } from "./types";

export const articles2018: LocalArticle[] = [
  {
    slug: "hooks-are-coming",
    title: "Hooks Are Coming to React",
    category: "React",
    date: "2018-11-20",
    image: "/images/insights/hooks-are-coming.svg",
    imageAlt: "React hooks proposal for function components",
    excerpt:
      "React previewed Hooks, a way to use state and lifecycle in function components. It is the biggest shift to the model in years.",
    metaKeyword: "react hooks, proposal, function components, state",
    html: `
<p>React just previewed Hooks at React Conf, and the reaction from the community was immediate and loud. The proposal lets function components do what previously demanded a class — hold local state, run side effects, subscribe to context, and tap into more of React's machinery — without any of the class boilerplate that has quietly shaped how we structure components for years. It is the most significant change to the programming model since React introduced components themselves, and it is worth understanding now even though it is still only a proposal.</p>

<h2>The problems Hooks are trying to solve</h2>
<p>To appreciate Hooks, you have to remember the pain they target. The first is sharing stateful logic. For years we have reached for higher-order components and render props to reuse behaviour like subscriptions, form handling, or animation. Both patterns work, but they wrap components in other components, producing the deeply nested wrapper hell you see in React DevTools and a layer of indirection that makes code harder to follow.</p>
<p>The second problem is that related logic gets torn apart. In a class, a single concern — say, subscribing to a data source and unsubscribing on teardown — is split across componentDidMount and componentWillUnmount, while unrelated concerns sit jammed together in the same lifecycle method. The code is organised by when it runs, not by what it does.</p>
<ul>
<li>Reuse stateful logic across components without wrapper-component gymnastics.</li>
<li>Group code by concern rather than scattering it across lifecycle methods.</li>
<li>Write components as plain functions, state and effects included.</li>
<li>Avoid the confusion of <strong>this</strong> binding that trips up newcomers and veterans alike.</li>
</ul>

<h2>How the model actually works</h2>
<p>The core primitives are small. The <strong>useState</strong> hook gives a function component a piece of state and a setter. The <strong>useEffect</strong> hook lets it run side effects after render and clean them up, replacing the lifecycle-method dance with a single co-located function. And because hooks are just functions, you can extract a sequence of them into a custom hook — a plain function whose name starts with <em>use</em> — and share it freely between components.</p>
<blockquote>The breakthrough is composition. A custom hook is not a component and not a higher-order wrapper; it is ordinary JavaScript that happens to use other hooks, so reuse stops adding to the tree.</blockquote>
<p>There is one rule that makes this work: call hooks at the top level of your component, in the same order on every render, never inside conditions or loops. React relies on call order to keep each piece of state matched to the right hook. It feels unusual at first, but a lint rule can enforce it, and the constraint is what keeps the implementation simple.</p>

<h2>What this means for existing code</h2>
<p>Crucially, Hooks are opt-in and fully backwards compatible. Classes are not being deprecated, and there is no automated codemod marching through your codebase. You can adopt Hooks in new components while leaving everything else untouched, which makes this a gradual migration rather than a rewrite. That is a deliberate design choice, and it lowers the risk of trying the new model considerably.</p>

<h2>What to do right now</h2>
<p>Because Hooks are still a proposal, it is too early to lean on them for production work — the API could shift before it ships in a stable release. But the direction is clear enough that learning the model today is time well spent. Build a small side project with useState and useEffect, try extracting a custom hook, and get a feel for thinking in effects rather than lifecycles. When this stabilises, and it likely will soon, it is going to be how most React gets written.</p>
`,
  },
  {
    slug: "progressive-web-apps-mainstream",
    title: "Progressive Web Apps Go Mainstream",
    category: "PWA",
    date: "2018-09-11",
    image: "/images/insights/progressive-web-apps-mainstream.svg",
    imageAlt: "A progressive web app installed to the home screen",
    excerpt:
      "Service workers, offline support, and installability let the web behave like a native app. PWAs are finally a practical reality.",
    metaKeyword: "pwa, progressive web apps, service workers, offline, installable",
    html: `
<p>The dream of the web competing with native apps has been around for the better part of a decade, usually filed under wishful thinking. This year the pieces finally clicked into place. Progressive Web Apps — sites that work offline, install to the home screen, and send push notifications — have moved from impressive demos to a genuinely practical way to build and ship products, and the browser support is now broad enough to bet on.</p>

<h2>What actually makes a PWA</h2>
<p>At the heart of every PWA is the service worker: a script that runs separately from your page and sits between the app and the network. It can intercept requests, serve cached responses, and keep working when the connection drops or vanishes entirely. That single capability is what lets a web app load instantly on a repeat visit and stay usable on a train, in a lift, or on a patchy mobile signal.</p>
<p>Pair the service worker with a web app manifest — a small JSON file describing the app's name, icons, and display mode — and the browser will offer to install the site to the home screen. From there it launches in its own window, without browser chrome, looking and feeling much like a native app.</p>
<ul>
<li>Offline and flaky-network resilience through cached assets and data.</li>
<li>Install to the home screen with no app store and no review queue.</li>
<li>Re-engagement through push notifications, even when the app is closed.</li>
<li>HTTPS by default, since service workers only run on secure origins.</li>
</ul>

<h2>The strategy is caching, and caching is hard</h2>
<p>The power of a service worker is also its sharpest edge. You decide what to cache and when to update it, and getting that wrong means users see stale content with no obvious way to refresh. A sensible starting point is to cache the app shell — the HTML, CSS, and JavaScript that make up the interface — aggressively, while fetching dynamic data from the network with a cached fallback.</p>
<blockquote>A PWA gives you one codebase, the reach of the web, and much of the feel of native — without an app-store gatekeeper taking a cut or holding up your release.</blockquote>
<p>Treat the service worker lifecycle with respect. A worker that has cached the old version of your app will keep serving it until it is replaced, so plan an update strategy from the start rather than discovering the problem after launch.</p>

<h2>Where PWAs fit, and where they do not</h2>
<p>For content sites, commerce, news, and a wide swathe of productivity tools, a PWA captures most of the native experience at a fraction of the cost and with none of the duplicated effort of maintaining separate iOS and Android codebases. Several large publishers and retailers have reported real gains in engagement and conversion after shipping one.</p>
<p>That said, the web platform still has gaps. Deep hardware access, certain background capabilities, and the tightest integrations remain native territory, and notification support is uneven across platforms. For hardware-heavy or deeply system-integrated apps, native still wins.</p>

<h2>The takeaway</h2>
<p>For a large and growing class of products, the web is now a serious application platform rather than a poor substitute for one. If you have been treating native as the only path to an installable, offline-capable, re-engaging app, it is worth reconsidering. Start with a service worker and a manifest on an existing site, measure the difference, and build from there.</p>
`,
  },
  {
    slug: "graphql-querying-apis",
    title: "GraphQL: Querying APIs the Right Way",
    category: "API",
    date: "2018-06-19",
    image: "/images/insights/graphql-querying-apis.svg",
    imageAlt: "A GraphQL query requesting exactly the fields needed",
    excerpt:
      "GraphQL lets clients ask for exactly the data they need in one request. For complex front-ends, it solves real REST pain points.",
    metaKeyword: "graphql, api, rest, data fetching, schema",
    html: `
<p>REST has served the web faithfully for many years, and for plenty of APIs it remains the right choice. But as front-ends have grown richer and more interconnected, REST's rough edges have become harder to ignore: assembling a single screen often means several round-trips to different endpoints, and the responses come padded with fields the client never asked for. GraphQL proposes a different contract entirely — the client asks for exactly the data it needs, and the server returns exactly that.</p>

<h2>How GraphQL differs from REST</h2>
<p>Where REST exposes many fixed endpoints, each returning a predetermined shape, GraphQL exposes a single endpoint backed by a strongly typed schema. The client sends a query describing the precise structure it wants — which fields, which nested relationships, which arguments — and the server responds with a JSON object that mirrors that query. Nothing more is sent, and nothing is missing.</p>
<p>This solves two chronic REST frustrations at once. Over-fetching, where an endpoint hands back a large object when you needed three fields, disappears because you list only what you want. Under-fetching, where one screen forces you to call several endpoints and stitch the results together on the client, disappears because a single query can traverse relationships and pull related data in one request.</p>
<ul>
<li>Fetch exactly the fields you need — no over-fetching, no under-fetching.</li>
<li>Compose data from many underlying sources in a single round-trip.</li>
<li>A typed schema that doubles as live documentation and powers tooling.</li>
<li>Strong introspection, so editors and explorers can autocomplete queries.</li>
</ul>

<h2>The schema is the contract</h2>
<p>The typed schema is what makes GraphQL more than a query syntax. It is a formal, machine-readable agreement between client and server about what data exists and what shape it takes. That contract enables tooling that REST teams build by hand or do without: query validation before a request is ever sent, generated types for your front-end, and interactive explorers that document the API as they let you experiment with it.</p>
<blockquote>GraphQL shifts the power to shape responses from the server to the client — which is precisely what complex, fast-moving user interfaces want.</blockquote>

<h2>The trade-offs are real</h2>
<p>Flexibility is never free. Caching, which REST gets almost for nothing thanks to predictable URLs and HTTP semantics, becomes a deliberate engineering problem with GraphQL, usually solved with a normalised client cache. Because a single query can request deeply nested or expansive data, you also have to defend the server against expensive queries — through depth limits, cost analysis, or pagination — or risk a single request hammering your backend.</p>
<p>There is operational overhead too. Monitoring, rate limiting, and error handling all work differently when everything flows through one endpoint, and your team has to learn resolvers and schema design rather than route handlers.</p>

<h2>When to reach for it</h2>
<p>GraphQL is not a universal replacement for REST, and treating it as one leads to disappointment. For simple CRUD services or public APIs that benefit from HTTP caching, REST is often still the cleaner fit. But for data-rich applications with many related entities, multiple client platforms with different data needs, and rapidly evolving front-ends, GraphQL removes a remarkable amount of friction. Evaluate it against your actual needs, prototype a slice of your API, and let the complexity of your data decide.</p>
`,
  },
  {
    slug: "css-grid-production",
    title: "CSS Grid Is Production-Ready",
    category: "CSS",
    date: "2018-04-10",
    image: "/images/insights/css-grid-production.svg",
    imageAlt: "A two-dimensional layout built with CSS Grid",
    excerpt:
      "With support now across every major browser, CSS Grid makes true two-dimensional layout a native feature. The hacks can retire.",
    metaKeyword: "css grid, layout, responsive design, css",
    html: `
<p>The history of web layout reads like a long catalogue of workarounds. We laid out pages with tables, then with floats and clearfixes, then with absolute positioning, and most recently we stretched flexbox — a one-dimensional tool — to do jobs it was never designed for. Each approach was a clever response to the absence of a real layout system. With support now landed across every major browser, CSS Grid finally fills that gap, and the era of layout hacks can start to close for good.</p>

<h2>Genuine two-dimensional layout</h2>
<p>Grid's defining feature is that it controls rows and columns at the same time. You define a grid of tracks on a container, then place children into specific cells or let them flow automatically. Layouts that once demanded fixed widths, a thicket of nested wrapper divs, or JavaScript to measure and position elements now fall out of a handful of declarations. The intent of your layout lives in the CSS, where it belongs, instead of being implied by markup structure and arithmetic.</p>
<ul>
<li>Rows and columns controlled together, rather than faked with floats.</li>
<li>Complex, responsive layouts expressed with far less markup.</li>
<li>Content placed explicitly, independent of its order in the source.</li>
<li>Flexible track sizing with the fr unit, minmax, and repeat.</li>
</ul>

<h2>The features that make it powerful</h2>
<p>A few capabilities do most of the heavy lifting. The fr unit distributes leftover space proportionally, so columns can share whatever room remains without manual percentages. The minmax function lets a track flex between a floor and a ceiling, which is the backbone of responsive grids. And the combination of repeat with auto-fill or auto-fit produces fluid galleries that add and remove columns as the viewport changes — all without a single media query.</p>
<p>Named grid areas deserve a special mention. You can sketch a layout in CSS using a visual, text-based template that literally looks like the arrangement it produces, then rearrange the entire page for a different screen size by rewriting that small map. It is layout code you can read at a glance.</p>
<blockquote>Grid for the page, flexbox for the components — used together, the two finally give CSS a complete and honest layout toolkit.</blockquote>

<h2>Grid and flexbox are partners, not rivals</h2>
<p>It is tempting to frame this as Grid versus flexbox, but that misreads both. Flexbox excels at distributing items along a single axis — a navigation bar, a row of buttons, a toolbar. Grid excels at arranging content across two axes — the overall page structure, a card layout, a dashboard. The strongest layouts use Grid for the macro structure and flexbox inside the cells, each tool doing what it does best.</p>

<h2>Use it in production today</h2>
<p>Browser support is now broad enough to build real projects on Grid, and where you must support an older engine, sensible fallbacks degrade gracefully because non-supporting browsers simply ignore the grid declarations. It is genuinely worth relearning layout around this model. The payoff is simpler, more robust, more maintainable code — and the quiet satisfaction of retiring a decade of hacks you only half remember the reasons for.</p>
`,
  },
  {
    slug: "the-cost-of-javascript",
    title: "The Cost of JavaScript",
    category: "Performance",
    date: "2018-02-13",
    image: "/images/insights/the-cost-of-javascript.svg",
    imageAlt: "The processing cost of shipping large JavaScript bundles",
    excerpt:
      "Bytes are only half the story. JavaScript has to be parsed and executed too — and on average phones, that is where pages stall.",
    metaKeyword: "javascript performance, bundle size, parse, execution, mobile",
    html: `
<p>As single-page applications have grown more ambitious, so have their JavaScript bundles — and a sharper, more honest understanding of what all that script costs is long overdue. We have spent years obsessing over transfer size, compressing and minifying our way to smaller downloads. That work matters, but it is only half the story. The larger and more hidden cost is often the time a device spends parsing, compiling, and executing the JavaScript once it arrives.</p>

<h2>Bytes are not the same as CPU work</h2>
<p>Consider an image and an equivalent number of bytes of JavaScript. They are not remotely equal in cost. The image arrives, gets decoded, and is painted — relatively cheap, and largely off the main thread. The JavaScript, by contrast, must be parsed, compiled, and run on the main thread, the same thread responsible for responding to taps, scrolls, and clicks. While that work is happening, the page is frozen to the user, however quickly the bytes themselves came down the wire.</p>
<ul>
<li>Parse and execution cost, not just transfer size, drives perceived delay.</li>
<li>Mid-range mobile CPUs feel this far more acutely than a developer laptop.</li>
<li>Main-thread work blocks the page from responding to any input.</li>
<li>A page can finish downloading long before it becomes usable.</li>
</ul>

<h2>The mobile reality gap</h2>
<p>Here is the uncomfortable truth: most developers test on fast laptops and recent flagship phones, while most of the world browses on mid-range and budget devices with far weaker processors. The same bundle that parses and runs in a blink on a developer's machine can take several seconds on a typical phone, and during those seconds the interface is simply dead — visible perhaps, but unresponsive to touch.</p>
<blockquote>Test on a cheap phone, not your laptop. The gap between the two is exactly where your real users live, and it is wider than you think.</blockquote>
<p>This is why a page can score well on a desktop audit and still feel broken in someone's hand. The metric that matters is not when the content appears, but when the user can actually interact with it, and on weak hardware heavy JavaScript pushes that moment uncomfortably far out.</p>

<h2>What actually helps</h2>
<p>The single most effective lever is to ship less script. Code splitting lets each route load only the JavaScript it needs rather than forcing every user to download the entire application up front. Deferring non-critical work — analytics, third-party widgets, anything not needed for the first interaction — keeps the main thread free when it matters most. And leaning on the server to render markup means the browser has useful content to show before any client script has run at all.</p>
<p>Auditing dependencies is part of the discipline too. A single convenience library can quietly add hundreds of kilobytes of code that must be parsed on every visit. Weigh that cost deliberately, and prefer smaller, focused alternatives where you can.</p>

<h2>The principle to carry forward</h2>
<p>The cheapest JavaScript is the JavaScript you never send. Every byte you avoid shipping is a byte that never has to be downloaded on a slow connection, never has to be parsed by a tired CPU, and never blocks a user from doing what they came to do. As applications keep growing, that principle only becomes more important — make performance a constraint you design within, not a cleanup you attempt at the end.</p>
`,
  },
];
