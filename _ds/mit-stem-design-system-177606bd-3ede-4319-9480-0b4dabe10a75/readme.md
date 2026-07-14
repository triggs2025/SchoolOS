# MIT STEM² — Design System

The brand and UI system for **Maricopa Institute of Technology (MIT)** — the *MIT STEM² Online High School*, a four-year public charter college-preparatory high school in Phoenix, Arizona. This repository is the single source of truth for the school's identity: brand assets, color and type tokens, reusable UI components, and full-screen product recreations.

> **STEM²** = Science · Technology · Engineering · Mathematics · **Medicine**. The squared "2" in the name signals the added Medicine pillar and is core to the brand voice.

---

## 1 · Organization context

- **Who:** Maricopa Institute of Technology (MIT), operated under the Estrella Educational Foundation / Riverside ESD #2 family of STEM² schools (K–20). Sister grades 7–8 run as the R2 STEM² Magnet; this system serves the **9–12 high school** and its **online program**.
- **What:** A rigorous, project-based STEM² college-prep curriculum. AP and dual-enrollment (Grand Canyon University, Rio Salado) credit; internships; hands-on labs (robotics, digital electronics, Arduino, Python, anatomy/medicine). NASA partnership. Small school (~24:1 ratio) with a "private-school education in a public-school setting" positioning.
- **Mascot / mark:** A gold bald **eagle** with spread wings over a purple shield bearing "MIT".
- **Surfaces represented here:**
  1. **Marketing website** — recruitment, academics, enrollment (the public `mitglobalonline.org` experience).
  2. **Student learning portal** — the online-school dashboard students use for courses, progress, and assignments (the role filled in production by SchoolsPLP / StudentVUE).

### Sources consulted (store for reference — reader may not have access)
- Official site: `https://www.mitglobalonline.org` (Our School, About Us, Academics, Contact).
- `https://www.mitglobalonline.com/About-Us`
- Student Handbook 2024–25 (PDF on the school CDN).
- Niche / U.S. News / GreatSchools profiles (curriculum & stats context).
- **Brand assets:** four official logo PNGs supplied in `uploads/` (horizontal lockup, eagle-only, and the STEM² Online High School lockup). Colors were sampled directly from these files.

> ⚠️ **No codebase or Figma file was provided.** The UI kits are faithful *brand* recreations built from the public site's information architecture and copy, not from production source. Where a production detail couldn't be confirmed, the screen uses representative content and is labeled as such.

---

## 2 · Content fundamentals (voice & tone)

The MIT voice is **formal, aspirational, and character-forward** — an institution that takes itself seriously and expects the same of its students.

- **Person:** Institutional third person for mission/identity ("MIT provides…", "Maricopa Institute of Technology is…"); warm second person for calls to action ("Schedule a visit", "Learn why MIT is right for you").
- **Tone:** Earnest and rigorous, never casual or playful. Words that recur: *rigorous, college-preparatory, personal excellence, character, serve and lead, goal-oriented, limitless possibilities.*
- **Casing:** Title Case for nav and headings. The wordmark and section eyebrows use **wide-tracked UPPERCASE** echoing the engraved crest. Sentence case for body copy.
- **The five virtues** (use verbatim when referencing culture): **Integrity, Fidelity, Tolerance, Responsibility, Self-discipline.**
- **STEM² typography:** always written as `STEM²` with a superscript 2 (or `STEM2` only where superscript is impossible). Never "STEM 2" or "Stem².
- **Emoji:** none. This is a formal academic brand — do not use emoji. Iconography is line-based (see §4).
- **CTA examples (real):** "Apply Today", "Schedule a Visit", "Learn Why MIT is Right for You", "Enroll".
- **Numbers as proof:** small, concrete stats carry weight (24:1 ratio, AP/dual-enrollment, U.S. News Best High Schools badges). Set statistics in the serif numeral + gold uppercase label pattern (`StatCard`).

**Example headline + subhead in voice:**
> **Pursue personal excellence.**
> A rigorous STEM² college-preparatory education that challenges students to serve and lead others.

---

## 3 · Visual foundations

**Color.** Two brand colors carry everything:
- **Brand purple `#4C2959`** (`--color-primary`) — deep eggplant. Headlines, chrome, primary buttons, the shield. The dominant identity color.
- **Brand gold `#BD9C28`** (`--color-accent`) — metallic, slightly antique. Used as an *accent*, never a flood: thin rules under titles, uppercase eyebrows, the eagle, and a single high-emphasis CTA per view. Gold-on-purple is the signature pairing.
- Neutrals are a warm gray ramp with a faint purple cast (`--neutral-*`), so the system never feels cold or clinical. Page background is `--neutral-50`, cards are white.
- Status colors are **muted and academic** (forest green, ochre amber, brick red, slate blue) — desaturated to sit beside the heritage palette.

**Type.** A serif/sans/mono superfamily:
- **Source Serif 4** — display & headings. A sturdy transitional serif standing in for the engraved crest wordmark (see substitution note below). Weights to 900 for hero numerals.
- **Source Sans 3** — body, UI, navigation. Highly legible, neutral.
- **Source Code Pro** — data, stats, code, IDs (the school teaches Python/HTML/Arduino, so monospace reads as "STEM").
- Headlines use tight tracking (`-0.01em`); eyebrows and the wordmark use wide tracking (`0.12em`) in uppercase.

