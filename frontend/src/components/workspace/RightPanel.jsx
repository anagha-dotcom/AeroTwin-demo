import ValidationStatusCard from './ValidationStatusCard';
import LiveAnalyticsCard from './LiveAnalyticsCard';
import AlertsCard from './AlertsCard';
import MissionLogCard from './MissionLogCard';

export default function RightPanel() {
  return (
    <div className="at-panel at-panel--right">
      <ValidationStatusCard />
      <LiveAnalyticsCard />
      <AlertsCard />
      <MissionLogCard />
    </div>
  );
}
