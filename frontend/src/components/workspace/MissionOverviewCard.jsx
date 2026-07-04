import GlassCard from '../ui/GlassCard';
import StatusChip from '../ui/StatusChip';
import { useMission } from '../../context/MissionContext';

export default function MissionOverviewCard() {
  const { missionMeta, validation } = useMission();

  const battery = validation ? 100 - validation.batteryPercent : 100;
  const status = validation ? (validation.safe ? 'safe' : 'unsafe') : 'idle';

  return (
    <GlassCard className="at-panel-block">
      <h4>
        <svg className="at-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 9 H21 M8 4 V2 M16 4 V2" />
        </svg>
        Mission Overview
      </h4>
      <div className="at-kv-row">
        <span className="at-k">Mission Name</span>
        <span className="at-v">{missionMeta?.name || '—'}</span>
      </div>
      <div className="at-kv-row">
        <span className="at-k">Mission ID</span>
        <span className="at-v">{missionMeta?.id || '—'}</span>
      </div>
      <div className="at-kv-row">
        <span className="at-k">Drone Name</span>
        <span className="at-v">{missionMeta?.drone || '—'}</span>
      </div>
      <div className="at-kv-row">
        <span className="at-k">Status</span>
        <StatusChip status={status} />
      </div>
      <div className="at-kv-row">
        <span className="at-k">Operator</span>
        <span className="at-v">{missionMeta?.operator || '—'}</span>
      </div>
      <div style={{ marginTop: 10 }}>
        <div className="at-kv-row">
          <span className="at-k">Battery</span>
          <span className="at-v">{battery}%</span>
        </div>
        <div className="at-battery-track">
          <div className="at-battery-fill" style={{ width: `${Math.max(4, battery)}%` }} />
        </div>
      </div>
      <div className="at-kv-row" style={{ marginTop: 6 }}>
        <span className="at-k">Est. Flight Time</span>
        <span className="at-v">{validation ? `${validation.durationMinutes} min` : '—'}</span>
      </div>
    </GlassCard>
  );
}
