(function () {
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const {
  Button,
  Icon
} = window.TuSalarioRealDesignSystem_17664e;
const W = 4.333;
const FIELDS = [['S', 'Sueldo neto mensual', '', 'Ej. 15000', '$', '', 'money'], ['D', 'Días que trabajas por semana', '5', '', '', 'días', 'calendar-blank'], ['Hc', 'Horas contratadas por semana', '48', '', '', 'h', 'clock'], ['He', 'Horas extra no pagadas por semana', '0', '', '', 'h', 'timer'], ['T', 'Traslado al día, ida y vuelta', '', 'Ej. 90', '', 'min', 'path'], ['Gt', 'Gasto diario en transporte', '', 'Ej. 60', '$', '', 'bus'], ['Gc', 'Gasto diario en comida por trabajar', '', 'Ej. 80', '$', '', 'fork-knife'], ['Go', 'Otros gastos mensuales por trabajar', '0', '', '$', '', 'receipt']];
const GROUPS = [['Tu sueldo y tu jornada', 0, 4], ['Lo que te cuesta ir a trabajar', 4, 8]];
const mxn = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});
const num2 = new Intl.NumberFormat('es-MX', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});
const money = v => mxn.format(v);
const REDUCED = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
function calc(v, Dp) {
  const Hp = v.Hc * W,
    Hx = v.He * W;
  if (Hp === 0) return null;
  const Ht = v.T / 60 * Dp * W;
  const G = (v.Gt + v.Gc) * Dp * W + v.Go;
  const nominal = v.S / Hp;
  const sin = (v.S - G) / (Hp + Hx);
  const con = (v.S - G) / (Hp + Hx + Ht);
  return {
    Hp,
    Ht,
    G,
    net: v.S - G,
    nominal,
    sin,
    con,
    brecha: (1 - con / nominal) * 100,
    dias: v.T / 60 * Dp * 52 / 24
  };
}
function AnimMoney(_ref) {
  let {
    value,
    active
  } = _ref;
  const [d, setD] = React.useState(REDUCED ? value : 0);
  const cur = React.useRef(REDUCED ? value : 0);
  React.useEffect(() => {
    if (!active) return;
    if (REDUCED) {
      cur.current = value;
      setD(value);
      return;
    }
    const from = cur.current,
      t0 = performance.now(),
      dur = 900;
    let raf;
    const step = t => {
      const p = Math.min(1, (t - t0) / dur),
        e = 1 - Math.pow(1 - p, 3);
      cur.current = from + (value - from) * e;
      setD(cur.current);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, active]);
  return /*#__PURE__*/React.createElement("span", null, money(d));
}
function Clock() {
  const [now, setNow] = React.useState(() => new Date());
  const [pos, setPos] = React.useState({
    x: 0,
    y: 0
  });
  const [dragging, setDragging] = React.useState(false);
  const drag = React.useRef(null);
  React.useEffect(() => {
    let id,
      alive = true;
    const tick = () => {
      if (!alive) return;
      setNow(new Date());
      id = REDUCED ? setTimeout(tick, 1000) : requestAnimationFrame(tick);
    };
    tick();
    return () => {
      alive = false;
      clearTimeout(id);
      cancelAnimationFrame(id);
    };
  }, []);
  const s = now.getSeconds() + (REDUCED ? 0 : now.getMilliseconds() / 1000);
  const m = now.getMinutes() + s / 60;
  const hr = now.getHours() % 12 + m / 60;
  const hand = (deg, len, w, color, tail) => /*#__PURE__*/React.createElement("line", {
    x1: 100,
    y1: 100 + tail,
    x2: 100,
    y2: 100 - len,
    stroke: color,
    strokeWidth: w,
    strokeLinecap: "round",
    transform: `rotate(${deg} 100 100)`
  });
  const ticks = [];
  for (let i = 0; i < 60; i++) {
    const big = i % 5 === 0;
    ticks.push(/*#__PURE__*/React.createElement("line", {
      key: i,
      x1: 100,
      y1: 14,
      x2: 100,
      y2: big ? 26 : 19,
      stroke: big ? 'var(--ink-900)' : 'var(--ink-400)',
      strokeWidth: big ? 2.4 : 1,
      strokeLinecap: "round",
      transform: `rotate(${i * 6} 100 100)`
    }));
  }
  const glass = {
    position: 'absolute',
    inset: 0,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.55)',
    backdropFilter: 'blur(22px)',
    WebkitBackdropFilter: 'blur(22px)',
    border: '1px solid rgba(255,255,255,0.85)'
  };
  return /*#__PURE__*/React.createElement("div", {
    role: "img",
    "aria-label": "Reloj con la hora actual. Puedes arrastrarlo.",
    onPointerDown: ev => {
      drag.current = {
        sx: ev.clientX - pos.x,
        sy: ev.clientY - pos.y
      };
      ev.currentTarget.setPointerCapture(ev.pointerId);
      setDragging(true);
    },
    onPointerMove: ev => {
      if (drag.current) setPos({
        x: ev.clientX - drag.current.sx,
        y: ev.clientY - drag.current.sy
      });
    },
    onPointerUp: () => {
      drag.current = null;
      setDragging(false);
    },
    onPointerCancel: () => {
      drag.current = null;
      setDragging(false);
    },
    onDoubleClick: () => setPos({
      x: 0,
      y: 0
    }),
    style: {
      position: 'relative',
      width: 'min(360px, 78vw)',
      aspectRatio: '1',
      transform: `translate(${pos.x}px,${pos.y}px) scale(${dragging ? 1.03 : 1})`,
      transition: dragging ? 'none' : 'transform 360ms cubic-bezier(.2,0,0,1)',
      cursor: dragging ? 'grabbing' : 'grab',
      touchAction: 'none',
      userSelect: 'none',
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      width: '62%',
      height: '62%',
      left: '6%',
      top: '30%',
      borderRadius: '50%',
      background: 'var(--terracotta-500)',
      filter: 'blur(38px)',
      opacity: 0.9
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: glass
  }), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 200 200",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%'
    }
  }, ticks, hand(hr * 30, 46, 6, 'var(--ink-900)', 10), hand(m * 6, 66, 4, 'var(--ink-900)', 12), hand(s * 6, 74, 1.6, 'var(--terracotta-500)', 18), /*#__PURE__*/React.createElement("circle", {
    cx: 100,
    cy: 100,
    r: 5,
    fill: "var(--ink-900)"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: 100,
    cy: 100,
    r: 2,
    fill: "var(--terracotta-500)"
  })));
}

// ---------- "Push the clock" intro transition ----------

const prefersReduced = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
const easeInOutCubic = p => p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;

