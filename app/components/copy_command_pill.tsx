"use client";

import {
  ClipboardToast,
  type ClipboardToastType,
} from "@/app/components/clipboard_toast";
import { useCallback, useState } from "react";

type CopyCommandPillProps = {
  display: string;
  valueToCopy: string;
  toastMessage?: string;
  toastType?: ClipboardToastType;
};

export function CopyCommandPill({
  display,
  valueToCopy,
  toastMessage = "Copied to clipboard",
  toastType = "info",
}: CopyCommandPillProps) {
  const [toastId, setToastId] = useState<number | null>(null);

  const hideToast = useCallback(() => setToastId(null), []);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(valueToCopy);
      setToastId(Date.now());
    } catch {
      setToastId(Date.now());
    }
  }, [valueToCopy]);

  return (
    <>
      <button
        type="button"
        onClick={onCopy}
        className="inline-flex items-center justify-center rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-xs font-mono text-zinc-800 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900"
        title="Click to copy"
      >
        {display}
      </button>
      <ClipboardToast
        id={toastId}
        message={toastMessage}
        onDismiss={hideToast}
        toastType={toastType}
      />
    </>
  );
}

