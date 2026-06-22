# svelte-multistyle-ui

A multi-style, multi-theme **Svelte 5** component library. Every component can render in more than a dozen visual design languages (styles) and switch between several color palettes (themes) via two simple props.

**Live demo:** https://avinashskaranth.github.io/svelte-multistyle-ui/

## Features

- **Svelte 5 native** — uses runes (`$props`, `$state`, `$derived`, `$effect`) and snippets (`{@render children?.()}`).
- **12 visual styles** — material, material3, fluent, brutalist, pixel, neon, metro, bootstrap, cartoon, illustration, carbon, liquid-glass.
- **10 color themes** — default, ocean, forest, rose, midnight, gold, slate, candy, storm, royal.
- **CSS custom-property based theming** — easy to override or build custom themes without forking.
- **Tailwind CSS v4** friendly — no `tailwind.config.js` required; just import the theme CSS.
- **Playwright visual tests** for the interactive demo gallery.

## Installation

```bash
npm install svelte-multistyle-ui
# or
pnpm add svelte-multistyle-ui
```

> Requires Svelte `^5.0.0` and Chart.js `^4.5.1` as peer dependencies (Chart.js is only needed if you use the chart components).

## LLM skill

This repo ships a LLM skill (in [`/skill`](./skill)) that teaches your coding agent the library's API — every component's props, all styles/themes, and how to write custom `--t-*` themes. Add it to your own project so Claude can help you build with this library:

```bash
npx skills add https://github.com/AvinashSKaranth/svelte-multistyle-ui/skill
```

## Quick start

Import the theme stylesheet once in your app, then use any component:

```svelte
<script>
  import 'svelte-multistyle-ui/theme.css';
  import { Button, Card } from 'svelte-multistyle-ui';
</script>

<Card style="material" theme="ocean" elevated>
  {#snippet children()}
    <h2>Hello</h2>
    <Button style="material" theme="ocean" variant="filled">
      {#snippet children()}Get started{/snippet}
    </Button>
  {/snippet}
</Card>
```

## Global configuration

Import `initMultistyleUI` once in your app (e.g. `+layout.svelte` or `App.svelte`) to set the default `style`, `theme`, and color `mode` for every component at once. Per-component `style`/`theme` props still override these defaults.

```js
import { initMultistyleUI } from "svelte-multistyle-ui";

initMultistyleUI({
  style: "material", // visual design system
  theme: "ocean", // color theme preset
  mode: "system", // "system" | "light" | "dark"
});
```

`defaults` (a reactive `$state` object) and `iconClass` (the CSS class used to render icon names — defaults to `material-symbols-outlined`) are also exported for advanced use.

## Actions

A Svelte action for portaling content to `document.body`:

```svelte
<script>
  import { portal } from 'svelte-multistyle-ui';
</script>

<div use:portal>Portaled content</div>
```

## Components

The library exports the following components from `svelte-multistyle-ui`:

- Actions: `Button`, `IconButton`, `FAB`, `ButtonGroup`, `DropdownMenu`, `Popover`
- Form: `Input`, `Textarea`, `Select`, `MultiSelect`, `Checkbox`, `Radio`, `Toggle`, `Slider`, `FileUpload`, `DatePicker`, `SortableList`
- Layout: `Card`, `Divider`, `Tabs`, `Accordion`, `Modal`, `Drawer`, `CommandPalette`, `Row`, `Column`, `Grid`
- Navigation: `Breadcrumb`, `Pagination`, `Stepper`
- Data display: `Avatar`, `Chip`, `Tooltip`, `ProgressBar`, `Table`, `Spinner`, `Skeleton`, `Rating`
- Feedback: `Alert`, `Toast`
- Charts: `BarChart`, `LineChart`, `PieChart`, `DoughnutChart`, `RadarChart`, `PolarAreaChart`, `ScatterChart`, `BubbleChart`, `StackedBarChart`, `StackedLineChart`, `ComboChart`

You can also import individual files from `svelte-multistyle-ui/components/<Component>.svelte`, and chart components from `svelte-multistyle-ui/charts/<Chart>.svelte`.

## Theming

### Preset themes

Import the full preset bundle:

```js
import "svelte-multistyle-ui/theme.css";
```

Themes are applied by adding a `theme-{name}` class to a container (usually `<html>` or a wrapping element). Light and dark variants are selected with `html.light` / `html.dark`.

### Custom themes

Import only the token defaults and define your own presets:

