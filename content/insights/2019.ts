import type { LocalArticle } from "./types";

export const articles2019: LocalArticle[] = [
  {
    slug: "react-hooks-in-practice",
    title: "React Hooks in Practice",
    category: "React",
    date: "2019-11-12",
    image: "/images/insights/react-hooks-in-practice.svg",
    imageAlt: "React hooks managing state and effects in function components",
    excerpt:
      "Now that Hooks have shipped, what do they look like in real code? Mostly: simpler components and a few new pitfalls to learn.",
    metaKeyword: "react hooks, usestate, useeffect, function components",
    html: `
<p>Hooks landed in a stable release earlier this year, and the shift in how we write React has been remarkably fast. Function components paired with <strong>useState</strong> and <strong>useEffect</strong> are quickly becoming the default, retiring a great deal of the class-component machinery we have leaned on since the beginning. After several months of using them on real projects, it is worth stepping back from the introductory tutorials and asking what Hooks actually look like in production code, and where they bite.</p>

<h2>What gets genuinely better</h2>
<p>The clearest win is organisation. In a class component, the logic for a single feature was scattered across <em>componentDidMount</em>, <em>componentDidUpdate</em>, and <em>componentWillUnmount</em>. A subscription, for example, was set up in one method and torn down in another, with the related state declared somewhere else entirely. With Hooks, that logic lives together in a single effect, grouped by what it does rather than by when the framework happens to call it.</p>
<p>The second win is reuse. Sharing stateful behaviour between components used to mean higher-order components or render props, both of which added layers of nesting that made the component tree hard to read. A custom hook is just a function that calls other hooks, so you can extract a piece of behaviour and use it anywhere.</p>
<ul>
<li>Related logic grouped together instead of split by lifecycle method.</li>
<li>Custom hooks for genuinely reusable stateful logic, with no extra nesting.</li>
<li>Shorter components that read top to bottom instead of jumping between methods.</li>
<li>No more wrapper hell from stacking higher-order components.</li>
</ul>

<h2>The new pitfalls</h2>
<p>Hooks are not free of sharp edges. The dependency array of <strong>useEffect</strong> is the single most common source of bugs we see in code review. Omit a value the effect reads and you capture a stale version of it; include a value that changes on every render and you create an infinite loop. The root cause is almost always a misunderstanding of closures: an effect closes over the variables it can see at the moment it runs, and those variables do not magically update later.</p>
<p>There are also the rules. Hooks must be called at the top level of a component, in the same order every render, never inside a condition or a loop. This trips people up at first, but the linter that ships alongside Hooks catches most violations, and it is worth treating its warnings as errors.</p>
<blockquote>The mental model shifts from thinking about lifecycle events to thinking about synchronising your component with values over time. Internalising that single idea is most of the battle.</blockquote>

<h2>Practical habits that help</h2>
<p>A few disciplines make the transition smoother. Keep effects small and focused; one effect per concern is far easier to reason about than one effect that does five things. When a piece of state and the logic around it starts to feel tangled, that is the signal to extract a custom hook. And when an effect genuinely needs a value but should not re-run when it changes, reach for a ref rather than fighting the dependency array.</p>
<p>For derived data, prefer computing it during render over storing it in state and synchronising it with an effect. A surprising number of effect-related bugs vanish once you stop trying to keep two pieces of state in sync and simply calculate one from the other.</p>

<h2>Worth adopting now</h2>
<p>Despite the gotchas, the direction of travel is clear. New components should generally be written with Hooks, and there is no need to rewrite existing class components in a hurry. Migrate them gradually, as you touch them for other reasons, and you will spread the learning curve across the team without a disruptive big-bang refactor. The classes will keep working; the new code will simply be cleaner.</p>
<p>Give yourself a project or two to build the right instincts. Once the model clicks, you will find yourself writing less code, sharing more of it, and reaching for the old lifecycle patterns less and less.</p>
`,
  },
  {
    slug: "typescript-goes-mainstream",
    title: "TypeScript Goes Mainstream",
    category: "TypeScript",
    date: "2019-09-03",
    image: "/images/insights/typescript-goes-mainstream.svg",
    imageAlt: "TypeScript adoption across the JavaScript ecosystem",
    excerpt:
      "TypeScript stopped being a niche preference and became a default expectation. The tipping point was tooling and library support.",
    metaKeyword: "typescript, static typing, javascript, developer experience",
    html: `
<p>TypeScript crossed a line this year. It went from an opinionated, somewhat contrarian choice to something close to a default expectation on serious JavaScript projects. What is interesting is that the change had little to do with the language suddenly getting better. The compelling shift was the ecosystem catching up around it, until choosing plain JavaScript started to feel like the choice that needed justifying.</p>

<h2>What tipped the balance</h2>
<p>Three things compounded. Editor support became genuinely excellent, with autocomplete, inline documentation, jump-to-definition, and safe rename refactoring all working out of the box. The popular libraries teams actually depend on started shipping their own type definitions, or had high-quality community definitions, so the painful gaps where you typed against an untyped dependency mostly disappeared. And the major frameworks and project starters began defaulting to TypeScript, which normalised it for newcomers.</p>
<ul>
<li>First-class editor autocomplete, navigation, and refactoring across the codebase.</li>
<li>Type definitions available for the libraries teams reach for every day.</li>
<li>Frameworks, CLIs, and starter templates defaulting to TypeScript.</li>
<li>A large pool of developers who have now used it and expect it.</li>
</ul>
<p>Once the friction of using TypeScript dropped below the friction of going without types, adoption snowballed. That is the quiet logic of tooling: tools win not when they are theoretically superior but when they become the path of least resistance.</p>

<h2>Where the payoff actually shows up</h2>
<p>It is tempting to sell types on catching typos, but that undersells them. The real return arrives on the code you did not write yesterday, months later, on a large change, with a teammate. When you rename a field on a widely used object, the compiler hands you a list of every place that needs updating. When you refactor a function signature, you find the callers before your users do.</p>
<blockquote>Types pay off most on the code you did not write yesterday. Their value compounds with the age and size of the project, which is exactly why mature codebases adopt them and tiny scripts often do not bother.</blockquote>
<p>There is a second, less obvious benefit: types are documentation that cannot go stale. A function signature tells the next developer what to pass and what to expect back, and unlike a comment, it is checked against reality on every build.</p>

<h2>The honest costs</h2>
<p>None of this is free. There is upfront verbosity, a learning curve around generics and unions, and the occasional fight with a complex type that resists being expressed cleanly. Build times grow, and badly written types can be harder to read than the code they describe. On a throwaway prototype or a fifty-line script, the overhead may not earn its keep.</p>
<p>A pragmatic adoption path helps. Enable the type checker in a permissive mode first, let teams add annotations gradually, and tighten the strictness settings over time as confidence grows. You do not have to type everything on day one to start getting value.</p>

<h2>The view from here</h2>
<p>On a growing codebase with more than one contributor, the case is now hard to argue against. Types catch a whole class of bugs before they reach runtime, make large refactors safe enough to attempt, and keep a living description of your data right next to the code. The cost is some discipline and verbosity; the return is confidence that grows as the project ages. For most teams shipping real software, that trade has decisively tipped in favour of adopting it.</p>
`,
  },
  {
    slug: "design-systems-at-scale",
    title: "Building Design Systems at Scale",
    category: "Design Systems",
    date: "2019-06-25",
    image: "/images/insights/design-systems-at-scale.svg",
    imageAlt: "A design system with shared tokens and components",
    excerpt:
      "As products and teams multiply, consistency stops happening by accident. A design system is how organisations scale their UI.",
    metaKeyword: "design systems, component library, design tokens, consistency",
    html: `
<p>One product with one designer stays consistent almost by accident. Everyone shares the same instincts and the same eye, so buttons look alike and spacing feels right without anyone writing it down. Add more products, more designers, and more engineers, and that quiet coherence falls apart. You end up with three buttons that are almost the same, spacing that is close but not quite, and a brand that feels subtly inconsistent across screens. A design system is how organisations hold the line on coherence as they grow.</p>

<h2>More than a component library</h2>
<p>It is a common mistake to equate a design system with a folder of React components. The components matter, but they sit on top of something more foundational. A real system is layered: design tokens for colour, spacing, type, and motion at the base; reusable components built on those tokens in the middle; and documentation, usage guidelines, and contribution rules around the outside that explain how it all fits together.</p>
<ul>
<li>Tokens as the single source of truth for the underlying design decisions.</li>
<li>Reusable components built on those tokens so they inherit consistency for free.</li>
<li>Documentation and examples so teams use the pieces correctly.</li>
<li>A clear contribution process so the system can evolve rather than fossilise.</li>
</ul>
<p>The tokens are the part teams most often skip and most often regret skipping. If your components hardcode a hex value here and a pixel measurement there, you have a component library, not a system. The moment you need to adjust the brand colour or shift the spacing scale, you are back to a find-and-replace across the whole codebase.</p>

<h2>Treat it like a product</h2>
<p>The most useful reframe is to stop thinking of a design system as a project that finishes and start treating it as a product that is never done. Its customers happen to be your own teams, but it has all the same needs as any product: an owner, a roadmap, a release process, versioning, a changelog, and ongoing maintenance.</p>
<blockquote>A design system is a product whose customers are your own teams. Like any product, it needs an owner, a roadmap, and real maintenance, or it quietly rots into a set of components nobody trusts.</blockquote>
<p>Without that ownership, systems decay in a predictable way. A team needs a variant that does not exist, so they fork a component locally. Another team does the same. Within a year the central system and the real UI have drifted apart, and developers learn to ignore the system because it no longer matches what ships.</p>

<h2>Make adoption the easy path</h2>
<p>A design system only delivers value if people actually use it, and people use whatever is easier than the alternative. If reaching for the system is more work than building something bespoke, the system loses, no matter how elegant it is. So the practical work is largely about reducing friction.</p>
<p>Invest in clear documentation with copy-paste examples, sensible defaults so the common case needs almost no configuration, and low-friction tooling so installing and importing a component is trivial. Run regular office hours or a dedicated channel where teams can ask questions and request additions. When the system is the path of least resistance, adoption stops being something you have to enforce and becomes the natural choice.</p>

<h2>Start small and grow</h2>
<p>You do not need to build everything before launching. Start with the highest-traffic, highest-pain components, get them genuinely good, and expand from there based on what teams actually ask for. A small system that is trusted and used beats an exhaustive one that sits on a shelf. Build for the demand you see, keep the tokens honest, and let the system earn its scope.</p>
`,
  },
  {
    slug: "dark-mode-prefers-color-scheme",
    title: "Designing for Dark Mode",
    category: "CSS",
    date: "2019-04-16",
    image: "/images/insights/dark-mode-prefers-color-scheme.svg",
    imageAlt: "Light and dark theme switching with prefers-color-scheme",
    excerpt:
      "Dark mode went from novelty to expectation. Doing it well is more than inverting colours — it is a second design to maintain.",
    metaKeyword: "dark mode, prefers-color-scheme, theming, css, accessibility",
    html: `
<p>With operating systems rolling out system-wide dark themes, users have started to expect the apps and sites they use to follow suit. The platform made the trigger almost trivial: a media query that reports the user's stated preference, so your site can react the moment someone flips their device into dark mode. But the easy part is detecting the preference. Doing dark mode well takes genuine design thought, because a good dark theme is a second design, not a switch you throw.</p>

<h2>It is not just inverted colours</h2>
<p>The naive approach is to flip black and white and call it done. The result is almost always harsh and unpleasant: pure white text on pure black glares, large blocks of saturated colour vibrate, and the whole interface feels heavier than its light counterpart. Good dark themes are more considered. They use soft off-blacks rather than absolute black, build a small ladder of surface shades to convey elevation and depth, and re-tune accent colours so they still read clearly against a dark background.</p>
<ul>
<li>Respect the system preference automatically, then let users override it explicitly.</li>
<li>Drive both themes from shared design tokens rather than scattered overrides.</li>
<li>Use layered surface shades to express depth, since shadows read poorly on dark backgrounds.</li>
<li>Re-check every contrast ratio, because colours that pass on white can fail on black.</li>
</ul>

<h2>Contrast and accessibility</h2>
<p>Dark mode quietly changes the accessibility maths. A muted grey that comfortably clears the contrast bar against a white background may fall short against a dark one, and a vivid accent that looked fine in light mode can become either too dim or uncomfortably bright. Every text and interactive colour needs to be checked again in the dark palette, not assumed to carry over.</p>
<p>There is also the matter of imagery. Photographs and illustrations designed for a light page can look like glowing rectangles floating in the dark. Logos with white backgrounds, screenshots, and shadows all need attention so they sit naturally in the new context.</p>
<blockquote>Dark mode is a second full design, not a filter applied to the first. Plan from the outset for maintaining two coherent themes from one shared set of tokens.</blockquote>

<h2>Where tokens earn their keep</h2>
<p>This is the moment role-based design tokens prove their worth. If your components reference roles such as surface, border, muted text, and accent rather than literal hex values, then supporting a second theme becomes a matter of providing a second set of values for those roles. The components themselves do not change at all. Switch the variables, and the whole interface re-skins.</p>
<p>Without that discipline, every component that hardcoded a colour becomes a place you have to revisit by hand, and the two themes inevitably drift out of step over time. Tokens turn what would be a sprawling, error-prone effort into a contained one.</p>

<h2>Respect the user's choice</h2>
<p>A final piece of polish is honouring intent. Default to the system preference so users who have chosen dark mode at the OS level are met where they are, but provide an in-app toggle for the many people who want one mode for the system and another for a particular app. Remember the choice between visits, and apply it before the first paint so there is no jarring flash of the wrong theme on load.</p>
<p>Done with care, dark mode is more than a trend to chase. It is a comfort and accessibility win for the users who prefer it, and a sign of craft. Treat it as a real design with its own contrast checks and its own maintenance, and it will hold up as well as your light theme does.</p>
`,
  },
  {
    slug: "gatsby-static-site-boom",
    title: "Gatsby and the Static Site Boom",
    category: "Architecture",
    date: "2019-02-19",
    image: "/images/insights/gatsby-static-site-boom.svg",
    imageAlt: "Static site generation building pages at build time",
    excerpt:
      "Static site generators paired React with build-time rendering, delivering fast, secure sites. It reshaped how content sites get built.",
    metaKeyword: "gatsby, static site generation, jamstack, react, ssg",
    html: `
<p>A new approach to building content sites has gained serious momentum: render every page ahead of time into static files, then serve those files from a CDN. It is not a brand-new idea, but pairing it with a modern component framework changed the equation. Tools like Gatsby let developers build with React, source content from anywhere, and ship a site that is both pleasant to work on and genuinely fast for the people visiting it.</p>

<h2>Why it caught on</h2>
<p>The appeal is easy to understand once you compare it with the traditional model of rendering each page on a server for every request. A pre-rendered page is just a file. There is no database query, no template render, and no server doing work while the user waits. The file is delivered from a CDN location near the visitor, and it arrives quickly and predictably.</p>
<ul>
<li>Build-time rendering for fast, cacheable pages with no per-request server work.</li>
<li>Content pulled from APIs and headless content sources at build time.</li>
<li>A modern React developer experience applied to content-driven sites.</li>
<li>Effortless scaling, because a CDN absorbs traffic spikes without breaking a sweat.</li>
</ul>
<p>There is a security dividend too. With no application server rendering each request, the attack surface shrinks dramatically. There is no live origin running your code in the hot path, which means a whole category of server-side vulnerabilities simply does not apply to a stack of static files on a CDN.</p>

<h2>The decoupling of content and code</h2>
<p>One of the quieter but more important shifts is how content and code come apart. By pulling content from a headless source at build time, editors and developers stop blocking each other. Editors work in a familiar interface, developers build the front-end with the tools they prefer, and a publish action triggers a rebuild that regenerates the affected pages.</p>
<blockquote>For a blog, documentation site, or marketing site, generating static files ahead of time is hard to beat on the three things that matter most: speed, cost, and security.</blockquote>
<p>This separation also future-proofs the content itself. Because it lives as structured data behind an API rather than tangled into page templates, the same content can later feed a different front-end, a mobile app, or a new design without being rewritten.</p>

<h2>Where it strains</h2>
<p>The model is not a universal answer, and it is worth being honest about the limits. Pure static generation works beautifully up to a point, but it strains when a site has many thousands of pages that change frequently. Build times grow with the number of pages, and a small content edit that forces a full rebuild starts to feel slow. Highly personalised or real-time experiences also fight against a model that bakes pages at build time.</p>
<ul>
<li>Build times that balloon as page counts climb into the thousands.</li>
<li>Awkwardness around content that changes minute to minute.</li>
<li>Personalisation, which by nature resists being pre-rendered for everyone.</li>
</ul>

<h2>Where this is heading</h2>
<p>These pain points are already driving the next wave of ideas. Incremental builds that regenerate only what changed, and hybrid approaches that mix static pages with on-demand rendering, are clearly the direction the tooling is moving. But none of that undermines the core insight that made this boom happen in the first place: prebuild what you can and serve it from the edge by default. For the large category of content sites where that fits, it remains one of the best architectural decisions a team can make.</p>
`,
  },
];
