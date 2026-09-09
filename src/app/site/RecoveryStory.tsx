import { Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ribbons from "../../assets/recovery-ribbons.png";
import "./RecoveryStory.css";

const stages = [
  {
    name: "Detect",
    title: "A customer leaves the paywall.",
    text: "hyzl spots the missed signup. First, it gives the customer time to buy on their own.",
  },
  {
    name: "Check",
    title: "Check before making contact.",
    text: "Still unpaid? Check eligibility, consent, and your contact rules. Keep a random group uncontacted to measure the difference.",
  },
  {
    name: "Act",
    title: "Give them a reason to return.",
    text: "Follow up with a relevant offer, within the limits your team has set.",
  },
  {
    name: "Verify",
    title: "Confirm the purchase. Measure the lift.",
    text: "If they return, verify the purchase in your billing system. Compare the groups to estimate what hyzl added.",
  },
];
const DURATION = 20000;
const starts = [0, 0.23, 0.5, 0.77];
const positions = [0.035, 0.4855, 0.77, 1];

export function RecoveryStory() {
  const figure = useRef<HTMLElement>(null);
  const path = useRef<SVGPathElement>(null);
  const cursor = useRef<SVGGElement>(null);
  const elapsed = useRef(0);
  const activeStage = useRef(0);
  const [stage, setStage] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [complete, setComplete] = useState(false);
  const [manual, setManual] = useState(false);

  function draw(position: number) {
    if (!path.current || !cursor.current) return;
    const point = path.current.getPointAtLength(
      path.current.getTotalLength() * position,
    );
    cursor.current.setAttribute(
      "transform",
      `translate(${point.x} ${point.y})`,
    );
    path.current.style.strokeDashoffset = String(1 - position);
  }

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReduced(preference.matches);
    const updateVisibility = () => setHidden(document.hidden);
    updateMotion();
    updateVisibility();
    preference.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    if (figure.current) observer.observe(figure.current);
    draw(positions[0]);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  const running = visible && !hidden && !paused && !reduced && !complete;
  useEffect(() => {
    if (!running) return;
    let frame = 0;
    let previous: number | null = null;
    const tick = (now: number) => {
      if (previous !== null)
        elapsed.current = Math.min(
          DURATION,
          elapsed.current + Math.min(now - previous, 100),
        );
      previous = now;
      const progress = elapsed.current / DURATION;
      const nextStage =
        progress >= starts[3]
          ? 3
          : progress >= starts[2]
            ? 2
            : progress >= starts[1]
              ? 1
              : 0;
      if (nextStage !== activeStage.current) {
        activeStage.current = nextStage;
        setStage(nextStage);
      }
      const from = nextStage === 0 ? 0 : positions[nextStage - 1];
      const local = Math.min(1, (progress - starts[nextStage]) / 0.12);
      const ease = 1 - Math.pow(1 - local, 3);
      draw(from + (positions[nextStage] - from) * ease);
      if (elapsed.current >= DURATION) setComplete(true);
      else frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running]);

  const select = (index: number) => {
    setStage(index);
    activeStage.current = index;
    elapsed.current = (starts[index] + 0.12) * DURATION;
    setPaused(true);
    setComplete(false);
    setManual(true);
    draw(positions[index]);
  };
  const toggle = () => {
    setManual(false);
    if (complete) {
      elapsed.current = 0;
      activeStage.current = 0;
      setStage(0);
      setComplete(false);
      setPaused(false);
      draw(0);
    } else setPaused(!paused);
  };

  return (
    <figure
      className="recovery-story"
      ref={figure}
      aria-label="An illustrative signup recovery, from missed purchase to measured result"
      data-stage={stage}
    >
      <div className="story-canvas">
        <img
          src={ribbons}
          alt=""
          width="2172"
          height="724"
          className="story-ribbons"
          {...{ fetchpriority: "high" }}
        />
        <svg
          className="story-linework"
          viewBox="0 0 1000 300"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="story-trace-color"
              gradientUnits="userSpaceOnUse"
              x1="35"
              y1="143"
              x2="910"
              y2="29"
            >
              <stop stopColor="#64766b" />
              <stop offset=".47" stopColor="#237846" />
              <stop offset="1" stopColor="#237846" />
            </linearGradient>
          </defs>
          <path className="story-guide" d="M467 57 V219" />
          <path
            className="story-travel"
            ref={path}
            d="M35 130 C170 124 325 145 467 130 C635 128 739 43 911 29"
            pathLength="1"
          />
          <circle className="story-check-node" cx="467" cy="130" r="9" />
          <g
            ref={cursor}
            className="story-cursor"
            transform="translate(35 130)"
          >
            <circle r="9" className="story-cursor-ring" />
            <circle r="3.5" />
          </g>
          <circle cx="911" cy="29" r="3.5" fill="#237846" />
          <circle cx="911" cy="164" r="3.5" fill="#747d77" />
        </svg>
        <span className="story-intervention">hyzl intervenes</span>
        <span className="story-result-label">With hyzl</span>
        <span className="story-control-label">Without outreach</span>
      </div>
      <div className="story-console">
        <div className="story-controls">
          <div
            className="story-steps"
            role="group"
            aria-label="Explore the recovery steps"
          >
            {stages.map((item, index) => (
              <button
                key={item.name}
                type="button"
                aria-pressed={stage === index}
                aria-controls="recovery-stage"
                onClick={() => select(index)}
              >
                <span className="story-step-mark" aria-hidden="true" />
                {item.name}
              </button>
            ))}
          </div>
          {!reduced && (
            <button
              type="button"
              className="story-playback"
              onClick={toggle}
              aria-label={
                complete
                  ? "Replay recovery story"
                  : paused
                    ? "Play recovery story"
                    : "Pause recovery story"
              }
            >
              {complete ? (
                <RotateCcw size={15} aria-hidden="true" />
              ) : paused ? (
                <Play size={15} aria-hidden="true" />
              ) : (
                <Pause size={15} aria-hidden="true" />
              )}
              <span>{complete ? "Replay" : paused ? "Play" : "Pause"}</span>
            </button>
          )}
        </div>
        <div
          id="recovery-stage"
          className="story-explanation"
          aria-live={manual ? "polite" : "off"}
          aria-atomic="true"
        >
          <h2>{stages[stage].title}</h2>
          <p>{stages[stage].text}</p>
        </div>
        <figcaption>
          Illustrative recovery. Timing condensed; outcomes vary.
        </figcaption>
      </div>
    </figure>
  );
}
