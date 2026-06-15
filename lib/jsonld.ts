import type {
  Organization,
  WebSite,
  Service,
  Article,
  BreadcrumbList,
  WithContext,
} from "schema-dts";
import type { CaseStudyFrontmatter } from "@/lib/types";
import type { InsightPost } from "@/lib/insights";

// ============================================================
// JSON-LD Utility
// Source: 04-02-PLAN.md — SEO-04, SEO-05, SEO-06, SEO-07
// PITFALL 8: Always use NEXT_PUBLIC_SITE_URL (never localhost).
// PITFALL 8: Escape < as \u003c to prevent XSS in inline scripts.
// ============================================================

/**
 * Serialize a JSON-LD object to a string safe for inline <script> injection.
 * Replaces all < characters with \u003c to prevent XSS.
 */
export function jsonLdScript(data: WithContext<Organization | WebSite | Service | Article | BreadcrumbList>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

// ─── 1. Organization (SEO-04) ─────────────────────────────────────────────────

/**
 * Organization JSON-LD — injected into root layout so it appears on every page.
 */
export function organizationJsonLd(): WithContext<Organization> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://softwires.in";
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: "Softwires Technologies",
    url: baseUrl,
    description:
      "AI engineering for energy, healthcare, and infrastructure.",
    sameAs: [],
  };
}

// ─── 2. WebSite (SEO-05) ──────────────────────────────────────────────────────

/**
 * WebSite JSON-LD with sitelinks search box — home page only (per SEO-05).
 */
export function websiteJsonLd(): WithContext<WebSite> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://softwires.in";
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    name: "Softwires Technologies",
    url: baseUrl,
    publisher: { "@id": `${baseUrl}/#organization` },
  };
}

// ─── 3. Service (SEO-06) ──────────────────────────────────────────────────────

/**
 * Service JSON-LD — one per service section on /services (6 total, per SEO-06).
 */
export function serviceJsonLd(service: {
  title: string;
  description: string;
  anchorId: string;
}): WithContext<Service> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://softwires.in";
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: `${baseUrl}/services/${service.anchorId}`,
    provider: { "@id": `${baseUrl}/#organization` },
  };
}

// ─── 4. Article (SEO-07) ──────────────────────────────────────────────────────

/**
 * Article JSON-LD — one per case study detail page (per SEO-07).
 */
export function articleJsonLd(
  caseStudy: CaseStudyFrontmatter
): WithContext<Article> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://softwires.in";
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: caseStudy.title,
    description: caseStudy.excerpt,
    url: `${baseUrl}/portfolio/${caseStudy.slug}`,
    author: { "@id": `${baseUrl}/#organization` },
    publisher: { "@id": `${baseUrl}/#organization` },
    ...(caseStudy.heroImage
      ? { image: `${baseUrl}${caseStudy.heroImage}` }
      : {}),
  };
}

/**
 * Article JSON-LD — one per insight detail page.
 * Sourced from the CMS API (absolute image URL, published date).
 */
export function insightJsonLd(post: InsightPost): WithContext<Article> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://softwires.in";
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    url: `${baseUrl}/insights/${post.slug}`,
    ...(post.date ? { datePublished: post.date } : {}),
    author: { "@type": "Organization", name: "Softwires Technologies" },
    publisher: { "@id": `${baseUrl}/#organization` },
    ...(post.image ? { image: post.image } : {}),
  };
}

// ─── 5. BreadcrumbList (SEO-07) ───────────────────────────────────────────────

/**
 * BreadcrumbList JSON-LD — one per case study detail page (per SEO-07).
 * Pass items in display order; positions are assigned 1-based automatically.
 */
export function breadcrumbJsonLd(
  items: { name: string; url: string }[]
): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem" as const,
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
