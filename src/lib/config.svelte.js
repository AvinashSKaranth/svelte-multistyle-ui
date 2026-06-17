/**
 * Reactive global defaults for svelte-multistyle-ui.
 *
 * These must live in a `.svelte.js` file so Svelte 5 runes work at module scope.
 * Import through `config.js` for a clean public API.
 */

/**
 * Shared reactive default style/theme. Mutate properties (do not reassign the
 * object) so every component that reads `defaults.style` / `defaults.theme`
 * reacts to changes.
 *
 * @type {{ style: string, theme: string }}
 */
export const defaults = $state({ style: "material", theme: "default" });

/**
 * Icon library class used to render icon names.
 * Change this to match your icon library's CSS class
 * (e.g., "material-icons", "fas", "fa-regular").
 */
export const iconClass = "material-symbols-outlined";

/**
 * Set the global default style and/or theme for all components.
 *
 * @param {Object} [options]
 * @param {string} [options.style="material"] - visual design system
 * @param {string} [options.theme="default"] - color theme preset
 */
export function initMultistyleUI({ style = "material", theme = "default" } = {}) {
  defaults.style = style;
  defaults.theme = theme;
}

