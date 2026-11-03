# StudyFlow Roadmap

StudyFlow is a cyberpunk-styled productivity operating system for students and developers. The roadmap ships in small, self-contained milestones. Each one leaves the product working.

## Milestone 1: Product surface ✅
- Cyberpunk design system: palette, Chakra Petch, Space Grotesk and JetBrains Mono typography, neon panels, HUD corners, grid and scanline textures.
- Landing page (`/`): hero, module overview, boot protocol, call to action.
- App shell (`/app/*`): sidebar, mobile drawer, live system clock.
- Command Deck (`/app`): stat tiles, mission queue, today's timeline, focus telemetry chart, course progress, system log.
- Missions (`/app/missions`): filter, create, complete, target and delete missions. The state lives on the client only.
- Focus Core (`/app/focus`): a working focus/rest timer with presets, a locked target mission, an interrupt counter and a session log.
- All data comes from `src/lib/fixtures.ts` and `src/lib/mission-store.tsx`.

## Milestone 2: Data model and persistence
- Netlify Database (Drizzle) tables: `courses`, `missions`, `focus_sessions`, `schedule_blocks`, `notes`.
- TanStack Start server functions for mission CRUD and session logging.
- Swap the fixtures and `MissionProvider` internals for loaders and server functions. Keep the UI unchanged.

## Milestone 3: Operator accounts
- Netlify Identity: sign up, log in and password recovery, styled as a "jack in" terminal.
- Scope every table by user. Protect the `/app` routes.
- Operator profile with handle, timezone, weekly focus goal and default preset.

## Milestone 4: Timeline (schedule)
- Day and week views of lectures, labs and focus blocks.
- Create and edit blocks. Drag a mission onto the timeline to schedule a focus block.
- Recurring class schedules.

## Milestone 5: Data Vault (notes)
- Markdown notes with code highlighting, linked to courses and missions.
- Full-text search and tags.

## Milestone 6: Telemetry and progression
- Real weekly and monthly focus analytics computed from `focus_sessions`.
- Streaks, XP and levels derived from completed missions and sessions.
- Course progress computed from cleared missions.

## Milestone 7: AI Co-Pilot
- Netlify AI Gateway: break a project into missions, generate a study plan before an exam, quiz yourself from your notes.

## Milestone 8: Polish
- Optional ambient soundscapes in Focus Core, browser notifications when a phase ends, keyboard shortcuts, and PWA install support.
