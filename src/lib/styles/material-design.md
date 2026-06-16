# Material Design — Input Field Specification

## Core Principles

- **Floating Label**: Placeholder text starts inside the field and animates up (translates Y and scales down to ~75%) when focused or filled
- **Bottom Border Emphasis**: 2px bottom border that transitions from gray to primary color on focus
- **Ripple Effect**: Subtle color spread from the point of interaction
- **Elevation**: Filled variant has a subtle background tint; outlined variant has a full border
- **State Layers**: Hover adds a 4% opacity overlay; focus adds 12% opacity overlay

## Interaction States

1. **Resting**: Gray bottom border, label inside field at full size
2. **Hover**: Darker bottom border, slight background tint (4% black overlay)
3. **Focused**: Primary-colored bottom border (2px), label floats up and shrinks, background tint (8%)
4. **Filled (unfocused)**: Label stays floated, border returns to gray
5. **Error**: Red bottom border, red label, helper text appears
6. **Disabled**: 38% opacity, no interaction

## Animation Specs

- Label float: `transform: translateY(-20px) scale(0.75)` over 200ms cubic-bezier(0.4, 0, 0.2, 1)
- Border color: 150ms ease
- Background tint: 150ms ease
- Ripple: 300ms radial expansion

## Visual Details

- Font: Roboto / system-ui, 16px body
- Label color (resting): rgba(0,0,0,0.6)
- Label color (focused): primary color
- Container: filled background with rounded top corners (4px), flat bottom
- Padding: 16px horizontal, 20px top (to accommodate floated label), 8px bottom
