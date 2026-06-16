# Plan: Global style/theme init helper

## Goal
Add a single library-level command, `initMultistyleUI({ style, theme })`, that sets the default `style` and `theme` for every component so users do not have to pass the props to each instance. Surface this in the demo at the top of `App.svelte` and document custom-CSS usage in the theme-settings sidebar.

## Proposed implementation

### 1. New shared config module: `src/lib/config.js`
Create a tiny module-level runes store:

```js
export let defaultStyle = $state("material");
export let defaultTheme = $state("default");

export function initMultistyleUI({ style = "material", theme = "default" } = {}) {
  defaultStyle = style;
  defaultTheme = theme;
}
```

Because these are module-level `$state` runes, all components that reference them react when `initMultistyleUI` is called.

### 2. Export the helper from `src/lib/index.js`
Add to the barrel file:

```js
export { initMultistyleUI } from "./config.js";
```

### 3. Wire every component to the global defaults
In each component, replace the hard-coded prop defaults with the shared defaults. For example, `Button.svelte` changes from:

```js
let {
  style = "material",
  theme = "default",
  ...
} = $props();
```

to:

```js
import { defaultStyle, defaultTheme } from "../config.js";

let {
  style: styleProp,
  theme: themeProp,
  ...
} = $props();

const style = $derived(styleProp ?? defaultStyle);
const theme = $derived(themeProp ?? defaultTheme);
```

All existing derived classes (`s-button-${style}`, `theme-${theme}`) continue to work because `style` and `theme` remain reactive strings. Explicit per-instance props still override the global defaults.

**Files to update:** all `src/lib/components/*.svelte` files (~38 components).

### 4. Demo the global init in `src/App.svelte`

- Import `initMultistyleUI` and call it once with the demo’s selected values:

  ```js
  import { initMultistyleUI } from "./lib/config.js";

  initMultistyleUI({ style: selectedStyle, theme: selectedTheme });
  ```

  A reactive call (e.g., inside a small `$effect` or at the top of the script) keeps the gallery responsive to the header selects.

- Add a new **"Global Defaults"** card at the very top of `<main>` (before "Form Components") that shows the init API and a live example using components **without** `style`/`theme` props:

  ```svelte
  <Card elevated>
    <p class="demo-label">Global init</p>
    <pre class="component-code"><code>{`import { initMultistyleUI } from "svelte-multistyle-ui";

initMultistyleUI({ style: "fluent", theme: "ocean" });

<!-- Now every component uses those defaults -->
<Button variant="filled">Click me</Button>`}</code></pre>
    <div class="flex flex-wrap gap-2">
      <Button variant="filled">Default Button</Button>
      <Badge>Default Badge</Badge>
    </div>
  </Card>
  ```

  This demonstrates that the defaults propagate without per-instance props.

### 5. Explain custom CSS in the theme sidebar
In the settings sidebar, below the generated custom CSS code block, add a short explanatory section:

- Import order: `theme.css` first, then your custom stylesheet.
- Create a `.theme-custom` class (or any name) and override `--t-*` tokens.
- Apply it with `theme="custom"` on components, or put the class on a parent element.
- Mention that `theme-base.css` can be imported alone if you want to define every preset yourself.
- Note that component-specific overrides can still be added by targeting `.s-<component>-<style>` classes.

### 6. Verify
Run `pnpm build:lib` and `pnpm dev` to ensure:
- Library builds without errors.
- Demo loads and the new Global Defaults card renders.
- Changing the header style/theme updates both the explicitly-wired components and the global-defaults example.

## Open question for you
Should I also remove the repetitive `style={selectedStyle} theme={selectedTheme}` props from the existing demo component usages so the whole page demonstrates global defaults in action, or keep those explicit passes and only add the new top example card? Removing them is a larger diff but proves the feature; keeping them is safer and still shows the API.
