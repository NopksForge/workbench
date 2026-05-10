export type ProjectMetric = { k: string; v: string };

export type Project = {
  id: string;
  code: string;
  name: string;
  status: "live" | "wip";
  tagline: string;
  desc: string;
  role: string;
  period: string;
  stack: string[];
  tags: string[];
  features: string[];
  metrics: ProjectMetric[];
  isMock: boolean;
  previewImages?: string[];
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
    tagline: "Quick developer utilities — emoji commits, UUIDs, JSON.",
    desc: "The site you're looking at right now. A growing collection of small developer utilities I reach for daily, plus my personal space and an interactive resume.",
    role: "designer · developer · maintainer",
    period: "2025 — present",
    stack: ["Next.js 16", "TypeScript", "Tailwind v4", "React 19"],
    tags: ["next.js", "typescript", "dev tools"],
    features: [
      "Emoji-prefixed git commit copier with search",
      "v4 UUID generator with Bruno / Postman snippets",
      "JSON parser, beautifier and minifier with indent control",
      "Sections expandable as more utilities ship",
    ],
    metrics: [
      { k: "modules", v: "3" },
      { k: "version", v: "0.4.2" },
      { k: "uptime",  v: "100%" },
    ],
    isMock: false,
    previewImages: ["/dev-tool-01.png", "/dev-tool-02.png"],
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
    tagline: "Volume slider, but it's Snake.",
    desc: "Why use a normal volume slider when you can play Snake to adjust it? Absurd mini-games for the one task of changing your audio volume — born from a 4am thought.",
    role: "designer · developer",
    period: "2025",
    stack: ["Next.js", "Web Audio API", "Canvas", "TypeScript"],
    tags: ["next.js", "meme", "game"],
    features: [
      "Snake — eat pellets, your volume creeps up or down",
      "Whack-a-mole alternative input mode",
      "Persistent high-score per game across reloads",
      "Real audio output via Web Audio gain node",
    ],
    metrics: [
      { k: "games", v: "2" },
      { k: "stars", v: "127" },
      { k: "lines", v: "~800" },
    ],
    isMock: false,
    previewImages: ["/db-abuse-01.png", "/db-abuse-02.png"],
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
    tagline: "Browser roguelite — infinite crafting + tower defense.",
    desc: "Browser-based roguelite combining infinite crafting discovery with real-time tower defense survival. Local AI proposes new recipes from element pairs you've already discovered.",
    role: "designer · gameplay engineer · backend",
    period: "2026",
    stack: ["Go", "Next.js", "WebSockets", "Local LLM (Ollama)", "Canvas"],
    tags: ["go", "next.js", "ai", "game"],
    features: [
      "Element-pair crafting — every new combination ships to a shared lexicon",
      "Real-time tower defense with crafted items as towers",
      "Local AI suggests plausible new recipes when you're stuck",
      "Endless waves with permadeath, runs ~15 min",
    ],
    metrics: [
      { k: "elements", v: "240+" },
      { k: "waves",    v: "∞" },
      { k: "build",    v: "0.2.0" },
    ],
    isMock: false,
    previewImages: ["/infi-craft-01.png"],
    primaryLabel: "browse repo",
    primaryHref: "https://github.com/NopksForge/infinite-onslaught",
  },
  {
    id: "debugdragon",
    code: "04",
    name: "Debug & Dragon",
    status: "wip",
    tagline: "Browser RPG with live maps, chat, turn-based combat.",
    desc: "A browser RPG with live maps, chat and turn-based combat. Next.js frontend, Go backend, your own local AI plays dungeon master — narration, encounters, loot.",
    role: "designer · full-stack · DM tooling",
    period: "2026",
    stack: ["Go", "gRPC", "Next.js", "Local LLM", "Postgres"],
    tags: ["go", "next.js", "ai", "game"],
    features: [
      "Persistent grid-based world rendered in real time",
      "Local-LLM dungeon master with party-state context",
      "Turn-based combat with attack / defend / cast / run",
      "Multiplayer chat & shared inventory via gRPC streaming",
    ],
    metrics: [
      { k: "tiles",   v: "1024" },
      { k: "classes", v: "6" },
      { k: "build",   v: "0.1.0" },
    ],
    isMock: true,
    primaryLabel: "browse repo",
    primaryHref: "https://github.com/NopksForge/debug-and-dragon",
  },
];
