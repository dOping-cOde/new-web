// Shared type for local Insights articles.
// Year files (2018.ts … 2026.ts) each export an array of these; the aggregator
// in content/insights.ts concatenates them and re-exports the type.

export interface LocalArticle {
  slug: string;
  title: string;
  category: string;
  /** "YYYY-MM-DD" */
  date: string;
  /** Cover image path under /public. */
  image: string;
  imageAlt: string;
  /** Optional override; otherwise derived from the body. */
  excerpt?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeyword?: string;
  /** Article body as sanitized, semantic HTML. */
  html: string;
}
