import React from "react";
import { Overview } from "./pages/Overview";
import {
  Colors,
  Typography,
  Spacing,
  Elevation,
  Iconography,
} from "./pages/Foundations";
import {
  ButtonPage,
  CellPage,
  FormPage,
  TagBadgePage,
  NavigationPage,
  FeedbackPage,
  DisplayPage,
} from "./pages/Components";

export interface NavItem {
  path: string;
  label: string;
  element: React.ComponentType;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const navGroups: NavGroup[] = [
  {
    title: "开始",
    items: [{ path: "/", label: "概览 Overview", element: Overview }],
  },
  {
    title: "基础规范 Foundations",
    items: [
      { path: "/foundations/colors", label: "颜色 Color", element: Colors },
      { path: "/foundations/typography", label: "文字 Typography", element: Typography },
      { path: "/foundations/spacing", label: "间距圆角 Spacing", element: Spacing },
      { path: "/foundations/elevation", label: "投影 Elevation", element: Elevation },
      { path: "/foundations/icons", label: "图标 Iconography", element: Iconography },
    ],
  },
  {
    title: "组件 Components",
    items: [
      { path: "/components/button", label: "按钮 Button", element: ButtonPage },
      { path: "/components/cell", label: "单元格 Cell", element: CellPage },
      { path: "/components/form", label: "表单 Form", element: FormPage },
      { path: "/components/tag", label: "标签徽标 Tag & Badge", element: TagBadgePage },
      { path: "/components/navigation", label: "导航 Navigation", element: NavigationPage },
      { path: "/components/feedback", label: "反馈 Feedback", element: FeedbackPage },
      { path: "/components/display", label: "展示 Display", element: DisplayPage },
    ],
  },
];

export const allItems: NavItem[] = navGroups.flatMap((g) => g.items);
