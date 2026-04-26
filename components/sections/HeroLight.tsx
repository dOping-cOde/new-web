import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Caption } from "@/components/ui/Caption";
import { Container } from "@/components/layout/Container";

interface HeroLightProps {
  kicker?: string;
  headline: string;
  headlineSize?: "text-display-xl" | "text-display-lg" | "text-display-md";
  /** Word within headline to wrap in accent color span. Must match exactly one word in the headline. */
  highlightWord?: string;
  intro?: string;
  primaryCTA?: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  /** Show scroll cue at bottom of section (home page only) */
  showScrollCue?: boolean;
  className?: string;
  /** Additional content rendered after CTAs (e.g. WebGL canvas placeholder) */
  children?: React.ReactNode;
}

function renderHeadlineWithHighlight(
  headline: string,
  highlightWord: string | undefined
): React.ReactNode {
  if (!highlightWord) return headline;

  const index = headline.indexOf(highlightWord);
  if (index === -1) return headline;

  return (
    <>
      {headline.slice(0, index)}
      <span className="text-accent">{highlightWord}</span>
      {headline.slice(index + highlightWord.length)}
    </>
  );
}

/**
 * HeroLight — shared light-background hero for Home, Services, About, Contact, Portfolio.
 * Server Component.
 */
export function HeroLight({
  kicker,
  headline,
  headlineSize = "text-display-xl",
  highlightWord,
  intro,
  primaryCTA,
  secondaryCTA,
  showScrollCue = false,
  className,
  children,
}: HeroLightProps) {
  const isFullViewport = headlineSize === "text-display-xl";

  return (
    <section
      className={cn(
        "relative bg-bg-light",
        "py-3xl md:py-5xl",
        isFullViewport && "min-h-[calc(100vh-64px)] flex flex-col justify-center",
        className
      )}
    >
      <Container>
        {kicker && (
          <Caption as="p" className="mb-lg text-text-muted">
            {kicker}
          </Caption>
        )}

        <h1 className={cn(headlineSize, "text-text max-w-[900px]")}>
          {renderHeadlineWithHighlight(headline, highlightWord)}
        </h1>

        {intro && (
          <p className="text-body-lg text-text-muted mt-lg max-w-[640px]">
            {intro}
          </p>
        )}

        {(primaryCTA || secondaryCTA) && (
          <div className="flex flex-row flex-wrap gap-md mt-2xl">
            {primaryCTA && (
              <Button variant="primary" href={primaryCTA.href}>
                {primaryCTA.label}
              </Button>
            )}
            {secondaryCTA && (
              <Button variant="secondary" href={secondaryCTA.href}>
                {secondaryCTA.label}
              </Button>
            )}
          </div>
        )}

        {children}
      </Container>

      {showScrollCue && (
        <div
          className="absolute bottom-xl left-1/2 -translate-x-1/2 flex flex-col items-center"
          aria-hidden="true"
        >
          <span className="text-mono-sm text-text-muted">scroll</span>
          {/* Line animation added in Phase 3 (GSAP ScrollTrigger) */}
          <div className="w-px h-[32px] bg-border-light mx-auto mt-sm" />
        </div>
      )}
    </section>
  );
}
