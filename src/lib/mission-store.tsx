import * as React from 'react'
import { missions as seedMissions, type Mission } from '@/lib/fixtures'

/**
 * Client-side mission state seeded from fixtures. Shared by every /app screen
 * so completing a mission on one screen updates the others. A later milestone
 * replaces this provider's internals with server functions + Netlify Database.
 */
interface MissionStore {
  missions: Mission[]
  toggleDone: (id: string) => void
  addMission: (m: Omit<Mission, 'id' | 'status'>) => void
  removeMission: (id: string) => void
  setActive: (id: string) => void
}

const Ctx = React.createContext<MissionStore | null>(null)

export function MissionProvider({ children }: { children: React.ReactNode }) {
  const [missions, setMissions] = React.useState<Mission[]>(seedMissions)

  const value = React.useMemo<MissionStore>(
    () => ({
      missions,
      toggleDone: (id) =>
        setMissions((list) =>
          list.map((m) =>
            m.id === id
              ? { ...m, status: m.status === 'done' ? 'queued' : 'done' }
              : m,
          ),
        ),
      addMission: (m) =>
        setMissions((list) => [
          { ...m, id: `m${Date.now()}`, status: 'queued' },
          ...list,
        ]),
      removeMission: (id) =>
        setMissions((list) => list.filter((m) => m.id !== id)),
      setActive: (id) =>
        setMissions((list) =>
          list.map((m) =>
            m.id === id
              ? { ...m, status: 'active' }
              : m.status === 'active'
                ? { ...m, status: 'queued' }
                : m,
          ),
        ),
    }),
    [missions],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useMissions() {
  const ctx = React.useContext(Ctx)
  if (!ctx) throw new Error('useMissions must be used inside MissionProvider')
  return ctx
}
