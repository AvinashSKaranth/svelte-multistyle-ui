<script>
  import "./tabs-styles.css";
  import { defaults } from "../config.js";
  import { cn } from "../utils/cn.js";

  let {
    style: styleProp,
    theme: themeProp,
    tabs = [],
    active = $bindable(""),
    class: className = "",
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);

  const styleClass = $derived(`s-tabs-${style}`);
  const themeClass = $derived(`theme-${theme}`);
</script>

<div class={cn("s-tabs", styleClass, themeClass, className)} role="tablist" {...rest}>
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