<script>
  import "./searchinput-styles.css";

  let {
    style = "material",
    theme = "default",
    value = $bindable(""),
    placeholder = "Search...",
    label = "",
    disabled = false,
    ...rest
  } = $props();

  const styleClass = $derived(`s-searchinput-${style}`);
  const themeClass = $derived(`theme-${theme}`);
</script>

<div
  class="s-searchinput-wrapper {styleClass} {themeClass}"
  class:disabled
  {...rest}
>
  {#if label}
    <label class="s-searchinput-label" for={`search-${Math.random().toString(36).slice(2, 9)}`}>{label}</label>
  {/if}
  <svg
    class="s-searchinput-icon"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#334155"
    stroke-width="2.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
  </svg>
  <input id={`search-${Math.random().toString(36).slice(2, 9)}`} type="search" bind:value {placeholder} {disabled} />
  {#if value}
    <button
      class="s-searchinput-clear"
      onclick={() => (value = "")}
      aria-label="Clear">&times;</button
    >
  {/if}
</div>
