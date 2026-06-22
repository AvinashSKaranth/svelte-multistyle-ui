<script>
  import "./checkbox-styles.css";
  import { defaults } from "../config.js";
  import { cn } from "../utils/cn.js";

  let {
    style: styleProp,
    theme: themeProp,
    checked = $bindable(false),
    label = "",
    disabled = false,
    indeterminate = false,
    class: className = "",
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);

  const styleClass = $derived(`s-checkbox-${style}`);
  const themeClass = $derived(`theme-${theme}`);
  const uid = Math.random().toString(36).slice(2, 9);
  const internalId = `checkbox-${uid}`;
</script>

<label
  class={cn("s-checkbox", styleClass, themeClass, className)}
  class:disabled
  class:checked
  class:indeterminate
  for={internalId}
>
  <input
    type="checkbox"
    bind:checked
    {disabled}
    id={internalId}
    bind:indeterminate
    {...rest}
  />
  <span class="s-checkbox-box">
    {#if indeterminate}
      <svg class="s-checkbox-icon" viewBox="0 0 16 16" fill="none">
        <path
          d="M4 8h8"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    {:else if checked}
      <svg class="s-checkbox-icon" viewBox="0 0 16 16" fill="none">
        <path
          d="M3.5 8.5L6.5 11.5L12.5 4.5"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    {/if}
  </span>
  {#if label}
    <span class="s-checkbox-label">{label}</span>
  {/if}
</label>