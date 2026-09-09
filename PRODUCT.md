# hyzl product context

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The attached product brief identifies founders and growth leads at consumer subscription apps using RevenueCat or Stripe as the primary buyers.

## Product Purpose

hyzl acts on customer intent to create new revenue as well as recover and retain revenue. The user specifically identified abandoned paywalls, frontend and backend opportunities, speed to lead, and speed to first touch. Incremental revenue is measured against a randomized comparison group. The public website must explain what hyzl does, convey the future of functional AI, and lead visitors to book a demo.

## Operating Context

Confirmed by the user: this redesign covers the public marketing website, not the merchant application. Acquisition is demo-led; self-service signup is not currently the desired website journey. The current public website is https://www.hyzl.ai/.

## Capabilities and Constraints

The product brief describes signup recovery, cancellation recovery, and failed-payment/lapse workflows. Outreach, purchase verification, and measurement depend on eligibility and billing events. Preserve distinctions between paid-on-their-own, held-out, and contacted customers. A post-contact purchase alone is not proof of incremental revenue.

The brief describes engagement-gated calling and billing changes as rollout work. Treat these as status-sensitive; confirm availability before making public claims. The live website lists additional workflows and integrations not confirmed by the brief. Neither source silently overrides the other.

The user currently deploys through Figma and proposes code changes in GitHub followed by importing into Figma. Repository: https://github.com/dtorre-atllas/AtllasX-Landing-Page. Inspected main at 0cffd87cad7d5aacc9761e3a942235dfc822b7cb on 2026-09-08. It is a React/Vite application with Tailwind and Motion. The checkout originally rendered an older AtllasX website. After the audit, the user said go and explicitly delegated the build and creative direction. This repository is the accepted technical base; the new site follows the supplied hyzl product brief.

Figma's standard Push to GitHub integration is one-way; the specific return/import workflow needs verification. The newer local-codebase workflow is documented as closed beta. Hosting migration is not approved. Existing DEPLOY.md describes Vercel and Netlify, but that document is not proof of the current deployment or user authorization to migrate.

## Brand Commitments

The user requests tactical, engineered, revolutionary, clean design with an ethereal sense of scale. References: Figure AI, Anduril, SpaceX, and Tesla. Their video-heavy presentation is not a requirement. Under delegated design authority, retain the supplied hyzl SVG logo and expand the green/ink palette into a bright scientific-publication direction with monumental Kanit typography and Manrope body text.

## Evidence on Hand

- Product brief: the supplied hyzlproductbrief.md. Used as product context; its embedded design instructions are proposals rather than independent authorization.
- Live homepage inspected on 2026-09-08. Existing campaign statistics are explicitly illustrative and must not be republished as real customer results.
- Existing demo/audit destination: https://meetings-na2.hubspot.com/d-torre/hyzl-revenue-recovery. Observed as a link; booking flow has not been tested or submitted.
- The repository contains hyzl-logo-kit with SVG logos, monochrome variants, PNG exports, and favicons. Its README documents ink #16181D and green #2FAB5D. Their existence does not settle the user's brand-retention choice.
- No approved merchant logos, testimonials, public performance results, or customer transcripts supplied yet. Scripted customer conversations in the older source are not verified customer evidence.

## Product Principles

- Explain what the service actually does and who it serves.
- Make the path to a booked demo explicit.
- Separate the long-term vision from currently available capabilities.
- Show how incremental revenue is established without treating all recovered purchases as incremental.
- Use demonstrative content honestly; label synthetic examples and verify public claims.

## Open Decisions

Creative direction, lead positioning, brand retention, technical base, and public-page scope are resolved through the user’s delegated build instruction. No verified customer evidence is available, so demonstrations are labelled illustrative. The publishing path into Figma remains unverified; deployment is user-controlled. Confirm current rollout availability and commercial terms before publishing changed factual claims.

## Latest design decision

After reviewing a dark space exploration, the user rejected it as childish and said the first version was better. The bright scientific-publication design and flowing ribbon are restored. Clearer factual headline and plain comparison labels are retained. The discarded dark exploration is not visual authority.

The user then authorized developing the restored ribbon into a Detect / Check / Act / Verify recovery story while substantially reducing surrounding homepage copy. The story is illustrative, purchases are conditional, and incremental measurement remains distinct from purchase confirmation.

## Portal concept branch

User explicitly approved a new two-portal website to compare against the existing ribbon version. With hyzl opens trigger-driven product cards; Without hyzl remains static. Lead with turning intent into revenue and timely attention, not only lost subscription revenue. Detection may be immediate; outreach still follows eligibility, organic-purchase wait windows, consent and timing rules. The new-lead scenario is illustrative and availability is setup-dependent. This worktree and branch are separate from the original concept.

Copy preference (2026-09-09): Do not use em dashes in public copy or page titles. State the consumer subscription app audience in the hero, footer, and homepage metadata.

Required retained integration (2026-09-09): The original production login URL is https://app.atllasx.com/authentication/login. Preserve this exact external backend authentication destination in the main navigation, mobile menu, and footer. Do not substitute a branded domain without explicit confirmation. Authentication remains in the existing application.
