"use client";

// Central GSAP registration module — D-03
// ALL GSAP consumers must import gsap and ScrollTrigger from THIS module,
// not directly from "gsap". This ensures plugins are registered exactly once.

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
