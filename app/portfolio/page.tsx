import type { Metadata } from "next";
import { getAllCaseStudies } from "@/lib/portfolio";
import { HeroLight } from "@/components/sections/HeroLight";
import { CTABand } from "@/components/sections/CTABand";
// PortfolioGrid renders a PortfolioCard for each case study (see PortfolioGrid.tsx)
import { PortfolioGrid } from "./PortfolioGrid";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Eleven AI systems built for production — transformer monitoring to cancer screening. Industries: Energy, Healthcare, Infrastructure, Insurance.",
  openGraph: {
    title: "Portfolio — Softiques",
    description:
      "Eleven AI systems built for production — transformer monitoring to cancer screening. Industries: Energy, Healthcare, Infrastructure, Insurance.",
  },
};

/**
 * Portfolio index page — /portfolio
 * Server Component: loads all case studies and passes to the client PortfolioGrid.
 * Renders hero (HeroLight), filter bar + card grid (PortfolioGrid), and CTA band.
 */
export default async function PortfolioPage() {
  const caseStudies = await getAllCaseStudies();

  return (
    <>
      <HeroLight
        kicker="PORTFOLIO"
        headline="Eleven systems. Built for production."
        headlineSize="text-display-lg"
        intro="Real AI systems deployed in energy grids, hospitals, bridges, and insurance platforms. Each one runs in production."
        backgroundImage="/images/hero/portfolio-bg.svg"
      />

      <PortfolioGrid caseStudies={caseStudies} />

      <CTABand />
    </>
  );
}
