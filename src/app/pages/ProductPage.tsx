'use client';

import { motion } from 'motion/react';
import { TopBanner } from '../components/TopBanner';
import { SiteNav } from '../components/SiteNav';
import { SiteFooter } from '../components/SiteFooter';
import { TerminalCanvas } from '../components/TerminalCanvas';
import { ComparisonTable } from '../components/ComparisonTable';
import { HearItForYourselfCTA } from '../components/HearItForYourselfCTA';
import { DEMO_CTA_URL } from '../lib/constants';

const REVEAL = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.8 },
};

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

export default function ProductPage() {
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
          minHeight: '60vh',
          paddingTop: '6rem',
          paddingBottom: '6rem',
        }}
      >
        <TerminalCanvas canvasId="product-hero-terminal" />
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
            <Eyebrow tone="dark">[ Product ]</Eyebrow>
            <h1
              className="mb-8 max-w-4xl"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 0.95,
                color: '#FAFAFA',
              }}
            >
              How AtllasX handles inbound, end to end.
            </h1>
            <p
              className="text-lg md:text-xl max-w-2xl"
              style={{ color: '#A3A3A3' }}
            >
              Three workflows. One platform. Built on top of your existing CRM.
            </p>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS — 5 STEPS */}
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
            <Eyebrow tone="light">[ How It Works ]</Eyebrow>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 5vw, 2.25rem)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 1.1,
              }}
            >
              Five steps. Zero missed leads.
            </h2>
          </motion.div>

          <div
            className="grid grid-cols-2 md:grid-cols-5 border rounded-xl overflow-hidden"
            style={{ borderColor: '#E4E4E7' }}
          >
            {[
              {
                num: '01',
                title: 'Lead enters CRM',
                desc: 'Form fill, demo request, or sign-up — captured.',
              },
              {
                num: '02',
                title: 'AtllasX detects within seconds',
                desc: 'Triggered the moment the record lands.',
              },
              {
                num: '03',
                title: 'Calls and qualifies',
                desc: 'Against your ICP and qualification logic.',
              },
              {
                num: '04',
                title: 'Books demo on calendar',
                desc: "Direct to your rep's calendar with invite.",
              },
              {
                num: '05',
                title: 'Updates CRM and notifies rep',
                desc: 'Notes, stage, owner, transcript — synced.',
              },
            ].map((step, idx) => (
              <motion.div
                key={step.num}
                {...REVEAL}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="p-6 border-r border-b md:border-b-0"
                style={{ borderColor: '#E4E4E7' }}
              >
                <div
                  className="text-xs mb-4"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: '#71717A',
                  }}
                >
                  {step.num}
                </div>
                <div className="text-sm font-medium mb-1">{step.title}</div>
                <div className="text-xs" style={{ color: '#52525B' }}>
                  {step.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI STAT BLOCK */}
      <section
        className="relative py-16 border-t"
        style={{ background: '#FFFFFF', borderColor: '#E4E4E7' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
            {[
              { stat: '<60 sec', desc: 'First-touch response time' },
              { stat: '24/7', desc: 'Lead coverage' },
              { stat: '0', desc: 'Missed inbound leads' },
              { stat: 'Auto', desc: 'CRM updates on every call' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2rem, 8vw, 2.75rem)',
                    fontWeight: 800,
                    letterSpacing: '-0.04em',
                    marginBottom: '0.5rem',
                    color: '#0A0A0A',
                  }}
                >
                  {item.stat}
                </div>
                <div className="text-sm" style={{ color: '#52525B' }}>
                  {item.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PILLAR 1 — SPEED-TO-LEAD */}
      <section
        className="relative py-24 border-t"
        style={{
          background: '#FFFFFF',
          borderColor: '#E4E4E7',
          color: '#0A0A0A',
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...REVEAL} className="mb-16">
            <Eyebrow tone="light">[ Pillar 01 / 03 ]</Eyebrow>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 600,
                letterSpacing: '-0.04em',
                color: '#52525B',
              }}
            >
              Speed-to-Lead
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <motion.div {...REVEAL} className="lg:col-span-5">
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.04em',
                  lineHeight: 1.05,
                  marginBottom: '1.5rem',
                }}
              >
                Every inbound called in under 60 seconds.
              </h2>
              <p
                className="text-lg leading-relaxed mb-8"
                style={{ color: '#52525B' }}
              >
                When a lead fills out your form, requests a demo, or signs up —
                AtllasX calls them right away. Day or night, weekend or holiday.
                It introduces itself, qualifies the lead against your ICP, books
                a meeting, and pushes everything to your CRM.
              </p>
              <ul className="space-y-3 text-sm" style={{ color: '#52525B' }}>
                <li>· Sub-60-second first-touch response</li>
                <li>· 24/7 coverage across timezones and quiet hours</li>
                <li>· ICP-aligned qualification script</li>
              </ul>
            </motion.div>

            <motion.div
              {...REVEAL}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="lg:col-span-7"
            >
              <div
                className="border rounded-xl overflow-hidden"
                style={{ borderColor: '#E4E4E7', background: '#FAFAFA' }}
              >
                <div
                  className="px-5 py-3 border-b flex items-center justify-between"
                  style={{ borderColor: '#E4E4E7', background: '#F4F4F5' }}
                >
                  <span
                    className="text-xs"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: '#52525B',
                    }}
                  >
                    leads / inbound / contact_8472
                  </span>
                  <span
                    className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      background: 'rgba(22,163,74,0.1)',
                      color: '#16A34A',
                      border: '1px solid rgba(22,163,74,0.3)',
                    }}
                  >
                    Active
                  </span>
                </div>
                <div className="p-6 space-y-5">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        background: '#F4F4F5',
                        color: '#0A0A0A',
                      }}
                    >
                      CN
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold mb-0.5">
                        [Customer Name]
                      </div>
                      <div className="text-sm" style={{ color: '#52525B' }}>
                        [Title, Company]
                      </div>
                      <div
                        className="text-[11px] mt-1"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          color: '#52525B',
                        }}
                      >
                        Source: HubSpot · Demo form
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-2">
                    <div>
                      <div
                        className="text-[10px] uppercase tracking-wider mb-1"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          color: '#52525B',
                        }}
                      >
                        Arrived
                      </div>
                      <div className="text-sm">14:42:17</div>
                    </div>
                    <div>
                      <div
                        className="text-[10px] uppercase tracking-wider mb-1"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          color: '#52525B',
                        }}
                      >
                        First touch
                      </div>
                      <div className="text-sm" style={{ color: '#16A34A' }}>
                        +29s
                      </div>
                    </div>
                    <div>
                      <div
                        className="text-[10px] uppercase tracking-wider mb-1"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          color: '#52525B',
                        }}
                      >
                        Outcome
                      </div>
                      <div className="text-sm" style={{ color: '#16A34A' }}>
                        Booked
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PILLAR 2 — DEMO OPERATIONS */}
      <section
        className="relative py-24 border-t"
        style={{
          background: '#FFFFFF',
          borderColor: '#E4E4E7',
          color: '#0A0A0A',
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...REVEAL} className="mb-16">
            <Eyebrow tone="light">[ Pillar 02 / 03 ]</Eyebrow>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 600,
                letterSpacing: '-0.04em',
                color: '#52525B',
              }}
            >
              Demo Operations
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <motion.div
              {...REVEAL}
              className="lg:col-span-7 order-2 lg:order-1"
            >
              <div className="max-w-md mx-auto lg:mx-0">
                <div
                  className="border rounded-xl overflow-hidden"
                  style={{ borderColor: '#E4E4E7', background: '#FAFAFA' }}
                >
                  <div
                    className="px-5 py-4 border-b"
                    style={{ borderColor: '#E4E4E7', background: '#F4F4F5' }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-semibold text-sm">
                        AtllasX → [Customer]
                      </div>
                      <span
                        className="text-xs"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          color: '#52525B',
                        }}
                      >
                        SMS · Twilio
                      </span>
                    </div>
                    <div
                      className="text-xs"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        color: '#52525B',
                      }}
                    >
                      Demo confirmation thread
                    </div>
                  </div>
                  <div
                    className="p-5 space-y-3"
                    style={{ background: '#FFFFFF' }}
                  >
                    <div className="flex justify-start">
                      <div
                        className="max-w-[80%] border rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm"
                        style={{
                          borderColor: '#E4E4E7',
                          background: '#F4F4F5',
                        }}
                      >
                        Hi [Customer] — confirming your demo tomorrow at
                        10:00 AM ET. Reply{' '}
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontWeight: 600,
                          }}
                        >
                          YES
                        </span>{' '}
                        to confirm or{' '}
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontWeight: 600,
                          }}
                        >
                          RESCHEDULE
                        </span>
                        .
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div
                        className="max-w-[80%] rounded-2xl rounded-br-sm px-4 py-2.5 text-sm font-medium"
                        style={{ background: '#0A0A0A', color: 'white' }}
                      >
                        YES — see you then
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div
                        className="max-w-[80%] border rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm"
                        style={{
                          borderColor: '#E4E4E7',
                          background: '#F4F4F5',
                        }}
                      >
                        Quick reminder — your demo starts in 1 hour. Zoom link
                        on the way.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              {...REVEAL}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="lg:col-span-5 order-1 lg:order-2"
            >
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.04em',
                  lineHeight: 1.05,
                  marginBottom: '1.5rem',
                }}
              >
                Cuts no-show rates roughly in half.
              </h2>
              <p
                className="text-lg leading-relaxed mb-8"
                style={{ color: '#52525B' }}
              >
                Demo booked? AtllasX handles the rest. Confirmations 24 hours
                out, reminders one hour before, and no-show recovery the same
                day.
              </p>
              <ul className="space-y-3 text-sm" style={{ color: '#52525B' }}>
                <li>· Confirmation 24 hours out</li>
                <li>· 1-hour reminder with calendar link</li>
                <li>· Same-day no-show recovery flow</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PILLAR 3 — PIPELINE REACTIVATION */}
      <section
        className="relative py-24 border-t"
        style={{
          background: '#FFFFFF',
          borderColor: '#E4E4E7',
          color: '#0A0A0A',
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...REVEAL} className="mb-16">
            <Eyebrow tone="light">[ Pillar 03 / 03 ]</Eyebrow>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 600,
                letterSpacing: '-0.04em',
                color: '#52525B',
              }}
            >
              Pipeline Reactivation
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <motion.div {...REVEAL} className="lg:col-span-5">
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.04em',
                  lineHeight: 1.05,
                  marginBottom: '1.5rem',
                }}
              >
                Recovers 5–10% of dormant pipeline in 90 days.
              </h2>
              <p
                className="text-lg leading-relaxed mb-8"
                style={{ color: '#52525B' }}
              >
                Your CRM is full of dormant pipeline — old demo requests,
                expired trials, ghosted opportunities, lapsed customers. AtllasX
                systematically re-engages every existing relationship,
                TCPA-compliantly.
              </p>
              <ul className="space-y-3 text-sm" style={{ color: '#52525B' }}>
                <li>· Re-engagement only on existing consent</li>
                <li>· Re-qualifies against current ICP</li>
                <li>· Returns warmed leads to your reps</li>
              </ul>
            </motion.div>

            <motion.div
              {...REVEAL}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="lg:col-span-7"
            >
              <div
                className="border rounded-xl overflow-hidden"
                style={{ borderColor: '#E4E4E7', background: '#FAFAFA' }}
              >
                <div
                  className="px-5 py-3 border-b flex items-center justify-between"
                  style={{ borderColor: '#E4E4E7', background: '#F4F4F5' }}
                >
                  <span
                    className="text-xs"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: '#52525B',
                    }}
                  >
                    campaigns / reactivation / aged_inbound
                  </span>
                  <span
                    className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      borderColor: '#E4E4E7',
                      color: '#71717A',
                    }}
                  >
                    Day 47
                  </span>
                </div>

                <div className="p-6 space-y-4">
                  {[
                    {
                      label: 'Dormant pool',
                      value: '4,238',
                      percent: '100%',
                      width: '100%',
                      color: '#F4F4F5',
                      textColor: 'black',
                    },
                    {
                      label: 'Reached',
                      value: '3,001',
                      percent: '71%',
                      width: '71%',
                      color: 'rgba(0,0,0,0.1)',
                      textColor: 'black',
                    },
                    {
                      label: 'Engaged',
                      value: '1,348',
                      percent: '32%',
                      width: '32%',
                      color: 'rgba(0,0,0,0.18)',
                      textColor: 'black',
                    },
                    {
                      label: 'Re-qualified',
                      value: '280',
                      percent: '6.6%',
                      width: '6.6%',
                      color: 'rgba(22,163,74,0.25)',
                      textColor: '#16A34A',
                    },
                    {
                      label: 'Demo booked',
                      value: '71',
                      percent: '1.7%',
                      width: '6%',
                      color: 'rgba(22,163,74,0.5)',
                      textColor: '#16A34A',
                    },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center gap-4">
                      <div
                        className="text-xs w-32"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          color: '#52525B',
                        }}
                      >
                        {row.label}
                      </div>
                      <div
                        className="flex-1 h-8 relative overflow-hidden rounded border"
                        style={{ borderColor: '#E4E4E7' }}
                      >
                        <div
                          className="absolute inset-y-0 left-0"
                          style={{
                            width: row.width,
                            background: row.color,
                          }}
                        />
                        <div
                          className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 text-xs"
                          style={{ fontFamily: 'var(--font-mono)' }}
                        >
                          <span style={{ color: row.textColor }}>
                            {row.value}
                          </span>
                          <span style={{ color: row.textColor }}>
                            {row.percent}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROBLEM — 391% */}
      <section
        className="relative py-24 border-t"
        style={{
          background: '#FFFFFF',
          borderColor: '#E4E4E7',
          color: '#0A0A0A',
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-12 items-start">
            <motion.div {...REVEAL} className="md:col-span-5">
              <Eyebrow tone="light">[ The Problem ]</Eyebrow>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.04em',
                  lineHeight: 1.05,
                  marginBottom: '1.5rem',
                }}
              >
                Inbound leads expire faster than your reps can pick up the
                phone.
              </h2>
            </motion.div>

            <motion.div
              {...REVEAL}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="md:col-span-7"
            >
              <div
                className="border-t pt-8"
                style={{ borderColor: '#E4E4E7' }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(3rem, 10vw, 5rem)',
                    fontWeight: 800,
                    letterSpacing: '-0.04em',
                    marginBottom: '0.5rem',
                  }}
                >
                  391
                  <span
                    style={{ fontSize: '2rem', color: '#52525B' }}
                  >
                    %
                  </span>
                </div>
                <p
                  className="text-base leading-relaxed mb-4"
                  style={{ color: '#52525B' }}
                >
                  Higher conversion rate when leads are called within 1 minute
                  vs. 30 minutes.
                </p>
                <div
                  className="text-xs uppercase tracking-wider"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: '#52525B',
                  }}
                >
                  Source: Lead Response Management Study, MIT/InsideSales.
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* INTEGRATIONS */}
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
            <Eyebrow tone="light">[ Integrations ]</Eyebrow>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
              }}
            >
              Built for the CRM you already use.
            </h2>
          </motion.div>

          <div
            className="grid grid-cols-2 md:grid-cols-3 border rounded-xl overflow-hidden"
            style={{ borderColor: '#E4E4E7' }}
          >
            {[
              { name: 'HubSpot', desc: 'Native integration' },
              { name: 'Salesforce', desc: 'Bidirectional sync' },
              { name: 'GoHighLevel', desc: 'Native integration' },
              { name: 'Pipedrive', desc: 'Native integration' },
              { name: 'Zoho', desc: 'Native integration' },
              { name: 'Outreach', desc: 'Bidirectional sync' },
            ].map((crm, idx) => (
              <motion.div
                key={crm.name}
                {...REVEAL}
                transition={{ duration: 0.8, delay: idx * 0.05 }}
                className="p-8 border-r border-b"
                style={{ borderColor: '#E4E4E7' }}
              >
                <div className="font-semibold text-lg mb-1">{crm.name}</div>
                <div className="text-sm" style={{ color: '#52525B' }}>
                  {crm.desc}
                </div>
              </motion.div>
            ))}
          </div>

          <p className="mt-8 text-sm" style={{ color: '#52525B' }}>
            Webhooks for everything else.
          </p>
        </div>
      </section>

      {/* COMPETITIVE COMPARISON */}
      <ComparisonTable />

      {/* TRY THE DEMO (Hear it for yourself) */}
      <HearItForYourselfCTA />

      {/* FINAL CTA */}
      <section
        className="relative py-32 border-t overflow-hidden"
        style={{ background: '#0A0A0A', borderColor: '#262626' }}
      >
        <TerminalCanvas canvasId="product-cta-terminal" />
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
            <Eyebrow tone="dark">[ See It Run ]</Eyebrow>
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
              See AtllasX run on your data.
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto mb-10"
              style={{ color: '#A3A3A3' }}
            >
              30-minute proof-of-concept. We'll show you what changes when
              every inbound lead gets a 60-second response.
            </p>
            <PrimaryCTA />
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
