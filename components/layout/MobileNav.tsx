"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
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
  const overlayRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);
  const [expandedDropdown, setExpandedDropdown] = useState<string | null>(null);

  // Per D-11: Focus trapping and body scroll lock
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

    // Lock body scroll
    document.body.style.overflow = "hidden";

    // Focus trap
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

  return (
    <div
      ref={overlayRef}
      id="mobile-nav-overlay"
      className={cn(
        "fixed inset-0 z-40 md:hidden",
        "bg-bg-dark",
        "flex flex-col items-center justify-center",
        "transition-opacity duration-normal",
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      )}
      aria-hidden={!isOpen}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      {/* Nav links with stagger — per D-09: 60ms stagger from top */}
      <nav className="flex flex-col items-center gap-2xl">
        {links.map((link, index) => {
          const hasChildren = link.children && link.children.length > 0;
          const isExpanded = expandedDropdown === link.label;

          if (hasChildren) {
            return (
              <div key={link.href} className="flex flex-col items-center">
                <button
                  onClick={() => setExpandedDropdown(isExpanded ? null : link.label)}
                  className={cn(
                    "text-display-md text-text-inverted flex items-center gap-sm",
                    "hover:text-accent transition-colors duration-fast",
                    "transition-all duration-slow",
                    isOpen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-[20px]",
                  )}
                  style={{
                    transitionDelay: isOpen ? `${index * 60}ms` : "0ms",
                  }}
                  tabIndex={isOpen ? 0 : -1}
                  aria-expanded={isExpanded}
                >
                  {link.label}
                  <svg
                    className={cn(
                      "w-[20px] h-[20px] transition-transform duration-normal",
                      isExpanded && "rotate-180"
                    )}
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {/* Expandable children */}
                <div
                  className={cn(
                    "flex flex-col items-center gap-md overflow-hidden transition-all duration-normal",
                    isExpanded ? "max-h-[500px] mt-lg opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  {link.children!.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={onClose}
                      className="text-body-lg text-text-muted-dark hover:text-accent transition-colors duration-fast"
                      tabIndex={isOpen && isExpanded ? 0 : -1}
                    >
                      {child.label}
                    </Link>
                  ))}
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
                "text-display-md text-text-inverted",
                "hover:text-accent transition-colors duration-fast",
                "transition-all duration-slow",
                isOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-[20px]",
              )}
              style={{
                transitionDelay: isOpen ? `${index * 60}ms` : "0ms",
              }}
              tabIndex={isOpen ? 0 : -1}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* CTA at bottom */}
      <div
        className={cn(
          "mt-3xl transition-all duration-slow",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[20px]"
        )}
        style={{
          transitionDelay: isOpen ? `${links.length * 60}ms` : "0ms",
        }}
      >
        <Button
          variant="primary"
          href="/contact"
          onClick={onClose}
          className="bg-accent text-text-inverted hover:bg-accent-hover"
          tabIndex={isOpen ? 0 : -1}
        >
          Talk to engineering
        </Button>
      </div>
    </div>
  );
}
