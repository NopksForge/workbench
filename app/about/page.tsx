"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { CodexPanel } from "@/app/components/composer/codex_panel";
import { ControlPanel } from "@/app/components/composer/control_panel";
import { DisplayScreen } from "@/app/components/composer/display_screen";
import { PowerStatusPanel } from "@/app/components/composer/power_status_panel";
import { TopHeaderBar } from "@/app/components/composer/top_header_bar";
import type { CodexEntry } from "@/app/components/composer/types";

/* ═══════════════════════════════════════════════════════════════
   RESUME DATA MACHINE — Teenage Engineering KO II inspired
   ═══════════════════════════════════════════════════════════════ */

const RESUME: Record<string, { title: string; lines: string[] }> = {
  "000001": {
    title: "SUMMARIES",
    lines: [
      "══════════════════════",
      "  NOPPASAN KERDSOMJIT",
      "  FULL STACK ENGINEER",
      "══════════════════════",
      "",
      "  Full-stack engineer who ships",
      "  mission-critical financial",
      "  services by day and builds",
      "  absurd side projects by night.",
      "",
      "  Clean architecture enthusiast,",
      "  observability nerd, and the",
      "  guy who built a Discord bot",
      "  so his team could stop",
      "  context-switching.",
      "",
      "  ▸ LOCATION : Bangkok, Thailand",
      "  ▸ STATUS   : Building things",
      "  ▸ COFFEE   : ∞ cups",
    ],
  },
  "010100": {
    title: "CONTACT",
    lines: [
      "══════════════════════",
      "  CONTACT INFORMATION",
      "══════════════════════",
      "",
      "  ▸ EMAIL",
      "    noppasan.ksj@gmail.com",
      "",
      "  ▸ PHONE",
      "    +66-65-374-4234",
      "",
      "  ▸ GITHUB",
      "    github.com/NopksForge",
      "",
      "  ▸ LINKEDIN",
      "    linkedin.com/in/noppasan",
      "    -kerdsomjit-b55297206",
    ],
  },
  "110001": {
    title: "EXPERIENCE",
    lines: [
      "══════════════════════",
      "  WORK EXPERIENCE",
      "══════════════════════",
      "",
      "  ► FULL STACK ENGINEER",
      "    Arise by INFINITAS",
      "    Nov 2023 — Present",
      "    ─────────────────────────",
      "    Mission-critical backend",
      "    services for Thailand's",
      "    premier financial apps —",
      "    Paotang, Krungthai NEXT,",
      "    and Clicx Bank.",
      "",
      "    → OIDC auth microservices",
      "      for Paotang — improved",
      "      login reliability.",
      "    → High-availability loan",
      "      processing for Clicx",
      "      Bank and Krungthai NEXT.",
      "    → Go + Redis + PostgreSQL",
      "      Clean Architecture.",
      "    → Grafana observability;",
      "      Docker, K8s, Helm CI/CD.",
      "    → Internal Discord bot for",
      "      test triggers & status.",
      "",
      "  ► SOFTWARE ENGINEER",
      "    Toyota Tsusho DENSO",
      "    Electronics",
      "    Jul 2022 — Oct 2023",
      "    ─────────────────────────",
      "    Automotive ECU embedded",
      "    software & internal tools.",
      "",
      "    → Automated MATLAB tooling",
      "      cut man-hours by 60%.",
      "    → Model-based software with",
      "      Japanese engineering teams.",
      '    → Won "Best Developer" in',
      "      company kaizen awards.",
    ],
  },
  "000101": {
    title: "SKILLS",
    lines: [
      "══════════════════════",
      "  TECHNICAL SKILLS",
      "══════════════════════",
      "",
      "  ▸ LANGUAGES",
      "    Golang · TypeScript · SQL · C",
      "",
      "  ▸ FRAMEWORKS",
      "    Next.js · React",
      "",
      "  ▸ INFRASTRUCTURE",
      "    Docker · Kubernetes · Helm",
      "",
      "  ▸ DATA",
      "    PostgreSQL · Redis · Kafka",
      "",
      "  ▸ CLOUD",
      "    GCP · AWS",
      "",
      "  ▸ MONITORING",
      "    Grafana · K6",
      "",
      "  ▸ PRACTICES",
      "    Clean Architecture",
      "    Agile / Scrum",
      "    CI/CD · Observability",
    ],
  },
  "101010": {
    title: "INTERESTING INFO",
    lines: [
      "══════════════════════",
      "  INTERESTING INFO",
      "══════════════════════",
      "",
      "  ▸ EDUCATION",
      "    King Mongkut's University",
      "    of Technology Thonburi",
      "    B.Eng. Control System &",
      "    Instrumentation",
      "    GPA 3.53 / 4.00",
      "    2nd class honors",
      "    Graduated June 2022",
      "",
      "  ▸ ON AI & BUILDING THINGS",
      "    ─────────────────",
      "    Innovation can't be",
      "    un-invented. The world",
      "    changes every single day",
      "    and it's impossible to",
      "    chase all of it — but",
      "    I try my best.",
      "",
      "    AI lets me ship ideas at",
      "    a speed I never had before.",
      "    I think fast, break things",
      "    along the way, and fix",
      "    them just as fast.",
      "",
      "    My take: treat AI as a",
      "    multiplier, not a replace-",
      "    ment. The engineer who",
      "    understands the system",
      "    will always outpace the",
      "    one who only copies the",
      "    output.",
    ],
  },
};

