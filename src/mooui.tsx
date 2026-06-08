import React, { useState } from "react";

/* ============================================================
   MOOUI Mobile Components — React implementations used in the
   live previews of the documentation site.
   ============================================================ */

type Size = "lg" | "md" | "sm";
type ButtonType = "primary" | "secondary" | "ghost" | "danger" | "text";

export function Button({
  type = "primary",
  size = "md",
  block,
  disabled,
  children,
}: {
  type?: ButtonType;
  size?: Size;
  block?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      className={`moo-btn moo-btn--${type} moo-btn--${size}${
        block ? " moo-btn--block" : ""
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export function Tag({
  color = "primary",
  round,
  children,
}: {
  color?: "primary" | "success" | "warning" | "danger";
  round?: boolean;
  children: React.ReactNode;
}) {
  return (
    <span className={`moo-tag moo-tag--${color}${round ? " moo-tag--round" : ""}`}>
      {children}
    </span>
  );
}

export function Badge({ count, dot }: { count?: number; dot?: boolean }) {
  if (dot) return <span className="moo-badge moo-badge--dot" />;
  return <span className="moo-badge">{count}</span>;
}

export function CellGroup({ children }: { children: React.ReactNode }) {
  return <div className="moo-cellgroup">{children}</div>;
}

export function Cell({
  icon,
  title,
  label,
  value,
  arrow,
}: {
  icon?: React.ReactNode;
  title: string;
  label?: string;
  value?: React.ReactNode;
  arrow?: boolean;
}) {
  return (
    <div className="moo-cell">
      {icon && <div className="moo-cell__icon">{icon}</div>}
      <div className="moo-cell__body">
        <div className="moo-cell__title">{title}</div>
        {label && <div className="moo-cell__label">{label}</div>}
      </div>
      {value && <div className="moo-cell__value">{value}</div>}
      {arrow && <span className="moo-cell__arrow">›</span>}
    </div>
  );
}

export function Field({
  prefix,
  placeholder,
  error,
  defaultValue,
}: {
  prefix?: React.ReactNode;
  placeholder?: string;
  error?: boolean;
  defaultValue?: string;
}) {
  return (
    <div className={`moo-field${error ? " moo-field--error" : ""}`}>
      {prefix && <span className="moo-field__prefix">{prefix}</span>}
      <input placeholder={placeholder} defaultValue={defaultValue} />
    </div>
  );
}

export function Switch({ defaultOn }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <div
      className={`moo-switch${on ? " on" : ""}`}
      onClick={() => setOn((v) => !v)}
      role="switch"
      aria-checked={on}
    >
      <span className="moo-switch__knob" />
    </div>
  );
}

export function Checkbox({
  defaultChecked,
  children,
}: {
  defaultChecked?: boolean;
  children: React.ReactNode;
}) {
  const [checked, setChecked] = useState(!!defaultChecked);
  return (
    <div
      className={`moo-check${checked ? " checked" : ""}`}
      onClick={() => setChecked((v) => !v)}
    >
      <span className="moo-check__box">{checked ? "✓" : ""}</span>
      {children}
    </div>
  );
}

export function Radio({
  checked,
  onSelect,
  children,
}: {
  checked: boolean;
  onSelect: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`moo-check moo-radio${checked ? " checked" : ""}`}
      onClick={onSelect}
    >
      <span className="moo-check__box moo-radio__box" />
      {children}
    </div>
  );
}

export function NavBar({
  title,
  left = "‹ 返回",
  right,
}: {
  title: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div className="moo-navbar">
      <span className="moo-navbar__left">{left}</span>
      {title}
      <span className="moo-navbar__right">{right}</span>
    </div>
  );
}

export function TabBar({ active = 0 }: { active?: number }) {
  const items = [
    { icon: "🏠", label: "首页" },
    { icon: "🧭", label: "发现" },
    { icon: "🔔", label: "消息" },
    { icon: "👤", label: "我的" },
  ];
  return (
    <div className="moo-tabbar">
      {items.map((it, i) => (
        <div key={it.label} className={`moo-tabbar__item${i === active ? " active" : ""}`}>
          <span className="moo-tabbar__icon">{it.icon}</span>
          {it.label}
        </div>
      ))}
    </div>
  );
}

export function Tabs({ items, defaultIndex = 0 }: { items: string[]; defaultIndex?: number }) {
  const [idx, setIdx] = useState(defaultIndex);
  return (
    <div className="moo-tabs">
      {items.map((it, i) => (
        <div
          key={it}
          className={`moo-tabs__item${i === idx ? " active" : ""}`}
          onClick={() => setIdx(i)}
        >
          {it}
        </div>
      ))}
    </div>
  );
}

export function Avatar({
  size = "md",
  square,
  children,
}: {
  size?: "sm" | "md" | "lg";
  square?: boolean;
  children: React.ReactNode;
}) {
  const cls = size === "md" ? "" : ` moo-avatar--${size}`;
  return (
    <span className={`moo-avatar${cls}${square ? " moo-avatar--square" : ""}`}>
      {children}
    </span>
  );
}

export function Card({
  title,
  text,
  cover = true,
}: {
  title: string;
  text: string;
  cover?: boolean;
}) {
  return (
    <div className="moo-card">
      {cover && <div className="moo-card__cover" />}
      <div className="moo-card__body">
        <div className="moo-card__title">{title}</div>
        <div className="moo-card__text">{text}</div>
      </div>
    </div>
  );
}

export function Toast({ children }: { children: React.ReactNode }) {
  return <div className="moo-toast">{children}</div>;
}

export function Dialog({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="moo-dialog">
      <div className="moo-dialog__body">
        <div className="moo-dialog__title">{title}</div>
        <div className="moo-dialog__text">{text}</div>
      </div>
      <div className="moo-dialog__actions">
        <div className="moo-dialog__btn">取消</div>
        <div className="moo-dialog__btn moo-dialog__btn--primary">确定</div>
      </div>
    </div>
  );
}

export function Progress({ value }: { value: number }) {
  return (
    <div className="moo-progress">
      <div className="moo-progress__bar" style={{ width: `${value}%` }} />
    </div>
  );
}

export function Spinner() {
  return <div className="moo-spinner" />;
}

export function Stepper({ defaultValue = 1 }: { defaultValue?: number }) {
  const [n, setN] = useState(defaultValue);
  return (
    <div className="moo-stepper">
      <button onClick={() => setN((v) => Math.max(0, v - 1))}>−</button>
      <span>{n}</span>
      <button onClick={() => setN((v) => v + 1)}>+</button>
    </div>
  );
}
