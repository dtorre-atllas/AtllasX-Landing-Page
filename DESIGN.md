---
name: hyzl
description: A bright scientific publication for functional AI and measured revenue recovery.
colors:
  paper: "#f5f6f6"
  ink: "#16181d"
  muted: "#535959"
  green: "#237846"
  line: "#c9cecc"
  green-hover: "#185b34"
  white: "#ffffff"
  sage-surface: "#e4eae5"
  workflow-rule: "#627065"
  workflow-note: "#b4c2b8"
typography:
  page-headline:
    fontFamily: "Kanit, sans-serif"
    fontSize: "clamp(56px, 7.3vw, 122px)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  section-headline:
    fontFamily: "Kanit, sans-serif"
    fontSize: "clamp(42px, 5.6vw, 94px)"
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: "-0.035em"
  process-title:
    fontFamily: "Kanit, sans-serif"
    fontSize: "36px"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.7
  lead:
    fontFamily: "Manrope, sans-serif"
    fontSize: "22px"
    fontWeight: 400
    lineHeight: 1.5
  button:
    fontFamily: "Manrope, sans-serif"
    fontSize: "17px"
    fontWeight: 600
    lineHeight: 1.4
  text-link:
    fontFamily: "Manrope, sans-serif"
    fontSize: "16px"
    fontWeight: 500
rounded:
  pill: "40px"
  segment: "32px"
  circle: "50%"
spacing:
  inline-small: "8px"
  inline: "16px"
  control-gap: "20px"
  content: "24px"
  group: "32px"
  section: "60px"
components:
  button-primary:
    backgroundColor: "{colors.green}"
    textColor: "{colors.white}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "17px 24px"
  button-primary-hover:
    backgroundColor: "{colors.green-hover}"
  text-link:
    typography: "{typography.text-link}"
    textColor: "{colors.ink}"
  text-link-hover:
    textColor: "{colors.green}"
  segment:
    backgroundColor: "transparent"
    rounded: "{rounded.segment}"
    padding: "11px 18px"
  segment-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  booking-panel:
    backgroundColor: "{colors.sage-surface}"
    padding: "36px 40px"
---

# Design System: hyzl

## Overview

**Creative North Star: "The Scientific Publication"**

hyzl pairs the openness of a contemporary scientific publication with the scale of an engineering launch. Cool paper, measured rules, monumental headings, and a functional green make the interface feel precise and direct. Supporting pages retain the same materials and typography without reproducing the home composition.

The interface explains a process through labelled diagrams, comparison groups, ordered steps, and short disclosures. Its expressive material is a translucent recovery ribbon; the surrounding controls and text remain crisp. This record is derived from the final CSS cascade and React implementation, including the retained supplied SVG brand and contrast-safe control green.

**Key Characteristics:**
- Monumental Kanit headings with readable Manrope explanations.
- Open editorial grids divided by fine rules.
- Functional green for actions and the treated comparison group.
- Translucent diagram material surrounded by flat interface surfaces.
- Visible illustrative labels and user-controlled motion.

## Colors

Cool neutral materials carry the reading surface; green identifies action and treatment, while quieter gray-green marks the held-out comparison.

### Primary
- **Functional Green** (`green`): primary demo actions, treated data, intervention traces, focus outlines, and green punctuation. This is deliberately darker than the supplied logo green; preserve the SVG's embedded brand colors independently.
- **Deep Action Green** (`green-hover`): primary action hover state.

### Neutral
- **Cool Paper** (`paper`): page canvas, navigation, and intervention explanation.
- **Ink** (`ink`): primary text and selected sample controls.
- **Muted Graphite** (`muted`): secondary explanations, sample details, and method notes.
- **Measured Rule** (`line`): fine structural separators and control boundaries.
- **White** (`white`): primary button text and active workflow text.
- **Sage Surface** (`sage-surface`): quiet supporting bands, booking container, and footer.
- **Workflow Rule** (`workflow-rule`) and **Workflow Note** (`workflow-note`): recurring dividers and supporting text inside the dark workflow surface. Its local dark green ground and pale message block are component materials, not a second accent palette.

