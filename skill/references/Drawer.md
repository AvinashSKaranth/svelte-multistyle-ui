# Drawer

Source: `src/lib/components/Drawer.svelte` · styles: `drawer-styles.css`

Slide-in panel overlay. Uses the `portal` action internally.

## Props

| Prop | Type | Default | Bindable | Notes |
|---|---|---|---|---|
| `position` | string | `"left"` | — | `left` / `right` / `top` / `bottom` |
| `open` | boolean | `false` | **yes** | `bind:open` |
| `onclose` | fn | — | — | callback when closed |

Plus `style`, `theme` (optional). `...rest` spreads onto the root.

## Snippet

`children` — drawer body.

## Example

```svelte
<script>
  import { Drawer, Button } from 'svelte-multistyle-ui';
  let open = $state(false);
</script>

<Button onclick={() => open = true}>Menu</Button>
<Drawer bind:open position="right" onclose={() => {}} style="fluent" theme="storm">
  Nav items…
</Drawer>
```