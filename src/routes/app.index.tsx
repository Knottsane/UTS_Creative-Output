import * as React from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import {
  ArrowUpRight,
  Check,
  Flame,
  Play,
  Target,
  Timer,
  Trophy,
} from 'lucide-react'

import { Meter, Panel } from '@/components/studyflow/panel'
import {
  STUB_TODAY,
  accentHex,
  courseById,
  courses,
  operator,
  priorityMeta,
  systemLog,
  todaySchedule,
  weeklyFocus,
  weeklyGoalMinutes,
  type ScheduleBlock,
} from '@/lib/fixtures'
import { useMissions } from '@/lib/mission-store'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/app/')({
  head: () => ({ meta: [{ title: 'Command Deck · StudyFlow' }] }),
  component: Dashboard,
})

function formatHM(min: number) {
  const h = Math.floor(min / 60)
  const m = min % 60
  return `${h}h ${m.toString().padStart(2, '0')}m`
}

function Dashboard() {
  const { missions, toggleDone } = useMissions()
  const done = missions.filter((m) => m.status === 'done').length
  const totalFocus = weeklyFocus.reduce((s, d) => s + d.minutes, 0)
  const activeMission = missions.find((m) => m.status === 'active')
  const queue = missions
    .filter((m) => m.status !== 'done')
    .sort((a, b) => a.due.localeCompare(b.due))
    .slice(0, 5)

  return (
    <div className="mx-auto max-w-content space-y-6">
      {/* Greeting */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="sf-label">
            &gt; session.init // {STUB_TODAY.replaceAll('-', '.')}
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-wide sm:text-4xl">
            Welcome back,{' '}
            <span className="sf-gradient-text">{operator.handle}</span>
            <span className="sf-caret text-neon-cyan">_</span>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {queue.length} missions in queue ·{' '}
            {todaySchedule.filter((b) => b.kind === 'focus').length} deep-work
            blocks scheduled today
          </p>
        </div>
        <Link to="/app/focus" className="sf-btn-neon self-start md:self-auto">
          <Play className="size-4" /> Engage focus
        </Link>
      </div>

      {/* Stat tiles */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile
          icon={Timer}
          label="Focus · week"
          value={formatHM(totalFocus)}
          sub={`${Math.round((totalFocus / weeklyGoalMinutes) * 100)}% of goal`}
          color="#00F0FF"
        />
        <StatTile
          icon={Check}
          label="Missions cleared"
          value={`${done}/${missions.length}`}
          sub="this cycle"
          color="#39FF88"
        />
        <StatTile
          icon={Flame}
          label="Streak"
          value={`${operator.streakDays}d`}
          sub="personal best 31d"
          color="#FF2D75"
        />
        <StatTile
          icon={Trophy}
          label={`Level ${operator.level}`}
          value={`${operator.xp.toLocaleString('en-US')} xp`}
          sub={`${(operator.xpNext - operator.xp).toLocaleString('en-US')} to LVL ${operator.level + 1}`}
          color="#B026FF"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Mission queue */}
        <Panel
          code="01"
          title="Mission queue"
          className="lg:col-span-2"
          action={
            <Link
              to="/app/missions"
              className="flex items-center gap-1 font-mono text-[11px] tracking-widest text-neon-cyan hover:underline"
            >
              ALL <ArrowUpRight className="size-3" />
            </Link>
          }
          bodyClassName="p-0"
        >
          {activeMission && (
            <div className="flex items-center gap-3 border-b border-border bg-neon-purple/[0.06] px-4 py-3">
              <Target className="size-4 shrink-0 text-neon-purple" />
              <div className="min-w-0">
                <p className="sf-label text-neon-purple">Active target</p>
                <p className="truncate text-sm font-medium">
                  {activeMission.title}
                </p>
              </div>
              <Link
                to="/app/focus"
                className="ml-auto shrink-0 font-mono text-[11px] tracking-widest text-neon-cyan hover:underline"
              >
                FOCUS →
              </Link>
            </div>
          )}
          {queue.length === 0 ? (
            <p className="px-4 py-10 text-center font-mono text-sm text-muted-foreground">
              QUEUE EMPTY — all missions cleared. Nice work.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {queue.map((m) => {
                const course = courseById(m.courseId)
                const p = priorityMeta[m.priority]
                return (
                  <li
                    key={m.id}
                    className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-white/[0.02] motion-reduce:transition-none"
                  >
                    <button
                      type="button"
                      onClick={() => toggleDone(m.id)}
                      aria-label={`Mark "${m.title}" complete`}
                      className="grid size-5 shrink-0 place-items-center rounded-sm border border-neon-cyan/50 text-neon-green transition-colors hover:border-neon-green hover:bg-neon-green/10 motion-reduce:transition-none"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm">{m.title}</p>
                      <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                        <span
                          style={{
                            color: course ? accentHex[course.color] : undefined,
                          }}
                        >
                          {course?.code}
                        </span>{' '}
                        · due {m.due.slice(5).replace('-', '/')} · ~
                        {m.estimateMin}m
                      </p>
                    </div>
                    <span
                      className="shrink-0 rounded-sm border px-1.5 py-0.5 font-mono text-[10px] tracking-widest"
                      style={{ color: p.color, borderColor: `${p.color}55` }}
                    >
                      {p.label}
                    </span>
                  </li>
                )
              })}
            </ul>
          )}
        </Panel>

        {/* Timeline */}
        <Panel code="02" title="Today's timeline" bodyClassName="p-0">
          <Timeline blocks={todaySchedule} />
        </Panel>

        {/* Weekly focus chart */}
        <Panel
          code="03"
          title="Focus telemetry"
          className="lg:col-span-2"
          action={
            <span className="font-mono text-[11px] text-muted-foreground">
              GOAL {weeklyGoalMinutes / 60}H / WK
            </span>
          }
        >
          <FocusChart />
        </Panel>

        {/* Courses */}
        <Panel code="04" title="Course sync">
          <ul className="space-y-4">
            {courses.map((c) => (
              <li key={c.id}>
                <div className="flex items-baseline justify-between gap-2">
                  <p className="truncate text-sm">
                    <span
                      className="mr-2 font-mono text-[11px]"
                      style={{ color: accentHex[c.color] }}
                    >
                      {c.code}
                    </span>
                    {c.name}
                  </p>
                  <span className="font-mono text-xs text-muted-foreground">
                    {c.progress}%
                  </span>
                </div>
                <Meter
                  value={c.progress}
                  color={accentHex[c.color]}
                  label={`${c.name} progress`}
                  className="mt-2"
                />
                <p className="mt-1.5 font-mono text-[10px] text-muted-foreground">
                  NEXT ▸ {c.nextDeadline}
                </p>
              </li>
            ))}
          </ul>
        </Panel>

        {/* System log */}
        <Panel
          code="05"
          title="System log"
          className="lg:col-span-3"
          bodyClassName="sf-scanlines"
        >
          <ul className="grid gap-2 font-mono text-xs sm:grid-cols-2">
            {systemLog.map((l, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-muted-foreground">[{l.time}]</span>
                <span
                  className={cn(
                    l.tone === 'green' && 'text-neon-green',
                    l.tone === 'purple' && 'text-neon-purple',
                    l.tone === 'cyan' && 'text-neon-cyan',
                    l.tone === 'pink' && 'text-neon-pink',
                  )}
                >
                  {l.text}
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  )
}

function StatTile({
  icon: Icon,
  label,
  value,
  sub,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  sub: string
  color: string
}) {
  return (
    <div className="sf-panel sf-panel-hover p-4">
      <div className="flex items-center justify-between">
        <p className="sf-label">{label}</p>
        <span style={{ color }}>
          <Icon className="size-4" />
        </span>
      </div>
      <p
        className="mt-3 font-mono text-2xl font-bold tracking-tight sm:text-3xl"
        style={{ textShadow: `0 0 18px ${color}66` }}
      >
        {value}
      </p>
      <p className="mt-1 font-mono text-[11px] text-muted-foreground">{sub}</p>
      <div
        className="mt-3 h-px w-full"
        style={{
          background: `linear-gradient(90deg, ${color}, transparent)`,
        }}
      />
    </div>
  )
}

const kindColor: Record<ScheduleBlock['kind'], string> = {
  lecture: '#00F0FF',
  focus: '#B026FF',
  lab: '#FF2D75',
  break: '#9292A8',
  review: '#39FF88',
}

function Timeline({ blocks }: { blocks: ScheduleBlock[] }) {
  return (
    <ol className="relative px-4 py-4">
      <span
        aria-hidden="true"
        className="absolute top-4 bottom-4 left-[4.6rem] w-px bg-border"
      />
      {blocks.map((b) => (
        <li key={b.id} className="relative flex gap-4 pb-4 last:pb-0">
          <span className="w-12 shrink-0 pt-0.5 text-right font-mono text-[11px] text-muted-foreground">
            {b.start}
          </span>
          <span
            aria-hidden="true"
            className="relative z-10 mt-1.5 size-2 shrink-0 rounded-full"
            style={{
              background: kindColor[b.kind],
              boxShadow: `0 0 8px ${kindColor[b.kind]}`,
            }}
          />
          <div className="min-w-0">
            <p className="truncate text-sm">{b.title}</p>
            <p className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
              {b.kind} · {b.start}–{b.end}
              {b.location ? ` · ${b.location}` : ''}
            </p>
          </div>
        </li>
      ))}
    </ol>
  )
}

function FocusChart() {
  const max = Math.max(...weeklyFocus.map((d) => d.minutes))
  const [hover, setHover] = React.useState<number | null>(null)
  const dailyTarget = weeklyGoalMinutes / 7
  const targetPct = (dailyTarget / max) * 100

  return (
    <figure>
      <div className="relative flex h-48 items-end gap-2 sm:gap-4">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 border-t border-dashed border-neon-pink/50"
          style={{ bottom: `${targetPct}%` }}
        >
          <span className="absolute -top-4 right-0 font-mono text-[10px] text-neon-pink">
            DAILY TARGET {Math.round(dailyTarget)}m
          </span>
        </div>
        {weeklyFocus.map((d, i) => {
          const pct = (d.minutes / max) * 100
          const met = d.minutes >= dailyTarget
          return (
            <div
              key={d.day}
              className="group relative flex h-full flex-1 flex-col justify-end"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            >
              <span
                className={cn(
                  'mb-1 text-center font-mono text-[10px] transition-opacity motion-reduce:transition-none',
                  hover === i
                    ? 'text-foreground opacity-100'
                    : 'text-muted-foreground opacity-70',
                )}
              >
                {d.minutes}m
              </span>
              <div
                className="w-full rounded-t-sm transition-all motion-reduce:transition-none"
                style={{
                  height: `${pct}%`,
                  background: met
                    ? 'linear-gradient(180deg, #00F0FF, rgba(0,240,255,0.15))'
                    : 'linear-gradient(180deg, #B026FF, rgba(176,38,255,0.12))',
                  boxShadow:
                    hover === i
                      ? `0 0 18px ${met ? '#00F0FF' : '#B026FF'}`
                      : 'none',
                }}
              />
            </div>
          )
        })}
      </div>
      <div className="mt-2 flex gap-2 border-t border-border pt-2 sm:gap-4">
        {weeklyFocus.map((d) => (
          <span
            key={d.day}
            className="flex-1 text-center font-mono text-[10px] tracking-widest text-muted-foreground"
          >
            {d.day}
          </span>
        ))}
      </div>
      <figcaption className="mt-3 flex flex-wrap gap-4 font-mono text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-sm bg-neon-cyan" /> Target met
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-sm bg-neon-purple" /> Below target
        </span>
      </figcaption>
    </figure>
  )
}
