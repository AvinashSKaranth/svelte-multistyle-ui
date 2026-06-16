<script>
  import "./datepicker-styles.css";

  let {
    style = "material",
    theme = "default",
    value = $bindable(""),
    label = "",
    disabled = false,
    ...rest
  } = $props();

  const styleClass = $derived(`s-datepicker-${style}`);
  const themeClass = $derived(`theme-${theme}`);
  const uid = Math.random().toString(36).slice(2, 9);
  const internalId = `datepicker-${uid}`;
</script>

<div
  class="s-datepicker-wrapper {styleClass} {themeClass}"
  class:disabled
  {...rest}
>
  {#if label}
    <label class="s-datepicker-label" for={internalId}>{label}</label>
  {/if}
  <input id={internalId} type="date" bind:value {disabled} />
</div>
