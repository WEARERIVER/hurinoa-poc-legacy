'use client'

import { AppShell } from '@/components'

export default function DsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AppShell>{children}</AppShell>
}
