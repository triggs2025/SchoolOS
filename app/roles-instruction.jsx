/* ============================================================
   Riverside Platform — Instruction roles
   Teacher (Ms. Sarah Chen · Google Classroom) · Counselor (Ms. Priya Nair)
   ============================================================ */
(function () {
  const { useState } = React;
  const DS = window.MITSTEMDesignSystem_177606;
  const Icon = window.RPIcon;
  const U = window.RPUI;
  const RP = window.RP;
  const Panel = U.Panel;
  window.RPRoles = window.RPRoles || {};

  /* ---- Drafted lesson result (resources) ---- */
  function LessonResult() {
    const cards = [
      ["Lesson plan", "55-min plan with objective, I-do/we-do/you-do, and close."],
      ["Activity", "Partner card-sort matching equations to real-world contexts."],
      ["Quick assessment", "5-question exit quiz with answer key + reteach branch."],
    ];
    function card(r, i) {
      return React.createElement("div", { key: i, style: { padding: 14, border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)" } },
        React.createElement(Icon, { name: "file", size: 18, style: { color: "var(--color-primary)" } }),
        React.createElement("div", { style: { fontWeight: 700, fontSize: "var(--text-sm)", marginTop: 8 } }, r[0]),
        React.createElement("p", { style: { margin: "4px 0 0", fontSize: "var(--text-xs)", color: "var(--text-muted)", lineHeight: 1.5 } }, r[1]));
    }
    return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } },
      React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 } }, cards.map(card)),
      Sources(["AZ Math Standard A1.4", "Curriculum library"]));
  }

  /* ---- Source chips row ---- */
  function Sources(list) {
    return React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 } }, list.map((c, i) => React.createElement(U.SourceChip, { key: i }, c)));
  }

  /* ---- Teacher: one-tap attendance (the "magic moment") ---- */
  function TeacherAttendance({ app }) {
    const roster = [
      { id: "tyler", name: "Tyler Nguyen" }, { name: "Jordan Pace" }, { name: "Mia Roth" },
      { name: "Ava Bennett" }, { name: "Noah Kim" }, { name: "Liam Cruz" },
      { name: "Zoe Adams" }, { name: "Ethan Ford" }, { name: "Grace Liu" }, { name: "Owen Reed" },
    ];
    const [state, setState] = useState(() => Object.fromEntries(roster.map((r, i) => [i, i === 0 ? "absent" : i === 5 ? "tardy" : "present"])));
    const [sent, setSent] = useState(false);
    const present = Object.values(state).filter((v) => v === "present").length;
    const absent = Object.values(state).filter((v) => v === "absent").length;
    const tardy = Object.values(state).filter((v) => v === "tardy").length;
    const cycle = { present: "tardy", tardy: "absent", absent: "present" };
    const tone = { present: "success", tardy: "warning", absent: "danger" };
    return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 22 } },
      U.PageTitle({ eyebrow: "Attendance · 2nd period Algebra I", title: "Take attendance", sub: "Tap a student to cycle present → tardy → absent. One tap submits to Synergy — no paperwork." }),
      React.createElement("div", { style: { display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" } },
        React.createElement("div", { style: { display: "flex", gap: 18, padding: "14px 20px", borderRadius: "var(--radius-lg)", background: "var(--surface-card)", border: "1px solid var(--border-subtle)", boxShadow: "var(--shadow-sm)" } },
          [["Present", present, "var(--green-600)"], ["Tardy", tardy, "var(--amber-600)"], ["Absent", absent, "var(--red-500)"]].map((k, i) => React.createElement("div", { key: i, style: { textAlign: "center" } },
            React.createElement("div", { style: { fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "var(--text-3xl)", color: k[2] } }, k[1]),
            React.createElement("div", { style: { fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700, color: "var(--text-muted)" } }, k[0])))),
        React.createElement("div", { style: { fontSize: "var(--text-sm)", color: "var(--text-muted)", fontWeight: 600 } }, "5 teachers checked in · " + present + " of " + roster.length + " present"),
        React.createElement(DS.Button, { variant: "secondary", iconLeft: React.createElement(Icon, { name: sent ? "check" : "send", size: 16 }), disabled: sent, onClick: () => { setSent(true); app.toast("Attendance submitted — report sent to office & Synergy"); } }, sent ? "Submitted" : "Submit & send report")),
      RPUI.Panel({ title: "Roster", icon: "users", children:
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 } },
          roster.map((r, i) => { const st = state[i]; const t = U.STATUS[tone[st]]; return React.createElement("button", { key: i, onClick: () => setState((s) => ({ ...s, [i]: cycle[s[i]] })), style: {
            display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: "var(--radius-md)", cursor: "pointer", textAlign: "left",
            border: "1px solid " + t.dot, background: t.bg, fontFamily: "var(--font-body)",
          } },
            React.createElement(DS.Avatar, { name: r.name, size: "sm" }),
            React.createElement("span", { style: { flex: 1, fontWeight: 600, fontSize: "var(--text-sm)", color: "var(--text-default)" } }, r.name),
            React.createElement("span", { style: { fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 800, color: t.fg } }, st)); })) }),
    );
  }

  /* ---- Teacher: gradebook + smart grouping ---- */
  function TeacherClasses({ app }) {
    const rows = [
      { name: "Tyler Nguyen", q1: "C", q2: "C-", hw: "62%", test: "D+", tone: "danger" },
      { name: "Jordan Pace", q1: "B-", q2: "C+", hw: "78%", test: "C", tone: "warning" },
      { name: "Mia Roth", q1: "B", q2: "B-", hw: "81%", test: "C+", tone: "warning" },
      { name: "Ava Bennett", q1: "B+", q2: "B+", hw: "90%", test: "B", tone: "success" },
      { name: "Noah Kim", q1: "A-", q2: "A", hw: "97%", test: "A-", tone: "success" },
    ];
    return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 22 } },
      U.PageTitle({ eyebrow: "Classes · Algebra I", title: "Gradebook", sub: "Pulled live from Synergy & Google Classroom — you never re-enter grades here." }),
      RPUI.Panel({ title: "2nd period — grades", icon: "book", children:
        React.createElement(U.DataTable, { onRowClick: (r) => r.id && app.openStudent(r.id), cols: [
          { key: "name", label: "Student" }, { key: "q1", label: "Q1", align: "center", mono: true }, { key: "q2", label: "Q2", align: "center", mono: true },
          { key: "hw", label: "Homework", align: "center", mono: true }, { key: "test", label: "Last test", align: "center", mono: true },
          { key: "flag", label: "", noSort: true, render: (r) => React.createElement(U.StatusPill, { status: r.tone }) },
        ], rows: rows.map((r) => (r.name === "Tyler Nguyen" ? { ...r, id: "tyler" } : r)) }) }),
      RPUI.Panel({ title: "Smart grouping", sub: "Group students by readiness for tomorrow's lesson", icon: "users", accent: true, children:
        React.createElement(U.GenerateBlock, { label: "Generate groups", icon: "sparkle" },
          React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 } },
            [["Support", "Tyler, Jordan", "Re-teach fractions with manipulatives", "danger"], ["On-level", "Mia, Ava", "Mixed practice + peer check", "warning"], ["Extension", "Noah", "Challenge: multi-step word problems", "success"]].map((g, i) => React.createElement("div", { key: i, style: { padding: 14, border: "1px solid var(--border-subtle)", borderLeft: "3px solid " + U.STATUS[g[3]].dot, borderRadius: "var(--radius-md)" } },
              React.createElement("div", { style: { fontWeight: 700, fontSize: "var(--text-sm)" } }, g[0]),
              React.createElement("div", { style: { fontSize: "var(--text-xs)", color: "var(--text-brand)", fontWeight: 600, margin: "4px 0 6px" } }, g[1]),
              React.createElement("div", { style: { fontSize: "var(--text-xs)", color: "var(--text-muted)", lineHeight: 1.5 } }, g[2]))))) }),
    );
  }


  /* ---- Graduation intervention result (counselor) ---- */
  function GradInterventionResult({ app }) {
    return React.createElement("div", null,
      React.createElement("p", { style: { margin: "0 0 8px", fontSize: "var(--text-sm)", color: "var(--text-body)", lineHeight: 1.6 } },
        React.createElement("strong", null, "Recommended plan:"),
        " enroll Sophia in the summer Economics module (0.5) and an online Fine Arts credit (0.5); the 1.0 Lab Science gap can be closed via the dual-enrollment Rio Salado section starting July 8. This puts her on track for an August completion."),
      Sources(["Synergy · Transcripts", "Dual-enrollment catalog", "RUSD Grad Policy 6.1"]),
      React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 12 } },
        React.createElement(DS.Button, { size: "sm", variant: "secondary", onClick: () => app.openStudent("sophia") }, "Save to plan"),
        React.createElement(DS.Button, { size: "sm", variant: "outline" }, "Schedule meeting")));
  }

  /* ---- Scholarship match result (counselor college) ---- */
  function ScholarshipResult() {
    const items = [
      ["SWE High School Scholarship", "Engineering-bound women · due Feb", "star"],
      ["AZ Regents' Award", "Top-tier GPA · in-state tuition", "award"],
      ["NASA HS Aerospace Scholars", "STEM juniors · district NASA partnership", "compass"],
    ];
    function item(s, i) {
      return React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)" } },
        React.createElement("span", { style: { width: 34, height: 34, borderRadius: "var(--radius-md)", background: "var(--gold-50)", color: "var(--gold-700)", display: "grid", placeItems: "center" } }, React.createElement(Icon, { name: s[2], size: 17 })),
        React.createElement("div", { style: { flex: 1 } },
          React.createElement("div", { style: { fontWeight: 700, fontSize: "var(--text-sm)" } }, s[0]),
          React.createElement("div", { style: { fontSize: "var(--text-xs)", color: "var(--text-muted)" } }, s[1])),
        React.createElement(DS.Button, { size: "sm", variant: "outline" }, "Save"));
    }
    return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } },
      items.map(item),
      Sources(["Synergy · Transcripts", "College & Career DB", "Student interests"]));
  }

  /* ---- Check-in plan result (counselor wellness) ---- */
  function CheckinResult({ app }) {
    return React.createElement("div", null,
      React.createElement("p", { style: { margin: 0, fontSize: "var(--text-sm)", color: "var(--text-body)", lineHeight: 1.7 } }, "Warm check-in this week — ask about mornings and transportation. Loop in Ms. Chen for an Algebra support block. Coordinate a family call in Spanish via the front office. Set a 2-week attendance goal of 90%+ and follow up."),
      Sources(["Synergy · Attendance", "Synergy · Grades", "RUSD Policy 4.2"]),
      React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 12 } },
        React.createElement(DS.Button, { size: "sm", variant: "secondary", onClick: () => app.openComposer("compose-diego") }, "Message family (ES)"),
        React.createElement(DS.Button, { size: "sm", variant: "outline" }, "Schedule meeting")));
  }

  /* ---- Drafted feedback result (assignments) ---- */
  function FeedbackResult() {
    const rows = [
      ["Tyler Nguyen", "6/10", "Strong on setup; review isolating the variable when fractions appear. Suggested: re-teach group."],
      ["Jordan Pace", "7/10", "Good progress — watch sign errors when moving terms across the equals sign."],
      ["Mia Roth", "8/10", "Solid work. One error distributing before combining like terms."],
    ];
    function row(f, i) {
      return React.createElement("div", { key: i, style: { padding: "12px 14px", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)" } },
        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } },
          React.createElement("span", { style: { fontWeight: 700, fontSize: "var(--text-sm)" } }, f[0]),
          React.createElement("span", { style: { display: "flex", alignItems: "center", gap: 8 } },
            React.createElement("span", { style: { fontFamily: "var(--font-data)", fontWeight: 700, color: "var(--text-brand)" } }, f[1]),
            React.createElement(DS.Badge, { tone: "warning" }, "Draft"))),
        React.createElement("p", { style: { margin: "6px 0 0", fontSize: "var(--text-sm)", color: "var(--text-muted)", lineHeight: 1.5 } }, f[2]));
    }
    return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } },
      rows.map(row),
      React.createElement("div", { style: { display: "flex", gap: 8 } },
        React.createElement(DS.Button, { size: "sm", variant: "secondary" }, "Approve all"),
        React.createElement(DS.Button, { size: "sm", variant: "outline" }, "Edit each")),
      Sources(["Google Classroom · Algebra I", "Your rubric · Linear eq."]));
  }

  /* ============================================================
     TEACHER
     ============================================================ */
  function ReteachResult({ app }) {
    return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 16 } },
      React.createElement("div", { style: { display: "inline-flex", alignItems: "center", gap: 6, alignSelf: "flex-start", padding: "3px 10px", borderRadius: "var(--radius-full)", background: "var(--gold-50)", color: "var(--gold-700)", fontSize: "var(--text-2xs)", fontWeight: 700, border: "1px solid var(--gold-200)" } }, React.createElement(Icon, { name: "eye", size: 12 }), "Draft — review before sharing"),
      React.createElement("div", null,
        React.createElement("div", { style: { fontWeight: 700, fontSize: "var(--text-md)", marginBottom: 8 } }, "Re-teach plan — Fractions & Linear Equations (15 min)"),
        React.createElement("ol", { style: { margin: 0, paddingLeft: 18, fontSize: "var(--text-sm)", color: "var(--text-body)", lineHeight: 1.8 } },
          React.createElement("li", null, React.createElement("strong", null, "Warm-up (3 min):"), " visual fraction bars — ¾ + ⅙ with a common-denominator model."),
          React.createElement("li", null, React.createElement("strong", null, "Mini-lesson (6 min):"), " two-step linear equations; isolate the variable, keep balance."),
          React.createElement("li", null, React.createElement("strong", null, "Guided practice (4 min):"), " 3 paired problems, mixed integer & fraction coefficients."),
          React.createElement("li", null, React.createElement("strong", null, "Exit ticket (2 min):"), " 1 fraction + 1 linear equation to gauge readiness for Friday."))),
      React.createElement("div", { style: { background: "var(--neutral-50)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: 16 } },
        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, fontWeight: 700, fontSize: "var(--text-sm)", marginBottom: 8 } }, React.createElement(Icon, { name: "file", size: 16, style: { color: "var(--color-primary)" } }), "Differentiated worksheet — 3 levels"),
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 } },
          [["Support", "6 problems + worked example"], ["On-level", "10 mixed problems"], ["Advanced", "8 incl. word problems"]].map((w, i) => React.createElement("div", { key: i, style: { padding: "10px 12px", background: "var(--surface-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-sm)" } },
            React.createElement("div", { style: { fontWeight: 700, fontSize: "var(--text-sm)", color: "var(--text-brand)" } }, w[0]),
            React.createElement("div", { style: { fontSize: "var(--text-xs)", color: "var(--text-muted)", marginTop: 2 } }, w[1])))),
      ),
      Sources(["Google Classroom · Algebra I", "Synergy · Grades", "AZ Math Standard A1.4"]),
      React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } },
        React.createElement(DS.Button, { size: "sm", variant: "secondary", iconLeft: React.createElement(Icon, { name: "external", size: 14 }) }, "Push to Google Classroom"),
        React.createElement(DS.Button, { size: "sm", variant: "outline", iconLeft: React.createElement(Icon, { name: "message", size: 14 }), onClick: () => app.openComposer("compose-diego") }, "Draft parent note")),
    );
  }

  function WhoNeedsHelp({ app }) {
    const t = RP.students.tyler;
    return React.createElement(Panel, { title: "Who needs help", sub: "Students lagging by topic — 2nd period Algebra I", icon: "users", accent: true },
      React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } },
        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14, padding: "12px 14px", background: "var(--neutral-50)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" } },
          React.createElement(DS.Avatar, { name: U.shortName(t.name), size: "md" }),
          React.createElement("div", { style: { flex: 1 } },
            React.createElement("div", { style: { fontWeight: 700, display: "flex", alignItems: "center", gap: 8 } }, t.name, React.createElement(U.StatusPill, { status: "danger" }, "At risk")),
            React.createElement("div", { style: { fontSize: "var(--text-xs)", color: "var(--text-muted)" } }, "Fractions 41% · Linear equations 38%")),
          React.createElement(DS.Button, { size: "sm", variant: "outline", onClick: () => app.openStudent("tyler") }, "Profile")),
        React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6 } }, t.topicMastery.map((m, i) => React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 12 } },
          React.createElement("span", { style: { width: 150, fontSize: "var(--text-sm)", color: "var(--text-body)" } }, m.topic),
          React.createElement(DS.ProgressBar, { value: m.pct, tone: m.pct < 50 ? "accent" : "brand", showLabel: true, style: { flex: 1 } })))),
        React.createElement("div", { style: { borderTop: "1px solid var(--border-subtle)", paddingTop: 14 } },
          React.createElement(U.GenerateBlock, { label: "Generate a re-teach plan", icon: "sparkle" }, React.createElement(ReteachResult, { app }))),
      ),
    );
  }

  function Teacher({ active, app }) {
    if (active === "today") {
      return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 22 } },
        U.PageTitle({ eyebrow: "My Day · Monday, June 29", title: "Good morning, Ms. Chen", sub: "Algebra I & Statistics · 5 classes today", right: React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 7, padding: "6px 12px", borderRadius: "var(--radius-full)", background: "var(--status-success-bg)", color: "var(--status-success-fg)", fontSize: "var(--text-xs)", fontWeight: 700 } }, React.createElement(Icon, { name: "check", size: 14 }), "Connected: Google Classroom") }),
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 22, alignItems: "start" } },
          Panel({ title: "Today's classes", icon: "sun", children:
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 2 } },
              [["P1", "Algebra I", "8:05", "28", false], ["P2", "Algebra I", "9:10", "26", true], ["P3", "Statistics", "10:15", "24", false], ["P4", "Algebra I", "12:30", "27", false], ["P7", "Tutoring (open)", "2:45", "—", false]].map((c, i) => React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 12, padding: "11px 12px", borderRadius: "var(--radius-md)", background: c[4] ? "var(--purple-50)" : "transparent", border: c[4] ? "1px solid var(--purple-200)" : "1px solid transparent" } },
                React.createElement("span", { style: { fontFamily: "var(--font-data)", fontWeight: 700, color: "var(--text-brand)", width: 28 } }, c[0]),
                React.createElement("div", { style: { flex: 1 } }, React.createElement("div", { style: { fontWeight: 600, fontSize: "var(--text-sm)" } }, c[1]), React.createElement("div", { style: { fontSize: "var(--text-xs)", color: "var(--text-muted)" } }, c[2] + " · " + c[3] + " students")),
                c[4] && React.createElement(DS.Badge, { tone: "warning" }, "Needs attention")))) }),
          Panel({ title: "Google Classroom", sub: "Assignments & submission status", icon: "external", right: React.createElement(DS.Badge, { tone: "success" }, "Synced"), children:
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } },
              [["Fractions practice set", "Algebra I", 22, 26], ["Linear equations quiz", "Algebra I", 24, 26], ["Stats project draft", "Statistics", 19, 24]].map((a, i) => React.createElement("div", { key: i },
                React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: "var(--text-sm)", marginBottom: 5 } }, React.createElement("span", { style: { fontWeight: 600 } }, a[0]), React.createElement("span", { style: { fontFamily: "var(--font-data)", color: "var(--text-muted)" } }, a[2] + "/" + a[3] + " in")),
                React.createElement(DS.ProgressBar, { value: a[2], max: a[3], tone: a[2] / a[3] < 0.85 ? "accent" : "success" })))) }),
        ),
        React.createElement(WhoNeedsHelp, { app }),
      );
    }

    if (active === "students") {
      return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 22 } },
        U.PageTitle({ eyebrow: "Students", title: "2nd period Algebra I", sub: "26 students · click any student for their profile" }),
        Panel({ children: React.createElement(U.DataTable, { onRowClick: (r) => r.id && app.openStudent(r.id), cols: [
          { key: "name", label: "Student" },
          { key: "grade", label: "Grade", align: "right", mono: true },
          { key: "topic", label: "Weakest topic" },
          { key: "status", label: "Status", render: (r) => React.createElement(U.StatusPill, { status: r.tone }) },
          { key: "go", label: "", noSort: true, render: (r) => r.id && React.createElement(Icon, { name: "chevronRight", size: 15, style: { color: "var(--text-subtle)" } }) },
        ], rows: [
          { id: "tyler", name: "Tyler Nguyen", grade: "D+", topic: "Linear equations (38%)", tone: "danger" },
          { name: "Jordan Pace", grade: "C", topic: "Fractions (55%)", tone: "warning" },
          { name: "Mia Roth", grade: "C+", topic: "Fractions (58%)", tone: "warning" },
          { name: "Ava Bennett", grade: "B", topic: "Graphing (72%)", tone: "success" },
          { name: "Noah Kim", grade: "A-", topic: "—", tone: "success" },
        ] }) }),
      );
    }

    if (active === "assignments") {
      return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 22 } },
        U.PageTitle({ eyebrow: "Assignments", title: "Grade & feedback assist", sub: "The Assistant drafts rubric-based feedback for you to review and approve." }),
        Panel({ title: "Linear equations quiz — 24 submissions", icon: "check", accent: true, children:
          React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } },
            React.createElement("p", { style: { margin: 0, fontSize: "var(--text-sm)", color: "var(--text-muted)" } }, "Generate draft feedback grounded in your rubric. You stay in control — nothing is sent until you approve."),
            React.createElement(U.GenerateBlock, { label: "Draft feedback for all", icon: "sparkle" }, React.createElement(FeedbackResult, null))) }),
      );
    }

    if (active === "resources") {
      return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 22 } },
        U.PageTitle({ eyebrow: "Resources", title: "Lesson in minutes", sub: "Enter a standard and the Assistant builds a lesson plan, activity, and quick assessment." }),
        Panel({ icon: "book", title: "Generate a lesson", accent: true, children:
          React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } },
            React.createElement("div", { style: { display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" } },
              React.createElement(DS.Input, { defaultValue: "AZ Math A1.4 — Solve linear equations", style: { maxWidth: 420 } })),
            React.createElement(U.GenerateBlock, { label: "Build lesson", icon: "sparkle" }, React.createElement(LessonResult, null))) }),
      );
    }

    if (active === "attendance") return React.createElement(TeacherAttendance, { app });
    if (active === "classes") return React.createElement(TeacherClasses, { app });

    return null;
  }
  window.RPRoles.teacher = Teacher;

  /* ============================================================
     COUNSELOR
     ============================================================ */
  function Counselor({ active, app }) {
    if (active === "caseload") {
      return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 22 } },
        U.PageTitle({ eyebrow: "Caseload", title: "Good morning, Ms. Nair", sub: "142 students · pattern detection across attendance, grades & behavior" }),
        React.createElement(U.Grid, { min: 200 },
          React.createElement(U.KpiTile, { label: "Active caseload", value: "142" }),
          React.createElement(U.KpiTile, { label: "Off-track seniors", value: "4", status: "danger" }),
          React.createElement(U.KpiTile, { label: "Wellness watch", value: "7", status: "warning" }),
          React.createElement(U.KpiTile, { label: "College-bound", value: "38", status: "success" }),
        ),
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, alignItems: "start" } },
          Panel({ title: "Needs your attention", icon: "bell", children: React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } }, RP.alerts.counselor.map((a) => React.createElement(U.AlertCard, { key: a.id, alert: a, compact: true, onAction: (l, al) => { if (al && al.student) app.openStudent(al.student); } }))) }),
          Panel({ title: "Quick caseload view", icon: "users", children: React.createElement(U.DataTable, { dense: true, onRowClick: (r) => r.id && app.openStudent(r.id), cols: [
            { key: "name", label: "Student" }, { key: "grade", label: "Gr.", align: "right", mono: true },
            { key: "flag", label: "Flag", render: (r) => React.createElement(U.StatusPill, { status: r.tone }, r.flag) },
          ], rows: [
            { id: "sophia", name: "Sophia Reyes", grade: "12", flag: "Credit gap", tone: "danger" },
            { id: "diego", name: "Diego Marquez", grade: "9", flag: "Attendance", tone: "warning" },
            { id: "aisha", name: "Aisha Johnson", grade: "11", flag: "College-bound", tone: "success" },
          ] }) }),
        ),
      );
    }

    if (active === "graduation") {
      return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 22 } },
        U.PageTitle({ eyebrow: "Graduation Tracking", title: "Off-track for June graduation", sub: "Ranked by urgency, with the specific gap and a suggested intervention." }),
        Panel({ title: "Sophia Reyes — 2 credits short", icon: "cap", accent: true, right: React.createElement(DS.Button, { size: "sm", variant: "outline", onClick: () => app.openStudent("sophia") }, "Open profile"), children:
          React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 16 } },
            React.createElement("div", { style: { display: "flex", gap: 22, alignItems: "center", flexWrap: "wrap" } },
              React.createElement(U.DonutRing, { value: Math.round(20 / 22 * 100), label: "20/22", sub: "Credits", tone: "warning", size: 116 }),
              React.createElement("div", { style: { flex: 1, minWidth: 220 } },
                React.createElement("div", { style: { fontSize: "var(--text-sm)", color: "var(--text-muted)", marginBottom: 8, fontWeight: 700 } }, "Missing requirements"),
                React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6 } }, RP.students.sophia.creditGap.missing.map((m, i) => React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 8, fontSize: "var(--text-sm)" } }, React.createElement(Icon, { name: "alert", size: 14, style: { color: "var(--amber-500)" } }), m))))),
            React.createElement("div", { style: { borderTop: "1px solid var(--border-subtle)", paddingTop: 14 } },
              React.createElement(U.GenerateBlock, { label: "Suggest an intervention", icon: "sparkle" }, React.createElement(GradInterventionResult, { app })))) }),
        Panel({ title: "Other off-track students", icon: "users", children: React.createElement(U.DataTable, { onRowClick: (r) => r.id && app.openStudent(r.id), cols: [
          { key: "name", label: "Student" }, { key: "grade", label: "Gr.", align: "right", mono: true },
          { key: "gap", label: "Gap" }, { key: "risk", label: "Risk", render: (r) => React.createElement(U.StatusPill, { status: r.tone }) },
        ], rows: [
          { id: "sophia", name: "Sophia Reyes", grade: "12", gap: "2 credits", tone: "danger" },
          { name: "Marcus Webb", grade: "12", gap: "1 credit", tone: "warning" },
          { name: "Tara Diaz", grade: "11", gap: "GPA trending", tone: "warning" },
        ] }) }),
      );
    }

    if (active === "wellness") {
      return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 22 } },
        U.PageTitle({ eyebrow: "Wellness & Referrals", title: "Wellness pattern catch", sub: "The Assistant surfaces students whose combined signals warrant a check-in." }),
        Panel({ title: "Flagged by combined signals", icon: "heart", accent: true, children:
          React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } },
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14, padding: "14px", background: "var(--neutral-50)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" } },
              React.createElement(DS.Avatar, { name: "Diego Marquez", size: "lg", ring: true }),
              React.createElement("div", { style: { flex: 1 } },
                React.createElement("div", { style: { fontWeight: 700, fontSize: "var(--text-md)" } }, "Diego Marquez · Grade 9"),
                React.createElement("div", { style: { fontSize: "var(--text-sm)", color: "var(--text-muted)", marginTop: 2 } }, "Attendance 95% → 82% · Algebra slipping to C- · Spanish-speaking household"),
                React.createElement("div", { style: { display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" } }, React.createElement(DS.Badge, { tone: "warning" }, "Attendance"), React.createElement(DS.Badge, { tone: "warning" }, "Grade drop"), React.createElement(DS.Badge, { tone: "brand" }, "Language support"))),
              React.createElement(DS.Button, { size: "sm", variant: "outline", onClick: () => app.openStudent("diego") }, "Profile")),
            React.createElement(U.GenerateBlock, { label: "Draft a check-in plan", icon: "sparkle" }, React.createElement(CheckinResult, { app }))) }),
      );
    }

    if (active === "college") {
      const a = RP.students.aisha;
      return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 22 } },
        U.PageTitle({ eyebrow: "College & Career", title: "College & career match", sub: "Scholarships and pathways matched to a student's record and interests." }),
        Panel({ title: "Aisha Johnson · Grade 11", icon: "compass", accent: true, right: React.createElement(DS.Button, { size: "sm", variant: "outline", onClick: () => app.openStudent("aisha") }, "Open profile"), children:
          React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 16 } },
            React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } }, React.createElement(DS.Badge, { tone: "success" }, "GPA 4.1"), a.interests.map((it, i) => React.createElement(DS.Tag, { key: i, tone: "brand" }, it))),
            React.createElement(U.GenerateBlock, { label: "Find matched scholarships", icon: "sparkle" }, React.createElement(ScholarshipResult, null))) }),
      );
    }

    return React.createElement(U.ComingSoon, { title: "Meetings", body: "Schedule and track student and family meetings. Upcoming: Sophia Reyes (graduation plan), Diego Marquez family check-in. The Assistant can draft agendas and plain-language summaries." });
  }
  window.RPRoles.counselor = Counselor;
})();
