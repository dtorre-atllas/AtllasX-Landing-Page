import { useState, useEffect, useRef } from "react";
import heroVideo from "../assets/hero.mp4";
const GITHUB_ASSETS = "https://raw.githubusercontent.com/dtorre-atllas/AtllasX-Landing-Page/main/src/assets";
const footerImg = `${GITHUB_ASSETS}/footer.jpg`;
import { MemoryRouter, Routes, Route, Link, Outlet, useLocation, Navigate } from "react-router";
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
const LOGIN_URL = "https://app.atllasx.com/authentication/login";
const DOCS_URL = "https://docs.atllasx.com";

// HubSpot live call form — replace with your Portal ID and Form GUID
const HS_PORTAL_ID = "245145631";
const HS_FORM_GUID = "f6433507-f011-4c42-846b-98af4206ea4b";
const PHONE = "(415) 969-4084";

/* Winback call transcripts. AI is disclosed on every call. */
const CALLS = [
  {
    tab: "Saved — price",
    objective: "Winback call, minutes after a Stripe cancellation",
    duration: "1:56",
    transcript: [
      ["agent", "Hi Sarah — this is an AI assistant calling for Kite Analytics. You cancelled your subscription a few minutes ago, and I wanted to ask what happened. Do you have a minute?"],
      ["caller", "Oh — sure. Honestly, it's a budget thing. We're cutting a few tools this month."],
      ["agent", "That's fair, and good to know. Since it's the price — I can offer 30% off for the next three months. Same plan, cancel anytime. Does that change the math?"],
      ["caller", "Thirty percent… yeah, actually. That works for now."],
      ["agent", "Done — your subscription is back on, 30% off for three months. Confirmation email is on its way."],
    ],
    outcome: "Saved · 3-month 30% offer · reason logged: budget",
  },
  {
    tab: "Saved — pause",
    objective: "Winback call after a RevenueCat cancellation (mobile app)",
    duration: "1:38",
    transcript: [
      ["agent", "Hi Marcus — this is an AI assistant calling for the Peak fitness app. You just cancelled your membership, and I wanted to check why before you go."],
      ["caller", "I just wasn't using it enough to justify it."],
      ["agent", "Understood. Instead of cancelling — I can pause your membership for two months, free. It restarts only if you come back. Want me to do that?"],
      ["caller", "Yeah, a pause is better. Do that."],
      ["agent", "Paused for two months. No charges until you're back. You'll get a text confirming it now."],
    ],
    outcome: "Saved · 2-month pause · reason logged: low usage",
  },
  {
    tab: "Not saved — logged",
    objective: "No save — but the reason is captured for the product team",
    duration: "1:12",
    transcript: [
      ["agent", "Hi Dana — this is an AI assistant calling for Ledgerly. You cancelled earlier today. Can I ask what drove the decision?"],
      ["caller", "We moved to a tool that connects with our warehouse. Yours doesn't."],
      ["agent", "That's clear — which integration was the dealbreaker, if you don't mind?"],
      ["caller", "Snowflake, mainly."],
      ["agent", "Logged. I won't pitch you — that's a real gap. If it ships, would you want a call back?"],
      ["caller", "Sure, if it ships."],
    ],
    outcome: "Not saved · reason logged: missing integration · flagged for product",
  },
];

const PILLARS: [string, string][] = [
  ["They cancel at 2am. We call at 2:03.", "The cancel event fires. The call goes out in minutes — while the decision is still soft."],
  ["Your offer. Your rules. Nothing else.", "The caller can only offer what you approved: discount, pause, downgrade. Hard limits."],
  ["Everyone gets a call. Not a segment.", "100% of cancellations, each call built from that customer's own account."],
  ["They tell us why they left. We tell you.", "Cancel reason, competitor, price signal — from a real conversation, not a survey."],
];

const REASONS: [string, number][] = [
  ["Price", 34],
  ["Low usage", 26],
  ["Missing feature", 18],
  ["Switched provider", 12],
  ["Other", 10],
];

const PRICING_MODEL = [
  { name: "Platform fee", price: "Flat", sub: "Sized to your cancellation volume", desc: "Covers setup, integrations, offer configuration, and the dashboard. Fixed and agreed up front — no seats, no tiers.", feat: false },
  { name: "Per call", price: "10¢", sub: "Per winback call placed", desc: "Every dial at cost-level pricing, fully itemized. You see every call, its recording, and its outcome.", feat: false },
  { name: "Recovered revenue", price: "20%", sub: "Of revenue we win back", desc: "Our biggest line item only exists when your revenue comes back. No recovery, no commission.", feat: true },
];

