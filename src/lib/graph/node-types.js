const port = (id, label, type, defaultValue) => ({ id, label, type, defaultValue });
const flowIn = [port("in", "In", "flow")];
const flowOut = [port("out", "Next", "flow")];
const branches = [port("yes", "Yes", "flow"), port("no", "No", "flow")];
const numberField = { key: "value", label: "Value", type: "number" };

/** Built-in node definitions. Custom definitions use the same port and run contract. */
/** @type {import("./index.js").NodeTypes} */
export const graphNodeTypes = {
  start: { title: "Start", category: "Flowchart", tone: "event", outputs: flowOut },
  process: { title: "Process", category: "Flowchart", tone: "operation", inputs: flowIn, outputs: flowOut },
  decision: {
    title: "Decision", category: "Flowchart", tone: "condition", inputs: flowIn,
    outputs: branches,
  },
  end: { title: "End", category: "Flowchart", tone: "event", inputs: flowIn },
  message: {
    title: "Message", category: "Flowchart", tone: "text", inputs: flowIn, outputs: flowOut,
    data: { text: "" }, fields: [{ key: "text", label: "Message text", type: "text" }],
  },
  question: {
    title: "Question", category: "Flowchart", tone: "condition", inputs: flowIn, outputs: branches,
    data: { text: "" }, fields: [{ key: "text", label: "Question text", type: "text" }],
  },
  number: {
    title: "Number", category: "Values", tone: "number", data: { value: 0 }, fields: [numberField],
    outputs: [port("value", "Value", "number")], run: (_, data) => ({ value: data.value }),
  },
  text: {
    title: "Text", category: "Values", tone: "text", data: { value: "" },
    fields: [{ key: "value", label: "Value", type: "text" }],
    outputs: [port("value", "Value", "text")], run: (_, data) => ({ value: data.value }),
  },
  boolean: {
    title: "Boolean", category: "Values", tone: "condition", data: { value: false },
    fields: [{ key: "value", label: "Value", type: "boolean" }],
    outputs: [port("value", "Value", "boolean")], run: (_, data) => ({ value: data.value }),
  },
  add: {
    title: "Add", category: "Operations", tone: "operation",
    inputs: [port("a", "A", "number", 0), port("b", "B", "number", 0)],
    outputs: [port("result", "Sum", "number")], run: ({ a, b }) => ({ result: a + b }),
  },
  multiply: {
    title: "Multiply", category: "Operations", tone: "operation",
    inputs: [port("a", "A", "number", 0), port("b", "B", "number", 0)],
    outputs: [port("result", "Product", "number")], run: ({ a, b }) => ({ result: a * b }),
  },
  greater: {
    title: "Greater than", category: "Operations", tone: "condition",
    inputs: [port("a", "A", "number", 0), port("b", "B", "number", 0)],
    outputs: [port("result", "Result", "boolean")], run: ({ a, b }) => ({ result: a > b }),
  },
  select: {
    title: "Select value", category: "Operations", tone: "condition",
    inputs: [port("when", "Condition", "boolean", false), port("yes", "If true", "any"), port("no", "If false", "any")],
    outputs: [port("result", "Value", "any")], run: ({ when, yes, no }) => ({ result: when ? yes : no }),
  },
  subgraph: { title: "Subgraph", category: "Graphs", tone: "graph" },
  "graph-input": { title: "Graph input", category: "Graphs", tone: "graph", data: { portType: "any" } },
  "graph-output": { title: "Graph output", category: "Graphs", tone: "graph", data: { portType: "any" } },
};

/** @param {string} type @param {import("./index.js").NodeTypes} [nodeTypes] */
export function getDefinition(type, nodeTypes = graphNodeTypes) {
  if (Object.hasOwn(nodeTypes, type)) return nodeTypes[type];
  return Object.hasOwn(graphNodeTypes, type) ? graphNodeTypes[type] : undefined;
}

/** @param {import("./index.js").GraphNode} node
 * @param {import("./index.js").NodeTypes} [nodeTypes] */
export function getPorts(node, nodeTypes) {
  if (node.type === "subgraph") {
    const boundary = (type) => node.graph?.nodes.filter((item) => item.type === type)
      .map((item) => port(item.id, item.title, item.data.portType, item.data.value)) ?? [];
    return { inputs: boundary("graph-input"), outputs: boundary("graph-output") };
  }
  if (node.type === "graph-input") return { inputs: [], outputs: [port("value", "Value", node.data.portType)] };
  if (node.type === "graph-output") return { inputs: [port("value", "Value", node.data.portType)], outputs: [] };
  const definition = getDefinition(node.type, nodeTypes);
  return { inputs: definition?.inputs ?? [], outputs: definition?.outputs ?? [] };
}
