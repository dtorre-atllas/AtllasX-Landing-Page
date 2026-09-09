import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
const cases = [
  {
    name: "Missed signups",
    number: "01",
    title: "They leave. You follow up.",
    description:
      "Reach eligible customers who leave your paywall, after giving them time to buy on their own.",
    event: "Paywall abandoned",
    wait: "Wait for an organic purchase",
    verify: "Still unpaid · consent checked",
    message:
      "Still thinking it over? You can pick up where you left off. Here’s a link to your offer.",
    action: "Return to checkout",
    detail: "Offers and timing are agreed with your team.",
  },
  {
    name: "Cancellations",
    number: "02",
    title: "Understand why they’re leaving.",
    description:
      "Find out what changed and offer a relevant reason to stay before access ends.",
    event: "Cancellation received",
    wait: "Check the recovery window",
    verify: "Subscription status verified",
    message:
      "We saw you’re planning to leave. Was it the price, the timing, or something else? We’d like to understand.",
    action: "Understand the reason",
    detail: "Discounts, pauses, and plan changes depend on your setup.",
  },
  {
    name: "Failed payments",
    number: "03",
    title: "Keep a failed payment from ending it.",
    description:
      "Help eligible customers update their payment details or restart their subscription.",
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
          Bring subscribers
          <br />
          back.
        </h2>
      </div>
      <div className="workflow-tabs" aria-label="Recovery scenarios">
        {cases.map((c, i) => (
          <button
            key={c.name}
            aria-pressed={active === i}
            onClick={() => setActive(i)}
          >
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
        Workflows and channels depend on your setup. We’ll confirm availability
        in your demo.
      </p>
    </section>
  );
}
