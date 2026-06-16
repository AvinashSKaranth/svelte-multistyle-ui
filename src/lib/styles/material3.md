# Material You (Material 3) — Input Field Specification

## Core Principles

- **Outlined Container**: Full rounded border (4px radius) with floating label that cuts into the border
- **Dynamic Color**: Colors derived from theme seed, tonal palette
- **Floating Label**: Animates from inside to border-top position, with background knockout
- **Tonal Elevation**: Surface tint color changes with elevation level
- **Shape**: Rounded corners (extra-small = 4px by default)

## Interaction States

1. **Resting**: 1px outline border, label inside
2. **Hover**: Border darkens, subtle surface tint
3. **Focused**: 2px primary-colored border, label floats to top-border position with background cutout, primary color label
4. **Filled (unfocused)**: Label stays at top, 1px border returns
5. **Error**: Error color border and label
6. **Disabled**: 12% opacity border, 4% surface

## Animation Specs

- Label float: `translateY(-28px) scale(0.75)` over 200ms cubic-bezier(0.2, 0, 0, 1)
- Border width: 1px → 2px on focus (150ms)
- Surface tint: 200ms ease

## Visual Details

- Container shape: 4px rounded all corners
- Padding: 16px horizontal, 16px vertical
- Label sits on the border line when floated (using background-color knockout or pseudo-element)
- Supporting text below with 4px gap
- Leading/trailing icon support with 12px padding
