// Minimalist about — quiet header, drop-in slot for the existing resume composer.
function About() {
  return (
    <div className="max-w-[1080px] mx-auto px-6">
      <section className="pt-24 pb-16">
        <div className="te-mono uppercase mb-8" style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}>
          nopksforge — operator
        </div>
        <h1 className="te-sans font-medium leading-[.95]"
            style={{ fontSize: "clamp(48px, 7vw, 96px)", letterSpacing: "-.03em", color: "var(--ink)" }}>
          about me<span style={{ color: "var(--accent)" }}>.</span>
        </h1>
        <p className="mt-6 max-w-[58ch]" style={{ fontSize: 17, lineHeight: 1.55, color: "var(--silk)" }}>
          Full-stack engineer. Mission-critical financial apps by day, odd side projects by night. Loves clean architecture, builds monitoring tools, sleeps less than the cat.
        </p>
        <div className="mt-10 grid grid-cols-3 gap-8 max-w-[480px]">
          {[
            { k: "projects", v: "12+" },
            { k: "stack",    v: "ts/go" },
            { k: "tz",       v: "gmt+7" },
          ].map((s) => (
            <div key={s.k}>
              <div className="te-mono uppercase" style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}>{s.k}</div>
              <div className="te-sans font-medium mt-2" style={{ fontSize: 28, color: "var(--ink)" }}>{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12" style={{ borderTop: "1px solid var(--rule)" }}>
        <div className="grid grid-cols-12 gap-6 items-baseline mb-6">
          <div className="col-span-12 md:col-span-2 te-mono uppercase" style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}>
            № 00
          </div>
          <div className="col-span-12 md:col-span-10 flex items-baseline gap-4">
            <h3 className="te-sans font-medium leading-[1]" style={{ fontSize: 28, letterSpacing: "-.02em", color: "var(--ink)" }}>Resume composer</h3>
            <span className="te-mono uppercase" style={{ fontSize: 10, letterSpacing: ".22em", color: "var(--silk-muted)" }}>· unchanged · drop-in</span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2" />
          <div className="col-span-12 md:col-span-10">
            <div
              className="relative flex items-center justify-center"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--rule)",
                minHeight: 460,
                padding: 32,
              }}
            >
              <div className="text-center" style={{ maxWidth: 560 }}>
                <div className="te-mono uppercase" style={{ fontSize: 10, letterSpacing: ".3em", color: "var(--silk-muted)" }}>
                  drop-in slot
                </div>
                <div className="te-sans font-medium mt-3" style={{ fontSize: 22, letterSpacing: "-.01em", color: "var(--ink)" }}>
                  &lt;ResumeComposer /&gt;
                </div>
                <p className="te-mono mt-3" style={{ fontSize: 12, color: "var(--silk-muted)", lineHeight: 1.7, letterSpacing: ".04em" }}>
                  the interactive resume composer from the original site lives here, untouched.<br />
                  when wired into next.js, replace this slot with the existing component.
                </p>
                <div className="mt-6 mx-auto" style={{
                  width: 320, height: 1, background: "var(--rule)",
                }} />
                <div className="mt-6 inline-flex items-center gap-2 te-mono uppercase" style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }} />
                  awaiting mount
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 flex items-center justify-between te-mono uppercase" style={{ fontSize: 10, letterSpacing: ".22em", color: "var(--silk-muted)", borderTop: "1px solid var(--rule)" }}>
        <span>nopksforge © 2026</span>
        <a href="mailto:noppasan.ksj@gmail.com" style={{ color: "var(--accent)" }}>noppasan.ksj@gmail.com</a>
      </footer>
    </div>
  );
}

window.About = About;
