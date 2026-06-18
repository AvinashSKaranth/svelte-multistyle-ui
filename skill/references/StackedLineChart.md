# StackedLineChart

Source: `src/lib/components/charts/StackedLineChart.svelte` · chart.js type: `line` (stacked + fill)

Shared props: see [charts-base](charts-base.md). Merges your `options` over stacked-scale defaults and enables `line.fill`.

## Example

```svelte
<StackedLineChart
  data={[
    { label: 'Mon', a: 5, b: 3 },
    { label: 'Tue', a: 9, b: 4 },
  ]}
  series={[{ name: 'a' }, { name: 'b' }]}
  title="Trend" style="neon" theme="storm" />
```