import { COMPOSER_GRAY, COMPOSER_ORANGE } from "./colors";

type ModeTogglesProps = {
  powered: boolean;
  autoScroll: boolean;
  autoExec: boolean;
  onToggleAutoScroll: () => void;
  onToggleAutoExec: () => void;
};

const BUTTON_SIZE = 65;

export function ModeToggles({
  powered,
  autoScroll,
  autoExec,
  onToggleAutoScroll,
  onToggleAutoExec,
}: ModeTogglesProps) {
  return (
    <div className="flex gap-3 pt-1">
      <div className="flex flex-col items-center gap-1">
        <span className="text-[10px] text-zinc-500 uppercase">auto scroll</span>
        <button
          onClick={onToggleAutoScroll}
          style={{
            width: BUTTON_SIZE,
            height: BUTTON_SIZE,
            background: COMPOSER_GRAY.base,
            borderRadius: 6,
            boxShadow:
              autoScroll && powered
                ? "inset 0 2px 6px rgba(0,0,0,.5), 0 0 10px rgba(255,255,255,.04)"
                : "0 2px 4px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.04)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >

          <p className="text-lg font-bold" style={{ color: autoScroll && powered ? COMPOSER_ORANGE.on.dark : "#555" }}>
          ↓
          </p>

        </button>
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="text-[10px] text-zinc-500 uppercase">auto exec</span>
        <button
          onClick={onToggleAutoExec}
          style={{
            width: BUTTON_SIZE,
            height: BUTTON_SIZE,
            background: COMPOSER_GRAY.base,
            borderRadius: 6,
            boxShadow:
              autoExec && powered
                ? "inset 0 2px 6px rgba(0,0,0,.5), 0 0 10px rgba(255,255,255,.04)"
                : "0 2px 4px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.04)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p className="text-lg font-bold" style={{ color: autoExec && powered ? COMPOSER_ORANGE.on.dark : "#555" }}>
            x
          </p>
        </button>
      </div>
    </div>
  );
}
