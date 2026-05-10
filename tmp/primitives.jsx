// TE-style hardware primitives. Designed to be portable to Next/TS/Tailwind.
// All visual variables read from CSS custom properties so theme switching is free.

const { useState, useRef, useEffect, useCallback } = React;

// ---------- Screw -----------------------------------------------------------
function Screw({ size = 10, className = "" }) {
  return (
    <span
      className={`inline-block rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: "radial-gradient(circle at 30% 30%, var(--screw-hi), var(--screw-lo) 70%)",
        boxShadow: "inset 0 0 0 1px rgba(0,0,0,.35), 0 1px 0 rgba(255,255,255,.4)",
        position: "relative",
      }}
    >
      <span
        style={{
          position: "absolute",
          inset: 1,
          borderRadius: "50%",
          background:
            "linear-gradient(45deg, transparent 45%, rgba(0,0,0,.45) 45%, rgba(0,0,0,.45) 55%, transparent 55%)",
        }}
      />
    </span>
  );
}

// ---------- LED -------------------------------------------------------------
function Led({ on = true, color = "var(--led-orange)", size = 8, blink = false, label }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className={blink ? "te-led-blink" : ""}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: on ? color : "var(--led-off)",
          boxShadow: on
            ? `0 0 ${size * 0.8}px ${color}, inset 0 0 2px rgba(255,255,255,.6)`
            : "inset 0 1px 1px rgba(0,0,0,.6)",
          flexShrink: 0,
        }}
      />
      {label && (
        <span className="te-mono text-[10px] tracking-[.18em] uppercase opacity-70">{label}</span>
      )}
    </span>
  );
}

// ---------- Label (silkscreen) ---------------------------------------------
function Label({ children, className = "", muted = false }) {
  return (
    <span
      className={`te-mono uppercase tracking-[.22em] ${className}`}
      style={{
        fontSize: 9,
        color: muted ? "var(--silk-muted)" : "var(--silk)",
        lineHeight: 1,
      }}
    >
      {children}
    </span>
  );
}

// ---------- Knob ------------------------------------------------------------
// Drag vertically (or wheel) to change. Value is 0..1.
function Knob({ value = 0.5, onChange, size = 56, label, accent = false, ticks = 11 }) {
  const ref = useRef(null);
  const startRef = useRef(null);
  const [v, setV] = useState(value);
  useEffect(() => setV(value), [value]);

  const set = (nv) => {
    const cl = Math.max(0, Math.min(1, nv));
    setV(cl);
    onChange && onChange(cl);
  };

  const onDown = (e) => {
    e.preventDefault();
    const y0 = e.touches ? e.touches[0].clientY : e.clientY;
    startRef.current = { y0, v0: v };
    window.playClick && window.playClick("knob-down");
    const move = (ev) => {
      const y = ev.touches ? ev.touches[0].clientY : ev.clientY;
      const dy = startRef.current.y0 - y;
      set(startRef.current.v0 + dy / 140);
    };
    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", up);
      window.playClick && window.playClick("knob-up");
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("touchend", up);
  };

  const angle = -135 + v * 270;

  return (
    <div className="flex flex-col items-center gap-2 select-none">
      <div
        ref={ref}
        onMouseDown={onDown}
        onTouchStart={onDown}
        onWheel={(e) => {
          e.preventDefault();
          set(v - Math.sign(e.deltaY) * 0.05);
        }}
        className="te-knob relative cursor-grab active:cursor-grabbing"
        style={{ width: size, height: size }}
      >
        {/* tick ring */}
        <svg className="absolute inset-0" viewBox="0 0 100 100">
          {Array.from({ length: ticks }).map((_, i) => {
            const a = (-135 + (i / (ticks - 1)) * 270) * (Math.PI / 180);
            const x1 = 50 + Math.cos(a) * 46;
            const y1 = 50 + Math.sin(a) * 46;
            const x2 = 50 + Math.cos(a) * 50;
            const y2 = 50 + Math.sin(a) * 50;
            return (
              <line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="var(--silk-muted)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            );
          })}
        </svg>
        {/* knob body */}
        <div
          className="absolute rounded-full"
          style={{
            inset: 6,
            background: accent
              ? "radial-gradient(circle at 35% 30%, #ff8b5a, var(--accent) 55%, #b22d00 100%)"
              : "radial-gradient(circle at 35% 30%, #4a4a4a, #1a1a1a 70%)",
            boxShadow:
              "inset 0 0 0 1px rgba(0,0,0,.4), 0 2px 4px rgba(0,0,0,.4), inset 0 -3px 6px rgba(0,0,0,.4)",
            transform: `rotate(${angle}deg)`,
            transition: startRef.current ? "none" : "transform .08s",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 4,
              left: "50%",
              width: 3,
              height: "38%",
              transform: "translateX(-50%)",
              background: accent ? "#fff" : "var(--accent)",
              borderRadius: 2,
              boxShadow: "0 0 4px rgba(0,0,0,.5)",
            }}
          />
        </div>
      </div>
      {label && <Label>{label}</Label>}
    </div>
  );
}

// ---------- Fader -----------------------------------------------------------
function Fader({ value = 0.5, onChange, height = 120, label, accent = false }) {
  const trackRef = useRef(null);
  const [v, setV] = useState(value);
  useEffect(() => setV(value), [value]);

  const set = (nv) => {
    const cl = Math.max(0, Math.min(1, nv));
    setV(cl);
    onChange && onChange(cl);
  };

  const onDown = (e) => {
    e.preventDefault();
    const rect = trackRef.current.getBoundingClientRect();
    const apply = (ev) => {
      const y = ev.touches ? ev.touches[0].clientY : ev.clientY;
      set(1 - (y - rect.top) / rect.height);
    };
    apply(e);
    window.playClick && window.playClick("fader");
    const move = (ev) => apply(ev);
    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("touchend", up);
  };

  return (
    <div className="flex flex-col items-center gap-2 select-none">
      <div
        ref={trackRef}
        onMouseDown={onDown}
        onTouchStart={onDown}
        className="relative cursor-pointer"
        style={{
          width: 22,
          height,
          background: "var(--track-bg)",
          borderRadius: 4,
          boxShadow: "inset 0 0 0 1px rgba(0,0,0,.35), inset 0 2px 6px rgba(0,0,0,.5)",
        }}
      >
        {/* tick scale */}
        <div
          className="absolute -left-3 top-0 bottom-0 flex flex-col justify-between"
          style={{ width: 8 }}
        >
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} style={{ height: 1, background: "var(--silk-muted)" }} />
          ))}
        </div>
        <div
          className="absolute -right-3 top-0 bottom-0 flex flex-col justify-between"
          style={{ width: 8 }}
        >
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} style={{ height: 1, background: "var(--silk-muted)" }} />
          ))}
        </div>
        {/* cap */}
        <div
          style={{
            position: "absolute",
            left: -8,
            right: -8,
            height: 18,
            top: `calc(${(1 - v) * 100}% - 9px)`,
            background: accent
              ? "linear-gradient(180deg, #ff7a3d, var(--accent) 60%, #b22d00)"
              : "linear-gradient(180deg, #5a5a5a, #1a1a1a 60%, #0d0d0d)",
            borderRadius: 3,
            boxShadow: "0 2px 4px rgba(0,0,0,.5), inset 0 0 0 1px rgba(0,0,0,.4)",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 4,
              right: 4,
              top: "50%",
              height: 2,
              background: accent ? "rgba(255,255,255,.7)" : "var(--accent)",
              transform: "translateY(-50%)",
              borderRadius: 1,
            }}
          />
        </div>
      </div>
      {label && <Label>{label}</Label>}
    </div>
  );
}

// ---------- Pad (sampler) ---------------------------------------------------
function Pad({ active = false, accent = false, onClick, label, sub, hotkey, children }) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onMouseDown={() => {
        setPressed(true);
        window.playClick && window.playClick("pad");
      }}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onClick={onClick}
      className="te-pad relative text-left"
      style={{
        background: accent
          ? "linear-gradient(180deg, #ff7a3d, var(--accent) 60%, #b22d00)"
          : "linear-gradient(180deg, var(--pad-hi), var(--pad-lo))",
        color: accent ? "#fff" : "var(--silk)",
        borderRadius: 6,
        boxShadow: pressed
          ? "inset 0 2px 6px rgba(0,0,0,.5), 0 0 0 1px rgba(0,0,0,.3)"
          : "0 2px 0 rgba(0,0,0,.4), inset 0 0 0 1px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.18)",
        transform: pressed ? "translateY(1px)" : "none",
        transition: "transform .06s",
        padding: "10px 12px",
        minHeight: 64,
        outline: active ? "2px solid var(--accent)" : "none",
        outlineOffset: 2,
      }}
    >
      {hotkey && (
        <span
          className="te-mono absolute top-1.5 right-2"
          style={{ fontSize: 9, opacity: 0.55, letterSpacing: ".1em" }}
        >
          {hotkey}
        </span>
      )}
      {children || (
        <>
          <div className="te-mono uppercase" style={{ fontSize: 11, letterSpacing: ".15em" }}>
            {label}
          </div>
          {sub && (
            <div className="te-mono mt-1" style={{ fontSize: 9, opacity: 0.6 }}>
              {sub}
            </div>
          )}
        </>
      )}
    </button>
  );
}

// ---------- Screen (LCD/OLED) ----------------------------------------------
function Screen({ children, className = "", tone = "amber", scanlines = true }) {
  const tones = {
    amber: { fg: "#ffaa3a", bg: "#1c0e02", glow: "rgba(255,170,58,.5)" },
    green: { fg: "#7eff8e", bg: "#06140a", glow: "rgba(126,255,142,.5)" },
    blue:  { fg: "#7ec8ff", bg: "#06121c", glow: "rgba(126,200,255,.5)" },
    mono:  { fg: "#e9e9e9", bg: "#0d0d0d", glow: "rgba(255,255,255,.25)" },
  };
  const t = tones[tone] || tones.amber;
  return (
    <div
      className={`relative te-mono ${className}`}
      style={{
        background: t.bg,
        color: t.fg,
        textShadow: `0 0 6px ${t.glow}`,
        borderRadius: 4,
        boxShadow:
          "inset 0 0 0 1px #000, inset 0 0 12px rgba(0,0,0,.85), 0 1px 0 rgba(255,255,255,.06)",
        padding: "10px 14px",
        fontSize: 12,
        lineHeight: 1.5,
        overflow: "hidden",
      }}
    >
      {children}
      {scanlines && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "repeating-linear-gradient(0deg, rgba(0,0,0,.18) 0 1px, transparent 1px 3px)",
          }}
        />
      )}
    </div>
  );
}

// ---------- Panel (TE chassis) ---------------------------------------------
function Panel({ children, className = "", screws = true, tone = "default" }) {
  const tones = {
    default: "var(--panel-bg)",
    accent: "var(--accent)",
    dark:    "var(--panel-dark)",
    cream:   "var(--panel-cream)",
  };
  return (
    <div
      className={`relative ${className}`}
      style={{
        background: tones[tone] || tones.default,
        borderRadius: 12,
        boxShadow:
          "inset 0 0 0 1px var(--panel-edge), inset 0 1px 0 rgba(255,255,255,.55), 0 1px 0 rgba(0,0,0,.15), 0 12px 32px -16px rgba(0,0,0,.45)",
      }}
    >
      {screws && (
        <>
          <Screw className="absolute top-2 left-2" />
          <Screw className="absolute top-2 right-2" />
          <Screw className="absolute bottom-2 left-2" />
          <Screw className="absolute bottom-2 right-2" />
        </>
      )}
      {children}
    </div>
  );
}

// ---------- Toggle Switch (rocker) -----------------------------------------
function Rocker({ on, onChange, label }) {
  return (
    <div className="flex flex-col items-center gap-2 select-none">
      <button
        onClick={() => {
          window.playClick && window.playClick("switch");
          onChange && onChange(!on);
        }}
        className="relative"
        style={{
          width: 32,
          height: 48,
          background: "linear-gradient(180deg, #2a2a2a, #0d0d0d)",
          borderRadius: 4,
          boxShadow: "inset 0 0 0 1px rgba(0,0,0,.5), 0 1px 0 rgba(255,255,255,.2)",
        }}
      >
        <span
          style={{
            position: "absolute",
            left: 3,
            right: 3,
            height: 20,
            top: on ? 3 : "calc(100% - 23px)",
            background: on
              ? "linear-gradient(180deg, #ff8a4d, var(--accent))"
              : "linear-gradient(180deg, #555, #2a2a2a)",
            borderRadius: 3,
            transition: "top .12s",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,.3), 0 1px 1px rgba(0,0,0,.5)",
          }}
        />
      </button>
      {label && <Label>{label}</Label>}
    </div>
  );
}

// ---------- Vent grille ----------------------------------------------------
function Grille({ rows = 4, cols = 16, className = "" }) {
  return (
    <div className={className} style={{ display: "grid", gap: 3, gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {Array.from({ length: rows * cols }).map((_, i) => (
        <span
          key={i}
          style={{
            height: 4,
            background: "var(--grille)",
            borderRadius: 1,
            boxShadow: "inset 0 1px 0 rgba(0,0,0,.4)",
          }}
        />
      ))}
    </div>
  );
}

Object.assign(window, { Screw, Led, Label, Knob, Fader, Pad, Screen, Panel, Rocker, Grille });
