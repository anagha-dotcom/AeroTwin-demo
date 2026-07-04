import GlassCard from '../ui/GlassCard';
import { useMission } from '../../context/MissionContext';
import { useMissionTimer } from '../../hooks/useMissionTimer';

export default function TimerCard() {
  const { selectedRegionId } = useMission();
  const elapsed = useMissionTimer(selectedRegionId);

  return (
    <GlassCard className="at-panel-block">
      <h4>
        <svg className="at-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7 V12 L15.5 14" />
        </svg>
        Mission Timer
      </h4>
      <div className="at-timer-display">{elapsed}</div>
      <div className="at-timer-sub">Elapsed since mission open</div>
    </GlassCard>
  );
}
