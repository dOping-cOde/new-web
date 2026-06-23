// ============================================================
// Insights content — local, first-party articles for Softiques.
//
// Articles are organised into one file per year under ./insights/.
// This module concatenates them into a single ARTICLES array and
// re-exports the shared LocalArticle type, so consumers continue to
// import everything from "@/content/insights" unchanged.
//
// Each article's `html` body is rendered through Tailwind Typography
// on the detail page, so the bodies use semantic tags (h2, h3, p,
// ul, blockquote, strong, em).
// ============================================================

export type { LocalArticle } from "./insights/types";

import type { LocalArticle } from "./insights/types";
// Scheduled (future-dated) articles — hidden by lib/insights until their date.
import { articles2028H1 } from "./insights/2028-h1";
import { articles2027H2 } from "./insights/2027-h2";
import { articles2027H1 } from "./insights/2027-h1";
import { articles2026H2 } from "./insights/2026-h2";
import { articles2026 } from "./insights/2026";
import { articles2025 } from "./insights/2025";
import { articles2024 } from "./insights/2024";
import { articles2023 } from "./insights/2023";
import { articles2022 } from "./insights/2022";
import { articles2021 } from "./insights/2021";
import { articles2020 } from "./insights/2020";
import { articles2019 } from "./insights/2019";
import { articles2018 } from "./insights/2018";

export const ARTICLES: LocalArticle[] = [
  ...articles2028H1,
  ...articles2027H2,
  ...articles2027H1,
  ...articles2026H2,
  ...articles2026,
  ...articles2025,
  ...articles2024,
  ...articles2023,
  ...articles2022,
  ...articles2021,
  ...articles2020,
  ...articles2019,
  ...articles2018,
];
