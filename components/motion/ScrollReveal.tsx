"use client";

// Framer Motion domain — component micro-interactions (D-01)
// Do NOT import from gsap or @/lib/gsap — this is the Framer Motion domain per D-01

import { ReactNode } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section";
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  as = "div",
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  // If reduced motion: render children without animation — plain wrapper
  if (prefersReducedMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6, // --duration-slow: 600ms
        ease: [0.16, 1, 0.3, 1], // --ease-out: cubic-bezier(0.16, 1, 0.3, 1)
        delay,
      }}
    >
      {children}
    </MotionTag>
  );
}
