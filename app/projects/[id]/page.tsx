import Link from "next/link";
import { notFound } from "next/navigation";
import { ImageLightbox } from "@/app/components/image_lightbox";
import { PROJECTS } from "@/lib/projects";
import type { Project } from "@/lib/projects";

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ id: p.id }));
}

function isExternal(href: string) {
  return href.startsWith("http");
}

function StatusDot({ status }: { status: "live" | "wip" }) {
  const live = status === "live";
  return (
    <span
      className="inline-flex items-center gap-2 te-mono uppercase"
      style={{ fontSize: 10, letterSpacing: ".22em", color: "var(--silk-muted)" }}
    >
      <span
        className={live ? "" : "te-led-blink"}
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: live ? "var(--led-green)" : "var(--led-amber)",
          boxShadow: live ? "0 0 6px var(--led-green)" : "0 0 6px var(--led-amber)",
        }}
      />
      {live ? "live" : "in progress"}
    </span>
  );
}

function ScreenshotMock({ id }: { id: string }) {
  const accent = "var(--accent)";

  const chrome = (children: React.ReactNode, label: string) => (
    <div
      className="relative"
      style={{
        aspectRatio: "16/10",
        background: "var(--surface)",
        border: "1px solid var(--rule)",
        overflow: "hidden",
      }}
    >
      <div
        className="flex items-center gap-1.5 px-3 py-2"
        style={{ borderBottom: "1px solid var(--rule)" }}
      >
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--rule)" }} />
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--rule)" }} />
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--rule)" }} />
        <span
          className="te-mono ml-3"
          style={{ fontSize: 9, letterSpacing: ".18em", color: "var(--silk-muted)" }}
        >
          {label}
        </span>
      </div>
      <div className="absolute inset-0" style={{ paddingTop: 33 }}>
        {children}
      </div>
    </div>
  );

  if (id === "workbench") {
    return chrome(
      <div className="p-6 h-full grid grid-cols-3 gap-3">
        <div
          className="col-span-3 te-mono"
          style={{ fontSize: 11, letterSpacing: ".22em", color: "var(--silk-muted)", textTransform: "uppercase" }}
        >
          dev tools
        </div>
        <div
          className="col-span-3 te-sans font-medium"
          style={{ fontSize: 24, letterSpacing: "-.02em", color: "var(--ink)" }}
        >
          emoji commits<span style={{ color: accent }}>.</span>
        </div>
        <div
          className="col-span-3 grid grid-cols-6 gap-px"
          style={{ background: "var(--rule)", border: "1px solid var(--rule)" }}
        >
          {["✨", "💊", "📄", "🎨", "♻️", "⚡", "✅", "🔧", "🚀", "👷", "📦", "🔒"].map((e, i) => (
            <div key={i} style={{ background: "var(--surface)", padding: 8, textAlign: "center", fontSize: 14 }}>
              {e}
            </div>
          ))}
        </div>
      </div>,
      "nopks.space/tools"
    );
  }

  if (id === "dbabuser") {
    return chrome(
      <div className="p-6 h-full flex flex-col gap-4 items-center justify-center">
        <div className="te-mono uppercase" style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}>
          volume
        </div>
        <div className="te-sans font-medium" style={{ fontSize: 56, color: "var(--ink)", letterSpacing: "-.03em" }}>
          47<span style={{ color: accent }}>%</span>
        </div>
        <div className="grid" style={{ gridTemplateColumns: "repeat(16, 1fr)", gap: 1, width: "70%" }}>
          {Array.from({ length: 64 }).map((_, i) => {
            const snake = [18, 19, 20, 21, 22, 38].includes(i);
            const food = i === 27;
            return (
              <span
                key={i}
                style={{
                  aspectRatio: "1",
                  background: snake ? "var(--ink)" : food ? accent : "var(--surface)",
                  border: "1px solid var(--rule)",
                  display: "block",
                }}
              />
            );
          })}
        </div>
      </div>,
      "nopks.space/db"
    );
  }

  if (id === "infinite") {
    return chrome(
      <div className="p-6 h-full flex">
        <div className="flex-1 flex flex-col gap-2 justify-center">
          <div className="te-mono uppercase" style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}>
            wave 14 / ∞
          </div>
          <div className="te-sans font-medium" style={{ fontSize: 28, color: "var(--ink)", letterSpacing: "-.02em" }}>
            infinite onslaught
          </div>
          <div className="grid grid-cols-3 gap-1 mt-2" style={{ width: "70%" }}>
            {["fire", "water", "earth", "steam", "mud", "lava", "plant", "ash", "glass"].map((w) => (
              <div
                key={w}
                className="te-mono px-2 py-1"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--rule)",
                  fontSize: 10,
                  letterSpacing: ".1em",
                  color: "var(--silk)",
                }}
              >
                {w}
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: "50%",
              background: `radial-gradient(circle at 40% 35%, ${accent}, transparent 60%)`,
              border: "1px solid var(--rule)",
            }}
          />
        </div>
      </div>,
      "infinite-onslaught.local"
    );
  }

  // debugdragon
  return chrome(
    <div className="p-6 h-full grid grid-cols-2 gap-4">
      <div>
        <div className="te-mono uppercase" style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}>
          map / forest 03
        </div>
        <div className="grid mt-2" style={{ gridTemplateColumns: "repeat(8, 1fr)", gap: 1 }}>
          {Array.from({ length: 56 }).map((_, i) => {
            const player = i === 27;
            const tree = [3, 9, 17, 33, 41, 50, 12].includes(i);
            return (
              <span
                key={i}
                style={{
                  aspectRatio: "1",
                  background: player ? accent : tree ? "var(--ink)" : "var(--surface)",
                  border: "1px solid var(--rule)",
                  display: "block",
                }}
              />
            );
          })}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="te-mono uppercase" style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}>
          dm
        </div>
        <div className="te-mono mt-2" style={{ fontSize: 11, lineHeight: 1.6, color: "var(--silk)" }}>
          <span style={{ color: accent }}>&gt;</span> a goblin emerges from the shadows.
        </div>
        <div className="te-mono mt-1" style={{ fontSize: 11, lineHeight: 1.6, color: "var(--silk)" }}>
          <span style={{ color: "var(--silk-muted)" }}>you</span> draw your sword.
        </div>
        <div className="mt-auto flex gap-2">
          {["attack", "defend", "cast", "run"].map((a) => (
            <span
              key={a}
              className="te-mono uppercase"
              style={{
                fontSize: 9,
                letterSpacing: ".18em",
                padding: "4px 8px",
                border: "1px solid var(--rule)",
                color: "var(--silk)",
              }}
            >
              {a}
            </span>
          ))}
        </div>
      </div>
    </div>,
    "debug-and-dragon.local"
  );
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const idx = PROJECTS.findIndex((p) => p.id === id);
  if (idx === -1) notFound();

  const p: Project = PROJECTS[idx];
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  return (
    <div className="max-w-[1080px] mx-auto px-6">
      {/* breadcrumb */}
      <div
        className="pt-10 flex items-center gap-3 te-mono uppercase"
        style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}
      >
        <Link href="/" style={{ color: "var(--silk-muted)", textDecoration: "none" }}>
          ← projects
        </Link>
        <span>/</span>
        <span style={{ color: "var(--ink)" }}>№ {p.code}</span>
      </div>

      {/* hero */}
      <section className="pt-10 pb-12 grid grid-cols-12 gap-6 items-end">
        <div className="col-span-12 md:col-span-8">
          <StatusDot status={p.status} />
          <h1
            className="te-sans font-medium leading-[.95] mt-4"
            style={{ fontSize: "clamp(48px, 7vw, 96px)", letterSpacing: "-.03em", color: "var(--ink)" }}
          >
            {p.name}
            <span style={{ color: "var(--accent)" }}>.</span>
          </h1>
          <p className="mt-5 max-w-[58ch]" style={{ fontSize: 17, lineHeight: 1.55, color: "var(--silk)" }}>
            {p.desc}
          </p>
        </div>
        <div className="col-span-12 md:col-span-4">
          <div className="grid grid-cols-3 gap-6">
            {p.metrics.map((m) => (
              <div key={m.k}>
                <div
                  className="te-mono uppercase"
                  style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}
                >
                  {m.k}
                </div>
                <div
                  className="te-sans font-medium mt-1"
                  style={{ fontSize: 22, color: "var(--ink)", letterSpacing: "-.01em" }}
                >
                  {m.v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* preview */}
      <section className="pb-12">
        <div
          className="te-mono uppercase mb-3"
          style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}
        >
          {p.isMock ? "preview · mock" : "preview"}
        </div>
        {p.isMock ? (
          <ScreenshotMock id={id} />
        ) : (
          <ImageLightbox
            images={p.previewImages ?? []}
            alt={p.name}
            previewIsPortrait={p.previewIsPortrait}
            previewScale={p.previewScale}
            previewForceCarousel={p.previewForceCarousel}
            previewCarouselIntervalMs={p.previewCarouselIntervalMs}
          />
        )}
      </section>

      {/* details */}
      <section
        className="pb-16 grid grid-cols-12 gap-8"
        style={{ borderTop: "1px solid var(--rule)", paddingTop: 36 }}
      >
        <div className="col-span-12 md:col-span-4">
          <div
            className="te-mono uppercase mb-2"
            style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}
          >
            role
          </div>
          <div className="te-sans" style={{ fontSize: 16, color: "var(--ink)", lineHeight: 1.5 }}>
            {p.role}
          </div>

          <div
            className="te-mono uppercase mb-2 mt-6"
            style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}
          >
            period
          </div>
          <div className="te-sans" style={{ fontSize: 16, color: "var(--ink)" }}>
            {p.period}
          </div>

          <div
            className="te-mono uppercase mb-2 mt-6"
            style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}
          >
            stack
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1 te-mono" style={{ fontSize: 12, color: "var(--ink)" }}>
            {p.stack.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>

          <div
            className="te-mono uppercase mb-2 mt-6"
            style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}
          >
            links
          </div>
          <div className="flex flex-col gap-2">
            {isExternal(p.primaryHref) ? (
              <a
                href={p.primaryHref}
                target="_blank"
                rel="noopener noreferrer"
                className="te-mono uppercase inline-flex items-center gap-2 self-start"
                style={{
                  fontSize: 11,
                  letterSpacing: ".22em",
                  color: "var(--ink)",
                  paddingBottom: 3,
                  borderBottom: "1px solid var(--ink)",
                  textDecoration: "none",
                }}
              >
                {p.primaryLabel} <span style={{ color: "var(--accent)" }}>→</span>
              </a>
            ) : (
              <Link
                href={p.primaryHref}
                className="te-mono uppercase inline-flex items-center gap-2 self-start"
                style={{
                  fontSize: 11,
                  letterSpacing: ".22em",
                  color: "var(--ink)",
                  paddingBottom: 3,
                  borderBottom: "1px solid var(--ink)",
                  textDecoration: "none",
                }}
              >
                {p.primaryLabel} <span style={{ color: "var(--accent)" }}>→</span>
              </Link>
            )}

            {p.secondaryLabel && p.secondaryHref &&
              (isExternal(p.secondaryHref) ? (
                <a
                  href={p.secondaryHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="te-mono uppercase inline-flex items-center gap-2 self-start"
                  style={{
                    fontSize: 11,
                    letterSpacing: ".22em",
                    color: "var(--silk-muted)",
                    textDecoration: "none",
                  }}
                >
                  {p.secondaryLabel} <span style={{ color: "var(--accent)" }}>→</span>
                </a>
              ) : (
                <Link
                  href={p.secondaryHref}
                  className="te-mono uppercase inline-flex items-center gap-2 self-start"
                  style={{
                    fontSize: 11,
                    letterSpacing: ".22em",
                    color: "var(--silk-muted)",
                    textDecoration: "none",
                  }}
                >
                  {p.secondaryLabel} <span style={{ color: "var(--accent)" }}>→</span>
                </Link>
              ))}
          </div>
        </div>

        <div className="col-span-12 md:col-span-8">
          <div
            className="te-mono uppercase mb-4"
            style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}
          >
            features
          </div>
          <ul className="flex flex-col">
            {p.features.map((f, i) => (
              <li
                key={i}
                className="grid grid-cols-12 gap-4 items-baseline py-4"
                style={{ borderTop: i === 0 ? "none" : "1px solid var(--rule)" }}
              >
                <span
                  className="col-span-1 te-mono"
                  style={{ fontSize: 11, color: "var(--silk-muted)", letterSpacing: ".15em" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="col-span-11 te-sans"
                  style={{ fontSize: 16, color: "var(--ink)", lineHeight: 1.55 }}
                >
                  {f}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* prev / next */}
      <section className="grid grid-cols-2 gap-6 py-10" style={{ borderTop: "1px solid var(--rule)" }}>
        <Link href={`/projects/${prev.id}`} className="text-left" style={{ textDecoration: "none" }}>
          <div
            className="te-mono uppercase"
            style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}
          >
            ← previous
          </div>
          <div
            className="te-sans font-medium mt-1"
            style={{ fontSize: 22, color: "var(--ink)", letterSpacing: "-.01em" }}
          >
            {prev.name}
          </div>
        </Link>
        <Link href={`/projects/${next.id}`} className="text-right" style={{ textDecoration: "none" }}>
          <div
            className="te-mono uppercase"
            style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}
          >
            next →
          </div>
          <div
            className="te-sans font-medium mt-1"
            style={{ fontSize: 22, color: "var(--ink)", letterSpacing: "-.01em" }}
          >
            {next.name}
          </div>
        </Link>
      </section>
    </div>
  );
}
