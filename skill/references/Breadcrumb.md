# Breadcrumb

Source: `src/lib/components/Breadcrumb.svelte` · styles: `breadcrumb-styles.css`

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `items` | array | `[]` | `[{label, href?}]` |

Plus `style`, `theme` (optional). `...rest` spreads onto the root.

## Example

```svelte
<Breadcrumb
  items={[{ label: 'Home', href: '/' }, { label: 'Settings' }]}
  style="metro" theme="slate" />
```