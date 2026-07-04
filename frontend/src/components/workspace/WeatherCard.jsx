import GlassCard from '../ui/GlassCard';
import { useMission } from '../../context/MissionContext';

export default function WeatherCard() {
  const { missionMeta } = useMission();
  const weather = missionMeta?.weather;

  return (
    <GlassCard className="at-panel-block">
      <h4>
        <svg className="at-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2 C7 2 4 6 4 11 C4 17 12 22 12 22 C12 22 20 17 20 11 C20 6 17 2 12 2Z" />
        </svg>
        Weather (Mock)
      </h4>
      <div className="at-kv-row">
        <span className="at-k">Condition</span>
        <span className="at-v">{weather?.condition || '—'}</span>
      </div>
      <div className="at-kv-row">
        <span className="at-k">Wind Speed</span>
        <span className="at-v">{weather?.wind || '—'}</span>
      </div>
      <div className="at-kv-row">
        <span className="at-k">Temperature</span>
        <span className="at-v">{weather?.temp || '—'}</span>
      </div>
    </GlassCard>
  );
}
