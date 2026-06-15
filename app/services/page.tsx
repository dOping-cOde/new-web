import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/lib/services";
import { HeroLight } from "@/components/sections/HeroLight";
import { CTABand } from "@/components/sections/CTABand";
import { Caption } from "@/components/ui/Caption";
import { Pill } from "@/components/ui/Pill";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";
import { serviceJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Four AI engineering capabilities: enterprise analytics, autonomous agents, conversational intelligence, and data infrastructure.",
  openGraph: {
    title: "Services — Softwires",
    description:
      "Four AI engineering capabilities: enterprise analytics, autonomous agents, conversational intelligence, and data infrastructure.",
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <>
      {/* Service JSON-LD schemas — one per service (SEO-06) */}
      {SERVICES.map((service) => (
        <script
          key={`ld-${service.id}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceJsonLd(service)).replace(/</g, "\\u003c"),
          }}
        />
      ))}

      {/* Page Hero */}
      <HeroLight
        kicker="SERVICES"
        headline="Four capabilities. One engineering team."
        headlineSize="text-display-lg"
        intro="We build AI systems end-to-end — from research prototype to production deployment. Each capability is backed by shipped work, not slide decks."
        backgroundImage="/images/hero/services-bg.svg"
      />

      {/* Service grid — each links to its dedicated page */}
      <section className="py-5xl max-md:py-3xl bg-bg-light border-b border-border-light">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
            {SERVICES.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className={cn(
                  "group block",
                  "border border-border-light rounded-lg p-xl",
                  "bg-surface",
                  "transition-all duration-normal",
                  "hover:-translate-y-1 hover:shadow-sm"
                )}
              >
                <Caption className="text-text-muted">
                  {service.number} · {service.label}
                </Caption>
                <h2 className="text-h3 mt-sm text-text group-hover:text-accent transition-colors duration-fast">
                  {service.title}
                </h2>
                <p className="text-body-sm text-text-muted mt-md line-clamp-3">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-xs mt-lg">
                  {service.techStack.slice(0, 4).map((tech) => (
                    <Pill key={tech} as="span">
                      {tech}
                    </Pill>
                  ))}
                </div>
                <span className="text-body-sm text-accent mt-lg inline-block">
                  Explore capability &rarr;
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Engagement Model Band */}
      <section className="bg-bg-light py-5xl">
        <Container>
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-display-md text-center text-text">
              How we work.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2xl mt-2xl">
              <div>
                <h3 className="text-h3 text-text">Discovery</h3>
                <span className="text-mono-sm text-text-muted block mt-sm">
                  2 weeks
                </span>
                <p className="text-body-sm text-text-muted mt-md">
                  We scope the problem precisely before writing a line of code.
                  Technical discovery sessions, data audits, integration mapping,
                  and a fixed-price statement of work. No ambiguity before build
                  starts.
                </p>
              </div>
              <div>
                <h3 className="text-h3 text-text">Build</h3>
                <span className="text-mono-sm text-text-muted block mt-sm">
                  4–12 weeks
                </span>
                <p className="text-body-sm text-text-muted mt-md">
                  Engineering sprints with weekly demos and milestone gates. We
                  ship working systems, not prototypes — every sprint deliverable
                  runs in your environment with your data. No black boxes.
                </p>
              </div>
              <div>
                <h3 className="text-h3 text-text">Operate</h3>
                <span className="text-mono-sm text-text-muted block mt-sm">
                  Ongoing
                </span>
                <p className="text-body-sm text-text-muted mt-md">
                  Post-launch monitoring, model drift detection, retraining
                  pipelines, and operational support. We stay accountable to
                  production performance, not just delivery metrics.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Band */}
      <CTABand />
    </>
  );
}
