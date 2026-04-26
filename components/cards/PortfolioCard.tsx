"use client";

// Framer Motion domain — hover-lift micro-interaction (D-01, ANIM-05)

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Caption } from "@/components/ui/Caption";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface PortfolioCardProps {
  slug: string;
  title: string;
  category: string;
  subcategory: string;
  excerpt: string;
  heroImage: string;
  heroImageAlt: string;
  className?: string;
}

export function PortfolioCard({
  slug,
  title,
  category,
  subcategory,
  excerpt,
  heroImage,
  heroImageAlt,
  className,
}: PortfolioCardProps) {
  const prefersReducedMotion = useReducedMotion();

  const cardContent = (
    <Link
      href={`/portfolio/${slug}`}
      className="group block"
    >
      {/* Image area — 16:10 aspect ratio; relative required for next/image fill */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-surface-elevated">
        {heroImage ? (
          <Image
            src={heroImage}
            alt={heroImageAlt}
            fill
            className="object-cover group-hover:scale-[1.02] transition-transform duration-normal"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          /* Placeholder shown until real photography is available */
          <div className="absolute inset-0 flex items-center justify-center bg-surface-elevated">
            {/* TODO: replace with real project photography when assets are available */}
            <span className="text-mono-sm text-text-muted-dark">{heroImageAlt}</span>
          </div>
        )}
      </div>

      {/* Content area */}
      <div className="p-lg">
        {/* Category kicker */}
        <Caption className="text-accent">
          {category} &middot; {subcategory}
        </Caption>

        {/* Title */}
        <h3 className="text-h3 mt-sm">{title}</h3>

        {/* Excerpt */}
        <p className="text-body-sm text-text-muted mt-sm line-clamp-2">
          {excerpt}
        </p>
      </div>
    </Link>
  );

  if (prefersReducedMotion) {
    return (
      <div
        className={cn(
          "border border-border-light rounded-lg",
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
        "border border-border-light rounded-lg",
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
