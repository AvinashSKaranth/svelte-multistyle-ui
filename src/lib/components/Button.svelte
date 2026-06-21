<script>
  import "./button-styles.css";
  import { defaults, iconClass } from "../config.js";

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
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);

  const styleClass = $derived(`s-button-${style}`);
  const themeClass = $derived(`theme-${theme}`);
  const variantClass = $derived(`btn-${variant}`);
  const presetClass = $derived(`btn-${preset}`);
  const sizeClass = $derived(`btn-${size}`);
</script>

<button
  class="s-button {styleClass} {themeClass} {variantClass} {presetClass} {sizeClass}"
  {disabled}
  {onclick}
  {...rest}
>
  {#if icon}<span class="s-button-icon {iconClass}">{icon}</span>{/if}
  {@render children?.()}
</button>