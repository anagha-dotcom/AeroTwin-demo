import { useCallback, useRef, useState } from 'react';

const DRAG_THRESHOLD_PX = 4;
const MIN_SCALE = 0.35;
const MAX_SCALE = 3;

/**
 * Encapsulates the mission canvas's pan/zoom transform and the
 * click-vs-drag disambiguation needed so a plain click places a
 * waypoint while a drag pans the view instead.
 *
 * Usage: attach `bind` handlers to the <svg>, read `view` for the
 * transform, and pass an `onPlacePoint(worldX, worldY)` callback for
 * genuine clicks.
 */
export function useCanvasPanZoom({ svgRef, worldRef, onPlacePoint, initial = { scale: 0.85, tx: 60, ty: 40 } }) {
  const [view, setView] = useState(initial);
  const panState = useRef(null); // { startX, startY, viewStart, dragged }

  const zoom = useCallback((factor) => {
    setView((v) => ({ ...v, scale: Math.min(MAX_SCALE, Math.max(MIN_SCALE, v.scale * factor)) }));
  }, []);

  const recenter = useCallback(() => setView(initial), [initial]);

  const screenToWorld = useCallback(
    (clientX, clientY) => {
      if (!svgRef.current || !worldRef.current) return { x: 0, y: 0 };
      const pt = svgRef.current.createSVGPoint();
      pt.x = clientX;
      pt.y = clientY;
      const ctm = worldRef.current.getScreenCTM();
      if (!ctm) return { x: 0, y: 0 };
      const world = pt.matrixTransform(ctm.inverse());
      return { x: world.x, y: world.y };
    },
    [svgRef, worldRef]
  );

  const onMouseDown = useCallback(
    (e) => {
      panState.current = { startX: e.clientX, startY: e.clientY, viewStart: view, dragged: false };
    },
    [view]
  );

  const onMouseMove = useCallback((e) => {
    const state = panState.current;
    if (!state) return;
    const dx = e.clientX - state.startX;
    const dy = e.clientY - state.startY;
    if (!state.dragged && Math.hypot(dx, dy) > DRAG_THRESHOLD_PX) {
      state.dragged = true;
    }
    if (state.dragged) {
      setView({ ...state.viewStart, tx: state.viewStart.tx + dx, ty: state.viewStart.ty + dy });
    }
  }, []);

  const onMouseUp = useCallback(
    (e) => {
      const state = panState.current;
      panState.current = null;
      if (state && !state.dragged) {
        const world = screenToWorld(e.clientX, e.clientY);
        onPlacePoint?.(world);
      }
    },
    [onPlacePoint, screenToWorld]
  );

  // Attached manually via useEffect + addEventListener({ passive: false })
  // by the canvas component, since React's synthetic onWheel is passive
  // by default and can't preventDefault to stop page scroll while zooming.
  const onWheelNative = useCallback((e) => {
    e.preventDefault();
    zoom(e.deltaY < 0 ? 1.1 : 0.9);
  }, [zoom]);

  return {
    view,
    isPanning: !!panState.current?.dragged,
    zoom,
    recenter,
    screenToWorld,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onWheelNative,
  };
}
