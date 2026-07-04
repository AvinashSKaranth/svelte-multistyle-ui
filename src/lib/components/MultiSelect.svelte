<script>
  import "./multiselect-styles.css";
  import { portal } from "../actions/portal.js";
  import { defaults } from "../config.js";
  import { cn } from "../utils/cn.js";

  let {
    style: styleProp,
    theme: themeProp,
    selected = $bindable([]),
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
  let hasValue = $derived(selected.length > 0);
  let floated = $derived(focused || hasValue);

  const styleClass = $derived(`s-mselect-${style}`);
  const themeClass = $derived(`theme-${theme}`);

  // Floating label (animates inside the field) — Material / Material 3 only.
  // Every other style renders a static label above the field.
  const floatingLabelStyles = ["material", "material3"];
  const useFloatingLabel = $derived(
    floatingLabelStyles.includes(style) && (label || placeholder),
  );
  const useAboveLabel = $derived(
    !floatingLabelStyles.includes(style) && (label || placeholder),
  );
  const displayLabel = $derived(label || placeholder);
  const showInFieldPlaceholder = $derived(
    !(useFloatingLabel || (useAboveLabel && !label)),
  );

  function toggle(val) {
    if (selected.includes(val)) {
      selected = selected.filter((v) => v !== val);
    } else {
      selected = [...selected, val];
    }
  }

  function removeChip(val) {
    selected = selected.filter((v) => v !== val);
  }

  function getLabel(val) {
    const opt = options.find((o) => o.value === val);
    return opt ? opt.label : val;
  }

  function positionDropdown() {
    if (!wrapperEl || !dropdownEl) return;
    const rect = wrapperEl.getBoundingClientRect();
    const ddHeight = dropdownEl.offsetHeight || 200;
    let top = rect.bottom + 4;
    if (top + ddHeight > window.innerHeight - 8 && rect.top - ddHeight - 4 > 8) {
      top = rect.top - ddHeight - 4;
    }
    dropdownEl.style.left = `${rect.left}px`;
    dropdownEl.style.top = `${top}px`;
    dropdownEl.style.width = `${rect.width}px`;
  }

  function handleBlur(e) {
    const related = e.relatedTarget;
    // Clicking a non-focusable element (e.g. the option label text) leaves
    // relatedTarget null. Don't close here — the document mousedown handler
    // below handles outside clicks. Closing now would unmount the checkbox
    // before the label-forwarded click toggles it, so the option wouldn't
    // select when its text is clicked.
    if (related === null) return;
    if (
      wrapperEl && !wrapperEl.contains(related) &&
      !(dropdownEl && dropdownEl.contains(related))
    ) {
      open = false;
      focused = false;
    }
  }

  $effect(() => {
    if (!open) return;
    const reposition = () => positionDropdown();
    const onDocMouseDown = (e) => {
      if (
        wrapperEl && !wrapperEl.contains(e.target) &&
        !(dropdownEl && dropdownEl.contains(e.target))
      ) {
        open = false;
        focused = false;
      }
    };
    window.addEventListener("scroll", reposition, true);
    window.addEventListener("resize", reposition);
    document.addEventListener("mousedown", onDocMouseDown);
    queueMicrotask(reposition);
    return () => {
      window.removeEventListener("scroll", reposition, true);
      window.removeEventListener("resize", reposition);
      document.removeEventListener("mousedown", onDocMouseDown);
    };
  });
</script>

<div
  bind:this={wrapperEl}
  class={cn("s-mselect-wrapper", styleClass, themeClass, className)}
  class:disabled
  class:focused
  class:open
  class:has-value={hasValue}
  class:floated
  class:above-label={useAboveLabel}
  tabindex="-1"
  role="listbox"
  aria-label={displayLabel}
  onfocusin={() => (focused = true)}
  onfocusout={handleBlur}
  {...rest}
>
  {#if useAboveLabel}
    <label class="s-mselect-label-above">{displayLabel}</label>
  {/if}
  {#if useFloatingLabel}
    <label class="s-mselect-floating-label">{displayLabel}</label>
  {/if}
  <div
    class="mselect-control"
    role="button"
    tabindex="0"
    onclick={() => (open = !open)}
    onkeydown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open = !open;
      }
    }}
  >
    {#if hasValue}
      <div class="mselect-chips">
        {#each selected as val}
          <span class="mselect-chip">
            {getLabel(val)}
            <button
              type="button"
              class="s-mselect-chip-remove"
              onclick={(e) => {
                e.stopPropagation();
                removeChip(val);
              }}
              aria-label="Remove {getLabel(val)}">&times;</button
            >
          </span>
        {/each}
      </div>
    {:else if showInFieldPlaceholder}
      <span class="mselect-placeholder">{placeholder}</span>
    {/if}
    <span class="mselect-arrow">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d="M2.5 4.5L6 8L9.5 4.5"
          stroke="#64748b"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
  </div>
  {#if open}
    <div
      class="mselect-dropdown {styleClass} {themeClass}"
      bind:this={dropdownEl}
      use:portal
    >
      {#each options as opt}
        <label
          class="mselect-option"
          class:selected={selected.includes(opt.value)}
        >
          <input
            type="checkbox"
            checked={selected.includes(opt.value)}
            onchange={() => toggle(opt.value)}
          />
          <span class="mselect-option-label">{opt.label}</span>
        </label>
      {/each}
    </div>
  {/if}
</div>