# Input

Source: `src/lib/components/Input.svelte` · styles: `input-styles.css`

Text input with optional label, icons, and floating-label form styles (for supported `style` values).

## Props

| Prop | Type | Default | Bindable | Notes |
|---|---|---|---|---|
| `type` | string | `"text"` | — | any HTML input type |
| `value` | string | `""` | **yes** | `bind:value` |
| `placeholder` | string | `""` | — | |
| `label` | string | `""` | — | floating label on supported styles |
| `disabled` | boolean | `false` | — | |
| `readonly` | boolean | `false` | — | |
| `required` | boolean | `false` | — | |
| `iconStart` | string | — | — | icon name rendered before input |
| `iconEnd` | string | — | — | icon name rendered after input |
| `name` | string | `""` | — | |
| `id` | string | `""` | — | |
| `autofocus` | boolean | `false` | — | |
| `multiple` | boolean | `false` | — | |
| `accept` | string | — | — | for `type="file"` |
| `min`/`max`/`minlength`/`maxlength`/`step`/`pattern`/`autocomplete`/`list`/`size`/`tabindex`/`title`/`form`/`inputmode`/`spellcheck` | various | `undefined` | — | forwarded to the native input |

Plus `style`, `theme` (optional, fall back to globals). `...rest` spreads onto the input.

Floating-label style is enabled only for `style` in `material`, `material3`, `fluent`, `carbon`, `bootstrap`, `legacy-ios`.

## Example

```svelte
<script>
  import { Input } from 'svelte-multistyle-ui';
  let name = $state('');
</script>

<Input bind:value={name} label="Name" placeholder="Jane Doe" iconStart="person"
        style="material3" theme="ocean" />
```

Icons use the global `iconClass` (see `config.md`).