import React from "react";
import useKeyDown from "../../hooks/useKeyDown";
export const ToastContext = React.createContext();
function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([
    {
      id: crypto.randomUUID(),
      message: "well done",
      variant: "success",
    },
    {
      id: crypto.randomUUID(),
      message: "Oh No",
      variant: "error",
    },
  ]);

  const handleEscape = React.useCallback(() => {
    setToasts([]);
  }, []);

  useKeyDown("Escape", handleEscape);

  function createToast(message, variant) {
    const nextToasts = [
      ...toasts,
      {
        id: crypto.randomUUID(),
        message,
        variant,
      },
    ];

    setToasts(nextToasts);
  }

  function dismissToast(id) {
    const nextToasts = toasts.filter((toast) => {
      return toast.id !== id;
    });

    setToasts(nextToasts);
  }

  return (
    <ToastContext.Provider value={{ toasts, createToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
