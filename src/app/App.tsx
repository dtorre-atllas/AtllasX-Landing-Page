import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Phone,
  PhoneIncoming,
  PhoneOutgoing,
  Check,
  Plus,
  Menu,
  X,
  ChevronDown,
  Play,
  Pause,
  Zap,
  ShieldCheck,
  Clock,
  Mail,
  Instagram,
  Linkedin,
  Gauge,
  Users,
} from "lucide-react";
import { Intercom } from "./components/Intercom";

/* ============================== Constants ============================== */

const DEMO_URL = "https://calendly.com/nicole-atllas/atllas-demo-call";
const GET_STARTED_URL = "https://app.atllasx.com/dashboard/ai-calling/create";
const LOGIN_URL = "https://app.atllasx.com/authentication/login";
const DOCS_URL = "https://docs.atllasx.com";
const APPSTORE_URL = "https://apps.apple.com/us/app/atllas-x-ai-calling-assistant/id6749676193";
const PHONE = "(415) 969-4084";

const CUSTOMERS: [string, string][] = [
  ["Seiretsu Wireless", "seiretsu.io"],
  ["5th Avenue Leads", "5thavenueleads.com"],
  ["Ascenta Media", "ascentamedia.net"],
  ["Stabili-Teeth", "stabili-teeth.com"],
  ["Cloudience", "cloudience.com"],
  ["Securitas", "securitasinc.com"],
  ["Act!", "act.com"],
  ["Wendt Partners", "wendtpartners.com"],
  ["Sunrise Premiums", "sunrisepremiums.com"],
  ["AvantStay", "avantstay.com"],
  ["Bright Spot HS", "brightspoths.com"],
  ["Moon Logistics & Services", "moonlogisticsllc.com"],
  ["DigitalTreehouse", "digitaltreehouse.com"],
  ["Farmers Insurance", "farmersagent.com"],
  ["Akciz", "akciz.com"],
  ["Progressive Maryland", "progressivemaryland.org"],
  ["Safe Security Homes", "safesecurity.homes"],
  ["Onboard Home Buyers", "onboardhomebuyers.com"],
  ["Bonelli Systems", "bonellisystems.com"],
  ["Illumination Consulting", "illuminationconsulting.com"],
  ["MORE Surface Care", "moresurfacecare.com"],
  ["Option Funding", "optionfunding.net"],
];

const SOLUTIONS = [
  {
    id: "speed",
    tag: "Speed to Lead",
    icon: Zap,
    title: "Call new leads while their intent is still high.",
    body: "Connect a lead source and AtllasX automatically calls each new lead, qualifies the opportunity, and works toward your chosen objective.",
    caps: ["Calls within ~60 seconds", "Personalized conversation", "Qualification", "Appointment booking", "Booking confirmation", "Human transfer"],
  },
  {
    id: "outbound",
    tag: "Outbound Calling",
    icon: PhoneOutgoing,
    title: "Turn existing contact lists into conversations.",
    body: "Upload a contact list, define the objective, and let AtllasX consistently work through the campaign.",
    caps: ["Contact-list uploads", "Custom campaign objective", "Objection handling", "Qualification", "Appointment setting", "Campaign outcomes", "Call transcripts"],
  },
  {
    id: "receptionist",
    tag: "AI Receptionist",
    icon: PhoneIncoming,
    title: "Answer every incoming call around the clock.",
    body: "AtllasX answers questions, captures caller information, qualifies opportunities, books appointments, and routes calls according to your rules.",
    caps: ["24/7 answering", "Business-specific knowledge", "Call qualification", "Appointment booking", "Human transfer", "Call transcription", "Configurable routing"],
  },
];

const TIMELINE: [string, string, string][] = [
  ["00:00", "New lead submitted", "Facebook Lead Ads"],
  ["00:08", "AtllasX calls", "Outbound dial placed"],
  ["00:42", "Lead qualified", "Matches your criteria"],
  ["02:14", "Meeting booked", "Added to calendar"],
  ["02:15", "Confirmation sent", "Booking text delivered"],
];

const CALLS = [
  {
    tab: "New Lead",
    objective: "Qualify a new inbound lead and book a meeting",
    duration: "2:15",
    transcript: [
      ["agent", "Hi, this is the AtllasX assistant calling about the request you just submitted. Is now an okay time?"],
      ["caller", "Sure, that was fast."],
      ["agent", "We move quick. Quick question so I point you the right way — inbound, outbound, or both?"],
      ["caller", "Mostly inbound, we miss a lot of calls."],
      ["agent", "Got it. I can put you with our team this week — does Thursday at 2pm work?"],
      ["caller", "Thursday works."],
    ],
    outcome: "Meeting booked — confirmation text sent",
  },
  {
    tab: "Outbound Campaign",
    objective: "Work a contact list toward booked demos",
    duration: "1:48",
    transcript: [
      ["agent", "Hi, this is AtllasX. We help teams place and answer calls with AI phone agents. Do you have thirty seconds?"],
      ["caller", "What's this about exactly?"],
      ["agent", "We make sure every lead gets called fast and every inbound call gets answered. Want a short walkthrough?"],
      ["caller", "Yeah, send me something."],
      ["agent", "Done — I'll book it and text you the details now."],
    ],
    outcome: "Demo set — added to campaign outcomes",
  },
  {
    tab: "Incoming Call",
    objective: "Answer, qualify, and route an inbound caller",
    duration: "1:22",
    transcript: [
      ["agent", "Thanks for calling — you've reached the AtllasX AI assistant. How can I help?"],
      ["caller", "Do you handle after-hours calls?"],
      ["agent", "We do, 24/7. I can answer questions, book you in, or connect you to a person. Which would you prefer?"],
      ["caller", "Connect me to someone if they're around."],
      ["agent", "One moment — transferring you to the team now."],
    ],
    outcome: "Transferred to human — transcript saved",
  },
];

const HOW: [string, string][] = [
  ["Add the opportunity", "Connect a new lead source, upload an existing contact list, or route an incoming number."],
  ["Configure the agent", "Define its objective, knowledge, voice, questions, qualification criteria, and handoff rules."],
  ["Let AtllasX handle the call", "The agent conducts the conversation, responds naturally, qualifies the lead, and works toward the objective."],
  ["Review the outcome", "See the call, transcript, notes, tags, qualification result, lead score, and pipeline stage inside AtllasX."],
];

const WORKFLOWS: string[][] = [
  ["New lead", "Immediate call", "Qualification", "Booking text"],
  ["Canceled customer", "Webhook trigger", "Winback call", "Outcome logged"],
  ["Booked demo", "Confirmation text", "Reminder workflow", "Show rate"],
  ["Warm lead", "Custom score", "Human handoff", "Notes saved"],
];

const INTEGRATIONS: { group: string; items: { name: string; soon?: boolean }[] }[] = [
  { group: "Lead sources", items: [{ name: "Facebook Lead Ads" }, { name: "Website forms" }, { name: "Connected lead sources" }] },
  { group: "Automation", items: [{ name: "Zapier" }, { name: "Webhooks" }, { name: "Custom triggers" }] },
  { group: "Scheduling", items: [{ name: "Calendar booking" }, { name: "Confirmation texts" }] },
  { group: "Communication", items: [{ name: "Calling" }, { name: "SMS" }, { name: "Email follow-up (custom)" }] },
  { group: "Coming soon", items: [{ name: "Native HubSpot integration", soon: true }] },
];

