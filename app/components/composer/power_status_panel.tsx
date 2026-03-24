type PowerStatusPanelProps = {
  powered: boolean;
  statusText: string;
  onTogglePower: () => void;
};

export function PowerStatusPanel({
  powered,
  statusText,
  onTogglePower,
}: PowerStatusPanelProps) {
  const isError = powered && statusText.startsWith("ERR");
  const isLoaded = powered && statusText.startsWith("LOADED");
  const isReady = powered && !isError && !isLoaded;

  return (
    <div className="flex w-44 flex-col items-center gap-3 pt-4">
      <button
        onClick={onTogglePower}
        className="group relative h-28 w-20 rounded-lg border border-zinc-700/80 bg-[linear-gradient(180deg,#2c2f35,#1f2329)] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_8px_20px_rgba(0,0,0,.45)] transition-all duration-200 active:translate-y-px"
        aria-label={powered ? "Turn power off" : "Turn power on"}
        style={{
          boxShadow: powered
            ? "inset 0 1px 0 rgba(255,255,255,.08), 0 8px 20px rgba(0,0,0,.45), 0 0 20px rgba(249,115,22,.2)"
            : "inset 0 1px 0 rgba(255,255,255,.06), 0 8px 20px rgba(0,0,0,.45)",
        }}
      >
        <div
          className="relative h-full w-full rounded-md border"
          style={{
            borderColor: powered ? "#9a3412" : "#3f3f46",
            background: powered
              ? "linear-gradient(180deg, #fb923c, #f97316 55%, #c2410c)"
              : "#6e2507",
            transform: powered ? "translateY(2px)" : "translateY(-2px)",
            boxShadow: powered
              ? "inset 0 -4px 8px rgba(0,0,0,.25), inset 0 1px 0 rgba(255,255,255,.2)"
              : "inset 0 4px 8px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.08)",
            transition: "all 160ms ease-out",
          }}
        >
          <div
            className="absolute left-1/2 top-2 h-1.5 w-8 -translate-x-1/2 rounded-full"
            style={{
              background: powered
                ? "rgba(255,255,255,.35)"
                : "rgba(255,255,255,.15)",
            }}
          />
          <div
            className="absolute left-1/2 bottom-2 h-1.5 w-8 -translate-x-1/2 rounded-full"
            style={{
              background: powered ? "rgba(0,0,0,.25)" : "rgba(0,0,0,.45)",
            }}
          />
        </div>
        <span className="pointer-events-none absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-[0.22em] text-zinc-500">
          POWER
        </span>
      </button>

      <div
        className="mt-4 w-full rounded-lg border border-zinc-700/70 bg-[linear-gradient(180deg,#191c22,#10141b)] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,.06)]"
        style={{
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,.06), 0 2px 8px rgba(0,0,0,.3)",
        }}
      >
        <p className="mb-1 text-[8px] font-bold tracking-[0.2em] text-zinc-500">
          SYSTEM STATUS
        </p>

        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{
                background: isReady ? "#38bdf8" : "#3f3f46",
                boxShadow: isReady ? "0 0 8px rgba(56,189,248,.8)" : "none",
              }}
            />
            <span className="text-[9px] font-bold tracking-[0.15em] text-zinc-300">
              READY
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{
                background: isLoaded ? "#22c55e" : "#3f3f46",
                boxShadow: isLoaded ? "0 0 8px rgba(34,197,94,.8)" : "none",
              }}
            />
            <span className="text-[9px] font-bold tracking-[0.15em] text-zinc-300">
              LOADED
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{
                background: isError ? "#ef4444" : "#3f3f46",
                boxShadow: isError ? "0 0 8px rgba(239,68,68,.8)" : "none",
              }}
            />
            <span className="text-[9px] font-bold tracking-[0.15em] text-zinc-300">
              ERROR
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
