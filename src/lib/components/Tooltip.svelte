<script>
  import "./tooltip-styles.css";
  import { defaults } from "../config.js";
  import { cn } from "../utils/cn.js";

  let {
    style: styleProp,
    theme: themeProp,
    text = "",
    position = "top",
    children,
    class: className = "",
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);

  const styleClass = $derived(`s-tooltip-${style}`);
  const themeClass = $derived(`theme-${theme}`);

  let visible = $state(false);
</script>

<div
  class={cn("s-tooltip-wrapper", styleClass, themeClass, className)}
  onmouseenter={() => (visible = true)}
  onmouseleave={() => (visible = false)}
  onfocusin={() => (visible = true)}
  onfocusout={() => (visible = false)}
  {...rest}
>
  {@render children?.()}
  {#if visible && text}
    <div class="s-tooltip tooltip-{position}" role="tooltip">{text}</div>
  {/if}
</div>