# Requirements Document

## 1. Application Overview

- **Application Name:** SOCBOX – Intelligent Web Vulnerability Scanner
- **Description:** A premium, dark-mode cybersecurity SaaS web application featuring a public-facing landing page and an internal dashboard. The product combines a hacker/programmer aesthetic with high-end SaaS polish, offering animated terminal UIs, glassmorphism cards, neon glow effects, and a fully responsive layout. The internal dashboard includes fully developed Scan, Reports, and Settings sections.

---

## 2. Users & Use Cases

- **Target Users:** Security professionals, developers, and organizations seeking web vulnerability scanning tools
- **Core Use Cases:**
  - Browsing the landing page to understand product features and initiate a scan
  - Viewing a live scanner terminal simulation
  - Accessing the dashboard to review vulnerability statistics and reports
  - Running a simulated scan from the Scan section
  - Reviewing detailed vulnerability reports in the Reports section
  - Configuring preferences in the Settings section

---

## 3. Page Structure & Core Features

### 3.1 Page Overview

```
SOCBOX
├── Landing Page (Public)
│   ├── Hero Section
│   ├── Features Section
│   ├── Live Scanner Preview Section
│   ├── Dashboard Preview Section
│   └── Call To Action Section
└── Dashboard Page (Internal)
    ├── Sidebar Navigation
    ├── Dashboard Panel
    │   ├── Stats Cards
    │   ├── Vulnerability Table
    │   └── Scan Progress Bar
    ├── Scan Panel
    │   ├── Scan Input Form
    │   ├── Scan Terminal Output
    │   └── Scan Progress Bar
    ├── Reports Panel
    │   ├── Report List / Table
    │   └── Report Detail View
    └── Settings Panel
        ├── Profile Settings
        ├── Scan Preferences
        └── Notification Settings
```

---

### 3.2 Landing Page

#### 3.2.1 Global Style & Theme

- **Color Palette:**
  - Background: #0A0A0A / #050505
  - Primary Accent: Neon Green #00FF9F
  - Secondary Accent: Electric Blue #00CFFF
  - Optional Accent: Purple #7A5FFF
  - Text: Soft white #EAEAEA
  - Borders: subtle glass outlines with low opacity
- **Typography:**
  - Headings: Bold futuristic font (Orbitron or Sora or Inter Tight), large scale, slight letter spacing
  - Body: Clean sans-serif (Inter or Poppins)
- **Global Effects:**
  - Smooth scroll animations throughout
  - Parallax effects on hero and section backgrounds
  - Subtle noise/grain texture overlay on backgrounds
  - Animated gradients on accent elements
  - Hover glow on all interactive buttons and cards
  - Optional: cursor-based radial light effect following mouse position
  - Subtle glitch effect on hero heading (not excessive)

#### 3.2.2 Hero Section

- **Layout:** Fullscreen immersive hero (100vh)
- **Background:** Animated option — one of: animated gradient, subtle moving cyber grid, or floating particles
- **Floating UI Elements:** Decorative floating cards, log snippets, and terminal fragments layered in the background
- **Content:**
  - Main Heading: `Scan. Detect. Secure.`
  - Subheading: `Next-generation intelligent vulnerability scanner`
  - CTA Buttons:
    - Primary: `Start Scan` — neon green glow, hover elevation
    - Secondary: `View Dashboard` — glass outline style, hover glow
- **Animations:**
  - Heading entrance animation (fade + slide up)
  - Blinking cursor after heading text
  - Floating UI elements with subtle parallax drift

#### 3.2.3 Features Section

- **Layout:** Responsive grid (3 columns on desktop, 2 on tablet, 1 on mobile)
- **Cards (6 total):**
  - Each card contains:
    - Cybersecurity-style icon (SVG or icon font)
    - Title (e.g., SQL Injection Detection, XSS Scanner, CSRF Detection, Open Port Analysis, SSL/TLS Audit, Broken Auth Detection)
    - Short description (1–2 sentences)
  - Card style: glassmorphism — semi-transparent background, frosted blur, subtle neon border
  - Hover animation: glow intensifies + card elevates (translateY)

#### 3.2.4 Live Scanner Preview Section

