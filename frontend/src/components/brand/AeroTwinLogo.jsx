import { useId } from 'react';

/**
 * The AeroTwin logo: a circular orbit with an arrow/drone-glyph mark,
 * gradient from violet to teal. Deliberately not a generic map pin or
 * drone silhouette — this is the one shape used everywhere the brand
 * appears (landing nav, workspace topbar).
 */
export default function AeroTwinLogo({ size = 34 }) {
  const gradientId = `at-logo-gradient-${useId()}`;
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="18" stroke={`url(#${gradientId})`} strokeWidth="2" />
      <path d="M20 8 L28 24 L20 20 L12 24 Z" fill={`url(#${gradientId})`} />
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="40" y2="40">
          <stop stopColor="#7C8CFF" />
          <stop offset="1" stopColor="#3FE8C5" />
        </linearGradient>
      </defs>
    </svg>
  );
}
