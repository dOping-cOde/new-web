import { z } from "zod";

// ============================================================
// Insights data layer — DigitalCrew CMS API client
// Source endpoints (the CMS still names these "blogs"):
//   GET /all-blogs?website=softwires       → list
//   GET /blog-details?slug=<slug>          → single post
//
// External API responses are validated with Zod and mapped to
// clean, UI-facing types. Raw CMS fields (HTML body, mixed date
// formats, nullable image) never leak into the components.
// ============================================================

const API_BASE = process.env.INSIGHTS_API_BASE || "https://api.digitalcrew.co.in";
const WEBSITE = process.env.INSIGHTS_API_WEBSITE || "softwires";

// Revalidate cached responses every 5 minutes (ISR).
const REVALIDATE_SECONDS = 300;

// ─── Raw API schemas ──────────────────────────────────────────────────────────

const rawInsightSchema = z.object({
  id: z.number(),
  slug: z.string(),
  title: z.string(),
  category: z.string().nullable().optional(),
  description: z.string().nullable().optional(), // HTML body (Quill output)
  meta_title: z.string().nullable().optional(),
  meta_description: z.string().nullable().optional(),
  meta_keyword: z.string().nullable().optional(),
  image: z.string().nullable().optional(), // absolute URL
  added_date: z.string().nullable().optional(), // "YYYY-MM-DD" or ""
  createdAt: z.string().nullable().optional(), // ISO timestamp
});

type RawInsight = z.infer<typeof rawInsightSchema>;

const listResponseSchema = z.object({
  status: z.boolean().optional(),
  data: z.array(rawInsightSchema).default([]),
});

const detailResponseSchema = z.object({
  status: z.boolean().optional(),
  data: rawInsightSchema.nullable().default(null),
});

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
  // Cut on a word boundary near maxLen.
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

/** Normalize the CMS's mixed date fields to "YYYY-MM-DD". */
function normalizeDate(raw: RawInsight): string {
  const candidate = raw.added_date?.trim() || raw.createdAt?.trim() || "";
  if (!candidate) return "";
  // Both "YYYY-MM-DD" and ISO timestamps start with the date.
  const match = candidate.match(/^\d{4}-\d{2}-\d{2}/);
  return match ? match[0] : candidate.slice(0, 10);
}

/**
 * Defense-in-depth: strip <script>/<style> blocks and inline event handlers
 * before the trusted CMS HTML is injected. The body is first-party content;
 * if untrusted authors are ever onboarded, swap this for a full sanitizer
 * (e.g. isomorphic-dompurify).
 */
/**
 * Normalize the CMS's Quill HTML into clean, themeable markup.
 *
 * The editor emits justified paragraphs, hardcoded inline colors/backgrounds,
 * empty `&nbsp;` spacer paragraphs, and "headings" that are really just bold
 * paragraphs. Left unchanged, that renders as a flat, monotonous wall of text.
 *
 * This pass:
 *   1. strips dangerous nodes (script/style, inline handlers, javascript:)
 *   2. removes inline `style`/`class` attributes so the theme styles win
 *   3. drops empty spacer paragraphs
 *   4. promotes standalone bold paragraphs into real <h2> headings
 *   5. unwraps now-bare <span>s
 * so the article reads with proper hierarchy and rhythm.
 */
function sanitizeHtml(html: string): string {
  return (
    html
      // 1 — security
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
      .replace(/\son\w+\s*=\s*"[^"]*"/gi, "")
      .replace(/\son\w+\s*=\s*'[^']*'/gi, "")
      .replace(/javascript:/gi, "")
      // 2 — strip editor styling so site theme applies
      .replace(/\sstyle\s*=\s*"[^"]*"/gi, "")
      .replace(/\sstyle\s*=\s*'[^']*'/gi, "")
      .replace(/\sclass\s*=\s*"[^"]*"/gi, "")
      .replace(/\sclass\s*=\s*'[^']*'/gi, "")
      // 3 — normalize whitespace + drop empty spacer paragraphs
      .replace(/&nbsp;/gi, " ")
      .replace(/<p>\s*(?:<br\s*\/?>)?\s*<\/p>/gi, "")
      // 4 — promote bold-only paragraphs to headings (max ~120 chars)
      .replace(
        /<p>\s*<strong>([^<]{1,120}?)<\/strong>\s*<\/p>/gi,
        (_m, text) => `<h2>${String(text).trim()}</h2>`
      )
      // 5 — unwrap stripped-bare spans
      .replace(/<span>\s*<\/span>/gi, "")
      .replace(/<span>(.*?)<\/span>/gi, "$1")
      .trim()
  );
}

function toSummary(raw: RawInsight): InsightSummary {
  const html = raw.description ?? "";
  return {
    id: raw.id,
    slug: raw.slug,
    title: raw.title,
    category: raw.category?.trim() || "General",
    excerpt:
      raw.meta_description?.trim() && raw.meta_description.trim() !== raw.title
        ? raw.meta_description.trim()
        : buildExcerpt(html),
    image: raw.image?.trim() || null,
    imageAlt: raw.title,
    date: normalizeDate(raw),
    readingTime: readingTime(html),
  };
}

function toPost(raw: RawInsight): InsightPost {
  const html = raw.description ?? "";
  return {
    ...toSummary(raw),
    html: sanitizeHtml(html),
    metaTitle: raw.meta_title?.trim() || raw.title,
    metaDescription: raw.meta_description?.trim() || buildExcerpt(html),
    metaKeyword: raw.meta_keyword?.trim() || "",
  };
}

// ─── Public data loaders ──────────────────────────────────────────────────────

/**
 * Returns all published insight summaries, newest-first.
 * Returns an empty array (never throws) if the API is unreachable, so the
 * listing page degrades gracefully instead of erroring.
 */
export async function getAllInsights(): Promise<InsightSummary[]> {
  try {
    const res = await fetch(
      `${API_BASE}/all-blogs?website=${encodeURIComponent(WEBSITE)}`,
      { next: { revalidate: REVALIDATE_SECONDS } }
    );
    if (!res.ok) return [];

    const json = await res.json();
    const parsed = listResponseSchema.safeParse(json);
    if (!parsed.success) return [];

    return parsed.data.data
      .map(toSummary)
      .sort((a, b) => b.date.localeCompare(a.date));
  } catch {
    return [];
  }
}

/**
 * Returns a single insight by slug, or null if not found / API error.
 */
export async function getInsightBySlug(slug: string): Promise<InsightPost | null> {
  try {
    const res = await fetch(
      `${API_BASE}/blog-details?slug=${encodeURIComponent(slug)}`,
      { next: { revalidate: REVALIDATE_SECONDS } }
    );
    if (!res.ok) return null;

    const json = await res.json();
    const parsed = detailResponseSchema.safeParse(json);
    if (!parsed.success || !parsed.data.data) return null;

    return toPost(parsed.data.data);
  } catch {
    return null;
  }
}

/**
 * Returns all slugs for generateStaticParams.
 */
export async function getInsightSlugs(): Promise<Array<{ slug: string }>> {
  const posts = await getAllInsights();
  return posts.map((p) => ({ slug: p.slug }));
}
