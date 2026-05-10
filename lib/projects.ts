export type Project = {
  id: string;
  code: string;
  name: string;
  status: "live" | "wip";
  desc: string;
  tags: string[];
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "workbench",
    code: "01",
    name: "Workbench",
    status: "live",
    desc: "The site you're looking at right now. A collection of quick developer utilities. Also doubles as my personal space — head to /about for an interactive resume machine.",
    tags: ["next.js", "typescript", "dev tools"],
    primaryLabel: "open tools",
    primaryHref: "/tools",
    secondaryLabel: "about me",
    secondaryHref: "/about",
  },
  {
    id: "dbabuser",
    code: "02",
    name: "The dB Abuser",
    status: "live",
    desc: "Why use a normal volume slider when you can play Snake to adjust it? Absurd mini-games for the one task of changing your volume.",
    tags: ["next.js", "meme", "game"],
    primaryLabel: "open meme",
    primaryHref: "https://meme-the-db-abuser.vercel.app/",
    secondaryLabel: "browse repo",
    secondaryHref: "https://github.com/NopksForge/meme-the-db-abuser",
  },
  {
    id: "infinite",
    code: "03",
    name: "Infinite Onslaught",
    status: "wip",
    desc: "Browser-based roguelite combining infinite crafting discovery with real-time tower defense survival. AI-powered crafting table to discover new items.",
    tags: ["go", "next.js", "ai", "game"],
    primaryLabel: "browse repo",
    primaryHref: "https://github.com/NopksForge/infinite-onslaught",
  },
  {
    id: "debugdragon",
    code: "04",
    name: "Debug & Dragon",
    status: "wip",
    desc: "Browser RPG with live maps, chat and turn-based combat. Next.js frontend, Go backend, your local AI as dungeon master.",
    tags: ["go", "next.js", "ai", "game"],
    primaryLabel: "browse repo",
    primaryHref: "https://github.com/NopksForge/debug-and-dragon",
  },
];
