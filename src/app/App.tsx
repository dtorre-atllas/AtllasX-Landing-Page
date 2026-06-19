import { useState, useEffect, useRef } from "react";
import heroVideo from "../assets/hero.mp4";
import footerImg from "../assets/footer.jpg";
import bannerSpeed from "../assets/speed-to-lead.jpg";
import bannerOutbound from "../assets/outbound-calling.jpg";
import bannerReceptionist from "../assets/ai-receptionist.jpg";
import bannerPricing from "../assets/pricing.jpg";
import { MemoryRouter, Routes, Route, Link, Outlet, useLocation } from "react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  Phone,
  Check,
  Plus,
  Menu,
  X,
  ChevronDown,
  Play,
  Pause,
  Mail,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Intercom } from "./components/Intercom";

/* ============================== Constants ============================== */

const DEMO_URL = "https://meetings-na2.hubspot.com/atllas/roundrobin-atllas?uuid=17d7d132-7147-4bc3-9aaa-d0aa0a242990";
const GET_STARTED_URL = "https://app.atllasx.com/dashboard/ai-calling/create";
const LOGIN_URL = "https://app.atllasx.com/authentication/login";
const DOCS_URL = "https://docs.atllasx.com";

// HubSpot live call form — replace with your Portal ID and Form GUID
const HS_PORTAL_ID = "245145631";
const HS_FORM_GUID = "f6433507-f011-4c42-846b-98af4206ea4b";
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

