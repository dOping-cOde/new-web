import type { ServiceMeta } from "./types";

// ============================================================
// Service Metadata — Softiques
// 6 service areas with titles, descriptions, tech stacks, use cases
// ============================================================

export const SERVICES: ServiceMeta[] = [
  {
    id: "websites",
    number: "01",
    label: "WEBSITE DEVELOPMENT",
    title: "Websites Engineered to Convert and Perform",
    anchorId: "websites",
    description:
      "Fast, accessible, search-optimised websites — from marketing sites to full web applications — built on a modern stack and tuned for Core Web Vitals.",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Headless CMS", "Vercel"],
    useCases: [
      "Marketing and brand sites that load in under two seconds and rank — server-rendered, SEO-clean, and CMS-driven so your team can publish without a developer",
      "E-commerce storefronts with secure checkout, payment-gateway integration, and inventory sync",
      "Custom web portals and dashboards with authentication, role-based access, and real-time data",
    ],
  },
  {
    id: "apps",
    number: "02",
    label: "APP DEVELOPMENT",
    title: "Mobile and Web Apps Built to Scale",
    anchorId: "apps",
    description:
      "Cross-platform and native applications with clean architecture, a tested API layer, and the CI/CD pipelines that keep shipping reliable as you grow.",
    techStack: ["React Native", "Flutter", "Swift", "Kotlin", "Node.js", "PostgreSQL"],
    useCases: [
      "Cross-platform mobile apps from a single codebase — one team, both iOS and Android, faster time to market",
      "Native iOS and Android builds when performance, hardware access, or platform polish demands it",
      "Progressive web apps and the back-end APIs, databases, and integrations that power them",
    ],
  },
  {
    id: "gaming",
    number: "03",
    label: "GAME DEVELOPMENT",
    title: "Games and Interactive Experiences",
    anchorId: "gaming",
    description:
      "Mobile, web, and cross-platform games — from hyper-casual to real-time multiplayer — plus gamified product experiences that keep users coming back.",
    techStack: ["Unity", "Unreal Engine", "C#", "WebGL", "Three.js", "Photon"],
    useCases: [
      "2D and 3D mobile games with tuned monetisation, analytics, and live-ops from launch",
      "Real-time multiplayer and leaderboard systems with low-latency networking",
      "Gamification, AR experiences, and interactive 3D for products that need to stand out",
    ],
  },
  {
    id: "erp",
    number: "04",
    label: "ERP SOLUTIONS",
    title: "ERP Platforms That Run Your Operations",
    anchorId: "erp",
    description:
      "Custom and platform-based ERP that unifies finance, inventory, HR, and sales into one system — automating the workflows your business runs on every day.",
    techStack: ["Odoo", "ERPNext", "Node.js", "PostgreSQL", "REST / GraphQL", "Cloud"],
    useCases: [
      "Inventory, procurement, and supply-chain modules with real-time stock and reorder automation",
      "Finance, accounting, HR, and payroll workflows unified under one source of truth",
      "Custom modules, third-party integrations, and migrations off spreadsheets and legacy software",
    ],
  },
  {
    id: "ai",
    number: "05",
    label: "AI SOLUTIONS",
    title: "AI Products and Automation",
    anchorId: "ai",
    description:
      "Production-grade AI grounded in your data — chatbots, copilots, and autonomous agents engineered for accuracy and auditability, not demo-day theatre.",
    techStack: ["OpenAI", "Anthropic", "LangChain", "RAG", "Vector DBs", "Python"],
    useCases: [
      "Customer-support and knowledge assistants grounded in your documentation via retrieval-augmented generation",
      "Document and back-office automation that extracts, classifies, and routes at scale",
      "AI agents and integrations wired directly into your existing products and workflows",
    ],
  },
  {
    id: "ml",
    number: "06",
    label: "ML SOLUTIONS",
    title: "Machine Learning, Trained on Your Data",
    anchorId: "ml",
    description:
      "Custom models for prediction, recommendation, and computer vision — built end-to-end with the data pipelines, monitoring, and MLOps that keep them accurate in production.",
    techStack: ["PyTorch", "TensorFlow", "scikit-learn", "MLflow", "Pandas", "AWS SageMaker"],
    useCases: [
      "Predictive analytics and demand forecasting that turn historical data into decisions",
      "Recommendation engines and personalisation that lift engagement and revenue",
      "Computer-vision systems for detection, classification, and quality inspection — with MLOps for retraining and drift monitoring",
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
