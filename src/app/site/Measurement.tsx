import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
export function Measurement({ full = false }: { full?: boolean }) {
  const [sample, setSample] = useState<"clear" | "early">("clear");
  const early = sample === "early";
  return (
    <div className="measurement">
      <div className="measurement-toolbar">
        <p>Same opportunity. Different treatment.</p>
        <div className="segmented" aria-label="Illustrative sample size">
          <button aria-pressed={!early} onClick={() => setSample("clear")}>
            Larger sample
          </button>
          <button aria-pressed={early} onClick={() => setSample("early")}>
            Early sample
          </button>
        </div>
      </div>
      <div className="measurement-grid" aria-live="polite" aria-atomic="true">
        <div className="cohort">
          <div className="cohort-label">
            <span className="legend-dot green" />
            With hyzl <span>Reached out</span>
          </div>
          <p className="rate">
            {early ? "12.5" : "12"}
            <span>%</span>
          </p>
          <div className="rate-track">
            <span
              style={{ transform: early ? "scaleX(.625)" : "scaleX(.6)" }}
            />
          </div>
          <p className="cohort-detail">
            {early ? "10 of 80" : "120 of 1,000"} customers purchased
          </p>
        </div>
        <div className="cohort holdout">
          <div className="cohort-label">
            <span className="legend-dot" />
            Without hyzl <span>No outreach</span>
          </div>
          <p className="rate">
            {early ? "10" : "6"}
            <span>%</span>
          </p>
          <div className="rate-track">
            <span style={{ transform: early ? "scaleX(.5)" : "scaleX(.3)" }} />
          </div>
          <p className="cohort-detail">
            {early ? "2 of 20" : "15 of 250"} customers purchased
          </p>
        </div>
        <div className="lift-result">
          <span>Estimated lift</span>
          <p className="lift-number">
            +{early ? "2.5" : "6"}
            <small>pp</small>
          </p>
          <strong>
            {early ? "Too early to tell." : "The difference hyzl added."}
          </strong>
          <p>
            {early
              ? "The interval still includes zero. More customers are needed before drawing a conclusion."
              : "Subtract the held-out purchase rate from the treated purchase rate."}
          </p>
          <span className="interval">
            Approx. 95% interval: {early ? "−12.5 to +17.5" : "+2.4 to +9.6"} pp
          </span>
        </div>
      </div>
      <div className="measurement-foot">
        <p>
          Illustrative data, not customer results. Rates are normalized for
          group size. Intervals use a simplified normal approximation.
        </p>
        {!full && (
          <Link className="text-link" to="/churn-intelligence">
            Explore the measurement{" "}
            <ArrowUpRight className="inline-arrow" aria-hidden="true" />
          </Link>
        )}
      </div>
      {full && (
        <div className="measurement-explainer">
          <h3>Revenue follows the evidence.</h3>
          <p>
            Purchase events come from your billing system. Incremental customers
            are estimated from lift multiplied by the treated group size.
            Incremental revenue then uses actual purchase prices. Your
            commission is a share of the revenue added.
          </p>
          <p>
            This example explains the method. Your workflow’s attribution
            window, sample size, purchase mix, and uncertainty determine how its
            results should be read.
          </p>
        </div>
      )}
    </div>
  );
}
