# Card

Source: `src/lib/components/Card.svelte` · styles: `card-styles.css`

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `padding` | string | `"md"` | inner padding size |
| `elevated` | boolean | `false` | adds elevation shadow |
| `class` | string | `""` | extra class |

Plus `style`, `theme` (optional). `...rest` spreads onto the card root.

## Snippet

`children` — card body.

## Example

```svelte
<Card elevated padding="lg" style="liquid-glass" theme="ocean">
  <h3>Title</h3>
  <p>Body content</p>
</Card>
```

Note: Card has explicit style overrides for `brutalist`, `pixel`, `neon`, `metro`, `bootstrap`, `cartoon`, `illustration`, `carbon`, `liquid-glass`. `material`, `material3`, `fluent` fall back to the base look.