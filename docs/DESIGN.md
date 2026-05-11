# Collective — Design System & Screen Specs

> Source of truth for UI/UX decisions. Pasted into Stitch for design generation. Referenced by Claude Code when implementing screens. Edit this file when decisions change — don't re-explain in chat.

---

## 1. Product Context

**Product:** Mobile app for Collective Waste Solutions (Alberta, Canada) — a waste management company operating since 2006.

**Phase 1 scope:** Customer can book a time slot to dump a load at the Calgary transfer station. Staff (yard attendant) can see and manage the queue.

**Future scope (don't design for it yet, but don't block it):** Bin rental, portable toilet rental, quote requests, waste reports, recurring commercial pickups.

**Architecture decision:** One app, role-based. Customer and staff use the same app. Login determines what they see.

**Open ops questions** (waiting on Mudassir / yard team):
- Real cycle time per load size (gate → scale → bay → scale → exit)
- Bay-to-waste-stream mapping
- How walk-ins are handled
- Whether on-site scale exists

Designs assume: 3 bays, waste-type-first booking, resource-bound slot durations. **Revisit after ops answers.**

---

## 2. Design Philosophy

**Modern, but not "AI-generated modern."**

What we want:
- Brand-forward landing/welcome screens with strong color presence (Instacart-style)
- Calm, single-purpose functional screens (Linear / Things 3 calm)
- One bold choice per screen — not crowded forms
- Typography does the heavy lifting, not decoration
- Bottom-anchored CTAs (thumb-friendly)
- Tabbed inputs over multi-screen flows where it makes sense

What we don't want:
- Glassmorphism / frosted blur
- Purple-pink gradients
- 3D blobs, floating shapes
- Stock illustrations of people holding phones
- Confetti or "Success!" animations
- Generic "fintech 2023" aesthetic

**Mental references:**
- Instacart (welcome screen with brand color + store grid)
- Linear (information density, restraint)
- Things 3 (calm, generous spacing)
- Stripe Dashboard (form inputs, table layouts)
- Apple Wallet (dark hero blocks, cards)

---

## 3. Brand & Color System

### Logo
- Mark: geometric "C" — teal lines wrapping an orange center square
- Wordmark: "COLLECTIVE" in bold geometric sans, slight letter-spacing

### Core palette (light mode)

| Token | Hex | Usage |
|-------|-----|-------|
| `--brand-teal` | `#3BB5C2` | Primary brand color, secondary CTAs, active tabs, selected chips |
| `--brand-teal-deep` | `#0E5A7B` | Headings, hero backgrounds, body emphasis |
| `--brand-orange` | `#E8782E` | Primary CTAs ONLY (one per screen), key accents |
| `--bg-app` | `#F7F8FA` | App background |
| `--bg-card` | `#FFFFFF` | Card / surface |
| `--text-primary` | `#0E1626` | Body text |
| `--text-secondary` | `#5C6573` | Muted / helper text |
| `--text-tertiary` | `#9098A3` | Placeholder, disabled labels |
| `--border` | `#E5E8EC` | 1px borders on cards, inputs |
| `--success` | `#1F9D55` | Success states (rare) |
| `--warning` | `#D97706` | Warnings (rare) |
| `--danger` | `#DC2626` | Destructive, no-show |

### Core palette (dark mode)

| Token | Hex | Usage |
|-------|-----|-------|
| `--brand-teal` | `#4DC8D6` | Slightly brighter on dark |
| `--brand-teal-deep` | `#0E5A7B` | Hero backgrounds (darker context, used as accent surface) |
| `--brand-orange` | `#F08A47` | Slightly warmer for dark backgrounds |
| `--bg-app` | `#0B1220` | App background |
| `--bg-card` | `#131A2A` | Card surface |
| `--text-primary` | `#F5F7FA` | Body text |
| `--text-secondary` | `#9CA3AF` | Muted |
| `--text-tertiary` | `#6B7280` | Tertiary |
| `--border` | `#1F2937` | Subtle borders |

### Brand-color "wash" surfaces (for landing/welcome screens)

