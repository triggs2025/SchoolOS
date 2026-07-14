/* ============================================================
   Riverside Platform — shared UX building blocks (wave 2)
   ToastStack · PresentMode · Scheduler · SegmentBar · Signature
   · MiniCalendar · ConfirmRow · FollowupChips
   ============================================================ */
(function () {
  const { useState } = React;
  const DS = window.MITSTEMDesignSystem_177606;
  const Icon = window.RPIcon;
  const RPUI = window.RPUI;
  const RP = window.RP;

  /* ---- Toasts (bottom-right) ---- */
  function ToastStack({ toasts, onDismiss }) {
    const tones = {
      success: { bg: "var(--status-success-bg)", fg: "var(--status-success-fg)", icon: "check" },
      info: { bg: "var(--status-info-bg)", fg: "var(--status-info-fg)", icon: "info" },
      warning: { bg: "var(--status-warning-bg)", fg: "var(--status-warning-fg)", icon: "alert" },
      brand: { bg: "var(--purple-50)", fg: "var(--purple-700)", icon: "sparkle" },
    };
    return React.createElement("div", { style: { position: "fixed", right: 20, bottom: 20, zIndex: 90, display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end", pointerEvents: "none" } },
      toasts.map((t) => {
        const tn = tones[t.tone] || tones.success;
        return React.createElement("div", { key: t.id, onClick: () => onDismiss(t.id), style: {
          pointerEvents: "auto", cursor: "pointer", display: "flex", alignItems: "center", gap: 10,
          padding: "12px 16px", borderRadius: "var(--radius-md)", background: "var(--surface-card)",
          border: "1px solid var(--border-subtle)", borderLeft: `3px solid ${tn.fg}`, boxShadow: "var(--shadow-lg)",
          maxWidth: 380, animation: "rp-toast-in .28s var(--ease-out)",
        } },
          React.createElement("span", { style: { width: 26, height: 26, borderRadius: "50%", background: tn.bg, color: tn.fg, display: "grid", placeItems: "center", flexShrink: 0 } }, React.createElement(Icon, { name: tn.icon, size: 15 })),
          React.createElement("span", { style: { fontSize: "var(--text-sm)", color: "var(--text-body)", fontWeight: 600, lineHeight: 1.4 } }, t.message),
          t.action && React.createElement("button", { onClick: (e) => { e.stopPropagation(); t.action.onClick(); onDismiss(t.id); }, style: { marginLeft: 4, background: "none", border: "none", cursor: "pointer", color: "var(--text-link)", fontWeight: 800, fontSize: "var(--text-sm)", fontFamily: "var(--font-body)", textDecoration: "underline", flexShrink: 0 } }, t.action.label),
        );
      }),
    );
  }
  RPUI.ToastStack = ToastStack;

  /* ---- Board present mode (fullscreen slide of the report) ---- */
  function PresentMode({ open, onClose }) {
    const [slide, setSlide] = useState(0);
    const d = RP.district;
    const slides = [
      { kind: "title" },
      { kind: "kpi" },
      { kind: "focus", title: "MIT 9th-Grade Attendance", body: "Chronic absenteeism rose 14% → 17% this quarter, concentrated in a cluster of ~6 students. Counselor outreach and a 9th-grade attendance push are underway; 2 families contacted in Spanish.", chart: true },
      { kind: "focus", title: "What's Working", body: "Kings Ridge on-track-to-graduate rose to 90%. AP enrollment at MIT up 11% YoY. District climate index holds at 7.6/10. All family communications now auto-translate.", chart: false },
      { kind: "close" },
    ];
    React.useEffect(() => { if (open) setSlide(0); }, [open]);
    React.useEffect(() => {
      if (!open) return;
      const h = (e) => { if (e.key === "ArrowRight") setSlide((s) => Math.min(slides.length - 1, s + 1)); if (e.key === "ArrowLeft") setSlide((s) => Math.max(0, s - 1)); if (e.key === "Escape") onClose(); };
      window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
    }, [open]);
    if (!open) return null;
    const s = slides[slide];
    return React.createElement("div", { style: { position: "fixed", inset: 0, zIndex: 95, background: "var(--surface-brand)", color: "#fff", display: "flex", flexDirection: "column" } },
      React.createElement("div", { style: { position: "absolute", top: 18, right: 18, display: "flex", gap: 8, alignItems: "center" } },
        React.createElement("span", { style: { fontSize: "var(--text-xs)", color: "var(--gold-300)", fontFamily: "var(--font-data)" } }, (slide + 1) + " / " + slides.length),
        React.createElement("button", { onClick: onClose, "aria-label": "Exit", style: { width: 34, height: 34, display: "grid", placeItems: "center", borderRadius: "var(--radius-md)", border: "1px solid rgba(255,255,255,.25)", background: "rgba(255,255,255,.1)", color: "#fff", cursor: "pointer" } }, React.createElement(Icon, { name: "x", size: 18 }))),
      React.createElement("div", { style: { flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 max(8vw, 64px)", maxWidth: 1100, margin: "0 auto", width: "100%" } },
        s.kind === "title" && React.createElement("div", null,
          React.createElement("img", { src: "assets/eagle-white.png", style: { height: 92 }, alt: "" }),
          React.createElement("div", { style: { fontSize: "var(--text-sm)", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold-300)", fontWeight: 700, marginTop: 28 } }, "Riverside Unified · Board Meeting"),
          React.createElement("h1", { style: { fontSize: "var(--text-6xl)", color: "#fff", margin: "12px 0 0", letterSpacing: "-0.02em" } }, "June 2026 Summary"),
          React.createElement("div", { style: { width: 90, height: 4, background: "var(--color-accent)", margin: "26px 0" } }),
          React.createElement("p", { style: { fontSize: "var(--text-xl)", color: "rgba(255,255,255,.85)", maxWidth: 720, lineHeight: 1.5 } }, "Attendance, academics, climate, and operations — assembled from live district data.")),
        s.kind === "kpi" && React.createElement("div", null,
          React.createElement("div", { className: "mit-eyebrow", style: { color: "var(--gold-300)" } }, "District at a glance"),
          React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 28, marginTop: 36 } },
            [["Enrollment", d.students.toLocaleString()], ["Attendance", d.attendance + "%"], ["Chronic absent.", d.chronicAbsenteeism + "%"], ["On-track grad.", d.onTrackGrad + "%"]].map((k, i) =>
              React.createElement("div", { key: i },
                React.createElement("div", { style: { fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "var(--text-6xl)", lineHeight: 1, color: "#fff" } }, k[1]),
                React.createElement("div", { style: { fontSize: "var(--text-sm)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, color: "var(--gold-300)", marginTop: 12 } }, k[0]))))),
        s.kind === "focus" && React.createElement("div", null,
          React.createElement("div", { className: "mit-eyebrow", style: { color: "var(--gold-300)" } }, "Focus"),
          React.createElement("h2", { style: { fontSize: "var(--text-5xl)", color: "#fff", margin: "10px 0 24px" } }, s.title),
          s.chart && React.createElement("div", { style: { background: "rgba(255,255,255,.08)", borderRadius: "var(--radius-lg)", padding: 22, marginBottom: 24, maxWidth: 560 } },
            React.createElement(RPUI.CompareBars, { unit: "%", baseline: { label: "District", value: 14 }, series: [{ label: "MIT", value: 17, tone: "danger" }, { label: "Kings Ridge", value: 12, tone: "brand" }, { label: "Riverside Trad.", value: 11, tone: "brand" }], w: 500 })),
          React.createElement("p", { style: { fontSize: "var(--text-xl)", color: "rgba(255,255,255,.88)", maxWidth: 760, lineHeight: 1.6 } }, s.body)),
        s.kind === "close" && React.createElement("div", { style: { textAlign: "center", width: "100%" } },
          React.createElement("h2", { style: { fontSize: "var(--text-5xl)", color: "#fff", margin: 0 } }, "Questions?"),
          React.createElement("div", { style: { width: 90, height: 4, background: "var(--color-accent)", margin: "26px auto" } }),
          React.createElement("p", { style: { fontSize: "var(--text-xl)", color: "rgba(255,255,255,.85)" } }, "Dr. Alicia Romero · Superintendent, Riverside Unified")),
      ),
      React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 32px" } },
        React.createElement("button", { onClick: () => setSlide((x) => Math.max(0, x - 1)), disabled: slide === 0, style: navBtn(slide === 0) }, React.createElement(Icon, { name: "chevronRight", size: 18, style: { transform: "rotate(180deg)" } }), "Prev"),
        React.createElement("div", { style: { display: "flex", gap: 7 } }, slides.map((_, i) => React.createElement("span", { key: i, onClick: () => setSlide(i), style: { width: 9, height: 9, borderRadius: "50%", cursor: "pointer", background: i === slide ? "var(--color-accent)" : "rgba(255,255,255,.3)" } }))),
        React.createElement("button", { onClick: () => setSlide((x) => Math.min(slides.length - 1, x + 1)), disabled: slide === slides.length - 1, style: navBtn(slide === slides.length - 1) }, "Next", React.createElement(Icon, { name: "chevronRight", size: 18 }))),
    );
  }
  function navBtn(disabled) {
    return { display: "inline-flex", alignItems: "center", gap: 6, height: 40, padding: "0 18px", borderRadius: "var(--radius-md)", border: "1px solid rgba(255,255,255,.25)", background: "rgba(255,255,255,.1)", color: "#fff", cursor: disabled ? "default" : "pointer", opacity: disabled ? 0.4 : 1, fontWeight: 700, fontSize: "var(--text-sm)", fontFamily: "var(--font-body)" };
  }
  RPUI.PresentMode = PresentMode;

  /* ---- Segmented horizontal stat bar (e.g. caseload balance, service minutes) ---- */
  function SegmentBar({ segments, height = 14 }) {
    const total = segments.reduce((a, s) => a + s.value, 0) || 1;
    return React.createElement("div", null,
      React.createElement("div", { style: { display: "flex", height, borderRadius: "var(--radius-full)", overflow: "hidden", background: "var(--neutral-100)" } },
        segments.map((s, i) => React.createElement("div", { key: i, title: s.label + ": " + s.value, style: { width: (s.value / total * 100) + "%", background: s.color } }))),
      React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 14, marginTop: 10 } }, segments.map((s, i) => React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 6, fontSize: "var(--text-xs)", color: "var(--text-muted)" } },
        React.createElement("span", { style: { width: 10, height: 10, borderRadius: 3, background: s.color } }), s.label, " · ", React.createElement("strong", { style: { color: "var(--text-default)", fontFamily: "var(--font-data)" } }, s.value)))),
    );
  }
  RPUI.SegmentBar = SegmentBar;

  /* ---- Inline scheduler: pick a slot, confirm ---- */
  function Scheduler({ slots, who, lang, onConfirm }) {
    const es = lang === "es";
    const [picked, setPicked] = useState(null);
    const [done, setDone] = useState(false);
    if (done) return React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: "var(--radius-md)", background: "var(--status-success-bg)", color: "var(--status-success-fg)", fontSize: "var(--text-sm)", fontWeight: 600 } },
      React.createElement(Icon, { name: "check", size: 16 }), (es ? "Reunión programada · " : "Meeting scheduled · ") + picked);
    return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } },
      React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 8 } }, slots.map((sl, i) => React.createElement("button", { key: i, onClick: () => setPicked(sl), style: {
        padding: "8px 14px", borderRadius: "var(--radius-md)", cursor: "pointer", fontSize: "var(--text-sm)", fontWeight: 600, fontFamily: "var(--font-body)",
        border: "1px solid " + (picked === sl ? "var(--color-primary)" : "var(--border-default)"),
        background: picked === sl ? "var(--purple-50)" : "var(--surface-card)", color: picked === sl ? "var(--purple-700)" : "var(--text-body)",
      } }, sl))),
      React.createElement(DS.Button, { size: "sm", variant: "secondary", disabled: !picked, iconLeft: React.createElement(Icon, { name: "calendar", size: 15 }), style: { alignSelf: "flex-start" }, onClick: () => { setDone(true); onConfirm && onConfirm(picked); } }, es ? "Confirmar reunión" : "Confirm meeting"));
  }
  RPUI.Scheduler = Scheduler;

  /* ---- Signature capture (typed) ---- */
  function Signature({ label = "Parent / guardian signature", onSign }) {
    const [val, setVal] = useState("");
    const [signed, setSigned] = useState(false);
    if (signed) return React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderRadius: "var(--radius-md)", background: "var(--status-success-bg)", border: "1px solid var(--green-500)" } },
      React.createElement("div", null, React.createElement("div", { style: { fontFamily: "'Source Serif 4', serif", fontStyle: "italic", fontSize: "var(--text-xl)", color: "var(--status-success-fg)" } }, val), React.createElement("div", { style: { fontSize: "var(--text-2xs)", color: "var(--text-muted)", marginTop: 2 } }, "Signed electronically · " + new Date().toLocaleDateString())),
      React.createElement(Icon, { name: "check", size: 20, style: { color: "var(--green-500)" } }));
    return React.createElement("div", null,
      React.createElement("label", { style: { fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" } }, label),
      React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 6 } },
        React.createElement(DS.Input, { value: val, onChange: (e) => setVal(e.target.value), placeholder: "Type full name to sign" }),
        React.createElement(DS.Button, { size: "md", variant: "secondary", disabled: !val.trim(), onClick: () => { setSigned(true); onSign && onSign(val); } }, "Sign")));
  }
  RPUI.Signature = Signature;

  /* ---- Follow-up suggestion chips (assistant) ---- */
  function FollowupChips({ items, onPick }) {
    if (!items || !items.length) return null;
    return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6, marginTop: 4 } },
      React.createElement("div", { style: { fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, color: "var(--text-subtle)" } }, "Follow up"),
      items.map((f, i) => React.createElement("button", { key: i, onClick: () => onPick(f), style: {
        textAlign: "left", display: "flex", alignItems: "center", gap: 7, padding: "8px 11px", borderRadius: "var(--radius-md)",
        border: "1px dashed var(--purple-200)", background: "transparent", color: "var(--purple-700)", fontSize: "var(--text-xs)", fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-body)",
      } }, React.createElement(Icon, { name: "arrowRight", size: 13 }), f.label)));
  }
  RPUI.FollowupChips = FollowupChips;

  /* ---- Action receipt: the artifact a marquee action produces ---- */
  function ActionReceipt({ kind, onClose }) {
    if (!kind) return null;
    const specs = {
      meeting: { icon: "calendar", title: "Meeting scheduled", body: [
        ["When", "Thursday, Jul 2 · 2:00–2:30 PM"], ["With", "Principal Marcus Bell (MIT)"], ["Calendar", "Found a mutual open slot · invites sent"],
        ["Context attached", "MIT 9th-grade attendance brief + the cross-school comparison report are in the invite, so you walk in aligned."]] },
      phone: { icon: "phone", title: "Sent to your phone", body: [
        ["Pushed to", "Dr. Romero · Riverside Platform mobile"], ["Item", "MIT 9th-grade attendance flag + one-tap actions"], ["So you can", "Walk the building and act from your pocket — no laptop."]] },
      route: { icon: "send", title: "Report routed", body: [
        ["Document", "MIT 9th-Grade Attendance — June 2026"], ["Routed to", "You + Principal Bell"], ["Now in", "Principal Bell's brain, flagged for discussion"], ["Next", "Reply in-thread or open the scheduled meeting."]] },
      call: { icon: "phone", title: "Calling MIT front office", body: [
        ["Dialing", "MIT Front Office · Linda Alvarez"], ["Re", "9th-grade attendance cluster — context shared on screen"], ["Logged", "Call will be saved to the school's activity log."]] },
    };
    const s = specs[kind] || specs.meeting;
    return React.createElement(RPUI.Modal, { open: true, onClose, width: 560, label: s.title },
      React.createElement(RPUI.PanelHead, { icon: s.icon, title: s.title, sub: "Done — here's the artifact", onClose, accent: true }),
      React.createElement("div", { style: { padding: 22, display: "flex", flexDirection: "column", gap: 14 } },
        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: "var(--radius-md)", background: "var(--status-success-bg)", color: "var(--status-success-fg)", fontWeight: 700, fontSize: "var(--text-sm)" } },
          React.createElement(Icon, { name: "check", size: 16 }), "The brain did the work — no forms, no extra logins."),
        React.createElement("div", { style: { border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", overflow: "hidden" } },
          s.body.map((row, i) => React.createElement("div", { key: i, style: { display: "flex", gap: 12, padding: "11px 14px", borderTop: i ? "1px solid var(--border-subtle)" : "none", background: i % 2 ? "var(--neutral-50)" : "var(--surface-card)" } },
            React.createElement("div", { style: { width: 120, flexShrink: 0, fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700, color: "var(--text-muted)", paddingTop: 2 } }, row[0]),
            React.createElement("div", { style: { fontSize: "var(--text-sm)", color: "var(--text-body)", lineHeight: 1.5 } }, row[1])))),
        React.createElement("div", { style: { display: "flex", justifyContent: "flex-end", gap: 8 } },
          React.createElement(DS.Button, { variant: "secondary", onClick: onClose }, "Done"))),
    );
  }
  RPUI.ActionReceipt = ActionReceipt;

  /* ---- Phone frame: preview a role's view as it looks on a family's phone ---- */
  function PhoneFrame({ children }) {
    return React.createElement("div", { style: { display: "flex", justifyContent: "center", padding: "8px 0 24px" } },
      React.createElement("div", { style: { width: 400, maxWidth: "100%", background: "var(--ink)", borderRadius: 44, padding: 12, boxShadow: "var(--shadow-xl)" } },
        React.createElement("div", { style: { borderRadius: 34, overflow: "hidden", background: "var(--surface-page)", height: 760, display: "flex", flexDirection: "column", position: "relative" } },
          /* status bar */
          React.createElement("div", { style: { height: 30, flexShrink: 0, background: "var(--surface-brand)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", fontSize: 11, fontWeight: 700, fontFamily: "var(--font-data)" } },
            React.createElement("span", null, "9:41"),
            React.createElement("span", { style: { display: "inline-flex", gap: 6, alignItems: "center" } },
              React.createElement(Icon, { name: "trending", size: 12 }), React.createElement(Icon, { name: "server", size: 11 }), "100%")),
          /* notch */
          React.createElement("div", { style: { position: "absolute", top: 6, left: "50%", transform: "translateX(-50%)", width: 120, height: 20, background: "var(--ink)", borderRadius: 12, zIndex: 5 } }),
          /* screen content */
          React.createElement("div", { style: { flex: 1, overflowY: "auto", padding: "16px 14px 24px" } }, children),
        )),
    );
  }
  RPUI.PhoneFrame = PhoneFrame;
})();
