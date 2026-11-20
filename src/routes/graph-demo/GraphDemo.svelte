<script>
  import { onMount, untrack } from "svelte";
  import Button from "$lib/components/Button.svelte";
  import GraphEditor from "$lib/components/GraphEditor.svelte";
  import { createGraph, orientFlowGraph, parseGraph, runGraph } from "$lib/graph/index.js";
  import { createBlueprintExample, createFlowchartExample } from "./examples.js";

  /** @type {{mode: "blueprint" | "flowchart", style: string, theme: string}} */
  let { mode, style, theme } = $props();

  const modes = {
    blueprint: {
      title: "Blueprint",
      description: "Connect typed nodes, open subgraphs, and run the result.",
      exampleLabel: "Load example",
      example: createBlueprintExample,
      emptyTitle: "Untitled blueprint",
    },
    flowchart: {
      title: "Conversation flowchart",
      description: "Drag messages and questions onto the canvas. Connect the Yes and No ports to branch the conversation.",
      exampleLabel: "Load conversation example",
      example: createFlowchartExample,
      emptyTitle: "Untitled flowchart",
    },
  };
  const config = $derived(modes[mode]);
  const legacyStorageKey = "multistyle-graph-v1";
  const storageKey = $derived(`${legacyStorageKey}-${mode}`);
  let active = $state.raw(untrack(() => config.example()));
  let editor = $state();
  let picker = $state();
  let importAction = "open";
  let ready = $state(false);
  let notice = $state("");
  let error = $state("");
  let lastRun = $state.raw();
  const result = $derived(lastRun?.graph === active ? lastRun : undefined);

  onMount(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved !== null) {
        active = parseGraph(saved);
      } else {
        const legacyGraph = JSON.parse(localStorage.getItem(legacyStorageKey) ?? "{}")?.[mode];
        if (legacyGraph) active = parseGraph(JSON.stringify(legacyGraph));
      }
    } catch {
      notice = "A saved graph could not be restored.";
    }
    ready = true;
  });

  $effect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(active));
    } catch {
      notice = "Local autosave is unavailable.";
    }
  });

  function replaceGraph(graph) {
    active = mode === "flowchart" && active.direction ? orientFlowGraph(graph, active.direction) : graph;
    error = "";
    notice = "";
  }

  function chooseFile(action) {
    importAction = action;
    picker?.click();
  }

  async function readFile(event) {
    const input = event.currentTarget;
    const file = input.files[0];
    const action = importAction;
    const targetEditor = editor;
    input.value = "";
    if (!file) return;
    try {
      const graph = parseGraph(await file.text());
      if (editor !== targetEditor) return;
      if (action === "embed") {
        targetEditor.embedGraph(graph);
      } else {
        active = graph;
      }
      error = "";
      notice = action === "embed" ? `Embedded ${graph.title}.` : `Opened ${graph.title}.`;
    } catch (problem) {
      notice = "";
      error = `Could not ${action === "embed" ? "embed" : "open"} graph. ${problem.message}`;
    }
  }

  function download() {
    const filename = active.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "graph";
    const url = URL.createObjectURL(new Blob([JSON.stringify(active, null, 2)], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}.json`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function execute() {
    try {
      const { outputs } = runGraph(active);
      const rows = active.nodes.filter((node) => Object.hasOwn(outputs, node.id))
        .map((node) => ({ id: node.id, label: node.title, value: JSON.stringify(outputs[node.id]) ?? "Unconnected" }));
      lastRun = { graph: active, rows };
    } catch (problem) {
      lastRun = { graph: active, error: problem.message };
    }
  }
</script>

<div class="graph-demo">
    <div class="graph-heading">
      <div>
        <h2 class="demo-section-title text-2xl font-semibold">{config.title}</h2>
        <p>{config.description}</p>
      </div>
      <fieldset class="graph-actions" aria-label="Graph actions" disabled={!ready}>
        <Button type="button" {style} {theme} size="sm" variant="outlined" onclick={() => replaceGraph(createGraph(config.emptyTitle))}>New graph</Button>
        <Button type="button" {style} {theme} size="sm" variant="outlined" onclick={() => chooseFile("open")}>Open JSON</Button>
        <Button type="button" {style} {theme} size="sm" variant="outlined" onclick={() => chooseFile("embed")}>Embed JSON</Button>
        <Button type="button" {style} {theme} size="sm" variant="outlined" onclick={download}>Export</Button>
        <Button type="button" {style} {theme} size="sm" variant={mode === "flowchart" ? "filled" : "outlined"} onclick={() => replaceGraph(config.example())}>{config.exampleLabel}</Button>
        {#if mode === "blueprint"}
          <Button type="button" {style} {theme} size="sm" onclick={execute}>Run graph</Button>
        {/if}
        <input type="file" accept=".json,application/json" bind:this={picker} onchange={readFile} hidden />
      </fieldset>
    </div>
    {#if error}<p class="graph-message" role="alert">{error}</p>
    {:else if notice}<p class="graph-message" role="status">{notice}</p>{/if}

    {#snippet runOutput()}
      <section class="graph-result" aria-label="Run output" aria-live="polite">
        <h3>Run output</h3>
        {#if result?.error}
          <p class="result-error" role="alert">{result.error}</p>
        {:else if result?.rows.length}
          <dl>
            {#each result.rows as row (row.id)}
              <div><dt>{row.label}</dt><dd>{row.value}</dd></div>
            {/each}
          </dl>
        {:else}
          <p>{result ? "This graph has no output nodes." : "Run the graph to see its outputs."}</p>
        {/if}
      </section>
    {/snippet}
    <div inert={!ready}>
      <GraphEditor
        bind:this={editor}
        bind:graph={active}
        {mode}
        {style}
        {theme}
        inspectorFooter={mode === "blueprint" ? runOutput : undefined}
      />
    </div>
</div>

<style>
  .graph-demo { --graph-canvas-height: max(490px, calc(100svh - 365px)); }
  .graph-heading { display: flex; align-items: end; justify-content: space-between; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.3rem; }
  .graph-heading p { margin: 0.45rem 0 0; max-width: 62ch; font-size: 0.9rem; }
  .graph-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 0.4rem; min-width: 0; margin: 0; padding: 0; border: 0; }
  .graph-message { margin: 0 0 0.65rem; font-size: 0.84rem; }
  .graph-message[role="alert"], .graph-result .result-error { color: var(--t-error); }
  .graph-result { padding-top: 0.9rem; margin-top: 1.1rem; border-top: 1px solid var(--graph-line); }
  .graph-result p { font-size: 0.8rem; color: var(--graph-muted); }
  .graph-result dl { margin: 0; }
  .graph-result dl div { display: flex; justify-content: space-between; gap: 0.45rem; padding: 0.38rem 0; }
  .graph-result dt { color: var(--graph-muted); }
  .graph-result dd { margin: 0; color: var(--graph-ink); font-family: ui-monospace, monospace; overflow-wrap: anywhere; }
</style>
