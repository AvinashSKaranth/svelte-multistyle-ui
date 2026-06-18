# Divider

Source: `src/lib/components/Divider.svelte` · styles: `divider-styles.css`

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `orientation` | string | `"horizontal"` | `horizontal` / `vertical` |
| `label` | string | `""` | centered label on the line |

Plus `style`, `theme` (optional). `...rest` spreads onto the root.

## Example

```svelte
<Divider label="or" style="metro" theme="slate" />
<Divider orientation="vertical" style="carbon" theme="royal" />
```