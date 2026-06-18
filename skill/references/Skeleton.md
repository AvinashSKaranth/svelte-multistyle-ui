# Skeleton

Source: `src/lib/components/Skeleton.svelte` · styles: `skeleton-styles.css`

Loading placeholder block.

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `variant` | string | `"text"` | shape variant |
| `width` | string | `"100%"` | |
| `height` | string | `""` | |

Plus `style`, `theme` (optional). `...rest` spreads onto the root.

## Example

```svelte
<Skeleton variant="text" width="60%" style="metro" theme="slate" />
<Skeleton variant="circle" width="48px" height="48px" style="carbon" theme="storm" />
```