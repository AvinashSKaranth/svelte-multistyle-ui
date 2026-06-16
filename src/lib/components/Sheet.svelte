<script>
  import "./sheet-styles.css";
  import { defaults } from "../config.js";
  import { fade } from "svelte/transition";

  let {
    style: styleProp,
    theme: themeProp,
    position = "right",
    size = "md",
    open = $bindable(false),
    title = "",
    children,
    onclose,
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);
  const styleClass = $derived(`s-sheet-${style}`);
  const themeClass = $derived(`theme-${theme}`);
  const positionClass = $derived(`sheet-${position}`);
  const sizeClass = $derived(`sheet-${size}`);

  function handleClose() {
    open = false;
    onclose?.();
  }

  function handleBackdrop(e) {
    if (e.target === e.currentTarget) handleClose();
  }

  // Custom sliding transitions per position
  function slideTransition(node) {
    const rect = node.getBoundingClientRect();
    let x = 0, y = 0;

    switch (position) {
      case "left":   x = -rect.width; break;
      case "right":  x = rect.width; break;
      case "top":    y = -rect.height; break;
      case "bottom": y = rect.height; break;
    }

    return {
      duration: 300,
      easing: (t) => 1 - Math.pow(1 - t, 3), // ease-out cubic
      css: (t, u) => `transform: translate(${x * u}px, ${y * u}px); opacity: ${t};`
    };
  }
</script>

{#if open}
  <div
    class="s-sheet-overlay"
    transition:fade={{ duration: 200 }}
    onclick={handleBackdrop}
    role="presentation"
    {...rest}
  >
    <div
      class="s-sheet {styleClass} {themeClass} {positionClass} {sizeClass}"
      transition:slideTransition
      role="dialog"
      aria-modal="true"
      aria-label={title || "Sheet"}
    >
      <div class="s-sheet-header">
        <h2 class="s-sheet-title">{title}</h2>
        <button
          class="s-sheet-close"
          onclick={handleClose}
          aria-label="Close"
        >&times;</button>
      </div>
      <div class="s-sheet-body">
        {@render children?.()}
      </div>
    </div>
  </div>
{/if}
