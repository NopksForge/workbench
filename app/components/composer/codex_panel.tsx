import type { CodexEntry } from "./types";

type CodexPanelProps = {
  codexEntries: CodexEntry[];
  activeCode: string;
  powered: boolean;
};

export function CodexPanel({
  codexEntries,
  activeCode,
  powered,
}: CodexPanelProps) {
  const hasKnownMatch = powered && codexEntries.some((entry) => entry.code === activeCode);

  return (
    <div className="relative w-52 h-full shrink-0 pt-1 pr-1">
      <style>{`
        @keyframes codex-glow-pulse {
          0%, 100% {
            box-shadow:
              0 0 6px rgba(255, 240, 200, 0.45),
              0 0 12px rgba(255, 220, 150, 0.25),
              inset 0 0 8px rgba(255, 250, 235, 0.35);
          }
          50% {
            box-shadow:
              0 0 14px rgba(255, 245, 215, 0.95),
              0 0 28px rgba(255, 210, 120, 0.45),
              0 0 40px rgba(255, 200, 100, 0.2),
              inset 0 0 14px rgba(255, 255, 250, 0.55);
          }
        }
        @keyframes codex-twinkle {
          0%, 100% { opacity: 0.35; filter: brightness(0.98); }
          20% { opacity: 0.85; filter: brightness(1.08); }
          40% { opacity: 0.5; filter: brightness(1); }
          60% { opacity: 1; filter: brightness(1.12); }
          80% { opacity: 0.55; filter: brightness(1.02); }
        }
        @keyframes codex-shimmer {
          0% { transform: translateX(-120%) skewX(-14deg); }
          100% { transform: translateX(220%) skewX(-14deg); }
        }
        .codex-shimmer-sweep {
          animation: codex-shimmer 2.8s ease-in-out infinite;
        }
      `}</style>

      {/* tape strips */}
      <div className="pointer-events-none absolute -top-1 left-3 z-20 h-6 w-14 rotate-[-28deg] border border-[#d8c7a1]/80 bg-[#eadcbf]/70 shadow-[0_1px_2px_rgba(0,0,0,.15)]" />
      <div className="pointer-events-none absolute -bottom-1 right-2 z-20 h-6 w-14 rotate-31 border border-[#d8c7a1]/80 bg-[#eadcbf]/70 shadow-[0_1px_2px_rgba(0,0,0,.15)]" />

      <div className="relative flex flex-col gap-2 overflow-hidden rounded-[6px] bg-[linear-gradient(180deg,#efe2c4,#e6d5b2_45%,#ddc79f)] p-3 shadow-[0_10px_18px_rgba(0,0,0,.35),inset_0_1px_0_rgba(255,248,232,.75)]">
        {/* wrinkle / fold texture */}
        <div className="pointer-events-none absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_22%_18%,rgba(255,247,224,.55),transparent_38%),radial-gradient(circle_at_78%_22%,rgba(185,152,98,.18),transparent_44%),radial-gradient(circle_at_64%_70%,rgba(165,135,86,.2),transparent_45%),linear-gradient(138deg,transparent_0%,transparent_28%,rgba(148,118,71,.18)_29%,transparent_31%,transparent_52%,rgba(148,118,71,.16)_53%,transparent_55%,transparent_100%)]" />
        <div className="pointer-events-none absolute -left-6 top-7 h-px w-48 rotate-12 bg-[#b59662]/45" />
        <div className="pointer-events-none absolute right-1 top-14 h-px w-32 rotate-[-18deg] bg-[#b59662]/35" />
        <div className="pointer-events-none absolute left-6 bottom-10 h-px w-36 rotate-[8deg] bg-[#b59662]/35" />

        <p className="relative text-right text-xs font-bold tracking-widest text-[#5a4426]">CODEX</p>

        {codexEntries.map((entry) => {
          const isActive = hasKnownMatch && activeCode === entry.code;
          return (
            <div
              key={entry.code}
              className={`relative z-0 flex items-center gap-3 overflow-hidden rounded p-2 text-left transition ${
                isActive
                  ? "codex-active-glow border border-amber-200/70 bg-[#fff8e8]/65"
                  : ""
              }`}
            >
              {isActive && (
                <>
                  <div
                    className="codex-twinkle-layer pointer-events-none absolute inset-0 rounded bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,.55),transparent_55%),radial-gradient(ellipse_at_70%_80%,rgba(255,235,190,.4),transparent_50%)]"
                    aria-hidden
                  />
                  <div className="pointer-events-none absolute inset-0 overflow-hidden rounded" aria-hidden>
                    <div className="codex-shimmer-sweep absolute -inset-1 left-0 top-0 h-full w-[40%] bg-linear-to-r from-transparent via-white/55 to-transparent" />
                  </div>
                </>
              )}
              <div
                className={`relative z-1 font-mono leading-tight ${
                  isActive ? "text-[#523510] font-bold" : "text-[#6a5030] font-medium"
                }`}
              >
                <div>{entry.top}</div>
                <div>{entry.bot}</div>
              </div>
              <div
                className={`relative z-1 whitespace-pre-line text-[11px] font-medium ${
                  isActive ? "text-[#3d2a0c]" : "text-[#715534]"
                }`}
              >
                {entry.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
