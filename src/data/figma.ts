// Typed access to values synced from Figma via scripts/sync-figma-tokens.mjs.
// When `synced` is false the showcase falls back to the curated tokens in tokens.ts.
import generated from "./figma-tokens.generated.json";

export interface FigmaColor {
  name: string;
  hex: string;
  opacity: number;
  count: number;
  source: "style" | "inline" | "file";
}

export interface FigmaType {
  name: string;
  fontFamily: string | null;
  fontWeight: number | null;
  fontSize: number | null;
  lineHeight: number | string | null;
  letterSpacing: number | null;
  color: string | null;
  count: number;
  source: "style" | "inline" | "file";
}

export interface SemanticColor {
  role: string;
  hex: string;
  count: number;
}
export interface NeutralColor extends SemanticColor {
  name: string;
  lightness: number;
}
export interface TypeScaleItem {
  fontSize: number;
  lineHeight: number | string | null;
  fontWeight: number | null;
  fontFamily: string | null;
  sampleName: string;
  count: number;
}
export interface Semantic {
  brand: SemanticColor[];
  functional: SemanticColor[];
  neutral: NeutralColor[];
  typeScale: TypeScaleItem[];
}

export interface FigmaTokens {
  synced: boolean;
  fetchedAt: string | null;
  fileKey: string;
  scope?: "file" | "node";
  nodeId: string;
  scopeName?: string | null;
  nodeName?: string | null;
  pages?: string[];
  counts: { colors: number; typography: number; pages?: number };
  semantic?: Semantic;
  colors: FigmaColor[];
  typography: FigmaType[];
}

export const figmaTokens = generated as unknown as FigmaTokens;

const emptySemantic: Semantic = { brand: [], functional: [], neutral: [], typeScale: [] };
export const semantic: Semantic = figmaTokens.semantic ?? emptySemantic;

export const figmaFileUrl = `https://www.figma.com/design/${figmaTokens.fileKey}/MOOUI_Mobile_Components?node-id=${figmaTokens.nodeId.replace(
  ":",
  "-"
)}`;
