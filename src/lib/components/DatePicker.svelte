<script>
  import "./datepicker-styles.css";
  import { defaults, iconClass } from "../config.js";
  import dayjs from "dayjs";
  import customParseFormat from "dayjs/plugin/customParseFormat";
  dayjs.extend(customParseFormat);

  let {
    style: styleProp,
    theme: themeProp,
    value = $bindable(""),
    format = "YYYY-MM-DD",
    displayFormat = undefined,
    label = "",
    placeholder = "",
    disabled = false,
    min = undefined,
    max = undefined,
    locale = "en-US",
    ...rest
  } = $props();

  const style = $derived(styleProp ?? defaults.style);
  const theme = $derived(themeProp ?? defaults.theme);
  const styleClass = $derived(`s-datepicker-${style}`);
  const themeClass = $derived(`theme-${theme}`);
  const uid = Math.random().toString(36).slice(2, 9);
  const internalId = `dp-${uid}`;
  const dispFormat = $derived(displayFormat ?? format);



  // State
  let open = $state(false);
  let view = $state("date");
  let viewDate = $state(new Date());
  let selectedDate = $state(null);
  let isMobile = $state(false);


  // Format helpers — uses dayjs for full format support (MMM, MMMM, etc.)
  function toDayjsFmt(f) {
    return f.replace(/hh/g, "HH");
  }

  function fmt(date, f) {
    return dayjs(date).format(toDayjsFmt(f));
  }

  function parseDate(str, f) {
    const d = dayjs(str, toDayjsFmt(f));
    return d.isValid() ? d.toDate() : null;
  }

  // Derived
  const displayValue = $derived(
    value ? fmt(parseDate(value, format) || new Date(), dispFormat) : ""
  );
  const inputPlaceholder = $derived(placeholder || dispFormat.toLowerCase());

  // Floating-label support — mirrors Input.svelte so the label sits inside the
  // border (floats up on focus/value) for outlined styles, and renders no
  // in-field label for the non-floating styles, exactly like Input.
  const floatingStyles = ["material", "material3", "fluent", "carbon", "bootstrap", "legacy-ios"];
  const hasFloatingLabel = $derived(floatingStyles.includes(style) && !!label);
  const hasValue = $derived(!!value);
  const floated = $derived(open || hasValue);

  const minDate = $derived(min ? parseDate(min, format) : null);
  const maxDate = $derived(max ? parseDate(max, format) : null);

  const viewYear = $derived(viewDate.getFullYear());
  const viewMonth = $derived(viewDate.getMonth());
  const decadeStart = $derived(Math.floor(viewYear / 12) * 12);
  const decadeEnd = $derived(decadeStart + 11);

  const months = $derived(
    Array.from({ length: 12 }, (_, i) =>
      new Date(2000, i, 1).toLocaleString(locale, { month: "short" })
    )
  );
  const weekdays = $derived(
    Array.from({ length: 7 }, (_, i) =>
      new Date(2000, 0, i + 2).toLocaleString(locale, { weekday: "short" })
    )
  );

  function calendarDays(year, month) {
    const fd = new Date(year, month, 1).getDay();
    const dim = new Date(year, month + 1, 0).getDate();
    const pmd = new Date(year, month, 0).getDate();
    const days = [];
    for (let i = fd - 1; i >= 0; i--) days.push({ d: pmd - i, o: true });
    for (let i = 1; i <= dim; i++) days.push({ d: i, o: false });
    let n = 1;
    while (days.length < 42) { days.push({ d: n++, o: true }); }
    return days;
  }

  const calDays = $derived(calendarDays(viewYear, viewMonth));
  const yearList = $derived(
    Array.from({ length: 12 }, (_, i) => decadeStart + i)
  );

  function isToday(d, o) {
    if (o) return false;
    const t = new Date();
    return d === t.getDate() && viewMonth === t.getMonth() && viewYear === t.getFullYear();
  }

  function isDisabled(d, o) {
    if (o) return true;
    const dt = new Date(viewYear, viewMonth, d);
    const day = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
    const minDay = minDate ? new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate()) : null;
    const maxDay = maxDate ? new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate() + 1) : null;
    if (minDay && day < minDay) return true;
    if (maxDay && day >= maxDay) return true;
    return false;
  }

  function isSelected(d, o) {
    if (!selectedDate || o) return false;
    return d === selectedDate.getDate() && viewMonth === selectedDate.getMonth() && viewYear === selectedDate.getFullYear();
  }

  // Navigation
  function prev() {
    if (view === "date") viewDate = new Date(viewYear, viewMonth - 1, 1);
    else if (view === "month") viewDate = new Date(viewYear - 1, viewMonth, 1);
    else viewDate = new Date(viewYear - 12, viewMonth, 1);
  }

  function next() {
    if (view === "date") viewDate = new Date(viewYear, viewMonth + 1, 1);
    else if (view === "month") viewDate = new Date(viewYear + 1, viewMonth, 1);
    else viewDate = new Date(viewYear + 12, viewMonth, 1);
  }

  function selectDay(d, o) {
    if (o) return;
    const dt = new Date(viewYear, viewMonth, d);
    if (selectedDate) {
      dt.setHours(selectedDate.getHours(), selectedDate.getMinutes(), selectedDate.getSeconds());
    }
    selectedDate = dt;
    value = fmt(dt, format);
    open = false;
  }

  function selectMonth(m) {
    viewDate = new Date(viewYear, m, 1);
    view = "date";
  }

  function selectYear(y) {
    viewDate = new Date(y, viewMonth, 1);
    view = "date";
  }

  function checkMobile() {
    isMobile = window.innerWidth < 640;
  }

  // Click outside
  let wrapperEl;

  function docClick(e) {
    if (open && wrapperEl && !wrapperEl.contains(e.target)) {
      open = false;
    }
  }

  $effect(() => {
    if (open) {
      document.addEventListener("mousedown", docClick);
      document.addEventListener("touchstart", docClick);
      checkMobile();
      return () => {
        document.removeEventListener("mousedown", docClick);
        document.removeEventListener("touchstart", docClick);
      };
    }
  });

  // Init from value
  $effect(() => {
    if (value) {
      const d = parseDate(value, format);
      if (d) {
        selectedDate = d;
        viewDate = new Date(d.getFullYear(), d.getMonth(), 1);
      }
    }
  });

  // Time handlers
  function setHour(h) {
    if (!selectedDate) selectedDate = new Date();
    selectedDate = new Date(selectedDate);
    selectedDate.setHours(Math.min(23, Math.max(0, h)));
    value = fmt(selectedDate, format);
  }

  function setMinute(m) {
    if (!selectedDate) selectedDate = new Date();
    selectedDate = new Date(selectedDate);
    selectedDate.setMinutes(Math.min(59, Math.max(0, m)));
    value = fmt(selectedDate, format);
  }

  function setSecond(s) {
    if (!selectedDate) selectedDate = new Date();
    selectedDate = new Date(selectedDate);
    selectedDate.setSeconds(Math.min(59, Math.max(0, s)));
    value = fmt(selectedDate, format);
  }

  const timeEnabled = $derived(/hh|mm|ss/.test(format));
  const showHours = $derived(timeEnabled && /hh/.test(format));
  const showMinutes = $derived(timeEnabled && /mm/.test(format));
  const showSeconds = $derived(timeEnabled && /ss/.test(format));

  const currentHour = $derived(selectedDate ? selectedDate.getHours() : 0);
  const currentMinute = $derived(selectedDate ? selectedDate.getMinutes() : 0);
  const currentSecond = $derived(selectedDate ? selectedDate.getSeconds() : 0);
