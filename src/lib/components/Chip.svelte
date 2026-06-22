<script>
  import "./chip-styles.css";
  import { defaults } from "../config.js";
  import { cn } from "../utils/cn.js";

  let {
    style: styleProp,
    theme: themeProp,
    variant = "filled",
    color = "primary",
    size = "md",
    children,
    dismissible = false,
    icon = "",
    ondismiss,
    class: className = "",
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);
  const styleClass = $derived(`s-chip-${style}`);
  const themeClass = $derived(`theme-${theme}`);

  let visible = $state(true);
</script>

{#if visible}
  <span
    class={cn("s-chip", styleClass, themeClass, `chip-${variant}`, `chip-${color}`, `chip-${size}`, className)}
    {...rest}
  >
    {#if icon}
      <span class="s-chip-icon">{icon}</span>
    {/if}
    <span class="s-chip-label">{@render children?.()}</span>
    {#if dismissible}
      <button
        class="s-chip-dismiss"
        onclick={() => { visible = false; ondismiss?.(); }}
        aria-label="Remove"
      >&times;</button>
    {/if}
  </span>
{/if}
