import GlassCard from '../ui/GlassCard';
import { HAZARD_TYPES } from '../../constants/hazardTypes';
import { useMission } from '../../context/MissionContext';

export default function HazardLegend() {
  const { activeTypeFilters, toggleTypeFilter } = useMission();

  return (
    <GlassCard className="at-legend-box">
      <h5>Map Legend</h5>
      {Object.entries(HAZARD_TYPES).map(([key, t]) => {
        const on = activeTypeFilters.has(key);
        return (
          <div key={key} className={`at-legend-item ${on ? '' : 'is-off'}`} onClick={() => toggleTypeFilter(key)}>
            <span className="at-legend-swatch" style={{ background: t.color }} />
            {t.label}
          </div>
        );
      })}
    </GlassCard>
  );
}
