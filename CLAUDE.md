@AGENTS.md

---

# NopksForge — Project Context

## What this is
Personal portfolio + developer toolbox. Next.js 16 / React 19 / Tailwind v4 / TypeScript.
Deployed on Vercel. Owner: Noppasan Kerdsomjit (noppasan.ksj@gmail.com, Bangkok, GMT+7).

## Reference design
`tmp/` contains the HTML/JSX prototype (`NopksForge.html` + companion JSX files).
When reworking UI, treat those files as the source of truth for look, layout, and copy.
The aesthetic is **TE Edition** — Teenage Engineering-inspired, minimalist, type-driven.
Key primitives in `tmp/primitives.jsx`: Screw, Led, Knob, Fader, Pad, Screen, Panel.

## Design system (CSS custom properties)
All colour tokens live in `app/globals.css` under `:root` / `html[data-theme="light|dark"]`:

| var | role |
|-----|------|
| `--bg` | page background |
| `--surface` | raised panels, cards |
| `--ink` | primary text |
| `--silk` | secondary text |
| `--silk-muted` | tertiary / labels |
| `--rule` | borders / dividers |
| `--hover` | hover tint |
| `--accent` | #ff5b1f orange-red |
| `--led-green/amber/red` | status LEDs |

Fonts: IBM Plex Sans (`--sans`), IBM Plex Mono (`--mono`), IBM Plex Sans Condensed (`--display`).
CSS utility classes: `.te-mono`, `.te-sans`, `.te-led-blink`, `.te-cursor` (blinking cursor `::after`).

## Theme system — two mechanisms, both required
- **`data-theme` attribute** on `<html>` — drives CSS custom properties (TE components).
- **`.dark` class** on `<html>` — drives Tailwind `dark:` utilities (resume composer components).

Both are toggled together in `app/components/nevbar.tsx` (`applyTheme()`) and the inline
`pageInitScript` in `app/layout.tsx`. Never change one without the other.

## Boot sequence
`app/components/boot_sequence.tsx` — fires once per browser session (sessionStorage key `nf_booted`).
Flash-free approach:
1. `pageInitScript` (runs before first paint) adds `is-booting` to `<html>` if not yet booted.
2. CSS `html.is-booting body::before` (in globals.css) covers page with `var(--bg)` at z-index 199.
3. `BootWrapper` (client, `ssr: false`) dynamically loads `BootSequence`.
4. `BootSequence` reads `classList.contains("is-booting")` in `useState()` — no `useEffect` delay.
5. On completion: `classList.remove("is-booting")` + `setFading(true)` fire together so the
   React overlay fades while the page fades in from behind.

Timing config is at the top of `boot_sequence.tsx` (`CONFIG` object — adjust freely).

## Key files
| file | purpose |
|------|---------|
| `app/layout.tsx` | fonts, theme+boot inline script, global layout |
| `app/globals.css` | TE CSS vars, theme rules, utility classes |
| `app/components/nevbar.tsx` | TE-style header, theme + sfx toggles (Web Audio clicks) |
| `lib/sound.ts` | `playClick` presets + `nf_sfx` localStorage; `window.playClick` / `__nf_sound` bridge |
| `app/components/footer.tsx` | shared TE footer |
| `app/components/boot_sequence.tsx` | boot animation + config |
| `app/components/boot_wrapper.tsx` | thin "use client" shell for ssr:false dynamic import |
| `app/components/project_list.tsx` | client component — interactive project rows |
| `lib/projects.ts` | PROJECTS data array (server-safe, no "use client") |
| `app/page.tsx` | home — hero + `<ProjectList />` |
| `app/projects/[id]/page.tsx` | static project detail page — hero, ScreenshotMock or ImageLightbox preview, features list, prev/next nav; uses `generateStaticParams` over `PROJECTS` |
| `app/tools/page.tsx` | dev tools page — TE section headers + existing tool components |
| `app/about/page.tsx` | TE hero/stats + resume composer drop-in |
| `app/components/composer/` | resume machine sub-components (hardware-inspired, keep as-is) |
| `app/components/Tools/` | emoji / uuid / json tool components (dark: classes, keep logic) |

## Resume composer (about page)
The `AboutPage` in `app/about/page.tsx` is a large "use client" component containing all state
for the TE-KO-II-inspired resume machine. Sub-components live in `app/components/composer/`.
The machine uses hardcoded zinc Tailwind classes (it's meant to look like physical hardware).
Do not change the machine's internal styling — only the outer page wrapper around it.
Interaction sounds use `playClick` from `lib/sound.ts` in page handlers; `display_screen.tsx` plays on external link clicks.

## Project data
Edit `lib/projects.ts` to add/remove projects. The `PROJECTS` array is imported by both the
server component (`app/page.tsx`, for the module count) and the client component (`project_list.tsx`).
Do NOT move project data back into `project_list.tsx` — that breaks server-side rendering of the count.

## Tools components
`app/components/Tools/emoji.tsx`, `uuid_gen.tsx`, `json_formatter.tsx` — internal h2 headers were
removed so the page-level TE `ToolSection` headers handle titles. Do not re-add h2 headers inside them.

# Should always update this file after make anychange