---
name: hyzl — Portal edition
description: A quiet architectural installation for customer intent and considered action.
colors:
  paper: "#f4f5f5"
  ink: "#16181d"
  muted: "#575b61"
  green: "#237846"
  line: "#ced1d4"
  brand-green: "#2fab5d"
  footer: "#16181d"
  footer-text: "#f4f5f5"
  footer-muted: "#b9bdc4"
  action: "#2fab5d"
  action-hover: "#39b968"
  white: "#ffffff"
  card: "#ffffff"
  card-line: "#dce0e3"
  switch-selected: "#2fab5d"
  switch-text: "#16181d"
typography:
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.7
  reading:
    fontFamily: "Manrope, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.7
  button:
    fontFamily: "Manrope, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.4
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "12px"
    fontWeight: 400
rounded:
  control: "3px"
  action: "4px"
  card: "12px"
  circle: "50%"
spacing:
  inline: "8px"
  compact: "12px"
  group: "20px"
  content: "24px"
  spacious: "30px"
components:
  button-primary:
    backgroundColor: "{colors.action}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.action}"
    padding: "15px 20px"
  button-primary-hover:
    backgroundColor: "{colors.action-hover}"
  world-option:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "9px 17px"
  world-option-selected:
    backgroundColor: "{colors.switch-selected}"
    textColor: "{colors.switch-text}"
  action-card:
    backgroundColor: "{colors.card}"
    rounded: "{rounded.card}"
    padding: "25px 30px 18px"
---

# Design System: hyzl — Portal edition

## Overview

**Creative North Star: "Paired Architectural Thresholds"**

A quiet architectural installation gives customer intent a physical setting: pale mineral ground, machined graphite thresholds, brand-green signals, and photographic light. The supplied hyzl SVG remains the identity source. Manrope now carries both monumental statements and precise explanations; the earlier Kanit-and-ribbon system is not this edition’s visual authority.

This record follows the shipped portal CSS cascade and shared routes. The user pinned the paired-threshold metaphor; implementation was code-led, and the generated scene is a production asset, not an approved UI comp. Supporting pages preserve open ruled reading structures while inheriting this edition’s palette, typography, and rectangular actions.

**Key Characteristics:**
- Photographic architectural material with restrained interface chrome.
- One type family, substantial headline scale, and compact functional labels.
- Brand green identifies action and selected state.
- Layered cards explain a workflow; reading sections stay open.
- Manual controls and visible illustrative disclosures accompany motion.

## Colors

