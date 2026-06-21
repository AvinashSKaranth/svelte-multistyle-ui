# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

`svelte-multistyle-ui` is a Svelte 5 component library whose components can render in many visual *styles* (Material, Fluent, Brutalist, etc.) and *themes* (color palettes). The published package is built from `src/lib/`; the Vite app in `src/App.svelte` is a visual demo/gallery for local development.

## Tech stack

- **Svelte 5** with runes (`$props`, `$state`, `$derived`, `$effect`, `$bindable`) and snippets (`{@render children?.()}`).
- **Vite 8** + `@sveltejs/vite-plugin-svelte`.
- **Tailwind CSS v4** configured through CSS (`@import "tailwindcss"` in `src/app.css`), no `tailwind.config.js`.
- **Playwright** for visual regression tests of the demo gallery.
- **pnpm** is the intended package manager (`pnpm-lock.yaml` is present; `package-lock.json` also exists but `package.json` scripts use `pnpm`).

## Common commands

All scripts are in `package.json`. Use pnpm:

- `pnpm install` — install dependencies.
- `pnpm dev` — start the Vite dev server for the component gallery.
- `pnpm build` — build the demo app to `dist/`.
- `pnpm gen:theme` — regenerate `src/lib/components/theme.css` from `src/lib/themes/presets.js` + `generator.js` via `scripts/gen-theme.js`. Run whenever presets change; `build:lib` runs it automatically first.
- `pnpm build:lib` — build the library for publishing. Runs `gen:theme` then `svelte-package -i src/lib`, emits to `dist/`.
- `pnpm preview` — preview the production demo build.
- `pnpm test` — run Playwright visual tests across Chromium and WebKit in light and dark mode.
- `pnpm test:ui` — open the Playwright UI runner.
- `pnpm test:install` — install Playwright browsers (chromium + webkit, with deps).
- `pnpm publish` — auto-bumps the patch version, builds demo + lib, then publishes. (`prepublishOnly` also runs `build:lib`.)

There is currently no linter or formatter configured.

## Library architecture

### Component / style / theme split

Every component in `src/lib/components/` accepts at least two props:

- `style` — the visual design language (default `"material"`). Implemented styles include `material`, `material3`, `fluent`, `brutalist`, `pixel`, `neon`, `metro`, `bootstrap`, `cartoon`, `illustration`, `carbon`, `liquid-glass`.
- `theme` — the color palette (default `"default"`). Implemented themes include `default`, `ocean`, `forest`, `rose`, `midnight`, `gold`, `slate`, `candy`, `storm`, `royal`.

Components render a base class, a style-specific class, and a theme class, e.g.:

```svelte
<button class="s-button {styleClass} {themeClass} ...">
```

where `styleClass` is `s-button-${style}` and `themeClass` is `theme-${theme}`.

### Theme tokens

The theme system has three layers:

- `src/lib/components/theme-base.css` — hand-written. Defines default values for every `--t-*` token on `:root` (colors, border width, shadows, radii) plus backward-compatibility aliases like `--t-border` and `--t-text-muted`.
- `src/lib/themes/presets.js` — hand-written. Source of truth for each theme preset. Only a small set of fields is configurable per theme (see below); every other `--t-*` token is **derived** by the generator.
- `src/lib/components/theme.css` — **AUTO-GENERATED** by `scripts/gen-theme.js` from `presets.js` + `src/lib/themes/generator.js`. Regenerate with `pnpm gen:theme`. **Do not edit by hand** — the header says so.

Each preset in `presets.js` has the shape `{ common, light, dark }`:

