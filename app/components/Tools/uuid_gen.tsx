"use client";

import {
  ClipboardToast,
  type ClipboardToastType,
} from "@/app/components/clipboard_toast";
import { useCallback, useMemo, useState } from "react";

function generateUuid() {
  // Prefer browser crypto; fallback for older environments.
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  // Fallback: not RFC4122-perfect, but good enough for dev usage.
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).slice(1);
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

export function UuidGenSection() {
  const [uuid, setUuid] = useState<string>(() => generateUuid());
  const [toastId, setToastId] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<ClipboardToastType>("info");

  const hideToast = useCallback(() => setToastId(null), []);
  const showToast = useCallback(
    (message: string, type: ClipboardToastType = "info") => {
      setToastMessage(message);
      setToastType(type);
      setToastId(Date.now());
    },
    [],
  );

  const refresh = useCallback(() => {
    setUuid(generateUuid());
  }, []);

  const brunoPreScript = useMemo(() => {
    return `const { v4: uuidv4 } = require('uuid');\n\nconst uuid = uuidv4();\nbru.setVar("randUuid", uuid);\n`;
  }, []);

  const postmanPreScript = useMemo(() => {
    return `const uuid = crypto.randomUUID();\npm.environment.set("randUuid", uuid);\n`;
  }, []);

  const copyText = useCallback(
    async (value: string, message: string) => {
      try {
        await navigator.clipboard.writeText(value);
        showToast(message, "info");
      } catch {
        showToast("Could not copy to clipboard", "error");
      }
    },
    [showToast],
  );

  const primaryBtn =
    "rounded-lg bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200";
  const secondaryBtn =
    "rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-zinc-800 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800";

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          UUID generator
        </h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Random UUID for testing. Copy the snippet into Bruno / Postman to
          use{" "}
          <span className="font-mono font-medium text-zinc-800 dark:text-zinc-200">
            {"{{randUuid}}"}
          </span>
          .
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={refresh} className={primaryBtn}>
          Refresh
        </button>
        <div className="flex-1 min-w-[18rem]">
          <label className="sr-only" htmlFor="uuid-gen-input">
            Generated UUID
          </label>
          <input
            id="uuid-gen-input"
            value={uuid}
            readOnly
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 font-mono text-sm text-zinc-900 outline-none ring-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <button
          type="button"
          className={secondaryBtn}
          onClick={() => copyText(uuid, "UUID copied")}
        >
          Copy UUID
        </button>
        <button
          type="button"
          className={secondaryBtn}
          onClick={() => copyText(brunoPreScript, "Bruno pre-script copied")}
        >
          Copy Bruno pre-script
        </button>
        <button
          type="button"
          className={secondaryBtn}
          onClick={() =>
            copyText(postmanPreScript, "Postman pre-script copied")
          }
        >
          Copy Postman pre-script
        </button>
      </div>

      <ClipboardToast
        id={toastId}
        message={toastMessage}
        onDismiss={hideToast}
        toastType={toastType}
      />
    </section>
  );
}