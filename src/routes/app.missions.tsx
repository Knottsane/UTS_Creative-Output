import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { toast } from 'sonner'
import { Check, Crosshair, Plus, Trash2 } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  STUB_TODAY,
  accentHex,
  courseById,
  courses,
  priorityMeta,
  type MissionStatus,
  type Priority,
} from '@/lib/fixtures'
import { useMissions } from '@/lib/mission-store'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/app/missions')({
  head: () => ({ meta: [{ title: 'Missions · StudyFlow' }] }),
  component: Missions,
})

const statusFilters: { id: 'all' | MissionStatus; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'queued', label: 'Queued' },
  { id: 'done', label: 'Cleared' },
]

const priorityOrder: Record<Priority, number> = {
  critical: 0,
  high: 1,
  normal: 2,
  low: 3,
}

function daysUntil(iso: string) {
  const a = Date.parse(`${STUB_TODAY}T00:00:00Z`)
  const b = Date.parse(`${iso}T00:00:00Z`)
  return Math.round((b - a) / 86_400_000)
}

function dueLabel(iso: string) {
  const d = daysUntil(iso)
  if (d < 0) return { text: `${-d}d overdue`, color: '#FF2D75' }
  if (d === 0) return { text: 'due today', color: '#FF2D75' }
  if (d === 1) return { text: 'due tomorrow', color: '#B026FF' }
  return { text: `in ${d}d`, color: '#9292A8' }
}

