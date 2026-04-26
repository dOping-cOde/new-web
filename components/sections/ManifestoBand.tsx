import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";

const DEFAULT_PARAGRAPHS = [
  "We work where the cost of failure is not a rollback and a post-mortem. It is a blackout, a misdiagnosis, a bridge that does not get inspected. Our systems earn their place by running reliably in environments where downtime has physical consequences.",
  "Our AI lives next to hardware — in substations, on drones, inside hospital networks. Regulated environments with real compliance requirements. We do not get to move fast and break things. We move deliberately and build things that last.",
  "We measure ourselves by uptime and accuracy, not engagement metrics. A model that scores 0.92 F1 in the lab but fails in a monsoon is not a model we ship. We test where the system will live, not where it was trained.",
];

interface ManifestoBandProps {
  headline?: string;
  paragraphs?: string[];
  className?: string;
}

/**
 * ManifestoBand — Home-page manifesto section.
 * Narrow-column layout with display-md heading and 3 paragraphs.
 * Server Component.
 */
export function ManifestoBand({
  headline = "We don't ship demos. We ship systems.",
  paragraphs = DEFAULT_PARAGRAPHS,
  className,
}: ManifestoBandProps) {
  return (
    <section
      className={cn(
        "bg-bg-light",
        "py-3xl md:py-5xl",
        className
      )}
    >
      <Container>
        <div className="max-w-[720px] mx-auto">
          <h2 className="text-display-md text-text">
            {headline}
          </h2>

          {paragraphs.map((paragraph, i) => (
            <p
              key={i}
              className="text-body text-text-muted mt-lg"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </Container>
    </section>
  );
}
