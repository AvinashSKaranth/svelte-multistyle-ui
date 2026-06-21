// Orchestrator: parse YAML -> validate -> emit Svelte -> write file (or stdout).
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import { validate } from "./schema.js";
import { emitPage } from "./emit.js";

/**
 * @param {object} opts
 * @param {string} opts.input
 * @param {string} [opts.output]
 * @param {string} [opts.style]
 * @param {string} [opts.theme]
 * @param {string} [opts.mode]
 * @param {boolean} [opts.dryRun]
 * @param {boolean} [opts.watch]
 */
export async function generate(opts) {
  const { input, output, style, theme, mode, dryRun, watch } = opts;

  const runOnce = () => {
    const src = fs.readFileSync(input, "utf8");
    let doc;
    try {
      doc = yaml.load(src);
    } catch (e) {
      throw new Error(`YAML parse error in ${input}:\n${e.message}`);
    }
    const { errors, warnings } = validate(doc);
    for (const w of warnings) console.error(`! ${w}`);
    if (errors.length) {
      throw new Error("Validation failed:\n" + errors.map((e) => "  - " + e).join("\n"));
    }

    const cfg = {
      style: style || doc?.style || "material",
      theme: theme || doc?.theme || "default",
      mode: mode || doc?.mode || "system",
    };

    const code = emitPage(doc, cfg);

    if (dryRun) {
      process.stdout.write(code);
      return;
    }
    fs.mkdirSync(path.dirname(output), { recursive: true });
    fs.writeFileSync(output, code, "utf8");
    console.error(`✓ Wrote ${output} (${code.length} bytes)`);
  };

  runOnce();

  if (watch) {
    let timer = null;
    fs.watch(input, () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        try {
          runOnce();
        } catch (e) {
          console.error(`✗ ${e.message}`);
        }
      }, 250);
    });
    console.error(`↻ Watching ${input} for changes (Ctrl+C to stop)`);
  }
}