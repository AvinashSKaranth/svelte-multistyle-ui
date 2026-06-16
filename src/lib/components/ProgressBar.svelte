<script>
  import "./progressbar-styles.css";

  let {
    style = "material",
    theme = "default",
    value = 0,
    size = "md",
    animated = false,
    label = false,
    ...rest
  } = $props();

  const styleClass = $derived(`s-progressbar-${style}`);
  const themeClass = $derived(`theme-${theme}`);
  const sizeClass = $derived(`progress-${size}`);
  const clampedValue = $derived(Math.min(100, Math.max(0, value)));
</script>

<div
  class="s-progressbar {styleClass} {themeClass} {sizeClass}"
  role="progressbar"
  aria-valuenow={clampedValue}
  aria-valuemin="0"
  aria-valuemax="100"
  {...rest}
>
  <div class="progress-track">
    <div
      class="progress-fill"
      class:animated
      style="width: {clampedValue}%"
    ></div>
  </div>
  {#if label}
    <span class="progress-label">{clampedValue}%</span>
  {/if}
</div>
