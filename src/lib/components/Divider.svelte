<script>
  import "./divider-styles.css";
  import { defaults } from "../config.js";
  import { cn } from "../utils/cn.js";

  let {
    style: styleProp,
    theme: themeProp,
    orientation = "horizontal",
    label = "",
    class: className = "",
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);

  const styleClass = $derived(`s-divider-${style}`);
  const themeClass = $derived(`theme-${theme}`);
</script>

<div
  class={cn("s-divider", styleClass, themeClass, className)}
  class:vertical={orientation === "vertical"}
  role="separator"
  aria-orientation={orientation}
  {...rest}
>
  {#if label && orientation === "horizontal"}
    <span class="s-divider-line"></span>
    <span class="s-divider-label">{label}</span>
    <span class="s-divider-line"></span>
  {/if}
</div>