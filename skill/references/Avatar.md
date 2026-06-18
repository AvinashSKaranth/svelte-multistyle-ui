# Avatar

Source: `src/lib/components/Avatar.svelte` · styles: `avatar-styles.css`

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `src` | string | `""` | image URL |
| `alt` | string | `""` | alt text |
| `size` | string | `"md"` | `sm` / `md` / `lg` |
| `fallback` | string | `""` | shown when image fails / src empty |

Plus `style`, `theme` (optional). `...rest` spreads onto the root.

## Example

```svelte
<Avatar src="/me.png" alt="Jane Doe" fallback="JD" size="lg"
        style="illustration" theme="candy" />
```