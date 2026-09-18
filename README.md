# ICSGuard

ICSGuard is a React and Vite interface concept for monitoring industrial and operational-technology cybersecurity environments.

The application presents security posture, asset visibility, findings, attack paths, network relationships, recent changes, sensor health, and operational reports in a dark industrial dashboard.

All metrics, assets, names, and security events are fictional demo data. There is no backend, authentication system, or live sensor integration in this version.

## Features

- Dashboard with posture, findings, risk trend, assets, sites, attack paths, changes, topology, and sensor health.
- Search and severity filtering for the dashboard attack-path preview.
- Asset inventory with status, zone, risk, and score.
- Findings overview with severity filtering.
- Attack Path Map with selectable paths, confidence scores, sequence details, evidence, and risk context.
- Network Map with topology, zone summaries, and network relationships.
- Recent Changes timeline.
- Sensor health, data recency, coverage, and sensor status.
- Reports overview and report catalog.
- Resilience and accessibility design-state examples.
- Local ICS Guard industrial hero and sidebar artwork in SVG format.
- Responsive styling and keyboard-focus states.

## Requirements

- Node.js 18 or newer
- npm

## Getting Started

From the project directory:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Available Commands

```bash
npm run dev       # Start the Vite development server
npm run build     # Create a production build in dist/
npm run preview   # Preview the production build locally
```

## Project Structure

```text
src/
	App.jsx                         Application shell and view selection
	index.css                       Global styles and responsive layout
	main.jsx                        React entry point
	assets/
		heroImage.svg                 Dashboard hero artwork
		sidebarImage.svg              Sidebar industrial artwork
	components/
		Sidebar.jsx                   Primary navigation and branding
		common.jsx                    Shared card, severity, icon, and sparkline UI
		dashboardVisuals.jsx          Charts, donut, topology, and sensor widgets
		industrialAssets.js           Centralized image asset exports
	data/
		mockData.js                   Fictional dashboard and page data
	pages/
		DashboardPage.jsx             Main security overview
		AssetsPage.jsx                Asset inventory
		FindingsPage.jsx              Security findings
		AttackPathPage.jsx            Attack path investigation workspace
		OperationsPages.jsx            Network, changes, sensors, reports, and states
```

## Architecture

`App.jsx` owns the active view and selected attack path. The sidebar changes the active view, while dashboard actions can open a specific attack path or navigate to another page.

Reusable presentation logic lives in `src/components`. Route-level screen implementations live in `src/pages`. The current navigation is intentionally lightweight and state-based; adding a backend or browser URL routing can be done later without changing the page-level boundaries.

## Data and Customization

The demo content is defined in `src/data/mockData.js`. Update that file to change KPI values, findings, risk trends, sites, attack paths, changes, or assets.

The industrial artwork is stored locally in `src/assets`. Replace `heroImage.svg` or `sidebarImage.svg` and keep the exported names in `src/components/industrialAssets.js` to update the visual treatment without changing page components.

## Build Verification

The production build can be checked with:

```bash
npm run build
```

The generated files are written to `dist/`.