**The Functional Green Rule.** Use green to connect actions, treatment data, and the intervention; retain textual group labels so meaning does not depend on color.

## Typography

**Display Font:** Kanit, sans-serif; locally bundled weight 400.
**Body Font:** Manrope, sans-serif; locally bundled weights 400, 500, 600, and 700. There is no separate monospace family.

The type ramp is intentionally non-modular: very large, close-set display text is balanced by smaller reading and measurement text. The frontmatter records reusable roles; component-specific headline sizes remain local.

### Hierarchy
- **Display:** the home heading uses `clamp(90px, 11.75vw, 210px)`, weight 400, line height 0.86, and tracking −0.04em. This is a home composition value, not the default for all headings.
- **Headline:** page introductions and section headings use the frontmatter roles. Workflow headings have their own scale, `clamp(44px, 5.7vw, 96px)`, with line height 1.04.
- **Title:** ordered process titles use the smaller Kanit role. Workflow story titles use `clamp(36px, 3.5vw, 58px)` with line height 1.08.
- **Body:** explanatory copy uses Manrope, usually 17px with line height 1.65–1.7; lead paragraphs use the larger role. Local reading columns commonly cap at 440–510px.
- **Label:** Manrope metadata is generally 11–14px on desktop. Keep small labels descriptive and subordinate; they are not invented section kickers.
- **Numbers:** comparison rates and estimated lift use Kanit at weight 400; rate numerals use tabular figures. Units are visibly subordinate to values.

**The Two Voices Rule.** Kanit carries headings and large results; Manrope carries explanations, controls, labels, and disclosures.

## Layout

The site uses a fluid editorial grid. Desktop outer gutters are 3.65%; common content sections begin with a fine top rule and 36px top / 100px bottom padding. Spacing values are an observed vocabulary rather than a rigid arithmetic scale. There is no shared fixed-width page container.

Supporting introductions use a 2:1 grid with an 8% gap. Workflow and explanation bodies use two columns; ordered process rows align a number, title, and explanation. Measurement uses two cohort columns and a separate lift column (`1fr 1fr 1.1fr`). The home heading/explanation division is locally 68.2% / 31.8%.

At 1200px and below, the home split becomes 65% / 35%, navigation gaps tighten, and some secondary cohort labels disappear while primary labels remain. At 760px and below, gutters become 6%, most editorial grids stack, the menu becomes a disclosure, and process rows retain a narrow number rail. Cohorts remain a two-column comparison; lift moves below them. Workflow selectors become full-width rows and the footer becomes two columns after a full-width brand line.

Mobile page headlines use `clamp(46px, 11.5vw, 80px)` and line height 1.03; the home heading uses 18vw and line height 0.92. The home explanation stacks above two adjacent actions, with its audience note below. Section padding becomes 30px top / 58px bottom. At 1700px and above, the home composition receives additional vertical room.

**The Ruled Page Rule.** Separate reading groups with whitespace and fine rules; reserve filled containers for content with a distinct role, such as a message example or booking handoff.

## Elevation & Depth

Interface surfaces are principally flat. The ribbon image carries translucent shading and depth; preserve that material instead of imposing a global no-shadow prohibition. The intervention explanation and mobile navigation use soft shadows because they overlay content. The intervention node has a soft halo, with a brief signal on expansion.

### Shadow Vocabulary
- **Explanation overlay:** `0 12px 30px #16181d12`.
- **Mobile navigation:** `0 15px 30px #16181d0b`.
- **Intervention halo:** `0 0 0 5px #f5f6f670`, expanding on hover to `0 0 0 9px #23784622`.

**The Material Depth Rule.** Depth belongs to the ribbon and transient overlays; reading sections remain flat and ruled.

## Shapes

Primary actions and segmented controls use pill geometry; data marks, intervention nodes, and accent dots are circular. Message examples, booking panels, and explanation overlays are square cornered. Fine solid borders define content and controls; dashed guide lines locate the intervention in the diagram. Do not apply pill radii to editorial containers by default.

