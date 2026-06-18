# Tabs

Source: `src/lib/components/Tabs.svelte` · styles: `tabs-styles.css`

## Props

| Prop | Type | Default | Bindable | Notes |
|---|---|---|---|---|
| `tabs` | array | `[]` | — | `[{id, label}]` |
| `active` | string | `""` | **yes** | `bind:active` — selected tab `id` |

Plus `style`, `theme` (optional). `...rest` spreads onto the root.

## Example

```svelte
<script>
  import { Tabs } from 'svelte-multistyle-ui';
  const tabs = [{ id: 'home', label: 'Home' }, { id: 'about', label: 'About' }];
  let active = $state('home');
</script>

<Tabs bind:active {tabs} style="material3" theme="rose" />
```