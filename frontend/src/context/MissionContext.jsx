import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { apiClient } from '../services/apiClient';
import { buildMissionMeta } from '../utils/mockMissionMeta';
import { HAZARD_TYPES } from '../constants/hazardTypes';

const MissionContext = createContext(null);

/**
 * Central state for the Mission Workspace. Built out incrementally:
 *
 *  Phase 8: region list + selection, per-region mission metadata
 *    (mock weather/drone/operator), and a live session log.
 *  Phase 9 (this phase): hazard layout + waypoints for the mission canvas.
 *  Phase 10 adds: route validation results wired to the backend.
 *
 * Keeping this in one provider now means the canvas and the left/right
 * panels can all read/write the same source of truth without prop
 * drilling, once later phases add to it.
 */
export function MissionProvider({ children }) {
  const [regions, setRegions] = useState([]);
  const [regionsLoading, setRegionsLoading] = useState(true);
  const [regionsError, setRegionsError] = useState(null);
  const [selectedRegionId, setSelectedRegionId] = useState(null);
  const [missionMeta, setMissionMeta] = useState(null);
  const [sessionLog, setSessionLog] = useState([]);

  const [waypoints, setWaypoints] = useState([]);
  const [validation, setValidation] = useState(null); // wired up in Phase 10

  const [hazardData, setHazardData] = useState(null); // { hazards, river, roads, canvas }
  const [hazardsLoading, setHazardsLoading] = useState(false);
  const [hazardsError, setHazardsError] = useState(null);
  const [activeTypeFilters, setActiveTypeFilters] = useState(() => new Set(Object.keys(HAZARD_TYPES)));

  const logIdRef = useRef(0);

  const addLog = useCallback((text, kind = 'info') => {
    logIdRef.current += 1;
    setSessionLog((prev) => [{ id: logIdRef.current, text, kind, time: new Date() }, ...prev].slice(0, 40));
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function loadRegions() {
      try {
        const { regions: list } = await apiClient.getRegions();
        if (cancelled) return;
        setRegions(list);
        if (list.length) {
          setSelectedRegionId(list[0].id);
        }
      } catch (err) {
        if (!cancelled) setRegionsError(err);
      } finally {
        if (!cancelled) setRegionsLoading(false);
      }
    }
    loadRegions();
    return () => {
      cancelled = true;
    };
  }, []);

  const selectRegion = useCallback((regionId) => {
    setSelectedRegionId(regionId);
    setWaypoints([]);
    setValidation(null);
  }, []);

  const selectedRegion = useMemo(
    () => regions.find((r) => r.id === selectedRegionId) || null,
    [regions, selectedRegionId]
  );

  // Regenerate the current-session mission meta (name/id/drone/operator/weather)
  // whenever the selected region changes.
  useEffect(() => {
    if (!selectedRegion) {
      setMissionMeta(null);
      return;
    }
    const meta = buildMissionMeta(selectedRegion, Date.now());
    setMissionMeta(meta);
    setSessionLog([]);
    addLog(`Mission workspace initialized for <b>${selectedRegion.name}</b> (${selectedRegion.state}).`, 'info');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRegion?.id]);

  // Load the hazard layout (hazards, river, roads, canvas size) whenever
  // the selected region changes — this is what the Mission Canvas draws.
  useEffect(() => {
    if (!selectedRegionId) return undefined;
    let cancelled = false;
    setHazardsLoading(true);
    setHazardsError(null);
    apiClient
      .getHazards(selectedRegionId)
      .then((data) => {
        if (!cancelled) setHazardData(data);
      })
      .catch((err) => {
        if (!cancelled) setHazardsError(err);
      })
      .finally(() => {
        if (!cancelled) setHazardsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [selectedRegionId]);

  const toggleTypeFilter = useCallback((typeKey) => {
    setActiveTypeFilters((prev) => {
      const next = new Set(prev);
      if (next.has(typeKey)) next.delete(typeKey);
      else next.add(typeKey);
      return next;
    });
  }, []);

  const addWaypoint = useCallback(
    (point) => {
      setWaypoints((prev) => [...prev, point]);
      setValidation(null);
      addLog(`Waypoint <b>#${waypoints.length + 1}</b> placed at (${Math.round(point.x)}, ${Math.round(point.y)}).`, 'info');
    },
    [addLog, waypoints.length]
  );

  const undoWaypoint = useCallback(() => {
    setWaypoints((prev) => prev.slice(0, -1));
    setValidation(null);
    addLog('Last waypoint removed.', 'warn');
  }, [addLog]);

  const resetRoute = useCallback(() => {
    setWaypoints([]);
    setValidation(null);
    addLog('Mission reset. Route cleared.', 'warn');
  }, [addLog]);

  const generateRandomRoute = useCallback(async () => {
    if (!selectedRegionId) return;
    try {
      const { waypoints: generated } = await apiClient.generateRoute(selectedRegionId);
      setWaypoints(generated);
      setValidation(null);
      addLog(`Generated a random ${generated.length}-point route for quick testing.`, 'info');
    } catch (err) {
      addLog('Failed to generate a random route.', 'unsafe');
    }
  }, [selectedRegionId, addLog]);

  const value = {
    regions,
    regionsLoading,
    regionsError,
    selectedRegionId,
    selectedRegion,
    selectRegion,
    missionMeta,
    sessionLog,
    addLog,
    waypoints,
    setWaypoints,
    addWaypoint,
    undoWaypoint,
    resetRoute,
    generateRandomRoute,
    validation,
    setValidation,
    hazardData,
    hazardsLoading,
    hazardsError,
    activeTypeFilters,
    toggleTypeFilter,
  };

  return <MissionContext.Provider value={value}>{children}</MissionContext.Provider>;
}

export function useMission() {
  const ctx = useContext(MissionContext);
  if (!ctx) {
    throw new Error('useMission must be used inside <MissionProvider>');
  }
  return ctx;
}
