"use client";

// Framer Motion domain — animated number counter (D-01, ANIM-04)

import { cn } from "@/lib/utils";
import { type ComponentProps } from "react";
import { CountUp } from "@/components/motion/CountUp";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface StatBlockProps extends ComponentProps<"div"> {
  /** The numeric value to display, e.g. "8,000+" or "5 min" */
  value: string;
  /** Label text below the number, e.g. "Transformers monitored" */
  label: string;
  /** Dark theme variant */
  dark?: boolean;
}

/**
 * Parse a stat value string into its numeric and text components.
 * Examples:
 *   "8"      → { target: 8, prefix: "", suffix: "", decimals: 0, isNumeric: true }
 *   "500+"   → { target: 500, prefix: "", suffix: "+", decimals: 0, isNumeric: true }
 *   "0.92"   → { target: 0.92, prefix: "", suffix: "", decimals: 2, isNumeric: true }
 *   "5 min"  → { target: 5, prefix: "", suffix: " min", decimals: 0, isNumeric: true }
 *   "1.4M"   → { target: 1.4, prefix: "", suffix: "M", decimals: 1, isNumeric: true }
 *   "24/7"   → { isNumeric: false }
 */
function parseStatValue(value: string): {
  target: number;
  prefix: string;
  suffix: string;
  decimals: number;
  isNumeric: boolean;
} {
  const match = value.match(/^([^\d]*)([\d.]+)(.*)$/);

  if (!match) {
    return { target: 0, prefix: "", suffix: "", decimals: 0, isNumeric: false };
  }

  const prefix = match[1] ?? "";
  const numStr = match[2] ?? "";
  const suffix = match[3] ?? "";
  const target = parseFloat(numStr);

  if (isNaN(target)) {
    return { target: 0, prefix: "", suffix: "", decimals: 0, isNumeric: false };
  }

  // Count decimal places from the matched number string
  const dotIndex = numStr.indexOf(".");
  const decimals = dotIndex === -1 ? 0 : numStr.length - dotIndex - 1;

  return { target, prefix, suffix, decimals, isNumeric: true };
}

export function StatBlock({
  value,
  label,
  dark = false,
  className,
  ...props
}: StatBlockProps) {
  const prefersReducedMotion = useReducedMotion();
  const parsed = parseStatValue(value);

  return (
    <div className={cn("text-center", className)} {...props}>
      <p
        className={cn(
          "text-display-lg text-accent"
          /* display-lg: Fraunces 300, 5rem desktop / 2.75rem mobile */
        )}
      >
        {parsed.isNumeric && !prefersReducedMotion ? (
          <CountUp
            target={parsed.target}
            prefix={parsed.prefix}
            suffix={parsed.suffix}
            decimals={parsed.decimals}
          />
        ) : (
          value
        )}
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
