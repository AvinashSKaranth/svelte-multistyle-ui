<script>
  import "./modal-styles.css";
  import { defaults } from "../config.js";
  import { fade, scale } from "svelte/transition";
  import { portal } from "../actions/portal.js";
  import { cn } from "../utils/cn.js";

  let {
    style: styleProp,
    theme: themeProp,
    open = $bindable(false),
    title = "",
    size = "medium",
    children,
    onclose,
    class: className = "",
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);

  const styleClass = $derived(`s-modal-${style}`);
  const themeClass = $derived(`theme-${theme}`);
  const sizeClass = $derived(`s-modal-${size}`);

  function handleClose() {
    open = false;
    onclose?.();
  }

  function handleBackdrop(e) {
    if (e.target === e.currentTarget) handleClose();
  }
</script>

{#if open}
  <div
    use:portal
    class={cn("s-modal-overlay", styleClass, themeClass, className)}
    transition:fade={{ duration: 200 }}
    onclick={handleBackdrop}
    role="dialog"
    aria-modal="true"
    {...rest}
  >
    <div class="s-modal {sizeClass}" transition:scale={{ start: 0.95, duration: 200 }}>
      <div class="s-modal-header">
        <h2 class="s-modal-title">{title}</h2>
        <button class="s-modal-close" onclick={handleClose} aria-label="Close"
          >&times;</button
        >
      </div>
      <div class="s-modal-body">
        {@render children?.()}
      </div>
    </div>
  </div>
{/if}
