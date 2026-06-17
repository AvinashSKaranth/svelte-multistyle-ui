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
  import DropdownMenu from "./lib/components/DropdownMenu.svelte";
  import Popover from "./lib/components/Popover.svelte";
  import Drawer from "./lib/components/Drawer.svelte";
  import Chip from "./lib/components/Chip.svelte";
  import ButtonGroup from "./lib/components/ButtonGroup.svelte";
  import Rating from "./lib/components/Rating.svelte";
  import CommandPalette from "./lib/components/CommandPalette.svelte";

  import Prism from 'prismjs';

  function highlight(code) {
    return Prism.highlight(code, Prism.languages.markup, 'markup');
  }

  import { initMultistyleUI } from "./lib/config.js";

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

  // Keep the global library defaults in sync with the demo controls
  $effect(() => {
    initMultistyleUI({ style: selectedStyle, theme: selectedTheme });
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

  // Code preview tab states
  let buttonTab = $state("preview");
  let inputTab = $state("preview");
  let iconBtnTab = $state("preview");
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

  let carouselSlides = [
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

  const customStyle = $derived(
    `--t-primary:${customPrimary};--t-secondary:${customSecondary};--t-surface:${customSurface};--t-card-bg:${customCardBg};--t-card-border-color:${customCardBorderColor};--t-text:${customText};--t-text-hint:${customTextHint};--t-text-primary:${customTextPrimary};--t-text-secondary:${customTextSecondary};--t-surface-bg:${customSurfaceBg};--t-btn-bg:${customBtnBg};--t-btn-border-color:${customBtnBorderColor};--t-btn-radius:${customBtnRadius};--t-card-radius:${customCardRadius};`,
  );

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

  const customCss = $derived(`/* custom-theme.css */
/* Link this file after svelte-multistyle-ui/theme.css. */
.theme-custom {
  --t-primary: ${customPrimary}; --t-secondary: ${customSecondary}; --t-surface: ${customSurface};
  --t-card-bg: ${customCardBg}; --t-card-border-color: ${customCardBorderColor};
  --t-text: ${customText}; --t-text-hint: ${customTextHint};
  --t-text-primary: ${customTextPrimary}; --t-text-secondary: ${customTextSecondary};
  --t-surface-bg: ${customSurfaceBg}; --t-btn-bg: ${customBtnBg};
  --t-btn-border-color: ${customBtnBorderColor}; --t-btn-radius: ${customBtnRadius};
  --t-card-radius: ${customCardRadius};
  --t-info: ${customPrimary}; --t-success: ${customPrimary};
  --t-warning: ${customPrimary}; --t-error: ${customPrimary};
  --t-text-info: ${customPrimary}; --t-text-success: ${customPrimary};
  --t-text-warning: ${customPrimary}; --t-text-error: ${customPrimary};
}

html.dark .theme-custom {
  --t-primary: ${customPrimary}; --t-secondary: ${customSecondary}; --t-surface: ${customSurface};
  --t-card-bg: ${customCardBg}; --t-card-border-color: ${customCardBorderColor};
  --t-text: ${customText}; --t-text-hint: ${customTextHint};
  --t-text-primary: ${customTextPrimary}; --t-text-secondary: ${customTextSecondary};
  --t-surface-bg: ${customSurfaceBg}; --t-btn-bg: ${customBtnBg};
  --t-btn-border-color: ${customBtnBorderColor}; --t-btn-radius: ${customBtnRadius};
  --t-card-radius: ${customCardRadius};
  --t-info: ${customPrimary}; --t-success: ${customPrimary};
  --t-warning: ${customPrimary}; --t-error: ${customPrimary};
  --t-text-info: ${customPrimary}; --t-text-success: ${customPrimary};
  --t-text-warning: ${customPrimary}; --t-text-error: ${customPrimary};
}

/* Use it:
import "svelte-multistyle-ui/theme.css";
import "./custom-theme.css";

Then pass theme="custom" to components.
*/`);

  function markCustomTheme() {
    if (selectedTheme !== "custom") selectedTheme = "custom";
  }

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
      <button
        type="button"
        class="copy-btn"
        onclick={() => copyCode(code)}
      >
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
          <Card style={selectedStyle} theme={selectedTheme} class="settings-panel">
            <h3 class="settings-panel-title">Theme Editor</h3>
            <p class="text-sm text-gray-500">
              First edit switches the theme dropdown to Custom.
            </p>
            <div class="grid grid-cols-2 gap-3">
              <div class="flex flex-col gap-1">
                <label
                  for="custom-primary"
                  class="text-xs font-medium text-gray-500">Primary</label
                >
                <input
                  id="custom-primary"
                  type="color"
                  bind:value={customPrimary}
                  oninput={markCustomTheme}
                  class="w-full h-9 rounded cursor-pointer border"
                />
              </div>
              <div class="flex flex-col gap-1">
                <label
                  for="custom-secondary"
                  class="text-xs font-medium text-gray-500">Secondary</label
                >
                <input
                  id="custom-secondary"
                  type="color"
                  bind:value={customSecondary}
                  oninput={markCustomTheme}
                  class="w-full h-9 rounded cursor-pointer border"
                />
              </div>
              <div class="flex flex-col gap-1">
                <label
                  for="custom-surface"
                  class="text-xs font-medium text-gray-500">Surface</label
                >
                <input
                  id="custom-surface"
                  type="color"
                  bind:value={customSurface}
                  oninput={markCustomTheme}
                  class="w-full h-9 rounded cursor-pointer border"
                />
              </div>
              <div class="flex flex-col gap-1">
                <label
                  for="custom-card-bg"
                  class="text-xs font-medium text-gray-500">Card BG</label
                >
                <input
                  id="custom-card-bg"
                  type="color"
                  bind:value={customCardBg}
                  oninput={markCustomTheme}
                  class="w-full h-9 rounded cursor-pointer border"
                />
              </div>
              <div class="flex flex-col gap-1">
                <label
                  for="custom-card-border-color"
                  class="text-xs font-medium text-gray-500">Card Border</label
                >
                <input
                  id="custom-card-border-color"
                  type="color"
                  bind:value={customCardBorderColor}
                  oninput={markCustomTheme}
                  class="w-full h-9 rounded cursor-pointer border"
                />
              </div>
              <div class="flex flex-col gap-1">
                <label
                  for="custom-text"
                  class="text-xs font-medium text-gray-500">Text</label
                >
                <input
                  id="custom-text"
                  type="color"
                  bind:value={customText}
                  oninput={markCustomTheme}
                  class="w-full h-9 rounded cursor-pointer border"
                />
              </div>
              <div class="flex flex-col gap-1">
                <label
                  for="custom-text-hint"
                  class="text-xs font-medium text-gray-500">Text Hint</label
                >
                <input
                  id="custom-text-hint"
                  type="color"
                  bind:value={customTextHint}
                  oninput={markCustomTheme}
                  class="w-full h-9 rounded cursor-pointer border"
                />
              </div>
              <div class="flex flex-col gap-1">
                <label
                  for="custom-text-primary"
                  class="text-xs font-medium text-gray-500">Text Primary</label
                >
                <input
                  id="custom-text-primary"
                  type="color"
                  bind:value={customTextPrimary}
                  oninput={markCustomTheme}
                  class="w-full h-9 rounded cursor-pointer border"
                />
              </div>
              <div class="flex flex-col gap-1">
                <label
                  for="custom-text-secondary"
                  class="text-xs font-medium text-gray-500"
                  >Text Secondary</label
                >
                <input
                  id="custom-text-secondary"
                  type="color"
                  bind:value={customTextSecondary}
                  oninput={markCustomTheme}
                  class="w-full h-9 rounded cursor-pointer border"
                />
              </div>
              <div class="flex flex-col gap-1">
                <label
                  for="custom-surface-bg"
                  class="text-xs font-medium text-gray-500">Surface BG</label
                >
                <input
                  id="custom-surface-bg"
                  type="color"
                  bind:value={customSurfaceBg}
                  oninput={markCustomTheme}
                  class="w-full h-9 rounded cursor-pointer border"
                />
              </div>
              <div class="flex flex-col gap-1">
                <label
                  for="custom-btn-bg"
                  class="text-xs font-medium text-gray-500">Btn BG</label
                >
                <input
                  id="custom-btn-bg"
                  type="color"
                  bind:value={customBtnBg}
                  oninput={markCustomTheme}
                  class="w-full h-9 rounded cursor-pointer border"
                />
              </div>
              <div class="flex flex-col gap-1">
                <label
                  for="custom-btn-border-color"
                  class="text-xs font-medium text-gray-500">Btn Border</label
                >
                <input
                  id="custom-btn-border-color"
                  type="color"
                  bind:value={customBtnBorderColor}
                  oninput={markCustomTheme}
                  class="w-full h-9 rounded cursor-pointer border"
                />
              </div>
            </div>
            <div class="flex flex-wrap gap-4 mt-4">
              <div class="flex flex-col gap-2">
                <span class="text-xs font-medium text-gray-500"
                  >Button Radius</span
                >
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
                      }}>{r}</button
                    >
                  {/each}
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <span class="text-xs font-medium text-gray-500"
                  >Card Radius</span
                >
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
                      }}>{r}</button
                    >
                  {/each}
                </div>
              </div>
            </div>
          </Card>

          <Card style={selectedStyle} theme={selectedTheme} class="settings-panel">
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

          <Card style={selectedStyle} theme={selectedTheme} class="settings-panel">
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

    <!-- FORM COMPONENTS -->
    <section>
      <h2 class="demo-section-title text-2xl font-semibold mb-6 border-b pb-2">
        Form Components
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Button -->
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Button
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
            <div class="flex flex-wrap gap-2">
              <Button variant="filled"
                >{#snippet children()}Filled{/snippet}</Button
              >
              <Button variant="outlined"
                >{#snippet children()}Outlined{/snippet}</Button
              >
              <Button variant="text"
                >{#snippet children()}Text{/snippet}</Button
              >
              <Button variant="tonal"
                >{#snippet children()}Tonal{/snippet}</Button
              >
            </div>
            <div class="flex flex-wrap gap-2 mt-2">
              <Button variant="filled" icon="add"
                >{#snippet children()}Add{/snippet}</Button
              >
              <Button variant="outlined" icon="edit"
                >{#snippet children()}Edit{/snippet}</Button
              >
              <Button variant="tonal" icon="delete"
                >{#snippet children()}Delete{/snippet}</Button
              >
            </div>
          {:else}
            {@render codeBlock('btn', `<Button
  variant="filled"
>
  Click
</Button>

<Button variant="outlined">Click</Button>

<Button variant="text">Click</Button>

<Button variant="tonal">Click</Button>

<!-- With icons — just the icon name; the class is auto-applied: -->
<Button
  variant="filled"
  icon="add"
>
  Add
</Button>`)}
          {/if}
        </Card>

        <!-- IconButton -->
        <Card
          style={selectedStyle}
          theme={selectedTheme}
          elevated={true}
          class="space-y-3"
        >
          <p class="demo-label text-xs font-semibold uppercase tracking-wide">
            Icon Button
          </p>
          <Tabs
            style={selectedStyle}
            theme={selectedTheme}
            tabs={[
              { id: "preview", label: "👁 Preview" },
              { id: "code", label: "</> Code" },
            ]}
            bind:active={iconBtnTab}
          />
          {#if iconBtnTab === "preview"}
            <div class="flex gap-3 items-center">
              <IconButton variant="filled" ariaLabel="Favorite" icon="favorite" />
              <IconButton variant="outlined" ariaLabel="Star" icon="star" />
              <IconButton variant="tonal" ariaLabel="Add" icon="add" />
            </div>
          {:else}
            {@render codeBlock('iconBtn', `<IconButton
  variant="filled"
  ariaLabel="Favorite"
  icon="favorite"
/>

<IconButton
  variant="outlined"
  ariaLabel="Star"
  icon="star"
/>

<IconButton
  variant="tonal"
  ariaLabel="Add"
  icon="add"
/>`)}
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
            {@render codeBlock('input', `<Input
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
/>`)}
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
            {@render codeBlock('textarea', `<Textarea
  bind:value={msg}
  label="Message"
  rows={4}
  maxlength={200}
/>`)}
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
            {@render codeBlock('select', `<Select
  bind:value={val}
  options={options}
  label="Choose"
  placeholder="Choose"
/>`)}
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
            {@render codeBlock('multiSelect', `<MultiSelect
  bind:selected={selected}
  options={options}
  placeholder="Pick items"
/>`)}
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
            {@render codeBlock('checkbox', `<Checkbox
  bind:checked={accepted}
  label="Accept terms"
/>`)}
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
            {@render codeBlock('radio', `<Radio value="a" bind:group={val} label="Alpha" />

<Radio value="b" bind:group={val} label="Beta" />`)}
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
            {@render codeBlock('toggle', `<Toggle
  bind:checked={enabled}
  label="Notifications"
/>`)}
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
            <Slider
              bind:value={sliderVal}
              min={0}
              max={100}
              label="Volume"
            />
          {:else}
            {@render codeBlock('slider', `<Slider
  bind:value={val}
  min={0}
  max={100}
  label="Volume"
/>`)}
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
            {@render codeBlock('datePicker', `<script>
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
/>`)}
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
            {@render codeBlock('fileUpload', `<FileUpload
  label="Upload file"
  accept="image/*"
/>`)}
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
            {@render codeBlock('dropdown', `<DropdownMenu
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
</DropdownMenu>`)}
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
            {@render codeBlock('btnGroup', `<ButtonGroup
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
/>`)}
          {/if}
        </Card>
      </div>
    </section>

    <!-- LAYOUT COMPONENTS -->
    <section>
      <h2 class="demo-section-title text-2xl font-semibold mb-6 border-b pb-2">
        Layout Components
      </h2>
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
            {@render codeBlock('card', `<Card elevated={true}>
  <p>Content inside the card.</p>
</Card>`)}
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
            {@render codeBlock('divider', `<Divider label="OR" />`)}
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
            {@render codeBlock('tabs', `<Tabs
  tabs={[
    { id: "tab1", label: "Overview" },
    { id: "tab2", label: "Features" },
    { id: "tab3", label: "Pricing" }
  ]}
  bind:active={activeTab}
/>`)}
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
            {@render codeBlock('accordion', `<Accordion
  items={items}
  current="1"
/>`)}
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
            {@render codeBlock('carousel', `<script>
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
<Carousel slides={slides} autoPlay={true} interval={4000} />`)}
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
            <Modal
              size={modalSize}
              bind:open={modalOpen}
              title="Modal Title"
              >{#snippet children()}<p style="margin:0">
                  This is a modal dialog with themed styling.
                </p>{/snippet}</Modal
            >
          {:else}
            {@render codeBlock('modal', `<Modal bind:open={isOpen} title="Modal Title" size="medium">
  <p>Content inside modal.</p>
</Modal>`)}
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
            {@render codeBlock('drawer', `<Drawer position="left" bind:open={isOpen}>
  <div>Drawer content here</div>
</Drawer>`)}
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
              Press <kbd class="px-1.5 py-0.5 text-xs rounded border">⌘K</kbd> or click
              button.
            </p>
            <Button
              variant="filled"
              onclick={() => (cmdPaletteOpen = true)}
              >{#snippet children()}Open CmdK{/snippet}</Button
            >
            <CommandPalette
              groups={cmdGroups}
              bind:open={cmdPaletteOpen}
            />
          {:else}
            {@render codeBlock('cmdPalette', `<CommandPalette
  groups={groups}
  bind:open={isOpen}
  placeholder="Type a command..."
/>`)}
          {/if}
        </Card>
      </div>
    </section>

    <!-- NAVIGATION COMPONENTS -->
    <section>
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
            {@render codeBlock('breadcrumb', `<Breadcrumb
  items={[
    { label: "Home", href: "#" },
    { label: "Products", href: "#" },
    { label: "Details" }
  ]}
/>`)}
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
            <Pagination
              total={50}
              perPage={10}
              bind:current={paginationPage}
            />
          {:else}
            {@render codeBlock('pagination', `<Pagination
  total={50}
  perPage={10}
  bind:current={page}
/>`)}
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
            {@render codeBlock('stepper', `<Stepper
  steps={[
    { label: "Account" },
    { label: "Profile" },
    { label: "Review" },
    { label: "Done" }
  ]}
  current={2}
/>`)}
          {/if}
        </Card>
      </div>
    </section>

    <!-- DATA DISPLAY -->
    <section>
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
            {@render codeBlock('avatar', `<Avatar size="sm" fallback="AB" />

<Avatar size="md" fallback="CD" />

<Avatar size="lg" fallback="EF" />`)}
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
              <Chip
                variant="outlined"
                color="primary"
                icon="★"
                >{#snippet children()}Starred{/snippet}</Chip
              >
              <Chip variant="ghost" color="neutral"
                >{#snippet children()}Ghost{/snippet}</Chip
              >
            </div>
          {:else}
            {@render codeBlock('chip', `<Chip color="primary" variant="filled">Label</Chip>

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

<Chip variant="ghost" color="neutral">Ghost</Chip>`)}
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
            {@render codeBlock('tooltip', `<Tooltip text="This is a tooltip!">
  <span>Hover me</span>
</Tooltip>`)}
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
            <ProgressBar
              value={progressVal}
              animated={true}
              label={true}
            />
            <ProgressBar
              value={-1}
              label={true}
            />
          {:else}
            {@render codeBlock('progress', `<ProgressBar
  value={65}
  animated={true}
  label={true}
/>`)}
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
            {@render codeBlock('spinner', `<Spinner size="sm" />

<Spinner size="md" />

<Spinner size="lg" />`)}
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
              <Skeleton
                variant="circle"
                width="40px"
                height="40px"
              />
              <div class="flex-1 space-y-2">
                <Skeleton
                  variant="text"
                  width="80%"
                  height="14px"
                />
                <Skeleton
                  variant="text"
                  width="60%"
                  height="14px"
                />
              </div>
            </div>
          {:else}
            {@render codeBlock('skeleton', `<Skeleton
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
/>`)}
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
            {@render codeBlock('table', `<script>
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

<!-- Variants: "plain", "striped", "hoverable", "bordered", "compact" -->`)}
          {/if}
        </Card>
      </div>
    </section>

    <!-- FEEDBACK -->
    <section>
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
                  onclick={() => (alertVariant = v)}
                >{v}</button>
              {/each}
            </div>
            <Alert
              variant={alertVariant}
              title={alertVariant.charAt(0).toUpperCase() + alertVariant.slice(1)}
              icon={alertVariant === "default" ? null : (
                alertVariant === "info" ? "info" :
                alertVariant === "success" ? "check_circle" :
                alertVariant === "warning" ? "warning" : "error"
              )}
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
            {@render codeBlock('alert', `<script>
  let variant = $state("info");
</script>

<!-- Icons auto-select based on variant.
     Pass icon="info" to use Material Icons instead.
     Default icons: info→ℹ, success→✓, warning→⚠, error→✕ -->
<Alert variant={variant} title="Title" dismissible>
  Alert message here.
</Alert>

<!-- Variants: default, info, success, warning, error -->`)}
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
                onclick={() => addToastMsg("Saved successfully", "success", "check_circle")}
                >{#snippet children()}Success{/snippet}</Button
              >
              <Button
                variant="filled"
                onclick={() => addToastMsg("Review before continuing", "warning", "warning")}
                >{#snippet children()}Warning{/snippet}</Button
              >
              <Button
                variant="filled"
                onclick={() => addToastMsg("Something failed", "error", "error")}
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
            {@render codeBlock('toast', `<script>
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
     or omit it for defaults: info→ℹ, success→✓, warning→⚠, error→✕. -->`)}
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
            {@render codeBlock('rating', `<Rating
  bind:value={val}
  max={5}
  showValue={true}
/>`)}
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
              <Popover
                position="top"
                bind:open={popoverOpen}
              >
                {#snippet children()}<Button variant="outlined"
                    >{#snippet children()}Top{/snippet}</Button
                  >{/snippet}
                {#snippet content()}<div>
                    <strong>Popover Title</strong>
                    <p class="mt-1 text-sm">Rich content popover.</p>
                  </div>{/snippet}
              </Popover>
              <Popover position="bottom">
                {#snippet children()}<Button
                    variant="outlined"
                    >{#snippet children()}Bottom{/snippet}</Button
                  >{/snippet}
                {#snippet content()}<p class="text-sm">
                    Popover with arrow indicator.
                  </p>{/snippet}
              </Popover>
            </div>
          {:else}
            {@render codeBlock('popover', `<Popover position="top" bind:open={isOpen}>
  <Button variant="outlined">Trigger</Button>
</Popover>
<Popover position="bottom">
  <Button variant="outlined">Bottom</Button>
</Popover>`)}
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
    <FAB style={selectedStyle} theme={selectedTheme} position="bottom-right"
      >{#snippet children()}+{/snippet}</FAB
    >
  </main>
</div>
