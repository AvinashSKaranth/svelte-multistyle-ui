<script>
  import { flowPortPoint, flowShape, nodeSize } from "../../graph/geometry.js";

  let { node, ports, definition, direction, selected, pending, onmove, onselect, onopen, onport, onportkey, onnudge,
    onresize, onresizekey } = $props();
  const size = $derived(nodeSize(node, ports, true));
  const { width, height } = $derived(size);
  const shape = $derived(flowShape(node.type));
</script>

<div
  class="s-graph-node s-flow-node"
  class:selected
  data-tone={definition?.tone ?? "graph"}
  data-shape={shape}
  style:left={`${node.x}px`}
  style:top={`${node.y}px`}
  style:width={`${width}px`}
  style:height={`${height}px`}
>
  <svg class="s-flow-outline" viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
    {#if shape === "decision"}
      <polygon points={`${width / 2},1 ${width - 1},${height / 2} ${width / 2},${height - 1} 1,${height / 2}`} />
    {:else if shape === "io"}
      <polygon points={`19,1 ${width - 1},1 ${width - 19},${height - 1} 1,${height - 1}`} />
    {:else if shape === "message"}
      <path d={`M1 1 H${width - 18} L${width - 1} 18 V${height - 1} H1 Z`} />
      <path class="s-flow-outline-detail" d={`M${width - 18} 1 V18 H${width - 1}`} />
    {:else}
      <rect x="1" y="1" width={width - 2} height={height - 2}
        rx={shape === "terminator" ? height / 2 : 3} />
      {#if shape === "subprocess"}
        <path class="s-flow-outline-detail" d={`M11 1 V${height - 1} M${width - 11} 1 V${height - 1}`} />
      {/if}
    {/if}
  </svg>
  <button
    type="button"
    class="s-flow-title"
    aria-label={`Select ${node.title}`}
    aria-pressed={selected}
    onpointerdown={(event) => onmove(event, node)}
    onclick={() => onselect(node.id)}
    onkeydown={(event) => onnudge(event, node)}
    ondblclick={() => { if (node.graph) onopen(node); }}
  >
    <span title={node.title}>{node.title}</span>
    {#if shape === "message" && node.data.text}
      <small title={node.data.text}>{node.data.text}</small>
    {/if}
  </button>
  {#if node.graph}
    <button type="button" class="s-flow-open" title="Open subgraph" aria-label={`Open ${node.title}`} onclick={() => onopen(node)}>↗</button>
  {/if}
  {#each ["input", "output"] as side}
    {#each side === "input" ? ports.inputs : ports.outputs as port, index (port.id)}
      {@const point = flowPortPoint(node, ports, index, side, direction)}
      <button
        type="button"
        class="s-flow-port"
        class:pending={side === "output" && pending?.source === node.id && pending.sourcePort === port.id}
        data-port-side={side}
        data-node={node.id}
        data-port={port.id}
        data-type={port.type}
        style:left={`${point.x - node.x}px`}
        style:top={`${point.y - node.y}px`}
        aria-label={`${node.title} ${side}: ${port.label}`}
        title={port.label}
        onpointerdown={(event) => onport(event, node.id, side, port.id)}
        onclick={(event) => onportkey(event, node.id, side, port.id)}
      ></button>
    {/each}
  {/each}
  {#if selected}
    <button type="button" class="s-flow-resize" aria-label={`Resize ${node.title}`} title="Drag or use the arrow keys to resize"
      onpointerdown={(event) => onresize(event, node, size)} onkeydown={(event) => onresizekey(event, node, size)}></button>
  {/if}
</div>
