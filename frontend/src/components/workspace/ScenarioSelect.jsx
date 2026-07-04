import { useEffect, useMemo, useRef, useState } from 'react';
import { useMission } from '../../context/MissionContext';

const ZONE_ORDER = ['North India', 'South India', 'East India', 'West India'];

export default function ScenarioSelect() {
  const { regions, regionsLoading, selectedRegion, selectRegion, addLog } = useMission();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = regions.filter(
      (r) => !q || r.name.toLowerCase().includes(q) || r.state.toLowerCase().includes(q)
    );
    return ZONE_ORDER.map((zone) => ({
      zone,
      items: matches.filter((r) => r.zone === zone),
    })).filter((g) => g.items.length);
  }, [regions, query]);

  function handlePick(region) {
    selectRegion(region.id);
    addLog(`Scenario switched to <b>${region.name}</b> (${region.state}).`, 'info');
    setOpen(false);
  }

  return (
    <div className="at-scenario-select" ref={containerRef}>
      <button className="at-scenario-btn" onClick={() => setOpen((v) => !v)} type="button">
        <svg className="at-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2 C7 2 4 6 4 11 C4 17 12 22 12 22 C12 22 20 17 20 11 C20 6 17 2 12 2Z" />
          <circle cx="12" cy="11" r="3" />
        </svg>
        <span>
          {regionsLoading ? 'Loading regions…' : selectedRegion ? selectedRegion.name : 'Select a scenario…'}
        </span>
        <svg className="at-icon-sm" style={{ marginLeft: 'auto' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9 L12 15 L18 9" />
        </svg>
      </button>

      {open && (
        <div className="at-glass at-scenario-dropdown">
          <input
            className="at-scenario-search"
            placeholder="Search regions or states…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          {grouped.length === 0 && <div className="at-empty-state">No regions match your search.</div>}
          {grouped.map((g) => (
            <div key={g.zone}>
              <div className="at-scenario-group-label">{g.zone}</div>
              {g.items.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  className={`at-scenario-item ${selectedRegion?.id === r.id ? 'is-active' : ''}`}
                  onClick={() => handlePick(r)}
                >
                  <span className="at-si-title">{r.name}</span>
                  <span className="at-si-sub">
                    {r.state} · {r.river} basin
                  </span>
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
