// Post-build: relocate SvelteKit's single bundle next to index.html with
// stable, hosting-friendly names: docs/script.js + docs/style.css.
// Rewrites every .html reference and removes the now-empty _app/ tree.
// Run after `vite build` (chained in package.json `build` script).

import { readdir, readFile, writeFile, rename, rm } from "node:fs/promises";
import { join } from "node:path";

const OUT = "docs";
const JS_REF_RE = /[^"']*bundle\.[A-Za-z0-9_-]+\.js/g;
const CSS_REF_RE = /[^"']*bundle\.[A-Za-z0-9_-]+\.css/g;
const JS_FILE_RE = /^bundle\.[A-Za-z0-9_-]+\.js$/;
const CSS_FILE_RE = /^bundle\.[A-Za-z0-9_-]+\.css$/;

/** Recursively collect files under dir matching a predicate. */
async function findFiles(dir, match, acc = []) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return acc;
  }
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) await findFiles(full, match, acc);
    else if (match(e.name)) acc.push(full);
  }
  return acc;
}

async function rewriteHtml() {
  const htmls = await findFiles(OUT, (n) => n.endsWith(".html"));
  for (const f of htmls) {
    const src = await readFile(f, "utf8");
    const out = src
      .replace(JS_REF_RE, "./script.js")
      .replace(CSS_REF_RE, "./style.css");
    if (out !== src) await writeFile(f, out, "utf8");
  }
  return htmls.length;
}

async function moveBundles() {
  const jsFiles = await findFiles(OUT, (n) => JS_FILE_RE.test(n));
  const cssFiles = await findFiles(OUT, (n) => CSS_FILE_RE.test(n));

  const jsTarget = join(OUT, "script.js");
  const cssTarget = join(OUT, "style.css");
  await rm(jsTarget, { force: true });
  await rm(cssTarget, { force: true });

  for (const f of jsFiles) await rename(f, jsTarget);
  for (const f of cssFiles) await rename(f, cssTarget);

  return { js: jsFiles.length, css: cssFiles.length };
}

async function cleanup() {
  // _app/ now holds only version.json + empty dirs after the bundles move.
  await rm(join(OUT, "_app"), { recursive: true, force: true });
}

const htmlCount = await rewriteHtml();
const { js, css } = await moveBundles();
await cleanup();
console.log(
  `rename-bundle: rewrote ${htmlCount} html file(s), moved ${js} js + ${css} css → docs/script.js + docs/style.css, removed _app/`
);