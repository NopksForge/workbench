import type { PointerEvent, RefObject } from "react";
import { BinaryPads } from "./binary_pads";
import { ControlKnobs } from "./control_knobs";
import { DetailSlider } from "./detail_slider";
import { ExecuteLever } from "./execute_lever";
import { ModeToggles } from "./mode_toggles";
type ControlPanelProps = {
  powered: boolean;
  autoScroll: boolean;
  autoExec: boolean;
  scrollPos: number;
  isSliderDragging: boolean;
  sliderTrackRef: RefObject<HTMLDivElement | null>;
  leverPos: number;
  isLeverDragging: boolean;
  leverTrackRef: RefObject<HTMLDivElement | null>;
  sizeAngle: number;
  colorAngle: number;
  padBits: number[];
  onLeverDown: (e: PointerEvent<HTMLDivElement>) => void;
  onLeverMove: (e: PointerEvent<HTMLDivElement>) => void;
  onLeverUp: () => void;
  onToggleAutoScroll: () => void;
  onToggleAutoExec: () => void;
  onSizeDown: (e: PointerEvent<HTMLDivElement>) => void;
  onSizeMove: (e: PointerEvent<HTMLDivElement>) => void;
  onSizeUp: () => void;
  onColorDown: (e: PointerEvent<HTMLDivElement>) => void;
  onColorMove: (e: PointerEvent<HTMLDivElement>) => void;
  onColorUp: () => void;
  onTogglePad: (index: number) => void;
  onSliderDown: (e: PointerEvent<HTMLDivElement>) => void;
  onSliderMove: (e: PointerEvent<HTMLDivElement>) => void;
  onSliderUp: () => void;
  executeLeverTwinkle: boolean;
};
export function ControlPanel({
  powered,
  autoScroll,
  autoExec,
  scrollPos,
  isSliderDragging,
  sliderTrackRef,
  leverPos,
  isLeverDragging,
  leverTrackRef,
  sizeAngle,
  colorAngle,
  padBits,
  onLeverDown,
  onLeverMove,
  onLeverUp,
  onToggleAutoScroll,
  onToggleAutoExec,
  onSizeDown,
  onSizeMove,
  onSizeUp,
  onColorDown,
  onColorMove,
  onColorUp,
  onTogglePad,
  onSliderDown,
  onSliderMove,
  onSliderUp,
  executeLeverTwinkle,
}: ControlPanelProps) {
  return (
    <div className="flex flex-col">
      <div className="ml-6 -mb-5 mt-2 flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold leading-none tracking-tight text-zinc-800">
            NOPPASAN KERDSOMJIT <span className="text-base"></span>
          </p>
          <p className="text-sm font-medium text-zinc-500">ARM</p>
        </div>
      </div>

      <div className="flex flex-row gap-5">
        <div className="mt-5">
          <DetailSlider
            powered={powered}
            scrollPos={scrollPos}
            isDragging={isSliderDragging}
            sliderTrackRef={sliderTrackRef}
            onPointerDown={onSliderDown}
            onPointerMove={onSliderMove}
            onPointerUp={onSliderUp}
          />
        </div>

        <div>
          <div className="flex h-1/2 flex-row justify-between items-center">
            <div>
              <ModeToggles
                powered={powered}
                autoScroll={autoScroll}
                autoExec={autoExec}
                onToggleAutoScroll={onToggleAutoScroll}
                onToggleAutoExec={onToggleAutoExec}
              />
            </div>
            <div className="">
              <ControlKnobs
                powered={powered}
                sizeAngle={sizeAngle}
                colorAngle={colorAngle}
                onSizeDown={onSizeDown}
                onSizeMove={onSizeMove}
                onSizeUp={onSizeUp}
                onColorDown={onColorDown}
                onColorMove={onColorMove}
                onColorUp={onColorUp}
              />
            </div>
          </div>
          <div className="flex flex-row gap-3">
            <BinaryPads
              padBits={padBits}
              powered={powered}
              onTogglePad={onTogglePad}
            />
            <ExecuteLever
              leverPos={leverPos}
              isDragging={isLeverDragging}
              leverTrackRef={leverTrackRef}
              onPointerDown={onLeverDown}
              onPointerMove={onLeverMove}
              onPointerUp={onLeverUp}
              promptExecuteTwinkle={executeLeverTwinkle}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
