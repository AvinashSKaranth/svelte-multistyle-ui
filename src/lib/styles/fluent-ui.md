# Fluent UI — Input Field Specification

## Core Principles

- **Bottom Accent Border**: Thick bottom border that animates from center outward on focus
- **Reveal Effect**: Subtle border highlight that follows mouse position (light reveal)
- **Acrylic Background**: Semi-transparent background with noise texture
- **Motion**: Smooth, purposeful animations using cubic-bezier curves
- **Depth**: Layered appearance with subtle elevation

## Interaction States

1. **Resting**: 1px border all around, 2px bottom border (neutral), clean background
2. **Hover**: Border lightens, subtle reveal glow near cursor
3. **Focused**: Bottom border animates to primary color, expanding from center outward
4. **Filled**: Standard appearance with value displayed
5. **Disabled**: Reduced opacity (40%), no pointer events

## Animation Specs

- Bottom border expand: `scaleX(0) → scaleX(1)` from center, 250ms cubic-bezier(0.1, 0.9, 0.2, 1)
- Background transition: 150ms ease
- Reveal effect: follows pointer with radial gradient

## Visual Details

- Border radius: 4px (subtle rounding)
- Font: Segoe UI / system-ui, 14px
- Padding: 8px 12px
- Background: white (light) / #1f1f1f (dark)
- Border: 1px solid #8a8886, bottom 2px
- Focus indicator: 2px bottom border in brand color, animated from center
