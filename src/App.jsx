import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import AssetsPage from "./pages/AssetsPage";
import FindingsPage from "./pages/FindingsPage";
import AttackPathPage from "./pages/AttackPathPage";
import {
  ChangesPage,
  NetworkMapPage,
  ReportsPage,
  SensorsPage,
  StatesPage,
} from "./pages/OperationsPages";
import { attackPaths } from "./data/mockData";

export default function App() {
  const [view, setView] = useState("Dashboard");
  const [selectedPath, setSelectedPath] = useState(null);

  const openPath = (path) => {
    setSelectedPath(path || attackPaths[0]);
    setView("Attack Paths");
  };

  const pages = {
    Dashboard: <DashboardPage onPath={openPath} onNavigate={setView} />,
    Assets: <AssetsPage />,
    Findings: <FindingsPage />,
    "Attack Paths": (
      <AttackPathPage selected={selectedPath} setSelected={setSelectedPath} />
    ),
    "Network Map": <NetworkMapPage />,
    Changes: <ChangesPage />,
    Sensors: <SensorsPage />,
    Reports: <ReportsPage />,
    States: <StatesPage />,
  };

  return (
    <div className="app-shell">
      <Sidebar view={view} onNavigate={setView} />
      <div className="content">{pages[view] || pages.Dashboard}</div>
    </div>
  );
}
