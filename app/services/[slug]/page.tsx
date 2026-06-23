import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { HeroLight } from "@/components/sections/HeroLight";
import { CTABand } from "@/components/sections/CTABand";
import { Container } from "@/components/layout/Container";
import { Pill } from "@/components/ui/Pill";
import { SERVICES, getServiceBySlug, getServiceSlugs } from "@/lib/services";
import { cn } from "@/lib/utils";
import { serviceJsonLd } from "@/lib/jsonld";

// ─── Static Params ───────────────────────────────────────────────────────────

export function generateStaticParams() {
  return getServiceSlugs();
}

export const dynamicParams = false;

// ─── Service Diagram alt-text ─────────────────────────────────────────────────

const DIAGRAM_ALT: Record<string, string> = {
  websites: "Website delivery flow: design → build → optimise → launch",
  apps: "App architecture: client app → API layer → database and integrations",
  gaming: "Game development pipeline: design → engine build → playtest → live-ops",
  erp: "ERP module map: finance, inventory, HR, and sales unified on one platform",
  ai: "AI solution architecture with a retrieval-augmented generation pipeline",
  ml: "Machine learning lifecycle: data → train → deploy → monitor → retrain",
};

// ─── Per-service production copy ──────────────────────────────────────────────

const SERVICE_COPY: Record<string, string[]> = {
  websites: [
    "We build websites the way product teams build software: component-driven, version-controlled, and measured. Whether it's a marketing site, a storefront, or a logged-in web app, the foundation is the same — a modern React/Next.js stack rendered on the server for speed and search visibility.",
    "Performance is not an afterthought. Every build is tuned against Core Web Vitals, ships accessible markup to WCAG standards, and is wired to a headless CMS so your team can publish without touching code.",
    "From there we extend as far as you need: authentication, payments, search, internationalisation, and integrations with the tools you already run. You get a site that loads fast, ranks well, and is genuinely easy to maintain.",
  ],
  apps: [
    "We design and build mobile and web applications end-to-end — interface, API, database, and the deployment pipeline that ties them together. For most products we recommend a cross-platform stack so a single codebase serves both iOS and Android, cutting cost and time to market.",
    "When raw performance, deep hardware access, or platform-specific polish matters, we build fully native. Either way, the back end is a tested, documented API with the auth, observability, and CI/CD that keep releases boring — in the best way.",
    "We sweat the details that decide whether an app gets kept or deleted: cold-start time, offline behaviour, push notifications, and a UI that feels right on each platform.",
  ],
  gaming: [
    "We build games and interactive experiences across mobile, web, and cross-platform targets — from quick hyper-casual loops to real-time multiplayer. We work in Unity and Unreal for native-grade builds, and in WebGL and Three.js when the game needs to run straight in the browser.",
    "Monetisation, analytics, and live-ops are designed in from the start, not bolted on after launch. Leaderboards, matchmaking, and low-latency networking are handled with battle-tested infrastructure so your players get a smooth, fair experience.",
    "Beyond games, we bring the same toolkit to gamified products, AR experiences, and interactive 3D — anywhere an interface needs to be more engaging than a static screen.",
  ],
  erp: [
    "We implement and customise ERP that unifies the systems your business actually runs on — finance, inventory, procurement, HR, and sales — into one source of truth. Depending on fit, we build on proven platforms like Odoo and ERPNext or develop bespoke modules where off-the-shelf falls short.",
    "The hard part of ERP is rarely the software; it's the migration and the workflows. We map your existing processes, move you off spreadsheets and legacy tools cleanly, and automate the steps that quietly eat your team's time.",
    "Every implementation ships with role-based access, audit trails, and integrations to the payment, logistics, and reporting tools you depend on — so the system fits your operation, not the other way around.",
  ],
  ai: [
    "We build production-grade AI grounded in your own data, not generic model output. Chatbots, copilots, and autonomous agents are engineered for accuracy and auditability — every answer traceable, every action logged, every threshold configurable.",
    "Our retrieval-augmented architectures connect directly to your documentation, knowledge bases, and operational systems. We handle chunking, embeddings, vector storage, and retrieval tuning so the system surfaces the right answer rather than a plausible one.",
    "From there we wire AI into the products and workflows you already run — document automation, support deflection, and agentic pipelines — with sensible fallbacks for when a model should hand back to a human.",
  ],
  ml: [
    "We build custom machine-learning systems end-to-end: framing the problem, engineering the data pipeline, training and evaluating models, and shipping them behind a reliable API. The goal is always a measurable business outcome, not a notebook that works once.",
    "Use cases range from demand forecasting and predictive analytics to recommendation engines and computer vision for detection, classification, and quality inspection. We choose the simplest model that solves the problem, then harden it for production.",
    "Crucially, we build the MLOps around the model — monitoring, drift detection, and retraining pipelines — so accuracy holds up as your data changes, long after launch.",
  ],
};

// ─── Metadata ────────────────────────────────────────────────────────────────

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.id === slug);
  if (!service) return {};

  return {
    title: `${service.title} — Services`,
    description: service.description,
    openGraph: {
      title: `${service.title} — Softiques Services`,
      description: service.description,
    },
  };
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let service;
  try {
    service = getServiceBySlug(slug);
  } catch {
    notFound();
  }

  const copy = SERVICE_COPY[service.id] ?? [];

  return (
    <>
      {/* Service JSON-LD schema (SEO-06) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd(service)).replace(/</g, "\\u003c"),
        }}
      />

      <HeroLight
        kicker={`SERVICES · ${service.label}`}
        headline={service.title}
        headlineSize="text-display-lg"
        intro={service.description}
        backgroundImage="/images/hero/services-bg.svg"
      />

      {/* Service detail — two-column design */}
      <section className="py-4xl md:py-5xl border-b border-border-light bg-bg-light">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2xl items-start">
            {/* Text column */}
            <div className="lg:order-1">
              <div className="space-y-lg">
                {copy.map((para, i) => (
                  <p key={i} className="text-body text-text-muted">
                    {para}
                  </p>
                ))}
              </div>

              {/* Tech stack pills */}
              <div className="flex flex-wrap gap-sm mt-xl">
                {service.techStack.map((tech) => (
                  <Pill key={tech} as="span">
                    {tech}
                  </Pill>
                ))}
              </div>

              {/* Use case bullets */}
              <ul className="mt-xl space-y-sm">
                {service.useCases.map((useCase, i) => (
                  <li
                    key={i}
                    className="text-body-sm text-text-muted flex items-start gap-sm"
                  >
                    <span
                      className="text-accent mt-[3px] shrink-0"
                      aria-hidden="true"
                    >
                      ·
                    </span>
                    <span>{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual column — service diagram SVG */}
            <div className="lg:order-2">
              <div
                className={cn(
                  "bg-surface rounded-xl overflow-hidden",
                  "border border-border-light"
                )}
              >
                <Image
                  src={`/images/services/${service.id}.svg`}
                  alt={DIAGRAM_ALT[service.id] ?? `${service.title} diagram`}
                  width={500}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CTABand />
    </>
  );
}
