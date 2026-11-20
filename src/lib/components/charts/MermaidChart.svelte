<script module>
  let renderQueue = Promise.resolve();

  function renderDiagram(id, source, theme, signal) {
    const request = renderQueue.then(async () => {
      if (signal.aborted) return;
      const { default: mermaid } = await import("mermaid");
      if (signal.aborted) return;

      const previousConfig = mermaid.mermaidAPI.getSiteConfig();
      mermaid.initialize({
        theme,
        startOnLoad: false,
        securityLevel: "strict",
        suppressErrorRendering: true,
        secure: [...(mermaid.mermaidAPI.defaultConfig.secure ?? []), "dompurifyConfig"],
      });
      try {
        const { svg } = await mermaid.render(id, source);
        return svg;
      } finally {
        mermaid.initialize(previousConfig);
      }
    });
    // Mermaid shares its site configuration across renders.
    renderQueue = request.then(() => {}, () => {});
    return request;
  }
</script>

<script>
  import { defaults } from "../../config.js";
  import { cn } from "../../utils/cn.js";
  import "./chart-styles.css";
  import "./mermaid-chart-styles.css";

  /** @type {{
   *   source?: string,
   *   title?: string,
   *   diagramTheme?: import("mermaid").MermaidConfig["theme"],
   *   style?: string,
   *   theme?: string,
   *   class?: string
   * }} */
  let { source = "", title = "", diagramTheme, style: styleProp, theme: themeProp, class: className = "" } = $props();

  const instanceId = $props.id();
  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);
  const dark = $derived(defaults.mode === "dark" || (defaults.mode === "system" && defaults.systemDark));
  let svg = $state("");
  let error = $state("");
  let loading = $state(false);

  $effect(() => {
    const text = source.trim();
    const diagramStyle = diagramTheme ?? (dark ? "dark" : "default");
    svg = "";
    error = "";
    loading = !!text;
    if (!text) return;

    const controller = new AbortController();
    const { signal } = controller;
    renderDiagram(`mermaid-diagram-${instanceId}`, text, diagramStyle, signal).then(
      (result) => {
        if (signal.aborted) return;
        svg = result ?? "";
        loading = false;
      },
      (reason) => {
        if (signal.aborted) return;
        error = reason?.message ?? "Unable to render the diagram.";
        loading = false;
      },
    );
    return () => controller.abort();
  });
</script>

<figure
  class={cn("s-chart", `s-chart-${style}`, "s-mermaid-chart", `s-mermaid-chart-${style}`, `theme-${theme}`, className)}
  aria-label={title || "Mermaid diagram"}
  aria-busy={loading}
>
  {#if title}<figcaption>{title}</figcaption>{/if}
  {#if error}
    <p class="s-mermaid-chart-error" role="alert">{error}</p>
  {:else if loading}
    <p role="status">Rendering diagram…</p>
  {:else if svg}
    <div class="s-mermaid-chart-diagram">{@html svg}</div>
  {:else}
    <p>No diagram source.</p>
  {/if}
</figure>
