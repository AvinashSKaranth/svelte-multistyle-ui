# Rating

Source: `src/lib/components/Rating.svelte` · styles: `rating-styles.css`

Star rating control.

## Props

| Prop | Type | Default | Bindable | Notes |
|---|---|---|---|---|
| `value` | number | `0` | **yes** | `bind:value` |
| `max` | number | `5` | — | number of stars |
| `precision` | string | `"full"` | — | `full` / `half` / `quarter` |
| `size` | string | `"md"` | — | `sm` / `md` / `lg` |
| `readonly` | boolean | `false` | — | display-only |
| `showValue` | boolean | `false` | — | show numeric value |

Plus `style`, `theme` (optional). `...rest` spreads onto the root.

## Example

```svelte
<script>
  import { Rating } from 'svelte-multistyle-ui';
  let stars = $state(3.5);
</script>

<Rating bind:value={stars} max={5} precision="half" showValue
        style="illustration" theme="rose" />
```