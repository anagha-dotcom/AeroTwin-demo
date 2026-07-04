import GlassCard from '../ui/GlassCard';
import { useMission } from '../../context/MissionContext';

const CIRCUMFERENCE = 2 * Math.PI * 34;

export default function ValidationStatusCard() {
  const { validation } = useMission();

  const score = validation?.safetyScore ?? null;
  const safe = validation?.safe ?? null;
  const dash = score !== null ? (score / 100) * CIRCUMFERENCE : 0;
  const arcColor = safe === null ? 'var(--at-violet)' : safe ? 'var(--at-teal)' : 'var(--at-magenta)';
  const statusLabel = validation ? (validation.safe ? 'Mission Approved' : 'Mission Blocked') : 'Not validated';

  return (
    <GlassCard className="at-panel-block">
      <h4>
        <svg className="at-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2 L15 9 L22 10 L17 15 L18 22 L12 18 L6 22 L7 15 L2 10 L9 9 Z" />
        </svg>
        Validation Status
      </h4>
      <div className="at-scoregauge-wrap">
        <div className="at-scoregauge">
          <svg viewBox="0 0 80 80" width="74" height="74">
            <circle cx="40" cy="40" r="34" fill="none" stroke="var(--at-line-strong)" strokeWidth="7" />
            <circle
              cx="40"
              cy="40"
              r="34"
              fill="none"
              stroke={arcColor}
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={`${dash.toFixed(1)} ${CIRCUMFERENCE.toFixed(1)}`}
              transform="rotate(-90 40 40)"
            />
          </svg>
          <div className="at-sg-val" style={{ color: arcColor }}>
            {score !== null ? `${score}%` : '—'}
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div className="at-kv-row">
            <span className="at-k">Safety Score</span>
            <span className="at-v">{score !== null ? `${score}%` : '—'}</span>
          </div>
          <div className="at-kv-row">
            <span className="at-k">Status</span>
            <span className="at-v" style={{ color: safe === null ? 'var(--at-hi)' : arcColor }}>
              {statusLabel}
            </span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
