# Grid

Source: `src/lib/components/Grid.svelte` · styles: `grid-styles.css`

CSS grid layout. Pure layout — **no** `style`/`theme` props.

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `columns` | number \| string | `1` | column count, or `"auto"` / `"auto-fill"` |
| `gap` | string | `"8px"` | grid gap |
| `rows` | string | — | explicit row template |
| `fill` | boolean | `false` | children stretch to fill cells |
| `align` | string | `"stretch"` | `align-items` |
| `justify` | string | `"start"` | `justify-items` |
| `minColumnWidth` | string | — | with `columns="auto"`/`"auto-fill"`, responsive min width |
| `class` | string | `""` | extra class |

`...rest` spreads onto the root.

## Snippet

`children` — grid content.

## Example

```svelte
<Grid columns="auto-fill" minColumnWidth="220px" gap="16px">
  {#each cards as c}
    <Card>{c.title}</Card>
  {/each}
</Grid>
```