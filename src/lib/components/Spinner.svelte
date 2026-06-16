<script>
  import "./spinner-styles.css";

  let {
    style = "material",
    theme = "default",
    size = "md",
    ...rest
  } = $props();

  const styleClass = $derived(`s-spinner-${style}`);
  const themeClass = $derived(`theme-${theme}`);
  const sizeClass = $derived(`spinner-${size}`);
</script>

<div
  class="s-spinner {styleClass} {themeClass} {sizeClass}"
  role="status"
  aria-label="Loading"
  {...rest}
>
  <div class="spinner-ring"></div>
</div>
