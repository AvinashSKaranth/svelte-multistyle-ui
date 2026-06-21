// Pure string builders for the YAML -> Svelte page generator. No I/O here.
// All functions take already-parsed JS data (from js-yaml) and return strings.
import { registry } from "./registry.js";

const IND = "  "; // 2-space indent per depth level

// ---------------------------------------------------------------------------
// Top-level page
// ---------------------------------------------------------------------------

/**
 * @param {any} doc  parsed YAML object
 * @param {{style:string, theme:string, mode:string}} cfg  resolved page config
 * @returns {string} full .svelte file content
 */
export function emitPage(doc, cfg) {
  const used = new Set();
  const body = Array.isArray(doc?.body) ? doc.body : [];
  const bodyMarkup = emitBody(body, 0, used);
  const state = Array.isArray(doc?.state) ? doc.state : [];

  const sections = [
    emitImports(used),
    emitState(state),
    emitDarkEffect(cfg.mode),
    emitOnMount(),
  ].filter((s) => s.length);

  const scriptBody = sections.map((s) => s.join("\n")).join("\n\n");
  const out = `<script>\n${scriptBody}\n</script>\n` + (bodyMarkup ? `\n${bodyMarkup}\n` : "\n");
  return out;
}

// ---------------------------------------------------------------------------
// <script> sections (each returns an array of lines, no trailing newline)
// ---------------------------------------------------------------------------

function emitImports(used) {
  const components = [...used].sort();
  const lines = ['import { onMount } from "svelte";'];
  if (components.length) {
    lines.push(`import { ${components.join(", ")} } from "svelte-multistyle-ui";`);
  }
  // initMultistyleUI is intentionally NOT imported here — the consuming app
  // sets global style/theme/mode once in its layout, not per-page.
  return lines;
}

function emitState(state) {
  const lines = [];
  for (const entry of state) {
    if (!entry?.name) continue;
    lines.push(`  let ${entry.name} = $state(${defaultLiteral(entry)});`);
  }
  return lines;
}

function emitDarkEffect(mode) {
  // Self-contained dark/light handling. Reads OS preference only when mode==="system".
  // Independent of the library's internal `defaults` (not re-exported from the package root).
  const m = JSON.stringify(mode);
  return [
    `  const MODE = ${m};`,
    `  let systemDark = $state(false);`,
    ``,
    `  $effect(() => {`,
    `    if (MODE !== "system") return;`,
    `    const mq = window.matchMedia("(prefers-color-scheme: dark)");`,
    `    systemDark = mq.matches;`,
    `    const handler = (e) => (systemDark = e.matches);`,
    `    mq.addEventListener("change", handler);`,
    `    return () => mq.removeEventListener("change", handler);`,
    `  });`,
    ``,
    `  const isDarkMode = $derived(MODE === "dark" || (MODE === "system" && systemDark));`,
    ``,
    `  $effect(() => {`,
    `    const root = document.documentElement;`,
    `    root.classList.toggle("dark", isDarkMode);`,
    `    root.classList.toggle("light", !isDarkMode);`,
    `  });`,
  ];
}

function emitOnMount() {
  // Empty stub. initMultistyleUI belongs in the app layout, not the generated page.
  return [
    `  onMount(() => {`,
    `    // TODO: add setup logic here`,
    `  });`,
  ];
}

// ---------------------------------------------------------------------------
// Markup tree
// ---------------------------------------------------------------------------

/** @param {any[]} nodes @param {number} depth @param {Set<string>} used */
function emitBody(nodes, depth, used) {
  return nodes.map((n) => emitNode(n, depth, used)).filter(Boolean).join("\n");
}

