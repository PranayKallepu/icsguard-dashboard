import React from "react";
import { assets } from "../data/mockData";
import { Severity } from "../components/common";

export default function AssetsPage() {
  return (
    <div className="page">
      <div className="subhead">
        <div>
          <p className="eyebrow">ASSET INVENTORY</p>
          <h1>Assets</h1>
          <p>
            Monitor industrial assets, their status, zone and security risk.
          </p>
        </div>
        <button className="primary">+ Add Asset</button>
      </div>
      <section className="card">
        <div className="card-head">
          <h3>Asset Inventory</h3>
          <span>{assets.length} monitored assets</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="asset-table">
            <thead>
              <tr>
                <th>Asset</th>
                <th>Type</th>
                <th>Zone</th>
                <th>Status</th>
                <th>Risk</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {assets.map(([name, type, zone, status, risk, score]) => (
                <tr key={name}>
                  <td>
                    <strong>{name}</strong>
                  </td>
                  <td>{type}</td>
                  <td>{zone}</td>
                  <td>
                    <span className={`status-dot ${status.toLowerCase()}`}>
                      ● {status}
                    </span>
                  </td>
                  <td>
                    <Severity>{risk}</Severity>
                  </td>
                  <td>
                    <strong>{score}/100</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
