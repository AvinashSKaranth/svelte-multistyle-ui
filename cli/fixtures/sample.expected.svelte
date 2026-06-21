<script>
import { onMount } from "svelte";
import { BarChart, Breadcrumb, Button, Card, Checkbox, Input, Modal, MultiSelect, Popover, Rating, Row, Select, Stepper, Table, Tabs, Textarea } from "svelte-multistyle-ui";

  let username = $state("");
  let bio = $state("Hello");
  let count = $state(0);
  let rating = $state(3);
  let agreed = $state(false);
  let tags = $state([]);
  let selectedFruit = $state("");
  let selectedTags = $state([]);
  let activeTab = $state(0);
  let modalOpen = $state(false);
  let popoverOpen = $state(false);

  const MODE = "system";
  let systemDark = $state(false);

  $effect(() => {
    if (MODE !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    systemDark = mq.matches;
    const handler = (e) => (systemDark = e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  });

  const isDarkMode = $derived(MODE === "dark" || (MODE === "system" && systemDark));

  $effect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDarkMode);
    root.classList.toggle("light", !isDarkMode);
  });

  onMount(() => {
    // TODO: add setup logic here
  });
</script>

<Card padding="md" elevated={true} class="space-y-3">
  <Row gap="16px">
    <Input label="Username" placeholder="Enter name" bind:value={username} />
    <Button preset="primary" icon="save">Save</Button>
  </Row>
  <Select label="Pick a fruit" options={[{value:"apple",label:"Apple"},{value:"banana",label:"Banana"},{value:"cherry",label:"Cherry"}]} bind:value={selectedFruit} />
  <MultiSelect label="Tags" options={[{value:"svelte",label:"Svelte"},{value:"ts",label:"TypeScript"},{value:"css",label:"CSS"}]} bind:selected={selectedTags} />
  <Rating bind:value={rating} />
  <Checkbox label="I agree to the terms" bind:checked={agreed} />
  <Textarea label="Bio" placeholder="Tell us about yourself" bind:value={bio} />
  <Tabs tabs={[{id:0,label:"Profile"},{id:1,label:"Settings"}]} bind:active={activeTab} />
  <BarChart title="Quarterly Revenue" xAxisLabel="Quarter" yAxisLabel="Revenue" downloadable={true} data={[{label:"q1",value:12},{label:"q2",value:19},{label:"q3",value:8},{label:"q4",value:15}]} />
  <Table data={[{id:1,name:"Alice",role:"Admin"},{id:2,name:"Bob",role:"User"},{id:3,name:"Cara",role:"Editor"}]} />
  <Stepper steps={[{label:"Account"},{label:"Profile"},{label:"Confirm"}]} />
  <Breadcrumb items={[{label:"Home",href:"/"},{label:"Demo",href:"/demo"}]} />
  <Button preset="primary">Open modal</Button>
  <Modal title="Hello there" bind:open={modalOpen}>
    Modal body content goes here.
  </Modal>
  <Popover position="top" bind:open={popoverOpen}>
    {#snippet children()}
      <Button variant="outlined">Hover me</Button>
    {/snippet}
    {#snippet content()}
      Popover body text
    {/snippet}
  </Popover>
</Card>