// Small figure leaning right with both arms out, drawn in the brand ink + one terracotta accent.
// viewBox 100×140; the hands meet at about (92, 52), which is the point that touches the clock.
const PUSHER_SVG = `<svg viewBox="0 0 100 140" width="100%" height="100%" fill="none" stroke="var(--ink-900)" stroke-linecap="round" stroke-linejoin="round">
  <path d="M56 36 Q44 30 34 34" stroke="var(--terracotta-500)" stroke-width="6"/>
  <line x1="55" y1="38" x2="40" y2="85" stroke-width="9"/>
  <line x1="54" y1="44" x2="90" y2="46" stroke-width="6"/>
  <line x1="52" y1="51" x2="92" y2="58" stroke-width="6"/>
  <polyline points="40,85 20,106 8,134" stroke-width="7"/>
  <polyline points="40,85 58,108 54,134" stroke-width="7"/>
  <circle cx="63" cy="22" r="13" fill="var(--ink-900)" stroke="none"/>
</svg>`;
const PUSH_MS = 1000;
// Page scroll: an optional short lead-in (only when the clock starts below the fold), then the
// main scroll to "Tus datos" once the push has happened.
const LEAD_MS = 250,
  SCROLL_FROM = 380;

/**
 * Plays the ~1s intro. A small figure appears at the upper-left of the clock, pushes a snapshot of
 * it, and the snapshot rolls down into "Tus datos" while the page scrolls there.
 *
 * The snapshot and the figure live in page coordinates (not a fixed overlay), so they scroll with
 * the page: the figure stays on the hero and fades out before the hero leaves the screen, and it
 * can never float over other sections. The real clock never moves; it's only hidden meanwhile.
 * Everything is removed at the end (with a timer as a safety net). Calls `done` when finished.
 * Returns false (and does nothing) if it can't run at all.
 */
function playPushTransition(clockWrap, target, done) {
  const clock = clockWrap && clockWrap.firstElementChild;
  if (!clock || !target || typeof clock.animate !== 'function') return false;
  const rect = clock.getBoundingClientRect();
  if (rect.height === 0) return false;
  const vw = innerWidth,
    vh = innerHeight,
    sx = scrollX,
    sy = scrollY;
  const doc = document.documentElement;

  // Clock geometry in page coordinates.
  const size = rect.width,
    R = size / 2;
  const left = rect.left + sx,
    top = rect.top + sy,
    cx = left + R,
    cy = top + R;

  // Layer covering the whole page; clipped so nothing can widen the page on phones.
  const layer = document.createElement('div');
  layer.setAttribute('aria-hidden', 'true');
  layer.style.cssText = `position:absolute;left:0;top:0;width:${doc.clientWidth}px;height:${doc.scrollHeight}px;z-index:50;pointer-events:none;overflow:hidden`;
  const ghost = document.createElement('div');
  ghost.style.cssText = `position:absolute;left:${left}px;top:${top}px;width:${size}px;height:${rect.height}px;will-change:transform,opacity`;
  const snap = clock.cloneNode(true);
  snap.removeAttribute('role');
  snap.removeAttribute('aria-label');
  Object.assign(snap.style, {
    width: '100%',
    transform: 'none',
    transition: 'none',
    cursor: 'default'
  });
  // Fading the ghost isolates its glass blur from the page, so give it the hero colour to blur
  // instead; otherwise the snapshot looks pinker than the real clock.
  const backing = document.createElement('div');
  backing.style.cssText = 'position:absolute;inset:0;border-radius:50%;background:var(--surface-hero)';
  snap.insertBefore(backing, snap.firstChild);
  ghost.appendChild(snap);

  // Figure: hands on the clock's rim at the 10 o'clock position, body leaning in (tilted 20°) so it
  // pushes the upper side of the clock. It sits beside the top of the clock, away from the button
  // and the text.
  const h = Math.round(Math.min(84, Math.max(50, size * 0.22))),
    w = Math.round(h * 100 / 140);
  const hx = cx - R * 0.866,
    hy = cy - R * 0.5;
  const pusher = document.createElement('div');
  pusher.style.cssText = `position:absolute;left:${hx - w * 0.92}px;top:${hy - h * 0.371}px;width:${w}px;height:${h}px;transform-origin:92% 37.1%;will-change:transform,opacity`;
  pusher.innerHTML = PUSHER_SVG;
  layer.append(ghost, pusher);
  document.body.appendChild(layer);
  clockWrap.style.visibility = 'hidden';
  const ease = 'cubic-bezier(.2,0,0,1)';
  const tilt = 'rotate(20deg)';
  pusher.animate([{
    offset: 0,
    opacity: 0,
    transform: `${tilt} translateX(-14px)`,
    easing: ease
  }, {
    offset: 0.18,
    opacity: 1,
    transform: `${tilt} translateX(0)`,
    easing: ease
  }, {
    offset: 0.3,
    transform: `${tilt} translateX(-7px)`,
    easing: ease
  },
  // wind-up
  {
    offset: 0.38,
    transform: `${tilt} translateX(10px)`,
    easing: ease
  },
  // push
  {
    offset: 0.45,
    opacity: 1,
    transform: `${tilt} translateX(12px)`
  }, {
    offset: 0.6,
    opacity: 0,
    transform: `${tilt} translateX(14px)`
  },
  // gone while still on the hero
  {
    offset: 1,
    opacity: 0,
    transform: `${tilt} translateX(14px)`
  }], {
    duration: PUSH_MS,
    easing: 'linear',
    fill: 'forwards'
  });

  // The snapshot is nudged by the push, then rolls down (in page space) to about a third of the
  // way into "Tus datos", fading out as the section settles.
  const targetTop = target.getBoundingClientRect().top + sy;
  const dx = Math.min(60, vw * 0.08),
    dy = targetTop + vh * 0.3 - cy;
  ghost.animate([{
    offset: 0,
    opacity: 1,
    transform: 'none'
  }, {
    offset: 0.3,
    transform: 'none',
    easing: ease
  }, {
    offset: 0.38,
    transform: 'translate(9px,4px) rotate(8deg)',
    easing: 'cubic-bezier(.4,0,.6,1)'
  }, {
    offset: 0.8,
    opacity: 1
  }, {
    offset: 1,
    opacity: 0,
    transform: `translate(${dx}px,${dy}px) rotate(120deg) scale(0.55)`
  }], {
    duration: PUSH_MS,
    easing: 'linear',
    fill: 'forwards'
  });

  // Scroll ourselves so the timing is fixed (native smooth scroll varies by browser).
  // Lead-in: on short screens bring the top of the clock into view first, so the push is seen.
  const yA = Math.max(sy, Math.min(top + size * 0.6 - vh, targetTop));
  const y1 = targetTop,
    t0 = performance.now();
  let userTook = false,
    finished = false;
  const stop = () => {
    userTook = true;
  };
  addEventListener('wheel', stop, {
    passive: true
  });
  addEventListener('touchstart', stop, {
    passive: true
  });
  const finish = () => {
    if (finished) return;
    finished = true;
    removeEventListener('wheel', stop);
    removeEventListener('touchstart', stop);
    layer.remove();
    clockWrap.style.visibility = '';
    done();
  };
  // Safety net: if frames are slow or stall (busy phone, background tab), still end on time.
  setTimeout(() => {
    if (!finished && !userTook) scrollTo(0, y1);
    finish();
  }, PUSH_MS + 50);
  const step = now => {
    if (finished) return;
    const t = now - t0;
    if (!userTook) {
      let y;
      if (t < SCROLL_FROM) y = sy + (yA - sy) * easeInOutCubic(Math.min(1, Math.max(0, t / LEAD_MS)));else y = yA + (y1 - yA) * easeInOutCubic(Math.min(1, (t - SCROLL_FROM) / (PUSH_MS - SCROLL_FROM)));
      scrollTo(0, y);
    }
    if (t < PUSH_MS) {
      requestAnimationFrame(step);
      return;
    }
    if (!userTook) scrollTo(0, y1);
    finish();
  };
  requestAnimationFrame(step);
  return true;
}

