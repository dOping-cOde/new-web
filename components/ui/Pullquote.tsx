import { cn } from "@/lib/utils";

interface PullquoteProps {
  quote: string;
  attribution?: string;
  className?: string;
}

export function Pullquote({ quote, attribution, className }: PullquoteProps) {
  return (
    <blockquote className={cn("py-lg", className)}>
      {/* TODO: real client quote pending approval — see D-08 */}

      {/* Decorative quote mark — Fraunces display font, indigo accent */}
      <span
        aria-hidden="true"
        className="text-accent text-[4rem] leading-none font-display block mb-sm"
      >
        &ldquo;
      </span>

      {/* Quote text — Fraunces 300/400 italic via display-md utility */}
      <p className="text-display-md italic">{quote}</p>

      {/* Attribution — only rendered when provided; never fabricated (D-08) */}
      {attribution && (
        <footer className="text-caption text-text-muted mt-lg">
          {attribution}
        </footer>
      )}
    </blockquote>
  );
}
