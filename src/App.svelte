<script>
  import Input from "./lib/components/Input.svelte";
  import Button from "./lib/components/Button.svelte";
  import IconButton from "./lib/components/IconButton.svelte";
  import Textarea from "./lib/components/Textarea.svelte";
  import Select from "./lib/components/Select.svelte";
  import MultiSelect from "./lib/components/MultiSelect.svelte";
  import Checkbox from "./lib/components/Checkbox.svelte";
  import Radio from "./lib/components/Radio.svelte";
  import Toggle from "./lib/components/Toggle.svelte";
  import Slider from "./lib/components/Slider.svelte";
  import SearchInput from "./lib/components/SearchInput.svelte";
  import FileUpload from "./lib/components/FileUpload.svelte";
  import DatePicker from "./lib/components/DatePicker.svelte";
  import Card from "./lib/components/Card.svelte";
  import Divider from "./lib/components/Divider.svelte";
  import Tabs from "./lib/components/Tabs.svelte";
  import Accordion from "./lib/components/Accordion.svelte";
  import Modal from "./lib/components/Modal.svelte";
  import Breadcrumb from "./lib/components/Breadcrumb.svelte";
  import Pagination from "./lib/components/Pagination.svelte";
  import Stepper from "./lib/components/Stepper.svelte";
  import Avatar from "./lib/components/Avatar.svelte";
  import Badge from "./lib/components/Badge.svelte";
  import Tooltip from "./lib/components/Tooltip.svelte";
  import ProgressBar from "./lib/components/ProgressBar.svelte";
  import Table from "./lib/components/Table.svelte";
  import Alert from "./lib/components/Alert.svelte";
  import Spinner from "./lib/components/Spinner.svelte";
  import Skeleton from "./lib/components/Skeleton.svelte";
  import FAB from "./lib/components/FAB.svelte";

  const styles = [
    { value: "material", label: "Material Design" },
    { value: "material3", label: "Material You (M3)" },
    { value: "fluent", label: "Fluent UI" },
    { value: "brutalist", label: "Brutalist UI" },
    { value: "pixel", label: "Pixel UI" },
    { value: "neon", label: "Neon UI" },
    { value: "metro", label: "Metro UI" },
    { value: "bootstrap", label: "Bootstrap" },
    { value: "cartoon", label: "Cartoon" },
    { value: "illustration", label: "Illustration" },
    { value: "carbon", label: "Carbon" },
    { value: "liquid-glass", label: "Liquid Glass" },
    { value: "legacy-ios", label: "Legacy iOS" },
  ];

  const themes = [
    { value: "default", label: "Default (Indigo)" },
    { value: "ocean", label: "Ocean" },
    { value: "forest", label: "Forest" },
    { value: "rose", label: "Rose" },
    { value: "midnight", label: "Midnight" },
    { value: "gold", label: "Gold" },
    { value: "slate", label: "Slate" },
    { value: "candy", label: "Candy" },
    { value: "storm", label: "Storm" },
    { value: "royal", label: "Royal" },
    { value: "custom", label: "Custom" },
  ];

  // Theme preset defaults
  const themeDefaults = {
    default: {
      primary: "#2563eb",
      secondary: "#3b82f6",
      surface: "#ffffff",
      cardBg: "#ffffff",
      cardBorderColor: "#e2e8f0",
      text: "#0f172a",
      textHint: "#94a3b8",
      textPrimary: "#2563eb",
      textSecondary: "#3b82f6",
      surfaceBg: "#f1f5f9",
      btnBg: "#2563eb",
      btnBorderColor: "transparent",
      btnRadius: "8px",
      cardRadius: "12px",
    },
    ocean: {
      primary: "#0ea5e9",
      secondary: "#06b6d4",
      surface: "#ffffff",
      cardBg: "#f0f9ff",
      cardBorderColor: "#bae6fd",
      text: "#0c4a6e",
      textHint: "#7dd3fc",
      textPrimary: "#0284c7",
      textSecondary: "#0891b2",
      surfaceBg: "#f0f9ff",
      btnBg: "#0ea5e9",
      btnBorderColor: "transparent",
      btnRadius: "10px",
      cardRadius: "12px",
    },
    forest: {
      primary: "#22c55e",
      secondary: "#16a34a",
      surface: "#ffffff",
      cardBg: "#f0fdf4",
      cardBorderColor: "#bbf7d0",
      text: "#14532d",
      textHint: "#86efac",
      textPrimary: "#16a34a",
      textSecondary: "#15803d",
      surfaceBg: "#f0fdf4",
      btnBg: "#22c55e",
      btnBorderColor: "transparent",
      btnRadius: "8px",
      cardRadius: "12px",
    },
    rose: {
      primary: "#f43f5e",
      secondary: "#e11d48",
      surface: "#ffffff",
      cardBg: "#fff1f2",
      cardBorderColor: "#fecdd3",
      text: "#881337",
      textHint: "#fda4af",
      textPrimary: "#e11d48",
      textSecondary: "#be123c",
      surfaceBg: "#fff1f2",
      btnBg: "#f43f5e",
      btnBorderColor: "transparent",
      btnRadius: "12px",
      cardRadius: "14px",
    },
    midnight: {
      primary: "#818cf8",
      secondary: "#6366f1",
      surface: "#1e1b4b",
      cardBg: "#1e1b4b",
      cardBorderColor: "#3730a3",
      text: "#e0e7ff",
      textHint: "#6366f1",
      textPrimary: "#a5b4fc",
      textSecondary: "#818cf8",
      surfaceBg: "#0f0d2e",
      btnBg: "#818cf8",
      btnBorderColor: "transparent",
      btnRadius: "8px",
      cardRadius: "12px",
    },
    gold: {
      primary: "#eab308",
      secondary: "#ca8a04",
      surface: "#ffffff",
      cardBg: "#fefce8",
      cardBorderColor: "#fde047",
      text: "#713f12",
      textHint: "#facc15",
      textPrimary: "#ca8a04",
      textSecondary: "#a16207",
      surfaceBg: "#fefce8",
      btnBg: "#eab308",
      btnBorderColor: "transparent",
      btnRadius: "8px",
      cardRadius: "10px",
    },
    slate: {
      primary: "#64748b",
      secondary: "#475569",
      surface: "#ffffff",
      cardBg: "#f8fafc",
      cardBorderColor: "#cbd5e1",
      text: "#1e293b",
      textHint: "#94a3b8",
      textPrimary: "#475569",
      textSecondary: "#334155",
      surfaceBg: "#f1f5f9",
      btnBg: "#64748b",
      btnBorderColor: "transparent",
      btnRadius: "6px",
      cardRadius: "8px",
    },
    candy: {
      primary: "#ec4899",
      secondary: "#f472b6",
      surface: "#ffffff",
      cardBg: "#fdf2f8",
      cardBorderColor: "#f9a8d4",
      text: "#831843",
      textHint: "#f9a8d4",
      textPrimary: "#db2777",
      textSecondary: "#be185d",
      surfaceBg: "#fdf2f8",
      btnBg: "#ec4899",
      btnBorderColor: "transparent",
      btnRadius: "20px",
      cardRadius: "24px",
    },
    storm: {
      primary: "#94a3b8",
      secondary: "#64748b",
      surface: "#0f172a",
      cardBg: "#1e293b",
      cardBorderColor: "#334155",
      text: "#e2e8f0",
      textHint: "#64748b",
      textPrimary: "#cbd5e1",
      textSecondary: "#94a3b8",
      surfaceBg: "#0f172a",
      btnBg: "#94a3b8",
      btnBorderColor: "transparent",
      btnRadius: "6px",
      cardRadius: "10px",
    },
    royal: {
      primary: "#7c3aed",
      secondary: "#6d28d9",
      surface: "#2e1065",
      cardBg: "#3b0764",
      cardBorderColor: "#7c3aed",
      text: "#ddd6fe",
      textHint: "#7c3aed",
      textPrimary: "#a78bfa",
      textSecondary: "#8b5cf6",
      surfaceBg: "#1e0a4e",
      btnBg: "#7c3aed",
      btnBorderColor: "transparent",
      btnRadius: "8px",
      cardRadius: "12px",
    },
  };

  const urlParams = new URLSearchParams(window.location.search);
  let selectedStyle = $state(urlParams.get("style") || "material");
  let selectedTheme = $state(urlParams.get("theme") || "default");
  let mode = $state(urlParams.get("mode") || "system");
  let systemDark = $state(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
  );

  // Theme editor state
  let customPrimary = $state("#6366f1");
  let customSecondary = $state("#8b5cf6");
  let customSurface = $state("#ffffff");
  let customCardBg = $state("#ffffff");
  let customCardBorderColor = $state("#e2e8f0");
  let customText = $state("#1e293b");
  let customTextHint = $state("#94a3b8");
  let customTextPrimary = $state("#6366f1");
  let customTextSecondary = $state("#8b5cf6");
  let customSurfaceBg = $state("#f1f5f9");
  let customBtnBg = $state("#6366f1");
  let customBtnBorderColor = $state("transparent");
  let customBtnRadius = $state("8px");
  let customCardRadius = $state("12px");

  // Reset custom values when theme changes
  $effect(() => {
    const d = themeDefaults[selectedTheme];
    if (d) {
      customPrimary = d.primary;
      customSecondary = d.secondary;
      customSurface = d.surface;
      customCardBg = d.cardBg;
      customCardBorderColor = d.cardBorderColor;
      customText = d.text;
      customTextHint = d.textHint;
      customTextPrimary = d.textPrimary;
      customTextSecondary = d.textSecondary;
      customSurfaceBg = d.surfaceBg;
      customBtnBg = d.btnBg;
      customBtnBorderColor = d.btnBorderColor;
      customBtnRadius = d.btnRadius;
      customCardRadius = d.cardRadius;
    }
  });

  // Track system dark-mode preference live
  $effect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => (systemDark = e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  });

  const isDarkMode = $derived(
    mode === "dark" || (mode === "system" && systemDark),
  );

  // Apply effective mode to document
  $effect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(isDarkMode ? "dark" : "light");
  });

  // Demo state
  let inputVal = $state("");
  let textareaVal = $state("");
  let selectVal = $state("");
  let multiSelectVal = $state([]);
  let checkVal = $state(false);
  let radioVal = $state("a");
  let toggleVal = $state(true);
  let sliderVal = $state(50);
  let searchVal = $state("");
  let dateVal = $state("");
  let tabActive = $state("tab1");
  let accordionItems = [
    {
      id: "1",
      title: "What is this?",
      content:
        "A comprehensive UI component library with multiple styles and themes.",
    },
    {
      id: "2",
      title: "How to use?",
      content: "Import any component and pass style and theme props.",
    },
    {
      id: "3",
      title: "Customizable?",
      content: "Yes! Every component adapts to the selected style and theme.",
    },
  ];
  let modalOpen = $state(false);
  let paginationPage = $state(1);
  let progressVal = $state(65);

  const selectOptions = [
    { value: "opt1", label: "Option One" },
    { value: "opt2", label: "Option Two" },
    { value: "opt3", label: "Option Three" },
  ];

  const tableColumns = [
    { key: "name", label: "Name" },
    { key: "role", label: "Role" },
    { key: "status", label: "Status" },
  ];
  const tableRows = [
    { name: "Alice", role: "Engineer", status: "Active" },
    { name: "Bob", role: "Designer", status: "Away" },
    { name: "Carol", role: "Manager", status: "Active" },
  ];

  const radiusOptions = ["0px", "2px", "4px", "8px", "16px", "32px", "9999px"];

  const customStyle = $derived(
    `--t-primary:${customPrimary};--t-secondary:${customSecondary};--t-surface:${customSurface};--t-card-bg:${customCardBg};--t-card-border-color:${customCardBorderColor};--t-text:${customText};--t-text-hint:${customTextHint};--t-text-primary:${customTextPrimary};--t-text-secondary:${customTextSecondary};--t-surface-bg:${customSurfaceBg};--t-btn-bg:${customBtnBg};--t-btn-border-color:${customBtnBorderColor};--t-btn-radius:${customBtnRadius};--t-card-radius:${customCardRadius};`,
  );

  let settingsOpen = $state(false);
  let copyStatus = $state("");

  const customCss = $derived(`/* custom-theme.css */
/* Link this file after svelte-multistyle-ui/theme.css. */
.theme-custom {
  --t-primary: ${customPrimary};
  --t-secondary: ${customSecondary};
  --t-surface: ${customSurface};
  --t-card-bg: ${customCardBg};
  --t-card-border-color: ${customCardBorderColor};
  --t-text: ${customText};
  --t-text-hint: ${customTextHint};
  --t-text-primary: ${customTextPrimary};
  --t-text-secondary: ${customTextSecondary};
  --t-surface-bg: ${customSurfaceBg};
  --t-btn-bg: ${customBtnBg};
  --t-btn-border-color: ${customBtnBorderColor};
  --t-btn-radius: ${customBtnRadius};
  --t-card-radius: ${customCardRadius};
}

html.dark .theme-custom {
  --t-primary: ${customPrimary};
  --t-secondary: ${customSecondary};
  --t-surface: ${customSurface};
  --t-card-bg: ${customCardBg};
  --t-card-border-color: ${customCardBorderColor};
  --t-text: ${customText};
  --t-text-hint: ${customTextHint};
  --t-text-primary: ${customTextPrimary};
  --t-text-secondary: ${customTextSecondary};
  --t-surface-bg: ${customSurfaceBg};
  --t-btn-bg: ${customBtnBg};
  --t-btn-border-color: ${customBtnBorderColor};
  --t-btn-radius: ${customBtnRadius};
  --t-card-radius: ${customCardRadius};
}

/* Use it:
import "svelte-multistyle-ui/theme.css";
import "./custom-theme.css";

Then pass theme="custom" to components.
*/`);

  function markCustomTheme() {
    if (selectedTheme !== "custom") {
      selectedTheme = "custom";
    }
  }

  async function copyCustomCss() {
    try {
      await navigator.clipboard.writeText(customCss);
      copyStatus = "Copied";
      setTimeout(() => (copyStatus = ""), 1800);
    } catch {
      copyStatus = "Copy failed";
    }
  }

  $effect(() => {
    if (!settingsOpen) return;

    const handler = (event) => {
      if (event.key === "Escape") {
        settingsOpen = false;
      }
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  });
</script>

<div
  class="demo-root min-h-screen page-bg transition-colors duration-300 theme-{selectedTheme}"
  class:glass-page-bg={selectedStyle === "liquid-glass"}
  class:dark-mode={isDarkMode}
  style={customStyle}
>
  <!-- Sticky Header -->
  <header
    class="page-header sticky top-0 z-50 backdrop-blur-md border-b px-6 py-4 transition-colors duration-300"
  >
    <div class="max-w-7xl mx-auto flex flex-wrap items-center gap-4">
      <h1 class="page-title text-xl font-bold">UI Component Gallery</h1>
      <div class="flex items-center gap-3 ml-auto flex-wrap">
        <label for="style-sel" class="text-sm header-label">Style:</label>
        <select
          id="style-sel"
          bind:value={selectedStyle}
          class="header-select rounded-lg px-3 py-1.5 text-sm border focus:border-indigo-500 focus:outline-none"
        >
          {#each styles as s}
            <option value={s.value}>{s.label}</option>
          {/each}
        </select>
        <label for="theme-sel" class="text-sm header-label">Theme:</label>
        <select
          id="theme-sel"
          bind:value={selectedTheme}
          class="header-select rounded-lg px-3 py-1.5 text-sm border focus:border-indigo-500 focus:outline-none"
        >
          {#each themes as t}
            <option value={t.value}>{t.label}</option>
          {/each}
        </select>
        <label for="mode-sel" class="text-sm header-label">Mode:</label>
        <select
          id="mode-sel"
          bind:value={mode}
          class="header-select rounded-lg px-3 py-1.5 text-sm border focus:border-indigo-500 focus:outline-none"
        >
          <option value="light">☀️ Light</option>
          <option value="dark">🌙 Dark</option>
          <option value="system">💻 System</option>
        </select>
        <button
          type="button"
          class="settings-gear"
          aria-label="Open theme settings"
          onclick={() => (settingsOpen = true)}
        >
          ⚙
        </button>
      </div>
    </div>
  </header>

  <main class="max-w-7xl mx-auto p-6 space-y-10">
    {#if settingsOpen}
      <div
        class="settings-backdrop"
        aria-hidden="true"
        onpointerdown={() => (settingsOpen = false)}
      ></div>
      <aside
        class="settings-sidebar"
        role="dialog"
        aria-modal="true"
        aria-labelledby="theme-settings-title"
      >
        <div class="settings-sidebar-header">
          <div>
            <h2 id="theme-settings-title" class="text-xl font-semibold">
              Theme Settings
            </h2>
            <p class="text-sm">Edit tokens, then copy the generated CSS.</p>
          </div>
          <button
            type="button"
            class="settings-close"
            aria-label="Close theme settings"
            onclick={() => (settingsOpen = false)}
          >
            ×
          </button>
        </div>

        <div class="settings-content">
          <section class="settings-panel">
            <h3 class="settings-panel-title">Theme Editor</h3>
            <p class="text-sm text-gray-500">
              First edit switches the theme dropdown to Custom.
            </p>

            <div class="grid grid-cols-2 gap-3">
              <div class="flex flex-col gap-1">
                <label class="text-xs font-medium text-gray-500">Primary</label>
                <input
                  type="color"
                  bind:value={customPrimary}
                  oninput={markCustomTheme}
                  class="w-full h-9 rounded cursor-pointer border"
                />
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-xs font-medium text-gray-500">Secondary</label>
                <input
                  type="color"
                  bind:value={customSecondary}
                  oninput={markCustomTheme}
                  class="w-full h-9 rounded cursor-pointer border"
                />
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-xs font-medium text-gray-500">Surface</label>
                <input
                  type="color"
                  bind:value={customSurface}
                  oninput={markCustomTheme}
                  class="w-full h-9 rounded cursor-pointer border"
                />
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-xs font-medium text-gray-500">Card BG</label>
                <input
                  type="color"
                  bind:value={customCardBg}
                  oninput={markCustomTheme}
                  class="w-full h-9 rounded cursor-pointer border"
                />
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-xs font-medium text-gray-500">Card Border</label>
                <input
                  type="color"
                  bind:value={customCardBorderColor}
                  oninput={markCustomTheme}
                  class="w-full h-9 rounded cursor-pointer border"
                />
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-xs font-medium text-gray-500">Text</label>
                <input
                  type="color"
                  bind:value={customText}
                  oninput={markCustomTheme}
                  class="w-full h-9 rounded cursor-pointer border"
                />
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-xs font-medium text-gray-500">Text Hint</label>
                <input
                  type="color"
                  bind:value={customTextHint}
                  oninput={markCustomTheme}
                  class="w-full h-9 rounded cursor-pointer border"
                />
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-xs font-medium text-gray-500">Text Primary</label>
                <input
                  type="color"
                  bind:value={customTextPrimary}
                  oninput={markCustomTheme}
                  class="w-full h-9 rounded cursor-pointer border"
                />
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-xs font-medium text-gray-500">Text Secondary</label>
                <input
                  type="color"
                  bind:value={customTextSecondary}
                  oninput={markCustomTheme}
                  class="w-full h-9 rounded cursor-pointer border"
                />
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-xs font-medium text-gray-500">Surface BG</label>
                <input
                  type="color"
                  bind:value={customSurfaceBg}
                  oninput={markCustomTheme}
                  class="w-full h-9 rounded cursor-pointer border"
                />
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-xs font-medium text-gray-500">Btn BG</label>
                <input
                  type="color"
                  bind:value={customBtnBg}
                  oninput={markCustomTheme}
                  class="w-full h-9 rounded cursor-pointer border"
                />
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-xs font-medium text-gray-500">Btn Border</label>
                <input
                  type="color"
                  bind:value={customBtnBorderColor}
                  oninput={markCustomTheme}
                  class="w-full h-9 rounded cursor-pointer border"
                />
              </div>
            </div>

            <div class="flex flex-wrap gap-4 mt-4">
              <div class="flex flex-col gap-2">
                <span class="text-xs font-medium text-gray-500">Button Radius</span>
                <div class="flex gap-1 flex-wrap">
                  {#each radiusOptions as r}
                    <button
                      type="button"
                      class="px-2 py-1 text-xs rounded border transition-colors"
                      class:bg-indigo-500={customBtnRadius === r}
                      class:text-white={customBtnRadius === r}
                      onclick={() => {
                        markCustomTheme();
                        customBtnRadius = r;
                      }}
                    >{r}</button>
                  {/each}
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <span class="text-xs font-medium text-gray-500">Card Radius</span>
                <div class="flex gap-1 flex-wrap">
                  {#each radiusOptions as r}
                    <button
                      type="button"
                      class="px-2 py-1 text-xs rounded border transition-colors"
                      class:bg-indigo-500={customCardRadius === r}
                      class:text-white={customCardRadius === r}
                      onclick={() => {
                        markCustomTheme();
                        customCardRadius = r;
                      }}
                    >{r}</button>
                  {/each}
                </div>
              </div>
            </div>
          </section>

          <section class="settings-panel">
            <div class="flex items-center justify-between gap-3">
              <h3 class="settings-panel-title">Custom CSS</h3>
              {#if copyStatus}
                <span class="settings-copy-status">{copyStatus}</span>
              {/if}
            </div>
            <p class="text-sm text-gray-500">
              Copy into <code>custom-theme.css</code>, import it after
              <code>svelte-multistyle-ui/theme.css</code>, then use
              <code>theme="custom"</code>.
            </p>
            <pre class="custom-css-code"><code>{customCss}</code></pre>
            <button
              type="button"
              class="settings-copy-button"
              onclick={copyCustomCss}
            >
              Copy CSS
            </button>
          </section>
        </div>
      </aside>
    {/if}

    <!-- FORM COMPONENTS -->
    <section>
      <h2 class="demo-section-title text-2xl font-semibold mb-6 border-b pb-2">
        Form Components
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Button -->
        <Card style={selectedStyle} theme={selectedTheme} elevated={true} class="space-y-3">
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Button
          </p>
          <div class="flex flex-wrap gap-2">
            <Button style={selectedStyle} theme={selectedTheme} variant="filled"
              >{#snippet children()}Filled{/snippet}</Button
            >
            <Button
              style={selectedStyle}
              theme={selectedTheme}
              variant="outlined">{#snippet children()}Outlined{/snippet}</Button
            >
            <Button style={selectedStyle} theme={selectedTheme} variant="text"
              >{#snippet children()}Text{/snippet}</Button
            >
            <Button style={selectedStyle} theme={selectedTheme} variant="tonal"
              >{#snippet children()}Tonal{/snippet}</Button
            >
          </div>
        </Card>

        <!-- IconButton -->
        <Card style={selectedStyle} theme={selectedTheme} elevated={true} class="space-y-3">
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Icon Button
          </p>
          <div class="flex gap-3 items-center">
            <IconButton
              style={selectedStyle}
              theme={selectedTheme}
              variant="filled"
              ariaLabel="Heart">{#snippet children()}♥{/snippet}</IconButton
            >
            <IconButton
              style={selectedStyle}
              theme={selectedTheme}
              variant="outlined"
              ariaLabel="Star">{#snippet children()}★{/snippet}</IconButton
            >
            <IconButton
              style={selectedStyle}
              theme={selectedTheme}
              variant="tonal"
              ariaLabel="Plus">{#snippet children()}+{/snippet}</IconButton
            >
          </div>
        </Card>

        <!-- Input -->
        <Card style={selectedStyle} theme={selectedTheme} elevated={true} class="space-y-3">
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Input
          </p>
          <Input
            style={selectedStyle}
            theme={selectedTheme}
            bind:value={inputVal}
            label="Your name"
            placeholder="Your name"
          />
        </Card>

        <!-- Textarea -->
        <Card style={selectedStyle} theme={selectedTheme} elevated={true} class="space-y-3">
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Textarea
          </p>
          <Textarea
            style={selectedStyle}
            theme={selectedTheme}
            bind:value={textareaVal}
            label="Message"
            placeholder="Message"
            rows={3}
            maxlength={200}
          />
        </Card>

        <!-- Select -->
        <Card style={selectedStyle} theme={selectedTheme} elevated={true} class="space-y-3">
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Select
          </p>
          <Select
            style={selectedStyle}
            theme={selectedTheme}
            bind:value={selectVal}
            options={selectOptions}
            label="Choose"
            placeholder="Choose"
          />
        </Card>

        <!-- MultiSelect -->
        <Card style={selectedStyle} theme={selectedTheme} elevated={true} class="space-y-3">
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Multi-Select
          </p>
          <MultiSelect
            style={selectedStyle}
            theme={selectedTheme}
            bind:selected={multiSelectVal}
            options={selectOptions}
            placeholder="Pick items"
          />
        </Card>

        <!-- Checkbox -->
        <Card style={selectedStyle} theme={selectedTheme} elevated={true} class="space-y-3">
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Checkbox
          </p>
          <Checkbox
            style={selectedStyle}
            theme={selectedTheme}
            bind:checked={checkVal}
            label="Accept terms"
          />
        </Card>

        <!-- Radio -->
        <Card style={selectedStyle} theme={selectedTheme} elevated={true} class="space-y-3">
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Radio
          </p>
          <div class="flex gap-4">
            <Radio
              style={selectedStyle}
              theme={selectedTheme}
              value="a"
              bind:group={radioVal}
              label="Alpha"
            />
            <Radio
              style={selectedStyle}
              theme={selectedTheme}
              value="b"
              bind:group={radioVal}
              label="Beta"
            />
          </div>
        </Card>

        <!-- Toggle -->
        <Card style={selectedStyle} theme={selectedTheme} elevated={true} class="space-y-3">
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Toggle Switch
          </p>
          <Toggle
            style={selectedStyle}
            theme={selectedTheme}
            bind:checked={toggleVal}
            label="Notifications"
          />
        </Card>

        <!-- Slider -->
        <Card style={selectedStyle} theme={selectedTheme} elevated={true} class="space-y-3">
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Slider
          </p>
          <Slider
            style={selectedStyle}
            theme={selectedTheme}
            bind:value={sliderVal}
            min={0}
            max={100}
            label="Volume"
          />
        </Card>

        <!-- Search Input -->
        <Card style={selectedStyle} theme={selectedTheme} elevated={true} class="space-y-3">
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Search Input
          </p>
          <SearchInput
            style={selectedStyle}
            theme={selectedTheme}
            bind:value={searchVal}
            placeholder="Search..."
          />
        </Card>

        <!-- Date Picker -->
        <Card style={selectedStyle} theme={selectedTheme} elevated={true} class="space-y-3">
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Date Picker
          </p>
          <DatePicker
            style={selectedStyle}
            theme={selectedTheme}
            bind:value={dateVal}
            label="Date"
          />
        </Card>

        <!-- File Upload -->
        <Card style={selectedStyle} theme={selectedTheme} elevated={true} class="space-y-3">
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            File Upload
          </p>
          <FileUpload
            style={selectedStyle}
            theme={selectedTheme}
            label="Upload file"
            accept="image/*"
          />
        </Card>
      </div>
    </section>

    <!-- LAYOUT COMPONENTS -->
    <section>
      <h2 class="demo-section-title text-2xl font-semibold mb-6 border-b pb-2">
        Layout Components
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card style={selectedStyle} theme={selectedTheme} elevated={true} class="space-y-3">
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Card
          </p>
          <Card style={selectedStyle} theme={selectedTheme} elevated={true}>
            {#snippet children()}<p style="margin:0">
                This is a card component with elevated shadow and themed
                styling.
              </p>{/snippet}
          </Card>
        </Card>

        <Card style={selectedStyle} theme={selectedTheme} elevated={true} class="space-y-3">
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Divider
          </p>
          <p class="demo-text text-sm">Above</p>
          <Divider style={selectedStyle} theme={selectedTheme} label="OR" />
          <p class="demo-text text-sm">Below</p>
        </Card>

        <Card style={selectedStyle} theme={selectedTheme} elevated={true} class="space-y-3">
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Tabs
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "tab1", label: "Overview" },
              { id: "tab2", label: "Features" },
              { id: "tab3", label: "Pricing" },
            ]}
            bind:active={tabActive}
          />
        </Card>

        <Card style={selectedStyle} theme={selectedTheme} elevated={true} class="space-y-3">
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Accordion
          </p>
          <Accordion
            style={selectedStyle}
            theme={selectedTheme}
            items={accordionItems}
            current="1"
          />
        </Card>

        <Card style={selectedStyle} theme={selectedTheme} elevated={true} class="space-y-3">
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Modal
          </p>
          <Button
            style={selectedStyle}
            theme={selectedTheme}
            variant="filled"
            onclick={() => (modalOpen = true)}
          >
            {#snippet children()}Open Modal{/snippet}
          </Button>
          <Modal
            style={selectedStyle}
            theme={selectedTheme}
            bind:open={modalOpen}
            title="Modal Title"
          >
            {#snippet children()}<p style="margin:0">
                This is a modal dialog with themed styling. Click outside or the
                X to close.
              </p>{/snippet}
          </Modal>
        </Card>
      </div>
    </section>

    <!-- NAVIGATION COMPONENTS -->
    <section>
      <h2 class="demo-section-title text-2xl font-semibold mb-6 border-b pb-2">
        Navigation Components
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card style={selectedStyle} theme={selectedTheme} elevated={true} class="space-y-3">
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Breadcrumb
          </p>
          <Breadcrumb
            style={selectedStyle}
            theme={selectedTheme}
            items={[
              { label: "Home", href: "#" },
              { label: "Products", href: "#" },
              { label: "Details" },
            ]}
          />
        </Card>

        <Card style={selectedStyle} theme={selectedTheme} elevated={true} class="space-y-3">
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Pagination
          </p>
          <Pagination
            style={selectedStyle}
            theme={selectedTheme}
            total={50}
            perPage={10}
            bind:current={paginationPage}
          />
        </Card>

        <Card style={selectedStyle} theme={selectedTheme} elevated={true} class="space-y-3 md:col-span-2">
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Stepper
          </p>
          <Stepper
            style={selectedStyle}
            theme={selectedTheme}
            steps={[
              { label: "Account" },
              { label: "Profile" },
              { label: "Review" },
              { label: "Done" },
            ]}
            current={2}
          />
        </Card>
      </div>
    </section>

    <!-- DATA DISPLAY COMPONENTS -->
    <section>
      <h2 class="demo-section-title text-2xl font-semibold mb-6 border-b pb-2">
        Data Display
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card style={selectedStyle} theme={selectedTheme} elevated={true} class="space-y-3">
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Avatar
          </p>
          <div class="flex gap-3 items-center">
            <Avatar
              style={selectedStyle}
              theme={selectedTheme}
              size="sm"
              fallback="AB"
            />
            <Avatar
              style={selectedStyle}
              theme={selectedTheme}
              size="md"
              fallback="CD"
            />
            <Avatar
              style={selectedStyle}
              theme={selectedTheme}
              size="lg"
              fallback="EF"
            />
          </div>
        </Card>

        <Card style={selectedStyle} theme={selectedTheme} elevated={true} class="space-y-3">
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Badge
          </p>
          <div class="flex gap-2 flex-wrap">
            <Badge style={selectedStyle} theme={selectedTheme} color="primary"
              >{#snippet children()}Primary{/snippet}</Badge
            >
            <Badge style={selectedStyle} theme={selectedTheme} color="success"
              >{#snippet children()}Success{/snippet}</Badge
            >
            <Badge style={selectedStyle} theme={selectedTheme} color="warning"
              >{#snippet children()}Warning{/snippet}</Badge
            >
            <Badge style={selectedStyle} theme={selectedTheme} color="error"
              >{#snippet children()}Error{/snippet}</Badge
            >
          </div>
        </Card>

        <Card style={selectedStyle} theme={selectedTheme} elevated={true} class="space-y-3">
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Tooltip
          </p>
          <Tooltip
            style={selectedStyle}
            theme={selectedTheme}
            text="This is a tooltip!"
          >
            {#snippet children()}<span
                class="demo-text text-sm underline cursor-help">Hover me</span
              >{/snippet}
          </Tooltip>
        </Card>

        <Card style={selectedStyle} theme={selectedTheme} elevated={true} class="space-y-3">
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Progress Bar
          </p>
          <ProgressBar
            style={selectedStyle}
            theme={selectedTheme}
            value={progressVal}
            animated={true}
            label={true}
          />
        </Card>

        <Card style={selectedStyle} theme={selectedTheme} elevated={true} class="space-y-3">
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Spinner
          </p>
          <div class="flex gap-4 items-center">
            <Spinner style={selectedStyle} theme={selectedTheme} size="sm" />
            <Spinner style={selectedStyle} theme={selectedTheme} size="md" />
            <Spinner style={selectedStyle} theme={selectedTheme} size="lg" />
          </div>
        </Card>

        <Card style={selectedStyle} theme={selectedTheme} elevated={true} class="space-y-3">
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Skeleton
          </p>
          <div class="flex gap-3 items-center">
            <Skeleton
              style={selectedStyle}
              theme={selectedTheme}
              variant="circle"
              width="40px"
              height="40px"
            />
            <div class="flex-1 space-y-2">
              <Skeleton
                style={selectedStyle}
                theme={selectedTheme}
                variant="text"
                width="80%"
                height="14px"
              />
              <Skeleton
                style={selectedStyle}
                theme={selectedTheme}
                variant="text"
                width="60%"
                height="14px"
              />
            </div>
          </div>
        </Card>

        <Card style={selectedStyle} theme={selectedTheme} elevated={true} class="space-y-3 md:col-span-2 lg:col-span-3">
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Table
          </p>
          <Table
            style={selectedStyle}
            theme={selectedTheme}
            columns={tableColumns}
            rows={tableRows}
            striped={true}
          />
        </Card>
      </div>
    </section>

    <!-- FEEDBACK COMPONENTS -->
    <section>
      <h2 class="demo-section-title text-2xl font-semibold mb-6 border-b pb-2">
        Feedback
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card style={selectedStyle} theme={selectedTheme} elevated={true} class="space-y-3">
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Alert - Info
          </p>
          <Alert
            style={selectedStyle}
            theme={selectedTheme}
            variant="info"
            title="Information"
          >
            {#snippet children()}This is an informational alert message.{/snippet}
          </Alert>
        </Card>
        <Card style={selectedStyle} theme={selectedTheme} elevated={true} class="space-y-3">
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Alert - Success
          </p>
          <Alert
            style={selectedStyle}
            theme={selectedTheme}
            variant="success"
            title="Success"
            dismissible={true}
          >
            {#snippet children()}Operation completed successfully!{/snippet}
          </Alert>
        </Card>
        <Card style={selectedStyle} theme={selectedTheme} elevated={true} class="space-y-3">
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Alert - Warning
          </p>
          <Alert
            style={selectedStyle}
            theme={selectedTheme}
            variant="warning"
            title="Warning"
          >
            {#snippet children()}Please review before proceeding.{/snippet}
          </Alert>
        </Card>
        <Card style={selectedStyle} theme={selectedTheme} elevated={true} class="space-y-3">
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Alert - Error
          </p>
          <Alert
            style={selectedStyle}
            theme={selectedTheme}
            variant="error"
            title="Error"
          >
            {#snippet children()}Something went wrong. Please try again.{/snippet}
          </Alert>
        </Card>
      </div>
    </section>

    <!-- FAB -->
    <FAB style={selectedStyle} theme={selectedTheme} position="bottom-right">
      {#snippet children()}+{/snippet}
    </FAB>
  </main>
</div>
