# Patterns

Component recipes for the base style. Every value comes from `theme.css`. Copy the structure, then adapt the content to the brief. Do not copy these comments into the product.

**Lines and backgrounds.** A border is always `1px solid var(--line)` (or `--line-strong` / `--field-line`) on all sides it is drawn on, with the same color end to end. No `border-image`, no gradient borders, no `mask-image` or pseudo-element fades on edges. Backgrounds are a flat `background: var(--…)`: no `radial-gradient`, dot or grid patterns, noise images or blur.

## App shell

The app fills the whole browser window, edge to edge and top to bottom, like a real product. It is **never** a single card floating in the middle of the page with empty canvas around it.

```css
.app     { min-height: 100vh; display: grid; grid-template-rows: auto 1fr; background: var(--canvas); }
.topbar  { position: sticky; top: 0; z-index: 10; height: 56px; display: flex; align-items: center;
           justify-content: space-between; gap: var(--space-4); padding: 0 var(--space-5);
           background: var(--panel); border-bottom: 1px solid var(--line); }
.body    { display: grid; grid-template-columns: 232px 1fr; min-height: 0; }      /* with a sidebar */
.sidebar { background: var(--panel); border-right: 1px solid var(--line); padding: var(--space-4) var(--space-3); }
.main    { padding: var(--space-5) var(--space-6); display: grid; gap: var(--space-5); align-content: start; min-width: 0; }
.title   { font-size: var(--size-3); font-weight: 500; }
.subtitle{ font-size: var(--size-2); color: var(--text-2); }
```

- The top bar runs the full width: product mark and name on the left, search in the middle or right, then the theme toggle and the user.
- Use a left sidebar when there are 3 or more sections; otherwise put the sections as a segmented control in the top bar.
- `.main` uses the full width. Lay regions out with grid columns (for example a list beside a detail pane, or a board of columns). Cap the width only of reading text and forms (about 720 px), not of the app.
- Regions inside `.main` (tables, tiles, panes) are panels with `--radius-md`. The large radius `--radius-lg` is only for modals, drawers and popovers.

## Segmented control (filters, tabs)

A pill track with pill options. The active option gets a raised fill. Each option can carry a count in `--text-3`.

```css
.seg        { display: inline-flex; padding: 3px; gap: 2px; border: 1px solid var(--line);
              border-radius: var(--radius-pill); background: var(--inset); }
.seg button { height: 32px; padding: 0 var(--space-4); border: 0; border-radius: var(--radius-pill);
              background: transparent; color: var(--text-2); font: inherit; cursor: pointer; }
.seg button[aria-pressed='true'] { background: var(--chip); color: var(--text); }
.seg .count { margin-left: 6px; color: var(--text-3); }
```

## Stat tiles

Three or four tiles in a row. Each has a label, a value with a smaller muted unit, and one small visual: a bar strip, or a meter with a marker. A tile never holds more than one number, and the number is the largest thing in it. Put the visual at the bottom so every tile in the row has the same baseline.

```css
.tiles  { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-3); }
.tile   { background: var(--inset); border: 1px solid var(--line); border-radius: var(--radius-md);
          padding: var(--space-4); display: grid; gap: var(--space-2); }
.label  { color: var(--text-2); }
.value  { font-size: var(--size-4); font-weight: 500; letter-spacing: -0.01em; }
.unit   { font-size: var(--size-2); color: var(--text-3); margin-left: 4px; font-weight: 400; }
```

- **Bar strip:** 20 to 30 bars, 4 px wide with a 2 px gap, in a 28 px tall row aligned to the bottom. Each bar's height maps to a real value (for example events per day); a zero is a 3 px stub in `--bar-soft`, never a dot. Older bars are `--bar-soft`, recent ones `--bar`, the latest one `--accent`. This is the only accent in the tile.
- **Meter:** a 4 px track (`--track`) with a fill (`--text-2`) and a 1 px vertical marker for the limit or target.

## Data table

The main content of a list screen. Rows are flat, separated by hairlines, and the whole row is the click target.

