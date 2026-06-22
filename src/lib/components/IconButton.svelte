<script>
  import "./iconbutton-styles.css";
  import { defaults, iconClass } from "../config.js";
  import { cn } from "../utils/cn.js";

  let {
    style: styleProp,
    theme: themeProp,
    variant = "filled",
    preset = "primary",
    size = "md",
    disabled = false,
    icon,
    children,
    onclick,
    ariaLabel = "",
    class: className = "",
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);

  const styleClass = $derived(`s-iconbtn-${style}`);
  const themeClass = $derived(`theme-${theme}`);
  const variantClass = $derived(`ibtn-${variant}`);
  const presetClass = $derived(`ibtn-${preset}`);
  const sizeClass = $derived(`ibtn-${size}`);
</script>

<button
  class={cn("s-iconbtn", styleClass, themeClass, variantClass, presetClass, sizeClass, className)}
  {disabled}
  {onclick}
  aria-label={ariaLabel}
  {...rest}
>
  {#if icon}
    <span class="{iconClass}">{icon}</span>
  {:else}
    {@render children?.()}
  {/if}
</button>