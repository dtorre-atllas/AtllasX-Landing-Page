# Redesign validation

Checked September 8, 2026.

Latest revision restores the first bright design after user review. The headline now says Recover lost revenue, with subscription AI context in the lead. Without hyzl replaces Held out in the two comparison labels. Caption placement was checked at 1440, 943, and 390 pixels, with no horizontal overflow. TypeScript, production build, and all three regression tests pass for the restored revision.

- TypeScript check passes.
- Production build passes and generates six static public pages, 404.html, and sitemap.xml.
- Three build regression tests pass: route-specific HTML/metadata/assets, honest example labeling and booking destination, sitemap/404 behavior.
- Dependency audit reports zero vulnerabilities.
- Desktop 1536, 1440, and 1248 widths plus mobile 390 were checked. No horizontal overflow in the tested viewports.
- Browser verified: mobile menu, navigation, direct production page loading and hydration, three recovery scenarios, larger/early measurement samples, FAQ expansion, diagram explanation, Pause/Resume trace, and HubSpot destination. No external booking or message was submitted.
- Motion has a static reduced-motion path; focus states and a skip link are included.
- Existing Intercom and ContentSquare load in production; chat opens from the footer.

## Independent design review

The reviewer scored all seven visual/interaction corrections resolved and found no material regressions. These covered ribbon amplitude, intervention markers, CTA typography, punctuation and spacing, removal of redundant labels, SVG icons, and the stoppable trace.

The Impeccable automated comparison remains an open **fix** record despite an 85% visual match score. Manual review accepts the actual supplied logo and darker green needed for readable white button labels; the comparator also reports missing regions that are visibly present. We have not represented this record as a passed automated gate. The remaining finding concerns workflow persistence, not an identified unresolved visual defect.

## Deployment scope

This is a review branch, not a production deployment. See DEPLOYMENT.md for the Figma/GitHub one-way sync limitation and the recommended preview path.
