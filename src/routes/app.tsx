import * as React from 'react'
import { Link, Outlet, createFileRoute } from '@tanstack/react-router'
import {
  CalendarClock,
  LayoutGrid,
  ListTodo,
  Menu,
  NotebookPen,
  Radar,
  Timer,
  Zap,
} from 'lucide-react'

import { Logo } from '@/components/studyflow/logo'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { MissionProvider } from '@/lib/mission-store'
import { operator } from '@/lib/fixtures'
import { SignalChip } from '@/components/studyflow/night-city'

export const Route = createFileRoute('/app')({
  component: AppLayout,
})

const liveNav = [
  { to: '/app', label: 'Command Deck', icon: LayoutGrid, exact: true },
  { to: '/app/missions', label: 'Missions', icon: ListTodo, exact: false },
  { to: '/app/focus', label: 'Focus Core', icon: Timer, exact: false },
] as const

const upcomingNav = [
  { label: 'Timeline', icon: CalendarClock },
  { label: 'Data Vault', icon: NotebookPen },
  { label: 'Telemetry', icon: Radar },
]

function AppLayout() {
  return (
    <MissionProvider>
      <div className="flex min-h-screen">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-navy/70 backdrop-blur lg:flex">
          <SidebarContent />
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar />
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </MissionProvider>
  )
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b border-border px-5">
        <Link to="/" onClick={onNavigate} aria-label="StudyFlow home">
          <Logo />
        </Link>
      </div>
      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-6">
        <div>
          <p className="sf-label px-3 pb-2">// Modules</p>
          <ul className="space-y-1">
            {liveNav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={onNavigate}
                  activeOptions={{ exact: item.exact }}
                  className="group flex items-center gap-3 rounded-md border border-transparent px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:border-border hover:bg-accent/60 hover:text-foreground data-[status=active]:border-neon-purple/40 data-[status=active]:bg-neon-purple/10 data-[status=active]:text-foreground motion-reduce:transition-none"
                >
                  <item.icon className="size-4 text-neon-cyan/70 group-data-[status=active]:text-neon-cyan" />
                  <span className="font-ui text-[15px] font-semibold tracking-wider">
                    {item.label}
                  </span>
                  <span className="ml-auto hidden size-1.5 rounded-full bg-neon-cyan shadow-[0_0_8px_#00F0FF] group-data-[status=active]:block" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="sf-label px-3 pb-2">// Installing</p>
          <ul className="space-y-1">
            {upcomingNav.map((item) => (
              <li
                key={item.label}
                className="flex items-center gap-3 px-3 py-2.5 text-sm text-muted-foreground/60"
              >
                <item.icon className="size-4" />
                <span className="font-ui text-[15px] font-semibold tracking-wider">
                  {item.label}
                </span>
                <span className="ml-auto font-mono text-[10px] tracking-widest text-neon-pink/70">
                  SOON
                </span>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <div className="space-y-3 border-t border-border p-4">
        <SignalChip index={1} className="text-[10px] tracking-[0.14em]" />
        <div className="sf-panel flex items-center gap-3 p-3">
          <div className="grid size-9 place-items-center rounded-md border border-neon-purple/50 bg-neon-purple/15 font-mono text-xs font-bold text-neon-purple">
            S
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-mono text-xs font-bold tracking-wider">
              {operator.handle}
            </p>
            <p className="font-mono text-[10px] text-muted-foreground">
              LVL {operator.level} · {operator.streakDays}D STREAK
            </p>
          </div>
          <Zap className="size-4 text-neon-green" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}

function TopBar() {
  const [open, setOpen] = React.useState(false)
  const [clock, setClock] = React.useState<string | null>(null)

  React.useEffect(() => {
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      )
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-void/80 px-4 backdrop-blur sm:px-6 lg:px-8">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          className="grid size-9 place-items-center rounded-md border border-border text-muted-foreground hover:text-foreground lg:hidden"
          aria-label="Open navigation"
        >
          <Menu className="size-4" />
        </SheetTrigger>
        <SheetContent side="left" className="w-72 border-border bg-navy p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <SheetDescription className="sr-only">
            StudyFlow modules
          </SheetDescription>
          <SidebarContent onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
      <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
        <span className="sf-pulse size-2 rounded-full bg-neon-green shadow-[0_0_8px_#39FF88]" />
        <span className="hidden sm:inline">SYS.ONLINE</span>
        <span className="hidden text-border md:inline">│</span>
        <span className="hidden md:inline">NODE: STUDYFLOW-OS v1.0</span>
        <span className="hidden text-border xl:inline">│</span>
        <span className="hidden xl:inline">
          <SignalChip index={3} className="text-[11px]" />
        </span>
      </div>
      <div className="ml-auto flex items-center gap-4 font-mono text-xs">
        <span className="hidden text-muted-foreground sm:inline">
          {operator.timezone}
        </span>
        <span
          className="min-w-[8ch] text-right text-neon-cyan sf-glow-cyan"
          suppressHydrationWarning
        >
          {clock ?? '--:--:--'}
        </span>
      </div>
    </header>
  )
}
