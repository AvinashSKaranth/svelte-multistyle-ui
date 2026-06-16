<script>
  import "./toggle-styles.css";
  import { defaults } from "../config.js";

  let {
    style: styleProp,
    theme: themeProp,
    checked = $bindable(false),
    label = "",
    disabled = false,
    size = "md",
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);

  const styleClass = $derived(`s-toggle-${style}`);
  const themeClass = $derived(`theme-${theme}`);
  const sizeClass = $derived(`toggle-${size}`);
  const uid = Math.random().toString(36).slice(2, 9);
  const internalId = `toggle-${uid}`;
</script>

<label
  class="s-toggle {styleClass} {themeClass} {sizeClass}"
  class:disabled
  class:checked
  for={internalId}
>
  <input
    type="checkbox"
    bind:checked
    {disabled}
    id={internalId}
    role="switch"
    aria-checked={checked}
    {...rest}
  />
  <span class="s-toggle-track">
    <span class="s-toggle-thumb"></span>
  </span>
  {#if label}
    <span class="s-toggle-label">{label}</span>
  {/if}
</label>