# InlineEdit

Displays dotted-underlined text in a paragraph. Click the text, or focus it and press Enter or Space, to edit it in place. The field keeps the same height for the same text, uses the selected style’s field borders, and grows in multiline mode as the text wraps or gains lines.

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `value` | string | `""` | Committed text. Supports `bind:value`. |
| `variant` | `"single-line" \| "multiline"` | `"single-line"` | Selects an input or textarea. |
| `aria-label` | string | `"text"` | Accessible name for the field. |
| `rows` | number | `3` | Minimum visible lines in multiline mode. |
| `maxlength` | number | unset | Native character limit. |
| `disabled` | boolean | `false` | Displays read-only text. |
| `onUpdate` | `(value: string, previousValue: string) => void` | unset | Called when a changed draft is committed. |
| `style`, `theme`, `class` | string | global style and theme, empty class | Optional wrapper styling. |

Blur commits the draft. Enter blurs a single-line input. In a textarea, Enter inserts a newline and Ctrl/⌘+Enter commits. Escape discards the draft. Use `bind:value` for local state and `onUpdate` for actions such as persisting the committed value.

```svelte
<script>
  import { InlineEdit } from 'svelte-multistyle-ui';
  let notes = $state('Review the new layout.');
</script>

<InlineEdit variant="multiline" aria-label="Release notes" bind:value={notes} rows={2} />
```
