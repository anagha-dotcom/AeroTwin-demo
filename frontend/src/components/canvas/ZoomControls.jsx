import IconButton from '../ui/IconButton';

export default function ZoomControls({ onZoomIn, onZoomOut, onRecenter }) {
  return (
    <div className="at-zoom-controls">
      <IconButton className="at-glass" onClick={onZoomIn} title="Zoom in">
        +
      </IconButton>
      <IconButton className="at-glass" onClick={onZoomOut} title="Zoom out">
        –
      </IconButton>
      <IconButton className="at-glass" onClick={onRecenter} title="Recenter">
        <svg className="at-icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="2" />
          <path d="M12 3 V6 M12 18 V21 M3 12 H6 M18 12 H21" />
        </svg>
      </IconButton>
    </div>
  );
}