```css
@import "svelte-multistyle-ui/theme-base.css";

.theme-brand {
  --t-primary: #7c3aed;
  --t-secondary: #a78bfa;
  --t-surface: #ffffff;
  --t-card-bg: #ffffff;
  --t-card-border-color: #ddd6fe;
  --t-text: #2e1065;
  --t-text-muted: #7c3aed;
}

html.dark .theme-brand {
  --t-surface-bg: #1e0a4e;
  --t-card-bg: #3b0764;
  --t-text: #ddd6fe;
}
```

Key tokens include `--t-primary`, `--t-secondary`, `--t-surface`, `--t-card-bg`, `--t-card-border-color`, `--t-text`, `--t-text-muted`, `--t-btn-bg`, `--t-btn-radius`, `--t-card-radius`, `--t-border-width`, and `--t-shadow-*`.

## Demo & development

This repository contains a Vite demo app in `src/App.svelte` that renders every component across every style and theme.

```bash
pnpm install
pnpm dev          # start the demo
pnpm build        # build the demo (static HTML/CSS/JS) to docs/
pnpm build:lib    # build the library for publishing (to dist/)
pnpm gen:sample   # dry-run the CLI generator sample fixture
pnpm preview      # preview the production demo
pnpm test         # run Playwright visual tests
pnpm test:ui      # open the Playwright UI runner
```

The demo supports URL parameters for quick visual regression checks:

```
/?style=brutalist&theme=midnight&mode=dark
```

## CLI page generator

`svelte-multistyle-ui` ships a YAML → Svelte 5 page generator. It auto-detects three YAML input styles and emits token-efficient markup with auto-bound state and fake data injection.

```bash
npx svelte-multistyle-ui generate --input page.yaml --output ./src/routes/demo/+page.svelte
```

**Supported YAML styles:**

1. **Compact tree DSL** (recommended):
   ```yaml
   Card:
     - Row:
         - Input:
             label: Username
             placeholder: Enter name
         - Button:
             label: Submit
   ```
2. **Root-level card list**:
   ```yaml
   - Card:
       - Row:
           - Input:
               label: Username
   - Card:
       - Row:
           - Button:
               label: Submit
   ```
3. **Inline shorthand**:
   ```yaml
   Card
     Row
       Input: { label: Username }
       Button: { label: Submit }
   ```
4. **Verbose schema**:
   ```yaml
   state:
     - { name: username, type: string, default: "" }
   body:
     - component: Input
       props:
         label: Username
       bind: username
   ```

**Features:**

- **Auto-binding** — `Input`, `Select`, `Checkbox`, `Toggle`, `Radio`, `Slider`, `DatePicker`, `ButtonGroup`, `Rating`, `Tabs`, `Pagination`, `Popover`, `Modal`, `Drawer`, and `CommandPalette` get automatic `$state` vars and the correct `bind:*` directive.
- **Fake data** — missing `options` for `Select`/`MultiSelect`, missing `data` for `Table`, and missing chart data are synthesized automatically.
- **Option conversion** — `options: [Apple, Banana]` becomes `[{value:"apple",label:"Apple"}, ...]`.
- **Lightweight output** — generated files import from `svelte-multistyle-ui`, declare `$state`, include an empty `onMount` stub, and emit markup only; dark/light mode is handled by `initMultistyleUI` in the app layout.

See `skill/references/generator-cli.md` for the full CLI reference.

## Architecture notes

- Each component uses a base class (`s-<component>`), a style override class (`s-<component>-<style>`), and a theme class (`theme-<theme>`).
- Per-component styles live in `<component>-styles.css` and rely on theme tokens; no theme colors are hardcoded in component styles unless a design language requires it.
- Dark/light mode is toggled with `dark` / `light` classes on `<html>`.
- The library is built with `svelte-package` and emits to `dist/`.

## Charts

Chart components are thin styled wrappers around [Chart.js](https://www.chartjs.org/) and accept the same `data` / `options` shape, plus the usual `style` and `theme` props. They require `chart.js` as a peer dependency.

```svelte
<script>
  import { BarChart } from 'svelte-multistyle-ui';
  import 'svelte-multistyle-ui/theme.css';

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [{ label: 'Revenue', data: [12, 19, 7, 15] }]
  };
</script>

<BarChart {data} style="material" theme="ocean" />
```

A shared `Chart` base component is also exported from `svelte-multistyle-ui/charts/Chart.svelte` for building custom chart types.

## License

MIT
