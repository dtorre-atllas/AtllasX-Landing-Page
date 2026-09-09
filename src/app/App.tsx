import { ArrowUpRight, ArrowRight, X, Plus, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, Navigate, Route, Routes, useLocation } from "react-router";
import ribbons from "../assets/recovery-ribbons.png";
import { Measurement } from "./site/Measurement";
import { Workflow } from "./site/Workflow";
import {
  DemoPage,
  HowPage,
  MeasurementPage,
  NotFound,
  PricingPage,
  TrustPage,
  pageMeta,
} from "./site/Pages";
import { Intercom, openChat } from "./components/Intercom";
import logo from "../../hyzl-logo-kit/hyzl-logo.svg";

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  const Icon = diagonal ? ArrowUpRight : ArrowRight;
  return <Icon className="arrow" aria-hidden="true" />;
}
export function DemoLink({
  children = "Book a demo",
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <Link className={"button " + className} to="/demo">
      {children}
      <Arrow />
    </Link>
  );
}
function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  return (
    <header className="header">
      <Link to="/" aria-label="hyzl home" className="brand">
        <img src={logo} alt="hyzl" width="166" height="46" />
      </Link>
      <nav
        aria-label="Main navigation"
        className={open ? "navigation is-open" : "navigation"}
      >
        <Link to="/how-it-works">How it works</Link>
        <Link to="/churn-intelligence">Measurement</Link>
        <DemoLink />
      </nav>
      <button
        className="menu-toggle"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? "Close" : "Menu"}{" "}
        {open ? (
          <X className="inline-arrow" aria-hidden="true" />
        ) : (
          <Menu className="inline-arrow" aria-hidden="true" />
        )}
      </button>
    </header>
  );
}
function RecoveryFigure() {
  const [open, setOpen] = useState(false);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReduced(preference.matches);
      if (preference.matches) setRunning(false);
    };
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setRunning(false);
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  const toggle = () => {
    setOpen(!open);
    setPaused(false);
    setRunning(!open && !reduced);
  };
  return (
    <figure
      className="recovery-figure"
      aria-label="Illustration comparing customers reached by hyzl with a randomized holdout group over time"
    >
      <img
        className="recovery-ribbons"
        src={ribbons}
        alt=""
        width="2172"
        height="724"
        {...{ fetchpriority: "high" }}
      />
      {open && running && (
        <svg
          className="recovery-trace"
          viewBox="0 0 1000 300"
          preserveAspectRatio="none"
          aria-hidden="true"
          style={{ animationPlayState: paused ? "paused" : "running" }}
        >
          <path d="M 467 130 C 640 128 727 42 911 29" pathLength="1" />
          <path
            className="control-trace"
            d="M 467 130 C 623 161 731 184 911 164"
            pathLength="1"
            onAnimationEnd={() => setRunning(false)}
          />
        </svg>
      )}
      <div className="outreach-marker">
        <span>Outreach</span>
        <i />
        <button
          aria-label="Explain the outreach point"
          aria-expanded={open}
          aria-controls="outreach-note"
          onClick={toggle}
        />
        <i className="lower-guide" />
      </div>
      <span className="endpoint treated-end" aria-hidden="true" />
      <span className="endpoint control-end" aria-hidden="true" />
      {open && (
        <div className="outreach-note" id="outreach-note">
          <button
            className="note-close"
            aria-label="Close outreach explanation"
            onClick={() => {
              setOpen(false);
              setRunning(false);
            }}
          >
            <X size={18} aria-hidden="true" />
          </button>
          <strong>See what hyzl adds.</strong>
          <p>
            We randomly leave some eligible customers without outreach.
            Comparing the two groups shows what hyzl adds.
          </p>
          {!reduced && (
            <button
              className="trace-control"
              onClick={() => {
                if (running) setPaused(!paused);
                else {
                  setRunning(true);
                  setPaused(false);
                }
              }}
            >
              {running
                ? paused
                  ? "Resume trace"
                  : "Pause trace"
                : "Replay trace"}
            </button>
          )}
        </div>
      )}
      <span className="ribbon-label treated">With hyzl</span>
      <span className="ribbon-label control">Without hyzl</span>
      <figcaption>Illustrative diagram</figcaption>
      <div className="time-axis">
        Time <ArrowRight size={18} aria-hidden="true" />
      </div>
    </figure>
  );
}
function Home() {
  return (
    <main id="main" tabIndex={-1}>
      <section className="hero">
        <div className="hero-top">
          <h1>
            Recover lost
            <br />
            revenue<span>.</span>
          </h1>
          <div className="hero-intro">
            <p>
              hyzl brings subscription customers back with AI. You pay only for
              the revenue it adds.
            </p>
            <DemoLink />
            <Link className="text-link" to="/how-it-works">
              See how it works <Arrow />
            </Link>
            <small>For subscription apps on Stripe and RevenueCat</small>
          </div>
        </div>
        <RecoveryFigure />
      </section>
      <section className="proof section">
        <div className="section-heading">
          <h2>
            The result is the difference<span className="accent-period">.</span>
          </h2>
          <p>Every purchase is confirmed in your billing system.</p>
        </div>
        <Measurement />
      </section>
      <Workflow />
      <section className="incentive section">
        <h2>
          We earn
          <br />
          when you do<span>.</span>
        </h2>
        <div>
          <p>
            hyzl does the recovery work. You pay a share of the incremental
            revenue it adds.
          </p>
          <Link className="text-link" to="/pricing">
            How the model works{" "}
            <ArrowUpRight className="inline-arrow" aria-hidden="true" />
          </Link>
        </div>
      </section>
      <FAQ />
    </main>
  );
}

