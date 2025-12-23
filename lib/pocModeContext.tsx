'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface PocModeContextType {
  showPocHelpers: boolean
  togglePocHelpers: () => void
}

const PocModeContext = createContext<PocModeContextType | undefined>(undefined)

export function PocModeProvider({ children }: { children: ReactNode }) {
  // Default to OFF for client demos — toggle via header switch
  const [showPocHelpers, setShowPocHelpers] = useState(false)

  const togglePocHelpers = () => setShowPocHelpers(prev => !prev)

  return (
    <PocModeContext.Provider value={{ showPocHelpers, togglePocHelpers }}>
      {children}
    </PocModeContext.Provider>
  )
}

export function usePocMode() {
  const context = useContext(PocModeContext)
  if (!context) {
    throw new Error('usePocMode must be used within a PocModeProvider')
  }
  return context
}
