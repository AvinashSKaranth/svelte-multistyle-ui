# Table

Source: `src/lib/components/Table.svelte` · styles: `table-styles.css`

Data table. Columns are auto-derived from the keys of the first data row.

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `data` | array \| null | `null` | array of row objects |
| `variant` | string | `"plain"` | `plain` / `striped` / `hoverable` / `bordered` / `compact` |
| `caption` | string | — | also accepts `summary` prop (alias) |

Plus `style`, `theme` (optional). `...rest` spreads onto the root.

## Example

```svelte
<Table
  data={[
    { name: 'Ada', role: 'Admin' },
    { name: 'Lin', role: 'Editor' },
  ]}
  variant="striped"
  style="carbon" theme="royal" />
```