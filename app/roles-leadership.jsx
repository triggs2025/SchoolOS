/* ============================================================
   Riverside Platform — Leadership roles
   Superintendent (district lens) · Principal (MIT campus lens)
   ============================================================ */
(function () {
  const { useState } = React;
  const DS = window.MITSTEMDesignSystem_177606;
  const Icon = window.RPIcon;
  const U = window.RPUI;
  const RP = window.RP;

  const Card = DS.Card;
  const card = { padding: 22 };

  function Panel({ title, sub, icon, right, children, accent }) {
    return React.createElement(Card, { padded: true, accent: accent ? "top" : "none", style: { display: "flex", flexDirection: "column" } },
      React.createElement(U.CardHead, { title, sub, icon, right }),
      children);
  }

  function OpsTile({ icon, name, value, status, detail, replaces }) {
    const [open, setOpen] = useState(false);
    const s = U.STATUS[status] || U.STATUS.neutral;
    return React.createElement("div", { style: { border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", overflow: "hidden", background: "var(--surface-card)" } },
      React.createElement("button", { onClick: () => setOpen(!open), style: { width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: "none", border: "none", cursor: "pointer", textAlign: "left" } },
        React.createElement("span", { style: { width: 38, height: 38, borderRadius: "var(--radius-md)", background: "var(--purple-50)", color: "var(--purple-600)", display: "grid", placeItems: "center", flexShrink: 0 } }, React.createElement(Icon, { name: icon, size: 19 })),
        React.createElement("div", { style: { flex: 1, minWidth: 0 } },
          React.createElement("div", { style: { fontWeight: 700, fontSize: "var(--text-sm)" } }, name),
          React.createElement("div", { style: { fontSize: "var(--text-xs)", color: "var(--text-muted)", fontFamily: "var(--font-data)" } }, value)),
        React.createElement(U.StatusPill, { status }),
        React.createElement(Icon, { name: open ? "chevronDown" : "chevronRight", size: 15, style: { color: "var(--text-subtle)" } })),
      open && React.createElement("div", { style: { padding: "0 16px 16px", borderTop: "1px solid var(--border-subtle)" } },
        React.createElement("p", { style: { margin: "12px 0", fontSize: "var(--text-sm)", color: "var(--text-muted)", lineHeight: 1.5 } }, detail),
        replaces && React.createElement(U.ReplacesBadge, null, replaces)),
    );
  }

  function ComingSoon({ title, body }) {
    return React.createElement(Card, { padded: true },
      React.createElement(U.CardHead, { title, icon: "info" }),
      React.createElement("p", { style: { margin: 0, color: "var(--text-muted)", fontSize: "var(--text-sm)", lineHeight: 1.6, maxWidth: 560 } }, body));
  }
  U.ComingSoon = ComingSoon;

  /* ============================================================
     SUPERINTENDENT
     ============================================================ */
  function Superintendent({ active, app }) {
    const d = RP.district;
    const [scope, setScope] = useState(null); // null = district, else school id

    if (active === "overview") {
      return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 22 } },
        U.PageTitle({ eyebrow: "District Command Center", title: "Good morning, Dr. Romero", sub: "Riverside Unified · ~3,000 students · system of record: Synergy", right: React.createElement(DS.Button, { variant: "secondary", iconLeft: React.createElement(Icon, { name: "file", size: 16 }), onClick: () => app.openReport() }, "Generate board summary") }),
        React.createElement(U.Grid, { min: 200 },
          React.createElement(U.KpiTile, { label: "Enrollment", value: "3,000", delta: 1.2, deltaSuffix: "%", footnote: "vs last yr", spark: [2890, 2920, 2955, 2980, 3000] }),
          React.createElement(U.KpiTile, { label: "Attendance", value: "93.4", unit: "%", delta: -0.4, deltaSuffix: "%", invertDelta: true, status: "warning", spark: [94.2, 94, 93.8, 93.5, 93.4], sparkTone: "danger" }),
          React.createElement(U.KpiTile, { label: "Chronic absenteeism", value: "14", unit: "%", delta: 1.0, deltaSuffix: "pt", invertDelta: true, status: "warning", spark: [12.5, 13, 13.4, 13.8, 14], sparkTone: "danger" }),
          React.createElement(U.KpiTile, { label: "On-track to grad.", value: "88", unit: "%", delta: 1.0, deltaSuffix: "pt", status: "success", spark: [86, 86.5, 87, 87.5, 88] }),
          React.createElement(U.KpiTile, { label: "Climate index", value: "7.6", footnote: "of 10", delta: 0, status: "success", spark: [7.5, 7.6, 7.5, 7.6, 7.6] }),
        ),
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 22, alignItems: "start" } },
          Panel({ title: "What needs your attention", sub: "The system speaks first", icon: "bell", children:
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } },
              (RP.alerts.superintendent).map((a) => React.createElement(U.AlertCard, { key: a.id, alert: a, compact: true, onAction: (label) => { if (label === "Generate board summary") app.openReport(); else if (label === "View MIT") setScope("mit"); } }))) }),
          Panel({ title: "District attendance — this term", icon: "trending", children:
            React.createElement(U.TrendChart, { points: [94.3, 94.1, 93.9, 93.7, 93.5, 93.4], labels: ["W1", "W2", "W3", "W4", "W5", "W6"], unit: "%", yMin: 90, yMax: 96, tone: "brand" }) }),
        ),
        Panel({ title: "Three schools at a glance", sub: "Chronic absenteeism vs. district average", icon: "building", right: React.createElement(DS.Button, { size: "sm", variant: "outline", onClick: () => app.go("schools") }, "Compare schools"), children:
          React.createElement(U.CompareBars, { unit: "%", baseline: { label: "District", value: 14 }, series: [ { label: "MIT", value: 17, tone: "danger" }, { label: "Kings Ridge", value: 12, tone: "brand" }, { label: "Riverside Trad.", value: 11, tone: "brand" } ] }) }),
        Panel({ title: "Operational health", sub: "Embedded modules — not separate logins", icon: "settings", children:
          React.createElement(U.Grid, { cols: 3, gap: 14 },
            React.createElement(OpsTile, { icon: "server", name: "IT & Devices", value: "98.2% uptime · 12 open tickets", status: "success", detail: "1:1 Chromebook fleet at 98% deployment. Network uptime 98.2% this month. 12 open help-desk tickets, none critical.", replaces: "Incident.io + asset tracker" }),
            React.createElement(OpsTile, { icon: "truck", name: "Transportation", value: "94% on-time · route 12 watch", status: "warning", detail: "On-time rate 94%. Kings Ridge route 12 delayed 4 of 5 days this week — affects 60 students. Driver shortage flagged.", replaces: "Routing subscription" }),
            React.createElement(OpsTile, { icon: "utensils", name: "Food Services", value: "71% participation · 0 incidents", status: "success", detail: "Meal participation steady at 71%. Free/reduced enrollment 58%. No compliance incidents this period.", replaces: "Nutrition portal" }),
          ) }),
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, alignItems: "start" } },
          Panel({ title: "Platform ROI", sub: "One system replaces the pile of subscriptions", icon: "award", accent: true, children:
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 16 } },
              React.createElement("div", { style: { display: "flex", gap: 24, flexWrap: "wrap" } },
                React.createElement("div", null, React.createElement("div", { style: { fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "var(--text-4xl)", color: "var(--text-brand)" } }, "$214K"), React.createElement("div", { style: { fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--gold-700)", fontWeight: 700 } }, "Est. annual savings")),
                React.createElement("div", null, React.createElement("div", { style: { fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "var(--text-4xl)", color: "var(--text-brand)" } }, "11"), React.createElement("div", { style: { fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--gold-700)", fontWeight: 700 } }, "Subscriptions retired"))),
              React.createElement(U.SegmentBar, { segments: [ { label: "SIS add-ons", value: 62, color: "var(--purple-500)" }, { label: "Comms/translation", value: 48, color: "var(--gold-500)" }, { label: "Analytics/BI", value: 54, color: "var(--blue-500)" }, { label: "Ops portals", value: 50, color: "var(--green-500)" } ] }),
              React.createElement("p", { style: { margin: 0, fontSize: "var(--text-xs)", color: "var(--text-muted)", lineHeight: 1.5 } }, "Consolidating attendance, communications, analytics, and operations onto one data foundation. Figures are illustrative for the board narrative.")) }),
          Panel({ title: "Chronic absenteeism — forecast", sub: "If the current trend holds", icon: "trendingDown", children:
            React.createElement("div", null,
              React.createElement(U.TrendChart, { points: [12.5, 13, 13.4, 13.8, 14, 14.6, 15.2], labels: ["W1", "W2", "W3", "W4", "Now", "+2", "+4"], unit: "%", yMin: 11, yMax: 17, tone: "danger" }),
              React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginTop: 10, fontSize: "var(--text-xs)", color: "var(--text-muted)" } },
                React.createElement("span", { style: { width: 22, height: 0, borderTop: "2px dashed var(--red-500)" } }),
                "Projected to reach 15.2% by spring without intervention.")) }),
        ),
      );
    }

    if (active === "schools") {
      if (scope) {
        const sc = RP.schools.find((s) => s.id === scope);
        return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 22 } },
          React.createElement("button", { onClick: () => setScope(null), style: { display: "inline-flex", alignItems: "center", gap: 6, alignSelf: "flex-start", background: "none", border: "none", color: "var(--text-link)", fontWeight: 600, cursor: "pointer", fontSize: "var(--text-sm)", fontFamily: "var(--font-body)" } }, React.createElement(Icon, { name: "chevronRight", size: 14, style: { transform: "rotate(180deg)" } }), "All schools"),
          U.PageTitle({ eyebrow: "Drilled to campus", title: sc.name, sub: sc.level + " · " + sc.students.toLocaleString() + " students · Principal " + sc.principal }),
          React.createElement(U.Grid, { min: 200 },
            React.createElement(U.KpiTile, { label: "Attendance", value: sc.attendance, unit: "%", status: sc.attendance < 93 ? "warning" : "success" }),
            React.createElement(U.KpiTile, { label: "Chronic absenteeism", value: sc.chronic, unit: "%", status: sc.chronic >= 15 ? "danger" : "warning" }),
            sc.onTrack && React.createElement(U.KpiTile, { label: "On-track to grad.", value: sc.onTrack, unit: "%", status: sc.onTrack < 86 ? "warning" : "success" }),
            React.createElement(U.KpiTile, { label: "Climate index", value: sc.climate, footnote: "of 10", status: "success" }),
          ),
          Panel({ title: "Why MIT's number is rising", icon: "sparkle", accent: true, right: React.createElement(DS.Button, { size: "sm", variant: "secondary", onClick: () => app.openAssistant(0) }, "Ask the Assistant"), children:
            React.createElement("p", { style: { margin: 0, color: "var(--text-body)", fontSize: "var(--text-sm)", lineHeight: 1.6 } }, "Chronic absenteeism is concentrated in 9th grade — a cluster of ~6 students whose attendance dropped over six weeks, with Monday/Friday and first-period patterns. Counselor outreach is underway; 2 families need Spanish-language contact.") }),
        );
      }
      return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 22 } },
        U.PageTitle({ eyebrow: "Schools", title: "District schools", sub: "Click a school to rescope the dashboard to that campus." }),
        React.createElement(U.Grid, { cols: 3, gap: 18 },
          RP.schools.map((s) => React.createElement(Card, { key: s.id, hoverable: true, accent: s.focus ? "top" : "none", style: { cursor: "pointer" }, onClick: () => setScope(s.id) },
            React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" } },
              React.createElement("div", null,
                React.createElement("h3", { style: { margin: 0, fontSize: "var(--text-lg)" } }, s.short),
                React.createElement("div", { style: { fontSize: "var(--text-xs)", color: "var(--text-muted)", marginTop: 2 } }, s.level)),
              s.focus && React.createElement(DS.Badge, { tone: "accent" }, "Focus")),
            React.createElement("p", { style: { margin: "10px 0 14px", fontSize: "var(--text-sm)", color: "var(--text-muted)" } }, s.note),
            React.createElement("div", { style: { display: "flex", gap: 16 } },
              React.createElement("div", null, React.createElement("div", { style: { fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "var(--text-2xl)", color: "var(--text-brand)" } }, s.attendance + "%"), React.createElement("div", { style: { fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-subtle)", fontWeight: 700 } }, "Attendance")),
              React.createElement("div", null, React.createElement("div", { style: { fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "var(--text-2xl)", color: s.chronic >= 15 ? "var(--red-500)" : "var(--text-brand)" } }, s.chronic + "%"), React.createElement("div", { style: { fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-subtle)", fontWeight: 700 } }, "Chronic abs."))),
            React.createElement("div", { style: { marginTop: 16, display: "flex", alignItems: "center", gap: 6, color: "var(--text-link)", fontWeight: 600, fontSize: "var(--text-sm)" } }, "Open campus view", React.createElement(Icon, { name: "arrowRight", size: 15 })),
          )),
        ),
      );
    }

    if (active === "operations") {
      return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 22 } },
        U.PageTitle({ eyebrow: "Operations", title: "Operational dashboards", sub: "IT, Transportation, and Food Services as embedded modules — one system, not three logins." }),
        React.createElement(U.Grid, { cols: 3, gap: 14 },
          React.createElement(OpsTile, { icon: "server", name: "IT & Devices", value: "98.2% uptime · 12 open tickets", status: "success", detail: "1:1 Chromebook fleet at 98% deployment. Network uptime 98.2%. 12 open help-desk tickets, none critical. Patch compliance 96%.", replaces: "Incident.io + asset tracker" }),
          React.createElement(OpsTile, { icon: "truck", name: "Transportation", value: "94% on-time · route 12 watch", status: "warning", detail: "On-time rate 94%. Kings Ridge route 12 delayed 4 of 5 days — 60 students affected. Driver shortage flagged for board.", replaces: "Routing subscription" }),
          React.createElement(OpsTile, { icon: "utensils", name: "Food Services", value: "71% participation", status: "success", detail: "Meal participation 71%. Free/reduced 58%. No compliance incidents. Inventory healthy.", replaces: "Nutrition portal" }),
        ),
        Panel({ title: "Why this lives here", icon: "info", children: React.createElement("p", { style: { margin: 0, color: "var(--text-muted)", fontSize: "var(--text-sm)", lineHeight: 1.6 } }, "Each operational system used to be a separate subscription with its own login. On the Platform they're modules on one data foundation — the Assistant can reason across attendance, transportation, and academics in a single question.") }),
      );
    }

    if (active === "reports") {
      return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 22 } },
        U.PageTitle({ eyebrow: "Reports", title: "Reports & board summaries", sub: "Assemble a board-ready document from live district data in seconds." }),
        Panel({ title: "Monthly board summary", icon: "file", accent: true, right: React.createElement(DS.Button, { variant: "secondary", iconLeft: React.createElement(Icon, { name: "sparkle", size: 16 }), onClick: () => app.openReport() }, "Generate this month's"), children:
          React.createElement("div", null,
            React.createElement("p", { style: { margin: "0 0 14px", color: "var(--text-muted)", fontSize: "var(--text-sm)", lineHeight: 1.6, maxWidth: 600 } }, "Pulls attendance, academics, climate, and operations into one clean document — with source citations — ready to present or export. What used to take a half-day of spreadsheet work now takes seconds."),
            React.createElement("div", { style: { display: "flex", gap: 8 } },
              React.createElement(DS.Button, { size: "sm", variant: "outline", iconLeft: React.createElement(Icon, { name: "file", size: 15 }), onClick: () => app.openReport() }, "Preview report"),
              React.createElement(DS.Button, { size: "sm", variant: "outline", iconLeft: React.createElement(Icon, { name: "external", size: 15 }), onClick: () => app.openPresent() }, "Present to board"))) }),
        React.createElement(U.Grid, { cols: 3, gap: 14 },
          ["Attendance deep-dive", "AP & dual-enrollment", "Equity & home language"].map((t, i) => React.createElement(Card, { key: i, hoverable: true, style: { cursor: "pointer" }, onClick: () => app.openReport() },
            React.createElement(Icon, { name: "file", size: 22, style: { color: "var(--color-primary)" } }),
            React.createElement("div", { style: { fontWeight: 700, marginTop: 10 } }, t),
            React.createElement("div", { style: { fontSize: "var(--text-xs)", color: "var(--text-muted)", marginTop: 4 } }, "Auto-generated · source-cited"))),
        ),
      );
    }

    if (active === "climate") {
      return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 22 } },
        U.PageTitle({ eyebrow: "Behavior & Climate", title: "What the brain could surface", sub: "Climate signals the platform can infer from connected data — shown as possibilities on mock data." }),
        React.createElement(U.Grid, { cols: 3, gap: 14, min: 240 },
          [["Belonging dip — MIT 9th grade", "Survey sentiment + the attendance cluster + fewer club sign-ups point to a belonging gap. AI could recommend an advisory focus.", "heart"],
           ["Referral hot-spot by period", "Behavior referrals concentrate in one passing period. AI could flag supervision coverage before it escalates.", "alert"],
           ["Connectedness win — Kings Ridge", "Rising participation + steady attendance suggest strong climate. AI could surface what's working to replicate.", "star"]].map((c, i) =>
            React.createElement(Card, { key: i, accent: "top" },
              React.createElement("span", { style: { width: 40, height: 40, borderRadius: "var(--radius-md)", background: "var(--purple-50)", color: "var(--purple-600)", display: "grid", placeItems: "center" } }, React.createElement(Icon, { name: c[2], size: 20 })),
              React.createElement("div", { style: { fontWeight: 700, marginTop: 12, fontSize: "var(--text-md)" } }, c[0]),
              React.createElement("p", { style: { margin: "6px 0 12px", fontSize: "var(--text-sm)", color: "var(--text-muted)", lineHeight: 1.5 } }, c[1]),
              React.createElement(DS.Badge, { tone: "brand" }, "AI inference"))),
        ),
        Panel({ title: "Ask the brain about climate", icon: "sparkle", children: React.createElement(DS.Button, { variant: "outline", iconLeft: React.createElement(Icon, { name: "sparkle", size: 15 }), onClick: () => app.openAssistant() }, "Open the assistant") }),
      );
    }
    if (active === "academics") {
      return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 22 } },
        U.PageTitle({ eyebrow: "Academics", title: "Academics — light touch", sub: "Curriculum & licensing run behind the scenes. The brain only surfaces what needs a decision." }),
        React.createElement(U.Grid, { min: 200 },
          React.createElement(U.KpiTile, { label: "On-track to grad.", value: "88", unit: "%", status: "success" }),
          React.createElement(U.KpiTile, { label: "AP enrollment", value: "+11", unit: "%", footnote: "YoY", status: "success" }),
          React.createElement(U.KpiTile, { label: "Curriculum licenses", value: "OK", footnote: "auto-renew" }),
          React.createElement(U.KpiTile, { label: "Library checkouts", value: "1.2k", footnote: "this term" }),
        ),
        Panel({ title: "The one thing worth your attention", icon: "book", accent: true, children:
          React.createElement("p", { style: { margin: 0, fontSize: "var(--text-sm)", color: "var(--text-body)", lineHeight: 1.6 } }, "Algebra I outcomes in two MIT sections are below benchmark on fractions and linear equations — a targeted re-teach is already scheduled and the teacher has the plan. Everything else is on track and doesn't need you.") }),
      );
    }

    const map = {
      attendance: ["Attendance", "District attendance holds at 93.4%. MIT trails at 91.8% with chronic absenteeism at 17%, concentrated in 9th grade. Use the Assistant to compare schools or summarize the 9th-grade problem for the board."],
      staff: ["Staff", "Staffing is stable across all three campuses. Two transportation driver vacancies are affecting Kings Ridge route 12. Professional-development completion is at 92%."],
    };
    const m = map[active];
    return m ? React.createElement(U.ComingSoon, { title: m[0], body: m[1] }) : null;
  }
  window.RPRoles = window.RPRoles || {};
  window.RPRoles.superintendent = Superintendent;

  /* ============================================================
     PRINCIPAL — MIT campus lens
     ============================================================ */
  function Principal({ active, app }) {
    const mit = RP.schools.find((s) => s.id === "mit");
    const [grade, setGrade] = useState(null);

    if (active === "overview") {
      return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 22 } },
        U.PageTitle({ eyebrow: "Maricopa Institute of Technology", title: "Good morning, Principal Bell", sub: "Grades 9–12 · 1,180 students · STEM² magnet", right: React.createElement(DS.Button, { variant: "outline", iconLeft: React.createElement(Icon, { name: "sparkle", size: 16 }), onClick: () => app.openAssistant() }, "Ask the Assistant") }),
        React.createElement(U.Grid, { min: 200 },
          React.createElement(U.KpiTile, { label: "Attendance today", value: "90.6", unit: "%", status: "warning", spark: [92, 91.5, 91, 90.8, 90.6], sparkTone: "danger" }),
          React.createElement(U.KpiTile, { label: "Chronic absenteeism", value: "17", unit: "%", delta: 3, deltaSuffix: "pt", invertDelta: true, status: "danger" }),
          React.createElement(U.KpiTile, { label: "On-track to grad.", value: "84", unit: "%", status: "warning" }),
          React.createElement(U.KpiTile, { label: "Climate index", value: "7.1", footnote: "of 10", status: "warning" }),
        ),
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: 22, alignItems: "start" } },
          Panel({ title: "Needs your attention", icon: "bell", children:
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } },
              RP.alerts.principal.map((a) => React.createElement(U.AlertCard, { key: a.id, alert: a, compact: true, onAction: (l) => { if (l.toLowerCase().includes("cohort")) { setGrade(9); app.go("attendance"); } else if (l.toLowerCase().includes("class")) app.go("teachers"); } }))) }),
          Panel({ title: "Grade-level attendance", sub: "9th grade is the outlier", icon: "users", children:
            React.createElement(U.CompareBars, { unit: "%", baseline: { label: "School", value: 91.8 }, max: 100, series: [ { label: "Grade 9", value: 88.1, tone: "danger" }, { label: "Grade 10", value: 92.4, tone: "brand" }, { label: "Grade 11", value: 93.1, tone: "brand" }, { label: "Grade 12", value: 93.6, tone: "brand" } ] }) }),
        ),
        Panel({ title: "Teacher support signals", sub: "Where coaching or resources may help — framed as support, not surveillance", icon: "heart", right: React.createElement(DS.Button, { size: "sm", variant: "outline", onClick: () => app.go("teachers") }, "Open teacher view"), children:
          React.createElement(U.DataTable, { dense: true, cols: [
            { key: "name", label: "Teacher" }, { key: "subject", label: "Focus area" },
            { key: "signal", label: "Signal", render: (r) => React.createElement(U.StatusPill, { status: r.tone }, r.signal) },
          ], rows: [
            { name: "Ms. Sarah Chen", subject: "Algebra I · P2 — fractions/linear eq.", signal: "Re-teach suggested", tone: "warning" },
            { name: "Mr. David Park", subject: "Biology — labs", signal: "On track", tone: "success" },
            { name: "Dr. Vance", subject: "Chemistry", signal: "On track", tone: "success" },
          ] }) }),
      );
    }

    if (active === "attendance") {
      return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 22 } },
        U.PageTitle({ eyebrow: "Attendance", title: grade ? "Grade 9 — attendance deep dive" : "MIT attendance", sub: grade ? "The dip, the affected cohort, and a suggested intervention." : "Select a grade to drill in. Grade 9 needs attention.", right: grade && React.createElement(DS.Button, { size: "sm", variant: "outline", onClick: () => setGrade(null) }, "All grades") }),
        !grade && React.createElement(U.Grid, { cols: 4, gap: 14 }, [9, 10, 11, 12].map((g) => React.createElement(Card, { key: g, hoverable: true, accent: g === 9 ? "top" : "none", style: { cursor: "pointer", textAlign: "center" }, onClick: () => setGrade(g) },
          React.createElement("div", { style: { fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "var(--text-4xl)", color: g === 9 ? "var(--red-500)" : "var(--text-brand)" } }, [88.1, 92.4, 93.1, 93.6][g - 9] + "%"),
          React.createElement("div", { style: { fontSize: "var(--text-sm)", fontWeight: 700, marginTop: 4 } }, "Grade " + g),
          g === 9 && React.createElement("div", { style: { marginTop: 8 } }, React.createElement(U.StatusPill, { status: "danger" }, "Cluster forming"))))),
        grade === 9 && React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 22 } },
          React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, alignItems: "start" } },
            Panel({ title: "9th-grade attendance — 6 weeks", icon: "trendingDown", children: React.createElement(U.TrendChart, { points: [95, 93.5, 92, 90.5, 89, 88.1], labels: ["W1", "W2", "W3", "W4", "W5", "W6"], unit: "%", yMin: 85, yMax: 97, tone: "danger" }) }),
            Panel({ title: "Suggested intervention", icon: "sparkle", accent: true, right: React.createElement(DS.Button, { size: "sm", variant: "secondary", onClick: () => app.openAssistant(0) }, "Ask Assistant"), children:
              React.createElement("ol", { style: { margin: 0, paddingLeft: 18, fontSize: "var(--text-sm)", color: "var(--text-body)", lineHeight: 1.7 } },
                React.createElement("li", null, "First-period greeters + Monday/Friday focus"),
                React.createElement("li", null, "Same-day family outreach (2 families need Spanish)"),
                React.createElement("li", null, "Counselor check-ins for the 6 priority students"),
                React.createElement("li", null, "2-week goal: lift cohort to 90%+")) }),
          ),
          Panel({ title: "Affected cohort — 6 students trending toward chronic absence", icon: "users", children:
            React.createElement(U.DataTable, { onRowClick: (r) => r.id && app.openStudent(r.id), cols: [
              { key: "name", label: "Student" }, { key: "att", label: "Attendance", align: "right", mono: true },
              { key: "trend", label: "Trend", render: (r) => React.createElement(Icon, { name: "trendingDown", size: 15, style: { color: "var(--red-500)" } }) },
              { key: "lang", label: "Home language" },
              { key: "go", label: "", noSort: true, render: () => React.createElement(Icon, { name: "chevronRight", size: 15, style: { color: "var(--text-subtle)" } }) },
            ], rows: [
              { id: "diego", name: "Diego Marquez", att: "82%", lang: "Spanish" },
              { name: "Kayla Brooks", att: "84%", lang: "English" },
              { name: "Sam Whitfield", att: "85%", lang: "English" },
              { name: "Luis Ortega", att: "86%", lang: "Spanish" },
              { name: "Mia Roth", att: "87%", lang: "English" },
              { name: "Jordan Pace", att: "88%", lang: "English" },
            ] }) }),
        ),
      );
    }

    if (active === "teachers") {
      return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 22 } },
        U.PageTitle({ eyebrow: "Teachers", title: "Teacher support", sub: "Where instructional outcomes lag and what the Assistant recommends — support, not surveillance." }),
        Panel({ title: "Outcomes by section", icon: "book", children:
          React.createElement(U.DataTable, { cols: [
            { key: "cls", label: "Class / Section" }, { key: "teacher", label: "Teacher" },
            { key: "pass", label: "Pass rate", align: "right", mono: true },
            { key: "rec", label: "Recommendation", render: (r) => React.createElement(U.StatusPill, { status: r.tone }, r.rec) },
          ], rows: [
            { cls: "Algebra I · P2", teacher: "Ms. Chen", pass: "61%", rec: "Re-teach block", tone: "warning" },
            { cls: "Algebra I · P4", teacher: "Ms. Chen", pass: "79%", rec: "On track", tone: "success" },
            { cls: "Biology · P1", teacher: "Mr. Park", pass: "81%", rec: "On track", tone: "success" },
            { cls: "Chemistry · P3", teacher: "Dr. Vance", pass: "84%", rec: "On track", tone: "success" },
          ] }) }),
        Panel({ title: "Coaching recommendation", icon: "sparkle", accent: true, right: React.createElement(DS.Button, { size: "sm", variant: "secondary", onClick: () => app.openAssistant(1) }, "Ask the Assistant"), children:
          React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } },
            React.createElement("p", { style: { margin: 0, fontSize: "var(--text-sm)", color: "var(--text-body)", lineHeight: 1.6 } }, "Algebra I P2 is the only lagging section, and Ms. Chen's other sections are strong — this reads as a specific-topic gap (fractions / linear equations), not a teaching concern. Recommended: a shared re-teach block and a differentiated worksheet before Friday's unit test."),
            React.createElement("div", { style: { fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" } }, "Schedule a coaching session"),
            React.createElement(U.Scheduler, { slots: ["Tue 1:00 PM (Ms. Chen prep)", "Wed 9:10 AM", "Thu 2:45 PM"], onConfirm: () => app.toast("Coaching session scheduled with Ms. Chen") }),
            React.createElement("div", { style: { display: "flex", gap: 8 } },
              React.createElement(DS.Button, { size: "sm", variant: "outline", iconLeft: React.createElement(Icon, { name: "folder", size: 14 }), onClick: () => app.toast("Fractions re-teach pack shared with Ms. Chen") }, "Share resource pack"),
              React.createElement(DS.Button, { size: "sm", variant: "outline", iconLeft: React.createElement(Icon, { name: "message", size: 14 }), onClick: () => app.toast("Encouraging note sent to Ms. Chen") }, "Send a note"))) }),
        Panel({ title: "Walkthrough & observation log", icon: "eye", children:
          React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } },
            React.createElement(U.DataTable, { dense: true, cols: [
              { key: "date", label: "Date" }, { key: "teacher", label: "Teacher" }, { key: "focus", label: "Focus" },
              { key: "note", label: "Glow / grow", wrap: true },
            ], rows: [
              { date: "Jun 24", teacher: "Ms. Chen", focus: "Student discourse", note: "Strong questioning; consider more wait-time." },
              { date: "Jun 18", teacher: "Mr. Park", focus: "Lab safety", note: "Excellent routines. No grows noted." },
              { date: "Jun 12", teacher: "Dr. Vance", focus: "Pacing", note: "Tighten the opener by 4 min." },
            ] }),
            React.createElement(DS.Button, { size: "sm", variant: "outline", iconLeft: React.createElement(Icon, { name: "plus", size: 14 }), style: { alignSelf: "flex-start" }, onClick: () => app.toast("New walkthrough started") }, "Log a walkthrough")) }),
      );
    }

    if (active === "behavior") {
      return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 22 } },
        U.PageTitle({ eyebrow: "Behavior & Climate", title: "Climate check", sub: "Survey signals and the Assistant's suggested response." }),
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 22, alignItems: "start" } },
          Panel({ title: "Climate index by grade", icon: "heart", children: React.createElement("div", { style: { display: "flex", gap: 18, justifyContent: "space-around", padding: "8px 0" } }, [["9", 6.4, "warning"], ["10", 7.2, "success"], ["11", 7.5, "success"], ["12", 7.6, "success"]].map((g, i) => React.createElement("div", { key: i, style: { textAlign: "center" } }, React.createElement(U.DonutRing, { value: g[1] * 10, label: g[1], size: 88, stroke: 9, tone: g[2] }), React.createElement("div", { style: { marginTop: 8, fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--text-muted)" } }, "Grade " + g[0])))) }),
          Panel({ title: "Flag & suggested response", icon: "sparkle", accent: true, children:
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } },
              React.createElement(U.AlertCard, { alert: { severity: "warning", headline: "9th-grade morale dipped this quarter", why: "Survey signals show lower belonging scores, correlating with the attendance cluster.", actions: ["Suggested response"] }, compact: true, onAction: () => app.openAssistant() }),
              React.createElement("p", { style: { margin: 0, fontSize: "var(--text-sm)", color: "var(--text-muted)", lineHeight: 1.6 } }, "Recommended: a 9th-grade advisory focus on belonging, paired with the attendance push. Pull the cohort's counselors in for a coordinated check-in.")) }),
        ),
      );
    }

    if (active === "operations") {
      return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 22 } },
        U.PageTitle({ eyebrow: "Operations", title: "Today's staffing & coverage", sub: "Substitute coverage, campus modules, and what still needs a body in the room." }),
        React.createElement(U.Grid, { min: 190 },
          React.createElement(U.KpiTile, { label: "Staff present", value: "58", footnote: "of 62" }),
          React.createElement(U.KpiTile, { label: "Absent today", value: "4", status: "warning" }),
          React.createElement(U.KpiTile, { label: "Subs confirmed", value: "3", status: "warning" }),
          React.createElement(U.KpiTile, { label: "Coverage gap", value: "1", status: "danger" }),
        ),
        Panel({ title: "Substitute coverage", sub: "One period still uncovered", icon: "users", accent: true, children:
          React.createElement(U.DataTable, { cols: [
            { key: "teacher", label: "Out today" }, { key: "period", label: "Class / period" },
            { key: "sub", label: "Coverage", render: (r) => React.createElement(U.StatusPill, { status: r.tone }, r.sub) },
            { key: "act", label: "", noSort: true, align: "right", render: (r) => r.tone === "danger" && React.createElement(DS.Button, { size: "sm", variant: "secondary", onClick: () => app.toast("Coverage request sent to the sub pool") }, "Find a sub") },
          ], rows: [
            { teacher: "Mr. Ruiz", period: "World History · P1–P3", sub: "Sub: J. Adler", tone: "success" },
            { teacher: "Ms. Holt", period: "English 9 · P2", sub: "Sub: covered", tone: "success" },
            { teacher: "Coach Lee", period: "PE · P4", sub: "Internal cover", tone: "success" },
            { teacher: "Dr. Vance", period: "Chemistry · P3", sub: "Uncovered", tone: "danger" },
          ] }) }),
        Panel({ title: "Campus modules", icon: "settings", children:
          React.createElement(U.Grid, { cols: 3, gap: 14 },
            React.createElement(OpsTile, { icon: "server", name: "IT & Devices", value: "Fleet 98% · 3 tickets", status: "success", detail: "Campus device fleet healthy. 3 open tickets, all routine.", replaces: "Asset tracker" }),
            React.createElement(OpsTile, { icon: "truck", name: "Transportation", value: "All MIT routes on-time", status: "success", detail: "MIT routes running on time. The route 12 issue is district-level (Kings Ridge).", replaces: "Routing subscription" }),
            React.createElement(OpsTile, { icon: "utensils", name: "Food Services", value: "74% participation", status: "success", detail: "Campus meal participation 74%, above district average.", replaces: "Nutrition portal" })) }),
      );
    }

    const map = {
      grades: ["Grades & Performance", "On-track-to-graduate is 84% — below the district's 88%. AP enrollment is up 11%. The clearest gap is Algebra I on fractions and linear equations; the Assistant has a re-teach plan ready for Ms. Chen."],
      reports: ["Reports", "Generate a campus board summary, an attendance deep-dive, or a teacher-support brief — each assembled from live data with source citations."],
    };
    const m = map[active];
    return m ? React.createElement(U.ComingSoon, { title: m[0], body: m[1] }) : null;
  }
  window.RPRoles.principal = Principal;
})();
