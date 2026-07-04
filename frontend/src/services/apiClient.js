/**
 * Thin fetch wrapper around the AeroTwin API. Every method returns the
 * parsed JSON body (unwrapping is left to callers) and throws a plain
 * Error carrying `.status` on non-2xx responses, so callers can branch
 * on status/code without re-implementing fetch error handling.
 */
const BASE_URL = 'https://aerotwin-demo.onrender.com/api';

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const error = new Error(body.message || `Request to ${path} failed with ${res.status}`);
    error.status = res.status;
    error.code = body.error;
    throw error;
  }

  return res.json();
}

export const apiClient = {
  /** Confirms the backend is reachable and the mock DB is readable. */
  health: () => request('/health'),

  /** All 18 simulated regions (for the scenario switcher). */
  getRegions: () => request('/regions'),
  getRegion: (id) => request(`/regions/${id}`),

  /** Hazard layout + river/road context for a region. */
  getHazards: (regionId) => request(`/hazards?region=${encodeURIComponent(regionId)}`),
  getHazardTypes: () => request('/hazards/types'),
  regenerateHazards: (regionId) => request(`/hazards/${encodeURIComponent(regionId)}/regenerate`, { method: 'POST' }),

  /** Route planning + validation. */
  generateRoute: (regionId) =>
    request('/generate-route', { method: 'POST', body: JSON.stringify({ regionId }) }),
  validateRoute: (regionId, waypoints, missionMeta) =>
    request('/validate-route', {
      method: 'POST',
      body: JSON.stringify({ regionId, waypoints, missionMeta }),
    }),

  /** Mission history. */
  getMissions: (regionId) => request(`/missions${regionId ? `?region=${encodeURIComponent(regionId)}` : ''}`),
  getMission: (id) => request(`/missions/${id}`),
};
