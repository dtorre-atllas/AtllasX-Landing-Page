# hyzl public website

A React + Vite marketing site for functional AI and subscription revenue recovery.

## Local development

Requires Node 20 or later.

```sh
npm ci
npm run dev
```

## Verify and preview production

```sh
npm run typecheck
npm run build
npm test
npm run preview
```

The build produces six prerendered public pages, a 404 page, self-hosted fonts, and a sitemap in `dist/`. React hydrates the matching page; client navigation preserves the public URLs.

## Routes

- `/` — positioning, interactive recovery story, workflow scenarios, pricing explanation, FAQ
- `/how-it-works` — recovery sequence
- `/churn-intelligence` — holdout measurement and uncertainty
- `/pricing` — incremental-revenue commercial model
- `/demo` — existing HubSpot scheduling destination
- `/trust` — consent, contact rules, and verification

Legacy route redirects are recorded in `vercel.json` and the client router. `/roi` now leads to the measurement explanation; the old speculative revenue calculator was retired.

## Editing

- `src/app/App.tsx`: shared shell, homepage, FAQ, navigation
- `src/app/site/`: supporting pages and interactive examples
- `src/app/site/RecoveryStory.tsx`: the four-stage ribbon story, pause/replay, offscreen suspension, and reduced-motion handling
- `src/styles/index.css`: design tokens, responsive styles, reduced motion
- `scripts/prerender.mjs`: static HTML and sitemap generation
- `src/app/components/Intercom.tsx`: existing support/analytics integrations, production only

Numbers and messages in the interactive examples are explicitly illustrative. No customer results, testimonials, or partner endorsements have been invented. Do not promote rollout features to generally available claims without confirmation.

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md). The branch does not change the live domain or deployment.

The original Figma project is https://www.figma.com/design/zh9ok72YH2mZEc9yWd20iW/AtllasX-Landing-Page.
