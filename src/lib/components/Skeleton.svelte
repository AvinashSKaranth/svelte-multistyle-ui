<script>
  import "./skeleton-styles.css";

  let {
    style = "material",
    theme = "default",
    variant = "text",
    width = "100%",
    height = "",
    ...rest
  } = $props();

  const styleClass = $derived(`s-skeleton-${style}`);
  const themeClass = $derived(`theme-${theme}`);
</script>

<div
  class="s-skeleton {styleClass} {themeClass} skeleton-{variant}"
  style="width: {width}; {height ? `height: ${height}` : ''}"
  aria-hidden="true"
  {...rest}
></div>