/** @returns {string|null} */
function emitNode(node, depth, used) {
  const indent = IND.repeat(depth);
  // Plain string node => literal text.
  if (typeof node === "string") return indent + node;
  if (!node || typeof node !== "object") return null;
  // { text: "..." } leaf text node.
  if (typeof node.text === "string") return indent + node.text;

  const name = node.component;
  const entry = registry[name];
  if (!entry) return null; // schema should have caught this already
  used.add(name);

  const attrs = emitAttrs(node, entry);
  const attrStr = attrs ? ` ${attrs}` : "";
  const open = `${indent}<${name}${attrStr}`;

  switch (entry.kind) {
    case "leaf":
      return `${open} />`;

    case "children":
    case "container": {
      const children = node.children;
      if (children == null) return `${open} />`;
      if (typeof children === "string") return `${open}>${children}</${name}>`;
      if (Array.isArray(children)) {
        const inner = emitBody(children, depth + 1, used);
        if (!inner) return `${open} />`;
        return `${open}>\n${inner}\n${indent}</${name}>`;
      }
      return `${open} />`;
    }

    case "multi-snippet": {
      const snippets = entry.snippets || [];
      const blocks = snippets.map((sn) => {
        const content = node.snippets?.[sn];
        let inner = "";
        if (typeof content === "string") inner = `${IND.repeat(depth + 2)}${content}`;
        else if (Array.isArray(content)) inner = emitBody(content, depth + 2, used);
        return `${indent}${IND}{#snippet ${sn}()}\n${inner}\n${indent}${IND}{/snippet}`;
      });
      return `${open}>\n${blocks.join("\n")}\n${indent}</${name}>`;
    }

    default:
      return null;
  }
}

/** Build the attribute string (props + bind:) for a component node. */
function emitAttrs(node, entry) {
  const parts = [];
  if (node.props && typeof node.props === "object") {
    for (const [k, v] of Object.entries(node.props)) {
      const attr = emitProp(k, v);
      if (attr) parts.push(attr);
    }
  }
  if (node.bind != null) {
    if (typeof node.bind === "string") {
      const prop = entry.primaryBindable;
      if (prop) parts.push(`bind:${prop}={${node.bind}}`);
    } else if (typeof node.bind === "object") {
      for (const [prop, refName] of Object.entries(node.bind)) {
        if (typeof refName === "string") parts.push(`bind:${prop}={${refName}}`);
      }
    }
  }
  return parts.join(" ");
}

/** @returns {string|null} one Svelte attribute, e.g. `label="Hi"`, `value={count}`, `options={[...]}` */
function emitProp(key, value) {
  if (value === null || value === undefined) return null;
  if (typeof value === "string") {
    const ref = value.match(/^\{([A-Za-z_$][\w$]*)\}$/);
    if (ref) return `${key}={${ref[1]}}`; // reactive ref to a state var
    return `${key}=${JSON.stringify(value)}`; // plain string literal
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return `${key}={${JSON.stringify(value)}}`;
  }
  if (Array.isArray(value)) return `${key}={${jsValue(value)}}`;
  if (typeof value === "object") return `${key}={${jsValue(value)}}`;
  return null;
}

// ---------------------------------------------------------------------------
// JS literal coercion (for arrays / objects / scalars inside {})
// ---------------------------------------------------------------------------

/** @returns {string} a JS expression string equivalent to the parsed YAML value */
function jsValue(v) {
  if (v === null || v === undefined) return "null";
  if (typeof v === "string") return JSON.stringify(v);
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  if (Array.isArray(v)) return `[${v.map(jsValue).join(",")}]`;
  if (typeof v === "object") {
    const entries = Object.entries(v).map(([k, val]) => `${jsKey(k)}:${jsValue(val)}`);
    return `{${entries.join(",")}}`;
  }
  return "null";
}

function jsKey(k) {
  return /^[A-Za-z_$][\w$]*$/.test(k) ? k : JSON.stringify(k);
}

// ---------------------------------------------------------------------------
// state default coercion
// ---------------------------------------------------------------------------

function defaultLiteral(entry) {
  if (entry.default !== undefined) return jsValue(entry.default);
  switch (entry.type) {
    case "number": return "0";
    case "bool":
    case "boolean": return "false";
    case "array": return "[]";
    case "object": return "{}";
    default: return '""'; // string / unknown
  }
}