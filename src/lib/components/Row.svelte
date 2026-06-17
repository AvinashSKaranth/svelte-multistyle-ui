<script>
  import "./row-styles.css";

  let {
    gap = "8px",
    align = "stretch",
    justify = "start",
    fill = false,
    wrap = false,
    class: className = "",
    children,
    ...rest
  } = $props();

  // align = cross-axis (align-items), justify = main-axis (justify-content)
  const alignItems = {
    start: "flex-start",
    center: "center",
    end: "flex-end",
    stretch: "stretch",
    baseline: "baseline",
  };
  const justifyContent = {
    start: "flex-start",
    center: "center",
    end: "flex-end",
    between: "space-between",
    around: "space-around",
    evenly: "space-evenly",
  };

  const styleStr = $derived(
    `display:flex;flex-direction:row;gap:${gap};align-items:${alignItems[align] ?? align};justify-content:${justifyContent[justify] ?? justify};${fill ? "width:100%;" : ""}${wrap ? "flex-wrap:wrap;" : ""}`
  );
</script>

<div class="s-row {className}" style={styleStr} {...rest}>
  {@render children?.()}
</div>