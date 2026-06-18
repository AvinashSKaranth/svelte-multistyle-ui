# MultiSelect

Source: `src/lib/components/MultiSelect.svelte` · styles: `multiselect-styles.css`

Multi-select dropdown. Options are `{value, label}` objects.

## Props

| Prop | Type | Default | Bindable | Notes |
|---|---|---|---|---|
| `selected` | array | `[]` | **yes** | `bind:selected` — array of selected `value`s |
| `options` | array | `[]` | — | `[{value, label}]` |
| `placeholder` | string | `"Select..."` | — | |
| `label` | string | `""` | — | |
| `disabled` | boolean | `false` | — | |

Plus `style`, `theme` (optional). `...rest` spreads onto the root.

## Example

```svelte
<script>
  import { MultiSelect } from 'svelte-multistyle-ui';
  const opts = [{ value: 'red', label: 'Red' }, { value: 'green', label: 'Green' }];
  let chosen = $state([]);
</script>

<MultiSelect bind:selected={chosen} options={opts} label="Colors"
             style="fluent" theme="forest" />
```