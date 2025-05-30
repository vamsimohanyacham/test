(function () {
  const k = document.createElement("link").relList;
  if (k && k.supports && k.supports("modulepreload")) return;
  for (const O of document.querySelectorAll('link[rel="modulepreload"]')) N(O);
  new MutationObserver((O) => {
    for (const Q of O)
      if (Q.type === "childList")
        for (const q of Q.addedNodes)
          q.tagName === "LINK" && q.rel === "modulepreload" && N(q);
  }).observe(document, { childList: !0, subtree: !0 });
  function d(O) {
    const Q = {};
    return (
      O.integrity && (Q.integrity = O.integrity),
      O.referrerPolicy && (Q.referrerPolicy = O.referrerPolicy),
      O.crossOrigin === "use-credentials"
        ? (Q.credentials = "include")
        : O.crossOrigin === "anonymous"
          ? (Q.credentials = "omit")
          : (Q.credentials = "same-origin"),
      Q
    );
  }
  function N(O) {
    if (O.ep) return;
    O.ep = !0;
    const Q = d(O);
    fetch(O.href, Q);
  }
})();
function Vf(h) {
  return h && h.__esModule && Object.prototype.hasOwnProperty.call(h, "default")
    ? h.default
    : h;
}
var Cu = { exports: {} },
  yr = {},
  Nu = { exports: {} },
  U = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Pa;
