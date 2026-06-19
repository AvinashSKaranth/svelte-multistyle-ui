<script>
  import "./select-styles.css";
  import { defaults } from "../config.js";

  let {
    style: styleProp,
    theme: themeProp,
    value = $bindable(""),
    options = [],
    placeholder = "Select...",
    label = "",
    disabled = false,
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);

  let focused = $state(false);
  let hasValue = $derived(
    value !== "" && value !== null && value !== undefined,
  );
  let floated = $derived(focused || hasValue);

  const styleClass = $derived(`s-select-${style}`);
  const themeClass = $derived(`theme-${theme}`);
  const uid = Math.random().toString(36).slice(2, 9);
  const internalId = `select-${uid}`;

  const floatingStyles = [
    "material",
    "material3",
    "fluent",
    "carbon",
    "bootstrap",
    "legacy-ios",
  ];
  const hasFloatingLabel = $derived(
    floatingStyles.includes(style) && (label || placeholder),
  );
  const displayLabel = $derived(label || placeholder);
</script>

<div
  class="s-select-wrapper {styleClass} {themeClass}"
  class:disabled
  class:focused
  class:has-value={hasValue}
  class:floated
>
  {#if hasFloatingLabel}
    <label class="s-select-floating-label" for={internalId}
      >{displayLabel}</label
    >
  {/if}
  <select
    bind:value
    {disabled}
    id={internalId}
    onfocus={() => (focused = true)}
    onblur={() => (focused = false)}
    {...rest}
  >
    {#if placeholder && !hasFloatingLabel}
      <option value="" disabled selected>{placeholder}</option>
    {/if}
    {#each options as opt}
      <option value={opt.value}>{opt.label}</option>
    {/each}
  </select>
  <span class="s-select-arrow">
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M2.5 4.5L6 8L9.5 4.5"
        stroke="#64748b"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </span>
</div>