These are the Instacart-style full-bleed brand backgrounds. Used sparingly — landing, splash, marketing moments only.

- **Teal wash:** `#0E5A7B` background with white type and small orange highlight square in the logo. Use for welcome/landing.
- **Dark wash:** `#0B1220` background with teal accents. Use for splash, optional dark welcome variant.

### Color usage rules
- **Orange is rare.** One primary CTA per screen, max. Never two orange buttons visible at once.
- **Teal is the workhorse.** Active states, links, selected chips, brand moments.
- **Deep teal/blue is for hierarchy.** Headlines, hero backgrounds, dark surfaces.
- **Status colors must also have icons.** Yard attendant may be in sun/glare — never rely on color alone.

---

## 4. Typography

### Fonts
- **Display / Headlines:** Space Grotesk (bold, tight letter-spacing for large sizes)
- **UI / Body:** Inter (regular, medium, semibold)
- **Numerals:** Always tabular/monospaced figures for times, counts, money, plate numbers, dates

### Type scale

| Token | Size | Weight | Usage |
|-------|------|--------|-------|
| `display-xl` | 40px / 44 line | 700 | Welcome/landing hero only |
| `display-lg` | 32px / 38 line | 700 | Page headlines (sign in, sign up) |
| `display-md` | 24px / 30 line | 700 | Section headlines |
| `body-lg` | 17px / 24 line | 500 | Primary body, button labels |
| `body-md` | 15px / 22 line | 400 | Default body |
| `body-sm` | 13px / 18 line | 400 | Helper text, captions |
| `label` | 12px / 16 line | 600 | Uppercase section labels, tracking +0.5 |
| `mono-lg` | 22px / 28 line | 600 | Time displays, large numerals |
| `mono-md` | 15px / 20 line | 500 | Inline times, counts |

### Rules
- Headlines use **tight letter-spacing** (`-0.01em` to `-0.02em` at large sizes)
- Never use loose / spacious tracking on display type
- Tabular numerals everywhere a number represents a quantity

---

## 5. Spacing, Radius, Shadows

### Spacing scale (8px base)
- `xs` 4 / `sm` 8 / `md` 16 / `lg` 24 / `xl` 32 / `2xl` 48 / `3xl` 64

### Radius
- `radius-sm` 6px — small chips, status pills
- `radius-md` 10px — cards, inputs, secondary buttons
- `radius-lg` 14px — large cards, hero blocks
- `radius-pill` 999px — primary CTAs (rounded pill, Instacart-style), large action buttons
- `radius-full` 50% — avatars only

### Shadows
- **Default cards:** No shadow. 1px border in `--border` instead.
- **Elevated cards (rare):** `0 1px 2px rgba(15, 23, 42, 0.04)` — barely visible.
- **Floating action button:** `0 4px 12px rgba(15, 23, 42, 0.08)`
- **Never use heavy drop shadows or 3D effects.**

---

## 6. Component Patterns

### Buttons

| Variant | Treatment | Use |
|---------|-----------|-----|
| Primary | Orange `#E8782E` fill, white text, `radius-pill`, full width on mobile, height 56px | The single primary action on the screen |
| Secondary | White fill, 1px deep-blue border, deep-blue text, `radius-pill`, height 56px | Alternative action |
| Tertiary | Transparent, teal text, no border | Inline links |
| Social (Apple/Google/Facebook) | White fill, 1px border, brand logo on left, dark text, `radius-pill`, height 56px | OAuth |
| Disabled | Reduced opacity (~50%), no color shift to gray | Disabled primary |

### Inputs
- 1px border `--border`, `radius-md`, height 56px
- Label sits **above** the field (not floating placeholder)
- Placeholder in `--text-tertiary`
- Focus state: border becomes `--brand-teal`, no glow
- Helper text below in `body-sm`, `--text-secondary`
- Error state: border `--danger`, error text below in `--danger`

### Tabs (segmented input switcher)
- Used for Email/Phone, Personal/Business, Today/Tomorrow
- Underline-style for input switching (active tab has 2px deep-teal underline)
- Pill-style for filters (active pill has teal fill, white text)

