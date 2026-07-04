/**
 * All reusable <defs> for the mission canvas: the background grid
 * pattern, radial gradients for flood/hazard fills, and a soft glow
 * filter applied to the active route and breached hazards.
 */
export default function CanvasDefs() {
  return (
    <defs>
      <pattern id="at-grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M40 0 L0 0 0 40" fill="none" stroke="var(--at-line-strong)" strokeWidth="1" />
      </pattern>
      <radialGradient id="at-flood-grad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#2FB6FF" stopOpacity="0.55" />
        <stop offset="100%" stopColor="#2FB6FF" stopOpacity="0.05" />
      </radialGradient>
      <radialGradient id="at-hazard-grad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FF4F8B" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#FF4F8B" stopOpacity="0.02" />
      </radialGradient>
      <filter id="at-glow" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}
