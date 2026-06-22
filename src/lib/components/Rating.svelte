<script>
  import "./rating-styles.css";
  import { defaults } from "../config.js";
  import { cn } from "../utils/cn.js";

  let {
    style: styleProp,
    theme: themeProp,
    value = $bindable(0),
    max = 5,
    precision = "full",
    size = "md",
    readonly = false,
    showValue = false,
    class: className = "",
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);
  const styleClass = $derived(`s-rating-${style}`);
  const themeClass = $derived(`theme-${theme}`);
  const stars = $derived(Array.from({ length: max }, (_, i) => i + 1));

  let isHovering = $state(0);

  function getFillClass(star) {
    if (isHovering > 0) {
      if (star <= isHovering) return "star-filled";
      if (precision === "half" && isHovering < star && isHovering >= star - 0.5) return "star-half";
      return "star-empty";
    }
    if (star <= value) return "star-filled";
    if (precision === "half" && value < star && value >= star - 0.5) return "star-half";
    return "star-empty";
  }

  function updateValue(star, event) {
    if (readonly) return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (precision === "half") {
      const x = event.clientX - rect.left;
      const half = x < rect.width / 2;
      value = half ? star - 0.5 : star;
    } else {
      value = precision === "quarter"
        ? Math.round((star - (1 - (event.clientX - rect.left) / rect.width)) * 4) / 4
        : star;
    }
  }

  function handleHover(star, event) {
    if (readonly) return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (precision === "half") {
      const x = event.clientX - rect.left;
      isHovering = x < rect.width / 2 ? star - 0.5 : star;
    } else {
      isHovering = star;
    }
  }

  function leaveHover() {
    if (!readonly) isHovering = 0;
  }
</script>

<div
  class={cn("s-rating", styleClass, themeClass, `rating-${size}`, className)}
  role="radiogroup"
  aria-label="Rating"
  {...rest}
>
  {#each stars as star}
    <span
      class="s-rating-star {getFillClass(star)}"
      class:clickable={!readonly}
      onclick={(e) => updateValue(star, e)}
      onkeydown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); if (!readonly) value = star; } }}
      onmousemove={(e) => handleHover(star, e)}
      onmouseleave={leaveHover}
      role="radio"
      aria-checked={star <= value}
      tabindex={readonly ? -1 : 0}
    >
      {#if getFillClass(star) === "star-half"}
        <!-- Half star: filled left half + empty right half -->
        <svg width="100%" height="100%" viewBox="0 0 24 24" style="clip-path:inset(0 50% 0 0)" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        <svg width="100%" height="100%" viewBox="0 0 24 24" style="clip-path:inset(0 0 0 50%);position:absolute;top:0;left:0" fill="color-mix(in srgb, #eab308 30%, transparent 70%)">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      {:else}
        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      {/if}
    </span>
  {/each}
  {#if showValue}
    <span class="s-rating-value">{value.toFixed(precision === "full" ? 0 : 1)}</span>
  {/if}
</div>
