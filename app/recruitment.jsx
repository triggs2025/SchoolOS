/* ============================================================
   Riverside Platform — Recruitment & Marketing surface
   Tours→enrollment funnel · intake "why" insights · auto-PDF on
   inquiry · digital-marketing aggregation · AI-data-center asset.
   (Mostly mock — the "butts in seats" story.)
   ============================================================ */
(function () {
  const { useState } = React;
  const DS = window.MITSTEMDesignSystem_177606;
  const Icon = window.RPIcon;
  const U = window.RPUI;
  const RP = window.RP;
  const Panel = U.Panel;

  /* ---- Funnel stage bar ---- */
  function Funnel() {
    const stages = [
      { label: "Visit requests", value: 17, color: "var(--purple-300)" },
      { label: "Toured", value: 13, color: "var(--purple-500)" },
      { label: "Applied", value: 6, color: "var(--gold-500)" },
      { label: "Enrolled", value: 2, color: "var(--green-500)" },
    ];
    const max = stages[0].value;
    return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } },
      stages.map((s, i) => {
        const prev = i ? stages[i - 1].value : s.value;
        const conv = i ? Math.round((s.value / prev) * 100) : 100;
        return React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 14 } },
          React.createElement("div", { style: { width: 130, fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--text-body)" } }, s.label),
          React.createElement("div", { style: { flex: 1, height: 34, borderRadius: "var(--radius-sm)", background: "var(--neutral-100)", overflow: "hidden", position: "relative" } },
            React.createElement("div", { style: { width: (s.value / max * 100) + "%", height: "100%", background: s.color, display: "flex", alignItems: "center", paddingLeft: 12, color: "#fff", fontWeight: 800, fontFamily: "var(--font-data)" } }, s.value)),
          React.createElement("div", { style: { width: 96, fontSize: "var(--text-xs)", color: "var(--text-muted)", textAlign: "right" } }, i ? conv + "% of prev" : "this month"));
      }));
  }

  /* ---- Auto-PDF moment ---- */
  function AutoPdf({ app }) {
    return React.createElement(U.GenerateBlock, { label: "Preview the auto-sent packet", icon: "file" },
      React.createElement("div", { style: { display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" } },
        React.createElement("div", { style: { width: 116, height: 150, borderRadius: "var(--radius-md)", background: "var(--surface-brand)", color: "#fff", border: "3px solid var(--color-accent)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, flexShrink: 0, boxShadow: "var(--shadow-md)" } },
          React.createElement("img", { src: "assets/eagle-white.png", style: { height: 40 }, alt: "" }),
          React.createElement("div", { style: { fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold-300)", fontWeight: 700, textAlign: "center", padding: "0 8px" } }, "Welcome to MIT STEM\u00b2")),
        React.createElement("div", { style: { flex: 1, minWidth: 240 } },
          React.createElement("p", { style: { margin: "0 0 10px", fontSize: "var(--text-sm)", color: "var(--text-body)", lineHeight: 1.6 } }, "The moment a family submits an inquiry, a polished school-info packet is generated and emailed automatically — programs, the STEM\u00b2 difference, the secure on-campus AI data center, and next steps to book a tour."),
          React.createElement("div", { style: { display: "flex", gap: 8 } },
            React.createElement(DS.Button, { size: "sm", variant: "secondary", iconLeft: React.createElement(Icon, { name: "mail", size: 14 }), onClick: () => app.toast("Info packet emailed to the family (PDF)") }, "Send packet now"),
            React.createElement(DS.Button, { size: "sm", variant: "outline", iconLeft: React.createElement(Icon, { name: "download", size: 14 }) }, "Download PDF")))));
  }

  function RecruitmentView({ role, app }) {
    return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 22 } },
      U.PageTitle({ eyebrow: "Recruitment & Enrollment", title: "ADM (Average Daily Membership)", sub: "Tours, conversion, and the marketing engine — the brain turns inquiries into enrollments.", right: React.createElement(DS.Button, { variant: "outline", iconLeft: React.createElement(Icon, { name: "sparkle", size: 16 }), onClick: () => app.openAssistant() }, "Ask about enrollment") }),
      React.createElement(U.Grid, { min: 200 },
        React.createElement(U.KpiTile, { label: "Open inquiries", value: "17", delta: 4, footnote: "this wk", spark: [8, 10, 11, 14, 17] }),
        React.createElement(U.KpiTile, { label: "Tour show rate", value: "76", unit: "%", delta: 6, deltaSuffix: "pt", status: "success" }),
        React.createElement(U.KpiTile, { label: "Inquiry→enroll", value: "12", unit: "%", status: "warning", footnote: "goal 18%" }),
        React.createElement(U.KpiTile, { label: "Seats to fill", value: "34", footnote: "by Aug", status: "warning" }),
      ),
      React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 22, alignItems: "start" } },
        Panel({ title: "Tours → enrollment funnel", sub: "This month", icon: "trending", children: React.createElement(Funnel, null) }),
        Panel({ title: "Why they inquired", sub: "From the tour-booking intake survey", icon: "compass", children:
          React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } },
            [["STEM\u00b2 / medicine focus", 58, "var(--purple-500)"], ["Small class size (24:1)", 24, "var(--gold-500)"], ["On-campus AI program", 12, "var(--blue-500)"], ["Other", 6, "var(--neutral-400)"]].map((r, i) => React.createElement("div", { key: i },
              React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: "var(--text-sm)", marginBottom: 4 } }, React.createElement("span", null, r[0]), React.createElement("span", { style: { fontFamily: "var(--font-data)", fontWeight: 700, color: "var(--text-brand)" } }, r[1] + "%")),
              React.createElement("div", { style: { height: 8, borderRadius: "var(--radius-full)", background: "var(--neutral-100)", overflow: "hidden" } }, React.createElement("div", { style: { width: r[1] + "%", height: "100%", background: r[2] } }))))) }),
      ),
      Panel({ title: "Auto-PDF on inquiry", sub: "Every new family gets a polished packet — instantly, no staff time", icon: "file", accent: true, children: React.createElement(AutoPdf, { app }) }),
      Panel({ title: "Toured, didn't enroll — follow up", sub: "The brain caught the drop-off and drafted outreach by reason", icon: "users", accent: true, children:
        React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } },
          React.createElement(U.DataTable, { cols: [
            { key: "family", label: "Family" }, { key: "toured", label: "Toured" }, { key: "reason", label: "Why no (intake survey)", wrap: true },
            { key: "act", label: "", noSort: true, align: "right", render: (r) => React.createElement(DS.Button, { size: "sm", variant: "outline", onClick: () => app.toast("Personalized follow-up sent to the " + r.family + " family") }, "Follow up") },
          ], rows: [
            { family: "Okafor", toured: "Jun 12", reason: "Wanted more on the medicine track" },
            { family: "Delgado", toured: "Jun 14", reason: "Worried about commute / transportation" },
            { family: "Park", toured: "Jun 20", reason: "Comparing with a charter — undecided" },
          ] }),
          React.createElement("div", { style: { display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 14px", borderRadius: "var(--radius-md)", background: "var(--purple-50)", border: "1px solid var(--purple-200)" } },
            React.createElement(Icon, { name: "sparkle", size: 16, style: { color: "var(--purple-600)", marginTop: 1 } }),
            React.createElement("span", { style: { fontSize: "var(--text-xs)", color: "var(--purple-700)", lineHeight: 1.5 } }, React.createElement("strong", null, "Suggested campaign: "), "Send the Okafor family the medicine-track one-pager, address transportation for Delgado, and a \u201cwhy MIT\u201d comparison for Park — each auto-personalized to their stated reason.")),
          React.createElement(DS.Button, { size: "sm", variant: "secondary", iconLeft: React.createElement(Icon, { name: "send", size: 14 }), style: { alignSelf: "flex-start" }, onClick: () => app.toast("Follow-up campaign sent to all 3 families — tracked in the funnel") }, "Send all follow-ups")) }),
      React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 22, alignItems: "start" } },
        Panel({ title: "Digital marketing", sub: "Weekly reach across channels · ~3% return", icon: "trending", right: React.createElement(U.ReplacesBadge, null, "ad dashboards"), children:
          React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 16 } },
            React.createElement(U.DataTable, { dense: true, cols: [
              { key: "ch", label: "Channel" }, { key: "views", label: "Views", align: "right", mono: true }, { key: "clicks", label: "Clicks", align: "right", mono: true }, { key: "inq", label: "Inquiries", align: "right", mono: true },
            ], rows: [
              { ch: "Facebook", views: "8,420", clicks: "246", inq: "9" },
              { ch: "Instagram", views: "6,100", clicks: "198", inq: "5" },
              { ch: "Google Ads", views: "3,950", clicks: "171", inq: "3" },
            ] }),
            React.createElement("div", { style: { display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 14px", borderRadius: "var(--radius-md)", background: "var(--purple-50)", border: "1px solid var(--purple-200)" } },
              React.createElement(Icon, { name: "sparkle", size: 16, style: { color: "var(--purple-600)", marginTop: 1 } }),
              React.createElement("span", { style: { fontSize: "var(--text-xs)", color: "var(--purple-700)", lineHeight: 1.5 } }, React.createElement("strong", null, "Suggestion: "), "Instagram converts best per click — shift 15% of Google budget there and boost the STEM\u00b2 reel that drove 5 inquiries.")),
            React.createElement(DS.Button, { size: "sm", variant: "outline", style: { alignSelf: "flex-start" }, onClick: () => app.toast("Budget shift drafted for your review") }, "Apply suggestion")) }),
        Panel({ title: "A recruitment asset, not just infrastructure", icon: "server", accent: true, children:
          React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } },
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12 } },
              React.createElement("span", { style: { width: 44, height: 44, borderRadius: "var(--radius-md)", background: "var(--purple-50)", color: "var(--purple-600)", display: "grid", placeItems: "center" } }, React.createElement(Icon, { name: "server", size: 22 })),
              React.createElement("div", { style: { fontWeight: 700, fontSize: "var(--text-md)", color: "var(--text-default)" } }, "Secure on-campus AI")),
            React.createElement("p", { style: { margin: 0, fontSize: "var(--text-sm)", color: "var(--text-body)", lineHeight: 1.6 } }, "\u201cMIT runs its own secure, internal AI data center, so your student stays ahead — and their data never leaves the district.\u201d A genuine differentiator on tours and in ads."),
            React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" } }, ["Data privacy", "STEM\u00b2 edge", "Parent FOMO"].map((t, i) => React.createElement(DS.Tag, { key: i, tone: "brand" }, t))),
            React.createElement(DS.Button, { size: "sm", variant: "outline", iconLeft: React.createElement(Icon, { name: "external", size: 14 }), style: { alignSelf: "flex-start" }, onClick: () => app.toast("Added to the tour talking-points one-pager") }, "Add to tour script")) }),
      ),
    );
  }

  window.RPRecruitmentView = RecruitmentView;
})();
