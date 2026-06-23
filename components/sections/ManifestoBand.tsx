import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";

const DEFAULT_PARAGRAPHS = [
  "Plenty of agencies can spin up a landing page. Fewer can take a product from a blank Figma file to something that holds up under real users, real data, and real load. That's the work we care about.",
  "We build with a modern, boring-on-purpose stack — typed, tested, and version-controlled — so the thing we hand over is something your own team can read, extend, and trust. No mystery code, no lock-in.",
  "We measure ourselves by what runs in production: page speed, crash-free sessions, conversion, uptime. A demo that impresses in a meeting but falls over on launch day isn't something we'd ship.",
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
  headline = "From idea to impact — we build software that delivers.",
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
