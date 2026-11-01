// Runs after `vite build` and `vite build --ssr`: inserts the pre-rendered homepage HTML
// into dist/index.html so the published page contains its full text before JavaScript runs.
import { readFile, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const htmlPath = path.join(root, "dist", "index.html");
const { render } = await import(pathToFileURL(path.join(root, "dist-ssr", "prerender.js")).href);

const html = await readFile(htmlPath, "utf8");
const marker = '<div id="root"></div>';
if (!html.includes(marker)) throw new Error(`prerender: ${marker} not found in dist/index.html`);

const app = render();
await writeFile(htmlPath, html.replace(marker, `<div id="root">${app}</div>`));
console.log(
  `prerender: wrote ${Math.round(app.length / 1024)} KB of homepage HTML into dist/index.html`,
);
