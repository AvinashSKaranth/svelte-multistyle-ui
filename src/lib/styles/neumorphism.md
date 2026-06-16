# Neumorphism — Input Field Specification

## Core Principles

- **Soft Shadows**: Two shadows — one light (top-left), one dark (bottom-right)
- **Monochromatic**: Background, element, and shadows share the same hue family
- **Inset for Input**: Input fields use INSET shadows to appear "pressed in"
- **No Borders**: Depth comes entirely from shadow interplay
- **Subtle**: Low contrast between element and background

## Interaction States

1. **Resting**: Inset shadows creating a "pressed in" concave appearance
2. **Hover**: Shadows slightly intensify
3. **Focused**: Deeper inset shadows + subtle primary color inner glow
4. **Filled**: Same as resting with text
5. **Disabled**: Flattened shadows, reduced opacity

## Animation Specs

- Shadow depth: 300ms ease
- Inner glow: 200ms ease
- All transitions smooth and subtle

## Visual Details

- Background: matches parent (e.g., #e0e5ec)
- Light shadow: -6px -6px 12px rgba(255,255,255,0.8)
- Dark shadow: 6px 6px 12px rgba(0,0,0,0.15)
- Inset (input): inset 4px 4px 8px rgba(0,0,0,0.08), inset -4px -4px 8px rgba(255,255,255,0.8)
- Border-radius: 12-16px (soft, rounded)
- Padding: 14px 18px
- No border (border: none)
- Focus: add inset 0 0 0 2px rgba(primary, 0.3)
