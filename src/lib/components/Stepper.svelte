<script>
  import "./stepper-styles.css";
  import { defaults } from "../config.js";
  import { cn } from "../utils/cn.js";

  let {
    style: styleProp,
    theme: themeProp,
    steps = [],
    current = 0,
    class: className = "",
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);

  const styleClass = $derived(`s-stepper-${style}`);
  const themeClass = $derived(`theme-${theme}`);

  let el;
  let canLeft = $state(false);
  let canRight = $state(false);

  // Recompute arrow visibility from the scroll position.
  function update() {
    if (!el) return;
    canLeft = el.scrollLeft > 1;
    canRight = el.scrollLeft + el.clientWidth < el.scrollWidth - 1;
  }

  // Translate by one step's pitch (the offset between two adjacent steps,
  // i.e. one step + its trailing connector) — "1 width of the component".
  function scrollBy1(dir) {
    if (!el) return;
    const stepEls = el.querySelectorAll(".s-stepper-step");
    let amount = el.clientWidth;
    if (stepEls.length >= 2) {
      const pitch = stepEls[1].offsetLeft - stepEls[0].offsetLeft;
      if (pitch > 0) amount = pitch;
    }
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }

  // Track scroll + resize + content changes (steps/current) -> arrow state.
  $effect(() => {
    void steps;
    void current;
    if (!el) return;
    update();
    const onScroll = () => update();
    el.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(() => update());
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  });
</script>

<div class={cn("s-stepper-wrap", className)}>
  <div class="s-stepper {styleClass} {themeClass}" bind:this={el} {...rest}>
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
  {#if canLeft}
    <button
      type="button"
      class="s-stepper-arrow left"
      aria-label="Scroll steps backward"
      onclick={() => scrollBy1(-1)}>‹</button
    >
  {/if}
  {#if canRight}
    <button
      type="button"
      class="s-stepper-arrow right"
      aria-label="Scroll steps forward"
      onclick={() => scrollBy1(1)}>›</button
    >
  {/if}
</div>