function FAQ() {
  const questions = [
    [
      "Is hyzl right for my app?",
      "hyzl is built for consumer subscription apps using RevenueCat or Stripe. We’ll review your billing setup, customer volume, and recovery opportunities during the demo.",
    ],
    [
      "How do you know a customer wouldn’t have bought anyway?",
      "We leave a randomized group of eligible customers uncontacted. Comparing their purchase rate with the treated group helps estimate the revenue added by hyzl. Customers who buy during the initial wait window are tracked separately.",
    ],
    [
      "Does hyzl contact every customer?",
      "Outreach depends on billing status, eligibility, consent, and your workflow rules. Some customers buy on their own; some are held out for measurement; others are not contactable.",
    ],
    [
      "Which workflows can I use today?",
      "Signup Recovery is live on RevenueCat, and Cancellation Recovery runs on RevenueCat and Stripe. Flexible channel sequences, engagement-gated calls, and billing support are evolving. We’ll show the current capabilities for your setup.",
    ],
    [
      "How do we get started?",
      "Book a demo. We’ll work through the integration, choose a workflow, and agree the offer, contact rules, measurement, and commercial terms together.",
    ],
  ];
  return (
    <section className="faq section">
      <h2>
        A few useful
        <br />
        answers.
      </h2>
      <div>
        {questions.map(([q, a]) => (
          <details key={q}>
            <summary>
              {q}
              <span aria-hidden="true">
                <Plus size={20} />
              </span>
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
function Footer() {
  const { pathname } = useLocation();
  return (
    <footer className="footer">
      {pathname !== "/demo" && (
        <div className="closing">
          <h2>
            Put intelligence
            <br />
            to work.
          </h2>
          <DemoLink />
        </div>
      )}
      <div className="footer-links">
        <Link to="/" className="footer-name" aria-label="hyzl home">
          hyzl<span>.</span>
        </Link>
        <div>
          <Link to="/how-it-works">How it works</Link>
          <Link to="/churn-intelligence">Measurement</Link>
          <Link to="/pricing">Pricing</Link>
        </div>
        <div>
          <Link to="/trust">Customer contact</Link>
          <a
            href="https://docs.atllasx.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation{" "}
            <ArrowUpRight className="inline-arrow" aria-hidden="true" />
          </a>
          <a href="https://app.hyzl.ai/authentication/login">
            Log in <ArrowUpRight className="inline-arrow" aria-hidden="true" />
          </a>
        </div>
        <div>
          <a href="mailto:info@atllas.com">
            Contact us{" "}
            <ArrowUpRight className="inline-arrow" aria-hidden="true" />
          </a>
          <button className="footer-chat" onClick={openChat}>
            Chat with us{" "}
            <ArrowUpRight className="inline-arrow" aria-hidden="true" />
          </button>
          <a href="https://app.atllas.com/legal/privacy-policy">Privacy</a>
          <a href="https://app.atllas.com/legal/terms-of-service">Terms</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>Functional AI for subscription apps.</span>
        <span>© 2026 hyzl</span>
      </div>
    </footer>
  );
}
function RouteEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    const meta = pageMeta[pathname] ?? {
      title: "Page not found — hyzl",
      description:
        "Return to hyzl to explore functional AI for subscription apps.",
    };
    document.title = meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", meta.description);
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute(
        "href",
        "https://www.hyzl.ai" + (pathname === "/" ? "" : pathname),
      );
    window.scrollTo({ top: 0, behavior: "instant" });
    document.getElementById("main")?.focus({ preventScroll: true });
  }, [pathname]);
  return null;
}
export default function App() {
  return (
    <>
      <RouteEffects />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/how-it-works" element={<HowPage />} />
        <Route path="/churn-intelligence" element={<MeasurementPage />} />
        <Route
          path="/measurement"
          element={<Navigate to="/churn-intelligence" replace />}
        />
        <Route path="/pricing" element={<PricingPage />} />
        <Route
          path="/roi"
          element={<Navigate to="/churn-intelligence" replace />}
        />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/book-demo" element={<Navigate to="/demo" replace />} />
        {["/speed-to-lead", "/outbound-calling", "/ai-receptionist"].map(
          (path) => (
            <Route
              key={path}
              path={path}
              element={<Navigate to="/how-it-works" replace />}
            />
          ),
        )}
        <Route path="/trust" element={<TrustPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      {import.meta.env.PROD && <Intercom />}
    </>
  );
}
