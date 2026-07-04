import { useEffect, useState } from 'react';

function formatElapsed(seconds) {
  const hh = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const mm = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');
  return `${hh}:${mm}:${ss}`;
}

/**
 * Ticks once a second and returns the elapsed time formatted as HH:MM:SS.
 * Restarts from zero whenever `startKey` changes — MissionWorkspace passes
 * the selected region id so switching scenarios resets the mission clock,
 * matching a fresh mission being opened.
 */
export function useMissionTimer(startKey) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    setElapsed(0);
    const startedAt = Date.now();
    const handle = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startedAt) / 1000));
    }, 1000);
    return () => clearInterval(handle);
  }, [startKey]);

  return formatElapsed(elapsed);
}
