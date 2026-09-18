import React, { useState } from "react";
import {
  ArrowRight,
  Database,
  Globe2,
  Search,
  Server,
  ShieldAlert,
  SlidersHorizontal,
  X,
  Zap,
} from "lucide-react";
import { attackPaths } from "../data/mockData";
import { Severity } from "../components/common";

export default function AttackPathPage({ selected, setSelected }) {
  const [filter, setFilter] = useState("All");
  const paths = attackPaths.filter(
    (path) => filter === "All" || path.risk === filter,
  );
  const current =
    selected && paths.some((path) => path.id === selected.id)
      ? selected
      : paths[0] || null;
  return (
    <div className="page">
      <div className="subhead">
        <div>
          <p className="eyebrow">INVESTIGATION WORKSPACE</p>
          <h1>Attack Path Map</h1>
          <p>
            Understand how exposure can traverse the environment to high-value
            assets.
          </p>
        </div>
        <div className="path-controls">
          <button>
            <Search size={15} />
            Search graph
          </button>
          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          >
            <option>All</option>
            <option>Critical</option>
            <option>High</option>
            <option>Medium</option>
          </select>
          <button>
            <SlidersHorizontal size={15} />
            Filters
          </button>
        </div>
      </div>
      <div className="attack-layout">
        <aside className="path-sidebar">
          <div className="side-title">
            <b>Detected paths</b>
            <span>{paths.length}</span>
          </div>
          <div className="filter-chips">
            <span>14 total</span>
            <span className="critical">3 critical</span>
            <span className="high">7 high</span>
          </div>
          {paths.map((path) => (
            <button
              key={path.id}
              className={`path-card ${current?.id === path.id ? "selected" : ""}`}
              onClick={() => setSelected(path)}
            >
              <div>
                <b>{path.id}</b>
                <Severity>{path.risk}</Severity>
              </div>
              <strong>
                {path.source} → {path.target}
              </strong>
              <small>
                {path.steps} hops · {path.score}% confidence
              </small>
            </button>
          ))}
        </aside>
        <section className="graph">
          <div className="graph-toolbar">
            <span>
              Selected path: <b>{current?.id}</b>
            </span>
            <div>
              <button>−</button>
              <button>100%</button>
              <button>+</button>
              <button>Fit</button>
            </div>
          </div>
          <div className="graph-canvas">
            <div className="zone-label z1">EXTERNAL</div>
            <div className="zone-label z2">CORPORATE IT</div>
            <div className="zone-label z3">CONTROL ZONE</div>
            <svg className="connections" viewBox="0 0 800 650">
              <defs>
                <marker
                  id="arrow"
                  markerWidth="8"
                  markerHeight="8"
                  refX="6"
                  refY="3"
                  orient="auto"
                >
                  <path d="M0,0 L0,6 L6,3 z" fill="#ff6a00" />
                </marker>
              </defs>
              <path
                d="M115 320 C190 250 230 240 320 270"
                markerEnd="url(#arrow)"
              />
              <path
                d="M350 285 C430 220 470 210 545 250"
                markerEnd="url(#arrow)"
              />
              <path
                d="M570 270 C640 300 665 330 705 365"
                markerEnd="url(#arrow)"
              />
            </svg>
            {[
              [
                "source",
                Globe2,
                "Internet",
                "Entry point · External",
                "Critical",
              ],
              [
                "pivot",
                Server,
                "Engineering WS",
                "Windows · 192.168.5.23",
                "High",
              ],
              ["plc", Zap, "PLC-01", "Production · Crown jewel", "Critical"],
              ["scada", Database, "SCADA-01", "Control Zone · TCP/502", "High"],
            ].map(([className, NodeIcon, name, detail, risk]) => (
              <div className={`graph-node ${className}`} key={className}>
                <div className="node-icon">
                  <NodeIcon />
                </div>
                <b>{name}</b>
                <small>{detail}</small>
                <Severity>{risk}</Severity>
              </div>
            ))}
            <div className="edge-label e1">RDP · Suspicious</div>
            <div className="edge-label e2">SMB · Lateral</div>
            <div className="edge-label e3">Modbus/TCP · Critical</div>
          </div>
        </section>
        <aside className="investigate">
          <div className="investigate-head">
            <div>
              <p>SELECTED PATH</p>
              <h3>{current?.id}</h3>
            </div>
            <button>
              <X size={17} />
            </button>
          </div>
          <div className="risk-score">
            <span>Path risk</span>
            <strong>{current?.score}</strong>
            <small>/100</small>
            <Severity>{current?.risk}</Severity>
          </div>
          <h4>Path sequence</h4>
          <ol className="sequence">
            {[current?.source, current?.pivot, current?.target].map(
              (item, index) => (
                <li key={item}>
                  <span>0{index + 1}</span>
                  <b>{item}</b>
                  <small>
                    {index === 0
                      ? "External exposure"
                      : index === 1
                        ? "RDP service · suspicious"
                        : "Modbus/TCP · crown jewel"}
                  </small>
                </li>
              ),
            )}
          </ol>
          <h4>Why it matters</h4>
          <p className="body-copy">
            This path creates a reachable route from an exposed entry point to a
            critical operational asset. The selected relationship crosses a
            trust boundary and warrants investigation.
          </p>
          <h4>Evidence</h4>
          <div className="evidence">
            <span>✓</span>Asset is reachable from external network
          </div>
          <div className="evidence">
            <span>✓</span>Unusual RDP communication observed
          </div>
          <div className="evidence">
            <span>✓</span>Target asset is classified critical
          </div>
          <button className="primary wide">
            <ShieldAlert size={16} />
            Start investigation
          </button>
        </aside>
      </div>
    </div>
  );
}
