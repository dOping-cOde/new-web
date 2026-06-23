import type { LocalArticle } from "./types";

export const articles2028H1: LocalArticle[] = [
  {
    slug: "privacy-preserving-analytics",
    title: "Privacy-First Analytics",
    category: "Privacy",
    date: "2028-01-19",
    image: "/images/insights/privacy-preserving-analytics.svg",
    imageAlt: "Aggregated analytics dashboard with no individual user identifiers",
    excerpt:
      "You can understand product usage without tracking individuals. Privacy-first analytics trades raw events for aggregates, and the trade is worth it.",
    metaKeyword:
      "privacy analytics, cookieless, differential privacy, server-side analytics, GDPR, first-party data",
    html: `
<p>The era of indiscriminate user tracking is over, and not only because regulators say so. Third-party cookies are gone from the major browsers, on-device privacy controls block fingerprinting, and customers increasingly distrust products that hoover up their behaviour. Privacy-first analytics is the discipline of answering the questions a product team actually needs answered while collecting the least possible amount of personal data. The surprising part is how little you give up. Most teams discover they never needed individual-level tracking in the first place; they needed aggregates, and aggregates are exactly what privacy-preserving methods produce.</p>

<h2>What privacy-first analytics actually means</h2>
<p>The phrase covers a family of techniques united by one idea: measure populations, not people. Instead of stitching a user identity across sessions and devices, you collect events that are anonymous by construction, aggregate them server-side, and discard or coarsen anything that could re-identify a person. Done properly, there is no profile to leak, subpoena, or sell.</p>
<ul>
<li><strong>Cookieless, server-side collection</strong> sends events from your own backend so there is no third-party script and no cross-site identifier.</li>
<li><strong>Aggregation at ingestion</strong> rolls events into counts and distributions immediately, so raw per-user logs never accumulate.</li>
<li><strong>Differential privacy</strong> adds calibrated noise to query results, giving a mathematical bound on what any single record can reveal.</li>
</ul>

<h2>Why it matters beyond compliance</h2>
<p>Compliance is the floor, not the reason. Privacy-first analytics removes an entire category of liability: data you never store cannot be breached. It also produces cleaner numbers, because consent banners and ad-blockers no longer silently drop a third of your traffic. And it is a product feature in its own right for any audience that cares where its data goes.</p>
<blockquote>The most valuable property of privacy-first analytics is not legal cover. It is that you can be honest in your privacy policy without lawyering every sentence.</blockquote>

<h2>The trade-offs are real</h2>
<p>This is not a free lunch, and anyone who tells you otherwise is selling something. When you give up individual identity, you give up certain questions. You cannot replay one user's exact session to debug their funnel. You lose precise cross-device attribution. Cohort retention gets fuzzier because you are reasoning about populations rather than tracked individuals.</p>
<ul>
<li>Funnel analysis still works in aggregate, but you cannot drill into a specific person who dropped off.</li>
<li>Differential privacy noise makes small segments unreliable, so very granular slices become statistically meaningless.</li>
<li>Support workflows that relied on session replay need a separate, consented path for diagnostics.</li>
</ul>
<p>The right response is to decide which questions are load-bearing before you instrument anything. Most growth and product decisions need direction and magnitude, not surveillance.</p>

<h2>Pitfalls that quietly re-identify users</h2>
<p>The classic failure is believing data is anonymous when it is not. A timestamp, a coarse location, and a device model can uniquely identify someone in a small population. Free-text fields leak names and emails. High-cardinality custom properties act as a fingerprint. Treat anonymity as something you must prove, not assume.</p>
<p>Audit every property for re-identification risk, cap cardinality, strip free text, and bucket continuous values like age or revenue. Run the test of asking whether any combination of fields could single out one person in your smallest meaningful segment.</p>

<h2>How to adopt it without losing visibility</h2>
<p>Start by writing down the decisions analytics is supposed to inform, then instrument only those. Move collection server-side, aggregate on ingestion, and add a strictly separate, consented channel for the rare cases that genuinely need user-level detail. Keep raw retention short and aggregates long.</p>
<p>Teams that make this shift almost always report the same thing: they lost a pile of dashboards nobody read and kept the handful of numbers that actually drive the roadmap. Privacy-first analytics is less a sacrifice than a forcing function for measuring what matters.</p>
`,
  },
  {
    slug: "green-software-engineering",
    title: "Green Software Engineering",
    category: "Sustainability",
    date: "2028-02-09",
    image: "/images/insights/green-software-engineering.svg",
    imageAlt: "Server rack with a carbon-intensity overlay showing energy usage",
    excerpt:
      "Software has a carbon footprint, and most of it is waste. Green engineering cuts emissions and your cloud bill at the same time.",
    metaKeyword:
      "green software, carbon aware computing, sustainability, cloud efficiency, energy, carbon intensity",
    html: `
<p>Every line of code you run consumes energy, and most of that energy still comes with a carbon cost. Green software engineering is the practice of building systems that deliver the same value with less electricity and, crucially, with that electricity drawn at cleaner times and places. It sits at a rare intersection where doing the responsible thing and doing the cheap thing point in the same direction: efficient software costs less to run and emits less to operate. The teams treating sustainability as a constraint are quietly shrinking their cloud bills as a side effect.</p>

<h2>The three levers of carbon</h2>
<p>Software emissions break down into three controllable factors, and a useful mental model is to attack each one deliberately rather than chasing a single number.</p>
<ul>
<li><strong>Energy efficiency</strong> is doing the same work with fewer cycles: better algorithms, fewer wasted requests, right-sized instances.</li>
<li><strong>Hardware efficiency</strong> is getting more work from the silicon you already provision, through higher utilisation and longer device lifetimes.</li>
<li><strong>Carbon awareness</strong> is shifting flexible work to times and regions where the grid is running on clean power.</li>
</ul>
<p>The first two save money directly. The third often saves money too, because cheap electricity and clean electricity increasingly coincide.</p>

<h2>Carbon-aware computing in practice</h2>
<p>The grid carbon intensity swings hour to hour as wind, solar, and demand shift. Carbon-aware systems exploit that. Batch jobs, model training, backups, and report generation rarely need to run this instant, so you schedule them when the grid is greenest. Multi-region services can route flexible workloads toward cleaner regions.</p>
<blockquote>Demand shifting is the single highest-leverage green technique available to most teams, because it requires no new hardware and no rewrite, only a scheduler that reads carbon intensity.</blockquote>
<p>You do not have to build this from scratch. Public carbon-intensity signals let a scheduler decide when to fire a job, and the difference between running a heavy batch at the dirtiest versus the cleanest hour can exceed a factor of two in emissions.</p>

<h2>Efficiency is the unglamorous workhorse</h2>
<p>Before any clever scheduling, eliminate waste. The largest carbon savings usually come from deleting work that never needed to happen: chatty APIs, unbounded polling, oversized instances idling at five percent utilisation, and caches that were never wired up.</p>
<ul>
<li>Right-size compute and turn off non-production environments outside working hours.</li>
<li>Cache aggressively and collapse N-plus-one queries that hammer the database.</li>
<li>Prefer efficient runtimes and compiled paths for hot code; profile before you optimise.</li>
</ul>
<p>An idle server still draws most of its peak power, so consolidating workloads to keep machines busy is one of the most carbon-effective moves you can make.</p>

<h2>Measure it or it is theatre</h2>
<p>Sustainability claims without measurement are marketing. Instrument energy and estimated emissions the way you instrument latency and cost. Cloud providers expose carbon and energy reports; combine them with your own utilisation metrics to find the hotspots. Set a carbon budget alongside your performance budget.</p>
<p>Beware the pitfalls. Offsets are not reductions, and buying them does not excuse a wasteful architecture. Embodied carbon in hardware is real, so extending device lifetimes matters as much as cutting runtime power. And efficiency gains can evaporate if you simply use the headroom to do more pointless work.</p>

<h2>Make it a default, not a project</h2>
<p>Green software engineering works best baked into ordinary engineering hygiene rather than run as a one-off initiative. Add carbon to your dashboards, make demand shifting the default for batch work, and review utilisation in the same meetings where you review spend. The reward is a system that is leaner, cheaper, and defensible, which is a combination that rarely needs a separate justification.</p>
`,
  },
  {
    slug: "accessibility-automation-eaa",
    title: "Accessibility at Scale",
    category: "Accessibility",
    date: "2028-03-01",
    image: "/images/insights/accessibility-automation-eaa.svg",
    imageAlt: "Screen reader output and keyboard focus indicators on a web form",
    excerpt:
      "Accessibility is now a legal requirement, not a nicety. Automating the checkable parts frees humans to judge what only humans can.",
    metaKeyword:
      "accessibility, WCAG, EAA, a11y automation, screen readers, inclusive design",
    html: `
<p>Accessibility has crossed the line from good practice to legal obligation across most of the markets that matter. The European Accessibility Act and equivalent enforcement elsewhere mean that an inaccessible product is now a compliance risk and a sales blocker, not merely an oversight. But the deeper reason to care has not changed: a meaningful share of your users navigate with a keyboard, a screen reader, magnification, or reduced motion, and a product that excludes them is simply broken for those people. Accessibility at scale is about making the right thing the cheap, automatic, default thing.</p>

<h2>Automate the objective, judge the subjective</h2>
<p>The single most useful framing is to split accessibility into what a machine can verify and what only a person can. Automated tooling reliably catches a large fraction of common defects, but it cannot tell you whether your alt text is meaningful or your focus order makes sense to a human. Pretending automation covers everything is how teams ship a product that passes the linter and fails the user.</p>
<ul>
<li><strong>Automatable</strong>: missing alt attributes, insufficient colour contrast, unlabelled form fields, invalid ARIA, missing language attributes.</li>
<li><strong>Human-only</strong>: whether alt text describes the right thing, whether the reading order is logical, whether an interaction is operable end to end with a screen reader.</li>
</ul>

<h2>Wire checks into the pipeline</h2>
<p>The cheapest accessibility defect is the one caught before merge. Run automated audits in CI on every pull request and fail the build on regressions, exactly as you would for type errors. Add accessibility assertions to component tests so a button that loses its accessible name breaks a test rather than a user.</p>
<blockquote>If accessibility is a quarterly audit, you will be perpetually behind. If it is a CI gate, it stays fixed by default.</blockquote>
<p>Integrate an axe-style engine into your end-to-end tests, lint for common pitfalls in the editor, and surface contrast warnings in the design tooling so problems are caught before code is even written.</p>

<h2>The hard parts machines miss</h2>
<p>Automation gives false confidence precisely because it is good at the easy cases. The defects that actually lock people out tend to be the ones tooling cannot see: a custom dropdown that traps keyboard focus, a modal that never returns focus on close, a drag interaction with no keyboard alternative, or dynamic content that never announces itself to assistive technology.</p>
<ul>
<li>Test every flow with the keyboard alone, then with an actual screen reader.</li>
<li>Verify focus management on every route change, modal, and async update.</li>
<li>Respect the reduced-motion preference and never convey information by colour alone.</li>
</ul>
<p>There is no substitute for using your product the way a disabled person does. Budget time for it on real assistive technology, not just emulators.</p>

<h2>Build it into the component layer</h2>
<p>Scaling accessibility means solving each problem once, in shared components, rather than re-litigating it on every page. A well-built design system bakes in semantic markup, focus handling, labels, and contrast-safe tokens, so product engineers inherit accessibility for free. Reaching for accessible primitives instead of hand-rolling interactive widgets eliminates whole classes of defects.</p>
<p>This is where the leverage is. One correct, accessible dialog component used five hundred times beats five hundred bespoke dialogs each broken in their own way.</p>

<h2>Treat it as a quality bar, not a checklist</h2>
<p>The teams that get accessibility right stop thinking of it as a list to satisfy and start treating it as part of what done means. Automate the objective checks so humans are not wasting attention on contrast ratios, reserve human testing for the judgement calls, and centralise the hard interactions in shared components. The result is a product that is compliant, usable by everyone, and cheaper to maintain than the alternative of bolting accessibility on under legal pressure.</p>
`,
  },
  {
    slug: "ai-assisted-code-review",
    title: "AI-Assisted Code Review",
    category: "AI",
    date: "2028-03-22",
    image: "/images/insights/ai-assisted-code-review.svg",
    imageAlt: "Pull request diff annotated with automated review comments",
    excerpt:
      "AI reviewers catch the boring defects so humans can focus on design. The mistake is letting the machine have the final word.",
    metaKeyword:
      "code review, AI code review, pull requests, static analysis, developer productivity, LLM",
    html: `
<p>Code review is the highest-leverage quality gate most teams have, and also the one engineers most resent for its drudgery. AI-assisted review changes the economics by taking over the mechanical, pattern-matching parts of the job: the missed null check, the resource that is never closed, the test that asserts nothing. Used well, it does not replace the human reviewer; it clears the underbrush so the human can spend their scarce attention on the things that genuinely require judgement. Used badly, it becomes a rubber stamp that launders bad code through an authoritative-sounding bot.</p>

<h2>What the machine is genuinely good at</h2>
<p>Large language models are strong at exactly the kind of local, contextual pattern recognition that traditional linters cannot do and humans find tedious. They read a diff, understand surrounding code, and flag plausible defects in prose a reviewer can act on.</p>
<ul>
<li>Spotting unhandled error paths, off-by-one logic, and resource leaks that pass type checks.</li>
<li>Noticing missing or weak test coverage for the change at hand.</li>
<li>Flagging inconsistent naming, dead code, and deviations from project conventions.</li>
<li>Drafting the boring half of a review so the human can focus on the interesting half.</li>
</ul>

<h2>Where it falls down</h2>
<p>The failure modes are as important as the strengths, and they are not subtle. An AI reviewer has no model of your business, your threat landscape, or why a seemingly odd workaround exists. It will confidently object to correct code and confidently miss a subtle race condition. It cannot tell you that a feature is the wrong feature.</p>
<blockquote>The danger of an AI reviewer is not that it is wrong sometimes. It is that it is wrong in a fluent, confident voice that lulls tired engineers into agreeing.</blockquote>
<p>It also struggles with anything requiring cross-file or system-level reasoning, and it has no sense of architectural intent. A change that is locally fine but globally corrosive sails straight through.</p>

<h2>The trade-offs to weigh</h2>
<p>Adopting AI review is a balance, not a default yes. The benefits are faster feedback and freed-up senior time; the costs are reviewer complacency, noise, and a tooling bill.</p>
<ul>
<li><strong>Signal versus noise</strong>: a chatty reviewer that comments on everything trains people to ignore it, including when it is right.</li>
<li><strong>Latency versus depth</strong>: instant inline feedback is valuable, but only if it does not bury the two comments that matter under twenty that do not.</li>
<li><strong>Privacy</strong>: sending proprietary code to a third-party model is a real exposure; weigh self-hosted options for sensitive repositories.</li>
</ul>

<h2>Keep the human in the loop</h2>
<p>The non-negotiable rule is that the AI reviews, the human decides. Treat machine comments as suggestions to triage, never as approvals. The reviewer of record is still a person who is accountable for the merge, and that accountability is what keeps the bot honest.</p>
<p>Practically, that means the AI should never be able to approve a pull request on its own, its comments should be clearly labelled as machine-generated, and engineers should be encouraged to dismiss false positives without ceremony. A reviewer who cannot disagree with the bot is not reviewing.</p>

<h2>Adopt it as an assistant, not an authority</h2>
<p>The teams getting real value from AI review treat it like a sharp, fast, slightly unreliable junior reviewer: helpful for catching the obvious, never trusted with the call. Tune it for high signal, scope it away from your most sensitive code if privacy demands, and keep a human firmly on the hook for every decision. Do that, and you get faster reviews and more senior attention on the design questions that actually move the needle, without outsourcing your judgement to a model that does not have any.</p>
`,
  },
  {
    slug: "database-branching-parity",
    title: "Database Branching and Dev Parity",
    category: "Tooling",
    date: "2028-04-12",
    image: "/images/insights/database-branching-parity.svg",
    imageAlt: "Branching diagram of isolated database copies per pull request",
    excerpt:
      "Branch your database like you branch your code, and the gap between local, preview, and production finally starts to close.",
    metaKeyword:
      "database branching, dev parity, preview environments, migrations, copy on write, schema",
    html: `
<p>Code branching solved a problem for source code decades ago, but the database stubbornly stayed a shared, mutable singleton. The result is the oldest friction in web development: works on my machine, breaks in production, because nobody's local database resembles the real one. Database branching closes that gap by letting every branch, pull request, and developer spin up an isolated, production-shaped copy of the database in seconds. It is one of those capabilities that sounds like a luxury until you have it, after which the old way feels indefensible.</p>

<h2>What database branching is</h2>
<p>A database branch is an isolated, writable copy of a database created near-instantly using copy-on-write storage. You do not duplicate the data physically; you share the underlying pages and only diverge where a branch writes. That makes a branch cheap enough to create per pull request and throw away on merge.</p>
<ul>
<li>Each branch gets the production schema and a realistic dataset without a multi-hour restore.</li>
<li>Schema changes can be tested against real data shape in isolation, then merged like code.</li>
<li>Preview deployments get their own database, so a reviewer sees the feature with its migrations applied.</li>
</ul>

<h2>Why parity is the real prize</h2>
<p>The deepest value is not the convenience of fresh databases; it is the collapse of the dev-prod gap. Bugs caused by a different schema, missing indexes, or unrealistic data distributions get caught in review instead of in production. A migration that locks a large table or a query that is fine on ten rows and catastrophic on ten million reveals itself before launch.</p>
<blockquote>Most production database incidents are not exotic. They are the predictable consequence of testing against data that looks nothing like the real thing.</blockquote>
<p>When every preview environment runs the actual migration against production-shaped data, the scary part of a release moves earlier, where it is cheap to fix.</p>

<h2>The migration workflow it enables</h2>
<p>Database branching makes schema change reviewable. A developer opens a branch, applies the migration, and the team can inspect the resulting schema diff alongside the code diff. Destructive or locking changes become visible before they reach the shared environment.</p>
<ul>
<li>Apply migrations on a branch and surface the schema delta in the pull request.</li>
<li>Run the application test suite against the branched database to catch breaking changes.</li>
<li>Promote the verified migration on merge rather than running it blind against production.</li>
</ul>

<h2>The trade-offs and pitfalls</h2>
<p>This is not free of sharp edges. The biggest is production data in branches: copying real customer records into dozens of ephemeral environments is a privacy and compliance hazard. Most teams need anonymised or synthetic datasets, which then must stay representative enough to be useful.</p>
<ul>
<li><strong>Data sensitivity</strong>: branch from masked data, never raw production records, unless access is tightly controlled.</li>
<li><strong>Drift</strong>: a long-lived branch can fall behind the main schema, so reset branches frequently.</li>
<li><strong>Cost and sprawl</strong>: copy-on-write is cheap, but thousands of forgotten branches still add up; expire them automatically.</li>
</ul>

<h2>Make ephemeral the default</h2>
<p>The teams that benefit most treat branched databases as disposable infrastructure: created per pull request, seeded with safe data, and deleted on merge without a second thought. Combine that with migrations reviewed as schema diffs and preview environments backed by their own database, and the chronic dev-prod parity problem largely dissolves. The database stops being the one piece of your stack that does not follow your branching model, and your releases get noticeably less frightening as a result.</p>
`,
  },
  {
    slug: "composable-commerce",
    title: "Composable Commerce",
    category: "Architecture",
    date: "2028-05-03",
    image: "/images/insights/composable-commerce.svg",
    imageAlt: "Commerce platform assembled from independent headless services",
    excerpt:
      "Composable commerce swaps the monolithic platform for best-of-breed services. The flexibility is real, and so is the integration tax.",
    metaKeyword:
      "composable commerce, headless commerce, MACH, ecommerce architecture, microservices, API first",
    html: `
<p>For two decades, serious commerce meant buying a monolithic platform that did everything adequately and nothing exceptionally. Composable commerce is the rejection of that bargain. Instead of one suite owning catalog, cart, checkout, search, content, and payments, you assemble best-of-breed services, each headless and API-first, into a system tailored to your business. The upside is genuine: you can replace any piece without a re-platform, and you are never held hostage by a vendor's roadmap. The downside is equally genuine: you have just signed up to own the integration that the monolith used to handle for you.</p>

<h2>The MACH principles underneath</h2>
<p>Composable commerce is usually built on a set of architectural commitments often summarised as microservices, API-first, cloud-native, and headless. The point of naming them is that they are a package; cherry-picking the headless part without the others gives you most of the cost and little of the benefit.</p>
<ul>
<li><strong>Headless</strong> separates the front-end experience from the commerce logic, so the storefront is yours to build.</li>
<li><strong>API-first</strong> means every capability is reachable as a service, enabling composition in the first place.</li>
<li><strong>Microservices</strong> let each domain scale and deploy independently rather than as one release.</li>
</ul>

<h2>Why teams move to it</h2>
<p>The motivation is rarely a love of architecture for its own sake. It is the pain of a monolith that cannot keep up. A composable stack lets the search team adopt a superior search engine without touching checkout, lets the content team ship campaigns without a deployment, and lets you serve web, mobile, and emerging channels from one set of APIs.</p>
<blockquote>You go composable when the cost of being constrained by your platform finally exceeds the cost of integrating several of them.</blockquote>
<p>That threshold is real, and it arrives later than vendors imply. For a small catalog and a standard checkout, a good monolith is often the correct, boring answer.</p>

<h2>The integration tax nobody mentions in the demo</h2>
<p>Here is the trade-off that decides projects. Every service you compose is a contract, a failure mode, a billing relationship, and a piece of latency you now own. The monolith handled the seams between catalog, cart, and checkout internally; composable makes those seams your responsibility.</p>
<ul>
<li>You build and maintain an orchestration layer that the platform used to provide for free.</li>
<li>Data consistency across independent services becomes your problem, especially around pricing, inventory, and orders.</li>
<li>Observability spans many vendors, so debugging a failed checkout means tracing across systems you do not control.</li>
</ul>
<p>None of this is a reason to avoid composable. It is a reason to staff for it honestly and not believe a demo that glosses over the glue code.</p>

<h2>Where the architecture earns its keep</h2>
<p>The design pays off most for businesses with genuine differentiation needs: unusual catalog structures, complex pricing, many sales channels, or a customer experience that is itself the product. For these, owning the seams is worth it because the alternative is contorting the business to fit a suite.</p>
<p>It pays off least for straightforward storefronts, where the integration burden buys flexibility you will never exercise. Be ruthless about which capabilities truly need to be best-of-breed versus good-enough.</p>

<h2>Compose deliberately, not reflexively</h2>
<p>Composable commerce is a powerful pattern that has become a fashionable default, which is exactly when it gets misapplied. Adopt it where flexibility and differentiation justify owning the integration, and resist it where a capable monolith would ship faster and cost less to run. Either way, budget for the orchestration layer, the cross-service consistency work, and the multi-vendor observability up front. The teams that succeed treat composition as an engineering commitment, not a procurement decision.</p>
`,
  },
  {
    slug: "micro-frontends-v2",
    title: "Micro-Frontends, Revisited",
    category: "Architecture",
    date: "2028-05-24",
    image: "/images/insights/micro-frontends-v2.svg",
    imageAlt: "Single page composed from independently deployed frontend modules",
    excerpt:
      "Micro-frontends solve an organisational problem disguised as a technical one. If you do not have that problem, do not adopt them.",
    metaKeyword:
      "micro-frontends, module federation, frontend architecture, team autonomy, monorepo, web",
    html: `
<p>Micro-frontends arrived with the same breathless promises that microservices did, and have earned the same hard-won caveats. The idea is to split a single web application into independently developed, deployed, and owned pieces, each shipped by a different team. After several years of real-world scar tissue, the verdict is clearer than it once was: micro-frontends are a solution to an organisational scaling problem, and applying them to anything else is a self-inflicted wound. Revisiting them today means being honest about when they help and how badly they hurt when misused.</p>

<h2>The problem they actually solve</h2>
<p>Micro-frontends exist for one reason: to let many teams ship to the same application without coordinating every release. When fifty engineers across eight teams all commit to one front-end, the build slows, the release train clogs, and ownership blurs. Splitting the app lets each team deploy on its own cadence with its own pipeline.</p>
<ul>
<li>Independent deployment, so one team's release does not block another's.</li>
<li>Clear ownership boundaries that map to team boundaries.</li>
<li>The ability to evolve, or even rewrite, one section without touching the rest.</li>
</ul>
<p>Notice that every benefit is organisational. None of them makes the application faster or simpler for the user; if anything, the opposite.</p>

<h2>The costs are paid by users and by you</h2>
<p>The trade-offs are steep and easy to underestimate in a proof of concept. Multiple independently built bundles tend to ship duplicate copies of the same framework, bloating download size. Shared state across boundaries becomes awkward. Consistent styling fractures unless rigorously governed.</p>
<blockquote>A micro-frontend architecture can turn a single fast page into a slow patchwork of mismatched bundles, each loading its own copy of the same library.</blockquote>
<ul>
<li><strong>Bundle duplication</strong> inflates payload unless you carefully share dependencies, which reintroduces coupling.</li>
<li><strong>Consistency drift</strong> means design and behaviour diverge between sections owned by different teams.</li>
<li><strong>Integration complexity</strong> in routing, authentication, and cross-module communication becomes a permanent tax.</li>
</ul>

<h2>When the answer is no</h2>
<p>For a single team, or even a few well-coordinated teams, micro-frontends are almost always the wrong call. A monorepo with a shared component library gives you most of the ownership clarity with none of the runtime cost. The complexity of composing independently deployed modules is justified only when team-scale coordination is the genuine bottleneck.</p>
<p>The most common mistake is adopting the pattern for its architectural elegance rather than to relieve an actual coordination pain. If your release process is not blocked by inter-team contention, you are buying complexity you do not need.</p>

<h2>If you must, contain the blast radius</h2>
<p>When micro-frontends are genuinely warranted, the discipline that makes them survivable is ruthless about a few things. Share the core framework and design system as singletons so you do not ship five copies. Define hard contracts at the boundaries. Keep cross-module communication explicit and minimal.</p>
<ul>
<li>Enforce a shared dependency baseline so bundles do not duplicate the runtime.</li>
<li>Centralise the design system and tokens to fight consistency drift.</li>
<li>Treat module boundaries as versioned contracts, not casual imports.</li>
</ul>

<h2>A tool, not a trophy</h2>
<p>Micro-frontends are neither the future of front-end nor an anti-pattern; they are a specialised tool for a specialised problem. Reach for them when independent team deployment is the constraint throttling your delivery, and ignore the hype everywhere else. The teams that regret adopting them almost always did so to feel modern rather than to solve a measured bottleneck. Match the architecture to the org chart, not to the conference talk, and you will rarely go wrong.</p>
`,
  },
  {
    slug: "fine-tune-vs-rag",
    title: "Fine-Tune, Prompt, or RAG?",
    category: "AI",
    date: "2028-06-14",
    image: "/images/insights/fine-tune-vs-rag.svg",
    imageAlt: "Decision diagram comparing prompting, retrieval, and fine-tuning",
    excerpt:
      "Prompting, retrieval, and fine-tuning solve different problems. Most teams reach for fine-tuning when they actually needed RAG.",
    metaKeyword:
      "RAG, fine-tuning, prompt engineering, LLM, retrieval augmented generation, AI architecture",
    html: `
<p>The most common architectural mistake in applied AI is reaching for the wrong customisation technique. A team wants their model to know about their internal documents, so they try to fine-tune it; or they want a different output style, so they build an elaborate retrieval pipeline. Prompting, retrieval-augmented generation, and fine-tuning are not competing options on a quality ladder. They solve genuinely different problems, and choosing among them correctly is the difference between a system that works cheaply and one that is expensive, brittle, and still wrong. Here is the decision the way experienced teams actually make it.</p>

<h2>Start with prompting, always</h2>
<p>Prompt engineering is the cheapest, fastest, and most underrated lever. A clear instruction, a few good examples, and a well-structured context window solve a remarkable share of real problems with zero infrastructure. It costs nothing to change and is trivial to iterate on.</p>
<ul>
<li>Use it to shape tone, format, and reasoning style.</li>
<li>Use it for tasks the base model already understands but needs steering on.</li>
<li>Exhaust it before building anything heavier, because everything heavier is also harder to maintain.</li>
</ul>
<p>The trap is skipping this step because it feels too simple. A lot of supposed fine-tuning needs evaporate under a better prompt.</p>

<h2>RAG is for knowledge, not behaviour</h2>
<p>Retrieval-augmented generation is the right answer when the problem is that the model does not know your facts. You retrieve relevant documents at query time and put them in the context, so the model reasons over current, proprietary, or frequently changing information it was never trained on.</p>
<blockquote>If your problem is what the model knows, you almost certainly want retrieval. If your problem is how the model behaves, retrieval will not help you.</blockquote>
<ul>
<li>It keeps knowledge fresh, because updating a document store is instant compared to retraining.</li>
<li>It is auditable, since you can show which sources informed an answer.</li>
<li>It reduces fabrication by grounding responses in retrieved evidence.</li>
</ul>
<p>The catch is that RAG quality is retrieval quality. Bad chunking, weak embeddings, or poor ranking produce confident answers grounded in the wrong passage.</p>

<h2>Fine-tuning is for behaviour, not knowledge</h2>
<p>Fine-tuning changes how the model responds, not what it knows. It is the right tool when you need a consistent style, a specialised format, or a narrow task performed reliably at lower cost than a large prompt. It is the wrong tool for injecting facts, because facts change and retraining is slow and expensive.</p>
<ul>
<li>Use it to bake in a house voice, a structured output format, or domain-specific phrasing.</li>
<li>Use it to shrink prompts and latency once a pattern is stable and high-volume.</li>
<li>Do not use it to teach facts; they go stale and you cannot easily correct one wrong answer.</li>
</ul>

<h2>The combinations that actually ship</h2>
<p>In practice the strongest systems blend techniques. A fine-tuned model that reliably produces your output format, fed by a RAG pipeline that supplies current facts, steered by a tight prompt, beats any single approach. The discipline is adding each layer only when the simpler one provably falls short.</p>
<p>The pitfalls cluster at the extremes: teams that fine-tune first burn money solving a retrieval problem, while teams that never fine-tune fight their prompt forever trying to enforce a behaviour the model resists.</p>

<h2>Choose by the question, not the trend</h2>
<p>Ask one question before you build: is the gap about knowledge or behaviour? Knowledge gaps point to retrieval; behaviour gaps point to fine-tuning; and almost everything starts with a better prompt. Layer deliberately, measure whether each addition earns its complexity, and resist the pull to fine-tune because it sounds more serious. The teams that ship reliable AI features are the ones that matched the technique to the problem instead of to the hype.</p>
`,
  },
  {
    slug: "passkeys-enterprise",
    title: "Passkeys for the Enterprise",
    category: "Security",
    date: "2028-06-28",
    image: "/images/insights/passkeys-enterprise.svg",
    imageAlt: "Passkey authentication prompt replacing a traditional password field",
    excerpt:
      "Passkeys kill the password and the phishing attack that exploits it. The enterprise rollout is mostly about recovery and lifecycle.",
    metaKeyword:
      "passkeys, WebAuthn, FIDO2, passwordless, phishing resistant, enterprise authentication",
    html: `
<p>Passwords have been the weakest link in security for so long that we stopped noticing. They get phished, reused, leaked, and brute-forced, and every mitigation we bolt on, from rotation policies to one-time codes, adds friction without fixing the root cause. Passkeys finally fix the root cause. Built on WebAuthn and FIDO2, they replace the shared secret with a private key that never leaves the user's device and that, by design, cannot be phished. For consumer apps the case is already settled. The interesting question now is the enterprise rollout, where the technology is the easy part and lifecycle is the hard part.</p>

<h2>Why passkeys end phishing</h2>
<p>The security argument is not incremental, it is categorical. A passkey is a public-private key pair bound to a specific origin. The private key stays on the authenticator and signs a challenge; the server only ever sees the public key. There is no secret to steal, type into a fake site, or replay.</p>
<ul>
<li><strong>Phishing-resistant by construction</strong>: the credential only works on the real origin, so a lookalike domain gets nothing usable.</li>
<li><strong>Nothing reusable to breach</strong>: a server compromise leaks public keys, which are useless to an attacker.</li>
<li><strong>No shared secret</strong>: there is no password to forget, rotate, or reuse across sites.</li>
</ul>

<h2>The enterprise distinction that matters most</h2>
<p>The single most important decision in an enterprise deployment is synced versus device-bound passkeys, because it is a direct trade between convenience and assurance. Synced passkeys roam through a cloud keychain, so a user who loses a laptop still has their credential on a phone. Device-bound passkeys, typically on a hardware security key, never leave that device.</p>
<blockquote>Synced passkeys optimise for the user who must not be locked out. Device-bound passkeys optimise for the admin who must guarantee where a credential physically lives.</blockquote>
<p>High-assurance environments often mandate device-bound hardware keys for privileged accounts and allow synced passkeys for the general workforce. Picking one policy for everyone is usually the wrong answer.</p>

<h2>Recovery is the real project</h2>
<p>Here is the uncomfortable truth: rolling out passkeys is mostly a recovery and lifecycle exercise, not an authentication one. The login flow is trivial. What consumes the project is what happens when someone loses every device, joins, leaves, or needs a new credential provisioned securely.</p>
<ul>
<li>Account recovery must be as phishing-resistant as the passkey itself, or it becomes the new weakest link.</li>
<li>Onboarding needs a trusted way to register the first credential without a password fallback that reopens the hole.</li>
<li>Offboarding must revoke credentials cleanly across synced and device-bound authenticators.</li>
</ul>
<p>A passkey deployment with a weak help-desk reset process has simply moved the attack from the password to the recovery flow.</p>

<h2>Pitfalls and the transition reality</h2>
<p>The biggest operational pitfall is keeping the password as a silent fallback. If a user can always click forgot password and authenticate with a one-time code, you have not removed phishing, you have hidden it. The transition has to be deliberate.</p>
<ul>
<li>Enrol passkeys broadly first, then disable password login per cohort once coverage is proven.</li>
<li>Account for shared devices, kiosks, and legacy systems that may not support WebAuthn yet.</li>
<li>Plan for cross-platform gaps where a user's authenticator is not present on the device in front of them.</li>
</ul>

<h2>Commit to the endgame</h2>
<p>Passkeys are not a stronger password; they are the removal of the password as an attack surface, and they only deliver that if you eventually turn the password off. Choose your synced versus device-bound policy by assurance level, treat recovery and lifecycle as the core of the project, and resist leaving a phishable fallback in place out of caution. The enterprises that do this right do not just reduce credential risk; they eliminate the single most exploited vector in their environment for good.</p>
`,
  },
];
