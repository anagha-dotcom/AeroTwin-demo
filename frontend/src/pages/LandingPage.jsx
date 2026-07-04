import { useNavigate } from 'react-router-dom';
import '../styles/landing.css';
import BackgroundField from '../components/landing/BackgroundField';
import Nav from '../components/landing/Nav';
import Hero from '../components/landing/Hero';
import FeatureGrid from '../components/landing/FeatureGrid';
import HowItWorks from '../components/landing/HowItWorks';
import Footer from '../components/landing/Footer';

const FEATURES_SECTION_ID = 'features';

/**
 * AeroTwin's landing page: hero, feature grid, process steps, footer.
 * "Start Mission" and "Open Workspace" both route to /workspace, where
 * Phases 8-10 build out the real Mission Workspace.
 */
export default function LandingPage() {
  const navigate = useNavigate();

  const goToWorkspace = () => navigate('/workspace');
  const scrollToFeatures = () =>
    document.getElementById(FEATURES_SECTION_ID)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="at-landing">
      <BackgroundField />

      <Nav onStartMission={goToWorkspace} />

      <Hero onStartMission={goToWorkspace} onSeeHowItWorks={scrollToFeatures} />

      <section className="at-section" id={FEATURES_SECTION_ID}>
        <div className="at-section-head">
          <div className="at-kicker">Mission toolkit</div>
          <h2>Everything a route needs to clear before takeoff</h2>
          <p>Five instruments, one workspace — built around how a rescue coordinator actually thinks through a flight.</p>
        </div>
        <FeatureGrid />
      </section>

      <section className="at-section">
        <div className="at-section-head">
          <div className="at-kicker">Workflow</div>
          <h2>From blank canvas to cleared flight in four steps</h2>
        </div>
        <HowItWorks />
      </section>

      <Footer />
    </div>
  );
}
