import type { PointerEvent, RefObject } from "react";
import { COMPOSER_ORANGE } from "./colors";

type DetailSliderProps = {
  powered: boolean;
  scrollPos: number;
  isDragging: boolean;
  sliderTrackRef: RefObject<HTMLDivElement | null>;
  onPointerDown: (e: PointerEvent<HTMLDivElement>) => void;
  onPointerMove: (e: PointerEvent<HTMLDivElement>) => void;
  onPointerUp: () => void;
};

export function DetailSlider({
  powered,
  scrollPos,
  isDragging,
  sliderTrackRef,
  onPointerDown,
  onPointerMove,
  onPointerUp,
}: DetailSliderProps) {
  const orange = COMPOSER_ORANGE.on;
  const orangeOff = COMPOSER_ORANGE.off;
  const SLIDER_H = 260;
  const SLOT_TOP = SLIDER_H / 12;
  const SLOT_HEIGHT = (SLIDER_H * 10) / 12;
  const KNOB_SIZE = 12;
  const knobTop = `${SLOT_TOP + scrollPos * (SLOT_HEIGHT - KNOB_SIZE)}px`;

  return (
    <div className="flex flex-row items-center gap-2 pt-6">
      <span
        className="[writing-mode:vertical-lr] transform-[rotate(180deg)] text-[10px] font-bold tracking-[.12em] text-zinc-700"
      >
        DETAIL SLIDER
      </span>
      <div
        ref={sliderTrackRef}
        className="relative h-[260px] w-10 cursor-pointer rounded-[8px] touch-none"
        style={{
          background: powered
            ? `linear-gradient(180deg, ${orange.base}, ${orange.dark} 60%, ${orange.deep})`
            : `linear-gradient(180deg, ${orangeOff.light}, ${orangeOff.dark} 60%, ${orangeOff.deep})`,
          boxShadow: powered
            ? "inset 0 1px 0 rgba(255,255,255,.25), 0 3px 8px rgba(0,0,0,.35)"
            : "inset 0 1px 0 rgba(255,255,255,.1), 0 2px 6px rgba(0,0,0,.35)",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <div
          className="absolute left-1/2 w-2 -translate-x-1/2 rounded-full bg-[#080808] shadow-[inset_0_1px_4px_rgba(0,0,0,.75)]"
          style={{ top: SLOT_TOP, height: SLOT_HEIGHT }}
        />
        <div
          className={`absolute left-1/2 h-7 w-7 -translate-x-1/2 rounded-full ${
            isDragging ? "" : "transition-[top] duration-75 ease-out"
          }`}
          style={{
            top: knobTop,
            border: `1px solid ${powered ? orange.dark : orangeOff.deep}`,
            background: powered
              ? `radial-gradient(circle at 35% 35%, ${orange.light}, ${orange.base} 60%, ${orange.deep})`
              : `radial-gradient(circle at 35% 35%, ${orangeOff.light}, ${orangeOff.base} 60%, ${orangeOff.deep})`,
            boxShadow: powered
              ? "0 6px 18px rgba(0,0,0,.65), 0 2px 10px rgba(0,0,0,.60), inset 0 1px 0 rgba(255,255,255,.28)"
              : "0 4px 14px rgba(0,0,0,.6), 0 1px 6px rgba(0,0,0,.50), inset 0 1px 0 rgba(255,255,255,.15)",
          }}
        />
      </div>
    </div>
  );
}
