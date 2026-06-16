<script>
  import "./buttongroup-styles.css";
  import { defaults } from "../config.js";

  let {
    style: styleProp,
    theme: themeProp,
    variant = "outlined",
    size = "md",
    items = [],
    value = $bindable(""),
    orientation = "horizontal",
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);
  const styleClass = $derived(`s-btn-group-${style}`);
  const themeClass = $derived(`theme-${theme}`);

  function handleClick(item) {
    value = item.value;
    item.onclick?.();
  }
</script>

<div
  class="s-btn-group {styleClass} {themeClass} btn-group-{orientation} btn-group-{variant} btn-group-{size}"
  role="group"
  {...rest}
>
  {#each items as item}
    <button
      class="s-btn-group-item"
      class:active={value === item.value}
      onclick={() => handleClick(item)}
      disabled={item.disabled}
    >
      {#if item.icon}
        <span class="btn-group-icon">{item.icon}</span>
      {/if}
      <span>{item.label}</span>
    </button>
  {/each}
</div>
