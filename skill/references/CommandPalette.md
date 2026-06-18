# CommandPalette

Source: `src/lib/components/CommandPalette.svelte` · styles: `commandpalette-styles.css`

Cmd/Ctrl+K command palette. Uses the `portal` action internally; auto-listens for the global Cmd/Ctrl+K shortcut.

## Props

| Prop | Type | Default | Bindable | Notes |
|---|---|---|---|---|
| `open` | boolean | `false` | **yes** | `bind:open` |
| `groups` | array | `[]` | — | see below |
| `placeholder` | string | `"Type a command..."` | — | |

**Group shape:** `{ label, items: [{ label, icon?, shortcut?, searchTerms?, onclick? }] }`

Plus `style`, `theme` (optional). `...rest` spreads onto the root.

## Example

```svelte
<script>
  import { CommandPalette } from 'svelte-multistyle-ui';
  const groups = [
    {
      label: 'Actions',
      items: [
        { label: 'New file', icon: 'add', shortcut: 'Ctrl+N', onclick: () => newFile() },
        { label: 'Find', searchTerms: ['search', 'grep'], onclick: () => find() },
      ],
    },
  ];
  let open = $state(false);
</script>

<CommandPalette bind:open {groups} style="neon" theme="candy" />
```