<script>
  import "./fab-styles.css";
  import { defaults } from "../config.js";

  let {
    style: styleProp,
    theme: themeProp,
    preset = "primary",
    children,
    position = "bottom-right",
    onclick,
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);

  const styleClass = $derived(`s-fab-${style}`);
  const themeClass = $derived(`theme-${theme}`);
  const presetClass = $derived(`fab-${preset}`);
</script>

<button
  class="s-fab {styleClass} {themeClass} {presetClass} fab-{position}"
  {onclick}
  {...rest}
>
  {@render children?.()}
</button>