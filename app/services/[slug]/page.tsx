import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { HeroLight } from "@/components/sections/HeroLight";
import { CTABand } from "@/components/sections/CTABand";
import { CapabilityCard } from "@/components/cards/CapabilityCard";
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
  "ai-agents": "Agent loop diagram: Perceive → Plan → Act → Verify circular flow",
  chatbots: "Conversational AI architecture with RAG pipeline: Document → Embed → Vector Store → Retrieve → Generate",
  "enterprise-ai": "Enterprise AI analytics architecture: Data Sources → Smart OLAP Engine → BI Tools, with governance, AI/ML, and cloud layers",
};

// ─── Data & Analytics sub-cards ──────────────────────────────────────────────

const DATA_ANALYTICS_CARDS = [
  {
    title: "Unified Semantic Fabric",
    description: "One source of truth across BI and AI",
    tags: ["Semantic Layer", "dbt", "GraphQL"],
    href: "/portfolio/unified-semantic-fabric",
  },
  {
    title: "BI Acceleration Engine",
    description: "Sub-second analytics on enterprise datasets at scale",
    tags: ["OLAP", "In-Memory", "Aggregation"],
    href: "/portfolio/bi-acceleration-engine",
  },
  {
    title: "Multidimensional OLAP Modernization",
    description: "Replace legacy cube engines — SSAS, Essbase, TM1",
    tags: ["Cube Migration", "Cloud OLAP", "MDX"],
    href: "/portfolio/multidimensional-olap-modernization",
  },
  {
    title: "Cloud Analytics Cost Optimization",
    description: "Reduce Snowflake/Databricks/BigQuery spend by 40%+",
    tags: ["FinOps", "Query Optimization", "Caching"],
    href: "/portfolio/cloud-analytics-cost-optimization",
  },
  {
    title: "Conversational Data Agent",
    description: "Natural-language analytics on enterprise data",
    tags: ["NL-to-SQL", "LLM", "Data Catalog"],
    href: "/portfolio/conversational-data-agent",
  },
  {
    title: "Enterprise Reporting Suite",
    description: "Unified reporting across business units",
    tags: ["Dashboards", "Embedded BI", "Scheduling"],
    href: "/portfolio/enterprise-reporting-suite",
  },
];

// ─── Enterprise AI sub-cards ─────────────────────────────────────────────────

const ENTERPRISE_AI_CARDS = [
  {
    title: "Smart OLAP Analytics Engine",
    description: "Sub-second queries on trillion-row datasets without pre-aggregation",
    tags: ["OLAP", "In-Memory", "Columnar"],
    href: "/portfolio",
  },
  {
    title: "Universal BI Connectivity",
    description: "Native integration with Tableau, Power BI, Excel, and Looker",
    tags: ["BI Tools", "ODBC/JDBC", "Live Connect"],
    href: "/portfolio",
  },
  {
    title: "Cloud Data Platform Acceleration",
    description: "Accelerate Snowflake, Databricks, and BigQuery without data movement",
    tags: ["Snowflake", "Databricks", "BigQuery"],
    href: "/portfolio",
  },
  {
    title: "AI-Powered Self-Service Analytics",
    description: "Natural-language exploration with governed access and lineage tracking",
    tags: ["NL Queries", "AI/ML", "Auto-Insights"],
    href: "/portfolio",
  },
  {
    title: "Enterprise Data Governance",
    description: "Row-level security, audit trails, and compliance across all analytics",
    tags: ["RBAC", "Lineage", "Compliance"],
    href: "/portfolio",
  },
  {
    title: "Operational Intelligence Layer",
    description: "Real-time dashboards and alerting for mission-critical KPIs",
    tags: ["Real-Time", "Alerting", "Embedded BI"],
    href: "/portfolio",
  },
];

// ─── Per-service production copy ──────────────────────────────────────────────

