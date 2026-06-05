import Link from "next/link";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";

const FOOTER_LINKS = {
  services: [
    { label: "AI Agents", href: "/services#ai-agents" },
    { label: "AI Chatbots", href: "/services#chatbots" },
    { label: "Healthcare", href: "/services#healthcare" },
    { label: "Energy", href: "/services#energy" },
    { label: "Infrastructure", href: "/services#infrastructure" },
    { label: "Data & Analytics", href: "/services#data-analytics" },
  ],
  portfolio: [
    { label: "iDTRM", href: "/portfolio/idtrm" },
    { label: "BridgeSense", href: "/portfolio/bridgesense" },
    { label: "Salt-Lick", href: "/portfolio/salt-lick" },
    { label: "All projects", href: "/portfolio" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export function Footer() {
  return (
    <footer
      className="bg-bg-dark text-text-inverted border-t border-border-dark"
      data-theme="dark"
    >
      <Container className="py-4xl">
        {/* 4-column grid: Logo+blurb / Services / Portfolio / Contact */}
        <div className={cn(
          "grid gap-xl",
          "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        )}>
          {/* Column 1: Logo + blurb */}
          <div>
            <Link href="/" className="text-h3 font-medium tracking-tight">
              Softwires
            </Link>
            <p className="text-body-sm text-text-muted-dark mt-md max-w-[280px]">
              AI engineering for energy, healthcare, and infrastructure.
              Systems that run in the physical world.
            </p>
          </div>

          {/* Column 2: Services */}
          <div>
            <p className="text-caption text-text-muted-dark mb-lg">
              SERVICES
            </p>
            <nav aria-label="Footer services links">
              <ul className="space-y-sm">
                {FOOTER_LINKS.services.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-body-sm text-text-muted-dark hover:text-text-inverted transition-colors duration-fast"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3: Portfolio */}
          <div>
            <p className="text-caption text-text-muted-dark mb-lg">
              PORTFOLIO
            </p>
            <nav aria-label="Footer portfolio links">
              <ul className="space-y-sm">
                {FOOTER_LINKS.portfolio.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-body-sm text-text-muted-dark hover:text-text-inverted transition-colors duration-fast"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 4: Contact */}
          <div>
            <p className="text-caption text-text-muted-dark mb-lg">
              CONTACT
            </p>
            <nav aria-label="Footer contact links">
              <ul className="space-y-sm">
                {FOOTER_LINKS.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-body-sm text-text-muted-dark hover:text-text-inverted transition-colors duration-fast"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href="mailto:hello@softwires.in"
                    className="text-mono-sm text-text-muted-dark hover:text-text-inverted transition-colors duration-fast"
                  >
                    hello@softwires.in
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="mt-3xl pt-lg border-t border-border-dark flex flex-col sm:flex-row justify-between items-start sm:items-center gap-sm">
          <p className="text-caption text-text-muted-dark">
            &copy; {new Date().getFullYear()} Softwires Technologies. All rights reserved.
          </p>
          <div className="flex gap-lg">
            <Link
              href="/privacy"
              className="text-caption text-text-muted-dark hover:text-text-inverted transition-colors duration-fast"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-caption text-text-muted-dark hover:text-text-inverted transition-colors duration-fast"
            >
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
