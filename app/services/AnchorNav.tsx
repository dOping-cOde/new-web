"use client";

import { useEffect, useRef, useState } from "react";
import { SERVICES } from "@/lib/services";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

// ─── Sticky Anchor Nav ─────────────────────────────────────────────────────────
// Client component: uses IntersectionObserver for active-section detection.

const NAV_LINKS = [
  { label: "AI Agents", id: "ai-agents" },
  { label: "Chatbots", id: "chatbots" },
  { label: "Healthcare", id: "healthcare" },
  { label: "Energy", id: "energy" },
  { label: "Infrastructure", id: "infrastructure" },
  { label: "Data & Analytics", id: "data-analytics" },
];

export function ServicesAnchorNav() {
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sectionIds = SERVICES.map((s) => s.anchorId);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const intersecting = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => {
            const aTop = Math.abs(a.boundingClientRect.top - 64);
            const bTop = Math.abs(b.boundingClientRect.top - 64);
            return aTop - bTop;
          });

        const first = intersecting[0];
        if (first) {
          setActiveId(first.target.id);
        }
      },
      {
        rootMargin: "-64px 0px -40% 0px",
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current!.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <nav
      className={cn(
        "sticky z-40",
        "bg-bg-light/95 backdrop-blur-sm",
        "border-b border-border-light"
      )}
      style={{ top: "64px" }}
      aria-label="Services sections"
    >
      <Container>
        <div
          className={cn(
            "flex items-center gap-xl",
            "overflow-x-auto",
            "py-md"
          )}
          style={{ WebkitOverflowScrolling: "touch", whiteSpace: "nowrap" }}
        >
          {NAV_LINKS.map(({ label, id }) => {
            const isActive = activeId === id;
            return (
              <button
                key={id}
                className={cn(
                  "text-body-sm shrink-0",
                  "transition-colors duration-fast",
                  "relative pb-xs bg-transparent border-0 cursor-pointer",
                  isActive ? "text-accent" : "text-text-muted hover:text-text"
                )}
                onClick={() => {
                  document
                    .getElementById(id)
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {label}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>
      </Container>
    </nav>
  );
}
