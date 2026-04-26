import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { globby } from "globby";
import { caseStudySchema, type CaseStudyFrontmatter } from "./types";

// ============================================================
// Portfolio data loaders — server-only (Node.js fs/path APIs)
// Source: build spec section 6, 02-CONTEXT.md D-03
// Uses gray-matter + globby + Zod validation
// ============================================================

const PORTFOLIO_DIR = path.join(process.cwd(), "content/portfolio");

// Tier A sort order (per plan spec — these appear first)
const TIER_A_ORDER = [
  "idtrm",
  "bridgesense",
  "salt-lick",
  "ai-copter",
  "fwa-platform",
];

function parseAndValidate(filePath: string): CaseStudyFrontmatter {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(raw);
  // Zod validates — throws on malformed frontmatter (build fails loudly)
  return caseStudySchema.parse(data);
}

/**
 * Returns all case studies sorted: Tier A first (in defined order), then Tier B.
 */
export async function getAllCaseStudies(): Promise<CaseStudyFrontmatter[]> {
  const files = await globby("*.mdx", { cwd: PORTFOLIO_DIR });

  const studies = files.map((file) => {
    const filePath = path.join(PORTFOLIO_DIR, file);
    return parseAndValidate(filePath);
  });

  // Sort: Tier A in defined order, then Tier B alphabetically
  return studies.sort((a, b) => {
    const aIdx = TIER_A_ORDER.indexOf(a.slug);
    const bIdx = TIER_A_ORDER.indexOf(b.slug);

    if (aIdx !== -1 && bIdx !== -1) {
      return aIdx - bIdx;
    }
    if (aIdx !== -1) return -1;
    if (bIdx !== -1) return 1;
    return a.slug.localeCompare(b.slug);
  });
}

/**
 * Returns frontmatter for a single case study by slug.
 * MDX body is imported dynamically in the page component.
 */
export function getCaseStudyBySlug(slug: string): CaseStudyFrontmatter {
  const filePath = path.join(PORTFOLIO_DIR, `${slug}.mdx`);
  return parseAndValidate(filePath);
}

/**
 * Returns all slugs for generateStaticParams.
 */
export async function getCaseStudySlugs(): Promise<Array<{ slug: string }>> {
  const files = await globby("*.mdx", { cwd: PORTFOLIO_DIR });
  return files.map((file) => ({
    slug: path.basename(file, ".mdx"),
  }));
}
