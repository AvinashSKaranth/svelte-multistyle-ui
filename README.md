# svelte-multistyle-ui

A multi-style, multi-theme **Svelte 5** component library. Every component can render in more than a dozen visual design languages (styles) and switch between several color palettes (themes) via two simple props.

## Features

- **Svelte 5 native** — uses runes (`$props`, `$state`, `$derived`, `$effect`) and snippets (`{@render children?.()}`).
- **13 visual styles** — material, material3, fluent, brutalist, pixel, neon, metro, bootstrap, cartoon, illustration, carbon, liquid-glass, legacy-ios.
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
import { initMultistyleUI } from 'svelte-multistyle-ui';

initMultistyleUI({
  style: 'material',   // visual design system
  theme: 'ocean',      // color theme preset
  mode: 'system',      // "system" | "light" | "dark"
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
- Form: `Input`, `Textarea`, `Select`, `MultiSelect`, `Checkbox`, `Radio`, `Toggle`, `Slider`, `FileUpload`, `DatePicker`
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
import 'svelte-multistyle-ui/theme.css';
```

Themes are applied by adding a `theme-{name}` class to a container (usually `<html>` or a wrapping element). Light and dark variants are selected with `html.light` / `html.dark`.

### Custom themes

Import only the token defaults and define your own presets:

```css
@import 'svelte-multistyle-ui/theme-base.css';

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
pnpm build        # build the demo to dist/
pnpm build:lib    # build the library for publishing
pnpm preview      # preview the production demo
pnpm test         # run Playwright visual tests
pnpm test:ui      # open the Playwright UI runner
```

The demo supports URL parameters for quick visual regression checks:

```
/?style=brutalist&theme=midnight&mode=dark
```

## Architecture notes

- Each component uses a base class (`s-<component>`), a style override class (`s-<component>-<style>`), and a theme class (`theme-<theme>`).
- Per-component styles live in `<component>-styles.css` and rely on theme tokens; no theme colors are hardcoded in component styles unless a design language requires it.
- Dark/light mode is toggled with `dark` / `light` classes on `<html>`.
- The library is built with `svelte-package` and emits to `dist/`.

## Recent fixes

- Demo gallery now wraps every component example in the library's own `Card` component instead of custom wrapper divs.
- Tab buttons now use the correct style class so active/hover states render properly.
- System dark mode now switches the page background and header consistently, not just components.
- Checkbox, Radio, and Toggle now hide the native input and only show the themed custom control.

## License

MIT
