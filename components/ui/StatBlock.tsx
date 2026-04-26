import { cn } from "@/lib/utils";
import { type ComponentProps } from "react";

interface StatBlockProps extends ComponentProps<"div"> {
  /** The numeric value to display, e.g. "8,000+" or "5 min" */
  value: string;
  /** Label text below the number, e.g. "Transformers monitored" */
  label: string;
  /** Dark theme variant */
  dark?: boolean;
}

export function StatBlock({
  value,
  label,
  dark = false,
  className,
  ...props
}: StatBlockProps) {
  return (
    <div className={cn("text-center", className)} {...props}>
      <p
        className={cn(
          "text-display-lg text-accent"
          /* display-lg: Fraunces 300, 5rem desktop / 2.75rem mobile */
        )}
      >
        {value}
      </p>
      <p
        className={cn(
          "text-caption mt-sm",
          dark ? "text-text-muted-dark" : "text-text-muted"
        )}
      >
        {label}
      </p>
    </div>
  );
}
