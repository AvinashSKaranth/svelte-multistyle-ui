<script>
  import "./breadcrumb-styles.css";
  import { defaults } from "../config.js";
  import { cn } from "../utils/cn.js";

  let { style: styleProp, theme: themeProp, items = [], class: className = "", ...rest } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);

  const styleClass = $derived(`s-breadcrumb-${style}`);
  const themeClass = $derived(`theme-${theme}`);
</script>

<nav
  class={cn("s-breadcrumb", styleClass, themeClass, className)}
  aria-label="Breadcrumb"
  {...rest}
>
  <ol class="s-breadcrumb-list">
    {#each items as item, i}
      <li class="s-breadcrumb-item" class:current={i === items.length - 1}>
        {#if item.href && i < items.length - 1}
          <a href={item.href}>{item.label}</a>
        {:else}
          <span aria-current={i === items.length - 1 ? "page" : undefined}
            >{item.label}</span
          >
        {/if}
        {#if i < items.length - 1}
          <span class="s-breadcrumb-sep" aria-hidden="true">/</span>
        {/if}
      </li>
    {/each}
  </ol>
</nav>