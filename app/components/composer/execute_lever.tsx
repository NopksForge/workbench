import type { PointerEvent, RefObject } from "react";
import { COMPOSER_ORANGE } from "./colors";

type ExecuteLeverProps = {
  leverPos: number;
  isDragging: boolean;
  leverTrackRef: RefObject<HTMLDivElement | null>;
  onPointerDown: (e: PointerEvent<HTMLDivElement>) => void;
  onPointerMove: (e: PointerEvent<HTMLDivElement>) => void;
  onPointerUp: () => void;
  /** Valid codex selected but differs from last executed — orange lever + twinkling indicator bubble */
  promptExecuteTwinkle?: boolean;
};

export function ExecuteLever({
  leverPos,
  isDragging,
  leverTrackRef,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  promptExecuteTwinkle = false,
}: ExecuteLeverProps) {
  const TRACK_HEIGHT = 142;
  const HANDLE_HEIGHT = 48;
  const handleTop = `${leverPos * (TRACK_HEIGHT - HANDLE_HEIGHT)}px`;
  const isTriggered = leverPos > 0.8;
  const showOrange = isTriggered || promptExecuteTwinkle;
  const twinkleActive = promptExecuteTwinkle && !isTriggered;

  return (
    <div className="flex flex-col items-center">
      <style>{`
        @keyframes exec-bubble-twinkle {
          0%, 100% {
            opacity: 0.88;
            filter: brightness(1);
            box-shadow:
              0 0 4px rgba(255, 250, 235, 0.65),
              0 0 10px rgba(251, 146, 60, 0.45),
              inset 0 1px 0 rgba(255, 255, 255, 0.5);
          }
          50% {
            opacity: 1;
            filter: brightness(1.35);
            box-shadow:
              0 0 8px rgba(255, 255, 255, 0.95),
              0 0 16px rgba(251, 191, 36, 0.85),
              0 0 24px rgba(249, 115, 22, 0.55),
              inset 0 1px 0 rgba(255, 255, 255, 0.85);
          }
        }
        @keyframes exec-label-twinkle {
          0%, 100% { opacity: 0.75; text-shadow: 0 0 4px rgba(234,88,12,.35); }
          50% { opacity: 1; text-shadow: 0 0 10px rgba(251,146,60,.75), 0 0 14px rgba(249,115,22,.4); }
        }
        .exec-bubble-twinkle {
          animation: exec-bubble-twinkle 1.2s ease-in-out infinite;
        }
        .exec-label-twinkle {
          animation: exec-label-twinkle 1.35s ease-in-out infinite;
        }
      `}</style>

      <div
        ref={leverTrackRef}
        className="relative w-11 rounded-[7px] border border-zinc-800/80 bg-[linear-gradient(180deg,#171717,#101010)] shadow-[inset_0_2px_8px_rgba(0,0,0,.65),0_1px_0_rgba(255,255,255,.05)]"
        style={{
          height: TRACK_HEIGHT,
        }}
      >
        <div className="absolute inset-y-3 left-1/2 w-2 -translate-x-1/2 rounded-full bg-[#090909] shadow-[inset_0_1px_4px_rgba(0,0,0,.85)]" />
        <div className="absolute left-1/2 top-2 h-1 w-4 -translate-x-1/2 rounded-full bg-zinc-700/70" />
        <div className="absolute bottom-2 left-1/2 h-1 w-4 -translate-x-1/2 rounded-full bg-zinc-700/70" />
        <div
          className="absolute left-1/2 w-[34px] -translate-x-1/2 cursor-grab rounded-md active:cursor-grabbing"
          style={{
            height: HANDLE_HEIGHT,
            top: handleTop,
            background: "linear-gradient(180deg, #4d4d4d, #2d2d2d)",
            borderColor: showOrange ? COMPOSER_ORANGE.on.dark : "#3a3a3a",
            boxShadow: showOrange
              ? "0 3px 9px rgba(0,0,0,.45), 0 0 10px rgba(249,115,22,.22), inset 0 1px 0 rgba(255,255,255,.2)"
              : "0 2px 6px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.1)",
            transition: isDragging ? "none" : "top .25s ease-out",
            touchAction: "none",
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          <div
            className={`mx-auto mt-1.5 h-2 w-5 rounded-full ${
              twinkleActive && !isDragging ? "exec-bubble-twinkle" : ""
            }`}
            style={{
              background: showOrange
                ? "radial-gradient(circle at 35% 30%, #ffffff, #fff7ed 45%, #fed7aa)"
                : "radial-gradient(circle at 35% 30%, #fecaca, #f87171)",
              boxShadow: showOrange
                ? isTriggered
                  ? "0 0 8px rgba(255,237,213,.65)"
                  : twinkleActive && !isDragging
                    ? undefined
                    : "0 0 6px rgba(255,237,213,.5)"
                : "0 0 4px rgba(248,113,113,.35)",
            }}
          />
          <div className="mt-2 flex flex-col items-center gap-px">
            <div className="h-px w-4 rounded bg-zinc-600" />
            <div className="h-px w-4 rounded bg-zinc-600" />
            <div className="h-px w-4 rounded bg-zinc-600" />
          </div>
        </div>
      </div>
      <span
        className={`mt-1 text-[10px] font-bold tracking-wider uppercase ${
          twinkleActive ? "exec-label-twinkle" : ""
        }`}
        style={{
          color: showOrange ? COMPOSER_ORANGE.on.dark : "#71717a",
        }}
      >
        exec.
      </span>
    </div>
  );
}
