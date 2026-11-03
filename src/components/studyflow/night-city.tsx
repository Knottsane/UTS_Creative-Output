import { cn } from '@/lib/utils'

/** Fixed, CSS-only Night City atmosphere painted behind every page. */
export function NightCityBackground() {
  return (
    <div className="nc-atmosphere" aria-hidden="true">
      <div className="nc-light nc-light--magenta" />
      <div className="nc-light nc-light--cyan" />
      <div className="nc-light nc-light--purple" />
      <div className="nc-light nc-light--blue" />
      <div className="nc-light nc-light--red" />
      <div className="nc-grid" />
      <div className="nc-data" />
      <div className="nc-bands" />
      <div className="nc-scanlines" />
      <div className="nc-sweep" />
      <div className="nc-noise" />
      <div className="nc-vignette" />
    </div>
  )
}

export const nightCitySignals = [
  { left: 'Night City', right: 'Network connected', color: 'text-neon-cyan' },
  { left: 'Sandevistan protocol', right: 'Ready', color: 'text-neon-pink' },
  { left: 'Netrunner system', right: 'Online', color: 'text-neon-cyan' },
  { left: 'Edgerunner status', right: 'Active', color: 'text-neon-green' },
  {
    left: 'Night City database',
    right: 'Access granted',
    color: 'text-neon-purple',
  },
  {
    left: 'Afterlife connection',
    right: 'Established',
    color: 'text-neon-red',
  },
] as const

export function SignalChip({
  index,
  className,
}: {
  index: number
  className?: string
}) {
  const s = nightCitySignals[index % nightCitySignals.length]
  return (
    <span className={cn('nc-chip', className)}>
      <span className="size-1.5 rounded-full bg-current opacity-80" />
      {s.left} <span className="text-muted-foreground/50">//</span>{' '}
      <b className={s.color}>{s.right}</b>
    </span>
  )
}

/** Slow scrolling system strip carrying the Easter-egg status readouts. */
export function SignalTicker({ className }: { className?: string }) {
  const loop = [...nightCitySignals, ...nightCitySignals]
  return (
    <div
      className={cn(
        'relative overflow-hidden border-b border-border bg-void/60 backdrop-blur-sm',
        className,
      )}
    >
      <p className="sr-only">
        {nightCitySignals.map((s) => `${s.left}: ${s.right}.`).join(' ')}
      </p>
      <div
        aria-hidden="true"
        className="nc-marquee flex w-max gap-10 py-1.5 pl-6"
      >
        {loop.map((_, i) => (
          <SignalChip key={i} index={i} />
        ))}
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-void to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-void to-transparent"
      />
    </div>
  )
}
