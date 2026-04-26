import type { Metadata } from "next";
import Image from "next/image";
import { SERVICES } from "@/lib/services";
import { HeroLight } from "@/components/sections/HeroLight";
import { CTABand } from "@/components/sections/CTABand";
import { CapabilityCard } from "@/components/cards/CapabilityCard";
import { Caption } from "@/components/ui/Caption";
import { Pill } from "@/components/ui/Pill";
import { Container } from "@/components/layout/Container";
import { ServicesAnchorNav } from "./AnchorNav";
import { cn } from "@/lib/utils";
import { serviceJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Six AI engineering capabilities: autonomous agents to grid intelligence. Full-stack AI for energy, healthcare, infrastructure, and enterprise.",
  openGraph: {
    title: "Services — Softwires",
    description:
      "Six AI engineering capabilities: autonomous agents to grid intelligence. Full-stack AI for energy, healthcare, infrastructure, and enterprise.",
  },
};

// ─── Service Diagram alt-text ─────────────────────────────────────────────────

const DIAGRAM_ALT: Record<string, string> = {
  "ai-agents": "Agent loop diagram: Perceive → Plan → Act → Verify circular flow",
  chatbots: "Conversational AI architecture with RAG pipeline: Document → Embed → Vector Store → Retrieve → Generate",
  healthcare: "Patient screening pipeline: Patient → Biomarker Collection → AI Risk Score → Specialist Referral, with multimodal input hub",
  energy: "Grid intelligence flow: Transformer → GPRS → Cloud → Dashboard, with anomaly detection, load forecasting, and theft analytics branches",
  infrastructure: "Structural inspection pipeline: Drone → LiDAR Scan → Point Cloud → 3D Model → Change Detection Report",
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
  healthcare: [
    "We build AI systems for clinical environments under real compliance constraints. DPDP Act, NABH, and IRDAI standards are built in from day one — not retrofitted after the model is trained. Compliance is not an afterthought; it is an architectural constraint.",
    "Our cancer risk stratification models are deployed in spoke-hub networks to triage patients before symptoms progress to late stage. Multimodal diagnostic support systems process imaging, lab results, and longitudinal patient data in under 15 minutes. Population health platforms identify at-risk cohorts across 100+ biomarkers for preventive intervention programs.",
    "The Salt-Lick platform — built for Esperer Bioresearch — demonstrates what AI-driven early detection looks like at population scale. We bring the same engineering discipline to every clinical engagement: quantified accuracy metrics, explainability reports, and real-world deployment documentation.",
  ],
  energy: [
    "We build real-time monitoring and predictive maintenance systems for grid infrastructure. Distribution transformer monitoring with sub-5-minute refresh cycles. Load forecasting that correlates weather, historical consumption, and infrastructure state. Theft analytics that detect tampered metering points before losses compound.",
    "Our systems are designed for the operational reality of grid environments: intermittent connectivity, legacy SCADA interfaces, heterogeneous sensor data, and regulatory reporting requirements. We integrate at the data layer — not the dashboard layer.",
    "iDTRM is the reference deployment: 8 distribution transformer monitoring units with real-time anomaly detection across the distribution network. We built the ingestion pipeline, the anomaly models, and the operator interface. The system pre-warns grid failures before consumers notice.",
  ],
  infrastructure: [
    "We build computer vision and LiDAR-based inspection systems for bridges, viaducts, and large-scale civil infrastructure. BridgeSense detects structural changes of 1.5–3mm using drone-mounted LiDAR at 0.92 F1-score accuracy — compressing 6-day manual inspection cycles into single-pass aerial surveys.",
    "Point cloud processing pipelines extract settlement, deflection, and cracking metrics from raw LiDAR data at scale. CNN-LSTM architectures detect anomalous change patterns over time, distinguishing seasonal thermal variation from genuine structural degradation with high precision.",
    "AI-Copter extends the same inspection capability to mining environments, underground structures, and confined-space assets where human inspection is operationally impractical. We build the full stack: sensor integration, data pipelines, ML models, and operator-facing reporting tools.",
  ],
  "data-analytics": [
    "We build analytics infrastructure that makes enterprise data genuinely useful at sub-second query response times. Semantic data layers eliminate metric inconsistencies across business units and BI tools. OLAP modernization replaces legacy cube engines with architectures that deliver 1000x faster analytical throughput.",
    "Our natural-language analytics interfaces let non-technical stakeholders query enterprise data without SQL knowledge — connected to live data catalogs, not static snapshots. We build on production-grade NL-to-SQL architectures with LLM reasoning layers that understand your specific business schema.",
    "Cost optimization engagements consistently reduce Snowflake, Databricks, and BigQuery spend by 40% or more through query profiling, materialization strategy, and caching architecture. We treat analytics infrastructure as an engineering problem, not a configuration problem.",
  ],
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <>
      {/* 6 Service JSON-LD schemas — one per service (SEO-06) */}
      {SERVICES.map((service) => (
        <script
          key={`ld-${service.id}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceJsonLd(service)).replace(/</g, "\\u003c"),
          }}
        />
      ))}

      {/* Section 1: Page Hero */}
      <HeroLight
        kicker="SERVICES"
        headline="Six capabilities. One engineering team."
        headlineSize="text-display-lg"
        intro="We build AI systems end-to-end — from research prototype to production deployment. Each capability is backed by shipped work, not slide decks."
      />

      {/* Section 2: Sticky Anchor Nav (client component for IntersectionObserver) */}
      <ServicesAnchorNav />

      {/* Section 3: Six service sections */}
      {SERVICES.map((service, index) => {
        const isImageLeft = index % 2 !== 0; // 0,2,4 = text-left, image-right; 1,3,5 = image-left, text-right
        const copy = SERVICE_COPY[service.id] ?? [];
        const isDataAnalytics = service.id === "data-analytics";

        return (
          <section
            key={service.id}
            id={service.anchorId}
            className="py-4xl md:py-5xl border-b border-border-light"
          >
            <Container>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2xl items-start">
                {/* Text column */}
                <div className={cn(isImageLeft ? "lg:order-2" : "lg:order-1")}>
                  <Caption as="p" className="text-text-muted">
                    {service.number} · {service.label}
                  </Caption>
                  <h2 className="text-display-md mt-lg text-text">
                    {service.title}
                  </h2>

                  <div className="mt-xl space-y-lg">
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
                <div className={cn(isImageLeft ? "lg:order-1" : "lg:order-2")}>
                  {isDataAnalytics ? (
                    /* Data & Analytics: CapabilityCard sub-grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                      {DATA_ANALYTICS_CARDS.map((card) => (
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
        );
      })}

      {/* Section 4: Engagement Model Band */}
      <section className="bg-bg-light py-5xl">
        <Container>
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-display-md text-center text-text">
              How we work.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2xl mt-2xl">
              <div>
                <h3 className="text-h3 text-text">Discovery</h3>
                <span className="text-mono-sm text-text-muted block mt-sm">
                  2 weeks
                </span>
                <p className="text-body-sm text-text-muted mt-md">
                  We scope the problem precisely before writing a line of code.
                  Technical discovery sessions, data audits, integration mapping,
                  and a fixed-price statement of work. No ambiguity before build
                  starts.
                </p>
              </div>
              <div>
                <h3 className="text-h3 text-text">Build</h3>
                <span className="text-mono-sm text-text-muted block mt-sm">
                  4–12 weeks
                </span>
                <p className="text-body-sm text-text-muted mt-md">
                  Engineering sprints with weekly demos and milestone gates. We
                  ship working systems, not prototypes — every sprint deliverable
                  runs in your environment with your data. No black boxes.
                </p>
              </div>
              <div>
                <h3 className="text-h3 text-text">Operate</h3>
                <span className="text-mono-sm text-text-muted block mt-sm">
                  Ongoing
                </span>
                <p className="text-body-sm text-text-muted mt-md">
                  Post-launch monitoring, model drift detection, retraining
                  pipelines, and operational support. We stay accountable to
                  production performance, not just delivery metrics.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Section 5: CTA Band */}
      <CTABand />
    </>
  );
}
