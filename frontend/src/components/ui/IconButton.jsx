/**
 * Square icon button used throughout the topbar and canvas toolbar.
 * `active` toggles the highlighted/pressed visual state.
 */
export default function IconButton({ active = false, className = '', children, ...rest }) {
  const classes = ['at-icon-btn', active && 'is-active', className].filter(Boolean).join(' ');
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
