# Product Requirements Document — Riverside Unified Platform (Clickable Prototype)

**Prepared for:** Claude Design
**Purpose:** Build a clickable, visually polished, **fully mocked** prototype of a unified school-district operating system. No live data, no auth, no backend — the goal is for superintendents and teachers to walk through it and *feel* the product.
**Product working name:** *TBD — use "Riverside Platform" as a placeholder in UI; keep the wordmark easy to swap.*
**System of record (reference integration):** Edupoint **Synergy** (SIS) + **Google Classroom** (LMS layer for teachers)
**Scope of this PRD:** Everything the designer needs — design direction, global structure, shared components, a consistent sample-data world, every role's screens and flows, and the signature demo narrative.

---

## 1. What we're building and why

Riverside Unified runs on a pile of disconnected subscriptions — each with its own login and its own data silo. Tools get abandoned because nothing connects and no one can see the whole picture. The Platform is one local-AI operating system that unifies the district's data and reshapes itself completely around whoever logs in. One login per person; one data foundation; one AI "brain" that knows the context and surfaces problems before anyone asks.

**This prototype must demonstrate three things in under five minutes:**
1. **One system, many lenses** — the same product becomes a different product for a superintendent vs. a teacher vs. a parent.
2. **The brain** — ask a plain-language question, get a grounded, *source-cited* answer.
3. **Proactive, not passive** — the system speaks first, flagging the right thing to the right person.

**Out of scope (mock only):** real Synergy/Classroom integration, authentication/SSO, the AI/RAG backend, hardware/data-center, any real student data. All AI responses and data are scripted to look real.

---

## 2. Design direction

**Mood:** A calm, credible command center. This is software a superintendent trusts with a board presentation and a teacher trusts at 7am. Modern and confident, but never flashy or "startup-loud." Think *trustworthy infrastructure*, not consumer dashboard.

**Principles**
- **Clarity over density.** Lots of data, but every screen has one obvious focal point. Generous whitespace. Nothing should feel like a spreadsheet dump.
- **The AI is present but calm.** The assistant is always reachable but never nags. Proactive alerts are noticeable, not alarming.
- **Role identity is visible.** Each role should feel subtly distinct (e.g., a role-coded accent on the top bar) so switching logins reads as switching products.
- **Trust cues everywhere.** Source citations on AI answers, a visible "data stays in your district" mark, permission scoping shown not hidden, and a translation indicator on communications.
- **Accessible by default.** WCAG AA contrast, real text (not text-in-image), legible charts, scalable type.

**Visual tokens (direction, not law — refine with the frontend-design skill)**
- **Palette:** a deep, trustworthy base (ink navy / slate) with a single confident accent (a considered teal or indigo). Soft neutral surfaces, not stark white. Status colors: green (on track), amber (watch), red (at risk) — used sparingly and consistently.
- **Type:** one clean humanist sans for UI; slightly larger, calmer headings. Tabular figures for all metrics.
- **Data viz:** simple, labeled, legible — line/area for trends, bars for comparisons, donuts/rings for rates. No 3D, no gradient soup.
- **Shape language:** soft-rounded cards, subtle elevation, clear grouping.
- **Layout:** persistent left nav (role-specific), persistent top bar (context + assistant + profile), main content area. Desktop-first; design at ~1440px.

**Role accent suggestion (for the top bar / active nav):** Superintendent indigo · Principal violet · Teacher teal · Counselor green · Admin amber · Special Education slate-blue · Student warm coral · Parent soft blue. Keep all within one harmonious family.

---

## 3. Global structure & navigation

### 3.1 Entry: the role picker
The prototype opens on a **"Log in as…"** screen — a clean grid of role cards (Superintendent, Principal, Teacher, Counselor, Front-office Admin, Special Education, Student, Parent), each with a name, photo/avatar, school, and one-line role descriptor from the sample cast (§5). Selecting a card enters that role's experience. A persistent "switch role" control (top bar) returns here. This is the device that makes "one system, many lenses" tangible — it should feel intentional, almost like a demo console.

### 3.2 The app shell (every role)
- **Top bar:** Riverside Platform wordmark · district/school context switcher (Superintendent & Principal only) · global search · **Assistant** button (opens the brain) · notifications/alerts bell · profile + "switch role." A small persistent **"🔒 Data stays in your district"** trust mark.
- **Left nav:** role-specific items (defined per role below). Active item uses the role accent.
- **Main area:** the role's home view by default.

