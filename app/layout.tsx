import type { Metadata } from "next";
import { fraunces, inter, jetbrainsMono } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Softwires Technologies",
    template: "%s — Softwires",
  },
  description:
    "AI engineering for energy, healthcare, and infrastructure. We build systems that monitor transformers, inspect bridges, screen for cancer, and detect fraud.",
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
        {/* Navbar will be added in Plan 03 */}
        <main id="main-content">{children}</main>
        {/* Footer will be added in Plan 03 */}
      </body>
    </html>
  );
}
