/* ============================================================
   Riverside Platform — Family roles
   Student (Tyler Nguyen · catch-up view) · Parent (Maria Marquez · EN/ES)
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

  /* ============================================================
     STUDENT — Tyler Nguyen (encouraging, age-appropriate)
     ============================================================ */
  function Student({ active, app }) {
    const t = RP.students.tyler;
    if (active === "progress") {
      return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 22 } },
        U.PageTitle({ eyebrow: "How I'm doing", title: "Hi Tyler — you're making progress", sub: "You're close on a couple of topics. A little practice and you've got this." }),
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, alignItems: "start" } },
          Panel({ title: "My strengths", icon: "star", children:
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } }, t.topicMastery.filter((m) => m.pct >= 70).concat([{ topic: "Showing up — 96% attendance", pct: 96 }]).map((m, i) => React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 10 } }, React.createElement(Icon, { name: "check", size: 16, style: { color: "var(--green-500)" } }), React.createElement("span", { style: { flex: 1, fontSize: "var(--text-sm)" } }, m.topic), React.createElement("span", { style: { fontFamily: "var(--font-data)", fontWeight: 700, color: "var(--green-700)" } }, m.pct + "%")))) }),
          Panel({ title: "Focus areas", icon: "target", accent: true, children:
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } }, t.topicMastery.filter((m) => m.pct < 60).map((m, i) => React.createElement("div", { key: i },
              React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: "var(--text-sm)", marginBottom: 5 } }, React.createElement("span", { style: { fontWeight: 600 } }, m.topic), React.createElement("span", { style: { fontFamily: "var(--font-data)", color: "var(--amber-700)", fontWeight: 700 } }, m.pct + "%")),
              React.createElement(DS.ProgressBar, { value: m.pct, tone: "accent" })))) }),
        ),
        Panel({ title: "Your catch-up plan", sub: "Fractions need a little work — here's a simple path", icon: "sparkle", accent: true, children:
          React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } },
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, [["1", "Watch: common denominators (4 min)", "play"], ["2", "Practice: 5 fraction problems with hints", "edit"], ["3", "Try: 3 linear equations, step by step", "target"], ["4", "Quick check before Friday's test", "check"]].map((s, i) => React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)" } },
              React.createElement("span", { style: { width: 26, height: 26, borderRadius: "50%", background: "var(--purple-500)", color: "#fff", display: "grid", placeItems: "center", fontWeight: 800, fontSize: "var(--text-sm)", fontFamily: "var(--font-data)" } }, s[0]),
              React.createElement("span", { style: { flex: 1, fontSize: "var(--text-sm)" } }, s[1]),
              React.createElement(Icon, { name: "chevronRight", size: 16, style: { color: "var(--text-subtle)" } })))),
            React.createElement("div", { style: { display: "flex", gap: 8 } }, React.createElement(DS.Button, { variant: "secondary", iconLeft: React.createElement(Icon, { name: "sparkle", size: 15 }), onClick: () => app.openAssistant(0) }, "Start with the tutor"), React.createElement(DS.Button, { variant: "outline", onClick: () => app.go("help") }, "Get help anytime"))) }),
      );
    }

    if (active === "help") {
      return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 22 } },
        U.PageTitle({ eyebrow: "Get Help", title: "Your 24/7 tutor", sub: "Stuck on homework at 9pm? Ask away — the tutor explains step by step, never just the answer." }),
        Panel({ icon: "help", accent: true, children:
          React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" } },
            React.createElement("p", { style: { margin: 0, fontSize: "var(--text-sm)", color: "var(--text-body)", lineHeight: 1.6 } }, "Try one of these, or open the tutor and type your own question:"),
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8, width: "100%", maxWidth: 460 } }, RP.assistant.student.prompts.map((p, i) => React.createElement("button", { key: i, onClick: () => app.openAssistant(i), style: { textAlign: "left", padding: "11px 14px", borderRadius: "var(--radius-md)", border: "1px solid var(--purple-200)", background: "var(--purple-50)", color: "var(--purple-700)", fontSize: "var(--text-sm)", fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-body)" } }, p))),
            React.createElement(DS.Button, { variant: "secondary", iconLeft: React.createElement(Icon, { name: "sparkle", size: 15 }), onClick: () => app.openAssistant() }, "Open the tutor")) }),
      );
    }

    if (active === "tools") {
      return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 22 } },
        U.PageTitle({ eyebrow: "Study Tools", title: "Make study materials", sub: "Flashcards, practice quizzes, and writing feedback — built for what you're learning." }),
        React.createElement(U.Grid, { cols: 3, gap: 16 },
          [["Flashcards", "edit", "Make a set for Friday's Algebra test"], ["Practice quiz", "check", "5 questions on linear equations"], ["Writing feedback", "book", "Friendly notes on your essay draft"]].map((c, i) => React.createElement(DS.Card, { key: i, hoverable: true, style: { cursor: "pointer" }, onClick: () => app.openAssistant(1) },
            React.createElement("span", { style: { width: 40, height: 40, borderRadius: "var(--radius-md)", background: "var(--purple-50)", color: "var(--purple-600)", display: "grid", placeItems: "center" } }, React.createElement(Icon, { name: c[1], size: 20 })),
            React.createElement("div", { style: { fontWeight: 700, marginTop: 12 } }, c[0]),
            React.createElement("p", { style: { margin: "4px 0 0", fontSize: "var(--text-sm)", color: "var(--text-muted)", lineHeight: 1.5 } }, c[2])))),
      );
    }

    const map = {
      classes: ["My Classes", "Algebra I, Chemistry, English, World History, and PE. Algebra I is your focus right now — your catch-up plan is on My Progress. Everything you turn in shows up here automatically."],
      goals: ["Goals", "Your goal: master linear equations before Friday's test. You're at 38% — the tutor and your catch-up plan will get you there. Small wins add up!"],
    };
    const m = map[active];
    return m ? React.createElement(U.ComingSoon, { title: m[0], body: m[1] }) : null;
  }
  window.RPRoles.student = Student;

  /* ============================================================
     PARENT — Maria Marquez (full EN/ES)
     ============================================================ */
  const PT = {
    en: {
      greeting: "Welcome", child: "Diego Marquez · Grade 9",
      snapshot: "Diego's snapshot this month", attTitle: "Attendance is slipping",
      attBody: "Diego's attendance dropped to 82% — he's missed 4 days, mostly Mondays. The school noticed and his counselor is ready to help.",
      meansTitle: "What this means", meansBody: "Missing 4 days a month adds up to nearly 20% of class time over a semester. The good news: small changes at home make a big difference, and Diego's grades are mostly steady.",
      helpTitle: "Three things you can do at home",
      help: ["Help Diego get to school on time each morning — especially Mondays.", "Ask him to teach you one math problem out loud — it builds confidence.", "Reach out to his counselor, Ms. Nair, who's ready to support."],
      msgCounselor: "Message the counselor", seeTips: "See support tips",
      gradesTitle: "Current grades", attendanceTitle: "Attendance this month",
      present: "Present", absent: "Absent", askTitle: "Ask about Diego",
      msgTitle: "Two-way messaging", msgBody: "Write to Diego's teacher or counselor in Spanish — they receive it in English, and their reply comes back to you in Spanish automatically.",
      writeTo: "Write to Ms. Nair (counselor)",
    },
    es: {
      greeting: "Bienvenida", child: "Diego Marquez · Grado 9",
      snapshot: "Resumen de Diego este mes", attTitle: "La asistencia está bajando",
      attBody: "La asistencia de Diego bajó a 82% — ha faltado 4 días, sobre todo los lunes. La escuela lo notó y su consejera está lista para ayudar.",
      meansTitle: "Qué significa esto", meansBody: "Faltar 4 días al mes equivale a casi el 20% del tiempo de clase en un semestre. La buena noticia: pequeños cambios en casa hacen una gran diferencia, y las calificaciones de Diego se mantienen estables.",
      helpTitle: "Tres cosas que puede hacer en casa",
      help: ["Ayude a Diego a llegar a tiempo cada mañana — especialmente los lunes.", "Pídale que le enseñe un problema de matemáticas en voz alta — da confianza.", "Comuníquese con su consejera, la Sra. Nair, que está lista para apoyar."],
      msgCounselor: "Enviar mensaje a la consejera", seeTips: "Ver consejos de apoyo",
      gradesTitle: "Calificaciones actuales", attendanceTitle: "Asistencia este mes",
      present: "Presente", absent: "Ausente", askTitle: "Pregunte sobre Diego",
      msgTitle: "Mensajería bidireccional", msgBody: "Escriba a la maestra o consejera de Diego en español — ellas lo reciben en inglés, y su respuesta le llega en español automáticamente.",
      writeTo: "Escribir a la Sra. Nair (consejera)",
    },
  };

  function Parent({ active, app, lang }) {
    const x = PT[lang] || PT.en;
    const d = RP.students.diego;

    if (active === "child") {
      const alert = (lang === "es" ? RP.alertsES.parent : RP.alerts.parent)[0];
      return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 22 } },
        U.PageTitle({ eyebrow: x.greeting + ", Maria", title: x.child, sub: x.snapshot }),
        React.createElement(U.Grid, { min: 200 },
          React.createElement(U.KpiTile, { label: x.attendanceTitle, value: "82", unit: "%", status: "warning", statusLabel: lang === "es" ? "Atención" : undefined }),
          React.createElement(U.KpiTile, { label: x.gradesTitle, value: "C+", footnote: lang === "es" ? "promedio" : "average", status: "warning", statusLabel: lang === "es" ? "Atención" : undefined }),
          React.createElement(U.KpiTile, { label: lang === "es" ? "Faltas este mes" : "Absences", value: "4", status: "warning", statusLabel: lang === "es" ? "Atención" : undefined }),
          React.createElement(U.KpiTile, { label: lang === "es" ? "Idioma" : "Language", value: "ES", footnote: "Español" }),
        ),
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 22, alignItems: "start" } },
          React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 16 } },
            React.createElement(U.AlertCard, { alert, onAction: (l) => { const ll = l.toLowerCase(); if (ll.includes("mensaje") || ll.includes("message")) app.openComposer("parent-to-counselor"); else app.go("support"); } }),
            Panel({ title: x.meansTitle, icon: "info", children: React.createElement("p", { style: { margin: 0, fontSize: "var(--text-sm)", color: "var(--text-body)", lineHeight: 1.7 } }, x.meansBody) }),
            Panel({ title: x.helpTitle, icon: "heart", accent: true, children:
              React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } },
                x.help.map((h, i) => React.createElement("div", { key: i, style: { display: "flex", gap: 10, alignItems: "flex-start" } }, React.createElement("span", { style: { width: 22, height: 22, flexShrink: 0, borderRadius: "50%", background: "var(--gold-100)", color: "var(--gold-700)", display: "grid", placeItems: "center", fontWeight: 800, fontSize: "var(--text-xs)", fontFamily: "var(--font-data)", marginTop: 1 } }, i + 1), React.createElement("span", { style: { fontSize: "var(--text-sm)", color: "var(--text-body)", lineHeight: 1.5 } }, h))),
                React.createElement(DS.Button, { variant: "secondary", iconLeft: React.createElement(Icon, { name: "message", size: 15 }), style: { alignSelf: "flex-start", marginTop: 4 }, onClick: () => app.openComposer("parent-to-counselor") }, x.msgCounselor)) }),
          ),
          React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 16 } },
            Panel({ title: x.attendanceTitle, icon: "calendar", children:
              React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } },
                React.createElement(U.Sparkline, { data: d.attendanceTrend, w: 360, h: 50, tone: "danger" }),
                React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 5 } }, ["L","M","M","J","V","L","M"].map((day, i) => { const absent = [0, 5].includes(i); return React.createElement("div", { key: i, style: { textAlign: "center" } }, React.createElement("div", { style: { fontSize: 9, color: "var(--text-subtle)", marginBottom: 3, fontWeight: 700 } }, day), React.createElement("div", { title: absent ? x.absent : x.present, style: { height: 26, borderRadius: 5, background: absent ? "var(--red-100)" : "var(--green-100)", border: "1px solid " + (absent ? "var(--red-500)" : "var(--green-500)"), display: "grid", placeItems: "center", color: absent ? "var(--red-700)" : "var(--green-700)" } }, React.createElement(Icon, { name: absent ? "x" : "check", size: 12 }))); }))) }),
            Panel({ title: x.gradesTitle, icon: "book", children:
              React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 2 } }, d.classes.map((c, i) => React.createElement("div", { key: i, style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderTop: i ? "1px solid var(--border-subtle)" : "none" } }, React.createElement("span", { style: { fontSize: "var(--text-sm)", fontWeight: 600 } }, c.name), React.createElement("span", { style: { display: "flex", alignItems: "center", gap: 8 } }, React.createElement(Icon, { name: c.trend === "down" ? "trendingDown" : c.trend === "up" ? "trending" : "minus", size: 14, style: { color: c.trend === "down" ? "var(--red-500)" : c.trend === "up" ? "var(--green-500)" : "var(--neutral-400)" } }), React.createElement("span", { style: { fontFamily: "var(--font-data)", fontWeight: 700, color: "var(--text-brand)" } }, c.grade))))) }),
          ),
        ),
      );
    }

    if (active === "messages") {
      return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 22 } },
        U.PageTitle({ eyebrow: x.msgTitle, title: x.msgTitle, sub: x.msgBody, right: React.createElement(DS.Button, { variant: "secondary", iconLeft: React.createElement(Icon, { name: "plus", size: 15 }), onClick: () => app.openComposer("parent-to-counselor") }, lang === "es" ? "Nuevo mensaje" : "New message") }),
        Panel({ icon: "message", accent: true, children:
          React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } },
            [["Ms. Priya Nair", lang === "es" ? "Consejera de Diego" : "Diego's counselor", "compass"], ["Ms. Sarah Chen", lang === "es" ? "Maestra de Álgebra I" : "Algebra I teacher", "book"], ["Linda Alvarez", lang === "es" ? "Oficina de MIT" : "MIT front office", "phone"]].map((m, i) => React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)" } },
              React.createElement(DS.Avatar, { name: U.shortName(m[0]), size: "md" }),
              React.createElement("div", { style: { flex: 1 } }, React.createElement("div", { style: { fontWeight: 700, fontSize: "var(--text-sm)" } }, m[0]), React.createElement("div", { style: { fontSize: "var(--text-xs)", color: "var(--text-muted)" } }, m[1])),
              React.createElement("span", { style: { display: "inline-flex", alignItems: "center", gap: 5, fontSize: "var(--text-2xs)", color: "var(--gold-700)", fontWeight: 700 } }, React.createElement(Icon, { name: "translate", size: 12 }), lang === "es" ? "Traducción activa" : "Translation on"),
              React.createElement(DS.Button, { size: "sm", variant: "outline", onClick: () => app.openComposer("parent-to-counselor") }, lang === "es" ? "Escribir" : "Write"))),
            React.createElement(DS.Button, { variant: "secondary", iconLeft: React.createElement(Icon, { name: "message", size: 15 }), style: { alignSelf: "flex-start" }, onClick: () => app.openComposer("parent-to-counselor") }, x.writeTo)) }),
      );
    }

    if (active === "support") {
      return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 22 } },
        U.PageTitle({ eyebrow: x.helpTitle, title: x.helpTitle, sub: x.attBody }),
        Panel({ icon: "heart", accent: true, children:
          React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } },
            x.help.map((h, i) => React.createElement("div", { key: i, style: { display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 0", borderTop: i ? "1px solid var(--border-subtle)" : "none" } }, React.createElement("span", { style: { width: 30, height: 30, flexShrink: 0, borderRadius: "50%", background: "var(--gold-100)", color: "var(--gold-700)", display: "grid", placeItems: "center", fontWeight: 800, fontFamily: "var(--font-data)" } }, i + 1), React.createElement("span", { style: { fontSize: "var(--text-base)", color: "var(--text-body)", lineHeight: 1.6 } }, h))),
            React.createElement(DS.Button, { variant: "secondary", iconLeft: React.createElement(Icon, { name: "message", size: 15 }), style: { alignSelf: "flex-start" }, onClick: () => app.openComposer("parent-to-counselor") }, x.msgCounselor)) }),
      );
    }

    if (active === "attendance") {
      return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 22 } },
        U.PageTitle({ eyebrow: x.attendanceTitle, title: x.attTitle, sub: x.attBody }),
        Panel({ icon: "calendar", children: React.createElement(U.TrendChart, { points: d.attendanceTrend, labels: ["S1","S2","S3","S4","S5","S6"], unit: "%", yMin: 78, yMax: 98, tone: "danger" }) }),
      );
    }

    // grades
    return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 22 } },
      U.PageTitle({ eyebrow: x.gradesTitle, title: x.gradesTitle, sub: lang === "es" ? "Las calificaciones de Diego se mantienen estables, con Álgebra I como área de enfoque." : "Diego's grades are mostly steady, with Algebra I as the focus area." }),
      Panel({ icon: "book", children: React.createElement(U.DataTable, { cols: [
        { key: "name", label: lang === "es" ? "Clase" : "Class" }, { key: "teacher", label: lang === "es" ? "Maestro" : "Teacher" },
        { key: "grade", label: lang === "es" ? "Nota" : "Grade", align: "right", mono: true },
      ], rows: d.classes.map((c) => ({ name: c.name, teacher: c.teacher, grade: c.grade })) }) }),
    );
  }
  window.RPRoles.parent = Parent;
})();