- **Layout:** Centered terminal window UI component
- **Terminal Style:**
  - Background: #000000 or #0D0D0D
  - Text: Neon green (#00FF9F) monospace font
  - Window chrome: macOS-style top bar with three colored dots (red/yellow/green)
- **Content:** Animated typing effect cycling through log lines, for example:
  - `[✓] Initializing scan engine...`
  - `[✓] Scanning target: example.com`
  - `[!] SQL Injection vulnerability found at /login`
  - `[✓] XSS vulnerability detected at /search?q=`
  - `[!] Open redirect found at /redirect`
  - `[✓] Scan complete. 3 vulnerabilities detected.`
- **Animation:** Lines appear one by one with a typewriter effect; blinking cursor at the end of the active line
- **Section Background:** Subtle cyber grid or dark gradient

#### 3.2.5 Dashboard Preview Section

- **Layout:** Centered preview panel with glass card styling
- **Content:**
  - Stats row with 4 glass cards:
    - Total Vulnerabilities
    - High Severity count
    - Medium Severity count
    - Low Severity count
  - Minimal chart or graph (e.g., bar chart or donut chart) showing vulnerability distribution
  - Cards use glassmorphism style with neon glow borders
- **Purpose:** Visual teaser of the dashboard experience, not interactive

#### 3.2.6 Call To Action Section

- **Layout:** Full-width centered section
- **Content:**
  - Bold heading: `Secure Your Web Applications Today`
  - Single CTA button: glowing neon green, large size, hover pulse animation
- **Background:** Animated gradient or subtle particle effect

---

### 3.3 Dashboard Page

#### 3.3.1 Layout

- **Sidebar Navigation (fixed left):**
  - Logo / Brand mark at top
  - Navigation items:
    - Dashboard
    - Scan
    - Reports
    - Settings
  - Active state: neon green highlight with glow
  - Sidebar style: dark glass panel, subtle border
  - Collapsible on mobile (hamburger toggle)

- **Main Content Area (right of sidebar):**
  - Top bar with page title and optional user avatar placeholder
  - Scrollable content region

#### 3.3.2 Dashboard Panel — Stats Cards

- 4 glassmorphism cards in a responsive row:
  - Total Scans
  - Total Vulnerabilities
  - High Severity
  - Resolved Issues
- Each card: icon + label + numeric value + subtle neon glow border
- Hover: glow intensifies

#### 3.3.3 Dashboard Panel — Vulnerability Table

- Modern dark-themed data table
- Columns: #, Target URL, Vulnerability Type, Severity (badge: High / Medium / Low), Status, Date
- Severity badges: color-coded (red = High, orange = Medium, green = Low)
- Row hover: subtle highlight with neon tint
- Pagination or scroll for multiple rows
- Sample static data pre-populated for UI demonstration

#### 3.3.4 Dashboard Panel — Scan Progress Bar

- Displayed when a scan is in progress (simulated state)
- Animated progress bar with neon green fill
- Label showing percentage and current scan step (e.g., `Analyzing headers... 47%`)
- Smooth animation on progress increment

#### 3.3.5 Scan Panel

- **Scan Input Form:**
  - Input field: Target URL (placeholder: `https://example.com`)
  - Scan Type selector: Full Scan / Quick Scan / Custom (segmented control or dropdown, glassmorphism style)
  - Custom scan options (visible when Custom is selected): checkboxes for scan modules — SQL Injection, XSS, CSRF, Open Ports, SSL/TLS Audit, Broken Auth
  - Primary action button: `Start Scan` — neon green glow, full-width or prominent placement
  - Input validation: URL field must not be empty before scan can be initiated; display inline error message with neon red tint if empty

- **Scan Terminal Output:**
  - Terminal window component (same style as landing page terminal: dark background, neon green monospace text, macOS-style chrome)
  - Appears below the form once scan is initiated
  - Displays animated typewriter log lines simulating scan progress, for example:
    - `[✓] Initializing scan engine...`
    - `[✓] Resolving target: <entered URL>`
    - `[!] SQL Injection vulnerability found at /login`
    - `[✓] XSS vulnerability detected at /search?q=`
    - `[!] Open redirect found at /redirect`
    - `[✓] Scan complete. 3 vulnerabilities detected.`
  - Blinking cursor at the end of the active line
  - Terminal is scrollable if log lines exceed visible height

- **Scan Progress Bar:**
  - Animated neon green progress bar displayed during simulated scan
  - Shows percentage and current step label (e.g., `Checking SSL/TLS... 62%`)
  - On reaching 100%: display completion state — `Scan Complete — X vulnerabilities found` with neon green confirmation styling
  - Progress bar and terminal output are hidden before scan is started

#### 3.3.6 Reports Panel

- **Report List / Table:**
  - Dark-themed table listing all past scan reports (static/mock data)
  - Columns: #, Target URL, Scan Date, Total Vulnerabilities, High / Medium / Low counts, Status (Completed / In Progress), Action
  - Action column: `View` button (glass outline style, neon glow on hover) to open the report detail view
  - Severity counts displayed as color-coded badges (red = High, orange = Medium, green = Low)
  - Row hover: subtle neon tint highlight
  - Pagination or scroll for multiple rows
  - Filter bar above the table: filter by severity (All / High / Medium / Low) and by date range (date picker, glassmorphism style)

- **Report Detail View:**
  - Opens as an expanded panel or modal overlay (glassmorphism card, dark background)
  - Header: Target URL, Scan Date, Overall Status
  - Summary stats row: Total / High / Medium / Low vulnerability counts (glass cards)
  - Vulnerability detail table:
    - Columns: #, Vulnerability Type, Affected Endpoint, Severity (badge), Description, Recommendation
    - Rows use static/mock data consistent with the report list
    - Severity badges color-coded
    - Row hover: neon tint highlight
  - Close / Back button to return to the report list
  - Export button: `Export PDF` — glass outline style, neon glow on hover (UI only, no actual file generation required in this scope)

#### 3.3.7 Settings Panel

- **Layout:** Vertically stacked settings sections within the main content area, glassmorphism card containers per section

- **Profile Settings:**
  - Avatar placeholder (circular, with neon glow border) and `Change Avatar` label (non-functional UI element)
  - Input fields: Display Name, Email Address (pre-filled with mock data)
  - Save button: `Save Changes` — neon green glow style

- **Scan Preferences:**
  - Default Scan Type: segmented control or dropdown (Full Scan / Quick Scan / Custom)
  - Scan Modules toggles: individual on/off toggle switches (neon green active state) for each module — SQL Injection, XSS, CSRF, Open Ports, SSL/TLS Audit, Broken Auth
  - Scan Timeout: numeric input field with label (e.g., `Timeout (seconds)`, default value 30)
  - Save button: `Save Preferences` — neon green glow style

- **Notification Settings:**
  - Toggle switches for notification types:
    - Email notifications on scan completion
    - In-app alerts for High severity findings
    - Weekly summary report
  - Each toggle: label + neon green active state toggle switch
  - Save button: `Save Notifications` — neon green glow style

- All input fields and toggles use glassmorphism styling consistent with the rest of the dashboard
- Settings changes are UI-only; no backend persistence is required in this scope

---

## 4. Business Rules & Logic

- The landing page CTA button `View Dashboard` navigates to the Dashboard Page
- The landing page CTA button `Start Scan` navigates to the Dashboard Page with the Scan panel active
- Navigation between dashboard sections (Dashboard, Scan, Reports, Settings) renders the corresponding content panel; only one panel is active at a time
- The Scan panel simulates a scan flow: form submission triggers the terminal output and progress bar animation using a predefined mock sequence; no real backend scan execution is required
- Scan progress bar on the Scan panel animates from 0% to 100% over a fixed simulated duration upon scan initiation
- On scan completion (100%), the progress bar displays the completion state and the terminal shows the final summary line
- All data in the vulnerability table, stats cards, and reports list is static/mock data
- Report detail view opens from the Reports panel via the `View` action button
- Settings panel saves are UI-only interactions; no data persistence is required
- Sidebar active state updates to reflect the currently selected panel

---

## 5. Exceptions & Edge Cases

| Scenario | Handling |
|---|---|
| Mobile viewport — sidebar navigation | Sidebar collapses; hamburger icon toggles a slide-in drawer |
| Terminal animation completes all lines (landing page) | Loop restarts from the first line with a brief pause |
| Scan terminal completes all lines (Scan panel) | Terminal remains at final state showing completion summary; no loop |
| Scan progress bar reaches 100% | Display completion state: `Scan Complete — 3 vulnerabilities found` |
| Scan initiated with empty URL field | Inline validation error displayed; scan does not start |
| Report detail view opened | Overlay or expanded panel renders above the report list; background content is dimmed |
| Reduced motion preference (prefers-reduced-motion) | Disable or minimize animations; static fallback for all animated elements |

---

## 6. Acceptance Criteria

- Landing page renders all 5 sections in correct order with no layout breaks on desktop, tablet, and mobile
- Hero section displays animated background, heading, subheading, and both CTA buttons
- Features section displays 6 cards in a responsive grid with hover glow and elevation effects
- Terminal preview section displays typewriter animation cycling through log lines with blinking cursor
- Dashboard preview section displays 4 stats cards and a chart with glassmorphism styling
- CTA section displays bold heading and glowing button
- Dashboard page renders sidebar, and all four panels: Dashboard, Scan, Reports, Settings
- Dashboard panel renders stats cards, vulnerability table, and scan progress bar correctly
- Scan panel renders input form, scan type selector, custom module checkboxes (visible on Custom selection), Start Scan button, terminal output, and progress bar
- Scan panel: clicking Start Scan with a valid URL triggers terminal animation and progress bar; empty URL shows inline validation error
- Scan progress bar animates to 100% and displays completion state
- Reports panel renders report list table with filter bar, color-coded severity badges, and View action buttons
- Report detail view opens on clicking View, displays summary stats, vulnerability detail table, and close/export buttons
- Settings panel renders Profile, Scan Preferences, and Notification sections with correct input fields, toggles, and save buttons
- Sidebar collapses correctly on mobile with a functional toggle
- All neon glow, glassmorphism, and hover effects render correctly in dark mode
- Color palette strictly follows the specified hex values
- Typography uses futuristic heading font and clean body font with appropriate letter spacing
- Smooth scroll and entrance animations trigger correctly on section entry
- No layout overflow or broken elements at 375px, 768px, and 1440px viewport widths

---

## 7. Out of Scope (This Release)

- Real backend vulnerability scanning engine or API integration
- User authentication, login, or account management
- Actual data persistence or database connectivity
- Actual PDF export file generation (Export PDF button is UI only)
- Cursor-based light effect (listed as optional; deferred)
- Multi-language or internationalization support