{/* Component showcase — will be replaced by real homepage in Phase 2 */}
import { Button } from "@/components/ui/Button";
import { Caption } from "@/components/ui/Caption";
import { Pill } from "@/components/ui/Pill";
import { StatBlock } from "@/components/ui/StatBlock";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Container } from "@/components/layout/Container";

export default function Home() {
  return (
    <main>
      {/* ===== LIGHT SECTION ===== */}
      <section className="bg-bg-light py-4xl">
        <Container>
          <SectionHeader
            kicker="COMPONENT LIBRARY"
            heading="Foundation Components"
            intro="Six atomic building blocks for the Softwires marketing site — encoding the design system into reusable React components."
            className="mb-3xl"
          />

          {/* Buttons */}
          <div className="mb-2xl">
            <Caption as="p" className="mb-lg">BUTTONS</Caption>
            <div className="flex flex-wrap gap-md items-center">
              <Button variant="primary">Get in touch</Button>
              <Button variant="primary" arrow>View case study</Button>
              <Button variant="secondary">Learn more</Button>
              <Button variant="secondary" arrow href="/services">Our services</Button>
            </div>
          </div>

          {/* Pills */}
          <div className="mb-2xl">
            <Caption as="p" className="mb-lg">PILLS</Caption>
            <div className="flex flex-wrap gap-sm">
              <Pill active>All</Pill>
              <Pill>Energy</Pill>
              <Pill>Healthcare</Pill>
              <Pill>Infrastructure</Pill>
              <Pill>Security</Pill>
              <Pill as="span">Next.js</Pill>
              <Pill as="span">TypeScript</Pill>
              <Pill as="span">Three.js</Pill>
            </div>
          </div>

          {/* Stats */}
          <div className="mb-2xl">
            <Caption as="p" className="mb-lg">STAT BLOCKS</Caption>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-xl">
              <StatBlock value="8" label="DTRs monitored" />
              <StatBlock value="5 min" label="Detection latency" />
              <StatBlock value="94%" label="Accuracy rate" />
              <StatBlock value="11" label="Case studies" />
            </div>
          </div>

          {/* Caption standalone */}
          <div className="mb-2xl">
            <Caption as="p" className="mb-lg">CAPTION VARIANTS</Caption>
            <div className="space-y-sm">
              <div><Caption>DEFAULT MUTED KICKER</Caption></div>
              <div><Caption className="text-accent">ACCENT KICKER — CASE STUDY</Caption></div>
              <div><Caption as="p">AS PARAGRAPH ELEMENT</Caption></div>
            </div>
          </div>

          {/* Container size debug */}
          <div className="mb-2xl">
            <Caption as="p" className="mb-lg">CONTAINER WIDTHS</Caption>
            <div className="space-y-md">
              <div className="border border-dashed border-border-light p-md">
                <Caption className="text-accent">DEFAULT (1200px max)</Caption>
              </div>
            </div>
          </div>

          <Container size="wide" className="border border-dashed border-border-light p-md -mx-xl md:-mx-xl max-sm:-mx-[20px]">
            <Caption className="text-accent">WIDE CONTAINER (1440px max)</Caption>
          </Container>
        </Container>
      </section>

      {/* ===== DARK SECTION ===== */}
      <section className="bg-bg-dark py-4xl">
        <Container>
          <SectionHeader
            kicker="DARK VARIANT"
            heading="Components on Dark"
            intro="All components support a dark prop that inverts text colors for use inside dark cinematic sections."
            dark
            className="mb-3xl"
          />

          {/* Buttons on dark */}
          <div className="mb-2xl">
            <Caption as="p" className="mb-lg text-text-muted-dark">BUTTONS ON DARK</Caption>
            <div className="flex flex-wrap gap-md items-center">
              <Button variant="primary">Get in touch</Button>
              <Button variant="primary" arrow>View case study</Button>
              <Button variant="secondary">Learn more</Button>
              <Button variant="secondary" arrow>Our services</Button>
            </div>
          </div>

          {/* Stats dark */}
          <div className="mb-2xl">
            <Caption as="p" className="mb-lg text-text-muted-dark">STAT BLOCKS — DARK</Caption>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-xl">
              <StatBlock value="8" label="DTRs monitored" dark />
              <StatBlock value="5 min" label="Detection latency" dark />
              <StatBlock value="94%" label="Accuracy rate" dark />
              <StatBlock value="11" label="Case studies" dark />
            </div>
          </div>

          {/* SectionHeader — centered variant */}
          <SectionHeader
            kicker="CENTERED VARIANT"
            heading="Centered Section Header"
            intro="Used for hero sections and standalone callouts where centered alignment improves visual balance."
            align="center"
            headingSize="text-display-md"
            dark
          />
        </Container>
      </section>
    </main>
  );
}
