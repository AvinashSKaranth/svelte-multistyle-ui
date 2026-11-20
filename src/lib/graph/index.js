import { getDefinition, getPorts, graphNodeTypes } from "./node-types.js";

export { graphNodeTypes };
export { orientFlowGraph } from "./geometry.js";

/** @typedef {{ id: string, label: string, type: string, defaultValue?: unknown }} GraphPort */
/** @typedef {{ key: string, label: string, type: "number" | "text" | "boolean" }} GraphField */
/** @typedef {{ title: string, category?: string, tone?: string, inputs?: GraphPort[], outputs?: GraphPort[], data?: Record<string, any>, fields?: GraphField[], run?: (inputs: Record<string, any>, data: Record<string, any>) => Record<string, unknown> }} NodeDefinition */
/** @typedef {Record<string, NodeDefinition>} NodeTypes */
/** @typedef {"horizontal" | "vertical"} FlowDirection */
/** @typedef {{ version: 1, title: string, direction?: FlowDirection, nodes: GraphNode[], edges: GraphEdge[] }} Graph */
/** @typedef {{ id: string, type: string, title: string, x: number, y: number, width?: number, height?: number, data: Record<string, any>, graph?: Graph }} GraphNode */
/** @typedef {"straight" | "curve" | "orthogonal"} GraphEdgeStyle */
/** @typedef {{ source: string, sourcePort: string, target: string, targetPort: string, style?: GraphEdgeStyle }} GraphConnection */
/** @typedef {GraphConnection & { id: string }} GraphEdge */

/** @type {Record<GraphEdgeStyle, string>} */
export const edgeStyles = { straight: "Straight", curve: "Curved", orthogonal: "Right-angle" };

/** @param {string} [title] @returns {Graph} */
export function createGraph(title = "Untitled graph") {
  return { version: 1, title, nodes: [], edges: [] };
}

export function createGraphId() {
  return Array.from(globalThis.crypto.getRandomValues(new Uint32Array(4)), (word) => word.toString(36)).join("-");
}

/**
 * @param {string} type
 * @param {{ x?: number, y?: number, width?: number, height?: number, id?: string, title?: string, data?: Record<string, any>, graph?: Graph }} [options]
 * @param {NodeTypes} [nodeTypes]
 * @returns {GraphNode}
 */
export function createGraphNode(type, options = {}, nodeTypes) {
  const definition = getDefinition(type, nodeTypes);
  if (!definition) throw new Error(`Unknown node type "${type}".`);
  const { x = 0, y = 0, width, height, id = createGraphId(), title = definition.title, data = {}, graph } = options;
  /** @type {GraphNode} */
  const node = { id, type, title, x, y, data: { ...structuredClone(definition.data ?? {}), ...data } };
  if (width !== undefined) node.width = width;
  if (height !== undefined) node.height = height;
  return type === "subgraph" ? { ...node, graph: graph ?? createGraph(title) } : node;
}

/** @param {Graph} graph @param {NodeTypes} [nodeTypes] */
function portIndex(graph, nodeTypes) {
  return new Map(graph.nodes.map((node) => [node.id, getPorts(node, nodeTypes)]));
}

/** @param {ReturnType<typeof portIndex>} ports @param {GraphConnection} edge */
function connectionPorts(ports, edge) {
  if (edge.style !== undefined && (typeof edge.style !== "string" || !Object.hasOwn(edgeStyles, edge.style))) {
    return { error: "Unknown connection style." };
  }
  const output = ports.get(edge.source)?.outputs.find((port) => port.id === edge.sourcePort);
  const input = ports.get(edge.target)?.inputs.find((port) => port.id === edge.targetPort);
  if (!output || !input) return { error: "The connection references a missing port." };
  const flow = output.type === "flow" || input.type === "flow";
  const compatible = output.type === input.type || (!flow && [output.type, input.type].includes("any"));
  if (!compatible) return { error: `Cannot connect ${output.type} to ${input.type}.` };
  if (!flow && edge.source === edge.target) return { error: "A data node cannot connect to itself." };
  return { flow };
}

