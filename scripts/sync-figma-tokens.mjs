#!/usr/bin/env node
/**
 * Sync design tokens from the MOOUI_Mobile_Components Figma file.
 *
 * Scope:
 *   - Default: traverses the WHOLE file (every page/canvas) and collects all
 *     solid colors and text styles with usage counts.
 *   - Set FIGMA_SCOPE=node (with FIGMA_NODE_ID) to limit to a single node subtree.
 *
 * It then derives a semantic token system (brand / functional / neutral colors
 * and a type scale) from the raw values and writes everything to
 * src/data/figma-tokens.generated.json. The showcase site renders these when
 * `synced` is true.
 *
 * Requirements: a Figma Personal Access Token in FIGMA_TOKEN.
 *   (Cursor: Cloud Agents > Secrets > FIGMA_TOKEN)
 *
 * Usage:
 *   FIGMA_TOKEN=figd_xxx npm run sync:figma                  # whole file
 *   FIGMA_TOKEN=figd_xxx FIGMA_SCOPE=node npm run sync:figma  # single node
 */

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const FILE_KEY = process.env.FIGMA_FILE_KEY || "qBzMhUc16MW3vCvOBNT4SR";
const NODE_ID = (process.env.FIGMA_NODE_ID || "65811-180757").replace("-", ":");
const SCOPE = (process.env.FIGMA_SCOPE || "file").toLowerCase(); // "file" | "node"
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
  const res = await fetch(`${API}${path}`, { headers: { "X-Figma-Token": TOKEN } });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    fail(`Figma API ${res.status} for ${path}\n  ${body.slice(0, 300)}`);
  }
  return res.json();
}

/* ---------------- color helpers ---------------- */
const h2 = (v) => Math.round(v * 255).toString(16).padStart(2, "0");
const toHex = ({ r, g, b }) => `#${h2(r)}${h2(g)}${h2(b)}`.toUpperCase();

function hexToRgb(hex) {
  const n = hex.replace("#", "");
  return {
    r: parseInt(n.slice(0, 2), 16),
    g: parseInt(n.slice(2, 4), 16),
    b: parseInt(n.slice(4, 6), 16),
  };
}
function rgbToHsl({ r, g, b }) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  const d = max - min;
  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
    }
    h *= 60;
  }
  return { h: Math.round(h), s: +s.toFixed(3), l: +l.toFixed(3) };
}

function solidFromFills(fills) {
  if (!Array.isArray(fills)) return null;
  const paint = fills.find((f) => f.visible !== false && f.type === "SOLID");
  if (!paint || !paint.color) return null;
  const opacity = paint.opacity ?? paint.color.a ?? 1;
  if (opacity <= 0.01) return null;
  return { hex: toHex(paint.color), opacity: +opacity.toFixed(3) };
}

const round = (n) => Math.round(n);
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
    letterSpacing: s.letterSpacing != null ? +s.letterSpacing.toFixed(2) : null,
  };
}

/* ---------------- traversal ---------------- */
function walk(node, acc) {
  if (!node || typeof node !== "object" || node.visible === false) return;

  const solid = solidFromFills(node.fills);
  if (solid && node.type !== "TEXT") {
    const key = `${solid.hex}@${solid.opacity}`;
    const prev = acc.colors.get(key);
    if (prev) prev.count++;
    else acc.colors.set(key, { name: node.name || solid.hex, ...solid, count: 1 });
  }

  if (node.type === "TEXT" && node.style && node.style.fontSize) {
    const t = textFromStyle(node.style);
    const fill = solidFromFills(node.fills);
    const key = `${t.fontFamily}/${t.fontSize}/${t.lineHeight}/${t.fontWeight}`;
    const prev = acc.typography.get(key);
    if (prev) prev.count++;
    else
      acc.typography.set(key, {
        name: node.name || key,
        color: fill?.hex ?? null,
        count: 1,
        ...t,
      });
  }

  for (const c of node.children || []) walk(c, acc);
}

/* ---------------- semantic derivation ---------------- */
function hueBucket(h) {
  if (h <= 18 || h >= 345) return "danger";
  if (h <= 50) return "warning";
  if (h >= 95 && h <= 160) return "success";
  if (h >= 175 && h <= 265) return "info";
  return "other";
}

