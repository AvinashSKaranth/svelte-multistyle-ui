# Config — `initMultistyleUI`

Source: `src/lib/config.js` (re-exports `src/lib/config.svelte.js`).

## `initMultistyleUI(options)`

```js
import { initMultistyleUI } from 'svelte-multistyle-ui';
initMultistyleUI({ style, theme, mode });
```

| Param | Type | Default | Purpose |
|---|---|---|---|
| `style` | string | `"material"` | global default visual style applied to every component |
| `theme` | string | `"default"` | global default color theme |
| `mode` | string | `"system"` | color mode: `"system"` (follow OS), `"light"`, or `"dark"` |

Call once near the root of the app (e.g. `+layout.svelte`, root `App.svelte`). It mutates a shared reactive `defaults = $state({ style, theme, mode, systemDark })` object. **Mutate properties, don't reassign** — components react to property changes.

Per-component `style` / `theme` props always override the global default.

## `defaults`

The reactive `$state` object backing the globals. Importable for advanced use:

```js
import { defaults } from 'svelte-multistyle-ui';
// defaults.style, defaults.theme, defaults.mode, defaults.systemDark
```

`systemDark` reads `matchMedia('(prefers-color-scheme: dark)')` live and updates when the OS preference changes, so `"system"` mode can resolve at runtime.

## `iconClass`

```js
import { iconClass } from 'svelte-multistyle-ui'; // "material-symbols-outlined"
```

The icon font class used by `Button`, `IconButton`, `Input` (`iconStart`/`iconEnd`), `Alert`, `Toast` to render named icons. Change it to match your icon library — e.g. set to `"material-icons"`, `"fas"`, etc. Components render `<i class="{iconClass}">{name}</i>` from the `icon` prop (where supported).

## Dark/light mode

`mode` only sets `defaults.mode`; the actual `dark`/`light` class on `<html>` is what flips colors. Two common patterns:

**Follow OS (mode: "system"):**
```svelte
<script>
  import { onMount } from 'svelte';
  onMount(() => {
    const mq = matchMedia('(prefers-color-scheme: dark)');
    const apply = () => document.documentElement.classList.toggle('dark', mq.matches);
    apply();
    mq.addEventListener('change', apply);
  });
</script>
```

**Manual toggle:**
```svelte
<script>
  let dark = $state(false);
  $effect(() => document.documentElement.classList.toggle('dark', dark));
</script>
<Toggle bind:checked={dark} label="Dark mode" />
```

See `theme-system.md` for how `html.dark .theme-*` overrides work.