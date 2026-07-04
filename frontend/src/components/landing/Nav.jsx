import AeroTwinLogo from '../brand/AeroTwinLogo';
import Button from '../ui/Button';

export default function Nav({ onStartMission }) {
  return (
    <nav className="at-nav">
      <div className="at-brand">
        <AeroTwinLogo size={34} />
        AeroTwin
      </div>
      <div className="at-nav-links">
        <span>Route Planning</span>
        <span>Hazard Validation</span>
        <span>Mission Insights</span>
        <span>Regions</span>
      </div>
      <Button onClick={onStartMission}>Open Workspace</Button>
    </nav>
  );
}
