<script>
  import "./table-styles.css";
  import { defaults } from "../config.js";

  let {
    style: styleProp,
    theme: themeProp,
    columns = [],
    rows = [],
    striped = false,
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);

  const styleClass = $derived(`s-table-${style}`);
  const themeClass = $derived(`theme-${theme}`);
</script>

<div class="s-table-wrapper {styleClass} {themeClass}" {...rest}>
  <table class="s-table" class:striped>
    <thead>
      <tr>
        {#each columns as col}
          <th>{col.label}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each rows as row}
        <tr>
          {#each columns as col}
            <td>{row[col.key] ?? ""}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>