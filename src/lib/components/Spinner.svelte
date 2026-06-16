<script>
  import "./spinner-styles.css";
  import { defaults } from "../config.js";

  let {
    style: styleProp,
    theme: themeProp,
    size = "md",
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);

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