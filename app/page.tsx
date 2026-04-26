export default function Home() {
  return (
    <div className="py-5xl px-xl max-w-[1200px] mx-auto">
      <h1 className="text-display-xl mb-2xl">
        AI <span className="text-accent">engineered</span> for the physical world.
      </h1>
      <p className="text-body-lg text-text-muted max-w-[640px] mb-3xl">
        Softwires builds AI systems that monitor transformers, inspect bridges,
        screen for cancer, and detect fraud — deployed in production across India
        and beyond.
      </p>

      {/* Typography scale verification */}
      <div className="space-y-xl border-t border-border-light pt-2xl">
        <p className="text-caption text-text-muted">TYPOGRAPHY SCALE</p>
        <p className="text-display-xl">display-xl (128px / 56px)</p>
        <p className="text-display-lg">display-lg (80px / 44px)</p>
        <p className="text-display-md">display-md (56px / 32px)</p>
        <p className="text-h1">h1 (40px / 28px)</p>
        <p className="text-h2">h2 (30px / 24px)</p>
        <p className="text-h3">h3 (20px / 18px)</p>
        <p className="text-body-lg">body-lg (20px / 18px)</p>
        <p className="text-body">body (17px / 16px)</p>
        <p className="text-body-sm">body-sm (15px / 14px)</p>
        <p className="text-caption">CAPTION (13px / 12px)</p>
        <p className="text-mono-sm">mono-sm (13px / 12px)</p>
      </div>

      {/* Color token verification */}
      <div className="mt-3xl space-y-lg">
        <p className="text-caption text-text-muted">COLOR TOKENS</p>
        <div className="flex gap-md flex-wrap">
          <div className="w-xl h-xl bg-bg-light border border-border-light" title="bg-light"></div>
          <div className="w-xl h-xl bg-bg-dark" title="bg-dark"></div>
          <div className="w-xl h-xl bg-surface border border-border-light" title="surface"></div>
          <div className="w-xl h-xl bg-surface-elevated" title="surface-elevated"></div>
          <div className="w-xl h-xl bg-accent" title="accent"></div>
          <div className="w-xl h-xl bg-accent-hover" title="accent-hover"></div>
          <div className="w-xl h-xl bg-accent-soft" title="accent-soft"></div>
        </div>
      </div>

      {/* Spacing verification */}
      <div className="mt-3xl">
        <p className="text-caption text-text-muted mb-lg">SPACING SCALE</p>
        <div className="space-y-sm">
          <div className="h-xs bg-accent/20 w-full" title="xs=4px"></div>
          <div className="h-sm bg-accent/25 w-full" title="sm=8px"></div>
          <div className="h-md bg-accent/30 w-full" title="md=16px"></div>
          <div className="h-lg bg-accent/35 w-full" title="lg=24px"></div>
          <div className="h-xl bg-accent/40 w-full" title="xl=32px"></div>
        </div>
      </div>
    </div>
  );
}
