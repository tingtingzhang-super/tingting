# MOOUI · Mobile Components — 设计规范展示站

一个用于系统化展示 **MOOUI 移动端组件库** 设计规范的前端网站。站点以可交互的方式呈现基础规范（颜色、文字、间距、投影、图标）与核心组件（按钮、单元格、表单、标签徽标、导航、反馈、展示）的用法、规格参数与设计指南。

> 内容依据 Figma 文件 `MOOUI_Mobile_Components`
> (<https://www.figma.com/design/qBzMhUc16MW3vCvOBNT4SR/MOOUI_Mobile_Components>)
> 的命名与移动端通用规范整理而成。

## 技术栈

- Vite 5 + React 18 + TypeScript
- React Router（HashRouter，便于静态托管）
- 纯 CSS + 设计 Token（CSS 变量），无 UI 框架依赖

## 本地开发

```bash
npm install
npm run dev      # 启动开发服务器
npm run build    # 类型检查 + 生产构建（输出 dist/）
npm run preview  # 预览生产构建
```

## 目录结构

```
scripts/
  sync-figma-tokens.mjs 通过 Figma REST API 同步颜色/文字到生成文件
src/
  data/
    tokens.ts                   设计 Token（颜色/字阶/间距/圆角/投影）单一数据源
    figma.ts                    生成数据的类型化读取层
    figma-tokens.generated.json 同步脚本写入的真实数值（默认占位）
  styles/
    tokens.css          Token 对应的 CSS 变量
    mooui.css           MOOUI 组件样式（.moo- 前缀）
    global.css          站点外观（侧边栏、内容区、展示卡片等）
  mooui.tsx             MOOUI 组件的 React 实现（用于实时预览）
  components/
    Doc.tsx             文档辅助组件（标题/区块/规格表/指南/提示）
    Phone.tsx           手机外壳预览容器
  pages/
    Overview.tsx        概览首页
    Foundations.tsx     颜色 / 文字 / 间距圆角 / 投影 / 图标
    Components.tsx      按钮 / 单元格 / 表单 / 标签徽标 / 导航 / 反馈 / 展示
  nav.ts                导航与路由配置
  App.tsx               应用骨架（侧边栏 + 顶栏 + 路由）
```

## 站点内容

- **基础规范 Foundations**：颜色体系（品牌/功能/中性）、6 级字阶、4px 间距梯度、5 级圆角、3 级阴影、图标网格。
- **组件 Components**：每个组件包含「实时预览 + 规格表 + 使用指南（推荐 / 避免）」，部分组件在手机外壳中以真实场景展示。

## 与 Figma 精确同步

站点支持从 Figma 源文件自动拉取真实的颜色与文字样式：

1. 在 [Figma](https://www.figma.com/developers/api#access-tokens) 生成一个 Personal Access Token。
2. 将其配置为名为 `FIGMA_TOKEN` 的密钥（Cursor：Cloud Agents > Secrets）；本地可直接用环境变量。
3. 运行同步命令：

```bash
npm run sync:figma
# 或自定义文件 / 节点：
FIGMA_TOKEN=figd_xxx FIGMA_FILE_KEY=qBzMhUc16MW3vCvOBNT4SR FIGMA_NODE_ID=65811-180757 npm run sync:figma
```

脚本（`scripts/sync-figma-tokens.mjs`）会：

- 通过 Figma REST API 读取文件的**已发布颜色 / 文字样式**；
- 额外遍历目标节点 `65811-180757` 子树，收集内联颜色与文本样式作为补充；
- 将结果写入 `src/data/figma-tokens.generated.json`。

写入后，`synced` 变为 `true`，站点的「概览 / 颜色 / 文字」页面会自动显示「已与 Figma 同步」徽标并渲染来自源文件的真实数值（含来源、不透明度、字号/行高/字重）。未配置 token 时则回退到 `src/data/tokens.ts` 中的默认规范，并显示「未同步」徽标。

> 说明：本仓库中的生成文件初始为占位（`synced: false`），因为当前云端环境尚未配置 `FIGMA_TOKEN`。配置后运行一次同步命令即可完成对齐。
