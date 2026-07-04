import GlassCard from '../ui/GlassCard';
import IconButton from '../ui/IconButton';
import Button from '../ui/Button';
import { useMission } from '../../context/MissionContext';

export default function CanvasToolbar() {
  const { waypoints, undoWaypoint, resetRoute, generateRandomRoute } = useMission();

  return (
    <GlassCard className="at-canvas-toolbar">
      <IconButton title="Undo last point (U)" onClick={undoWaypoint} disabled={waypoints.length === 0}>
        <svg className="at-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 14 L4 9 L9 4" />
          <path d="M4 9 H14 C18 9 20 12 20 15 C20 18 18 20 15 20 H10" />
        </svg>
      </IconButton>
      <IconButton title="Generate random route (G)" onClick={generateRandomRoute}>
        <svg className="at-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 12 Q8 4 12 12 T21 12" />
          <circle cx="3" cy="12" r="1.4" fill="currentColor" />
          <circle cx="21" cy="12" r="1.4" fill="currentColor" />
        </svg>
      </IconButton>
      <IconButton title="Reset mission (R)" onClick={resetRoute} disabled={waypoints.length === 0}>
        <svg className="at-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4 V9 H9" />
          <path d="M4.6 15 A8 8 0 1 0 6 6.3 L4 9" />
        </svg>
      </IconButton>
      <div className="at-sep" />
      <Button variant="primary" size="sm" disabled title="Wired up in Phase 10">
        <svg className="at-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 6 L9 17 L4 12" />
        </svg>
        Validate Route
      </Button>
    </GlassCard>
  );
}