const INTEGRATIONS: { group: string; items: { name: string; soon?: boolean }[] }[] = [
  { group: "Lead sources", items: [{ name: "Meta Lead Ads" }, { name: "Website forms" }, { name: "Contact-list uploads" }] },
  { group: "Automation", items: [{ name: "Zapier" }, { name: "Webhooks" }, { name: "Custom triggers" }] },
  { group: "Scheduling", items: [{ name: "Calendar booking" }, { name: "Confirmation texts" }] },
  { group: "Communication", items: [{ name: "Calling" }, { name: "SMS" }, { name: "Email follow-up (custom)" }] },
  { group: "Coming soon", items: [{ name: "Native HubSpot integration", soon: true }] },
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

function LiveCallModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ firstname: "", lastname: "", email: "", phone: "", company: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${HS_PORTAL_ID}/${HS_FORM_GUID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fields: [
              { name: "firstname", value: form.firstname },
              { name: "lastname", value: form.lastname },
              { name: "email", value: form.email },
              { name: "phone", value: form.phone },
              { name: "company", value: form.company },
            ],
            context: { pageUri: window.location.href, pageName: document.title },
          }),
        }
      );
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "10px 12px", borderRadius: 8,
    border: "1px solid #e2e2e2", fontSize: 14, fontFamily: "var(--ax-body)",
    outline: "none", background: "#fafafa", boxSizing: "border-box",
  };

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,.55)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={{ background: "#fff", borderRadius: 16, padding: "36px 32px", width: "100%", maxWidth: 460, boxShadow: "0 24px 64px rgba(0,0,0,.18)", position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer", color: "#999", fontSize: 20, lineHeight: 1 }} aria-label="Close">✕</button>

        {status === "success" ? (
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>📞</div>
            <h2 style={{ fontFamily: "var(--ax-head)", fontWeight: 800, fontSize: 22, marginBottom: 8 }}>Expect a call shortly.</h2>
            <p style={{ color: "#666", fontSize: 14 }}>AtllasX will call your number in the next few seconds. Pick up!</p>
          </div>
        ) : (
          <>
            <h2 style={{ fontFamily: "var(--ax-head)", fontWeight: 800, fontSize: 22, letterSpacing: "-.02em", marginBottom: 6 }}>Meet your AI phone agent</h2>
            <p style={{ color: "#666", fontSize: 14, marginBottom: 24 }}>Enter your details and AtllasX will call you now.</p>
            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <input required placeholder="First name" value={form.firstname} onChange={set("firstname")} style={inputStyle} />
                <input required placeholder="Last name" value={form.lastname} onChange={set("lastname")} style={inputStyle} />
              </div>
              <input required type="email" placeholder="Work email" value={form.email} onChange={set("email")} style={inputStyle} />
              <input required type="tel" placeholder="Phone number" value={form.phone} onChange={set("phone")} style={inputStyle} />
              <input required placeholder="Company" value={form.company} onChange={set("company")} style={inputStyle} />
              {status === "error" && <p style={{ color: "#c0392b", fontSize: 13 }}>Something went wrong. Please try again.</p>}
              <button
                type="submit"
                disabled={status === "loading"}
                style={{ marginTop: 4, padding: "12px 20px", background: "var(--ax-accent)", color: "#fff", border: "none", borderRadius: 8, fontFamily: "var(--ax-body)", fontWeight: 600, fontSize: 15, cursor: "pointer", opacity: status === "loading" ? 0.7 : 1 }}
              >
                {status === "loading" ? "Calling…" : "Call me now →"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [solOpen, setSolOpen] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const links: [string, string][] = [["Pricing", "/pricing"]];
  const sol: [string, string][] = [["Speed to Lead", "/speed-to-lead"], ["Outbound Calling", "/outbound-calling"], ["AI Receptionist", "/ai-receptionist"]];
  const linkColor = scrolled ? "var(--ax-ink)" : "#ffffff";

  return (
    <>
    <div ref={sentinelRef} style={{ position: "absolute", top: 80, height: 1, width: 1, pointerEvents: "none" }} aria-hidden="true" />
    <nav style={{ position: "sticky", top: 0, zIndex: 50, background: scrolled ? "#ffffff" : "transparent", backdropFilter: "none", borderBottom: scrolled ? "1px solid var(--ax-line)" : "none", transition: "background .28s ease, border-color .28s ease" }}>
      <div className="ax-wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, gap: 28 }}>
        <Link to="/" style={{ fontFamily: "var(--ax-head)", fontWeight: 700, fontSize: 20, letterSpacing: "-.03em", color: scrolled ? "var(--ax-ink)" : "#fff" }}>
          Atllas<span style={{ color: "var(--ax-accent)" }}>X</span>
        </Link>

        <div className="ax-navlinks" style={{ display: "flex", alignItems: "center", gap: 26, fontSize: 13.5, color: linkColor }}>
          <div style={{ position: "relative" }} onMouseEnter={() => setSolOpen(true)} onMouseLeave={() => setSolOpen(false)}>
            <button style={{ display: "inline-flex", alignItems: "center", gap: 5, color: "inherit", background: "none", border: "none", font: "inherit", cursor: "pointer" }} aria-expanded={solOpen} aria-haspopup="true">
              Product <ChevronDown style={{ width: 14, height: 14 }} />
            </button>
            {solOpen && (
              <div style={{ position: "absolute", top: "100%", left: -16, paddingTop: 10 }}>
                <div style={{ background: "var(--ax-paper)", border: "1px solid var(--ax-line)", borderRadius: 12, padding: 8, minWidth: 210, boxShadow: "0 24px 60px -28px rgba(0,0,0,.35)" }}>
                  {sol.map(([l, h]) => (
                    <Link key={l} to={h} onClick={() => setSolOpen(false)} style={{ display: "block", padding: "9px 12px", borderRadius: 8, fontSize: 13.5, color: "var(--ax-ink-2)" }}>{l}</Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          {links.map(([l, h]) => (<Link key={l} to={h} style={{ color: "inherit" }}>{l}</Link>))}
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
          {[...sol, ...links].map(([l, h]) => (<Link key={l + h} to={h} onClick={() => setOpen(false)} style={{ padding: "9px 0", color: "var(--ax-ink-2)", fontSize: 15 }}>{l}</Link>))}
          <a href={DOCS_URL} target="_blank" rel="noopener noreferrer" style={{ padding: "9px 0", color: "var(--ax-ink-2)", fontSize: 15 }}>Docs</a>
          <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="ax-btn ax-btn-primary" style={{ marginTop: 6, justifyContent: "center" }}>Book a demo</a>
        </div>
      )}
    </nav>
    </>
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
        <source src={heroVideo} type="video/mp4" />
      </video>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(90deg, rgba(8,9,12,.86) 0%, rgba(8,9,12,.58) 45%, rgba(8,9,12,.3) 100%), linear-gradient(180deg, rgba(8,9,12,.4) 0%, transparent 28%, rgba(8,9,12,.55) 100%)" }} />
      <div className="ax-grain" style={{ position: "absolute", zIndex: 1 }} />

      <div className="ax-wrap" style={{ position: "relative", zIndex: 2, paddingTop: 200, paddingBottom: 160 }}>
        <Eyebrow light>AI phone agents for revenue teams</Eyebrow>
        <h1 style={{ fontFamily: "var(--ax-head)", fontWeight: 800, letterSpacing: "-.035em", lineHeight: 0.98, fontSize: "clamp(3.2rem, 8vw, 6.4rem)", margin: "22px 0 0", maxWidth: "15ch" }}>
          Every conversation.<br />Handled.
        </h1>
        <p style={{ color: "rgba(255,255,255,.78)", fontSize: "clamp(1.05rem,1.6vw,1.3rem)", maxWidth: "46ch", marginTop: 24, lineHeight: 1.5 }}>
          AI growth agents that call, qualify, and book leads 24/7.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 30, flexWrap: "wrap", alignItems: "center" }}>
          <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="ax-btn ax-btn-primary" style={{ padding: "13px 22px" }}>Book a demo <ArrowRight style={{ width: 16, height: 16 }} /></a>
          <button onClick={() => window.dispatchEvent(new CustomEvent("ax:livecall"))} className="ax-btn ax-btn-ghost" style={{ borderColor: "rgba(255,255,255,.28)", color: "#fff", padding: "13px 20px", cursor: "pointer" }}><Phone style={{ width: 15, height: 15 }} /> Get a live call</button>
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

const WORKFLOW_TABS = [
  { id: "speed", eyebrow: "Speed to Lead", head: "Call new leads while their intent is still high.", line: ["New lead", "AI call", "Qualified", "Meeting booked"], explore: "Explore Speed to Lead", call: CALLS[0] },
  { id: "outbound", eyebrow: "Outbound Calling", head: "Turn existing contact lists into qualified conversations.", line: ["Contact list", "AI calls", "Interest qualified", "Next step booked"], explore: "Explore Outbound Calling", call: CALLS[1] },
  { id: "receptionist", eyebrow: "AI Receptionist", head: "Never send another inbound call to voicemail.", line: ["Incoming call", "AI answers", "Intent understood", "Resolved or routed"], explore: "Explore AI Receptionist", call: CALLS[2] },
];

function ThreeSolutions() {
  const [sel, setSel] = useState(0);
  const [playerOpen, setPlayerOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [tline, setTline] = useState(0);
  const reduced = useReducedMotion();
  const w = WORKFLOW_TABS[sel];

  useEffect(() => { setPlayerOpen(false); setPlaying(false); setTline(0); }, [sel]);
  useEffect(() => {
    if (!playing || reduced) return;
    const t = setInterval(() => setTline((l) => { if (l >= w.call.transcript.length - 1) { setPlaying(false); return l; } return l + 1; }), 1500);
    return () => clearInterval(t);
  }, [playing, reduced, w.call.transcript.length]);

  return (
    <section id="solutions" style={{ padding: "84px 0", borderTop: "1px solid var(--ax-line)" }}>
      <div className="ax-wrap">
        <h2 style={{ fontSize: "clamp(1.9rem,3.8vw,3rem)" }}>One platform. Three ways to grow.</h2>
        <div style={{ display: "flex", gap: 30, marginTop: 34, borderBottom: "1px solid var(--ax-line)", flexWrap: "wrap" }}>
          {WORKFLOW_TABS.map((x, i) => (
            <button key={x.id} onClick={() => setSel(i)} style={{ fontSize: 15, fontWeight: 500, padding: "0 0 14px", marginBottom: -1, background: "none", border: "none", borderBottom: "2px solid " + (i === sel ? "var(--ax-accent)" : "transparent"), color: i === sel ? "var(--ax-accent)" : "var(--ax-ink-3)", cursor: "pointer", fontFamily: "var(--ax-head)", whiteSpace: "nowrap" }}>{x.eyebrow}</button>
          ))}
        </div>
        <div className="ax-sol-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, marginTop: 32, alignItems: "center" }}>
          <div>
            <div className="ax-mono" style={{ fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--ax-ink-3)", marginBottom: 14 }}>{w.eyebrow}</div>
            <h3 style={{ fontFamily: "var(--ax-head)", fontWeight: 700, fontSize: "clamp(1.5rem,2.4vw,2rem)", letterSpacing: "-.02em", lineHeight: 1.14, marginBottom: 20 }}>{w.head}</h3>
            <div className="ax-mono" style={{ fontSize: 13, color: "var(--ax-ink-2)", background: "var(--ax-paper-2)", border: "1px solid var(--ax-line)", borderRadius: 10, padding: "12px 14px" }}>
              {w.line.map((s, i) => (<span key={i}>{s}{i < w.line.length - 1 && <span style={{ color: "var(--ax-accent)", margin: "0 6px" }}>→</span>}</span>))}
            </div>
            <div style={{ display: "flex", gap: 24, alignItems: "center", marginTop: 22, flexWrap: "wrap" }}>
              <button onClick={() => setPlayerOpen((o) => !o)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--ax-head)", fontSize: 14, fontWeight: 500, color: "var(--ax-ink-2)", padding: 0, display: "inline-flex", alignItems: "center", gap: 6 }}><Play style={{ width: 13, height: 13 }} /> Hear a call</button>
              <a href="#solutions" style={{ fontFamily: "var(--ax-head)", fontSize: 14, fontWeight: 500, color: "var(--ax-accent)" }}>{w.explore} →</a>
            </div>
            {playerOpen && (
              <div style={{ marginTop: 20, border: "1px solid var(--ax-line)", borderRadius: 12, padding: "14px 16px", background: "#fff", maxWidth: 480 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <button onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause" : "Play"} style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--ax-ink)", color: "#fff", border: "none", cursor: "pointer", flex: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>{playing ? <Pause style={{ width: 14, height: 14 }} /> : <Play style={{ width: 14, height: 14, marginLeft: 1 }} />}</button>
                  <Wave active={playing} />
                  <span className="ax-mono" style={{ fontSize: 12, color: "var(--ax-ink-3)", marginLeft: "auto" }}>Demo · {w.call.duration}</span>
                </div>
                <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                  {w.call.transcript.map((row, i) => (
                    <div key={i} style={{ opacity: i <= tline && playing ? 1 : 0.25, transition: "opacity .3s" }}>
                      <div className="ax-mono" style={{ fontSize: 9.5, letterSpacing: ".06em", marginBottom: 3, color: row[0] === "agent" ? "var(--ax-accent)" : "var(--ax-live)" }}>{row[0] === "agent" ? "AI AGENT" : "CALLER"}</div>
                      <div style={{ fontSize: 13, color: "var(--ax-ink-2)", lineHeight: 1.4 }}>{row[1]}</div>
                    </div>
                  ))}
                </div>
                <p className="ax-mono" style={{ fontSize: 10.5, color: "var(--ax-ink-3)", marginTop: 12 }}>Product demonstration. Callers are speaking with an AI agent.</p>
              </div>
            )}
          </div>
          <motion.div key={w.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <ProductMock which={w.id} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function DashboardSection() {
  const cards: any[] = [["Calls today", "1,284", "▲ 12%", false], ["Connect rate", "82.3%", "▲ 4.1%", false], ["Booked", "47", "▲ 8", true], ["Avg call", "2:41", "— flat", false]];
  const rows: any[] = [["Marcus King", "(512) 555-0148", "Spring Buyers", "Booked", "#34d399"], ["Tom Park", "(737) 555-0102", "Expired Listings", "Not interested", "#f87171"], ["Rosa Alvarez", "(512) 555-0199", "Spring Buyers", "Callback", "#f5c85a"]];
  return (
    <section className="ax-dark" style={{ padding: "84px 0" }}>
      <div className="ax-wrap">
        <h2 style={{ fontSize: "clamp(1.9rem,3.8vw,3rem)", color: "#fff" }}>Every conversation becomes a recorded outcome.</h2>
        <p style={{ color: "rgba(255,255,255,.6)", fontSize: "1.05rem", marginTop: 14, maxWidth: "62ch" }}>Call status, transcript, notes, tags, qualification result, lead score, and appointment status — all organized inside the AtllasX dashboard.</p>
        <div className="ax-dash" style={{ marginTop: 40, border: "1px solid rgba(255,255,255,.1)", borderRadius: 14, overflow: "hidden", display: "flex", background: "rgba(255,255,255,.03)" }}>
          <div className="ax-dash-side" style={{ width: 130, flex: "none", borderRight: "1px solid rgba(255,255,255,.08)", padding: "14px 11px" }}>
            <div style={{ fontFamily: "var(--ax-head)", fontWeight: 700, fontSize: 14, margin: "2px 6px 16px" }}>atllas<span style={{ color: "#7aa2ff" }}>X</span></div>
            {["Overview", "Campaigns", "Calls", "Leads", "Analytics"].map((n, i) => (
              <div key={n} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 12, color: i === 0 ? "#fff" : "rgba(255,255,255,.5)", padding: "7px 8px", borderRadius: 7, background: i === 0 ? "rgba(255,255,255,.08)" : "transparent" }}><span style={{ width: 12, height: 12, borderRadius: 3, border: "1.4px solid currentColor", opacity: 0.7, flex: "none" }} />{n}</div>
            ))}
          </div>
          <div style={{ flex: 1, minWidth: 0, padding: "16px 18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}><span style={{ fontWeight: 600, fontSize: 14, color: "#fff" }}>Overview</span><span style={{ fontSize: 11, background: "#5b8cff", color: "#fff", padding: "6px 11px", borderRadius: 7 }}>+ New campaign</span></div>
            <div className="ax-dash-cards" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 14 }}>
              {cards.map((c) => (
                <div key={c[0]} style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 9, padding: 10 }}><div style={{ fontSize: 9, color: "rgba(255,255,255,.45)" }}>{c[0]}</div><div style={{ fontWeight: 700, fontSize: 17, marginTop: 3, letterSpacing: "-.02em", color: c[3] ? "#7aa2ff" : "#fff" }}>{c[1]}</div><div className="ax-mono" style={{ fontSize: 9, color: c[2] === "— flat" ? "rgba(255,255,255,.4)" : "#34d399", marginTop: 3 }}>{c[2]}</div></div>
              ))}
            </div>
            <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 9, padding: "12px 13px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "rgba(255,255,255,.5)", marginBottom: 8 }}><span>Recent calls</span><span style={{ color: "#7aa2ff" }}>View all →</span></div>
              {rows.map((r) => (
                <div key={r[0]} style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr auto", gap: 10, alignItems: "center", padding: "7px 0", borderTop: "1px solid rgba(255,255,255,.05)", fontSize: 11 }}><div><b style={{ color: "#f4f4f5", fontWeight: 600 }}>{r[0]}</b><span className="ax-mono" style={{ color: "rgba(255,255,255,.4)", fontSize: 10, marginLeft: 5 }}>{r[1]}</span></div><div style={{ color: "rgba(255,255,255,.5)" }}>{r[2]}</div><span className="ax-mono" style={{ fontSize: 9.5, color: r[4], justifySelf: "end" }}>{r[3]}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Integrations() {
  return (
    <section id="integrations" style={{ padding: "96px 0", borderTop: "1px solid var(--ax-line)" }}>
      <div className="ax-wrap">
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

function Pricing() {
  return (
    <section id="pricing" style={{ padding: "96px 0", borderTop: "1px solid var(--ax-line)" }}>
      <div className="ax-wrap">
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

function Footer() {
  const cols: [string, [string, string][]][] = [
    ["Product", [["Speed to Lead", "/speed-to-lead"], ["Outbound Calling", "/outbound-calling"], ["AI Receptionist", "/ai-receptionist"], ["Pricing", "/pricing"]]],
    ["Resources", [["Documentation", DOCS_URL], ["Contact", "mailto:info@atllas.com"]]],
    ["Company", [["Privacy", "https://app.atllas.com/legal/privacy-policy"], ["Terms", "https://app.atllas.com/legal/terms-of-service"], ["Accessibility", "mailto:info@atllas.com"], ["Log in", LOGIN_URL]]],
  ];
  const lk = { color: "rgba(255,255,255,.62)", fontSize: 13.5 } as React.CSSProperties;
  const card: React.CSSProperties = { background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 16, padding: "22px 20px", backdropFilter: "blur(6px)" };
  const renderLink = (l: string, href: string) =>
    href.startsWith("/")
      ? <Link key={l} to={href} style={lk}>{l}</Link>
      : <a key={l} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" style={lk}>{l}</a>;
  return (
    <footer style={{ position: "relative", color: "#fff", overflow: "hidden", background: "#0b0c0e" }}>
      <img src={footerImg} alt="" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.45, zIndex: 0 }} />
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(8,9,11,.7) 0%, rgba(8,9,11,.9) 60%, rgba(8,9,11,.96) 100%)", zIndex: 1 }} />
      <div className="ax-wrap" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ textAlign: "center", padding: "92px 0 64px" }}>
          <h2 style={{ fontSize: "clamp(2.1rem,5vw,3.4rem)", letterSpacing: "-.03em", lineHeight: 1.05, color: "#fff", maxWidth: "20ch", margin: "0 auto" }}>Your next lead should not have to wait.</h2>
          <p style={{ color: "rgba(255,255,255,.65)", fontSize: "1.05rem", margin: "18px auto 28px", maxWidth: "46ch" }}>See how AtllasX would call, qualify, and book leads for your business.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="ax-btn ax-btn-primary" style={{ padding: "13px 24px" }}>Book a demo <ArrowRight style={{ width: 16, height: 16 }} /></a>
            <button onClick={() => window.dispatchEvent(new CustomEvent("ax:livecall"))} className="ax-btn ax-btn-ghost" style={{ borderColor: "rgba(255,255,255,.28)", color: "#fff", padding: "13px 22px", cursor: "pointer" }}><Phone style={{ width: 15, height: 15 }} /> Get a live call</button>
          </div>
          <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", marginTop: 26, color: "rgba(255,255,255,.5)", fontSize: 12.5 }}>
            {["Set up in as little as five minutes", "Cancel anytime", "Custom workflows available"].map((t) => (
              <span key={t} style={{ display: "inline-flex", gap: 6, alignItems: "center" }}><Check style={{ width: 14, height: 14 }} /> {t}</span>
            ))}
          </div>
        </div>
        <div className="ax-foot" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr 1fr", gap: 16 }}>
          <div style={card}>
            <Link to="/" style={{ fontFamily: "var(--ax-head)", fontWeight: 700, fontSize: 20, letterSpacing: "-.03em", color: "#fff" }}>Atllas<span style={{ color: "var(--ax-accent)" }}>X</span></Link>
            <p style={{ color: "rgba(255,255,255,.55)", fontSize: 13, lineHeight: 1.6, marginTop: 14, maxWidth: "32ch" }}>AI phone agents for inbound and outbound calls.</p>
            <a href="tel:+14159694084" style={{ color: "rgba(255,255,255,.65)", fontSize: 13.5, marginTop: 16, display: "inline-flex", gap: 7, alignItems: "center" }}><Phone style={{ width: 14, height: 14 }} /> {PHONE}</a>
          </div>
          {cols.map(([h, items]) => (
            <div key={h} style={card}>
              <div className="ax-mono" style={{ fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.45)", marginBottom: 14 }}>{h}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {items.map(([l, href]) => renderLink(l, href))}
              </div>
            </div>
          ))}
          <div style={card}>
            <div className="ax-mono" style={{ fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.45)", marginBottom: 14 }}>Connect</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              <a href="https://www.linkedin.com/company/atllas-inc/" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,.6)", fontSize: 13.5, display: "inline-flex", gap: 8, alignItems: "center" }}><Linkedin style={{ width: 14, height: 14 }} /> LinkedIn</a>
              <a href="https://www.instagram.com/atllasai" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,.6)", fontSize: 13.5, display: "inline-flex", gap: 8, alignItems: "center" }}><Instagram style={{ width: 14, height: 14 }} /> Instagram</a>
              <a href="mailto:info@atllas.com" style={{ color: "rgba(255,255,255,.6)", fontSize: 13.5, display: "inline-flex", gap: 8, alignItems: "center" }}><Mail style={{ width: 14, height: 14 }} /> Email</a>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 44, paddingTop: 22, borderTop: "1px solid rgba(255,255,255,.12)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, color: "rgba(255,255,255,.45)", fontSize: 12 }}>
          <span>© Atllas Inc. {new Date().getFullYear()}</span>
          <span className="ax-mono">AI phone agents for inbound and outbound calls</span>
        </div>
      </div>
    </footer>
  );
}

/* ============================== App ============================== */

function SiteLayout() {
  const [liveCallOpen, setLiveCallOpen] = useState(false);
  useEffect(() => {
    const open = () => setLiveCallOpen(true);
    window.addEventListener("ax:livecall", open);
    return () => window.removeEventListener("ax:livecall", open);
  }, []);
  return (
    <div className="ax" style={{ background: "var(--ax-paper)", minHeight: "100vh", position: "relative" }}>
      {liveCallOpen && <LiveCallModal onClose={() => setLiveCallOpen(false)} />}
      <style>{`
        @keyframes axmarq { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .ax-marq { animation: axmarq 64s linear infinite; }
        .ax-marq:hover { animation-play-state: paused; }
        @keyframes axwave { from { transform: scaleY(.45); } to { transform: scaleY(1); } }
        .ax-hgrid{position:relative;z-index:2;display:grid;grid-template-columns:1.02fr .98fr;gap:24px;align-items:center;padding-top:140px;padding-bottom:110px}
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
          .ax-dash-side { display: none !important; }
          .ax-dash-cards { grid-template-columns: 1fr 1fr !important; }
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

      <div style={{ position: "relative", background: "#000", padding: "8px 16px", textAlign: "center", fontFamily: "var(--ax-mono)", fontSize: 12.5, color: "rgba(255,255,255,.75)", letterSpacing: ".04em" }}>
        HubSpot App Integration Coming Soon
      </div>
      <ScrollTop />
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Intercom />
    </div>
  );
}

function ScrollTop() {
  const loc = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [loc.pathname]);
  return null;
}

function HomePage() {
  return (
    <>
      <Hero />
      <ThreeSolutions />
      <DashboardSection />
      <Integrations />
      <Pricing />
      <FAQ />
    </>
  );
}

function DarkHeader({ eyebrow, title, sub, banner, children }: { eyebrow: string; title: string; sub?: string; banner?: string; children?: React.ReactNode }) {
  return (
    <section style={{ background: "var(--ax-ink)", color: "#fff", marginTop: -64, position: "relative", overflow: "hidden" }}>
      {banner ? (
        <>
          <img src={banner} alt="" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(8,9,12,.92) 0%, rgba(8,9,12,.6) 52%, rgba(8,9,12,.3) 100%), linear-gradient(180deg, rgba(8,9,12,.25) 0%, rgba(8,9,12,.72) 100%)" }} />
        </>
      ) : (
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(60% 70% at 72% 0%, rgba(31,91,255,.16), transparent 70%)" }} />
      )}
      <div className="ax-wrap" style={{ position: "relative", zIndex: 2, paddingTop: 138, paddingBottom: children ? 64 : 80 }}>
        <div className="ax-mono" style={{ fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(255,255,255,.55)", marginBottom: 16 }}>{eyebrow}</div>
        <h1 style={{ fontFamily: "var(--ax-head)", fontWeight: 800, letterSpacing: "-.03em", fontSize: "clamp(2.4rem,5vw,3.8rem)", lineHeight: 1.05, maxWidth: "20ch" }}>{title}</h1>
        {sub && <p style={{ color: "rgba(255,255,255,.7)", fontSize: "1.15rem", marginTop: 18, maxWidth: "56ch", lineHeight: 1.5 }}>{sub}</p>}
        {children}
      </div>
    </section>
  );
}

const SOLUTION_PAGES: Record<string, any> = {
  speed: {
    id: "speed", banner: bannerSpeed, eyebrow: "Speed to Lead",
    h1: "Call new leads while their intent is still high.",
    sub: "Connect a lead source and AtllasX calls each new lead within ~60 seconds — introducing itself, qualifying against your criteria, and booking the meeting. Day or night.",
    mock: "speed", line: ["New lead", "AI call in ~60s", "Qualified", "Meeting booked"],
    intro: "One agent that picks up where your forms leave off — calling, qualifying, and booking without anyone lifting a finger.",
    caps: ["Calls within ~60 seconds", "Personalized conversation", "Qualification against your criteria", "Appointment booking", "Booking confirmation text", "Human transfer"],
    stepsHead: "From new lead to booked meeting.",
    stepsSub: "Four steps, fully automatic — the lead never waits and your team never lifts a finger.",
    steps: [["01", "Connect a lead source", "Point AtllasX at your inbound lead flow. New leads trigger a call the moment they arrive."], ["02", "AtllasX calls in ~60 seconds", "It introduces itself for your business and holds a natural, real-time phone conversation."], ["03", "Qualifies the lead", "It asks the questions you define, captures the answers, and records the outcome on every call."], ["04", "Books & confirms", "It books the meeting, sends a confirmation text, and warm-transfers to a human on request."]],
    call: 0, callSub: "A live speed-to-lead conversation, start to finish.",
    integHead: "Connect the systems that send you leads.",
    integSub: "Trigger AtllasX calls from your existing lead workflow.",
    integ: [["Lead sources", ["Meta Lead Ads", "Website forms", "Contact-list uploads"]], ["Automation", ["Zapier", "Webhooks", "Custom triggers"]], ["Scheduling", ["Calendar booking", "Confirmation texts"]]],
    faq: [["How quickly can AtllasX call a new lead?", "When a lead arrives from a connected source, AtllasX typically calls within approximately 60 seconds — day or night, including nights and weekends."], ["What does it say on the call?", "It introduces itself for your business, asks the qualifying questions you define, and works to book a meeting. You control the script, criteria, and tone."], ["Can it transfer to a human?", "Yes. AtllasX can warm-transfer to your team the moment a lead wants to speak with a person."], ["Does it work with my CRM?", "Native HubSpot integration is coming soon. Today, leads can be connected through supported sources, and custom CRM, webhook, and follow-up workflows are available by request."]],
  },
  outbound: {
    id: "outbound", banner: bannerOutbound, eyebrow: "Outbound Calling",
    h1: "Turn existing contact lists into qualified conversations.",
    sub: "Upload a contact list, define the objective, and AtllasX works through the campaign — handling objections, qualifying interest, and booking the next step.",
    mock: "outbound", line: ["Contact list", "AI calls", "Interest qualified", "Next step booked"],
    intro: "Point AtllasX at a list and an objective, and it runs the campaign end to end — calling, qualifying, and booking.",
    caps: ["Contact-list uploads", "Custom campaign objective", "Objection handling", "Qualification", "Appointment setting", "Campaign outcomes & transcripts"],
    stepsHead: "From cold list to booked pipeline.",
    stepsSub: "Four steps, fully automatic — upload, set the goal, and let AtllasX work the list.",
    steps: [["01", "Upload a contact list", "Bring the list you want worked. AtllasX takes it from there."], ["02", "Define the objective", "Set the goal, script, and qualifying criteria for the campaign."], ["03", "AtllasX works the list", "It calls through your contacts, handles objections, and qualifies interest."], ["04", "Books the next step", "It sets the appointment and records every outcome and transcript."]],
    call: 1, callSub: "A live outbound conversation, start to finish.",
    integHead: "Connect the tools behind your campaigns.",
    integSub: "Run AtllasX alongside the systems you already use.",
    integ: [["Lists", ["Contact-list uploads", "CSV import"]], ["Automation", ["Zapier", "Webhooks", "Custom triggers"]], ["Scheduling", ["Calendar booking", "Confirmation texts"]]],
    faq: [["What kind of lists can I upload?", "Upload a contact list or CSV and define your campaign objective — AtllasX works through the list and records every outcome."], ["Does it handle objections?", "Yes. AtllasX handles common objections, qualifies interest, and keeps the conversation moving toward the next step."], ["What happens after each call?", "Every call's outcome and transcript is recorded in the AtllasX dashboard, and qualified contacts get booked automatically."], ["Can it follow up by SMS or email?", "Booking-related texts are native. SMS and email follow-up sequences are available as custom workflows configured around your process."]],
  },
  receptionist: {
    id: "receptionist", banner: bannerReceptionist, eyebrow: "AI Receptionist",
    h1: "Never send another inbound call to voicemail.",
    sub: "AtllasX answers every incoming call 24/7 — responding from your knowledge base, capturing details, qualifying, booking, and routing callers by your rules.",
    mock: "receptionist", line: ["Incoming call", "AI answers 24/7", "Intent understood", "Resolved or routed"],
    intro: "A 24/7 voice agent that answers every inbound call, helps the caller, and routes anyone who needs a human.",
    caps: ["24/7 answering", "Business-specific knowledge", "Call qualification", "Appointment booking", "Human transfer", "Call transcription"],
    stepsHead: "From ring to resolved.",
    stepsSub: "Four steps, fully automatic — every caller answered, helped, and routed.",
    steps: [["01", "Forward your number", "Point your inbound line to AtllasX in minutes."], ["02", "AtllasX answers 24/7", "Every call is picked up instantly — day, night, weekends, holidays."], ["03", "Understands & qualifies", "It answers from your knowledge base and qualifies the caller."], ["04", "Resolves or routes", "It books, answers, or warm-transfers the caller to the right person."]],
    call: 2, callSub: "A live inbound conversation, start to finish.",
    integHead: "Fits the way calls already reach you.",
    integSub: "Point your inbound line at AtllasX and connect your tools.",
    integ: [["Telephony", ["Call forwarding", "Business number"]], ["Knowledge", ["Business knowledge base", "Custom Q&A"]], ["Scheduling", ["Calendar booking", "Human transfer"]]],
    faq: [["Does it really answer 24/7?", "Yes. AtllasX answers every incoming call around the clock — nights, weekends, and holidays included."], ["How does it know about my business?", "It responds from the knowledge base you provide, so callers get accurate answers in your business's voice."], ["Can it send callers to a human?", "Yes. AtllasX qualifies the caller and warm-transfers or routes them to the right person based on your rules."], ["Are calls recorded?", "Yes. Every call is transcribed and the outcome is logged inside the AtllasX dashboard."]],
  },
};

const SOL_LINKS: Record<string, { to: string; label: string; title: string; blurb: string }> = {
  speed: { to: "/speed-to-lead", label: "Speed to Lead", title: "Call leads in ~60s.", blurb: "Call new leads while their intent is still high — qualified and booked, 24/7." },
  outbound: { to: "/outbound-calling", label: "Outbound Calling", title: "Work your lists.", blurb: "Turn existing contact lists into qualified conversations and booked next steps." },
  receptionist: { to: "/ai-receptionist", label: "AI Receptionist", title: "Answer every call.", blurb: "Never send another inbound call to voicemail — answered, qualified, routed 24/7." },
};

function CallPlayer({ call }: { call: any }) {
  const [playing, setPlaying] = useState(false);
  const [tline, setTline] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!playing || reduced) return;
    const t = setInterval(() => setTline((l) => { if (l >= call.transcript.length - 1) { setPlaying(false); return l; } return l + 1; }), 1500);
    return () => clearInterval(t);
  }, [playing, reduced, call.transcript.length]);
  return (
    <div style={{ marginTop: 32, border: "1px solid var(--ax-line)", borderRadius: 14, padding: "16px 18px", background: "#fff", maxWidth: 560 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <button onClick={() => { if (!playing) setTline(0); setPlaying((p) => !p); }} aria-label={playing ? "Pause" : "Play"} style={{ width: 38, height: 38, borderRadius: "50%", background: "var(--ax-ink)", color: "#fff", border: "none", cursor: "pointer", flex: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>{playing ? <Pause style={{ width: 14, height: 14 }} /> : <Play style={{ width: 14, height: 14, marginLeft: 1 }} />}</button>
        <Wave active={playing} />
        <span className="ax-mono" style={{ fontSize: 12, color: "var(--ax-ink-3)", marginLeft: "auto" }}>Demo · {call.duration}</span>
      </div>
      <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 9 }}>
        {call.transcript.map((row: any, i: number) => (
          <div key={i} style={{ opacity: playing ? (i <= tline ? 1 : 0.25) : 1, transition: "opacity .3s" }}>
            <div className="ax-mono" style={{ fontSize: 9.5, letterSpacing: ".06em", marginBottom: 3, color: row[0] === "agent" ? "var(--ax-accent)" : "var(--ax-live)" }}>{row[0] === "agent" ? "AI AGENT" : "CALLER"}</div>
            <div style={{ fontSize: 13, color: "var(--ax-ink-2)", lineHeight: 1.45 }}>{row[1]}</div>
          </div>
        ))}
      </div>
      <p className="ax-mono" style={{ fontSize: 10.5, color: "var(--ax-ink-3)", marginTop: 12 }}>Product demonstration. Callers are speaking with an AI agent.</p>
    </div>
  );
}

function FaqList({ items }: { items: [string, string][] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div style={{ marginTop: 36, borderTop: "1px solid var(--ax-line)" }}>
      {items.map(([q, a], i) => {
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
  );
}

function SolutionPage({ data }: { data: any }) {
  const others = Object.keys(SOL_LINKS).filter((k) => k !== data.id);
  const card: React.CSSProperties = { display: "block", border: "1px solid var(--ax-line)", borderRadius: 16, padding: 26, background: "#fff" };
  return (
    <>
      <DarkHeader eyebrow={data.eyebrow} title={data.h1} sub={data.sub} banner={data.banner}>
        <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap", alignItems: "center" }}>
          <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="ax-btn ax-btn-primary" style={{ padding: "13px 22px" }}>Book a demo <ArrowRight style={{ width: 16, height: 16 }} /></a>
          <button onClick={() => window.dispatchEvent(new CustomEvent("ax:livecall"))} className="ax-btn ax-btn-ghost" style={{ borderColor: "rgba(255,255,255,.28)", color: "#fff", padding: "13px 20px", cursor: "pointer" }}><Phone style={{ width: 15, height: 15 }} /> Get a live call</button>
        </div>
        <div className="ax-mono" style={{ display: "inline-block", marginTop: 26, fontSize: 13, color: "rgba(255,255,255,.72)", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 10, padding: "12px 14px" }}>
          {data.line.map((s: string, i: number) => (<span key={i}>{s}{i < data.line.length - 1 && <span style={{ color: "#7e9bff", margin: "0 6px" }}>→</span>}</span>))}
        </div>
      </DarkHeader>

      {/* What it does */}
      <section style={{ padding: "84px 0", borderTop: "1px solid var(--ax-line)" }}>
        <div className="ax-wrap ax-sol-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: "clamp(1.9rem,3.8vw,3rem)" }}>What it does</h2>
            <p style={{ color: "var(--ax-ink-2)", fontSize: "1.05rem", marginTop: 14, maxWidth: "46ch", lineHeight: 1.55 }}>{data.intro}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 24 }}>
              {data.caps.map((c: string) => (
                <div key={c} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 15.5, color: "var(--ax-ink-2)" }}><Check style={{ width: 18, height: 18, color: "var(--ax-live)", flex: "none", marginTop: 2 }} /> {c}</div>
              ))}
            </div>
          </div>
          <ProductMock which={data.mock} />
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: "84px 0", borderTop: "1px solid var(--ax-line)", background: "var(--ax-paper-2)" }}>
        <div className="ax-wrap">
          <h2 style={{ fontSize: "clamp(1.9rem,3.8vw,3rem)" }}>{data.stepsHead}</h2>
          <p style={{ color: "var(--ax-ink-2)", fontSize: "1.05rem", marginTop: 14, maxWidth: "60ch" }}>{data.stepsSub}</p>
          <div style={{ marginTop: 40, borderTop: "1px solid var(--ax-line)" }}>
            {data.steps.map((s: string[]) => (
              <div key={s[0]} className="ax-step" style={{ display: "grid", gridTemplateColumns: "64px 1fr", gap: 24, padding: "26px 4px", borderBottom: "1px solid var(--ax-line)", alignItems: "baseline" }}>
                <div className="ax-mono" style={{ fontSize: 13, color: "var(--ax-accent)" }}>{s[0]}</div>
                <div>
                  <h3 style={{ fontSize: "1.2rem", letterSpacing: "-.02em" }}>{s[1]}</h3>
                  <p style={{ color: "var(--ax-ink-2)", fontSize: "1rem", lineHeight: 1.55, marginTop: 6, maxWidth: "62ch" }}>{s[2]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hear a real call */}
      <section style={{ padding: "84px 0", borderTop: "1px solid var(--ax-line)" }}>
        <div className="ax-wrap">
          <h2 style={{ fontSize: "clamp(1.9rem,3.8vw,3rem)" }}>Hear a real call.</h2>
          <p style={{ color: "var(--ax-ink-2)", fontSize: "1.05rem", marginTop: 14, maxWidth: "60ch" }}>{data.callSub}</p>
          <CallPlayer call={CALLS[data.call]} />
        </div>
      </section>

      {/* Integrations */}
      <section style={{ padding: "84px 0", borderTop: "1px solid var(--ax-line)", background: "var(--ax-paper-2)" }}>
        <div className="ax-wrap">
          <h2 style={{ fontSize: "clamp(1.9rem,3.8vw,3rem)" }}>{data.integHead}</h2>
          <p style={{ color: "var(--ax-ink-2)", fontSize: "1.05rem", marginTop: 14, maxWidth: "60ch" }}>{data.integSub}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 20, marginTop: 40 }}>
            {data.integ.map((g: [string, string[]]) => (
              <div key={g[0]} style={{ border: "1px solid var(--ax-line)", borderRadius: 14, padding: 22, background: "#fff" }}>
                <div className="ax-mono" style={{ fontSize: 10.5, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ax-ink-3)", marginBottom: 14 }}>{g[0]}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                  {g[1].map((it) => (<span key={it} style={{ fontSize: 14, color: "var(--ax-ink)" }}>{it}</span>))}
                </div>
              </div>
            ))}
          </div>
          <p style={{ color: "var(--ax-ink-3)", fontSize: 13, marginTop: 20 }}>Native HubSpot integration coming soon · SMS &amp; email follow-up available as custom workflows.</p>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "84px 0", borderTop: "1px solid var(--ax-line)" }}>
        <div className="ax-wrap" style={{ maxWidth: 820 }}>
          <h2 style={{ fontSize: "clamp(1.9rem,3.8vw,3rem)" }}>Questions, answered.</h2>
          <FaqList items={data.faq} />
        </div>
      </section>

      {/* Explore the platform */}
      <section style={{ padding: "84px 0", borderTop: "1px solid var(--ax-line)" }}>
        <div className="ax-wrap">
          <h2 style={{ fontSize: "clamp(1.9rem,3.8vw,3rem)" }}>One platform. Three ways to grow.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 18, marginTop: 40 }}>
            {others.map((k) => {
              const s = SOL_LINKS[k];
              return (
                <Link key={k} to={s.to} style={card}>
                  <div className="ax-mono" style={{ fontSize: 10.5, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ax-ink-3)" }}>{s.label}</div>
                  <h3 style={{ fontSize: "1.25rem", margin: "12px 0 8px", letterSpacing: "-.02em" }}>{s.title}</h3>
                  <p style={{ color: "var(--ax-ink-2)", fontSize: ".94rem", lineHeight: 1.5 }}>{s.blurb}</p>
                  <span style={{ color: "var(--ax-accent)", fontWeight: 500, fontSize: 14, marginTop: 16, display: "inline-flex", alignItems: "center", gap: 6 }}>Explore {s.label} <ArrowRight style={{ width: 15, height: 15 }} /></span>
                </Link>
              );
            })}
            <Link to="/pricing" style={card}>
              <div className="ax-mono" style={{ fontSize: 10.5, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ax-ink-3)" }}>Pricing</div>
              <h3 style={{ fontSize: "1.25rem", margin: "12px 0 8px", letterSpacing: "-.02em" }}>Plans by call volume.</h3>
              <p style={{ color: "var(--ax-ink-2)", fontSize: ".94rem", lineHeight: 1.5 }}>Every plan includes a monthly call allotment you can use anytime, any day.</p>
              <span style={{ color: "var(--ax-accent)", fontWeight: 500, fontSize: 14, marginTop: 16, display: "inline-flex", alignItems: "center", gap: 6 }}>See pricing <ArrowRight style={{ width: 15, height: 15 }} /></span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function PricingPage() {
  return (
    <>
      <DarkHeader eyebrow="Pricing" title="Plans that scale with your call volume." sub="Every plan includes a monthly call allotment you can use anytime. Book a demo and we'll size it to your lead flow." banner={bannerPricing} />
      <Pricing />
      <FAQ />
    </>
  );
}

export default function App() {
  return (
    <MemoryRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/speed-to-lead" element={<SolutionPage data={SOLUTION_PAGES.speed} />} />
          <Route path="/outbound-calling" element={<SolutionPage data={SOLUTION_PAGES.outbound} />} />
          <Route path="/ai-receptionist" element={<SolutionPage data={SOLUTION_PAGES.receptionist} />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}
