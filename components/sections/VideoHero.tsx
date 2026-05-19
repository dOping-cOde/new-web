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
  videoSrc: string;
  posterSrc: string;
}

/**
 * VideoHero — Palantir-style full-viewport dark hero with background video.
 *
 * Behaviour:
 * - Poster image always shown first (instant paint).
 * - Video is fetched as a blob via JS. Only when the full download completes
 *   does the video appear (crossfade). This means partial/buffering playback
 *   never happens — users on slow connections just see the poster.
 * - On 2g/slow-2g (via navigator.connection) the download is skipped entirely.
 * - Under prefers-reduced-motion the video is paused after load (poster stays).
 */
export function VideoHero({
  headline,
  highlightWord,
  subheadline,
  primaryCTA,
  secondaryCTA,
  videoSrc,
  posterSrc,
}: VideoHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [videoReady, setVideoReady] = useState(false);

  // Fetch video as blob — only plays after full download
  const loadVideo = useCallback(async () => {
    // Skip on slow connections
    const conn = (navigator as Navigator & { connection?: { effectiveType?: string } }).connection;
    if (conn?.effectiveType === "slow-2g" || conn?.effectiveType === "2g") return;

    // Skip if user prefers reduced motion
    if (prefersReducedMotion) return;

    try {
      const res = await fetch(videoSrc);
      if (!res.ok) return;

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      if (videoRef.current) {
        videoRef.current.src = url;
        videoRef.current.oncanplaythrough = () => {
          videoRef.current?.play().catch(() => {});
          setVideoReady(true);
        };
        videoRef.current.load();
      }
    } catch {
      // Network error — silently stay on poster
    }
  }, [videoSrc, prefersReducedMotion]);

  useEffect(() => {
    loadVideo();
  }, [loadVideo]);

  // Scroll cue animation (same pattern as HeroLight)
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
      {/* Poster image — always present, fades out when video is ready */}
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

      {/* Video — fades in when fully loaded */}
      <video
        ref={videoRef}
        className={cn(
          "absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out",
          videoReady ? "opacity-100" : "opacity-0"
        )}
        muted
        loop
        playsInline
        aria-hidden="true"
      />

      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 z-[1] bg-bg-dark/60" />

      {/* Content */}
      <Container className="relative z-[2]">
        <SplitText
          as="h1"
          text={headline}
          className="text-display-xl text-text-inverted max-w-[1100px]"
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
                className="bg-text-inverted text-bg-dark hover:bg-accent hover:text-text-inverted"
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
      </Container>

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
