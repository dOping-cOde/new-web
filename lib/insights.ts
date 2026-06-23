import { ARTICLES, type LocalArticle } from "@/content/insights";

// ============================================================
// Insights data layer — local, first-party articles.
//
// Previously this fetched from an external CMS; it now reads the
// articles defined in content/insights.ts. The public API and the
// UI-facing types are unchanged, so the pages render identically.
// ============================================================

// ─── Clean UI-facing types ────────────────────────────────────────────────────

export interface InsightSummary {
  id: number;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  image: string | null;
  imageAlt: string;
  date: string; // normalized "YYYY-MM-DD"
  readingTime: string; // e.g. "6 min read"
}

export interface InsightPost extends InsightSummary {
  /** Sanitized HTML body, ready for `dangerouslySetInnerHTML`. */
  html: string;
  metaTitle: string;
  metaDescription: string;
  metaKeyword: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Strip HTML tags and collapse whitespace to plain text. */
function htmlToText(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
}

/** Build a short excerpt from the HTML body. */
function buildExcerpt(html: string, maxLen = 160): string {
  const text = htmlToText(html);
  if (text.length <= maxLen) return text;
  const slice = text.slice(0, maxLen);
  const lastSpace = slice.lastIndexOf(" ");
  return `${slice.slice(0, lastSpace > 40 ? lastSpace : maxLen).trim()}…`;
}

/** Estimate reading time at ~200 words per minute. */
function readingTime(html: string): string {
  const words = htmlToText(html).split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

// ─── Mappers ──────────────────────────────────────────────────────────────────

/** Stable numeric id derived from the article's position. */
function idFor(slug: string): number {
  const i = ARTICLES.findIndex((a) => a.slug === slug);
  return i >= 0 ? i + 1 : 0;
}

function toSummary(a: LocalArticle): InsightSummary {
  return {
    id: idFor(a.slug),
    slug: a.slug,
    title: a.title,
    category: a.category?.trim() || "General",
    excerpt: a.excerpt?.trim() || buildExcerpt(a.html),
    image: a.image?.trim() || null,
    imageAlt: a.imageAlt || a.title,
    date: a.date,
    readingTime: readingTime(a.html),
  };
}

function toPost(a: LocalArticle): InsightPost {
  return {
    ...toSummary(a),
    html: a.html.trim(),
    metaTitle: a.metaTitle?.trim() || a.title,
    metaDescription: a.metaDescription?.trim() || a.excerpt?.trim() || buildExcerpt(a.html),
    metaKeyword: a.metaKeyword?.trim() || "",
  };
}

// ─── Scheduling ───────────────────────────────────────────────────────────────
// Articles with a future `date` are scheduled: hidden from the listing, the
// sitemap, and direct access until their publish date arrives. Because the
// Insights routes use ISR (`export const revalidate`), `today()` is recomputed
// on each regeneration, so scheduled posts go live automatically — no redeploy.

/** Current date as "YYYY-MM-DD" (UTC), recomputed on each render / ISR pass. */
function today(): string {
  return new Date().toISOString().slice(0, 10);
}

/** A post is live once its date is on or before today; a future date = scheduled. */
function isPublished(a: LocalArticle): boolean {
  return a.date <= today();
}

// ─── Public data loaders ──────────────────────────────────────────────────────

/** Returns all published insight summaries, newest-first (scheduled ones excluded). */
export async function getAllInsights(): Promise<InsightSummary[]> {
  return ARTICLES.filter(isPublished)
    .map(toSummary)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Returns a single insight by slug, or null if not found or not yet published. */
export async function getInsightBySlug(slug: string): Promise<InsightPost | null> {
  const article = ARTICLES.find((a) => a.slug === slug);
  return article && isPublished(article) ? toPost(article) : null;
}

/** Returns published slugs for generateStaticParams and the sitemap. */
export async function getInsightSlugs(): Promise<Array<{ slug: string }>> {
  return ARTICLES.filter(isPublished).map((a) => ({ slug: a.slug }));
}
