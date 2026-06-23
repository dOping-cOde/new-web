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
    id: "websites",
    title: "Website Development",
    description:
      "Fast, accessible, SEO-ready websites and web apps built on a modern stack and tuned for Core Web Vitals.",
    tag: "Marketing sites · E-commerce · Web portals",
    anchorId: "websites",
  },
  {
    id: "apps",
    title: "App Development",
    description:
      "Cross-platform and native mobile apps with clean architecture, tested APIs, and reliable CI/CD.",
    tag: "iOS & Android · Cross-platform · PWAs",
    anchorId: "apps",
  },
  {
    id: "gaming",
    title: "Game Development",
    description:
      "Mobile, web, and multiplayer games — plus gamified experiences — built in Unity, Unreal, and WebGL.",
    tag: "Mobile games · Multiplayer · AR & 3D",
    anchorId: "gaming",
  },
  {
    id: "erp",
    title: "ERP Solutions",
    description:
      "Custom and platform-based ERP that unifies finance, inventory, HR, and sales into one operating system.",
    tag: "Inventory · Finance & HR · CRM",
    anchorId: "erp",
  },
  {
    id: "ai",
    title: "AI Solutions",
    description:
      "Production-grade chatbots, copilots, and autonomous agents grounded in your data — accurate and auditable.",
    tag: "Chatbots · Automation · AI agents",
    anchorId: "ai",
  },
  {
    id: "ml",
    title: "ML Solutions",
    description:
      "Custom models for prediction, recommendation, and computer vision, shipped with full MLOps.",
    tag: "Forecasting · Recommendations · Computer vision",
    anchorId: "ml",
  },
];
