---
name: mooui-mobile-design-system
description: Build mobile UI that follows Futu's MOOUI mobile design system (MOOUI_Mobile_Components). Use when creating or reviewing mobile screens/components for Futu / moomoo / 富途 / 天星 style apps, when the user mentions MOOUI, MOO UI, Futu mobile design system, or asks for MOOUI-compliant buttons, cells, forms, navigation, dialogs, toasts, tags, cards, etc. Provides the real design tokens (colors, typography, spacing, radius), the full component inventory, mobile layout conventions, and usage rules.
disable-model-invocation: false
---

# MOOUI Mobile Design System (Futu / 富途)

## Overview

MOOUI is Futu's (富途 / moomoo / 天星) mobile component library. This skill encodes its
foundations and component conventions so you can build **MOOUI-compliant** mobile screens
without re-reading Figma every time.

- **Figma source of truth:** `MOOUI_Mobile_Components`
  (`https://www.figma.com/design/qBzMhUc16MW3vCvOBNT4SR/MOOUI_Mobile_Components`) — 66 pages.
- **Reference implementation in this repo:** a runnable spec/showcase site.
  - Tokens (curated baseline): `src/data/tokens.ts`, `src/styles/tokens.css`
  - Component CSS: `src/styles/mooui.css`
  - Component React impl: `src/mooui.tsx`
  - Live values synced from Figma: `src/data/figma-tokens.generated.json`
  - Re-sync script: `scripts/sync-figma-tokens.mjs` (`npm run sync:figma`, needs `FIGMA_TOKEN`)

> The token values below were extracted from the Figma file by frequency analysis. Names
> like "brand/up/down" are interpretations — when the file exposes a named style/variable
> for a token, prefer that name. Re-run `npm run sync:figma` to refresh.

## When to use

Use this skill whenever the task is to design, build, refactor, or review **mobile** UI in the
MOOUI / Futu style — buttons, cells/lists, forms, navigation bars, tab bars, dialogs, action
sheets, toasts, tags, badges, cards, steppers, loading, empty states, pickers, etc.

## Foundations

### Color

Accent palette (most-used colors across the whole library, de-duplicated by hue):

| Role (interpreted)        | Hex       | Notes |
|---------------------------|-----------|-------|
| Brand / primary accent    | `#F36F12` | 橙 — primary actions, brand emphasis (highest usage) |
| Up / positive (market)    | `#00A870` | 绿 — gains/up **or** success. ⚠️ market color is region-dependent |
| Down / negative (market)  | `#F03A55` | 红 — losses/down **or** danger/error |
| Link / info               | `#4672F6` | 蓝 — links, informational highlights |
| Extended teal             | `#00C7D9` | 青 — secondary data viz / accents |
| Extended purple           | `#A661FF` | 靛/紫 — secondary data viz / accents |

> ⚠️ **Market (涨跌) colors are configurable per region.** In HK/CN markets the default is
> often red = up / green = down; in US markets green = up / red = down. Never hardcode the
> semantic — drive it from a user/region setting. The hexes above are the palette values.

Neutrals (light → dark, with suggested usage):

| Usage              | Hex       |
|--------------------|-----------|
| Background / card  | `#FFFFFF` |
| Divider / border   | `#E8E8E8` |
| Placeholder / disabled | `#BBBDC0` |
| Secondary text     | `#909499` |
| Primary text       | `#000000` (near-black `#0F1112` / `#1D1F21` also appear) |

Page background is typically a light gray (`#F4F4F4` / `#F2F3F5`); cards/sheets are white.

### Typography

Font families by content type:

- **Chinese text:** `PingFang SC`
- **English / system text:** `SF Pro` (iOS), `MiSans`
- **Numbers / prices / display:** `BR Hendrix` (tabular figures for financial data)

Mobile type scale (size / line-height, dominant weight):

| Size | Line height | Weight | Typical use |
|------|-------------|--------|-------------|
| 24px | 28 | 400/600 | large display / hero numbers |
| 22px | 26 | 600 | page / section title |
| 20px | 28 | 600 | title |
| 18px | 21 | 600 | sub-title |
| 17px | 22 | 590 | nav title (iOS) |
| 16px | 19 | 400 | list main text |
| 15px | 18 | 400 | body |
| 14px | 19 | 400 | body / secondary |
| 13px | 15 | 400 | caption |
| 12px | 14 | 400 | caption / tags |
| 11px | 13 | 400 | tab bar label / fine print |
| 10px | 14 | 400 | smallest label |

Use **tabular/lining figures (BR Hendrix)** for prices, P&L, and any aligned numeric columns.

### Spacing, radius, elevation (recommended baseline — 4px grid)

- **Spacing:** 2 / 4 / 8 / 12 / 16 / 24 / 32. Page safe margin = **16px**.
- **Radius:** sm 4 (tag/badge) · md 8 (button/input) · lg 12 (card/popup) · xl 20 (bottom sheet) · full (pill/avatar).
- **Elevation:** card `0 1px 2px rgba(0,0,0,.06)`; popover/dropdown `0 4px 16px rgba(0,0,0,.10)`; dialog/sheet `0 8px 32px rgba(0,0,0,.16)`.

