import { ArrowUpRight, ArrowRight, X, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, Navigate, Route, Routes, useLocation } from "react-router";
import { PortalHome } from "./site/PortalHome";
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
      <Link className="portal-mobile-demo" to="/demo">
        Book a demo
      </Link>
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
function Footer() {
  const { pathname } = useLocation();
  return (
    <footer className="footer">
      {pathname !== "/demo" && (
        <div className="closing">
          <h2>
            Give intent
            <br />
            your attention.
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
    <div className="portal-edition">
      <RouteEffects />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <Routes>
        <Route path="/" element={<PortalHome />} />
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
    </div>
  );
}
