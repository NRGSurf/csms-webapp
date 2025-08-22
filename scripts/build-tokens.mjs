// scripts/build-tokens.mjs
import fs from "node:fs";
import path from "node:path";

const TOKENS_SRC = path.resolve("design-tokens/design-tokens.json");

// ⬅ write to root-level folders, not /src
const CSS_OUT = path.resolve("styles/tokens.css");
const TS_OUT = path.resolve("theme/nrg-tokens.ts");

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}
function flatten(obj, prefix = "", out = {}) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object" && !("value" in v)) flatten(v, key, out);
    else if (v && typeof v === "object" && "value" in v) out[key] = v.value;
    else if (typeof v !== "object") out[key] = v;
  }
  return out;
}
function resolveRefs(value, flat) {
  if (typeof value !== "string") return value;
  return value.replace(/\{([^}]+)\}/g, (_, p1) => flat[p1] ?? "");
}
function toCssVarName(dotPath) {
  return `--${dotPath
    .replaceAll(".", "-")
    .replaceAll("_", "-")
    .replaceAll(/[^a-zA-Z0-9-]/g, "")
    .replace(/^global-/, "")}`;
}
function emitCss(blockName, map) {
  const lines = Object.entries(map).map(
    ([k, v]) => `  ${toCssVarName(k)}: ${v};`
  );
  return `${blockName} {\n${lines.join("\n")}\n}\n`;
}

(function build() {
  const raw = readJson(TOKENS_SRC);
  const flat = flatten(raw);
  const resolved = Object.fromEntries(
    Object.entries(flat).map(([k, v]) => [k, resolveRefs(v, flat)])
  );

  const pick = (pfx) =>
    Object.fromEntries(
      Object.entries(resolved).filter(([k]) => k.startsWith(pfx))
    );

  const globalEntries = pick("global.");
  const lightEntries = pick("light.");
  const darkEntries = pick("dark.");

  const css =
    `/* AUTO-GENERATED from design-tokens.json — do not edit */\n` +
    emitCss(":root", globalEntries) +
    emitCss('[data-theme="light"]', lightEntries) +
    emitCss('[data-theme="dark"]', darkEntries);

  fs.mkdirSync(path.dirname(CSS_OUT), { recursive: true });
  fs.writeFileSync(CSS_OUT, css, "utf-8");

  const ts =
    `// AUTO-GENERATED from design-tokens.json — do not edit\n` +
    `const tokens = ${JSON.stringify(
      { global: raw.global, light: raw.light, dark: raw.dark },
      null,
      2
    )} as const;\nexport default tokens;\n`;

  fs.mkdirSync(path.dirname(TS_OUT), { recursive: true });
  fs.writeFileSync(TS_OUT, ts, "utf-8");

  console.log("✓ Wrote styles/tokens.css and theme/nrg-tokens.ts");
})();
