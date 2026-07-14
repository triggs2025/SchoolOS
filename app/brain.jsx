/* ============================================================
   Riverside Platform — The Brain (conversation-first home)
   A calm chat where the AI speaks first: greeting, the live
   pulse, and today's flags type in as conversation with inline
   actions (spot→inform→act). Live School Health + threshold
   automation. The dashboard is one quiet link away.
   ============================================================ */
(function () {
  const { useState, useEffect, useRef } = React;
  const DS = window.MITSTEMDesignSystem_177606;
  const Icon = window.RPIcon;
  const U = window.RPUI;
  const RP = window.RP;

  function healthTone(score) { return score >= 92 ? "success" : score >= 88 ? "warning" : "danger"; }

  /* ---- Typewriter: reveals plain text to feel like the brain is writing ---- */
  function Typewriter({ text, speed = 16, onDone }) {
    const [n, setN] = useState(0);
    useEffect(() => {
      setN(0);
      let i = 0; const iv = setInterval(() => { i++; setN(i); if (i >= text.length) { clearInterval(iv); onDone && onDone(); } }, speed);
      return () => clearInterval(iv);
    }, [text]);
    return React.createElement("span", null, text.slice(0, n), n < text.length ? React.createElement("span", { style: { opacity: 0.4 } }, "▍") : null);
  }

  /* ---- Compact live School Health strip (ticks through the day) ---- */
  function HealthStrip({ role, app, isES }) {
    const cfg = RP.brain[role] || RP.brain.superintendent;
    const [scores, setScores] = useState(cfg.health.map((h) => h.score));
    const firedRef = useRef(false);
    const [fired, setFired] = useState(false);
    useEffect(() => {
      const iv = setInterval(() => setScores((prev) => prev.map((s, i) => {
        const tr = cfg.health[i].trend;
        // at-risk schools drift down, healthy ones up — small jitter, never contradict the story
        const base = tr === "down" ? -0.45 : tr === "up" ? 0.4 : 0;
        const jitter = (Math.random() - 0.5) * 0.5;
        const lo = tr === "down" ? 85 : tr === "up" ? 90 : 88;
        const hi = tr === "down" ? 90 : 99;
        return Math.max(lo, Math.min(hi, Math.round((s + base + jitter) * 10) / 10));
      })), 2600);
      return () => clearInterval(iv);
    }, [role]);
    useEffect(() => {
      const leadership = role === "superintendent" || role === "principal" || role === "admin";
      if (leadership && !firedRef.current && scores[0] < 90 && cfg.health[0].trend === "down") {
        firedRef.current = true; setFired(true);
        app.toast("Threshold crossed — automated alert emailed to " + (role === "superintendent" ? "Principal Bell" : "the team"), "warning");
      }
    }, [scores]);
    return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } },
      React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" } },
        React.createElement("span", { title: "School Health is a live composite of attendance, on-time arrivals, grade momentum, and behavior signals from Synergy — weighted 0–100 and refreshed through the day.", style: { display: "inline-flex", alignItems: "center", gap: 6, fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 800, color: "var(--text-subtle)", cursor: "help" } },
          React.createElement("span", { className: "rp-livedot", style: { width: 7, height: 7, borderRadius: "50%", background: "var(--green-500)" } }), isES ? "Salud escolar · en vivo" : "School Health · live",
          React.createElement(Icon, { name: "info", size: 12, style: { opacity: 0.6 } })),
        cfg.health.map((h, i) => {
          const sc = scores[i]; const t = U.STATUS[healthTone(sc)];
          return React.createElement("span", { key: i, style: { display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 12px 5px 8px", borderRadius: "var(--radius-full)", background: t.bg, color: t.fg, fontWeight: 700, fontSize: "var(--text-sm)" } },
            React.createElement("span", { style: { fontFamily: "var(--font-data)", fontWeight: 800, background: "var(--surface-card)", borderRadius: "var(--radius-full)", padding: "1px 7px", color: t.fg } }, Math.round(sc)),
            h.school);
        })),
      fired && React.createElement("div", { className: "rp-msg", style: { display: "flex", alignItems: "center", gap: 9, padding: "9px 13px", borderRadius: "var(--radius-md)", background: "var(--status-warning-bg)", color: "var(--status-warning-fg)", fontSize: "var(--text-xs)", fontWeight: 600 } },
        React.createElement(Icon, { name: "mail", size: 14 }), React.createElement("span", null, React.createElement("strong", null, "Automation fired:"), " MIT crossed below 90% — category alert emailed & logged. No one had to be watching.")),
    );
  }

  /* ---- Spot→inform→act ---- */
  function brainAction(label, app, role, alert) {
    const l = (label || "").toLowerCase();
    if (l.includes("report") || l.includes("board") || l.includes("resumen") || l.includes("informe")) { if (l.includes("route") || l.includes("router") || l.includes("send") || l.includes("principal")) { app.openReceipt("route"); } else { app.openReport(); } return; }
    if (l.includes("phone") || l.includes("teléfono") || l.includes("telefono")) { app.openReceipt("phone"); return; }
    if (l.includes("schedule") || l.includes("meeting") || l.includes("reunión") || l.includes("reunion") || l.includes("calendar")) { app.openReceipt("meeting"); return; }
    if (l.includes("call") || l.includes("llamar") || l.includes("admin")) { app.openReceipt("call"); return; }
    if (l.includes("text") || l.includes("message") || l.includes("mensaje") || l.includes("outreach") || l.includes("parent") || l.includes("notify") || l.includes("loop")) { app.openComposer(role === "parent" ? "parent-to-counselor" : "compose-diego"); return; }
    if (l.includes("practice") || l.includes("práctica") || l.includes("re-teach") || l.includes("plan") || l.includes("generate")) { app.openAssistant(0); return; }
    if (alert && alert.student) { app.openStudent(alert.student); return; }
    app.toast("Done");
  }

  /* ---- Brain avatar ---- */
  function Brainmark() {
    return React.createElement("span", { style: { width: 30, height: 30, flexShrink: 0, borderRadius: "var(--radius-full)", background: "var(--surface-brand)", color: "var(--gold-300)", display: "grid", placeItems: "center", boxShadow: "var(--shadow-xs)" } }, React.createElement(Icon, { name: "sparkle", size: 16 }));
  }

  /* ---- Assistant bubble shell ---- */
  function AiBubble({ children }) {
    return React.createElement("div", { className: "rp-msg", style: { display: "flex", gap: 12, alignItems: "flex-start", maxWidth: 680 } },
      React.createElement(Brainmark, null),
      React.createElement("div", { style: { flex: 1, minWidth: 0, background: "var(--surface-card)", border: "1px solid var(--border-subtle)", borderRadius: "4px 16px 16px 16px", padding: "14px 16px", boxShadow: "var(--shadow-xs)" } }, children));
  }

  /* ---- A flag rendered conversationally ---- */
  function FlagBubble({ alert, isES, onAction }) {
    const [why, setWhy] = useState(false);
    const s = U.STATUS[alert.severity || "warning"];
    return React.createElement(AiBubble, null,
      React.createElement("div", { style: { display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 5 } },
        React.createElement("span", { style: { width: 8, height: 8, borderRadius: "50%", background: s.dot, marginTop: 7, flexShrink: 0 } }),
        React.createElement("span", { style: { flex: 1, minWidth: 0, fontWeight: 700, fontSize: "var(--text-base)", color: "var(--text-default)", lineHeight: 1.35 } }, alert.headline)),
      React.createElement("div", { style: { fontSize: "var(--text-sm)", color: "var(--text-muted)", lineHeight: 1.5 } }, alert.why),
      React.createElement("button", { onClick: () => setWhy(!why), style: { display: "inline-flex", alignItems: "center", gap: 5, marginTop: 7, background: "none", border: "none", padding: 0, cursor: "pointer", color: "var(--text-link)", fontSize: "var(--text-xs)", fontWeight: 600, fontFamily: "var(--font-body)" } },
        React.createElement(Icon, { name: "info", size: 13 }), isES ? "¿Por qué veo esto?" : "Why am I seeing this?"),
      why && React.createElement("div", { style: { marginTop: 7, display: "flex", flexDirection: "column", gap: 4 } },
        (alert.signals || []).map((sig, i) => React.createElement("div", { key: i, style: { display: "flex", gap: 7, alignItems: "flex-start", fontSize: "var(--text-xs)", color: "var(--text-body)", lineHeight: 1.4 } },
          React.createElement(Icon, { name: "chevronRight", size: 12, style: { color: "var(--gold-600)", marginTop: 2, flexShrink: 0 } }), sig))),
      alert.actions && React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" } },
        alert.actions.map((a, i) => React.createElement(DS.Button, { key: i, size: "sm", variant: i === 0 ? "primary" : "outline", onClick: () => onAction(a, alert) }, a))));
  }

  /* ---- The Brain view ---- */
  function BrainView({ role, app, lang }) {
    const cfg = RP.brain[role] || RP.brain.superintendent;
    const acfg = RP.assistant[role] || RP.assistant.superintendent;
    const isES = role === "parent" && lang === "es";
    const prompts = isES && acfg.promptsES ? acfg.promptsES : acfg.prompts;
    const answers = isES && acfg.answersES ? acfg.answersES : acfg.answers;
    const placeholder = (isES && acfg.placeholderES) ? acfg.placeholderES : acfg.placeholder;
    const alerts = (role === "parent" && isES && RP.alertsES.parent) ? RP.alertsES.parent : (RP.alerts[role] || []);
    const title = isES ? cfg.title : (cfg.titleEn || cfg.title);
    const intro = isES ? cfg.intro : (cfg.introEn || cfg.intro);
    const act = (label, alert) => brainAction(label, app, role, alert);

    const items = React.useMemo(
      () => {
        const inbox = (role === "parent" ? (window.RP_INBOX || []).filter((e) => e.to === "parent") : []);
        const inboxItems = inbox.map((e) => ({ kind: "inbox", msg: e }));
        return [{ kind: "greet", text: title + " — " + intro }].concat(inboxItems).concat(alerts.map((a) => ({ kind: "flag", alert: a })));
      },
      [role, lang]);

    const [visible, setVisible] = useState(0);     // how many intro items revealed
    const [introDone, setIntroDone] = useState(false);
    const [convo, setConvo] = useState([]);          // user-driven messages after intro
    const [typing, setTyping] = useState(false);
    const [input, setInput] = useState("");
    const endRef = useRef(null);

    useEffect(() => {
      setVisible(0); setIntroDone(false); setConvo([]); setTyping(false);
      let n = 0;
      const iv = setInterval(() => {
        n += 1; setVisible(n);
        if (n >= items.length) { clearInterval(iv); setIntroDone(true); }
      }, 850);
      return () => clearInterval(iv);
    }, [role, lang]);

    useEffect(() => { if (endRef.current) endRef.current.scrollIntoView({ block: "end" }); }, [visible, convo, typing]);

    function reply(idx) { setConvo((c) => [...c, { who: "user", text: prompts[idx] }]); setTyping(true); setTimeout(() => { setTyping(false); setConvo((c) => [...c, { who: "ai", ans: answers[idx] }]); }, 760); }
    function matchAnswer(text) {
      const q = text.toLowerCase();
      const stop = new Set(["the","a","an","is","are","do","does","what","which","who","how","why","me","my","our","this","that","of","in","on","for","to","and","i","we","can","you","tell","show","about","s"]);
      const words = q.split(/[^a-zà-ÿ0-9]+/).filter((w) => w.length > 2 && !stop.has(w));
      let best = -1, bestScore = 0;
      prompts.forEach((p, idx) => {
        const pl = p.toLowerCase();
        let score = 0;
        words.forEach((w) => { if (pl.includes(w)) score += 1; });
        if (score > bestScore) { bestScore = score; best = idx; }
      });
      return bestScore >= 1 ? answers[best] : null;
    }
    const fallbackAnswer = {
      paragraphs: [
        isES ? "Puedo responder eso a partir de los datos conectados. Para esta vista previa, esto es lo más cercano que tengo con cifras reales — pruebe una de las preguntas sugeridas abajo para ver una respuesta con fuentes y acciones." : "I can pull that from your connected data. For this preview the grounded, source-cited answers live behind the suggested questions below — tap one to see a full answer with citations and one-click actions.",
      ],
      chips: isES ? ["Synergy", "Vista previa"] : ["Synergy", "Preview mode"],
    };
    function askFree() { if (!input.trim()) return; const t = input; setConvo((c) => [...c, { who: "user", text: t }]); setInput(""); setTyping(true); setTimeout(() => { setTyping(false); setConvo((c) => [...c, { who: "ai", ans: matchAnswer(t) || fallbackAnswer }]); }, 760); }

    function introBubble(m, i) {
      if (m.kind === "greet") return React.createElement(AiBubble, { key: "g" + i }, React.createElement("div", { style: { fontSize: "var(--text-md)", color: "var(--text-body)", lineHeight: 1.55 } }, React.createElement(Typewriter, { text: m.text })));
      if (m.kind === "inbox") return React.createElement(AiBubble, { key: "in" + i },
        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 5 } },
          React.createElement("span", { style: { display: "inline-flex", alignItems: "center", gap: 5, padding: "2px 9px", borderRadius: "var(--radius-full)", background: "var(--status-info-bg)", color: "var(--status-info-fg)", fontSize: "var(--text-2xs)", fontWeight: 800, letterSpacing: "0.04em" } }, React.createElement(Icon, { name: "mail", size: 12 }), isES ? "NUEVO MENSAJE" : "NEW MESSAGE"),
          React.createElement("span", { style: { fontWeight: 700, fontSize: "var(--text-sm)" } }, m.msg.from)),
        React.createElement("div", { style: { fontSize: "var(--text-sm)", color: "var(--text-body)", lineHeight: 1.55 } }, isES ? m.msg.es : m.msg.en),
        React.createElement("div", { style: { fontSize: "var(--text-2xs)", color: "var(--gold-700)", fontWeight: 700, marginTop: 6, display: "inline-flex", alignItems: "center", gap: 5 } }, React.createElement(Icon, { name: "translate", size: 12 }), isES ? "Traducido automáticamente al español" : "Auto-translated for you"),
        React.createElement("div", { style: { marginTop: 10 } }, React.createElement(DS.Button, { size: "sm", variant: "primary", iconLeft: React.createElement(Icon, { name: "message", size: 14 }), onClick: () => app.openComposer("parent-to-counselor") }, isES ? "Responder" : "Reply")));
      return React.createElement(FlagBubble, { key: "f" + i, alert: m.alert, isES, onAction: act });
    }
    function answerBubble(m, i) {
      if (m.who === "user") return React.createElement("div", { key: "u" + i, className: "rp-msg", style: { alignSelf: "flex-end", maxWidth: "78%", background: "var(--color-primary)", color: "#fff", padding: "10px 15px", borderRadius: "16px 16px 4px 16px", fontSize: "var(--text-sm)", lineHeight: 1.45 } }, m.text);
      return React.createElement("div", { key: "a" + i, className: "rp-msg", style: { display: "flex", gap: 12, alignItems: "flex-start", maxWidth: 700 } },
        React.createElement(Brainmark, null),
        React.createElement("div", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 10 } },
          React.createElement("div", { style: { background: "var(--surface-card)", border: "1px solid var(--border-subtle)", borderRadius: "4px 16px 16px 16px", padding: "14px 16px", boxShadow: "var(--shadow-xs)" } },
            React.createElement(U._AssistantAnswer, { ans: m.ans, onAction: act })),
          m.ans.followups && React.createElement(U.FollowupChips, { items: m.ans.followups, onPick: (f) => reply(f.to) })));
    }

    const stillTyping = (visible < items.length) || typing;

    return React.createElement("div", { style: { maxWidth: 820, margin: "0 auto", display: "flex", flexDirection: "column", gap: 18, minHeight: "100%" } },
      /* slim header */
      React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" } },
        React.createElement("div", { style: { display: "inline-flex", alignItems: "center", gap: 10, flexShrink: 0 } },
          React.createElement(Brainmark, null),
          React.createElement("div", { style: { whiteSpace: "nowrap" } },
            React.createElement("div", { style: { fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "var(--text-md)", color: "var(--text-default)", lineHeight: 1.15 } }, isES ? "Tu cerebro escolar" : "Your school brain"),
            React.createElement("div", { style: { fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, color: "var(--text-accent)" } }, isES ? "siempre observando" : "always watching"))),
        React.createElement(HealthStrip, { role, app, isES })),
      React.createElement("div", { style: { height: 1, background: "var(--border-subtle)" } }),

      /* transcript */
      React.createElement("div", { style: { flex: 1, display: "flex", flexDirection: "column", gap: 14, paddingBottom: 4 } },
        items.slice(0, visible).map(introBubble),
        convo.map(answerBubble),
        stillTyping && React.createElement("div", { className: "rp-msg", style: { display: "flex", gap: 12, alignItems: "center" } },
          React.createElement(Brainmark, null),
          React.createElement("div", { style: { display: "flex", gap: 5, padding: "13px 16px", background: "var(--surface-card)", border: "1px solid var(--border-subtle)", borderRadius: "4px 16px 16px 16px" } },
            [0, 1, 2].map((d) => React.createElement("span", { key: d, style: { width: 7, height: 7, borderRadius: "50%", background: "var(--purple-300)", animation: "rp-blink 1s infinite", animationDelay: d * 0.16 + "s" } })))),
        React.createElement("div", { ref: endRef })),

      /* suggested prompts (after intro) */
      introDone && React.createElement("div", { className: "rp-msg", style: { display: "flex", flexWrap: "wrap", gap: 8 } },
        prompts.map((p, i) => React.createElement("button", { key: i, onClick: () => reply(i), style: { textAlign: "left", padding: "8px 13px", borderRadius: "var(--radius-full)", border: "1px solid var(--purple-200)", background: "var(--purple-50)", color: "var(--purple-700)", fontSize: "var(--text-xs)", fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-body)" } }, p))),

      /* composer */
      React.createElement("div", { style: { position: "sticky", bottom: 0, display: "flex", gap: 8, alignItems: "center", padding: "12px 0 4px", background: "linear-gradient(to top, var(--surface-page) 70%, transparent)" } },
        React.createElement("div", { style: { flex: 1, display: "flex", alignItems: "center", gap: 8, padding: "0 6px 0 16px", height: 50, borderRadius: "var(--radius-full)", background: "var(--surface-card)", border: "1px solid var(--border-default)", boxShadow: "var(--shadow-sm)" } },
          React.createElement(Icon, { name: "sparkle", size: 16, style: { color: "var(--purple-400)" } }),
          React.createElement("input", { value: input, onChange: (e) => setInput(e.target.value), onKeyDown: (e) => e.key === "Enter" && askFree(), placeholder, style: { flex: 1, height: "100%", border: "none", outline: "none", background: "transparent", fontSize: "var(--text-base)", fontFamily: "var(--font-body)", color: "var(--text-default)" } }),
          React.createElement("button", { onClick: askFree, "aria-label": "Send", style: { width: 38, height: 38, display: "grid", placeItems: "center", borderRadius: "var(--radius-full)", border: "none", background: "var(--color-primary)", color: "#fff", cursor: "pointer" } }, React.createElement(Icon, { name: "send", size: 16 }))),
      ),

      /* quiet dive-deeper line */
      React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", fontSize: "var(--text-xs)", color: "var(--text-subtle)", paddingBottom: 8 } },
        React.createElement("span", null, isES ? "O profundice:" : "Or dive into the data:"),
        (RP.nav[role] || []).filter((n) => n.id !== "brain").slice(0, 5).map((n) => React.createElement("button", { key: n.id, onClick: () => app.go(n.id), style: { background: "none", border: "none", padding: 0, cursor: "pointer", color: "var(--text-link)", fontWeight: 600, fontSize: "var(--text-xs)", fontFamily: "var(--font-body)" } }, n.label))),
    );
  }

  window.RPBrainView = BrainView;
})();
