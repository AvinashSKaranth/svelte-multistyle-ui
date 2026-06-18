# FAB

Source: `src/lib/components/FAB.svelte` · styles: `fab-styles.css`

Floating action button.

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `position` | string | `"bottom-right"` | corner placement |
| `onclick` | fn | — | callback prop |

Plus `style`, `theme` (optional). `...rest` spreads onto the button.

## Snippet

`children` — icon/content for the FAB.

## Example

```svelte
<FAB position="bottom-right" onclick={() => compose()} style="material3" theme="rose">
  <i class="material-symbols-outlined">add</i>
</FAB>
```