<script>
  import "./slider-styles.css";
  import { defaults } from "../config.js";

  let {
    style: styleProp,
    theme: themeProp,
    value = $bindable(0),
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    label = "",
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);

  const styleClass = $derived(`s-slider-${style}`);
  const themeClass = $derived(`theme-${theme}`);
  const percent = $derived(((value - min) / (max - min)) * 100);
</script>

<div
  class="s-slider-wrapper {styleClass} {themeClass}"
  class:disabled
  {...rest}
>
  {#if label}
    <label class="s-slider-label" for={`slider-${Math.random().toString(36).slice(2, 9)}`}>{label}: {value}</label>
  {/if}
  <div class="s-slider-track-wrapper">
    <input
      id={`slider-${Math.random().toString(36).slice(2, 9)}`}
      type="range"
      class="s-slider"
      bind:value
      {min}
      {max}
      {step}
      {disabled}
      style="--percent: {percent}%"
    />
  </div>
</div>