/* @ds-bundle: {"format":4,"namespace":"TuSalarioRealDesignSystem_17664e","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Chip","sourcePath":"components/core/Chip.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Amount","sourcePath":"components/data/Amount.jsx"},{"name":"BarChart","sourcePath":"components/data/BarChart.jsx"},{"name":"PieChart","sourcePath":"components/data/PieChart.jsx"},{"name":"CategoryAvatar","sourcePath":"components/lists/CategoryAvatar.jsx"},{"name":"CategoryRow","sourcePath":"components/lists/CategoryRow.jsx"},{"name":"OfferCard","sourcePath":"components/lists/OfferCard.jsx"},{"name":"RecommendationRow","sourcePath":"components/lists/RecommendationRow.jsx"},{"name":"SectionHeader","sourcePath":"components/lists/SectionHeader.jsx"},{"name":"Sheet","sourcePath":"components/overlays/Sheet.jsx"}],"sourceHashes":{"components/core/Button.jsx":"b517bd7d3bf1","components/core/Chip.jsx":"7192a2701004","components/core/Icon.jsx":"01d021a91e39","components/core/IconButton.jsx":"fe2aa6b2f567","components/data/Amount.jsx":"c389ec26977c","components/data/BarChart.jsx":"f6d99e649e6d","components/data/PieChart.jsx":"3fe5a989fb45","components/lists/CategoryAvatar.jsx":"1e2888d7d345","components/lists/CategoryRow.jsx":"c81cc189a6d5","components/lists/OfferCard.jsx":"67423561dcd9","components/lists/RecommendationRow.jsx":"205daeba3e5a","components/lists/SectionHeader.jsx":"dfbce49288ef","components/overlays/Sheet.jsx":"0ba98d70e275","ui_kits/app/BalanceSheet.jsx":"3d2fe605cd4c","ui_kits/app/Phone.jsx":"b74f2fc59d0f","ui_kits/app/SpendingsScreen.jsx":"7d21ac3db86e","ui_kits/app/TrendingScreen.jsx":"f915a9a78482"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.TuSalarioRealDesignSystem_17664e = window.TuSalarioRealDesignSystem_17664e || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Button.jsx
try { (() => {
const V = {
  primary: {
    background: 'var(--ink-900)',
    color: 'var(--white)',
    border: '1px solid var(--ink-900)'
  },
  secondary: {
    background: 'var(--white)',
    color: 'var(--ink-900)',
    border: '1px solid var(--border-card)'
  },
  subtle: {
    background: 'var(--surface-subtle)',
    color: 'var(--ink-900)',
    border: '1px solid var(--surface-subtle)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--ink-900)',
    border: '1px solid transparent'
  }
};
const S = {
  md: {
    height: 44,
    padding: '0 18px',
    fontSize: 15
  },
  lg: {
    height: 56,
    padding: '0 24px',
    fontSize: 17
  }
};
function Button({
  children,
  variant = 'primary',
  size = 'lg',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button'
}) {
  const [p, setP] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    disabled: disabled,
    onClick: onClick,
    onPointerDown: () => setP(true),
    onPointerUp: () => setP(false),
    onPointerLeave: () => setP(false),
    style: {
      ...V[variant],
      ...S[size],
      width: fullWidth ? '100%' : 'auto',
      borderRadius: 'var(--radius-sm)',
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.35 : p ? 0.82 : 1,
      transform: p ? 'scale(0.985)' : 'none',
      transition: 'opacity var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8
    }
  }, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function Icon({
  name,
  weight = 'fill',
  size = 18,
  color = 'currentColor',
  style
}) {
  const cls = (weight === 'bold' ? 'ph-bold ph-' : 'ph-fill ph-') + name;
  return /*#__PURE__*/React.createElement("i", {
    className: cls,
    "aria-hidden": "true",
    style: {
      fontSize: size,
      color,
      lineHeight: 1,
      display: 'inline-flex',
      ...style
    }
  });
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Chip.jsx
try { (() => {
function Chip({
  children,
  caret = true,
  active = false,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    style: {
      height: 32,
      padding: caret ? '0 10px 0 14px' : '0 14px',
      borderRadius: 'var(--radius-pill)',
      border: 0,
      background: active ? 'var(--ink-900)' : 'var(--surface-subtle)',
      color: active ? 'var(--white)' : 'var(--ink-900)',
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      fontWeight: 500,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      cursor: 'pointer'
    }
  }, children, caret && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "caret-down",
    size: 11
  }));
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Chip.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
const T = {
  ink: ['var(--ink-900)', 'var(--white)'],
  sage: ['var(--sage-500)', 'var(--ink-900)'],
  terracotta: ['var(--terracotta-500)', 'var(--ink-900)'],
  sky: ['var(--sky-500)', 'var(--ink-900)'],
  subtle: ['var(--surface-subtle)', 'var(--ink-900)'],
  plain: ['transparent', 'var(--ink-900)']
};
function IconButton({
  icon,
  tone = 'sage',
  size = 36,
  iconSize,
  label,
  onClick
}) {
  const [bg, fg] = T[tone] || T.sage;
  const [p, setP] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": label || icon,
    onClick: onClick,
    onPointerDown: () => setP(true),
    onPointerUp: () => setP(false),
    onPointerLeave: () => setP(false),
    style: {
      width: size,
      height: size,
      minWidth: size,
      borderRadius: '50%',
      border: 0,
      background: bg,
      color: fg,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      padding: 0,
      transform: p ? 'scale(0.92)' : 'none',
      transition: 'transform var(--dur-fast) var(--ease-standard)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    weight: "bold",
    size: iconSize || Math.round(size * 0.42)
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/data/Amount.jsx
try { (() => {
const SZ = {
  lg: 36,
  md: 30,
  sm: 22
};
function Amount({
  value,
  label,
  delta,
  size = 'lg',
  align = 'left',
  inverse = false
}) {
  const c2 = inverse ? 'rgba(28,28,28,.72)' : 'var(--text-muted)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      textAlign: align,
      alignItems: align === 'right' ? 'flex-end' : 'flex-start'
    }
  }, label && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: c2
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "tsr-num",
    style: {
      fontSize: SZ[size],
      lineHeight: 1.1,
      fontWeight: 400,
      color: 'var(--ink-900)',
      letterSpacing: '-0.02em',
      fontVariantNumeric: 'tabular-nums'
    }
  }, value), delta && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: c2
    }
  }, delta));
}
Object.assign(__ds_scope, { Amount });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Amount.jsx", error: String((e && e.message) || e) }); }

