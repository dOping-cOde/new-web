// ============================================================
// Capability Strip Data — Home page Section 2
// Source: lib/services.ts (short display titles for 3×2 grid tiles)
// ============================================================

export interface CapabilityTile {
  id: string;
  title: string;
  description: string;
  tag: string;
  anchorId: string;
}

export const CAPABILITIES: CapabilityTile[] = [
  {
    id: "ai-agents",
    title: "AI Agent Development",
    description:
      "Multi-agent systems that reason, plan, and act — integrated directly into your operational infrastructure.",
    tag: "Incident triage · Procurement automation · Field operations",
    anchorId: "ai-agents",
  },
  {
    id: "chatbots",
    title: "AI Chatbots",
    description:
      "Production-grade AI chatbots grounded in your data — built for accuracy, auditability, and technical environments.",
    tag: "Technical support · Knowledge assistants · Voice interfaces",
    anchorId: "chatbots",
  },
  {
    id: "healthcare",
    title: "AI in Healthcare",
    description:
      "Clinical risk scoring and diagnostic support systems built to DPDP, NABH, and IRDAI standards from day one.",
    tag: "Cancer risk stratification · Diagnostic support · Population health",
    anchorId: "healthcare",
  },
  {
    id: "energy",
    title: "AI in Energy",
    description:
      "Real-time monitoring and predictive maintenance systems that protect grid infrastructure from distribution to generation.",
    tag: "Transformer monitoring · Predictive failure · Theft analytics",
    anchorId: "energy",
  },
  {
    id: "infrastructure",
    title: "AI in Infrastructure",
    description:
      "Computer vision and LiDAR-based inspection systems that detect sub-millimeter structural changes continuously.",
    tag: "Bridge inspection · Structural change detection · Anomaly monitoring",
    anchorId: "infrastructure",
  },
  {
    id: "data-analytics",
    title: "Data & Analytics Intelligence",
    description:
      "Semantic data layers, OLAP modernization, and natural-language analytics interfaces at sub-second response times.",
    tag: "Semantic fabric · OLAP modernization · NL-to-SQL",
    anchorId: "data-analytics",
  },
];
