function pointsToPath(points) {
  if (!points.length) return '';
  return `M ${points.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L ')}`;
}

export default function RiverAndRoads({ river = [], roads = [] }) {
  return (
    <>
      {river.length > 0 && (
        <>
          <path d={pointsToPath(river)} fill="none" stroke="#2FB6FF" strokeOpacity="0.55" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
          <path d={pointsToPath(river)} fill="none" stroke="#8FE0FF" strokeOpacity="0.35" strokeWidth="3" strokeLinecap="round" />
        </>
      )}
      {roads.map((road, i) => (
        <line
          key={i}
          x1={road[0][0]}
          y1={road[0][1]}
          x2={road[1][0]}
          y2={road[1][1]}
          stroke="rgba(139,150,168,0.35)"
          strokeWidth="10"
          strokeDasharray="2 14"
          strokeLinecap="round"
        />
      ))}
    </>
  );
}
