"use client";

import { THEME_STORAGE_KEY, type ThemePreference } from "@/lib/theme";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { ThemeToggle } from "./theme_toggle";

const LINKS = [{ href: "/tools", label: "Tools" }];

export default function Navbar() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<ThemePreference>("light");
  const [themeReady, setThemeReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Sync React state with localStorage / system (layout script already set <html class="dark">).
  useLayoutEffect(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemePreference | null;
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    const resolved = saved ?? preferred;
    setTheme(resolved);
    document.documentElement.classList.toggle("dark", resolved === "dark");
    setThemeReady(true);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const onToggle = () => {
    const next: ThemePreference = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem(THEME_STORAGE_KEY, next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  return (
    <nav className="sticky top-0 z-20 border-b border-zinc-100 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md">
      <div className="w-full mx-auto pl-4 lg:pr-4 sm:pr-2 h-12 flex items-center justify-between">
        {/* Wordmark */}
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white hover:opacity-70 transition-opacity"
        >
          Nopks<span className="text-red-500">Forge</span>
        </Link>

        {/* Desktop links + theme toggle */}
        <div className="hidden sm:flex items-center gap-1">
          {LINKS.map(link => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm px-3 py-1.5 rounded-lg font-medium transition-colors
                  ${active
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
              >
                {link.label}
              </Link>
            )
          })}
          <div className="ml-2">
            {themeReady ? (
              <ThemeToggle theme={theme} onToggle={onToggle} />
            ) : (
              <span
                className="inline-block h-8 w-16 rounded-full border border-transparent"
                aria-hidden
              />
            )}
          </div>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex sm:hidden items-center gap-2">
          {themeReady ? (
            <ThemeToggle theme={theme} onToggle={onToggle} />
          ) : (
            <span
              className="inline-block h-8 w-16 rounded-full border border-transparent"
              aria-hidden
            />
          )}
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="h-9 w-9 rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            <span className="relative mx-auto block h-5 w-5 overflow-visible">
              {/* Three-bar → X animation */}
              <span
                className={`absolute left-0 top-[3px] block h-px w-5 rounded-full bg-current transition-all duration-200 origin-center ${
                  menuOpen ? 'translate-y-[6px] rotate-45' : ''
                }`}
              />
              <span
                className={`absolute left-0 top-[9px] block h-px w-5 rounded-full bg-current transition-all duration-200 ${
                  menuOpen ? 'opacity-0 scale-x-0' : ''
                }`}
              />
              <span
                className={`absolute left-0 top-[15px] block h-px w-5 rounded-full bg-current transition-all duration-200 origin-center ${
                  menuOpen ? '-translate-y-[6px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div className={`sm:hidden overflow-hidden transition-all duration-200 ease-in-out ${menuOpen ? 'max-h-64 border-t border-zinc-100 dark:border-zinc-800' : 'max-h-0'}`}>
        <div className="px-3 py-2 flex flex-col gap-0.5">
          {LINKS.map(link => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm px-3 py-2.5 rounded-lg font-medium transition-colors
                  ${active
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}