function Bf() {
  if (Pa) return U;
  Pa = 1;
  var h = Symbol.for("react.element"),
    k = Symbol.for("react.portal"),
    d = Symbol.for("react.fragment"),
    N = Symbol.for("react.strict_mode"),
    O = Symbol.for("react.profiler"),
    Q = Symbol.for("react.provider"),
    q = Symbol.for("react.context"),
    G = Symbol.for("react.forward_ref"),
    Z = Symbol.for("react.suspense"),
    ke = Symbol.for("react.memo"),
    ye = Symbol.for("react.lazy"),
    ee = Symbol.iterator;
  function Y(c) {
    return c === null || typeof c != "object"
      ? null
      : ((c = (ee && c[ee]) || c["@@iterator"]),
        typeof c == "function" ? c : null);
  }
  var We = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    Ke = Object.assign,
    re = {};
  function J(c, y, _) {
    (this.props = c),
      (this.context = y),
      (this.refs = re),
      (this.updater = _ || We);
  }
  (J.prototype.isReactComponent = {}),
    (J.prototype.setState = function (c, y) {
      if (typeof c != "object" && typeof c != "function" && c != null)
        throw Error(
          "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, c, y, "setState");
    }),
    (J.prototype.forceUpdate = function (c) {
      this.updater.enqueueForceUpdate(this, c, "forceUpdate");
    });
  function gt() {}
  gt.prototype = J.prototype;
  function at(c, y, _) {
    (this.props = c),
      (this.context = y),
      (this.refs = re),
      (this.updater = _ || We);
  }
  var be = (at.prototype = new gt());
  (be.constructor = at), Ke(be, J.prototype), (be.isPureReactComponent = !0);
  var Se = Array.isArray,
    et = Object.prototype.hasOwnProperty,
    Re = { current: null },
    je = { key: !0, ref: !0, __self: !0, __source: !0 };
  function Xe(c, y, _) {
    var D,
      B = {},
      H = null,
      $ = null;
    if (y != null)
      for (D in (y.ref !== void 0 && ($ = y.ref),
      y.key !== void 0 && (H = "" + y.key),
      y))
        et.call(y, D) && !je.hasOwnProperty(D) && (B[D] = y[D]);
    var K = arguments.length - 2;
    if (K === 1) B.children = _;
    else if (1 < K) {
      for (var le = Array(K), De = 0; De < K; De++) le[De] = arguments[De + 2];
      B.children = le;
    }
    if (c && c.defaultProps)
      for (D in ((K = c.defaultProps), K)) B[D] === void 0 && (B[D] = K[D]);
    return {
      $$typeof: h,
      type: c,
      key: H,
      ref: $,
      props: B,
      _owner: Re.current,
    };
  }
  function Rt(c, y) {
    return {
      $$typeof: h,
      type: c.type,
      key: y,
      ref: c.ref,
      props: c.props,
      _owner: c._owner,
    };
  }
  function yt(c) {
    return typeof c == "object" && c !== null && c.$$typeof === h;
  }
  function Gt(c) {
    var y = { "=": "=0", ":": "=2" };
    return (
      "$" +
      c.replace(/[=:]/g, function (_) {
        return y[_];
      })
    );
  }
  var ct = /\/+/g;
  function Ue(c, y) {
    return typeof c == "object" && c !== null && c.key != null
      ? Gt("" + c.key)
      : y.toString(36);
  }
  function tt(c, y, _, D, B) {
    var H = typeof c;
    (H === "undefined" || H === "boolean") && (c = null);
    var $ = !1;
    if (c === null) $ = !0;
    else
      switch (H) {
        case "string":
        case "number":
          $ = !0;
          break;
        case "object":
          switch (c.$$typeof) {
            case h:
            case k:
              $ = !0;
          }
      }
    if ($)
      return (
        ($ = c),
        (B = B($)),
        (c = D === "" ? "." + Ue($, 0) : D),
        Se(B)
          ? ((_ = ""),
            c != null && (_ = c.replace(ct, "$&/") + "/"),
            tt(B, y, _, "", function (De) {
              return De;
            }))
          : B != null &&
            (yt(B) &&
              (B = Rt(
                B,
                _ +
                  (!B.key || ($ && $.key === B.key)
                    ? ""
                    : ("" + B.key).replace(ct, "$&/") + "/") +
                  c,
              )),
            y.push(B)),
        1
      );
    if ((($ = 0), (D = D === "" ? "." : D + ":"), Se(c)))
      for (var K = 0; K < c.length; K++) {
        H = c[K];
        var le = D + Ue(H, K);
        $ += tt(H, y, _, le, B);
      }
    else if (((le = Y(c)), typeof le == "function"))
      for (c = le.call(c), K = 0; !(H = c.next()).done; )
        (H = H.value), (le = D + Ue(H, K++)), ($ += tt(H, y, _, le, B));
    else if (H === "object")
      throw (
        ((y = String(c)),
        Error(
          "Objects are not valid as a React child (found: " +
            (y === "[object Object]"
              ? "object with keys {" + Object.keys(c).join(", ") + "}"
              : y) +
            "). If you meant to render a collection of children, use an array instead.",
        ))
      );
    return $;
  }
  function ft(c, y, _) {
    if (c == null) return c;
    var D = [],
      B = 0;
    return (
      tt(c, D, "", "", function (H) {
        return y.call(_, H, B++);
      }),
      D
    );
  }
  function Le(c) {
    if (c._status === -1) {
      var y = c._result;
      (y = y()),
        y.then(
          function (_) {
            (c._status === 0 || c._status === -1) &&
              ((c._status = 1), (c._result = _));
          },
          function (_) {
            (c._status === 0 || c._status === -1) &&
              ((c._status = 2), (c._result = _));
          },
        ),
        c._status === -1 && ((c._status = 0), (c._result = y));
    }
    if (c._status === 1) return c._result.default;
    throw c._result;
  }
  var se = { current: null },
    E = { transition: null },
    T = {
      ReactCurrentDispatcher: se,
      ReactCurrentBatchConfig: E,
      ReactCurrentOwner: Re,
    };
  function R() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return (
    (U.Children = {
      map: ft,
      forEach: function (c, y, _) {
        ft(
          c,
          function () {
            y.apply(this, arguments);
          },
          _,
        );
      },
      count: function (c) {
        var y = 0;
        return (
          ft(c, function () {
            y++;
          }),
          y
        );
      },
      toArray: function (c) {
        return (
          ft(c, function (y) {
            return y;
          }) || []
        );
      },
      only: function (c) {
        if (!yt(c))
          throw Error(
            "React.Children.only expected to receive a single React element child.",
          );
        return c;
      },
    }),
    (U.Component = J),
    (U.Fragment = d),
    (U.Profiler = O),
    (U.PureComponent = at),
    (U.StrictMode = N),
    (U.Suspense = Z),
    (U.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = T),
    (U.act = R),
    (U.cloneElement = function (c, y, _) {
      if (c == null)
        throw Error(
          "React.cloneElement(...): The argument must be a React element, but you passed " +
            c +
            ".",
        );
      var D = Ke({}, c.props),
        B = c.key,
        H = c.ref,
        $ = c._owner;
      if (y != null) {
        if (
          (y.ref !== void 0 && ((H = y.ref), ($ = Re.current)),
          y.key !== void 0 && (B = "" + y.key),
          c.type && c.type.defaultProps)
        )
          var K = c.type.defaultProps;
        for (le in y)
          et.call(y, le) &&
            !je.hasOwnProperty(le) &&
            (D[le] = y[le] === void 0 && K !== void 0 ? K[le] : y[le]);
      }
      var le = arguments.length - 2;
      if (le === 1) D.children = _;
      else if (1 < le) {
        K = Array(le);
        for (var De = 0; De < le; De++) K[De] = arguments[De + 2];
        D.children = K;
      }
      return { $$typeof: h, type: c.type, key: B, ref: H, props: D, _owner: $ };
    }),
    (U.createContext = function (c) {
      return (
        (c = {
          $$typeof: q,
          _currentValue: c,
          _currentValue2: c,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
          _defaultValue: null,
          _globalName: null,
        }),
        (c.Provider = { $$typeof: Q, _context: c }),
        (c.Consumer = c)
      );
    }),
    (U.createElement = Xe),
    (U.createFactory = function (c) {
      var y = Xe.bind(null, c);
      return (y.type = c), y;
    }),
    (U.createRef = function () {
      return { current: null };
    }),
    (U.forwardRef = function (c) {
      return { $$typeof: G, render: c };
    }),
    (U.isValidElement = yt),
    (U.lazy = function (c) {
      return { $$typeof: ye, _payload: { _status: -1, _result: c }, _init: Le };
    }),
    (U.memo = function (c, y) {
      return { $$typeof: ke, type: c, compare: y === void 0 ? null : y };
    }),
    (U.startTransition = function (c) {
      var y = E.transition;
      E.transition = {};
      try {
        c();
      } finally {
        E.transition = y;
      }
    }),
    (U.unstable_act = R),
    (U.useCallback = function (c, y) {
      return se.current.useCallback(c, y);
    }),
    (U.useContext = function (c) {
      return se.current.useContext(c);
    }),
    (U.useDebugValue = function () {}),
    (U.useDeferredValue = function (c) {
      return se.current.useDeferredValue(c);
    }),
    (U.useEffect = function (c, y) {
      return se.current.useEffect(c, y);
    }),
    (U.useId = function () {
      return se.current.useId();
    }),
    (U.useImperativeHandle = function (c, y, _) {
      return se.current.useImperativeHandle(c, y, _);
    }),
    (U.useInsertionEffect = function (c, y) {
      return se.current.useInsertionEffect(c, y);
    }),
    (U.useLayoutEffect = function (c, y) {
      return se.current.useLayoutEffect(c, y);
    }),
    (U.useMemo = function (c, y) {
      return se.current.useMemo(c, y);
    }),
    (U.useReducer = function (c, y, _) {
      return se.current.useReducer(c, y, _);
    }),
    (U.useRef = function (c) {
      return se.current.useRef(c);
    }),
    (U.useState = function (c) {
      return se.current.useState(c);
    }),
    (U.useSyncExternalStore = function (c, y, _) {
      return se.current.useSyncExternalStore(c, y, _);
    }),
    (U.useTransition = function () {
      return se.current.useTransition();
    }),
    (U.version = "18.3.1"),
    U
  );
}
var Ia;
function zu() {
  return Ia || ((Ia = 1), (Nu.exports = Bf())), Nu.exports;
}
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ja;
function Hf() {
  if (ja) return yr;
  ja = 1;
  var h = zu(),
    k = Symbol.for("react.element"),
    d = Symbol.for("react.fragment"),
    N = Object.prototype.hasOwnProperty,
    O = h.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    Q = { key: !0, ref: !0, __self: !0, __source: !0 };
  function q(G, Z, ke) {
    var ye,
      ee = {},
      Y = null,
      We = null;
    ke !== void 0 && (Y = "" + ke),
      Z.key !== void 0 && (Y = "" + Z.key),
      Z.ref !== void 0 && (We = Z.ref);
    for (ye in Z) N.call(Z, ye) && !Q.hasOwnProperty(ye) && (ee[ye] = Z[ye]);
    if (G && G.defaultProps)
      for (ye in ((Z = G.defaultProps), Z))
        ee[ye] === void 0 && (ee[ye] = Z[ye]);
    return {
      $$typeof: k,
      type: G,
      key: Y,
      ref: We,
      props: ee,
      _owner: O.current,
    };
  }
  return (yr.Fragment = d), (yr.jsx = q), (yr.jsxs = q), yr;
}
var La;
function Wf() {
  return La || ((La = 1), (Cu.exports = Hf())), Cu.exports;
}
var v = Wf(),
  P = zu(),
  Il = {},
  Au = { exports: {} },
  _e = {},
  Ru = { exports: {} },
  Pu = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var za;
function Kf() {
  return (
    za ||
      ((za = 1),
      (function (h) {
        function k(E, T) {
          var R = E.length;
          E.push(T);
          e: for (; 0 < R; ) {
            var c = (R - 1) >>> 1,
              y = E[c];
            if (0 < O(y, T)) (E[c] = T), (E[R] = y), (R = c);
            else break e;
          }
        }
        function d(E) {
          return E.length === 0 ? null : E[0];
        }
        function N(E) {
          if (E.length === 0) return null;
          var T = E[0],
            R = E.pop();
          if (R !== T) {
            E[0] = R;
            e: for (var c = 0, y = E.length, _ = y >>> 1; c < _; ) {
              var D = 2 * (c + 1) - 1,
                B = E[D],
                H = D + 1,
                $ = E[H];
              if (0 > O(B, R))
                H < y && 0 > O($, B)
                  ? ((E[c] = $), (E[H] = R), (c = H))
                  : ((E[c] = B), (E[D] = R), (c = D));
              else if (H < y && 0 > O($, R)) (E[c] = $), (E[H] = R), (c = H);
              else break e;
            }
          }
          return T;
        }
        function O(E, T) {
          var R = E.sortIndex - T.sortIndex;
          return R !== 0 ? R : E.id - T.id;
        }
        if (
          typeof performance == "object" &&
          typeof performance.now == "function"
        ) {
          var Q = performance;
          h.unstable_now = function () {
            return Q.now();
          };
        } else {
          var q = Date,
            G = q.now();
          h.unstable_now = function () {
            return q.now() - G;
          };
        }
        var Z = [],
          ke = [],
          ye = 1,
          ee = null,
          Y = 3,
          We = !1,
          Ke = !1,
          re = !1,
          J = typeof setTimeout == "function" ? setTimeout : null,
          gt = typeof clearTimeout == "function" ? clearTimeout : null,
          at = typeof setImmediate < "u" ? setImmediate : null;
        typeof navigator < "u" &&
          navigator.scheduling !== void 0 &&
          navigator.scheduling.isInputPending !== void 0 &&
          navigator.scheduling.isInputPending.bind(navigator.scheduling);
        function be(E) {
          for (var T = d(ke); T !== null; ) {
            if (T.callback === null) N(ke);
            else if (T.startTime <= E)
              N(ke), (T.sortIndex = T.expirationTime), k(Z, T);
            else break;
            T = d(ke);
          }
        }
        function Se(E) {
          if (((re = !1), be(E), !Ke))
            if (d(Z) !== null) (Ke = !0), Le(et);
            else {
              var T = d(ke);
              T !== null && se(Se, T.startTime - E);
            }
        }
        function et(E, T) {
          (Ke = !1), re && ((re = !1), gt(Xe), (Xe = -1)), (We = !0);
          var R = Y;
          try {
            for (
              be(T), ee = d(Z);
              ee !== null && (!(ee.expirationTime > T) || (E && !Gt()));

            ) {
              var c = ee.callback;
              if (typeof c == "function") {
                (ee.callback = null), (Y = ee.priorityLevel);
                var y = c(ee.expirationTime <= T);
                (T = h.unstable_now()),
                  typeof y == "function"
                    ? (ee.callback = y)
                    : ee === d(Z) && N(Z),
                  be(T);
              } else N(Z);
              ee = d(Z);
            }
            if (ee !== null) var _ = !0;
            else {
              var D = d(ke);
              D !== null && se(Se, D.startTime - T), (_ = !1);
            }
            return _;
          } finally {
            (ee = null), (Y = R), (We = !1);
          }
        }
        var Re = !1,
          je = null,
          Xe = -1,
          Rt = 5,
          yt = -1;
        function Gt() {
          return !(h.unstable_now() - yt < Rt);
        }
        function ct() {
          if (je !== null) {
            var E = h.unstable_now();
            yt = E;
            var T = !0;
            try {
              T = je(!0, E);
            } finally {
              T ? Ue() : ((Re = !1), (je = null));
            }
          } else Re = !1;
        }
        var Ue;
        if (typeof at == "function")
          Ue = function () {
            at(ct);
          };
        else if (typeof MessageChannel < "u") {
          var tt = new MessageChannel(),
            ft = tt.port2;
          (tt.port1.onmessage = ct),
            (Ue = function () {
              ft.postMessage(null);
            });
        } else
          Ue = function () {
            J(ct, 0);
          };
        function Le(E) {
          (je = E), Re || ((Re = !0), Ue());
        }
        function se(E, T) {
          Xe = J(function () {
            E(h.unstable_now());
          }, T);
        }
        (h.unstable_IdlePriority = 5),
          (h.unstable_ImmediatePriority = 1),
          (h.unstable_LowPriority = 4),
          (h.unstable_NormalPriority = 3),
          (h.unstable_Profiling = null),
          (h.unstable_UserBlockingPriority = 2),
          (h.unstable_cancelCallback = function (E) {
            E.callback = null;
          }),
          (h.unstable_continueExecution = function () {
            Ke || We || ((Ke = !0), Le(et));
          }),
          (h.unstable_forceFrameRate = function (E) {
            0 > E || 125 < E
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                )
              : (Rt = 0 < E ? Math.floor(1e3 / E) : 5);
          }),
          (h.unstable_getCurrentPriorityLevel = function () {
            return Y;
          }),
          (h.unstable_getFirstCallbackNode = function () {
            return d(Z);
          }),
          (h.unstable_next = function (E) {
            switch (Y) {
              case 1:
              case 2:
              case 3:
                var T = 3;
                break;
              default:
                T = Y;
            }
            var R = Y;
            Y = T;
            try {
              return E();
            } finally {
              Y = R;
            }
          }),
          (h.unstable_pauseExecution = function () {}),
          (h.unstable_requestPaint = function () {}),
          (h.unstable_runWithPriority = function (E, T) {
            switch (E) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                E = 3;
            }
            var R = Y;
            Y = E;
            try {
              return T();
            } finally {
              Y = R;
            }
          }),
          (h.unstable_scheduleCallback = function (E, T, R) {
            var c = h.unstable_now();
            switch (
              (typeof R == "object" && R !== null
                ? ((R = R.delay),
                  (R = typeof R == "number" && 0 < R ? c + R : c))
                : (R = c),
              E)
            ) {
              case 1:
                var y = -1;
                break;
              case 2:
                y = 250;
                break;
              case 5:
                y = 1073741823;
                break;
              case 4:
                y = 1e4;
                break;
              default:
                y = 5e3;
            }
            return (
              (y = R + y),
              (E = {
                id: ye++,
                callback: T,
                priorityLevel: E,
                startTime: R,
                expirationTime: y,
                sortIndex: -1,
              }),
              R > c
                ? ((E.sortIndex = R),
                  k(ke, E),
                  d(Z) === null &&
                    E === d(ke) &&
                    (re ? (gt(Xe), (Xe = -1)) : (re = !0), se(Se, R - c)))
                : ((E.sortIndex = y), k(Z, E), Ke || We || ((Ke = !0), Le(et))),
              E
            );
          }),
          (h.unstable_shouldYield = Gt),
          (h.unstable_wrapCallback = function (E) {
            var T = Y;
            return function () {
              var R = Y;
              Y = T;
              try {
                return E.apply(this, arguments);
              } finally {
                Y = R;
              }
            };
          });
      })(Pu)),
    Pu
  );
}
var Fa;
function Xf() {
  return Fa || ((Fa = 1), (Ru.exports = Kf())), Ru.exports;
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Oa;
function Gf() {
  if (Oa) return _e;
  Oa = 1;
  var h = zu(),
    k = Xf();
  function d(e) {
    for (
      var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e,
        n = 1;
      n < arguments.length;
      n++
    )
      t += "&args[]=" + encodeURIComponent(arguments[n]);
    return (
      "Minified React error #" +
      e +
      "; visit " +
      t +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  var N = new Set(),
    O = {};
  function Q(e, t) {
    q(e, t), q(e + "Capture", t);
  }
  function q(e, t) {
    for (O[e] = t, e = 0; e < t.length; e++) N.add(t[e]);
  }
  var G = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    Z = Object.prototype.hasOwnProperty,
    ke =
      /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    ye = {},
    ee = {};
  function Y(e) {
    return Z.call(ee, e)
      ? !0
      : Z.call(ye, e)
        ? !1
        : ke.test(e)
          ? (ee[e] = !0)
          : ((ye[e] = !0), !1);
  }
  function We(e, t, n, r) {
    if (n !== null && n.type === 0) return !1;
    switch (typeof t) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return r
          ? !1
          : n !== null
            ? !n.acceptsBooleans
            : ((e = e.toLowerCase().slice(0, 5)),
              e !== "data-" && e !== "aria-");
      default:
        return !1;
    }
  }
  function Ke(e, t, n, r) {
    if (t === null || typeof t > "u" || We(e, t, n, r)) return !0;
    if (r) return !1;
    if (n !== null)
      switch (n.type) {
        case 3:
          return !t;
        case 4:
          return t === !1;
        case 5:
          return isNaN(t);
        case 6:
          return isNaN(t) || 1 > t;
      }
    return !1;
  }
  function re(e, t, n, r, l, i, u) {
    (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
      (this.attributeName = r),
      (this.attributeNamespace = l),
      (this.mustUseProperty = n),
      (this.propertyName = e),
      (this.type = t),
      (this.sanitizeURL = i),
      (this.removeEmptyString = u);
  }
  var J = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
    .split(" ")
    .forEach(function (e) {
      J[e] = new re(e, 0, !1, e, null, !1, !1);
    }),
    [
      ["acceptCharset", "accept-charset"],
      ["className", "class"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
    ].forEach(function (e) {
      var t = e[0];
      J[t] = new re(t, 1, !1, e[1], null, !1, !1);
    }),
    ["contentEditable", "draggable", "spellCheck", "value"].forEach(
      function (e) {
        J[e] = new re(e, 2, !1, e.toLowerCase(), null, !1, !1);
      },
    ),
    [
      "autoReverse",
      "externalResourcesRequired",
      "focusable",
      "preserveAlpha",
    ].forEach(function (e) {
      J[e] = new re(e, 2, !1, e, null, !1, !1);
    }),
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
      .split(" ")
      .forEach(function (e) {
        J[e] = new re(e, 3, !1, e.toLowerCase(), null, !1, !1);
      }),
    ["checked", "multiple", "muted", "selected"].forEach(function (e) {
      J[e] = new re(e, 3, !0, e, null, !1, !1);
    }),
    ["capture", "download"].forEach(function (e) {
      J[e] = new re(e, 4, !1, e, null, !1, !1);
    }),
    ["cols", "rows", "size", "span"].forEach(function (e) {
      J[e] = new re(e, 6, !1, e, null, !1, !1);
    }),
    ["rowSpan", "start"].forEach(function (e) {
      J[e] = new re(e, 5, !1, e.toLowerCase(), null, !1, !1);
    });
  var gt = /[\-:]([a-z])/g;
  function at(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
    .split(" ")
    .forEach(function (e) {
      var t = e.replace(gt, at);
      J[t] = new re(t, 1, !1, e, null, !1, !1);
    }),
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
      .split(" ")
      .forEach(function (e) {
        var t = e.replace(gt, at);
        J[t] = new re(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
      }),
    ["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
      var t = e.replace(gt, at);
      J[t] = new re(
        t,
        1,
        !1,
        e,
        "http://www.w3.org/XML/1998/namespace",
        !1,
        !1,
      );
    }),
    ["tabIndex", "crossOrigin"].forEach(function (e) {
      J[e] = new re(e, 1, !1, e.toLowerCase(), null, !1, !1);
    }),
    (J.xlinkHref = new re(
      "xlinkHref",
      1,
      !1,
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      !1,
    )),
    ["src", "href", "action", "formAction"].forEach(function (e) {
      J[e] = new re(e, 1, !1, e.toLowerCase(), null, !0, !0);
    });
  function be(e, t, n, r) {
    var l = J.hasOwnProperty(t) ? J[t] : null;
    (l !== null
      ? l.type !== 0
      : r ||
        !(2 < t.length) ||
        (t[0] !== "o" && t[0] !== "O") ||
        (t[1] !== "n" && t[1] !== "N")) &&
      (Ke(t, n, l, r) && (n = null),
      r || l === null
        ? Y(t) &&
          (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
        : l.mustUseProperty
          ? (e[l.propertyName] = n === null ? (l.type === 3 ? !1 : "") : n)
          : ((t = l.attributeName),
            (r = l.attributeNamespace),
            n === null
              ? e.removeAttribute(t)
              : ((l = l.type),
                (n = l === 3 || (l === 4 && n === !0) ? "" : "" + n),
                r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
  }
  var Se = h.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    et = Symbol.for("react.element"),
    Re = Symbol.for("react.portal"),
    je = Symbol.for("react.fragment"),
    Xe = Symbol.for("react.strict_mode"),
    Rt = Symbol.for("react.profiler"),
    yt = Symbol.for("react.provider"),
    Gt = Symbol.for("react.context"),
    ct = Symbol.for("react.forward_ref"),
    Ue = Symbol.for("react.suspense"),
    tt = Symbol.for("react.suspense_list"),
    ft = Symbol.for("react.memo"),
    Le = Symbol.for("react.lazy"),
    se = Symbol.for("react.offscreen"),
    E = Symbol.iterator;
  function T(e) {
    return e === null || typeof e != "object"
      ? null
      : ((e = (E && e[E]) || e["@@iterator"]),
        typeof e == "function" ? e : null);
  }
  var R = Object.assign,
    c;
  function y(e) {
    if (c === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        c = (t && t[1]) || "";
      }
    return (
      `
` +
      c +
      e
    );
  }
  var _ = !1;
  function D(e, t) {
    if (!e || _) return "";
    _ = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (t)
        if (
          ((t = function () {
            throw Error();
          }),
          Object.defineProperty(t.prototype, "props", {
            set: function () {
              throw Error();
            },
          }),
          typeof Reflect == "object" && Reflect.construct)
        ) {
          try {
            Reflect.construct(t, []);
          } catch (m) {
            var r = m;
          }
          Reflect.construct(e, [], t);
        } else {
          try {
            t.call();
          } catch (m) {
            r = m;
          }
          e.call(t.prototype);
        }
      else {
        try {
          throw Error();
        } catch (m) {
          r = m;
        }
        e();
      }
    } catch (m) {
      if (m && r && typeof m.stack == "string") {
        for (
          var l = m.stack.split(`
`),
            i = r.stack.split(`
`),
            u = l.length - 1,
            o = i.length - 1;
          1 <= u && 0 <= o && l[u] !== i[o];

        )
          o--;
        for (; 1 <= u && 0 <= o; u--, o--)
          if (l[u] !== i[o]) {
            if (u !== 1 || o !== 1)
              do
                if ((u--, o--, 0 > o || l[u] !== i[o])) {
                  var s =
                    `
` + l[u].replace(" at new ", " at ");
                  return (
                    e.displayName &&
                      s.includes("<anonymous>") &&
                      (s = s.replace("<anonymous>", e.displayName)),
                    s
                  );
                }
              while (1 <= u && 0 <= o);
            break;
          }
      }
    } finally {
      (_ = !1), (Error.prepareStackTrace = n);
    }
    return (e = e ? e.displayName || e.name : "") ? y(e) : "";
  }
  function B(e) {
    switch (e.tag) {
      case 5:
        return y(e.type);
      case 16:
        return y("Lazy");
      case 13:
        return y("Suspense");
      case 19:
        return y("SuspenseList");
      case 0:
      case 2:
      case 15:
        return (e = D(e.type, !1)), e;
      case 11:
        return (e = D(e.type.render, !1)), e;
      case 1:
        return (e = D(e.type, !0)), e;
      default:
        return "";
    }
  }
  function H(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case je:
        return "Fragment";
      case Re:
        return "Portal";
      case Rt:
        return "Profiler";
      case Xe:
        return "StrictMode";
      case Ue:
        return "Suspense";
      case tt:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Gt:
          return (e.displayName || "Context") + ".Consumer";
        case yt:
          return (e._context.displayName || "Context") + ".Provider";
        case ct:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ""),
              (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
            e
          );
        case ft:
          return (
            (t = e.displayName || null), t !== null ? t : H(e.type) || "Memo"
          );
        case Le:
          (t = e._payload), (e = e._init);
          try {
            return H(e(t));
          } catch {}
      }
    return null;
  }
  function $(e) {
    var t = e.type;
    switch (e.tag) {
      case 24:
        return "Cache";
      case 9:
        return (t.displayName || "Context") + ".Consumer";
      case 10:
        return (t._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return (
          (e = t.render),
          (e = e.displayName || e.name || ""),
          t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
        );
      case 7:
        return "Fragment";
      case 5:
        return t;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return H(t);
      case 8:
        return t === Xe ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof t == "function") return t.displayName || t.name || null;
        if (typeof t == "string") return t;
    }
    return null;
  }
  function K(e) {
    switch (typeof e) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function le(e) {
    var t = e.type;
    return (
      (e = e.nodeName) &&
      e.toLowerCase() === "input" &&
      (t === "checkbox" || t === "radio")
    );
  }
  function De(e) {
    var t = le(e) ? "checked" : "value",
      n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
      r = "" + e[t];
    if (
      !e.hasOwnProperty(t) &&
      typeof n < "u" &&
      typeof n.get == "function" &&
      typeof n.set == "function"
    ) {
      var l = n.get,
        i = n.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return l.call(this);
          },
          set: function (u) {
            (r = "" + u), i.call(this, u);
          },
        }),
        Object.defineProperty(e, t, { enumerable: n.enumerable }),
        {
          getValue: function () {
            return r;
          },
          setValue: function (u) {
            r = "" + u;
          },
          stopTracking: function () {
            (e._valueTracker = null), delete e[t];
          },
        }
      );
    }
  }
  function wr(e) {
    e._valueTracker || (e._valueTracker = De(e));
  }
  function Fu(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(),
      r = "";
    return (
      e && (r = le(e) ? (e.checked ? "true" : "false") : e.value),
      (e = r),
      e !== n ? (t.setValue(e), !0) : !1
    );
  }
  function xr(e) {
    if (
      ((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")
    )
      return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function Ll(e, t) {
    var n = t.checked;
    return R({}, t, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: n ?? e._wrapperState.initialChecked,
    });
  }
  function Ou(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue,
      r = t.checked != null ? t.checked : t.defaultChecked;
    (n = K(t.value != null ? t.value : n)),
      (e._wrapperState = {
        initialChecked: r,
        initialValue: n,
        controlled:
          t.type === "checkbox" || t.type === "radio"
            ? t.checked != null
            : t.value != null,
      });
  }
  function Tu(e, t) {
    (t = t.checked), t != null && be(e, "checked", t, !1);
  }
  function zl(e, t) {
    Tu(e, t);
    var n = K(t.value),
      r = t.type;
    if (n != null)
      r === "number"
        ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
        : e.value !== "" + n && (e.value = "" + n);
    else if (r === "submit" || r === "reset") {
      e.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value")
      ? Fl(e, t.type, n)
      : t.hasOwnProperty("defaultValue") && Fl(e, t.type, K(t.defaultValue)),
      t.checked == null &&
        t.defaultChecked != null &&
        (e.defaultChecked = !!t.defaultChecked);
  }
  function Mu(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var r = t.type;
      if (
        !(
          (r !== "submit" && r !== "reset") ||
          (t.value !== void 0 && t.value !== null)
        )
      )
        return;
      (t = "" + e._wrapperState.initialValue),
        n || t === e.value || (e.value = t),
        (e.defaultValue = t);
    }
    (n = e.name),
      n !== "" && (e.name = ""),
      (e.defaultChecked = !!e._wrapperState.initialChecked),
      n !== "" && (e.name = n);
  }
  function Fl(e, t, n) {
    (t !== "number" || xr(e.ownerDocument) !== e) &&
      (n == null
        ? (e.defaultValue = "" + e._wrapperState.initialValue)
        : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
  }
  var Fn = Array.isArray;
  function sn(e, t, n, r) {
    if (((e = e.options), t)) {
      t = {};
      for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
      for (n = 0; n < e.length; n++)
        (l = t.hasOwnProperty("$" + e[n].value)),
          e[n].selected !== l && (e[n].selected = l),
          l && r && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + K(n), t = null, l = 0; l < e.length; l++) {
        if (e[l].value === n) {
          (e[l].selected = !0), r && (e[l].defaultSelected = !0);
          return;
        }
        t !== null || e[l].disabled || (t = e[l]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Ol(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(d(91));
    return R({}, t, {
      value: void 0,
      defaultValue: void 0,
      children: "" + e._wrapperState.initialValue,
    });
  }
  function _u(e, t) {
    var n = t.value;
    if (n == null) {
      if (((n = t.children), (t = t.defaultValue), n != null)) {
        if (t != null) throw Error(d(92));
        if (Fn(n)) {
          if (1 < n.length) throw Error(d(93));
          n = n[0];
        }
        t = n;
      }
      t == null && (t = ""), (n = t);
    }
    e._wrapperState = { initialValue: K(n) };
  }
  function Uu(e, t) {
    var n = K(t.value),
      r = K(t.defaultValue);
    n != null &&
      ((n = "" + n),
      n !== e.value && (e.value = n),
      t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
      r != null && (e.defaultValue = "" + r);
  }
  function Du(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue &&
      t !== "" &&
      t !== null &&
      (e.value = t);
  }
  function Qu(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function Tl(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml"
      ? Qu(t)
      : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
        ? "http://www.w3.org/1999/xhtml"
        : e;
  }
  var kr,
    Vu = (function (e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
        ? function (t, n, r, l) {
            MSApp.execUnsafeLocalFunction(function () {
              return e(t, n, r, l);
            });
          }
        : e;
    })(function (e, t) {
      if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
        e.innerHTML = t;
      else {
        for (
          kr = kr || document.createElement("div"),
            kr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
            t = kr.firstChild;
          e.firstChild;

        )
          e.removeChild(e.firstChild);
        for (; t.firstChild; ) e.appendChild(t.firstChild);
      }
    });
  function On(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Tn = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0,
    },
    Ka = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Tn).forEach(function (e) {
    Ka.forEach(function (t) {
      (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Tn[t] = Tn[e]);
    });
  });
  function Bu(e, t, n) {
    return t == null || typeof t == "boolean" || t === ""
      ? ""
      : n || typeof t != "number" || t === 0 || (Tn.hasOwnProperty(e) && Tn[e])
        ? ("" + t).trim()
        : t + "px";
  }
  function Hu(e, t) {
    e = e.style;
    for (var n in t)
      if (t.hasOwnProperty(n)) {
        var r = n.indexOf("--") === 0,
          l = Bu(n, t[n], r);
        n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : (e[n] = l);
      }
  }
  var Xa = R(
    { menuitem: !0 },
    {
      area: !0,
      base: !0,
      br: !0,
      col: !0,
      embed: !0,
      hr: !0,
      img: !0,
      input: !0,
      keygen: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0,
    },
  );
  function Ml(e, t) {
    if (t) {
      if (Xa[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
        throw Error(d(137, e));
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null) throw Error(d(60));
        if (
          typeof t.dangerouslySetInnerHTML != "object" ||
          !("__html" in t.dangerouslySetInnerHTML)
        )
          throw Error(d(61));
      }
      if (t.style != null && typeof t.style != "object") throw Error(d(62));
    }
  }
  function _l(e, t) {
    if (e.indexOf("-") === -1) return typeof t.is == "string";
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Ul = null;
  function Dl(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var Ql = null,
    an = null,
    cn = null;
  function Wu(e) {
    if ((e = rr(e))) {
      if (typeof Ql != "function") throw Error(d(280));
      var t = e.stateNode;
      t && ((t = Wr(t)), Ql(e.stateNode, e.type, t));
    }
  }
  function Ku(e) {
    an ? (cn ? cn.push(e) : (cn = [e])) : (an = e);
  }
  function Xu() {
    if (an) {
      var e = an,
        t = cn;
      if (((cn = an = null), Wu(e), t)) for (e = 0; e < t.length; e++) Wu(t[e]);
    }
  }
  function Gu(e, t) {
    return e(t);
  }
  function Zu() {}
  var Vl = !1;
  function qu(e, t, n) {
    if (Vl) return e(t, n);
    Vl = !0;
    try {
      return Gu(e, t, n);
    } finally {
      (Vl = !1), (an !== null || cn !== null) && (Zu(), Xu());
    }
  }
  function Mn(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var r = Wr(n);
    if (r === null) return null;
    n = r[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (r = !r.disabled) ||
          ((e = e.type),
          (r = !(
            e === "button" ||
            e === "input" ||
            e === "select" ||
            e === "textarea"
          ))),
          (e = !r);
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (n && typeof n != "function") throw Error(d(231, t, typeof n));
    return n;
  }
  var Bl = !1;
  if (G)
    try {
      var _n = {};
      Object.defineProperty(_n, "passive", {
        get: function () {
          Bl = !0;
        },
      }),
        window.addEventListener("test", _n, _n),
        window.removeEventListener("test", _n, _n);
    } catch {
      Bl = !1;
    }
  function Ga(e, t, n, r, l, i, u, o, s) {
    var m = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, m);
    } catch (w) {
      this.onError(w);
    }
  }
  var Un = !1,
    Sr = null,
    Er = !1,
    Hl = null,
    Za = {
      onError: function (e) {
        (Un = !0), (Sr = e);
      },
    };
  function qa(e, t, n, r, l, i, u, o, s) {
    (Un = !1), (Sr = null), Ga.apply(Za, arguments);
  }
  function Ya(e, t, n, r, l, i, u, o, s) {
    if ((qa.apply(this, arguments), Un)) {
      if (Un) {
        var m = Sr;
        (Un = !1), (Sr = null);
      } else throw Error(d(198));
      Er || ((Er = !0), (Hl = m));
    }
  }
  function Zt(e) {
    var t = e,
      n = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
      while (e);
    }
    return t.tag === 3 ? n : null;
  }
  function Yu(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (
        (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function Ju(e) {
    if (Zt(e) !== e) throw Error(d(188));
  }
  function Ja(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = Zt(e)), t === null)) throw Error(d(188));
      return t !== e ? null : e;
    }
    for (var n = e, r = t; ; ) {
      var l = n.return;
      if (l === null) break;
      var i = l.alternate;
      if (i === null) {
        if (((r = l.return), r !== null)) {
          n = r;
          continue;
        }
        break;
      }
      if (l.child === i.child) {
        for (i = l.child; i; ) {
          if (i === n) return Ju(l), e;
          if (i === r) return Ju(l), t;
          i = i.sibling;
        }
        throw Error(d(188));
      }
      if (n.return !== r.return) (n = l), (r = i);
      else {
        for (var u = !1, o = l.child; o; ) {
          if (o === n) {
            (u = !0), (n = l), (r = i);
            break;
          }
          if (o === r) {
            (u = !0), (r = l), (n = i);
            break;
          }
          o = o.sibling;
        }
        if (!u) {
          for (o = i.child; o; ) {
            if (o === n) {
              (u = !0), (n = i), (r = l);
              break;
            }
            if (o === r) {
              (u = !0), (r = i), (n = l);
              break;
            }
            o = o.sibling;
          }
          if (!u) throw Error(d(189));
        }
      }
      if (n.alternate !== r) throw Error(d(190));
    }
    if (n.tag !== 3) throw Error(d(188));
    return n.stateNode.current === n ? e : t;
  }
  function $u(e) {
    return (e = Ja(e)), e !== null ? bu(e) : null;
  }
  function bu(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
      var t = bu(e);
      if (t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var eo = k.unstable_scheduleCallback,
    to = k.unstable_cancelCallback,
    $a = k.unstable_shouldYield,
    ba = k.unstable_requestPaint,
    ce = k.unstable_now,
    ec = k.unstable_getCurrentPriorityLevel,
    Wl = k.unstable_ImmediatePriority,
    no = k.unstable_UserBlockingPriority,
    Cr = k.unstable_NormalPriority,
    tc = k.unstable_LowPriority,
    ro = k.unstable_IdlePriority,
    Nr = null,
    dt = null;
  function nc(e) {
    if (dt && typeof dt.onCommitFiberRoot == "function")
      try {
        dt.onCommitFiberRoot(Nr, e, void 0, (e.current.flags & 128) === 128);
      } catch {}
  }
  var nt = Math.clz32 ? Math.clz32 : ic,
    rc = Math.log,
    lc = Math.LN2;
  function ic(e) {
    return (e >>>= 0), e === 0 ? 32 : (31 - ((rc(e) / lc) | 0)) | 0;
  }
  var Ar = 64,
    Rr = 4194304;
  function Dn(e) {
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return e & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return e;
    }
  }
  function Pr(e, t) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var r = 0,
      l = e.suspendedLanes,
      i = e.pingedLanes,
      u = n & 268435455;
    if (u !== 0) {
      var o = u & ~l;
      o !== 0 ? (r = Dn(o)) : ((i &= u), i !== 0 && (r = Dn(i)));
    } else (u = n & ~l), u !== 0 ? (r = Dn(u)) : i !== 0 && (r = Dn(i));
    if (r === 0) return 0;
    if (
      t !== 0 &&
      t !== r &&
      !(t & l) &&
      ((l = r & -r), (i = t & -t), l >= i || (l === 16 && (i & 4194240) !== 0))
    )
      return t;
    if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
      for (e = e.entanglements, t &= r; 0 < t; )
        (n = 31 - nt(t)), (l = 1 << n), (r |= e[n]), (t &= ~l);
    return r;
  }
  function uc(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
        return t + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function oc(e, t) {
    for (
      var n = e.suspendedLanes,
        r = e.pingedLanes,
        l = e.expirationTimes,
        i = e.pendingLanes;
      0 < i;

    ) {
      var u = 31 - nt(i),
        o = 1 << u,
        s = l[u];
      s === -1
        ? (!(o & n) || o & r) && (l[u] = uc(o, t))
        : s <= t && (e.expiredLanes |= o),
        (i &= ~o);
    }
  }
  function Kl(e) {
    return (
      (e = e.pendingLanes & -1073741825),
      e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
    );
  }
  function lo() {
    var e = Ar;
    return (Ar <<= 1), !(Ar & 4194240) && (Ar = 64), e;
  }
  function Xl(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function Qn(e, t, n) {
    (e.pendingLanes |= t),
      t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
      (e = e.eventTimes),
      (t = 31 - nt(t)),
      (e[t] = n);
  }
  function sc(e, t) {
    var n = e.pendingLanes & ~t;
    (e.pendingLanes = t),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.expiredLanes &= t),
      (e.mutableReadLanes &= t),
      (e.entangledLanes &= t),
      (t = e.entanglements);
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n; ) {
      var l = 31 - nt(n),
        i = 1 << l;
      (t[l] = 0), (r[l] = -1), (e[l] = -1), (n &= ~i);
    }
  }
  function Gl(e, t) {
    var n = (e.entangledLanes |= t);
    for (e = e.entanglements; n; ) {
      var r = 31 - nt(n),
        l = 1 << r;
      (l & t) | (e[r] & t) && (e[r] |= t), (n &= ~l);
    }
  }
  var X = 0;
  function io(e) {
    return (
      (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1
    );
  }
  var uo,
    Zl,
    oo,
    so,
    ao,
    ql = !1,
    Ir = [],
    Pt = null,
    It = null,
    jt = null,
    Vn = new Map(),
    Bn = new Map(),
    Lt = [],
    ac =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
        " ",
      );
  function co(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Pt = null;
        break;
      case "dragenter":
      case "dragleave":
        It = null;
        break;
      case "mouseover":
      case "mouseout":
        jt = null;
        break;
      case "pointerover":
      case "pointerout":
        Vn.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Bn.delete(t.pointerId);
    }
  }
  function Hn(e, t, n, r, l, i) {
    return e === null || e.nativeEvent !== i
      ? ((e = {
          blockedOn: t,
          domEventName: n,
          eventSystemFlags: r,
          nativeEvent: i,
          targetContainers: [l],
        }),
        t !== null && ((t = rr(t)), t !== null && Zl(t)),
        e)
      : ((e.eventSystemFlags |= r),
        (t = e.targetContainers),
        l !== null && t.indexOf(l) === -1 && t.push(l),
        e);
  }
  function cc(e, t, n, r, l) {
    switch (t) {
      case "focusin":
        return (Pt = Hn(Pt, e, t, n, r, l)), !0;
      case "dragenter":
        return (It = Hn(It, e, t, n, r, l)), !0;
      case "mouseover":
        return (jt = Hn(jt, e, t, n, r, l)), !0;
      case "pointerover":
        var i = l.pointerId;
        return Vn.set(i, Hn(Vn.get(i) || null, e, t, n, r, l)), !0;
      case "gotpointercapture":
        return (
          (i = l.pointerId), Bn.set(i, Hn(Bn.get(i) || null, e, t, n, r, l)), !0
        );
    }
    return !1;
  }
  function fo(e) {
    var t = qt(e.target);
    if (t !== null) {
      var n = Zt(t);
      if (n !== null) {
        if (((t = n.tag), t === 13)) {
          if (((t = Yu(n)), t !== null)) {
            (e.blockedOn = t),
              ao(e.priority, function () {
                oo(n);
              });
            return;
          }
        } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function jr(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = Jl(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var r = new n.constructor(n.type, n);
        (Ul = r), n.target.dispatchEvent(r), (Ul = null);
      } else return (t = rr(n)), t !== null && Zl(t), (e.blockedOn = n), !1;
      t.shift();
    }
    return !0;
  }
  function po(e, t, n) {
    jr(e) && n.delete(t);
  }
  function fc() {
    (ql = !1),
      Pt !== null && jr(Pt) && (Pt = null),
      It !== null && jr(It) && (It = null),
      jt !== null && jr(jt) && (jt = null),
      Vn.forEach(po),
      Bn.forEach(po);
  }
  function Wn(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      ql ||
        ((ql = !0),
        k.unstable_scheduleCallback(k.unstable_NormalPriority, fc)));
  }
  function Kn(e) {
    function t(l) {
      return Wn(l, e);
    }
    if (0 < Ir.length) {
      Wn(Ir[0], e);
      for (var n = 1; n < Ir.length; n++) {
        var r = Ir[n];
        r.blockedOn === e && (r.blockedOn = null);
      }
    }
    for (
      Pt !== null && Wn(Pt, e),
        It !== null && Wn(It, e),
        jt !== null && Wn(jt, e),
        Vn.forEach(t),
        Bn.forEach(t),
        n = 0;
      n < Lt.length;
      n++
    )
      (r = Lt[n]), r.blockedOn === e && (r.blockedOn = null);
    for (; 0 < Lt.length && ((n = Lt[0]), n.blockedOn === null); )
      fo(n), n.blockedOn === null && Lt.shift();
  }
  var fn = Se.ReactCurrentBatchConfig,
    Lr = !0;
  function dc(e, t, n, r) {
    var l = X,
      i = fn.transition;
    fn.transition = null;
    try {
      (X = 1), Yl(e, t, n, r);
    } finally {
      (X = l), (fn.transition = i);
    }
  }
  function pc(e, t, n, r) {
    var l = X,
      i = fn.transition;
    fn.transition = null;
    try {
      (X = 4), Yl(e, t, n, r);
    } finally {
      (X = l), (fn.transition = i);
    }
  }
  function Yl(e, t, n, r) {
    if (Lr) {
      var l = Jl(e, t, n, r);
      if (l === null) mi(e, t, r, zr, n), co(e, r);
      else if (cc(l, e, t, n, r)) r.stopPropagation();
      else if ((co(e, r), t & 4 && -1 < ac.indexOf(e))) {
        for (; l !== null; ) {
          var i = rr(l);
          if (
            (i !== null && uo(i),
            (i = Jl(e, t, n, r)),
            i === null && mi(e, t, r, zr, n),
            i === l)
          )
            break;
          l = i;
        }
        l !== null && r.stopPropagation();
      } else mi(e, t, r, null, n);
    }
  }
  var zr = null;
  function Jl(e, t, n, r) {
    if (((zr = null), (e = Dl(r)), (e = qt(e)), e !== null))
      if (((t = Zt(e)), t === null)) e = null;
      else if (((n = t.tag), n === 13)) {
        if (((e = Yu(t)), e !== null)) return e;
        e = null;
      } else if (n === 3) {
        if (t.stateNode.current.memoizedState.isDehydrated)
          return t.tag === 3 ? t.stateNode.containerInfo : null;
        e = null;
      } else t !== e && (e = null);
    return (zr = e), null;
  }
  function mo(e) {
    switch (e) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (ec()) {
          case Wl:
            return 1;
          case no:
            return 4;
          case Cr:
          case tc:
            return 16;
          case ro:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var zt = null,
    $l = null,
    Fr = null;
  function ho() {
    if (Fr) return Fr;
    var e,
      t = $l,
      n = t.length,
      r,
      l = "value" in zt ? zt.value : zt.textContent,
      i = l.length;
    for (e = 0; e < n && t[e] === l[e]; e++);
    var u = n - e;
    for (r = 1; r <= u && t[n - r] === l[i - r]; r++);
    return (Fr = l.slice(e, 1 < r ? 1 - r : void 0));
  }
  function Or(e) {
    var t = e.keyCode;
    return (
      "charCode" in e
        ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
        : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function Tr() {
    return !0;
  }
  function vo() {
    return !1;
  }
  function Qe(e) {
    function t(n, r, l, i, u) {
      (this._reactName = n),
        (this._targetInst = l),
        (this.type = r),
        (this.nativeEvent = i),
        (this.target = u),
        (this.currentTarget = null);
      for (var o in e)
        e.hasOwnProperty(o) && ((n = e[o]), (this[o] = n ? n(i) : i[o]));
      return (
        (this.isDefaultPrevented = (
          i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1
        )
          ? Tr
          : vo),
        (this.isPropagationStopped = vo),
        this
      );
    }
    return (
      R(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var n = this.nativeEvent;
          n &&
            (n.preventDefault
              ? n.preventDefault()
              : typeof n.returnValue != "unknown" && (n.returnValue = !1),
            (this.isDefaultPrevented = Tr));
        },
        stopPropagation: function () {
          var n = this.nativeEvent;
          n &&
            (n.stopPropagation
              ? n.stopPropagation()
              : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
            (this.isPropagationStopped = Tr));
        },
        persist: function () {},
        isPersistent: Tr,
      }),
      t
    );
  }
  var dn = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    bl = Qe(dn),
    Xn = R({}, dn, { view: 0, detail: 0 }),
    mc = Qe(Xn),
    ei,
    ti,
    Gn,
    Mr = R({}, Xn, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: ri,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget;
      },
      movementX: function (e) {
        return "movementX" in e
          ? e.movementX
          : (e !== Gn &&
              (Gn && e.type === "mousemove"
                ? ((ei = e.screenX - Gn.screenX), (ti = e.screenY - Gn.screenY))
                : (ti = ei = 0),
              (Gn = e)),
            ei);
      },
      movementY: function (e) {
        return "movementY" in e ? e.movementY : ti;
      },
    }),
    go = Qe(Mr),
    hc = R({}, Mr, { dataTransfer: 0 }),
    vc = Qe(hc),
    gc = R({}, Xn, { relatedTarget: 0 }),
    ni = Qe(gc),
    yc = R({}, dn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    wc = Qe(yc),
    xc = R({}, dn, {
      clipboardData: function (e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      },
    }),
    kc = Qe(xc),
    Sc = R({}, dn, { data: 0 }),
    yo = Qe(Sc),
    Ec = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    Cc = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    Nc = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function Ac(e) {
    var t = this.nativeEvent;
    return t.getModifierState
      ? t.getModifierState(e)
      : (e = Nc[e])
        ? !!t[e]
        : !1;
  }
  function ri() {
    return Ac;
  }
  var Rc = R({}, Xn, {
      key: function (e) {
        if (e.key) {
          var t = Ec[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress"
          ? ((e = Or(e)), e === 13 ? "Enter" : String.fromCharCode(e))
          : e.type === "keydown" || e.type === "keyup"
            ? Cc[e.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: ri,
      charCode: function (e) {
        return e.type === "keypress" ? Or(e) : 0;
      },
      keyCode: function (e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === "keypress"
          ? Or(e)
          : e.type === "keydown" || e.type === "keyup"
            ? e.keyCode
            : 0;
      },
    }),
    Pc = Qe(Rc),
    Ic = R({}, Mr, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    wo = Qe(Ic),
    jc = R({}, Xn, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: ri,
    }),
    Lc = Qe(jc),
    zc = R({}, dn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Fc = Qe(zc),
    Oc = R({}, Mr, {
      deltaX: function (e) {
        return "deltaX" in e
          ? e.deltaX
          : "wheelDeltaX" in e
            ? -e.wheelDeltaX
            : 0;
      },
      deltaY: function (e) {
        return "deltaY" in e
          ? e.deltaY
          : "wheelDeltaY" in e
            ? -e.wheelDeltaY
            : "wheelDelta" in e
              ? -e.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    Tc = Qe(Oc),
    Mc = [9, 13, 27, 32],
    li = G && "CompositionEvent" in window,
    Zn = null;
  G && "documentMode" in document && (Zn = document.documentMode);
  var _c = G && "TextEvent" in window && !Zn,
    xo = G && (!li || (Zn && 8 < Zn && 11 >= Zn)),
    ko = " ",
    So = !1;
  function Eo(e, t) {
    switch (e) {
      case "keyup":
        return Mc.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Co(e) {
    return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
  }
  var pn = !1;
  function Uc(e, t) {
    switch (e) {
      case "compositionend":
        return Co(t);
      case "keypress":
        return t.which !== 32 ? null : ((So = !0), ko);
      case "textInput":
        return (e = t.data), e === ko && So ? null : e;
      default:
        return null;
    }
  }
  function Dc(e, t) {
    if (pn)
      return e === "compositionend" || (!li && Eo(e, t))
        ? ((e = ho()), (Fr = $l = zt = null), (pn = !1), e)
        : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return xo && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Qc = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function No(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Qc[e.type] : t === "textarea";
  }
  function Ao(e, t, n, r) {
    Ku(r),
      (t = Vr(t, "onChange")),
      0 < t.length &&
        ((n = new bl("onChange", "change", null, n, r)),
        e.push({ event: n, listeners: t }));
  }
  var qn = null,
    Yn = null;
  function Vc(e) {
    Wo(e, 0);
  }
  function _r(e) {
    var t = yn(e);
    if (Fu(t)) return e;
  }
  function Bc(e, t) {
    if (e === "change") return t;
  }
  var Ro = !1;
  if (G) {
    var ii;
    if (G) {
      var ui = "oninput" in document;
      if (!ui) {
        var Po = document.createElement("div");
        Po.setAttribute("oninput", "return;"),
          (ui = typeof Po.oninput == "function");
      }
      ii = ui;
    } else ii = !1;
    Ro = ii && (!document.documentMode || 9 < document.documentMode);
  }
  function Io() {
    qn && (qn.detachEvent("onpropertychange", jo), (Yn = qn = null));
  }
  function jo(e) {
    if (e.propertyName === "value" && _r(Yn)) {
      var t = [];
      Ao(t, Yn, e, Dl(e)), qu(Vc, t);
    }
  }
  function Hc(e, t, n) {
    e === "focusin"
      ? (Io(), (qn = t), (Yn = n), qn.attachEvent("onpropertychange", jo))
      : e === "focusout" && Io();
  }
  function Wc(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return _r(Yn);
  }
  function Kc(e, t) {
    if (e === "click") return _r(t);
  }
  function Xc(e, t) {
    if (e === "input" || e === "change") return _r(t);
  }
  function Gc(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var rt = typeof Object.is == "function" ? Object.is : Gc;
  function Jn(e, t) {
    if (rt(e, t)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    var n = Object.keys(e),
      r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (r = 0; r < n.length; r++) {
      var l = n[r];
      if (!Z.call(t, l) || !rt(e[l], t[l])) return !1;
    }
    return !0;
  }
  function Lo(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function zo(e, t) {
    var n = Lo(e);
    e = 0;
    for (var r; n; ) {
      if (n.nodeType === 3) {
        if (((r = e + n.textContent.length), e <= t && r >= t))
          return { node: n, offset: t - e };
        e = r;
      }
      e: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break e;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = Lo(n);
    }
  }
  function Fo(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? Fo(e, t.parentNode)
            : "contains" in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function Oo() {
    for (var e = window, t = xr(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = xr(e.document);
    }
    return t;
  }
  function oi(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
      t &&
      ((t === "input" &&
        (e.type === "text" ||
          e.type === "search" ||
          e.type === "tel" ||
          e.type === "url" ||
          e.type === "password")) ||
        t === "textarea" ||
        e.contentEditable === "true")
    );
  }
  function Zc(e) {
    var t = Oo(),
      n = e.focusedElem,
      r = e.selectionRange;
    if (
      t !== n &&
      n &&
      n.ownerDocument &&
      Fo(n.ownerDocument.documentElement, n)
    ) {
      if (r !== null && oi(n)) {
        if (
          ((t = r.start),
          (e = r.end),
          e === void 0 && (e = t),
          "selectionStart" in n)
        )
          (n.selectionStart = t),
            (n.selectionEnd = Math.min(e, n.value.length));
        else if (
          ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
          e.getSelection)
        ) {
          e = e.getSelection();
          var l = n.textContent.length,
            i = Math.min(r.start, l);
          (r = r.end === void 0 ? i : Math.min(r.end, l)),
            !e.extend && i > r && ((l = r), (r = i), (i = l)),
            (l = zo(n, i));
          var u = zo(n, r);
          l &&
            u &&
            (e.rangeCount !== 1 ||
              e.anchorNode !== l.node ||
              e.anchorOffset !== l.offset ||
              e.focusNode !== u.node ||
              e.focusOffset !== u.offset) &&
            ((t = t.createRange()),
            t.setStart(l.node, l.offset),
            e.removeAllRanges(),
            i > r
              ? (e.addRange(t), e.extend(u.node, u.offset))
              : (t.setEnd(u.node, u.offset), e.addRange(t)));
        }
      }
      for (t = [], e = n; (e = e.parentNode); )
        e.nodeType === 1 &&
          t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
      for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
        (e = t[n]),
          (e.element.scrollLeft = e.left),
          (e.element.scrollTop = e.top);
    }
  }
  var qc = G && "documentMode" in document && 11 >= document.documentMode,
    mn = null,
    si = null,
    $n = null,
    ai = !1;
  function To(e, t, n) {
    var r =
      n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    ai ||
      mn == null ||
      mn !== xr(r) ||
      ((r = mn),
      "selectionStart" in r && oi(r)
        ? (r = { start: r.selectionStart, end: r.selectionEnd })
        : ((r = (
            (r.ownerDocument && r.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (r = {
            anchorNode: r.anchorNode,
            anchorOffset: r.anchorOffset,
            focusNode: r.focusNode,
            focusOffset: r.focusOffset,
          })),
      ($n && Jn($n, r)) ||
        (($n = r),
        (r = Vr(si, "onSelect")),
        0 < r.length &&
          ((t = new bl("onSelect", "select", null, t, n)),
          e.push({ event: t, listeners: r }),
          (t.target = mn))));
  }
  function Ur(e, t) {
    var n = {};
    return (
      (n[e.toLowerCase()] = t.toLowerCase()),
      (n["Webkit" + e] = "webkit" + t),
      (n["Moz" + e] = "moz" + t),
      n
    );
  }
  var hn = {
      animationend: Ur("Animation", "AnimationEnd"),
      animationiteration: Ur("Animation", "AnimationIteration"),
      animationstart: Ur("Animation", "AnimationStart"),
      transitionend: Ur("Transition", "TransitionEnd"),
    },
    ci = {},
    Mo = {};
  G &&
    ((Mo = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete hn.animationend.animation,
      delete hn.animationiteration.animation,
      delete hn.animationstart.animation),
    "TransitionEvent" in window || delete hn.transitionend.transition);
  function Dr(e) {
    if (ci[e]) return ci[e];
    if (!hn[e]) return e;
    var t = hn[e],
      n;
    for (n in t) if (t.hasOwnProperty(n) && n in Mo) return (ci[e] = t[n]);
    return e;
  }
  var _o = Dr("animationend"),
    Uo = Dr("animationiteration"),
    Do = Dr("animationstart"),
    Qo = Dr("transitionend"),
    Vo = new Map(),
    Bo =
      "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " ",
      );
  function Ft(e, t) {
    Vo.set(e, t), Q(t, [e]);
  }
  for (var fi = 0; fi < Bo.length; fi++) {
    var di = Bo[fi],
      Yc = di.toLowerCase(),
      Jc = di[0].toUpperCase() + di.slice(1);
    Ft(Yc, "on" + Jc);
  }
  Ft(_o, "onAnimationEnd"),
    Ft(Uo, "onAnimationIteration"),
    Ft(Do, "onAnimationStart"),
    Ft("dblclick", "onDoubleClick"),
    Ft("focusin", "onFocus"),
    Ft("focusout", "onBlur"),
    Ft(Qo, "onTransitionEnd"),
    q("onMouseEnter", ["mouseout", "mouseover"]),
    q("onMouseLeave", ["mouseout", "mouseover"]),
    q("onPointerEnter", ["pointerout", "pointerover"]),
    q("onPointerLeave", ["pointerout", "pointerover"]),
    Q(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " ",
      ),
    ),
    Q(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " ",
      ),
    ),
    Q("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    Q(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" "),
    ),
    Q(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" "),
    ),
    Q(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
    );
  var bn =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " ",
      ),
    $c = new Set(
      "cancel close invalid load scroll toggle".split(" ").concat(bn),
    );
  function Ho(e, t, n) {
    var r = e.type || "unknown-event";
    (e.currentTarget = n), Ya(r, t, void 0, e), (e.currentTarget = null);
  }
  function Wo(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var r = e[n],
        l = r.event;
      r = r.listeners;
      e: {
        var i = void 0;
        if (t)
          for (var u = r.length - 1; 0 <= u; u--) {
            var o = r[u],
              s = o.instance,
              m = o.currentTarget;
            if (((o = o.listener), s !== i && l.isPropagationStopped()))
              break e;
            Ho(l, o, m), (i = s);
          }
        else
          for (u = 0; u < r.length; u++) {
            if (
              ((o = r[u]),
              (s = o.instance),
              (m = o.currentTarget),
              (o = o.listener),
              s !== i && l.isPropagationStopped())
            )
              break e;
            Ho(l, o, m), (i = s);
          }
      }
    }
    if (Er) throw ((e = Hl), (Er = !1), (Hl = null), e);
  }
  function te(e, t) {
    var n = t[xi];
    n === void 0 && (n = t[xi] = new Set());
    var r = e + "__bubble";
    n.has(r) || (Ko(t, e, 2, !1), n.add(r));
  }
  function pi(e, t, n) {
    var r = 0;
    t && (r |= 4), Ko(n, e, r, t);
  }
  var Qr = "_reactListening" + Math.random().toString(36).slice(2);
  function er(e) {
    if (!e[Qr]) {
      (e[Qr] = !0),
        N.forEach(function (n) {
          n !== "selectionchange" && ($c.has(n) || pi(n, !1, e), pi(n, !0, e));
        });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Qr] || ((t[Qr] = !0), pi("selectionchange", !1, t));
    }
  }
  function Ko(e, t, n, r) {
    switch (mo(t)) {
      case 1:
        var l = dc;
        break;
      case 4:
        l = pc;
        break;
      default:
        l = Yl;
    }
    (n = l.bind(null, t, n, e)),
      (l = void 0),
      !Bl ||
        (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
        (l = !0),
      r
        ? l !== void 0
          ? e.addEventListener(t, n, { capture: !0, passive: l })
          : e.addEventListener(t, n, !0)
        : l !== void 0
          ? e.addEventListener(t, n, { passive: l })
          : e.addEventListener(t, n, !1);
  }
  function mi(e, t, n, r, l) {
    var i = r;
    if (!(t & 1) && !(t & 2) && r !== null)
      e: for (;;) {
        if (r === null) return;
        var u = r.tag;
        if (u === 3 || u === 4) {
          var o = r.stateNode.containerInfo;
          if (o === l || (o.nodeType === 8 && o.parentNode === l)) break;
          if (u === 4)
            for (u = r.return; u !== null; ) {
              var s = u.tag;
              if (
                (s === 3 || s === 4) &&
                ((s = u.stateNode.containerInfo),
                s === l || (s.nodeType === 8 && s.parentNode === l))
              )
                return;
              u = u.return;
            }
          for (; o !== null; ) {
            if (((u = qt(o)), u === null)) return;
            if (((s = u.tag), s === 5 || s === 6)) {
              r = i = u;
              continue e;
            }
            o = o.parentNode;
          }
        }
        r = r.return;
      }
    qu(function () {
      var m = i,
        w = Dl(n),
        x = [];
      e: {
        var g = Vo.get(e);
        if (g !== void 0) {
          var C = bl,
            I = e;
          switch (e) {
            case "keypress":
              if (Or(n) === 0) break e;
            case "keydown":
            case "keyup":
              C = Pc;
              break;
            case "focusin":
              (I = "focus"), (C = ni);
              break;
            case "focusout":
              (I = "blur"), (C = ni);
              break;
            case "beforeblur":
            case "afterblur":
              C = ni;
              break;
            case "click":
              if (n.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              C = go;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              C = vc;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              C = Lc;
              break;
            case _o:
            case Uo:
            case Do:
              C = wc;
              break;
            case Qo:
              C = Fc;
              break;
            case "scroll":
              C = mc;
              break;
            case "wheel":
              C = Tc;
              break;
            case "copy":
            case "cut":
            case "paste":
              C = kc;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              C = wo;
          }
          var j = (t & 4) !== 0,
            fe = !j && e === "scroll",
            f = j ? (g !== null ? g + "Capture" : null) : g;
          j = [];
          for (var a = m, p; a !== null; ) {
            p = a;
            var S = p.stateNode;
            if (
              (p.tag === 5 &&
                S !== null &&
                ((p = S),
                f !== null &&
                  ((S = Mn(a, f)), S != null && j.push(tr(a, S, p)))),
              fe)
            )
              break;
            a = a.return;
          }
          0 < j.length &&
            ((g = new C(g, I, null, n, w)), x.push({ event: g, listeners: j }));
        }
      }
      if (!(t & 7)) {
        e: {
          if (
            ((g = e === "mouseover" || e === "pointerover"),
            (C = e === "mouseout" || e === "pointerout"),
            g &&
              n !== Ul &&
              (I = n.relatedTarget || n.fromElement) &&
              (qt(I) || I[wt]))
          )
            break e;
          if (
            (C || g) &&
            ((g =
              w.window === w
                ? w
                : (g = w.ownerDocument)
                  ? g.defaultView || g.parentWindow
                  : window),
            C
              ? ((I = n.relatedTarget || n.toElement),
                (C = m),
                (I = I ? qt(I) : null),
                I !== null &&
                  ((fe = Zt(I)), I !== fe || (I.tag !== 5 && I.tag !== 6)) &&
                  (I = null))
              : ((C = null), (I = m)),
            C !== I)
          ) {
            if (
              ((j = go),
              (S = "onMouseLeave"),
              (f = "onMouseEnter"),
              (a = "mouse"),
              (e === "pointerout" || e === "pointerover") &&
                ((j = wo),
                (S = "onPointerLeave"),
                (f = "onPointerEnter"),
                (a = "pointer")),
              (fe = C == null ? g : yn(C)),
              (p = I == null ? g : yn(I)),
              (g = new j(S, a + "leave", C, n, w)),
              (g.target = fe),
              (g.relatedTarget = p),
              (S = null),
              qt(w) === m &&
                ((j = new j(f, a + "enter", I, n, w)),
                (j.target = p),
                (j.relatedTarget = fe),
                (S = j)),
              (fe = S),
              C && I)
            )
              t: {
                for (j = C, f = I, a = 0, p = j; p; p = vn(p)) a++;
                for (p = 0, S = f; S; S = vn(S)) p++;
                for (; 0 < a - p; ) (j = vn(j)), a--;
                for (; 0 < p - a; ) (f = vn(f)), p--;
                for (; a--; ) {
                  if (j === f || (f !== null && j === f.alternate)) break t;
                  (j = vn(j)), (f = vn(f));
                }
                j = null;
              }
            else j = null;
            C !== null && Xo(x, g, C, j, !1),
              I !== null && fe !== null && Xo(x, fe, I, j, !0);
          }
        }
        e: {
          if (
            ((g = m ? yn(m) : window),
            (C = g.nodeName && g.nodeName.toLowerCase()),
            C === "select" || (C === "input" && g.type === "file"))
          )
            var L = Bc;
          else if (No(g))
            if (Ro) L = Xc;
            else {
              L = Wc;
              var z = Hc;
            }
          else
            (C = g.nodeName) &&
              C.toLowerCase() === "input" &&
              (g.type === "checkbox" || g.type === "radio") &&
              (L = Kc);
          if (L && (L = L(e, m))) {
            Ao(x, L, n, w);
            break e;
          }
          z && z(e, g, m),
            e === "focusout" &&
              (z = g._wrapperState) &&
              z.controlled &&
              g.type === "number" &&
              Fl(g, "number", g.value);
        }
        switch (((z = m ? yn(m) : window), e)) {
          case "focusin":
            (No(z) || z.contentEditable === "true") &&
              ((mn = z), (si = m), ($n = null));
            break;
          case "focusout":
            $n = si = mn = null;
            break;
          case "mousedown":
            ai = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            (ai = !1), To(x, n, w);
            break;
          case "selectionchange":
            if (qc) break;
          case "keydown":
          case "keyup":
            To(x, n, w);
        }
        var F;
        if (li)
          e: {
            switch (e) {
              case "compositionstart":
                var M = "onCompositionStart";
                break e;
              case "compositionend":
                M = "onCompositionEnd";
                break e;
              case "compositionupdate":
                M = "onCompositionUpdate";
                break e;
            }
            M = void 0;
          }
        else
          pn
            ? Eo(e, n) && (M = "onCompositionEnd")
            : e === "keydown" &&
              n.keyCode === 229 &&
              (M = "onCompositionStart");
        M &&
          (xo &&
            n.locale !== "ko" &&
            (pn || M !== "onCompositionStart"
              ? M === "onCompositionEnd" && pn && (F = ho())
              : ((zt = w),
                ($l = "value" in zt ? zt.value : zt.textContent),
                (pn = !0))),
          (z = Vr(m, M)),
          0 < z.length &&
            ((M = new yo(M, e, null, n, w)),
            x.push({ event: M, listeners: z }),
            F ? (M.data = F) : ((F = Co(n)), F !== null && (M.data = F)))),
          (F = _c ? Uc(e, n) : Dc(e, n)) &&
            ((m = Vr(m, "onBeforeInput")),
            0 < m.length &&
              ((w = new yo("onBeforeInput", "beforeinput", null, n, w)),
              x.push({ event: w, listeners: m }),
              (w.data = F)));
      }
      Wo(x, t);
    });
  }
  function tr(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
  }
  function Vr(e, t) {
    for (var n = t + "Capture", r = []; e !== null; ) {
      var l = e,
        i = l.stateNode;
      l.tag === 5 &&
        i !== null &&
        ((l = i),
        (i = Mn(e, n)),
        i != null && r.unshift(tr(e, i, l)),
        (i = Mn(e, t)),
        i != null && r.push(tr(e, i, l))),
        (e = e.return);
    }
    return r;
  }
  function vn(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function Xo(e, t, n, r, l) {
    for (var i = t._reactName, u = []; n !== null && n !== r; ) {
      var o = n,
        s = o.alternate,
        m = o.stateNode;
      if (s !== null && s === r) break;
      o.tag === 5 &&
        m !== null &&
        ((o = m),
        l
          ? ((s = Mn(n, i)), s != null && u.unshift(tr(n, s, o)))
          : l || ((s = Mn(n, i)), s != null && u.push(tr(n, s, o)))),
        (n = n.return);
    }
    u.length !== 0 && e.push({ event: t, listeners: u });
  }
  var bc = /\r\n?/g,
    ef = /\u0000|\uFFFD/g;
  function Go(e) {
    return (typeof e == "string" ? e : "" + e)
      .replace(
        bc,
        `
`,
      )
      .replace(ef, "");
  }
  function Br(e, t, n) {
    if (((t = Go(t)), Go(e) !== t && n)) throw Error(d(425));
  }
  function Hr() {}
  var hi = null,
    vi = null;
  function gi(e, t) {
    return (
      e === "textarea" ||
      e === "noscript" ||
      typeof t.children == "string" ||
      typeof t.children == "number" ||
      (typeof t.dangerouslySetInnerHTML == "object" &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var yi = typeof setTimeout == "function" ? setTimeout : void 0,
    tf = typeof clearTimeout == "function" ? clearTimeout : void 0,
    Zo = typeof Promise == "function" ? Promise : void 0,
    nf =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof Zo < "u"
          ? function (e) {
              return Zo.resolve(null).then(e).catch(rf);
            }
          : yi;
  function rf(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function wi(e, t) {
    var n = t,
      r = 0;
    do {
      var l = n.nextSibling;
      if ((e.removeChild(n), l && l.nodeType === 8))
        if (((n = l.data), n === "/$")) {
          if (r === 0) {
            e.removeChild(l), Kn(t);
            return;
          }
          r--;
        } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
      n = l;
    } while (n);
    Kn(t);
  }
  function Ot(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
        if (t === "/$") return null;
      }
    }
    return e;
  }
  function qo(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "$" || n === "$!" || n === "$?") {
          if (t === 0) return e;
          t--;
        } else n === "/$" && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  var gn = Math.random().toString(36).slice(2),
    pt = "__reactFiber$" + gn,
    nr = "__reactProps$" + gn,
    wt = "__reactContainer$" + gn,
    xi = "__reactEvents$" + gn,
    lf = "__reactListeners$" + gn,
    uf = "__reactHandles$" + gn;
  function qt(e) {
    var t = e[pt];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if ((t = n[wt] || n[pt])) {
        if (
          ((n = t.alternate),
          t.child !== null || (n !== null && n.child !== null))
        )
          for (e = qo(e); e !== null; ) {
            if ((n = e[pt])) return n;
            e = qo(e);
          }
        return t;
      }
      (e = n), (n = e.parentNode);
    }
    return null;
  }
  function rr(e) {
    return (
      (e = e[pt] || e[wt]),
      !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3)
        ? null
        : e
    );
  }
  function yn(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(d(33));
  }
  function Wr(e) {
    return e[nr] || null;
  }
  var ki = [],
    wn = -1;
  function Tt(e) {
    return { current: e };
  }
  function ne(e) {
    0 > wn || ((e.current = ki[wn]), (ki[wn] = null), wn--);
  }
  function b(e, t) {
    wn++, (ki[wn] = e.current), (e.current = t);
  }
  var Mt = {},
    Ee = Tt(Mt),
    ze = Tt(!1),
    Yt = Mt;
  function xn(e, t) {
    var n = e.type.contextTypes;
    if (!n) return Mt;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
      return r.__reactInternalMemoizedMaskedChildContext;
    var l = {},
      i;
    for (i in n) l[i] = t[i];
    return (
      r &&
        ((e = e.stateNode),
        (e.__reactInternalMemoizedUnmaskedChildContext = t),
        (e.__reactInternalMemoizedMaskedChildContext = l)),
      l
    );
  }
  function Fe(e) {
    return (e = e.childContextTypes), e != null;
  }
  function Kr() {
    ne(ze), ne(Ee);
  }
  function Yo(e, t, n) {
    if (Ee.current !== Mt) throw Error(d(168));
    b(Ee, t), b(ze, n);
  }
  function Jo(e, t, n) {
    var r = e.stateNode;
    if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
      return n;
    r = r.getChildContext();
    for (var l in r) if (!(l in t)) throw Error(d(108, $(e) || "Unknown", l));
    return R({}, n, r);
  }
  function Xr(e) {
    return (
      (e =
        ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) ||
        Mt),
      (Yt = Ee.current),
      b(Ee, e),
      b(ze, ze.current),
      !0
    );
  }
  function $o(e, t, n) {
    var r = e.stateNode;
    if (!r) throw Error(d(169));
    n
      ? ((e = Jo(e, t, Yt)),
        (r.__reactInternalMemoizedMergedChildContext = e),
        ne(ze),
        ne(Ee),
        b(Ee, e))
      : ne(ze),
      b(ze, n);
  }
  var xt = null,
    Gr = !1,
    Si = !1;
  function bo(e) {
    xt === null ? (xt = [e]) : xt.push(e);
  }
  function of(e) {
    (Gr = !0), bo(e);
  }
  function _t() {
    if (!Si && xt !== null) {
      Si = !0;
      var e = 0,
        t = X;
      try {
        var n = xt;
        for (X = 1; e < n.length; e++) {
          var r = n[e];
          do r = r(!0);
          while (r !== null);
        }
        (xt = null), (Gr = !1);
      } catch (l) {
        throw (xt !== null && (xt = xt.slice(e + 1)), eo(Wl, _t), l);
      } finally {
        (X = t), (Si = !1);
      }
    }
    return null;
  }
  var kn = [],
    Sn = 0,
    Zr = null,
    qr = 0,
    Ge = [],
    Ze = 0,
    Jt = null,
    kt = 1,
    St = "";
  function $t(e, t) {
    (kn[Sn++] = qr), (kn[Sn++] = Zr), (Zr = e), (qr = t);
  }
  function es(e, t, n) {
    (Ge[Ze++] = kt), (Ge[Ze++] = St), (Ge[Ze++] = Jt), (Jt = e);
    var r = kt;
    e = St;
    var l = 32 - nt(r) - 1;
    (r &= ~(1 << l)), (n += 1);
    var i = 32 - nt(t) + l;
    if (30 < i) {
      var u = l - (l % 5);
      (i = (r & ((1 << u) - 1)).toString(32)),
        (r >>= u),
        (l -= u),
        (kt = (1 << (32 - nt(t) + l)) | (n << l) | r),
        (St = i + e);
    } else (kt = (1 << i) | (n << l) | r), (St = e);
  }
  function Ei(e) {
    e.return !== null && ($t(e, 1), es(e, 1, 0));
  }
  function Ci(e) {
    for (; e === Zr; )
      (Zr = kn[--Sn]), (kn[Sn] = null), (qr = kn[--Sn]), (kn[Sn] = null);
    for (; e === Jt; )
      (Jt = Ge[--Ze]),
        (Ge[Ze] = null),
        (St = Ge[--Ze]),
        (Ge[Ze] = null),
        (kt = Ge[--Ze]),
        (Ge[Ze] = null);
  }
  var Ve = null,
    Be = null,
    ie = !1,
    lt = null;
  function ts(e, t) {
    var n = $e(5, null, null, 0);
    (n.elementType = "DELETED"),
      (n.stateNode = t),
      (n.return = e),
      (t = e.deletions),
      t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
  }
  function ns(e, t) {
    switch (e.tag) {
      case 5:
        var n = e.type;
        return (
          (t =
            t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
              ? null
              : t),
          t !== null
            ? ((e.stateNode = t), (Ve = e), (Be = Ot(t.firstChild)), !0)
            : !1
        );
      case 6:
        return (
          (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
          t !== null ? ((e.stateNode = t), (Ve = e), (Be = null), !0) : !1
        );
      case 13:
        return (
          (t = t.nodeType !== 8 ? null : t),
          t !== null
            ? ((n = Jt !== null ? { id: kt, overflow: St } : null),
              (e.memoizedState = {
                dehydrated: t,
                treeContext: n,
                retryLane: 1073741824,
              }),
              (n = $e(18, null, null, 0)),
              (n.stateNode = t),
              (n.return = e),
              (e.child = n),
              (Ve = e),
              (Be = null),
              !0)
            : !1
        );
      default:
        return !1;
    }
  }
  function Ni(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function Ai(e) {
    if (ie) {
      var t = Be;
      if (t) {
        var n = t;
        if (!ns(e, t)) {
          if (Ni(e)) throw Error(d(418));
          t = Ot(n.nextSibling);
          var r = Ve;
          t && ns(e, t)
            ? ts(r, n)
            : ((e.flags = (e.flags & -4097) | 2), (ie = !1), (Ve = e));
        }
      } else {
        if (Ni(e)) throw Error(d(418));
        (e.flags = (e.flags & -4097) | 2), (ie = !1), (Ve = e);
      }
    }
  }
  function rs(e) {
    for (
      e = e.return;
      e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;

    )
      e = e.return;
    Ve = e;
  }
  function Yr(e) {
    if (e !== Ve) return !1;
    if (!ie) return rs(e), (ie = !0), !1;
    var t;
    if (
      ((t = e.tag !== 3) &&
        !(t = e.tag !== 5) &&
        ((t = e.type),
        (t = t !== "head" && t !== "body" && !gi(e.type, e.memoizedProps))),
      t && (t = Be))
    ) {
      if (Ni(e)) throw (ls(), Error(d(418)));
      for (; t; ) ts(e, t), (t = Ot(t.nextSibling));
    }
    if ((rs(e), e.tag === 13)) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(d(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8) {
            var n = e.data;
            if (n === "/$") {
              if (t === 0) {
                Be = Ot(e.nextSibling);
                break e;
              }
              t--;
            } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
          }
          e = e.nextSibling;
        }
        Be = null;
      }
    } else Be = Ve ? Ot(e.stateNode.nextSibling) : null;
    return !0;
  }
  function ls() {
    for (var e = Be; e; ) e = Ot(e.nextSibling);
  }
  function En() {
    (Be = Ve = null), (ie = !1);
  }
  function Ri(e) {
    lt === null ? (lt = [e]) : lt.push(e);
  }
  var sf = Se.ReactCurrentBatchConfig;
  function lr(e, t, n) {
    if (
      ((e = n.ref),
      e !== null && typeof e != "function" && typeof e != "object")
    ) {
      if (n._owner) {
        if (((n = n._owner), n)) {
          if (n.tag !== 1) throw Error(d(309));
          var r = n.stateNode;
        }
        if (!r) throw Error(d(147, e));
        var l = r,
          i = "" + e;
        return t !== null &&
          t.ref !== null &&
          typeof t.ref == "function" &&
          t.ref._stringRef === i
          ? t.ref
          : ((t = function (u) {
              var o = l.refs;
              u === null ? delete o[i] : (o[i] = u);
            }),
            (t._stringRef = i),
            t);
      }
      if (typeof e != "string") throw Error(d(284));
      if (!n._owner) throw Error(d(290, e));
    }
    return e;
  }
  function Jr(e, t) {
    throw (
      ((e = Object.prototype.toString.call(t)),
      Error(
        d(
          31,
          e === "[object Object]"
            ? "object with keys {" + Object.keys(t).join(", ") + "}"
            : e,
        ),
      ))
    );
  }
  function is(e) {
    var t = e._init;
    return t(e._payload);
  }
  function us(e) {
    function t(f, a) {
      if (e) {
        var p = f.deletions;
        p === null ? ((f.deletions = [a]), (f.flags |= 16)) : p.push(a);
      }
    }
    function n(f, a) {
      if (!e) return null;
      for (; a !== null; ) t(f, a), (a = a.sibling);
      return null;
    }
    function r(f, a) {
      for (f = new Map(); a !== null; )
        a.key !== null ? f.set(a.key, a) : f.set(a.index, a), (a = a.sibling);
      return f;
    }
    function l(f, a) {
      return (f = Kt(f, a)), (f.index = 0), (f.sibling = null), f;
    }
    function i(f, a, p) {
      return (
        (f.index = p),
        e
          ? ((p = f.alternate),
            p !== null
              ? ((p = p.index), p < a ? ((f.flags |= 2), a) : p)
              : ((f.flags |= 2), a))
          : ((f.flags |= 1048576), a)
      );
    }
    function u(f) {
      return e && f.alternate === null && (f.flags |= 2), f;
    }
    function o(f, a, p, S) {
      return a === null || a.tag !== 6
        ? ((a = yu(p, f.mode, S)), (a.return = f), a)
        : ((a = l(a, p)), (a.return = f), a);
    }
    function s(f, a, p, S) {
      var L = p.type;
      return L === je
        ? w(f, a, p.props.children, S, p.key)
        : a !== null &&
            (a.elementType === L ||
              (typeof L == "object" &&
                L !== null &&
                L.$$typeof === Le &&
                is(L) === a.type))
          ? ((S = l(a, p.props)), (S.ref = lr(f, a, p)), (S.return = f), S)
          : ((S = kl(p.type, p.key, p.props, null, f.mode, S)),
            (S.ref = lr(f, a, p)),
            (S.return = f),
            S);
    }
    function m(f, a, p, S) {
      return a === null ||
        a.tag !== 4 ||
        a.stateNode.containerInfo !== p.containerInfo ||
        a.stateNode.implementation !== p.implementation
        ? ((a = wu(p, f.mode, S)), (a.return = f), a)
        : ((a = l(a, p.children || [])), (a.return = f), a);
    }
    function w(f, a, p, S, L) {
      return a === null || a.tag !== 7
        ? ((a = on(p, f.mode, S, L)), (a.return = f), a)
        : ((a = l(a, p)), (a.return = f), a);
    }
    function x(f, a, p) {
      if ((typeof a == "string" && a !== "") || typeof a == "number")
        return (a = yu("" + a, f.mode, p)), (a.return = f), a;
      if (typeof a == "object" && a !== null) {
        switch (a.$$typeof) {
          case et:
            return (
              (p = kl(a.type, a.key, a.props, null, f.mode, p)),
              (p.ref = lr(f, null, a)),
              (p.return = f),
              p
            );
          case Re:
            return (a = wu(a, f.mode, p)), (a.return = f), a;
          case Le:
            var S = a._init;
            return x(f, S(a._payload), p);
        }
        if (Fn(a) || T(a))
          return (a = on(a, f.mode, p, null)), (a.return = f), a;
        Jr(f, a);
      }
      return null;
    }
    function g(f, a, p, S) {
      var L = a !== null ? a.key : null;
      if ((typeof p == "string" && p !== "") || typeof p == "number")
        return L !== null ? null : o(f, a, "" + p, S);
      if (typeof p == "object" && p !== null) {
        switch (p.$$typeof) {
          case et:
            return p.key === L ? s(f, a, p, S) : null;
          case Re:
            return p.key === L ? m(f, a, p, S) : null;
          case Le:
            return (L = p._init), g(f, a, L(p._payload), S);
        }
        if (Fn(p) || T(p)) return L !== null ? null : w(f, a, p, S, null);
        Jr(f, p);
      }
      return null;
    }
    function C(f, a, p, S, L) {
      if ((typeof S == "string" && S !== "") || typeof S == "number")
        return (f = f.get(p) || null), o(a, f, "" + S, L);
      if (typeof S == "object" && S !== null) {
        switch (S.$$typeof) {
          case et:
            return (
              (f = f.get(S.key === null ? p : S.key) || null), s(a, f, S, L)
            );
          case Re:
            return (
              (f = f.get(S.key === null ? p : S.key) || null), m(a, f, S, L)
            );
          case Le:
            var z = S._init;
            return C(f, a, p, z(S._payload), L);
        }
        if (Fn(S) || T(S)) return (f = f.get(p) || null), w(a, f, S, L, null);
        Jr(a, S);
      }
      return null;
    }
    function I(f, a, p, S) {
      for (
        var L = null, z = null, F = a, M = (a = 0), ge = null;
        F !== null && M < p.length;
        M++
      ) {
        F.index > M ? ((ge = F), (F = null)) : (ge = F.sibling);
        var W = g(f, F, p[M], S);
        if (W === null) {
          F === null && (F = ge);
          break;
        }
        e && F && W.alternate === null && t(f, F),
          (a = i(W, a, M)),
          z === null ? (L = W) : (z.sibling = W),
          (z = W),
          (F = ge);
      }
      if (M === p.length) return n(f, F), ie && $t(f, M), L;
      if (F === null) {
        for (; M < p.length; M++)
          (F = x(f, p[M], S)),
            F !== null &&
              ((a = i(F, a, M)),
              z === null ? (L = F) : (z.sibling = F),
              (z = F));
        return ie && $t(f, M), L;
      }
      for (F = r(f, F); M < p.length; M++)
        (ge = C(F, f, M, p[M], S)),
          ge !== null &&
            (e &&
              ge.alternate !== null &&
              F.delete(ge.key === null ? M : ge.key),
            (a = i(ge, a, M)),
            z === null ? (L = ge) : (z.sibling = ge),
            (z = ge));
      return (
        e &&
          F.forEach(function (Xt) {
            return t(f, Xt);
          }),
        ie && $t(f, M),
        L
      );
    }
    function j(f, a, p, S) {
      var L = T(p);
      if (typeof L != "function") throw Error(d(150));
      if (((p = L.call(p)), p == null)) throw Error(d(151));
      for (
        var z = (L = null), F = a, M = (a = 0), ge = null, W = p.next();
        F !== null && !W.done;
        M++, W = p.next()
      ) {
        F.index > M ? ((ge = F), (F = null)) : (ge = F.sibling);
        var Xt = g(f, F, W.value, S);
        if (Xt === null) {
          F === null && (F = ge);
          break;
        }
        e && F && Xt.alternate === null && t(f, F),
          (a = i(Xt, a, M)),
          z === null ? (L = Xt) : (z.sibling = Xt),
          (z = Xt),
          (F = ge);
      }
      if (W.done) return n(f, F), ie && $t(f, M), L;
      if (F === null) {
        for (; !W.done; M++, W = p.next())
          (W = x(f, W.value, S)),
            W !== null &&
              ((a = i(W, a, M)),
              z === null ? (L = W) : (z.sibling = W),
              (z = W));
        return ie && $t(f, M), L;
      }
      for (F = r(f, F); !W.done; M++, W = p.next())
        (W = C(F, f, M, W.value, S)),
          W !== null &&
            (e && W.alternate !== null && F.delete(W.key === null ? M : W.key),
            (a = i(W, a, M)),
            z === null ? (L = W) : (z.sibling = W),
            (z = W));
      return (
        e &&
          F.forEach(function (Qf) {
            return t(f, Qf);
          }),
        ie && $t(f, M),
        L
      );
    }
    function fe(f, a, p, S) {
      if (
        (typeof p == "object" &&
          p !== null &&
          p.type === je &&
          p.key === null &&
          (p = p.props.children),
        typeof p == "object" && p !== null)
      ) {
        switch (p.$$typeof) {
          case et:
            e: {
              for (var L = p.key, z = a; z !== null; ) {
                if (z.key === L) {
                  if (((L = p.type), L === je)) {
                    if (z.tag === 7) {
                      n(f, z.sibling),
                        (a = l(z, p.props.children)),
                        (a.return = f),
                        (f = a);
                      break e;
                    }
                  } else if (
                    z.elementType === L ||
                    (typeof L == "object" &&
                      L !== null &&
                      L.$$typeof === Le &&
                      is(L) === z.type)
                  ) {
                    n(f, z.sibling),
                      (a = l(z, p.props)),
                      (a.ref = lr(f, z, p)),
                      (a.return = f),
                      (f = a);
                    break e;
                  }
                  n(f, z);
                  break;
                } else t(f, z);
                z = z.sibling;
              }
              p.type === je
                ? ((a = on(p.props.children, f.mode, S, p.key)),
                  (a.return = f),
                  (f = a))
                : ((S = kl(p.type, p.key, p.props, null, f.mode, S)),
                  (S.ref = lr(f, a, p)),
                  (S.return = f),
                  (f = S));
            }
            return u(f);
          case Re:
            e: {
              for (z = p.key; a !== null; ) {
                if (a.key === z)
                  if (
                    a.tag === 4 &&
                    a.stateNode.containerInfo === p.containerInfo &&
                    a.stateNode.implementation === p.implementation
                  ) {
                    n(f, a.sibling),
                      (a = l(a, p.children || [])),
                      (a.return = f),
                      (f = a);
                    break e;
                  } else {
                    n(f, a);
                    break;
                  }
                else t(f, a);
                a = a.sibling;
              }
              (a = wu(p, f.mode, S)), (a.return = f), (f = a);
            }
            return u(f);
          case Le:
            return (z = p._init), fe(f, a, z(p._payload), S);
        }
        if (Fn(p)) return I(f, a, p, S);
        if (T(p)) return j(f, a, p, S);
        Jr(f, p);
      }
      return (typeof p == "string" && p !== "") || typeof p == "number"
        ? ((p = "" + p),
          a !== null && a.tag === 6
            ? (n(f, a.sibling), (a = l(a, p)), (a.return = f), (f = a))
            : (n(f, a), (a = yu(p, f.mode, S)), (a.return = f), (f = a)),
          u(f))
        : n(f, a);
    }
    return fe;
  }
  var Cn = us(!0),
    os = us(!1),
    $r = Tt(null),
    br = null,
    Nn = null,
    Pi = null;
  function Ii() {
    Pi = Nn = br = null;
  }
  function ji(e) {
    var t = $r.current;
    ne($r), (e._currentValue = t);
  }
  function Li(e, t, n) {
    for (; e !== null; ) {
      var r = e.alternate;
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
          : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
        e === n)
      )
        break;
      e = e.return;
    }
  }
  function An(e, t) {
    (br = e),
      (Pi = Nn = null),
      (e = e.dependencies),
      e !== null &&
        e.firstContext !== null &&
        (e.lanes & t && (Oe = !0), (e.firstContext = null));
  }
  function qe(e) {
    var t = e._currentValue;
    if (Pi !== e)
      if (((e = { context: e, memoizedValue: t, next: null }), Nn === null)) {
        if (br === null) throw Error(d(308));
        (Nn = e), (br.dependencies = { lanes: 0, firstContext: e });
      } else Nn = Nn.next = e;
    return t;
  }
  var bt = null;
  function zi(e) {
    bt === null ? (bt = [e]) : bt.push(e);
  }
  function ss(e, t, n, r) {
    var l = t.interleaved;
    return (
      l === null ? ((n.next = n), zi(t)) : ((n.next = l.next), (l.next = n)),
      (t.interleaved = n),
      Et(e, r)
    );
  }
  function Et(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
      (e.childLanes |= t),
        (n = e.alternate),
        n !== null && (n.childLanes |= t),
        (n = e),
        (e = e.return);
    return n.tag === 3 ? n.stateNode : null;
  }
  var Ut = !1;
  function Fi(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, interleaved: null, lanes: 0 },
      effects: null,
    };
  }
  function as(e, t) {
    (e = e.updateQueue),
      t.updateQueue === e &&
        (t.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          effects: e.effects,
        });
  }
  function Ct(e, t) {
    return {
      eventTime: e,
      lane: t,
      tag: 0,
      payload: null,
      callback: null,
      next: null,
    };
  }
  function Dt(e, t, n) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (((r = r.shared), V & 2)) {
      var l = r.pending;
      return (
        l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)),
        (r.pending = t),
        Et(e, n)
      );
    }
    return (
      (l = r.interleaved),
      l === null ? ((t.next = t), zi(r)) : ((t.next = l.next), (l.next = t)),
      (r.interleaved = t),
      Et(e, n)
    );
  }
  function el(e, t, n) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
    ) {
      var r = t.lanes;
      (r &= e.pendingLanes), (n |= r), (t.lanes = n), Gl(e, n);
    }
  }
  function cs(e, t) {
    var n = e.updateQueue,
      r = e.alternate;
    if (r !== null && ((r = r.updateQueue), n === r)) {
      var l = null,
        i = null;
      if (((n = n.firstBaseUpdate), n !== null)) {
        do {
          var u = {
            eventTime: n.eventTime,
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: n.callback,
            next: null,
          };
          i === null ? (l = i = u) : (i = i.next = u), (n = n.next);
        } while (n !== null);
        i === null ? (l = i = t) : (i = i.next = t);
      } else l = i = t;
      (n = {
        baseState: r.baseState,
        firstBaseUpdate: l,
        lastBaseUpdate: i,
        shared: r.shared,
        effects: r.effects,
      }),
        (e.updateQueue = n);
      return;
    }
    (e = n.lastBaseUpdate),
      e === null ? (n.firstBaseUpdate = t) : (e.next = t),
      (n.lastBaseUpdate = t);
  }
  function tl(e, t, n, r) {
    var l = e.updateQueue;
    Ut = !1;
    var i = l.firstBaseUpdate,
      u = l.lastBaseUpdate,
      o = l.shared.pending;
    if (o !== null) {
      l.shared.pending = null;
      var s = o,
        m = s.next;
      (s.next = null), u === null ? (i = m) : (u.next = m), (u = s);
      var w = e.alternate;
      w !== null &&
        ((w = w.updateQueue),
        (o = w.lastBaseUpdate),
        o !== u &&
          (o === null ? (w.firstBaseUpdate = m) : (o.next = m),
          (w.lastBaseUpdate = s)));
    }
    if (i !== null) {
      var x = l.baseState;
      (u = 0), (w = m = s = null), (o = i);
      do {
        var g = o.lane,
          C = o.eventTime;
        if ((r & g) === g) {
          w !== null &&
            (w = w.next =
              {
                eventTime: C,
                lane: 0,
                tag: o.tag,
                payload: o.payload,
                callback: o.callback,
                next: null,
              });
          e: {
            var I = e,
              j = o;
            switch (((g = t), (C = n), j.tag)) {
              case 1:
                if (((I = j.payload), typeof I == "function")) {
                  x = I.call(C, x, g);
                  break e;
                }
                x = I;
                break e;
              case 3:
                I.flags = (I.flags & -65537) | 128;
              case 0:
                if (
                  ((I = j.payload),
                  (g = typeof I == "function" ? I.call(C, x, g) : I),
                  g == null)
                )
                  break e;
                x = R({}, x, g);
                break e;
              case 2:
                Ut = !0;
            }
          }
          o.callback !== null &&
            o.lane !== 0 &&
            ((e.flags |= 64),
            (g = l.effects),
            g === null ? (l.effects = [o]) : g.push(o));
        } else
          (C = {
            eventTime: C,
            lane: g,
            tag: o.tag,
            payload: o.payload,
            callback: o.callback,
            next: null,
          }),
            w === null ? ((m = w = C), (s = x)) : (w = w.next = C),
            (u |= g);
        if (((o = o.next), o === null)) {
          if (((o = l.shared.pending), o === null)) break;
          (g = o),
            (o = g.next),
            (g.next = null),
            (l.lastBaseUpdate = g),
            (l.shared.pending = null);
        }
      } while (!0);
      if (
        (w === null && (s = x),
        (l.baseState = s),
        (l.firstBaseUpdate = m),
        (l.lastBaseUpdate = w),
        (t = l.shared.interleaved),
        t !== null)
      ) {
        l = t;
        do (u |= l.lane), (l = l.next);
        while (l !== t);
      } else i === null && (l.shared.lanes = 0);
      (nn |= u), (e.lanes = u), (e.memoizedState = x);
    }
  }
  function fs(e, t, n) {
    if (((e = t.effects), (t.effects = null), e !== null))
      for (t = 0; t < e.length; t++) {
        var r = e[t],
          l = r.callback;
        if (l !== null) {
          if (((r.callback = null), (r = n), typeof l != "function"))
            throw Error(d(191, l));
          l.call(r);
        }
      }
  }
  var ir = {},
    mt = Tt(ir),
    ur = Tt(ir),
    or = Tt(ir);
  function en(e) {
    if (e === ir) throw Error(d(174));
    return e;
  }
  function Oi(e, t) {
    switch ((b(or, t), b(ur, e), b(mt, ir), (e = t.nodeType), e)) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : Tl(null, "");
        break;
      default:
        (e = e === 8 ? t.parentNode : t),
          (t = e.namespaceURI || null),
          (e = e.tagName),
          (t = Tl(t, e));
    }
    ne(mt), b(mt, t);
  }
  function Rn() {
    ne(mt), ne(ur), ne(or);
  }
  function ds(e) {
    en(or.current);
    var t = en(mt.current),
      n = Tl(t, e.type);
    t !== n && (b(ur, e), b(mt, n));
  }
  function Ti(e) {
    ur.current === e && (ne(mt), ne(ur));
  }
  var ue = Tt(0);
  function nl(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (
          n !== null &&
          ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
        )
          return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if (t.flags & 128) return t;
      } else if (t.child !== null) {
        (t.child.return = t), (t = t.child);
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
    return null;
  }
  var Mi = [];
  function _i() {
    for (var e = 0; e < Mi.length; e++)
      Mi[e]._workInProgressVersionPrimary = null;
    Mi.length = 0;
  }
  var rl = Se.ReactCurrentDispatcher,
    Ui = Se.ReactCurrentBatchConfig,
    tn = 0,
    oe = null,
    pe = null,
    he = null,
    ll = !1,
    sr = !1,
    ar = 0,
    af = 0;
  function Ce() {
    throw Error(d(321));
  }
  function Di(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!rt(e[n], t[n])) return !1;
    return !0;
  }
  function Qi(e, t, n, r, l, i) {
    if (
      ((tn = i),
      (oe = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (rl.current = e === null || e.memoizedState === null ? pf : mf),
      (e = n(r, l)),
      sr)
    ) {
      i = 0;
      do {
        if (((sr = !1), (ar = 0), 25 <= i)) throw Error(d(301));
        (i += 1),
          (he = pe = null),
          (t.updateQueue = null),
          (rl.current = hf),
          (e = n(r, l));
      } while (sr);
    }
    if (
      ((rl.current = ol),
      (t = pe !== null && pe.next !== null),
      (tn = 0),
      (he = pe = oe = null),
      (ll = !1),
      t)
    )
      throw Error(d(300));
    return e;
  }
  function Vi() {
    var e = ar !== 0;
    return (ar = 0), e;
  }
  function ht() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return he === null ? (oe.memoizedState = he = e) : (he = he.next = e), he;
  }
  function Ye() {
    if (pe === null) {
      var e = oe.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = pe.next;
    var t = he === null ? oe.memoizedState : he.next;
    if (t !== null) (he = t), (pe = e);
    else {
      if (e === null) throw Error(d(310));
      (pe = e),
        (e = {
          memoizedState: pe.memoizedState,
          baseState: pe.baseState,
          baseQueue: pe.baseQueue,
          queue: pe.queue,
          next: null,
        }),
        he === null ? (oe.memoizedState = he = e) : (he = he.next = e);
    }
    return he;
  }
  function cr(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Bi(e) {
    var t = Ye(),
      n = t.queue;
    if (n === null) throw Error(d(311));
    n.lastRenderedReducer = e;
    var r = pe,
      l = r.baseQueue,
      i = n.pending;
    if (i !== null) {
      if (l !== null) {
        var u = l.next;
        (l.next = i.next), (i.next = u);
      }
      (r.baseQueue = l = i), (n.pending = null);
    }
    if (l !== null) {
      (i = l.next), (r = r.baseState);
      var o = (u = null),
        s = null,
        m = i;
      do {
        var w = m.lane;
        if ((tn & w) === w)
          s !== null &&
            (s = s.next =
              {
                lane: 0,
                action: m.action,
                hasEagerState: m.hasEagerState,
                eagerState: m.eagerState,
                next: null,
              }),
            (r = m.hasEagerState ? m.eagerState : e(r, m.action));
        else {
          var x = {
            lane: w,
            action: m.action,
            hasEagerState: m.hasEagerState,
            eagerState: m.eagerState,
            next: null,
          };
          s === null ? ((o = s = x), (u = r)) : (s = s.next = x),
            (oe.lanes |= w),
            (nn |= w);
        }
        m = m.next;
      } while (m !== null && m !== i);
      s === null ? (u = r) : (s.next = o),
        rt(r, t.memoizedState) || (Oe = !0),
        (t.memoizedState = r),
        (t.baseState = u),
        (t.baseQueue = s),
        (n.lastRenderedState = r);
    }
    if (((e = n.interleaved), e !== null)) {
      l = e;
      do (i = l.lane), (oe.lanes |= i), (nn |= i), (l = l.next);
      while (l !== e);
    } else l === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch];
  }
  function Hi(e) {
    var t = Ye(),
      n = t.queue;
    if (n === null) throw Error(d(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch,
      l = n.pending,
      i = t.memoizedState;
    if (l !== null) {
      n.pending = null;
      var u = (l = l.next);
      do (i = e(i, u.action)), (u = u.next);
      while (u !== l);
      rt(i, t.memoizedState) || (Oe = !0),
        (t.memoizedState = i),
        t.baseQueue === null && (t.baseState = i),
        (n.lastRenderedState = i);
    }
    return [i, r];
  }
  function ps() {}
  function ms(e, t) {
    var n = oe,
      r = Ye(),
      l = t(),
      i = !rt(r.memoizedState, l);
    if (
      (i && ((r.memoizedState = l), (Oe = !0)),
      (r = r.queue),
      Wi(gs.bind(null, n, r, e), [e]),
      r.getSnapshot !== t || i || (he !== null && he.memoizedState.tag & 1))
    ) {
      if (
        ((n.flags |= 2048),
        fr(9, vs.bind(null, n, r, l, t), void 0, null),
        ve === null)
      )
        throw Error(d(349));
      tn & 30 || hs(n, t, l);
    }
    return l;
  }
  function hs(e, t, n) {
    (e.flags |= 16384),
      (e = { getSnapshot: t, value: n }),
      (t = oe.updateQueue),
      t === null
        ? ((t = { lastEffect: null, stores: null }),
          (oe.updateQueue = t),
          (t.stores = [e]))
        : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
  }
  function vs(e, t, n, r) {
    (t.value = n), (t.getSnapshot = r), ys(t) && ws(e);
  }
  function gs(e, t, n) {
    return n(function () {
      ys(t) && ws(e);
    });
  }
  function ys(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !rt(e, n);
    } catch {
      return !0;
    }
  }
  function ws(e) {
    var t = Et(e, 1);
    t !== null && st(t, e, 1, -1);
  }
  function xs(e) {
    var t = ht();
    return (
      typeof e == "function" && (e = e()),
      (t.memoizedState = t.baseState = e),
      (e = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: cr,
        lastRenderedState: e,
      }),
      (t.queue = e),
      (e = e.dispatch = df.bind(null, oe, e)),
      [t.memoizedState, e]
    );
  }
  function fr(e, t, n, r) {
    return (
      (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
      (t = oe.updateQueue),
      t === null
        ? ((t = { lastEffect: null, stores: null }),
          (oe.updateQueue = t),
          (t.lastEffect = e.next = e))
        : ((n = t.lastEffect),
          n === null
            ? (t.lastEffect = e.next = e)
            : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
      e
    );
  }
  function ks() {
    return Ye().memoizedState;
  }
  function il(e, t, n, r) {
    var l = ht();
    (oe.flags |= e),
      (l.memoizedState = fr(1 | t, n, void 0, r === void 0 ? null : r));
  }
  function ul(e, t, n, r) {
    var l = Ye();
    r = r === void 0 ? null : r;
    var i = void 0;
    if (pe !== null) {
      var u = pe.memoizedState;
      if (((i = u.destroy), r !== null && Di(r, u.deps))) {
        l.memoizedState = fr(t, n, i, r);
        return;
      }
    }
    (oe.flags |= e), (l.memoizedState = fr(1 | t, n, i, r));
  }
  function Ss(e, t) {
    return il(8390656, 8, e, t);
  }
  function Wi(e, t) {
    return ul(2048, 8, e, t);
  }
  function Es(e, t) {
    return ul(4, 2, e, t);
  }
  function Cs(e, t) {
    return ul(4, 4, e, t);
  }
  function Ns(e, t) {
    if (typeof t == "function")
      return (
        (e = e()),
        t(e),
        function () {
          t(null);
        }
      );
    if (t != null)
      return (
        (e = e()),
        (t.current = e),
        function () {
          t.current = null;
        }
      );
  }
  function As(e, t, n) {
    return (
      (n = n != null ? n.concat([e]) : null), ul(4, 4, Ns.bind(null, t, e), n)
    );
  }
  function Ki() {}
  function Rs(e, t) {
    var n = Ye();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && Di(t, r[1])
      ? r[0]
      : ((n.memoizedState = [e, t]), e);
  }
  function Ps(e, t) {
    var n = Ye();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && Di(t, r[1])
      ? r[0]
      : ((e = e()), (n.memoizedState = [e, t]), e);
  }
  function Is(e, t, n) {
    return tn & 21
      ? (rt(n, t) ||
          ((n = lo()), (oe.lanes |= n), (nn |= n), (e.baseState = !0)),
        t)
      : (e.baseState && ((e.baseState = !1), (Oe = !0)), (e.memoizedState = n));
  }
  function cf(e, t) {
    var n = X;
    (X = n !== 0 && 4 > n ? n : 4), e(!0);
    var r = Ui.transition;
    Ui.transition = {};
    try {
      e(!1), t();
    } finally {
      (X = n), (Ui.transition = r);
    }
  }
  function js() {
    return Ye().memoizedState;
  }
  function ff(e, t, n) {
    var r = Ht(e);
    if (
      ((n = {
        lane: r,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      Ls(e))
    )
      zs(t, n);
    else if (((n = ss(e, t, n, r)), n !== null)) {
      var l = Ie();
      st(n, e, r, l), Fs(n, t, r);
    }
  }
  function df(e, t, n) {
    var r = Ht(e),
      l = {
        lane: r,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      };
    if (Ls(e)) zs(t, l);
    else {
      var i = e.alternate;
      if (
        e.lanes === 0 &&
        (i === null || i.lanes === 0) &&
        ((i = t.lastRenderedReducer), i !== null)
      )
        try {
          var u = t.lastRenderedState,
            o = i(u, n);
          if (((l.hasEagerState = !0), (l.eagerState = o), rt(o, u))) {
            var s = t.interleaved;
            s === null
              ? ((l.next = l), zi(t))
              : ((l.next = s.next), (s.next = l)),
              (t.interleaved = l);
            return;
          }
        } catch {
        } finally {
        }
      (n = ss(e, t, l, r)),
        n !== null && ((l = Ie()), st(n, e, r, l), Fs(n, t, r));
    }
  }
  function Ls(e) {
    var t = e.alternate;
    return e === oe || (t !== null && t === oe);
  }
  function zs(e, t) {
    sr = ll = !0;
    var n = e.pending;
    n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
      (e.pending = t);
  }
  function Fs(e, t, n) {
    if (n & 4194240) {
      var r = t.lanes;
      (r &= e.pendingLanes), (n |= r), (t.lanes = n), Gl(e, n);
    }
  }
  var ol = {
      readContext: qe,
      useCallback: Ce,
      useContext: Ce,
      useEffect: Ce,
      useImperativeHandle: Ce,
      useInsertionEffect: Ce,
      useLayoutEffect: Ce,
      useMemo: Ce,
      useReducer: Ce,
      useRef: Ce,
      useState: Ce,
      useDebugValue: Ce,
      useDeferredValue: Ce,
      useTransition: Ce,
      useMutableSource: Ce,
      useSyncExternalStore: Ce,
      useId: Ce,
      unstable_isNewReconciler: !1,
    },
    pf = {
      readContext: qe,
      useCallback: function (e, t) {
        return (ht().memoizedState = [e, t === void 0 ? null : t]), e;
      },
      useContext: qe,
      useEffect: Ss,
      useImperativeHandle: function (e, t, n) {
        return (
          (n = n != null ? n.concat([e]) : null),
          il(4194308, 4, Ns.bind(null, t, e), n)
        );
      },
      useLayoutEffect: function (e, t) {
        return il(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        return il(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var n = ht();
        return (
          (t = t === void 0 ? null : t),
          (e = e()),
          (n.memoizedState = [e, t]),
          e
        );
      },
      useReducer: function (e, t, n) {
        var r = ht();
        return (
          (t = n !== void 0 ? n(t) : t),
          (r.memoizedState = r.baseState = t),
          (e = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: t,
          }),
          (r.queue = e),
          (e = e.dispatch = ff.bind(null, oe, e)),
          [r.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = ht();
        return (e = { current: e }), (t.memoizedState = e);
      },
      useState: xs,
      useDebugValue: Ki,
      useDeferredValue: function (e) {
        return (ht().memoizedState = e);
      },
      useTransition: function () {
        var e = xs(!1),
          t = e[0];
        return (e = cf.bind(null, e[1])), (ht().memoizedState = e), [t, e];
      },
      useMutableSource: function () {},
      useSyncExternalStore: function (e, t, n) {
        var r = oe,
          l = ht();
        if (ie) {
          if (n === void 0) throw Error(d(407));
          n = n();
        } else {
          if (((n = t()), ve === null)) throw Error(d(349));
          tn & 30 || hs(r, t, n);
        }
        l.memoizedState = n;
        var i = { value: n, getSnapshot: t };
        return (
          (l.queue = i),
          Ss(gs.bind(null, r, i, e), [e]),
          (r.flags |= 2048),
          fr(9, vs.bind(null, r, i, n, t), void 0, null),
          n
        );
      },
      useId: function () {
        var e = ht(),
          t = ve.identifierPrefix;
        if (ie) {
          var n = St,
            r = kt;
          (n = (r & ~(1 << (32 - nt(r) - 1))).toString(32) + n),
            (t = ":" + t + "R" + n),
            (n = ar++),
            0 < n && (t += "H" + n.toString(32)),
            (t += ":");
        } else (n = af++), (t = ":" + t + "r" + n.toString(32) + ":");
        return (e.memoizedState = t);
      },
      unstable_isNewReconciler: !1,
    },
    mf = {
      readContext: qe,
      useCallback: Rs,
      useContext: qe,
      useEffect: Wi,
      useImperativeHandle: As,
      useInsertionEffect: Es,
      useLayoutEffect: Cs,
      useMemo: Ps,
      useReducer: Bi,
      useRef: ks,
      useState: function () {
        return Bi(cr);
      },
      useDebugValue: Ki,
      useDeferredValue: function (e) {
        var t = Ye();
        return Is(t, pe.memoizedState, e);
      },
      useTransition: function () {
        var e = Bi(cr)[0],
          t = Ye().memoizedState;
        return [e, t];
      },
      useMutableSource: ps,
      useSyncExternalStore: ms,
      useId: js,
      unstable_isNewReconciler: !1,
    },
    hf = {
      readContext: qe,
      useCallback: Rs,
      useContext: qe,
      useEffect: Wi,
      useImperativeHandle: As,
      useInsertionEffect: Es,
      useLayoutEffect: Cs,
      useMemo: Ps,
      useReducer: Hi,
      useRef: ks,
      useState: function () {
        return Hi(cr);
      },
      useDebugValue: Ki,
      useDeferredValue: function (e) {
        var t = Ye();
        return pe === null ? (t.memoizedState = e) : Is(t, pe.memoizedState, e);
      },
      useTransition: function () {
        var e = Hi(cr)[0],
          t = Ye().memoizedState;
        return [e, t];
      },
      useMutableSource: ps,
      useSyncExternalStore: ms,
      useId: js,
      unstable_isNewReconciler: !1,
    };
  function it(e, t) {
    if (e && e.defaultProps) {
      (t = R({}, t)), (e = e.defaultProps);
      for (var n in e) t[n] === void 0 && (t[n] = e[n]);
      return t;
    }
    return t;
  }
  function Xi(e, t, n, r) {
    (t = e.memoizedState),
      (n = n(r, t)),
      (n = n == null ? t : R({}, t, n)),
      (e.memoizedState = n),
      e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var sl = {
    isMounted: function (e) {
      return (e = e._reactInternals) ? Zt(e) === e : !1;
    },
    enqueueSetState: function (e, t, n) {
      e = e._reactInternals;
      var r = Ie(),
        l = Ht(e),
        i = Ct(r, l);
      (i.payload = t),
        n != null && (i.callback = n),
        (t = Dt(e, i, l)),
        t !== null && (st(t, e, l, r), el(t, e, l));
    },
    enqueueReplaceState: function (e, t, n) {
      e = e._reactInternals;
      var r = Ie(),
        l = Ht(e),
        i = Ct(r, l);
      (i.tag = 1),
        (i.payload = t),
        n != null && (i.callback = n),
        (t = Dt(e, i, l)),
        t !== null && (st(t, e, l, r), el(t, e, l));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var n = Ie(),
        r = Ht(e),
        l = Ct(n, r);
      (l.tag = 2),
        t != null && (l.callback = t),
        (t = Dt(e, l, r)),
        t !== null && (st(t, e, r, n), el(t, e, r));
    },
  };
  function Os(e, t, n, r, l, i, u) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == "function"
        ? e.shouldComponentUpdate(r, i, u)
        : t.prototype && t.prototype.isPureReactComponent
          ? !Jn(n, r) || !Jn(l, i)
          : !0
    );
  }
  function Ts(e, t, n) {
    var r = !1,
      l = Mt,
      i = t.contextType;
    return (
      typeof i == "object" && i !== null
        ? (i = qe(i))
        : ((l = Fe(t) ? Yt : Ee.current),
          (r = t.contextTypes),
          (i = (r = r != null) ? xn(e, l) : Mt)),
      (t = new t(n, i)),
      (e.memoizedState =
        t.state !== null && t.state !== void 0 ? t.state : null),
      (t.updater = sl),
      (e.stateNode = t),
      (t._reactInternals = e),
      r &&
        ((e = e.stateNode),
        (e.__reactInternalMemoizedUnmaskedChildContext = l),
        (e.__reactInternalMemoizedMaskedChildContext = i)),
      t
    );
  }
  function Ms(e, t, n, r) {
    (e = t.state),
      typeof t.componentWillReceiveProps == "function" &&
        t.componentWillReceiveProps(n, r),
      typeof t.UNSAFE_componentWillReceiveProps == "function" &&
        t.UNSAFE_componentWillReceiveProps(n, r),
      t.state !== e && sl.enqueueReplaceState(t, t.state, null);
  }
  function Gi(e, t, n, r) {
    var l = e.stateNode;
    (l.props = n), (l.state = e.memoizedState), (l.refs = {}), Fi(e);
    var i = t.contextType;
    typeof i == "object" && i !== null
      ? (l.context = qe(i))
      : ((i = Fe(t) ? Yt : Ee.current), (l.context = xn(e, i))),
      (l.state = e.memoizedState),
      (i = t.getDerivedStateFromProps),
      typeof i == "function" && (Xi(e, t, i, n), (l.state = e.memoizedState)),
      typeof t.getDerivedStateFromProps == "function" ||
        typeof l.getSnapshotBeforeUpdate == "function" ||
        (typeof l.UNSAFE_componentWillMount != "function" &&
          typeof l.componentWillMount != "function") ||
        ((t = l.state),
        typeof l.componentWillMount == "function" && l.componentWillMount(),
        typeof l.UNSAFE_componentWillMount == "function" &&
          l.UNSAFE_componentWillMount(),
        t !== l.state && sl.enqueueReplaceState(l, l.state, null),
        tl(e, n, l, r),
        (l.state = e.memoizedState)),
      typeof l.componentDidMount == "function" && (e.flags |= 4194308);
  }
  function Pn(e, t) {
    try {
      var n = "",
        r = t;
      do (n += B(r)), (r = r.return);
      while (r);
      var l = n;
    } catch (i) {
      l =
        `
Error generating stack: ` +
        i.message +
        `
` +
        i.stack;
    }
    return { value: e, source: t, stack: l, digest: null };
  }
  function Zi(e, t, n) {
    return { value: e, source: null, stack: n ?? null, digest: t ?? null };
  }
  function qi(e, t) {
    try {
      console.error(t.value);
    } catch (n) {
      setTimeout(function () {
        throw n;
      });
    }
  }
  var vf = typeof WeakMap == "function" ? WeakMap : Map;
  function _s(e, t, n) {
    (n = Ct(-1, n)), (n.tag = 3), (n.payload = { element: null });
    var r = t.value;
    return (
      (n.callback = function () {
        hl || ((hl = !0), (cu = r)), qi(e, t);
      }),
      n
    );
  }
  function Us(e, t, n) {
    (n = Ct(-1, n)), (n.tag = 3);
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var l = t.value;
      (n.payload = function () {
        return r(l);
      }),
        (n.callback = function () {
          qi(e, t);
        });
    }
    var i = e.stateNode;
    return (
      i !== null &&
        typeof i.componentDidCatch == "function" &&
        (n.callback = function () {
          qi(e, t),
            typeof r != "function" &&
              (Vt === null ? (Vt = new Set([this])) : Vt.add(this));
          var u = t.stack;
          this.componentDidCatch(t.value, {
            componentStack: u !== null ? u : "",
          });
        }),
      n
    );
  }
  function Ds(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new vf();
      var l = new Set();
      r.set(t, l);
    } else (l = r.get(t)), l === void 0 && ((l = new Set()), r.set(t, l));
    l.has(n) || (l.add(n), (e = jf.bind(null, e, t, n)), t.then(e, e));
  }
  function Qs(e) {
    do {
      var t;
      if (
        ((t = e.tag === 13) &&
          ((t = e.memoizedState),
          (t = t !== null ? t.dehydrated !== null : !0)),
        t)
      )
        return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function Vs(e, t, n, r, l) {
    return e.mode & 1
      ? ((e.flags |= 65536), (e.lanes = l), e)
      : (e === t
          ? (e.flags |= 65536)
          : ((e.flags |= 128),
            (n.flags |= 131072),
            (n.flags &= -52805),
            n.tag === 1 &&
              (n.alternate === null
                ? (n.tag = 17)
                : ((t = Ct(-1, 1)), (t.tag = 2), Dt(n, t, 1))),
            (n.lanes |= 1)),
        e);
  }
  var gf = Se.ReactCurrentOwner,
    Oe = !1;
  function Pe(e, t, n, r) {
    t.child = e === null ? os(t, null, n, r) : Cn(t, e.child, n, r);
  }
  function Bs(e, t, n, r, l) {
    n = n.render;
    var i = t.ref;
    return (
      An(t, l),
      (r = Qi(e, t, n, r, i, l)),
      (n = Vi()),
      e !== null && !Oe
        ? ((t.updateQueue = e.updateQueue),
          (t.flags &= -2053),
          (e.lanes &= ~l),
          Nt(e, t, l))
        : (ie && n && Ei(t), (t.flags |= 1), Pe(e, t, r, l), t.child)
    );
  }
  function Hs(e, t, n, r, l) {
    if (e === null) {
      var i = n.type;
      return typeof i == "function" &&
        !gu(i) &&
        i.defaultProps === void 0 &&
        n.compare === null &&
        n.defaultProps === void 0
        ? ((t.tag = 15), (t.type = i), Ws(e, t, i, r, l))
        : ((e = kl(n.type, null, r, t, t.mode, l)),
          (e.ref = t.ref),
          (e.return = t),
          (t.child = e));
    }
    if (((i = e.child), !(e.lanes & l))) {
      var u = i.memoizedProps;
      if (
        ((n = n.compare), (n = n !== null ? n : Jn), n(u, r) && e.ref === t.ref)
      )
        return Nt(e, t, l);
    }
    return (
      (t.flags |= 1),
      (e = Kt(i, r)),
      (e.ref = t.ref),
      (e.return = t),
      (t.child = e)
    );
  }
  function Ws(e, t, n, r, l) {
    if (e !== null) {
      var i = e.memoizedProps;
      if (Jn(i, r) && e.ref === t.ref)
        if (((Oe = !1), (t.pendingProps = r = i), (e.lanes & l) !== 0))
          e.flags & 131072 && (Oe = !0);
        else return (t.lanes = e.lanes), Nt(e, t, l);
    }
    return Yi(e, t, n, r, l);
  }
  function Ks(e, t, n) {
    var r = t.pendingProps,
      l = r.children,
      i = e !== null ? e.memoizedState : null;
    if (r.mode === "hidden")
      if (!(t.mode & 1))
        (t.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null,
        }),
          b(jn, He),
          (He |= n);
      else {
        if (!(n & 1073741824))
          return (
            (e = i !== null ? i.baseLanes | n : n),
            (t.lanes = t.childLanes = 1073741824),
            (t.memoizedState = {
              baseLanes: e,
              cachePool: null,
              transitions: null,
            }),
            (t.updateQueue = null),
            b(jn, He),
            (He |= e),
            null
          );
        (t.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null,
        }),
          (r = i !== null ? i.baseLanes : n),
          b(jn, He),
          (He |= r);
      }
    else
      i !== null ? ((r = i.baseLanes | n), (t.memoizedState = null)) : (r = n),
        b(jn, He),
        (He |= r);
    return Pe(e, t, l, n), t.child;
  }
  function Xs(e, t) {
    var n = t.ref;
    ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
      ((t.flags |= 512), (t.flags |= 2097152));
  }
  function Yi(e, t, n, r, l) {
    var i = Fe(n) ? Yt : Ee.current;
    return (
      (i = xn(t, i)),
      An(t, l),
      (n = Qi(e, t, n, r, i, l)),
      (r = Vi()),
      e !== null && !Oe
        ? ((t.updateQueue = e.updateQueue),
          (t.flags &= -2053),
          (e.lanes &= ~l),
          Nt(e, t, l))
        : (ie && r && Ei(t), (t.flags |= 1), Pe(e, t, n, l), t.child)
    );
  }
  function Gs(e, t, n, r, l) {
    if (Fe(n)) {
      var i = !0;
      Xr(t);
    } else i = !1;
    if ((An(t, l), t.stateNode === null))
      cl(e, t), Ts(t, n, r), Gi(t, n, r, l), (r = !0);
    else if (e === null) {
      var u = t.stateNode,
        o = t.memoizedProps;
      u.props = o;
      var s = u.context,
        m = n.contextType;
      typeof m == "object" && m !== null
        ? (m = qe(m))
        : ((m = Fe(n) ? Yt : Ee.current), (m = xn(t, m)));
      var w = n.getDerivedStateFromProps,
        x =
          typeof w == "function" ||
          typeof u.getSnapshotBeforeUpdate == "function";
      x ||
        (typeof u.UNSAFE_componentWillReceiveProps != "function" &&
          typeof u.componentWillReceiveProps != "function") ||
        ((o !== r || s !== m) && Ms(t, u, r, m)),
        (Ut = !1);
      var g = t.memoizedState;
      (u.state = g),
        tl(t, r, u, l),
        (s = t.memoizedState),
        o !== r || g !== s || ze.current || Ut
          ? (typeof w == "function" && (Xi(t, n, w, r), (s = t.memoizedState)),
            (o = Ut || Os(t, n, o, r, g, s, m))
              ? (x ||
                  (typeof u.UNSAFE_componentWillMount != "function" &&
                    typeof u.componentWillMount != "function") ||
                  (typeof u.componentWillMount == "function" &&
                    u.componentWillMount(),
                  typeof u.UNSAFE_componentWillMount == "function" &&
                    u.UNSAFE_componentWillMount()),
                typeof u.componentDidMount == "function" &&
                  (t.flags |= 4194308))
              : (typeof u.componentDidMount == "function" &&
                  (t.flags |= 4194308),
                (t.memoizedProps = r),
                (t.memoizedState = s)),
            (u.props = r),
            (u.state = s),
            (u.context = m),
            (r = o))
          : (typeof u.componentDidMount == "function" && (t.flags |= 4194308),
            (r = !1));
    } else {
      (u = t.stateNode),
        as(e, t),
        (o = t.memoizedProps),
        (m = t.type === t.elementType ? o : it(t.type, o)),
        (u.props = m),
        (x = t.pendingProps),
        (g = u.context),
        (s = n.contextType),
        typeof s == "object" && s !== null
          ? (s = qe(s))
          : ((s = Fe(n) ? Yt : Ee.current), (s = xn(t, s)));
      var C = n.getDerivedStateFromProps;
      (w =
        typeof C == "function" ||
        typeof u.getSnapshotBeforeUpdate == "function") ||
        (typeof u.UNSAFE_componentWillReceiveProps != "function" &&
          typeof u.componentWillReceiveProps != "function") ||
        ((o !== x || g !== s) && Ms(t, u, r, s)),
        (Ut = !1),
        (g = t.memoizedState),
        (u.state = g),
        tl(t, r, u, l);
      var I = t.memoizedState;
      o !== x || g !== I || ze.current || Ut
        ? (typeof C == "function" && (Xi(t, n, C, r), (I = t.memoizedState)),
          (m = Ut || Os(t, n, m, r, g, I, s) || !1)
            ? (w ||
                (typeof u.UNSAFE_componentWillUpdate != "function" &&
                  typeof u.componentWillUpdate != "function") ||
                (typeof u.componentWillUpdate == "function" &&
                  u.componentWillUpdate(r, I, s),
                typeof u.UNSAFE_componentWillUpdate == "function" &&
                  u.UNSAFE_componentWillUpdate(r, I, s)),
              typeof u.componentDidUpdate == "function" && (t.flags |= 4),
              typeof u.getSnapshotBeforeUpdate == "function" &&
                (t.flags |= 1024))
            : (typeof u.componentDidUpdate != "function" ||
                (o === e.memoizedProps && g === e.memoizedState) ||
                (t.flags |= 4),
              typeof u.getSnapshotBeforeUpdate != "function" ||
                (o === e.memoizedProps && g === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = r),
              (t.memoizedState = I)),
          (u.props = r),
          (u.state = I),
          (u.context = s),
          (r = m))
        : (typeof u.componentDidUpdate != "function" ||
            (o === e.memoizedProps && g === e.memoizedState) ||
            (t.flags |= 4),
          typeof u.getSnapshotBeforeUpdate != "function" ||
            (o === e.memoizedProps && g === e.memoizedState) ||
            (t.flags |= 1024),
          (r = !1));
    }
    return Ji(e, t, n, r, i, l);
  }
  function Ji(e, t, n, r, l, i) {
    Xs(e, t);
    var u = (t.flags & 128) !== 0;
    if (!r && !u) return l && $o(t, n, !1), Nt(e, t, i);
    (r = t.stateNode), (gf.current = t);
    var o =
      u && typeof n.getDerivedStateFromError != "function" ? null : r.render();
    return (
      (t.flags |= 1),
      e !== null && u
        ? ((t.child = Cn(t, e.child, null, i)), (t.child = Cn(t, null, o, i)))
        : Pe(e, t, o, i),
      (t.memoizedState = r.state),
      l && $o(t, n, !0),
      t.child
    );
  }
  function Zs(e) {
    var t = e.stateNode;
    t.pendingContext
      ? Yo(e, t.pendingContext, t.pendingContext !== t.context)
      : t.context && Yo(e, t.context, !1),
      Oi(e, t.containerInfo);
  }
  function qs(e, t, n, r, l) {
    return En(), Ri(l), (t.flags |= 256), Pe(e, t, n, r), t.child;
  }
  var $i = { dehydrated: null, treeContext: null, retryLane: 0 };
  function bi(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function Ys(e, t, n) {
    var r = t.pendingProps,
      l = ue.current,
      i = !1,
      u = (t.flags & 128) !== 0,
      o;
    if (
      ((o = u) ||
        (o = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0),
      o
        ? ((i = !0), (t.flags &= -129))
        : (e === null || e.memoizedState !== null) && (l |= 1),
      b(ue, l & 1),
      e === null)
    )
      return (
        Ai(t),
        (e = t.memoizedState),
        e !== null && ((e = e.dehydrated), e !== null)
          ? (t.mode & 1
              ? e.data === "$!"
                ? (t.lanes = 8)
                : (t.lanes = 1073741824)
              : (t.lanes = 1),
            null)
          : ((u = r.children),
            (e = r.fallback),
            i
              ? ((r = t.mode),
                (i = t.child),
                (u = { mode: "hidden", children: u }),
                !(r & 1) && i !== null
                  ? ((i.childLanes = 0), (i.pendingProps = u))
                  : (i = Sl(u, r, 0, null)),
                (e = on(e, r, n, null)),
                (i.return = t),
                (e.return = t),
                (i.sibling = e),
                (t.child = i),
                (t.child.memoizedState = bi(n)),
                (t.memoizedState = $i),
                e)
              : eu(t, u))
      );
    if (((l = e.memoizedState), l !== null && ((o = l.dehydrated), o !== null)))
      return yf(e, t, u, r, o, l, n);
    if (i) {
      (i = r.fallback), (u = t.mode), (l = e.child), (o = l.sibling);
      var s = { mode: "hidden", children: r.children };
      return (
        !(u & 1) && t.child !== l
          ? ((r = t.child),
            (r.childLanes = 0),
            (r.pendingProps = s),
            (t.deletions = null))
          : ((r = Kt(l, s)), (r.subtreeFlags = l.subtreeFlags & 14680064)),
        o !== null ? (i = Kt(o, i)) : ((i = on(i, u, n, null)), (i.flags |= 2)),
        (i.return = t),
        (r.return = t),
        (r.sibling = i),
        (t.child = r),
        (r = i),
        (i = t.child),
        (u = e.child.memoizedState),
        (u =
          u === null
            ? bi(n)
            : {
                baseLanes: u.baseLanes | n,
                cachePool: null,
                transitions: u.transitions,
              }),
        (i.memoizedState = u),
        (i.childLanes = e.childLanes & ~n),
        (t.memoizedState = $i),
        r
      );
    }
    return (
      (i = e.child),
      (e = i.sibling),
      (r = Kt(i, { mode: "visible", children: r.children })),
      !(t.mode & 1) && (r.lanes = n),
      (r.return = t),
      (r.sibling = null),
      e !== null &&
        ((n = t.deletions),
        n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
      (t.child = r),
      (t.memoizedState = null),
      r
    );
  }
  function eu(e, t) {
    return (
      (t = Sl({ mode: "visible", children: t }, e.mode, 0, null)),
      (t.return = e),
      (e.child = t)
    );
  }
  function al(e, t, n, r) {
    return (
      r !== null && Ri(r),
      Cn(t, e.child, null, n),
      (e = eu(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function yf(e, t, n, r, l, i, u) {
    if (n)
      return t.flags & 256
        ? ((t.flags &= -257), (r = Zi(Error(d(422)))), al(e, t, u, r))
        : t.memoizedState !== null
          ? ((t.child = e.child), (t.flags |= 128), null)
          : ((i = r.fallback),
            (l = t.mode),
            (r = Sl({ mode: "visible", children: r.children }, l, 0, null)),
            (i = on(i, l, u, null)),
            (i.flags |= 2),
            (r.return = t),
            (i.return = t),
            (r.sibling = i),
            (t.child = r),
            t.mode & 1 && Cn(t, e.child, null, u),
            (t.child.memoizedState = bi(u)),
            (t.memoizedState = $i),
            i);
    if (!(t.mode & 1)) return al(e, t, u, null);
    if (l.data === "$!") {
      if (((r = l.nextSibling && l.nextSibling.dataset), r)) var o = r.dgst;
      return (
        (r = o), (i = Error(d(419))), (r = Zi(i, r, void 0)), al(e, t, u, r)
      );
    }
    if (((o = (u & e.childLanes) !== 0), Oe || o)) {
      if (((r = ve), r !== null)) {
        switch (u & -u) {
          case 4:
            l = 2;
            break;
          case 16:
            l = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            l = 32;
            break;
          case 536870912:
            l = 268435456;
            break;
          default:
            l = 0;
        }
        (l = l & (r.suspendedLanes | u) ? 0 : l),
          l !== 0 &&
            l !== i.retryLane &&
            ((i.retryLane = l), Et(e, l), st(r, e, l, -1));
      }
      return vu(), (r = Zi(Error(d(421)))), al(e, t, u, r);
    }
    return l.data === "$?"
      ? ((t.flags |= 128),
        (t.child = e.child),
        (t = Lf.bind(null, e)),
        (l._reactRetry = t),
        null)
      : ((e = i.treeContext),
        (Be = Ot(l.nextSibling)),
        (Ve = t),
        (ie = !0),
        (lt = null),
        e !== null &&
          ((Ge[Ze++] = kt),
          (Ge[Ze++] = St),
          (Ge[Ze++] = Jt),
          (kt = e.id),
          (St = e.overflow),
          (Jt = t)),
        (t = eu(t, r.children)),
        (t.flags |= 4096),
        t);
  }
  function Js(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t), Li(e.return, t, n);
  }
  function tu(e, t, n, r, l) {
    var i = e.memoizedState;
    i === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: r,
          tail: n,
          tailMode: l,
        })
      : ((i.isBackwards = t),
        (i.rendering = null),
        (i.renderingStartTime = 0),
        (i.last = r),
        (i.tail = n),
        (i.tailMode = l));
  }
  function $s(e, t, n) {
    var r = t.pendingProps,
      l = r.revealOrder,
      i = r.tail;
    if ((Pe(e, t, r.children, n), (r = ue.current), r & 2))
      (r = (r & 1) | 2), (t.flags |= 128);
    else {
      if (e !== null && e.flags & 128)
        e: for (e = t.child; e !== null; ) {
          if (e.tag === 13) e.memoizedState !== null && Js(e, n, t);
          else if (e.tag === 19) Js(e, n, t);
          else if (e.child !== null) {
            (e.child.return = e), (e = e.child);
            continue;
          }
          if (e === t) break e;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t) break e;
            e = e.return;
          }
          (e.sibling.return = e.return), (e = e.sibling);
        }
      r &= 1;
    }
    if ((b(ue, r), !(t.mode & 1))) t.memoizedState = null;
    else
      switch (l) {
        case "forwards":
          for (n = t.child, l = null; n !== null; )
            (e = n.alternate),
              e !== null && nl(e) === null && (l = n),
              (n = n.sibling);
          (n = l),
            n === null
              ? ((l = t.child), (t.child = null))
              : ((l = n.sibling), (n.sibling = null)),
            tu(t, !1, l, n, i);
          break;
        case "backwards":
          for (n = null, l = t.child, t.child = null; l !== null; ) {
            if (((e = l.alternate), e !== null && nl(e) === null)) {
              t.child = l;
              break;
            }
            (e = l.sibling), (l.sibling = n), (n = l), (l = e);
          }
          tu(t, !0, n, null, i);
          break;
        case "together":
          tu(t, !1, null, null, void 0);
          break;
        default:
          t.memoizedState = null;
      }
    return t.child;
  }
  function cl(e, t) {
    !(t.mode & 1) &&
      e !== null &&
      ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
  }
  function Nt(e, t, n) {
    if (
      (e !== null && (t.dependencies = e.dependencies),
      (nn |= t.lanes),
      !(n & t.childLanes))
    )
      return null;
    if (e !== null && t.child !== e.child) throw Error(d(153));
    if (t.child !== null) {
      for (
        e = t.child, n = Kt(e, e.pendingProps), t.child = n, n.return = t;
        e.sibling !== null;

      )
        (e = e.sibling),
          (n = n.sibling = Kt(e, e.pendingProps)),
          (n.return = t);
      n.sibling = null;
    }
    return t.child;
  }
  function wf(e, t, n) {
    switch (t.tag) {
      case 3:
        Zs(t), En();
        break;
      case 5:
        ds(t);
        break;
      case 1:
        Fe(t.type) && Xr(t);
        break;
      case 4:
        Oi(t, t.stateNode.containerInfo);
        break;
      case 10:
        var r = t.type._context,
          l = t.memoizedProps.value;
        b($r, r._currentValue), (r._currentValue = l);
        break;
      case 13:
        if (((r = t.memoizedState), r !== null))
          return r.dehydrated !== null
            ? (b(ue, ue.current & 1), (t.flags |= 128), null)
            : n & t.child.childLanes
              ? Ys(e, t, n)
              : (b(ue, ue.current & 1),
                (e = Nt(e, t, n)),
                e !== null ? e.sibling : null);
        b(ue, ue.current & 1);
        break;
      case 19:
        if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
          if (r) return $s(e, t, n);
          t.flags |= 128;
        }
        if (
          ((l = t.memoizedState),
          l !== null &&
            ((l.rendering = null), (l.tail = null), (l.lastEffect = null)),
          b(ue, ue.current),
          r)
        )
          break;
        return null;
      case 22:
      case 23:
        return (t.lanes = 0), Ks(e, t, n);
    }
    return Nt(e, t, n);
  }
  var bs, nu, ea, ta;
  (bs = function (e, t) {
    for (var n = t.child; n !== null; ) {
      if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
      else if (n.tag !== 4 && n.child !== null) {
        (n.child.return = n), (n = n.child);
        continue;
      }
      if (n === t) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === t) return;
        n = n.return;
      }
      (n.sibling.return = n.return), (n = n.sibling);
    }
  }),
    (nu = function () {}),
    (ea = function (e, t, n, r) {
      var l = e.memoizedProps;
      if (l !== r) {
        (e = t.stateNode), en(mt.current);
        var i = null;
        switch (n) {
          case "input":
            (l = Ll(e, l)), (r = Ll(e, r)), (i = []);
            break;
          case "select":
            (l = R({}, l, { value: void 0 })),
              (r = R({}, r, { value: void 0 })),
              (i = []);
            break;
          case "textarea":
            (l = Ol(e, l)), (r = Ol(e, r)), (i = []);
            break;
          default:
            typeof l.onClick != "function" &&
              typeof r.onClick == "function" &&
              (e.onclick = Hr);
        }
        Ml(n, r);
        var u;
        n = null;
        for (m in l)
          if (!r.hasOwnProperty(m) && l.hasOwnProperty(m) && l[m] != null)
            if (m === "style") {
              var o = l[m];
              for (u in o) o.hasOwnProperty(u) && (n || (n = {}), (n[u] = ""));
            } else
              m !== "dangerouslySetInnerHTML" &&
                m !== "children" &&
                m !== "suppressContentEditableWarning" &&
                m !== "suppressHydrationWarning" &&
                m !== "autoFocus" &&
                (O.hasOwnProperty(m)
                  ? i || (i = [])
                  : (i = i || []).push(m, null));
        for (m in r) {
          var s = r[m];
          if (
            ((o = l != null ? l[m] : void 0),
            r.hasOwnProperty(m) && s !== o && (s != null || o != null))
          )
            if (m === "style")
              if (o) {
                for (u in o)
                  !o.hasOwnProperty(u) ||
                    (s && s.hasOwnProperty(u)) ||
                    (n || (n = {}), (n[u] = ""));
                for (u in s)
                  s.hasOwnProperty(u) &&
                    o[u] !== s[u] &&
                    (n || (n = {}), (n[u] = s[u]));
              } else n || (i || (i = []), i.push(m, n)), (n = s);
            else
              m === "dangerouslySetInnerHTML"
                ? ((s = s ? s.__html : void 0),
                  (o = o ? o.__html : void 0),
                  s != null && o !== s && (i = i || []).push(m, s))
                : m === "children"
                  ? (typeof s != "string" && typeof s != "number") ||
                    (i = i || []).push(m, "" + s)
                  : m !== "suppressContentEditableWarning" &&
                    m !== "suppressHydrationWarning" &&
                    (O.hasOwnProperty(m)
                      ? (s != null && m === "onScroll" && te("scroll", e),
                        i || o === s || (i = []))
                      : (i = i || []).push(m, s));
        }
        n && (i = i || []).push("style", n);
        var m = i;
        (t.updateQueue = m) && (t.flags |= 4);
      }
    }),
    (ta = function (e, t, n, r) {
      n !== r && (t.flags |= 4);
    });
  function dr(e, t) {
    if (!ie)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var n = null; t !== null; )
            t.alternate !== null && (n = t), (t = t.sibling);
          n === null ? (e.tail = null) : (n.sibling = null);
          break;
        case "collapsed":
          n = e.tail;
          for (var r = null; n !== null; )
            n.alternate !== null && (r = n), (n = n.sibling);
          r === null
            ? t || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (r.sibling = null);
      }
  }
  function Ne(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      n = 0,
      r = 0;
    if (t)
      for (var l = e.child; l !== null; )
        (n |= l.lanes | l.childLanes),
          (r |= l.subtreeFlags & 14680064),
          (r |= l.flags & 14680064),
          (l.return = e),
          (l = l.sibling);
    else
      for (l = e.child; l !== null; )
        (n |= l.lanes | l.childLanes),
          (r |= l.subtreeFlags),
          (r |= l.flags),
          (l.return = e),
          (l = l.sibling);
    return (e.subtreeFlags |= r), (e.childLanes = n), t;
  }
  function xf(e, t, n) {
    var r = t.pendingProps;
    switch ((Ci(t), t.tag)) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Ne(t), null;
      case 1:
        return Fe(t.type) && Kr(), Ne(t), null;
      case 3:
        return (
          (r = t.stateNode),
          Rn(),
          ne(ze),
          ne(Ee),
          _i(),
          r.pendingContext &&
            ((r.context = r.pendingContext), (r.pendingContext = null)),
          (e === null || e.child === null) &&
            (Yr(t)
              ? (t.flags |= 4)
              : e === null ||
                (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
                ((t.flags |= 1024), lt !== null && (pu(lt), (lt = null)))),
          nu(e, t),
          Ne(t),
          null
        );
      case 5:
        Ti(t);
        var l = en(or.current);
        if (((n = t.type), e !== null && t.stateNode != null))
          ea(e, t, n, r, l),
            e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
        else {
          if (!r) {
            if (t.stateNode === null) throw Error(d(166));
            return Ne(t), null;
          }
          if (((e = en(mt.current)), Yr(t))) {
            (r = t.stateNode), (n = t.type);
            var i = t.memoizedProps;
            switch (((r[pt] = t), (r[nr] = i), (e = (t.mode & 1) !== 0), n)) {
              case "dialog":
                te("cancel", r), te("close", r);
                break;
              case "iframe":
              case "object":
              case "embed":
                te("load", r);
                break;
              case "video":
              case "audio":
                for (l = 0; l < bn.length; l++) te(bn[l], r);
                break;
              case "source":
                te("error", r);
                break;
              case "img":
              case "image":
              case "link":
                te("error", r), te("load", r);
                break;
              case "details":
                te("toggle", r);
                break;
              case "input":
                Ou(r, i), te("invalid", r);
                break;
              case "select":
                (r._wrapperState = { wasMultiple: !!i.multiple }),
                  te("invalid", r);
                break;
              case "textarea":
                _u(r, i), te("invalid", r);
            }
            Ml(n, i), (l = null);
            for (var u in i)
              if (i.hasOwnProperty(u)) {
                var o = i[u];
                u === "children"
                  ? typeof o == "string"
                    ? r.textContent !== o &&
                      (i.suppressHydrationWarning !== !0 &&
                        Br(r.textContent, o, e),
                      (l = ["children", o]))
                    : typeof o == "number" &&
                      r.textContent !== "" + o &&
                      (i.suppressHydrationWarning !== !0 &&
                        Br(r.textContent, o, e),
                      (l = ["children", "" + o]))
                  : O.hasOwnProperty(u) &&
                    o != null &&
                    u === "onScroll" &&
                    te("scroll", r);
              }
            switch (n) {
              case "input":
                wr(r), Mu(r, i, !0);
                break;
              case "textarea":
                wr(r), Du(r);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof i.onClick == "function" && (r.onclick = Hr);
            }
            (r = l), (t.updateQueue = r), r !== null && (t.flags |= 4);
          } else {
            (u = l.nodeType === 9 ? l : l.ownerDocument),
              e === "http://www.w3.org/1999/xhtml" && (e = Qu(n)),
              e === "http://www.w3.org/1999/xhtml"
                ? n === "script"
                  ? ((e = u.createElement("div")),
                    (e.innerHTML = "<script><\/script>"),
                    (e = e.removeChild(e.firstChild)))
                  : typeof r.is == "string"
                    ? (e = u.createElement(n, { is: r.is }))
                    : ((e = u.createElement(n)),
                      n === "select" &&
                        ((u = e),
                        r.multiple
                          ? (u.multiple = !0)
                          : r.size && (u.size = r.size)))
                : (e = u.createElementNS(e, n)),
              (e[pt] = t),
              (e[nr] = r),
              bs(e, t, !1, !1),
              (t.stateNode = e);
            e: {
              switch (((u = _l(n, r)), n)) {
                case "dialog":
                  te("cancel", e), te("close", e), (l = r);
                  break;
                case "iframe":
                case "object":
                case "embed":
                  te("load", e), (l = r);
                  break;
                case "video":
                case "audio":
                  for (l = 0; l < bn.length; l++) te(bn[l], e);
                  l = r;
                  break;
                case "source":
                  te("error", e), (l = r);
                  break;
                case "img":
                case "image":
                case "link":
                  te("error", e), te("load", e), (l = r);
                  break;
                case "details":
                  te("toggle", e), (l = r);
                  break;
                case "input":
                  Ou(e, r), (l = Ll(e, r)), te("invalid", e);
                  break;
                case "option":
                  l = r;
                  break;
                case "select":
                  (e._wrapperState = { wasMultiple: !!r.multiple }),
                    (l = R({}, r, { value: void 0 })),
                    te("invalid", e);
                  break;
                case "textarea":
                  _u(e, r), (l = Ol(e, r)), te("invalid", e);
                  break;
                default:
                  l = r;
              }
              Ml(n, l), (o = l);
              for (i in o)
                if (o.hasOwnProperty(i)) {
                  var s = o[i];
                  i === "style"
                    ? Hu(e, s)
                    : i === "dangerouslySetInnerHTML"
                      ? ((s = s ? s.__html : void 0), s != null && Vu(e, s))
                      : i === "children"
                        ? typeof s == "string"
                          ? (n !== "textarea" || s !== "") && On(e, s)
                          : typeof s == "number" && On(e, "" + s)
                        : i !== "suppressContentEditableWarning" &&
                          i !== "suppressHydrationWarning" &&
                          i !== "autoFocus" &&
                          (O.hasOwnProperty(i)
                            ? s != null && i === "onScroll" && te("scroll", e)
                            : s != null && be(e, i, s, u));
                }
              switch (n) {
                case "input":
                  wr(e), Mu(e, r, !1);
                  break;
                case "textarea":
                  wr(e), Du(e);
                  break;
                case "option":
                  r.value != null && e.setAttribute("value", "" + K(r.value));
                  break;
                case "select":
                  (e.multiple = !!r.multiple),
                    (i = r.value),
                    i != null
                      ? sn(e, !!r.multiple, i, !1)
                      : r.defaultValue != null &&
                        sn(e, !!r.multiple, r.defaultValue, !0);
                  break;
                default:
                  typeof l.onClick == "function" && (e.onclick = Hr);
              }
              switch (n) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  r = !!r.autoFocus;
                  break e;
                case "img":
                  r = !0;
                  break e;
                default:
                  r = !1;
              }
            }
            r && (t.flags |= 4);
          }
          t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
        }
        return Ne(t), null;
      case 6:
        if (e && t.stateNode != null) ta(e, t, e.memoizedProps, r);
        else {
          if (typeof r != "string" && t.stateNode === null) throw Error(d(166));
          if (((n = en(or.current)), en(mt.current), Yr(t))) {
            if (
              ((r = t.stateNode),
              (n = t.memoizedProps),
              (r[pt] = t),
              (i = r.nodeValue !== n) && ((e = Ve), e !== null))
            )
              switch (e.tag) {
                case 3:
                  Br(r.nodeValue, n, (e.mode & 1) !== 0);
                  break;
                case 5:
                  e.memoizedProps.suppressHydrationWarning !== !0 &&
                    Br(r.nodeValue, n, (e.mode & 1) !== 0);
              }
            i && (t.flags |= 4);
          } else
            (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
              (r[pt] = t),
              (t.stateNode = r);
        }
        return Ne(t), null;
      case 13:
        if (
          (ne(ue),
          (r = t.memoizedState),
          e === null ||
            (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (ie && Be !== null && t.mode & 1 && !(t.flags & 128))
            ls(), En(), (t.flags |= 98560), (i = !1);
          else if (((i = Yr(t)), r !== null && r.dehydrated !== null)) {
            if (e === null) {
              if (!i) throw Error(d(318));
              if (
                ((i = t.memoizedState),
                (i = i !== null ? i.dehydrated : null),
                !i)
              )
                throw Error(d(317));
              i[pt] = t;
            } else
              En(),
                !(t.flags & 128) && (t.memoizedState = null),
                (t.flags |= 4);
            Ne(t), (i = !1);
          } else lt !== null && (pu(lt), (lt = null)), (i = !0);
          if (!i) return t.flags & 65536 ? t : null;
        }
        return t.flags & 128
          ? ((t.lanes = n), t)
          : ((r = r !== null),
            r !== (e !== null && e.memoizedState !== null) &&
              r &&
              ((t.child.flags |= 8192),
              t.mode & 1 &&
                (e === null || ue.current & 1 ? me === 0 && (me = 3) : vu())),
            t.updateQueue !== null && (t.flags |= 4),
            Ne(t),
            null);
      case 4:
        return (
          Rn(),
          nu(e, t),
          e === null && er(t.stateNode.containerInfo),
          Ne(t),
          null
        );
      case 10:
        return ji(t.type._context), Ne(t), null;
      case 17:
        return Fe(t.type) && Kr(), Ne(t), null;
      case 19:
        if ((ne(ue), (i = t.memoizedState), i === null)) return Ne(t), null;
        if (((r = (t.flags & 128) !== 0), (u = i.rendering), u === null))
          if (r) dr(i, !1);
          else {
            if (me !== 0 || (e !== null && e.flags & 128))
              for (e = t.child; e !== null; ) {
                if (((u = nl(e)), u !== null)) {
                  for (
                    t.flags |= 128,
                      dr(i, !1),
                      r = u.updateQueue,
                      r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                      t.subtreeFlags = 0,
                      r = n,
                      n = t.child;
                    n !== null;

                  )
                    (i = n),
                      (e = r),
                      (i.flags &= 14680066),
                      (u = i.alternate),
                      u === null
                        ? ((i.childLanes = 0),
                          (i.lanes = e),
                          (i.child = null),
                          (i.subtreeFlags = 0),
                          (i.memoizedProps = null),
                          (i.memoizedState = null),
                          (i.updateQueue = null),
                          (i.dependencies = null),
                          (i.stateNode = null))
                        : ((i.childLanes = u.childLanes),
                          (i.lanes = u.lanes),
                          (i.child = u.child),
                          (i.subtreeFlags = 0),
                          (i.deletions = null),
                          (i.memoizedProps = u.memoizedProps),
                          (i.memoizedState = u.memoizedState),
                          (i.updateQueue = u.updateQueue),
                          (i.type = u.type),
                          (e = u.dependencies),
                          (i.dependencies =
                            e === null
                              ? null
                              : {
                                  lanes: e.lanes,
                                  firstContext: e.firstContext,
                                })),
                      (n = n.sibling);
                  return b(ue, (ue.current & 1) | 2), t.child;
                }
                e = e.sibling;
              }
            i.tail !== null &&
              ce() > Ln &&
              ((t.flags |= 128), (r = !0), dr(i, !1), (t.lanes = 4194304));
          }
        else {
          if (!r)
            if (((e = nl(u)), e !== null)) {
              if (
                ((t.flags |= 128),
                (r = !0),
                (n = e.updateQueue),
                n !== null && ((t.updateQueue = n), (t.flags |= 4)),
                dr(i, !0),
                i.tail === null &&
                  i.tailMode === "hidden" &&
                  !u.alternate &&
                  !ie)
              )
                return Ne(t), null;
            } else
              2 * ce() - i.renderingStartTime > Ln &&
                n !== 1073741824 &&
                ((t.flags |= 128), (r = !0), dr(i, !1), (t.lanes = 4194304));
          i.isBackwards
            ? ((u.sibling = t.child), (t.child = u))
            : ((n = i.last),
              n !== null ? (n.sibling = u) : (t.child = u),
              (i.last = u));
        }
        return i.tail !== null
          ? ((t = i.tail),
            (i.rendering = t),
            (i.tail = t.sibling),
            (i.renderingStartTime = ce()),
            (t.sibling = null),
            (n = ue.current),
            b(ue, r ? (n & 1) | 2 : n & 1),
            t)
          : (Ne(t), null);
      case 22:
      case 23:
        return (
          hu(),
          (r = t.memoizedState !== null),
          e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
          r && t.mode & 1
            ? He & 1073741824 &&
              (Ne(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : Ne(t),
          null
        );
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(d(156, t.tag));
  }
  function kf(e, t) {
    switch ((Ci(t), t.tag)) {
      case 1:
        return (
          Fe(t.type) && Kr(),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 3:
        return (
          Rn(),
          ne(ze),
          ne(Ee),
          _i(),
          (e = t.flags),
          e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 5:
        return Ti(t), null;
      case 13:
        if (
          (ne(ue), (e = t.memoizedState), e !== null && e.dehydrated !== null)
        ) {
          if (t.alternate === null) throw Error(d(340));
          En();
        }
        return (
          (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 19:
        return ne(ue), null;
      case 4:
        return Rn(), null;
      case 10:
        return ji(t.type._context), null;
      case 22:
      case 23:
        return hu(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var fl = !1,
    Ae = !1,
    Sf = typeof WeakSet == "function" ? WeakSet : Set,
    A = null;
  function In(e, t) {
    var n = e.ref;
    if (n !== null)
      if (typeof n == "function")
        try {
          n(null);
        } catch (r) {
          ae(e, t, r);
        }
      else n.current = null;
  }
  function ru(e, t, n) {
    try {
      n();
    } catch (r) {
      ae(e, t, r);
    }
  }
  var na = !1;
  function Ef(e, t) {
    if (((hi = Lr), (e = Oo()), oi(e))) {
      if ("selectionStart" in e)
        var n = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          n = ((n = e.ownerDocument) && n.defaultView) || window;
          var r = n.getSelection && n.getSelection();
          if (r && r.rangeCount !== 0) {
            n = r.anchorNode;
            var l = r.anchorOffset,
              i = r.focusNode;
            r = r.focusOffset;
            try {
              n.nodeType, i.nodeType;
            } catch {
              n = null;
              break e;
            }
            var u = 0,
              o = -1,
              s = -1,
              m = 0,
              w = 0,
              x = e,
              g = null;
            t: for (;;) {
              for (
                var C;
                x !== n || (l !== 0 && x.nodeType !== 3) || (o = u + l),
                  x !== i || (r !== 0 && x.nodeType !== 3) || (s = u + r),
                  x.nodeType === 3 && (u += x.nodeValue.length),
                  (C = x.firstChild) !== null;

              )
                (g = x), (x = C);
              for (;;) {
                if (x === e) break t;
                if (
                  (g === n && ++m === l && (o = u),
                  g === i && ++w === r && (s = u),
                  (C = x.nextSibling) !== null)
                )
                  break;
                (x = g), (g = x.parentNode);
              }
              x = C;
            }
            n = o === -1 || s === -1 ? null : { start: o, end: s };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (
      vi = { focusedElem: e, selectionRange: n }, Lr = !1, A = t;
      A !== null;

    )
      if (((t = A), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
        (e.return = t), (A = e);
      else
        for (; A !== null; ) {
          t = A;
          try {
            var I = t.alternate;
            if (t.flags & 1024)
              switch (t.tag) {
                case 0:
                case 11:
                case 15:
                  break;
                case 1:
                  if (I !== null) {
                    var j = I.memoizedProps,
                      fe = I.memoizedState,
                      f = t.stateNode,
                      a = f.getSnapshotBeforeUpdate(
                        t.elementType === t.type ? j : it(t.type, j),
                        fe,
                      );
                    f.__reactInternalSnapshotBeforeUpdate = a;
                  }
                  break;
                case 3:
                  var p = t.stateNode.containerInfo;
                  p.nodeType === 1
                    ? (p.textContent = "")
                    : p.nodeType === 9 &&
                      p.documentElement &&
                      p.removeChild(p.documentElement);
                  break;
                case 5:
                case 6:
                case 4:
                case 17:
                  break;
                default:
                  throw Error(d(163));
              }
          } catch (S) {
            ae(t, t.return, S);
          }
          if (((e = t.sibling), e !== null)) {
            (e.return = t.return), (A = e);
            break;
          }
          A = t.return;
        }
    return (I = na), (na = !1), I;
  }
  function pr(e, t, n) {
    var r = t.updateQueue;
    if (((r = r !== null ? r.lastEffect : null), r !== null)) {
      var l = (r = r.next);
      do {
        if ((l.tag & e) === e) {
          var i = l.destroy;
          (l.destroy = void 0), i !== void 0 && ru(t, n, i);
        }
        l = l.next;
      } while (l !== r);
    }
  }
  function dl(e, t) {
    if (
      ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
    ) {
      var n = (t = t.next);
      do {
        if ((n.tag & e) === e) {
          var r = n.create;
          n.destroy = r();
        }
        n = n.next;
      } while (n !== t);
    }
  }
  function lu(e) {
    var t = e.ref;
    if (t !== null) {
      var n = e.stateNode;
      switch (e.tag) {
        case 5:
          e = n;
          break;
        default:
          e = n;
      }
      typeof t == "function" ? t(e) : (t.current = e);
    }
  }
  function ra(e) {
    var t = e.alternate;
    t !== null && ((e.alternate = null), ra(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 &&
        ((t = e.stateNode),
        t !== null &&
          (delete t[pt],
          delete t[nr],
          delete t[xi],
          delete t[lf],
          delete t[uf])),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null);
  }
  function la(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function ia(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || la(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

      ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
        (e.child.return = e), (e = e.child);
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function iu(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
      (e = e.stateNode),
        t
          ? n.nodeType === 8
            ? n.parentNode.insertBefore(e, t)
            : n.insertBefore(e, t)
          : (n.nodeType === 8
              ? ((t = n.parentNode), t.insertBefore(e, n))
              : ((t = n), t.appendChild(e)),
            (n = n._reactRootContainer),
            n != null || t.onclick !== null || (t.onclick = Hr));
    else if (r !== 4 && ((e = e.child), e !== null))
      for (iu(e, t, n), e = e.sibling; e !== null; )
        iu(e, t, n), (e = e.sibling);
  }
  function uu(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
      (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (r !== 4 && ((e = e.child), e !== null))
      for (uu(e, t, n), e = e.sibling; e !== null; )
        uu(e, t, n), (e = e.sibling);
  }
  var we = null,
    ut = !1;
  function Qt(e, t, n) {
    for (n = n.child; n !== null; ) ua(e, t, n), (n = n.sibling);
  }
  function ua(e, t, n) {
    if (dt && typeof dt.onCommitFiberUnmount == "function")
      try {
        dt.onCommitFiberUnmount(Nr, n);
      } catch {}
    switch (n.tag) {
      case 5:
        Ae || In(n, t);
      case 6:
        var r = we,
          l = ut;
        (we = null),
          Qt(e, t, n),
          (we = r),
          (ut = l),
          we !== null &&
            (ut
              ? ((e = we),
                (n = n.stateNode),
                e.nodeType === 8
                  ? e.parentNode.removeChild(n)
                  : e.removeChild(n))
              : we.removeChild(n.stateNode));
        break;
      case 18:
        we !== null &&
          (ut
            ? ((e = we),
              (n = n.stateNode),
              e.nodeType === 8
                ? wi(e.parentNode, n)
                : e.nodeType === 1 && wi(e, n),
              Kn(e))
            : wi(we, n.stateNode));
        break;
      case 4:
        (r = we),
          (l = ut),
          (we = n.stateNode.containerInfo),
          (ut = !0),
          Qt(e, t, n),
          (we = r),
          (ut = l);
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (
          !Ae &&
          ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
        ) {
          l = r = r.next;
          do {
            var i = l,
              u = i.destroy;
            (i = i.tag),
              u !== void 0 && (i & 2 || i & 4) && ru(n, t, u),
              (l = l.next);
          } while (l !== r);
        }
        Qt(e, t, n);
        break;
      case 1:
        if (
          !Ae &&
          (In(n, t),
          (r = n.stateNode),
          typeof r.componentWillUnmount == "function")
        )
          try {
            (r.props = n.memoizedProps),
              (r.state = n.memoizedState),
              r.componentWillUnmount();
          } catch (o) {
            ae(n, t, o);
          }
        Qt(e, t, n);
        break;
      case 21:
        Qt(e, t, n);
        break;
      case 22:
        n.mode & 1
          ? ((Ae = (r = Ae) || n.memoizedState !== null), Qt(e, t, n), (Ae = r))
          : Qt(e, t, n);
        break;
      default:
        Qt(e, t, n);
    }
  }
  function oa(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var n = e.stateNode;
      n === null && (n = e.stateNode = new Sf()),
        t.forEach(function (r) {
          var l = zf.bind(null, e, r);
          n.has(r) || (n.add(r), r.then(l, l));
        });
    }
  }
  function ot(e, t) {
    var n = t.deletions;
    if (n !== null)
      for (var r = 0; r < n.length; r++) {
        var l = n[r];
        try {
          var i = e,
            u = t,
            o = u;
          e: for (; o !== null; ) {
            switch (o.tag) {
              case 5:
                (we = o.stateNode), (ut = !1);
                break e;
              case 3:
                (we = o.stateNode.containerInfo), (ut = !0);
                break e;
              case 4:
                (we = o.stateNode.containerInfo), (ut = !0);
                break e;
            }
            o = o.return;
          }
          if (we === null) throw Error(d(160));
          ua(i, u, l), (we = null), (ut = !1);
          var s = l.alternate;
          s !== null && (s.return = null), (l.return = null);
        } catch (m) {
          ae(l, t, m);
        }
      }
    if (t.subtreeFlags & 12854)
      for (t = t.child; t !== null; ) sa(t, e), (t = t.sibling);
  }
  function sa(e, t) {
    var n = e.alternate,
      r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if ((ot(t, e), vt(e), r & 4)) {
          try {
            pr(3, e, e.return), dl(3, e);
          } catch (j) {
            ae(e, e.return, j);
          }
          try {
            pr(5, e, e.return);
          } catch (j) {
            ae(e, e.return, j);
          }
        }
        break;
      case 1:
        ot(t, e), vt(e), r & 512 && n !== null && In(n, n.return);
        break;
      case 5:
        if (
          (ot(t, e),
          vt(e),
          r & 512 && n !== null && In(n, n.return),
          e.flags & 32)
        ) {
          var l = e.stateNode;
          try {
            On(l, "");
          } catch (j) {
            ae(e, e.return, j);
          }
        }
        if (r & 4 && ((l = e.stateNode), l != null)) {
          var i = e.memoizedProps,
            u = n !== null ? n.memoizedProps : i,
            o = e.type,
            s = e.updateQueue;
          if (((e.updateQueue = null), s !== null))
            try {
              o === "input" && i.type === "radio" && i.name != null && Tu(l, i),
                _l(o, u);
              var m = _l(o, i);
              for (u = 0; u < s.length; u += 2) {
                var w = s[u],
                  x = s[u + 1];
                w === "style"
                  ? Hu(l, x)
                  : w === "dangerouslySetInnerHTML"
                    ? Vu(l, x)
                    : w === "children"
                      ? On(l, x)
                      : be(l, w, x, m);
              }
              switch (o) {
                case "input":
                  zl(l, i);
                  break;
                case "textarea":
                  Uu(l, i);
                  break;
                case "select":
                  var g = l._wrapperState.wasMultiple;
                  l._wrapperState.wasMultiple = !!i.multiple;
                  var C = i.value;
                  C != null
                    ? sn(l, !!i.multiple, C, !1)
                    : g !== !!i.multiple &&
                      (i.defaultValue != null
                        ? sn(l, !!i.multiple, i.defaultValue, !0)
                        : sn(l, !!i.multiple, i.multiple ? [] : "", !1));
              }
              l[nr] = i;
            } catch (j) {
              ae(e, e.return, j);
            }
        }
        break;
      case 6:
        if ((ot(t, e), vt(e), r & 4)) {
          if (e.stateNode === null) throw Error(d(162));
          (l = e.stateNode), (i = e.memoizedProps);
          try {
            l.nodeValue = i;
          } catch (j) {
            ae(e, e.return, j);
          }
        }
        break;
      case 3:
        if (
          (ot(t, e), vt(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
        )
          try {
            Kn(t.containerInfo);
          } catch (j) {
            ae(e, e.return, j);
          }
        break;
      case 4:
        ot(t, e), vt(e);
        break;
      case 13:
        ot(t, e),
          vt(e),
          (l = e.child),
          l.flags & 8192 &&
            ((i = l.memoizedState !== null),
            (l.stateNode.isHidden = i),
            !i ||
              (l.alternate !== null && l.alternate.memoizedState !== null) ||
              (au = ce())),
          r & 4 && oa(e);
        break;
      case 22:
        if (
          ((w = n !== null && n.memoizedState !== null),
          e.mode & 1 ? ((Ae = (m = Ae) || w), ot(t, e), (Ae = m)) : ot(t, e),
          vt(e),
          r & 8192)
        ) {
          if (
            ((m = e.memoizedState !== null),
            (e.stateNode.isHidden = m) && !w && e.mode & 1)
          )
            for (A = e, w = e.child; w !== null; ) {
              for (x = A = w; A !== null; ) {
                switch (((g = A), (C = g.child), g.tag)) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    pr(4, g, g.return);
                    break;
                  case 1:
                    In(g, g.return);
                    var I = g.stateNode;
                    if (typeof I.componentWillUnmount == "function") {
                      (r = g), (n = g.return);
                      try {
                        (t = r),
                          (I.props = t.memoizedProps),
                          (I.state = t.memoizedState),
                          I.componentWillUnmount();
                      } catch (j) {
                        ae(r, n, j);
                      }
                    }
                    break;
                  case 5:
                    In(g, g.return);
                    break;
                  case 22:
                    if (g.memoizedState !== null) {
                      fa(x);
                      continue;
                    }
                }
                C !== null ? ((C.return = g), (A = C)) : fa(x);
              }
              w = w.sibling;
            }
          e: for (w = null, x = e; ; ) {
            if (x.tag === 5) {
              if (w === null) {
                w = x;
                try {
                  (l = x.stateNode),
                    m
                      ? ((i = l.style),
                        typeof i.setProperty == "function"
                          ? i.setProperty("display", "none", "important")
                          : (i.display = "none"))
                      : ((o = x.stateNode),
                        (s = x.memoizedProps.style),
                        (u =
                          s != null && s.hasOwnProperty("display")
                            ? s.display
                            : null),
                        (o.style.display = Bu("display", u)));
                } catch (j) {
                  ae(e, e.return, j);
                }
              }
            } else if (x.tag === 6) {
              if (w === null)
                try {
                  x.stateNode.nodeValue = m ? "" : x.memoizedProps;
                } catch (j) {
                  ae(e, e.return, j);
                }
            } else if (
              ((x.tag !== 22 && x.tag !== 23) ||
                x.memoizedState === null ||
                x === e) &&
              x.child !== null
            ) {
              (x.child.return = x), (x = x.child);
              continue;
            }
            if (x === e) break e;
            for (; x.sibling === null; ) {
              if (x.return === null || x.return === e) break e;
              w === x && (w = null), (x = x.return);
            }
            w === x && (w = null),
              (x.sibling.return = x.return),
              (x = x.sibling);
          }
        }
        break;
      case 19:
        ot(t, e), vt(e), r & 4 && oa(e);
        break;
      case 21:
        break;
      default:
        ot(t, e), vt(e);
    }
  }
  function vt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        e: {
          for (var n = e.return; n !== null; ) {
            if (la(n)) {
              var r = n;
              break e;
            }
            n = n.return;
          }
          throw Error(d(160));
        }
        switch (r.tag) {
          case 5:
            var l = r.stateNode;
            r.flags & 32 && (On(l, ""), (r.flags &= -33));
            var i = ia(e);
            uu(e, i, l);
            break;
          case 3:
          case 4:
            var u = r.stateNode.containerInfo,
              o = ia(e);
            iu(e, o, u);
            break;
          default:
            throw Error(d(161));
        }
      } catch (s) {
        ae(e, e.return, s);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Cf(e, t, n) {
    (A = e), aa(e);
  }
  function aa(e, t, n) {
    for (var r = (e.mode & 1) !== 0; A !== null; ) {
      var l = A,
        i = l.child;
      if (l.tag === 22 && r) {
        var u = l.memoizedState !== null || fl;
        if (!u) {
          var o = l.alternate,
            s = (o !== null && o.memoizedState !== null) || Ae;
          o = fl;
          var m = Ae;
          if (((fl = u), (Ae = s) && !m))
            for (A = l; A !== null; )
              (u = A),
                (s = u.child),
                u.tag === 22 && u.memoizedState !== null
                  ? da(l)
                  : s !== null
                    ? ((s.return = u), (A = s))
                    : da(l);
          for (; i !== null; ) (A = i), aa(i), (i = i.sibling);
          (A = l), (fl = o), (Ae = m);
        }
        ca(e);
      } else
        l.subtreeFlags & 8772 && i !== null ? ((i.return = l), (A = i)) : ca(e);
    }
  }
  function ca(e) {
    for (; A !== null; ) {
      var t = A;
      if (t.flags & 8772) {
        var n = t.alternate;
        try {
          if (t.flags & 8772)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                Ae || dl(5, t);
                break;
              case 1:
                var r = t.stateNode;
                if (t.flags & 4 && !Ae)
                  if (n === null) r.componentDidMount();
                  else {
                    var l =
                      t.elementType === t.type
                        ? n.memoizedProps
                        : it(t.type, n.memoizedProps);
                    r.componentDidUpdate(
                      l,
                      n.memoizedState,
                      r.__reactInternalSnapshotBeforeUpdate,
                    );
                  }
                var i = t.updateQueue;
                i !== null && fs(t, i, r);
                break;
              case 3:
                var u = t.updateQueue;
                if (u !== null) {
                  if (((n = null), t.child !== null))
                    switch (t.child.tag) {
                      case 5:
                        n = t.child.stateNode;
                        break;
                      case 1:
                        n = t.child.stateNode;
                    }
                  fs(t, u, n);
                }
                break;
              case 5:
                var o = t.stateNode;
                if (n === null && t.flags & 4) {
                  n = o;
                  var s = t.memoizedProps;
                  switch (t.type) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      s.autoFocus && n.focus();
                      break;
                    case "img":
                      s.src && (n.src = s.src);
                  }
                }
                break;
              case 6:
                break;
              case 4:
                break;
              case 12:
                break;
              case 13:
                if (t.memoizedState === null) {
                  var m = t.alternate;
                  if (m !== null) {
                    var w = m.memoizedState;
                    if (w !== null) {
                      var x = w.dehydrated;
                      x !== null && Kn(x);
                    }
                  }
                }
                break;
              case 19:
              case 17:
              case 21:
              case 22:
              case 23:
              case 25:
                break;
              default:
                throw Error(d(163));
            }
          Ae || (t.flags & 512 && lu(t));
        } catch (g) {
          ae(t, t.return, g);
        }
      }
      if (t === e) {
        A = null;
        break;
      }
      if (((n = t.sibling), n !== null)) {
        (n.return = t.return), (A = n);
        break;
      }
      A = t.return;
    }
  }
  function fa(e) {
    for (; A !== null; ) {
      var t = A;
      if (t === e) {
        A = null;
        break;
      }
      var n = t.sibling;
      if (n !== null) {
        (n.return = t.return), (A = n);
        break;
      }
      A = t.return;
    }
  }
  function da(e) {
    for (; A !== null; ) {
      var t = A;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var n = t.return;
            try {
              dl(4, t);
            } catch (s) {
              ae(t, n, s);
            }
            break;
          case 1:
            var r = t.stateNode;
            if (typeof r.componentDidMount == "function") {
              var l = t.return;
              try {
                r.componentDidMount();
              } catch (s) {
                ae(t, l, s);
              }
            }
            var i = t.return;
            try {
              lu(t);
            } catch (s) {
              ae(t, i, s);
            }
            break;
          case 5:
            var u = t.return;
            try {
              lu(t);
            } catch (s) {
              ae(t, u, s);
            }
        }
      } catch (s) {
        ae(t, t.return, s);
      }
      if (t === e) {
        A = null;
        break;
      }
      var o = t.sibling;
      if (o !== null) {
        (o.return = t.return), (A = o);
        break;
      }
      A = t.return;
    }
  }
  var Nf = Math.ceil,
    pl = Se.ReactCurrentDispatcher,
    ou = Se.ReactCurrentOwner,
    Je = Se.ReactCurrentBatchConfig,
    V = 0,
    ve = null,
    de = null,
    xe = 0,
    He = 0,
    jn = Tt(0),
    me = 0,
    mr = null,
    nn = 0,
    ml = 0,
    su = 0,
    hr = null,
    Te = null,
    au = 0,
    Ln = 1 / 0,
    At = null,
    hl = !1,
    cu = null,
    Vt = null,
    vl = !1,
    Bt = null,
    gl = 0,
    vr = 0,
    fu = null,
    yl = -1,
    wl = 0;
  function Ie() {
    return V & 6 ? ce() : yl !== -1 ? yl : (yl = ce());
  }
  function Ht(e) {
    return e.mode & 1
      ? V & 2 && xe !== 0
        ? xe & -xe
        : sf.transition !== null
          ? (wl === 0 && (wl = lo()), wl)
          : ((e = X),
            e !== 0 ||
              ((e = window.event), (e = e === void 0 ? 16 : mo(e.type))),
            e)
      : 1;
  }
  function st(e, t, n, r) {
    if (50 < vr) throw ((vr = 0), (fu = null), Error(d(185)));
    Qn(e, n, r),
      (!(V & 2) || e !== ve) &&
        (e === ve && (!(V & 2) && (ml |= n), me === 4 && Wt(e, xe)),
        Me(e, r),
        n === 1 && V === 0 && !(t.mode & 1) && ((Ln = ce() + 500), Gr && _t()));
  }
  function Me(e, t) {
    var n = e.callbackNode;
    oc(e, t);
    var r = Pr(e, e === ve ? xe : 0);
    if (r === 0)
      n !== null && to(n), (e.callbackNode = null), (e.callbackPriority = 0);
    else if (((t = r & -r), e.callbackPriority !== t)) {
      if ((n != null && to(n), t === 1))
        e.tag === 0 ? of(ma.bind(null, e)) : bo(ma.bind(null, e)),
          nf(function () {
            !(V & 6) && _t();
          }),
          (n = null);
      else {
        switch (io(r)) {
          case 1:
            n = Wl;
            break;
          case 4:
            n = no;
            break;
          case 16:
            n = Cr;
            break;
          case 536870912:
            n = ro;
            break;
          default:
            n = Cr;
        }
        n = Sa(n, pa.bind(null, e));
      }
      (e.callbackPriority = t), (e.callbackNode = n);
    }
  }
  function pa(e, t) {
    if (((yl = -1), (wl = 0), V & 6)) throw Error(d(327));
    var n = e.callbackNode;
    if (zn() && e.callbackNode !== n) return null;
    var r = Pr(e, e === ve ? xe : 0);
    if (r === 0) return null;
    if (r & 30 || r & e.expiredLanes || t) t = xl(e, r);
    else {
      t = r;
      var l = V;
      V |= 2;
      var i = va();
      (ve !== e || xe !== t) && ((At = null), (Ln = ce() + 500), ln(e, t));
      do
        try {
          Pf();
          break;
        } catch (o) {
          ha(e, o);
        }
      while (!0);
      Ii(),
        (pl.current = i),
        (V = l),
        de !== null ? (t = 0) : ((ve = null), (xe = 0), (t = me));
    }
    if (t !== 0) {
      if (
        (t === 2 && ((l = Kl(e)), l !== 0 && ((r = l), (t = du(e, l)))),
        t === 1)
      )
        throw ((n = mr), ln(e, 0), Wt(e, r), Me(e, ce()), n);
      if (t === 6) Wt(e, r);
      else {
        if (
          ((l = e.current.alternate),
          !(r & 30) &&
            !Af(l) &&
            ((t = xl(e, r)),
            t === 2 && ((i = Kl(e)), i !== 0 && ((r = i), (t = du(e, i)))),
            t === 1))
        )
          throw ((n = mr), ln(e, 0), Wt(e, r), Me(e, ce()), n);
        switch (((e.finishedWork = l), (e.finishedLanes = r), t)) {
          case 0:
          case 1:
            throw Error(d(345));
          case 2:
            un(e, Te, At);
            break;
          case 3:
            if (
              (Wt(e, r),
              (r & 130023424) === r && ((t = au + 500 - ce()), 10 < t))
            ) {
              if (Pr(e, 0) !== 0) break;
              if (((l = e.suspendedLanes), (l & r) !== r)) {
                Ie(), (e.pingedLanes |= e.suspendedLanes & l);
                break;
              }
              e.timeoutHandle = yi(un.bind(null, e, Te, At), t);
              break;
            }
            un(e, Te, At);
            break;
          case 4:
            if ((Wt(e, r), (r & 4194240) === r)) break;
            for (t = e.eventTimes, l = -1; 0 < r; ) {
              var u = 31 - nt(r);
              (i = 1 << u), (u = t[u]), u > l && (l = u), (r &= ~i);
            }
            if (
              ((r = l),
              (r = ce() - r),
              (r =
                (120 > r
                  ? 120
                  : 480 > r
                    ? 480
                    : 1080 > r
                      ? 1080
                      : 1920 > r
                        ? 1920
                        : 3e3 > r
                          ? 3e3
                          : 4320 > r
                            ? 4320
                            : 1960 * Nf(r / 1960)) - r),
              10 < r)
            ) {
              e.timeoutHandle = yi(un.bind(null, e, Te, At), r);
              break;
            }
            un(e, Te, At);
            break;
          case 5:
            un(e, Te, At);
            break;
          default:
            throw Error(d(329));
        }
      }
    }
    return Me(e, ce()), e.callbackNode === n ? pa.bind(null, e) : null;
  }
  function du(e, t) {
    var n = hr;
    return (
      e.current.memoizedState.isDehydrated && (ln(e, t).flags |= 256),
      (e = xl(e, t)),
      e !== 2 && ((t = Te), (Te = n), t !== null && pu(t)),
      e
    );
  }
  function pu(e) {
    Te === null ? (Te = e) : Te.push.apply(Te, e);
  }
  function Af(e) {
    for (var t = e; ; ) {
      if (t.flags & 16384) {
        var n = t.updateQueue;
        if (n !== null && ((n = n.stores), n !== null))
          for (var r = 0; r < n.length; r++) {
            var l = n[r],
              i = l.getSnapshot;
            l = l.value;
            try {
              if (!rt(i(), l)) return !1;
            } catch {
              return !1;
            }
          }
      }
      if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
        (n.return = t), (t = n);
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        (t.sibling.return = t.return), (t = t.sibling);
      }
    }
    return !0;
  }
  function Wt(e, t) {
    for (
      t &= ~su,
        t &= ~ml,
        e.suspendedLanes |= t,
        e.pingedLanes &= ~t,
        e = e.expirationTimes;
      0 < t;

    ) {
      var n = 31 - nt(t),
        r = 1 << n;
      (e[n] = -1), (t &= ~r);
    }
  }
  function ma(e) {
    if (V & 6) throw Error(d(327));
    zn();
    var t = Pr(e, 0);
    if (!(t & 1)) return Me(e, ce()), null;
    var n = xl(e, t);
    if (e.tag !== 0 && n === 2) {
      var r = Kl(e);
      r !== 0 && ((t = r), (n = du(e, r)));
    }
    if (n === 1) throw ((n = mr), ln(e, 0), Wt(e, t), Me(e, ce()), n);
    if (n === 6) throw Error(d(345));
    return (
      (e.finishedWork = e.current.alternate),
      (e.finishedLanes = t),
      un(e, Te, At),
      Me(e, ce()),
      null
    );
  }
  function mu(e, t) {
    var n = V;
    V |= 1;
    try {
      return e(t);
    } finally {
      (V = n), V === 0 && ((Ln = ce() + 500), Gr && _t());
    }
  }
  function rn(e) {
    Bt !== null && Bt.tag === 0 && !(V & 6) && zn();
    var t = V;
    V |= 1;
    var n = Je.transition,
      r = X;
    try {
      if (((Je.transition = null), (X = 1), e)) return e();
    } finally {
      (X = r), (Je.transition = n), (V = t), !(V & 6) && _t();
    }
  }
  function hu() {
    (He = jn.current), ne(jn);
  }
  function ln(e, t) {
    (e.finishedWork = null), (e.finishedLanes = 0);
    var n = e.timeoutHandle;
    if ((n !== -1 && ((e.timeoutHandle = -1), tf(n)), de !== null))
      for (n = de.return; n !== null; ) {
        var r = n;
        switch ((Ci(r), r.tag)) {
          case 1:
            (r = r.type.childContextTypes), r != null && Kr();
            break;
          case 3:
            Rn(), ne(ze), ne(Ee), _i();
            break;
          case 5:
            Ti(r);
            break;
          case 4:
            Rn();
            break;
          case 13:
            ne(ue);
            break;
          case 19:
            ne(ue);
            break;
          case 10:
            ji(r.type._context);
            break;
          case 22:
          case 23:
            hu();
        }
        n = n.return;
      }
    if (
      ((ve = e),
      (de = e = Kt(e.current, null)),
      (xe = He = t),
      (me = 0),
      (mr = null),
      (su = ml = nn = 0),
      (Te = hr = null),
      bt !== null)
    ) {
      for (t = 0; t < bt.length; t++)
        if (((n = bt[t]), (r = n.interleaved), r !== null)) {
          n.interleaved = null;
          var l = r.next,
            i = n.pending;
          if (i !== null) {
            var u = i.next;
            (i.next = l), (r.next = u);
          }
          n.pending = r;
        }
      bt = null;
    }
    return e;
  }
  function ha(e, t) {
    do {
      var n = de;
      try {
        if ((Ii(), (rl.current = ol), ll)) {
          for (var r = oe.memoizedState; r !== null; ) {
            var l = r.queue;
            l !== null && (l.pending = null), (r = r.next);
          }
          ll = !1;
        }
        if (
          ((tn = 0),
          (he = pe = oe = null),
          (sr = !1),
          (ar = 0),
          (ou.current = null),
          n === null || n.return === null)
        ) {
          (me = 1), (mr = t), (de = null);
          break;
        }
        e: {
          var i = e,
            u = n.return,
            o = n,
            s = t;
          if (
            ((t = xe),
            (o.flags |= 32768),
            s !== null && typeof s == "object" && typeof s.then == "function")
          ) {
            var m = s,
              w = o,
              x = w.tag;
            if (!(w.mode & 1) && (x === 0 || x === 11 || x === 15)) {
              var g = w.alternate;
              g
                ? ((w.updateQueue = g.updateQueue),
                  (w.memoizedState = g.memoizedState),
                  (w.lanes = g.lanes))
                : ((w.updateQueue = null), (w.memoizedState = null));
            }
            var C = Qs(u);
            if (C !== null) {
              (C.flags &= -257),
                Vs(C, u, o, i, t),
                C.mode & 1 && Ds(i, m, t),
                (t = C),
                (s = m);
              var I = t.updateQueue;
              if (I === null) {
                var j = new Set();
                j.add(s), (t.updateQueue = j);
              } else I.add(s);
              break e;
            } else {
              if (!(t & 1)) {
                Ds(i, m, t), vu();
                break e;
              }
              s = Error(d(426));
            }
          } else if (ie && o.mode & 1) {
            var fe = Qs(u);
            if (fe !== null) {
              !(fe.flags & 65536) && (fe.flags |= 256),
                Vs(fe, u, o, i, t),
                Ri(Pn(s, o));
              break e;
            }
          }
          (i = s = Pn(s, o)),
            me !== 4 && (me = 2),
            hr === null ? (hr = [i]) : hr.push(i),
            (i = u);
          do {
            switch (i.tag) {
              case 3:
                (i.flags |= 65536), (t &= -t), (i.lanes |= t);
                var f = _s(i, s, t);
                cs(i, f);
                break e;
              case 1:
                o = s;
                var a = i.type,
                  p = i.stateNode;
                if (
                  !(i.flags & 128) &&
                  (typeof a.getDerivedStateFromError == "function" ||
                    (p !== null &&
                      typeof p.componentDidCatch == "function" &&
                      (Vt === null || !Vt.has(p))))
                ) {
                  (i.flags |= 65536), (t &= -t), (i.lanes |= t);
                  var S = Us(i, o, t);
                  cs(i, S);
                  break e;
                }
            }
            i = i.return;
          } while (i !== null);
        }
        ya(n);
      } catch (L) {
        (t = L), de === n && n !== null && (de = n = n.return);
        continue;
      }
      break;
    } while (!0);
  }
  function va() {
    var e = pl.current;
    return (pl.current = ol), e === null ? ol : e;
  }
  function vu() {
    (me === 0 || me === 3 || me === 2) && (me = 4),
      ve === null || (!(nn & 268435455) && !(ml & 268435455)) || Wt(ve, xe);
  }
  function xl(e, t) {
    var n = V;
    V |= 2;
    var r = va();
    (ve !== e || xe !== t) && ((At = null), ln(e, t));
    do
      try {
        Rf();
        break;
      } catch (l) {
        ha(e, l);
      }
    while (!0);
    if ((Ii(), (V = n), (pl.current = r), de !== null)) throw Error(d(261));
    return (ve = null), (xe = 0), me;
  }
  function Rf() {
    for (; de !== null; ) ga(de);
  }
  function Pf() {
    for (; de !== null && !$a(); ) ga(de);
  }
  function ga(e) {
    var t = ka(e.alternate, e, He);
    (e.memoizedProps = e.pendingProps),
      t === null ? ya(e) : (de = t),
      (ou.current = null);
  }
  function ya(e) {
    var t = e;
    do {
      var n = t.alternate;
      if (((e = t.return), t.flags & 32768)) {
        if (((n = kf(n, t)), n !== null)) {
          (n.flags &= 32767), (de = n);
          return;
        }
        if (e !== null)
          (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
        else {
          (me = 6), (de = null);
          return;
        }
      } else if (((n = xf(n, t, He)), n !== null)) {
        de = n;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        de = t;
        return;
      }
      de = t = e;
    } while (t !== null);
    me === 0 && (me = 5);
  }
  function un(e, t, n) {
    var r = X,
      l = Je.transition;
    try {
      (Je.transition = null), (X = 1), If(e, t, n, r);
    } finally {
      (Je.transition = l), (X = r);
    }
    return null;
  }
  function If(e, t, n, r) {
    do zn();
    while (Bt !== null);
    if (V & 6) throw Error(d(327));
    n = e.finishedWork;
    var l = e.finishedLanes;
    if (n === null) return null;
    if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
      throw Error(d(177));
    (e.callbackNode = null), (e.callbackPriority = 0);
    var i = n.lanes | n.childLanes;
    if (
      (sc(e, i),
      e === ve && ((de = ve = null), (xe = 0)),
      (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
        vl ||
        ((vl = !0),
        Sa(Cr, function () {
          return zn(), null;
        })),
      (i = (n.flags & 15990) !== 0),
      n.subtreeFlags & 15990 || i)
    ) {
      (i = Je.transition), (Je.transition = null);
      var u = X;
      X = 1;
      var o = V;
      (V |= 4),
        (ou.current = null),
        Ef(e, n),
        sa(n, e),
        Zc(vi),
        (Lr = !!hi),
        (vi = hi = null),
        (e.current = n),
        Cf(n),
        ba(),
        (V = o),
        (X = u),
        (Je.transition = i);
    } else e.current = n;
    if (
      (vl && ((vl = !1), (Bt = e), (gl = l)),
      (i = e.pendingLanes),
      i === 0 && (Vt = null),
      nc(n.stateNode),
      Me(e, ce()),
      t !== null)
    )
      for (r = e.onRecoverableError, n = 0; n < t.length; n++)
        (l = t[n]), r(l.value, { componentStack: l.stack, digest: l.digest });
    if (hl) throw ((hl = !1), (e = cu), (cu = null), e);
    return (
      gl & 1 && e.tag !== 0 && zn(),
      (i = e.pendingLanes),
      i & 1 ? (e === fu ? vr++ : ((vr = 0), (fu = e))) : (vr = 0),
      _t(),
      null
    );
  }
  function zn() {
    if (Bt !== null) {
      var e = io(gl),
        t = Je.transition,
        n = X;
      try {
        if (((Je.transition = null), (X = 16 > e ? 16 : e), Bt === null))
          var r = !1;
        else {
          if (((e = Bt), (Bt = null), (gl = 0), V & 6)) throw Error(d(331));
          var l = V;
          for (V |= 4, A = e.current; A !== null; ) {
            var i = A,
              u = i.child;
            if (A.flags & 16) {
              var o = i.deletions;
              if (o !== null) {
                for (var s = 0; s < o.length; s++) {
                  var m = o[s];
                  for (A = m; A !== null; ) {
                    var w = A;
                    switch (w.tag) {
                      case 0:
                      case 11:
                      case 15:
                        pr(8, w, i);
                    }
                    var x = w.child;
                    if (x !== null) (x.return = w), (A = x);
                    else
                      for (; A !== null; ) {
                        w = A;
                        var g = w.sibling,
                          C = w.return;
                        if ((ra(w), w === m)) {
                          A = null;
                          break;
                        }
                        if (g !== null) {
                          (g.return = C), (A = g);
                          break;
                        }
                        A = C;
                      }
                  }
                }
                var I = i.alternate;
                if (I !== null) {
                  var j = I.child;
                  if (j !== null) {
                    I.child = null;
                    do {
                      var fe = j.sibling;
                      (j.sibling = null), (j = fe);
                    } while (j !== null);
                  }
                }
                A = i;
              }
            }
            if (i.subtreeFlags & 2064 && u !== null) (u.return = i), (A = u);
            else
              e: for (; A !== null; ) {
                if (((i = A), i.flags & 2048))
                  switch (i.tag) {
                    case 0:
                    case 11:
                    case 15:
                      pr(9, i, i.return);
                  }
                var f = i.sibling;
                if (f !== null) {
                  (f.return = i.return), (A = f);
                  break e;
                }
                A = i.return;
              }
          }
          var a = e.current;
          for (A = a; A !== null; ) {
            u = A;
            var p = u.child;
            if (u.subtreeFlags & 2064 && p !== null) (p.return = u), (A = p);
            else
              e: for (u = a; A !== null; ) {
                if (((o = A), o.flags & 2048))
                  try {
                    switch (o.tag) {
                      case 0:
                      case 11:
                      case 15:
                        dl(9, o);
                    }
                  } catch (L) {
                    ae(o, o.return, L);
                  }
                if (o === u) {
                  A = null;
                  break e;
                }
                var S = o.sibling;
                if (S !== null) {
                  (S.return = o.return), (A = S);
                  break e;
                }
                A = o.return;
              }
          }
          if (
            ((V = l), _t(), dt && typeof dt.onPostCommitFiberRoot == "function")
          )
            try {
              dt.onPostCommitFiberRoot(Nr, e);
            } catch {}
          r = !0;
        }
        return r;
      } finally {
        (X = n), (Je.transition = t);
      }
    }
    return !1;
  }
  function wa(e, t, n) {
    (t = Pn(n, t)),
      (t = _s(e, t, 1)),
      (e = Dt(e, t, 1)),
      (t = Ie()),
      e !== null && (Qn(e, 1, t), Me(e, t));
  }
  function ae(e, t, n) {
    if (e.tag === 3) wa(e, e, n);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          wa(t, e, n);
          break;
        } else if (t.tag === 1) {
          var r = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == "function" ||
            (typeof r.componentDidCatch == "function" &&
              (Vt === null || !Vt.has(r)))
          ) {
            (e = Pn(n, e)),
              (e = Us(t, e, 1)),
              (t = Dt(t, e, 1)),
              (e = Ie()),
              t !== null && (Qn(t, 1, e), Me(t, e));
            break;
          }
        }
        t = t.return;
      }
  }
  function jf(e, t, n) {
    var r = e.pingCache;
    r !== null && r.delete(t),
      (t = Ie()),
      (e.pingedLanes |= e.suspendedLanes & n),
      ve === e &&
        (xe & n) === n &&
        (me === 4 || (me === 3 && (xe & 130023424) === xe && 500 > ce() - au)
          ? ln(e, 0)
          : (su |= n)),
      Me(e, t);
  }
  function xa(e, t) {
    t === 0 &&
      (e.mode & 1
        ? ((t = Rr), (Rr <<= 1), !(Rr & 130023424) && (Rr = 4194304))
        : (t = 1));
    var n = Ie();
    (e = Et(e, t)), e !== null && (Qn(e, t, n), Me(e, n));
  }
  function Lf(e) {
    var t = e.memoizedState,
      n = 0;
    t !== null && (n = t.retryLane), xa(e, n);
  }
  function zf(e, t) {
    var n = 0;
    switch (e.tag) {
      case 13:
        var r = e.stateNode,
          l = e.memoizedState;
        l !== null && (n = l.retryLane);
        break;
      case 19:
        r = e.stateNode;
        break;
      default:
        throw Error(d(314));
    }
    r !== null && r.delete(t), xa(e, n);
  }
  var ka;
  ka = function (e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps || ze.current) Oe = !0;
      else {
        if (!(e.lanes & n) && !(t.flags & 128)) return (Oe = !1), wf(e, t, n);
        Oe = !!(e.flags & 131072);
      }
    else (Oe = !1), ie && t.flags & 1048576 && es(t, qr, t.index);
    switch (((t.lanes = 0), t.tag)) {
      case 2:
        var r = t.type;
        cl(e, t), (e = t.pendingProps);
        var l = xn(t, Ee.current);
        An(t, n), (l = Qi(null, t, r, e, l, n));
        var i = Vi();
        return (
          (t.flags |= 1),
          typeof l == "object" &&
          l !== null &&
          typeof l.render == "function" &&
          l.$$typeof === void 0
            ? ((t.tag = 1),
              (t.memoizedState = null),
              (t.updateQueue = null),
              Fe(r) ? ((i = !0), Xr(t)) : (i = !1),
              (t.memoizedState =
                l.state !== null && l.state !== void 0 ? l.state : null),
              Fi(t),
              (l.updater = sl),
              (t.stateNode = l),
              (l._reactInternals = t),
              Gi(t, r, e, n),
              (t = Ji(null, t, r, !0, i, n)))
            : ((t.tag = 0), ie && i && Ei(t), Pe(null, t, l, n), (t = t.child)),
          t
        );
      case 16:
        r = t.elementType;
        e: {
          switch (
            (cl(e, t),
            (e = t.pendingProps),
            (l = r._init),
            (r = l(r._payload)),
            (t.type = r),
            (l = t.tag = Of(r)),
            (e = it(r, e)),
            l)
          ) {
            case 0:
              t = Yi(null, t, r, e, n);
              break e;
            case 1:
              t = Gs(null, t, r, e, n);
              break e;
            case 11:
              t = Bs(null, t, r, e, n);
              break e;
            case 14:
              t = Hs(null, t, r, it(r.type, e), n);
              break e;
          }
          throw Error(d(306, r, ""));
        }
        return t;
      case 0:
        return (
          (r = t.type),
          (l = t.pendingProps),
          (l = t.elementType === r ? l : it(r, l)),
          Yi(e, t, r, l, n)
        );
      case 1:
        return (
          (r = t.type),
          (l = t.pendingProps),
          (l = t.elementType === r ? l : it(r, l)),
          Gs(e, t, r, l, n)
        );
      case 3:
        e: {
          if ((Zs(t), e === null)) throw Error(d(387));
          (r = t.pendingProps),
            (i = t.memoizedState),
            (l = i.element),
            as(e, t),
            tl(t, r, null, n);
          var u = t.memoizedState;
          if (((r = u.element), i.isDehydrated))
            if (
              ((i = {
                element: r,
                isDehydrated: !1,
                cache: u.cache,
                pendingSuspenseBoundaries: u.pendingSuspenseBoundaries,
                transitions: u.transitions,
              }),
              (t.updateQueue.baseState = i),
              (t.memoizedState = i),
              t.flags & 256)
            ) {
              (l = Pn(Error(d(423)), t)), (t = qs(e, t, r, n, l));
              break e;
            } else if (r !== l) {
              (l = Pn(Error(d(424)), t)), (t = qs(e, t, r, n, l));
              break e;
            } else
              for (
                Be = Ot(t.stateNode.containerInfo.firstChild),
                  Ve = t,
                  ie = !0,
                  lt = null,
                  n = os(t, null, r, n),
                  t.child = n;
                n;

              )
                (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
          else {
            if ((En(), r === l)) {
              t = Nt(e, t, n);
              break e;
            }
            Pe(e, t, r, n);
          }
          t = t.child;
        }
        return t;
      case 5:
        return (
          ds(t),
          e === null && Ai(t),
          (r = t.type),
          (l = t.pendingProps),
          (i = e !== null ? e.memoizedProps : null),
          (u = l.children),
          gi(r, l) ? (u = null) : i !== null && gi(r, i) && (t.flags |= 32),
          Xs(e, t),
          Pe(e, t, u, n),
          t.child
        );
      case 6:
        return e === null && Ai(t), null;
      case 13:
        return Ys(e, t, n);
      case 4:
        return (
          Oi(t, t.stateNode.containerInfo),
          (r = t.pendingProps),
          e === null ? (t.child = Cn(t, null, r, n)) : Pe(e, t, r, n),
          t.child
        );
      case 11:
        return (
          (r = t.type),
          (l = t.pendingProps),
          (l = t.elementType === r ? l : it(r, l)),
          Bs(e, t, r, l, n)
        );
      case 7:
        return Pe(e, t, t.pendingProps, n), t.child;
      case 8:
        return Pe(e, t, t.pendingProps.children, n), t.child;
      case 12:
        return Pe(e, t, t.pendingProps.children, n), t.child;
      case 10:
        e: {
          if (
            ((r = t.type._context),
            (l = t.pendingProps),
            (i = t.memoizedProps),
            (u = l.value),
            b($r, r._currentValue),
            (r._currentValue = u),
            i !== null)
          )
            if (rt(i.value, u)) {
              if (i.children === l.children && !ze.current) {
                t = Nt(e, t, n);
                break e;
              }
            } else
              for (i = t.child, i !== null && (i.return = t); i !== null; ) {
                var o = i.dependencies;
                if (o !== null) {
                  u = i.child;
                  for (var s = o.firstContext; s !== null; ) {
                    if (s.context === r) {
                      if (i.tag === 1) {
                        (s = Ct(-1, n & -n)), (s.tag = 2);
                        var m = i.updateQueue;
                        if (m !== null) {
                          m = m.shared;
                          var w = m.pending;
                          w === null
                            ? (s.next = s)
                            : ((s.next = w.next), (w.next = s)),
                            (m.pending = s);
                        }
                      }
                      (i.lanes |= n),
                        (s = i.alternate),
                        s !== null && (s.lanes |= n),
                        Li(i.return, n, t),
                        (o.lanes |= n);
                      break;
                    }
                    s = s.next;
                  }
                } else if (i.tag === 10) u = i.type === t.type ? null : i.child;
                else if (i.tag === 18) {
                  if (((u = i.return), u === null)) throw Error(d(341));
                  (u.lanes |= n),
                    (o = u.alternate),
                    o !== null && (o.lanes |= n),
                    Li(u, n, t),
                    (u = i.sibling);
                } else u = i.child;
                if (u !== null) u.return = i;
                else
                  for (u = i; u !== null; ) {
                    if (u === t) {
                      u = null;
                      break;
                    }
                    if (((i = u.sibling), i !== null)) {
                      (i.return = u.return), (u = i);
                      break;
                    }
                    u = u.return;
                  }
                i = u;
              }
          Pe(e, t, l.children, n), (t = t.child);
        }
        return t;
      case 9:
        return (
          (l = t.type),
          (r = t.pendingProps.children),
          An(t, n),
          (l = qe(l)),
          (r = r(l)),
          (t.flags |= 1),
          Pe(e, t, r, n),
          t.child
        );
      case 14:
        return (
          (r = t.type),
          (l = it(r, t.pendingProps)),
          (l = it(r.type, l)),
          Hs(e, t, r, l, n)
        );
      case 15:
        return Ws(e, t, t.type, t.pendingProps, n);
      case 17:
        return (
          (r = t.type),
          (l = t.pendingProps),
          (l = t.elementType === r ? l : it(r, l)),
          cl(e, t),
          (t.tag = 1),
          Fe(r) ? ((e = !0), Xr(t)) : (e = !1),
          An(t, n),
          Ts(t, r, l),
          Gi(t, r, l, n),
          Ji(null, t, r, !0, e, n)
        );
      case 19:
        return $s(e, t, n);
      case 22:
        return Ks(e, t, n);
    }
    throw Error(d(156, t.tag));
  };
  function Sa(e, t) {
    return eo(e, t);
  }
  function Ff(e, t, n, r) {
    (this.tag = e),
      (this.key = n),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.ref = null),
      (this.pendingProps = t),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = r),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null);
  }
  function $e(e, t, n, r) {
    return new Ff(e, t, n, r);
  }
  function gu(e) {
    return (e = e.prototype), !(!e || !e.isReactComponent);
  }
  function Of(e) {
    if (typeof e == "function") return gu(e) ? 1 : 0;
    if (e != null) {
      if (((e = e.$$typeof), e === ct)) return 11;
      if (e === ft) return 14;
    }
    return 2;
  }
  function Kt(e, t) {
    var n = e.alternate;
    return (
      n === null
        ? ((n = $e(e.tag, t, e.key, e.mode)),
          (n.elementType = e.elementType),
          (n.type = e.type),
          (n.stateNode = e.stateNode),
          (n.alternate = e),
          (e.alternate = n))
        : ((n.pendingProps = t),
          (n.type = e.type),
          (n.flags = 0),
          (n.subtreeFlags = 0),
          (n.deletions = null)),
      (n.flags = e.flags & 14680064),
      (n.childLanes = e.childLanes),
      (n.lanes = e.lanes),
      (n.child = e.child),
      (n.memoizedProps = e.memoizedProps),
      (n.memoizedState = e.memoizedState),
      (n.updateQueue = e.updateQueue),
      (t = e.dependencies),
      (n.dependencies =
        t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (n.sibling = e.sibling),
      (n.index = e.index),
      (n.ref = e.ref),
      n
    );
  }
  function kl(e, t, n, r, l, i) {
    var u = 2;
    if (((r = e), typeof e == "function")) gu(e) && (u = 1);
    else if (typeof e == "string") u = 5;
    else
      e: switch (e) {
        case je:
          return on(n.children, l, i, t);
        case Xe:
          (u = 8), (l |= 8);
          break;
        case Rt:
          return (
            (e = $e(12, n, t, l | 2)), (e.elementType = Rt), (e.lanes = i), e
          );
        case Ue:
          return (e = $e(13, n, t, l)), (e.elementType = Ue), (e.lanes = i), e;
        case tt:
          return (e = $e(19, n, t, l)), (e.elementType = tt), (e.lanes = i), e;
        case se:
          return Sl(n, l, i, t);
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case yt:
                u = 10;
                break e;
              case Gt:
                u = 9;
                break e;
              case ct:
                u = 11;
                break e;
              case ft:
                u = 14;
                break e;
              case Le:
                (u = 16), (r = null);
                break e;
            }
          throw Error(d(130, e == null ? e : typeof e, ""));
      }
    return (
      (t = $e(u, n, t, l)), (t.elementType = e), (t.type = r), (t.lanes = i), t
    );
  }
  function on(e, t, n, r) {
    return (e = $e(7, e, r, t)), (e.lanes = n), e;
  }
  function Sl(e, t, n, r) {
    return (
      (e = $e(22, e, r, t)),
      (e.elementType = se),
      (e.lanes = n),
      (e.stateNode = { isHidden: !1 }),
      e
    );
  }
  function yu(e, t, n) {
    return (e = $e(6, e, null, t)), (e.lanes = n), e;
  }
  function wu(e, t, n) {
    return (
      (t = $e(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = n),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  function Tf(e, t, n, r, l) {
    (this.tag = t),
      (this.containerInfo = e),
      (this.finishedWork =
        this.pingCache =
        this.current =
        this.pendingChildren =
          null),
      (this.timeoutHandle = -1),
      (this.callbackNode = this.pendingContext = this.context = null),
      (this.callbackPriority = 0),
      (this.eventTimes = Xl(0)),
      (this.expirationTimes = Xl(-1)),
      (this.entangledLanes =
        this.finishedLanes =
        this.mutableReadLanes =
        this.expiredLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Xl(0)),
      (this.identifierPrefix = r),
      (this.onRecoverableError = l),
      (this.mutableSourceEagerHydrationData = null);
  }
  function xu(e, t, n, r, l, i, u, o, s) {
    return (
      (e = new Tf(e, t, n, o, s)),
      t === 1 ? ((t = 1), i === !0 && (t |= 8)) : (t = 0),
      (i = $e(3, null, null, t)),
      (e.current = i),
      (i.stateNode = e),
      (i.memoizedState = {
        element: r,
        isDehydrated: n,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null,
      }),
      Fi(i),
      e
    );
  }
  function Mf(e, t, n) {
    var r =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: Re,
      key: r == null ? null : "" + r,
      children: e,
      containerInfo: t,
      implementation: n,
    };
  }
  function Ea(e) {
    if (!e) return Mt;
    e = e._reactInternals;
    e: {
      if (Zt(e) !== e || e.tag !== 1) throw Error(d(170));
      var t = e;
      do {
        switch (t.tag) {
          case 3:
            t = t.stateNode.context;
            break e;
          case 1:
            if (Fe(t.type)) {
              t = t.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        t = t.return;
      } while (t !== null);
      throw Error(d(171));
    }
    if (e.tag === 1) {
      var n = e.type;
      if (Fe(n)) return Jo(e, n, t);
    }
    return t;
  }
  function Ca(e, t, n, r, l, i, u, o, s) {
    return (
      (e = xu(n, r, !0, e, l, i, u, o, s)),
      (e.context = Ea(null)),
      (n = e.current),
      (r = Ie()),
      (l = Ht(n)),
      (i = Ct(r, l)),
      (i.callback = t ?? null),
      Dt(n, i, l),
      (e.current.lanes = l),
      Qn(e, l, r),
      Me(e, r),
      e
    );
  }
  function El(e, t, n, r) {
    var l = t.current,
      i = Ie(),
      u = Ht(l);
    return (
      (n = Ea(n)),
      t.context === null ? (t.context = n) : (t.pendingContext = n),
      (t = Ct(i, u)),
      (t.payload = { element: e }),
      (r = r === void 0 ? null : r),
      r !== null && (t.callback = r),
      (e = Dt(l, t, u)),
      e !== null && (st(e, l, u, i), el(e, l, u)),
      u
    );
  }
  function Cl(e) {
    if (((e = e.current), !e.child)) return null;
    switch (e.child.tag) {
      case 5:
        return e.child.stateNode;
      default:
        return e.child.stateNode;
    }
  }
  function Na(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function ku(e, t) {
    Na(e, t), (e = e.alternate) && Na(e, t);
  }
  var Aa =
    typeof reportError == "function"
      ? reportError
      : function (e) {
          console.error(e);
        };
  function Su(e) {
    this._internalRoot = e;
  }
  (Nl.prototype.render = Su.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(d(409));
      El(e, t, null, null);
    }),
    (Nl.prototype.unmount = Su.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          rn(function () {
            El(null, e, null, null);
          }),
            (t[wt] = null);
        }
      });
  function Nl(e) {
    this._internalRoot = e;
  }
  Nl.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = so();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < Lt.length && t !== 0 && t < Lt[n].priority; n++);
      Lt.splice(n, 0, e), n === 0 && fo(e);
    }
  };
  function Eu(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function Al(e) {
    return !(
      !e ||
      (e.nodeType !== 1 &&
        e.nodeType !== 9 &&
        e.nodeType !== 11 &&
        (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
    );
  }
  function Ra() {}
  function _f(e, t, n, r, l) {
    if (l) {
      if (typeof r == "function") {
        var i = r;
        r = function () {
          var m = Cl(u);
          i.call(m);
        };
      }
      var u = Ca(t, r, e, 0, null, !1, !1, "", Ra);
      return (
        (e._reactRootContainer = u),
        (e[wt] = u.current),
        er(e.nodeType === 8 ? e.parentNode : e),
        rn(),
        u
      );
    }
    for (; (l = e.lastChild); ) e.removeChild(l);
    if (typeof r == "function") {
      var o = r;
      r = function () {
        var m = Cl(s);
        o.call(m);
      };
    }
    var s = xu(e, 0, !1, null, null, !1, !1, "", Ra);
    return (
      (e._reactRootContainer = s),
      (e[wt] = s.current),
      er(e.nodeType === 8 ? e.parentNode : e),
      rn(function () {
        El(t, s, n, r);
      }),
      s
    );
  }
  function Rl(e, t, n, r, l) {
    var i = n._reactRootContainer;
    if (i) {
      var u = i;
      if (typeof l == "function") {
        var o = l;
        l = function () {
          var s = Cl(u);
          o.call(s);
        };
      }
      El(t, u, e, l);
    } else u = _f(n, t, e, l, r);
    return Cl(u);
  }
  (uo = function (e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var n = Dn(t.pendingLanes);
          n !== 0 &&
            (Gl(t, n | 1), Me(t, ce()), !(V & 6) && ((Ln = ce() + 500), _t()));
        }
        break;
      case 13:
        rn(function () {
          var r = Et(e, 1);
          if (r !== null) {
            var l = Ie();
            st(r, e, 1, l);
          }
        }),
          ku(e, 1);
    }
  }),
    (Zl = function (e) {
      if (e.tag === 13) {
        var t = Et(e, 134217728);
        if (t !== null) {
          var n = Ie();
          st(t, e, 134217728, n);
        }
        ku(e, 134217728);
      }
    }),
    (oo = function (e) {
      if (e.tag === 13) {
        var t = Ht(e),
          n = Et(e, t);
        if (n !== null) {
          var r = Ie();
          st(n, e, t, r);
        }
        ku(e, t);
      }
    }),
    (so = function () {
      return X;
    }),
    (ao = function (e, t) {
      var n = X;
      try {
        return (X = e), t();
      } finally {
        X = n;
      }
    }),
    (Ql = function (e, t, n) {
      switch (t) {
        case "input":
          if ((zl(e, n), (t = n.name), n.type === "radio" && t != null)) {
            for (n = e; n.parentNode; ) n = n.parentNode;
            for (
              n = n.querySelectorAll(
                "input[name=" + JSON.stringify("" + t) + '][type="radio"]',
              ),
                t = 0;
              t < n.length;
              t++
            ) {
              var r = n[t];
              if (r !== e && r.form === e.form) {
                var l = Wr(r);
                if (!l) throw Error(d(90));
                Fu(r), zl(r, l);
              }
            }
          }
          break;
        case "textarea":
          Uu(e, n);
          break;
        case "select":
          (t = n.value), t != null && sn(e, !!n.multiple, t, !1);
      }
    }),
    (Gu = mu),
    (Zu = rn);
  var Uf = { usingClientEntryPoint: !1, Events: [rr, yn, Wr, Ku, Xu, mu] },
    gr = {
      findFiberByHostInstance: qt,
      bundleType: 0,
      version: "18.3.1",
      rendererPackageName: "react-dom",
    },
    Df = {
      bundleType: gr.bundleType,
      version: gr.version,
      rendererPackageName: gr.rendererPackageName,
      rendererConfig: gr.rendererConfig,
      overrideHookState: null,
      overrideHookStateDeletePath: null,
      overrideHookStateRenamePath: null,
      overrideProps: null,
      overridePropsDeletePath: null,
      overridePropsRenamePath: null,
      setErrorHandler: null,
      setSuspenseHandler: null,
      scheduleUpdate: null,
      currentDispatcherRef: Se.ReactCurrentDispatcher,
      findHostInstanceByFiber: function (e) {
        return (e = $u(e)), e === null ? null : e.stateNode;
      },
      findFiberByHostInstance: gr.findFiberByHostInstance,
      findHostInstancesForRefresh: null,
      scheduleRefresh: null,
      scheduleRoot: null,
      setRefreshHandler: null,
      getCurrentFiber: null,
      reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
    };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Pl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Pl.isDisabled && Pl.supportsFiber)
      try {
        (Nr = Pl.inject(Df)), (dt = Pl);
      } catch {}
  }
  return (
    (_e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Uf),
    (_e.createPortal = function (e, t) {
      var n =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!Eu(t)) throw Error(d(200));
      return Mf(e, t, null, n);
    }),
    (_e.createRoot = function (e, t) {
      if (!Eu(e)) throw Error(d(299));
      var n = !1,
        r = "",
        l = Aa;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (n = !0),
          t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
          t.onRecoverableError !== void 0 && (l = t.onRecoverableError)),
        (t = xu(e, 1, !1, null, null, n, !1, r, l)),
        (e[wt] = t.current),
        er(e.nodeType === 8 ? e.parentNode : e),
        new Su(t)
      );
    }),
    (_e.findDOMNode = function (e) {
      if (e == null) return null;
      if (e.nodeType === 1) return e;
      var t = e._reactInternals;
      if (t === void 0)
        throw typeof e.render == "function"
          ? Error(d(188))
          : ((e = Object.keys(e).join(",")), Error(d(268, e)));
      return (e = $u(t)), (e = e === null ? null : e.stateNode), e;
    }),
    (_e.flushSync = function (e) {
      return rn(e);
    }),
    (_e.hydrate = function (e, t, n) {
      if (!Al(t)) throw Error(d(200));
      return Rl(null, e, t, !0, n);
    }),
    (_e.hydrateRoot = function (e, t, n) {
      if (!Eu(e)) throw Error(d(405));
      var r = (n != null && n.hydratedSources) || null,
        l = !1,
        i = "",
        u = Aa;
      if (
        (n != null &&
          (n.unstable_strictMode === !0 && (l = !0),
          n.identifierPrefix !== void 0 && (i = n.identifierPrefix),
          n.onRecoverableError !== void 0 && (u = n.onRecoverableError)),
        (t = Ca(t, null, e, 1, n ?? null, l, !1, i, u)),
        (e[wt] = t.current),
        er(e),
        r)
      )
        for (e = 0; e < r.length; e++)
          (n = r[e]),
            (l = n._getVersion),
            (l = l(n._source)),
            t.mutableSourceEagerHydrationData == null
              ? (t.mutableSourceEagerHydrationData = [n, l])
              : t.mutableSourceEagerHydrationData.push(n, l);
      return new Nl(t);
    }),
    (_e.render = function (e, t, n) {
      if (!Al(t)) throw Error(d(200));
      return Rl(null, e, t, !1, n);
    }),
    (_e.unmountComponentAtNode = function (e) {
      if (!Al(e)) throw Error(d(40));
      return e._reactRootContainer
        ? (rn(function () {
            Rl(null, null, e, !1, function () {
              (e._reactRootContainer = null), (e[wt] = null);
            });
          }),
          !0)
        : !1;
    }),
    (_e.unstable_batchedUpdates = mu),
    (_e.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
      if (!Al(n)) throw Error(d(200));
      if (e == null || e._reactInternals === void 0) throw Error(d(38));
      return Rl(e, t, n, !1, r);
    }),
    (_e.version = "18.3.1-next-f1338f8080-20240426"),
    _e
  );
}
var Ta;
function Zf() {
  if (Ta) return Au.exports;
  Ta = 1;
  function h() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(h);
      } catch (k) {
        console.error(k);
      }
  }
  return h(), (Au.exports = Gf()), Au.exports;
}
var Ma;
function qf() {
  if (Ma) return Il;
  Ma = 1;
  var h = Zf();
  return (Il.createRoot = h.createRoot), (Il.hydrateRoot = h.hydrateRoot), Il;
}
var Yf = qf();
function Jf({ title: h, titleId: k, ...d }, N) {
  return P.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: N,
        "aria-labelledby": k,
      },
      d,
    ),
    h ? P.createElement("title", { id: k }, h) : null,
    P.createElement("path", {
      fillRule: "evenodd",
      d: "M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z",
      clipRule: "evenodd",
    }),
  );
}
const $f = P.forwardRef(Jf);
function bf({ title: h, titleId: k, ...d }, N) {
  return P.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: N,
        "aria-labelledby": k,
      },
      d,
    ),
    h ? P.createElement("title", { id: k }, h) : null,
    P.createElement("path", {
      d: "M15.5 2A1.5 1.5 0 0 0 14 3.5v13a1.5 1.5 0 0 0 1.5 1.5h1a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 16.5 2h-1ZM9.5 6A1.5 1.5 0 0 0 8 7.5v9A1.5 1.5 0 0 0 9.5 18h1a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 10.5 6h-1ZM3.5 10A1.5 1.5 0 0 0 2 11.5v5A1.5 1.5 0 0 0 3.5 18h1A1.5 1.5 0 0 0 6 16.5v-5A1.5 1.5 0 0 0 4.5 10h-1Z",
    }),
  );
}
const ed = P.forwardRef(bf);
function td({ title: h, titleId: k, ...d }, N) {
  return P.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: N,
        "aria-labelledby": k,
      },
      d,
    ),
    h ? P.createElement("title", { id: k }, h) : null,
    P.createElement("path", {
      d: "M1 12.5A4.5 4.5 0 0 0 5.5 17H15a4 4 0 0 0 1.866-7.539 3.504 3.504 0 0 0-4.504-4.272A4.5 4.5 0 0 0 4.06 8.235 4.502 4.502 0 0 0 1 12.5Z",
    }),
  );
}
const _a = P.forwardRef(td);
function nd({ title: h, titleId: k, ...d }, N) {
  return P.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: N,
        "aria-labelledby": k,
      },
      d,
    ),
    h ? P.createElement("title", { id: k }, h) : null,
    P.createElement("path", {
      d: "M13.024 9.25c.47 0 .827-.433.637-.863a4 4 0 0 0-4.094-2.364c-.468.05-.665.576-.43.984l1.08 1.868a.75.75 0 0 0 .649.375h2.158ZM7.84 7.758c-.236-.408-.79-.5-1.068-.12A3.982 3.982 0 0 0 6 10c0 .884.287 1.7.772 2.363.278.38.832.287 1.068-.12l1.078-1.868a.75.75 0 0 0 0-.75L7.839 7.758ZM9.138 12.993c-.235.408-.039.934.43.984a4 4 0 0 0 4.094-2.364c.19-.43-.168-.863-.638-.863h-2.158a.75.75 0 0 0-.65.375l-1.078 1.868Z",
    }),
    P.createElement("path", {
      fillRule: "evenodd",
      d: "m14.13 4.347.644-1.117a.75.75 0 0 0-1.299-.75l-.644 1.116a6.954 6.954 0 0 0-2.081-.556V1.75a.75.75 0 0 0-1.5 0v1.29a6.954 6.954 0 0 0-2.081.556L6.525 2.48a.75.75 0 1 0-1.3.75l.645 1.117A7.04 7.04 0 0 0 4.347 5.87L3.23 5.225a.75.75 0 1 0-.75 1.3l1.116.644A6.954 6.954 0 0 0 3.04 9.25H1.75a.75.75 0 0 0 0 1.5h1.29c.078.733.27 1.433.556 2.081l-1.116.645a.75.75 0 1 0 .75 1.298l1.117-.644a7.04 7.04 0 0 0 1.523 1.523l-.645 1.117a.75.75 0 1 0 1.3.75l.644-1.116a6.954 6.954 0 0 0 2.081.556v1.29a.75.75 0 0 0 1.5 0v-1.29a6.954 6.954 0 0 0 2.081-.556l.645 1.116a.75.75 0 0 0 1.299-.75l-.645-1.117a7.042 7.042 0 0 0 1.523-1.523l1.117.644a.75.75 0 0 0 .75-1.298l-1.116-.645a6.954 6.954 0 0 0 .556-2.081h1.29a.75.75 0 0 0 0-1.5h-1.29a6.954 6.954 0 0 0-.556-2.081l1.116-.644a.75.75 0 0 0-.75-1.3l-1.117.645a7.04 7.04 0 0 0-1.524-1.523ZM10 4.5a5.475 5.475 0 0 0-2.781.754A5.527 5.527 0 0 0 5.22 7.277 5.475 5.475 0 0 0 4.5 10a5.475 5.475 0 0 0 .752 2.777 5.527 5.527 0 0 0 2.028 2.004c.802.458 1.73.719 2.72.719a5.474 5.474 0 0 0 2.78-.753 5.527 5.527 0 0 0 2.001-2.027c.458-.802.719-1.73.719-2.72a5.475 5.475 0 0 0-.753-2.78 5.528 5.528 0 0 0-2.028-2.002A5.475 5.475 0 0 0 10 4.5Z",
      clipRule: "evenodd",
    }),
  );
}
const rd = P.forwardRef(nd);
function ld({ title: h, titleId: k, ...d }, N) {
  return P.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: N,
        "aria-labelledby": k,
      },
      d,
    ),
    h ? P.createElement("title", { id: k }, h) : null,
    P.createElement("path", {
      fillRule: "evenodd",
      d: "M3.25 3A2.25 2.25 0 0 0 1 5.25v9.5A2.25 2.25 0 0 0 3.25 17h13.5A2.25 2.25 0 0 0 19 14.75v-9.5A2.25 2.25 0 0 0 16.75 3H3.25Zm.943 8.752a.75.75 0 0 1 .055-1.06L6.128 9l-1.88-1.693a.75.75 0 1 1 1.004-1.114l2.5 2.25a.75.75 0 0 1 0 1.114l-2.5 2.25a.75.75 0 0 1-1.06-.055ZM9.75 10.25a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5h-2.5Z",
      clipRule: "evenodd",
    }),
  );
}
const id = P.forwardRef(ld);
function ud({ title: h, titleId: k, ...d }, N) {
  return P.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: N,
        "aria-labelledby": k,
      },
      d,
    ),
    h ? P.createElement("title", { id: k }, h) : null,
    P.createElement("path", { d: "M14 6H6v8h8V6Z" }),
    P.createElement("path", {
      fillRule: "evenodd",
      d: "M9.25 3V1.75a.75.75 0 0 1 1.5 0V3h1.5V1.75a.75.75 0 0 1 1.5 0V3h.5A2.75 2.75 0 0 1 17 5.75v.5h1.25a.75.75 0 0 1 0 1.5H17v1.5h1.25a.75.75 0 0 1 0 1.5H17v1.5h1.25a.75.75 0 0 1 0 1.5H17v.5A2.75 2.75 0 0 1 14.25 17h-.5v1.25a.75.75 0 0 1-1.5 0V17h-1.5v1.25a.75.75 0 0 1-1.5 0V17h-1.5v1.25a.75.75 0 0 1-1.5 0V17h-.5A2.75 2.75 0 0 1 3 14.25v-.5H1.75a.75.75 0 0 1 0-1.5H3v-1.5H1.75a.75.75 0 0 1 0-1.5H3v-1.5H1.75a.75.75 0 0 1 0-1.5H3v-.5A2.75 2.75 0 0 1 5.75 3h.5V1.75a.75.75 0 0 1 1.5 0V3h1.5ZM4.5 5.75c0-.69.56-1.25 1.25-1.25h8.5c.69 0 1.25.56 1.25 1.25v8.5c0 .69-.56 1.25-1.25 1.25h-8.5c-.69 0-1.25-.56-1.25-1.25v-8.5Z",
      clipRule: "evenodd",
    }),
  );
}
const od = P.forwardRef(ud);
function sd({ title: h, titleId: k, ...d }, N) {
  return P.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: N,
        "aria-labelledby": k,
      },
      d,
    ),
    h ? P.createElement("title", { id: k }, h) : null,
    P.createElement("path", {
      fillRule: "evenodd",
      d: "M9.638 1.093a.75.75 0 0 1 .724 0l2 1.104a.75.75 0 1 1-.724 1.313L10 2.607l-1.638.903a.75.75 0 1 1-.724-1.313l2-1.104ZM5.403 4.287a.75.75 0 0 1-.295 1.019l-.805.444.805.444a.75.75 0 0 1-.724 1.314L3.5 7.02v.73a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 1 .388-.657l1.996-1.1a.75.75 0 0 1 1.019.294Zm9.194 0a.75.75 0 0 1 1.02-.295l1.995 1.101A.75.75 0 0 1 18 5.75v2a.75.75 0 0 1-1.5 0v-.73l-.884.488a.75.75 0 1 1-.724-1.314l.806-.444-.806-.444a.75.75 0 0 1-.295-1.02ZM7.343 8.284a.75.75 0 0 1 1.02-.294L10 8.893l1.638-.903a.75.75 0 1 1 .724 1.313l-1.612.89v1.557a.75.75 0 0 1-1.5 0v-1.557l-1.612-.89a.75.75 0 0 1-.295-1.019ZM2.75 11.5a.75.75 0 0 1 .75.75v1.557l1.608.887a.75.75 0 0 1-.724 1.314l-1.996-1.101A.75.75 0 0 1 2 14.25v-2a.75.75 0 0 1 .75-.75Zm14.5 0a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-.388.657l-1.996 1.1a.75.75 0 1 1-.724-1.313l1.608-.887V12.25a.75.75 0 0 1 .75-.75Zm-7.25 4a.75.75 0 0 1 .75.75v.73l.888-.49a.75.75 0 0 1 .724 1.313l-2 1.104a.75.75 0 0 1-.724 0l-2-1.104a.75.75 0 1 1 .724-1.313l.888.49v-.73a.75.75 0 0 1 .75-.75Z",
      clipRule: "evenodd",
    }),
  );
}
const ad = P.forwardRef(sd);
function cd({ title: h, titleId: k, ...d }, N) {
  return P.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: N,
        "aria-labelledby": k,
      },
      d,
    ),
    h ? P.createElement("title", { id: k }, h) : null,
    P.createElement("path", {
      fillRule: "evenodd",
      d: "M10 2.5c-1.31 0-2.526.386-3.546 1.051a.75.75 0 0 1-.82-1.256A8 8 0 0 1 18 9a22.47 22.47 0 0 1-1.228 7.351.75.75 0 1 1-1.417-.49A20.97 20.97 0 0 0 16.5 9 6.5 6.5 0 0 0 10 2.5ZM4.333 4.416a.75.75 0 0 1 .218 1.038A6.466 6.466 0 0 0 3.5 9a7.966 7.966 0 0 1-1.293 4.362.75.75 0 0 1-1.257-.819A6.466 6.466 0 0 0 2 9c0-1.61.476-3.11 1.295-4.365a.75.75 0 0 1 1.038-.219ZM10 6.12a3 3 0 0 0-3.001 3.041 11.455 11.455 0 0 1-2.697 7.24.75.75 0 0 1-1.148-.965A9.957 9.957 0 0 0 5.5 9c0-.028.002-.055.004-.082a4.5 4.5 0 0 1 8.996.084V9.15l-.005.297a.75.75 0 1 1-1.5-.034c.003-.11.004-.219.005-.328a3 3 0 0 0-3-2.965Zm0 2.13a.75.75 0 0 1 .75.75c0 3.51-1.187 6.745-3.181 9.323a.75.75 0 1 1-1.186-.918A13.687 13.687 0 0 0 9.25 9a.75.75 0 0 1 .75-.75Zm3.529 3.698a.75.75 0 0 1 .584.885 18.883 18.883 0 0 1-2.257 5.84.75.75 0 1 1-1.29-.764 17.386 17.386 0 0 0 2.078-5.377.75.75 0 0 1 .885-.584Z",
      clipRule: "evenodd",
    }),
  );
}
const fd = P.forwardRef(cd);
function dd({ title: h, titleId: k, ...d }, N) {
  return P.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: N,
        "aria-labelledby": k,
      },
      d,
    ),
    h ? P.createElement("title", { id: k }, h) : null,
    P.createElement("path", {
      d: "M10 1a6 6 0 0 0-3.815 10.631C7.237 12.5 8 13.443 8 14.456v.644a.75.75 0 0 0 .572.729 6.016 6.016 0 0 0 2.856 0A.75.75 0 0 0 12 15.1v-.644c0-1.013.762-1.957 1.815-2.825A6 6 0 0 0 10 1ZM8.863 17.414a.75.75 0 0 0-.226 1.483 9.066 9.066 0 0 0 2.726 0 .75.75 0 0 0-.226-1.483 7.553 7.553 0 0 1-2.274 0Z",
    }),
  );
}
const pd = P.forwardRef(dd);
function md({ title: h, titleId: k, ...d }, N) {
  return P.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: N,
        "aria-labelledby": k,
      },
      d,
    ),
    h ? P.createElement("title", { id: k }, h) : null,
    P.createElement("path", {
      d: "M4.632 3.533A2 2 0 0 1 6.577 2h6.846a2 2 0 0 1 1.945 1.533l1.976 8.234A3.489 3.489 0 0 0 16 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234Z",
    }),
    P.createElement("path", {
      fillRule: "evenodd",
      d: "M4 13a2 2 0 1 0 0 4h12a2 2 0 1 0 0-4H4Zm11.24 2a.75.75 0 0 1 .75-.75H16a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75h-.01a.75.75 0 0 1-.75-.75V15Zm-2.25-.75a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 0 0 .75-.75V15a.75.75 0 0 0-.75-.75h-.01Z",
      clipRule: "evenodd",
    }),
  );
}
const hd = P.forwardRef(md);
function vd({ title: h, titleId: k, ...d }, N) {
  return P.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: N,
        "aria-labelledby": k,
      },
      d,
    ),
    h ? P.createElement("title", { id: k }, h) : null,
    P.createElement("path", {
      fillRule: "evenodd",
      d: "M9.661 2.237a.531.531 0 0 1 .678 0 11.947 11.947 0 0 0 7.078 2.749.5.5 0 0 1 .479.425c.069.52.104 1.05.104 1.59 0 5.162-3.26 9.563-7.834 11.256a.48.48 0 0 1-.332 0C5.26 16.564 2 12.163 2 7c0-.538.035-1.069.104-1.589a.5.5 0 0 1 .48-.425 11.947 11.947 0 0 0 7.077-2.75Zm4.196 5.954a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
      clipRule: "evenodd",
    }),
  );
}
const Wa = P.forwardRef(vd);
function gd({ title: h, titleId: k, ...d }, N) {
  return P.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: N,
        "aria-labelledby": k,
      },
      d,
    ),
    h ? P.createElement("title", { id: k }, h) : null,
    P.createElement("path", {
      d: "M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM1.49 15.326a.78.78 0 0 1-.358-.442 3 3 0 0 1 4.308-3.516 6.484 6.484 0 0 0-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 0 1-2.07-.655ZM16.44 15.98a4.97 4.97 0 0 0 2.07-.654.78.78 0 0 0 .357-.442 3 3 0 0 0-4.308-3.517 6.484 6.484 0 0 1 1.907 3.96 2.32 2.32 0 0 1-.026.654ZM18 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM5.304 16.19a.844.844 0 0 1-.277-.71 5 5 0 0 1 9.947 0 .843.843 0 0 1-.277.71A6.975 6.975 0 0 1 10 18a6.974 6.974 0 0 1-4.696-1.81Z",
    }),
  );
}
const yd = P.forwardRef(gd);
function wd({ title: h, titleId: k, ...d }, N) {
  return P.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: N,
        "aria-labelledby": k,
      },
      d,
    ),
    h ? P.createElement("title", { id: k }, h) : null,
    P.createElement("path", {
      d: "M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z",
    }),
  );
}
const xd = P.forwardRef(wd),
  kd = "/assets/middleware-tuXj9BdP.svg";
