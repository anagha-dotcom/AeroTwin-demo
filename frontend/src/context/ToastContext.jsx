import { createContext, useCallback, useContext, useRef, useState } from 'react';

const ToastContext = createContext(null);

const KIND_COLOR_VAR = {
  info: 'var(--at-violet)',
  success: 'var(--at-teal)',
  danger: 'var(--at-magenta)',
  warn: 'var(--at-amber)',
};

const AUTO_DISMISS_MS = 3200;
const LEAVE_ANIMATION_MS = 380;

/**
 * Wrap the app in <ToastProvider> once (done in App.jsx). Any descendant
 * can then call `const { toast } = useToast()` and `toast('message', 'success')`
 * without prop-drilling a notification list around.
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, leaving: true } : t)));
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, LEAVE_ANIMATION_MS);
  }, []);

  const toast = useCallback(
    (message, kind = 'info') => {
      const id = idRef.current += 1;
      setToasts((prev) => [...prev, { id, message, kind, leaving: false }]);
      setTimeout(() => dismiss(id), AUTO_DISMISS_MS);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="at-toast-container">
        {toasts.map((t) => (
          <div key={t.id} className={`at-glass at-toast ${t.leaving ? 'is-leaving' : ''}`} style={{ borderColor: KIND_COLOR_VAR[t.kind] }}>
            <span className="at-toast-dot" style={{ color: KIND_COLOR_VAR[t.kind] }} />
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used inside <ToastProvider>');
  }
  return ctx;
}
