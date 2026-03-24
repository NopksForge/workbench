import type { PointerEvent } from "react";

type ControlKnobsProps = {
  powered: boolean;
  sizeAngle: number;
  colorAngle: number;
  onSizeDown: (e: PointerEvent<HTMLDivElement>) => void;
  onSizeMove: (e: PointerEvent<HTMLDivElement>) => void;
  onSizeUp: () => void;
  onColorDown: (e: PointerEvent<HTMLDivElement>) => void;
  onColorMove: (e: PointerEvent<HTMLDivElement>) => void;
  onColorUp: () => void;
};

export function ControlKnobs({
  powered,
  sizeAngle,
  colorAngle,
  onSizeDown,
  onSizeMove,
  onSizeUp,
  onColorDown,
  onColorMove,
  onColorUp,
}: ControlKnobsProps) {
  const sizeRotation = `rotate(${sizeAngle - 135}deg)`;
  const colorRotation = `rotate(${colorAngle - 135}deg)`;

  return (
    <div className="flex flex-1 justify-center gap-2 pt-1">
      <div className="flex flex-col items-center gap-2">
        <span className="text-[10px] text-zinc-500 uppercase">
          text size
        </span>
        <div
          className="relative cursor-grab active:cursor-grabbing"
          style={{
            width: 58,
            height: 58,
            borderRadius: "50%",
            background: powered
              ? "radial-gradient(circle at 35% 35%, #ff8a3a, #ff5a12 58%, #b83705 90%)"
              : "radial-gradient(circle at 35% 35%, #2e343d, #1f242b 58%, #101318 90%)",
            boxShadow: powered
              ? "0 4px 12px rgba(0,0,0,.45), inset 0 1px 2px rgba(255,255,255,.25)"
              : "0 4px 12px rgba(0,0,0,.45), inset 0 1px 2px rgba(255,255,255,.06)",
            touchAction: "none",
          }}
          onPointerDown={onSizeDown}
          onPointerMove={onSizeMove}
          onPointerUp={onSizeUp}
        >
          <div
            className="absolute inset-0"
            style={{ transform: sizeRotation }}
          >
            <div
              className="absolute left-1/2 top-[5px] -translate-x-1/2 rounded-full"
              style={{
                width: 3,
                height: 11,
                background: powered ? "rgba(255,255,255,.88)" : "rgba(255,255,255,.4)",
                boxShadow: powered ? "0 0 3px rgba(255,255,255,.4)" : "none",
              }}
            />
          </div>
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: 38,
              height: 38,
              background: powered
                ? "radial-gradient(circle at 35% 35%, #ff7a2c, #e34808 60%, #9f3005)"
                : "radial-gradient(circle at 35% 35%, #2b3138, #1c2127 60%, #0d1014)",
              boxShadow: "inset 0 1px 2px rgba(255,255,255,.15), 0 2px 5px rgba(0,0,0,.35)",
            }}
          />
        </div>
      </div>

      <div className="flex w-20 flex-col items-center gap-2">
        <span className="text-[10px] text-zinc-500 uppercase">
          color
        </span>
        <div
          className="relative cursor-grab active:cursor-grabbing"
          style={{
            width: 58,
            height: 58,
            borderRadius: "50%",
            background: powered
              ? "radial-gradient(circle at 35% 35%, #2f343d, #1f242b 58%, #101318 90%)"
              : "radial-gradient(circle at 35% 35%, #2e343d, #1f242b 58%, #101318 90%)",
            boxShadow: "0 4px 12px rgba(0,0,0,.45), inset 0 1px 2px rgba(255,255,255,.06)",
            touchAction: "none",
          }}
          onPointerDown={onColorDown}
          onPointerMove={onColorMove}
          onPointerUp={onColorUp}
        >
          <div
            className="absolute inset-0"
            style={{ transform: colorRotation }}
          >
            <div
              className="absolute left-1/2 top-[5px] -translate-x-1/2 rounded-full"
              style={{
                width: 3,
                height: 11,
                background: "rgba(255,255,255,.4)",
                boxShadow: "none",
              }}
            />
          </div>
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: 38,
              height: 38,
              background: powered
                ? "radial-gradient(circle at 35% 35%, #2c3239, #1d2228 60%, #0d1014)"
                : "radial-gradient(circle at 35% 35%, #2b3138, #1c2127 60%, #0d1014)",
              boxShadow: "inset 0 1px 2px rgba(255,255,255,.08), 0 2px 5px rgba(0,0,0,.35)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
