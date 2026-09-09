# Portal comparison validation

Checked September 8, 2026. This record applies to `codex/hyzl-portals`; the prior ribbon version is preserved on `codex/hyzl-redesign`.

## Build and interaction checks

- TypeScript, production build, and three static regression tests pass. The build prerenders six public pages and a 404 page.
- Entry, active, and inactive portal states were checked at 1440, 943, and 390 pixel viewport widths. Final entry checks found no horizontal overflow. A one-pixel mobile label overflow was corrected.
- All four triggers and manual workflow steps were exercised. Automatic advancement, pause, and replay were checked. The inactive path renders no product cards.
- Escape closes the experience and restores focus to the opener. Close and switch controls work.
- Mobile demo and measurement pages load directly without horizontal overflow. The demo retains the existing HubSpot destination. No booking or external message was submitted.
- Reduced-motion, hidden-tab, and offscreen suspension are implemented and reviewed in source; these conditions were not emulated in the browser.
- The generated portal illustration is a 57.59 KB WebP with adjacent prompt/provenance files.
- Impeccable detector reports no non-advisory findings. Its token advisories compare the new world against the previous DESIGN.md; the replacement system is documented separately at finish.

## Independent finish review

The reviewer’s final disposition was **ship** at the scope of two scored corrections: larger mobile controls and qualifications, and moving the quiet-state event beneath the headline. Both were resolved. The full desktop capture was replaced to include the complete footer. The reviewer observed no material regressions in that verdict pass.

## Deployment scope

This is a separate comparison branch and local preview. No production deployment or DNS changes were made. See DEPLOYMENT.md for publishing details.

## Brand palette refinement — September 9, 2026

Replaced sage surfaces with neutral gray, the footer with supplied brand charcoal, and primary actions with exact logo green and charcoal text. Production build passes. Browser checked the how-it-works page, mobile entry, active first-touch card, selected state, and footer; mobile remains 390px without overflow. Contrast ratios: primary action 6.01:1, footer body 16.26:1, footer secondary 9.42:1, secondary page text 6.25:1, green text links 5.00:1. Layout, copy, and behavior are unchanged. This is a local palette refinement, not a new independent whole-surface review.
