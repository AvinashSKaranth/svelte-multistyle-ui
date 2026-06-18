# BarChart

Source: `src/lib/components/charts/BarChart.svelte` · chart.js type: `bar`

Shared props: see [charts-base](charts-base.md).

## Example

```svelte
<BarChart
  data={[{ label: 'Jan', value: 12 }, { label: 'Feb', value: 19 }]}
  title="Sales" height={300} style="carbon" theme="ocean" />
```

Multi-series (row-oriented) with `series`:

```svelte
<BarChart
  data={[
    { label: 'Jan', sales: 12, returns: 2 },
    { label: 'Feb', sales: 19, returns: 3 },
  ]}
  series={[{ name: 'sales' }, { name: 'returns' }]}
  title="Sales vs returns" style="brutalist" theme="slate" />
```