const FAQ_ITEMS: [string, string][] = [
  ["How fast is the call after a cancellation?", "Minutes. Stripe or RevenueCat fires the cancellation event, AtllasX triggers, and the call goes out — day or night."],
  ["What can the AI offer my customers?", "Only what you approve: a discount, a pause, a downgrade. You set the ladder and the hard limits. It cannot exceed them."],
  ["Does the customer know it's an AI?", "Yes. Every call opens with a clear AI disclosure. No pretending."],
  ["What happens when someone isn't saved?", "The reason is captured and logged — price, missing feature, competitor — and synced to your systems. Every call produces data, saved or not."],
  ["Which billing systems do you support?", "Stripe and RevenueCat natively. Cancellation events can also come from webhooks or CSV upload."],
  ["What if the customer doesn't answer?", "AtllasX retries on a schedule you control, within quiet hours. Every attempt is logged."],
  ["How does pricing work?", "Three parts: a flat platform fee sized to your cancellation volume, 10¢ per call placed, and 20% of the revenue we recover. The commission is our biggest line item — it only exists when your revenue comes back."],
  ["What's the guarantee?", "If AtllasX doesn't make you money, you don't pay. Our fee structure is built around recovered revenue — no recovery, no commission. And you can cancel anytime."],
  ["Can it call my whole cancellation volume?", "Yes — 100% of cancellations, not a segment."],
  ["Are calls recorded?", "Yes. Every call is recorded, transcribed, and logged with its outcome and cancel reason."],
  ["Do you call anyone who isn't my customer?", "No. AtllasX only calls your own cancelled subscribers — never purchased lists, never cold contacts."],
  ["How long does setup take?", "Connect Stripe or RevenueCat, approve your offer ladder, and go live — most teams are calling the same day."],
  ["I came from atllas.com — is this the same company?", "Yes. Atllas is now AtllasX. Your account, login, and everything else carry over — nothing has changed on your end."],
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

/* Billing-stack strip — replaces the old customer marquee. This bar IS the ICP filter. */
function BillingStrip() {
  return (
    <div style={{ position: "relative", zIndex: 2, borderTop: "1px solid rgba(255,255,255,.10)", padding: "18px 0 24px" }}>
      <p className="ax-mono" style={{ textAlign: "center", fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.4)", marginBottom: 12 }}>
        Connect your billing stack. Live the same day.
      </p>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "baseline", gap: 28, flexWrap: "wrap", padding: "0 16px" }}>
        {["Stripe", "RevenueCat"].map((n) => (
          <span key={n} style={{ fontFamily: "var(--ax-head)", fontWeight: 700, fontSize: "1.5rem", letterSpacing: "-.02em", color: "rgba(255,255,255,.85)" }}>{n}</span>
        ))}
        <span aria-hidden="true" style={{ color: "rgba(255,255,255,.25)" }}>·</span>
        {["Slack", "HubSpot", "Zapier", "Webhooks"].map((n) => (
          <span key={n} style={{ fontFamily: "var(--ax-head)", fontWeight: 500, fontSize: "1rem", color: "rgba(255,255,255,.4)" }}>{n}</span>
        ))}
      </div>
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
            <h2 style={{ fontFamily: "var(--ax-head)", fontWeight: 800, fontSize: 22, letterSpacing: "-.02em", marginBottom: 6 }}>Get the winback call yourself</h2>
            <p style={{ color: "#666", fontSize: 14, marginBottom: 24 }}>Enter your details and AtllasX will call you the way it calls a cancelled subscriber.</p>
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

  const links: [string, string][] = [["ROI", "/roi"], ["Pricing", "/pricing"], ["Trust", "/trust"]];
  const sol: [string, string][] = [["How It Works", "/how-it-works"], ["Churn Intelligence", "/churn-intelligence"]];
  const linkColor = scrolled ? "var(--ax-ink)" : "#ffffff";

  return (
    <>
    <div ref={sentinelRef} style={{ position: "absolute", top: 80, height: 1, width: 1, pointerEvents: "none" }} aria-hidden="true" />
    <nav style={{ position: "relative", background: (scrolled || open) ? "#ffffff" : "transparent", backdropFilter: "none", borderBottom: scrolled ? "1px solid var(--ax-line)" : "none", transition: "background .28s ease, border-color .28s ease" }}>
      <div className="ax-wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, gap: 28 }}>
        <Link to="/" style={{ fontFamily: "var(--ax-head)", fontWeight: 700, fontSize: 20, letterSpacing: "-.03em", color: (scrolled || open) ? "var(--ax-ink)" : "#fff" }}>
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
          <button className="ax-navtoggle" onClick={() => setOpen(!open)} aria-label="Toggle menu" style={{ display: "none", background: "none", border: "none", color: (scrolled || open) ? "var(--ax-ink)" : "#fff", cursor: "pointer" }}>
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
    <section id="top" style={{ position: "relative", overflow: "hidden", background: "var(--ax-ink)", color: "#fff", marginTop: -64, minHeight: "calc(100vh - 37px)", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#15161B 0%,#101115 45%,#0B0C0F 100%)" }} />
      <video autoPlay muted loop playsInline preload="auto" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}>
        <source src={heroVideo} type="video/mp4" />
      </video>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(90deg, rgba(8,9,12,.86) 0%, rgba(8,9,12,.58) 45%, rgba(8,9,12,.3) 100%), linear-gradient(180deg, rgba(8,9,12,.4) 0%, transparent 28%, rgba(8,9,12,.55) 100%)" }} />
      <div className="ax-grain" style={{ position: "absolute", zIndex: 1 }} />

      <div className="ax-wrap" style={{ position: "relative", zIndex: 2, paddingTop: 200, paddingBottom: 160 }}>
        <Eyebrow light>Revenue recovery with AI calling</Eyebrow>
        <h1 style={{ fontFamily: "var(--ax-head)", fontWeight: 800, letterSpacing: "-.035em", lineHeight: 1.02, fontSize: "clamp(2.8rem, 6.5vw, 5.2rem)", margin: "22px 0 0", maxWidth: "16ch" }}>
          Recover cancelled subscriptions with AI calls.
        </h1>
        <p style={{ color: "rgba(255,255,255,.78)", fontSize: "clamp(1.05rem,1.6vw,1.3rem)", maxWidth: "50ch", marginTop: 24, lineHeight: 1.5 }}>
          For subscription businesses on Stripe or RevenueCat. Every cancelled subscriber gets a phone call instantly — with an offer you approved. Guaranteed results, or you don't pay.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 30, flexWrap: "wrap", alignItems: "center" }}>
          <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="ax-btn ax-btn-primary" style={{ padding: "13px 22px" }}>Book a demo <ArrowRight style={{ width: 16, height: 16 }} /></a>
          <button onClick={() => window.dispatchEvent(new CustomEvent("ax:livecall"))} className="ax-btn ax-btn-ghost" style={{ borderColor: "rgba(255,255,255,.28)", color: "#fff", padding: "13px 20px", cursor: "pointer" }}><Phone style={{ width: 15, height: 15 }} /> Get a live call</button>
        </div>
      </div>

      <BillingStrip />
    </section>
  );
}

/* One recovery, timestamped — the product in four rows. */
const FEED_ROWS: { t: string; tag: string; tagColor: string; text: string }[] = [
  { t: "14:42:17", tag: "CANCELLED", tagColor: "#f87171", text: "Sarah M. · Growth plan $349/mo · stripe: subscription.deleted" },
  { t: "14:43:02", tag: "CALLING", tagColor: "#7e9bff", text: "AtllasX connected · 45 seconds after the cancel event" },
  { t: "14:46:31", tag: "SAVED", tagColor: "var(--ax-live)", text: "Accepted 3-month 30% offer · reason logged: budget cut" },
  { t: "14:46:40", tag: "SYNCED", tagColor: "rgba(255,255,255,.5)", text: "Billing reactivated · CRM updated · Slack notified" },
];

function RecoveryFeed() {
  return (
    <section style={{ padding: "84px 0", borderTop: "1px solid var(--ax-line)" }}>
      <div className="ax-wrap ax-sol-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
        <div>
          <Eyebrow>One recovery, start to finish</Eyebrow>
          <h2 style={{ fontSize: "clamp(1.9rem,3.8vw,3rem)", marginTop: 16 }}>Four minutes. One customer back.</h2>
          <p style={{ color: "var(--ax-ink-2)", fontSize: "1.05rem", marginTop: 14, maxWidth: "46ch", lineHeight: 1.55 }}>
            The cancel event triggers the call. The call makes your offer. The save lands back in your billing, your CRM, and your Slack.
          </p>
          <Link to="/how-it-works" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 22, fontFamily: "var(--ax-head)", fontSize: 14, fontWeight: 500, color: "var(--ax-accent)" }}>See how it works <ArrowRight style={{ width: 15, height: 15 }} /></Link>
        </div>
        <div style={{ background: "var(--ax-ink)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 14, overflow: "hidden", boxShadow: "0 30px 70px -45px rgba(11,11,30,.5)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
            <span className="ax-mono" style={{ fontSize: 11, color: "rgba(255,255,255,.45)" }}>recoveries / live</span>
            <span className="ax-mono" style={{ fontSize: 10.5, color: "var(--ax-live)", background: "rgba(52,211,153,.12)", padding: "3px 8px", borderRadius: 5 }}>● LIVE</span>
          </div>
          <div style={{ padding: "8px 16px 14px" }}>
            {FEED_ROWS.map((r, i) => (
              <motion.div key={r.t} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.12 }} style={{ display: "grid", gridTemplateColumns: "76px 96px 1fr", gap: 12, alignItems: "baseline", padding: "11px 0", borderBottom: i < FEED_ROWS.length - 1 ? "1px solid rgba(255,255,255,.06)" : "none" }}>
                <span className="ax-mono" style={{ fontSize: 11, color: "rgba(255,255,255,.35)" }}>{r.t}</span>
                <span className="ax-mono" style={{ fontSize: 10, letterSpacing: ".08em", color: r.tagColor }}>{r.tag}</span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,.75)", lineHeight: 1.45 }}>{r.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  return (
    <section style={{ padding: "84px 0", borderTop: "1px solid var(--ax-line)", background: "var(--ax-paper-2)" }}>
      <div className="ax-wrap">
        <h2 style={{ fontSize: "clamp(1.9rem,3.8vw,3rem)", maxWidth: "22ch" }}>Built to do one job: bring cancelled revenue back.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 18, marginTop: 44 }}>
          {PILLARS.map(([h, p], i) => (
            <div key={h} style={{ border: "1px solid var(--ax-line)", borderRadius: 16, padding: 26, background: "#fff" }}>
              <div className="ax-mono" style={{ fontSize: 11, color: "var(--ax-accent)", marginBottom: 14 }}>{String(i + 1).padStart(2, "0")}</div>
              <h3 style={{ fontSize: "1.25rem", letterSpacing: "-.02em", lineHeight: 1.25 }}>{h}</h3>
              <p style={{ color: "var(--ax-ink-2)", fontSize: ".95rem", lineHeight: 1.55, marginTop: 10 }}>{p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Intent decay — published lead-response research, applied to the cancellation moment. */
function IntentDecaySection() {
  const bars: [string, number][] = [["5 min", 100], ["30 min", 10], ["1 hour", 4], ["24 hours", 1]];
  const stats: [string, string][] = [
    ["100×", "The odds of reaching someone collapse ~100× between minute 5 and minute 30 after a trigger event. (MIT / InsideSales Lead Response study)"],
    ["21×", "Contact within 5 minutes makes a conversion conversation 21× more likely than at 30 minutes. (Lead Response Management research)"],
    ["7×", "Responding within the hour makes a meaningful conversation 7× more likely than waiting even one hour more. (Harvard Business Review)"],
  ];
  return (
    <section style={{ padding: "84px 0", borderTop: "1px solid var(--ax-line)" }}>
      <div className="ax-wrap">
        <h2 style={{ fontSize: "clamp(1.9rem,3.8vw,3rem)", maxWidth: "20ch" }}>Intent dies in minutes. So we don't wait.</h2>
        <p style={{ color: "var(--ax-ink-2)", fontSize: "1.05rem", marginTop: 14, maxWidth: "62ch", lineHeight: 1.55 }}>
          A cancellation is a trigger event — the one moment your customer is thinking about you and willing to talk. Decades of response-time research say the same thing: the window closes in minutes.
        </p>
        <div className="ax-sol-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 40, marginTop: 40, alignItems: "center" }}>
          <div style={{ border: "1px solid var(--ax-line)", borderRadius: 16, padding: "24px 26px", background: "#fff" }}>
            <div className="ax-mono" style={{ fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ax-ink-3)", marginBottom: 18 }}>Odds of a live conversation, by response time</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 18, height: 180 }}>
              {bars.map(([label, h]) => (
                <div key={label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, height: "100%", justifyContent: "flex-end" }}>
                  <div style={{ width: "100%", height: `${h}%`, minHeight: 4, borderRadius: 6, background: h === 100 ? "var(--ax-live)" : "var(--ax-accent)", opacity: h === 100 ? 1 : 0.55 }} />
                  <span className="ax-mono" style={{ fontSize: 11, color: "var(--ax-ink-3)", whiteSpace: "nowrap" }}>{label}</span>
                </div>
              ))}
            </div>
            <p className="ax-mono" style={{ fontSize: 10, color: "var(--ax-ink-3)", marginTop: 16, lineHeight: 1.5 }}>Relative odds, published lead-response research (MIT/InsideSales; Harvard Business Review). Directional, not to scale.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {stats.map(([v, t]) => (
              <div key={v} style={{ display: "grid", gridTemplateColumns: "84px 1fr", gap: 18, alignItems: "start", border: "1px solid var(--ax-line)", borderRadius: 14, padding: "18px 20px", background: "#fff" }}>
                <div style={{ fontFamily: "var(--ax-head)", fontWeight: 800, fontSize: "1.7rem", letterSpacing: "-.02em" }}>{v}</div>
                <p style={{ color: "var(--ax-ink-2)", fontSize: ".93rem", lineHeight: 1.55 }}>{t}</p>
              </div>
            ))}
            <p style={{ color: "var(--ax-ink-2)", fontSize: ".97rem", lineHeight: 1.6, marginTop: 6 }}>
              That's the entire reason AtllasX exists as a call, not a campaign: the cancel event fires, and the phone rings <em>while the decision is still soft</em> — not in tomorrow's email digest.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* The guarantee — performance-aligned pricing as proof, not slogan. */
function GuaranteeSection() {
  const points = ["Our fee is a share of revenue we actually recover", "Cancel anytime — no lock-in, no minimum term", "Your data, recordings, and churn insights stay yours"];
  return (
    <section className="ax-dark" style={{ padding: "84px 0" }}>
      <div className="ax-wrap" style={{ textAlign: "center" }}>
        <div className="ax-mono" style={{ fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(255,255,255,.5)", marginBottom: 18 }}>The guarantee</div>
        <h2 style={{ fontSize: "clamp(2rem,4.5vw,3.4rem)", color: "#fff", maxWidth: "20ch", margin: "0 auto", lineHeight: 1.1 }}>If we don't make you money, you don't pay.</h2>
        <p style={{ color: "rgba(255,255,255,.65)", fontSize: "1.05rem", margin: "20px auto 0", maxWidth: "56ch", lineHeight: 1.6 }}>
          AtllasX is paid from the revenue it recovers. When nothing comes back, our biggest line item is zero. We believe AI should work this way — functional, in service of your business, and paid from the value it creates.
        </p>
        <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", marginTop: 28, color: "rgba(255,255,255,.7)", fontSize: 13.5 }}>
          {points.map((t) => (
            <span key={t} style={{ display: "inline-flex", gap: 7, alignItems: "center" }}><Check style={{ width: 15, height: 15, color: "var(--ax-live)" }} /> {t}</span>
          ))}
        </div>
        <div style={{ marginTop: 32 }}>
          <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="ax-btn ax-btn-primary" style={{ padding: "13px 24px" }}>Book a demo <ArrowRight style={{ width: 16, height: 16 }} /></a>
        </div>
      </div>
    </section>
  );
}

/* Dark section — churn intelligence dashboard mock. Illustrative product UI. */
function IntelligenceSection() {
  const rows: [string, string, string, string][] = [
    ["Sarah M.", "Budget cut — saved with 3-month 30% offer", "SAVED", "var(--ax-live)"],
    ["Marcus T.", "Low usage — saved with 2-month pause", "SAVED", "var(--ax-live)"],
    ["Dana R.", "Missing Snowflake integration — flagged for product", "LOGGED", "#f5c85a"],
    ["Priya K.", "No answer after 3 attempts — retry scheduled", "RETRY", "#7e9bff"],
  ];
  return (
    <section className="ax-dark" style={{ padding: "84px 0" }}>
      <div className="ax-wrap">
        <h2 style={{ fontSize: "clamp(1.9rem,3.8vw,3rem)", color: "#fff", maxWidth: "20ch" }}>Why they leave. From their own mouths.</h2>
        <p style={{ color: "rgba(255,255,255,.6)", fontSize: "1.05rem", marginTop: 14, maxWidth: "62ch" }}>Every call ends with a logged cancel reason — saved or not. Your churn report finally says why, not just how many.</p>
        <div className="ax-sol-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 18, marginTop: 40 }}>
          <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 14, padding: "18px 20px" }}>
            <div className="ax-mono" style={{ fontSize: 11, color: "rgba(255,255,255,.45)", marginBottom: 16 }}>cancel reasons / last 30 days</div>
            {REASONS.map(([label, pct]) => (
              <div key={label} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 5 }}>
                  <span style={{ color: "rgba(255,255,255,.75)" }}>{label}</span>
                  <span className="ax-mono" style={{ color: "rgba(255,255,255,.45)" }}>{pct}%</span>
                </div>
                <div style={{ height: 6, borderRadius: 4, background: "rgba(255,255,255,.06)" }}>
                  <div style={{ width: `${pct}%`, height: "100%", borderRadius: 4, background: "var(--ax-accent)", opacity: 0.9 }} />
                </div>
              </div>
            ))}
            <p className="ax-mono" style={{ fontSize: 10, color: "rgba(255,255,255,.3)", marginTop: 16 }}>Illustrative dashboard data.</p>
          </div>
          <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 14, padding: "18px 20px" }}>
            <div className="ax-mono" style={{ fontSize: 11, color: "rgba(255,255,255,.45)", marginBottom: 12 }}>recent winback calls</div>
            {rows.map(([n, d, t, c]) => (
              <div key={n} style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", padding: "11px 0", borderTop: "1px solid rgba(255,255,255,.06)" }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: "#f4f4f5" }}>{n}</div>
                  <div style={{ color: "rgba(255,255,255,.5)", fontSize: 12.5, marginTop: 2, lineHeight: 1.45 }}>{d}</div>
                </div>
                <span className="ax-mono" style={{ fontSize: 9.5, color: c, whiteSpace: "nowrap", marginTop: 2 }}>{t}</span>
              </div>
            ))}
            <Link to="/churn-intelligence" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 14, fontSize: 13, color: "#7e9bff", fontWeight: 500 }}>Explore churn intelligence <ArrowRight style={{ width: 14, height: 14 }} /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhoItsFor() {
  const cards: [string, string, string[]][] = [
    ["Stripe", "SaaS · web subscriptions · memberships", ["Triggers on subscription.deleted and cancellations at period end", "Winback offers applied straight to the Stripe subscription", "Saves show up as reactivations in your MRR"]],
    ["RevenueCat", "Mobile subscription apps", ["Triggers on cancellation and auto-renew-off events", "Offers built for app subscribers: pause, discount, plan switch", "Cancel reasons your app-store dashboard can't tell you"]],
  ];
  return (
    <section style={{ padding: "84px 0", borderTop: "1px solid var(--ax-line)", background: "var(--ax-paper-2)" }}>
      <div className="ax-wrap">
        <h2 style={{ fontSize: "clamp(1.9rem,3.8vw,3rem)", maxWidth: "24ch" }}>Charge with Stripe or RevenueCat? We can call your cancelled subscribers today.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 18, marginTop: 44 }}>
          {cards.map(([name, who, points]) => (
            <div key={name} style={{ border: "1px solid var(--ax-line)", borderRadius: 16, padding: 28, background: "#fff" }}>
              <div style={{ fontFamily: "var(--ax-head)", fontWeight: 800, fontSize: "1.6rem", letterSpacing: "-.02em" }}>{name}</div>
              <div className="ax-mono" style={{ fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ax-ink-3)", marginTop: 6 }}>{who}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 11, marginTop: 18 }}>
                {points.map((p) => (
                  <div key={p} style={{ display: "flex", gap: 9, fontSize: 14, color: "var(--ax-ink-2)", lineHeight: 1.5 }}><Check style={{ width: 16, height: 16, color: "var(--ax-live)", flex: "none", marginTop: 2 }} /> {p}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p style={{ color: "var(--ax-ink-3)", fontSize: 13, marginTop: 20 }}>On something else? Cancellation events can also arrive by webhook or CSV.</p>
      </div>
    </section>
  );
}

function StatsStrip() {
  const stats: [string, string][] = [
    ["Instant", "trigger on the cancel event"],
    ["100%", "of cancellations called"],
    ["24/7", "nights, weekends, holidays"],
    ["Every call", "recorded, transcribed, logged"],
  ];
  return (
    <section style={{ padding: "64px 0", borderTop: "1px solid var(--ax-line)" }}>
      <div className="ax-wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 18 }}>
        {stats.map(([v, l]) => (
          <div key={l}>
            <div style={{ fontFamily: "var(--ax-head)", fontWeight: 800, fontSize: "2rem", letterSpacing: "-.02em" }}>{v}</div>
            <div className="ax-mono" style={{ fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--ax-ink-3)", marginTop: 6 }}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Pricing() {
  const included = ["Stripe & RevenueCat triggers", "Pre-approved offer ladder", "Cancel reasons on every call", "Recordings & transcripts", "Slack & webhook alerts", "White-glove onboarding"];
  return (
    <section id="pricing" style={{ padding: "96px 0", borderTop: "1px solid var(--ax-line)" }}>
      <div className="ax-wrap">
        <h2 style={{ fontSize: "clamp(1.9rem,3.8vw,3rem)", marginTop: 16 }}>Pricing that only works if you do.</h2>
        <p style={{ color: "var(--ax-ink-2)", fontSize: "1.05rem", marginTop: 14, maxWidth: "62ch" }}>Three parts, all on the table. Most of what you pay is a share of revenue that came back — if we don't make you money, you don't pay.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 18, marginTop: 46 }}>
          {PRICING_MODEL.map((p) => {
            const dark = p.feat;
            return (
              <div key={p.name} style={{ display: "flex", flexDirection: "column", background: dark ? "var(--ax-ink)" : "var(--ax-paper)", color: dark ? "#fff" : "var(--ax-ink)", border: "1px solid " + (dark ? "var(--ax-ink)" : "var(--ax-line)"), borderRadius: 18, padding: 26 }}>
                <div className="ax-mono" style={{ fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: dark ? "rgba(255,255,255,.6)" : "var(--ax-ink-2)" }}>{p.name}</div>
                <div style={{ fontFamily: "var(--ax-head)", fontWeight: 800, fontSize: "2.3rem", letterSpacing: "-.02em", marginTop: 14 }}>{p.price}</div>
                <div style={{ fontSize: 13, color: dark ? "rgba(255,255,255,.55)" : "var(--ax-ink-3)", marginTop: 4 }}>{p.sub}</div>
                <p style={{ fontSize: 14, color: dark ? "rgba(255,255,255,.75)" : "var(--ax-ink-2)", lineHeight: 1.55, marginTop: 14, flex: 1 }}>{p.desc}</p>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 26, border: "1px solid var(--ax-line)", borderRadius: 16, padding: "22px 26px", display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center", justifyContent: "space-between", background: "var(--ax-paper-2)" }}>
          <div>
            <div style={{ fontFamily: "var(--ax-head)", fontWeight: 700, fontSize: "1.15rem", letterSpacing: "-.02em" }}>Every engagement includes:</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 22px", marginTop: 12 }}>
              {included.map((pt) => (
                <span key={pt} style={{ display: "inline-flex", gap: 8, alignItems: "center", fontSize: 13.5, color: "var(--ax-ink-2)" }}><Check style={{ width: 15, height: 15, color: "var(--ax-live)", flex: "none" }} /> {pt}</span>
              ))}
            </div>
          </div>
          <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="ax-btn ax-btn-primary" style={{ padding: "12px 22px", flex: "none" }}>Get your flat fee <ArrowRight style={{ width: 15, height: 15 }} /></a>
        </div>
        <p style={{ color: "var(--ax-ink-3)", fontSize: 13, marginTop: 22 }}>Connect Stripe or RevenueCat, approve your offers, go live — most teams call the same day. Cancel anytime.</p>
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
    ["Product", [["How It Works", "/how-it-works"], ["Churn Intelligence", "/churn-intelligence"], ["ROI", "/roi"], ["Pricing", "/pricing"], ["Trust", "/trust"]]],
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
          <h2 style={{ fontSize: "clamp(2.1rem,5vw,3.4rem)", letterSpacing: "-.03em", lineHeight: 1.05, color: "#fff", maxWidth: "22ch", margin: "0 auto" }}>Recover the revenue you already earned.</h2>
          <p style={{ color: "rgba(255,255,255,.65)", fontSize: "1.05rem", margin: "18px auto 28px", maxWidth: "50ch" }}>Book a demo and we'll run the math on your own cancellations. If AtllasX doesn't make you money, you don't pay.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="ax-btn ax-btn-primary" style={{ padding: "13px 24px" }}>Book a demo <ArrowRight style={{ width: 16, height: 16 }} /></a>
            <button onClick={() => window.dispatchEvent(new CustomEvent("ax:livecall"))} className="ax-btn ax-btn-ghost" style={{ borderColor: "rgba(255,255,255,.28)", color: "#fff", padding: "13px 22px", cursor: "pointer" }}><Phone style={{ width: 15, height: 15 }} /> Get a live call</button>
          </div>
          <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", marginTop: 26, color: "rgba(255,255,255,.5)", fontSize: 12.5 }}>
            {["Guaranteed results or you don't pay", "Same-day setup", "Cancel anytime"].map((t) => (
              <span key={t} style={{ display: "inline-flex", gap: 6, alignItems: "center" }}><Check style={{ width: 14, height: 14 }} /> {t}</span>
            ))}
          </div>
        </div>
        <div className="ax-foot" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr 1fr", gap: 16 }}>
          <div style={card}>
            <Link to="/" style={{ fontFamily: "var(--ax-head)", fontWeight: 700, fontSize: 20, letterSpacing: "-.03em", color: "#fff" }}>Atllas<span style={{ color: "var(--ax-accent)" }}>X</span></Link>
            <p style={{ color: "rgba(255,255,255,.55)", fontSize: 13, lineHeight: 1.6, marginTop: 14, maxWidth: "32ch" }}>Revenue recovery with AI calling.</p>
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
          <span className="ax-mono">They cancel. We call. They come back.</span>
        </div>
      </div>
    </footer>
  );
}

/* ============================== App ============================== */

function AtllasBridge() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const isAtllasRef = params.get("ref") === "atllas";
      const dismissed = sessionStorage.getItem("atllas-bridge-dismissed") === "1";
      if (isAtllasRef && !dismissed) setShow(true);
    } catch {}
  }, []);

  const dismiss = () => {
    try { sessionStorage.setItem("atllas-bridge-dismissed", "1"); } catch {}
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && dismiss()}
      style={{ position: "fixed", inset: 0, zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,.65)", backdropFilter: "blur(6px)" }}
    >
      <div style={{ background: "#0f0f12", border: "1px solid rgba(255,255,255,.1)", borderRadius: 20, padding: "44px 40px 36px", maxWidth: 480, width: "calc(100% - 48px)", position: "relative", boxShadow: "0 32px 80px rgba(0,0,0,.6)", textAlign: "center" }}>
        <button onClick={dismiss} aria-label="Close" style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,.3)", fontSize: 20, lineHeight: 1 }}>✕</button>
        <h2 style={{ fontFamily: "var(--ax-head)", fontWeight: 800, fontSize: "1.6rem", letterSpacing: "-.03em", color: "#fff", marginBottom: 12 }}>
          Atllas is now AtllasX.
        </h2>
        <p style={{ fontFamily: "var(--ax-body)", fontSize: 15, color: "rgba(255,255,255,.65)", lineHeight: 1.6, marginBottom: 8 }}>
          Your account, login, and everything else carry over — nothing has changed on your end.
        </p>
        <p style={{ fontFamily: "var(--ax-mono)", fontSize: 13.5, color: "rgba(255,255,255,.35)", marginBottom: 28, letterSpacing: ".04em" }}>
          Same team. Same product. New name.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <a href={LOGIN_URL} style={{ display: "block", background: "#fff", color: "#0a0a0a", padding: "13px 20px", borderRadius: 10, fontFamily: "var(--ax-body)", fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
            Log in to your account →
          </a>
          <button onClick={dismiss} style={{ background: "none", border: "1px solid rgba(255,255,255,.12)", color: "rgba(255,255,255,.55)", padding: "12px 20px", borderRadius: 10, fontFamily: "var(--ax-body)", fontWeight: 500, fontSize: 14, cursor: "pointer" }}>
            Explore AtllasX
          </button>
        </div>
      </div>
    </div>
  );
}

const ANNOUNCEMENTS = [
  { text: "For subscription businesses on Stripe & RevenueCat", href: null },
  { text: "Try it for yourself. Call (415) 969-4084", href: "tel:+14159694084" },
];

function AnnouncementBar() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % ANNOUNCEMENTS.length);
        setVisible(true);
      }, 350);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const item = ANNOUNCEMENTS[idx];
  return (
    <div style={{ position: "relative", background: "#000", padding: "8px 16px", textAlign: "center", fontFamily: "var(--ax-mono)", fontSize: 12.5, color: "rgba(255,255,255,.75)", letterSpacing: ".04em" }}>
      {item.href ? (
        <a href={item.href} style={{ color: "inherit", textDecoration: "none", transition: "opacity .35s", opacity: visible ? 1 : 0, display: "inline-block" }}>
          {item.text}
        </a>
      ) : (
        <span style={{ transition: "opacity .35s", opacity: visible ? 1 : 0, display: "inline-block" }}>
          {item.text}
        </span>
      )}
    </div>
  );
}

const ROUTE_TITLES: Record<string, string> = {
  "/": "AtllasX | Recover Cancelled Subscriptions with AI Calls",
  "/how-it-works": "How It Works | AtllasX",
  "/churn-intelligence": "Churn Intelligence | AtllasX",
  "/roi": "ROI | AtllasX",
  "/pricing": "Pricing | AtllasX",
  "/trust": "Trust & Compliance | AtllasX",
};

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
        @keyframes axwave { from { transform: scaleY(.45); } to { transform: scaleY(1); } }
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

      <div style={{ position: "sticky", top: 0, zIndex: 50 }}>
        <AtllasBridge />
        <AnnouncementBar />
        <Nav />
      </div>
      <ScrollTop />
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
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    document.getElementById("top")?.scrollIntoView({ block: "start" });
    document.title = ROUTE_TITLES[loc.pathname] ?? ROUTE_TITLES["/"];
  }, [loc.pathname]);
  return null;
}

function HomePage() {
  return (
    <>
      <Hero />
      <RecoveryFeed />
      <IntentDecaySection />
      <Pillars />
      <IntelligenceSection />
      <WhoItsFor />
      <StatsStrip />
      <GuaranteeSection />
      <Pricing />
      <FAQ />
    </>
  );
}

function DarkHeader({ eyebrow, title, sub, children }: { eyebrow: string; title: string; sub?: string; children?: React.ReactNode }) {
  return (
    <section style={{ background: "var(--ax-ink)", color: "#fff", marginTop: -64, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(60% 70% at 72% 0%, rgba(31,91,255,.16), transparent 70%)" }} />
      <div className="ax-wrap" style={{ position: "relative", zIndex: 2, paddingTop: 200, paddingBottom: 120 }}>
        <div className="ax-mono" style={{ fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(255,255,255,.55)", marginBottom: 16 }}>{eyebrow}</div>
        <h1 style={{ fontFamily: "var(--ax-head)", fontWeight: 800, letterSpacing: "-.03em", fontSize: "clamp(2.4rem,5vw,3.8rem)", lineHeight: 1.05, maxWidth: "20ch" }}>{title}</h1>
        {sub && <p style={{ color: "rgba(255,255,255,.7)", fontSize: "1.15rem", marginTop: 18, maxWidth: "56ch", lineHeight: 1.5 }}>{sub}</p>}
        {children}
      </div>
      <BillingStrip />
    </section>
  );
}

/* Product mock cards */
function ProductMock({ which }: { which: string }) {
  const base: React.CSSProperties = { background: "#fff", border: "1px solid var(--ax-line)", borderRadius: 14, overflow: "hidden", boxShadow: "0 30px 70px -45px rgba(11,11,30,.35)" };
  const head = (label: string) => (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "var(--ax-paper-2)", borderBottom: "1px solid var(--ax-line)" }}>
      <span className="ax-mono" style={{ fontSize: 11, color: "var(--ax-ink-3)" }}>{label}</span>
      <span className="ax-mono" style={{ fontSize: 10.5, color: "var(--ax-live)", background: "rgba(15,169,104,.1)", padding: "3px 8px", borderRadius: 5 }}>● LIVE</span>
    </div>
  );
  if (which === "winback") {
    return (
      <div style={base}>
        {head("recoveries / in-progress")}
        <div style={{ padding: 18 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", paddingBottom: 14, borderBottom: "1px solid var(--ax-line)" }}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "var(--ax-paper-2)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, color: "var(--ax-ink-2)" }}>SM</div>
            <div><div style={{ fontWeight: 600 }}>Cancelled · Growth $349/mo</div><div className="ax-mono" style={{ fontSize: 11, color: "var(--ax-ink-3)", marginTop: 2 }}>stripe: subscription.deleted · 14:42:17</div></div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 0" }}><Wave active /><span className="ax-mono" style={{ fontSize: 12, color: "var(--ax-ink-2)" }}>calling · 45s after cancel…</span></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            {[["Status", "Connected"], ["Offer", "30% × 3 mo"], ["Outcome", "Saved"]].map(([k, v]) => (
              <div key={k}><div className="ax-mono" style={{ fontSize: 9.5, textTransform: "uppercase", color: "var(--ax-ink-3)" }}>{k}</div><div style={{ fontSize: 14, fontWeight: 600, color: k === "Outcome" ? "var(--ax-live)" : "var(--ax-ink)", marginTop: 3 }}>{v}</div></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  /* insights */
  return (
    <div style={base}>
      {head("churn / reasons / last-30-days")}
      <div style={{ padding: 18 }}>
        {REASONS.map(([label, pct]) => (
          <div key={label} style={{ marginBottom: 13 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, marginBottom: 5 }}>
              <span style={{ color: "var(--ax-ink-2)" }}>{label}</span>
              <span className="ax-mono" style={{ color: "var(--ax-ink-3)" }}>{pct}%</span>
            </div>
            <div style={{ height: 6, borderRadius: 4, background: "var(--ax-paper-2)" }}>
              <div style={{ width: `${pct}%`, height: "100%", borderRadius: 4, background: "var(--ax-accent)", opacity: 0.9 }} />
            </div>
          </div>
        ))}
        <p className="ax-mono" style={{ fontSize: 10, color: "var(--ax-ink-3)", marginTop: 14 }}>Illustrative dashboard data.</p>
      </div>
    </div>
  );
}

const SOLUTION_PAGES: Record<string, any> = {
  how: {
    id: "how", eyebrow: "How It Works",
    h1: "Cancel. Call. Offer. Back.",
    sub: "From the cancellation event to a reactivated subscription — automatically, in minutes.",
    mock: "winback", line: ["They cancel", "We call in minutes", "Your offer", "Saved — or reason logged"],
    intro: "AtllasX watches your billing system. The moment a subscription is cancelled, it calls that customer with full account context and an offer you approved.",
    caps: ["Triggers on Stripe & RevenueCat cancel events", "Calls within minutes, 24/7", "Personalized from the customer's own account", "Offers only what you pre-approved", "Retries on your schedule, within quiet hours", "Every outcome synced to billing, CRM, Slack"],
    stepsHead: "Five steps. Zero touch.",
    stepsSub: "Your team does nothing. The system closes the loop either way.",
    steps: [
      ["01", "They cancel", "Stripe fires subscription.deleted, or RevenueCat fires the cancellation event. Webhook and CSV work too."],
      ["02", "We call in minutes", "The call goes out while the decision is still soft — 2am cancels included."],
      ["03", "We make your offer", "Discount, pause, or downgrade — your ladder, your hard limits. The caller can't give away the store."],
      ["04", "They come back — or tell us why not", "Saves are applied to billing on the spot. Non-saves end with the reason captured."],
      ["05", "Your systems update", "Billing reactivated or reason logged. CRM, Slack, and webhooks notified. Recording and transcript attached."],
    ],
    call: 1, callSub: "A winback call after a RevenueCat cancellation — saved with a pause instead of a discount.",
    integHead: "Plugs into your billing stack.",
    integSub: "Native triggers from the systems that own your subscriptions.",
    integ: [["Billing triggers", ["Stripe", "RevenueCat", "Webhooks", "CSV upload"]], ["Offers applied to", ["Stripe subscriptions", "RevenueCat entitlements"]], ["Outcomes sync to", ["Slack alerts", "HubSpot", "Zapier", "Webhooks"]]],
    faq: [
      ["What exactly can the AI offer?", "Only what you approve: specific discounts, pause lengths, or downgrades, in the order you set. It cannot exceed the ladder — ever."],
      ["How fast is 'minutes'?", "The call is triggered the moment the cancellation event arrives. Timing is yours to control, including quiet-hours rules by time zone."],
      ["What if they don't pick up?", "Retries run on your schedule. Every attempt is logged, and you decide when to stop."],
      ["Is the AI disclosed?", "Yes. Every call opens by identifying itself as an AI assistant calling for your business."],
    ],
  },
  intel: {
    id: "intel", eyebrow: "Churn Intelligence",
    h1: "Why they leave. From their own mouths.",
    sub: "Every winback call ends with a logged cancel reason — saved or not. Exit surveys get single-digit response. Phone calls get answered.",
    mock: "insights", line: ["Call happens", "Reason captured", "Structured & logged", "In your dashboard"],
    intro: "A cancelled subscriber will tell a phone call what they'd never type into a survey box. AtllasX captures it on every call and hands it back as structured data.",
    caps: ["Cancel reason on every completed call", "Competitor and price mentions captured", "Structured taxonomy — not free-text soup", "Full recordings and transcripts", "Dashboard, CSV export, and webhooks", "Product-team flags for feature gaps"],
    stepsHead: "From conversation to churn report.",
    stepsSub: "Every call is a data point. Here's the path.",
    steps: [
      ["01", "The conversation happens", "Saved or not, the customer says why they cancelled."],
      ["02", "The reason is structured", "Price, usage, missing feature, competitor — tagged into a consistent taxonomy."],
      ["03", "Signals are extracted", "Competitor names, price points, and feature requests are pulled out and labeled."],
      ["04", "It lands where you work", "Dashboard, CSV, webhooks, CRM fields, and Slack — your churn report finally says why."],
    ],
    call: 2, callSub: "A call that didn't save the customer — and still produced the data that matters.",
    integHead: "Your churn data, where you want it.",
    integSub: "Structured output on every call, exportable everywhere.",
    integ: [["In the dashboard", ["Reason breakdown", "Recordings & transcripts", "Outcome per call"]], ["Exports", ["CSV export", "Webhooks", "API access"]], ["Alerts", ["Slack notifications", "HubSpot sync", "Zapier"]]],
    faq: [
      ["Who owns the data?", "You do. Recordings, transcripts, and structured reasons are yours — export or delete them at any time."],
      ["How accurate is the reason tagging?", "Every tag is attached to its recording and transcript, so you can audit any call in one click."],
      ["Can my product team use this?", "Yes — feature-gap mentions are flagged and exportable, with the customer's exact words attached."],
      ["What about PII?", "Subscriber data is used only to make and log your calls. Retention and deletion windows are configurable. See Trust for the full posture."],
    ],
  },
};

const SOL_LINKS: Record<string, { to: string; label: string; title: string; blurb: string }> = {
  how: { to: "/how-it-works", label: "How It Works", title: "Cancel. Call. Offer. Back.", blurb: "From cancellation event to reactivated subscription — automatically, in minutes." },
  intel: { to: "/churn-intelligence", label: "Churn Intelligence", title: "Why they leave.", blurb: "Every call ends with a logged cancel reason. Your churn report finally says why." },
  roi: { to: "/roi", label: "ROI", title: "You already paid for these customers.", blurb: "Winning one back costs a fraction of replacing them. Run your own numbers." },
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
            <div className="ax-mono" style={{ fontSize: 9.5, letterSpacing: ".06em", marginBottom: 3, color: row[0] === "agent" ? "var(--ax-accent)" : "var(--ax-live)" }}>{row[0] === "agent" ? "AI AGENT" : "CUSTOMER"}</div>
            <div style={{ fontSize: 13, color: "var(--ax-ink-2)", lineHeight: 1.45 }}>{row[1]}</div>
          </div>
        ))}
      </div>
      <div className="ax-mono" style={{ fontSize: 11, color: "var(--ax-live)", marginTop: 14, paddingTop: 12, borderTop: "1px solid var(--ax-line)" }}>{call.outcome}</div>
      <p className="ax-mono" style={{ fontSize: 10.5, color: "var(--ax-ink-3)", marginTop: 8 }}>Product demonstration. Customers are speaking with a disclosed AI agent.</p>
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
      <DarkHeader eyebrow={data.eyebrow} title={data.h1} sub={data.sub}>
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
          <h2 style={{ fontSize: "clamp(1.9rem,3.8vw,3rem)" }}>Hear a winback call.</h2>
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
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "84px 0", borderTop: "1px solid var(--ax-line)" }}>
        <div className="ax-wrap" style={{ maxWidth: 820 }}>
          <h2 style={{ fontSize: "clamp(1.9rem,3.8vw,3rem)" }}>Questions, answered.</h2>
          <FaqList items={data.faq} />
        </div>
      </section>

      {/* Explore */}
      <section style={{ padding: "84px 0", borderTop: "1px solid var(--ax-line)" }}>
        <div className="ax-wrap">
          <h2 style={{ fontSize: "clamp(1.9rem,3.8vw,3rem)" }}>Keep going.</h2>
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
              <h3 style={{ fontSize: "1.25rem", margin: "12px 0 8px", letterSpacing: "-.02em" }}>You pay when it works.</h3>
              <p style={{ color: "var(--ax-ink-2)", fontSize: ".94rem", lineHeight: 1.5 }}>Flat fee + 10¢ a call + 20% of recovered revenue. If we don't make you money, you don't pay.</p>
              <span style={{ color: "var(--ax-accent)", fontWeight: 500, fontSize: 14, marginTop: 16, display: "inline-flex", alignItems: "center", gap: 6 }}>See pricing <ArrowRight style={{ width: 15, height: 15 }} /></span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* ============================== ROI Page ============================== */

function money(n: number) {
  return "$" + Math.round(n).toLocaleString("en-US");
}

function RoiCalculator() {
  const [cancels, setCancels] = useState(500);
  const [arpu, setArpu] = useState(49);
  const [lifetime, setLifetime] = useState(12);

  const rates: [string, number][] = [["Conservative", 0.05], ["Typical", 0.1], ["Strong", 0.2]];
  const num = (v: string, fallback: number) => {
    const n = Number(v);
    return Number.isFinite(n) && n >= 0 ? n : fallback;
  };
  const inputStyle: React.CSSProperties = { width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid var(--ax-line)", fontSize: 16, fontFamily: "var(--ax-body)", background: "#fff", boxSizing: "border-box" };
  const label: React.CSSProperties = { fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ax-ink-3)", marginBottom: 8, display: "block" };

  return (
    <section style={{ padding: "84px 0", borderTop: "1px solid var(--ax-line)" }}>
      <div className="ax-wrap">
        <h2 style={{ fontSize: "clamp(1.9rem,3.8vw,3rem)" }}>Run your own numbers.</h2>
        <p style={{ color: "var(--ax-ink-2)", fontSize: "1.05rem", marginTop: 14, maxWidth: "60ch" }}>Three inputs. The math is shown, and the assumptions are yours to change.</p>
        <div className="ax-sol-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 40, marginTop: 40, alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <span className="ax-mono" style={label}>Cancellations per month</span>
              <input type="number" min={0} value={cancels} onChange={(e) => setCancels(num(e.target.value, 0))} style={inputStyle} />
            </div>
            <div>
              <span className="ax-mono" style={label}>Average revenue per subscriber ($/mo)</span>
              <input type="number" min={0} value={arpu} onChange={(e) => setArpu(num(e.target.value, 0))} style={inputStyle} />
            </div>
            <div>
              <span className="ax-mono" style={label}>Months a saved subscriber stays (avg)</span>
              <input type="number" min={0} value={lifetime} onChange={(e) => setLifetime(num(e.target.value, 0))} style={inputStyle} />
            </div>
            <p style={{ fontSize: 12.5, color: "var(--ax-ink-3)", lineHeight: 1.55 }}>
              Formula: cancellations × winback rate × revenue per subscriber × months retained × 12 months of cancellations. Winback rates vary by offer, price point, and audience — these tiers are planning assumptions, not a promise.
            </p>
          </div>
          <div style={{ display: "grid", gap: 14 }}>
            {rates.map(([name, r]) => {
              const savedPerMonth = cancels * r;
              const annual = savedPerMonth * arpu * lifetime * 12;
              return (
                <div key={name} style={{ border: "1px solid var(--ax-line)", borderRadius: 16, padding: "22px 24px", background: name === "Typical" ? "var(--ax-ink)" : "#fff", color: name === "Typical" ? "#fff" : "var(--ax-ink)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8 }}>
                    <span className="ax-mono" style={{ fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: name === "Typical" ? "rgba(255,255,255,.6)" : "var(--ax-ink-3)" }}>{name} · {Math.round(r * 100)}% winback</span>
                    <span className="ax-mono" style={{ fontSize: 12, color: name === "Typical" ? "rgba(255,255,255,.6)" : "var(--ax-ink-3)" }}>{Math.round(savedPerMonth).toLocaleString("en-US")} subscribers saved / mo</span>
                  </div>
                  <div style={{ fontFamily: "var(--ax-head)", fontWeight: 800, fontSize: "2.2rem", letterSpacing: "-.02em", marginTop: 10 }}>{money(annual)}<span style={{ fontSize: "1rem", fontWeight: 500, opacity: 0.6 }}> revenue recovered / yr</span></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function RoiPage() {
  const facts: [string, string][] = [
    ["5–7×", "Acquiring a new customer costs five to seven times more than keeping one. A winback call spends pennies against that."],
    ["30–60 days", "The winback window. After ~60 days, cancelled subscribers have replaced you — before that, they still answer."],
    ["Phone > email", "Winback emails recover single digits. A ringing phone gets answered, and an answered call can negotiate."],
  ];
  return (
    <>
      <DarkHeader eyebrow="ROI" title="You already paid for these customers once." sub="Winning one back costs a fraction of replacing them. Run your own cancellation volume through the math.">
        <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap", alignItems: "center" }}>
          <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="ax-btn ax-btn-primary" style={{ padding: "13px 22px" }}>Book a demo <ArrowRight style={{ width: 16, height: 16 }} /></a>
        </div>
      </DarkHeader>
      <RoiCalculator />
      <section style={{ padding: "84px 0", borderTop: "1px solid var(--ax-line)", background: "var(--ax-paper-2)" }}>
        <div className="ax-wrap">
          <h2 style={{ fontSize: "clamp(1.9rem,3.8vw,3rem)" }}>Why winback wins.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 18, marginTop: 40 }}>
            {facts.map(([v, t]) => (
              <div key={v} style={{ border: "1px solid var(--ax-line)", borderRadius: 16, padding: 26, background: "#fff" }}>
                <div style={{ fontFamily: "var(--ax-head)", fontWeight: 800, fontSize: "1.9rem", letterSpacing: "-.02em" }}>{v}</div>
                <p style={{ color: "var(--ax-ink-2)", fontSize: ".97rem", lineHeight: 1.6, marginTop: 12 }}>{t}</p>
              </div>
            ))}
          </div>
          <p style={{ color: "var(--ax-ink-3)", fontSize: 12.5, marginTop: 20, maxWidth: "80ch" }}>Figures above are subscription-industry benchmarks for planning. Your recovery numbers come from your own dashboard once you're live.</p>
        </div>
      </section>
      <section style={{ padding: "84px 0", borderTop: "1px solid var(--ax-line)" }}>
        <div className="ax-wrap" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(1.9rem,3.8vw,3rem)", maxWidth: "24ch", margin: "0 auto" }}>See the math on your own cancellations.</h2>
          <p style={{ color: "var(--ax-ink-2)", fontSize: "1.05rem", margin: "16px auto 26px", maxWidth: "52ch" }}>Book a demo — we'll walk your last 90 days of cancellations through the calls that would have gone out.</p>
          <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="ax-btn ax-btn-primary" style={{ padding: "13px 24px" }}>Book a demo <ArrowRight style={{ width: 16, height: 16 }} /></a>
        </div>
      </section>
    </>
  );
}

/* ============================== Trust Page ============================== */

function TrustPage() {
  const pillars: [string, string][] = [
    ["Your customers only", "AtllasX calls people who subscribed to your product and just cancelled — an existing relationship, a known identity, contact details they gave you."],
    ["AI disclosed on every call", "Every call opens by identifying itself as an AI assistant calling for your business. No pretending to be human."],
    ["Opt-out, honored instantly", "'Don't call me again' ends it — the number is suppressed across all future campaigns, automatically."],
    ["Quiet hours by time zone", "Calls go out inside calling windows appropriate to each customer's local time. A 2am cancel gets a morning call."],
    ["Audit log on every call", "Recording, transcript, timestamp, outcome, and offer made — retained and exportable for every single call."],
    ["Offer guardrails", "The AI can only extend offers you pre-approved. Every offer made is logged against your ladder."],
  ];
  const security: [string, string][] = [
    ["Subscriber data, scoped", "Account data is used to make and log your winback calls. Nothing else."],
    ["Retention you control", "Recording and transcript retention windows are configurable — including deletion on request."],
    ["Export & delete anytime", "Your data is yours: full export by CSV or API, deletion on demand."],
  ];
  const refused = [
    "Purchased or scraped contact lists",
    "Calls to people who were never your customers",
    "Cold outbound of any kind",
    "Undisclosed AI on any call",
  ];
  return (
    <>
      <DarkHeader eyebrow="Trust & Compliance" title="We only call your customers. Never lists." sub="Winback calls go to people with an existing relationship with your business — the cleanest category of outbound there is. Here's the posture, in full.">
        <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap", alignItems: "center" }}>
          <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="ax-btn ax-btn-primary" style={{ padding: "13px 22px" }}>Book a demo <ArrowRight style={{ width: 16, height: 16 }} /></a>
        </div>
      </DarkHeader>

      <section style={{ padding: "84px 0", borderTop: "1px solid var(--ax-line)" }}>
        <div className="ax-wrap">
          <h2 style={{ fontSize: "clamp(1.9rem,3.8vw,3rem)" }}>Six commitments. Built in, not bolted on.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 18, marginTop: 40 }}>
            {pillars.map(([h, p], i) => (
              <div key={h} style={{ border: "1px solid var(--ax-line)", borderRadius: 16, padding: 26, background: "#fff" }}>
                <div className="ax-mono" style={{ fontSize: 11, color: "var(--ax-accent)", marginBottom: 12 }}>{String(i + 1).padStart(2, "0")}</div>
                <h3 style={{ fontSize: "1.15rem", letterSpacing: "-.02em" }}>{h}</h3>
                <p style={{ color: "var(--ax-ink-2)", fontSize: ".95rem", lineHeight: 1.6, marginTop: 8 }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "84px 0", borderTop: "1px solid var(--ax-line)", background: "var(--ax-paper-2)" }}>
        <div className="ax-wrap">
          <h2 style={{ fontSize: "clamp(1.9rem,3.8vw,3rem)" }}>Your subscribers' data, handled like it's yours. Because it is.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 18, marginTop: 40 }}>
            {security.map(([h, p]) => (
              <div key={h} style={{ border: "1px solid var(--ax-line)", borderRadius: 16, padding: 26, background: "#fff" }}>
                <h3 style={{ fontSize: "1.15rem", letterSpacing: "-.02em" }}>{h}</h3>
                <p style={{ color: "var(--ax-ink-2)", fontSize: ".95rem", lineHeight: 1.6, marginTop: 8 }}>{p}</p>
              </div>
            ))}
          </div>
          <p style={{ color: "var(--ax-ink-3)", fontSize: 13, marginTop: 20 }}>Security documentation and data-processing details available on request — <a href="mailto:info@atllas.com" style={{ color: "var(--ax-accent)" }}>info@atllas.com</a>.</p>
        </div>
      </section>

      <section style={{ padding: "84px 0", borderTop: "1px solid var(--ax-line)" }}>
        <div className="ax-wrap">
          <h2 style={{ fontSize: "clamp(1.9rem,3.8vw,3rem)" }}>What we refuse to do.</h2>
          <p style={{ color: "var(--ax-ink-2)", fontSize: "1.05rem", marginTop: 14, maxWidth: "60ch" }}>The product only works because the calls are wanted. So these are hard no's:</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 14, marginTop: 32 }}>
            {refused.map((r) => (
              <div key={r} style={{ display: "flex", gap: 10, alignItems: "flex-start", border: "1px solid var(--ax-line)", borderRadius: 12, padding: "16px 18px", fontSize: 14.5, color: "var(--ax-ink-2)" }}>
                <X style={{ width: 17, height: 17, color: "#e05d5d", flex: "none", marginTop: 2 }} /> {r}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ============================== Pricing Page ============================== */

function PricingPage() {
  return (
    <>
      <DarkHeader eyebrow="Pricing" title="If we don't make you money, you don't pay." sub="A flat platform fee sized to your volume, 10¢ a call, and 20% of the revenue we recover. Our incentives are your incentives.">
        <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap", alignItems: "center" }}>
          <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="ax-btn ax-btn-primary" style={{ padding: "13px 22px" }}>Book a demo <ArrowRight style={{ width: 16, height: 16 }} /></a>
          <button onClick={() => window.dispatchEvent(new CustomEvent("ax:livecall"))} className="ax-btn ax-btn-ghost" style={{ borderColor: "rgba(255,255,255,.28)", color: "#fff", padding: "13px 20px", cursor: "pointer" }}><Phone style={{ width: 15, height: 15 }} /> Get a live call</button>
        </div>
        <div className="ax-mono" style={{ display: "inline-block", marginTop: 26, fontSize: 13, color: "rgba(255,255,255,.72)", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 10, padding: "12px 14px" }}>
          {["Connect billing", "Approve offers", "Go live", "Watch saves land"].map((s, i, arr) => (
            <span key={i}>{s}{i < arr.length - 1 && <span style={{ color: "#7e9bff", margin: "0 6px" }}>→</span>}</span>
          ))}
        </div>
      </DarkHeader>
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
          <Route path="/how-it-works" element={<SolutionPage data={SOLUTION_PAGES.how} />} />
          <Route path="/churn-intelligence" element={<SolutionPage data={SOLUTION_PAGES.intel} />} />
          <Route path="/roi" element={<RoiPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/trust" element={<TrustPage />} />
          {/* Legacy routes → home */}
          <Route path="/speed-to-lead" element={<Navigate to="/how-it-works" replace />} />
          <Route path="/outbound-calling" element={<Navigate to="/how-it-works" replace />} />
          <Route path="/ai-receptionist" element={<Navigate to="/how-it-works" replace />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}