### 3.3 The brain (universal AI assistant)
A right-side slide-over panel, reachable from anywhere via the top-bar Assistant button. Same component everywhere; **content is permission-scoped to the active role.** Each answer:
- is written in plain language,
- includes **source citations** as little chips ("Synergy · Attendance," "RUSD Policy §4.2," "Google Classroom · Algebra I") that visually prove it's grounded,
- may include an inline mini-chart, table, or action button (e.g., "Draft this message," "Generate board summary").
- Show 2–3 suggested prompts per role so reviewers know what to try.

### 3.4 Proactive alerts
A consistent **alert card** pattern (used in the notifications panel and surfaced on home screens): severity dot (amber/red), a plain-language headline ("Diego Marquez's attendance dropped to 82%"), a one-line "why this matters," and 1–2 actions ("View student," "Notify counselor," "Draft parent message"). At least one proactive alert must appear per role so the "speaks first" behavior is felt everywhere.

### 3.5 Permission scoping (make it visible)
Where a role can't see something, show it as a designed boundary, not a dead end — e.g., a teacher's student profile shows "Counseling notes — visible to counselors only" as a quiet locked row. This turns FERPA scoping into a trust feature.

---

## 4. Shared components (build once, reuse everywhere)

- **KPI / metric tile:** big tabular number, label, trend sparkline, vs-prior delta, status color.
- **Trend chart card:** titled, labeled axes, one or two series.
- **Comparison bar card:** e.g., the three schools side by side.
- **Data table:** sortable look, status pills, row actions, search/filter chips. Used for rosters, caseloads, attendance lists.
- **Alert card** (§3.4).
- **Student profile drawer:** a slide-in summary reused across roles (photo, grade, school, attendance %, GPA/grades, flags, recent activity) — with role-scoped sections.
- **Assistant panel** (§3.3) with the **source-citation chip** sub-component.
- **Message composer** with a **translation toggle/indicator** (shows original + translated language).
- **Report preview** (board/exec summary rendered as a clean document).
- **"Replaces" badge** (optional): small tag noting which legacy subscription a feature subsumes — useful for the sales narrative.

---

## 5. Sample-data world (use these names consistently across every role)

Consistency is what makes the prototype feel real: the same at-risk student should appear in the superintendent's alert, the counselor's caseload, the teacher's roster, and the parent's home. Use this cast everywhere.

**District:** Riverside Unified School District (RUSD), Arizona · ~3,000 students · SIS: Synergy
**Superintendent:** Dr. Alicia Romero

**Schools**
| School | Level | Students | Principal | Notes |
|---|---|---|---|---|
| **Maricopa Institute of Technology (MIT)** *(focus)* | High (9–12) | 1,180 | Marcus Bell | STEM magnet; the deeply built-out school |
| Riverside Traditional | K–8 | 820 | Janet Okafor | lighter data |
| Kings Ridge | High (9–12) | 1,000 | Tom Whitfield | lighter data |

**MIT staff:** Ms. Sarah Chen (Algebra I / Math), Mr. David Park (Biology), Ms. Priya Nair (Counselor), Linda Alvarez (Front-office Admin), Robert Hayes (Special Education Coordinator).

**MIT students (the recurring cast)**
| Student | Grade | Storyline (drives alerts & demos) |
|---|---|---|
| **Diego Marquez** | 9 | Attendance fell 95% → 82% over six weeks — the headline at-risk story; Spanish-speaking household |
| **Sophia Reyes** | 12 | Two credits short for graduation — counselor alert |
| **Tyler Nguyen** | 10 | Struggling specifically with fractions/linear equations in Algebra I — teacher "who needs help" story |
| Aisha Johnson | 11 | High achiever, college-bound — counselor college/career + student success story |
| Marcus Lee | 9 | IEP for reading; special-ed compliance + accommodation story |

