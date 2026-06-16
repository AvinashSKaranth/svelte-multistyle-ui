<script>
  import "./breadcrumb-styles.css";

  let { style = "material", theme = "default", items = [], ...rest } = $props();

  const styleClass = $derived(`s-breadcrumb-${style}`);
  const themeClass = $derived(`theme-${theme}`);
</script>

<nav
  class="s-breadcrumb {styleClass} {themeClass}"
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
