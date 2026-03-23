"use client";

import {
  ClipboardToast,
  type ClipboardToastType,
} from "@/app/components/clipboard_toast";
import { highlightJson } from "@/lib/json_syntax_highlight";
import {
  collapseEmbeddedJsonStrings,
  embeddedFieldSummary,
  embeddedJsonLooksExpanded,
  embeddedToggleIsAvailable,
  expandEmbeddedJsonStrings,
} from "@/lib/json_embedded_strings";
import {
  parseMultipleJsonValues,
  stringifyMultipleBeautified,
  stringifyMultipleMinified,
} from "@/lib/parse_multiple_json";
import { useCallback, useMemo, useRef, useState, type UIEvent } from "react";

type FormatMode = "none" | "beautify" | "minify";

const PLACEHOLDER_SAMPLE = '{\n  "hello": "world"\n}';

const editorBox =
  "min-h-88 max-h-[80vh] w-full overflow-auto py-2 pl-3 pr-3 font-mono text-sm leading-relaxed [scrollbar-width:thin]";

export function JsonFormatterSection() {
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [formatMode, setFormatMode] = useState<FormatMode>("none");
  const [toastId, setToastId] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<ClipboardToastType>("info");

  const preRef = useRef<HTMLPreElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const hideToast = useCallback(() => setToastId(null), []);

  const showToast = useCallback(
    (message: string, type: ClipboardToastType = "info") => {
      setToastMessage(message);
      setToastType(type);
      setToastId(Date.now());
    },
    [],
  );

  const highlighted = useMemo(() => highlightJson(text), [text]);

  const embedUi = useMemo(() => {
    const t = text.trim();
    if (!t) {
      return { visible: false, expanded: false, summary: "" };
    }
    try {
      const values = parseMultipleJsonValues(t);
      if (!embeddedToggleIsAvailable(values)) {
        return { visible: false, expanded: false, summary: "" };
      }
      return {
        visible: true,
        expanded: embeddedJsonLooksExpanded(values),
        summary: embeddedFieldSummary(values),
      };
    } catch {
      return { visible: false, expanded: false, summary: "" };
    }
  }, [text]);

  const applyFormatted = useCallback((formatted: string, mode: FormatMode) => {
    setText(formatted);
    setError(null);
    setFormatMode(mode);
  }, []);

  const handleFormat = useCallback(() => {
    const trimmed = text.trim();
    if (!trimmed) {
      setError(null);
      setFormatMode("none");
      return;
    }
    try {
      const values = parseMultipleJsonValues(trimmed);
      applyFormatted(stringifyMultipleBeautified(values), "beautify");
    } catch (e) {
      setFormatMode("none");
      setError(e instanceof Error ? e.message : "Invalid JSON");
    }
  }, [text, applyFormatted]);

  const handleMinify = useCallback(() => {
    const trimmed = text.trim();
    if (!trimmed) {
      setError(null);
      setFormatMode("none");
      return;
    }
    try {
      const values = parseMultipleJsonValues(trimmed);
      const collapsed = values.map((v) => collapseEmbeddedJsonStrings(v));
      applyFormatted(stringifyMultipleMinified(collapsed), "minify");
    } catch (e) {
      setFormatMode("none");
      setError(e instanceof Error ? e.message : "Invalid JSON");
    }
  }, [text, applyFormatted]);

  const handleToggleReadable = useCallback(() => {
    const trimmed = text.trim();
    if (!trimmed) return;
    try {
      const values = parseMultipleJsonValues(trimmed);
      if (!embeddedToggleIsAvailable(values)) return;

      if (embeddedJsonLooksExpanded(values)) {
        const collapsed = values.map((v) => collapseEmbeddedJsonStrings(v));
        setText(stringifyMultipleBeautified(collapsed));
      } else {
        const expandedValues = values.map((v, idx) => {
          const base = values.length > 1 ? `[${idx}]` : "";
          return expandEmbeddedJsonStrings(v, base).value;
        });
        setText(stringifyMultipleBeautified(expandedValues));
      }
      setError(null);
      setFormatMode("beautify");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
    }
  }, [text]);

  const handleCopy = useCallback(async () => {
    if (!text.trim()) return;
    try {
      await navigator.clipboard.writeText(text);
      showToast("Copied to clipboard", "info");
    } catch {
      showToast("Could not copy to clipboard", "error");
    }
  }, [text, showToast]);

  const syncScrollFromTextarea = useCallback(
    (e: UIEvent<HTMLTextAreaElement>) => {
      const pre = preRef.current;
      if (!pre) return;
      pre.scrollTop = e.currentTarget.scrollTop;
      pre.scrollLeft = e.currentTarget.scrollLeft;
    },
    [],
  );

  const baseBtn =
    "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950";

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          JSON Formatter
        </h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Drop in your JSON. Beautify just makes it look nice. Hit{" "}
          <span className="font-medium text-zinc-800 dark:text-zinc-200">
            (readable)
          </span>{" "}
          if you wanna see parsed{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-xs dark:bg-zinc-900">
            header
          </code>
          /
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-xs dark:bg-zinc-900">
            body
          </code>
          fields for real.
        </p>
      </div>

      <div className="flex w-full flex-wrap items-center gap-2">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleFormat}
            aria-pressed={formatMode === "beautify"}
            className={`${baseBtn} ${
              formatMode === "beautify"
                ? "bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400"
                : "bg-zinc-100 text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
            }`}
          >
            Beautify
          </button>
          <button
            type="button"
            onClick={handleMinify}
            aria-pressed={formatMode === "minify"}
            className={`${baseBtn} border ${
              formatMode === "minify"
                ? "border-amber-600 bg-amber-500 text-white shadow-sm hover:bg-amber-600 dark:border-amber-500 dark:bg-amber-600 dark:hover:bg-amber-500"
                : "border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
            }`}
          >
            Minify
          </button>
          {embedUi.visible ? (
            <button
              type="button"
              onClick={handleToggleReadable}
              aria-pressed={embedUi.expanded}
              aria-label={
                embedUi.expanded
                  ? "Switch header and body to escaped JSON strings"
                  : "Expand header and body to nested JSON"
              }
              className={`${baseBtn} border ${
                embedUi.expanded
                  ? "border-blue-600 bg-blue-600 text-white shadow-sm hover:bg-blue-700 dark:border-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400"
                  : "border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
              }`}
              title={
                embedUi.expanded
                  ? `Readable ON (${embedUi.summary})`
                  : `Readable OFF (${embedUi.summary})`
              }
            >
              (Beautify + Readable embedded JSON)
            </button>
          ) : null}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          disabled={!text.trim()}
          className={`${baseBtn} ml-auto border border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800`}
        >
          Copy
        </button>
      </div>

      {error ? (
        <p
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/50 dark:text-red-200"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="grid *:col-start-1 *:row-start-1">
          <pre
            ref={preRef}
            className={`${editorBox} pointer-events-none m-0 border-0 bg-zinc-50 text-left whitespace-pre-wrap wrap-break-word [scrollbar-width:none] dark:bg-zinc-950 [&::-webkit-scrollbar]:hidden`}
            aria-hidden
          >
            {text === "" ? (
              <span className="opacity-50">
                {highlightJson(PLACEHOLDER_SAMPLE)}
              </span>
            ) : (
              highlighted
            )}
          </pre>
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setError(null);
              setFormatMode("none");
            }}
            onScroll={syncScrollFromTextarea}
            spellCheck={false}
            rows={16}
            className={`${editorBox} z-10 resize-y border-0 bg-transparent text-transparent caret-zinc-900 outline-none ring-inset ring-zinc-400 focus:ring-2 focus-visible:ring-2 dark:caret-zinc-100 dark:ring-zinc-600 dark:focus-visible:ring-zinc-500 selection:bg-sky-500/25 dark:selection:bg-sky-400/30`}
            aria-label="JSON input"
          />
        </div>
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
