import { cn } from "@/lib/utils";
import { HeroLight } from "@/components/sections/HeroLight";
import { Container } from "@/components/layout/Container";

interface LegalDocProps {
  title: string;
  intro: string;
  lastUpdated: string;
  children: React.ReactNode;
}

/**
 * LegalDoc — shared layout for legal pages (Privacy, Terms). Renders a compact
 * hero plus a readable article column. Body content uses plain HTML elements
 * (h2/p/ul/strong/a) styled via arbitrary child variants so each page only
 * supplies copy, not styling. Server Component.
 */
export function LegalDoc({ title, intro, lastUpdated, children }: LegalDocProps) {
  return (
    <>
      <HeroLight
        kicker="LEGAL"
        headline={title}
        headlineSize="text-display-md"
        intro={intro}
      />

      <section className="border-t border-border-light bg-bg-light py-3xl md:py-5xl">
        <Container>
          <p className="mb-2xl text-mono-sm text-text-muted">
            Last updated: {lastUpdated}
          </p>

          <article
            className={cn(
              "max-w-[760px] text-body text-text-muted",
              "[&_h2]:mb-md [&_h2]:mt-2xl [&_h2]:font-medium [&_h2]:text-h2 [&_h2]:text-text",
              "[&_h2:first-child]:mt-0",
              "[&_p]:mb-md [&_p]:leading-relaxed",
              "[&_a]:text-accent [&_a:hover]:text-accent-hover",
              "[&_ul]:my-md [&_ul]:list-disc [&_ul]:space-y-sm [&_ul]:pl-lg",
              "[&_strong]:font-medium [&_strong]:text-text"
            )}
          >
            {children}
          </article>
        </Container>
      </section>
    </>
  );
}
