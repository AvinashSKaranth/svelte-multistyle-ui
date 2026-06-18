# Tooltip

Source: `src/lib/components/Tooltip.svelte` · styles: `tooltip-styles.css`

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `text` | string | `""` | tooltip content |
| `position` | string | `"top"` | `top` / `bottom` / `left` / `right` |

Plus `style`, `theme` (optional). `...rest` spreads onto the root.

## Snippet

`children` — the trigger element.

## Example

```svelte
<Tooltip text="Save your work" position="bottom" style="neon" theme="candy">
  <IconButton icon="save" ariaLabel="Save" />
</Tooltip>
```