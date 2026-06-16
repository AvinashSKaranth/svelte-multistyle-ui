# Cyberpunk UI — Input Field Specification

## Core Principles

- **Neon Glow**: Borders and text emit colored light (box-shadow glow)
- **Clipped Corners**: `clip-path` creates angular, cut-corner shapes
- **Glitch Effect**: On focus, subtle glitch animation (translateX jitter + color split)
- **Dark Background**: Near-black (#0a0a0f) with high-contrast neon text
- **Monospace Font**: Terminal/hacker aesthetic
- **Scanlines**: Optional overlay for CRT monitor feel

## Interaction States

1. **Resting**: Neon border (cyan #00ffcc), dark bg, subtle glow
2. **Hover**: Glow intensifies, slight flicker animation
3. **Focused**: Strong glow, glitch animation plays once, border shifts to secondary neon (magenta)
4. **Typing**: Text has text-shadow glow
5. **Disabled**: Dim glow, desaturated

## Animation Specs

- Glow pulse: `box-shadow` oscillates subtly (2s infinite alternate)
- Glitch: `@keyframes glitch` — 3 rapid translateX shifts over 200ms
- Border color shift: 150ms ease
- Text shadow: constant glow

## Visual Details

- Background: #0a0a0f
- Border: 1px solid #00ffcc
- Clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))
- Box-shadow: 0 0 10px rgba(0,255,204,0.3), inset 0 0 10px rgba(0,255,204,0.05)
- Text color: #00ffcc
- Text-shadow: 0 0 4px #00ffcc
- Font: 'Courier New', monospace
- Padding: 12px 16px
- Glitch keyframes: translateX(-2px), translateX(2px), translateX(0)
