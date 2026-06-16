<script>
  import "./button-styles.css";

  let {
    style = "material",
    theme = "default",
    variant = "filled",
    size = "md",
    disabled = false,
    children,
    onclick,
    ...rest
  } = $props();

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
