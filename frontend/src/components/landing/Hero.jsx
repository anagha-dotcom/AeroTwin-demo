import Button from '../ui/Button';

export default function Hero({ onStartMission, onSeeHowItWorks }) {
  return (
    <div className="at-hero">
      <div className="at-eyebrow">
        <span className="at-dot" /> Demonstration platform · Simulated data only
      </div>
      <h1>
        Plan drone rescue flights
        <br />
        before the <span className="at-grad">first hazard finds you.</span>
      </h1>
      <p>
        AeroTwin is a geospatial mission workspace for disaster response teams. Draw a flight path
        over a simulated flood zone, and validate it against power lines, towers, buildings and
        no-fly corridors — before a drone ever leaves the ground.
      </p>
      <div className="at-hero-cta">
        <Button variant="primary" onClick={onStartMission}>
          <svg className="at-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 20 L20 4 M20 4 L11 4 M20 4 L20 13" />
          </svg>
          Start Mission
        </Button>
        <Button onClick={onSeeHowItWorks}>See how it works</Button>
      </div>
      <div className="at-hero-stats">
        <div className="at-stat">
          <div className="at-num">18</div>
          <div className="at-lbl">Simulated regions</div>
        </div>
        <div className="at-stat">
          <div className="at-num">120+</div>
          <div className="at-lbl">Mock hazards mapped</div>
        </div>
        <div className="at-stat">
          <div className="at-num">&lt;400ms</div>
          <div className="at-lbl">Route validation</div>
        </div>
      </div>
    </div>
  );
}
