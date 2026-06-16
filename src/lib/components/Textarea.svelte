<script>
  import "./textarea-styles.css";
  import { defaults } from "../config.js";

  let {
    style: styleProp,
    theme: themeProp,
    value = $bindable(""),
    placeholder = "",
    label = "",
    rows = 4,
    maxlength = undefined,
    disabled = false,
    readonly = false,
    required = false,
    autoresize = false,
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);

  let focused = $state(false);
  let hasValue = $derived(
    value !== "" && value !== null && value !== undefined,
  );
  let floated = $derived(focused || hasValue);
  let charCount = $derived(value ? value.length : 0);

  const styleClass = $derived(`s-textarea-${style}`);
  const themeClass = $derived(`theme-${theme}`);
  const uid = Math.random().toString(36).slice(2, 9);
  const internalId = `textarea-${uid}`;

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

  function handleInput(e) {
    value = e.target.value;
    if (autoresize) {
      e.target.style.height = "auto";
      e.target.style.height = e.target.scrollHeight + "px";
    }
  }
</script>

<div
  class="s-textarea-wrapper {styleClass} {themeClass}"
  class:disabled
  class:focused
  class:has-value={hasValue}
  class:floated
>
  {#if hasFloatingLabel}
    <label class="s-textarea-floating-label" for={internalId}
      >{displayLabel}</label
    >
  {/if}
  <textarea
    bind:value
    placeholder={hasFloatingLabel ? "" : placeholder}
    {disabled}
    {readonly}
    {required}
    {rows}
    {maxlength}
    id={internalId}
    oninput={handleInput}
    onfocus={() => (focused = true)}
    onblur={() => (focused = false)}
    {...rest}
  ></textarea>
  {#if maxlength}
    <span class="s-textarea-counter">{charCount}/{maxlength}</span>
  {/if}
</div>