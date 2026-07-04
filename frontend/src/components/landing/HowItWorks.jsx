import GlassCard from '../ui/GlassCard';

const STEPS = [
  { n: '01', title: 'Choose a scenario', body: 'Pick one of eighteen simulated flood regions, each with its own hazard layout.' },
  { n: '02', title: 'Draw the route', body: 'Click across the canvas to lay waypoints from launch site to relief camp.' },
  { n: '03', title: 'Validate', body: 'AeroTwin runs geometric collision checks and returns a safety score instantly.' },
  { n: '04', title: 'Adjust or launch', body: 'Resolve any flagged hazard, or export the cleared route as a mission report.' },
];

export default function HowItWorks() {
  return (
    <div className="at-how">
      {STEPS.map((s) => (
        <GlassCard key={s.n} className="at-hstep">
          <div className="at-hn">STEP {s.n}</div>
          <h4>{s.title}</h4>
          <p>{s.body}</p>
        </GlassCard>
      ))}
    </div>
  );
}