function Sd() {
  const [h, k] = P.useState(!1),
    [d, N] = P.useState(!1);
  P.useEffect(() => {
    const G = () => {
      k(window.pageYOffset > 0);
    };
    return (
      window.addEventListener("scroll", G),
      () => window.removeEventListener("scroll", G)
    );
  }, []);
  const O = () => {
      N(!d);
    },
    Q = () => {
      N(!1);
    },
    q = ["Home", "Services", "About", "Contact"];
  return v.jsxs("nav", {
    className: `fixed w-full z-50 transition-all duration-300 ${h ? "bg-white shadow-lg" : "bg-transparent"}`,
    children: [
      v.jsx("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: v.jsxs("div", {
          className: "flex justify-between h-16",
          children: [
            v.jsx("div", {
              className: "flex-shrink-0 flex items-center",
              children: v.jsx("img", {
                className: "h-8 w-auto",
                src: kd,
                alt: "Middleware",
              }),
            }),
            v.jsx("div", {
              className: "hidden sm:ml-6 sm:flex sm:space-x-8",
              children: q.map((G) =>
                v.jsx(
                  "a",
                  {
                    href: "#",
                    className: `${h ? "text-gray-900" : "text-white"} hover:text-gray-500 px-3 py-4 rounded-md text-sm font-medium`,
                    children: G,
                  },
                  G,
                ),
              ),
            }),
            v.jsx("div", {
              className: "sm:hidden flex items-center",
              children: v.jsxs("button", {
                type: "button",
                className:
                  "inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500",
                onClick: O,
                children: [
                  v.jsx("span", {
                    className: "sr-only",
                    children: "Open main menu",
                  }),
                  d
                    ? v.jsx(xd, {
                        className: "block h-6 w-6",
                        "aria-hidden": "true",
                      })
                    : v.jsx($f, {
                        className: "block h-6 w-6",
                        "aria-hidden": "true",
                      }),
                ],
              }),
            }),
          ],
        }),
      }),
      v.jsx("div", {
        className: `sm:hidden ${d ? "block" : "hidden"}`,
        children: v.jsx("div", {
          className: "px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg",
          children: q.map((G) =>
            v.jsx(
              "a",
              {
                href: "#",
                className:
                  "text-gray-900 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium",
                onClick: Q,
                children: G,
              },
              G,
            ),
          ),
        }),
      }),
    ],
  });
}
const Ua = ["Secure", "Efficient", "Scalable"];
function Ed() {
  const [h, k] = P.useState(0),
    [d, N] = P.useState(0);
  return (
    P.useEffect(() => {
      const O = setInterval(() => {
          k((q) => (q + 1) % Ua.length);
        }, 2e3),
        Q = () => N(window.pageYOffset);
      return (
        window.addEventListener("scroll", Q),
        () => {
          clearInterval(O), window.removeEventListener("scroll", Q);
        }
      );
    }, []),
    v.jsxs("div", {
      className:
        "relative h-screen flex items-center justify-center overflow-hidden",
      children: [
        v.jsx("div", {
          className: "absolute w-full h-full bg-cover bg-center",
          style: {
            backgroundImage:
              "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')",
            transform: `translateY(${d * 0.5}px)`,
          },
        }),
        v.jsx("div", {
          className: "absolute inset-0 bg-gray-900 bg-opacity-50",
        }),
        v.jsxs("div", {
          className: "relative z-10 text-center text-white",
          children: [
            v.jsx("h1", {
              className: "text-4xl sm:text-5xl md:text-6xl font-bold mb-4",
              children: "Empowering Your Business with",
            }),
            v.jsxs("h2", {
              className: "text-3xl sm:text-4xl md:text-5xl font-semibold",
              children: [
                v.jsx("span", {
                  className:
                    "inline-block min-w-[200px] transition-all duration-500 ease-in-out transform",
                  children: Ua[h],
                }),
                "Solutions",
              ],
            }),
          ],
        }),
      ],
    })
  );
}
function Cd() {
  return v.jsx("footer", {
    className: "bg-gray-800 text-white",
    children: v.jsxs("div", {
      className: "max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8",
      children: [
        v.jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-4 gap-8",
          children: [
            v.jsxs("div", {
              children: [
                v.jsx("h3", {
                  className: "text-lg font-semibold mb-4",
                  children: "About Us",
                }),
                v.jsx("p", {
                  className: "text-gray-400",
                  children:
                    "Middleware is a leading IT consulting firm providing innovative solutions for businesses worldwide.",
                }),
              ],
            }),
            v.jsxs("div", {
              children: [
                v.jsx("h3", {
                  className: "text-lg font-semibold mb-4",
                  children: "Services",
                }),
                v.jsxs("ul", {
                  className: "text-gray-400",
                  children: [
                    v.jsx("li", { className: "mb-2", children: "Salesforce" }),
                    v.jsx("li", { className: "mb-2", children: "Azure Cloud" }),
                    v.jsx("li", {
                      className: "mb-2",
                      children: "Cybersecurity",
                    }),
                    v.jsx("li", {
                      className: "mb-2",
                      children: "Full Stack Development",
                    }),
                  ],
                }),
              ],
            }),
            v.jsxs("div", {
              children: [
                v.jsx("h3", {
                  className: "text-lg font-semibold mb-4",
                  children: "Contact",
                }),
                v.jsxs("ul", {
                  className: "text-gray-400",
                  children: [
                    v.jsx("li", {
                      className: "mb-2",
                      children: "200, Brook Drive, Green Park, ",
                    }),
                    v.jsx("li", {
                      className: "mb-2",
                      children: "Reading, RG2 6UB, UK",
                    }),
                    v.jsx("li", {
                      className: "mb-2",
                      children: "Phone: (123) 456-7890",
                    }),
                    v.jsx("li", {
                      className: "mb-2",
                      children: "Email: info@middleware.com",
                    }),
                  ],
                }),
              ],
            }),
            v.jsxs("div", {
              children: [
                v.jsx("h3", {
                  className: "text-lg font-semibold mb-4",
                  children: "Follow Us",
                }),
                v.jsxs("div", {
                  className: "flex space-x-4",
                  children: [
                    v.jsxs("a", {
                      href: "#",
                      className: "text-gray-400 hover:text-white",
                      children: [
                        v.jsx("span", {
                          className: "sr-only",
                          children: "Facebook",
                        }),
                        v.jsx("svg", {
                          className: "h-6 w-6",
                          fill: "currentColor",
                          viewBox: "0 0 24 24",
                          "aria-hidden": "true",
                          children: v.jsx("path", {
                            fillRule: "evenodd",
                            d: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
                            clipRule: "evenodd",
                          }),
                        }),
                      ],
                    }),
                    v.jsxs("a", {
                      href: "#",
                      className: "text-gray-400 hover:text-white",
                      children: [
                        v.jsx("span", {
                          className: "sr-only",
                          children: "Twitter",
                        }),
                        v.jsx("svg", {
                          className: "h-6 w-6",
                          fill: "currentColor",
                          viewBox: "0 0 24 24",
                          "aria-hidden": "true",
                          children: v.jsx("path", {
                            d: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84",
                          }),
                        }),
                      ],
                    }),
                    v.jsxs("a", {
                      href: "#",
                      className: "text-gray-400 hover:text-white",
                      children: [
                        v.jsx("span", {
                          className: "sr-only",
                          children: "LinkedIn",
                        }),
                        v.jsx("svg", {
                          className: "h-6 w-6",
                          fill: "currentColor",
                          viewBox: "0 0 24 24",
                          "aria-hidden": "true",
                          children: v.jsx("path", {
                            fillRule: "evenodd",
                            d: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
                            clipRule: "evenodd",
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        v.jsx("div", {
          className: "mt-8 border-t border-gray-700 pt-8 text-center",
          children: v.jsx("p", {
            className: "text-gray-400",
            children: "© 2023 Middleware. All rights reserved.",
          }),
        }),
      ],
    }),
  });
}
var Iu = { exports: {} },
  ju,
  Da;
function Nd() {
  if (Da) return ju;
  Da = 1;
  var h = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return (ju = h), ju;
}
var Lu, Qa;
function Ad() {
  if (Qa) return Lu;
  Qa = 1;
  var h = Nd();
  function k() {}
  function d() {}
  return (
    (d.resetWarningCache = k),
    (Lu = function () {
      function N(q, G, Z, ke, ye, ee) {
        if (ee !== h) {
          var Y = new Error(
            "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types",
          );
          throw ((Y.name = "Invariant Violation"), Y);
        }
      }
      N.isRequired = N;
      function O() {
        return N;
      }
      var Q = {
        array: N,
        bigint: N,
        bool: N,
        func: N,
        number: N,
        object: N,
        string: N,
        symbol: N,
        any: N,
        arrayOf: O,
        element: N,
        elementType: N,
        instanceOf: O,
        node: N,
        objectOf: O,
        oneOf: O,
        oneOfType: O,
        shape: O,
        exact: O,
        checkPropTypes: d,
        resetWarningCache: k,
      };
      return (Q.PropTypes = Q), Q;
    }),
    Lu
  );
}
var Va;
function Rd() {
  return Va || ((Va = 1), (Iu.exports = Ad()())), Iu.exports;
}
var Pd = Rd();
const Ba = Vf(Pd),
  jl = ({ end: h, duration: k }) => {
    const [d, N] = P.useState(0);
    return (
      P.useEffect(() => {
        let O = 0;
        const Q = h / (k / 16),
          q = setInterval(() => {
            (O += Q), N(Math.floor(O)), O >= h && (clearInterval(q), N(h));
          }, 16);
        return () => clearInterval(q);
      }, [h, k]),
      v.jsx("span", { children: d })
    );
  };
jl.propTypes = { end: Ba.number.isRequired, duration: Ba.number.isRequired };
function Id() {
  return v.jsx("section", {
    className: "py-16 bg-white",
    children: v.jsxs("div", {
      className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
      children: [
        v.jsx("h2", {
          className: "text-3xl font-extrabold text-gray-900 text-center mb-8",
          children: "Who We Are",
        }),
        v.jsx("p", {
          className: "text-xl text-gray-600 text-center mb-12",
          children:
            "Middleware is a leading IT consulting firm dedicated to providing innovative solutions that drive business growth and digital transformation.",
        }),
        v.jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-3 gap-8 text-center",
          children: [
            v.jsxs("div", {
              children: [
                v.jsxs("p", {
                  className: "text-4xl font-bold text-indigo-600",
                  children: [v.jsx(jl, { end: 5, duration: 2e3 }), "+"],
                }),
                v.jsx("p", {
                  className: "mt-2 text-lg font-medium text-gray-700",
                  children: "Global Locations",
                }),
              ],
            }),
            v.jsxs("div", {
              children: [
                v.jsxs("p", {
                  className: "text-4xl font-bold text-indigo-600",
                  children: [v.jsx(jl, { end: 50, duration: 2e3 }), "+"],
                }),
                v.jsx("p", {
                  className: "mt-2 text-lg font-medium text-gray-700",
                  children: "Certified Industry Experts",
                }),
              ],
            }),
            v.jsxs("div", {
              children: [
                v.jsxs("p", {
                  className: "text-4xl font-bold text-indigo-600",
                  children: [v.jsx(jl, { end: 30, duration: 2e3 }), "+"],
                }),
                v.jsx("p", {
                  className: "mt-2 text-lg font-medium text-gray-700",
                  children:
                    "Microsoft Azure's Developer and Admin Certifications",
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
}
const jd = [
  {
    icon: _a,
    name: "Salesforce",
    description:
      "Leverage the power of Salesforce to streamline your business processes and enhance customer relationships.",
  },
  {
    icon: rd,
    name: "Azure Cloud Developer and Admin (AI)",
    description:
      "Harness the potential of Azure cloud and AI technologies to drive innovation and efficiency in your organization.",
  },
  {
    icon: hd,
    name: "Splunk",
    description:
      "Gain valuable insights from your data with Splunk's powerful analytics and monitoring capabilities.",
  },
  {
    icon: id,
    name: "Integration",
    description:
      "Seamlessly connect your systems and applications to improve workflow and data consistency across your enterprise.",
  },
  {
    icon: Wa,
    name: "Cybersecurity",
    description:
      "Protect your digital assets with our comprehensive cybersecurity solutions and best practices.",
  },
  {
    icon: od,
    name: "Full Stack Development",
    description:
      "Build robust, scalable applications with our expert full stack development services.",
  },
  {
    icon: _a,
    name: "Cloud Technologies (GCP, Azure, AWS)",
    description:
      "Leverage the power of leading cloud platforms to enhance your infrastructure and application deployment.",
  },
  {
    icon: fd,
    name: "Identity Access Management",
    description:
      "Secure your organization with advanced identity and access management solutions using Sailpoint IIQ and ForgeRock.",
  },
];
function Ld() {
  return v.jsx("section", {
    className: "py-16 bg-gray-50",
    children: v.jsxs("div", {
      className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
      children: [
        v.jsx("h2", {
          className: "text-3xl font-extrabold text-gray-900 text-center mb-8",
          children: "Services Offered",
        }),
        v.jsx("div", {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8",
          children: jd.map((h, k) =>
            v.jsxs(
              "div",
              {
                className:
                  "bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center text-center transform transition duration-500 hover:scale-105",
                children: [
                  v.jsx(h.icon, {
                    className: "h-12 w-12 text-indigo-600 mb-4",
                  }),
                  v.jsx("h3", {
                    className: "text-lg font-semibold text-gray-900 mb-2",
                    children: h.name,
                  }),
                  v.jsx("p", {
                    className: "text-gray-600 text-sm",
                    children: h.description,
                  }),
                ],
              },
              k,
            ),
          ),
        }),
      ],
    }),
  });
}
const zd =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA4QAAAH0BAMAAACX3f7gAAAAGFBMVEWAs9nf6/Wy0OgZdbo+i8Vdnc4AZrP////2J/5cAAAKyUlEQVR4XuzRsQ3CMBAAQDcZwDS06Fd4iQUwfQp7gkjuqVgfJkCUBt2tcOX54/jXQoUoRCEKFaIQhShUiEIUolAhClGIQoUoRCEKFaIQhShUiEIUolAhClGIQoUoRCEKFaIQhShUiEIUolAhClGIQoUoRCEKFaIQhShUiEIUolAhClGIQoUoRCEKFaIQhShUiEIUolAhClGIQoUoRCEKFaIQhQpRiEIUKkQhClGoEIUoRKFCFKIQhQpRiEIUKkQhClGoEIUoRKFCFKIQhQpRiEIUKkQhClGoEIUoRKFCFKIQhQpRiEIUKkQhClGoEIUoRKFCFKIQhQpRiEIUKkQhClGoEIUoRKFCFKIQhQpRiEIUKkQhClGoEIUoRKFCFKIQhQpRiEIU1ohSxuitZc63IzNvrbW9RD0rXNvpsvWcH2UbJVaMVPiIrV/nt477HlXhQl7snU930zoQxUVp420pEG9ToPYWCtjb0ibONlDqbJM4mWwt59/Xf+etuuAIotwZaR7n3Q+Q4+gnjefOyNLV4Cf5qxma6/8RalB38UAnq7k7S//zCNuhlxIvAG+GLL/ulr15IFRfJicsxm7oKUGEG/JS7oWwR5K/frg6Jx4tJ7knwi35aQYg5B3l5uClwnMkvRbgoCJGfT3zQtgnP80FERaCk6kjPy18FmBBzGp+eJiNmvw0BRDyjvJaNNqUR8+NlySh5uiVaMlTqRzCreRkyshPyZHjd05SWr44DmHr+7uCpqIPTCb2aHMcwZuCBPX1qMRmD7wiuBHWgpPJSmRtlxXJqvkukGqP5RBaycnUAlkbEENh3bOn2pTLIWzxfMOtPXvWNigohD6mzKl2A1RnmI19Imrs/zhwjxRIM2ZjvwAQMo9yGtPY31A4feRNtUsAIe8oryIae/uSQur2twgrwC0hCPFRnscz9l1FYfWd09gLdiq2kqlxxpi1XRIuvpWzA9wSN8K+ZGpc82VtHyi8lnzGfo4gZB3lJpaxP6cY+sRm7KdyCK1kPGiJqYJuHymOci5jn8ohbCXjwZ4pa+tqiqSZeI0bR7iB44G8se8qiqYpy7DRQhBhJpnNFMThOduC4mnGY+zHgggLwXjQoVkbThBXwmLsczmEnWQ82HJM1Y6fIP6XLVDjhhDio1yK7g/KFRKkhsPYLzCEnKOchDP2eCbTfB6Onibm7N2/Mk8PQEKDTs4SQ8g5ymlgY2/rU/GNft2ibQePXJG0BtwSN0ISbFO0+FTt0UkaubahXT3wRFKgxg0hxEd5EdjYv6dTdHfN2/RP4Mk5AxEyGvsyrLF/Sydo9QyQqU5QwsZ+zoZQv7HH7cSPw59kC9hWZEBGhCDEHWqTBjX2NXlrecwka4G5hdS4cYT4KM+CGvvX5K1VKpJnoZNzeZBDuAPWibSxb/k2DqJpUo5uXhNE2Jes1dbQVLUVUJFmfh1Owck5FkTYE8xmLDZV3/NGUShIj0FjnwsiBDwuv7EHw+jSRRBfhmu0xi2HsJU0qBvIQPdgA87YJp2jxh6UYRvltaixhxIGom8HuVbmAqs6lYIIM0mDWiBTtSLpmX4+PF732ORMeBEiAzUxHrpAjP0bIgKKDrzCjb0cQkuKNIUW4TQgwQ4IENwId6RIKfImXIlzA55uLoiwT3q0hIqjiSAxvMYtiLBHerRAPOFMlhlo7FNBhAUJCjD2mepFaIH4wo2wJUXKHZYt+psQ37wmiHBDetQATSbZdBTfvCaIMCM9mgGOAo9UkU52xBFWpEdrwOp8CouwwGrcOEL9xj4DHKW48Bo3jlC/sS80OQo8g1izINRv7FeAKRyHRZhFMDxGv7GnOZCPpmERVhEez0Qw9sBKqnXHUQt4Vm6EnU5jb4EFrNHYz7kR6jf2O6C4ptHYT3kQ6jf2wMw6KDf2gggrnTXunm5LcYhSOTL6jX1y+syaH1Qb+wU3Qv3G3gL0NRr7UhDh67/E2Ke6jX3OjVC/sd9501dt7JsDi4x+Y4+di6V98xouo9/YQ/1UzZvX1oIIt0o3r2W6a9z9OMmW0W7sF9Bed92b1wQR1qRHJVT80F/jxmXUG3sAoe6O/VwQYUuKhEQH3cZ+Kohwr+h2kRliV5XXuAUR9hTdLjLXjRC/vQiXgZ9lHK6jlml+F3ax6g4GfpZcNvGOW4OUv70Il0GfpQnYUetr84Uq5pdBY90sYEdtr646gx9yjMugz7KW7ahhuZBiYz8TRGg1XYKeB72EZWA8lGBd8rUgwlbRJegNWDbKBbcQ5uAhx4II94ovQS8kP2vqCsATAMU/foQ9xZeg9wQPnLE1tMCLaBsKDGjsy6BlxD3JLcOX0NTt4mVaBjT2iah3StECfJPLEGxSdHIKItzKlSHxaGOBY0g5CdI32NgLIuyrvgS9J3MYcFejbqUCfoAbYS0Y0ndwdWUrciT3ZYE6Ahtxb53BnmUc+K40S/xXG9gb8tQtPDlLQYStZEjvAcYe2KTc/PhtSaYCDokGJqcYwg0wyFLnyOL7I5dnzhj6yHLfXS/iDmkDZVYz0WymhE8+f1Zz9+LXtWMHD+SvW6CHxqfcibBQtOkiYf5iZ2TevXrmdzX4yXYDc0vB5QyknaRB7XOUEW1BkD5/GT49mYvhqT+zTFV8175yItwqalOsNJ6I0+Q6tr8vnAj7kgaVp4xoC/2XoMurdCKsxdsUuOd8Q/H0XcsRL4kLoSVFbYpc3yGN90CexqvUhbAN0KbAo3Qbj6CW1/PSae03ktlMxVZGfE9RdAvkacxaOBFmgm0Ky1hGrCmCPiq6lGXtRFgpalMkwDYXCd1rCuxTF8JOsk2x5/ympY2Wi6ow9pS6EO5CtSnw8utbCqplAvwzfjXOTkU/WJsCj9KXBIi3bRw+qs+cCGtFbYrpQQ3D5gz4ZyKaOxFSwGwGNyxtoNn/NQcaMDIauxC2QdsUePm1qwgQ0PKPXnfPXQg3YbMZvPxqH0lakxRowMhlMy6EmWSbohApv34gUd3lQMlCTisnwkqwTdEJ7Q/qHgUBXgMveUnNXQi7GG0K3LBc1sFWoJazW0sXwl2cNgVuWC75V+JykgMveWklLoR90U0XQKgIDbFxRFAtxp4OLoS9eG0K/MOfq3Ni0ugshV7y8lo5EVLMTRf4N7D2opLjp6rGvXAhbCXbFJsg38C+Gvw8Paw1I3OdAsfNIIIMlwlj7LNQH/7YwXlF/hqZa+BI9cBKnKvQeInrOBD3gSAAxosHOlLN5+HEsfqOkwmv1IHwL5O9emeeHgpyqvkympxdv/qnfTooARgGgig6BCogDspqiYSukJ5qv1RCr+F9B8NjNpiaZ+vuOavOHH2tr+5Oxqj68zuEQiiECIVQCIUQoRAKoRAiFEIhFEKEQiiEQohQCIVQCBEKoRAKIUIhFEIhRCiEQiiECIVQCIUQoRAKoRAiFEIhFEKEQiiEQohQCIVQCBEKoRAKIUIhFEIFAEIhFEKEQiiEQohQCIVQCBEKoRAKIUIhFEIhRCiEQiiECIVQCIUQoRAKoRAiFEIhFEKEQiiEQohQCIVQCBEKoRAKIUIhFEIhRCiEQiiECIVQCIUQoRAKoRAiFEIhFEKEQiiEQohQCIVQCBEKoRAKIUIhFEIhRCiEQiiECIVQCIUQoRAKoRAiFEIhFEKEQiiEQohQCIVQCBEKoRAKIUIhFEIhRCiEQiiECIVQCIUQoRAKoV4NQ5LFm466UgAAAABJRU5ErkJggg==",
  Fd =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAAAgCAMAAAAfbBf3AAAAeFBMVEX////bABEAAADYAADZAAD++fncGh/bAAuSkpLvsLHrl5ni4uLMzMwkJCTDw8PxurtmZmba2tpubm5dXV1KSkrohIbqkJHvrK2ysrJ3d3cSEhKhoaHp6ekJCQnup6jpi40bGxssLCx/f384ODiJiYlCQkLnfH7toKF01Ux7AAACoUlEQVRIibXX63aiMBAA4BjEpYIgYNsAqUvVLu//hjuTG5OA/GnM6fGEi/k6wyRBxvxWHZPdRks+ruwV7S1hnxvw/oPB3yvYfQofGyw7JMcXsDtwn8Iq1MOf6BGjh+4TeP+XKXe3jxux0pS7Cpswwd1FTbW2tLtSXDa76O4iptqEaNwFrJNs3Xiptpm1bpDqOUDtxkq1U5zrReyida4fsWjOtep0zVkdt6fx+5ZDb+i67tbdBqlvrJtTP7blgiUugQnrXC/ijPNCdUbOGUu/uW4wfmu6fMDLN3PQhix1HUzZ2aWwc0/oNpw/IGbOe+WWRQnXuVS39SIvT+a/oI+SuuyqS/ydrbok1b7L8YOxH7TOuv/gXLBU66zm/B6wvqsi9qL13DnihVvb28HFEQe8Qag8IFzXi8L1XIAD1nNdxOCKHJq0eeZtmVpXpmnxxX/U+cKNEyxNgcuuAeu7dn5lfG5weNHFU2rXlRWczt0407ZbhfM0cP9Z9wtbbx5t0diyBfdyuUCB35Qr54GmrTxXSbhA+Hl+d3kmz1e1GueMsHUFN2TYr8lI0/O6qpLFykRdV+meK4VQBwMG2ei6kljCmZk/uq4A3j9xq8Sr2tCdJ5jn5pBa42boKgndnJODIGLqVuZ0Mq26ZF77eYZFK5NSqOmENVwU4qSmECwi90KWIz6AACZu5U7SiJ1LlxN/naxtaQs9p+al8WIOzvaL03JfqMhjJ7DbF+gqFuwL8nHv+/sDi3dosHWDKSjRjv14LudvTuE+WHllPqfauP7i+Yt29ff9Ktj3XcRm34/F2oiNG7JwYSJuRNZErN0l6yJGNyqrYeWusRbG99i4rILRXWdNccF7e2wWYXCfsTriQxKfRXiDVfvtC6LF9nbd/h16jPTi/B/3iiTbFQxULAAAAABJRU5ErkJggg==",
  Od =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAAB3CAMAAAAO5y+4AAAAn1BMVEX///8jHyAAAAD6/fwAVCisxLoATRoAWzMAUiMAWTCGrZ1qmITH2tMAViu4z8fr6+vP39oZFBXm7+xZj3pIhWwAYjxskn/29vbV1dXe6eUASA3x9/W/vr6Dg4QPBwm0tLWlpaV5eXpISEk3NTaRkZJVU1ReXl/g4OAqJyh7o5MmdVfGx8hvb3CZmps/PkBlZmibuq4ARAA6fGASaUhYhW59I9obAAAElElEQVRoge2XaZOiOhSGQ9gRZBcRASGgstmM9P//bfck2D01zthVt27D1K3K+8GkE5InZ8nSCHFxcXFxcXFxcXFxcXFx/UtFx/yvcO2UpIX9F7jHa4bLbnVuHmVuWvaXlU2282Pp4lNRVOty8xy7goD37n5V7AWspdxTVV5WxIqnCuNCELJ0wG8rgqOhJnZEualwWg8Lfq6O6JgJuOqFU7QmGFQLAqnKa7EcN9off0/bE6RVUVz7xajIHvaX7vTUmJOre07P7nW5I2u4wPkw/AK2qxtspKKvs7Nt28scWnbVYyHDOEdinsIBlXd5VZ9TAulM6ptbnvsiXeL0uLxBJEmNcVm/nfbdKe3fiiIlcGyAboKLsYuvC2xiuxSu1eWc97fKtrshLVIg32YsVX9BUZ0t4Oqzm9E7vi66vHAzUFmX109skecn+Kb8fvAeroAjurjVQDKGIj+pggB1kqPotgC4u2ak69yPmP4iN+vzksDiSP39B8ieZHWHy2esC9Qa9q+NIZ+H6/dfxVGKyQU/sFlGr0BAZiWpj6w/fYO1Fel3G3ypSJbbj6BmVX++EUJK2LQfoH22yPU/kMFGw+xmt4SGKLJ/sS2qz0twu3OE8gELFIz/aFmOj0uAYeKO4Ky4wlPuj93pbVgEG1WEdPaQkRdmDf1C78rCtdG+Fl4ew/uF3tFpSbMnW/PxyNTTd8VFKNbm1ix+HV75n8CInFg5LHHffcW9PvZJveA77k9coZ4ra3u6w7OhcEOkq4Lr+m0Gk/Oq4H2+/6isvom5/reK5ZiVpuzNDaIzjqaIkCwn9E9HdjxZlreeyHofnVRbaH4MhvqjcODXg995WkeWxRdc+cc8xFccVnp3BdQ6aHcY6SruB9PUJEXRAliXGEDfj828vkA6HA6aweqKErOPpRA4ptLAtDA6DpXtK3tlbeZuVMZNNKsxTUPV4sRqEzpHgEzd346+pXloI0HnODtG9EPHc+4HChx1dcOWEqoNjNENtFVk5Kmq+dLPT9xGGlmr5LOqGFgOMiVq1Gj5KAi9z4HAhXUZBxiWtEGjMHfcAygf3GRSX1r7zBXbkAVEvOtiok/JKIEdM1dsdTRKreH85JqOHPrw/VYbTWVkXFPxP7h36wvsEzcJg7nZlzwkW8E0eR9cyIAEGZMW3uMPrm5pE/Xku5qgFqIiBi3yNZNxrUk3vsA+c6d2njSQwIm+GtLOBzewRJqr7+qUfNprBmCUo/pJYkgy48ZS4KjM3uArNz/H911jqRCHd/h1wkD85G6t+zxiI20fXOB7kFCNGk5TCJ6iXNTom5Bxva/jK40eCLgmFIkJnhNFZ45NHPr0E9NqPE+eLBM1ToI8XzIfXA+JMvSFrdw0cqCbjOtN4WwviqfwNVi2wjBUfbTRobRGZFhW21p6Q/scnUXbpF2aOiJHsdpgkvw5FL4a+HdL9UaFhWGrbRgXEp/G9wBuNMPXFm93VA4aWQlZ5Gx2u2bed/HOoH52aI9Bd1DcQG2cB4oGa07EZscSLdrtYoMuFxpk5LxToslm5OLi4uLi4uLi4uLi4uLi4uL6j/oHdbtndAZVpOoAAAAASUVORK5CYII=",
  Td =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAAA8CAMAAABreNUXAAAAxlBMVEX6+vr///8ARXwAQ3sAMXL8+/0APngAOHUAQHkAOnYAL3EANnQAPHfi5eoATIIASoHy8/T3+fUALHDb3+XT3OR9wBPn8dzQ5rat1X2DwibZ6sbv9ebGzdjc5OsAJ22uwtMAIGuLxjm/3Z3J4qvi7tIAG2m83JSZzVO8y9gmWoqbsMWuv9al02em0m5oiKrQ2Ozt7vp1lbQ+aZfP4sW22Ylbf6PF1deaqsWGnr/X7bRPdqF2jKrl6+OazFuIpL0/dJ0AEGUABGPYw8YhAAAE+ElEQVRYhe2XfXeiOBSH8wIIBjSxvAgBUWEQaGUHV6c7dkpnv/+X2htfOtN2e0Z3j/6x29/xCIabPLnJvbmI0Ic+9KH/kXQdIbz7vi5W5sgpsYiuC9blwvOr0e2dF1wPrIPQciYb9lvh5btfV8H6a1+u/c9tLIpIn2cim4urcNfefO7d3U5Xv3uLaBb6s1l+DY/1aOz749xtUjEO0DoTxVX81eWyEONCbBpeLMV8KbO7a7ir67m38GcLyYwvj2E+ho+XXT60dCH1KNLzCLmp7mdIBkIGUpfismDI29BXbnpRO70vvHUUjqPwzg9nlwXr4m4mx6GEvP1jevvVy/Kw8MOlnD1eOLRgJ2GZo0DPM+Hef5ZzITKJMh9fFqtOjdnMD8Po0Qu2n+7XXhF4RebdXTyidTnP5LwQwVqmD24+zvN15K8DdGGwHi0jfxnJ5VyM56J50IuxyMYyW/oXDuhCLes68B79cPFtMvwG8b0I88dL1yVdZlIEOdrncJniPEN+IPzo0gksQpXA/t0uh7tJ/dUrIIcv/uIB3JmEHF6G/lpx7w/ci0sXyM+kzHyR5bxORRAgyOarFIalF+yjq55WUbjwvdmFg/kADpZ+tMwhm5JNLccZFMUrUBVY6LosCtk+8PkY7sWlD42f0Pls9m1qfVl4//pFFmOMuPr6myfJ2+YgEmmqR5k49v1pnLOKRPzERn1tVb55kKxG2qf69VhQmPDx/4JDKsqPD8q2rTk6VbgxDcO2qWl0rwh8axNjAlxwO9nb4uTlwE6fjo4tNx1w05M9bhkxt11bUWqVLzvdWMRoXI54upruxuN1xZKXXI30D1wcu0+D5PXc31VSUWMDu1sODHaPD17trvhGI5oD3rrUZIqL04k5SF7YHLlYmaVdm77ZlfcU96itjHG73XYwBOZuHMdqdKdkREsSnpRDYtWJw5PaIoMycaDXs82e64IQquu6PXl/Y0aMjZo+BwHWaQZMs6oO8U1FCa0qt6qIunZ1BQ0EbjBqKqbZqxqsFRfHw6HVQl/XPT2sksokht3UrqNWCCdDyxxWpslWSaURQrSpO+3B1Zo8dBMLbtikQSsGNoY56vZcPjDtp7Nfs+qRQYnRI6uOwyY1FoWlTC3aq93bHmFxzON6SOwuvknizibDNE5Sg1Zu0lFaJcDVeGuYVfJr0CvhuAEfKTF71MXugBo1LHprm6udM0gFzID09nHVoyqungy7RVwFZAomVs0o9Dyfi+EPwGbAKLE3vCR0CNmEawucuVFctW3Dl1xIuWqz2Q5hTYBLYKonZ88PJRCK6oArYbShU1I6iIGbmnTgvsPlI0JMxphlaR1wzZVprk6Pp6MaSqpdRLU2HSjuL/3lQ2o+1V0HaVMCl5U2YSen7bM6CKFSpdFWTVttmhqjMcwtfstlRK3zyjRa6AFcZxfPMOPq7A2G2dJVndYbQnodwhtwtMQpJVp35CIINqvDHOFSIzZMoOspTg054O64iUns5myHWwhHq2eZprWBXeKVTVkfzrANeubCUhBr+gDFkkH+fqqdyqAa2LD2cG50FumfXhAO4h3tsx4bVfsalmxGrKdp6sC7+T76UzXhdMTYBLi47TM2rbFbqR5ggx0w4XDYTCaDszMYiluZlvxYszEvU/dQGQ5tu6bd8e+kZaLaHWhA+Nnk3Ir/A43f/XVoenXzD0Ef+tCH/gP6CyWFgIsDqeR3AAAAAElFTkSuQmCC",
  Md =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAAAhCAMAAADUMMRSAAAAllBMVEX////iGTZtbnDsgIrlR1lmZ2rhACxgYWNqa21yc3XhACjhCi+1tbbgAB7sgorgABHjLEDp6emZmpvvnaTgABeIiYpZWl3419nti5Lysrbth5DlR1XfAAD1xcjmTl/64uT3zdD+9/fz8/Pa2tvoXmvxqKzJysrpa3frd4LkNUmQkZLBwcKkpKZ8fX9RU1Wsra7ulJv87e5y1UrcAAAC00lEQVRIie2V2ZaiMBRFEwIBAwEVxFkKR9C21f//ub4ZhJRlQdVqytUPfR5MDrm5O7MIDU0d16hR6+NweGoO+ap6nqG0hTtIPefSDddyQBZIlK1c1+qKGwidASvKy+u4UiPPSlVt4/VqnWEYp8o5G80dqcZNp1zXsjzHUYvv7sWOau/21HyDwIWTAFFux1zveBEKPMvZoz3ge3IvgoHkesMR6CxGNeiWCzQpR3PvHun5ytov7ye4Ykoj7zlXnavA+Qlu6oIc5/fgxdyNEiR+Idc7rrUU1xtq+8NcuCFaZ+DWPj11z4W91FXLqeTCDNdubYGbOq7muk7699wTPJFGPaguLIArG2zQ+iJ+hTbtj+p//QuahA8i4fJJ2JKERWb4KfhbQ9prGBaNXMzooxa7j2Exp9HY8DNOF9nHsEpzRheN3D7G2AdhXFfoEy7D3OROKG7k2j6OWrkHUAllH8oVgPkXuJxPm9J+hdsX5ZJjJjOVmlvMba3DTXPzlbDzEFpDOx9naFzala5yONpsbSy5B+3LJSpsM99HLkxYcOPEv4v1FTfbMuk5nJgxCmGd3+ogP4nhNGkfLVdyvjvt+bZqEvnKz7kZ7ythivEiF1waYvDyICB0YywBLsdYRkGQv5V9MQV70Ou8Y8rP84zd80EIyz+fb6UtZMjr/c2Z5E4YVlwmD3/G79wkM/YXuOzxckBMAze/zqR2aEbfcZGaL5xnk4uiOzdC77n8Tfp7vikqaBP3mlCWJElUovB73MUjV71CE51v1cKFvOUujuNpR1xS5Wvj+geV4bvrnH/C9fW72Trf/lwKAr7DFedf6XG+dT7BxZRiyU1oIrk2o5F8fymTotQX96h6n33ZYcZ9cX8jymP5deEz4BJuPvPAhV6aa+SjHLgzQmaiYVyQQh69KyGwIjdiqMjREprVDREfxP8Rgf+jDL6qvAUhYgCx2QvJXmq0D/n+AN5NWYMue09oAAAAAElFTkSuQmCC",
  _d = "/assets/wipro-DKd7cNUa.png",
  Ha = [
    { src: zd, alt: "HCL" },
    { src: Fd, alt: "HSBC" },
    { src: Od, alt: "Lloyds Bank" },
    { src: Td, alt: "Softtek" },
    { src: Md, alt: "Tech Mahindra" },
    { src: _d, alt: "Wipro" },
  ];
function Ud() {
  const h = P.useRef(null);
  return (
    P.useEffect(() => {
      const k = h.current;
      if (k) {
        let d,
          N = 0;
        const O = () => {
          (N += 1),
            N >= k.scrollWidth / 2 && (N = 0),
            (k.scrollLeft = N),
            (d = requestAnimationFrame(O));
        };
        return (
          (d = requestAnimationFrame(O)),
          () => {
            d && cancelAnimationFrame(d);
          }
        );
      }
    }, []),
    v.jsx("section", {
      className: "py-16 bg-white",
      children: v.jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [
          v.jsx("h2", {
            className: "text-3xl font-extrabold text-gray-900 text-center mb-8",
            children: "Our Partnerships",
          }),
          v.jsx("div", {
            className: "relative overflow-hidden",
            style: { maxWidth: "100%" },
            children: v.jsx("div", {
              ref: h,
              className: "flex overflow-x-hidden whitespace-nowrap",
              children: v.jsxs("div", {
                className: "flex items-center space-x-8",
                children: [
                  Ha.map((k, d) =>
                    v.jsx(
                      "div",
                      {
                        className: "flex-shrink-0",
                        children: v.jsx("img", {
                          src: k.src,
                          alt: k.alt,
                          className: "h-20 w-40 object-contain",
                        }),
                      },
                      d,
                    ),
                  ),
                  Ha.map((k, d) =>
                    v.jsx(
                      "div",
                      {
                        className: "flex-shrink-0",
                        children: v.jsx("img", {
                          src: k.src,
                          alt: k.alt,
                          className: "h-20 w-40 object-contain",
                        }),
                      },
                      `clone-${d}`,
                    ),
                  ),
                ],
              }),
            }),
          }),
        ],
      }),
    })
  );
}
const Dd = [
  {
    icon: pd,
    title: "Innovative Solutions",
    description:
      "We deliver cutting-edge technologies tailored to your business needs.",
  },
  {
    icon: Wa,
    title: "Robust Security",
    description:
      "Our solutions prioritize data protection and compliance with industry standards.",
  },
  {
    icon: ed,
    title: "Proven Track Record",
    description:
      "We have a history of successful implementations across various industries.",
  },
  {
    icon: ad,
    title: "Scalable Architecture",
    description:
      "Our solutions grow with your business, ensuring long-term success.",
  },
  {
    icon: yd,
    title: "Expert Team",
    description:
      "Our certified professionals bring years of experience to every project.",
  },
];
function Qd() {
  return v.jsx("section", {
    className: "py-16 bg-gray-50",
    children: v.jsxs("div", {
      className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
      children: [
        v.jsx("h2", {
          className: "text-3xl font-extrabold text-gray-900 text-center mb-8",
          children: "Why Choose Us",
        }),
        v.jsx("div", {
          className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
          children: Dd.map((h, k) =>
            v.jsxs(
              "div",
              {
                className: "bg-white rounded-lg shadow-md p-6",
                children: [
                  v.jsx(h.icon, {
                    className: "h-12 w-12 text-indigo-600 mb-4",
                  }),
                  v.jsx("h3", {
                    className: "text-xl font-semibold text-gray-900 mb-2",
                    children: h.title,
                  }),
                  v.jsx("p", {
                    className: "text-gray-600",
                    children: h.description,
                  }),
                ],
              },
              k,
            ),
          ),
        }),
      ],
    }),
  });
}
function Vd() {
  return v.jsxs("div", {
    className: "min-h-screen bg-gray-100",
    children: [
      v.jsx(Sd, {}),
      v.jsx(Ed, {}),
      v.jsx(Id, {}),
      v.jsx(Ld, {}),
      v.jsx(Ud, {}),
      v.jsx(Qd, {}),
      v.jsx(Cd, {}),
    ],
  });
}
Yf.createRoot(document.getElementById("root")).render(v.jsx(Vd, {}));
