# SortableList

Source: `src/lib/components/SortableList.svelte` · styles: `sortablelist-styles.css`

Draggable reorderable list. Supports vertical, horizontal, and nested layouts. Uses `@thisux/sveltednd` for pointer + drag API support.

## Props

| Prop | Type | Default | Bindable | Notes |
|---|---|---|---|---|
| `items` | array | `[]` | **yes** | Array of `{ id, ... }` objects. `bind:items` for two-way sync |
| `onUpdate` | function | — | — | Called with the reordered array after a drop |
| `type` | string | `"item"` | — | Container prefix for isolating nested lists (e.g. `"parent"`, `"child"`) |
| `direction` | `"vertical"` \| `"horizontal"` | `"vertical"` | — | Layout direction |

Plus `style`, `theme` (optional). `...rest` spreads onto the root.

## Children snippet

Each item is rendered via a `children` snippet that receives `(item, index)`:

```svelte
{#snippet children(item)}
  <span>{item.label}</span>
{/snippet}
```

## Example

```svelte
<script>
  import { SortableList } from 'svelte-multistyle-ui';
  let items = $state([
    { id: '1', label: 'Design Review' },
    { id: '2', label: 'Frontend' },
    { id: '3', label: 'QA Testing' },
  ]);
</script>

<SortableList items={items} direction="vertical"
              style="brutalist" theme="midnight">
  {#snippet children(item)}
    <span>{item.label}</span>
  {/snippet}
</SortableList>

<!-- Nested: each parent renders its own child SortableList -->
<SortableList items={nested} type="parent" direction="vertical">
  {#snippet children(item)}
    <span>{item.label}</span>
    {#if item.children?.length}
      <SortableList items={item.children} type="child" direction="vertical">
        {#snippet children(child)}
          <span>{child.label}</span>
        {/snippet}
      </SortableList>
    {/if}
  {/snippet}
</SortableList>
```
