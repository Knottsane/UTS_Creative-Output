/**
 * StudyFlow stubbed data.
 *
 * Every screen reads from this single module so a later milestone can swap
 * these constants for real persistence (Netlify Database) without touching
 * the UI components. Shapes here are the intended domain types.
 */

export type Priority = 'critical' | 'high' | 'normal' | 'low'
export type MissionStatus = 'queued' | 'active' | 'done'

export interface Course {
  id: string
  code: string
  name: string
  color: 'purple' | 'cyan' | 'pink' | 'green'
  progress: number // 0-100
  nextDeadline: string
}

export interface Mission {
  id: string
  title: string
  courseId: string
  priority: Priority
  status: MissionStatus
  due: string // ISO date
  estimateMin: number
  tags: string[]
}

export interface ScheduleBlock {
  id: string
  start: string // HH:MM
  end: string
  title: string
  kind: 'lecture' | 'focus' | 'lab' | 'break' | 'review'
  location?: string
}

export const operator = {
  handle: 'STEPHEN',
  name: 'Rob Stephen Q. Lim',
  level: 14,
  xp: 6820,
  xpNext: 8000,
  streakDays: 23,
  timezone: 'UTC-05',
}

export const courses: Course[] = [
  {
    id: 'cs301',
    code: 'CS-301',
    name: 'Data Structures & Algorithms',
    color: 'purple',
    progress: 68,
    nextDeadline: 'Graph traversal lab · Thu',
  },
  {
    id: 'ma220',
    code: 'MA-220',
    name: 'Linear Algebra',
    color: 'cyan',
    progress: 54,
    nextDeadline: 'Problem set 7 · Fri',
  },
  {
    id: 'ph150',
    code: 'PH-150',
    name: 'Physics II: Electromagnetism',
    color: 'pink',
    progress: 41,
    nextDeadline: 'Midterm · Mon',
  },
  {
    id: 'hs110',
    code: 'HS-110',
    name: 'History of Computing',
    color: 'green',
    progress: 82,
    nextDeadline: 'Essay draft · Next Wed',
  },
]

export const missions: Mission[] = [
  {
    id: 'm1',
    title: 'Implement Dijkstra with a binary heap',
    courseId: 'cs301',
    priority: 'critical',
    status: 'active',
    due: '2026-11-05',
    estimateMin: 120,
    tags: ['code', 'lab'],
  },
  {
    id: 'm2',
    title: 'Problem set 7 — eigenvalues & diagonalization',
    courseId: 'ma220',
    priority: 'high',
    status: 'queued',
    due: '2026-11-06',
    estimateMin: 90,
    tags: ['pset'],
  },
  {
    id: 'm3',
    title: "Review Maxwell's equations flashcards",
    courseId: 'ph150',
    priority: 'high',
    status: 'queued',
    due: '2026-11-04',
    estimateMin: 45,
    tags: ['exam prep'],
  },
  {
    id: 'm4',
    title: 'Outline essay: ENIAC & the women programmers',
    courseId: 'hs110',
    priority: 'normal',
    status: 'queued',
    due: '2026-11-11',
    estimateMin: 60,
    tags: ['writing'],
  },
  {
    id: 'm5',
    title: 'Watch lecture 14 — amortized analysis',
    courseId: 'cs301',
    priority: 'normal',
    status: 'done',
    due: '2026-11-02',
    estimateMin: 75,
    tags: ['lecture'],
  },
  {
    id: 'm6',
    title: 'Physics lab report — RC circuits',
    courseId: 'ph150',
    priority: 'critical',
    status: 'queued',
    due: '2026-11-04',
    estimateMin: 100,
    tags: ['lab', 'writing'],
  },
  {
    id: 'm7',
    title: 'Refactor study notes into spaced-repetition deck',
    courseId: 'ma220',
    priority: 'low',
    status: 'done',
    due: '2026-11-01',
    estimateMin: 30,
    tags: ['review'],
  },
]

export const todaySchedule: ScheduleBlock[] = [
  { id: 's1', start: '08:30', end: '09:45', title: 'CS-301 Lecture', kind: 'lecture', location: 'Hall B-12' },
  { id: 's2', start: '10:00', end: '11:40', title: 'Deep work · Dijkstra lab', kind: 'focus' },
  { id: 's3', start: '11:40', end: '12:20', title: 'Recharge', kind: 'break' },
  { id: 's4', start: '13:00', end: '15:00', title: 'PH-150 Lab', kind: 'lab', location: 'Sci Annex 3' },
  { id: 's5', start: '16:00', end: '16:45', title: 'Flashcard review · Maxwell', kind: 'review' },
  { id: 's6', start: '19:00', end: '20:30', title: 'Deep work · Problem set 7', kind: 'focus' },
]

/** Focus minutes per day, Monday → Sunday. */
export const weeklyFocus = [
  { day: 'MON', minutes: 145 },
  { day: 'TUE', minutes: 210 },
  { day: 'WED', minutes: 95 },
  { day: 'THU', minutes: 180 },
  { day: 'FRI', minutes: 240 },
  { day: 'SAT', minutes: 60 },
  { day: 'SUN', minutes: 130 },
]

export const weeklyGoalMinutes = 1200

export const systemLog = [
  { time: '09:47', text: 'Session complete · 50:00 on CS-301', tone: 'green' as const },
  { time: '09:46', text: 'Streak extended → 23 days', tone: 'purple' as const },
  { time: '08:12', text: 'Mission queued · RC circuits report', tone: 'cyan' as const },
  { time: 'YDA', text: 'Deadline approaching · PH-150 midterm', tone: 'pink' as const },
]

export const focusPresets = [
  { id: 'sprint', label: 'Sprint', focus: 25, rest: 5 },
  { id: 'deep', label: 'Deep Work', focus: 50, rest: 10 },
  { id: 'ultra', label: 'Overclock', focus: 90, rest: 20 },
] as const

export const ambientChannels = [
  { id: 'rain', label: 'Neon Rain' },
  { id: 'synth', label: 'Lo-fi Synth' },
  { id: 'server', label: 'Server Hum' },
  { id: 'silence', label: 'Silence' },
] as const

export function courseById(id: string) {
  return courses.find((c) => c.id === id)
}

export const accentHex: Record<Course['color'], string> = {
  purple: '#B026FF',
  cyan: '#00F0FF',
  pink: '#FF2D75',
  green: '#39FF88',
}

export const priorityMeta: Record<Priority, { label: string; color: string }> = {
  critical: { label: 'CRIT', color: '#FF2D75' },
  high: { label: 'HIGH', color: '#B026FF' },
  normal: { label: 'NORM', color: '#00F0FF' },
  low: { label: 'LOW', color: '#9292A8' },
}

/** Fixed "now" so SSR and client render the same stubbed dates. */
export const STUB_TODAY = '2026-11-03'
