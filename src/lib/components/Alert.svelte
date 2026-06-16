<script>
  import "./alert-styles.css";
  import { defaults } from "../config.js";
  import { slide } from "svelte/transition";

  let {
    style: styleProp,
    theme: themeProp,
    variant = "info",
    title = "",
    children,
    dismissible = false,
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);

  const styleClass = $derived(`s-alert-${style}`);
  const themeClass = $derived(`theme-${theme}`);

  let visible = $state(true);
</script>

{#if visible}
  <div
    class="s-alert {styleClass} {themeClass} alert-{variant}"
    role="alert"
    transition:slide={{ duration: 200 }}
    {...rest}
  >
    <div class="alert-content">
      {#if title}<strong class="alert-title">{title}</strong>{/if}
      <div class="alert-body">{@render children?.()}</div>
    </div>
    {#if dismissible}
      <button
        class="alert-dismiss"
        onclick={() => (visible = false)}
        aria-label="Dismiss">&times;</button
      >
    {/if}
  </div>
{/if}