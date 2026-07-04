/**
 * The frosted-glass surface used for every panel, card, and dropdown in
 * AeroTwin. `as` lets a caller render it as a `<section>`, `<div>`, etc.
 */
export default function GlassCard({ as: Tag = 'div', className = '', children, ...rest }) {
  return (
    <Tag className={`at-glass at-card ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
