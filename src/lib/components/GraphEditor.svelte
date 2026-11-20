<script>
  import { untrack } from "svelte";
  import { on } from "svelte/events";
  import { defaults } from "../config.js";
  import { graphNodeTypes, createGraph, createGraphNode, connectGraphNodes, edgeStyles, orientFlowGraph, parseGraph, pruneGraphEdges } from "../graph/index.js";
  import { getDefinition, getPorts } from "../graph/node-types.js";
  import { arrowPath, constrainFlowSize, flowPortPoint, flowShape, flowSizeLimit, graphBounds, nodeSize, portPoint, wirePath } from "../graph/geometry.js";
  import { flowDraft, flowObstacles, routeFlowWire } from "../graph/flow-routing.js";
  import GraphNode from "./graph/GraphNode.svelte";
  import FlowNode from "./graph/FlowNode.svelte";
  import "./graph-editor-styles.css";

  /** @type {{
   *   graph?: import("../graph/index.js").Graph,
   *   nodeTypes?: import("../graph/index.js").NodeTypes,
   *   mode?: "blueprint" | "flowchart" | "all",
   *   edgeStyle?: import("../graph/index.js").GraphEdgeStyle,
   *   style?: string, theme?: string, class?: string,
   *   inspectorFooter?: import("svelte").Snippet
   * }} */
  let {
    graph = $bindable(createGraph()),
    nodeTypes = {},
    mode = "all",
    edgeStyle,
    style = undefined,
    theme = undefined,
    class: className = "",
    inspectorFooter,
  } = $props();

  const portTypes = ["any", "number", "text", "boolean", "flow"];
  const diagram = $derived(mode === "flowchart");
  const defaultEdgeStyle = $derived(edgeStyle ?? (diagram ? "orthogonal" : "curve"));
  const definitions = $derived({ ...graphNodeTypes, ...nodeTypes });
  let query = $state("");
  let activePath = $state.raw([]);
  let selection = $state(null);
  let pending = $state(null);
  let gesture = $state(null);
  let message = $state("");
  let past = $state.raw([]);
  let future = $state.raw([]);
  let historyGraph;
  let root = $state();
  let surface = $state();
  let width = $state(0);
  let height = $state(0);
  let view = $state({ x: 0, y: 0, zoom: 1 });

  const levels = $derived.by(() => {
    const trail = [{ title: graph.title, graph }];
    for (const id of activePath) {
      const node = trail.at(-1).graph.nodes.find((item) => item.id === id);
      if (!node?.graph) break;
      trail.push({ title: node.title, graph: node.graph });
    }
    return trail;
  });
  const current = $derived(levels.at(-1).graph);
  const direction = $derived(diagram ? current.direction ?? "horizontal" : "horizontal");
  const selectedNode = $derived(selection?.kind === "node" ? current.nodes.find((node) => node.id === selection.id) : undefined);
  const selectedEdge = $derived(selection?.kind === "edge" ? current.edges.find((edge) => edge.id === selection.id) : undefined);
  const selectedDefinition = $derived(selectedNode && getDefinition(selectedNode.type, definitions));
  const selectedSize = $derived(selectedNode && diagram ? nodeSize(selectedNode, getPorts(selectedNode, definitions), true) : undefined);
  const portTypeOptions = $derived([...new Set([...portTypes, ...Object.values(definitions)
    .flatMap((def) => [...(def.inputs ?? []), ...(def.outputs ?? [])].map((port) => port.type)),
    selectedNode?.data.portType].filter(Boolean))]);
  const categoryGroups = $derived.by(() => {
    const entries = Object.entries(definitions).filter(([, definition]) => {
      const category = definition.category ?? "Custom";
      const visible = mode === "all" || category === "Graphs" ||
        (mode === "flowchart" ? category === "Flowchart" : category !== "Flowchart");
      return visible && `${definition.title} ${category}`.toLowerCase().includes(query.trim().toLowerCase());
    });
    const groups = new Map();
    for (const entry of entries) {
      const category = entry[1].category ?? "Custom";
      if (!groups.has(category)) groups.set(category, []);
      groups.get(category).push(entry);
    }
    return [...groups];
  });
  const nodes = $derived(current.nodes.map((node) => ({ node, ports: getPorts(node, definitions) })));
  const drawnNodes = $derived(nodes.map((item) =>
    (gesture?.kind === "move" || gesture?.kind === "resize") && gesture.node === item.node.id
      ? { ...item, node: { ...item.node, ...gesture.position } }
      : item));
  const byId = $derived(new Map(drawnNodes.map((item) => [item.node.id, item])));
  const bounds = $derived(graphBounds(drawnNodes, diagram));
  const obstacles = $derived(defaultEdgeStyle === "orthogonal" || current.edges.some((edge) => edge.style === "orthogonal")
    ? flowObstacles(drawnNodes, direction, diagram) : []);
  const obstaclesById = $derived(new Map(obstacles.map((rect) => [rect.id, rect])));
  const mapScale = $derived(Math.min(122 / (bounds.width + 30), 66 / (bounds.height + 30)));
  const mapView = $derived({
    x: (144 - bounds.width * mapScale) / 2 - bounds.x * mapScale,
    y: (86 - bounds.height * mapScale) / 2 - bounds.y * mapScale,
  });

  function location(id, port, side) {
    const item = byId.get(id);
    const index = item?.ports[side === "input" ? "inputs" : "outputs"].findIndex((candidate) => candidate.id === port);
    if (index < 0 || index === undefined) return;
    return diagram ? flowPortPoint(item.node, item.ports, index, side, direction) : portPoint(item.node, index, side);
  }

  function directPath(start, end, style) {
    return style === "straight" ? `M ${start.x} ${start.y} L ${end.x} ${end.y}` : wirePath(start, end, direction);
  }

  const wires = $derived(current.edges.flatMap((edge) => {
    const start = location(edge.source, edge.sourcePort, "output");
    const end = location(edge.target, edge.targetPort, "input");
    if (!start || !end) return [];
    const { outputs } = byId.get(edge.source).ports;
    const output = outputs.find((port) => port.id === edge.sourcePort);
    const style = edge.style ?? defaultEdgeStyle;
    const route = style === "orthogonal"
      ? routeFlowWire(start, end, obstaclesById.get(edge.source), obstaclesById.get(edge.target), obstacles, direction)
      : { path: directPath(start, end, style), label: { x: start.x + 8, y: start.y - 10 } };
    return [{
      edge, path: route.path, type: output.type,
      arrow: arrowPath(end, direction, style === "straight" ? start : undefined),
      label: diagram && outputs.length > 1 ? { ...route.label, text: output.label } : undefined,
    }];
  }));

  const draft = $derived.by(() => {
    if (gesture?.kind !== "connect") return undefined;
    const start = location(gesture.source, gesture.sourcePort, "output");
    return start && (defaultEdgeStyle === "orthogonal"
      ? flowDraft(start, gesture.position, direction) : directPath(start, gesture.position, defaultEdgeStyle));
  });

  $effect(() => {
    if (surface) return on(surface, "wheel", wheel, { passive: false });
  });

  $effect(() => {
    if (!root) return;
    const listeners = [
      on(root, "keydown", keyboard),
      on(root, "pointermove", movePointer),
      on(root, "pointerup", endPointer),
      on(root, "pointercancel", cancelPointer),
      on(root, "lostpointercapture", cancelPointer),
    ];
    return () => listeners.forEach((stop) => stop());
  });

  $effect(() => {
    if (!width || !height) return;
    untrack(() => {
      if (!hasSized) {
        hasSized = true;
        fitView();
      }
    });
  });
  let hasSized = false;

  $effect(() => {
    if (graph === historyGraph) return;
    historyGraph = graph;
    past = [];
    future = [];
    resetInteraction();
    activePath = [];
    untrack(fitView);
  });

  function setGraph(next) {
    graph = next;
    historyGraph = graph;
  }

  function commit(next) {
    past = [...past.slice(-49), graph];
    future = [];
    setGraph(next);
    message = "";
  }

  function replaceLevel(update, path = activePath.slice(0, levels.length - 1)) {
    function replace(level, index) {
      const id = path[index];
      if (index === path.length) return pruneGraphEdges(update(level), definitions);
      const updated = { ...level, nodes: level.nodes.map((node) =>
        node.id === id ? { ...node, graph: replace(node.graph, index + 1) } : node) };
      return pruneGraphEdges(updated, definitions);
    }
    commit(replace(graph, 0));
  }

  function resetInteraction() {
    if (gesture?.element.hasPointerCapture(gesture.id)) gesture.element.releasePointerCapture(gesture.id);
    selection = null;
    gesture = null;
    pending = null;
    message = "";
  }

  function stepHistory(redo = false) {
    const stack = redo ? future : past;
    if (!stack.length) return;
    const previousDirection = direction;
    if (redo) {
      future = future.slice(0, -1);
      past = [...past, graph];
    } else {
      past = past.slice(0, -1);
      future = [...future, graph];
    }
    setGraph(stack.at(-1));
    resetInteraction();
    if (activePath.length >= levels.length) navigate(levels.length - 1);
    else if (direction !== previousDirection) fitView();
  }

  function setDirection(value) {
    if (value === direction) return;
    resetInteraction();
    replaceLevel((level) => orientFlowGraph(level, value));
    fitView();
  }

  function toGraph(clientX, clientY) {
    const rect = surface.getBoundingClientRect();
    return { x: (clientX - rect.left - view.x) / view.zoom, y: (clientY - rect.top - view.y) / view.zoom };
  }

  function fitView() {
    if (!width || !height) return;
    const zoom = Math.min(1, Math.max(0.18, Math.min((width - 64) / bounds.width, (height - 64) / bounds.height)));
    view = { x: width / 2 - (bounds.x + bounds.width / 2) * zoom,
      y: height / 2 - (bounds.y + bounds.height / 2) * zoom, zoom };
  }

  function zoomAt(factor, x = width / 2, y = height / 2) {
    const zoom = Math.max(0.18, Math.min(2.25, view.zoom * factor));
    const ratio = zoom / view.zoom;
    view = { x: x - (x - view.x) * ratio, y: y - (y - view.y) * ratio, zoom };
  }

  function wheel(event) {
    event.preventDefault();
    const rect = surface.getBoundingClientRect();
    const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? height : 1);
    zoomAt(Math.exp(-delta * 0.0016), event.clientX - rect.left, event.clientY - rect.top);
  }

  function addNode(type, position, options = {}) {
    const boundary = type === "graph-input" || type === "graph-output";
    const data = boundary && diagram ? { portType: "flow" } : {};
    const node = createGraphNode(type, { data, ...options }, definitions);
    if (diagram && node.graph && !options.graph) node.graph = orientFlowGraph(node.graph, direction);
    const size = nodeSize(node, getPorts(node, definitions), diagram);
    let x = Math.round((position?.x ?? (width / 2 - view.x) / view.zoom) - size.width / 2);
    const dropOffset = diagram ? size.height / 2 : position ? 22 : 40;
    let y = Math.round((position?.y ?? (height / 2 - view.y) / view.zoom) - dropOffset);
    if (!position) {
      while (current.nodes.some((node) => Math.abs(node.x - x) < 18 && Math.abs(node.y - y) < 18)) {
        x += 30;
        y += 30;
      }
    }
    replaceLevel((level) => ({ ...level, nodes: [...level.nodes, { ...node, x, y }] }));
    selectNode(node.id);
  }

  /** Embed an independent copy in the currently open graph.
   * @param {import("../graph/index.js").Graph} embedded */
  export function embedGraph(embedded) {
    const copy = parseGraph(JSON.stringify(embedded), definitions);
    addNode("subgraph", undefined, { graph: copy, title: copy.title });
  }

  function selectNode(id) {
    selection = { kind: "node", id };
    message = "";
  }

  function updateNode(id, changes, path) {
    replaceLevel((level) => ({
      ...level,
      nodes: level.nodes.map((node) => {
        if (node.id !== id) return node;
        const next = { ...node, ...changes };
        if (next.graph && changes.title) next.graph = { ...next.graph, title: changes.title };
        return next;
      }),
    }), path);
  }

  function removeSelected() {
    if (!selectedNode && !selectedEdge) return;
    replaceLevel((level) => ({
      ...level,
      nodes: selectedNode ? level.nodes.filter((node) => node.id !== selectedNode.id) : level.nodes,
      edges: selectedEdge ? level.edges.filter((edge) => edge.id !== selectedEdge.id) : level.edges,
    }));
    resetInteraction();
  }

  function openGraph(node) {
    if (!node.graph) return;
    activePath = [...activePath.slice(0, levels.length - 1), node.id];
    resetInteraction();
    fitView();
    surface?.focus({ preventScroll: true });
  }

  function navigate(index) {
    activePath = activePath.slice(0, index);
    resetInteraction();
    fitView();
    surface?.focus({ preventScroll: true });
  }

  function capture(event, kind, fields = {}) {
    const element = event.currentTarget;
    gesture = { kind, element, id: event.pointerId, x: event.clientX, y: event.clientY, ...fields };
    element.setPointerCapture(event.pointerId);
  }

  function startPan(event) {
    if (gesture || event.button > 1 || event.target.closest(".s-graph-node, .s-graph-edge-hit")) return;
    resetInteraction();
    surface.focus({ preventScroll: true });
    capture(event, "pan", { origin: view });
  }

  function startPaletteDrag(event, type) {
    if (gesture || event.button !== 0) return;
    capture(event, "palette", { type, dragging: false });
  }

  function startMove(event, node) {
    if (gesture || event.button !== 0) return;
    event.stopPropagation();
    event.currentTarget.focus({ preventScroll: true });
    pending = null;
    selectNode(node.id);
    capture(event, "move", { node: node.id, origin: { x: node.x, y: node.y }, position: { x: node.x, y: node.y } });
  }

  function startResize(event, node, size) {
    if (gesture || event.button !== 0) return;
    event.stopPropagation();
    capture(event, "resize", { node: node.id, origin: size, position: size });
  }

  function startPort(event, id, side, port) {
    event.stopPropagation();
    if (gesture || event.button !== 0) return;
    if (side === "input") {
      if (pending) finishConnection(id, port);
      return;
    }
    event.currentTarget.focus({ preventScroll: true });
    pending = { source: id, sourcePort: port };
    message = "Choose an input to connect.";
    capture(event, "connect", { ...pending, position: toGraph(event.clientX, event.clientY) });
  }

  function keyPort(event, id, side, port) {
    if (event.detail !== 0 || gesture) return;
    if (side === "input") {
      if (pending) finishConnection(id, port);
    } else {
      pending = { source: id, sourcePort: port };
      message = "Choose an input to connect.";
    }
  }

  function finishConnection(id, port) {
    const connection = { ...pending, target: id, targetPort: port };
    try {
      const next = connectGraphNodes(current, connection, definitions);
      if (next !== current) replaceLevel(() => next);
      pending = null;
      message = "Connection added.";
    } catch (error) {
      message = error.message;
    }
  }

  function movePointer(event) {
    if (gesture?.id !== event.pointerId) return;
    const dx = event.clientX - gesture.x;
    const dy = event.clientY - gesture.y;
    const { origin, kind } = gesture;
    if (kind === "palette") {
      gesture.dragging ||= Math.hypot(dx, dy) > 5;
      gesture.position = { x: event.clientX, y: event.clientY };
    } else if (kind === "pan") {
      view = { ...view, x: origin.x + dx, y: origin.y + dy };
    } else if (kind === "move") {
      gesture.position = { x: Math.round(origin.x + dx / view.zoom), y: Math.round(origin.y + dy / view.zoom) };
    } else if (kind === "resize") {
      gesture.position = constrainFlowSize(origin.width + dx / view.zoom, origin.height + dy / view.zoom);
    } else {
      gesture.position = toGraph(event.clientX, event.clientY);
    }
  }

  function endPointer(event) {
    if (gesture?.id !== event.pointerId) return;
    const completed = gesture;
    gesture = null;
    if (completed.kind === "palette") {
      const target = root.ownerDocument.elementFromPoint(event.clientX, event.clientY);
      if (completed.dragging && surface.contains(target)) {
        addNode(completed.type, toGraph(event.clientX, event.clientY));
      } else if (!completed.dragging && completed.element.contains(target)) {
        addNode(completed.type);
      }
    } else if (completed.kind === "move" && (completed.position.x !== completed.origin.x || completed.position.y !== completed.origin.y)) {
      updateNode(completed.node, completed.position);
    } else if (completed.kind === "resize" &&
      (completed.position.width !== completed.origin.width || completed.position.height !== completed.origin.height)) {
      updateNode(completed.node, completed.position);
    } else if (completed.kind === "connect") {
      const target = surface.ownerDocument.elementFromPoint(event.clientX, event.clientY)?.closest("[data-port-side='input']");
      if (target?.closest(".s-graph-canvas") === surface) finishConnection(target.dataset.node, target.dataset.port);
    }
  }

  function cancelPointer(event) {
    if (gesture?.id !== event.pointerId) return;
    if (gesture.kind === "connect") pending = null;
    gesture = null;
    message = "";
  }

  function nudge(event, node) {
    const direction = arrows[event.key];
    if (!direction) return;
    event.preventDefault();
    const step = event.shiftKey ? 30 : 10;
    selectNode(node.id);
    updateNode(node.id, { x: node.x + direction[0] * step, y: node.y + direction[1] * step });
  }

  const arrows = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };

  function resizeByKey(event, node, size) {
    const direction = arrows[event.key];
    if (!direction) return;
    event.preventDefault();
    const step = event.shiftKey ? 24 : 8;
    updateNode(node.id, constrainFlowSize(size.width + direction[0] * step, size.height + direction[1] * step));
  }

  function editSize(event, axis) {
    const input = event.currentTarget;
    const value = input.valueAsNumber;
    if (!Number.isFinite(value)) {
      input.value = selectedSize[axis];
      return;
    }
    const size = { ...selectedSize, [axis]: value };
    const next = constrainFlowSize(size.width, size.height);
    input.value = next[axis];
    if (next[axis] !== selectedSize[axis]) updateNode(selectedNode.id, next);
  }

  function keyboard(event) {
    if (event.key === "Escape") {
      resetInteraction();
      return;
    }
    if (event.target.closest("input, textarea, select, [contenteditable]")) return;
    if (event.target === surface) {
      const direction = arrows[event.key];
      if (direction) {
        event.preventDefault();
        view = { ...view, x: view.x - direction[0] * 45, y: view.y - direction[1] * 45 };
        return;
      }
      if (["+", "=", "-", "Home"].includes(event.key)) {
        event.preventDefault();
        if (event.key === "Home") fitView();
        else zoomAt(event.key === "-" ? 1 / 1.2 : 1.2);
        return;
      }
    }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "z") {
      event.preventDefault();
      stepHistory(event.shiftKey);
    } else if (event.key === "Delete" || event.key === "Backspace") {
      event.preventDefault();
      removeSelected();
    }
  }
