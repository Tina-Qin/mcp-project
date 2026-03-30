# Landing page chat composer — design specification

**Status:** Draft for implementation  
**Date:** 2026-03-30  
**Scope:** Add a **viewport-bottom–fixed** chat composer to the AntAlpha MCP marketing homepage (`app/page.tsx`), with **strong visual parity** to the reference image for the **rainbow top edge** on the main input and the **row of four pill actions**.  
**Out of scope for this spec:** Backend chat API, streaming, auth, analytics (may be stubbed or wired in a follow-up).

---

## 1. Goals and non-goals

### Goals

- **Placement:** A **prominent, always-visible** composer region **fixed to the bottom of the viewport** (user choice: option **2**), sitting **above** page content in the stacking order so it remains usable while scrolling the long landing page.
- **Visual fidelity (required):**
  - **Rainbow top border** on the main input container: a thin, full-width gradient along the **top edge only**, reading left-to-right through **red → orange → yellow → green → blue → purple** (match reference density and vibrancy; implement with CSS gradient, not a bitmap, unless parity testing shows otherwise).
  - **Four pill buttons** in one horizontal row **below** the main input: same **pill shape**, **dark fill**, **blue leading icon + white label** pattern as the reference; labels and icons:
    1. Musical note — **Generate music**
    2. Droplet / DB — **Add database and auth**
    3. Image + sparkle — **Create & edit images**
    4. Sound wave — **Add voice conversations**
  - **Chevron / “more” affordance** at the end of the pill row (reference shows a right arrow), indicating **horizontal overflow or more actions** (behavior can be scroll or drawer in implementation; default **horizontal scroll** on narrow widths).
  - **Inner controls** on the main input (reference): **bottom-left** circular **mic** and **+** buttons; **bottom-right** pill **“I’m feeling lucky”** with small **blue star** icon.
- **Brand coexistence:** Composer sits on the existing dark theme (`globals.css` tokens). **Gemini-specific headline** in the reference (“Build your ideas with Gemini”) is **not** required on the AntAlpha site; the **composer chrome** (input, rainbow, pills, inner controls) **is** what must strongly match the reference.

### Non-goals

- Pixel-perfect match to Google Gemini product (fonts, exact hex values) beyond what is needed for **recognizable parity** with the reference.
- Replicating **browser window chrome** from the screenshot (traffic lights, URL bar) — **exclude** from UI.
- Full chat transcript UI in v1 (messages area can be empty, placeholder, or follow-up).

---

## 2. Reference

- **Local reference asset:** `assets/image-1ace2dd2-04f0-4b73-9afc-afae7ec27d47.png` (workspace-relative path under `.cursor/projects/.../assets/` as provided in session; copy into repo e.g. `docs/superpowers/references/` if a committed reference is required for the team).
- **Acceptance:** Side-by-side with running app, the **rainbow edge**, **four pills**, and **input control cluster** are immediately recognizable as the same pattern as the reference.

---

## 3. Page integration

### Layout

- **Position:** `fixed`, anchored to **bottom** of the viewport (`left: 0`, `right: 0`), with horizontal **inset** consistent with the site: align inner content to **`max-w-7xl`** centered column with **`px-4 sm:px-6 lg:px-8`** (same mental model as existing landing sections).
- **Z-index:** Above scrolling page content and below any future global modal layer; use a single documented token (e.g. `z-50` or project convention) so Navbar dropdowns/modals can still win when needed.
- **Spacing:** Add **bottom padding** to `<main>` (or a wrapper) so the **last section’s content is not hidden** behind the composer (padding magnitude ≈ composer block height + safe area — exact value tuned in implementation).

### Viewport and motion

- **Desktop-first** art direction; **narrow screens:** composer remains fixed bottom; pills row **scrolls horizontally** if needed; touch targets ≥ 44px where possible.
- **iOS safe area:** `padding-bottom: env(safe-area-inset-bottom)` on the fixed bar container.

### Copy (AntAlpha)

- **Placeholder** inside the main input should be **product-appropriate** (e.g. describe Web3 / MCP intent), not the Gemini marketing line — unless product explicitly requests verbatim reference copy for a demo.

---

## 4. Component boundaries

| Unit | Responsibility | Depends on |
|------|----------------|------------|
| **`LandingChatComposer`** (name indicative) | Renders fixed bottom shell: rainbow-bordered input, inner controls, pill row, overflow affordance. | Design tokens, `lucide-react` or equivalent icons, optional future `useChat` / API. |
| **Page / layout** | Inserts composer on homepage only (or as decided); applies main bottom padding. | `LandingChatComposer` |

Behavior of **mic**, **+**, **lucky**, and **pills** may be **no-op / toast** in v1 unless product specifies otherwise; this spec still requires **visible, interactive-looking** controls.

---

## 5. Pencil design deliverable

- **Purpose:** Layout and stacking reference for engineers and stakeholders — **not** a substitute for implementation.
- **File:** One `.pen` document (path chosen at implementation time), opened in the editor before editing.
- **Frames (minimum):**
  1. **Desktop (1440):** Landing simplified (Navbar + top of Hero) + **fixed bottom composer** with **rainbow top**, **four pills**, **mic / + / lucky** — content column **1280** centered inside **1440**.
  2. **Optional:** Narrow width showing **horizontal scroll** for pills.

---

## 6. Visual implementation notes (for dev handoff)

- **Rainbow edge:** Prefer a dedicated **top strip** (e.g. 2–3px height) with `linear-gradient(90deg, ...)` or `border-image` on a wrapper; inner area uses **card-like** dark background and **large corner radius** to match reference **rounded rectangle** input.
- **Pills:** High `border-radius`, flex row, `gap`, non-wrapping row with `overflow-x-auto` on small viewports; muted track if needed.
- **Icons:** Blue accent aligned with `--neon-blue` / primary where possible without clashing with rainbow.

---

## 7. Testing and acceptance

- **Manual:** Chrome + Safari + mobile viewport: no overlap of composer with critical CTAs without scrolling; last footer content visible with main padding; rainbow and four pills visible without clipping.
- **Optional later:** Playwright screenshot comparison for composer region (if flakiness is controlled).

---

## 8. Open decisions (resolved for v1)

| Topic | Decision |
|-------|----------|
| Placement | Fixed **bottom composer** (option 2). |
| Rainbow + four pills | **Required** strong restore per reference. |
| Gemini title in reference | **Not** shipped on AntAlpha; composer chrome only. |

---

## 9. Revision history

| Date | Change |
|------|--------|
| 2026-03-30 | Initial spec from brainstorming (reference image + user choices). |
