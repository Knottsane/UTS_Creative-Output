import {
  Activity,
  BadgeCheck,
  CalendarDays,
  Check,
  CircleCheck,
  Gauge,
  Laptop,
  Layers,
  ListChecks,
  NotebookTabs,
  ShieldCheck,
  Smartphone,
  Users,
} from 'lucide-react'

import { Meter } from '@/components/studyflow/panel'
import { SignalChip } from '@/components/studyflow/night-city'

const GREEN = '#39FF88'
const CYAN = '#00F0FF'
const PURPLE = '#B026FF'
const PINK = '#FF2D75'

const project = {
  name: 'Improve Time Management & Personal Productivity Guide',
  owner: 'Rob Stephen Q. Lim',
  section: 'S1101',
  period: 'October 9–29, 2026',
}

const phases = [
  {
    code: 'PHASE 01',
    title: 'Assess Current Habits & Define SMART Target',
    dates: 'October 9–11, 2026',
    color: PURPLE,
    tasks: [
      'Identified current time-management habits.',
      'Established a SMART productivity target.',
      'Tracked daily activities for three days.',
      'Identified distractions and time-wasting habits.',
      'Identified necessary resources and tools.',
    ],
  },
  {
    code: 'PHASE 02',
    title: 'Create a Weekly Plan & Pilot Structure',
    dates: 'October 12–13, 2026',
    color: CYAN,
    tasks: [
      'Developed a realistic weekly schedule.',
      'Established daily goals and study blocks.',
      'Created resource backup protocols.',
      'Prioritized tasks using a daily to-do list.',
      'Organized academic deadlines.',
    ],
  },
  {
    code: 'PHASE 03',
    title: 'Execute and Monitor',
    dates: 'October 14–23, 2026',
    color: PINK,
    tasks: [
      'Followed the established weekly schedule.',
      'Executed planned study sessions.',
      'Recorded productivity observations.',
      'Applied strategies to minimize distractions.',
      'Used device focus modes during study sessions.',
      'Reviewed completed tasks and updated tracking records.',
    ],
  },
  {
    code: 'PHASE 04',
    title: 'Evaluate and Refine',
    dates: 'October 24–29, 2026',
    color: GREEN,
    tasks: [
      'Evaluated the productivity system.',
      'Developed the productivity guide and tracking tools.',
      'Incorporated peer review feedback.',
      'Refined the schedule for better feasibility.',
      'Finalized creative output materials.',
      'Checked backup storage and project files.',
    ],
  },
]

const stats = [
  { label: 'Total project phases', value: '04', icon: Layers, color: PURPLE },
  { label: 'Completed phases', value: '04', icon: CircleCheck, color: GREEN },
  { label: 'Pending phases', value: '00', icon: Activity, color: PINK },
  { label: 'Total project tasks', value: '13', icon: ListChecks, color: CYAN },
  { label: 'Completed tasks', value: '13', icon: BadgeCheck, color: GREEN },
  { label: 'Overall completion', value: '100%', icon: Gauge, color: CYAN },
]

const resources = [
  { name: 'Laptop / Computer', type: 'Hardware', icon: Laptop, color: CYAN },
  { name: 'Smartphone', type: 'Hardware', icon: Smartphone, color: PURPLE },
  {
    name: 'Google Calendar',
    type: 'Scheduling',
    icon: CalendarDays,
    color: PINK,
  },
  { name: 'Notion', type: 'Workspace', icon: NotebookTabs, color: CYAN },
  {
    name: 'Productivity tracking tools',
    type: 'Telemetry',
    icon: Activity,
    color: GREEN,
  },
  {
    name: 'Peer and mentor feedback',
    type: 'Review',
    icon: Users,
    color: PURPLE,
  },
]

function CompletedBadge({ size = 'sm' }: { size?: 'sm' | 'lg' }) {
  return (
    <span
      className={
        size === 'lg'
          ? 'inline-flex items-center gap-2 rounded-md border border-neon-green/60 bg-neon-green/10 px-4 py-2 font-mono text-sm font-bold tracking-[0.2em] text-neon-green shadow-[0_0_18px_rgba(57,255,136,0.25)]'
          : 'inline-flex items-center gap-1.5 rounded border border-neon-green/50 bg-neon-green/10 px-2 py-0.5 font-mono text-[10px] font-semibold tracking-widest text-neon-green'
      }
    >
      <Check
        className={size === 'lg' ? 'size-4' : 'size-3'}
        aria-hidden="true"
      />
      COMPLETED
    </span>
  )
}

function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-xs tracking-widest text-neon-purple">
        {index}
      </span>
      <h3 className="font-display text-xl font-semibold tracking-[0.12em] uppercase sm:text-2xl">
        {title}
      </h3>
      <span aria-hidden="true" className="h-px flex-1 bg-border" />
    </div>
  )
}

