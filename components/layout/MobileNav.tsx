"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: ReadonlyArray<{ label: string; href: string }>;
  /** Ref to the trigger button — focus returns here when overlay closes (WCAG 2.1 §2.4.3) */
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
}

export function MobileNav({ isOpen, onClose, links, triggerRef }: MobileNavProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);

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
        {links.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className={cn(
              "text-display-md text-text-inverted",
              "hover:text-accent transition-colors duration-fast",
              // Stagger animation via CSS transition-delay
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
        ))}
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
