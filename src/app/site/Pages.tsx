import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { Measurement } from "./Measurement";
const booking =
  "https://meetings-na2.hubspot.com/d-torre/hyzl-revenue-recovery";
export const pageMeta: Record<string, { title: string; description: string }> =
  {
    "/": {
      title: "hyzl — Turn intent into revenue.",
      description:
        "Functional AI that acts on customer intent, from abandoned paywalls to renewals. Explore timely first touch, new revenue, and measurable incremental results.",
    },
    "/how-it-works": {
      title: "How it works — hyzl",
      description:
        "Follow a recovery from billing event to outreach, purchase verification, and incremental revenue measurement.",
    },
    "/churn-intelligence": {
      title: "Measurement — hyzl",
      description:
        "See how randomized holdouts separate purchases that would happen anyway from the revenue hyzl adds.",
    },
    "/pricing": {
      title: "Pay for what it adds — hyzl",
      description:
        "hyzl charges a share of incremental revenue. Discuss your workflow, eligible volume, and commercial terms in a demo.",
    },
    "/demo": {
      title: "Book a demo — hyzl",
      description:
        "Explore revenue recovery for your subscription app on Stripe or RevenueCat. Book a conversation with the hyzl team.",
    },
    "/trust": {
      title: "Customer contact, considered — hyzl",
      description:
        "Consent, eligibility, customer time zones, and billing verification shape every recovery workflow.",
    },
  };
