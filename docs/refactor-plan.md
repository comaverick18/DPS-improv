# Landing Page Refactor Plan
**Branch:** `refactor/landing-modernize-v1`
**Date:** 2026-04-23
**Scope:** `index.html` + `styles.css` only — no other pages touched.

---

## Current Section Order

1. Sticky nav — logo, "Features" + "How It Works" links, "Download App" ghost button
2. Hero — headline "Confidence to Conquer the Day", one subhead, one primary CTA (no secondary, no product visual — hero mockup removed in prior commit)
3. Success Stories carousel — auto-scrolling ticker of 9 short quotes
4. "Three Growth Layers" header — overline + H2 + paragraph (no stepper rendering)
5. Alternating Features — JAZZ (text-left / SVG-right), ConvoQuest (reversed), ImprovCircle (text-left / SVG-right)
6. "Complete System" section — 6-card 3-col grid (Go at Your Pace, AI Partner, Feedback, Safe Environment, Proven Results, Community)
7. Final CTA band (dark navy) — rotating conversation topic tags, H1, H2, paragraph, single button, stars/rating, one testimonial
8. Footer — integrated into the dark navy band (4-col grid, darker sub-footer)

---

## Existing Design Tokens

### Colors (from design.json)

| Token | Value | Usage |
|---|---|---|
| Navy base | `#1E2875` | All primary headlines |
| Navy dark | `#141B52` | Footer bg, hover states |
| Blue | `#4169E1` / `#5B7FFF` | CTAs, links, overlines |
| Yellow | `#FFD700` / `#FFE600` | Accent only (pricing) |
| Off-white | `#F8F9FB` | Page bg, section fills |
| Light gray | `#E5E8F0` | Borders, dividers |
| Medium gray | `#6B7280` | Body text |
| Success green | `#10B981` | Badges, progress |

### Typography (all Inter)

| Token | Size / Weight |
|---|---|
| Hero title | 96px / 800 |
| Section title | 64px / 800 |
| Feature title | 48px / 800 |
| H3 / system-title | 20px / 700 |
| Overline | 14px / 600 / uppercase / tracked |
| Body | 18px / 400 |
| Body small | 16px / 400 |

### Spacing & Layout
- Container: `max-width: 1280px`
- Section padding: 80–120px vertical
- Card gap: 32px

### Existing reusable component classes
`.btn-primary`, `.btn-secondary`, `.btn-ghost`, `.feature-badge`, `.overline`, `.feature-cta-btn`, `.system-item`, `.success-story`

---

## Audit: Working vs. Dated

### Working — keep
- Font choice (Inter) — already modern, no change needed
- Button styles (all three variants: primary, secondary, ghost) — solid, reuse throughout
- Feature row alternating layout structure — good bones
- SVG mockups in each feature row — give context without real screenshots
- Dark final CTA band concept — premium feel, just needs simplification
- Design token discipline in design.json — well-organized, drive refactor from these

### Dated / needs work

| Section | Problem |
|---|---|
| `.hero` | Flat off-white background, no visual interest; no secondary CTA; no product visual since mockup removal; feels empty |
| `.nav` | Only 2 links, no sticky backdrop blur, CTA is plain ghost text not a real button |
| `.clients-section` | Raw scrolling ticker feels cheap; positioned too prominently; no "trust strip" framing |
| `.growth-layers-header` | Plain text header — the stepper concept in the copy is not rendered visually |
| `.complete-system-section` | 6 equal cards in a grid is unfocused; doesn't match requested numbered 3-step "How It Works" |
| Alternating feature rows | Missing benefit bullets and inline arrow CTAs — just a paragraph + button, not the Veo-3 pattern |
| `.final-cta-section` | Rotating tag animation is gimmicky; stacked H1+H2 is too much copy; testimonial buried |
| Border violations | Several components use `border: 1px solid rgba(0,0,0,0.05)` — design.json forbids borders on cards |
| Scroll animation | No scroll-entrance animations anywhere |

---

## Proposed New Section Order

