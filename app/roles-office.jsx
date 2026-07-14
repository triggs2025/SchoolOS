/* ============================================================
   Riverside Platform — Office roles
   Front-office Admin (Linda Alvarez) · Special Education (Robert Hayes)
   ============================================================ */
(function () {
  const { useState } = React;
  const DS = window.MITSTEMDesignSystem_177606;
  const Icon = window.RPIcon;
  const U = window.RPUI;
  const RP = window.RP;
  const Panel = U.Panel;
  window.RPRoles = window.RPRoles || {};

  function Sources(list) {
    return React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 } }, list.map((c, i) => React.createElement(U.SourceChip, { key: i }, c)));
  }

  /* ---- Drafted outreach result (admin communication) ---- */
  function OutreachResult({ app }) {
    const list = [["Diego Marquez", "Spanish", true], ["Kayla Brooks", "English", false], ["Luis Ortega", "Spanish", true], ["Sam Whitfield", "English", false], ["Nia Carter", "English", false]];
    function row(m, i) {
      return React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)" } },
        React.createElement(Icon, { name: "mail", size: 16, style: { color: "var(--color-primary)" } }),
        React.createElement("div", { style: { flex: 1 } },
          React.createElement("div", { style: { fontWeight: 700, fontSize: "var(--text-sm)" } }, m[0] + " — family"),
          React.createElement("div", { style: { fontSize: "var(--text-xs)", color: "var(--text-muted)" } }, m[2] ? "Auto-translated to Spanish" : "English")),
        m[2] && React.createElement(DS.Badge, { tone: "brand" }, "ES"),
        React.createElement(DS.Button, { size: "sm", variant: "outline", onClick: () => app.openComposer("compose-diego") }, "Review"));
    }
    return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } },
      list.map(row),
      Sources(["Synergy · Contacts", "Translation · ES"]),
      React.createElement(DS.Button, { size: "sm", variant: "secondary", style: { alignSelf: "flex-start" } }, "Review & send all"));
  }

  /* ============================================================
     FRONT-OFFICE ADMIN
     ============================================================ */
  function Admin({ active, app }) {
    if (active === "attendance") {
      return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 22 } },
        U.PageTitle({ eyebrow: "Attendance · Monday, June 29", title: "Today's attendance board", sub: "MIT front office · 12 students absent now · 5 need a follow-up call", right: React.createElement(DS.Button, { variant: "secondary", iconLeft: React.createElement(Icon, { name: "phone", size: 15 }), onClick: () => app.openComposer("compose-diego") }, "Open call list") }),
        React.createElement(U.Grid, { min: 190 },
          React.createElement(U.KpiTile, { label: "Present", value: "1,069", footnote: "90.6%", status: "success" }),
          React.createElement(U.KpiTile, { label: "Absent today", value: "12", status: "warning" }),
          React.createElement(U.KpiTile, { label: "Absent 3+ days", value: "5", status: "danger" }),
          React.createElement(U.KpiTile, { label: "Spanish-pref. families", value: "2", footnote: "of the 5" }),
        ),
        Panel({ title: "Follow-up queue — absent 3+ days", sub: "Outreach recommended · messages auto-translate per family", icon: "phone", accent: true, children:
          React.createElement(U.DataTable, { cols: [
            { key: "name", label: "Student" }, { key: "grade", label: "Gr.", align: "right", mono: true },
            { key: "days", label: "Days out", align: "right", mono: true },
            { key: "lang", label: "Family language", render: (r) => r.lang === "Spanish" ? React.createElement(DS.Badge, { tone: "brand" }, "Spanish") : r.lang },
            { key: "act", label: "", noSort: true, align: "right", render: (r) => React.createElement(DS.Button, { size: "sm", variant: r.id === "diego" ? "secondary" : "outline", iconLeft: React.createElement(Icon, { name: "message", size: 14 }), onClick: (e) => { e.stopPropagation && e.stopPropagation(); app.openComposer("compose-diego"); } }, r.lang === "Spanish" ? "Message (ES)" : "Message") },
          ], onRowClick: (r) => r.id && app.openStudent(r.id), rows: [
            { id: "diego", name: "Diego Marquez", grade: "9", days: 3, lang: "Spanish" },
            { name: "Kayla Brooks", grade: "10", days: 4, lang: "English" },
            { name: "Luis Ortega", grade: "11", days: 3, lang: "Spanish" },
            { name: "Sam Whitfield", grade: "9", days: 3, lang: "English" },
            { name: "Nia Carter", grade: "12", days: 3, lang: "English" },
          ] }) }),
      );
    }

    if (active === "communication") {
      return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 22 } },
        U.PageTitle({ eyebrow: "Communication", title: "Translated outreach", sub: "Every family message auto-translates to their preferred language — original and translation shown side by side.", right: React.createElement(DS.Button, { variant: "secondary", iconLeft: React.createElement(Icon, { name: "plus", size: 15 }), onClick: () => app.openComposer("compose-diego") }, "New message") }),
        Panel({ title: "Draft today's absence follow-ups", icon: "translate", accent: true, children:
          React.createElement(U.GenerateBlock, { label: "Draft all 5 follow-ups", icon: "sparkle" }, React.createElement(OutreachResult, { app })) }),
      );
    }

    if (active === "tours") {
      return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 22 } },
        U.PageTitle({ eyebrow: "Tours & Visitors", title: "Schedule a campus tour", sub: "Book a family into an open slot — the confirmation auto-translates if their language differs." }),
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, alignItems: "start" } },
          Panel({ title: "Open slots — next week", icon: "calendar", children:
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } },
              [["Tuesday, Jul 1", "9:30 AM", true], ["Wednesday, Jul 2", "Full", false], ["Thursday, Jul 3", "1:00 PM", true], ["Friday, Jul 4", "Holiday", false]].map((s, i) => React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", opacity: s[2] ? 1 : 0.55 } },
                React.createElement("div", null, React.createElement("div", { style: { fontWeight: 600, fontSize: "var(--text-sm)" } }, s[0]), React.createElement("div", { style: { fontSize: "var(--text-xs)", color: "var(--text-muted)", fontFamily: "var(--font-data)" } }, s[1])),
                s[2] ? React.createElement(DS.Button, { size: "sm", variant: "outline" }, "Book") : React.createElement(DS.Badge, null, "Unavailable")))) }),
          Panel({ title: "Book the Reyes family", icon: "users", accent: true, children:
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } },
              React.createElement(DS.Field || "div", null),
              React.createElement("div", null, React.createElement("label", { style: { fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" } }, "Family"), React.createElement(DS.Input, { defaultValue: "Reyes family", style: { marginTop: 6 } })),
              React.createElement("div", null, React.createElement("label", { style: { fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" } }, "Preferred slot"), React.createElement(DS.Input, { defaultValue: "Tuesday, Jul 1 · 9:30 AM", style: { marginTop: 6 } })),
              React.createElement(DS.Switch, { defaultChecked: true, label: "Auto-translate confirmation if needed" }),
              React.createElement(DS.Button, { variant: "secondary", iconLeft: React.createElement(Icon, { name: "check", size: 15 }), style: { alignSelf: "flex-start" } }, "Confirm booking")) }),
        ),
      );
    }

    if (active === "families") {
      return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 22 } },
        U.PageTitle({ eyebrow: "Families & Contacts", title: "Family directory", sub: "Search a family for a unified contact card — students, attendance, and prior communications in one place." }),
        Panel({ icon: "search", children:
          React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 16 } },
            React.createElement(DS.Input, { iconLeft: React.createElement(Icon, { name: "search", size: 15 }), defaultValue: "Marquez", style: { maxWidth: 360 } }),
            React.createElement("div", { style: { display: "flex", gap: 16, padding: 16, background: "var(--neutral-50)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", flexWrap: "wrap" } },
              React.createElement(DS.Avatar, { name: "Maria Marquez", size: "xl" }),
              React.createElement("div", { style: { flex: 1, minWidth: 220 } },
                React.createElement("div", { style: { fontWeight: 700, fontSize: "var(--text-lg)" } }, "Marquez family"),
                React.createElement("div", { style: { fontSize: "var(--text-sm)", color: "var(--text-muted)", marginBottom: 10 } }, "Primary: Maria Marquez (mother) · ", React.createElement(DS.Badge, { tone: "brand" }, "Prefers Spanish")),
                React.createElement("div", { style: { display: "flex", gap: 24, flexWrap: "wrap", fontSize: "var(--text-sm)" } },
                  React.createElement("div", null, React.createElement("div", { style: { color: "var(--text-subtle)", fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 } }, "Student"), "Diego Marquez · Gr. 9"),
                  React.createElement("div", null, React.createElement("div", { style: { color: "var(--text-subtle)", fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 } }, "Attendance"), "82%"),
                  React.createElement("div", null, React.createElement("div", { style: { color: "var(--text-subtle)", fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 } }, "Last contact"), "Jun 22 · phone (ES)"))),
              React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } },
                React.createElement(DS.Button, { size: "sm", variant: "secondary", iconLeft: React.createElement(Icon, { name: "message", size: 14 }), onClick: () => app.openComposer("compose-diego") }, "Message (ES)"),
                React.createElement(DS.Button, { size: "sm", variant: "outline", onClick: () => app.openStudent("diego") }, "View student"))),
          ) }),
      );
    }

    return React.createElement(U.ComingSoon, { title: "Enrollment", body: "Manage new-student enrollment and re-enrollment. Forms are pre-filled from Synergy and confirmations auto-translate to each family's preferred language." });
  }
  window.RPRoles.admin = Admin;

  /* ============================================================
     SPECIAL EDUCATION — tightest permissions
     ============================================================ */
  function RestrictedBanner() {
    return React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "11px 16px", borderRadius: "var(--radius-md)", background: "var(--status-info-bg)", color: "var(--status-info-fg)", fontSize: "var(--text-sm)", fontWeight: 600 } },
      React.createElement(Icon, { name: "shield", size: 17 }), React.createElement("span", null, React.createElement("strong", null, "Restricted — Special Education access."), " You see only students on your SpEd caseload. Access is logged."));
  }

  function SpedGoals({ app }) {
    const m = RP.students.marcus;
    return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 16 } },
      React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14 } },
        React.createElement(DS.Avatar, { name: U.shortName(m.name), size: "lg" }),
        React.createElement("div", { style: { flex: 1 } }, React.createElement("div", { style: { fontWeight: 700, fontSize: "var(--text-md)" } }, m.name + " · Grade 9"), React.createElement("div", { style: { fontSize: "var(--text-sm)", color: "var(--text-muted)" } }, m.iep.category)),
        React.createElement(DS.Badge, { tone: "warning" }, "Review " + m.iep.reviewDue)),
      React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } }, m.iep.goals.map((g, i) => React.createElement("div", { key: i, style: { padding: 14, border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)" } },
        React.createElement("div", { style: { fontWeight: 600, fontSize: "var(--text-sm)", marginBottom: 8 } }, g.goal),
        React.createElement(DS.ProgressBar, { value: g.pct, tone: "brand", showLabel: true }),
        React.createElement("div", { style: { display: "flex", gap: 18, marginTop: 8, fontSize: "var(--text-xs)", color: "var(--text-muted)", fontFamily: "var(--font-data)" } }, React.createElement("span", null, "Baseline: " + g.baseline), React.createElement("span", null, "Current: ", React.createElement("strong", { style: { color: "var(--text-brand)" } }, g.current)), React.createElement("span", null, "Target: " + g.target))))),
      React.createElement("div", { style: { borderTop: "1px solid var(--border-subtle)", paddingTop: 14 } },
        React.createElement(U.GenerateBlock, { label: "Draft measurable annual goals", icon: "sparkle" }, React.createElement(GoalDraftResult, { app }))));
  }

  function GoalDraftResult({ app }) {
    return React.createElement("div", null,
      React.createElement("p", { style: { margin: "0 0 8px", fontSize: "var(--text-sm)", color: "var(--text-body)", lineHeight: 1.7 } },
        React.createElement("strong", null, "Proposed Goal 3:"),
        " By the next annual review, Marcus will summarize a grade-level informational passage in 3–4 sentences with 80% accuracy across 4 of 5 trials, measured by curriculum-based assessment."),
      Sources(["Synergy · SpEd", "Progress monitoring · Q3", "IEP template"]),
      React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 12 } },
        React.createElement(DS.Button, { size: "sm", variant: "secondary" }, "Add to IEP"),
        React.createElement(DS.Button, { size: "sm", variant: "outline", onClick: () => app.openStudent("marcus") }, "Open profile")));
  }

  function SpecialEd({ active, app }) {
    if (active === "caseload") {
      return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 22 } },
        U.PageTitle({ eyebrow: "Special Education", title: "Good morning, Mr. Hayes", sub: "IEP caseload · compliance · goal progress" }),
        React.createElement(RestrictedBanner, null),
        React.createElement(U.Grid, { min: 200 },
          React.createElement(U.KpiTile, { label: "Active IEPs", value: "31" }),
          React.createElement(U.KpiTile, { label: "Reviews ≤30 days", value: "3", status: "warning" }),
          React.createElement(U.KpiTile, { label: "Goals on track", value: "86", unit: "%", status: "success" }),
          React.createElement(U.KpiTile, { label: "Compliance", value: "100", unit: "%", status: "success" }),
        ),
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, alignItems: "start" } },
          Panel({ title: "Compliance watch", icon: "bell", children: React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } }, RP.alerts.sped.map((a) => React.createElement(U.AlertCard, { key: a.id, alert: a, compact: true, onAction: (l, al) => { if (al && al.student) app.openStudent(al.student); } }))) }),
          Panel({ title: "My caseload", icon: "users", children: React.createElement(U.DataTable, { dense: true, onRowClick: (r) => r.id && app.openStudent(r.id), cols: [
            { key: "name", label: "Student" }, { key: "cat", label: "Category" },
            { key: "due", label: "Review", render: (r) => React.createElement(U.StatusPill, { status: r.tone }, r.due) },
          ], rows: [
            { id: "marcus", name: "Marcus Lee", cat: "Reading SLD", due: "12 days", tone: "warning" },
            { name: "Priya S.", cat: "Speech/Lang.", due: "21 days", tone: "success" },
            { name: "Devon M.", cat: "OHI", due: "29 days", tone: "success" },
          ] }) }),
        ),
      );
    }

    if (active === "goals") {
      return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 22 } },
        U.PageTitle({ eyebrow: "IEP Goals", title: "Goal drafting & tracking", sub: "Draft measurable annual goals and monitor progress — Marcus Lee, Reading." }),
        Panel({ icon: "target", accent: true, children: React.createElement(SpedGoals, { app }) }),
      );
    }

    if (active === "compliance") {
      return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 22 } },
        U.PageTitle({ eyebrow: "Compliance", title: "Deadline watch", sub: "Annual reviews and reevaluations with countdowns — one click drafts the notice." }),
        Panel({ title: "Upcoming deadlines", icon: "shield", children: React.createElement(U.DataTable, { onRowClick: (r) => r.id && app.openStudent(r.id), cols: [
          { key: "name", label: "Student" }, { key: "type", label: "Type" },
          { key: "due", label: "Due in", render: (r) => React.createElement(U.StatusPill, { status: r.tone }, r.due) },
          { key: "act", label: "", noSort: true, align: "right", render: (r) => r.id === "marcus" && React.createElement(DS.Button, { size: "sm", variant: "secondary", onClick: (e) => { e.stopPropagation && e.stopPropagation(); } }, "Draft notice") },
        ], rows: [
          { id: "marcus", name: "Marcus Lee", type: "Annual review", due: "12 days", tone: "warning" },
          { name: "Priya S.", type: "Reevaluation", due: "21 days", tone: "success" },
          { name: "Devon M.", type: "Annual review", due: "29 days", tone: "success" },
        ] }) }),
        Panel({ title: "Draft the annual review notice — Marcus Lee", icon: "sparkle", accent: true, children:
          React.createElement(U.GenerateBlock, { label: "Draft notice", icon: "sparkle" },
            React.createElement("div", null,
              React.createElement("div", { style: { padding: 16, background: "var(--neutral-50)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", fontSize: "var(--text-sm)", lineHeight: 1.6, color: "var(--text-body)" } }, "Dear Lee family, Marcus's annual IEP review is scheduled within the next two weeks. We'd love to meet to celebrate his reading progress and set goals for next year. Please let us know which times work best. The summary will be available in your preferred language."),
              Sources(["Synergy · SpEd", "IDEA Compliance Calendar"]),
              React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 12 } }, React.createElement(DS.Button, { size: "sm", variant: "secondary" }, "Send notice"), React.createElement(DS.Button, { size: "sm", variant: "outline" }, "Schedule meeting")))) }),
      );
    }

    if (active === "documents") {
      return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 22 } },
        U.PageTitle({ eyebrow: "Documents", title: "Parent-friendly IEP summary", sub: "After a meeting, generate a plain-language summary for the family — translatable." }),
        Panel({ title: "Generate summary — Marcus Lee's review", icon: "file", accent: true, children:
          React.createElement(U.GenerateBlock, { label: "Generate plain-language summary", icon: "sparkle" },
            React.createElement("div", null,
              React.createElement("div", { style: { padding: 18, background: "var(--neutral-50)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", fontSize: "var(--text-sm)", lineHeight: 1.7, color: "var(--text-body)" } }, "Thank you for meeting today about Marcus. The team agreed Marcus is making good progress in reading — he's reading faster and understanding more of what he reads. We'll keep giving him extra time on tests and the read-aloud tool, and we set new goals to help him keep improving. Our next check-in is at his annual review. Please reach out any time with questions."),
              Sources(["IEP Meeting · Today", "Plain-language mode"]),
              React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 12 } }, React.createElement(DS.Button, { size: "sm", variant: "secondary" }, "Send to family"), React.createElement(DS.Button, { size: "sm", variant: "outline", iconLeft: React.createElement(Icon, { name: "translate", size: 14 }) }, "Translate to Spanish")))) }),
      );
    }

    return React.createElement(U.ComingSoon, { title: "Meetings", body: "IEP and eligibility meetings with auto-drafted agendas and parent-friendly summaries. Upcoming: Marcus Lee annual review (within 12 days)." });
  }
  window.RPRoles.sped = SpecialEd;
})();
