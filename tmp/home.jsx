// Minimalist home — type-driven catalog with a single hardware accent (LED + tiny knob).
const { useState: _useStateH } = React;

const PROJECTS = [
  {
    id: "workbench", code: "01", name: "Workbench", status: "live",
    tagline: "Quick developer utilities — emoji commits, UUIDs, JSON.",
    desc: "The site you're looking at right now. A collection of quick developer utilities. Also doubles as my personal space — head to /about for an interactive resume machine.",
    tags: ["next.js", "typescript", "dev tools"],
    primary: { label: "open tools", route: "tools" },
    secondary: { label: "about me", route: "about" },
  },
  {
    id: "dbabuser", code: "02", name: "The dB Abuser", status: "live",
    tagline: "Volume slider, but it's Snake.",
    desc: "Why use a normal volume slider when you can play Snake to adjust it? Absurd mini-games for the one task of changing your volume.",
    tags: ["next.js", "meme", "game"],
    primary: { label: "open meme", url: "#" },
    secondary: { label: "browse repo", url: "#" },
  },
  {
    id: "infinite", code: "03", name: "Infinite Onslaught", status: "wip",
    tagline: "Browser roguelite — infinite crafting + tower defense.",
    desc: "Browser-based roguelite combining infinite crafting discovery with real-time tower defense survival. AI-powered crafting table to discover new items.",
    tags: ["go", "next.js", "ai", "game"],
    primary: { label: "browse repo", url: "#" },
  },
  {
    id: "debugdragon", code: "04", name: "Debug & Dragon", status: "wip",
    tagline: "Browser RPG with live maps, chat, turn-based combat.",
    desc: "Browser RPG with live maps, chat and turn-based combat. Next.js frontend, Go backend, your local AI as dungeon master.",
    tags: ["go", "next.js", "ai", "game"],
    primary: { label: "browse repo", url: "#" },
  },
];

function StatusDot({ status }) {
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
      {status}
    </span>
  );
}

function ProjectRow({ p, onRoute }) {
  const [hov, setHov] = _useStateH(false);
  const handle = (e, target) => {
    e.stopPropagation();
    if (target.route) onRoute(target.route);
    window.playClick && window.playClick("tab");
  };
  const openDetail = () => {
    onRoute("project:" + p.id);
    window.playClick && window.playClick("tab");
  };
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={openDetail}
      className="grid grid-cols-12 gap-8 py-10 cursor-pointer"
      style={{
        borderTop: "1px solid var(--rule)",
        transition: "background .15s",
        background: hov ? "var(--hover)" : "transparent",
        marginInline: hov ? -16 : 0,
        paddingInline: hov ? 16 : 0,
      }}
    >
      <div className="col-span-12 md:col-span-2">
        <div className="te-mono" style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}>
          № {p.code}
        </div>
        <div className="mt-3"><StatusDot status={p.status} /></div>
      </div>

      <div className="col-span-12 md:col-span-7">
        <h3 className="te-sans font-medium leading-[1] inline-flex items-center gap-3"
            style={{ fontSize: "clamp(28px, 3.4vw, 44px)", letterSpacing: "-.02em", color: "var(--ink)" }}>
          {p.name}
          <span style={{
            color: "var(--accent)",
            fontSize: ".5em",
            transform: hov ? "translateX(6px)" : "translateX(0)",
            transition: "transform .15s",
            display: "inline-block",
          }}>→</span>
        </h3>
        <p className="mt-3" style={{ fontSize: 15, lineHeight: 1.6, color: "var(--silk)", maxWidth: "52ch" }}>
          {p.desc}
        </p>
        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 te-mono uppercase" style={{ fontSize: 10, letterSpacing: ".22em", color: "var(--silk-muted)" }}>
          {p.tags.map((t) => <span key={t}>{t}</span>)}
        </div>
      </div>

      <div className="col-span-12 md:col-span-3 flex flex-col items-start md:items-end gap-2 md:justify-start">
        <button
          onClick={(e) => handle(e, p.primary)}
          className="te-mono uppercase inline-flex items-center gap-2"
          style={{
            fontSize: 11, letterSpacing: ".22em",
            color: "var(--ink)",
            paddingBottom: 4,
            borderBottom: "1px solid var(--ink)",
          }}
        >
          {p.primary.label}
          <span style={{ color: "var(--accent)" }}>→</span>
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); openDetail(); }}
          className="te-mono uppercase mt-2"
          style={{ fontSize: 11, letterSpacing: ".22em", color: "var(--silk-muted)" }}
        >
          view details
        </button>
      </div>
    </div>
  );
}

function Home({ onRoute }) {
  return (
    <div className="max-w-[1080px] mx-auto px-6">
      {/* Hero */}
      <section className="pt-24 pb-20">
        <div className="te-mono uppercase mb-8" style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}>
          nopksforge — index / 2026
        </div>
        <h1
          className="te-sans font-medium leading-[.95]"
          style={{ fontSize: "clamp(56px, 9vw, 128px)", letterSpacing: "-.035em", color: "var(--ink)" }}
        >
          experiments<br />
          in code<span style={{ color: "var(--accent)" }}>.</span>
        </h1>
        <p className="mt-8 max-w-[58ch]" style={{ fontSize: 17, lineHeight: 1.55, color: "var(--silk)" }}>
          Forging random ideas into functional products. Tools, games and weekend coding experiments — built and shipped, listed below.
        </p>
        <div className="mt-10 flex items-center gap-5 te-mono uppercase" style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}>
          <span className="inline-flex items-center gap-2">
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--led-green)", boxShadow: "0 0 6px var(--led-green)" }} />
            system ready
          </span>
          <span>·</span>
          <span>{PROJECTS.length} modules</span>
          <span>·</span>
          <span>keys 1 / 2 / 3 to navigate</span>
        </div>
      </section>

      {/* List */}
      <section className="pb-24">
        <div className="flex items-end justify-between mb-2 te-mono uppercase" style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}>
          <span>featured projects</span>
          <span>live & in-progress</span>
        </div>
        {PROJECTS.map((p) => (
          <ProjectRow key={p.id} p={p} onRoute={onRoute} />
        ))}
        <div style={{ borderTop: "1px solid var(--rule)" }} />
      </section>

      <footer className="pb-12 flex items-center justify-between te-mono uppercase" style={{ fontSize: 10, letterSpacing: ".22em", color: "var(--silk-muted)" }}>
        <span>nopksforge © 2026 · bangkok</span>
        <a href="mailto:noppasan.ksj@gmail.com" style={{ color: "var(--accent)" }}>noppasan.ksj@gmail.com</a>
      </footer>
    </div>
  );
}

window.Home = Home;
