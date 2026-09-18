import React from "react";
import {
  AlertTriangle,
  ArrowRight,
  Box,
  GitBranch,
  Server,
  Shield,
  ShieldAlert,
} from "lucide-react";

export function Icon({ name, size = 18 }) {
  const icons = {
    server: Server,
    alert: AlertTriangle,
    shield: Shield,
    nodes: GitBranch,
    triangle: ShieldAlert,
  };
  const Component = icons[name] || Box;
  return <Component size={size} strokeWidth={1.8} />;
}

export function Severity({ children }) {
  return (
    <span className={`severity ${String(children).toLowerCase()}`}>
      {children}
    </span>
  );
}

export function Card({ title, action, children, className = "" }) {
  return (
    <section className={`card ${className}`}>
      <div className="card-head">
        <h3>{title}</h3>
        {action && (
          <button className="text-button" onClick={action.onClick}>
            {action.label}
            <ArrowRight size={14} />
          </button>
        )}
      </div>
      {children}
    </section>
  );
}

export function Sparkline({ data }) {
  const points = data
    .map(
      (value, index) =>
        `${index * (100 / (data.length - 1))},${100 - value / 2}`,
    )
    .join(" ");
  return (
    <svg className="sparkline" viewBox="0 0 100 50" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