const NOT_FOUND_LINES = [
  "══════════════════════",
  "  ERROR 404",
  "══════════════════════",
  "",
  "  INVALID CODEX ENTRY",
  "",
  "  The combination you entered",
  "  does not match any known",
  "  data record in the system.",
  "",
  "  VALID CODES:",
  "  000001 → summaries",
  "  010100 → contact",
  "  110001 → experience",
  "  000101 → skills",
  "  101010 → interesting info",
];

const BOOT_LINES = [
  "  SYSTEM ONLINE",
  "  ─────────────────",
  "  128 MB SAMPLER COMPOSER",
  "  RESUME DATA MACHINE v1.0",
  "",
  "  SELECT CODEX ENTRY",
  "  DRAG EXECUTE TO LOAD",
  "  OR ENTER LAUNCH CODE",
  "",
  "  ▸ READY",
];

const CODEX: CodexEntry[] = [
  { code: "000001", top: "0 0 0", bot: "0 0 1", label: "summaries\n" },
  { code: "010100", top: "0 1 0", bot: "1 0 0", label: "contact" },
  { code: "110001", top: "1 1 0", bot: "0 0 1", label: "experience" },
  { code: "000101", top: "0 0 0", bot: "1 0 1", label: "skills" },
  { code: "101010", top: "1 0 1", bot: "0 1 0", label: "education" },
];

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function codeToBits(code: string): number[] {
  const bits = code.split("").map((c) => (c === "1" ? 1 : 0));
  while (bits.length < 6) bits.push(0);
  return bits.slice(0, 6);
}

