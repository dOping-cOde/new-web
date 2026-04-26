"use client";

// GSAP domain — scroll-pinned architecture reveal (D-01, ANIM-02)
// Uses useGSAP exclusively — NEVER raw useEffect (per D-02, ANIM-10)
// All GSAP imports via @/lib/gsap (D-03)

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface ScrollPinnedArchitectureProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * ScrollPinnedArchitecture — wraps Architecture section content with GSAP scroll-pin behavior.
 * Pins the section for 100vh while revealing child paragraphs, headings, and list items on scroll.
 * Under prefers-reduced-motion: no pin, no stagger — content is visible immediately.
 *
 * Used via dynamic import from mdx-components.tsx to keep mdx-components module-level clean.
 */
export default function ScrollPinnedArchitecture({
  children,
  className = "",
}: ScrollPinnedArchitectureProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Refresh ScrollTrigger after Next.js hydration to align trigger positions
  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  useGSAP(
    () => {
      if (prefersReducedMotion || !sectionRef.current || !contentRef.current) return;

      // Pin the section for 100vh scroll distance (ANIM-02, D-09)
      ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: true,
        start: "top top",
        end: "+=100vh",
        pinSpacing: true,
      });

      // Stagger-reveal child paragraphs, headings, and list items while pinned
      const revealTargets = contentRef.current.querySelectorAll("p, li, h2, h3");

      if (revealTargets.length > 0) {
        gsap.fromTo(
          revealTargets,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: {
              each: 0.12,
              from: "start",
            },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=100vh",
              scrub: true,
            },
          }
        );
      }
    },
    {
      scope: sectionRef,
      dependencies: [prefersReducedMotion],
    }
  );

  return (
    <section
      ref={sectionRef}
      className={`min-h-screen py-4xl bg-bg-dark text-text-inverted ${className}`}
      data-theme="dark"
      aria-label="Technical Architecture"
    >
      <div ref={contentRef} className="max-w-[1200px] mx-auto px-lg">
        {children}
      </div>
    </section>
  );
}
