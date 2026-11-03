import { cn } from '@/lib/utils'

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={cn('size-8', className)}
      fill="none"
    >
      <defs>
        <linearGradient id="sf-logo" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0" stopColor="#00F0FF" />
          <stop offset="0.6" stopColor="#B026FF" />
          <stop offset="1" stopColor="#FF2D75" />
        </linearGradient>
      </defs>
      <path
        d="M6 2h20l4 4v20l-4 4H6l-4-4V6z"
        stroke="url(#sf-logo)"
        strokeWidth="1.5"
      />
      <path
        d="M21 10.5h-8.5a2.5 2.5 0 0 0 0 5h7a2.5 2.5 0 0 1 0 5H11"
        stroke="url(#sf-logo)"
        strokeWidth="2.2"
        strokeLinecap="square"
      />
      <circle cx="23" cy="20.5" r="1.4" fill="#39FF88" />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <LogoMark />
      <span className="font-display text-lg font-bold tracking-[0.22em] text-foreground">
        STUDY<span className="text-neon-cyan">FLOW</span>
      </span>
    </span>
  )
}
