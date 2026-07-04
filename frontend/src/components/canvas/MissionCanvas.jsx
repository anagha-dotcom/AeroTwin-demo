import { useEffect, useRef } from 'react';
import GlassCard from '../ui/GlassCard';
import CanvasToolbar from './CanvasToolbar';
import ZoomControls from './ZoomControls';
import HazardLegend from './HazardLegend';
import CanvasDefs from './CanvasDefs';
import RiverAndRoads from './RiverAndRoads';
import HazardLayer from './HazardLayer';
import RouteLayer from './RouteLayer';
import { useMission } from '../../context/MissionContext';
import { useCanvasPanZoom } from '../../hooks/useCanvasPanZoom';

export default function MissionCanvas() {
  const { hazardData, hazardsLoading, hazardsError, waypoints, addWaypoint, validation, activeTypeFilters } = useMission();

  const svgRef = useRef(null);
  const worldRef = useRef(null);

  const canvasWidth = hazardData?.canvas?.width || 1200;
  const canvasHeight = hazardData?.canvas?.height || 760;

  const { view, zoom, recenter, onMouseDown, onMouseMove, onMouseUp, onWheelNative } = useCanvasPanZoom({
    svgRef,
    worldRef,
    onPlacePoint: addWaypoint,
  });

  // Attached natively (not via React's onWheel) so preventDefault actually
  // stops the page from scrolling while the user zooms the canvas.
  useEffect(() => {
    const node = svgRef.current;
    if (!node) return undefined;
    node.addEventListener('wheel', onWheelNative, { passive: false });
    return () => node.removeEventListener('wheel', onWheelNative);
  }, [onWheelNative]);

  const breachedIds = validation?.breachedHazards?.map((b) => b.id) || [];

  return (
    <div className="at-canvas-wrap">
      <CanvasToolbar />

      <GlassCard className="at-hint-box">
        Click canvas to drop a <b>waypoint</b>. Drag to <b>pan</b>, scroll to <b>zoom</b>. Route connects
        automatically.
      </GlassCard>

      {hazardsError && (
        <div className="at-canvas-placeholder">
          <h5>Could not load this region</h5>
          <p>{hazardsError.message || 'The hazard data request failed. Is the backend running on :4000?'}</p>
        </div>
      )}

      {!hazardsError && hazardsLoading && (
        <div className="at-canvas-placeholder">
          <div className="at-loader-ring" style={{ margin: '0 auto 16px' }} />
          <p>Loading hazard layout…</p>
        </div>
      )}

      {!hazardsError && !hazardsLoading && hazardData && (
        <svg
          ref={svgRef}
          className="at-canvas-svg"
          viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
        >
          <CanvasDefs />
          <rect x="0" y="0" width={canvasWidth} height={canvasHeight} fill="url(#at-grid-pattern)" />
          <g ref={worldRef} transform={`translate(${view.tx},${view.ty}) scale(${view.scale})`}>
            <RiverAndRoads river={hazardData.river} roads={hazardData.roads} />
            <HazardLayer hazards={hazardData.hazards} activeTypeFilters={activeTypeFilters} breachedIds={breachedIds} />
            <RouteLayer waypoints={waypoints} validation={validation} />
          </g>
        </svg>
      )}

      <HazardLegend />
      <ZoomControls onZoomIn={() => zoom(1.2)} onZoomOut={() => zoom(0.8)} onRecenter={recenter} />
    </div>
  );
}
