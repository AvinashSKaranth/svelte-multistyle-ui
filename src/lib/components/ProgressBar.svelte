<script>
  import "./progressbar-styles.css";
  import { defaults } from "../config.js";

  let {
    style: styleProp,
    theme: themeProp,
    value = 0,
    size = "md",
    animated = false,
    label = false,
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);

  const styleClass = $derived(`s-progressbar-${style}`);
  const themeClass = $derived(`theme-${theme}`);
  const sizeClass = $derived(`progress-${size}`);

  // value < 0 → indeterminate (unknown progress). Otherwise clamp to [0,100].
  const isIndeterminate = $derived(value < 0);
  const clampedValue = $derived(Math.min(100, Math.max(0, value)));
  const popoverText = $derived(isIndeterminate ? "—" : `${clampedValue}%`);

  // Value popover shows on hover / focus / click. Opt-in via `label` so the bar
  // stays quiet by default and callers can enable the popover where useful.
  let hovered = $state(false);
  let focused = $state(false);
  let pinned = $state(false);
  const popoverOpen = $derived(label && (hovered || focused || pinned));

  function togglePin() {
    pinned = !pinned;
  }
  function onKeydown(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      pinned = !pinned;
    }
  }
</script>

<div
  class="s-progressbar {styleClass} {themeClass} {sizeClass}"
  role="progressbar"
  aria-valuenow={isIndeterminate ? undefined : clampedValue}
  aria-valuemin="0"
  aria-valuemax="100"
  aria-busy={isIndeterminate ? "true" : undefined}
  tabindex={label ? 0 : undefined}
  onmouseenter={() => (hovered = true)}
  onmouseleave={() => (hovered = false)}
  onfocus={() => (focused = true)}
  onblur={() => (focused = false)}
  onclick={togglePin}
  onkeydown={onKeydown}
  {...rest}
>
  <div class="progress-track">
    <div
      class="progress-fill"
      class:indeterminate={isIndeterminate}
      class:animated={animated && !isIndeterminate}
      style={isIndeterminate ? null : `width: ${clampedValue}%`}
    ></div>
  </div>
  {#if popoverOpen}
    <div class="progress-popover" role="tooltip">{popoverText}</div>
  {/if}
</div>