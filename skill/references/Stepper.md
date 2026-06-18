# Stepper

Source: `src/lib/components/Stepper.svelte` · styles: `stepper-styles.css`

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `steps` | array | `[]` | `[{label}]` |
| `current` | number | `0` | zero-based index of the active step |

Plus `style`, `theme` (optional). `...rest` spreads onto the root.

## Example

```svelte
<Stepper
  steps={[{ label: 'Account' }, { label: 'Profile' }, { label: 'Done' }]}
  current={1}
  style="material3" theme="rose" />
```