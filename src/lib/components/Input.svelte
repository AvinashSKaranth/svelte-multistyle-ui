<script>
  import "./input-styles.css";
  import "./liquid-glass-field.css";
  import { defaults, iconClass } from "../config.js";
  import { cn } from "../utils/cn.js";

  let {
    style: styleProp,
    theme: themeProp,
    type = "text",
    value = $bindable(""),
    placeholder = "",
    label = "",
    disabled = false,
    iconStart = undefined,
    iconEnd = undefined,
    readonly = false,
    required = false,
    name = "",
    id = "",
    min = undefined,
    max = undefined,
    minlength = undefined,
    maxlength = undefined,
    step = undefined,
    pattern = undefined,
    autocomplete = undefined,
    autofocus = false,
    multiple = false,
    accept = undefined,
    list = undefined,
    size = undefined,
    tabindex = undefined,
    title = undefined,
    form = undefined,
    inputmode = undefined,
    spellcheck = undefined,
    class: className = "",
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);

  let focused = $state(false);
  let hasValue = $derived(
    value !== "" && value !== null && value !== undefined,
  );
  let floated = $derived(focused || hasValue);

  const hasIconStart = $derived(!!iconStart);
  const hasIconEnd = $derived(!!iconEnd);

  const styleClass = $derived(`s-input-${style}`);
  const themeClass = $derived(`theme-${theme}`);
  const uid = Math.random().toString(36).slice(2, 9);
  const internalId = $derived(id || `input-${uid}`);

  // Floating label (animates inside the field) — Material / Material 3 only.
  // Every other style renders a static label above the field.
  const floatingLabelStyles = ["material", "material3"];
  const useFloatingLabel = $derived(
    floatingLabelStyles.includes(style) && (label || placeholder),
  );
  const useAboveLabel = $derived(
    !floatingLabelStyles.includes(style) && (label || placeholder),
  );
  const displayLabel = $derived(label || placeholder);
</script>

<div
  class={cn("s-input-wrapper", styleClass, themeClass, className)}
  class:disabled
  class:focused
  class:has-value={hasValue}
  class:floated
  class:has-icon-start={hasIconStart}
  class:has-icon-end={hasIconEnd}
  class:above-label={useAboveLabel}
>
  {#if useAboveLabel}
    <label class="s-input-label-above" for={internalId}>{displayLabel}</label>
  {/if}
  {#if useFloatingLabel}
    <label class="s-input-floating-label" for={internalId}>{displayLabel}</label
    >
  {/if}
  <div class="s-input-field">
    {#if iconStart}
      <span class="s-input-icon s-input-icon-start {iconClass}">{iconStart}</span>
    {/if}
    <input
      {type}
      bind:value
      placeholder={useFloatingLabel || (useAboveLabel && !label)
        ? ""
        : placeholder}
      {disabled}
      {readonly}
      {required}
      {name}
      id={internalId}
      {min}
      {max}
      {minlength}
      {maxlength}
      {step}
      {pattern}
      {autocomplete}
      {autofocus}
      {multiple}
      {accept}
      {list}
      {size}
      {tabindex}
      {title}
      {form}
      {inputmode}
      {spellcheck}
      onfocus={() => (focused = true)}
      onblur={() => (focused = false)}
      {...rest}
    />
    {#if iconEnd}
      <span class="s-input-icon s-input-icon-end {iconClass}">{iconEnd}</span>
    {/if}
  </div>
</div>
