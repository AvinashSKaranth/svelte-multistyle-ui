<script>
  // App-wide styles. SvelteKit loads this layout for every route.
  import "../app.css";
  let { children } = $props();
</script>

{@render children?.()}