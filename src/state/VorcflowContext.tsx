import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import { useVorcflowState } from './useVorcflowState'

const VorcflowContext = createContext<ReturnType<typeof useVorcflowState> | null>(null)

export function VorcflowProvider(props: { children: ReactNode }) {
  const value = useVorcflowState()
  return <VorcflowContext.Provider value={value}>{props.children}</VorcflowContext.Provider>
}

export function useVorcflow() {
  const ctx = useContext(VorcflowContext)
  if (!ctx) throw new Error('useVorcflow must be used within VorcflowProvider')
  return ctx
}

