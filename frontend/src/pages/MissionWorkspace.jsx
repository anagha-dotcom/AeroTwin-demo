import '../styles/workspace.css';
import { MissionProvider } from '../context/MissionContext';
import Topbar from '../components/workspace/Topbar';
import LeftPanel from '../components/workspace/LeftPanel';
import MissionCanvas from '../components/canvas/MissionCanvas';
import RightPanel from '../components/workspace/RightPanel';

/**
 * The Mission Workspace shell: topbar + three-panel grid. The canvas is
 * now the real interactive hazard map (Phase 9). Validate Route stays
 * disabled until Phase 10 wires POST /validate-route into it.
 */
export default function MissionWorkspace() {
  return (
    <MissionProvider>
      <div className="at-workspace">
        <Topbar />
        <div className="at-workspace-body">
          <LeftPanel />
          <MissionCanvas />
          <RightPanel />
        </div>
      </div>
    </MissionProvider>
  );
}
