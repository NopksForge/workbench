// Minimalist tools — quiet utility cards, single accent.
const { useState: _useStateT, useEffect: _useEffectT, useMemo: _useMemoT } = React;

const EMOJI_KITS = [
  { e: "✨", k: "feat" },     { e: "💊", k: "fix" },
  { e: "📄", k: "docs" },     { e: "🎨", k: "style" },
  { e: "♻️", k: "refactor" }, { e: "⚡", k: "perf" },
  { e: "✅", k: "test" },     { e: "🔧", k: "config" },
  { e: "🚀", k: "deploy" },   { e: "👷", k: "ci" },
  { e: "📦", k: "build" },    { e: "🔒", k: "security" },
  { e: "⏪", k: "revert" },   { e: "🔀", k: "merge" },
  { e: "🧹", k: "cleanup" },  { e: "🏗", k: "structure" },
  { e: "🔊", k: "logs" },     { e: "🔇", k: "remove logs" },
  { e: "✏️", k: "typo" },     { e: "➕", k: "add dep" },
  { e: "➖", k: "remove dep" },{ e: "🗃", k: "db" },
  { e: "🔥", k: "remove" },   { e: "🚑", k: "hotfix" },
];

function ToolHeader({ code, name, desc }) {
  return (
    <div className="grid grid-cols-12 gap-6 items-baseline mb-6">
      <div className="col-span-12 md:col-span-2 te-mono uppercase" style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}>
        № {code}
      </div>
      <div className="col-span-12 md:col-span-10">
        <h3 className="te-sans font-medium leading-[1]" style={{ fontSize: 28, letterSpacing: "-.02em", color: "var(--ink)" }}>{name}</h3>
        {desc && <p className="te-mono mt-2" style={{ fontSize: 12, color: "var(--silk-muted)", letterSpacing: ".04em" }}>{desc}</p>}
      </div>
    </div>
  );
}

function ToolSection({ children }) {
  return (
    <section className="py-12" style={{ borderTop: "1px solid var(--rule)" }}>
      {children}
    </section>
  );
}

