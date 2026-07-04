import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MissionWorkspace from './pages/MissionWorkspace';
import Loader from './components/Loader';
import { ToastProvider, useToast } from './context/ToastContext';
import { apiClient } from './services/apiClient';

/**
 * Confirms the backend is reachable before showing the app. If the API
 * is unreachable, AeroTwin still renders — pages are responsible for
 * handling their own empty/error states — but a toast lets the user
 * know the mock backend didn't respond.
 */
function AppShell() {
  const [booting, setBooting] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let cancelled = false;

    async function boot() {
      try {
        await apiClient.health();
      } catch (err) {
        if (!cancelled) {
          toast('Could not reach the AeroTwin API. Is the backend running on :4000?', 'danger');
        }
      } finally {
        if (!cancelled) {
          setFadingOut(true);
          setTimeout(() => !cancelled && setBooting(false), 500);
        }
      }
    }

    boot();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {booting && <Loader fadingOut={fadingOut} />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/workspace" element={<MissionWorkspace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppShell />
    </ToastProvider>
  );
}
