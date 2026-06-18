# Pagination

Source: `src/lib/components/Pagination.svelte` · styles: `pagination-styles.css`

## Props

| Prop | Type | Default | Bindable | Notes |
|---|---|---|---|---|
| `total` | number | `0` | — | total item count |
| `perPage` | number | `10` | — | items per page |
| `current` | number | `1` | **yes** | `bind:current` — current page (1-based) |

Plus `style`, `theme` (optional). `...rest` spreads onto the root.

## Example

```svelte
<script>
  import { Pagination } from 'svelte-multistyle-ui';
  let page = $state(1);
</script>

<Pagination total={95} perPage={10} bind:current={page}
             style="bootstrap" theme="gold" />
```