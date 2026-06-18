# `portal` action

Source: `src/lib/actions/portal.js`.

```js
import { portal } from 'svelte-multistyle-ui';
```

```svelte
<div use:portal class="s-overlay">…</div>
```

Svelte 5 action. Reparents `node` to `document.body` on mount. On destroy, removes it from body (reattaches to original parent as fallback).

## Why

Overlays (`Modal`, `Drawer`, `CommandPalette`) need to escape ancestors that create a new **containing block** — `transform`, `filter`, `backdrop-filter`, `perspective`, `will-change`. A `position: fixed` child inside such an ancestor is positioned relative to the ancestor, not the viewport, which breaks full-screen overlays. `portal` moves the node to `<body>` so `fixed` works as expected.

## Usage in your own overlays

```svelte
<script>
  import { portal } from 'svelte-multistyle-ui';
  let open = $state(false);
</script>

{#if open}
  <div use:portal class="my-overlay">…</div>
{/if}
```

The library's own overlay components already apply `portal` internally — you don't need to add it when using `Modal`, `Drawer`, or `CommandPalette`.