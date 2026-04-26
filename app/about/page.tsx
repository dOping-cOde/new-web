import { type Metadata } from "next";
import Image from "next/image";
import { HeroLight } from "@/components/sections/HeroLight";
import { CTABand } from "@/components/sections/CTABand";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Caption } from "@/components/ui/Caption";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "About",
  description:
    "Softwires Technologies — engineers who build AI systems for energy, healthcare, and infrastructure. Not sloganeers.",
  openGraph: {
    title: "About — Softwires",
    description:
      "Softwires Technologies — engineers who build AI systems for energy, healthcare, and infrastructure. Not sloganeers.",
  },
};

export default function AboutPage() {
  return (
    <>
      {/* 1. Hero */}
      <HeroLight
        kicker="ABOUT"
        headline="Engineers, not sloganeers."
        headlineSize="text-display-lg"
        intro="We build AI systems that run in transformers, bridges, hospitals, and mines. Our measure is uptime, not slides."
      />

      {/* 2. Origin section */}
      <section className="py-5xl max-md:py-3xl bg-bg-light">
        <Container>
          <div className="max-w-[720px] mx-auto">
            <h2 className="text-display-md">Why Softwires exists</h2>
            <div className="mt-2xl space-y-xl">
              <p className="text-body text-text-muted">
                The gap between AI research and physical-world deployment is wider than most
                people admit. Labs produce models that ace benchmarks in controlled settings.
                The hard part is running those models next to 415V transformers and LiDAR rigs,
                in environments where a crashed inference process does not just throw an error —
                it trips a circuit, delays a diagnosis, or flags a false alarm on a live
                structure. That gap is where Softwires lives.
              </p>
              <p className="text-body text-text-muted">
                India&apos;s infrastructure is being rebuilt at unprecedented scale. Smart grids
                are replacing manual switching rooms. Digital health networks are pushing point-of-care
                diagnostics into tier-3 cities. Structural monitoring systems are watching
                bridges that carry millions of people every day. Each of these contexts needs
                AI that works in dust, heat, and unreliable connectivity — not AI that works
                in a data centre with a redundant 10Gbps uplink.
              </p>
              <p className="text-body text-text-muted">
                Softwires exists to bridge that gap. We are an engineering team that understands
                both the model and the mounting bracket. Both the neural network and the NABH
                compliance audit. Both the inference latency budget and the IEC 61850 protocol
                requirement. We do not translate between engineering and business — we speak
                both natively, and we build accordingly.
              </p>
              <p className="text-body text-text-muted">
                We started with energy — iDTRM, a transformer monitoring system deployed across
                8 distribution transformers for a central-Indian DISCOM. That system taught us
                what real-time edge inference looks like when the alternative is a blackout.
                We expanded to healthcare (Salt-Lick, a cancer screening platform) and
                infrastructure (BridgeSense, a structural health monitoring system for bridges),
                and built a data platform practice along the way. Each system taught us what
                the next one needed.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Principles */}
      <section className="py-5xl max-md:py-3xl bg-bg-light border-t border-border-light">
        <Container>
          <div className="max-w-[720px] mx-auto">
            <section className="py-2xl">
              <Caption as="p">01</Caption>
              <h3 className="text-display-md mt-sm">We engineer for the failure mode</h3>
              <div className="mt-xl space-y-lg">
                <p className="text-body text-text-muted">
                  Every system we build is designed around what goes wrong, not what goes right.
                  Power surges. Monsoon seasons. Network dropouts. Sensor drift at 48°C ambient.
                  A model that performs at 97% accuracy in a sunny-day demo and falls apart
                  when the temperature sensor reads null is not a production system — it is a
                  prototype with a polished presentation layer.
                </p>
                <p className="text-body text-text-muted">
                  Our architecture reviews always begin with failure trees. We ask: what happens
                  when connectivity drops mid-inference? What happens when a calibration file
                  is missing? What happens when the input distribution shifts because a sensor
                  was replaced with a slightly different model? The answers to those questions
                  determine the architecture. The happy path is just documentation.
                </p>
              </div>
            </section>

            <section className="py-2xl border-t border-border-light">
              <Caption as="p">02</Caption>
              <h3 className="text-display-md mt-sm">Latency is a feature, not an afterthought</h3>
              <div className="mt-xl space-y-lg">
                <p className="text-body text-text-muted">
                  In physical-world AI, the latency budget is set by physics and consequence,
                  not by product managers. A transformer overheating has a thermal time constant
                  measured in seconds — not in the minutes it takes a cloud round-trip to complete.
                  A crack detected in a bridge member needs a decision in milliseconds, before
                  vibration propagates. A fraud pattern emerging in a claims stream needs a
                  score before the payment clears.
                </p>
                <p className="text-body text-text-muted">
                  We design for edge inference and on-device processing wherever the latency
                  requirement demands it. This means model compression, quantisation, and
                  hardware-aware architecture choices from the first prototype. It also means
                  building the telemetry pipeline so that edge decisions feed back to a central
                  learning loop — sub-second at the edge, continuous improvement at the centre.
                  Both, not one or the other.
                </p>
              </div>
            </section>

            <section className="py-2xl border-t border-border-light">
              <Caption as="p">03</Caption>
              <h3 className="text-display-md mt-sm">The model is 10% of the system</h3>
              <div className="mt-xl space-y-lg">
                <p className="text-body text-text-muted">
                  The research community focuses on the model because that is what gets published.
                  The 90% that makes a model production-ready rarely appears in papers. Data
                  pipelines that clean, label, and version training data. Monitoring systems
                  that detect distribution shift before accuracy degrades. Retraining schedules
                  that keep models current without disrupting live inference. Hardware integration
                  layers that translate between sensor protocols and model inputs.
                </p>
                <p className="text-body text-text-muted">
                  We build all of it. Compliance documentation for NABH or IEC auditors.
                  Deployment automation that pushes model updates to edge devices over unreliable
                  connections. Fallback logic that degrades gracefully when a model is unavailable.
                  When we deliver a system, the model is one component in a stack that has been
                  tested, instrumented, and hardened for the environment it runs in. That is
                  what production-ready means.
                </p>
              </div>
            </section>
          </div>
        </Container>
      </section>

      {/* 4. Sectors grid */}
      <section className="py-5xl max-md:py-3xl bg-bg-light border-t border-border-light">
        <Container>
          <SectionHeader
            kicker="WHERE WE WORK"
            heading="Five sectors. Real systems."
            headingSize="text-display-md"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-xl mt-2xl">
            <div className="border border-border-light rounded-md p-lg">
              <Caption>Energy</Caption>
              <p className="text-body-sm text-text-muted mt-sm">
                Grid intelligence and transformer monitoring
              </p>
            </div>
            <div className="border border-border-light rounded-md p-lg">
              <Caption>Healthcare</Caption>
              <p className="text-body-sm text-text-muted mt-sm">
                Cancer screening and clinical decision support
              </p>
            </div>
            <div className="border border-border-light rounded-md p-lg">
              <Caption>Infrastructure</Caption>
              <p className="text-body-sm text-text-muted mt-sm">
                Structural assessment and drone inspection
              </p>
            </div>
            <div className="border border-border-light rounded-md p-lg">
              <Caption>Insurance</Caption>
              <p className="text-body-sm text-text-muted mt-sm">
                Fraud detection and claims automation
              </p>
            </div>
            <div className="border border-border-light rounded-md p-lg">
              <Caption>Data Platforms</Caption>
              <p className="text-body-sm text-text-muted mt-sm">
                Enterprise analytics and semantic layer
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. Partnerships band */}
      <section className="py-5xl max-md:py-3xl bg-bg-light border-t border-border-light">
        <Container>
          <SectionHeader
            heading="Working with leaders across the industry"
            headingSize="text-display-md"
            align="center"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-xl mt-2xl">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-center"
              >
                <Image
                  src={`/images/partners/partner-${i + 1}.svg`}
                  alt={`Partner ${i + 1} logo placeholder`}
                  width={200}
                  height={60}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. CTA */}
      <CTABand />
    </>
  );
}
