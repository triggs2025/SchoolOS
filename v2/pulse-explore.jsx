/* ============================================================
   Riverside — Version B · Pulse · EXPLORE layer
   "Triage by default, the whole platform on demand."
   The full original platform (dashboards, recruitment, caseloads,
   IEP, gradebook, attendance board, reports) folds in here as a
   summonable focus overlay — mounted from the existing role views
   so nothing was rebuilt. Plus a unified ⌘K palette.
   ============================================================ */
(function () {
  const { useState, useEffect, useRef } = React;
  const DS = window.MITSTEMDesignSystem_177606;
  const Icon = window.RPIcon;
  const U = window.RPUI;
  const RP = window.RP;

  /* full-screen Explore overlay that mounts the original role views */
  function ExploreOverlay({ open, onClose, role, lang, setLang, section, setSection, app }) {
    if (!open) return null;
    const nav = (RP.nav[role] || []).filter((n) => n.id !== "brain");
    const View = window.RPRoles && window.RPRoles[role];
    let body;
    if (section === "recruitment") body = React.createElement(window.RPRecruitmentView, { role, app, lang });
    else if (View) body = React.createElement(View, { active: section, app, lang, setLang });
    else body = React.createElement("div", { style: { padding: 40, color: "var(--text-muted)" } }, "Coming soon.");
    return React.createElement("div", { style: { position: "fixed", inset: 0, zIndex: 70, background: "var(--surface-page)", display: "flex", flexDirection: "column", animation: "p-in .3s var(--ease-out)" } },
      /* header */
      React.createElement("div", { style: { position: "sticky", top: 0, zIndex: 5, background: "var(--surface-card)", borderBottom: "1px solid var(--border-subtle)" } },
        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14, padding: "14px 22px" } },
          React.createElement("button", { onClick: onClose, style: { display: "inline-flex", alignItems: "center", gap: 7, height: 36, padding: "0 14px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-default)", background: "var(--surface-card)", color: "var(--text-body)", fontWeight: 700, fontSize: "var(--text-sm)", cursor: "pointer", fontFamily: "var(--font-body)" } },
            React.createElement(Icon, { name: "chevronLeft", size: 16 }), "Back to Pulse"),
          React.createElement("div", { style: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-md)", color: "var(--text-brand)" } }, "Explore"),
          React.createElement("span", { style: { fontSize: "var(--text-xs)", color: "var(--text-subtle)", fontWeight: 600 } }, RP.roleById[role].title + " · " + RP.roleById[role].name.split(" ").slice(-1)),
          React.createElement("span", { style: { marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 6, fontSize: "var(--text-2xs)", color: "var(--text-subtle)", fontWeight: 600 } }, React.createElement(Icon, { name: "lock", size: 13 }), "Data stays in your district")),
        /* section strip */
        React.createElement("div", { style: { display: "flex", gap: 6, padding: "0 22px 12px", overflowX: "auto" } },
          nav.map((n) => { const on = n.id === section; return React.createElement("button", { key: n.id, onClick: () => setSection(n.id), style: { display: "inline-flex", alignItems: "center", gap: 7, height: 34, padding: "0 14px", borderRadius: "var(--radius-full)", whiteSpace: "nowrap", border: "1px solid " + (on ? "var(--purple-500)" : "var(--border-default)"), background: on ? "var(--purple-500)" : "var(--surface-card)", color: on ? "#fff" : "var(--text-body)", fontWeight: 700, fontSize: "var(--text-xs)", cursor: "pointer", fontFamily: "var(--font-body)" } },
            React.createElement(Icon, { name: n.icon, size: 14 }), n.label); })),
      ),
      /* body */
      React.createElement("div", { style: { flex: 1, overflowY: "auto" } },
        React.createElement("div", { style: { maxWidth: 1120, margin: "0 auto", padding: "28px 28px 80px" } }, body)),
    );
  }
  window.PulseExplore = { ExploreOverlay };

  /* unified ⌘K palette: ask · jump to student · open a surface */
  function CmdPalette({ open, onClose, role, onAsk, onStudent, onOpenSection }) {
    const [q, setQ] = useState("");
    const inputRef = useRef(null);
    useEffect(() => { if (open) { setQ(""); setTimeout(() => inputRef.current && inputRef.current.focus(), 30); } }, [open]);
    if (!open) return null;
    const prompts = (RP.assistant[role] || RP.assistant.superintendent).prompts;
    const nav = (RP.nav[role] || []).filter((n) => n.id !== "brain");
    const ql = q.toLowerCase();
    const pHits = prompts.filter((p) => !q || p.toLowerCase().includes(ql)).map((p, i) => ({ p, i: prompts.indexOf(p) }));
    const sHits = Object.values(RP.students).filter((s) => q && s.name.toLowerCase().includes(ql));
    const nHits = nav.filter((n) => !q || n.label.toLowerCase().includes(ql));
    const row = { display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 16px", border: "none", borderTop: "1px solid var(--border-subtle)", background: "transparent", cursor: "pointer", textAlign: "left", fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--text-body)" };
    const head = { padding: "9px 16px 4px", fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 800, color: "var(--text-subtle)" };
    return React.createElement("div", { style: { position: "fixed", inset: 0, zIndex: 90, display: "flex", justifyContent: "center", alignItems: "flex-start", paddingTop: "11vh" } },
      React.createElement("div", { onClick: onClose, style: { position: "absolute", inset: 0, background: "rgba(20,17,26,.45)" } }),
      React.createElement("div", { style: { position: "relative", width: "min(94vw, 620px)", background: "var(--surface-card)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-xl)", overflow: "hidden" } },
        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", borderBottom: "1px solid var(--border-subtle)" } },
          React.createElement(Icon, { name: "search", size: 18, style: { color: "var(--text-subtle)" } }),
          React.createElement("input", { ref: inputRef, value: q, onChange: (e) => setQ(e.target.value), onKeyDown: (e) => { if (e.key === "Enter" && q.trim()) { onAsk(q); onClose(); } if (e.key === "Escape") onClose(); }, placeholder: "Ask the brain, jump to a student, or open a board…", style: { flex: 1, border: "none", outline: "none", fontSize: "var(--text-md)", fontFamily: "var(--font-body)", background: "transparent", color: "var(--text-default)" } })),
        React.createElement("div", { style: { maxHeight: "52vh", overflowY: "auto" } },
          sHits.length > 0 && React.createElement("div", { style: head }, "Students"),
          sHits.map((s) => React.createElement("button", { key: s.id, onClick: () => { onStudent(s.id); onClose(); }, style: row }, React.createElement(DS.Avatar, { name: s.name, size: "xs" }), React.createElement("span", { style: { fontWeight: 600 } }, s.name), React.createElement("span", { style: { color: "var(--text-muted)", fontSize: "var(--text-xs)" } }, "Grade " + s.grade))),
          React.createElement("div", { style: head }, "Open a board"),
          nHits.map((n) => React.createElement("button", { key: n.id, onClick: () => { onOpenSection(n.id); onClose(); }, style: row }, React.createElement(Icon, { name: n.icon, size: 15, style: { color: "var(--text-muted)" } }), React.createElement("span", null, n.label))),
          React.createElement("div", { style: head }, "Ask the brain"),
          pHits.map((x) => React.createElement("button", { key: x.i, onClick: () => { onAsk(x.p, x.i); onClose(); }, style: row }, React.createElement(Icon, { name: "sparkle", size: 15, style: { color: "var(--purple-500)" } }), React.createElement("span", null, x.p))),
        ),
        React.createElement("div", { style: { display: "flex", gap: 14, padding: "8px 16px", borderTop: "1px solid var(--border-subtle)", fontSize: "var(--text-2xs)", color: "var(--text-subtle)" } },
          React.createElement("span", null, "↵ to ask"), React.createElement("span", null, "Esc to close")),
      ),
    );
  }
  window.PulseExplore.CmdPalette = CmdPalette;
})();