Neutral gray surfaces support the supplied brand charcoal (#16181D) and green (#2FAB5D). Large areas carry no sage tint. The footer uses charcoal with off-white text; green identifies actions and accents.

### Primary
- **Accessible Green** (`green`): functional links, selection cues, and focus outlines.
- **Brand Green Action** (`action`, `action-hover`): rectangular demo buttons and their hover response.
- **Selected Brand Green** (`switch-selected`, `switch-text`): comparison state with a charcoal readable label.

### Neutral
- **Mineral Paper** (`paper`): page canvas and mobile navigation.
- **Graphite Ink** (`ink`): primary reading text; **Muted Graphite** (`muted`): secondary explanations.
- **Mineral Rule** (`line`): reading-section dividers.
- **Porcelain Card** (`card`) and **Card Rule** (`card-line`): recurring workflow sheets and internal rows.
- **White** (`white`): workflow sheets. Primary-action labels use charcoal on exact brand green; small green text on light surfaces uses the darker accessible variant #237846.

**The Functional Green Rule.** Use green for action, selection, and workflow meaning; retain text labels so color never carries the distinction alone.

## Typography

**Display Font:** Manrope, sans-serif.
**Body Font:** Manrope, sans-serif; locally bundled weights 400, 500, 600, and 700.

The ramp is deliberately non-modular: large, close-set statements lead compact workflow details and more generous supporting-page prose. Frontmatter contains reused reading/control roles; headline values below describe their actual surface roles rather than a universal heading token.

### Hierarchy
- **Display:** home headline uses weight 500, `clamp(46px, 6.4vw, 92px)`, line height 1.09, tracking −0.04em. Mobile uses `clamp(40px, 10.8vw, 68px)` and line height 1.1.
- **Headline:** supporting page introductions use weight 400, `clamp(50px, 6.6vw, 104px)`, line height 1.02; mobile is 48px. Thesis and closing headings use weight 500 with the same tight tracking.
- **Title:** recurring action sheets use weight 500, `clamp(24px, 2.1vw, 31px)`, line height 1.18, tracking −0.03em; mobile is 26px.
- **Body:** portal explanation commonly uses the body role; supporting process prose uses reading. Hero explanation is 16px desktop and 13px mobile. Text columns remain bounded rather than spanning the full scene.
- **Label:** interface controls use 12–14px; selected steps add weight 600. Mobile workflow labels and disclosures have a 12px floor. Smaller desktop metadata exists but is not a general type token.

**The Single Voice Rule.** Use Manrope throughout this edition; size, weight, and spacing establish hierarchy.

## Layout

The home composition centers its headline over a photographic stage capped at 1360px with a 1672:941 ratio. Two semantic choice targets align to the physical thresholds. This paired topology belongs to the homepage experience, not to every site section.

The sticky header uses 5% gutters and an 84px height. The entered experience is 86% wide, capped at 1100px; its active body pairs a narrative rail with a card stack in a 0.82:1.18 grid and a 9% gap. Lower reading sections use 88% width capped at 1160px. Supporting page introductions retain a 2:1 editorial grid and ruled process rows.

At 1050px the experience widens to 90% and its columns become 0.7:1.3. At 760px, the header is 74px, the entry scene is 350px tall, reading grids stack, the world switch moves beneath Back/Close, triggers become a two-column grid, and all four stages form a horizontal row above the sheet. A permanent demo link stays beside the menu toggle. The active scene reserves at least 870px; quiet mode reserves 650px. Supporting routes retain inherited 1200px/760px adjustments. Spacing is an observed vocabulary, not a strict arithmetic scale.

## Elevation & Depth

The architectural raster supplies perspective, light, and grounded shadows. Workflow depth uses two rotated backing sheets beneath a soft-shadowed porcelain card. These are physical sheets, not hard offset shadow effects. On entry the scene becomes faint and blurred; quiet mode is faint and grayscale without transition. Reading sections use flat rules. The mobile menu has a soft overlay shadow.

### Shadow Vocabulary
- **Workflow sheet:** `0 24px 50px #16181d20`.
- **Mobile menu:** `0 15px 30px #16181d0b`.

**The Material Depth Rule.** Let the architectural image and workflow stack carry depth; keep reading sections flat and separated by space or fine rules.

## Shapes

Compact controls have small rectangular corners; workflow sheets have gently rounded corners. Step marks are circular. The shared measurement selector retains pill geometry as a local data-control pattern; it does not make every action a pill. Booking panels and editorial sections remain square. Drawn SVG arrows, checks, and navigation icons carry functions; decorative SVGs are hidden from assistive technology.

## Components

### Buttons

Primary actions use the frontmatter variant with brighter brand-green hover and no lift. A 0.2s background transition gives feedback. Shared keyboard focus uses a 2px forest outline with 5px offset; portal choice targets use 6px offset. Navigation actions are smaller (13px, 13px/19px padding). Text actions remain transparent with drawn arrows.

### Navigation

The supplied SVG sits opposite concise links and the demo action. Mobile uses an accessible Menu/Close toggle with `aria-expanded`, a mineral dropdown, and a permanent demo shortcut. Route changes close the menu and focus main content; a keyboard-visible skip link precedes it.

### World switch and trigger controls

The bordered world switch has a 5px outer corner and inset 3px option corners. Pressed state fills brand green with charcoal text. Four bordered trigger buttons identify abandoned paywall, new lead, cancellation, and failed payment. Selected triggers combine a darker green border with a pale green selected-state fill and text. Both groups use `aria-pressed`; trigger changes reset to Signal and pause playback.

### Workflow stack

Four reusable sheet states—Signal, Decision, First touch, Outcome—share a heading, explanatory copy, and a bottom next-action row. Supporting content changes between event details, eligibility checks, an illustrative message, and purchase/measurement explanation. Two backing sheets convey a coherent physical stack. The message preview is an inset neutral gray rectangle, not evidence of a real customer transcript. There is no text-input primitive in this build.

The stage rail combines text, circular selection marks, and completed checks. Selecting a stage or Next action pauses for reading. Entry into With starts one sequence with 5500ms per stage; Play/Pause/Replay controls remain explicit. Timers suspend when hidden or below the observer’s 0.1 intersection threshold; resuming starts the current stage’s timer again. Card arrival lasts 0.55s with `cubic-bezier(0.16, 1, 0.3, 1)`. Reduced motion disables automatic progression and card/scene transitions while preserving manual access. Manual changes use the live-region path; automatic progression does not repeatedly announce content.

### Quiet comparison and return path

Without remains a still explanation with no card sequence. The event appears in body copy beneath the heading; the note preserves the possibility of organic conversion. Both worlds remain switchable. Back, Close, and Escape dismiss the experience and restore focus to the selected side’s portal button.

### Supporting reading and measurement

Open ruled rows explain method, pricing, and contact constraints. The measurement component retains labelled cohorts, selectable examples, uncertainty, and a separate lift result. Booking uses a square neutral gray panel and an external scheduler handoff. Preserve these functional patterns without importing the retired ribbon homepage.

## Do's and Don'ts

### Do:
- **Do** preserve the supplied SVG identity and architectural material.
- **Do** keep both comparison choices labelled and keyboard reachable.
- **Do** keep illustrative disclosures, organic-conversion context, and conditional outcome language beside the demonstration.
- **Do** preserve manual workflow access, visible focus, and reduced-motion behavior.

### Don't:
- **Don’t** promote a purchase into proof of incremental revenue.
- **Don’t** introduce decorative telemetry, cartoon worlds, or unrelated space imagery.
- **Don’t** propagate kickers, glyph icons, hard offset shadows, or system display faces as house style.
- **Don’t** inherit legacy ribbon geometry, Kanit typography, or tiny incidental metadata as reusable tokens.

<!-- Evidence: src/app/site/PortalHome.css and PortalHome.tsx; src/app/App.tsx; src/styles/index.css; src/app/site/Pages.tsx; .impeccable/surfaces/portals.md; PRODUCT.md. Recorded 2026-09-08 from shipped implementation. Scope: portal-source only. Not canonized: residual desktop metadata below 12px and unused legacy ribbon styles; incidental small text is not a reusable type floor, and retired visual devices are not current authority. -->

## Palette refinement — September 9, 2026

User approved the portal design and requested brand alignment. Neutral page #f4f5f5, charcoal footer #16181d, off-white footer text #f4f5f5, secondary footer text #b9bdc4, and exact brand-green primary actions #2fab5d replace the muted forest/sage treatment. Layout, copy, and behavior are preserved.
