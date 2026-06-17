<script>
  import "./column-styles.css";

  let {
    gap = "8px",
    align = "stretch",
    justify = "start",
    fill = false,
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
    `display:flex;flex-direction:column;gap:${gap};align-items:${alignItems[align] ?? align};justify-content:${justifyContent[justify] ?? justify};${fill ? "width:100%;" : ""}`
  );
</script>

<div class="s-column {className}" style={styleStr} {...rest}>
  {@render children?.()}
</div>