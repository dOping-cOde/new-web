import type { Metadata } from "next";
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
    <html lang="en">
      <body>
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
