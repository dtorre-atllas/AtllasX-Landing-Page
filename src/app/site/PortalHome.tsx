import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCheck,
  ChevronLeft,
  CreditCard,
  MessageSquare,
  MousePointer2,
  Pause,
  Play,
  RotateCcw,
  ShieldCheck,
  X,
} from "lucide-react";
import scene from "../../assets/portals.webp";
import "./PortalHome.css";

const signals = [
  {
    name: "Abandoned paywall",
    event: "Paywall left without a purchase",
    title: "Interest. One step from a purchase.",
    detail:
      "A customer reaches your paywall, then leaves. The intent is there. The purchase isn’t.",
    source: "App event",
    check: "Still unpaid after the wait window",
    message:
      "Still thinking it over? Here’s a way to pick up where you left off.",
    action: "Return to your offer",
  },
  {
    name: "New lead",
    event: "A new inquiry arrives",
    title: "Someone is ready to talk.",
    detail:
      "A new lead raises their hand. This is the moment to start a useful conversation.",
    source: "Lead event",
    check: "Ready for a first touch under your rules",
    message:
      "Thanks for reaching out. What are you looking to get done? Let’s find the right next step.",
    action: "Start the conversation",
  },
  {
    name: "Cancellation",
    event: "Cancellation requested",
    title: "A customer is about to leave.",
    detail:
      "A cancellation creates a short window to understand what changed and offer a reason to stay.",
    source: "Subscription event",
    check: "Within the cancellation recovery window",
    message:
      "Before you go, was it the price, the timing, or something else? We’d like to help.",
    action: "Find the right option",
  },
  {
    name: "Failed payment",
    event: "Renewal payment failed",
    title: "A payment fails. Intent may remain.",
    detail:
      "A billing issue interrupts the relationship. The next useful action can help keep it going.",
    source: "Billing event",
    check: "Payment still unresolved",
    message:
      "Your renewal didn’t go through. You can update your payment details securely here.",
    action: "Update payment details",
  },
];
const stepNames = ["Signal", "Decision", "First touch", "Outcome"];
type Side = "with" | "without" | null;

