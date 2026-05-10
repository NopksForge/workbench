// Tiny web-audio click engine. Toggleable via window.__nf_sound.
(function () {
  let ctx = null;
  let enabled = true;
  function ensure() {
    if (!ctx) {
      try { ctx = new (window.AudioContext || window.webkitAudioContext)(); }
      catch (e) { return null; }
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }
  const presets = {
    "pad":      { f: 220, d: 0.06, type: "square", g: 0.18 },
    "knob-down":{ f: 880, d: 0.02, type: "triangle", g: 0.06 },
    "knob-up":  { f: 660, d: 0.02, type: "triangle", g: 0.05 },
    "switch":   { f: 140, d: 0.08, type: "square", g: 0.22 },
    "fader":    { f: 320, d: 0.03, type: "sawtooth", g: 0.08 },
    "tab":      { f: 520, d: 0.04, type: "triangle", g: 0.1 },
    "boot":     { f: 110, d: 0.25, type: "sine", g: 0.18 },
    "beep":     { f: 1320,d: 0.07, type: "square", g: 0.1 },
    "error":    { f: 180, d: 0.15, type: "sawtooth", g: 0.18 },
  };
  window.playClick = function (kind = "pad") {
    if (!enabled) return;
    const a = ensure(); if (!a) return;
    const p = presets[kind] || presets.pad;
    const o = a.createOscillator();
    const g = a.createGain();
    o.type = p.type; o.frequency.value = p.f;
    g.gain.value = 0;
    o.connect(g); g.connect(a.destination);
    const t = a.currentTime;
    g.gain.linearRampToValueAtTime(p.g, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t + p.d);
    o.start(t); o.stop(t + p.d + 0.02);
  };
  window.__nf_sound = {
    set: (v) => { enabled = !!v; },
    get: () => enabled,
  };
})();
