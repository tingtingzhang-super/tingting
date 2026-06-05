import React from "react";

export function Phone({ children }: { children: React.ReactNode }) {
  return (
    <div className="phone moo">
      <div className="phone__screen">
        <div className="phone__notch" />
        <div className="phone__status">
          <span>9:41</span>
          <span>📶 🔋</span>
        </div>
        <div className="phone__body">{children}</div>
      </div>
    </div>
  );
}