// ---------- Small presentational pieces ----------

function PillButton(_ref2) {
  let {
    onClick,
    children
  } = _ref2;
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "pill-btn",
    onClick: onClick
  }, /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, children), /*#__PURE__*/React.createElement("span", {
    className: "arr"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    weight: "bold",
    size: 18
  })));
}
function Warn(_ref3) {
  let {
    size
  } = _ref3;
  return /*#__PURE__*/React.createElement(Icon, {
    name: "warning-circle",
    weight: "fill",
    size: size
  });
}
function Issues(_ref4) {
  let {
    issues,
    goToData
  } = _ref4;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      alignItems: 'flex-start'
    }
  }, issues.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'flex-start',
      fontSize: 18,
      lineHeight: 1.4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 'none',
      paddingTop: 3,
      color: 'var(--terracotta-500)'
    }
  }, /*#__PURE__*/React.createElement(Warn, {
    size: 20
  })), /*#__PURE__*/React.createElement("span", null, m))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "link-btn",
    onClick: goToData
  }, "Completar mis datos"));
}
function Field(_ref5) {
  let {
    f
  } = _ref5;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--ink-700)',
      paddingLeft: 18
    }
  }, f.label), /*#__PURE__*/React.createElement("div", {
    className: 'field-box' + (f.hasError ? ' err' : '')
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      height: 40,
      borderRadius: '50%',
      background: 'var(--white)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: f.icon,
    size: 18
  })), f.prefix && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      color: 'var(--text-secondary)'
    }
  }, f.prefix), /*#__PURE__*/React.createElement("input", {
    type: "number",
    inputMode: "decimal",
    min: "0",
    step: "any",
    value: f.value,
    onChange: f.onChange,
    placeholder: f.placeholder,
    "aria-invalid": f.hasError || undefined
  }), f.suffix && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--text-secondary)'
    }
  }, f.suffix)), f.hasHint && /*#__PURE__*/React.createElement("span", {
    "aria-live": "polite",
    style: {
      paddingLeft: 18,
      fontSize: 13,
      color: 'var(--ink-700)'
    }
  }, f.hint), f.hasError && /*#__PURE__*/React.createElement("span", {
    role: "alert",
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center',
      paddingLeft: 18,
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--ink-900)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      color: 'var(--terracotta-500)'
    }
  }, /*#__PURE__*/React.createElement(Warn, {
    size: 16
  })), f.error));
}

// ---------- App ----------

