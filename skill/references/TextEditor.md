# TextEditor

Source: `src/lib/components/TextEditor.svelte` · styles: `texteditor-styles.css`

A WYSIWYG rich-text editor built on `contenteditable` with a configurable toolbar, link/image/video/table insertion dialogs, source HTML view, history (undo/redo), and keyboard shortcuts.

## Props

| Prop | Type | Default | Bindable | Notes |
|---|---|---|---|---|
| `value` | string | `""` | **yes** | HTML output; `bind:value` |
| `label` | string | `""` | — | label rendered above the editor |
| `placeholder` | string | `""` | — | shown when the editor is empty |
| `disabled` | boolean | `false` | — | makes the editor read-only |
| `rows` | number | `8` | — | minimum height in approximate line rows |
| `toolbar` | array | `undefined` | — | custom toolbar config; falls back to a full default toolbar |
| `class` | string | `""` | — | extra classes merged onto the wrapper |

Plus `style`, `theme` (optional, fall back to globals). `...rest` spreads onto the wrapper element.

## Default toolbar

The default toolbar (used when `toolbar` is omitted) is grouped into:

- **History** — undo, redo
- **Formatting** — bold, italic, underline, strikethrough, clear formatting, superscript, subscript
- **Font** — font family, font size, text color, highlight color
- **Paragraph** — paragraph/heading style, line height, align left/center/right/justify, indent/outdent
- **Lists** — bulleted and numbered lists
- **Insert** — link, image, video, table, horizontal rule
- **View** — toggle source HTML code view

## Custom toolbar

Pass a custom array-of-groups to `toolbar` to show only the actions you need. Each group is an array of action objects. Supported `type` values: `"button"`, `"select"`, `"color"`, `"separator"`.

```svelte
<script>
  import { TextEditor } from 'svelte-multistyle-ui';

  const minimalToolbar = [
    [
      { id: 'bold', type: 'button', label: 'B', command: 'bold' },
      { id: 'italic', type: 'button', label: 'I', command: 'italic' },
    ],
    [
      { id: 'insertLink', type: 'button', label: '🔗', command: 'createLink' },
    ],
  ];
</script>

<TextEditor bind:value={html} toolbar={minimalToolbar} style="fluent" theme="ocean" />
```

Action object shape:

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | unique within the toolbar |
| `type` | string | yes | `"button"` `"select"` `"color"` `"separator"` |
| `command` | string | yes for button/select/color | `execCommand` name or custom command key |
| `label` / `icon` | string | one of | rendered label or icon name |
| `title` | string | — | tooltip / accessibility label |
| `active` | string | — | format state key used to show active styling |
| `options` | array | for `select` | `{ label, value }` objects |

## Insert dialogs

The editor opens small Modals for:

- **Link** — text, URL, title, target
- **Image** — image URL or file upload, alt text, width, caption
- **Video** — YouTube/Vimeo/direct URL, width, height
- **Table** — row and column counts

## Code view

The default toolbar includes a "Toggle code view" button that swaps the WYSIWYG editor for a raw HTML `<textarea>`. External `value` updates are ignored while code view is open so the textarea is not overwritten.

## Example

```svelte
<script>
  import { TextEditor } from 'svelte-multistyle-ui';
  let html = $state('<p>Hello <b>world</b></p>');
</script>

<TextEditor
  bind:value={html}
  label="Body"
  placeholder="Start typing..."
  rows={10}
  style="material"
  theme="ocean"
/>
```
