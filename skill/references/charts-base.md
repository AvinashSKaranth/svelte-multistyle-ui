# Charts — shared props

All chart components are thin wrappers around chart.js (peer dep `chart.js ^4.5`). They live in `src/lib/components/charts/` and are exported from the package root.

## Common props (all chart components)

| Prop | Type | Default | Notes |
|---|---|---|---|
| `data` | array | — | chart data; shape depends on chart type (see below) |
| `series` | array | — | multi-series definition: `[{name, chartType?}]` (ComboChart) or series names |
| `labels` | array | — | x-axis/category labels |
| `title` | string | — | chart title |
| `height` | number \| string | `320` | canvas height |
| `legend` | string | `"auto"` | chart.js legend display |
| `animated` | boolean | `true` | animate on render |
| `options` | object | — | merged into chart.js config (overrides defaults) |
| `style` | string | global | visual style |
| `theme` | string | global | color theme |

## Data shapes (auto-normalized in `Chart.svelte`)

- **Single series:** `[{label, value}]`
- **Multi-series (row-oriented):** `[{label, <key1>, <key2>, …}]` with `series: [{name: <key>}, …]`
- **Bubble / scatter:** `[{x, y, r?}]`

## chart.js types

| Component | chart.js `type` |
|---|---|
| BarChart | `bar` |
| LineChart | `line` |
| PieChart | `pie` |
| DoughnutChart | `doughnut` |
| RadarChart | `radar` |
| PolarAreaChart | `polarArea` |
| ScatterChart | `scatter` |
| BubbleChart | `bubble` |
| StackedBarChart | `bar` (stacked scales) |
| StackedLineChart | `line` (stacked scales + fill) |
| ComboChart | `combo` (per-series `chartType`, default `bar`) |

## Notes

- `StackedBarChart` and `StackedLineChart` merge your `options` over `{scales:{x:{stacked:true}, y:{stacked:true}}}` defaults.
- The internal `Chart.svelte` wrapper has extra props (`xAxisLabel`, `yAxisLabel`, `downloadable`) that the named wrappers **do not** expose. If a user needs axis labels or download, they should pass `options` with chart.js config, or use `Chart.svelte` directly from source (not exported).
- `ComboChart` data is row-oriented: `[{label, <key1>, <key2>…}]`; each series in `series:[{name, chartType}]` maps to a key, `chartType` defaults to `bar`.

See each chart's own page for its minimal example.