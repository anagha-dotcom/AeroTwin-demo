function pointsToPath(points) {
  if (!points.length) return '';
  return `M ${points.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' L ')}`;
}

export default function RouteLayer({ waypoints = [], validation }) {
  if (waypoints.length === 0) return null;

  const routeColor = !validation ? 'var(--at-violet)' : validation.safe ? 'var(--at-teal)' : 'var(--at-magenta)';
  const path = pointsToPath(waypoints);

  return (
    <>
      <path d={path} fill="none" stroke={routeColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.35" filter="url(#at-glow)" />
      <path d={path} fill="none" stroke={routeColor} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />

      {waypoints.map((w, i) => {
        const isFirst = i === 0;
        const isLast = i === waypoints.length - 1;
        const fill = isFirst ? 'var(--at-teal)' : isLast ? 'var(--at-magenta)' : routeColor;
        return (
          <g key={i}>
            <circle cx={w.x} cy={w.y} r={7} fill={fill} stroke="var(--at-void)" strokeWidth="2" />
            <text x={w.x} y={w.y + 3.5} textAnchor="middle" fontSize="8.5" fontWeight="700" fontFamily="JetBrains Mono" fill="var(--at-void)">
              {i + 1}
            </text>
          </g>
        );
      })}

      {validation && !validation.safe && validation.collisionPoint && (
        <>
          <circle
            cx={validation.collisionPoint.x}
            cy={validation.collisionPoint.y}
            r={9}
            fill="none"
            stroke="var(--at-magenta)"
            strokeWidth="2"
            className="at-hazard-breach-pulse"
          />
          <circle cx={validation.collisionPoint.x} cy={validation.collisionPoint.y} r={3} fill="var(--at-magenta)" />
        </>
      )}
    </>
  );
}
