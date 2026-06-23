import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeroLight } from "@/components/sections/HeroLight";
import { CTABand } from "@/components/sections/CTABand";
import { Container } from "@/components/layout/Container";
import { Caption } from "@/components/ui/Caption";
import { Pill } from "@/components/ui/Pill";
import { PortfolioCard } from "@/components/cards/PortfolioCard";
import { INDUSTRIES, getIndustryBySlug, getIndustrySlugs } from "@/lib/industries";
import { getAllCaseStudies } from "@/lib/portfolio";
import { SERVICES } from "@/lib/services";
import { cn } from "@/lib/utils";
import Link from "next/link";

// ─── Static Params ───────────────────────────────────────────────────────────

export function generateStaticParams() {
  return getIndustrySlugs();
}

export const dynamicParams = false;

// ─── Metadata ────────────────────────────────────────────────────────────────

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = INDUSTRIES.find((i) => i.slug === slug);
  if (!industry) return {};

  return {
    title: `${industry.label} — Industries`,
    description: industry.intro,
    openGraph: {
      title: `${industry.label} — Softiques Industries`,
      description: industry.intro,
    },
  };
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function IndustryPage({ params }: PageProps) {
  const { slug } = await params;

  let industry;
  try {
    industry = getIndustryBySlug(slug);
  } catch {
    notFound();
  }

  // Fetch related portfolio case studies
  const allCaseStudies = await getAllCaseStudies();
  const relatedCaseStudies = allCaseStudies.filter((cs) =>
    industry.portfolioSlugs.includes(cs.slug)
  );

  // Fetch related services
  const relatedServices = SERVICES.filter((s) =>
    industry.relatedServiceIds.includes(s.id)
  );

  return (
    <>
      <HeroLight
        kicker={`INDUSTRIES · ${industry.label.toUpperCase()}`}
        headline={industry.headline}
        headlineSize="text-display-lg"
        intro={industry.intro}
        backgroundImage="/images/hero/services-bg.svg"
      />

      {/* Industry overview */}
      <section className="py-5xl max-md:py-3xl bg-bg-light border-b border-border-light">
        <Container>
          <div className="max-w-[720px] mx-auto">
            <div className="space-y-xl">
              {industry.copy.map((para, i) => (
                <p key={i} className="text-body text-text-muted">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Challenges we solve */}
      <section className="py-5xl max-md:py-3xl bg-bg-light border-b border-border-light">
        <Container>
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-display-md text-text">
              What we solve in {industry.label.toLowerCase()}.
            </h2>
            <ul className="mt-2xl space-y-lg">
              {industry.challenges.map((challenge, i) => (
                <li
                  key={i}
                  className="flex items-start gap-md"
                >
                  <span
                    className="text-accent font-medium mt-[2px] shrink-0"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-body text-text-muted">{challenge}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Related services */}
      {relatedServices.length > 0 && (
        <section className="py-5xl max-md:py-3xl bg-bg-light border-b border-border-light">
          <Container>
            <h2 className="text-display-md text-text">
              Capabilities we bring.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-xl mt-2xl">
              {relatedServices.map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.anchorId}`}
                  className={cn(
                    "block border border-border-light rounded-lg p-xl",
                    "bg-surface",
                    "transition-all duration-normal",
                    "hover:-translate-y-1 hover:shadow-sm"
                  )}
                >
                  <Caption className="text-text-muted">
                    {service.number} · {service.label}
                  </Caption>
                  <h3 className="text-h3 mt-sm text-text">
                    {service.title}
                  </h3>
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
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Related portfolio work */}
      {relatedCaseStudies.length > 0 && (
        <section className="py-5xl max-md:py-3xl bg-bg-light">
          <Container>
            <h2 className="text-display-md text-text">
              Shipped work in {industry.label.toLowerCase()}.
            </h2>
            <p className="text-body-lg text-text-muted mt-lg max-w-[640px]">
              Real deployments, not proofs of concept. Each project below is
              running in production.
            </p>
            <div
              className={cn(
                "grid gap-xl mt-2xl",
                relatedCaseStudies.length === 1
                  ? "grid-cols-1 max-w-[600px]"
                  : "grid-cols-1 md:grid-cols-2"
              )}
            >
              {relatedCaseStudies.map((cs) => (
                <PortfolioCard
                  key={cs.slug}
                  slug={cs.slug}
                  title={cs.title}
                  category={cs.category}
                  subcategory={cs.subcategory}
                  excerpt={cs.excerpt}
                  heroImage={cs.heroImage}
                  heroImageAlt={cs.heroImageAlt}
                />
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTABand
        headline={`Ready to build AI for ${industry.label.toLowerCase()}?`}
        body="Tell us about your operational challenge. We'll respond within two business days."
      />
    </>
  );
}
