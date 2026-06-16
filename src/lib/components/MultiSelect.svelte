<script>
  import "./multiselect-styles.css";
  import { defaults } from "../config.js";

  let {
    style: styleProp,
    theme: themeProp,
    selected = $bindable([]),
    options = [],
    placeholder = "Select...",
    label = "",
    disabled = false,
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);

  let open = $state(false);
  let focused = $state(false);
  let hasValue = $derived(selected.length > 0);

  const styleClass = $derived(`s-mselect-${style}`);
  const themeClass = $derived(`theme-${theme}`);

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

  function handleBlur(e) {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      open = false;
      focused = false;
    }
  }
</script>

<div
  class="s-mselect-wrapper {styleClass} {themeClass}"
  class:disabled
  class:focused
  class:open
  class:has-value={hasValue}
  tabindex="-1"
  role="listbox"
  aria-label={label || placeholder}
  onfocusin={() => (focused = true)}
  onfocusout={handleBlur}
  {...rest}
>
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
    {:else}
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
    <div class="mselect-dropdown">
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