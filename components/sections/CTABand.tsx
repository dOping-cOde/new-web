import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";

interface CTABandProps {
  headline?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}

/**
 * CTABand — reusable CTA section shared by Home, Services, and About pages.
 * Centered layout with display-md headline, body text, and a single primary CTA.
 * Server Component.
 */
export function CTABand({
  headline = "Have a system that needs intelligence?",
  body = "Tell us what you're building. We'll respond within two business days.",
  ctaLabel = "Start a conversation",
  ctaHref = "/contact",
  className,
}: CTABandProps) {
  return (
    <section
      className={cn(
        "bg-bg-light",
        "py-3xl md:py-5xl",
        className
      )}
    >
      <Container className="text-center">
        <h2 className="text-display-md text-text">
          {headline}
        </h2>

        <p className="text-body-lg text-text-muted mt-lg max-w-[560px] mx-auto">
          {body}
        </p>

        <Button variant="primary" href={ctaHref} className="mt-2xl">
          {ctaLabel}
        </Button>
      </Container>
    </section>
  );
}
