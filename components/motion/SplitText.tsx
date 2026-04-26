"use client";

// GSAP domain — scroll timelines and text reveals (D-01)
// Uses useGSAP exclusively — NEVER raw useEffect (per D-02, ANIM-10)
// All consumers import gsap from @/lib/gsap, not directly from "gsap"

import { useRef, RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface SplitTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p" | "span";
  staggerMs?: number;
  durationMs?: number;
  triggerOnMount?: boolean;
  triggerRef?: RefObject<HTMLElement>;
  /** Word within text to wrap in accent color (text-accent class). Must match exactly one word. */
  highlightWord?: string;
}

export function SplitText({
  text,
  className,
  as: Tag = "span",
  staggerMs = 60,
  durationMs = 1200,
  triggerOnMount = true,
  triggerRef,
  highlightWord,
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const words = text.split(" ");

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        // Skip animation — show all words immediately
        gsap.set(".split-word", { y: "0%", opacity: 1 });
        return;
      }

      if (!triggerOnMount && !triggerRef) return;

      const animConfig: gsap.TweenVars = {
        y: "0%",
        opacity: 1,
        duration: durationMs / 1000,
        ease: "power3.out", // Closest GSAP equivalent to --ease-out: cubic-bezier(0.16, 1, 0.3, 1)
        stagger: staggerMs / 1000,
      };

      if (triggerRef?.current) {
        animConfig.scrollTrigger = {
          trigger: triggerRef.current,
          start: "top 80%",
          once: true,
        };
      }

      gsap.fromTo(
        ".split-word",
        { y: "100%", opacity: 0 },
        animConfig
      );
    },
    {
      scope: containerRef,
      dependencies: [prefersReducedMotion, triggerOnMount, triggerRef, staggerMs, durationMs],
    }
  );

  return (
    // @ts-expect-error — polymorphic ref assignment; Tag is constrained to valid HTML elements
    <Tag ref={containerRef} className={className}>
      {words.map((word, index) => {
        const isHighlighted = highlightWord && word === highlightWord;
        return (
          <span
            key={index}
            style={{ display: "inline-block", overflow: "hidden" }}
          >
            <span
              className={isHighlighted ? "split-word text-accent" : "split-word"}
              style={{
                display: "inline-block",
                opacity: prefersReducedMotion ? 1 : 0,
                transform: prefersReducedMotion ? "none" : "translateY(100%)",
              }}
            >
              {word}
              {index < words.length - 1 ? "\u00a0" : ""}
            </span>
          </span>
        );
      })}
    </Tag>
  );
}