**Parents:** Maria Marquez (Diego's mother, **prefers Spanish** — drives the translation demo).

**Illustrative district numbers (keep consistent across screens):** district attendance 93.4%; chronic absenteeism 14% (MIT 17%, trending up); on-track-for-graduation 88%; ~40% of families' home language is Spanish. Make MIT's numbers slightly worse than district average so there's something for the AI to "find."

---

## 6. Role specifications

For each role: **who they are → home screen → left nav → signature workflows (the "wow" moments) → proactive alert → scoped chat prompts.** Build all eight roles. MIT is the populated school; other schools can show lighter/placeholder data.

### 6.1 Superintendent — *Dr. Alicia Romero* (district lens; sees everything)
**Home:** District command center. Top row KPI tiles (enrollment, attendance, chronic absenteeism, on-track-to-graduate, climate index). A three-school comparison bar card. A "What needs your attention" alert stack. A trend chart (district attendance over the term). Operational health row with **embedded dashboards** for IT, Transportation, and Food Services (compact tiles that expand — *these are modules here, not separate logins*).
**Left nav:** Overview · Schools · Academics · Attendance · Behavior & Climate · Staff · Operations (IT / Transportation / Food Services) · Reports · Assistant.
**Signature workflows:**
1. **Ask-the-brain, cross-school** *(the headline demo):* open Assistant → "Compare chronic absenteeism across the three schools this quarter and tell me what's driving MIT's number." → grounded answer with a mini bar chart + citation chips (Synergy · Attendance) naming MIT's 17% and a contributing pattern.
2. **One-click board report:** Reports → "Generate this month's board summary" → a clean report-preview document assembles from live-looking data (attendance, academics, finance, climate) with an export affordance. Caption the time saved.
3. **Drill to a school:** context switcher → MIT → the overview rescopes to MIT only, principal-style.
**Proactive alert:** "MIT chronic absenteeism up 3 pts this quarter — concentrated in 9th grade." Actions: View MIT · Notify Principal Bell.
**Chat prompts:** "Where are we winning this term?" · "Which school needs instructional support most and why?" · "Summarize MIT's 9th-grade attendance problem for the board."

### 6.2 Principal — *Marcus Bell, MIT* (single-school lens)
**Home:** Same shape as superintendent, scoped to one campus. School KPIs, grade-level breakdowns, a teacher-support signal panel (framed as *support*, not surveillance — "grade levels/teachers who may need resources"), today's attendance, and the school's alert stack.
**Left nav:** Overview · Grades & Performance · Attendance · Behavior · Teachers · Operations · Reports · Assistant.
**Signature workflows:**
1. **Grade-level deep dive:** open 9th grade → see the attendance dip, the cluster of affected students (Diego among them), and an AI-suggested intervention plan.
2. **Teacher support view:** identify where instructional outcomes lag and what coaching/resources the AI recommends.
3. **Climate check:** open the climate panel → AI flags declining morale in a grade level from survey signals, with a suggested response.
**Proactive alert:** "9th-grade attendance cluster forming — 6 students trending toward chronic absence." Action: View cohort · Loop in counselor.
**Chat prompts:** "Which of my teachers might need support and in what?" · "What's behind the 9th-grade attendance dip?" · "Draft a staff update on our attendance push."

### 6.3 Teacher — *Ms. Sarah Chen, Algebra I* (Google Classroom connected)
**Home:** "My day" — today's classes, a Google-Classroom-connected panel (lesson plans, assignments, submission status), and a **"Who needs help"** panel listing students lagging by topic (Tyler Nguyen → fractions/linear equations). Roster attendance at a glance.
**Left nav:** Today · Classes · Assignments · Students · Attendance · Resources · Assistant. Show a small "Connected: Google Classroom ✓" state.
**Signature workflows:**
1. **Who-needs-help → act:** open the panel → Tyler Nguyen flagged on fractions → "Generate a re-teach plan" → AI produces a short targeted plan + a differentiated worksheet, plus "Draft parent note."
2. **Grade & feedback assist:** open an assignment → AI drafts rubric-based feedback on submissions for the teacher to review/approve (review state shown).
3. **Lesson in minutes:** Resources → enter a standard → AI generates a lesson plan, activity, and quick assessment.
**Proactive alert:** "3 students missed the fractions quiz benchmark — re-teach suggested before Friday's unit test." Action: Generate plan.
**Chat prompts:** "Who in 2nd period is falling behind and on what?" · "Make three versions of tonight's homework (advanced / on-level / support)." · "Draft a friendly nudge to parents of students missing assignments."

### 6.4 Counselor — *Ms. Priya Nair, MIT*
**Home:** Caseload dashboard. Graduation-readiness panel (Sophia Reyes flagged: 2 credits short), a wellness/referral watch list (pattern detection across attendance/grades/behavior), and college/career readiness highlights (Aisha Johnson).
**Left nav:** Caseload · Graduation Tracking · Wellness & Referrals · College & Career · Meetings · Assistant.
**Signature workflows:**
1. **Off-track-for-graduation list:** Graduation Tracking → ranked list of at-risk seniors with the specific gap and an AI-suggested intervention per student.
2. **Wellness pattern catch:** Wellness → AI surfaces a student whose combined signals (attendance + grade drop + referrals) warrant a check-in, with context.
3. **College/career match:** open Aisha → AI recommends scholarships and pathways matched to her record and interests.
**Proactive alert:** "Sophia Reyes is 2 credits short for June graduation — intervention window closing." Action: View plan · Schedule meeting.
**Chat prompts:** "Which juniors are trending off-track and why?" · "Draft a check-in plan for Diego Marquez." · "Find scholarships matching Aisha's profile."

### 6.5 Front-office Admin — *Linda Alvarez, MIT*
**Home:** Today's attendance board (who's absent now), a follow-up queue, the family directory, and the tour/visitor schedule.
**Left nav:** Attendance · Families & Contacts · Communication · Tours & Visitors · Enrollment · Assistant.
**Signature workflows:**
1. **Translated absence outreach** *(translation demo):* today's absences → select Diego → "Call/Message parent" → composer opens with Maria Marquez; toggle shows the message auto-translated to Spanish (original + translated side by side). Flags students absent 3+ days.
2. **Tour scheduling:** Tours → book a new family tour into an open slot; confirmation auto-translates if the family's language differs.
3. **Family lookup + history:** search a family → unified contact card with students, attendance, prior communications.
**Proactive alert:** "5 students absent 3+ days this week — follow-up calls recommended." Action: Open call list (pre-translated).
**Chat prompts:** "Who's absent today and who needs a parent call?" · "Draft today's absence follow-ups, translated per family." · "Schedule a campus tour for the Reyes family next week."

