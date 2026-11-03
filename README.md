# StudyFlow

**Plan smarter. Focus better. Achieve more.**

StudyFlow is a student productivity web app with a cyberpunk, futuristic-workstation look. Students and developers use it to plan missions (tasks), run distraction-shielded focus sessions, and track their progress.

## What's live
- **Landing page** (`/`): product overview and module showcase.
- **Command Deck** (`/app`): dashboard with focus stats, the mission queue, today's timeline, a weekly focus chart, course progress and a system log.
- **Missions** (`/app/missions`): filter, create, complete, target and delete missions.
- **Focus Core** (`/app/focus`): focus/rest timer with Sprint (25/5), Deep Work (50/10) and Overclock (90/20) presets, a target mission, an interrupt counter and a session log.

Data is currently stubbed in `src/lib/fixtures.ts`. Changes made in the app last until the page is reloaded.

## Tech
TanStack Start (React 19, TanStack Router), Vite, Tailwind CSS 4, shadcn/ui (Radix), lucide-react and sonner. Deployed on Netlify.

## Run locally
```bash
pnpm install
pnpm dev            # http://localhost:3000
# or, with Netlify platform emulation:
netlify dev
```

## Roadmap
See [PLAN.md](PLAN.md). The next milestones cover persistence with Netlify Database, user accounts with Netlify Identity, the Timeline and Data Vault modules, real telemetry and progression, and an AI Co-Pilot.
