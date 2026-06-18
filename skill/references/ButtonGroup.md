# ButtonGroup

Source: `src/lib/components/ButtonGroup.svelte` · styles: `buttongroup-styles.css`

Group of selectable buttons.

## Props

| Prop | Type | Default | Bindable | Notes |
|---|---|---|---|---|
| `variant` | string | `"outlined"` | — | shared button variant |
| `size` | string | `"md"` | — | `sm` / `md` / `lg` |
| `items` | array | `[]` | — | `[{label, value, icon?, disabled?, onclick?}]` |
| `value` | string | `""` | **yes** | `bind:value` — selected item value |
| `orientation` | string | `"horizontal"` | — | `horizontal` / `vertical` |

Plus `style`, `theme` (optional). `...rest` spreads onto the root.

## Example

```svelte
<script>
  import { ButtonGroup } from 'svelte-multistyle-ui';
  const items = [
    { label: 'Day', value: 'day' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
  ];
  let range = $state('day');
</script>

<ButtonGroup bind:value={range} {items} style="fluent" theme="forest" />
```