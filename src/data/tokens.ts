// MOOUI Mobile Components — Design Tokens
// Single source of truth for the showcase site. These values are also exposed
// as CSS custom properties in src/styles/tokens.css.

export interface ColorToken {
  name: string;
  varName: string;
  value: string;
  usage: string;
}

export interface ColorGroup {
  title: string;
  description: string;
  tokens: ColorToken[];
}

export const colorGroups: ColorGroup[] = [
  {
    title: "Brand / 品牌色",
    description: "品牌主色，用于关键操作、强调与品牌识别。",
    tokens: [
      { name: "Primary", varName: "--moo-primary", value: "#2F6BFF", usage: "主按钮、链接、选中态" },
      { name: "Primary Pressed", varName: "--moo-primary-pressed", value: "#1F4FD6", usage: "主色按压态" },
      { name: "Primary Light", varName: "--moo-primary-light", value: "#EAF1FF", usage: "浅色背景、标签底色" },
      { name: "Primary Disabled", varName: "--moo-primary-disabled", value: "#A8C2FF", usage: "禁用态主色" },
    ],
  },
  {
    title: "Functional / 功能色",
    description: "用于传达状态语义：成功、警告、错误、信息。",
    tokens: [
      { name: "Success", varName: "--moo-success", value: "#13C26B", usage: "成功、完成、在线" },
      { name: "Warning", varName: "--moo-warning", value: "#FF9F0A", usage: "警告、待处理" },
      { name: "Danger", varName: "--moo-danger", value: "#F5503A", usage: "错误、删除、危险操作" },
      { name: "Info", varName: "--moo-info", value: "#1AB0E8", usage: "提示、信息" },
    ],
  },
  {
    title: "Neutral / 中性色",
    description: "文本、边框、背景与分割线的灰阶体系。",
    tokens: [
      { name: "Text Primary", varName: "--moo-text-1", value: "#1A1A1F", usage: "标题、正文主文本" },
      { name: "Text Secondary", varName: "--moo-text-2", value: "#5A5C66", usage: "次要文本、描述" },
      { name: "Text Tertiary", varName: "--moo-text-3", value: "#9498A3", usage: "占位、辅助说明" },
      { name: "Border", varName: "--moo-border", value: "#E6E8EE", usage: "分割线、边框" },
      { name: "Fill", varName: "--moo-fill", value: "#F2F3F7", usage: "卡片底、输入框底" },
      { name: "Background", varName: "--moo-bg", value: "#F7F8FA", usage: "页面背景" },
    ],
  },
];

export interface TypeToken {
  name: string;
  size: number;
  lineHeight: number;
  weight: number;
  usage: string;
}

export const typeScale: TypeToken[] = [
  { name: "Display", size: 28, lineHeight: 36, weight: 600, usage: "大标题、营销页" },
  { name: "Title 1", size: 22, lineHeight: 30, weight: 600, usage: "页面主标题" },
  { name: "Title 2", size: 18, lineHeight: 26, weight: 600, usage: "卡片 / 区块标题" },
  { name: "Body Large", size: 16, lineHeight: 24, weight: 400, usage: "正文、列表主文本" },
  { name: "Body", size: 14, lineHeight: 22, weight: 400, usage: "正文、说明文本" },
  { name: "Caption", size: 12, lineHeight: 18, weight: 400, usage: "辅助说明、标签" },
];

export interface SpaceToken {
  name: string;
  value: number;
  usage: string;
}

export const spacing: SpaceToken[] = [
  { name: "space-2", value: 2, usage: "图标与文字微间隙" },
  { name: "space-4", value: 4, usage: "紧凑元素间距" },
  { name: "space-8", value: 8, usage: "组件内默认间距" },
  { name: "space-12", value: 12, usage: "列表项内边距" },
  { name: "space-16", value: 16, usage: "页面安全边距" },
  { name: "space-24", value: 24, usage: "区块之间" },
  { name: "space-32", value: 32, usage: "大区块分隔" },
];

export interface RadiusToken {
  name: string;
  value: number;
  usage: string;
}

export const radii: RadiusToken[] = [
  { name: "radius-sm", value: 4, usage: "标签、徽标" },
  { name: "radius-md", value: 8, usage: "按钮、输入框" },
  { name: "radius-lg", value: 12, usage: "卡片、弹层" },
  { name: "radius-xl", value: 20, usage: "底部弹层、大卡片" },
  { name: "radius-full", value: 999, usage: "胶囊、头像" },
];

export interface ShadowToken {
  name: string;
  value: string;
  usage: string;
}

export const shadows: ShadowToken[] = [
  { name: "shadow-1", value: "0 1px 2px rgba(20,22,30,0.06)", usage: "卡片轻浮起" },
  { name: "shadow-2", value: "0 4px 16px rgba(20,22,30,0.10)", usage: "悬浮、下拉" },
  { name: "shadow-3", value: "0 8px 32px rgba(20,22,30,0.16)", usage: "弹窗、抽屉" },
];
