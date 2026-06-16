<script>
  import "./popover-styles.css";
  import { defaults } from "../config.js";
  import { fly } from "svelte/transition";

  let {
    style: styleProp,
    theme: themeProp,
    children,
    content,
    position = "top",
    open = $bindable(false),
    trigger = "click",
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);
  const styleClass = $derived(`s-popover-${style}`);
  const themeClass = $derived(`theme-${theme}`);

  let popoverEl = $state(null);
  let triggerEl = $state(null);
  let isOpen = $state(false);

  const effectiveOpen = $derived(open !== undefined ? open : isOpen);

  function toggle() {
    if (trigger === "click") {
      if (open !== undefined) open = !open;
      else isOpen = !isOpen;
    }
  }

  function show() {
    if (trigger === "hover") {
      if (open !== undefined) open = true;
      else isOpen = true;
    }
  }

  function hide() {
    if (trigger === "hover") {
      if (open !== undefined) open = false;
      else isOpen = false;
    }
  }

  function closeFromOutside() {
    if (open !== undefined) open = false;
    else isOpen = false;
  }

  // Click outside / Escape
  $effect(() => {
    if (!effectiveOpen) return;
    const handler = (e) => {
      if (popoverEl && !popoverEl.contains(e.target) && triggerEl && !triggerEl.contains(e.target)) {
        closeFromOutside();
      }
    };
    const keyHandler = (e) => {
      if (e.key === "Escape") closeFromOutside();
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
  class="s-popover-wrapper {styleClass} {themeClass}"
  onmouseenter={trigger === "hover" ? show : undefined}
  onmouseleave={trigger === "hover" ? hide : undefined}
  {...rest}
>
  <div
    bind:this={triggerEl}
    class="s-popover-trigger"
    onclick={toggle}
    onkeydown={(e) => { if (e.key === "Enter" || e.key === " ") toggle(); }}
    role="button"
    tabindex="0"
    aria-expanded={effectiveOpen}
  >
    {@render children?.()}
  </div>

  {#if effectiveOpen}
    <div
      bind:this={popoverEl}
      class="s-popover popover-{position}"
      transition:fly={{
        y: position === "bottom" ? -8 : position === "top" ? 8 : 0,
        x: position === "right" ? -8 : position === "left" ? 8 : 0,
        duration: 150,
        opacity: 0
      }}
      role="dialog"
    >
      <div class="s-popover-arrow"></div>
      <div class="s-popover-content">
        {#if typeof content === "string"}
          <p style="margin:0">{content}</p>
        {:else}
          {@render content?.()}
        {/if}
      </div>
    </div>
  {/if}
</div>
