import GlassCard from '../ui/GlassCard';
import { useMission } from '../../context/MissionContext';

export default function AlertsCard() {
  const { validation } = useMission();

  return (
    <GlassCard className="at-panel-block">
      <h4>
        <svg className="at-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3 L21 19 H3 Z" />
          <path d="M12 9 V13" />
          <circle cx="12" cy="16" r="0.6" fill="currentColor" />
        </svg>
        Alerts
      </h4>

      {!validation && (
        <div className="at-empty-state">No active alerts. Validate a route to check for hazards.</div>
      )}

      {validation?.safe && (
        <div className="at-success-card">
          <div className="at-sc-head">
            <svg className="at-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6 L9 17 L4 12" />
            </svg>
            MISSION APPROVED
          </div>
          <div className="at-ac-row" style={{ marginTop: 8 }}>
            <span>Safety Score</span>
            <b>{validation.safetyScore}%</b>
          </div>
          <div className="at-ac-row">
            <span>Closest Hazard</span>
            <b>{validation.closestHazard?.clearanceMeters}m clear</b>
          </div>
        </div>
      )}

      {validation && !validation.safe && (
        <div className="at-alert-card">
          <div className="at-ac-head">
            <svg className="at-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3 L21 19 H3 Z" />
              <path d="M12 9 V13" />
              <circle cx="12" cy="16" r="0.6" fill="currentColor" />
            </svg>
            CRITICAL ROUTE VIOLATION
          </div>
          <div className="at-ac-row">
            <span>Hazard</span>
            <b>{validation.breachedHazards[0]?.name}</b>
          </div>
          <div className="at-ac-row">
            <span>Safety Score</span>
            <b>{validation.safetyScore}%</b>
          </div>
          <div className="at-ac-row">
            <span>Hazards Crossed</span>
            <b>{validation.hazardsCrossed}</b>
          </div>
          <div className="at-ac-note">{validation.suggestion}</div>
        </div>
      )}
    </GlassCard>
  );
}
