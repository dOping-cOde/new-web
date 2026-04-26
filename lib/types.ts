import { z } from "zod";

// ============================================================
// Case Study Frontmatter Schema (Zod)
// Source: build spec section 6 + 02-CONTEXT.md D-01
// Validated at build time — malformed frontmatter = build error
// ============================================================

export const caseStudySchema = z.object({
  title: z.string(),
  slug: z.string(),
  tier: z.enum(["A", "B"]),
  category: z.enum([
    "Energy",
    "Healthcare",
    "Infrastructure",
    "Insurance",
    "Data & Analytics",
  ]),
  subcategory: z.string(),
  client: z.string(),
  year: z.number(),
  heroImage: z.string(),
  heroImageAlt: z.string(),
  excerpt: z.string(),
  stats: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ),
  techStack: z.array(z.string()),
  relatedSlugs: z.array(z.string()),
});

export type CaseStudyFrontmatter = z.infer<typeof caseStudySchema>;

// ============================================================
// Categories
// ============================================================

export const CATEGORIES = [
  "All",
  "Energy",
  "Healthcare",
  "Infrastructure",
  "Insurance",
  "Data & Analytics",
] as const;

export type Category = (typeof CATEGORIES)[number];

// ============================================================
// Service Metadata Interface
// Source: build spec section 4.2, services page brief
// ============================================================

export interface ServiceMeta {
  id: string;
  number: string; // "01", "02", etc.
  label: string; // "AI AGENTS", "CONVERSATIONAL", etc.
  title: string; // Display heading
  anchorId: string; // For sticky nav anchors: "ai-agents", "chatbots", etc.
  description: string; // 1-sentence description for home page tiles
  techStack: string[]; // Tech pills
  useCases: string[]; // 3 use-case bullets
  caseStudySlug?: string; // Link to relevant case study
}
