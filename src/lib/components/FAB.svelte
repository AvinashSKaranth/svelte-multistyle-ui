<script>
  import "./fab-styles.css";
  import { defaults } from "../config.js";

  let {
    style: styleProp,
    theme: themeProp,
    children,
    position = "bottom-right",
    onclick,
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);

  const styleClass = $derived(`s-fab-${style}`);
  const themeClass = $derived(`theme-${theme}`);
</script>

<button
  class="s-fab {styleClass} {themeClass} fab-{position}"
  {onclick}
  {...rest}
>
  {@render children?.()}
</button>