import React from "react";
import {
  FileText,
  Gauge,
  GitBranch,
  LayoutDashboard,
  Network,
  Server,
  Shield,
  ShieldAlert,
  Clock3,
} from "lucide-react";
import { sidebarImage } from "./industrialAssets";

const nav = [
  ["Dashboard", LayoutDashboard],
  ["Assets", Server],
  ["Findings", ShieldAlert],
  ["Attack Paths", GitBranch],
  ["Network Map", Network],
  ["Changes", Clock3],
  ["Sensors", Gauge],
  ["Reports", FileText],
];

export default function Sidebar({ view, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">
        </div>
        <div>
          <strong>
            ICS<span>Guard</span>
          </strong>
          <small>Industrial Cybersecurity</small>
        </div>
      </div>
      <nav>
        {nav.map(([name, Icon]) => (
          <button
            key={name}
            className={view === name ? "active" : ""}
            onClick={() => onNavigate(name)}
          >
            <Icon size={18} />
            <span>{name}</span>
            {name === "Attack Paths" && <b>14</b>}
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <div
          className="sidebar-industrial-image"
          style={{ backgroundImage: `url(${sidebarImage})` }}
        >
          <div className="sidebar-image-overlay">
            <h2>
              Secure
              <br />
              Asset
              <br />
              Safer Tomorrow
            </h2>
          </div>
        </div>
        <div className="secure-card">
          <Shield size={18} />
          <div>
            <b>OT Security</b>
            <small>Secure operations.</small>
          </div>
        </div>
        <small>v1.0.0 · Enterprise Preview</small>
      </div>
    </aside>
  );
}
