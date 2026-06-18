# DatePicker

Source: `src/lib/components/DatePicker.svelte` · styles: `datepicker-styles.css`

Date picker backed by `dayjs` + customParseFormat (peer dep `dayjs`).

## Props

| Prop | Type | Default | Bindable | Notes |
|---|---|---|---|---|
| `value` | string | `""` | **yes** | `bind:value` — formatted string |
| `format` | string | `"YYYY-MM-DD"` | — | value format (dayjs) |
| `displayFormat` | string | — | — | how the picked date is shown |
| `label` | string | `""` | — | |
| `placeholder` | string | `""` | — | |
| `disabled` | boolean | `false` | — | |
| `min` | string | — | — | min selectable date |
| `max` | string | — | — | max selectable date |
| `locale` | string | `"en-US"` | — | dayjs locale string |

Plus `style`, `theme` (optional). `...rest` spreads onto the root.

## Example

```svelte
<script>
  import { DatePicker } from 'svelte-multistyle-ui';
  let dob = $state('');
</script>

<DatePicker bind:value={dob} label="Date of birth" min="1900-01-01"
            style="metro" theme="gold" />
```