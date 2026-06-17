# Fluent UI 2 — Design Language Specification

## A Prompt for Replicating Microsoft Fluent 2 in Svelte Components

---

> **How to use this document:** Paste the section(s) relevant to the component you are building into your prompt. The "Master Prompt" at the top gives a concise but complete framing of the entire design language. The sections below it expand each pillar in detail for deep implementation work.

---

You are building Svelte 5 components that faithfully replicate Microsoft Fluent UI 2 (Fluent 2), the design system used in Microsoft 365 products such as Teams, Outlook, OneDrive, and Loop.

Fluent 2 is a **token-first, accessibility-first** design system. All visual decisions — color, spacing, radius, shadow, motion, and typography — are expressed as **design tokens** (CSS custom properties), not hardcoded values. Components expose **slots** for composition and respond to **four interaction states**: rest, hover, pressed, and disabled. The system ships with built-in light, dark, high-contrast, and brand themes — your Svelte components must respect this by consuming tokens, never raw values.

The core aesthetic is **calm, layered, and purposeful**: generous whitespace, subtle depth through shadow and material effects, rounded corners, and smooth motion that communicates intent without being decorative.

---

## 1 · TOKEN ARCHITECTURE

### Two Layers

**Global tokens** — context-agnostic raw values (hex codes, px numbers, ms durations). Named like `Global.Color.Blue.60`. Used inside the theme definition only, never directly in components.

**Alias tokens** — semantic names that map to global tokens and change per theme. Named to describe function, not value. These are what components consume.

Example:

```
Global.Color.Neutral.Foreground1  →  #242424 (light) / #FFFFFF (dark)
```

In CSS custom properties (how Fluent v9 ships on web):

```css
--colorNeutralForeground1: #242424;
--colorBrandBackground: #0f6cbd;
--spacingHorizontalM: 12px;
--borderRadiusMedium: 4px;
--shadow4: 0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 4px 0 rgba(0, 0, 0, 0.14);
```

**Rule:** In every Svelte component you write, reference only CSS variables (tokens). Never hardcode a hex, px value, or `box-shadow` string.

---

## 2 · COLOR SYSTEM

### Three Palettes

