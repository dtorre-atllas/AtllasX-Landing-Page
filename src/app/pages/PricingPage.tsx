'use client';

import { lazy, Suspense, useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { TopBanner } from '../components/TopBanner';
import { SiteNav } from '../components/SiteNav';
import { SiteFooter } from '../components/SiteFooter';
import { TerminalCanvas } from '../components/TerminalCanvas';
import { ComparisonTable } from '../components/ComparisonTable';
import { DEMO_CTA_URL } from '../lib/constants';

const PricingSection = lazy(() =>
  import('../components/PricingSection').then((m) => ({
    default: m.PricingSection,
  })),
);

const REVEAL = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.8 },
};

function Eyebrow({
  children,
  tone = 'light',
}: {
  children: React.ReactNode;
  tone?: 'dark' | 'light';
}) {
  return (
    <div
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: tone === 'dark' ? '#A3A3A3' : '#52525B',
        marginBottom: '1rem',
      }}
    >
      {children}
    </div>
  );
}

function PrimaryCTA({
  label = 'Book a Demo',
  variant = 'dark',
}: {
  label?: string;
  variant?: 'dark' | 'light';
}) {
  const isLight = variant === 'light';
  return (
    <a
      href={DEMO_CTA_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold transition"
      style={{
        background: isLight ? '#F5F5F5' : '#0A0A0A',
        color: isLight ? '#0A0A0A' : '#FFFFFF',
      }}
    >
      {label}
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M5 3L9 7L5 11"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </a>
  );
}

// NOTE: tier-vs-tier feature matrix removed in favor of engineers' competitive
// comparison table (AtllasX vs Traditional vs Others). The PricingSection
// component handles per-tier feature lists inline (Champion/Elite/Platinum/Enterprise).

const FAQ: Array<{ q: string; a: string }> = [
  {
    q: 'What counts as a call?',
    a: "Every outbound dial attempt counts as one call, including voicemails and no-answers. We don't charge for retries on the same lead within the same campaign.",
  },
  {
    q: 'What does setup actually involve?',
    a: 'CRM integration mapping, ICP-aligned qualification script tuning, consent posture audit, and voice/tone calibration. Most teams go live in 5 minutes for self-serve onboarding, or 1–2 weeks for Elite with white-glove setup.',
  },
  {
    q: "What if we're a legacy AtllasX customer on Rising Star?",
    a: "We're grandfathering Rising Star customers for 6–12 months. When you're ready, you can migrate to Champion (same $499/mo price, expanded feature set including AI voice clones, advanced analytics, and Zapier). Reach out and we'll walk through it.",
  },
  {
    q: 'Can we switch tiers mid-contract?',
    a: 'Upgrades anytime, prorated. Downgrades at the next renewal.',
  },
  {
    q: 'Is there a free trial?',
    a: 'No free trial. We run a live proof-of-concept on the demo call so you can see real results before committing.',
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: '#E4E4E7' }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-6 py-5 text-left"
      >
        <span
          className="text-base md:text-lg font-medium"
          style={{ color: '#0A0A0A' }}
        >
          {q}
        </span>
        <span
          className="flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center"
          style={{ borderColor: '#D4D4D8', color: '#0A0A0A' }}
        >
          {open ? <Minus size={14} /> : <Plus size={14} />}
        </span>
      </button>
      {open && (
        <div
          className="pb-6 text-base leading-relaxed max-w-3xl"
          style={{ color: '#52525B' }}
        >
          {a}
        </div>
      )}
    </div>
  );
}

export default function PricingPage() {
  return (
    <div
      className="relative bg-white min-h-screen"
      style={{ fontFamily: 'var(--font-body)' }}
    >
      <TopBanner />
      <SiteNav />

      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{
          background: '#0A0A0A',
          minHeight: '50vh',
          paddingTop: '4rem',
          paddingBottom: '3rem',
        }}
      >
        <TerminalCanvas canvasId="pricing-hero-terminal" />
        <div
          className="absolute inset-0 z-[2]"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.85) 70%, rgba(10,10,10,1) 100%)',
          }}
        />
        <div
          className="absolute inset-0 z-[3] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div {...REVEAL}>
            <Eyebrow tone="dark">[ Pricing ]</Eyebrow>
            <h1
              className="mb-8 max-w-4xl"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 0.95,
                color: '#FAFAFA',
              }}
            >
              Pricing that scales with your inbound volume.
            </h1>
            <p
              className="text-lg md:text-xl max-w-3xl"
              style={{ color: '#A3A3A3' }}
            >
              Every tier is TCPA-compliant by default. Every tier connects to
              your CRM. Differences are volume and how much hands-on optimization
              you want.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4-TIER PRICING GRID — reuse existing component */}
      <section
        className="relative py-16 border-t"
        style={{ background: '#FFFFFF', borderColor: '#E4E4E7' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <Suspense
            fallback={
              <div
                className="text-sm"
                style={{ fontFamily: 'var(--font-mono)', color: '#52525B' }}
              >
                Loading pricing…
              </div>
            }
          >
            <PricingSection />
          </Suspense>
        </div>
      </section>

      {/* COMPETITIVE COMPARISON — AtllasX vs Traditional vs Others */}
      <ComparisonTable />

      {/* PRICING FAQ */}
      <section
        className="relative py-16 border-t"
        style={{
          background: '#FFFFFF',
          borderColor: '#E4E4E7',
          color: '#0A0A0A',
        }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <motion.div {...REVEAL} className="mb-12">
            <Eyebrow tone="light">[ FAQ ]</Eyebrow>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
              }}
            >
              Pricing questions, answered.
            </h2>
          </motion.div>

          <div>
            {FAQ.map((item) => (
              <FAQItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOMER MIGRATION BANNER */}
      <section
        className="relative py-16 border-t"
        style={{
          background: '#FAFAFA',
          borderColor: '#E4E4E7',
        }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            {...REVEAL}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          >
            <div className="max-w-xl">
              <Eyebrow tone="light">[ Existing Customers ]</Eyebrow>
              <h3
                className="text-xl md:text-2xl"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  letterSpacing: '-0.04em',
                  marginBottom: '0.5rem',
                  color: '#0A0A0A',
                }}
              >
                Already on Rising Star, Champion, or Elite?
              </h3>
              <p className="text-sm" style={{ color: '#52525B' }}>
                We'll walk you through the migration path that fits your usage —
                grandfather pricing or upgrade with founding-customer rates.
              </p>
            </div>
            <PrimaryCTA label="Talk Migration" variant="dark" />
          </motion.div>
        </div>
      </section>

      {/* ENTERPRISE CONTACT */}
      <section
        className="relative py-20 border-t overflow-hidden"
        style={{ background: '#0A0A0A', borderColor: '#262626' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div {...REVEAL}>
            <Eyebrow tone="dark">[ Enterprise ]</Eyebrow>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 7vw, 3rem)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 1,
                marginBottom: '1.5rem',
                color: '#FAFAFA',
              }}
            >
              Need 100,000+ calls/month, FDE support, or custom integrations?
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto mb-10"
              style={{ color: '#A3A3A3' }}
            >
              Enterprise scopes the team, integrations, SLA, and compliance
              posture to your environment.
            </p>
            <PrimaryCTA label="Talk to Sales" variant="light" />
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
