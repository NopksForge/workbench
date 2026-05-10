// Web Audio click engine — parity with tmp/sound.js; toggle via localStorage + __nf_sound.

export const SFX_STORAGE_KEY = "nf_sfx";

export type ClickKind =
  | "pad"
  | "knob-down"
  | "knob-up"
  | "switch"
  | "fader"
  | "tab"
  | "boot"
  | "beep"
  | "error";

let ctx: AudioContext | null = null;
let enabled = true;

function ensure(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    try {
      ctx = new AC();
    } catch {
      return null;
    }
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

const presets: Record<string, { f: number; d: number; type: OscillatorType; g: number }> = {
  pad: { f: 220, d: 0.06, type: "square", g: 0.18 },
  "knob-down": { f: 880, d: 0.02, type: "triangle", g: 0.06 },
  "knob-up": { f: 660, d: 0.02, type: "triangle", g: 0.05 },
  switch: { f: 140, d: 0.08, type: "square", g: 0.22 },
  fader: { f: 320, d: 0.03, type: "sawtooth", g: 0.08 },
  tab: { f: 520, d: 0.04, type: "triangle", g: 0.1 },
  boot: { f: 110, d: 0.25, type: "sine", g: 0.18 },
  beep: { f: 1320, d: 0.07, type: "square", g: 0.1 },
  error: { f: 180, d: 0.15, type: "sawtooth", g: 0.18 },
};

export function playClick(kind: ClickKind = "pad"): void {
  if (!enabled || typeof window === "undefined") return;
  const a = ensure();
  if (!a) return;
  const p = presets[kind] ?? presets.pad;
  const o = a.createOscillator();
  const g = a.createGain();
  o.type = p.type;
  o.frequency.value = p.f;
  g.gain.value = 0;
  o.connect(g);
  g.connect(a.destination);
  const t = a.currentTime;
  g.gain.linearRampToValueAtTime(p.g, t + 0.005);
  g.gain.exponentialRampToValueAtTime(0.0001, t + p.d);
  o.start(t);
  o.stop(t + p.d + 0.02);
}

export function setSoundEnabled(v: boolean): void {
  enabled = !!v;
}

export function getSoundEnabled(): boolean {
  return enabled;
}

/** Default on when unset. */
export function hydrateSoundPreference(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const s = localStorage.getItem(SFX_STORAGE_KEY);
    const on = s !== "0";
    enabled = on;
    return on;
  } catch {
    return true;
  }
}

export function persistSoundPreference(on: boolean): void {
  try {
    localStorage.setItem(SFX_STORAGE_KEY, on ? "1" : "0");
  } catch {
    /* ignore */
  }
}

export function registerGlobalSoundBridge(): void {
  if (typeof window === "undefined") return;
  window.playClick = (kind = "pad") => {
    const k = kind && kind in presets ? kind : "pad";
    playClick(k as ClickKind);
  };
  window.__nf_sound = {
    set: setSoundEnabled,
    get: getSoundEnabled,
  };
}

declare global {
  interface Window {
    playClick?: (kind?: string) => void;
    __nf_sound?: { set: (v: boolean) => void; get: () => boolean };
  }
}
