/* ============================================================
   Riverside — Version B · "Pulse"
   A triage cockpit. The brain prioritizes the whole district
   into a queue and shows you ONE decision at a time: the data,
   why it matters, and big one-click actions. Act or dismiss to
   advance — zero-inbox for school leadership. Live pulse on top.
   ============================================================ */
(function () {
  const { useState, useEffect, useRef } = React;
  const DS = window.MITSTEMDesignSystem_177606;
  const Icon = window.RPIcon;
  const U = window.RPUI;
  const RP = window.RP;

  const tone = (s) => s >= 92 ? "success" : s >= 88 ? "warning" : "danger";

  /* ---- Live pulse rings (on the purple chrome) ---- */
  function PulseRings({ role, light }) {
    const cfg = RP.brain[role] || RP.brain.superintendent;
    const [scores, setScores] = useState(cfg.health.map((h) => h.score));
    useEffect(() => { setScores(cfg.health.map((h) => h.score)); }, [role]);
    useEffect(() => {
      const iv = setInterval(() => setScores((prev) => prev.map((s, i) => {
        const hi0 = cfg.health[i]; if (!hi0) return s;
        const tr = hi0.trend; const base = tr === "down" ? -0.4 : tr === "up" ? 0.4 : 0;
        const lo = tr === "down" ? 85 : 90, hiB = tr === "down" ? 90 : 99;
        return Math.max(lo, Math.min(hiB, Math.round((s + base + (Math.random() - 0.5) * 0.5) * 10) / 10));
      })), 2600);
      return () => clearInterval(iv);
    }, [role]);
    const nameColor = light ? "var(--text-muted)" : "rgba(255,255,255,.8)";
    const liveColor = light ? "var(--gold-700)" : "var(--gold-300)";
    return React.createElement("div", { style: { display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" } },
      React.createElement("span", { style: { display: "inline-flex", alignItems: "center", gap: 7, fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 800, color: liveColor } },
        React.createElement("span", { className: "rp-livedot", style: { width: 7, height: 7, borderRadius: "50%", background: liveColor } }), "Live"),
      cfg.health.map((h, i) => { const sc = scores[i] != null ? scores[i] : h.score; const c = light ? { success: "var(--status-success-fg)", warning: "var(--gold-700)", danger: "var(--status-danger-fg)" }[tone(sc)] : { success: "var(--green-300, #8fd3a8)", warning: "var(--gold-300)", danger: "#f0a8a0" }[tone(sc)]; return React.createElement("span", { key: i, style: { display: "inline-flex", alignItems: "center", gap: 8, color: light ? "var(--text-body)" : "#fff" } },
        React.createElement("span", { style: { fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "var(--text-xl)", color: c } }, Math.round(sc)),
        React.createElement("span", { style: { fontSize: "var(--text-xs)", color: nameColor, fontWeight: 600 } }, h.school)); }),
    );
  }

  /* ---- Today's triage briefing (cards merged into the chat home) ---- */
  function TriageBriefing({ queue, idx, setIdx, role, isES, answers, counts, handledToday, onAction, onResolve, onSnooze, boardFor, openSection }) {
    const cleared = idx >= queue.length;
    return React.createElement("div", { style: { width: "100%" } },
      React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 14, flexWrap: "wrap" } },
        React.createElement("div", { style: { display: "flex", alignItems: "baseline", gap: 12 } },
          React.createElement("span", { style: { fontSize: "var(--text-xs)", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-accent)" } }, isES ? "Hoy" : "Today"),
          React.createElement("h2", { style: { margin: 0, fontSize: "var(--text-lg)", fontFamily: "var(--font-display)", color: "var(--text-body)" } }, cleared ? (isES ? "Está al día" : "You're all clear") : (isES ? "Lo que necesita su atención" : "What needs you now"))),
        !cleared && React.createElement("div", { style: { display: "inline-flex", gap: 12, fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--text-muted)" } },
          counts.urgent > 0 && React.createElement("span", { style: { display: "inline-flex", alignItems: "center", gap: 5 } }, React.createElement("span", { style: { width: 7, height: 7, borderRadius: "50%", background: "var(--status-danger-fg)" } }), counts.urgent + (isES ? " urgente" : " urgent")),
          counts.review > 0 && React.createElement("span", { style: { display: "inline-flex", alignItems: "center", gap: 5 } }, React.createElement("span", { style: { width: 7, height: 7, borderRadius: "50%", background: "var(--gold-600)" } }), counts.review + (isES ? " por revisar" : " to review")),
          counts.wins > 0 && React.createElement("span", { style: { display: "inline-flex", alignItems: "center", gap: 5 } }, React.createElement("span", { style: { width: 7, height: 7, borderRadius: "50%", background: "var(--status-success-fg)" } }), counts.wins + (isES ? " logro" : " win") + (counts.wins > 1 && !isES ? "s" : "")))),
      React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "11px 16px", marginBottom: 16, background: "var(--surface-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", flexWrap: "wrap" } }, React.createElement(PulseRings, { role, light: true })),
      cleared
        ? React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14, padding: "20px 22px", background: "var(--surface-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-sm)" } },
            React.createElement("span", { style: { width: 42, height: 42, flexShrink: 0, borderRadius: "50%", background: "var(--status-success-bg)", color: "var(--status-success-fg)", display: "grid", placeItems: "center" } }, React.createElement(Icon, { name: "check", size: 22 })),
            React.createElement("div", { style: { flex: 1 } },
              React.createElement("div", { style: { fontWeight: 700, fontSize: "var(--text-md)", color: "var(--text-body)" } }, handledToday > 0 ? (isES ? `Resolvió ${handledToday} ${handledToday === 1 ? "asunto" : "asuntos"} hoy` : `You handled ${handledToday} ${handledToday === 1 ? "thing" : "things"} today`) : (isES ? "Nada pendiente ahora" : "Nothing needs you right now")),
              React.createElement("div", { style: { fontSize: "var(--text-sm)", color: "var(--text-muted)", marginTop: 2 } }, isES ? "El cerebro sigue observando. Pregúntele lo que quiera arriba." : "The brain keeps watching. Ask it anything above.")),
            React.createElement("button", { onClick: () => setIdx(0), style: { ...linkBtn, color: "var(--text-muted)" } }, React.createElement(Icon, { name: "refresh", size: 14 }), isES ? "Repasar" : "Replay"))
        : React.createElement(React.Fragment, null,
            React.createElement(DecisionCard, { key: idx, alert: queue[idx], role, isES, answer: answers[0], onAction, onResolve, onSnooze, onBoard: () => openSection(boardFor(queue[idx])), index: idx, total: queue.length }),
            queue.length > 1 && React.createElement("div", { style: { display: "flex", gap: 7, justifyContent: "center", marginTop: 16 } },
              queue.map((_, i) => React.createElement("span", { key: i, onClick: () => setIdx(i), style: { width: 8, height: 8, borderRadius: "50%", cursor: "pointer", background: i === idx ? "var(--color-accent)" : i < idx ? "var(--purple-200)" : "var(--neutral-300)" } })))),
    );
  }

  /* ---- The focused decision card ---- */
  function DecisionCard({ alert, role, isES, answer, onAction, onResolve, onSnooze, onBoard, index, total }) {
    const [why, setWhy] = useState(false);
    const [detail, setDetail] = useState(false);
    const sev = alert.severity || "warning";
    const s = U.STATUS[sev];
    const sevLabel = isES ? { danger: "Urgente", warning: "Atención", info: "Nota" }[sev] : { danger: "Urgent", warning: "Needs you", info: "Heads-up" }[sev];
    const kind = alert.kind || "alert";
    const KIND = {
      win: { label: isES ? "Buena noticia" : "Win", bg: "var(--status-success-bg)", fg: "var(--status-success-fg)", dot: "var(--green-500)", icon: "sparkle" },
      approval: { label: isES ? "Aprobar" : "Approve", bg: "var(--purple-50)", fg: "var(--purple-700)", dot: "var(--purple-500)", icon: "check" },
      deadline: { label: isES ? "Fecha límite" : "Deadline", bg: "var(--status-warning-bg)", fg: "var(--status-warning-fg)", dot: "var(--amber-500)", icon: "clock" },
    };
    const badge = KIND[kind] || { label: sevLabel, bg: s.bg, fg: s.fg, dot: s.dot, icon: sev === "info" ? "info" : "alert" };
    return React.createElement("div", { className: "p-card", style: { background: "var(--surface-card)", borderRadius: "var(--radius-2xl)", boxShadow: "var(--shadow-xl)", overflow: "hidden", borderTop: `6px solid ${badge.dot}` } },
      React.createElement("div", { style: { padding: "26px 30px 30px" } },
        React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 18 } },
          React.createElement("span", { style: { display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 13px", borderRadius: "var(--radius-full)", background: badge.bg, color: badge.fg, fontSize: "var(--text-xs)", fontWeight: 800, letterSpacing: "0.04em", textTransform: "uppercase" } },
            React.createElement(Icon, { name: badge.icon, size: 13 }), badge.label),
          React.createElement("span", { style: { display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "var(--font-data)", fontSize: "var(--text-sm)", color: "var(--text-subtle)", fontWeight: 600 } },
            alert.ago && React.createElement("span", { style: { display: "inline-flex", alignItems: "center", gap: 4 } }, React.createElement(Icon, { name: "clock", size: 13 }), alert.ago),
            React.createElement("span", null, (index + 1) + " / " + total))),
        React.createElement("h1", { style: { margin: 0, fontSize: "var(--text-3xl)", lineHeight: 1.15, letterSpacing: "var(--tracking-tight)" } }, alert.headline),
        React.createElement("p", { style: { margin: "12px 0 0", fontSize: "var(--text-md)", color: "var(--text-muted)", lineHeight: 1.55, maxWidth: 620 } }, alert.why),
        /* signals */
        React.createElement("div", { style: { display: "flex", gap: 16, margin: "14px 0 0", flexWrap: "wrap" } },
          answer && React.createElement("button", { onClick: () => setDetail(!detail), style: linkBtn }, React.createElement(Icon, { name: detail ? "chevronDown" : "chevronRight", size: 15 }), detail ? (isES ? "Ocultar datos" : "Hide the data") : (isES ? "Ver los datos" : "See the data")),
          onBoard && React.createElement("button", { onClick: onBoard, style: linkBtn }, React.createElement(Icon, { name: "grid", size: 14 }), isES ? "Abrir el tablero completo" : "Open the full board"),
          alert.signals && React.createElement("button", { onClick: () => setWhy(!why), style: { ...linkBtn, color: "var(--text-subtle)" } }, React.createElement(Icon, { name: "info", size: 14 }), isES ? "¿Por qué?" : "Why this?")),
        why && alert.signals && React.createElement("div", { style: { marginTop: 12, padding: "12px 14px", background: "var(--neutral-50)", borderRadius: "var(--radius-md)", display: "flex", flexDirection: "column", gap: 5 } },
          alert.signals.map((sig, i) => React.createElement("div", { key: i, style: { display: "flex", gap: 8, alignItems: "flex-start", fontSize: "var(--text-sm)", color: "var(--text-body)", lineHeight: 1.45 } }, React.createElement(Icon, { name: "chevronRight", size: 13, style: { color: "var(--gold-600)", marginTop: 3, flexShrink: 0 } }), sig))),
        detail && answer && React.createElement("div", { style: { marginTop: 16, padding: 18, background: "var(--neutral-50)", borderRadius: "var(--radius-lg)" } }, React.createElement(U._AssistantAnswer, { ans: answer, onAction })),
        /* big actions */
        React.createElement("div", { style: { display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap" } },
          (alert.actions || []).map((a, i) => React.createElement(DS.Button, { key: i, size: "lg", variant: i === 0 ? "primary" : "outline", onClick: () => { onAction(a, alert); }, style: { flex: alert.actions.length <= 2 ? 1 : "none", minWidth: 150 } }, a))),
        /* triage controls */
        React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 22, paddingTop: 18, borderTop: "1px solid var(--border-subtle)" } },
          React.createElement("button", { onClick: onSnooze, style: { ...linkBtn, color: "var(--text-muted)" } }, React.createElement(Icon, { name: "clock", size: 15 }), isES ? "Posponer" : "Snooze"),
          React.createElement(DS.Button, { variant: "secondary", iconRight: React.createElement(Icon, { name: "check", size: 16 }), onClick: onResolve }, isES ? "Resuelto · siguiente" : "Done · next")),
      ),
    );
  }
  const linkBtn = { display: "inline-flex", alignItems: "center", gap: 5, background: "none", border: "none", padding: 0, cursor: "pointer", color: "var(--text-link)", fontSize: "var(--text-sm)", fontWeight: 700, fontFamily: "var(--font-body)" };

  /* ---- Cleared state — becomes the chat home once the queue is empty ---- */
  function Cleared({ isES, handledToday, recent, prompts, onReplay, onAskText, onPickPrompt, onOpenHistory, onOpenItem }) {
    const [text, setText] = useState("");
    const submit = () => { const q = text.trim(); if (!q) return; setText(""); onAskText(q); };
    return React.createElement("div", { className: "p-card", style: { background: "var(--surface-card)", borderRadius: "var(--radius-2xl)", boxShadow: "var(--shadow-xl)", overflow: "hidden" } },
      React.createElement("div", { style: { padding: "30px 30px 26px", textAlign: "center", borderBottom: "1px solid var(--border-subtle)" } },
        React.createElement("div", { style: { width: 52, height: 52, margin: "0 auto 14px", borderRadius: "50%", background: "var(--status-success-bg)", color: "var(--status-success-fg)", display: "grid", placeItems: "center" } }, React.createElement(Icon, { name: "check", size: 26 })),
        React.createElement("h2", { style: { margin: "0 0 6px", fontSize: "var(--text-2xl)" } }, isES ? "Está al día" : "You're all clear"),
        React.createElement("p", { style: { margin: "0 auto", color: "var(--text-muted)", maxWidth: 460, lineHeight: 1.5, fontSize: "var(--text-sm)" } },
          handledToday > 0
            ? (isES ? `Resolvió ${handledToday} ${handledToday === 1 ? "asunto" : "asuntos"} hoy. ¿En qué más puedo ayudar?` : `You handled ${handledToday} ${handledToday === 1 ? "thing" : "things"} today. What else can I help with?`)
            : (isES ? "El cerebro seguirá observando. Mientras tanto, pregúnteme lo que quiera." : "The brain keeps watching. In the meantime, ask me anything.")),
      ),
      /* chat input — the encouragement to start a conversation */
      React.createElement("div", { style: { padding: "20px 24px" } },
        React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center", border: "1.5px solid var(--purple-200)", borderRadius: "var(--radius-full)", padding: "6px 6px 6px 16px", background: "var(--neutral-50)" } },
          React.createElement(Icon, { name: "sparkle", size: 17, style: { color: "var(--color-accent)", flexShrink: 0 } }),
          React.createElement("input", { value: text, onChange: (e) => setText(e.target.value), onKeyDown: (e) => { if (e.key === "Enter") submit(); }, placeholder: isES ? "Pregúntele al cerebro sobre cualquier estudiante, escuela o tendencia…" : "Ask the brain about any student, school, or trend…", style: { flex: 1, border: "none", outline: "none", background: "transparent", fontSize: "var(--text-sm)", fontFamily: "var(--font-body)", color: "var(--text-body)" } }),
          React.createElement(DS.Button, { size: "sm", iconRight: React.createElement(Icon, { name: "arrowRight", size: 15 }), onClick: submit }, isES ? "Preguntar" : "Ask")),
        React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 7, marginTop: 12 } },
          (prompts || []).slice(0, 3).map((p, i) => React.createElement("button", { key: i, onClick: () => onPickPrompt(i), style: { textAlign: "left", padding: "7px 12px", borderRadius: "var(--radius-full)", border: "1px solid var(--purple-200)", background: "var(--surface-card)", color: "var(--purple-700)", fontSize: "var(--text-xs)", fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-body)" } }, p))),
      ),
      /* recent activity preview */
      recent && recent.length > 0 && React.createElement("div", { style: { borderTop: "1px solid var(--border-subtle)", padding: "16px 24px 20px" } },
        React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 } },
          React.createElement("span", { style: { fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 800, color: "var(--text-subtle)" } }, isES ? "Reciente" : "Recent"),
          React.createElement("button", { onClick: onOpenHistory, style: linkBtn }, isES ? "Ver todo" : "See all")),
        recent.slice(0, 3).map((h) => React.createElement(HistoryRow, { key: h.id, item: h, isES, compact: true, onClick: () => onOpenItem(h) }))),
      React.createElement("div", { style: { display: "flex", justifyContent: "center", padding: "0 24px 22px" } },
        React.createElement("button", { onClick: onReplay, style: { ...linkBtn, color: "var(--text-muted)" } }, React.createElement(Icon, { name: "refresh", size: 14 }), isES ? "Repasar la cola de nuevo" : "Replay the queue")),
    );
  }

  /* ---- A single history row (used in panel + cleared preview) ---- */
  function HistoryRow({ item, isES, compact, onClick }) {
    const isChat = item.kind === "chat";
    const st = { done: { icon: "check", c: "var(--status-success-fg)", bg: "var(--status-success-bg)" }, snoozed: { icon: "clock", c: "var(--text-muted)", bg: "var(--neutral-100)" }, approved: { icon: "check", c: "var(--purple-700)", bg: "var(--purple-50)" }, signed: { icon: "check", c: "var(--purple-700)", bg: "var(--purple-50)" } }[item.status] || { icon: "check", c: "var(--status-success-fg)", bg: "var(--status-success-bg)" };
    const ic = isChat ? { icon: "sparkle", c: "var(--color-accent)", bg: "var(--gold-50)" } : st;
    const label = isChat ? item.q : item.headline;
    const meta = isChat ? (isES ? "Conversación" : "Conversation") : (isES ? { done: "Resuelto", snoozed: "Pospuesto", approved: "Aprobado", signed: "Firmado" }[item.status] : { done: "Resolved", snoozed: "Snoozed", approved: "Approved", signed: "Signed" }[item.status] || (isES ? "Hecho" : "Done"));
    return React.createElement("button", { onClick, style: { display: "flex", alignItems: "center", gap: 11, width: "100%", textAlign: "left", padding: compact ? "8px 0" : "11px 12px", border: "none", borderRadius: compact ? 0 : "var(--radius-md)", background: "transparent", cursor: isChat ? "pointer" : "default", fontFamily: "var(--font-body)" }, onMouseEnter: (e) => { if (!compact) e.currentTarget.style.background = "var(--neutral-50)"; }, onMouseLeave: (e) => { if (!compact) e.currentTarget.style.background = "transparent"; } },
      React.createElement("span", { style: { width: 28, height: 28, borderRadius: "50%", background: ic.bg, color: ic.c, display: "grid", placeItems: "center", flexShrink: 0 } }, React.createElement(Icon, { name: ic.icon, size: 14 })),
      React.createElement("span", { style: { flex: 1, minWidth: 0 } },
        React.createElement("span", { style: { display: "block", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--text-body)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, label),
        React.createElement("span", { style: { display: "block", fontSize: "var(--text-2xs)", color: "var(--text-subtle)", fontWeight: 600 } }, meta + " · " + U.timeAgo(item.ts, isES))),
      isChat && React.createElement(Icon, { name: "chevronRight", size: 15, style: { color: "var(--text-subtle)", flexShrink: 0 } }),
    );
  }

  /* ---- History panel (chats + handled items) ---- */
  function HistoryPanel({ open, onClose, history, isES, onOpenItem, onClear }) {
    const [tab, setTab] = useState("all");
    const items = history.filter((h) => tab === "all" || (tab === "chats" ? h.kind === "chat" : h.kind === "handled"));
    const tabs = [["all", isES ? "Todo" : "All"], ["chats", isES ? "Conversaciones" : "Chats"], ["handled", isES ? "Resueltos" : "Handled"]];
    return React.createElement(U.SlideOver, { open, onClose, width: 420, label: "History" },
      React.createElement(U.PanelHead, { icon: "clock", title: isES ? "Historial" : "History", sub: isES ? "Conversaciones y asuntos resueltos" : "Conversations & handled items", onClose, accent: true }),
      React.createElement("div", { style: { display: "flex", gap: 6, padding: "12px 16px", borderBottom: "1px solid var(--border-subtle)" } },
        tabs.map(([id, lb]) => React.createElement("button", { key: id, onClick: () => setTab(id), style: { padding: "5px 13px", borderRadius: "var(--radius-full)", border: "1px solid " + (tab === id ? "var(--color-primary)" : "var(--border-default)"), background: tab === id ? "var(--color-primary)" : "transparent", color: tab === id ? "#fff" : "var(--text-body)", fontSize: "var(--text-xs)", fontWeight: 700, cursor: "pointer", fontFamily: "var(--font-body)" } }, lb))),
      React.createElement("div", { style: { flex: 1, overflowY: "auto", padding: "8px 12px" } },
        items.length === 0
          ? React.createElement("div", { style: { textAlign: "center", color: "var(--text-muted)", padding: "48px 20px", fontSize: "var(--text-sm)" } }, isES ? "Aún no hay actividad. Lo que resuelva o pregunte aparecerá aquí." : "Nothing yet. Anything you resolve or ask the brain shows up here.")
          : items.map((h) => React.createElement(HistoryRow, { key: h.id, item: h, isES, onClick: () => h.kind === "chat" && onOpenItem(h) }))),
      history.length > 0 && React.createElement("div", { style: { padding: "10px 16px", borderTop: "1px solid var(--border-subtle)" } },
        React.createElement("button", { onClick: onClear, style: { ...linkBtn, color: "var(--text-muted)" } }, React.createElement(Icon, { name: "trash", size: 14 }), isES ? "Borrar historial" : "Clear history")),
    );
  }

  /* ---- Composer (shared by empty state + docked bar) ---- */
  function ChatComposer({ value, onChange, onSend, isES, autoFocus }) {
    return React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "flex-end", background: "var(--surface-card)", border: "1.5px solid var(--border-default)", borderRadius: 26, padding: "8px 8px 8px 18px", boxShadow: "var(--shadow-md)" } },
      React.createElement("textarea", { value, autoFocus, rows: 1, onChange: (e) => { onChange(e.target.value); e.target.style.height = "auto"; e.target.style.height = Math.min(e.target.scrollHeight, 160) + "px"; }, onKeyDown: (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onSend(); } }, placeholder: isES ? "Pregúntele al cerebro…" : "Message the brain…", style: { flex: 1, resize: "none", border: "none", outline: "none", background: "transparent", fontSize: "var(--text-md)", fontFamily: "var(--font-body)", color: "var(--text-body)", lineHeight: 1.5, padding: "6px 0", maxHeight: 160 } }),
      React.createElement("button", { onClick: onSend, "aria-label": "Send", style: { width: 38, height: 38, flexShrink: 0, borderRadius: "50%", border: "none", background: value.trim() ? "var(--color-primary)" : "var(--neutral-200)", color: "#fff", display: "grid", placeItems: "center", cursor: value.trim() ? "pointer" : "default", transition: "background var(--ease-out) 140ms" } }, React.createElement(Icon, { name: "arrowUp", size: 18 })));
  }

  /* ---- The Brain — main page (chat-first, cards merged into the home) ---- */
  function BrainHome({ role, isES, seed, replay, initialQuestion, onLog, chats, alerts, onClearChats, topRight, briefing, sidebarFooter }) {
    const acfg = RP.assistant[role] || RP.assistant.superintendent;
    const prompts = isES && acfg.promptsES ? acfg.promptsES : acfg.prompts;
    const answers = isES && acfg.answersES ? acfg.answersES : acfg.answers;
    const r = RP.roleById[role] || {};
    const [thread, setThread] = useState([]);
    const [busy, setBusy] = useState(false);
    const [input, setInput] = useState("");
    const [activeId, setActiveId] = useState(null);
    const [navTab, setNavTab] = useState("chats");
    const scrollRef = useRef(null);
    function matchAnswer(q) {
      const ql = q.toLowerCase(); let best = -1, bs = 0;
      prompts.forEach((p, i) => { let s = 0; p.toLowerCase().split(/\W+/).filter((w) => w.length > 3).forEach((w) => { if (ql.includes(w)) s++; }); if (s > bs) { bs = s; best = i; } });
      if (bs > 0) return answers[best];
      return { paragraphs: [isES ? "Buena pregunta. Todavía no tengo datos en vivo conectados para responder eso con precisión — pero puedo enrutarlo a la persona indicada o abrir el tablero relacionado." : "Good question. I don't have live data wired for that exact ask yet — but I can route it to the right person or open the related board for you."], chips: [isES ? "Enrutado al equipo de datos" : "Routed to the data team"] };
    }
    function pushQA(q, ans) { setActiveId(null); setThread((t) => [...t, { who: "user", text: q }]); setBusy(true); setTimeout(() => { setBusy(false); setThread((t) => [...t, { who: "ai", ans }]); onLog && onLog(q, ans); }, 750); }
    function ask(i) { pushQA(prompts[i], answers[i]); }
    function askFree(q) { const t = (q != null ? q : input).trim(); if (!t) return; setInput(""); pushQA(t, matchAnswer(t)); }
    function newChat() { setThread([]); setInput(""); setActiveId(null); }
    function loadChat(c) { setThread([{ who: "user", text: c.q }, { who: "ai", ans: c.ans }]); setActiveId(c.id); setInput(""); }
    useEffect(() => {
      if (replay) { setThread([{ who: "user", text: replay.q }, { who: "ai", ans: replay.ans }]); setActiveId(null); return; }
      if (seed != null) { const a = answers[seed]; setThread([{ who: "user", text: prompts[seed] }]); setBusy(true); const tm = setTimeout(() => { setBusy(false); setThread([{ who: "user", text: prompts[seed] }, { who: "ai", ans: a }]); onLog && onLog(prompts[seed], a); }, 750); return () => clearTimeout(tm); }
      if (initialQuestion) { askFree(initialQuestion); }
    }, [seed, replay, initialQuestion]);
    useEffect(() => { setThread([]); setInput(""); setActiveId(null); setBusy(false); }, [role, isES]);
    useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [thread, busy]);
    const empty = thread.length === 0 && !busy;
    const COL = 760;

    const brainAvatar = (size) => React.createElement("span", { style: { width: size, height: size, flexShrink: 0, borderRadius: "50%", background: "var(--color-primary)", display: "grid", placeItems: "center", boxShadow: "var(--shadow-sm)" } }, React.createElement("img", { src: "assets/eagle-white.png", alt: "", style: { width: size * 0.62, height: size * 0.62, objectFit: "contain" } }));

    /* sidebar of past conversations */
    const sidebar = React.createElement("div", { style: { width: 268, flexShrink: 0, background: "var(--purple-50)", borderRight: "1px solid var(--border-subtle)", display: "flex", flexDirection: "column", height: "100%" } },
      React.createElement("div", { style: { padding: "16px 14px 12px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8 } },
        React.createElement("img", { src: "assets/logo-full.png", alt: "MIT", style: { height: 26, width: "auto" } }),
        React.createElement("div", { style: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-md)", color: "var(--color-primary)" } }, "Unified District OS")),
      React.createElement("div", { style: { padding: "0 12px 10px" } },
        React.createElement("button", { onClick: newChat, style: { display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "10px 12px", borderRadius: "var(--radius-md)", border: "1px solid var(--purple-200)", background: "var(--surface-card)", color: "var(--purple-700)", fontWeight: 700, fontSize: "var(--text-sm)", cursor: "pointer", fontFamily: "var(--font-body)" } },
          React.createElement(Icon, { name: "plus", size: 16 }), isES ? "Nueva conversación" : "New chat")),
      React.createElement("div", { style: { display: "flex", gap: 4, padding: "2px 12px 8px" } },
        [["chats", isES ? "Conversaciones" : "Chat history", "message"], ["alerts", isES ? "Alertas" : "Alerts", "bell"]].map(([id, lb, ic]) => React.createElement("button", { key: id, onClick: () => setNavTab(id), style: { flex: 1, padding: "7px 8px", borderRadius: "var(--radius-md)", border: "none", background: navTab === id ? "var(--surface-card)" : "transparent", boxShadow: navTab === id ? "var(--shadow-xs)" : "none", color: navTab === id ? "var(--color-primary)" : "var(--text-muted)", fontSize: "var(--text-xs)", fontWeight: 700, cursor: "pointer", fontFamily: "var(--font-body)", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6 } },
          React.createElement(Icon, { name: ic, size: 13 }), lb,
          id === "alerts" && alerts && alerts.length > 0 && React.createElement("span", { style: { fontFamily: "var(--font-data)", fontSize: 10, fontWeight: 800, background: "var(--gold-100)", color: "var(--gold-700)", borderRadius: "var(--radius-full)", minWidth: 15, height: 15, padding: "0 4px", display: "grid", placeItems: "center" } }, alerts.length)))),
      React.createElement("div", { style: { flex: 1, overflowY: "auto", padding: "2px 8px 8px" } },
        navTab === "chats"
          ? ((!chats || chats.length === 0)
              ? React.createElement("div", { style: { padding: "12px 8px", fontSize: "var(--text-xs)", color: "var(--text-muted)", lineHeight: 1.5 } }, isES ? "Sus conversaciones aparecerán aquí." : "Your conversations will appear here.")
              : chats.map((c) => React.createElement("button", { key: c.id, onClick: () => loadChat(c), style: { display: "flex", alignItems: "center", gap: 9, width: "100%", textAlign: "left", padding: "9px 10px", marginBottom: 2, borderRadius: "var(--radius-md)", border: "none", background: activeId === c.id ? "var(--purple-100)" : "transparent", cursor: "pointer", fontFamily: "var(--font-body)" }, onMouseEnter: (e) => { if (activeId !== c.id) e.currentTarget.style.background = "var(--purple-100)"; }, onMouseLeave: (e) => { if (activeId !== c.id) e.currentTarget.style.background = "transparent"; } },
                  React.createElement(Icon, { name: "message", size: 14, style: { color: "var(--text-subtle)", flexShrink: 0 } }),
                  React.createElement("span", { style: { flex: 1, minWidth: 0, fontSize: "var(--text-sm)", fontWeight: 500, color: "var(--text-body)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, c.q))))
          : ((!alerts || alerts.length === 0)
              ? React.createElement("div", { style: { padding: "12px 8px", fontSize: "var(--text-xs)", color: "var(--text-muted)", lineHeight: 1.5 } }, isES ? "Lo que resuelva aparecerá aquí." : "Items you handle show up here.")
              : alerts.map((h) => React.createElement(HistoryRow, { key: h.id, item: h, isES, onClick: () => {} })))),
      navTab === "chats" && chats && chats.length > 0 && React.createElement("div", { style: { padding: "8px 14px" } },
        React.createElement("button", { onClick: onClearChats, style: { ...linkBtn, color: "var(--text-muted)", fontSize: "var(--text-xs)" } }, React.createElement(Icon, { name: "trash", size: 13 }), isES ? "Borrar conversaciones" : "Clear conversations")),
      sidebarFooter && React.createElement("div", { style: { borderTop: "1px solid var(--border-subtle)", padding: 12 } }, sidebarFooter),
    );

    /* the thread / empty home (chat hero + merged triage briefing) */
    const home = React.createElement("div", { style: { width: "100%", maxWidth: COL, margin: "0 auto", paddingTop: "6vh" } },
      React.createElement("div", { style: { textAlign: "center" } },
        React.createElement("h1", { style: { fontFamily: "var(--font-display)", fontSize: "var(--text-3xl)", margin: "18px 0 6px", letterSpacing: "var(--tracking-tight)" } }, isES ? `Hola, ${U.shortName(r.name)}` : `${cfgGreeting(role)}, ${U.shortName(r.name)}`),
        React.createElement("p", { style: { margin: "0 0 26px", color: "var(--text-muted)", fontSize: "var(--text-md)" } }, isES ? "Pregúnteme sobre cualquier estudiante, escuela o tendencia. Cada respuesta cita sus fuentes." : "Ask about any student, school, or trend. Every answer cites its sources.")),
      React.createElement("div", { style: { padding: "0 16px 18px" } }, React.createElement(ChatComposer, { value: input, onChange: setInput, onSend: () => askFree(), isES, autoFocus: true })),
      React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, padding: "0 16px" } },
        prompts.slice(0, 4).map((p, i) => React.createElement("button", { key: i, onClick: () => ask(i), style: { textAlign: "left", padding: "13px 15px", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-default)", background: "var(--surface-card)", color: "var(--text-body)", fontSize: "var(--text-sm)", fontWeight: 500, lineHeight: 1.4, cursor: "pointer", fontFamily: "var(--font-body)", boxShadow: "var(--shadow-xs)" }, onMouseEnter: (e) => { e.currentTarget.style.borderColor = "var(--purple-300)"; e.currentTarget.style.background = "var(--purple-50)"; }, onMouseLeave: (e) => { e.currentTarget.style.borderColor = "var(--border-default)"; e.currentTarget.style.background = "var(--surface-card)"; } },
          React.createElement(Icon, { name: "sparkle", size: 15, style: { color: "var(--color-accent)", marginBottom: 7, display: "block" } }), p))),
      briefing && React.createElement("div", { style: { margin: "38px 16px 40px", paddingTop: 30, borderTop: "1px solid var(--border-subtle)" } }, briefing),
    );

    const conversation = React.createElement("div", { style: { width: "100%", maxWidth: COL, margin: "0 auto", padding: "28px 16px 16px", display: "flex", flexDirection: "column", gap: 26 } },
      thread.map((m, i) => m.who === "user"
        ? React.createElement("div", { key: i, style: { display: "flex", justifyContent: "flex-end" } },
            React.createElement("div", { style: { background: "var(--purple-50)", border: "1px solid var(--purple-100)", color: "var(--text-body)", padding: "12px 16px", borderRadius: "18px 18px 4px 18px", fontSize: "var(--text-md)", lineHeight: 1.5, maxWidth: "80%" } }, m.text))
        : React.createElement("div", { key: i, style: { display: "flex", gap: 13, alignItems: "flex-start" } },
            brainAvatar(32),
            React.createElement("div", { style: { flex: 1, minWidth: 0, paddingTop: 3 } },
              React.createElement("div", { style: { fontSize: "var(--text-xs)", fontWeight: 800, color: "var(--text-subtle)", marginBottom: 7, letterSpacing: "0.02em" } }, isES ? "El Cerebro" : "The Brain"),
              React.createElement(U._AssistantAnswer, { ans: m.ans, onAction: () => {} })))),
      busy && React.createElement("div", { style: { display: "flex", gap: 13, alignItems: "center" } }, brainAvatar(32),
        React.createElement("div", { style: { display: "flex", gap: 5, padding: "8px 0" } }, [0,1,2].map((d) => React.createElement("span", { key: d, style: { width: 8, height: 8, borderRadius: "50%", background: "var(--purple-300)", animation: "rp-blink 1s infinite", animationDelay: d * .16 + "s" } })))),
      React.createElement("div", { style: { display: "flex", justifyContent: "center", paddingTop: 4 } },
        React.createElement("button", { onClick: newChat, style: { ...linkBtn, color: "var(--text-muted)" } }, React.createElement(Icon, { name: "plus", size: 14 }), isES ? "Nueva conversación" : "New chat")),
    );

    return React.createElement("div", { style: { height: "100vh", display: "flex", background: "var(--surface-page, #fff)", color: "var(--text-body)" } },
      React.createElement("div", { className: "rp-hide-sm", style: { height: "100%" } }, sidebar),
      React.createElement("div", { style: { flex: 1, display: "flex", flexDirection: "column", minWidth: 0, background: "var(--surface-page, #fff)" } },
        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, padding: "12px 18px", borderBottom: "1px solid var(--border-subtle)", flexShrink: 0 } },
          React.createElement("div", { style: { display: "flex", flexDirection: "column", lineHeight: 1.2, flexShrink: 0 } },
            React.createElement("span", { style: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-md)", color: "var(--color-primary)", whiteSpace: "nowrap" } }, isES ? "Pregunte al cerebro" : "Ask the brain"),
            React.createElement("span", { style: { fontSize: "var(--text-2xs)", color: "var(--text-muted)", fontWeight: 600 } }, r.title)),
          React.createElement("div", { style: { marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" } }, topRight)),
        React.createElement("div", { ref: scrollRef, style: { flex: 1, overflowY: "auto" } }, empty ? home : conversation),
        !empty && React.createElement("div", { style: { flexShrink: 0, padding: "12px 16px 18px", borderTop: "1px solid var(--border-subtle)", background: "var(--surface-page, #fff)" } },
          React.createElement("div", { style: { maxWidth: COL, margin: "0 auto" } },
            React.createElement(ChatComposer, { value: input, onChange: setInput, onSend: () => askFree(), isES }),
            React.createElement("div", { style: { textAlign: "center", fontSize: "var(--text-2xs)", color: "var(--text-subtle)", marginTop: 8 } }, isES ? "El cerebro cita fuentes de Synergy, Google Classroom y más." : "The brain cites sources from Synergy, Google Classroom & more."))),
      ),
    );
  }
  function cfgGreeting(role) { const h = new Date().getHours(); return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening"; }

  /* ---- Role menu ---- */
  function RoleMenu({ role, onRole, light, block }) {
    const [open, setOpen] = useState(false);
    const r = RP.roleById[role];
    const btnStyle = light
      ? { display: "flex", width: block ? "100%" : "auto", alignItems: "center", gap: 9, height: 44, padding: "0 10px 0 6px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-default)", background: "var(--surface-card)", color: "var(--text-body)", cursor: "pointer", fontFamily: "var(--font-body)" }
      : { display: "inline-flex", alignItems: "center", gap: 8, height: 38, padding: "0 6px 0 4px", borderRadius: "var(--radius-full)", border: "1px solid rgba(255,255,255,.25)", background: "rgba(255,255,255,.1)", color: "#fff", cursor: "pointer" };
    return React.createElement("div", { style: { position: "relative", width: block ? "100%" : "auto" } },
      React.createElement("button", { onClick: () => setOpen(!open), style: btnStyle },
        React.createElement(DS.Avatar, { name: U.shortName(r.name), size: "sm", ring: !light }),
        React.createElement("div", { style: { textAlign: "left", lineHeight: 1.15, flex: block ? 1 : "none" } },
          React.createElement("div", { style: { fontSize: "var(--text-xs)", fontWeight: 700 } }, r.title),
          light && React.createElement("div", { style: { fontSize: "var(--text-2xs)", color: "var(--text-muted)", fontWeight: 600 } }, U.shortName(r.name))),
        React.createElement(Icon, { name: "chevronDown", size: 14, style: { opacity: .7 } })),
      open && React.createElement("div", { style: { position: "absolute", bottom: light ? 50 : "auto", top: light ? "auto" : 46, right: 0, left: light ? 0 : "auto", width: 250, background: "var(--surface-card)", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-xl)", overflow: "hidden", zIndex: 40, border: "1px solid var(--border-subtle)" } },
        RP.roles.map((x) => React.createElement("button", { key: x.id, onClick: () => { setOpen(false); onRole(x.id); }, style: { display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "9px 12px", border: "none", borderBottom: "1px solid var(--border-subtle)", background: x.id === role ? "var(--purple-50)" : "transparent", cursor: "pointer", textAlign: "left", fontFamily: "var(--font-body)" } },
          React.createElement(DS.Avatar, { name: U.shortName(x.name), size: "xs" }),
          React.createElement("div", null, React.createElement("div", { style: { fontSize: "var(--text-sm)", fontWeight: 600 } }, x.title), React.createElement("div", { style: { fontSize: "var(--text-2xs)", color: "var(--text-muted)" } }, U.shortName(x.name)))))),
    );
  }

  /* ---- Always-visible snapshot strip (role KPIs) ---- */
  const SNAPSHOT = {
    superintendent: [["Enrollment", "3,000"], ["Attendance", "93.4%", "warning"], ["On-track grad", "88%", "success"], ["Chronic absent", "14%", "warning"]],
    principal: [["Attendance today", "90.6%", "warning"], ["Enrollment", "1,180"], ["On-track grad", "86%", "warning"], ["Referrals", "↓ 8%", "success"]],
    teacher: [["2nd pd attend.", "91%"], ["To grade", "12", "warning"], ["Avg mastery", "78%"], ["Need help", "3", "danger"]],
    counselor: [["Caseload", "184"], ["Off-track", "7", "danger"], ["Wellness flags", "5", "warning"], ["College apps", "23", "success"]],
    admin: [["Absent now", "12", "warning"], ["Follow-ups", "5", "danger"], ["Tours this wk", "4"], ["New inquiries", "9", "success"]],
    sped: [["Caseload", "28"], ["Reviews due", "3", "warning"], ["Goals on track", "81%", "success"], ["Compliance", "96%", "success"]],
    student: [["Algebra I", "71%", "warning"], ["Due soon", "2"], ["Streak", "4 days", "success"], ["Goals", "3"]],
    parent: [["Asistencia", "82%", "warning"], ["Promedio", "B-"], ["Faltas (mes)", "4", "warning"], ["Mensajes", "1"]],
    parentEN: [["Attendance", "82%", "warning"], ["Avg grade", "B-"], ["Absences (mo)", "4", "warning"], ["Messages", "1"]],
  };
  function Snapshot({ role, isES, onOpen }) {
    const stats = (role === "parent" && !isES) ? SNAPSHOT.parentEN : (SNAPSHOT[role] || SNAPSHOT.superintendent);
    const target = (RP.nav[role] || []).filter((n) => n.id !== "brain")[0].id;
    return React.createElement("div", { style: { display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 18 } },
      stats.map((s, i) => { const t = s[2] ? U.STATUS[s[2]] : null; return React.createElement("button", { key: i, onClick: () => onOpen(target), title: isES ? "Abrir tablero" : "Open the board", style: { display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 1, padding: "8px 14px", borderRadius: "var(--radius-md)", border: "1px solid rgba(255,255,255,.16)", background: "rgba(255,255,255,.08)", cursor: "pointer", minWidth: 92, fontFamily: "var(--font-body)" } },
        React.createElement("span", { style: { fontFamily: "var(--font-data)", fontWeight: 800, fontSize: "var(--text-lg)", color: t ? "#fff" : "#fff" } }, s[1]),
        React.createElement("span", { style: { fontSize: "var(--text-2xs)", color: "rgba(255,255,255,.7)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" } }, s[0])); }),
    );
  }

  /* ============================================================ */
  function App() {
    const [role, setRole] = useState("superintendent");
    const [lang, setLang] = useState("en");
    const [idx, setIdx] = useState(0);
    const [composer, setComposer] = useState(null);
    const [report, setReport] = useState(false);
    const [receipt, setReceipt] = useState(null);
    const [drawer, setDrawer] = useState(null);
    const [present, setPresent] = useState(false);
    const [askOpen, setAskOpen] = useState(false);
    const [askSeed, setAskSeed] = useState(null);
    const [explore, setExplore] = useState(false);
    const [section, setSection] = useState("overview");
    const [palette, setPalette] = useState(false);
    const [toasts, setToasts] = useState([]);
    const [injected, setInjected] = useState({});
    const [askReplay, setAskReplay] = useState(null);
    const [askInitial, setAskInitial] = useState(null);
    const [historyOpen, setHistoryOpen] = useState(false);
    const [history, setHistory] = useState(() => { try { return JSON.parse(localStorage.getItem("rp-pulse-history") || "[]"); } catch (e) { return []; } });
    useEffect(() => { try { localStorage.setItem("rp-pulse-history", JSON.stringify(history.slice(0, 100))); } catch (e) {} }, [history]);
    function logHistory(item) { setHistory((h) => [{ id: Math.random().toString(36).slice(2), ts: Date.now(), role, ...item }, ...h]); }

    const isES = role === "parent" && lang === "es";
    const cfg = RP.brain[role] || RP.brain.superintendent;
    const acfg = RP.assistant[role] || RP.assistant.superintendent;
    const answers = isES && acfg.answersES ? acfg.answersES : acfg.answers;
    const baseQueue = (isES && RP.alertsES.parent) ? RP.alertsES.parent : (RP.alerts[role] || []);
    const inj = (injected[role] || []).map((c) => (isES && c.es) ? { ...c, headline: c.es.headline, why: c.es.why, ago: c.es.ago || c.ago } : c);
    const queue = [...inj, ...baseQueue];
    const counts = (() => { let urgent = 0, review = 0, wins = 0; queue.forEach((a) => { if (a.kind === "win") wins++; else if (a.severity === "danger") urgent++; else review++; }); return { urgent, review, wins }; })();
    const title = isES ? cfg.title : (cfg.titleEn || cfg.title);
    const roleHistory = history.filter((h) => h.role === role);
    const handledToday = roleHistory.filter((h) => h.kind === "handled" && (Date.now() - h.ts) < 86400000).length;
    function brainAnswer(q) {
      const ps = isES && acfg.promptsES ? acfg.promptsES : acfg.prompts;
      const as = isES && acfg.answersES ? acfg.answersES : acfg.answers;
      const ql = q.toLowerCase(); let best = -1, bs = 0;
      ps.forEach((p, i) => { let s = 0; p.toLowerCase().split(/\W+/).filter((w) => w.length > 3).forEach((w) => { if (ql.includes(w)) s++; }); if (s > bs) { bs = s; best = i; } });
      return bs > 0 ? as[best] : { paragraphs: [isES ? "Buena pregunta. Todavía no tengo datos en vivo conectados para responder eso con precisión — pero puedo enrutarlo a la persona indicada o abrir el tablero relacionado." : "Good question. I don't have live data wired for that exact ask yet — but I can route it to the right person or open the related board for you."], chips: [isES ? "Enrutado al equipo de datos" : "Routed to the data team"] };
    }
    function askText(q) { const ans = brainAnswer(q); setAskReplay({ q, ans }); setAskInitial(null); setAskSeed(null); setAskOpen(true); logHistory({ kind: "chat", q, ans }); }
    function openChat(item) { setHistoryOpen(false); setAskSeed(null); setAskInitial(null); setAskReplay({ q: item.q, ans: item.ans }); setAskOpen(true); }

    useEffect(() => { setIdx(0); const nav = (RP.nav[role] || []).filter((n) => n.id !== "brain"); setSection(nav[0] && nav[0].id); }, [role, lang]);
    useEffect(() => {
      const h = (e) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setPalette(true); } if (e.key === "Escape") { setPalette(false); } };
      window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
    }, []);
    function toast(message, t = "success", action) { const id = Math.random().toString(36).slice(2); setToasts((x) => [...x, { id, message, tone: t, action }]); setTimeout(() => setToasts((x) => x.filter((y) => y.id !== id)), action ? 6000 : 3400); }
    function inject(target, card) { setInjected((p) => ({ ...p, [target]: [{ ...card, _injected: true }, ...(p[target] || []).filter((x) => x.id !== card.id)] })); }
    function injectParentMessage(fromRole) {
      const r = RP.roleById[fromRole] || {};
      const place = (r.school || "").includes("Maricopa") ? "MIT front office" : (r.school || "the school");
      inject("parent", { id: "x-msg", severity: "info", kind: "alert", ago: "just now",
        headline: "New message from " + place + " — " + U.shortName(r.name || "the school"),
        why: "They reached out about Diego. The message arrived in your preferred language, auto-translated.",
        actions: ["Read & reply"], student: "diego",
        es: { headline: "Nuevo mensaje de " + place.replace("front office", "oficina") + " — " + U.shortName(r.name || "la escuela"), why: "Se comunicaron sobre Diego. El mensaje llegó en su idioma preferido, traducido automáticamente.", ago: "ahora" } });
    }
    function openSection(id) { setSection(id); setExplore(true); }
    /* full app object so the original role views mount unchanged inside Explore */
    const app = {
      role, lang, active: section, setActive: setSection, childId: "diego", setChildId: () => {},
      openAssistant: (i) => { setExplore(false); setAskSeed(null); if (i != null) { setAskReplay({ q: (isES && acfg.promptsES ? acfg.promptsES : acfg.prompts)[i], ans: answers[i] }); } },
      openStudent: (id) => setDrawer(id),
      openComposer: (key) => setComposer(key || (role === "parent" ? "parent-to-counselor" : "compose-diego")),
      openReport: () => setReport(true),
      openPresent: () => setPresent(true),
      openReceipt: (kind) => setReceipt(kind),
      go: (id) => openSection(id),
      toast,
    };
    /* which Explore board a triage card drills into */
    const BOARD = { superintendent: { a1: "attendance", a2: "operations" }, principal: { default: "attendance" }, teacher: { default: "students" }, counselor: { default: "graduation" }, admin: { default: "attendance" }, sped: { default: "compliance" }, student: { default: "progress" }, parent: { default: "child" } };
    function boardFor(alert) { const m = BOARD[role] || {}; return m[alert && alert.id] || m.default || (RP.nav[role] || []).filter((n) => n.id !== "brain")[0].id; }
    function act(label, alert) {
      const l = (label || "").toLowerCase();
      // ----- navigation into the full boards -----
      if (l.includes("operations")) { openSection("operations"); return; }
      if (l.includes("cohort") || l.includes("view mit") || l.includes("view class") || l.includes("drill")) { openSection(role === "superintendent" ? "overview" : (RP.nav[role] || []).filter((n) => n.id !== "brain")[0].id); return; }
      if (l.includes("see list") || l.includes("see inquiries") || l.includes("review list") || l.includes("open call list") || l.includes("see trend") || l.includes("see breakdown") || l.includes("see goals") || l.includes("review notes") || l.includes("see progress") || l.includes("ver progreso") || l.includes("see what")) { openSection(boardFor(alert)); return; }
      // ----- superintendent → principal handoff (cross-role) -----
      if (l.includes("principal bell") || (role === "superintendent" && l.includes("notify"))) {
        inject("principal", { id: "x-supt", severity: "warning", kind: "alert", ago: "just now", headline: "Flagged by Dr. Romero — MIT 9th-grade absenteeism", why: "The superintendent asked you to dig into the 9th-grade attendance cluster and report back this week.", actions: ["View cohort", "Reply to Dr. Romero"] });
        setReceipt("route"); toast("Sent to Principal Bell — appears in his Pulse", "brand"); return;
      }
      // ----- reports / packets / drafts -----
      if (l.includes("report") || l.includes("board") || l.includes("packet") || l.includes("draft") || l.includes("resumen") || l.includes("informe") || l.includes("summaries")) { if (l.includes("route") || l.includes("send")) setReceipt("route"); else setReport(true); return; }
      if (l.includes("phone") || l.includes("teléfono") || l.includes("telefono")) { setReceipt("phone"); return; }
      // ----- scheduling -----
      if (l.includes("schedule") || l.includes("meeting") || l.includes("check-in") || l.includes("reunión") || l.includes("reunion") || l.includes("calendar") || l.includes("reschedule")) { setReceipt("meeting"); if (alert && alert.student === "diego" && role !== "parent") injectParentMessage(role); return; }
      if (l.includes("call") || l.includes("llamar") || l.includes("listen")) { setReceipt("call"); return; }
      // ----- approvals -----
      if (l.includes("approve") || l.includes("pre-register") || l.includes("aprobar")) { if (alert) logHistory({ kind: "handled", headline: alert.headline, status: "approved" }); toast(isES ? "Aprobado y registrado" : "Approved — logged", "success", { label: isES ? "Deshacer" : "Undo", onClick: () => {} }); advance(); return; }
      // ----- messaging families → cross-role inject to the parent -----
      if (l.includes("text") || l.includes("message") || l.includes("mensaje") || l.includes("outreach") || l.includes("remind famil") || l.includes("notify family") || l.includes("send reminder") || l.includes("parent") || l.includes("loop") || l.includes("read & reply") || l.includes("reply") || l.includes("enviar mensaje")) {
        if (role !== "parent") injectParentMessage(role);
        setComposer(role === "parent" ? "parent-to-counselor" : "compose-diego"); return;
      }
      // ----- view a student / board -----
      if (l.startsWith("view") && alert && alert.student) { setDrawer(alert.student); return; }
      if (l.startsWith("view")) { openSection(boardFor(alert)); return; }
      // ----- generative artifacts (brain drafts) -----
      if (l.includes("generate") || l.includes("prep document") || l.includes("plan") || l.includes("request transcript") || l.includes("send packet") || l.includes("start application") || l.includes("feedback")) { toast(isES ? "Redactado por el cerebro — listo para revisar" : "Drafted by the brain — ready for your review", "brand"); return; }
      if (l.includes("sign") || l.includes("firmar")) { if (alert) logHistory({ kind: "handled", headline: alert.headline, status: "signed" }); toast(isES ? "Firmado y enviado" : "Signed & returned", "success", { label: isES ? "Deshacer" : "Undo", onClick: () => {} }); advance(); return; }
      if (l.includes("ask a question") || l.includes("preguntar")) { const ps = isES && acfg.promptsES ? acfg.promptsES : acfg.prompts; setAskSeed(null); setAskReplay({ q: ps[0], ans: answers[0] }); return; }
      if (l.includes("recognition") || l.includes("congratulate") || l.includes("share") || l.includes("keep it going") || l.includes("start practice") || l.includes("start now") || l.includes("offer support") || l.includes("flag provider") || l.includes("email vendor") || l.includes("ask finance") || l.includes("find another") || l.includes("support tips") || l.includes("consejos")) { toast(isES ? "Listo" : "Done", "success"); return; }
      if (alert && alert.student) { setDrawer(alert.student); return; }
      toast(isES ? "Hecho" : "Done");
    }
    const advance = () => setIdx((i) => i + 1);
    const resolveCard = () => { const card = queue[idx]; if (card) logHistory({ kind: "handled", headline: card.headline, status: "done" }); setIdx((i) => { const prev = i; setTimeout(() => toast(isES ? "Resuelto" : "Marked done", "success", { label: isES ? "Deshacer" : "Undo", onClick: () => setIdx(prev) }), 0); return i + 1; }); };
    const snoozeCard = () => { const card = queue[idx]; if (card) logHistory({ kind: "handled", headline: card.headline, status: "snoozed" }); toast(isES ? "Pospuesto · vuelve esta tarde" : "Snoozed — back this afternoon", "info"); advance(); };
    const lightBtn = { display: "inline-flex", alignItems: "center", gap: 7, height: 34, padding: "0 12px", borderRadius: "var(--radius-full)", border: "1px solid var(--border-default)", background: "var(--surface-card)", color: "var(--text-body)", fontSize: "var(--text-xs)", fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-body)" };

    /* chrome controls (top-right of the chat) */
    const topRight = React.createElement(React.Fragment, null,
      React.createElement("button", { onClick: () => setPalette(true), style: lightBtn },
        React.createElement(Icon, { name: "search", size: 14 }), isES ? "Buscar" : "Search", React.createElement("kbd", { style: { fontFamily: "var(--font-data)", fontSize: 10, background: "var(--neutral-100)", borderRadius: 4, padding: "1px 5px", color: "var(--text-muted)" } }, "\u2318K")),
      React.createElement(DS.Button, { variant: "outline", size: "sm", iconLeft: React.createElement(Icon, { name: "grid", size: 15 }), onClick: () => setExplore(true) }, isES ? "Explorar la plataforma" : "Explore the platform"),
      role === "parent" && React.createElement("button", { onClick: () => setLang(lang === "es" ? "en" : "es"), style: { ...lightBtn, fontWeight: 700 } }, RP.t[lang].switchLang));

    /* the triage queue, merged into the chat home */
    const briefing = React.createElement(TriageBriefing, { queue, idx, setIdx, role, isES, answers, counts, handledToday, onAction: act, onResolve: resolveCard, onSnooze: snoozeCard, boardFor, openSection });

    /* sidebar footer — live pulse, Explore, role switcher */
    const sidebarFooter = React.createElement(RoleMenu, { role, light: true, block: true, onRole: (id) => { setRole(id); setLang(id === "parent" ? "es" : "en"); } });

    return React.createElement(React.Fragment, null,
      React.createElement(BrainHome, { role, isES, seed: askSeed, replay: askReplay, initialQuestion: askInitial, onLog: (q, ans) => logHistory({ kind: "chat", q, ans }), chats: roleHistory.filter((h) => h.kind === "chat"), alerts: roleHistory.filter((h) => h.kind === "handled"), onClearChats: () => setHistory((h) => h.filter((x) => !(x.role === role && x.kind === "chat"))), topRight, briefing, sidebarFooter }),
      /* Explore — the full platform on demand */
      React.createElement(window.PulseExplore.ExploreOverlay, { open: explore, onClose: () => setExplore(false), role, lang, setLang, section, setSection, app }),
      React.createElement(window.PulseExplore.CmdPalette, { open: palette, onClose: () => setPalette(false), role, onAsk: (q, i) => { if (i != null) { setAskSeed(null); setAskReplay({ q: (isES && acfg.promptsES ? acfg.promptsES : acfg.prompts)[i], ans: answers[i] }); } else if (q) { askText(q); } setPalette(false); }, onStudent: (id) => setDrawer(id), onOpenSection: openSection }),
      /* modals */
      React.createElement(HistoryPanel, { open: historyOpen, onClose: () => setHistoryOpen(false), history: roleHistory, isES, onOpenItem: openChat, onClear: () => setHistory((h) => h.filter((x) => x.role !== role)) }),
      React.createElement(HistoryPanel, { open: historyOpen, onClose: () => setHistoryOpen(false), history: roleHistory, isES, onOpenItem: openChat, onClear: () => setHistory((h) => h.filter((x) => x.role !== role)) }),
      React.createElement(U.MessageComposer, { open: !!composer, onClose: () => setComposer(null), presetKey: composer, lang, toast }),
      React.createElement(U.ReportPreview, { open: report, onClose: () => setReport(false), onPresent: () => { setReport(false); setPresent(true); } }),
      React.createElement(U.ActionReceipt, { kind: receipt, onClose: () => setReceipt(null) }),
      React.createElement(U.StudentDrawer, { open: !!drawer, onClose: () => setDrawer(null), studentId: drawer, role, onAction: (a) => { if (a === "compose-diego") setComposer("compose-diego"); }, toast }),
      React.createElement(U.PresentMode, { open: present, onClose: () => setPresent(false) }),
      React.createElement(U.ToastStack, { toasts, onDismiss: (id) => setToasts((t) => t.filter((x) => x.id !== id)) }),
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));
})();
