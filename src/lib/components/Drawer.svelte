<script>
  import "./drawer-styles.css";
  import { defaults } from "../config.js";
  import { fade } from "svelte/transition";

  let {
    style: styleProp,
    theme: themeProp,
    position = "left",
    open = $bindable(false),
    children,
    onclose,
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);
  const styleClass = $derived(`s-drawer-${style}`);
  const themeClass = $derived(`theme-${theme}`);

  function handleClose() {
    open = false;
    onclose?.();
  }

  function handleBackdrop(e) {
    if (e.target === e.currentTarget) handleClose();
  }

  // Custom slide transition per position
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
      easing: (t) => 1 - Math.pow(1 - t, 3),
      css: (t, u) => `transform: translate(${x * u}px, ${y * u}px); opacity: ${1 - u * 0.3};`
    };
  }
</script>

{#if open}
  <div
    class="s-drawer-overlay"
    transition:fade={{ duration: 200 }}
    onclick={handleBackdrop}
    role="presentation"
    {...rest}
  >
    <div
      class="s-drawer {styleClass} {themeClass} drawer-{position}"
      transition:slideTransition
      role="dialog"
      aria-modal="true"
    >
      {@render children?.()}
    </div>
  </div>
{/if}
