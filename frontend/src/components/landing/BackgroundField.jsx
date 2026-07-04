/**
 * Purely decorative: a slowly drifting grid mask plus three blurred
 * color orbs. Fixed-position so it stays put while the page scrolls.
 */
export default function BackgroundField() {
  return (
    <div className="at-bg-field" aria-hidden="true">
      <div className="at-orb at-orb--1" />
      <div className="at-orb at-orb--2" />
      <div className="at-orb at-orb--3" />
    </div>
  );
}
