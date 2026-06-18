# ComboChart

Source: `src/lib/components/charts/ComboChart.svelte` · chart.js type: `combo`

Mixed bar + line chart. Data is row-oriented: `[{label, <key1>, <key2>, …}]`. Each series in `series:[{name, chartType}]` maps a key to a series; `chartType` defaults to `bar` (use `"line"` for line series).

Shared props: see [charts-base](charts-base.md).

## Example

```svelte
<ComboChart
  data={[
    { label: 'Jan', revenue: 1200, target: 1000 },
    { label: 'Feb', revenue: 1500, target: 1100 },
  ]}
  series={[
    { name: 'revenue', chartType: 'bar' },
    { name: 'target', chartType: 'line' },
  ]}
  title="Revenue vs target" style="carbon" theme="gold" />
```