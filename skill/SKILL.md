---
name: svelte-multistyle-ui
description: How to use, configure, and theme the svelte-multistyle-ui Svelte 5 component library. Use this skill whenever the user is working with svelte-multistyle-ui — importing components, choosing a visual style (material, material3, fluent, brutalist, pixel, neon, metro, bootstrap, cartoon, illustration, carbon, liquid-glass), choosing or creating a color theme (default, ocean, forest, rose, midnight, gold, slate, candy, storm, royal, or a custom `.theme-*` preset), wiring dark/light mode, calling `initMultistyleUI`, using the `portal` action, or asking what components/props are available. Trigger it even when the user doesn't name the library explicitly but is building a Svelte 5 UI with multi-style/multi-theme components, asks for Material/Fluent/Brutalist/Liquid-Glass style components, or wants to create a custom color theme with `--t-*` tokens. Do NOT use for general Svelte, Tailwind, or chart.js questions unrelated to this library.
---

# svelte-multistyle-ui

A Svelte 5 component library where every component renders in many visual **styles** (Material, Fluent, Brutalist, Liquid Glass, …) and many color **themes** (default, ocean, forest, …). Use this skill to help users consume the library and to write custom themes.

## How the style/theme split works

Every component accepts two props:

- **`style`** — the visual design language. Default `"material"`. Applied as class `s-<component>-<style>`.
- **`theme`** — the color palette. Default `"default"`. Applied as class `theme-<theme>`.

```svelte
<Button style="brutalist" theme="forest">Save</Button>
```

Both are optional. If omitted, the component falls back to the global defaults set by `initMultistyleUI` (see `references/config.md`). Per-component props always win over the global default.

## Quick start (consuming app)

```bash
pnpm add svelte-multistyle-ui chart.js
```

```js
// +layout.svelte or root
import 'svelte-multistyle-ui/theme.css';   // full preset set (+ dark mode overrides)
// OR, to define your own themes:
// import 'svelte-multistyle-ui/theme-base.css';  // only --t-* token defaults, no presets
```

```svelte
<script>
  import { initMultistyleUI, Button } from 'svelte-multistyle-ui';
  initMultistyleUI({ style: 'material', theme: 'ocean', mode: 'system' });
</script>

<Button>Click me</Button>
```

Dark/light mode is toggled by adding `dark` / `light` classes to `<html>`. `mode: "system"` makes the library follow the OS preference. See `references/config.md`.

## Available styles (13)

| Style | Notes |
|---|---|
| `material` | default — Material Design |
| `material3` | Material 3 pill buttons |
| `fluent` | Microsoft Fluent |
| `brutalist` | square corners, hard shadows |
| `pixel` | retro pixel art |
| `neon` | cyberpunk glow |
| `metro` | Windows Metro/Modern |
| `bootstrap` | Bootstrap-like |
| `cartoon` | playful cartoon |
| `illustration` | illustrated look |
| `carbon` | IBM Carbon |
| `liquid-glass` | glassmorphism blur |

Not every component has an explicit override for every style — when a component has no `<component>-<style>` override it falls back to the style's base look. Floating-label form fields (Input/Textarea/Select) are enabled for `material`, `material3`, `fluent`, `carbon`, `bootstrap` only.

## Available themes (10 presets)

| Theme | Vibe | Dark-native? |
|---|---|---|
| `default` | corporate blue | no |
| `ocean` | blue/cyan | no |
| `forest` | green | no |
| `rose` | pink/red, rounded | no |
| `midnight` | deep indigo | **yes** |
| `gold` | amber/yellow | no |
| `slate` | neutral gray, thin border | no |
| `candy` | hot pink, very rounded | no |
| `storm` | cool gray | **yes** |
| `royal` | purple | **yes** |

Dark-native themes ship dark surfaces in both modes; the others flip to a dark palette under `html.dark`. To make your own, see `references/theme-system.md`.

## Writing a custom theme

Two paths — pick based on how much you want to override. Full guide in `references/theme-system.md`.

**Minimal:** import only the base and define a single preset class:

```css
/* your app's css, after importing theme-base.css */
.theme-brand {
  --t-primary: #ff5722;
  --t-secondary: #ff9800;
  --t-card-radius: 16px;
  --t-btn-radius: 10px;
}
html.dark .theme-brand {
  --t-surface: #1a1a1a;
  --t-text: #f5f5f5;
  /* …override dark values… */
}
```

