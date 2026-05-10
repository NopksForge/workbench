// Minimalist header — wordmark, three text tabs, theme + sfx, single LED.
const { useEffect: _useEffH } = React;

function HeaderBar({ route, setRoute, theme, setTheme, sound, setSound }) {
  const tabs = [
    { id: "home",  label: "projects", key: "1" },
    { id: "tools", label: "tools",    key: "2" },
    { id: "about", label: "about",    key: "3" },
  ];
  _useEffH(() => {
    const onKey = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.key === "1") setRoute("home");
      if (e.key === "2") setRoute("tools");
      if (e.key === "3") setRoute("about");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className="sticky top-0 z-30"
      style={{
        background: "var(--bg)",
        borderBottom: "1px solid var(--rule)",
      }}
    >
      <div className="max-w-[1080px] mx-auto px-6 py-4 flex items-center gap-8">
        <button
          onClick={() => setRoute("home")}
          className="flex items-center gap-2"
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 6px var(--accent)" }} />
          <span className="te-mono" style={{ fontSize: 12, letterSpacing: ".18em", color: "var(--ink)" }}>
            nopks<span style={{ color: "var(--accent)" }}>forge</span>
          </span>
        </button>

        <nav className="flex items-center gap-5">
          {tabs.map((t) => {
            const active = route === t.id;
            return (
              <button
                key={t.id}
                onClick={() => { window.playClick && window.playClick("tab"); setRoute(t.id); }}
                className="te-mono relative"
                style={{
                  fontSize: 11,
                  letterSpacing: ".22em",
                  color: active ? "var(--ink)" : "var(--silk-muted)",
                  paddingBottom: 2,
                  borderBottom: active ? "1px solid var(--ink)" : "1px solid transparent",
                  textTransform: "uppercase",
                }}
              >
                {t.label}
              </button>
            );
          })}
        </nav>

        <div className="flex-1" />

        <div className="flex items-center gap-5 te-mono" style={{ fontSize: 10, letterSpacing: ".2em", color: "var(--silk-muted)" }}>
          <button
            onClick={() => { window.playClick && window.playClick("switch"); setTheme(theme === "light" ? "dark" : "light"); }}
            style={{ color: "var(--silk-muted)" }}
            className="uppercase"
          >
            {theme === "light" ? "lt" : "dk"}
          </button>
          <button
            onClick={() => { const v = !sound; window.__nf_sound.set(v); setSound(v); window.playClick && window.playClick("switch"); }}
            style={{ color: sound ? "var(--accent)" : "var(--silk-muted)" }}
            className="uppercase"
          >
            sfx
          </button>
        </div>
      </div>
    </header>
  );
}

window.HeaderBar = HeaderBar;
