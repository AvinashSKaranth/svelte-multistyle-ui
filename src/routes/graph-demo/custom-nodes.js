const nodeTypes = {
  assignAgent: {
    title: "Assign agent",
    category: "Flowchart",
    inputs: [{ id: "in", label: "In", type: "flow" }],
    outputs: [{ id: "next", label: "Next", type: "flow" }],
    data: { text: "Send this conversation to an available agent." },
    fields: [{ key: "text", label: "Handoff message", type: "text" }],
  },
  doubleValue: {
    title: "Double value",
    category: "Custom",
    inputs: [{ id: "value", label: "Value", type: "number", defaultValue: 2 }],
    outputs: [{ id: "result", label: "Result", type: "number" }],
    run: ({ value }) => ({ result: value * 2 }),
  },
};

export default nodeTypes;
