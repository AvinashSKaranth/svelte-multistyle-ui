<script>
  import CodeEditor from "$lib/components/CodeEditor.svelte";
  import { edgeStyles } from "$lib/graph/index.js";
  import GraphDemo from "./GraphDemo.svelte";
  import customNodesSource from "./custom-nodes.js?raw";

  /** @type {{mode: "flowchart" | "blueprint", onVariantChange: (mode: "flowchart" | "blueprint") => void, style: string, theme: string}} */
  let { mode, onVariantChange, style, theme } = $props();
  /** @type {import("$lib/graph/index.js").GraphEdgeStyle | undefined} */
  let edgeStyle = $state();
  const flowchart = $derived(mode === "flowchart");
  const customNodes = customNodesSource.replace(/export default nodeTypes;\s*$/, "").trim();

  const setupCode = $derived(flowchart ? `<script>
  import 'svelte-multistyle-ui/theme.css';
  import { GraphEditor, createGraph, orientFlowGraph } from 'svelte-multistyle-ui';

  let graph = $state.raw(orientFlowGraph(createGraph('Conversation'), 'vertical'));
<\/script>

<GraphEditor mode="flowchart" bind:graph />` : `<script>
  import 'svelte-multistyle-ui/theme.css';
  import { GraphEditor, createGraph, runGraph } from 'svelte-multistyle-ui';

  let graph = $state.raw(createGraph('Order logic'));
  let outputs = $state({});
<\/script>

<GraphEditor mode="blueprint" bind:graph />
<button onclick={() => (outputs = runGraph(graph).outputs)}>Run graph</button>
<pre>{JSON.stringify(outputs, null, 2)}</pre>`);

  const nodeCode = $derived(`<script>
  import 'svelte-multistyle-ui/theme.css';
  import { GraphEditor, createGraph${flowchart ? "" : ", runGraph"} } from 'svelte-multistyle-ui';

${customNodes.split("\n").map((line) => line ? "  " + line : "").join("\n")}

  let graph = $state.raw(createGraph('Custom nodes'));
${flowchart ? "" : "  let outputs = $state({});\n"}<\/script>

<GraphEditor mode="${mode}" bind:graph {nodeTypes} />${flowchart ? "" : `
<button onclick={() => (outputs = runGraph(graph, { nodeTypes }).outputs)}>Run graph</button>
<pre>{JSON.stringify(outputs, null, 2)}</pre>`}`);

  const edgeCode = $derived(`<script>
  import 'svelte-multistyle-ui/theme.css';
  import { GraphEditor, createGraph, createGraphNode, connectGraphNodes } from 'svelte-multistyle-ui';

  const source = createGraphNode('${flowchart ? "start" : "number"}', { x: 0, y: 0 });
  const target = createGraphNode('${flowchart ? "end" : "graph-output"}', { x: 280, y: 90 });

  let graph = $state.raw(connectGraphNodes(
    { ...createGraph('Connector example'), nodes: [source, target] },
    {
      source: source.id, sourcePort: '${flowchart ? "out" : "value"}',
      target: target.id, targetPort: '${flowchart ? "in" : "value"}',
      style: 'curve', // This connection overrides the editor default.
    },
  ));
<\/script>

<GraphEditor mode="${mode}" edgeStyle="straight" bind:graph />`);
</script>

<div class="graph-gallery-controls">
  <label>
    Graph variant
    <select value={mode} onchange={(event) => onVariantChange(event.currentTarget.value === "blueprint" ? "blueprint" : "flowchart")}>
      <option value="flowchart">Flowchart</option>
      <option value="blueprint">Blueprint</option>
    </select>
  </label>
  <label>
    Default connection style
    <select value={edgeStyle ?? ""} onchange={(event) => {
      const next = /** @type {import("$lib/graph/index.js").GraphEdgeStyle | ""} */ (event.currentTarget.value);
      edgeStyle = next || undefined;
    }}>
      <option value="">Automatic</option>
      {#each Object.entries(edgeStyles) as [value, label]}<option {value}>{label}</option>{/each}
    </select>
  </label>
  <a href="#graph-editor-usage">How to use ↓</a>
</div>

{#key mode}
  <GraphDemo {mode} {edgeStyle} {style} {theme} />
{/key}

{#snippet codeSample(code)}
  <CodeEditor value={code} language="svelte" editable={false} rows={code.split("\n").length} {style} {theme} />
{/snippet}

<section class="graph-guide" id="graph-editor-usage" aria-labelledby="graph-guide-title">
  <h2 id="graph-guide-title" class="demo-section-title text-2xl font-semibold">How to use GraphEditor</h2>
  <section class="graph-example" aria-labelledby="graph-setup-title">
    <h3 id="graph-setup-title" class="text-lg font-semibold">Setup and controls</h3>
    <p>Drag nodes from the palette and connect an output to an input. Double-click a subgraph to open it. Graph input and Graph output nodes define its external ports. Bind the editor instance with <code>bind:this</code> and call <code>editor.embedGraph(otherGraph)</code> to embed a copy.</p>
    {#if flowchart}
      <p>Use Message and Question nodes to build a conversation. Connect Yes and No to different steps. Choose Horizontal or Vertical on the canvas to change direction.</p>
    {:else}
      <p>Connect a result to a Graph output node, then call <code>runGraph(graph)</code>. The outputs object is keyed by graph output node ID.</p>
    {/if}
    {@render codeSample(setupCode)}
  </section>

  <section class="graph-example" aria-labelledby="graph-nodes-title">
    <h3 id="graph-nodes-title" class="text-lg font-semibold">Custom nodes</h3>
    <p>Pass <code>nodeTypes</code> keyed by type ID. Ports use stable IDs and matching types. Inspector fields use keys from the node’s <code>data</code>.</p>
    {#if flowchart}
      <p>Set <code>category: "Flowchart"</code> and use <code>flow</code> ports. Try adding <strong>Assign agent</strong> from the palette and editing its handoff message.</p>
    {:else}
      <p>Return values keyed by output port ID from <code>run</code>. Try adding <strong>Double value</strong> and connecting its Result to a Graph output. Pass the same definitions to <code>runGraph</code> and <code>parseGraph</code>.</p>
    {/if}
    {@render codeSample(nodeCode)}
  </section>

  <section class="graph-example" aria-labelledby="graph-connections-title">
    <h3 id="graph-connections-title" class="text-lg font-semibold">Connection styles</h3>
    <p>Set <code>edgeStyle</code> on the editor or <code>style</code> on a connection. Select a connection on the canvas to override it in the inspector. The default is right-angle in Flowchart and curved in Blueprint. Right-angle routing avoids nodes where possible. Straight and curved paths connect ports directly.</p>
    {@render codeSample(edgeCode)}
  </section>
</section>

<style>
  .graph-gallery-controls {
    display: flex;
    flex-wrap: wrap;
    align-items: end;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }
  label { display: grid; gap: 0.3rem; width: fit-content; font-size: 0.82rem; font-weight: 600; }
  select {
    padding: 0.45rem 0.6rem;
    border: var(--t-border-width) solid var(--t-border);
    border-radius: var(--t-input-radius);
    background: var(--t-surface);
    color: var(--t-text);
  }
  a { margin-inline-start: auto; padding-block: 0.45rem; color: var(--t-primary); text-decoration: underline; }
  .graph-guide {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 1.5rem;
    margin-top: 1.7rem;
    scroll-margin-block-start: 1rem;
  }
  .graph-example { display: grid; grid-template-columns: minmax(0, 1fr); gap: 0.65rem; }
  .graph-guide p { margin: 0; max-width: 85ch; }
</style>
