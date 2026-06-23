"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { MobileNav } from "@/components/layout/MobileNav";

const SERVICES = [
  { short: "Websites", label: "Website Development", href: "/services/websites", desc: "Marketing sites & web apps" },
  { short: "Apps", label: "App Development", href: "/services/apps", desc: "iOS, Android & cross-platform" },
  { short: "Games", label: "Game Development", href: "/services/gaming", desc: "Real-time engines & gameplay" },
  { short: "ERP", label: "ERP Solutions", href: "/services/erp", desc: "Operations, finance & supply" },
  { short: "AI", label: "AI Solutions", href: "/services/ai", desc: "LLMs, agents & automation" },
  { short: "ML", label: "ML Solutions", href: "/services/ml", desc: "Models, data & pipelines" },
] as const;

const NAV_LINKS = [
  { label: "Services", href: "/services", children: SERVICES },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const isActive = useCallback(
    (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href)),
    [pathname]
  );

  // Solid bar once scrolled past the top.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openServices = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  }, []);

  const closeServices = useCallback(() => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 120);
  }, []);

  const toggleMobile = useCallback(() => setIsMobileOpen((prev) => !prev), []);
  const closeMobile = useCallback(() => setIsMobileOpen(false), []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50",
          "transition-colors duration-normal ease-out",
          "supports-[backdrop-filter]:backdrop-blur-[18px]",
          scrolled || servicesOpen
            ? "border-b border-white/10 bg-[rgba(11,11,13,0.85)]"
            : "border-b border-transparent bg-[rgba(11,11,13,0.30)]"
        )}
        onMouseLeave={closeServices}
        aria-label="Main navigation"
      >
        <Container>
          <div className="flex h-[76px] items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              onClick={closeMobile}
              className="group flex items-center gap-[11px]"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "h-[10px] w-[10px] rounded-full bg-accent",
                  "transition-shadow duration-slow",
                  "group-hover:shadow-[0_0_18px_3px_rgba(255,212,0,0.65)]"
                )}
              />
              <span className="text-[22px] font-medium tracking-tight">Softiques</span>
            </Link>

            {/* Desktop nav links */}
            <nav className="hidden items-center gap-[6px] md:flex">
              {NAV_LINKS.map((link) => {
                const hasChildren = "children" in link && link.children;
                const active = isActive(link.href);

                if (hasChildren) {
                  return (
                    <button
                      key={link.href}
                      onMouseEnter={openServices}
                      onClick={() => setServicesOpen((p) => !p)}
                      aria-expanded={servicesOpen}
                      aria-haspopup="true"
                      className={cn(
                        "group flex items-center gap-[6px] px-[14px] py-[10px]",
                        "text-[13px] font-semibold uppercase tracking-[0.08em]",
                        "transition-colors duration-fast",
                        active || servicesOpen ? "text-accent" : "text-text hover:text-accent"
                      )}
                    >
                      {link.label}
                      <svg
                        className={cn(
                          "h-[11px] w-[11px] transition-transform duration-normal",
                          servicesOpen && "rotate-180"
                        )}
                        viewBox="0 0 12 12"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M3 4.5L6 7.5L9 4.5"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onMouseEnter={closeServices}
                    className={cn(
                      "relative px-[14px] py-[10px]",
                      "text-[13px] font-semibold uppercase tracking-[0.08em]",
                      "transition-colors duration-fast",
                      "after:absolute after:bottom-[6px] after:left-[14px] after:right-[14px]",
                      "after:h-[2px] after:origin-left after:scale-x-0 after:bg-accent",
                      "after:transition-transform after:duration-normal hover:after:scale-x-100",
                      active ? "text-accent after:scale-x-100" : "text-text hover:text-accent"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <Link
              href="/contact"
              className={cn(
                "group hidden items-center gap-[9px] rounded-full md:inline-flex",
                "bg-accent px-[22px] py-[12px]",
                "text-[13px] font-bold uppercase tracking-[0.08em] text-bg-dark",
                "transition-all duration-fast hover:bg-accent-hover",
                "hover:shadow-[0_0_28px_-4px_rgba(255,212,0,0.6)]"
              )}
            >
              Book Free Consultation
              <span
                aria-hidden="true"
                className="text-[15px] transition-transform duration-fast group-hover:translate-x-[3px]"
              >
                &rarr;
              </span>
            </Link>

            {/* Mobile hamburger — morphs to X */}
            <button
              ref={hamburgerRef}
              className="relative flex h-[44px] w-[44px] flex-col items-center justify-center gap-[6px] rounded-full hover:bg-white/[0.06] md:hidden"
              onClick={toggleMobile}
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileOpen}
              aria-controls="mobile-nav-overlay"
            >
              <span
                className={cn(
                  "block h-[2px] w-[22px] origin-center rounded-full bg-text transition-all duration-normal",
                  isMobileOpen && "translate-y-[4px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "block h-[2px] w-[22px] origin-center rounded-full bg-text transition-all duration-normal",
                  isMobileOpen && "-translate-y-[4px] -rotate-45"
                )}
              />
            </button>
          </div>
        </Container>

        {/* Full-width Services mega-panel */}
        <div
          onMouseEnter={openServices}
          onMouseLeave={closeServices}
          className={cn(
            "absolute inset-x-0 top-full overflow-hidden",
            "border-b border-white/10 bg-[rgba(11,11,13,0.97)]",
            "supports-[backdrop-filter]:backdrop-blur-[18px]",
            "transition-all duration-normal ease-out",
            servicesOpen
              ? "pointer-events-auto visible opacity-100"
              : "pointer-events-none invisible opacity-0"
          )}
        >
          <Container>
            <div className="grid grid-cols-1 gap-xl py-2xl lg:grid-cols-12">
              {/* Intro column */}
              <div className="lg:col-span-4">
                <p className="text-caption text-accent">What we build</p>
                <h2 className="mt-md text-display-md">
                  Software, <br className="hidden lg:block" />
                  end to end.
                </h2>
                <p className="mt-md max-w-[280px] text-body-sm text-text-muted">
                  From first commit to production scale — pick a discipline, or
                  bring us the whole problem.
                </p>
                <Link
                  href="/services"
                  onClick={() => setServicesOpen(false)}
                  className="group mt-lg inline-flex items-center gap-[8px] text-[13px] font-semibold uppercase tracking-[0.08em] text-accent"
                >
                  View all services
                  <span aria-hidden="true" className="transition-transform duration-fast group-hover:translate-x-[3px]">
                    &rarr;
                  </span>
                </Link>
              </div>

              {/* Service rows */}
              <div className="grid grid-cols-1 gap-[2px] sm:grid-cols-2 lg:col-span-8">
                {SERVICES.map((service, i) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    onClick={() => setServicesOpen(false)}
                    className="group flex items-center gap-md rounded-[14px] px-[18px] py-[16px] transition-colors duration-fast hover:bg-white/[0.05]"
                  >
                    <span className="text-mono-sm text-text-muted transition-colors duration-fast group-hover:text-accent">
                      0{i + 1}
                    </span>
                    <span className="flex-1">
                      <span className="block text-h2 leading-tight text-text transition-colors duration-fast group-hover:text-accent">
                        {service.short}
                      </span>
                      <span className="mt-[2px] block text-body-sm text-text-muted">
                        {service.desc}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-[18px] text-text-muted opacity-0 transition-all duration-fast group-hover:translate-x-[2px] group-hover:text-accent group-hover:opacity-100"
                    >
                      &rarr;
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </div>
      </header>

      {/* Mobile nav overlay */}
      <MobileNav
        isOpen={isMobileOpen}
        onClose={closeMobile}
        links={NAV_LINKS}
        triggerRef={hamburgerRef}
      />

      {/* Spacer to prevent content from going under the fixed navbar */}
      <div className="h-[76px]" aria-hidden="true" />
    </>
  );
}
