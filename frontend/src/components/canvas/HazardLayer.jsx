import { HAZARD_TYPES, POI_SYMBOL } from '../../constants/hazardTypes';

export default function HazardLayer({ hazards = [], activeTypeFilters, breachedIds = [] }) {
  return (
    <>
      {hazards
        .filter((h) => activeTypeFilters.has(h.type))
        .map((h) => {
          const meta = HAZARD_TYPES[h.type];
          const breached = breachedIds.includes(h.id);

          if (meta.hazard) {
            return (
              <g key={h.id}>
                <circle
                  cx={h.cx}
                  cy={h.cy}
                  r={h.r}
                  fill={h.type === 'flood' ? 'url(#at-flood-grad)' : h.type === 'building' ? meta.color : 'url(#at-hazard-grad)'}
                  fillOpacity={h.type === 'building' ? 0.12 : 1}
                  stroke={meta.color}
                  strokeWidth={breached ? 2.6 : 1.4}
                  strokeDasharray={h.type === 'nofly' ? '6 5' : 'none'}
                  filter={breached ? 'url(#at-glow)' : undefined}
                  className={breached ? 'at-hazard-breach-pulse' : undefined}
                />
                <circle cx={h.cx} cy={h.cy} r={4} fill={meta.color} />
                <text x={h.cx} y={h.cy - h.r - 8} textAnchor="middle" fontSize="10.5" fontFamily="JetBrains Mono" fill={meta.color} opacity="0.9">
                  {h.name}
                </text>
              </g>
            );
          }

          return (
            <g key={h.id}>
              <circle cx={h.cx} cy={h.cy} r={10} fill={meta.color} fillOpacity="0.18" stroke={meta.color} strokeWidth="1.6" />
              <text x={h.cx} y={h.cy + 4} textAnchor="middle" fontSize="10" fontWeight="700" fontFamily="Inter" fill={meta.color}>
                {POI_SYMBOL[h.type]}
              </text>
              <text x={h.cx} y={h.cy + 22} textAnchor="middle" fontSize="9.5" fontFamily="JetBrains Mono" fill={meta.color} opacity="0.85">
                {h.name}
              </text>
            </g>
          );
        })}
    </>
  );
}
