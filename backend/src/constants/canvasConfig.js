/**
 * The mission canvas is an abstract coordinate space, not real lat/lng —
 * AeroTwin explicitly avoids mimicking a real map product. These
 * constants define that space so the hazard generator (Phase 3), the
 * geometry engine (Phase 4), and the frontend canvas (Phase 9) all agree
 * on what a "unit" means.
 */
module.exports = {
  CANVAS_WIDTH: 1200,
  CANVAS_HEIGHT: 760,
  // 1 canvas unit == 4 simulated meters. Used to convert route length in
  // canvas units into a realistic-looking km figure for the UI.
  METERS_PER_UNIT: 4,
};
