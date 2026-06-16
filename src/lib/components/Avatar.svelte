<script>
  import "./avatar-styles.css";

  let {
    style = "material",
    theme = "default",
    src = "",
    alt = "",
    size = "md",
    fallback = "",
    ...rest
  } = $props();

  const styleClass = $derived(`s-avatar-${style}`);
  const themeClass = $derived(`theme-${theme}`);
  const sizeClass = $derived(`avatar-${size}`);

  let imgError = $state(false);
</script>

<div class="s-avatar {styleClass} {themeClass} {sizeClass}" {...rest}>
  {#if src && !imgError}
    <img {src} {alt} onerror={() => (imgError = true)} />
  {:else}
    <span class="avatar-fallback">{fallback}</span>
  {/if}
</div>
