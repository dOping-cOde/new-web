"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { MobileNav } from "@/components/layout/MobileNav";

const INDUSTRIES = [
  { label: "Healthcare", href: "/industries/healthcare" },
  { label: "Retail", href: "/industries/retail" },
  { label: "Construction", href: "/industries/construction" },
  { label: "FMCG", href: "/industries/fmcg" },
  { label: "Energy", href: "/industries/energy" },
  { label: "Financial Services", href: "/industries/financial-services" },
  { label: "Infrastructure", href: "/industries/infrastructure" },
  { label: "Mining", href: "/industries/mining" },
] as const;

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries", children: INDUSTRIES },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const industriesTimeout = useRef<ReturnType<typeof setTimeout>>(null);
  const industriesRef = useRef<HTMLDivElement>(null);
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

  // Close industries dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (industriesRef.current && !industriesRef.current.contains(e.target as Node)) {
        setIndustriesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openIndustries = useCallback(() => {
    if (industriesTimeout.current) clearTimeout(industriesTimeout.current);
    setIndustriesOpen(true);
  }, []);

  const closeIndustries = useCallback(() => {
    industriesTimeout.current = setTimeout(() => setIndustriesOpen(false), 150);
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
            {NAV_LINKS.map((link) => {
              const hasChildren = "children" in link && link.children;

              if (hasChildren) {
                return (
                  <div
                    key={link.href}
                    ref={industriesRef}
                    className="relative"
                    onMouseEnter={openIndustries}
                    onMouseLeave={closeIndustries}
                  >
                    <button
                      className={cn(
                        "text-body-sm relative flex items-center gap-[4px]",
                        "transition-colors duration-normal",
                        "hover:text-accent",
                        "after:absolute after:bottom-[-4px] after:left-0",
                        "after:h-[1px] after:w-0 after:bg-accent",
                        "after:transition-all after:duration-normal",
                        "hover:after:w-full"
                      )}
                      onClick={() => setIndustriesOpen((prev) => !prev)}
                      aria-expanded={industriesOpen}
                      aria-haspopup="true"
                    >
                      {link.label}
                      <svg
                        className={cn(
                          "w-[12px] h-[12px] transition-transform duration-normal",
                          industriesOpen && "rotate-180"
                        )}
                        viewBox="0 0 12 12"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    {/* Dropdown panel */}
                    <div
                      className={cn(
                        "absolute top-full left-1/2 -translate-x-1/2 pt-[12px]",
                        "transition-all duration-normal",
                        industriesOpen
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 -translate-y-[4px] pointer-events-none"
                      )}
                    >
                      <div
                        className={cn(
                          "rounded-lg py-sm min-w-[200px]",
                          "border shadow-sm",
                          isDark
                            ? "bg-[rgba(10,11,13,0.95)] border-white/10"
                            : "bg-[rgba(250,250,247,0.95)] border-border-light"
                        )}
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "block px-lg py-[8px] text-body-sm",
                              "transition-colors duration-fast",
                              isDark
                                ? "hover:bg-white/5"
                                : "hover:bg-black/[0.03]",
                              "hover:text-accent"
                            )}
                            onClick={() => setIndustriesOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-body-sm relative",
                    "transition-colors duration-normal",
                    "hover:text-accent",
                    "after:absolute after:bottom-[-4px] after:left-0",
                    "after:h-[1px] after:w-0 after:bg-accent",
                    "after:transition-all after:duration-normal",
                    "hover:after:w-full"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
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
