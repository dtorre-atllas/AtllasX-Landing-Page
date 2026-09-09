import { ArrowUpRight, ArrowRight, X, Plus, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, Navigate, Route, Routes, useLocation } from "react-router";
import { RecoveryStory } from "./site/RecoveryStory";
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
function Home() {
  return (
    <main id="main" tabIndex={-1} className="home-refined">
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
        <RecoveryStory />
      </section>
      <Workflow />
      <section className="incentive section">
        <h2>
          Pay for the
          <br />
          difference<span>.</span>
        </h2>
        <div>
          <p>
            We verify purchases in your billing system and compare with
            customers who receive no outreach. You pay a share of what hyzl
            adds.
          </p>
          <div className="incentive-links">
            <Link className="text-link" to="/churn-intelligence">
              How we measure it <Arrow />
            </Link>
            <Link className="text-link" to="/pricing">
              Pricing <Arrow />
            </Link>
          </div>
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
      "hyzl is built for consumer subscription apps using RevenueCat or Stripe. We’ll confirm the right setup in your demo.",
    ],
    [
      "How do you know a customer wouldn’t have bought anyway?",
      "We randomly leave some eligible customers uncontacted and compare the purchase rates. Customers who buy before outreach are tracked separately.",
    ],
    [
      "Does hyzl contact every customer?",
      "Outreach depends on billing status, eligibility, consent, and your workflow rules. Some customers buy on their own; some are held out for measurement; others are not contactable.",
    ],
    [
      "Which workflows can I use today?",
      "Signup Recovery is live on RevenueCat, and Cancellation Recovery runs on RevenueCat and Stripe. Flexible channel sequences, engagement-gated calls, and billing support are evolving. We’ll show the current capabilities for your setup.",
    ],
  ];
  return (
    <section className="faq section">
      <h2>A few answers.</h2>
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
