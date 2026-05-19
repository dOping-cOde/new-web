import { type Metadata } from "next";
import { HeroLight } from "@/components/sections/HeroLight";
import { ContactForm } from "@/components/forms/ContactForm";
import { Caption } from "@/components/ui/Caption";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us what you are building. Softwires responds within two business days with technical depth.",
  openGraph: {
    title: "Contact — Softwires",
    description:
      "Tell us what you are building. Softwires responds within two business days with technical depth.",
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
          <ContactForm />
        </Container>
      </section>

      {/* 3. Office strip */}
      <section className="py-3xl bg-bg-light border-t border-border-light">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
            <div>
              <Caption as="p">MUMBAI</Caption>
              <p className="text-body-sm text-text-muted mt-sm">
                Rd. no.14 MIDC, Plot no. X16,<br />
                Andheri East, Mumbai, India 400093
              </p>
            </div>
            <div>
              <Caption as="p">INDORE</Caption>
              <p className="text-body-sm text-text-muted mt-sm">
                Palasia Square,<br />
                Indore, Madhya Pradesh, India 452001
              </p>
            </div>
            <div>
              <Caption as="p">PHONE</Caption>
              <p className="text-body-sm text-text-muted mt-sm">
                <a href="tel:+918305710098" className="hover:text-text transition-colors duration-fast">
                  +91 83057 10098
                </a>
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
