<script>
  import "./texteditor-styles.css";
  import { defaults } from "../config.js";
  import { cn } from "../utils/cn.js";
  import { onMount, onDestroy } from "svelte";
  import { TextEditorCore } from "./text-editor-core/index.js";
  import { Modal, Button, Input, Textarea } from "../index.js";

  let {
    style: styleProp,
    theme: themeProp,
    value = $bindable(""),
    label = "",
    placeholder = "",
    disabled = false,
    rows = 8,
    toolbar,
    class: className = "",
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);

  const styleClass = $derived(`s-texteditor-${style}`);
  const themeClass = $derived(`theme-${theme}`);

  let wrapper = $state(null);
  let core = $state(null);
  let previousDisabled = $state(disabled);

  let dialog = $state({ open: false, type: null, data: null });
  let imageFileInput = $state(null);

  onMount(() => {
    core = new TextEditorCore({
      element: wrapper,
      placeholder,
      readOnly: disabled,
      toolbar,
      onChange: (html) => {
        value = html;
      },
      onAction: (action) => {
        if (action.type === "dialog") {
          dialog = { open: true, type: action.dialog, data: { ...action.data } };
        }
      },
    });

    core.setHTML(value ?? "");
  });

  $effect(() => {
    if (!core) return;
    // Don't overwrite code-view textarea from external value changes.
    if (core.isCodeView()) return;

    const html = value ?? "";
    if (core.getHTML() !== html) {
      core.setHTML(html);
    }
  });

  $effect(() => {
    if (!core) return;
    if (disabled !== previousDisabled) {
      core.setReadOnly(disabled);
      previousDisabled = disabled;
    }
  });

  onDestroy(() => {
    core?.destroy();
  });

  function applyLink() {
    const { text, href, title, target } = dialog.data;
    core?.insertLink({ text, href, title, target });
    dialog = { open: false, type: null, data: null };
  }

  function applyImage() {
    const { src, alt, width, align, caption } = dialog.data;
    core?.insertImage({ src, alt, width, align, caption });
    dialog = { open: false, type: null, data: null };
  }

  function applyVideo() {
    const { src, width, height } = dialog.data;
    core?.insertVideo({ src, width, height });
    dialog = { open: false, type: null, data: null };
  }

  function applyTable() {
    const { rows, cols } = dialog.data;
    core?.insertTable({ rows, cols });
    dialog = { open: false, type: null, data: null };
  }

  function onImageFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      dialog.data = { ...dialog.data, src: ev.target.result };
    };
    reader.readAsDataURL(file);
  }
</script>

<div
  class={cn("s-texteditor-wrapper", styleClass, themeClass, className)}
  {...rest}
>
  {#if label}
    <label class="s-texteditor-label">{label}</label>
  {/if}
  <div
    bind:this={wrapper}
    class="s-texteditor-root"
    data-placeholder={placeholder}
    style:--texteditor-rows={rows}
    aria-disabled={disabled}
  ></div>
</div>

{#if dialog.open}
  {#if dialog.type === "link"}
    <Modal bind:open={dialog.open} title="Insert link" size="small">
      <div class="s-texteditor-dialog">
        <Input label="Text" bind:value={dialog.data.text} />
        <Input label="URL" bind:value={dialog.data.href} />
        <Input label="Title" bind:value={dialog.data.title} />
        <Input label="Target" bind:value={dialog.data.target} />
        <div class="s-texteditor-dialog-actions">
          <Button onclick={applyLink}>Apply</Button>
          <Button variant="outlined" onclick={() => (dialog.open = false)}>Cancel</Button>
        </div>
      </div>
    </Modal>
  {:else if dialog.type === "image"}
    <Modal bind:open={dialog.open} title="Insert image" size="small">
      <div class="s-texteditor-dialog">
        <Input label="Image URL" bind:value={dialog.data.src} />
        <div class="s-texteditor-dialog-row">
          <input
            bind:this={imageFileInput}
            type="file"
            accept="image/*"
            onchange={onImageFileChange}
          />
        </div>
        <Input label="Alt text" bind:value={dialog.data.alt} />
        <Input label="Width (e.g. 200px)" bind:value={dialog.data.width} />
        <Input label="Caption" bind:value={dialog.data.caption} />
        <div class="s-texteditor-dialog-actions">
          <Button onclick={applyImage}>Insert</Button>
          <Button variant="outlined" onclick={() => (dialog.open = false)}>Cancel</Button>
        </div>
      </div>
    </Modal>
  {:else if dialog.type === "video"}
    <Modal bind:open={dialog.open} title="Insert video" size="small">
      <div class="s-texteditor-dialog">
        <Textarea label="YouTube, Vimeo, or direct URL" rows={3} bind:value={dialog.data.src} />
        <Input label="Width" bind:value={dialog.data.width} />
        <Input label="Height" bind:value={dialog.data.height} />
        <div class="s-texteditor-dialog-actions">
          <Button onclick={applyVideo}>Insert</Button>
          <Button variant="outlined" onclick={() => (dialog.open = false)}>Cancel</Button>
        </div>
      </div>
    </Modal>
  {:else if dialog.type === "table"}
    <Modal bind:open={dialog.open} title="Insert table" size="small">
      <div class="s-texteditor-dialog">
        <Input label="Rows" type="number" bind:value={dialog.data.rows} />
        <Input label="Columns" type="number" bind:value={dialog.data.cols} />
        <div class="s-texteditor-dialog-actions">
          <Button onclick={applyTable}>Insert</Button>
          <Button variant="outlined" onclick={() => (dialog.open = false)}>Cancel</Button>
        </div>
      </div>
    </Modal>
  {/if}
{/if}
