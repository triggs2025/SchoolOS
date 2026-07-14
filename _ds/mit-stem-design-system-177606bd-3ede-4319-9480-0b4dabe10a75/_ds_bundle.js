/* @ds-bundle: {"format":3,"namespace":"MITSTEMDesignSystem_177606","components":[{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"SectionHeading","sourcePath":"components/brand/SectionHeading.jsx"},{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"IconButton","sourcePath":"components/buttons/IconButton.jsx"},{"name":"Avatar","sourcePath":"components/data/Avatar.jsx"},{"name":"Breadcrumb","sourcePath":"components/data/Breadcrumb.jsx"},{"name":"Card","sourcePath":"components/data/Card.jsx"},{"name":"StatCard","sourcePath":"components/data/StatCard.jsx"},{"name":"Tabs","sourcePath":"components/data/Tabs.jsx"},{"name":"Alert","sourcePath":"components/feedback/Alert.jsx"},{"name":"Badge","sourcePath":"components/feedback/Badge.jsx"},{"name":"ProgressBar","sourcePath":"components/feedback/ProgressBar.jsx"},{"name":"Tag","sourcePath":"components/feedback/Tag.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"}],"sourceHashes":{"components/brand/Logo.jsx":"4466181c7e7c","components/brand/SectionHeading.jsx":"bafa3e9d7293","components/buttons/Button.jsx":"d1421f306be2","components/buttons/IconButton.jsx":"859b665efacd","components/data/Avatar.jsx":"0fcab21ca1ba","components/data/Breadcrumb.jsx":"1634572949e5","components/data/Card.jsx":"9880d2129ddc","components/data/StatCard.jsx":"97e4f2c555af","components/data/Tabs.jsx":"6a87c8bade03","components/feedback/Alert.jsx":"b1daa5ff72f2","components/feedback/Badge.jsx":"4af42f0d5bba","components/feedback/ProgressBar.jsx":"00762f78e9f4","components/feedback/Tag.jsx":"7cab6b95b43d","components/forms/Checkbox.jsx":"03cc4f2a025e","components/forms/Field.jsx":"5db402cfca3f","components/forms/Input.jsx":"4c1a01c8868c","components/forms/Radio.jsx":"b53109a17684","components/forms/Select.jsx":"ae4331ee94fc","components/forms/Switch.jsx":"961f6614c211","components/forms/Textarea.jsx":"3adfd7115a15","ui_kits/image-slot.js":"9309434cb09c","ui_kits/portal/screens.jsx":"71fed621298f","ui_kits/portal/shell.jsx":"090ca63b3556","ui_kits/website/AcademicsScreen.jsx":"94c7ebf59442","ui_kits/website/EnrollScreen.jsx":"c29b3fb5516c","ui_kits/website/HomeScreen.jsx":"5b0290b389ed","ui_kits/website/chrome.jsx":"147675a24184","ui_kits/website/icons.jsx":"f34f69714bca"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.MITSTEMDesignSystem_177606 = window.MITSTEMDesignSystem_177606 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MIT STEM² brand lockup. The eagle crest is supplied as an image
 * (`src`), the wordmark is set typographically in the brand serif so
 * it stays crisp at any size and recolors with the theme.
 *
 * Pass the eagle PNG path appropriate to where you mount it, e.g.
 * `src="../../assets/eagle.png"` (or eagle-white.png for dark chrome).
 */
function Logo({
  src,
  variant = "full",
  // full | stacked | wordmark | eagle
  theme = "color",
  // color | white | purple
  height = 48,
  showSubtitle = true,
  style = {},
  ...rest
}) {
  const wordColor = theme === "white" ? "var(--white)" : "var(--purple-500)";
  const subColor = theme === "white" ? "rgba(255,255,255,.85)" : "var(--gold-700)";
  const ruleColor = theme === "white" ? "rgba(255,255,255,.6)" : "var(--gold-500)";
  const crest = src && /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: "MIT eagle crest",
    style: {
      height: height,
      width: "auto",
      display: "block",
      flexShrink: 0
    }
  });
  const wordmark = /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-serif)",
      fontWeight: "var(--weight-bold)",
      fontSize: height * 0.42,
      lineHeight: 1.02,
      letterSpacing: "0.02em",
      color: wordColor,
      textTransform: "uppercase"
    }
  }, "Maricopa Institute", /*#__PURE__*/React.createElement("br", null), "of Technology"), showSubtitle && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 2,
      background: ruleColor,
      margin: `${height * 0.08}px 0`,
      width: "100%"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontWeight: "var(--weight-bold)",
      fontSize: height * 0.16,
      letterSpacing: "var(--tracking-wider)",
      color: subColor,
      textTransform: "uppercase"
    }
  }, "MIT STEM\xB2 Online High School")));
  if (variant === "eagle") return /*#__PURE__*/React.createElement("div", _extends({
    style: style
  }, rest), crest);
  if (variant === "wordmark") return /*#__PURE__*/React.createElement("div", _extends({
    style: style
  }, rest), wordmark);
  if (variant === "stacked") {
    return /*#__PURE__*/React.createElement("div", _extends({
      style: {
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: height * 0.18,
        textAlign: "center",
        ...style
      }
    }, rest), crest, wordmark);
  }
  // full
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: height * 0.32,
      ...style
    }
  }, rest), crest, wordmark);
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/brand/SectionHeading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Section header: gold uppercase eyebrow, serif title, gold rule.
 * The recurring marketing/section pattern across MIT surfaces.
 */
function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  rule = true,
  inverse = false,
  style = {},
  ...rest
}) {
  const center = align === "center";
  return /*#__PURE__*/React.createElement("header", _extends({
    style: {
      textAlign: align,
      maxWidth: 720,
      marginInline: center ? "auto" : 0,
      ...style
    }
  }, rest), eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-eyebrow)",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-bold)",
      letterSpacing: "var(--tracking-wider)",
      textTransform: "uppercase",
      color: inverse ? "var(--gold-300)" : "var(--text-accent)",
      marginBottom: "var(--space-3)"
    }
  }, eyebrow), title && /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: "var(--weight-bold)",
      fontSize: "var(--text-3xl)",
      lineHeight: "var(--leading-tight)",
      letterSpacing: "var(--tracking-tight)",
      color: inverse ? "var(--white)" : "var(--text-default)",
      margin: 0
    }
  }, title), rule && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 64,
      height: "var(--border-width-accent)",
      background: "var(--color-accent)",
      margin: `var(--space-4) ${center ? "auto" : "0"}`
    }
  }), description && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-md)",
      lineHeight: "var(--leading-relaxed)",
      color: inverse ? "rgba(255,255,255,.82)" : "var(--text-muted)",
      margin: 0
    }
  }, description));
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MIT STEM² primary action control.
 * Brand purple by default; gold "secondary" for high-emphasis CTAs.
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  type = "button",
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      height: "var(--control-height-sm)",
      padding: "0 14px",
      font: "var(--text-sm)"
    },
    md: {
      height: "var(--control-height-md)",
      padding: "0 22px",
      font: "var(--text-base)"
    },
    lg: {
      height: "var(--control-height-lg)",
      padding: "0 30px",
      font: "var(--text-md)"
    }
  };
  const variants = {
    primary: {
      background: "var(--color-primary)",
      color: "var(--color-on-primary)",
      border: "var(--border-width) solid var(--color-primary)"
    },
    secondary: {
      background: "var(--color-accent)",
      color: "var(--color-on-accent)",
      border: "var(--border-width) solid var(--color-accent)"
    },
    outline: {
      background: "transparent",
      color: "var(--text-brand)",
      border: "var(--border-width-thick) solid var(--color-primary)"
    },
    ghost: {
      background: "transparent",
      color: "var(--text-brand)",
      border: "var(--border-width-thick) solid transparent"
    },
    subtle: {
      background: "var(--color-primary-subtle)",
      color: "var(--text-brand)",
      border: "var(--border-width) solid var(--color-primary-subtle)"
    }
  };
  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.primary;
  const [hover, setHover] = React.useState(false);
  const hoverBg = {
    primary: "var(--color-primary-hover)",
    secondary: "var(--color-accent-hover)",
    outline: "var(--color-primary-subtle)",
    ghost: "var(--color-primary-subtle)",
    subtle: "var(--purple-100)"
  }[variant];
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "var(--space-2)",
      width: fullWidth ? "100%" : "auto",
      height: s.height,
      padding: s.padding,
      fontFamily: "var(--font-body)",
      fontSize: s.font,
      fontWeight: "var(--weight-semibold)",
      letterSpacing: "0.01em",
      lineHeight: 1,
      borderRadius: "var(--radius-md)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      transition: "background var(--transition), border-color var(--transition), transform var(--duration-fast) var(--ease-out)",
      transform: hover && !disabled ? "translateY(-1px)" : "none",
      ...v,
      ...(hover && !disabled ? {
        background: hoverBg,
        ...(variant === "outline" ? {} : {
          borderColor: hoverBg
        })
      } : {}),
      ...style
    }
  }, rest), iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      marginLeft: "-2px"
    }
  }, iconLeft), children, iconRight && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      marginRight: "-2px"
    }
  }, iconRight));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/buttons/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Square icon-only button. Pass a single icon element (e.g. a Lucide
 * <svg>) as children. Variants mirror <Button>.
 */
function IconButton({
  children,
  variant = "ghost",
  size = "md",
  disabled = false,
  label,
  style = {},
  ...rest
}) {
  const dim = {
    sm: 32,
    md: 42,
    lg: 52
  }[size] || 42;
  const variants = {
    primary: {
      background: "var(--color-primary)",
      color: "var(--color-on-primary)",
      border: "transparent"
    },
    secondary: {
      background: "var(--color-accent)",
      color: "var(--color-on-accent)",
      border: "transparent"
    },
    outline: {
      background: "transparent",
      color: "var(--text-brand)",
      border: "var(--color-primary)"
    },
    ghost: {
      background: "transparent",
      color: "var(--text-brand)",
      border: "transparent"
    }
  };
  const v = variants[variant] || variants.ghost;
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    title: label,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: dim,
      height: dim,
      borderRadius: "var(--radius-md)",
      background: hover && !disabled ? variant === "primary" ? "var(--color-primary-hover)" : variant === "secondary" ? "var(--color-accent-hover)" : "var(--color-primary-subtle)" : v.background,
      color: v.color,
      border: `var(--border-width-thick) solid ${v.border}`,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      transition: "background var(--transition), color var(--transition)",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/data/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** User / student avatar. Shows an image, else initials on brand purple. */
function Avatar({
  src,
  name = "",
  size = "md",
  ring = false,
  style = {},
  ...rest
}) {
  const dims = {
    xs: 24,
    sm: 32,
    md: 44,
    lg: 60,
    xl: 88
  };
  const d = dims[size] || dims.md;
  const initials = name.split(" ").map(w => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      width: d,
      height: d,
      flexShrink: 0,
      borderRadius: "var(--radius-full)",
      background: "var(--color-primary)",
      color: "var(--white)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-body)",
      fontWeight: "var(--weight-bold)",
      fontSize: d * 0.38,
      overflow: "hidden",
      border: ring ? "var(--border-width-thick) solid var(--color-accent)" : "none",
      boxShadow: ring ? "0 0 0 2px var(--surface-card)" : "none",
      ...style
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : /*#__PURE__*/React.createElement("span", null, initials || "?"));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/data/Breadcrumb.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Breadcrumb trail. `items` = [{ label, href? }]; last is current. */
function Breadcrumb({
  items = [],
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({
    "aria-label": "Breadcrumb",
    style: {
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("ol", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: "var(--space-2)",
      listStyle: "none",
      margin: 0,
      padding: 0
    }
  }, items.map((it, i) => {
    const last = i === items.length - 1;
    return /*#__PURE__*/React.createElement("li", {
      key: i,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-2)"
      }
    }, last ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-body)",
        fontSize: "var(--text-sm)",
        fontWeight: "var(--weight-semibold)",
        color: "var(--text-default)"
      }
    }, it.label) : /*#__PURE__*/React.createElement("a", {
      href: it.href || "#",
      style: {
        fontFamily: "var(--font-body)",
        fontSize: "var(--text-sm)",
        color: "var(--text-muted)"
      }
    }, it.label), !last && /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        color: "var(--neutral-400)",
        lineHeight: 0
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "m9 18 6-6-6-6"
    }))));
  })));
}
Object.assign(__ds_scope, { Breadcrumb });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Breadcrumb.jsx", error: String((e && e.message) || e) }); }