class App extends React.Component {
  constructor() {
    super(...arguments);
    _defineProperty(this, "state", {
      ...Object.fromEntries(FIELDS.map(_ref6 => {
        let [k,, d] = _ref6;
        return [k, d];
      })),
      seen: {}
    });
    _defineProperty(this, "goToData", () => this.scrollToId('datos'));
    _defineProperty(this, "clockRef", React.createRef());
    // Hero CTA only: the clock-push transition, or a direct jump when reduced motion is on.
    _defineProperty(this, "startCalc", () => {
      if (this.pushing) return;
      const target = document.getElementById('datos');
      if (prefersReduced()) {
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY,
          behavior: 'auto'
        });
        return;
      }
      this.pushing = true;
      if (!playPushTransition(this.clockRef.current, target, () => {
        this.pushing = false;
      })) {
        this.pushing = false;
        this.goToData();
      }
    });
    _defineProperty(this, "goToResult", () => this.scrollToId('resultado'));
  }
  componentDidMount() {
    this.revealIO = new IntersectionObserver(entries => entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      el.style.opacity = '1';
      el.style.transform = 'none';
      this.revealIO.unobserve(el);
    }), {
      threshold: 0.15
    });
    this.onScroll = () => {
      if (this.raf) return;
      this.raf = requestAnimationFrame(() => {
        this.raf = 0;
        this.checkSeen();
      });
    };
    window.addEventListener('scroll', this.onScroll, {
      passive: true
    });
    window.addEventListener('resize', this.onScroll);
    this.scan();
    this.checkSeen();
  }
  componentDidUpdate() {
    this.scan();
    this.checkSeen();
  }
  componentWillUnmount() {
    this.revealIO && this.revealIO.disconnect();
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onScroll);
    cancelAnimationFrame(this.raf);
  }
  checkSeen() {
    const vh = window.innerHeight,
      add = {};
    document.querySelectorAll('[data-seen]').forEach(el => {
      const k = el.getAttribute('data-seen');
      if (this.state.seen[k]) return;
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.75 && r.bottom > vh * 0.25) add[k] = true;
    });
    if (Object.keys(add).length) this.setState(s => ({
      seen: {
        ...s.seen,
        ...add
      }
    }));
  }
  scan() {
    document.querySelectorAll('[data-reveal]:not([data-rv])').forEach(el => {
      el.setAttribute('data-rv', '1');
      if (REDUCED) return;
      const i = parseInt(el.getAttribute('data-reveal'), 10) || 0;
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = `opacity 600ms var(--ease-standard) ${i * 90}ms, transform 600ms var(--ease-standard) ${i * 90}ms`;
      this.revealIO.observe(el);
    });
  }
  scrollToId(id) {
    const el = document.getElementById(id);
    if (el) window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY,
      behavior: REDUCED ? 'auto' : 'smooth'
    });
  }
  renderVals() {
    const v = {};
    FIELDS.forEach(_ref7 => {
      let [k] = _ref7;
      const n = parseFloat(this.state[k]);
      v[k] = isFinite(n) && n > 0 ? n : 0;
    });
    const errs = {};
    FIELDS.forEach(_ref8 => {
      let [k] = _ref8;
      const n = parseFloat(this.state[k]);
      if (!isFinite(n)) return;
      if (n < 0) errs[k] = 'No puede ser un valor negativo. Escribe 0 o más.';else if (k === 'D' && n > 7) errs[k] = 'Una semana tiene 7 días como máximo.';
    });
    const dailyHint = k => {
      if (k !== 'Gt' && k !== 'Gc' || errs[k] || !(v[k] > 0)) return {
        hint: '',
        hasHint: false
      };
      if (errs.D || !(v.D > 0)) return {
        hint: 'Escribe tus días por semana para ver cuánto es al mes.',
        hasHint: true
      };
      const days = Number.isInteger(v.D) ? String(v.D) : num2.format(v.D);
      return {
        hint: `Equivale a ${money(v[k] * v.D * W)} al mes (${days} ${v.D === 1 ? 'día' : 'días'} × ${W} semanas)`,
        hasHint: true
      };
    };
    const toField = _ref9 => {
      let [k, label,, ph, prefix, suffix, icon] = _ref9;
      return {
        key: k,
        label,
        placeholder: ph,
        prefix,
        suffix,
        icon,
        value: this.state[k],
        ...dailyHint(k),
        error: errs[k] || '',
        hasError: !!errs[k],
        onChange: e => this.setState({
          [k]: e.target.value
        })
      };
    };
    const groups = GROUPS.map(_ref0 => {
      let [title, a, b] = _ref0;
      return {
        title,
        fields: FIELDS.slice(a, b).map(toField)
      };
    });
    const warnings = [];
    if (v.Hc > 48) warnings.push('el tope legal en México en 2026 es de 48 horas semanales');
    if (v.He > 9) warnings.push('En 2026 la jornada extraordinaria es de hasta 9 horas a la semana, pagadas con 100% adicional. Las horas que excedan ese límite no pueden pasar de 4 a la semana y se pagan con 200% adicional. La suma de jornada ordinaria y extraordinaria nunca puede pasar de 12 horas diarias.');
    if (v.D > 0 && (v.Hc + v.He) / v.D > 12) warnings.push('la ley fija un techo de 12 horas diarias sumando jornada ordinaria y extraordinaria');
    const blank = k => {
      var _this$state$k;
      return String((_this$state$k = this.state[k]) !== null && _this$state$k !== void 0 ? _this$state$k : '').trim() === '';
    };
    const issues = FIELDS.filter(_ref1 => {
      let [k] = _ref1;
      return errs[k];
    }).map(_ref10 => {
      let [k, label] = _ref10;
      return `${label}: ${errs[k].charAt(0).toLowerCase() + errs[k].slice(1)}`;
    });
    if (!errs.S && v.S <= 0) issues.push(blank('S') ? 'Falta tu sueldo neto mensual.' : 'Tu sueldo neto mensual debe ser mayor que cero.');
    if (errs.D) {/* reported with the field */} else if (blank('D')) issues.push('Faltan los días que trabajas por semana.');else if (v.D <= 0 && v.Hc > 0 && !errs.Hc) issues.push(`Registraste 0 días de trabajo por semana, pero ${num2.format(v.Hc).replace(/[.,]00$/, '')} horas contratadas. Las dos cosas no pueden ser ciertas a la vez: revisa cuántos días trabajas.`);else if (v.D <= 0) issues.push(blank('D') ? 'Faltan los días que trabajas por semana.' : 'Los días que trabajas por semana deben ser más de cero.');
    if (errs.Hc) {/* reported with the field */} else if (v.Hc <= 0 && v.D > 0 && !errs.D) issues.push(blank('Hc') ? 'Faltan tus horas contratadas por semana.' : `Registraste ${num2.format(v.D).replace(/[.,]00$/, '')} días de trabajo por semana, pero 0 horas contratadas. Las dos cosas no pueden ser ciertas a la vez: revisa tus horas.`);else if (v.Hc <= 0) issues.push(blank('Hc') ? 'Faltan tus horas contratadas por semana.' : 'Tus horas contratadas por semana deben ser más de cero.');
    const r = issues.length ? null : calc(v, v.D);
    const base = {
      groups,
      warnings,
      hasWarnings: warnings.length > 0,
      canCalc: !!r,
      noCalc: !r,
      issues,
      ysiIntro: 'Lo que realmente ganarías por hora con un solo cambio a la vez.'
    };
    if (!r) return base;
    const seen = this.state.seen;
    const cap = t => t.charAt(0).toUpperCase() + t.slice(1);
    const round2 = x => Math.round(x * 100) / 100;
    const cut = Math.min(30, v.T),
      off = Math.min(2, v.D);
    const nfmt = x => Number.isInteger(x) ? String(x) : num2.format(x);
    const minTxt = cut === 1 ? '1 minuto' : nfmt(cut) + ' minutos';
    const cutAll = cut > 0 && cut < 30;
    const offTxt = off === 2 ? 'dos días' : off === 1 ? 'un día' : nfmt(off) + ' días';
    const offAll = off > 0 && off < 2;
    const sc = [{
      label: `${cap(minTxt)} menos de traslado al día${cutAll ? ' (todo tu traslado)' : ''}`,
      short: '−' + nfmt(cut) + ' min',
      phrase: 'recortar ' + minTxt + ' de traslado',
      plural: false,
      note: `Traslado: ${nfmt(v.T - cut)} min al día`,
      res: calc({
        ...v,
        T: v.T - cut
      }, v.D),
      naReason: v.T === 0 ? 'No registraste tiempo de traslado.' : ''
    }, {
      label: `${cap(offTxt)} de home office${offAll ? ' (todos tus días)' : ''}`,
      short: 'Home office',
      phrase: offTxt + ' de home office',
      plural: off !== 1,
      note: `Días presenciales: ${nfmt(v.D - off)} (sin traslado ni gasto de transporte y comida esos días)`,
      res: calc(v, v.D - off),
      naReason: v.D === 0 ? 'No registraste días de trabajo por semana.' : v.T === 0 && v.Gt === 0 && v.Gc === 0 ? 'Sin traslado ni gastos diarios, trabajar desde casa no cambia el cálculo.' : ''
    }, {
      label: 'Sueldo 10% más alto',
      short: '+10% sueldo',
      phrase: 'un aumento del 10%',
      plural: false,
      note: `Sueldo: ${money(v.S * 1.1)}`,
      res: calc({
        ...v,
        S: v.S * 1.1
      }, v.D),
      naReason: v.S === 0 ? 'No registraste un sueldo.' : ''
    }];
    const deficitMode = round2(r.net) <= 0;
    sc.forEach(s => {
      s.val = s.res.con;
      s.net = s.res.net;
      s.metric = deficitMode ? s.net : s.val;
    });
    const baseMetric = deficitMode ? r.net : r.con;
    const applicable = sc.filter(s => !s.naReason);
    const best = applicable.length ? Math.max(...applicable.map(s => round2(s.metric))) : -Infinity;
    const winners = applicable.filter(s => round2(s.metric) === best);
    const improves = best > round2(baseMetric);
    const atZero = deficitMode && round2(r.net) === 0;
    const balanceLabel = n => round2(n) < 0 ? 'Déficit restante:' : round2(n) === 0 ? 'Punto de equilibrio:' : 'Te quedarían:';
    const balance = n => balanceLabel(n) + ' ' + money(Math.abs(n));
    const view = s => {
      const d = s.metric - baseMetric;
      let delta;
      if (!deficitMode) delta = `${d >= 0 ? '+' : '−'}${money(Math.abs(d))} por hora`;else if (round2(d) === 0) delta = 'No cambia tu saldo mensual';else if (atZero) delta = d > 0 ? `Mejora tu saldo y te deja ${money(s.net)} al mes` : `Te dejaría con un déficit de ${money(-s.net)} al mes`;else if (d > 0) delta = round2(s.net) > 0 ? `Elimina tu déficit y te deja ${money(s.net)} al mes` : round2(s.net) === 0 ? 'Elimina tu déficit y te deja en tu punto de equilibrio' : `Reduce tu déficit en ${money(d)} al mes`;else delta = `Aumenta tu déficit en ${money(-d)} al mes`;
      return {
        label: s.label,
        value: deficitMode ? balance(s.net) + ' al mes' : money(s.val),
        note: s.note,
        delta,
        applies: !s.naReason,
        na: !!s.naReason,
        naReason: s.naReason
      };
    };
    const showWinner = improves && winners.length === 1;
    const sorted = [...applicable].sort((a, b) => b.metric - a.metric).concat(sc.filter(s => s.naReason));
    const restApplicable = applicable.filter(s => s !== winners[0]).sort((a, b) => b.metric - a.metric);
    const goal = atZero ? 'tu saldo mensual' : deficitMode ? 'tu déficit mensual' : 'tu hora real';
    const verbs = atZero ? ['mejora', 'mejoran'] : deficitMode ? ['reduce', 'reducen'] : ['sube', 'suben'];
    const verbFor = s => s.plural ? verbs[1] : verbs[0];
    let verdict;
    if (!improves) verdict = `Con estos datos, ninguna de estas opciones ${verbs[0]} ${goal}.`;else if (!showWinner) verdict = `${cap(winners.map(w => w.phrase).join(' y '))} ${verbs[1]} ${goal} lo mismo.`;else {
      verdict = restApplicable.length ? `${cap(winners[0].phrase)} ${verbFor(winners[0])} ${goal} más que ${restApplicable.map(s => s.phrase).join(' o ')}.` : `Con tus datos, ${winners[0].phrase} es la única de estas opciones que cambia ${goal}.`;
    }
    const winner = showWinner ? view(winners[0]) : {};
    const others = (showWinner ? sorted.slice(1) : sorted).map(view);
    const chartItems = deficitMode ? applicable.map(s => ({
      src: s,
      short: s.short,
      metric: Math.max(0, s.net - r.net)
    })) : [{
      short: 'Hoy',
      metric: baseMetric
    }, ...applicable.map(s => ({
      src: s,
      short: s.short,
      metric: s.metric
    }))];
    const vals = chartItems.map(s => s.metric);
    const hi = Math.max(0, ...vals),
      lo = Math.min(0, ...vals),
      range = hi - lo || 1;
    const zero = hi / range * 100;
    const chartActiveItem = showWinner ? winners[0] : null;
    const chart = chartItems.map(s => {
      const on = !!seen.scen,
        x = s.metric;
      // A value that rounds to $0.00 gets no bar at all; others keep a minimum visible sliver.
      const hPct = on && round2(x) !== 0 ? Math.max(0.6, Math.abs(x) / range * 100) : 0;
      const top = !on ? zero : x >= 0 ? zero - hPct : zero;
      const neg = x < 0;
      return {
        short: s.short,
        value: deficitMode ? 'Mejora ' + money(x) : money(x),
        top: top + '%',
        h: hPct + '%',
        bg: chartActiveItem && s.src === chartActiveItem ? 'var(--terracotta-500)' : neg ? 'var(--ink-300)' : 'var(--white)'
      };
    });
    const pct = r.nominal > 0 ? Math.max(0, Math.min(100, r.con / r.nominal * 100)) : 0;
    const deficitAmt = Math.max(0, -r.net);
    return {
      ...base,
      nominalAnim: /*#__PURE__*/React.createElement(AnimMoney, {
        value: r.nominal,
        active: !!seen.result
      }),
      realAnim: /*#__PURE__*/React.createElement(AnimMoney, {
        value: r.con,
        active: !!seen.result
      }),
      winnerAnim: showWinner ? /*#__PURE__*/React.createElement(AnimMoney, {
        value: deficitMode ? Math.abs(winners[0].metric) : winners[0].metric,
        active: !!seen.scen
      }) : null,
      winnerPrefix: showWinner && deficitMode ? balanceLabel(winners[0].net) : '',
      winnerUnit: deficitMode ? 'al mes' : 'por hora',
      winnerTag: atZero ? 'La opción que más mejora tu saldo mensual' : deficitMode ? 'La opción que más reduce tu déficit' : 'La opción que más sube tu hora',
      deficitMode,
      normalMode: !deficitMode,
      deficitAnim: /*#__PURE__*/React.createElement(AnimMoney, {
        value: deficitAmt,
        active: !!seen.result
      }),
      deficitLabel: atZero ? 'Punto de equilibrio: trabajar no te cuesta ni te deja nada cada mes' : 'Déficit mensual: lo que te falta cada mes para cubrir lo que te cuesta trabajar',
      deficitText: atZero ? `Tus gastos por trabajar (${money(r.G)} al mes) igualan tu sueldo neto (${money(v.S)}): estás en tu punto de equilibrio. Así, la hora real vale $0.00 y deja de servir para comparar. Por eso las opciones de abajo se comparan por cuánto mejoran tu saldo mensual.` : `Tus gastos por trabajar (${money(r.G)} al mes) superan tu sueldo neto (${money(v.S)}). Con un saldo así, la hora real deja de servir para comparar: menos horas harían que la cifra pareciera empeorar. Por eso las opciones de abajo se comparan por cuánto reducen este déficit.`,
      ysiIntro: deficitMode ? `Cómo cambiaría tu saldo mensual con un solo cambio a la vez. ${atZero ? 'Hoy estás en tu punto de equilibrio: trabajar no te cuesta ni te deja nada.' : 'Hoy te faltan ' + money(deficitAmt) + ' al mes.'}` : `Lo que realmente ganarías por hora con un solo cambio a la vez. Hoy ganas ${money(r.con)}.`,
      chartTitle: deficitMode ? 'Cuánto mejora tu saldo mensual frente a hoy' : 'Lo que realmente ganas por hora en cada caso',
      zeroTop: zero + '%',
      showZero: lo < 0,
      realPct: (seen.result ? pct : 0) + '%',
      brechaText: r.brecha > 0 ? `Cada hora de tu tiempo vale ${num2.format(r.brecha)}% menos de lo que parece.` : r.brecha < 0 ? `Cada hora de tu tiempo vale ${num2.format(-r.brecha)}% más de lo que parece.` : 'Tu hora vale lo mismo que parece.',
      results: deficitMode ? [{
        label: 'Lo que crees que ganas por hora',
        value: money(r.nominal)
      }, {
        label: 'Días completos al año que pasas en traslado (si trabajaras las 52 semanas, sin vacaciones ni días feriados)',
        value: num2.format(r.dias)
      }] : [{
        label: 'Lo que ganas por hora si no contaras el traslado',
        value: money(r.sin)
      }, {
        label: 'Qué tanto menos vale tu hora de lo que parece',
        value: num2.format(r.brecha) + '%'
      }, {
        label: 'Días completos al año que pasas en traslado (si trabajaras las 52 semanas, sin vacaciones ni días feriados)',
        value: num2.format(r.dias)
      }],
      smallPrint: `Gasto mensual por trabajar: ${money(r.G)} · Horas de traslado al mes: ${num2.format(r.Ht)}${deficitMode ? ' · ' + (atZero ? 'Saldo mensual: punto de equilibrio (' + money(0) + ')' : 'Déficit mensual: ' + money(deficitAmt)) : ''}`,
      chart,
      verdict,
      winner,
      others,
      showWinner,
      noWinner: !showWinner
    };
  }
  render() {
    const d = this.renderVals();
    const {
      goToData,
      goToResult
    } = this;
    return /*#__PURE__*/React.createElement("main", {
      style: {
        fontFamily: 'var(--font-sans)',
        color: 'var(--text-primary)',
        background: 'var(--surface-page)'
      }
    }, /*#__PURE__*/React.createElement("section", {
      "data-screen-label": "01 Inicio",
      style: {
        minHeight: '100vh',
        background: 'var(--surface-hero)',
        display: 'flex',
        flexDirection: 'column',
        padding: '32px clamp(20px,5vw,64px)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 500,
        fontSize: 17,
        letterSpacing: '-0.02em'
      }
    }, "Tu sueldo real"), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '48px 64px',
        padding: '48px 0'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: '1 1 480px',
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
        maxWidth: 760
      }
    }, /*#__PURE__*/React.createElement("h1", {
      "data-reveal": "0",
      style: {
        margin: 0,
        fontWeight: 400,
        fontSize: 'clamp(44px,6.4vw,88px)',
        lineHeight: 1.02,
        letterSpacing: '-0.035em',
        textWrap: 'balance'
      }
    }, "\xBFCu\xE1nto vale realmente tu hora de trabajo?"), /*#__PURE__*/React.createElement("p", {
      "data-reveal": "1",
      style: {
        margin: 0,
        maxWidth: 560,
        fontSize: 'clamp(17px,1.6vw,20px)',
        lineHeight: 1.45
      }
    }, "Suma tus gastos, tus horas extra y tu traslado, y compara lo que crees que ganas por hora con lo que te queda de verdad. Sirve para comparar ofertas, negociar un aumento o decidir si un trabajo lejano conviene."), /*#__PURE__*/React.createElement("div", {
      "data-reveal": "2",
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        gap: '16px 24px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(Button, {
      onClick: this.startCalc
    }, "Empezar el c\xE1lculo"), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 13
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "nudge-up",
      style: {
        display: 'flex'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "hand-pointing",
      size: 18
    })), "Presiona aqu\xED para empezar")), /*#__PURE__*/React.createElement("span", {
      style: {
        minHeight: 56,
        display: 'flex',
        alignItems: 'center',
        fontSize: 14
      }
    }, "Nada se guarda ni se env\xEDa: todo ocurre en tu navegador."))), /*#__PURE__*/React.createElement("div", {
      "data-reveal": "1",
      ref: this.clockRef,
      style: {
        flex: '0 1 380px',
        display: 'flex',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement(Clock, null)))), /*#__PURE__*/React.createElement("section", {
      id: "datos",
      "data-screen-label": "02 Tus datos",
      style: {
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '80px clamp(20px,5vw,64px)',
        background: 'var(--terracotta-100)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      "aria-hidden": "true",
      className: "blob",
      style: {
        width: 620,
        height: 620,
        right: -160,
        top: -140,
        background: 'var(--terracotta-500)',
        filter: 'blur(120px)',
        opacity: 0.6
      }
    }), /*#__PURE__*/React.createElement("div", {
      "aria-hidden": "true",
      className: "blob",
      style: {
        width: 460,
        height: 460,
        left: -160,
        bottom: -160,
        background: 'var(--sage-500)',
        filter: 'blur(120px)',
        opacity: 0.45
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        width: '100%',
        maxWidth: 1160,
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 20,
        alignItems: 'stretch'
      }
    }, /*#__PURE__*/React.createElement("div", {
      "data-reveal": "0",
      className: "pad",
      style: {
        flex: '1 1 300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 40,
        background: 'var(--ink-900)',
        color: 'var(--white)',
        borderRadius: 'var(--radius-xl,24px)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        color: 'var(--ink-300)'
      }
    }, "Paso 1 de 3"), /*#__PURE__*/React.createElement("h2", {
      className: "h2-big"
    }, "Tus datos"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'clamp(20px,2vw,26px)',
        lineHeight: 1.2,
        color: 'var(--ink-400)'
      }
    }, "Lo que ganas y lo que te cuesta ganarlo")), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 15,
        lineHeight: 1.5,
        color: 'var(--ink-300)'
      }
    }, "Los resultados se recalculan mientras escribes. Los campos que ya traen un valor son los m\xE1s comunes; c\xE1mbialos si tu caso es distinto.")), /*#__PURE__*/React.createElement("div", {
      "data-reveal": "1",
      className: "glass pad",
      style: {
        flex: '2 1 560px',
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 32
      }
    }, d.groups.map(g => /*#__PURE__*/React.createElement("div", {
      key: g.title,
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 500,
        fontSize: 20,
        letterSpacing: '-0.01em'
      }
    }, g.title), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,250px),1fr))',
        gap: '18px 16px'
      }
    }, g.fields.map(f => /*#__PURE__*/React.createElement(Field, {
      key: f.key,
      f: f
    }))))), d.hasWarnings && /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        padding: '16px 20px',
        background: 'rgba(255,255,255,0.7)',
        borderRadius: 'var(--radius-md,16px)'
      }
    }, d.warnings.map((w, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        gap: 10,
        alignItems: 'flex-start',
        fontSize: 14,
        lineHeight: 1.45
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 'none',
        color: 'var(--terracotta-500)'
      }
    }, /*#__PURE__*/React.createElement(Warn, {
      size: 18
    })), /*#__PURE__*/React.createElement("span", null, "Aviso: ", w)))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'flex-end'
      }
    }, /*#__PURE__*/React.createElement(PillButton, {
      onClick: goToResult
    }, "Ver mi resultado"))))), /*#__PURE__*/React.createElement("section", {
      id: "resultado",
      "data-screen-label": "03 Resultado",
      style: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '80px clamp(20px,5vw,64px)',
        background: 'var(--gray-50)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      "data-seen": "result",
      style: {
        width: '100%',
        maxWidth: 1120,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 48
      }
    }, /*#__PURE__*/React.createElement("div", {
      "data-reveal": "0",
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: 'var(--text-secondary)'
      }
    }, "Paso 2 de 3"), /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: 0,
        fontWeight: 500,
        fontSize: 'clamp(28px,3.4vw,40px)',
        lineHeight: 1.1,
        letterSpacing: '-0.02em'
      }
    }, "Tu hora, con todo contado")), d.noCalc && /*#__PURE__*/React.createElement(Issues, {
      issues: d.issues,
      goToData: goToData
    }), d.canCalc && /*#__PURE__*/React.createElement(React.Fragment, null, d.deficitMode && /*#__PURE__*/React.createElement("div", {
      "data-reveal": "1",
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        maxWidth: 820
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 16,
        fontWeight: 500
      }
    }, d.deficitLabel), /*#__PURE__*/React.createElement("span", {
      className: "tsr-num",
      style: {
        fontSize: 'clamp(64px,9vw,120px)',
        lineHeight: 0.95,
        fontWeight: 400,
        color: 'var(--ink-900)'
      }
    }, d.deficitAnim), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 'clamp(17px,1.6vw,20px)',
        lineHeight: 1.45,
        textWrap: 'pretty'
      }
    }, d.deficitText)), d.normalMode && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))',
        gap: '40px 64px',
        alignItems: 'end'
      }
    }, /*#__PURE__*/React.createElement("div", {
      "data-reveal": "1",
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 16,
        color: 'var(--text-secondary)'
      }
    }, "Lo que crees que ganas por hora"), /*#__PURE__*/React.createElement("span", {
      className: "tsr-num",
      style: {
        fontSize: 'clamp(40px,5vw,60px)',
        lineHeight: 1,
        fontWeight: 400,
        color: 'var(--ink-500)'
      }
    }, d.nominalAnim)), /*#__PURE__*/React.createElement("div", {
      "data-reveal": "2",
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 16,
        fontWeight: 500
      }
    }, "Lo que realmente ganas por hora"), /*#__PURE__*/React.createElement("span", {
      className: "tsr-num",
      style: {
        fontSize: 'clamp(64px,9vw,120px)',
        lineHeight: 0.95,
        fontWeight: 400
      }
    }, d.realAnim))), /*#__PURE__*/React.createElement("div", {
      "data-reveal": "3",
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        height: 56,
        background: 'var(--gray-200)',
        borderRadius: 'var(--radius-sm)',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: d.realPct,
        background: 'var(--terracotta-500)',
        borderRadius: 'var(--radius-sm)',
        transition: 'width 1100ms var(--ease-standard)'
      }
    })), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 'clamp(18px,1.8vw,22px)',
        lineHeight: 1.35,
        fontWeight: 500
      }
    }, d.brechaText))), /*#__PURE__*/React.createElement("div", {
      "data-reveal": "4",
      style: {
        display: 'flex',
        flexDirection: 'column'
      }
    }, d.results.map(r => /*#__PURE__*/React.createElement("div", {
      key: r.label,
      style: {
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1fr) auto',
        gap: 16,
        alignItems: 'center',
        minHeight: 64,
        borderBottom: '1px solid var(--border-card)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 16
      }
    }, r.label), /*#__PURE__*/React.createElement("span", {
      className: "tsr-num",
      style: {
        fontSize: 22
      }
    }, r.value))), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: '16px 0 0',
        fontSize: 13,
        color: 'var(--text-secondary)'
      }
    }, d.smallPrint))))), /*#__PURE__*/React.createElement("section", {
      "data-screen-label": "04 Y si",
      style: {
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '80px clamp(20px,5vw,64px)',
        background: 'var(--terracotta-100)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      "aria-hidden": "true",
      className: "blob",
      style: {
        width: 520,
        height: 520,
        left: -180,
        top: -120,
        background: 'var(--sage-500)',
        filter: 'blur(130px)',
        opacity: 0.45
      }
    }), /*#__PURE__*/React.createElement("div", {
      "aria-hidden": "true",
      className: "blob",
      style: {
        width: 560,
        height: 560,
        right: -200,
        bottom: -200,
        background: 'var(--terracotta-500)',
        filter: 'blur(130px)',
        opacity: 0.5
      }
    }), /*#__PURE__*/React.createElement("div", {
      "data-seen": "scen",
      style: {
        position: 'relative',
        width: '100%',
        maxWidth: 1160,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 28
      }
    }, /*#__PURE__*/React.createElement("div", {
      "data-reveal": "0",
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: '12px 32px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        color: 'var(--ink-700)'
      }
    }, "Paso 3 de 3"), /*#__PURE__*/React.createElement("h2", {
      className: "h2-big"
    }, "\xBFY si...?")), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 16,
        lineHeight: 1.45,
        color: 'var(--ink-700)',
        maxWidth: 420
      }
    }, d.ysiIntro)), d.noCalc && /*#__PURE__*/React.createElement("div", {
      "data-reveal": "1",
      className: "glass pad"
    }, /*#__PURE__*/React.createElement(Issues, {
      issues: d.issues,
      goToData: goToData
    })), d.canCalc && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 20,
        alignItems: 'stretch'
      }
    }, d.showWinner && /*#__PURE__*/React.createElement("div", {
      "data-reveal": "1",
      style: {
        position: 'relative',
        overflow: 'hidden',
        flex: '3 1 560px',
        display: 'flex',
        flexWrap: 'wrap',
        padding: 12,
        minHeight: 480,
        background: 'var(--white)',
        borderRadius: 'var(--radius-xl,24px)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      "aria-hidden": "true",
      className: "blob",
      style: {
        width: 280,
        height: 280,
        left: 'calc(50% - 140px)',
        top: 'calc(50% - 140px)',
        background: 'var(--terracotta-500)'
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "pad-sm",
      style: {
        position: 'relative',
        flex: '1 1 240px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 32,
        background: 'rgba(247,247,247,0.7)',
        backdropFilter: 'blur(36px)',
        WebkitBackdropFilter: 'blur(36px)',
        borderRadius: 'calc(var(--radius-xl,24px) - 8px)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'clamp(18px,1.8vw,22px)',
        fontWeight: 500
      }
    }, d.winnerPrefix), /*#__PURE__*/React.createElement("span", {
      className: "tsr-num",
      style: {
        fontSize: 'clamp(48px,5.6vw,76px)',
        lineHeight: 1,
        letterSpacing: '-0.03em'
      }
    }, d.winnerAnim), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'clamp(24px,2.6vw,34px)',
        lineHeight: 1.1,
        color: 'var(--ink-400)'
      }
    }, d.winnerUnit)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        fontSize: 15,
        lineHeight: 1.45
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 500
      }
    }, d.winner.label), /*#__PURE__*/React.createElement("span", null, d.winner.delta), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--ink-700)'
      }
    }, d.winner.note)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: 'var(--ink-700)'
      }
    }, d.winnerTag)), /*#__PURE__*/React.createElement("div", {
      className: "pad-sm",
      style: {
        position: 'relative',
        flex: '1 1 240px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        gap: 180,
        textAlign: 'right'
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        maxWidth: 300,
        fontSize: 'clamp(18px,1.7vw,21px)',
        lineHeight: 1.35,
        fontWeight: 500,
        textWrap: 'pretty'
      }
    }, d.verdict), /*#__PURE__*/React.createElement(PillButton, {
      onClick: goToData
    }, "Cambiar mis datos"))), d.noWinner && /*#__PURE__*/React.createElement("div", {
      "data-reveal": "1",
      className: "pad",
      style: {
        flex: '3 1 560px',
        display: 'flex',
        alignItems: 'center',
        background: 'var(--white)',
        borderRadius: 'var(--radius-xl,24px)'
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontWeight: 500,
        fontSize: 'clamp(22px,2.4vw,28px)',
        lineHeight: 1.25,
        textWrap: 'pretty'
      }
    }, d.verdict)), /*#__PURE__*/React.createElement("div", {
      "data-reveal": "2",
      className: "glass pad-sm",
      style: {
        flex: '2 1 320px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 500
      }
    }, d.chartTitle), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        height: 280,
        display: 'flex',
        gap: 8
      }
    }, d.showZero && /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: d.zeroTop,
        height: 1,
        background: 'var(--ink-700)'
      }
    }), d.chart.map(c => /*#__PURE__*/React.createElement("div", {
      key: c.short,
      style: {
        position: 'relative',
        flex: 1,
        minWidth: 0,
        height: '100%'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: c.top,
        height: c.h,
        background: c.bg,
        borderRadius: 'var(--radius-sm)',
        transition: 'top 700ms var(--ease-standard),height 700ms var(--ease-standard),background 240ms var(--ease-standard)'
      }
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8
      }
    }, d.chart.map(c => /*#__PURE__*/React.createElement("div", {
      key: c.short,
      style: {
        flex: 1,
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: 500
      }
    }, c.short), /*#__PURE__*/React.createElement("span", {
      className: "tsr-num",
      style: {
        fontSize: 12,
        color: 'var(--ink-700)'
      }
    }, c.value))))))), /*#__PURE__*/React.createElement("div", {
      "data-reveal": "3",
      className: "glass",
      style: {
        display: 'flex',
        flexDirection: 'column',
        padding: '4px clamp(20px,2.6vw,32px)'
      }
    }, d.others.map(s => s.applies ? /*#__PURE__*/React.createElement("div", {
      key: s.label,
      style: {
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1fr) auto',
        gap: '4px 16px',
        padding: '18px 0',
        borderBottom: '1px solid rgba(255,255,255,0.8)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 16
      }
    }, s.label), /*#__PURE__*/React.createElement("span", {
      className: "tsr-num",
      style: {
        fontSize: 22
      }
    }, s.value), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: 'var(--ink-700)'
      }
    }, s.note), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: 'var(--ink-700)',
        textAlign: 'right'
      }
    }, s.delta)) : /*#__PURE__*/React.createElement("div", {
      key: s.label,
      style: {
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1fr) auto',
        gap: '4px 16px',
        alignItems: 'center',
        padding: '18px 0',
        borderBottom: '1px solid rgba(255,255,255,0.8)',
        color: 'var(--ink-500)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 16
      }
    }, s.label), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: 500,
        padding: '4px 12px',
        border: '1px dashed var(--ink-400)',
        borderRadius: 'var(--radius-pill)'
      }
    }, "No aplica"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        gridColumn: '1 / -1',
        color: 'var(--ink-700)'
      }
    }, s.naReason))))))), /*#__PURE__*/React.createElement("footer", {
      style: {
        padding: '40px clamp(20px,5vw,64px) 56px',
        borderTop: '1px solid var(--border-hairline)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1120,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        fontSize: 12,
        lineHeight: 1.5,
        color: 'var(--text-secondary)'
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0
      }
    }, "Los c\xE1lculos usan 4.333 semanas por mes (52 \xF7 12 redondeado). Alguien que replique el c\xE1lculo con otra constante puede obtener diferencias de centavos."), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0
      }
    }, "En el escenario de home office se asume que esos d\xEDas no hay gasto de transporte ni de comida."), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0
      }
    }, "El c\xE1lculo no incluye prestaciones, bonos ni otros beneficios, por lo que dos empleos con el mismo sueldo neto pueden no valer lo mismo."), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0
      }
    }, "El tope de 48 horas semanales corresponde a 2026 y baja de forma escalonada hasta 40 horas en 2030, conforme al ", /*#__PURE__*/React.createElement("a", {
      href: "https://dof.gob.mx/nota_detalle_popup.php?codigo=5786537",
      target: "_blank",
      rel: "noopener",
      style: {
        color: 'inherit',
        textDecoration: 'underline'
      }
    }, "decreto publicado en el Diario Oficial de la Federaci\xF3n el 1 de mayo de 2026"), ".")), /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1120,
        margin: '40px auto 0',
        paddingTop: 28,
        borderTop: '1px solid var(--border-hairline)',
        display: 'flex',
        alignItems: 'center',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 'none',
        width: 60,
        height: 60,
        padding: 3,
        background: 'var(--white)',
        borderRadius: '50%',
        border: '1px solid var(--border-card)',
        transform: 'rotate(-6deg)'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "assets/andrea-galicia.png",
      alt: "Andrea Galicia",
      style: {
        width: 52,
        height: 52,
        display: 'block',
        borderRadius: '50%',
        objectFit: 'cover',
        objectPosition: '50% 28%'
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        fontSize: 13,
        lineHeight: 1.45,
        color: 'var(--text-secondary)'
      }
    }, /*#__PURE__*/React.createElement("span", null, "Hecho por ", /*#__PURE__*/React.createElement("strong", {
      style: {
        fontWeight: 500,
        color: 'var(--ink-900)'
      }
    }, "Andrea Galicia")), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0
      }
    }, "Analista de datos con mirada de comercio internacional. Investigo qu\xE9 hay detr\xE1s de los negocios y lo explico con datos."), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0
      }
    }, "www.linkedin.com/in/andrea-galicia-puga-11346a263")))));
  }
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})();
