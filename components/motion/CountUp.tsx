"use client";

// Framer Motion domain — component micro-interactions (D-01)
// Do NOT import from gsap or @/lib/gsap — this is the Framer Motion domain per D-01

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from "motion/react";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface CountUpProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}

export function CountUp({
  target,
  suffix = "",
  prefix = "",
  duration = 1.5,
  decimals = 0,
  className,
}: CountUpProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const motionValue = useMotionValue(0);

  const formatted = useTransform(motionValue, (latest) => {
    const fixed = latest.toFixed(decimals);
    return `${prefix}${fixed}${suffix}`;
  });

  useEffect(() => {
    if (!isInView) return;

    if (prefersReducedMotion) {
      // Show final value immediately — no animation
      motionValue.set(target);
      return;
    }

    const controls = animate(motionValue, target, {
      duration,
      ease: "easeOut",
    });

    return controls.stop;
  }, [isInView, prefersReducedMotion, target, duration, motionValue]);

  return (
    <motion.span ref={ref} className={className}>
      {formatted}
    </motion.span>
  );
}
