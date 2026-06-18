# ScatterChart

Source: `src/lib/components/charts/ScatterChart.svelte` · chart.js type: `scatter`

Shared props: see [charts-base](charts-base.md). Data points are `{x, y}`.

## Example

```svelte
<ScatterChart
  data={[{ x: 1, y: 2 }, { x: 3, y: 5 }]}
  title="Correlation" style="fluent" theme="forest" />
```