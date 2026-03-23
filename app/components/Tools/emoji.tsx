"use client";

import { ClipboardToast } from "@/app/components/clipboard_toast";
import { useCallback, useMemo, useState } from "react";

export type CommitTemplate = {
  emoji: string;
  label: string;
  /** Extra terms for search (label and emoji are always searched). */
  keywords: string[];
};

/** Shell snippet: `git commit -m "<emoji> <label>: "` (trailing space for typing the rest). */
export function commitClipboard(emoji: string, label: string) {
  return `git commit -m "${emoji} ${label}: "`;
}

export const COMMIT_TEMPLATES: CommitTemplate[] = [
  {
    emoji: "✨",
    label: "feat",
    keywords: ["feature", "enhancement", "new", "add", "gitmoji"],
  },
  {
    emoji: "🩹",
    label: "fix",
    keywords: ["bug", "broken", "defect", "repair", "regression"],
  },
  {
    emoji: "📝",
    label: "docs",
    keywords: ["documentation", "readme", "markdown", "commentary", "guide"],
  },
  {
    emoji: "🎨",
    label: "style",
    keywords: ["format", "prettier", "css", "ui", "whitespace", "lint"],
  },
  {
    emoji: "♻️",
    label: "refactor",
    keywords: ["cleanup", "restructure", "rename", "dry", "quality"],
  },
  {
    emoji: "⚡",
    label: "perf",
    keywords: ["performance", "faster", "optimize", "speed", "memory"],
  },
  {
    emoji: "✅",
    label: "test",
    keywords: ["testing", "spec", "jest", "vitest", "coverage", "e2e"],
  },
  {
    emoji: "🔧",
    label: "config",
    keywords: ["chore", "tooling", "eslint", "settings", "webpack", "tsconfig"],
  },
  {
    emoji: "🚀",
    label: "deploy",
    keywords: ["deployment", "ship", "production", "release", "cd"],
  },
  {
    emoji: "👷",
    label: "ci",
    keywords: ["pipeline", "github", "actions", "workflow", "buildkite"],
  },
  {
    emoji: "📦",
    label: "build",
    keywords: ["compile", "bundle", "artifact", "dist", "package"],
  },
  {
    emoji: "🔒",
    label: "security",
    keywords: ["vulnerability", "auth", "secret", "permission", "cve"],
  },
  {
    emoji: "⏪",
    label: "revert",
    keywords: ["undo", "rollback", "backout", "restore"],
  },
  {
    emoji: "🔀",
    label: "merge",
    keywords: ["branch", "pr", "pull request", "integrate"],
  },
  {
    emoji: "🧹",
    label: "cleanup",
    keywords: ["tidy", "debt", "dead", "unused", "housekeeping"],
  },
  {
    emoji: "🏗️",
    label: "structure",
    keywords: ["architecture", "folder", "layout", "modules", "monorepo"],
  },
  {
    emoji: "🔊",
    label: "logs",
    keywords: ["logging", "logger", "debug", "trace", "console"],
  },
  {
    emoji: "🔇",
    label: "remove logs",
    keywords: ["silence", "quiet", "noise", "verbose", "strip"],
  },
  {
    emoji: "✏️",
    label: "typo",
    keywords: ["spelling", "grammar", "text", "copy", "wording"],
  },
  {
    emoji: "➕",
    label: "add dep",
    keywords: ["dependency", "npm", "yarn", "pnpm", "install", "package.json"],
  },
  {
    emoji: "➖",
    label: "remove dep",
    keywords: ["uninstall", "prune", "drop", "dependency"],
  },
  {
    emoji: "🗃️",
    label: "db",
    keywords: ["database", "migration", "schema", "sql", "prisma", "postgres"],
  },
  {
    emoji: "🔥",
    label: "remove",
    keywords: ["delete", "drop", "rip", "dead code", "purge"],
  },
  {
    emoji: "🚑️",
    label: "hotfix",
    keywords: ["urgent", "emergency", "prod", "critical", "p0"],
  },
  {
    emoji: "🎉",
    label: "init",
    keywords: ["bootstrap", "scaffold", "start", "begin", "first"],
  },
  {
    emoji: "🔖",
    label: "release",
    keywords: ["version", "tag", "changelog", "semver", "bump"],
  },
  {
    emoji: "🧪",
    label: "experiment",
    keywords: ["spike", "poc", "try", "prototype", "trial"],
  },
  {
    emoji: "🚧",
    label: "wip",
    keywords: ["draft", "progress", "unfinished", "work in progress"],
  },
  {
    emoji: "💡",
    label: "comment",
    keywords: ["annotate", "jsdoc", "explain", "note", "clarify"],
  },
  {
    emoji: "🥅",
    label: "errors",
    keywords: ["error", "exception", "catch", "boundary", "handling"],
  },
  {
    emoji: "🩹",
    label: "patch",
    keywords: ["minor", "tweak", "small fix", "bandaid", "nit"],
  },
];

