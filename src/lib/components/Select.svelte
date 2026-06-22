<script>
  import "./select-styles.css";
  import { portal } from "../actions/portal.js";
  import { defaults } from "../config.js";
  import { cn } from "../utils/cn.js";

  let {
    style: styleProp,
    theme: themeProp,
    value = $bindable(""),
    options = [],
    placeholder = "Select...",
    label = "",
    disabled = false,
    class: className = "",
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);

  let open = $state(false);
  let focused = $state(false);
  let wrapperEl;
  let dropdownEl;
  let hasValue = $derived(
    value !== "" && value !== null && value !== undefined,
  );
  let floated = $derived(focused || hasValue);

  const styleClass = $derived(`s-select-${style}`);
  const themeClass = $derived(`theme-${theme}`);

  const floatingStyles = [
    "material",
    "material3",
    "fluent",
    "carbon",
    "bootstrap",
  ];
  const hasFloatingLabel = $derived(
    floatingStyles.includes(style) && (label || placeholder),
  );
  const displayLabel = $derived(label || placeholder);

  function getLabel(val) {
    const opt = options.find((o) => o.value === val);
    return opt ? opt.label : val;
  }

  function selectOption(val) {
    value = val;
    open = false;
    focused = false;
  }

  function handleBlur() {
    setTimeout(() => {
      open = false;
      focused = false;
    }, 150);
  }

  function handleKeydown(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open = !open;
      focused = true;
    } else if (e.key === "Escape") {
      open = false;
      focused = false;
    }
  }

  function positionDropdown() {
    if (!wrapperEl || !dropdownEl) return;
    const rect = wrapperEl.getBoundingClientRect();
    const ddHeight = dropdownEl.offsetHeight || 200;
    let top = rect.bottom + 4;
    // Flip above the field if it would overflow the bottom of the viewport.
    if (top + ddHeight > window.innerHeight - 8 && rect.top - ddHeight - 4 > 8) {
      top = rect.top - ddHeight - 4;
    }
    dropdownEl.style.left = `${rect.left}px`;
    dropdownEl.style.top = `${top}px`;
    dropdownEl.style.width = `${rect.width}px`;
  }

  $effect(() => {
    if (open) {
      const handler = (e) => {
        if (
          wrapperEl && !wrapperEl.contains(e.target) &&
          !(dropdownEl && dropdownEl.contains(e.target))
        ) {
          open = false;
          focused = false;
        }
      };
      document.addEventListener("pointerdown", handler);
      const reposition = () => positionDropdown();
      window.addEventListener("scroll", reposition, true);
      window.addEventListener("resize", reposition);
      queueMicrotask(reposition);
      return () => {
        document.removeEventListener("pointerdown", handler);
        window.removeEventListener("scroll", reposition, true);
        window.removeEventListener("resize", reposition);
      };
    }
  });
</script>

<div
  bind:this={wrapperEl}
  class={cn("s-select-wrapper", styleClass, themeClass, className)}
  class:disabled
  class:focused
  class:has-value={hasValue}
  class:floated
  class:open
  tabindex="-1"
  role="listbox"
  aria-label={displayLabel}
  onfocusin={() => (focused = true)}
  onfocusout={handleBlur}
  {...rest}
>
  {#if hasFloatingLabel}
    <label class="s-select-floating-label"
      >{displayLabel}</label
    >
  {/if}
  <div
    class="s-select-control"
    role="button"
    tabindex="0"
    onclick={() => (open = !open)}
    onkeydown={handleKeydown}
  >
    {#if hasValue && !hasFloatingLabel}
      <span class="s-select-value">{getLabel(value)}</span>
    {:else if !hasFloatingLabel}
      <span class="s-select-placeholder">{placeholder}</span>
    {/if}
    {#if hasFloatingLabel && hasValue}
      <span class="s-select-value">{getLabel(value)}</span>
    {/if}
    <span class="s-select-arrow">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d="M2.5 4.5L6 8L9.5 4.5"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
  </div>
  {#if open}
    <div
      class="s-select-dropdown {styleClass} {themeClass}"
      bind:this={dropdownEl}
      use:portal
    >
      {#each options as opt}
        <div
          class="s-select-option"
          class:selected={value === opt.value}
          onclick={() => selectOption(opt.value)}
        >
          {opt.label}
        </div>
      {/each}
    </div>
  {/if}
</div>