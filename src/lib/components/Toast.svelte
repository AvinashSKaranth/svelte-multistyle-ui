<script>
  import "./toast-styles.css";
  import { defaults } from "../config.js";
  import { fly } from "svelte/transition";

  let {
    style: styleProp,
    theme: themeProp,
    toasts = $bindable([]),
    position = "top-right",
    duration = 4000,
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);
  const styleClass = $derived(`s-toast-${style}`);
  const themeClass = $derived(`theme-${theme}`);

  const icons = {
    info: "ℹ",
    success: "✓",
    warning: "⚠",
    error: "✕"
  };

  const flyParams = {
    "top-right":    { x: 20, y: -20 },
    "top-left":     { x: -20, y: -20 },
    "top-center":   { x: 0, y: -20 },
    "bottom-right": { x: 20, y: 20 },
    "bottom-left":  { x: -20, y: 20 },
    "bottom-center":{ x: 0, y: 20 }
  };

  function removeToast(id) {
    toasts = toasts.filter(t => t.id !== id);
  }

  function handleDismiss(id, e) {
    e.stopPropagation();
    removeToast(id);
  }
</script>

<div
  class="s-toast-container toast-{position} {styleClass} {themeClass}"
  {...rest}
>
  {#each toasts as toast (toast.id)}
    {#key toast.id}
      <div
        class="s-toast s-toast-{toast.variant} {styleClass} {themeClass}"
        transition:fly={{
          ...flyParams[position],
          duration: 300,
          opacity: 0
        }}
        role="alert"
      >
        <span class="s-toast-icon">{icons[toast.variant] || "ℹ"}</span>
        <div class="s-toast-content">
          {#if toast.title}
            <div class="s-toast-title">{toast.title}</div>
          {/if}
          <div class="s-toast-message">{toast.message}</div>
        </div>
        <button
          class="s-toast-close"
          onclick={(e) => handleDismiss(toast.id, e)}
          aria-label="Dismiss"
        >&times;</button>
        {#if toast.duration > 0}
          <div
            class="s-toast-progress"
            style="animation-duration: {toast.duration}ms"
          ></div>
        {/if}
      </div>
    {/key}
  {/each}
</div>