**Neutral palette** — greys from white (#FFFFFF) to black (#000000) across ~14 stops. Used for text, backgrounds, borders, icons, and UI chrome.

**Brand palette** — the accent hue (default: Microsoft Blue `#0f6cbd`), with 10 tonal variants from lightest (#cfe4fa) to darkest (#002848). Used for primary actions, selected states, and focus indicators.

**Shared palettes** — semantic colors for status communication:

- Danger/Error: red family (`#d13438`, `#fde7e9`)
- Warning: yellow/amber family (`#f7630c`, `#fff4ce`)
- Success: green family (`#107c10`, `#dff6dd`)
- Info: blue family (same range as brand)

### Alias Token Naming Convention

| Token segment                    | Meaning                                            |
| -------------------------------- | -------------------------------------------------- |
| `colorNeutralForeground1`        | Primary text / highest emphasis neutral            |
| `colorNeutralForeground2`        | Secondary text                                     |
| `colorNeutralForeground3`        | Tertiary / placeholder                             |
| `colorNeutralForegroundDisabled` | Disabled state text                                |
| `colorNeutralBackground1`        | Page / canvas base                                 |
| `colorNeutralBackground2`        | Slightly raised surface                            |
| `colorNeutralBackground3`        | Cards, panels                                      |
| `colorNeutralBackground4`        | Input fields                                       |
| `colorNeutralBackground5`        | Hovered state background                           |
| `colorNeutralBackground6`        | Pressed state background                           |
| `colorNeutralStroke1`            | Default borders                                    |
| `colorNeutralStroke2`            | Dividers                                           |
| `colorNeutralStrokeDisabled`     | Disabled borders                                   |
| `colorBrandBackground`           | Primary button background                          |
| `colorBrandBackgroundHover`      | Primary button hover                               |
| `colorBrandBackgroundPressed`    | Primary button pressed                             |
| `colorBrandForeground1`          | Brand-colored text/icons on neutral bg             |
| `colorBrandStroke1`              | Brand-colored border (e.g. selected tab underline) |
| `colorStatusDangerForeground1`   | Error message text                                 |
| `colorStatusDangerBackground1`   | Error badge/tag background                         |
| `colorStatusWarningForeground1`  | Warning text                                       |
| `colorStatusSuccessForeground1`  | Success text                                       |

### Interaction State Color Pattern

For any interactive element, layer these alias tokens:

```
rest    → colorNeutralBackground1 / colorNeutralForeground1
hover   → colorNeutralBackground1Hover  (slightly tinted)
pressed → colorNeutralBackground1Pressed (more tinted)
selected→ colorBrandBackground2 + colorBrandForeground1 (for subtle) OR colorBrandBackground + colorNeutralForegroundOnBrand (for filled)
disabled→ colorNeutralBackgroundDisabled + colorNeutralForegroundDisabled (opacity 40%)
```

### Theming

Fluent 2 supports four themes via CSS variable overrides on a root or `FluentProvider` element:

- `webLightTheme` (default)
- `webDarkTheme`
- `teamsLightTheme` / `teamsDarkTheme`
- `webHighContrastTheme`

In Svelte: apply a `data-theme` attribute to the root and swap CSS custom property values accordingly.

---

## 3 · TYPOGRAPHY

### Font Stack

**Web (primary):** `'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif`

**Fallback by platform:** San Francisco Pro on macOS/iOS, Roboto on Android.

### Type Ramp — Web (Fluent 2)

| Token name                              | Weight         | Size | Line-height | Use                           |
| --------------------------------------- | -------------- | ---- | ----------- | ----------------------------- |
| `fontSizeBase100` / Caption 2           | Regular (400)  | 10px | 14px        | Fine print, metadata          |
| `fontSizeBase100` / Caption 2 Strong    | Semibold (600) | 10px | 14px        | Emphasized fine print         |
| `fontSizeBase200` / Caption 1           | Regular (400)  | 12px | 16px        | Secondary labels, helper text |
| `fontSizeBase200` / Caption 1 Strong    | Semibold (600) | 12px | 16px        | Secondary label emphasis      |
| `fontSizeBase200` / Caption 1 Stronger  | Bold (700)     | 12px | 16px        | —                             |
| `fontSizeBase300` / Body 1              | Regular (400)  | 14px | 20px        | **Default body text**         |
| `fontSizeBase300` / Body 1 Strong       | Semibold (600) | 14px | 20px        | Emphasized body               |
| `fontSizeBase300` / Body 1 Stronger     | Bold (700)     | 14px | 20px        | Strong emphasis               |
| `fontSizeBase400` / Subtitle 2          | Semibold (600) | 16px | 22px        | Section labels, card titles   |
| `fontSizeBase400` / Subtitle 2 Stronger | Bold (700)     | 16px | 22px        | —                             |
| `fontSizeBase500` / Subtitle 1          | Semibold (600) | 20px | 26px        | Dialogs, panel headings       |
| `fontSizeBase600` / Title 3             | Semibold (600) | 24px | 32px        | Section headings              |
| `fontSizeHero700` / Title 2             | Semibold (600) | 28px | 36px        | Page headings                 |
| `fontSizeHero800` / Title 1             | Semibold (600) | 32px | 40px        | Hero headings                 |
| `fontSizeHero900` / Large Title         | Semibold (600) | 40px | 52px        | Hero / landing                |
| `fontSizeHero1000` / Display            | Semibold (600) | 68px | 92px        | Display / splash              |

### Typography Rules

- Default text color: `colorNeutralForeground1`
- Secondary / helper text: `colorNeutralForeground2`
- Placeholder: `colorNeutralForeground4`
- Disabled text: `colorNeutralForegroundDisabled`
- **Alignment:** Left-align by default (LTR). Never use all-caps for emphasis.
- **Contrast:** Body text minimum 4.5:1 contrast ratio. Large text (18.5px bold / 24px regular) minimum 3:1.
- Line length: 50–60 characters per line for readability.

---

## 4 · SPACING

Fluent 2 uses a **4px base grid**. Horizontal and vertical spacing tokens:

| Token                     | Value      | Use                          |
| ------------------------- | ---------- | ---------------------------- |
| `spacingHorizontalXXS`    | 2px        | Tight icon + label gap       |
| `spacingHorizontalXS`     | 4px        | Inline element gap           |
| `spacingHorizontalSNudge` | 6px        | —                            |
| `spacingHorizontalS`      | 8px        | Small padding, compact items |
| `spacingHorizontalMNudge` | 10px       | —                            |
| `spacingHorizontalM`      | 12px       | **Default element padding**  |
| `spacingHorizontalL`      | 16px       | Card/panel padding           |
| `spacingHorizontalXL`     | 20px       | Section padding              |
| `spacingHorizontalXXL`    | 24px       | Large section gap            |
| `spacingHorizontalXXXL`   | 32px       | —                            |
| `spacingVertical*`        | Same scale | Same values, vertical axis   |

**Note:** `spacingHorizontalM` (12px) is the default inner padding for buttons and inputs. `spacingHorizontalL` (16px) is the default padding for cards and panels.

---

## 5 · BORDER RADIUS

| Token                  | Value | Use                                       |
| ---------------------- | ----- | ----------------------------------------- |
| `borderRadiusNone`     | 0px   | Square (legacy / special)                 |
| `borderRadiusSmall`    | 2px   | Tags, badges, compact chips               |
| `borderRadiusMedium`   | 4px   | **Default** — buttons, inputs, checkboxes |
| `borderRadiusLarge`    | 6px   | Cards, panels                             |
| `borderRadiusXLarge`   | 8px   | Dialogs, flyouts                          |
| `borderRadiusCircular` | 50%   | Avatars, toggle, circular controls        |

---

## 6 · ELEVATION & SHADOWS

Fluent 2 shadows simulate real-world light: a sharp **key shadow** (directional, defines edge) combined with a soft **ambient shadow** (diffused, implies distance).

| Token      | Value                                                  | Use                             |
| ---------- | ------------------------------------------------------ | ------------------------------- |
| `shadow2`  | `0 0 2px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.14)`   | Subtle lift — hover state cards |
| `shadow4`  | `0 0 2px rgba(0,0,0,.12), 0 2px 4px rgba(0,0,0,.14)`   | **Default card elevation**      |
| `shadow8`  | `0 0 2px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.14)`   | Dropdowns, menus                |
| `shadow16` | `0 0 2px rgba(0,0,0,.12), 0 8px 16px rgba(0,0,0,.14)`  | Flyouts, tooltips               |
| `shadow28` | `0 0 8px rgba(0,0,0,.12), 0 14px 28px rgba(0,0,0,.14)` | Dialogs                         |
| `shadow64` | `0 0 8px rgba(0,0,0,.12), 0 32px 64px rgba(0,0,0,.14)` | Full-screen overlays            |

**Brand shadows** — use `shadowBrand*` variants when elevating brand-colored surfaces (adjusted opacity to match luminosity).

**Dark theme:** Shadows are reduced in opacity (dark surfaces don't cast strong shadows). Instead, **stroke/border** (`colorNeutralStroke1`) is used to outline elevated surfaces.

---

## 7 · MOTION & ANIMATION

Fluent 2 motion is purposeful and physics-based. Animations communicate state transitions, not decoration.

### Easing Curves

| Token                | Cubic Bezier                     | Use                                |
| -------------------- | -------------------------------- | ---------------------------------- |
| `curveEasyEase`      | `cubic-bezier(0.33, 0, 0.67, 1)` | **Default.** Generic enter/exit    |
| `curveEasyEaseMax`   | `cubic-bezier(0.8, 0, 0.2, 1)`   | Dramatic transitions (full-screen) |
| `curveLinear`        | `cubic-bezier(0, 0, 1, 1)`       | Continuous / looping animations    |
| `curveDecelerateMid` | `cubic-bezier(0.1, 0.9, 0.2, 1)` | Elements entering the screen       |
| `curveAccelerateMid` | `cubic-bezier(0.7, 0, 1, 0.5)`   | Elements leaving the screen        |

### Duration Tokens

| Token               | Value | Use                                           |
| ------------------- | ----- | --------------------------------------------- |
| `durationUltraFast` | 50ms  | Micro-interactions (icon swap)                |
| `durationFaster`    | 100ms | Subtle state changes (hover)                  |
| `durationFast`      | 150ms | **Default** — button press, toggle            |
| `durationNormal`    | 200ms | **Standard** — expand/collapse, dropdown open |
| `durationGentle`    | 250ms | Larger element transitions                    |
| `durationSlow`      | 300ms | Panels, drawers sliding in                    |
| `durationSlower`    | 400ms | Page-level transitions                        |
| `durationUltraSlow` | 500ms | Full-screen overlays / dialogs                |

### Motion Principles

- **Hover:** `durationFaster` (100ms) with `curveEasyEase` — immediate acknowledgment
- **Press/Release:** `durationFast` (150ms) with `curveEasyEase`
- **Open menus/dropdowns:** `durationNormal` (200ms), decelerate in, accelerate out
- **Dialogs/panels:** `durationSlow` (300ms) sliding from edge
- **Avoid:** decorative bounce, spring physics on standard controls, animation longer than 500ms for UI chrome
- Elements entering: use `curveDecelerateMid` (ease into position). Elements exiting: use `curveAccelerateMid` (ease out quickly).

---

## 8 · COMPONENT ANATOMY & INTERACTION STATES

Every interactive Fluent component has this state model:

| State        | Visual change                                                                                                                     |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| **Rest**     | Base tokens. No shadow change.                                                                                                    |
| **Hover**    | Background shifts to `*Hover` token variant. Cursor: pointer. Duration: 100ms.                                                    |
| **Pressed**  | Background shifts to `*Pressed` token variant (darker). Duration: 150ms.                                                          |
| **Focus**    | 2px solid `colorStrokeFocus1` (#000000 light, #FFF dark) outline, 2px offset. Always visible for keyboard users.                  |
| **Disabled** | `colorNeutralBackgroundDisabled` + `colorNeutralForegroundDisabled`. Opacity not used (tokens handle it). `pointer-events: none`. |
| **Selected** | `colorBrandBackground2` (subtle) or filled brand background. `colorBrandStroke1` underline for tabs.                              |
| **Loading**  | Skeleton shimmer animation or spinner.                                                                                            |

### Focus Indicator (Accessibility)

```css
outline: 2px solid var(--colorStrokeFocus1);
outline-offset: 2px;
border-radius: var(--borderRadiusMedium);
```

Never hide focus outlines. Use `:focus-visible` to only show on keyboard navigation.

---

## 9 · STANDARD COMPONENT REFERENCE

### Button

**Variants:** Primary, Secondary (Default), Outline, Subtle, Transparent, Icon-only

| Variant             | Background                | Border                      | Text                            |
| ------------------- | ------------------------- | --------------------------- | ------------------------------- |
| Primary             | `colorBrandBackground`    | none                        | `colorNeutralForegroundOnBrand` |
| Secondary (Default) | `colorNeutralBackground1` | `colorNeutralStroke1` (1px) | `colorNeutralForeground1`       |
| Outline             | transparent               | `colorNeutralStroke1` (1px) | `colorNeutralForeground1`       |
| Subtle              | transparent               | none                        | `colorNeutralForeground2`       |
| Transparent         | transparent               | none                        | `colorBrandForeground1`         |

**Sizes:**

- Small: height 24px, `fontSizeBase200` (12px), padding `spacingHorizontalS` (8px)
- Medium (default): height 32px, `fontSizeBase300` (14px), padding `spacingHorizontalM` (12px)
- Large: height 40px, `fontSizeBase300` (14px), padding `spacingHorizontalL` (16px)

**Border radius:** `borderRadiusMedium` (4px) on all buttons.

### Input / TextField

- Height: 32px (medium), border: 1px solid `colorNeutralStroke1`
- Border radius: `borderRadiusMedium` (4px)
- Background: `colorNeutralBackground1`
- Bottom border accent on focus: 2px `colorBrandStroke1` (replacing the border)
- Placeholder: `colorNeutralForeground4`
- Error state: `colorStatusDangerForeground1` border + helper text

### Checkbox

- Size: 16×16px, `borderRadiusSmall` (2px)
- Checked: `colorBrandBackground` fill, white checkmark
- Unchecked border: `colorNeutralStroke1`

### Toggle / Switch

- Track width: 40px, height: 20px, `borderRadiusCircular`
- Thumb: white circle, shadow
- On: `colorBrandBackground` track, Off: `colorNeutralBackground4` track

### Card

- Background: `colorNeutralBackground1`
- Border: 1px `colorNeutralStroke1`
- Border radius: `borderRadiusLarge` (6px)
- Shadow: `shadow4`
- Hover shadow: `shadow8`
- Padding: `spacingHorizontalL` / `spacingVerticalL` (16px)

### Badge / Tag

- Border radius: `borderRadiusSmall` (2px) for rectangular, `borderRadiusCircular` for pill
- Sizes: Tiny (6px), Small (16px), Medium (20px), Large (24px), Extra-large (28px)
- Filled, tinted, outline, ghost variants

### Dialog / Modal

- Overlay: `colorNeutralBackgroundAlpha2` (semi-transparent scrim, `rgba(0,0,0,0.4)`)
- Surface: `colorNeutralBackground1`, `borderRadiusXLarge` (8px), `shadow28`
- Min width: 272px, max width: 600px (default)
- Enter animation: fade + scale from 0.95→1, `durationSlow`, `curveDecelerateMid`

### Tooltip

- Background: `colorNeutralBackground1` (inverted in dark: dark background)
- Border radius: `borderRadiusMedium` (4px)
- Shadow: `shadow16`
- Max width: 240px, `fontSizeBase200` (12px)
- Delay before show: 300ms

### Avatar

- Shape: `borderRadiusCircular`
- Sizes: 16, 20, 24, 28, 32, 36, 40 (default), 48, 56, 64, 72, 96, 120, 128px
- Presence indicator: colored ring, positioned bottom-right

### Tabs

- Active tab indicator: 2px `colorBrandStroke1` underline (web) or filled background (app bar style)
- Tab text: `colorNeutralForeground1` (active), `colorNeutralForeground2` (inactive)
- Hover: `colorNeutralBackground1Hover`

### Menu / Dropdown

- Border radius: `borderRadiusLarge` (6px)
- Shadow: `shadow8`
- Item height: 32px
- Hover background: `colorNeutralBackground1Hover`
- Active/selected: `colorSubtleBackgroundSelected` + `colorNeutralForeground1`
- Separator: 1px `colorNeutralStroke2`

---

## 10 · LAYOUT PRINCIPLES

- **Grid:** 4px base unit. Use multiples of 4 for all spacing.
- **Responsive breakpoints:** 320px (mobile), 640px (small), 1024px (medium), 1366px (large), 1920px (x-large).
- **Density options:** Compact (-4px from default), Default, Comfortable (+4px from default). Use the spacing tokens to shift density.
- **Alignment:** Left-align content in LTR; baseline-align text across columns.
- **Z-index layers:**
  - Content: 0
  - Sticky/fixed elements: 100
  - Overlays / drawers: 200
  - Dropdowns / menus: 300
  - Tooltips: 400
  - Dialogs / modals: 500
  - Notifications / toasts: 600

---

## 11 · ACCESSIBILITY REQUIREMENTS

All Fluent 2 components must meet **WCAG 2.1 AA** by default:

- Colour contrast: body text 4.5:1, large text 3:1, UI components and graphics 3:1
- Focus visible: always shown for keyboard navigation (`:focus-visible`)
- Touch targets: minimum 24×24px, recommended 44×44px
- All interactive elements have accessible names (`aria-label`, `aria-labelledby`, or visible text)
- State communicated via ARIA (`aria-disabled`, `aria-selected`, `aria-expanded`, `aria-checked`)
- Motion: respect `prefers-reduced-motion`. Reduce or eliminate animations for users who request it.

```css
@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
```

---

## 12 · SVELTE IMPLEMENTATION NOTES

When building these components in **Svelte 5 with SvelteKit (CSR mode)**:

1. **CSS Custom Properties as Tokens** — Define all Fluent tokens on `:root` in a global CSS file. In dark mode, swap the values under a `[data-theme="dark"]` selector.

2. **No hardcoded values** — All `color`, `padding`, `border-radius`, `box-shadow`, `font-size`, `line-height` values must reference `var(--tokenName)`.

3. **Interaction state with Svelte transitions** — Use `transition:fly`, `transition:fade`, or `transition:scale` for Fluent-spec enter/exit animations. Match easing to Fluent curves using the `easing` parameter.

4. **Slots for composition** — Mirror Fluent's slot model: components accept `icon`, `action`, `header`, `footer` snippets via Svelte 5 `{#snippet}` / `{@render}`.

5. **Accessibility** — Use `$effect` to manage focus trap in dialogs, `aria-*` attributes reactively.

6. **Theming context** — Use Svelte `setContext`/`getContext` to propagate the active theme (light/dark/high-contrast) to all child components.

```svelte
<!-- Example token usage in a Svelte component -->
<style>
  .button {
    background: var(--colorBrandBackground);
    color: var(--colorNeutralForegroundOnBrand);
    font-size: var(--fontSizeBase300);
    font-weight: var(--fontWeightSemibold);
    line-height: var(--lineHeightBase300);
    padding: var(--spacingVerticalS) var(--spacingHorizontalM);
    border-radius: var(--borderRadiusMedium);
    border: none;
    transition: background var(--durationFaster) var(--curveEasyEase);
  }
  .button:hover {
    background: var(--colorBrandBackgroundHover);
  }
  .button:active {
    background: var(--colorBrandBackgroundPressed);
    transition-duration: var(--durationFast);
  }
  .button:focus-visible {
    outline: 2px solid var(--colorStrokeFocus1);
    outline-offset: 2px;
  }
  .button:disabled {
    background: var(--colorNeutralBackgroundDisabled);
    color: var(--colorNeutralForegroundDisabled);
    cursor: not-allowed;
  }
</style>
```

---

## REFERENCE LINKS

- Fluent 2 Design System: https://fluent2.microsoft.design
- Fluent UI React v9 (component library): https://react.fluentui.dev
- Token pipeline / naming reference: https://microsoft.github.io/fluentui-token-pipeline/naming.html
- GitHub (`@fluentui/react-components`): https://github.com/microsoft/fluentui
- Fluent 2 Figma Web Kit: https://aka.ms/Fluent2Toolkits/Web/Figma

---

_Spec version: Fluent 2 / Fluent UI React v9 · Last updated June 2026_