</script>

<div
  class="s-datepicker-wrapper {styleClass} {themeClass}"
  class:s-datepicker-open={open}
  class:focused={open}
  class:floated={floated}
  class:has-value={hasValue}
  class:disabled
  bind:this={wrapperEl}
  {...rest}
>
  {#if hasFloatingLabel}
    <label class="s-dp-floating-label" for={internalId}>{label}</label>
  {/if}
  <input
    id={internalId}
    type="text"
    readonly
    value={displayValue}
    placeholder={hasFloatingLabel ? "" : inputPlaceholder}
    {disabled}
    onfocus={() => { if (!disabled) open = true; }}
    onclick={() => { if (!disabled) open = true; }}
    role="combobox"
    aria-expanded={open}
    aria-haspopup="dialog"
  />
  <span class="s-datepicker-trigger-icon {iconClass}" aria-hidden="true">calendar_today</span>

  {#if open}
    <div
      class="s-datepicker-overlay"
      class:s-datepicker-mobile={isMobile}
      role="dialog"
      aria-modal="true"
      aria-label="Date picker"
    >
      <!-- Header -->
      <div class="s-dp-header">
        <button type="button" class="s-dp-nav-btn" onclick={prev} aria-label="Previous">&lsaquo;</button>
        <div class="s-dp-header-labels">
          {#if view === "date"}
            <button type="button" class="s-dp-header-label" onclick={() => (view = "month")}>
              {new Date(2000, viewMonth, 1).toLocaleString(locale, { month: "long" })}
            </button>
            <button type="button" class="s-dp-header-label" onclick={() => (view = "year")}>
              {viewYear}
            </button>
          {:else if view === "month"}
            <button type="button" class="s-dp-header-label s-dp-header-label-active" onclick={() => (view = "year")}>
              {viewYear}
            </button>
          {:else}
            <span class="s-dp-header-label s-dp-header-label-active">{decadeStart} &ndash; {decadeEnd}</span>
          {/if}
        </div>
        <button type="button" class="s-dp-nav-btn" onclick={next} aria-label="Next">&rsaquo;</button>
      </div>

      <!-- Date view -->
      {#if view === "date"}
        <div class="s-dp-weekdays">
          {#each weekdays as wd}
            <span class="s-dp-weekday">{wd}</span>
          {/each}
        </div>
        <div class="s-dp-days-grid">
          {#each calDays as cd}
            <button
              type="button"
              class="s-dp-day"
              class:s-dp-day-other={cd.o}
              class:s-dp-today={isToday(cd.d, cd.o)}
              class:s-dp-selected={isSelected(cd.d, cd.o)}
              class:s-dp-day-disabled={isDisabled(cd.d, cd.o)}
              onclick={() => selectDay(cd.d, cd.o)}
              disabled={cd.o || isDisabled(cd.d, cd.o)}
            >{cd.d}</button>
          {/each}
        </div>

      <!-- Month view -->
      {:else if view === "month"}
        <div class="s-dp-months-grid">
          {#each months as m, i}
            <button
              type="button"
              class="s-dp-month"
              class:s-dp-selected={selectedDate && i === selectedDate.getMonth() && viewYear === selectedDate.getFullYear()}
              onclick={() => selectMonth(i)}
            >{m}</button>
          {/each}
        </div>

      <!-- Year view (decade) -->
      {:else}
        <div class="s-dp-years-grid">
          {#each yearList as y (y)}
            <button
              type="button"
              class="s-dp-year"
              class:s-dp-selected={selectedDate && y === selectedDate.getFullYear()}
              onclick={() => selectYear(y)}
            >{y}</button>
          {/each}
        </div>
      {/if}

      <!-- Time picker -->
      {#if timeEnabled}
        <div class="s-dp-time">
          <span class="s-dp-time-label">Time</span>
          <div class="s-dp-time-inputs">
            {#if showHours}
              <input type="number" class="s-dp-time-input" min={0} max={23} value={currentHour}
                oninput={(e) => setHour(parseInt(e.target.value) || 0)} aria-label="Hour" />
              <span class="s-dp-time-sep">:</span>
            {/if}
            {#if showMinutes}
              <input type="number" class="s-dp-time-input" min={0} max={59} value={currentMinute}
                oninput={(e) => setMinute(parseInt(e.target.value) || 0)} aria-label="Minute" />
            {/if}
            {#if showSeconds}
              <span class="s-dp-time-sep">:</span>
              <input type="number" class="s-dp-time-input" min={0} max={59} value={currentSecond}
                oninput={(e) => setSecond(parseInt(e.target.value) || 0)} aria-label="Second" />
            {/if}
          </div>
        </div>
      {/if}

      <!-- Mobile done button -->
      {#if isMobile}
        <button type="button" class="s-dp-done-btn" onclick={() => (open = false)}>Done</button>
      {/if}
    </div>
  {/if}
</div>
