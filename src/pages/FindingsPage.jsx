import React, { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  SlidersHorizontal,
} from "lucide-react";
import { findings } from "../data/mockData";
import { Severity } from "../components/common";

export default function FindingsPage() {
  const [filter, setFilter] = useState("All");
  const filtered = findings.filter(
    (finding) => filter === "All" || finding.name === filter,
  );
  return (
    <div className="page">
      <div className="subhead">
        <div>
          <p className="eyebrow">SECURITY FINDINGS</p>
          <h1>Findings</h1>
          <p>
            Review detected security findings across the industrial environment.
          </p>
        </div>
        <div className="path-controls">
          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          >
            <option>All</option>
            <option>Critical</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <button>
            <SlidersHorizontal size={15} />
            Filters
          </button>
        </div>
      </div>
      <div className="grid four">
        {findings.map((finding) => (
          <div className="kpi" key={finding.name}>
            <div className={`kpi-icon ${finding.tone}`}>
              <ShieldAlert size={18} />
            </div>
            <div>
              <span>{finding.name}</span>
              <strong>{finding.value}</strong>
              <small>Active findings</small>
            </div>
          </div>
        ))}
      </div>
      <section className="card">
        <div className="card-head">
          <h3>Finding Overview</h3>
          <span>{filtered.length} categories</span>
        </div>
        <div className="finding-list">
          {filtered.map((finding) => (
            <div className="finding-row" key={finding.name}>
              <div className="finding-icon">
                <AlertTriangle size={18} />
              </div>
              <div className="finding-info">
                <strong>{finding.name} Severity Findings</strong>
                <small>
                  Security findings requiring analyst review and remediation.
                </small>
              </div>
              <Severity>{finding.name}</Severity>
              <strong className="finding-count">{finding.value}</strong>
              <button className="text-button">
                Investigate
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
