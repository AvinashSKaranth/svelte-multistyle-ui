import { nodeSize } from "./geometry.js";

const clearance = 12;
const bendPenalty = 16;

const swap = ({ x, y }) => ({ x: y, y: x });

// The routing algorithm always moves along +X. Vertical flow swaps the axes.
export function flowObstacles(items, direction = "horizontal", diagram = true) {
  return items.map(({ node, ports }) => {
    const { width, height } = nodeSize(node, ports, diagram);
    const vertical = direction === "vertical";
    const { x, y } = vertical ? swap(node) : node;
    return {
      id: node.id,
      left: x - clearance,
      right: x + (vertical ? height : width) + clearance,
      top: y - clearance,
      bottom: y + (vertical ? width : height) + clearance,
    };
  });
}

function crosses(a, b, rect) {
  if (a.y === b.y) {
    return a.y > rect.top && a.y < rect.bottom &&
      Math.max(a.x, b.x) > rect.left && Math.min(a.x, b.x) < rect.right;
  }
  return a.x > rect.left && a.x < rect.right &&
    Math.max(a.y, b.y) > rect.top && Math.min(a.y, b.y) < rect.bottom;
}

function compact(points) {
  const path = [];
  for (const point of points) {
    const previous = path.at(-1);
    if (previous?.x === point.x && previous.y === point.y) continue;
    const before = path.at(-2);
    if (before && ((before.x === previous.x && previous.x === point.x &&
      (previous.y - before.y) * (point.y - previous.y) >= 0) ||
      (before.y === previous.y && previous.y === point.y &&
      (previous.x - before.x) * (point.x - previous.x) >= 0))) {
      path.pop();
    }
    path.push(point);
  }
  return path;
}

const pathData = (points) => points.map(({ x, y }, index) => `${index ? "L" : "M"} ${x} ${y}`).join(" ");

export function flowDraft(from, to, direction = "horizontal") {
  const vertical = direction === "vertical";
  if (vertical) [from, to] = [swap(from), swap(to)];
  const middle = (from.x + to.x) / 2;
  const points = compact([from, { x: middle, y: from.y }, { x: middle, y: to.y }, to]);
  return pathData(vertical ? points.map(swap) : points);
}

/** Route right-angle connectors through clear vertical channels or around obstructing nodes. */
export function routeFlowWire(from, to, source, target, obstacles, direction = "horizontal") {
  const vertical = direction === "vertical";
  if (vertical) [from, to] = [swap(from), swap(to)];
  const start = { x: source.right, y: from.y };
  const end = { x: target.left, y: to.y };
  const middle = (start.x + end.x) / 2;
  const columns = [...new Set([middle, start.x, end.x, ...obstacles.flatMap((rect) => [rect.left, rect.right])])];
  const rows = [...new Set(obstacles.flatMap((rect) => [rect.top, rect.bottom]))];
  const clear = (a, b) => !obstacles.some((rect) => crosses(a, b, rect));
  let best;
  let bestScore = Infinity;

  function consider(points) {
    if (!points.slice(1).every((point, index) => clear(points[index], point))) return;
    const route = compact([from, ...points, to]);
    const length = route.slice(1).reduce((total, point, index) =>
      total + Math.abs(point.x - route[index].x) + Math.abs(point.y - route[index].y), 0);
    const score = length + route.length * bendPenalty;
    if (score < bestScore) {
      bestScore = score;
      best = route;
    }
  }

  if (start.x <= end.x) {
    for (const x of columns) {
      if (x >= start.x && x <= end.x) consider([start, { x, y: start.y }, { x, y: end.y }, end]);
    }
  }

  if (!best) {
    const startExits = columns.filter((x) => x >= start.x && clear(start, { x, y: start.y }));
    const endExits = columns.filter((x) => x <= end.x && clear(end, { x, y: end.y }));
    for (const y of rows) {
      const starts = startExits.filter((x) => clear({ x, y: start.y }, { x, y }));
      const ends = endExits.filter((x) => clear({ x, y: end.y }, { x, y }));
      for (const x1 of starts) {
        for (const x2 of ends) {
          consider([start, { x: x1, y: start.y }, { x: x1, y }, { x: x2, y }, { x: x2, y: end.y }, end]);
        }
      }
    }
  }

  // Shapes can overlap while dragging. Keep the edge visible until there is a clear route.
  const fallback = Math.max(source.bottom, target.bottom);
  const points = best ?? compact([from, start, { x: start.x, y: fallback },
    { x: end.x, y: fallback }, end, to]);
  return {
    path: pathData(vertical ? points.map(swap) : points),
    label: vertical ? { x: from.y + 8, y: start.x - 3 } : { x: start.x - 4, y: from.y - 10 },
  };
}
