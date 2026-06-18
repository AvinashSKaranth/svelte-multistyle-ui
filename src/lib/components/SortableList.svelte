<script>
  import { draggable, droppable } from '@thisux/sveltednd';
  import "./sortablelist-styles.css";
  import { defaults } from "../config.js";

  let {
    style: styleProp,
    theme: themeProp,
    items = $bindable([]),
    onUpdate,
    type = 'item',
    direction = 'vertical',
    children
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);

  const styleClass = $derived(`s-sortablelist-${style}`);
  const themeClass = $derived(`theme-${theme}`);
  const directionClass = $derived(direction === 'horizontal' ? 's-sortablelist-horizontal' : 's-sortablelist-vertical');

  const handleSelector = '.dnd-handle';
  const containerPrefix = $derived(`${type}:`);

  function idKey(id) {
    return String(id ?? '');
  }

  function containerFor(item) {
    return `${type}:${idKey(item.id)}`;
  }

  function findIndexByContainer(container) {
    if (!container || !container.startsWith(containerPrefix)) return -1;
    const id = container.slice(containerPrefix.length);
    return items.findIndex((i) => idKey(i.id) === id);
  }

  let consumedThisDrop = false;

  function isolateEvents(node) {
    function stopStart(e) {
      e.stopPropagation();
    }
    function stopConsumedDrop(e) {
      if (consumedThisDrop) {
        e.stopPropagation();
        consumedThisDrop = false;
      }
    }
    node.addEventListener('pointerdown', stopStart);
    node.addEventListener('dragstart', stopStart);
    node.addEventListener('drop', stopConsumedDrop);
    node.addEventListener('pointerdrop-on-container', stopConsumedDrop);
    return {
      destroy() {
        node.removeEventListener('pointerdown', stopStart);
        node.removeEventListener('dragstart', stopStart);
        node.removeEventListener('drop', stopConsumedDrop);
        node.removeEventListener('pointerdrop-on-container', stopConsumedDrop);
      }
    };
  }

  function handleDrop(state) {
    const { sourceContainer, targetContainer, dropPosition } = state;

    if (
      !sourceContainer?.startsWith(containerPrefix) ||
      !targetContainer?.startsWith(containerPrefix)
    ) {
      return;
    }

    const dragIndex = findIndexByContainer(sourceContainer);
    let dropIndex = findIndexByContainer(targetContainer);
    if (dragIndex === -1 || dropIndex === -1) return;

    if (dropPosition === 'after') {
      dropIndex++;
    }

    if (dragIndex < dropIndex) {
      dropIndex--;
    }

    const next = [...items];
    const [moved] = next.splice(dragIndex, 1);
    next.splice(dropIndex, 0, moved);

    consumedThisDrop = true;
    items = next;
    onUpdate?.(next);
  }
</script>

<div class="s-sortablelist {directionClass} {styleClass} {themeClass}" use:isolateEvents>
  {#each items as item, index (item.id)}
    <div
      use:droppable={{
        container: containerFor(item),
        direction,
        callbacks: { onDrop: handleDrop }
      }}
    >
      <div
        class="s-sortablelist-item"
        data-item-id={item.id}
        data-container-type={type}
        use:draggable={{ dragData: item, container: containerFor(item), handle: handleSelector }}
      >
        {#if children}
          <button
            type="button"
            class="dnd-handle s-sortablelist-handle"
            aria-label="Drag to reorder"
          >
            ⋮⋮
          </button>
          <div class="s-sortablelist-content">
            {@render children(item, index)}
          </div>
        {/if}
      </div>
    </div>
  {/each}
</div>
