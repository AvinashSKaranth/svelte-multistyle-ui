# CodeEditor

Edits or displays syntax-highlighted code with a language badge and a clipboard copy control. For rich text, see [TextEditor](TextEditor.md).

| Prop | Type | Default | Notes |
|---|---|---|---|
| `value` | string | `""` | Source text. Supports `bind:value`. |
| `language` | string | `"javascript"` | Built-in languages include `javascript`, `typescript`, `markup`, `css`, `json`, `svelte`, `bash`, and `python`. |
| `editable` | boolean | `true` | Set to `false` for a code sample with copy support. |
| `label` | string | `""` | Optional visible label and default accessible name for the editable textarea. |
| `rows` | number | `10` | Controls the code viewport height. |
| `style`, `theme`, `class` | string | global style and theme, empty class | Optional wrapper styling. |

Extra attributes are forwarded to the editable textarea.

```svelte
<script>
  import { CodeEditor } from 'svelte-multistyle-ui';
  let source = $state('{"enabled": true}');
</script>

<CodeEditor language="json" label="Configuration" bind:value={source} rows={6} />
```
