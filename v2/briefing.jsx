/* ============================================================
   Riverside — Version A · "The Briefing"
   One calm surface, zero navigation. The AI authors a daily
   briefing of prioritized, expand-in-place insight cards, with
   a single ask bar and a ⌘K command palette. Reuses the shared
   data world + MIT design-system primitives & modals.
   ============================================================ */
(function () {
  const { useState, useEffect, useRef } = React;
  const DS = window.MITSTEMDesignSystem_177606;
  const Icon = window.RPIcon;
  const U = window.RPUI;
  const RP = window.RP;

  const tone = (s) => s >= 92 ? "success" : s >= 88 ? "warning" : "danger";

  /* nearest scripted answer for free text */
  function matchAnswer(text, prompts, answers) {
    const stop = new Set(["the","a","an","is","are","do","does","what","which","who","how","why","me","my","our","this","that","of","in","on","for","to","and","i","we","can","you","tell","show","about"]);
    const words = text.toLowerCase().split(/[^a-zà-ÿ0-9]+/).filter((w) => w.length > 2 && !stop.has(w));
    let best = -1, bestScore = 0;
    prompts.forEach((p, idx) => { let sc = 0; const pl = p.toLowerCase(); words.forEach((w) => { if (pl.includes(w)) sc += 1; }); if (sc > bestScore) { bestScore = sc; best = idx; } });
    return bestScore >= 1 ? answers[best] : null;
  }

  /* ---- Slim top bar ---- */
  function TopBar({ role, lang, onRole, onPalette, onSwitchLang }) {
    const [open, setOpen] = useState(false);
    const r = RP.roleById[role];
    return React.createElement("div", { style: { position: "sticky", top: 0, zIndex: 20, background: "rgba(248,247,249,.85)", backdropFilter: "blur(10px)", borderBottom: "1px solid var(--border-subtle)" } },
      React.createElement("div", { style: { maxWidth: 880, margin: "0 auto", display: "flex", alignItems: "center", gap: 14, padding: "12px 20px" } },
        React.createElement("img", { src: "assets/eagle-purple.png", alt: "", style: { height: 28 } }),
        React.createElement("div", { style: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-md)", color: "var(--text-brand)", letterSpacing: "0.01em" } }, "Riverside"),
        React.createElement("button", { onClick: onPalette, style: { marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 8, height: 34, padding: "0 12px", borderRadius: "var(--radius-full)", border: "1px solid var(--border-default)", background: "var(--surface-card)", color: "var(--text-muted)", fontSize: "var(--text-xs)", fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-body)" } },
          React.createElement(Icon, { name: "search", size: 14 }), "Search or ask", React.createElement("kbd", { style: { fontFamily: "var(--font-data)", fontSize: 10, background: "var(--neutral-100)", border: "1px solid var(--border-default)", borderRadius: 4, padding: "1px 5px" } }, "\u2318K")),
        role === "parent" && React.createElement("button", { onClick: onSwitchLang, style: { height: 34, padding: "0 12px", borderRadius: "var(--radius-full)", border: "1px solid var(--border-default)", background: "var(--surface-card)", color: "var(--text-brand)", fontSize: "var(--text-xs)", fontWeight: 700, cursor: "pointer", fontFamily: "var(--font-body)" } }, RP.t[lang].switchLang),
        React.createElement("div", { style: { position: "relative" } },
          React.createElement("button", { onClick: () => setOpen(!open), style: { display: "inline-flex", alignItems: "center", gap: 8, height: 38, padding: "0 6px 0 4px", borderRadius: "var(--radius-full)", border: "1px solid var(--border-default)", background: "var(--surface-card)", cursor: "pointer" } },
            React.createElement(DS.Avatar, { name: U.shortName(r.name), size: "sm" }),
            React.createElement("span", { style: { fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--text-default)" } }, r.title),
            React.createElement(Icon, { name: "chevronDown", size: 14, style: { color: "var(--text-muted)" } })),
          open && React.createElement("div", { style: { position: "absolute", top: 46, right: 0, width: 250, background: "var(--surface-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-lg)", overflow: "hidden", zIndex: 30 } },
            React.createElement("div", { style: { padding: "8px 12px 4px", fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, color: "var(--text-subtle)" } }, "Sign in as"),
            RP.roles.map((x) => React.createElement("button", { key: x.id, onClick: () => { setOpen(false); onRole(x.id); }, style: { display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "9px 12px", border: "none", borderTop: "1px solid var(--border-subtle)", background: x.id === role ? "var(--purple-50)" : "transparent", cursor: "pointer", textAlign: "left", fontFamily: "var(--font-body)" } },
              React.createElement(DS.Avatar, { name: U.shortName(x.name), size: "xs" }),
              React.createElement("div", { style: { minWidth: 0 } },
                React.createElement("div", { style: { fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--text-default)" } }, x.title),
                React.createElement("div", { style: { fontSize: "var(--text-2xs)", color: "var(--text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, U.shortName(x.name)))))),
        ),
      ),
    );
  }

  /* ---- Live pulse line ---- */
  function Pulse({ role, isES }) {
    const cfg = RP.brain[role] || RP.brain.superintendent;
    const [scores, setScores] = useState(cfg.health.map((h) => h.score));
    useEffect(() => { setScores(cfg.health.map((h) => h.score)); }, [role]);
    useEffect(() => {
      const iv = setInterval(() => setScores((prev) => prev.map((s, i) => {
        const hi0 = cfg.health[i]; if (!hi0) return s;
        const tr = hi0.trend; const base = tr === "down" ? -0.4 : tr === "up" ? 0.4 : 0;
        const lo = tr === "down" ? 85 : 90, hi = tr === "down" ? 90 : 99;
        return Math.max(lo, Math.min(hi, Math.round((s + base + (Math.random() - 0.5) * 0.5) * 10) / 10));
      })), 2600);
      return () => clearInterval(iv);
    }, [role]);
    return React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" } },
      React.createElement("span", { className: "rp-livedot", style: { width: 7, height: 7, borderRadius: "50%", background: "var(--green-500)" } }),
      React.createElement("span", { style: { fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 800, color: "var(--text-subtle)" } }, isES ? "Salud escolar en vivo" : "Live school health"),
      cfg.health.map((h, i) => { const t = U.STATUS[tone(scores[i] != null ? scores[i] : h.score)]; return React.createElement("span", { key: i, style: { display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 11px 3px 6px", borderRadius: "var(--radius-full)", background: t.bg, color: t.fg, fontWeight: 700, fontSize: "var(--text-xs)" } },
        React.createElement("span", { style: { fontFamily: "var(--font-data)", fontWeight: 800, background: "var(--surface-card)", borderRadius: "var(--radius-full)", padding: "1px 6px" } }, Math.round(scores[i] != null ? scores[i] : h.score)), h.school); }),
    );
  }

  /* ---- Insight card (expand-in-place) ---- */
  function InsightCard({ alert, role, isES, onAction, answer }) {
    const [open, setOpen] = useState(false);
    const [why, setWhy] = useState(false);
    const s = U.STATUS[alert.severity || "warning"];
    return React.createElement("div", { className: "b-card", style: { background: "var(--surface-card)", border: "1px solid var(--border-subtle)", borderLeft: `3px solid ${s.dot}`, borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-sm)", overflow: "hidden" } },
      React.createElement("div", { style: { padding: "18px 20px" } },
        React.createElement("div", { style: { display: "flex", gap: 12, alignItems: "flex-start" } },
          React.createElement("span", { style: { width: 9, height: 9, borderRadius: "50%", background: s.dot, marginTop: 7, flexShrink: 0 } }),
          React.createElement("div", { style: { flex: 1, minWidth: 0 } },
            React.createElement("div", { style: { fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "var(--text-lg)", color: "var(--text-default)", lineHeight: 1.3 } }, alert.headline),
            React.createElement("div", { style: { fontSize: "var(--text-sm)", color: "var(--text-muted)", marginTop: 5, lineHeight: 1.5 } }, alert.why),
            React.createElement("div", { style: { display: "flex", gap: 14, marginTop: 10, flexWrap: "wrap" } },
              answer && React.createElement("button", { onClick: () => setOpen(!open), style: { display: "inline-flex", alignItems: "center", gap: 5, background: "none", border: "none", padding: 0, cursor: "pointer", color: "var(--text-link)", fontSize: "var(--text-sm)", fontWeight: 700, fontFamily: "var(--font-body)" } },
                React.createElement(Icon, { name: open ? "chevronDown" : "chevronRight", size: 15 }), open ? (isES ? "Ocultar detalle" : "Hide the detail") : (isES ? "Mostrar el detalle" : "Show me the data")),
              alert.signals && React.createElement("button", { onClick: () => setWhy(!why), style: { display: "inline-flex", alignItems: "center", gap: 5, background: "none", border: "none", padding: 0, cursor: "pointer", color: "var(--text-subtle)", fontSize: "var(--text-sm)", fontWeight: 600, fontFamily: "var(--font-body)" } },
                React.createElement(Icon, { name: "info", size: 14 }), isES ? "¿Por qué?" : "Why am I seeing this?")),
            why && alert.signals && React.createElement("div", { style: { marginTop: 10, padding: "10px 12px", background: "var(--neutral-50)", borderRadius: "var(--radius-sm)", display: "flex", flexDirection: "column", gap: 4 } },
              alert.signals.map((sig, i) => React.createElement("div", { key: i, style: { display: "flex", gap: 7, alignItems: "flex-start", fontSize: "var(--text-xs)", color: "var(--text-body)", lineHeight: 1.4 } }, React.createElement(Icon, { name: "chevronRight", size: 12, style: { color: "var(--gold-600)", marginTop: 2, flexShrink: 0 } }), sig))),
          ),
        ),
        open && answer && React.createElement("div", { style: { marginTop: 16, paddingTop: 16, borderTop: "1px dashed var(--border-default)" } }, React.createElement(U._AssistantAnswer, { ans: answer, onAction })),
        alert.actions && React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" } },
          alert.actions.map((a, i) => React.createElement(DS.Button, { key: i, size: "sm", variant: i === 0 ? "primary" : "outline", onClick: () => onAction(a, alert) }, a))),
      ),
    );
  }

  /* ---- Answer card (from asking) ---- */
  function AnswerCard({ q, ans, onAction }) {
    return React.createElement("div", { className: "b-card", style: { background: "var(--surface-card)", border: "1px solid var(--purple-200)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-sm)", padding: "18px 20px" } },
      React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, color: "var(--text-brand)", marginBottom: 12 } },
        React.createElement(Icon, { name: "sparkle", size: 16 }), React.createElement("span", { style: { fontSize: "var(--text-sm)", fontWeight: 700 } }, q)),
      React.createElement(U._AssistantAnswer, { ans, onAction }));
  }

  /* ---- Command palette (⌘K) ---- */
  function Palette({ open, onClose, role, onAsk, onStudent }) {
    const [q, setQ] = useState("");
    const inputRef = useRef(null);
    useEffect(() => { if (open) { setQ(""); setTimeout(() => inputRef.current && inputRef.current.focus(), 30); } }, [open]);
    if (!open) return null;
    const prompts = (RP.assistant[role] || RP.assistant.superintendent).prompts;
    const ql = q.toLowerCase();
    const pHits = prompts.map((p, i) => ({ p, i })).filter((x) => !q || x.p.toLowerCase().includes(ql));
    const sHits = Object.values(RP.students).filter((s) => q && s.name.toLowerCase().includes(ql));
    return React.createElement("div", { style: { position: "fixed", inset: 0, zIndex: 80, display: "flex", justifyContent: "center", alignItems: "flex-start", paddingTop: "12vh" } },
      React.createElement("div", { onClick: onClose, style: { position: "absolute", inset: 0, background: "rgba(20,17,26,.4)" } }),
      React.createElement("div", { style: { position: "relative", width: "min(94vw, 600px)", background: "var(--surface-card)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-xl)", overflow: "hidden" } },
        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", borderBottom: "1px solid var(--border-subtle)" } },
          React.createElement(Icon, { name: "search", size: 18, style: { color: "var(--text-subtle)" } }),
          React.createElement("input", { ref: inputRef, value: q, onChange: (e) => setQ(e.target.value), onKeyDown: (e) => { if (e.key === "Enter" && q.trim()) { onAsk(q); onClose(); } if (e.key === "Escape") onClose(); }, placeholder: "Ask anything, or jump to a student…", style: { flex: 1, border: "none", outline: "none", fontSize: "var(--text-md)", fontFamily: "var(--font-body)", background: "transparent", color: "var(--text-default)" } })),
        React.createElement("div", { style: { maxHeight: "44vh", overflowY: "auto" } },
          sHits.length > 0 && React.createElement("div", { style: { padding: "8px 16px 4px", fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, color: "var(--text-subtle)" } }, "Students"),
          sHits.map((s) => React.createElement("button", { key: s.id, onClick: () => { onStudent(s.id); onClose(); }, style: rowStyle }, React.createElement(DS.Avatar, { name: s.name, size: "xs" }), React.createElement("span", { style: { fontWeight: 600 } }, s.name), React.createElement("span", { style: { color: "var(--text-muted)", fontSize: "var(--text-xs)" } }, "Gr. " + s.grade))),
          React.createElement("div", { style: { padding: "8px 16px 4px", fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, color: "var(--text-subtle)" } }, "Ask the brain"),
          pHits.map((x) => React.createElement("button", { key: x.i, onClick: () => { onAsk(x.p, x.i); onClose(); }, style: rowStyle }, React.createElement(Icon, { name: "sparkle", size: 15, style: { color: "var(--purple-500)" } }), React.createElement("span", null, x.p))),
        ),
      ),
    );
  }
  const rowStyle = { display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 16px", border: "none", borderTop: "1px solid var(--border-subtle)", background: "transparent", cursor: "pointer", textAlign: "left", fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--text-body)" };

  /* ============================================================ */
  function App() {
    const [role, setRole] = useState("superintendent");
    const [lang, setLang] = useState("en");
    const [asked, setAsked] = useState([]);            // [{q, ans}]
    const [palette, setPalette] = useState(false);
    const [composer, setComposer] = useState(null);
    const [report, setReport] = useState(false);
    const [receipt, setReceipt] = useState(null);
    const [drawer, setDrawer] = useState(null);
    const [present, setPresent] = useState(false);
    const [toasts, setToasts] = useState([]);
    const askRef = useRef(null);

    const isES = role === "parent" && lang === "es";
    const cfg = RP.brain[role] || RP.brain.superintendent;
    const acfg = RP.assistant[role] || RP.assistant.superintendent;
    const prompts = isES && acfg.promptsES ? acfg.promptsES : acfg.prompts;
    const answers = isES && acfg.answersES ? acfg.answersES : acfg.answers;
    const alerts = (isES && RP.alertsES.parent) ? RP.alertsES.parent : (RP.alerts[role] || []);
    const title = isES ? cfg.title : (cfg.titleEn || cfg.title);
    const intro = isES ? cfg.intro : (cfg.introEn || cfg.intro);

    useEffect(() => { setAsked([]); }, [role, lang]);
    useEffect(() => {
      const h = (e) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setPalette(true); } };
      window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
    }, []);

    function toast(message, t = "success") { const id = Math.random().toString(36).slice(2); setToasts((x) => [...x, { id, message, tone: t }]); setTimeout(() => setToasts((x) => x.filter((y) => y.id !== id)), 3400); }
    function act(label, alert) {
      const l = (label || "").toLowerCase();
      if (l.includes("report") || l.includes("board") || l.includes("resumen") || l.includes("informe")) { if (l.includes("route") || l.includes("send") || l.includes("principal")) setReceipt("route"); else setReport(true); return; }
      if (l.includes("phone") || l.includes("teléfono") || l.includes("telefono")) { setReceipt("phone"); return; }
      if (l.includes("schedule") || l.includes("meeting") || l.includes("reunión") || l.includes("reunion") || l.includes("calendar")) { setReceipt("meeting"); return; }
      if (l.includes("call") || l.includes("llamar")) { setReceipt("call"); return; }
      if (l.includes("text") || l.includes("message") || l.includes("mensaje") || l.includes("outreach") || l.includes("parent") || l.includes("notify") || l.includes("loop") || l.includes("draft parent")) { setComposer(role === "parent" ? "parent-to-counselor" : "compose-diego"); return; }
      if (l.includes("practice") || l.includes("plan") || l.includes("generate") || l.includes("re-teach") || l.includes("scholarship") || l.includes("matched")) { ask(prompts[0], 0); return; }
      if (alert && alert.student) { setDrawer(alert.student); return; }
      toast(isES ? "Hecho" : "Done");
    }
    function ask(q, idx) {
      const ans = (idx != null ? answers[idx] : matchAnswer(q, prompts, answers)) || { paragraphs: [isES ? "Puedo responder eso a partir de los datos conectados. Pruebe una de las preguntas sugeridas para ver una respuesta con fuentes." : "I can pull that from your connected data — try one of the suggested questions to see a fully sourced answer."], chips: ["Synergy", isES ? "Vista previa" : "Preview"] };
      setAsked((a) => [{ q, ans }, ...a]);
      if (askRef.current) askRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    const date = new Date(2026, 5, 29).toLocaleDateString(isES ? "es" : "en", { weekday: "long", month: "long", day: "numeric" });

    return React.createElement("div", { style: { minHeight: "100vh" } },
      React.createElement(TopBar, { role, lang, onRole: (id) => { setRole(id); setLang(id === "parent" ? "es" : "en"); }, onPalette: () => setPalette(true), onSwitchLang: () => setLang(lang === "es" ? "en" : "es") }),
      React.createElement("div", { style: { maxWidth: 880, margin: "0 auto", padding: "28px 20px 140px" } },
        /* hero */
        React.createElement("div", { style: { marginBottom: 8, fontSize: "var(--text-sm)", color: "var(--text-muted)", textTransform: "capitalize" } }, date),
        React.createElement("h1", { style: { margin: "0 0 8px", fontSize: "var(--text-3xl)", letterSpacing: "var(--tracking-tight)" } }, title),
        React.createElement("p", { style: { margin: "0 0 16px", fontSize: "var(--text-md)", color: "var(--text-muted)", maxWidth: 640, lineHeight: 1.5 } }, intro),
        React.createElement(Pulse, { role, isES }),
        React.createElement("div", { style: { height: 1, background: "var(--border-subtle)", margin: "22px 0" } }),
        React.createElement("div", { style: { fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 800, color: "var(--text-accent)", marginBottom: 14 } }, isES ? "Tu informe de hoy" : "Your briefing today"),
        /* feed */
        React.createElement("div", { ref: askRef }),
        React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } },
          asked.map((a, i) => React.createElement(AnswerCard, { key: "q" + i, q: a.q, ans: a.ans, onAction: act })),
          alerts.map((al, i) => React.createElement(InsightCard, { key: al.id || i, alert: al, role, isES, onAction: act, answer: answers[0] })),
        ),
        /* suggested */
        React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 22 } },
          React.createElement("span", { style: { fontSize: "var(--text-xs)", color: "var(--text-subtle)", fontWeight: 600, alignSelf: "center" } }, isES ? "Pruebe:" : "Try asking:"),
          prompts.map((p, i) => React.createElement("button", { key: i, onClick: () => ask(p, i), style: { padding: "7px 13px", borderRadius: "var(--radius-full)", border: "1px solid var(--purple-200)", background: "var(--purple-50)", color: "var(--purple-700)", fontSize: "var(--text-xs)", fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-body)" } }, p))),
      ),
      /* sticky ask bar */
      React.createElement(AskBar, { isES, placeholder: (isES && acfg.placeholderES) ? acfg.placeholderES : acfg.placeholder, onAsk: (q) => ask(q) }),
      /* modals */
      React.createElement(Palette, { open: palette, onClose: () => setPalette(false), role, onAsk: (q, i) => ask(q, i), onStudent: (id) => setDrawer(id) }),
      React.createElement(U.MessageComposer, { open: !!composer, onClose: () => setComposer(null), presetKey: composer, lang, toast }),
      React.createElement(U.ReportPreview, { open: report, onClose: () => setReport(false), onPresent: () => { setReport(false); setPresent(true); } }),
      React.createElement(U.ActionReceipt, { kind: receipt, onClose: () => setReceipt(null) }),
      React.createElement(U.StudentDrawer, { open: !!drawer, onClose: () => setDrawer(null), studentId: drawer, role, onAction: (a) => { if (a === "compose-diego") setComposer("compose-diego"); }, toast }),
      React.createElement(U.PresentMode, { open: present, onClose: () => setPresent(false) }),
      React.createElement(U.ToastStack, { toasts, onDismiss: (id) => setToasts((t) => t.filter((x) => x.id !== id)) }),
    );
  }

  function AskBar({ isES, placeholder, onAsk }) {
    const [v, setV] = useState("");
    return React.createElement("div", { style: { position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 30, background: "linear-gradient(to top, var(--neutral-50) 65%, transparent)", padding: "18px 20px 22px" } },
      React.createElement("div", { style: { maxWidth: 720, margin: "0 auto", display: "flex", alignItems: "center", gap: 8, height: 54, padding: "0 8px 0 18px", borderRadius: "var(--radius-full)", background: "var(--surface-card)", border: "1px solid var(--border-default)", boxShadow: "var(--shadow-lg)" } },
        React.createElement(Icon, { name: "sparkle", size: 18, style: { color: "var(--purple-400)" } }),
        React.createElement("input", { value: v, onChange: (e) => setV(e.target.value), onKeyDown: (e) => { if (e.key === "Enter" && v.trim()) { onAsk(v); setV(""); } }, placeholder: placeholder || "Ask anything about your schools…", style: { flex: 1, height: "100%", border: "none", outline: "none", background: "transparent", fontSize: "var(--text-md)", fontFamily: "var(--font-body)", color: "var(--text-default)" } }),
        React.createElement("button", { onClick: () => { if (v.trim()) { onAsk(v); setV(""); } }, "aria-label": "Ask", style: { width: 42, height: 42, display: "grid", placeItems: "center", borderRadius: "var(--radius-full)", border: "none", background: "var(--color-primary)", color: "#fff", cursor: "pointer" } }, React.createElement(Icon, { name: "send", size: 17 }))),
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));
})();
