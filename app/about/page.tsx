import Image from "next/image";
import Link from "next/link";
import { CopyCommandPill } from "@/app/components/copy_command_pill";

type Experience = {
  role: string;
  company: string;
  tag: string[];
  /** ISO date string (YYYY-MM) */
  from: string;
  /** ISO date string or "present" */
  to: string;
  description: string;
  highlights: string[];
  bgClass: string;
};

const EXPERIENCES: Experience[] = [
  {
    role: "Full Stack Engineer",
    company: "Arise by INFINITAS",
    tag: ["Fintech", "Go", "Microservices", "K8s"],
    from: "2023-11",
    to: "present",
    description:
      "Mission-critical backend services for Thailand's premier financial apps — Paotang, Krungthai NEXT, and Clicx Bank.",
    highlights: [
      "OIDC auth microservices for Paotang — improved login reliability.",
      "High-availability loan processing for Clicx Bank and Krungthai NEXT.",
      "Go + Redis + PostgreSQL services following Clean Architecture.",
      "Production observability via Grafana; CI/CD with Docker, K8s, Helm.",
      "Built an internal Discord bot for test triggers and service status.",
    ],
    bgClass:
      "bg-gradient-to-br from-white via-emerald-50 to-teal-100/80 dark:from-zinc-950 dark:via-emerald-950/25 dark:to-teal-950/20",
  },
  {
    role: "Software Engineer",
    company: "Toyota Tsusho DENSO Electronics",
    tag: ["Automotive", "Embedded", "MATLAB", "C"],
    from: "2022-07",
    to: "2023-10",
    description:
      "Automotive ECU embedded software and internal tooling to boost engineering efficiency.",
    highlights: [
      "Automated MATLAB tooling that cut data-extraction man-hours by 60%.",
      "Model-based automotive software with Japanese engineering teams.",
      'Won "Best Developer" in the company kaizen awards.',
    ],
    bgClass:
      "bg-gradient-to-br from-white via-amber-50 to-orange-100/80 dark:from-zinc-950 dark:via-amber-950/20 dark:to-orange-950/20",
  },
];

function totalExperienceLabel(experiences: Experience[]): string {
  let months = 0;
  for (const exp of experiences) {
    const [fy, fm] = exp.from.split("-").map(Number);
    const to =
      exp.to === "present"
        ? new Date()
        : new Date(Number(exp.to.split("-")[0]), Number(exp.to.split("-")[1]) - 1);
    const fromDate = new Date(fy, fm - 1);
    months += Math.max(
      0,
      (to.getFullYear() - fromDate.getFullYear()) * 12 +
        (to.getMonth() - fromDate.getMonth()),
    );
  }
  const years = Math.round(months / 12);
  return years < 1 ? `${months} mo` : `~${years} yrs`;
}

function formatRange(from: string, to: string): string {
  const fmt = (d: string) => {
    const [y, m] = d.split("-");
    const names = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return `${names[Number(m) - 1]} ${y}`;
  };
  return `${fmt(from)} — ${to === "present" ? "Present" : fmt(to)}`;
}