export default function AboutPage() {
  const [powered, setPowered] = useState(false);
  const [activeCode, setActiveCode] = useState("000000");
  const [screenLines, setScreenLines] = useState<string[]>([]);
  const [sizeAngle, setSizeAngle] = useState(90);
  const [colorAngle, setColorAngle] = useState(90);
  const [scrollPos, setScrollPos] = useState(0);
  const [autoScroll, setAutoScroll] = useState(false);
  const [autoExec, setAutoExec] = useState(false);
  const [launchCode, setLaunchCode] = useState("");
  const [leverPos, setLeverPos] = useState(0);
  const [executed, setExecuted] = useState(false);
  const [lastExecutedCode, setLastExecutedCode] = useState<string | null>(null);
  const [padBits, setPadBits] = useState<number[]>([0, 0, 0, 0, 0, 0]);

  const screenRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const autoScrollTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const leverDrag = useRef({ active: false });
  const leverTrackRef = useRef<HTMLDivElement>(null);
  const sizeDrag = useRef({ active: false, startY: 0, startA: 0 });
  const colorDrag = useRef({ active: false, startY: 0, startA: 0 });
  const sliderDrag = useRef({ active: false });
  const sliderTrackRef = useRef<HTMLDivElement>(null);
  const prevCodeRef = useRef(activeCode);

  const fontSize = 10 + (sizeAngle / 270) * 10;
  const hue = (colorAngle / 270) * 360;
  const screenColor = `hsl(${hue}, 80%, 65%)`;

  /* ── Execute data load ── */
  const executeCode = useCallback(
    (code: string) => {
      if (!powered) return;
      if (timerRef.current) clearInterval(timerRef.current);
      const data = RESUME[code];
      const src = data ? [...data.lines] : [...NOT_FOUND_LINES];
      setScreenLines([]);
      setScrollPos(0);
      setExecuted(true);
      setLastExecutedCode(code);
      const idx = { v: 0 };
      timerRef.current = setInterval(() => {
        if (idx.v < src.length) {
          setScreenLines((p) => [...p, src[idx.v]]);
          idx.v++;
        } else {
          if (timerRef.current) clearInterval(timerRef.current);
          timerRef.current = null;
        }
      }, 35);
    },
    [powered],
  );

  /* ── Power toggle ── */
  const togglePower = useCallback(() => {
    setPowered((prev) => {
      if (!prev) {
        setScreenLines([]);
        setExecuted(false);
        setLastExecutedCode(null);
        const idx = { v: 0 };
        const boot = [...BOOT_LINES];
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
          if (idx.v < boot.length) {
            setScreenLines((p) => [...p, boot[idx.v]]);
            idx.v++;
          } else {
            if (timerRef.current) clearInterval(timerRef.current);
            timerRef.current = null;
          }
        }, 60);
      } else {
        if (timerRef.current) clearInterval(timerRef.current);
        if (autoScrollTimer.current) clearInterval(autoScrollTimer.current);
        timerRef.current = null;
        autoScrollTimer.current = null;
        setScreenLines([]);
        setScrollPos(0);
        setAutoScroll(false);
        setAutoExec(false);
        setExecuted(false);
        setLastExecutedCode(null);
        setLeverPos(0);
        setPadBits([0, 0, 0, 0, 0, 0]);
        setActiveCode("000000");
        setLaunchCode("");
      }
      return !prev;
    });
  }, []);

  /* ── Auto-exec when code changes ── */
  useEffect(() => {
    if (activeCode !== prevCodeRef.current) {
      prevCodeRef.current = activeCode;
      if (autoExec && powered) {
        executeCode(activeCode);
      }
    }
  }, [activeCode, autoExec, powered, executeCode]);

  /* ── Auto-exec when toggle turned on ── */
  useEffect(() => {
    if (autoExec && powered && executed) {
      executeCode(activeCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoExec]);

  /* ── Auto-scroll ── */
  useEffect(() => {
    if (autoScrollTimer.current) {
      clearInterval(autoScrollTimer.current);
      autoScrollTimer.current = null;
    }
    if (!autoScroll || !powered) return;
    autoScrollTimer.current = setInterval(() => {
      setScrollPos((p) => (p + 0.004 > 1 ? 0 : p + 0.004));
    }, 50);
    return () => {
      if (autoScrollTimer.current) clearInterval(autoScrollTimer.current);
    };
  }, [autoScroll, powered]);

  /* ── Sync scroll position to screen element ── */
  useEffect(() => {
    if (!screenRef.current) return;
    const el = screenRef.current;
    const maxS = Math.max(0, el.scrollHeight - el.clientHeight);
    el.scrollTop = scrollPos * maxS;
  }, [scrollPos, screenLines]);

  /* ── Cleanup on unmount ── */
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (autoScrollTimer.current) clearInterval(autoScrollTimer.current);
    };
  }, []);

  /* ── Lever handlers ── */
  const onLeverDown = useCallback(
    (e: React.PointerEvent) => {
      if (!powered) return;
      e.preventDefault();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      leverDrag.current.active = true;
    },
    [powered],
  );
  const onLeverMove = useCallback((e: React.PointerEvent) => {
    if (!leverDrag.current.active || !leverTrackRef.current) return;
    const rect = leverTrackRef.current.getBoundingClientRect();
    const trackH = rect.height - 44;
    const relY = e.clientY - rect.top - 22;
    setLeverPos(clamp(relY / trackH, 0, 1));
  }, []);
  const onLeverUp = useCallback(() => {
    if (!leverDrag.current.active) return;
    leverDrag.current.active = false;
    if (leverPos > 0.8) executeCode(activeCode);
    setLeverPos(0);
  }, [leverPos, executeCode, activeCode]);

  /* ── Size knob handlers ── */
  const onSizeDown = useCallback(
    (e: React.PointerEvent) => {
      if (!powered) return;
      e.preventDefault();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      sizeDrag.current = { active: true, startY: e.clientY, startA: sizeAngle };
    },
    [powered, sizeAngle],
  );
  const onSizeMove = useCallback((e: React.PointerEvent) => {
    if (!sizeDrag.current.active) return;
    const delta = sizeDrag.current.startY - e.clientY;
    setSizeAngle(clamp(sizeDrag.current.startA + delta * 1.5, 0, 270));
  }, []);
  const onSizeUp = useCallback(() => {
    sizeDrag.current.active = false;
  }, []);

  /* ── Color knob handlers ── */
  const onColorDown = useCallback(
    (e: React.PointerEvent) => {
      if (!powered) return;
      e.preventDefault();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      colorDrag.current = {
        active: true,
        startY: e.clientY,
        startA: colorAngle,
      };
    },
    [powered, colorAngle],
  );
  const onColorMove = useCallback((e: React.PointerEvent) => {
    if (!colorDrag.current.active) return;
    const delta = colorDrag.current.startY - e.clientY;
    setColorAngle(clamp(colorDrag.current.startA + delta * 1.5, 0, 270));
  }, []);
  const onColorUp = useCallback(() => {
    colorDrag.current.active = false;
  }, []);

  /* ── Slider handlers ── */
  const updateSlider = useCallback((e: React.PointerEvent) => {
    if (!sliderTrackRef.current) return;
    const rect = sliderTrackRef.current.getBoundingClientRect();
    const relY = e.clientY - rect.top;
    setScrollPos(clamp(relY / rect.height, 0, 1));
  }, []);
  const onSliderDown = useCallback(
    (e: React.PointerEvent) => {
      if (!powered) return;
      e.preventDefault();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      sliderDrag.current.active = true;
      updateSlider(e);
    },
    [powered, updateSlider],
  );
  const onSliderMove = useCallback(
    (e: React.PointerEvent) => {
      if (!sliderDrag.current.active) return;
      updateSlider(e);
    },
    [updateSlider],
  );
  const onSliderUp = useCallback(() => {
    sliderDrag.current.active = false;
  }, []);

  /* ── Pad toggle ── */
  const togglePad = useCallback(
    (index: number) => {
      if (!powered) return;
      const next = [...padBits];
      next[index] = next[index] === 1 ? 0 : 1;
      setPadBits(next);
      const code = next.join("");
      setActiveCode(code);
      setLaunchCode(code);
    },
    [powered, padBits],
  );

  const statusText = !powered
    ? "OFFLINE"
    : !executed || !lastExecutedCode
      ? "AWAITING INPUT"
      : RESUME[lastExecutedCode]
        ? `LOADED: ${RESUME[lastExecutedCode].title}`
        : "ERR: UNKNOWN CODE";

  const executeLeverTwinkle =
    powered &&
    Object.prototype.hasOwnProperty.call(RESUME, activeCode) &&
    activeCode !== lastExecutedCode;

  return (
    <div className="flex min-h-[calc(100vh-48px)] items-start justify-center overflow-x-auto bg-zinc-50 dark:bg-zinc-950 p-3 sm:items-center sm:p-6">
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes bootFlash { 0%{opacity:0} 30%{opacity:1} 60%{opacity:.4} 100%{opacity:1} }
        .cursor-blink { animation: blink 1s step-end infinite; }
        .screen-boot { animation: bootFlash .4s ease-out; }
      `}</style>

      <div
        className="relative min-w-[740px] max-w-[860px] select-none overflow-hidden rounded-2xl bg-zinc-300 shadow-[0_24px_80px_rgba(0,0,0,.6),inset_0_1px_0_rgba(255,255,255,.06)]"
      >
        <TopHeaderBar />

        <div className="flex gap-4 p-4 pb-3">
          <DisplayScreen
            powered={powered}
            fontSize={fontSize}
            screenColor={screenColor}
            screenLines={screenLines}
            screenRef={screenRef}
          />
          <PowerStatusPanel
            powered={powered}
            statusText={statusText}
            onTogglePower={togglePower}
          />
        </div>

        <div className="flex justify-between gap-2 px-4 pb-4">
          <ControlPanel
            powered={powered}
            autoScroll={autoScroll}
            autoExec={autoExec}
            scrollPos={scrollPos}
            isSliderDragging={sliderDrag.current.active}
            sliderTrackRef={sliderTrackRef}
            leverPos={leverPos}
            isLeverDragging={leverDrag.current.active}
            leverTrackRef={leverTrackRef}
            sizeAngle={sizeAngle}
            colorAngle={colorAngle}
            padBits={padBits}
            onLeverDown={onLeverDown}
            onLeverMove={onLeverMove}
            onLeverUp={onLeverUp}
            onToggleAutoScroll={() => powered && setAutoScroll((p) => !p)}
            onToggleAutoExec={() => powered && setAutoExec((p) => !p)}
            onSizeDown={onSizeDown}
            onSizeMove={onSizeMove}
            onSizeUp={onSizeUp}
            onColorDown={onColorDown}
            onColorMove={onColorMove}
            onColorUp={onColorUp}
            onTogglePad={togglePad}
            onSliderDown={onSliderDown}
            onSliderMove={onSliderMove}
            onSliderUp={onSliderUp}
            executeLeverTwinkle={executeLeverTwinkle}
          />
          <CodexPanel
            codexEntries={CODEX}
            activeCode={activeCode}
            powered={powered}
          />
        </div>
      </div>
    </div>
  );
}
