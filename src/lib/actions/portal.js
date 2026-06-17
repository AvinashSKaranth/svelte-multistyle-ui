/**
 * Svelte action that reparents a node to `document.body` while it is mounted.
 *
 * Use this on overlay elements (`position: fixed`) so they escape any
 * ancestor that creates a containing block for fixed descendants — most
 * notably `transform`, `filter`, `backdrop-filter`, `perspective`, and
 * `will-change` on those properties. Without a portal, the overlay is
 * positioned relative to that ancestor instead of the viewport, so it can
 * appear clipped or nested inside a Card.
 *
 * The action restores the node to its original parent on destroy.
 *
 * @example
 *   {#if open}
 *     <div use:portal class="s-overlay">…</div>
 *   {/if}
 */
export function portal(node) {
  const originalParent = node.parentNode;
  document.body.appendChild(node);

  return {
    destroy() {
      if (node.parentNode === document.body) {
        document.body.removeChild(node);
      } else if (originalParent && node.parentNode) {
        // Fallback: reattach to original parent if something else moved it.
        originalParent.appendChild(node);
      }
    },
  };
}
