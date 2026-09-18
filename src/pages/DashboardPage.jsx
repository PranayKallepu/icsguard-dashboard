import React, { useMemo, useState } from "react";
import {
  Bell,
  ChevronDown,
  Clock3,
  Menu,
  Search,
  Server,
  Target,
  ArrowRight,
} from "lucide-react";
import { kpis, findings, sites, attackPaths, changes } from "../data/mockData";
import { Card, Icon, Severity, Sparkline } from "../components/common";
import {
  Donut,
  NetworkPreview,
  SensorPreview,
  TrendChart,
} from "../components/dashboardVisuals";
import { heroImage } from "../components/industrialAssets";

export default function DashboardPage({ onPath, onNavigate }) {
  const [site, setSite] = useState("All Sites");
  const [severity, setSeverity] = useState("All Severities");
  const [range, setRange] = useState("Last 7 Days");
  const [query, setQuery] = useState("");
  const filteredPaths = useMemo(
    () =>
      attackPaths.filter(
        (path) =>
          (!query ||
            `${path.source} ${path.pivot} ${path.target}`
              .toLowerCase()
              .includes(query.toLowerCase())) &&
          (severity === "All Severities" || path.risk === severity),
      ),
    [query, severity],
  );

  return (
    <div className="page">
      <header className="topbar">
        <button className="mobile-menu">
          <Menu size={20} />
        </button>
        <div className="search">
          <Search size={17} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search assets, findings, IPs, devices..."
          />
          <kbd>Ctrl K</kbd>
        </div>
        <select value={site} onChange={(event) => setSite(event.target.value)}>
          <option>All Sites</option>
          <option>Plant A</option>
          <option>Plant B</option>
        </select>
        <select
          value={range}
          onChange={(event) => setRange(event.target.value)}
        >
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
        </select>
        <select
          value={severity}
          onChange={(event) => setSeverity(event.target.value)}
        >
          <option>All Severities</option>
          <option>Critical</option>
          <option>High</option>
          <option>Medium</option>
        </select>
        <button className="primary">Apply</button>
        <button className="icon-btn">
          <Bell size={18} />
          <span className="notif">3</span>
        </button>
        <div className="profile">
          <div className="avatar">P</div>
          <div>
            <b>Pranay K</b>
            <small>Security Analyst</small>
          </div>
          <ChevronDown size={15} />
        </div>
      </header>
      <main>
        <div
          className="hero"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(5, 12, 18, .96), rgba(5, 12, 18, .78) 45%, rgba(5, 12, 18, .35)), url(${heroImage})`,
          }}
        >
          <div>
            <p className="eyebrow">
              <span className="live-dot" />
              LIVE ENVIRONMENT
            </p>
            <h1>Security Overview</h1>
            <p>Real-time visibility into your industrial environment.</p>
          </div>
          <div className="hero-status">
            <span className="green-dot" />
            All Systems Operational
            <ChevronDown size={14} />
            <span className="divider" />
            <Clock3 size={14} />
            17 Sep 2026 · 02:30 PM
          </div>
        </div>
        <div className="kpi-grid">
          {kpis.map((kpi) => (
            <div className="kpi" key={kpi.label}>
              <div className={`kpi-icon ${kpi.tone}`}>
                <Icon name={kpi.icon} />
              </div>
              <div>
                <span>{kpi.label}</span>
                <strong>{kpi.value}</strong>
                <small
                  className={
                    kpi.tone === "red" || kpi.tone === "amber" ? "up" : ""
                  }
                >
                  {kpi.change} <em>{kpi.note}</em>
                </small>
              </div>
              <Sparkline data={[4, 7, 5, 8, 10, 9, 12]} />
            </div>
          ))}
        </div>
        <div className="grid three">
          <Card
            title="Security Posture"
            action={{
              label: "View details",
              onClick: () => onNavigate("Reports"),
            }}
          >
            <Donut />
          </Card>
          <Card
            title="Findings by Severity"
            action={{
              label: "View all",
              onClick: () => onNavigate("Findings"),
            }}
          >
            <div className="bars">
              {findings.map((finding) => (
                <div className="bar-col" key={finding.name}>
                  <b>{finding.value}</b>
                  <div
                    className={`bar ${finding.tone}`}
                    style={{ height: `${(finding.value / 120) * 112}px` }}
                  />
                  <span>{finding.name}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card title="Risk Trend">
            <div className="segmented">
              <button className="active">7D</button>
              <button>30D</button>
              <button>90D</button>
            </div>
            <TrendChart />
          </Card>
        </div>
        <div className="grid three">
          <Card
            title="Asset Visibility"
            action={{ label: "View all", onClick: () => onNavigate("Assets") }}
          >
            <div className="asset-visibility">
              <div className="asset-donut">
                <strong>1,248</strong>
                <small>Assets</small>
              </div>
              <div className="asset-list">
                {[
                  "PLC|24%|low",
                  "HMI|18%|medium",
                  "Engineering WS|16%|info",
                  "Servers|12%|blue",
                  "Network Devices|10%|neutral",
                  "Others|20%|green",
                ].map((item) => {
                  const [name, share, tone] = item.split("|");
                  return (
                    <span key={name}>
                      <i className={`dot ${tone}`} />
                      {name}
                      <b>{share}</b>
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="mini-stats">
              <span>
                <b>+32</b>New Assets
              </span>
              <span>
                <b>18</b>Unidentified
              </span>
              <span>
                <b>27</b>Inactive
              </span>
            </div>
          </Card>
          <Card
            title="Top Sites / Zones by Risk"
            action={{
              label: "View all",
              onClick: () => onNavigate("Network Map"),
            }}
          >
            <div className="site-bars">
              {sites.map(([name, value]) => (
                <div key={name}>
                  <span>{name}</span>
                  <div>
                    <i style={{ width: `${value}%` }} />
                    <b>{value}</b>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card
            title="Attack Path Preview"
            action={{ label: "View map", onClick: () => onPath() }}
          >
            <div className="path-list">
              {filteredPaths.map((path) => (
                <button
                  className="path-row"
                  key={path.id}
                  onClick={() => onPath(path)}
                >
                  <div className="path-icons">
                    <span>
                      <Server size={14} />
                    </span>
                    <ArrowRight size={12} />
                    <span>
                      <Server size={14} />
                    </span>
                    <ArrowRight size={12} />
                    <span>
                      <Target size={14} />
                    </span>
                  </div>
                  <div className="path-copy">
                    <b>
                      {path.source} <ArrowRight size={12} /> {path.pivot}{" "}
                      <ArrowRight size={12} /> {path.target}
                    </b>
                    <small>
                      {path.steps} steps ·{" "}
                      <strong>{path.score}% confidence</strong>
                    </small>
                  </div>
                  <Severity>{path.risk}</Severity>
                </button>
              ))}
            </div>
          </Card>
        </div>
        <div className="grid three">
          <Card
            title="Recent Changes"
            action={{ label: "View all", onClick: () => onNavigate("Changes") }}
          >
            <div className="changes">
              {changes.map((change, index) => (
                <div key={index}>
                  <span>{change[0]}</span>
                  <i className={`dot ${change[4]}`} />
                  <p>
                    {change[1]}
                    <small>
                      {change[2]} · {change[3]}
                    </small>
                  </p>
                </div>
              ))}
            </div>
          </Card>
          <Card
            title="Network / Topology Snapshot"
            action={{
              label: "View map",
              onClick: () => onNavigate("Network Map"),
            }}
          >
            <NetworkPreview />
          </Card>
          <Card
            title="Platform / Sensor Health"
            action={{ label: "View all", onClick: () => onNavigate("Sensors") }}
          >
            <SensorPreview />
          </Card>
        </div>
      </main>
    </div>
  );
}
