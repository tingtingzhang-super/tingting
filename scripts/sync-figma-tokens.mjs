#!/usr/bin/env node
/**
 * Sync design tokens from the MOOUI_Mobile_Components Figma file.
 *
 * Pulls published Color (FILL) and Text styles from the file, and additionally
 * walks the target node subtree to collect any inline colors / text styles, then
 * writes the result to src/data/figma-tokens.generated.json. The showcase site
 * automatically renders these values when `synced` is true.
 *
 * Requirements: a Figma Personal Access Token in the FIGMA_TOKEN env var.
 *   (Cursor: Cloud Agents > Secrets > FIGMA_TOKEN)
 *
 * Usage:
 *   FIGMA_TOKEN=figd_xxx node scripts/sync-figma-tokens.mjs
 *   npm run sync:figma
 */

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const FILE_KEY = process.env.FIGMA_FILE_KEY || "qBzMhUc16MW3vCvOBNT4SR";
// URL form uses a dash; the API expects a colon.
const NODE_ID = (process.env.FIGMA_NODE_ID || "65811-180757").replace("-", ":");
const TOKEN = process.env.FIGMA_TOKEN;
const OUT = resolve(__dirname, "../src/data/figma-tokens.generated.json");
const API = "https://api.figma.com/v1";

function fail(msg) {
  console.error("\n[sync-figma] " + msg + "\n");
  process.exit(1);
}

if (!TOKEN) {
  fail(
    "FIGMA_TOKEN is not set.\n" +
      "  Add a Figma Personal Access Token as a secret named FIGMA_TOKEN\n" +
      "  (Cursor: Cloud Agents > Secrets), then re-run `npm run sync:figma`.\n" +
      "  Create a token at: https://www.figma.com/developers/api#access-tokens"
  );
}

async function figma(path) {
  const res = await fetch(`${API}${path}`, {
    headers: { "X-Figma-Token": TOKEN },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    fail(`Figma API ${res.status} for ${path}\n  ${body.slice(0, 300)}`);
  }
  return res.json();
}

const round = (n) => Math.round(n);
function toHex({ r, g, b }) {
  const h = (v) =>
    Math.round(v * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${h(r)}${h(g)}${h(b)}`.toUpperCase();
}

/** Resolve a solid fill (first visible SOLID paint) to hex + opacity. */
function solidFromFills(fills) {
  if (!Array.isArray(fills)) return null;
  const paint = fills.find((f) => f.visible !== false && f.type === "SOLID");
  if (!paint || !paint.color) return null;
  const opacity = paint.opacity ?? paint.color.a ?? 1;
  // Skip fully transparent paints (invisible helper layers).
  if (opacity <= 0.01) return null;
  return { hex: toHex(paint.color), opacity: Number(opacity.toFixed(3)) };
}

function textFromStyle(s) {
  if (!s) return null;
  return {
    fontFamily: s.fontFamily ?? null,
    fontWeight: s.fontWeight ?? null,
    fontSize: s.fontSize != null ? round(s.fontSize) : null,
    lineHeight:
      s.lineHeightPx != null
        ? round(s.lineHeightPx)
        : s.lineHeightPercentFontSize != null
        ? `${round(s.lineHeightPercentFontSize)}%`
        : null,
    letterSpacing: s.letterSpacing != null ? Number(s.letterSpacing.toFixed(2)) : null,
  };
}

/** Depth-first walk collecting inline colors + text styles from a node tree. */
function walk(node, acc) {
  if (!node || typeof node !== "object") return;
  if (node.visible === false) return;
  const solid = solidFromFills(node.fills);
  if (solid && node.type !== "TEXT") {
    acc.colors.set(`${solid.hex}@${solid.opacity}`, {
      name: node.name || solid.hex,
      hex: solid.hex,
      opacity: solid.opacity,
    });
  }
  if (node.type === "TEXT" && node.style) {
    const t = textFromStyle(node.style);
    const fill = solidFromFills(node.fills);
    const key = `${t.fontSize}/${t.lineHeight}/${t.fontWeight}`;
    if (!acc.typography.has(key)) {
      acc.typography.set(key, { name: node.name || key, color: fill?.hex ?? null, ...t });
    }
  }
  const kids = node.children || [];
  for (const c of kids) walk(c, acc);
}

async function main() {
  console.log(`[sync-figma] file=${FILE_KEY} node=${NODE_ID}`);

  // 1) Published styles (the authoritative source for a design system).
  const stylesMeta = await figma(`/files/${FILE_KEY}/styles`);
  const styles = stylesMeta?.meta?.styles ?? [];
  console.log(`[sync-figma] published styles: ${styles.length}`);

  const fillStyleIds = styles.filter((s) => s.style_type === "FILL").map((s) => s.node_id);
  const textStyleIds = styles.filter((s) => s.style_type === "TEXT").map((s) => s.node_id);
  const styleNameById = new Map(styles.map((s) => [s.node_id, s.name]));

  const colors = [];
  const typography = [];

  const allStyleIds = [...fillStyleIds, ...textStyleIds];
  if (allStyleIds.length) {
    // Figma allows batching node ids; chunk to stay under URL limits.
    for (let i = 0; i < allStyleIds.length; i += 50) {
      const ids = allStyleIds.slice(i, i + 50);
      const data = await figma(`/files/${FILE_KEY}/nodes?ids=${ids.join(",")}`);
      for (const id of ids) {
        const doc = data?.nodes?.[id]?.document;
        if (!doc) continue;
        const name = styleNameById.get(id) || doc.name;
        if (fillStyleIds.includes(id)) {
          const solid = solidFromFills(doc.fills);
          if (solid) colors.push({ name, hex: solid.hex, opacity: solid.opacity, source: "style" });
        } else {
          const t = textFromStyle(doc.style);
          if (t) typography.push({ name, ...t, source: "style" });
        }
      }
    }
  }

  // 2) Walk the target node subtree for inline values (fallback / extras).
  const nodeData = await figma(`/files/${FILE_KEY}/nodes?ids=${NODE_ID}`);
  const targetDoc = nodeData?.nodes?.[NODE_ID]?.document;
  const targetName = targetDoc?.name ?? null;
  const acc = { colors: new Map(), typography: new Map() };
  if (targetDoc) walk(targetDoc, acc);

  // Merge inline finds that aren't already covered by a published style hex.
  const knownHex = new Set(colors.map((c) => c.hex));
  for (const c of acc.colors.values()) {
    if (!knownHex.has(c.hex)) {
      colors.push({ ...c, source: "inline" });
      knownHex.add(c.hex);
    }
  }
  const knownType = new Set(typography.map((t) => `${t.fontSize}/${t.lineHeight}/${t.fontWeight}`));
  for (const t of acc.typography.values()) {
    const key = `${t.fontSize}/${t.lineHeight}/${t.fontWeight}`;
    if (!knownType.has(key)) {
      typography.push({ ...t, source: "inline" });
      knownType.add(key);
    }
  }

  // Sort typography by descending font size for nicer display.
  typography.sort((a, b) => (b.fontSize ?? 0) - (a.fontSize ?? 0));

  const out = {
    synced: true,
    fetchedAt: new Date().toISOString(),
    fileKey: FILE_KEY,
    nodeId: NODE_ID,
    nodeName: targetName,
    counts: { colors: colors.length, typography: typography.length },
    colors,
    typography,
  };

  writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n");
  console.log(
    `[sync-figma] wrote ${colors.length} colors, ${typography.length} text styles -> ${OUT}`
  );
}

main().catch((e) => fail(e?.stack || String(e)));
