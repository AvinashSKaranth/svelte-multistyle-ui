<script>
  import Chart from "./Chart.svelte";
  let { data, series, labels, title, height, legend, animated, options, style, theme, class: className = "", ...rest } = $props();
</script>
<Chart type="bubble" {data} {series} {labels} {title} {height} {legend} {animated} {options} {style} {theme} class={className} {...rest} />