</script>

<div
  class="s-graph-editor s-graph-editor-{style ?? defaults.style} theme-{theme ?? defaults.theme} {className}"
  data-mode={mode}
  role="region"
  aria-label="Graph editor"
  bind:this={root}
>
  <aside class="s-graph-palette" aria-label="Node palette">
    <h2>{diagram ? "Shapes" : "Nodes"}</h2>
    <input type="search" placeholder="Search nodes…" aria-label="Search nodes" bind:value={query} />
    <div class="s-graph-palette-list">
      {#each categoryGroups as [category, entries] (category)}
        <div class="s-graph-palette-group">
          <h3>{category}</h3>
          {#each entries as [type, definition] (type)}
            <button
              type="button"
              class="s-graph-palette-node"
              aria-label={`Add ${definition.title}`}
              data-tone={definition.tone ?? "graph"}
              onpointerdown={(event) => startPaletteDrag(event, type)}
              onclick={(event) => { if (event.detail === 0) addNode(type); }}
            ><span data-shape={diagram ? flowShape(type) : undefined} aria-hidden="true"></span>{definition.title}<b aria-hidden="true">+</b></button>
          {/each}
        </div>
      {:else}
        <p class="s-graph-hint">No matching nodes.</p>
      {/each}
    </div>
    <p class="s-graph-palette-help">{diagram ? "Drag a shape onto the canvas or click to add it." : "Drag a node onto the canvas or click to add it."}</p>
  </aside>

  {#if gesture?.kind === "palette" && gesture.dragging}
    <div class="s-graph-drag-preview" aria-hidden="true" style:left={`${gesture.position.x + 12}px`} style:top={`${gesture.position.y + 12}px`}>
      {getDefinition(gesture.type, definitions)?.title}
    </div>
  {/if}

  <div class="s-graph-workspace">
    <div class="s-graph-toolbar">
      <nav aria-label="Graph path">
        {#each levels as level, index}
          {#if index > 0}<span aria-hidden="true">/</span>{/if}
          {#if index < levels.length - 1}
            <button type="button" onclick={() => navigate(index)}>{level.title}</button>
          {:else}
            <strong aria-current="location">{level.title}</strong>
          {/if}
        {/each}
      </nav>
      <div class="s-graph-toolbar-actions">
        {#if diagram}
          <div class="s-flow-direction" role="group" aria-label="Flowchart direction">
            <button type="button" aria-pressed={direction === "horizontal"} onclick={() => setDirection("horizontal")}>Horizontal</button>
            <button type="button" aria-pressed={direction === "vertical"} onclick={() => setDirection("vertical")}>Vertical</button>
          </div>
        {/if}
        <div class="s-graph-history" aria-label="Edit history">
          <button type="button" title="Undo (Ctrl or Cmd + Z)" aria-label="Undo" disabled={!past.length} onclick={() => stepHistory()}>↶</button>
          <button type="button" title="Redo (Ctrl or Cmd + Shift + Z)" aria-label="Redo" disabled={!future.length} onclick={() => stepHistory(true)}>↷</button>
        </div>
      </div>
    </div>
    <div class="s-graph-stage">
      <!-- svelte-ignore a11y_no_noninteractive_tabindex (Keyboard users can focus the canvas to pan, zoom, and fit the graph.) -->
      <div
        class="s-graph-canvas"
        class:panning={gesture?.kind === "pan"}
        role="region"
        aria-label="Graph canvas"
        tabindex="0"
        bind:this={surface}
        bind:clientWidth={width}
        bind:clientHeight={height}
        style:background-position={`${view.x}px ${view.y}px`}
        style:background-size={`${22 * view.zoom}px ${22 * view.zoom}px`}
        onpointerdown={startPan}
      >
        <div class="s-graph-plane" style:transform={`translate(${view.x}px, ${view.y}px) scale(${view.zoom})`}>
          <svg class="s-graph-wires" aria-label="Connections">
            {#each wires as wire (wire.edge.id)}
              <g data-type={wire.type} class:selected={selectedEdge?.id === wire.edge.id}>
                <path class="s-graph-edge" d={wire.path} />
                <path class="s-graph-arrow" d={wire.arrow} />
                {#if wire.label}
                  <text class="s-flow-edge-label" x={wire.label.x} y={wire.label.y}>{wire.label.text}</text>
                {/if}
                <path
                  class="s-graph-edge-hit"
                  d={wire.path}
                  role="button"
                  tabindex="0"
                  aria-label={`Select connection from ${byId.get(wire.edge.source).node.title} to ${byId.get(wire.edge.target).node.title}`}
                  onclick={() => { selection = { kind: "edge", id: wire.edge.id }; pending = null; message = ""; }}
                  onkeydown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); selection = { kind: "edge", id: wire.edge.id }; } }}
                />
              </g>
            {/each}
            {#if draft}<path class="s-graph-draft" d={draft} />{/if}
          </svg>
          {#each drawnNodes as { node, ports } (node.id)}
            {#if diagram}
              <FlowNode {node} {ports} {direction} definition={getDefinition(node.type, definitions)} selected={selectedNode?.id === node.id}
                {pending} onmove={startMove} onselect={selectNode} onopen={openGraph} onport={startPort} onportkey={keyPort} onnudge={nudge}
                onresize={startResize} onresizekey={resizeByKey} />
            {:else}
              <GraphNode {node} {ports} definition={getDefinition(node.type, definitions)} selected={selectedNode?.id === node.id}
                {pending} onmove={startMove} onselect={selectNode} onopen={openGraph} onport={startPort} onportkey={keyPort} onnudge={nudge} />
            {/if}
          {/each}
        </div>
        {#if !current.nodes.length}<p class="s-graph-empty">Add a node to start building.</p>{/if}
      </div>
      <div class="s-graph-zoom" aria-label="Canvas zoom">
        <button type="button" aria-label="Zoom out" title="Zoom out" onclick={() => zoomAt(1 / 1.2)}>−</button>
        <span>{Math.round(view.zoom * 100)}%</span>
        <button type="button" aria-label="Zoom in" title="Zoom in" onclick={() => zoomAt(1.2)}>+</button>
        <button type="button" aria-label="Fit graph to canvas" onclick={fitView}>Fit</button>
      </div>
      {#if drawnNodes.length}
        <div class="s-graph-minimap" aria-hidden="true">
          {#each drawnNodes as { node, ports } (node.id)}
            {@const size = nodeSize(node, ports, diagram)}
            <span class:active={selectedNode?.id === node.id} style:left={`${mapView.x + node.x * mapScale}px`}
              style:top={`${mapView.y + node.y * mapScale}px`} style:width={`${size.width * mapScale}px`}
              style:height={`${size.height * mapScale}px`}></span>
          {/each}
          <div style:left={`${mapView.x - view.x / view.zoom * mapScale}px`}
            style:top={`${mapView.y - view.y / view.zoom * mapScale}px`}
            style:width={`${width / view.zoom * mapScale}px`}
            style:height={`${height / view.zoom * mapScale}px`}></div>
        </div>
      {/if}
    </div>
    <div class="s-graph-status">
      <span>{current.nodes.length} {current.nodes.length === 1 ? "node" : "nodes"} · {current.edges.length} {current.edges.length === 1 ? "connection" : "connections"}</span>
      <span role="status">{message || "Drag canvas to pan · Scroll to zoom"}</span>
    </div>
  </div>

  <aside class="s-graph-inspector" aria-label="Inspector">
    <h2>Inspector</h2>
    {#if selectedNode}
      {#key selectedNode.id}
        <p class="s-graph-selected-type">{selectedDefinition?.title ?? selectedNode.type}</p>
        <label>Node title
          <input value={selectedNode.title} onchange={(event) => {
            const title = event.currentTarget.value.trim();
            if (title) updateNode(selectedNode.id, { title });
            else event.currentTarget.value = selectedNode.title;
          }} />
        </label>
        {#if selectedSize}
          <div class="s-flow-size" role="group" aria-label="Shape size">
            <label>Width
              <input type="number" value={selectedSize.width} min={flowSizeLimit.minWidth} max={flowSizeLimit.maxWidth}
                onchange={(event) => editSize(event, "width")} />
            </label>
            <label>Height
              <input type="number" value={selectedSize.height} min={flowSizeLimit.minHeight} max={flowSizeLimit.maxHeight}
                onchange={(event) => editSize(event, "height")} />
            </label>
          </div>
        {/if}
        {#if selectedNode.type === "graph-input" || selectedNode.type === "graph-output"}
          <label>Port type
            <select value={selectedNode.data.portType} onchange={(event) =>
              updateNode(selectedNode.id, { data: { ...selectedNode.data, portType: event.currentTarget.value } })}>
              {#each portTypeOptions as type}<option value={type}>{type}</option>{/each}
            </select>
          </label>
        {/if}
        {#each selectedDefinition?.fields ?? [] as field (field.key)}
          <label>{field.label}
            {#if field.type === "boolean"}
              <input type="checkbox" checked={selectedNode.data[field.key] ?? selectedDefinition.data?.[field.key]} onchange={(event) =>
                updateNode(selectedNode.id, { data: { ...selectedNode.data, [field.key]: event.currentTarget.checked } })} />
            {:else}
              <input type={field.type} step={field.type === "number" ? "any" : undefined}
                value={selectedNode.data[field.key] ?? selectedDefinition.data?.[field.key] ?? ""} onchange={(event) => {
                  const input = event.currentTarget;
                  const value = field.type === "number" ? input.valueAsNumber : input.value;
                  if (field.type === "number" && !Number.isFinite(value)) {
                    input.value = selectedNode.data[field.key] ?? selectedDefinition.data?.[field.key] ?? "";
                    return;
                  }
                  updateNode(selectedNode.id, { data: { ...selectedNode.data, [field.key]: value } });
                }} />
            {/if}
          </label>
        {/each}
        {#if selectedNode.graph}
          <button type="button" class="s-graph-inspector-open" onclick={() => openGraph(selectedNode)}>Open subgraph ↗</button>
          <p class="s-graph-hint">Add graph input and output nodes inside to expose ports here.</p>
        {/if}
        <button type="button" class="s-graph-remove" onclick={removeSelected}>Delete node</button>
      {/key}
    {:else if selectedEdge}
      <p class="s-graph-hint">{byId.get(selectedEdge.source)?.node.title} → {byId.get(selectedEdge.target)?.node.title}</p>
      <label>Connection style
        <select value={selectedEdge.style ?? ""} onchange={(event) => {
          const style = /** @type {import("../graph/index.js").GraphEdgeStyle | ""} */ (event.currentTarget.value);
          replaceLevel((level) => ({
            ...level,
            edges: level.edges.map((edge) => edge.id === selectedEdge.id ? { ...edge, style: style || undefined } : edge),
          }));
        }}>
          <option value="">Editor default</option>
          {#each Object.entries(edgeStyles) as [value, label]}<option {value}>{label}</option>{/each}
        </select>
      </label>
      <button type="button" class="s-graph-remove" onclick={removeSelected}>Delete connection</button>
    {:else}
      <label>{levels.length > 1 ? "Subgraph title" : "Graph title"}
        <input value={levels.at(-1).title} onchange={(event) => {
          const title = event.currentTarget.value.trim();
          if (!title) { event.currentTarget.value = levels.at(-1).title; return; }
          if (levels.length === 1) replaceLevel((level) => ({ ...level, title }));
          else updateNode(activePath.at(-1), { title }, activePath.slice(0, -1));
        }} />
      </label>
      <p class="s-graph-hint">Select a node to edit its properties. Drag from an output to an input to connect them.</p>
    {/if}
    {@render inspectorFooter?.()}
  </aside>
</div>
