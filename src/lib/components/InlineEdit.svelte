<script>
  import { tick } from "svelte";
  import { defaults } from "../config.js";
  import { cn } from "../utils/cn.js";
  import "./input-styles.css";
  import "./textarea-styles.css";
  import "./inline-edit-styles.css";
  import "./liquid-glass-field.css";

  /** @type {{
   *   variant?: "single-line" | "multiline",
   *   value?: string,
   *   "aria-label"?: string,
   *   rows?: number,
   *   disabled?: boolean,
   *   maxlength?: number,
   *   onUpdate?: (value: string, previousValue: string) => void,
   *   style?: string,
   *   theme?: string,
   *   class?: string
   * }} */
  let {
    variant = "single-line",
    value = $bindable(""),
    "aria-label": accessibleName = "text",
    rows = 3,
    disabled = false,
    maxlength,
    onUpdate,
    style: styleProp,
    theme: themeProp,
    class: className = "",
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);
  const multiline = $derived(variant === "multiline");
  const form = $derived(multiline ? "s-textarea" : "s-input");
  const formClasses = $derived(style === "liquid-glass" ? "" : `${form}-wrapper ${form}-${style} focused`);
  let session = $state(null);
  const editing = $derived(!!session && !disabled);
  let trigger = $state();
  let editor = $state();

  $effect(() => {
    if (disabled) session = null;
  });

  async function begin() {
    if (disabled || session) return;
    session = { initial: value, draft: value };
    await tick();
    const field = editor;
    if (!field) return;
    field.focus({ preventScroll: true });
    if (multiline) field.setSelectionRange(field.value.length, field.value.length);
    else field.select();
  }

  async function restoreFocus() {
    await tick();
    if (!session) trigger?.focus({ preventScroll: true });
  }

  function commit() {
    if (!session) return;
    const { initial, draft } = session;
    const previousValue = value;
    session = null;
    if (!disabled && draft !== initial && draft !== previousValue) {
      value = draft;
      onUpdate?.(draft, previousValue);
    }
  }

  function activate(event) {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    begin();
  }

  function handleKey(event) {
    if (event.isComposing || event.keyCode === 229) return;
    const leave = event.key === "Enter" && (!multiline || event.ctrlKey || event.metaKey);
    if (event.key !== "Escape" && !leave) return;
    event.preventDefault();
    event.stopPropagation();
    if (leave) event.currentTarget.blur();
    else session = null;
    restoreFocus();
  }
</script>

<div
  class={cn("s-inline-edit", `s-inline-edit-${style}`, `theme-${theme}`, className)}
  class:multiline
  style:--inline-edit-rows={Math.max(1, rows)}
>
  <div class={cn("s-inline-edit-field", formClasses)} class:editing>
    <p class="s-inline-edit-value" aria-hidden={editing ? "true" : undefined}>
      {#if editing || disabled}
        <span class="s-inline-edit-text">{session && !disabled ? session.draft : value}</span>
      {:else}
        <span
          class="s-inline-edit-text s-inline-edit-trigger"
          class:empty={!value}
          bind:this={trigger}
          role="button"
          tabindex="0"
          aria-label={value ? `Edit ${accessibleName}: ${value}` : `Edit ${accessibleName}`}
          onclick={begin}
          onkeydown={activate}
        >{value}</span>
      {/if}
    </p>
    {#if session && !disabled}
      {#if multiline}
        <textarea
          class="s-inline-edit-control"
          bind:this={editor}
          bind:value={session.draft}
          {rows}
          {maxlength}
          aria-label={accessibleName}
          onblur={commit}
          onkeydown={handleKey}
        ></textarea>
      {:else}
        <input
          type="text"
          class="s-inline-edit-control"
          bind:this={editor}
          bind:value={session.draft}
          {maxlength}
          aria-label={accessibleName}
          onblur={commit}
          onkeydown={handleKey}
        />
      {/if}
    {/if}
  </div>
</div>
