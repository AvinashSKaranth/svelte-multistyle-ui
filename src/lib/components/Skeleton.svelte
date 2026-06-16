<script>
  import "./skeleton-styles.css";
  import { defaults } from "../config.js";

  let {
    style: styleProp,
    theme: themeProp,
    variant = "text",
    width = "100%",
    height = "",
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);

  const styleClass = $derived(`s-skeleton-${style}`);
  const themeClass = $derived(`theme-${theme}`);
</script>

<div
  class="s-skeleton {styleClass} {themeClass} skeleton-{variant}"
  style="width: {width}; {height ? `height: ${height}` : ''}"
  aria-hidden="true"
  {...rest}
></div>