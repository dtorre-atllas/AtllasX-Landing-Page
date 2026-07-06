'use client';

import { motion } from 'motion/react';
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

type Vertical = {
  num: string;
  name: string;
  painPoints: string;
  solves: string[];
  companySize: string;
};

const VERTICALS: Vertical[] = [
  {
    num: '01',
    name: 'Insurance Agencies',
    painPoints:
      'Health, life, and P&C agencies depend on speed to quote. Every inbound that waits more than five minutes is a lost policy.',
    solves: [
      'Calls every inbound quote request in under 60 seconds',
      'Books with the right licensed producer by line of business',
      'Captures consent and logs disclosures for state audits',
    ],
    companySize: '[ 10–50 PERSON AGENCY ]',
  },
  {
    num: '02',
    name: 'Mortgage & Lending Brokers',
    painPoints:
      'Rate sensitivity makes mortgage leads expire in minutes. After-hours and weekend leads almost always go to the next broker.',
    solves: [
      '24/7 first-touch on every rate quote request',
      'Qualifies on loan amount, credit band, and timeline',
      'Books licensed loan officer to the right calendar',
    ],
    companySize: '[ 20–100 PERSON BROKERAGE ]',
  },
  {
    num: '03',
    name: 'Real Estate Brokerages',
    painPoints:
      'Lead aggregator costs are rising while pickup rates fall. Agents are double-booked or driving when leads come in.',
    solves: [
      'Immediate live response to portal leads',
      'Qualifies buyer/seller and price range',
      'Books showings or strategy calls directly with the agent',
    ],
    companySize: '[ 50–250 AGENT BROKERAGE ]',
  },
  {
    num: '04',
    name: 'Financial Services',
    painPoints:
      'Wealth advisory and capital advisory firms need consultative first calls but reps are in meetings all day.',
    solves: [
      'Books qualified discovery meetings with senior advisors',
      'Re-engages dormant relationships compliantly',
      'Captures suitability and disclosure logs',
    ],
    companySize: '[ 25–150 PERSON FIRM ]',
  },
  {
    num: '05',
    name: 'Home Services',
    painPoints:
      'Multi-location operators (HVAC, roofing, restoration) live or die by speed-to-lead but field staff can\'t answer the phone.',
    solves: [
      'Calls every inbound estimate request immediately',
      'Routes by service area and trade',
      'Books on the right crew\'s calendar',
    ],
    companySize: '[ MULTI-LOCATION OPERATOR ]',
  },
  {
    num: '06',
    name: 'Education & Coaching',
    painPoints:
      'High-ticket programs convert on the call, not the form. Slow follow-up tanks application rates.',
    solves: [
      'Calls applicants the moment the form submits',
      'Qualifies fit, budget, and intent',
      'Books enrollment / strategy call with admissions',
    ],
    companySize: '[ 5–50 PERSON PROGRAM ]',
  },
  {
    num: '07',
    name: 'B2B SaaS with PLG Inbound',
    painPoints:
      'PLG funnels generate sign-ups faster than AEs can chase them down. High-intent demo requests get buried.',
    solves: [
      'Tier and route inbound demo requests by ICP fit',
      'Hand off qualified to AEs on Slack instantly',
      'Filter low-intent sign-ups out of the queue',
    ],
    companySize: '[ SERIES A–C SAAS ]',
  },
  {
    num: '08',
    name: 'Other Regulated Industries',
    painPoints:
      'Healthcare-adjacent, legal, financial advisory, and other regulated verticals where compliance posture is a deal-breaker.',
    solves: [
      'Tight consent verification + state-level quiet hours',
      'HIPAA-pathway and SOC 2 posture on Enterprise',
      'Full audit logs for regulator response',
    ],
    companySize: '[ ENTERPRISE / REGULATED ]',
  },
];

function VerticalSection({
  vertical,
  variant,
}: {
  vertical: Vertical;
  variant: 'light' | 'subtle';
}) {
  const isSubtle = variant === 'subtle';
  return (
    <section
      className="relative py-24 border-t"
      style={{
        background: isSubtle ? '#FAFAFA' : '#FFFFFF',
        borderColor: '#E4E4E7',
        color: '#0A0A0A',
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <motion.div {...REVEAL} className="lg:col-span-5">
            <Eyebrow tone="light">[ Vertical {vertical.num} ]</Eyebrow>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
                marginBottom: '1.25rem',
              }}
            >
              {vertical.name}
            </h2>
            <p
              className="text-lg leading-relaxed"
              style={{ color: '#52525B' }}
            >
              {vertical.painPoints}
            </p>
          </motion.div>

          <motion.div
            {...REVEAL}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div
              className="border rounded-xl p-8"
              style={{
                borderColor: '#E4E4E7',
                background: isSubtle ? '#FFFFFF' : '#FAFAFA',
              }}
            >
              <div
                className="text-xs uppercase tracking-wider mb-5"
                style={{ fontFamily: 'var(--font-mono)', color: '#52525B' }}
              >
                How AtllasX solves it
              </div>
              <ul className="space-y-3">
                {vertical.solves.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-sm"
                    style={{ color: '#0A0A0A' }}
                  >
                    <span
                      className="mt-0.5"
                      style={{ color: '#16A34A', fontWeight: 700 }}
                    >
                      ✓
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function IndustriesPage() {
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
        <TerminalCanvas canvasId="industries-hero-terminal" />
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
            <Eyebrow tone="dark">[ Industries ]</Eyebrow>
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
              Built for the industries that live in their CRMs.
            </h1>
            <p
              className="text-lg md:text-xl max-w-2xl"
              style={{ color: '#A3A3A3' }}
            >
              Eight verticals where speed-to-lead and demo operations directly
              drive revenue.
            </p>
          </motion.div>
        </div>
      </section>

      {VERTICALS.map((vertical, idx) => (
        <VerticalSection
          key={vertical.num}
          vertical={vertical}
          variant={idx % 2 === 0 ? 'light' : 'subtle'}
        />
      ))}

      {/* FINAL CTA */}
      <section
        className="relative py-32 border-t overflow-hidden"
        style={{ background: '#0A0A0A', borderColor: '#262626' }}
      >
        <TerminalCanvas canvasId="industries-cta-terminal" />
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
            <Eyebrow tone="dark">[ Your Industry ]</Eyebrow>
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
              See how AtllasX runs in your vertical.
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto mb-10"
              style={{ color: '#A3A3A3' }}
            >
              30-minute demo on your CRM data. We'll show you the workflow
              tuned to your industry.
            </p>
            <PrimaryCTA />
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