**Backgrounds.** Predominantly clean white and `--neutral-50`. Emphasis sections invert to **solid brand purple** (`--surface-brand`) — flat color, not gradients. Photography (campus, labs, students) is used full-bleed in heros; imagery skews **warm and natural**, documentary rather than stylized. No heavy textures, no decorative patterns, no purple→blue gradients.

**The gold rule.** The single most recurring brand device: a short (≈64px) **3px gold horizontal rule** beneath the wordmark, section eyebrows, and titles. Reach for `.mit-rule` / the `SectionHeading` `rule`.

**Borders & cards.** Cards are white with a 1px subtle neutral border and a soft shadow; corners are **moderate, institutional** — `--radius-md` (8px) for controls, `--radius-lg` (12px) for cards. A gold top or left rule (`accent="top"`) marks featured cards. Avoid the "rounded card with a single colored left border and nothing else" trope unless it's the intentional gold-accent card.

**Elevation.** Soft, ink-tinted shadows (faint purple, never pure black) in five steps. A dedicated `--shadow-brand` purple glow for hero/feature cards and `--shadow-focus` gold halo for inputs.

**Motion.** Calm and academic. Short ease-outs (120–320ms, `--ease-out`), gentle fades and 1–3px lifts. **No bounce, no spring, no looping decorative animation.** All durations collapse to 0 under `prefers-reduced-motion`.

**Hover / press states.**
- Buttons: hover darkens one brand step and lifts 1px; press settles back.
- Outline/ghost: hover fills with `--purple-50`.
- Links: purple → gold-700 on hover.
- Cards (`hoverable`): shadow grows + 3px lift.
- Focus: always a visible **gold ring** (`--shadow-focus` / `--focus-ring`) for contrast against purple chrome.

**Transparency & blur.** Used sparingly — a translucent purple scrim over hero photos for text legibility, and reduced-opacity white for secondary text on purple. No glassmorphism.

**Layout.** Centered containers (max 1200px content, 1360px wide), generous vertical rhythm on the 4px grid, left-aligned headings by default (centered for hero/section intros).

### Font substitution — action needed
The official crest wordmark uses a **custom engraved serif** we don't have the file for. **Source Serif 4** (Google Fonts) is the nearest open match and is what the system ships. If you have the brand's licensed font files, drop them in `assets/fonts/`, add `@font-face` rules, and update `tokens/fonts.css`. **Please confirm or send the real wordmark font.**

---

## 4 · Iconography

- **Style:** clean **line icons, ~2px stroke, rounded caps/joins** — the [Lucide](https://lucide.dev) set, which matches the brand's restrained, legible character. UI kits and component cards load Lucide from CDN; component JSX stays icon-agnostic (pass an icon element as a prop).
- **No emoji, no multicolor/3D icon sets.** Icons inherit `currentColor` (purple in chrome, gold only as deliberate accent).
- **The eagle crest is the one illustrative mark** and is provided as PNG (`assets/eagle*.png`) — never redraw it. Use it small as a favicon/sigil and large as a watermark/hero motif.
- **Source note:** no production icon font/sprite was available, so Lucide is a documented **substitution** chosen for stroke-weight fidelity. If the school standardizes on a different set, swap the CDN link.

---

## 5 · Repository index

**Root**
- `styles.css` — the single entry point consumers link. `@import`s only.
- `readme.md` — this guide.
- `SKILL.md` — Agent-Skill front-matter so the system can be used in Claude Code.

**`tokens/`** — `fonts.css` (webfont imports + substitution note), `colors.css`, `typography.css`, `spacing.css`, `elevation.css` (shadows + motion), `base.css` (light element defaults + `.mit-*` utilities).

**`assets/`** — `logo-stem2-full.png` / `-white`, `logo-full.png` / `-white`, `eagle.png` / `-white` / `-purple`. (Originals preserved in `uploads/`.)

**`components/`** — reusable React primitives (namespace `window.MITSTEMDesignSystem_177606`):
- `buttons/` — **Button**, **IconButton**
- `forms/` — **Input**, **Textarea**, **Select**, **Checkbox**, **Radio**, **Switch**, **Field**
- `feedback/` — **Badge**, **Tag**, **Alert**, **ProgressBar**
- `data/` — **Card**, **StatCard**, **Avatar**, **Tabs**, **Breadcrumb**
- `brand/` — **Logo**, **SectionHeading**

**`guidelines/`** — foundation specimen cards (Colors, Type, Spacing, Brand) shown in the Design System tab.

**`ui_kits/`** — full-screen product recreations:
- `website/` — marketing site (home, academics, enrollment).
- `portal/` — student online-learning dashboard.

**`slides/`** — branded presentation slide templates (title, section, content, stat, quote).

---

*Built from official brand assets + public site content. Confirm the wordmark font and supply any production source (codebase / Figma) to raise fidelity.*
