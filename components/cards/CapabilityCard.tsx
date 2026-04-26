import Link from "next/link";
import { Pill } from "@/components/ui/Pill";
import { cn } from "@/lib/utils";

interface CapabilityCardProps {
  title: string;
  description: string;
  tags: string[];
  href: string;
  className?: string;
}

export function CapabilityCard({
  title,
  description,
  tags,
  href,
  className,
}: CapabilityCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "block",
        "bg-surface border border-border-light rounded-md",
        "p-lg",
        className
      )}
    >
      <h3 className="text-h3">{title}</h3>
      <p className="text-body-sm text-text-muted mt-sm">{description}</p>

      {/* Tech-stack tags */}
      <div className="flex flex-wrap gap-sm mt-md">
        {tags.map((tag) => (
          <Pill key={tag} as="span">
            {tag}
          </Pill>
        ))}
      </div>
    </Link>
  );
}
