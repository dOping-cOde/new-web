import { type Metadata } from "next";
import { LegalDoc } from "@/components/sections/LegalDoc";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Softiques collects, uses, and protects the personal information you share with us.",
  openGraph: {
    title: "Privacy Policy — Softiques",
    description:
      "How Softiques collects, uses, and protects the personal information you share with us.",
  },
};

export default function PrivacyPage() {
  return (
    <LegalDoc
      title="Privacy Policy"
      lastUpdated="23 June 2026"
      intro="This policy explains what information Softiques collects, why we collect it, and the choices you have. We keep this short and plain."
    >
      <h2>1. Who we are</h2>
      <p>
        Softiques (&quot;Softiques&quot;, &quot;we&quot;, &quot;us&quot;, or
        &quot;our&quot;) is a software development studio. This Privacy Policy
        applies to this website and any enquiries you submit through it. If you
        have questions, contact us at{" "}
        <a href="mailto:hello@softiques.com">hello@softiques.com</a>.
      </p>

      <h2>2. Information we collect</h2>
      <p>
        <strong>Information you give us.</strong> When you complete a form on
        this site, we collect the details you provide: your name, work email,
        phone or WhatsApp number, the type of project you need, and the message
        describing your enquiry.
      </p>
      <p>
        <strong>Information collected automatically.</strong> Like most
        websites, our hosting and analytics may record basic technical data such
        as your IP address, browser type, device, and the pages you visit. This
        helps us keep the site secure and understand how it is used.
      </p>

      <h2>3. How we use your information</h2>
      <ul>
        <li>To respond to your enquiry and discuss a potential project.</li>
        <li>To provide, maintain, and improve our website and services.</li>
        <li>To keep records of our communications with you.</li>
        <li>To protect against spam, fraud, and abuse.</li>
        <li>To comply with our legal obligations.</li>
      </ul>
      <p>
        We do not sell your personal information, and we do not use it for
        unrelated advertising.
      </p>

      <h2>4. How we share information</h2>
      <p>
        We share information only with service providers that help us operate
        the site, and only as needed to perform their function. For example,
        form submissions are delivered to our inbox through a form-handling
        service (Web3Forms). These providers are bound to protect your data and
        may not use it for their own purposes. We may also disclose information
        if required by law.
      </p>

      <h2>5. Data retention</h2>
      <p>
        We keep enquiry information for as long as needed to respond to you and
        to maintain a record of our business relationship, after which it is
        deleted or anonymised. You can ask us to delete your information sooner
        (see your rights below).
      </p>

      <h2>6. Your rights</h2>
      <p>
        Subject to applicable law, you may request to access, correct, or delete
        the personal information we hold about you, or ask us to stop contacting
        you. To exercise any of these rights, email{" "}
        <a href="mailto:hello@softiques.com">hello@softiques.com</a> and we will
        respond within a reasonable time.
      </p>

      <h2>7. Cookies</h2>
      <p>
        This site uses only essential cookies and similar technologies needed
        for it to function and to understand aggregate usage. You can control
        cookies through your browser settings; blocking some may affect how the
        site works.
      </p>

      <h2>8. Security</h2>
      <p>
        We take reasonable technical and organisational measures to protect your
        information. However, no method of transmission or storage is completely
        secure, and we cannot guarantee absolute security.
      </p>

      <h2>9. Children&apos;s privacy</h2>
      <p>
        Our website is intended for businesses and professionals. It is not
        directed at children, and we do not knowingly collect personal
        information from anyone under 16.
      </p>

      <h2>10. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. When we do, we will revise
        the &quot;Last updated&quot; date above. Significant changes will be made
        clear on this page.
      </p>

      <h2>11. Contact us</h2>
      <p>
        Questions about this policy or your data? Email{" "}
        <a href="mailto:hello@softiques.com">hello@softiques.com</a>.
      </p>
    </LegalDoc>
  );
}
