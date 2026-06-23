import Link from "next/link";
import { Container } from "@/components/layout/Container";

const FOOTER_COLUMNS = [
  {
    title: "Services",
    links: [
      { label: "Website Development", href: "/services/websites" },
      { label: "App Development", href: "/services/apps" },
      { label: "Game Development", href: "/services/gaming" },
      { label: "ERP Solutions", href: "/services/erp" },
      { label: "AI Solutions", href: "/services/ai" },
      { label: "ML Solutions", href: "/services/ml" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Services", href: "/services" },
      { label: "About", href: "/about" },
      { label: "Insights", href: "/insights" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
] as const;

const linkClasses =
  "inline-block text-body-sm text-text-muted-dark transition-colors duration-fast hover:text-accent";

export function Footer() {
  return (
    <footer className="bg-bg-dark text-text-inverted" data-theme="dark">
      {/* Accent keyline */}
      <div aria-hidden="true" className="h-[2px] w-full bg-accent/70" />

      <Container className="py-4xl">
        <div className="grid grid-cols-1 gap-2xl lg:grid-cols-12">
          {/* Brand panel */}
          <div className="lg:col-span-5">
            <p className="text-mono-sm text-text-muted-dark">
              SOFTWARE DEVELOPMENT STUDIO
            </p>
            <Link
              href="/"
              className="mt-md block text-display-md font-light tracking-tight"
            >
              Softi<span className="text-accent">ques</span>
            </Link>

            {/* Contact card */}
            <Link
              href="/contact"
              className="group mt-xl flex max-w-[380px] items-center justify-between gap-lg rounded-lg border border-border-dark bg-surface p-lg transition-colors duration-fast hover:border-accent"
            >
              <span>
                <span className="block text-caption text-text-muted-dark">
                  START A CONVERSATION
                </span>
                <span className="mt-xs block text-body font-medium text-text-inverted">
                  hello@softiques.com
                </span>
              </span>
              <span
                aria-hidden="true"
                className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-accent text-bg-dark transition-transform duration-fast group-hover:translate-x-[2px]"
              >
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-xl sm:grid-cols-3 lg:col-span-7">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="text-caption text-text-inverted">
                  {col.title.toUpperCase()}
                </p>
                <div aria-hidden="true" className="mt-sm h-px w-full bg-border-dark" />
                <nav aria-label={`Footer ${col.title} links`}>
                  <ul className="mt-lg space-y-md">
                    {col.links.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} className={linkClasses}>
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-3xl flex flex-col items-center justify-between gap-md border-t border-border-dark pt-lg sm:flex-row">
          <p className="text-caption text-text-muted-dark">
            &copy; {new Date().getFullYear()} Softiques. All rights reserved.
          </p>
          <div className="flex items-center gap-lg">
            <Link href="/privacy" className="text-caption text-text-muted-dark transition-colors duration-fast hover:text-accent">
              Privacy
            </Link>
            <Link href="/terms" className="text-caption text-text-muted-dark transition-colors duration-fast hover:text-accent">
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
