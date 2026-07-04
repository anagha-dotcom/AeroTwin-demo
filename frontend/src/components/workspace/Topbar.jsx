import { useNavigate } from 'react-router-dom';
import AeroTwinLogo from '../brand/AeroTwinLogo';
import IconButton from '../ui/IconButton';
import Button from '../ui/Button';
import ScenarioSelect from './ScenarioSelect';

/**
 * Keyboard shortcuts, export, and theme toggle are rendered here now so
 * the layout is final, but they're inert until Phase 11 wires up their
 * behavior (shortcuts modal, report export, dark/light theme).
 */
export default function Topbar() {
  const navigate = useNavigate();

  return (
    <div className="at-topbar">
      <div className="at-topbar-left">
        <div className="at-topbar-brand">
          <AeroTwinLogo size={24} />
          AeroTwin
        </div>
        <ScenarioSelect />
      </div>
      <div className="at-topbar-right">
        <IconButton title="Keyboard shortcuts (Phase 11)" disabled>
          <svg className="at-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="6" width="18" height="12" rx="2" />
            <path d="M7 10h0M11 10h0M15 10h0M7 14h6" />
          </svg>
        </IconButton>
        <IconButton title="Export validation report (Phase 11)" disabled>
          <svg className="at-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 3 V15 M7 10 L12 15 L17 10" />
            <path d="M4 19 H20" />
          </svg>
        </IconButton>
        <IconButton title="Toggle theme (Phase 11)" disabled>
          <svg className="at-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.4 1.4M17.6 17.6L19 19M19 5l-1.4 1.4M6.4 17.6L5 19" />
          </svg>
        </IconButton>
        <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
          Exit
        </Button>
      </div>
    </div>
  );
}
