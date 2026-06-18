# Textarea

Source: `src/lib/components/Textarea.svelte` · styles: `textarea-styles.css`

## Props

| Prop | Type | Default | Bindable | Notes |
|---|---|---|---|---|
| `value` | string | `""` | **yes** | `bind:value` |
| `placeholder` | string | `""` | — | |
| `label` | string | `""` | — | floating label on supported styles |
| `rows` | number | `4` | — | |
| `maxlength` | number | — | — | |
| `disabled` | boolean | `false` | — | |
| `readonly` | boolean | `false` | — | |
| `required` | boolean | `false` | — | |
| `autoresize` | boolean | `false` | — | grows to fit content |

Plus `style`, `theme` (optional). `...rest` spreads onto the `<textarea>`.

Floating-label style is enabled only for `style` in `material`, `material3`, `fluent`, `carbon`, `bootstrap`, `legacy-ios`.

## Example

```svelte
<script>
  import { Textarea } from 'svelte-multistyle-ui';
  let note = $state('');
</script>

<Textarea bind:value={note} label="Notes" rows={6} autoresize
          style="fluent" theme="ocean" />
```