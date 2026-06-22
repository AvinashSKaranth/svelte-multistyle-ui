<script>
  import Chart from "./Chart.svelte";
  let { data, series, labels, title, height, legend, animated, options, style, theme, class: className = "", ...rest } = $props();
</script>
<Chart type="pie" {data} {series} {labels} {title} {height} {legend} {animated} {options} {style} {theme} class={className} {...rest} />