export function ProjectStatus() {
  return (
    <section
      id="status"
      aria-labelledby="project-status-heading"
      className="border-t border-border"
    >
      <div className="nc-section mx-auto max-w-content space-y-16 px-4 py-20 sm:px-6">
        {/* Heading */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="sf-label">// Terminal assessment</p>
            <SignalChip index={4} className="mt-2" />
            <h2
              id="project-status-heading"
              className="mt-3 font-display text-4xl font-bold tracking-[0.06em] sm:text-5xl"
            >
              PROJECT <span className="sf-gradient-text">STATUS</span>
            </h2>
            <p className="mt-3 font-mono text-xs tracking-[0.25em] text-neon-cyan sm:text-sm">
              TERMINAL ASSESSMENT // PROJECT COMPLETION OVERVIEW
            </p>
          </div>
          <CompletedBadge size="lg" />
        </header>

        {/* 1. Overview */}
        <div className="space-y-6">
          <SectionLabel index="01" title="Project Overview" />
          <div className="sf-panel sf-corners nc-bleed overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-3 font-mono text-[10px] tracking-widest text-muted-foreground">
              <span>COMPLETION_REPORT.SYS</span>
              <span className="inline-flex items-center gap-2 text-neon-green">
                <span className="size-1.5 rounded-full bg-neon-green shadow-[0_0_6px_#39FF88]" />
                VERIFIED
              </span>
            </div>
            <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[1.4fr_1fr]">
              <div className="space-y-6">
                <div>
                  <p className="sf-label">Project</p>
                  <p className="mt-2 font-display text-2xl font-bold tracking-wide uppercase sm:text-3xl">
                    Time Management &amp;{' '}
                    <span className="text-neon-cyan sf-glow-cyan">
                      Personal Productivity
                    </span>
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {project.name}
                  </p>
                </div>
                <dl className="grid gap-4 border-t border-border pt-6 sm:grid-cols-3">
                  <div>
                    <dt className="sf-label">Project owner</dt>
                    <dd className="mt-1 font-mono text-sm">{project.owner}</dd>
                  </div>
                  <div>
                    <dt className="sf-label">Section</dt>
                    <dd className="mt-1 font-mono text-sm">
                      {project.section}
                    </dd>
                  </div>
                  <div>
                    <dt className="sf-label">Completion period</dt>
                    <dd className="mt-1 font-mono text-sm">{project.period}</dd>
                  </div>
                </dl>
              </div>

              <dl className="space-y-3 rounded-md border border-border bg-void/60 p-5 font-mono text-xs">
                {[
                  ['STATUS', 'ALL TASKS COMPLETED', 'text-neon-green'],
                  ['COMPLETION', '100%', 'text-neon-cyan'],
                  ['START DATE', 'OCTOBER 09, 2026', 'text-foreground'],
                  ['COMPLETION DATE', 'OCTOBER 29, 2026', 'text-foreground'],
                ].map(([k, v, cls]) => (
                  <div
                    key={k}
                    className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border/60 pb-3 last:border-0 last:pb-0"
                  >
                    <dt className="tracking-widest text-muted-foreground">
                      {k}
                    </dt>
                    <dd className={`font-semibold tracking-wider ${cls}`}>
                      {v}
                    </dd>
                  </div>
                ))}
                <div className="pt-2">
                  <Meter
                    value={100}
                    color={GREEN}
                    label="Overall project completion"
                  />
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* 2. Milestones */}
        <div className="space-y-6">
          <SectionLabel index="02" title="Project Milestones" />
          <ol className="relative space-y-6 border-l border-neon-green/30 pl-6 sm:pl-10">
            {phases.map((p) => (
              <li key={p.code} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute top-6 -left-[33px] grid size-5 place-items-center rounded-full border-2 bg-void sm:-left-[51px]"
                  style={{
                    borderColor: GREEN,
                    boxShadow: `0 0 10px ${GREEN}80`,
                  }}
                >
                  <Check className="size-3 text-neon-green" />
                </span>
                <article className="sf-panel sf-panel-hover relative overflow-hidden p-5 sm:p-6">
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-px"
                    style={{
                      background: `linear-gradient(90deg, ${p.color}, transparent)`,
                    }}
                  />
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p
                        className="font-mono text-xs tracking-widest"
                        style={{ color: p.color }}
                      >
                        {p.code} · {p.dates}
                      </p>
                      <h4 className="mt-1 font-ui text-xl font-bold tracking-wide uppercase sm:text-2xl">
                        {p.title}
                      </h4>
                    </div>
                    <CompletedBadge />
                  </div>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {p.tasks.map((t) => (
                      <li
                        key={t}
                        className="flex gap-2 text-sm text-muted-foreground"
                      >
                        <Check
                          className="mt-0.5 size-4 shrink-0 text-neon-green"
                          aria-hidden="true"
                        />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex items-center gap-3">
                    <Meter
                      value={100}
                      color={GREEN}
                      label={`${p.code} completion`}
                      className="flex-1"
                    />
                    <span className="font-mono text-[11px] text-neon-green">
                      100%
                    </span>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>

        {/* 3. Statistics */}
        <div className="space-y-6">
          <SectionLabel index="03" title="Completion Statistics" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="sf-panel relative overflow-hidden p-5"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${s.color}, transparent)`,
                  }}
                />
                <div className="flex items-center justify-between">
                  <p className="sf-label">{s.label}</p>
                  <s.icon
                    className="size-4"
                    style={{ color: s.color }}
                    aria-hidden="true"
                  />
                </div>
                <p
                  className="mt-3 font-mono text-4xl font-bold"
                  style={{
                    color: s.color,
                    textShadow: `0 0 14px ${s.color}66`,
                  }}
                >
                  {s.value}
                </p>
                <Meter
                  value={100}
                  color={s.color}
                  label={`${s.label}: 100% complete`}
                  className="mt-4"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 4. Resources */}
        <div className="space-y-6">
          <SectionLabel index="04" title="Project Resources" />
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((r) => (
              <li
                key={r.name}
                className="sf-panel sf-panel-hover flex items-center gap-4 p-4"
              >
                <span
                  className="grid size-10 shrink-0 place-items-center rounded-md border"
                  style={{
                    color: r.color,
                    borderColor: `${r.color}55`,
                    background: `${r.color}12`,
                  }}
                >
                  <r.icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-ui text-lg font-semibold tracking-wide">
                    {r.name}
                  </p>
                  <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                    {r.type}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* 5. Outcome */}
        <div className="space-y-6">
          <SectionLabel index="05" title="Project Outcome // Final Result" />
          <div className="sf-panel sf-scanlines overflow-hidden">
            <div className="flex items-center gap-2 border-b border-border px-5 py-2.5 font-mono text-[11px] text-muted-foreground">
              <span className="text-neon-green">$</span> cat outcome.log
            </div>
            <div className="max-w-reading space-y-4 p-5 text-base leading-relaxed text-foreground/90 sm:p-8">
              <p>
                This project focused on improving personal time management and
                productivity by establishing structured study schedules,
                prioritizing academic responsibilities, managing programming
                tasks, and developing sustainable daily habits.
              </p>
              <p>
                Through habit assessment, weekly planning, implementation,
                monitoring, and evaluation, the project established a more
                organized approach to balancing academic deadlines, programming
                projects, and personal responsibilities.
              </p>
              <p>
                The development process also incorporated feedback and revisions
                to improve the practicality and effectiveness of the proposed
                productivity system.
              </p>
              <p>
                All planned project phases have been completed, and the project
                has reached its final development stage.
              </p>
            </div>
          </div>
        </div>

        {/* 6. Final status */}
        <div className="space-y-6">
          <SectionLabel index="06" title="Final Project Status" />
          <div className="sf-panel sf-corners overflow-hidden border-neon-green/40 shadow-[0_0_40px_rgba(57,255,136,0.12)]">
            <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[auto_1fr] lg:items-center">
              <div className="flex flex-col items-center gap-3 text-center">
                <span className="grid size-24 place-items-center rounded-full border-2 border-neon-green bg-neon-green/10 shadow-[0_0_30px_rgba(57,255,136,0.35)]">
                  <ShieldCheck
                    className="size-12 text-neon-green"
                    aria-hidden="true"
                  />
                </span>
                <p className="font-mono text-4xl font-bold text-neon-green [text-shadow:0_0_16px_rgba(57,255,136,0.5)]">
                  100%
                </p>
              </div>
              <div>
                <dl className="grid gap-4 sm:grid-cols-2">
                  {[
                    ['Project status', 'COMPLETE'],
                    ['All milestones', 'VERIFIED COMPLETE'],
                    ['Project completion', '100%'],
                    ['Final development status', 'SUCCESS'],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="rounded-md border border-border bg-void/60 p-4"
                    >
                      <dt className="sf-label">{k}</dt>
                      <dd className="mt-1 font-mono text-lg font-bold tracking-wider text-neon-green">
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>
                <Meter
                  value={100}
                  color={GREEN}
                  label="Final project completion"
                  className="mt-6 h-2"
                />
                <p className="mt-6 font-mono text-sm tracking-[0.18em] text-neon-cyan sm:text-base">
                  <span className="text-neon-green">✓</span> ALL OBJECTIVES
                  ACHIEVED. PROJECT DEVELOPMENT SUCCESSFULLY COMPLETED.
                  <span className="sf-caret">_</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
