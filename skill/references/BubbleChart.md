# BubbleChart

Source: `src/lib/components/charts/BubbleChart.svelte` · chart.js type: `bubble`

Shared props: see [charts-base](charts-base.md). Data points are `{x, y, r}` (`Chart.svelte` normalizes `r`).

## Example

```svelte
<BubbleChart
  data={[{ x: 10, y: 20, r: 15 }, { x: 30, y: 40, r: 8 }]}
  title="Map" style="liquid-glass" theme="midnight" />
```