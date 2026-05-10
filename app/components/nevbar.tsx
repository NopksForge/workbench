"use client";

import { THEME_STORAGE_KEY, type ThemePreference } from "@/lib/theme";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useState } from "react";

const TABS = [
  { href: "/",      label: "projects", matchExact: true },
  { href: "/tools", label: "tools",    matchExact: false },
  { href: "/about", label: "about",    matchExact: false },
];

export default function Navbar() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<ThemePreference>("light");
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemePreference | null;
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const resolved = saved ?? preferred;
    applyTheme(resolved);
    setTheme(resolved);
    setReady(true);
  }, []);

  function applyTheme(t: ThemePreference) {
    document.documentElement.classList.toggle("dark", t === "dark");
    document.documentElement.dataset.theme = t;
  }

  const onToggle = () => {
    const next: ThemePreference = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem(THEME_STORAGE_KEY, next);
    applyTheme(next);
  };

  return (
    <header
      className="sticky top-0 z-30"
      style={{ background: "var(--bg)", borderBottom: "1px solid var(--rule)" }}
    >
      <div className="max-w-[1080px] mx-auto px-6 py-4 flex items-center gap-8">
        {/* Wordmark */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--accent)",
              boxShadow: "0 0 6px var(--accent)",
            }}
          />
          <span className="te-mono" style={{ fontSize: 12, letterSpacing: ".18em", color: "var(--ink)" }}>
            nopks<span style={{ color: "var(--accent)" }}>forge</span>
          </span>
        </Link>

        {/* Nav tabs */}
        <nav className="flex items-center gap-5">
          {TABS.map((t) => {
            const active = t.matchExact ? pathname === t.href : pathname.startsWith(t.href);
            return (
              <Link
                key={t.href}
                href={t.href}
                className="te-mono relative"
                style={{
                  fontSize: 11,
                  letterSpacing: ".22em",
                  color: active ? "var(--ink)" : "var(--silk-muted)",
                  paddingBottom: 2,
                  borderBottom: active ? "1px solid var(--ink)" : "1px solid transparent",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                {t.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex-1" />

        {/* Theme toggle */}
        {ready && (
          <button
            onClick={onToggle}
            className="te-mono uppercase"
            style={{ fontSize: 10, letterSpacing: ".2em", color: "var(--silk-muted)" }}
          >
            {theme === "light" ? "lt" : "dk"}
          </button>
        )}
      </div>
    </header>
  );
}
