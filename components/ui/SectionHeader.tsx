import { cn } from "@/lib/utils";
import { Caption } from "@/components/ui/Caption";
import { type ComponentProps } from "react";

interface SectionHeaderProps extends ComponentProps<"header"> {
  /** Uppercase kicker text, e.g. "WHAT WE BUILD" */
  kicker?: string;
  /** Heading text */
  heading: string;
  /** Typography class for heading. Defaults to text-display-lg */
  headingSize?: "text-display-xl" | "text-display-lg" | "text-display-md";
  /** Optional intro paragraph below heading */
  intro?: string;
  /** Centered layout (for heroes) vs left-aligned */
  align?: "left" | "center";
  /** Dark theme variant — inverts text colors */
  dark?: boolean;
}

export function SectionHeader({
  kicker,
  heading,
  headingSize = "text-display-lg",
  intro,
  align = "left",
  dark = false,
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        align === "center" && "text-center",
        className
      )}
      {...props}
    >
      {kicker && (
        <Caption
          as="p"
          className={cn(
            "mb-lg",
            dark ? "text-text-muted-dark" : "text-text-muted"
          )}
        >
          {kicker}
        </Caption>
      )}
      <h2
        className={cn(
          headingSize,
          dark ? "text-text-inverted" : "text-text"
        )}
      >
        {heading}
      </h2>
      {intro && (
        <p
          className={cn(
            "text-body-lg mt-lg max-w-[640px]",
            align === "center" && "mx-auto",
            dark ? "text-text-muted-dark" : "text-text-muted"
          )}
        >
          {intro}
        </p>
      )}
    </header>
  );
}
