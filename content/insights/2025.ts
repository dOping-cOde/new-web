import type { LocalArticle } from "./types";

export const articles2025: LocalArticle[] = [
  {
    slug: "typescript-patterns-that-pay-off",
    title: "TypeScript Patterns That Pay Off",
    category: "TypeScript",
    date: "2025-11-12",
    image: "/images/insights/typescript-patterns-that-pay-off.svg",
    imageAlt: "TypeScript patterns — discriminated unions and inference",
    excerpt:
      "TypeScript earns its keep when you lean into the type system instead of fighting it. A few patterns deliver most of the value.",
    metaKeyword: "typescript, types, discriminated unions, inference, generics",
    html: `
<p>TypeScript can feel like ceremony or like a safety net, and the difference is usually how you use it. Teams that treat types as paperwork end up annotating everything by hand and fighting the compiler. Teams that lean into the type system let it catch real mistakes before they ship. After enough projects, the same handful of patterns turn up as the ones that actually prevent bugs rather than just decorate the code.</p>

<h2>Model state with discriminated unions</h2>
<p>The single highest-leverage pattern is the discriminated union. Instead of an object with optional fields that may or may not be set together, model each valid state explicitly with a shared literal tag. The compiler then forces you to handle every case and narrows types automatically inside each branch, which removes a whole class of impossible-state bugs.</p>
<blockquote>If your component has a loading flag, an error field, and a data field all optional at once, you have eight possible shapes and only three are valid. A union of <strong>{ status: 'loading' }</strong> or <strong>{ status: 'error', error }</strong> or <strong>{ status: 'ok', data }</strong> makes the invalid ones unrepresentable.</blockquote>
<p>The payoff compounds in real code. When you switch on the tag, TypeScript narrows the object inside each branch so you can only touch fields that exist in that state. Add an exhaustive check and the compiler fails the build the day someone adds a new state and forgets to handle it.</p>

<h2>Infer, don't annotate</h2>
<p>Let TypeScript do the work. Derive types from a single source of truth rather than maintaining parallel declarations that drift apart. Hand-written types that mirror runtime values are a liability — the two inevitably diverge, and the type lies about reality.</p>
<ul>
<li>Use <strong>typeof</strong> and <strong>as const</strong> to derive types from runtime constants, so a config object and its type can never disagree.</li>
<li>Use utility types — <strong>Pick</strong>, <strong>Omit</strong>, <strong>ReturnType</strong>, <strong>Parameters</strong> — instead of re-typing shapes by hand.</li>
<li>Validate external data with a schema library and infer the type from the schema, so the runtime check and the static type stay in lockstep.</li>
</ul>
<p>The trade-off is that inferred types can be harder to read at a glance and sometimes surface in tooltips as sprawling expressions. The fix is to name the inferred type at the boundary where it is exported, so callers see a clean alias while the internals stay derived. You get one source of truth and a readable public surface at the same time.</p>

<h2>Keep generics shallow</h2>
<p>Generics are powerful, but deeply nested conditional types become unreadable and slow to compile. We have seen a single clever mapped type add seconds to every type-check and leave the next engineer baffled. Most application code needs only simple generics — a function that returns what it was given, a container parameterised by its contents.</p>
<p>Save the heavy type gymnastics for library boundaries where the investment pays for many callers, and prefer clarity everywhere else. A concrete type that is slightly repetitive almost always beats an abstract one nobody can follow. If you find yourself writing a comment to explain a type, that is a signal the type is doing too much.</p>

<h2>Make illegal states unrepresentable</h2>
<p>The thread running through all of these patterns is the same goal: shrink the set of values your code can hold down to only the valid ones. Branded types stop you mixing a user ID with an order ID. Readonly arrays stop accidental mutation. Template literal types constrain a string to a known shape. None of these are exotic, and each one moves a category of bug from runtime to compile time.</p>
<blockquote>Every invalid value your types permit is a bug waiting for the right input. Spend your effort making the bad states impossible to construct, not on catching them after the fact.</blockquote>

<p>None of this requires mastering the darkest corners of the type system. The patterns that pay off are the ordinary ones applied consistently: model states as unions, infer instead of annotate, keep generics shallow, and design types so the wrong value cannot exist. Do that, and TypeScript stops feeling like ceremony and starts feeling like the safety net it was meant to be.</p>
`,
  },
  {
    slug: "edge-rendering-compute-closer",
    title: "Edge Rendering: Moving Compute Closer to Users",
    category: "Architecture",
    date: "2025-09-03",
    image: "/images/insights/edge-rendering-compute-closer.svg",
    imageAlt: "Edge rendering — compute distributed near users",
    excerpt:
      "Running code at the edge cuts latency, but it changes the rules. Here's when the edge helps and when the origin is still the right call.",
    metaKeyword: "edge rendering, edge functions, latency, cdn, ssr",
    html: `
<p>Edge runtimes let you run code in data centres close to your users instead of in one central region. For the right workloads that is a dramatic latency win — a response that would have crossed an ocean now comes from a city nearby. For the wrong ones it is a source of subtle bugs, cold-start surprises, and queries that are somehow slower than before. The edge is a sharp tool, and knowing where it cuts cleanly matters more than the marketing promise of running everywhere.</p>

<h2>What the edge is good at</h2>
<p>The edge shines for small, fast, stateless work that benefits from being physically near the user. These are jobs measured in milliseconds that touch little or no data and need to happen before the real page work begins.</p>
<ul>
<li>Personalisation and A/B routing decided per-request before the page renders, so the user never sees a flash of the wrong variant.</li>
<li>Auth checks, redirects, and geolocation-based logic that gate or reshape a request cheaply.</li>
<li>Streaming HTML so the first bytes reach the browser sooner and the page starts painting earlier.</li>
</ul>
<p>A concrete example: a marketing site that shows different pricing by country. Deciding the country and rewriting the request at the edge takes a fraction of a millisecond and removes a full round trip to a distant origin. The user in Sydney and the user in London both get a fast, correct page because the decision happened next door to each of them.</p>

<h2>Where the origin still wins</h2>
<p>Edge runtimes are deliberately constrained: limited execution time, a reduced API surface, and no long-lived connections. Heavy database work, large dependencies, or anything that needs a persistent pool of connections usually belongs at a regional origin close to your data — not scattered across dozens of edge locations each opening its own connection.</p>
<blockquote>Putting compute at the edge while your database lives in one region can make things slower, not faster — every query now crosses the globe and back before the page can render.</blockquote>
<p>Connection management is the trap people fall into first. A traditional server keeps a warm pool of database connections; an edge function spun up in fifty locations cannot, and many serverless databases cap total connections hard. The result is a function that is geographically close to the user but pays a long, repeated tax to reach data that never moved. Latency is the sum of every hop, and the edge only removes one of them.</p>

<h2>A practical split</h2>
<p>Most apps land on a hybrid. The edge handles routing, auth, and the first byte; regional functions handle the data-heavy work. You decide per route rather than per application, because the right answer depends on what each route actually does.</p>
<ul>
<li>Static and lightly personalised pages: render or rewrite at the edge.</li>
<li>Data-intensive dashboards and writes: run in a region next to the database.</li>
<li>Mixed pages: stream a fast shell from the edge and hydrate the heavy parts from the origin.</li>
</ul>
<p>The discipline that keeps this honest is measurement. Synthetic benchmarks from one location tell you almost nothing; what matters is real latency from the regions your users actually live in, captured from real sessions. Move something to the edge, watch the numbers from those regions, and be willing to move it back if the data disagrees with the theory.</p>

<h2>Design for the constraints, not against them</h2>
<p>Code that runs well at the edge tends to be code that was already simple: few dependencies, no reliance on Node-specific APIs, and no assumption of a warm local cache or a persistent connection. Treat those constraints as a design brief rather than an obstacle, and the edge becomes a reliable layer instead of a place where things break in confusing ways at three in the morning.</p>

<p>The edge is not a place to deploy your whole application, and it was never meant to be. It is a fast, constrained layer best used for the slice of work that is small, stateless, and latency-sensitive. Put that slice at the edge, keep your data-heavy work near your data, decide per route, and let measured latency settle every argument. That is how the edge delivers the win it promises without the surprises.</p>
`,
  },
  {
    slug: "view-transitions-api",
    title: "The View Transitions API: Native Page Animations",
    category: "Motion",
    date: "2025-06-20",
    image: "/images/insights/view-transitions-api.svg",
    imageAlt: "View Transitions API — smooth animated navigation",
    excerpt:
      "The View Transitions API brings app-like animated navigation to the platform — far less code than the JavaScript libraries it replaces.",
    metaKeyword: "view transitions api, animation, spa, navigation, css",
    html: `
<p>For years, animating between pages or states meant reaching for a heavy JavaScript library to capture element positions, clone nodes into a new layer, measure the difference, and tween everything by hand. It worked, but it was fragile, expensive, and a lot of code to maintain. The View Transitions API moves that work into the browser, so smooth, app-like transitions become a few lines instead of a small library of their own.</p>

<h2>How it works</h2>
<p>You wrap a DOM update in a transition call, and the browser snapshots the old and new states, then cross-fades between them automatically. Under the hood it captures the before and after as images, places them in a generated tree of pseudo-elements, and animates between them on the compositor. You do not manage any of that machinery — you just describe the change and let the platform handle the choreography.</p>
<p>The real magic is shared-element transitions. Give an element a transition name and the browser will match the element with the same name across the two states and morph one into the other. A thumbnail in a grid can grow smoothly into the hero image on a detail page, because the browser understands they are the same conceptual element even though they are different nodes.</p>

<h2>From SPAs to MPAs</h2>
<p>The API started in single-page apps, where you control the DOM update directly and wrap it in the transition call yourself. That alone replaced a lot of bespoke animation code. But the more significant step is that it now extends to multi-page navigations too, so even classic server-rendered sites can have animated transitions between full page loads without becoming a single-page app at all.</p>
<ul>
<li>Single, declarative transition names instead of imperative animation code.</li>
<li>The browser handles snapshotting and compositing on the GPU, keeping the main thread free.</li>
<li>Fully customisable with plain CSS — duration, easing, and keyframes on the generated pseudo-elements.</li>
</ul>
<p>For multi-page sites the win is enormous in proportion to the effort. A traditional server-rendered site historically had no way to animate across a navigation, because the old document was simply thrown away. Now an opt-in lets the browser hold the old page, render the new one, and transition between them — app-like polish on an architecture that ships almost no JavaScript.</p>

<h2>Accessibility is not optional</h2>
<p>Because the API makes motion so easy to add, restraint becomes more important, not less. Animated navigation can be disorienting or nauseating for people sensitive to motion, and a cross-fade on every click quickly becomes tiresome for everyone.</p>
<blockquote>Always gate transitions behind prefers-reduced-motion. The API makes motion trivial, which makes thoughtful defaults your responsibility rather than the library's.</blockquote>
<p>In practice this means wrapping your transition styles in a media query so that users who have asked for reduced motion get an instant, un-animated update. It is a few lines of CSS and it is the difference between a feature that delights most users and one that actively hurts some of them.</p>

<h2>Progressive enhancement by design</h2>
<p>One of the best properties of the API is how gracefully it fails. Where it is not supported, the DOM update simply happens instantly — no animation, no error, no broken layout. That makes it a genuinely safe enhancement: you can adopt it today, ship it to everyone, and let the experience automatically improve as browser support grows. There is no polyfill to ship and no fallback path to build, because the absence of the feature is just the ordinary, working version of your site.</p>

<p>The View Transitions API represents the platform absorbing a job that lived in JavaScript libraries for a decade. It is less code, it runs on the GPU, it works across both single-page and multi-page architectures, and it degrades to nothing where unsupported. Reach for it for the transitions that genuinely aid orientation — navigations and shared elements — gate it behind reduced-motion, and you get app-like polish for a fraction of the cost it used to demand.</p>
`,
  },
  {
    slug: "container-queries-production-ready",
    title: "Container Queries Are Production-Ready",
    category: "CSS",
    date: "2025-04-08",
    image: "/images/insights/container-queries-production-ready.svg",
    imageAlt: "Container queries — components responding to their container",
    excerpt:
      "Media queries ask about the viewport. Container queries ask about the space a component actually has — and that's what truly reusable components need.",
    metaKeyword: "container queries, css, responsive design, components",
    html: `
<p>Responsive design has always had a blind spot. Media queries respond to the viewport, but components live inside containers of all sizes. A card in a narrow sidebar and the same card in a full-width grid need different layouts, even though the viewport is identical in both cases. For years we worked around this with extra props, layout-specific variants, and JavaScript that measured elements after they rendered. Container queries finally close that gap at the level where it belongs — in CSS.</p>

<h2>Components that adapt to their context</h2>
<p>By declaring an element a container, its children can style themselves based on that element's width rather than the screen's. The same card component can stack its contents vertically when it is narrow and lay them out side by side when it is wide — automatically, wherever it is placed, with no knowledge of the page around it.</p>
<blockquote>A truly reusable component shouldn't need to know where it's being used. Container queries let it adapt to whatever space it is given, the same way a well-written function adapts to its arguments.</blockquote>
<p>Consider a media object — an image beside a block of text. At a comfortable width you want them side by side; squeezed into a sidebar you want the image on top and the text below. With media queries you had to guess the viewport sizes at which that component might be cramped, which is impossible because the component does not know where it will land. With a container query the rule reads naturally: when my container is narrower than this, stack; otherwise, sit side by side.</p>

<h2>Why this matters for design systems</h2>
<p>In a component library, the viewport is almost always the wrong thing to react to, because the whole point of a library is that components get dropped into contexts the author never anticipated. Container queries make components genuinely portable — they respond to their immediate surroundings instead of a global assumption about screen size.</p>
<ul>
<li>Fewer layout-specific variants of the same component, because one component covers all the widths it might encounter.</li>
<li>Less coupling between a component and the page that hosts it, which makes both easier to change independently.</li>
<li>Container query units such as <strong>cqw</strong> and <strong>cqi</strong> for sizing type and spacing relative to the container rather than the screen.</li>
</ul>
<p>This is a real maintenance win. The old approach multiplied components: a compact card, a wide card, a sidebar card, each a near-duplicate of the others. Every bug fix had to be applied in several places, and they drifted apart over time. One container-aware component replaces the lot, and there is a single place to make a change.</p>

<h2>Mind the trade-offs</h2>
<p>Container queries are not entirely free. Declaring containment establishes a new context, and you cannot query an element based on its own size — you query an ancestor that has been marked as a container, so your markup usually needs a wrapping element to act as the query target. It is also worth being deliberate about which axis you contain, since size containment affects how the browser computes layout.</p>
<p>None of this is difficult, but it does mean container queries reward a little planning. Decide up front which element is the container and which children respond to it, and the rest follows cleanly. Treat the container as a deliberate part of the component's contract rather than something you bolt on later.</p>

<h2>Adopt incrementally</h2>
<p>Browser support is now broad enough across the major engines for production use, and the feature degrades sensibly where you provide reasonable defaults. There is no need for a big-bang migration. Start with the components that hurt most today — cards, media objects, navigation bars, anything you have already duplicated to handle different widths — and convert them from viewport breakpoints to container ones.</p>

<p>Container queries are the missing half of responsive design. Media queries describe the window; container queries describe the space a component actually occupies, which is what reusable components have always needed. They are production-ready, they reduce the number of components you maintain, and they let a library finally deliver on the promise of components that work anywhere. Begin with your most-duplicated layouts and let the simplification spread from there.</p>
`,
  },
  {
    slug: "passkeys-end-of-passwords",
    title: "Passkeys and the End of Passwords",
    category: "Security",
    date: "2025-02-17",
    image: "/images/insights/passkeys-end-of-passwords.svg",
    imageAlt: "Passkeys — passwordless authentication with device biometrics",
    excerpt:
      "Passkeys replace passwords with device-bound cryptographic keys. They're more secure, phishing-resistant, and genuinely nicer to use.",
    metaKeyword: "passkeys, webauthn, authentication, passwordless, security",
    html: `
<p>Passwords are the weakest link in most products. They are reused across dozens of sites, phished through convincing fake login pages, and leaked in breaches that turn one company's mistake into everyone's problem. Decades of advice about complexity rules and rotation have not fixed the underlying flaw: a shared secret that the user has to remember and the server has to store. Passkeys, built on the WebAuthn standard, replace that secret with a public and private key pair tied to the user's device and unlocked by biometrics or a PIN.</p>

<h2>Why they're more secure</h2>
<p>The private key never leaves the device and is never sent to your server. You store only the public key, which is useless to an attacker on its own, so a database breach exposes nothing worth stealing. There is no password hash to crack, no secret to reuse, and nothing for a leaked dump to compromise. The shape of the whole problem changes.</p>
<ul>
<li>Nothing to remember, reuse, or leak — the credential is a key, not a typed string.</li>
<li>Phishing-resistant by design, because the credential is cryptographically scoped to your origin.</li>
<li>Sign-in is a fingerprint or face scan, not a typed secret.</li>
</ul>
<p>The phishing resistance is hard to overstate. A passkey is bound to your site's exact origin, so it will not produce a valid signature on a look-alike domain. The fake login page that fools a human into typing a password has nothing to work with against a passkey — the browser refuses to use the credential anywhere but the real site. An entire category of attack stops functioning.</p>

<h2>The user experience</h2>
<p>Security improvements usually cost convenience, but passkeys move both in the same direction. They sync across a user's devices through their platform keychain, so setting one up on a phone makes it available on a laptop too. For most people, signing in becomes a single tap or glance — faster than typing a password and far less error-prone than recalling one.</p>
<blockquote>Treat passkeys as an upgrade path, not a hard cutover. Offer them alongside existing logins and let users opt in at their own pace rather than forcing a migration.</blockquote>
<p>The friction that slowed early adoption was around recovery and shared devices. What happens if someone loses their keychain, or signs in from a machine that is not theirs? The standard now handles these cases — cross-device sign-in lets a nearby phone authenticate a session on a borrowed computer, and platform keychains back up keys so a lost phone does not mean a lost account.</p>

<h2>Adding them to your app</h2>
<p>Implementing WebAuthn directly is fiddly. The ceremony involves generating a challenge, handling the browser's credential APIs, verifying signatures, and managing the registration and authentication flows carefully. Most teams should not write this by hand.</p>
<ul>
<li>Use a maintained library or an identity provider that wraps the WebAuthn ceremony for you.</li>
<li>Offer passkeys as an option first, and keep an existing login method as a fallback.</li>
<li>Let users register a passkey after they have signed in, when the moment is low-friction.</li>
</ul>
<p>Start small and additive. Add a passkey option to your account settings, keep your current login working, and measure how many users opt in. As people experience a tap-to-sign-in that never asks them to reset a forgotten password, adoption tends to climb on its own — the contrast with the old way sells itself.</p>

<h2>Where this is heading</h2>
<p>The momentum behind passkeys now comes from the platforms themselves. Operating systems, browsers, and password managers all support the standard and actively prompt users to create passkeys. That ecosystem support is what turns a good idea into an inevitability, because the infrastructure is already in your users' pockets and the prompts are already appearing without you doing anything.</p>

<p>Passwords solved a real problem badly and have been a liability ever since. Passkeys replace the shared secret with device-bound cryptography that is more secure, phishing-resistant, and genuinely pleasant to use. You do not need to rip out your existing login to benefit — offer passkeys alongside it, lean on a library for the hard parts, and let adoption build. The end of passwords will not arrive in a single cutover, but it is clearly underway.</p>
`,
  },
];
