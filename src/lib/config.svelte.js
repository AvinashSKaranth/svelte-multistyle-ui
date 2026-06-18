/**
 * Reactive global defaults for svelte-multistyle-ui.
 *
 * These must live in a `.svelte.js` file so Svelte 5 runes work at module scope.
 * Import through `config.js` for a clean public API.
 */

/**
 * Shared reactive default style/theme/mode. Mutate properties (do not reassign the
 * object) so every component that reads `defaults.style` / `defaults.theme` /
 * `defaults.mode` reacts to changes.
 */
export const defaults = $state({ style: "material", theme: "default", mode: "system", systemDark: false });

/**
 * Icon library class used to render icon names.
 * Change this to match your icon library's CSS class
 * (e.g., "material-icons", "fas", "fa-regular").
 */
export const iconClass = "material-symbols-outlined";

if (typeof window !== "undefined") {
  defaults.systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", (e) => { defaults.systemDark = e.matches; });
}

/**
 * Set the global default style, theme and/or mode for all components.
 *
 * @param {Object} [options]
 * @param {string} [options.style="material"] - visual design system
 * @param {string} [options.theme="default"] - color theme preset
 * @param {string} [options.mode="system"] - color mode: "system", "light", or "dark"
 */
export function initMultistyleUI({ style = "material", theme = "default", mode = "system" } = {}) {
  defaults.style = style;
  defaults.theme = theme;
  defaults.mode = mode;
}

