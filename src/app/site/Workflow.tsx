import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
const cases = [
  {
    name: "Signup recovery",
    number: "01",
    title: "Interest deserves a second chance.",
    description:
      "Someone reaches your paywall and leaves. Give them time to buy on their own, then follow up if they are still unpaid and eligible.",
    event: "Paywall abandoned",
    wait: "Wait for an organic purchase",
    verify: "Still unpaid · consent checked",
    message:
      "Still thinking it over? You can pick up where you left off. Here’s a link to your offer.",
    action: "Return to checkout",
    detail: "Offers and timing are agreed with your team.",
  },
  {
    name: "Cancellation recovery",
    number: "02",
    title: "A cancellation can start a conversation.",
    description:
      "Before access ends, understand what changed. A relevant offer can give a customer a reason to stay.",
    event: "Cancellation received",
    wait: "Check the recovery window",
    verify: "Subscription status verified",
    message:
      "We saw you’re planning to leave. Was it the price, the timing, or something else? We’d like to understand.",
    action: "Understand the reason",
    detail: "Discounts, pauses, and plan changes depend on your setup.",
  },
  {
    name: "Payment recovery",
    number: "03",
    title: "A failed payment needn’t be goodbye.",
    description:
      "When a renewal fails or a subscription lapses, help the customer take the next useful step.",
    event: "Renewal failed",
    wait: "Check the payment state",
    verify: "Unresolved · eligibility checked",
    message:
      "Your renewal didn’t go through. You can update your payment details securely using this link.",
    action: "Update payment",
    detail: "Workflow availability is confirmed during your demo.",
  },
];
export function Workflow() {
  const [active, setActive] = useState(0);
  const item = cases[active];
  return (
    <section className="workflow-section">
      <div className="workflow-heading">
        <h2>
          Built for the
          <br />
          moment that matters.
        </h2>
        <p>
          A missed signup. A cancellation.
          <br />A payment that didn’t go through.
          <br />
          Different moments, one measurable outcome.
        </p>
      </div>
      <div className="workflow-tabs" aria-label="Recovery scenarios">
        {cases.map((c, i) => (
          <button
            key={c.name}
            aria-pressed={active === i}
            onClick={() => setActive(i)}
          >
            <span>{c.number}</span>
            {c.name}
            <ArrowUpRight className="inline-arrow" aria-hidden="true" />
          </button>
        ))}
      </div>
      <div className="workflow-body" aria-live="polite">
        <div className="workflow-copy">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <Link className="text-link" to="/how-it-works">
            Follow a recovery{" "}
            <ArrowUpRight className="inline-arrow" aria-hidden="true" />
          </Link>
        </div>
        <div className="case-study">
          <div className="case-caption">
            <span>Illustrative scenario</span>
            <span>{item.number} / 03</span>
          </div>
          <ol className="case-sequence">
            <li>
              {item.event}
              <span>Received</span>
            </li>
            <li>
              {item.wait}
              <span>Wait</span>
            </li>
            <li>
              {item.verify}
              <span>Verified</span>
            </li>
          </ol>
          <div className="message-example">
            <div className="message-from">
              <span className="legend-dot green" /> Your app · via hyzl
            </div>
            <p>{item.message}</p>
            <span className="message-action">
              {item.action}
              <ArrowUpRight className="inline-arrow" aria-hidden="true" />
            </span>
          </div>
          <p className="case-detail">
            {item.detail} Sample message, not a customer transcript.
          </p>
        </div>
      </div>
      <p className="workflow-note">
        Channel sequences and engagement-gated calling are being rolled out.
        We’ll confirm the right setup for your app.
      </p>
    </section>
  );
}
