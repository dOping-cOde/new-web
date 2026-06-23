import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { LeadForm } from "@/components/forms/LeadForm";

interface CTABandProps {
  headline?: string;
  body?: string;
  /** Kept for backwards-compatibility with existing call sites; no longer rendered. */
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}

/**
 * CTABand — reusable conversion section shared by Home, Services, About,
 * Portfolio, Insights, and Industries pages. Renders the site-wide LeadForm so
 * visitors can book a consultation from any page.
 * Server Component (LeadForm is a client component rendered as a child).
 */
export function CTABand({
  headline = "Have a project in mind?",
  body = "Tell us what you're building and we'll get back to you shortly.",
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

        <LeadForm className="mt-2xl" />
      </Container>
    </section>
  );
}