export function PortalHome() {
  const [side, setSide] = useState<Side>(null);
  const [signal, setSignal] = useState(0);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [manual, setManual] = useState(false);
  const stage = useRef<HTMLElement>(null);
  const experience = useRef<HTMLDivElement>(null);
  const withButton = useRef<HTMLButtonElement>(null);
  const withoutButton = useRef<HTMLButtonElement>(null);
  const item = signals[signal];

  useEffect(() => {
    const pref = matchMedia("(prefers-reduced-motion: reduce)");
    const motion = () => {
      setReduced(pref.matches);
      if (pref.matches) setPlaying(false);
    };
    const visibility = () => setHidden(document.hidden);
    motion();
    visibility();
    pref.addEventListener("change", motion);
    document.addEventListener("visibilitychange", visibility);
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    if (stage.current) observer.observe(stage.current);
    return () => {
      observer.disconnect();
      pref.removeEventListener("change", motion);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);

  useEffect(() => {
    if (side !== "with" || !playing || !visible || hidden || reduced) return;
    const timer = window.setTimeout(() => {
      if (step < 3) setStep(step + 1);
      else setPlaying(false);
    }, 5500);
    return () => clearTimeout(timer);
  }, [side, playing, visible, hidden, reduced, step]);

  const enter = (next: Side) => {
    setSide(next);
    setStep(0);
    setManual(false);
    setPlaying(next === "with" && !reduced);
    requestAnimationFrame(() =>
      experience.current?.focus({ preventScroll: true }),
    );
  };
  const close = () => {
    const target = side === "with" ? withButton.current : withoutButton.current;
    setSide(null);
    setPlaying(false);
    requestAnimationFrame(() => target?.focus({ preventScroll: true }));
  };
  const selectSignal = (index: number) => {
    setSignal(index);
    setStep(0);
    setManual(true);
    setPlaying(false);
  };
  const selectStep = (index: number) => {
    setStep(index);
    setPlaying(false);
    setManual(true);
  };
  const togglePlay = () => {
    setManual(false);
    if (step === 3 && !playing) {
      setStep(0);
      setPlaying(true);
    } else setPlaying(!playing);
  };

  return (
    <main id="main" className="portal-home" tabIndex={-1}>
      <section className="portal-intro">
        <h1>
          Turn intent
          <br className="portal-mobile-break" /> into revenue.
        </h1>
        <p>
          AI for consumer subscription apps. hyzl turns customer intent into
          revenue, from abandoned paywalls to renewals. Reach customers while
          the opportunity is still open.
        </p>
      </section>

      <section
        ref={stage}
        id="experience"
        className={`portal-stage ${side ? "is-entered" : ""} ${side === "without" ? "is-quiet" : ""}`}
        aria-label="Compare the same opportunity with and without hyzl"
        onKeyDown={(event) => {
          if (event.key === "Escape" && side) close();
        }}
      >
        <img
          className="portal-scene"
          src={scene}
          alt=""
          width="1672"
          height="941"
          {...{ fetchpriority: "high" }}
        />
        <div className="portal-choices" hidden={side !== null}>
          <button
            ref={withoutButton}
            className="portal-door door-without"
            onClick={() => enter("without")}
            aria-label="Explore without hyzl"
          >
            <span className="portal-door-label">
              Without hyzl
              <span>
                A moment unattended <ArrowRight size={16} aria-hidden="true" />
              </span>
            </span>
          </button>
          <button
            ref={withButton}
            className="portal-door door-with"
            onClick={() => enter("with")}
            aria-label="Explore with hyzl"
          >
            <span className="portal-door-label">
              With hyzl
              <span>
                See intent become action{" "}
                <ArrowRight size={16} aria-hidden="true" />
              </span>
            </span>
          </button>
          <p className="portal-invitation">
            The same opportunity. Choose a response.
          </p>
        </div>

        {side && (
          <div ref={experience} className="portal-experience" tabIndex={-1}>
            <div className="experience-toolbar">
              <button className="portal-back" onClick={close}>
                <ChevronLeft size={16} aria-hidden="true" /> Both possibilities
              </button>
              <div
                className="world-switch"
                role="group"
                aria-label="Choose a response"
              >
                <button
                  aria-pressed={side === "without"}
                  onClick={() => enter("without")}
                >
                  Without hyzl
                </button>
                <button
                  aria-pressed={side === "with"}
                  onClick={() => enter("with")}
                >
                  With hyzl
                </button>
              </div>
              <button
                className="portal-close"
                onClick={close}
                aria-label="Close experience"
              >
                <X size={19} aria-hidden="true" />
              </button>
            </div>
            <div
              className="signal-selector"
              role="group"
              aria-label="Choose a customer trigger"
            >
              {signals.map((s, index) => (
                <button
                  key={s.name}
                  aria-pressed={signal === index}
                  onClick={() => selectSignal(index)}
                >
                  {s.name}
                </button>
              ))}
            </div>

            {side === "without" ? (
              <div className="quiet-experience">
                <h2>
                  The moment is here.
                  <br />
                  The response isn’t.
                </h2>
                <p>
                  {item.event}.
                  <br />
                  No hyzl workflow running.
                  <br />
                  No hyzl first touch.
                </p>
                <span className="quiet-note">
                  Some customers may still convert on their own.
                </span>
                <button
                  className="portal-text-action"
                  onClick={() => enter("with")}
                >
                  See what hyzl does <ArrowRight size={18} aria-hidden="true" />
                </button>
              </div>
            ) : (
              <div className="active-experience">
                <aside className="experience-narrative">
                  <h2>
                    Intent gets{" "}
                    <br />
                    attention.
                  </h2>
                  <p>
                    Recognize the moment.
                    <br />
                    Make the next move.
                  </p>
                  <div
                    className="experience-steps"
                    role="group"
                    aria-label="Explore workflow steps"
                  >
                    {stepNames.map((name, index) => (
                      <button
                        key={name}
                        aria-pressed={step === index}
                        onClick={() => selectStep(index)}
                      >
                        <span
                          className={
                            index < step ? "step-dot is-done" : "step-dot"
                          }
                        >
                          {index < step && (
                            <Check size={10} aria-hidden="true" />
                          )}
                        </span>
                        {name}
                      </button>
                    ))}
                  </div>
                  {!reduced && (
                    <button
                      className="experience-play"
                      onClick={togglePlay}
                      aria-label={
                        playing
                          ? "Pause experience"
                          : step === 3
                            ? "Replay experience"
                            : "Play experience"
                      }
                    >
                      {playing ? (
                        <Pause size={14} aria-hidden="true" />
                      ) : step === 3 ? (
                        <RotateCcw size={14} aria-hidden="true" />
                      ) : (
                        <Play size={14} aria-hidden="true" />
                      )}
                      {playing
                        ? "Pause"
                        : step === 3
                          ? "Replay"
                          : "Play sequence"}
                    </button>
                  )}
                </aside>
                <div
                  className="action-stack"
                  aria-live={manual ? "polite" : "off"}
                  aria-atomic="true"
                >
                  <div className="stack-sheet sheet-two" aria-hidden="true" />
                  <div className="stack-sheet sheet-one" aria-hidden="true" />
                  <article className="action-card" key={`${signal}-${step}`}>
                    <div className="action-card-top">
                      <span className="card-system">
                        <span className="system-dot" /> hyzl
                      </span>
                      <span>{stepNames[step]}</span>
                    </div>
                    {step === 0 && (
                      <>
                        <MousePointer2
                          className="card-symbol"
                          size={27}
                          strokeWidth={1.4}
                          aria-hidden="true"
                        />
                        <h3>{item.title}</h3>
                        <p>{item.detail}</p>
                        <dl className="event-details">
                          <div>
                            <dt>Signal</dt>
                            <dd>{item.name}</dd>
                          </div>
                          <div>
                            <dt>Source</dt>
                            <dd>{item.source}</dd>
                          </div>
                          <div>
                            <dt>Next</dt>
                            <dd>Check eligibility</dd>
                          </div>
                        </dl>
                        <div className="card-conclusion">
                          <span className="system-dot" /> Attention starts with
                          detection.
                        </div>
                      </>
                    )}
                    {step === 1 && (
                      <>
                        <ShieldCheck
                          className="card-symbol"
                          size={29}
                          strokeWidth={1.4}
                          aria-hidden="true"
                        />
                        <h3>Fast doesn’t mean indiscriminate.</h3>
                        <p>
                          Check the context before making contact. Your rules
                          determine the right moment.
                        </p>
                        <ul className="decision-checks">
                          <li>
                            <Check size={16} aria-hidden="true" />
                            {item.check}
                          </li>
                          <li>
                            <Check size={16} aria-hidden="true" />
                            Consent and contact rules checked
                          </li>
                          <li>
                            <Check size={16} aria-hidden="true" />
                            Comparison group preserved
                          </li>
                        </ul>
                        <div className="card-conclusion">
                          First touch, as soon as eligible.
                        </div>
                      </>
                    )}
                    {step === 2 && (
                      <>
                        <MessageSquare
                          className="card-symbol"
                          size={27}
                          strokeWidth={1.4}
                          aria-hidden="true"
                        />
                        <h3>The first touch matters.</h3>
                        <p>
                          Start a relevant conversation while the opportunity is
                          still open.
                        </p>
                        <div className="outreach-preview">
                          <span>Your brand, via hyzl</span>
                          <p>{item.message}</p>
                          <span className="preview-action">
                            {item.action}
                            <ArrowUpRight size={17} aria-hidden="true" />
                          </span>
                        </div>
                        <div className="card-conclusion">
                          Sample message, not a customer transcript.
                        </div>
                      </>
                    )}
                    {step === 3 && (
                      <>
                        <CreditCard
                          className="card-symbol"
                          size={29}
                          strokeWidth={1.4}
                          aria-hidden="true"
                        />
                        <h3>Follow the outcome.</h3>
                        <p>
                          If the customer buys, confirm the purchase in your
                          billing system. Then measure what hyzl added.
                        </p>
                        <div className="outcome-path">
                          <span>
                            <CheckCheck size={18} aria-hidden="true" /> Verify
                            the purchase
                          </span>
                          <ArrowRight size={18} aria-hidden="true" />
                          <span>Compare with no outreach</span>
                        </div>
                        <p className="outcome-note">
                          A purchase is a fact. Incremental revenue is the
                          difference.
                        </p>
                        <Link
                          className="card-conclusion card-link"
                          to="/churn-intelligence"
                        >
                          How measurement works{" "}
                          <ArrowRight size={16} aria-hidden="true" />
                        </Link>
                      </>
                    )}
                    <div className="card-navigation">
                      <span>{String(step + 1).padStart(2, "0")} / 04</span>
                      <button
                        onClick={() => selectStep(step < 3 ? step + 1 : 0)}
                        aria-label={
                          step < 3
                            ? `Next: ${stepNames[step + 1]}`
                            : "Back to signal"
                        }
                      >
                        {step < 3 ? "Next action" : "Start again"}
                        <ArrowRight size={17} aria-hidden="true" />
                      </button>
                    </div>
                  </article>
                </div>
              </div>
            )}
            <p className="experience-disclosure">
              Illustrative experience. Timing is condensed; workflows and
              channels depend on your setup.
            </p>
          </div>
        )}
      </section>

      <section className="portal-thesis">
        <h2>
          Be there
          <br />
          when it matters.
        </h2>
        <div>
          <p>
            New interest. An unfinished signup. A customer about to leave. Each
            is a chance to create revenue that hasn’t happened yet.
          </p>
          <p>
            hyzl detects the signal, checks the context, and follows up at the
            right moment.
          </p>
          <Link to="/how-it-works">
            See how hyzl works <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <section className="portal-principles" aria-label="How hyzl works">
        <div>
          <h3>Speed, with judgment.</h3>
          <p>
            Fast detection. A timely first touch. Consent, eligibility, and
            billing checks stay in the loop.
          </p>
        </div>
        <div>
          <h3>Revenue, with evidence.</h3>
          <p>
            Verify purchases and compare with customers who received no
            outreach. Pay for the incremental difference.
          </p>
          <Link to="/pricing">
            How pricing works <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
