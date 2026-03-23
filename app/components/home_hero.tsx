import Link from "next/link";

export type HomeHeroLink = {
  href: string;
  label: string;
};

export type HomeHeroProps = {
  title: string;
  tag: string[];
  description: string;
  link: HomeHeroLink | HomeHeroLink[];
  islive: boolean;
  /** Tailwind classes for the hero background, e.g. `bg-zinc-900 dark:bg-black`. */
  bgClass?: string;
};

export function HomeHero({
  title,
  tag,
  description,
  link,
  islive,
  bgClass,
}: HomeHeroProps) {
  const links = Array.isArray(link) ? link : [link];
  const primary = links[0];
  const secondary = links[1];
  const bg = bgClass ?? "bg-white dark:bg-zinc-950";

  return (
    <section className={`relative overflow-hidden rounded-3xl border border-zinc-200 px-5 py-8 shadow-sm dark:border-zinc-800 ${bg} sm:px-8 sm:py-12`}>
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        aria-hidden
      >
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-sky-400/15 blur-3xl dark:bg-sky-500/10" />
        <div className="absolute -bottom-28 -right-24 h-96 w-96 rounded-full bg-indigo-500/15 blur-3xl dark:bg-indigo-500/10" />
      </div>

      <div className="relative flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-3 rounded-full border border-zinc-200 bg-zinc-50 pl-1 pr-2 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
            {islive ? (
              <span className="inline-flex items-center justify-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-500/20 dark:text-emerald-200">
                <span className="mr-1 inline-block h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_2px_rgba(16,185,129,0.6)] dark:bg-emerald-300 dark:shadow-[0_0_6px_2px_rgba(110,231,183,0.7)]" />
                LIVE
              </span>
            ) : (
              <span className="inline-flex items-center justify-center rounded-full bg-yellow-400/10 px-2 py-0.5 text-[11px] font-semibold text-yellow-700 ring-1 ring-yellow-400/20 dark:text-yellow-200">
                <span className="mr-1 inline-block h-2 w-2 rounded-full bg-zinc-400 shadow-[0_0_6px_2px_rgba(161,161,170,0.7)] dark:bg-zinc-500 dark:shadow-[0_0_6px_2px_rgba(113,113,122,0.7)]" />
                IN&nbsp;PROGRESS
              </span>
            )}
            <span>
              {tag.map((t, idx) => (
                <span key={t + idx}>
                  {idx > 0 ? (
                    <span className="font-extrabold text-zinc-400 dark:text-zinc-500 mx-1">
                      ·
                    </span>
                  ) : null}
                  <span>{t}</span>
                </span>
              ))}
            </span>
          </div>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>

          <p className="max-w-xl text-sm text-zinc-600 dark:text-zinc-400 sm:text-base">
            {description}
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:min-w-[18rem]">
          {primary ? (
            <Link
              href={primary.href}
              className="inline-flex w-full justify-center rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              {primary.label}
            </Link>
          ) : null}

          {secondary ? (
            <Link
              href={secondary.href}
              className="inline-flex w-full justify-center rounded-2xl border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-800 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900"
            >
              {secondary.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}

