# CATALYST

**The AI Starter Kit for Rapid Development by RIVER Group**

A ready-to-use foundation for building admin dashboards, internal tools, and data management apps — designed for AI-assisted development.

---

## Quick Start

```bash
# Install and run
npm install && npm run dev

# Open http://localhost:3000
```

Then open your AI assistant (Claude, Cursor, Copilot) and start with:

```
Read AGENTS.md, then create a new page called "Customers" with a data table.
```

That's it. You're building.

---

## How It Works

1. **Start with this kit** — Layout, components, and patterns ready to go
2. **Build with AI** — Use prompts to add features fast
3. **Hand off to dev team** — Clean code ready for production hardening

---

## What's Included

### Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Framework | Next.js 14 | React framework with App Router |
| UI Library | Ant Design 5 | Enterprise-grade components |
| Language | TypeScript | Type safety throughout |
| Styling | Design Tokens | Centralized colours, typography, spacing |

### Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with AppShell
│   ├── globals.css         # Minimal CSS reset
│   ├── dashboard/          # Dashboard page with stats cards
│   ├── demo/               # Component & pattern showcase (6 tabs)
│   └── docs/               # Documentation pages (6 tabs)
│
├── components/
│   ├── AppShell.tsx        # Sidebar + header layout
│   ├── PageHeader.tsx      # Breadcrumbs + title + actions
│   └── index.ts            # Component exports
│
├── lib/
│   └── navigation.ts       # Centralized navigation config
│
├── theme/
│   ├── tokens.ts           # Design tokens (colours, spacing, etc.)
│   └── index.ts            # Theme exports
│
├── AGENTS.md               # AI context file (for Claude, Cursor, etc.)
├── PROMPTS.md              # Starter prompts for common tasks
└── README.md               # This file
```

### Key Features

- **App Shell** — Collapsible sidebar, header with search, user menu
- **Design Tokens** — Single source of truth for all styling values
- **Demo Page** — 6 tabs: Design, Colours, Typography, Components, Forms, CRUD
- **Docs Page** — 6 tabs: Overview, Architecture, Getting Started, AI Workflow, Prompts, Conventions
- **CRUD Patterns** — Complete list/view/create/edit/delete implementation
- **AI-Ready** — AGENTS.md gives AI tools immediate context

---

## For Entrepreneurs

### Getting Started with AI

1. Open this project in VS Code or Cursor
2. Start a chat with your AI assistant
3. Reference `AGENTS.md` for context: *"Read AGENTS.md and help me add a new feature"*
4. Use prompts from `PROMPTS.md` or the Docs → Prompts tab

### Example First Prompts

```
"Read AGENTS.md, then create a new page called 'Customers' with a data table"

"Add a form to the dashboard for creating a new project"

"Create a CRUD module for managing products with name, price, and category fields"
```

### What You Can Build

- Admin dashboards
- Internal tools
- Customer portals
- Data management apps
- Workflow applications

---

## For Developers

### Key Files to Know

| File | Purpose |
|------|---------|
| `theme/tokens.ts` | All design tokens — start here for styling |
| `lib/navigation.ts` | Add new pages here |
| `components/AppShell.tsx` | Modify layout structure |
| `app/demo/page.tsx` | Reference patterns for components |

### Adding a New Page

1. Create folder in `app/` (e.g., `app/customers/`)
2. Add `page.tsx` with your content
3. Add navigation entry in `lib/navigation.ts`
4. Use `PageHeader` component for consistent headers

### Design Token Usage

```tsx
import { primary, neutral, layout, fontSize } from '@/theme'

// Use tokens, not magic values
<div style={{ 
  padding: layout.pagePadding,
  color: neutral[700],
  fontSize: fontSize.base 
}}>
```

---

## Documentation

| Resource | Location |
|----------|----------|
| In-app docs | `/docs` route (6 tabs of documentation) |
| Component demos | `/demo` route (all patterns with code) |
| AI context | `AGENTS.md` (root directory) |
| Starter prompts | `PROMPTS.md` or Docs → Prompts tab |

---

## What This Is / Is Not

**This IS:**
- A foundation for rapid prototyping
- A reference implementation of patterns
- A starting point for AI-assisted development

**This is NOT:**
- A production-ready application
- A component library (it uses Ant Design)
- A substitute for your architectural decisions

---

## Workflow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Design Starter │ ──▶ │   AI-Assisted   │ ──▶ │   Production    │
│   (You're here) │     │   Prototyping   │     │   Hardening     │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       │                       │
   Foundations            Build features          Dev team refines
   Patterns               Iterate fast            Security, scale
   Conventions            Get feedback            Production deploy
```

---

RIVER Group — CATALYST v1.0
