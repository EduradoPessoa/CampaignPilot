# Design Guidelines: HR Marketing Campaign Management Tool

## Design Approach
**System Selected:** Material Design with Linear-inspired refinement
**Rationale:** This productivity tool requires robust, data-dense interfaces with clear information hierarchy. Material Design provides comprehensive component patterns for dashboards, while Linear's aesthetic brings modern refinement to business applications.

## Core Design Elements

### Typography
- **Primary Font:** Inter (Google Fonts)
- **Mono Font:** JetBrains Mono (for data/metrics)
- **Hierarchy:**
  - H1: 2.5rem / font-semibold (page titles)
  - H2: 2rem / font-semibold (section headers)
  - H3: 1.5rem / font-medium (card/panel headers)
  - Body: 0.9375rem / font-normal (default text)
  - Small: 0.875rem / font-normal (metadata, captions)
  - Tiny: 0.8125rem / font-medium (labels, tags)

### Layout System
**Spacing Primitives:** Tailwind units of 1, 2, 3, 4, 6, 8, 12, 16
- Component padding: p-4 to p-6
- Section spacing: space-y-6 to space-y-8
- Card gaps: gap-4 to gap-6
- Dashboard gutters: gap-6 to gap-8

### Component Library

**Dashboard Layout:**
- Sidebar navigation (fixed, w-64): Campaign list, settings, backup center
- Main content area: 3-column grid on desktop (grid-cols-3), responsive stack on mobile
- Top bar: Breadcrumbs, search, user profile, notification bell

**Campaign Cards:**
- Grid layout: 2-3 columns on desktop (grid-cols-2 lg:grid-cols-3)
- Card structure: Header with title + status badge, metrics row (3-4 key stats), progress bar, action buttons footer
- Hover state: Subtle elevation change (shadow-md to shadow-lg)

**Campaign Detail View:**
- Two-column layout: 2/3 main content (timeline, tasks, files) + 1/3 sidebar (metrics, team, quick actions)
- Tabs for: Overview, Tasks, Analytics, Files, Settings
- Task list: Checkbox + task name + assignee avatar + due date + priority indicator

**Metrics Dashboard:**
- Stats overview: 4-column grid with large numbers, labels, and trend indicators (↑↓)
- Chart section: Full-width area charts/line graphs for campaign performance
- Comparison table: Sortable columns with campaign names, metrics, status

**Backup & Recovery Interface:**
- Timeline view: Vertical list of backup points with timestamp, size, restore button
- Comparison panel: Side-by-side view of current vs. backup data
- Recovery status: Progress indicator during restoration

**Forms:**
- Campaign creation wizard: Multi-step with progress indicator at top
- Input fields: Full-width with floating labels, helper text below
- File upload: Drag-and-drop zone with file list preview
- Action buttons: Primary (filled) + Secondary (outlined) alignment at bottom-right

**Navigation:**
- Top-level tabs for main sections (Campaigns, Analytics, Templates, Backups)
- Sidebar for campaign filtering and quick access
- Breadcrumb navigation for deep hierarchies

**Data Tables:**
- Sticky header row
- Row actions: Hover reveals action icons (edit, duplicate, archive)
- Bulk selection: Checkbox column with batch action toolbar
- Pagination: Bottom-right with rows-per-page selector

**Icons:**
- Library: Heroicons (via CDN)
- Usage: 1rem (h-4 w-4) for inline icons, 1.25rem (h-5 w-5) for buttons, 1.5rem (h-6 w-6) for headers

**Status Indicators:**
- Badges: Rounded-full px-3 py-1 with status text (Active, Draft, Completed, Archived)
- Progress bars: h-2 rounded-full with percentage fill
- Notification dots: Absolute positioned, h-2 w-2 rounded-full

**Interactive Elements:**
- Buttons: px-4 py-2 rounded-md, font-medium
- Button hierarchy: Primary (solid), Secondary (outlined), Tertiary (ghost)
- Input fields: border rounded-md px-3 py-2, focus:ring-2
- Dropdowns: Custom styled with Heroicons chevron

**Modals & Overlays:**
- Modal: Max-w-2xl centered, rounded-lg with backdrop blur
- Confirmation dialogs: Compact with clear yes/no actions
- Toast notifications: Top-right positioned, auto-dismiss

### Responsive Behavior
- Desktop (lg): Full multi-column layouts, sidebar visible
- Tablet (md): 2-column grids, collapsible sidebar
- Mobile: Single column stack, bottom navigation bar, hamburger menu

### Performance Patterns
- Virtual scrolling for large campaign lists
- Lazy load analytics charts
- Optimistic UI updates for task completion
- Skeleton loaders for data-heavy sections

### Accessibility
- ARIA labels on all interactive elements
- Keyboard navigation: Tab through forms, Enter to submit, Escape to close modals
- Focus indicators: ring-2 on all focusable elements
- Screen reader text for icon-only buttons