# Glassmorphism — Input Field Specification

## Core Principles

- **Frosted Glass Effect**: `backdrop-filter: blur(16-20px)` creates glass-like transparency
- **Semi-transparent Background**: rgba with 10-20% opacity
- **Subtle Border**: 1px white/light border at 20-30% opacity for edge definition
- **Layered Depth**: Elements float above colorful backgrounds
- **Light Refraction**: Top highlight border simulating light hitting glass edge

## Interaction States

1. **Resting**: Glass panel with blur, subtle border, slight shadow
2. **Hover**: Increased background opacity (15% → 22%), brighter border
3. **Focused**: Border becomes primary-tinted, stronger glow shadow, increased blur
4. **Filled**: Standard glass appearance
5. **Disabled**: Reduced opacity, no blur

## Animation Specs

- Background opacity: 300ms ease
- Border color: 200ms ease
- Box-shadow glow: 300ms ease
- Blur intensity: not animated (performance)

## Visual Details

- Background: rgba(255,255,255, 0.1-0.15) on dark, rgba(255,255,255, 0.4-0.6) on light
- Backdrop-filter: blur(16px) saturate(1.2)
- Border: 1px solid rgba(255,255,255, 0.2)
- Border-radius: 12-16px
- Box-shadow: 0 8px 32px rgba(0,0,0,0.1)
- Top highlight: inset 0 1px 0 rgba(255,255,255,0.3)
- Padding: 14px 18px
