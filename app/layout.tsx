import type { Metadata } from "next";
import { fraunces, inter, jetbrainsMono } from "@/lib/fonts";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { organizationJsonLd } from "@/lib/jsonld";
import "./globals.css";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://softwires.in'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Softwires Technologies",
    template: "%s — Softwires",
  },
  description:
    "AI engineering for energy, healthcare, and infrastructure. We build systems that monitor transformers, inspect bridges, screen for cancer, and detect fraud.",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Softwires Technologies',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        {/* Organization JSON-LD — present on every page (SEO-04) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()).replace(/</g, "\\u003c"),
          }}
        />
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