// components/data/BarChart.jsx
try { (() => {
function BarChart({
  data = [],
  height = 200,
  activeIndex,
  onSelect
}) {
  const max = Math.max(...data.map(d => d.value), 1);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 8,
      height
    }
  }, data.map((d, i) => {
    const on = activeIndex != null ? i === activeIndex : d.active;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      onClick: () => onSelect && onSelect(i),
      style: {
        flex: 1,
        height: Math.max(0.22, d.value / max) * height,
        border: 0,
        padding: '0 0 12px',
        cursor: onSelect ? 'pointer' : 'default',
        borderRadius: 'var(--radius-sm)',
        background: on ? 'var(--chart-bar-active)' : 'var(--chart-bar)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        fontFamily: 'var(--font-sans)',
        fontSize: 12,
        fontWeight: 500,
        color: 'var(--ink-900)',
        transition: 'background var(--dur-base) var(--ease-standard), height var(--dur-slow) var(--ease-standard)'
      }
    }, d.label);
  }));
}
Object.assign(__ds_scope, { BarChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/BarChart.jsx", error: String((e && e.message) || e) }); }

// components/data/PieChart.jsx
try { (() => {
function PieChart({
  share = 0.1,
  size = 200,
  color = 'var(--chart-pie)',
  sliceColor = 'var(--chart-pie-slice)',
  gap = 0.18
}) {
  const deg = share * 360;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      borderRadius: '50%',
      transform: 'rotate(90deg)',
      background: `conic-gradient(${sliceColor} 0deg ${deg}deg, transparent ${deg}deg ${deg + gap * 360}deg, ${color} ${deg + gap * 360}deg 360deg)`
    }
  });
}
Object.assign(__ds_scope, { PieChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/PieChart.jsx", error: String((e && e.message) || e) }); }

// components/lists/CategoryAvatar.jsx
try { (() => {
function CategoryAvatar({
  icon,
  color = 'var(--sage-500)',
  share = 0.75,
  size = 40,
  cutout = 'var(--white)'
}) {
  const deg = share * 360;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      borderRadius: '50%',
      position: 'relative',
      flex: 'none',
      background: `conic-gradient(from 90deg, ${color} 0deg ${deg}deg, ${cutout} ${deg}deg 360deg)`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--ink-900)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: Math.round(size * 0.45)
  })));
}
Object.assign(__ds_scope, { CategoryAvatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/lists/CategoryAvatar.jsx", error: String((e && e.message) || e) }); }

// components/lists/CategoryRow.jsx
try { (() => {
function CategoryRow({
  icon,
  color,
  share,
  label,
  amount,
  open = false,
  onClick,
  children
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    style: {
      width: '100%',
      minHeight: 56,
      border: 0,
      background: 'transparent',
      padding: '8px 0',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      color: 'var(--ink-900)',
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.CategoryAvatar, {
    icon: icon,
    color: color,
    share: share
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 16
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    className: "tsr-num",
    style: {
      fontSize: 16,
      fontVariantNumeric: 'tabular-nums'
    }
  }, amount), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "caret-down",
    size: 11,
    style: {
      transform: open ? 'rotate(180deg)' : 'none',
      transition: 'transform var(--dur-base) var(--ease-standard)'
    }
  })), open && children && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 0 12px 56px',
      fontSize: 13,
      color: 'var(--text-secondary)'
    }
  }, children));
}
Object.assign(__ds_scope, { CategoryRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/lists/CategoryRow.jsx", error: String((e && e.message) || e) }); }

// components/lists/OfferCard.jsx
try { (() => {
function OfferCard({
  icon,
  value,
  unit = '%',
  title,
  subtitle,
  tone = 'card',
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    style: {
      width: 176,
      minWidth: 176,
      height: 132,
      padding: 14,
      borderRadius: 'var(--radius-sm)',
      textAlign: 'left',
      cursor: 'pointer',
      border: tone === 'card' ? '1px solid var(--border-card)' : '1px solid var(--surface-subtle)',
      background: tone === 'card' ? 'var(--white)' : 'var(--surface-subtle)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'var(--font-sans)',
      color: 'var(--ink-900)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      alignSelf: 'flex-end',
      display: 'flex',
      alignItems: 'flex-start',
      gap: 4,
      minHeight: 28
    }
  }, value && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "lightning",
    size: 14,
    color: "var(--terracotta-500)",
    style: {
      marginTop: 5
    }
  }), value && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 26,
      lineHeight: 1
    }
  }, value), value && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 600
    }
  }, unit)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'flex-end',
      paddingBottom: 6
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 24
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, subtitle));
}
Object.assign(__ds_scope, { OfferCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/lists/OfferCard.jsx", error: String((e && e.message) || e) }); }

// components/lists/RecommendationRow.jsx
try { (() => {
function RecommendationRow({
  icon,
  title,
  description,
  tone = 'sage',
  divider = true,
  onClick
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '20px 0',
      borderTop: divider ? '1px solid var(--border-hairline)' : 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontSize: 16,
      color: 'var(--ink-900)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 15
  }), title), description && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      fontSize: 13,
      lineHeight: 1.4,
      color: 'var(--text-secondary)',
      textWrap: 'pretty'
    }
  }, description)), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "arrow-right",
    tone: tone,
    size: 40,
    onClick: onClick,
    label: 'Open ' + title
  }));
}
Object.assign(__ds_scope, { RecommendationRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/lists/RecommendationRow.jsx", error: String((e && e.message) || e) }); }

// components/lists/SectionHeader.jsx
try { (() => {
function SectionHeader({
  title,
  adornment,
  action,
  divider = true
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '0 0 16px',
      borderBottom: divider ? '1px solid var(--border-hairline)' : 0
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 22,
      fontWeight: 500,
      letterSpacing: '-0.01em',
      color: 'var(--ink-900)'
    }
  }, title), adornment, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), action);
}
Object.assign(__ds_scope, { SectionHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/lists/SectionHeader.jsx", error: String((e && e.message) || e) }); }

// components/overlays/Sheet.jsx
try { (() => {
function Sheet({
  hero,
  title,
  description,
  actionLabel = 'Okay',
  onAction,
  onClose,
  heroColor = 'var(--surface-hero)'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      background: 'var(--white)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: heroColor,
      padding: '20px 20px 24px',
      position: 'relative',
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    }
  }, onClose && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 12,
      right: 12
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "x",
    tone: "plain",
    onClick: onClose,
    label: "Close"
  })), hero), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '28px 20px 24px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 500,
      color: 'var(--ink-900)'
    }
  }, title), description && /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '8px auto 24px',
      maxWidth: 280,
      fontSize: 13,
      lineHeight: 1.4,
      color: 'var(--text-secondary)',
      textWrap: 'pretty'
    }
  }, description), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    fullWidth: true,
    onClick: onAction
  }, actionLabel)));
}
Object.assign(__ds_scope, { Sheet });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlays/Sheet.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/BalanceSheet.jsx
try { (() => {
function BalanceSheet({
  onClose
}) {
  const {
    Sheet,
    Amount,
    PieChart
  } = window.TuSalarioRealDesignSystem_17664e;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: '70px 0 0'
    }
  }, /*#__PURE__*/React.createElement(Sheet, {
    onClose: onClose,
    onAction: onClose,
    title: "Set your category",
    description: "Tracking expenses by categories helps better manage your cash flow",
    hero: /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        paddingTop: 44
      }
    }, /*#__PURE__*/React.createElement(Amount, {
      label: "Total balance",
      value: "$12,500.00",
      size: "lg",
      inverse: true
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'center',
        margin: '40px 0'
      }
    }, /*#__PURE__*/React.createElement(PieChart, {
      share: 0.08,
      gap: 0.17,
      size: 220
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 'auto'
      }
    }, /*#__PURE__*/React.createElement(Amount, {
      label: "Per day",
      value: "$450",
      size: "lg",
      inverse: true
    }), /*#__PURE__*/React.createElement(Amount, {
      label: "Entertainment",
      value: "249",
      size: "lg",
      align: "right",
      inverse: true
    })))
  }));
}
window.BalanceSheet = BalanceSheet;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/BalanceSheet.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/Phone.jsx
try { (() => {
function Phone({
  children,
  bg = 'var(--white)'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 375,
      height: 780,
      borderRadius: 'var(--radius-device)',
      background: bg,
      overflow: 'hidden',
      position: 'relative',
      flex: 'none',
      display: 'flex',
      flexDirection: 'column'
    }
  }, children);
}
window.Phone = Phone;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/Phone.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/SpendingsScreen.jsx
try { (() => {
const MONTHS = {
  September: {
    total: '$2,400.00',
    delta: '+$720.00/last month',
    bars: [5, 20, 15, 25, 35],
    active: 3,
    rows: [['house', 'var(--sage-500)', .75, 'House rent', '$840.00', 'Monthly · paid on the 1st'], ['t-shirt', 'var(--gray-100)', .8, 'Clothing', '$243.00', '3 purchases'], ['apple-logo', 'var(--terracotta-500)', .75, 'Grocery', '$130.00', '6 purchases']]
  },
  August: {
    total: '$1,680.00',
    delta: '+$210.00/last month',
    bars: [10, 25, 30, 20, 15],
    active: 2,
    rows: [['house', 'var(--sage-500)', .75, 'House rent', '$840.00', 'Monthly · paid on the 1st'], ['t-shirt', 'var(--gray-100)', .8, 'Clothing', '$96.00', '1 purchase'], ['apple-logo', 'var(--terracotta-500)', .75, 'Grocery', '$212.00', '8 purchases']]
  }
};
function SpendingsScreen({
  onAdd
}) {
  const {
    SectionHeader,
    IconButton,
    Chip,
    Amount,
    BarChart,
    CategoryRow
  } = window.TuSalarioRealDesignSystem_17664e;
  const [m, setM] = React.useState('September');
  const [open, setOpen] = React.useState(-1);
  const d = MONTHS[m];
  const [act, setAct] = React.useState(d.active);
  React.useEffect(() => setAct(d.active), [m]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '64px 20px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      overflowY: 'auto',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Spendings",
    adornment: /*#__PURE__*/React.createElement(IconButton, {
      icon: "plus",
      tone: "ink",
      size: 22,
      onClick: onAdd,
      label: "Add"
    }),
    action: /*#__PURE__*/React.createElement(Chip, {
      onClick: () => setM(m === 'September' ? 'August' : 'September')
    }, m)
  }), /*#__PURE__*/React.createElement(Amount, {
    value: d.total,
    delta: d.delta
  }), /*#__PURE__*/React.createElement(BarChart, {
    height: 200,
    activeIndex: act,
    onSelect: setAct,
    data: d.bars.map(v => ({
      label: v + '%',
      value: v
    }))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Details"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 12
    }
  }, d.rows.map((r, i) => /*#__PURE__*/React.createElement(CategoryRow, {
    key: i,
    icon: r[0],
    color: r[1],
    share: r[2],
    label: r[3],
    amount: r[4],
    open: open === i,
    onClick: () => setOpen(open === i ? -1 : i)
  }, r[5])))));
}
window.SpendingsScreen = SpendingsScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/SpendingsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/TrendingScreen.jsx
try { (() => {
function TrendingScreen() {
  const {
    SectionHeader,
    IconButton,
    OfferCard,
    RecommendationRow
  } = window.TuSalarioRealDesignSystem_17664e;
  const [picked, setPicked] = React.useState(null);
  const recs = [['money', 'Large-cap stocks', 'The most popular and fast growth stocks of the worldwide famous companies', 'sage'], ['lightning', 'Mid-cap stocks', 'Applicable for investing in well-established companies with stable growth', 'terracotta'], ['globe', 'Small-cap stocks', 'Good for the investing in the newcomers', 'sky']];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '64px 0 24px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      height: '100%',
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      paddingRight: 20
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Trending",
    divider: false,
    action: /*#__PURE__*/React.createElement(IconButton, {
      icon: "dots-three",
      tone: "plain",
      label: "More"
    })
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      overflowX: 'auto',
      paddingRight: 20
    }
  }, /*#__PURE__*/React.createElement(OfferCard, {
    icon: "storefront",
    value: "50",
    title: "Amazon",
    subtitle: "off electronics"
  }), /*#__PURE__*/React.createElement(OfferCard, {
    icon: "game-controller",
    tone: "subtle",
    title: "Xbox Store",
    subtitle: "off new items"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingRight: 20,
      marginTop: 36
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Recommended"
  }), recs.map((r, i) => /*#__PURE__*/React.createElement(RecommendationRow, {
    key: i,
    icon: r[0],
    title: r[1],
    description: r[2],
    tone: r[3],
    divider: i > 0,
    onClick: () => setPicked(r[1])
  })), picked && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      fontSize: 13,
      color: 'var(--text-secondary)'
    }
  }, "Opening ", picked, "\u2026")));
}
window.TrendingScreen = TrendingScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/TrendingScreen.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Amount = __ds_scope.Amount;

__ds_ns.BarChart = __ds_scope.BarChart;

__ds_ns.PieChart = __ds_scope.PieChart;

__ds_ns.CategoryAvatar = __ds_scope.CategoryAvatar;

__ds_ns.CategoryRow = __ds_scope.CategoryRow;

__ds_ns.OfferCard = __ds_scope.OfferCard;

__ds_ns.RecommendationRow = __ds_scope.RecommendationRow;

__ds_ns.SectionHeader = __ds_scope.SectionHeader;

__ds_ns.Sheet = __ds_scope.Sheet;

})();
