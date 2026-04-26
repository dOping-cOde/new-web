"use client";

// Shared reduced-motion detection hook — D-08
// Framework-agnostic: works with GSAP, Framer Motion, and Three.js systems identically.
// Do NOT replace with Framer Motion's built-in useReducedMotion() — that would create
// a Framer dependency in code consumed by the GSAP and Three.js domains.

import { useState, useEffect } from "react";

/**
 * Returns true if the user has requested reduced motion at the OS level.
 * SSR-safe: defaults to false on the server, updates on mount.
 * Reacts to live changes — toggling OS setting mid-session takes effect immediately.
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for live changes (e.g. user toggles OS setting mid-session)
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return prefersReducedMotion;
}
