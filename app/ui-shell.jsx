/* ============================================================
   Riverside Platform — app shell & overlays
   TopBar · SideNav · TrustMark · AssistantPanel · Notifications
   · StudentDrawer · MessageComposer · ReportPreview · Shell
   ============================================================ */
(function () {
  const { useState, useEffect, useRef } = React;
  const DS = window.MITSTEMDesignSystem_177606;
  const Icon = window.RPIcon;
  const RPUI = window.RPUI || (window.RPUI = {});
  const RP = window.RP;

  /* ---- Trust mark ---- */
  function TrustMark({ inverse, es }) {
    return React.createElement("div", { style: {
      display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 11px",
      borderRadius: "var(--radius-full)",
      background: inverse ? "rgba(255,255,255,.12)" : "var(--purple-50)",
      color: inverse ? "rgba(255,255,255,.9)" : "var(--purple-700)",
      fontSize: "var(--text-2xs)", fontWeight: 700, letterSpacing: "0.02em", whiteSpace: "nowrap",
    } },
      React.createElement(Icon, { name: "lock", size: 12, stroke: 2.4 }),
      es ? "Sus datos permanecen en el distrito" : "Data stays in your district",
    );
  }
  RPUI.TrustMark = TrustMark;

  /* ============================================================
     TOP BAR
     ============================================================ */
  function TopBar({ role, contextLabel, onAssistant, onBell, onSwitchRole, alertCount, search, setSearch, rightExtra, app }) {
    const r = RP.roleById[role];
    const showContext = role === "superintendent" || role === "principal";
    const [focus, setFocus] = useState(false);
    const q = (search || "").trim().toLowerCase();
    const studentHits = q.length >= 1 ? Object.values(RP.students).filter((s) => s.name.toLowerCase().includes(q)).slice(0, 5) : [];
    const navHits = q.length >= 1 ? (RP.nav[role] || []).filter((n) => n.label.toLowerCase().includes(q)).slice(0, 3) : [];
    const showResults = focus && q.length >= 1 && (studentHits.length + navHits.length > 0);
    function pickStudent(id) { setSearch(""); setFocus(false); app && app.openStudent(id); }
    function pickNav(id) { setSearch(""); setFocus(false); app && app.go(id); }
    const rowBtn = { display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "9px 12px", background: "transparent", border: "none", borderTop: "1px solid var(--border-subtle)", cursor: "pointer", fontFamily: "var(--font-body)", color: "var(--text-body)" };
    return React.createElement("header", { style: {
      gridArea: "top", display: "flex", alignItems: "center", gap: 18,
      height: 64, padding: "0 22px", background: "var(--surface-brand)",
      borderBottom: "3px solid var(--color-accent)", color: "var(--white)", zIndex: 30,
    } },
      /* wordmark */
      React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, flexShrink: 0 } },
        React.createElement("img", { src: "assets/eagle-white.png", alt: "MIT crest", style: { height: 34, width: "auto" } }),
        React.createElement("div", { style: { display: "flex", flexDirection: "column", lineHeight: 1.1, whiteSpace: "nowrap" } },
          React.createElement("span", { style: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17, letterSpacing: "0.01em" } }, "Riverside Platform"),
          React.createElement("span", { style: { fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gold-300)", fontWeight: 700 } }, "Unified District OS"),
        ),
      ),
      /* context switcher */
      showContext && React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, paddingLeft: 16, borderLeft: "1px solid rgba(255,255,255,.18)", flexShrink: 0, whiteSpace: "nowrap" } },
        React.createElement(Icon, { name: "building", size: 14, style: { opacity: 0.7 } }),
        React.createElement("span", { style: { fontSize: "var(--text-sm)", fontWeight: 600 } }, contextLabel),
        role === "superintendent" && React.createElement(Icon, { name: "chevronDown", size: 14, style: { opacity: 0.7 } }),
      ),
      /* search */
      React.createElement("div", { style: { flex: 1, maxWidth: 360, position: "relative", display: "flex", alignItems: "center" } },
        React.createElement("span", { style: { position: "absolute", left: 12, opacity: 0.6, lineHeight: 0 } }, React.createElement(Icon, { name: "search", size: 15 })),
        React.createElement("input", {
          value: search, onChange: (e) => setSearch(e.target.value),
          onFocus: () => setFocus(true), onBlur: () => setTimeout(() => setFocus(false), 160),
          placeholder: "Search students, staff, anything…",
          style: { width: "100%", height: 36, padding: "0 12px 0 34px", borderRadius: "var(--radius-md)", border: "1px solid rgba(255,255,255,.2)", background: "rgba(255,255,255,.1)", color: "var(--white)", fontSize: "var(--text-sm)", fontFamily: "var(--font-body)", outline: "none" },
        }),
        showResults && React.createElement("div", { style: { position: "absolute", top: 44, left: 0, right: 0, background: "var(--surface-card)", color: "var(--text-body)", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-lg)", border: "1px solid var(--border-subtle)", overflow: "hidden", zIndex: 40 } },
          studentHits.length > 0 && React.createElement("div", { style: { padding: "8px 12px 4px", fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, color: "var(--text-subtle)" } }, "Students"),
          studentHits.map((s) => React.createElement("button", { key: s.id, onMouseDown: () => pickStudent(s.id), style: rowBtn },
            React.createElement(DS.Avatar, { name: s.name, size: "xs" }),
            React.createElement("span", { style: { flex: 1, textAlign: "left", fontWeight: 600, fontSize: "var(--text-sm)" } }, s.name),
            React.createElement("span", { style: { fontSize: "var(--text-xs)", color: "var(--text-muted)" } }, "Gr. " + s.grade + " · " + s.school))),
          navHits.length > 0 && React.createElement("div", { style: { padding: "8px 12px 4px", fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, color: "var(--text-subtle)", borderTop: studentHits.length ? "1px solid var(--border-subtle)" : "none" } }, "Go to"),
          navHits.map((n) => React.createElement("button", { key: n.id, onMouseDown: () => pickNav(n.id), style: rowBtn },
            React.createElement("span", { style: { color: "var(--purple-500)", lineHeight: 0 } }, React.createElement(Icon, { name: n.icon, size: 16 })),
            React.createElement("span", { style: { flex: 1, textAlign: "left", fontWeight: 600, fontSize: "var(--text-sm)" } }, n.label))),
        ),
      ),
      React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginLeft: "auto", flexShrink: 0 } },
        rightExtra,
        React.createElement("div", { style: { display: "none" }, className: "rp-hide-sm" }, React.createElement(TrustMark, { inverse: true })),
        /* assistant */
        React.createElement("button", { onClick: onAssistant, style: {
          display: "inline-flex", alignItems: "center", gap: 7, height: 36, padding: "0 14px",
          borderRadius: "var(--radius-md)", border: "1px solid var(--gold-400)", background: "var(--color-accent)",
          color: "var(--purple-800)", fontWeight: 700, fontSize: "var(--text-sm)", fontFamily: "var(--font-body)", cursor: "pointer",
        } }, React.createElement(Icon, { name: "sparkle", size: 16, stroke: 2.2 }), "Assistant"),
        /* bell */
        React.createElement("button", { onClick: onBell, "aria-label": "Alerts", style: { position: "relative", width: 36, height: 36, display: "grid", placeItems: "center", borderRadius: "var(--radius-md)", border: "1px solid rgba(255,255,255,.2)", background: "rgba(255,255,255,.08)", color: "var(--white)", cursor: "pointer" } },
          React.createElement(Icon, { name: "bell", size: 17 }),
          alertCount > 0 && React.createElement("span", { style: { position: "absolute", top: -4, right: -4, minWidth: 17, height: 17, padding: "0 4px", borderRadius: 9, background: "var(--red-500)", color: "#fff", fontSize: 10, fontWeight: 800, display: "grid", placeItems: "center", border: "2px solid var(--purple-600)" } }, alertCount),
        ),
        /* profile + switch */
        React.createElement("button", { onClick: onSwitchRole, title: "Switch role", style: { display: "inline-flex", alignItems: "center", gap: 9, height: 40, padding: "0 6px 0 4px", borderRadius: "var(--radius-full)", border: "1px solid rgba(255,255,255,.2)", background: "rgba(255,255,255,.08)", color: "var(--white)", cursor: "pointer" } },
          React.createElement(DS.Avatar, { name: RPUI.shortName(r.name), size: "sm", ring: true }),
          React.createElement("div", { style: { textAlign: "left", lineHeight: 1.1, paddingRight: 4 }, className: "rp-hide-sm" },
            React.createElement("div", { style: { fontSize: "var(--text-xs)", fontWeight: 700 } }, r.name),
            React.createElement("div", { style: { fontSize: 9.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold-300)", fontWeight: 700 } }, r.title),
          ),
          React.createElement(Icon, { name: "logout", size: 14, style: { opacity: 0.7 } }),
        ),
      ),
    );
  }

  /* ============================================================
     SIDE NAV
     ============================================================ */
  function SideNav({ role, active, setActive, lang }) {
    const es = lang === "es" && RP.navES[role];
    const items = es || RP.nav[role] || [];
    const r = RP.roleById[role];
    const roleLabel = (es && RP.roleLabelES[role]) || RP.roleLabel[role];
    const roleTitle = (es && RP.roleTitleES[role]) || r.title;
    const trust = lang === "es" ? "Sus datos permanecen en su distrito" : null;
    return React.createElement("nav", { style: {
      gridArea: "nav", width: 248, background: "var(--surface-card)", borderRight: "1px solid var(--border-subtle)",
      display: "flex", flexDirection: "column", padding: "18px 14px", overflowY: "auto",
    } },
      React.createElement("div", { style: { padding: "0 8px 14px" } },
        React.createElement("div", { className: "mit-eyebrow", style: { fontSize: "var(--text-2xs)", letterSpacing: "0.12em" } }, roleLabel),
        React.createElement("div", { style: { fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "var(--text-md)", color: "var(--text-default)", marginTop: 2 } }, roleTitle),
      ),
      role === "teacher" && React.createElement("div", { style: { margin: "0 8px 12px", padding: "8px 11px", borderRadius: "var(--radius-md)", background: "var(--status-success-bg)", color: "var(--status-success-fg)", fontSize: "var(--text-xs)", fontWeight: 700, display: "flex", alignItems: "center", gap: 7 } },
        React.createElement(Icon, { name: "check", size: 13 }), "Connected: Google Classroom"),
      role === "sped" && React.createElement("div", { style: { margin: "0 8px 12px", padding: "8px 11px", borderRadius: "var(--radius-md)", background: "var(--status-info-bg)", color: "var(--status-info-fg)", fontSize: "var(--text-xs)", fontWeight: 700, display: "flex", alignItems: "center", gap: 7 } },
        React.createElement(Icon, { name: "shield", size: 13 }), "Restricted — SpEd access"),
      React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 2 } },
        items.map((it) => {
          const on = it.id === active;
          return React.createElement("button", { key: it.id, onClick: () => setActive(it.id), style: {
            display: "flex", alignItems: "center", gap: 11, padding: "10px 12px", borderRadius: "var(--radius-md)",
            border: "none", cursor: "pointer", textAlign: "left", width: "100%",
            background: on ? "var(--purple-50)" : "transparent",
            color: on ? "var(--purple-700)" : "var(--text-muted)",
            fontWeight: on ? 700 : 500, fontSize: "var(--text-sm)", fontFamily: "var(--font-body)",
            borderLeft: on ? "3px solid var(--color-accent)" : "3px solid transparent",
            transition: "background var(--transition), color var(--transition)",
          } },
            React.createElement("span", { style: { color: on ? "var(--purple-600)" : "var(--text-subtle)", lineHeight: 0 } }, React.createElement(Icon, { name: it.icon, size: 17 })),
            it.label,
          );
        }),
      ),
      React.createElement("div", { style: { marginTop: "auto", padding: "14px 8px 4px", borderTop: "1px solid var(--border-subtle)" } },
        React.createElement(TrustMark, { es: lang === "es" }),
        React.createElement("div", { style: { fontSize: "var(--text-2xs)", color: "var(--text-subtle)", marginTop: 10, lineHeight: 1.5 } }, lang === "es" ? "Un acceso · una base de datos" : "One login · one data foundation · " + RP.district.sis + " of record"),
      ),
    );
  }

  /* ============================================================
     SLIDE-OVER frame (right panel)
     ============================================================ */
  function SlideOver({ open, onClose, width = 440, children, label }) {
    return React.createElement("div", { "aria-hidden": !open, style: { position: "fixed", inset: 0, zIndex: 60, pointerEvents: open ? "auto" : "none" } },
      React.createElement("div", { onClick: onClose, style: { position: "absolute", inset: 0, background: "rgba(20,17,26,.4)", opacity: open ? 1 : 0, transition: "opacity var(--transition)" } }),
      React.createElement("aside", { role: "dialog", "aria-label": label, style: {
        position: "absolute", top: 0, right: 0, height: "100%", width: "min(94vw, " + width + "px)",
        background: "var(--surface-card)", boxShadow: "var(--shadow-xl)",
        transform: open ? "translateX(0)" : "translateX(102%)", transition: "transform var(--duration-slow) var(--ease-out)",
        display: "flex", flexDirection: "column",
      } }, children),
    );
  }
  RPUI.SlideOver = SlideOver;

  /* ============================================================
     MODAL frame (centered)
     ============================================================ */
  function Modal({ open, onClose, width = 720, children, label }) {
    if (!open) return null;
    return React.createElement("div", { role: "dialog", "aria-label": label, style: { position: "fixed", inset: 0, zIndex: 70, display: "grid", placeItems: "center", padding: 24 } },
      React.createElement("div", { onClick: onClose, style: { position: "absolute", inset: 0, background: "rgba(20,17,26,.5)" } }),
      React.createElement("div", { style: { position: "relative", width: "min(96vw, " + width + "px)", maxHeight: "90vh", overflowY: "auto", background: "var(--surface-card)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-xl)" } }, children),
    );
  }
  RPUI.Modal = Modal;

  function PanelHead({ icon, title, sub, onClose, accent }) {
    return React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", borderBottom: "1px solid var(--border-subtle)", background: accent ? "var(--surface-brand)" : "var(--surface-card)", color: accent ? "var(--white)" : "inherit", flexShrink: 0 } },
      icon && React.createElement("span", { style: { color: accent ? "var(--gold-300)" : "var(--color-primary)", lineHeight: 0 } }, React.createElement(Icon, { name: icon, size: 20 })),
      React.createElement("div", { style: { flex: 1, minWidth: 0 } },
        React.createElement("div", { style: { fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "var(--text-md)" } }, title),
        sub && React.createElement("div", { style: { fontSize: "var(--text-xs)", color: accent ? "rgba(255,255,255,.75)" : "var(--text-muted)", marginTop: 1 } }, sub),
      ),
      React.createElement("button", { onClick: onClose, "aria-label": "Close", style: { width: 32, height: 32, display: "grid", placeItems: "center", borderRadius: "var(--radius-md)", border: "none", background: accent ? "rgba(255,255,255,.12)" : "var(--neutral-100)", color: accent ? "#fff" : "var(--text-muted)", cursor: "pointer" } }, React.createElement(Icon, { name: "x", size: 17 })),
    );
  }
  RPUI.PanelHead = PanelHead;

  /* ============================================================
     ASSISTANT PANEL (scripted, source-cited)
     ============================================================ */
  function AssistantAnswer({ ans, onAction }) {
    const { MdText, SourceChip, CompareBars, TrendChart } = RPUI;
    return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } },
      ans.review && React.createElement("div", { style: { display: "inline-flex", alignItems: "center", gap: 6, alignSelf: "flex-start", padding: "3px 10px", borderRadius: "var(--radius-full)", background: "var(--gold-50)", color: "var(--gold-700)", fontSize: "var(--text-2xs)", fontWeight: 700, border: "1px solid var(--gold-200)" } },
        React.createElement(Icon, { name: "eye", size: 12 }), "Draft — review before sending"),
      ans.paragraphs.map((p, i) => React.createElement(MdText, { key: i, style: { fontSize: "var(--text-sm)", color: "var(--text-body)" } }, p)),
      ans.chart && React.createElement("div", { style: { background: "var(--neutral-50)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: 14 } },
        React.createElement("div", { style: { fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, color: "var(--text-muted)", marginBottom: 8 } }, ans.chart.title),
        ans.chart.type === "bars"
          ? React.createElement(CompareBars, { series: ans.chart.series, unit: ans.chart.unit, baseline: ans.chart.baseline, w: 380 })
          : React.createElement(TrendChart, { points: ans.chart.points, unit: ans.chart.unit, w: 380, h: 170, tone: "danger" }),
      ),
      ans.table && React.createElement(RPUI.MiniTable, { table: ans.table }),
      ans.chips && React.createElement("div", null,
        React.createElement("div", { style: { fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, color: "var(--text-subtle)", marginBottom: 6 } }, "Sources"),
        React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 6 } }, ans.chips.map((c, i) => React.createElement(SourceChip, { key: i }, c))),
      ),
      ans.actions && React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 2 } },
        ans.actions.map((a, i) => React.createElement(DS.Button, { key: i, size: "sm", variant: i === 0 ? "secondary" : "outline", onClick: () => onAction && onAction(a) }, a)),
      ),
    );
  }
  RPUI._AssistantAnswer = AssistantAnswer;

  function AssistantPanel({ open, onClose, role, lang, seed, onAction }) {
    const cfg = RP.assistant[role] || RP.assistant.superintendent;
    const isES = role === "parent" && lang === "es";
    const prompts = isES && cfg.promptsES ? cfg.promptsES : cfg.prompts;
    const answers = isES && cfg.answersES ? cfg.answersES : cfg.answers;
    const placeholder = isES && cfg.placeholderES ? cfg.placeholderES : cfg.placeholder;
    const [thread, setThread] = useState([]);
    const [thinking, setThinking] = useState(false);
    const [input, setInput] = useState("");
    const bodyRef = useRef(null);

    function ask(idx) {
      const q = prompts[idx];
      setThread((t) => [...t, { role: "user", text: q }]);
      setInput("");
      setThinking(true);
      setTimeout(() => {
        setThinking(false);
        setThread((t) => [...t, { role: "ai", ans: answers[idx] }]);
      }, 720);
    }
    function askFree() {
      if (!input.trim()) return;
      // map free text to closest scripted answer (default 0)
      setThread((t) => [...t, { role: "user", text: input }]);
      setThinking(true);
      setInput("");
      setTimeout(() => { setThinking(false); setThread((t) => [...t, { role: "ai", ans: answers[0] }]); }, 720);
    }

    useEffect(() => { if (seed != null && open) { setThread([]); setTimeout(() => ask(seed), 120); } /* eslint-disable-next-line */ }, [seed, open]);
    useEffect(() => { if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight; }, [thread, thinking]);

    return React.createElement(SlideOver, { open, onClose, width: 460, label: "Assistant" },
      React.createElement(PanelHead, { icon: "sparkle", title: isES ? "Asistente" : "Assistant", sub: (isES ? "Respuestas para " : "Scoped to ") + RP.roleById[role].title, onClose, accent: true }),
      React.createElement("div", { ref: bodyRef, style: { flex: 1, overflowY: "auto", padding: 18, display: "flex", flexDirection: "column", gap: 16, background: "var(--neutral-50)" } },
        thread.length === 0 && React.createElement("div", { style: { color: "var(--text-muted)", fontSize: "var(--text-sm)", lineHeight: 1.6 } },
          React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, color: "var(--purple-700)", fontWeight: 700, marginBottom: 6 } }, React.createElement(Icon, { name: "sparkle", size: 16 }), isES ? "Pregúnteme algo" : "Ask me anything"),
          isES ? "Las respuestas están limitadas a lo que su función puede ver, y siempre citan sus fuentes." : "Answers are scoped to what your role can see — and always show their sources."),
        thread.map((m, i) => m.role === "user"
          ? React.createElement("div", { key: i, style: { alignSelf: "flex-end", maxWidth: "85%", background: "var(--color-primary)", color: "#fff", padding: "10px 14px", borderRadius: "14px 14px 4px 14px", fontSize: "var(--text-sm)", lineHeight: 1.45 } }, m.text)
          : React.createElement("div", { key: i, style: { alignSelf: "flex-start", width: "100%", display: "flex", flexDirection: "column", gap: 12 } },
              React.createElement("div", { style: { background: "var(--surface-card)", border: "1px solid var(--border-subtle)", borderRadius: "4px 14px 14px 14px", padding: 16, boxShadow: "var(--shadow-xs)" } },
                React.createElement(AssistantAnswer, { ans: m.ans, onAction })),
              m.ans.followups && RPUI.FollowupChips && React.createElement(RPUI.FollowupChips, { items: m.ans.followups, onPick: (f) => ask(f.to) }))),
        thinking && React.createElement("div", { style: { alignSelf: "flex-start", display: "flex", gap: 5, padding: "12px 14px", background: "var(--surface-card)", border: "1px solid var(--border-subtle)", borderRadius: 14 } },
          [0, 1, 2].map((d) => React.createElement("span", { key: d, style: { width: 7, height: 7, borderRadius: "50%", background: "var(--purple-300)", animation: "rp-blink 1s infinite", animationDelay: d * 0.16 + "s" } }))),
      ),
      React.createElement("div", { style: { borderTop: "1px solid var(--border-subtle)", padding: 14, flexShrink: 0 } },
        React.createElement("div", { style: { fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, color: "var(--text-subtle)", marginBottom: 8 } }, isES ? "Pruebe preguntar" : "Try asking"),
        React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 } },
          prompts.map((p, i) => React.createElement("button", { key: i, onClick: () => ask(i), style: { textAlign: "left", padding: "9px 12px", borderRadius: "var(--radius-md)", border: "1px solid var(--purple-200)", background: "var(--purple-50)", color: "var(--purple-700)", fontSize: "var(--text-xs)", fontWeight: 600, cursor: "pointer", lineHeight: 1.4, fontFamily: "var(--font-body)" } }, p))),
        React.createElement("div", { style: { display: "flex", gap: 8 } },
          React.createElement("input", { value: input, onChange: (e) => setInput(e.target.value), onKeyDown: (e) => e.key === "Enter" && askFree(), placeholder, style: { flex: 1, height: 40, padding: "0 12px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-default)", fontSize: "var(--text-sm)", fontFamily: "var(--font-body)", outline: "none" } }),
          React.createElement("button", { onClick: askFree, "aria-label": "Send", style: { width: 40, height: 40, display: "grid", placeItems: "center", borderRadius: "var(--radius-md)", border: "none", background: "var(--color-primary)", color: "#fff", cursor: "pointer" } }, React.createElement(Icon, { name: "send", size: 16 }))),
      ),
    );
  }
  RPUI.AssistantPanel = AssistantPanel;

  /* ============================================================
     NOTIFICATIONS PANEL
     ============================================================ */
  function NotificationsPanel({ open, onClose, role, lang, onAction }) {
    const list = (role === "parent" && lang === "es" && RP.alertsES.parent) ? RP.alertsES.parent : (RP.alerts[role] || []);
    const isES = role === "parent" && lang === "es";
    return React.createElement(SlideOver, { open, onClose, width: 420, label: "Notifications" },
      React.createElement(PanelHead, { icon: "bell", title: isES ? "Alertas" : "Alerts & Notifications", sub: isES ? "El sistema habla primero" : "The system speaks first", onClose }),
      React.createElement("div", { style: { flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12, background: "var(--neutral-50)" } },
        list.map((a) => React.createElement(RPUI.AlertCard, { key: a.id, alert: a, onAction })),
        React.createElement("div", { style: { textAlign: "center", color: "var(--text-subtle)", fontSize: "var(--text-xs)", padding: "8px 0" } }, isES ? "No hay más alertas" : "You're all caught up"),
      ),
    );
  }
  RPUI.NotificationsPanel = NotificationsPanel;

  RPUI._TopBar = TopBar;
  RPUI._SideNav = SideNav;
  window.RPShellReady = true;
})();
