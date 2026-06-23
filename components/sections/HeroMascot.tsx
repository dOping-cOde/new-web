import { cn } from "@/lib/utils";

/**
 * HeroMascot — a friendly cartoon robot built entirely as inline SVG in the
 * brand palette (dark surfaces, yellow accent). Decorative only.
 *
 * Motion (float / blink / wave / pulse) is driven by CSS classes defined in
 * globals.css, all gated behind `prefers-reduced-motion: no-preference`.
 */
export function HeroMascot({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 340 400"
      role="img"
      aria-label="Softiques robot mascot waving"
      className={cn("h-auto w-full max-w-[420px]", className)}
    >
      <defs>
        <radialGradient id="mascotGlow" cx="50%" cy="42%" r="55%">
          <stop offset="0%" stopColor="#FFD400" stopOpacity="0.22" />
          <stop offset="55%" stopColor="#FFD400" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#FFD400" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ambient accent glow */}
      <ellipse cx="170" cy="200" rx="160" ry="180" fill="url(#mascotGlow)" />

      {/* Floating robot */}
      <g className="mascot-float">
        {/* Antenna */}
        <line x1="170" y1="74" x2="170" y2="46" stroke="#2A2A2E" strokeWidth="4" strokeLinecap="round" />
        <circle className="mascot-pulse" cx="170" cy="42" r="7" fill="#FFD400" />

        {/* Ears */}
        <rect x="80" y="106" width="16" height="42" rx="8" fill="#151517" stroke="#2A2A2E" strokeWidth="2" />
        <rect x="244" y="106" width="16" height="42" rx="8" fill="#151517" stroke="#2A2A2E" strokeWidth="2" />

        {/* Head */}
        <rect x="94" y="74" width="152" height="118" rx="32" fill="#1C1C1F" stroke="#2A2A2E" strokeWidth="2" />

        {/* Visor */}
        <rect x="112" y="94" width="116" height="76" rx="26" fill="#0B0B0D" />

        {/* Eyes (blink) */}
        <g className="mascot-blink">
          <rect x="138" y="116" width="22" height="32" rx="11" fill="#FFD400" />
          <rect x="180" y="116" width="22" height="32" rx="11" fill="#FFD400" />
          <circle cx="144" cy="123" r="3.5" fill="#FFF7CC" />
          <circle cx="186" cy="123" r="3.5" fill="#FFF7CC" />
        </g>

        {/* Cheeks + smile */}
        <circle cx="128" cy="160" r="7" fill="#FFD400" opacity="0.25" />
        <circle cx="212" cy="160" r="7" fill="#FFD400" opacity="0.25" />
        <path d="M158 158 Q170 168 182 158" stroke="#FFD400" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* Body */}
        <rect x="108" y="200" width="124" height="122" rx="30" fill="#151517" stroke="#2A2A2E" strokeWidth="2" />

        {/* Chest screen with code glyph */}
        <rect x="130" y="222" width="80" height="54" rx="12" fill="#0B0B0D" stroke="#2A2A2E" strokeWidth="2" />
        <text
          x="170"
          y="250"
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="26"
          fontWeight="700"
          fill="#FFD400"
        >
          {"</>"}
        </text>

        {/* Left arm (resting) */}
        <rect x="84" y="214" width="20" height="74" rx="10" fill="#1C1C1F" stroke="#2A2A2E" strokeWidth="2" />
        <circle cx="94" cy="294" r="13" fill="#1C1C1F" stroke="#2A2A2E" strokeWidth="2" />

        {/* Right arm (waving) */}
        <g className="mascot-wave">
          <rect x="226" y="150" width="18" height="80" rx="9" fill="#1C1C1F" stroke="#2A2A2E" strokeWidth="2" />
          <circle cx="235" cy="146" r="15" fill="#FFD400" />
          <circle cx="230" cy="142" r="3" fill="#0B0B0D" opacity="0.35" />
        </g>

        {/* Legs + feet */}
        <rect x="138" y="320" width="22" height="38" rx="11" fill="#1C1C1F" stroke="#2A2A2E" strokeWidth="2" />
        <rect x="180" y="320" width="22" height="38" rx="11" fill="#1C1C1F" stroke="#2A2A2E" strokeWidth="2" />
        <ellipse cx="149" cy="362" rx="22" ry="11" fill="#0B0B0D" stroke="#2A2A2E" strokeWidth="2" />
        <ellipse cx="191" cy="362" rx="22" ry="11" fill="#0B0B0D" stroke="#2A2A2E" strokeWidth="2" />
      </g>

      {/* Floating accent sparks */}
      <circle className="mascot-pulse" cx="52" cy="120" r="5" fill="#FFD400" opacity="0.7" />
      <circle className="mascot-pulse" cx="298" cy="288" r="4" fill="#FFD400" opacity="0.5" />
      <circle className="mascot-pulse" cx="288" cy="90" r="3" fill="#FFD400" opacity="0.6" />
    </svg>
  );
}
