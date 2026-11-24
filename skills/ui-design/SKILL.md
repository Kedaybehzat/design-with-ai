---
name: ui-design
description: Designs mobile and web UI screens that look intentional instead of AI-generic. Use whenever you are asked to design, mock up, restyle or critique a screen, app, landing page or component.
version: 0.2.0
owner: "@Team1-Turkiye"
tags: [ui, ux, design, workshop]
---

# UI Design

You are designing for real people, not for a screenshot. Your default output is the statistical average of every interface you have seen, and the average looks generic. This skill replaces that default with decisions.

Follow the steps in order. Do not skip the brief, and do not skip the self-critique.

## When to use

- Designing a new screen, flow, landing page or component.
- Restyling or improving an existing design.
- Critiquing a design (run only steps 5 and 6).

Do not use it for pure backend work or for copy that has no interface.

## Prerequisites

- `DESIGN.md` at the repo root. It holds the team's decisions: persona, tone, palette, typefaces, spacing, references.
- A brief that says what the screens are for (for the workshop: `brief/kampus-etkinlik.md`).

If `DESIGN.md` is missing or still has `TODO` in it, stop and ask the user to fill in the missing decisions. Never invent a palette or a font pair on their behalf without saying so.

## Steps

### 1. Restate the brief

Before writing any code, write three short lines:

- **Who** uses this (from the persona in `DESIGN.md`) and in what situation.
- **The one job** each screen must do.
- **The one action** the user should take on each screen.

Expected result: three lines the user could disagree with. If they are vague, the design will be too.

### 2. Turn DESIGN.md into tokens

Declare every decision as a CSS custom property before any component:

```css
:root {
  /* color: 60 / 30 / 10 */
  --bg: ...;          /* 60%: page background */
  --surface: ...;     /* 30%: cards, sections */
  --accent: ...;      /* 10%: the one primary action, nothing else */
  --text: ...;
  --text-muted: ...;
  /* type */
  --font-display: ...;
  --font-text: ...;
  --size-1: ...; --size-2: ...; --size-3: ...; --size-4: ...; --size-5: ...;
  /* space: 8pt grid */
  --space-1: 4px; --space-2: 8px; --space-3: 16px; --space-4: 24px; --space-5: 32px; --space-6: 48px;
  --radius: ...;
}
```

After this step, no raw hex value, font name or pixel spacing appears outside `:root`.

### 3. Lay out the hierarchy before the decoration

For each screen, decide the reading order (1st, 2nd, 3rd thing the eye hits) and build that with size, weight, position and space alone. Colors, images and shadows come after the structure works in grayscale.

### 4. Build

Follow the rules in **Principles** and avoid everything in **Anti-patterns**. Use realistic content in the product's language: real-sounding event names, dates, places and people. Never use lorem ipsum, "Event Title" or "John Doe".

### 5. Self-critique

First look at the rendered result. If you can open a browser or take a screenshot, do it, and check every screen for text that overlaps, gets clipped, overflows its frame or runs into its label. If you cannot render it, say so in the report; do not claim visual checks you did not do.

Then score the result against the **Verification** checklist. For every item that fails, write one line: what is wrong, where, and the concrete fix (e.g. "Register button: 3.1:1 contrast, darken accent to #B3261E").

### 6. Fix and report

Apply the fixes. Then report to the user in this order:

1. The three brief lines from step 1.
2. The decisions you made that were not in `DESIGN.md`.
3. The checklist result, before and after.

## Principles

### Hierarchy

- Each screen has exactly one most important element. If everything is bold, nothing is.
- Build importance with size, weight and space first, color last.
- Secondary information (dates, meta, labels) is smaller and muted, not just smaller.

### Color

- 60 / 30 / 10: background, surfaces, accent. The accent marks the primary action and almost nothing else.
- Use at most one accent hue. A second hue needs a job (e.g. success state).
- Tone your neutrals: off-white and near-black (e.g. `#FAF8F5`, `#1A1A1F`), not pure `#FFFFFF` and `#000000`.
- Color is never the only signal: a status also has a word or an icon.

