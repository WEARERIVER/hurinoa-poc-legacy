'use client'

import { AppShell } from '@/components'

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AppShell>{children}</AppShell>
}
