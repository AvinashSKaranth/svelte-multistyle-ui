# Carousel

Displays image or text slides with optional arrows and slide indicators. Autoplay pauses while the pointer is over the carousel.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `slides` | `{ image?: string, alt?: string, caption?: string, content?: string }[]` | `[]` | Each slide can show an image with alt text, a caption, and plain text content. |
| `autoPlay` | boolean | `true` | Advances when there are at least two slides. |
| `interval` | number | `4000` | Milliseconds between automatic advances. |
| `showArrows` | boolean | `true` | Shows previous and next controls for multiple slides. |
| `showIndicators` | boolean | `true` | Shows direct slide navigation for multiple slides. |
| `style`, `theme`, `class` | string | global style and theme, empty class | Optional wrapper styling. |

Extra attributes are forwarded to the carousel region. Set `aria-label` to give the region a specific accessible name.

```svelte
<script>
  import { Carousel } from 'svelte-multistyle-ui';
</script>

<Carousel
  aria-label="Studio tour"
  autoPlay={false}
  slides={[
    { image: '/studio.jpg', alt: 'Worktables in the studio', caption: 'Studio' },
    { image: '/garden.jpg', alt: 'Raised planting beds', caption: 'Garden' },
  ]}
/>
```
