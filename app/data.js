/* ============================================================
   Riverside Platform — sample-data world (all scripted/mock)
   Exposed as window.RP. Consistent cast across every role.
   ============================================================ */
(function () {
  const RP = {};

  /* ---- District-level figures (kept consistent everywhere) ---- */
  RP.district = {
    name: "Riverside Unified School District",
    short: "RUSD",
    state: "Arizona",
    sis: "Synergy",
    students: 3000,
    attendance: 93.4,
    chronicAbsenteeism: 14,
    onTrackGrad: 88,
    climateIndex: 7.6, // out of 10
    spanishHomes: 40,
  };

  /* ---- Schools ---- */
  RP.schools = [
    {
      id: "mit", name: "Maricopa Institute of Technology", short: "MIT", level: "High · 9–12",
      students: 1180, principal: "Marcus Bell", focus: true,
      attendance: 91.8, chronic: 17, onTrack: 84, climate: 7.1,
      note: "STEM² magnet · deeply built-out campus",
    },
    {
      id: "rt", name: "Riverside Traditional", short: "RT", level: "K–8",
      students: 820, principal: "Janet Okafor", focus: false,
      attendance: 94.6, chronic: 11, onTrack: null, climate: 8.0,
      note: "Elementary / middle",
    },
    {
      id: "kr", name: "Kings Ridge", short: "KR", level: "High · 9–12",
      students: 1000, principal: "Tom Whitfield", focus: false,
      attendance: 93.9, chronic: 12, onTrack: 90, climate: 7.8,
      note: "Comprehensive high",
    },
  ];

  /* ---- Recurring student cast ---- */
  RP.students = {
    diego: {
      id: "diego", name: "Diego Marquez", grade: 9, school: "MIT",
      attendance: 82, attendanceTrend: [95, 94, 92, 89, 85, 82],
      gpa: 2.4, status: "danger", language: "Spanish (home)",
      flags: ["Attendance declining", "Spanish-speaking household"],
      story: "Attendance fell 95% → 82% over six weeks. Headline at-risk story.",
      guardian: "Maria Marquez (mother)",
      classes: [
        { name: "Algebra I", teacher: "Ms. Sarah Chen", grade: "C-", trend: "down" },
        { name: "Biology", teacher: "Mr. David Park", grade: "C", trend: "flat" },
        { name: "English 9", teacher: "Ms. Holt", grade: "B-", trend: "down" },
        { name: "World History", teacher: "Mr. Ruiz", grade: "C+", trend: "flat" },
      ],
      absences: 11,
    },
    sophia: {
      id: "sophia", name: "Sophia Reyes", grade: 12, school: "MIT",
      attendance: 90, gpa: 2.9, status: "warning", language: "English",
      flags: ["2 credits short for June graduation"],
      story: "Two credits short for graduation — counselor alert.",
      guardian: "Elena Reyes (mother)",
      creditGap: { needed: 22, earned: 20, missing: ["Economics (0.5)", "Lab Science (1.0)", "Fine Arts (0.5)"] },
      classes: [
        { name: "AP Government", teacher: "Mr. Ruiz", grade: "B", trend: "up" },
        { name: "Statistics", teacher: "Ms. Chen", grade: "B-", trend: "flat" },
      ],
    },
    tyler: {
      id: "tyler", name: "Tyler Nguyen", grade: 10, school: "MIT",
      attendance: 96, gpa: 3.0, status: "warning", language: "English",
      flags: ["Struggling: fractions & linear equations"],
      story: "Struggling specifically with fractions / linear equations in Algebra I.",
      guardian: "Lan Nguyen (mother)",
      classes: [
        { name: "Algebra I", teacher: "Ms. Sarah Chen", grade: "D+", trend: "down" },
        { name: "Chemistry", teacher: "Dr. Vance", grade: "B", trend: "flat" },
      ],
      topicMastery: [
        { topic: "Integers & operations", pct: 88 },
        { topic: "Ratios & proportions", pct: 74 },
        { topic: "Fractions", pct: 41 },
        { topic: "Linear equations", pct: 38 },
        { topic: "Graphing", pct: 52 },
      ],
    },
    aisha: {
      id: "aisha", name: "Aisha Johnson", grade: 11, school: "MIT",
      attendance: 99, gpa: 4.1, status: "success", language: "English",
      flags: ["High achiever · college-bound"],
      story: "High achiever, college-bound. College/career + student success story.",
      guardian: "Denise Johnson (mother)",
      interests: ["Biomedical engineering", "Robotics", "AP Biology"],
      classes: [
        { name: "AP Biology", teacher: "Mr. David Park", grade: "A", trend: "up" },
        { name: "AP Calculus", teacher: "Ms. Chen", grade: "A-", trend: "flat" },
        { name: "AP Chemistry", teacher: "Dr. Vance", grade: "A", trend: "up" },
      ],
    },
    marcus: {
      id: "marcus", name: "Marcus Lee", grade: 9, school: "MIT",
      attendance: 93, gpa: 2.7, status: "warning", language: "English",
      flags: ["IEP — Reading", "Annual review due in 12 days"],
      story: "IEP for reading. Special-ed compliance + accommodation story.",
      guardian: "Karen Lee (mother)",
      iep: {
        category: "Specific Learning Disability — Reading",
        reviewDue: "in 12 days",
        accommodations: ["Extended time (1.5×)", "Text-to-speech", "Small-group testing", "Chunked assignments"],
        goals: [
          { goal: "Read grade-level text at 120 WPM with 90% accuracy", baseline: "78 WPM", current: "104 WPM", target: "120 WPM", pct: 62 },
          { goal: "Identify main idea & 2 supporting details in informational text", baseline: "30%", current: "68%", target: "80%", pct: 76 },
        ],
      },
    },
  };

  RP.parents = {
    maria: {
      id: "maria", name: "Maria Marquez", child: "diego",
      language: "es", languageLabel: "Español",
      story: "Diego's mother. Prefers Spanish — drives the translation demo.",
    },
  };

  /* ============================================================
     ROLES — the login picker cast
     ============================================================ */
  RP.roles = [
    { id: "superintendent", title: "Superintendent", name: "Dr. Alicia Romero", school: "Riverside Unified District", descriptor: "District lens — sees everything", initials: "AR" },
    { id: "principal", title: "Principal", name: "Marcus Bell", school: "Maricopa Institute of Technology", descriptor: "Single-school leadership — MIT", initials: "MB" },
    { id: "teacher", title: "Teacher", name: "Ms. Sarah Chen", school: "MIT · Algebra I / Math", descriptor: "Google Classroom connected", initials: "SC" },
    { id: "counselor", title: "Counselor", name: "Ms. Priya Nair", school: "Maricopa Institute of Technology", descriptor: "Caseload, graduation & wellness", initials: "PN" },
    { id: "admin", title: "Front-office Admin", name: "Linda Alvarez", school: "Maricopa Institute of Technology", descriptor: "Attendance, families & communication", initials: "LA" },
    { id: "sped", title: "Special Education", name: "Robert Hayes", school: "MIT · Sped Coordinator", descriptor: "Tightest permissions — IEP & compliance", initials: "RH" },
    { id: "student", title: "Student", name: "Tyler Nguyen", school: "MIT · Grade 10", descriptor: "Catch-up view — sees the help", initials: "TN" },
    { id: "parent", title: "Parent", name: "Maria Marquez", school: "Parent of Diego Marquez · Grade 9", descriptor: "Interface in Spanish", initials: "MM" },
  ];

  RP.roleById = Object.fromEntries(RP.roles.map((r) => [r.id, r]));

  /* Spanish nav + role label for the parent's full-Spanish UI */
  RP.navES = {
    parent: [
      { id: "child", label: "Mi Hijo", icon: "user" },
      { id: "attendance", label: "Asistencia", icon: "calendar" },
      { id: "grades", label: "Calificaciones", icon: "book" },
      { id: "support", label: "Apoyo en Casa", icon: "heart" },
      { id: "messages", label: "Mensajes", icon: "message" },
    ],
  };
  RP.roleLabelES = { parent: "Familia" };
  RP.roleTitleES = { parent: "Padre / Madre" };

  /* ---- Per-role accent label (subtle — chrome stays purple/gold) ---- */
  RP.roleLabel = {
    superintendent: "District",
    principal: "Campus",
    teacher: "Classroom",
    counselor: "Counseling",
    admin: "Front Office",
    sped: "Special Education",
    student: "Student",
    parent: "Family",
  };

  /* ============================================================
     NAVIGATION per role  [{id,label,icon}]
     ============================================================ */
  RP.nav = {
    superintendent: [
      { id: "overview", label: "Overview", icon: "grid" },
      { id: "schools", label: "Schools", icon: "building" },
      { id: "academics", label: "Academics", icon: "book" },
      { id: "attendance", label: "Attendance", icon: "calendar" },
      { id: "climate", label: "Behavior & Climate", icon: "heart" },
      { id: "staff", label: "Staff", icon: "users" },
      { id: "operations", label: "Operations", icon: "settings" },
      { id: "reports", label: "Reports", icon: "file" },
    ],
    principal: [
      { id: "overview", label: "Overview", icon: "grid" },
      { id: "grades", label: "Grades & Performance", icon: "book" },
      { id: "attendance", label: "Attendance", icon: "calendar" },
      { id: "behavior", label: "Behavior", icon: "heart" },
      { id: "teachers", label: "Teachers", icon: "users" },
      { id: "operations", label: "Operations", icon: "settings" },
      { id: "reports", label: "Reports", icon: "file" },
    ],
    teacher: [
      { id: "today", label: "Today", icon: "sun" },
      { id: "classes", label: "Classes", icon: "book" },
      { id: "assignments", label: "Assignments", icon: "check" },
      { id: "students", label: "Students", icon: "users" },
      { id: "attendance", label: "Attendance", icon: "calendar" },
      { id: "resources", label: "Resources", icon: "folder" },
    ],
    counselor: [
      { id: "caseload", label: "Caseload", icon: "users" },
      { id: "graduation", label: "Graduation Tracking", icon: "cap" },
      { id: "wellness", label: "Wellness & Referrals", icon: "heart" },
      { id: "college", label: "College & Career", icon: "compass" },
      { id: "meetings", label: "Meetings", icon: "calendar" },
    ],
    admin: [
      { id: "attendance", label: "Attendance", icon: "calendar" },
      { id: "families", label: "Families & Contacts", icon: "users" },
      { id: "communication", label: "Communication", icon: "message" },
      { id: "tours", label: "Tours & Visitors", icon: "map" },
      { id: "enrollment", label: "Enrollment", icon: "edit" },
    ],
    sped: [
      { id: "caseload", label: "Caseload", icon: "users" },
      { id: "goals", label: "IEP Goals", icon: "target" },
      { id: "compliance", label: "Compliance", icon: "shield" },
      { id: "meetings", label: "Meetings", icon: "calendar" },
      { id: "documents", label: "Documents", icon: "file" },
    ],
    student: [
      { id: "progress", label: "My Progress", icon: "chart" },
      { id: "classes", label: "My Classes", icon: "book" },
      { id: "help", label: "Get Help", icon: "help" },
      { id: "tools", label: "Study Tools", icon: "folder" },
      { id: "goals", label: "Goals", icon: "target" },
    ],
    parent: [
      { id: "child", label: "My Child", icon: "user" },
      { id: "attendance", label: "Attendance", icon: "calendar" },
      { id: "grades", label: "Grades", icon: "book" },
      { id: "support", label: "Support at Home", icon: "heart" },
      { id: "messages", label: "Messages", icon: "message" },
    ],
  };

  /* Conversation-first: prepend the Home (brain) to every role; the
     dashboard sections become the "dive deeper" layer. */
  Object.keys(RP.nav).forEach((role) => {
    RP.nav[role] = [{ id: "brain", label: "Home", icon: "sparkle" }, ...RP.nav[role]];
  });
  /* Recruitment surface for enrollment-focused roles */
  RP.nav.superintendent.splice(3, 0, { id: "recruitment", label: "Recruitment", icon: "trending" });
  RP.nav.principal.splice(2, 0, { id: "recruitment", label: "Recruitment", icon: "trending" });
  RP.nav.admin.splice(4, 0, { id: "recruitment", label: "Recruitment", icon: "trending" });
  if (RP.navES && RP.navES.parent) RP.navES.parent = [{ id: "brain", label: "Inicio", icon: "sparkle" }, ...RP.navES.parent];

  /* ============================================================
     BRAIN — conversation-first home config per role
     (the day's flags reuse RP.alerts; prompts reuse RP.assistant)
     ============================================================ */
  RP.brain = {
    superintendent: { title: "Good morning, Dr. Romero", intro: "Here's what to know across your three schools today.",
      health: [ { school: "MIT", score: 88, trend: "down" }, { school: "Kings Ridge", score: 94, trend: "flat" }, { school: "Riverside Trad.", score: 96, trend: "up" } ] },
    principal: { title: "Good morning, Principal Bell", intro: "Here's what's happening at MIT today.",
      health: [ { school: "MIT", score: 88, trend: "down" } ] },
    teacher: { title: "Good morning, Ms. Chen", intro: "Here's your day and who needs you most.",
      health: [ { school: "2nd period", score: 84, trend: "down" } ] },
    counselor: { title: "Good morning, Ms. Nair", intro: "Here's who on your caseload needs attention today.",
      health: [ { school: "Caseload", score: 82, trend: "down" } ] },
    admin: { title: "Good morning, Linda", intro: "Here's today's attendance and the families to reach.",
      health: [ { school: "MIT attendance", score: 91, trend: "down" } ] },
    sped: { title: "Good morning, Mr. Hayes", intro: "Here's your compliance and caseload status.",
      health: [ { school: "Compliance", score: 96, trend: "flat" } ] },
    student: { title: "Hi Tyler", intro: "Here's how you're doing — and what'll help most today.",
      health: [ { school: "Algebra I", score: 71, trend: "up" } ] },
    parent: { title: "Bienvenida, Maria", titleEn: "Welcome, Maria", intro: "Esto es lo que debe saber sobre Diego hoy.", introEn: "Here's what to know about Diego today.",
      health: [ { school: "Diego", score: 82, trend: "down" } ] },
  };

  /* ============================================================
     PROACTIVE ALERTS per role (at least one each)
     severity: danger | warning ; actions: [labels]
     ============================================================ */
  RP.alerts = {
    superintendent: [
      { id: "a2", severity: "danger", kind: "alert", ago: "20m ago", headline: "Kings Ridge bus route 12 delayed 4 of 5 days", why: "Transportation reliability dipped below 90% — affects 60 students and is starting to show up in first-period attendance.", signals: ["On-time arrival on route 12 fell to 64% this week", "Vendor reported a driver shortage Mon–Thu", "First-period tardies at Kings Ridge up 11%"], actions: ["View Operations", "Email vendor"] },
      { id: "a1", severity: "warning", kind: "alert", ago: "this morning", headline: "MIT chronic absenteeism up 3 pts this quarter", why: "Concentrated in 9th grade — now 17% vs. 14% district average.", signals: ["Synergy attendance: MIT 9th-grade rate fell 95% → 88.1% over 6 weeks", "Absences cluster on Mondays/Fridays and in first period", "6 students account for ~28% of the increase"], actions: ["View MIT", "Notify Principal Bell"], student: null },
      { id: "a3", severity: "warning", kind: "approval", ago: "1h ago", headline: "Approve emergency sub budget — Lincoln Elementary", why: "Three teachers out on the same day next week; principal requests pre-approved coverage of $4,800.", signals: ["Within the building's discretionary cap", "Finance flagged no policy conflict", "Decision needed before Thursday to book subs"], actions: ["Approve $4,800", "Ask Finance"] },
      { id: "a4", severity: "info", kind: "deadline", ago: "3h ago", headline: "Board packet due Friday", why: "The monthly board meeting is Friday at 6pm. A draft can be generated from this quarter's data in one click.", actions: ["Generate draft", "Open report"] },
      { id: "a5", severity: "success", kind: "win", ago: "yesterday", headline: "Aisha Okafor named National Merit semifinalist", why: "MIT junior — one of only 16,000 nationwide. A recognition note and a board mention are worth doing.", actions: ["Send recognition", "Add to board packet"], student: "aisha" },
    ],
    principal: [
      { id: "a1", severity: "warning", kind: "alert", ago: "this morning", headline: "9th-grade attendance cluster forming", why: "6 students trending toward chronic absence, including Diego Marquez.", signals: ["6 students below 90% attendance and declining", "Shared Monday/Friday + first-period pattern", "2 families flagged as Spanish-preferred for outreach"], actions: ["View cohort", "Loop in counselor"] },
      { id: "a2", severity: "warning", kind: "alert", ago: "yesterday", headline: "Algebra I outcomes lagging in 2nd period", why: "Benchmark pass rate fell to 61% — re-teach or coaching may help.", actions: ["View class", "Offer support"] },
      { id: "a3", severity: "warning", kind: "approval", ago: "1h ago", headline: "Sub coverage needed — Mr. Park, Thursday", why: "Mr. Park has jury duty Thursday. A qualified sub is available and within budget.", signals: ["Ms. Alvarez (cleared sub) is available all day", "Covers all 5 Algebra sections", "No impact to the testing schedule"], actions: ["Approve sub", "Find another"] },
      { id: "a4", severity: "success", kind: "win", ago: "2h ago", headline: "Robotics team qualified for the state championship", why: "First time in school history. A shout-out at Friday's assembly and a note to families would land well.", actions: ["Congratulate team", "Share with families"] },
      { id: "a5", severity: "info", kind: "alert", ago: "today", headline: "Walkthrough notes ready from 3 classrooms", why: "Yesterday's instructional walkthroughs are summarized with two suggested coaching follow-ups.", actions: ["Review notes"] },
    ],
    teacher: [
      { id: "a1", severity: "warning", kind: "alert", ago: "this morning", headline: "3 students missed the fractions quiz benchmark", why: "Re-teach suggested before Friday's unit test. Tyler Nguyen most affected.", signals: ["3 students scored below 60% on the fractions benchmark", "Google Classroom: same 3 missed the practice set", "Unit test scheduled Friday — narrow intervention window"], actions: ["Generate plan"], student: "tyler" },
      { id: "a2", severity: "info", kind: "deadline", ago: "today", headline: "12 assignments waiting — feedback drafted", why: "The brain pre-wrote specific, encouraging feedback for each submission. Review and post, or grade yourself.", actions: ["Review feedback", "Grade myself"] },
      { id: "a3", severity: "success", kind: "win", ago: "yesterday", headline: "Class mastery up 6 points this unit", why: "Your 2nd-period growth is the strongest of the Algebra sections. Worth celebrating with students.", actions: ["See breakdown"] },
      { id: "a4", severity: "warning", kind: "deadline", ago: "1h ago", headline: "Progress reports due Friday", why: "28 students. Drafts can be generated from gradebook + attendance, ready for your edits.", actions: ["Generate drafts"] },
      { id: "a5", severity: "info", kind: "approval", ago: "2d ago", headline: "Field trip — 4 permission slips missing", why: "The science museum trip is in 8 days. Four families haven't returned slips; two prefer Spanish.", actions: ["Remind families"] },
    ],
    counselor: [
      { id: "a1", severity: "danger", kind: "alert", ago: "this morning", headline: "Sophia Reyes is 2 credits short for June graduation", why: "Intervention window closing — needs Econ, Lab Science, Fine Arts.", actions: ["View plan", "Schedule meeting"], student: "sophia" },
      { id: "a2", severity: "warning", kind: "alert", ago: "today", headline: "Diego Marquez — combined attendance & grade signals", why: "Attendance 82% + Algebra slipping to C-. Warrants a check-in.", signals: ["Attendance crossed below 85% this week", "Algebra I grade dropped B- → C- in 3 weeks", "Two signals co-occurring raises priority"], actions: ["View student", "Draft check-in plan"], student: "diego" },
      { id: "a3", severity: "warning", kind: "deadline", ago: "1h ago", headline: "23 college apps in flight — 5 missing transcripts", why: "The Nov 1 priority deadline is in 6 days. Five students need transcripts requested today.", signals: ["5 of 23 applicants have incomplete files", "All 5 are first-generation college students", "Registrar can batch-send with one approval"], actions: ["See list", "Request transcripts"] },
      { id: "a4", severity: "info", kind: "alert", ago: "today", headline: "Wellness check-in flagged: Maya Patel", why: "Two teachers independently noted withdrawal this week. A low-key check-in is recommended.", actions: ["Schedule check-in"] },
      { id: "a5", severity: "success", kind: "win", ago: "yesterday", headline: "Luis Ortega qualifies for a $12k STEM scholarship", why: "His profile matches the Riverside Foundation STEM award. Deadline is comfortable; family should be told.", actions: ["Notify family", "Start application"], student: "luis" },
    ],
    admin: [
      { id: "a0", severity: "danger", kind: "alert", ago: "20m ago", headline: "Voicemail: parent safety concern on bus 12", why: "A Kings Ridge parent left a message about a near-miss at the bus stop. Needs routing to Operations and a callback.", signals: ["Transcribed and flagged urgent by the brain", "Matches the route 12 reliability issue already open", "Caller requested a callback today"], actions: ["Listen & route", "Call back"] },
      { id: "a1", severity: "warning", kind: "alert", ago: "this morning", headline: "5 students absent 3+ days this week", why: "Follow-up calls recommended. 2 families prefer Spanish.", signals: ["5 students hit 3+ consecutive absences", "District policy §4.2 triggers outreach at 3 days", "Diego Marquez & Luis Ortega need Spanish contact"], actions: ["Open call list", "Text families"] },
      { id: "a2", severity: "info", kind: "alert", ago: "today", headline: "9 new enrollment inquiries — 3 need packets", why: "This week's inquiries from the website and tours. Three are ready for an auto-generated welcome packet.", actions: ["Send packets", "See inquiries"] },
      { id: "a3", severity: "info", kind: "approval", ago: "1h ago", headline: "4 campus tours tomorrow need visitor badges", why: "Pre-registration lets families skip the front-desk line and walk straight in.", actions: ["Pre-register all", "Review list"] },
      { id: "a4", severity: "success", kind: "win", ago: "yesterday", headline: "On-time arrival rate climbed to 96%", why: "The morning text-reminder pilot is working — best week this semester.", actions: ["See trend"] },
    ],
    sped: [
      { id: "a1", severity: "warning", kind: "alert", ago: "this morning", headline: "Marcus Lee's annual IEP review due in 12 days", why: "Prepare documents and schedule the meeting to stay compliant.", signals: ["IDEA compliance calendar: annual review due in 12 days", "Documents not yet drafted", "Parent meeting not yet scheduled"], actions: ["Prep documents", "Schedule meeting"], student: "marcus" },
      { id: "a2", severity: "warning", kind: "deadline", ago: "today", headline: "2 IEP progress reports due to parents this week", why: "Goal-by-goal summaries can be drafted from this quarter's data collection for your review.", actions: ["Generate summaries"] },
      { id: "a3", severity: "warning", kind: "alert", ago: "1h ago", headline: "Speech therapy 2 sessions behind for Ethan R.", why: "Service-minute tracking shows a shortfall that needs make-up sessions to stay compliant.", actions: ["Reschedule", "Flag provider"] },
      { id: "a4", severity: "info", kind: "approval", ago: "2d ago", headline: "Evaluation consent — parent e-signature pending", why: "A new evaluation can't start until the family signs. A reminder (auto-translated) is ready to send.", actions: ["Send reminder", "Call family"] },
      { id: "a5", severity: "success", kind: "win", ago: "yesterday", headline: "81% of IEP goals on track, up from 74%", why: "Caseload progress is the strongest this year. The data backs up your team's approach.", actions: ["See goals"] },
    ],
    student: [
      { id: "a1", severity: "info", kind: "alert", ago: "today", headline: "You're close to mastering linear equations", why: "15 minutes of practice could get you there before Friday's test.", actions: ["Start practice"], gentle: true },
      { id: "a2", severity: "warning", kind: "deadline", ago: "today", headline: "2 assignments due soon", why: "Your English essay is due tomorrow and Algebra practice set is due Thursday.", actions: ["See what's due", "Start now"], gentle: true },
      { id: "a3", severity: "success", kind: "win", ago: "today", headline: "4-day practice streak — nice work!", why: "You've shown up four days in a row. One more keeps the streak alive.", actions: ["Keep it going"], gentle: true },
      { id: "a4", severity: "info", kind: "alert", ago: "now", headline: "Your tutor is available right now", why: "Stuck on anything? The brain can walk you through a problem step by step, any time.", actions: ["Ask a question"], gentle: true },
    ],
    parent: [
      { id: "a1", severity: "warning", kind: "alert", ago: "this morning", headline: "Diego has missed 4 days this month", why: "Here's how to help and who to contact at school.", signals: ["4 absences logged this month in Synergy", "Most absences fall on Mondays", "Counselor Ms. Nair is available to help"], actions: ["Message counselor", "See support tips"], student: "diego" },
      { id: "a2", severity: "warning", kind: "deadline", ago: "yesterday", headline: "Field trip permission slip due Friday", why: "Diego's science museum trip needs your signature. You can sign right here.", actions: ["Sign now", "Remind me"] },
      { id: "a3", severity: "success", kind: "win", ago: "2 days ago", headline: "Diego's latest math quiz improved to 78%", why: "Up from 64% last week — the extra practice is paying off. A note of encouragement helps.", actions: ["See progress"] },
    ],
  };

  RP.alertsES = {
    parent: [
      { id: "a1", severity: "warning", kind: "alert", ago: "esta mañana", headline: "Diego ha faltado 4 días este mes", why: "Aquí le explicamos cómo ayudar y con quién comunicarse en la escuela.", lang: "es", signals: ["4 ausencias registradas este mes en Synergy", "La mayoría de las ausencias son los lunes", "La consejera, la Sra. Nair, está disponible para ayudar"], actions: ["Enviar mensaje a la consejera", "Ver consejos de apoyo"], student: "diego" },
      { id: "a2", severity: "warning", kind: "deadline", ago: "ayer", headline: "Permiso de excursión vence el viernes", why: "La excursión de Diego al museo de ciencias necesita su firma. Puede firmar aquí mismo.", lang: "es", actions: ["Firmar ahora", "Recordarme"] },
      { id: "a3", severity: "success", kind: "win", ago: "hace 2 días", headline: "La última prueba de matemáticas de Diego subió a 78%", why: "Subió de 64% la semana pasada — la práctica adicional está dando resultado. Un mensaje de ánimo ayuda.", lang: "es", actions: ["Ver progreso"] },
    ],
  };

  /* ============================================================
     ASSISTANT — scripted prompts + grounded answers per role
     answer: { paragraphs:[], chips:[{label}], chart:{type,...},
              table:{cols,rows}, actions:[label], note }
     ============================================================ */
  RP.assistant = {
    superintendent: {
      placeholder: "Ask about any school, metric, or trend…",
      prompts: [
        "Compare chronic absenteeism across the three schools this quarter and tell me what's driving MIT's number.",
        "Where are we winning this term?",
        "Summarize MIT's 9th-grade attendance problem for the board.",
      ],
      answers: {
        0: {
          paragraphs: [
            "Chronic absenteeism is highest at **MIT (17%)**, up 3 points this quarter, versus Riverside Traditional (11%) and Kings Ridge (12%). The district average is 14%.",
            "The increase at MIT is concentrated in **9th grade**, where 28% of the rise traces to a cluster of ~6 students whose attendance fell sharply over the last six weeks. Diego Marquez (95% → 82%) is the clearest case. First-period absences and Monday/Friday patterns dominate the data.",
          ],
          chart: { type: "bars", title: "Chronic absenteeism by school — this quarter", unit: "%", series: [ { label: "MIT", value: 17, tone: "danger" }, { label: "Kings Ridge", value: 12, tone: "brand" }, { label: "Riverside Trad.", value: 11, tone: "brand" } ], baseline: { label: "District avg", value: 14 } },
          chips: ["Synergy · Attendance", "Synergy · Enrollment", "RUSD Climate Survey Q3"],
          actions: ["Generate & route report to Principal Bell", "Schedule a meeting Thursday", "Send to phone"],
          followups: [{ label: "Summarize MIT's 9th-grade problem for the board", to: 2 }, { label: "Where are we winning this term?", to: 1 }],
        },
        1: {
          paragraphs: [
            "Three bright spots this term: **Kings Ridge on-track-to-graduate rose to 90%** (+2 pts), **district climate index holds at 7.6/10**, and **AP enrollment at MIT is up 11%** year over year despite the attendance dip.",
            "Riverside Traditional continues to lead attendance at 94.6% with the lowest chronic absenteeism in the district.",
          ],
          chips: ["Synergy · Grades", "RUSD Climate Survey Q3", "Synergy · Enrollment"],
          actions: ["Generate board summary"],
        },
        2: {
          paragraphs: [
            "**MIT 9th-grade attendance, board-ready summary:** Chronic absenteeism in the 9th-grade cohort climbed from 14% to 17% this quarter. A cluster of ~6 students accounts for most of the change; absences concentrate on Mondays/Fridays and in first period.",
            "Recommended action already underway: counselor outreach to affected families (2 require Spanish-language contact), a first-period engagement review, and a 9th-grade attendance push led by Principal Bell.",
          ],
          chips: ["Synergy · Attendance", "RUSD Policy §4.2 — Attendance"],
          actions: ["Generate board summary", "Add to next board packet"],
        },
      },
    },
    principal: {
      placeholder: "Ask about MIT — grades, attendance, teachers…",
      prompts: [
        "What's behind the 9th-grade attendance dip?",
        "Which of my teachers might need support and in what?",
        "Draft a staff update on our attendance push.",
      ],
      answers: {
        0: {
          paragraphs: [
            "The 9th-grade dip is driven by a **cluster of 6 students** whose attendance dropped over six weeks, pulling the grade-level rate to 88.1%. Absences peak on **Mondays and Fridays** and in **first period**.",
            "Two of the six families prefer Spanish-language contact. Diego Marquez (95% → 82%) shows the steepest decline and also a slipping Algebra I grade — a combined signal worth a counselor check-in.",
          ],
          chart: { type: "line", title: "9th-grade attendance — last 6 weeks", unit: "%", points: [95, 93.5, 92, 90.5, 89, 88.1] },
          chips: ["Synergy · Attendance", "Synergy · Grades"],
          actions: ["View cohort", "Loop in counselor", "Draft staff update"],
        },
        1: {
          paragraphs: [
            "Instructional outcomes are lagging most in **Algebra I, 2nd period** (benchmark pass rate 61%, down from 74%). Ms. Chen's other sections are on track, so this reads as a **specific-topic gap (fractions / linear equations)** rather than a teaching concern.",
            "Recommended support: a re-teach block before Friday's unit test and a shared differentiated worksheet. Biology and Chemistry outcomes are stable.",
          ],
          table: { cols: ["Class / Section", "Pass rate", "Trend"], rows: [ ["Algebra I · P2", "61%", "▼ down"], ["Algebra I · P4", "79%", "▲ up"], ["Biology · P1", "81%", "— flat"], ["Chemistry · P3", "84%", "▲ up"] ] },
          chips: ["Google Classroom · Algebra I", "Synergy · Grades"],
          actions: ["Offer coaching", "Share resources"],
        },
        2: {
          paragraphs: [
            "**Draft — Staff update: 9th-grade attendance push**",
            "Team — our 9th-grade attendance has slipped to 88% this quarter, concentrated in a small group of students and in first period. Starting Monday we're launching a coordinated push: first-period greeters, same-day family outreach (with Spanish-language support), and counselor check-ins for our six priority students. Please flag any student you're concerned about in the shared tracker. Thank you for helping every student start the day present and ready. — Principal Bell",
          ],
          chips: ["Synergy · Attendance", "RUSD Policy §4.2 — Attendance"],
          actions: ["Send to staff", "Edit draft"],
          review: true,
        },
      },
    },
    teacher: {
      placeholder: "Ask about your classes, students, or lessons…",
      prompts: [
        "Who in 2nd period is falling behind and on what?",
        "Make three versions of tonight's homework (advanced / on-level / support).",
        "Draft a friendly nudge to parents of students missing assignments.",
      ],
      answers: {
        0: {
          paragraphs: [
            "In **2nd period Algebra I**, three students are below benchmark, all on the same topics — **fractions and linear equations**. Tyler Nguyen is furthest behind (fractions 41%, linear equations 38%).",
            "A short re-teach before Friday's unit test would likely move all three. I can generate a targeted plan and a differentiated worksheet.",
          ],
          table: { cols: ["Student", "Fractions", "Linear eq.", "Status"], rows: [ ["Tyler Nguyen", "41%", "38%", "At risk"], ["Jordan Pace", "55%", "49%", "Watch"], ["Mia Roth", "58%", "52%", "Watch"] ] },
          chips: ["Google Classroom · Algebra I", "Synergy · Grades"],
          actions: ["Generate re-teach plan", "Draft parent note"],
          followups: [{ label: "Make three leveled versions of tonight's homework", to: 1 }, { label: "Draft a nudge to their parents", to: 2 }],
        },
        1: {
          paragraphs: [
            "Here are **three leveled versions** of tonight's homework on solving two-step linear equations:",
            "**Support** — 6 problems with worked example + a fraction-review warm-up. **On-level** — 10 problems, mixed integer & fraction coefficients. **Advanced** — 8 problems including word problems and a multi-step challenge.",
          ],
          chips: ["Google Classroom · Algebra I", "AZ Math Standard A1.4"],
          actions: ["Push to Google Classroom", "Edit"],
          review: true,
        },
        2: {
          paragraphs: [
            "**Draft — friendly parent nudge (per student, auto-personalized):**",
            "Hi [Parent] — quick note from Algebra I: [Student] has 2 assignments outstanding this week. No worries — they can turn them in by Friday for full credit, and I'm happy to help during 7th-period tutoring. Thanks for the partnership! — Ms. Chen",
          ],
          chips: ["Google Classroom · Algebra I", "Synergy · Contacts"],
          actions: ["Review & send", "Translate per family"],
          review: true,
        },
      },
    },
    counselor: {
      placeholder: "Ask about your caseload, graduation, or wellness…",
      prompts: [
        "Which juniors are trending off-track and why?",
        "Draft a check-in plan for Diego Marquez.",
        "Find scholarships matching Aisha's profile.",
      ],
      answers: {
        0: {
          paragraphs: [
            "Among juniors, **two are trending off-track**. The strongest signal is grade slippage in a core course combined with rising absences.",
            "Note: Sophia Reyes is a **senior** and the most urgent case — 2 credits short for June. I've kept her at the top of your watch list.",
          ],
          table: { cols: ["Student", "Grade", "Signal", "Why"], rows: [ ["Sophia Reyes", "12", "Credit gap", "2 credits short for June"], ["Diego Marquez", "9", "Attendance + grades", "82% attendance, Algebra C-"], ["J. Alvarez", "11", "GPA drop", "3.1 → 2.6 this term"] ] },
          chips: ["Synergy · Grades", "Synergy · Attendance", "Synergy · Transcripts"],
          actions: ["Open graduation tracker"],
          followups: [{ label: "Draft a check-in plan for Diego Marquez", to: 1 }, { label: "Find scholarships matching Aisha's profile", to: 2 }],
        },
        1: {
          paragraphs: [
            "**Draft — check-in plan: Diego Marquez (Grade 9)**",
            "Context: attendance 95% → 82% over six weeks; Algebra I slipping to C-; Spanish-speaking household. Plan: (1) warm check-in this week, ask about mornings/transportation; (2) loop in Ms. Chen for an Algebra support block; (3) family call in Spanish via front office; (4) set a 2-week attendance goal of 90%+ and follow up.",
          ],
          chips: ["Synergy · Attendance", "Synergy · Grades", "RUSD Policy §4.2"],
          actions: ["Save to student plan", "Schedule meeting", "Translate family note"],
          review: true,
        },
        2: {
          paragraphs: [
            "**Three scholarship/pathway matches for Aisha Johnson** (GPA 4.1, biomedical engineering & robotics interest):",
            "**SWE High School Scholarship** — engineering-bound women, due Feb. **AZ Regents' Award** — top-tier GPA, in-state tuition. **NASA HS Aerospace Scholars** — STEM juniors (ties to the district NASA partnership).",
          ],
          chips: ["Synergy · Transcripts", "College & Career DB", "Student interests"],
          actions: ["Save to Aisha's plan", "Email Aisha & family"],
        },
      },
    },
    admin: {
      placeholder: "Ask about attendance, families, or tours…",
      prompts: [
        "Who's absent today and who needs a parent call?",
        "Draft today's absence follow-ups, translated per family.",
        "Schedule a campus tour for the Reyes family next week.",
      ],
      answers: {
        0: {
          paragraphs: [
            "**12 students are absent today.** Five have now missed **3+ consecutive days** and are recommended for a parent call. Two of those families prefer **Spanish**.",
            "Diego Marquez (9th) is on the priority list — 3 days this week and a declining trend.",
          ],
          table: { cols: ["Student", "Grade", "Days out", "Language"], rows: [ ["Diego Marquez", "9", "3", "Spanish"], ["Kayla Brooks", "10", "4", "English"], ["Luis Ortega", "11", "3", "Spanish"], ["Sam Whitfield", "9", "3", "English"], ["Nia Carter", "12", "3", "English"] ] },
          chips: ["Synergy · Attendance", "Synergy · Contacts"],
          actions: ["Open call list", "Draft translated outreach"],
        },
        1: {
          paragraphs: [
            "I've drafted **5 follow-up messages**, each personalized and auto-translated to the family's preferred language. Diego Marquez's and Luis Ortega's are in **Spanish**; the rest in English.",
            "Each message is shown with the original English alongside the translation so you can verify before sending.",
          ],
          chips: ["Synergy · Contacts", "Translation · ES"],
          actions: ["Review & send all", "Open composer"],
          review: true,
        },
        2: {
          paragraphs: [
            "I found **two open tour slots next week**: Tuesday 9:30 AM and Thursday 1:00 PM. I've pre-filled a tour booking for the **Reyes family** and will auto-translate the confirmation if their preferred language differs from English.",
          ],
          chips: ["Tours calendar", "Synergy · Contacts"],
          actions: ["Book Tuesday 9:30", "Book Thursday 1:00"],
        },
      },
    },
    sped: {
      placeholder: "Ask about caseload, IEP goals, or compliance…",
      prompts: [
        "Which reviews are due in the next 30 days?",
        "Draft progress notes for Marcus Lee's reading goals.",
        "Summarize today's IEP meeting for the parent in plain language.",
      ],
      answers: {
        0: {
          paragraphs: [
            "**Three reviews are due in the next 30 days.** Marcus Lee's annual review is the most urgent at **12 days out**.",
            "I can prepare the draft notices and meeting invites for any of these.",
          ],
          table: { cols: ["Student", "Type", "Due", "Status"], rows: [ ["Marcus Lee", "Annual review", "12 days", "Action needed"], ["Priya S.", "Reevaluation", "21 days", "On track"], ["Devon M.", "Annual review", "29 days", "On track"] ] },
          chips: ["Synergy · SpEd", "IDEA Compliance Calendar"],
          actions: ["Draft notice — Marcus Lee", "Schedule meeting"],
        },
        1: {
          paragraphs: [
            "**Draft — progress notes: Marcus Lee, reading goals**",
            "Goal 1 (fluency): Marcus reads grade-level text at **104 WPM** with 88% accuracy, up from an 78 WPM baseline — **62% to the 120 WPM target**, on track. Goal 2 (comprehension): identifies main idea + 2 details in **68% of passages**, up from 30% — **76% to target**, strong progress. Recommend continuing extended time and text-to-speech accommodations.",
          ],
          chips: ["Synergy · SpEd", "Progress monitoring · Q3"],
          actions: ["Save to IEP", "Generate parent summary"],
          review: true,
        },
        2: {
          paragraphs: [
            "**Draft — plain-language IEP summary for the family:**",
            "Thank you for meeting today about Marcus. The team agreed Marcus is making good progress in reading — he's reading faster and understanding more of what he reads. We'll keep giving him extra time on tests and the read-aloud tool, and we set new goals to help him keep improving. Our next check-in is at his annual review. Please reach out any time with questions.",
          ],
          chips: ["IEP Meeting · Today", "Plain-language mode"],
          actions: ["Review & send", "Translate to Spanish"],
          review: true,
        },
      },
    },
    student: {
      placeholder: "Ask me anything about your classes…",
      prompts: [
        "Explain this fractions problem step by step.",
        "Quiz me for Friday's Algebra test.",
        "Help me improve this paragraph.",
      ],
      answers: {
        0: {
          paragraphs: [
            "Let's do it together — take **3/4 + 1/6**. Step 1: find a common denominator. The smallest number both 4 and 6 divide into is **12**.",
            "Step 2: rewrite each fraction — 3/4 = **9/12**, and 1/6 = **2/12**. Step 3: add the tops — 9 + 2 = **11**, keep the bottom: **11/12**. That's already simplified. Want to try one yourself?",
          ],
          chips: ["Khan-style tutor", "AZ Math A1.4"],
          actions: ["Give me a practice problem", "Explain another way"],
        },
        1: {
          paragraphs: [
            "Sure! Quick 5-question warm-up for Friday — mostly linear equations since that's your focus area.",
            "**Q1.** Solve: 2x + 5 = 13.  **Q2.** Solve: x/3 − 1 = 4.  **Q3.** Combine: 3/8 + 1/4.  **Q4.** Solve: 5(x − 2) = 20.  **Q5.** Graph: y = 2x + 1 — what's the slope? Take your time; I'll check each one.",
          ],
          chips: ["Practice mode", "AZ Math A1.4"],
          actions: ["Check my answers", "Make it harder"],
        },
        2: {
          paragraphs: [
            "Happy to help! Paste your paragraph and I'll give friendly feedback. In general, strong paragraphs (1) start with a clear topic sentence, (2) back it up with one specific example, and (3) end with a sentence that connects back to your main idea.",
            "Tip: read it out loud — if you run out of breath, the sentence is probably too long. You've got this.",
          ],
          chips: ["Writing coach", "Reviewed — not graded"],
          actions: ["Paste my paragraph"],
        },
      },
    },
    parent: {
      placeholder: "Ask about your child…",
      placeholderES: "Pregunte sobre su hijo…",
      prompts: [
        "How is Diego doing this month?",
        "How can I help Diego with math?",
        "Send a message to his counselor.",
      ],
      promptsES: [
        "¿Cómo va Diego este mes?",
        "¿Cómo puedo ayudar a Diego con matemáticas?",
        "Envía un mensaje a su consejera.",
      ],
      answers: {
        0: {
          paragraphs: [
            "Diego's attendance has slipped to **82%** this month — he's missed 4 days, mostly Mondays. His grades are mostly steady, though Algebra I has dropped to a C-.",
            "The school has noticed and his counselor, Ms. Nair, is ready to help. The most useful thing right now is helping Diego get to school on time each morning.",
          ],
          chips: ["Synergy · Attendance", "Synergy · Grades"],
          actions: ["See support tips", "Message the counselor"],
        },
        1: {
          paragraphs: [
            "Great question. Diego's Algebra I class is working on **fractions and linear equations**. Three things that help at home:",
            "(1) Ask him to teach *you* one problem — explaining it out loud builds confidence. (2) 15 minutes of practice beats one long session. (3) His teacher Ms. Chen offers 7th-period tutoring; I can ask her to save him a seat.",
          ],
          chips: ["Google Classroom · Algebra I", "Support at Home"],
          actions: ["Ask Ms. Chen about tutoring", "See practice resources"],
        },
        2: {
          paragraphs: [
            "I can open a message to Ms. Nair, Diego's counselor. You can write in **Spanish** and she'll receive it in English — her reply will come back to you in Spanish automatically.",
          ],
          chips: ["Two-way translation", "Synergy · Contacts"],
          actions: ["Open message to counselor"],
        },
      },
      answersES: {
        0: {
          paragraphs: [
            "La asistencia de Diego ha bajado a **82%** este mes — ha faltado 4 días, sobre todo los lunes. Sus calificaciones se mantienen estables, aunque Álgebra I bajó a C-.",
            "La escuela lo ha notado y su consejera, la Sra. Nair, está lista para ayudar. Lo más útil ahora es ayudar a Diego a llegar a tiempo cada mañana.",
          ],
          chips: ["Synergy · Asistencia", "Synergy · Calificaciones"],
          actions: ["Ver consejos de apoyo", "Enviar mensaje a la consejera"],
        },
        1: {
          paragraphs: [
            "Buena pregunta. La clase de Álgebra I de Diego está trabajando en **fracciones y ecuaciones lineales**. Tres cosas que ayudan en casa:",
            "(1) Pídale que *le* enseñe un problema — explicarlo en voz alta da confianza. (2) 15 minutos de práctica valen más que una sesión larga. (3) Su maestra, la Sra. Chen, ofrece tutoría en la 7.ª hora; puedo pedirle que le guarde un lugar.",
          ],
          chips: ["Google Classroom · Álgebra I", "Apoyo en Casa"],
          actions: ["Preguntar a la Sra. Chen sobre tutoría", "Ver recursos de práctica"],
        },
        2: {
          paragraphs: [
            "Puedo abrir un mensaje para la Sra. Nair, la consejera de Diego. Puede escribir en **español** y ella lo recibirá en inglés — su respuesta le llegará en español automáticamente.",
          ],
          chips: ["Traducción bidireccional", "Synergy · Contactos"],
          actions: ["Abrir mensaje a la consejera"],
        },
      },
    },
  };

  /* ============================================================
     PARENT UI — full Spanish translation dictionary
     ============================================================ */
  RP.t = {
    en: {
      langName: "English",
      myChild: "My Child", attendance: "Attendance", grades: "Grades",
      supportHome: "Support at Home", messages: "Messages", assistant: "Assistant",
      childOf: "Parent of", grade: "Grade",
      attendanceThisMonth: "Attendance this month", currentGrades: "Current grades",
      whatItMeans: "What this means", howToHelp: "Three things you can do at home",
      messageCounselor: "Message the counselor", seeSupport: "See support tips",
      present: "Present", absent: "Absent", days: "days",
      switchLang: "Español", attnPlain: "Diego's attendance is slipping. Here's what's happening and what can help.",
      gpa: "GPA", absences: "Absences this month",
    },
    es: {
      langName: "Español",
      myChild: "Mi Hijo", attendance: "Asistencia", grades: "Calificaciones",
      supportHome: "Apoyo en Casa", messages: "Mensajes", assistant: "Asistente",
      childOf: "Madre de", grade: "Grado",
      attendanceThisMonth: "Asistencia este mes", currentGrades: "Calificaciones actuales",
      whatItMeans: "Qué significa esto", howToHelp: "Tres cosas que puede hacer en casa",
      messageCounselor: "Enviar mensaje a la consejera", seeSupport: "Ver consejos de apoyo",
      present: "Presente", absent: "Ausente", days: "días",
      switchLang: "English", attnPlain: "La asistencia de Diego está bajando. Esto es lo que pasa y lo que puede ayudar.",
      gpa: "Promedio", absences: "Faltas este mes",
    },
  };

  window.RP = RP;
})();