const WHY: [string, any][] = [
  ["Contact leads while interest is still high", Clock],
  ["Answer calls outside business hours", PhoneIncoming],
  ["Maintain consistent qualification", Check],
  ["Handle simultaneous call volume", Users],
  ["Configure agents around different objectives", Gauge],
  ["Prevent inbound calls from going to voicemail", Phone],
];

const COMPARE: string[][] = [
  ["Speed to first call", "Minutes to hours", "Depends on staffing", "~60 seconds"],
  ["Inbound answering", "Business hours", "Limited", "24/7"],
  ["Concurrent calls", "One per rep", "Limited", "Many at once"],
  ["Personalization", "Varies by rep", "Scripted", "Per-business agent"],
  ["Qualification", "Inconsistent", "Basic", "Consistent"],
  ["Appointment booking", "Manual", "Limited", "Built in"],
  ["Call transcription", "Rare", "Sometimes", "Every call"],
  ["Custom workflows", "Manual", "Limited", "By request"],
  ["Human transfer", "Yes", "Sometimes", "Configurable"],
];

const PRICING = [
  { name: "Champion", who: "Growing teams getting started", price: "$499", calls: "3,000 calls", per: "~$0.17 per call", feat: false, points: ["AI voice clones", "Advanced analytics", "Zapier integrations", "AI Receptionist add-on", "Live video support (USA-based)"], note: "14-day money-back guarantee" },
  { name: "Elite", who: "Teams scaling call volume", price: "$799", calls: "5,000 calls", per: "~$0.16 per call · save 6%", feat: true, points: ["Everything in Champion", "White-glove onboarding", "Custom integrations", "Engineering team consultation"], note: "Most popular" },
  { name: "Platinum", who: "High-volume operations", price: "$1,499", calls: "10,000 calls", per: "~$0.15 per call · save 13%", feat: false, points: ["Everything in Elite", "Dedicated success manager", "Custom script optimization", "Highest self-serve volume"], note: "Best value" },
  { name: "Enterprise", who: "Custom volume & support", price: "Custom", calls: "10,000+ calls", per: "Volume discounts", feat: false, points: ["Custom pricing", "Dedicated support", "Custom workflows & integrations", "Tailored onboarding"], note: "Talk to sales" },
];

const FAQ_ITEMS: [string, string][] = [
  ["How quickly can AtllasX call a new lead?", "When a lead arrives from a connected source, AtllasX typically calls within approximately 60 seconds — day or night."],
  ["Can I upload an existing contact list?", "Yes. Upload a contact list, define your campaign objective, and AtllasX works through it, handling objections and booking appointments."],
  ["Can AtllasX answer inbound calls?", "Yes. The AI Receptionist answers incoming calls 24/7, responds using your business knowledge, qualifies callers, books appointments, and routes to a human when needed."],
  ["Can I define what the agent should accomplish?", "Yes. You set the objective, knowledge, voice, questions, qualification criteria, and handoff rules for each agent."],
  ["Can AtllasX qualify leads and book appointments?", "Yes. Agents qualify against your criteria, handle objections, and book appointments, with a booking confirmation text."],
  ["Can it transfer callers to a human?", "Yes. Agents can transfer or route a live caller to your team based on your rules."],
  ["What appears in the AtllasX dashboard?", "Call status, transcript, notes, tags, qualification result, lead score, pipeline stage, appointment status, and campaign performance — organized inside AtllasX."],
  ["Can AtllasX send SMS or email follow-up?", "Booking-related texts are supported natively. SMS and email follow-up sequences are available as custom workflows configured around your process."],
  ["Does AtllasX integrate with HubSpot?", "A native HubSpot integration for the HubSpot App Marketplace is currently in development. Native HubSpot integration coming soon."],
  ["How long does setup take?", "You can launch your first AI phone agent in as little as five minutes. Custom workflows and integrations may require additional onboarding."],
  ["What do custom workflows include?", "By request, AtllasX can be configured for SMS and email follow-up, cancellation-recovery campaigns, warm-lead scoring, Zapier and webhook automations, and custom integrations."],
  ["Are calls transcribed?", "Yes. Calls are transcribed and the outcome is recorded inside the AtllasX dashboard."],
];

/* ============================== Hooks ============================== */

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const cb = () => setReduced(m.matches);
    m.addEventListener?.("change", cb);
    return () => m.removeEventListener?.("change", cb);
  }, []);
  return reduced;
}

/* ============================== Small UI ============================== */

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span className="ax-eyebrow" style={light ? { color: "rgba(255,255,255,.55)" } : undefined}>
      <span className="d" /> {children}
    </span>
  );
}

function Wave({ active, light = false }: { active: boolean; light?: boolean }) {
  const bars = [10, 18, 28, 16, 34, 22, 40, 26, 14, 30, 20, 38, 24, 12, 32, 18];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3, height: 40 }} aria-hidden="true">
      {bars.map((h, i) => (
        <span key={i} style={{ width: 3, borderRadius: 3, height: h, transformOrigin: "center", background: light ? "rgba(255,255,255,.55)" : "var(--ax-accent)", opacity: active ? 1 : 0.35, animation: active ? `axwave 1s ease-in-out ${i * 0.06}s infinite alternate` : "none" }} />
      ))}
    </div>
  );
}

/* ============================== Sections ============================== */

function Announcement() {
  return (
    <div style={{ background: "var(--ax-ink)", color: "rgba(255,255,255,.78)", textAlign: "center", fontSize: 12.5, padding: "9px 16px" }}>
      <a href="#integrations" style={{ color: "inherit" }}>
        Native HubSpot integration coming soon <ArrowRight style={{ width: 13, height: 13, display: "inline", verticalAlign: "-2px" }} />
      </a>
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [solOpen, setSolOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links: [string, string][] = [["Product", "#solutions"], ["Integrations", "#integrations"], ["Pricing", "#pricing"], ["Compliance", "#security"]];
  const sol: [string, string][] = [["Speed to Lead", "#solutions"], ["Outbound Calling", "#solutions"], ["AI Receptionist", "#solutions"], ["Custom Workflows", "#workflows"]];
  const linkColor = scrolled ? "var(--ax-ink)" : "#ffffff";

  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 50, background: scrolled ? "#ffffff" : "transparent", backdropFilter: scrolled ? "blur(16px)" : "none", borderBottom: scrolled ? "1px solid var(--ax-line)" : "1px solid transparent", transition: "background .28s ease, border-color .28s ease" }}>
      <div className="ax-wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, gap: 28 }}>
        <a href="#top" style={{ fontFamily: "var(--ax-head)", fontWeight: 700, fontSize: 20, letterSpacing: "-.03em", color: scrolled ? "var(--ax-ink)" : "#fff" }}>
          Atllas<span style={{ color: "var(--ax-accent)" }}>X</span>
        </a>

        <div className="ax-navlinks" style={{ display: "flex", alignItems: "center", gap: 26, fontSize: 13.5, color: linkColor }}>
          <div style={{ position: "relative" }} onMouseEnter={() => setSolOpen(true)} onMouseLeave={() => setSolOpen(false)}>
            <button style={{ display: "inline-flex", alignItems: "center", gap: 5, color: "inherit", background: "none", border: "none", font: "inherit", cursor: "pointer" }} aria-expanded={solOpen} aria-haspopup="true">
              Solutions <ChevronDown style={{ width: 14, height: 14 }} />
            </button>
            {solOpen && (
              <div style={{ position: "absolute", top: "100%", left: -16, paddingTop: 10 }}>
                <div style={{ background: "var(--ax-paper)", border: "1px solid var(--ax-line)", borderRadius: 12, padding: 8, minWidth: 210, boxShadow: "0 24px 60px -28px rgba(0,0,0,.35)" }}>
                  {sol.map(([l, h]) => (
                    <a key={l} href={h} onClick={() => setSolOpen(false)} style={{ display: "block", padding: "9px 12px", borderRadius: 8, fontSize: 13.5, color: "var(--ax-ink-2)" }}>{l}</a>
                  ))}
                </div>
              </div>
            )}
          </div>
          {links.map(([l, h]) => (<a key={l} href={h} style={{ color: "inherit" }}>{l}</a>))}
          <a href={DOCS_URL} target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>Docs</a>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <a href={LOGIN_URL} className="ax-navlinks" style={{ fontSize: 13.5, color: linkColor }}>Log in</a>
          <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="ax-btn ax-btn-primary" style={{ padding: "9px 16px" }}>Book a demo</a>
          <button className="ax-navtoggle" onClick={() => setOpen(!open)} aria-label="Toggle menu" style={{ display: "none", background: "none", border: "none", color: scrolled ? "var(--ax-ink)" : "#fff", cursor: "pointer" }}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div style={{ background: "var(--ax-paper)", borderTop: "1px solid var(--ax-line)", padding: "14px 28px", display: "flex", flexDirection: "column", gap: 6 }}>
          {[...sol, ...links].map(([l, h]) => (<a key={l + h} href={h} onClick={() => setOpen(false)} style={{ padding: "9px 0", color: "var(--ax-ink-2)", fontSize: 15 }}>{l}</a>))}
          <a href={DOCS_URL} target="_blank" rel="noopener noreferrer" style={{ padding: "9px 0", color: "var(--ax-ink-2)", fontSize: 15 }}>Docs</a>
          <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="ax-btn ax-btn-primary" style={{ marginTop: 6, justifyContent: "center" }}>Book a demo</a>
        </div>
      )}
    </nav>
  );
}

