"use client";

// GSAP domain — image parallax (D-01, ANIM-03)

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { Caption } from "@/components/ui/Caption";
import { StatBlock } from "@/components/ui/StatBlock";
import { Container } from "@/components/layout/Container";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface HeroDarkProps {
  /** Kicker text, e.g. "ENERGY · IOT · CLIENT: [DISCOM]" */
  kicker: string;
  /** Display-lg headline */
  headline: string;
  /** 2-line summary in body-lg */
  intro: string;
  /** Full-bleed hero image path (LCP candidate — loaded with priority) */
  heroImage?: string;
  /** Alt text for hero image */
  heroImageAlt?: string;
  /** Stat row KPIs (up to 4) */
  stats?: Array<{ value: string; label: string }>;
  className?: string;
}

/**
 * HeroDark — shared dark cinematic hero for all 11 case-study pages.
 * Carries data-theme="dark" for navbar IntersectionObserver detection.
 * Client Component (required for GSAP parallax via useGSAP).
 */
export function HeroDark({
  kicker,
  headline,
  intro,
  heroImage,
  heroImageAlt,
  stats,
  className,
}: HeroDarkProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Image parallax at 0.85x scroll speed (ANIM-03)
  // Under reduced motion, skip entirely — image stays static
  useGSAP(
    () => {
      if (prefersReducedMotion || !heroImage || !imageContainerRef.current) return;

      gsap.to(imageContainerRef.current, {
        y: () => window.innerHeight * 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    {
      scope: sectionRef,
      dependencies: [prefersReducedMotion, heroImage],
    }
  );

  return (
    <section
      ref={sectionRef}
      data-theme="dark"
      className={cn(
        "bg-bg-dark text-text-inverted overflow-hidden",
        "py-3xl md:py-5xl",
        className
      )}
    >
      <Container>
        <Caption as="p" className="text-text-muted-dark mb-lg">
          {kicker}
        </Caption>

        <h1 className="text-display-lg text-text-inverted mt-lg max-w-[820px]">
          {headline}
        </h1>

        <p className="text-body-lg text-text-muted-dark mt-lg max-w-[640px]">
          {intro}
        </p>

        {heroImage && (
          <div className="relative mt-2xl w-full aspect-[16/10] rounded-xl overflow-hidden">
            <div
              ref={imageContainerRef}
              className="absolute inset-0"
            >
              {/* TODO: Replace with real project photography when assets are available */}
              <Image
                src={heroImage}
                alt={heroImageAlt ?? ""}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        )}

        {stats && stats.length > 0 && (
          <div
            className={cn(
              "mt-2xl",
              "grid grid-cols-2 gap-2xl",
              "md:flex md:flex-row md:items-start md:gap-0"
            )}
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={cn(
                  "md:flex-1",
                  i > 0 && "md:border-l md:border-border-dark md:pl-2xl"
                )}
              >
                <StatBlock value={stat.value} label={stat.label} dark={true} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
