# Brutalist UI — Input Field Specification

## Core Principles

- **Raw & Unpolished**: No rounded corners, thick harsh borders
- **Offset Shadow**: Hard box-shadow with no blur (pure offset)
- **Monospace Typography**: System monospace fonts
- **High Contrast**: Black borders on white, or inverse
- **No Subtlety**: Everything is bold, visible, intentional

## Interaction States

1. **Resting**: 3px solid black border, hard offset shadow (4px 4px 0)
2. **Hover**: Shadow increases (6px 6px 0), slight translate(-1px, -1px)
3. **Focused**: Border color changes to primary, shadow color changes to primary
4. **Active/Pressed**: Shadow reduces (2px 2px 0), translate(2px, 2px) — feels "pushed"
5. **Disabled**: Gray border, no shadow

## Animation Specs

- Shadow offset: 150ms ease (snappy)
- Transform translate: 150ms ease
- Border color: instant (no transition for raw feel)

## Visual Details

- Border: 3px solid #000
- Border-radius: 0 (never rounded)
- Box-shadow: 4px 4px 0 #000 (no blur)
- Font: 'Courier New', monospace
- Background: #fff
- Padding: 12px 14px
- Text: bold, raw
- Focus shadow: 5px 5px 0 var(--primary)
