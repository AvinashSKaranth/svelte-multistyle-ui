<script>
  import "./table-styles.css";
  import { defaults } from "../config.js";
  import { cn } from "../utils/cn.js";

  let {
    style: styleProp,
    theme: themeProp,
    data = null,
    variant = "plain",
    caption: summary,
    class: className = "",
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);

  const styleClass = $derived(`s-table-${style}`);
  const themeClass = $derived(`theme-${theme}`);
  const variantClass = $derived(`s-table-variant-${variant}`);

  // Derive column headers from the keys of the first data row
  const columns = $derived(
    data && data.length > 0
      ? Object.keys(data[0]).map((key) => ({
          key,
          label: key
        }))
      : []
  );
</script>

<div
  class={cn("s-table-wrapper", styleClass, themeClass, variantClass, className)}
  {...rest}
>
  <div class="s-table-scroll">
    <table class="s-table">
      {#if summary}
        <caption class="s-table-caption">{summary}</caption>
      {/if}
      <thead>
        <tr>
          {#each columns as col}
            <th>{col.label}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each data ?? [] as row}
          <tr>
            {#each columns as col}
              <td>{row[col.key] ?? ""}</td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>