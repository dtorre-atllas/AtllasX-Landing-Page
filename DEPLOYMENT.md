# Deployment handoff

## Current delivery

This branch contains a complete React/Vite website. Build command: `npm run build`. Output: `dist`. No backend service or environment secrets are required for the public site.

Existing destinations are retained:
- Demo: https://meetings-na2.hubspot.com/d-torre/hyzl-revenue-recovery
- Login: https://app.hyzl.ai/authentication/login
- Documentation: https://docs.atllasx.com/
- Legal pages remain on app.atllas.com.
- Existing Intercom and ContentSquare integrations load only in production. Chat is opened from the footer to prevent automatic overlays covering the page. Email remains available if chat cannot load.

No production deployment or DNS changes have been made.

## Recommended publishing path

Import this GitHub repository into Vercel and first create a preview for this branch. The checked-in `vercel.json` configures build output, clean URLs, and permanent redirects for legacy routes. Validate the preview, then change the production domain only as a separate explicit deployment step.

This keeps GitHub as the source of truth and gives each change a reviewable preview and a rollback.

Other static hosts can serve the same `dist` folder. Configure extensionless URLs for the generated HTML files, legacy redirects equivalent to `vercel.json`, and `404.html` with a 404 status. Do not rewrite every unknown path to the homepage.

## Figma Make limitation

Figma's standard **Push to GitHub** integration is one-way. Changes pushed here do not automatically return to the Make project, and a later push from Make may overwrite external changes. The local-codebase workflow is a separate closed-beta capability; do not assume your account has it.

If you continue publishing through Make, confirm that your account supports importing this code before merging it into the branch Make controls. Keep this redesign on its separate branch until the publishing path is established.

Sources checked September 8, 2026:
- [Figma: Push from Make to GitHub](https://help.figma.com/hc/en-us/articles/35463818346647-Push-from-Figma-Make-to-GitHub)
- [Figma: Make in your local codebase](https://help.figma.com/hc/en-us/articles/40775535020695-Make-in-your-local-codebase)
- [Vercel Git deployments](https://vercel.com/docs/git)
- [Intercom launcher and notification attributes](https://developers.intercom.com/installing-intercom/web/attributes-objects)

## Launch checks

Check the HubSpot calendar availability, current contact/legal destinations, and available workflows with the team. Confirm analytics under the production domain. Validate mobile navigation, demo booking, direct page URLs, the sitemap, and legacy redirects on the deployed preview. No booking has been submitted during development.
