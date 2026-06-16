<script>
  import "./modal-styles.css";
  import { fade, scale } from "svelte/transition";

  let {
    style = "material",
    theme = "default",
    open = $bindable(false),
    title = "",
    children,
    onclose,
    ...rest
  } = $props();

  const styleClass = $derived(`s-modal-${style}`);
  const themeClass = $derived(`theme-${theme}`);

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
    class="s-modal-overlay {styleClass} {themeClass}"
    transition:fade={{ duration: 200 }}
    onclick={handleBackdrop}
    role="dialog"
    aria-modal="true"
    {...rest}
  >
    <div
      class="s-modal"
      transition:scale={{ start: 0.95, duration: 200 }}
    >
      <div class="s-modal-header">
        <h2 class="s-modal-title">{title}</h2>
        <button
          class="s-modal-close"
          onclick={handleClose}
          aria-label="Close"
        >&times;</button>
      </div>
      <div class="s-modal-body">
        {@render children?.()}
      </div>
    </div>
  </div>
{/if}
