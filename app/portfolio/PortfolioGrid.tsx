"use client";

// Framer Motion domain — FLIP filter animation (D-01, ANIM-06)

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { Container } from "@/components/layout/Container";
import { Pill } from "@/components/ui/Pill";
import { PortfolioCard } from "@/components/cards/PortfolioCard";
import { CATEGORIES, type CaseStudyFrontmatter } from "@/lib/types";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface PortfolioGridProps {
  caseStudies: CaseStudyFrontmatter[];
}

/**
 * PortfolioGrid — client component for filter bar + card grid.
 * Receives pre-fetched case studies from the parent Server Component (page.tsx).
 * Handles active filter state with FLIP animation via Framer Motion layout prop.
 */
export function PortfolioGrid({ caseStudies }: PortfolioGridProps) {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const prefersReducedMotion = useReducedMotion();

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
        ) : prefersReducedMotion ? (
          /* Reduced motion: render cards directly with no animation */
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
        ) : (
          /* Full animation: FLIP layout animation with AnimatePresence */
          <LayoutGroup>
            <AnimatePresence mode="popLayout">
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl"
              >
                {filtered.map((cs) => (
                  <motion.div
                    key={cs.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <PortfolioCard
                      slug={cs.slug}
                      title={cs.title}
                      category={cs.category}
                      subcategory={cs.subcategory}
                      excerpt={cs.excerpt}
                      heroImage={cs.heroImage}
                      heroImageAlt={cs.heroImageAlt}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </LayoutGroup>
        )}
      </Container>
    </>
  );
}
