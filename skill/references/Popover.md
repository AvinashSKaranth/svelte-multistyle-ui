# Popover

Source: `src/lib/components/Popover.svelte` · styles: `popover-styles.css`

Floating content panel anchored to a trigger.

## Props

| Prop | Type | Default | Bindable | Notes |
|---|---|---|---|---|
| `content` | string \| snippet | — | — | popover content; if a snippet, render via `content` snippet |
| `position` | string | `"top"` | — | `top` / `bottom` / `left` / `right` |
| `open` | boolean | `false` | **yes** | `bind:open` |
| `trigger` | string | `"click"` | — | `click` / `hover` |

Plus `style`, `theme` (optional). `...rest` spreads onto the root.

## Snippets

- `children` — the trigger element
- `content` — rendered when `content` prop is a snippet (not a string)

## Example

```svelte
<Popover position="right" trigger="hover" style="liquid-glass" theme="ocean">
  <IconButton icon="info" ariaLabel="Info" />
  {#snippet content()}
    <div style="padding:8px">Details about this action.</div>
  {/snippet}
</Popover>
```