/** @param {Graph} graph @param {GraphConnection} connection @param {NodeTypes} [nodeTypes] @returns {Graph} */
export function connectGraphNodes(graph, connection, nodeTypes) {
  const { error, flow } = connectionPorts(portIndex(graph, nodeTypes), connection);
  if (error) throw new Error(error);
  const sameInput = (edge) => edge.target === connection.target && edge.targetPort === connection.targetPort;
  if (graph.edges.some((edge) => sameInput(edge) && edge.source === connection.source && edge.sourcePort === connection.sourcePort)) {
    return graph;
  }
  const edges = flow ? graph.edges : graph.edges.filter((edge) => !sameInput(edge));
  return { ...graph, edges: [...edges, { ...connection, id: createGraphId() }] };
}

/** @param {Graph} graph @param {NodeTypes} [nodeTypes] @returns {Graph} */
export function pruneGraphEdges(graph, nodeTypes) {
  const ports = portIndex(graph, nodeTypes);
  const edges = graph.edges.filter((edge) => !connectionPorts(ports, edge).error);
  return edges.length === graph.edges.length ? graph : { ...graph, edges };
}

const isRecord = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
const isId = (value) => typeof value === "string" && value.trim().length > 0;

function checkPortValue(node, port, value) {
  if (value === undefined) return value;
  if ((port.type === "number" && !Number.isFinite(value)) ||
    (port.type === "text" && typeof value !== "string") ||
    (port.type === "boolean" && typeof value !== "boolean")) {
    throw new Error(`"${node.title}" port "${port.label}" expects ${port.type}.`);
  }
  return value;
}

/**
 * Parse and validate a JSON graph, including all nested levels and port references.
 * @param {string} json
 * @param {NodeTypes} [nodeTypes]
 * @returns {Graph}
 */
export function parseGraph(json, nodeTypes) {
  const graph = JSON.parse(json);

  function validate(item, path, depth) {
    if (depth > 64) throw new Error("Graphs may contain up to 64 levels of subgraphs.");
    if (!isRecord(item) || item.version !== 1 || typeof item.title !== "string" ||
      !Array.isArray(item.nodes) || !Array.isArray(item.edges)) {
      throw new Error(`${path} is not a version 1 graph.`);
    }
    if (item.direction !== undefined && item.direction !== "horizontal" && item.direction !== "vertical") {
      throw new Error(`${path} contains an invalid flowchart direction.`);
    }
    const nodeIds = new Set();
    for (const node of item.nodes) {
      if (!isRecord(node) || !isId(node.id) || nodeIds.has(node.id) || !isId(node.type) ||
        typeof node.title !== "string" || !Number.isFinite(node.x) || !Number.isFinite(node.y) || !isRecord(node.data)) {
        throw new Error(`${path} contains an invalid node or duplicate node ID.`);
      }
      const definition = getDefinition(node.type, nodeTypes);
      if (!definition) throw new Error(`${path} contains unknown node type "${node.type}".`);
      if ([node.width, node.height].some((unit) => unit !== undefined && (!Number.isFinite(unit) || unit <= 0))) {
        throw new Error(`${path} contains an invalid shape size.`);
      }
      nodeIds.add(node.id);
      for (const field of definition.fields ?? []) {
        const value = node.data[field.key];
        if (value === undefined) continue;
        const valid = field.type === "number" ? Number.isFinite(value) :
          typeof value === (field.type === "text" ? "string" : field.type);
        if (!valid) throw new Error(`${path} contains an invalid value for "${field.label}".`);
      }
      if (node.type === "subgraph") {
        validate(node.graph, `${path} / ${node.title}`, depth + 1);
      } else if (node.type === "graph-input" || node.type === "graph-output") {
        if (!isId(node.data.portType)) throw new Error(`${path} contains a graph port without a type.`);
      }
    }
    const ports = portIndex(item, nodeTypes);
    const edgeIds = new Set();
    const dataInputs = new Set();
    const connections = new Set();
    for (const edge of item.edges) {
      if (!isRecord(edge) || !isId(edge.id) || edgeIds.has(edge.id) ||
        ![edge.source, edge.sourcePort, edge.target, edge.targetPort].every(isId)) {
        throw new Error(`${path} contains an invalid connection or duplicate connection ID.`);
      }
      const { error, flow } = connectionPorts(ports, edge);
      if (error) throw new Error(`${path} / ${error}`);
      const inputKey = JSON.stringify([edge.target, edge.targetPort]);
      const linkKey = JSON.stringify([edge.source, edge.sourcePort, edge.target, edge.targetPort]);
      if (connections.has(linkKey) || (!flow && dataInputs.has(inputKey))) {
        throw new Error(`${path} contains a duplicate connection to an input.`);
      }
      edgeIds.add(edge.id);
      connections.add(linkKey);
      if (!flow) dataInputs.add(inputKey);
    }
  }

  validate(graph, "Graph", 0);
  return graph;
}

