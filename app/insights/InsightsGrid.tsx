"use client";

// Framer Motion domain — FLIP filter animation (D-01, ANIM-06)
// Mirrors app/portfolio/PortfolioGrid.tsx.

import { useMemo, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { Container } from "@/components/layout/Container";
import { Pill } from "@/components/ui/Pill";
import { InsightCard } from "@/components/cards/InsightCard";
import type { InsightSummary } from "@/lib/insights";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface InsightsGridProps {
  posts: InsightSummary[];
}

/**
 * InsightsGrid — client component for filter bar + card grid.
 * Receives pre-fetched posts from the parent Server Component (page.tsx).
 * Categories are derived from the live data, so the filter bar always
 * matches whatever the CMS returns.
 */
export function InsightsGrid({ posts }: InsightsGridProps) {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const prefersReducedMotion = useReducedMotion();

  // Unique categories present in the data, in first-seen order.
  const categories = useMemo(() => {
    const seen = new Set<string>();
    for (const p of posts) {
      if (p.category) seen.add(p.category);
    }
    return ["All", ...seen];
  }, [posts]);

  const filtered =
    activeFilter === "All"
      ? posts
      : posts.filter((p) => p.category === activeFilter);

  return (
    <>
      {/* Filter bar — sticky below navbar (navbar is 64px tall).
          Hidden when there is only one category (just "All"). */}
      {categories.length > 1 && (
        <div
          className="sticky top-[64px] z-40 bg-bg-light/95 backdrop-blur-sm border-b border-border-light"
          role="navigation"
          aria-label="Filter insights by topic"
        >
          <Container>
            <div className="flex flex-row gap-sm py-md overflow-x-auto">
              {categories.map((category) => (
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
      )}

      {/* Card grid */}
      <Container className="mt-2xl pb-5xl">
        {filtered.length === 0 ? (
          <p className="text-body text-text-muted text-center py-2xl">
            No articles published yet. Check back soon.
          </p>
        ) : prefersReducedMotion ? (
          /* Reduced motion: render cards directly with no animation */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl">
            {filtered.map((p) => (
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
        ) : (
          /* Full animation: FLIP layout animation with AnimatePresence */
          <LayoutGroup>
            <AnimatePresence mode="popLayout">
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl"
              >
                {filtered.map((p) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <InsightCard
                      slug={p.slug}
                      title={p.title}
                      category={p.category}
                      excerpt={p.excerpt}
                      date={p.date}
                      readingTime={p.readingTime}
                      image={p.image}
                      imageAlt={p.imageAlt}
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
