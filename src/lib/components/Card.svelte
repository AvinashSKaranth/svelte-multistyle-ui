<script>
  import "./card-styles.css";
  import { defaults } from "../config.js";

  let {
    style: styleProp,
    theme: themeProp,
    children,
    padding = "md",
    elevated = false,
    class: className = "",
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);

  const styleClass = $derived(`s-card-${style}`);
  const themeClass = $derived(`theme-${theme}`);
  const padClass = $derived(`card-pad-${padding}`);
</script>

<div
  class="s-card {styleClass} {themeClass} {padClass} {className}"
  class:elevated
  {...rest}
>
  {@render children?.()}
</div>