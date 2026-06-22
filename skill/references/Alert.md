# Alert

Source: `src/lib/components/Alert.svelte` · styles: `alert-styles.css`

Inline status message.

## Props

| Prop          | Type    | Default  | Notes                                    |
| ------------- | ------- | -------- | ---------------------------------------- |
| `variant`     | string  | `"info"` | `info` / `success` / `warning` / `error` |
| `title`       | string  | `""`     | heading                                  |
| `icon`        | string  | —        | 1-char glyph or icon name                |
| `dismissible` | boolean | `false`  | show dismiss button (hides locally)      |

Plus `style`, `theme` (optional). `...rest` spreads onto the root.

## Snippet

`children` — alert body.

## Example

```svelte
<Alert preset="warning" title="Heads up" dismissible
       style="brutalist" theme="gold">
  Save before you leave the page.
</Alert>
```
