# Row

Source: `src/lib/components/Row.svelte` · styles: `row-styles.css`

Horizontal flex layout. Pure layout — **no** `style`/`theme` props.

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `gap` | string | `"8px"` | flex gap |
| `align` | string | `"stretch"` | `align-items` |
| `justify` | string | `"start"` | `justify-content` |
| `fill` | boolean | `false` | grow to fill container |
| `wrap` | boolean | `false` | wrap children |
| `class` | string | `""` | extra class |

`...rest` spreads onto the root.

## Snippet

`children` — row content.

## Example

```svelte
<Row gap="16px" justify="between" wrap>
  <Button>A</Button>
  <Button>B</Button>
</Row>
```