<script>
  import "./fab-styles.css";
  import { defaults } from "../config.js";
  import { cn } from "../utils/cn.js";

  let {
    style: styleProp,
    theme: themeProp,
    preset = "primary",
    children,
    position = "bottom-right",
    onclick,
    class: className = "",
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);

  const styleClass = $derived(`s-fab-${style}`);
  const themeClass = $derived(`theme-${theme}`);
  const presetClass = $derived(`fab-${preset}`);
</script>

<button
  class={cn("s-fab", styleClass, themeClass, presetClass, `fab-${position}`, className)}
  {onclick}
  {...rest}
>
  {@render children?.()}
</button>