function ModuleCommits() {
  const [q, setQ] = _useStateT("");
  const [copied, setCopied] = _useStateT(null);
  const filtered = EMOJI_KITS.filter((x) => x.k.includes(q.toLowerCase()));
  const pick = (x) => {
    navigator.clipboard?.writeText(`git commit -m "${x.e} ${x.k}: "`);
    setCopied(x.k);
    window.playClick && window.playClick("pad");
    setTimeout(() => setCopied(null), 1100);
  };
  return (
    <ToolSection>
      <ToolHeader code="01" name="Emoji commits" desc="Tap to copy a git commit -m prefix." />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-2" />
        <div className="col-span-12 md:col-span-10">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="search…"
            className="te-mono w-full bg-transparent outline-none mb-5"
            style={{
              fontSize: 13, letterSpacing: ".06em",
              padding: "10px 0",
              borderBottom: "1px solid var(--rule)",
              color: "var(--ink)",
            }}
          />
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-px"
               style={{ background: "var(--rule)", border: "1px solid var(--rule)" }}>
            {filtered.map((x) => (
              <button
                key={x.k}
                onClick={() => pick(x)}
                className="flex items-center gap-3 text-left"
                style={{
                  background: copied === x.k ? "var(--accent-soft)" : "var(--bg)",
                  padding: "14px 14px",
                  transition: "background .12s",
                }}
                onMouseEnter={(e) => { if (copied !== x.k) e.currentTarget.style.background = "var(--hover)"; }}
                onMouseLeave={(e) => { if (copied !== x.k) e.currentTarget.style.background = "var(--bg)"; }}
              >
                <span style={{ fontSize: 18, lineHeight: 1 }}>{x.e}</span>
                <span className="te-mono uppercase" style={{ fontSize: 10, letterSpacing: ".15em", color: copied === x.k ? "var(--accent)" : "var(--silk)" }}>
                  {copied === x.k ? "copied" : x.k}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </ToolSection>
  );
}

function ModuleUUID() {
  const gen = () =>
    "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  const [uuid, setUuid] = _useStateT(gen());
  const [pulse, setPulse] = _useStateT(0);
  _useEffectT(() => {
    const id = setInterval(() => setPulse((p) => p + 1), 900);
    return () => clearInterval(id);
  }, []);
  const refresh = () => { setUuid(gen()); window.playClick && window.playClick("beep"); };
  return (
    <ToolSection>
      <ToolHeader code="02" name="UUID generator" desc="Random v4 — copy into Bruno or Postman." />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-2" />
        <div className="col-span-12 md:col-span-10">
          <div className="flex items-center gap-4 mb-5">
            <span style={{
              width: 7, height: 7, borderRadius: "50%",
              background: "var(--led-green)",
              boxShadow: "0 0 8px var(--led-green)",
              opacity: pulse % 2 ? 1 : 0.55,
              transition: "opacity .25s",
            }} />
            <code className="te-mono" style={{ fontSize: 18, letterSpacing: ".04em", color: "var(--ink)" }}>{uuid}</code>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 te-mono uppercase" style={{ fontSize: 11, letterSpacing: ".22em" }}>
            <button onClick={refresh} style={{ color: "var(--ink)", borderBottom: "1px solid var(--ink)", paddingBottom: 3 }}>
              regenerate <span style={{ color: "var(--accent)" }}>↻</span>
            </button>
            <button onClick={() => { navigator.clipboard?.writeText(uuid); window.playClick && window.playClick("tab"); }}
              style={{ color: "var(--silk-muted)" }}>copy uuid</button>
            <button onClick={() => { navigator.clipboard?.writeText(`bru.setVar("randUuid","${uuid}");`); window.playClick && window.playClick("tab"); }}
              style={{ color: "var(--silk-muted)" }}>copy bruno</button>
            <button onClick={() => { navigator.clipboard?.writeText(`pm.environment.set("randUuid","${uuid}");`); window.playClick && window.playClick("tab"); }}
              style={{ color: "var(--silk-muted)" }}>copy postman</button>
          </div>
        </div>
      </div>
    </ToolSection>
  );
}

function ModuleJson() {
  const [src, setSrc] = _useStateT(`{"hello":"world","items":[1,2,3]}`);
  const [mode, setMode] = _useStateT("beautify");
  const [indent, setIndent] = _useStateT(2);
  const out = _useMemoT(() => {
    try {
      const o = JSON.parse(src);
      if (mode === "minify") return JSON.stringify(o);
      return JSON.stringify(o, null, indent);
    } catch (e) { return "// parse error: " + e.message; }
  }, [src, mode, indent]);
  const valid = !out.startsWith("// parse");
  return (
    <ToolSection>
      <ToolHeader code="03" name="JSON formatter" desc="Parse, beautify, minify." />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-2" />
        <div className="col-span-12 md:col-span-10 grid grid-cols-1 md:grid-cols-2 gap-px"
             style={{ background: "var(--rule)", border: "1px solid var(--rule)" }}>
          <div style={{ background: "var(--bg)" }}>
            <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: "1px solid var(--rule)" }}>
              <span className="te-mono uppercase" style={{ fontSize: 10, letterSpacing: ".22em", color: "var(--silk-muted)" }}>input</span>
              <span className="te-mono" style={{ fontSize: 10, color: "var(--silk-muted)" }}>{src.length}b</span>
            </div>
            <textarea
              value={src}
              onChange={(e) => setSrc(e.target.value)}
              spellCheck={false}
              className="w-full te-mono outline-none bg-transparent"
              style={{ minHeight: 200, padding: "12px 16px", fontSize: 12, color: "var(--ink)", resize: "vertical", lineHeight: 1.6 }}
            />
          </div>
          <div style={{ background: "var(--bg)" }}>
            <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: "1px solid var(--rule)" }}>
              <span className="te-mono uppercase" style={{ fontSize: 10, letterSpacing: ".22em", color: "var(--silk-muted)" }}>output</span>
              <span className="te-mono uppercase inline-flex items-center gap-2" style={{ fontSize: 10, letterSpacing: ".22em", color: valid ? "var(--led-green)" : "var(--led-red)" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: valid ? "var(--led-green)" : "var(--led-red)" }} />
                {valid ? "ok" : "error"}
              </span>
            </div>
            <pre className="te-mono" style={{ margin: 0, padding: "12px 16px", fontSize: 12, color: "var(--ink)", whiteSpace: "pre-wrap", maxHeight: 240, overflow: "auto", lineHeight: 1.6 }}>
              {out}
            </pre>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-12 md:col-span-2" />
        <div className="col-span-12 md:col-span-10 flex flex-wrap gap-x-6 gap-y-2 te-mono uppercase" style={{ fontSize: 11, letterSpacing: ".22em" }}>
          <button onClick={() => { setMode("beautify"); window.playClick && window.playClick("tab"); }}
            style={{ color: mode === "beautify" ? "var(--ink)" : "var(--silk-muted)", borderBottom: mode === "beautify" ? "1px solid var(--ink)" : "1px solid transparent", paddingBottom: 3 }}>
            beautify
          </button>
          <button onClick={() => { setMode("minify"); window.playClick && window.playClick("tab"); }}
            style={{ color: mode === "minify" ? "var(--ink)" : "var(--silk-muted)", borderBottom: mode === "minify" ? "1px solid var(--ink)" : "1px solid transparent", paddingBottom: 3 }}>
            minify
          </button>
          <span style={{ color: "var(--silk-muted)" }}>indent</span>
          {[2, 4, "tab"].map((n) => (
            <button key={n} onClick={() => { setIndent(n === "tab" ? "\t" : n); window.playClick && window.playClick("tab"); }}
              style={{ color: indent === (n === "tab" ? "\t" : n) ? "var(--accent)" : "var(--silk-muted)" }}>
              {n}
            </button>
          ))}
          <button onClick={() => { navigator.clipboard?.writeText(out); window.playClick && window.playClick("beep"); }}
            style={{ color: "var(--ink)", borderBottom: "1px solid var(--ink)", paddingBottom: 3, marginLeft: "auto" }}>
            copy output <span style={{ color: "var(--accent)" }}>↵</span>
          </button>
        </div>
      </div>
    </ToolSection>
  );
}

function Tools() {
  return (
    <div className="max-w-[1080px] mx-auto px-6">
      <section className="pt-24 pb-12">
        <div className="te-mono uppercase mb-8" style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}>
          nopksforge — workbench
        </div>
        <h1 className="te-sans font-medium leading-[.95]"
            style={{ fontSize: "clamp(48px, 7vw, 96px)", letterSpacing: "-.03em", color: "var(--ink)" }}>
          dev tools<span style={{ color: "var(--accent)" }}>.</span>
        </h1>
        <p className="mt-6 max-w-[58ch]" style={{ fontSize: 16, lineHeight: 1.6, color: "var(--silk)" }}>
          Quick helpers — more sections can land here over time.
        </p>
      </section>

      <ModuleCommits />
      <ModuleUUID />
      <ModuleJson />

      <footer className="py-12 flex items-center justify-between te-mono uppercase" style={{ fontSize: 10, letterSpacing: ".22em", color: "var(--silk-muted)", borderTop: "1px solid var(--rule)" }}>
        <span>nopksforge © 2026</span>
        <a href="mailto:noppasan.ksj@gmail.com" style={{ color: "var(--accent)" }}>noppasan.ksj@gmail.com</a>
      </footer>
    </div>
  );
}

window.Tools = Tools;
