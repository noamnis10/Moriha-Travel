# Moriah Travel — Style Lock

> Honesty note: the tastemaker skill's own scripts (`generate_palette.py`,
> `check_contrast.py`, `fetch_photos.py`, `fetch_icons.py`, etc.) and
> reference files were **not present** in the environment this lock was
> written in — only the top-level `SKILL.md` instructions were available.
> Everything below was produced by hand, applying the same method the
> scripts encode (mood-based OKLCH-ish palette, real WCAG contrast math),
> not by running the actual tooling. Treat the numbers as verified by hand
> calculation (see Color contract), not tool output.

## Brief

Boutique Israeli travel agency (Moriah Travel). Personal, high-touch trip
planning — not off-the-shelf packages. Primary conversion channel is
WhatsApp, not a form or checkout. Audience: Hebrew-speaking travelers who
want a curated trip and a real human to talk to.

## Mood

**Premium.** Chosen over "warm" (reads more casual/cozy) and "elegant"
(reads more minimal/editorial) because the brand is specifically a paid,
high-touch concierge service — trust and quality without being cold.
Deliberately avoids the two most common AI defaults: warm-cream +
terracotta, and near-black + single bright accent.

## Color contract

Roles (hex) and what's safe to pair, verified by hand with the WCAG
relative-luminance formula (not the skill's script — see honesty note):

| Role | Hex | Use |
|---|---|---|
| `bg` | `#F7F5F1` | Page background (warm ivory, not the cliché `#F4F1EA`) |
| `surface` | `#FFFFFF` | Cards, form fields |
| `text` | `#201D1A` | Body text |
| `text-soft` | `#5C5650` | Secondary text |
| `primary` (`teal-900` token) | `#1B2A3D` | Deep navy — buttons, dark sections |
| `primary-950` (`teal-950` token) | `#16202E` | Darkest navy — hero fallback, footer, testimonials |
| `accent` (`gold` token) | `#C0924A` | Decorative/large-scale only (stars, badges) — **fails as text on light bg** |
| `accent-text` (`gold-text` token) | `#8A6530` | Text-safe gold for links/emphasis on light bg |
| `border` | `#D9D2C3` | Decorative hairlines (low contrast by design, backed by shadow) |
| `border-strong` | `#998C70` | Functional input/UI borders (3.3:1 vs white) |
| `on-primary` | `#FFFFFF` | Text on navy |

Text-safe pairs (≥4.5:1): text/bg, text/surface, text-soft/bg,
text-soft/surface, on-primary/primary, primary/bg, primary/surface,
accent-text/bg, accent-text/surface, accent/primary-950 (gold reads well
on dark navy, 5.82:1 — used for star ratings on the dark testimonials
section).

UI-safe only (≥3:1, not for body text): border-strong/surface,
accent-text/primary-950 (3.11:1, used only for large glyphs).

Decorative only (<3:1, never for text or functional borders): accent/bg,
border/bg, border/surface.

**Rule going forward:** never put `accent` (raw gold) as body text on a
light background — use `accent-text` there. Never put `accent-text` as
small text on the dark navy — use raw `accent` there instead. They are
opposite-calibrated (one for light grounds, one for dark).

## Type

Unchanged from the prior pass — not re-derived here because the two
default families this skill recommends (Geist/Manrope/Poppins) don't
support Hebrew.

- Heading: Frank Ruhl Libre (serif)
- Body: Heebo (sans)
- Brand wordmark only (logo, Latin text): Playfair Display

## Layout / macrostructure

Home page: Hero → Tagline reveal → About (teaser) → Services → Pricing →
Testimonials → FAQ → Contact — a "Feature Stack"-style arc, not rotated
against a prior structure since this is the first tastemaker pass on this
project (no `.tastemaker/log.json` history existed before this one).

Narrative beats: hook (hero promise) → proof of care (tagline reveal +
about) → offer (services + pricing) → trust (testimonials) → objection
handling (FAQ) → close (contact). Five beats, none skipped.

## Motion

GSAP + ScrollTrigger is the engine for the whole site (`src/lib/motion.js`),
replacing the earlier IntersectionObserver-only approach:
- Hero: sequenced entrance timeline (eyebrow → heading → subhead → CTAs →
  search card), staggered.
- Tagline reveal: scrubbed word-by-word opacity tied to scroll position.
- All other sections: fade-up-and-unblur on scroll via `useReveal()`.
- Everything wrapped in `gsap.matchMedia()` so `prefers-reduced-motion:
  reduce` disables animation and snaps content to its final state.
- No `transition: all` anywhere — every Tailwind transition lists the
  specific properties it animates.

**Interaction-level animation pass** (built with the `animate` skill, scoped
by 10+ clarifying questions the client answered):
- **Page transitions**: new route content fades + rises in on mount only
  (`.page-transition` / `@keyframes page-enter` in `src/index.css`,
  `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` — a new token, kept separate
  from the drawer curve below since it's a different animation family).
  450ms desktop, 220ms on screens ≤767px per the client's explicit
  "faster/simpler on mobile" answer. No exit/crossfade animation on the
  outgoing page — the client's chosen (recommended) option.
- **Card + image hover** (Pricing package cards, About teaser photo,
  AboutPage story photo): image scales `1.06` inside its `overflow-hidden`
  frame while the whole card/photo block lifts (`-translate-y-1.5`) and its
  shadow deepens — the client explicitly wanted both effects together, not
  image-only. Reuses the existing `duration-700` +
  `ease-[cubic-bezier(0.32,0.72,0,1)]` drawer curve already used for the
  card's own hover state, so the two motions read as one gesture.
- **Buttons/icons**: subtle `hover:-translate-y-0.5` added to the shared
  `Button` primitive and the navbar's WhatsApp pill/hamburger, reset via
  `active:translate-y-0` so a press doesn't fight the hover lift. Kept on
  the site's existing 700ms drawer-curve duration rather than the skill's
  own faster hover guideline (100–300ms), because that duration is already
  the site's established "premium, deliberate" motion language (confirmed
  by the client as the desired character) — introducing a second, faster
  timing just for buttons would read as inconsistent, not premium.
- **Explicitly rejected, per the client's own answers**: no count-up
  animation on the stats numbers (kept static), no idle/attention-getting
  animation on the floating WhatsApp button (stays static except hover —
  it's visible on every page/scroll, which is exactly the skill's
  100+-times-tier disqualifier for repeating motion), and no animation
  polish on `/dashboard` (internal tool, explicitly out of scope).
- **Hover gating fix, sitewide**: Tailwind v4's default `hover` variant
  compiles to a plain `:hover` selector with no pointer-capability check,
  which "sticks" after a tap on touch devices — the exact ungated-hover
  anti-pattern the `animate` skill's Never-Ship table blocks. Fixed once,
  globally, with a `@custom-variant hover { @media (hover: hover) and
  (pointer: fine) { &:hover { @slot; } } }` redefinition in `src/index.css`,
  rather than hand-gating every individual `hover:` utility in the codebase.
- Reduced motion for all of the above is covered for free by the existing
  global `@media (prefers-reduced-motion: reduce)` block in `src/index.css`,
  which already zeroes every CSS transition/animation duration site-wide.

**Second pass — reference-driven** (client shared `vita-travel.webflow.io`
as a reference after the fact; this session's network policy blocks
essentially all outbound web access, so it was worked from the client's
description of what they liked rather than by loading the site):
- **Hero parallax**: the background photo (oversized to 120% height so no
  edge is ever exposed) drifts ±8% of its own height as the hero section
  scrolls past, via a scrubbed ScrollTrigger. Desktop only — dropped on
  mobile, consistent with the "faster/simpler on mobile" answer.
- **Page-transition curtain** (`src/components/PageTransitionOverlay.jsx`):
  replaces the plain content-fade with an overlay-style transition — a
  solid navy panel snaps to fully covering the viewport in a
  `useLayoutEffect` (so it paints before the swapped route is ever visible,
  no flash), holds briefly, then wipes away (`power3.inOut`) to reveal the
  new page underneath, which has already settled. 0.6s + 150ms hold on
  desktop, 0.3s + 50ms hold on mobile. Reduced motion gets a plain 150ms
  opacity flash instead of the transform wipe. The existing `.page-transition`
  content fade+rise still runs underneath, invisible until the curtain lifts.
- **`RevealHeading`** (`src/components/RevealHeading.jsx`): word-by-word
  scroll reveal for section headings — each word is masked
  (`overflow-hidden`) and slides up into place on a staggered, one-shot
  ScrollTrigger. Applied to every static marketing H2 sitewide (Home
  sections, AboutPage, PackageDetail) and the AboutPage H1. Left as plain
  text: the PackageDetail hero H1, since it's built from interpolated
  `{pkg.flag} {pkg.destination}` rather than a single string and the
  component isn't built to split multi-node children.
- **Package card hover chip**: a small arrow-in-circle badge fades up into
  the top corner of the destination photo on hover, on top of the existing
  zoom+lift, reinforcing the "open this" affordance the reference's card
  hover states have.
- **Gating fix, extended**: the sitewide `hover` pointer-gating fix above
  turned out to have a sibling gap — Tailwind v4's `group-hover` variant is
  built the same ungated way. Redefined it too, in the same place, with the
  same `@media (hover: hover) and (pointer: fine)` guard, so the card
  zoom/lift/chip hovers introduced in this project don't stick on tap.

## Navigation

Floating "island" pill nav (logo + WhatsApp + hamburger) expanding to a
fullscreen glass menu, shared by mobile and desktop, with active-section
highlighting on the home page and active-route highlighting on other
pages (see `src/components/Navbar.jsx`).

## Pages in scope (this pass)

- `/` — home landing page
- `/about` — full About page (expands the on-page teaser)
- `/packages/:id` — package detail page, linked from each pricing card
- `/thank-you` — success state after the contact form or a package's
  WhatsApp CTA
- `/dashboard` — internal packages admin (unchanged, out of visual scope)
- `*` — branded 404

## Assets

- Real client photo (Santorini) as the hero background:
  `public/media/hero-santorini.jpg`.
- Three Higgsfield-generated photos (About, Batumi, Limassol) from the
  prior pass, referenced in `src/lib/media.js`.
- Openverse and Iconify (this skill's default photo/icon sources) are
  **blocked by this session's network policy** — confirmed by a direct
  request returning a proxy policy denial. No new stock photography was
  added this pass; existing assets were reused as-is.
- Icons: Phosphor (`@phosphor-icons/react`), one set project-wide.
- No illustrations used — the client asked to keep photography-only
  rather than populate `~/.ideagram/undraw/`.

## Open items / honest gaps

- Testimonials are still placeholder copy (flagged since the first pass).
- No illustration library populated — not attempted, per the client's
  choice this round.
- No additional stock photography added — network-blocked, not skipped
  by choice.
- Package detail pages currently show one photo per destination (whatever
  Pricing already had) — no photo gallery, since only one image exists
  per destination.