- `common` (both modes): `primary`, `secondary`, `info`, `success`, `warning`, `error`, `textOnPrimary`, `buttonRadius`, `cardRadius`, `inputRadius`, `borderWidth`.
- `light`: `text`, `surface`, `cardSurface` (all required hex).
- `dark`: `text`, `surface`, `cardSurface`. `null` = HSL-invert from the light counterpart (default); an explicit hex overrides (used by dark-native themes so an already-dark light palette isn't flipped).

Derived (NOT configurable, set by `generator.js`): `--t-text-hint`/`--t-text-muted`/`--t-text-disabled` = 50% transparency of `--t-text`; `--t-card-bg` = surface; `--t-card-border-color` = `color-mix(text 14%, surface)`; `--t-surface-bg` = `color-mix(surface 85%, #000)`; `--t-btn-bg` = primary; `--t-text-*` brand/status colors mirror their status counterparts. The hint/muted/disabled derivations are re-emitted per mode (light and dark) on purpose — a `color-mix()` custom property bakes at the declaring element using that element's `--t-text`, so a single `:root` derivation would freeze the light value and never follow the theme/dark block. Output is byte-stable across runs (fixed `TOKEN_ORDER`).

Runtime theme API (`src/lib/themes/`, exported from the package root and `./themes`): `themes`, `generateThemeCss`, `resolveLight`, `resolveDark`, `applyThemeToElement`, plus color utils `hexToHsl`/`hslToCss`/`invert`/`invertHex`. `applyThemeToElement(el, config, isDark)` sets every resolved `--t-*` var directly on a DOM element and clears stale ones — used for live theme preview (e.g. the editor in `src/App.svelte`).

Consuming apps can: import the full presets (`import 'svelte-multistyle-ui/theme.css'`); import only the base (`import 'svelte-multistyle-ui/theme-base.css'`) and define their own `.theme-*` class; or use the JS API (`import { generateThemeCss, applyThemeToElement } from 'svelte-multistyle-ui/themes'`) to build/apply a custom theme at runtime.

Dark/light mode is applied by toggling `dark` / `light` classes on `<html>`; the demo in `src/App.svelte` does this with `window.matchMedia('(prefers-color-scheme: dark)')`.

### Per-component styles

Each component imports a dedicated stylesheet named `<Component>-styles.css` (e.g. `Button.svelte` imports `button-styles.css`). These files have two layers:

1. **Base styles** using theme tokens (e.g. `background: var(--t-primary)`).
2. **Style overrides** for each supported `style` value (e.g. `.s-button-brutalist`, `.s-button-liquid-glass`).

Style overrides control the shape/interaction language of a design system and are allowed to intentionally ignore theme tokens when the design language requires it (e.g., Material 3 pill buttons, Brutalist square corners, Liquid Glass blur). Theme tokens control colors, border width, shadow elevation, and radii everywhere else.

### Library exports

`src/lib/index.js` re-exports every component, the runtime theme API, the global config (`initMultistyleUI`), and actions (`portal`). Package `exports` are:

- `.` → `dist/index.js` / `dist/index.d.ts`
- `./theme.css` → `dist/components/theme.css` (generated)
- `./theme-base.css` → `dist/components/theme-base.css`
- `./themes` → `dist/themes/index.js` (runtime theme API)
- `./components/*` → `dist/components/*`
- `./charts/*` → `dist/components/charts/*`

### Global config

`src/lib/config.js` re-exports `initMultistyleUI` (from `config.svelte.js`). Call it once in the app (e.g. `App.svelte` or a `+layout.svelte`) to set default `style` and `theme` for every component; per-component `style`/`theme` props still override.

### Charts

`src/lib/components/charts/` wraps Chart.js (`chart.js` is a peer dependency). `Chart.svelte` is the base; variants (`BarChart`, `LineChart`, `PieChart`, `DoughnutChart`, `RadarChart`, `PolarAreaChart`, `BubbleChart`, `ScatterChart`, `ComboChart`, `StackedBarChart`, `StackedLineChart`) build on it. Shared config lives in `chart-config.js` and styles in `chart-styles.css`. Runtime deps: `dayjs`, `prismjs`, `@thisux/sveltednd`.

## Conventions when adding or changing components

- Match the existing two-prop API (`style`, `theme`) and default values (`style="material"`, `theme="default"`).
- Use the same class-naming scheme: `s-<component>` base, `s-<component>-${style}` override, `theme-${theme}` theme.
- Keep component-specific styles in `<component>-styles.css` and rely on `theme.css` tokens; do not hardcode theme colors in component styles.
- To add or change a theme preset, edit `src/lib/themes/presets.js` then run `pnpm gen:theme`. Never hand-edit `src/lib/components/theme.css` (it is generated).
- Use Svelte 5 snippets for content slots (`{#snippet children()}...{/snippet}` and `{@render children?.()}`).
- The demo app (`src/App.svelte`) imports components from `./lib/components/...` for live testing; update it if you add a new public component.
- Re-export new components from `src/lib/index.js`.

## Visual tests

Playwright tests live in `tests/visual-demo.spec.js`. They load the demo with `?style=<style>&mode=<light|dark>`, verify every section renders, and capture full-page screenshots to `test-results/screenshots/` for manual review. Run `pnpm test` to execute them; `pnpm test --project chromium-light` runs a single project.

## Notes

- `src/App.svelte` duplicates some theme default values for its theme editor; the authoritative source for presets is `src/lib/themes/presets.js`, and `src/lib/components/theme-base.css` is the authoritative `:root` token default. `theme.css` is generated from both.
- `README.md` is the generic Vite + Svelte template readme and does not describe this library.
- No Cursor rules (`.cursor/rules/`, `.cursorrules`) or GitHub Copilot instructions (`.github/copilot-instructions.md`) were found in this repository.
