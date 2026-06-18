# Select

Source: `src/lib/components/Select.svelte` · styles: `select-styles.css`

Single-select dropdown. Options are `{value, label}` objects.

## Props

| Prop | Type | Default | Bindable | Notes |
|---|---|---|---|---|
| `value` | string | `""` | **yes** | `bind:value` — selected `value` |
| `options` | array | `[]` | — | `[{value, label}]` |
| `placeholder` | string | `"Select..."` | — | |
| `label` | string | `""` | — | floating label on supported styles |
| `disabled` | boolean | `false` | — | |

Plus `style`, `theme` (optional). `...rest` spreads onto the root.

## Example

```svelte
<script>
  import { Select } from 'svelte-multistyle-ui';
  const opts = [
    { value: 'apple', label: 'Apple' },
    { value: 'pear', label: 'Pear' },
  ];
  let picked = $state('');
</script>

<Select bind:value={picked} options={opts} label="Fruit"
        style="material3" theme="rose" />
```