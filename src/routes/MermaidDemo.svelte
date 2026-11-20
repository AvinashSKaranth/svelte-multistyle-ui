<script>
  import Card from "$lib/components/Card.svelte";
  import CodeEditor from "$lib/components/CodeEditor.svelte";
  import MermaidChart from "$lib/components/charts/MermaidChart.svelte";

  let { style, theme } = $props();

  const examples = {
    flowchart: {
      label: "Flowchart",
      source: "flowchart LR\n  A[Request] --> B{Approved?}\n  B -->|Yes| C[Ship]\n  B -->|No| D[Revise]",
    },
    sequence: {
      label: "Sequence diagram",
      source: "sequenceDiagram\n  participant Customer\n  participant Support\n  Customer->>Support: Open a ticket\n  Support-->>Customer: Confirm receipt",
    },
    pie: {
      label: "Pie chart",
      source: 'pie showData\n  "Completed" : 55\n  "In progress" : 30\n  "Planned" : 15',
    },
  };
  let example = $state("flowchart");
  let source = $state(examples.flowchart.source);
  const usage = $derived(`<script>
  import { MermaidChart } from 'svelte-multistyle-ui';
  import 'svelte-multistyle-ui/theme.css';

  const source = ${JSON.stringify(examples[example].source)};
<\/script>

<MermaidChart {source} title="${examples[example].label}" />`);

  function selectExample(event) {
    example = event.currentTarget.value;
    source = examples[example].source;
  }
</script>

<Card {style} {theme} elevated class="mb-6 space-y-4">
  <h3 class="demo-section-title text-xl font-semibold">Mermaid Chart</h3>
  <label>
    Diagram example
    <select value={example} onchange={selectExample}>
      {#each Object.entries(examples) as [id, sample]}
        <option value={id}>{sample.label}</option>
      {/each}
    </select>
  </label>
  <div class="mermaid-example">
    <CodeEditor {style} {theme} bind:value={source} label="Mermaid source" language="mermaid" rows={8} />
    <MermaidChart {style} {theme} {source} title="Diagram preview" />
  </div>
  <details>
    <summary>Usage example</summary>
    <CodeEditor {style} {theme} value={usage} language="svelte" editable={false} rows={usage.split("\n").length} />
  </details>
</Card>

<style>
  label { display: flex; flex-wrap: wrap; align-items: center; gap: 0.6rem; font-weight: 600; }
  select {
    padding: 0.4rem 0.6rem;
    border: var(--t-border-width) solid var(--t-border);
    border-radius: var(--t-input-radius);
    background: var(--t-surface);
    color: var(--t-text);
  }
  .mermaid-example { display: grid; gap: 1rem; grid-template-columns: minmax(0, 1fr); align-items: start; }
  @media (min-width: 800px) { .mermaid-example { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  summary { margin-block: 0.75rem; cursor: pointer; }
</style>
