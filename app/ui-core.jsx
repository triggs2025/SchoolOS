/* ============================================================
   Riverside Platform — shared UI core
   Charts, KPI tiles, tables, status pills, source chips, alert
   cards. Composes the MIT STEM² design-system primitives.
   Exposes window.RPUI (merged across ui-*.jsx files).
   ============================================================ */
(function () {
  const { useState } = React;
  const DS = window.MITSTEMDesignSystem_177606;
  const Icon = window.RPIcon;
  const RPUI = window.RPUI || (window.RPUI = {});

  const STATUS = {
    success: { fg: "var(--status-success-fg)", bg: "var(--status-success-bg)", dot: "var(--green-500)", label: "On track" },
    warning: { fg: "var(--status-warning-fg)", bg: "var(--status-warning-bg)", dot: "var(--amber-500)", label: "Watch" },
    danger:  { fg: "var(--status-danger-fg)",  bg: "var(--status-danger-bg)",  dot: "var(--red-500)",   label: "At risk" },
    info:    { fg: "var(--status-info-fg)",     bg: "var(--status-info-bg)",    dot: "var(--blue-500)",  label: "Info" },
    neutral: { fg: "var(--neutral-700)", bg: "var(--neutral-100)", dot: "var(--neutral-400)", label: "—" },
  };
  RPUI.STATUS = STATUS;

  /* ---- Page header: eyebrow + serif title + gold rule ---- */
  function PageTitle({ eyebrow, title, sub, right }) {
    return React.createElement("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, marginBottom: 24, flexWrap: "wrap" } },
      React.createElement("div", null,
        eyebrow && React.createElement("div", { className: "mit-eyebrow", style: { marginBottom: 8 } }, eyebrow),
        React.createElement("h1", { style: { fontSize: "var(--text-3xl)", margin: 0, letterSpacing: "var(--tracking-tight)" } }, title),
        React.createElement("div", { style: { width: 56, height: 3, background: "var(--color-accent)", margin: "12px 0 0" } }),
        sub && React.createElement("p", { style: { margin: "12px 0 0", color: "var(--text-muted)", fontSize: "var(--text-md)", maxWidth: 620 } }, sub),
      ),
      right && React.createElement("div", { style: { display: "flex", gap: 10, alignItems: "center" } }, right),
    );
  }
  RPUI.PageTitle = PageTitle;

  /* ---- Card section heading (smaller, inside cards) ---- */
  function CardHead({ title, sub, right, icon }) {
    return React.createElement("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 18 } },
      React.createElement("div", { style: { display: "flex", gap: 12, alignItems: "flex-start" } },
        icon && React.createElement("span", { style: { color: "var(--color-primary)", marginTop: 2 } }, React.createElement(Icon, { name: icon, size: 20 })),
        React.createElement("div", null,
          React.createElement("h3", { style: { margin: 0, fontSize: "var(--text-lg)", fontFamily: "var(--font-heading)", color: "var(--text-default)" } }, title),
          sub && React.createElement("div", { style: { marginTop: 4, fontSize: "var(--text-sm)", color: "var(--text-muted)" } }, sub),
        ),
      ),
      right && React.createElement("div", { style: { flexShrink: 0 } }, right),
    );
  }
  RPUI.CardHead = CardHead;

  /* ---- Status pill ---- */
  function StatusPill({ status = "neutral", children }) {
    const s = STATUS[status] || STATUS.neutral;
    return React.createElement("span", { style: {
      display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 10px 3px 8px",
      borderRadius: "var(--radius-full)", background: s.bg, color: s.fg,
      fontSize: "var(--text-xs)", fontWeight: 700, letterSpacing: "0.02em",
      fontFamily: "var(--font-body)", whiteSpace: "nowrap",
    } },
      React.createElement("span", { style: { width: 7, height: 7, borderRadius: "50%", background: s.dot } }),
      children || s.label,
    );
  }
  RPUI.StatusPill = StatusPill;

  /* ---- Severity dot ---- */
  function SeverityDot({ severity = "warning", size = 10 }) {
    const c = (STATUS[severity] || STATUS.warning).dot;
    return React.createElement("span", { style: { width: size, height: size, borderRadius: "50%", background: c, flexShrink: 0, boxShadow: `0 0 0 4px ${(STATUS[severity]||STATUS.warning).bg}` } });
  }
  RPUI.SeverityDot = SeverityDot;

  /* ---- Source citation chip ---- */
  function SourceChip({ children }) {
    return React.createElement("span", { style: {
      display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 9px",
      borderRadius: "var(--radius-full)", background: "var(--purple-50)",
      border: "1px solid var(--purple-200)", color: "var(--purple-700)",
      fontSize: "var(--text-2xs)", fontWeight: 600, fontFamily: "var(--font-data)",
      letterSpacing: "0.01em", whiteSpace: "nowrap",
    } },
      React.createElement(Icon, { name: "shield", size: 11, stroke: 2.4 }),
      children,
    );
  }
  RPUI.SourceChip = SourceChip;

  /* ---- Tabular delta vs prior ---- */
  function Delta({ value, suffix = "", invert = false }) {
    const up = value > 0;
    const good = invert ? !up : up;
    const tone = value === 0 ? "neutral" : good ? "success" : "danger";
    const c = STATUS[tone].fg;
    const icon = value === 0 ? "minus" : up ? "trending" : "trendingDown";
    return React.createElement("span", { style: { display: "inline-flex", alignItems: "center", gap: 4, color: c, fontFamily: "var(--font-data)", fontSize: "var(--text-sm)", fontWeight: 600 } },
      React.createElement(Icon, { name: icon, size: 14, stroke: 2.4 }),
      (value > 0 ? "+" : "") + value + suffix,
    );
  }
  RPUI.Delta = Delta;

  /* ============================================================
     CHARTS — lightweight brand-styled SVG
     ============================================================ */

  /* Sparkline */
  function Sparkline({ data = [], w = 96, h = 30, tone = "brand", fill = true }) {
    if (!data.length) return null;
    const min = Math.min(...data), max = Math.max(...data);
    const span = max - min || 1;
    const stroke = { brand: "var(--purple-500)", danger: "var(--red-500)", success: "var(--green-500)", accent: "var(--gold-500)" }[tone] || "var(--purple-500)";
    const pts = data.map((v, i) => [ (i / (data.length - 1)) * w, h - 3 - ((v - min) / span) * (h - 6) ]);
    const line = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
    const area = line + ` L${w} ${h} L0 ${h} Z`;
    return React.createElement("svg", { width: w, height: h, viewBox: `0 0 ${w} ${h}`, style: { display: "block", overflow: "visible" } },
      fill && React.createElement("path", { d: area, fill: stroke, opacity: 0.1 }),
      React.createElement("path", { d: line, fill: "none", stroke, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }),
      React.createElement("circle", { cx: pts[pts.length - 1][0], cy: pts[pts.length - 1][1], r: 2.6, fill: stroke }),
    );
  }
  RPUI.Sparkline = Sparkline;

  /* Line / area trend chart with axes */
  function TrendChart({ points = [], unit = "", labels = [], w = 560, h = 220, tone = "brand", yMin, yMax }) {
    const padL = 38, padR = 14, padT = 14, padB = 26;
    const min = yMin != null ? yMin : Math.min(...points) - 1;
    const max = yMax != null ? yMax : Math.max(...points) + 1;
    const span = max - min || 1;
    const iw = w - padL - padR, ih = h - padT - padB;
    const stroke = { brand: "var(--purple-500)", danger: "var(--red-500)", success: "var(--green-500)" }[tone] || "var(--purple-500)";
    const xy = points.map((v, i) => [ padL + (points.length === 1 ? iw / 2 : (i / (points.length - 1)) * iw), padT + ih - ((v - min) / span) * ih ]);
    const line = xy.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
    const area = line + ` L${xy[xy.length-1][0].toFixed(1)} ${padT+ih} L${xy[0][0].toFixed(1)} ${padT+ih} Z`;
    const ticks = 4;
    return React.createElement("svg", { width: "100%", viewBox: `0 0 ${w} ${h}`, style: { display: "block", fontFamily: "var(--font-data)" } },
      [...Array(ticks + 1)].map((_, i) => {
        const val = max - (span / ticks) * i;
        const y = padT + (ih / ticks) * i;
        return React.createElement("g", { key: i },
          React.createElement("line", { x1: padL, y1: y, x2: w - padR, y2: y, stroke: "var(--neutral-200)", strokeWidth: 1 }),
          React.createElement("text", { x: padL - 6, y: y + 3, textAnchor: "end", fontSize: 9, fill: "var(--text-subtle)" }, Math.round(val) + unit),
        );
      }),
      React.createElement("path", { d: area, fill: stroke, opacity: 0.09 }),
      React.createElement("path", { d: line, fill: "none", stroke, strokeWidth: 2.4, strokeLinecap: "round", strokeLinejoin: "round" }),
      xy.map((p, i) => React.createElement("circle", { key: i, cx: p[0], cy: p[1], r: 3, fill: "var(--surface-card)", stroke, strokeWidth: 2 })),
      labels.length ? xy.map((p, i) => React.createElement("text", { key: "l" + i, x: p[0], y: h - 8, textAnchor: "middle", fontSize: 9, fill: "var(--text-subtle)" }, labels[i])) : null,
    );
  }
  RPUI.TrendChart = TrendChart;

  /* Horizontal comparison bars with optional baseline */
  function CompareBars({ series = [], unit = "", baseline, w = 520, max }) {
    const top = max || Math.max(...series.map((s) => s.value), baseline ? baseline.value : 0) * 1.15;
    const rowH = 46, padL = 130, barW = w - padL - 56;
    const h = series.length * rowH + 14;
    const toneColor = { danger: "var(--red-500)", warning: "var(--amber-500)", brand: "var(--purple-500)", success: "var(--green-500)" };
    return React.createElement("svg", { width: "100%", viewBox: `0 0 ${w} ${h}`, style: { display: "block", fontFamily: "var(--font-body)" } },
      baseline ? (() => {
        const x = padL + (baseline.value / top) * barW;
        return React.createElement("g", null,
          React.createElement("line", { x1: x, y1: 4, x2: x, y2: h - 18, stroke: "var(--gold-500)", strokeWidth: 1.5, strokeDasharray: "4 3" }),
          React.createElement("text", { x: x, y: h - 4, textAnchor: "middle", fontSize: 9, fill: "var(--gold-700)", fontFamily: "var(--font-data)", fontWeight: 700 }, baseline.label + " " + baseline.value + unit),
        );
      })() : null,
      series.map((s, i) => {
        const y = 8 + i * rowH;
        const bw = Math.max(2, (s.value / top) * barW);
        const c = toneColor[s.tone] || "var(--purple-500)";
        return React.createElement("g", { key: i },
          React.createElement("text", { x: padL - 12, y: y + 21, textAnchor: "end", fontSize: 12.5, fill: "var(--text-body)", fontWeight: 600 }, s.label),
          React.createElement("rect", { x: padL, y: y + 7, width: barW, height: 18, rx: 4, fill: "var(--neutral-100)" }),
          React.createElement("rect", { x: padL, y: y + 7, width: bw, height: 18, rx: 4, fill: c }),
          React.createElement("text", { x: padL + bw + 8, y: y + 21, fontSize: 12, fill: "var(--text-default)", fontFamily: "var(--font-data)", fontWeight: 700 }, s.value + unit),
        );
      }),
    );
  }
  RPUI.CompareBars = CompareBars;

  /* Donut / completion ring */
  function DonutRing({ value = 0, size = 116, stroke = 12, tone = "brand", label, sub }) {
    const r = (size - stroke) / 2, c = 2 * Math.PI * r;
    const pct = Math.max(0, Math.min(100, value));
    const col = { brand: "var(--purple-500)", success: "var(--green-500)", warning: "var(--amber-500)", danger: "var(--red-500)", accent: "var(--gold-500)" }[tone] || "var(--purple-500)";
    return React.createElement("div", { style: { position: "relative", width: size, height: size } },
      React.createElement("svg", { width: size, height: size, style: { transform: "rotate(-90deg)" } },
        React.createElement("circle", { cx: size/2, cy: size/2, r, fill: "none", stroke: "var(--neutral-200)", strokeWidth: stroke }),
        React.createElement("circle", { cx: size/2, cy: size/2, r, fill: "none", stroke: col, strokeWidth: stroke, strokeLinecap: "round", strokeDasharray: c, strokeDashoffset: c * (1 - pct / 100), style: { transition: "stroke-dashoffset .6s var(--ease-out)" } }),
      ),
      React.createElement("div", { style: { position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" } },
        React.createElement("div", { style: { fontFamily: "var(--font-display)", fontSize: size * 0.26, fontWeight: 900, color: "var(--text-brand)", lineHeight: 1 } }, label != null ? label : pct + "%"),
        sub && React.createElement("div", { style: { fontSize: "var(--text-2xs)", color: "var(--text-muted)", marginTop: 3, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 } }, sub),
      ),
    );
  }
  RPUI.DonutRing = DonutRing;

  /* Mini grouped bars used inside assistant answers */
  function MiniBars(props) { return CompareBars(props); }
  RPUI.MiniBars = MiniBars;

  /* ============================================================
     KPI TILE
     ============================================================ */
  function KpiTile({ value, label, unit = "", delta, deltaSuffix = "", invertDelta = false, spark, sparkTone = "brand", status, statusLabel, footnote }) {
    return React.createElement(DS.Card, { padded: true, hoverable: true, style: { display: "flex", flexDirection: "column", gap: 10, minHeight: 132 } },
      React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" } },
        React.createElement("div", { className: "mit-eyebrow", style: { fontSize: "var(--text-2xs)", letterSpacing: "0.1em" } }, label),
        status && React.createElement(StatusPill, { status }, statusLabel),
      ),
      React.createElement("div", { style: { display: "flex", alignItems: "flex-end", gap: 4 } },
        React.createElement("span", { style: { fontFamily: "var(--font-display)", fontSize: "var(--text-4xl)", fontWeight: 900, lineHeight: 0.9, color: "var(--text-default)", fontVariantNumeric: "tabular-nums" } }, value),
        unit && React.createElement("span", { style: { fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", fontWeight: 700, color: "var(--text-muted)", marginBottom: 2 } }, unit),
      ),
      React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginTop: "auto" } },
        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
          delta != null && React.createElement(Delta, { value: delta, suffix: deltaSuffix, invert: invertDelta }),
          footnote && React.createElement("span", { style: { fontSize: "var(--text-xs)", color: "var(--text-subtle)" } }, footnote),
        ),
        spark && React.createElement(Sparkline, { data: spark, tone: sparkTone }),
      ),
    );
  }
  RPUI.KpiTile = KpiTile;

  /* ============================================================
     DATA TABLE
     cols: [{key,label,align,width,render?}]  rows: [obj]
     ============================================================ */
  function DataTable({ cols = [], rows = [], onRowClick, dense = false, emptyText = "No records." }) {
    const [sortKey, setSortKey] = useState(null);
    const [dir, setDir] = useState(1);
    const sorted = React.useMemo(() => {
      if (!sortKey) return rows;
      const c = cols.find((c) => c.key === sortKey);
      if (c && c.noSort) return rows;
      return [...rows].sort((a, b) => {
        const av = a[sortKey], bv = b[sortKey];
        if (av == null) return 1; if (bv == null) return -1;
        return (av > bv ? 1 : av < bv ? -1 : 0) * dir;
      });
    }, [rows, sortKey, dir, cols]);
    const pad = dense ? "9px 12px" : "13px 16px";
    return React.createElement("div", { style: { overflowX: "auto", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" } },
      React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-body)" } },
        React.createElement("thead", null,
          React.createElement("tr", { style: { background: "var(--neutral-50)" } },
            cols.map((c) => React.createElement("th", {
              key: c.key, onClick: () => { if (c.noSort) return; if (sortKey === c.key) setDir(-dir); else { setSortKey(c.key); setDir(1); } },
              style: { textAlign: c.align || "left", padding: pad, fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", fontWeight: 700, borderBottom: "1px solid var(--border-default)", cursor: c.noSort ? "default" : "pointer", whiteSpace: "nowrap", width: c.width },
            },
              React.createElement("span", { style: { display: "inline-flex", alignItems: "center", gap: 4 } }, c.label,
                sortKey === c.key && React.createElement(Icon, { name: dir > 0 ? "chevronDown" : "chevronRight", size: 11 }))
            )),
          ),
        ),
        React.createElement("tbody", null,
          sorted.length === 0
            ? React.createElement("tr", null, React.createElement("td", { colSpan: cols.length, style: { padding: 28, textAlign: "center", color: "var(--text-subtle)", fontSize: "var(--text-sm)" } }, emptyText))
            : sorted.map((row, ri) => React.createElement("tr", {
                key: ri, onClick: onRowClick ? () => onRowClick(row) : undefined,
                className: onRowClick ? "rp-row" : undefined,
                style: { cursor: onRowClick ? "pointer" : "default", borderBottom: ri < sorted.length - 1 ? "1px solid var(--border-subtle)" : "none", transition: "background var(--transition)" },
              },
              cols.map((c) => React.createElement("td", { key: c.key, style: { textAlign: c.align || "left", padding: pad, fontSize: "var(--text-sm)", color: "var(--text-body)", verticalAlign: "middle", whiteSpace: c.wrap ? "normal" : "nowrap", fontFamily: c.mono ? "var(--font-data)" : "inherit", fontVariantNumeric: c.mono ? "tabular-nums" : "normal" } },
                c.render ? c.render(row) : row[c.key])),
            )),
        ),
      ),
    );
  }
  RPUI.DataTable = DataTable;

  /* ============================================================
     ALERT CARD (proactive)
     ============================================================ */
  function AlertCard({ alert, onAction, compact = false }) {
    const sev = alert.severity || "warning";
    const s = STATUS[sev] || STATUS.warning;
    const [why, setWhy] = useState(false);
    return React.createElement("div", { style: {
      display: "flex", gap: 14, padding: compact ? "14px 16px" : "18px 20px",
      background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
      borderLeft: `3px solid ${s.dot}`, borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-xs)",
    } },
      React.createElement("div", { style: { marginTop: 5 } }, React.createElement(SeverityDot, { severity: sev })),
      React.createElement("div", { style: { flex: 1, minWidth: 0 } },
        React.createElement("div", { style: { fontWeight: 700, fontSize: "var(--text-base)", color: "var(--text-default)", lineHeight: 1.35 } }, alert.headline),
        React.createElement("div", { style: { fontSize: "var(--text-sm)", color: "var(--text-muted)", marginTop: 4, lineHeight: 1.45 } }, alert.why),
        React.createElement("button", { onClick: () => setWhy(!why), style: { display: "inline-flex", alignItems: "center", gap: 5, marginTop: 8, background: "none", border: "none", padding: 0, cursor: "pointer", color: "var(--text-link)", fontSize: "var(--text-xs)", fontWeight: 600, fontFamily: "var(--font-body)" } },
          React.createElement(Icon, { name: "info", size: 13 }), alert.lang === "es" ? "¿Por qué veo esto?" : "Why am I seeing this?"),
        why && React.createElement("div", { style: { marginTop: 8, padding: "10px 12px", background: "var(--neutral-50)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-subtle)" } },
          React.createElement("div", { style: { fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700, color: "var(--text-subtle)", marginBottom: 6 } }, alert.lang === "es" ? "Señales detectadas" : "Signals detected"),
          React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 5 } },
            (alert.signals || ["Surfaced by the platform from connected data."]).map((sig, i) => React.createElement("div", { key: i, style: { display: "flex", gap: 7, alignItems: "flex-start", fontSize: "var(--text-xs)", color: "var(--text-body)", lineHeight: 1.4 } },
              React.createElement(Icon, { name: "chevronRight", size: 12, style: { color: "var(--gold-600)", marginTop: 2, flexShrink: 0 } }), sig)))),
        alert.actions && React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" } },
          alert.actions.map((a, i) => React.createElement(DS.Button, { key: i, size: "sm", variant: i === 0 ? "primary" : "outline", onClick: () => onAction && onAction(a, alert) }, a)),
        ),
      ),
    );
  }
  RPUI.AlertCard = AlertCard;

  /* ---- Replaces badge ---- */
  function ReplacesBadge({ children }) {
    return React.createElement("span", { style: {
      display: "inline-flex", alignItems: "center", gap: 5, padding: "2px 8px",
      borderRadius: "var(--radius-sm)", background: "var(--neutral-100)", color: "var(--text-subtle)",
      fontSize: "var(--text-2xs)", fontWeight: 600, fontFamily: "var(--font-data)", letterSpacing: "0.02em",
    } }, React.createElement(Icon, { name: "refresh", size: 10 }), "Replaces ", children);
  }
  RPUI.ReplacesBadge = ReplacesBadge;

  /* ---- Simple grid helper ---- */
  function Grid({ cols = 4, gap = 16, min, children, style = {} }) {
    return React.createElement("div", { style: {
      display: "grid", gap,
      gridTemplateColumns: min ? `repeat(auto-fit, minmax(${min}px, 1fr))` : `repeat(${cols}, 1fr)`,
      ...style,
    } }, children);
  }
  RPUI.Grid = Grid;

  /* ---- Markdown-lite: **bold** inline ---- */
  function MdText({ children, style = {} }) {
    const parts = String(children).split(/(\*\*[^*]+\*\*)/g);
    return React.createElement("p", { style: { margin: 0, lineHeight: 1.6, ...style } },
      parts.map((p, i) => p.startsWith("**") && p.endsWith("**")
        ? React.createElement("strong", { key: i, style: { fontWeight: 700, color: "var(--text-default)" } }, p.slice(2, -2))
        : p));
  }
  RPUI.MdText = MdText;

  /* ---- Compact read-only table (assistant answers) ---- */
  function MiniTable({ table }) {
    const th = (c, i) => React.createElement("th", { key: i, style: { textAlign: i === 0 ? "left" : "right", padding: "8px 11px", fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", fontWeight: 700 } }, c);
    const td = (cell, ci) => React.createElement("td", { key: ci, style: { textAlign: ci === 0 ? "left" : "right", padding: "8px 11px", color: "var(--text-body)", fontWeight: ci === 0 ? 600 : 500, fontFamily: ci === 0 ? "inherit" : "var(--font-data)" } }, cell);
    const tr = (row, ri) => React.createElement("tr", { key: ri, style: { borderTop: "1px solid var(--border-subtle)" } }, row.map(td));
    return React.createElement("div", { style: { overflowX: "auto", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)" } },
      React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: "var(--text-xs)" } },
        React.createElement("thead", null, React.createElement("tr", { style: { background: "var(--neutral-50)" } }, table.cols.map(th))),
        React.createElement("tbody", null, table.rows.map(tr)),
      ),
    );
  }
  RPUI.MiniTable = MiniTable;

  /* ---- Reusable card panel with heading ---- */
  function Panel({ title, sub, icon, right, accent, children, style = {} }) {
    return React.createElement(DS.Card, { padded: true, accent: accent ? "top" : "none", style: { display: "flex", flexDirection: "column", ...style } },
      (title || right) && React.createElement(CardHead, { title, sub, icon, right }),
      children);
  }
  RPUI.Panel = Panel;

  /* ---- Short name (strips honorific) for avatars ---- */
  RPUI.shortName = (n) => String(n || "").replace(/^(Dr|Mr|Mrs|Ms)\.\s+/, "");

  /* ---- Relative time ("2m ago" / "hace 2 min") ---- */
  RPUI.timeAgo = (ts, isES) => {
    const s = Math.max(0, Math.floor((Date.now() - ts) / 1000));
    if (s < 45) return isES ? "ahora" : "just now";
    const m = Math.floor(s / 60);
    if (m < 60) return isES ? `hace ${m} min` : `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return isES ? `hace ${h} h` : `${h}h ago`;
    const d = Math.floor(h / 24);
    if (d === 1) return isES ? "ayer" : "yesterday";
    return isES ? `hace ${d} días` : `${d}d ago`;
  };

  /* ---- "AI is generating…" inline block: button → spinner → result ---- */
  function GenerateBlock({ label = "Generate", icon = "sparkle", children, variant = "secondary", auto = false }) {
    const [state, setState] = useState(auto ? "loading" : "idle"); // idle | loading | done
    React.useEffect(() => { if (state === "loading") { const t = setTimeout(() => setState("done"), 850); return () => clearTimeout(t); } }, [state]);
    if (state === "done") return children;
    return React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 12 } },
      state === "idle"
        ? React.createElement(DS.Button, { variant, iconLeft: React.createElement(Icon, { name: icon, size: 16 }), onClick: () => setState("loading") }, label)
        : React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, color: "var(--text-muted)", fontSize: "var(--text-sm)", padding: "8px 0" } },
            React.createElement("span", { style: { display: "flex", gap: 4 } }, [0, 1, 2].map((d) => React.createElement("span", { key: d, style: { width: 7, height: 7, borderRadius: "50%", background: "var(--purple-400)", animation: "rp-blink 1s infinite", animationDelay: d * 0.16 + "s" } }))),
            "Generating from grounded data…"),
    );
  }
  RPUI.GenerateBlock = GenerateBlock;
})();
