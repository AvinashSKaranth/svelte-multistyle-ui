# Toast

Source: `src/lib/components/Toast.svelte` · styles: `toast-styles.css`

Stack of transient toast notifications.

## Props

| Prop | Type | Default | Bindable | Notes |
|---|---|---|---|---|
| `toasts` | array | `[]` | **yes** | `bind:toasts` — see item shape |
| `position` | string | `"top-right"` | — | 6 positions (`top/bottom-left/right/center`) |
| `duration` | number | `4000` | — | ms before auto-dismiss |

**Toast item shape:** `{ id, variant, title?, message, icon?, duration }` (variant like Alert: `info`/`success`/`warning`/`error`)

Plus `style`, `theme` (optional). `...rest` spreads onto the root.

## Example

```svelte
<script>
  import { Toast } from 'svelte-multistyle-ui';
  let toasts = $state([]);
  function notify() {
    toasts = [...toasts, { id: crypto.randomUUID(), variant: 'success', title: 'Saved', message: 'Done.' }];
  }
</script>

<button onclick={notify}>Save</button>
<Toast bind:toasts position="bottom-right" style="carbon" theme="forest" />
```