# Toggle

Source: `src/lib/components/Toggle.svelte` · styles: `toggle-styles.css`

Switch control.

## Props

| Prop | Type | Default | Bindable | Notes |
|---|---|---|---|---|
| `checked` | boolean | `false` | **yes** | `bind:checked` |
| `label` | string | `""` | — | |
| `disabled` | boolean | `false` | — | |
| `size` | string | `"md"` | — | `sm` / `md` / `lg` |

Plus `style`, `theme` (optional). `...rest` spreads onto the root.

## Example

```svelte
<script>
  import { Toggle } from 'svelte-multistyle-ui';
  let dark = $state(false);
</script>

<Toggle bind:checked={dark} label="Dark mode" style="liquid-glass" theme="midnight" />
```