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
  import FileUpload from "./lib/components/FileUpload.svelte";
  import DatePicker from "./lib/components/DatePicker.svelte";
  import Card from "./lib/components/Card.svelte";
  import Divider from "./lib/components/Divider.svelte";
  import Tabs from "./lib/components/Tabs.svelte";
  import Carousel from "./lib/components/Carousel.svelte";
  import Accordion from "./lib/components/Accordion.svelte";
  import Modal from "./lib/components/Modal.svelte";
  import Breadcrumb from "./lib/components/Breadcrumb.svelte";
  import Pagination from "./lib/components/Pagination.svelte";
  import Stepper from "./lib/components/Stepper.svelte";
  import Avatar from "./lib/components/Avatar.svelte";
  import Tooltip from "./lib/components/Tooltip.svelte";
  import ProgressBar from "./lib/components/ProgressBar.svelte";
  import Table from "./lib/components/Table.svelte";
  import Alert from "./lib/components/Alert.svelte";
  import Spinner from "./lib/components/Spinner.svelte";
  import Skeleton from "./lib/components/Skeleton.svelte";
  import FAB from "./lib/components/FAB.svelte";
  import Toast from "./lib/components/Toast.svelte";
  import SortableList from "./lib/components/SortableList.svelte";
  import DropdownMenu from "./lib/components/DropdownMenu.svelte";  import Popover from "./lib/components/Popover.svelte";
  import Drawer from "./lib/components/Drawer.svelte";
  import Chip from "./lib/components/Chip.svelte";
  import ButtonGroup from "./lib/components/ButtonGroup.svelte";
  import Rating from "./lib/components/Rating.svelte";
  import CommandPalette from "./lib/components/CommandPalette.svelte";
  import Row from "./lib/components/Row.svelte";
  import Column from "./lib/components/Column.svelte";
  import Grid from "./lib/components/Grid.svelte";

  import { themes as presetConfigs, generateThemeCss, applyThemeToElement, invertHex } from "./lib/themes/index.js";

  // Chart Components
  import BarChart from "./lib/components/charts/BarChart.svelte";
  import LineChart from "./lib/components/charts/LineChart.svelte";
  import PieChart from "./lib/components/charts/PieChart.svelte";
  import DoughnutChart from "./lib/components/charts/DoughnutChart.svelte";
  import RadarChart from "./lib/components/charts/RadarChart.svelte";
  import PolarAreaChart from "./lib/components/charts/PolarAreaChart.svelte";
  import ScatterChart from "./lib/components/charts/ScatterChart.svelte";
  import BubbleChart from "./lib/components/charts/BubbleChart.svelte";
  import StackedBarChart from "./lib/components/charts/StackedBarChart.svelte";
  import StackedLineChart from "./lib/components/charts/StackedLineChart.svelte";

  import Prism from "prismjs";

  function highlight(code) {
    return Prism.highlight(code, Prism.languages.markup, "markup");
  }

  import { defaults, initMultistyleUI } from "./lib/config.js";

  const styles = [
    { value: "material", label: "Material Design" },
    { value: "liquid-glass", label: "Liquid Glass" },
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

  const urlParams = new URLSearchParams(window.location.search);
  let selectedStyle = $state(urlParams.get("style") || "material");
  let selectedTheme = $state(urlParams.get("theme") || "default");
  let mode = $state(urlParams.get("mode") || "system");

  // Theme editor state — single config object { common, light, dark }.
  // Loaded from the selected preset; edits mutate it directly (live preview).
  let editorConfig = $state(structuredClone(presetConfigs.default));

  // Load the chosen preset into the editor whenever the dropdown changes.
  $effect(() => {
    if (selectedTheme !== "custom" && presetConfigs[selectedTheme]) {
      editorConfig = structuredClone(presetConfigs[selectedTheme]);
    }
  });

  // Live-apply the editor config to the demo root (overrides the theme-* class).
  let demoEl;
  $effect(() => {
    if (demoEl) applyThemeToElement(demoEl, editorConfig, isDarkMode);
  });

  const isDarkMode = $derived(
    defaults.mode === "dark" || (defaults.mode === "system" && defaults.systemDark)
  );

  // Keep the global library defaults in sync with the demo controls
  $effect(() => {
    initMultistyleUI({ style: selectedStyle, theme: selectedTheme, mode });
  });

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
  let dateVal = $state("");
  let tabActive = $state("tab1");

  // Top-level category tabs (replace scrolling sections)
  const categoryTabs = [
    { id: "form", label: "Form" },
    { id: "layout", label: "Layout" },
    { id: "navigation", label: "Navigation" },
    { id: "datadisplay", label: "Data Display" },
    { id: "feedback", label: "Feedback" },
    { id: "charts", label: "Charts" },
  ];
  let activeCat = $state("form");
  let layoutTab = $state("preview");

  // Code preview tab states
  let buttonTab = $state("preview");
  let inputTab = $state("preview");
  let btnPreset = $state("primary");
  let btnVariant = $state("filled");
  let textareaTab = $state("preview");
  let selectTab = $state("preview");
  let multiSelectTab = $state("preview");
  let checkboxTab = $state("preview");
  let radioTab = $state("preview");
  let toggleTab = $state("preview");
  let sliderTab = $state("preview");
  let datePickerTab = $state("preview");
  let fileUploadTab = $state("preview");
  let dropdownTab = $state("preview");
  let cardTab = $state("preview");
  let dividerTab = $state("preview");
  let carouselTab = $state("preview");
  let accordionTab = $state("preview");
  let modalTab = $state("preview");
  let drawerTab = $state("preview");
  let cmdPaletteTab = $state("preview");
  let breadcrumbTab = $state("preview");
  let paginationTab = $state("preview");
  let stepperTab = $state("preview");
  let avatarTab = $state("preview");
  let chipTab = $state("preview");
  let tooltipTab = $state("preview");
  let progressBarTab = $state("preview");
  let spinnerTab = $state("preview");
  let skeletonTab = $state("preview");
  let tableTab = $state("preview");
  let alertTab = $state("preview");
  let alertVariant = $state("info");
  let toastTab = $state("preview");
  let ratingTab = $state("preview");
  let popoverTab = $state("preview");
  let fabTab = $state("preview");
  let tabsDemoTab = $state("preview");
  let btnGroupTab = $state("preview");
  let sortableListTab = $state("preview");
  let barChartTab = $state("preview");
  let lineChartTab = $state("preview");
  let pieChartTab = $state("preview");
  let doughnutChartTab = $state("preview");
  let radarChartTab = $state("preview");
  let polarAreaChartTab = $state("preview");
  let scatterChartTab = $state("preview");
  let bubbleChartTab = $state("preview");
  let stackedBarChartTab = $state("preview");
  let stackedLineChartTab = $state("preview");

  let carouselSlides = [
    {
      image: "https://picsum.photos/seed/welcome/600/300",
      alt: "Welcome slide",
      caption: "Explore the component gallery",
    },
    {
      image: "https://picsum.photos/seed/styles/600/300",
      alt: "Styles slide",
      caption: "13 visual design languages",
    },
    {
      image: "https://picsum.photos/seed/themes/600/300",
      alt: "Themes slide",
      caption: "10 color themes available",
    },
  ];

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
  let modalSize = $state("medium");
  let paginationPage = $state(1);
  let progressVal = $state(65);
  let drawerOpen = $state(false);
  let drawerPosition = $state("left");

  const selectOptions = [
    { value: "opt1", label: "Option One" },
    { value: "opt2", label: "Option Two" },
    { value: "opt3", label: "Option Three" },
  ];

  const tableData = [
    { Name: "Alice", Role: "Engineer", Status: "Active" },
    { Name: "Bob", Role: "Designer", Status: "Away" },
    { Name: "Carol", Role: "Manager", Status: "Active" },
  ];

  const radiusOptions = ["0px", "2px", "4px", "8px", "16px", "32px", "9999px"];
  // Lightness lift per dark field — matches generator.js (text light, surfaces dark).
  const darkLift = { text: 20, surface: 10, cardSurface: 14 };

  let dropdownItems = [
    { label: "Profile", icon: "👤", onclick: () => alert("Profile clicked") },
    { label: "Settings", icon: "⚙", onclick: () => alert("Settings clicked") },
    { divider: true },
    {
      label: "Help",
      icon: "❓",
      shortcut: "⌘H",
      onclick: () => alert("Help clicked"),
    },
    {
      label: "Logout",
      icon: "🚪",
      shortcut: "⌘Q",
      onclick: () => alert("Logout clicked"),
    },
  ];
  let popoverOpen = $state(false);
  let chipVals = $state(["React", "Svelte", "Vue"]);
  let btnGroupVal = $state("day");
  let btnGroupItems = [
    { value: "day", label: "Day" },
    { value: "week", label: "Week" },
    { value: "month", label: "Month" },
  ];
  let sortableItems = $state([
    { id: "1", label: "Design Review" },
    { id: "2", label: "Frontend Development" },
    { id: "3", label: "API Integration" },
    { id: "4", label: "QA Testing" },
    { id: "5", label: "Deployment" },
  ]);
  let sortableNested = $state([
    { id: "n1", label: "Project Alpha", children: [
      { id: "n1a", label: "Setup" },
      { id: "n1b", label: "Design" },
    ]},
    { id: "n2", label: "Project Beta", children: [
      { id: "n2a", label: "Research" },
    ]},
    { id: "n3", label: "Project Gamma", children: [] },
  ]);
  let ratingVal = $state(3);
  async function copyCode(code) {
    await navigator.clipboard.writeText(code);
    addToastMsg("Copied!", "success");
  }

  let cmdPaletteOpen = $state(false);
  let cmdGroups = [
    {
      label: "Navigation",
      items: [
        {
          label: "Go to Dashboard",
          icon: "📊",
          shortcut: "⌘1",
          onclick: () => alert("Dashboard"),
        },
        {
          label: "Go to Projects",
          icon: "📁",
          shortcut: "⌘2",
          onclick: () => alert("Projects"),
        },
        {
          label: "Go to Settings",
          icon: "⚙",
          shortcut: "⌘,",
          onclick: () => alert("Settings"),
        },
      ],
    },
    {
      label: "Actions",
      items: [
        {
          label: "New File",
          icon: "📄",
          shortcut: "⌘N",
          onclick: () => alert("New File"),
        },
        {
          label: "Search",
          icon: "🔍",
          shortcut: "⌘F",
          onclick: () => alert("Search"),
        },
        {
          label: "Toggle Dark Mode",
          icon: "🌙",
          shortcut: "⌘D",
          onclick: () => alert("Toggle Dark"),
        },
      ],
    },
  ];

  // Toast management
  let toasts = $state([]);
  let toastPosition = $state("top-right");
  function addToastMsg(msg, variant, icon) {
    const id = Date.now() + Math.random();
    toasts = [...toasts, { id, message: msg, variant, duration: 3000, icon }];
    setTimeout(() => {
      toasts = toasts.filter((t) => t.id !== id);
    }, 3000);
  }

  let settingsOpen = $state(false);
  let copyStatus = $state("");

  // Build a copyable .theme-custom CSS block from the editor config (single
  // source of truth — same generator the build uses).
  function buildCustomCss(cfg) {
    const { light, dark } = generateThemeCss("custom", cfg);
    return `/* custom-theme.css — link after svelte-multistyle-ui/theme.css */
${light}

${dark}

/* Usage:
import "svelte-multistyle-ui/theme.css";
import "./custom-theme.css";
// then pass theme="custom" to components
*/`;
  }

  const customCss = $derived(buildCustomCss(editorConfig));

  async function copyCustomCss() {
    await navigator.clipboard.writeText(customCss);
    copyStatus = "Copied";
    setTimeout(() => (copyStatus = ""), 1800);
  }

  $effect(() => {
    if (!settingsOpen) return;
    const handler = (event) => {
      if (event.key === "Escape") settingsOpen = false;
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  });
</script>

<div
  bind:this={demoEl}
  class="demo-root min-h-screen page-bg transition-colors duration-300 theme-{selectedTheme}"
  class:glass-page-bg={selectedStyle === "liquid-glass"}
  class:dark-mode={isDarkMode}
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
          {#each styles as s}<option value={s.value}>{s.label}</option>{/each}
        </select>
        <label for="theme-sel" class="text-sm header-label">Theme:</label>
        <select
          id="theme-sel"
          bind:value={selectedTheme}
          class="header-select rounded-lg px-3 py-1.5 text-sm border focus:border-indigo-500 focus:outline-none"
        >
          {#each themes as t}<option value={t.value}>{t.label}</option>{/each}
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
          onclick={() => (settingsOpen = true)}>⚙</button
        >
      </div>
    </div>
  </header>

  {#snippet codeBlock(id, code)}
    <div class="component-code-wrapper">
      <button type="button" class="copy-btn" onclick={() => copyCode(code)}>
        Copy
      </button>
      <pre class="component-code"><code>{@html highlight(code)}</code></pre>
    </div>
  {/snippet}

  <main class="max-w-7xl mx-auto p-6 space-y-10">
    {#if settingsOpen}
      <div
        class="settings-backdrop"
        aria-hidden="true"
        onpointerdown={() => (settingsOpen = false)}
      ></div>
      <div
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
            onclick={() => (settingsOpen = false)}>×</button
          >
        </div>
        <div class="settings-content">
          <Card
            style={selectedStyle}
            theme={selectedTheme}
            class="settings-panel"
          >
            <h3 class="settings-panel-title">Theme Editor</h3>
            <p class="text-sm text-gray-500">
              Edits live-preview on the gallery. Switch theme to load a preset;
              dark fields default to HSL-inverted light (check "derive").
            </p>

            <div class="text-xs font-semibold uppercase tracking-wide text-gray-500 mt-3">Common (both modes)</div>
            <div class="grid grid-cols-2 gap-3 mt-2">
              {#each [["Primary", "primary"], ["Secondary", "secondary"], ["Info", "info"], ["Success", "success"], ["Warning", "warning"], ["Error", "error"], ["Text on Primary", "textOnPrimary"]] as [label, key]}
                <div class="flex flex-col gap-1">
                  <label class="text-xs font-medium text-gray-500">{label}</label>
                  <input type="color" bind:value={editorConfig.common[key]} class="w-full h-9 rounded cursor-pointer border" />
                </div>
              {/each}
            </div>

            <div class="flex flex-wrap gap-4 mt-4">
              {#each [["Button Radius", "buttonRadius"], ["Card Radius", "cardRadius"], ["Input Radius", "inputRadius"]] as [label, key]}
                <div class="flex flex-col gap-2">
                  <span class="text-xs font-medium text-gray-500">{label}</span>
                  <div class="flex gap-1 flex-wrap">
                    {#each radiusOptions as r}
                      <button type="button" class="px-2 py-1 text-xs rounded border transition-colors"
                        class:bg-indigo-500={editorConfig.common[key] === r}
                        class:text-white={editorConfig.common[key] === r}
                        onclick={() => (editorConfig.common[key] = r)}>{r}</button>
                    {/each}
                    <button type="button" class="px-2 py-1 text-xs rounded border transition-colors"
                      class:bg-indigo-500={editorConfig.common[key] === null}
                      class:text-white={editorConfig.common[key] === null}
                      onclick={() => (editorConfig.common[key] = null)}>na</button>
                  </div>
                </div>
              {/each}
              <div class="flex flex-col gap-2">
                <span class="text-xs font-medium text-gray-500">Border Width</span>
                <div class="flex gap-1 flex-wrap">
                  {#each ["1px", "1.5px", "2px"] as w}
                    <button type="button" class="px-2 py-1 text-xs rounded border transition-colors"
                      class:bg-indigo-500={editorConfig.common.borderWidth === w}
                      class:text-white={editorConfig.common.borderWidth === w}
                      onclick={() => (editorConfig.common.borderWidth = w)}>{w}</button>
                  {/each}
                  <button type="button" class="px-2 py-1 text-xs rounded border transition-colors"
                    class:bg-indigo-500={editorConfig.common.borderWidth === null}
                    class:text-white={editorConfig.common.borderWidth === null}
                    onclick={() => (editorConfig.common.borderWidth = null)}>na</button>
                </div>
              </div>
            </div>

            <div class="text-xs font-semibold uppercase tracking-wide text-gray-500 mt-4">Light</div>
            <div class="grid grid-cols-3 gap-3 mt-2">
              {#each [["Text", "text"], ["Surface", "surface"], ["Card Surface", "cardSurface"]] as [label, key]}
                <div class="flex flex-col gap-1">
                  <label class="text-xs font-medium text-gray-500">{label}</label>
                  <input type="color" bind:value={editorConfig.light[key]} class="w-full h-9 rounded cursor-pointer border" />
                </div>
              {/each}
            </div>

            <div class="text-xs font-semibold uppercase tracking-wide text-gray-500 mt-4">Dark</div>
            <div class="grid grid-cols-3 gap-3 mt-2">
              {#each [["Text", "text"], ["Surface", "surface"], ["Card Surface", "cardSurface"]] as [label, key]}
                <div class="flex flex-col gap-1">
                  <div class="flex items-center justify-between">
                    <label class="text-xs font-medium text-gray-500">Dark {label}</label>
                    <label class="flex items-center gap-1 text-xs text-gray-400">
                      <input type="checkbox" checked={editorConfig.dark[key] === null}
                        onchange={() => (editorConfig.dark[key] = editorConfig.dark[key] === null ? invertHex(editorConfig.light[key], darkLift[key]) : null)} />
                      derive
                    </label>
                  </div>
                  <input type="color"
                    value={editorConfig.dark[key] ?? invertHex(editorConfig.light[key], darkLift[key])}
                    disabled={editorConfig.dark[key] === null}
                    oninput={(e) => (editorConfig.dark[key] = e.currentTarget.value)}
                    class="w-full h-9 rounded cursor-pointer border" />
                </div>
              {/each}
            </div>
          </Card>
          <Card
            style={selectedStyle}
            theme={selectedTheme}
            class="settings-panel"
          >
            <div class="flex items-center justify-between gap-3">
              <h3 class="settings-panel-title">Custom CSS</h3>
              {#if copyStatus}<span class="settings-copy-status"
                  >{copyStatus}</span
                >{/if}
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
              onclick={copyCustomCss}>Copy CSS</button
            >
          </Card>

          <Card
            style={selectedStyle}
            theme={selectedTheme}
            class="settings-panel"
          >
            <h3 class="settings-panel-title">How to use custom CSS</h3>
            <ul
              class="settings-help-list text-sm text-gray-600 dark:text-gray-300 space-y-2"
            >
              <li>
                <strong>Import order matters:</strong> load
                <code>svelte-multistyle-ui/theme.css</code> first, then your custom
                stylesheet.
              </li>
              <li>
                <strong>Name your theme class:</strong> define
                <code>.my-theme</code>
                (or <code>.theme-custom</code>) and set any <code>--t-*</code> tokens.
              </li>
              <li>
                <strong>Apply it:</strong> pass <code>theme="my-theme"</code> to
                components, or add <code>class="my-theme"</code> to a parent element.
              </li>
              <li>
                <strong>Start from scratch:</strong> import only
                <code>svelte-multistyle-ui/theme-base.css</code>
                and define every <code>.theme-*</code> class.
              </li>
              <li>
                <strong>Component overrides:</strong> target
                <code>.s-&lt;component&gt;-&lt;style&gt;</code> classes for one-off
                visual tweaks.
              </li>
            </ul>
          </Card>
        </div>
      </div>
    {/if}

    <div class="category-tabs">
      <Tabs
        style={selectedStyle}
        theme={selectedTheme}
        tabs={categoryTabs}
        bind:active={activeCat}
      />
    </div>

    <!-- FORM COMPONENTS -->
    <section class:hidden={activeCat !== "form"}>
      <h2 class="demo-section-title text-2xl font-semibold mb-6 border-b pb-2">
        Form Components
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Button / IconButton / FAB (preset + variant drive all samples) -->
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Buttons
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={buttonTab}
          />
          {#if buttonTab === "preview"}
            <div class="flex flex-wrap items-center gap-2">
              <span class="demo-label text-xs font-semibold uppercase tracking-wide"
                >preset</span
              >
              <select
                bind:value={btnPreset}
                class="border rounded px-2 py-1 text-sm bg-transparent"
              >
                <option value="primary">primary</option>
                <option value="secondary">secondary</option>
                <option value="info">info</option>
                <option value="success">success</option>
                <option value="warning">warning</option>
                <option value="error">error</option>
              </select>
              <span class="demo-label text-xs font-semibold uppercase tracking-wide ml-2"
                >variant</span
              >
              <select
                bind:value={btnVariant}
                class="border rounded px-2 py-1 text-sm bg-transparent"
              >
                <option value="filled">filled</option>
                <option value="outlined">outlined</option>
                <option value="text">text</option>
                <option value="tonal">tonal</option>
              </select>
            </div>

            <p class="demo-label text-xs mt-3">Button</p>
            <div class="flex flex-wrap gap-2 items-center">
              <Button variant={btnVariant} preset={btnPreset}
                >{#snippet children()}Click me{/snippet}</Button
              >
              <Button variant={btnVariant} preset={btnPreset} icon="add"
                >{#snippet children()}Add{/snippet}</Button
              >
              <Button variant={btnVariant} preset={btnPreset} icon="edit"
                >{#snippet children()}Edit{/snippet}</Button
              >
            </div>

            <p class="demo-label text-xs mt-2">IconButton</p>
            <div class="flex flex-wrap gap-2 items-center">
              <IconButton variant={btnVariant} preset={btnPreset} ariaLabel="Favorite" icon="favorite" />
              <IconButton variant={btnVariant} preset={btnPreset} ariaLabel="Star" icon="star" />
              <IconButton variant={btnVariant} preset={btnPreset} ariaLabel="Delete" icon="delete" />
            </div>

            <p class="demo-label text-xs mt-2">
              FAB — floating bottom-right uses the selected preset (no variant)
            </p>
          {:else}
            {@render codeBlock(
              "btn",
              `<Button variant="filled" preset="success">Save</Button>

<Button variant="outlined" preset="error" icon="delete">Delete</Button>

<IconButton variant="tonal" preset="info" icon="info" ariaLabel="Info" />

<!-- FAB has no variant; preset drives its color -->
<FAB preset="warning">+</FAB>

<!-- variant: filled | outlined | text | tonal -->
<!-- preset: primary | secondary | info | success | warning | error -->`,
            )}
          {/if}
        </Card>

        <!-- Input -->
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Input
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={inputTab}
          />
          {#if inputTab === "preview"}
            <div class="space-y-3">
              <Input
                bind:value={inputVal}
                label="Your name"
                placeholder="Your name"
              />
              <Input
                bind:value={inputVal}
                placeholder="Search..."
                iconStart="search"
              />
              <Input
                bind:value={inputVal}
                placeholder="Password"
                iconStart="lock"
                iconEnd="visibility"
                type="password"
              />
            </div>
          {:else}
            {@render codeBlock(
              "input",
              `<Input
  bind:value={name}
  label="Your name"
  placeholder="Your name"
/>

<!-- With icons at start/end: -->
<Input
  placeholder="Search..."
  iconStart="search"
/>

<Input
  placeholder="Password"
  iconStart="lock"
  iconEnd="visibility"
  type="password"
/>`,
            )}
          {/if}
        </Card>

        <!-- Textarea -->
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Textarea
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={textareaTab}
          />
          {#if textareaTab === "preview"}
            <Textarea
              bind:value={textareaVal}
              label="Message"
              placeholder="Message"
              rows={3}
              maxlength={200}
            />
          {:else}
            {@render codeBlock(
              "textarea",
              `<Textarea
  bind:value={msg}
  label="Message"
  rows={4}
  maxlength={200}
/>`,
            )}
          {/if}
        </Card>

        <!-- Select -->
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Select
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={selectTab}
          />
          {#if selectTab === "preview"}
            <Select
              bind:value={selectVal}
              options={selectOptions}
              label="Choose"
              placeholder="Choose"
            />
          {:else}
            {@render codeBlock(
              "select",
              `<Select
  bind:value={val}
  options={options}
  label="Choose"
  placeholder="Choose"
/>`,
            )}
          {/if}
        </Card>

        <!-- MultiSelect -->
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Multi-Select
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={multiSelectTab}
          />
          {#if multiSelectTab === "preview"}
            <MultiSelect
              bind:selected={multiSelectVal}
              options={selectOptions}
              placeholder="Pick items"
            />
          {:else}
            {@render codeBlock(
              "multiSelect",
              `<MultiSelect
  bind:selected={selected}
  options={options}
  placeholder="Pick items"
/>`,
            )}
          {/if}
        </Card>

        <!-- Checkbox -->
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Checkbox
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={checkboxTab}
          />
          {#if checkboxTab === "preview"}
            <Checkbox bind:checked={checkVal} label="Accept terms" />
          {:else}
            {@render codeBlock(
              "checkbox",
              `<Checkbox
  bind:checked={accepted}
  label="Accept terms"
/>`,
            )}
          {/if}
        </Card>

        <!-- Radio -->
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Radio
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={radioTab}
          />
          {#if radioTab === "preview"}
            <div class="flex gap-4">
              <Radio value="a" bind:group={radioVal} label="Alpha" />
              <Radio value="b" bind:group={radioVal} label="Beta" />
            </div>
          {:else}
            {@render codeBlock(
              "radio",
              `<Radio value="a" bind:group={val} label="Alpha" />

<Radio value="b" bind:group={val} label="Beta" />`,
            )}
          {/if}
        </Card>

        <!-- Toggle -->
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Toggle Switch
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={toggleTab}
          />
          {#if toggleTab === "preview"}
            <Toggle bind:checked={toggleVal} label="Notifications" />
          {:else}
            {@render codeBlock(
              "toggle",
              `<Toggle
  bind:checked={enabled}
  label="Notifications"
/>`,
            )}
          {/if}
        </Card>

        <!-- Slider -->
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Slider
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={sliderTab}
          />
          {#if sliderTab === "preview"}
            <Slider bind:value={sliderVal} min={0} max={100} label="Volume" />
          {:else}
            {@render codeBlock(
              "slider",
              `<Slider
  bind:value={val}
  min={0}
  max={100}
  label="Volume"
/>`,
            )}
          {/if}
        </Card>

        <!-- Date Picker -->
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Date Picker
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={datePickerTab}
          />
          {#if datePickerTab === "preview"}
            <div class="space-y-4">
              <DatePicker
                bind:value={dateVal}
                label="Date (ISO)"
                placeholder="Pick a date"
              />
              <DatePicker
                bind:value={dateVal}
                format="DD/MM/YYYY"
                displayFormat="MMM DD, YYYY"
                label="Custom format"
                placeholder="DD/MM/YYYY"
              />
              <DatePicker
                bind:value={dateVal}
                format="YYYY-MM-DD hh:mm"
                displayFormat="MMM DD, YYYY hh:mm"
                label="With time"
                placeholder="YYYY-MM-DD hh:mm"
              />
              <DatePicker
                bind:value={dateVal}
                label="Date range (min/max)"
                min="2025-01-01"
                max="2025-12-31"
                placeholder="Pick a date in 2025"
              />
            </div>
          {:else}
            {@render codeBlock(
              "datePicker",
              `<script>
  let date = $state("2025-06-15");
</script>

<!-- Default: save as ISO (YYYY-MM-DD) -->
<DatePicker bind:value={date} label="Date" />

<!-- Custom save & display formats:
     value stores as DD/MM/YYYY but shows as "Jun 15, 2025" -->
<DatePicker
  bind:value={date}
  format="DD/MM/YYYY"
  displayFormat="MMM DD, YYYY"
  label="Custom format"
/>

<!-- With time: when format includes hh/mm, time picker appears -->
<DatePicker
  bind:value={date}
  format="YYYY-MM-DD hh:mm"
  displayFormat="MMM DD, YYYY hh:mm"
  label="With time"
/>

<!-- Restrict with min/max (values use the same format as the format prop): -->
<DatePicker
  bind:value={date}
  min="2025-01-01"
  max="2025-12-31"
  label="Date range"
/>`,
            )}
          {/if}
        </Card>

        <!-- File Upload -->
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            File Upload
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={fileUploadTab}
          />
          {#if fileUploadTab === "preview"}
            <FileUpload label="Upload file" accept="image/*" />
          {:else}
            {@render codeBlock(
              "fileUpload",
              `<FileUpload
  label="Upload file"
  accept="image/*"
/>`,
            )}
          {/if}
        </Card>

        <!-- Dropdown Menu -->
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Dropdown Menu
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={dropdownTab}
          />
          {#if dropdownTab === "preview"}
            <div class="flex flex-wrap gap-2">
              <DropdownMenu
                items={dropdownItems}
                variant="primary"
                position="bottom"
              >
                {#snippet children()}<Button variant="filled"
                    >{#snippet children()}Primary{/snippet}</Button
                  >{/snippet}
              </DropdownMenu>
              <DropdownMenu
                items={dropdownItems.slice(0, 2)}
                variant="secondary"
                position="bottom"
              >
                {#snippet children()}<Button variant="outlined"
                    >{#snippet children()}Secondary{/snippet}</Button
                  >{/snippet}
              </DropdownMenu>
              <DropdownMenu
                items={dropdownItems.slice(0, 3)}
                variant="success"
                position="bottom"
              >
                {#snippet children()}<Button variant="tonal"
                    >{#snippet children()}Success{/snippet}</Button
                  >{/snippet}
              </DropdownMenu>
            </div>
          {:else}
            {@render codeBlock(
              "dropdown",
              `<DropdownMenu
  items={items}
  variant="primary"
  position="bottom"
>
  <Button variant="filled">Menu</Button>
</DropdownMenu>

<DropdownMenu
  items={items}
  variant="secondary"
  position="bottom"
>
  <Button variant="outlined">Menu</Button>
</DropdownMenu>`,
            )}
          {/if}
        </Card>

        <!-- ButtonGroup -->
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Button Group
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={btnGroupTab}
          />
          {#if btnGroupTab === "preview"}
            <div class="flex flex-col gap-2">
              <p class="demo-label text-xs font-semibold">Horizontal</p>
              <ButtonGroup
                items={btnGroupItems}
                bind:value={btnGroupVal}
                variant="outlined"
              />
              <p class="demo-label text-xs font-semibold">Filled Variant</p>
              <ButtonGroup
                items={[
                  { value: "left", label: "Left" },
                  { value: "center", label: "Center" },
                  { value: "right", label: "Right" },
                ]}
                bind:value={btnGroupVal}
                variant="filled"
              />
              <p class="demo-label text-xs font-semibold">Vertical</p>
              <div class="flex justify-center">
                <ButtonGroup
                  items={[
                    { value: "sm", label: "S", icon: "🔽" },
                    { value: "md", label: "M", icon: "⏸" },
                    { value: "lg", label: "L", icon: "🔼" },
                  ]}
                  bind:value={btnGroupVal}
                  variant="outlined"
                  orientation="vertical"
                />
              </div>
            </div>
          {:else}
            {@render codeBlock(
              "btnGroup",
              `<ButtonGroup
  items={items}
  bind:value={val}
  variant="outlined"
/>

<ButtonGroup
  items={items}
  bind:value={val}
  variant="filled"
/>

<ButtonGroup
  items={items}
  bind:value={val}
  variant="outlined"
  orientation="vertical"
/>`,
            )}
          {/if}
        </Card>
      </div>

      <!-- Sortable List -->
      <div class="mt-6">
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Sortable List
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={sortableListTab}
          />
          {#if sortableListTab === "preview"}
            <div class="space-y-6">
              <div>
                <p class="demo-label text-xs font-semibold">Horizontal</p>
                <SortableList items={sortableItems} direction="horizontal" onUpdate={(v) => sortableItems = v}>
                  {#snippet children(item)}
                    <span>{item.label}</span>
                  {/snippet}
                </SortableList>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p class="demo-label text-xs font-semibold">Vertical</p>
                  <SortableList items={sortableItems} direction="vertical" onUpdate={(v) => sortableItems = v}>
                    {#snippet children(item)}
                      <span>{item.label}</span>
                    {/snippet}
                  </SortableList>
                </div>
                <div>
                  <p class="demo-label text-xs font-semibold">Nested</p>
                  <SortableList items={sortableNested} type="parent" direction="vertical" onUpdate={(v) => sortableNested = v}>
                    {#snippet children(item)}
                      <div class="flex-1">
                        <span>{item.label}</span>
                        {#if item.children?.length}
                          <div class="mt-2">
                            <SortableList items={item.children} type="child" direction="vertical" onUpdate={(v) => item.children = v}>
                              {#snippet children(child)}
                                <span>{child.label}</span>
                              {/snippet}
                            </SortableList>
                          </div>
                        {/if}
                      </div>
                    {/snippet}
                  </SortableList>
                </div>
              </div>
            </div>
          {:else}
            {@render codeBlock(
              "sortableList",
              `<SortableList items={items} direction="vertical" onUpdate={(v) => items = v}>
  {#snippet children(item)}
    <span>{item.label}</span>
  {/snippet}
</SortableList>

<SortableList items={items} direction="horizontal" onUpdate={(v) => items = v}>
  {#snippet children(item)}
    <span>{item.label}</span>
  {/snippet}
</SortableList>

<!-- Nested: Each parent item renders its own SortableList -->
<SortableList items={nestedItems} type="parent" direction="vertical">
  {#snippet children(item)}
    <span>{item.label}</span>
    {#if item.children?.length}
      <SortableList items={item.children} type="child" direction="vertical">
        {#snippet children(child)}
          <span>{child.label}</span>
        {/snippet}
      </SortableList>
    {/if}
  {/snippet}
</SortableList>`,
            )}
          {/if}
        </Card>
      </div>
    </section>

    <!-- LAYOUT COMPONENTS -->
    <section class:hidden={activeCat !== "layout"}>
      <h2 class="demo-section-title text-2xl font-semibold mb-6 border-b pb-2">
        Layout Components
      </h2>
      <div class="mb-6">
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Row / Column / Grid
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={layoutTab}
          />
          {#if layoutTab === "preview"}
            {#snippet lbl(text)}
              <p
                style="color:var(--t-text-hint);font-size:11px;margin:0 0 4px;"
              >
                {text}
              </p>
            {/snippet}
            {#snippet cell(text, extra)}
              <div
                style={`padding:6px 10px;text-align:center;border-radius:6px;background:var(--t-card-surface);border:1px solid var(--t-border);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;${extra}`}
              >{text}</div>
            {/snippet}
            <Column gap="14px" fill>
              <p
                class="demo-label text-xs font-semibold uppercase tracking-wide"
                style="margin:0;"
              >
                Row — align (cross-axis)
              </p>
              {@render lbl("align=start — items pin to top")}
              <div class="layout-stage">
                <Row gap="8px" align="start" class="h-20" fill>
                  {@render cell("A", "height:24px;")}
                  {@render cell("B", "height:40px;")}
                  {@render cell("C", "height:32px;")}
                </Row>
              </div>
              {@render lbl("align=center — items centered vertically")}
              <div class="layout-stage">
                <Row gap="8px" align="center" class="h-20" fill>
                  {@render cell("A", "height:24px;")}
                  {@render cell("B", "height:40px;")}
                  {@render cell("C", "height:32px;")}
                </Row>
              </div>
              {@render lbl("align=end — items pin to bottom")}
              <div class="layout-stage">
                <Row gap="8px" align="end" class="h-20" fill>
                  {@render cell("A", "height:24px;")}
                  {@render cell("B", "height:40px;")}
                  {@render cell("C", "height:32px;")}
                </Row>
              </div>
              {@render lbl("align=baseline — text baselines line up")}
              <div class="layout-stage">
                <Row gap="8px" align="baseline" class="h-20" fill>
                  {@render cell("A", "height:24px;font-size:10px;")}
                  {@render cell("B", "height:40px;font-size:18px;")}
                  {@render cell("C", "height:32px;font-size:14px;")}
                </Row>
              </div>

              <p
                class="demo-label text-xs font-semibold uppercase tracking-wide"
                style="margin:0;"
              >
                Row — justify (main-axis)
              </p>
              {@render lbl("justify=start")}
              <div class="layout-stage">
                <Row gap="8px" justify="start" fill>
                  {@render cell("1", "width:48px;")}
                  {@render cell("2", "width:48px;")}
                  {@render cell("3", "width:48px;")}
                </Row>
              </div>
              {@render lbl("justify=center")}
              <div class="layout-stage">
                <Row gap="8px" justify="center" fill>
                  {@render cell("1", "width:48px;")}
                  {@render cell("2", "width:48px;")}
                  {@render cell("3", "width:48px;")}
                </Row>
              </div>
              {@render lbl("justify=end")}
              <div class="layout-stage">
                <Row gap="8px" justify="end" fill>
                  {@render cell("1", "width:48px;")}
                  {@render cell("2", "width:48px;")}
                  {@render cell("3", "width:48px;")}
                </Row>
              </div>
              {@render lbl("justify=between — max space between")}
              <div class="layout-stage">
                <Row gap="8px" justify="between" fill>
                  {@render cell("1", "width:48px;")}
                  {@render cell("2", "width:48px;")}
                  {@render cell("3", "width:48px;")}
                </Row>
              </div>
              {@render lbl("justify=around")}
              <div class="layout-stage">
                <Row gap="8px" justify="around" fill>
                  {@render cell("1", "width:48px;")}
                  {@render cell("2", "width:48px;")}
                  {@render cell("3", "width:48px;")}
                </Row>
              </div>
              {@render lbl("justify=evenly")}
              <div class="layout-stage">
                <Row gap="8px" justify="evenly" fill>
                  {@render cell("1", "width:48px;")}
                  {@render cell("2", "width:48px;")}
                  {@render cell("3", "width:48px;")}
                </Row>
              </div>

              <p
                class="demo-label text-xs font-semibold uppercase tracking-wide"
                style="margin:0;"
              >
                Row — fill &amp; wrap
              </p>
              {@render lbl("fill=false — Row shrinks to content width")}
              <div class="layout-stage">
                <Row gap="8px">
                  {@render cell("A", "width:60px;")}
                  {@render cell("B", "width:60px;")}
                  {@render cell("C", "width:60px;")}
                </Row>
              </div>
              {@render lbl("fill=true — Row stretches to 100% width")}
              <div class="layout-stage">
                <Row gap="8px" fill justify="between">
                  {@render cell("A", "width:60px;")}
                  {@render cell("B", "width:60px;")}
                  {@render cell("C", "width:60px;")}
                </Row>
              </div>
              {@render lbl("wrap=true — items wrap to next line when out of room")}
              <div class="layout-stage">
                <Row gap="8px" wrap fill>
                  {@render cell("1", "width:120px;height:36px;")}
                  {@render cell("2", "width:120px;height:36px;")}
                  {@render cell("3", "width:120px;height:36px;")}
                  {@render cell("4", "width:120px;height:36px;")}
                  {@render cell("5", "width:120px;height:36px;")}
                  {@render cell("6", "width:120px;height:36px;")}
                </Row>
              </div>

              <p
                class="demo-label text-xs font-semibold uppercase tracking-wide"
                style="margin:0;"
              >
                Column — align (cross-axis = horizontal)
              </p>
              {@render lbl("align=start — items pin left")}
              <div class="layout-stage">
                <Column gap="8px" align="start" fill>
                  {@render cell("A", "width:80px;")}
                  {@render cell("B", "width:120px;")}
                  {@render cell("C", "width:60px;")}
                </Column>
              </div>
              {@render lbl("align=center — items centered horizontally")}
              <div class="layout-stage">
                <Column gap="8px" align="center" fill>
                  {@render cell("A", "width:80px;")}
                  {@render cell("B", "width:120px;")}
                  {@render cell("C", "width:60px;")}
                </Column>
              </div>
              {@render lbl("align=end — items pin right")}
              <div class="layout-stage">
                <Column gap="8px" align="end" fill>
                  {@render cell("A", "width:80px;")}
                  {@render cell("B", "width:120px;")}
                  {@render cell("C", "width:60px;")}
                </Column>
              </div>
              {@render lbl("align=stretch — items fill cross axis (no fixed width)")}
              <div class="layout-stage">
                <Column gap="8px" align="stretch" fill>
                  {@render cell("A", "")}
                  {@render cell("B", "")}
                  {@render cell("C", "")}
                </Column>
              </div>

              <p
                class="demo-label text-xs font-semibold uppercase tracking-wide"
                style="margin:0;"
              >
                Column — justify (main-axis = vertical)
              </p>
              {@render lbl("justify=start (default)")}
              <div class="layout-stage">
                <Column gap="8px" justify="start" fill class="h-28">
                  {@render cell("A", "width:80px;")}
                  {@render cell("B", "width:80px;")}
                </Column>
              </div>
              {@render lbl("justify=center")}
              <div class="layout-stage">
                <Column gap="8px" justify="center" fill class="h-28">
                  {@render cell("A", "width:80px;")}
                  {@render cell("B", "width:80px;")}
                </Column>
              </div>
              {@render lbl("justify=between — push to top &amp; bottom")}
              <div class="layout-stage">
                <Column gap="8px" justify="between" fill class="h-28">
                  {@render cell("A", "width:80px;")}
                  {@render cell("B", "width:80px;")}
                </Column>
              </div>

              <p
                class="demo-label text-xs font-semibold uppercase tracking-wide"
                style="margin:0;"
              >
                Grid — align (align-items, cross-axis)
              </p>
              {@render lbl("align=start — cells pin to top of their track")}
              <div class="layout-stage">
                <Grid columns={3} gap="8px" align="start" class="h-24" fill>
                  {@render cell("1", "height:28px;")}
                  {@render cell("2", "height:28px;")}
                  {@render cell("3", "height:28px;")}
                  {@render cell("4", "height:28px;")}
                  {@render cell("5", "height:28px;")}
                  {@render cell("6", "height:28px;")}
                </Grid>
              </div>
              {@render lbl("align=center")}
              <div class="layout-stage">
                <Grid columns={3} gap="8px" align="center" class="h-24" fill>
                  {@render cell("1", "height:28px;")}
                  {@render cell("2", "height:28px;")}
                  {@render cell("3", "height:28px;")}
                  {@render cell("4", "height:28px;")}
                  {@render cell("5", "height:28px;")}
                  {@render cell("6", "height:28px;")}
                </Grid>
              </div>
              {@render lbl("align=end — cells pin to bottom of their track")}
              <div class="layout-stage">
                <Grid columns={3} gap="8px" align="end" class="h-24" fill>
                  {@render cell("1", "height:28px;")}
                  {@render cell("2", "height:28px;")}
                  {@render cell("3", "height:28px;")}
                  {@render cell("4", "height:28px;")}
                  {@render cell("5", "height:28px;")}
                  {@render cell("6", "height:28px;")}
                </Grid>
              </div>
              {@render lbl("align=stretch — cells fill their track (no fixed height)")}
              <div class="layout-stage">
                <Grid columns={3} gap="8px" align="stretch" class="h-24" fill>
                  {@render cell("1", "")}
                  {@render cell("2", "")}
                  {@render cell("3", "")}
                </Grid>
              </div>

              <p
                class="demo-label text-xs font-semibold uppercase tracking-wide"
                style="margin:0;"
              >
                Grid — justify (justify-items, within each cell's column track)
              </p>
              {@render lbl("justify=start — cells pin left")}
              <div class="layout-stage">
                <Grid columns={3} gap="8px" justify="start" fill>
                  {@render cell("1", "width:50px;")}
                  {@render cell("2", "width:50px;")}
                  {@render cell("3", "width:50px;")}
                </Grid>
              </div>
              {@render lbl("justify=center — cells centered in track")}
              <div class="layout-stage">
                <Grid columns={3} gap="8px" justify="center" fill>
                  {@render cell("1", "width:50px;")}
                  {@render cell("2", "width:50px;")}
                  {@render cell("3", "width:50px;")}
                </Grid>
              </div>
              {@render lbl("justify=end — cells pin right")}
              <div class="layout-stage">
                <Grid columns={3} gap="8px" justify="end" fill>
                  {@render cell("1", "width:50px;")}
                  {@render cell("2", "width:50px;")}
                  {@render cell("3", "width:50px;")}
                </Grid>
              </div>
              {@render lbl("justify=between — space between cells in each row track")}
              <div class="layout-stage">
                <Grid columns={3} gap="8px" justify="between" fill>
                  {@render cell("1", "width:50px;")}
                  {@render cell("2", "width:50px;")}
                  {@render cell("3", "width:50px;")}
                </Grid>
              </div>

              <p
                class="demo-label text-xs font-semibold uppercase tracking-wide"
                style="margin:0;"
              >
                Grid — place-items (align + justify together)
              </p>
              {@render lbl("align=center + justify=center → cells centered both axes")}
              <div class="layout-stage">
                <Grid columns={3} gap="8px" align="center" justify="center" class="h-24" fill>
                  {@render cell("1", "height:32px;width:50px;")}
                  {@render cell("2", "height:32px;width:50px;")}
                  {@render cell("3", "height:32px;width:50px;")}
                  {@render cell("4", "height:32px;width:50px;")}
                  {@render cell("5", "height:32px;width:50px;")}
                  {@render cell("6", "height:32px;width:50px;")}
                </Grid>
              </div>
              {@render lbl("align=end + justify=end → cells bottom-right of each track")}
              <div class="layout-stage">
                <Grid columns={3} gap="8px" align="end" justify="end" class="h-24" fill>
                  {@render cell("1", "height:32px;width:50px;")}
                  {@render cell("2", "height:32px;width:50px;")}
                  {@render cell("3", "height:32px;width:50px;")}
                </Grid>
              </div>

              <p
                class="demo-label text-xs font-semibold uppercase tracking-wide"
                style="margin:0;"
              >
                Grid — responsive &amp; explicit rows
              </p>
              {@render lbl('columns="auto" minColumnWidth="100px" — auto-fill, wraps on narrow widths')}
              <div class="layout-stage">
                <Grid columns="auto" minColumnWidth="100px" gap="8px" fill>
                  {@render cell("1", "height:40px;")}
                  {@render cell("2", "height:40px;")}
                  {@render cell("3", "height:40px;")}
                  {@render cell("4", "height:40px;")}
                  {@render cell("5", "height:40px;")}
                </Grid>
              </div>
              {@render lbl('columns={3} rows="60px 60px" — fixed row tracks')}
              <div class="layout-stage">
                <Grid columns={3} rows="60px 60px" gap="8px" fill>
                  {@render cell("1", "")}
                  {@render cell("2", "")}
                  {@render cell("3", "")}
                  {@render cell("4", "")}
                  {@render cell("5", "")}
                  {@render cell("6", "")}
                </Grid>
              </div>
            </Column>
          {:else}
            {@render codeBlock(
              "layout",
              `<!-- Row: align = cross-axis, justify = main-axis, fill = width:100%, wrap -->
<Row gap="8px" align="center" justify="between" fill wrap>
  <Button>One</Button>
  <Button>Two</Button>
  <Button>Three</Button>
</Row>

<!-- Column: align = cross-axis (horizontal), justify = main-axis (vertical) -->
<Column gap="8px" align="stretch" justify="between" fill>
  <Button>Top</Button>
  <Button>Bottom</Button>
</Column>

<!-- Grid: align = align-items, justify = justify-items (place-items = both) -->
<Grid columns={3} gap="8px" align="center" justify="center" fill>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</Grid>

<!-- Responsive auto-fill grid: as many 100px+ columns as fit -->
<Grid columns="auto" minColumnWidth="100px" gap="8px" fill>
  <div>1</div>
  <div>2</div>
  <div>3</div>
</Grid>

<!-- Explicit row tracks -->
<Grid columns={3} rows="60px 60px" gap="8px" fill>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</Grid>`,
            )}
          {/if}
        </Card>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Card -->
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Card
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={cardTab}
          />
          {#if cardTab === "preview"}
            <Card elevated={true}
              >{#snippet children()}<p style="margin:0">
                  This is a card component with elevated shadow and themed
                  styling.
                </p>{/snippet}</Card
            >
          {:else}
            {@render codeBlock(
              "card",
              `<Card elevated={true}>
  <p>Content inside the card.</p>
</Card>`,
            )}
          {/if}
        </Card>

        <!-- Divider -->
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Divider
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={dividerTab}
          />
          {#if dividerTab === "preview"}
            <p class="demo-text text-sm">Above</p>
            <Divider label="OR" />
            <p class="demo-text text-sm">Below</p>
          {:else}
            {@render codeBlock("divider", `<Divider label="OR" />`)}
          {/if}
        </Card>

        <!-- Tabs -->
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Tabs
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={tabsDemoTab}
          />
          {#if tabsDemoTab === "preview"}
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
          {:else}
            {@render codeBlock(
              "tabs",
              `<Tabs
  tabs={[
    { id: "tab1", label: "Overview" },
    { id: "tab2", label: "Features" },
    { id: "tab3", label: "Pricing" }
  ]}
  bind:active={activeTab}
/>`,
            )}
          {/if}
        </Card>

        <!-- Accordion -->
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Accordion
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={accordionTab}
          />
          {#if accordionTab === "preview"}
            <Accordion items={accordionItems} current="1" />
          {:else}
            {@render codeBlock(
              "accordion",
              `<Accordion
  items={items}
  current="1"
/>`,
            )}
          {/if}
        </Card>

        <!-- Carousel -->
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Carousel
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={carouselTab}
          />
          {#if carouselTab === "preview"}
            <Carousel slides={carouselSlides} autoPlay={true} interval={4000} />
          {:else}
            {@render codeBlock(
              "carousel",
              `<script>
  let slides = [
    {
      image: "https://picsum.photos/seed/welcome/600/300",
      alt: "Welcome slide",
      caption: "Explore the component gallery"
    },
    {
      image: "https://picsum.photos/seed/styles/600/300",
      alt: "Styles slide",
      caption: "13 visual design languages"
    },
    {
      image: "https://picsum.photos/seed/themes/600/300",
      alt: "Themes slide",
      caption: "10 color themes available"
    }
  ];
</script>
<Carousel slides={slides} autoPlay={true} interval={4000} />`,
            )}
          {/if}
        </Card>

        <!-- Modal -->
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Modal
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={modalTab}
          />
          {#if modalTab === "preview"}
            <div class="flex flex-wrap gap-2">
              <Button
                variant="filled"
                onclick={() => {
                  modalSize = "small";
                  modalOpen = true;
                }}>{#snippet children()}Small{/snippet}</Button
              >
              <Button
                variant="filled"
                onclick={() => {
                  modalSize = "medium";
                  modalOpen = true;
                }}>{#snippet children()}Medium{/snippet}</Button
              >
              <Button
                variant="filled"
                onclick={() => {
                  modalSize = "large";
                  modalOpen = true;
                }}>{#snippet children()}Large{/snippet}</Button
              >
              <Button
                variant="filled"
                onclick={() => {
                  modalSize = "full";
                  modalOpen = true;
                }}>{#snippet children()}Full{/snippet}</Button
              >
            </div>
            <Modal size={modalSize} bind:open={modalOpen} title="Modal Title"
              >{#snippet children()}<p style="margin:0">
                  This is a modal dialog with themed styling.
                </p>{/snippet}</Modal
            >
          {:else}
            {@render codeBlock(
              "modal",
              `<Modal bind:open={isOpen} title="Modal Title" size="medium">
  <p>Content inside modal.</p>
</Modal>`,
            )}
          {/if}
        </Card>

        <!-- Drawer -->
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Drawer
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={drawerTab}
          />
          {#if drawerTab === "preview"}
            <div class="flex flex-wrap gap-2">
              <Button
                variant="filled"
                onclick={() => {
                  drawerPosition = "left";
                  drawerOpen = true;
                }}>{#snippet children()}Left{/snippet}</Button
              >
              <Button
                variant="filled"
                onclick={() => {
                  drawerPosition = "right";
                  drawerOpen = true;
                }}>{#snippet children()}Right{/snippet}</Button
              >
              <Button
                variant="filled"
                onclick={() => {
                  drawerPosition = "top";
                  drawerOpen = true;
                }}>{#snippet children()}Top{/snippet}</Button
              >
              <Button
                variant="filled"
                onclick={() => {
                  drawerPosition = "bottom";
                  drawerOpen = true;
                }}>{#snippet children()}Bottom{/snippet}</Button
              >
            </div>
            <Drawer
              style={selectedStyle}
              theme={selectedTheme}
              position={drawerPosition}
              bind:open={drawerOpen}
              >{#snippet children()}<div class="p-4">
                  <h3 class="text-lg font-semibold mb-4">Drawer Content</h3>
                  <p>Slides from {drawerPosition} side.</p>
                  <nav class="mt-6 space-y-2">
                    <a href="#" class="drawer-nav-link block p-2 rounded"
                      >🏠 Home</a
                    ><a href="#" class="drawer-nav-link block p-2 rounded"
                      >📊 Dashboard</a
                    ><a href="#" class="drawer-nav-link block p-2 rounded"
                      >⚙ Settings</a
                    >
                  </nav>
                </div>{/snippet}</Drawer
            >
          {:else}
            {@render codeBlock(
              "drawer",
              `<Drawer position="left" bind:open={isOpen}>
  <div>Drawer content here</div>
</Drawer>`,
            )}
          {/if}
        </Card>

        <!-- Command Palette -->
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Command Palette
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={cmdPaletteTab}
          />
          {#if cmdPaletteTab === "preview"}
            <p class="text-sm">
              Press <kbd class="px-1.5 py-0.5 text-xs rounded border">⌘K</kbd> or
              click button.
            </p>
            <Button variant="filled" onclick={() => (cmdPaletteOpen = true)}
              >{#snippet children()}Open CmdK{/snippet}</Button
            >
            <CommandPalette groups={cmdGroups} bind:open={cmdPaletteOpen} />
          {:else}
            {@render codeBlock(
              "cmdPalette",
              `<CommandPalette
  groups={groups}
  bind:open={isOpen}
  placeholder="Type a command..."
/>`,
            )}
          {/if}
        </Card>
      </div>
    </section>

    <!-- NAVIGATION COMPONENTS -->
    <section class:hidden={activeCat !== "navigation"}>
      <h2 class="demo-section-title text-2xl font-semibold mb-6 border-b pb-2">
        Navigation Components
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Breadcrumb -->
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Breadcrumb
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={breadcrumbTab}
          />
          {#if breadcrumbTab === "preview"}
            <Breadcrumb
              items={[
                { label: "Home", href: "#" },
                { label: "Products", href: "#" },
                { label: "Details" },
              ]}
            />
          {:else}
            {@render codeBlock(
              "breadcrumb",
              `<Breadcrumb
  items={[
    { label: "Home", href: "#" },
    { label: "Products", href: "#" },
    { label: "Details" }
  ]}
/>`,
            )}
          {/if}
        </Card>

        <!-- Pagination -->
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Pagination
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={paginationTab}
          />
          {#if paginationTab === "preview"}
            <Pagination total={50} perPage={10} bind:current={paginationPage} />
          {:else}
            {@render codeBlock(
              "pagination",
              `<Pagination
  total={50}
  perPage={10}
  bind:current={page}
/>`,
            )}
          {/if}
        </Card>

        <!-- Stepper -->
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3 md:col-span-2"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Stepper
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={stepperTab}
          />
          {#if stepperTab === "preview"}
            <Stepper
              steps={[
                { label: "Account" },
                { label: "Profile" },
                { label: "Review" },
                { label: "Done" },
              ]}
              current={2}
            />
          {:else}
            {@render codeBlock(
              "stepper",
              `<Stepper
  steps={[
    { label: "Account" },
    { label: "Profile" },
    { label: "Review" },
    { label: "Done" }
  ]}
  current={2}
/>`,
            )}
          {/if}
        </Card>
      </div>
    </section>

    <!-- DATA DISPLAY -->
    <section class:hidden={activeCat !== "datadisplay"}>
      <h2 class="demo-section-title text-2xl font-semibold mb-6 border-b pb-2">
        Data Display
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Avatar -->
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Avatar
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={avatarTab}
          />
          {#if avatarTab === "preview"}
            <div class="flex gap-3 items-center">
              <Avatar size="sm" fallback="AB" />
              <Avatar size="md" fallback="CD" />
              <Avatar size="lg" fallback="EF" />
            </div>
          {:else}
            {@render codeBlock(
              "avatar",
              `<Avatar size="sm" fallback="AB" />

<Avatar size="md" fallback="CD" />

<Avatar size="lg" fallback="EF" />`,
            )}
          {/if}
        </Card>

        <!-- Chip -->
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Chip
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={chipTab}
          />
          {#if chipTab === "preview"}
            <div class="flex flex-wrap gap-2">
              <Chip color="primary" variant="filled"
                >{#snippet children()}Primary{/snippet}</Chip
              >
              <Chip color="success" variant="filled"
                >{#snippet children()}Success{/snippet}</Chip
              >
              <Chip color="warning" variant="filled"
                >{#snippet children()}Warning{/snippet}</Chip
              >
              <Chip color="error" variant="filled"
                >{#snippet children()}Error{/snippet}</Chip
              >
            </div>
            <div class="flex flex-wrap gap-2 mt-2">
              <Chip variant="outlined" color="primary" icon="★"
                >{#snippet children()}Starred{/snippet}</Chip
              >
              <Chip variant="ghost" color="neutral"
                >{#snippet children()}Ghost{/snippet}</Chip
              >
            </div>
          {:else}
            {@render codeBlock(
              "chip",
              `<Chip color="primary" variant="filled">Label</Chip>

<Chip color="success" variant="filled">Label</Chip>

<Chip color="warning" variant="filled">Label</Chip>

<Chip color="error" variant="filled">Label</Chip>

<Chip
  variant="outlined"
  color="primary"
  icon="★"
>
  Starred
</Chip>

<Chip variant="ghost" color="neutral">Ghost</Chip>`,
            )}
          {/if}
        </Card>

        <!-- Tooltip -->
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Tooltip
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={tooltipTab}
          />
          {#if tooltipTab === "preview"}
            <Tooltip text="This is a tooltip!"
              >{#snippet children()}<span
                  class="demo-text text-sm underline cursor-help">Hover me</span
                >{/snippet}</Tooltip
            >
          {:else}
            {@render codeBlock(
              "tooltip",
              `<Tooltip text="This is a tooltip!">
  <span>Hover me</span>
</Tooltip>`,
            )}
          {/if}
        </Card>

        <!-- Progress Bar -->
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Progress Bar
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={progressBarTab}
          />
          {#if progressBarTab === "preview"}
            <ProgressBar value={progressVal} animated={true} label={true} />
            <ProgressBar value={-1} label={true} />
          {:else}
            {@render codeBlock(
              "progress",
              `<ProgressBar
  value={65}
  animated={true}
  label={true}
/>`,
            )}
          {/if}
        </Card>

        <!-- Spinner -->
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Spinner
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={spinnerTab}
          />
          {#if spinnerTab === "preview"}
            <div class="flex gap-4 items-center">
              <Spinner size="sm" />
              <Spinner size="md" />
              <Spinner size="lg" />
            </div>
          {:else}
            {@render codeBlock(
              "spinner",
              `<Spinner size="sm" />

<Spinner size="md" />

<Spinner size="lg" />`,
            )}
          {/if}
        </Card>

        <!-- Skeleton -->
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Skeleton
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={skeletonTab}
          />
          {#if skeletonTab === "preview"}
            <div class="flex gap-3 items-center">
              <Skeleton variant="circle" width="40px" height="40px" />
              <div class="flex-1 space-y-2">
                <Skeleton variant="text" width="80%" height="14px" />
                <Skeleton variant="text" width="60%" height="14px" />
              </div>
            </div>
          {:else}
            {@render codeBlock(
              "skeleton",
              `<Skeleton
  variant="circle"
  width="40px"
  height="40px"
/>

<Skeleton
  variant="text"
  width="80%"
  height="14px"
/>

<Skeleton
  variant="text"
  width="60%"
  height="14px"
/>`,
            )}
          {/if}
        </Card>

        <!-- Table -->
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3 md:col-span-2 lg:col-span-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Table
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={tableTab}
          />
          {#if tableTab === "preview"}
            <Table data={tableData} variant="striped" />
          {:else}
            {@render codeBlock(
              "table",
              `<script>
  // Data keys become column headers automatically.
  // Multi-word keys work too:
  // { "First Name": "Alice", "Job Title": "Engineer", Status: "Active" }
  const data = [
    { Name: "Alice", Role: "Engineer", Status: "Active" },
    { Name: "Bob", Role: "Designer", Status: "Away" },
    { Name: "Carol", Role: "Manager", Status: "Active" },
  ];
</script>

<Table data={data} variant="striped" />

<!-- Variants: "plain", "striped", "hoverable", "bordered", "compact" -->`,
            )}
          {/if}
        </Card>
      </div>
    </section>

    <!-- FEEDBACK -->
    <section class:hidden={activeCat !== "feedback"}>
      <h2 class="demo-section-title text-2xl font-semibold mb-6 border-b pb-2">
        Feedback
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Alert -->
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Alert
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={alertTab}
          />
          {#if alertTab === "preview"}
            <div class="flex flex-wrap gap-2 mb-3">
              {#each ["default", "info", "success", "warning", "error"] as v}
                <button
                  type="button"
                  class="px-3 py-1.5 text-xs font-semibold rounded border transition-colors"
                  class:bg-indigo-500={alertVariant === v}
                  class:text-white={alertVariant === v}
                  class:border-indigo-500={alertVariant === v}
                  onclick={() => (alertVariant = v)}>{v}</button
                >
              {/each}
            </div>
            <Alert
              variant={alertVariant}
              title={alertVariant.charAt(0).toUpperCase() +
                alertVariant.slice(1)}
              icon={alertVariant === "default"
                ? null
                : alertVariant === "info"
                  ? "info"
                  : alertVariant === "success"
                    ? "check_circle"
                    : alertVariant === "warning"
                      ? "warning"
                      : "error"}
              dismissible
            >
              {#snippet children()}
                {#if alertVariant === "info"}
                  This is an informational alert message.
                {:else if alertVariant === "success"}
                  Operation completed successfully.
                {:else if alertVariant === "warning"}
                  Please review before proceeding.
                {:else}
                  Something went wrong. Please try again.
                {/if}
              {/snippet}
            </Alert>
          {:else}
            {@render codeBlock(
              "alert",
              `<script>
  let variant = $state("info");
</script>

<!-- Icons auto-select based on variant.
     Pass icon="info" to use Material Icons instead.
     Default icons: info→ℹ, success→✓, warning→⚠, error→✕ -->
<Alert variant={variant} title="Title" dismissible>
  Alert message here.
</Alert>

<!-- Variants: default, info, success, warning, error -->`,
            )}
          {/if}
        </Card>

        <!-- Toast -->
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Toast
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={toastTab}
          />
          {#if toastTab === "preview"}
            <div class="flex flex-wrap gap-2">
              <Button
                variant="filled"
                onclick={() => addToastMsg("Toast message", "info", "info")}
                >{#snippet children()}Info{/snippet}</Button
              >
              <Button
                variant="filled"
                onclick={() =>
                  addToastMsg("Saved successfully", "success", "check_circle")}
                >{#snippet children()}Success{/snippet}</Button
              >
              <Button
                variant="filled"
                onclick={() =>
                  addToastMsg("Review before continuing", "warning", "warning")}
                >{#snippet children()}Warning{/snippet}</Button
              >
              <Button
                variant="filled"
                onclick={() =>
                  addToastMsg("Something failed", "error", "error")}
                >{#snippet children()}Error{/snippet}</Button
              >
            </div>
            <p class="demo-label text-xs font-semibold uppercase tracking-wide">
              Toast Position
            </p>
            <select
              bind:value={toastPosition}
              class="px-3 py-1.5 text-sm rounded border header-select"
            >
              <option value="top-right">Top Right</option>
              <option value="top-left">Top Left</option>
              <option value="top-center">Top Center</option>
              <option value="bottom-right">Bottom Right</option>
              <option value="bottom-left">Bottom Left</option>
              <option value="bottom-center">Bottom Center</option>
            </select>
          {:else}
            {@render codeBlock(
              "toast",
              `<script>
  let toasts = $state([]);

  function addToast(msg, variant, icon) {
    const id = Date.now() + Math.random();
    toasts = [...toasts, { id, message: msg, variant, duration: 3000, icon }];
    setTimeout(() => toasts = toasts.filter(t => t.id !== id), 3000);
  }
</script>

<Toast bind:toasts position="top-right" />

<!-- Icon is auto-wrapped with the configured icon class.
     Pass icon="info" for Material Icons,
     or omit it for defaults: info→ℹ, success→✓, warning→⚠, error→✕. -->`,
            )}
          {/if}
        </Card>

        <!-- Rating -->
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Rating
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={ratingTab}
          />
          {#if ratingTab === "preview"}
            <Rating bind:value={ratingVal} max={5} showValue={true} />
          {:else}
            {@render codeBlock(
              "rating",
              `<Rating
  bind:value={val}
  max={5}
  showValue={true}
/>`,
            )}
          {/if}
        </Card>

        <!-- Popover -->
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Popover
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={popoverTab}
          />
          {#if popoverTab === "preview"}
            <div class="flex flex-wrap gap-2">
              <Popover position="top" bind:open={popoverOpen}>
                {#snippet children()}<Button variant="outlined"
                    >{#snippet children()}Top{/snippet}</Button
                  >{/snippet}
                {#snippet content()}<div>
                    <strong>Popover Title</strong>
                    <p class="mt-1 text-sm">Rich content popover.</p>
                  </div>{/snippet}
              </Popover>
              <Popover position="bottom">
                {#snippet children()}<Button variant="outlined"
                    >{#snippet children()}Bottom{/snippet}</Button
                  >{/snippet}
                {#snippet content()}<p class="text-sm">
                    Popover with arrow indicator.
                  </p>{/snippet}
              </Popover>
            </div>
          {:else}
            {@render codeBlock(
              "popover",
              `<Popover position="top" bind:open={isOpen}>
  <Button variant="outlined">Trigger</Button>
</Popover>
<Popover position="bottom">
  <Button variant="outlined">Bottom</Button>
</Popover>`,
            )}
          {/if}
        </Card>
      </div>
    </section>

    <!-- CHARTS -->
    <section class:hidden={activeCat !== "charts"}>
      <div class="flex items-center justify-between mb-6 border-b pb-2">
        <h2 class="demo-section-title text-2xl font-semibold">
          Chart Components
        </h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Bar Chart -->
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Bar Chart
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={barChartTab}
          />
          {#if barChartTab === "preview"}
            <BarChart
              style={selectedStyle}
              theme={selectedTheme}
              downloadable={true}
              xAxisLabel="Quarter"
              yAxisLabel="Revenue"
              data={[
                { label: "q1", value: 12 },
                { label: "q2", value: 19 },
                { label: "q3", value: 8 },
                { label: "q4", value: 15 },
              ]}
              title="Quarterly Revenue"
            />
          {:else}
            {@render codeBlock(
              "barChart",
              `<script>
  // {label, value} format — order is preserved (unlike plain objects)
  let data = [
    { label: "q1", value: 12 },
    { label: "q2", value: 19 },
    { label: "q3", value: 8 },
    { label: "q4", value: 15 },
  ];
</script>

<BarChart {data} title="Quarterly Revenue" xAxisLabel="Quarter" yAxisLabel="Revenue" />

<!-- Works for BarChart, LineChart, PieChart, DoughnutChart, RadarChart, PolarAreaChart.
     For multi-series, pass more keys in each object:
<BarChart data={[
  { label: "Jan", revenue: 10, Cost: 5 },
  { label: "Feb", revenue: 20, Cost: 8 },
]} /> -->`,
            )}
          {/if}
        </Card>

        <!-- Line Chart -->
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Line Chart
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={lineChartTab}
          />
          {#if lineChartTab === "preview"}
            <LineChart
              style={selectedStyle}
              theme={selectedTheme}
              downloadable={true}
              xAxisLabel="Month"
              yAxisLabel="Amount"
              data={[
                { label: "Jan", revenue: 10, Cost: 5 },
                { label: "Feb", revenue: 20, Cost: 8 },
                { label: "Mar", revenue: 30, Cost: 12 },
                { label: "Apr", revenue: 25, Cost: 10 },
                { label: "May", revenue: 35, Cost: 15 },
                { label: "Jun", revenue: 40, Cost: 18 },
              ]}
              title="Revenue vs Cost"
            />
          {:else}
            {@render codeBlock(
              "lineChart",
              `<script>
  // Row-oriented format — label + any number of value keys
  let data = [
    { label: "Jan", revenue: 10, Cost: 5 },
    { label: "Feb", revenue: 20, Cost: 8 },
    { label: "Mar", revenue: 30, Cost: 12 },
    { label: "Apr", revenue: 25, Cost: 10 },
    { label: "May", revenue: 35, Cost: 15 },
    { label: "Jun", revenue: 40, Cost: 18 },
  ];
</script>

<LineChart {data} title="Revenue vs Cost" xAxisLabel="Month" yAxisLabel="Amount" />

<!-- Works for BarChart, Area, StackedBarChart too!
     The label field becomes the x-axis label, all other keys become series.
     For single-series, use {label, value} objects in the data prop. -->`,
            )}
          {/if}
        </Card>

        <!-- Pie Chart -->
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Pie Chart
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={pieChartTab}
          />
          {#if pieChartTab === "preview"}
            <PieChart
              style={selectedStyle}
              theme={selectedTheme}
              downloadable={true}
              data={[
                { label: "Direct", value: 35 },
                { label: "Social", value: 25 },
                { label: "Referral", value: 20 },
                { label: "Organic", value: 20 },
              ]}
              title="Traffic Sources"
            />
          {:else}
            {@render codeBlock(
              "pieChart",
              `<script>
  let data = [
    { label: "Direct", value: 35 },
    { label: "Social", value: 25 },
    { label: "Referral", value: 20 },
    { label: "Organic", value: 20 },
  ];
</script>

<PieChart {data} title="Traffic Sources" />

<!-- Use the data prop with {label, value} format.
     Auto-colors from theme palette. -->`,
            )}
          {/if}
        </Card>

        <!-- Doughnut Chart -->
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Doughnut Chart
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={doughnutChartTab}
          />
          {#if doughnutChartTab === "preview"}
            <DoughnutChart
              style={selectedStyle}
              theme={selectedTheme}
              downloadable={true}
              data={[
                { label: "Chrome", value: 45 },
                { label: "Firefox", value: 25 },
                { label: "Safari", value: 15 },
                { label: "Edge", value: 10 },
                { label: "Other", value: 5 },
              ]}
              title="Browser Share"
              options={{ cutout: "60%" }}
            />
          {:else}
            {@render codeBlock(
              "doughnutChart",
              `<script>
  let data = [
    { label: "Chrome", value: 45 },
    { label: "Firefox", value: 25 },
    { label: "Safari", value: 15 },
    { label: "Edge", value: 10 },
    { label: "Other", value: 5 },
  ];
</script>

<DoughnutChart {data} title="Browser Share" options={{cutout: "60%"}} />

<!-- options={{cutout: "60%"}} creates the ring hole.
     Use the data prop with {label, value} format. -->`,
            )}
          {/if}
        </Card>

        <!-- Radar Chart -->
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Radar Chart
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={radarChartTab}
          />
          {#if radarChartTab === "preview"}
            <RadarChart
              style={selectedStyle}
              theme={selectedTheme}
              downloadable={true}
              xAxisLabel="Attribute"
              yAxisLabel="Score"
              data={[
                { label: "Speed", "Character A": 80, "Character B": 70 },
                { label: "Power", "Character A": 65, "Character B": 85 },
                { label: "Accuracy", "Character A": 90, "Character B": 75 },
                { label: "Defense", "Character A": 70, "Character B": 85 },
                { label: "Agility", "Character A": 85, "Character B": 80 },
              ]}
              title="Character Stats"
            />
          {:else}
            {@render codeBlock(
              radarChart,
              `<script>
  // Row-oriented format — label + any number of value keys
  let data = [
    { label: "Speed", "Character A": 80, "Character B": 70 },
    { label: "Power", "Character A": 65, "Character B": 85 },
    { label: "Accuracy", "Character A": 90, "Character B": 75 },
    { label: "Defense", "Character A": 70, "Character B": 85 },
    { label: "Agility", "Character A": 85, "Character B": 80 },
  ];
</script>

<RadarChart {data} title="Character Stats" xAxisLabel="Attribute" yAxisLabel="Score" />

<!-- Same row-oriented format works for BarChart, LineChart, StackedBarChart, RadarChart.
     Single-series: <RadarChart data={[{label:"A", value:5}]} /> -->`,
            )}
          {/if}
        </Card>

        <!-- PolarArea Chart -->
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Polar Area Chart
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={polarAreaChartTab}
          />
          {#if polarAreaChartTab === "preview"}
            <PolarAreaChart
              style={selectedStyle}
              theme={selectedTheme}
              downloadable={true}
              data={[
                { label: "Red", value: 11 },
                { label: "Blue", value: 16 },
                { label: "Green", value: 7 },
                { label: "Yellow", value: 3 },
                { label: "Purple", value: 14 },
              ]}
              title="Color Distribution"
            />
          {:else}
            {@render codeBlock(
              "polarAreaChart",
              `<script>
  let data = [
    { label: "Red", value: 11 },
    { label: "Blue", value: 16 },
    { label: "Green", value: 7 },
    { label: "Yellow", value: 3 },
    { label: "Purple", value: 14 },
  ];
</script>

<PolarAreaChart {data} title="Color Distribution" />

<!-- Use the data prop with {label, value} format.
     Auto-colors from theme palette. -->`,
            )}
          {/if}
        </Card>

        <!-- Scatter Chart -->
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Scatter Chart
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={scatterChartTab}
          />
          {#if scatterChartTab === "preview"}
            <ScatterChart
              style={selectedStyle}
              theme={selectedTheme}
              downloadable={true}
              xAxisLabel="X Value"
              yAxisLabel="Y Value"
              data={[
                { x: 1, y: 2 },
                { x: 2, y: 5 },
                { x: 3, y: 3 },
                { x: 4, y: 8 },
                { x: 5, y: 4 },
                { x: 6, y: 7 },
                { x: 7, y: 6 },
                { x: 8, y: 9 },
              ]}
              title="Data Distribution"
              height={280}
            />
          {:else}
            {@render codeBlock(
              "scatterChart",
              `<script>
  let data = [
    {x: 1, y: 2},
    {x: 2, y: 5},
    {x: 3, y: 3},
    {x: 4, y: 8},
    {x: 5, y: 4},
    {x: 6, y: 7},
    {x: 7, y: 6},
    {x: 8, y: 9},
  ];
</script>

<ScatterChart {data} title="Data Distribution" xAxisLabel="X Value" yAxisLabel="Y Value" />

<!-- Multi-series:
<ScatterChart
  series={[
    { name: "A", points: [{x:1,y:2},{x:3,y:4}] },
    { name: "B", points: [{x:2,y:1},{x:4,y:3}] },
  ]}
/> -->`,
            )}
          {/if}
        </Card>

        <!-- Bubble Chart -->
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Bubble Chart
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={bubbleChartTab}
          />
          {#if bubbleChartTab === "preview"}
            <BubbleChart
              style={selectedStyle}
              theme={selectedTheme}
              downloadable={true}
              xAxisLabel="Feature"
              yAxisLabel="Performance"
              series={[
                { label: "Product A", x: 10, y: 20, r: 5 },
                { label: "Product B", x: 15, y: 35, r: 8 },
                { label: "Product C", x: 25, y: 15, r: 12 },
                { label: "Product D", x: 30, y: 45, r: 6 },
                { label: "Product E", x: 40, y: 25, r: 10 },
              ]}
              title="Product Performance"
              height={280}
            />
          {:else}
            {@render codeBlock(
              "bubbleChart",
              `<script>
  let series = [
    {
      { label: "Product A", x: 10, y: 20, r: 5 },
      { label: "Product B", x: 15, y: 35, r: 8 },
      { label: "Product C", x: 25, y: 15, r: 12 },
      { label: "Product D", x: 30, y: 45, r: 6 },
      { label: "Product E", x: 40, y: 25, r: 10 },
  ];
</script>

<BubbleChart {series} title="Product Performance" xAxisLabel="Feature" yAxisLabel="Performance" />

<!-- r controls bubble size (radius).
     Multi-series: add more objects to series[]. -->`,
            )}
          {/if}
        </Card>

        <!-- Stacked Bar Chart -->
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Stacked Bar Chart
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={stackedBarChartTab}
          />
          {#if stackedBarChartTab === "preview"}
            <StackedBarChart
              style={selectedStyle}
              theme={selectedTheme}
              downloadable={true}
              xAxisLabel="Quarter"
              yAxisLabel="Revenue"
              data={[
                {
                  label: "Q1",
                  "Product A": 30,
                  "Product B": 20,
                  "Product C": 15,
                },
                {
                  label: "Q2",
                  "Product A": 45,
                  "Product B": 30,
                  "Product C": 10,
                },
                {
                  label: "Q3",
                  "Product A": 25,
                  "Product B": 35,
                  "Product C": 20,
                },
                {
                  label: "Q4",
                  "Product A": 50,
                  "Product B": 25,
                  "Product C": 15,
                },
              ]}
              title="Revenue Breakdown"
            />
          {:else}
            {@render codeBlock(
              stackedBarChart,
              `<script>
  // Row-oriented format — label + any number of value keys
  let data = [
    { label: "Q1", "Product A": 30, "Product B": 20, "Product C": 15 },
    { label: "Q2", "Product A": 45, "Product B": 30, "Product C": 10 },
    { label: "Q3", "Product A": 25, "Product B": 35, "Product C": 20 },
    { label: "Q4", "Product A": 50, "Product B": 25, "Product C": 15 },
  ];
</script>

<StackedBarChart {data} title="Revenue Breakdown" xAxisLabel="Quarter" yAxisLabel="Revenue" />

<!-- Same row-oriented format works for BarChart, LineChart, StackedBarChart, ComboChart.
     Single-series: <BarChart data={[{label:"q1", value:12}]} /> -->`,
            )}
          {/if}
        </Card>

        <!-- Stacked Line Chart -->
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Stacked Line Chart
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={stackedLineChartTab}
          />
          {#if stackedLineChartTab === "preview"}
            <StackedLineChart
              style={selectedStyle}
              theme={selectedTheme}
              downloadable={true}
              xAxisLabel="Week"
              yAxisLabel="Page Views"
              data={[
                { label: "Week 1", EMEA: 120, APAC: 450, NA: 80 },
                { label: "Week 2", EMEA: 180, APAC: 620, NA: 110 },
                { label: "Week 3", EMEA: 140, APAC: 530, NA: 95 },
                { label: "Week 4", EMEA: 220, APAC: 780, NA: 150 },
              ]}
              title="Website Traffic"
            />
          {:else}
            {@render codeBlock(
              "stackedLineChart",
              `<script>
  // Row-oriented format — label + any number of value keys
  let data = [
                { label: "Week 1", EMEA: 120, APAC: 450, NA: 80 },
                { label: "Week 2", EMEA: 180, APAC: 620, NA: 110 },
                { label: "Week 3", EMEA: 140, APAC: 530, NA: 95 },
                { label: "Week 4", EMEA: 220, APAC: 780, NA: 150 },
              ];
</script>

<StackedLineChart {data} title="Website Traffic" xAxisLabel="Week" yAxisLabel="Count" />

<!-- Same row-oriented format works for BarChart, LineChart, StackedBarChart, ComboChart.
     Single-series: <LineChart data={[{label:"q1", value:12}]} /> -->`,
            )}
          {/if}
        </Card>
      </div>
    </section>

    <!-- Toast Container -->
    <Toast
      style={selectedStyle}
      theme={selectedTheme}
      position={toastPosition}
      bind:toasts
    />

    <!-- FAB -->
    <FAB style={selectedStyle} theme={selectedTheme} preset={btnPreset} position="bottom-right"
      >{#snippet children()}+{/snippet}</FAB
    >
  </main>
</div>
