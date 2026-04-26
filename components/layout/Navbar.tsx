"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { MobileNav } from "@/components/layout/MobileNav";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Per D-06: IntersectionObserver watches elements with data-theme="dark"
  // When navbar (top 64px) overlaps a dark section, swap to dark theme
  useEffect(() => {
    const darkSections = document.querySelectorAll('[data-theme="dark"]');
    if (darkSections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Determine if any dark section is behind the navbar
        let darkBehindNav = false;
        entries.forEach((entry) => {
          const rect = entry.boundingClientRect;
          // Dark section overlaps navbar if its top is above 64px and bottom is above 0
          if (rect.top < 64 && rect.bottom > 0) {
            darkBehindNav = true;
          }
        });
        setIsDark(darkBehindNav);
      },
      {
        threshold: [0, 0.1, 0.5, 1],
      }
    );

    darkSections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const toggleMobile = useCallback(() => {
    setIsMobileOpen((prev) => !prev);
  }, []);

  const closeMobile = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50",
          "h-[64px] flex items-center",
          // Per D-07: 320ms transition, per D-08: backdrop blur
          "transition-colors duration-normal",
          "backdrop-blur-[20px]",
          isDark
            ? "bg-[rgba(10,11,13,0.72)] text-text-inverted"
            : "bg-[rgba(250,250,247,0.72)] text-text"
        )}
        aria-label="Main navigation"
      >
        <Container className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-h3 font-medium tracking-tight"
            onClick={closeMobile}
          >
            Softwires
          </Link>

          {/* Desktop nav links — centered */}
          <div className="hidden md:flex items-center gap-xl">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-body-sm relative",
                  "transition-colors duration-normal",
                  "hover:text-accent",
                  // Animated underline: 0 -> 100% width on hover
                  "after:absolute after:bottom-[-4px] after:left-0",
                  "after:h-[1px] after:w-0 after:bg-accent",
                  "after:transition-all after:duration-normal",
                  "hover:after:w-full"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button
              variant="primary"
              href="/contact"
              className={cn(
                "text-[14px] px-md py-sm",
                isDark && "bg-text-inverted text-text hover:bg-accent hover:text-text-inverted"
              )}
            >
              Talk to engineering
            </Button>
          </div>

          {/* Mobile hamburger — per D-10: morphs to X via CSS transforms */}
          <button
            ref={hamburgerRef}
            className="md:hidden relative w-[24px] h-[24px] flex flex-col items-center justify-center gap-[6px]"
            onClick={toggleMobile}
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-nav-overlay"
          >
            <span
              className={cn(
                "block w-[20px] h-[1.5px] rounded-full transition-all duration-normal origin-center",
                isDark ? "bg-text-inverted" : "bg-text",
                isMobileOpen && "translate-y-[3.75px] rotate-45"
              )}
            />
            <span
              className={cn(
                "block w-[20px] h-[1.5px] rounded-full transition-all duration-normal origin-center",
                isDark ? "bg-text-inverted" : "bg-text",
                isMobileOpen && "-translate-y-[3.75px] -rotate-45"
              )}
            />
          </button>
        </Container>
      </nav>

      {/* Mobile nav overlay */}
      <MobileNav
        isOpen={isMobileOpen}
        onClose={closeMobile}
        links={NAV_LINKS}
        triggerRef={hamburgerRef}
      />

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-[64px]" aria-hidden="true" />
    </>
  );
}
