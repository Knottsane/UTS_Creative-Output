import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { toast } from 'sonner'
import { Pause, Play, RotateCcw, ShieldAlert, SkipForward } from 'lucide-react'

import { Panel } from '@/components/studyflow/panel'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { accentHex, courseById, focusPresets } from '@/lib/fixtures'
import { useMissions } from '@/lib/mission-store'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/app/focus')({
  head: () => ({ meta: [{ title: 'Focus Core · StudyFlow' }] }),
  component: FocusCore,
})

type Phase = 'focus' | 'rest'
type PresetId = (typeof focusPresets)[number]['id']

interface SessionRecord {
  id: number
  missionTitle: string
  minutes: number
  interrupts: number
  endedAt: string
}

function fmt(totalSec: number) {
  const m = Math.floor(totalSec / 60)
  const s = totalSec % 60
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

function FocusCore() {
  const { missions } = useMissions()
  const openMissions = missions.filter((m) => m.status !== 'done')

  const [presetId, setPresetId] = React.useState<PresetId>('sprint')
  const preset = focusPresets.find((p) => p.id === presetId)!
  const [phase, setPhase] = React.useState<Phase>('focus')
  const phaseSeconds = (phase === 'focus' ? preset.focus : preset.rest) * 60

  const [remaining, setRemaining] = React.useState(phaseSeconds)
  const [running, setRunning] = React.useState(false)
  const endAt = React.useRef<number | null>(null)

  const [missionId, setMissionId] = React.useState<string>(
    () =>
      missions.find((m) => m.status === 'active')?.id ??
      openMissions[0]?.id ??
      '',
  )
  const mission = missions.find((m) => m.id === missionId)
  const course = mission ? courseById(mission.courseId) : undefined

  const [interrupts, setInterrupts] = React.useState(0)
  const [log, setLog] = React.useState<SessionRecord[]>([])
  const [cycles, setCycles] = React.useState(0)

  // Reset clock whenever the phase or preset changes while idle.
  React.useEffect(() => {
    setRunning(false)
    endAt.current = null
    setRemaining(phaseSeconds)
  }, [phaseSeconds])

  const completePhase = React.useCallback(() => {
    setRunning(false)
    endAt.current = null
    if (phase === 'focus') {
      const minutes = Math.round((phaseSeconds - remaining) / 60)
      if (minutes < 1) {
        setPhase('rest')
        return
      }
      setLog((l) => [
        {
          id: Date.now(),
          missionTitle: mission?.title ?? 'Free focus',
          minutes,
          interrupts,
          endedAt: new Date().toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
        ...l,
      ])
      setCycles((c) => c + 1)
      setInterrupts(0)
      toast.success('Focus block complete', {
        description: `+${minutes * 2} XP · rest protocol engaged`,
      })
      setPhase('rest')
    } else {
      toast('Rest complete', { description: 'Ready for the next block.' })
      setPhase('focus')
    }
  }, [phase, mission, phaseSeconds, remaining, interrupts])

  // Drift-free countdown based on a wall-clock end time.
  React.useEffect(() => {
    if (!running) return
    if (endAt.current === null) endAt.current = Date.now() + remaining * 1000
    const id = window.setInterval(() => {
      const left = Math.max(0, Math.round((endAt.current! - Date.now()) / 1000))
      setRemaining(left)
      if (left === 0) completePhase()
    }, 250)
    return () => window.clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, completePhase])

  // Mirror the timer in the tab title.
  React.useEffect(() => {
    if (!running) return
    const prev = document.title
    document.title = `${fmt(remaining)} · ${phase === 'focus' ? 'FOCUS' : 'REST'} · StudyFlow`
    return () => {
      document.title = prev
    }
  }, [remaining, running, phase])

  const toggle = () => {
    if (running) {
      endAt.current = null
      setRunning(false)
    } else {
      setRunning(true)
    }
  }
  const reset = () => {
    endAt.current = null
    setRunning(false)
    setRemaining(phaseSeconds)
  }

  const progress = 1 - remaining / phaseSeconds
  const ringColor = phase === 'focus' ? '#B026FF' : '#39FF88'
  const R = 120
  const C = 2 * Math.PI * R
  const totalMinutes = log.reduce((s, r) => s + r.minutes, 0)

  return (
    <div className="mx-auto max-w-content space-y-6">
      <div>
        <p className="sf-label">&gt; module.focus_core</p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-wide sm:text-4xl">
          Focus <span className="sf-gradient-text">Core</span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Lock onto one mission. Block distractions. Let the core run.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
        <section
          className="sf-panel sf-corners sf-grid-bg relative flex flex-col items-center overflow-hidden px-4 py-8 sm:py-10"
          aria-label="Focus timer"
        >
          {/* Presets */}
          <div
            role="radiogroup"
            aria-label="Session preset"
            className="flex flex-wrap justify-center gap-2"
          >
            {focusPresets.map((p) => (
              <button
                key={p.id}
                type="button"
                role="radio"
                aria-checked={presetId === p.id}
                disabled={running}
                onClick={() => {
                  setPresetId(p.id)
                  setPhase('focus')
                }}
                className={cn(
                  'rounded-md border px-3 py-1.5 font-mono text-[11px] tracking-widest uppercase transition-colors disabled:opacity-40 motion-reduce:transition-none',
                  presetId === p.id
                    ? 'border-neon-purple bg-neon-purple/15 text-foreground shadow-[0_0_14px_-4px_#B026FF]'
                    : 'border-border text-muted-foreground hover:text-foreground',
                )}
              >
                {p.label} · {p.focus}/{p.rest}
              </button>
            ))}
          </div>

          {/* Ring */}
          <div className="relative mt-8 aspect-square w-full max-w-[300px]">
            <svg viewBox="0 0 280 280" className="size-full -rotate-90">
              <circle
                cx="140"
                cy="140"
                r={R}
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="10"
              />
              <circle
                cx="140"
                cy="140"
                r={R + 16}
                fill="none"
                stroke="rgba(0,240,255,0.18)"
                strokeWidth="1"
                strokeDasharray="2 6"
              />
              <circle
                cx="140"
                cy="140"
                r={R}
                fill="none"
                stroke={ringColor}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={C * (1 - progress)}
                style={{
                  filter: `drop-shadow(0 0 8px ${ringColor})`,
                  transition: 'stroke-dashoffset 300ms linear',
                }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span
                className="font-mono text-[11px] tracking-[0.3em] uppercase"
                style={{ color: ringColor }}
              >
                {phase === 'focus' ? 'Focus phase' : 'Rest protocol'}
              </span>
              <span
                className="mt-1 font-mono text-6xl font-bold tabular-nums sm:text-7xl"
                style={{ textShadow: `0 0 24px ${ringColor}88` }}
                aria-live="off"
              >
                {fmt(remaining)}
              </span>
              <span className="mt-2 font-mono text-[11px] text-muted-foreground">
                CYCLE {cycles + (phase === 'focus' ? 1 : 0)} ·{' '}
                {running ? 'RUNNING' : 'STANDBY'}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center gap-3">
            <button
              type="button"
              onClick={reset}
              aria-label="Reset timer"
              className="grid size-11 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-neon-cyan/50 hover:text-neon-cyan motion-reduce:transition-none"
            >
              <RotateCcw className="size-4" />
            </button>
            <button
              type="button"
              onClick={toggle}
              className="sf-btn-neon h-12 min-w-40"
            >
              {running ? (
                <>
                  <Pause className="size-4" /> Pause
                </>
              ) : (
                <>
                  <Play className="size-4" />{' '}
                  {remaining === phaseSeconds ? 'Engage' : 'Resume'}
                </>
              )}
            </button>
            <button
              type="button"
              onClick={completePhase}
              aria-label="Skip to next phase"
              className="grid size-11 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-neon-cyan/50 hover:text-neon-cyan motion-reduce:transition-none"
            >
              <SkipForward className="size-4" />
            </button>
          </div>

          {/* Target */}
          <div className="mt-8 w-full max-w-md">
            <label htmlFor="focus-target" className="sf-label">
              Locked target
            </label>
            <Select value={missionId} onValueChange={setMissionId}>
              <SelectTrigger
                id="focus-target"
                className="mt-2 w-full border-border bg-void/60"
              >
                <SelectValue placeholder="Free focus — no mission" />
              </SelectTrigger>
              <SelectContent>
                {openMissions.map((m) => (
                  <SelectItem key={m.id} value={m.id}>
                    {courseById(m.courseId)?.code} · {m.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {course && (
              <p className="mt-2 font-mono text-[11px] text-muted-foreground">
                <span style={{ color: accentHex[course.color] }}>
                  {course.code}
                </span>{' '}
                · {course.name} · est. {mission?.estimateMin}m
              </p>
            )}
          </div>
        </section>

        <div className="space-y-6">
          <Panel code="IX" title="Distraction shield">
            <p className="text-sm text-muted-foreground">
              Caught yourself drifting? Log it, then return to the target. Fewer
              interrupts means a cleaner session score.
            </p>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="sf-label">Interrupts this block</p>
                <p className="mt-1 font-mono text-3xl font-bold text-neon-pink">
                  {interrupts.toString().padStart(2, '0')}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setInterrupts((n) => n + 1)}
                className="sf-btn-ghost border-neon-pink/50 text-neon-pink hover:bg-neon-pink/10"
              >
                <ShieldAlert className="size-4" /> Log
              </button>
            </div>
          </Panel>

          <Panel
            code="X"
            title="Session log"
            action={
              <span className="font-mono text-[11px] text-neon-green">
                {totalMinutes}m TODAY
              </span>
            }
            bodyClassName="p-0"
          >
            {log.length === 0 ? (
              <p className="px-4 py-8 text-center font-mono text-xs text-muted-foreground">
                No blocks completed yet.
                <br />
                Engage the core to start logging.
              </p>
            ) : (
              <ul className="max-h-72 divide-y divide-border overflow-y-auto">
                {log.map((r) => (
                  <li key={r.id} className="px-4 py-3">
                    <p className="truncate text-sm">{r.missionTitle}</p>
                    <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                      [{r.endedAt}] {r.minutes}m ·{' '}
                      <span
                        className={
                          r.interrupts === 0
                            ? 'text-neon-green'
                            : 'text-neon-pink'
                        }
                      >
                        {r.interrupts} interrupts
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          <Panel code="XI" title="Protocol">
            <ol className="space-y-2 font-mono text-xs text-muted-foreground">
              <li>
                <span className="text-neon-cyan">01</span> Pick one mission.
              </li>
              <li>
                <span className="text-neon-cyan">02</span> Silence
                notifications.
              </li>
              <li>
                <span className="text-neon-cyan">03</span> Engage — no tab
                hopping.
              </li>
              <li>
                <span className="text-neon-cyan">04</span> Rest fully. Hydrate.
              </li>
            </ol>
          </Panel>
        </div>
      </div>
    </div>
  )
}
