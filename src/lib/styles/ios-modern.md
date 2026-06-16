# iOS Modern — Input Field Specification

## Core Principles

- **Rounded Rectangle**: Large border-radius (10px), clean contained look
- **Subtle Shadow**: Soft drop shadow for depth without heavy borders
- **System Font**: SF Pro / system-ui at 17px
- **Focus Ring**: Blue ring (3px spread) on focus using box-shadow
- **Clean & Minimal**: No floating labels, relies on placeholder

## Interaction States

1. **Resting**: Light gray border (1px), white background, placeholder visible
2. **Hover**: Slightly darker border
3. **Focused**: Blue focus ring (0 0 0 3px rgba(0,122,255,0.3)), border turns blue
4. **Filled**: Standard appearance
5. **Disabled**: Gray background, reduced opacity

## Animation Specs

- Focus ring: 200ms ease-out
- Background color: 150ms ease
- Scale on tap (mobile): subtle 0.98 scale for 100ms

## Visual Details

- Border radius: 10px
- Padding: 12px 16px
- Font size: 17px (iOS standard)
- Background: #f2f2f7 (grouped) or white (plain)
- Border: 1px solid #c7c7cc
- Focus: 0 0 0 3.5px rgba(0,122,255,0.25)
- Placeholder color: #8e8e93
