<script>
  import Chart from "./Chart.svelte";
  let { data, series, labels, title, height, legend, animated, options: userOpts = {}, style, theme, ...rest } = $props();
  // Merge user options over the stacked defaults so users can override
  let mergedOptions = $derived.by(() => {
    const base = {
      scales: {
        x: { stacked: true },
        y: { stacked: true },
      },
    };
    if (userOpts && typeof userOpts === "object" && Object.keys(userOpts).length > 0) {
      return { ...base, ...userOpts, scales: { ...base.scales, ...(userOpts.scales || {}) } };
    }
    return base;
  });
</script>
<Chart type="bar" {data} {series} {labels} {title} {height} {legend} {animated} options={mergedOptions} {style} {theme} {...rest} />