export function PageIntro({
  title,
  children,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="page-intro">
      <h1>{title}</h1>
      <div>{children}</div>
    </div>
  );
}
export function HowPage() {
  const steps = [
    [
      "A signal arrives.",
      "Your app or billing platform sends an event: an abandoned paywall, a cancellation, or a failed renewal. A recovery case begins.",
    ],
    [
      "Give intent some room.",
      "A merchant-set wait window gives customers time to purchase on their own. Those purchases stay separate from recovered revenue.",
    ],
    [
      "Check before contact.",
      "hyzl verifies billing status and outreach eligibility before the sequence begins. Consent, exclusions, do-not-contact lists, and local calling windows matter.",
    ],
    [
      "Keep a control group.",
      "Eligible customers are randomly assigned. A held-out group receives no outreach, providing a baseline for what would happen without hyzl.",
    ],
    [
      "Make the next step useful.",
      "The treatment reaches out with a relevant message and an approved offer or recovery link. The channel sequence is configured for your workflow.",
    ],
    [
      "Let billing confirm it.",
      "Purchases in the attribution window are recorded from RevenueCat or Stripe for both treated and held-out customers.",
    ],
    [
      "Measure what changed.",
      "Compare purchase rates, account for uncertainty, and estimate incremental revenue. Commission is charged on the revenue added.",
    ],
  ];
  return (
    <main id="main" tabIndex={-1}>
      <PageIntro
        title={
          <>
            From a signal
            <br />
            to a sale.
          </>
        }
      >
        <p>
          One recovery, from the moment a customer leaves to the revenue your
          billing system confirms.
        </p>
        <Link className="text-link" to="/demo">
          See it for your app{" "}
          <ArrowUpRight className="inline-arrow" aria-hidden="true" />
        </Link>
      </PageIntro>
      <section className="pipeline section" aria-label="The recovery process">
        {steps.map(([title, copy], i) => (
          <article key={title}>
            <span className="step-number">0{i + 1}</span>
            <h2>{title}</h2>
            <p>{copy}</p>
          </article>
        ))}
      </section>
      <section className="quiet-band">
        <h2>
          Timing is part
          <br />
          of the product.
        </h2>
        <div>
          <p>
            The right intervention depends on the customer’s moment. Your team
            defines the offer, waiting period, and contact constraints.
          </p>
          <p>
            Flexible sequences and calls gated on engagement are being rolled
            out. We’ll confirm availability and configuration together.
          </p>
          <Link className="text-link" to="/trust">
            Our approach to customer contact{" "}
            <ArrowUpRight className="inline-arrow" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
export function MeasurementPage() {
  return (
    <main id="main" tabIndex={-1}>
      <PageIntro
        title={
          <>
            A purchase is a fact.
            <br />
            Lift is the proof.
          </>
        }
      >
        <p>
          Some customers would have purchased anyway. A randomized holdout helps
          show what happened because of hyzl.
        </p>
      </PageIntro>
      <section className="section measurement-page">
        <Measurement full />
      </section>
      <section className="definitions section">
        <h2>
          Three groups.
          <br />
          Three different meanings.
        </h2>
        <dl>
          <div>
            <dt>Paid on their own</dt>
            <dd>
              Purchased during the wait window, before outreach. These customers
              are excluded from recovery lift.
            </dd>
          </div>
          <div>
            <dt>Held out</dt>
            <dd>
              Eligible customers randomly assigned to receive no outreach. Their
              purchases establish the baseline.
            </dd>
          </div>
          <div>
            <dt>Treated</dt>
            <dd>
              Eligible customers assigned to the outreach sequence. Compare
              their paid rate with the holdout to estimate lift.
            </dd>
          </div>
        </dl>
      </section>
      <div className="page-note">
        Measurement is based on billing events. Reporting views and billing
        support are evolving; your demo will show what is available for your
        workflow today.
      </div>
    </main>
  );
}
export function PricingPage() {
  return (
    <main id="main" tabIndex={-1}>
      <PageIntro
        title={
          <>
            We earn
            <br />
            when you do.
          </>
        }
      >
        <p>
          The model is simple: a share of incremental revenue. What hyzl adds is
          what we charge on.
        </p>
        <Link className="button" to="/demo">
          Discuss your workflow{" "}
          <ArrowUpRight className="inline-arrow" aria-hidden="true" />
        </Link>
      </PageIntro>
      <section className="definitions section">
        <h2>
          One shared
          <br />
          incentive.
        </h2>
        <dl>
          <div>
            <dt>Measure the difference</dt>
            <dd>
              Compare treated and held-out customers to estimate the revenue
              added by outreach.
            </dd>
          </div>
          <div>
            <dt>Verify in billing</dt>
            <dd>
              Purchases are confirmed against RevenueCat or Stripe, using actual
              purchase prices.
            </dd>
          </div>
          <div>
            <dt>Agree the terms</dt>
            <dd>
              We’ll review your workflow, volume, integrations, and commission
              terms together. There is no self-serve checkout.
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
export function DemoPage() {
  return (
    <main id="main" tabIndex={-1} className="demo-page">
      <PageIntro
        title={
          <>
            Let’s find your
            <br />
            next recovery.
          </>
        }
      >
        <p>
          Bring your subscription app.
          <br />
          We’ll bring a working walkthrough.
        </p>
      </PageIntro>
      <section className="demo-layout section">
        <div>
          <h2>
            A conversation
            <br />
            about your app.
          </h2>
          <p>
            For founders and growth teams using Stripe or RevenueCat. We’ll look
            at where customers leave, which workflow fits, and how to measure
            the revenue added.
          </p>
          <ol className="demo-agenda">
            <li>Your billing setup and recovery opportunities</li>
            <li>A walkthrough of the available workflows</li>
            <li>Measurement, rollout, and commercial terms</li>
          </ol>
        </div>
        <div className="booking-panel">
          <h2>
            A little context.
            <br />A useful next step.
          </h2>
          <p>
            Choose a time on our booking page. The calendar opens in a new tab.
          </p>
          <a
            className="button"
            href={booking}
            target="_blank"
            rel="noopener noreferrer"
          >
            Choose a time{" "}
            <ArrowUpRight className="inline-arrow" aria-hidden="true" />
          </a>
          <p className="booking-small">
            No self-serve signup. We’ll confirm the right setup for you.
          </p>
        </div>
      </section>
    </main>
  );
}
export function TrustPage() {
  return (
    <main id="main" tabIndex={-1}>
      <PageIntro
        title={
          <>
            The right contact.
            <br />
            Within your rules.
          </>
        }
      >
        <p>
          Recovery should respect the customer relationship you’ve already
          built.
        </p>
      </PageIntro>
      <section className="pipeline section">
        {[
          [
            "Consent comes first.",
            "Workflows use consent and eligibility checks, do-not-contact lists, and applicable exclusions before outreach.",
          ],
          [
            "Time zones matter.",
            "Contact windows are configured around the customer’s local time.",
          ],
          [
            "A purchase changes the plan.",
            "Billing is checked before outreach so someone who has already paid does not receive a recovery message.",
          ],
          [
            "Offers stay intentional.",
            "Your team defines the offer and workflow constraints. Engagement-gated calling is being rolled out; we’ll confirm the available sequence for your app.",
          ],
        ].map(([title, copy], i) => (
          <article key={title}>
            <span className="step-number">0{i + 1}</span>
            <h2>{title}</h2>
            <p>{copy}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
export function NotFound() {
  return (
    <main id="main" tabIndex={-1}>
      <PageIntro
        title={
          <>
            This page
            <br />
            has moved on.
          </>
        }
      >
        <p>We couldn’t find that address.</p>
        <Link className="button" to="/">
          Back to hyzl{" "}
          <ArrowUpRight className="inline-arrow" aria-hidden="true" />
        </Link>
      </PageIntro>
    </main>
  );
}
