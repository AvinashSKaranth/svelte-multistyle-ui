# Slider

Source: `src/lib/components/Slider.svelte` · styles: `slider-styles.css`

Range slider.

## Props

| Prop | Type | Default | Bindable | Notes |
|---|---|---|---|---|
| `value` | number | `0` | **yes** | `bind:value` |
| `min` | number | `0` | — | |
| `max` | number | `100` | — | |
| `step` | number | `1` | — | |
| `disabled` | boolean | `false` | — | |
| `label` | string | `""` | — | |

Plus `style`, `theme` (optional). `...rest` spreads onto the root.

## Example

```svelte
<script>
  import { Slider } from 'svelte-multistyle-ui';
  let vol = $state(50);
</script>

<Slider bind:value={vol} min={0} max={100} step={5} label="Volume"
        style="neon" theme="candy" />
```