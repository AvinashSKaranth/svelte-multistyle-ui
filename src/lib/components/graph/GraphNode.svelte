<script>
  import { headerHeight, nodeHeight, nodeWidth, portHeight } from "../../graph/geometry.js";

  let { node, ports, definition, selected, pending, onmove, onselect, onopen, onport, onportkey, onnudge } = $props();
  const type = $derived(definition?.tone ?? "graph");
  const summary = $derived(node.type === "subgraph"
    ? `${node.graph?.nodes.length ?? 0} nodes`
    : definition?.fields?.[0]?.key === "value" ? JSON.stringify(node.data.value) : "");
</script>

<div
  class="s-graph-node"
  class:selected
  data-tone={type}
  style:left={`${node.x}px`}
  style:top={`${node.y}px`}
  style:width={`${nodeWidth}px`}
  style:height={`${nodeHeight(ports)}px`}
  style:--graph-header={`${headerHeight}px`}
  style:--graph-port={`${portHeight}px`}
>
  <div class="s-graph-node-bar">
    <button
      type="button"
      class="s-graph-node-title"
      aria-label={`Select ${node.title}`}
      aria-pressed={selected}
      onpointerdown={(event) => onmove(event, node)}
      onclick={() => onselect(node.id)}
      onkeydown={(event) => onnudge(event, node)}
      ondblclick={() => { if (node.graph) onopen(node); }}
    >
      <span class="s-graph-node-symbol" aria-hidden="true">
        {type === "condition" ? "◇" : type === "number" ? "#" : type === "text" ? "Aa" :
          type === "graph" ? "⌘" : type === "event" ? "▶" : "ƒ"}
      </span>
      <span title={node.title}>{node.title}</span>
    </button>
    {#if node.graph}
      <button type="button" class="s-graph-node-open" title="Open subgraph" aria-label={`Open ${node.title}`} onclick={() => onopen(node)}>↗</button>
    {/if}
  </div>
  <div class="s-graph-ports">
    {#each ["input", "output"] as side}
      <div class="s-graph-port-column" data-side={side}>
        {#each side === "input" ? ports.inputs : ports.outputs as port (port.id)}
          <button
            type="button"
            class="s-graph-port"
            class:pending={side === "output" && pending?.source === node.id && pending.sourcePort === port.id}
            data-port-side={side}
            data-node={node.id}
            data-port={port.id}
            data-type={port.type}
            aria-label={`${node.title} ${side}: ${port.label}`}
            title={`${port.label} (${port.type})`}
            onpointerdown={(event) => onport(event, node.id, side, port.id)}
            onclick={(event) => onportkey(event, node.id, side, port.id)}
          >
            <span>{port.label}</span>
          </button>
        {/each}
      </div>
    {/each}
    {#if summary}
      <span class="s-graph-node-summary" title={summary}>{summary}</span>
    {/if}
  </div>
</div>
