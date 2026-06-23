import { type Metadata } from "next";
import { HeroLight } from "@/components/sections/HeroLight";
import { LeadForm } from "@/components/forms/LeadForm";
import { Caption } from "@/components/ui/Caption";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us what you're building. Softiques responds within two business days.",
  openGraph: {
    title: "Contact — Softiques",
    description:
      "Tell us what you're building. Softiques responds within two business days.",
  },
};

export default function ContactPage() {
  return (
    <>
      {/* 1. Hero */}
      <HeroLight
        kicker="CONTACT"
        headline="Tell us what you're building."
        headlineSize="text-display-lg"
        intro="We respond within two business days. For technical depth, include what runs in production today and what's broken about it."
        backgroundImage="/images/hero/contact-bg.svg"
      />

      {/* 2. Form */}
      <section className="py-5xl max-md:py-3xl bg-bg-light border-t border-border-light">
        <Container>
          <LeadForm />
        </Container>
      </section>

      {/* 3. Contact strip */}
      <section className="py-3xl bg-bg-light border-t border-border-light">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
            <div>
              <Caption as="p">EMAIL</Caption>
              <p className="text-body-sm text-text-muted mt-sm">
                <a href="mailto:hello@softiques.com" className="hover:text-accent transition-colors duration-fast">
                  hello@softiques.com
                </a>
              </p>
            </div>
            <div>
              <Caption as="p">RESPONSE TIME</Caption>
              <p className="text-body-sm text-text-muted mt-sm">
                Within two business days
              </p>
            </div>
            <div>
              <Caption as="p">ENGAGEMENTS</Caption>
              <p className="text-body-sm text-text-muted mt-sm">
                New builds, rebuilds, and ongoing partnerships
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
