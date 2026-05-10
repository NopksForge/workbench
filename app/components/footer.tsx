export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--rule)" }}>
      <div
        className="max-w-[1080px] mx-auto px-6 py-12 flex justify-between te-mono uppercase"
        style={{ fontSize: 10, letterSpacing: ".22em", color: "var(--silk-muted)" }}
      >
        <span>nopksforge © 2026 · bangkok</span>
        <div className="flex flex-col items-end gap-2">
          <a href="mailto:noppasan.ksj@gmail.com" style={{ color: "var(--accent)" }}>
            noppasan.ksj@gmail.com
          </a>
          <a href="https://github.com/NopksForge" style={{ color: "var(--accent)" }}>
            github
          </a>
          <a href="https://linkedin.com/in/noppasan-kerdsomjit-b55297206" style={{ color: "var(--accent)" }}>
            linkedin
          </a>
        </div>


      </div>
    </footer>
  );
}
