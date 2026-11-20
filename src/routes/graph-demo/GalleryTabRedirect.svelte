<script>
  import { resolve } from "$app/paths";

  let { tab, label } = $props();
  const destination = $derived(`${resolve("/")}?tab=graph-editor${tab === "blueprint" ? "&variant=blueprint" : ""}`);
</script>

<svelte:head>
  <meta http-equiv="refresh" content={`0;url=${destination}`} />
</svelte:head>

<a href={destination}>Open {label} in the component gallery</a>
