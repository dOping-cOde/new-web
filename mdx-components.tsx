import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";
import dynamic from "next/dynamic";

// Dynamically import ScrollPinnedArchitecture to isolate GSAP client-side behavior
// SSR is intentional — the section renders server-side, GSAP attaches on hydration
const ScrollPinnedArchitecture = dynamic(
  () => import("@/components/motion/ScrollPinnedArchitecture"),
  { ssr: true }
);

// ============================================================
// Custom MDX components for case study content
// Source: build spec section 6, 02-CONTEXT.md D-02
//
// Stub components — will be enhanced with full layout logic
// in the case study template plan (Phase 2, Plan 05).
// Each accepts children + optional className per design system.
//
// These stubs ensure MDX files compile without errors during
// the content pipeline setup phase.
// ============================================================

// --- Custom Section Components ---

function ProblemSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`py-3xl bg-bg-light ${className}`}
      aria-labelledby="problem-heading"
    >
      <div className="max-w-[640px] mx-auto px-lg">{children}</div>
    </section>
  );
}

function SystemSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`py-3xl bg-bg-light ${className}`}
      aria-labelledby="system-heading"
    >
      <div className="max-w-[1200px] mx-auto px-lg">{children}</div>
    </section>
  );
}

// Architecture — dark scroll-pinned section (upgraded in Phase 3 per D-10, ANIM-02)
// Delegates to ScrollPinnedArchitecture Client Component for GSAP scroll-pin behavior.
// All 5 Tier A case studies use this component (D-09).
function Architecture({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <ScrollPinnedArchitecture className={className}>
      {children}
    </ScrollPinnedArchitecture>
  );
}

function AIStack({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`py-3xl bg-bg-light ${className}`}
      aria-labelledby="aistack-heading"
    >
      <div className="max-w-[1200px] mx-auto px-lg">{children}</div>
    </section>
  );
}

function Outcomes({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`py-3xl bg-bg-light ${className}`}
      aria-labelledby="outcomes-heading"
    >
      <div className="max-w-[1200px] mx-auto px-lg">{children}</div>
    </section>
  );
}

// Quote — pull-quote component
// TODO: real client quotes pending approval (D-08, 02-CONTEXT.md)
function Quote({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <blockquote
      className={`my-3xl border-l-2 border-accent pl-xl py-sm ${className}`}
    >
      <p className="text-display-md text-text-muted font-display italic leading-[1.1]">
        {children}
      </p>
    </blockquote>
  );
}

// TechPill — inline styled pill for tech references
function TechPill({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-block px-sm py-xs text-mono-sm bg-accent-soft text-accent rounded-[9999px] ${className}`}
    >
      {children}
    </span>
  );
}

// ============================================================
// MDX component registry
// ============================================================

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // --- Custom case study components ---
    ProblemSection,
    SystemSection,
    Architecture,
    AIStack,
    Outcomes,
    Quote,
    TechPill,

    // --- Styled standard HTML elements ---
    h1: ({ children, ...props }: ComponentPropsWithoutRef<"h1">) => (
      <h1 className="text-display-md text-text mt-4xl mb-xl" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }: ComponentPropsWithoutRef<"h2">) => (
      <h2 className="text-h2 text-text mt-3xl mb-lg" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }: ComponentPropsWithoutRef<"h3">) => (
      <h3 className="text-h3 text-text mt-2xl mb-md" {...props}>
        {children}
      </h3>
    ),
    p: ({ children, ...props }: ComponentPropsWithoutRef<"p">) => (
      <p className="text-body text-text mb-lg" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }: ComponentPropsWithoutRef<"ul">) => (
      <ul
        className="text-body text-text mb-lg pl-xl list-disc space-y-sm"
        {...props}
      >
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: ComponentPropsWithoutRef<"ol">) => (
      <ol
        className="text-body text-text mb-lg pl-xl list-decimal space-y-sm"
        {...props}
      >
        {children}
      </ol>
    ),
    a: ({ children, href, ...props }: ComponentPropsWithoutRef<"a">) => (
      <a
        href={href}
        className="text-accent underline underline-offset-2 hover:text-accent-hover transition-colors duration-fast"
        {...props}
      >
        {children}
      </a>
    ),
    blockquote: ({ children, ...props }: ComponentPropsWithoutRef<"blockquote">) => (
      <blockquote
        className="my-2xl border-l-2 border-accent pl-xl py-sm text-body-lg text-text-muted italic"
        {...props}
      >
        {children}
      </blockquote>
    ),
    code: ({ children, ...props }: ComponentPropsWithoutRef<"code">) => (
      <code
        className="text-mono-sm bg-accent-soft text-accent px-xs py-[2px] rounded-sm"
        {...props}
      >
        {children}
      </code>
    ),
    // GFM table support (remark-gfm)
    table: ({ children, ...props }: ComponentPropsWithoutRef<"table">) => (
      <div className="overflow-x-auto my-2xl">
        <table
          className="w-full text-body-sm text-text border-collapse"
          {...props}
        >
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }: ComponentPropsWithoutRef<"th">) => (
      <th
        className="text-left text-caption text-text-muted border-b border-border-light px-md py-sm"
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }: ComponentPropsWithoutRef<"td">) => (
      <td
        className="text-body-sm text-text border-b border-border-light px-md py-sm"
        {...props}
      >
        {children}
      </td>
    ),

    // Pass through any additional components
    ...components,
  };
}
