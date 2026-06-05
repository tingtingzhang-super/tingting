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
src/
  data/tokens.ts        设计 Token（颜色/字阶/间距/圆角/投影）单一数据源
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

## 与 Figma 精确同步（可选）

当前数值来源于命名与通用移动端规范。如需与 Figma 源文件逐像素同步，可在云端环境配置 `FIGMA_TOKEN`（Figma Personal Access Token），即可通过 Figma REST API 拉取节点 `65811-180757` 的精确颜色、字号与间距并回填到 `src/data/tokens.ts`。
