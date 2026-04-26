"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Pill } from "@/components/ui/Pill";
import { PortfolioCard } from "@/components/cards/PortfolioCard";
import { CATEGORIES, type CaseStudyFrontmatter } from "@/lib/types";

interface PortfolioGridProps {
  caseStudies: CaseStudyFrontmatter[];
}

/**
 * PortfolioGrid — client component for filter bar + card grid.
 * Receives pre-fetched case studies from the parent Server Component (page.tsx).
 * Handles active filter state with instant client-side filtering.
 * FLIP animation will be added in Phase 3 (Framer Motion layout prop).
 */
export function PortfolioGrid({ caseStudies }: PortfolioGridProps) {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filtered =
    activeFilter === "All"
      ? caseStudies
      : caseStudies.filter((cs) => cs.category === activeFilter);

  return (
    <>
      {/* Filter bar — sticky below navbar (navbar is 64px tall) */}
      <div
        className="sticky top-[64px] z-40 bg-bg-light/95 backdrop-blur-sm border-b border-border-light"
        role="navigation"
        aria-label="Filter portfolio by industry"
      >
        <Container>
          <div className="flex flex-row gap-sm py-md overflow-x-auto">
            {CATEGORIES.map((category) => (
              <Pill
                key={category}
                active={activeFilter === category}
                onClick={() => setActiveFilter(category)}
                aria-pressed={activeFilter === category}
              >
                {category}
              </Pill>
            ))}
          </div>
        </Container>
      </div>

      {/* Card grid */}
      <Container className="mt-2xl pb-5xl">
        {filtered.length === 0 ? (
          <p className="text-body text-text-muted text-center py-2xl">
            No projects in this category.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl">
            {filtered.map((cs) => (
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
        )}
      </Container>
    </>
  );
}
