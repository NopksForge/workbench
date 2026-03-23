"use client";

type Theme = "light" | "dark";

type ThemeToggleProps = {
  theme: Theme;
  onToggle: () => void;
};

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="inline-flex h-8 w-16 items-center rounded-full border border-zinc-200 bg-zinc-100 p-1 transition-colors hover:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700"
    >
      <span
        className={[
          "inline-flex h-6 w-6 items-center justify-center rounded-full text-xs transition-transform duration-200",
          isDark
            ? "translate-x-8 bg-zinc-600 text-zinc-100"
            : "translate-x-0 bg-white text-amber-600",
        ].join(" ")}
      >
        {isDark ? "🌙" : "☀️"}
      </span>
      <span className="sr-only">
        Current theme: {isDark ? "dark" : "light"}
      </span>
    </button>
  );
}