import GlassCard from '../ui/GlassCard';

export default function FeatureCard({ index, icon, iconBg, iconColor, title, children }) {
  return (
    <GlassCard className="at-fcard">
      <span className="at-fnum">{String(index).padStart(2, '0')}</span>
      <div className="at-ficon" style={{ background: iconBg, color: iconColor }}>
        {icon}
      </div>
      <h3>{title}</h3>
      <p>{children}</p>
    </GlassCard>
  );
}
