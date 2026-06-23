"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface NavChild {
  label: string;
  href: string;
}

interface NavLink {
  label: string;
  href: string;
  children?: ReadonlyArray<NavChild>;
}

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: ReadonlyArray<NavLink>;
  /** Ref to the trigger button — focus returns here when overlay closes (WCAG 2.1 §2.4.3) */
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
}

export function MobileNav({ isOpen, onClose, links, triggerRef }: MobileNavProps) {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);
  const [expandedDropdown, setExpandedDropdown] = useState<string | null>(null);

  // Focus trapping and body scroll lock.
  useEffect(() => {
    if (!isOpen) {
      // Return focus to trigger when overlay closes (WCAG 2.1 SC 2.4.3)
      if (wasOpenRef.current && triggerRef?.current) {
        triggerRef.current.focus();
      }
      wasOpenRef.current = false;
      return;
    }

    wasOpenRef.current = true;
    document.body.style.overflow = "hidden";

    const overlay = overlayRef.current;
    if (!overlay) return;

    const focusableElements = overlay.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    firstFocusable?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        } else if (!e.shiftKey && document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, triggerRef]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <div
      ref={overlayRef}
      id="mobile-nav-overlay"
      className={cn(
        "fixed inset-0 z-40 md:hidden",
        "bg-[rgba(8,8,10,0.96)] supports-[backdrop-filter]:backdrop-blur-[24px]",
        "flex flex-col px-[24px] pb-[32px] pt-[96px]",
        "transition-opacity duration-normal",
        isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      )}
      aria-hidden={!isOpen}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      {/* Ambient accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[120px] right-[-80px] h-[280px] w-[280px] rounded-full bg-accent/10 blur-[90px]"
      />

      {/* Nav links with stagger */}
      <nav className="flex flex-1 flex-col gap-[6px]">
        {links.map((link, index) => {
          const hasChildren = link.children && link.children.length > 0;
          const isExpanded = expandedDropdown === link.label;
          const active = isActive(link.href);

          if (hasChildren) {
            return (
              <div
                key={link.href}
                className={cn(
                  "border-b border-white/[0.06] transition-all duration-slow",
                  isOpen ? "translate-y-0 opacity-100" : "translate-y-[16px] opacity-0"
                )}
                style={{ transitionDelay: isOpen ? `${index * 55}ms` : "0ms" }}
              >
                <button
                  onClick={() => setExpandedDropdown(isExpanded ? null : link.label)}
                  className={cn(
                    "flex w-full items-center justify-between py-[18px]",
                    "text-h1 transition-colors duration-fast",
                    active ? "text-accent" : "text-text"
                  )}
                  tabIndex={isOpen ? 0 : -1}
                  aria-expanded={isExpanded}
                >
                  {link.label}
                  <svg
                    className={cn(
                      "h-[22px] w-[22px] text-text-muted transition-transform duration-normal",
                      isExpanded && "rotate-180 text-accent"
                    )}
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 4.5L6 7.5L9 4.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <div
                  className={cn(
                    "grid overflow-hidden transition-all duration-normal ease-out",
                    isExpanded ? "grid-rows-[1fr] pb-[16px] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="flex min-h-0 flex-col gap-[2px]">
                    {link.children!.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={onClose}
                        className="rounded-[10px] px-[14px] py-[11px] text-body-lg text-text-muted transition-colors duration-fast hover:bg-white/[0.05] hover:text-accent"
                        tabIndex={isOpen && isExpanded ? 0 : -1}
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
              onClick={onClose}
              className={cn(
                "border-b border-white/[0.06] py-[18px] text-h1",
                "transition-all duration-slow hover:text-accent",
                active ? "text-accent" : "text-text",
                isOpen ? "translate-y-0 opacity-100" : "translate-y-[16px] opacity-0"
              )}
              style={{ transitionDelay: isOpen ? `${index * 55}ms` : "0ms" }}
              tabIndex={isOpen ? 0 : -1}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* CTA pinned to the bottom */}
      <div
        className={cn(
          "mt-[24px] transition-all duration-slow",
          isOpen ? "translate-y-0 opacity-100" : "translate-y-[16px] opacity-0"
        )}
        style={{ transitionDelay: isOpen ? `${links.length * 55}ms` : "0ms" }}
      >
        <Button
          variant="primary"
          href="/contact"
          onClick={onClose}
          arrow
          className="w-full"
          tabIndex={isOpen ? 0 : -1}
        >
          Book Free Consultation
        </Button>
        <p className="mt-[16px] text-center text-body-sm text-text-muted">
          hello@softiques.com
        </p>
      </div>
    </div>
  );
}
