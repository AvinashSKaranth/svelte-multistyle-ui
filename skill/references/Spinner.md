# Spinner

Source: `src/lib/components/Spinner.svelte` · styles: `spinner-styles.css`

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `size` | string | `"md"` | `sm` / `md` / `lg` |

Plus `style`, `theme` (optional). `...rest` spreads onto the root.

## Example

```svelte
<Spinner size="lg" style="liquid-glass" theme="ocean" />
```