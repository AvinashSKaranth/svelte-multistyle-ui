# Chip

Source: `src/lib/components/Chip.svelte` · styles: `chip-styles.css`

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `variant` | string | `"filled"` | `filled` / `outlined` / `text` / `tonal` |
| `color` | string | `"primary"` | color token name |
| `size` | string | `"md"` | `sm` / `md` / `lg` |
| `dismissible` | boolean | `false` | show dismiss button |
| `icon` | string | `""` | icon name (global `iconClass`) |
| `ondismiss` | fn | — | callback prop |

Plus `style`, `theme` (optional). `...rest` spreads onto the root.

## Snippet

`children` — chip label.

## Example

```svelte
<Chip color="success" dismissible ondismiss={() => filter.remove('new')}
      style="carbon" theme="forest">
  New
</Chip>
```