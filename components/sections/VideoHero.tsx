"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { SplitText } from "@/components/motion/SplitText";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface VideoHeroProps {
  headline: string;
  highlightWord?: string;
  subheadline?: string;
  primaryCTA?: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  /** One or more background clips. They crossfade and loop as a playlist.
   *  Omit (or pass an empty array) for a plain black hero. */
  videoSrcs?: string[];
  posterSrc?: string;
  /** Decorative visual rendered on the right side of the hero (e.g. a mascot). */
  aside?: React.ReactNode;
}

/**
 * VideoHero — full-viewport dark hero with a rotating background-video playlist.
 *
 * Behaviour:
 * - Poster image paints instantly; it stays until the first clip can play.
 * - Clips are layered and crossfaded (1.2s). Each plays to its end, then the
 *   next fades in; the playlist loops forever.
 * - Lazy loading: only the active clip and the one after it ever get a `src`,
 *   so we never download the whole playlist up front.
 * - On 2g/slow-2g (navigator.connection) or prefers-reduced-motion, the video
 *   layer is skipped entirely and the poster remains.
 */
export function VideoHero({
  headline,
  highlightWord,
  subheadline,
  primaryCTA,
  secondaryCTA,
  videoSrcs = [],
  posterSrc,
  aside,
}: VideoHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const [activeIndex, setActiveIndex] = useState(0);
  const [videoReady, setVideoReady] = useState(false);

  // Attach a src to a given clip only once (lazy network load).
  const ensureLoaded = useCallback(
    (i: number) => {
      const el = videoRefs.current[i];
      const src = videoSrcs[i];
      if (el && src && !el.src) {
        el.src = src;
        el.load();
      }
    },
    [videoSrcs]
  );

  // Kick off the playlist: load clip 0 (and pre-warm clip 1), play on ready.
  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { effectiveType?: string } }).connection;
    if (conn?.effectiveType === "slow-2g" || conn?.effectiveType === "2g") return;
    if (prefersReducedMotion) return;
    if (videoSrcs.length === 0) return;

    ensureLoaded(0);
    if (videoSrcs.length > 1) ensureLoaded(1);

    const first = videoRefs.current[0];
    if (!first) return;

    const onCanPlay = () => {
      first.play().catch(() => {});
      setVideoReady(true);
    };
    first.addEventListener("canplaythrough", onCanPlay, { once: true });
    return () => first.removeEventListener("canplaythrough", onCanPlay);
  }, [ensureLoaded, prefersReducedMotion, videoSrcs.length]);

  // Advance to the next clip when the active one ends; crossfade handles visuals.
  const handleEnded = useCallback(
    (i: number) => {
      if (videoSrcs.length <= 1) {
        // Single clip — just loop it.
        const el = videoRefs.current[i];
        if (el) {
          el.currentTime = 0;
          el.play().catch(() => {});
        }
        return;
      }
      const next = (i + 1) % videoSrcs.length;
      ensureLoaded(next);
      ensureLoaded((next + 1) % videoSrcs.length);
      const nextEl = videoRefs.current[next];
      if (nextEl) {
        nextEl.currentTime = 0;
        nextEl.play().catch(() => {});
      }
      setActiveIndex(next);
    },
    [ensureLoaded, videoSrcs.length]
  );

  // Scroll cue animation
  useGSAP(
    () => {
      if (prefersReducedMotion || !lineRef.current) return;

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
      dependencies: [prefersReducedMotion],
    }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100vh] flex flex-col justify-center overflow-hidden bg-bg-dark"
    >
      {/* Poster image — fades out when the first clip is ready. Omitted for a
          plain black hero (the section's bg-bg-dark shows through). */}
      {posterSrc && (
        <div
          className={cn(
            "absolute inset-0 z-0 transition-opacity duration-[1200ms] ease-in-out",
            videoReady ? "opacity-0" : "opacity-100"
          )}
        >
          <img
            src={posterSrc}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {/* Video layers — one per clip, crossfaded by opacity */}
      {videoSrcs.map((_, i) => (
        <video
          key={i}
          ref={(el) => {
            videoRefs.current[i] = el;
          }}
          className={cn(
            "absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out",
            videoReady && activeIndex === i ? "opacity-100" : "opacity-0"
          )}
          muted
          playsInline
          preload="none"
          aria-hidden="true"
          onEnded={() => handleEnded(i)}
        />
      ))}

      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 z-[1] bg-bg-dark/60" />

      {/* Content */}
      <Container className="relative z-[2]">
        <SplitText
          as="h1"
          text={headline}
          className="font-display font-light leading-[1.02] tracking-[-0.03em] text-text-inverted text-[2.75rem] md:text-[4rem] lg:text-[5rem] xl:text-[6rem] max-w-[1100px] lg:max-w-[560px] xl:max-w-[640px]"
          staggerMs={60}
          durationMs={1200}
          triggerOnMount={true}
          {...(highlightWord !== undefined && { highlightWord })}
        />

        {subheadline && (
          <p className="text-body-lg text-text-muted-dark mt-lg max-w-[640px]">
            {subheadline}
          </p>
        )}

        {(primaryCTA || secondaryCTA) && (
          <div className="flex flex-row flex-wrap gap-md mt-2xl">
            {primaryCTA && (
              <Button
                variant="primary"
                href={primaryCTA.href}
              >
                {primaryCTA.label}
              </Button>
            )}
            {secondaryCTA && (
              <Button
                variant="secondary"
                href={secondaryCTA.href}
                className="border-text-inverted/30 text-text-inverted hover:bg-text-inverted/10"
              >
                {secondaryCTA.label}
              </Button>
            )}
          </div>
        )}

        {/* Decorative mascot — in-flow below the text on mobile, pinned to the
            right and vertically centered on desktop so it never overlaps copy. */}
        {aside && (
          <div
            className="mx-auto mt-3xl w-full max-w-[220px] lg:pointer-events-none lg:absolute lg:right-0 lg:top-1/2 lg:mt-0 lg:max-w-[340px] lg:-translate-y-1/2 xl:max-w-[420px]"
            aria-hidden="true"
          >
            {aside}
          </div>
        )}
      </Container>

      {/* Playlist progress dots */}
      {videoSrcs.length > 1 && (
        <div
          className="absolute bottom-xl right-xl z-[2] hidden items-center gap-[8px] md:flex"
          aria-hidden="true"
        >
          {videoSrcs.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-[6px] rounded-full transition-all duration-normal",
                activeIndex === i ? "w-[24px] bg-accent" : "w-[6px] bg-text-inverted/30"
              )}
            />
          ))}
        </div>
      )}

      {/* Scroll cue */}
      <div
        ref={scrollCueRef}
        className="absolute bottom-xl left-1/2 -translate-x-1/2 flex flex-col items-center z-[2]"
        aria-hidden="true"
      >
        <span className="text-mono-sm text-text-muted-dark">scroll</span>
        <div
          ref={lineRef}
          className="w-px h-[32px] bg-text-inverted/30 mx-auto mt-sm"
          style={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
        />
      </div>
    </section>
  );
}
