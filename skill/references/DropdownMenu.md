# DropdownMenu

Source: `src/lib/components/DropdownMenu.svelte` · styles: `dropdown-styles.css`

Menu triggered by the `children` snippet; items are data-driven.

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `variant` | string | `"filled"` | trigger button variant |
| `color` | string | `"primary"` | trigger color |
| `items` | array | `[]` | menu items (see below) |
| `position` | string | `"bottom"` | menu position relative to trigger |
| `align` | string | `"left"` | menu alignment |

**Item shape:** `{ label, icon?, shortcut?, onclick?, divider?, active?, disabled? }`

Plus `style`, `theme` (optional). `...rest` spreads onto the root.

## Snippet

`children` — the trigger content (e.g. a Button or icon).

## Example

```svelte
<script>
  import { DropdownMenu } from 'svelte-multistyle-ui';
  const items = [
    { label: 'New', icon: 'add', onclick: () => create() },
    { label: 'Open', icon: 'folder', shortcut: 'Ctrl+O', onclick: () => open() },
    { divider: true },
    { label: 'Delete', icon: 'delete', disabled: true },
  ];
</script>

<DropdownMenu items={items} position="bottom" align="right" style="bootstrap" theme="slate">
  Menu
</DropdownMenu>
```