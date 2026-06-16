<script>
  import "./badge-styles.css";
  import { defaults } from "../config.js";

  let {
    style: styleProp,
    theme: themeProp,
    variant = "filled",
    color = "primary",
    children,
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);

  const styleClass = $derived(`s-badge-${style}`);
  const themeClass = $derived(`theme-${theme}`);
</script>

<span
  class="s-badge {styleClass} {themeClass} badge-{variant} badge-{color}"
  {...rest}
>
  {#if variant === "dot"}
    <span class="badge-dot"></span>
  {/if}
  {@render children?.()}
</span>