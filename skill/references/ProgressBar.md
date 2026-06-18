# ProgressBar

Source: `src/lib/components/ProgressBar.svelte` · styles: `progressbar-styles.css`

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `value` | number | `0` | 0–100; **negative = indeterminate** |
| `size` | string | `"md"` | `sm` / `md` / `lg` |
| `animated` | boolean | `false` | animate the fill |
| `label` | boolean | `false` | show value popover on hover/focus/click |

Plus `style`, `theme` (optional). `...rest` spreads onto the root.

## Example

```svelte
<ProgressBar value={65} animated label style="brutalist" theme="slate" />
<ProgressBar value={-1} size="sm" style="liquid-glass" theme="midnight" />
```