import MissionOverviewCard from './MissionOverviewCard';
import WeatherCard from './WeatherCard';
import TimerCard from './TimerCard';
import QuickStatsCard from './QuickStatsCard';

export default function LeftPanel() {
  return (
    <div className="at-panel at-panel--left">
      <MissionOverviewCard />
      <WeatherCard />
      <TimerCard />
      <QuickStatsCard />
    </div>
  );
}
