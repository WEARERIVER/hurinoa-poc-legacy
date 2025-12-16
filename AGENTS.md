# CATALYST — AI Starter Kit

This file gives AI assistants (Claude, Cursor, Copilot) context about this project.

---

## Project Overview

**CATALYST** is an AI Starter Kit for building admin dashboards, internal tools, and data management apps.

**Tech:** Next.js 14 + Ant Design 5 + TypeScript

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14.x | React framework with App Router |
| React | 18.x | UI library |
| Ant Design | 5.x | Enterprise UI components |
| TypeScript | 5.x | Type safety |

---

## Project Structure

```
app/                    # Next.js App Router pages
├── layout.tsx          # Root layout (wraps all pages with AppShell)
├── globals.css         # Minimal CSS reset
├── dashboard/          # Dashboard with stats cards
├── demo/               # Component showcase (6 tabs)
└── docs/               # Documentation (6 tabs)

components/             # Reusable components
├── AppShell.tsx        # Main layout: sidebar + header + content
├── PageHeader.tsx      # Page header with breadcrumbs, title, actions
└── index.ts            # Barrel exports

lib/                    # Utilities and configuration
└── navigation.ts       # Centralized navigation items

theme/                  # Design system
├── tokens.ts           # Design tokens (colours, typography, spacing, layout)
└── index.ts            # Barrel exports
```

---

## Key Files Reference

### Design Tokens (`theme/tokens.ts`)

All styling values are centralized here. **Always use tokens, never magic values.**

```tsx
import { primary, secondary, neutral, semantic, fontSize, layout, borderRadius } from '@/theme'

// Colours
primary[500]      // #407EFE - primary brand blue
secondary[500]    // #04B09E - secondary teal/green
neutral[700]      // #4A5568 - body text
semantic.success  // #04B09E
semantic.error    // #E54545

// Typography
fontSize.base     // '15px' - body text
fontSize.sm       // '13px' - secondary text
fontSize.lg       // '17px' - emphasis

// Layout
layout.pagePadding        // 24 - page content padding
layout.sectionGap         // 24 - gap between sections
layout.cardGap            // 16 - gap between cards
layout.headerHeight       // 64 - header height
layout.sidebarWidth       // 220 - sidebar width
layout.sidebarCollapsedWidth // 64 - collapsed sidebar

// Shapes
borderRadius.sm   // 4
borderRadius.md   // 6
borderRadius.lg   // 8
```

### Navigation (`lib/navigation.ts`)

To add a new page:
1. Create folder in `app/` with `page.tsx`
2. Add entry to `navigation` array in `lib/navigation.ts`

```tsx
// Navigation item structure
{
  key: 'unique-key',
  label: 'Page Name',
  description: 'Short description for the page',
  icon: IconComponent,  // From @ant-design/icons
  path: '/page-path',
}
```

### AppShell (`components/AppShell.tsx`)

The main layout wrapper. All pages are rendered inside this shell.

- Collapsible sidebar (220px / 64px)
- Fixed header (64px) with search and user menu
- Content area with scrolling

### PageHeader (`components/PageHeader.tsx`)

Standard page header component. Use on every page for consistency.

```tsx
<PageHeader 
  title="Page Title"
  description="Optional description"
  breadcrumbs={[{ label: 'Parent', href: '/parent' }, { label: 'Current' }]}
  actions={<Button type="primary">Action</Button>}
/>
```

---

## Coding Conventions

### 1. Use Design Tokens

```tsx
// ✅ CORRECT - use tokens
import { layout, neutral, fontSize } from '@/theme'
<div style={{ padding: layout.pagePadding, color: neutral[700] }}>

// ❌ WRONG - magic values
<div style={{ padding: 24, color: '#4A5568' }}>
```

### 2. Component Imports

```tsx
// Import from barrel exports
import { PageHeader } from '@/components'
import { primary, layout } from '@/theme'
import { getNavItem } from '@/lib/navigation'
```

### 3. Page Structure

Every page should follow this pattern:

```tsx
'use client'

import { PageHeader } from '@/components'
import { getNavItem } from '@/lib/navigation'

const navItem = getNavItem('page-key')!

export default function PageName() {
  return (
    <>
      <PageHeader 
        title={navItem.label}
        description={navItem.description}
        breadcrumbs={[{ label: navItem.label }]}
      />
      
      {/* Page content */}
    </>
  )
}
```

### 4. Ant Design Usage

- Use Ant Design components for all UI
- Configure via `ConfigProvider` in layout (already set up)
- Prefer Ant's spacing/layout components (`Space`, `Row`, `Col`, `Divider`)

### 5. TypeScript

- Strict mode enabled
- Define interfaces for props and data
- Use type inference where clear

---

## Common Patterns

### Data Table with Actions

See `app/demo/page.tsx` → CRUD tab for complete implementation:
- Table with sorting, filtering
- Inline detail view
- Create/Edit modals
- Search and filter bar

### Form Patterns

See `app/demo/page.tsx` → Forms tab:
- Basic form with validation
- Various input types
- Form layout options

### Card Layouts

```tsx
<Row gutter={[layout.cardGap, layout.cardGap]}>
  <Col xs={24} md={12} lg={8}>
    <Card>Content</Card>
  </Col>
</Row>
```

### Section Component

Reusable card section pattern:

```tsx
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card style={{ marginBottom: layout.cardGap }}>
      <Title level={4} style={{ marginBottom: layout.cardGap }}>{title}</Title>
      {children}
    </Card>
  )
}
```

---

## What NOT to Do

1. **Don't use inline colours** — always use tokens from `@/theme`
2. **Don't add new dependencies** without explicit request
3. **Don't modify the AppShell** unless specifically asked
4. **Don't create new CSS files** — use inline styles with tokens
5. **Don't use `px` values directly** — use layout tokens

---

## Quick Reference

| Task | Location |
|------|----------|
| Add a page | Create in `app/`, add to `lib/navigation.ts` |
| Change colours | `theme/tokens.ts` |
| Modify layout | `components/AppShell.tsx` |
| See component examples | `/demo` route |
| Read documentation | `/docs` route |

---

## Getting Help

- **Demo page** (`/demo`) — Live examples of all patterns
- **Docs page** (`/docs`) — Architecture and conventions
- **PROMPTS.md** — Ready-to-use prompts for common tasks
