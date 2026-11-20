export const nodeWidth = 190;
export const headerHeight = 43;
export const portHeight = 29;
export const flowSizeLimit = { minWidth: 112, maxWidth: 480, minHeight: 64, maxHeight: 320 };

export function nodeHeight({ inputs, outputs }) {
  return headerHeight + Math.max(inputs.length, outputs.length, 1) * portHeight + 8;
}

export function portPoint(node, index, side) {
  return {
    x: node.x + (side === "output" ? nodeWidth : 0),
    y: node.y + headerHeight + (index + 0.5) * portHeight,
  };
}

export function flowShape(type) {
  if (type === "decision" || type === "question") return "decision";
  if (type === "start" || type === "end") return "terminator";
  if (type === "graph-input" || type === "graph-output") return "io";
  if (type === "subgraph") return "subprocess";
  if (type === "message") return "message";
  return "process";
}

export function constrainFlowSize(width, height) {
  const { minWidth, maxWidth, minHeight, maxHeight } = flowSizeLimit;
  return {
    width: Math.round(Math.max(minWidth, Math.min(maxWidth, width))),
    height: Math.round(Math.max(minHeight, Math.min(maxHeight, height))),
  };
}

export function nodeSize(node, ports, diagram) {
  if (!diagram) return { width: nodeWidth, height: nodeHeight(ports) };
  const shape = flowShape(node.type);
  return constrainFlowSize(node.width ?? 160, node.height ?? (shape === "decision" ? 108 : 72));
}

export function flowPortPoint(node, ports, index, side, direction = "horizontal") {
  const { width, height } = nodeSize(node, ports, true);
  const count = ports[side === "input" ? "inputs" : "outputs"].length;
  const fraction = (index + 1) / (count + 1);
  const shape = flowShape(node.type);
  const input = side === "input";
  if (direction === "vertical") {
    let y = input ? 0 : height;
    let x = width * fraction;
    if (shape === "decision") {
      const inset = height * Math.abs(fraction - 0.5);
      y += input ? inset : -inset;
    } else if (shape === "io") {
      x = (input ? 18 : 0) + (width - 18) * fraction;
    } else if (shape === "message" && input) {
      x = Math.min(x, width - 18);
    }
    return { x: node.x + x, y: node.y + y };
  }
  let x = input ? 0 : width;
  if (shape === "decision") {
    const inset = width * Math.abs(fraction - 0.5);
    x += input ? inset : -inset;
  } else if (shape === "io") {
    x += input ? 18 * (1 - fraction) : -18 * fraction;
  }
  return { x: node.x + x, y: node.y + height * fraction };
}

/**
 * Swap diagram axes while keeping shapes upright and preserving separation between shapes.
 * @param {import("./index.js").Graph} graph
 * @param {import("./index.js").FlowDirection} direction
 * @returns {import("./index.js").Graph}
 */
export function orientFlowGraph(graph, direction) {
  if (direction !== "horizontal" && direction !== "vertical") throw new Error("Invalid flowchart direction.");
  if ((graph.direction ?? "horizontal") === direction) return graph;
  if (!graph.nodes.length) return { ...graph, direction };
  const items = graph.nodes.map((node) => ({ node, ...nodeSize(node, undefined, true) }));
  const aspect = 1.5;

  function swapAxis(from, to, fromSize, toSize, scale) {
    const ordered = [...items].sort((a, b) => a.node[from] - b.node[from]);
    const origin = items.reduce((min, { node }) => Math.min(min, node[to]), Infinity);
    const positions = new Map();
    for (const [index, item] of ordered.entries()) {
      const start = item.node[from];
      let position = origin + (start - ordered[0].node[from]) * scale;
      for (let i = 0; i < index; i++) {
        const previous = ordered[i];
        const gap = start - (previous.node[from] + previous[fromSize]);
        if (gap >= 0) {
          position = Math.max(position, positions.get(previous.node.id) + previous[toSize] + Math.min(12, gap));
        }
      }
      positions.set(item.node.id, position);
    }
    return positions;
  }

  const x = swapAxis("y", "x", "height", "width", aspect);
  const y = swapAxis("x", "y", "width", "height", 1 / aspect);
  return { ...graph, direction, nodes: graph.nodes.map((node) => ({ ...node, x: x.get(node.id), y: y.get(node.id) })) };
}

export function arrowPath({ x, y }, direction, from = undefined) {
  if (from) {
    const dx = x - from.x;
    const dy = y - from.y;
    const length = Math.hypot(dx, dy);
    if (length < 12) return "";
    const ux = dx / length;
    const uy = dy / length;
    const bx = x - 12 * ux;
    const by = y - 12 * uy;
    return `M${bx - 4 * uy} ${by + 4 * ux} L${x - 4 * ux} ${y - 4 * uy} L${bx + 4 * uy} ${by - 4 * ux} Z`;
  }
  return direction === "vertical"
    ? `M${x - 4} ${y - 12} L${x} ${y - 4} L${x + 4} ${y - 12} Z`
    : `M${x - 12} ${y - 4} L${x - 4} ${y} L${x - 12} ${y + 4} Z`;
}

export function wirePath(from, to, direction = "horizontal") {
  const vertical = direction === "vertical";
  const x = vertical ? from.y : from.x;
  const y = vertical ? from.x : from.y;
  const endX = vertical ? to.y : to.x;
  const endY = vertical ? to.x : to.y;
  const point = (a, b) => vertical ? `${b} ${a}` : `${a} ${b}`;
  if (endX < x - 20) {
    const bend = Math.max(y, endY) + 66;
    const middle = (x + endX) / 2;
    return `M ${point(x, y)} C ${point(x + 62, y)}, ${point(x + 62, bend)}, ${point(middle, bend)}
      C ${point(endX - 62, bend)}, ${point(endX - 62, endY)}, ${point(endX, endY)}`;
  }
  const bend = Math.max(32, (endX - x) * 0.45);
  return `M ${point(x, y)} C ${point(x + bend, y)}, ${point(endX - bend, endY)}, ${point(endX, endY)}`;
}

export function graphBounds(items, diagram = false) {
  if (!items.length) return { x: 0, y: 0, width: nodeWidth, height: 140 };
  let left = Infinity;
  let top = Infinity;
  let right = -Infinity;
  let bottom = -Infinity;
  for (const { node, ports } of items) {
    const { width, height } = nodeSize(node, ports, diagram);
    left = Math.min(left, node.x);
    top = Math.min(top, node.y);
    right = Math.max(right, node.x + width);
    bottom = Math.max(bottom, node.y + height);
  }
  return { x: left, y: top, width: right - left, height: bottom - top };
}
