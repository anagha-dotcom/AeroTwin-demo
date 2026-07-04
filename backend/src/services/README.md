# services/

Business logic, kept separate from Express route handlers so it can be
unit-tested without spinning up the HTTP layer.

- `hazardService.js` — loads/generates the per-region hazard datasets (Phase 3)
- `geometryService.js` — segment/circle collision math, safety scoring (Phase 4)
- `missionService.js` — mission log persistence to the mock JSON store (Phase 5)