### 6.6 Special Education — *Robert Hayes, Coordinator* (tightest permissions; show that)
**Home:** Compliance watch (upcoming IEP annual reviews / reevaluations with deadline countdowns), active IEP caseload, and a goal-progress overview. A visible "Restricted — Special Education access" banner reinforces scoping.
**Left nav:** Caseload · IEP Goals · Compliance · Meetings · Documents · Assistant.
**Signature workflows:**
1. **IEP goal drafting & tracking:** open Marcus Lee → AI drafts measurable annual reading goals and shows progress tracking.
2. **Compliance deadline catch:** Compliance → AI flags an annual review due in 12 days; one click drafts the notice.
3. **Parent-friendly IEP summary:** after a meeting → AI generates a plain-language summary for the family (translatable).
**Proactive alert:** "Marcus Lee's annual IEP review due in 12 days." Action: Prep documents · Schedule meeting.
**Chat prompts:** "Which reviews are due in the next 30 days?" · "Draft progress notes for Marcus Lee's reading goals." · "Summarize today's IEP meeting for the parent in plain language."

### 6.7 Student — *Aisha Johnson (success view) & Tyler Nguyen (catch-up view)* (build one student login; default to a student with a gap so the help is visible)
**Home:** "How I'm doing" — friendly performance overview (strengths in green, focus areas in amber), today's assignments, and a personalized catch-up plan on weak topics. A safe, always-available tutor.
**Left nav:** My Progress · My Classes · Get Help (tutor) · Study Tools · Goals · Assistant.
**Signature workflows:**
1. **Personalized catch-up:** My Progress → "Fractions need work" → a step-by-step plan + practice; the tutor explains at the student's level.
2. **24/7 tutoring:** Get Help → ask an Algebra question late at night → step-by-step guidance (not just the answer).
3. **Study tools:** generate flashcards / a practice quiz for an upcoming test; writing feedback on a draft.
**Proactive nudge (gentle):** "You're close to mastering linear equations — 15 minutes of practice could get you there." Action: Start practice.
**Chat prompts:** "Explain this fractions problem step by step." · "Quiz me for Friday's Algebra test." · "Help me improve this paragraph."
*Keep tone encouraging and age-appropriate; no harsh framing.*

