# Checkbox

Source: `src/lib/components/Checkbox.svelte` · styles: `checkbox-styles.css`

## Props

| Prop | Type | Default | Bindable | Notes |
|---|---|---|---|---|
| `checked` | boolean | `false` | **yes** | `bind:checked` |
| `label` | string | `""` | — | |
| `disabled` | boolean | `false` | — | |
| `indeterminate` | boolean | `false` | — | third state |

Plus `style`, `theme` (optional). `...rest` spreads onto the root.

## Example

```svelte
<script>
  import { Checkbox } from 'svelte-multistyle-ui';
  let agree = $state(false);
</script>

<Checkbox bind:checked={agree} label="I accept the terms"
          style="brutalist" theme="slate" />
```