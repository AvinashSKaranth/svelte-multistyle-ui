<script>
  import "./tabs-styles.css";

  let {
    style = "material",
    theme = "default",
    tabs = [],
    active = $bindable(""),
    ...rest
  } = $props();

  const styleClass = $derived(`s-tabs-${style}`);
  const themeClass = $derived(`theme-${theme}`);
</script>

<div class="s-tabs {styleClass} {themeClass}" role="tablist" {...rest}>
  {#each tabs as tab}
    <button
      class="s-tab"
      class:active={active === tab.id}
      role="tab"
      aria-selected={active === tab.id}
      onclick={() => (active = tab.id)}
    >
      {tab.label}
    </button>
  {/each}
</div>
