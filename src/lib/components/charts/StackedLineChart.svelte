<script>
  import Chart from "./Chart.svelte";
  let { data, series, labels, title, height, legend, animated, options: userOpts = {}, style, theme, class: className = "", ...rest } = $props();
  // Merge user options over the stacked defaults so users can override
  let mergedOptions = $derived.by(() => {
    const base = {
      scales: {
        x: { stacked: true },
        y: { stacked: true },
      },
      elements: {
        line: { fill: true },
      },
    };
    if (userOpts && typeof userOpts === "object" && Object.keys(userOpts).length > 0) {
      return { ...base, ...userOpts, scales: { ...base.scales, ...(userOpts.scales || {}) }, elements: { ...base.elements, ...(userOpts.elements || {}), line: { ...base.elements.line, ...((userOpts.elements || {}).line || {}) } } };
    }
    return base;
  });
</script>
<Chart type="line" {data} {series} {labels} {title} {height} {legend} {animated} options={mergedOptions} {style} {theme} class={className} {...rest} />