```css
.table-wrap { background: var(--inset); border: 1px solid var(--line); border-radius: var(--radius-md); padding: var(--space-2); }
.thead, .row { display: grid; grid-template-columns: var(--cols); align-items: center; gap: var(--space-4);
               padding: 0 var(--space-3); }
.thead { height: 40px; color: var(--text-3); font-size: var(--size-1); }
.row   { min-height: var(--row-h); border-top: 1px solid var(--line); border-radius: var(--radius-sm);
         cursor: pointer; transition: background 120ms var(--ease); }
.row:hover { background: var(--hover); }
.cell-num { text-align: right; font-variant-numeric: tabular-nums; }
```

- Column headers are `--text-3`, never bold. Numeric columns are right-aligned, and their header is right-aligned too.
- Lead each row with a 20 px status circle (`--chip` fill, 12 px icon in `--text-2`).
- Secondary or replaced values use `--text-3`. A replaced value can be struck through and followed by an arrow and the new value.
- A dashed 1 px vertical line in `--line-strong` marks a threshold across all rows (for example capacity or a deadline).

## Selected / expanded row

Selecting a row opens its detail in place instead of on a new page, when the detail is short.

```css
.row[aria-expanded='true'] { background: var(--accent-tint); border: 1px solid var(--accent-line); border-radius: var(--radius-md); }
.row-detail { display: grid; gap: var(--space-3); padding: var(--space-3) var(--space-3) var(--space-4) 44px; }
```

The detail holds numbered sub-rows (step number in `--text-3`, name, status chip, bar) and a row of ghost pill buttons with the actions. A short meta note sits on the right in `--text-3`.

## Chips

```css
.chip        { display: inline-flex; align-items: center; height: 26px; padding: 0 10px;
               border-radius: var(--radius-pill); background: var(--chip); color: var(--chip-text); font-size: var(--size-1); }
.chip.accent { background: var(--accent-tint); color: var(--accent-text); }
```

A chip always says what it means in words ("Dolu", "12 yer kaldı", "Onaylandı"). Use the accent chip for the positive or current state only. Use the neutral chip for everything else.

## Buttons

```css
.btn         { height: var(--control-h); padding: 0 var(--space-4); border-radius: var(--radius-pill);
               font: inherit; font-weight: 500; cursor: pointer; transition: background 120ms var(--ease); }
.btn.ghost   { background: transparent; color: var(--text); border: 1px solid var(--line-strong); }
.btn.ghost:hover { background: var(--hover); }
.btn.primary { background: var(--btn); color: var(--btn-text); border: 0; height: var(--control-h-lg); padding: 0 var(--space-5); }
.btn.primary:hover { opacity: 0.88; }
.btn:disabled { opacity: 0.45; cursor: not-allowed; }
```

There is one primary button per screen, and it sits at the end of the flow (bottom right of the panel or form). Every other action is ghost.

## Form

```css
.field  { display: grid; gap: 6px; }
.field label { color: var(--text-2); }
.input  { height: var(--control-h-lg); padding: 0 var(--space-3); border-radius: var(--radius-sm);
          border: 1px solid var(--field-line); background: var(--inset); color: var(--text); font: inherit; }
.input::placeholder { color: var(--text-3); }
.input[aria-invalid='true'] { border-color: var(--danger); }
.error  { color: var(--danger); font-size: var(--size-1); }
```

Put labels above fields and group related fields in a two-column grid. A summary of what the user is signing up for (name, date, place) sits beside or above the form in an inset tile.

## Footer bar

Use it at the bottom of a table or pane, not as a page footer.

```css
.footer { display: flex; align-items: center; justify-content: space-between; margin-top: var(--space-4); color: var(--text-3); }
```

On the left, one line of context in `--text-3` ("12 / 48 etkinlik gösteriliyor"). On the right, a ghost button and the primary button.

## Icons

Draw them as inline SVG: 16 px, 1.5 px stroke, `currentColor`, round caps. Use only the few icons that carry meaning: back, check, close, arrow, calendar, pin. Never use emoji.

## Theme toggle

```jsx
// start from ?theme=… if the page set it, otherwise the DESIGN.md default
const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'dark');
useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);
```

Show it as a small ghost icon button in the top bar. Both themes must pass the same contrast checks.
