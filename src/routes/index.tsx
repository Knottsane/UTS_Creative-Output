import { Link, createFileRoute } from '@tanstack/react-router'
import {
  ArrowRight,
  CalendarClock,
  Cpu,
  ListTodo,
  NotebookPen,
  Radar,
  Terminal,
  Timer,
} from 'lucide-react'

import { Logo } from '@/components/studyflow/logo'
import { ProjectStatus } from '@/components/studyflow/project-status'
import { SignalChip, SignalTicker } from '@/components/studyflow/night-city'

export const Route = createFileRoute('/')({
  component: Home,
})

const modules = [
  {
    icon: ListTodo,
    code: 'MOD.01',
    title: 'Mission Control',
    body: 'Turn assignments, labs and exam prep into prioritized missions with deadlines, estimates and course tags.',
    color: '#B026FF',
    live: true,
  },
  {
    icon: Timer,
    code: 'MOD.02',
    title: 'Focus Core',
    body: 'A distraction-shielded focus timer with sprint, deep-work and overclock presets plus an interrupt log.',
    color: '#00F0FF',
    live: true,
  },
  {
    icon: CalendarClock,
    code: 'MOD.03',
    title: 'Timeline',
    body: 'Lectures, labs and deep-work blocks on one neon timeline, so every day has a battle plan.',
    color: '#FF2D75',
    live: false,
  },
  {
    icon: NotebookPen,
    code: 'MOD.04',
    title: 'Data Vault',
    body: 'Markdown notes and code snippets linked to courses and missions, searchable in milliseconds.',
    color: '#39FF88',
    live: false,
  },
  {
    icon: Radar,
    code: 'MOD.05',
    title: 'Telemetry',
    body: 'Focus hours, streaks and course progress visualized, so you see exactly where your time goes.',
    color: '#00F0FF',
    live: false,
  },
  {
    icon: Cpu,
    code: 'MOD.06',
    title: 'AI Co-Pilot',
    body: 'Break big projects into missions, generate study plans and quiz yourself from your own notes.',
    color: '#B026FF',
    live: false,
  },
]

const bootSteps = [
  { cmd: 'sync --courses', out: 'Load your classes and deadlines.' },
  { cmd: 'queue --missions', out: 'Break work into clear, ranked missions.' },
  { cmd: 'engage --focus', out: 'Lock onto one target and run the core.' },
  { cmd: 'analyze --telemetry', out: 'Review the data. Level up. Repeat.' },
]

