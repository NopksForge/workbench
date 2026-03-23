import { HomeHero } from "./components/home_hero";

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-0px)] flex-col bg-zinc-50 font-sans text-zinc-900 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14">
        <section className=" px-6 py-10  sm:px-10 sm:py-14">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            NopksForge · Project Collection
          </p>

          <h1 className="mt-3 text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            Experiments in Code
          </h1>

          <p className="mt-6 max-w-3xl text-base text-zinc-600 dark:text-zinc-400 sm:text-lg">
            Forging random ideas into functional products. This is where I
            ship tools, games, and weekend coding experiments.
          </p>
        </section>

        <section className="mt-8">
          <div className="mb-4 flex items-end justify-between gap-3">
            <h2 className="text-lg font-semibold tracking-tight">Featured Projects</h2>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Live and in-progress builds
            </span>
          </div>

          <div className="flex flex-col gap-y-5">
          <HomeHero
            title="Workbench"
            tag={["NextJS", "Developer Utilities"]}
            description="My collection space for quick developer utilities. Copy, format, and generate values in seconds."
            link={[
              {
                href: "/tools",
                label: "Open Tools",
              },
              {
                href: "https://github.com/NopksForge/workbench",
                label: "Browse Repo",
              },
            ]}
            islive={true}
            bgClass="bg-gradient-to-br from-white via-cyan-50 to-sky-100/80 dark:from-zinc-950 dark:via-sky-950/30 dark:to-cyan-950/20"
          />
          <HomeHero
            title="The dB Abuser"
            tag={["NextJS", "Meme"]}
            description="Why use a normal volume slider when you can play Snake to adjust it? absurd mini-games for the one task of changing your volume."
            link={[
              {
                href: "https://meme-the-db-abuser.vercel.app/",
                label: "Open Meme",
              },
              {
                href: "https://github.com/NopksForge/meme-the-db-abuser",
                label: "Browse Repo",
              },
            ]}
            islive={true}
            bgClass="bg-gradient-to-br from-white via-fuchsia-50 to-rose-100/80 dark:from-zinc-950 dark:via-fuchsia-950/25 dark:to-rose-950/20"
          />
          <HomeHero
            title="Debug and Dragon"
            tag={["Golang", "NextJS", "Game", "AI", "Local"]}
            description="A browser RPG with live maps, chat, and turn-based combat. NextJS frontend, Go backend, your local AI as dungeon master"
            link={[
              {
                href: "https://github.com/NopksForge/debug-and-dragon",
                label: "Browse Repo",
              },
            ]}
            islive={false}
            bgClass="bg-gradient-to-br from-white via-amber-50 to-orange-100/80 dark:from-zinc-950 dark:via-amber-950/20 dark:to-orange-950/20"
          />
          </div>
        </section>
      </main>
    </div>
  );
}
