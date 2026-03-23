"use client";

import { useEffect } from "react";

export type ClipboardToastType = "info" | "error";

type ClipboardToastProps = {
  /** Non-null shows the toast; change the value to retrigger duration and animation. */
  id: number | null;
  message: string;
  onDismiss: () => void;
  durationMs?: number;
  /** Visual + semantics: info (green), error (red). */
  toastType?: ClipboardToastType;
};

const typeStyles: Record<
  ClipboardToastType,
  string
> = {
  info: "border-green-300 bg-green-50 text-green-950 shadow-green-900/10 dark:border-green-800 dark:bg-green-950 dark:text-green-50",
  error:
    "border-red-300 bg-red-50 text-red-950 shadow-red-900/10 dark:border-red-800 dark:bg-red-950 dark:text-red-50",
};

export function ClipboardToast({
  id,
  message,
  onDismiss,
  durationMs = 2800,
  toastType = "info",
}: ClipboardToastProps) {
  useEffect(() => {
    if (id == null) return;
    const t = window.setTimeout(onDismiss, durationMs);
    return () => window.clearTimeout(t);
  }, [id, durationMs, onDismiss]);

  if (id == null) return null;

  const isError = toastType === "error";

  return (
    <div
      className="pointer-events-none fixed bottom-4 right-4 z-50 max-w-sm"
      role={isError ? "alert" : "status"}
      aria-live={isError ? "assertive" : "polite"}
      aria-atomic="true"
    >
      <div
        className={`pointer-events-auto rounded-xl border px-4 py-3 text-sm shadow-lg ${typeStyles[toastType]}`}
      >
        {message}
      </div>
    </div>
  );
}