function Missions() {
  const { missions, toggleDone, removeMission, setActive } = useMissions()
  const [status, setStatus] = React.useState<'all' | MissionStatus>('all')
  const [course, setCourse] = React.useState<string>('all')

  const visible = missions
    .filter((m) => status === 'all' || m.status === status)
    .filter((m) => course === 'all' || m.courseId === course)
    .sort(
      (a, b) =>
        Number(a.status === 'done') - Number(b.status === 'done') ||
        a.due.localeCompare(b.due) ||
        priorityOrder[a.priority] - priorityOrder[b.priority],
    )

  const counts = {
    all: missions.length,
    active: missions.filter((m) => m.status === 'active').length,
    queued: missions.filter((m) => m.status === 'queued').length,
    done: missions.filter((m) => m.status === 'done').length,
  }
  const loadMin = missions
    .filter((m) => m.status !== 'done')
    .reduce((s, m) => s + m.estimateMin, 0)

  return (
    <div className="mx-auto max-w-content space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="sf-label">&gt; module.missions</p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-wide sm:text-4xl">
            Mission <span className="sf-gradient-text">Control</span>
          </h1>
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            {counts.queued + counts.active} OPEN · {Math.floor(loadMin / 60)}h{' '}
            {loadMin % 60}m ESTIMATED LOAD
          </p>
        </div>
        <NewMissionDialog />
      </div>

      {/* Filters */}
      <div className="sf-panel flex flex-col gap-3 p-3 sm:flex-row sm:items-center">
        <div
          role="tablist"
          aria-label="Filter by status"
          className="flex flex-wrap gap-1"
        >
          {statusFilters.map((f) => (
            <button
              key={f.id}
              role="tab"
              type="button"
              aria-selected={status === f.id}
              onClick={() => setStatus(f.id)}
              className={cn(
                'rounded-md px-3 py-1.5 font-mono text-[11px] tracking-widest uppercase transition-colors motion-reduce:transition-none',
                status === f.id
                  ? 'bg-neon-purple/15 text-foreground ring-1 ring-neon-purple/50'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {f.label} <span className="text-neon-cyan">{counts[f.id]}</span>
            </button>
          ))}
        </div>
        <div className="sm:ml-auto sm:w-64">
          <Select value={course} onValueChange={setCourse}>
            <SelectTrigger
              aria-label="Filter by course"
              className="w-full border-border bg-void/60 font-mono text-xs"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All courses</SelectItem>
              {courses.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.code} · {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* List */}
      {visible.length === 0 ? (
        <div className="sf-panel sf-grid-bg grid place-items-center px-4 py-16 text-center">
          <p className="font-ui text-xl font-semibold tracking-wide">
            No missions here
          </p>
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            Adjust the filters or deploy a new mission.
          </p>
        </div>
      ) : (
        <ul className="grid gap-3">
          {visible.map((m) => {
            const c = courseById(m.courseId)
            const p = priorityMeta[m.priority]
            const due = dueLabel(m.due)
            const done = m.status === 'done'
            const accent = c ? accentHex[c.color] : '#B026FF'
            return (
              <li
                key={m.id}
                className={cn(
                  'sf-panel sf-panel-hover group flex flex-col gap-3 p-4 sm:flex-row sm:items-center',
                  m.status === 'active' &&
                    'border-neon-purple/60 shadow-[0_0_24px_-8px_#B026FF]',
                  done && 'opacity-60',
                )}
                style={{ borderLeft: `2px solid ${accent}` }}
              >
                <div className="flex min-w-0 flex-1 items-start gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      toggleDone(m.id)
                      if (!done)
                        toast.success('Mission cleared', {
                          description: m.title,
                        })
                    }}
                    aria-label={
                      done
                        ? `Reopen "${m.title}"`
                        : `Mark "${m.title}" complete`
                    }
                    aria-pressed={done}
                    className={cn(
                      'mt-0.5 grid size-5 shrink-0 place-items-center rounded-sm border transition-colors motion-reduce:transition-none',
                      done
                        ? 'border-neon-green bg-neon-green/20 text-neon-green'
                        : 'border-neon-cyan/50 hover:border-neon-green hover:bg-neon-green/10',
                    )}
                  >
                    {done && <Check className="size-3.5" />}
                  </button>
                  <div className="min-w-0">
                    <p
                      className={cn(
                        'text-sm font-medium',
                        done && 'line-through',
                      )}
                    >
                      {m.title}
                    </p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px]">
                      <span style={{ color: accent }}>{c?.code}</span>
                      <span
                        style={{ color: done ? undefined : due.color }}
                        className={done ? 'text-muted-foreground' : ''}
                      >
                        {done ? 'cleared' : due.text}
                      </span>
                      <span className="text-muted-foreground">
                        ~{m.estimateMin}m
                      </span>
                      {m.tags.map((t) => (
                        <span key={t} className="text-muted-foreground">
                          #{t.replace(' ', '-')}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 pl-8 sm:pl-0">
                  {m.status === 'active' && (
                    <span className="sf-pulse font-mono text-[10px] tracking-widest text-neon-purple">
                      ◉ ACTIVE
                    </span>
                  )}
                  <span
                    className="rounded-sm border px-1.5 py-0.5 font-mono text-[10px] tracking-widest"
                    style={{ color: p.color, borderColor: `${p.color}55` }}
                  >
                    {p.label}
                  </span>
                  {!done && m.status !== 'active' && (
                    <button
                      type="button"
                      onClick={() => setActive(m.id)}
                      aria-label={`Set "${m.title}" as active target`}
                      className="grid size-8 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-neon-purple/60 hover:text-neon-purple motion-reduce:transition-none"
                    >
                      <Crosshair className="size-3.5" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      removeMission(m.id)
                      toast('Mission deleted', { description: m.title })
                    }}
                    aria-label={`Delete "${m.title}"`}
                    className="grid size-8 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-neon-pink/60 hover:text-neon-pink motion-reduce:transition-none"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

function NewMissionDialog() {
  const { addMission } = useMissions()
  const [open, setOpen] = React.useState(false)
  const [title, setTitle] = React.useState('')
  const [courseId, setCourseId] = React.useState(courses[0].id)
  const [priority, setPriority] = React.useState<Priority>('normal')
  const [due, setDue] = React.useState(STUB_TODAY)
  const [estimate, setEstimate] = React.useState('45')
  const [error, setError] = React.useState<string | null>(null)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim().length < 3) {
      setError('Give the mission a title of at least 3 characters.')
      return
    }
    const est = Number(estimate)
    if (!Number.isFinite(est) || est < 5 || est > 600) {
      setError('Estimate must be between 5 and 600 minutes.')
      return
    }
    addMission({
      title: title.trim(),
      courseId,
      priority,
      due,
      estimateMin: Math.round(est),
      tags: [],
    })
    toast.success('Mission deployed', { description: title.trim() })
    setTitle('')
    setError(null)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="sf-btn-neon self-start md:self-auto">
        <Plus className="size-4" /> New mission
      </DialogTrigger>
      <DialogContent className="sf-panel border-neon-purple/40 bg-navy">
        <DialogHeader>
          <DialogTitle className="font-display tracking-wider uppercase">
            Deploy new mission
          </DialogTitle>
          <DialogDescription>
            Add an assignment, study block, or task to your queue.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="grid gap-4" noValidate>
          <div className="grid gap-2">
            <Label htmlFor="mission-title" className="sf-label">
              Title
            </Label>
            <Input
              id="mission-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Finish chapter 9 problems"
              aria-invalid={error ? true : undefined}
              autoFocus
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="mission-course" className="sf-label">
                Course
              </Label>
              <Select value={courseId} onValueChange={setCourseId}>
                <SelectTrigger id="mission-course" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="mission-priority" className="sf-label">
                Priority
              </Label>
              <Select
                value={priority}
                onValueChange={(v) => setPriority(v as Priority)}
              >
                <SelectTrigger id="mission-priority" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(priorityMeta) as Priority[]).map((p) => (
                    <SelectItem key={p} value={p}>
                      {priorityMeta[p].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="mission-due" className="sf-label">
                Due date
              </Label>
              <Input
                id="mission-due"
                type="date"
                value={due}
                onChange={(e) => setDue(e.target.value || STUB_TODAY)}
                className="[color-scheme:dark]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="mission-est" className="sf-label">
                Estimate (min)
              </Label>
              <Input
                id="mission-est"
                type="number"
                inputMode="numeric"
                min={5}
                max={600}
                step={5}
                value={estimate}
                onChange={(e) => setEstimate(e.target.value)}
              />
            </div>
          </div>
          {error && (
            <p role="alert" className="font-mono text-xs text-neon-pink">
              ! {error}
            </p>
          )}
          <DialogFooter>
            <button type="submit" className="sf-btn-neon w-full sm:w-auto">
              Deploy
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
