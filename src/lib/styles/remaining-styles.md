# Remaining Style Specifications

## Flat Design

- No shadows, no gradients, no borders (or very subtle)
- Solid background color (tinted from primary at 8%)
- Clean color transitions on focus (background darkens)
- No elevation, completely 2D
- Animation: background-color 200ms ease

## Flat 2.0

- Flat design + subtle long shadow for depth
- Thin border + soft box-shadow (0 2px 4px)
- Focus: shadow grows (0 4px 12px), border becomes primary
- Maintains flat aesthetic but with usability depth cues

## Minimal UI

- Underline only (bottom border), no container
- Label above or floating
- Focus: underline thickens and changes to primary
- Maximum whitespace, zero decoration
- Animation: border-bottom width 200ms, color 150ms

## Retro UI

- Inset bevel effect (inset shadows simulating pressed plastic)
- Warm color palette (#fdf6e3 background, #5c4b37 text)
- Double inset shadow for 3D depth
- Monospace font, no border-radius
- Focus: outer glow in warm primary

## Vintage UI

- Serif typography (Georgia)
- Aged paper background (#faf8f0)
- Subtle inner shadow for depth
- Thin elegant border
- Focus: border darkens, subtle warm glow

## Pixel UI

- Chunky 3px borders, no border-radius
- Inset shadows simulating pixel-art depth
- Dark purple/gaming palette
- Monospace font
- Focus: border changes to gold/yellow, outer pixel glow

## Neon UI

- Dark background (#0d0d0d)
- Border glows with box-shadow (multiple layers)
- Focus: glow intensifies dramatically (3 shadow layers)
- Pulsing glow animation (subtle, 3s infinite)
- Text color: white

## Sci-Fi UI

- HUD-style: monospace, uppercase, letter-spacing
- Dark gradient background (navy tones)
- Thin border, subtle blue glow
- Focus: border brightens, scan-line animation overlay
- Text color: light blue (#7dd3fc)

## Futuristic UI

- Large border-radius (16px), pill-like
- Gradient background (very subtle, near-transparent)
- Backdrop-filter blur for depth
- Focus: primary border glow, expanded shadow
- Smooth, elegant transitions (300ms)

## Terminal UI

- Green on black (#00ff00 on #0c0c0c)
- Monospace font, no border-radius
- 1px green border
- Blinking cursor effect (caret-color animation)
- Focus: subtle green glow
- Text-shadow for CRT phosphor effect
- Optional: scanline overlay

## Y2K UI

- Bubbly gradients (pink → blue)
- Large border-radius (20px), pill shape
- Bold playful borders (3px)
- Comic Sans / Trebuchet MS font
- Focus: border shifts color, multi-color glow
- Glossy/shiny appearance

## Vaporwave UI

- Deep purple/dark gradient background
- Pink/magenta text with text-shadow glow
- Purple border, wide letter-spacing
- Focus: border shifts to cyan, purple glow expands
- Retro-futuristic, surreal aesthetic

## Memphis UI

- White background, thick black border (3px)
- Multi-colored offset shadows (stacked: 5px red, 10px yellow)
- No border-radius (sharp)
- Focus: shadow colors shift (blue, pink)
- Playful, bold, postmodern

## Liquid Glass (Apple iOS 26)

- Refractive glass effect with gradient transparency
- Multiple backdrop-filter layers (blur + saturate)
- Top highlight (inset border-top glow)
- Rounded (16px), floating appearance
- Focus: increased luminosity, stronger highlight
- Box-shadow for floating depth

## Acrylic UI (Microsoft)

- Semi-transparent background (60% white)
- Backdrop-filter: blur(30px)
- Subtle border (rgba white)
- Focus: background becomes more opaque, primary border
- Noise texture overlay (optional via pseudo-element)

## Frosted Glass UI

- Softer blur than glassmorphism (12px)
- More opaque than glassmorphism (15-20% bg)
- Rounded (12px)
- Subtle shadow for floating effect
- Focus: primary border, increased opacity

## Monochrome UI

- Pure black and white palette
- Clean 1.5px border
- Focus: border goes full black, subtle gray shadow
- No color at all (grayscale only)

## Gradient UI

- Background uses linear-gradient from surface to primary-tinted
- Border matches theme
- Focus: gradient intensifies, shadow appears
- Smooth color transitions

## Dark Theme UI

- Dark surface (#1a1a2e), light text
- Subtle dark border (#2d2d44)
- Focus: primary border, surface lightens slightly
- Muted, easy on eyes

## Light Theme UI

- White surface, subtle shadow (0 1px 3px)
- Light border (#e2e8f0)
- Focus: primary border + focus ring
- Clean, professional

## High-Contrast UI

- Black background, white text, thick white border (3px)
- Focus: yellow border + yellow outline (accessibility)
- No border-radius, bold font
- Maximum readability, WCAG AAA
