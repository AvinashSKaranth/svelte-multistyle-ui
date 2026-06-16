<script>
  import "./alert-styles.css";
  import { slide } from "svelte/transition";

  let {
    style = "material",
    theme = "default",
    variant = "info",
    title = "",
    children,
    dismissible = false,
    ...rest
  } = $props();

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
