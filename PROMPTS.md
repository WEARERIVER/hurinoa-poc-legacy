# Huri Noa POC 1 Prompts

Copy-paste prompts for AI-assisted development. Replace `[PLACEHOLDERS]` with your specifics.

---

## 🚀 Getting Started

### First Prompt

```
Read AGENTS.md, then create a new page called "[PAGE NAME]" with a data table.
```

### Explore the Codebase

```
Read AGENTS.md, then explore app/demo/page.tsx to understand the component patterns.
```

---

## 📄 Adding New Pages

### Simple Page

```
Read AGENTS.md, then create a new page called "[PAGE NAME]" with:
- A PageHeader with appropriate title and description
- A brief placeholder content section
- Add it to the navigation in lib/navigation.ts
```

### Page with Data Table

```
Read AGENTS.md, then create a new page called "[PAGE NAME]" that displays a table of [ITEMS].

Each [ITEM] should have these fields:
- [Field 1]: [type]
- [Field 2]: [type]
- [Field 3]: [type]

Include:
- Mock data (5-10 items)
- Table with sortable columns
- Status column with coloured tags
- Actions column with Edit and Delete buttons
- Add to navigation
```

### Page with Stats Dashboard

```
Read AGENTS.md, then create a dashboard page called "[PAGE NAME]" with:
- 4 stat cards across the top (use Ant Design Statistic component)
- A main content area with a placeholder chart area
- A sidebar card with recent activity or quick actions
- Use the layout patterns from the existing dashboard
- Add to navigation
```

---

## 📝 CRUD Operations

### Full CRUD Module

```
Read AGENTS.md and look at the CRUD tab in app/demo/page.tsx for patterns.

Create a complete CRUD module for managing [ENTITY NAME] with these fields:
- [Field 1]: [type, required/optional]
- [Field 2]: [type, required/optional]
- [Field 3]: [type, required/optional]

Include:
1. Data table with search and filters
2. Inline detail view (click row to expand)
3. Create modal with form validation
4. Edit modal (pre-populated)
5. Delete confirmation
6. Mock data (5-10 records)

Put this in a new page at app/[entity-name]/page.tsx and add to navigation.
```

### Add Search and Filters

```
Read AGENTS.md, then add search and filter functionality to the [PAGE NAME] table:
- Text search across [field1, field2]
- Dropdown filter for [field] with options: [option1, option2, option3]
- "Clear filters" button
- Show result count
```

### Add Create/Edit Modal

```
Read AGENTS.md, then add a Create [ENTITY] modal to the [PAGE NAME] page:
- Form fields: [list fields with types]
- Validation: [list required fields]
- Success message on save
- Close modal and refresh list after save
```

---

## 🎨 UI Components

### Card Grid Layout

```
Read AGENTS.md, then create a card grid layout on [PAGE NAME] showing [ITEMS]:
- 3 cards per row on desktop, 2 on tablet, 1 on mobile
- Each card shows: [field1, field2, field3]
- Use consistent spacing with layout tokens
- Include a header with title and "Add New" button
```

### Tabbed Interface

```
Read AGENTS.md, then add a tabbed interface to [PAGE NAME] with these tabs:
- [Tab 1]: [description of content]
- [Tab 2]: [description of content]
- [Tab 3]: [description of content]

Use Ant Design Tabs component with icons.
```

### Form with Multiple Sections

```
Read AGENTS.md, then create a form on [PAGE NAME] with these sections:

Section 1: [Section Name]
- [Field]: [type]
- [Field]: [type]

Section 2: [Section Name]
- [Field]: [type]
- [Field]: [type]

Include:
- Form validation for required fields
- Cancel and Submit buttons
- Success message on submit
```

---

## 🔧 Modifications

### Change Colour Scheme

```
Read AGENTS.md, then update the primary colour scheme in theme/tokens.ts:
- New primary colour: [hex code]
- Generate a proper colour scale (50-900)
- Update the Ant Design theme config to use the new primary
```

### Add Sidebar Section

```
Read AGENTS.md, then add a new section to the sidebar in AppShell.tsx:
- Section divider with label "[SECTION NAME]"
- New navigation items: [item1, item2]
- Place it below the main navigation
```

### Customize PageHeader

```
Read AGENTS.md, then modify the PageHeader on [PAGE NAME] to include:
- [Additional element, e.g., status badge, date range picker]
- Keep consistent with the existing PageHeader pattern
```

---

## 📊 Data & API

### Add Mock API Delay

```
Read AGENTS.md, then add simulated loading states to [PAGE NAME]:
- Show Ant Design Skeleton while loading
- Add 500ms artificial delay to simulate API call
- Handle loading state in the table/list
```

### Prepare for Real API

```
Read AGENTS.md, then refactor [PAGE NAME] to prepare for a real API:
- Extract data fetching to a separate function
- Add TypeScript interface for the data shape
- Add loading and error states
- Keep mock data as fallback
- Add TODO comments where real API calls should go
```

---

## 🧹 Cleanup & Polish

### Add Form Validation

```
Read AGENTS.md, then add proper validation to the form on [PAGE NAME]:
- Required field validation with error messages
- Email format validation for email fields
- Minimum/maximum length for text fields
- Show inline error messages
```

### Improve Mobile Layout

```
Read AGENTS.md, then improve the mobile responsiveness of [PAGE NAME]:
- Stack cards vertically on mobile
- Make table horizontally scrollable
- Adjust spacing for smaller screens
- Test at 375px width
```

### Add Empty States

```
Read AGENTS.md, then add empty state handling to [PAGE NAME]:
- Show friendly message when no data
- Include an icon and call-to-action button
- Use Ant Design Empty component
```

---

## 💡 Tips for Better Prompts

1. **Always start with**: "Read AGENTS.md" — this gives the AI context
2. **Be specific about fields**: List exact field names and types
3. **Reference existing patterns**: Point to demo page examples
4. **One feature at a time**: Smaller prompts = better results
5. **Include validation rules**: Specify required fields, formats

---

## Example Workflow

### Building a Customer Management Feature

**Step 1: Create the page**
```
Read AGENTS.md, then create a new page called "Customers" with a data table. Fields: name (string), email (string), status (active/inactive), created (date). Add 8 mock customers and add to navigation.
```

**Step 2: Add detail view**
```
Add an inline detail view to the Customers table. When clicking a row, show a panel on the right with all customer details and an Edit button.
```

**Step 3: Add create form**
```
Add a "New Customer" button and modal form to the Customers page. Include validation for required fields (name, email). Show success message on save.
```

**Step 4: Add filters**
```
Add a search box and status filter dropdown above the Customers table. Search should filter by name or email. Include a clear filters button.
```

---

*These prompts work best with Claude, Cursor, or GitHub Copilot in VS Code.*
