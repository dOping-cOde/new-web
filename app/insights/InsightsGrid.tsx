"use client";

// Framer Motion domain — FLIP filter animation (D-01, ANIM-06)
// Mirrors app/portfolio/PortfolioGrid.tsx.

import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { Container } from "@/components/layout/Container";
import { InsightCard } from "@/components/cards/InsightCard";
import type { InsightSummary } from "@/lib/insights";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/utils";

interface InsightsGridProps {
  posts: InsightSummary[];
}

const PER_PAGE = 9;

/**
 * InsightsGrid — client component for the card grid + pagination.
 * Receives pre-fetched posts from the parent Server Component (page.tsx).
 */
export function InsightsGrid({ posts }: InsightsGridProps) {
  const prefersReducedMotion = useReducedMotion();
  const [page, setPage] = useState(1);
  const topRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.max(1, Math.ceil(posts.length / PER_PAGE));
  const current = Math.min(page, totalPages);

  const pagePosts = useMemo(
    () => posts.slice((current - 1) * PER_PAGE, current * PER_PAGE),
    [posts, current]
  );

  function goTo(next: number) {
    const clamped = Math.min(Math.max(1, next), totalPages);
    setPage(clamped);
    // Bring the top of the grid into view after the page swap.
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const grid = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl">
      {pagePosts.map((p) => (
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
  );

  return (
    <Container className="mt-2xl pb-5xl">
      {/* Anchor for scroll-to-top on page change */}
      <div ref={topRef} className="scroll-mt-24" aria-hidden="true" />

      {posts.length === 0 ? (
        <p className="text-body text-text-muted text-center py-2xl">
          No articles published yet. Check back soon.
        </p>
      ) : prefersReducedMotion ? (
        grid
      ) : (
        <LayoutGroup>
          <AnimatePresence mode="popLayout">
            <motion.div
              key={current}
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl"
            >
              {pagePosts.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  className="h-full"
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

      {totalPages > 1 && (
        <nav
          className="mt-3xl flex items-center justify-center gap-sm"
          aria-label="Insights pagination"
        >
          <PageButton
            onClick={() => goTo(current - 1)}
            disabled={current === 1}
            ariaLabel="Previous page"
          >
            ←
          </PageButton>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <PageButton
              key={n}
              onClick={() => goTo(n)}
              active={n === current}
              ariaLabel={`Page ${n}`}
              ariaCurrent={n === current}
            >
              {n}
            </PageButton>
          ))}

          <PageButton
            onClick={() => goTo(current + 1)}
            disabled={current === totalPages}
            ariaLabel="Next page"
          >
            →
          </PageButton>
        </nav>
      )}
    </Container>
  );
}

interface PageButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  ariaLabel: string;
  ariaCurrent?: boolean;
}

function PageButton({
  children,
  onClick,
  active = false,
  disabled = false,
  ariaLabel,
  ariaCurrent = false,
}: PageButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-current={ariaCurrent ? "page" : undefined}
      className={cn(
        "min-w-[40px] h-[40px] px-sm rounded-md text-body-sm font-medium",
        "border transition-colors duration-fast",
        "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
        active
          ? "bg-accent text-bg-dark border-accent"
          : "bg-surface text-text border-border-light hover:border-accent hover:text-accent",
        disabled && "opacity-40 pointer-events-none"
      )}
    >
      {children}
    </button>
  );
}
