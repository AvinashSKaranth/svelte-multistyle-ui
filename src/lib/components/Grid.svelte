<script>
  import "./grid-styles.css";

  let {
    columns = 1,
    gap = "8px",
    rows = undefined,
    fill = false,
    align = "stretch",
    justify = "start",
    minColumnWidth = undefined,
    class: className = "",
    children,
    ...rest
  } = $props();

  // columns: number → repeat(n, 1fr); "auto"/"auto-fill" + minColumnWidth →
  // responsive auto-fill grid; any other string used verbatim.
  const alignItems = {
    start: "flex-start",
    center: "center",
    end: "flex-end",
    stretch: "stretch",
    baseline: "baseline",
  };
  const justifyItems = {
    start: "start",
    center: "center",
    end: "end",
    stretch: "stretch",
    between: "space-between",
    around: "space-around",
    evenly: "space-evenly",
  };

  const templateColumns = $derived(
    minColumnWidth && (columns === "auto" || columns === "auto-fill")
      ? `repeat(auto-fill, minmax(${minColumnWidth}, 1fr))`
      : typeof columns === "number"
        ? `repeat(${columns}, 1fr)`
        : columns
  );

  const styleStr = $derived(
    `display:grid;grid-template-columns:${templateColumns};${rows ? `grid-template-rows:${rows};` : ""}gap:${gap};align-items:${alignItems[align] ?? align};justify-items:${justifyItems[justify] ?? justify};${fill ? "width:100%;" : ""}`
  );
</script>

<div class="s-grid {className}" style={styleStr} {...rest}>
  {@render children?.()}
</div>