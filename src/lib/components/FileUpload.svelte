<script>
  import "./fileupload-styles.css";

  let {
    style = "material",
    theme = "default",
    accept = "",
    multiple = false,
    disabled = false,
    label = "Drop files or click to upload",
    ...rest
  } = $props();

  const styleClass = $derived(`s-fileupload-${style}`);
  const themeClass = $derived(`theme-${theme}`);

  let files = $state([]);
  let dragging = $state(false);

  function handleChange(e) {
    files = Array.from(e.target.files);
  }

  function handleDrop(e) {
    e.preventDefault();
    dragging = false;
    files = Array.from(e.dataTransfer.files);
  }
</script>

<div
  class="s-fileupload {styleClass} {themeClass}"
  class:dragging
  class:disabled
  ondragover={(e) => {
    e.preventDefault();
    dragging = true;
  }}
  ondragleave={() => (dragging = false)}
  ondrop={handleDrop}
  {...rest}
>
  <input
    type="file"
    {accept}
    {multiple}
    {disabled}
    onchange={handleChange}
    class="s-fileupload-input"
  />
  <div class="s-fileupload-content">
    <svg
      class="s-fileupload-icon"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#64748b"
      stroke-width="2"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline
        points="17 8 12 3 7 8"
      /><line x1="12" y1="3" x2="12" y2="15" />
    </svg>
    <span class="s-fileupload-label">{label}</span>
    {#if files.length}
      <span class="s-fileupload-hint"
        >{files.length} file{files.length > 1 ? "s" : ""} selected</span
      >
    {/if}
  </div>
</div>
