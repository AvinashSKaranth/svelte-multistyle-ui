<script>
  import "./tooltip-styles.css";
  import { defaults } from "../config.js";

  let {
    style: styleProp,
    theme: themeProp,
    text = "",
    position = "top",
    children,
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);

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