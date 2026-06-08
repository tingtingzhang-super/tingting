import { Link } from "react-router-dom";
import { Callout, SyncBadge } from "../components/Doc";
import { figmaTokens } from "../data/figma";

const features = [
  { to: "/foundations/colors", icon: "🎨", title: "颜色", desc: "品牌 / 功能 / 中性色体系" },
  { to: "/foundations/typography", icon: "🔤", title: "文字", desc: "6 级字阶，4px 基线" },
  { to: "/foundations/spacing", icon: "📐", title: "间距圆角", desc: "4px 间距梯度与 5 级圆角" },
  { to: "/foundations/elevation", icon: "🌫️", title: "投影", desc: "三级阴影层级" },
  { to: "/components/button", icon: "🔘", title: "按钮", desc: "5 类型 × 3 尺寸" },
  { to: "/components/cell", icon: "📋", title: "单元格", desc: "列表与设置项容器" },
  { to: "/components/form", icon: "✍️", title: "表单", desc: "输入 / 开关 / 选择" },
  { to: "/components/navigation", icon: "🧭", title: "导航", desc: "NavBar / TabBar / Tabs" },
  { to: "/components/feedback", icon: "💬", title: "反馈", desc: "Toast / Dialog / Loading" },
  { to: "/components/display", icon: "🖼️", title: "展示", desc: "Card / Avatar / Stepper" },
];

export function Overview() {
  return (
    <div className="page">
      <div className="hero">
        <h1 className="hero__title">MOOUI · Mobile Components</h1>
        <p className="hero__desc">
          一套面向移动端的组件库设计规范。本站点以可交互的方式系统化展示 MOOUI
          的基础规范（颜色、文字、间距、投影）与核心组件的用法、规格与设计指南。
        </p>
        <div className="hero__stats">
          <div className="hero__stat">
            <b>4</b>
            <span>基础规范</span>
          </div>
          <div className="hero__stat">
            <b>20+</b>
            <span>核心组件</span>
          </div>
          <div className="hero__stat">
            <b>100%</b>
            <span>Token 驱动</span>
          </div>
        </div>
      </div>

      <div style={{ margin: "20px 0 0" }}>
        <SyncBadge synced={figmaTokens.synced} />
      </div>
      <Callout>
        {figmaTokens.synced ? (
          <span>
            <b>已与 Figma 同步：</b> 已扫描源文件{" "}
            <code>MOOUI_Mobile_Components</code>
            {figmaTokens.scope === "file"
              ? ` 全库 ${figmaTokens.counts.pages ?? "?"} 个页面`
              : ` 节点 ${figmaTokens.nodeId}`}
            ，提取 {figmaTokens.counts.colors} 个颜色、{figmaTokens.counts.typography}{" "}
            个文本样式，并自动归类出品牌色、功能色、中性色与字阶。详见「颜色」「文字」页面。
          </span>
        ) : (
          <span>
            <b>关于本站：</b> 当前展示的是基于 Figma 文件{" "}
            <code>MOOUI_Mobile_Components</code> 命名与移动端通用规范整理的默认数值。要与源文件逐像素对齐，请配置{" "}
            <code>FIGMA_TOKEN</code> 后运行 <code>npm run sync:figma</code>，颜色 / 文字将自动回填。
          </span>
        )}
      </Callout>

      <h2 className="section__title" style={{ marginTop: 36 }}>
        快速导航
      </h2>
      <p className="section__hint">点击卡片进入对应规范页面。</p>
      <div className="feature-grid">
        {features.map((f) => (
          <Link className="feature" to={f.to} key={f.to}>
            <div className="feature__icon">{f.icon}</div>
            <div className="feature__title">{f.title}</div>
            <div className="feature__desc">{f.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
