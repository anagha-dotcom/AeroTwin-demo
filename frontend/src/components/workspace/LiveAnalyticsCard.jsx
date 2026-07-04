import GlassCard from '../ui/GlassCard';
import { useMission } from '../../context/MissionContext';
import { routeLengthKm } from '../../utils/routeMath';

export default function LiveAnalyticsCard() {
  const { waypoints, validation } = useMission();

  const distanceKm = validation ? validation.distanceKm : routeLengthKm(waypoints);
  const closest = validation?.closestHazard;

  return (
    <GlassCard className="at-panel-block">
      <h4>
        <svg className="at-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 19 V10 M10 19 V5 M16 19 V13 M22 19 V8" />
        </svg>
        Live Analytics
      </h4>
      <div className="at-kv-row">
        <span className="at-k">Route Length</span>
        <span className="at-v">{distanceKm.toFixed(2)} km</span>
      </div>
      <div className="at-kv-row">
        <span className="at-k">Hazards Crossed</span>
        <span className="at-v">{validation ? validation.hazardsCrossed : 0}</span>
      </div>
      <div className="at-kv-row">
        <span className="at-k">Closest Hazard</span>
        <span className="at-v">{closest ? `${closest.name} (${closest.clearanceMeters}m)` : '—'}</span>
      </div>
      <div className="at-kv-row">
        <span className="at-k">Battery Consumption</span>
        <span className="at-v">{validation ? `${validation.batteryPercent}%` : '0%'}</span>
      </div>
      <div className="at-kv-row">
        <span className="at-k">Est. Flight Duration</span>
        <span className="at-v">{validation ? `${validation.durationMinutes} min` : '—'}</span>
      </div>
    </GlassCard>
  );
}
