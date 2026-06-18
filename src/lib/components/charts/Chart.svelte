<script>
  import { onDestroy } from "svelte";
  import { Chart as ChartJS } from "chart.js";
  import "./chart-styles.css";
  import { defaults } from "../../config.js";
  import { buildData, buildOptions, readTokens } from "./chart-config.js";

  let {
    type,
    data = null,
    series = null,
    labels = null,
    options = {},
    title = "",
    height = 320,
    legend = "auto",
    animated = true,
    downloadable = false,
    xAxisLabel = "",
    yAxisLabel = "",
    style: styleProp,
    theme: themeProp,
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);
  const styleClass = $derived(`s-chart-${style}`);
  const themeClass = $derived(`theme-${theme}`);
  const typeClass = $derived(`s-chart-${type}`);
  const heightStyle = $derived(typeof height === "number" ? `${height}px` : height);

  // Normalize data formats:
  //   [{label:"q1", value:5}, ...] → single-series (labels + data array)
  //   [{label:"jan", revenue:10, Cost:5}, ...] → multi-series (labels + series)
  const normalized = $derived.by(() => {
    let d = data;
    let s = series;
    let l = labels;

    // Combo chart: row-oriented data + optional series for chartType
    if (type === "combo" && Array.isArray(d) && d.length > 0 && d[0] &&
        typeof d[0] === "object" && !Array.isArray(d[0]) && "label" in d[0]) {
      const keys = Object.keys(d[0]).filter(k => k !== "label");
      l = d.map(item => item.label);
      const chartTypeMap = {};
      if (s) { s.forEach(sv => { chartTypeMap[sv.name] = sv.chartType; }); }
      s = keys.map(key => ({
        name: key,
        values: d.map(item => item[key]),
        chartType: chartTypeMap[key] || "bar",
      }));
      d = null;
    } else if (Array.isArray(d) && d.length > 0 && d[0] &&
        typeof d[0] === "object" && !Array.isArray(d[0]) &&
        "label" in d[0] && "value" in d[0] && !s) {
      // Single-series {label, value} format
      l = d.map(item => item.label);
      d = d.map(item => item.value);
    } else if (Array.isArray(d) && d.length > 0 && d[0] &&
        typeof d[0] === "object" && !Array.isArray(d[0]) &&
        "label" in d[0] && !s) {
      // Multi-series row-oriented format
      const keys = Object.keys(d[0]).filter(k => k !== "label");
      l = d.map(item => item.label);
      s = keys.map(key => ({ name: key, values: d.map(item => item[key]) }));
      d = null;
    }
    // Bubble chart: row-oriented {label, x, y, r} format
    if (type === "bubble" && Array.isArray(s) && s.length > 0 && s[0] &&
        typeof s[0] === "object" && !Array.isArray(s[0]) &&
        "x" in s[0] && "y" in s[0]) {
      const points = s.map(item => ({
        x: item.x,
        y: item.y,
        r: item.r ?? 10,
      }));
      const datasetLabel = s[0].label || "Data";
      s = [{ name: datasetLabel, points }];
    }

    // Normalize row-oriented format passed via series prop
    else if (!d && Array.isArray(s) && s.length > 0 && s[0] &&
        typeof s[0] === "object" && !Array.isArray(s[0]) &&
        "label" in s[0]) {
      if ("value" in s[0]) {
        // Single-series {label, value}
        l = s.map(item => item.label);
        d = s.map(item => item.value);
        s = null;
      } else {
        // Multi-series row-oriented
        const keys = Object.keys(s[0]).filter(k => k !== "label");
        l = s.map(item => item.label);
        s = keys.map(key => ({ name: key, values: s.map(item => item[key]) }));
      }
    }

    return { data: d, series: s, labels: l };
  });

  const seriesCount = $derived(normalized.series ? normalized.series.length : (normalized.data ? 1 : 0));

  // Shape version — changes only when chart structure changes
  const shapeKey = $derived(`${type}-${style}-${theme}`);

  let canvasEl = $state();
  let chartInstance = null;

  // Clean up chart when component unmounts
  onDestroy(() => {
    chartInstance?.destroy();
    chartInstance = null;
  });

  // Single effect: recreate on shape change, update in-place otherwise
  $effect(() => {
    if (!canvasEl) return;

    // Track all deps
    shapeKey; normalized; options; title; legend; animated; xAxisLabel; yAxisLabel;

    const canvas = canvasEl;
    const tokens = readTokens(canvas);

    // Check if a chart already exists on this canvas
    const existing = ChartJS.getChart(canvas);

    if (existing && existing.config.type === type) {
      // Shape unchanged — update data and options in place
      existing.data = buildData(type, { data: normalized.data, series: normalized.series, labels: normalized.labels }, tokens);
      existing.options = buildOptions(type, style, tokens, { title, legend, animated, userOptions: options, seriesCount, xAxisLabel, yAxisLabel });
      existing.update();
      chartInstance = existing;
      return;
    }

    // Shape changed (or first mount) — destroy old if any, then create new
    if (existing) existing.destroy();

    const ctx = canvas.getContext("2d");
    const cfg = {
      type,
      data: buildData(type, { data: normalized.data, series: normalized.series, labels: normalized.labels }, tokens),
      options: buildOptions(type, style, tokens, { title, legend, animated, userOptions: options, seriesCount, xAxisLabel, yAxisLabel }),
    };
    chartInstance = new ChartJS(ctx, cfg);
  });

  function downloadChart() {
    if (!canvasEl) return;
    const link = document.createElement("a");
    link.download = `${title || type}-chart.png`;
    link.href = canvasEl.toDataURL("image/png");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
</script>

<div
  class="s-chart {styleClass} {themeClass} {typeClass} {downloadable ? 's-chart-downloadable' : ''}"
  style="height:{heightStyle}"
  {...rest}
>
  <canvas
    bind:this={canvasEl}
    role="img"
    aria-label={title || `${type} chart`}
  ></canvas>
  {#if downloadable}
    <button
      type="button"
      class="s-chart-download-btn"
      onclick={downloadChart}
      aria-label="Download chart as PNG"
      title="Download as PNG"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
    </button>
  {/if}
</div>
