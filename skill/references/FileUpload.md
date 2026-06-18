# FileUpload

Source: `src/lib/components/FileUpload.svelte` · styles: `fileupload-styles.css`

Drag-and-drop or click-to-upload file picker.

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `accept` | string | `""` | file type filter, e.g. `"image/*"` |
| `multiple` | boolean | `false` | allow more than one file |
| `disabled` | boolean | `false` | |
| `label` | string | `"Drop files or click to upload"` | |

Plus `style`, `theme` (optional). `...rest` spreads onto the root.

## Example

```svelte
<FileUpload accept="image/*" multiple label="Drop images here"
            style="illustration" theme="rose" />
```