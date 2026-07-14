/* ============================================================
   Riverside Platform — StudentDrawer · MessageComposer ·
   ReportPreview · Shell (orchestrator + app API)
   ============================================================ */
(function () {
  const { useState } = React;
  const DS = window.MITSTEMDesignSystem_177606;
  const Icon = window.RPIcon;
  const RPUI = window.RPUI;
  const RP = window.RP;

  /* ============================================================
     STUDENT PROFILE DRAWER (reused across roles; role-scoped)
     ============================================================ */
  function ScopedRow({ locked, who, children }) {
    if (locked) {
      return React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: "var(--radius-md)", background: "var(--neutral-50)", border: "1px dashed var(--border-default)", color: "var(--text-subtle)", fontSize: "var(--text-sm)" } },
        React.createElement(Icon, { name: "lock", size: 15 }),
        React.createElement("span", null, children, " — ", React.createElement("span", { style: { fontWeight: 600 } }, "visible to ", who, " only")),
      );
    }
    return children;
  }

  function StudentDrawer({ open, onClose, studentId, role, onAction }) {
    const s = studentId && RP.students[studentId];
    const [logOpen, setLogOpen] = useState(false);
    if (!s) return React.createElement(RPUI.SlideOver, { open, onClose, width: 460, label: "Student" });
    const { StatusPill, Sparkline, SourceChip } = RPUI;
    const canSeeCounseling = role === "counselor" || role === "principal" || role === "superintendent";
    const canSeeIEP = role === "sped";
    return React.createElement(RPUI.SlideOver, { open, onClose, width: 480, label: "Student profile" },
      React.createElement(RPUI.PanelHead, { icon: "user", title: "Student Profile", sub: "Scoped to " + RP.roleById[role].title, onClose }),
      React.createElement("div", { style: { flex: 1, overflowY: "auto", background: "var(--neutral-50)" } },
        /* header */
        React.createElement("div", { style: { padding: 20, background: "var(--surface-card)", borderBottom: "1px solid var(--border-subtle)", display: "flex", gap: 16, alignItems: "center" } },
          React.createElement(DS.Avatar, { name: s.name, size: "xl", ring: s.status === "danger" }),
          React.createElement("div", { style: { flex: 1 } },
            React.createElement("h3", { style: { margin: 0, fontSize: "var(--text-xl)" } }, s.name),
            React.createElement("div", { style: { color: "var(--text-muted)", fontSize: "var(--text-sm)", margin: "2px 0 8px" } }, "Grade " + s.grade + " · " + s.school + " · " + s.language),
            React.createElement(StatusPill, { status: s.status }),
          ),
        ),
        React.createElement("div", { style: { padding: 18, display: "flex", flexDirection: "column", gap: 16 } },
          /* quick stats */
          React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 } },
            [["Attendance", s.attendance + "%", s.status], ["GPA", s.gpa, "neutral"], ["Absences", (s.absences || "—"), "neutral"]].map((k, i) =>
              React.createElement("div", { key: i, style: { background: "var(--surface-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: "12px 14px" } },
                React.createElement("div", { style: { fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", fontWeight: 700 } }, k[0]),
                React.createElement("div", { style: { fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontWeight: 900, color: "var(--text-default)", fontVariantNumeric: "tabular-nums" } }, k[1]))),
          ),
          s.attendanceTrend && React.createElement("div", { style: { background: "var(--surface-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: 14 } },
            React.createElement("div", { style: { fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", fontWeight: 700, marginBottom: 8 } }, "Attendance — 6-week trend"),
            React.createElement(Sparkline, { data: s.attendanceTrend, w: 400, h: 44, tone: "danger" })),
          /* flags */
          s.flags && React.createElement("div", null,
            React.createElement("div", { style: { fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", fontWeight: 700, marginBottom: 8 } }, "Flags"),
            React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 6 } }, s.flags.map((f, i) => React.createElement(DS.Badge, { key: i, tone: "warning" }, f)))),
          /* classes */
          s.classes && React.createElement("div", { style: { background: "var(--surface-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", overflow: "hidden" } },
            React.createElement("div", { style: { padding: "10px 14px", borderBottom: "1px solid var(--border-subtle)", fontWeight: 700, fontSize: "var(--text-sm)" } }, "Current Classes"),
            s.classes.map((c, i) => React.createElement("div", { key: i, style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderTop: i ? "1px solid var(--border-subtle)" : "none" } },
              React.createElement("div", null, React.createElement("div", { style: { fontWeight: 600, fontSize: "var(--text-sm)" } }, c.name), React.createElement("div", { style: { fontSize: "var(--text-xs)", color: "var(--text-muted)" } }, c.teacher)),
              React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
                React.createElement(Icon, { name: c.trend === "down" ? "trendingDown" : c.trend === "up" ? "trending" : "minus", size: 14, style: { color: c.trend === "down" ? "var(--red-500)" : c.trend === "up" ? "var(--green-500)" : "var(--neutral-400)" } }),
                React.createElement("span", { style: { fontFamily: "var(--font-data)", fontWeight: 700, fontSize: "var(--text-md)", color: "var(--text-default)" } }, c.grade))))),
          /* counseling notes — role scoped */
          React.createElement(ScopedRow, { locked: !canSeeCounseling, who: "counselors" }, canSeeCounseling
            ? React.createElement("div", { style: { background: "var(--surface-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: 14 } },
                React.createElement("div", { style: { fontWeight: 700, fontSize: "var(--text-sm)", marginBottom: 6 } }, "Counseling Notes"),
                React.createElement("p", { style: { margin: 0, fontSize: "var(--text-sm)", color: "var(--text-muted)", lineHeight: 1.5 } }, studentId === "diego" ? "Check-in scheduled. Exploring morning transportation barriers; family contact in Spanish pending." : "No active concerns logged."))
            : "Counseling notes"),
          /* IEP — sped only */
          React.createElement(ScopedRow, { locked: !canSeeIEP, who: "special education staff" }, canSeeIEP && s.iep
            ? React.createElement("div", { style: { background: "var(--surface-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: 14 } },
                React.createElement("div", { style: { fontWeight: 700, fontSize: "var(--text-sm)", marginBottom: 6 } }, "IEP Summary"),
                React.createElement("div", { style: { fontSize: "var(--text-sm)", color: "var(--text-muted)" } }, s.iep.category, " · review ", s.iep.reviewDue))
            : "IEP & accommodations"),
        ),
      ),
      /* footer: actions + audit */
      React.createElement("div", { style: { borderTop: "1px solid var(--border-subtle)", padding: 14, background: "var(--surface-card)", display: "flex", flexDirection: "column", gap: 10 } },
        React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } },
          (role === "admin" || role === "counselor") && studentId === "diego" && React.createElement(DS.Button, { size: "sm", variant: "secondary", iconLeft: React.createElement(Icon, { name: "message", size: 15 }), onClick: () => onAction && onAction("compose-diego") }, "Message parent (ES)"),
          React.createElement(DS.Button, { size: "sm", variant: "outline", onClick: onClose }, "Close")),
        React.createElement("button", { onClick: () => setLogOpen(!logOpen), style: { display: "inline-flex", alignItems: "center", gap: 6, alignSelf: "flex-start", background: "none", border: "none", color: "var(--text-subtle)", fontSize: "var(--text-xs)", cursor: "pointer", fontFamily: "var(--font-body)" } },
          React.createElement(Icon, { name: "eye", size: 13 }), "View access log"),
        logOpen && React.createElement("div", { style: { fontSize: "var(--text-2xs)", fontFamily: "var(--font-data)", color: "var(--text-subtle)", background: "var(--neutral-50)", borderRadius: "var(--radius-sm)", padding: "8px 10px", lineHeight: 1.7 } },
          "2026-06-29 08:42 · ", RP.roleById[role].name, " — viewed profile", React.createElement("br", null),
          "2026-06-28 15:10 · P. Nair — added counseling note", React.createElement("br", null),
          "2026-06-27 09:03 · S. Chen — viewed grades"),
      ),
    );
  }
  RPUI.StudentDrawer = StudentDrawer;

  /* ============================================================
     MESSAGE COMPOSER (with translation toggle)
     ============================================================ */
  const COMPOSER_PRESETS = {
    "compose-diego": {
      to: "Maria Marquez", toSub: "Parent of Diego Marquez (Grade 9) · prefers Spanish",
      subject: "Diego's attendance this week",
      en: "Hello Mrs. Marquez, we noticed Diego has missed 3 days this week. Is everything okay at home? We're here to help — please let us know if mornings or transportation are a challenge. Diego's counselor, Ms. Nair, is also available. — Linda Alvarez, MIT Front Office",
      es: "Hola Sra. Marquez, notamos que Diego ha faltado 3 días esta semana. ¿Está todo bien en casa? Estamos aquí para ayudar — por favor avísenos si las mañanas o el transporte son un desafío. La consejera de Diego, la Sra. Nair, también está disponible. — Linda Alvarez, Oficina de MIT",
      lang: "es", langLabel: "Spanish",
    },
    "parent-to-counselor": {
      to: "Ms. Priya Nair", toSub: "Diego's counselor · receives messages in English",
      subject: "Sobre la asistencia de Diego",
      es: "Hola Sra. Nair, estoy preocupada por las faltas de Diego. ¿Podemos hablar esta semana sobre cómo ayudarlo? Gracias. — Maria Marquez",
      en: "Hello Ms. Nair, I'm worried about Diego's absences. Can we talk this week about how to help him? Thank you. — Maria Marquez",
      lang: "es", langLabel: "Spanish", fromParent: true,
    },
  };

  function MessageComposer({ open, onClose, presetKey, lang, toast }) {
    const preset = COMPOSER_PRESETS[presetKey] || COMPOSER_PRESETS["compose-diego"];
    const [showTranslation, setShowTranslation] = useState(true);
    const [sent, setSent] = useState(false);
    const isES = lang === "es";
    const original = preset.fromParent ? preset.es : preset.en;
    const translated = preset.fromParent ? preset.en : preset.es;
    const origLabel = preset.fromParent ? "Original (Spanish)" : "Original (English)";
    const transLabel = preset.fromParent ? "Recipient reads (English)" : "Translated — " + preset.langLabel;
    function doSend() {
      window.RP_INBOX = window.RP_INBOX || [];
      if (!preset.fromParent) {
        // School → family: lands in the Parent's brain
        window.RP_INBOX.push({ to: "parent", from: preset.to === "Maria Marquez" ? "MIT Front Office" : "Ms. Nair, Counselor", es: preset.es, en: preset.en });
        toast && toast("Delivered to Maria in Spanish — she'll see it in her family app");
      } else {
        toast && toast("Sent to Ms. Nair in English — her reply returns to you in Spanish");
      }
      setSent(true);
    }
    React.useEffect(() => { if (open) setSent(false); }, [open, presetKey]);
    return React.createElement(RPUI.Modal, { open, onClose, width: 720, label: "Message composer" },
      React.createElement(RPUI.PanelHead, { icon: "message", title: isES ? "Redactar mensaje" : "Compose Message", sub: isES ? "Traducción bidireccional activada" : "Two-way translation on", onClose }),
      sent
        ? React.createElement("div", { style: { padding: 40, textAlign: "center" } },
            React.createElement("div", { style: { width: 56, height: 56, margin: "0 auto 16px", borderRadius: "50%", background: "var(--status-success-bg)", color: "var(--status-success-fg)", display: "grid", placeItems: "center" } }, React.createElement(Icon, { name: "check", size: 28 })),
            React.createElement("h3", { style: { margin: "0 0 6px" } }, isES ? "Mensaje enviado" : "Message sent"),
            React.createElement("p", { style: { color: "var(--text-muted)", fontSize: "var(--text-sm)", maxWidth: 420, margin: "0 auto 20px" } }, isES ? "Se entregó en el idioma preferido de la familia. La respuesta le llegará traducida." : "Delivered in the family's preferred language. Their reply will arrive translated for you."),
            React.createElement(DS.Button, { onClick: onClose }, isES ? "Listo" : "Done"))
        : React.createElement("div", { style: { padding: 22, display: "flex", flexDirection: "column", gap: 16 } },
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: "var(--neutral-50)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" } },
              React.createElement(DS.Avatar, { name: preset.to, size: "md" }),
              React.createElement("div", null, React.createElement("div", { style: { fontWeight: 700, fontSize: "var(--text-sm)" } }, (isES ? "Para: " : "To: ") + preset.to), React.createElement("div", { style: { fontSize: "var(--text-xs)", color: "var(--text-muted)" } }, preset.toSub))),
            React.createElement("div", null,
              React.createElement("label", { style: { fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" } }, isES ? "Asunto" : "Subject"),
              React.createElement(DS.Input, { defaultValue: preset.subject, style: { marginTop: 6 } })),
            React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 } },
              React.createElement("div", { style: { display: "inline-flex", alignItems: "center", gap: 7, fontSize: "var(--text-sm)", color: "var(--text-brand)", fontWeight: 700 } }, React.createElement(Icon, { name: "translate", size: 16 }), isES ? "Traducción automática" : "Auto-translation"),
              React.createElement(DS.Switch, { checked: showTranslation, onChange: setShowTranslation, label: showTranslation ? (isES ? "Mostrando ambos idiomas" : "Showing both languages") : (isES ? "Solo original" : "Original only") })),
            React.createElement("div", { style: { display: "grid", gridTemplateColumns: showTranslation ? "1fr 1fr" : "1fr", gap: 14 } },
              React.createElement("div", null,
                React.createElement("div", { style: { fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", fontWeight: 700, marginBottom: 6 } }, origLabel),
                React.createElement(DS.Textarea, { defaultValue: original, rows: 7 })),
              showTranslation && React.createElement("div", null,
                React.createElement("div", { style: { fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--gold-700)", fontWeight: 700, marginBottom: 6, display: "flex", alignItems: "center", gap: 5 } }, React.createElement(Icon, { name: "globe", size: 12 }), transLabel),
                React.createElement("div", { style: { padding: "10px 14px", borderRadius: "var(--radius-md)", border: "1px solid var(--gold-200)", background: "var(--gold-50)", fontSize: "var(--text-base)", lineHeight: 1.5, color: "var(--text-body)", minHeight: 158 } }, translated))),
            React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, borderTop: "1px solid var(--border-subtle)", paddingTop: 16 } },
              React.createElement("div", { style: { fontSize: "var(--text-xs)", color: "var(--text-subtle)", display: "flex", alignItems: "center", gap: 6 } }, React.createElement(Icon, { name: "lock", size: 12 }), isES ? "Registrado para el historial familiar" : "Logged to family communication history"),
              React.createElement("div", { style: { display: "flex", gap: 8 } },
                React.createElement(DS.Button, { variant: "outline", onClick: onClose }, isES ? "Cancelar" : "Cancel"),
                React.createElement(DS.Button, { variant: "secondary", iconLeft: React.createElement(Icon, { name: "send", size: 15 }), onClick: doSend }, isES ? "Enviar" : "Send"))),
          ),
    );
  }
  RPUI.MessageComposer = MessageComposer;

  /* ============================================================
     REPORT PREVIEW (board / exec summary document)
     ============================================================ */
  function ReportPreview({ open, onClose, onPresent }) {
    const d = RP.district;
    return React.createElement(RPUI.Modal, { open, onClose, width: 820, label: "Board report" },
      React.createElement(RPUI.PanelHead, { icon: "file", title: "Board Summary — June 2026", sub: "Assembled by the Assistant · review before export", onClose }),
      React.createElement("div", { style: { padding: "10px 22px 22px" } },
        React.createElement("div", { style: { background: "var(--gold-50)", border: "1px solid var(--gold-200)", borderRadius: "var(--radius-md)", padding: "10px 14px", fontSize: "var(--text-xs)", color: "var(--gold-700)", display: "flex", alignItems: "center", gap: 8, marginBottom: 18 } },
          React.createElement(Icon, { name: "clock", size: 14 }), React.createElement("span", null, React.createElement("strong", null, "Assembled in 8 seconds"), " from live district data — what used to take a half-day of spreadsheet work.")),
        React.createElement("div", { style: { border: "1px solid var(--border-default)", borderRadius: "var(--radius-md)", overflow: "hidden", boxShadow: "var(--shadow-sm)" } },
          /* doc header */
          React.createElement("div", { style: { background: "var(--surface-brand)", color: "#fff", padding: "20px 26px", display: "flex", alignItems: "center", gap: 14, borderBottom: "3px solid var(--color-accent)" } },
            React.createElement("img", { src: "assets/eagle-white.png", style: { height: 40 }, alt: "" }),
            React.createElement("div", null,
              React.createElement("div", { style: { fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", fontWeight: 700 } }, "Riverside Unified School District"),
              React.createElement("div", { style: { fontSize: "var(--text-xs)", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold-300)", fontWeight: 700, marginTop: 2 } }, "Monthly Board Summary · June 2026"))),
          React.createElement("div", { style: { padding: 26, background: "#fff" } },
            React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 } },
              [["Enrollment", d.students.toLocaleString()], ["Attendance", d.attendance + "%"], ["Chronic absent.", d.chronicAbsenteeism + "%"], ["On-track grad.", d.onTrackGrad + "%"]].map((k, i) =>
                React.createElement("div", { key: i, style: { textAlign: "center", padding: "12px 8px", borderRadius: "var(--radius-md)", background: "var(--neutral-50)" } },
                  React.createElement("div", { style: { fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "var(--text-3xl)", color: "var(--text-brand)", fontVariantNumeric: "tabular-nums" } }, k[1]),
                  React.createElement("div", { style: { fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, color: "var(--gold-700)", marginTop: 4 } }, k[0]))),
            ),
            React.createElement("div", { style: { marginBottom: 22, border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", overflow: "hidden" } },
              React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", background: "var(--neutral-50)", fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700, color: "var(--text-muted)" } },
                ["Metric", "Last month", "Last week", "Now"].map((h, i) => React.createElement("div", { key: i, style: { padding: "8px 12px", textAlign: i ? "right" : "left" } }, h))),
              [["District attendance", "94.1%", "93.6%", "93.4%"], ["MIT chronic absenteeism", "15%", "16%", "17%"], ["On-track to graduate", "87%", "88%", "88%"]].map((r, i) =>
                React.createElement("div", { key: i, style: { display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", borderTop: "1px solid var(--border-subtle)", fontSize: "var(--text-sm)" } },
                  r.map((c, j) => React.createElement("div", { key: j, style: { padding: "9px 12px", textAlign: j ? "right" : "left", fontFamily: j ? "var(--font-data)" : "inherit", fontWeight: j === 3 ? 800 : j === 0 ? 600 : 500, color: j === 3 ? "var(--text-brand)" : "var(--text-body)" } }, c)))),
            ),
            [["Attendance & Engagement", "District attendance holds at 93.4%. Chronic absenteeism is 14% district-wide but 17% at MIT, up 3 points this quarter and concentrated in 9th grade. Counselor outreach and a 9th-grade attendance push are underway."],
             ["Academics", "On-track-to-graduate is 88% district-wide. AP enrollment at MIT rose 11% year over year. Algebra I outcomes in two MIT sections are below benchmark on fractions and linear equations; targeted re-teach is scheduled."],
             ["Climate & Operations", "District climate index holds at 7.6/10. Transportation reliability dipped on Kings Ridge route 12 (under review). Food-services participation steady at 71%."],
             ["Equity", "~40% of families' home language is Spanish. All family communications now auto-translate; absence outreach is delivered in each family's preferred language."]].map((sec, i) =>
              React.createElement("div", { key: i, style: { marginBottom: 18 } },
                React.createElement("h4", { style: { margin: "0 0 6px", fontSize: "var(--text-md)", color: "var(--text-default)", borderBottom: "2px solid var(--gold-500)", paddingBottom: 5, display: "inline-block" } }, sec[0]),
                React.createElement("p", { style: { margin: 0, fontSize: "var(--text-sm)", color: "var(--text-body)", lineHeight: 1.6 } }, sec[1]))),
            React.createElement("div", { style: { marginTop: 8, paddingTop: 12, borderTop: "1px solid var(--border-subtle)", display: "flex", flexWrap: "wrap", gap: 6 } },
              ["Synergy · Attendance", "Synergy · Grades", "Synergy · Enrollment", "RUSD Climate Survey Q3", "Operations modules"].map((c, i) => React.createElement(RPUI.SourceChip, { key: i }, c))),
          ),
        ),
        React.createElement("div", { style: { display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 18 } },
          React.createElement(DS.Button, { variant: "outline", onClick: onClose }, "Close"),
          React.createElement(DS.Button, { variant: "outline", iconLeft: React.createElement(Icon, { name: "edit", size: 15 }) }, "Edit"),
          onPresent && React.createElement(DS.Button, { variant: "outline", iconLeft: React.createElement(Icon, { name: "external", size: 15 }), onClick: onPresent }, "Present to board"),
          React.createElement(DS.Button, { variant: "secondary", iconLeft: React.createElement(Icon, { name: "download", size: 15 }) }, "Export PDF")),
      ),
    );
  }
  RPUI.ReportPreview = ReportPreview;

  /* ============================================================
     SHELL — orchestrates chrome + overlays; exposes app API
     props: role, lang, setLang, onSwitchRole, renderView(active, app)
     ============================================================ */
  function Shell({ role, lang, setLang, onSwitchRole, renderView, topRightExtra, childId, setChildId }) {
    const nav = RP.nav[role] || [];
    const [active, setActive] = useState(nav[0] && nav[0].id);
    const [search, setSearch] = useState("");
    const [assistant, setAssistant] = useState(false);
    const [seed, setSeed] = useState(null);
    const [notif, setNotif] = useState(false);
    const [drawer, setDrawer] = useState(null);
    const [composer, setComposer] = useState(null);
    const [report, setReport] = useState(false);
    const [toasts, setToasts] = useState([]);
    const [present, setPresent] = useState(false);
    const [receipt, setReceipt] = useState(null);

    React.useEffect(() => { setActive(nav[0] && nav[0].id); }, [role]);

    function toast(message, tone = "success") {
      const id = Math.random().toString(36).slice(2);
      setToasts((t) => [...t, { id, message, tone }]);
      setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3400);
    }

    const app = {
      role, lang, active, setActive, childId, setChildId,
      openAssistant: (i) => { setSeed(i != null ? i : null); setAssistant(true); },
      openStudent: (id) => setDrawer(id),
      openComposer: (key) => setComposer(key || "compose-diego"),
      openReport: () => setReport(true),
      openPresent: () => setPresent(true),
      go: (id) => setActive(id),
      openReceipt: (kind) => setReceipt(kind),
      toast,
    };

    function handleAction(label, alert) {
      const l = (label || "").toLowerCase();
      if (l.includes("board summary") || l.includes("board packet") || l.includes("generate this month")) { setReport(true); return; }
      if (l.includes("message") || l.includes("outreach") || l.includes("translate family") || l.includes("composer") || l.includes("mensaje")) { setComposer(role === "parent" ? "parent-to-counselor" : "compose-diego"); setAssistant(false); setNotif(false); return; }
      if (l.includes("view") && alert && alert.student) { setDrawer(alert.student); setNotif(false); return; }
      if (alert && alert.student && (l.includes("student") || l.includes("plan") || l.includes("cohort"))) { setDrawer(alert.student); setNotif(false); return; }
      if (l.includes("view mit") || l.includes("drill")) { /* context handled in view */ }
      // default: gentle no-op feedback could go here
    }

    return React.createElement("div", { style: {
      display: "grid", gridTemplateAreas: "'top top' 'nav main'", gridTemplateColumns: "248px 1fr", gridTemplateRows: "64px 1fr",
      height: "100vh", width: "100vw", overflow: "hidden", background: "var(--surface-page)",
    } },
      React.createElement(RPUI._TopBar, { role, contextLabel: role === "principal" ? "MIT" : "All Schools", onAssistant: () => app.openAssistant(), onBell: () => setNotif(true), onSwitchRole, alertCount: (RP.alerts[role] || []).length, search, setSearch, rightExtra: topRightExtra, app }),
      React.createElement(RPUI._SideNav, { role, active, setActive, lang }),
      React.createElement("main", { style: { gridArea: "main", overflowY: "auto", padding: "28px 32px 60px" } },
        React.createElement("div", { style: { maxWidth: 1180, margin: "0 auto" } }, renderView(active, app))),
      React.createElement(RPUI.AssistantPanel, { open: assistant, onClose: () => setAssistant(false), role, lang, seed, onAction: (a) => handleAction(a) }),
      React.createElement(RPUI.NotificationsPanel, { open: notif, onClose: () => setNotif(false), role, lang, onAction: handleAction }),
      React.createElement(RPUI.StudentDrawer, { open: !!drawer, onClose: () => setDrawer(null), studentId: drawer, role, onAction: (a) => { if (a === "compose-diego") { setComposer("compose-diego"); } }, toast }),
      React.createElement(RPUI.MessageComposer, { open: !!composer, onClose: () => setComposer(null), presetKey: composer, lang, toast }),
      React.createElement(RPUI.ReportPreview, { open: report, onClose: () => setReport(false), onPresent: () => { setReport(false); setPresent(true); } }),
      React.createElement(RPUI.PresentMode, { open: present, onClose: () => setPresent(false) }),
      React.createElement(RPUI.ActionReceipt, { kind: receipt, onClose: () => setReceipt(null) }),
      React.createElement(RPUI.ToastStack, { toasts, onDismiss: (id) => setToasts((t) => t.filter((x) => x.id !== id)) }),
    );
  }
  RPUI.Shell = Shell;
})();