const SERVICE_COPY: Record<string, string[]> = {
  "ai-agents": [
    "We build multi-agent systems that perceive their environment, plan across multiple steps, and execute actions in operational infrastructure. These are not chatbot wrappers — they are autonomous pipelines integrated directly into enterprise workflows, API surfaces, and IoT event streams.",
    "Each agent system ships with deterministic fallbacks and human escalation paths. We design for auditability: every decision is logged, every action is reversible, and every threshold is configurable. Production AI that your operations team can actually trust.",
    "Deployment targets include incident management platforms, procurement systems, field operations tools, and compliance pipelines. We build on LangGraph and CrewAI for orchestration, MCP for model-context management, and support both cloud-hosted and air-gapped local model deployments.",
  ],
  chatbots: [
    "We build production-grade conversational AI grounded in your knowledge base, not in generic LLM priors. Every system is engineered for accuracy, auditability, and graceful degradation — not for demo performance.",
    "Our RAG architectures connect directly to your existing documentation systems, knowledge bases, and operational runbooks. We handle chunking strategy, embedding selection, vector store design, and retrieval tuning. The result is a system that surfaces the right answer, not the plausible one.",
    "Voice-enabled interfaces extend coverage to field environments where hands-free operation is non-negotiable. We integrate ASR and TTS pipelines with function-calling architectures to build interfaces that route, escalate, and act — not just respond.",
  ],
  "data-analytics": [
    "We build analytics infrastructure that makes enterprise data genuinely useful at sub-second query response times. Semantic data layers eliminate metric inconsistencies across business units and BI tools. OLAP modernization replaces legacy cube engines with architectures that deliver 1000x faster analytical throughput.",
    "Our natural-language analytics interfaces let non-technical stakeholders query enterprise data without SQL knowledge — connected to live data catalogs, not static snapshots. We build on production-grade NL-to-SQL architectures with LLM reasoning layers that understand your specific business schema.",
    "Cost optimization engagements consistently reduce Snowflake, Databricks, and BigQuery spend by 40% or more through query profiling, materialization strategy, and caching architecture. We treat analytics infrastructure as an engineering problem, not a configuration problem.",
  ],
  "enterprise-ai": [
    "We build AI-native analytics platforms that deliver interactive, sub-second insights on datasets spanning trillions of data points. Our smart OLAP engine sits between your cloud data warehouse and your BI tools — accelerating every query without requiring data movement, pre-aggregation, or changes to existing dashboards. The result is analytics that feel instantaneous, even at enterprise scale.",
    "Every platform we ship connects natively to the tools your teams already use — Tableau, Power BI, Excel, Looker, and custom applications via ODBC/JDBC. We eliminate the gap between where data lives and where decisions happen. AI-powered self-service layers let business users explore data through natural language, surface automated insights, and build their own analyses — all under full governance with row-level security, audit trails, and data lineage.",
    "Our cloud-native architecture deploys on Snowflake, Databricks, BigQuery, and Azure Synapse — scaling elastically with workload demand. Intelligent caching and query optimization reduce cloud compute costs while delivering faster results. From retail and financial services to manufacturing and telecommunications, we build the analytics backbone that turns massive data investments into real-time operational intelligence.",
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
      title: `${service.title} — Softwires Services`,
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
  const isDataAnalytics = service.id === "data-analytics";
  const isEnterpriseAI = service.id === "enterprise-ai";

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

      {/* Service detail — same two-column design as the services overview */}
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

              {/* Case study link */}
              {service.caseStudySlug && (
                <a
                  href={`/portfolio/${service.caseStudySlug}`}
                  className="text-body-sm text-accent mt-lg inline-block hover:underline"
                >
                  Read the case study &rarr;
                </a>
              )}
            </div>

            {/* Visual column */}
            <div className="lg:order-2">
              {isDataAnalytics || isEnterpriseAI ? (
                /* Sub-grid of CapabilityCards */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                  {(isEnterpriseAI ? ENTERPRISE_AI_CARDS : DATA_ANALYTICS_CARDS).map((card) => (
                    <CapabilityCard
                      key={card.title}
                      title={card.title}
                      description={card.description}
                      tags={card.tags}
                      href={card.href}
                    />
                  ))}
                </div>
              ) : (
                /* Service diagram SVG */
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
              )}
            </div>
          </div>
        </Container>
      </section>

      <CTABand />
    </>
  );
}