### Chips
- `radius-pill`, height 36px, padding `12px 16px`
- Unselected: white fill, 1px border, dark text
- Selected: teal fill, white text, no border

### Status pills
- Small, `radius-sm`, height 24px
- Always pair color + icon (sun/glare readability)
- Variants: Scheduled (gray), Arrived (teal), Unloading (orange + spinner icon), Done (muted), No-show (red dashed border + X icon)

### Cards
- White fill on `--bg-app`
- 1px `--border`, `radius-md`
- Padding `lg` (24px) for content cards
- No shadow by default

---

## 7. Screen-Level Patterns

### Welcome/landing (Instacart-pattern)
- Full-bleed brand-color background (teal-deep or dark wash)
- Logo + wordmark high in viewport
- Bold short headline (3–4 words max: "Skip the line.")
- Visual element: stylized illustration spot OR a horizontally scrolling row of service tiles (mimicking Instacart's store grid)
- **Floating white card anchored to bottom** with stacked CTAs (Sign up / Log in)
- White card has `radius-lg` top corners only (or all corners with bottom margin)

### Auth screens (sign in / sign up / forgot password)
- White or light app background
- Compact header: back arrow only, no title text
- Generous top spacing before headline
- Headline + subhead pair
- **Tabbed input** at the top when multiple methods (Email / Phone Number tabs)
- Single input field below the tabs (changes based on tab)
- Helper text below input ("We'll text you a verification code.")
- Primary CTA below helper text — `radius-pill`, full width, orange
- "or" divider
- Stacked social auth buttons
- Footer link at the bottom: "Already have an account? Log in"

### Functional screens (booking, list, detail)
- Calm, white/light background
- Compact header with title or back arrow
- Sectioned content with small uppercase labels
- Bottom sticky action bar with summary + primary CTA where relevant
- Information density tuned per screen (low for booking, high for staff dashboard)

---

## 8. Screen Specs

### 8.1 Splash

**Purpose:** Shown for ~1 second on app launch while auth state is checked.

**Layout:**
- Full-bleed background (light: `--bg-app`, dark: `--bg-app`)
- Centered logo mark sized 88×88 at 40% from top (above optical center)
- Wordmark "COLLECTIVE" below mark in `display-md`
- Tagline "Waste services for Alberta." in `body-md`, `--text-secondary`
- Three-dot loading indicator at bottom safe area, `--brand-teal`

**No** progress bars, percentages, animations beyond the dot pulse.

---

### 8.2 Welcome (first launch / logged out)

**Purpose:** Brand moment + sell the value + route to sign in or sign up. Instacart-style.

**Layout (top to bottom):**
1. **Top 70% — full-bleed brand wash** (`--brand-teal-deep` background):
   - Status bar area: `Personal` / `Business` segmented pill at top center, white text on selected, transparent on unselected. (Sets account type before sign-up — like Instacart.)
   - Logo mark + wordmark, centered, ~25% from top
   - Headline: **"Skip the line."** in `display-xl`, white, tight tracking
   - Subhead: "Book a time to drop off your load." in `body-lg`, white at 80% opacity
   - Below the headline, a **horizontally scrolling row of 6–8 service tiles** with white card backgrounds, each ~120×120, showing service icons + labels: "Dump slot", "Bin rental", "Toilets", "Quote", "Reports", "Pickup", "Recycling", "Compost". Tiles for not-yet-live services have a subtle "Coming soon" pill. This row mirrors Instacart's store grid and signals breadth without committing to it.
2. **Bottom 30% — floating white card** (anchored to bottom, `radius-lg` top corners only, full width):
   - Small heading: "Get started with Collective" in `display-md`, dark text
   - Primary CTA: "Sign up" — orange pill, full width, height 56px
   - Secondary CTA: "Log in" — light gray fill (`#F0F2F5`), dark text, pill, height 56px
   - Tiny legal text below: "By continuing, you agree to our Terms of Service and Privacy Policy" with links

**Dark mode variant:** Background switches to `#0B1220`, white card stays white (or becomes `--bg-card` `#131A2A` with light text).

---

### 8.3 Sign Up (with tabbed Email / Phone)

**Purpose:** Account creation. Tabbed input picker keeps it to one screen.

**Layout:**
1. Compact header: back arrow top-left, title "Sign up" in `display-md`, deep blue.
2. **Tab switcher:** `Email` | `Phone number` — underline style, Phone number active by default (faster auth in Canada).
3. **Phone number tab content:**
   - Input row with country code dropdown ("+1" with chevron) + phone number field, joined as one logical input
   - Helper text below: "We'll send a text with a verification code. Message and data rates may apply. By continuing, you agree to our Terms of Service and Privacy Policy."
4. **Email tab content:**
   - Single email input
   - Helper text: "By continuing, you agree to our Terms of Service and Privacy Policy."
5. Primary CTA: "Continue" — orange pill, full width.
6. "or" divider.
7. Stacked social auth: Continue with Google, Continue with Apple. (Skip Facebook — not relevant for this audience and adds clutter.)
8. Footer: "Already have an account? **Log in**" centered at bottom.

**Critical UX notes:**
- Personal/Business segment from Welcome screen carries forward — don't ask again here.
- Continue button is enabled only when input is valid (orange stays orange, no gray).
- After Continue, route to OTP verification screen (spec below).

---

### 8.4 Verification Code (OTP)

**Purpose:** Verify the phone number or email entered in Sign Up.

**Layout:**
1. Compact header: back arrow.
2. Headline: "Enter the code" in `display-lg`.
3. Subhead: "We sent a 6-digit code to **+1 403 555 0123**." with the destination in semibold.
4. Six segmented input boxes (auto-advance on digit entry, paste-friendly).
5. Helper text below: "Didn't get it? **Resend in 0:47**" — link disabled during cooldown, timer in tabular numerals.
6. Primary CTA: "Verify" — orange pill, full width. Disabled until 6 digits entered.

---

### 8.5 Sign In

**Purpose:** Return user log in. Same tabbed pattern as Sign Up.

**Layout:**
1. Compact header: back arrow.
2. Headline: "Welcome back."
3. Subhead: "Log in to manage your bookings."
4. Tab switcher: `Email` | `Phone number`.
5. Tab content:
   - Email tab: email input, password input below it with "Show" toggle on the right, "Forgot password?" link right-aligned below password.
   - Phone tab: phone input only — phone auth uses OTP, no password.
6. Primary CTA: "Log in" (Email tab) or "Continue" (Phone tab).
7. "or" divider, social auth stack.
8. Footer: "New to Collective? **Sign up**".

---

### 8.6 Forgot Password — Request

**Purpose:** Send reset link. Email tab only (not relevant for phone auth).

**Layout:**
1. Compact header: back arrow.
2. Headline: "Reset password."
3. Subhead: "Enter the email on your account. We'll send you a link to set a new one."
4. Email input.
5. Primary CTA: "Send reset link".
6. Footer: "Back to log in" link, centered.

---

### 8.7 Forgot Password — Confirmation

**Layout:**
1. Compact header: back arrow.
2. Centered content block:
   - Small line-art envelope icon with teal checkmark badge (NOT a giant green checkmark circle).
   - Headline: "Check your email."
   - Subhead: "We sent a reset link to sam@example.com. The link expires in 30 minutes."
3. Helper text with cooldown: "Didn't get it? **Resend in 0:47**".
4. Secondary button: "Back to log in".

**No success animation, no confetti. Calm and informative.**

---

### 8.8 Home / Service Hub (post-login, customer)

**Purpose:** Hub for all services. Booking is one of many cards. Future-proof for new services.

**Layout (top to bottom):**
1. Compact header: greeting "Hey, Sam" in `display-md` + small avatar circle + bell icon.
2. **Primary action card** (~25% viewport, `--bg-card`, `radius-lg`, 1px border):
   - Small line-art truck icon top-left
   - Title: "Book a dump slot"
   - Subtitle: "Calgary transfer station · 3 bays available today"
   - Bold orange "Book now" button right-aligned, pill style
3. **"Your next booking" strip** (only if user has one):
   - Compact card with time on left (tabular), bay + load type center, "View" chevron right
4. **Section label:** "OTHER SERVICES" in `label`, with small "More coming" pill on the right.
5. **2-column grid of service tiles** (`radius-md`, white, 1px border):
   - Bin rental, Portable toilets, Get a quote, Waste reports
   - "Coming soon" pill in corner of unfinished services, slightly muted but inviting
6. **Quick links horizontal scroll:** Pricing, Hours, Find us, Contact — chip-style.
7. **Bottom tab bar:** Home (active), Book, Bookings, Profile.

---

### 8.9 Booking — Variant A: Quick Book

**Purpose:** Repeat customers. 3 taps to a booked slot. One screen.

**Layout (top to bottom, all on one screen):**
1. Header: back arrow + "Quick book".
2. **"What are you dumping?"** — horizontal scrollable chip row of 6 waste types with small icons: General waste, Clean wood, Mixed C&D, Metal, Yard waste, Cardboard. Selected chip = teal fill.
3. **"Load size"** — segmented control:
   - Small (pickup / trailer) · 10 min slot
   - Large (dump truck / roll-off) · 20 min slot
4. **"When?"** — horizontal day picker showing today, tomorrow, +5 days. Selected day = deep blue fill.
5. **"Available times"** — 4-column grid of time slots, tabular numerals. Available = white. Unavailable = strikethrough muted. Selected = orange fill.
6. **Sticky bottom bar:** summary "Small load · General waste · Tue 2:15 PM · Bay 1" + primary "Confirm booking" CTA.

---

### 8.10 Booking — Variant B: Detailed Book

**Purpose:** Power users (commercial). Single long form.

**Sections:**
1. Waste details: type dropdown, weight + unit toggle (kg/tons), description (optional).
2. Vehicle: vehicle type chips, plate number, "Save for next time" toggle.
3. Schedule: inline calendar + auto-assigned bay chip + time grid.
4. Contact: driver name, phone.
5. Account: "Charge to account" toggle (commercial only).
6. Sticky bottom: estimated cost + "Review & book" CTA.

---

### 8.11 Booking — Variant C: Guided Wizard

**Purpose:** First-timers. One decision per screen, 4 screens total.

- Screen 1: "What are you dropping off?" — 2-col grid of large waste-type cards
- Screen 2: "How big is the load?" — two big side-by-side cards (Small / Large)
- Screen 3: "Pick a time" — day pills + time grid
- Screen 4: "Confirm your booking" — summary card + 2 fields (driver, phone) + big CTA

Progress dots at top of each screen (orange active dot).

---

### 8.12 My Bookings (list)

**Layout:**
1. Header: "My bookings" + filter pills (Upcoming active, Past, All).
2. Vertical list grouped by date with sticky day headers.
3. Each card: time on left in `mono-lg`, vertical divider, waste type + bay + load size on right. Status pill top-right.
4. Empty state: small line-art icon + "No bookings yet" + "Book a slot" button.
5. Bottom tab bar.

---

### 8.13 Booking Detail (with QR for gate check-in)

**Layout:**
1. Header: back arrow + "Booking" + share icon.
2. **Hero block** (full width, `--brand-teal-deep` background, white text): big time/date in `display-md` tabular, then "Bay 2 · Clean wood · Small load (10 min)" below.
3. **QR card** (white, centered): large QR code 60% screen width, caption "Show this at the gate".
4. Details list: Vehicle, Driver, Phone, Estimated weight, Estimated cost.
5. Map preview card with address + "Get directions" link.
6. Bottom: "Modify" secondary button + "Cancel booking" destructive text button.

---

### 8.14 Staff Dashboard — List View

**Purpose:** Yard attendant's primary working tool. Tablet at the gate.

**Layout (tablet, landscape):**
1. Top bar: location + 3 bay status dots + Today/Tomorrow toggle + view switcher (List active / Timeline / Calendar) + search + filter.
2. Stats strip: 4 stat cards — Today (47), Checked in (12), Waiting (3), No-shows (1).
3. Main list grouped by hour with sticky headers:
   - Each row: time (mono) | name + plate | waste + bay chip | status pill | chevron
   - Swipe left for quick actions: Mark arrived / Mark done / No-show
   - Currently-unloading row has subtle teal left-border + live timer "8:42 / 10:00" in mono
4. Floating "+ Walk-in" button bottom-right.

**High information density. Status colors paired with icons.**

---

### 8.15 Staff Dashboard — Timeline (Gantt) View

**Layout:**
1. Same top bar + stats as List view.
2. **Gantt canvas:**
   - Time axis along top: 7 AM – 6 PM, 15-min gridlines
   - 3 horizontal lanes: Bay 1 / Bay 2 / Bay 3, each labeled with waste stream
   - Booking blocks sized by duration (10 or 20 min wide)
     - Scheduled: white card, 1px teal border, name + plate inside
     - Unloading: orange fill with thin progress bar bottom edge
     - Done: muted gray
     - No-show: red dashed border, transparent
   - Vertical "now" line in `--brand-teal-deep` with "NOW 2:14" label
   - Tap a gap to add walk-in
3. Legend + "+ Walk-in" floating action.

---

### 8.16 Staff Dashboard — Calendar View

**Layout:**
1. Same top bar.
2. Week grid: 7 columns, day headers, today's column subtly tinted.
3. Each column: stack of compact booking pills, color-coded by **bay** (Bay 1 blue, Bay 2 teal, Bay 3 orange). Cap at 5, overflow link "+ 3 more".
4. Heatmap strip below: next 4 weeks, cells shaded by booking volume.
5. Right side panel (tablet only): selected day detail or today's summary.
6. Floating "+ Block out time" — for closing a bay for maintenance.

---

## 9. Stitch Prompting Rules

When generating any screen with Stitch, append this block to every prompt:

```
Style enforcement:
- No gradients, no glassmorphism, no frosted blur
- No 3D blobs, decorative floating shapes, or particle effects
- No stock illustrations of people, no smiling avatars
- Tight letter-spacing on headlines, generous on body
- Tabular numerals for all times, counts, and money
- Single primary CTA per screen, orange #E8782E, pill shape
- 1px borders over heavy shadows
- Bottom-anchored CTAs where actionable
- iPhone 15 frame, light mode first then dark mode in second frame
- Brand: teal #3BB5C2, deep teal #0E5A7B, orange #E8782E
- Type: Space Grotesk display, Inter UI
```

### Stitch generation order
1. Welcome (sets the brand tone)
2. Sign Up (sets the auth pattern)
3. Home (validates the system at scale)
4. Then iterate: splash, sign in, OTP, forgot password
5. Then booking variants (pick one before continuing)
6. Then bookings list + detail
7. Staff dashboard variants last

---

## 10. Open Questions & Decisions Pending

- [ ] Real cycle time per load size (Mudassir → ops)
- [ ] Bay-to-waste-stream mapping (Mudassir → ops)
- [ ] Walk-in handling process (Mudassir → ops)
- [ ] On-site scale: yes/no, weight measured or declared (Mudassir → ops)
- [ ] Pricing model — flat per slot, by weight, by waste type? (Mudassir → ops)
- [ ] Payment timing — at booking, at gate, on account? (Mudassir → ops)
- [ ] Notification preferences — SMS only, push, email? (default: SMS for Canada)
- [ ] Pick one booking variant after Stitch designs are reviewed
- [ ] Pick one staff view after Stitch designs are reviewed

---

## 11. Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-05-08 | One app, role-based (not two apps) | Less maintenance, shared design system, role flag enough for v1 |
| 2026-05-08 | Waste type first, system picks bay | Customers don't know bay layout; matches real ops constraints |
| 2026-05-08 | Phone auth as default tab | Canadian audience, faster than email/password for one-off bookings |
| 2026-05-08 | Personal/Business segment on Welcome | Sets account context before sign-up, mirrors Instacart pattern |
| 2026-05-08 | Drop Facebook auth | Not relevant for this audience; reduces clutter |
| 2026-05-08 | Service hub home (not booking-first) | Future services (bins, toilets, quotes) need equal real estate |