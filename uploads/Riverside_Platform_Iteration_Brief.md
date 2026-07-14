# Riverside Platform — Design Iteration Brief (for Claude Design)

**Source:** Product review meeting (Jun 29) with Tony (advisor with district relationships), Jonathan (built the current prototype), and Ivan.
**Read alongside:** the existing PRD. This document does **not** replace it — it captures the changes and reprioritization from the review. Where the two conflict, this brief wins.
**One-line summary of the change:** Flip the product from a click-heavy dashboard/CRM into a **conversation-first "school brain"** that spots trends, surfaces them on open, and offers one-click actions — with the dashboard demoted to a secondary "dive deeper" view.

---

## 1. The headline change: conversation-first, dashboard-second

The current build reads as an LMS/CRM with lots of tabs and buttons. The strong feedback: decision-makers don't want "another system to log into and learn." They want AI that *feels magical* — it does the work, they just check on it. So restructure around a chat.

**New primary view (every role):** a calm, simple chat — ChatGPT-like — that has full context about *their* school/district.
- On open, it **proactively greets them with what they should know today**, per school: "Here are a few things to be aware of at MIT today… and at Riverside Traditional…" The user does not go hunting for this; the system spots the trends and brings them up.
- From there it's a conversation: they ask follow-ups about anything it flagged, and they can **generate reports directly from the chat**.
- Suggested/recommended prompts and the day's alerts are visible on entry so they don't have to think about what to ask.

**Secondary view (the current build):** the dashboard/CRM becomes the **"dive into your data"** layer, reached via **interlinks from the chat**. When the brain spots something, a trend or alert links straight into the relevant dashboard screen. This view exists for the cases chat can't handle cleanly: disambiguating (e.g., three students with the same name), manual selection, picking report parameters, and detailed history.

**Why:** reduce the amount of explaining required in a pitch. A chat that talks back and acts feels like a "big brain." A grid of buttons feels like work. Keep the depth — just don't lead with it.

> Apply this primary/secondary structure to **all** personas, not just the superintendent. Each role opens into its own scoped brain; each can drop into its own dashboard when needed.

---

## 2. Cross-cutting principle: spot → inform → **act** (every role, every screen)

This is the most important behavioral requirement and it must run through every persona. Every insight is incomplete unless it ends in an action.

1. **Spot** a trend (e.g., "10% of students absent today," "MIT 9th-grade attendance dipping").
2. **Inform** in plain language with the relevant number/chart.
3. **Act** — offer one-click steps appropriate to the role. Examples surfaced in the meeting:
   - Send a text / call to the relevant parents.
   - For a superintendent: "Call the admin at that school to find out why," or one-click **generate a report and route it to both the superintendent and that school's principal** so they can discuss.
   - **Schedule a meeting via calendar integration:** "Set up a meeting with this principal Thursday" → it checks calendars, finds a time, **grabs the context of what the conversation should be about, and drops that context/report into the invite.**
   - **"Send to phone"** — push the flagged item to the user's phone so they can walk the building with it.

Build persona-appropriate actions for principal, teacher, counselor, admin, parent, and student too — not just the superintendent. Trend + data + actionable next step, every time.

---

## 3. Make it feel alive ("the magic")

The pitch wins on *feeling* like AI is actively working. Add motion and live-looking behavior:

- **Live "School Health" score** per school that moves through the day on mock data (ticks up and down hour to hour).
- **Threshold automation, shown happening:** when a school's health crosses a line (e.g., drops below ~90%), an automated alert/email fires *by category* — show the email going out. This demonstrates "the system is watching and acting even when no one is logged in."
- **A concrete attendance-magic moment to build:** show "5 teachers checked in · 27 of 30 students present · 3 absent," then **one click → report sent immediately.** Emphasize the time saved versus doing it by hand.
- Lean visual: charts that animate, a sense of a brain working, not a static console.

---

## 4. Reprioritize around the actual pitch

Superintendents care, in order, about:

1. **Recruitment / enrollment ("butts in seats") + Attendance** ← lead here
2. **Grades & Resources** (secondary)

Design implications: keep **attendance front-and-center** in every view, add a **recruitment/marketing surface** (next section), and treat the **local AI data center as a recruitment asset**, not just infrastructure — a talking point the school can market to parents ("MIT runs its own secure, internal AI data center so your student stays ahead"), engineered to create parent FOMO.

---

## 5. New surface: Recruitment & Marketing (enrollment funnel)

A new area, mostly mock data, aimed squarely at the "how do we get more students enrolled" question.

