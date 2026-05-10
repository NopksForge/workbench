// Minimalist boot — single line, one accent dot.
const { useState: _useStateB, useEffect: _useEffectB } = React;

function BootSequence({ onDone }) {
  const lines = [
    "boot · power",
    "boot · mcu",
    "boot · sampler",
    "boot · display",
    "boot · audio",
    "load nopksforge os",
    "ready.",
  ];
  const [i, setI] = _useStateB(0);
  _useEffectB(() => {
    if (i >= lines.length) {
      const t = setTimeout(() => onDone && onDone(), 320);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      window.playClick && window.playClick(i === 0 ? "boot" : "beep");
      setI((n) => n + 1);
    }, i === 0 ? 200 : 130);
    return () => clearTimeout(t);
  }, [i]);
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center"
         style={{ background: "var(--bg)" }}>
      <div className="te-mono" style={{ fontSize: 12, letterSpacing: ".22em", color: "var(--silk)" }}>
        <span style={{
          display: "inline-block", width: 7, height: 7, borderRadius: "50%",
          background: "var(--accent)", boxShadow: "0 0 8px var(--accent)",
          marginRight: 12, verticalAlign: 1,
        }} />
        <span style={{ color: "var(--ink)" }}>{lines[Math.min(i, lines.length - 1)]}</span>
        <span className="te-cursor" />
      </div>
    </div>
  );
}

window.BootSequence = BootSequence;
