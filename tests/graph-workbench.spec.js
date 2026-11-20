import { readFile } from "node:fs/promises";
import { expect, test } from "@playwright/test";
import { connectGraphNodes, createGraph, createGraphNode, orientFlowGraph, parseGraph, runGraph } from "../src/lib/graph/index.js";
import { flowObstacles, routeFlowWire } from "../src/lib/graph/flow-routing.js";
import { flowPortPoint } from "../src/lib/graph/geometry.js";
import { getPorts } from "../src/lib/graph/node-types.js";

test("the graph runner orders dependencies and rejects invalid or circular data links", () => {
  const options = { nodeTypes: {
    double: {
      title: "Double",
      inputs: [{ id: "value", label: "Value", type: "number", defaultValue: 2 }],
      outputs: [{ id: "result", label: "Result", type: "number" }],
      run: ({ value }) => ({ result: value * 2 }),
    },
  } };
  const add = (type, id, data) => createGraphNode(type, { id, data }, options.nodeTypes);
  const connect = (graph, source, sourcePort, target, targetPort) =>
    connectGraphNodes(graph, { source, sourcePort, target, targetPort }, options.nodeTypes);
  const graph = {
    ...createGraph(),
    nodes: [add("graph-output", "out"), add("double", "second"), add("double", "first"), add("text", "label")],
  };
  const ordered = connect(connect(graph, "first", "result", "second", "value"), "second", "result", "out", "value");
  expect(runGraph(parseGraph(JSON.stringify(ordered), options.nodeTypes), options).outputs).toEqual({ out: 8 });
  expect(() => connect(ordered, "label", "value", "second", "value")).toThrow("Cannot connect text to number");
  expect(() => runGraph(connect(ordered, "second", "result", "first", "value"), options)).toThrow("circular data connection");
  expect(() => parseGraph(JSON.stringify({ ...ordered, edges: [...ordered.edges, ordered.edges[0]] }), options.nodeTypes)).toThrow("duplicate connection ID");
});

test("flowchart connectors take a right-angle detour around a shape", () => {
  const nodes = [0, 240, 480].map((x) => createGraphNode("process", { x }));
  const items = nodes.map((node) => ({ node, ports: getPorts(node) }));
  const obstacles = flowObstacles(items);
  const from = flowPortPoint(nodes[0], items[0].ports, 0, "output");
  const to = flowPortPoint(nodes[2], items[2].ports, 0, "input");
  const { path } = routeFlowWire(from, to, obstacles[0], obstacles[2], obstacles);
  expect(path).toMatch(/L \d+ (-12|84) L \d+ \1/);
  expect(path).not.toContain(" C ");

  const vertical = orientFlowGraph({ ...createGraph(), nodes }, "vertical");
  const column = vertical.nodes.map((node) => ({ node, ports: getPorts(node) }));
  const verticalObstacles = flowObstacles(column, "vertical");
  const start = flowPortPoint(column[0].node, column[0].ports, 0, "output", "vertical");
  const end = flowPortPoint(column[2].node, column[2].ports, 0, "input", "vertical");
  const verticalWire = routeFlowWire(start, end, verticalObstacles[0], verticalObstacles[2], verticalObstacles, "vertical");
  expect(start).toEqual({ x: 80, y: 72 });
  expect(end).toEqual({ x: 80, y: 320 });
  expect(verticalWire.path).toMatch(/L (-12|172) \d+ L \1 \d+/);
  expect(verticalWire.path).not.toContain(" C ");
});

test("changing flowchart direction keeps resized shapes from overlapping", () => {
  const first = createGraphNode("process", { width: 112, height: 250 });
  const next = createGraphNode("process", { x: 130, width: 112 });
  const horizontal = { ...createGraph(), nodes: [first, next] };
  const vertical = orientFlowGraph(horizontal, "vertical");
  expect(vertical.nodes[1].x).toBe(vertical.nodes[0].x);
  expect(vertical.nodes[1].y).toBeGreaterThanOrEqual(vertical.nodes[0].y + first.height);
  expect(horizontal.nodes[1]).toMatchObject({ x: 130, y: 0 });
  expect(parseGraph(JSON.stringify(vertical)).direction).toBe("vertical");
});

