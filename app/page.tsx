import type { Metadata } from "next";
import { VideoHero } from "@/components/sections/VideoHero";
import { HeroMascot } from "@/components/sections/HeroMascot";
import { ServiceTile } from "@/components/cards/ServiceTile";
import { ManifestoBand } from "@/components/sections/ManifestoBand";
import { CTABand } from "@/components/sections/CTABand";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Caption } from "@/components/ui/Caption";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { CAPABILITIES } from "@/content/services";
import { websiteJsonLd } from "@/lib/jsonld";

// Override template title for home page — full brand name as title
export const metadata: Metadata = {
  title: "Softiques — Software Development Studio",
  description:
    "Softiques is a software development studio building websites, web & mobile apps, games, ERP platforms, and AI/ML solutions that ship.",
  openGraph: {
    title: "Softiques — Software Development Studio",
    description:
      "Websites, apps, games, ERP, and AI/ML — designed, built, and shipped by one accountable engineering team.",
  },
};

/**
 * Home page — primary entry point.
 * Sections: Hero → Capability Strip → Why Softiques (dark) → Manifesto → CTA
 * Server Component.
 */
export default function Home() {
  return (
    <>
      {/* WebSite JSON-LD — home page only (SEO-05) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd()).replace(/</g, "\\u003c"),
        }}
      />
      {/* ===== Section 1: Video Hero (full viewport, dark bg) ===== */}
      <VideoHero
        headline="We build software that ships."
        highlightWord="ships"
        subheadline="Softiques is a software development studio. We design and build websites, apps, games, ERP platforms, and AI/ML products — from first wireframe to production."
        primaryCTA={{ label: "Explore services", href: "/services" }}
        secondaryCTA={{ label: "Book Free Consultation", href: "/contact" }}
        aside={<HeroMascot />}
      />


      {/* ===== Section 2: Capability strip (light bg) ===== */}
      <section className="bg-bg-light py-5xl max-md:py-3xl">
        <Container>
          <ScrollReveal>
            <SectionHeader
              kicker="WHAT WE BUILD"
              heading="Six things we build well."
              headingSize="text-display-md"
            />

            {/* 3×2 grid on desktop, 2-col on tablet, 1-col on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl mt-2xl">
              {CAPABILITIES.map((capability) => (
                <ServiceTile
                  key={capability.id}
                  title={capability.title}
                  description={capability.description}
                  tag={capability.tag}
                  href={`/services/${capability.id}`}
                />
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* ===== Section 3: Why Softiques (DARK section, full-bleed) ===== */}
      <section
        data-theme="dark"
        className="bg-bg-dark text-text-inverted py-5xl max-md:py-3xl"
      >
        <Container>
          <Caption as="p" className="text-text-muted-dark">
            WHY SOFTIQUES
          </Caption>

          <h2 className="text-display-lg text-text-inverted mt-lg max-w-[820px]">
            One team, from idea to production.
          </h2>

          {/* 2-column layout: lead copy left, supporting points right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2xl mt-2xl">
            <div>
              <p className="text-body-lg text-text-muted-dark">
                Most projects stall in the handoffs — between design and
                engineering, front-end and back-end, launch and maintenance.
                We collapse those seams. The people who design your product
                are the people who build, ship, and keep it running. One
                roadmap, one point of accountability, one bill.
              </p>
            </div>

            <div className="space-y-lg">
              <div className="border-l-2 border-accent pl-lg">
                <h3 className="text-h3 text-text-inverted">Full-stack, genuinely</h3>
                <p className="text-body-sm text-text-muted-dark mt-sm">
                  Design, web, mobile, back-end, and ML under one roof — so the
                  edges between systems are handled by us, not left to you.
                </p>
              </div>
              <div className="border-l-2 border-accent pl-lg">
                <h3 className="text-h3 text-text-inverted">Built to hand over</h3>
                <p className="text-body-sm text-text-muted-dark mt-sm">
                  Typed, tested, documented code on a modern stack. No lock-in —
                  your team can read and extend everything we deliver.
                </p>
              </div>
              <div className="border-l-2 border-accent pl-lg">
                <h3 className="text-h3 text-text-inverted">Measured in production</h3>
                <p className="text-body-sm text-text-muted-dark mt-sm">
                  Speed, uptime, crash-free sessions, conversion. We optimise for
                  what users feel, not what looks good in a slide.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-2xl">
            <Button
              variant="secondary"
              href="/services"
              arrow
              className="border-border-dark text-text-inverted hover:border-accent hover:text-accent"
            >
              See how we work
            </Button>
          </div>
        </Container>
      </section>

      {/* ===== Section 4: Manifesto ===== */}
      <ManifestoBand />

      {/* ===== Section 5: CTA Band ===== */}
      <CTABand />
    </>
  );
}
