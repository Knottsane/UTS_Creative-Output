import { cn } from '@/lib/utils'

export function Panel({
  title,
  code,
  action,
  className,
  bodyClassName,
  children,
  corners = false,
}: {
  title: string
  code?: string
  action?: React.ReactNode
  className?: string
  bodyClassName?: string
  children: React.ReactNode
  corners?: boolean
}) {
  return (
    <section
      className={cn(
        'sf-panel flex flex-col',
        corners && 'sf-corners',
        className,
      )}
    >
      <header className="flex items-center gap-3 border-b border-border px-4 py-3">
        {code && (
          <span className="font-mono text-[10px] tracking-widest text-neon-purple">
            {code}
          </span>
        )}
        <h2 className="font-ui text-base font-bold tracking-[0.14em] uppercase">
          {title}
        </h2>
        {action && <div className="ml-auto">{action}</div>}
      </header>
      <div className={cn('flex-1 p-4', bodyClassName)}>{children}</div>
    </section>
  )
}

export function Meter({
  value,
  color = '#B026FF',
  className,
  label,
}: {
  value: number
  color?: string
  className?: string
  label: string
}) {
  const v = Math.max(0, Math.min(100, value))
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={Math.round(v)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        'h-1.5 w-full overflow-hidden rounded-full bg-white/5',
        className,
      )}
    >
      <div
        className="h-full rounded-full transition-[width] duration-500 motion-reduce:transition-none"
        style={{
          width: `${v}%`,
          background: color,
          boxShadow: `0 0 10px ${color}`,
        }}
      />
    </div>
  )
}
