<script>
  import "./iconbutton-styles.css";

  let {
    style = "material",
    theme = "default",
    variant = "filled",
    size = "md",
    disabled = false,
    children,
    onclick,
    ariaLabel = "",
    ...rest
  } = $props();

  const styleClass = $derived(`s-iconbtn-${style}`);
  const themeClass = $derived(`theme-${theme}`);
  const variantClass = $derived(`ibtn-${variant}`);
  const sizeClass = $derived(`ibtn-${size}`);
</script>

<button
  class="s-iconbtn {styleClass} {themeClass} {variantClass} {sizeClass}"
  {disabled}
  {onclick}
  aria-label={ariaLabel}
  {...rest}
>
  {@render children?.()}
</button>
