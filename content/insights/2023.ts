import type { LocalArticle } from "./types";

export const articles2023: LocalArticle[] = [
  {
    slug: "signals-fine-grained-reactivity",
    title: "Signals: Fine-Grained Reactivity Explained",
    category: "React",
    date: "2023-10-09",
    image: "/images/insights/signals-fine-grained-reactivity.svg",
    imageAlt: "Signals — fine-grained reactive updates",
    excerpt:
      "Signals update exactly the DOM that depends on a value — no re-rendering whole component trees. Here's why the idea is spreading.",
    metaKeyword: "signals, reactivity, solidjs, state, rendering",
    html: `
<p>The component re-render model that most of us grew up with is wonderfully simple to reason about, but it is also blunt. You change a piece of state, and the framework re-runs the whole component function, produces a fresh tree, and diffs that tree against the old one to figure out what actually changed. It works, and for years it has been good enough. Yet as applications grow, the cost of re-running large component trees on every keystroke or toggle starts to show. Signals are a finer-grained alternative, and over the past couple of years they have quietly been reshaping how frameworks think about updates.</p>

<h2>What a signal actually is</h2>
<p>A signal is a value that knows who depends on it. You read it, and the framework records that this particular computation or DOM node now subscribes to it. When you later write a new value, only the exact computations and nodes that read it run again. There is no component re-execution, no virtual-DOM diff for unrelated branches of the tree, and no cascade of work spreading outward from a parent.</p>
<blockquote>With signals, the framework never has to ask 'what changed in this component?' — it already knows precisely which pieces of the page depend on the value that changed, and it updates only those.</blockquote>
<p>The practical effect is that updates become surgical. A counter in the corner of a sprawling dashboard updates that one number, leaving thousands of other nodes completely untouched. The framework is not being clever after the fact; the dependency graph was built as the values were read.</p>

<h2>Why the idea is spreading</h2>
<p>Popularised by frameworks like SolidJS, the signal model has since influenced a wave of others adopting signal-like primitives. The appeal is predictable performance. The cost of an update scales with what genuinely changed rather than with the size of your component tree, which means a page can grow large without each interaction growing slower.</p>
<ul>
<li>Updates target exactly the dependent DOM, not the nearest component boundary.</li>
<li>There is no re-render cascade triggered by a parent state change.</li>
<li>The mental model feels closer to a spreadsheet than to a render loop — cells recompute when their inputs change.</li>
<li>Derived values are first-class: a computed signal recalculates only when one of its sources moves.</li>
</ul>
<p>That last point matters in real applications. So much of the manual optimisation work in component frameworks is about preventing needless recalculation — wrapping things in memo helpers, carefully listing dependencies, and worrying about referential identity. With signals, derivations are tracked automatically, and a great deal of that hand-tuning simply disappears.</p>

<h2>The trade-off you accept</h2>
<p>Fine-grained reactivity is not free of friction. It asks you to think in terms of values and derivations rather than render passes, and that is a genuine shift. You stop reasoning about 'this function runs top to bottom every render' and start reasoning about 'this value flows into these places'. Reading a signal at the wrong moment, or destructuring it in a way that breaks tracking, can quietly sever the dependency and leave you with stale output.</p>
<p>There is also an ecosystem cost. The component model has years of tooling, patterns, and shared intuition behind it. Adopting a signal-first framework means relearning some habits and occasionally working around libraries that assume the old model.</p>

<h2>A practical way to start</h2>
<p>You do not need to rewrite anything to benefit from the idea. Start by understanding it conceptually, then look at where your current app spends its rendering budget. The screens that feel sluggish are usually the ones re-rendering far more than they need to, and they are the clearest argument for a finer-grained approach.</p>
<p>Once the model clicks, the appeal is hard to unsee: less manual memoisation, more predictable performance, and a clearer line between the data and the parts of the page it drives. Signals are not a silver bullet, but they are one of the more interesting directions the front-end world is moving in right now, and they reward the small effort it takes to learn them.</p>
`,
  },
  {
    slug: "tailwind-in-large-teams",
    title: "Tailwind CSS in Large Teams: Lessons Learned",
    category: "Design Systems",
    date: "2023-05-16",
    image: "/images/insights/tailwind-in-large-teams.svg",
    imageAlt: "Tailwind CSS conventions across a large team",
    excerpt:
      "Utility-first CSS scales beautifully — but only with conventions. Here's what keeps Tailwind maintainable across a big codebase.",
    metaKeyword: "tailwind css, design systems, conventions, components, scaling",
    html: `
<p>Tailwind divides opinion more sharply than almost any tool in front-end development. Detractors see a wall of cryptic class names; advocates see speed and consistency. On a small project the argument barely matters. On a large team, though, Tailwind solves a problem that has plagued shared codebases for as long as CSS has existed: the slow death of a growing, unowned stylesheet where nobody dares delete a class for fear of breaking a page they have never seen. The catch is that, left to its own devices, utility-first CSS creates a different kind of mess. Conventions are what make the difference.</p>

<h2>Prefer tokens over arbitrary values</h2>
<p>The single biggest win on a large team is that Tailwind constrains choices. When your spacing, colour, and type scales are configured as tokens, developers reach for the same handful of values instead of inventing one-off pixel measurements. Consistency stops being a code-review battle and quietly becomes the path of least resistance, because the easy thing to type is also the correct thing.</p>
<ul>
<li>Define the design scale once, and let the utilities enforce it across every screen.</li>
<li>Reserve arbitrary bracket values for genuine exceptions, never as a default reflex.</li>
<li>Lint for disallowed patterns so the rules apply automatically rather than depending on memory.</li>
<li>Name colour tokens by role rather than by hue, so a re-theme does not require touching components.</li>
</ul>
<p>This discipline pays off most when new people join. They do not need to absorb a folder of legacy stylesheets or learn which of three competing button styles is the blessed one. The constraints are visible in the markup and enforced by the configuration.</p>

<h2>Extract components, not utility soup</h2>
<p>The most common complaint about Tailwind at scale is repetition. The same long string of fifteen classes appears across a dozen files, and changing the design means a tedious find-and-replace that inevitably misses a few spots. The fix is not to abandon utilities and crawl back to bespoke CSS. It is to extract a component the moment a pattern repeats, so the markup has a single source of truth.</p>
<blockquote>Copy a row of fifteen classes once and you have saved time. Copy it a second time and you have created a maintenance problem. Wrap it in a component the third time, before it spreads further.</blockquote>
<p>The judgement call is when to extract. Too early and you build an abstraction nobody reuses; too late and the duplication has already metastasised. A good rule is to let the pattern prove itself two or three times, then promote it to a named component with a clear, minimal set of props.</p>

<h2>Make the conventions explicit and automated</h2>
<p>On a small team, conventions can live in people's heads. On a large one, they have to live in the tooling. Document the rules briefly, then back them with automation so they do not depend on anyone remembering them during a busy week.</p>
<ul>
<li>Use a class-sorting plugin so the order of utilities is consistent and diffs stay readable.</li>
<li>Configure linting to flag arbitrary values and disallowed colours.</li>
<li>Keep the theme configuration small and well-commented, so the scale itself is legible.</li>
</ul>
<p>When the rules are automated, code review can focus on logic and accessibility instead of bikeshedding over spacing values. That alone is worth the setup cost on a team of any real size.</p>

<h2>The payoff, and where the work really is</h2>
<p>Done well, Tailwind gives a large team a shared vocabulary, deletes dead CSS automatically as components are removed, and keeps styling colocated with the markup it describes. No more hunting across files to discover what a class does or whether anything still uses it. The genuine effort sits in the setup — the tokens, the extracted components, and the lint rules — not in the daily writing. Invest there, and the rest of the team gets the benefits without having to think about them.</p>
`,
  },
  {
    slug: "ai-coding-assistant",
    title: "The AI Coding Assistant Arrives",
    category: "AI",
    date: "2023-12-04",
    image: "/images/insights/ai-coding-assistant.svg",
    imageAlt: "AI coding assistant suggesting code in an editor",
    excerpt:
      "AI pair programmers went from novelty to daily tool this year. The skill that matters now is reviewing what they produce.",
    metaKeyword: "ai coding, copilot, chatgpt, developer productivity, pair programming",
    html: `
<p>This was the year AI assistants moved from demo to default. Autocomplete that drafts whole functions, chat that explains a baffling stack trace, tools that scaffold a component from a single sentence — over the course of the year they stopped being a curiosity and became part of how a great many developers work day to day. The shift happened fast enough that a lot of teams are still figuring out what it means for how they hire, review, and ship.</p>

<h2>Where they genuinely help</h2>
<p>The wins are real, and they cluster around the tedious middle of the job. Boilerplate, test stubs, regular expressions, one-off scripts, and translating an idea from one language or framework into another are all tasks where an assistant saves meaningful time. They are also a remarkably fast way to get un-stuck on an unfamiliar API, surfacing the shape of a call you would otherwise spend twenty minutes finding in the docs.</p>
<ul>
<li>Drafting repetitive code you would otherwise type from memory or copy from an old file.</li>
<li>Explaining unfamiliar code and cryptic errors in plain language, right where you are working.</li>
<li>Generating the tests and documentation that you might otherwise quietly skip under deadline.</li>
<li>Exploring an approach quickly, then keeping or discarding it without much sunk cost.</li>
</ul>
<p>What unites these cases is that they are low-stakes and easy to verify. When the cost of a wrong answer is small and the correctness is obvious at a glance, an assistant is close to pure upside.</p>

<h2>The new core skill is review</h2>
<p>The flip side is that these assistants are confidently wrong often enough that accepting their output unread is a genuine liability. They invent APIs that do not exist, miss edge cases that a careful developer would catch, and occasionally reproduce subtle security flaws lifted from their training data. The output reads fluently and looks plausible, which is exactly what makes unreviewed acceptance dangerous.</p>
<blockquote>Treat AI output the way you would treat a junior engineer's pull request: often useful, frequently fast, and absolutely requiring review before it ships to anyone.</blockquote>
<p>So the valuable skill is shifting. It is no longer purely about writing code from a blank page; it is increasingly about quickly judging whether a chunk of generated code is correct, idiomatic, and safe. That is a different muscle, and the developers who are getting the most value this year are the ones building it deliberately rather than letting the tool lull them into autopilot.</p>

<h2>Building good habits around the tools</h2>
<p>Teams that are thriving with these assistants tend to share a few practices. They keep a human firmly in the loop for anything that touches security, data, or money. They run generated code through the same tests and linting as anything hand-written, with no special exemption. And they treat the assistant as a drafting partner rather than an authority, reading every suggestion the way they would read a colleague's first attempt.</p>
<ul>
<li>Never accept a suggestion you could not have written and explained yourself.</li>
<li>Be especially wary of generated code in security-sensitive paths.</li>
<li>Keep prompts and useful patterns where the team can share and improve them.</li>
</ul>
<p>The teams getting it wrong tend to fall into one of two camps: banning the tools outright and forfeiting real productivity, or trusting them blindly and shipping confident nonsense.</p>

<h2>Where it is heading</h2>
<p>The tools will keep getting better at context — your codebase, your conventions, your internal documentation — and that will make their suggestions more relevant and less generic. But better context does not remove the need for judgement; it raises the ceiling on what is worth checking. The durable advantage belongs to teams that build review habits and sensible guardrails now, while the tools are still young, rather than scrambling to add them after something goes wrong.</p>
`,
  },
  {
    slug: "server-actions-forms",
    title: "Server Actions and Forms, Reconsidered",
    category: "React",
    date: "2023-08-22",
    image: "/images/insights/server-actions-forms.svg",
    imageAlt: "Server actions handling a form submission",
    excerpt:
      "Server Actions let a form call server code directly — no hand-written API route. It is a quiet but meaningful simplification.",
    metaKeyword: "server actions, forms, react, next.js, mutations",
    html: `
<p>For years, submitting a form in a modern web app meant the same tired ritual. You wrote an API route to receive the data, wrote a client-side fetch to send it, wired up loading and error state on the front end, and then spent a surprising amount of energy keeping the two ends in sync as the shape of the data evolved. Server Actions collapse that whole dance into a single function that runs on the server and is called straight from the form. It is a quiet change on the surface, but it removes a category of work that most of us had simply accepted as the cost of doing business.</p>

<h2>Less plumbing, fewer mistakes</h2>
<p>Because a Server Action is just a function, there is no separate endpoint to define, no request payload to serialise by hand, and no client and server contract that can drift out of sync. The form posts directly to the action, and the framework handles the wiring underneath. The single most common source of form bugs — a mismatch between what the client sends and what the server expects — largely stops being possible, because there is only one definition of the boundary.</p>
<ul>
<li>Mutations live right next to the components that use them, instead of in a distant routes folder.</li>
<li>Progressive enhancement comes for free: the form works even before any JavaScript has loaded.</li>
<li>Pending and error state are handled with first-class hooks rather than bespoke flags.</li>
<li>There is less code overall, which means less surface area for things to go wrong.</li>
</ul>
<p>That progressive-enhancement point deserves emphasis. Because the form genuinely posts to a server function, a user on a slow connection or with scripting disabled still gets a working form. The interactive niceties layer on top once the JavaScript arrives, rather than being load-bearing for basic functionality.</p>

<h2>What disappears, and why that is the point</h2>
<p>The most satisfying thing about adopting Server Actions is watching boilerplate evaporate. The thin API routes whose only job was to receive a form and call a database, the fetch wrappers, the manual try-and-catch around every submission — much of it simply goes away.</p>
<blockquote>The best part is what disappears: a whole category of boilerplate API routes whose only purpose was to receive a form and hand it off to the database.</blockquote>
<p>Less code is not just less typing. It is less to test, less to keep consistent, and less to explain to the next person who reads the codebase. When a mutation and the component that triggers it sit in the same place, the story of what happens when a user clicks 'save' is far easier to follow.</p>

<h2>The mental adjustment</h2>
<p>There is a learning curve, and it is mostly about trusting a new boundary. Writing a function that you know will execute on the server, yet calling it as if it were local, feels slightly uncanny at first. You have to keep in mind that anything inside the action runs with server privileges and that its inputs come from an untrusted client, so validation still matters. The convenience does not remove the need to check what users send you; it just removes the ceremony around receiving it.</p>

<h2>When to still build a real API</h2>
<p>Server Actions are designed for your own application's mutations — the in-app forms and buttons that drive your product. They are not a replacement for a public interface. If an endpoint needs to be consumed by third parties, by a separate mobile app, or by other services in your organisation, a proper, versioned, documented API is still the right tool for the job.</p>
<p>The clean rule of thumb is this: use actions for in-app forms and keep real APIs for real integrations. Drawn that way, the line is easy to hold, and you get the simplification where it helps without giving up the stability that external consumers depend on.</p>
`,
  },
  {
    slug: "css-nesting-native",
    title: "CSS Nesting Lands Natively",
    category: "CSS",
    date: "2023-06-28",
    image: "/images/insights/css-nesting-native.svg",
    imageAlt: "Native CSS nesting without a preprocessor",
    excerpt:
      "Nesting was the reason many teams reached for Sass. Now it is built into CSS itself — one less build step to justify.",
    metaKeyword: "css nesting, sass, preprocessor, native css",
    html: `
<p>Nesting selectors — writing child rules inside their parent so related styles sit together — was one of the headline features that sent teams reaching for Sass and Less in the first place. It made stylesheets read like the structure of the components they described, and once you had it, plain CSS felt clumsy by comparison. With native CSS nesting now shipping in browsers, that particular reason to install a preprocessor largely evaporates. It is a small feature with an outsized effect on how much tooling a project really needs.</p>

<h2>What you actually get</h2>
<p>You can now nest rules directly inside one another, reference the parent selector with the ampersand, and co-locate related styles without any build step in between. A component's base styles, its hover and focus states, and its responsive tweaks can all live in one readable block. Combined with custom properties and the modern selector features that have landed alongside it, plain CSS now covers a remarkable share of what preprocessors were used for.</p>
<ul>
<li>Nest related rules so the stylesheet mirrors your component structure at a glance.</li>
<li>Use the parent selector for states, variants, and modifiers without repeating the base selector.</li>
<li>Skip compilation entirely — no source maps, no watch process, no extra dependency to keep current.</li>
</ul>
<p>There are a few syntax wrinkles worth knowing. Native nesting is slightly stricter than Sass in places, and the way the parent selector combines with nested rules can differ from what preprocessor users expect. Reading the specification once will save you a confusing afternoon chasing a selector that does not behave the way muscle memory predicts.</p>

<h2>One less build dependency</h2>
<p>The deeper story here is not nesting on its own. It is the steady absorption of preprocessor features into the platform itself. Variables arrived years ago as custom properties. Now nesting. Relational and modern selectors continue to expand what is possible without a single line of script. Each of these quietly weakens the case for an extra layer of tooling.</p>
<blockquote>Every feature CSS absorbs from preprocessors is one less build dependency to install, configure, keep updated, and explain to the next developer who joins the project.</blockquote>
<p>That matters more than it might seem. A build step is never truly free. It is a tool to learn, a configuration to maintain, a potential point of failure in continuous integration, and a layer of indirection between the code you write and the code that runs. Removing one, even a familiar and well-behaved one, makes a project a little simpler to reason about and a little easier to onboard into.</p>

<h2>Do you still need Sass at all?</h2>
<p>For some projects, yes. If you lean heavily on loops to generate utility classes, on mixins to share blocks of declarations, or on functions for colour manipulation and maths, a preprocessor still earns its place. Those are genuine programming features that native CSS does not fully replicate, and rebuilding them by hand would be a step backward.</p>
<p>But for a great many projects, that machinery was never the point. They reached for Sass mainly for nesting and variables, and now both are available natively. For those teams, the combination of nesting, custom properties, container queries, and modern selectors means vanilla CSS is finally enough.</p>

<h2>A reasonable way to adopt it</h2>
<p>You do not have to choose all at once. New projects can start without a preprocessor and add one only if a real need appears. Existing projects can begin authoring new components with native nesting while leaving the old build in place. Either way, the direction is clear: the platform keeps closing the gap, and the styles you write today increasingly run in the browser with nothing in between.</p>
`,
  },
  {
    slug: "htmx-hypermedia",
    title: "htmx and the Return of Hypermedia",
    category: "Architecture",
    date: "2023-03-15",
    image: "/images/insights/htmx-hypermedia.svg",
    imageAlt: "htmx swapping HTML fragments from the server",
    excerpt:
      "htmx makes the case that you can build interactive apps by sending HTML, not JSON. For the right project, it is liberating.",
    metaKeyword: "htmx, hypermedia, server-rendered, html over the wire",
    html: `
<p>Amid an arms race of ever-larger JavaScript frameworks, htmx made a contrarian argument that struck a real chord this year. What if, instead of the server sending JSON for a client framework to render, the server simply sent HTML — and the page swapped in those fragments with almost no client-side framework at all? It is an old idea dressed in modern clothes, and for the right kind of project it feels genuinely liberating.</p>

<h2>The core idea</h2>
<p>With a handful of attributes added directly to your markup, any element can issue an HTTP request and replace part of the page with the HTML the server returns. A button can fetch and swap in a panel; a form can post and have its results rendered in place; a div can poll for updates. There is no client-side state to manage, no serialisation layer to maintain, and very little JavaScript to ship or debug.</p>
<ul>
<li>Interactivity is declared in HTML attributes rather than written in script.</li>
<li>The server remains the single source of truth for both data and markup.</li>
<li>Payloads are small fragments, and the client framework is tiny by comparison to a full SPA.</li>
</ul>
<p>The elegance is that the same server-side templates that render the initial page also render the updates. You are not maintaining one rendering path for the first load and a completely separate one in JavaScript for everything after. The mental model shrinks to something close to classic server-rendered web development, with the rough edges smoothed off.</p>

<h2>Why it resonates now</h2>
<p>Part of htmx's appeal is fatigue. Many teams have lived through the full weight of a single-page application — the build complexity, the duplicated validation logic on client and server, the state-management churn — for an app that, on reflection, did not need most of it. htmx offers a way out for those cases without throwing away interactivity entirely.</p>
<blockquote>Not every application needs a client-side state machine. Sometimes 'the server renders HTML and the page swaps it in' really is the whole architecture, and admitting that is a relief.</blockquote>
<p>There is also a clarity to it. Because the server owns the truth and the HTML over the wire is the interface, there is far less to hold in your head. Debugging often means looking at a network response that is just readable markup, not decoding a JSON shape and tracing how a client reducer transformed it into the DOM.</p>

<h2>The trade-offs to weigh</h2>
<p>htmx is not a universal answer, and its advocates are usually the first to say so. Leaning on the server for every interaction means more round trips, which can feel less instant than local client state for things like a fast-filtering list. Highly stateful interfaces, offline-capable apps, and richly interactive tools — editors, design surfaces, dashboards with live local manipulation — are still better served by a full framework that keeps state in the browser.</p>
<ul>
<li>Frequent, latency-sensitive interactions may suffer from the extra round trips.</li>
<li>Deeply interactive or offline experiences need real client-side state.</li>
<li>Very large fragment swaps can negate the payload savings if you are not careful.</li>
</ul>

<h2>Where it fits</h2>
<p>htmx shines for content-driven and CRUD-style applications where most of the logic already lives on the server and the interactions are about fetching, submitting, and updating pieces of a page. For an internal tool, an admin panel, or a content site that needs a sprinkle of dynamism, it can deliver a snappy experience with a fraction of the complexity.</p>
<p>More than any specific project, though, htmx is a healthy reminder. The heaviest tool is not always the right one, and the industry's default reach for a large framework deserves to be questioned more often than it is. Sometimes the simplest architecture that meets the requirement is the one that has been there all along.</p>
`,
  },
  {
    slug: "storybook-component-driven",
    title: "Storybook and Component-Driven Development",
    category: "Design Systems",
    date: "2023-01-24",
    image: "/images/insights/storybook-component-driven.svg",
    imageAlt: "Storybook showing components in isolation",
    excerpt:
      "Building components in isolation, before they touch a page, changes how teams design and test UI. Storybook makes it practical.",
    metaKeyword: "storybook, component-driven development, design systems, ui testing",
    html: `
<p>Component-driven development flips the usual order of building a user interface. Instead of constructing a whole page and then extracting reusable components out of it after the fact, you build and refine the components in isolation first, and then compose pages from those finished pieces. It sounds like a small reordering, but it changes how teams design, test, and talk about their UI. Storybook is the tool that took this workflow from a niche practice to something mainstream and practical for everyday teams.</p>

<h2>Why isolation helps</h2>
<p>Developing a component outside the running application forces a useful kind of honesty. You have to define its real interface — its props and its states — without leaning on page-specific context to prop it up. When a component cannot quietly reach into global state or assume the exact data a particular page happens to provide, its API tends to come out cleaner and more genuinely reusable.</p>
<p>Isolation also lets you exercise every variant of a component, including the awkward ones that are hard to reach in a live app. Long text that wraps to four lines, an error state, a loading skeleton, an empty list, a disabled control — all of these can be put on screen side by side and inspected deliberately.</p>
<ul>
<li>See every state of a component together on a single screen, not scattered across user journeys.</li>
<li>Build a living catalogue that doubles as documentation for the whole team.</li>
<li>Run visual and interaction tests against components directly, without spinning up the full app.</li>
<li>Reproduce edge cases on demand instead of hunting for the conditions that trigger them.</li>
</ul>

<h2>The states you never look at are the ones that break</h2>
<p>There is a quiet truth in front-end work that component-driven development confronts directly. The variants you never bother to render during development are exactly the ones that surprise you in production.</p>
<blockquote>The states you never bother to look at are the ones that break in front of a real user. Isolation makes those states impossible to ignore, because building them is the point of the exercise.</blockquote>
<p>When the loading state and the error state are first-class things you author and view as a matter of routine, they stop being afterthoughts. You design them with the same care as the happy path, because they sit right next to it in your catalogue, demanding attention rather than hiding behind a condition that rarely fires.</p>

<h2>Beyond developers</h2>
<p>A component catalogue is not only an engineering artefact. It becomes a shared language between developers, designers, and product people. Everyone can point at the same rendered component and discuss it concretely, rather than arguing over a static mockup that may or may not match what was actually built.</p>
<p>That shared reference keeps the implemented interface and the design in step as both evolve. A designer can see exactly how a component behaves across its states; a developer can confirm that a tweak matches intent; a product manager can review real, interactive UI without needing a full staging deploy. The catalogue becomes a single source of truth that everyone trusts.</p>

<h2>Adopting it without overinvesting</h2>
<p>You do not need to document every component on day one to get value. Start with the ones that are reused most, or the ones whose states are hardest to reproduce in the app, and let the catalogue grow from there. Treat each story as a small, focused example rather than an exhaustive specification, and keep them close to the components they describe so they do not rot.</p>
<p>The habit pays compounding returns. Over time the catalogue becomes the place new team members go to understand the system, the place reviewers go to verify changes, and the place designers and developers meet to keep the product coherent. Building components in isolation is a modest shift in workflow that quietly raises the quality of everything that follows.</p>
`,
  },
];
