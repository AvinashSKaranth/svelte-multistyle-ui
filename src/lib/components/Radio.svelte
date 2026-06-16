<script>
  import "./radio-styles.css";

  let {
    style = "material",
    theme = "default",
    value,
    group = $bindable(""),
    label = "",
    disabled = false,
    ...rest
  } = $props();

  let isSelected = $derived(group === value);

  const styleClass = $derived(`s-radio-${style}`);
  const themeClass = $derived(`theme-${theme}`);
  const uid = Math.random().toString(36).slice(2, 9);
  const internalId = `radio-${uid}`;
</script>

<label
  class="s-radio {styleClass} {themeClass}"
  class:disabled
  class:selected={isSelected}
  for={internalId}
>
  <input type="radio" {value} bind:group {disabled} id={internalId} {...rest} />
  <span class="s-radio-circle">
    <span class="s-radio-dot"></span>
  </span>
  {#if label}
    <span class="s-radio-label">{label}</span>
  {/if}
</label>
