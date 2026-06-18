# StackedBarChart

Source: `src/lib/components/charts/StackedBarChart.svelte` · chart.js type: `bar` (stacked)

Shared props: see [charts-base](charts-base.md). Merges your `options` over `{scales:{x:{stacked:true}, y:{stacked:true}}}`.

## Example

```svelte
<StackedBarChart
  data={[
    { label: 'Jan', a: 12, b: 8 },
    { label: 'Feb', a: 19, b: 6 },
  ]}
  series={[{ name: 'a' }, { name: 'b' }]}
  title="Stacked" style="brutalist" theme="slate" />
```