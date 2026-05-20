// ============================================================
// Industry Metadata
// Maps navbar industries to descriptions, related portfolio work,
// and service areas.
// ============================================================

export interface IndustryMeta {
  slug: string;
  label: string;
  headline: string;
  intro: string;
  /** 2–3 paragraphs of industry copy */
  copy: string[];
  /** Challenges we solve in this industry */
  challenges: string[];
  /** slugs of related portfolio case studies */
  portfolioSlugs: string[];
  /** service IDs from lib/services.ts */
  relatedServiceIds: string[];
}

export const INDUSTRIES: IndustryMeta[] = [
  {
    slug: "healthcare",
    label: "Healthcare",
    headline: "AI systems built for clinical reality, not lab conditions.",
    intro:
      "We build AI that operates under real compliance constraints — DPDP, NABH, IRDAI — and integrates into clinical workflows where accuracy is non-negotiable.",
    copy: [
      "Healthcare AI fails when it is built in isolation from clinical operations. Models trained on curated datasets break when they meet the noise of real-world patient data — inconsistent lab formats, missing fields, handwritten notes, and imaging artefacts from ageing equipment. We build systems that handle this reality.",
      "Our work spans cancer risk stratification, multimodal diagnostic support, and population health platforms. Every system ships with explainability reports, quantified accuracy metrics, and deployment documentation that satisfies compliance teams and clinicians alike.",
      "From spoke-hub triage networks that catch late-stage progression early, to AI-powered screening platforms processing 100+ biomarkers in under 15 minutes — we bring engineering discipline to clinical environments where the cost of a false negative is not a metric, it is a patient.",
    ],
    challenges: [
      "Compliance-first AI that meets DPDP, NABH, and IRDAI requirements from architecture onwards, not as a post-build retrofit",
      "Multimodal diagnostic systems that fuse imaging, lab results, and longitudinal records into actionable risk scores",
      "Population health platforms that identify at-risk cohorts across large patient databases for preventive intervention",
      "Explainable AI outputs that clinicians and regulators can audit, understand, and trust",
    ],
    portfolioSlugs: ["salt-lick"],
    relatedServiceIds: ["healthcare", "ai-agents", "chatbots"],
  },
  {
    slug: "energy",
    label: "Energy",
    headline: "Real-time intelligence for grids, assets, and operations.",
    intro:
      "We build monitoring, predictive maintenance, and anomaly detection systems for grid infrastructure — from distribution transformers to generation assets.",
    copy: [
      "Grid infrastructure operates in conditions that most software engineers never encounter: intermittent connectivity, legacy SCADA interfaces, heterogeneous sensor data from equipment spanning decades, and regulatory reporting requirements that change by state. Our systems are designed for this operational reality.",
      "We build real-time monitoring with sub-5-minute refresh cycles, load forecasting that correlates weather, historical consumption, and infrastructure state, and theft analytics that detect tampered metering points before losses compound. Integration happens at the data layer, not the dashboard layer.",
      "Whether it is distribution transformer health monitoring across a state utility or predictive failure models that prioritise maintenance dispatch, we deliver systems that pre-warn grid failures before consumers notice — and before costs escalate.",
    ],
    challenges: [
      "Real-time transformer monitoring with sub-5-minute refresh cycles that detect anomalies before cascading failures",
      "Predictive maintenance models that correlate weather, load, and fault history to prioritise field dispatch",
      "Theft and tamper analytics that identify metering irregularities across large distribution networks",
      "Integration with legacy SCADA, IoT gateways, and heterogeneous sensor arrays without infrastructure replacement",
    ],
    portfolioSlugs: ["idtrm"],
    relatedServiceIds: ["energy", "ai-agents", "data-analytics"],
  },
  {
    slug: "infrastructure",
    label: "Infrastructure",
    headline: "AI-powered inspection that replaces manual surveys with continuous intelligence.",
    intro:
      "We build computer vision and LiDAR systems for bridges, viaducts, and large-scale civil infrastructure — detecting sub-millimetre changes that manual inspection misses.",
    copy: [
      "Manual infrastructure inspection is slow, subjective, and dangerous. A six-day survey of a highway bridge produces a report that is already ageing by the time it reaches the engineer's desk. We replace this with continuous, quantified structural intelligence.",
      "BridgeSense detects structural changes of 1.5-3mm using drone-mounted LiDAR at 0.92 F1-score accuracy — compressing multi-day manual inspection cycles into single-pass aerial surveys. Point cloud processing pipelines extract settlement, deflection, and cracking metrics at scale.",
      "AI-Copter extends these capabilities to mining environments, underground structures, and confined-space assets where human inspection is operationally impractical. We build the full stack: sensor integration, data pipelines, ML models, and operator-facing reporting tools.",
    ],
    challenges: [
      "Sub-millimetre structural change detection using drone-mounted LiDAR and 3D point cloud analysis",
      "Automated inspection workflows that compress multi-day manual surveys into single-pass aerial missions",
      "Continuous anomaly monitoring that distinguishes thermal variation from genuine structural degradation",
      "Confined-space and underground inspection using autonomous drone AI for environments unsafe for humans",
    ],
    portfolioSlugs: ["bridgesense", "ai-copter"],
    relatedServiceIds: ["infrastructure", "ai-agents"],
  },
  {
    slug: "financial-services",
    label: "Financial Services",
    headline: "AI systems for fraud detection, compliance, and risk — built for regulated environments.",
    intro:
      "We build AI platforms for insurance, banking, and financial services that operate under strict regulatory oversight — IRDAI, RBI, and data protection standards built in from day one.",
    copy: [
      "Financial services AI operates under a unique constraint: every decision must be auditable, every model must be explainable, and every deployment must satisfy regulators who may not understand the technology but will scrutinise its outcomes. We build for this reality.",
      "Our fraud, waste, and abuse detection platforms process claims data with AES-256 encryption, operate in on-premises DR/DC configurations, and meet IRDAI compliance requirements out of the box. These are not cloud-first convenience architectures — they are systems engineered for the security posture that financial regulators demand.",
      "From pattern detection that identifies fraudulent claim networks to risk scoring models that triage underwriting decisions, we deliver AI that operates within the regulatory guardrails of the financial sector — not around them.",
    ],
    challenges: [
      "Fraud detection platforms with AES-256 encryption and IRDAI-compliant on-premises deployment",
      "Claims analytics that identify fraudulent networks and anomalous patterns across large portfolios",
      "Risk scoring and underwriting models that are fully explainable for regulatory audit",
      "Secure, air-gapped deployment architectures for financial institutions with strict data residency requirements",
    ],
    portfolioSlugs: ["fwa-platform"],
    relatedServiceIds: ["ai-agents", "data-analytics", "enterprise-ai"],
  },
  {
    slug: "retail",
    label: "Retail",
    headline: "AI that understands inventory, demand, and customers at scale.",
    intro:
      "We build demand forecasting, inventory intelligence, and customer analytics systems that help retail operations make faster, data-driven decisions.",
    copy: [
      "Retail operates on thin margins and fast cycles. A stockout costs sales; overstock ties up capital. Promotions that miss their audience burn budget. We build AI systems that make retail operations measurably smarter — not through dashboards that no one checks, but through intelligence embedded directly into operational workflows.",
      "Our demand forecasting models account for seasonality, promotion calendars, weather, local events, and supply chain disruptions. Inventory optimisation systems balance service levels against carrying costs across hundreds of SKUs and locations. Customer segmentation engines identify behavioural clusters that drive targeted, high-conversion campaigns.",
      "We build on enterprise analytics infrastructure that delivers sub-second insights across massive transaction datasets — connecting point-of-sale data, supply chain signals, and customer behaviour into unified intelligence that retail teams can act on in real time.",
    ],
    challenges: [
      "Demand forecasting that accounts for promotions, seasonality, weather, and supply disruptions simultaneously",
      "Inventory optimisation across multi-location networks that balances service levels against working capital",
      "Customer analytics and segmentation engines that drive targeted campaigns with measurable ROI",
      "Real-time analytics on transaction data spanning millions of SKUs and thousands of locations",
    ],
    portfolioSlugs: ["bi-acceleration-engine", "unified-semantic-fabric"],
    relatedServiceIds: ["enterprise-ai", "data-analytics", "chatbots"],
  },
  {
    slug: "construction",
    label: "Construction",
    headline: "AI for project intelligence, safety monitoring, and site operations.",
    intro:
      "We build AI systems that bring real-time visibility to construction projects — from progress tracking and safety compliance to cost forecasting and resource optimisation.",
    copy: [
      "Construction projects are complex, multi-stakeholder operations where delays compound, cost overruns cascade, and safety incidents carry consequences that extend far beyond the project timeline. We build AI systems that bring quantified intelligence to this environment.",
      "Computer vision systems monitor site progress against BIM models, detect safety violations in real time, and track equipment utilisation across large project footprints. Predictive analytics identify schedule risks before they become delays, and resource optimisation models ensure the right crews and materials are where they need to be.",
      "Our systems integrate with existing project management tools and IoT sensor networks — delivering intelligence at the operational layer where site managers and engineers make decisions, not locked away in executive dashboards.",
    ],
    challenges: [
      "Computer vision for real-time safety compliance monitoring and PPE detection across active sites",
      "Progress tracking systems that compare actual site conditions against BIM models using drone surveys",
      "Predictive schedule and cost analytics that flag risks before they become overruns",
      "Equipment utilisation and resource optimisation across multi-site construction portfolios",
    ],
    portfolioSlugs: ["ai-copter", "bridgesense"],
    relatedServiceIds: ["infrastructure", "ai-agents", "enterprise-ai"],
  },
  {
    slug: "fmcg",
    label: "FMCG",
    headline: "AI for supply chains, demand sensing, and trade intelligence.",
    intro:
      "We build analytics and AI systems that give FMCG companies real-time visibility into demand patterns, supply chain performance, and trade promotion effectiveness.",
    copy: [
      "FMCG companies generate enormous volumes of data — from point-of-sale transactions and distributor reports to trade promotion spend and supply chain logistics. The challenge is not data collection; it is turning that data into decisions fast enough to matter in a business where product shelf life is measured in days.",
      "Our demand sensing models predict short-term demand shifts using real-time signals — weather, local events, social trends, and competitor activity — layered on top of historical baselines. Supply chain intelligence platforms identify bottlenecks, optimize route-to-market, and reduce wastage across complex distribution networks.",
      "Trade promotion analytics quantify the actual ROI of every promotion dollar spent — not estimated impact from planning models, but measured lift from transactional data. We build the analytics infrastructure that makes this level of visibility operationally practical at FMCG scale.",
    ],
    challenges: [
      "Demand sensing that combines real-time signals with historical baselines for short-cycle forecasting",
      "Supply chain visibility platforms that identify bottlenecks and optimise distribution routes in real time",
      "Trade promotion ROI analytics that measure actual lift from transactional data, not planning estimates",
      "Unified analytics across fragmented data sources — distributors, retailers, trade partners, and internal systems",
    ],
    portfolioSlugs: [
      "bi-acceleration-engine",
      "enterprise-reporting-suite",
      "unified-semantic-fabric",
    ],
    relatedServiceIds: ["enterprise-ai", "data-analytics", "ai-agents"],
  },
  {
    slug: "mining",
    label: "Mining",
    headline: "AI for safety, asset monitoring, and autonomous inspection in harsh environments.",
    intro:
      "We build AI systems for mining operations — from drone-based autonomous inspection and safety monitoring to predictive maintenance and environmental compliance.",
    copy: [
      "Mining environments are among the most demanding operating contexts for AI systems. Extreme temperatures, dust, vibration, intermittent connectivity, and the sheer physical danger of underground and open-pit operations make consumer-grade AI solutions irrelevant. We build systems engineered for this reality.",
      "AI-Copter delivers six AI-driven use cases for mining operations: boundary security, PPE compliance monitoring, volumetric analysis, haul road condition assessment, blast pattern optimisation, and environmental monitoring. These systems operate 24/7 without manual review, in environments where deploying human inspectors is slow, expensive, or unsafe.",
      "Predictive maintenance models for heavy equipment — haul trucks, crushers, conveyors, and processing plant machinery — correlate vibration, temperature, and operational data to predict failures before they halt production. Every system we build for mining is designed for ruggedised deployment, not retrofitted from office-grade infrastructure.",
    ],
    challenges: [
      "Autonomous drone inspection for boundary security, PPE compliance, and volumetric analysis in active mines",
      "Predictive maintenance for heavy equipment that prevents unplanned downtime in 24/7 operations",
      "Safety monitoring systems that detect violations and hazards in real time across large open-pit and underground sites",
      "Environmental compliance monitoring using AI-driven sensor networks and aerial surveys",
    ],
    portfolioSlugs: ["ai-copter"],
    relatedServiceIds: ["infrastructure", "ai-agents", "energy"],
  },
];

/**
 * Returns all industry slugs for generateStaticParams.
 */
export function getIndustrySlugs(): Array<{ slug: string }> {
  return INDUSTRIES.map((ind) => ({ slug: ind.slug }));
}

/**
 * Returns industry metadata by slug. Throws if not found.
 */
export function getIndustryBySlug(slug: string): IndustryMeta {
  const industry = INDUSTRIES.find((ind) => ind.slug === slug);
  if (!industry) {
    throw new Error(`Industry not found: ${slug}`);
  }
  return industry;
}
