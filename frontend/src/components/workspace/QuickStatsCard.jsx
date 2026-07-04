import GlassCard from '../ui/GlassCard';
import { useMission } from '../../context/MissionContext';
import { routeLengthKm } from '../../utils/routeMath';

export default function QuickStatsCard() {
  const { waypoints, validation } = useMission();

  const distanceKm = validation ? validation.distanceKm : routeLengthKm(waypoints);
  const batteryPercent = validation ? validation.batteryPercent : 0;
  const hazardsNearby = validation ? validation.hazardsCrossed : 0;

  return (
    <GlassCard className="at-panel-block">
      <h4>
        <svg className="at-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 19 V10 M10 19 V5 M16 19 V13 M22 19 V8" />
        </svg>
        Quick Statistics
      </h4>
      <div className="at-mini-stat-grid">
        <div className="at-mini-stat">
          <div className="at-ms-icon">
            <svg className="at-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="6" cy="19" r="2" />
              <circle cx="18" cy="5" r="2" />
              <path d="M8 18 L16 6" />
            </svg>
          </div>
          <div className="at-ms-val">{waypoints.length}</div>
          <div className="at-ms-lbl">Waypoints</div>
        </div>
        <div className="at-mini-stat">
          <div className="at-ms-icon">
            <svg className="at-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12 H21 M3 6 H21 M3 18 H21" />
            </svg>
          </div>
          <div className="at-ms-val">{distanceKm.toFixed(2)} km</div>
          <div className="at-ms-lbl">Route length</div>
        </div>
        <div className="at-mini-stat">
          <div className="at-ms-icon">
            <svg className="at-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3 L21 19 H3 Z" />
            </svg>
          </div>
          <div className="at-ms-val">{hazardsNearby}</div>
          <div className="at-ms-lbl">Hazards crossed</div>
        </div>
        <div className="at-mini-stat">
          <div className="at-ms-icon">
            <svg className="at-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2 L12 8 M12 2 C7 2 4 6 4 11 C4 17 8 20 8 20 H16 C16 20 20 17 20 11 C20 6 17 2 12 2Z" />
            </svg>
          </div>
          <div className="at-ms-val">{batteryPercent}%</div>
          <div className="at-ms-lbl">Est. battery use</div>
        </div>
      </div>
    </GlassCard>
  );
}