function HeroViz() {
  return (
    <div className="ax-hviz" aria-hidden="true">
      <div className="ax-viz" id="ax-viz">
        <div className="ax-coreglow" />
        <div className="ax-pulse" /><div className="ax-pulse b" /><div className="ax-pulse c" />
        <div className="ax-orbit o3"><div className="ax-spin"><i className="ax-node" /></div><div style={{ position: "absolute", inset: 0, transform: "rotateZ(140deg)" }}><i className="ax-node s" /></div></div>
        <div className="ax-orbit o2"><div className="ax-spin"><i className="ax-node" /></div><div style={{ position: "absolute", inset: 0, transform: "rotateZ(210deg)" }}><i className="ax-node s" /></div></div>
        <div className="ax-orbit o1"><div className="ax-spin"><i className="ax-node" /></div><div style={{ position: "absolute", inset: 0, transform: "rotateZ(80deg)" }}><i className="ax-node s" /></div></div>
        <div className="ax-core" />
      </div>
    </div>
  );
}

function Hero() {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const hero = document.getElementById("top");
    const viz = document.getElementById("ax-viz");
    if (!hero || !viz) return;
    const onMove = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      viz.style.transform = `translate(${(x * 16).toFixed(1)}px, ${(y * 16).toFixed(1)}px)`;
    };
    const onLeave = () => { viz.style.transform = ""; };
    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    return () => { hero.removeEventListener("mousemove", onMove); hero.removeEventListener("mouseleave", onLeave); };
  }, [reduced]);

  return (
    <section id="top" style={{ position: "relative", overflow: "hidden", background: "var(--ax-ink)", color: "#fff", marginTop: -64 }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#15161B 0%,#101115 45%,#0B0C0F 100%)" }} />
      <video autoPlay muted loop playsInline preload="auto" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}>
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(90deg, rgba(8,9,12,.86) 0%, rgba(8,9,12,.58) 45%, rgba(8,9,12,.3) 100%), linear-gradient(180deg, rgba(8,9,12,.4) 0%, transparent 28%, rgba(8,9,12,.55) 100%)" }} />
      <div className="ax-grain" style={{ position: "absolute", zIndex: 1 }} />

      <div className="ax-wrap" style={{ position: "relative", zIndex: 2, paddingTop: 150, paddingBottom: 110 }}>
        <Eyebrow light>AI phone agents for revenue teams</Eyebrow>
        <h1 style={{ fontFamily: "var(--ax-head)", fontWeight: 800, letterSpacing: "-.035em", lineHeight: 0.98, fontSize: "clamp(3.2rem, 8vw, 6.4rem)", margin: "22px 0 0", maxWidth: "15ch" }}>
          Every conversation.<br />Handled.
        </h1>
        <p style={{ color: "rgba(255,255,255,.78)", fontSize: "clamp(1.05rem,1.6vw,1.3rem)", maxWidth: "46ch", marginTop: 24, lineHeight: 1.5 }}>
          AtllasX deploys personalized AI phone agents that call new leads, run outbound campaigns, and answer every incoming call.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 30, flexWrap: "wrap", alignItems: "center" }}>
          <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="ax-btn ax-btn-primary" style={{ padding: "13px 22px" }}>Book a demo <ArrowRight style={{ width: 16, height: 16 }} /></a>
          <a href="#hear" className="ax-btn ax-btn-ghost" style={{ borderColor: "rgba(255,255,255,.28)", color: "#fff", padding: "13px 20px" }}><Play style={{ width: 15, height: 15 }} /> Hear AtllasX</a>
        </div>
        <p style={{ color: "rgba(255,255,255,.45)", fontSize: 12.5, marginTop: 16, fontFamily: "var(--ax-mono)" }}>Set up in as little as five minutes. Custom workflows available.</p>
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", marginTop: 30, color: "rgba(255,255,255,.55)", fontSize: 13 }}>
          <span><b style={{ color: "#fff" }}>300K+</b> calls handled</span><span style={{ color: "rgba(255,255,255,.25)" }}>·</span>
          <span><b style={{ color: "#fff" }}>Under 60s</b> first response</span><span style={{ color: "rgba(255,255,255,.25)" }}>·</span>
          <span><b style={{ color: "#fff" }}>24/7</b> availability</span>
        </div>
      </div>

      <div style={{ position: "relative", zIndex: 2, borderTop: "1px solid rgba(255,255,255,.10)", padding: "16px 0 22px" }}>
        <p className="ax-mono" style={{ textAlign: "center", fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.4)", marginBottom: 14 }}>Trusted by teams that run on conversations</p>
        <div style={{ overflow: "hidden", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)", maskImage: "linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)" }}>
          <div className="ax-marq" style={{ display: "flex", width: "max-content", alignItems: "center" }}>
            {[...CUSTOMERS, ...CUSTOMERS].map(([name, dom], i) => (
              <a key={name + i} href={`https://${dom}`} target="_blank" rel="noopener noreferrer" style={{ whiteSpace: "nowrap", padding: "0 22px", fontFamily: "var(--ax-head)", fontWeight: 600, fontSize: "1.05rem", letterSpacing: "-.02em", color: "rgba(255,255,255,.45)" }}>{name}</a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SpeedTimeline() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(TIMELINE.length - 1);
  useEffect(() => {
    if (reduced) { setActive(TIMELINE.length - 1); return; }
    const t = setInterval(() => setActive((a) => (a + 1) % TIMELINE.length), 1400);
    return () => clearInterval(t);
  }, [reduced]);

  return (
    <section className="ax-dark" style={{ padding: "96px 0" }}>
      <div className="ax-wrap">
        <Eyebrow light>Product proof</Eyebrow>
        <h2 style={{ fontSize: "clamp(1.9rem,3.8vw,3rem)", marginTop: 16, maxWidth: "18ch" }}>From new lead to live conversation in seconds.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 0, marginTop: 44, maxWidth: 720 }}>
          {TIMELINE.map(([t, label, sub], i) => {
            const on = i <= active;
            return (
              <div key={t} style={{ display: "grid", gridTemplateColumns: "76px 18px 1fr", alignItems: "center", gap: 16, padding: "14px 0", borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,.08)" }}>
                <span className="ax-mono" style={{ fontSize: 13, color: on ? "#fff" : "rgba(255,255,255,.4)" }}>{t}</span>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: i === active ? "var(--ax-live)" : on ? "rgba(255,255,255,.5)" : "rgba(255,255,255,.2)", boxShadow: i === active ? "0 0 0 4px rgba(15,169,104,.22)" : "none", transition: ".3s" }} />
                <span>
                  <span style={{ color: on ? "#fff" : "rgba(255,255,255,.45)", fontWeight: 500, fontSize: 15 }}>{label}</span>
                  <span style={{ display: "block", color: "rgba(255,255,255,.4)", fontSize: 12.5, fontFamily: "var(--ax-mono)", marginTop: 2 }}>{sub}</span>
                </span>
              </div>
            );
          })}
        </div>
        <p style={{ color: "rgba(255,255,255,.5)", fontSize: 13.5, marginTop: 22, fontFamily: "var(--ax-mono)" }}>Outcomes recorded inside the AtllasX dashboard.</p>
      </div>
    </section>
  );
}

