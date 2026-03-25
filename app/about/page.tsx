"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ClipboardToast } from "@/app/components/clipboard_toast";
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
      "  Full-stack engineer building mission-critical financial apps by day, odd side projects by night.",
      "",
      "  Loves clean architectures, builds monitoring tools, even made a Discord bot to cut context-switching.",
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
      "    linkedin.com/in/noppasan-kerdsomjit-b55297206",
      "    ",
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
      "    ─────────────────",
      "    Critical backend for Thailand's top financial platforms: Paotang, Krungthai NEXT, Clicx Bank.",
      "",
      "    → OIDC auth for Paotang login reliability.",
      "    → Loan processing for Clicx & Krungthai NEXT.",
      "    → Go, Redis, PostgreSQL, Clean Architecture.",
      "    → Grafana, Docker, K8s, Helm CI/CD.",
      "    → Discord bot for internal testing.",
      "",
      "  ► SOFTWARE ENGINEER",
      "    Toyota Tsusho DENSO Electronics",
      "    Jul 2022 — Oct 2023",
      "    ─────────────────",
      "    Automotive ECU embedded software & internal tools.",
      "",
      "    → Automated MATLAB tooling (cut man-hours by 60%)",
      "    → Model-based software with Japanese engineering teams",
      '    → Won "Best Developer" in company kaizen awards',
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
      "    King Mongkut's University of Technology Thonburi",
      "    ",
      "    B.Eng. Control System &Instrumentation",
      "    ",
      "    GPA 3.53 / 4.00 (2nd class honors)",
      "    ",
      "    Graduated June 2022",
      "",
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

const COPYABLE_LINES: Record<string, string> = {
  "noppasan.ksj@gmail.com": "noppasan.ksj@gmail.com",
  "+66-65-374-4234": "+66-65-374-4234",
};

const LINK_LINES: Record<string, string> = {
  "github.com/NopksForge": "https://github.com/NopksForge",
  "linkedin.com/in/noppasan-kerdsomjit-b55297206": "https://linkedin.com/in/noppasan-kerdsomjit-b55297206",
};

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
  const [toastId, setToastId] = useState<number | null>(null);
  const [toastMsg, setToastMsg] = useState("");

  const screenRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const autoScrollTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const leverDrag = useRef({ active: false });
  const leverTrackRef = useRef<HTMLDivElement>(null);
  const sizeDrag = useRef({ active: false, centerX: 0, centerY: 0, startPointerAngle: 0, startA: 0 });
  const colorDrag = useRef({ active: false, centerX: 0, centerY: 0, startPointerAngle: 0, startA: 0 });
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
          const line = src[idx.v];
          setScreenLines((p) => [...p, line]);
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
            const line = boot[idx.v];
            setScreenLines((p) => [...p, line]);
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
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const pointerAngle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
      sizeDrag.current = { active: true, centerX: cx, centerY: cy, startPointerAngle: pointerAngle, startA: sizeAngle };
    },
    [powered, sizeAngle],
  );
  const onSizeMove = useCallback((e: React.PointerEvent) => {
    if (!sizeDrag.current.active) return;
    const { centerX, centerY, startPointerAngle, startA } = sizeDrag.current;
    const currentAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
    let delta = currentAngle - startPointerAngle;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    setSizeAngle(clamp(startA + delta, 0, 270));
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
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const pointerAngle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
      colorDrag.current = { active: true, centerX: cx, centerY: cy, startPointerAngle: pointerAngle, startA: colorAngle };
    },
    [powered, colorAngle],
  );
  const onColorMove = useCallback((e: React.PointerEvent) => {
    if (!colorDrag.current.active) return;
    const { centerX, centerY, startPointerAngle, startA } = colorDrag.current;
    const currentAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
    let delta = currentAngle - startPointerAngle;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    setColorAngle(clamp(startA + delta, 0, 270));
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

  const handleLineCopy = useCallback((value: string) => {
    navigator.clipboard.writeText(value);
    setToastMsg(`Copied: ${value}`);
    setToastId(Date.now());
  }, []);

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
        className="relative w-full min-w-[740px] max-w-[688px] select-none overflow-hidden rounded-2xl bg-zinc-300 shadow-[0_24px_80px_rgba(0,0,0,.6),inset_0_1px_0_rgba(255,255,255,.06)]"
      >
        <TopHeaderBar />

        <div className="flex min-w-0 gap-4 p-4 pb-3">
          <DisplayScreen
            powered={powered}
            fontSize={fontSize}
            screenColor={screenColor}
            screenLines={screenLines}
            screenRef={screenRef}
            copyableLines={COPYABLE_LINES}
            linkLines={LINK_LINES}
            onLineCopy={handleLineCopy}
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

      <ClipboardToast
        id={toastId}
        message={toastMsg}
        onDismiss={() => setToastId(null)}
      />
    </div>
  );
}
