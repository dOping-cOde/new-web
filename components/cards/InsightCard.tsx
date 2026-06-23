"use client";

// Framer Motion domain — hover-lift micro-interaction (D-01, ANIM-05)
// Mirrors PortfolioCard for visual + structural consistency.

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Caption } from "@/components/ui/Caption";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface InsightCardProps {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readingTime: string;
  image: string | null;
  imageAlt: string;
  className?: string;
}

// Every card shows the description truncated to the same number of words, so
// the text block is a consistent height across cards.
const EXCERPT_WORDS = 18;

/** Truncate a string to at most `max` words, adding an ellipsis when cut. */
function truncateWords(text: string, max: number): string {
  const words = text.trim().split(/\s+/);
  if (words.length <= max) return text.trim();
  return words.slice(0, max).join(" ") + "…";
}

/** Format an ISO date string ("2026-05-12") as "12 May 2026" without locale drift. */
function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map((n) => parseInt(n, 10));
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  if (!y || !m || !d) return iso;
  return `${d} ${months[m - 1]} ${y}`;
}

export function InsightCard({
  slug,
  title,
  category,
  excerpt,
  date,
  readingTime,
  image,
  imageAlt,
  className,
}: InsightCardProps) {
  const prefersReducedMotion = useReducedMotion();

  const cardContent = (
    <Link href={`/insights/${slug}`} className="group flex h-full flex-col">
      {/* Image area — fixed 16:10 box. object-cover fills it without distortion;
          covers are authored at 16:10 so nothing is cropped. */}
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-elevated">
        {image ? (
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover group-hover:scale-[1.02] transition-transform duration-normal"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          /* Placeholder shown when a post has no cover image */
          <div className="absolute inset-0 flex items-center justify-center bg-surface-elevated">
            <span className="text-mono-sm text-text-muted-dark px-lg text-center">
              {imageAlt}
            </span>
          </div>
        )}
      </div>

      {/* Content area — flex column so the date can pin to the bottom and every
          card ends up the same height. */}
      <div className="flex flex-grow flex-col p-lg">
        {/* Category + reading time kicker */}
        <Caption className="text-accent">
          {category} &middot; {readingTime}
        </Caption>

        {/* Title — reserve two lines so 1- and 2-line titles align */}
        <h3 className="text-h3 mt-sm line-clamp-2 min-h-[2.6em]">{title}</h3>

        {/* Excerpt — truncated to a fixed word count and clamped to two lines */}
        <p className="text-body-sm text-text-muted mt-sm line-clamp-2 min-h-[2.8em]">
          {truncateWords(excerpt, EXCERPT_WORDS)}
        </p>

        {/* Date — pinned to the bottom of the card */}
        {date && (
          <p className="text-mono-sm text-text-muted mt-auto pt-md">{formatDate(date)}</p>
        )}
      </div>
    </Link>
  );

  if (prefersReducedMotion) {
    return (
      <div
        className={cn(
          "h-full overflow-hidden border border-border-light rounded-lg",
          "bg-surface",
          className
        )}
      >
        {cardContent}
      </div>
    );
  }

  return (
    <motion.div
      className={cn(
        "h-full overflow-hidden border border-border-light rounded-lg",
        "bg-surface",
        className
      )}
      whileHover={{ y: -4, boxShadow: "0 24px 60px rgba(10, 11, 13, 0.12)" }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
    >
      {cardContent}
    </motion.div>
  );
}
