# Theme system

The theme system is split into two files so users can create custom themes without forking the built-in presets.

- `src/lib/components/theme-base.css` — default values for every `--t-*` token on `:root`.
- `src/lib/components/theme.css` — imports the base, then defines each `.theme-*` preset and the corresponding `html.dark .theme-*` dark-mode overrides.

Consuming apps import **one** of:

```js
import 'svelte-multistyle-ui/theme.css';       // full preset set + dark overrides
import 'svelte-multistyle-ui/theme-base.css';  // only --t-* token defaults (for custom themes)
```

## How a theme is applied

A component renders classes like:

```svelte
<button class="s-button s-button-{style} theme-{theme} …">
```

The `theme-{theme}` class sets `--t-*` custom properties on that element (and descendants). Component styles read those tokens: `background: var(--t-primary)`. So a theme is just a named class that overrides tokens.

Dark/light mode is toggled by adding `dark` or `light` to `<html>`. `theme.css` defines `html.dark .theme-*` blocks; `html.light` relies on the base/preset values.

## All tokens (defaults from theme-base.css)

Override any of these in your `.theme-*` class. Unset tokens inherit the base default.

### Primary palette
- `--t-primary: #2563eb`
- `--t-secondary: #3b82f6`

### Surfaces
- `--t-surface: #ffffff`
- `--t-card-bg: #ffffff`
- `--t-card-surface: #f8fafc`
- `--t-card-border-color: #e2e8f0`
- `--t-surface-bg: #f1f5f9`

### Text
- `--t-text: #0f172a`
- `--t-text-hint: #94a3b8`
- `--t-text-primary: #2563eb`
- `--t-text-secondary: #3b82f6`

### Status
- `--t-info: #3b82f6`, `--t-success: #22c55e`, `--t-warning: #eab308`, `--t-error: #ef4444`
- `--t-text-info: #2563eb`, `--t-text-success: #16a34a`, `--t-text-warning: #a16207`, `--t-text-error: #dc2626`

### Buttons
- `--t-btn-bg: #2563eb`
- `--t-btn-border-color: transparent`
- `--t-btn-radius: 8px`

### Cards
- `--t-card-radius: 12px`

### Borders
- `--t-border-width: 1.5px`
- `--t-border-w: var(--t-border-width)` (alias)

### Shadows (elevation)
- `--t-shadow-xs: 0 1px 2px rgba(0,0,0,0.04)`
- `--t-shadow-sm: 0 1px 3px rgba(0,0,0,0.06)`
- `--t-shadow-md: 0 4px 12px rgba(0,0,0,0.08)`
- `--t-shadow-lg: 0 8px 24px rgba(0,0,0,0.12)`
- `--t-shadow-xl: 0 20px 60px rgba(0,0,0,0.15)`

### Theme-colored shadows
- `--t-shadow: color-mix(in srgb, var(--t-primary) 18%, transparent)`
- `--t-shadow-colored-sm` / `-md` / `-lg` (consume `var(--t-shadow)`)

### Backward-compat aliases
- `--t-border: var(--t-card-border-color)`
- `--t-radius: var(--t-btn-radius)`
- `--t-text-muted: var(--t-text-hint)`
- `--t-surface-dim: var(--t-surface-bg)`

## Built-in presets

`default`, `ocean`, `forest`, `rose`, `midnight`, `gold`, `slate`, `candy`, `storm`, `royal`.

Dark-native (ship dark surfaces in both modes, have their own `html.dark` overrides): `midnight`, `storm`, `royal`. All others flip to a dark palette under `html.dark`.

## Creating a custom theme

### 1. Minimal — override a few tokens

```css
/* after importing theme-base.css */
.theme-brand {
  --t-primary: #ff5722;
  --t-secondary: #ff9800;
  --t-card-radius: 16px;
  --t-btn-radius: 10px;
}
html.dark .theme-brand {
  --t-surface: #1a1a1a;
  --t-card-bg: #242424;
  --t-text: #f5f5f5;
  --t-text-hint: #9aa0a6;
}
```

```svelte
<Button theme="brand">Save</Button>
<Card theme="brand">…</Card>
```

Only the tokens you set change — everything else inherits. This is the recommended approach for most apps.

### 2. Full — define surface + text + status + radii

If you want a complete palette, set the primary, surface, card, text, status, and radius tokens. You do not need to redefine shadows unless you want different elevation.

### Rules
- Override `--t-*` tokens only. **Never hardcode colors** inside component `<component>-styles.css` — that breaks cross-component consistency.
- Always provide an `html.dark .theme-*` block if you support dark mode, even for dark-native themes (override surface/text/status there).
- Style overrides (the `.s-<component>-<style>` classes) are allowed to ignore theme tokens when the design language requires it (e.g. Material 3 pill shape, Brutalist square corners, Liquid Glass blur). That's intentional — tokens control color/border/shadow/radius; style controls shape/interaction.
- To ship a new preset *into the library itself*, add it to `src/lib/components/theme.css` (both `.theme-*` and `html.dark .theme-*`). For an app, keep it in your own CSS.