function Home() {
  return (
    <div className="relative overflow-x-hidden">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border bg-void/75 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-content items-center gap-6 px-4 sm:px-6">
          <Link to="/" aria-label="StudyFlow home">
            <Logo />
          </Link>
          <nav className="ml-auto hidden items-center gap-6 font-ui text-sm font-semibold tracking-[0.2em] text-muted-foreground uppercase md:flex">
            <a href="#status" className="hover:text-neon-cyan">
              Status
            </a>
            <a href="#modules" className="hover:text-neon-cyan">
              Modules
            </a>
            <a href="#protocol" className="hover:text-neon-cyan">
              Protocol
            </a>
          </nav>
          <Link to="/app" className="sf-btn-ghost ml-auto h-9 px-4 md:ml-0">
            Launch <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <SignalTicker className="border-t border-b-0" />
      </header>

      {/* Hero */}
      <section className="relative">
        <div
          aria-hidden="true"
          className="sf-grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]"
        />
        <div className="relative mx-auto max-w-content px-4 pt-16 pb-20 sm:px-6 lg:pt-24">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 px-3 py-1 font-mono text-[11px] tracking-widest text-neon-cyan uppercase">
              <span className="sf-pulse size-1.5 rounded-full bg-neon-green shadow-[0_0_6px_#39FF88]" />
              <span
                className="nc-glitch"
                data-text="Night City // network connected"
              >
                Night City // network connected
              </span>
            </p>
            <h1 className="mt-6 font-display text-6xl leading-[0.95] font-bold tracking-[0.04em] sm:text-7xl lg:text-8xl">
              <span className="sf-glow-purple">STUDY</span>
              <span className="sf-gradient-text">FLOW</span>
            </h1>
            <p className="mt-6 font-mono text-sm tracking-[0.25em] text-foreground sm:text-base">
              PLAN SMARTER<span className="text-neon-purple">.</span> FOCUS
              BETTER<span className="text-neon-cyan">.</span> ACHIEVE MORE
              <span className="text-neon-pink">.</span>
            </p>
            <p className="mt-6 max-w-reading text-base text-muted-foreground sm:text-lg">
              A productivity operating system for students, developers and
              anyone who wants to run their day like a well-tuned machine.
              Missions, focus sessions and progress telemetry in one
              workstation.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/app" className="sf-btn-neon">
                <Terminal className="size-4" /> Boot the system
              </Link>
              <Link to="/app/focus" className="sf-btn-ghost">
                <Timer className="size-4" /> Start a focus block
              </Link>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-border pt-6">
              {[
                ['3', 'Focus presets'],
                ['∞', 'Missions'],
                ['0', 'Distractions'],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="sf-label">{l}</dt>
                  <dd className="mt-1 font-mono text-2xl font-bold text-neon-cyan sf-glow-cyan">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Project status: replaces the former dashboard preview */}
      <ProjectStatus />

      {/* Modules */}
      <section id="modules" className="border-t border-border bg-navy/40">
        <div className="mx-auto max-w-content px-4 py-20 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="sf-label">// System modules</p>
            <SignalChip index={2} />
          </div>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-wide sm:text-4xl">
            Everything a high-output student needs,{' '}
            <span className="sf-gradient-text">wired together.</span>
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((m) => (
              <article
                key={m.title}
                className="sf-panel sf-panel-hover group relative overflow-hidden p-6"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px opacity-70"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${m.color}, transparent)`,
                  }}
                />
                <div className="flex items-center justify-between">
                  <span
                    className="grid size-10 place-items-center rounded-md border"
                    style={{
                      color: m.color,
                      borderColor: `${m.color}55`,
                      background: `${m.color}12`,
                    }}
                  >
                    <m.icon className="size-5" />
                  </span>
                  <span
                    className="font-mono text-[10px] tracking-widest"
                    style={{ color: m.live ? '#39FF88' : '#9292A8' }}
                  >
                    {m.live ? '● LIVE' : '○ INSTALLING'}
                  </span>
                </div>
                <p className="mt-5 font-mono text-[10px] tracking-widest text-muted-foreground">
                  {m.code}
                </p>
                <h3 className="mt-1 font-ui text-2xl font-bold tracking-wide">
                  {m.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{m.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Protocol */}
      <section id="protocol" className="border-t border-border">
        <div className="mx-auto grid max-w-content gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
          <div>
            <p className="sf-label">// Boot protocol</p>
            <SignalChip index={1} className="mt-2" />
            <h2 className="mt-3 font-display text-3xl font-bold tracking-wide sm:text-4xl">
              Four commands from chaos to{' '}
              <span className="text-neon-cyan sf-glow-cyan">flow state</span>.
            </h2>
            <p className="mt-4 max-w-reading text-muted-foreground">
              StudyFlow follows a simple loop: plan your work, protect your
              attention, and learn from the data. No clutter, no endless
              settings. Just a system that keeps you moving.
            </p>
          </div>
          <div className="sf-panel sf-corners sf-scanlines overflow-hidden">
            <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
              <span className="size-2.5 rounded-full bg-neon-pink/80" />
              <span className="size-2.5 rounded-full bg-neon-purple/80" />
              <span className="size-2.5 rounded-full bg-neon-green/80" />
              <span className="ml-3 font-mono text-[11px] text-muted-foreground">
                edgerunner@afterlife:~/maine-crew
              </span>
            </div>
            <ol className="space-y-4 p-5 font-mono text-sm">
              {bootSteps.map((s, i) => (
                <li key={s.cmd}>
                  <p>
                    <span className="text-neon-green">$</span>{' '}
                    <span className="text-neon-cyan">studyflow</span> {s.cmd}
                  </p>
                  <p className="mt-1 pl-4 text-muted-foreground">
                    <span className="text-neon-purple">
                      [{String(i + 1).padStart(2, '0')}]
                    </span>{' '}
                    {s.out}
                  </p>
                </li>
              ))}
              <li className="text-neon-green">
                ✓ system ready<span className="sf-caret">_</span>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-content px-4 py-20 sm:px-6">
          <div className="sf-panel sf-corners sf-grid-bg relative overflow-hidden px-6 py-14 text-center sm:px-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[36rem] -translate-x-1/2 rounded-full bg-neon-purple/25 blur-3xl"
            />
            <h2 className="relative font-display text-3xl font-bold tracking-wide sm:text-5xl">
              Your workstation is{' '}
              <span className="sf-gradient-text">ready.</span>
            </h2>
            <p className="relative mx-auto mt-4 max-w-reading text-muted-foreground">
              Jack in, queue your first mission, and run a focus block in under
              a minute.
            </p>
            <Link to="/app" className="sf-btn-neon relative mt-8">
              Enter command deck <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-content flex-col flex-wrap items-center justify-between gap-x-8 gap-y-3 px-4 py-8 font-mono text-[11px] tracking-widest text-muted-foreground sm:px-6 lg:flex-row">
          <Logo className="scale-90" />
          <p>PLAN SMARTER · FOCUS BETTER · ACHIEVE MORE</p>
          <p className="text-neon-red/80">KERNEL // ARASAKA-GRADE ENCRYPTION</p>
          <SignalChip index={5} className="text-[11px]" />
          <p>© 2026 STUDYFLOW</p>
        </div>
      </footer>
    </div>
  )
}
