/* ============================================================
   Riverside Platform — role picker + app root
   ============================================================ */
(function () {
  const { useState } = React;
  const DS = window.MITSTEMDesignSystem_177606;
  const Icon = window.RPIcon;
  const U = window.RPUI;
  const RP = window.RP;

  /* ---- Role picker (the "log in as…" console) ---- */
  function RolePicker({ onPick }) {
    return React.createElement("div", { style: { minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--surface-page)" } },
      /* brand band */
      React.createElement("div", { style: { background: "var(--surface-brand)", color: "#fff", borderBottom: "3px solid var(--color-accent)", padding: "46px 24px 40px" } },
        React.createElement("div", { style: { maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", gap: 22, flexWrap: "wrap" } },
          React.createElement("img", { src: "assets/eagle-white.png", alt: "MIT crest", style: { height: 84, width: "auto" } }),
          React.createElement("div", { style: { flex: 1, minWidth: 280 } },
            React.createElement("div", { style: { fontSize: "var(--text-sm)", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold-300)", fontWeight: 700 } }, "Riverside Unified · Unified District OS"),
            React.createElement("h1", { style: { margin: "8px 0 0", color: "#fff", fontSize: "var(--text-4xl)", letterSpacing: "-0.01em" } }, "Riverside Platform"),
            React.createElement("div", { style: { width: 64, height: 3, background: "var(--color-accent)", margin: "14px 0" } }),
            React.createElement("p", { style: { margin: 0, color: "rgba(255,255,255,.82)", fontSize: "var(--text-md)", maxWidth: 640, lineHeight: 1.6 } }, "One login per person replaces the pile of disconnected subscriptions. The same product reshapes itself completely around whoever signs in.")),
          React.createElement("div", { style: { alignSelf: "flex-start" } }, React.createElement(U.TrustMark, { inverse: true })),
        ),
      ),
      /* picker */
      React.createElement("div", { style: { maxWidth: 1100, margin: "0 auto", padding: "38px 24px 60px", width: "100%" } },
        React.createElement("div", { className: "mit-eyebrow", style: { marginBottom: 6 } }, "Demo console"),
        React.createElement("h2", { style: { margin: "0 0 4px", fontSize: "var(--text-2xl)" } }, "Log in as…"),
        React.createElement("p", { style: { margin: "0 0 26px", color: "var(--text-muted)", fontSize: "var(--text-sm)" } }, "Select a role to enter their experience. Switch role any time from the top bar."),
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(252px, 1fr))", gap: 16 } },
          RP.roles.map((r) => React.createElement("button", { key: r.id, onClick: () => onPick(r.id), className: "rp-rolecard", style: {
            textAlign: "left", cursor: "pointer", background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-lg)", padding: 18, display: "flex", flexDirection: "column", gap: 12,
            boxShadow: "var(--shadow-sm)", transition: "box-shadow var(--transition), transform var(--transition), border-color var(--transition)", fontFamily: "var(--font-body)",
          } },
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12 } },
              React.createElement(DS.Avatar, { name: U.shortName(r.name), size: "lg" }),
              React.createElement("div", { style: { minWidth: 0 } },
                React.createElement("div", { className: "mit-eyebrow", style: { fontSize: "var(--text-2xs)", letterSpacing: "0.1em" } }, r.title),
                React.createElement("div", { style: { fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "var(--text-md)", color: "var(--text-default)", lineHeight: 1.2 } }, r.name))),
            React.createElement("div", { style: { fontSize: "var(--text-sm)", color: "var(--text-body)", fontWeight: 600 } }, r.school),
            React.createElement("div", { style: { fontSize: "var(--text-xs)", color: "var(--text-muted)", lineHeight: 1.4, minHeight: 32 } }, r.descriptor),
            React.createElement("div", { style: { marginTop: "auto", display: "flex", alignItems: "center", gap: 6, color: "var(--text-link)", fontWeight: 700, fontSize: "var(--text-sm)" } }, "Enter", React.createElement(Icon, { name: "arrowRight", size: 15 })),
          )),
        ),
      ),
    );
  }

  /* ---- placeholder for any not-yet-built role ---- */
  function Fallback({ role }) {
    return React.createElement("div", { style: { padding: 20 } }, React.createElement(U.ComingSoon, { title: RP.roleById[role].title + " view", body: "This role is being built." }));
  }

  /* ---- App root ---- */
  /* ---- Guided Demo Mode: the 5-minute narrative on rails ---- */
  const DEMO_STEPS = [
    { role: "superintendent", title: "1 · Open as the Superintendent", text: "You land straight in your brain — no hunting. It greets you, the live School Health ticks, and an automated alert fires on its own when MIT dips below 90%." },
    { role: "superintendent", title: "2 · Ask the brain", text: "Tap the suggested prompt “Compare chronic absenteeism across the three schools.” You get a plain-language, source-cited answer with a chart — the aha." },
    { role: "superintendent", title: "3 · Act in one click", text: "On that answer, hit “Generate & route report to Principal Bell”, “Schedule a meeting”, or “Send to phone.” Each produces a real artifact — context attached, no forms." },
    { role: "teacher", title: "4 · Same system, new product", text: "Switch to Ms. Chen. Her brain flags who needs help (Tyler → fractions). Generate a re-teach plan and push it to Google Classroom." },
    { role: "admin", title: "5 · The equity moment", text: "Switch to the front office. Today's 3+-day absentees → message Diego's mom. Watch it auto-translate to Spanish, then send." },
    { role: "parent", lang: "es", title: "6 · The loop closes", text: "Switch to Maria. Her whole app is in Spanish — and the message you just sent is sitting at the top of her brain. Same student, four people, one system." },
    { role: "superintendent", title: "7 · The lead story: enrollment", text: "Back to the Superintendent → Recruitment. Tours→enrollment funnel, why families didn't convert, and one-click follow-ups. Butts in seats." },
  ];

  function DemoGuide({ step, setStep, onApply, onClose }) {
    const s = DEMO_STEPS[step];
    return React.createElement("div", { style: { position: "fixed", left: 20, bottom: 20, zIndex: 92, width: 340, background: "var(--surface-card)", border: "1px solid var(--border-subtle)", borderTop: "3px solid var(--color-accent)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-xl)", padding: 18 } },
      React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 } },
        React.createElement("span", { className: "mit-eyebrow", style: { fontSize: "var(--text-2xs)" } }, "Guided demo"),
        React.createElement("button", { onClick: onClose, "aria-label": "Close demo", style: { border: "none", background: "none", cursor: "pointer", color: "var(--text-muted)", lineHeight: 0 } }, React.createElement(Icon, { name: "x", size: 16 }))),
      React.createElement("div", { style: { fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "var(--text-md)", color: "var(--text-default)" } }, s.title),
      React.createElement("p", { style: { margin: "6px 0 12px", fontSize: "var(--text-sm)", color: "var(--text-muted)", lineHeight: 1.5 } }, s.text),
      React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center" } },
        React.createElement(DS.Button, { size: "sm", variant: "secondary", iconLeft: React.createElement(Icon, { name: "arrowRight", size: 14 }), onClick: () => onApply(s) }, "Take me there"),
        React.createElement("div", { style: { marginLeft: "auto", display: "flex", gap: 6 } },
          React.createElement(DS.Button, { size: "sm", variant: "ghost", disabled: step === 0, onClick: () => setStep(Math.max(0, step - 1)) }, "Back"),
          React.createElement(DS.Button, { size: "sm", variant: "outline", disabled: step === DEMO_STEPS.length - 1, onClick: () => setStep(Math.min(DEMO_STEPS.length - 1, step + 1)) }, "Next"))),
      React.createElement("div", { style: { display: "flex", gap: 5, marginTop: 12 } },
        DEMO_STEPS.map((_, i) => React.createElement("span", { key: i, onClick: () => setStep(i), style: { flex: 1, height: 4, borderRadius: 2, cursor: "pointer", background: i <= step ? "var(--color-accent)" : "var(--neutral-200)" } }))),
    );
  }

  function DemoLauncher({ onStart }) {
    return React.createElement("button", { onClick: onStart, style: { position: "fixed", left: 20, bottom: 20, zIndex: 92, display: "inline-flex", alignItems: "center", gap: 8, height: 44, padding: "0 18px", borderRadius: "var(--radius-full)", border: "1px solid var(--gold-400)", background: "var(--color-accent)", color: "var(--purple-800)", fontWeight: 700, fontSize: "var(--text-sm)", fontFamily: "var(--font-body)", cursor: "pointer", boxShadow: "var(--shadow-lg)" } },
      React.createElement(Icon, { name: "sparkle", size: 16 }), "Guided demo");
  }

  /* ---- App root ---- */
  function App() {
    const [role, setRole] = useState(null);
    const [lang, setLang] = useState("en");
    const [childId, setChildId] = useState("diego");
    const [demo, setDemo] = useState(false);
    const [step, setStep] = useState(0);
    const [phone, setPhone] = useState(false);

    function applyStep(s) { setRole(s.role); setLang(s.role === "parent" ? (s.lang || "es") : (s.lang || "en")); setChildId("diego"); }

    const overlay = demo
      ? React.createElement(DemoGuide, { step, setStep, onApply: applyStep, onClose: () => setDemo(false) })
      : React.createElement(DemoLauncher, { onStart: () => { setDemo(true); setStep(0); } });

    let view;
    if (!role) {
      view = React.createElement(RolePicker, { onPick: (id) => { setRole(id); setLang(id === "parent" ? "es" : "en"); setChildId("diego"); } });
    } else {
      const View = (window.RPRoles && window.RPRoles[role]) || (() => React.createElement(Fallback, { role }));
      const canPhone = role === "parent" || role === "student";
      const phoneToggle = canPhone
        ? React.createElement("button", { onClick: () => setPhone(!phone), style: { display: "inline-flex", alignItems: "center", gap: 6, height: 36, padding: "0 12px", borderRadius: "var(--radius-md)", border: "1px solid rgba(255,255,255,.25)", background: phone ? "var(--color-accent)" : "rgba(255,255,255,.1)", color: phone ? "var(--purple-800)" : "#fff", fontWeight: 700, fontSize: "var(--text-xs)", cursor: "pointer", fontFamily: "var(--font-body)" } },
            React.createElement(Icon, { name: "phone", size: 14 }), phone ? (role === "parent" && lang === "es" ? "Escritorio" : "Desktop") : (role === "parent" && lang === "es" ? "Teléfono" : "Phone"))
        : null;
      const langToggle = role === "parent"
        ? React.createElement("button", { onClick: () => setLang(lang === "es" ? "en" : "es"), style: { display: "inline-flex", alignItems: "center", gap: 6, height: 36, padding: "0 12px", borderRadius: "var(--radius-md)", border: "1px solid rgba(255,255,255,.25)", background: "rgba(255,255,255,.1)", color: "#fff", fontWeight: 700, fontSize: "var(--text-xs)", cursor: "pointer", fontFamily: "var(--font-body)" } },
            React.createElement(Icon, { name: "globe", size: 15 }), RP.t[lang].switchLang)
        : null;
      const topRightExtra = (phoneToggle || langToggle) ? React.createElement(React.Fragment, null, phoneToggle, langToggle) : null;
      view = React.createElement(U.Shell, {
        role, lang, setLang, onSwitchRole: () => setRole(null), topRightExtra, childId, setChildId,
        renderView: (active, app) => {
          let content;
          if (active === "brain") content = React.createElement(window.RPBrainView, { role, app, lang });
          else if (active === "recruitment") content = React.createElement(window.RPRecruitmentView, { role, app, lang });
          else content = React.createElement(View, { active, app, lang, setLang });
          return phone && canPhone ? React.createElement(U.PhoneFrame, null, content) : content;
        },
      });
    }
    return React.createElement(React.Fragment, null, view, overlay);
  }

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(React.createElement(App));
})();