```svelte
<Button theme="brand">Save</Button>
```

Only override the tokens you want to change — every unset token inherits the base default. Never hardcode colors inside component `<component>-styles.css`; always override `--t-*` tokens so all components stay consistent.

## Components

48 exported components + `initMultistyleUI` + the `portal` action. Each component has its own reference page under `references/`. Open the page for the component the user asks about — it has the full prop list, bindables, snippets, and events.

**Forms** — `references/<name>.md`:
[Input](references/Input.md) · [Button](references/Button.md) · [IconButton](references/IconButton.md) · [Textarea](references/Textarea.md) · [Select](references/Select.md) · [MultiSelect](references/MultiSelect.md) · [Checkbox](references/Checkbox.md) · [Radio](references/Radio.md) · [Toggle](references/Toggle.md) · [Slider](references/Slider.md) · [FileUpload](references/FileUpload.md) · [DatePicker](references/DatePicker.md) · [DropdownMenu](references/DropdownMenu.md) · [SortableList](references/SortableList.md)

**Layout** — [Card](references/Card.md) · [Divider](references/Divider.md) · [Tabs](references/Tabs.md) · [Accordion](references/Accordion.md) · [Modal](references/Modal.md) · [Drawer](references/Drawer.md) · [CommandPalette](references/CommandPalette.md) · [Row](references/Row.md) · [Column](references/Column.md) · [Grid](references/Grid.md)

**Navigation** — [Breadcrumb](references/Breadcrumb.md) · [Pagination](references/Pagination.md) · [Stepper](references/Stepper.md)

**Data display** — [Avatar](references/Avatar.md) · [Chip](references/Chip.md) · [Tooltip](references/Tooltip.md) · [ProgressBar](references/ProgressBar.md) · [Table](references/Table.md) · [Spinner](references/Spinner.md) · [Skeleton](references/Skeleton.md) · [ButtonGroup](references/ButtonGroup.md)

**Feedback** — [Alert](references/Alert.md) · [Rating](references/Rating.md) · [Popover](references/Popover.md) · [Toast](references/Toast.md)

**Charts** (chart.js wrappers, shared props in [charts-base](references/charts-base.md)) — [BarChart](references/BarChart.md) · [LineChart](references/LineChart.md) · [PieChart](references/PieChart.md) · [DoughnutChart](references/DoughnutChart.md) · [RadarChart](references/RadarChart.md) · [PolarAreaChart](references/PolarAreaChart.md) · [ScatterChart](references/ScatterChart.md) · [BubbleChart](references/BubbleChart.md) · [StackedBarChart](references/StackedBarChart.md) · [StackedLineChart](references/StackedLineChart.md) · [ComboChart](references/ComboChart.md)

**Advanced** — [FAB](references/FAB.md)

**Config & actions** — [config (initMultistyleUI)](references/config.md) · [theme-system](references/theme-system.md) · [portal](references/portal.md)

> `Carousel.svelte` exists in the source but is **not** exported from `index.js`. Do not recommend it unless the user is editing the library itself.

## Conventions to follow when advising users

- Every styled component takes `style` and `theme`; both optional, default to global `defaults`.
- `...rest` is spread onto the root element on all components — extra attrs/aria/class pass through.
- Two-way binding uses Svelte 5 `$bindable` props (e.g. `bind:value`, `bind:checked`, `bind:open`).
- This library uses **callback props** (`onclick`, `onclose`, `ondismiss`, per-item `onclick`), not Svelte's `createEventDispatcher`. Tell users to pass handlers as props.
- Content is rendered via Svelte 5 snippets (`{#snippet children()}…{/snippet}` and `{@render children?.()}`). For components that take a trigger + content (Popover), there is a named `content` snippet.
- Overlays (`Modal`, `Drawer`, `CommandPalette`) use the `portal` action to escape transformed ancestors.

## When working inside this repo (library dev)

If the user is editing the library itself (adding a component, a style override, or a theme preset), also read the project `CLAUDE.md` — it has the conventions for the two-prop API, class naming (`s-<component>`, `s-<component>-<style>`, `theme-<theme>`), and where styles live (`<component>-styles.css`). This skill focuses on *using* the library and *theming* it; the repo `CLAUDE.md` focuses on *extending* it.