<script>
  import "./stepper-styles.css";

  let {
    style = "material",
    theme = "default",
    steps = [],
    current = 0,
    ...rest
  } = $props();

  const styleClass = $derived(`s-stepper-${style}`);
  const themeClass = $derived(`theme-${theme}`);
</script>

<div class="s-stepper {styleClass} {themeClass}" {...rest}>
  {#each steps as step, i}
    <div
      class="s-stepper-step"
      class:completed={i < current}
      class:active={i === current}
    >
      <div class="s-stepper-circle">{i + 1}</div>
      <span class="s-stepper-label">{step.label}</span>
    </div>
    {#if i < steps.length - 1}
      <div class="s-stepper-connector" class:completed={i < current - 1}></div>
    {/if}
  {/each}
</div>
