import { ProjectList } from "./components/project_list";
import { PROJECTS } from "@/lib/projects";

export default function Home() {
  return (
    <div className="max-w-[1080px] mx-auto px-6">
      {/* Hero */}
      <section className="pt-24 pb-20">
        <div
          className="te-mono uppercase mb-8"
          style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}
        >
          nopksforge — index / 2026
        </div>
        <h1
          className="te-sans font-medium leading-[.95]"
          style={{
            fontSize: "clamp(56px, 9vw, 128px)",
            letterSpacing: "-.035em",
            color: "var(--ink)",
          }}
        >
          experiments
          <br />
          in code<span style={{ color: "var(--accent)" }}>.</span>
        </h1>
        <p
          className="mt-8 max-w-[58ch]"
          style={{ fontSize: 17, lineHeight: 1.55, color: "var(--silk)" }}
        >
          Forging random ideas into functional products. Tools, games and
          weekend coding experiments — built and shipped, listed below.
        </p>
        <div
          className="mt-10 flex items-center gap-5 te-mono uppercase"
          style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}
        >
          <span className="inline-flex items-center gap-2">
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--led-green)",
                boxShadow: "0 0 6px var(--led-green)",
              }}
            />
            system ready
          </span>
          <span>·</span>
          <span>{PROJECTS.length} modules</span>
        </div>
      </section>

      {/* Project list */}
      <ProjectList />
    </div>
  );
}
