<script>
  import "./dropdown-styles.css";
  import { defaults } from "../config.js";
  import { fly } from "svelte/transition";

  let {
    style: styleProp,
    theme: themeProp,
    variant = "filled",
    color = "primary",
    children,
    items = [],
    position = "bottom",
    align = "left",
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);
  const styleClass = $derived(`s-dropdown-${style}`);
  const themeClass = $derived(`theme-${theme}`);
  const variantClass = $derived(`dropdown-${color}`);

  let open = $state(false);
  let menuEl = $state(null);
  let triggerEl = $state(null);

  function toggle() {
    open = !open;
  }

  function close() {
    open = false;
  }

  function handleItemClick(item) {
    item.onclick?.();
    close();
  }

  // Click outside to close
  $effect(() => {
    if (!open) return;
    const handler = (e) => {
      if (menuEl && !menuEl.contains(e.target) && triggerEl && !triggerEl.contains(e.target)) {
        close();
      }
    };
    // Escape key
    const keyHandler = (e) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("pointerdown", handler);
    document.addEventListener("keydown", keyHandler);
    return () => {
      document.removeEventListener("pointerdown", handler);
      document.removeEventListener("keydown", keyHandler);
    };
  });
</script>

<div
  class="s-dropdown {styleClass} {themeClass} dropdown-{align}"
  class:open
  {...rest}
>
  <div
    bind:this={triggerEl}
    class="s-dropdown-trigger {variantClass}"
    onclick={toggle}
    role="button"
    tabindex="0"
    aria-expanded={open}
    onkeydown={(e) => { if (e.key === "Enter" || e.key === " ") toggle(); }}
  >
    {@render children?.()}
  </div>

  {#if open}
    <div
      bind:this={menuEl}
      class="s-dropdown-menu dropdown-{position}"
      transition:fly={{
        y: position === "bottom" ? -8 : 8,
        duration: 150,
        opacity: 0
      }}
      role="menu"
    >
      {#each items as item}
        {#if item.divider}
          <div class="s-dropdown-divider"></div>
        {:else}
          <button
            class="s-dropdown-item"
            class:active={item.active}
            disabled={item.disabled}
            onclick={() => handleItemClick(item)}
            role="menuitem"
          >
            {#if item.icon}
              <span class="s-dropdown-item-icon">{item.icon}</span>
            {/if}
            <span class="s-dropdown-item-label">{item.label}</span>
            {#if item.shortcut}
              <span class="s-dropdown-item-shortcut">{item.shortcut}</span>
            {/if}
          </button>
        {/if}
      {/each}
    </div>
  {/if}
</div>
