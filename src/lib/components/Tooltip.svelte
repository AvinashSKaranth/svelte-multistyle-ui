<script>
  import "./tooltip-styles.css";

  let {
    style = "material",
    theme = "default",
    text = "",
    position = "top",
    children,
    ...rest
  } = $props();

  const styleClass = $derived(`s-tooltip-${style}`);
  const themeClass = $derived(`theme-${theme}`);

  let visible = $state(false);
</script>

<div
  class="s-tooltip-wrapper {styleClass} {themeClass}"
  onmouseenter={() => (visible = true)}
  onmouseleave={() => (visible = false)}
  onfocusin={() => (visible = true)}
  onfocusout={() => (visible = false)}
  {...rest}
>
  {@render children?.()}
  {#if visible && text}
    <div class="tooltip-bubble tooltip-{position}" role="tooltip">{text}</div>
  {/if}
</div>
