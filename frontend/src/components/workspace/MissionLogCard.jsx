import GlassCard from '../ui/GlassCard';
import { useMission } from '../../context/MissionContext';

const DOT_COLOR = {
  info: 'var(--at-violet)',
  safe: 'var(--at-teal)',
  unsafe: 'var(--at-magenta)',
  warn: 'var(--at-amber)',
};

export default function MissionLogCard() {
  const { sessionLog } = useMission();

  return (
    <GlassCard className="at-panel-block">
      <h4>
        <svg className="at-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M7 8 H17 M7 12 H17 M7 16 H12" />
        </svg>
        Mission Log
      </h4>

      {sessionLog.length === 0 && <div className="at-empty-state">Mission events will appear here.</div>}

      {sessionLog.map((entry) => (
        <div className="at-log-item" key={entry.id}>
          <div className="at-log-dot" style={{ background: DOT_COLOR[entry.kind] || DOT_COLOR.info }} />
          <div>
            <div className="at-log-time">{entry.time.toLocaleTimeString()}</div>
            {/* eslint-disable-next-line react/no-danger */}
            <div className="at-log-text" dangerouslySetInnerHTML={{ __html: entry.text }} />
          </div>
        </div>
      ))}
    </GlassCard>
  );
}
