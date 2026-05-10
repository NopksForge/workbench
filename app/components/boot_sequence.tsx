"use client";

import { playClick } from "@/lib/sound";
import { useEffect, useRef, useState } from "react";

// ── Adjust timing here ───────────────────────────────────────
const CONFIG = {
  firstLineDelay:  200,   // ms before the first line appears
  lineDelay:       300,   // ms between subsequent lines
  holdAfterDone:   320,   // ms to hold "ready." before fading out
  fadeOutDuration: 300,   // ms for the fade-out transition
};
// ────────────────────────────────────────────────────────────

const LINES = [
  "boot · power",
  "boot · mcu",
  "boot · sampler",
  "boot · display",
  "boot · audio",
  "load nopksforge os",
  "ready.",
];

const SESSION_KEY = "nf_booted";

export function BootSequence() {
  // Loaded with ssr:false so document is always available here.
  // Reads the is-booting class that the inline script set before first paint.
  const [active, setActive] = useState(
    () => document.documentElement.classList.contains("is-booting"),
  );
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const audioCueFired = useRef(false);

  useEffect(() => {
    if (active && idx === 4 && LINES[4] === "boot · audio" && !audioCueFired.current) {
      audioCueFired.current = true;
      playClick("boot");
    }
  }, [active, idx]);

  useEffect(() => {
    if (!active) return;

    if (idx >= LINES.length) {
      const hold = setTimeout(() => {
        // Remove the CSS ::before cover and start React overlay fade at the same time
        // so the page fades in from behind as the overlay fades out.
        document.documentElement.classList.remove("is-booting");
        setFading(true);

        setTimeout(() => {
          sessionStorage.setItem(SESSION_KEY, "1");
          setActive(false);
        }, CONFIG.fadeOutDuration);
      }, CONFIG.holdAfterDone);

      return () => clearTimeout(hold);
    }

    const delay = idx === 0 ? CONFIG.firstLineDelay : CONFIG.lineDelay;
    const t = setTimeout(() => setIdx((n) => n + 1), delay);
    return () => clearTimeout(t);
  }, [active, idx]);

  if (!active) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{
        background: "var(--bg)",
        opacity: fading ? 0 : 1,
        transition: `opacity ${CONFIG.fadeOutDuration}ms`,
      }}
    >
      <div
        className="te-mono"
        style={{ fontSize: 12, letterSpacing: ".22em", color: "var(--silk)" }}
      >
        <span
          style={{
            display: "inline-block",
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "var(--accent)",
            boxShadow: "0 0 8px var(--accent)",
            marginRight: 12,
            verticalAlign: 1,
          }}
        />
        <span style={{ color: "var(--ink)" }}>
          {LINES[Math.min(idx, LINES.length - 1)]}
        </span>
        <span className="te-cursor" />
      </div>
    </div>
  );
}
