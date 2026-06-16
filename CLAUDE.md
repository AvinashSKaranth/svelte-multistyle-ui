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
- `pnpm build:lib` — build the library for publishing (uses `svelte-package -i src/lib` and emits to `dist/`).
- `pnpm preview` — preview the production demo build.
- `pnpm test` — run Playwright visual tests across Chromium and WebKit in light and dark mode.
- `pnpm test:ui` — open the Playwright UI runner.
- `pnpm test:install` — install Playwright browsers (chromium + webkit).
- `pnpm prepublishOnly` — runs `build:lib` before publish.

There is currently no linter or formatter configured.

## Library architecture

### Component / style / theme split

Every component in `src/lib/components/` accepts at least two props:

- `style` — the visual design language (default `"material"`). Implemented styles include `material`, `material3`, `fluent`, `brutalist`, `pixel`, `neon`, `metro`, `bootstrap`, `cartoon`, `illustration`, `carbon`, `liquid-glass`, `legacy-ios`.
- `theme` — the color palette (default `"default"`). Implemented themes include `default`, `ocean`, `forest`, `rose`, `midnight`, `gold`, `slate`, `candy`, `storm`, `royal`.

Components render a base class, a style-specific class, and a theme class, e.g.:

```svelte
<button class="s-button {styleClass} {themeClass} ...">
```

where `styleClass` is `s-button-${style}` and `themeClass` is `theme-${theme}`.

### Theme tokens

The theme system is split into two files so users can create custom themes without forking presets:

- `src/lib/components/theme-base.css` defines default values for every `--t-*` token on `:root` (colors, border width, shadows, radii).
- `src/lib/components/theme.css` imports the base, then defines each `.theme-*` preset and the corresponding `html.dark .theme-*` dark-mode overrides.

Key tokens include `--t-primary`, `--t-secondary`, `--t-surface`, `--t-card-bg`, `--t-card-border-color`, `--t-text`, `--t-text-hint`, `--t-btn-bg`, `--t-btn-radius`, `--t-card-radius`, `--t-border-width`, `--t-shadow-*`, plus backward-compatibility aliases like `--t-border` and `--t-text-muted`.

Consuming apps can either import the full presets (`import 'svelte-multistyle-ui/theme.css'`) or import only the base (`import 'svelte-multistyle-ui/theme-base.css'`) and define their own `.theme-*` class with overrides.

Dark/light mode is applied by toggling `dark` / `light` classes on `<html>`; the demo in `src/App.svelte` does this with `window.matchMedia('(prefers-color-scheme: dark)')`.

### Per-component styles

Each component imports a dedicated stylesheet named `<Component>-styles.css` (e.g. `Button.svelte` imports `button-styles.css`). These files have two layers:

1. **Base styles** using theme tokens (e.g. `background: var(--t-primary)`).
2. **Style overrides** for each supported `style` value (e.g. `.s-button-brutalist`, `.s-button-liquid-glass`).

Style overrides control the shape/interaction language of a design system and are allowed to intentionally ignore theme tokens when the design language requires it (e.g., Material 3 pill buttons, Brutalist square corners, Liquid Glass blur). Theme tokens control colors, border width, shadow elevation, and radii everywhere else.

### Library exports

`src/lib/index.js` re-exports every component. Package `exports` are:

- `.` → `dist/index.js` / `dist/index.d.ts`
- `./theme.css` → `dist/components/theme.css`
- `./theme-base.css` → `dist/components/theme-base.css`
- `./components/*` → `dist/components/*`

## Conventions when adding or changing components

- Match the existing two-prop API (`style`, `theme`) and default values (`style="material"`, `theme="default"`).
- Use the same class-naming scheme: `s-<component>` base, `s-<component>-${style}` override, `theme-${theme}` theme.
- Keep component-specific styles in `<component>-styles.css` and rely on `theme.css` tokens; do not hardcode theme colors in component styles.
- Use Svelte 5 snippets for content slots (`{#snippet children()}...{/snippet}` and `{@render children?.()}`).
- The demo app (`src/App.svelte`) imports components from `./lib/components/...` for live testing; update it if you add a new public component.
- Re-export new components from `src/lib/index.js`.

## Visual tests

Playwright tests live in `tests/visual-demo.spec.js`. They load the demo with `?style=<style>&mode=<light|dark>`, verify every section renders, and capture full-page screenshots to `test-results/screenshots/` for manual review. Run `pnpm test` to execute them; `pnpm test --project chromium-light` runs a single project.

## Notes

- `src/App.svelte` duplicates some theme default values for its theme editor, but `src/lib/components/theme.css` is the authoritative token definition for the library.
- `README.md` is the generic Vite + Svelte template readme and does not describe this library.
- No Cursor rules (`.cursor/rules/`, `.cursorrules`) or GitHub Copilot instructions (`.github/copilot-instructions.md`) were found in this repository.
