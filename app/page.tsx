import type { Metadata } from "next";
import Link from "next/link";
import { HeroLight } from "@/components/sections/HeroLight";
import { ServiceTile } from "@/components/cards/ServiceTile";
import { PortfolioCard } from "@/components/cards/PortfolioCard";
import { ManifestoBand } from "@/components/sections/ManifestoBand";
import { CTABand } from "@/components/sections/CTABand";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatBlock } from "@/components/ui/StatBlock";
import { Button } from "@/components/ui/Button";
import { Caption } from "@/components/ui/Caption";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { CAPABILITIES } from "@/content/services";
import { HeroParticleFieldLoader } from "@/components/three/HeroParticleFieldLoader";

// Override template title for home page — full brand name as title
export const metadata: Metadata = {
  title: "Softwires Technologies — AI Engineering for the Physical World",
  description:
    "Softwires builds AI systems that monitor transformers, inspect bridges, screen for cancer, and detect fraud. Deployed in production across India and beyond.",
};

// Featured portfolio cards — hardcoded per spec (4 of the Tier A case studies)
// TODO: replace placeholder hero images with real photography
const FEATURED_CARDS = [
  {
    slug: "bridgesense",
    title: "BridgeSense",
    category: "Infrastructure",
    subcategory: "LiDAR · Computer Vision",
    excerpt:
      "Drone-mounted LiDAR system detecting 1.5–3mm structural changes across bridges and viaducts with 0.92 F1-score accuracy.",
    heroImage: "",
    heroImageAlt: "BridgeSense — LiDAR point-cloud bridge inspection dashboard",
  },
  {
    slug: "salt-lick",
    title: "Salt-Lick",
    category: "Healthcare",
    subcategory: "Clinical AI · Risk Scoring",
    excerpt:
      "Cancer risk stratification platform triaging patients across spoke-hub networks before symptoms progress to late stage.",
    heroImage: "",
    heroImageAlt: "Salt-Lick — cancer risk stratification dashboard",
  },
  {
    slug: "ai-copter",
    title: "AI-Copter",
    category: "Infrastructure",
    subcategory: "Drones · Computer Vision",
    excerpt:
      "Autonomous aerial inspection system combining drone telemetry with real-time AI analysis for large-scale infrastructure surveys.",
    heroImage: "",
    heroImageAlt: "AI-Copter — drone inspection operations dashboard",
  },
  {
    slug: "fwa-platform",
    title: "FWA Platform",
    category: "Insurance",
    subcategory: "Fraud Detection · AI Agents",
    excerpt:
      "Fraud, waste, and abuse detection system processing insurance claims at scale with automated investigation and flagging.",
    heroImage: "",
    heroImageAlt: "FWA Platform — fraud detection and case management dashboard",
  },
];

/**
 * Home page — primary entry point for technical buyers.
 * Sections: Hero → Capability Strip → Featured Case Study (dark) → Portfolio Teaser → Manifesto → CTA
 * Server Component.
 */
