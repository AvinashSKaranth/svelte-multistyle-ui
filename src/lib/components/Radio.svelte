<script>
  import "./radio-styles.css";
  import { defaults } from "../config.js";
  import { cn } from "../utils/cn.js";

  let {
    style: styleProp,
    theme: themeProp,
    value,
    group = $bindable(""),
    label = "",
    disabled = false,
    class: className = "",
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);

  let isSelected = $derived(group === value);

  const styleClass = $derived(`s-radio-${style}`);
  const themeClass = $derived(`theme-${theme}`);
  const uid = Math.random().toString(36).slice(2, 9);
  const internalId = `radio-${uid}`;
</script>

<label
  class={cn("s-radio", styleClass, themeClass, className)}
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