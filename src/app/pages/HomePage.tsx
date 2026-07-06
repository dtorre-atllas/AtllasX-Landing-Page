'use client';

import { lazy, Suspense } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { TopBanner } from '../components/TopBanner';
import { SiteNav } from '../components/SiteNav';
import { SiteFooter } from '../components/SiteFooter';
import { TerminalCanvas } from '../components/TerminalCanvas';
import { HearItForYourselfCTA } from '../components/HearItForYourselfCTA';
import { DEMO_CTA_URL, INTEGRATION_LOGOS } from '../lib/constants';

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

function PrimaryCTA({
  label = 'Book a Demo',
  variant = 'light',
}: {
  label?: string;
  variant?: 'light' | 'dark';
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

function Eyebrow({
  children,
  tone = 'dark',
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

export default function HomePage() {
  return (
    <div
      className="relative bg-white min-h-screen"
      style={{ fontFamily: 'var(--font-body)' }}
    >
      <TopBanner />
      <SiteNav />

      {/* HERO */}
      <section
        className="relative overflow-hidden flex flex-col justify-between"
        style={{
          background: '#0A0A0A',
          minHeight: '92vh',
          paddingTop: '8rem',
        }}
      >
        <TerminalCanvas canvasId="home-hero-terminal" />
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

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex-1 flex flex-col justify-center pt-8 pb-16">
          <motion.div {...REVEAL} className="flex justify-start mb-10">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] border"
              style={{
                borderColor: '#262626',
                background: 'rgba(17,17,17,0.6)',
                backdropFilter: 'blur(8px)',
                color: '#A3A3A3',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{
                  background: '#4ADE80',
                  animation: 'atx-pulse 1.5s ease-in-out infinite',
                }}
              />
              Live · Sub-60-second response
            </div>
          </motion.div>

          <motion.h1
            {...REVEAL}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-8 max-w-3xl"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              color: '#FAFAFA',
            }}
          >
            Inbound demand,
            <br />
            <span style={{ color: '#FFFFFF' }}>converted faster.</span>
          </motion.h1>

          <motion.div
            {...REVEAL}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl"
          >
            <p
              className="text-lg md:text-xl mb-10 leading-relaxed"
              style={{ color: '#A3A3A3' }}
            >
              AtllasX works every new CRM lead instantly: response,
              qualification, follow-up, demo booking, confirmation, and CRM
              updates handled end to end.
            </p>
            <PrimaryCTA />
          </motion.div>
        </div>
      </section>

      {/* LOGO MARQUEE */}
      <section
        className="relative border-t border-b"
        style={{
          background: '#0A0A0A',
          borderColor: '#262626',
          paddingTop: '2.5rem',
          paddingBottom: '2.5rem',
        }}
      >
        <div
          className="text-center mb-6"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.25em',
            color: '#6B7280',
          }}
        >
          Native integrations
        </div>
        <div
          className="overflow-hidden"
          style={{
            maskImage:
              'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
            WebkitMaskImage:
              'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
          }}
        >
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: '-50%' }}
            transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
            className="flex w-max gap-0"
          >
            {[...INTEGRATION_LOGOS, ...INTEGRATION_LOGOS].map((logo, idx) => (
              <div
                key={idx}
                className="px-14 py-3 whitespace-nowrap"
                style={{
                  fontWeight: 600,
                  fontSize: '22px',
                  letterSpacing: '-0.01em',
                  color: '#A3A3A3',
                }}
              >
                {logo}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* LIVE ACTIVITY FEED */}
      <section
        className="relative py-24 border-t"
        style={{
          background: '#0A0A0A',
          borderColor: '#262626',
          color: '#FAFAFA',
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <motion.div {...REVEAL} className="lg:col-span-4">
              <Eyebrow tone="dark">[ Live ]</Eyebrow>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 5vw, 2.75rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.04em',
                  lineHeight: 1.05,
                  marginBottom: '1.5rem',
                }}
              >
                What "60 seconds" actually looks like.
              </h2>
              <p
                className="text-lg leading-relaxed"
                style={{ color: '#A3A3A3' }}
              >
                Every inbound lead enters your CRM and triggers AtllasX. We
                call. We qualify. We book. We update. While your reps are still
                drinking their first coffee.
              </p>
            </motion.div>

            <motion.div
              {...REVEAL}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="lg:col-span-8"
            >
              <div
                className="border rounded-xl overflow-hidden"
                style={{
                  borderColor: '#262626',
                  background: '#111',
                  boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                }}
              >
                <div
                  className="flex items-center justify-between px-5 py-3 border-b"
                  style={{ borderColor: '#262626', background: '#161616' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: '#FF5F57' }}
                      />
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: '#FEBC2E' }}
                      />
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: '#28C840' }}
                      />
                    </div>
                    <span
                      className="ml-3 text-xs"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        color: '#6B7280',
                      }}
                    >
                      atllasx.app/workflows/live
                    </span>
                  </div>
                  <div
                    className="text-xs flex items-center gap-2"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: '#A3A3A3',
                    }}
                  >
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full"
                      style={{
                        background: '#4ADE80',
                        animation: 'atx-pulse 1.5s ease-in-out infinite',
                      }}
                    />
                    LIVE
                  </div>
                </div>

                <div>
                  {[
                    {
                      time: '14:42:17',
                      badge: 'Lead',
                      name: '[Customer Name]',
                      desc: 'Source: Meta Lead Form',
                      badgeColor: 'rgba(74,222,128,0.1)',
                      badgeBorderColor: 'rgba(74,222,128,0.2)',
                      badgeTextColor: '#4ADE80',
                    },
                    {
                      time: '14:42:46',
                      badge: 'Calling',
                      name: 'AtllasX connected · 29s',
                      desc: 'Outbound from +1 (415) 555-0142',
                      badgeColor: 'rgba(255,255,255,0.08)',
                      badgeBorderColor: 'rgba(255,255,255,0.2)',
                      badgeTextColor: 'white',
                    },
                    {
                      time: '14:46:03',
                      badge: 'Qualified',
                      name: 'ICP match · score 8.4',
                      desc: 'Consent verified · quiet hours OK',
                      badgeColor: 'rgba(74,222,128,0.1)',
                      badgeBorderColor: 'rgba(74,222,128,0.2)',
                      badgeTextColor: '#4ADE80',
                    },
                    {
                      time: '14:46:31',
                      badge: 'Booked',
                      name: 'Demo · Tue 10:00 AM',
                      desc: 'Calendar invite sent · CRM updated',
                      badgeColor: 'rgba(74,222,128,0.15)',
                      badgeBorderColor: 'rgba(74,222,128,0.3)',
                      badgeTextColor: '#4ADE80',
                    },
                  ].map((row, idx) => (
                    <div
                      key={idx}
                      className="px-4 py-3 border-b"
                      style={{ borderColor: '#1F1F1F' }}
                    >
                      <div className="flex items-center gap-3 mb-1">
                        <div
                          className="text-[10px] w-14"
                          style={{
                            fontFamily: 'var(--font-mono)',
                            color: '#6B7280',
                          }}
                        >
                          {row.time}
                        </div>
                        <span
                          className="px-1.5 py-0.5 text-[9px] uppercase tracking-wider rounded"
                          style={{
                            fontFamily: 'var(--font-mono)',
                            background: row.badgeColor,
                            color: row.badgeTextColor,
                            border: `1px solid ${row.badgeBorderColor}`,
                          }}
                        >
                          {row.badge}
                        </span>
                        <span className="text-sm" style={{ color: 'white' }}>
                          {row.name}
                        </span>
                      </div>
                      <div
                        className="ml-[68px] text-[11px]"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          color: '#6B7280',
                        }}
                      >
                        {row.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRY THE DEMO — low-friction "hear it for yourself" option alongside the HubSpot demo CTA */}
      <HearItForYourselfCTA />

      {/* COMPACT 3-PILLAR INTRO */}
      <section
        className="relative py-24 border-t"
        style={{
          background: '#FFFFFF',
          borderColor: '#E4E4E7',
          color: '#0A0A0A',
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...REVEAL} className="mb-12 max-w-3xl">
            <Eyebrow tone="light">[ The Workflow ]</Eyebrow>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
              }}
            >
              Three workflows. One platform. Built on top of your CRM.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                tag: '[ PILLAR 01 ]',
                title: 'Speed-to-Lead',
                body: 'Every inbound called in under 60 seconds — day, night, weekend, holiday.',
              },
              {
                tag: '[ PILLAR 02 ]',
                title: 'Demo Operations',
                body: 'Confirmations, reminders, and no-show recovery handled automatically.',
              },
              {
                tag: '[ PILLAR 03 ]',
                title: 'Pipeline Reactivation',
                body: 'Dormant leads re-engaged TCPA-compliantly to recover existing pipeline.',
              },
            ].map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                {...REVEAL}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="border rounded-xl p-8"
                style={{ borderColor: '#E4E4E7', background: '#FAFAFA' }}
              >
                <div
                  className="text-xs uppercase tracking-wider mb-4"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: '#52525B',
                  }}
                >
                  {pillar.tag}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    letterSpacing: '-0.04em',
                    marginBottom: '0.75rem',
                  }}
                >
                  {pillar.title}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#52525B' }}>
                  {pillar.body}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10">
            <Link
              to="/product"
              className="text-sm font-medium underline-offset-4 hover:underline"
              style={{ color: '#0A0A0A' }}
            >
              Learn how each pillar works →
            </Link>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <Suspense
        fallback={
          <div style={{ minHeight: '600px', background: '#0A0A0A' }} aria-hidden="true" />
        }
      >
        <PricingSection />
      </Suspense>

      {/* FINAL CTA */}
      <section
        className="relative py-32 border-t overflow-hidden"
        style={{ background: '#0A0A0A', borderColor: '#262626' }}
      >
        <TerminalCanvas canvasId="home-cta-terminal" />
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
            <Eyebrow tone="dark">[ Stop Losing Leads ]</Eyebrow>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 10vw, 4rem)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 0.95,
                marginBottom: '1.5rem',
                color: '#FAFAFA',
              }}
            >
              Stop letting inbound leads cool off.
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto mb-10"
              style={{ color: '#A3A3A3' }}
            >
              30-minute demo. We'll use your own CRM data to show you what
              happens when every inbound lead gets a 60-second response.
            </p>
            <PrimaryCTA />
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
