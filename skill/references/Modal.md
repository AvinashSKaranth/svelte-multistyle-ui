# Modal

Source: `src/lib/components/Modal.svelte` · styles: `modal-styles.css`

Dialog overlay. Uses the `portal` action internally (escapes transformed ancestors).

## Props

| Prop | Type | Default | Bindable | Notes |
|---|---|---|---|---|
| `open` | boolean | `false` | **yes** | `bind:open` |
| `title` | string | `""` | — | header title |
| `size` | string | `"medium"` | — | size variant |
| `onclose` | fn | — | — | callback when closed |

Plus `style`, `theme` (optional). `...rest` spreads onto the root.

## Snippet

`children` — modal body.

## Example

```svelte
<script>
  import { Modal, Button } from 'svelte-multistyle-ui';
  let open = $state(false);
</script>

<Button onclick={() => open = true}>Open</Button>
<Modal bind:open title="Confirm" onclose={() => console.log('closed')}
       size="small" style="carbon" theme="midnight">
  Are you sure?
</Modal>
```