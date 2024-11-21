import React, { Children } from "react";

import Button from "../Button";

import styles from "./ToastPlayground.module.css";

import ToastShelf from "../ToastShelf/ToastShelf";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
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
  const [message, setMessage] = React.useState("");
  const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0]);

  function handleCreateToast(event) {
    event.preventDefault();
    const nextToasts = [
      ...toasts,
      {
        id: crypto.randomUUID(),
        message,
        variant,
      },
    ];

    setToasts(nextToasts);
    setMessage("");
    setVariant(VARIANT_OPTIONS[0]);
  }

  function handleDismiss(id) {
    const nexToasts = toasts.filter((toast) => {
      return toast.id !== id;
    });

    setToasts(nexToasts);
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf toasts={toasts} handleDismiss={handleDismiss} />

      <form className={styles.controlsWrapper} onSubmit={handleCreateToast}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              className={styles.messageInput}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((option) => {
              const id = `variant-${option}`;
              return (
                <label key={id} htmlFor="variant-notice">
                  <input
                    id="variant-notice"
                    type="radio"
                    name="variant"
                    value={option}
                    checked={option === variant}
                    onChange={(e) => setVariant(e.target.value)}
                  />
                  {option}
                </label>
              );
            })}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
