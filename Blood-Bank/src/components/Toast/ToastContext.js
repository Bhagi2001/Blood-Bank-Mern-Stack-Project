import React, { createContext, useContext, useMemo, useState } from 'react';

const ToastContext = createContext(undefined);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const push = (message, kind = 'info', timeout = 3000) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(t => [...t, { id, message, kind }]);
    if (timeout) setTimeout(() => dismiss(id), timeout);
  };
  const dismiss = (id) => setToasts(t => t.filter(x => x.id !== id));

  const value = useMemo(() => ({ push, dismiss }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="bb-toasts">
        {toasts.map(t => (
          <div key={t.id} className={`bb-toast bb-toast--${t.kind}`}>{t.message}</div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
