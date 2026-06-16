<script>
  import "./pagination-styles.css";
  import { defaults } from "../config.js";

  let {
    style: styleProp,
    theme: themeProp,
    total = 0,
    perPage = 10,
    current = $bindable(1),
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);

  const styleClass = $derived(`s-pagination-${style}`);
  const themeClass = $derived(`theme-${theme}`);
  const totalPages = $derived(Math.ceil(total / perPage));

  const pages = $derived(() => {
    const p = [];
    for (let i = 1; i <= totalPages; i++) p.push(i);
    return p;
  });
</script>

<nav
  class="s-pagination {styleClass} {themeClass}"
  aria-label="Pagination"
  {...rest}
>
  <button
    class="s-pagination-btn"
    disabled={current <= 1}
    onclick={() => current--}
    aria-label="Previous">&laquo;</button
  >
  {#each pages() as page}
    <button
      class="s-pagination-btn"
      class:active={page === current}
      onclick={() => (current = page)}>{page}</button
    >
  {/each}
  <button
    class="s-pagination-btn"
    disabled={current >= totalPages}
    onclick={() => current++}
    aria-label="Next">&raquo;</button
  >
</nav>