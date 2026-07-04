/**
 * Full-screen loading state. Used once at app boot to confirm the API is
 * reachable before showing any page (Phase 6), and reusable later for
 * any other "working on it" moment (route validation, exports, etc.).
 */
export default function Loader({ message = 'INITIALIZING AEROTWIN…', fadingOut = false }) {
  return (
    <div className="at-loader-screen" style={{ opacity: fadingOut ? 0 : 1 }}>
      <div className="at-loader-ring" />
      <p>{message}</p>
    </div>
  );
}
