import React from "react";
import {
  ArrowRight,
  Database,
  FileText,
  Gauge,
  Globe2,
  Network,
  Search,
  Server,
  Shield,
  ShieldAlert,
  SlidersHorizontal,
  Zap,
} from "lucide-react";
import { changes } from "../data/mockData";
import { Card, Severity } from "../components/common";

export function NetworkMapPage() {
  const zones = [
    ["Production Zone", 82],
    ["Corporate IT", 61],
    ["DMZ", 48],
    ["Safety Zone", 35],
  ];
  return (
    <div className="page">
      <div className="subhead">
        <div>
          <p className="eyebrow">NETWORK VISIBILITY</p>
          <h1>Network Map</h1>
          <p>
            Explore zones, connectivity and industrial network relationships.
          </p>
        </div>
        <div className="path-controls">
          <button>
            <Search size={15} />
            Search network
          </button>
          <button>
            <SlidersHorizontal size={15} />
            Filters
          </button>
        </div>
      </div>
      <div className="grid two">
        <Card title="Network Topology">
          <div className="large-topology">
            {[
              [Globe2, "Internet", "External", "internet-node"],
              [Shield, "Firewall", "Perimeter", "firewall-node"],
              [Server, "Corporate IT", "42 assets", "corporate-node"],
              [Database, "DMZ", "18 assets", "dmz-node"],
              [Zap, "Production Zone", "486 assets", "production-node"],
              [ShieldAlert, "Safety Zone", "72 assets", "safety-node"],
            ].map(([Icon, name, detail, className]) => (
              <div className={`network-node ${className}`} key={name}>
                <Icon />
                <strong>{name}</strong>
                <small>{detail}</small>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Zone Summary">
          <div className="site-bars">
            {zones.map(([name, value]) => (
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
      </div>
      <section className="card">
        <div className="card-head">
          <h3>Network Relationships</h3>
          <span>Live topology snapshot</span>
        </div>
        <div className="finding-list">
          {[
            ["Internet → Firewall", "External connection", "High"],
            ["Firewall → Corporate IT", "Allowed traffic", "Medium"],
            ["Corporate IT → Production", "Trusted route", "High"],
            ["Production → Safety Zone", "Restricted connection", "Medium"],
          ].map(([name, type, risk]) => (
            <div className="finding-row" key={name}>
              <div className="finding-icon">
                <Network size={18} />
              </div>
              <div className="finding-info">
                <strong>{name}</strong>
                <small>{type}</small>
              </div>
              <Severity>{risk}</Severity>
              <button className="text-button">
                Inspect
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export function ChangesPage() {
  return (
    <div className="page">
      <div className="subhead">
        <div>
          <p className="eyebrow">ACTIVITY MONITOR</p>
          <h1>Recent Changes</h1>
          <p>Track asset, communication and configuration changes.</p>
        </div>
        <button className="primary">Export Changes</button>
      </div>
      <section className="card">
        <div className="card-head">
          <h3>Change Timeline</h3>
          <span>Last 24 hours</span>
        </div>
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
              <button className="text-button">
                View
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export function SensorsPage() {
  const rows = [
    ["Sensor-PL-A01", "Plant A · Production", "Online", "Low"],
    ["Sensor-PL-A02", "Plant A · Control", "Online", "Low"],
    ["Sensor-PL-B01", "Plant B · Production", "Degraded", "Medium"],
    ["Sensor-PL-B02", "Plant B · DMZ", "Online", "Low"],
    ["Sensor-UT-05", "Utilities Zone", "Offline", "High"],
  ];
  return (
    <div className="page">
      <div className="subhead">
        <div>
          <p className="eyebrow">PLATFORM HEALTH</p>
          <h1>Sensors</h1>
          <p>
            Monitor collection health and data freshness across deployed
            sensors.
          </p>
        </div>
        <button className="primary">Refresh Status</button>
      </div>
      <div className="grid three">
        <Card title="Overall Health">
          <div className="health">
            <div className="health-ring">
              <strong>92%</strong>
              <small>Healthy</small>
            </div>
            <div className="health-list">
              <span>
                <i className="dot low" />
                Online<b>23</b>
              </span>
              <span>
                <i className="dot medium" />
                Degraded<b>1</b>
              </span>
              <span>
                <i className="dot critical" />
                Offline<b>1</b>
              </span>
            </div>
          </div>
        </Card>
        <Card title="Data Recency">
          <div className="sensor-stat">
            <strong>&lt; 5 min</strong>
            <span>Current data freshness</span>
          </div>
          <div className="sensor-progress">
            <i style={{ width: "92%" }} />
          </div>
        </Card>
        <Card title="Coverage">
          <div className="sensor-stat">
            <strong>25</strong>
            <span>Deployed sensors</span>
          </div>
          <div className="sensor-progress">
            <i style={{ width: "96%" }} />
          </div>
        </Card>
      </div>
      <section className="card">
        <div className="card-head">
          <h3>Sensor Status</h3>
          <span>25 sensors monitored</span>
        </div>
        <div className="finding-list">
          {rows.map(([name, zone, status, risk]) => (
            <div className="finding-row" key={name}>
              <div className="finding-icon">
                <Gauge size={18} />
              </div>
              <div className="finding-info">
                <strong>{name}</strong>
                <small>{zone}</small>
              </div>
              <span className="status-dot">● {status}</span>
              <Severity>{risk}</Severity>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export function ReportsPage() {
  const reports = [
    [
      "Executive Security Summary",
      "Security posture and critical exposure overview",
    ],
    [
      "Industrial Asset Inventory",
      "Complete asset visibility and classification report",
    ],
    ["Attack Path Analysis", "Reachability and high-risk attack path analysis"],
    ["Sensor Health Report", "Platform health and data collection status"],
  ];
  return (
    <div className="page">
      <div className="subhead">
        <div>
          <p className="eyebrow">SECURITY REPORTING</p>
          <h1>Reports</h1>
          <p>
            Security posture, risk and operational reports for your environment.
          </p>
        </div>
        <button className="primary">Generate Report</button>
      </div>
      <div className="grid three">
        <Card title="Security Posture">
          <div className="report-number">
            76<small>/100</small>
          </div>
          <p>Overall environment security posture</p>
        </Card>
        <Card title="Critical Exposure">
          <div className="report-number">9</div>
          <p>Critical assets currently exposed</p>
        </Card>
        <Card title="Open Findings">
          <div className="report-number">320</div>
          <p>Findings requiring review</p>
        </Card>
      </div>
      <section className="card">
        <div className="card-head">
          <h3>Available Reports</h3>
          <span>Security reporting center</span>
        </div>
        <div className="finding-list">
          {reports.map(([title, description]) => (
            <div className="finding-row" key={title}>
              <div className="finding-icon">
                <FileText size={18} />
              </div>
              <div className="finding-info">
                <strong>{title}</strong>
                <small>{description}</small>
              </div>
              <button className="text-button">
                Open report
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export function StatesPage() {
  const states = [
    [
      "Normal",
      "Healthy data, current information and no urgent issue.",
      "green",
      "All systems operational",
    ],
    [
      "High Risk",
      "A critical finding or attack path requires attention.",
      "critical",
      "9 exposed critical assets",
    ],
    [
      "Degraded Data",
      "Collection quality is impaired; conclusions may be incomplete.",
      "medium",
      "1 sensor reporting limited data",
    ],
    [
      "Unknown",
      "Insufficient information - certainty is intentionally not implied.",
      "neutral",
      "Coverage unavailable",
    ],
    [
      "Empty",
      "No results after the active filters are applied.",
      "neutral",
      "No matching findings",
    ],
    [
      "Large Data Volume",
      "Thousands of relationships require progressive disclosure.",
      "blue",
      "1,248 assets · 14 paths",
    ],
  ];
  return (
    <div className="page states-page">
      <div className="subhead">
        <div>
          <p className="eyebrow">DESIGN STATES</p>
          <h1>Resilience & Accessibility</h1>
          <p>
            Clear communication when data is incomplete, delayed or unavailable.
          </p>
        </div>
      </div>
      <div className="state-grid">
        {states.map(([title, description, tone, example]) => (
          <div className="state-card" key={title}>
            <div className={`state-icon ${tone}`}>
              <ShieldAlert />
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
            <div className="state-example">{example}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