The supplied header SVG is the identity source. The typographic footer name is an implemented footer treatment, not a replacement master logo. Arrows, menu, close, and disclosure marks use drawn Lucide SVG geometry. Shared arrows are 19px with 1.5 stroke width on desktop and 16px on mobile; contextual actions may override size. The hero action arrow is 25px desktop and 18px mobile. Keep decorative SVGs hidden from assistive technology and name the containing action.

## Components

### Buttons

Confident pill actions use the primary frontmatter variant. Hover deepens green and lifts by 2px over 0.2s. Keyboard focus is a green 2px outline with a 5px offset. The navigation variant omits the arrow; its final desktop label is 18px with 13px / 23px padding. The prominent home action uses 24px text and 13px / 24px padding; mobile reduces it to 14px text and 15px / 20px padding. Reuse the normal button role elsewhere.

### Text links

Manrope medium-weight labels pair with drawn horizontal or diagonal arrows. Hover turns the text green. Footer links instead underline with a 5px offset. Focus uses the same visible outline as buttons. The standard demo action leads to the demo information page; the booking panel provides the external scheduler handoff.

### Sample selector

A ruled outer pill holds two inset pill buttons. Selected state uses ink with paper text and `aria-pressed`; it changes the comparison content in a polite live region. Preserve both the positive-lift and inconclusive examples, including the interval and illustrative-data disclosure. The build has no separate chip taxonomy or text-input system to inherit.

### Cards / Containers

The square booking panel uses sage fill and the documented padding; mobile padding is 26px. The illustrative message uses a pale local material (`#e7eee7`), ink text, and 24px / 26px padding, becoming 22px on mobile. It is a sample-message container with sender, message, and action row, not a testimonial. Reading sections use open rows rather than a general card grid.

### Navigation

A supplied SVG brand sits opposite concise navigation and a demo action. Mobile opens a paper menu beneath the header with a fine bottom rule and soft shadow; its toggle exposes `aria-expanded` and switches between Menu and Close with SVG icons. A route change closes it. The skip link appears on keyboard focus; route transitions focus the main content.

### Recovery diagram

The static ribbon image and HTML labels remain the primary explanation. The labelled intervention node opens a bordered explanatory overlay, which closes using its SVG close control, the node, or Escape. A two-second SVG trace (`ease-out`) starts on opening, can pause/resume, and can replay after completion. Labels and diagram remain present throughout. Reduced motion suppresses the trace and its playback control, disables animation/transitions globally, and switches scrolling to immediate behavior.

### Workflow and disclosures

Workflow selection uses three ruled rows on mobile or three horizontal options on desktop. Active state combines brighter text and a pale underline with `aria-pressed`; content updates in a polite live region. Keep scenario numbers and illustrative captions attached to the example. FAQ uses native details/summary; its drawn plus rotates 45 degrees on expansion and answers remain muted, generously led text.

**The Visible Evidence Rule.** Keep synthetic examples visibly labelled and preserve uncertainty next to results; decorative treatment must never imply verified customer evidence.

## Do's and Don'ts

### Do:
- **Do** preserve the supplied SVG brand and use the darker functional green for readable actions.
- **Do** pair Kanit headings with Manrope reading text and keep tracking no tighter than −0.04em.
- **Do** preserve group labels, method disclosures, and inconclusive comparison states.
- **Do** keep the diagram understandable before animation and when motion is reduced.
- **Do** use drawn SVG icons with accessible action names and visible keyboard focus.

### Don't:
- **Don't** replace labelled product explanations with decorative telemetry or unrelated imagery.
- **Don't** invent customer evidence, testimonials, or transcript authenticity through visual presentation.
- **Don't** introduce section kickers, hard offset shadows, glyph icons, or system display faces as house style.
- **Don't** propagate one-off geometry, small incidental labels, or unused CSS selectors as reusable tokens.

<!-- Evidence: src/styles/index.css (final cascade), src/app/App.tsx, src/app/site/Measurement.tsx, Workflow.tsx, Pages.tsx; PRODUCT.md and ../.impeccable/planning/surface-contract.md. Recorded 2026-09-08. Visual review fixes 1–7 resolved according to ../.impeccable/review/finish-verdict.md. Automated comparison/persistence remains unresolved; this system document is not a passed finish gate. -->
