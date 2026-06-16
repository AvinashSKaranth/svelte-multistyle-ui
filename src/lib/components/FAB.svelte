<script>
  import "./fab-styles.css";

  let {
    style = "material",
    theme = "default",
    children,
    position = "bottom-right",
    onclick,
    ...rest
  } = $props();

  const styleClass = $derived(`s-fab-${style}`);
  const themeClass = $derived(`theme-${theme}`);
</script>

<button
  class="s-fab {styleClass} {themeClass} fab-{position}"
  {onclick}
  {...rest}
>
  {@render children?.()}
</button>