function ProductMock({ which }: { which: string }) {
  const base: React.CSSProperties = { background: "#fff", border: "1px solid var(--ax-line)", borderRadius: 14, overflow: "hidden", boxShadow: "0 30px 70px -45px rgba(11,11,30,.35)" };
  const head = (label: string) => (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "var(--ax-paper-2)", borderBottom: "1px solid var(--ax-line)" }}>
      <span className="ax-mono" style={{ fontSize: 11, color: "var(--ax-ink-3)" }}>{label}</span>
      <span className="ax-mono" style={{ fontSize: 10.5, color: "var(--ax-live)", background: "rgba(15,169,104,.1)", padding: "3px 8px", borderRadius: 5 }}>● LIVE</span>
    </div>
  );
  if (which === "speed") {
    return (
      <div style={base}>
        {head("leads / inbound / new")}
        <div style={{ padding: 18 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", paddingBottom: 14, borderBottom: "1px solid var(--ax-line)" }}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "var(--ax-paper-2)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, color: "var(--ax-ink-2)" }}>JM</div>
            <div><div style={{ fontWeight: 600 }}>New lead · Facebook Lead Ads</div><div className="ax-mono" style={{ fontSize: 11, color: "var(--ax-ink-3)", marginTop: 2 }}>arrived 14:42:17 · first touch +8s</div></div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 0" }}><Wave active /><span className="ax-mono" style={{ fontSize: 12, color: "var(--ax-ink-2)" }}>calling…</span></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            {[["Status", "Connected"], ["Qualified", "ICP match"], ["Outcome", "Booked"]].map(([k, v]) => (
              <div key={k}><div className="ax-mono" style={{ fontSize: 9.5, textTransform: "uppercase", color: "var(--ax-ink-3)" }}>{k}</div><div style={{ fontSize: 14, fontWeight: 600, color: k === "Outcome" ? "var(--ax-live)" : "var(--ax-ink)", marginTop: 3 }}>{v}</div></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (which === "outbound") {
    return (
      <div style={base}>
        {head("campaigns / outbound / this-week")}
        <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 12 }}>
          {[["Calls placed", "1,284"], ["Contacts reached", "847"], ["Meetings booked", "63"], ["Transcripts", "1,284"]].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="ax-mono" style={{ fontSize: 11, textTransform: "uppercase", color: "var(--ax-ink-3)" }}>{k}</span>
              <span className="ax-mono" style={{ fontWeight: 600 }}>{v}</span>
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 54, marginTop: 4 }}>
            {[40, 62, 50, 78, 70, 88, 96].map((h, i) => (<div key={i} style={{ flex: 1, height: `${h}%`, background: "var(--ax-accent)", opacity: 0.85, borderRadius: 3 }} />))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div style={base}>
      {head("receptionist / inbound / live")}
      <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 9 }}>
        {[["Jessica Martinez", "Asked about pricing — booked a callback", "BOOKED", "var(--ax-live)"], ["David Park", "Existing customer — routed to support", "TRANSFER", "var(--ax-accent)"], ["Emily Chen", "General question — answered from knowledge base", "ANSWERED", "var(--ax-ink-3)"]].map(([n, d, t, c]) => (
          <div key={n} style={{ border: "1px solid var(--ax-line)", borderRadius: 10, padding: "11px 13px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
              <div><div style={{ fontWeight: 600, fontSize: 13 }}>{n}</div><div style={{ color: "var(--ax-ink-3)", fontSize: 12, marginTop: 2 }}>{d}</div></div>
              <span className="ax-mono" style={{ fontSize: 9.5, color: c, alignSelf: "flex-start", whiteSpace: "nowrap" }}>{t}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ThreeSolutions() {
  const [sel, setSel] = useState(0);
  const s = SOLUTIONS[sel];
  return (
    <section id="solutions" style={{ padding: "96px 0", borderTop: "1px solid var(--ax-line)" }}>
      <div className="ax-wrap">
        <Eyebrow>The platform</Eyebrow>
        <h2 style={{ fontSize: "clamp(1.9rem,3.8vw,3rem)", marginTop: 16 }}>Three ways to put AtllasX to work.</h2>
        <p style={{ color: "var(--ax-ink-2)", fontSize: "1.05rem", marginTop: 14, maxWidth: "60ch" }}>One personalized AI phone-agent platform supports three calling motions.</p>
        <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 48, marginTop: 48, alignItems: "center" }} className="ax-sol-grid">
          <div>
            {SOLUTIONS.map((sol, i) => {
              const on = i === sel;
              const Icon = sol.icon;
              return (
                <button key={sol.id} onClick={() => setSel(i)} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "20px 0", borderTop: i === 0 ? "none" : "1px solid var(--ax-line)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ width: 32, height: 32, borderRadius: 8, background: on ? "var(--ax-accent-soft)" : "var(--ax-paper-2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon style={{ width: 16, height: 16, color: on ? "var(--ax-accent)" : "var(--ax-ink-3)" }} />
                    </span>
                    <span className="ax-mono" style={{ fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: on ? "var(--ax-accent)" : "var(--ax-ink-3)" }}>{sol.tag}</span>
                  </div>
                  <h3 style={{ fontSize: "1.35rem", marginTop: 12, color: on ? "var(--ax-ink)" : "var(--ax-ink-3)", fontWeight: 700, letterSpacing: "-.02em", transition: ".2s" }}>{sol.title}</h3>
                  {on && (
                    <div>
                      <p style={{ color: "var(--ax-ink-2)", fontSize: ".97rem", marginTop: 10, lineHeight: 1.55 }}>{sol.body}</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
                        {sol.caps.map((c) => (<span key={c} style={{ fontSize: 12.5, color: "var(--ax-ink-2)", border: "1px solid var(--ax-line)", borderRadius: 20, padding: "5px 11px" }}>{c}</span>))}
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          <motion.div key={s.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <ProductMock which={s.id} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HearTheDifference() {
  const reduced = useReducedMotion();
  const [tab, setTab] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [line, setLine] = useState(0);
  const call = CALLS[tab];

  useEffect(() => { setPlaying(false); setLine(0); }, [tab]);
  useEffect(() => {
    if (!playing || reduced) return;
    const t = setInterval(() => {
      setLine((l) => { if (l >= call.transcript.length - 1) { setPlaying(false); return l; } return l + 1; });
    }, 1600);
    return () => clearInterval(t);
  }, [playing, reduced, call.transcript.length]);

  return (
    <section id="hear" className="ax-dark" style={{ padding: "96px 0" }}>
      <div className="ax-wrap">
        <Eyebrow light>Hear the product</Eyebrow>
        <h2 style={{ fontSize: "clamp(1.9rem,3.8vw,3rem)", marginTop: 16 }}>Hear the difference.</h2>
        <p style={{ color: "rgba(255,255,255,.6)", marginTop: 14, fontSize: "1.02rem" }}>A product demonstration of how an AtllasX agent runs a call.</p>

        <div style={{ display: "flex", gap: 8, marginTop: 30, flexWrap: "wrap" }}>
          {CALLS.map((c, i) => (
            <button key={c.tab} onClick={() => setTab(i)} className="ax-mono" style={{ fontSize: 12, letterSpacing: ".04em", padding: "8px 14px", borderRadius: 8, cursor: "pointer", border: "1px solid " + (i === tab ? "rgba(255,255,255,.5)" : "rgba(255,255,255,.16)"), background: i === tab ? "rgba(255,255,255,.08)" : "transparent", color: i === tab ? "#fff" : "rgba(255,255,255,.6)" }}>{c.tab}</button>
          ))}
        </div>

        <div style={{ marginTop: 22, border: "1px solid rgba(255,255,255,.12)", borderRadius: 16, padding: 22, background: "rgba(255,255,255,.02)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
            <button onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause" : "Play"} style={{ width: 46, height: 46, borderRadius: "50%", background: "#fff", color: "var(--ax-ink)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flex: "none" }}>
              {playing ? <Pause style={{ width: 18, height: 18 }} /> : <Play style={{ width: 18, height: 18, marginLeft: 2 }} />}
            </button>
            <Wave active={playing} light />
            <span className="ax-mono" style={{ fontSize: 12.5, color: "rgba(255,255,255,.6)", marginLeft: "auto" }}>{call.duration}</span>
          </div>
          <div className="ax-mono" style={{ fontSize: 11, color: "rgba(255,255,255,.45)", marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,.1)" }}>OBJECTIVE — {call.objective}</div>
          <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 12 }}>
            {call.transcript.map(([who, text], i) => {
              const shown = i <= line;
              const isAgent = who === "agent";
              return (
                <div key={i} style={{ opacity: shown ? 1 : 0.28, transition: "opacity .3s" }}>
                  <div className="ax-mono" style={{ fontSize: 10, letterSpacing: ".08em", marginBottom: 4, color: isAgent ? "#7e9bff" : "var(--ax-live)" }}>{isAgent ? "AI AGENT" : "CALLER"}</div>
                  <div style={{ color: "rgba(255,255,255,.85)", fontSize: 14.5, lineHeight: 1.5, maxWidth: "62ch" }}>{text}</div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 18, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,.1)", display: "flex", alignItems: "center", gap: 8, color: "var(--ax-live)", fontWeight: 600, fontSize: 13.5 }}>
            <Check style={{ width: 16, height: 16 }} /> {call.outcome}
          </div>
        </div>
        <p style={{ color: "rgba(255,255,255,.4)", fontSize: 12, marginTop: 14, fontFamily: "var(--ax-mono)" }}>Product demonstration. Callers are speaking with an AI agent.</p>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section style={{ padding: "96px 0", borderTop: "1px solid var(--ax-line)" }}>
      <div className="ax-wrap">
        <Eyebrow>How it works</Eyebrow>
        <h2 style={{ fontSize: "clamp(1.9rem,3.8vw,3rem)", marginTop: 16 }}>One platform. Built around your objective.</h2>
        <div className="ax-how" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0, marginTop: 46, borderTop: "1px solid var(--ax-line)" }}>
          {HOW.map(([t, d], i) => (
            <div key={t} style={{ padding: "28px 24px 28px 0", borderRight: i < 3 ? "1px solid var(--ax-line)" : "none", paddingLeft: i === 0 ? 0 : 24 }}>
              <div className="ax-mono" style={{ fontSize: 12, color: "var(--ax-accent)" }}>{String(i + 1).padStart(2, "0")}</div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 600, margin: "12px 0 8px", letterSpacing: "-.01em" }}>{t}</h3>
              <p style={{ color: "var(--ax-ink-2)", fontSize: ".9rem", lineHeight: 1.55 }}>{d}</p>
            </div>
          ))}
        </div>
        <p style={{ color: "var(--ax-ink-3)", fontSize: 13, marginTop: 22, fontFamily: "var(--ax-mono)" }}>Outcomes are organized inside the AtllasX dashboard.</p>
      </div>
    </section>
  );
}

function CustomWorkflows() {
  return (
    <section id="workflows" style={{ padding: "96px 0", background: "var(--ax-paper-2)", borderTop: "1px solid var(--ax-line)" }}>
      <div className="ax-wrap">
        <Eyebrow>Custom workflows</Eyebrow>
        <h2 style={{ fontSize: "clamp(1.9rem,3.8vw,3rem)", marginTop: 16 }}>Built around your workflow.</h2>
        <p style={{ color: "var(--ax-ink-2)", fontSize: "1.05rem", marginTop: 14, maxWidth: "62ch" }}>Go beyond individual calls with custom workflows configured around your sales and customer-engagement process.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 40 }}>
          {WORKFLOWS.map((steps) => (
            <div key={steps[0]} style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", background: "var(--ax-paper)", border: "1px solid var(--ax-line)", borderRadius: 12, padding: "16px 18px" }}>
              {steps.map((st, i) => (
                <div key={st} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 13.5, color: i === 0 ? "var(--ax-ink)" : "var(--ax-ink-2)", fontWeight: i === 0 ? 600 : 400 }}>{st}</span>
                  {i < steps.length - 1 && <ArrowRight style={{ width: 15, height: 15, color: "var(--ax-accent)" }} />}
                </div>
              ))}
            </div>
          ))}
        </div>
        <p className="ax-mono" style={{ display: "inline-block", marginTop: 22, fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--ax-accent)", background: "var(--ax-accent-soft)", padding: "6px 11px", borderRadius: 6 }}>Custom workflows available by request</p>
        <p style={{ color: "var(--ax-ink-3)", fontSize: 13, marginTop: 14 }}>Custom workflows and integrations may require additional onboarding.</p>
      </div>
    </section>
  );
}

function Integrations() {
  return (
    <section id="integrations" style={{ padding: "96px 0", borderTop: "1px solid var(--ax-line)" }}>
      <div className="ax-wrap">
        <Eyebrow>Integrations</Eyebrow>
        <h2 style={{ fontSize: "clamp(1.9rem,3.8vw,3rem)", marginTop: 16 }}>Connect the systems that send you leads.</h2>
        <p style={{ color: "var(--ax-ink-2)", fontSize: "1.05rem", marginTop: 14, maxWidth: "60ch" }}>Trigger AtllasX calls from your existing lead workflow.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: 20, marginTop: 44 }}>
          {INTEGRATIONS.map((g) => (
            <div key={g.group} style={{ border: "1px solid var(--ax-line)", borderRadius: 14, padding: 22 }}>
              <div className="ax-mono" style={{ fontSize: 10.5, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ax-ink-3)", marginBottom: 14 }}>{g.group}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {g.items.map((it) => (
                  <div key={it.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                    <span style={{ fontSize: 14, color: "var(--ax-ink)" }}>{it.name}</span>
                    {it.soon && <span className="ax-mono" style={{ fontSize: 9.5, color: "var(--ax-accent)", background: "var(--ax-accent-soft)", padding: "3px 7px", borderRadius: 5 }}>SOON</span>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyAtllasX() {
  return (
    <section className="ax-dark" style={{ padding: "96px 0" }}>
      <div className="ax-wrap">
        <Eyebrow light>Why AtllasX</Eyebrow>
        <h2 style={{ fontSize: "clamp(1.9rem,3.8vw,3rem)", marginTop: 16, maxWidth: "20ch" }}>Built to keep conversations from falling through.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 0, marginTop: 44, borderTop: "1px solid rgba(255,255,255,.1)" }}>
          {WHY.map(([t, Icon], i) => (
            <div key={t as string} style={{ display: "flex", gap: 14, padding: "24px 24px 24px 0", borderBottom: "1px solid rgba(255,255,255,.1)" }}>
              <Icon style={{ width: 20, height: 20, color: "var(--ax-accent)", flex: "none", marginTop: 2 }} />
              <span style={{ color: "rgba(255,255,255,.85)", fontSize: 15.5, lineHeight: 1.5 }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Comparison() {
  return (
    <section style={{ padding: "96px 0", borderTop: "1px solid var(--ax-line)", background: "var(--ax-paper-2)" }}>
      <div className="ax-wrap">
        <Eyebrow>Operating models</Eyebrow>
        <h2 style={{ fontSize: "clamp(1.9rem,3.8vw,3rem)", marginTop: 16 }}>How the calling gets done.</h2>
        <div style={{ overflowX: "auto", marginTop: 40 }}>
          <table style={{ width: "100%", minWidth: 640, borderCollapse: "collapse", background: "var(--ax-paper)", border: "1px solid var(--ax-line)", borderRadius: 16, overflow: "hidden" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "15px 20px", fontSize: 13, fontWeight: 500, color: "var(--ax-ink-2)", borderBottom: "1px solid var(--ax-line)" }}>Capability</th>
                <th style={{ padding: "15px 20px", fontSize: 13, fontWeight: 500, color: "var(--ax-ink-2)", borderBottom: "1px solid var(--ax-line)" }}>Manual calling</th>
                <th style={{ padding: "15px 20px", fontSize: 13, fontWeight: 500, color: "var(--ax-ink-2)", borderBottom: "1px solid var(--ax-line)" }}>Basic dialer</th>
                <th style={{ padding: "15px 20px", fontSize: 13, fontWeight: 600, color: "var(--ax-ink)", borderBottom: "1px solid var(--ax-line)", background: "var(--ax-accent-soft)" }}>AtllasX</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((row, i) => (
                <tr key={row[0]}>
                  <td style={{ padding: "14px 20px", fontSize: 14, borderBottom: i < COMPARE.length - 1 ? "1px solid var(--ax-line)" : "none" }}>{row[0]}</td>
                  <td style={{ padding: "14px 20px", fontSize: 13, textAlign: "center", color: "var(--ax-ink-3)", fontFamily: "var(--ax-mono)", borderBottom: i < COMPARE.length - 1 ? "1px solid var(--ax-line)" : "none" }}>{row[1]}</td>
                  <td style={{ padding: "14px 20px", fontSize: 13, textAlign: "center", color: "var(--ax-ink-3)", fontFamily: "var(--ax-mono)", borderBottom: i < COMPARE.length - 1 ? "1px solid var(--ax-line)" : "none" }}>{row[2]}</td>
                  <td style={{ padding: "14px 20px", fontSize: 13, textAlign: "center", color: "var(--ax-ink)", fontWeight: 600, fontFamily: "var(--ax-mono)", background: "var(--ax-accent-soft)", borderBottom: i < COMPARE.length - 1 ? "1px solid var(--ax-line)" : "none" }}>{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Security() {
  const items: [string, string][] = [
    ["Call-recording controls", "Configure how calls are recorded and retained."],
    ["Consent & do-not-call", "Set consent rules and respect do-not-call handling."],
    ["Access controls", "Manage who can configure agents and view calls."],
    ["Transcripts & auditability", "Every call is transcribed and reviewable inside AtllasX."],
  ];
  return (
    <section id="security" style={{ padding: "96px 0", borderTop: "1px solid var(--ax-line)" }}>
      <div className="ax-wrap">
        <Eyebrow>Trust</Eyebrow>
        <h2 style={{ fontSize: "clamp(1.9rem,3.8vw,3rem)", marginTop: 16 }}>Built for calls you can stand behind.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 20, marginTop: 44 }}>
          {items.map(([t, d]) => (
            <div key={t} style={{ border: "1px solid var(--ax-line)", borderRadius: 14, padding: 22 }}>
              <ShieldCheck style={{ width: 20, height: 20, color: "var(--ax-accent)" }} />
              <h3 style={{ fontSize: "1.02rem", fontWeight: 600, margin: "12px 0 7px" }}>{t}</h3>
              <p style={{ color: "var(--ax-ink-2)", fontSize: ".9rem", lineHeight: 1.55 }}>{d}</p>
            </div>
          ))}
        </div>
        <a href="https://app.atllas.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 26, color: "var(--ax-accent)", fontSize: 14, fontWeight: 500 }}>
          Review privacy &amp; data handling <ArrowUpRight style={{ width: 15, height: 15 }} />
        </a>
      </div>
    </section>
  );
}

function Proof() {
  return (
    <section style={{ padding: "96px 0", borderTop: "1px solid var(--ax-line)", background: "var(--ax-paper-2)" }}>
      <div className="ax-wrap">
        <Eyebrow>Customer proof</Eyebrow>
        <h2 style={{ fontSize: "clamp(1.9rem,3.8vw,3rem)", marginTop: 16, maxWidth: "22ch" }}>How AtllasX calls every new Meta lead within ~60 seconds.</h2>
        <div className="ax-proof-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 40, marginTop: 40, alignItems: "center" }}>
          <div>
            <p style={{ color: "var(--ax-ink-2)", fontSize: "1.05rem", lineHeight: 1.6 }}>
              This is AtllasX&rsquo;s own operating workflow. New leads from Facebook Lead Ads flow straight into AtllasX, which places a personalized call within approximately 60 seconds, qualifies the lead, books a meeting, and records the outcome — so no inbound interest sits waiting.
            </p>
            <div style={{ display: "flex", gap: 36, marginTop: 28, flexWrap: "wrap" }}>
              {[["~60s", "to first call"], ["24/7", "coverage"], ["Every call", "transcribed"]].map(([n, l]) => (
                <div key={l}><div style={{ fontFamily: "var(--ax-head)", fontWeight: 800, fontSize: 26, letterSpacing: "-.02em" }}>{n}</div><div style={{ color: "var(--ax-ink-3)", fontSize: 12.5, marginTop: 4 }}>{l}</div></div>
              ))}
            </div>
            <p className="ax-mono" style={{ fontSize: 11, color: "var(--ax-ink-3)", marginTop: 24, textTransform: "uppercase", letterSpacing: ".08em" }}>AtllasX internal workflow</p>
          </div>
          <ProductMock which="speed" />
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" style={{ padding: "96px 0", borderTop: "1px solid var(--ax-line)" }}>
      <div className="ax-wrap">
        <Eyebrow>Pricing</Eyebrow>
        <h2 style={{ fontSize: "clamp(1.9rem,3.8vw,3rem)", marginTop: 16 }}>Plans that scale with your call volume.</h2>
        <p style={{ color: "var(--ax-ink-2)", fontSize: "1.05rem", marginTop: 14, maxWidth: "60ch" }}>Every plan includes a monthly call allotment you can use anytime, any day.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 18, marginTop: 46 }}>
          {PRICING.map((p) => {
            const dark = p.feat;
            return (
              <div key={p.name} style={{ display: "flex", flexDirection: "column", background: dark ? "var(--ax-ink)" : "var(--ax-paper)", color: dark ? "#fff" : "var(--ax-ink)", border: "1px solid " + (dark ? "var(--ax-ink)" : "var(--ax-line)"), borderRadius: 18, padding: 26 }}>
                {p.note && <div className="ax-mono" style={{ fontSize: 9.5, letterSpacing: ".06em", textTransform: "uppercase", color: dark ? "#fff" : "var(--ax-ink-3)", marginBottom: 10 }}>{p.note}</div>}
                <div className="ax-mono" style={{ fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: dark ? "rgba(255,255,255,.6)" : "var(--ax-ink-2)" }}>{p.name}</div>
                <div style={{ fontSize: 12.5, color: dark ? "rgba(255,255,255,.55)" : "var(--ax-ink-3)", marginTop: 4 }}>{p.who}</div>
                <div style={{ fontFamily: "var(--ax-head)", fontWeight: 800, fontSize: "2.3rem", letterSpacing: "-.02em", marginTop: 16 }}>{p.price}{p.price !== "Custom" && <span style={{ fontSize: "1rem", fontWeight: 500, color: dark ? "rgba(255,255,255,.5)" : "var(--ax-ink-3)" }}> /mo</span>}</div>
                <div style={{ margin: "16px 0", padding: "14px 0", borderTop: "1px solid " + (dark ? "rgba(255,255,255,.14)" : "var(--ax-line)"), borderBottom: "1px solid " + (dark ? "rgba(255,255,255,.14)" : "var(--ax-line)") }}>
                  <div style={{ fontFamily: "var(--ax-head)", fontWeight: 700, fontSize: "1.25rem" }}>{p.calls}</div>
                  <div style={{ fontSize: 12, color: dark ? "rgba(255,255,255,.5)" : "var(--ax-ink-3)", marginTop: 2 }}>{p.per}</div>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: "4px 0 22px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                  {p.points.map((pt) => (<li key={pt} style={{ display: "flex", gap: 9, fontSize: 13.5, color: dark ? "rgba(255,255,255,.8)" : "var(--ax-ink-2)" }}><Check style={{ width: 16, height: 16, color: "var(--ax-live)", flex: "none", marginTop: 1 }} /> {pt}</li>))}
                </ul>
                <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className={"ax-btn " + (dark ? "ax-btn-primary" : "ax-btn-ghost")} style={{ justifyContent: "center" }}>Book a demo</a>
                {p.price !== "Custom" && <a href={GET_STARTED_URL} style={{ textAlign: "center", marginTop: 10, fontSize: 13, color: dark ? "rgba(255,255,255,.6)" : "var(--ax-ink-3)" }}>Get started</a>}
              </div>
            );
          })}
        </div>
        <p style={{ color: "var(--ax-ink-3)", fontSize: 13, marginTop: 22 }}>Initial setup can take approximately five minutes. Custom workflows and integrations may require additional onboarding.</p>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section style={{ padding: "96px 0", borderTop: "1px solid var(--ax-line)" }}>
      <div className="ax-wrap" style={{ maxWidth: 820 }}>
        <Eyebrow>FAQ</Eyebrow>
        <h2 style={{ fontSize: "clamp(1.9rem,3.8vw,3rem)", marginTop: 16 }}>Questions, answered.</h2>
        <div style={{ marginTop: 36, borderTop: "1px solid var(--ax-line)" }}>
          {FAQ_ITEMS.map(([q, a], i) => {
            const on = open === i;
            return (
              <div key={q} style={{ borderBottom: "1px solid var(--ax-line)" }}>
                <button onClick={() => setOpen(on ? null : i)} aria-expanded={on} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, padding: "20px 4px", background: "none", border: "none", cursor: "pointer", textAlign: "left", font: "inherit", fontWeight: 500, fontSize: "1.02rem", color: "var(--ax-ink)" }}>
                  {q}
                  <Plus style={{ width: 18, height: 18, color: "var(--ax-ink-3)", transform: on ? "rotate(45deg)" : "none", transition: ".2s", flex: "none" }} />
                </button>
                {on && <p style={{ color: "var(--ax-ink-2)", fontSize: ".95rem", lineHeight: 1.6, padding: "0 4px 22px", maxWidth: "70ch" }}>{a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="ax-dark" style={{ padding: "120px 0", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(50% 60% at 50% 0%, rgba(31,91,255,.18), transparent 70%)" }} />
      <div className="ax-wrap" style={{ position: "relative", zIndex: 2 }}>
        <h2 style={{ fontSize: "clamp(2.3rem,5.4vw,4rem)", letterSpacing: "-.03em", maxWidth: "18ch", margin: "0 auto" }}>Your next lead should not have to wait.</h2>
        <p style={{ color: "rgba(255,255,255,.62)", fontSize: "1.1rem", margin: "22px auto 34px", maxWidth: "46ch" }}>See how AtllasX would call, qualify, and book leads for your business.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="ax-btn ax-btn-primary" style={{ padding: "13px 24px" }}>Book a demo <ArrowRight style={{ width: 16, height: 16 }} /></a>
          <a href="#hear" className="ax-btn ax-btn-ghost" style={{ borderColor: "rgba(255,255,255,.28)", color: "#fff", padding: "13px 22px" }}><Play style={{ width: 15, height: 15 }} /> Hear AtllasX</a>
        </div>
        <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", marginTop: 30, color: "rgba(255,255,255,.45)", fontSize: 12.5 }}>
          {["Set up in as little as five minutes", "Cancel anytime", "Custom workflows available"].map((t) => (
            <span key={t} style={{ display: "inline-flex", gap: 6, alignItems: "center" }}><Check style={{ width: 14, height: 14 }} /> {t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols: [string, [string, string][]][] = [
    ["Product", [["Speed to Lead", "#solutions"], ["Outbound Calling", "#solutions"], ["AI Receptionist", "#solutions"], ["Custom Workflows", "#workflows"], ["Pricing", "#pricing"]]],
    ["Resources", [["Documentation", DOCS_URL], ["Compliance", "#security"], ["Contact", "mailto:info@atllas.com"]]],
    ["Company", [["Privacy", "https://app.atllas.com/legal/privacy-policy"], ["Terms", "https://app.atllas.com/legal/terms-of-service"], ["Accessibility", "mailto:info@atllas.com"], ["Contact", "mailto:info@atllas.com"]]],
  ];
  return (
    <footer style={{ background: "#070809", color: "#fff", padding: "58px 0 30px" }}>
      <div className="ax-wrap">
        <div className="ax-foot" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr 1fr", gap: 40 }}>
          <div>
            <div style={{ fontFamily: "var(--ax-head)", fontWeight: 700, fontSize: 20, letterSpacing: "-.03em" }}>Atllas<span style={{ color: "var(--ax-accent)" }}>X</span></div>
            <p style={{ color: "rgba(255,255,255,.45)", fontSize: 13, lineHeight: 1.6, marginTop: 14, maxWidth: "32ch" }}>AI phone agents for inbound and outbound calls.</p>
            <a href="tel:+14159694084" style={{ color: "rgba(255,255,255,.6)", fontSize: 13.5, marginTop: 16, display: "inline-flex", gap: 7, alignItems: "center" }}><Phone style={{ width: 14, height: 14 }} /> {PHONE}</a>
          </div>
          {cols.map(([h, items]) => (
            <div key={h}>
              <div className="ax-mono" style={{ fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.4)", marginBottom: 16 }}>{h}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {items.map(([l, href]) => (<a key={l} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" style={{ color: "rgba(255,255,255,.6)", fontSize: 13.5 }}>{l}</a>))}
              </div>
            </div>
          ))}
          <div>
            <div className="ax-mono" style={{ fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.4)", marginBottom: 16 }}>Connect</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              <a href="https://www.linkedin.com/company/atllas-inc/" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,.6)", fontSize: 13.5, display: "inline-flex", gap: 8, alignItems: "center" }}><Linkedin style={{ width: 14, height: 14 }} /> LinkedIn</a>
              <a href="https://www.instagram.com/atllasai" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,.6)", fontSize: 13.5, display: "inline-flex", gap: 8, alignItems: "center" }}><Instagram style={{ width: 14, height: 14 }} /> Instagram</a>
              <a href="mailto:info@atllas.com" style={{ color: "rgba(255,255,255,.6)", fontSize: 13.5, display: "inline-flex", gap: 8, alignItems: "center" }}><Mail style={{ width: 14, height: 14 }} /> Email</a>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 44, paddingTop: 22, borderTop: "1px solid rgba(255,255,255,.1)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, color: "rgba(255,255,255,.4)", fontSize: 12 }}>
          <span>© Atllas Inc. {new Date().getFullYear()}</span>
          <span className="ax-mono">AI phone agents for inbound and outbound calls</span>
        </div>
      </div>
    </footer>
  );
}

/* ============================== App ============================== */

export default function App() {
  return (
    <div className="ax" style={{ background: "var(--ax-paper)", minHeight: "100vh", position: "relative" }}>
      <style>{`
        @keyframes axmarq { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .ax-marq { animation: axmarq 64s linear infinite; }
        .ax-marq:hover { animation-play-state: paused; }
        @keyframes axwave { from { transform: scaleY(.45); } to { transform: scaleY(1); } }
        .ax-hgrid{position:relative;z-index:2;display:grid;grid-template-columns:1.02fr .98fr;gap:24px;align-items:center;padding-top:104px;padding-bottom:76px}
        .ax-hviz{position:relative;height:560px;display:flex;align-items:center;justify-content:center}
        .ax-viz{position:relative;width:520px;height:520px;perspective:1300px;transform-style:preserve-3d;transition:transform .25s ease-out}
        .ax-coreglow{position:absolute;top:50%;left:50%;width:380px;height:380px;margin:-190px 0 0 -190px;border-radius:50%;background:radial-gradient(circle,rgba(31,91,255,.30),transparent 62%);z-index:1}
        .ax-core{position:absolute;top:50%;left:50%;width:118px;height:118px;margin:-59px 0 0 -59px;border-radius:50%;background:radial-gradient(circle at 38% 32%,#fbfdff,#d4dce8 38%,#9aa6bb 66%,#566073);box-shadow:inset 0 0 0 1px rgba(255,255,255,.3),0 24px 60px -12px rgba(31,91,255,.55);z-index:4}
        .ax-core::after{content:"";position:absolute;inset:26px;border-radius:50%;border:1px solid rgba(31,91,255,.5);box-shadow:inset 0 0 0 6px rgba(31,91,255,.07)}
        .ax-pulse{position:absolute;top:50%;left:50%;width:118px;height:118px;margin:-59px 0 0 -59px;border-radius:50%;border:1px solid rgba(120,150,255,.5);z-index:2;animation:axpulse 3.6s ease-out infinite}
        .ax-pulse.b{animation-delay:1.2s}.ax-pulse.c{animation-delay:2.4s}
        @keyframes axpulse{0%{transform:scale(1);opacity:.5}100%{transform:scale(3.6);opacity:0}}
        .ax-orbit{position:absolute;top:50%;left:50%;border:1px solid rgba(170,185,210,.18);border-radius:50%;transform-style:preserve-3d}
        .ax-orbit.o1{width:300px;height:300px;margin:-150px 0 0 -150px;transform:rotateX(72deg)}
        .ax-orbit.o2{width:420px;height:420px;margin:-210px 0 0 -210px;transform:rotateX(68deg) rotateY(18deg);border-color:rgba(31,91,255,.2)}
        .ax-orbit.o3{width:520px;height:520px;margin:-260px 0 0 -260px;transform:rotateX(76deg) rotateY(-14deg);border-color:rgba(170,185,210,.12)}
        .ax-spin{position:absolute;inset:0;transform-style:preserve-3d}
        .ax-orbit.o1 .ax-spin{animation:axspin 16s linear infinite}
        .ax-orbit.o2 .ax-spin{animation:axspin 24s linear infinite reverse}
        .ax-orbit.o3 .ax-spin{animation:axspin 32s linear infinite}
        @keyframes axspin{to{transform:rotateZ(360deg)}}
        .ax-node{position:absolute;top:-6px;left:50%;width:12px;height:12px;margin-left:-6px;border-radius:50%;background:#2f6bff;box-shadow:0 0 0 4px rgba(31,91,255,.16),0 0 16px 3px rgba(31,91,255,.7)}
        .ax-node.s{width:7px;height:7px;top:-3.5px;margin-left:-3.5px;background:#cdd6e6;box-shadow:0 0 8px rgba(205,214,230,.55)}
        @media (prefers-reduced-motion: reduce){.ax-pulse,.ax-spin{animation:none}}
        @media (max-width:900px){.ax-hgrid{grid-template-columns:1fr;gap:8px;padding-top:64px;padding-bottom:56px}.ax-hviz{height:360px}.ax-viz{width:330px;height:330px}.ax-orbit.o3{width:330px;height:330px;margin:-165px 0 0 -165px}.ax-orbit.o2{width:270px;height:270px;margin:-135px 0 0 -135px}.ax-orbit.o1{width:190px;height:190px;margin:-95px 0 0 -95px}}
        @media (prefers-reduced-motion: reduce) { .ax-marq { animation: none; } }
        @media (max-width: 900px) {
          .ax-sol-grid { grid-template-columns: 1fr !important; }
          .ax-proof-grid { grid-template-columns: 1fr !important; }
          .ax-how { grid-template-columns: 1fr 1fr !important; }
          .ax-foot { grid-template-columns: 1fr 1fr !important; }
          .ax-navlinks { display: none !important; }
          .ax-navtoggle { display: inline-flex !important; }
        }
        @media (max-width: 560px) {
          .ax-how { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Nav />
      <main>
        <Hero />
        <SpeedTimeline />
        <ThreeSolutions />
        <HearTheDifference />
        <HowItWorks />
        <CustomWorkflows />
        <Integrations />
        <WhyAtllasX />
        <Comparison />
        <Security />
        <Proof />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <Intercom />
    </div>
  );
}
