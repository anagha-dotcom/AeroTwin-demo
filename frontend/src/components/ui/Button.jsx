/**
 * Base button primitive. Variants map directly onto the `.at-btn-*`
 * classes in styles/components.css so every button in the app — landing
 * CTAs, canvas toolbar actions, panel controls — shares one definition.
 */
export default function Button({
  variant = 'default', // 'default' | 'primary' | 'ghost'
  size, // undefined | 'sm'
  className = '',
  children,
  ...rest
}) {
  const classes = [
    'at-btn',
    variant === 'primary' && 'at-btn-primary',
    variant === 'ghost' && 'at-btn-ghost',
    size === 'sm' && 'at-btn-sm',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