export default function AboutPage() {
  return (
    <div className="flex min-h-[calc(100vh-0px)] flex-col bg-zinc-50 font-sans text-zinc-900 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14">
        {/* ── Hero ── */}
        <section className="rounded-3xl border border-zinc-200 bg-white px-6 py-10 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:px-10 sm:py-14">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            / about
          </p>

          <div className="mt-3 flex items-center gap-8">
            <div
              className="shrink-0 rounded-full p-4 shadow-lg"
              style={{
                background: "linear-gradient(135deg, #ef4444bb 0%, #eab308bb 33%, #22d3eabb 66%, #6366f1bb 100%)",
                backgroundSize: "300% 300%",
                animation: "colorLoop 6s linear infinite"
              }}
            >
            <style>
              {`
                @keyframes colorLoop {
                  0% { background-position: 0% 50%; }
                  50% { background-position: 100% 50%; }
                  100% { background-position: 0% 50%; }
                }
              `}
            </style>
              <Image
                src="/arm_icon.webp"
                alt="Noppasan Kerdsomjit avatar picture"
                width={96}
                height={96}
                className="h-20 w-20 object-cover sm:h-24 sm:w-24"
              />
            </div>
            <h1 className="font-semibold tracking-tight text-4xl sm:text-6xl">
              Noppasan
              <br />
              <span className="text-zinc-400 dark:text-zinc-500">
                Kerdsomjit
              </span>
            </h1>
          </div>

          <p className="mt-6 mx-3 text-base text-zinc-600 dark:text-zinc-400 sm:text-lg">
            Full-stack engineer who ships mission-critical financial services by
            day and builds absurd side projects by night. Clean architecture
            enthusiast, observability nerd, and the guy who built a Discord bot
            so his team could stop context-switching.
          </p>

          {/* ── Contact bar ── */}
          <div className="mt-8 flex flex-wrap gap-2">
            <CopyCommandPill
              display="$ echo noppasan.ksj@gmail.com"
              valueToCopy="noppasan.ksj@gmail.com"
              toastMessage="Email copied"
            />
            <CopyCommandPill
              display="$ call +66-65-374-4234"
              valueToCopy="+66653744234"
              toastMessage="Phone copied"
            />
            <Link
              href="https://github.com/NopksForge"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl border border-zinc-200 bg-white px-4 py-2 font-mono text-xs text-zinc-800 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900"
            >
              $ open github.com/NopksForge
            </Link>
            <Link
              href="https://www.linkedin.com/in/noppasan-kerdsomjit-b55297206/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl border border-zinc-200 bg-white px-4 py-2 font-mono text-xs text-zinc-800 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900"
            >
              $ open linkedin/noppasan
            </Link>
          </div>
        </section>

        {/* ── Quick stats row ── */}
        <section className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {[
            { value: totalExperienceLabel(EXPERIENCES), label: "shipping code" },
            { value: "BKK, Thailand", label: "location" },
            { value: "∞", label: "Cups of coffee"},
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-zinc-200 bg-white p-4 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
            >
              <p className="text-2xl font-semibold tracking-tight">
                {s.value}
              </p>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                {s.label}
              </p>
            </div>
          ))}
        </section>

        {/* ── Skill cloud ── */}
        <section className="mt-6 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-6">
          <h2 className="text-base font-semibold">
            Tech I Actually Use
          </h2>

          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "Golang",
              "TypeScript",
              "SQL",
              "Next.js",
              "Redis",
              "PostgreSQL",
              "Docker",
              "Kubernetes",
              "Helm",
              "Kafka",
              "Grafana",
              "K6",
              "GCP",
              "AWS",
              "Git",
              "Agile / Scrum",
            ].map((t) => (
              <span
                key={t}
                className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* ── Experience ── */}
        <section className="mt-6 space-y-4">
          <div className="flex items-end justify-between gap-3">
            <h2 className="text-lg font-semibold tracking-tight">Experience</h2>
          </div>

          {EXPERIENCES.map((exp) => (
            <article
              key={exp.from}
              className={`relative overflow-hidden rounded-3xl border border-zinc-200 px-5 py-8 shadow-sm dark:border-zinc-800 sm:px-8 sm:py-10 ${exp.bgClass}`}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-60"
                aria-hidden
              >
                <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-sky-400/15 blur-3xl dark:bg-sky-500/10" />
                <div className="absolute -bottom-28 -right-24 h-96 w-96 rounded-full bg-indigo-500/15 blur-3xl dark:bg-indigo-500/10" />
              </div>

              <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-2xl space-y-3">
                  <div className="inline-flex items-center gap-3 rounded-full border border-zinc-200 bg-zinc-50/80 py-1 pl-1 pr-2 text-xs font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-200">
                    {exp.to === "present" ? (
                      <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-500/20 dark:text-emerald-200">
                        <span className="mr-1 inline-block h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_2px_rgba(16,185,129,0.6)] dark:bg-emerald-300 dark:shadow-[0_0_6px_2px_rgba(110,231,183,0.7)]" />
                        NOW
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-zinc-200/60 px-2 py-0.5 text-[11px] font-semibold text-zinc-600 ring-1 ring-zinc-300/40 dark:bg-zinc-800/60 dark:text-zinc-300 dark:ring-zinc-700/40">
                        PAST
                      </span>
                    )}
                    <span>
                      {exp.tag.map((t, idx) => (
                        <span key={t}>
                          {idx > 0 ? (
                            <span className="mx-1 font-extrabold text-zinc-400 dark:text-zinc-500">
                              ·
                            </span>
                          ) : null}
                          <span>{t}</span>
                        </span>
                      ))}
                    </span>
                  </div>

                  <h3 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                    {exp.role}
                  </h3>

                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {exp.company} · {formatRange(exp.from, exp.to)}
                  </p>

                  <p className="max-w-xl text-sm text-zinc-600 dark:text-zinc-400 sm:text-base">
                    {exp.description}
                  </p>

                  <ul className="space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {exp.highlights.map((h) => (
                      <li key={h}>→ {h}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* ── Education ── */}
        <section className="mt-6 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-6">
          <h2 className="text-base font-semibold">Education</h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
              King Mongkut&apos;s University of Technology Thonburi
            </span>
            <br />
            B.Eng. Control System & Instrumentation — GPA 3.53 / 4.00 (second
            class honors) · June 2022
          </p>
        </section>

        {/* ── Thoughts on AI ── */}
        <section className="mt-6 rounded-3xl border border-dashed border-zinc-300 bg-white px-6 py-8 dark:border-zinc-700 dark:bg-zinc-950 sm:px-8 sm:py-10">
          <p className="text-xs font-medium tracking-widest text-zinc-400 uppercase dark:text-zinc-500">
            Hot take
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            On AI & Building Things
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
            Innovation can&apos;t be un-invented. The world changes every single
            day and it&apos;s impossible to chase all of it — but I try my best.
            AI lets me ship ideas at a speed I never had before. I think fast,
            break things along the way, and fix them just as fast. But none of
            that works without solid fundamentals — knowing why the code works
            matters more than getting it to compile.
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
            My take: treat AI as a multiplier, not a replacement. The engineer
            who understands the system will always outpace the one who only
            copies the output.
          </p>
        </section>
      </main>
    </div>
  );
}
