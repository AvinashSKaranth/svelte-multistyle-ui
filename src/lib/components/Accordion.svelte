<script>
  import "./accordion-styles.css";
  import { defaults } from "../config.js";
  import { cn } from "../utils/cn.js";

  let {
    style: styleProp,
    theme: themeProp,
    items = [],
    multiple = false,
    current = "",
    class: className = "",
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);

  const styleClass = $derived(`s-accordion-${style}`);
  const themeClass = $derived(`theme-${theme}`);

  let openItems = $state(new Set());
  $effect(() => {
    if (current) openItems = new Set([current]);
  });

  function toggle(id) {
    if (multiple) {
      const next = new Set(openItems);
      next.has(id) ? next.delete(id) : next.add(id);
      openItems = next;
    } else {
      openItems = openItems.has(id) ? new Set() : new Set([id]);
    }
  }
</script>

<div class={cn("s-accordion", styleClass, themeClass, className)} {...rest}>
  {#each items as item}
    <div class="s-accordion-item" class:open={openItems.has(item.id)}>
      <button
        class="s-accordion-header"
        onclick={() => toggle(item.id)}
        aria-expanded={openItems.has(item.id)}
      >
        <span>{item.title}</span>
        <svg
          class="s-accordion-arrow"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#64748b"
          stroke-width="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {#if openItems.has(item.id)}
        <div class="s-accordion-content">
          {item.content}
        </div>
      {/if}
    </div>
  {/each}
</div>