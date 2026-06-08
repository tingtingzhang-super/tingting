import React from "react";

export function PageHead({
  kicker,
  title,
  desc,
}: {
  kicker: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="page__head">
      <div className="page__kicker">{kicker}</div>
      <h1 className="page__title">{title}</h1>
      <p className="page__desc">{desc}</p>
    </div>
  );
}

export function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="section">
      <h2 className="section__title">{title}</h2>
      {hint && <p className="section__hint">{hint}</p>}
      {children}
    </section>
  );
}

export function Demo({
  label,
  column,
  children,
}: {
  label?: string;
  column?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`demo${column ? " demo--column" : ""}`}>
      {label && <span className="demo__label">{label}</span>}
      {children}
    </div>
  );
}

export interface SpecRow {
  prop: string;
  type: string;
  value: string;
  desc: string;
}

export function SpecTable({ rows }: { rows: SpecRow[] }) {
  return (
    <div className="card" style={{ overflow: "hidden", marginTop: 14 }}>
      <table className="spec">
        <thead>
          <tr>
            <th>属性 / Token</th>
            <th>类型</th>
            <th>规格值</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.prop + r.value}>
              <td>
                <code>{r.prop}</code>
              </td>
              <td>{r.type}</td>
              <td>
                <code>{r.value}</code>
              </td>
              <td>{r.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Guidelines({
  dos,
  donts,
}: {
  dos: string[];
  donts: string[];
}) {
  return (
    <div className="guidelines">
      <div className="guide guide--do">
        <span className="guide__tag">✓ 推荐</span>
        <ul>
          {dos.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </div>
      <div className="guide guide--dont">
        <span className="guide__tag">✕ 避免</span>
        <ul>
          {donts.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Callout({ children }: { children: React.ReactNode }) {
  return <div className="callout">{children}</div>;
}

export function SyncBadge({ synced }: { synced: boolean }) {
  return (
    <span className={`sync-badge${synced ? " sync-badge--on" : ""}`}>
      <span className="sync-badge__dot" />
      {synced ? "已与 Figma 同步" : "未同步 · 使用默认规范"}
    </span>
  );
}
