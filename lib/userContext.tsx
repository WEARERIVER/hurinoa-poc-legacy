'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

// ============================================================================
// User Context
// ============================================================================
// Simple context to track the current user type (Contributor, Uri, or Developer).
// This is a POC mock — no real auth. The user can switch between profiles
// to demo different journeys.

export type UserType = 'contributor' | 'uri' | 'developer'

export interface User {
  name: string
  type: UserType
}

// Pre-seeded mock users for demo purposes
export const MOCK_USERS: Record<UserType, User> = {
  contributor: { name: 'Aroha', type: 'contributor' },
  uri: { name: 'Wiremu', type: 'uri' },
  developer: { name: 'Dev', type: 'developer' },
}

interface UserContextValue {
  user: User
  switchUser: (type: UserType) => void
}

const UserContext = createContext<UserContextValue | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  // Default to contributor (primary user for MVP)
  const [userType, setUserType] = useState<UserType>('contributor')

  const user = MOCK_USERS[userType]

  const switchUser = (type: UserType) => {
    setUserType(type)
  }

  return (
    <UserContext.Provider value={{ user, switchUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
