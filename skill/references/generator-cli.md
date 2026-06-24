# Generator CLI

`svelte-multistyle-ui` includes a YAML → Svelte 5 page generator. It lives in `cli/` and is invoked with the `svelte-multistyle-ui generate` subcommand.

## Usage

```bash
npx svelte-multistyle-ui generate --input page.yaml --output ./src/routes/demo/+page.svelte
```

In this repository:

```bash
pnpm gen --input page.yaml --output ./src/routes/demo/+page.svelte
pnpm gen:sample   # dry-runs the sample fixture
```

## CLI options

| Flag | Description |
|------|-------------|
| `--input <path>` | YAML source file (required) |
| `--output <path>` | Output `.svelte` path (required unless `--dry-run`) |
| `--style <name>` | Override default visual style |
| `--theme <name>` | Override default color theme |
| `--mode <system\|light\|dark>` | Override color mode |
| `--dry-run` | Print generated Svelte to stdout instead of writing a file |
| `--watch`, `-w` | Re-generate when the input YAML changes |
| `--help`, `-h` | Show help |
| `--version`, `-v` | Show version |

## Supported YAML formats

The generator auto-detects the input style.

### 1. Compact tree DSL (recommended)

Component names are YAML keys. A key maps to either a list of children or a mapping of props.

```yaml
Card:
  - Row:
      - Input:
          label: Username
          placeholder: Enter name
      - Button:
          label: Submit
  - Row:
      - Select:
          placeholder: Fruit
          options:
            - value: apple
              label: Apple
            - value: banana
              label: Banana
```

A root-level list works the same way — every top-level item becomes a sibling:

```yaml
- Card:
    - Row:
        - Input:
            label: Username
- Card:
    - Row:
        - Button:
            label: Submit
```

### 2. Inline shorthand

When YAML parsing fails, the generator falls back to a simple indentation-based parser:

```yaml
Card
  Row
    Input: { label: Username, placeholder: Enter name }
    Button: { label: Submit }
  Row
    Select: { placeholder: Fruit, options: [Apple, Banana, Cherry] }
```

### 3. Verbose schema

Use explicit `body` and `state` arrays for full control:

```yaml
state:
  - { name: username, type: string, default: "" }
body:
  - component: Input
    props:
      label: Username
    bind: username
```

## Auto-binding

Bindable components automatically receive a `$state` declaration and the correct `bind:*` directive:

- `Input`, `Textarea`, `TextEditor`, `DatePicker` → `bind:value`
- `Select` → `bind:value`
- `MultiSelect` → `bind:selected`
- `Checkbox`, `Toggle` → `bind:checked`
- `Radio` → `bind:group`
- `Slider`, `Rating` → `bind:value`
- `ButtonGroup` → `bind:value`
- `Tabs` → `bind:active`
- `Pagination` → `bind:current`
- `Popover`, `Modal`, `Drawer`, `CommandPalette` → `bind:open`

State variable names are derived from `label`, `placeholder`, `title`, or the component name, and de-duplicated automatically.

## Fake data injection

If required data is missing, the generator injects plausible defaults:

- `Select` / `MultiSelect` without `options` → `[{value:"opt1",label:"Option 1"}, ...]`
- `Table` without `data` → `[{id:1,name:"Alice",role:"Admin"}, ...]`
- All chart components without `data` → `[{label:"q1",value:12}, ...]`

## Option conversion

String option lists are converted to `{value, label}` objects:

```yaml
Select:
  options: [Apple, Banana, Cherry]
```

becomes:

```svelte
<Select options={[{value:"apple",label:"Apple"},{value:"banana",label:"Banana"},{value:"cherry",label:"Cherry"}]} />
```

You can also write explicit `{value, label}` objects to keep full control.

## Generated output

A generated `.svelte` file looks like:

```svelte
<script>
  import { onMount } from "svelte";
  import { Input, Button, Card, Row } from "svelte-multistyle-ui";

  let username = $state("");

  onMount(() => {
    // TODO: add setup logic here
  });
</script>

<Card>
  <Row>
    <Input label="Username" bind:value={username} />
    <Button>Button</Button>
  </Row>
</Card>
```

The generator intentionally emits only imports, `$state` declarations, an empty `onMount` stub, and markup. Dark/light mode handling is left to `initMultistyleUI` in the app layout.

## Multi-snippet components

For `Popover`, provide `children` (trigger) and `content` as props:

```yaml
Popover:
  children: Trigger
  content: Popover body
```

These become named snippets in the generated markup.

## Testing the generator

```bash
pnpm test:gen
```

This runs `cli/test.js`, which checks registry completeness, all three YAML input styles, fake-data injection, auto-binding, and Svelte compilation.