function templateHaystack(t: CommitTemplate): string {
  return [t.label, t.emoji, ...t.keywords].join(" ").toLowerCase();
}

function matchesTemplateSearch(t: CommitTemplate, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const hay = templateHaystack(t);
  const tokens = q.split(/\s+/).filter(Boolean);
  return tokens.every((tok) => hay.includes(tok));
}

type CommitEmojiButtonProps = {
  emoji: string;
  label: string;
  onCopied?: () => void;
};

export function CommitEmojiButton({
  emoji,
  label,
  onCopied,
}: CommitEmojiButtonProps) {
  const [copied, setCopied] = useState(false);
  const clipboard = commitClipboard(emoji, label);

  const onClick = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(clipboard);
      setCopied(true);
      onCopied?.();
      window.setTimeout(() => setCopied(false), 500);
    } catch {
      setCopied(false);
    }
  }, [clipboard, onCopied]);

  return (
    <button
      type="button"
      onClick={onClick}
      title={clipboard}
      className="group flex flex-col items-center justify-items-center gap-1 rounded-xl border border-zinc-200 bg-white px-3 py-3 text-center transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
    >
      {copied ? (
        <span className="flex flex-1 items-center justify-center font-mono text-[10px] text-zinc-400 opacity-100 transition group-hover:opacity-100 dark:text-zinc-200" style={{ minHeight: "2.5rem" }}>
          Copied
        </span>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <span className="text-2xl leading-none select-none" aria-hidden>
            {emoji}
          </span>
          <span className="max-w-22 truncate text-xs font-medium text-zinc-600 dark:text-zinc-400">
            {label}
          </span>
        </div>
      )}
    </button>
  );
}

export function EmojiCommitSection() {
  const [query, setQuery] = useState("");
  const [toastId, setToastId] = useState<number | null>(null);

  const hideToast = useCallback(() => setToastId(null), []);
  const showCopiedToast = useCallback(() => setToastId(Date.now()), []);

  const filtered = useMemo(
    () => COMMIT_TEMPLATES.filter((t) => matchesTemplateSearch(t, query)),
    [query],
  );

  return (
    <>
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Emoji commits
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Click a tile to copy a{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-xs dark:bg-zinc-900">
              git commit -m &quot;…&quot;
            </code>{" "}
            prefix. Finish the message in your terminal.
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="emoji-commit-search" className="sr-only">
            Search commit types
          </label>
          <input
            id="emoji-commit-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by label, emoji, or keyword…"
            autoComplete="off"
            spellCheck={false}
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none ring-zinc-400 placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-600"
          />
          {query.trim() && filtered.length === 0 ? (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              No matches. Try another word.
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {filtered.map((t) => (
            <CommitEmojiButton
              key={t.label + t.emoji}
              emoji={t.emoji}
              label={t.label}
              onCopied={showCopiedToast}
            />
          ))}
        </div>
      </section>
      <ClipboardToast
        id={toastId}
        message="Copied to clipboard"
        onDismiss={hideToast}
      />
    </>
  );
}