### Contrast

- Body text: at least **4.5:1** against its background.
- Large text (24px+, or 18.5px+ bold) and icons: at least **3:1**.
- Placeholder and disabled text still need to be readable; muted is not invisible.

### Typography

- At most **two** typefaces: one for display, one for text. A monospace only if it has a job.
- A type scale of 4 to 5 sizes, reused everywhere. Emphasize with weight, not with a new size.
- Body text 16px or larger on mobile. Line height 1.4 to 1.6 for body, 1.1 to 1.25 for headings.
- Line length 45 to 75 characters for reading text.

### Spacing and layout

- Every spacing value comes from the 8pt scale.
- Proximity: things that belong together sit closer together than things that do not. Space inside a group is smaller than space between groups.
- Align to a small number of edges. Left-aligned text is the default; center only short, standalone lines.
- Give content room. When in doubt, add space, not borders.

### Interaction

- Touch targets at least **44 × 44 px**.
- Every interactive element has visible states: default, pressed/hover, disabled, focus.
- Forms: visible labels above fields (not placeholder-only), clear error messages next to the field, the primary button at the end of the flow.

## Anti-patterns

These are the signatures of an AI-generated interface. Do not use them unless `DESIGN.md` asks for them by name.

- Purple-to-blue (or any rainbow) gradients on backgrounds, buttons or text.
- Emoji used as icons.
- Every section centered, every card the same size.
- Cards inside cards inside cards.
- Glassmorphism, glows and heavy drop shadows on everything.
- A generic hero: big gradient headline, vague subtitle, two buttons.
- Invented stats and testimonials ("10K+ happy users").
- Five different font sizes on one card; three accent colors on one screen.
- Inter / system font everywhere by default, with no decision behind it.
- Decorative icons next to every label.

## Verification

The design is done when every line is true. Write ✅ or ❌ next to each in your report.

- [ ] Each screen has one clear most-important element and one primary action.
- [ ] All colors, fonts and spacings come from the tokens in `:root`.
- [ ] Body text contrast ≥ 4.5:1, large text and icons ≥ 3:1.
- [ ] Two typefaces or fewer; type scale of five sizes or fewer.
- [ ] Spacing follows the 8pt scale; related items are grouped by proximity.
- [ ] Touch targets ≥ 44 × 44 px; buttons and inputs have visible states.
- [ ] Form fields have visible labels and error messages.
- [ ] No item from **Anti-patterns** is present.
- [ ] The rendered screens were looked at: no overlapping, clipped or colliding text, nothing overflows its frame.
- [ ] Content is realistic and in the product's language.
- [ ] Every rule in **Team learnings** below is followed.

## Common failures

| Symptom | Fix |
| --- | --- |
| "Looks like every other AI app." | Re-read Anti-patterns; remove gradients and emoji first, then reduce the accent to the primary action only. |
| Everything feels equally important. | Pick the one element per screen; shrink and mute the rest. |
| Crowded, hard to scan. | Increase the space between groups, not inside them. |
| Accent color is everywhere. | Accent only on the primary action and the active state. |
| Label and value run together (e.g. "DüzenleyenYazılım"). | Put the label above the value, or give the label column a fixed width and a 16px gap. |
| Text hard to read on colored backgrounds. | Check the ratio; darken or lighten until it passes 4.5:1. |

## Team learnings

<!--
WORKSHOP ROUND 3: Add what YOUR team learned here.
Each rule you add is a rule the agent follows next time.
Write it as: Rule / Why / Example. Turkish is fine.

Example:
- **Kural:** Etkinlik kartında tarih, başlıktan önce okunmalı.
  **Neden:** Öğrenci önce "ne zaman" diye bakıyor, sonra "ne".
  **Örnek:** Tarih kartın sol üstünde, kalın ve accent renkte; başlık altında.
-->

- _No team rules yet._
