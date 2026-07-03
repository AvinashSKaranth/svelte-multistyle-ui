<script>
  import "./codeeditor-styles.css";
  import { defaults } from "../config.js";
  import { cn } from "../utils/cn.js";
  import Prism from "prismjs";
  // Core ships markup, css, clike, javascript. Register the rest of the curated set.
  import "prismjs/components/prism-typescript";
  import "prismjs/components/prism-json";
  import "prismjs/components/prism-bash";
  import "prismjs/components/prism-python";

  // prismjs does not ship a svelte component; alias it to markup (HTML-like)
  // so Svelte code still gets tag/attribute/string highlighting.
  if (!Prism.languages.svelte) {
    Prism.languages.svelte = Prism.languages.markup;
  }

  let {
    style: styleProp,
    theme: themeProp,
    value = $bindable(""),
    language = "javascript",
    editable = true,
    label = "",
    rows = 10,
    class: className = "",
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);
  const styleClass = $derived(`s-codeeditor-${style}`);
  const themeClass = $derived(`theme-${theme}`);

  const LANG_LABELS = {
    javascript: "JS",
    typescript: "TS",
    markup: "HTML",
    css: "CSS",
    json: "JSON",
    svelte: "Svelte",
    bash: "Bash",
    python: "Python",
  };

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function highlight(code, lang) {
    const grammar = Prism.languages[lang];
    if (!grammar) return escapeHtml(code);
    try {
      return Prism.highlight(code, grammar, lang);
    } catch {
      return escapeHtml(code);
    }
  }

  const highlighted = $derived(highlight(value, language));
  const langLabel = $derived(
    LANG_LABELS[language] ?? String(language).toUpperCase(),
  );

  let copyStatus = $state(""); // "" | "copied" | "failed"
  async function copyCode() {
    try {
      await navigator.clipboard.writeText(value);
      copyStatus = "copied";
    } catch {
      copyStatus = "failed";
    }
    setTimeout(() => (copyStatus = ""), 1800);
  }
  const copyLabel = $derived(
    copyStatus === "copied"
      ? "Copied!"
      : copyStatus === "failed"
        ? "Failed"
        : "Copy",
  );

  // Scroll sync: keep the highlighted <pre> (behind) aligned with the
  // transparent <textarea> (front) so the caret tracks the tokens.
  let preEl = $state(null);
  let taEl = $state(null);
  function syncScroll() {
    if (preEl && taEl) {
      preEl.scrollTop = taEl.scrollTop;
      preEl.scrollLeft = taEl.scrollLeft;
    }
  }
</script>

<div class={cn("s-codeeditor-wrapper", styleClass, themeClass, className)}>
  {#if label}
    <label class="s-codeeditor-label">{label}</label>
  {/if}
  <div class="s-codeeditor-toolbar">
    <span class="s-codeeditor-lang">{langLabel}</span>
    <button
      type="button"
      class={cn("s-codeeditor-copy-btn", copyStatus)}
      onclick={copyCode}
      aria-label="Copy code"
    >
      {copyLabel}
    </button>
  </div>
  <div class="s-codeeditor-code" style:--codeeditor-rows={rows}>
    <pre class="s-codeeditor-pre" bind:this={preEl} aria-hidden="true"><code
        >{@html highlighted}</code></pre>
    {#if editable}
      <textarea
        class="s-codeeditor-textarea"
        bind:value
        bind:this={taEl}
        onscroll={syncScroll}
        spellcheck="false"
        aria-label={label || "code editor"}
        {...rest}
      ></textarea>
    {/if}
  </div>
</div>