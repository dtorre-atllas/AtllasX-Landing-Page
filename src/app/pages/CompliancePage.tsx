'use client';

import { motion } from 'motion/react';
import {
  CheckCircle2,
  ShieldCheck,
  Clock,
  FileText,
  Lock,
  Users,
} from 'lucide-react';
import { TopBanner } from '../components/TopBanner';
import { SiteNav } from '../components/SiteNav';
import { SiteFooter } from '../components/SiteFooter';
import { TerminalCanvas } from '../components/TerminalCanvas';
import { DEMO_CTA_URL } from '../lib/constants';

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

function PrimaryCTA({ label = 'Book a Demo' }: { label?: string }) {
  return (
    <a
      href={DEMO_CTA_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold transition"
      style={{ background: '#F5F5F5', color: '#0A0A0A' }}
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

const PILLARS = [
  {
    icon: CheckCircle2,
    title: 'Consent verification at onboarding',
    body: 'We audit your consent posture before campaigns go live.',
  },
  {
    icon: ShieldCheck,
    title: 'Built-in opt-out logic',
    body: 'Every text and call honors DNC requests immediately.',
  },
  {
    icon: Clock,
    title: 'Quiet hours by zip code',
    body: "No calls outside legal calling windows per recipient's timezone.",
  },
  {
    icon: FileText,
    title: 'Audit logs on every interaction',
    body: 'Full transcripts, recordings, and timestamps stored 7 years.',
  },
  {
    icon: Lock,
    title: 'SOC 2 Type II in progress',
    body: 'Q4 2026 target. HIPAA pathway available on Enterprise.',
  },
  {
    icon: Users,
    title: 'Customer screening at sign-up',
    body: 'We refuse customers without proper consent posture.',
  },
];

const REFUSED = [
  'Purchased or scraped cold lists',
  'Outbound to leads who did not opt in to be contacted',
  'Cold outbound campaigns without documented prior consent',
  'Use cases that violate state-level outbound restrictions',
];

export default function CompliancePage() {
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
          minHeight: '55vh',
          paddingTop: '6rem',
          paddingBottom: '6rem',
        }}
      >
        <TerminalCanvas canvasId="compliance-hero-terminal" />
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
            <Eyebrow tone="dark">[ Compliance ]</Eyebrow>
            <h1
              className="mb-8 max-w-4xl"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 9vw, 5.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 0.95,
                color: '#FAFAFA',
              }}
            >
              TCPA-compliant by design.
            </h1>
            <p
              className="text-lg md:text-xl max-w-2xl"
              style={{ color: '#A3A3A3' }}
            >
              Most AI calling platforms pass the legal risk to you. We don't.
            </p>
          </motion.div>
        </div>
      </section>

      {/* THE 2024 FCC RULING */}
      <section
        className="relative py-24 border-t"
        style={{
          background: '#FFFFFF',
          borderColor: '#E4E4E7',
          color: '#0A0A0A',
        }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <motion.div {...REVEAL}>
            <Eyebrow tone="light">[ Regulatory Context ]</Eyebrow>
            <h2
              className="mb-6"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
              }}
            >
              The FCC's 2024 ruling rewrote the rules.
            </h2>
            <p
              className="text-lg leading-relaxed max-w-3xl"
              style={{ color: '#52525B' }}
            >
              In 2024 the FCC ruled that AI-generated voices are "artificial
              voices" under TCPA — meaning cold outbound to non-consented
              contacts can cost{' '}
              <span style={{ color: '#0A0A0A', fontWeight: 600 }}>
                $500–$1,500 per call
              </span>
              . We built AtllasX assuming this rule, not despite it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* COMPLIANT BY DESIGN — 6 CARDS */}
      <section
        className="relative py-24 border-t"
        style={{
          background: '#FFFFFF',
          borderColor: '#E4E4E7',
          color: '#0A0A0A',
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...REVEAL} className="mb-12 max-w-2xl">
            <Eyebrow tone="light">[ Compliant By Design ]</Eyebrow>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
              }}
            >
              What "compliant by design" actually means.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  {...REVEAL}
                  transition={{ duration: 0.8, delay: idx * 0.05 }}
                  className="border rounded-xl p-8"
                  style={{ borderColor: '#E4E4E7', background: '#FAFAFA' }}
                >
                  <Icon size={22} strokeWidth={1.5} color="#0A0A0A" />
                  <div
                    className="mt-4 mb-2 text-base font-semibold"
                    style={{ color: '#0A0A0A' }}
                  >
                    {pillar.title}
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: '#52525B' }}>
                    {pillar.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHAT WE REFUSE */}
      <section
        className="relative py-32 border-t overflow-hidden"
        style={{
          background: '#0A0A0A',
          borderColor: '#262626',
          color: '#FAFAFA',
        }}
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
        <div className="relative max-w-5xl mx-auto px-6">
          <motion.div {...REVEAL}>
            <Eyebrow tone="dark">[ What We Won't Do ]</Eyebrow>
            <h2
              className="mb-8 max-w-3xl"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 7vw, 3.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 0.98,
              }}
            >
              We refuse cold-outbound use cases.
            </h2>
            <p
              className="text-lg leading-relaxed max-w-3xl mb-10"
              style={{ color: '#A3A3A3' }}
            >
              This is positioning, not a feature gap. We turn down prospects
              whose contact lists don't have documented prior consent. The
              regulatory exposure isn't worth it for them or for us.
            </p>
            <ul className="space-y-3 max-w-2xl">
              {REFUSED.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-base border-b py-3"
                  style={{ borderColor: '#262626', color: '#A3A3A3' }}
                >
                  <span
                    className="mt-1"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: '#FBBF24',
                      fontWeight: 700,
                    }}
                  >
                    ×
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* AUDIT TRAIL */}
      <section
        className="relative py-24 border-t"
        style={{
          background: '#FFFFFF',
          borderColor: '#E4E4E7',
          color: '#0A0A0A',
        }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <motion.div {...REVEAL}>
            <Eyebrow tone="light">[ Audit Trail ]</Eyebrow>
            <h2
              className="mb-6"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
              }}
            >
              Every interaction, fully logged.
            </h2>
            <p
              className="text-lg leading-relaxed max-w-3xl mb-8"
              style={{ color: '#52525B' }}
            >
              Customers access full audit logs through the AtllasX dashboard —
              transcripts, recordings, consent evidence, opt-out events, and
              quiet-hour decisions are all timestamped and exportable.
            </p>
            <ul className="space-y-2 text-base" style={{ color: '#52525B' }}>
              <li>· Call transcripts and recordings stored 7 years</li>
              <li>· Consent capture timestamped per record</li>
              <li>· Opt-out and DNC events logged with origin</li>
              <li>· Quiet-hours decisions logged per attempt</li>
              <li>· Downloadable CSV / JSON exports</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* DPA / MSA */}
      <section
        className="relative py-24 border-t"
        style={{
          background: '#FFFFFF',
          borderColor: '#E4E4E7',
          color: '#0A0A0A',
        }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <motion.div {...REVEAL}>
            <Eyebrow tone="light">[ Agreements ]</Eyebrow>
            <h2
              className="mb-6"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
              }}
            >
              DPA and MSA, available at signup.
            </h2>
            <p
              className="text-lg leading-relaxed max-w-3xl mb-6"
              style={{ color: '#52525B' }}
            >
              A Data Processing Agreement (DPA) is available for GDPR-relevant
              customers. The Master Service Agreement (MSA) is signed at
              onboarding and covers data handling, security, retention, and
              audit rights.
            </p>
            <a
              href={DEMO_CTA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium underline-offset-4 hover:underline"
              style={{ color: '#0A0A0A' }}
            >
              Request DPA / MSA →
            </a>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        className="relative py-32 border-t overflow-hidden"
        style={{ background: '#0A0A0A', borderColor: '#262626' }}
      >
        <TerminalCanvas canvasId="compliance-cta-terminal" />
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
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div {...REVEAL}>
            <Eyebrow tone="dark">[ Compliant From Day One ]</Eyebrow>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 9vw, 4rem)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 0.95,
                marginBottom: '1.5rem',
                color: '#FAFAFA',
              }}
            >
              Built for revenue teams that can't afford a compliance misstep.
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto mb-10"
              style={{ color: '#A3A3A3' }}
            >
              We'll walk you through the consent audit on the demo call.
            </p>
            <PrimaryCTA />
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
