import { PageHead, Section, Callout, SyncBadge } from "../components/Doc";
import {
  colorGroups,
  typeScale,
  spacing,
  radii,
  shadows,
} from "../data/tokens";
import { figmaTokens, semantic } from "../data/figma";

const roleLabel: Record<string, string> = {
  primary: "主色 Primary",
  secondary: "辅助 Secondary",
  success: "成功 Success",
  warning: "警告 Warning",
  danger: "危险 Danger",
  info: "信息 Info",
};

function rgba(hex: string, opacity: number) {
  if (opacity >= 1) return hex;
  const n = hex.replace("#", "");
  const r = parseInt(n.slice(0, 2), 16);
  const g = parseInt(n.slice(2, 4), 16);
  const b = parseInt(n.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function SyncedMeta() {
  if (!figmaTokens.synced) return null;
  const scopeText =
    figmaTokens.scope === "node"
      ? `节点 ${figmaTokens.nodeId}${
          figmaTokens.scopeName ? ` (${figmaTokens.scopeName})` : ""
        }`
      : `整库 ${figmaTokens.counts.pages ?? "?"} 个页面`;
  return (
    <p className="synced-meta">
      数据来源：Figma 文件 <code>{figmaTokens.fileKey}</code> · {scopeText} · 同步于{" "}
      {figmaTokens.fetchedAt
        ? new Date(figmaTokens.fetchedAt).toLocaleString("zh-CN")
        : "—"}
    </p>
  );
}

function SemanticChip({ hex, label, sub }: { hex: string; label: string; sub?: string }) {
  return (
    <div className="swatch">
      <div className="swatch__chip" style={{ background: hex }} />
      <div className="swatch__body">
        <div className="swatch__name">{label}</div>
        <div className="swatch__hex">{hex}</div>
        {sub && <div className="swatch__usage">{sub}</div>}
      </div>
    </div>
  );
}

export function Colors() {
  return (
    <div className="page">
      <PageHead
        kicker="Foundations · 基础规范"
        title="颜色 Color"
        desc="MOOUI 颜色体系由品牌色、功能色与中性色三部分组成。所有颜色均以 CSS 变量形式提供，确保跨平台一致性与可主题化能力。"
      />
      <div style={{ marginBottom: 8 }}>
        <SyncBadge synced={figmaTokens.synced} />
        <SyncedMeta />
      </div>
      {figmaTokens.synced && semantic.brand.length > 0 && (
        <Section
          title="语义色 · 由 Figma 自动归类"
          hint="依据全库颜色的使用频次与色相/明度分布自动推导出的语义 Token。"
        >
          <div className="grid grid--4">
            {semantic.brand.map((c) => (
              <SemanticChip
                key={"b" + c.role}
                hex={c.hex}
                label={roleLabel[c.role] ?? c.role}
                sub={`使用 ${c.count} 次`}
              />
            ))}
            {semantic.functional.map((c) => (
              <SemanticChip
                key={"f" + c.role}
                hex={c.hex}
                label={roleLabel[c.role] ?? c.role}
                sub={`使用 ${c.count} 次`}
              />
            ))}
          </div>
        </Section>
      )}
      {figmaTokens.synced && semantic.neutral.length > 0 && (
        <Section title="中性色 · 由 Figma 自动归类" hint="按明度归类的文本 / 背景 / 分割线建议。">
          <div className="grid grid--4">
            {semantic.neutral.map((c, i) => (
              <SemanticChip
                key={"n" + i}
                hex={c.hex}
                label={c.role}
                sub={`${c.hex} · 使用 ${c.count} 次`}
              />
            ))}
          </div>
        </Section>
      )}
      {figmaTokens.synced && figmaTokens.colors.length > 0 && (
        <Section
          title="全部颜色 · 按使用频次"
          hint={`全库共 ${figmaTokens.counts.colors} 个颜色，下方展示使用最多的 ${figmaTokens.colors.length} 个。`}
        >
          <div className="grid grid--4">
            {figmaTokens.colors.map((c, i) => (
              <div className="swatch" key={c.hex + i}>
                <div
                  className="swatch__chip"
                  style={{ background: rgba(c.hex, c.opacity), height: 56 }}
                />
                <div className="swatch__body">
                  <div className="swatch__hex">
                    {c.hex}
                    {c.opacity < 1 ? ` · ${Math.round(c.opacity * 100)}%` : ""}
                  </div>
                  <div className="swatch__usage">使用 {c.count} 次</div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}
      {figmaTokens.synced && (
        <h2 className="section__title" style={{ marginTop: 40 }}>
          内置参考色板
        </h2>
      )}
      {figmaTokens.synced && (
        <p className="section__hint">以下为站点内置组件所用的策划色板，作为语义映射的参考基准。</p>
      )}
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
      <div style={{ marginBottom: 8 }}>
        <SyncBadge synced={figmaTokens.synced} />
        <SyncedMeta />
      </div>
      {figmaTokens.synced && semantic.typeScale.length > 0 && (
        <Section
          title="字阶 · 由 Figma 自动归类"
          hint={`从全库 ${figmaTokens.counts.typography} 个文本样式中，按字号归并出的移动端字阶（10–44px，取每档最常用样式）。`}
        >
          <div className="card" style={{ padding: "8px 4px" }}>
            {semantic.typeScale.map((t, i) => (
              <div
                key={t.fontSize + "-" + i}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 24,
                  padding: "14px 20px",
                  borderBottom: "1px solid var(--doc-line)",
                }}
              >
                <div style={{ width: 70, color: "var(--doc-muted)", fontSize: 13 }}>
                  {t.fontSize}px
                </div>
                <div
                  style={{
                    flex: 1,
                    fontSize: Math.min(t.fontSize, 34),
                    lineHeight: 1.3,
                    fontWeight: t.fontWeight ?? 400,
                  }}
                >
                  MOOUI 移动组件 Aa 123
                </div>
                <div
                  style={{
                    color: "var(--doc-muted)",
                    fontSize: 12,
                    fontFamily: "monospace",
                    textAlign: "right",
                    width: 230,
                  }}
                >
                  {t.fontSize}/{t.lineHeight ?? "—"} · w{t.fontWeight ?? "—"}
                  <br />
                  {t.fontFamily ?? ""} · 使用 {t.count} 次
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}
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