// components/data/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Surface container. `accent="top"` draws the brand gold rule across
 * the top edge; `variant="brand"` inverts to the purple surface.
 */
function Card({
  children,
  variant = "default",
  accent = "none",
  padded = true,
  hoverable = false,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const variants = {
    default: {
      background: "var(--surface-card)",
      color: "var(--text-body)",
      border: "var(--border-width) solid var(--border-subtle)"
    },
    sunken: {
      background: "var(--surface-sunken)",
      color: "var(--text-body)",
      border: "var(--border-width) solid var(--border-subtle)"
    },
    brand: {
      background: "var(--surface-brand)",
      color: "var(--text-inverse)",
      border: "var(--border-width) solid var(--purple-700)"
    }
  };
  const v = variants[variant] || variants.default;
  const accents = {
    none: {},
    top: {
      borderTop: "var(--border-width-accent) solid var(--color-accent)"
    },
    left: {
      borderLeft: "var(--border-width-accent) solid var(--color-accent)"
    }
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      borderRadius: "var(--radius-lg)",
      padding: padded ? "var(--space-6)" : 0,
      boxShadow: hoverable && hover ? "var(--shadow-lg)" : "var(--shadow-sm)",
      transform: hoverable && hover ? "translateY(-3px)" : "none",
      transition: "box-shadow var(--transition), transform var(--transition)",
      overflow: "hidden",
      ...v,
      ...accents[accent],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Card.jsx", error: String((e && e.message) || e) }); }

// components/data/StatCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Headline statistic block — the serif number with a gold-cap label. */
function StatCard({
  value,
  label,
  sublabel,
  align = "left",
  inverse = false,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      textAlign: align,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "var(--text-4xl)",
      fontWeight: "var(--weight-black)",
      lineHeight: 1,
      color: inverse ? "var(--white)" : "var(--text-brand)",
      letterSpacing: "var(--tracking-tight)"
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-2)",
      fontFamily: "var(--font-eyebrow)",
      fontSize: "var(--text-xs)",
      fontWeight: "var(--weight-bold)",
      letterSpacing: "var(--tracking-wider)",
      textTransform: "uppercase",
      color: "var(--text-accent)"
    }
  }, label), sublabel && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-1)",
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-sm)",
      color: "var(--text-muted)"
    }
  }, sublabel));
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/data/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Underlined tab strip. `items` = [{ id, label, icon? }].
 * Controlled via `value` + `onChange`, or uncontrolled with `defaultValue`.
 */
function Tabs({
  items = [],
  value,
  defaultValue,
  onChange,
  style = {},
  ...rest
}) {
  const [internal, setInternal] = React.useState(defaultValue ?? (items[0] && items[0].id));
  const active = value !== undefined ? value : internal;
  const select = id => {
    if (value === undefined) setInternal(id);
    onChange && onChange(id);
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tablist",
    style: {
      display: "flex",
      gap: "var(--space-6)",
      borderBottom: "var(--border-width) solid var(--border-subtle)",
      ...style
    }
  }, rest), items.map(it => {
    const on = it.id === active;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      role: "tab",
      "aria-selected": on,
      onClick: () => select(it.id),
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-2)",
        padding: "var(--space-3) 2px",
        marginBottom: -1,
        background: "transparent",
        border: 0,
        borderBottom: `var(--border-width-accent) solid ${on ? "var(--color-accent)" : "transparent"}`,
        fontFamily: "var(--font-body)",
        fontSize: "var(--text-base)",
        fontWeight: on ? "var(--weight-bold)" : "var(--weight-medium)",
        color: on ? "var(--text-brand)" : "var(--text-muted)",
        cursor: "pointer",
        transition: "color var(--transition), border-color var(--transition)"
      }
    }, it.icon && /*#__PURE__*/React.createElement("span", {
      style: {
        lineHeight: 0
      }
    }, it.icon), it.label);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Alert.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Inline message banner for announcements, deadlines, errors. */
function Alert({
  children,
  title,
  tone = "info",
  icon = null,
  onClose,
  style = {},
  ...rest
}) {
  const tones = {
    info: {
      fg: "var(--status-info-fg)",
      bg: "var(--status-info-bg)",
      bar: "var(--blue-500)"
    },
    success: {
      fg: "var(--status-success-fg)",
      bg: "var(--status-success-bg)",
      bar: "var(--green-500)"
    },
    warning: {
      fg: "var(--status-warning-fg)",
      bg: "var(--status-warning-bg)",
      bar: "var(--amber-500)"
    },
    danger: {
      fg: "var(--status-danger-fg)",
      bg: "var(--status-danger-bg)",
      bar: "var(--red-500)"
    },
    brand: {
      fg: "var(--purple-700)",
      bg: "var(--purple-50)",
      bar: "var(--color-primary)"
    }
  };
  const t = tones[tone] || tones.info;
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "status",
    style: {
      display: "flex",
      gap: "var(--space-3)",
      padding: "var(--space-4)",
      background: t.bg,
      borderRadius: "var(--radius-md)",
      borderLeft: `var(--border-width-accent) solid ${t.bar}`,
      color: t.fg,
      ...style
    }
  }, rest), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      marginTop: 1,
      lineHeight: 0
    }
  }, icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontWeight: "var(--weight-bold)",
      fontSize: "var(--text-base)",
      marginBottom: children ? "var(--space-1)" : 0
    }
  }, title), children && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-sm)",
      color: "var(--text-body)",
      lineHeight: "var(--leading-normal)"
    }
  }, children)), onClose && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "Dismiss",
    style: {
      border: 0,
      background: "transparent",
      color: "currentColor",
      cursor: "pointer",
      lineHeight: 0,
      opacity: 0.7,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6 6 18M6 6l12 12"
  }))));
}
Object.assign(__ds_scope, { Alert });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Alert.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Small status pill. */
function Badge({
  children,
  tone = "neutral",
  solid = false,
  style = {},
  ...rest
}) {
  const tones = {
    neutral: {
      fg: "var(--neutral-700)",
      bg: "var(--neutral-100)",
      solidBg: "var(--neutral-700)"
    },
    brand: {
      fg: "var(--purple-700)",
      bg: "var(--purple-50)",
      solidBg: "var(--color-primary)"
    },
    accent: {
      fg: "var(--gold-700)",
      bg: "var(--gold-50)",
      solidBg: "var(--color-accent)"
    },
    success: {
      fg: "var(--status-success-fg)",
      bg: "var(--status-success-bg)",
      solidBg: "var(--green-500)"
    },
    warning: {
      fg: "var(--status-warning-fg)",
      bg: "var(--status-warning-bg)",
      solidBg: "var(--amber-500)"
    },
    danger: {
      fg: "var(--status-danger-fg)",
      bg: "var(--status-danger-bg)",
      solidBg: "var(--red-500)"
    },
    info: {
      fg: "var(--status-info-fg)",
      bg: "var(--status-info-bg)",
      solidBg: "var(--blue-500)"
    }
  };
  const t = tones[tone] || tones.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-1)",
      padding: "3px 10px",
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-xs)",
      fontWeight: "var(--weight-bold)",
      letterSpacing: "var(--tracking-wide)",
      textTransform: "uppercase",
      lineHeight: 1.4,
      borderRadius: "var(--radius-full)",
      color: solid ? "var(--white)" : t.fg,
      background: solid ? t.solidBg : t.bg,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Badge.jsx", error: String((e && e.message) || e) }); }

// components/feedback/ProgressBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Linear progress / completion meter (course progress, GPA, etc.). */
function ProgressBar({
  value = 0,
  max = 100,
  tone = "brand",
  showLabel = false,
  size = "md",
  style = {},
  ...rest
}) {
  const pct = Math.max(0, Math.min(100, value / max * 100));
  const fills = {
    brand: "var(--color-primary)",
    accent: "var(--color-accent)",
    success: "var(--green-500)"
  };
  const heights = {
    sm: 6,
    md: 10,
    lg: 14
  };
  const h = heights[size] || heights.md;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-3)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: h,
      background: "var(--neutral-200)",
      borderRadius: "var(--radius-full)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: pct + "%",
      height: "100%",
      background: fills[tone] || fills.brand,
      borderRadius: "var(--radius-full)",
      transition: "width var(--duration-slow) var(--ease-out)"
    }
  })), showLabel && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-data)",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-semibold)",
      color: "var(--text-muted)",
      minWidth: 38,
      textAlign: "right"
    }
  }, Math.round(pct), "%"));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Subject / category tag. Optional onRemove renders a × control. */
function Tag({
  children,
  tone = "neutral",
  onRemove,
  style = {},
  ...rest
}) {
  const tones = {
    neutral: {
      fg: "var(--neutral-700)",
      bg: "var(--neutral-100)",
      bd: "var(--neutral-200)"
    },
    brand: {
      fg: "var(--purple-700)",
      bg: "var(--purple-50)",
      bd: "var(--purple-200)"
    },
    accent: {
      fg: "var(--gold-700)",
      bg: "var(--gold-50)",
      bd: "var(--gold-200)"
    }
  };
  const t = tones[tone] || tones.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-2)",
      padding: "5px 12px",
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-medium)",
      lineHeight: 1.3,
      color: t.fg,
      background: t.bg,
      border: `var(--border-width) solid ${t.bd}`,
      borderRadius: "var(--radius-sm)",
      ...style
    }
  }, rest), children, onRemove && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onRemove,
    "aria-label": "Remove",
    style: {
      display: "inline-flex",
      border: 0,
      background: "transparent",
      color: "currentColor",
      cursor: "pointer",
      padding: 0,
      opacity: 0.7,
      lineHeight: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6 6 18M6 6l12 12"
  }))));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tag.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Checkbox with brand-purple checked fill. */
