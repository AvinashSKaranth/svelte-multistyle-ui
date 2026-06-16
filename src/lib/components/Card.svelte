<script>
  import "./card-styles.css";

  let {
    style = "material",
    theme = "default",
    children,
    padding = "md",
    elevated = false,
    class: className = "",
    ...rest
  } = $props();

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