/**
 * Run a graph once in dependency order. Graph input and output values are keyed by
 * their boundary node IDs. Flowchart links are used for diagram layout.
 * @param {Graph} graph
 * @param {{ inputs?: Record<string, unknown>, nodeTypes?: NodeTypes }} [options]
 * @returns {{ outputs: Record<string, unknown>, values: Map<string, Record<string, unknown>> }}
 */
export function runGraph(graph, { inputs = {}, nodeTypes } = {}) {
  const ports = portIndex(graph, nodeTypes);
  const nodes = new Map(graph.nodes.map((node) => [node.id, node]));
  const incoming = new Map(graph.nodes.map(({ id }) => [id, new Map()]));
  const outgoing = new Map(graph.nodes.map(({ id }) => [id, []]));
  const degrees = new Map(graph.nodes.map(({ id }) => [id, 0]));

  for (const edge of graph.edges) {
    const { error, flow } = connectionPorts(ports, edge);
    if (error) throw new Error(error);
    if (flow) continue;
    if (incoming.get(edge.target).has(edge.targetPort)) throw new Error("A data input has more than one connection.");
    incoming.get(edge.target).set(edge.targetPort, edge);
    outgoing.get(edge.source).push(edge.target);
    degrees.set(edge.target, degrees.get(edge.target) + 1);
  }

  const order = [...degrees.keys()].filter((id) => degrees.get(id) === 0);
  for (const id of order) {
    for (const target of outgoing.get(id)) {
      const degree = degrees.get(target) - 1;
      degrees.set(target, degree);
      if (degree === 0) order.push(target);
    }
  }
  if (order.length !== nodes.size) throw new Error(`"${graph.title}" contains a circular data connection.`);

  const values = new Map();
  const outputs = new Map();
  for (const id of order) {
    const node = nodes.get(id);
    const definition = getDefinition(node.type, nodeTypes);
    if (!definition) throw new Error(`Unknown node type "${node.type}".`);
    const args = Object.fromEntries(ports.get(id).inputs.filter((port) => port.type !== "flow").map((port) => {
      const edge = incoming.get(id).get(port.id);
      const value = edge ? values.get(edge.source)[edge.sourcePort] : port.defaultValue;
      return [port.id, checkPortValue(node, port, value)];
    }));
    let result = {};
    if (node.type === "subgraph") {
      result = runGraph(node.graph, { inputs: args, nodeTypes }).outputs;
    } else if (node.type === "graph-input" && node.data.portType !== "flow") {
      result = { value: Object.hasOwn(inputs, id) ? inputs[id] : node.data.value };
    } else if (node.type === "graph-output" && node.data.portType !== "flow") {
      outputs.set(id, args.value);
    } else if (definition.run) {
      result = definition.run(args, { ...definition.data, ...node.data });
      if (!isRecord(result) || typeof result.then === "function") {
        throw new Error(`"${node.title}" must return a synchronous output object.`);
      }
    }
    values.set(id, Object.fromEntries(ports.get(id).outputs
      .filter((port) => port.type !== "flow")
      .map((port) => [port.id, checkPortValue(node, port, Object.hasOwn(result, port.id) ? result[port.id] : undefined)])));
  }
  return { outputs: Object.fromEntries(outputs), values };
}
