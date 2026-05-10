export type ProjectMetric = { k: string; v: string };

export type Project = {
  id: string;
  code: string;
  name: string;
  status: "live" | "wip";
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
    desc: "It's the site you're looking at right now. A growing collection of small developer utilities I reach for daily, plus my personal space and an interactive resume.",
    role: "designer · developer · maintainer",
    period: "2025 — present",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    tags: ["next.js", "typescript", "dev-tools", "resume"],
    features: [
      "Interactive resume machine",
      "Emoji-prefixed git commit copier with search",
      "v4 UUID generator with Bruno / Postman snippets",
      "JSON parser, beautifier and minifier with indent control",
      "Sections expandable as more utilities ship",
    ],
    metrics: [
      { k: "modules", v: "4" },
      { k: "version", v: "1.1.0" },
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
    desc: "Why use a normal volume slider when you can play Snake to adjust it? Absurd mini-games for the one task of changing your audio volume — born from a 4am thought.",
    role: "designer · developer",
    period: "2025",
    stack: ["Next.js", "TypeScript"],
    tags: ["next.js", "meme", "game"],
    features: [
      "Normal — plain 0–100% slider, no gimmicks",
      "Alphabet Order — slider steps through spoken numbers sorted A–Z, not numeric order",
      "Random — one tap rolls a new volume from 0–100%",
      "Request Form — bureaucratic form + consents; submit sets volume from the form slider",
      "XO Game — tic-tac-toe vs a random bot; win +1%, lose −2%, draw −1%",
      "DnD Dice Roll — d20 vs enemy STR; beat them for +1–5% volume, lose for a bigger cut",
      "Horse Race — pick a horse, bet 0–50%; finish place scales how much volume you gain or lose",
      "Tinder — swipe volume cards; a random “match” adopts that card’s volume",
      "Plinko — drop chips; landing slot adds or subtracts a few percent (up to ±5%)",
      "Snake — eat +/− pellets to nudge volume; walls, bombs, or self-hit can end in mute or game over",
      "Pair — memory match; paired number becomes your volume (0–100%)",
      "Car — charge and release; where the car stops sets volume, overshoot the track hits mute",
      "Audition — rhythm-game arrows + space in the green zone; timing and accuracy move volume in 1% steps",
      "Farm — idle-ish crops and coins; buy or sell volume tiers, promos tweak shop prices",
      "Fishing — cast distance affects rarity; reel mini-game sets volume in a tier band (or it escapes)",
    ],
    metrics: [
      { k: "options", v: "15" },
      { k: "laughs", v: "14+" },
      { k: "hot head", v: "~3" },
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
    desc: "Webview roguelite combining infinite crafting discovery with real-time tower defense survival. Local AI proposes new recipes from element pairs you've already discovered.",
    role: "designer · gameplay engineer · developer",
    period: "2026",
    stack: ["Go", "Next.js", "WebSockets", "Local LLM (Ollama)", "SQLite", "Wails"],
    tags: ["go", "next.js", "ai", "game", "roguelite"],
    features: [
      "Element-pair crafting",
      "Local AI for every crafting result",
      "Real-time tower defense with crafted items as towers",
      "Endless waves with permadeath, runs ~15 min",
    ],
    metrics: [
      { k: "elements", v: "∞" },
      { k: "waves",    v: "∞" },
      { k: "build",    v: "0.1.0" },
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
    desc: "A browser RPG with live maps, chat and turn-based combat. Next.js frontend, Go backend, your own local AI plays dungeon master — narration, encounters, loot.",
    role: "designer · full-stack · DM tooling",
    period: "2026",
    stack: ["Go", "gRPC", "Next.js", "Local LLM", "Postgres"],
    tags: ["go", "next.js", "ai", "game", "rpg"],
    features: [
      "Persistent grid-based world rendered in real time",
      "Local-LLM dungeon master with party-state context",
      "Turn-based combat with attack / defend / cast / run",
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
