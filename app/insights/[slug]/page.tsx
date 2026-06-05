import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getInsightBySlug,
  getInsightSlugs,
  getAllInsights,
} from "@/lib/insights";
import { HeroDark } from "@/components/sections/HeroDark";
import { CTABand } from "@/components/sections/CTABand";
import { InsightCard } from "@/components/cards/InsightCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Container } from "@/components/layout/Container";
import { insightJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

// Revalidate every 5 minutes; allow posts not in the prebuilt set to render
// on demand (the CMS can publish at any time).
export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  return getInsightSlugs(); // Array<{ slug: string }>
}

// ============================================================
// Metadata per post — sourced from CMS meta_* fields
// ============================================================

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getInsightBySlug(slug);
  if (!post) return { title: "Not Found" };

  return {
    title: `${post.metaTitle} — Softwires`,
    description: post.metaDescription,
    ...(post.metaKeyword ? { keywords: post.metaKeyword } : {}),
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: "article",
      ...(post.image ? { images: [{ url: post.image }] } : {}),
    },
  };
}

/** Format an ISO date string ("2026-05-12") as "12 May 2026" without locale drift. */
function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map((n) => parseInt(n, 10));
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  if (!y || !m || !d) return iso;
  return `${d} ${months[m - 1]} ${y}`;
}

// ============================================================
// Page component — Server Component
// Dark hero → CMS HTML body (prose) → related → CTA
// ============================================================

export default async function InsightPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await getInsightBySlug(slug);
  if (!post) notFound();

  // Related posts: same category first, then most recent — excluding this post.
  const allPosts = await getAllInsights();
  const related = allPosts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => {
      const aSame = a.category === post.category ? 0 : 1;
      const bSame = b.category === post.category ? 0 : 1;
      return aSame - bSame;
    })
    .slice(0, 2);

  const kicker = [
    post.category.toUpperCase(),
    post.date ? formatDate(post.date).toUpperCase() : null,
    post.readingTime.toUpperCase(),
  ]
    .filter(Boolean)
    .join(" · ");

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://softwires.in";

  return (
    <article>
      {/* Article JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(insightJsonLd(post)).replace(/</g, "\\u003c"),
        }}
      />
      {/* BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", url: baseUrl },
              { name: "Insights", url: `${baseUrl}/insights` },
              { name: post.title, url: `${baseUrl}/insights/${post.slug}` },
            ])
          ).replace(/</g, "\\u003c"),
        }}
      />

      <HeroDark
        kicker={kicker}
        headline={post.title}
        intro={post.excerpt}
        {...(post.image ? { heroImage: post.image } : {})}
        heroImageAlt={post.imageAlt}
      />

      {/* CMS HTML body rendered through Tailwind Typography, themed to match
          the About page's editorial layout: a centered 720px column of muted,
          comfortably-spaced body paragraphs with display headings. */}
      <div className="bg-bg-light py-5xl max-md:py-3xl">
        {/* Width constraint lives on this wrapper (same 720px centered column
            as the About page); the prose element fills it via max-w-none. */}
        <div className="mx-auto max-w-[720px] px-lg">
          <div
            className={[
              "prose prose-lg max-w-none text-left",
            // Body type — match About: muted, comfortable, generously spaced (like space-y-xl)
            "prose-p:text-body prose-p:text-text-muted prose-p:leading-[1.75] prose-p:my-xl",
            // Section headings — display face, clear rhythm above/below
            "prose-h2:font-display prose-h2:text-display-md prose-h2:text-text prose-h2:tracking-tight",
            "prose-h2:mt-3xl prose-h2:mb-lg prose-h2:scroll-mt-24",
            "prose-h3:font-display prose-h3:text-h3 prose-h3:text-text prose-h3:mt-2xl prose-h3:mb-md",
            // Emphasis + links
            "prose-strong:text-text prose-strong:font-semibold",
            "prose-a:text-accent prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-a:underline-offset-4",
            // Lists with accent markers and breathing room
            "prose-ul:my-lg prose-li:text-text-muted prose-li:my-[0.4em] prose-li:pl-1",
            "prose-li:marker:text-accent prose-ol:my-lg",
            // Blockquotes + media
            "prose-blockquote:border-l-2 prose-blockquote:border-accent prose-blockquote:bg-accent-soft/40",
            "prose-blockquote:rounded-r-md prose-blockquote:py-px prose-blockquote:px-lg prose-blockquote:not-italic prose-blockquote:text-text",
            "prose-img:rounded-lg prose-img:shadow-sm prose-hr:border-border-light",
          ].join(" ")}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        </div>
      </div>

      <CTABand
        headline="Want to talk through a system like this?"
        body="Tell us what you're building. We'll respond within two business days."
        ctaLabel="Talk to engineering"
        ctaHref="/contact"
      />

      {/* Up-next navigation */}
      {related.length > 0 && (
        <section className="bg-bg-light py-3xl md:py-5xl border-t border-border-light">
          <Container>
            <SectionHeader
              kicker="UP NEXT"
              heading="Related reading"
              headingSize="text-display-md"
              className="mb-2xl"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2xl">
              {related.map((p) => (
                <InsightCard
                  key={p.id}
                  slug={p.slug}
                  title={p.title}
                  category={p.category}
                  excerpt={p.excerpt}
                  date={p.date}
                  readingTime={p.readingTime}
                  image={p.image}
                  imageAlt={p.imageAlt}
                />
              ))}
            </div>
            <div className="mt-2xl">
              <Link
                href="/insights"
                className="text-body-sm text-text-muted hover:text-accent transition-colors duration-fast"
              >
                ← Back to all articles
              </Link>
            </div>
          </Container>
        </section>
      )}
    </article>
  );
}
