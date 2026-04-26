import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceTileProps {
  title: string;
  description: string;
  tag: string;
  href: string;
  className?: string;
}

export function ServiceTile({
  title,
  description,
  tag,
  href,
  className,
}: ServiceTileProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative block",
        "bg-surface border border-border-light rounded-md",
        "p-lg",
        className
      )}
    >
      <h3 className="text-h3">{title}</h3>
      <p className="text-body-sm text-text-muted mt-sm">{description}</p>
      <span className="text-mono-sm text-text-muted mt-md block">{tag}</span>

      {/* Hover-reveal arrow — initially hidden, slides in on hover */}
      <span
        className={cn(
          "absolute right-lg top-1/2 -translate-y-1/2",
          "text-accent",
          "opacity-0 -translate-x-2",
          "group-hover:opacity-100 group-hover:translate-x-0",
          "transition-all duration-normal"
        )}
        aria-hidden="true"
      >
        <ArrowRight size={16} />
      </span>
    </Link>
  );
}
