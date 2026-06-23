import { type Metadata } from "next";
import { LegalDoc } from "@/components/sections/LegalDoc";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of the Softiques website and content.",
  openGraph: {
    title: "Terms of Service — Softiques",
    description:
      "The terms that govern your use of the Softiques website and content.",
  },
};

export default function TermsPage() {
  return (
    <LegalDoc
      title="Terms of Service"
      lastUpdated="23 June 2026"
      intro="These terms govern your use of this website. By using the site, you agree to them. Any project we take on is governed by a separate written agreement."
    >
      <h2>1. Acceptance of terms</h2>
      <p>
        By accessing or using the Softiques website (the &quot;Site&quot;), you
        agree to be bound by these Terms of Service. If you do not agree, please
        do not use the Site.
      </p>

      <h2>2. Use of the site</h2>
      <p>
        You may use the Site for lawful purposes only — to learn about our work,
        read our content, and contact us. You agree not to misuse the Site,
        interfere with its operation, attempt to access it in an unauthorised
        way, or use it to transmit harmful or unlawful material.
      </p>

      <h2>3. Intellectual property</h2>
      <p>
        The Site and its content — including text, design, graphics, logos, and
        code — are owned by Softiques or its licensors and are protected by
        intellectual-property laws. You may not copy, reproduce, or
        redistribute our content without our prior written permission, except as
        allowed by law.
      </p>

      <h2>4. Services and engagements</h2>
      <p>
        Information on the Site is provided for general purposes and does not
        constitute an offer or a commitment to perform work. Any project,
        deliverable, timeline, fee, or warranty is governed solely by a separate
        written agreement signed by both parties. Where these terms conflict
        with such an agreement, the signed agreement prevails for that project.
      </p>

      <h2>5. Submissions</h2>
      <p>
        When you submit an enquiry or other information through the Site, you
        confirm that it is accurate and that you have the right to share it. We
        handle the information you submit in line with our{" "}
        <a href="/privacy">Privacy Policy</a>.
      </p>

      <h2>6. Third-party links</h2>
      <p>
        The Site may link to third-party websites or services that we do not
        control. We are not responsible for their content, policies, or
        practices, and including a link does not imply our endorsement.
      </p>

      <h2>7. Disclaimer</h2>
      <p>
        The Site is provided on an &quot;as is&quot; and &quot;as
        available&quot; basis without warranties of any kind, whether express or
        implied. We do not warrant that the Site will be uninterrupted,
        error-free, or free of harmful components, or that the content is
        complete or current.
      </p>

      <h2>8. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, Softiques will not be liable for
        any indirect, incidental, special, or consequential damages, or any loss
        of profits or data, arising out of your use of — or inability to use —
        the Site.
      </p>

      <h2>9. Indemnification</h2>
      <p>
        You agree to indemnify and hold Softiques harmless from any claims,
        losses, or expenses arising out of your misuse of the Site or your
        breach of these terms.
      </p>

      <h2>10. Governing law</h2>
      <p>
        These terms are governed by the laws of India, and any disputes will be
        subject to the exclusive jurisdiction of the courts located in India,
        without regard to conflict-of-law principles.
      </p>

      <h2>11. Changes to these terms</h2>
      <p>
        We may update these terms from time to time. The &quot;Last
        updated&quot; date above shows when they last changed. Continued use of
        the Site after changes means you accept the revised terms.
      </p>

      <h2>12. Contact us</h2>
      <p>
        Questions about these terms? Email{" "}
        <a href="mailto:hello@softiques.com">hello@softiques.com</a>.
      </p>
    </LegalDoc>
  );
}
