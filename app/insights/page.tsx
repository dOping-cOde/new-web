import type { Metadata } from "next";
import { getAllInsights } from "@/lib/insights";
import { HeroLight } from "@/components/sections/HeroLight";
import { CTABand } from "@/components/sections/CTABand";
// InsightsGrid renders an InsightCard for each post (see InsightsGrid.tsx)
import { InsightsGrid } from "./InsightsGrid";

// Revalidate the listing every 5 minutes (ISR) so new CMS posts appear
// without a redeploy.
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Practical writing on front-end engineering — performance, architecture, design systems, accessibility, and motion — from the Softiques team.",
  openGraph: {
    title: "Insights — Softiques",
    description:
      "Practical writing on front-end engineering — performance, architecture, design systems, accessibility, and motion — from the Softiques team.",
  },
};

/**
 * Insights index page — /insights
 * Server Component: loads all posts from the CMS API and passes them to the
 * client InsightsGrid. Renders hero (HeroLight), filter bar + card grid, and CTA.
 */
export default async function InsightsPage() {
  const posts = await getAllInsights();

  return (
    <>
      <HeroLight
        kicker="INSIGHTS"
        headline="Notes from the engineering team."
        headlineSize="text-display-lg"
        intro="Practical writing on performance, architecture, design systems, accessibility, and motion — the engineering behind products that ship."
        backgroundImage="/images/hero/insights-bg.svg"
      />

      <InsightsGrid posts={posts} />

      <CTABand />
    </>
  );
}
