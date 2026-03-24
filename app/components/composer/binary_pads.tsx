import { COMPOSER_ORANGE } from "./colors";

type BinaryPadsProps = {
  padBits: number[];
  powered: boolean;
  onTogglePad: (index: number) => void;
};

export function BinaryPads({ padBits, powered, onTogglePad }: BinaryPadsProps) {
  const PAD_W = 80;
  const PAD_H = 60;
  const GAP_X = 20;
  const GAP_Y = 20;

  return (
    <div
      className="grid grid-cols-3"
      style={{
        gap: `${GAP_Y}px ${GAP_X}px`,
        width: PAD_W * 3 + GAP_X * 2,
      }}
    >
      {padBits.map((bit, i) => {
        const on = bit === 1 && powered;
        return (
          <button
            key={i}
            onClick={() => onTogglePad(i)}
            className="relative flex items-center justify-center transition-all active:scale-95"
            style={{
              width: PAD_W,
              height: PAD_H,
              borderRadius: 5,
              background: "linear-gradient(180deg, #252525, #1c1c1c)",
              boxShadow: on
                ? "inset 0 2px 8px 1px rgba(255,255,255,0.22), 0 1px 3px rgba(0,0,0,.23)"
                : "0 2px 5px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.04)",
            }}
          >
            <div
              className="absolute left-1/2 top-1 h-1 w-1 -translate-x-1/2 rounded-full"
              style={{
                background: on ? COMPOSER_ORANGE.on.base : "#3a3a3a",
                boxShadow: on ? "0 0 5px #4ade80" : "none",
              }}
            />
            {/* <span className="font-mono text-sm font-bold" style={{ color: on ? "#4ade80" : "#555" }}>
              {bit}
            </span> */}
          </button>
        );
      })}
    </div>
  );
}
