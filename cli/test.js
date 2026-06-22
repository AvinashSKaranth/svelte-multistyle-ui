// Generator test suite. Run: node cli/test.js
// No test framework — plain asserts, exits non-zero on any failure.
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { compile } from "svelte/compiler";
import { registry } from "./registry.js";

const ROOT = path.resolve(import.meta.dirname, "..");
const BIN = path.join(ROOT, "cli", "bin.js");
const SAMPLE = path.join(ROOT, "cli", "fixtures", "sample.yaml");
const EXPECTED = path.join(ROOT, "cli", "fixtures", "sample.expected.svelte");
const TMP = path.join(ROOT, ".gen-tmp");

let passed = 0;
let failed = 0;

function ok(name, cond, detail = "") {
  if (cond) {
    passed++;
    console.log(`  ✓ ${name}`);
  } else {
    failed++;
    console.error(`  ✗ ${name}${detail ? " — " + detail : ""}`);
  }
}

function runCli(args) {
  try {
    const out = execSync(`node "${BIN}" ${args}`, { encoding: "utf8", stdio: "pipe" });
    return { code: 0, stdout: out, stderr: "" };
  } catch (e) {
    return { code: e.status ?? 1, stdout: e.stdout?.toString() ?? "", stderr: e.stderr?.toString() ?? "" };
  }
}

console.log("generator tests");

// 1. registry completeness --------------------------------------------------
{
  const src = fs.readFileSync(path.join(ROOT, "src", "lib", "index.js"), "utf8");
  const libNames = [...src.matchAll(/export \{ default as ([A-Za-z_]\w*) \}/g)].map((m) => m[1]);
  const regNames = Object.keys(registry);
  const missing = libNames.filter((n) => !regNames.includes(n));
  const extra = regNames.filter((n) => !libNames.includes(n));
  ok("registry covers all index.js exports", missing.length === 0 && extra.length === 0, `missing:${missing} extra:${extra}`);
  ok("registry count matches exports", libNames.length === regNames.length, `${libNames.length} vs ${regNames.length}`);
}

// 2. generate writes a real file --------------------------------------------
fs.rmSync(TMP, { recursive: true, force: true });
fs.mkdirSync(TMP, { recursive: true });
const outFile = path.join(TMP, "src", "routes", "demo", "+page.svelte");
{
  const r = runCli(`generate --input "${SAMPLE}" --output "${outFile}"`);
  ok("generate exits 0", r.code === 0, r.stderr);
  ok("output file exists at routes/demo/+page.svelte", fs.existsSync(outFile));
  const size = fs.existsSync(outFile) ? fs.statSync(outFile).size : 0;
  ok("output file non-empty", size > 0, `${size} bytes`);
}

// 3. generated content shape ------------------------------------------------
{
  const code = fs.readFileSync(outFile, "utf8");
  ok("has <script> block", code.includes("<script>") && code.includes("</script>"));
  ok("imports components from published package", code.includes('from "svelte-multistyle-ui"'));
  ok("imports onMount", code.includes('import { onMount } from "svelte"'));
  ok("does NOT import/call initMultistyleUI (layout's job)", !code.includes("initMultistyleUI"));
  ok("declares $state vars", code.includes("let username = $state(\"\")"));
  ok("emits bind:value", code.includes("bind:value={username}"));
  ok("does NOT emit mode/effect logic", !code.includes('classList.toggle("dark"'));
  ok("inline array literal for options", code.includes('options={[{value:"apple"'));
}

// 4. generated Svelte compiles ---------------------------------------------
{
  const code = fs.readFileSync(outFile, "utf8");
  try {
    const result = compile(code, { generate: "client", name: "GenPage" });
    ok("svelte compiler accepts generated page", true, `warnings: ${(result.warnings || []).length}`);
  } catch (e) {
    ok("svelte compiler accepts generated page", false, e.message);
  }
}

// 5. dry-run byte-stable vs golden -----------------------------------------
{
  const r = runCli(`generate --input "${SAMPLE}" --output dummy --dry-run`);
  const golden = fs.readFileSync(EXPECTED, "utf8");
  ok("dry-run matches golden file", r.code === 0 && r.stdout === golden, "round-trip drift");
}

// 6. compact DSL features ---------------------------------------------------
{
  const r = runCli(`generate --input "${SAMPLE}" --output dummy --dry-run`);
  ok("auto-binds Input", r.stdout.includes("bind:value={username}"));
  ok("auto-binds Select", r.stdout.includes("bind:value={selectedFruit}"));
  ok("auto-binds MultiSelect", r.stdout.includes("bind:selected={selectedHobbies}"));
  ok("converts string options", r.stdout.includes('value:"apple",label:"Apple"'));
  ok("fakes missing Table data", r.stdout.includes('name:"Alice"'));
}

// 6b. fake data injection when options / chart data are omitted ----------------
{
  const fakeOptionsYaml = path.join(TMP, "fake-options.yaml");
  fs.writeFileSync(
    fakeOptionsYaml,
    "Card:\n  - Row:\n      - Select:\n      - BarChart:\n"
  );
  const r = runCli(`generate --input "${fakeOptionsYaml}" --output dummy --dry-run`);
  ok("fakes missing options", r.stdout.includes('value:"opt1",label:"Option 1"'));
  ok("fakes missing chart data", r.stdout.includes('label:"q1"'));
}

// 7. bad inputs -------------------------------------------------------------
{
  const unknown = path.join(TMP, "unknown.yaml");
  fs.writeFileSync(unknown, "body:\n  - component: NotAComponent\n");
  const r1 = runCli(`generate --input "${unknown}" --output dummy --dry-run`);
  ok("unknown component exits non-zero", r1.code !== 0, `exit ${r1.code}`);
  ok("unknown component lists available", r1.stderr.includes("Unknown component") && r1.stderr.includes("Button"));

  const undeclared = path.join(TMP, "undeclared.yaml");
  fs.writeFileSync(undeclared, "state:\n  - { name: a, type: string, default: \"\" }\nbody:\n  - component: Input\n    bind: nope\n");
  const r2 = runCli(`generate --input "${undeclared}" --output dummy --dry-run`);
  ok("undeclared bind target exits non-zero", r2.code !== 0, `exit ${r2.code}`);
  ok("undeclared bind hints to state:", r2.stderr.includes("not declared in state:"));

  const missingInput = runCli(`generate --output dummy --dry-run`);
  ok("missing --input exits non-zero", missingInput.code !== 0);
}

// 8. CLI overrides are no longer emitted in generated script -----------------
{
  const r = runCli(`generate --input "${SAMPLE}" --output dummy --dry-run --mode dark`);
  ok("CLI override exits 0", r.code === 0, r.stderr);
  ok("mode override not emitted", !r.stdout.includes('MODE = "dark"'));
}

fs.rmSync(TMP, { recursive: true, force: true });

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
