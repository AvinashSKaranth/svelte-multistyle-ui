# Button

Source: `src/lib/components/Button.svelte` · styles: `button-styles.css`

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `variant` | string | `"filled"` | `filled` / `outlined` / `text` / `tonal` |
| `size` | string | `"md"` | `sm` / `md` / `lg` |
| `disabled` | boolean | `false` | |
| `icon` | string | — | icon name rendered via global `iconClass` |
| `onclick` | fn | — | callback prop (not an event dispatcher) |

Plus `style`, `theme` (optional). `...rest` spreads onto the `<button>`.

## Snippet

`children` — button label/content.

## Example

```svelte
<Button variant="outlined" size="lg" icon="save" onclick={() => save()}
        style="brutalist" theme="forest">
  Save
</Button>
```

Variants (`.btn-filled/outlined/text/tonal`) and sizes (`.btn-sm/md/lg`) combine with the style class (`.s-button-<style>`).