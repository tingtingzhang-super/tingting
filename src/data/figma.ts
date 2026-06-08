// Typed access to values synced from Figma via scripts/sync-figma-tokens.mjs.
// When `synced` is false the showcase falls back to the curated tokens in tokens.ts.
import generated from "./figma-tokens.generated.json";

export interface FigmaColor {
  name: string;
  hex: string;
  opacity: number;
  source: "style" | "inline";
}

export interface FigmaType {
  name: string;
  fontFamily: string | null;
  fontWeight: number | null;
  fontSize: number | null;
  lineHeight: number | string | null;
  letterSpacing: number | null;
  color: string | null;
  source: "style" | "inline";
}

export interface FigmaTokens {
  synced: boolean;
  fetchedAt: string | null;
  fileKey: string;
  nodeId: string;
  nodeName: string | null;
  counts: { colors: number; typography: number };
  colors: FigmaColor[];
  typography: FigmaType[];
}

export const figmaTokens = generated as unknown as FigmaTokens;

export const figmaFileUrl = `https://www.figma.com/design/${figmaTokens.fileKey}/MOOUI_Mobile_Components?node-id=${figmaTokens.nodeId.replace(
  ":",
  "-"
)}`;
