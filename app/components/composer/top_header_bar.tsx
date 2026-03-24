export function TopHeaderBar() {
  return (
    <div className="flex items-center justify-between border-b border-zinc-700/50 px-4 py-1.5">
      <div className="flex items-center gap-4">
        <span className="rounded border border-zinc-600 px-2 py-0.5 text-[10px] font-bold tracking-wider text-zinc-400">
          OUTPUT
        </span>
        <div className="flex gap-2">
          <span className="text-[10px] font-medium tracking-wider text-zinc-500">SYNC</span>
          <span className="text-[10px] font-medium tracking-wider text-zinc-500">MIDI</span>
        </div>
      </div>
      <div
        className="flex items-center gap-3 rounded-lg px-3 py-1"
        style={{ background: "linear-gradient(180deg, #4a4a4a, #3a3a3a)" }}
      >
        <span className="text-[10px] font-medium tracking-wider text-zinc-400">USB</span>
      </div>
    </div>
  );
}
