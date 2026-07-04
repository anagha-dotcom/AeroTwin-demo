# AeroTwin

**Smart Geospatial Mission Planning Platform for Autonomous Disaster Response.**

AeroTwin is a hackathon prototype that lets disaster-response teams draw a
drone flight path over a simulated flood-affected region and validate it
against mapped hazards (power lines, towers, buildings, flooded zones,
no-fly corridors) before the drone ever takes off.

> ⚠️ **Demonstration platform.** All hazard, weather, and mission data in
> this project is simulated for prototyping purposes. AeroTwin is not a
> certified operational safety system.

## Monorepo layout

```
aerotwin/
├── backend/            Node.js + Express API, mock JSON "database"
│   └── src/
│       ├── data/           static + generated JSON datasets
│       ├── routes/         Express route definitions
│       ├── controllers/    request handlers
│       ├── services/       business logic (hazard generation, geometry engine)
│       └── utils/          shared helpers
└── frontend/           React + Vite single-page app
    └── src/
        ├── components/     reusable UI building blocks
        ├── pages/           Landing + Mission Workspace
        ├── services/        API client
        ├── hooks/           shared React hooks
        └── styles/          design tokens & global CSS
```

## Build plan (executed one phase at a time)

| Phase | Scope |
|-------|-------|
| 1 | Project scaffolding, architecture, design tokens *(this phase)* |
| 2 | Backend: Express server, middleware, mock JSON "database" wiring |
| 3 | Backend: simulated hazard datasets for 18 flood-prone regions |
| 4 | Backend: geometry engine + `POST /validate-route` |
| 5 | Backend: `POST /generate-route`, `GET /missions`, mission log/history |
| 6 | Frontend: app shell, routing, global styles, API client |
| 7 | Frontend: Landing page |
| 8 | Frontend: Mission Workspace layout (left/right panels, static) |
| 9 | Frontend: Mission Canvas (SVG grid, pan/zoom, waypoints, hazards) |
| 10 | Frontend: live route validation wired to backend, alerts, analytics |
| 11 | Frontend: theming, notifications, export, shortcuts, mission history |
| 12 | Polish, empty/error states, responsive pass, final integration + docs |

## Running locally (available from Phase 2 onward)

```bash
# backend
cd backend && npm install && npm run dev   # http://localhost:4000

# frontend
cd frontend && npm install && npm run dev  # http://localhost:5173
```

## Tech stack

- **Frontend:** React, Vite, Tailwind-free custom design system (CSS variables),
  HTML SVG canvas, Framer Motion, Lucide icons
- **Backend:** Node.js, Express.js
- **Database:** mock JSON files (no external DB needed for the prototype)