test("the component gallery opens a runnable blueprint and preserves parent links through undo", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator("html")).toHaveClass(/\b(?:light|dark)\b/);
  const tabs = page.getByRole("tablist", { name: "Component categories" });
  const blueprint = tabs.getByRole("tab", { name: "Blueprint" });
  await blueprint.click();
  await expect(blueprint).toHaveAttribute("aria-selected", "true");
  await expect(page).toHaveURL(/\/\?tab=blueprint$/);

  const result = page.getByRole("region", { name: "Run output" });
  await page.getByRole("button", { name: "Run graph" }).click();
  await expect(result).toContainText("144");
  await expect(result).toContainText("true");
  await page.getByRole("button", { name: "Open Calculate subtotal" }).click();
  await expect(page.getByRole("navigation", { name: "Graph path" })).toContainText(/Order value\s*\/\s*Calculate subtotal/);

  await page.getByRole("button", { name: "Select Subtotal" }).click();
  await page.getByRole("button", { name: "Delete node" }).click();
  await page.getByRole("button", { name: "Order value", exact: true }).click();
  await expect(page.getByRole("button", { name: "Calculate subtotal output: Subtotal" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Select connection from Calculate subtotal to Order total" })).toHaveCount(0);
  await page.getByRole("button", { name: "Undo", exact: true }).click();
  await expect(page.getByRole("button", { name: "Select connection from Calculate subtotal to Order total" })).toHaveCount(1);
  await page.getByRole("button", { name: "Run graph" }).click();
  await expect(result).toContainText("144");
  await tabs.getByRole("tab", { name: "Form", exact: true }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole("heading", { name: "Form Components" })).toBeVisible();
  expect(errors).toEqual([]);
});

test("flowchart direction updates the layout and persists for each graph level", async ({ page }) => {
  await page.goto("/?tab=flowchart", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Load conversation example" }).click();
  const controls = page.getByRole("group", { name: "Flowchart direction" });
  const horizontal = controls.getByRole("button", { name: "Horizontal" });
  const vertical = controls.getByRole("button", { name: "Vertical" });
  const startOutput = page.getByRole("button", { name: "Start chat output: Next" });
  const start = page.getByRole("button", { name: "Select Start chat" });
  const welcome = page.getByRole("button", { name: "Select Welcome customer" });
  await expect(horizontal).toHaveAttribute("aria-pressed", "true");
  await expect(startOutput).toHaveCSS("left", "160px");
  expect((await welcome.boundingBox()).x).toBeGreaterThan((await start.boundingBox()).x);

  await vertical.click();
  await expect(vertical).toHaveAttribute("aria-pressed", "true");
  await expect(startOutput).toHaveCSS("top", "72px");
  expect((await welcome.boundingBox()).y).toBeGreaterThan((await start.boundingBox()).y);

  await page.getByRole("button", { name: "Undo", exact: true }).click();
  await expect(horizontal).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Redo", exact: true }).click();
  await expect(vertical).toHaveAttribute("aria-pressed", "true");

  await page.getByRole("button", { name: "Open Billing help" }).click();
  await expect(horizontal).toHaveAttribute("aria-pressed", "true");
  await vertical.click();
  await page.getByRole("button", { name: "Support conversation", exact: true }).click();
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("button", { name: "Export", exact: true }).click(),
  ]);
  const exported = parseGraph(await readFile(await download.path(), "utf8"));
  expect(exported.direction).toBe("vertical");
  expect(exported.nodes.find((node) => node.graph).graph.direction).toBe("vertical");

  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(vertical).toHaveAttribute("aria-pressed", "true");
  await horizontal.click();
  await expect(startOutput).toHaveCSS("left", "160px");
  await page.getByRole("button", { name: "Open Billing help" }).click();
  await expect(vertical).toHaveAttribute("aria-pressed", "true");
});

