# MermaidChart

Renders Mermaid definitions as SVG in the browser. Install `mermaid@^12.3.0` alongside `svelte-multistyle-ui`.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `source` | string | `""` | Plain Mermaid syntax. The SVG updates when this changes. |
| `title` | string | `""` | Optional visible caption and accessible figure name. |
| `diagramTheme` | Mermaid theme name | `"default"` in light mode, `"dark"` in dark mode | Controls the rendered SVG theme. For example, use `"neutral"` or `"forest"`. |
| `style`, `theme`, `class` | string | global style and theme, empty class | Controls the wrapper’s style and color palette. |

The component renders after mounting and displays an inline error when Mermaid rejects the source. It uses Mermaid’s strict security mode.

```svelte
<script>
  import { MermaidChart } from 'svelte-multistyle-ui';

  let source = $state('sequenceDiagram\n  Customer->>Support: Open a ticket\n  Support-->>Customer: Confirm receipt');
</script>

<MermaidChart {source} title="Support sequence" />
```

The **Charts** tab in the gallery has editable flowchart, sequence diagram, and pie chart examples.
