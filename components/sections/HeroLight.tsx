"use client";

// GSAP domain — hero text reveal + scroll cue (D-01, ANIM-01)

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Caption } from "@/components/ui/Caption";
import { Container } from "@/components/layout/Container";
import { SplitText } from "@/components/motion/SplitText";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface HeroLightProps {
  kicker?: string;
  headline: string;
  headlineSize?: "text-display-xl" | "text-display-lg" | "text-display-md";
  /** Word within headline to wrap in accent color span. Must match exactly one word in the headline. */
  highlightWord?: string;
  intro?: string;
  primaryCTA?: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  /** Show scroll cue at bottom of section (home page only) */
  showScrollCue?: boolean;
  className?: string;
  /** Optional SVG/image URL applied as a full-bleed background on the section (e.g. hero texture) */
  backgroundImage?: string;
  /** Additional content rendered after CTAs (e.g. WebGL canvas placeholder) */
  children?: React.ReactNode;
}

/**
 * HeroLight — shared light-background hero for Home, Services, About, Contact, Portfolio.
 * Client Component (required for GSAP useGSAP scroll cue animation).
 */
export function HeroLight({
  kicker,
  headline,
  headlineSize = "text-display-xl",
  highlightWord,
  intro,
  primaryCTA,
  secondaryCTA,
  showScrollCue = false,
  className,
  backgroundImage,
  children,
}: HeroLightProps) {
  const isFullViewport = headlineSize === "text-display-xl";
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Animate the scroll cue line: repeating opacity loop (2s) — skip under reduced motion
  useGSAP(
    () => {
      if (!showScrollCue || prefersReducedMotion || !lineRef.current) return;

      gsap.fromTo(
        lineRef.current,
        { opacity: 0, scaleY: 0, transformOrigin: "top center" },
        {
          opacity: 1,
          scaleY: 1,
          duration: 1,
          ease: "power2.out",
          repeat: -1,
          yoyo: true,
          repeatDelay: 0.5,
        }
      );
    },
    {
      scope: scrollCueRef,
      dependencies: [showScrollCue, prefersReducedMotion],
    }
  );

  return (
    <section
      className={cn(
        "relative bg-bg-light",
        "py-3xl md:py-5xl",
        isFullViewport && "min-h-[calc(100vh-64px)] flex flex-col justify-center",
        className
      )}
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" }
          : undefined
      }
    >
      <Container>
        {kicker && (
          <Caption as="p" className="mb-lg text-text-muted">
            {kicker}
          </Caption>
        )}

        <SplitText
          as="h1"
          text={headline}
          className={cn(headlineSize, "text-text max-w-[900px]")}
          staggerMs={60}
          durationMs={1200}
          triggerOnMount={true}
          {...(highlightWord !== undefined && { highlightWord })}
        />

        {intro && (
          <p className="text-body-lg text-text-muted mt-lg max-w-[640px]">
            {intro}
          </p>
        )}

        {(primaryCTA || secondaryCTA) && (
          <div className="flex flex-row flex-wrap gap-md mt-2xl">
            {primaryCTA && (
              <Button variant="primary" href={primaryCTA.href}>
                {primaryCTA.label}
              </Button>
            )}
            {secondaryCTA && (
              <Button variant="secondary" href={secondaryCTA.href}>
                {secondaryCTA.label}
              </Button>
            )}
          </div>
        )}

        {children}
      </Container>

      {showScrollCue && (
        <div
          ref={scrollCueRef}
          className="absolute bottom-xl left-1/2 -translate-x-1/2 flex flex-col items-center"
          aria-hidden="true"
        >
          <span className="text-mono-sm text-text-muted">scroll</span>
          <div
            ref={lineRef}
            className="w-px h-[32px] bg-border-light mx-auto mt-sm"
            style={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          />
        </div>
      )}
    </section>
  );
}
