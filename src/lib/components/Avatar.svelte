<script>
  import "./avatar-styles.css";
  import { defaults } from "../config.js";

  let {
    style: styleProp,
    theme: themeProp,
    src = "",
    alt = "",
    size = "md",
    fallback = "",
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);

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