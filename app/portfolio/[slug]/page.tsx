import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseStudyBySlug, getCaseStudySlugs, getAllCaseStudies } from "@/lib/portfolio";
import { type CaseStudyFrontmatter } from "@/lib/types";
import { HeroDark } from "@/components/sections/HeroDark";
import { CTABand } from "@/components/sections/CTABand";
import { PortfolioCard } from "@/components/cards/PortfolioCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Container } from "@/components/layout/Container";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

// ============================================================
// Static generation — all 11 case study routes pre-built
// Unknown slugs return 404 (dynamicParams = false)
// ============================================================

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getCaseStudySlugs();
  return slugs; // Array<{ slug: string }>
}

// ============================================================
// Metadata per case study
// ============================================================

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  let caseStudy: CaseStudyFrontmatter;
  try {
    caseStudy = getCaseStudyBySlug(slug);
  } catch {
    return { title: "Not Found" };
  }

  return {
    title: `${caseStudy.title} — Softwires`,
    description: caseStudy.excerpt,
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.excerpt,
      type: "article",
    },
  };
}

// ============================================================
// Tier A Layout — Real client case study
// Dark hero → MDX body → Up-next navigation
// ============================================================

function TierALayout({
  caseStudy,
  related,
  children,
}: {
  caseStudy: CaseStudyFrontmatter;
  related: CaseStudyFrontmatter[];
  children: React.ReactNode;
}) {
  const kicker = [
    caseStudy.category.toUpperCase(),
    caseStudy.subcategory.toUpperCase(),
    caseStudy.client ? `CLIENT: ${caseStudy.client}` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://softwires.in";

  return (
    <article>
      {/* Article JSON-LD (SEO-07) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd(caseStudy)).replace(/</g, "\\u003c"),
        }}
      />
      {/* BreadcrumbList JSON-LD (SEO-07) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", url: baseUrl },
              { name: "Portfolio", url: `${baseUrl}/portfolio` },
              { name: caseStudy.title, url: `${baseUrl}/portfolio/${caseStudy.slug}` },
            ])
          ).replace(/</g, "\\u003c"),
        }}
      />
      <HeroDark
        kicker={kicker}
        headline={caseStudy.title}
        intro={caseStudy.excerpt}
        heroImage={caseStudy.heroImage}
        heroImageAlt={caseStudy.heroImageAlt}
        stats={caseStudy.stats}
      />

      {/* MDX body — custom components from mdx-components.tsx render Tier A sections */}
      <div className="bg-bg-light">{children}</div>

      {/* Up-next navigation */}
      {related.length > 0 && (
        <section className="bg-bg-light py-3xl md:py-5xl border-t border-border-light">
          <Container>
            <SectionHeader
              kicker="UP NEXT"
              heading="Related work"
              headingSize="text-display-md"
              className="mb-2xl"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2xl">
              {related.slice(0, 2).map((cs) => (
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
            <div className="mt-2xl">
              <Link
                href="/portfolio"
                className="text-body-sm text-text-muted hover:text-accent transition-colors duration-fast"
              >
                ← Back to all work
              </Link>
            </div>
          </Container>
        </section>
      )}
    </article>
  );
}

// ============================================================
// Tier B Layout — Capability showcase
// Dark hero (shorter) → MDX body → CTA → Up-next
// ============================================================

function TierBLayout({
  caseStudy,
  related,
  children,
}: {
  caseStudy: CaseStudyFrontmatter;
  related: CaseStudyFrontmatter[];
  children: React.ReactNode;
}) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://softwires.in";

  return (
    <article>
      {/* Article JSON-LD (SEO-07) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd(caseStudy)).replace(/</g, "\\u003c"),
        }}
      />
      {/* BreadcrumbList JSON-LD (SEO-07) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", url: baseUrl },
              { name: "Portfolio", url: `${baseUrl}/portfolio` },
              { name: caseStudy.title, url: `${baseUrl}/portfolio/${caseStudy.slug}` },
            ])
          ).replace(/</g, "\\u003c"),
        }}
      />
      <HeroDark
        kicker="CAPABILITY · DATA & ANALYTICS"
        headline={caseStudy.title}
        intro={caseStudy.excerpt}
        stats={caseStudy.stats}
        // No heroImage for Tier B — shorter, more focused hero
      />

      {/* MDX body — Tier B content sections */}
      <div className="bg-bg-light">{children}</div>

      <CTABand
        headline="Start a conversation"
        body="Tell us about the analytics problem you're trying to solve. We'll respond within two business days."
        ctaLabel="Get in touch"
        ctaHref="/contact"
      />

      {/* Up-next navigation */}
      {related.length > 0 && (
        <section className="bg-bg-light py-3xl md:py-5xl border-t border-border-light">
          <Container>
            <SectionHeader
              kicker="UP NEXT"
              heading="Related capabilities"
              headingSize="text-display-md"
              className="mb-2xl"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2xl">
              {related.slice(0, 2).map((cs) => (
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
            <div className="mt-2xl">
              <Link
                href="/portfolio"
                className="text-body-sm text-text-muted hover:text-accent transition-colors duration-fast"
              >
                ← Back to all work
              </Link>
            </div>
          </Container>
        </section>
      )}
    </article>
  );
}

// ============================================================
// Page component — Server Component
// ============================================================

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Validate slug before dynamic import
  let caseStudy: CaseStudyFrontmatter;
  try {
    caseStudy = getCaseStudyBySlug(slug);
  } catch {
    notFound();
  }

  // Dynamic MDX import — compiled by @next/mdx at build time
  let MDXContent: React.ComponentType<Record<string, never>>;
  try {
    const mod = await import(`@/content/portfolio/${slug}.mdx`);
    MDXContent = mod.default;
  } catch {
    notFound();
  }

  // Resolve related case studies for up-next navigation
  const allStudies = await getAllCaseStudies();
  const related = caseStudy.relatedSlugs
    .map((s) => allStudies.find((cs) => cs.slug === s))
    .filter((cs): cs is CaseStudyFrontmatter => cs !== undefined);

  if (caseStudy.tier === "A") {
    return (
      <TierALayout caseStudy={caseStudy} related={related}>
        <MDXContent />
      </TierALayout>
    );
  }

  // caseStudy.tier === "B" — capability showcase layout
  return (
    <TierBLayout caseStudy={caseStudy} related={related}>
      <MDXContent />
    </TierBLayout>
  );
}