## Mobile layout conventions

- **Touch target ≥ 44×44px** (Apple HIG); list rows ≥ 52px tall.
- **Navigation bar:** 44px tall (excl. status bar); centered title (17px / 600); back button left.
- **Bottom tab bar:** 49px tall (excl. home-indicator safe area); 3–5 items; 24px icons; 11px labels; active item uses brand accent.
- Respect **safe areas** (status bar, notch, home indicator) — add bottom inset padding for fixed footers/tab bars.
- One **primary** button per action area; full-width primary button for form submit / bottom CTA.

## Component inventory

MOOUI groups components into the following families (✅ = shipped in the library). Build new
components to fit these existing patterns rather than inventing new ones.

**导航和菜单 Navigation & Menu:** 导航栏 Navigation Bar, 选项卡 Tab, 标题 Title, 底部导航栏 Bottom Navbar

**呈现方式 Presentation / Feedback:** 弹层 Poplist, 活动列表 ActionSheet, 活动视图 ActivityView, 对话框 Dialog, 广告 Banner, 标签 Tags, 空状态 Empty, 指示器 Indicator, 气泡 Popover, 编辑 Editing, 加载态 Loading, 反馈 Toast, 红点 Badge, 公告栏 Notice Bar, 分享 Share, 进度条 Progress bar, 图片预览 ImagePreviewer, 步骤条 Steps

**操作和输入 Action & Input:** 按钮 Button, 复选框 Checkbox, 单选框 Radio, 开关 Switch, 滑杆 Slider, 筛选 Filter, 日历&选择器 Calendar & Picker, 输入框 Input, 基础搜索框 Basic Search, 密码输入框 Password Input, 索引器 Indexes, 上传 Upload, 设置列表 Setting, 下拉框 Drop-down

**布局和组织 Layout & Organization:** AI 卡片, 数据表单 Data Form, 信息表单 Information Form, 卡片 Card, 金刚区 Entrance (icon grid), 数据列表 DataList, 时间轴 Timeline, 摘要数据 Statistic, 底部合规文案 Compliance, 图文列表, 比例条 (ratio bar), 信息条, 搜索页面 Search Page, 图表 Chart

**系统体验 System:** 键盘 Keyboard, 状态栏 Status bar

**天星 / moomoo 合集:** 级联选择 Cascader

### Key component specs

**Button** — types: primary (filled brand `#F36F12`), secondary (tinted), ghost (white + border),
danger (`#F03A55`), text. Sizes: lg 48 / md 40 / sm 30 (height px). Radius 8 (sm 4). Font 16/14/13,
weight 600. Disabled = lightened brand. Full-width for primary CTAs.

**Cell / Setting list** — row ≥ 52px, padding 14×16, optional 28px leading icon, title 15px,
sub-label 12px (`#909499`), right value + chevron `›`. Group with 12px radius container; hairline
dividers `#E8E8E8` between rows (not first/last).

**Input** — height 44, radius 8, border `#E8E8E8`; focus = brand border + light ring; error border
`#F03A55`. Includes Basic Search and Password Input variants.

**Tag** — height 22, font 12/600, radius 4 (or full for pill), tinted backgrounds per accent.
**Badge** — number badge 18px tall (99+ overflow); dot badge 8px.

**Dialog** — width 280, radius 12, centered title 17 + body 14 (`#909499`), 1–2 actions split by
hairline; confirm action in brand color.
**ActionSheet** — bottom sheet, radius xl(20) top corners, grouped options + cancel.
**Toast** — non-blocking, dark pill `rgba(20,22,30,.86)`, auto-dismiss 1.5–3s.
**Loading** — brand spinner; **Empty** — illustration + caption + optional action.

**Card** — radius 12, white, shadow-1; optional cover/header/body. **Avatar** — 32/44/56, circle or square(8).
**Steps** — numbered/checked nodes connected by a track in brand color.

## Authoring guidelines

**Do**
- Use design tokens (the hexes/sizes above), never ad-hoc colors or font sizes.
- Keep one primary button per screen region; use brand `#F36F12` for the main CTA.
- Drive market up/down colors from region settings, not hardcoded semantics.
- Use BR Hendrix tabular figures for prices and numeric columns; align decimals.
- Respect ≥44px touch targets and device safe areas.

**Don't**
- Don't introduce new accent hues outside the palette.
- Don't put >5 items in the bottom tab bar.
- Don't stack >2 text lines in a single cell row.
- Don't assume red=loss / green=gain globally (region-dependent).

## Extending / refreshing tokens

To re-pull exact values from Figma:

```bash
FIGMA_TOKEN=figd_xxx npm run sync:figma          # whole file
FIGMA_TOKEN=figd_xxx FIGMA_SCOPE=node FIGMA_NODE_ID=<id> npm run sync:figma  # one node
```

Output → `src/data/figma-tokens.generated.json` (accents, neutrals, type scale, raw colors).
Prefer published Figma styles/variables when present; otherwise rely on the frequency-derived
values documented here.