function Checkbox({
  checked,
  defaultChecked,
  onChange,
  label,
  disabled = false,
  style = {},
  ...rest
}) {
  const [internal, setInternal] = React.useState(defaultChecked || false);
  const on = checked !== undefined ? checked : internal;
  const toggle = () => {
    if (disabled) return;
    if (checked === undefined) setInternal(!on);
    onChange && onChange(!on);
  };
  return /*#__PURE__*/React.createElement("label", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-3)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.6 : 1,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    onClick: toggle,
    role: "checkbox",
    "aria-checked": on,
    style: {
      width: 20,
      height: 20,
      flexShrink: 0,
      borderRadius: "var(--radius-sm)",
      background: on ? "var(--color-primary)" : "var(--surface-card)",
      border: `var(--border-width-thick) solid ${on ? "var(--color-primary)" : "var(--border-strong)"}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background var(--transition), border-color var(--transition)"
    }
  }, on && /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "white",
    strokeWidth: "3.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6 9 17l-5-5"
  }))), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-base)",
      color: "var(--text-body)"
    }
  }, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Form field wrapper: label + optional hint/error around any control. */
function Field({
  label,
  htmlFor,
  hint,
  error,
  required = false,
  children,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)",
      ...style
    }
  }, rest), label && /*#__PURE__*/React.createElement("label", {
    htmlFor: htmlFor,
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-semibold)",
      color: "var(--text-default)"
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--red-500)",
      marginLeft: 4
    }
  }, "*")), children, error ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-sm)",
      color: "var(--status-danger-fg)"
    }
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-sm)",
      color: "var(--text-muted)"
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Text input. Pass `invalid` for the error state; `iconLeft` for adornment. */
function Input({
  size = "md",
  invalid = false,
  iconLeft = null,
  disabled = false,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const heights = {
    sm: "var(--control-height-sm)",
    md: "var(--control-height-md)",
    lg: "var(--control-height-lg)"
  };
  const border = invalid ? "var(--red-500)" : focus ? "var(--color-primary)" : "var(--border-default)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      width: "100%"
    }
  }, iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 12,
      color: "var(--text-subtle)",
      lineHeight: 0,
      pointerEvents: "none"
    }
  }, iconLeft), /*#__PURE__*/React.createElement("input", _extends({
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: "100%",
      height: heights[size] || heights.md,
      padding: iconLeft ? "0 14px 0 38px" : "0 14px",
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-base)",
      color: "var(--text-default)",
      background: disabled ? "var(--neutral-100)" : "var(--surface-card)",
      border: `var(--border-width) solid ${border}`,
      borderRadius: "var(--radius-md)",
      outline: "none",
      boxShadow: focus ? invalid ? "0 0 0 3px rgba(192,57,43,.18)" : "var(--shadow-focus)" : "none",
      transition: "border-color var(--transition), box-shadow var(--transition)",
      opacity: disabled ? 0.6 : 1,
      ...style
    }
  }, rest)));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Radio group. `options` = [{value,label}]; controlled via value/onChange. */
function Radio({
  options = [],
  value,
  defaultValue,
  onChange,
  name,
  disabled = false,
  style = {},
  ...rest
}) {
  const [internal, setInternal] = React.useState(defaultValue);
  const sel = value !== undefined ? value : internal;
  const select = v => {
    if (disabled) return;
    if (value === undefined) setInternal(v);
    onChange && onChange(v);
  };
  const norm = options.map(o => typeof o === "string" ? {
    value: o,
    label: o
  } : o);
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "radiogroup",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)",
      ...style
    }
  }, rest), norm.map(o => {
    const on = o.value === sel;
    return /*#__PURE__*/React.createElement("label", {
      key: o.value,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-3)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1
      }
    }, /*#__PURE__*/React.createElement("span", {
      onClick: () => select(o.value),
      role: "radio",
      "aria-checked": on,
      style: {
        width: 20,
        height: 20,
        flexShrink: 0,
        borderRadius: "var(--radius-full)",
        border: `var(--border-width-thick) solid ${on ? "var(--color-primary)" : "var(--border-strong)"}`,
        background: "var(--surface-card)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "border-color var(--transition)"
      }
    }, on && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 10,
        height: 10,
        borderRadius: "var(--radius-full)",
        background: "var(--color-primary)"
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-body)",
        fontSize: "var(--text-base)",
        color: "var(--text-body)"
      }
    }, o.label));
  }));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Native select styled to match the brand. `options` = [{value,label}] or strings. */
function Select({
  options = [],
  size = "md",
  invalid = false,
  disabled = false,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const heights = {
    sm: "var(--control-height-sm)",
    md: "var(--control-height-md)",
    lg: "var(--control-height-lg)"
  };
  const border = invalid ? "var(--red-500)" : focus ? "var(--color-primary)" : "var(--border-default)";
  const norm = options.map(o => typeof o === "string" ? {
    value: o,
    label: o
  } : o);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: "100%",
      height: heights[size] || heights.md,
      padding: "0 40px 0 14px",
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-base)",
      color: "var(--text-default)",
      background: disabled ? "var(--neutral-100)" : "var(--surface-card)",
      border: `var(--border-width) solid ${border}`,
      borderRadius: "var(--radius-md)",
      outline: "none",
      appearance: "none",
      cursor: disabled ? "not-allowed" : "pointer",
      boxShadow: focus ? "var(--shadow-focus)" : "none",
      transition: "border-color var(--transition), box-shadow var(--transition)",
      ...style
    }
  }, rest), norm.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label))), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: 14,
      top: "50%",
      transform: "translateY(-50%)",
      color: "var(--text-muted)",
      pointerEvents: "none",
      lineHeight: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m6 9 6 6 6-6"
  }))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Toggle switch. Track turns gold when on. */
function Switch({
  checked,
  defaultChecked,
  onChange,
  label,
  disabled = false,
  style = {},
  ...rest
}) {
  const [internal, setInternal] = React.useState(defaultChecked || false);
  const on = checked !== undefined ? checked : internal;
  const toggle = () => {
    if (disabled) return;
    if (checked === undefined) setInternal(!on);
    onChange && onChange(!on);
  };
  return /*#__PURE__*/React.createElement("label", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-3)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.6 : 1,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    onClick: toggle,
    role: "switch",
    "aria-checked": on,
    style: {
      width: 44,
      height: 26,
      flexShrink: 0,
      borderRadius: "var(--radius-full)",
      background: on ? "var(--color-accent)" : "var(--neutral-300)",
      padding: 3,
      display: "flex",
      alignItems: "center",
      transition: "background var(--transition)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: "var(--radius-full)",
      background: "var(--white)",
      boxShadow: "var(--shadow-sm)",
      transform: on ? "translateX(18px)" : "translateX(0)",
      transition: "transform var(--transition)"
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-base)",
      color: "var(--text-body)"
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Multi-line text input. */
function Textarea({
  invalid = false,
  rows = 4,
  disabled = false,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const border = invalid ? "var(--red-500)" : focus ? "var(--color-primary)" : "var(--border-default)";
  return /*#__PURE__*/React.createElement("textarea", _extends({
    rows: rows,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: "100%",
      padding: "10px 14px",
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-base)",
      lineHeight: "var(--leading-normal)",
      color: "var(--text-default)",
      background: disabled ? "var(--neutral-100)" : "var(--surface-card)",
      border: `var(--border-width) solid ${border}`,
      borderRadius: "var(--radius-md)",
      outline: "none",
      resize: "vertical",
      boxShadow: focus ? invalid ? "0 0 0 3px rgba(192,57,43,.18)" : "var(--shadow-focus)" : "none",
      transition: "border-color var(--transition), box-shadow var(--transition)",
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// ui_kits/image-slot.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
/* BEGIN USAGE */
/**
 * <image-slot> — user-fillable image placeholder.
 *
 * Drop this into a deck, mockup, or page wherever you want the user to
 * supply an image. You control the slot's shape and size; the user fills it
 * by dragging an image file onto it (or clicking to browse). The dropped
 * image persists across reloads via a .image-slots.state.json sidecar —
 * same read-via-fetch / write-via-window.omelette pattern as
 * design_canvas.jsx, so the filled slot shows on share links, downloaded
 * zips, and PPTX export. Outside the omelette runtime the slot is read-only.
 *
 * The host bridge only allows sidecar writes at the project root, so the
 * HTML that uses this component is assumed to live at the project root too
 * (same constraint as design_canvas.jsx).
 *
 * Attributes:
 *   id           Persistence key. REQUIRED for the drop to survive reload —
 *                every slot on the page needs a distinct id.
 *   shape        'rect' | 'rounded' | 'circle' | 'pill'   (default 'rounded')
 *                'circle' applies 50% border-radius; on a non-square slot
 *                that's an ellipse — set equal width and height for a true
 *                circle.
 *   radius       Corner radius in px for 'rounded'.       (default 12)
 *   mask         Any CSS clip-path value. Overrides `shape` — use this for
 *                hexagons, blobs, arbitrary polygons.
 *   fit          object-fit: cover | contain | fill.       (default 'cover')
 *                With cover (the default) double-clicking the filled slot
 *                enters a reframe mode: the whole image spills past the mask
 *                (translucent outside, opaque inside), drag to reposition,
 *                corner-drag to scale. The crop persists alongside the image
 *                in the sidecar. contain/fill stay static.
 *   position     object-position for fit=contain|fill.     (default '50% 50%')
 *   placeholder  Empty-state caption.                      (default 'Drop an image')
 *   src          Optional initial/fallback image URL. A user drop overrides
 *                it; clearing the drop reveals src again.
 *
 * Size and layout come from ordinary CSS on the element — width/height
 * inline or from a parent grid — so it composes with any layout.
 *
 * Usage:
 *   <image-slot id="hero"   style="width:800px;height:450px" shape="rounded" radius="20"
 *               placeholder="Drop a hero image"></image-slot>
 *   <image-slot id="avatar" style="width:120px;height:120px" shape="circle"></image-slot>
 *   <image-slot id="kite"   style="width:300px;height:300px"
 *               mask="polygon(50% 0, 100% 50%, 50% 100%, 0 50%)"></image-slot>
 */
/* END USAGE */

(() => {
  const STATE_FILE = '.image-slots.state.json';
  // 2× a ~600px slot in a 1920-wide deck — retina-sharp without making the
  // sidecar enormous. A 1200px WebP at q=0.85 is ~150-300KB.
  const MAX_DIM = 1200;
  // Raster formats only. SVG is excluded (can carry script; createImageBitmap
  // on SVG blobs is inconsistent). GIF is excluded because the canvas
  // re-encode keeps only the first frame, so an animated GIF would silently
  // go still — better to reject than surprise.
  const ACCEPT = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'];

  // ── Shared sidecar store ────────────────────────────────────────────────
  // One fetch + immediate write-on-change for every <image-slot> on the
  // page. Reads via fetch() so viewing works anywhere the HTML and sidecar
  // are served together; writes go through window.omelette.writeFile, which
  // the host allowlists to *.state.json basenames only.
  const subs = new Set();
  let slots = {};
  // ids explicitly cleared before the sidecar fetch resolved — otherwise
  // the merge below can't tell "never set" from "just deleted" and would
  // resurrect the sidecar's stale value.
  const tombstones = new Set();
  let loaded = false;
  let loadP = null;
  function load() {
    if (loadP) return loadP;
    loadP = fetch(STATE_FILE).then(r => r.ok ? r.json() : null).then(j => {
      // Merge: sidecar loses to any in-memory change that raced ahead of
      // the fetch (drop or clear) so neither is clobbered by hydration.
      if (j && typeof j === 'object') {
        const merged = Object.assign({}, j, slots);
        // A framing-only write that raced ahead of hydration must not
        // drop a user image that's only on disk — inherit u from the
        // sidecar for any in-memory entry that lacks one.
        for (const k in slots) {
          if (merged[k] && !merged[k].u && j[k]) {
            merged[k].u = typeof j[k] === 'string' ? j[k] : j[k].u;
          }
        }
        for (const id of tombstones) delete merged[id];
        slots = merged;
      }
      tombstones.clear();
    }).catch(() => {}).then(() => {
      loaded = true;
      subs.forEach(fn => fn());
    });
    return loadP;
  }

  // Serialize writes so two near-simultaneous drops on different slots
  // can't reorder at the backend and leave the sidecar with only the
  // first. A save requested mid-flight just marks dirty and re-fires on
  // completion with the then-current slots.
  let saving = false;
  let saveDirty = false;
  function save() {
    if (saving) {
      saveDirty = true;
      return;
    }
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    saving = true;
    Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {}).then(() => {
      saving = false;
      if (saveDirty) {
        saveDirty = false;
        save();
      }
    });
  }
  const S_MAX = 5;
  const clampS = s => Math.max(1, Math.min(S_MAX, s));

  // Normalize a stored slot value. Pre-reframe sidecars stored a bare
  // data-URL string; newer ones store {u, s, x, y}. Either shape is valid.
  function getSlot(id) {
    const v = slots[id];
    if (!v) return null;
    return typeof v === 'string' ? {
      u: v,
      s: 1,
      x: 0,
      y: 0
    } : v;
  }
  function setSlot(id, val) {
    if (!id) return;
    if (val) {
      slots[id] = val;
      tombstones.delete(id);
    } else {
      delete slots[id];
      if (!loaded) tombstones.add(id);
    }
    subs.forEach(fn => fn());
    // A drop is rare + high-value — write immediately so nav-away can't lose
    // it. Gate on the initial read so we don't overwrite a sidecar we haven't
    // merged yet; the merge in load() keeps this change once the read lands.
    if (loaded) save();else load().then(save);
  }

  // ── Image downscale ─────────────────────────────────────────────────────
  // Encode through a canvas so the sidecar carries resized bytes, not the
  // raw upload. Longest side is capped at 2× the slot's rendered width
  // (retina) and at MAX_DIM. WebP keeps alpha and is ~10× smaller than PNG
  // for photos, so there's no need for per-image format picking.
  async function toDataUrl(file, targetW) {
    const bitmap = await createImageBitmap(file);
    try {
      const cap = Math.min(MAX_DIM, Math.max(1, Math.round(targetW * 2)) || MAX_DIM);
      const scale = Math.min(1, cap / Math.max(bitmap.width, bitmap.height));
      const w = Math.max(1, Math.round(bitmap.width * scale));
      const h = Math.max(1, Math.round(bitmap.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(bitmap, 0, 0, w, h);
      return canvas.toDataURL('image/webp', 0.85);
    } finally {
      bitmap.close && bitmap.close();
    }
  }

  // ── Custom element ──────────────────────────────────────────────────────
  const stylesheet = ':host{display:inline-block;position:relative;vertical-align:top;' + '  font:13px/1.3 system-ui,-apple-system,sans-serif;color:rgba(0,0,0,.55);width:240px;height:160px}' + '.frame{position:absolute;inset:0;overflow:hidden;background:rgba(0,0,0,.04)}' +
  // .frame img (clipped) and .spill (unclipped ghost + handles) share the
  // same left/top/width/height in frame-%, computed by _applyView(), so the
  // inside-mask crop and the outside-mask spill stay pixel-aligned.
  '.frame img{position:absolute;max-width:none;transform:translate(-50%,-50%);' + '  -webkit-user-drag:none;user-select:none;touch-action:none}' +
  // Reframe mode (double-click): the full image spills past the mask. The
  // spill layer is sized to the IMAGE bounds so its corners are where the
  // resize handles belong. The ghost <img> inside is translucent; the real
  // clipped <img> underneath shows the opaque in-mask crop.
  '.spill{position:absolute;transform:translate(-50%,-50%);display:none;z-index:1;' + '  cursor:grab;touch-action:none}' + ':host([data-panning]) .spill{cursor:grabbing}' + '.spill .ghost{position:absolute;inset:0;width:100%;height:100%;opacity:.35;' + '  pointer-events:none;-webkit-user-drag:none;user-select:none;' + '  box-shadow:0 0 0 1px rgba(0,0,0,.2),0 12px 32px rgba(0,0,0,.2)}' + '.spill .handle{position:absolute;width:12px;height:12px;border-radius:50%;' + '  background:#fff;box-shadow:0 0 0 1.5px #c96442,0 1px 3px rgba(0,0,0,.3);' + '  transform:translate(-50%,-50%)}' + '.spill .handle[data-c=nw]{left:0;top:0;cursor:nwse-resize}' + '.spill .handle[data-c=ne]{left:100%;top:0;cursor:nesw-resize}' + '.spill .handle[data-c=sw]{left:0;top:100%;cursor:nesw-resize}' + '.spill .handle[data-c=se]{left:100%;top:100%;cursor:nwse-resize}' + ':host([data-reframe]){z-index:10}' + ':host([data-reframe]) .spill{display:block}' + ':host([data-reframe]) .frame{box-shadow:0 0 0 2px #c96442}' + '.empty{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  cursor:pointer;user-select:none}' + '.empty svg{opacity:.45}' + '.empty .cap{max-width:90%;font-weight:500;letter-spacing:.01em}' + '.empty .sub{font-size:11px}' + '.empty .sub u{text-underline-offset:2px;text-decoration-color:rgba(0,0,0,.25)}' + '.empty:hover .sub u{color:rgba(0,0,0,.75);text-decoration-color:currentColor}' + ':host([data-over]) .frame{outline:2px solid #c96442;outline-offset:-2px;' + '  background:rgba(201,100,66,.10)}' + '.ring{position:absolute;inset:0;pointer-events:none;border:1.5px dashed rgba(0,0,0,.25);' + '  transition:border-color .12s}' + ':host([data-over]) .ring{border-color:#c96442}' + ':host([data-filled]) .ring{display:none}' +
  // Controls sit BELOW the mask (top:100%), absolutely positioned so the
  // author-declared slot height is unaffected. The gap is padding, not a
  // top offset, so the hover target stays contiguous with the frame.
  '.ctl{position:absolute;top:100%;left:50%;transform:translateX(-50%);padding-top:8px;' + '  display:flex;gap:6px;opacity:0;pointer-events:none;transition:opacity .12s;z-index:2;' + '  white-space:nowrap}' + ':host([data-filled][data-editable]:hover) .ctl,:host([data-reframe]) .ctl' + '  {opacity:1;pointer-events:auto}' + '.ctl button{appearance:none;border:0;border-radius:6px;padding:5px 10px;cursor:pointer;' + '  background:rgba(0,0,0,.65);color:#fff;font:11px/1 system-ui,-apple-system,sans-serif;' + '  backdrop-filter:blur(6px)}' + '.ctl button:hover{background:rgba(0,0,0,.8)}' + '.err{position:absolute;left:8px;bottom:8px;right:8px;color:#b3261e;font-size:11px;' + '  background:rgba(255,255,255,.85);padding:4px 6px;border-radius:5px;pointer-events:none}';
  const icon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>' + '<path d="m21 15-5-5L5 21"/></svg>';
  class ImageSlot extends HTMLElement {
    static get observedAttributes() {
      return ['shape', 'radius', 'mask', 'fit', 'position', 'placeholder', 'src', 'id'];
    }
    constructor() {
      super();
      const root = this.attachShadow({
        mode: 'open'
      });
      // .spill and .ctl sit OUTSIDE .frame so overflow:hidden + border-radius
      // on the frame (circle, pill, rounded) can't clip them.
      root.innerHTML = '<style>' + stylesheet + '</style>' + '<div class="frame" part="frame">' + '  <img part="image" alt="" draggable="false" style="display:none">' + '  <div class="empty" part="empty">' + icon + '    <div class="cap"></div>' + '    <div class="sub">or <u>browse files</u></div></div>' + '  <div class="ring" part="ring"></div>' + '</div>' + '<div class="spill">' + '  <img class="ghost" alt="" draggable="false">' + '  <div class="handle" data-c="nw"></div><div class="handle" data-c="ne"></div>' + '  <div class="handle" data-c="sw"></div><div class="handle" data-c="se"></div>' + '</div>' + '<div class="ctl"><button data-act="replace" title="Replace image">Replace</button>' + '  <button data-act="clear" title="Remove image">Remove</button></div>' + '<input type="file" accept="' + ACCEPT.join(',') + '" hidden>';
      this._frame = root.querySelector('.frame');
      this._ring = root.querySelector('.ring');
      this._img = root.querySelector('.frame img');
      this._empty = root.querySelector('.empty');
      this._cap = root.querySelector('.cap');
      this._sub = root.querySelector('.sub');
      this._spill = root.querySelector('.spill');
      this._ghost = root.querySelector('.ghost');
      this._err = null;
      this._input = root.querySelector('input');
      this._depth = 0;
      this._gen = 0;
      this._view = {
        s: 1,
        x: 0,
        y: 0
      };
      this._subFn = () => this._render();
      // Shadow-DOM listeners live with the shadow DOM — bound once here so
      // disconnect/reconnect (e.g. React remount) doesn't stack handlers.
      this._empty.addEventListener('click', () => this._input.click());
      root.addEventListener('click', e => {
        const act = e.target && e.target.getAttribute && e.target.getAttribute('data-act');
        if (act === 'replace') {
          this._exitReframe(true);
          this._input.click();
        }
        if (act === 'clear') {
          this._exitReframe(false);
          this._gen++;
          this._local = null;
          if (this.id) setSlot(this.id, null);else this._render();
        }
      });
      this._input.addEventListener('change', () => {
        const f = this._input.files && this._input.files[0];
        if (f) this._ingest(f);
        this._input.value = '';
      });
      // naturalWidth/Height aren't known until load — re-apply so the cover
      // baseline is computed from real dimensions, not the 100%×100% fallback.
      this._img.addEventListener('load', () => this._applyView());
      // Gated on editable + fit=cover so share links and contain/fill slots
      // stay static.
      this.addEventListener('dblclick', e => {
        if (!this.hasAttribute('data-editable') || !this._reframes()) return;
        e.preventDefault();
        if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
      });
      // Pan + resize both originate on the spill layer. A handle pointerdown
      // drives an aspect-locked resize anchored at the opposite corner; any
      // other pointerdown on the spill pans. Offsets are frame-% so a
      // reframed slot survives responsive resize / PPTX export.
      this._spill.addEventListener('pointerdown', e => {
        if (e.button !== 0 || !this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        e.stopPropagation();
        this._spill.setPointerCapture(e.pointerId);
        const rect = this.getBoundingClientRect();
        const fw = rect.width || 1,
          fh = rect.height || 1;
        const corner = e.target.getAttribute && e.target.getAttribute('data-c');
        let move;
        if (corner) {
          // Resize about the OPPOSITE corner. Viewport-px throughout (rect
          // fw/fh, not clientWidth) so the math survives a transform:scale()
          // ancestor — deck_stage renders slides scaled-to-fit.
          const iw = this._img.naturalWidth || 1,
            ih = this._img.naturalHeight || 1;
          const base = Math.max(fw / iw, fh / ih);
          const sx = corner.includes('e') ? 1 : -1;
          const sy = corner.includes('s') ? 1 : -1;
          const s0 = this._view.s;
          const w0 = iw * base * s0,
            h0 = ih * base * s0;
          const cx0 = (50 + this._view.x) / 100 * fw;
          const cy0 = (50 + this._view.y) / 100 * fh;
          const ox = cx0 - sx * w0 / 2,
            oy = cy0 - sy * h0 / 2;
          const diag0 = Math.hypot(w0, h0);
          const ux = sx * w0 / diag0,
            uy = sy * h0 / diag0;
          move = ev => {
            const proj = (ev.clientX - rect.left - ox) * ux + (ev.clientY - rect.top - oy) * uy;
            const s = clampS(s0 * proj / diag0);
            const d = diag0 * s / s0;
            this._view.s = s;
            this._view.x = (ox + ux * d / 2) / fw * 100 - 50;
            this._view.y = (oy + uy * d / 2) / fh * 100 - 50;
            this._clampView();
            this._applyView();
          };
        } else {
          this.setAttribute('data-panning', '');
          const start = {
            px: e.clientX,
            py: e.clientY,
            x: this._view.x,
            y: this._view.y
          };
          move = ev => {
            this._view.x = start.x + (ev.clientX - start.px) / fw * 100;
            this._view.y = start.y + (ev.clientY - start.py) / fh * 100;
            this._clampView();
            this._applyView();
          };
        }
        const up = () => {
          try {
            this._spill.releasePointerCapture(e.pointerId);
          } catch {}
          this._spill.removeEventListener('pointermove', move);
          this._spill.removeEventListener('pointerup', up);
          this._spill.removeEventListener('pointercancel', up);
          this.removeAttribute('data-panning');
          this._dragUp = null;
        };
        // Stashed so _exitReframe (Escape / outside-click mid-drag) can
        // tear the capture + listeners down synchronously.
        this._dragUp = up;
        this._spill.addEventListener('pointermove', move);
        this._spill.addEventListener('pointerup', up);
        this._spill.addEventListener('pointercancel', up);
      });
      // Wheel zoom stays available inside reframe mode as a trackpad nicety —
      // zooms toward the cursor (offset' = cursor·(1-k) + offset·k).
      this.addEventListener('wheel', e => {
        if (!this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        const r = this.getBoundingClientRect();
        const cx = (e.clientX - r.left) / r.width * 100 - 50;
        const cy = (e.clientY - r.top) / r.height * 100 - 50;
        const prev = this._view.s;
        const next = clampS(prev * Math.pow(1.0015, -e.deltaY));
        if (next === prev) return;
        const k = next / prev;
        this._view.s = next;
        this._view.x = cx * (1 - k) + this._view.x * k;
        this._view.y = cy * (1 - k) + this._view.y * k;
        this._clampView();
        this._applyView();
      }, {
        passive: false
      });
    }
    connectedCallback() {
      // Warn once per page — an id-less slot works for the session but
      // cannot persist, and two id-less slots would share nothing.
      if (!this.id && !ImageSlot._warned) {
        ImageSlot._warned = true;
        console.warn('<image-slot> without an id will not persist its dropped image.');
      }
      this.addEventListener('dragenter', this);
      this.addEventListener('dragover', this);
      this.addEventListener('dragleave', this);
      this.addEventListener('drop', this);
      subs.add(this._subFn);
      // width%/height% in _applyView encode the frame aspect at call time —
      // a host resize (responsive grid, pane divider) would stretch the
      // image until the next _render. Re-render on size change: _render()
      // re-seeds _view from stored before clamp/apply, so a shrink→grow
      // cycle round-trips instead of ratcheting x/y toward the narrower
      // frame's clamp range.
      this._ro = new ResizeObserver(() => this._render());
      this._ro.observe(this);
      load();
      this._render();
    }
    disconnectedCallback() {
      subs.delete(this._subFn);
      this.removeEventListener('dragenter', this);
      this.removeEventListener('dragover', this);
      this.removeEventListener('dragleave', this);
      this.removeEventListener('drop', this);
      if (this._ro) {
        this._ro.disconnect();
        this._ro = null;
      }
      this._exitReframe(false);
    }
    _enterReframe() {
      if (this.hasAttribute('data-reframe')) return;
      this.setAttribute('data-reframe', '');
      this._applyView();
      // Close on click outside (the spill handler stopPropagation()s so
      // in-image drags don't reach this) and on Escape. Listeners are held
      // on the instance so _exitReframe / disconnectedCallback can detach
      // exactly what was attached.
      this._outside = e => {
        if (e.composedPath && e.composedPath().includes(this)) return;
        this._exitReframe(true);
      };
      this._esc = e => {
        if (e.key === 'Escape') this._exitReframe(true);
      };
      document.addEventListener('pointerdown', this._outside, true);
      document.addEventListener('keydown', this._esc, true);
    }
    _exitReframe(commit) {
      if (!this.hasAttribute('data-reframe')) return;
      if (this._dragUp) this._dragUp();
      this.removeAttribute('data-reframe');
      this.removeAttribute('data-panning');
      if (this._outside) document.removeEventListener('pointerdown', this._outside, true);
      if (this._esc) document.removeEventListener('keydown', this._esc, true);
      this._outside = this._esc = null;
      if (commit) this._commitView();
    }
    attributeChangedCallback() {
      if (this.shadowRoot) this._render();
    }

    // handleEvent — one listener object for all four drag events keeps the
    // add/remove symmetric and the depth counter correct.
    handleEvent(e) {
      if (e.type === 'dragenter' || e.type === 'dragover') {
        // Without preventDefault the browser never fires 'drop'.
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
        if (e.type === 'dragenter') this._depth++;
        this.setAttribute('data-over', '');
      } else if (e.type === 'dragleave') {
        // dragenter/leave fire for every descendant crossing — count depth
        // so hovering the icon inside the empty state doesn't flicker.
        if (--this._depth <= 0) {
          this._depth = 0;
          this.removeAttribute('data-over');
        }
      } else if (e.type === 'drop') {
        e.preventDefault();
        e.stopPropagation();
        this._depth = 0;
        this.removeAttribute('data-over');
        const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (f) this._ingest(f);
      }
    }
    async _ingest(file) {
      this._setError(null);
      if (!file || ACCEPT.indexOf(file.type) < 0) {
        this._setError('Drop a PNG, JPEG, WebP, or AVIF image.');
        return;
      }
      // toDataUrl can take hundreds of ms on a large photo. A Clear or a
      // newer drop during that window would be clobbered when this await
      // resumes — bump + capture a generation so stale encodes bail.
      const gen = ++this._gen;
      try {
        const w = this.clientWidth || this.offsetWidth || MAX_DIM;
        const url = await toDataUrl(file, w);
        if (gen !== this._gen) return;
        // Only exit reframe once the new image is in hand — a rejected type
        // or decode failure leaves the in-progress crop untouched.
        this._exitReframe(false);
        const val = {
          u: url,
          s: 1,
          x: 0,
          y: 0
        };
        setSlot(this.id || '', val);
        // Keep a session-local copy for id-less slots so the drop still
        // shows, even though it cannot persist.
        if (!this.id) {
          this._local = val;
          this._render();
        }
      } catch (err) {
        if (gen !== this._gen) return;
        this._setError('Could not read that image.');
        console.warn('<image-slot> ingest failed:', err);
      }
    }
    _setError(msg) {
      if (this._err) {
        this._err.remove();
        this._err = null;
      }
      if (!msg) return;
      const d = document.createElement('div');
      d.className = 'err';
      d.textContent = msg;
      this.shadowRoot.appendChild(d);
      this._err = d;
      setTimeout(() => {
        if (this._err === d) {
          d.remove();
          this._err = null;
        }
      }, 3000);
    }

    // Reframing (pan/resize) is only meaningful for fit=cover — contain/fill
    // keep the old object-fit path and double-click is a no-op.
    _reframes() {
      return this.hasAttribute('data-filled') && (this.getAttribute('fit') || 'cover') === 'cover';
    }

    // Cover-baseline geometry, shared by clamp/apply/resize. Null until the
    // img has loaded (naturalWidth is 0 before that) or when the slot has no
    // layout box — ResizeObserver fires with a 0×0 rect under display:none,
    // and clamping against a degenerate 1×1 frame would silently pull the
    // stored pan toward zero.
    _geom() {
      const iw = this._img.naturalWidth,
        ih = this._img.naturalHeight;
      const fw = this.clientWidth,
        fh = this.clientHeight;
      if (!iw || !ih || !fw || !fh) return null;
      return {
        iw,
        ih,
        fw,
        fh,
        base: Math.max(fw / iw, fh / ih)
      };
    }
    _clampView() {
      // Pan range on each axis is half the overflow past the frame edge.
      const g = this._geom();
      if (!g) return;
      const mx = Math.max(0, (g.iw * g.base * this._view.s / g.fw - 1) * 50);
      const my = Math.max(0, (g.ih * g.base * this._view.s / g.fh - 1) * 50);
      this._view.x = Math.max(-mx, Math.min(mx, this._view.x));
      this._view.y = Math.max(-my, Math.min(my, this._view.y));
    }
    _applyView() {
      const g = this._geom();
      const fit = this.getAttribute('fit') || 'cover';
      if (fit !== 'cover' || !g) {
        // Non-cover, or dimensions not known yet (before img load).
        this._img.style.width = '100%';
        this._img.style.height = '100%';
        this._img.style.left = '50%';
        this._img.style.top = '50%';
        this._img.style.objectFit = fit;
        this._img.style.objectPosition = this.getAttribute('position') || '50% 50%';
        return;
      }
      // Cover baseline: img fills the frame on its tighter axis at s=1, so
      // pan works immediately on the overflowing axis without zooming first.
      // Width/height and left/top are all frame-% — depends only on the
      // frame aspect ratio, so a responsive resize keeps the same crop. The
      // spill layer mirrors the same box so its corners = image corners.
      const k = g.base * this._view.s;
      const w = g.iw * k / g.fw * 100 + '%';
      const h = g.ih * k / g.fh * 100 + '%';
      const l = 50 + this._view.x + '%';
      const t = 50 + this._view.y + '%';
      this._img.style.width = w;
      this._img.style.height = h;
      this._img.style.left = l;
      this._img.style.top = t;
      this._img.style.objectFit = '';
      this._spill.style.width = w;
      this._spill.style.height = h;
      this._spill.style.left = l;
      this._spill.style.top = t;
    }
    _commitView() {
      const v = {
        s: this._view.s,
        x: this._view.x,
        y: this._view.y
      };
      if (this._userUrl) v.u = this._userUrl;
      // Framing-only (no u) persists too so an author-src slot remembers its
      // crop; clearing the sidecar still falls through to src=.
      if (this.id) setSlot(this.id, v);else {
        this._local = v;
      }
    }
    _render() {
      // Shape / mask. Presets use border-radius so the dashed ring can
      // follow the rounded outline; clip-path is only applied for an
      // explicit `mask` (the ring is hidden there since a rectangle
      // dashed border chopped by an arbitrary polygon looks broken).
      const mask = this.getAttribute('mask');
      const shape = (this.getAttribute('shape') || 'rounded').toLowerCase();
      let radius = '';
      if (shape === 'circle') radius = '50%';else if (shape === 'pill') radius = '9999px';else if (shape === 'rounded') {
        const n = parseFloat(this.getAttribute('radius'));
        radius = (Number.isFinite(n) ? n : 12) + 'px';
      }
      this._frame.style.borderRadius = mask ? '' : radius;
      this._frame.style.clipPath = mask || '';
      this._ring.style.borderRadius = mask ? '' : radius;
      this._ring.style.display = mask ? 'none' : '';

      // Controls and reframe entry gate on this so share links stay read-only.
      const editable = !!(window.omelette && window.omelette.writeFile);
      this.toggleAttribute('data-editable', editable);
      this._sub.style.display = editable ? '' : 'none';

      // Content. The sidecar is also writable by the agent's write_file
      // tool, so its value isn't guaranteed canvas-originated — only accept
      // data:image/ URLs from it. The `src` attribute is author-controlled
      // (Claude wrote it into the HTML) so it passes through unchanged.
      let stored = this.id ? getSlot(this.id) : this._local;
      if (stored && stored.u && !/^data:image\//i.test(stored.u)) stored = null;
      const srcAttr = this.getAttribute('src') || '';
      this._userUrl = stored && stored.u || null;
      const url = this._userUrl || srcAttr;
      // Don't clobber an in-flight reframe with a store-triggered re-render.
      if (!this.hasAttribute('data-reframe')) {
        this._view = {
          s: stored && Number.isFinite(stored.s) ? clampS(stored.s) : 1,
          x: stored && Number.isFinite(stored.x) ? stored.x : 0,
          y: stored && Number.isFinite(stored.y) ? stored.y : 0
        };
      }
      this._cap.textContent = this.getAttribute('placeholder') || 'Drop an image';
      // Toggle via style.display — the [hidden] attribute alone loses to
      // the display:flex / display:block rules in the stylesheet above.
      if (url) {
        if (this._img.getAttribute('src') !== url) {
          this._img.src = url;
          this._ghost.src = url;
        }
        this._img.style.display = 'block';
        this._empty.style.display = 'none';
        this.setAttribute('data-filled', '');
        this._clampView();
        this._applyView();
      } else {
        this._img.style.display = 'none';
        this._img.removeAttribute('src');
        this._ghost.removeAttribute('src');
        this._empty.style.display = 'flex';
        this.removeAttribute('data-filled');
      }
    }
  }
  if (!customElements.get('image-slot')) {
    customElements.define('image-slot', ImageSlot);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/image-slot.js", error: String((e && e.message) || e) }); }

// ui_kits/portal/screens.jsx
try { (() => {
const PS = window.MITSTEMDesignSystem_177606;

/* course data */
const COURSES = [{
  id: "robotics",
  name: "Robotics II",
  teacher: "Mr. Okafor",
  progress: 78,
  color: "var(--gold-500)",
  next: "Lab: Line-following bot"
}, {
  id: "anatomy",
  name: "Anatomy & Physiology",
  teacher: "Dr. Reyes",
  progress: 64,
  color: "var(--purple-500)",
  next: "Quiz: Cardiac cycle"
}, {
  id: "apcalc",
  name: "AP Calculus AB",
  teacher: "Ms. Tran",
  progress: 52,
  color: "var(--blue-500)",
  next: "Problem set 7.3"
}, {
  id: "python",
  name: "Intro to Python",
  teacher: "Mr. Okafor",
  progress: 91,
  color: "var(--green-500)",
  next: "Project: Data plotter"
}];
function LoginScreen({
  onLogin
}) {
  const {
    Field,
    Input,
    Button,
    Checkbox
  } = PS;
  const {
    Mail,
    ArrowRight
  } = window.IconSet;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--purple-700)",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/eagle-white.png",
    alt: "",
    "aria-hidden": "true",
    style: {
      position: "absolute",
      height: 560,
      opacity: 0.06
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 408,
      background: "var(--surface-card)",
      borderRadius: "var(--radius-xl)",
      boxShadow: "var(--shadow-xl)",
      padding: 38,
      borderTop: "4px solid var(--gold-500)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 26
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/eagle-purple.png",
    alt: "MIT",
    style: {
      height: 60,
      marginBottom: 14
    }
  }), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-serif)",
      fontWeight: 800,
      fontSize: "var(--text-2xl)",
      margin: "0 0 4px"
    }
  }, "Student Portal"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: "var(--text-muted)",
      fontSize: "var(--text-sm)"
    }
  }, "Maricopa Institute of Technology")), /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      onLogin();
    },
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Student ID or email"
  }, /*#__PURE__*/React.createElement(Input, {
    defaultValue: "maya.chen@mit.edu",
    iconLeft: /*#__PURE__*/React.createElement(Mail, {
      size: 16
    })
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Password"
  }, /*#__PURE__*/React.createElement(Input, {
    type: "password",
    defaultValue: "password"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    label: "Remember me",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      fontSize: "var(--text-sm)"
    }
  }, "Forgot password?")), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    variant: "primary",
    size: "lg",
    fullWidth: true,
    iconRight: /*#__PURE__*/React.createElement(ArrowRight, {
      size: 18
    })
  }, "Sign In")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginTop: 20,
      fontSize: "var(--text-sm)",
      color: "var(--text-muted)"
    }
  }, "Parent? ", /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Open ParentVUE"))));
}
function CourseCard({
  c,
  onOpen
}) {
  const {
    Card,
    ProgressBar,
    Badge
  } = PS;
  const {
    ArrowRight
  } = window.IconSet;
  return /*#__PURE__*/React.createElement(Card, {
    hoverable: true,
    padded: true,
    style: {
      padding: 20,
      cursor: "pointer"
    },
    onClick: () => onOpen(c)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "0 0 3px",
      fontSize: "var(--text-md)"
    }
  }, c.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-sm)",
      color: "var(--text-muted)"
    }
  }, c.teacher)), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 999,
      background: c.color,
      marginTop: 6
    }
  })), /*#__PURE__*/React.createElement(ProgressBar, {
    value: c.progress,
    showLabel: true,
    tone: "brand",
    style: {
      marginBottom: 14
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-sm)",
      color: "var(--text-body)"
    }
  }, "Next: ", c.next), /*#__PURE__*/React.createElement(ArrowRight, {
    size: 16,
    color: "var(--purple-500)"
  })));
}
function Dashboard({
  onOpenCourse
}) {
  const {
    Card,
    StatCard,
    Alert,
    Badge
  } = PS;
  const {
    Bell,
    Clock
  } = window.IconSet;
  const assignments = [["Cardiac cycle quiz", "Anatomy & Physiology", "Today · 11:59 PM", "danger"], ["Problem set 7.3", "AP Calculus AB", "Tomorrow", "warning"], ["Line-following bot lab", "Robotics II", "Fri, Jul 3", "neutral"], ["Data plotter project", "Intro to Python", "Mon, Jul 6", "neutral"]];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 28,
      display: "flex",
      flexDirection: "column",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-serif)",
      fontWeight: 800,
      fontSize: "var(--text-3xl)",
      margin: "0 0 4px"
    }
  }, "Welcome back, Maya"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: "var(--text-muted)"
    }
  }, "You have ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--purple-600)"
    }
  }, "2 assignments"), " due in the next 24 hours.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 16
    }
  }, [["3.92", "Cumulative GPA"], ["6", "Active Courses"], ["12", "College Credits"], ["96%", "Attendance"]].map(([v, l]) => /*#__PURE__*/React.createElement(Card, {
    key: l,
    style: {
      padding: 18
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    value: v,
    label: l
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.6fr 1fr",
      gap: 24,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: "var(--text-lg)"
    }
  }, "My Courses"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      fontSize: "var(--text-sm)"
    }
  }, "View all")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16
    }
  }, COURSES.map(c => /*#__PURE__*/React.createElement(CourseCard, {
    key: c.id,
    c: c,
    onOpen: onOpenCourse
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(Alert, {
    tone: "brand",
    title: "Course selection closes Jul 18",
    icon: /*#__PURE__*/React.createElement(Bell, {
      size: 18
    })
  }, "Confirm your Fall pathway electives."), /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "0 0 14px",
      fontSize: "var(--text-md)"
    }
  }, "Upcoming"), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, assignments.map(([t, c, when, tone]) => /*#__PURE__*/React.createElement("li", {
    key: t,
    style: {
      display: "flex",
      gap: 12,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement(Clock, {
    size: 16,
    color: "var(--text-subtle)",
    style: {
      marginTop: 3,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-sm)",
      fontWeight: 600,
      color: "var(--text-default)"
    }
  }, t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-xs)",
      color: "var(--text-muted)"
    }
  }, c)), /*#__PURE__*/React.createElement(Badge, {
    tone: tone,
    style: {
      fontSize: 9
    }
  }, when.split(" ")[0]))))))));
}
function CourseDetail({
  course,
  onBack
}) {
  const {
    Card,
    ProgressBar,
    Badge,
    Button,
    Breadcrumb,
    Tabs
  } = PS;
  const {
    CheckCircle,
    PlayCircle,
    FileText,
    ArrowRight
  } = window.IconSet;
  const c = course || COURSES[0];
  const modules = [["Kinematics & Motion", "done"], ["Sensors & Inputs", "done"], ["Motor Control", "done"], ["Line-Following Algorithms", "active"], ["Autonomous Navigation", "locked"], ["Final Build & Showcase", "locked"]];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 28,
      display: "flex",
      flexDirection: "column",
      gap: 22
    }
  }, /*#__PURE__*/React.createElement(Breadcrumb, {
    items: [{
      label: "Courses",
      href: "#"
    }, {
      label: c.name
    }]
  }), /*#__PURE__*/React.createElement(Card, {
    variant: "brand",
    style: {
      padding: 28,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "mit-caps",
    style: {
      color: "var(--gold-300)",
      fontSize: "var(--text-sm)",
      marginBottom: 8
    }
  }, "Engineering Pathway"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-serif)",
      fontWeight: 800,
      fontSize: "var(--text-3xl)",
      margin: "0 0 6px",
      color: "#fff"
    }
  }, c.name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: "rgba(255,255,255,.8)"
    }
  }, c.teacher, " \xB7 4 credits \xB7 Online + Lab")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 220
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      color: "#fff",
      fontSize: "var(--text-sm)",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", null, "Course progress"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700
    }
  }, c.progress, "%")), /*#__PURE__*/React.createElement(ProgressBar, {
    value: c.progress,
    tone: "accent"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.7fr 1fr",
      gap: 24,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "0 0 16px",
      fontSize: "var(--text-lg)"
    }
  }, "Modules"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, modules.map(([m, st], i) => /*#__PURE__*/React.createElement("div", {
    key: m,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "14px 0",
      borderBottom: i < modules.length - 1 ? "1px solid var(--neutral-100)" : "none",
      opacity: st === "locked" ? 0.5 : 1
    }
  }, st === "done" ? /*#__PURE__*/React.createElement(CheckCircle, {
    size: 22,
    color: "var(--green-500)"
  }) : st === "active" ? /*#__PURE__*/React.createElement(PlayCircle, {
    size: 22,
    color: "var(--purple-500)"
  }) : /*#__PURE__*/React.createElement(FileText, {
    size: 22,
    color: "var(--neutral-400)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      color: "var(--text-default)"
    }
  }, "Module ", i + 1, ": ", m)), st === "active" && /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "primary",
    iconRight: /*#__PURE__*/React.createElement(ArrowRight, {
      size: 15
    })
  }, "Resume"), st === "done" && /*#__PURE__*/React.createElement(Badge, {
    tone: "success"
  }, "Complete"))))), /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: 22
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "0 0 14px",
      fontSize: "var(--text-md)"
    }
  }, "Resources"), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, ["Syllabus.pdf", "Arduino starter code", "Lab safety guide", "Office hours: Tue/Thu"].map(r => /*#__PURE__*/React.createElement("li", {
    key: r
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontSize: "var(--text-sm)"
    }
  }, /*#__PURE__*/React.createElement(FileText, {
    size: 15
  }), " ", r)))), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    fullWidth: true,
    style: {
      marginTop: 18
    },
    onClick: onBack
  }, "Back to dashboard"))));
}
Object.assign(window, {
  LoginScreen,
  Dashboard,
  CourseDetail
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portal/screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portal/shell.jsx
try { (() => {
const P = window.MITSTEMDesignSystem_177606;
function Sidebar({
  route,
  onNavigate
}) {
  const {
    LayoutGrid,
    BookOpen,
    FileText,
    ChartBar,
    Calendar,
    MessageSquare
  } = window.IconSet;
  const items = [["dashboard", "Dashboard", LayoutGrid], ["courses", "Courses", BookOpen], ["assignments", "Assignments", FileText], ["grades", "Grades", ChartBar], ["calendar", "Calendar", Calendar], ["messages", "Messages", MessageSquare]];
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 248,
      flexShrink: 0,
      background: "var(--purple-800)",
      color: "rgba(255,255,255,.8)",
      display: "flex",
      flexDirection: "column",
      minHeight: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "22px 22px 18px",
      display: "flex",
      alignItems: "center",
      gap: 12,
      borderBottom: "1px solid rgba(255,255,255,.12)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/eagle-white.png",
    alt: "",
    style: {
      height: 38
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-serif)",
      fontWeight: 700,
      color: "#fff",
      fontSize: 16,
      lineHeight: 1
    }
  }, "MIT STEM\xB2"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      letterSpacing: ".1em",
      textTransform: "uppercase",
      color: "var(--gold-300)",
      marginTop: 3
    }
  }, "Student Portal"))), /*#__PURE__*/React.createElement("nav", {
    style: {
      padding: "14px 12px",
      display: "flex",
      flexDirection: "column",
      gap: 3,
      flex: 1
    }
  }, items.map(([id, label, Ico]) => {
    const on = route === id || route === "course" && id === "courses";
    return /*#__PURE__*/React.createElement("a", {
      key: id,
      href: "#",
      onClick: e => {
        e.preventDefault();
        onNavigate(id);
      },
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "11px 14px",
        borderRadius: "var(--radius-md)",
        fontSize: "var(--text-base)",
        fontWeight: on ? 700 : 500,
        color: on ? "#fff" : "rgba(255,255,255,.78)",
        background: on ? "var(--purple-600)" : "transparent",
        borderLeft: `3px solid ${on ? "var(--gold-400)" : "transparent"}`
      }
    }, /*#__PURE__*/React.createElement(Ico, {
      size: 19,
      color: on ? "var(--gold-300)" : "rgba(255,255,255,.65)"
    }), label);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 18,
      borderTop: "1px solid rgba(255,255,255,.12)",
      fontSize: 12,
      color: "rgba(255,255,255,.5)"
    }
  }, "Spring 2026 \xB7 Quarter 4"));
}
function Topbar({
  title,
  onLogout
}) {
  const {
    Input,
    Avatar,
    IconButton
  } = P;
  const {
    Search,
    Bell
  } = window.IconSet;
  return /*#__PURE__*/React.createElement("header", {
    style: {
      height: 70,
      background: "var(--surface-card)",
      borderBottom: "1px solid var(--border-subtle)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 28px",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-serif)",
      fontWeight: 700,
      fontSize: "var(--text-xl)",
      margin: 0
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 240
    },
    className: "hide-sm"
  }, /*#__PURE__*/React.createElement(Input, {
    size: "sm",
    placeholder: "Search courses\u2026",
    iconLeft: /*#__PURE__*/React.createElement(Search, {
      size: 15
    })
  })), /*#__PURE__*/React.createElement(IconButton, {
    variant: "ghost",
    label: "Notifications"
  }, /*#__PURE__*/React.createElement(Bell, {
    size: 20
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      cursor: "pointer"
    },
    onClick: onLogout,
    title: "Sign out"
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Maya Chen",
    size: "sm"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hide-sm"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-sm)",
      fontWeight: 700,
      color: "var(--text-default)",
      lineHeight: 1.1
    }
  }, "Maya Chen"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-xs)",
      color: "var(--text-muted)"
    }
  }, "Grade 11 \xB7 Engineering")))));
}
Object.assign(window, {
  Sidebar,
  Topbar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portal/shell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/AcademicsScreen.jsx
try { (() => {
const DSa = window.MITSTEMDesignSystem_177606;

/* shared sub-page header */
function PageHead({
  eyebrow,
  title,
  crumbs
}) {
  const {
    Breadcrumb
  } = DSa;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      background: "var(--purple-700)",
      color: "#fff",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/eagle-white.png",
    alt: "",
    "aria-hidden": "true",
    style: {
      position: "absolute",
      right: 24,
      top: "50%",
      transform: "translateY(-50%)",
      height: 200,
      opacity: 0.08
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "mit-container",
    style: {
      position: "relative",
      paddingTop: 36,
      paddingBottom: 44
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(Breadcrumb, {
    items: crumbs,
    style: {
      "--crumb": 1
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "mit-caps",
    style: {
      color: "var(--gold-300)",
      fontSize: "var(--text-sm)",
      marginBottom: 10
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-serif)",
      fontWeight: 800,
      fontSize: 46,
      margin: 0,
      color: "#fff"
    }
  }, title)));
}
function AcademicsScreen() {
  const {
    Tabs,
    Card,
    Badge,
    Alert,
    Button
  } = DSa;
  const {
    Bell,
    ArrowRight,
    Microscope,
    Cpu,
    Beaker,
    Calculator,
    HeartPulse,
    BookOpen
  } = window.IconSet;
  const [tab, setTab] = React.useState("pathways");
  const pathways = [[Beaker, "Engineering", ["Robotics I & II", "Digital Electronics", "Arduino & IoT"], "accent"], [HeartPulse, "Medicine & Health", ["Anatomy & Physiology", "Medical Terminology", "Pre-Health Seminar"], "brand"], [Cpu, "Computer Science", ["Intro to Python", "Web Development", "AP Computer Science"], "accent"], [Microscope, "Science", ["Biology", "Chemistry", "Physics"], "brand"], [Calculator, "Mathematics", ["Algebra II / Trig", "Pre-Calculus", "AP Calculus AB"], "accent"], [BookOpen, "Language & Arts", ["English I–IV", "World Languages", "Social Studies"], "brand"]];
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(PageHead, {
    eyebrow: "STEM\xB2 Academics",
    title: "Academics & Pathways",
    crumbs: [{
      label: "Home",
      href: "#"
    }, {
      label: "Academics"
    }]
  }), /*#__PURE__*/React.createElement("div", {
    className: "mit-container",
    style: {
      paddingTop: 36,
      paddingBottom: 80
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    items: [{
      id: "overview",
      label: "Overview"
    }, {
      id: "pathways",
      label: "Pathways"
    }, {
      id: "ap",
      label: "AP & Dual Enrollment"
    }],
    value: tab,
    onChange: setTab,
    style: {
      marginBottom: 28
    }
  }), /*#__PURE__*/React.createElement(Alert, {
    tone: "warning",
    title: "Course selection for Fall 2026 closes July 18",
    icon: /*#__PURE__*/React.createElement(Bell, {
      size: 18
    }),
    style: {
      marginBottom: 28
    }
  }, "Returning students should confirm their pathway electives in the student portal before the deadline."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 18
    }
  }, pathways.map(([Ico, t, courses, tone]) => /*#__PURE__*/React.createElement(Card, {
    key: t,
    hoverable: true,
    accent: "left"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 46,
      height: 46,
      borderRadius: "var(--radius-md)",
      background: tone === "accent" ? "var(--gold-50)" : "var(--purple-50)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    size: 22,
    color: tone === "accent" ? "var(--gold-700)" : "var(--purple-600)"
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: "var(--text-lg)"
    }
  }, t)), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: "0 0 16px",
      padding: 0,
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, courses.map((c, ci) => /*#__PURE__*/React.createElement("li", {
    key: c,
    style: {
      fontSize: "var(--text-sm)",
      color: "var(--text-body)",
      display: "flex",
      justifyContent: "space-between",
      paddingBottom: 8,
      borderBottom: "1px solid var(--neutral-100)"
    }
  }, c, " ", /*#__PURE__*/React.createElement(Badge, {
    tone: ci === 2 ? "brand" : "neutral",
    style: {
      fontSize: 9
    }
  }, ci === 2 ? "AP" : "Core")))), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    iconRight: /*#__PURE__*/React.createElement(ArrowRight, {
      size: 15
    })
  }, "View pathway"))))));
}
Object.assign(window, {
  AcademicsScreen,
  PageHead
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/AcademicsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/EnrollScreen.jsx
try { (() => {
const DSe = window.MITSTEMDesignSystem_177606;
function EnrollScreen() {
  const {
    Field,
    Input,
    Select,
    Checkbox,
    Button,
    Card,
    StatCard
  } = DSe;
  const {
    Mail,
    ArrowRight,
    Check,
    Phone,
    Calendar,
    FileText
  } = window.IconSet;
  const [done, setDone] = React.useState(false);
  const steps = [[FileText, "Submit the application", "A few minutes — no fee."], [Phone, "Talk with our team", "New Student & Parent Relations will reach out."], [Calendar, "Schedule a visit", "Tour the campus and meet faculty."], [Check, "Enroll & register", "Pick your STEM² pathway and start."]];
  return /*#__PURE__*/React.createElement("main", null, window.PageHead && /*#__PURE__*/React.createElement(window.PageHead, {
    eyebrow: "Admissions",
    title: "Enroll at MIT",
    crumbs: [{
      label: "Home",
      href: "#"
    }, {
      label: "Enroll"
    }]
  }), /*#__PURE__*/React.createElement("div", {
    className: "mit-container",
    style: {
      paddingTop: 44,
      paddingBottom: 80,
      display: "grid",
      gridTemplateColumns: "1.2fr 1fr",
      gap: 48,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: 36
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 0 6px",
      fontSize: "var(--text-2xl)"
    }
  }, "Start your application"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 26px",
      color: "var(--text-muted)"
    }
  }, "Tuition-free public charter \xB7 grades 9\u201312 \xB7 Phoenix, AZ"), done ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "40px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 64,
      height: 64,
      borderRadius: "999px",
      background: "var(--status-success-bg)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 18px"
    }
  }, /*#__PURE__*/React.createElement(Check, {
    size: 30,
    color: "var(--status-success-fg)"
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "0 0 8px"
    }
  }, "Application received"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--text-muted)",
      margin: "0 0 20px"
    }
  }, "Our team will contact you within two school days."), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => setDone(false)
  }, "Submit another")) : /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setDone(true);
    },
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Student first name",
    required: true
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "First name"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Student last name",
    required: true
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "Last name"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Entering grade",
    required: true
  }, /*#__PURE__*/React.createElement(Select, {
    options: ["9th Grade", "10th Grade", "11th Grade", "12th Grade"]
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Program"
  }, /*#__PURE__*/React.createElement(Select, {
    options: ["On-campus", "Online", "Hybrid"]
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Parent / guardian email",
    required: true,
    style: {
      gridColumn: "1 / -1"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    type: "email",
    placeholder: "you@email.com",
    iconLeft: /*#__PURE__*/React.createElement(Mail, {
      size: 16
    })
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Phone",
    style: {
      gridColumn: "1 / -1"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "(602) 000-0000"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "1 / -1"
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    label: "I agree to MIT's honor code and admissions policies",
    defaultChecked: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "1 / -1",
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    variant: "secondary",
    size: "lg",
    fullWidth: true,
    iconRight: /*#__PURE__*/React.createElement(ArrowRight, {
      size: 18
    })
  }, "Submit Application")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 22
    }
  }, /*#__PURE__*/React.createElement(Card, {
    variant: "brand",
    style: {
      padding: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 28
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    value: "Free",
    label: "Tuition",
    inverse: true
  }), /*#__PURE__*/React.createElement(StatCard, {
    value: "9\u201312",
    label: "Grades",
    inverse: true
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "mit-caps",
    style: {
      color: "var(--text-accent)",
      fontSize: "var(--text-sm)",
      marginBottom: 16
    }
  }, "How enrollment works"), /*#__PURE__*/React.createElement("ol", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, steps.map(([Ico, t, d], i) => /*#__PURE__*/React.createElement("li", {
    key: t,
    style: {
      display: "flex",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      width: 40,
      height: 40,
      borderRadius: "var(--radius-md)",
      background: "var(--purple-50)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    size: 19,
    color: "var(--purple-600)"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      color: "var(--text-default)"
    }
  }, i + 1, ". ", t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-sm)",
      color: "var(--text-muted)"
    }
  }, d)))))))));
}
Object.assign(window, {
  EnrollScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/EnrollScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HomeScreen.jsx
try { (() => {
const DSx = window.MITSTEMDesignSystem_177606;

/* ============ HERO (reused) ============ */
function Hero() {
  const {
    Button
  } = DSx;
  const {
    ArrowRight,
    PlayCircle,
    Award
  } = window.IconSet;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      background: "var(--purple-600)",
      color: "#fff",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/eagle-white.png",
    alt: "",
    "aria-hidden": "true",
    style: {
      position: "absolute",
      right: -60,
      top: "50%",
      transform: "translateY(-50%)",
      height: 460,
      opacity: 0.07,
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "mit-container",
    style: {
      position: "relative",
      paddingTop: 84,
      paddingBottom: 84,
      maxWidth: 1100
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 660
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mit-caps",
    style: {
      color: "var(--gold-300)",
      fontSize: "var(--text-sm)",
      marginBottom: 18
    }
  }, "MIT STEM\xB2 Online High School"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-serif)",
      fontWeight: 900,
      fontSize: 60,
      lineHeight: 1.04,
      letterSpacing: "-0.015em",
      margin: 0,
      color: "#fff"
    }
  }, "Pursue personal excellence."), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 72,
      height: 3,
      background: "var(--gold-500)",
      margin: "26px 0"
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-lg)",
      lineHeight: 1.6,
      color: "rgba(255,255,255,.86)",
      maxWidth: 540,
      margin: "0 0 32px"
    }
  }, "A rigorous, college-preparatory STEM\xB2 education \u2014 Science, Technology, Engineering, Mathematics, and Medicine \u2014 that challenges students to serve and lead others."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    iconRight: /*#__PURE__*/React.createElement(ArrowRight, {
      size: 18
    })
  }, "Apply Today"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "lg",
    iconLeft: /*#__PURE__*/React.createElement(PlayCircle, {
      size: 18
    }),
    style: {
      color: "#fff",
      borderColor: "rgba(255,255,255,.5)",
      borderStyle: "solid"
    }
  }, "Schedule a Visit")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginTop: 34,
      color: "rgba(255,255,255,.78)",
      fontSize: "var(--text-sm)"
    }
  }, /*#__PURE__*/React.createElement(Award, {
    size: 18,
    color: "var(--gold-300)"
  }), "U.S. News Best High Schools \u2014 National & Charter, 2025\u20132026"))));
}

/* ============ STATS BAND ============ */
function StatsBand() {
  const {
    StatCard,
    Card
  } = DSx;
  const stats = [["24:1", "Student–Teacher Ratio"], ["AP + Dual", "College Credit Earned"], ["100%", "College-Prep Curriculum"], ["STEM²", "Science → Medicine"]];
  return /*#__PURE__*/React.createElement("div", {
    className: "mit-container",
    style: {
      marginTop: -44,
      position: "relative",
      zIndex: 5
    }
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 0,
      padding: 0,
      boxShadow: "var(--shadow-lg)"
    },
    accent: "top"
  }, stats.map(([v, l], i) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      padding: "28px 26px",
      borderLeft: i ? "1px solid var(--border-subtle)" : "none"
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    value: v,
    label: l
  })))));
}

/* ============ STEM² PILLARS ============ */
function Pillars() {
  const {
    SectionHeading,
    Card
  } = DSx;
  const {
    Microscope,
    Cpu,
    Beaker,
    Calculator,
    HeartPulse
  } = window.IconSet;
  const pillars = [[Microscope, "Science", "Biology, chemistry & anatomy with hands-on labs."], [Cpu, "Technology", "Python, HTML, and applied computing."], [Beaker, "Engineering", "Robotics, digital electronics & Arduino."], [Calculator, "Mathematics", "Through AP Calculus and beyond."], [HeartPulse, "Medicine", "The second \u201CM\u201D — pre-health pathways."]];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "84px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mit-container"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    align: "center",
    eyebrow: "The STEM\xB2 Difference",
    title: "Five pillars, one rigorous path",
    description: "Most schools stop at STEM. We add Medicine \u2014 preparing students for the full range of high-demand fields.",
    style: {
      marginBottom: 48
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(5,1fr)",
      gap: 18
    }
  }, pillars.map(([Ico, t, d]) => /*#__PURE__*/React.createElement(Card, {
    key: t,
    hoverable: true,
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      borderRadius: "999px",
      background: "var(--gold-50)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 16px"
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    size: 26,
    color: "var(--gold-700)"
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: "var(--text-lg)",
      margin: "0 0 8px"
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-sm)",
      color: "var(--text-muted)",
      margin: 0,
      lineHeight: 1.55
    }
  }, d))))));
}

/* ============ WHY CHOOSE US ============ */
function WhyUs() {
  const {
    SectionHeading,
    Card,
    Avatar
  } = DSx;
  const {
    Check,
    Quote
  } = window.IconSet;
  const points = ["Small classes and a learner-centered, hybrid program", "College credit through AP & dual enrollment partners", "Real-world internships and a NASA partnership", "Character education grounded in five core virtues"];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "0 0 84px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mit-container",
    style: {
      display: "grid",
      gridTemplateColumns: "1.1fr 1fr",
      gap: 56,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Why Choose MIT",
    title: "A private-school education in a public-school setting",
    style: {
      marginBottom: 26
    }
  }), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, points.map(p => /*#__PURE__*/React.createElement("li", {
    key: p,
    style: {
      display: "flex",
      gap: 12,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      width: 26,
      height: 26,
      borderRadius: "999px",
      background: "var(--purple-500)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 1
    }
  }, /*#__PURE__*/React.createElement(Check, {
    size: 15,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-md)",
      color: "var(--text-body)"
    }
  }, p))))), /*#__PURE__*/React.createElement(Card, {
    variant: "brand",
    style: {
      padding: 36
    }
  }, /*#__PURE__*/React.createElement(Quote, {
    size: 36,
    color: "var(--gold-300)"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: "var(--text-xl)",
      lineHeight: 1.5,
      color: "#fff",
      margin: "18px 0 24px",
      fontWeight: 500
    }
  }, "\"MIT challenged me to work harder than I thought I could \u2014 and gave me college credit and a robotics portfolio before graduation.\""), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Jordan Avila",
    ring: true
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "#fff",
      fontWeight: 700
    }
  }, "Jordan Avila"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--gold-300)",
      fontSize: "var(--text-sm)"
    }
  }, "Class of 2025 \xB7 ASU Engineering"))))));
}

/* ============ CTA BAND ============ */
function CtaBand({
  onNavigate
}) {
  const {
    Button
  } = DSx;
  const {
    ArrowRight
  } = window.IconSet;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--gold-500)",
      color: "var(--purple-800)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mit-container",
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "44px 24px",
      gap: 24,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-serif)",
      fontWeight: 800,
      fontSize: "var(--text-3xl)",
      margin: "0 0 6px",
      color: "var(--purple-800)"
    }
  }, "Ready to join the next class?"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--text-md)",
      color: "var(--purple-700)"
    }
  }, "Enrollment is open and tuition-free. Apply in minutes.")), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    iconRight: /*#__PURE__*/React.createElement(ArrowRight, {
      size: 18
    }),
    onClick: () => onNavigate("enroll")
  }, "Start Your Application")));
}
function HomeScreen({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(StatsBand, null), /*#__PURE__*/React.createElement(Pillars, null), /*#__PURE__*/React.createElement(WhyUs, null), /*#__PURE__*/React.createElement(CtaBand, {
    onNavigate: onNavigate
  }));
}
Object.assign(window, {
  HomeScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/chrome.jsx
try { (() => {
const DS = window.MITSTEMDesignSystem_177606;

/* ---- Top utility strip (deep purple) ---- */
function TopBar() {
  const {
    Phone,
    MapPin
  } = window.IconSet;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--purple-800)",
      color: "rgba(255,255,255,.82)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mit-container",
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 38,
      fontSize: "var(--text-sm)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 7
    }
  }, /*#__PURE__*/React.createElement(Phone, {
    size: 14
  }), " 602-477-2780"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 7
    },
    className: "hide-sm"
  }, /*#__PURE__*/React.createElement(MapPin, {
    size: 14
  }), " 3900 S 55th Ave, Phoenix AZ")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: "var(--gold-300)",
      fontWeight: 600
    }
  }, "StudentVUE"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: "rgba(255,255,255,.82)"
    }
  }, "Spirit Store"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: "rgba(255,255,255,.82)"
    }
  }, "Donate"))));
}

/* ---- Primary navigation ---- */
function Header({
  route,
  onNavigate
}) {
  const {
    Button,
    Logo
  } = DS;
  const {
    ChevronDown
  } = window.IconSet;
  const nav = [["home", "Home"], ["about", "About Us"], ["academics", "Academics"], ["athletics", "Athletics"], ["enroll", "Enroll"], ["contact", "Contact"]];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 40
    }
  }, /*#__PURE__*/React.createElement(TopBar, null), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)",
      borderBottom: "1px solid var(--border-subtle)",
      boxShadow: "var(--shadow-sm)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mit-container",
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 84,
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate("home");
    },
    style: {
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    src: "../../assets/eagle.png",
    variant: "full",
    height: 50,
    showSubtitle: false
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4
    },
    className: "mainnav"
  }, nav.map(([id, label]) => {
    const on = route === id;
    const hasMenu = id === "about" || id === "academics";
    return /*#__PURE__*/React.createElement("a", {
      key: id,
      href: "#",
      onClick: e => {
        e.preventDefault();
        onNavigate(id);
      },
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "10px 14px",
        borderRadius: "var(--radius-md)",
        fontFamily: "var(--font-body)",
        fontSize: "var(--text-base)",
        fontWeight: on ? 700 : 600,
        color: on ? "var(--purple-600)" : "var(--text-body)",
        background: on ? "var(--purple-50)" : "transparent"
      }
    }, label, hasMenu && /*#__PURE__*/React.createElement(ChevronDown, {
      size: 15
    }));
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    style: {
      marginLeft: 10
    },
    onClick: () => onNavigate("enroll")
  }, "Apply Today")))));
}

/* ---- Footer ---- */
function Footer() {
  const {
    Logo
  } = DS;
  const cols = [["Academics", ["STEM² Curriculum", "AP & Dual Enrollment", "Engineering", "Science", "Clubs"]], ["Admissions", ["Enroll", "Schedule a Visit", "Why Choose Us", "Tuition-Free", "FAQ"]], ["Community", ["Athletics", "News", "Calendar", "Parents", "Spirit Store"]]];
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "var(--purple-800)",
      color: "rgba(255,255,255,.78)",
      paddingTop: "var(--space-16)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mit-container",
    style: {
      display: "grid",
      gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
      gap: 40,
      paddingBottom: "var(--space-12)"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Logo, {
    src: "../../assets/eagle-white.png",
    theme: "white",
    variant: "full",
    height: 46,
    showSubtitle: false
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 18,
      fontSize: "var(--text-sm)",
      lineHeight: 1.7,
      maxWidth: 280
    }
  }, "A rigorous STEM\xB2 college-preparatory education that challenges students to pursue personal excellence in character \u2014 to serve and lead others.")), cols.map(([h, items]) => /*#__PURE__*/React.createElement("div", {
    key: h
  }, /*#__PURE__*/React.createElement("div", {
    className: "mit-caps",
    style: {
      color: "var(--gold-300)",
      fontSize: "var(--text-sm)",
      marginBottom: 16
    }
  }, h), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      gap: 11
    }
  }, items.map(it => /*#__PURE__*/React.createElement("li", {
    key: it
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: "rgba(255,255,255,.78)",
      fontSize: "var(--text-sm)"
    }
  }, it))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid rgba(255,255,255,.14)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mit-container",
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: 64,
      fontSize: "var(--text-xs)",
      color: "rgba(255,255,255,.6)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Maricopa Institute of Technology \xB7 Phoenix, Arizona"), /*#__PURE__*/React.createElement("span", null, "Accredited \xB7 A tuition-free public charter school"))));
}
Object.assign(window, {
  TopBar,
  Header,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/icons.jsx
try { (() => {
/* Lucide-style line icons (2px stroke, rounded) used across the MIT UI kits.
   Icon-font/sprite was unavailable in source; Lucide is the documented match. */
const I = (paths, vb = "0 0 24 24") => ({
  size = 22,
  color = "currentColor",
  strokeWidth = 2,
  style = {}
} = {}) => React.createElement("svg", {
  width: size,
  height: size,
  viewBox: vb,
  fill: "none",
  stroke: color,
  strokeWidth,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  style
}, paths.map((d, i) => React.createElement("path", {
  key: i,
  d
})));
const IconSet = {
  Menu: I(["M3 6h18", "M3 12h18", "M3 18h18"]),
  Search: I(["M11 11m-7 0a7 7 0 1 0 14 0a7 7 0 1 0-14 0", "m21 21-4.3-4.3"]),
  ChevronDown: I(["m6 9 6 6 6-6"]),
  ChevronRight: I(["m9 18 6-6-6-6"]),
  ArrowRight: I(["M5 12h14", "m12 5 7 7-7 7"]),
  Cpu: I(["M9 9h6v6H9z", "M4 9h2M4 15h2M18 9h2M18 15h2M9 4v2M15 4v2M9 18v2M15 18v2", "M7 7h10v10H7z"]),
  Microscope: I(["M6 18h8", "M3 22h18", "M14 22a7 7 0 1 0 0-14h-1", "M9 14h2", "M9 12a2 2 0 0 1-2-2V6h4v4a2 2 0 0 1-2 2Z", "M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"]),
  HeartPulse: I(["M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.49 4.04 3 5.5l7 7Z", "M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"]),
  Calculator: I(["M4 2h16v20H4z", "M8 6h8M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"]),
  Beaker: I(["M4.5 3h15", "M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3", "M6 14h12"]),
  GraduationCap: I(["M22 10 12 5 2 10l10 5 10-5Z", "M6 12v5c0 1 2 3 6 3s6-2 6-3v-5"]),
  Trophy: I(["M6 9H4.5a2.5 2.5 0 0 1 0-5H6", "M18 9h1.5a2.5 2.5 0 0 0 0-5H18", "M4 22h16", "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22", "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22", "M18 2H6v7a6 6 0 0 0 12 0V2Z"]),
  Users: I(["M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", "M9 11m-4 0a4 4 0 1 0 8 0a4 4 0 1 0-8 0", "M22 21v-2a4 4 0 0 0-3-3.87", "M16 3.13a4 4 0 0 1 0 7.75"]),
  Calendar: I(["M8 2v4M16 2v4", "M3 4h18v18H3z", "M3 10h18"]),
  MapPin: I(["M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z", "M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0"]),
  Phone: I(["M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"]),
  Mail: I(["M2 4h20v16H2z", "m22 6-10 7L2 6"]),
  Check: I(["M20 6 9 17l-5-5"]),
  CheckCircle: I(["M22 11.08V12a10 10 0 1 1-5.93-9.14", "m22 4-10 10.01-3-3"]),
  Quote: I(["M3 21c3 0 7-1 7-8V5c0-1.25-.76-2-2-2H4c-1.24 0-2 .75-2 2v8c0 1.25.76 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2", "M16 21c3 0 7-1 7-8V5c0-1.25-.76-2-2-2h-4c-1.24 0-2 .75-2 2v8c0 1.25.76 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2"]),
  BookOpen: I(["M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z", "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"]),
  Rocket: I(["M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91 0Z", "M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z", "M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0", "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"]),
  Clock: I(["M12 12m-10 0a10 10 0 1 0 20 0a10 10 0 1 0-20 0", "M12 6v6l4 2"]),
  Globe: I(["M12 12m-10 0a10 10 0 1 0 20 0a10 10 0 1 0-20 0", "M2 12h20", "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z"]),
  Award: I(["M12 8m-6 0a6 6 0 1 0 12 0a6 6 0 1 0-12 0", "M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"]),
  PlayCircle: I(["M12 12m-10 0a10 10 0 1 0 20 0a10 10 0 1 0-20 0", "m10 8 6 4-6 4z"]),
  FileText: I(["M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", "M14 2v6h6", "M16 13H8M16 17H8M10 9H8"]),
  Bell: I(["M10.3 21a1.94 1.94 0 0 0 3.4 0", "M21 16.5c-1.4-1-2-2.4-2-5.5a7 7 0 1 0-14 0c0 3.1-.6 4.5-2 5.5z"]),
  Home: I(["m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", "M9 22V12h6v10"]),
  LayoutGrid: I(["M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"]),
  MessageSquare: I(["M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"]),
  ChartBar: I(["M3 3v18h18", "M7 16v-6M12 16V8M17 16v-3"])
};
Object.assign(window, {
  IconSet
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/icons.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Breadcrumb = __ds_scope.Breadcrumb;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Alert = __ds_scope.Alert;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

})();
