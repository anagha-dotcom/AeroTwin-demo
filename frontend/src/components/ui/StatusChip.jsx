const LABELS = { idle: 'Idle', safe: 'Approved', unsafe: 'Blocked' };

/**
 * Small colored status indicator used in the Mission Overview panel and
 * anywhere else a mission's current safety state needs a glance-able tag.
 */
export default function StatusChip({ status = 'idle' }) {
  return (
    <span className={`at-status-chip ${status}`}>
      <span className="at-dot" />
      {LABELS[status] || status}
    </span>
  );
}
