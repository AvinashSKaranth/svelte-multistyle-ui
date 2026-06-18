# IconButton

Source: `src/lib/components/IconButton.svelte` · styles: `iconbutton-styles.css`

Square icon-only button. Provide `ariaLabel` for accessibility.

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `variant` | string | `"filled"` | `filled` / `outlined` / `text` / `tonal` |
| `size` | string | `"md"` | `sm` / `md` / `lg` |
| `disabled` | boolean | `false` | |
| `icon` | string | — | icon name (global `iconClass`) |
| `ariaLabel` | string | `""` | **set for accessibility** |
| `onclick` | fn | — | callback prop |

Plus `style`, `theme` (optional). `...rest` spreads onto the `<button>`.

## Snippet

`children` — used as the button content when `icon` is not provided.

## Example

```svelte
<IconButton icon="delete" ariaLabel="Delete row" variant="text"
            onclick={() => remove(id)} style="carbon" theme="slate" />
```