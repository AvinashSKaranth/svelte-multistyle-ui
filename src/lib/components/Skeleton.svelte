<script>
  import "./skeleton-styles.css";
  import { defaults } from "../config.js";
  import { cn } from "../utils/cn.js";

  let {
    style: styleProp,
    theme: themeProp,
    variant = "text",
    width = "100%",
    height = "",
    class: className = "",
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);

  const styleClass = $derived(`s-skeleton-${style}`);
  const themeClass = $derived(`theme-${theme}`);
</script>

<div
  class={cn("s-skeleton", styleClass, themeClass, `skeleton-${variant}`, className)}
  style="width: {width}; {height ? `height: ${height}` : ''}"
  aria-hidden="true"
  {...rest}
></div>