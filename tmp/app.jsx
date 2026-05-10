// Main app — routing, theme, sound, boot, tweaks panel.
const { useState: _useStateA, useEffect: _useEffectA } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "accent": "#ff5b1f",
  "boot": true,
  "sound": true
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = _useStateA("home");
  const [theme, setTheme] = _useStateA(t.theme || "light");
  const [sound, setSound] = _useStateA(t.sound !== false);
  const [booted, setBooted] = _useStateA(!t.boot);

  _useEffectA(() => { setTheme(t.theme); }, [t.theme]);
  _useEffectA(() => { setSound(!!t.sound); window.__nf_sound && window.__nf_sound.set(!!t.sound); }, [t.sound]);
  _useEffectA(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.setProperty("--accent", t.accent || "#ff5b1f");
  }, [theme, t.accent]);

  const onRoute = (r) => {
    setRoute(r);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--ink)" }}>
      {!booted && t.boot && <BootSequence onDone={() => setBooted(true)} />}

      <HeaderBar
        route={route}
        setRoute={onRoute}
        theme={theme}
        setTheme={(v) => { setTheme(v); setTweak("theme", v); }}
        sound={sound}
        setSound={(v) => { setSound(v); setTweak("sound", v); }}
      />

      <main>
        {route === "home"  && <Home onRoute={onRoute} />}
        {route === "tools" && <Tools />}
        {route === "about" && <About />}
        {route.startsWith("project:") && (
          <ProjectDetail
            id={route.slice(8)}
            onRoute={onRoute}
            onBack={() => onRoute("home")}
          />
        )}
      </main>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Theme">
          <TweakRadio
            label="Mode"
            value={t.theme}
            onChange={(v) => setTweak("theme", v)}
            options={[
              { value: "light", label: "Light" },
              { value: "dark",  label: "Dark"  },
            ]}
          />
          <TweakColor
            label="Accent"
            value={t.accent}
            onChange={(v) => setTweak("accent", v)}
            options={["#ff5b1f", "#cf3a1a", "#0a4f9e", "#1f8a5b", "#f4c542"]}
          />
        </TweakSection>
        <TweakSection label="Behavior">
          <TweakToggle
            label="Boot sequence"
            value={!!t.boot}
            onChange={(v) => setTweak("boot", v)}
          />
          <TweakToggle
            label="Sound effects"
            value={!!t.sound}
            onChange={(v) => setTweak("sound", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
