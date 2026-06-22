# Plan: Build a custom WYSIWYG TextEditor from scratch

## Context

The current `TextEditor` component wraps `pell`, which is unmaintained, limited, and hard to style/theme. We need to replace it with a self-contained, framework-agnostic WYSIWYG editor core wrapped in a Svelte 5 component that matches the library's multi-style / multi-theme conventions.

## Goals

- Remove the `pell` dependency from `TextEditor`.
- Provide all 22 feature groups requested (formatting, font controls, paragraph formatting, lists, links, images, video, tables, HR, undo/redo, clipboard, drag/drop, code view, fullscreen, floating toolbar, context menu, keyboard shortcuts, selection engine, sanitizer, mobile support, status bar, output API).
- Keep the existing public `TextEditor` prop API so the showcase pages keep working.
- Stay theme-aware via `--t-*` tokens and support all 12 visual styles.

## Architecture

### Vanilla-JS core + Svelte wrapper

The editor engine is implemented as a vanilla-JS class (`TextEditorCore`) that owns a `contenteditable` element and a toolbar. The Svelte component only:

1. Renders the outer shell (`label`, wrapper, toolbar container, editor body, status bar).
2. Instantiates the core on mount.
3. Binds `value` to the core's HTML.
4. Forwards `style`/`theme` classes and `...rest` props.
5. Cleans up on destroy.

This keeps the editor "works without frameworks" and makes it easier to test/port.

### Module layout

```
src/lib/components/
  TextEditor.svelte                 # Svelte 5 wrapper (kept, rewritten)
  texteditor-styles.css             # Theme-aware CSS (rewritten)
  text-editor-core/
    editor-core.js                  # TextEditorCore class
    selection-engine.js             # SelectionState + format detection
    sanitizer.js                    # DOM-based HTML sanitizer
    history.js                      # Undo/redo stack (100 ops)
    clipboard.js                    # Paste + drag/drop handlers
    toolbar-config.js               # Default toolbar groups/actions
    dialogs.js                      # Link, image, video, table dialogs
    floating-toolbar.js             # Air-mode toolbar
    context-menu.js                 # Right-click menu
    keyboard.js                     # Shortcut map + handler
    dom-utils.js                    # Small helpers
```

### CSS structure

- Base: `.s-texteditor`, `.s-texteditor-toolbar`, `.s-texteditor-btn`, `.s-texteditor-content`, `.s-texteditor-statusbar`, `.s-texteditor-dialog`, `.s-texteditor-floating-toolbar`, `.s-texteditor-context-menu`.
- Style overrides for each design language in the same `texteditor-styles.css` file.
- Use `--t-*` tokens for colors, borders, radii, shadows.

## Key technical decisions

1. **Formatting commands**: Use `document.execCommand` for simple formatting (bold, italic, lists, justify, etc.) because it handles selection boundaries and cross-browser quirks reasonably well. For operations `execCommand` can't do cleanly (font size, table cell merge/split, image alignment), use manual DOM selection APIs.
2. **Selection engine**: Maintain a `SelectionState` object updated on `selectionchange` and `keyup`/`mouseup`. Used for active-format toolbar highlighting, floating toolbar positioning, and context menu.
3. **Sanitizer**: Parse HTML through `DOMParser`, walk the tree, keep only allowed tags/attributes, strip `script`/`style`/etc. Run on paste, `setHTML`, and code-view switch.
4. **History**: Capture editor HTML snapshots before each mutating operation; stack depth 100. Undo/redo restore snapshots and preserve selection when possible.
5. **Code view**: Swap the visual editor with a `<textarea>` or `<pre contenteditable>` showing formatted/syntax-highlighted HTML. Use Prism for highlighting (already a dependency).
6. **Fullscreen**: Toggle a class on the editor wrapper; ESC listener exits; toolbar stays visible via sticky/fixed positioning.
7. **Dialogs**: Rendered inside the Svelte component (link, image, video, table). The core emits events that the Svelte component handles, or the core can open simple inline modals. Prefer Svelte-driven modals for consistency with existing `Modal` component.
8. **Mobile**: Toolbar becomes horizontally scrollable; touch-friendly button sizes (min 44×44); image resize handled with touch events.

## Implementation phases

Because the requested feature set is very large, I recommend implementing in waves so each wave can be reviewed and tested independently. The component stays usable after every phase.

### Phase 1 — Core foundation
- Remove pell; create `TextEditorCore` with `contenteditable`, toolbar container, status bar.
- Output API: `getHTML()`, `setHTML()`, `getText()`, `clear()`, `focus()`.
- Basic text formatting: bold, italic, underline, strikethrough, clear formatting.
- Paragraph formatting: headings H1–H6, paragraph, blockquote, pre/code, alignment, outdent/indent.
- Lists: unordered (disc/circle/square) and ordered (numeric, alpha, roman).
- HR insertion.
- Selection engine + active-format toolbar state.
- HTML sanitizer + paste sanitization.
- Status bar (words, chars, selection length, current tag).
- Update `TextEditor.svelte` wrapper and `texteditor-styles.css` for all 12 styles.

### Phase 2 — Typography & color
- Font family dropdown.
- Font size dropdown.
- Foreground / background color pickers.
- Superscript / subscript.
- Line height control.

### Phase 3 — Links & images
- Link insert/edit/remove dialog.
- Image upload + URL insert.
- Image alignment (left/center/right/float) and resize handles.
- Alt text, caption, replace, remove.

### Phase 4 — Rich embeds & tables
- Video embed dialog (YouTube, Vimeo, direct URL) → `<iframe>`.
- Table insertion grid + table actions (add/delete rows/columns, merge/split cells, cell background, vertical alignment, border/width, delete table).

### Phase 5 — History, clipboard, drag/drop
- Undo/redo stack (100 ops) with toolbar buttons and keyboard shortcuts.
- Copy/cut/paste/plain-text paste handling.
- Drag-and-drop image insertion.

### Phase 6 — Advanced UX
- Code view (visual ↔ HTML) with Prism highlighting, format, validate.
- Fullscreen mode (ESC exits).
- Floating selection toolbar (air mode).
- Context menu (text, image, table sections).
- Complete keyboard shortcut map.
- Mobile toolbar responsiveness.

## Deliverables after each phase

- Working `TextEditor` on both `/` and `/demo` showcase pages.
- Updated `texteditor-styles.css` theme support.
- No broken existing functionality.
- `pnpm build` passes.

## Open question

Should I implement all six phases in one large change, or would you prefer to start with Phase 1 (usable core) and add the remaining features incrementally? Phase 1 alone replaces pell cleanly and gives a solid editor; the rest can be layered on top without API breakage.
