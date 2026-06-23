import { type Metadata } from "next";
import { HeroLight } from "@/components/sections/HeroLight";
import { CTABand } from "@/components/sections/CTABand";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Caption } from "@/components/ui/Caption";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "About",
  description:
    "Softiques is a software development studio that designs and builds websites, apps, games, ERP, and AI/ML products. Engineers, not sloganeers.",
  openGraph: {
    title: "About — Softiques",
    description:
      "Softiques is a software development studio that designs and builds websites, apps, games, ERP, and AI/ML products. Engineers, not sloganeers.",
  },
};

export default function AboutPage() {
  return (
    <>
      {/* 1. Hero */}
      <HeroLight
        kicker="ABOUT"
        headline="Engineers, not sloganeers."
        headlineSize="text-display-lg"
        intro="We're a software studio that designs and ships real products — websites, apps, games, ERP, and AI/ML. Our measure is what runs in production, not what looks good in a deck."
        backgroundImage="/images/hero/about-bg.svg"
      />

      {/* 2. Origin section */}
      <section className="py-5xl max-md:py-3xl bg-bg-light">
        <Container>
          <div className="max-w-[720px] mx-auto">
            <h2 className="text-display-md">Why Softiques exists</h2>
            <div className="mt-2xl space-y-xl">
              <p className="text-body text-text-muted">
                Too much software gets sold as a slide deck and delivered as a
                mess — pretty in the pitch, brittle the moment real users and
                real data show up. The gap between a convincing demo and a
                product that holds up in production is where most projects
                quietly fail. Closing that gap is the entire reason Softiques
                exists.
              </p>
              <p className="text-body text-text-muted">
                We’re a compact, senior team that designs and builds across the
                whole stack: marketing sites and web apps, mobile apps, games,
                ERP platforms, and AI/ML systems. Because the same people carry
                a project from wireframe to deployment, nothing falls through
                the cracks between design, front-end, back-end, and ops.
              </p>
              <p className="text-body text-text-muted">
                We work in a modern, deliberately unglamorous stack — typed,
                tested, and version-controlled — so what we hand over is
                something your own team can read, extend, and own. No mystery
                code. No lock-in. Just software that’s built to last and easy
                to live with.
              </p>
              <p className="text-body text-text-muted">
                Whether you’re a startup shipping a first product or an
                established business modernising what you already run, we plug
                in as one accountable engineering partner — and stay
                accountable to how the product performs after launch, not just
                to the delivery date.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Principles */}
      <section className="py-5xl max-md:py-3xl bg-bg-light border-t border-border-light">
        <Container>
          <div className="max-w-[720px] mx-auto">
            <section className="py-2xl">
              <Caption as="p">01</Caption>
              <h3 className="text-display-md mt-sm">We design for the real world</h3>
              <div className="mt-xl space-y-lg">
                <p className="text-body text-text-muted">
                  Every product we build is designed around what actually
                  happens in use — slow networks, messy data, distracted users,
                  edge cases the happy-path demo never hits. A flow that works
                  in a controlled walkthrough but breaks on a mid-range phone in
                  a tunnel isn’t finished.
                </p>
                <p className="text-body text-text-muted">
                  So we prototype early, test on real devices, and instrument
                  what ships. The questions that shape our architecture are the
                  uncomfortable ones: what happens when the request fails, the
                  payment times out, or ten thousand people arrive at once?
                </p>
              </div>
            </section>

            <section className="py-2xl border-t border-border-light">
              <Caption as="p">02</Caption>
              <h3 className="text-display-md mt-sm">Performance is a feature</h3>
              <div className="mt-xl space-y-lg">
                <p className="text-body text-text-muted">
                  Speed isn’t a polish step at the end — it’s a design
                  constraint from day one. Users abandon slow sites, uninstall
                  janky apps, and quit laggy games. We treat load time, frame
                  rate, and responsiveness as first-class requirements, measured
                  against real budgets.
                </p>
                <p className="text-body text-text-muted">
                  That means lean bundles, sensible caching, optimised assets,
                  and back-ends that stay fast under load. We tune against the
                  metrics that actually move outcomes: Core Web Vitals,
                  crash-free sessions, time-to-interactive, and conversion.
                </p>
              </div>
            </section>

            <section className="py-2xl border-t border-border-light">
              <Caption as="p">03</Caption>
              <h3 className="text-display-md mt-sm">The launch is the start, not the finish</h3>
              <div className="mt-xl space-y-lg">
                <p className="text-body text-text-muted">
                  Plenty of agencies disappear at go-live. A product is never
                  truly done — it needs maintenance, monitoring, security
                  updates, and iteration as you learn what users actually do.
                  We build with that reality in mind from the first commit.
                </p>
                <p className="text-body text-text-muted">
                  Clean architecture, documentation, CI/CD, and observability
                  aren’t extras we tack on — they’re how we work, so the team
                  who owns the product after us (whether that’s us or you) can
                  keep moving fast without breaking things.
                </p>
              </div>
            </section>
          </div>
        </Container>
      </section>

      {/* 4. What we build grid */}
      <section className="py-5xl max-md:py-3xl bg-bg-light border-t border-border-light">
        <Container>
          <SectionHeader
            kicker="WHAT WE BUILD"
            heading="Six capabilities. One team."
            headingSize="text-display-md"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-xl mt-2xl">
            <div className="border border-border-light rounded-md p-lg">
              <Caption>Websites</Caption>
              <p className="text-body-sm text-text-muted mt-sm">
                Marketing sites, storefronts, and web apps
              </p>
            </div>
            <div className="border border-border-light rounded-md p-lg">
              <Caption>Apps</Caption>
              <p className="text-body-sm text-text-muted mt-sm">
                Cross-platform and native mobile apps
              </p>
            </div>
            <div className="border border-border-light rounded-md p-lg">
              <Caption>Games</Caption>
              <p className="text-body-sm text-text-muted mt-sm">
                Mobile, web, and multiplayer experiences
              </p>
            </div>
            <div className="border border-border-light rounded-md p-lg">
              <Caption>ERP</Caption>
              <p className="text-body-sm text-text-muted mt-sm">
                Finance, inventory, HR, and sales platforms
              </p>
            </div>
            <div className="border border-border-light rounded-md p-lg">
              <Caption>AI</Caption>
              <p className="text-body-sm text-text-muted mt-sm">
                Chatbots, copilots, and automation
              </p>
            </div>
            <div className="border border-border-light rounded-md p-lg">
              <Caption>Machine Learning</Caption>
              <p className="text-body-sm text-text-muted mt-sm">
                Prediction, recommendation, and vision
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. CTA */}
      <CTABand />
    </>
  );
}