1. **Sticky top nav** — logo left; Features, How It Works, JAZZ, ConvoQuest, Community links center; "Download App" primary pill button right; frosted glass backdrop on scroll
2. **Hero** — eyebrow badge, bold H1 (~80px), one-line subhead, primary + secondary (ghost) CTA pair, soft gradient background (low-opacity blue-to-warm-white), product screenshot framed in browser chrome SVG
3. **Trust strip** — single quiet row: "As used by" + 5–6 short social proof fragments (muted, small, not a loud carousel)
4. **Your Confidence Journey** — eyebrow + H2, three numbered stepper cards (1 JAZZ → 2 ConvoQuest → 3 ImprovCircle) as a visual flow
5. **JAZZ feature row** — text left, SVG right; eyebrow + H2 + subtitle + paragraph + 3 bullet benefits + inline arrow CTA
6. **ConvoQuest feature row** — reversed; same Veo-3 pattern
7. **ImprovCircle feature row** — text left; same Veo-3 pattern
8. **How It Works** — eyebrow + H2, numbered 3-step grid with minimal icons
9. **Social proof** — 3–4 calm testimonial cards in a grid
10. **Final CTA band** — eyebrow + one large headline + one subhead + one CTA button; generous whitespace; soft gradient, not solid navy wall
11. **Footer** — multi-column, light background (`#F8F9FB`), muted text, separated from CTA band

---

## Design System Rules for Refactor

### Typography
- Keep Inter throughout — one family only
- New display scale: H1 hero ~80px / 800w, section H2 ~52px / 700w, feature H2 ~44px / 700w, H3 ~24px / 700w
- Max 2 font weights in any single section

### Color
- Keep navy `#1E2875` + blue `#4169E1` as primary brand
- Hero gradient: `linear-gradient(160deg, #f0f3ff 0%, #f8f9fb 60%, #fff7e6 100%)` — soft blue-to-warm-white with whisper of yellow
- No hard red/blue containers
- Final CTA: soft gradient instead of solid navy wall

### Spacing
- Container tightened to `1160px` (from 1280px) to improve line length and whitespace feel
- Section vertical rhythm: 96–128px between top-level sections on desktop, 56–72px on mobile

### New / updated component classes
- `.eyebrow` — 11px, uppercase, tracked, muted blue (`#4169E1` at 80% opacity)
- `.feature-benefits` — `<ul>` with inline arrow/checkmark markers
- `.feature-link-cta` — inline arrow link (tertiary button pattern)
- `.stepper-card` — numbered card for the Journey section
- `.testimonial-card` — calm card, subtle border + shadow, no busy background
- Fix card border violations: `border: 1px solid rgba(30,40,117,0.08)` replaces `rgba(0,0,0,0.05)`

### Motion
- `@keyframes fadeInUp` — 24px translate, 300ms ease-out, triggered on scroll via IntersectionObserver
- Applied to: hero content, section headers, feature rows, stepper cards, testimonial cards
- No parallax, no competing auto-animations

### Responsiveness
- Mobile-first
- Alternating rows stack image-above-text on mobile
- Nav collapses to hamburger at ≤768px

### Accessibility
- WCAG AA contrast maintained throughout
- Visible focus states: `outline: 2px solid #4169E1; outline-offset: 2px`
- Semantic `<section>`, `<h1>`, `<h2>`, `<nav>`, `<footer>`

---

## File Strategy

- Keep `styles.css` as single file (split into `landing.css` only if it grows unwieldy)
- `styleguide.html` — created for Checkpoint B review, deleted before merge unless keeper requested
- Do not touch: `jazz-ai.html`, `convoquest.html`, `improvcircle.html`
- Do not undo: Task 1 fix (no stray hero mockup above headline)

---

## Checkpoint Sequence

- [x] **Checkpoint A** — Inventory + plan (this document). Dev server running at `http://localhost:3000`.
- [ ] **Checkpoint B** — `styleguide.html`: typography scale, buttons, cards, eyebrow labels, one rendered alternating feature row. View at `http://localhost:3000/styleguide.html`.
- [ ] **Checkpoint C** — Section-by-section refactor of `index.html` + CSS, one section per commit.
- [ ] **Checkpoint D** — Responsive pass at 1440 / 768 / 375px widths.
- [ ] **Checkpoint E** — PR from `refactor/landing-modernize-v1` → `main` after explicit approval.
