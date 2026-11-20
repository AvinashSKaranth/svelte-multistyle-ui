# GraphEditor

Use `mode="flowchart"` for diagrams, including conversational flows with Message and Question nodes and yes/no branches. Flowcharts support horizontal or vertical layouts and loops. Use `mode="blueprint"` for dataflow graphs with typed inputs and outputs.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `graph` | `Graph` | `createGraph()` | Versioned graph object. Supports `bind:graph`. |
| `mode` | `"all" \| "flowchart" \| "blueprint"` | `"all"` | `all` exposes both node sets in the port-based editor. |
| `edgeStyle` | `"straight" \| "curve" \| "orthogonal"` | `"orthogonal"` in Flowchart, `"curve"` otherwise | Default connector path for edges and the drag preview. |
| `nodeTypes` | `Record<string, NodeDefinition>` | `{}` | Adds or overrides node definitions. Use `category: "Flowchart"` for custom nodes in Flowchart mode. |
| `inspectorFooter` | Svelte snippet | unset | Content below the inspector. |
| `style`, `theme`, `class` | string | global style and theme, empty class | Optional wrapper styling. |

```svelte
<script>
  import { GraphEditor, createGraph, orientFlowGraph } from 'svelte-multistyle-ui';
  let graph = $state.raw(orientFlowGraph(createGraph('Support conversation'), 'vertical'));
</script>

<GraphEditor mode="flowchart" bind:graph />
```

Drag nodes from the palette or click to add them. Connect an output to an input by dragging between ports or activating the ports in order. Use the direction control or assign the result of `orientFlowGraph(graph, direction)` to change layout.

The demo’s **Graph Editor** tab contains both variants and copyable examples for setup, custom nodes, and connection styles.

## Custom nodes

Define a node under a stable type ID and pass the definitions as `nodeTypes`. For a Flowchart node, use `category: "Flowchart"` and `type: "flow"` ports. For a Blueprint node, `run(inputs, data)` receives values keyed by input port ID and returns values keyed by output port ID.

```js
const nodeTypes = {
  doubleValue: {
    title: "Double value",
    inputs: [{ id: "value", label: "Value", type: "number", defaultValue: 2 }],
    outputs: [{ id: "result", label: "Result", type: "number" }],
    run: ({ value }) => ({ result: value * 2 }),
  },
};
```

Pass the same definitions to `createGraphNode`, `connectGraphNodes`, `parseGraph`, and `runGraph` when they work with these nodes.

## Connection styles

Set `edgeStyle="straight"` on the editor for direct lines, `edgeStyle="curve"` for Bézier curves, or `edgeStyle="orthogonal"` for right-angle routing around nodes. A connection’s optional `style` overrides the editor default. Set it in the inspector or when creating a connection.

```js
graph = connectGraphNodes(graph, {
  source: start.id,
  sourcePort: "out",
  target: end.id,
  targetPort: "in",
  style: "curve",
});
```

Per-connection styles are included in graph JSON. Choose **Editor default** in the inspector to clear an override.

## Subgraphs

Open a Subgraph node to edit its nested graph. Graph input and Graph output nodes define the parent’s ports, keyed by the boundary nodes’ IDs. Each flowchart subgraph can have its own direction. Use `bind:this={editor}` and call `editor.embedGraph(otherGraph)` to insert an independent copy into the currently open graph.

## Graph helpers

The package root and `svelte-multistyle-ui/graph` export these helpers.

- `createGraph(title)` creates an empty graph and `createGraphNode(type, options, nodeTypes)` constructs a node. Append the node to `graph.nodes`.
- `connectGraphNodes(graph, { source, sourcePort, target, targetPort }, nodeTypes)` validates a connection and returns the updated graph.
- `parseGraph(json, nodeTypes)` validates serialized graphs, including nested graphs. Use `JSON.stringify(graph)` to save a graph.
- `runGraph(graph, { inputs, nodeTypes })` evaluates blueprint data dependencies and returns `{ outputs, values }`. Inputs and outputs use boundary node IDs. The runner reports data cycles. Flowchart links describe diagram structure.
- `graphNodeTypes` contains the built-in definitions. Custom nodes use stable port IDs, optional inspector fields, and a synchronous `run(inputs, data)` that returns values keyed by output port ID. Pass the same custom definitions to the editor, parser, and runner.
