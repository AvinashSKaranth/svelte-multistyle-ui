import { createGraph, createGraphNode } from "$lib/graph/index.js";

function example(title, nodes, connections) {
  return {
    ...createGraph(title),
    nodes,
    edges: connections.map(([source, sourcePort, target, targetPort], index) => ({
      id: `wire-${index}`, source, sourcePort, target, targetPort,
    })),
  };
}

const node = (type, id, title, x, y, options) => createGraphNode(type, { id, title, x, y, ...options });
const boundary = (direction, id, title, x, y, portType = "number") =>
  node(`graph-${direction}`, id, title, x, y, { data: { portType } });

export function createBlueprintExample() {
  const subtotal = example("Calculate subtotal", [
    boundary("input", "unit", "Unit price", 0, 15),
    boundary("input", "count", "Quantity", 0, 155),
    node("multiply", "multiply", "Multiply", 272, 77),
    boundary("output", "subtotal", "Subtotal", 547, 77),
  ], [
    ["unit", "value", "multiply", "a"],
    ["count", "value", "multiply", "b"],
    ["multiply", "result", "subtotal", "value"],
  ]);

  return example("Order value", [
    node("number", "price", "Unit price", 0, 0, { data: { value: 48 } }),
    node("number", "quantity", "Quantity", 0, 136, { data: { value: 3 } }),
    node("number", "limit", "Review threshold", 249, 276, { data: { value: 100 } }),
    node("subgraph", "calculation", subtotal.title, 249, 44, { graph: subtotal }),
    node("greater", "comparison", "Greater than", 503, 216),
    boundary("output", "total", "Order total", 753, 45),
    boundary("output", "flag", "Needs review", 753, 218, "boolean"),
  ], [
    ["price", "value", "calculation", "unit"],
    ["quantity", "value", "calculation", "count"],
    ["calculation", "subtotal", "total", "value"],
    ["calculation", "subtotal", "comparison", "a"],
    ["limit", "value", "comparison", "b"],
    ["comparison", "result", "flag", "value"],
  ]);
}

export function createFlowchartExample() {
  const billing = example("Billing help", [
    boundary("input", "enter", "Billing request", 0, 30, "flow"),
    node("message", "invoice", "Request invoice ID", 235, 30, {
      data: { text: "What is the invoice number on your billing statement?" },
    }),
    node("message", "options", "Share billing options", 470, 30, {
      data: { text: "I can help explain a charge or connect you with billing support." },
    }),
    boundary("output", "resolved", "Billing response", 705, 30, "flow"),
  ], [
    ["enter", "value", "invoice", "in"],
    ["invoice", "out", "options", "in"],
    ["options", "out", "resolved", "value"],
  ]);

  return example("Support conversation", [
    node("start", "start", "Start chat", 0, 126),
    node("message", "welcome", "Welcome customer", 218, 126, {
      data: { text: "Hi! I can help with your account, billing, or technical support." },
    }),
    node("question", "question", "Billing question?", 436, 126, {
      data: { text: "Are you contacting us about a bill or a payment?" },
    }),
    node("subgraph", "billing", billing.title, 660, 26, { graph: billing }),
    node("message", "handoff", "Connect to support", 660, 250, {
      data: { text: "I'll connect you with a member of our support team." },
    }),
    node("end", "end", "Close chat", 887, 126),
  ], [
    ["start", "out", "welcome", "in"],
    ["welcome", "out", "question", "in"],
    ["question", "yes", "billing", "enter"],
    ["question", "no", "handoff", "in"],
    ["billing", "resolved", "end", "in"],
    ["handoff", "out", "end", "in"],
  ]);
}
