import React from "react";
import {
  CircleHelp,
  Clock3,
  Database,
  Globe2,
  Shield,
  ShieldAlert,
  Zap,
} from "lucide-react";
import { riskTrend } from "../data/mockData";

export function TrendChart() {
  const max = 170;
  const colors = {
    critical: "#ff5a4f",
    high: "#ff6a00",
    medium: "#ffb020",
    low: "#32d583",
  };
  return (
    <div className="trend">
      <div className="trend-grid">
        {[0, 50, 100, 150, 200].map((value) => (
          <span
            key={value}
            style={{ bottom: `${(Math.min(value, max) / max) * 100}%` }}
          >
            {value}
          </span>
        ))}
        <svg viewBox="0 0 700 180" preserveAspectRatio="none">
          {Object.keys(colors).map((key) => (
            <polyline
              key={key}
              points={riskTrend
                .map(
                  (item, index) =>
                    `${index * 116.6},${175 - (item[key] / max) * 155}`,
                )
                .join(" ")}
              fill="none"
              stroke={colors[key]}
              strokeWidth="2.5"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
      </div>
      <div className="xlabels">
        {riskTrend.map((item) => (
          <span key={item.day}>{item.day}</span>
        ))}
      </div>
      <div className="legend-row">
        <span>
          <i className="dot critical" />
          Critical
        </span>
        <span>
          <i className="dot high" />
          High
        </span>
        <span>
          <i className="dot medium" />
          Medium
        </span>
        <span>
          <i className="dot low" />
          Low
        </span>
      </div>
    </div>
  );
}

export function Donut({ value = "76" }) {
  return (
    <div className="donut-wrap">
      <div className="donut">
        <div className="donut-center">
          <strong>{value}</strong>
          <small>/ 100</small>
          <em>Moderate Risk</em>
        </div>
      </div>
      <div className="donut-legend">
        <span>
          <i className="dot low" />
          Low<b>62%</b>
        </span>
        <span>
          <i className="dot medium" />
          Medium<b>28%</b>
        </span>
        <span>
          <i className="dot high" />
          High<b>8%</b>
        </span>
        <span>
          <i className="dot critical" />
          Critical<b>2%</b>
        </span>
      </div>
    </div>
  );
}

export function NetworkPreview() {
  return (
    <div className="topology">
      <div className="topo-line l1" />
      <div className="topo-line l2" />
      <div className="topo-line l3" />
      <div className="topo-line l4" />
      <span className="node internet">
        <Globe2 size={18} />
        <small>Internet</small>
      </span>
      <span className="node firewall">
        <Shield size={20} />
        <small>Firewall</small>
      </span>
      <span className="node prod">
        <Zap size={18} />
        <small>Production</small>
      </span>
      <span className="node dmz">
        <Database size={18} />
        <small>DMZ</small>
      </span>
      <span className="node safety">
        <ShieldAlert size={18} />
        <small>Safety</small>
      </span>
    </div>
  );
}

export function SensorPreview() {
  return (
    <>
      <div className="health">
        <div className="health-ring">
          <strong>92%</strong>
          <small>Healthy</small>
        </div>
        <div className="health-list">
          <span>
            <i className="dot low" />
            Sensors online<b>23 / 25</b>
          </span>
          <span>
            <i className="dot medium" />
            Degraded<b>1</b>
          </span>
          <span>
            <i className="dot critical" />
            Offline<b>1</b>
          </span>
          <span>
            <Clock3 size={14} />
            Data recency<b>&lt; 5 min</b>
          </span>
        </div>
      </div>
      <div className="notice">
        <CircleHelp size={15} />1 sensor in Plant B is reporting limited data.
        <button>View details</button>
      </div>
    </>
  );
}