- **Tours → enrollment funnel** with mock numbers, e.g.: 17 visit requests → 13 showed up → 2 enrolled, with conversion rates and trend.
- **Capture the "why":** intake/survey questions at tour booking feed the brain — why they inquired, why they showed, why they converted (or didn't). Surface those insights.
- **Auto-PDF on inquiry:** when a tour/inquiry is submitted, a polished school-info PDF is automatically emailed to the parent.
- **Digital-marketing aggregation (mock, ~3% return shown):** weekly Facebook / Instagram / Google views and ad performance, with actionable suggestions. *Note: flagged as a bigger, "slippery-slope" build — for the prototype, show it as a forward-looking aggregated dashboard on mock data, not a real ad-platform integration.*

---

## 6. Data sources (update from the PRD)

- **Synergy (Edupoint) is the PRIMARY integration** — it already aggregates attendance, communication, enrollment, and more, and Riverside uses it. Access is via an API license key (requested from Edupoint tech services if they sign on). The API exposes, at least: **classes, enrollments, users, admins, reports, courses, demographics, roles, grading periods, organizations, terms, results, school years, department, class codes, and class sync.** Treat Synergy as the system of record for attendance/grades/enrollment/communication.
- **Google Classroom** remains the **lesson-plan layer** for teachers (they live there, and being "Google certified" is a badge of honor — keep that integration visible and respected). Re-teach plans push *back* to Google Classroom; parent messages route through Synergy.
- **Finance/inventory = "Visions"** — API likely limited; research pending; **not** a prototype build item.
- **Future aggregation:** Transportation and Food Services each have their own software to fold in later. IT/devices likely not needed. (See backlog.)

---

## 7. Per-role refinements (layered on the PRD)

- **Superintendent** — opens into the brain: "Here's what to know across MIT, Kings Ridge, and Riverside Traditional today." Cross-school **attendance comparison stays the hero** (MIT visibly higher absence). One-click **board summary** + per-category reports (**academics, attendance, behavior, staff**) showing **last week / last month vs. now** with charts, exportable to PDF and shareable with principals/teachers. Frame as "boss of AI." **Personalize with real names** in the assistant and headers (confirm spellings — see §10).
- **Principal** — same conversation-first pattern scoped to one campus; keep on-track-to-graduate and attendance-by-grade; every flag is actionable (loop in counselor, message parents, schedule a meeting).
- **Teacher** — keep the strong existing flow: who-needs-help → **generate re-teach plan → push to Google Classroom → draft parent note (sent via Synergy)**. Minimize friction by auto-pulling from Synergy + Classroom so it never feels like "another place to work." Make the assistant prominent.
- **Counselor** — actionable interventions on at-risk, graduation gaps, and wellness patterns.
- **Front-office Admin** — attendance + **3+-day absentee list** with **auto-drafted follow-ups (follow-up #1, #2)**, one-tap call/message parent, and a **tours calendar** with open slots → book a family → **auto-create the Google Calendar event and auto-email the parent.**
- **Parent** — value prop framing: "how AI helps your student perform better, how to support at home, and how this sets them up for college." Keep translated communication.
- **Student** — value prop framing: "how AI helps *you* learn" (e.g., coding, or math worked **step-by-step, never just the answer**).

---

## 8. De-emphasize / handle gracefully

- **Behavior & Climate:** do **not** leave empty tabs that require lengthy explanation. Either hide them, or present them as **"possibilities" cards** — example AI inferences on mock data ("AI could flag this pattern from X and Y") — so the capability reads without a lecture. Keep the demo's center of gravity on the overview + chat.
- **Academics:** treat as behind-the-scenes ("their licensing — they don't think about it until the end"). Light touch only; an optional small flourish like library-checkout data is fine, but don't over-build.
- **General:** cut button sprawl on the overview. The overview + assistant should be the focus; deeper data is one interlink away.

---

## 9. Backlog (note in the design, do not build now)

- **Meeting-brain / institutional memory:** transcribe Zoom meetings (à la Granola) → feed the big brain → leaders ask "what happened in this meeting?" and get a summary with stated commitments; a week later the OS follows up ("this teacher said X would be done — it isn't — follow up?").
- **Per-classroom AI hardware** feeding the school's main node (hardware vision).
- **WiseNet camera AI metrics** integration.
- **Full digital-marketing / ad-platform** integration (beyond the mock dashboard in §5).
- **Transportation, Food Services, Finance (Visions)** aggregation.

---

## 10. Open questions before/while designing

1. **Chat-first for everyone, or leadership first?** Confirm whether the conversation-first primary view replaces the dashboard default for **all** roles immediately, or starts with superintendent/principal while others stay dashboard-led.
2. **Marketing scope for the prototype** — how far to take the digital-marketing aggregation mock (single summary tile vs. a fuller funnel + ad view).
3. **Names to hardcode for personalization** — confirm correct names/titles for the superintendent-level demo (e.g., Dr. Huerta, Rivera, Jaime, Dr. Gutierrez) and that Riverside's logo/branding should appear throughout.

---

### Updated demo narrative (target ~5 minutes)
Open as the **Superintendent** straight into the **brain**, which proactively flags MIT's higher absence across the three schools → ask a follow-up → it offers **actionable steps** (one-click report routed to the principal + "schedule a meeting Thursday" with auto-generated context) and a **"send to phone"** option → optionally interlink **into the dashboard** to see exactly who's absent. Then switch roles (Teacher → re-teach plan pushed to Classroom; Admin → translated absentee follow-ups; Parent → sees it, in Spanish) to show one system becoming many. Keep **recruitment + attendance** as the lead story throughout.
