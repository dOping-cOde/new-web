import Image from "next/image";
import Link from "next/link";
import { Caption } from "@/components/ui/Caption";
import { cn } from "@/lib/utils";

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
  return (
    <Link
      href={`/portfolio/${slug}`}
      className={cn(
        "group block",
        "border border-border-light rounded-lg",
        "bg-surface",
        "transition-shadow duration-normal hover:shadow-md",
        className
      )}
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
}
