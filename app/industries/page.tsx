import type { Metadata } from "next";
import Link from "next/link";
import { HeroLight } from "@/components/sections/HeroLight";
import { CTABand } from "@/components/sections/CTABand";
import { Container } from "@/components/layout/Container";
import { Caption } from "@/components/ui/Caption";
import { INDUSTRIES } from "@/lib/industries";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "AI engineering for energy, healthcare, infrastructure, mining, financial services, retail, FMCG, and construction. Shipped systems, not prototypes.",
  openGraph: {
    title: "Industries — Softwires",
    description:
      "AI engineering for energy, healthcare, infrastructure, mining, financial services, retail, FMCG, and construction. Shipped systems, not prototypes.",
  },
};

export default function IndustriesPage() {
  return (
    <>
      <HeroLight
        kicker="INDUSTRIES"
        headline="AI built for your operating reality."
        headlineSize="text-display-lg"
        intro="Every industry has constraints that generic AI ignores. We build systems engineered for the compliance, safety, and operational demands of your specific sector."
        backgroundImage="/images/hero/services-bg.svg"
      />

      {/* Industry grid */}
      <section className="py-5xl max-md:py-3xl bg-bg-light">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
            {INDUSTRIES.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className={cn(
                  "group block",
                  "border border-border-light rounded-lg",
                  "p-xl",
                  "bg-surface",
                  "transition-all duration-normal",
                  "hover:-translate-y-1 hover:shadow-sm"
                )}
              >
                <Caption className="text-accent">
                  {industry.label.toUpperCase()}
                </Caption>
                <h2 className="text-h3 mt-sm text-text group-hover:text-accent transition-colors duration-fast">
                  {industry.headline}
                </h2>
                <p className="text-body-sm text-text-muted mt-md line-clamp-2">
                  {industry.intro}
                </p>
                <span className="text-body-sm text-accent mt-lg inline-block">
                  Learn more &rarr;
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTABand />
    </>
  );
}
