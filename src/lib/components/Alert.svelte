<script>
  import "./alert-styles.css";
  import { defaults, iconClass } from "../config.js";
  import { slide } from "svelte/transition";

  let {
    style: styleProp,
    theme: themeProp,
    variant = "info",
    title = "",
    icon: iconProp,
    children,
    dismissible = false,
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);

  const styleClass = $derived(`s-alert-${style}`);
  const themeClass = $derived(`theme-${theme}`);

  const defaultIcons = {
    info: "ℹ",
    success: "✓",
    warning: "⚠",
    error: "✕"
  };

  const icon = $derived(iconProp ?? defaultIcons[variant] ?? null);
  const iconEl = $derived(icon && icon.length === 1 ? icon : null);
  const iconName = $derived(icon && icon.length > 1 ? icon : null);

  let visible = $state(true);
</script>

{#if visible}
  <div
    class="s-alert {styleClass} {themeClass} s-alert-{variant}"
    role="alert"
    transition:slide={{ duration: 200 }}
    {...rest}
  >
    {#if iconEl}
      <span class="s-alert-icon">{iconEl}</span>
    {:else if iconName}
      <span class="s-alert-icon {iconClass}">{iconName}</span>
    {/if}
    <div class="s-alert-content">
      {#if title}<strong class="s-alert-title">{title}</strong>{/if}
      <div class="s-alert-body">{@render children?.()}</div>
    </div>
    {#if dismissible}
      <button
        class="s-alert-dismiss"
        onclick={() => (visible = false)}
        aria-label="Dismiss">&times;</button
      >
    {/if}
  </div>
{/if}