<script>
  import "./button-styles.css";
  import { defaults } from "../config.js";

  let {
    style: styleProp,
    theme: themeProp,
    variant = "filled",
    size = "md",
    disabled = false,
    children,
    onclick,
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);

  const styleClass = $derived(`s-button-${style}`);
  const themeClass = $derived(`theme-${theme}`);
  const variantClass = $derived(`btn-${variant}`);
  const sizeClass = $derived(`btn-${size}`);
</script>

<button
  class="s-button {styleClass} {themeClass} {variantClass} {sizeClass}"
  {disabled}
  {onclick}
  {...rest}
>
  {@render children?.()}
</button>