export default function Home() {
  return (
    <main>
      {/* ===== Section 1: Hero (full viewport, light bg) ===== */}
      <HeroLight
        headline="AI engineered for the physical world."
        highlightWord="engineered"
        headlineSize="text-display-xl"
        intro="Softwires builds AI systems that monitor transformers, inspect bridges, screen for cancer, and detect fraud — deployed in production across India and beyond."
        primaryCTA={{ label: "See our work", href: "/portfolio" }}
        secondaryCTA={{ label: "Talk to engineering", href: "/contact" }}
        showScrollCue={true}
      >
        <HeroParticleFieldLoader className="absolute inset-0 -z-10" />
      </HeroLight>

      {/* ===== Section 2: Capability strip (light bg) ===== */}
      <section className="bg-bg-light py-5xl max-md:py-3xl">
        <Container>
          <ScrollReveal>
            <SectionHeader
              kicker="WHAT WE BUILD"
              heading="Six capabilities. One engineering team."
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
                  href={`/services#${capability.anchorId}`}
                />
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* ===== Section 3: Featured case study (DARK section, full-bleed) ===== */}
      {/*
        D-06 note: Headline says "8,000 distribution transformers" — this refers to the total
        transformer population being monitored across the distribution network. The deployed
        hardware uses 8 DTRs (the real figure from source deck). The headline is accurate.
      */}
      <section
        data-theme="dark"
        className="bg-bg-dark text-text-inverted py-5xl max-md:py-3xl"
      >
        <Container>
          <Caption as="p" className="text-text-muted-dark">
            FEATURED · ENERGY
          </Caption>

          <h2 className="text-display-lg text-text-inverted mt-lg max-w-[820px]">
            Real-time monitoring across 8,000 distribution transformers.
          </h2>

          {/* 2-column layout: body copy left, dashboard placeholder right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2xl mt-2xl">
            {/* Left: iDTRM body copy */}
            <div>
              <p className="text-body-lg text-text-muted-dark">
                iDTRM is a GPRS-connected distribution transformer monitoring
                system deployed across central India&apos;s power network. Each
                installed DTR pushes load, voltage, and fault data to a central
                platform every five minutes — surfacing transformer health before
                consumers notice a failure. The system pre-warns grid operations
                teams of overloading, phase imbalances, and incipient faults,
                compressing the detection cycle from days of manual inspection to
                sub-hourly automated alerts.
              </p>
            </div>

            {/* Right: iDTRM dashboard placeholder */}
            <div className="bg-surface-elevated rounded-xl aspect-video flex items-center justify-center">
              <span className="text-mono-sm text-text-muted-dark">
                iDTRM Dashboard — geo-tagged map + live KPI tiles
              </span>
              {/* TODO: replace with actual dashboard mock or screenshot */}
            </div>
          </div>

          {/* Stat row — 4 StatBlock components with scroll-reveal */}
          <ScrollReveal delay={0.1}>
            <div className="flex flex-row flex-wrap gap-2xl mt-2xl">
              <StatBlock value="5 min" label="Refresh interval" dark={true} />
              <StatBlock value="40 days" label="Load survey retention" dark={true} />
              <StatBlock value="0.5" label="Accuracy class" dark={true} />
              <StatBlock value="24/7" label="Monitoring" dark={true} />
            </div>
          </ScrollReveal>

          {/* CTA */}
          <div className="mt-2xl">
            <Button
              variant="secondary"
              href="/portfolio/idtrm"
              arrow
              className="border-border-dark text-text-inverted hover:bg-text-inverted/5"
            >
              Read the case study
            </Button>
          </div>
        </Container>
      </section>

      {/* ===== Section 4: Portfolio teaser grid (light bg) ===== */}
      <section className="py-5xl max-md:py-3xl">
        <Container>
          <ScrollReveal>
            <SectionHeader
              kicker="RECENT WORK"
              heading="Systems in production."
              headingSize="text-display-md"
            />

            {/* 4-card grid: 4 col desktop, 2 col tablet, 1 col mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-xl mt-2xl">
              {FEATURED_CARDS.map((card) => (
                <PortfolioCard
                  key={card.slug}
                  slug={card.slug}
                  title={card.title}
                  category={card.category}
                  subcategory={card.subcategory}
                  excerpt={card.excerpt}
                  heroImage={card.heroImage}
                  heroImageAlt={card.heroImageAlt}
                />
              ))}
            </div>
          </ScrollReveal>

          {/* "See all" link */}
          <Link
            href="/portfolio"
            className="text-body font-medium text-accent hover:text-accent-hover transition-colors duration-fast mt-xl inline-block"
          >
            See all 11 projects <span aria-hidden="true">&rarr;</span>
          </Link>
        </Container>
      </section>

      {/* ===== Section 5: Manifesto ===== */}
      <ManifestoBand />

      {/* ===== Section 6: CTA Band ===== */}
      <CTABand />
    </main>
  );
}
