<script>
  import "./carousel-styles.css";
  import { defaults } from "../config.js";
  import { cn } from "../utils/cn.js";

  let {
    style: styleProp,
    theme: themeProp,
    slides = [],
    autoPlay = true,
    interval = 4000,
    showArrows = true,
    showIndicators = true,
    class: className = "",
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);
  const styleClass = $derived(`s-carousel-${style}`);
  const themeClass = $derived(`theme-${theme}`);
  let current = $state(0);
  let direction = $state(1);
  let isHovering = $state(false);
  const total = $derived(slides.length);

  function goTo(index) {
    const next = ((index % total) + total) % total;
    direction = next > current ? 1 : -1;
    current = next;
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  // Auto-play with proper cleanup
  $effect(() => {
    if (!autoPlay || total <= 1 || isHovering) return;
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  });

  function slideTransition(node) {
    return {
      duration: 350,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      css: (t, u) => `transform: translateX(${direction * u * 30}px); opacity: ${1 - u * 0.3};`
    };
  }
</script>

<div
  class={cn("s-carousel", styleClass, themeClass, className)}
  onmouseenter={() => { isHovering = true; }}
  onmouseleave={() => { isHovering = false; }}
  role="region"
  aria-roledescription="carousel"
  aria-label="Image carousel"
  {...rest}
>
  <div class="s-carousel-viewport">
    {#if slides.length > 0}
      {#each slides as slide, i}
        {#if i === current}
          <div
            class="s-carousel-slide"
            transition:slideTransition
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${i + 1} of ${total}`}
          >
            {#if slide.image}
              <img
                class="s-carousel-image"
                src={slide.image}
                alt={slide.alt || ""}
                draggable="false"
              />
            {/if}
            {#if slide.caption}
              <div class="s-carousel-caption">{slide.caption}</div>
            {/if}
            {#if slide.content}
              <div class="s-carousel-content">{slide.content}</div>
            {/if}
          </div>
        {/if}
      {/each}
    {:else}
      <div class="s-carousel-empty">No slides</div>
    {/if}
  </div>

  {#if showArrows && total > 1}
    <button class="s-carousel-arrow s-carousel-prev" onclick={prev} aria-label="Previous slide">❮</button>
    <button class="s-carousel-arrow s-carousel-next" onclick={next} aria-label="Next slide">❯</button>
  {/if}

  {#if showIndicators && total > 1}
    <div class="s-carousel-indicators" role="tablist">
      {#each slides as _, i}
        <button
          class="s-carousel-dot"
          class:active={i === current}
          onclick={() => goTo(i)}
          role="tab"
          aria-selected={i === current}
          aria-label={`Go to slide ${i + 1}`}
        ></button>
      {/each}
    </div>
  {/if}
</div>
