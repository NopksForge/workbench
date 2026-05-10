// Mock screenshot placeholder — minimalist, themed.
// Renders a stylized representation of each project for the detail page.
const { useState: _useStateP, useEffect: _useEffectP } = React;

function ScreenshotMock({ kind, accent = "var(--accent)" }) {
  const wrap = (children) => (
    <div className="relative" style={{
      aspectRatio: "16/10",
      background: "var(--surface)",
      border: "1px solid var(--rule)",
      overflow: "hidden",
    }}>
      {/* window chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2" style={{ borderBottom: "1px solid var(--rule)" }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--rule)" }} />
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--rule)" }} />
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--rule)" }} />
        <span className="te-mono ml-3" style={{ fontSize: 9, letterSpacing: ".18em", color: "var(--silk-muted)" }}>
          {kind === "workbench" ? "nopks.space/tools" :
           kind === "dbabuser"  ? "nopks.space/db"   :
           kind === "infinite"  ? "infinite-onslaught.local" :
                                   "debug-and-dragon.local"}
        </span>
      </div>
      <div className="absolute inset-0" style={{ paddingTop: 33 }}>
        {children}
      </div>
    </div>
  );

  if (kind === "workbench") {
    return wrap(
      <div className="p-6 h-full grid grid-cols-3 gap-3">
        <div className="col-span-3 te-mono" style={{ fontSize: 11, letterSpacing: ".22em", color: "var(--silk-muted)", textTransform: "uppercase" }}>dev tools</div>
        <div className="col-span-3 te-sans font-medium" style={{ fontSize: 24, letterSpacing: "-.02em", color: "var(--ink)" }}>
          emoji commits<span style={{ color: accent }}>.</span>
        </div>
        <div className="col-span-3 grid grid-cols-6 gap-px" style={{ background: "var(--rule)", border: "1px solid var(--rule)" }}>
          {["✨","💊","📄","🎨","♻️","⚡","✅","🔧","🚀","👷","📦","🔒"].map((e,i) => (
            <div key={i} style={{ background: "var(--surface)", padding: 8, textAlign: "center", fontSize: 14 }}>{e}</div>
          ))}
        </div>
      </div>
    );
  }
  if (kind === "dbabuser") {
    return wrap(
      <div className="p-6 h-full flex flex-col gap-4 items-center justify-center">
        <div className="te-mono uppercase" style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}>volume</div>
        <div className="te-sans font-medium" style={{ fontSize: 56, color: "var(--ink)", letterSpacing: "-.03em" }}>
          47<span style={{ color: accent }}>%</span>
        </div>
        {/* snake board */}
        <div className="grid" style={{ gridTemplateColumns: "repeat(16, 1fr)", gap: 1, width: "70%" }}>
          {Array.from({ length: 64 }).map((_, i) => {
            const snake = [18, 19, 20, 21, 22, 38].includes(i);
            const food = i === 27;
            return <span key={i} style={{
              aspectRatio: "1", background: snake ? "var(--ink)" : food ? accent : "var(--surface)",
              border: "1px solid var(--rule)",
            }} />;
          })}
        </div>
      </div>
    );
  }
  if (kind === "infinite") {
    return wrap(
      <div className="p-6 h-full flex">
        <div className="flex-1 flex flex-col gap-2 justify-center">
          <div className="te-mono uppercase" style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}>wave 14 / ∞</div>
          <div className="te-sans font-medium" style={{ fontSize: 28, color: "var(--ink)", letterSpacing: "-.02em" }}>infinite onslaught</div>
          <div className="grid grid-cols-3 gap-1 mt-2" style={{ width: "70%" }}>
            {["fire","water","earth","steam","mud","lava","plant","ash","glass"].map((w, i) => (
              <div key={w} className="te-mono px-2 py-1" style={{
                background: "var(--surface)", border: "1px solid var(--rule)",
                fontSize: 10, letterSpacing: ".1em", color: "var(--silk)",
              }}>{w}</div>
            ))}
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div style={{
            width: 140, height: 140, borderRadius: "50%",
            background: `radial-gradient(circle at 40% 35%, ${accent}, transparent 60%)`,
            border: "1px solid var(--rule)",
          }}/>
        </div>
      </div>
    );
  }
  // debug & dragon
  return wrap(
    <div className="p-6 h-full grid grid-cols-2 gap-4">
      <div>
        <div className="te-mono uppercase" style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}>map / forest 03</div>
        <div className="grid mt-2" style={{ gridTemplateColumns: "repeat(8, 1fr)", gap: 1 }}>
          {Array.from({ length: 56 }).map((_, i) => {
            const player = i === 27;
            const tree = [3, 9, 17, 33, 41, 50, 12].includes(i);
            return <span key={i} style={{
              aspectRatio: "1", background: player ? accent : tree ? "var(--ink)" : "var(--surface)",
              border: "1px solid var(--rule)",
            }}/>;
          })}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="te-mono uppercase" style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}>dm</div>
        <div className="te-mono mt-2" style={{ fontSize: 11, lineHeight: 1.6, color: "var(--silk)" }}>
          <span style={{ color: accent }}>&gt;</span> a goblin emerges from the shadows.
        </div>
        <div className="te-mono mt-1" style={{ fontSize: 11, lineHeight: 1.6, color: "var(--silk)" }}>
          <span style={{ color: "var(--silk-muted)" }}>you</span> draw your sword.
        </div>
        <div className="mt-auto flex gap-2">
          {["attack","defend","cast","run"].map((a) => (
            <span key={a} className="te-mono uppercase" style={{
              fontSize: 9, letterSpacing: ".18em", padding: "4px 8px",
              border: "1px solid var(--rule)", color: "var(--silk)",
            }}>{a}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

const PROJECT_DETAILS = {
  workbench: {
    code: "01", name: "Workbench", status: "live",
    tagline: "Quick developer utilities — emoji commits, UUIDs, JSON.",
    desc: "The site you're looking at right now. A growing collection of small developer utilities I reach for daily, plus my personal space and an interactive resume.",
    role: "designer · developer · maintainer",
    period: "2025 — present",
    stack: ["Next.js 14", "TypeScript", "Tailwind", "React 18"],
    links: [
      { label: "open tools", route: "tools" },
      { label: "about me",   route: "about" },
    ],
    features: [
      "Emoji-prefixed git commit copier with search",
      "v4 UUID generator with Bruno / Postman snippets",
      "JSON parser, beautifier and minifier with indent control",
      "Sections expandable as more utilities ship",
    ],
    metrics: [
      { k: "modules",   v: "3" },
      { k: "version",   v: "0.4.2" },
      { k: "uptime",    v: "100%" },
    ],
  },
  dbabuser: {
    code: "02", name: "The dB Abuser", status: "live",
    tagline: "Volume slider, but it's Snake.",
    desc: "Why use a normal volume slider when you can play Snake to adjust it? Absurd mini-games for the one task of changing your audio volume — born from a 4am thought.",
    role: "designer · developer",
    period: "2025",
    stack: ["Next.js", "Web Audio API", "Canvas", "TypeScript"],
    links: [
      { label: "open meme", url: "#" },
      { label: "browse repo", url: "#" },
    ],
    features: [
      "Snake — eat pellets, your volume creeps up or down",
      "Whack-a-mole alternative input mode",
      "Persistent high-score per game across reloads",
      "Real audio output via Web Audio gain node",
    ],
    metrics: [
      { k: "games",   v: "2" },
      { k: "stars",   v: "127" },
      { k: "lines",   v: "~800" },
    ],
  },
  infinite: {
    code: "03", name: "Infinite Onslaught", status: "wip",
    tagline: "Browser roguelite — infinite crafting + tower defense.",
    desc: "Browser-based roguelite combining infinite crafting discovery with real-time tower defense survival. Local AI proposes new recipes from element pairs you've already discovered.",
    role: "designer · gameplay engineer · backend",
    period: "2026",
    stack: ["Go", "Next.js", "WebSockets", "Local LLM (Ollama)", "Canvas"],
    links: [
      { label: "browse repo", url: "#" },
      { label: "design log",  url: "#" },
    ],
    features: [
      "Element-pair crafting — every new combination ships to a shared lexicon",
      "Real-time tower defense with crafted items as towers",
      "Local AI suggests plausible new recipes when you're stuck",
      "Endless waves with permadeath, runs ~15 min",
    ],
    metrics: [
      { k: "elements",  v: "240+" },
      { k: "waves",     v: "∞" },
      { k: "build",     v: "0.2.0" },
    ],
  },
  debugdragon: {
    code: "04", name: "Debug & Dragon", status: "wip",
    tagline: "Browser RPG with live maps, chat, turn-based combat.",
    desc: "A browser RPG with live maps, chat and turn-based combat. Next.js frontend, Go backend, your own local AI plays dungeon master — narration, encounters, loot.",
    role: "designer · full-stack · DM tooling",
    period: "2026",
    stack: ["Go", "gRPC", "Next.js", "Local LLM", "Postgres"],
    links: [
      { label: "browse repo", url: "#" },
      { label: "campaign demo", url: "#" },
    ],
    features: [
      "Persistent grid-based world rendered in real time",
      "Local-LLM dungeon master with party-state context",
      "Turn-based combat with attack / defend / cast / run",
      "Multiplayer chat & shared inventory via gRPC streaming",
    ],
    metrics: [
      { k: "tiles",   v: "1024" },
      { k: "classes", v: "6" },
      { k: "build",   v: "0.1.0" },
    ],
  },
};

function StatusDotInline({ status }) {
  const live = status === "live";
  return (
    <span className="inline-flex items-center gap-2 te-mono uppercase" style={{ fontSize: 10, letterSpacing: ".22em", color: "var(--silk-muted)" }}>
      <span
        className={live ? "" : "te-led-blink"}
        style={{
          width: 6, height: 6, borderRadius: "50%",
          background: live ? "var(--led-green)" : "var(--led-amber)",
          boxShadow: live ? "0 0 6px var(--led-green)" : "0 0 6px var(--led-amber)",
        }}
      />
      {status === "live" ? "live" : "in progress"}
    </span>
  );
}

function ProjectDetail({ id, onRoute, onBack }) {
  const p = PROJECT_DETAILS[id];
  if (!p) return null;

  const handle = (target) => {
    if (target.route) onRoute(target.route);
    else if (target.url) window.open(target.url, "_blank");
    window.playClick && window.playClick("tab");
  };

  // adjacent navigation
  const ids = Object.keys(PROJECT_DETAILS);
  const idx = ids.indexOf(id);
  const prev = ids[(idx - 1 + ids.length) % ids.length];
  const next = ids[(idx + 1) % ids.length];

  return (
    <div className="max-w-[1080px] mx-auto px-6">
      {/* breadcrumb */}
      <div className="pt-10 flex items-center gap-3 te-mono uppercase" style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}>
        <button onClick={onBack} style={{ color: "var(--silk-muted)" }}>
          ← projects
        </button>
        <span>/</span>
        <span style={{ color: "var(--ink)" }}>№ {p.code}</span>
      </div>

      {/* hero */}
      <section className="pt-10 pb-12 grid grid-cols-12 gap-6 items-end">
        <div className="col-span-12 md:col-span-8">
          <StatusDotInline status={p.status} />
          <h1 className="te-sans font-medium leading-[.95] mt-4"
              style={{ fontSize: "clamp(48px, 7vw, 96px)", letterSpacing: "-.03em", color: "var(--ink)" }}>
            {p.name}<span style={{ color: "var(--accent)" }}>.</span>
          </h1>
          <p className="mt-5 max-w-[58ch]" style={{ fontSize: 17, lineHeight: 1.55, color: "var(--silk)" }}>
            {p.desc}
          </p>
        </div>
        <div className="col-span-12 md:col-span-4">
          <div className="grid grid-cols-3 gap-6">
            {p.metrics.map((m) => (
              <div key={m.k}>
                <div className="te-mono uppercase" style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}>{m.k}</div>
                <div className="te-sans font-medium mt-1" style={{ fontSize: 22, color: "var(--ink)", letterSpacing: "-.01em" }}>{m.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* preview */}
      <section className="pb-12">
        <div className="te-mono uppercase mb-3" style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}>
          preview · mock
        </div>
        <ScreenshotMock kind={id} />
      </section>

      {/* details */}
      <section className="pb-16 grid grid-cols-12 gap-8" style={{ borderTop: "1px solid var(--rule)", paddingTop: 36 }}>
        <div className="col-span-12 md:col-span-4">
          <div className="te-mono uppercase mb-2" style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}>role</div>
          <div className="te-sans" style={{ fontSize: 16, color: "var(--ink)", lineHeight: 1.5 }}>{p.role}</div>

          <div className="te-mono uppercase mb-2 mt-6" style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}>period</div>
          <div className="te-sans" style={{ fontSize: 16, color: "var(--ink)" }}>{p.period}</div>

          <div className="te-mono uppercase mb-2 mt-6" style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}>stack</div>
          <div className="flex flex-wrap gap-x-3 gap-y-1 te-mono" style={{ fontSize: 12, color: "var(--ink)" }}>
            {p.stack.map((s) => <span key={s}>{s}</span>)}
          </div>

          <div className="te-mono uppercase mb-2 mt-6" style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}>links</div>
          <div className="flex flex-col gap-2">
            {p.links.map((l, i) => (
              <button key={i} onClick={() => handle(l)}
                className="te-mono uppercase inline-flex items-center gap-2 self-start"
                style={{
                  fontSize: 11, letterSpacing: ".22em",
                  color: "var(--ink)", paddingBottom: 3, borderBottom: "1px solid var(--ink)",
                }}>
                {l.label} <span style={{ color: "var(--accent)" }}>→</span>
              </button>
            ))}
          </div>
        </div>

        <div className="col-span-12 md:col-span-8">
          <div className="te-mono uppercase mb-4" style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}>features</div>
          <ul className="flex flex-col">
            {p.features.map((f, i) => (
              <li key={i}
                className="grid grid-cols-12 gap-4 items-baseline py-4"
                style={{ borderTop: i === 0 ? "none" : "1px solid var(--rule)" }}>
                <span className="col-span-1 te-mono" style={{ fontSize: 11, color: "var(--silk-muted)", letterSpacing: ".15em" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="col-span-11 te-sans" style={{ fontSize: 16, color: "var(--ink)", lineHeight: 1.55 }}>
                  {f}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* prev / next */}
      <section className="grid grid-cols-2 gap-6 py-10" style={{ borderTop: "1px solid var(--rule)" }}>
        <button onClick={() => onRoute("project:" + prev)} className="text-left">
          <div className="te-mono uppercase" style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}>← previous</div>
          <div className="te-sans font-medium mt-1" style={{ fontSize: 22, color: "var(--ink)", letterSpacing: "-.01em" }}>{PROJECT_DETAILS[prev].name}</div>
        </button>
        <button onClick={() => onRoute("project:" + next)} className="text-right">
          <div className="te-mono uppercase" style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}>next →</div>
          <div className="te-sans font-medium mt-1" style={{ fontSize: 22, color: "var(--ink)", letterSpacing: "-.01em" }}>{PROJECT_DETAILS[next].name}</div>
        </button>
      </section>

      <footer className="pb-12 flex items-center justify-between te-mono uppercase" style={{ fontSize: 10, letterSpacing: ".22em", color: "var(--silk-muted)" }}>
        <span>nopksforge © 2026</span>
        <a href="mailto:noppasan.ksj@gmail.com" style={{ color: "var(--accent)" }}>noppasan.ksj@gmail.com</a>
      </footer>
    </div>
  );
}

window.ProjectDetail = ProjectDetail;
window.PROJECT_DETAILS = PROJECT_DETAILS;
window.ScreenshotMock = ScreenshotMock;
