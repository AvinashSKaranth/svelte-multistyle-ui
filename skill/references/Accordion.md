# Accordion

Source: `src/lib/components/Accordion.svelte` · styles: `accordion-styles.css`

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `items` | array | `[]` | `[{id, title, content}]` |
| `multiple` | boolean | `false` | allow more than one open at once |
| `current` | string | `""` | open item id |

Plus `style`, `theme` (optional). `...rest` spreads onto the root.

## Example

```svelte
<Accordion
  items={[
    { id: '1', title: 'What is this?', content: 'A library.' },
    { id: '2', title: 'License?', content: 'MIT.' },
  ]}
  style="bootstrap" theme="forest" />
```