function deriveSemantic(colors, typography) {
  // Merge by hex (ignore opacity) so the same color isn't split across variants.
  const byHex = new Map();
  for (const c of colors) {
    const prev = byHex.get(c.hex);
    if (prev) prev.count += c.count;
    else byHex.set(c.hex, { name: c.name, hex: c.hex, count: c.count });
  }
  const enriched = [...byHex.values()].map((c) => ({ ...c, hsl: rgbToHsl(hexToRgb(c.hex)) }));

  // A color is "chromatic" only if it has real saturation and is not near
  // white/black (those read as neutrals regardless of computed hue).
  const isChromatic = (c) => c.hsl.s >= 0.2 && c.hsl.l >= 0.18 && c.hsl.l <= 0.85;
  const neutral = enriched.filter((c) => !isChromatic(c));
  const chromatic = enriched.filter(isChromatic);

  // Neutrals sorted light -> dark, with a suggested role.
  neutral.sort((a, b) => b.hsl.l - a.hsl.l);
  const neutralRole = (l) => {
    if (l >= 0.96) return "background / surface";
    if (l >= 0.88) return "fill / divider";
    if (l >= 0.6) return "text tertiary";
    if (l >= 0.4) return "text secondary";
    return "text primary";
  };
  // One representative per role band, choosing the most-used.
  const roleBest = new Map();
  for (const c of neutral) {
    const role = neutralRole(c.hsl.l);
    const cur = roleBest.get(role);
    if (!cur || c.count > cur.count) roleBest.set(role, c);
  }
  const neutralTokens = [...roleBest.values()]
    .sort((a, b) => b.hsl.l - a.hsl.l)
    .map((c) => ({
      role: neutralRole(c.hsl.l),
      name: c.name,
      hex: c.hex,
      lightness: c.hsl.l,
      count: c.count,
    }));

  const byCount = [...chromatic].sort((a, b) => b.count - a.count);

  // Brand = most-used chromatic; secondary = next most-used of a distant hue.
  const brand = [];
  const brandPick = byCount[0] || null;
  if (brandPick) brand.push({ role: "primary", hex: brandPick.hex, count: brandPick.count });
  const secondary = byCount.find(
    (c) =>
      brandPick &&
      Math.min(
        Math.abs(c.hsl.h - brandPick.hsl.h),
        360 - Math.abs(c.hsl.h - brandPick.hsl.h)
      ) > 40
  );
  if (secondary) brand.push({ role: "secondary", hex: secondary.hex, count: secondary.count });

  // Functional = most-used chromatic per hue bucket.
  const buckets = { success: null, warning: null, danger: null, info: null };
  for (const c of byCount) {
    const b = hueBucket(c.hsl.h);
    if (b in buckets && !buckets[b]) buckets[b] = c;
  }
  const functional = Object.entries(buckets)
    .filter(([, c]) => c)
    .map(([role, c]) => ({ role, hex: c.hex, count: c.count }));

  // Type scale: realistic mobile range only, most-used entry per size.
  const bySize = new Map();
  for (const t of typography) {
    if (t.fontSize == null || t.fontSize < 10 || t.fontSize > 44) continue;
    const cur = bySize.get(t.fontSize);
    if (!cur || t.count > cur.count) bySize.set(t.fontSize, t);
  }
  const typeScale = [...bySize.values()]
    .sort((a, b) => b.fontSize - a.fontSize)
    .map((t) => ({
      fontSize: t.fontSize,
      lineHeight: t.lineHeight,
      fontWeight: t.fontWeight,
      fontFamily: t.fontFamily,
      sampleName: t.name,
      count: t.count,
    }));

  return { brand, functional, neutral: neutralTokens, typeScale };
}

/* ---------------- main ---------------- */
async function main() {
  console.log(`[sync-figma] file=${FILE_KEY} scope=${SCOPE}`);
  const acc = { colors: new Map(), typography: new Map() };
  let scopeName = null;
  let pages = [];

  if (SCOPE === "node") {
    const data = await figma(`/files/${FILE_KEY}/nodes?ids=${NODE_ID}`);
    const doc = data?.nodes?.[NODE_ID]?.document;
    scopeName = doc?.name ?? null;
    if (doc) walk(doc, acc);
    console.log(`[sync-figma] node "${scopeName}" walked`);
  } else {
    const file = await figma(`/files/${FILE_KEY}`);
    scopeName = file?.name ?? null;
    const canvases = file?.document?.children ?? [];
    pages = canvases.map((c) => c.name);
    console.log(`[sync-figma] pages: ${pages.length}`);
    for (const canvas of canvases) walk(canvas, acc);
  }

  const colors = [...acc.colors.values()].sort((a, b) => b.count - a.count);
  const typography = [...acc.typography.values()].sort((a, b) => b.count - a.count);
  const semantic = deriveSemantic(colors, typography);

  const out = {
    synced: true,
    fetchedAt: new Date().toISOString(),
    fileKey: FILE_KEY,
    scope: SCOPE,
    nodeId: NODE_ID,
    scopeName,
    pages,
    counts: {
      colors: colors.length,
      typography: typography.length,
      pages: pages.length,
    },
    semantic,
    // Cap raw lists for a reasonable bundle size; sorted by usage.
    colors: colors.slice(0, 80).map((c) => ({
      name: c.name,
      hex: c.hex,
      opacity: c.opacity,
      count: c.count,
      source: SCOPE === "node" ? "inline" : "file",
    })),
    typography: typography.slice(0, 60).map((t) => ({
      name: t.name,
      fontFamily: t.fontFamily,
      fontWeight: t.fontWeight,
      fontSize: t.fontSize,
      lineHeight: t.lineHeight,
      letterSpacing: t.letterSpacing,
      color: t.color,
      count: t.count,
      source: SCOPE === "node" ? "inline" : "file",
    })),
  };

  writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n");
  console.log(
    `[sync-figma] colors=${colors.length} text=${typography.length} ` +
      `brand=${semantic.brand.length} functional=${semantic.functional.length} ` +
      `neutral=${semantic.neutral.length} typeScale=${semantic.typeScale.length}`
  );
  console.log(`[sync-figma] wrote -> ${OUT}`);
}

main().catch((e) => fail(e?.stack || String(e)));
