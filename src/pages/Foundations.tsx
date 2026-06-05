import { PageHead, Section, Callout } from "../components/Doc";
import {
  colorGroups,
  typeScale,
  spacing,
  radii,
  shadows,
} from "../data/tokens";

export function Colors() {
  return (
    <div className="page">
      <PageHead
        kicker="Foundations · 基础规范"
        title="颜色 Color"
        desc="MOOUI 颜色体系由品牌色、功能色与中性色三部分组成。所有颜色均以 CSS 变量形式提供，确保跨平台一致性与可主题化能力。"
      />
      {colorGroups.map((g) => (
        <Section key={g.title} title={g.title} hint={g.description}>
          <div className="grid grid--3">
            {g.tokens.map((t) => (
              <div className="swatch" key={t.varName}>
                <div className="swatch__chip" style={{ background: t.value }} />
                <div className="swatch__body">
                  <div className="swatch__name">{t.name}</div>
                  <div className="swatch__hex">{t.value}</div>
                  <div className="swatch__hex">{t.varName}</div>
                  <div className="swatch__usage">{t.usage}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      ))}
      <Callout>
        <span>
          <b>无障碍对比度：</b> 正文文本与背景对比度不低于 <code>4.5:1</code>，大号文本不低于{" "}
          <code>3:1</code>。品牌主色 <code>#2F6BFF</code> 在白底上用于 14px 以上的强调文字。
        </span>
      </Callout>
    </div>
  );
}

export function Typography() {
  return (
    <div className="page">
      <PageHead
        kicker="Foundations · 基础规范"
        title="文字 Typography"
        desc="字阶基于 4px 基线网格构建，覆盖从大标题到辅助说明的 6 个层级。中文使用 PingFang SC，英文/数字使用 SF Pro / system-ui。"
      />
      <Section title="字阶 Type Scale">
        <div className="card" style={{ padding: "8px 4px" }}>
          {typeScale.map((t) => (
            <div
              key={t.name}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 24,
                padding: "16px 20px",
                borderBottom: "1px solid var(--doc-line)",
              }}
            >
              <div style={{ width: 96, color: "var(--doc-muted)", fontSize: 13 }}>
                {t.name}
              </div>
              <div
                style={{
                  flex: 1,
                  fontSize: t.size,
                  lineHeight: `${t.lineHeight}px`,
                  fontWeight: t.weight,
                }}
              >
                MOOUI 移动组件 Aa
              </div>
              <div
                style={{
                  color: "var(--doc-muted)",
                  fontSize: 12,
                  fontFamily: "monospace",
                  textAlign: "right",
                  width: 200,
                }}
              >
                {t.size}/{t.lineHeight} · w{t.weight}
                <br />
                {t.usage}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

export function Spacing() {
  const maxBar = 32;
  return (
    <div className="page">
      <PageHead
        kicker="Foundations · 基础规范"
        title="间距与圆角 Spacing & Radius"
        desc="间距系统采用 4px 基线，确保布局节奏统一。圆角分为 5 级，从标签到底部弹层逐级递增。"
      />
      <Section title="间距 Spacing" hint="组件内外间距均从下列梯度中取值。">
        <div className="card" style={{ padding: "8px 4px" }}>
          {spacing.map((s) => (
            <div
              key={s.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                padding: "12px 20px",
                borderBottom: "1px solid var(--doc-line)",
              }}
            >
              <code style={{ width: 90 }}>{s.name}</code>
              <div
                style={{
                  height: 16,
                  width: (s.value / maxBar) * 220,
                  background: "linear-gradient(90deg,#6c7bff,#2f6bff)",
                  borderRadius: 4,
                }}
              />
              <span style={{ width: 48, fontSize: 13 }}>{s.value}px</span>
              <span style={{ color: "var(--doc-muted)", fontSize: 13 }}>{s.usage}</span>
            </div>
          ))}
        </div>
      </Section>
      <Section title="圆角 Radius">
        <div className="grid grid--4">
          {radii.map((r) => (
            <div className="swatch" key={r.name}>
              <div
                style={{
                  height: 70,
                  margin: 14,
                  background: "var(--moo-primary-light)",
                  border: "2px solid var(--moo-primary)",
                  borderRadius: r.value,
                }}
              />
              <div className="swatch__body">
                <div className="swatch__name">{r.name}</div>
                <div className="swatch__hex">{r.value === 999 ? "full" : r.value + "px"}</div>
                <div className="swatch__usage">{r.usage}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

export function Elevation() {
  return (
    <div className="page">
      <PageHead
        kicker="Foundations · 基础规范"
        title="投影 Elevation"
        desc="投影用于表达层级关系与浮起状态。MOOUI 提供三级阴影，分别对应卡片、悬浮元素与弹层。"
      />
      <Section title="阴影层级 Shadow">
        <div className="grid grid--3">
          {shadows.map((s) => (
            <div
              key={s.name}
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: 24,
                boxShadow: s.value,
                border: "1px solid var(--doc-line)",
              }}
            >
              <div style={{ fontWeight: 600 }}>{s.name}</div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--doc-muted)",
                  fontFamily: "monospace",
                  margin: "8px 0",
                }}
              >
                {s.value}
              </div>
              <div style={{ fontSize: 12, color: "var(--doc-muted)" }}>{s.usage}</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

export function Iconography() {
  const icons = ["🏠", "🔍", "🔔", "⚙️", "❤️", "⭐", "📷", "📍", "💬", "🛒", "👤", "🎁"];
  return (
    <div className="page">
      <PageHead
        kicker="Foundations · 基础规范"
        title="图标 Iconography"
        desc="图标采用 24×24 网格绘制，线宽 2px，圆角端点。常用尺寸为 16 / 20 / 24 / 28px。下方以 emoji 占位示意排布规则。"
      />
      <Section title="图标网格 Grid" hint="所有图标在 24×24 安全区内绘制，视觉留白 2px。">
        <div className="grid grid--4">
          {icons.map((ic) => (
            <div
              key={ic}
              className="swatch"
              style={{ display: "flex", alignItems: "center", gap: 12, padding: 14 }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: "var(--moo-primary-light)",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 22,
                }}
              >
                {ic}
              </div>
              <div style={{ fontSize: 12, color: "var(--doc-muted)" }}>24×24</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
