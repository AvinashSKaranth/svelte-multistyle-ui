# Radio

Source: `src/lib/components/Radio.svelte` · styles: `radio-styles.css`

Radio button bound to a group value.

## Props

| Prop | Type | Default | Bindable | Notes |
|---|---|---|---|---|
| `value` | any | — | — | the value this radio represents |
| `group` | string | `""` | **yes** | `bind:group` — currently selected value |
| `label` | string | `""` | — | |
| `disabled` | boolean | `false` | — | |

Plus `style`, `theme` (optional). `...rest` spreads onto the root.

## Example

```svelte
<script>
  import { Radio } from 'svelte-multistyle-ui';
  let plan = $state('free');
</script>

<Radio bind:group={plan} value="free" label="Free" style="carbon" theme="royal" />
<Radio bind:group={plan} value="pro"  label="Pro"  style="carbon" theme="royal" />
```