test("build, export and embed a flowchart with a loop", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator("html")).toHaveClass(/\b(?:light|dark)\b/);
  const tab = page.getByRole("tablist", { name: "Component categories" }).getByRole("tab", { name: "Flowchart" });
  await tab.click();
  await expect(tab).toHaveAttribute("aria-selected", "true");
  await expect(page).toHaveURL(/\/\?tab=flowchart$/);
  await page.getByRole("button", { name: "Load conversation example" }).click();
  await expect(page.getByRole("button", { name: "Billing question? output: Yes", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Billing question? output: No", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Select Billing question?", exact: true }).click();
  await expect(page.locator('.s-flow-node[data-shape="decision"] polygon')).toHaveCount(1);
  await page.getByRole("button", { name: "Resize Billing question?", exact: true }).press("ArrowRight");
  await expect(page.getByRole("spinbutton", { name: "Width" })).toHaveValue("168");
  const question = page.getByLabel("Question text");
  await expect(question).toHaveValue("Are you contacting us about a bill or a payment?");
  await question.fill("Do you need help with a payment?");
  await question.press("Tab");
  await page.getByRole("button", { name: "Open Billing help" }).click();
  await page.getByRole("button", { name: "Select Request invoice ID" }).click();
  await expect(page.getByLabel("Message text")).toHaveValue("What is the invoice number on your billing statement?");

  await page.getByRole("button", { name: "New graph" }).click();
  const canvas = page.getByRole("region", { name: "Graph canvas" });
  const area = await canvas.boundingBox();
  for (const [name, x] of [["Add Start", 140], ["Add Process", 420]]) {
    const source = await page.getByRole("button", { name }).boundingBox();
    await page.mouse.move(source.x + source.width / 2, source.y + source.height / 2);
    await page.mouse.down();
    await page.mouse.move(area.x + x, area.y + 155, { steps: 5 });
    await page.mouse.up();
  }
  const process = page.getByRole("button", { name: "Select Process", exact: true });
  const original = await process.boundingBox();
  await page.mouse.move(original.x + 20, original.y + 15);
  await page.mouse.down();
  await page.mouse.move(original.x + 75, original.y + 80, { steps: 5 });
  await page.mouse.up();
  expect((await process.boundingBox()).x).toBeGreaterThan(original.x + 30);
  const resizer = await page.getByRole("button", { name: "Resize Process" }).boundingBox();
  await page.mouse.move(resizer.x + resizer.width / 2, resizer.y + resizer.height / 2);
  await page.mouse.down();
  await page.mouse.move(resizer.x + 50, resizer.y + 35, { steps: 5 });
  await page.mouse.up();
  expect((await process.boundingBox()).width).toBeGreaterThan(original.width + 30);
  await page.getByRole("button", { name: "Start output: Next" })
    .dragTo(page.getByRole("button", { name: "Process input: In" }));
  await expect(page.getByRole("button", { name: "Select connection from Start to Process" })).toHaveCount(1);

  await page.getByRole("button", { name: "Process output: Next" }).press("Enter");
  await page.getByRole("button", { name: "Process input: In" }).press("Enter");
  await expect(page.getByRole("button", { name: "Select connection from Process to Process" })).toHaveCount(1);
  await page.getByRole("button", { name: "Zoom in", exact: true }).click();
  await expect(page.getByText("120%", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Fit graph to canvas" }).click();

  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("button", { name: "Export", exact: true }).click(),
  ]);
  expect(download.suggestedFilename()).toBe("untitled-flowchart.json");

  const [chooser] = await Promise.all([
    page.waitForEvent("filechooser"),
    page.getByRole("button", { name: "Embed JSON" }).click(),
  ]);
  await chooser.setFiles(await download.path());
  await page.getByRole("button", { name: "Open Untitled flowchart" }).click();
  await expect(page.getByRole("button", { name: "Select connection from Process to Process" })).toHaveCount(1);
  await expect(page.getByText("Embedded Untitled flowchart.", { exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByRole("button", { name: "Open Untitled flowchart" })).toBeVisible();
});
