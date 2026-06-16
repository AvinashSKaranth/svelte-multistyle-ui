<script>
  import "./datepicker-styles.css";
  import { defaults } from "../config.js";

  let {
    style: styleProp,
    theme: themeProp,
    value = $bindable(""),
    label = "",
    disabled = false,
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);

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