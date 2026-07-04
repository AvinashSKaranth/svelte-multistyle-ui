/**
 * Reactive global defaults for svelte-multistyle-ui.
 *
 * These must live in a `.svelte.js` file so Svelte 5 runes work at module scope.
 * Import through `config.js` for a clean public API.
 */
import { styleFonts } from "./themes/fonts.js";

/**
 * Shared reactive default style/theme/mode/font. Mutate properties (do not
 * reassign the object) so every component that reads `defaults.style` /
 * `defaults.theme` / `defaults.mode` / `defaults.font` reacts to changes.
 */
export const defaults = $state({
  style: "material",
  theme: "default",
  mode: "system",
  font: "auto",
  systemDark: false,
});

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
 * Sync the per-style default font class and the inline --t-font override onto
 * the document root. Called by initMultistyleUI; safe to call repeatedly.
 * - A `font` value of "auto" (or omitted) lets the `.ms-font-<style>` class win
 *   (the style's design-guideline default).
 * - Any other `font` value is treated as a CSS font-family stack and written
 *   inline on <html>, overriding the class.
 * @param {string} style
 * @param {string} font
 */
function applyFontToRoot(style, font) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  // refresh the per-style font class so the style default tracks defaults.style
  for (const c of [...root.classList]) {
    if (c.startsWith("ms-font-")) root.classList.remove(c);
  }
  const styleFont = styleFonts[style];
  if (styleFont) root.classList.add(`ms-font-${style}`);
  // inline override wins over the class; clear it when back to auto
  if (font && font !== "auto") {
    root.style.setProperty("--t-font", font);
  } else {
    root.style.removeProperty("--t-font");
  }
}

/**
 * Set the global default style, theme, mode and/or font for all components.
 *
 * @param {Object} [options]
 * @param {string} [options.style="material"] - visual design system
 * @param {string} [options.theme="default"] - color theme preset
 * @param {string} [options.mode="system"] - color mode: "system", "light", or "dark"
 * @param {string} [options.font="auto"] - font-family stack, or "auto" to use
 *   the style's design-guideline default (material→Roboto, fluent→Segoe UI,
 *   carbon→IBM Plex Sans, …). A specific stack is applied as `--t-font` on
 *   <html> so every component inherits it.
 */
export function initMultistyleUI({ style = "material", theme = "default", mode = "system", font = "auto" } = {}) {
  defaults.style = style;
  defaults.theme = theme;
  defaults.mode = mode;
  defaults.font = font;
  applyFontToRoot(style, font);
}

