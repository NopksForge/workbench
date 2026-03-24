import type { RefObject } from "react";

type DisplayScreenProps = {
  powered: boolean;
  fontSize: number;
  screenColor: string;
  screenLines: string[];
  screenRef: RefObject<HTMLDivElement | null>;
};

export function DisplayScreen({
  powered,
  fontSize,
  screenColor,
  screenLines,
  screenRef,
}: DisplayScreenProps) {
  return (
    <div className="flex-1">
      <p className="mb-1.5 text-xs font-bold tracking-widest text-zinc-400">RESUME</p>
      <div
        className="overflow-hidden rounded-lg p-3"
        style={{
          background: "linear-gradient(160deg, #c8c8c8, #a8a8a8 40%, #b8b8b8)",
          boxShadow: "0 2px 8px rgba(0,0,0,.25)",
        }}
      >
        <div
          className={`relative overflow-hidden rounded ${powered ? "screen-boot" : ""}`}
          style={{
            background: "#0c1210",
            boxShadow: "inset 0 2px 8px rgba(0,0,0,.6)",
          }}
        >
          <div
            ref={screenRef}
            className="overflow-hidden whitespace-pre p-3 font-mono leading-relaxed"
            style={{
              fontSize: `${fontSize}px`,
              color: powered ? screenColor : "transparent",
              textShadow: powered ? `0 0 6px ${screenColor}40` : "none",
              height: 200,
            }}
          >
            {screenLines.map((line, i) => (
              <div key={i}>{line || "\u00A0"}</div>
            ))}
            {powered && <span className="cursor-blink">█</span>}
          </div>
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,.08) 2px, rgba(0,0,0,.08) 4px)",
            }}
          />
        </div>
      </div>
      <p className="mt-2 text-[10px] font-medium tracking-wider text-zinc-500">
        128 MB SAMPLER COMPOSER
      </p>
    </div>
  );
}
