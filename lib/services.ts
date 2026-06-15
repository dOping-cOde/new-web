import type { ServiceMeta } from "./types";

// ============================================================
// Service Metadata
// Source: build spec section 4.2, services page brief
// 6 service areas with titles, descriptions, tech stacks, use cases
// ============================================================

export const SERVICES: ServiceMeta[] = [
  {
    id: "enterprise-ai",
    number: "01",
    label: "ENTERPRISE AI",
    title: "AI-Native Analytics That Scale to Trillions of Data Points",
    anchorId: "enterprise-ai",
    description:
      "Enterprise-grade AI analytics platforms that deliver sub-second insights on massive datasets — connecting BI tools, cloud data warehouses, and decision-makers without compromising governance.",
    techStack: ["Smart OLAP", "BI Integration", "Cloud-Native", "Semantic Layer", "AI/ML", "Data Governance"],
    useCases: [
      "Unified BI acceleration layers that deliver interactive analytics on trillion-row datasets across Tableau, Power BI, and Excel without moving data",
      "Cloud-native analytics platforms on Snowflake, Databricks, and BigQuery that cut query times from minutes to sub-second while reducing compute costs",
      "AI-powered self-service analytics that let business users explore enterprise data through natural language — with full governance and lineage tracking",
    ],
  },
  {
    id: "ai-agents",
    number: "02",
    label: "AI AGENTS",
    title: "Autonomous Systems That Operate at Industrial Scale",
    anchorId: "ai-agents",
    description:
      "Multi-agent systems that reason, plan, and act — integrated directly into your operational infrastructure, not bolted on as an afterthought.",
    techStack: ["LangGraph", "CrewAI", "MCP", "OpenAI", "Anthropic", "Local models"],
    useCases: [
      "Incident triage agents that escalate, remediate, and log without human intervention",
      "Procurement and compliance agents that navigate supplier data and regulatory documents autonomously",
      "Field operations agents that coordinate across IoT sensors, scheduling systems, and human teams",
    ],
  },
  {
    id: "chatbots",
    number: "03",
    label: "CONVERSATIONAL",
    title: "Conversational Intelligence Built for Technical Environments",
    anchorId: "chatbots",
    description:
      "Production-grade AI chatbots and voice interfaces grounded in your data — not generic LLM wrappers, but systems engineered for accuracy and auditability.",
    techStack: ["RAG", "Vector DBs", "Function Calling", "ASR/TTS"],
    useCases: [
      "Customer-facing technical support bots that resolve Tier-1 and Tier-2 queries against live knowledge bases",
      "Internal knowledge assistants that surface engineering documentation, runbooks, and compliance data on demand",
      "Voice-enabled field interfaces for environments where hands-free operation is non-negotiable",
    ],
  },
  {
    id: "data-analytics",
    number: "04",
    label: "DATA & ANALYTICS",
    title: "Analytics Infrastructure That Thinks at the Speed of Your Business",
    anchorId: "data-analytics",
    description:
      "Semantic data layers, OLAP modernization, and natural-language analytics interfaces that make enterprise data actually useful — at sub-second query response times.",
    techStack: ["OLAP", "Semantic Layer", "NL-to-SQL", "Cost Optimization"],
    useCases: [
      "Unified semantic fabric implementations that eliminate metric inconsistencies across business units and BI tools",
      "Legacy cube engine migrations (SSAS, Essbase, TM1) to modern OLAP architectures with 1000x faster analytical throughput",
      "Natural-language analytics interfaces that let non-technical stakeholders query enterprise data without SQL knowledge",
    ],
  },
];

/**
 * Returns all service slugs (service ids) for generateStaticParams.
 */
export function getServiceSlugs(): Array<{ slug: string }> {
  return SERVICES.map((s) => ({ slug: s.id }));
}

/**
 * Returns service metadata by slug (service id). Throws if not found.
 */
export function getServiceBySlug(slug: string): ServiceMeta {
  const service = SERVICES.find((s) => s.id === slug);
  if (!service) {
    throw new Error(`Service not found: ${slug}`);
  }
  return service;
}
