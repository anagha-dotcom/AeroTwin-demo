import FeatureCard from './FeatureCard';

const FEATURES = [
  {
    title: 'Route Planning',
    iconBg: 'var(--at-violet-dim)',
    iconColor: 'var(--at-violet)',
    description:
      'Click to drop waypoints on the mission canvas and AeroTwin threads the flight path between them automatically.',
    icon: (
      <svg className="at-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="6" cy="19" r="2" />
        <circle cx="18" cy="5" r="2" />
        <path d="M8 18 L16 6" />
      </svg>
    ),
  },
  {
    title: 'Hazard Validation',
    iconBg: 'var(--at-magenta-dim)',
    iconColor: 'var(--at-magenta)',
    description:
      'Every segment is checked against power corridors, towers, buildings and flood boundaries with a live safety score.',
    icon: (
      <svg className="at-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 3 L21 19 H3 Z" />
        <path d="M12 9 V13" />
        <circle cx="12" cy="16" r="0.6" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Flight Analysis',
    iconBg: 'var(--at-teal-dim)',
    iconColor: 'var(--at-teal)',
    description:
      'Distance, battery draw and estimated duration update the moment a waypoint moves — no re-submission needed.',
    icon: (
      <svg className="at-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 17 L9 11 L13 15 L21 6" />
        <path d="M21 6 H15 M21 6 V12" />
      </svg>
    ),
  },
  {
    title: 'Disaster Response',
    iconBg: 'var(--at-amber-dim)',
    iconColor: 'var(--at-amber)',
    description:
      'Switch between 18 simulated flood-prone regions across North, South, East and West India in one click.',
    icon: (
      <svg className="at-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2 L12 8 M12 2 C7 2 4 6 4 11 C4 17 8 20 8 20 H16 C16 20 20 17 20 11 C20 6 17 2 12 2Z" />
      </svg>
    ),
  },
  {
    title: 'Mission Insights',
    iconBg: 'var(--at-violet-dim)',
    iconColor: 'var(--at-violet)',
    description:
      'A running mission log and exportable validation report keep every decision traceable after the flight.',
    icon: (
      <svg className="at-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 19 V10 M10 19 V5 M16 19 V13 M22 19 V8" />
      </svg>
    ),
  },
];

export default function FeatureGrid() {
  return (
    <div className="at-feature-grid">
      {FEATURES.map((f, i) => (
        <FeatureCard key={f.title} index={i + 1} icon={f.icon} iconBg={f.iconBg} iconColor={f.iconColor} title={f.title}>
          {f.description}
        </FeatureCard>
      ))}
    </div>
  );
}
