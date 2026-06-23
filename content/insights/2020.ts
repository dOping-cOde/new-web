import type { LocalArticle } from "./types";

export const articles2020: LocalArticle[] = [
  {
    slug: "headless-cms-decoupling-content",
    title: "Headless CMS: Decoupling Content from Code",
    category: "Architecture",
    date: "2020-09-29",
    image: "/images/insights/headless-cms-decoupling-content.svg",
    imageAlt: "Headless CMS delivering content through an API",
    excerpt:
      "A headless CMS serves content over an API, freeing your front-end to be anything. It's a cleaner split between editors and developers.",
    metaKeyword: "headless cms, content api, jamstack, decoupled, frontend",
    html: `
<p>For most of the web's history, a content management system did two jobs at once: it gave editors a place to write, and it rendered the pages those words appeared on. That bundling was convenient, but it quietly locked your entire site to the CMS's templating language, its plugin ecosystem, and the server stack it happened to run on. A headless CMS keeps the part editors love — a friendly editing interface — and throws away the part that constrained engineers. It serves content over an API and leaves the front-end entirely up to you.</p>

<h2>Why decouple content from presentation</h2>
<p>The core insight is that content is data, not markup. Once a blog post, a product description, or a landing page is delivered as structured data rather than pre-rendered HTML, that same content can power a website, a native mobile app, a digital signage screen, and a partner's integration — all from one source of truth. Developers build each surface with whatever tools suit it best, and editors keep working in a single familiar place.</p>
<ul>
<li>One content source feeding many front-ends and channels at once.</li>
<li>Freedom to choose your framework, language, and hosting without a CMS dictating them.</li>
<li>A clean separation of concerns: editing on one side, presentation on the other, neither blocking the other.</li>
</ul>
<p>That separation has a real organisational payoff. A redesign no longer means migrating content; it means pointing a new front-end at the same API. An editor publishing a typo fix never has to wait on a deployment, and an engineer refactoring the front-end never risks breaking the editorial workflow.</p>

<h2>A natural fit for static-first sites</h2>
<p>Headless content pairs beautifully with the pre-rendered architectures gaining ground this year. The pattern is straightforward: pull content from the API at build time, generate fast static pages, and let editors trigger a rebuild when they publish. Editors get autonomy and a live preview; visitors get pages served from a CDN with no server in the request path. It is a combination that is hard to beat on performance, cost, and security all at once.</p>
<blockquote>Content is an asset, not a side effect of your CMS's templates. Treat it as data and it can go anywhere you need it.</blockquote>

<h2>The trade-offs to weigh honestly</h2>
<p>Decoupling is not free. You take on the work of building the front-end that the old monolithic CMS used to hand you, and previewing draft content takes more deliberate plumbing than it did when editing and rendering lived together. Small brochure sites with a single channel may find a traditional CMS perfectly adequate. The headless model earns its keep when you have more than one surface, a team that wants modern tooling, or performance requirements a server-rendered monolith struggles to meet.</p>

<h2>Choosing the right system</h2>
<p>Options range from fully hosted services you configure through a dashboard to open-source systems you run on your own infrastructure. When comparing them, look past the feature checklist. Weigh the day-to-day editing experience, because editors live in it. Weigh the quality and shape of the API, because developers live in that. Above all, weigh how flexibly content can be modelled.</p>
<p>A thoughtful content model — clear types, sensible relationships, reusable blocks — is what makes everything downstream pleasant to build and maintain for years. A headless CMS is ultimately a bet that your content will outlive any single front-end, and structuring it well is how you make that bet pay off.</p>
`,
  },
  {
    slug: "svelte-compiler-first",
    title: "Svelte and the Compiler-First Framework",
    category: "Framework",
    date: "2020-12-08",
    image: "/images/insights/svelte-compiler-first.svg",
    imageAlt: "Svelte compiling components to vanilla JavaScript",
    excerpt:
      "Svelte moves the framework to build time, shipping tiny vanilla JavaScript. The compiler-first idea reshaped the conversation.",
    metaKeyword: "svelte, compiler, framework, bundle size, reactivity",
    html: `
<p>Almost every popular front-end framework works the same way under the hood: it ships a runtime library to the browser that reads your component code and figures out, while the app is running, what to render and when to update it. That runtime is the price of admission, downloaded and parsed on every visit. Svelte made a different bet, and this year that bet started to feel less like a curiosity and more like a glimpse of where the field is heading. Instead of interpreting components in the browser, Svelte does the heavy lifting at build time and compiles your components down to small, direct vanilla JavaScript with no framework runtime to download at all.</p>

<h2>Why a compiler changes the maths</h2>
<p>The most obvious win is bundle size. When there is no runtime to ship, the browser downloads and executes less code, which means faster first loads — especially on the mid-range phones and patchy connections that real users actually have. But the compile step buys more than a smaller download. Because Svelte sees your whole component ahead of time, it can generate update logic tailored precisely to that component, surgically touching only the DOM that a given state change affects rather than reconciling a tree at runtime.</p>
<ul>
<li>No framework runtime sitting in the bundle, so less to download and parse.</li>
<li>Reactivity built into the language itself rather than expressed through hooks or special wrapper functions.</li>
<li>Noticeably less boilerplate to achieve the same result, which keeps components readable.</li>
</ul>

<h2>The authoring experience</h2>
<p>Svelte's syntax is strikingly concise. Updating a variable is enough to update the screen, because reactivity is a property of the language rather than something you opt into with an API. Components look close to plain HTML, CSS, and JavaScript, which lowers the barrier for people coming from a vanilla background. There is simply less ceremony between intent and result, and that economy of expression is a large part of why developers who try it tend to enjoy it.</p>
<blockquote>The framework you do not ship is the fastest framework of all.</blockquote>

<h2>Where the trade-offs lie</h2>
<p>No approach is free of tension. A compiler-first framework means the magic happens at build time, so the code you write and the code that runs in the browser are not identical — debugging occasionally asks you to bridge that gap. The ecosystem, while growing quickly, is younger than the giants, so there are fewer ready-made libraries and a smaller hiring pool. For a large team betting a long-lived product on a framework, those are real considerations to weigh against the performance and ergonomics.</p>

<h2>The bigger influence</h2>
<p>Even teams that never adopt Svelte are feeling its effect, because it shifted the conversation. The idea that a framework can be mostly a compiler — front-loading work so the browser does dramatically less — has started to surface in the design of other tools and the way engineers reason about cost. It reframed a question the industry had largely stopped asking: how much of what we ship to users genuinely needs to run in their browser at all? That question, more than any single feature, is Svelte's lasting contribution, and it will outlast any particular version number.</p>
`,
  },
  {
    slug: "tailwind-utility-first-shift",
    title: "Tailwind and the Utility-First Shift",
    category: "CSS",
    date: "2020-07-21",
    image: "/images/insights/tailwind-utility-first-shift.svg",
    imageAlt: "Utility-first CSS classes composing a layout",
    excerpt:
      "Utility-first CSS divided opinion, then quietly won a lot of teams over. The reason is less about style and more about maintenance.",
    metaKeyword: "tailwind css, utility-first, css architecture, maintainability",
    html: `
<p>When developers first see Tailwind, the reaction is often visceral. Composing a design from dozens of small single-purpose classes strung across your markup looks like a step backwards — a return to the inline styles that years of best-practice advice told us to avoid. Plenty of experienced engineers dismissed it on sight. And then a strange thing happened: many of those same engineers tried it on a real project, lived with it for a few weeks, and quietly converted. The reason has very little to do with how the code looks and almost everything to do with how it ages.</p>

<h2>The problem utility-first actually addresses</h2>
<p>Traditional stylesheets have a well-known failure mode: they only ever grow. As a project matures, nobody is confident enough to delete a rule, because it is impossible to know for certain what still depends on it. So selectors accumulate, specificity wars escalate, and the CSS bundle bloats with styles that may or may not be used. The cost is paid slowly, in slower pages and a codebase people are afraid to touch. Utility-first flips this dynamic. Styles live directly with the markup that uses them, so when you delete a component, its styles go with it.</p>
<ul>
<li>Styling colocated with markup, so there is no hunting across separate files to understand an element.</li>
<li>A constrained design scale of spacing, colour, and type rather than an infinity of arbitrary one-off values.</li>
<li>Dead CSS removed automatically at build time, so the shipped stylesheet stays small no matter how the project grows.</li>
</ul>

<h2>Consistency as a side effect</h2>
<p>There is a subtler benefit hiding inside that constrained scale. When the easy thing to type is a value from the design system, consistency stops being a code-review battle and becomes the path of least resistance. Padding lands on the same rhythm, colours come from the same palette, and the interface looks coherent without anyone policing it. The tool nudges the whole team toward the same vocabulary, which matters far more on a group project than on a solo one.</p>
<blockquote>The promise is not prettier CSS. It is CSS that does not rot as the project grows.</blockquote>

<h2>The honest trade-off</h2>
<p>None of this comes free, and it is worth being clear-eyed about the cost. Markup gets noisier — a button can carry a dozen classes — and that density takes some getting used to. On a large application, leaning on raw utilities everywhere produces its own kind of mess, with the same long class strings copied from file to file. The discipline that makes utility-first scale is component extraction: the moment a pattern repeats, you wrap it once so the markup has a single source of truth, exactly as you would refactor any duplicated code.</p>

<h2>Why it is winning teams over</h2>
<p>For teams willing to adopt the conventions — define the scale, extract components, and lint for the rest — the payoff is a styling system that stays maintainable years into a project's life. That is precisely the point where traditional CSS architectures tend to buckle under their own accumulated weight. The utility-first shift is less an aesthetic preference than a maintenance strategy, and that is why it is spreading from hobby projects into serious production codebases this year.</p>
`,
  },
  {
    slug: "core-web-vitals-new-metrics",
    title: "Core Web Vitals: Google's New Speed Metrics",
    category: "Performance",
    date: "2020-05-12",
    image: "/images/insights/core-web-vitals-new-metrics.svg",
    imageAlt: "Core Web Vitals metrics introduced by Google",
    excerpt:
      "Google distilled web performance into three user-centric metrics. Defining what 'fast' means made it something teams could act on.",
    metaKeyword: "core web vitals, performance, lcp, fid, cls, google",
    html: `
<p>Web performance has always been important and almost always vague. Everyone agreed a site should be fast, but fast by what measure? Total page weight, time to first byte, a Lighthouse score, the gut feeling of whoever was testing on the office WiFi — each told a slightly different story, and none of them captured what a real person waiting on a real device actually experienced. This year Google distilled the whole sprawling topic into three user-centric metrics it calls Core Web Vitals, and in doing so turned an unbounded engineering problem into something teams can finally design and measure against.</p>

<h2>The three metrics, and why these three</h2>
<p>Each Core Web Vital captures a distinct part of how loading feels, deliberately chosen to reflect the user's perception rather than a server-side abstraction. The first measures how quickly the largest piece of meaningful content appears, because a blank screen is the most frustrating wait of all. The second measures how quickly the page responds when someone first tries to interact, because an interface that looks ready but ignores taps feels broken. The third measures how much the layout shifts around during load, because content that jumps under your finger is both annoying and a real source of mis-clicks.</p>
<ul>
<li>Loading: how soon the largest content element paints into view.</li>
<li>Interactivity: how quickly the page acknowledges the user's first input.</li>
<li>Visual stability: how much the content jumps around while the page is loading.</li>
</ul>
<p>What unites them is that they are all things a person notices. None requires you to understand the internals of a browser to grasp; each maps directly onto a moment of delight or frustration.</p>

<h2>Why naming it changed everything</h2>
<p>The deeper value here is not the measurement but the definition. For years performance was a goal without a yardstick, which meant it was nobody's clear responsibility and everybody's vague aspiration. By naming exactly three things and publishing thresholds for each, Google gave designers, developers, and managers a shared language and a checklist they could act on. Performance stopped being an art and became a tracked number with an owner.</p>
<blockquote>You cannot improve what you cannot name. Naming the three things that matter turned be fast into a checklist.</blockquote>

<h2>Acting on the numbers</h2>
<p>The practical guidance follows naturally from each metric. To improve loading, serve a well-optimised hero image and keep render-blocking resources lean. To improve interactivity, ship less JavaScript and avoid long tasks that tie up the main thread. To improve stability, reserve space for images, embeds, and anything that loads late so nothing reflows under the user. Crucially, measure these from the field — real sessions on real devices — not only in a controlled lab, because the lab rarely reflects the slow phone on a train.</p>

<h2>Why it stuck</h2>
<p>Plenty of performance initiatives have come and gone, but this one has staying power for two reasons. The metrics are genuinely user-centric and measurable in the field, so they resist gaming. And with Google signalling that these scores will eventually influence search ranking, performance has moved decisively from a nice-to-have that slips off the backlog to a tracked, owned figure that teams now plan around from the start of a project.</p>
`,
  },
  {
    slug: "building-remote-first",
    title: "Building Software in a Remote-First World",
    category: "Process",
    date: "2020-03-24",
    image: "/images/insights/building-remote-first.svg",
    imageAlt: "Distributed team collaborating asynchronously",
    excerpt:
      "Remote work went from perk to default overnight. The teams that thrived leaned on writing, async habits, and good tooling.",
    metaKeyword: "remote work, async, collaboration, engineering process",
    html: `
<p>For years, working remotely was a perk handed out sparingly — a day a week, a special arrangement, something you negotiated. This year that calculus changed almost overnight, and distributed teams went from the exception to the default for a great many engineering organisations. The transition has been bumpy, but a clear pattern is already emerging from it. The teams adapting best are not the ones with the most expensive cameras or the slickest video backgrounds. They are the ones that genuinely changed how they communicate and how they make decisions.</p>

<h2>Writing becomes the default medium</h2>
<p>The single biggest shift is that remote work rewards writing things down. In an office, context lives in hallway conversations and quick desk visits, and that works precisely because everyone shares the same room and the same hours. Strip that away and the undocumented knowledge simply evaporates. Teams that thrive respond by capturing decisions, designs, and reasoning in documents and tickets — artifacts that outlast any meeting and reach colleagues across time zones who were never in the room to begin with.</p>
<ul>
<li>Default to async: write the proposal down before reaching for a calendar invite.</li>
<li>Document decisions where the next person, including your future self, will actually find them.</li>
<li>Make work visible through status in shared tools rather than locked in someone's head.</li>
</ul>
<p>This is not merely tidier; it is more inclusive. Asynchronous, written communication gives quieter team members, non-native speakers, and people in awkward time zones a fair chance to contribute, instead of rewarding whoever is loudest on the call.</p>

<h2>The discipline of async</h2>
<p>Going async well takes practice. It means writing with enough context that a reader can act without a follow-up conversation, and resisting the reflex to schedule a meeting for every small question. A well-written message that lands in someone's queue and lets them respond on their own schedule respects deep focus time in a way that a same-time call never can. The goal is not to eliminate meetings but to reserve them for the genuinely interactive work — brainstorming, difficult disagreements, relationship-building — where real-time conversation earns its interruption.</p>
<blockquote>In a remote team, undocumented context is lost context. If it matters, write it somewhere durable.</blockquote>

<h2>Tooling that holds it together</h2>
<p>Engineering practices that were merely good in an office become essential when you cannot lean over to a colleague's desk. Clean source control hygiene, with small reviewable changes and clear commit messages, lets people understand work they did not watch happen. Solid continuous integration and deployment removes the need for someone to be physically present to ship. Reproducible development environments mean a new teammate is productive without a day of over-the-shoulder setup help that is impossible to give remotely.</p>

<h2>Trust as the foundation</h2>
<p>Underneath every tool and habit sits something less technical: trust. Remote teams that try to recreate the office through surveillance — counting hours online, demanding constant availability — tend to corrode the very thing that makes distributed work succeed. The teams getting it right measure outcomes rather than presence, judging people by what they ship and how they collaborate, not by a green dot. That shift from monitoring activity to trusting results may turn out to be the most durable change of all.</p>
`,
  },
  {
    slug: "es2020-optional-chaining",
    title: "ES2020: Optional Chaining and Nullish Coalescing",
    category: "JavaScript",
    date: "2020-01-28",
    image: "/images/insights/es2020-optional-chaining.svg",
    imageAlt: "Optional chaining and nullish coalescing in JavaScript",
    excerpt:
      "Two small operators removed a mountain of defensive boilerplate. They are the kind of feature you miss the moment you go without.",
    metaKeyword: "es2020, optional chaining, nullish coalescing, javascript",
    html: `
<p>Not every language update arrives with fanfare, and the most useful ones rarely do. ES2020 shipped a handful of additions, but two small operators in particular have an outsized effect on everyday code. They do not enable anything that was previously impossible. What they do is quietly delete an entire category of tedious, error-prone boilerplate that JavaScript developers had been writing by hand, in slightly different ways, for years. These are the kind of features you stop noticing within a week and then sorely miss the moment you open an older codebase without them.</p>

<h2>Optional chaining</h2>
<p>Reaching deep into an object that might be incomplete has always been a minor ordeal. Accessing a nested property where any intermediate value could be missing meant building a chain of guards, because trying to read a property of something undefined throws an error and crashes the operation. The result was code cluttered with repetitive checks whose only job was to avoid an exception. Optional chaining replaces all of that with a single concise token that short-circuits safely: if anything along the path is missing, the whole expression simply evaluates to undefined instead of throwing.</p>
<p>The benefit is not only fewer keystrokes. It is fewer places for a stray guard to be forgotten, which is exactly where defensive code tends to harbour bugs. Intent becomes clearer too — the operator says plainly that this part of the path is optional, which reads far better than a wall of conditional checks.</p>

<h2>Nullish coalescing</h2>
<p>Supplying a fallback value carried its own long-standing trap. The common approach leaned on the logical OR operator, which works until you remember that it treats every falsy value as absent. A legitimate zero, an intentional empty string, or a deliberate false would all be silently overridden by the default, producing bugs that are maddening to track down precisely because the code looks correct. Nullish coalescing fixes this by falling back only when a value is genuinely null or undefined, leaving valid falsy values untouched.</p>
<ul>
<li>Safe deep property access without nested guards or try-catch wrappers.</li>
<li>Defaults that correctly respect zero, empty string, and false as real values.</li>
<li>Less defensive boilerplate overall, and with it, fewer subtle and hard-to-spot bugs.</li>
</ul>

<h2>Better together</h2>
<p>The two operators are especially powerful in combination, and that pairing is where they shine in real code. You can reach safely into a deeply nested configuration object or an API response with optional chaining, then provide a sensible default with nullish coalescing, all in a single readable expression. Handling messy, partially-populated data from external sources used to be one of the most boilerplate-heavy chores in front-end work. These two additions turn it into something close to a one-liner.</p>
<blockquote>These are the features you do not notice until you use an older codebase without them, and feel every missing one.</blockquote>

<h2>Adopting them sensibly</h2>
<p>A practical note for teams: these are modern operators, so check that your build toolchain transpiles them for whatever browsers you need to support, and confirm your runtime targets are current enough. With that in place, the migration is painless and the payoff immediate. Reach for them wherever you currently write a chain of existence checks or a falsy-prone fallback, and watch a surprising amount of nervous, defensive code simply disappear from your files.</p>
`,
  },
];
