// Post-build: strip the content hash from SvelteKit's single bundle so the
// static output has stable filenames: bundle.js + bundle.css.
// Rewrites every .html reference and renames the files on disk.
// Run after `vite build` (chained in package.json `build` script).

import { readdir, readFile, writeFile, rename, rm } from "node:fs/promises";
import { join, dirname } from "node:path";

const OUT = "docs";
const JS_RE = /bundle\.[A-Za-z0-9_-]+\.js/g;
const CSS_RE = /bundle\.[A-Za-z0-9_-]+\.css/g;

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
    const out = src.replace(JS_RE, "bundle.js").replace(CSS_RE, "bundle.css");
    if (out !== src) await writeFile(f, out, "utf8");
  }
  return htmls.length;
}

async function renameBundles() {
  const jsFiles = await findFiles(OUT, (n) => /^bundle\.[A-Za-z0-9_-]+\.js$/.test(n));
  const cssFiles = await findFiles(OUT, (n) => /^bundle\.[A-Za-z0-9_-]+\.css$/.test(n));

  for (const f of jsFiles) {
    const target = join(dirname(f), "bundle.js");
    if (f !== target) {
      await rm(target, { force: true }); // overwrite any prior stable copy
      await rename(f, target);
    }
  }
  for (const f of cssFiles) {
    const target = join(dirname(f), "bundle.css");
    if (f !== target) {
      await rm(target, { force: true });
      await rename(f, target);
    }
  }
  return { js: jsFiles.length, css: cssFiles.length };
}

const htmlCount = await rewriteHtml();
const { js, css } = await renameBundles();
console.log(`rename-bundle: rewrote ${htmlCount} html file(s), renamed ${js} js + ${css} css → bundle.js / bundle.css`);