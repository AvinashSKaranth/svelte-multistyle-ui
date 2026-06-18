# Column

Source: `src/lib/components/Column.svelte` · styles: `column-styles.css`

Vertical flex layout. Pure layout — **no** `style`/`theme` props.

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `gap` | string | `"8px"` | flex gap |
| `align` | string | `"stretch"` | `align-items` |
| `justify` | string | `"start"` | `justify-content` |
| `fill` | boolean | `false` | grow to fill container |
| `class` | string | `""` | extra class |

`...rest` spreads onto the root.

## Snippet

`children` — column content.

## Example

```svelte
<Column gap="12px" align="start">
  <Input label="Email" />
  <Input label="Password" type="password" />
  <Button>Sign in</Button>
</Column>
```