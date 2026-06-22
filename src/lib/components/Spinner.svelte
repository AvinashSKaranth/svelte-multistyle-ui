<script>
  import "./spinner-styles.css";
  import { defaults } from "../config.js";
  import { cn } from "../utils/cn.js";

  let {
    style: styleProp,
    theme: themeProp,
    size = "md",
    class: className = "",
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);

  const styleClass = $derived(`s-spinner-${style}`);
  const themeClass = $derived(`theme-${theme}`);
  const sizeClass = $derived(`spinner-${size}`);
</script>

<div
  class={cn("s-spinner", styleClass, themeClass, sizeClass, className)}
  role="status"
  aria-label="Loading"
  {...rest}
>
  <div class="s-spinner-circle"></div>
</div>