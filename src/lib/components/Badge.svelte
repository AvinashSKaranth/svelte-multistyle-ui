<script>
  import "./badge-styles.css";

  let {
    style = "material",
    theme = "default",
    variant = "filled",
    color = "primary",
    children,
    ...rest
  } = $props();

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