### 6.8 Parent — *Maria Marquez* (Diego's mother; Spanish preference drives the localization moment)
**Home:** Their child's snapshot — attendance, grades, what it means in plain language — and clear "how to support at home" guidance. Multi-child households list all students. **The whole interface can render in Spanish** (show a language toggle, default Spanish for Maria).
**Left nav:** My Child · Attendance · Grades · Support at Home · Messages · Assistant.
**Signature workflows:**
1. **Plain-language status + support:** open Diego → "attendance is slipping; here's what's happening and three things you can do at home," with a one-tap "Message the counselor."
2. **Translated two-way messaging:** Messages → write to Ms. Chen in Spanish; she receives it in English; replies come back translated.
3. **Whole-language UI:** toggle the entire app between English/Spanish to show the localization depth.
**Proactive alert:** "Diego has missed 4 days this month — here's how to help and who to contact." Action: Message counselor · See support tips.
**Chat prompts (in Spanish for Maria):** "¿Cómo va Diego este mes?" · "¿Cómo puedo ayudar a Diego con matemáticas?" · "Envía un mensaje a su consejera."

---

## 7. The signature demo narrative (the 5-minute walkthrough)

Design so this exact path flows cleanly; it's how the product gets sold:
1. **Role picker** → enter as **Superintendent Romero**.
2. Home shows the proactive **MIT absenteeism alert**.
3. Open the **Assistant** → cross-school question → grounded, source-cited answer with a mini chart. *(The "aha.")*
4. **One-click board report** assembles. *(The time-saver.)*
5. **Switch role** → **Teacher Chen** → "Who needs help" → Tyler → **generate re-teach plan + parent note**. *(Same system, totally different product.)*
6. **Switch role** → **Front-office Admin** → Diego absence → **translated Spanish outreach** to Maria. *(The unification + equity moment.)*
7. **Switch role** → **Parent Maria** (UI in Spanish) → sees Diego's status and messages the counselor. *(The loop closes — the same student, seen by four people, one system.)*

The recurring cast (Diego, Tyler, Sophia) tying these screens together is what makes it land. Keep their data consistent across every role.

---

## 8. Cross-cutting requirements

- **Source citations** on every AI answer (chips). Non-negotiable trust cue.
- **Multilingual layer:** translation toggle/indicator on all communications; full Spanish UI for the parent role.
- **Permission scoping shown** as designed boundaries (§3.5).
- **Audit/traceability:** at least represent it (e.g., a quiet "view access log" affordance on a student profile) so the trust story is visible.
- **"Data stays in your district" trust mark** persistent in the shell.
- **Single sign-on concept:** the role picker itself communicates "one login per person replaces the pile."
- **Accessibility:** AA contrast, real text, legible charts, scalable type, sensible focus states.

---

## 9. Screen inventory (build checklist)

**Global:** Role picker · App shell (top bar + nav) · Assistant panel · Notifications/alerts panel · Student profile drawer · Message composer (with translation) · Report preview.
**Superintendent:** Overview · School comparison/drill · Reports/board summary · Operations dashboards (IT, Transportation, Food Services).
**Principal:** School overview · Grade-level deep dive · Teacher-support view · Climate panel.
**Teacher:** Today · Who-needs-help → re-teach generator · Assignment + feedback assist · Lesson generator.
**Counselor:** Caseload · Graduation tracking · Wellness watch · College/career match.
**Admin:** Attendance board · Translated outreach composer · Family directory/card · Tour scheduling.
**Special Education:** Caseload · IEP goal drafting · Compliance deadlines · Parent-summary generator.
**Student:** My Progress · Catch-up plan · Tutor chat · Study tools.
**Parent:** Child snapshot (EN/ES) · Attendance/grades · Support-at-home · Translated messaging.

---

## 10. Mocking & content notes for the designer

- All metrics, names, and AI responses are **scripted**; use the §5 cast and numbers verbatim for cross-screen consistency.
- AI answers should look *generated but reviewed* — show the source chips and, where relevant, a "review before sending" state.
- MIT is fully populated; Riverside Traditional and Kings Ridge can show lighter data and a few placeholders.
- Prefer realistic, slightly-imperfect numbers (MIT worse than district average) so the AI has something to "find."
- Desktop-first at ~1440px; the parent and student roles should also read well at a smaller/tablet width since families use phones.

---

## 11. Open items for handoff

- Final product name / wordmark (placeholder "Riverside Platform" for now).
- Confirm the role-accent palette direction in §2.
- Anything to add to the operational dashboards (currently IT / Transportation / Food Services as embedded tiles).

*After Claude Design produces the prototype, the next step is the Claude Code build spec — out of scope for this document.*
