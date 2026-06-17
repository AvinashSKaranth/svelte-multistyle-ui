<script>
  import "./commandpalette-styles.css";
  import { defaults } from "../config.js";
  import { fade } from "svelte/transition";
  import { portal } from "../actions/portal.js";

  let {
    style: styleProp,
    theme: themeProp,
    open = $bindable(false),
    groups = [],
    placeholder = "Type a command...",
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);
  const styleClass = $derived(`s-cmdk-${style}`);
  const themeClass = $derived(`theme-${theme}`);

  let search = $state("");
  let activeIndex = $state(-1);
  let inputEl = $state(null);
  let bodyEl = $state(null);

  // Flatten all items with their group label and a stable index
  let flatItems = $derived.by(() => {
    const items = [];
    for (const group of groups) {
      for (const item of group.items || []) {
        items.push({ ...item, _group: group.label });
      }
    }
    return items;
  });

  // Filtered flat list
  let filteredItems = $derived.by(() => {
    if (!search.trim()) return flatItems;
    const q = search.toLowerCase();
    return flatItems.filter(
      item => item.label?.toLowerCase().includes(q) ||
               item.searchTerms?.some(t => t.toLowerCase().includes(q))
    );
  });

  // Group filtered items back for display
  let filteredGroups = $derived.by(() => {
    if (!search.trim()) return groups;
    const result = [];
    for (const group of groups) {
      const filtered = group.items.filter(
        item => item.label?.toLowerCase().includes(search.toLowerCase()) ||
                 item.searchTerms?.some(t => t.toLowerCase().includes(search.toLowerCase()))
      );
      if (filtered.length > 0) {
        result.push({ ...group, items: filtered });
      }
    }
    return result;
  });

  // Build a lookup from (groupLabel, itemLabel) → filtered index for active tracking
  let activeLookup = $derived.by(() => {
    const map = new Map();
    filteredItems.forEach((item, idx) => {
      map.set(item._group + "||" + item.label, idx);
    });
    return map;
  });

  function getActiveIndex(group, item) {
    return activeLookup.get((group.label || "") + "||" + item.label) ?? -1;
  }

  function handleClose() {
    open = false;
    search = "";
    activeIndex = -1;
  }

  function handleItemClick(item) {
    item.onclick?.();
    handleClose();
  }

  function handleKeydown(e) {
    if (e.key === "Escape") {
      if (search) {
        search = "";
        activeIndex = -1;
      } else {
        handleClose();
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      activeIndex = Math.min(activeIndex + 1, filteredItems.length - 1);
      requestAnimationFrame(scrollIntoView);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      activeIndex = Math.max(activeIndex - 1, 0);
      requestAnimationFrame(scrollIntoView);
    }

    if (e.key === "Enter" && activeIndex >= 0 && activeIndex < filteredItems.length) {
      e.preventDefault();
      handleItemClick(filteredItems[activeIndex]);
    }
  }

  function scrollIntoView() {
    if (!bodyEl) return;
    const items = bodyEl.querySelectorAll(".s-cmdk-item");
    if (items[activeIndex]) {
      items[activeIndex].scrollIntoView({ block: "nearest" });
    }
  }

  // Reset index when search changes
  $effect(() => {
    search;
    activeIndex = -1;
  });

  // Focus input when opened
  $effect(() => {
    if (open && inputEl) {
      requestAnimationFrame(() => inputEl.focus());
    }
  });

  // Listen for global Cmd+K / Ctrl+K
  $effect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        open = !open;
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  });
</script>

{#if open}
  <div
    use:portal
    class="s-cmdk-overlay"
    transition:fade={{ duration: 150 }}
    onclick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    role="dialog"
    aria-modal="true"
    aria-label="Command palette"
    {...rest}
  >
    <div
      class="s-cmdk {styleClass} {themeClass}"
      onkeydown={handleKeydown}
    >
      <div class="s-cmdk-input-wrapper">
        <span class="s-cmdk-search-icon">⌘</span>
        <input
          bind:this={inputEl}
          class="s-cmdk-input"
          type="text"
          bind:value={search}
          {placeholder}
          aria-label="Search commands"
        />
      </div>

      <div bind:this={bodyEl} class="s-cmdk-body" role="listbox">
        {#if filteredGroups.length === 0}
          <div class="s-cmdk-empty">No results found</div>
        {:else}
          {#each filteredGroups as group}
            <div class="s-cmdk-group">
              {#if group.label}
                <div class="s-cmdk-group-label">{group.label}</div>
              {/if}
              {#each group.items as item}
                <button
                  class="s-cmdk-item"
                  class:active={getActiveIndex(group, item) === activeIndex}
                  onclick={() => handleItemClick(item)}
                >
                  {#if item.icon}
                    <span class="s-cmdk-item-icon">{item.icon}</span>
                  {/if}
                  <span class="s-cmdk-item-label">{item.label}</span>
                  {#if item.shortcut}
                    <span class="s-cmdk-item-shortcut">{item.shortcut}</span>
                  {/if}
                </button>
              {/each}
            </div>
          {/each}
        {/if}
      </div>
    </div>
  </div>
{/if}
