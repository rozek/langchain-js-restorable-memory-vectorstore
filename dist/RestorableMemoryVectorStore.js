const ka = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i;
function dt(a) {
  return typeof a == "string" && ka.test(a);
}
var z = [];
for (var pr = 0; pr < 256; ++pr)
  z.push((pr + 256).toString(16).slice(1));
function xa(a, e = 0) {
  return (z[a[e + 0]] + z[a[e + 1]] + z[a[e + 2]] + z[a[e + 3]] + "-" + z[a[e + 4]] + z[a[e + 5]] + "-" + z[a[e + 6]] + z[a[e + 7]] + "-" + z[a[e + 8]] + z[a[e + 9]] + "-" + z[a[e + 10]] + z[a[e + 11]] + z[a[e + 12]] + z[a[e + 13]] + z[a[e + 14]] + z[a[e + 15]]).toLowerCase();
}
var Lt, Aa = new Uint8Array(16);
function Ia() {
  if (!Lt && (Lt = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !Lt))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return Lt(Aa);
}
var Pa = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
const nn = {
  randomUUID: Pa
};
function W(a, e, t) {
  if (nn.randomUUID && !a)
    return nn.randomUUID();
  a = a || {};
  var r = a.random || (a.rng || Ia)();
  return r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, xa(r);
}
function ur(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var mr, an;
function Ca() {
  return an || (an = 1, mr = function(a, e) {
    if (typeof a != "string")
      throw new TypeError("Expected a string");
    return e = typeof e > "u" ? "_" : e, a.replace(/([a-z\d])([A-Z])/g, "$1" + e + "$2").replace(/([A-Z]+)([A-Z][a-z\d]+)/g, "$1" + e + "$2").toLowerCase();
  }), mr;
}
var Ra = /* @__PURE__ */ Ca();
const ja = /* @__PURE__ */ ur(Ra);
function Na(a, e) {
  return e?.[a] || ja(a);
}
function $a(a, e, t) {
  const r = {};
  for (const n in a)
    Object.hasOwn(a, n) && (r[e(n, t)] = a[n]);
  return r;
}
function sn(a) {
  return Array.isArray(a) ? [...a] : { ...a };
}
function Ma(a, e) {
  const t = sn(a);
  for (const [r, n] of Object.entries(e)) {
    const [i, ...s] = r.split(".").reverse();
    let o = t;
    for (const u of s.reverse()) {
      if (o[u] === void 0)
        break;
      o[u] = sn(o[u]), o = o[u];
    }
    o[i] !== void 0 && (o[i] = {
      lc: 1,
      type: "secret",
      id: [n]
    });
  }
  return t;
}
function Gn(a) {
  const e = Object.getPrototypeOf(a);
  return typeof a.lc_name == "function" && (typeof e.lc_name != "function" || a.lc_name() !== e.lc_name()) ? a.lc_name() : a.name;
}
class He {
  /**
   * The name of the serializable. Override to provide an alias or
   * to preserve the serialized module name in minified environments.
   *
   * Implemented as a static method to support loading logic.
   */
  static lc_name() {
    return this.name;
  }
  /**
   * The final serialized identifier for the module.
   */
  get lc_id() {
    return [
      ...this.lc_namespace,
      Gn(this.constructor)
    ];
  }
  /**
   * A map of secrets, which will be omitted from serialization.
   * Keys are paths to the secret in constructor args, e.g. "foo.bar.baz".
   * Values are the secret ids, which will be used when deserializing.
   */
  get lc_secrets() {
  }
  /**
   * A map of additional attributes to merge with constructor args.
   * Keys are the attribute names, e.g. "foo".
   * Values are the attribute values, which will be serialized.
   * These attributes need to be accepted by the constructor as arguments.
   */
  get lc_attributes() {
  }
  /**
   * A map of aliases for constructor args.
   * Keys are the attribute names, e.g. "foo".
   * Values are the alias that will replace the key in serialization.
   * This is used to eg. make argument names match Python.
   */
  get lc_aliases() {
  }
  /**
   * A manual list of keys that should be serialized.
   * If not overridden, all fields passed into the constructor will be serialized.
   */
  get lc_serializable_keys() {
  }
  constructor(e, ...t) {
    Object.defineProperty(this, "lc_serializable", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: !1
    }), Object.defineProperty(this, "lc_kwargs", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.lc_serializable_keys !== void 0 ? this.lc_kwargs = Object.fromEntries(Object.entries(e || {}).filter(([r]) => this.lc_serializable_keys?.includes(r))) : this.lc_kwargs = e ?? {};
  }
  toJSON() {
    if (!this.lc_serializable)
      return this.toJSONNotImplemented();
    if (
      // eslint-disable-next-line no-instanceof/no-instanceof
      this.lc_kwargs instanceof He || typeof this.lc_kwargs != "object" || Array.isArray(this.lc_kwargs)
    )
      return this.toJSONNotImplemented();
    const e = {}, t = {}, r = Object.keys(this.lc_kwargs).reduce((n, i) => (n[i] = i in this ? this[i] : this.lc_kwargs[i], n), {});
    for (let n = Object.getPrototypeOf(this); n; n = Object.getPrototypeOf(n))
      Object.assign(e, Reflect.get(n, "lc_aliases", this)), Object.assign(t, Reflect.get(n, "lc_secrets", this)), Object.assign(r, Reflect.get(n, "lc_attributes", this));
    return Object.keys(t).forEach((n) => {
      let i = this, s = r;
      const [o, ...u] = n.split(".").reverse();
      for (const c of u.reverse()) {
        if (!(c in i) || i[c] === void 0)
          return;
        (!(c in s) || s[c] === void 0) && (typeof i[c] == "object" && i[c] != null ? s[c] = {} : Array.isArray(i[c]) && (s[c] = [])), i = i[c], s = s[c];
      }
      o in i && i[o] !== void 0 && (s[o] = s[o] || i[o]);
    }), {
      lc: 1,
      type: "constructor",
      id: this.lc_id,
      kwargs: $a(Object.keys(t).length ? Ma(r, t) : r, Na, e)
    };
  }
  toJSONNotImplemented() {
    return {
      lc: 1,
      type: "not_implemented",
      id: this.lc_id
    };
  }
}
function La(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var Jn = { exports: {} }, F = Jn.exports = {}, fe, pe;
function Lr() {
  throw new Error("setTimeout has not been defined");
}
function Dr() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    typeof setTimeout == "function" ? fe = setTimeout : fe = Lr;
  } catch {
    fe = Lr;
  }
  try {
    typeof clearTimeout == "function" ? pe = clearTimeout : pe = Dr;
  } catch {
    pe = Dr;
  }
})();
function Wn(a) {
  if (fe === setTimeout)
    return setTimeout(a, 0);
  if ((fe === Lr || !fe) && setTimeout)
    return fe = setTimeout, setTimeout(a, 0);
  try {
    return fe(a, 0);
  } catch {
    try {
      return fe.call(null, a, 0);
    } catch {
      return fe.call(this, a, 0);
    }
  }
}
function Da(a) {
  if (pe === clearTimeout)
    return clearTimeout(a);
  if ((pe === Dr || !pe) && clearTimeout)
    return pe = clearTimeout, clearTimeout(a);
  try {
    return pe(a);
  } catch {
    try {
      return pe.call(null, a);
    } catch {
      return pe.call(this, a);
    }
  }
}
var we = [], Qe = !1, Le, Ht = -1;
function Ua() {
  !Qe || !Le || (Qe = !1, Le.length ? we = Le.concat(we) : Ht = -1, we.length && Kn());
}
function Kn() {
  if (!Qe) {
    var a = Wn(Ua);
    Qe = !0;
    for (var e = we.length; e; ) {
      for (Le = we, we = []; ++Ht < e; )
        Le && Le[Ht].run();
      Ht = -1, e = we.length;
    }
    Le = null, Qe = !1, Da(a);
  }
}
F.nextTick = function(a) {
  var e = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var t = 1; t < arguments.length; t++)
      e[t - 1] = arguments[t];
  we.push(new Qn(a, e)), we.length === 1 && !Qe && Wn(Kn);
};
function Qn(a, e) {
  this.fun = a, this.array = e;
}
Qn.prototype.run = function() {
  this.fun.apply(null, this.array);
};
F.title = "browser";
F.browser = !0;
F.env = {};
F.argv = [];
F.version = "";
F.versions = {};
function Se() {
}
F.on = Se;
F.addListener = Se;
F.once = Se;
F.off = Se;
F.removeListener = Se;
F.removeAllListeners = Se;
F.emit = Se;
F.prependListener = Se;
F.prependOnceListener = Se;
F.listeners = function(a) {
  return [];
};
F.binding = function(a) {
  throw new Error("process.binding is not supported");
};
F.cwd = function() {
  return "/";
};
F.chdir = function(a) {
  throw new Error("process.chdir is not supported");
};
F.umask = function() {
  return 0;
};
var Fa = Jn.exports;
const ve = /* @__PURE__ */ La(Fa);
var Za = {};
const Ba = () => typeof window < "u" && typeof window.document < "u", Ha = () => typeof globalThis == "object" && globalThis.constructor && globalThis.constructor.name === "DedicatedWorkerGlobalScope", za = () => typeof window < "u" && window.name === "nodejs" || typeof navigator < "u" && (navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom")), Kr = () => typeof Deno < "u", qa = () => typeof ve < "u" && typeof Za < "u" && !0 && !Kr(), Va = () => {
  let a;
  return Ba() ? a = "browser" : qa() ? a = "node" : Ha() ? a = "webworker" : za() ? a = "jsdom" : Kr() ? a = "deno" : a = "other", a;
};
let gr;
async function Ga() {
  return gr === void 0 && (gr = {
    library: "langchain-js",
    runtime: Va()
  }), gr;
}
function Pe(a) {
  try {
    return typeof ve < "u" ? ve.env?.[a] : Kr() ? Deno?.env.get(a) : void 0;
  } catch {
    return;
  }
}
class Ja {
}
class Rt extends Ja {
  get lc_namespace() {
    return ["langchain_core", "callbacks", this.name];
  }
  get lc_secrets() {
  }
  get lc_attributes() {
  }
  get lc_aliases() {
  }
  get lc_serializable_keys() {
  }
  /**
   * The name of the serializable. Override to provide an alias or
   * to preserve the serialized module name in minified environments.
   *
   * Implemented as a static method to support loading logic.
   */
  static lc_name() {
    return this.name;
  }
  /**
   * The final serialized identifier for the module.
   */
  get lc_id() {
    return [
      ...this.lc_namespace,
      Gn(this.constructor)
    ];
  }
  constructor(e) {
    super(), Object.defineProperty(this, "lc_serializable", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: !1
    }), Object.defineProperty(this, "lc_kwargs", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "ignoreLLM", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: !1
    }), Object.defineProperty(this, "ignoreChain", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: !1
    }), Object.defineProperty(this, "ignoreAgent", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: !1
    }), Object.defineProperty(this, "ignoreRetriever", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: !1
    }), Object.defineProperty(this, "ignoreCustomEvent", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: !1
    }), Object.defineProperty(this, "raiseError", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: !1
    }), Object.defineProperty(this, "awaitHandlers", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: Pe("LANGCHAIN_CALLBACKS_BACKGROUND") === "false"
    }), this.lc_kwargs = e || {}, e && (this.ignoreLLM = e.ignoreLLM ?? this.ignoreLLM, this.ignoreChain = e.ignoreChain ?? this.ignoreChain, this.ignoreAgent = e.ignoreAgent ?? this.ignoreAgent, this.ignoreRetriever = e.ignoreRetriever ?? this.ignoreRetriever, this.ignoreCustomEvent = e.ignoreCustomEvent ?? this.ignoreCustomEvent, this.raiseError = e.raiseError ?? this.raiseError, this.awaitHandlers = this.raiseError || (e._awaitHandler ?? this.awaitHandlers));
  }
  copy() {
    return new this.constructor(this);
  }
  toJSON() {
    return He.prototype.toJSON.call(this);
  }
  toJSONNotImplemented() {
    return He.prototype.toJSONNotImplemented.call(this);
  }
  static fromMethods(e) {
    class t extends Rt {
      constructor() {
        super(), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: W()
        }), Object.assign(this, e);
      }
    }
    return new t();
  }
}
const Wa = (a) => {
  const e = a;
  return e !== void 0 && typeof e.copy == "function" && typeof e.name == "string" && typeof e.awaitHandlers == "boolean";
};
var yr = { exports: {} }, on;
function Ka() {
  return on || (on = 1, function(a) {
    const t = (i = 0) => (s) => `\x1B[${38 + i};5;${s}m`, r = (i = 0) => (s, o, u) => `\x1B[${38 + i};2;${s};${o};${u}m`;
    function n() {
      const i = /* @__PURE__ */ new Map(), s = {
        modifier: {
          reset: [0, 0],
          // 21 isn't widely supported and 22 does the same thing
          bold: [1, 22],
          dim: [2, 22],
          italic: [3, 23],
          underline: [4, 24],
          overline: [53, 55],
          inverse: [7, 27],
          hidden: [8, 28],
          strikethrough: [9, 29]
        },
        color: {
          black: [30, 39],
          red: [31, 39],
          green: [32, 39],
          yellow: [33, 39],
          blue: [34, 39],
          magenta: [35, 39],
          cyan: [36, 39],
          white: [37, 39],
          // Bright color
          blackBright: [90, 39],
          redBright: [91, 39],
          greenBright: [92, 39],
          yellowBright: [93, 39],
          blueBright: [94, 39],
          magentaBright: [95, 39],
          cyanBright: [96, 39],
          whiteBright: [97, 39]
        },
        bgColor: {
          bgBlack: [40, 49],
          bgRed: [41, 49],
          bgGreen: [42, 49],
          bgYellow: [43, 49],
          bgBlue: [44, 49],
          bgMagenta: [45, 49],
          bgCyan: [46, 49],
          bgWhite: [47, 49],
          // Bright color
          bgBlackBright: [100, 49],
          bgRedBright: [101, 49],
          bgGreenBright: [102, 49],
          bgYellowBright: [103, 49],
          bgBlueBright: [104, 49],
          bgMagentaBright: [105, 49],
          bgCyanBright: [106, 49],
          bgWhiteBright: [107, 49]
        }
      };
      s.color.gray = s.color.blackBright, s.bgColor.bgGray = s.bgColor.bgBlackBright, s.color.grey = s.color.blackBright, s.bgColor.bgGrey = s.bgColor.bgBlackBright;
      for (const [o, u] of Object.entries(s)) {
        for (const [c, l] of Object.entries(u))
          s[c] = {
            open: `\x1B[${l[0]}m`,
            close: `\x1B[${l[1]}m`
          }, u[c] = s[c], i.set(l[0], l[1]);
        Object.defineProperty(s, o, {
          value: u,
          enumerable: !1
        });
      }
      return Object.defineProperty(s, "codes", {
        value: i,
        enumerable: !1
      }), s.color.close = "\x1B[39m", s.bgColor.close = "\x1B[49m", s.color.ansi256 = t(), s.color.ansi16m = r(), s.bgColor.ansi256 = t(10), s.bgColor.ansi16m = r(10), Object.defineProperties(s, {
        rgbToAnsi256: {
          value: (o, u, c) => o === u && u === c ? o < 8 ? 16 : o > 248 ? 231 : Math.round((o - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(o / 255 * 5) + 6 * Math.round(u / 255 * 5) + Math.round(c / 255 * 5),
          enumerable: !1
        },
        hexToRgb: {
          value: (o) => {
            const u = /(?<colorString>[a-f\d]{6}|[a-f\d]{3})/i.exec(o.toString(16));
            if (!u)
              return [0, 0, 0];
            let { colorString: c } = u.groups;
            c.length === 3 && (c = c.split("").map((h) => h + h).join(""));
            const l = Number.parseInt(c, 16);
            return [
              l >> 16 & 255,
              l >> 8 & 255,
              l & 255
            ];
          },
          enumerable: !1
        },
        hexToAnsi256: {
          value: (o) => s.rgbToAnsi256(...s.hexToRgb(o)),
          enumerable: !1
        }
      }), s;
    }
    Object.defineProperty(a, "exports", {
      enumerable: !0,
      get: n
    });
  }(yr)), yr.exports;
}
var Qa = /* @__PURE__ */ Ka();
const Yn = /* @__PURE__ */ ur(Qa);
function _r(a, e) {
  return a && !Array.isArray(a) && typeof a == "object" ? a : { [e]: a };
}
function Ya(a) {
  return a.replace(/[-:.]/g, "");
}
function Xa(a, e, t) {
  const r = t.toFixed(0).slice(0, 3).padStart(3, "0");
  return Ya(`${new Date(a).toISOString().slice(0, -1)}${r}Z`) + e;
}
function it(a) {
  return typeof a._addRunToRunMap == "function";
}
class jt extends Rt {
  constructor(e) {
    super(...arguments), Object.defineProperty(this, "runMap", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: /* @__PURE__ */ new Map()
    });
  }
  copy() {
    return this;
  }
  stringifyError(e) {
    return e instanceof Error ? e.message + (e?.stack ? `

${e.stack}` : "") : typeof e == "string" ? e : `${e}`;
  }
  _addChildRun(e, t) {
    e.child_runs.push(t);
  }
  _addRunToRunMap(e) {
    const t = Xa(e.start_time, e.id, e.execution_order), r = { ...e };
    if (r.parent_run_id !== void 0) {
      const n = this.runMap.get(r.parent_run_id);
      n && (this._addChildRun(n, r), n.child_execution_order = Math.max(n.child_execution_order, r.child_execution_order), r.trace_id = n.trace_id, n.dotted_order !== void 0 && (r.dotted_order = [
        n.dotted_order,
        t
      ].join(".")));
    } else
      r.trace_id = r.id, r.dotted_order = t;
    return this.runMap.set(r.id, r), r;
  }
  async _endTrace(e) {
    const t = e.parent_run_id !== void 0 && this.runMap.get(e.parent_run_id);
    t ? t.child_execution_order = Math.max(t.child_execution_order, e.child_execution_order) : await this.persistRun(e), this.runMap.delete(e.id), await this.onRunUpdate?.(e);
  }
  _getExecutionOrder(e) {
    const t = e !== void 0 && this.runMap.get(e);
    return t ? t.child_execution_order + 1 : 1;
  }
  /**
   * Create and add a run to the run map for LLM start events.
   * This must sometimes be done synchronously to avoid race conditions
   * when callbacks are backgrounded, so we expose it as a separate method here.
   */
  _createRunForLLMStart(e, t, r, n, i, s, o, u) {
    const c = this._getExecutionOrder(n), l = Date.now(), h = o ? { ...i, metadata: o } : i, d = {
      id: r,
      name: u ?? e.id[e.id.length - 1],
      parent_run_id: n,
      start_time: l,
      serialized: e,
      events: [
        {
          name: "start",
          time: new Date(l).toISOString()
        }
      ],
      inputs: { prompts: t },
      execution_order: c,
      child_runs: [],
      child_execution_order: c,
      run_type: "llm",
      extra: h ?? {},
      tags: s || []
    };
    return this._addRunToRunMap(d);
  }
  async handleLLMStart(e, t, r, n, i, s, o, u) {
    const c = this.runMap.get(r) ?? this._createRunForLLMStart(e, t, r, n, i, s, o, u);
    return await this.onRunCreate?.(c), await this.onLLMStart?.(c), c;
  }
  /**
   * Create and add a run to the run map for chat model start events.
   * This must sometimes be done synchronously to avoid race conditions
   * when callbacks are backgrounded, so we expose it as a separate method here.
   */
  _createRunForChatModelStart(e, t, r, n, i, s, o, u) {
    const c = this._getExecutionOrder(n), l = Date.now(), h = o ? { ...i, metadata: o } : i, d = {
      id: r,
      name: u ?? e.id[e.id.length - 1],
      parent_run_id: n,
      start_time: l,
      serialized: e,
      events: [
        {
          name: "start",
          time: new Date(l).toISOString()
        }
      ],
      inputs: { messages: t },
      execution_order: c,
      child_runs: [],
      child_execution_order: c,
      run_type: "llm",
      extra: h ?? {},
      tags: s || []
    };
    return this._addRunToRunMap(d);
  }
  async handleChatModelStart(e, t, r, n, i, s, o, u) {
    const c = this.runMap.get(r) ?? this._createRunForChatModelStart(e, t, r, n, i, s, o, u);
    return await this.onRunCreate?.(c), await this.onLLMStart?.(c), c;
  }
  async handleLLMEnd(e, t, r, n, i) {
    const s = this.runMap.get(t);
    if (!s || s?.run_type !== "llm")
      throw new Error("No LLM run to end.");
    return s.end_time = Date.now(), s.outputs = e, s.events.push({
      name: "end",
      time: new Date(s.end_time).toISOString()
    }), s.extra = { ...s.extra, ...i }, await this.onLLMEnd?.(s), await this._endTrace(s), s;
  }
  async handleLLMError(e, t, r, n, i) {
    const s = this.runMap.get(t);
    if (!s || s?.run_type !== "llm")
      throw new Error("No LLM run to end.");
    return s.end_time = Date.now(), s.error = this.stringifyError(e), s.events.push({
      name: "error",
      time: new Date(s.end_time).toISOString()
    }), s.extra = { ...s.extra, ...i }, await this.onLLMError?.(s), await this._endTrace(s), s;
  }
  /**
   * Create and add a run to the run map for chain start events.
   * This must sometimes be done synchronously to avoid race conditions
   * when callbacks are backgrounded, so we expose it as a separate method here.
   */
  _createRunForChainStart(e, t, r, n, i, s, o, u) {
    const c = this._getExecutionOrder(n), l = Date.now(), h = {
      id: r,
      name: u ?? e.id[e.id.length - 1],
      parent_run_id: n,
      start_time: l,
      serialized: e,
      events: [
        {
          name: "start",
          time: new Date(l).toISOString()
        }
      ],
      inputs: t,
      execution_order: c,
      child_execution_order: c,
      run_type: o ?? "chain",
      child_runs: [],
      extra: s ? { metadata: s } : {},
      tags: i || []
    };
    return this._addRunToRunMap(h);
  }
  async handleChainStart(e, t, r, n, i, s, o, u) {
    const c = this.runMap.get(r) ?? this._createRunForChainStart(e, t, r, n, i, s, o, u);
    return await this.onRunCreate?.(c), await this.onChainStart?.(c), c;
  }
  async handleChainEnd(e, t, r, n, i) {
    const s = this.runMap.get(t);
    if (!s)
      throw new Error("No chain run to end.");
    return s.end_time = Date.now(), s.outputs = _r(e, "output"), s.events.push({
      name: "end",
      time: new Date(s.end_time).toISOString()
    }), i?.inputs !== void 0 && (s.inputs = _r(i.inputs, "input")), await this.onChainEnd?.(s), await this._endTrace(s), s;
  }
  async handleChainError(e, t, r, n, i) {
    const s = this.runMap.get(t);
    if (!s)
      throw new Error("No chain run to end.");
    return s.end_time = Date.now(), s.error = this.stringifyError(e), s.events.push({
      name: "error",
      time: new Date(s.end_time).toISOString()
    }), i?.inputs !== void 0 && (s.inputs = _r(i.inputs, "input")), await this.onChainError?.(s), await this._endTrace(s), s;
  }
  /**
   * Create and add a run to the run map for tool start events.
   * This must sometimes be done synchronously to avoid race conditions
   * when callbacks are backgrounded, so we expose it as a separate method here.
   */
  _createRunForToolStart(e, t, r, n, i, s, o) {
    const u = this._getExecutionOrder(n), c = Date.now(), l = {
      id: r,
      name: o ?? e.id[e.id.length - 1],
      parent_run_id: n,
      start_time: c,
      serialized: e,
      events: [
        {
          name: "start",
          time: new Date(c).toISOString()
        }
      ],
      inputs: { input: t },
      execution_order: u,
      child_execution_order: u,
      run_type: "tool",
      child_runs: [],
      extra: s ? { metadata: s } : {},
      tags: i || []
    };
    return this._addRunToRunMap(l);
  }
  async handleToolStart(e, t, r, n, i, s, o) {
    const u = this.runMap.get(r) ?? this._createRunForToolStart(e, t, r, n, i, s, o);
    return await this.onRunCreate?.(u), await this.onToolStart?.(u), u;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async handleToolEnd(e, t) {
    const r = this.runMap.get(t);
    if (!r || r?.run_type !== "tool")
      throw new Error("No tool run to end");
    return r.end_time = Date.now(), r.outputs = { output: e }, r.events.push({
      name: "end",
      time: new Date(r.end_time).toISOString()
    }), await this.onToolEnd?.(r), await this._endTrace(r), r;
  }
  async handleToolError(e, t) {
    const r = this.runMap.get(t);
    if (!r || r?.run_type !== "tool")
      throw new Error("No tool run to end");
    return r.end_time = Date.now(), r.error = this.stringifyError(e), r.events.push({
      name: "error",
      time: new Date(r.end_time).toISOString()
    }), await this.onToolError?.(r), await this._endTrace(r), r;
  }
  async handleAgentAction(e, t) {
    const r = this.runMap.get(t);
    if (!r || r?.run_type !== "chain")
      return;
    const n = r;
    n.actions = n.actions || [], n.actions.push(e), n.events.push({
      name: "agent_action",
      time: (/* @__PURE__ */ new Date()).toISOString(),
      kwargs: { action: e }
    }), await this.onAgentAction?.(r);
  }
  async handleAgentEnd(e, t) {
    const r = this.runMap.get(t);
    !r || r?.run_type !== "chain" || (r.events.push({
      name: "agent_end",
      time: (/* @__PURE__ */ new Date()).toISOString(),
      kwargs: { action: e }
    }), await this.onAgentEnd?.(r));
  }
  /**
   * Create and add a run to the run map for retriever start events.
   * This must sometimes be done synchronously to avoid race conditions
   * when callbacks are backgrounded, so we expose it as a separate method here.
   */
  _createRunForRetrieverStart(e, t, r, n, i, s, o) {
    const u = this._getExecutionOrder(n), c = Date.now(), l = {
      id: r,
      name: o ?? e.id[e.id.length - 1],
      parent_run_id: n,
      start_time: c,
      serialized: e,
      events: [
        {
          name: "start",
          time: new Date(c).toISOString()
        }
      ],
      inputs: { query: t },
      execution_order: u,
      child_execution_order: u,
      run_type: "retriever",
      child_runs: [],
      extra: s ? { metadata: s } : {},
      tags: i || []
    };
    return this._addRunToRunMap(l);
  }
  async handleRetrieverStart(e, t, r, n, i, s, o) {
    const u = this.runMap.get(r) ?? this._createRunForRetrieverStart(e, t, r, n, i, s, o);
    return await this.onRunCreate?.(u), await this.onRetrieverStart?.(u), u;
  }
  async handleRetrieverEnd(e, t) {
    const r = this.runMap.get(t);
    if (!r || r?.run_type !== "retriever")
      throw new Error("No retriever run to end");
    return r.end_time = Date.now(), r.outputs = { documents: e }, r.events.push({
      name: "end",
      time: new Date(r.end_time).toISOString()
    }), await this.onRetrieverEnd?.(r), await this._endTrace(r), r;
  }
  async handleRetrieverError(e, t) {
    const r = this.runMap.get(t);
    if (!r || r?.run_type !== "retriever")
      throw new Error("No retriever run to end");
    return r.end_time = Date.now(), r.error = this.stringifyError(e), r.events.push({
      name: "error",
      time: new Date(r.end_time).toISOString()
    }), await this.onRetrieverError?.(r), await this._endTrace(r), r;
  }
  async handleText(e, t) {
    const r = this.runMap.get(t);
    !r || r?.run_type !== "chain" || (r.events.push({
      name: "text",
      time: (/* @__PURE__ */ new Date()).toISOString(),
      kwargs: { text: e }
    }), await this.onText?.(r));
  }
  async handleLLMNewToken(e, t, r, n, i, s) {
    const o = this.runMap.get(r);
    if (!o || o?.run_type !== "llm")
      throw new Error('Invalid "runId" provided to "handleLLMNewToken" callback.');
    return o.events.push({
      name: "new_token",
      time: (/* @__PURE__ */ new Date()).toISOString(),
      kwargs: { token: e, idx: t, chunk: s?.chunk }
    }), await this.onLLMNewToken?.(o, e, { chunk: s?.chunk }), o;
  }
}
function G(a, e) {
  return `${a.open}${e}${a.close}`;
}
function ne(a, e) {
  try {
    return JSON.stringify(a, null, 2);
  } catch {
    return e;
  }
}
function un(a) {
  return typeof a == "string" ? a.trim() : a == null ? a : ne(a, a.toString());
}
function ke(a) {
  if (!a.end_time)
    return "";
  const e = a.end_time - a.start_time;
  return e < 1e3 ? `${e}ms` : `${(e / 1e3).toFixed(2)}s`;
}
const { color: Y } = Yn;
class cn extends jt {
  constructor() {
    super(...arguments), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "console_callback_handler"
    });
  }
  /**
   * Method used to persist the run. In this case, it simply returns a
   * resolved promise as there's no persistence logic.
   * @param _run The run to persist.
   * @returns A resolved promise.
   */
  persistRun(e) {
    return Promise.resolve();
  }
  // utility methods
  /**
   * Method used to get all the parent runs of a given run.
   * @param run The run whose parents are to be retrieved.
   * @returns An array of parent runs.
   */
  getParents(e) {
    const t = [];
    let r = e;
    for (; r.parent_run_id; ) {
      const n = this.runMap.get(r.parent_run_id);
      if (n)
        t.push(n), r = n;
      else
        break;
    }
    return t;
  }
  /**
   * Method used to get a string representation of the run's lineage, which
   * is used in logging.
   * @param run The run whose lineage is to be retrieved.
   * @returns A string representation of the run's lineage.
   */
  getBreadcrumbs(e) {
    const r = [...this.getParents(e).reverse(), e].map((n, i, s) => {
      const o = `${n.execution_order}:${n.run_type}:${n.name}`;
      return i === s.length - 1 ? G(Yn.bold, o) : o;
    }).join(" > ");
    return G(Y.grey, r);
  }
  // logging methods
  /**
   * Method used to log the start of a chain run.
   * @param run The chain run that has started.
   * @returns void
   */
  onChainStart(e) {
    const t = this.getBreadcrumbs(e);
    console.log(`${G(Y.green, "[chain/start]")} [${t}] Entering Chain run with input: ${ne(e.inputs, "[inputs]")}`);
  }
  /**
   * Method used to log the end of a chain run.
   * @param run The chain run that has ended.
   * @returns void
   */
  onChainEnd(e) {
    const t = this.getBreadcrumbs(e);
    console.log(`${G(Y.cyan, "[chain/end]")} [${t}] [${ke(e)}] Exiting Chain run with output: ${ne(e.outputs, "[outputs]")}`);
  }
  /**
   * Method used to log any errors of a chain run.
   * @param run The chain run that has errored.
   * @returns void
   */
  onChainError(e) {
    const t = this.getBreadcrumbs(e);
    console.log(`${G(Y.red, "[chain/error]")} [${t}] [${ke(e)}] Chain run errored with error: ${ne(e.error, "[error]")}`);
  }
  /**
   * Method used to log the start of an LLM run.
   * @param run The LLM run that has started.
   * @returns void
   */
  onLLMStart(e) {
    const t = this.getBreadcrumbs(e), r = "prompts" in e.inputs ? { prompts: e.inputs.prompts.map((n) => n.trim()) } : e.inputs;
    console.log(`${G(Y.green, "[llm/start]")} [${t}] Entering LLM run with input: ${ne(r, "[inputs]")}`);
  }
  /**
   * Method used to log the end of an LLM run.
   * @param run The LLM run that has ended.
   * @returns void
   */
  onLLMEnd(e) {
    const t = this.getBreadcrumbs(e);
    console.log(`${G(Y.cyan, "[llm/end]")} [${t}] [${ke(e)}] Exiting LLM run with output: ${ne(e.outputs, "[response]")}`);
  }
  /**
   * Method used to log any errors of an LLM run.
   * @param run The LLM run that has errored.
   * @returns void
   */
  onLLMError(e) {
    const t = this.getBreadcrumbs(e);
    console.log(`${G(Y.red, "[llm/error]")} [${t}] [${ke(e)}] LLM run errored with error: ${ne(e.error, "[error]")}`);
  }
  /**
   * Method used to log the start of a tool run.
   * @param run The tool run that has started.
   * @returns void
   */
  onToolStart(e) {
    const t = this.getBreadcrumbs(e);
    console.log(`${G(Y.green, "[tool/start]")} [${t}] Entering Tool run with input: "${un(e.inputs.input)}"`);
  }
  /**
   * Method used to log the end of a tool run.
   * @param run The tool run that has ended.
   * @returns void
   */
  onToolEnd(e) {
    const t = this.getBreadcrumbs(e);
    console.log(`${G(Y.cyan, "[tool/end]")} [${t}] [${ke(e)}] Exiting Tool run with output: "${un(e.outputs?.output)}"`);
  }
  /**
   * Method used to log any errors of a tool run.
   * @param run The tool run that has errored.
   * @returns void
   */
  onToolError(e) {
    const t = this.getBreadcrumbs(e);
    console.log(`${G(Y.red, "[tool/error]")} [${t}] [${ke(e)}] Tool run errored with error: ${ne(e.error, "[error]")}`);
  }
  /**
   * Method used to log the start of a retriever run.
   * @param run The retriever run that has started.
   * @returns void
   */
  onRetrieverStart(e) {
    const t = this.getBreadcrumbs(e);
    console.log(`${G(Y.green, "[retriever/start]")} [${t}] Entering Retriever run with input: ${ne(e.inputs, "[inputs]")}`);
  }
  /**
   * Method used to log the end of a retriever run.
   * @param run The retriever run that has ended.
   * @returns void
   */
  onRetrieverEnd(e) {
    const t = this.getBreadcrumbs(e);
    console.log(`${G(Y.cyan, "[retriever/end]")} [${t}] [${ke(e)}] Exiting Retriever run with output: ${ne(e.outputs, "[outputs]")}`);
  }
  /**
   * Method used to log any errors of a retriever run.
   * @param run The retriever run that has errored.
   * @returns void
   */
  onRetrieverError(e) {
    const t = this.getBreadcrumbs(e);
    console.log(`${G(Y.red, "[retriever/error]")} [${t}] [${ke(e)}] Retriever run errored with error: ${ne(e.error, "[error]")}`);
  }
  /**
   * Method used to log the action selected by the agent.
   * @param run The run in which the agent action occurred.
   * @returns void
   */
  onAgentAction(e) {
    const t = e, r = this.getBreadcrumbs(e);
    console.log(`${G(Y.blue, "[agent/action]")} [${r}] Agent selected action: ${ne(t.actions[t.actions.length - 1], "[action]")}`);
  }
}
function ei(a) {
  return !!(a && typeof a == "object" && "type" in a && a.type === "tool_call");
}
class ti extends Error {
  constructor(e, t) {
    super(e), Object.defineProperty(this, "output", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.output = t;
  }
}
function ri(a) {
  if (typeof a > "u")
    return null;
  try {
    return JSON.parse(a);
  } catch {
  }
  let e = "";
  const t = [];
  let r = !1, n = !1;
  for (let i of a) {
    if (r)
      i === '"' && !n ? r = !1 : i === `
` && !n ? i = "\\n" : i === "\\" ? n = !n : n = !1;
    else if (i === '"')
      r = !0, n = !1;
    else if (i === "{")
      t.push("}");
    else if (i === "[")
      t.push("]");
    else if (i === "}" || i === "]")
      if (t && t[t.length - 1] === i)
        t.pop();
      else
        return null;
    e += i;
  }
  r && (e += '"');
  for (let i = t.length - 1; i >= 0; i -= 1)
    e += t[i];
  try {
    return JSON.parse(e);
  } catch {
    return null;
  }
}
function ni(a, e) {
  return typeof a == "string" ? a === "" ? e : typeof e == "string" ? a + e : [{ type: "text", text: a }, ...e] : Array.isArray(e) ? Qr(a, e) ?? [
    ...a,
    ...e
  ] : e === "" ? a : [...a, { type: "text", text: e }];
}
function ai(a, e) {
  function t(r, n) {
    if (typeof r != "object" || r === null || r === void 0)
      return r;
    if (n >= e)
      return Array.isArray(r) ? "[Array]" : "[Object]";
    if (Array.isArray(r))
      return r.map((s) => t(s, n + 1));
    const i = {};
    for (const s of Object.keys(r))
      i[s] = t(r[s], n + 1);
    return i;
  }
  return JSON.stringify(t(a, 0), null, 2);
}
class ii extends He {
  get lc_aliases() {
    return {
      additional_kwargs: "additional_kwargs",
      response_metadata: "response_metadata"
    };
  }
  /**
   * Get text content of the message.
   */
  get text() {
    return typeof this.content == "string" ? this.content : Array.isArray(this.content) ? this.content.map((e) => typeof e == "string" ? e : e.type === "text" ? e.text : "").join("") : "";
  }
  /** The type of the message. */
  getType() {
    return this._getType();
  }
  constructor(e, t) {
    typeof e == "string" && (e = {
      content: e,
      additional_kwargs: t,
      response_metadata: {}
    }), e.additional_kwargs || (e.additional_kwargs = {}), e.response_metadata || (e.response_metadata = {}), super(e), Object.defineProperty(this, "lc_namespace", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: ["langchain_core", "messages"]
    }), Object.defineProperty(this, "lc_serializable", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: !0
    }), Object.defineProperty(this, "content", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "additional_kwargs", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "response_metadata", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "id", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.name = e.name, this.content = e.content, this.additional_kwargs = e.additional_kwargs, this.response_metadata = e.response_metadata, this.id = e.id;
  }
  toDict() {
    return {
      type: this._getType(),
      data: this.toJSON().kwargs
    };
  }
  static lc_name() {
    return "BaseMessage";
  }
  // Can't be protected for silly reasons
  get _printableFields() {
    return {
      id: this.id,
      content: this.content,
      name: this.name,
      additional_kwargs: this.additional_kwargs,
      response_metadata: this.response_metadata
    };
  }
  // this private method is used to update the ID for the runtime
  // value as well as in lc_kwargs for serialisation
  _updateId(e) {
    this.id = e, this.lc_kwargs.id = e;
  }
  get [Symbol.toStringTag]() {
    return this.constructor.lc_name();
  }
  // Override the default behavior of console.log
  [Symbol.for("nodejs.util.inspect.custom")](e) {
    if (e === null)
      return this;
    const t = ai(this._printableFields, Math.max(4, e));
    return `${this.constructor.lc_name()} ${t}`;
  }
}
function qt(a, e) {
  const t = { ...a };
  for (const [r, n] of Object.entries(e))
    if (t[r] == null)
      t[r] = n;
    else {
      if (n == null)
        continue;
      if (typeof t[r] != typeof n || Array.isArray(t[r]) !== Array.isArray(n))
        throw new Error(`field[${r}] already exists in the message chunk, but with a different type.`);
      if (typeof t[r] == "string") {
        if (r === "type")
          continue;
        t[r] += n;
      } else if (typeof t[r] == "object" && !Array.isArray(t[r]))
        t[r] = qt(t[r], n);
      else if (Array.isArray(t[r]))
        t[r] = Qr(t[r], n);
      else {
        if (t[r] === n)
          continue;
        console.warn(`field[${r}] already exists in this message chunk and value has unsupported type.`);
      }
    }
  return t;
}
function Qr(a, e) {
  if (!(a === void 0 && e === void 0)) {
    if (a === void 0 || e === void 0)
      return a || e;
    {
      const t = [...a];
      for (const r of e)
        if (typeof r == "object" && "index" in r && typeof r.index == "number") {
          const n = t.findIndex((i) => i.index === r.index);
          n !== -1 ? t[n] = qt(t[n], r) : t.push(r);
        } else {
          if (typeof r == "object" && "text" in r && r.text === "")
            continue;
          t.push(r);
        }
      return t;
    }
  }
}
class si extends ii {
}
class cr extends si {
  constructor(e) {
    let t;
    if (typeof e == "string")
      t = {
        content: e,
        tool_calls: [],
        invalid_tool_calls: [],
        tool_call_chunks: []
      };
    else if (e.tool_call_chunks === void 0)
      t = {
        ...e,
        tool_calls: e.tool_calls ?? [],
        invalid_tool_calls: [],
        tool_call_chunks: [],
        usage_metadata: e.usage_metadata !== void 0 ? e.usage_metadata : void 0
      };
    else {
      const r = [], n = [];
      for (const i of e.tool_call_chunks) {
        let s = {};
        try {
          if (s = ri(i.args || "{}"), s === null || typeof s != "object" || Array.isArray(s))
            throw new Error("Malformed tool call chunk args.");
          r.push({
            name: i.name ?? "",
            args: s,
            id: i.id,
            type: "tool_call"
          });
        } catch {
          n.push({
            name: i.name,
            args: i.args,
            id: i.id,
            error: "Malformed args.",
            type: "invalid_tool_call"
          });
        }
      }
      t = {
        ...e,
        tool_calls: r,
        invalid_tool_calls: n,
        usage_metadata: e.usage_metadata !== void 0 ? e.usage_metadata : void 0
      };
    }
    super(t), Object.defineProperty(this, "tool_calls", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: []
    }), Object.defineProperty(this, "invalid_tool_calls", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: []
    }), Object.defineProperty(this, "tool_call_chunks", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: []
    }), Object.defineProperty(this, "usage_metadata", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.tool_call_chunks = t.tool_call_chunks ?? this.tool_call_chunks, this.tool_calls = t.tool_calls ?? this.tool_calls, this.invalid_tool_calls = t.invalid_tool_calls ?? this.invalid_tool_calls, this.usage_metadata = t.usage_metadata;
  }
  get lc_aliases() {
    return {
      ...super.lc_aliases,
      tool_calls: "tool_calls",
      invalid_tool_calls: "invalid_tool_calls",
      tool_call_chunks: "tool_call_chunks"
    };
  }
  static lc_name() {
    return "AIMessageChunk";
  }
  _getType() {
    return "ai";
  }
  get _printableFields() {
    return {
      ...super._printableFields,
      tool_calls: this.tool_calls,
      tool_call_chunks: this.tool_call_chunks,
      invalid_tool_calls: this.invalid_tool_calls,
      usage_metadata: this.usage_metadata
    };
  }
  concat(e) {
    const t = {
      content: ni(this.content, e.content),
      additional_kwargs: qt(this.additional_kwargs, e.additional_kwargs),
      response_metadata: qt(this.response_metadata, e.response_metadata),
      tool_call_chunks: [],
      id: this.id ?? e.id
    };
    if (this.tool_call_chunks !== void 0 || e.tool_call_chunks !== void 0) {
      const r = Qr(this.tool_call_chunks, e.tool_call_chunks);
      r !== void 0 && r.length > 0 && (t.tool_call_chunks = r);
    }
    if (this.usage_metadata !== void 0 || e.usage_metadata !== void 0) {
      const r = {
        ...(this.usage_metadata?.input_token_details?.audio !== void 0 || e.usage_metadata?.input_token_details?.audio !== void 0) && {
          audio: (this.usage_metadata?.input_token_details?.audio ?? 0) + (e.usage_metadata?.input_token_details?.audio ?? 0)
        },
        ...(this.usage_metadata?.input_token_details?.cache_read !== void 0 || e.usage_metadata?.input_token_details?.cache_read !== void 0) && {
          cache_read: (this.usage_metadata?.input_token_details?.cache_read ?? 0) + (e.usage_metadata?.input_token_details?.cache_read ?? 0)
        },
        ...(this.usage_metadata?.input_token_details?.cache_creation !== void 0 || e.usage_metadata?.input_token_details?.cache_creation !== void 0) && {
          cache_creation: (this.usage_metadata?.input_token_details?.cache_creation ?? 0) + (e.usage_metadata?.input_token_details?.cache_creation ?? 0)
        }
      }, n = {
        ...(this.usage_metadata?.output_token_details?.audio !== void 0 || e.usage_metadata?.output_token_details?.audio !== void 0) && {
          audio: (this.usage_metadata?.output_token_details?.audio ?? 0) + (e.usage_metadata?.output_token_details?.audio ?? 0)
        },
        ...(this.usage_metadata?.output_token_details?.reasoning !== void 0 || e.usage_metadata?.output_token_details?.reasoning !== void 0) && {
          reasoning: (this.usage_metadata?.output_token_details?.reasoning ?? 0) + (e.usage_metadata?.output_token_details?.reasoning ?? 0)
        }
      }, i = this.usage_metadata ?? {
        input_tokens: 0,
        output_tokens: 0,
        total_tokens: 0
      }, s = e.usage_metadata ?? {
        input_tokens: 0,
        output_tokens: 0,
        total_tokens: 0
      }, o = {
        input_tokens: i.input_tokens + s.input_tokens,
        output_tokens: i.output_tokens + s.output_tokens,
        total_tokens: i.total_tokens + s.total_tokens,
        // Do not include `input_token_details` / `output_token_details` keys in combined fields
        // unless their values are defined.
        ...Object.keys(r).length > 0 && {
          input_token_details: r
        },
        ...Object.keys(n).length > 0 && {
          output_token_details: n
        }
      };
      t.usage_metadata = o;
    }
    return new cr(t);
  }
}
function oi(a, e = "Human", t = "AI") {
  const r = [];
  for (const n of a) {
    let i;
    if (n._getType() === "human")
      i = e;
    else if (n._getType() === "ai")
      i = t;
    else if (n._getType() === "system")
      i = "System";
    else if (n._getType() === "function")
      i = "Function";
    else if (n._getType() === "tool")
      i = "Tool";
    else if (n._getType() === "generic")
      i = n.role;
    else
      throw new Error(`Got unsupported message type: ${n._getType()}`);
    const s = n.name ? `${n.name}, ` : "", o = typeof n.content == "string" ? n.content : JSON.stringify(n.content, null, 2);
    r.push(`${i}: ${s}${o}`);
  }
  return r.join(`
`);
}
var st = { exports: {} }, br = {}, wr, ln;
function ui() {
  if (ln) return wr;
  ln = 1;
  function a(e, t) {
    typeof t == "boolean" && (t = { forever: t }), this._originalTimeouts = JSON.parse(JSON.stringify(e)), this._timeouts = e, this._options = t || {}, this._maxRetryTime = t && t.maxRetryTime || 1 / 0, this._fn = null, this._errors = [], this._attempts = 1, this._operationTimeout = null, this._operationTimeoutCb = null, this._timeout = null, this._operationStart = null, this._timer = null, this._options.forever && (this._cachedTimeouts = this._timeouts.slice(0));
  }
  return wr = a, a.prototype.reset = function() {
    this._attempts = 1, this._timeouts = this._originalTimeouts.slice(0);
  }, a.prototype.stop = function() {
    this._timeout && clearTimeout(this._timeout), this._timer && clearTimeout(this._timer), this._timeouts = [], this._cachedTimeouts = null;
  }, a.prototype.retry = function(e) {
    if (this._timeout && clearTimeout(this._timeout), !e)
      return !1;
    var t = (/* @__PURE__ */ new Date()).getTime();
    if (e && t - this._operationStart >= this._maxRetryTime)
      return this._errors.push(e), this._errors.unshift(new Error("RetryOperation timeout occurred")), !1;
    this._errors.push(e);
    var r = this._timeouts.shift();
    if (r === void 0)
      if (this._cachedTimeouts)
        this._errors.splice(0, this._errors.length - 1), r = this._cachedTimeouts.slice(-1);
      else
        return !1;
    var n = this;
    return this._timer = setTimeout(function() {
      n._attempts++, n._operationTimeoutCb && (n._timeout = setTimeout(function() {
        n._operationTimeoutCb(n._attempts);
      }, n._operationTimeout), n._options.unref && n._timeout.unref()), n._fn(n._attempts);
    }, r), this._options.unref && this._timer.unref(), !0;
  }, a.prototype.attempt = function(e, t) {
    this._fn = e, t && (t.timeout && (this._operationTimeout = t.timeout), t.cb && (this._operationTimeoutCb = t.cb));
    var r = this;
    this._operationTimeoutCb && (this._timeout = setTimeout(function() {
      r._operationTimeoutCb();
    }, r._operationTimeout)), this._operationStart = (/* @__PURE__ */ new Date()).getTime(), this._fn(this._attempts);
  }, a.prototype.try = function(e) {
    console.log("Using RetryOperation.try() is deprecated"), this.attempt(e);
  }, a.prototype.start = function(e) {
    console.log("Using RetryOperation.start() is deprecated"), this.attempt(e);
  }, a.prototype.start = a.prototype.try, a.prototype.errors = function() {
    return this._errors;
  }, a.prototype.attempts = function() {
    return this._attempts;
  }, a.prototype.mainError = function() {
    if (this._errors.length === 0)
      return null;
    for (var e = {}, t = null, r = 0, n = 0; n < this._errors.length; n++) {
      var i = this._errors[n], s = i.message, o = (e[s] || 0) + 1;
      e[s] = o, o >= r && (t = i, r = o);
    }
    return t;
  }, wr;
}
var dn;
function ci() {
  return dn || (dn = 1, function(a) {
    var e = /* @__PURE__ */ ui();
    a.operation = function(t) {
      var r = a.timeouts(t);
      return new e(r, {
        forever: t && (t.forever || t.retries === 1 / 0),
        unref: t && t.unref,
        maxRetryTime: t && t.maxRetryTime
      });
    }, a.timeouts = function(t) {
      if (t instanceof Array)
        return [].concat(t);
      var r = {
        retries: 10,
        factor: 2,
        minTimeout: 1 * 1e3,
        maxTimeout: 1 / 0,
        randomize: !1
      };
      for (var n in t)
        r[n] = t[n];
      if (r.minTimeout > r.maxTimeout)
        throw new Error("minTimeout is greater than maxTimeout");
      for (var i = [], s = 0; s < r.retries; s++)
        i.push(this.createTimeout(s, r));
      return t && t.forever && !i.length && i.push(this.createTimeout(s, r)), i.sort(function(o, u) {
        return o - u;
      }), i;
    }, a.createTimeout = function(t, r) {
      var n = r.randomize ? Math.random() + 1 : 1, i = Math.round(n * Math.max(r.minTimeout, 1) * Math.pow(r.factor, t));
      return i = Math.min(i, r.maxTimeout), i;
    }, a.wrap = function(t, r, n) {
      if (r instanceof Array && (n = r, r = null), !n) {
        n = [];
        for (var i in t)
          typeof t[i] == "function" && n.push(i);
      }
      for (var s = 0; s < n.length; s++) {
        var o = n[s], u = t[o];
        t[o] = function(l) {
          var h = a.operation(r), d = Array.prototype.slice.call(arguments, 1), f = d.pop();
          d.push(function(p) {
            h.retry(p) || (p && (arguments[0] = h.mainError()), f.apply(this, arguments));
          }), h.attempt(function() {
            l.apply(t, d);
          });
        }.bind(t, u), t[o].options = r;
      }
    };
  }(br)), br;
}
var vr, hn;
function li() {
  return hn || (hn = 1, vr = /* @__PURE__ */ ci()), vr;
}
var fn;
function di() {
  if (fn) return st.exports;
  fn = 1;
  const a = /* @__PURE__ */ li(), e = [
    "Failed to fetch",
    // Chrome
    "NetworkError when attempting to fetch resource.",
    // Firefox
    "The Internet connection appears to be offline.",
    // Safari
    "Network request failed"
    // `cross-fetch`
  ];
  class t extends Error {
    constructor(o) {
      super(), o instanceof Error ? (this.originalError = o, { message: o } = o) : (this.originalError = new Error(o), this.originalError.stack = this.stack), this.name = "AbortError", this.message = o;
    }
  }
  const r = (s, o, u) => {
    const c = u.retries - (o - 1);
    return s.attemptNumber = o, s.retriesLeft = c, s;
  }, n = (s) => e.includes(s), i = (s, o) => new Promise((u, c) => {
    o = {
      onFailedAttempt: () => {
      },
      retries: 10,
      ...o
    };
    const l = a.operation(o);
    l.attempt(async (h) => {
      try {
        u(await s(h));
      } catch (d) {
        if (!(d instanceof Error)) {
          c(new TypeError(`Non-error was thrown: "${d}". You should only throw errors.`));
          return;
        }
        if (d instanceof t)
          l.stop(), c(d.originalError);
        else if (d instanceof TypeError && !n(d.message))
          l.stop(), c(d);
        else {
          r(d, h, o);
          try {
            await o.onFailedAttempt(d);
          } catch (f) {
            c(f);
            return;
          }
          l.retry(d) || c(l.mainError());
        }
      }
    });
  });
  return st.exports = i, st.exports.default = i, st.exports.AbortError = t, st.exports;
}
var hi = /* @__PURE__ */ di();
const Vt = /* @__PURE__ */ ur(hi);
var Dt = {}, Er = { exports: {} }, pn;
function fi() {
  return pn || (pn = 1, function(a) {
    var e = Object.prototype.hasOwnProperty, t = "~";
    function r() {
    }
    Object.create && (r.prototype = /* @__PURE__ */ Object.create(null), new r().__proto__ || (t = !1));
    function n(u, c, l) {
      this.fn = u, this.context = c, this.once = l || !1;
    }
    function i(u, c, l, h, d) {
      if (typeof l != "function")
        throw new TypeError("The listener must be a function");
      var f = new n(l, h || u, d), p = t ? t + c : c;
      return u._events[p] ? u._events[p].fn ? u._events[p] = [u._events[p], f] : u._events[p].push(f) : (u._events[p] = f, u._eventsCount++), u;
    }
    function s(u, c) {
      --u._eventsCount === 0 ? u._events = new r() : delete u._events[c];
    }
    function o() {
      this._events = new r(), this._eventsCount = 0;
    }
    o.prototype.eventNames = function() {
      var c = [], l, h;
      if (this._eventsCount === 0) return c;
      for (h in l = this._events)
        e.call(l, h) && c.push(t ? h.slice(1) : h);
      return Object.getOwnPropertySymbols ? c.concat(Object.getOwnPropertySymbols(l)) : c;
    }, o.prototype.listeners = function(c) {
      var l = t ? t + c : c, h = this._events[l];
      if (!h) return [];
      if (h.fn) return [h.fn];
      for (var d = 0, f = h.length, p = new Array(f); d < f; d++)
        p[d] = h[d].fn;
      return p;
    }, o.prototype.listenerCount = function(c) {
      var l = t ? t + c : c, h = this._events[l];
      return h ? h.fn ? 1 : h.length : 0;
    }, o.prototype.emit = function(c, l, h, d, f, p) {
      var T = t ? t + c : c;
      if (!this._events[T]) return !1;
      var y = this._events[T], v = arguments.length, k, b;
      if (y.fn) {
        switch (y.once && this.removeListener(c, y.fn, void 0, !0), v) {
          case 1:
            return y.fn.call(y.context), !0;
          case 2:
            return y.fn.call(y.context, l), !0;
          case 3:
            return y.fn.call(y.context, l, h), !0;
          case 4:
            return y.fn.call(y.context, l, h, d), !0;
          case 5:
            return y.fn.call(y.context, l, h, d, f), !0;
          case 6:
            return y.fn.call(y.context, l, h, d, f, p), !0;
        }
        for (b = 1, k = new Array(v - 1); b < v; b++)
          k[b - 1] = arguments[b];
        y.fn.apply(y.context, k);
      } else {
        var $ = y.length, x;
        for (b = 0; b < $; b++)
          switch (y[b].once && this.removeListener(c, y[b].fn, void 0, !0), v) {
            case 1:
              y[b].fn.call(y[b].context);
              break;
            case 2:
              y[b].fn.call(y[b].context, l);
              break;
            case 3:
              y[b].fn.call(y[b].context, l, h);
              break;
            case 4:
              y[b].fn.call(y[b].context, l, h, d);
              break;
            default:
              if (!k) for (x = 1, k = new Array(v - 1); x < v; x++)
                k[x - 1] = arguments[x];
              y[b].fn.apply(y[b].context, k);
          }
      }
      return !0;
    }, o.prototype.on = function(c, l, h) {
      return i(this, c, l, h, !1);
    }, o.prototype.once = function(c, l, h) {
      return i(this, c, l, h, !0);
    }, o.prototype.removeListener = function(c, l, h, d) {
      var f = t ? t + c : c;
      if (!this._events[f]) return this;
      if (!l)
        return s(this, f), this;
      var p = this._events[f];
      if (p.fn)
        p.fn === l && (!d || p.once) && (!h || p.context === h) && s(this, f);
      else {
        for (var T = 0, y = [], v = p.length; T < v; T++)
          (p[T].fn !== l || d && !p[T].once || h && p[T].context !== h) && y.push(p[T]);
        y.length ? this._events[f] = y.length === 1 ? y[0] : y : s(this, f);
      }
      return this;
    }, o.prototype.removeAllListeners = function(c) {
      var l;
      return c ? (l = t ? t + c : c, this._events[l] && s(this, l)) : (this._events = new r(), this._eventsCount = 0), this;
    }, o.prototype.off = o.prototype.removeListener, o.prototype.addListener = o.prototype.on, o.prefixed = t, o.EventEmitter = o, a.exports = o;
  }(Er)), Er.exports;
}
var ot = { exports: {} }, Or, mn;
function pi() {
  return mn || (mn = 1, Or = (a, e) => (e = e || (() => {
  }), a.then(
    (t) => new Promise((r) => {
      r(e());
    }).then(() => t),
    (t) => new Promise((r) => {
      r(e());
    }).then(() => {
      throw t;
    })
  ))), Or;
}
var gn;
function mi() {
  if (gn) return ot.exports;
  gn = 1;
  const a = /* @__PURE__ */ pi();
  class e extends Error {
    constructor(n) {
      super(n), this.name = "TimeoutError";
    }
  }
  const t = (r, n, i) => new Promise((s, o) => {
    if (typeof n != "number" || n < 0)
      throw new TypeError("Expected `milliseconds` to be a positive number");
    if (n === 1 / 0) {
      s(r);
      return;
    }
    const u = setTimeout(() => {
      if (typeof i == "function") {
        try {
          s(i());
        } catch (h) {
          o(h);
        }
        return;
      }
      const c = typeof i == "string" ? i : `Promise timed out after ${n} milliseconds`, l = i instanceof Error ? i : new e(c);
      typeof r.cancel == "function" && r.cancel(), o(l);
    }, n);
    a(
      // eslint-disable-next-line promise/prefer-await-to-then
      r.then(s, o),
      () => {
        clearTimeout(u);
      }
    );
  });
  return ot.exports = t, ot.exports.default = t, ot.exports.TimeoutError = e, ot.exports;
}
var Ut = {}, Ft = {}, yn;
function gi() {
  if (yn) return Ft;
  yn = 1, Object.defineProperty(Ft, "__esModule", { value: !0 });
  function a(e, t, r) {
    let n = 0, i = e.length;
    for (; i > 0; ) {
      const s = i / 2 | 0;
      let o = n + s;
      r(e[o], t) <= 0 ? (n = ++o, i -= s + 1) : i = s;
    }
    return n;
  }
  return Ft.default = a, Ft;
}
var _n;
function yi() {
  if (_n) return Ut;
  _n = 1, Object.defineProperty(Ut, "__esModule", { value: !0 });
  const a = /* @__PURE__ */ gi();
  class e {
    constructor() {
      this._queue = [];
    }
    enqueue(r, n) {
      n = Object.assign({ priority: 0 }, n);
      const i = {
        priority: n.priority,
        run: r
      };
      if (this.size && this._queue[this.size - 1].priority >= n.priority) {
        this._queue.push(i);
        return;
      }
      const s = a.default(this._queue, i, (o, u) => u.priority - o.priority);
      this._queue.splice(s, 0, i);
    }
    dequeue() {
      const r = this._queue.shift();
      return r?.run;
    }
    filter(r) {
      return this._queue.filter((n) => n.priority === r.priority).map((n) => n.run);
    }
    get size() {
      return this._queue.length;
    }
  }
  return Ut.default = e, Ut;
}
var bn;
function _i() {
  if (bn) return Dt;
  bn = 1, Object.defineProperty(Dt, "__esModule", { value: !0 });
  const a = /* @__PURE__ */ fi(), e = /* @__PURE__ */ mi(), t = /* @__PURE__ */ yi(), r = () => {
  }, n = new e.TimeoutError();
  class i extends a {
    constructor(o) {
      var u, c, l, h;
      if (super(), this._intervalCount = 0, this._intervalEnd = 0, this._pendingCount = 0, this._resolveEmpty = r, this._resolveIdle = r, o = Object.assign({ carryoverConcurrencyCount: !1, intervalCap: 1 / 0, interval: 0, concurrency: 1 / 0, autoStart: !0, queueClass: t.default }, o), !(typeof o.intervalCap == "number" && o.intervalCap >= 1))
        throw new TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${(c = (u = o.intervalCap) === null || u === void 0 ? void 0 : u.toString()) !== null && c !== void 0 ? c : ""}\` (${typeof o.intervalCap})`);
      if (o.interval === void 0 || !(Number.isFinite(o.interval) && o.interval >= 0))
        throw new TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${(h = (l = o.interval) === null || l === void 0 ? void 0 : l.toString()) !== null && h !== void 0 ? h : ""}\` (${typeof o.interval})`);
      this._carryoverConcurrencyCount = o.carryoverConcurrencyCount, this._isIntervalIgnored = o.intervalCap === 1 / 0 || o.interval === 0, this._intervalCap = o.intervalCap, this._interval = o.interval, this._queue = new o.queueClass(), this._queueClass = o.queueClass, this.concurrency = o.concurrency, this._timeout = o.timeout, this._throwOnTimeout = o.throwOnTimeout === !0, this._isPaused = o.autoStart === !1;
    }
    get _doesIntervalAllowAnother() {
      return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
    }
    get _doesConcurrentAllowAnother() {
      return this._pendingCount < this._concurrency;
    }
    _next() {
      this._pendingCount--, this._tryToStartAnother(), this.emit("next");
    }
    _resolvePromises() {
      this._resolveEmpty(), this._resolveEmpty = r, this._pendingCount === 0 && (this._resolveIdle(), this._resolveIdle = r, this.emit("idle"));
    }
    _onResumeInterval() {
      this._onInterval(), this._initializeIntervalIfNeeded(), this._timeoutId = void 0;
    }
    _isIntervalPaused() {
      const o = Date.now();
      if (this._intervalId === void 0) {
        const u = this._intervalEnd - o;
        if (u < 0)
          this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
        else
          return this._timeoutId === void 0 && (this._timeoutId = setTimeout(() => {
            this._onResumeInterval();
          }, u)), !0;
      }
      return !1;
    }
    _tryToStartAnother() {
      if (this._queue.size === 0)
        return this._intervalId && clearInterval(this._intervalId), this._intervalId = void 0, this._resolvePromises(), !1;
      if (!this._isPaused) {
        const o = !this._isIntervalPaused();
        if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
          const u = this._queue.dequeue();
          return u ? (this.emit("active"), u(), o && this._initializeIntervalIfNeeded(), !0) : !1;
        }
      }
      return !1;
    }
    _initializeIntervalIfNeeded() {
      this._isIntervalIgnored || this._intervalId !== void 0 || (this._intervalId = setInterval(() => {
        this._onInterval();
      }, this._interval), this._intervalEnd = Date.now() + this._interval);
    }
    _onInterval() {
      this._intervalCount === 0 && this._pendingCount === 0 && this._intervalId && (clearInterval(this._intervalId), this._intervalId = void 0), this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0, this._processQueue();
    }
    /**
    Executes all queued functions until it reaches the limit.
    */
    _processQueue() {
      for (; this._tryToStartAnother(); )
        ;
    }
    get concurrency() {
      return this._concurrency;
    }
    set concurrency(o) {
      if (!(typeof o == "number" && o >= 1))
        throw new TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${o}\` (${typeof o})`);
      this._concurrency = o, this._processQueue();
    }
    /**
    Adds a sync or async task to the queue. Always returns a promise.
    */
    async add(o, u = {}) {
      return new Promise((c, l) => {
        const h = async () => {
          this._pendingCount++, this._intervalCount++;
          try {
            const d = this._timeout === void 0 && u.timeout === void 0 ? o() : e.default(Promise.resolve(o()), u.timeout === void 0 ? this._timeout : u.timeout, () => {
              (u.throwOnTimeout === void 0 ? this._throwOnTimeout : u.throwOnTimeout) && l(n);
            });
            c(await d);
          } catch (d) {
            l(d);
          }
          this._next();
        };
        this._queue.enqueue(h, u), this._tryToStartAnother(), this.emit("add");
      });
    }
    /**
    	    Same as `.add()`, but accepts an array of sync or async functions.
    
    	    @returns A promise that resolves when all functions are resolved.
    	    */
    async addAll(o, u) {
      return Promise.all(o.map(async (c) => this.add(c, u)));
    }
    /**
    Start (or resume) executing enqueued tasks within concurrency limit. No need to call this if queue is not paused (via `options.autoStart = false` or by `.pause()` method.)
    */
    start() {
      return this._isPaused ? (this._isPaused = !1, this._processQueue(), this) : this;
    }
    /**
    Put queue execution on hold.
    */
    pause() {
      this._isPaused = !0;
    }
    /**
    Clear the queue.
    */
    clear() {
      this._queue = new this._queueClass();
    }
    /**
    	    Can be called multiple times. Useful if you for example add additional items at a later time.
    
    	    @returns A promise that settles when the queue becomes empty.
    	    */
    async onEmpty() {
      if (this._queue.size !== 0)
        return new Promise((o) => {
          const u = this._resolveEmpty;
          this._resolveEmpty = () => {
            u(), o();
          };
        });
    }
    /**
    	    The difference with `.onEmpty` is that `.onIdle` guarantees that all work from the queue has finished. `.onEmpty` merely signals that the queue is empty, but it could mean that some promises haven't completed yet.
    
    	    @returns A promise that settles when the queue becomes empty, and all promises have completed; `queue.size === 0 && queue.pending === 0`.
    	    */
    async onIdle() {
      if (!(this._pendingCount === 0 && this._queue.size === 0))
        return new Promise((o) => {
          const u = this._resolveIdle;
          this._resolveIdle = () => {
            u(), o();
          };
        });
    }
    /**
    Size of the queue.
    */
    get size() {
      return this._queue.size;
    }
    /**
    	    Size of the queue, filtered by the given options.
    
    	    For example, this can be used to find the number of items remaining in the queue with a specific priority level.
    	    */
    sizeBy(o) {
      return this._queue.filter(o).length;
    }
    /**
    Number of pending promises.
    */
    get pending() {
      return this._pendingCount;
    }
    /**
    Whether the queue is currently paused.
    */
    get isPaused() {
      return this._isPaused;
    }
    get timeout() {
      return this._timeout;
    }
    /**
    Set the timeout for future operations.
    */
    set timeout(o) {
      this._timeout = o;
    }
  }
  return Dt.default = i, Dt;
}
var bi = /* @__PURE__ */ _i();
const Ee = /* @__PURE__ */ ur(bi), wi = (...a) => fetch(...a), vi = Symbol.for("ls:fetch_implementation"), O = () => globalThis[vi] ?? wi, Ei = [
  400,
  // Bad Request
  401,
  // Unauthorized
  403,
  // Forbidden
  404,
  // Not Found
  405,
  // Method Not Allowed
  406,
  // Not Acceptable
  407,
  // Proxy Authentication Required
  408
  // Request Timeout
], Oi = [
  409
  // Conflict
];
let wn = class {
  constructor(e) {
    Object.defineProperty(this, "maxConcurrency", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "maxRetries", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "queue", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "onFailedResponseHook", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.maxConcurrency = e.maxConcurrency ?? 1 / 0, this.maxRetries = e.maxRetries ?? 6, "default" in Ee ? this.queue = new Ee.default({
      concurrency: this.maxConcurrency
    }) : this.queue = new Ee({ concurrency: this.maxConcurrency }), this.onFailedResponseHook = e?.onFailedResponseHook;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  call(e, ...t) {
    const r = this.onFailedResponseHook;
    return this.queue.add(() => Vt(() => e(...t).catch((n) => {
      throw n instanceof Error ? n : new Error(n);
    }), {
      async onFailedAttempt(n) {
        if (n.message.startsWith("Cancel") || n.message.startsWith("TimeoutError") || n.message.startsWith("AbortError") || n?.code === "ECONNABORTED")
          throw n;
        const i = n?.response, s = i?.status;
        if (s) {
          if (Ei.includes(+s))
            throw n;
          if (Oi.includes(+s))
            return;
          r && await r(i);
        }
      },
      // If needed we can change some of the defaults here,
      // but they're quite sensible.
      retries: this.maxRetries,
      randomize: !0
    }), { throwOnTimeout: !0 });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callWithOptions(e, t, ...r) {
    return e.signal ? Promise.race([
      this.call(t, ...r),
      new Promise((n, i) => {
        e.signal?.addEventListener("abort", () => {
          i(new Error("AbortError"));
        });
      })
    ]) : this.call(t, ...r);
  }
  fetch(...e) {
    return this.call(() => O()(...e).then((t) => t.ok ? t : Promise.reject(t)));
  }
};
function vn(a) {
  return typeof a?._getType == "function";
}
function En(a) {
  const e = {
    type: a._getType(),
    data: { content: a.content }
  };
  return a?.additional_kwargs && Object.keys(a.additional_kwargs).length > 0 && (e.data.additional_kwargs = { ...a.additional_kwargs }), e;
}
function I(a, e) {
  if (!dt(a)) {
    const t = e !== void 0 ? `Invalid UUID for ${e}: ${a}` : `Invalid UUID: ${a}`;
    throw new Error(t);
  }
  return a;
}
const On = {};
function Xn(a) {
  On[a] || (console.warn(a), On[a] = !0);
}
function xe(a) {
  if (!a || a.split("/").length > 2 || a.startsWith("/") || a.endsWith("/") || a.split(":").length > 2)
    throw new Error(`Invalid identifier format: ${a}`);
  const [e, t] = a.split(":"), r = t || "latest";
  if (e.includes("/")) {
    const [n, i] = e.split("/", 2);
    if (!n || !i)
      throw new Error(`Invalid identifier format: ${a}`);
    return [n, i, r];
  } else {
    if (!e)
      throw new Error(`Invalid identifier format: ${a}`);
    return ["-", e, r];
  }
}
class Ti extends Error {
  constructor(e) {
    super(e), this.name = "LangSmithConflictError";
  }
}
async function C(a, e, t) {
  let r;
  if (a.ok) {
    t && (r = await a.text());
    return;
  }
  r = await a.text();
  const n = `Failed to ${e}. Received status [${a.status}]: ${a.statusText}. Server response: ${r}`;
  throw a.status === 409 ? new Ti(n) : new Error(n);
}
var Tn = "[...]", Si = { result: "[Circular]" }, Gt = [], Je = [];
const ki = new TextEncoder();
function xi() {
  return {
    depthLimit: Number.MAX_SAFE_INTEGER,
    edgesLimit: Number.MAX_SAFE_INTEGER
  };
}
function Zt(a) {
  return ki.encode(a);
}
function X(a, e, t, r) {
  try {
    const n = JSON.stringify(a, e, t);
    return Zt(n);
  } catch (n) {
    if (!n.message?.includes("Converting circular structure to JSON"))
      return console.warn("[WARNING]: LangSmith received unserializable value."), Zt("[Unserializable]");
    console.warn("[WARNING]: LangSmith received circular JSON. This will decrease tracer performance."), typeof r > "u" && (r = xi()), Ur(a, "", 0, [], void 0, 0, r);
    let i;
    try {
      Je.length === 0 ? i = JSON.stringify(a, e, t) : i = JSON.stringify(a, Ai(e), t);
    } catch {
      return Zt("[unable to serialize, circular reference is too complex to analyze]");
    } finally {
      for (; Gt.length !== 0; ) {
        const s = Gt.pop();
        s.length === 4 ? Object.defineProperty(s[0], s[1], s[3]) : s[0][s[1]] = s[2];
      }
    }
    return Zt(i);
  }
}
function Tr(a, e, t, r) {
  var n = Object.getOwnPropertyDescriptor(r, t);
  n.get !== void 0 ? n.configurable ? (Object.defineProperty(r, t, { value: a }), Gt.push([r, t, e, n])) : Je.push([e, t, a]) : (r[t] = a, Gt.push([r, t, e]));
}
function Ur(a, e, t, r, n, i, s) {
  i += 1;
  var o;
  if (typeof a == "object" && a !== null) {
    for (o = 0; o < r.length; o++)
      if (r[o] === a) {
        Tr(Si, a, e, n);
        return;
      }
    if (typeof s.depthLimit < "u" && i > s.depthLimit) {
      Tr(Tn, a, e, n);
      return;
    }
    if (typeof s.edgesLimit < "u" && t + 1 > s.edgesLimit) {
      Tr(Tn, a, e, n);
      return;
    }
    if (r.push(a), Array.isArray(a))
      for (o = 0; o < a.length; o++)
        Ur(a[o], o, o, r, a, i, s);
    else {
      var u = Object.keys(a);
      for (o = 0; o < u.length; o++) {
        var c = u[o];
        Ur(a[c], c, o, r, a, i, s);
      }
    }
    r.pop();
  }
}
function Ai(a) {
  return a = typeof a < "u" ? a : function(e, t) {
    return t;
  }, function(e, t) {
    if (Je.length > 0)
      for (var r = 0; r < Je.length; r++) {
        var n = Je[r];
        if (n[1] === e && n[0] === t) {
          t = n[2], Je.splice(r, 1);
          break;
        }
      }
    return a.call(this, e, t);
  };
}
function Sn(a) {
  const e = ra(), t = Bi(), r = a.extra ?? {}, n = r.metadata;
  return a.extra = {
    ...r,
    runtime: {
      ...e,
      ...r?.runtime
    },
    metadata: {
      ...t,
      ...t.revision_id || a.revision_id ? { revision_id: a.revision_id ?? t.revision_id } : {},
      ...n
    }
  }, a;
}
const Ii = (a) => {
  const e = a?.toString() ?? Ie("TRACING_SAMPLING_RATE");
  if (e === void 0)
    return;
  const t = parseFloat(e);
  if (t < 0 || t > 1)
    throw new Error(`LANGSMITH_TRACING_SAMPLING_RATE must be between 0 and 1 if set. Got: ${t}`);
  return t;
}, Pi = (a) => {
  const t = a.replace("http://", "").replace("https://", "").split("/")[0].split(":")[0];
  return t === "localhost" || t === "127.0.0.1" || t === "::1";
};
async function Ci(a) {
  const e = [];
  for await (const t of a)
    e.push(t);
  return e;
}
function Sr(a) {
  if (a !== void 0)
    return a.trim().replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1");
}
const Ri = async (a) => {
  if (a?.status === 429) {
    const e = parseInt(a.headers.get("retry-after") ?? "30", 10) * 1e3;
    if (e > 0)
      return await new Promise((t) => setTimeout(t, e)), !0;
  }
  return !1;
};
function kn(a) {
  return typeof a == "number" ? Number(a.toFixed(4)) : a;
}
class ji {
  constructor() {
    Object.defineProperty(this, "items", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: []
    }), Object.defineProperty(this, "sizeBytes", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: 0
    });
  }
  peek() {
    return this.items[0];
  }
  push(e) {
    let t;
    const r = new Promise((i) => {
      t = i;
    }), n = X(e.item).length;
    return this.items.push({
      action: e.action,
      payload: e.item,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      itemPromiseResolve: t,
      itemPromise: r,
      size: n
    }), this.sizeBytes += n, r;
  }
  pop(e) {
    if (e < 1)
      throw new Error("Number of bytes to pop off may not be less than 1.");
    const t = [];
    let r = 0;
    for (; r + (this.peek()?.size ?? 0) < e && this.items.length > 0; ) {
      const n = this.items.shift();
      n && (t.push(n), r += n.size, this.sizeBytes -= n.size);
    }
    if (t.length === 0 && this.items.length > 0) {
      const n = this.items.shift();
      t.push(n), r += n.size, this.sizeBytes -= n.size;
    }
    return [
      t.map((n) => ({ action: n.action, item: n.payload })),
      () => t.forEach((n) => n.itemPromiseResolve())
    ];
  }
}
const Ni = 20971520, $i = 2500;
class gt {
  constructor(e = {}) {
    Object.defineProperty(this, "apiKey", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "apiUrl", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "webUrl", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "caller", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "batchIngestCaller", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "timeout_ms", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "_tenantId", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: null
    }), Object.defineProperty(this, "hideInputs", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "hideOutputs", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "tracingSampleRate", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "filteredPostUuids", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: /* @__PURE__ */ new Set()
    }), Object.defineProperty(this, "autoBatchTracing", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: !0
    }), Object.defineProperty(this, "autoBatchQueue", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: new ji()
    }), Object.defineProperty(this, "autoBatchTimeout", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "autoBatchAggregationDelayMs", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: 250
    }), Object.defineProperty(this, "batchSizeBytesLimit", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "fetchOptions", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "settings", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "blockOnRootRunFinalization", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: Fe("LANGSMITH_TRACING_BACKGROUND") === "false"
    }), Object.defineProperty(this, "traceBatchConcurrency", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: 5
    }), Object.defineProperty(this, "_serverInfo", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "_getServerInfoPromise", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "manualFlushMode", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: !1
    });
    const t = gt.getDefaultClientConfig();
    if (this.tracingSampleRate = Ii(e.tracingSamplingRate), this.apiUrl = Sr(e.apiUrl ?? t.apiUrl) ?? "", this.apiUrl.endsWith("/") && (this.apiUrl = this.apiUrl.slice(0, -1)), this.apiKey = Sr(e.apiKey ?? t.apiKey), this.webUrl = Sr(e.webUrl ?? t.webUrl), this.webUrl?.endsWith("/") && (this.webUrl = this.webUrl.slice(0, -1)), this.timeout_ms = e.timeout_ms ?? 9e4, this.caller = new wn(e.callerOptions ?? {}), this.traceBatchConcurrency = e.traceBatchConcurrency ?? this.traceBatchConcurrency, this.traceBatchConcurrency < 1)
      throw new Error("Trace batch concurrency must be positive.");
    this.batchIngestCaller = new wn({
      maxRetries: 2,
      maxConcurrency: this.traceBatchConcurrency,
      ...e.callerOptions ?? {},
      onFailedResponseHook: Ri
    }), this.hideInputs = e.hideInputs ?? e.anonymizer ?? t.hideInputs, this.hideOutputs = e.hideOutputs ?? e.anonymizer ?? t.hideOutputs, this.autoBatchTracing = e.autoBatchTracing ?? this.autoBatchTracing, this.blockOnRootRunFinalization = e.blockOnRootRunFinalization ?? this.blockOnRootRunFinalization, this.batchSizeBytesLimit = e.batchSizeBytesLimit, this.fetchOptions = e.fetchOptions || {}, this.manualFlushMode = e.manualFlushMode ?? this.manualFlushMode;
  }
  static getDefaultClientConfig() {
    const e = Ie("API_KEY"), t = Ie("ENDPOINT") ?? "https://api.smith.langchain.com", r = Ie("HIDE_INPUTS") === "true", n = Ie("HIDE_OUTPUTS") === "true";
    return {
      apiUrl: t,
      apiKey: e,
      webUrl: void 0,
      hideInputs: r,
      hideOutputs: n
    };
  }
  getHostUrl() {
    return this.webUrl ? this.webUrl : Pi(this.apiUrl) ? (this.webUrl = "http://localhost:3000", this.webUrl) : this.apiUrl.endsWith("/api/v1") ? (this.webUrl = this.apiUrl.replace("/api/v1", ""), this.webUrl) : this.apiUrl.includes("/api") && !this.apiUrl.split(".", 1)[0].endsWith("api") ? (this.webUrl = this.apiUrl.replace("/api", ""), this.webUrl) : this.apiUrl.split(".", 1)[0].includes("dev") ? (this.webUrl = "https://dev.smith.langchain.com", this.webUrl) : this.apiUrl.split(".", 1)[0].includes("eu") ? (this.webUrl = "https://eu.smith.langchain.com", this.webUrl) : this.apiUrl.split(".", 1)[0].includes("beta") ? (this.webUrl = "https://beta.smith.langchain.com", this.webUrl) : (this.webUrl = "https://smith.langchain.com", this.webUrl);
  }
  get headers() {
    const e = {
      "User-Agent": `langsmith-js/${ea}`
    };
    return this.apiKey && (e["x-api-key"] = `${this.apiKey}`), e;
  }
  processInputs(e) {
    return this.hideInputs === !1 ? e : this.hideInputs === !0 ? {} : typeof this.hideInputs == "function" ? this.hideInputs(e) : e;
  }
  processOutputs(e) {
    return this.hideOutputs === !1 ? e : this.hideOutputs === !0 ? {} : typeof this.hideOutputs == "function" ? this.hideOutputs(e) : e;
  }
  prepareRunCreateOrUpdateInputs(e) {
    const t = { ...e };
    return t.inputs !== void 0 && (t.inputs = this.processInputs(t.inputs)), t.outputs !== void 0 && (t.outputs = this.processOutputs(t.outputs)), t;
  }
  async _getResponse(e, t) {
    const r = t?.toString() ?? "", n = `${this.apiUrl}${e}?${r}`, i = await this.caller.call(O(), n, {
      method: "GET",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    return await C(i, `Failed to fetch ${e}`), i;
  }
  async _get(e, t) {
    return (await this._getResponse(e, t)).json();
  }
  async *_getPaginated(e, t = new URLSearchParams(), r) {
    let n = Number(t.get("offset")) || 0;
    const i = Number(t.get("limit")) || 100;
    for (; ; ) {
      t.set("offset", String(n)), t.set("limit", String(i));
      const s = `${this.apiUrl}${e}?${t}`, o = await this.caller.call(O(), s, {
        method: "GET",
        headers: this.headers,
        signal: AbortSignal.timeout(this.timeout_ms),
        ...this.fetchOptions
      });
      await C(o, `Failed to fetch ${e}`);
      const u = r ? r(await o.json()) : await o.json();
      if (u.length === 0 || (yield u, u.length < i))
        break;
      n += u.length;
    }
  }
  async *_getCursorPaginatedList(e, t = null, r = "POST", n = "runs") {
    const i = t ? { ...t } : {};
    for (; ; ) {
      const o = await (await this.caller.call(O(), `${this.apiUrl}${e}`, {
        method: r,
        headers: { ...this.headers, "Content-Type": "application/json" },
        signal: AbortSignal.timeout(this.timeout_ms),
        ...this.fetchOptions,
        body: JSON.stringify(i)
      })).json();
      if (!o || !o[n])
        break;
      yield o[n];
      const u = o.cursors;
      if (!u || !u.next)
        break;
      i.cursor = u.next;
    }
  }
  // Allows mocking for tests
  _shouldSample() {
    return this.tracingSampleRate === void 0 ? !0 : Math.random() < this.tracingSampleRate;
  }
  _filterForSampling(e, t = !1) {
    if (this.tracingSampleRate === void 0)
      return e;
    if (t) {
      const r = [];
      for (const n of e)
        this.filteredPostUuids.has(n.id) ? this.filteredPostUuids.delete(n.id) : r.push(n);
      return r;
    } else {
      const r = [];
      for (const n of e) {
        const i = n.trace_id ?? n.id;
        this.filteredPostUuids.has(i) || (n.id === i ? this._shouldSample() ? r.push(n) : this.filteredPostUuids.add(i) : r.push(n));
      }
      return r;
    }
  }
  async _getBatchSizeLimitBytes() {
    const e = await this._ensureServerInfo();
    return this.batchSizeBytesLimit ?? e.batch_ingest_config?.size_limit_bytes ?? Ni;
  }
  async _getMultiPartSupport() {
    return (await this._ensureServerInfo()).instance_flags?.dataset_examples_multipart_enabled ?? !1;
  }
  drainAutoBatchQueue(e) {
    const t = [];
    for (; this.autoBatchQueue.items.length > 0; ) {
      const [r, n] = this.autoBatchQueue.pop(e);
      if (!r.length) {
        n();
        break;
      }
      const i = this._processBatch(r, n).catch(console.error);
      t.push(i);
    }
    return Promise.all(t);
  }
  async _processBatch(e, t) {
    if (!e.length) {
      t();
      return;
    }
    try {
      const r = {
        runCreates: e.filter((i) => i.action === "create").map((i) => i.item),
        runUpdates: e.filter((i) => i.action === "update").map((i) => i.item)
      };
      (await this._ensureServerInfo())?.batch_ingest_config?.use_multipart_endpoint ? await this.multipartIngestRuns(r) : await this.batchIngestRuns(r);
    } finally {
      t();
    }
  }
  async processRunOperation(e) {
    clearTimeout(this.autoBatchTimeout), this.autoBatchTimeout = void 0, e.action === "create" && (e.item = Sn(e.item));
    const t = this.autoBatchQueue.push(e);
    if (this.manualFlushMode)
      return t;
    const r = await this._getBatchSizeLimitBytes();
    return this.autoBatchQueue.sizeBytes > r && this.drainAutoBatchQueue(r), this.autoBatchQueue.items.length > 0 && (this.autoBatchTimeout = setTimeout(() => {
      this.autoBatchTimeout = void 0, this.drainAutoBatchQueue(r);
    }, this.autoBatchAggregationDelayMs)), t;
  }
  async _getServerInfo() {
    const e = await O()(`${this.apiUrl}/info`, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout($i),
      ...this.fetchOptions
    });
    return await C(e, "get server info"), e.json();
  }
  async _ensureServerInfo() {
    return this._getServerInfoPromise === void 0 && (this._getServerInfoPromise = (async () => {
      if (this._serverInfo === void 0)
        try {
          this._serverInfo = await this._getServerInfo();
        } catch {
          console.warn("[WARNING]: LangSmith failed to fetch info on supported operations. Falling back to batch operations and default limits.");
        }
      return this._serverInfo ?? {};
    })()), this._getServerInfoPromise.then((e) => (this._serverInfo === void 0 && (this._getServerInfoPromise = void 0), e));
  }
  async _getSettings() {
    return this.settings || (this.settings = this._get("/settings")), await this.settings;
  }
  /**
   * Flushes current queued traces.
   */
  async flush() {
    const e = await this._getBatchSizeLimitBytes();
    await this.drainAutoBatchQueue(e);
  }
  async createRun(e) {
    if (!this._filterForSampling([e]).length)
      return;
    const t = { ...this.headers, "Content-Type": "application/json" }, r = e.project_name;
    delete e.project_name;
    const n = this.prepareRunCreateOrUpdateInputs({
      session_name: r,
      ...e,
      start_time: e.start_time ?? Date.now()
    });
    if (this.autoBatchTracing && n.trace_id !== void 0 && n.dotted_order !== void 0) {
      this.processRunOperation({
        action: "create",
        item: n
      }).catch(console.error);
      return;
    }
    const i = Sn(n), s = await this.caller.call(O(), `${this.apiUrl}/runs`, {
      method: "POST",
      headers: t,
      body: X(i),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await C(s, "create run", !0);
  }
  /**
   * Batch ingest/upsert multiple runs in the Langsmith system.
   * @param runs
   */
  async batchIngestRuns({ runCreates: e, runUpdates: t }) {
    if (e === void 0 && t === void 0)
      return;
    let r = e?.map((o) => this.prepareRunCreateOrUpdateInputs(o)) ?? [], n = t?.map((o) => this.prepareRunCreateOrUpdateInputs(o)) ?? [];
    if (r.length > 0 && n.length > 0) {
      const o = r.reduce((c, l) => (l.id && (c[l.id] = l), c), {}), u = [];
      for (const c of n)
        c.id !== void 0 && o[c.id] ? o[c.id] = {
          ...o[c.id],
          ...c
        } : u.push(c);
      r = Object.values(o), n = u;
    }
    const i = {
      post: r,
      patch: n
    };
    if (!i.post.length && !i.patch.length)
      return;
    const s = {
      post: [],
      patch: []
    };
    for (const o of ["post", "patch"]) {
      const u = o, c = i[u].reverse();
      let l = c.pop();
      for (; l !== void 0; )
        s[u].push(l), l = c.pop();
    }
    (s.post.length > 0 || s.patch.length > 0) && await this._postBatchIngestRuns(X(s));
  }
  async _postBatchIngestRuns(e) {
    const t = {
      ...this.headers,
      "Content-Type": "application/json",
      Accept: "application/json"
    }, r = await this.batchIngestCaller.call(O(), `${this.apiUrl}/runs/batch`, {
      method: "POST",
      headers: t,
      body: e,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await C(r, "batch create run", !0);
  }
  /**
   * Batch ingest/upsert multiple runs in the Langsmith system.
   * @param runs
   */
  async multipartIngestRuns({ runCreates: e, runUpdates: t }) {
    if (e === void 0 && t === void 0)
      return;
    const r = {};
    let n = [];
    for (const l of e ?? []) {
      const h = this.prepareRunCreateOrUpdateInputs(l);
      h.id !== void 0 && h.attachments !== void 0 && (r[h.id] = h.attachments), delete h.attachments, n.push(h);
    }
    let i = [];
    for (const l of t ?? [])
      i.push(this.prepareRunCreateOrUpdateInputs(l));
    if (n.find((l) => l.trace_id === void 0 || l.dotted_order === void 0) !== void 0)
      throw new Error('Multipart ingest requires "trace_id" and "dotted_order" to be set when creating a run');
    if (i.find((l) => l.trace_id === void 0 || l.dotted_order === void 0) !== void 0)
      throw new Error('Multipart ingest requires "trace_id" and "dotted_order" to be set when updating a run');
    if (n.length > 0 && i.length > 0) {
      const l = n.reduce((d, f) => (f.id && (d[f.id] = f), d), {}), h = [];
      for (const d of i)
        d.id !== void 0 && l[d.id] ? l[d.id] = {
          ...l[d.id],
          ...d
        } : h.push(d);
      n = Object.values(l), i = h;
    }
    if (n.length === 0 && i.length === 0)
      return;
    const u = [], c = [];
    for (const [l, h] of [
      ["post", n],
      ["patch", i]
    ])
      for (const d of h) {
        const { inputs: f, outputs: p, events: T, attachments: y, ...v } = d, k = { inputs: f, outputs: p, events: T }, b = X(v);
        c.push({
          name: `${l}.${v.id}`,
          payload: new Blob([b], {
            type: `application/json; length=${b.length}`
            // encoding=gzip
          })
        });
        for (const [$, x] of Object.entries(k)) {
          if (x === void 0)
            continue;
          const M = X(x);
          c.push({
            name: `${l}.${v.id}.${$}`,
            payload: new Blob([M], {
              type: `application/json; length=${M.length}`
            })
          });
        }
        if (v.id !== void 0) {
          const $ = r[v.id];
          if ($) {
            delete r[v.id];
            for (const [x, M] of Object.entries($)) {
              let D, ie;
              if (Array.isArray(M) ? [D, ie] = M : (D = M.mimeType, ie = M.data), x.includes(".")) {
                console.warn(`Skipping attachment '${x}' for run ${v.id}: Invalid attachment name. Attachment names must not contain periods ('.'). Please rename the attachment and try again.`);
                continue;
              }
              c.push({
                name: `attachment.${v.id}.${x}`,
                payload: new Blob([ie], {
                  type: `${D}; length=${ie.byteLength}`
                })
              });
            }
          }
        }
        u.push(`trace=${v.trace_id},id=${v.id}`);
      }
    await this._sendMultipartRequest(c, u.join("; "));
  }
  async _sendMultipartRequest(e, t) {
    try {
      const r = "----LangSmithFormBoundary" + Math.random().toString(36).slice(2), n = [];
      for (const u of e)
        n.push(new Blob([`--${r}\r
`])), n.push(new Blob([
          `Content-Disposition: form-data; name="${u.name}"\r
`,
          `Content-Type: ${u.payload.type}\r
\r
`
        ])), n.push(u.payload), n.push(new Blob([`\r
`]));
      n.push(new Blob([`--${r}--\r
`]));
      const s = await new Blob(n).arrayBuffer(), o = await this.batchIngestCaller.call(O(), `${this.apiUrl}/runs/multipart`, {
        method: "POST",
        headers: {
          ...this.headers,
          "Content-Type": `multipart/form-data; boundary=${r}`
        },
        body: s,
        signal: AbortSignal.timeout(this.timeout_ms),
        ...this.fetchOptions
      });
      await C(o, "ingest multipart runs", !0);
    } catch (r) {
      console.warn(`${r.message.trim()}

Context: ${t}`);
    }
  }
  async updateRun(e, t) {
    I(e), t.inputs && (t.inputs = this.processInputs(t.inputs)), t.outputs && (t.outputs = this.processOutputs(t.outputs));
    const r = { ...t, id: e };
    if (!this._filterForSampling([r], !0).length)
      return;
    if (this.autoBatchTracing && r.trace_id !== void 0 && r.dotted_order !== void 0) {
      if (t.end_time !== void 0 && r.parent_run_id === void 0 && this.blockOnRootRunFinalization && !this.manualFlushMode) {
        await this.processRunOperation({ action: "update", item: r }).catch(console.error);
        return;
      } else
        this.processRunOperation({ action: "update", item: r }).catch(console.error);
      return;
    }
    const n = { ...this.headers, "Content-Type": "application/json" }, i = await this.caller.call(O(), `${this.apiUrl}/runs/${e}`, {
      method: "PATCH",
      headers: n,
      body: X(t),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await C(i, "update run", !0);
  }
  async readRun(e, { loadChildRuns: t } = { loadChildRuns: !1 }) {
    I(e);
    let r = await this._get(`/runs/${e}`);
    return t && r.child_run_ids && (r = await this._loadChildRuns(r)), r;
  }
  async getRunUrl({ runId: e, run: t, projectOpts: r }) {
    if (t !== void 0) {
      let n;
      t.session_id ? n = t.session_id : r?.projectName ? n = (await this.readProject({ projectName: r?.projectName })).id : r?.projectId ? n = r?.projectId : n = (await this.readProject({
        projectName: Ie("PROJECT") || "default"
      })).id;
      const i = await this._getTenantId();
      return `${this.getHostUrl()}/o/${i}/projects/p/${n}/r/${t.id}?poll=true`;
    } else if (e !== void 0) {
      const n = await this.readRun(e);
      if (!n.app_path)
        throw new Error(`Run ${e} has no app_path`);
      return `${this.getHostUrl()}${n.app_path}`;
    } else
      throw new Error("Must provide either runId or run");
  }
  async _loadChildRuns(e) {
    const t = await Ci(this.listRuns({ id: e.child_run_ids })), r = {}, n = {};
    t.sort((i, s) => (i?.dotted_order ?? "").localeCompare(s?.dotted_order ?? ""));
    for (const i of t) {
      if (i.parent_run_id === null || i.parent_run_id === void 0)
        throw new Error(`Child run ${i.id} has no parent`);
      i.parent_run_id in r || (r[i.parent_run_id] = []), r[i.parent_run_id].push(i), n[i.id] = i;
    }
    e.child_runs = r[e.id] || [];
    for (const i in r)
      i !== e.id && (n[i].child_runs = r[i]);
    return e;
  }
  /**
   * List runs from the LangSmith server.
   * @param projectId - The ID of the project to filter by.
   * @param projectName - The name of the project to filter by.
   * @param parentRunId - The ID of the parent run to filter by.
   * @param traceId - The ID of the trace to filter by.
   * @param referenceExampleId - The ID of the reference example to filter by.
   * @param startTime - The start time to filter by.
   * @param isRoot - Indicates whether to only return root runs.
   * @param runType - The run type to filter by.
   * @param error - Indicates whether to filter by error runs.
   * @param id - The ID of the run to filter by.
   * @param query - The query string to filter by.
   * @param filter - The filter string to apply to the run spans.
   * @param traceFilter - The filter string to apply on the root run of the trace.
   * @param treeFilter - The filter string to apply on other runs in the trace.
   * @param limit - The maximum number of runs to retrieve.
   * @returns {AsyncIterable<Run>} - The runs.
   *
   * @example
   * // List all runs in a project
   * const projectRuns = client.listRuns({ projectName: "<your_project>" });
   *
   * @example
   * // List LLM and Chat runs in the last 24 hours
   * const todaysLLMRuns = client.listRuns({
   *   projectName: "<your_project>",
   *   start_time: new Date(Date.now() - 24 * 60 * 60 * 1000),
   *   run_type: "llm",
   * });
   *
   * @example
   * // List traces in a project
   * const rootRuns = client.listRuns({
   *   projectName: "<your_project>",
   *   execution_order: 1,
   * });
   *
   * @example
   * // List runs without errors
   * const correctRuns = client.listRuns({
   *   projectName: "<your_project>",
   *   error: false,
   * });
   *
   * @example
   * // List runs by run ID
   * const runIds = [
   *   "a36092d2-4ad5-4fb4-9c0d-0dba9a2ed836",
   *   "9398e6be-964f-4aa4-8ae9-ad78cd4b7074",
   * ];
   * const selectedRuns = client.listRuns({ run_ids: runIds });
   *
   * @example
   * // List all "chain" type runs that took more than 10 seconds and had `total_tokens` greater than 5000
   * const chainRuns = client.listRuns({
   *   projectName: "<your_project>",
   *   filter: 'and(eq(run_type, "chain"), gt(latency, 10), gt(total_tokens, 5000))',
   * });
   *
   * @example
   * // List all runs called "extractor" whose root of the trace was assigned feedback "user_score" score of 1
   * const goodExtractorRuns = client.listRuns({
   *   projectName: "<your_project>",
   *   filter: 'eq(name, "extractor")',
   *   traceFilter: 'and(eq(feedback_key, "user_score"), eq(feedback_score, 1))',
   * });
   *
   * @example
   * // List all runs that started after a specific timestamp and either have "error" not equal to null or a "Correctness" feedback score equal to 0
   * const complexRuns = client.listRuns({
   *   projectName: "<your_project>",
   *   filter: 'and(gt(start_time, "2023-07-15T12:34:56Z"), or(neq(error, null), and(eq(feedback_key, "Correctness"), eq(feedback_score, 0.0))))',
   * });
   *
   * @example
   * // List all runs where `tags` include "experimental" or "beta" and `latency` is greater than 2 seconds
   * const taggedRuns = client.listRuns({
   *   projectName: "<your_project>",
   *   filter: 'and(or(has(tags, "experimental"), has(tags, "beta")), gt(latency, 2))',
   * });
   */
  async *listRuns(e) {
    const { projectId: t, projectName: r, parentRunId: n, traceId: i, referenceExampleId: s, startTime: o, executionOrder: u, isRoot: c, runType: l, error: h, id: d, query: f, filter: p, traceFilter: T, treeFilter: y, limit: v, select: k } = e;
    let b = [];
    if (t && (b = Array.isArray(t) ? t : [t]), r) {
      const D = Array.isArray(r) ? r : [r], ie = await Promise.all(D.map((Mt) => this.readProject({ projectName: Mt }).then((Sa) => Sa.id)));
      b.push(...ie);
    }
    const $ = [
      "app_path",
      "child_run_ids",
      "completion_cost",
      "completion_tokens",
      "dotted_order",
      "end_time",
      "error",
      "events",
      "extra",
      "feedback_stats",
      "first_token_time",
      "id",
      "inputs",
      "name",
      "outputs",
      "parent_run_id",
      "parent_run_ids",
      "prompt_cost",
      "prompt_tokens",
      "reference_example_id",
      "run_type",
      "session_id",
      "start_time",
      "status",
      "tags",
      "total_cost",
      "total_tokens",
      "trace_id"
    ], x = {
      session: b.length ? b : null,
      run_type: l,
      reference_example: s,
      query: f,
      filter: p,
      trace_filter: T,
      tree_filter: y,
      execution_order: u,
      parent_run: n,
      start_time: o ? o.toISOString() : null,
      error: h,
      id: d,
      limit: v,
      trace: i,
      select: k || $,
      is_root: c
    };
    let M = 0;
    for await (const D of this._getCursorPaginatedList("/runs/query", x))
      if (v) {
        if (M >= v)
          break;
        if (D.length + M > v) {
          yield* D.slice(0, v - M);
          break;
        }
        M += D.length, yield* D;
      } else
        yield* D;
  }
  async getRunStats({ id: e, trace: t, parentRun: r, runType: n, projectNames: i, projectIds: s, referenceExampleIds: o, startTime: u, endTime: c, error: l, query: h, filter: d, traceFilter: f, treeFilter: p, isRoot: T, dataSourceType: y }) {
    let v = s || [];
    i && (v = [
      ...s || [],
      ...await Promise.all(i.map((M) => this.readProject({ projectName: M }).then((D) => D.id)))
    ]);
    const b = Object.fromEntries(Object.entries({
      id: e,
      trace: t,
      parent_run: r,
      run_type: n,
      session: v,
      reference_example: o,
      start_time: u,
      end_time: c,
      error: l,
      query: h,
      filter: d,
      trace_filter: f,
      tree_filter: p,
      is_root: T,
      data_source_type: y
    }).filter(([M, D]) => D !== void 0));
    return await (await this.caller.call(O(), `${this.apiUrl}/runs/stats`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(b),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    })).json();
  }
  async shareRun(e, { shareId: t } = {}) {
    const r = {
      run_id: e,
      share_token: t || W()
    };
    I(e);
    const i = await (await this.caller.call(O(), `${this.apiUrl}/runs/${e}/share`, {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(r),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    })).json();
    if (i === null || !("share_token" in i))
      throw new Error("Invalid response from server");
    return `${this.getHostUrl()}/public/${i.share_token}/r`;
  }
  async unshareRun(e) {
    I(e);
    const t = await this.caller.call(O(), `${this.apiUrl}/runs/${e}/share`, {
      method: "DELETE",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await C(t, "unshare run", !0);
  }
  async readRunSharedLink(e) {
    I(e);
    const r = await (await this.caller.call(O(), `${this.apiUrl}/runs/${e}/share`, {
      method: "GET",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    })).json();
    if (!(r === null || !("share_token" in r)))
      return `${this.getHostUrl()}/public/${r.share_token}/r`;
  }
  async listSharedRuns(e, { runIds: t } = {}) {
    const r = new URLSearchParams({
      share_token: e
    });
    if (t !== void 0)
      for (const s of t)
        r.append("id", s);
    return I(e), await (await this.caller.call(O(), `${this.apiUrl}/public/${e}/runs${r}`, {
      method: "GET",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    })).json();
  }
  async readDatasetSharedSchema(e, t) {
    if (!e && !t)
      throw new Error("Either datasetId or datasetName must be given");
    e || (e = (await this.readDataset({ datasetName: t })).id), I(e);
    const n = await (await this.caller.call(O(), `${this.apiUrl}/datasets/${e}/share`, {
      method: "GET",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    })).json();
    return n.url = `${this.getHostUrl()}/public/${n.share_token}/d`, n;
  }
  async shareDataset(e, t) {
    if (!e && !t)
      throw new Error("Either datasetId or datasetName must be given");
    e || (e = (await this.readDataset({ datasetName: t })).id);
    const r = {
      dataset_id: e
    };
    I(e);
    const i = await (await this.caller.call(O(), `${this.apiUrl}/datasets/${e}/share`, {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(r),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    })).json();
    return i.url = `${this.getHostUrl()}/public/${i.share_token}/d`, i;
  }
  async unshareDataset(e) {
    I(e);
    const t = await this.caller.call(O(), `${this.apiUrl}/datasets/${e}/share`, {
      method: "DELETE",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await C(t, "unshare dataset", !0);
  }
  async readSharedDataset(e) {
    return I(e), await (await this.caller.call(O(), `${this.apiUrl}/public/${e}/datasets`, {
      method: "GET",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    })).json();
  }
  /**
   * Get shared examples.
   *
   * @param {string} shareToken The share token to get examples for. A share token is the UUID (or LangSmith URL, including UUID) generated when explicitly marking an example as public.
   * @param {Object} [options] Additional options for listing the examples.
   * @param {string[] | undefined} [options.exampleIds] A list of example IDs to filter by.
   * @returns {Promise<Example[]>} The shared examples.
   */
  async listSharedExamples(e, t) {
    const r = {};
    t?.exampleIds && (r.id = t.exampleIds);
    const n = new URLSearchParams();
    Object.entries(r).forEach(([o, u]) => {
      Array.isArray(u) ? u.forEach((c) => n.append(o, c)) : n.append(o, u);
    });
    const i = await this.caller.call(O(), `${this.apiUrl}/public/${e}/examples?${n.toString()}`, {
      method: "GET",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    }), s = await i.json();
    if (!i.ok)
      throw "detail" in s ? new Error(`Failed to list shared examples.
Status: ${i.status}
Message: ${s.detail.join(`
`)}`) : new Error(`Failed to list shared examples: ${i.status} ${i.statusText}`);
    return s.map((o) => ({
      ...o,
      _hostUrl: this.getHostUrl()
    }));
  }
  async createProject({ projectName: e, description: t = null, metadata: r = null, upsert: n = !1, projectExtra: i = null, referenceDatasetId: s = null }) {
    const o = n ? "?upsert=true" : "", u = `${this.apiUrl}/sessions${o}`, c = i || {};
    r && (c.metadata = r);
    const l = {
      name: e,
      extra: c,
      description: t
    };
    s !== null && (l.reference_dataset_id = s);
    const h = await this.caller.call(O(), u, {
      method: "POST",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify(l),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    return await C(h, "create project"), await h.json();
  }
  async updateProject(e, { name: t = null, description: r = null, metadata: n = null, projectExtra: i = null, endTime: s = null }) {
    const o = `${this.apiUrl}/sessions/${e}`;
    let u = i;
    n && (u = { ...u || {}, metadata: n });
    const c = {
      name: t,
      extra: u,
      description: r,
      end_time: s ? new Date(s).toISOString() : null
    }, l = await this.caller.call(O(), o, {
      method: "PATCH",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify(c),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    return await C(l, "update project"), await l.json();
  }
  async hasProject({ projectId: e, projectName: t }) {
    let r = "/sessions";
    const n = new URLSearchParams();
    if (e !== void 0 && t !== void 0)
      throw new Error("Must provide either projectName or projectId, not both");
    if (e !== void 0)
      I(e), r += `/${e}`;
    else if (t !== void 0)
      n.append("name", t);
    else
      throw new Error("Must provide projectName or projectId");
    const i = await this.caller.call(O(), `${this.apiUrl}${r}?${n}`, {
      method: "GET",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    try {
      const s = await i.json();
      return i.ok ? Array.isArray(s) ? s.length > 0 : !0 : !1;
    } catch {
      return !1;
    }
  }
  async readProject({ projectId: e, projectName: t, includeStats: r }) {
    let n = "/sessions";
    const i = new URLSearchParams();
    if (e !== void 0 && t !== void 0)
      throw new Error("Must provide either projectName or projectId, not both");
    if (e !== void 0)
      I(e), n += `/${e}`;
    else if (t !== void 0)
      i.append("name", t);
    else
      throw new Error("Must provide projectName or projectId");
    r !== void 0 && i.append("include_stats", r.toString());
    const s = await this._get(n, i);
    let o;
    if (Array.isArray(s)) {
      if (s.length === 0)
        throw new Error(`Project[id=${e}, name=${t}] not found`);
      o = s[0];
    } else
      o = s;
    return o;
  }
  async getProjectUrl({ projectId: e, projectName: t }) {
    if (e === void 0 && t === void 0)
      throw new Error("Must provide either projectName or projectId");
    const r = await this.readProject({ projectId: e, projectName: t }), n = await this._getTenantId();
    return `${this.getHostUrl()}/o/${n}/projects/p/${r.id}`;
  }
  async getDatasetUrl({ datasetId: e, datasetName: t }) {
    if (e === void 0 && t === void 0)
      throw new Error("Must provide either datasetName or datasetId");
    const r = await this.readDataset({ datasetId: e, datasetName: t }), n = await this._getTenantId();
    return `${this.getHostUrl()}/o/${n}/datasets/${r.id}`;
  }
  async _getTenantId() {
    if (this._tenantId !== null)
      return this._tenantId;
    const e = new URLSearchParams({ limit: "1" });
    for await (const t of this._getPaginated("/sessions", e))
      return this._tenantId = t[0].tenant_id, t[0].tenant_id;
    throw new Error("No projects found to resolve tenant.");
  }
  async *listProjects({ projectIds: e, name: t, nameContains: r, referenceDatasetId: n, referenceDatasetName: i, referenceFree: s, metadata: o } = {}) {
    const u = new URLSearchParams();
    if (e !== void 0)
      for (const c of e)
        u.append("id", c);
    if (t !== void 0 && u.append("name", t), r !== void 0 && u.append("name_contains", r), n !== void 0)
      u.append("reference_dataset", n);
    else if (i !== void 0) {
      const c = await this.readDataset({
        datasetName: i
      });
      u.append("reference_dataset", c.id);
    }
    s !== void 0 && u.append("reference_free", s.toString()), o !== void 0 && u.append("metadata", JSON.stringify(o));
    for await (const c of this._getPaginated("/sessions", u))
      yield* c;
  }
  async deleteProject({ projectId: e, projectName: t }) {
    let r;
    if (e === void 0 && t === void 0)
      throw new Error("Must provide projectName or projectId");
    if (e !== void 0 && t !== void 0)
      throw new Error("Must provide either projectName or projectId, not both");
    e === void 0 ? r = (await this.readProject({ projectName: t })).id : r = e, I(r);
    const n = await this.caller.call(O(), `${this.apiUrl}/sessions/${r}`, {
      method: "DELETE",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await C(n, `delete session ${r} (${t})`, !0);
  }
  async uploadCsv({ csvFile: e, fileName: t, inputKeys: r, outputKeys: n, description: i, dataType: s, name: o }) {
    const u = `${this.apiUrl}/datasets/upload`, c = new FormData();
    c.append("file", e, t), r.forEach((d) => {
      c.append("input_keys", d);
    }), n.forEach((d) => {
      c.append("output_keys", d);
    }), i && c.append("description", i), s && c.append("data_type", s), o && c.append("name", o);
    const l = await this.caller.call(O(), u, {
      method: "POST",
      headers: this.headers,
      body: c,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    return await C(l, "upload CSV"), await l.json();
  }
  async createDataset(e, { description: t, dataType: r, inputsSchema: n, outputsSchema: i, metadata: s } = {}) {
    const o = {
      name: e,
      description: t,
      extra: s ? { metadata: s } : void 0
    };
    r && (o.data_type = r), n && (o.inputs_schema_definition = n), i && (o.outputs_schema_definition = i);
    const u = await this.caller.call(O(), `${this.apiUrl}/datasets`, {
      method: "POST",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify(o),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    return await C(u, "create dataset"), await u.json();
  }
  async readDataset({ datasetId: e, datasetName: t }) {
    let r = "/datasets";
    const n = new URLSearchParams({ limit: "1" });
    if (e !== void 0 && t !== void 0)
      throw new Error("Must provide either datasetName or datasetId, not both");
    if (e !== void 0)
      I(e), r += `/${e}`;
    else if (t !== void 0)
      n.append("name", t);
    else
      throw new Error("Must provide datasetName or datasetId");
    const i = await this._get(r, n);
    let s;
    if (Array.isArray(i)) {
      if (i.length === 0)
        throw new Error(`Dataset[id=${e}, name=${t}] not found`);
      s = i[0];
    } else
      s = i;
    return s;
  }
  async hasDataset({ datasetId: e, datasetName: t }) {
    try {
      return await this.readDataset({ datasetId: e, datasetName: t }), !0;
    } catch (r) {
      if (
        // eslint-disable-next-line no-instanceof/no-instanceof
        r instanceof Error && r.message.toLocaleLowerCase().includes("not found")
      )
        return !1;
      throw r;
    }
  }
  async diffDatasetVersions({ datasetId: e, datasetName: t, fromVersion: r, toVersion: n }) {
    let i = e;
    if (i === void 0 && t === void 0)
      throw new Error("Must provide either datasetName or datasetId");
    if (i !== void 0 && t !== void 0)
      throw new Error("Must provide either datasetName or datasetId, not both");
    i === void 0 && (i = (await this.readDataset({ datasetName: t })).id);
    const s = new URLSearchParams({
      from_version: typeof r == "string" ? r : r.toISOString(),
      to_version: typeof n == "string" ? n : n.toISOString()
    });
    return await this._get(`/datasets/${i}/versions/diff`, s);
  }
  async readDatasetOpenaiFinetuning({ datasetId: e, datasetName: t }) {
    const r = "/datasets";
    if (e === void 0) if (t !== void 0)
      e = (await this.readDataset({ datasetName: t })).id;
    else
      throw new Error("Must provide either datasetName or datasetId");
    return (await (await this._getResponse(`${r}/${e}/openai_ft`)).text()).trim().split(`
`).map((o) => JSON.parse(o));
  }
  async *listDatasets({ limit: e = 100, offset: t = 0, datasetIds: r, datasetName: n, datasetNameContains: i, metadata: s } = {}) {
    const o = "/datasets", u = new URLSearchParams({
      limit: e.toString(),
      offset: t.toString()
    });
    if (r !== void 0)
      for (const c of r)
        u.append("id", c);
    n !== void 0 && u.append("name", n), i !== void 0 && u.append("name_contains", i), s !== void 0 && u.append("metadata", JSON.stringify(s));
    for await (const c of this._getPaginated(o, u))
      yield* c;
  }
  /**
   * Update a dataset
   * @param props The dataset details to update
   * @returns The updated dataset
   */
  async updateDataset(e) {
    const { datasetId: t, datasetName: r, ...n } = e;
    if (!t && !r)
      throw new Error("Must provide either datasetName or datasetId");
    const i = t ?? (await this.readDataset({ datasetName: r })).id;
    I(i);
    const s = await this.caller.call(O(), `${this.apiUrl}/datasets/${i}`, {
      method: "PATCH",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify(n),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    return await C(s, "update dataset"), await s.json();
  }
  /**
   * Updates a tag on a dataset.
   *
   * If the tag is already assigned to a different version of this dataset,
   * the tag will be moved to the new version. The as_of parameter is used to
   * determine which version of the dataset to apply the new tags to.
   *
   * It must be an exact version of the dataset to succeed. You can
   * use the "readDatasetVersion" method to find the exact version
   * to apply the tags to.
   * @param params.datasetId The ID of the dataset to update. Must be provided if "datasetName" is not provided.
   * @param params.datasetName The name of the dataset to update. Must be provided if "datasetId" is not provided.
   * @param params.asOf The timestamp of the dataset to apply the new tags to.
   * @param params.tag The new tag to apply to the dataset.
   */
  async updateDatasetTag(e) {
    const { datasetId: t, datasetName: r, asOf: n, tag: i } = e;
    if (!t && !r)
      throw new Error("Must provide either datasetName or datasetId");
    const s = t ?? (await this.readDataset({ datasetName: r })).id;
    I(s);
    const o = await this.caller.call(O(), `${this.apiUrl}/datasets/${s}/tags`, {
      method: "PUT",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify({
        as_of: typeof n == "string" ? n : n.toISOString(),
        tag: i
      }),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await C(o, "update dataset tags");
  }
  async deleteDataset({ datasetId: e, datasetName: t }) {
    let r = "/datasets", n = e;
    if (e !== void 0 && t !== void 0)
      throw new Error("Must provide either datasetName or datasetId, not both");
    if (t !== void 0 && (n = (await this.readDataset({ datasetName: t })).id), n !== void 0)
      I(n), r += `/${n}`;
    else
      throw new Error("Must provide datasetName or datasetId");
    const i = await this.caller.call(O(), this.apiUrl + r, {
      method: "DELETE",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await C(i, `delete ${r}`), await i.json();
  }
  async indexDataset({ datasetId: e, datasetName: t, tag: r }) {
    let n = e;
    if (!n && !t)
      throw new Error("Must provide either datasetName or datasetId");
    if (n && t)
      throw new Error("Must provide either datasetName or datasetId, not both");
    n || (n = (await this.readDataset({ datasetName: t })).id), I(n);
    const i = {
      tag: r
    }, s = await this.caller.call(O(), `${this.apiUrl}/datasets/${n}/index`, {
      method: "POST",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify(i),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await C(s, "index dataset"), await s.json();
  }
  /**
   * Lets you run a similarity search query on a dataset.
   *
   * Requires the dataset to be indexed. Please see the `indexDataset` method to set up indexing.
   *
   * @param inputs      The input on which to run the similarity search. Must have the
   *                    same schema as the dataset.
   *
   * @param datasetId   The dataset to search for similar examples.
   *
   * @param limit       The maximum number of examples to return. Will return the top `limit` most
   *                    similar examples in order of most similar to least similar. If no similar
   *                    examples are found, random examples will be returned.
   *
   * @param filter      A filter string to apply to the search. Only examples will be returned that
   *                    match the filter string. Some examples of filters
   *
   *                    - eq(metadata.mykey, "value")
   *                    - and(neq(metadata.my.nested.key, "value"), neq(metadata.mykey, "value"))
   *                    - or(eq(metadata.mykey, "value"), eq(metadata.mykey, "othervalue"))
   *
   * @returns           A list of similar examples.
   *
   *
   * @example
   * dataset_id = "123e4567-e89b-12d3-a456-426614174000"
   * inputs = {"text": "How many people live in Berlin?"}
   * limit = 5
   * examples = await client.similarExamples(inputs, dataset_id, limit)
   */
  async similarExamples(e, t, r, { filter: n } = {}) {
    const i = {
      limit: r,
      inputs: e
    };
    n !== void 0 && (i.filter = n), I(t);
    const s = await this.caller.call(O(), `${this.apiUrl}/datasets/${t}/search`, {
      method: "POST",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify(i),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    return await C(s, "fetch similar examples"), (await s.json()).examples;
  }
  async createExample(e, t, r) {
    if (xn(e) && (t !== void 0 || r !== void 0))
      throw new Error("Cannot provide outputs or options when using ExampleCreate object");
    let n = t ? r?.datasetId : e.dataset_id;
    const i = t ? r?.datasetName : e.dataset_name;
    if (n === void 0 && i === void 0)
      throw new Error("Must provide either datasetName or datasetId");
    if (n !== void 0 && i !== void 0)
      throw new Error("Must provide either datasetName or datasetId, not both");
    n === void 0 && (n = (await this.readDataset({ datasetName: i })).id);
    const s = (t ? r?.createdAt : e.created_at) || /* @__PURE__ */ new Date();
    let o;
    xn(e) ? o = e : o = {
      inputs: e,
      outputs: t,
      created_at: s?.toISOString(),
      id: r?.exampleId,
      metadata: r?.metadata,
      split: r?.split,
      source_run_id: r?.sourceRunId,
      use_source_run_io: r?.useSourceRunIO,
      use_source_run_attachments: r?.useSourceRunAttachments,
      attachments: r?.attachments
    };
    const u = await this._uploadExamplesMultipart(n, [o]);
    return await this.readExample(u.example_ids?.[0] ?? W());
  }
  async createExamples(e) {
    if (Array.isArray(e)) {
      if (e.length === 0)
        return [];
      const k = e;
      let b = k[0].dataset_id;
      const $ = k[0].dataset_name;
      if (b === void 0 && $ === void 0)
        throw new Error("Must provide either datasetName or datasetId");
      if (b !== void 0 && $ !== void 0)
        throw new Error("Must provide either datasetName or datasetId, not both");
      b === void 0 && (b = (await this.readDataset({ datasetName: $ })).id);
      const x = await this._uploadExamplesMultipart(b, k);
      return await Promise.all(x.example_ids.map((D) => this.readExample(D)));
    }
    const { inputs: t, outputs: r, metadata: n, splits: i, sourceRunIds: s, useSourceRunIOs: o, useSourceRunAttachments: u, attachments: c, exampleIds: l, datasetId: h, datasetName: d } = e;
    if (t === void 0)
      throw new Error("Must provide inputs when using legacy parameters");
    let f = h;
    const p = d;
    if (f === void 0 && p === void 0)
      throw new Error("Must provide either datasetName or datasetId");
    if (f !== void 0 && p !== void 0)
      throw new Error("Must provide either datasetName or datasetId, not both");
    f === void 0 && (f = (await this.readDataset({ datasetName: p })).id);
    const T = t.map((k, b) => ({
      dataset_id: f,
      inputs: k,
      outputs: r?.[b],
      metadata: n?.[b],
      split: i?.[b],
      id: l?.[b],
      attachments: c?.[b],
      source_run_id: s?.[b],
      use_source_run_io: o?.[b],
      use_source_run_attachments: u?.[b]
    })), y = await this._uploadExamplesMultipart(f, T);
    return await Promise.all(y.example_ids.map((k) => this.readExample(k)));
  }
  async createLLMExample(e, t, r) {
    return this.createExample({ input: e }, { output: t }, r);
  }
  async createChatExample(e, t, r) {
    const n = e.map((s) => vn(s) ? En(s) : s), i = vn(t) ? En(t) : t;
    return this.createExample({ input: n }, { output: i }, r);
  }
  async readExample(e) {
    I(e);
    const t = `/examples/${e}`, r = await this._get(t), { attachment_urls: n, ...i } = r, s = i;
    return n && (s.attachments = Object.entries(n).reduce((o, [u, c]) => (o[u.slice(11)] = {
      presigned_url: c.presigned_url,
      mime_type: c.mime_type
    }, o), {})), s;
  }
  async *listExamples({ datasetId: e, datasetName: t, exampleIds: r, asOf: n, splits: i, inlineS3Urls: s, metadata: o, limit: u, offset: c, filter: l, includeAttachments: h } = {}) {
    let d;
    if (e !== void 0 && t !== void 0)
      throw new Error("Must provide either datasetName or datasetId, not both");
    if (e !== void 0)
      d = e;
    else if (t !== void 0)
      d = (await this.readDataset({ datasetName: t })).id;
    else
      throw new Error("Must provide a datasetName or datasetId");
    const f = new URLSearchParams({ dataset: d }), p = n ? typeof n == "string" ? n : n?.toISOString() : void 0;
    p && f.append("as_of", p);
    const T = s ?? !0;
    if (f.append("inline_s3_urls", T.toString()), r !== void 0)
      for (const v of r)
        f.append("id", v);
    if (i !== void 0)
      for (const v of i)
        f.append("splits", v);
    if (o !== void 0) {
      const v = JSON.stringify(o);
      f.append("metadata", v);
    }
    u !== void 0 && f.append("limit", u.toString()), c !== void 0 && f.append("offset", c.toString()), l !== void 0 && f.append("filter", l), h === !0 && ["attachment_urls", "outputs", "metadata"].forEach((v) => f.append("select", v));
    let y = 0;
    for await (const v of this._getPaginated("/examples", f)) {
      for (const k of v) {
        const { attachment_urls: b, ...$ } = k, x = $;
        b && (x.attachments = Object.entries(b).reduce((M, [D, ie]) => (M[D.slice(11)] = {
          presigned_url: ie.presigned_url,
          mime_type: ie.mime_type || void 0
        }, M), {})), yield x, y++;
      }
      if (u !== void 0 && y >= u)
        break;
    }
  }
  async deleteExample(e) {
    I(e);
    const t = `/examples/${e}`, r = await this.caller.call(O(), this.apiUrl + t, {
      method: "DELETE",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await C(r, `delete ${t}`), await r.json();
  }
  async updateExample(e, t) {
    let r;
    t ? r = e : r = e.id, I(r);
    let n;
    t ? n = { id: r, ...t } : n = e;
    let i;
    return n.dataset_id !== void 0 ? i = n.dataset_id : i = (await this.readExample(r)).dataset_id, this._updateExamplesMultipart(i, [n]);
  }
  async updateExamples(e) {
    let t;
    return e[0].dataset_id === void 0 ? t = (await this.readExample(e[0].id)).dataset_id : t = e[0].dataset_id, this._updateExamplesMultipart(t, e);
  }
  /**
   * Get dataset version by closest date or exact tag.
   *
   * Use this to resolve the nearest version to a given timestamp or for a given tag.
   *
   * @param options The options for getting the dataset version
   * @param options.datasetId The ID of the dataset
   * @param options.datasetName The name of the dataset
   * @param options.asOf The timestamp of the dataset to retrieve
   * @param options.tag The tag of the dataset to retrieve
   * @returns The dataset version
   */
  async readDatasetVersion({ datasetId: e, datasetName: t, asOf: r, tag: n }) {
    let i;
    if (e ? i = e : i = (await this.readDataset({ datasetName: t })).id, I(i), r && n || !r && !n)
      throw new Error("Exactly one of asOf and tag must be specified.");
    const s = new URLSearchParams();
    r !== void 0 && s.append("as_of", typeof r == "string" ? r : r.toISOString()), n !== void 0 && s.append("tag", n);
    const o = await this.caller.call(O(), `${this.apiUrl}/datasets/${i}/version?${s.toString()}`, {
      method: "GET",
      headers: { ...this.headers },
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    return await C(o, "read dataset version"), await o.json();
  }
  async listDatasetSplits({ datasetId: e, datasetName: t, asOf: r }) {
    let n;
    if (e === void 0 && t === void 0)
      throw new Error("Must provide dataset name or ID");
    if (e !== void 0 && t !== void 0)
      throw new Error("Must provide either datasetName or datasetId, not both");
    e === void 0 ? n = (await this.readDataset({ datasetName: t })).id : n = e, I(n);
    const i = new URLSearchParams(), s = r ? typeof r == "string" ? r : r?.toISOString() : void 0;
    return s && i.append("as_of", s), await this._get(`/datasets/${n}/splits`, i);
  }
  async updateDatasetSplits({ datasetId: e, datasetName: t, splitName: r, exampleIds: n, remove: i = !1 }) {
    let s;
    if (e === void 0 && t === void 0)
      throw new Error("Must provide dataset name or ID");
    if (e !== void 0 && t !== void 0)
      throw new Error("Must provide either datasetName or datasetId, not both");
    e === void 0 ? s = (await this.readDataset({ datasetName: t })).id : s = e, I(s);
    const o = {
      split_name: r,
      examples: n.map((c) => (I(c), c)),
      remove: i
    }, u = await this.caller.call(O(), `${this.apiUrl}/datasets/${s}/splits`, {
      method: "PUT",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify(o),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await C(u, "update dataset splits", !0);
  }
  /**
   * @deprecated This method is deprecated and will be removed in future LangSmith versions, use `evaluate` from `langsmith/evaluation` instead.
   */
  async evaluateRun(e, t, { sourceInfo: r, loadChildRuns: n, referenceExample: i } = { loadChildRuns: !1 }) {
    Xn("This method is deprecated and will be removed in future LangSmith versions, use `evaluate` from `langsmith/evaluation` instead.");
    let s;
    if (typeof e == "string")
      s = await this.readRun(e, { loadChildRuns: n });
    else if (typeof e == "object" && "id" in e)
      s = e;
    else
      throw new Error(`Invalid run type: ${typeof e}`);
    s.reference_example_id !== null && s.reference_example_id !== void 0 && (i = await this.readExample(s.reference_example_id));
    const o = await t.evaluateRun(s, i), [u, c] = await this._logEvaluationFeedback(o, s, r);
    return c[0];
  }
  async createFeedback(e, t, { score: r, value: n, correction: i, comment: s, sourceInfo: o, feedbackSourceType: u = "api", sourceRunId: c, feedbackId: l, feedbackConfig: h, projectId: d, comparativeExperimentId: f }) {
    if (!e && !d)
      throw new Error("One of runId or projectId must be provided");
    if (e && d)
      throw new Error("Only one of runId or projectId can be provided");
    const p = {
      type: u ?? "api",
      metadata: o ?? {}
    };
    c !== void 0 && p?.metadata !== void 0 && !p.metadata.__run && (p.metadata.__run = { run_id: c }), p?.metadata !== void 0 && p.metadata.__run?.run_id !== void 0 && I(p.metadata.__run.run_id);
    const T = {
      id: l ?? W(),
      run_id: e,
      key: t,
      score: kn(r),
      value: n,
      correction: i,
      comment: s,
      feedback_source: p,
      comparative_experiment_id: f,
      feedbackConfig: h,
      session_id: d
    }, y = `${this.apiUrl}/feedback`, v = await this.caller.call(O(), y, {
      method: "POST",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify(T),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    return await C(v, "create feedback", !0), T;
  }
  async updateFeedback(e, { score: t, value: r, correction: n, comment: i }) {
    const s = {};
    t != null && (s.score = kn(t)), r != null && (s.value = r), n != null && (s.correction = n), i != null && (s.comment = i), I(e);
    const o = await this.caller.call(O(), `${this.apiUrl}/feedback/${e}`, {
      method: "PATCH",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify(s),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await C(o, "update feedback", !0);
  }
  async readFeedback(e) {
    I(e);
    const t = `/feedback/${e}`;
    return await this._get(t);
  }
  async deleteFeedback(e) {
    I(e);
    const t = `/feedback/${e}`, r = await this.caller.call(O(), this.apiUrl + t, {
      method: "DELETE",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await C(r, `delete ${t}`), await r.json();
  }
  async *listFeedback({ runIds: e, feedbackKeys: t, feedbackSourceTypes: r } = {}) {
    const n = new URLSearchParams();
    if (e && n.append("run", e.join(",")), t)
      for (const i of t)
        n.append("key", i);
    if (r)
      for (const i of r)
        n.append("source", i);
    for await (const i of this._getPaginated("/feedback", n))
      yield* i;
  }
  /**
   * Creates a presigned feedback token and URL.
   *
   * The token can be used to authorize feedback metrics without
   * needing an API key. This is useful for giving browser-based
   * applications the ability to submit feedback without needing
   * to expose an API key.
   *
   * @param runId The ID of the run.
   * @param feedbackKey The feedback key.
   * @param options Additional options for the token.
   * @param options.expiration The expiration time for the token.
   *
   * @returns A promise that resolves to a FeedbackIngestToken.
   */
  async createPresignedFeedbackToken(e, t, { expiration: r, feedbackConfig: n } = {}) {
    const i = {
      run_id: e,
      feedback_key: t,
      feedback_config: n
    };
    return r ? typeof r == "string" ? i.expires_at = r : (r?.hours || r?.minutes || r?.days) && (i.expires_in = r) : i.expires_in = {
      hours: 3
    }, await (await this.caller.call(O(), `${this.apiUrl}/feedback/tokens`, {
      method: "POST",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify(i),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    })).json();
  }
  async createComparativeExperiment({ name: e, experimentIds: t, referenceDatasetId: r, createdAt: n, description: i, metadata: s, id: o }) {
    if (t.length === 0)
      throw new Error("At least one experiment is required");
    if (r || (r = (await this.readProject({
      projectId: t[0]
    })).reference_dataset_id), !r == null)
      throw new Error("A reference dataset is required");
    const u = {
      id: o,
      name: e,
      experiment_ids: t,
      reference_dataset_id: r,
      description: i,
      created_at: (n ?? /* @__PURE__ */ new Date())?.toISOString(),
      extra: {}
    };
    return s && (u.extra.metadata = s), await (await this.caller.call(O(), `${this.apiUrl}/datasets/comparative`, {
      method: "POST",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify(u),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    })).json();
  }
  /**
   * Retrieves a list of presigned feedback tokens for a given run ID.
   * @param runId The ID of the run.
   * @returns An async iterable of FeedbackIngestToken objects.
   */
  async *listPresignedFeedbackTokens(e) {
    I(e);
    const t = new URLSearchParams({ run_id: e });
    for await (const r of this._getPaginated("/feedback/tokens", t))
      yield* r;
  }
  _selectEvalResults(e) {
    let t;
    return "results" in e ? t = e.results : Array.isArray(e) ? t = e : t = [e], t;
  }
  async _logEvaluationFeedback(e, t, r) {
    const n = this._selectEvalResults(e), i = [];
    for (const s of n) {
      let o = r || {};
      s.evaluatorInfo && (o = { ...s.evaluatorInfo, ...o });
      let u = null;
      s.targetRunId ? u = s.targetRunId : t && (u = t.id), i.push(await this.createFeedback(u, s.key, {
        score: s.score,
        value: s.value,
        comment: s.comment,
        correction: s.correction,
        sourceInfo: o,
        sourceRunId: s.sourceRunId,
        feedbackConfig: s.feedbackConfig,
        feedbackSourceType: "model"
      }));
    }
    return [n, i];
  }
  async logEvaluationFeedback(e, t, r) {
    const [n] = await this._logEvaluationFeedback(e, t, r);
    return n;
  }
  /**
   * API for managing annotation queues
   */
  /**
   * List the annotation queues on the LangSmith API.
   * @param options - The options for listing annotation queues
   * @param options.queueIds - The IDs of the queues to filter by
   * @param options.name - The name of the queue to filter by
   * @param options.nameContains - The substring that the queue name should contain
   * @param options.limit - The maximum number of queues to return
   * @returns An iterator of AnnotationQueue objects
   */
  async *listAnnotationQueues(e = {}) {
    const { queueIds: t, name: r, nameContains: n, limit: i } = e, s = new URLSearchParams();
    t && t.forEach((u, c) => {
      I(u, `queueIds[${c}]`), s.append("ids", u);
    }), r && s.append("name", r), n && s.append("name_contains", n), s.append("limit", (i !== void 0 ? Math.min(i, 100) : 100).toString());
    let o = 0;
    for await (const u of this._getPaginated("/annotation-queues", s))
      if (yield* u, o++, i !== void 0 && o >= i)
        break;
  }
  /**
   * Create an annotation queue on the LangSmith API.
   * @param options - The options for creating an annotation queue
   * @param options.name - The name of the annotation queue
   * @param options.description - The description of the annotation queue
   * @param options.queueId - The ID of the annotation queue
   * @returns The created AnnotationQueue object
   */
  async createAnnotationQueue(e) {
    const { name: t, description: r, queueId: n } = e, i = {
      name: t,
      description: r,
      id: n || W()
    }, s = await this.caller.call(O(), `${this.apiUrl}/annotation-queues`, {
      method: "POST",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(Object.entries(i).filter(([u, c]) => c !== void 0))),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    return await C(s, "create annotation queue"), await s.json();
  }
  /**
   * Read an annotation queue with the specified queue ID.
   * @param queueId - The ID of the annotation queue to read
   * @returns The AnnotationQueue object
   */
  async readAnnotationQueue(e) {
    const t = await this.listAnnotationQueues({
      queueIds: [e]
    }).next();
    if (t.done)
      throw new Error(`Annotation queue with ID ${e} not found`);
    return t.value;
  }
  /**
   * Update an annotation queue with the specified queue ID.
   * @param queueId - The ID of the annotation queue to update
   * @param options - The options for updating the annotation queue
   * @param options.name - The new name for the annotation queue
   * @param options.description - The new description for the annotation queue
   */
  async updateAnnotationQueue(e, t) {
    const { name: r, description: n } = t, i = await this.caller.call(O(), `${this.apiUrl}/annotation-queues/${I(e, "queueId")}`, {
      method: "PATCH",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify({ name: r, description: n }),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await C(i, "update annotation queue");
  }
  /**
   * Delete an annotation queue with the specified queue ID.
   * @param queueId - The ID of the annotation queue to delete
   */
  async deleteAnnotationQueue(e) {
    const t = await this.caller.call(O(), `${this.apiUrl}/annotation-queues/${I(e, "queueId")}`, {
      method: "DELETE",
      headers: { ...this.headers, Accept: "application/json" },
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await C(t, "delete annotation queue");
  }
  /**
   * Add runs to an annotation queue with the specified queue ID.
   * @param queueId - The ID of the annotation queue
   * @param runIds - The IDs of the runs to be added to the annotation queue
   */
  async addRunsToAnnotationQueue(e, t) {
    const r = await this.caller.call(O(), `${this.apiUrl}/annotation-queues/${I(e, "queueId")}/runs`, {
      method: "POST",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify(t.map((n, i) => I(n, `runIds[${i}]`).toString())),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await C(r, "add runs to annotation queue");
  }
  /**
   * Get a run from an annotation queue at the specified index.
   * @param queueId - The ID of the annotation queue
   * @param index - The index of the run to retrieve
   * @returns A Promise that resolves to a RunWithAnnotationQueueInfo object
   * @throws {Error} If the run is not found at the given index or for other API-related errors
   */
  async getRunFromAnnotationQueue(e, t) {
    const r = `/annotation-queues/${I(e, "queueId")}/run`, n = await this.caller.call(O(), `${this.apiUrl}${r}/${t}`, {
      method: "GET",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    return await C(n, "get run from annotation queue"), await n.json();
  }
  /**
   * Delete a run from an an annotation queue.
   * @param queueId - The ID of the annotation queue to delete the run from
   * @param queueRunId - The ID of the run to delete from the annotation queue
   */
  async deleteRunFromAnnotationQueue(e, t) {
    const r = await this.caller.call(O(), `${this.apiUrl}/annotation-queues/${I(e, "queueId")}/runs/${I(t, "queueRunId")}`, {
      method: "DELETE",
      headers: { ...this.headers, Accept: "application/json" },
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await C(r, "delete run from annotation queue");
  }
  /**
   * Get the size of an annotation queue.
   * @param queueId - The ID of the annotation queue
   */
  async getSizeFromAnnotationQueue(e) {
    const t = await this.caller.call(O(), `${this.apiUrl}/annotation-queues/${I(e, "queueId")}/size`, {
      method: "GET",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    return await C(t, "get size from annotation queue"), await t.json();
  }
  async _currentTenantIsOwner(e) {
    const t = await this._getSettings();
    return e == "-" || t.tenant_handle === e;
  }
  async _ownerConflictError(e, t) {
    const r = await this._getSettings();
    return new Error(`Cannot ${e} for another tenant.

      Current tenant: ${r.tenant_handle}

      Requested tenant: ${t}`);
  }
  async _getLatestCommitHash(e) {
    const t = await this.caller.call(O(), `${this.apiUrl}/commits/${e}/?limit=1&offset=0`, {
      method: "GET",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    }), r = await t.json();
    if (!t.ok) {
      const n = typeof r.detail == "string" ? r.detail : JSON.stringify(r.detail), i = new Error(`Error ${t.status}: ${t.statusText}
${n}`);
      throw i.statusCode = t.status, i;
    }
    if (r.commits.length !== 0)
      return r.commits[0].commit_hash;
  }
  async _likeOrUnlikePrompt(e, t) {
    const [r, n, i] = xe(e), s = await this.caller.call(O(), `${this.apiUrl}/likes/${r}/${n}`, {
      method: "POST",
      body: JSON.stringify({ like: t }),
      headers: { ...this.headers, "Content-Type": "application/json" },
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    return await C(s, `${t ? "like" : "unlike"} prompt`), await s.json();
  }
  async _getPromptUrl(e) {
    const [t, r, n] = xe(e);
    if (await this._currentTenantIsOwner(t)) {
      const i = await this._getSettings();
      return n !== "latest" ? `${this.getHostUrl()}/prompts/${r}/${n.substring(0, 8)}?organizationId=${i.id}` : `${this.getHostUrl()}/prompts/${r}?organizationId=${i.id}`;
    } else
      return n !== "latest" ? `${this.getHostUrl()}/hub/${t}/${r}/${n.substring(0, 8)}` : `${this.getHostUrl()}/hub/${t}/${r}`;
  }
  async promptExists(e) {
    return !!await this.getPrompt(e);
  }
  async likePrompt(e) {
    return this._likeOrUnlikePrompt(e, !0);
  }
  async unlikePrompt(e) {
    return this._likeOrUnlikePrompt(e, !1);
  }
  async *listCommits(e) {
    for await (const t of this._getPaginated(`/commits/${e}/`, new URLSearchParams(), (r) => r.commits))
      yield* t;
  }
  async *listPrompts(e) {
    const t = new URLSearchParams();
    t.append("sort_field", e?.sortField ?? "updated_at"), t.append("sort_direction", "desc"), t.append("is_archived", (!!e?.isArchived).toString()), e?.isPublic !== void 0 && t.append("is_public", e.isPublic.toString()), e?.query && t.append("query", e.query);
    for await (const r of this._getPaginated("/repos", t, (n) => n.repos))
      yield* r;
  }
  async getPrompt(e) {
    const [t, r, n] = xe(e), i = await this.caller.call(O(), `${this.apiUrl}/repos/${t}/${r}`, {
      method: "GET",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    if (i.status === 404)
      return null;
    await C(i, "get prompt");
    const s = await i.json();
    return s.repo ? s.repo : null;
  }
  async createPrompt(e, t) {
    const r = await this._getSettings();
    if (t?.isPublic && !r.tenant_handle)
      throw new Error(`Cannot create a public prompt without first

        creating a LangChain Hub handle. 
        You can add a handle by creating a public prompt at:

        https://smith.langchain.com/prompts`);
    const [n, i, s] = xe(e);
    if (!await this._currentTenantIsOwner(n))
      throw await this._ownerConflictError("create a prompt", n);
    const o = {
      repo_handle: i,
      ...t?.description && { description: t.description },
      ...t?.readme && { readme: t.readme },
      ...t?.tags && { tags: t.tags },
      is_public: !!t?.isPublic
    }, u = await this.caller.call(O(), `${this.apiUrl}/repos/`, {
      method: "POST",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify(o),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await C(u, "create prompt");
    const { repo: c } = await u.json();
    return c;
  }
  async createCommit(e, t, r) {
    if (!await this.promptExists(e))
      throw new Error("Prompt does not exist, you must create it first.");
    const [n, i, s] = xe(e), o = r?.parentCommitHash === "latest" || !r?.parentCommitHash ? await this._getLatestCommitHash(`${n}/${i}`) : r?.parentCommitHash, u = {
      manifest: JSON.parse(JSON.stringify(t)),
      parent_commit: o
    }, c = await this.caller.call(O(), `${this.apiUrl}/commits/${n}/${i}`, {
      method: "POST",
      headers: { ...this.headers, "Content-Type": "application/json" },
      body: JSON.stringify(u),
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await C(c, "create commit");
    const l = await c.json();
    return this._getPromptUrl(`${n}/${i}${l.commit_hash ? `:${l.commit_hash}` : ""}`);
  }
  /**
   * Update examples with attachments using multipart form data.
   * @param updates List of ExampleUpdateWithAttachments objects to upsert
   * @returns Promise with the update response
   */
  async updateExamplesMultipart(e, t = []) {
    return this._updateExamplesMultipart(e, t);
  }
  async _updateExamplesMultipart(e, t = []) {
    if (!await this._getMultiPartSupport())
      throw new Error("Your LangSmith version does not allow using the multipart examples endpoint, please update to the latest version.");
    const r = new FormData();
    for (const o of t) {
      const u = o.id, c = {
        ...o.metadata && { metadata: o.metadata },
        ...o.split && { split: o.split }
      }, l = X(c), h = new Blob([l], {
        type: "application/json"
      });
      if (r.append(u, h), o.inputs) {
        const d = X(o.inputs), f = new Blob([d], {
          type: "application/json"
        });
        r.append(`${u}.inputs`, f);
      }
      if (o.outputs) {
        const d = X(o.outputs), f = new Blob([d], {
          type: "application/json"
        });
        r.append(`${u}.outputs`, f);
      }
      if (o.attachments)
        for (const [d, f] of Object.entries(o.attachments)) {
          let p, T;
          Array.isArray(f) ? [p, T] = f : (p = f.mimeType, T = f.data);
          const y = new Blob([T], {
            type: `${p}; length=${T.byteLength}`
          });
          r.append(`${u}.attachment.${d}`, y);
        }
      if (o.attachments_operations) {
        const d = X(o.attachments_operations), f = new Blob([d], {
          type: "application/json"
        });
        r.append(`${u}.attachments_operations`, f);
      }
    }
    const n = e ?? t[0]?.dataset_id;
    return await (await this.caller.call(O(), `${this.apiUrl}/v1/platform/datasets/${n}/examples`, {
      method: "PATCH",
      headers: this.headers,
      body: r
    })).json();
  }
  /**
   * Upload examples with attachments using multipart form data.
   * @param uploads List of ExampleUploadWithAttachments objects to upload
   * @returns Promise with the upload response
   * @deprecated This method is deprecated and will be removed in future LangSmith versions, please use `createExamples` instead
   */
  async uploadExamplesMultipart(e, t = []) {
    return this._uploadExamplesMultipart(e, t);
  }
  async _uploadExamplesMultipart(e, t = []) {
    if (!await this._getMultiPartSupport())
      throw new Error("Your LangSmith version does not allow using the multipart examples endpoint, please update to the latest version.");
    const r = new FormData();
    for (const s of t) {
      const o = (s.id ?? W()).toString(), u = {
        created_at: s.created_at,
        ...s.metadata && { metadata: s.metadata },
        ...s.split && { split: s.split },
        ...s.source_run_id && { source_run_id: s.source_run_id },
        ...s.use_source_run_io && {
          use_source_run_io: s.use_source_run_io
        },
        ...s.use_source_run_attachments && {
          use_source_run_attachments: s.use_source_run_attachments
        }
      }, c = X(u), l = new Blob([c], {
        type: "application/json"
      });
      if (r.append(o, l), s.inputs) {
        const h = X(s.inputs), d = new Blob([h], {
          type: "application/json"
        });
        r.append(`${o}.inputs`, d);
      }
      if (s.outputs) {
        const h = X(s.outputs), d = new Blob([h], {
          type: "application/json"
        });
        r.append(`${o}.outputs`, d);
      }
      if (s.attachments)
        for (const [h, d] of Object.entries(s.attachments)) {
          let f, p;
          Array.isArray(d) ? [f, p] = d : (f = d.mimeType, p = d.data);
          const T = new Blob([p], {
            type: `${f}; length=${p.byteLength}`
          });
          r.append(`${o}.attachment.${h}`, T);
        }
    }
    return await (await this.caller.call(O(), `${this.apiUrl}/v1/platform/datasets/${e}/examples`, {
      method: "POST",
      headers: this.headers,
      body: r
    })).json();
  }
  async updatePrompt(e, t) {
    if (!await this.promptExists(e))
      throw new Error("Prompt does not exist, you must create it first.");
    const [r, n] = xe(e);
    if (!await this._currentTenantIsOwner(r))
      throw await this._ownerConflictError("update a prompt", r);
    const i = {};
    if (t?.description !== void 0 && (i.description = t.description), t?.readme !== void 0 && (i.readme = t.readme), t?.tags !== void 0 && (i.tags = t.tags), t?.isPublic !== void 0 && (i.is_public = t.isPublic), t?.isArchived !== void 0 && (i.is_archived = t.isArchived), Object.keys(i).length === 0)
      throw new Error("No valid update options provided");
    const s = await this.caller.call(O(), `${this.apiUrl}/repos/${r}/${n}`, {
      method: "PATCH",
      body: JSON.stringify(i),
      headers: {
        ...this.headers,
        "Content-Type": "application/json"
      },
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    return await C(s, "update prompt"), s.json();
  }
  async deletePrompt(e) {
    if (!await this.promptExists(e))
      throw new Error("Prompt does not exist, you must create it first.");
    const [t, r, n] = xe(e);
    if (!await this._currentTenantIsOwner(t))
      throw await this._ownerConflictError("delete a prompt", t);
    return await (await this.caller.call(O(), `${this.apiUrl}/repos/${t}/${r}`, {
      method: "DELETE",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    })).json();
  }
  async pullPromptCommit(e, t) {
    const [r, n, i] = xe(e), s = await this.caller.call(O(), `${this.apiUrl}/commits/${r}/${n}/${i}${t?.includeModel ? "?include_model=true" : ""}`, {
      method: "GET",
      headers: this.headers,
      signal: AbortSignal.timeout(this.timeout_ms),
      ...this.fetchOptions
    });
    await C(s, "pull prompt commit");
    const o = await s.json();
    return {
      owner: r,
      repo: n,
      commit_hash: o.commit_hash,
      manifest: o.manifest,
      examples: o.examples
    };
  }
  /**
   * This method should not be used directly, use `import { pull } from "langchain/hub"` instead.
   * Using this method directly returns the JSON string of the prompt rather than a LangChain object.
   * @private
   */
  async _pullPrompt(e, t) {
    const r = await this.pullPromptCommit(e, {
      includeModel: t?.includeModel
    });
    return JSON.stringify(r.manifest);
  }
  async pushPrompt(e, t) {
    return await this.promptExists(e) ? t && Object.keys(t).some((n) => n !== "object") && await this.updatePrompt(e, {
      description: t?.description,
      readme: t?.readme,
      tags: t?.tags,
      isPublic: t?.isPublic
    }) : await this.createPrompt(e, {
      description: t?.description,
      readme: t?.readme,
      tags: t?.tags,
      isPublic: t?.isPublic
    }), t?.object ? await this.createCommit(e, t?.object, {
      parentCommitHash: t?.parentCommitHash
    }) : await this._getPromptUrl(e);
  }
  /**
     * Clone a public dataset to your own langsmith tenant.
     * This operation is idempotent. If you already have a dataset with the given name,
     * this function will do nothing.
  
     * @param {string} tokenOrUrl The token of the public dataset to clone.
     * @param {Object} [options] Additional options for cloning the dataset.
     * @param {string} [options.sourceApiUrl] The URL of the langsmith server where the data is hosted. Defaults to the API URL of your current client.
     * @param {string} [options.datasetName] The name of the dataset to create in your tenant. Defaults to the name of the public dataset.
     * @returns {Promise<void>}
     */
  async clonePublicDataset(e, t = {}) {
    const { sourceApiUrl: r = this.apiUrl, datasetName: n } = t, [i, s] = this.parseTokenOrUrl(e, r), o = new gt({
      apiUrl: i,
      // Placeholder API key not needed anymore in most cases, but
      // some private deployments may have API key-based rate limiting
      // that would cause this to fail if we provide no value.
      apiKey: "placeholder"
    }), u = await o.readSharedDataset(s), c = n || u.name;
    try {
      if (await this.hasDataset({ datasetId: c })) {
        console.log(`Dataset ${c} already exists in your tenant. Skipping.`);
        return;
      }
    } catch {
    }
    const l = await o.listSharedExamples(s), h = await this.createDataset(c, {
      description: u.description,
      dataType: u.data_type || "kv",
      inputsSchema: u.inputs_schema_definition ?? void 0,
      outputsSchema: u.outputs_schema_definition ?? void 0
    });
    try {
      await this.createExamples({
        inputs: l.map((d) => d.inputs),
        outputs: l.flatMap((d) => d.outputs ? [d.outputs] : []),
        datasetId: h.id
      });
    } catch (d) {
      throw console.error(`An error occurred while creating dataset ${c}. You should delete it manually.`), d;
    }
  }
  parseTokenOrUrl(e, t, r = 2, n = "dataset") {
    try {
      return I(e), [t, e];
    } catch {
    }
    try {
      const s = new URL(e).pathname.split("/").filter((o) => o !== "");
      if (s.length >= r) {
        const o = s[s.length - r];
        return [t, o];
      } else
        throw new Error(`Invalid public ${n} URL: ${e}`);
    } catch {
      throw new Error(`Invalid public ${n} URL or token: ${e}`);
    }
  }
  /**
   * Awaits all pending trace batches. Useful for environments where
   * you need to be sure that all tracing requests finish before execution ends,
   * such as serverless environments.
   *
   * @example
   * ```
   * import { Client } from "langsmith";
   *
   * const client = new Client();
   *
   * try {
   *   // Tracing happens here
   *   ...
   * } finally {
   *   await client.awaitPendingTraceBatches();
   * }
   * ```
   *
   * @returns A promise that resolves once all currently pending traces have sent.
   */
  awaitPendingTraceBatches() {
    return this.manualFlushMode ? (console.warn("[WARNING]: When tracing in manual flush mode, you must call `await client.flush()` manually to submit trace batches."), Promise.resolve()) : Promise.all([
      ...this.autoBatchQueue.items.map(({ itemPromise: e }) => e),
      this.batchIngestCaller.queue.onIdle()
    ]);
  }
}
function xn(a) {
  return "dataset_id" in a || "dataset_name" in a;
}
const ea = "0.3.15";
var Mi = {};
let ye;
const Li = () => typeof window < "u" && typeof window.document < "u", Di = () => typeof globalThis == "object" && globalThis.constructor && globalThis.constructor.name === "DedicatedWorkerGlobalScope", Ui = () => typeof window < "u" && window.name === "nodejs" || typeof navigator < "u" && (navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom")), ta = () => typeof Deno < "u", Fi = () => typeof ve < "u" && typeof Mi < "u" && !0 && !ta(), Zi = () => ye || (Li() ? ye = "browser" : Fi() ? ye = "node" : Di() ? ye = "webworker" : Ui() ? ye = "jsdom" : ta() ? ye = "deno" : ye = "other", ye);
let kr;
function ra() {
  if (kr === void 0) {
    const a = Zi(), e = zi();
    kr = {
      library: "langsmith",
      runtime: a,
      sdk: "langsmith-js",
      sdk_version: ea,
      ...e
    };
  }
  return kr;
}
function Bi() {
  const a = Hi() || {}, e = {}, t = [
    "LANGCHAIN_API_KEY",
    "LANGCHAIN_ENDPOINT",
    "LANGCHAIN_TRACING_V2",
    "LANGCHAIN_PROJECT",
    "LANGCHAIN_SESSION",
    "LANGSMITH_API_KEY",
    "LANGSMITH_ENDPOINT",
    "LANGSMITH_TRACING_V2",
    "LANGSMITH_PROJECT",
    "LANGSMITH_SESSION"
  ];
  for (const [r, n] of Object.entries(a))
    (r.startsWith("LANGCHAIN_") || r.startsWith("LANGSMITH_")) && typeof n == "string" && !t.includes(r) && !r.toLowerCase().includes("key") && !r.toLowerCase().includes("secret") && !r.toLowerCase().includes("token") && (r === "LANGCHAIN_REVISION_ID" ? e.revision_id = n : e[r] = n);
  return e;
}
function Hi() {
  try {
    return typeof ve < "u" && ve.env ? Object.entries(ve.env).reduce((a, [e, t]) => (a[e] = String(t), a), {}) : void 0;
  } catch {
    return;
  }
}
function Fe(a) {
  try {
    return typeof ve < "u" ? (
      // eslint-disable-next-line no-process-env
      ve.env?.[a]
    ) : void 0;
  } catch {
    return;
  }
}
function Ie(a) {
  return Fe(`LANGSMITH_${a}`) || Fe(`LANGCHAIN_${a}`);
}
let xr;
function zi() {
  if (xr !== void 0)
    return xr;
  const a = [
    "VERCEL_GIT_COMMIT_SHA",
    "NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA",
    "COMMIT_REF",
    "RENDER_GIT_COMMIT",
    "CI_COMMIT_SHA",
    "CIRCLE_SHA1",
    "CF_PAGES_COMMIT_SHA",
    "REACT_APP_GIT_SHA",
    "SOURCE_VERSION",
    "GITHUB_SHA",
    "TRAVIS_COMMIT",
    "GIT_COMMIT",
    "BUILD_VCS_NUMBER",
    "bamboo_planRepository_revision",
    "Build.SourceVersion",
    "BITBUCKET_COMMIT",
    "DRONE_COMMIT_SHA",
    "SEMAPHORE_GIT_SHA",
    "BUILDKITE_COMMIT"
  ], e = {};
  for (const t of a) {
    const r = Fe(t);
    r !== void 0 && (e[t] = r);
  }
  return xr = e, e;
}
const qi = (a) => !!["TRACING_V2", "TRACING"].find((t) => Ie(t) === "true"), Ar = Symbol.for("lc:context_variables");
function Vi(a) {
  return a.replace(/[-:.]/g, "");
}
function Gi(a, e, t = 1) {
  const r = t.toFixed(0).slice(0, 3).padStart(3, "0");
  return Vi(`${new Date(a).toISOString().slice(0, -1)}${r}Z`) + e;
}
class Jt {
  constructor(e, t) {
    Object.defineProperty(this, "metadata", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "tags", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.metadata = e, this.tags = t;
  }
  static fromHeader(e) {
    const t = e.split(",");
    let r = {}, n = [];
    for (const i of t) {
      const [s, o] = i.split("="), u = decodeURIComponent(o);
      s === "langsmith-metadata" ? r = JSON.parse(u) : s === "langsmith-tags" && (n = u.split(","));
    }
    return new Jt(r, n);
  }
  toHeader() {
    const e = [];
    return this.metadata && Object.keys(this.metadata).length > 0 && e.push(`langsmith-metadata=${encodeURIComponent(JSON.stringify(this.metadata))}`), this.tags && this.tags.length > 0 && e.push(`langsmith-tags=${encodeURIComponent(this.tags.join(","))}`), e.join(",");
  }
}
class ee {
  constructor(e) {
    if (Object.defineProperty(this, "id", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "run_type", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "project_name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "parent_run", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "child_runs", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "start_time", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "end_time", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "extra", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "tags", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "error", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "serialized", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "inputs", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "outputs", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "reference_example_id", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "client", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "events", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "trace_id", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "dotted_order", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "tracingEnabled", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "execution_order", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "child_execution_order", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "attachments", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), na(e)) {
      Object.assign(this, { ...e });
      return;
    }
    const t = ee.getDefaultConfig(), { metadata: r, ...n } = e, i = n.client ?? ee.getSharedClient(), s = {
      ...r,
      ...n?.extra?.metadata
    };
    if (n.extra = { ...n.extra, metadata: s }, Object.assign(this, { ...t, ...n, client: i }), this.trace_id || (this.parent_run ? this.trace_id = this.parent_run.trace_id ?? this.id : this.trace_id = this.id), this.execution_order ??= 1, this.child_execution_order ??= 1, !this.dotted_order) {
      const o = Gi(this.start_time, this.id, this.execution_order);
      this.parent_run ? this.dotted_order = this.parent_run.dotted_order + "." + o : this.dotted_order = o;
    }
  }
  static getDefaultConfig() {
    return {
      id: W(),
      run_type: "chain",
      project_name: Ie("PROJECT") ?? Fe("LANGCHAIN_SESSION") ?? // TODO: Deprecate
      "default",
      child_runs: [],
      api_url: Fe("LANGCHAIN_ENDPOINT") ?? "http://localhost:1984",
      api_key: Fe("LANGCHAIN_API_KEY"),
      caller_options: {},
      start_time: Date.now(),
      serialized: {},
      inputs: {},
      extra: {}
    };
  }
  static getSharedClient() {
    return ee.sharedClient || (ee.sharedClient = new gt()), ee.sharedClient;
  }
  createChild(e) {
    const t = this.child_execution_order + 1, r = new ee({
      ...e,
      parent_run: this,
      project_name: this.project_name,
      client: this.client,
      tracingEnabled: this.tracingEnabled,
      execution_order: t,
      child_execution_order: t
    });
    Ar in this && (r[Ar] = this[Ar]);
    const n = Symbol.for("lc:child_config"), i = e.extra?.[n] ?? this.extra[n];
    if (Wi(i)) {
      const u = { ...i }, c = Ji(u.callbacks) ? u.callbacks.copy?.() : void 0;
      c && (Object.assign(c, { _parentRunId: r.id }), c.handlers?.find(aa)?.updateFromRunTree?.(r), u.callbacks = c), r.extra[n] = u;
    }
    const s = /* @__PURE__ */ new Set();
    let o = this;
    for (; o != null && !s.has(o.id); )
      s.add(o.id), o.child_execution_order = Math.max(o.child_execution_order, t), o = o.parent_run;
    return this.child_runs.push(r), r;
  }
  async end(e, t, r = Date.now(), n) {
    this.outputs = this.outputs ?? e, this.error = this.error ?? t, this.end_time = this.end_time ?? r, n && Object.keys(n).length > 0 && (this.extra = this.extra ? { ...this.extra, metadata: { ...this.extra.metadata, ...n } } : { metadata: n });
  }
  _convertToCreate(e, t, r = !0) {
    const n = e.extra ?? {};
    if (n.runtime || (n.runtime = {}), t)
      for (const [u, c] of Object.entries(t))
        n.runtime[u] || (n.runtime[u] = c);
    let i, s;
    return r ? (s = e.parent_run?.id, i = []) : (i = e.child_runs.map((u) => this._convertToCreate(u, t, r)), s = void 0), {
      id: e.id,
      name: e.name,
      start_time: e.start_time,
      end_time: e.end_time,
      run_type: e.run_type,
      reference_example_id: e.reference_example_id,
      extra: n,
      serialized: e.serialized,
      error: e.error,
      inputs: e.inputs,
      outputs: e.outputs,
      session_name: e.project_name,
      child_runs: i,
      parent_run_id: s,
      trace_id: e.trace_id,
      dotted_order: e.dotted_order,
      tags: e.tags,
      attachments: e.attachments
    };
  }
  async postRun(e = !0) {
    try {
      const t = ra(), r = await this._convertToCreate(this, t, !0);
      if (await this.client.createRun(r), !e) {
        Xn("Posting with excludeChildRuns=false is deprecated and will be removed in a future version.");
        for (const n of this.child_runs)
          await n.postRun(!1);
      }
    } catch (t) {
      console.error(`Error in postRun for run ${this.id}:`, t);
    }
  }
  async patchRun() {
    try {
      const e = {
        end_time: this.end_time,
        error: this.error,
        inputs: this.inputs,
        outputs: this.outputs,
        parent_run_id: this.parent_run?.id,
        reference_example_id: this.reference_example_id,
        extra: this.extra,
        events: this.events,
        dotted_order: this.dotted_order,
        trace_id: this.trace_id,
        tags: this.tags,
        attachments: this.attachments
      };
      await this.client.updateRun(this.id, e);
    } catch (e) {
      console.error(`Error in patchRun for run ${this.id}`, e);
    }
  }
  toJSON() {
    return this._convertToCreate(this, void 0, !1);
  }
  /**
   * Add an event to the run tree.
   * @param event - A single event or string to add
   */
  addEvent(e) {
    this.events || (this.events = []), typeof e == "string" ? this.events.push({
      name: "event",
      time: (/* @__PURE__ */ new Date()).toISOString(),
      message: e
    }) : this.events.push({
      ...e,
      time: e.time ?? (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  static fromRunnableConfig(e, t) {
    const r = e?.callbacks;
    let n, i, s, o = qi();
    if (r) {
      const c = r?.getParentRunId?.() ?? "", l = r?.handlers?.find((h) => h?.name == "langchain_tracer");
      n = l?.getRun?.(c), i = l?.projectName, s = l?.client, o = o || !!l;
    }
    return n ? new ee({
      name: n.name,
      id: n.id,
      trace_id: n.trace_id,
      dotted_order: n.dotted_order,
      client: s,
      tracingEnabled: o,
      project_name: i,
      tags: [
        ...new Set((n?.tags ?? []).concat(e?.tags ?? []))
      ],
      extra: {
        metadata: {
          ...n?.extra?.metadata,
          ...e?.metadata
        }
      }
    }).createChild(t) : new ee({
      ...t,
      client: s,
      tracingEnabled: o,
      project_name: i
    });
  }
  static fromDottedOrder(e) {
    return this.fromHeaders({ "langsmith-trace": e });
  }
  static fromHeaders(e, t) {
    const r = "get" in e && typeof e.get == "function" ? {
      "langsmith-trace": e.get("langsmith-trace"),
      baggage: e.get("baggage")
    } : e, n = r["langsmith-trace"];
    if (!n || typeof n != "string")
      return;
    const i = n.trim(), s = i.split(".").map((c) => {
      const [l, h] = c.split("Z");
      return { strTime: l, time: Date.parse(l + "Z"), uuid: h };
    }), o = s[0].uuid, u = {
      ...t,
      name: t?.name ?? "parent",
      run_type: t?.run_type ?? "chain",
      start_time: t?.start_time ?? Date.now(),
      id: s.at(-1)?.uuid,
      trace_id: o,
      dotted_order: i
    };
    if (r.baggage && typeof r.baggage == "string") {
      const c = Jt.fromHeader(r.baggage);
      u.metadata = c.metadata, u.tags = c.tags;
    }
    return new ee(u);
  }
  toHeaders(e) {
    const t = {
      "langsmith-trace": this.dotted_order,
      baggage: new Jt(this.extra?.metadata, this.tags).toHeader()
    };
    if (e)
      for (const [r, n] of Object.entries(t))
        e.set(r, n);
    return t;
  }
}
Object.defineProperty(ee, "sharedClient", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: null
});
function na(a) {
  return a !== void 0 && typeof a.createChild == "function" && typeof a.postRun == "function";
}
function aa(a) {
  return typeof a == "object" && a != null && typeof a.name == "string" && a.name === "langchain_tracer";
}
function An(a) {
  return Array.isArray(a) && a.some((e) => aa(e));
}
function Ji(a) {
  return typeof a == "object" && a != null && Array.isArray(a.handlers);
}
function Wi(a) {
  return a !== void 0 && typeof a.callbacks == "object" && // Callback manager with a langchain tracer
  (An(a.callbacks?.handlers) || // Or it's an array with a LangChainTracerLike object within it
  An(a.callbacks));
}
let Ki = class {
  getStore() {
  }
  run(e, t) {
    return t();
  }
};
const Ir = Symbol.for("ls:tracing_async_local_storage"), Qi = new Ki();
let Yi = class {
  getInstance() {
    return globalThis[Ir] ?? Qi;
  }
  initializeGlobalInstance(e) {
    globalThis[Ir] === void 0 && (globalThis[Ir] = e);
  }
};
const Xi = new Yi(), es = () => {
  const a = Xi.getInstance().getStore();
  if (!na(a))
    throw new Error([
      "Could not get the current run tree.",
      "",
      "Please make sure you are calling this method within a traceable function and that tracing is enabled."
    ].join(`
`));
  return a;
};
function Yr(a) {
  return typeof a == "function" && "langsmith:traceable" in a;
}
let Pr;
const ts = () => {
  if (Pr === void 0) {
    const a = Pe("LANGCHAIN_CALLBACKS_BACKGROUND") === "false" ? {
      // LangSmith has its own backgrounding system
      blockOnRootRunFinalization: !0
    } : {};
    Pr = new gt(a);
  }
  return Pr;
};
class ht extends jt {
  constructor(e = {}) {
    super(e), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "langchain_tracer"
    }), Object.defineProperty(this, "projectName", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "exampleId", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "client", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    });
    const { exampleId: t, projectName: r, client: n } = e;
    this.projectName = r ?? Pe("LANGCHAIN_PROJECT") ?? Pe("LANGCHAIN_SESSION"), this.exampleId = t, this.client = n ?? ts();
    const i = ht.getTraceableRunTree();
    i && this.updateFromRunTree(i);
  }
  async _convertToCreate(e, t = void 0) {
    return {
      ...e,
      extra: {
        ...e.extra,
        runtime: await Ga()
      },
      child_runs: void 0,
      session_name: this.projectName,
      reference_example_id: e.parent_run_id ? void 0 : t
    };
  }
  async persistRun(e) {
  }
  async onRunCreate(e) {
    const t = await this._convertToCreate(e, this.exampleId);
    await this.client.createRun(t);
  }
  async onRunUpdate(e) {
    const t = {
      end_time: e.end_time,
      error: e.error,
      outputs: e.outputs,
      events: e.events,
      inputs: e.inputs,
      trace_id: e.trace_id,
      dotted_order: e.dotted_order,
      parent_run_id: e.parent_run_id,
      extra: e.extra
    };
    await this.client.updateRun(e.id, t);
  }
  getRun(e) {
    return this.runMap.get(e);
  }
  updateFromRunTree(e) {
    let t = e;
    const r = /* @__PURE__ */ new Set();
    for (; t.parent_run && !(r.has(t.id) || (r.add(t.id), !t.parent_run)); )
      t = t.parent_run;
    r.clear();
    const n = [t];
    for (; n.length > 0; ) {
      const i = n.shift();
      !i || r.has(i.id) || (r.add(i.id), this.runMap.set(i.id, i), i.child_runs && n.push(...i.child_runs));
    }
    this.client = e.client ?? this.client, this.projectName = e.project_name ?? this.projectName, this.exampleId = e.reference_example_id ?? this.exampleId;
  }
  convertToRunTree(e) {
    const t = {}, r = [];
    for (const [n, i] of this.runMap) {
      const s = new ee({
        ...i,
        child_runs: [],
        parent_run: void 0,
        // inherited properties
        client: this.client,
        project_name: this.projectName,
        reference_example_id: this.exampleId,
        tracingEnabled: !0
      });
      t[n] = s, r.push([n, i.dotted_order]);
    }
    r.sort((n, i) => !n[1] || !i[1] ? 0 : n[1].localeCompare(i[1]));
    for (const [n] of r) {
      const i = this.runMap.get(n), s = t[n];
      if (!(!i || !s) && i.parent_run_id) {
        const o = t[i.parent_run_id];
        o && (o.child_runs.push(s), s.parent_run = o);
      }
    }
    return t[e];
  }
  static getTraceableRunTree() {
    try {
      return es();
    } catch {
      return;
    }
  }
}
const ia = Symbol.for("ls:tracing_async_local_storage"), zt = Symbol.for("lc:context_variables"), rs = (a) => {
  globalThis[ia] = a;
}, yt = () => globalThis[ia];
let ft;
function ns() {
  const a = "default" in Ee ? Ee.default : Ee;
  return new a({
    autoStart: !0,
    concurrency: 1
  });
}
function as() {
  return typeof ft > "u" && (ft = ns()), ft;
}
async function B(a, e) {
  if (e === !0) {
    const t = yt();
    t !== void 0 ? await t.run(void 0, async () => a()) : await a();
  } else
    ft = as(), ft.add(async () => {
      const t = yt();
      t !== void 0 ? await t.run(void 0, async () => a()) : await a();
    });
}
const is = (a) => !![
  "LANGSMITH_TRACING_V2",
  "LANGCHAIN_TRACING_V2",
  "LANGSMITH_TRACING",
  "LANGCHAIN_TRACING"
].find((t) => Pe(t) === "true");
function sa(a) {
  const e = yt();
  return e === void 0 ? void 0 : e.getStore()?.[zt]?.[a];
}
const ss = Symbol("lc:configure_hooks"), os = () => sa(ss) || [];
function us(a) {
  return a ? Array.isArray(a) || "name" in a ? { callbacks: a } : a : {};
}
class cs {
  setHandler(e) {
    return this.setHandlers([e]);
  }
}
class lr {
  constructor(e, t, r, n, i, s, o, u) {
    Object.defineProperty(this, "runId", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: e
    }), Object.defineProperty(this, "handlers", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: t
    }), Object.defineProperty(this, "inheritableHandlers", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: r
    }), Object.defineProperty(this, "tags", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: n
    }), Object.defineProperty(this, "inheritableTags", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: i
    }), Object.defineProperty(this, "metadata", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: s
    }), Object.defineProperty(this, "inheritableMetadata", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: o
    }), Object.defineProperty(this, "_parentRunId", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: u
    });
  }
  get parentRunId() {
    return this._parentRunId;
  }
  async handleText(e) {
    await Promise.all(this.handlers.map((t) => B(async () => {
      try {
        await t.handleText?.(e, this.runId, this._parentRunId, this.tags);
      } catch (r) {
        if ((t.raiseError ? console.error : console.warn)(`Error in handler ${t.constructor.name}, handleText: ${r}`), t.raiseError)
          throw r;
      }
    }, t.awaitHandlers)));
  }
  async handleCustomEvent(e, t, r, n, i) {
    await Promise.all(this.handlers.map((s) => B(async () => {
      try {
        await s.handleCustomEvent?.(e, t, this.runId, this.tags, this.metadata);
      } catch (o) {
        if ((s.raiseError ? console.error : console.warn)(`Error in handler ${s.constructor.name}, handleCustomEvent: ${o}`), s.raiseError)
          throw o;
      }
    }, s.awaitHandlers)));
  }
}
class ls extends lr {
  getChild(e) {
    const t = new ae(this.runId);
    return t.setHandlers(this.inheritableHandlers), t.addTags(this.inheritableTags), t.addMetadata(this.inheritableMetadata), e && t.addTags([e], !1), t;
  }
  async handleRetrieverEnd(e) {
    await Promise.all(this.handlers.map((t) => B(async () => {
      if (!t.ignoreRetriever)
        try {
          await t.handleRetrieverEnd?.(e, this.runId, this._parentRunId, this.tags);
        } catch (r) {
          if ((t.raiseError ? console.error : console.warn)(`Error in handler ${t.constructor.name}, handleRetriever`), t.raiseError)
            throw r;
        }
    }, t.awaitHandlers)));
  }
  async handleRetrieverError(e) {
    await Promise.all(this.handlers.map((t) => B(async () => {
      if (!t.ignoreRetriever)
        try {
          await t.handleRetrieverError?.(e, this.runId, this._parentRunId, this.tags);
        } catch (r) {
          if ((t.raiseError ? console.error : console.warn)(`Error in handler ${t.constructor.name}, handleRetrieverError: ${r}`), t.raiseError)
            throw e;
        }
    }, t.awaitHandlers)));
  }
}
class In extends lr {
  async handleLLMNewToken(e, t, r, n, i, s) {
    await Promise.all(this.handlers.map((o) => B(async () => {
      if (!o.ignoreLLM)
        try {
          await o.handleLLMNewToken?.(e, t ?? { prompt: 0, completion: 0 }, this.runId, this._parentRunId, this.tags, s);
        } catch (u) {
          if ((o.raiseError ? console.error : console.warn)(`Error in handler ${o.constructor.name}, handleLLMNewToken: ${u}`), o.raiseError)
            throw u;
        }
    }, o.awaitHandlers)));
  }
  async handleLLMError(e, t, r, n, i) {
    await Promise.all(this.handlers.map((s) => B(async () => {
      if (!s.ignoreLLM)
        try {
          await s.handleLLMError?.(e, this.runId, this._parentRunId, this.tags, i);
        } catch (o) {
          if ((s.raiseError ? console.error : console.warn)(`Error in handler ${s.constructor.name}, handleLLMError: ${o}`), s.raiseError)
            throw o;
        }
    }, s.awaitHandlers)));
  }
  async handleLLMEnd(e, t, r, n, i) {
    await Promise.all(this.handlers.map((s) => B(async () => {
      if (!s.ignoreLLM)
        try {
          await s.handleLLMEnd?.(e, this.runId, this._parentRunId, this.tags, i);
        } catch (o) {
          if ((s.raiseError ? console.error : console.warn)(`Error in handler ${s.constructor.name}, handleLLMEnd: ${o}`), s.raiseError)
            throw o;
        }
    }, s.awaitHandlers)));
  }
}
class ds extends lr {
  getChild(e) {
    const t = new ae(this.runId);
    return t.setHandlers(this.inheritableHandlers), t.addTags(this.inheritableTags), t.addMetadata(this.inheritableMetadata), e && t.addTags([e], !1), t;
  }
  async handleChainError(e, t, r, n, i) {
    await Promise.all(this.handlers.map((s) => B(async () => {
      if (!s.ignoreChain)
        try {
          await s.handleChainError?.(e, this.runId, this._parentRunId, this.tags, i);
        } catch (o) {
          if ((s.raiseError ? console.error : console.warn)(`Error in handler ${s.constructor.name}, handleChainError: ${o}`), s.raiseError)
            throw o;
        }
    }, s.awaitHandlers)));
  }
  async handleChainEnd(e, t, r, n, i) {
    await Promise.all(this.handlers.map((s) => B(async () => {
      if (!s.ignoreChain)
        try {
          await s.handleChainEnd?.(e, this.runId, this._parentRunId, this.tags, i);
        } catch (o) {
          if ((s.raiseError ? console.error : console.warn)(`Error in handler ${s.constructor.name}, handleChainEnd: ${o}`), s.raiseError)
            throw o;
        }
    }, s.awaitHandlers)));
  }
  async handleAgentAction(e) {
    await Promise.all(this.handlers.map((t) => B(async () => {
      if (!t.ignoreAgent)
        try {
          await t.handleAgentAction?.(e, this.runId, this._parentRunId, this.tags);
        } catch (r) {
          if ((t.raiseError ? console.error : console.warn)(`Error in handler ${t.constructor.name}, handleAgentAction: ${r}`), t.raiseError)
            throw r;
        }
    }, t.awaitHandlers)));
  }
  async handleAgentEnd(e) {
    await Promise.all(this.handlers.map((t) => B(async () => {
      if (!t.ignoreAgent)
        try {
          await t.handleAgentEnd?.(e, this.runId, this._parentRunId, this.tags);
        } catch (r) {
          if ((t.raiseError ? console.error : console.warn)(`Error in handler ${t.constructor.name}, handleAgentEnd: ${r}`), t.raiseError)
            throw r;
        }
    }, t.awaitHandlers)));
  }
}
class hs extends lr {
  getChild(e) {
    const t = new ae(this.runId);
    return t.setHandlers(this.inheritableHandlers), t.addTags(this.inheritableTags), t.addMetadata(this.inheritableMetadata), e && t.addTags([e], !1), t;
  }
  async handleToolError(e) {
    await Promise.all(this.handlers.map((t) => B(async () => {
      if (!t.ignoreAgent)
        try {
          await t.handleToolError?.(e, this.runId, this._parentRunId, this.tags);
        } catch (r) {
          if ((t.raiseError ? console.error : console.warn)(`Error in handler ${t.constructor.name}, handleToolError: ${r}`), t.raiseError)
            throw r;
        }
    }, t.awaitHandlers)));
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async handleToolEnd(e) {
    await Promise.all(this.handlers.map((t) => B(async () => {
      if (!t.ignoreAgent)
        try {
          await t.handleToolEnd?.(e, this.runId, this._parentRunId, this.tags);
        } catch (r) {
          if ((t.raiseError ? console.error : console.warn)(`Error in handler ${t.constructor.name}, handleToolEnd: ${r}`), t.raiseError)
            throw r;
        }
    }, t.awaitHandlers)));
  }
}
class ae extends cs {
  constructor(e, t) {
    super(), Object.defineProperty(this, "handlers", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: []
    }), Object.defineProperty(this, "inheritableHandlers", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: []
    }), Object.defineProperty(this, "tags", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: []
    }), Object.defineProperty(this, "inheritableTags", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: []
    }), Object.defineProperty(this, "metadata", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: {}
    }), Object.defineProperty(this, "inheritableMetadata", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: {}
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "callback_manager"
    }), Object.defineProperty(this, "_parentRunId", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.handlers = t?.handlers ?? this.handlers, this.inheritableHandlers = t?.inheritableHandlers ?? this.inheritableHandlers, this.tags = t?.tags ?? this.tags, this.inheritableTags = t?.inheritableTags ?? this.inheritableTags, this.metadata = t?.metadata ?? this.metadata, this.inheritableMetadata = t?.inheritableMetadata ?? this.inheritableMetadata, this._parentRunId = e;
  }
  /**
   * Gets the parent run ID, if any.
   *
   * @returns The parent run ID.
   */
  getParentRunId() {
    return this._parentRunId;
  }
  async handleLLMStart(e, t, r = void 0, n = void 0, i = void 0, s = void 0, o = void 0, u = void 0) {
    return Promise.all(t.map(async (c, l) => {
      const h = l === 0 && r ? r : W();
      return await Promise.all(this.handlers.map((d) => {
        if (!d.ignoreLLM)
          return it(d) && d._createRunForLLMStart(e, [c], h, this._parentRunId, i, this.tags, this.metadata, u), B(async () => {
            try {
              await d.handleLLMStart?.(e, [c], h, this._parentRunId, i, this.tags, this.metadata, u);
            } catch (f) {
              if ((d.raiseError ? console.error : console.warn)(`Error in handler ${d.constructor.name}, handleLLMStart: ${f}`), d.raiseError)
                throw f;
            }
          }, d.awaitHandlers);
      })), new In(h, this.handlers, this.inheritableHandlers, this.tags, this.inheritableTags, this.metadata, this.inheritableMetadata, this._parentRunId);
    }));
  }
  async handleChatModelStart(e, t, r = void 0, n = void 0, i = void 0, s = void 0, o = void 0, u = void 0) {
    return Promise.all(t.map(async (c, l) => {
      const h = l === 0 && r ? r : W();
      return await Promise.all(this.handlers.map((d) => {
        if (!d.ignoreLLM)
          return it(d) && d._createRunForChatModelStart(e, [c], h, this._parentRunId, i, this.tags, this.metadata, u), B(async () => {
            try {
              if (d.handleChatModelStart)
                await d.handleChatModelStart?.(e, [c], h, this._parentRunId, i, this.tags, this.metadata, u);
              else if (d.handleLLMStart) {
                const f = oi(c);
                await d.handleLLMStart?.(e, [f], h, this._parentRunId, i, this.tags, this.metadata, u);
              }
            } catch (f) {
              if ((d.raiseError ? console.error : console.warn)(`Error in handler ${d.constructor.name}, handleLLMStart: ${f}`), d.raiseError)
                throw f;
            }
          }, d.awaitHandlers);
      })), new In(h, this.handlers, this.inheritableHandlers, this.tags, this.inheritableTags, this.metadata, this.inheritableMetadata, this._parentRunId);
    }));
  }
  async handleChainStart(e, t, r = W(), n = void 0, i = void 0, s = void 0, o = void 0) {
    return await Promise.all(this.handlers.map((u) => {
      if (!u.ignoreChain)
        return it(u) && u._createRunForChainStart(e, t, r, this._parentRunId, this.tags, this.metadata, n, o), B(async () => {
          try {
            await u.handleChainStart?.(e, t, r, this._parentRunId, this.tags, this.metadata, n, o);
          } catch (c) {
            if ((u.raiseError ? console.error : console.warn)(`Error in handler ${u.constructor.name}, handleChainStart: ${c}`), u.raiseError)
              throw c;
          }
        }, u.awaitHandlers);
    })), new ds(r, this.handlers, this.inheritableHandlers, this.tags, this.inheritableTags, this.metadata, this.inheritableMetadata, this._parentRunId);
  }
  async handleToolStart(e, t, r = W(), n = void 0, i = void 0, s = void 0, o = void 0) {
    return await Promise.all(this.handlers.map((u) => {
      if (!u.ignoreAgent)
        return it(u) && u._createRunForToolStart(e, t, r, this._parentRunId, this.tags, this.metadata, o), B(async () => {
          try {
            await u.handleToolStart?.(e, t, r, this._parentRunId, this.tags, this.metadata, o);
          } catch (c) {
            if ((u.raiseError ? console.error : console.warn)(`Error in handler ${u.constructor.name}, handleToolStart: ${c}`), u.raiseError)
              throw c;
          }
        }, u.awaitHandlers);
    })), new hs(r, this.handlers, this.inheritableHandlers, this.tags, this.inheritableTags, this.metadata, this.inheritableMetadata, this._parentRunId);
  }
  async handleRetrieverStart(e, t, r = W(), n = void 0, i = void 0, s = void 0, o = void 0) {
    return await Promise.all(this.handlers.map((u) => {
      if (!u.ignoreRetriever)
        return it(u) && u._createRunForRetrieverStart(e, t, r, this._parentRunId, this.tags, this.metadata, o), B(async () => {
          try {
            await u.handleRetrieverStart?.(e, t, r, this._parentRunId, this.tags, this.metadata, o);
          } catch (c) {
            if ((u.raiseError ? console.error : console.warn)(`Error in handler ${u.constructor.name}, handleRetrieverStart: ${c}`), u.raiseError)
              throw c;
          }
        }, u.awaitHandlers);
    })), new ls(r, this.handlers, this.inheritableHandlers, this.tags, this.inheritableTags, this.metadata, this.inheritableMetadata, this._parentRunId);
  }
  async handleCustomEvent(e, t, r, n, i) {
    await Promise.all(this.handlers.map((s) => B(async () => {
      if (!s.ignoreCustomEvent)
        try {
          await s.handleCustomEvent?.(e, t, r, this.tags, this.metadata);
        } catch (o) {
          if ((s.raiseError ? console.error : console.warn)(`Error in handler ${s.constructor.name}, handleCustomEvent: ${o}`), s.raiseError)
            throw o;
        }
    }, s.awaitHandlers)));
  }
  addHandler(e, t = !0) {
    this.handlers.push(e), t && this.inheritableHandlers.push(e);
  }
  removeHandler(e) {
    this.handlers = this.handlers.filter((t) => t !== e), this.inheritableHandlers = this.inheritableHandlers.filter((t) => t !== e);
  }
  setHandlers(e, t = !0) {
    this.handlers = [], this.inheritableHandlers = [];
    for (const r of e)
      this.addHandler(r, t);
  }
  addTags(e, t = !0) {
    this.removeTags(e), this.tags.push(...e), t && this.inheritableTags.push(...e);
  }
  removeTags(e) {
    this.tags = this.tags.filter((t) => !e.includes(t)), this.inheritableTags = this.inheritableTags.filter((t) => !e.includes(t));
  }
  addMetadata(e, t = !0) {
    this.metadata = { ...this.metadata, ...e }, t && (this.inheritableMetadata = { ...this.inheritableMetadata, ...e });
  }
  removeMetadata(e) {
    for (const t of Object.keys(e))
      delete this.metadata[t], delete this.inheritableMetadata[t];
  }
  copy(e = [], t = !0) {
    const r = new ae(this._parentRunId);
    for (const n of this.handlers) {
      const i = this.inheritableHandlers.includes(n);
      r.addHandler(n, i);
    }
    for (const n of this.tags) {
      const i = this.inheritableTags.includes(n);
      r.addTags([n], i);
    }
    for (const n of Object.keys(this.metadata)) {
      const i = Object.keys(this.inheritableMetadata).includes(n);
      r.addMetadata({ [n]: this.metadata[n] }, i);
    }
    for (const n of e)
      // Prevent multiple copies of console_callback_handler
      r.handlers.filter((i) => i.name === "console_callback_handler").some((i) => i.name === n.name) || r.addHandler(n, t);
    return r;
  }
  static fromHandlers(e) {
    class t extends Rt {
      constructor() {
        super(), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: W()
        }), Object.assign(this, e);
      }
    }
    const r = new this();
    return r.addHandler(new t()), r;
  }
  static configure(e, t, r, n, i, s, o) {
    return this._configureSync(e, t, r, n, i, s, o);
  }
  // TODO: Deprecate async method in favor of this one.
  static _configureSync(e, t, r, n, i, s, o) {
    let u;
    (e || t) && (Array.isArray(e) || !e ? (u = new ae(), u.setHandlers(e?.map(Wt) ?? [], !0)) : u = e, u = u.copy(Array.isArray(t) ? t.map(Wt) : t?.handlers, !1));
    const c = Pe("LANGCHAIN_VERBOSE") === "true" || o?.verbose, l = ht.getTraceableRunTree()?.tracingEnabled || is(), h = l || (Pe("LANGCHAIN_TRACING") ?? !1);
    if (c || h) {
      if (u || (u = new ae()), c && !u.handlers.some((d) => d.name === cn.prototype.name)) {
        const d = new cn();
        u.addHandler(d, !0);
      }
      if (h && !u.handlers.some((d) => d.name === "langchain_tracer") && l) {
        const d = new ht();
        u.addHandler(d, !0), u._parentRunId = ht.getTraceableRunTree()?.id ?? u._parentRunId;
      }
    }
    for (const { contextVar: d, inheritable: f = !0, handlerClass: p, envVar: T } of os()) {
      const y = T && Pe(T) === "true" && p;
      let v;
      const k = d !== void 0 ? sa(d) : void 0;
      k && Wa(k) ? v = k : y && (v = new p({})), v !== void 0 && (u || (u = new ae()), u.handlers.some((b) => b.name === v.name) || u.addHandler(v, f));
    }
    return (r || n) && u && (u.addTags(r ?? []), u.addTags(n ?? [], !1)), (i || s) && u && (u.addMetadata(i ?? {}), u.addMetadata(s ?? {}, !1)), u;
  }
}
function Wt(a) {
  return "name" in a ? a : Rt.fromMethods(a);
}
var R;
(function(a) {
  a.assertEqual = (n) => n;
  function e(n) {
  }
  a.assertIs = e;
  function t(n) {
    throw new Error();
  }
  a.assertNever = t, a.arrayToEnum = (n) => {
    const i = {};
    for (const s of n)
      i[s] = s;
    return i;
  }, a.getValidEnumValues = (n) => {
    const i = a.objectKeys(n).filter((o) => typeof n[n[o]] != "number"), s = {};
    for (const o of i)
      s[o] = n[o];
    return a.objectValues(s);
  }, a.objectValues = (n) => a.objectKeys(n).map(function(i) {
    return n[i];
  }), a.objectKeys = typeof Object.keys == "function" ? (n) => Object.keys(n) : (n) => {
    const i = [];
    for (const s in n)
      Object.prototype.hasOwnProperty.call(n, s) && i.push(s);
    return i;
  }, a.find = (n, i) => {
    for (const s of n)
      if (i(s))
        return s;
  }, a.isInteger = typeof Number.isInteger == "function" ? (n) => Number.isInteger(n) : (n) => typeof n == "number" && isFinite(n) && Math.floor(n) === n;
  function r(n, i = " | ") {
    return n.map((s) => typeof s == "string" ? `'${s}'` : s).join(i);
  }
  a.joinValues = r, a.jsonStringifyReplacer = (n, i) => typeof i == "bigint" ? i.toString() : i;
})(R || (R = {}));
var Fr;
(function(a) {
  a.mergeShapes = (e, t) => ({
    ...e,
    ...t
    // second overwrites first
  });
})(Fr || (Fr = {}));
const w = R.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]), be = (a) => {
  switch (typeof a) {
    case "undefined":
      return w.undefined;
    case "string":
      return w.string;
    case "number":
      return isNaN(a) ? w.nan : w.number;
    case "boolean":
      return w.boolean;
    case "function":
      return w.function;
    case "bigint":
      return w.bigint;
    case "symbol":
      return w.symbol;
    case "object":
      return Array.isArray(a) ? w.array : a === null ? w.null : a.then && typeof a.then == "function" && a.catch && typeof a.catch == "function" ? w.promise : typeof Map < "u" && a instanceof Map ? w.map : typeof Set < "u" && a instanceof Set ? w.set : typeof Date < "u" && a instanceof Date ? w.date : w.object;
    default:
      return w.unknown;
  }
}, m = R.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]), fs = (a) => JSON.stringify(a, null, 2).replace(/"([^"]+)":/g, "$1:");
class te extends Error {
  get errors() {
    return this.issues;
  }
  constructor(e) {
    super(), this.issues = [], this.addIssue = (r) => {
      this.issues = [...this.issues, r];
    }, this.addIssues = (r = []) => {
      this.issues = [...this.issues, ...r];
    };
    const t = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, t) : this.__proto__ = t, this.name = "ZodError", this.issues = e;
  }
  format(e) {
    const t = e || function(i) {
      return i.message;
    }, r = { _errors: [] }, n = (i) => {
      for (const s of i.issues)
        if (s.code === "invalid_union")
          s.unionErrors.map(n);
        else if (s.code === "invalid_return_type")
          n(s.returnTypeError);
        else if (s.code === "invalid_arguments")
          n(s.argumentsError);
        else if (s.path.length === 0)
          r._errors.push(t(s));
        else {
          let o = r, u = 0;
          for (; u < s.path.length; ) {
            const c = s.path[u];
            u === s.path.length - 1 ? (o[c] = o[c] || { _errors: [] }, o[c]._errors.push(t(s))) : o[c] = o[c] || { _errors: [] }, o = o[c], u++;
          }
        }
    };
    return n(this), r;
  }
  static assert(e) {
    if (!(e instanceof te))
      throw new Error(`Not a ZodError: ${e}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, R.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(e = (t) => t.message) {
    const t = {}, r = [];
    for (const n of this.issues)
      n.path.length > 0 ? (t[n.path[0]] = t[n.path[0]] || [], t[n.path[0]].push(e(n))) : r.push(e(n));
    return { formErrors: r, fieldErrors: t };
  }
  get formErrors() {
    return this.flatten();
  }
}
te.create = (a) => new te(a);
const Xe = (a, e) => {
  let t;
  switch (a.code) {
    case m.invalid_type:
      a.received === w.undefined ? t = "Required" : t = `Expected ${a.expected}, received ${a.received}`;
      break;
    case m.invalid_literal:
      t = `Invalid literal value, expected ${JSON.stringify(a.expected, R.jsonStringifyReplacer)}`;
      break;
    case m.unrecognized_keys:
      t = `Unrecognized key(s) in object: ${R.joinValues(a.keys, ", ")}`;
      break;
    case m.invalid_union:
      t = "Invalid input";
      break;
    case m.invalid_union_discriminator:
      t = `Invalid discriminator value. Expected ${R.joinValues(a.options)}`;
      break;
    case m.invalid_enum_value:
      t = `Invalid enum value. Expected ${R.joinValues(a.options)}, received '${a.received}'`;
      break;
    case m.invalid_arguments:
      t = "Invalid function arguments";
      break;
    case m.invalid_return_type:
      t = "Invalid function return type";
      break;
    case m.invalid_date:
      t = "Invalid date";
      break;
    case m.invalid_string:
      typeof a.validation == "object" ? "includes" in a.validation ? (t = `Invalid input: must include "${a.validation.includes}"`, typeof a.validation.position == "number" && (t = `${t} at one or more positions greater than or equal to ${a.validation.position}`)) : "startsWith" in a.validation ? t = `Invalid input: must start with "${a.validation.startsWith}"` : "endsWith" in a.validation ? t = `Invalid input: must end with "${a.validation.endsWith}"` : R.assertNever(a.validation) : a.validation !== "regex" ? t = `Invalid ${a.validation}` : t = "Invalid";
      break;
    case m.too_small:
      a.type === "array" ? t = `Array must contain ${a.exact ? "exactly" : a.inclusive ? "at least" : "more than"} ${a.minimum} element(s)` : a.type === "string" ? t = `String must contain ${a.exact ? "exactly" : a.inclusive ? "at least" : "over"} ${a.minimum} character(s)` : a.type === "number" ? t = `Number must be ${a.exact ? "exactly equal to " : a.inclusive ? "greater than or equal to " : "greater than "}${a.minimum}` : a.type === "date" ? t = `Date must be ${a.exact ? "exactly equal to " : a.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(a.minimum))}` : t = "Invalid input";
      break;
    case m.too_big:
      a.type === "array" ? t = `Array must contain ${a.exact ? "exactly" : a.inclusive ? "at most" : "less than"} ${a.maximum} element(s)` : a.type === "string" ? t = `String must contain ${a.exact ? "exactly" : a.inclusive ? "at most" : "under"} ${a.maximum} character(s)` : a.type === "number" ? t = `Number must be ${a.exact ? "exactly" : a.inclusive ? "less than or equal to" : "less than"} ${a.maximum}` : a.type === "bigint" ? t = `BigInt must be ${a.exact ? "exactly" : a.inclusive ? "less than or equal to" : "less than"} ${a.maximum}` : a.type === "date" ? t = `Date must be ${a.exact ? "exactly" : a.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(a.maximum))}` : t = "Invalid input";
      break;
    case m.custom:
      t = "Invalid input";
      break;
    case m.invalid_intersection_types:
      t = "Intersection results could not be merged";
      break;
    case m.not_multiple_of:
      t = `Number must be a multiple of ${a.multipleOf}`;
      break;
    case m.not_finite:
      t = "Number must be finite";
      break;
    default:
      t = e.defaultError, R.assertNever(a);
  }
  return { message: t };
};
let oa = Xe;
function ps(a) {
  oa = a;
}
function Kt() {
  return oa;
}
const Qt = (a) => {
  const { data: e, path: t, errorMaps: r, issueData: n } = a, i = [...t, ...n.path || []], s = {
    ...n,
    path: i
  };
  if (n.message !== void 0)
    return {
      ...n,
      path: i,
      message: n.message
    };
  let o = "";
  const u = r.filter((c) => !!c).slice().reverse();
  for (const c of u)
    o = c(s, { data: e, defaultError: o }).message;
  return {
    ...n,
    path: i,
    message: o
  };
}, ms = [];
function _(a, e) {
  const t = Kt(), r = Qt({
    issueData: e,
    data: a.data,
    path: a.path,
    errorMaps: [
      a.common.contextualErrorMap,
      // contextual error map is first priority
      a.schemaErrorMap,
      // then schema-bound map if available
      t,
      // then global override map
      t === Xe ? void 0 : Xe
      // then global default map
    ].filter((n) => !!n)
  });
  a.common.issues.push(r);
}
class V {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(e, t) {
    const r = [];
    for (const n of t) {
      if (n.status === "aborted")
        return S;
      n.status === "dirty" && e.dirty(), r.push(n.value);
    }
    return { status: e.value, value: r };
  }
  static async mergeObjectAsync(e, t) {
    const r = [];
    for (const n of t) {
      const i = await n.key, s = await n.value;
      r.push({
        key: i,
        value: s
      });
    }
    return V.mergeObjectSync(e, r);
  }
  static mergeObjectSync(e, t) {
    const r = {};
    for (const n of t) {
      const { key: i, value: s } = n;
      if (i.status === "aborted" || s.status === "aborted")
        return S;
      i.status === "dirty" && e.dirty(), s.status === "dirty" && e.dirty(), i.value !== "__proto__" && (typeof s.value < "u" || n.alwaysSet) && (r[i.value] = s.value);
    }
    return { status: e.value, value: r };
  }
}
const S = Object.freeze({
  status: "aborted"
}), We = (a) => ({ status: "dirty", value: a }), Q = (a) => ({ status: "valid", value: a }), Zr = (a) => a.status === "aborted", Br = (a) => a.status === "dirty", ze = (a) => a.status === "valid", _t = (a) => typeof Promise < "u" && a instanceof Promise;
function Yt(a, e, t, r) {
  if (typeof e == "function" ? a !== e || !0 : !e.has(a)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return e.get(a);
}
function ua(a, e, t, r, n) {
  if (typeof e == "function" ? a !== e || !0 : !e.has(a)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return e.set(a, t), t;
}
var E;
(function(a) {
  a.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, a.toString = (e) => typeof e == "string" ? e : e?.message;
})(E || (E = {}));
var ut, ct;
class me {
  constructor(e, t, r, n) {
    this._cachedPath = [], this.parent = e, this.data = t, this._path = r, this._key = n;
  }
  get path() {
    return this._cachedPath.length || (this._key instanceof Array ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const Pn = (a, e) => {
  if (ze(e))
    return { success: !0, data: e.value };
  if (!a.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const t = new te(a.common.issues);
      return this._error = t, this._error;
    }
  };
};
function A(a) {
  if (!a)
    return {};
  const { errorMap: e, invalid_type_error: t, required_error: r, description: n } = a;
  if (e && (t || r))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return e ? { errorMap: e, description: n } : { errorMap: (s, o) => {
    var u, c;
    const { message: l } = a;
    return s.code === "invalid_enum_value" ? { message: l ?? o.defaultError } : typeof o.data > "u" ? { message: (u = l ?? r) !== null && u !== void 0 ? u : o.defaultError } : s.code !== "invalid_type" ? { message: o.defaultError } : { message: (c = l ?? t) !== null && c !== void 0 ? c : o.defaultError };
  }, description: n };
}
class P {
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return be(e.data);
  }
  _getOrReturnCtx(e, t) {
    return t || {
      common: e.parent.common,
      data: e.data,
      parsedType: be(e.data),
      schemaErrorMap: this._def.errorMap,
      path: e.path,
      parent: e.parent
    };
  }
  _processInputParams(e) {
    return {
      status: new V(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: be(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      }
    };
  }
  _parseSync(e) {
    const t = this._parse(e);
    if (_t(t))
      throw new Error("Synchronous parse encountered promise.");
    return t;
  }
  _parseAsync(e) {
    const t = this._parse(e);
    return Promise.resolve(t);
  }
  parse(e, t) {
    const r = this.safeParse(e, t);
    if (r.success)
      return r.data;
    throw r.error;
  }
  safeParse(e, t) {
    var r;
    const n = {
      common: {
        issues: [],
        async: (r = t?.async) !== null && r !== void 0 ? r : !1,
        contextualErrorMap: t?.errorMap
      },
      path: t?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: be(e)
    }, i = this._parseSync({ data: e, path: n.path, parent: n });
    return Pn(n, i);
  }
  "~validate"(e) {
    var t, r;
    const n = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: be(e)
    };
    if (!this["~standard"].async)
      try {
        const i = this._parseSync({ data: e, path: [], parent: n });
        return ze(i) ? {
          value: i.value
        } : {
          issues: n.common.issues
        };
      } catch (i) {
        !((r = (t = i?.message) === null || t === void 0 ? void 0 : t.toLowerCase()) === null || r === void 0) && r.includes("encountered") && (this["~standard"].async = !0), n.common = {
          issues: [],
          async: !0
        };
      }
    return this._parseAsync({ data: e, path: [], parent: n }).then((i) => ze(i) ? {
      value: i.value
    } : {
      issues: n.common.issues
    });
  }
  async parseAsync(e, t) {
    const r = await this.safeParseAsync(e, t);
    if (r.success)
      return r.data;
    throw r.error;
  }
  async safeParseAsync(e, t) {
    const r = {
      common: {
        issues: [],
        contextualErrorMap: t?.errorMap,
        async: !0
      },
      path: t?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: be(e)
    }, n = this._parse({ data: e, path: r.path, parent: r }), i = await (_t(n) ? n : Promise.resolve(n));
    return Pn(r, i);
  }
  refine(e, t) {
    const r = (n) => typeof t == "string" || typeof t > "u" ? { message: t } : typeof t == "function" ? t(n) : t;
    return this._refinement((n, i) => {
      const s = e(n), o = () => i.addIssue({
        code: m.custom,
        ...r(n)
      });
      return typeof Promise < "u" && s instanceof Promise ? s.then((u) => u ? !0 : (o(), !1)) : s ? !0 : (o(), !1);
    });
  }
  refinement(e, t) {
    return this._refinement((r, n) => e(r) ? !0 : (n.addIssue(typeof t == "function" ? t(r, n) : t), !1));
  }
  _refinement(e) {
    return new he({
      schema: this,
      typeName: g.ZodEffects,
      effect: { type: "refinement", refinement: e }
    });
  }
  superRefine(e) {
    return this._refinement(e);
  }
  constructor(e) {
    this.spa = this.safeParseAsync, this._def = e, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this), this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (t) => this["~validate"](t)
    };
  }
  optional() {
    return le.create(this, this._def);
  }
  nullable() {
    return Ne.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ce.create(this);
  }
  promise() {
    return tt.create(this, this._def);
  }
  or(e) {
    return Et.create([this, e], this._def);
  }
  and(e) {
    return Ot.create(this, e, this._def);
  }
  transform(e) {
    return new he({
      ...A(this._def),
      schema: this,
      typeName: g.ZodEffects,
      effect: { type: "transform", transform: e }
    });
  }
  default(e) {
    const t = typeof e == "function" ? e : () => e;
    return new At({
      ...A(this._def),
      innerType: this,
      defaultValue: t,
      typeName: g.ZodDefault
    });
  }
  brand() {
    return new Xr({
      typeName: g.ZodBranded,
      type: this,
      ...A(this._def)
    });
  }
  catch(e) {
    const t = typeof e == "function" ? e : () => e;
    return new It({
      ...A(this._def),
      innerType: this,
      catchValue: t,
      typeName: g.ZodCatch
    });
  }
  describe(e) {
    const t = this.constructor;
    return new t({
      ...this._def,
      description: e
    });
  }
  pipe(e) {
    return Nt.create(this, e);
  }
  readonly() {
    return Pt.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const gs = /^c[^\s-]{8,}$/i, ys = /^[0-9a-z]+$/, _s = /^[0-9A-HJKMNP-TV-Z]{26}$/i, bs = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, ws = /^[a-z0-9_-]{21}$/i, vs = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, Es = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, Os = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, Ts = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let Cr;
const Ss = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, ks = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/, xs = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/, As = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Is = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, Ps = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/, ca = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", Cs = new RegExp(`^${ca}$`);
function la(a) {
  let e = "([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d";
  return a.precision ? e = `${e}\\.\\d{${a.precision}}` : a.precision == null && (e = `${e}(\\.\\d+)?`), e;
}
function Rs(a) {
  return new RegExp(`^${la(a)}$`);
}
function da(a) {
  let e = `${ca}T${la(a)}`;
  const t = [];
  return t.push(a.local ? "Z?" : "Z"), a.offset && t.push("([+-]\\d{2}:?\\d{2})"), e = `${e}(${t.join("|")})`, new RegExp(`^${e}$`);
}
function js(a, e) {
  return !!((e === "v4" || !e) && Ss.test(a) || (e === "v6" || !e) && xs.test(a));
}
function Ns(a, e) {
  if (!vs.test(a))
    return !1;
  try {
    const [t] = a.split("."), r = t.replace(/-/g, "+").replace(/_/g, "/").padEnd(t.length + (4 - t.length % 4) % 4, "="), n = JSON.parse(atob(r));
    return !(typeof n != "object" || n === null || !n.typ || !n.alg || e && n.alg !== e);
  } catch {
    return !1;
  }
}
function $s(a, e) {
  return !!((e === "v4" || !e) && ks.test(a) || (e === "v6" || !e) && As.test(a));
}
class ue extends P {
  _parse(e) {
    if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== w.string) {
      const i = this._getOrReturnCtx(e);
      return _(i, {
        code: m.invalid_type,
        expected: w.string,
        received: i.parsedType
      }), S;
    }
    const r = new V();
    let n;
    for (const i of this._def.checks)
      if (i.kind === "min")
        e.data.length < i.value && (n = this._getOrReturnCtx(e, n), _(n, {
          code: m.too_small,
          minimum: i.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: i.message
        }), r.dirty());
      else if (i.kind === "max")
        e.data.length > i.value && (n = this._getOrReturnCtx(e, n), _(n, {
          code: m.too_big,
          maximum: i.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: i.message
        }), r.dirty());
      else if (i.kind === "length") {
        const s = e.data.length > i.value, o = e.data.length < i.value;
        (s || o) && (n = this._getOrReturnCtx(e, n), s ? _(n, {
          code: m.too_big,
          maximum: i.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: i.message
        }) : o && _(n, {
          code: m.too_small,
          minimum: i.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: i.message
        }), r.dirty());
      } else if (i.kind === "email")
        Os.test(e.data) || (n = this._getOrReturnCtx(e, n), _(n, {
          validation: "email",
          code: m.invalid_string,
          message: i.message
        }), r.dirty());
      else if (i.kind === "emoji")
        Cr || (Cr = new RegExp(Ts, "u")), Cr.test(e.data) || (n = this._getOrReturnCtx(e, n), _(n, {
          validation: "emoji",
          code: m.invalid_string,
          message: i.message
        }), r.dirty());
      else if (i.kind === "uuid")
        bs.test(e.data) || (n = this._getOrReturnCtx(e, n), _(n, {
          validation: "uuid",
          code: m.invalid_string,
          message: i.message
        }), r.dirty());
      else if (i.kind === "nanoid")
        ws.test(e.data) || (n = this._getOrReturnCtx(e, n), _(n, {
          validation: "nanoid",
          code: m.invalid_string,
          message: i.message
        }), r.dirty());
      else if (i.kind === "cuid")
        gs.test(e.data) || (n = this._getOrReturnCtx(e, n), _(n, {
          validation: "cuid",
          code: m.invalid_string,
          message: i.message
        }), r.dirty());
      else if (i.kind === "cuid2")
        ys.test(e.data) || (n = this._getOrReturnCtx(e, n), _(n, {
          validation: "cuid2",
          code: m.invalid_string,
          message: i.message
        }), r.dirty());
      else if (i.kind === "ulid")
        _s.test(e.data) || (n = this._getOrReturnCtx(e, n), _(n, {
          validation: "ulid",
          code: m.invalid_string,
          message: i.message
        }), r.dirty());
      else if (i.kind === "url")
        try {
          new URL(e.data);
        } catch {
          n = this._getOrReturnCtx(e, n), _(n, {
            validation: "url",
            code: m.invalid_string,
            message: i.message
          }), r.dirty();
        }
      else i.kind === "regex" ? (i.regex.lastIndex = 0, i.regex.test(e.data) || (n = this._getOrReturnCtx(e, n), _(n, {
        validation: "regex",
        code: m.invalid_string,
        message: i.message
      }), r.dirty())) : i.kind === "trim" ? e.data = e.data.trim() : i.kind === "includes" ? e.data.includes(i.value, i.position) || (n = this._getOrReturnCtx(e, n), _(n, {
        code: m.invalid_string,
        validation: { includes: i.value, position: i.position },
        message: i.message
      }), r.dirty()) : i.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : i.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : i.kind === "startsWith" ? e.data.startsWith(i.value) || (n = this._getOrReturnCtx(e, n), _(n, {
        code: m.invalid_string,
        validation: { startsWith: i.value },
        message: i.message
      }), r.dirty()) : i.kind === "endsWith" ? e.data.endsWith(i.value) || (n = this._getOrReturnCtx(e, n), _(n, {
        code: m.invalid_string,
        validation: { endsWith: i.value },
        message: i.message
      }), r.dirty()) : i.kind === "datetime" ? da(i).test(e.data) || (n = this._getOrReturnCtx(e, n), _(n, {
        code: m.invalid_string,
        validation: "datetime",
        message: i.message
      }), r.dirty()) : i.kind === "date" ? Cs.test(e.data) || (n = this._getOrReturnCtx(e, n), _(n, {
        code: m.invalid_string,
        validation: "date",
        message: i.message
      }), r.dirty()) : i.kind === "time" ? Rs(i).test(e.data) || (n = this._getOrReturnCtx(e, n), _(n, {
        code: m.invalid_string,
        validation: "time",
        message: i.message
      }), r.dirty()) : i.kind === "duration" ? Es.test(e.data) || (n = this._getOrReturnCtx(e, n), _(n, {
        validation: "duration",
        code: m.invalid_string,
        message: i.message
      }), r.dirty()) : i.kind === "ip" ? js(e.data, i.version) || (n = this._getOrReturnCtx(e, n), _(n, {
        validation: "ip",
        code: m.invalid_string,
        message: i.message
      }), r.dirty()) : i.kind === "jwt" ? Ns(e.data, i.alg) || (n = this._getOrReturnCtx(e, n), _(n, {
        validation: "jwt",
        code: m.invalid_string,
        message: i.message
      }), r.dirty()) : i.kind === "cidr" ? $s(e.data, i.version) || (n = this._getOrReturnCtx(e, n), _(n, {
        validation: "cidr",
        code: m.invalid_string,
        message: i.message
      }), r.dirty()) : i.kind === "base64" ? Is.test(e.data) || (n = this._getOrReturnCtx(e, n), _(n, {
        validation: "base64",
        code: m.invalid_string,
        message: i.message
      }), r.dirty()) : i.kind === "base64url" ? Ps.test(e.data) || (n = this._getOrReturnCtx(e, n), _(n, {
        validation: "base64url",
        code: m.invalid_string,
        message: i.message
      }), r.dirty()) : R.assertNever(i);
    return { status: r.value, value: e.data };
  }
  _regex(e, t, r) {
    return this.refinement((n) => e.test(n), {
      validation: t,
      code: m.invalid_string,
      ...E.errToObj(r)
    });
  }
  _addCheck(e) {
    return new ue({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  email(e) {
    return this._addCheck({ kind: "email", ...E.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: "url", ...E.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: "emoji", ...E.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: "uuid", ...E.errToObj(e) });
  }
  nanoid(e) {
    return this._addCheck({ kind: "nanoid", ...E.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: "cuid", ...E.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: "cuid2", ...E.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: "ulid", ...E.errToObj(e) });
  }
  base64(e) {
    return this._addCheck({ kind: "base64", ...E.errToObj(e) });
  }
  base64url(e) {
    return this._addCheck({
      kind: "base64url",
      ...E.errToObj(e)
    });
  }
  jwt(e) {
    return this._addCheck({ kind: "jwt", ...E.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: "ip", ...E.errToObj(e) });
  }
  cidr(e) {
    return this._addCheck({ kind: "cidr", ...E.errToObj(e) });
  }
  datetime(e) {
    var t, r;
    return typeof e == "string" ? this._addCheck({
      kind: "datetime",
      precision: null,
      offset: !1,
      local: !1,
      message: e
    }) : this._addCheck({
      kind: "datetime",
      precision: typeof e?.precision > "u" ? null : e?.precision,
      offset: (t = e?.offset) !== null && t !== void 0 ? t : !1,
      local: (r = e?.local) !== null && r !== void 0 ? r : !1,
      ...E.errToObj(e?.message)
    });
  }
  date(e) {
    return this._addCheck({ kind: "date", message: e });
  }
  time(e) {
    return typeof e == "string" ? this._addCheck({
      kind: "time",
      precision: null,
      message: e
    }) : this._addCheck({
      kind: "time",
      precision: typeof e?.precision > "u" ? null : e?.precision,
      ...E.errToObj(e?.message)
    });
  }
  duration(e) {
    return this._addCheck({ kind: "duration", ...E.errToObj(e) });
  }
  regex(e, t) {
    return this._addCheck({
      kind: "regex",
      regex: e,
      ...E.errToObj(t)
    });
  }
  includes(e, t) {
    return this._addCheck({
      kind: "includes",
      value: e,
      position: t?.position,
      ...E.errToObj(t?.message)
    });
  }
  startsWith(e, t) {
    return this._addCheck({
      kind: "startsWith",
      value: e,
      ...E.errToObj(t)
    });
  }
  endsWith(e, t) {
    return this._addCheck({
      kind: "endsWith",
      value: e,
      ...E.errToObj(t)
    });
  }
  min(e, t) {
    return this._addCheck({
      kind: "min",
      value: e,
      ...E.errToObj(t)
    });
  }
  max(e, t) {
    return this._addCheck({
      kind: "max",
      value: e,
      ...E.errToObj(t)
    });
  }
  length(e, t) {
    return this._addCheck({
      kind: "length",
      value: e,
      ...E.errToObj(t)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(e) {
    return this.min(1, E.errToObj(e));
  }
  trim() {
    return new ue({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new ue({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new ue({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((e) => e.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((e) => e.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((e) => e.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((e) => e.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((e) => e.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((e) => e.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((e) => e.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((e) => e.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((e) => e.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((e) => e.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((e) => e.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((e) => e.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((e) => e.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((e) => e.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((e) => e.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((e) => e.kind === "base64url");
  }
  get minLength() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxLength() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e;
  }
}
ue.create = (a) => {
  var e;
  return new ue({
    checks: [],
    typeName: g.ZodString,
    coerce: (e = a?.coerce) !== null && e !== void 0 ? e : !1,
    ...A(a)
  });
};
function Ms(a, e) {
  const t = (a.toString().split(".")[1] || "").length, r = (e.toString().split(".")[1] || "").length, n = t > r ? t : r, i = parseInt(a.toFixed(n).replace(".", "")), s = parseInt(e.toFixed(n).replace(".", ""));
  return i % s / Math.pow(10, n);
}
class Ce extends P {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== w.number) {
      const i = this._getOrReturnCtx(e);
      return _(i, {
        code: m.invalid_type,
        expected: w.number,
        received: i.parsedType
      }), S;
    }
    let r;
    const n = new V();
    for (const i of this._def.checks)
      i.kind === "int" ? R.isInteger(e.data) || (r = this._getOrReturnCtx(e, r), _(r, {
        code: m.invalid_type,
        expected: "integer",
        received: "float",
        message: i.message
      }), n.dirty()) : i.kind === "min" ? (i.inclusive ? e.data < i.value : e.data <= i.value) && (r = this._getOrReturnCtx(e, r), _(r, {
        code: m.too_small,
        minimum: i.value,
        type: "number",
        inclusive: i.inclusive,
        exact: !1,
        message: i.message
      }), n.dirty()) : i.kind === "max" ? (i.inclusive ? e.data > i.value : e.data >= i.value) && (r = this._getOrReturnCtx(e, r), _(r, {
        code: m.too_big,
        maximum: i.value,
        type: "number",
        inclusive: i.inclusive,
        exact: !1,
        message: i.message
      }), n.dirty()) : i.kind === "multipleOf" ? Ms(e.data, i.value) !== 0 && (r = this._getOrReturnCtx(e, r), _(r, {
        code: m.not_multiple_of,
        multipleOf: i.value,
        message: i.message
      }), n.dirty()) : i.kind === "finite" ? Number.isFinite(e.data) || (r = this._getOrReturnCtx(e, r), _(r, {
        code: m.not_finite,
        message: i.message
      }), n.dirty()) : R.assertNever(i);
    return { status: n.value, value: e.data };
  }
  gte(e, t) {
    return this.setLimit("min", e, !0, E.toString(t));
  }
  gt(e, t) {
    return this.setLimit("min", e, !1, E.toString(t));
  }
  lte(e, t) {
    return this.setLimit("max", e, !0, E.toString(t));
  }
  lt(e, t) {
    return this.setLimit("max", e, !1, E.toString(t));
  }
  setLimit(e, t, r, n) {
    return new Ce({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: t,
          inclusive: r,
          message: E.toString(n)
        }
      ]
    });
  }
  _addCheck(e) {
    return new Ce({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  int(e) {
    return this._addCheck({
      kind: "int",
      message: E.toString(e)
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: E.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: E.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: E.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: E.toString(e)
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: E.toString(t)
    });
  }
  finite(e) {
    return this._addCheck({
      kind: "finite",
      message: E.toString(e)
    });
  }
  safe(e) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: E.toString(e)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: E.toString(e)
    });
  }
  get minValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e;
  }
  get isInt() {
    return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && R.isInteger(e.value));
  }
  get isFinite() {
    let e = null, t = null;
    for (const r of this._def.checks) {
      if (r.kind === "finite" || r.kind === "int" || r.kind === "multipleOf")
        return !0;
      r.kind === "min" ? (t === null || r.value > t) && (t = r.value) : r.kind === "max" && (e === null || r.value < e) && (e = r.value);
    }
    return Number.isFinite(t) && Number.isFinite(e);
  }
}
Ce.create = (a) => new Ce({
  checks: [],
  typeName: g.ZodNumber,
  coerce: a?.coerce || !1,
  ...A(a)
});
class Re extends P {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte;
  }
  _parse(e) {
    if (this._def.coerce)
      try {
        e.data = BigInt(e.data);
      } catch {
        return this._getInvalidInput(e);
      }
    if (this._getType(e) !== w.bigint)
      return this._getInvalidInput(e);
    let r;
    const n = new V();
    for (const i of this._def.checks)
      i.kind === "min" ? (i.inclusive ? e.data < i.value : e.data <= i.value) && (r = this._getOrReturnCtx(e, r), _(r, {
        code: m.too_small,
        type: "bigint",
        minimum: i.value,
        inclusive: i.inclusive,
        message: i.message
      }), n.dirty()) : i.kind === "max" ? (i.inclusive ? e.data > i.value : e.data >= i.value) && (r = this._getOrReturnCtx(e, r), _(r, {
        code: m.too_big,
        type: "bigint",
        maximum: i.value,
        inclusive: i.inclusive,
        message: i.message
      }), n.dirty()) : i.kind === "multipleOf" ? e.data % i.value !== BigInt(0) && (r = this._getOrReturnCtx(e, r), _(r, {
        code: m.not_multiple_of,
        multipleOf: i.value,
        message: i.message
      }), n.dirty()) : R.assertNever(i);
    return { status: n.value, value: e.data };
  }
  _getInvalidInput(e) {
    const t = this._getOrReturnCtx(e);
    return _(t, {
      code: m.invalid_type,
      expected: w.bigint,
      received: t.parsedType
    }), S;
  }
  gte(e, t) {
    return this.setLimit("min", e, !0, E.toString(t));
  }
  gt(e, t) {
    return this.setLimit("min", e, !1, E.toString(t));
  }
  lte(e, t) {
    return this.setLimit("max", e, !0, E.toString(t));
  }
  lt(e, t) {
    return this.setLimit("max", e, !1, E.toString(t));
  }
  setLimit(e, t, r, n) {
    return new Re({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: t,
          inclusive: r,
          message: E.toString(n)
        }
      ]
    });
  }
  _addCheck(e) {
    return new Re({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: E.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: E.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: E.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: E.toString(e)
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: E.toString(t)
    });
  }
  get minValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e;
  }
}
Re.create = (a) => {
  var e;
  return new Re({
    checks: [],
    typeName: g.ZodBigInt,
    coerce: (e = a?.coerce) !== null && e !== void 0 ? e : !1,
    ...A(a)
  });
};
class bt extends P {
  _parse(e) {
    if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== w.boolean) {
      const r = this._getOrReturnCtx(e);
      return _(r, {
        code: m.invalid_type,
        expected: w.boolean,
        received: r.parsedType
      }), S;
    }
    return Q(e.data);
  }
}
bt.create = (a) => new bt({
  typeName: g.ZodBoolean,
  coerce: a?.coerce || !1,
  ...A(a)
});
class qe extends P {
  _parse(e) {
    if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== w.date) {
      const i = this._getOrReturnCtx(e);
      return _(i, {
        code: m.invalid_type,
        expected: w.date,
        received: i.parsedType
      }), S;
    }
    if (isNaN(e.data.getTime())) {
      const i = this._getOrReturnCtx(e);
      return _(i, {
        code: m.invalid_date
      }), S;
    }
    const r = new V();
    let n;
    for (const i of this._def.checks)
      i.kind === "min" ? e.data.getTime() < i.value && (n = this._getOrReturnCtx(e, n), _(n, {
        code: m.too_small,
        message: i.message,
        inclusive: !0,
        exact: !1,
        minimum: i.value,
        type: "date"
      }), r.dirty()) : i.kind === "max" ? e.data.getTime() > i.value && (n = this._getOrReturnCtx(e, n), _(n, {
        code: m.too_big,
        message: i.message,
        inclusive: !0,
        exact: !1,
        maximum: i.value,
        type: "date"
      }), r.dirty()) : R.assertNever(i);
    return {
      status: r.value,
      value: new Date(e.data.getTime())
    };
  }
  _addCheck(e) {
    return new qe({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  min(e, t) {
    return this._addCheck({
      kind: "min",
      value: e.getTime(),
      message: E.toString(t)
    });
  }
  max(e, t) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: E.toString(t)
    });
  }
  get minDate() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e != null ? new Date(e) : null;
  }
  get maxDate() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e != null ? new Date(e) : null;
  }
}
qe.create = (a) => new qe({
  checks: [],
  coerce: a?.coerce || !1,
  typeName: g.ZodDate,
  ...A(a)
});
class Xt extends P {
  _parse(e) {
    if (this._getType(e) !== w.symbol) {
      const r = this._getOrReturnCtx(e);
      return _(r, {
        code: m.invalid_type,
        expected: w.symbol,
        received: r.parsedType
      }), S;
    }
    return Q(e.data);
  }
}
Xt.create = (a) => new Xt({
  typeName: g.ZodSymbol,
  ...A(a)
});
class wt extends P {
  _parse(e) {
    if (this._getType(e) !== w.undefined) {
      const r = this._getOrReturnCtx(e);
      return _(r, {
        code: m.invalid_type,
        expected: w.undefined,
        received: r.parsedType
      }), S;
    }
    return Q(e.data);
  }
}
wt.create = (a) => new wt({
  typeName: g.ZodUndefined,
  ...A(a)
});
class vt extends P {
  _parse(e) {
    if (this._getType(e) !== w.null) {
      const r = this._getOrReturnCtx(e);
      return _(r, {
        code: m.invalid_type,
        expected: w.null,
        received: r.parsedType
      }), S;
    }
    return Q(e.data);
  }
}
vt.create = (a) => new vt({
  typeName: g.ZodNull,
  ...A(a)
});
class et extends P {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return Q(e.data);
  }
}
et.create = (a) => new et({
  typeName: g.ZodAny,
  ...A(a)
});
class Ze extends P {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return Q(e.data);
  }
}
Ze.create = (a) => new Ze({
  typeName: g.ZodUnknown,
  ...A(a)
});
class Te extends P {
  _parse(e) {
    const t = this._getOrReturnCtx(e);
    return _(t, {
      code: m.invalid_type,
      expected: w.never,
      received: t.parsedType
    }), S;
  }
}
Te.create = (a) => new Te({
  typeName: g.ZodNever,
  ...A(a)
});
class er extends P {
  _parse(e) {
    if (this._getType(e) !== w.undefined) {
      const r = this._getOrReturnCtx(e);
      return _(r, {
        code: m.invalid_type,
        expected: w.void,
        received: r.parsedType
      }), S;
    }
    return Q(e.data);
  }
}
er.create = (a) => new er({
  typeName: g.ZodVoid,
  ...A(a)
});
class ce extends P {
  _parse(e) {
    const { ctx: t, status: r } = this._processInputParams(e), n = this._def;
    if (t.parsedType !== w.array)
      return _(t, {
        code: m.invalid_type,
        expected: w.array,
        received: t.parsedType
      }), S;
    if (n.exactLength !== null) {
      const s = t.data.length > n.exactLength.value, o = t.data.length < n.exactLength.value;
      (s || o) && (_(t, {
        code: s ? m.too_big : m.too_small,
        minimum: o ? n.exactLength.value : void 0,
        maximum: s ? n.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: n.exactLength.message
      }), r.dirty());
    }
    if (n.minLength !== null && t.data.length < n.minLength.value && (_(t, {
      code: m.too_small,
      minimum: n.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: n.minLength.message
    }), r.dirty()), n.maxLength !== null && t.data.length > n.maxLength.value && (_(t, {
      code: m.too_big,
      maximum: n.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: n.maxLength.message
    }), r.dirty()), t.common.async)
      return Promise.all([...t.data].map((s, o) => n.type._parseAsync(new me(t, s, t.path, o)))).then((s) => V.mergeArray(r, s));
    const i = [...t.data].map((s, o) => n.type._parseSync(new me(t, s, t.path, o)));
    return V.mergeArray(r, i);
  }
  get element() {
    return this._def.type;
  }
  min(e, t) {
    return new ce({
      ...this._def,
      minLength: { value: e, message: E.toString(t) }
    });
  }
  max(e, t) {
    return new ce({
      ...this._def,
      maxLength: { value: e, message: E.toString(t) }
    });
  }
  length(e, t) {
    return new ce({
      ...this._def,
      exactLength: { value: e, message: E.toString(t) }
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
ce.create = (a, e) => new ce({
  type: a,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: g.ZodArray,
  ...A(e)
});
function Ge(a) {
  if (a instanceof U) {
    const e = {};
    for (const t in a.shape) {
      const r = a.shape[t];
      e[t] = le.create(Ge(r));
    }
    return new U({
      ...a._def,
      shape: () => e
    });
  } else return a instanceof ce ? new ce({
    ...a._def,
    type: Ge(a.element)
  }) : a instanceof le ? le.create(Ge(a.unwrap())) : a instanceof Ne ? Ne.create(Ge(a.unwrap())) : a instanceof ge ? ge.create(a.items.map((e) => Ge(e))) : a;
}
class U extends P {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const e = this._def.shape(), t = R.objectKeys(e);
    return this._cached = { shape: e, keys: t };
  }
  _parse(e) {
    if (this._getType(e) !== w.object) {
      const c = this._getOrReturnCtx(e);
      return _(c, {
        code: m.invalid_type,
        expected: w.object,
        received: c.parsedType
      }), S;
    }
    const { status: r, ctx: n } = this._processInputParams(e), { shape: i, keys: s } = this._getCached(), o = [];
    if (!(this._def.catchall instanceof Te && this._def.unknownKeys === "strip"))
      for (const c in n.data)
        s.includes(c) || o.push(c);
    const u = [];
    for (const c of s) {
      const l = i[c], h = n.data[c];
      u.push({
        key: { status: "valid", value: c },
        value: l._parse(new me(n, h, n.path, c)),
        alwaysSet: c in n.data
      });
    }
    if (this._def.catchall instanceof Te) {
      const c = this._def.unknownKeys;
      if (c === "passthrough")
        for (const l of o)
          u.push({
            key: { status: "valid", value: l },
            value: { status: "valid", value: n.data[l] }
          });
      else if (c === "strict")
        o.length > 0 && (_(n, {
          code: m.unrecognized_keys,
          keys: o
        }), r.dirty());
      else if (c !== "strip") throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const c = this._def.catchall;
      for (const l of o) {
        const h = n.data[l];
        u.push({
          key: { status: "valid", value: l },
          value: c._parse(
            new me(n, h, n.path, l)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: l in n.data
        });
      }
    }
    return n.common.async ? Promise.resolve().then(async () => {
      const c = [];
      for (const l of u) {
        const h = await l.key, d = await l.value;
        c.push({
          key: h,
          value: d,
          alwaysSet: l.alwaysSet
        });
      }
      return c;
    }).then((c) => V.mergeObjectSync(r, c)) : V.mergeObjectSync(r, u);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return new U({
      ...this._def,
      unknownKeys: "strict",
      ...e !== void 0 ? {
        errorMap: (t, r) => {
          var n, i, s, o;
          const u = (s = (i = (n = this._def).errorMap) === null || i === void 0 ? void 0 : i.call(n, t, r).message) !== null && s !== void 0 ? s : r.defaultError;
          return t.code === "unrecognized_keys" ? {
            message: (o = E.errToObj(e).message) !== null && o !== void 0 ? o : u
          } : {
            message: u
          };
        }
      } : {}
    });
  }
  strip() {
    return new U({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new U({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(e) {
    return new U({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...e
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(e) {
    return new U({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...e._def.shape()
      }),
      typeName: g.ZodObject
    });
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(e, t) {
    return this.augment({ [e]: t });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(e) {
    return new U({
      ...this._def,
      catchall: e
    });
  }
  pick(e) {
    const t = {};
    return R.objectKeys(e).forEach((r) => {
      e[r] && this.shape[r] && (t[r] = this.shape[r]);
    }), new U({
      ...this._def,
      shape: () => t
    });
  }
  omit(e) {
    const t = {};
    return R.objectKeys(this.shape).forEach((r) => {
      e[r] || (t[r] = this.shape[r]);
    }), new U({
      ...this._def,
      shape: () => t
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return Ge(this);
  }
  partial(e) {
    const t = {};
    return R.objectKeys(this.shape).forEach((r) => {
      const n = this.shape[r];
      e && !e[r] ? t[r] = n : t[r] = n.optional();
    }), new U({
      ...this._def,
      shape: () => t
    });
  }
  required(e) {
    const t = {};
    return R.objectKeys(this.shape).forEach((r) => {
      if (e && !e[r])
        t[r] = this.shape[r];
      else {
        let i = this.shape[r];
        for (; i instanceof le; )
          i = i._def.innerType;
        t[r] = i;
      }
    }), new U({
      ...this._def,
      shape: () => t
    });
  }
  keyof() {
    return ha(R.objectKeys(this.shape));
  }
}
U.create = (a, e) => new U({
  shape: () => a,
  unknownKeys: "strip",
  catchall: Te.create(),
  typeName: g.ZodObject,
  ...A(e)
});
U.strictCreate = (a, e) => new U({
  shape: () => a,
  unknownKeys: "strict",
  catchall: Te.create(),
  typeName: g.ZodObject,
  ...A(e)
});
U.lazycreate = (a, e) => new U({
  shape: a,
  unknownKeys: "strip",
  catchall: Te.create(),
  typeName: g.ZodObject,
  ...A(e)
});
class Et extends P {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), r = this._def.options;
    function n(i) {
      for (const o of i)
        if (o.result.status === "valid")
          return o.result;
      for (const o of i)
        if (o.result.status === "dirty")
          return t.common.issues.push(...o.ctx.common.issues), o.result;
      const s = i.map((o) => new te(o.ctx.common.issues));
      return _(t, {
        code: m.invalid_union,
        unionErrors: s
      }), S;
    }
    if (t.common.async)
      return Promise.all(r.map(async (i) => {
        const s = {
          ...t,
          common: {
            ...t.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await i._parseAsync({
            data: t.data,
            path: t.path,
            parent: s
          }),
          ctx: s
        };
      })).then(n);
    {
      let i;
      const s = [];
      for (const u of r) {
        const c = {
          ...t,
          common: {
            ...t.common,
            issues: []
          },
          parent: null
        }, l = u._parseSync({
          data: t.data,
          path: t.path,
          parent: c
        });
        if (l.status === "valid")
          return l;
        l.status === "dirty" && !i && (i = { result: l, ctx: c }), c.common.issues.length && s.push(c.common.issues);
      }
      if (i)
        return t.common.issues.push(...i.ctx.common.issues), i.result;
      const o = s.map((u) => new te(u));
      return _(t, {
        code: m.invalid_union,
        unionErrors: o
      }), S;
    }
  }
  get options() {
    return this._def.options;
  }
}
Et.create = (a, e) => new Et({
  options: a,
  typeName: g.ZodUnion,
  ...A(e)
});
const _e = (a) => a instanceof St ? _e(a.schema) : a instanceof he ? _e(a.innerType()) : a instanceof kt ? [a.value] : a instanceof je ? a.options : a instanceof xt ? R.objectValues(a.enum) : a instanceof At ? _e(a._def.innerType) : a instanceof wt ? [void 0] : a instanceof vt ? [null] : a instanceof le ? [void 0, ..._e(a.unwrap())] : a instanceof Ne ? [null, ..._e(a.unwrap())] : a instanceof Xr || a instanceof Pt ? _e(a.unwrap()) : a instanceof It ? _e(a._def.innerType) : [];
class dr extends P {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== w.object)
      return _(t, {
        code: m.invalid_type,
        expected: w.object,
        received: t.parsedType
      }), S;
    const r = this.discriminator, n = t.data[r], i = this.optionsMap.get(n);
    return i ? t.common.async ? i._parseAsync({
      data: t.data,
      path: t.path,
      parent: t
    }) : i._parseSync({
      data: t.data,
      path: t.path,
      parent: t
    }) : (_(t, {
      code: m.invalid_union_discriminator,
      options: Array.from(this.optionsMap.keys()),
      path: [r]
    }), S);
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(e, t, r) {
    const n = /* @__PURE__ */ new Map();
    for (const i of t) {
      const s = _e(i.shape[e]);
      if (!s.length)
        throw new Error(`A discriminator value for key \`${e}\` could not be extracted from all schema options`);
      for (const o of s) {
        if (n.has(o))
          throw new Error(`Discriminator property ${String(e)} has duplicate value ${String(o)}`);
        n.set(o, i);
      }
    }
    return new dr({
      typeName: g.ZodDiscriminatedUnion,
      discriminator: e,
      options: t,
      optionsMap: n,
      ...A(r)
    });
  }
}
function Hr(a, e) {
  const t = be(a), r = be(e);
  if (a === e)
    return { valid: !0, data: a };
  if (t === w.object && r === w.object) {
    const n = R.objectKeys(e), i = R.objectKeys(a).filter((o) => n.indexOf(o) !== -1), s = { ...a, ...e };
    for (const o of i) {
      const u = Hr(a[o], e[o]);
      if (!u.valid)
        return { valid: !1 };
      s[o] = u.data;
    }
    return { valid: !0, data: s };
  } else if (t === w.array && r === w.array) {
    if (a.length !== e.length)
      return { valid: !1 };
    const n = [];
    for (let i = 0; i < a.length; i++) {
      const s = a[i], o = e[i], u = Hr(s, o);
      if (!u.valid)
        return { valid: !1 };
      n.push(u.data);
    }
    return { valid: !0, data: n };
  } else return t === w.date && r === w.date && +a == +e ? { valid: !0, data: a } : { valid: !1 };
}
class Ot extends P {
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e), n = (i, s) => {
      if (Zr(i) || Zr(s))
        return S;
      const o = Hr(i.value, s.value);
      return o.valid ? ((Br(i) || Br(s)) && t.dirty(), { status: t.value, value: o.data }) : (_(r, {
        code: m.invalid_intersection_types
      }), S);
    };
    return r.common.async ? Promise.all([
      this._def.left._parseAsync({
        data: r.data,
        path: r.path,
        parent: r
      }),
      this._def.right._parseAsync({
        data: r.data,
        path: r.path,
        parent: r
      })
    ]).then(([i, s]) => n(i, s)) : n(this._def.left._parseSync({
      data: r.data,
      path: r.path,
      parent: r
    }), this._def.right._parseSync({
      data: r.data,
      path: r.path,
      parent: r
    }));
  }
}
Ot.create = (a, e, t) => new Ot({
  left: a,
  right: e,
  typeName: g.ZodIntersection,
  ...A(t)
});
class ge extends P {
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== w.array)
      return _(r, {
        code: m.invalid_type,
        expected: w.array,
        received: r.parsedType
      }), S;
    if (r.data.length < this._def.items.length)
      return _(r, {
        code: m.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), S;
    !this._def.rest && r.data.length > this._def.items.length && (_(r, {
      code: m.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), t.dirty());
    const i = [...r.data].map((s, o) => {
      const u = this._def.items[o] || this._def.rest;
      return u ? u._parse(new me(r, s, r.path, o)) : null;
    }).filter((s) => !!s);
    return r.common.async ? Promise.all(i).then((s) => V.mergeArray(t, s)) : V.mergeArray(t, i);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new ge({
      ...this._def,
      rest: e
    });
  }
}
ge.create = (a, e) => {
  if (!Array.isArray(a))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new ge({
    items: a,
    typeName: g.ZodTuple,
    rest: null,
    ...A(e)
  });
};
class Tt extends P {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== w.object)
      return _(r, {
        code: m.invalid_type,
        expected: w.object,
        received: r.parsedType
      }), S;
    const n = [], i = this._def.keyType, s = this._def.valueType;
    for (const o in r.data)
      n.push({
        key: i._parse(new me(r, o, r.path, o)),
        value: s._parse(new me(r, r.data[o], r.path, o)),
        alwaysSet: o in r.data
      });
    return r.common.async ? V.mergeObjectAsync(t, n) : V.mergeObjectSync(t, n);
  }
  get element() {
    return this._def.valueType;
  }
  static create(e, t, r) {
    return t instanceof P ? new Tt({
      keyType: e,
      valueType: t,
      typeName: g.ZodRecord,
      ...A(r)
    }) : new Tt({
      keyType: ue.create(),
      valueType: e,
      typeName: g.ZodRecord,
      ...A(t)
    });
  }
}
class tr extends P {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== w.map)
      return _(r, {
        code: m.invalid_type,
        expected: w.map,
        received: r.parsedType
      }), S;
    const n = this._def.keyType, i = this._def.valueType, s = [...r.data.entries()].map(([o, u], c) => ({
      key: n._parse(new me(r, o, r.path, [c, "key"])),
      value: i._parse(new me(r, u, r.path, [c, "value"]))
    }));
    if (r.common.async) {
      const o = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const u of s) {
          const c = await u.key, l = await u.value;
          if (c.status === "aborted" || l.status === "aborted")
            return S;
          (c.status === "dirty" || l.status === "dirty") && t.dirty(), o.set(c.value, l.value);
        }
        return { status: t.value, value: o };
      });
    } else {
      const o = /* @__PURE__ */ new Map();
      for (const u of s) {
        const c = u.key, l = u.value;
        if (c.status === "aborted" || l.status === "aborted")
          return S;
        (c.status === "dirty" || l.status === "dirty") && t.dirty(), o.set(c.value, l.value);
      }
      return { status: t.value, value: o };
    }
  }
}
tr.create = (a, e, t) => new tr({
  valueType: e,
  keyType: a,
  typeName: g.ZodMap,
  ...A(t)
});
class Ve extends P {
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== w.set)
      return _(r, {
        code: m.invalid_type,
        expected: w.set,
        received: r.parsedType
      }), S;
    const n = this._def;
    n.minSize !== null && r.data.size < n.minSize.value && (_(r, {
      code: m.too_small,
      minimum: n.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: n.minSize.message
    }), t.dirty()), n.maxSize !== null && r.data.size > n.maxSize.value && (_(r, {
      code: m.too_big,
      maximum: n.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: n.maxSize.message
    }), t.dirty());
    const i = this._def.valueType;
    function s(u) {
      const c = /* @__PURE__ */ new Set();
      for (const l of u) {
        if (l.status === "aborted")
          return S;
        l.status === "dirty" && t.dirty(), c.add(l.value);
      }
      return { status: t.value, value: c };
    }
    const o = [...r.data.values()].map((u, c) => i._parse(new me(r, u, r.path, c)));
    return r.common.async ? Promise.all(o).then((u) => s(u)) : s(o);
  }
  min(e, t) {
    return new Ve({
      ...this._def,
      minSize: { value: e, message: E.toString(t) }
    });
  }
  max(e, t) {
    return new Ve({
      ...this._def,
      maxSize: { value: e, message: E.toString(t) }
    });
  }
  size(e, t) {
    return this.min(e, t).max(e, t);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
Ve.create = (a, e) => new Ve({
  valueType: a,
  minSize: null,
  maxSize: null,
  typeName: g.ZodSet,
  ...A(e)
});
class Ye extends P {
  constructor() {
    super(...arguments), this.validate = this.implement;
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== w.function)
      return _(t, {
        code: m.invalid_type,
        expected: w.function,
        received: t.parsedType
      }), S;
    function r(o, u) {
      return Qt({
        data: o,
        path: t.path,
        errorMaps: [
          t.common.contextualErrorMap,
          t.schemaErrorMap,
          Kt(),
          Xe
        ].filter((c) => !!c),
        issueData: {
          code: m.invalid_arguments,
          argumentsError: u
        }
      });
    }
    function n(o, u) {
      return Qt({
        data: o,
        path: t.path,
        errorMaps: [
          t.common.contextualErrorMap,
          t.schemaErrorMap,
          Kt(),
          Xe
        ].filter((c) => !!c),
        issueData: {
          code: m.invalid_return_type,
          returnTypeError: u
        }
      });
    }
    const i = { errorMap: t.common.contextualErrorMap }, s = t.data;
    if (this._def.returns instanceof tt) {
      const o = this;
      return Q(async function(...u) {
        const c = new te([]), l = await o._def.args.parseAsync(u, i).catch((f) => {
          throw c.addIssue(r(u, f)), c;
        }), h = await Reflect.apply(s, this, l);
        return await o._def.returns._def.type.parseAsync(h, i).catch((f) => {
          throw c.addIssue(n(h, f)), c;
        });
      });
    } else {
      const o = this;
      return Q(function(...u) {
        const c = o._def.args.safeParse(u, i);
        if (!c.success)
          throw new te([r(u, c.error)]);
        const l = Reflect.apply(s, this, c.data), h = o._def.returns.safeParse(l, i);
        if (!h.success)
          throw new te([n(l, h.error)]);
        return h.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...e) {
    return new Ye({
      ...this._def,
      args: ge.create(e).rest(Ze.create())
    });
  }
  returns(e) {
    return new Ye({
      ...this._def,
      returns: e
    });
  }
  implement(e) {
    return this.parse(e);
  }
  strictImplement(e) {
    return this.parse(e);
  }
  static create(e, t, r) {
    return new Ye({
      args: e || ge.create([]).rest(Ze.create()),
      returns: t || Ze.create(),
      typeName: g.ZodFunction,
      ...A(r)
    });
  }
}
class St extends P {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    return this._def.getter()._parse({ data: t.data, path: t.path, parent: t });
  }
}
St.create = (a, e) => new St({
  getter: a,
  typeName: g.ZodLazy,
  ...A(e)
});
class kt extends P {
  _parse(e) {
    if (e.data !== this._def.value) {
      const t = this._getOrReturnCtx(e);
      return _(t, {
        received: t.data,
        code: m.invalid_literal,
        expected: this._def.value
      }), S;
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
kt.create = (a, e) => new kt({
  value: a,
  typeName: g.ZodLiteral,
  ...A(e)
});
function ha(a, e) {
  return new je({
    values: a,
    typeName: g.ZodEnum,
    ...A(e)
  });
}
class je extends P {
  constructor() {
    super(...arguments), ut.set(this, void 0);
  }
  _parse(e) {
    if (typeof e.data != "string") {
      const t = this._getOrReturnCtx(e), r = this._def.values;
      return _(t, {
        expected: R.joinValues(r),
        received: t.parsedType,
        code: m.invalid_type
      }), S;
    }
    if (Yt(this, ut) || ua(this, ut, new Set(this._def.values)), !Yt(this, ut).has(e.data)) {
      const t = this._getOrReturnCtx(e), r = this._def.values;
      return _(t, {
        received: t.data,
        code: m.invalid_enum_value,
        options: r
      }), S;
    }
    return Q(e.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const e = {};
    for (const t of this._def.values)
      e[t] = t;
    return e;
  }
  get Values() {
    const e = {};
    for (const t of this._def.values)
      e[t] = t;
    return e;
  }
  get Enum() {
    const e = {};
    for (const t of this._def.values)
      e[t] = t;
    return e;
  }
  extract(e, t = this._def) {
    return je.create(e, {
      ...this._def,
      ...t
    });
  }
  exclude(e, t = this._def) {
    return je.create(this.options.filter((r) => !e.includes(r)), {
      ...this._def,
      ...t
    });
  }
}
ut = /* @__PURE__ */ new WeakMap();
je.create = ha;
class xt extends P {
  constructor() {
    super(...arguments), ct.set(this, void 0);
  }
  _parse(e) {
    const t = R.getValidEnumValues(this._def.values), r = this._getOrReturnCtx(e);
    if (r.parsedType !== w.string && r.parsedType !== w.number) {
      const n = R.objectValues(t);
      return _(r, {
        expected: R.joinValues(n),
        received: r.parsedType,
        code: m.invalid_type
      }), S;
    }
    if (Yt(this, ct) || ua(this, ct, new Set(R.getValidEnumValues(this._def.values))), !Yt(this, ct).has(e.data)) {
      const n = R.objectValues(t);
      return _(r, {
        received: r.data,
        code: m.invalid_enum_value,
        options: n
      }), S;
    }
    return Q(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
ct = /* @__PURE__ */ new WeakMap();
xt.create = (a, e) => new xt({
  values: a,
  typeName: g.ZodNativeEnum,
  ...A(e)
});
class tt extends P {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== w.promise && t.common.async === !1)
      return _(t, {
        code: m.invalid_type,
        expected: w.promise,
        received: t.parsedType
      }), S;
    const r = t.parsedType === w.promise ? t.data : Promise.resolve(t.data);
    return Q(r.then((n) => this._def.type.parseAsync(n, {
      path: t.path,
      errorMap: t.common.contextualErrorMap
    })));
  }
}
tt.create = (a, e) => new tt({
  type: a,
  typeName: g.ZodPromise,
  ...A(e)
});
class he extends P {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === g.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e), n = this._def.effect || null, i = {
      addIssue: (s) => {
        _(r, s), s.fatal ? t.abort() : t.dirty();
      },
      get path() {
        return r.path;
      }
    };
    if (i.addIssue = i.addIssue.bind(i), n.type === "preprocess") {
      const s = n.transform(r.data, i);
      if (r.common.async)
        return Promise.resolve(s).then(async (o) => {
          if (t.value === "aborted")
            return S;
          const u = await this._def.schema._parseAsync({
            data: o,
            path: r.path,
            parent: r
          });
          return u.status === "aborted" ? S : u.status === "dirty" || t.value === "dirty" ? We(u.value) : u;
        });
      {
        if (t.value === "aborted")
          return S;
        const o = this._def.schema._parseSync({
          data: s,
          path: r.path,
          parent: r
        });
        return o.status === "aborted" ? S : o.status === "dirty" || t.value === "dirty" ? We(o.value) : o;
      }
    }
    if (n.type === "refinement") {
      const s = (o) => {
        const u = n.refinement(o, i);
        if (r.common.async)
          return Promise.resolve(u);
        if (u instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return o;
      };
      if (r.common.async === !1) {
        const o = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r
        });
        return o.status === "aborted" ? S : (o.status === "dirty" && t.dirty(), s(o.value), { status: t.value, value: o.value });
      } else
        return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((o) => o.status === "aborted" ? S : (o.status === "dirty" && t.dirty(), s(o.value).then(() => ({ status: t.value, value: o.value }))));
    }
    if (n.type === "transform")
      if (r.common.async === !1) {
        const s = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r
        });
        if (!ze(s))
          return s;
        const o = n.transform(s.value, i);
        if (o instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: t.value, value: o };
      } else
        return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((s) => ze(s) ? Promise.resolve(n.transform(s.value, i)).then((o) => ({ status: t.value, value: o })) : s);
    R.assertNever(n);
  }
}
he.create = (a, e, t) => new he({
  schema: a,
  typeName: g.ZodEffects,
  effect: e,
  ...A(t)
});
he.createWithPreprocess = (a, e, t) => new he({
  schema: e,
  effect: { type: "preprocess", transform: a },
  typeName: g.ZodEffects,
  ...A(t)
});
class le extends P {
  _parse(e) {
    return this._getType(e) === w.undefined ? Q(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
le.create = (a, e) => new le({
  innerType: a,
  typeName: g.ZodOptional,
  ...A(e)
});
class Ne extends P {
  _parse(e) {
    return this._getType(e) === w.null ? Q(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Ne.create = (a, e) => new Ne({
  innerType: a,
  typeName: g.ZodNullable,
  ...A(e)
});
class At extends P {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    let r = t.data;
    return t.parsedType === w.undefined && (r = this._def.defaultValue()), this._def.innerType._parse({
      data: r,
      path: t.path,
      parent: t
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
At.create = (a, e) => new At({
  innerType: a,
  typeName: g.ZodDefault,
  defaultValue: typeof e.default == "function" ? e.default : () => e.default,
  ...A(e)
});
class It extends P {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), r = {
      ...t,
      common: {
        ...t.common,
        issues: []
      }
    }, n = this._def.innerType._parse({
      data: r.data,
      path: r.path,
      parent: {
        ...r
      }
    });
    return _t(n) ? n.then((i) => ({
      status: "valid",
      value: i.status === "valid" ? i.value : this._def.catchValue({
        get error() {
          return new te(r.common.issues);
        },
        input: r.data
      })
    })) : {
      status: "valid",
      value: n.status === "valid" ? n.value : this._def.catchValue({
        get error() {
          return new te(r.common.issues);
        },
        input: r.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
It.create = (a, e) => new It({
  innerType: a,
  typeName: g.ZodCatch,
  catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
  ...A(e)
});
class rr extends P {
  _parse(e) {
    if (this._getType(e) !== w.nan) {
      const r = this._getOrReturnCtx(e);
      return _(r, {
        code: m.invalid_type,
        expected: w.nan,
        received: r.parsedType
      }), S;
    }
    return { status: "valid", value: e.data };
  }
}
rr.create = (a) => new rr({
  typeName: g.ZodNaN,
  ...A(a)
});
const Ls = Symbol("zod_brand");
class Xr extends P {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), r = t.data;
    return this._def.type._parse({
      data: r,
      path: t.path,
      parent: t
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class Nt extends P {
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e);
    if (r.common.async)
      return (async () => {
        const i = await this._def.in._parseAsync({
          data: r.data,
          path: r.path,
          parent: r
        });
        return i.status === "aborted" ? S : i.status === "dirty" ? (t.dirty(), We(i.value)) : this._def.out._parseAsync({
          data: i.value,
          path: r.path,
          parent: r
        });
      })();
    {
      const n = this._def.in._parseSync({
        data: r.data,
        path: r.path,
        parent: r
      });
      return n.status === "aborted" ? S : n.status === "dirty" ? (t.dirty(), {
        status: "dirty",
        value: n.value
      }) : this._def.out._parseSync({
        data: n.value,
        path: r.path,
        parent: r
      });
    }
  }
  static create(e, t) {
    return new Nt({
      in: e,
      out: t,
      typeName: g.ZodPipeline
    });
  }
}
class Pt extends P {
  _parse(e) {
    const t = this._def.innerType._parse(e), r = (n) => (ze(n) && (n.value = Object.freeze(n.value)), n);
    return _t(t) ? t.then((n) => r(n)) : r(t);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Pt.create = (a, e) => new Pt({
  innerType: a,
  typeName: g.ZodReadonly,
  ...A(e)
});
function Cn(a, e) {
  const t = typeof a == "function" ? a(e) : typeof a == "string" ? { message: a } : a;
  return typeof t == "string" ? { message: t } : t;
}
function fa(a, e = {}, t) {
  return a ? et.create().superRefine((r, n) => {
    var i, s;
    const o = a(r);
    if (o instanceof Promise)
      return o.then((u) => {
        var c, l;
        if (!u) {
          const h = Cn(e, r), d = (l = (c = h.fatal) !== null && c !== void 0 ? c : t) !== null && l !== void 0 ? l : !0;
          n.addIssue({ code: "custom", ...h, fatal: d });
        }
      });
    if (!o) {
      const u = Cn(e, r), c = (s = (i = u.fatal) !== null && i !== void 0 ? i : t) !== null && s !== void 0 ? s : !0;
      n.addIssue({ code: "custom", ...u, fatal: c });
    }
  }) : et.create();
}
const Ds = {
  object: U.lazycreate
};
var g;
(function(a) {
  a.ZodString = "ZodString", a.ZodNumber = "ZodNumber", a.ZodNaN = "ZodNaN", a.ZodBigInt = "ZodBigInt", a.ZodBoolean = "ZodBoolean", a.ZodDate = "ZodDate", a.ZodSymbol = "ZodSymbol", a.ZodUndefined = "ZodUndefined", a.ZodNull = "ZodNull", a.ZodAny = "ZodAny", a.ZodUnknown = "ZodUnknown", a.ZodNever = "ZodNever", a.ZodVoid = "ZodVoid", a.ZodArray = "ZodArray", a.ZodObject = "ZodObject", a.ZodUnion = "ZodUnion", a.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", a.ZodIntersection = "ZodIntersection", a.ZodTuple = "ZodTuple", a.ZodRecord = "ZodRecord", a.ZodMap = "ZodMap", a.ZodSet = "ZodSet", a.ZodFunction = "ZodFunction", a.ZodLazy = "ZodLazy", a.ZodLiteral = "ZodLiteral", a.ZodEnum = "ZodEnum", a.ZodEffects = "ZodEffects", a.ZodNativeEnum = "ZodNativeEnum", a.ZodOptional = "ZodOptional", a.ZodNullable = "ZodNullable", a.ZodDefault = "ZodDefault", a.ZodCatch = "ZodCatch", a.ZodPromise = "ZodPromise", a.ZodBranded = "ZodBranded", a.ZodPipeline = "ZodPipeline", a.ZodReadonly = "ZodReadonly";
})(g || (g = {}));
const Us = (a, e = {
  message: `Input not instance of ${a.name}`
}) => fa((t) => t instanceof a, e), pa = ue.create, ma = Ce.create, Fs = rr.create, Zs = Re.create, ga = bt.create, Bs = qe.create, Hs = Xt.create, zs = wt.create, qs = vt.create, Vs = et.create, Gs = Ze.create, Js = Te.create, Ws = er.create, Ks = ce.create, Qs = U.create, Ys = U.strictCreate, Xs = Et.create, eo = dr.create, to = Ot.create, ro = ge.create, no = Tt.create, ao = tr.create, io = Ve.create, so = Ye.create, oo = St.create, uo = kt.create, co = je.create, lo = xt.create, ho = tt.create, Rn = he.create, fo = le.create, po = Ne.create, mo = he.createWithPreprocess, go = Nt.create, yo = () => pa().optional(), _o = () => ma().optional(), bo = () => ga().optional(), wo = {
  string: (a) => ue.create({ ...a, coerce: !0 }),
  number: (a) => Ce.create({ ...a, coerce: !0 }),
  boolean: (a) => bt.create({
    ...a,
    coerce: !0
  }),
  bigint: (a) => Re.create({ ...a, coerce: !0 }),
  date: (a) => qe.create({ ...a, coerce: !0 })
}, vo = S;
var pt = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  defaultErrorMap: Xe,
  setErrorMap: ps,
  getErrorMap: Kt,
  makeIssue: Qt,
  EMPTY_PATH: ms,
  addIssueToContext: _,
  ParseStatus: V,
  INVALID: S,
  DIRTY: We,
  OK: Q,
  isAborted: Zr,
  isDirty: Br,
  isValid: ze,
  isAsync: _t,
  get util() {
    return R;
  },
  get objectUtil() {
    return Fr;
  },
  ZodParsedType: w,
  getParsedType: be,
  ZodType: P,
  datetimeRegex: da,
  ZodString: ue,
  ZodNumber: Ce,
  ZodBigInt: Re,
  ZodBoolean: bt,
  ZodDate: qe,
  ZodSymbol: Xt,
  ZodUndefined: wt,
  ZodNull: vt,
  ZodAny: et,
  ZodUnknown: Ze,
  ZodNever: Te,
  ZodVoid: er,
  ZodArray: ce,
  ZodObject: U,
  ZodUnion: Et,
  ZodDiscriminatedUnion: dr,
  ZodIntersection: Ot,
  ZodTuple: ge,
  ZodRecord: Tt,
  ZodMap: tr,
  ZodSet: Ve,
  ZodFunction: Ye,
  ZodLazy: St,
  ZodLiteral: kt,
  ZodEnum: je,
  ZodNativeEnum: xt,
  ZodPromise: tt,
  ZodEffects: he,
  ZodTransformer: he,
  ZodOptional: le,
  ZodNullable: Ne,
  ZodDefault: At,
  ZodCatch: It,
  ZodNaN: rr,
  BRAND: Ls,
  ZodBranded: Xr,
  ZodPipeline: Nt,
  ZodReadonly: Pt,
  custom: fa,
  Schema: P,
  ZodSchema: P,
  late: Ds,
  get ZodFirstPartyTypeKind() {
    return g;
  },
  coerce: wo,
  any: Vs,
  array: Ks,
  bigint: Zs,
  boolean: ga,
  date: Bs,
  discriminatedUnion: eo,
  effect: Rn,
  enum: co,
  function: so,
  instanceof: Us,
  intersection: to,
  lazy: oo,
  literal: uo,
  map: ao,
  nan: Fs,
  nativeEnum: lo,
  never: Js,
  null: qs,
  nullable: po,
  number: ma,
  object: Qs,
  oboolean: bo,
  onumber: _o,
  optional: fo,
  ostring: yo,
  pipeline: go,
  preprocess: mo,
  promise: ho,
  record: no,
  set: io,
  strictObject: Ys,
  string: pa,
  symbol: Hs,
  transformer: Rn,
  tuple: ro,
  undefined: zs,
  union: Xs,
  unknown: Gs,
  void: Ws,
  NEVER: vo,
  ZodIssueCode: m,
  quotelessJson: fs,
  ZodError: te
});
/*!
 * https://github.com/Starcounter-Jack/JSON-Patch
 * (c) 2017-2022 Joachim Wester
 * MIT licensed
 */
const Eo = Object.prototype.hasOwnProperty;
function Oo(a, e) {
  return Eo.call(a, e);
}
function To(a) {
  if (Array.isArray(a)) {
    const t = new Array(a.length);
    for (let r = 0; r < t.length; r++)
      t[r] = "" + r;
    return t;
  }
  if (Object.keys)
    return Object.keys(a);
  let e = [];
  for (let t in a)
    Oo(a, t) && e.push(t);
  return e;
}
function rt(a) {
  switch (typeof a) {
    case "object":
      return JSON.parse(JSON.stringify(a));
    //Faster than ES5 clone - http://jsperf.com/deep-cloning-of-objects/5
    case "undefined":
      return null;
    //this is how JSON.stringify behaves for array items
    default:
      return a;
  }
}
function zr(a) {
  let e = 0;
  const t = a.length;
  let r;
  for (; e < t; ) {
    if (r = a.charCodeAt(e), r >= 48 && r <= 57) {
      e++;
      continue;
    }
    return !1;
  }
  return !0;
}
function So(a) {
  return a.replace(/~1/g, "/").replace(/~0/g, "~");
}
function qr(a) {
  if (a === void 0)
    return !0;
  if (a) {
    if (Array.isArray(a)) {
      for (let t = 0, r = a.length; t < r; t++)
        if (qr(a[t]))
          return !0;
    } else if (typeof a == "object") {
      const t = To(a), r = t.length;
      for (var e = 0; e < r; e++)
        if (qr(a[t[e]]))
          return !0;
    }
  }
  return !1;
}
function jn(a, e) {
  const t = [a];
  for (const r in e) {
    const n = typeof e[r] == "object" ? JSON.stringify(e[r], null, 2) : e[r];
    typeof n < "u" && t.push(`${r}: ${n}`);
  }
  return t.join(`
`);
}
class ko extends Error {
  constructor(e, t, r, n, i) {
    super(jn(e, { name: t, index: r, operation: n, tree: i })), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: t
    }), Object.defineProperty(this, "index", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: r
    }), Object.defineProperty(this, "operation", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: n
    }), Object.defineProperty(this, "tree", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: i
    }), Object.setPrototypeOf(this, new.target.prototype), this.message = jn(e, {
      name: t,
      index: r,
      operation: n,
      tree: i
    });
  }
}
const Z = ko, Ke = {
  add: function(a, e, t) {
    return a[e] = this.value, { newDocument: t };
  },
  remove: function(a, e, t) {
    var r = a[e];
    return delete a[e], { newDocument: t, removed: r };
  },
  replace: function(a, e, t) {
    var r = a[e];
    return a[e] = this.value, { newDocument: t, removed: r };
  },
  move: function(a, e, t) {
    let r = Vr(t, this.path);
    r && (r = rt(r));
    const n = mt(t, {
      op: "remove",
      path: this.from
    }).removed;
    return mt(t, {
      op: "add",
      path: this.path,
      value: n
    }), { newDocument: t, removed: r };
  },
  copy: function(a, e, t) {
    const r = Vr(t, this.from);
    return mt(t, {
      op: "add",
      path: this.path,
      value: rt(r)
    }), { newDocument: t };
  },
  test: function(a, e, t) {
    return { newDocument: t, test: ar(a[e], this.value) };
  },
  _get: function(a, e, t) {
    return this.value = a[e], { newDocument: t };
  }
};
var xo = {
  add: function(a, e, t) {
    return zr(e) ? a.splice(e, 0, this.value) : a[e] = this.value, { newDocument: t, index: e };
  },
  remove: function(a, e, t) {
    var r = a.splice(e, 1);
    return { newDocument: t, removed: r[0] };
  },
  replace: function(a, e, t) {
    var r = a[e];
    return a[e] = this.value, { newDocument: t, removed: r };
  },
  move: Ke.move,
  copy: Ke.copy,
  test: Ke.test,
  _get: Ke._get
};
function Vr(a, e) {
  if (e == "")
    return a;
  var t = { op: "_get", path: e };
  return mt(a, t), t.value;
}
function mt(a, e, t = !1, r = !0, n = !0, i = 0) {
  if (t && (typeof t == "function" ? t(e, 0, a, e.path) : Gr(e, 0)), e.path === "") {
    let s = { newDocument: a };
    if (e.op === "add")
      return s.newDocument = e.value, s;
    if (e.op === "replace")
      return s.newDocument = e.value, s.removed = a, s;
    if (e.op === "move" || e.op === "copy")
      return s.newDocument = Vr(a, e.from), e.op === "move" && (s.removed = a), s;
    if (e.op === "test") {
      if (s.test = ar(a, e.value), s.test === !1)
        throw new Z("Test operation failed", "TEST_OPERATION_FAILED", i, e, a);
      return s.newDocument = a, s;
    } else {
      if (e.op === "remove")
        return s.removed = a, s.newDocument = null, s;
      if (e.op === "_get")
        return e.value = a, s;
      if (t)
        throw new Z("Operation `op` property is not one of operations defined in RFC-6902", "OPERATION_OP_INVALID", i, e, a);
      return s;
    }
  } else {
    r || (a = rt(a));
    const o = (e.path || "").split("/");
    let u = a, c = 1, l = o.length, h, d, f;
    for (typeof t == "function" ? f = t : f = Gr; ; ) {
      if (d = o[c], d && d.indexOf("~") != -1 && (d = So(d)), n && (d == "__proto__" || d == "prototype" && c > 0 && o[c - 1] == "constructor"))
        throw new TypeError("JSON-Patch: modifying `__proto__` or `constructor/prototype` prop is banned for security reasons, if this was on purpose, please set `banPrototypeModifications` flag false and pass it to this function. More info in fast-json-patch README");
      if (t && h === void 0 && (u[d] === void 0 ? h = o.slice(0, c).join("/") : c == l - 1 && (h = e.path), h !== void 0 && f(e, 0, a, h)), c++, Array.isArray(u)) {
        if (d === "-")
          d = u.length;
        else {
          if (t && !zr(d))
            throw new Z("Expected an unsigned base-10 integer value, making the new referenced value the array element with the zero-based index", "OPERATION_PATH_ILLEGAL_ARRAY_INDEX", i, e, a);
          zr(d) && (d = ~~d);
        }
        if (c >= l) {
          if (t && e.op === "add" && d > u.length)
            throw new Z("The specified index MUST NOT be greater than the number of elements in the array", "OPERATION_VALUE_OUT_OF_BOUNDS", i, e, a);
          const p = xo[e.op].call(e, u, d, a);
          if (p.test === !1)
            throw new Z("Test operation failed", "TEST_OPERATION_FAILED", i, e, a);
          return p;
        }
      } else if (c >= l) {
        const p = Ke[e.op].call(e, u, d, a);
        if (p.test === !1)
          throw new Z("Test operation failed", "TEST_OPERATION_FAILED", i, e, a);
        return p;
      }
      if (u = u[d], t && c < l && (!u || typeof u != "object"))
        throw new Z("Cannot perform operation at the desired path", "OPERATION_PATH_UNRESOLVABLE", i, e, a);
    }
  }
}
function nr(a, e, t, r = !0, n = !0) {
  if (t && !Array.isArray(e))
    throw new Z("Patch sequence must be an array", "SEQUENCE_NOT_AN_ARRAY");
  r || (a = rt(a));
  const i = new Array(e.length);
  for (let s = 0, o = e.length; s < o; s++)
    i[s] = mt(a, e[s], t, !0, n, s), a = i[s].newDocument;
  return i.newDocument = a, i;
}
function Gr(a, e, t, r) {
  if (typeof a != "object" || a === null || Array.isArray(a))
    throw new Z("Operation is not an object", "OPERATION_NOT_AN_OBJECT", e, a, t);
  if (Ke[a.op]) {
    if (typeof a.path != "string")
      throw new Z("Operation `path` property is not a string", "OPERATION_PATH_INVALID", e, a, t);
    if (a.path.indexOf("/") !== 0 && a.path.length > 0)
      throw new Z('Operation `path` property must start with "/"', "OPERATION_PATH_INVALID", e, a, t);
    if ((a.op === "move" || a.op === "copy") && typeof a.from != "string")
      throw new Z("Operation `from` property is not present (applicable in `move` and `copy` operations)", "OPERATION_FROM_REQUIRED", e, a, t);
    if ((a.op === "add" || a.op === "replace" || a.op === "test") && a.value === void 0)
      throw new Z("Operation `value` property is not present (applicable in `add`, `replace` and `test` operations)", "OPERATION_VALUE_REQUIRED", e, a, t);
    if ((a.op === "add" || a.op === "replace" || a.op === "test") && qr(a.value))
      throw new Z("Operation `value` property is not present (applicable in `add`, `replace` and `test` operations)", "OPERATION_VALUE_CANNOT_CONTAIN_UNDEFINED", e, a, t);
    if (t) {
      if (a.op == "add") {
        var n = a.path.split("/").length, i = r.split("/").length;
        if (n !== i + 1 && n !== i)
          throw new Z("Cannot perform an `add` operation at the desired path", "OPERATION_PATH_CANNOT_ADD", e, a, t);
      } else if (a.op === "replace" || a.op === "remove" || a.op === "_get") {
        if (a.path !== r)
          throw new Z("Cannot perform the operation at a path that does not exist", "OPERATION_PATH_UNRESOLVABLE", e, a, t);
      } else if (a.op === "move" || a.op === "copy") {
        var s = {
          op: "_get",
          path: a.from,
          value: void 0
        }, o = Ao([s], t);
        if (o && o.name === "OPERATION_PATH_UNRESOLVABLE")
          throw new Z("Cannot perform the operation from a path that does not exist", "OPERATION_FROM_UNRESOLVABLE", e, a, t);
      }
    }
  } else throw new Z("Operation `op` property is not one of operations defined in RFC-6902", "OPERATION_OP_INVALID", e, a, t);
}
function Ao(a, e, t) {
  try {
    if (!Array.isArray(a))
      throw new Z("Patch sequence must be an array", "SEQUENCE_NOT_AN_ARRAY");
    if (e)
      nr(rt(e), rt(a), t || !0);
    else {
      t = t || Gr;
      for (var r = 0; r < a.length; r++)
        t(a[r], r, e, void 0);
    }
  } catch (n) {
    if (n instanceof Z)
      return n;
    throw n;
  }
}
function ar(a, e) {
  if (a === e)
    return !0;
  if (a && e && typeof a == "object" && typeof e == "object") {
    var t = Array.isArray(a), r = Array.isArray(e), n, i, s;
    if (t && r) {
      if (i = a.length, i != e.length)
        return !1;
      for (n = i; n-- !== 0; )
        if (!ar(a[n], e[n]))
          return !1;
      return !0;
    }
    if (t != r)
      return !1;
    var o = Object.keys(a);
    if (i = o.length, i !== Object.keys(e).length)
      return !1;
    for (n = i; n-- !== 0; )
      if (!e.hasOwnProperty(o[n]))
        return !1;
    for (n = i; n-- !== 0; )
      if (s = o[n], !ar(a[s], e[s]))
        return !1;
    return !0;
  }
  return a !== a && e !== e;
}
class Io {
  getStore() {
  }
  run(e, t) {
    return t();
  }
  enterWith(e) {
  }
}
const Po = new Io(), Nn = Symbol.for("lc:child_config");
class Co {
  getInstance() {
    return yt() ?? Po;
  }
  getRunnableConfig() {
    return this.getInstance().getStore()?.extra?.[Nn];
  }
  runWithConfig(e, t, r) {
    const n = ae._configureSync(e?.callbacks, void 0, e?.tags, void 0, e?.metadata), i = this.getInstance(), s = i.getStore(), o = n?.getParentRunId(), u = n?.handlers?.find((l) => l?.name === "langchain_tracer");
    let c;
    return u && o ? c = u.convertToRunTree(o) : r || (c = new ee({
      name: "<runnable_lambda>",
      tracingEnabled: !1
    })), c && (c.extra = { ...c.extra, [Nn]: e }), s !== void 0 && s[zt] !== void 0 && (c === void 0 && (c = {}), c[zt] = s[zt]), i.run(c, t);
  }
  initializeGlobalInstance(e) {
    yt() === void 0 && rs(e);
  }
}
const $e = new Co(), Rr = 25;
async function de(a) {
  return ae._configureSync(a?.callbacks, void 0, a?.tags, void 0, a?.metadata);
}
function $n(...a) {
  const e = {};
  for (const t of a.filter((r) => !!r))
    for (const r of Object.keys(t))
      if (r === "metadata")
        e[r] = { ...e[r], ...t[r] };
      else if (r === "tags") {
        const n = e[r] ?? [];
        e[r] = [...new Set(n.concat(t[r] ?? []))];
      } else if (r === "configurable")
        e[r] = { ...e[r], ...t[r] };
      else if (r === "timeout")
        e.timeout === void 0 ? e.timeout = t.timeout : t.timeout !== void 0 && (e.timeout = Math.min(e.timeout, t.timeout));
      else if (r === "signal")
        e.signal === void 0 ? e.signal = t.signal : t.signal !== void 0 && ("any" in AbortSignal ? e.signal = AbortSignal.any([
          e.signal,
          t.signal
        ]) : e.signal = t.signal);
      else if (r === "callbacks") {
        const n = e.callbacks, i = t.callbacks;
        if (Array.isArray(i))
          if (!n)
            e.callbacks = i;
          else if (Array.isArray(n))
            e.callbacks = n.concat(i);
          else {
            const s = n.copy();
            for (const o of i)
              s.addHandler(Wt(o), !0);
            e.callbacks = s;
          }
        else if (i)
          if (!n)
            e.callbacks = i;
          else if (Array.isArray(n)) {
            const s = i.copy();
            for (const o of n)
              s.addHandler(Wt(o), !0);
            e.callbacks = s;
          } else
            e.callbacks = new ae(i._parentRunId, {
              handlers: n.handlers.concat(i.handlers),
              inheritableHandlers: n.inheritableHandlers.concat(i.inheritableHandlers),
              tags: Array.from(new Set(n.tags.concat(i.tags))),
              inheritableTags: Array.from(new Set(n.inheritableTags.concat(i.inheritableTags))),
              metadata: {
                ...n.metadata,
                ...i.metadata
              }
            });
      } else {
        const n = r;
        e[n] = t[n] ?? e[n];
      }
  return e;
}
const Ro = /* @__PURE__ */ new Set(["string", "number", "boolean"]);
function j(a) {
  const e = $e.getRunnableConfig();
  let t = {
    tags: [],
    metadata: {},
    recursionLimit: 25,
    runId: void 0
  };
  if (e) {
    const { runId: r, runName: n, ...i } = e;
    t = Object.entries(i).reduce(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (s, [o, u]) => (u !== void 0 && (s[o] = u), s),
      t
    );
  }
  if (a && (t = Object.entries(a).reduce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (r, [n, i]) => (i !== void 0 && (r[n] = i), r),
    t
  )), t?.configurable)
    for (const r of Object.keys(t.configurable))
      Ro.has(typeof t.configurable[r]) && !t.metadata?.[r] && (t.metadata || (t.metadata = {}), t.metadata[r] = t.configurable[r]);
  if (t.timeout !== void 0) {
    if (t.timeout <= 0)
      throw new Error("Timeout must be a positive number");
    const r = AbortSignal.timeout(t.timeout);
    t.signal !== void 0 ? "any" in AbortSignal && (t.signal = AbortSignal.any([t.signal, r])) : t.signal = r, delete t.timeout;
  }
  return t;
}
function q(a = {}, { callbacks: e, maxConcurrency: t, recursionLimit: r, runName: n, configurable: i, runId: s } = {}) {
  const o = j(a);
  return e !== void 0 && (delete o.runName, o.callbacks = e), r !== void 0 && (o.recursionLimit = r), t !== void 0 && (o.maxConcurrency = t), n !== void 0 && (o.runName = n), i !== void 0 && (o.configurable = { ...o.configurable, ...i }), s !== void 0 && delete o.runId, o;
}
function nt(a) {
  return a ? {
    configurable: a.configurable,
    recursionLimit: a.recursionLimit,
    callbacks: a.callbacks,
    tags: a.tags,
    metadata: a.metadata,
    maxConcurrency: a.maxConcurrency,
    timeout: a.timeout,
    signal: a.signal
  } : void 0;
}
async function Me(a, e) {
  if (e === void 0)
    return a;
  let t;
  return Promise.race([
    a.catch((r) => {
      if (!e?.aborted)
        throw r;
    }),
    new Promise((r, n) => {
      t = () => {
        n(new Error("Aborted"));
      }, e.addEventListener("abort", t), e.aborted && n(new Error("Aborted"));
    })
  ]).finally(() => e.removeEventListener("abort", t));
}
class re extends ReadableStream {
  constructor() {
    super(...arguments), Object.defineProperty(this, "reader", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    });
  }
  ensureReader() {
    this.reader || (this.reader = this.getReader());
  }
  async next() {
    this.ensureReader();
    try {
      const e = await this.reader.read();
      return e.done ? (this.reader.releaseLock(), {
        done: !0,
        value: void 0
      }) : {
        done: !1,
        value: e.value
      };
    } catch (e) {
      throw this.reader.releaseLock(), e;
    }
  }
  async return() {
    if (this.ensureReader(), this.locked) {
      const e = this.reader.cancel();
      this.reader.releaseLock(), await e;
    }
    return { done: !0, value: void 0 };
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async throw(e) {
    if (this.ensureReader(), this.locked) {
      const t = this.reader.cancel();
      this.reader.releaseLock(), await t;
    }
    throw e;
  }
  [Symbol.asyncIterator]() {
    return this;
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore Not present in Node 18 types, required in latest Node 22
  async [Symbol.asyncDispose]() {
    await this.return();
  }
  static fromReadableStream(e) {
    const t = e.getReader();
    return new re({
      start(r) {
        return n();
        function n() {
          return t.read().then(({ done: i, value: s }) => {
            if (i) {
              r.close();
              return;
            }
            return r.enqueue(s), n();
          });
        }
      },
      cancel() {
        t.releaseLock();
      }
    });
  }
  static fromAsyncGenerator(e) {
    return new re({
      async pull(t) {
        const { value: r, done: n } = await e.next();
        n && t.close(), t.enqueue(r);
      },
      async cancel(t) {
        await e.return(t);
      }
    });
  }
}
function ya(a, e = 2) {
  const t = Array.from({ length: e }, () => []);
  return t.map(async function* (n) {
    for (; ; )
      if (n.length === 0) {
        const i = await a.next();
        for (const s of t)
          s.push(i);
      } else {
        if (n[0].done)
          return;
        yield n.shift().value;
      }
  });
}
function Oe(a, e) {
  if (Array.isArray(a) && Array.isArray(e))
    return a.concat(e);
  if (typeof a == "string" && typeof e == "string")
    return a + e;
  if (typeof a == "number" && typeof e == "number")
    return a + e;
  if (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    "concat" in a && // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof a.concat == "function"
  )
    return a.concat(e);
  if (typeof a == "object" && typeof e == "object") {
    const t = { ...a };
    for (const [r, n] of Object.entries(e))
      r in t && !Array.isArray(t[r]) ? t[r] = Oe(t[r], n) : t[r] = n;
    return t;
  } else
    throw new Error(`Cannot concat ${typeof a} and ${typeof e}`);
}
class at {
  constructor(e) {
    Object.defineProperty(this, "generator", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "setup", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "config", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "signal", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "firstResult", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "firstResultUsed", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: !1
    }), this.generator = e.generator, this.config = e.config, this.signal = e.signal ?? this.config?.signal, this.setup = new Promise((t, r) => {
      $e.runWithConfig(nt(e.config), async () => {
        this.firstResult = e.generator.next(), e.startSetup ? this.firstResult.then(e.startSetup).then(t, r) : this.firstResult.then((n) => t(void 0), r);
      }, !0);
    });
  }
  async next(...e) {
    return this.signal?.throwIfAborted(), this.firstResultUsed ? $e.runWithConfig(nt(this.config), this.signal ? async () => Me(this.generator.next(...e), this.signal) : async () => this.generator.next(...e), !0) : (this.firstResultUsed = !0, this.firstResult);
  }
  async return(e) {
    return this.generator.return(e);
  }
  async throw(e) {
    return this.generator.throw(e);
  }
  [Symbol.asyncIterator]() {
    return this;
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore Not present in Node 18 types, required in latest Node 22
  async [Symbol.asyncDispose]() {
    await this.return();
  }
}
async function jo(a, e, t, r, ...n) {
  const i = new at({
    generator: e,
    startSetup: t,
    signal: r
  }), s = await i.setup;
  return { output: a(i, s, ...n), setup: s };
}
class Ae {
  constructor(e) {
    Object.defineProperty(this, "ops", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.ops = e.ops ?? [];
  }
  concat(e) {
    const t = this.ops.concat(e.ops), r = nr({}, t);
    return new Ct({
      ops: t,
      state: r[r.length - 1].newDocument
    });
  }
}
class Ct extends Ae {
  constructor(e) {
    super(e), Object.defineProperty(this, "state", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.state = e.state;
  }
  concat(e) {
    const t = this.ops.concat(e.ops), r = nr(this.state, e.ops);
    return new Ct({ ops: t, state: r[r.length - 1].newDocument });
  }
  static fromRunLogPatch(e) {
    const t = nr({}, e.ops);
    return new Ct({
      ops: e.ops,
      state: t[t.length - 1].newDocument
    });
  }
}
const No = (a) => a.name === "log_stream_tracer";
async function Mn(a, e) {
  if (e === "original")
    throw new Error("Do not assign inputs with original schema drop the key for now. When inputs are added to streamLog they should be added with standardized schema for streaming events.");
  const { inputs: t } = a;
  if (["retriever", "llm", "prompt"].includes(a.run_type))
    return t;
  if (!(Object.keys(t).length === 1 && t?.input === ""))
    return t.input;
}
async function Ln(a, e) {
  const { outputs: t } = a;
  return e === "original" || ["retriever", "llm", "prompt"].includes(a.run_type) ? t : t !== void 0 && Object.keys(t).length === 1 && t?.output !== void 0 ? t.output : t;
}
function $o(a) {
  return a !== void 0 && a.message !== void 0;
}
class Dn extends jt {
  constructor(e) {
    super({ _awaitHandler: !0, ...e }), Object.defineProperty(this, "autoClose", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: !0
    }), Object.defineProperty(this, "includeNames", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "includeTypes", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "includeTags", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "excludeNames", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "excludeTypes", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "excludeTags", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "_schemaFormat", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "original"
    }), Object.defineProperty(this, "rootId", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "keyMapByRunId", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: {}
    }), Object.defineProperty(this, "counterMapByRunName", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: {}
    }), Object.defineProperty(this, "transformStream", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "writer", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "receiveStream", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "log_stream_tracer"
    }), Object.defineProperty(this, "lc_prefer_streaming", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: !0
    }), this.autoClose = e?.autoClose ?? !0, this.includeNames = e?.includeNames, this.includeTypes = e?.includeTypes, this.includeTags = e?.includeTags, this.excludeNames = e?.excludeNames, this.excludeTypes = e?.excludeTypes, this.excludeTags = e?.excludeTags, this._schemaFormat = e?._schemaFormat ?? this._schemaFormat, this.transformStream = new TransformStream(), this.writer = this.transformStream.writable.getWriter(), this.receiveStream = re.fromReadableStream(this.transformStream.readable);
  }
  [Symbol.asyncIterator]() {
    return this.receiveStream;
  }
  async persistRun(e) {
  }
  _includeRun(e) {
    if (e.id === this.rootId)
      return !1;
    const t = e.tags ?? [];
    let r = this.includeNames === void 0 && this.includeTags === void 0 && this.includeTypes === void 0;
    return this.includeNames !== void 0 && (r = r || this.includeNames.includes(e.name)), this.includeTypes !== void 0 && (r = r || this.includeTypes.includes(e.run_type)), this.includeTags !== void 0 && (r = r || t.find((n) => this.includeTags?.includes(n)) !== void 0), this.excludeNames !== void 0 && (r = r && !this.excludeNames.includes(e.name)), this.excludeTypes !== void 0 && (r = r && !this.excludeTypes.includes(e.run_type)), this.excludeTags !== void 0 && (r = r && t.every((n) => !this.excludeTags?.includes(n))), r;
  }
  async *tapOutputIterable(e, t) {
    for await (const r of t) {
      if (e !== this.rootId) {
        const n = this.keyMapByRunId[e];
        n && await this.writer.write(new Ae({
          ops: [
            {
              op: "add",
              path: `/logs/${n}/streamed_output/-`,
              value: r
            }
          ]
        }));
      }
      yield r;
    }
  }
  async onRunCreate(e) {
    if (this.rootId === void 0 && (this.rootId = e.id, await this.writer.write(new Ae({
      ops: [
        {
          op: "replace",
          path: "",
          value: {
            id: e.id,
            name: e.name,
            type: e.run_type,
            streamed_output: [],
            final_output: void 0,
            logs: {}
          }
        }
      ]
    }))), !this._includeRun(e))
      return;
    this.counterMapByRunName[e.name] === void 0 && (this.counterMapByRunName[e.name] = 0), this.counterMapByRunName[e.name] += 1;
    const t = this.counterMapByRunName[e.name];
    this.keyMapByRunId[e.id] = t === 1 ? e.name : `${e.name}:${t}`;
    const r = {
      id: e.id,
      name: e.name,
      type: e.run_type,
      tags: e.tags ?? [],
      metadata: e.extra?.metadata ?? {},
      start_time: new Date(e.start_time).toISOString(),
      streamed_output: [],
      streamed_output_str: [],
      final_output: void 0,
      end_time: void 0
    };
    this._schemaFormat === "streaming_events" && (r.inputs = await Mn(e, this._schemaFormat)), await this.writer.write(new Ae({
      ops: [
        {
          op: "add",
          path: `/logs/${this.keyMapByRunId[e.id]}`,
          value: r
        }
      ]
    }));
  }
  async onRunUpdate(e) {
    try {
      const t = this.keyMapByRunId[e.id];
      if (t === void 0)
        return;
      const r = [];
      this._schemaFormat === "streaming_events" && r.push({
        op: "replace",
        path: `/logs/${t}/inputs`,
        value: await Mn(e, this._schemaFormat)
      }), r.push({
        op: "add",
        path: `/logs/${t}/final_output`,
        value: await Ln(e, this._schemaFormat)
      }), e.end_time !== void 0 && r.push({
        op: "add",
        path: `/logs/${t}/end_time`,
        value: new Date(e.end_time).toISOString()
      });
      const n = new Ae({ ops: r });
      await this.writer.write(n);
    } finally {
      if (e.id === this.rootId) {
        const t = new Ae({
          ops: [
            {
              op: "replace",
              path: "/final_output",
              value: await Ln(e, this._schemaFormat)
            }
          ]
        });
        await this.writer.write(t), this.autoClose && await this.writer.close();
      }
    }
  }
  async onLLMNewToken(e, t, r) {
    const n = this.keyMapByRunId[e.id];
    if (n === void 0)
      return;
    const i = e.inputs.messages !== void 0;
    let s;
    i ? $o(r?.chunk) ? s = r?.chunk : s = new cr({
      id: `run-${e.id}`,
      content: t
    }) : s = t;
    const o = new Ae({
      ops: [
        {
          op: "add",
          path: `/logs/${n}/streamed_output_str/-`,
          value: t
        },
        {
          op: "add",
          path: `/logs/${n}/streamed_output/-`,
          value: s
        }
      ]
    });
    await this.writer.write(o);
  }
}
class ir {
  constructor(e) {
    Object.defineProperty(this, "text", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "generationInfo", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.text = e.text, this.generationInfo = e.generationInfo;
  }
  concat(e) {
    return new ir({
      text: this.text + e.text,
      generationInfo: {
        ...this.generationInfo,
        ...e.generationInfo
      }
    });
  }
}
function Bt({ name: a, serialized: e }) {
  return a !== void 0 ? a : e?.name !== void 0 ? e.name : e?.id !== void 0 && Array.isArray(e?.id) ? e.id[e.id.length - 1] : "Unnamed";
}
const Mo = (a) => a.name === "event_stream_tracer";
class Lo extends jt {
  constructor(e) {
    super({ _awaitHandler: !0, ...e }), Object.defineProperty(this, "autoClose", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: !0
    }), Object.defineProperty(this, "includeNames", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "includeTypes", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "includeTags", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "excludeNames", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "excludeTypes", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "excludeTags", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "runInfoMap", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: /* @__PURE__ */ new Map()
    }), Object.defineProperty(this, "tappedPromises", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: /* @__PURE__ */ new Map()
    }), Object.defineProperty(this, "transformStream", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "writer", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "receiveStream", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "event_stream_tracer"
    }), Object.defineProperty(this, "lc_prefer_streaming", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: !0
    }), this.autoClose = e?.autoClose ?? !0, this.includeNames = e?.includeNames, this.includeTypes = e?.includeTypes, this.includeTags = e?.includeTags, this.excludeNames = e?.excludeNames, this.excludeTypes = e?.excludeTypes, this.excludeTags = e?.excludeTags, this.transformStream = new TransformStream(), this.writer = this.transformStream.writable.getWriter(), this.receiveStream = re.fromReadableStream(this.transformStream.readable);
  }
  [Symbol.asyncIterator]() {
    return this.receiveStream;
  }
  async persistRun(e) {
  }
  _includeRun(e) {
    const t = e.tags ?? [];
    let r = this.includeNames === void 0 && this.includeTags === void 0 && this.includeTypes === void 0;
    return this.includeNames !== void 0 && (r = r || this.includeNames.includes(e.name)), this.includeTypes !== void 0 && (r = r || this.includeTypes.includes(e.runType)), this.includeTags !== void 0 && (r = r || t.find((n) => this.includeTags?.includes(n)) !== void 0), this.excludeNames !== void 0 && (r = r && !this.excludeNames.includes(e.name)), this.excludeTypes !== void 0 && (r = r && !this.excludeTypes.includes(e.runType)), this.excludeTags !== void 0 && (r = r && t.every((n) => !this.excludeTags?.includes(n))), r;
  }
  async *tapOutputIterable(e, t) {
    const r = await t.next();
    if (r.done)
      return;
    const n = this.runInfoMap.get(e);
    if (n === void 0) {
      yield r.value;
      return;
    }
    function i(o, u) {
      return o === "llm" && typeof u == "string" ? new ir({ text: u }) : u;
    }
    let s = this.tappedPromises.get(e);
    if (s === void 0) {
      let o;
      s = new Promise((u) => {
        o = u;
      }), this.tappedPromises.set(e, s);
      try {
        const u = {
          event: `on_${n.runType}_stream`,
          run_id: e,
          name: n.name,
          tags: n.tags,
          metadata: n.metadata,
          data: {}
        };
        await this.send({
          ...u,
          data: {
            chunk: i(n.runType, r.value)
          }
        }, n), yield r.value;
        for await (const c of t)
          n.runType !== "tool" && n.runType !== "retriever" && await this.send({
            ...u,
            data: {
              chunk: i(n.runType, c)
            }
          }, n), yield c;
      } finally {
        o();
      }
    } else {
      yield r.value;
      for await (const o of t)
        yield o;
    }
  }
  async send(e, t) {
    this._includeRun(t) && await this.writer.write(e);
  }
  async sendEndEvent(e, t) {
    const r = this.tappedPromises.get(e.run_id);
    r !== void 0 ? r.then(() => {
      this.send(e, t);
    }) : await this.send(e, t);
  }
  async onLLMStart(e) {
    const t = Bt(e), r = e.inputs.messages !== void 0 ? "chat_model" : "llm", n = {
      tags: e.tags ?? [],
      metadata: e.extra?.metadata ?? {},
      name: t,
      runType: r,
      inputs: e.inputs
    };
    this.runInfoMap.set(e.id, n);
    const i = `on_${r}_start`;
    await this.send({
      event: i,
      data: {
        input: e.inputs
      },
      name: t,
      tags: e.tags ?? [],
      run_id: e.id,
      metadata: e.extra?.metadata ?? {}
    }, n);
  }
  async onLLMNewToken(e, t, r) {
    const n = this.runInfoMap.get(e.id);
    let i, s;
    if (n === void 0)
      throw new Error(`onLLMNewToken: Run ID ${e.id} not found in run map.`);
    if (this.runInfoMap.size !== 1) {
      if (n.runType === "chat_model")
        s = "on_chat_model_stream", r?.chunk === void 0 ? i = new cr({ content: t, id: `run-${e.id}` }) : i = r.chunk.message;
      else if (n.runType === "llm")
        s = "on_llm_stream", r?.chunk === void 0 ? i = new ir({ text: t }) : i = r.chunk;
      else
        throw new Error(`Unexpected run type ${n.runType}`);
      await this.send({
        event: s,
        data: {
          chunk: i
        },
        run_id: e.id,
        name: n.name,
        tags: n.tags,
        metadata: n.metadata
      }, n);
    }
  }
  async onLLMEnd(e) {
    const t = this.runInfoMap.get(e.id);
    this.runInfoMap.delete(e.id);
    let r;
    if (t === void 0)
      throw new Error(`onLLMEnd: Run ID ${e.id} not found in run map.`);
    const n = e.outputs?.generations;
    let i;
    if (t.runType === "chat_model") {
      for (const s of n ?? []) {
        if (i !== void 0)
          break;
        i = s[0]?.message;
      }
      r = "on_chat_model_end";
    } else if (t.runType === "llm")
      i = {
        generations: n?.map((s) => s.map((o) => ({
          text: o.text,
          generationInfo: o.generationInfo
        }))),
        llmOutput: e.outputs?.llmOutput ?? {}
      }, r = "on_llm_end";
    else
      throw new Error(`onLLMEnd: Unexpected run type: ${t.runType}`);
    await this.sendEndEvent({
      event: r,
      data: {
        output: i,
        input: t.inputs
      },
      run_id: e.id,
      name: t.name,
      tags: t.tags,
      metadata: t.metadata
    }, t);
  }
  async onChainStart(e) {
    const t = Bt(e), r = e.run_type ?? "chain", n = {
      tags: e.tags ?? [],
      metadata: e.extra?.metadata ?? {},
      name: t,
      runType: e.run_type
    };
    let i = {};
    e.inputs.input === "" && Object.keys(e.inputs).length === 1 ? (i = {}, n.inputs = {}) : e.inputs.input !== void 0 ? (i.input = e.inputs.input, n.inputs = e.inputs.input) : (i.input = e.inputs, n.inputs = e.inputs), this.runInfoMap.set(e.id, n), await this.send({
      event: `on_${r}_start`,
      data: i,
      name: t,
      tags: e.tags ?? [],
      run_id: e.id,
      metadata: e.extra?.metadata ?? {}
    }, n);
  }
  async onChainEnd(e) {
    const t = this.runInfoMap.get(e.id);
    if (this.runInfoMap.delete(e.id), t === void 0)
      throw new Error(`onChainEnd: Run ID ${e.id} not found in run map.`);
    const r = `on_${e.run_type}_end`, n = e.inputs ?? t.inputs ?? {}, s = {
      output: e.outputs?.output ?? e.outputs,
      input: n
    };
    n.input && Object.keys(n).length === 1 && (s.input = n.input, t.inputs = n.input), await this.sendEndEvent({
      event: r,
      data: s,
      run_id: e.id,
      name: t.name,
      tags: t.tags,
      metadata: t.metadata ?? {}
    }, t);
  }
  async onToolStart(e) {
    const t = Bt(e), r = {
      tags: e.tags ?? [],
      metadata: e.extra?.metadata ?? {},
      name: t,
      runType: "tool",
      inputs: e.inputs ?? {}
    };
    this.runInfoMap.set(e.id, r), await this.send({
      event: "on_tool_start",
      data: {
        input: e.inputs ?? {}
      },
      name: t,
      run_id: e.id,
      tags: e.tags ?? [],
      metadata: e.extra?.metadata ?? {}
    }, r);
  }
  async onToolEnd(e) {
    const t = this.runInfoMap.get(e.id);
    if (this.runInfoMap.delete(e.id), t === void 0)
      throw new Error(`onToolEnd: Run ID ${e.id} not found in run map.`);
    if (t.inputs === void 0)
      throw new Error(`onToolEnd: Run ID ${e.id} is a tool call, and is expected to have traced inputs.`);
    const r = e.outputs?.output === void 0 ? e.outputs : e.outputs.output;
    await this.sendEndEvent({
      event: "on_tool_end",
      data: {
        output: r,
        input: t.inputs
      },
      run_id: e.id,
      name: t.name,
      tags: t.tags,
      metadata: t.metadata
    }, t);
  }
  async onRetrieverStart(e) {
    const t = Bt(e), n = {
      tags: e.tags ?? [],
      metadata: e.extra?.metadata ?? {},
      name: t,
      runType: "retriever",
      inputs: {
        query: e.inputs.query
      }
    };
    this.runInfoMap.set(e.id, n), await this.send({
      event: "on_retriever_start",
      data: {
        input: {
          query: e.inputs.query
        }
      },
      name: t,
      tags: e.tags ?? [],
      run_id: e.id,
      metadata: e.extra?.metadata ?? {}
    }, n);
  }
  async onRetrieverEnd(e) {
    const t = this.runInfoMap.get(e.id);
    if (this.runInfoMap.delete(e.id), t === void 0)
      throw new Error(`onRetrieverEnd: Run ID ${e.id} not found in run map.`);
    await this.sendEndEvent({
      event: "on_retriever_end",
      data: {
        output: e.outputs?.documents ?? e.outputs,
        input: t.inputs
      },
      run_id: e.id,
      name: t.name,
      tags: t.tags,
      metadata: t.metadata
    }, t);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async handleCustomEvent(e, t, r) {
    const n = this.runInfoMap.get(r);
    if (n === void 0)
      throw new Error(`handleCustomEvent: Run ID ${r} not found in run map.`);
    await this.send({
      event: "on_custom_event",
      run_id: r,
      name: e,
      tags: n.tags,
      metadata: n.metadata,
      data: t
    }, n);
  }
  async finish() {
    const e = [...this.tappedPromises.values()];
    Promise.all(e).finally(() => {
      this.writer.close();
    });
  }
}
const Do = [
  400,
  401,
  402,
  403,
  404,
  405,
  406,
  407,
  409
  // Conflict
], Uo = (a) => {
  if (a.message.startsWith("Cancel") || a.message.startsWith("AbortError") || a.name === "AbortError" || a?.code === "ECONNABORTED")
    throw a;
  const e = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    a?.response?.status ?? a?.status
  );
  if (e && Do.includes(+e))
    throw a;
  if (a?.error?.code === "insufficient_quota") {
    const t = new Error(a?.message);
    throw t.name = "InsufficientQuotaError", t;
  }
};
class Fo {
  constructor(e) {
    Object.defineProperty(this, "maxConcurrency", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "maxRetries", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "onFailedAttempt", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "queue", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.maxConcurrency = e.maxConcurrency ?? 1 / 0, this.maxRetries = e.maxRetries ?? 6, this.onFailedAttempt = e.onFailedAttempt ?? Uo;
    const t = "default" in Ee ? Ee.default : Ee;
    this.queue = new t({ concurrency: this.maxConcurrency });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  call(e, ...t) {
    return this.queue.add(() => Vt(() => e(...t).catch((r) => {
      throw r instanceof Error ? r : new Error(r);
    }), {
      onFailedAttempt: this.onFailedAttempt,
      retries: this.maxRetries,
      randomize: !0
      // If needed we can change some of the defaults here,
      // but they're quite sensible.
    }), { throwOnTimeout: !0 });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callWithOptions(e, t, ...r) {
    return e.signal ? Promise.race([
      this.call(t, ...r),
      new Promise((n, i) => {
        e.signal?.addEventListener("abort", () => {
          i(new Error("AbortError"));
        });
      })
    ]) : this.call(t, ...r);
  }
  fetch(...e) {
    return this.call(() => fetch(...e).then((t) => t.ok ? t : Promise.reject(t)));
  }
}
class _a extends jt {
  constructor({ config: e, onStart: t, onEnd: r, onError: n }) {
    super({ _awaitHandler: !0 }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "RootListenersTracer"
    }), Object.defineProperty(this, "rootId", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "config", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "argOnStart", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "argOnEnd", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "argOnError", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.config = e, this.argOnStart = t, this.argOnEnd = r, this.argOnError = n;
  }
  /**
   * This is a legacy method only called once for an entire run tree
   * therefore not useful here
   * @param {Run} _ Not used
   */
  persistRun(e) {
    return Promise.resolve();
  }
  async onRunCreate(e) {
    this.rootId || (this.rootId = e.id, this.argOnStart && await this.argOnStart(e, this.config));
  }
  async onRunUpdate(e) {
    e.id === this.rootId && (e.error ? this.argOnError && await this.argOnError(e, this.config) : this.argOnEnd && await this.argOnEnd(e, this.config));
  }
}
function en(a) {
  return a ? a.lc_runnable : !1;
}
class Zo {
  constructor(e) {
    Object.defineProperty(this, "includeNames", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "includeTypes", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "includeTags", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "excludeNames", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "excludeTypes", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "excludeTags", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.includeNames = e.includeNames, this.includeTypes = e.includeTypes, this.includeTags = e.includeTags, this.excludeNames = e.excludeNames, this.excludeTypes = e.excludeTypes, this.excludeTags = e.excludeTags;
  }
  includeEvent(e, t) {
    let r = this.includeNames === void 0 && this.includeTypes === void 0 && this.includeTags === void 0;
    const n = e.tags ?? [];
    return this.includeNames !== void 0 && (r = r || this.includeNames.includes(e.name)), this.includeTypes !== void 0 && (r = r || this.includeTypes.includes(t)), this.includeTags !== void 0 && (r = r || n.some((i) => this.includeTags?.includes(i))), this.excludeNames !== void 0 && (r = r && !this.excludeNames.includes(e.name)), this.excludeTypes !== void 0 && (r = r && !this.excludeTypes.includes(t)), this.excludeTags !== void 0 && (r = r && n.every((i) => !this.excludeTags?.includes(i))), r;
  }
}
const Bo = Symbol("Let zodToJsonSchema decide on which parser to use"), Ho = {
  name: void 0,
  $refStrategy: "root",
  basePath: ["#"],
  effectStrategy: "input",
  pipeStrategy: "all",
  dateStrategy: "format:date-time",
  mapStrategy: "entries",
  removeAdditionalStrategy: "passthrough",
  allowedAdditionalProperties: !0,
  rejectedAdditionalProperties: !1,
  definitionPath: "definitions",
  target: "jsonSchema7",
  strictUnions: !1,
  definitions: {},
  errorMessages: !1,
  markdownDescription: !1,
  patternStrategy: "escape",
  applyRegexFlags: !1,
  emailStrategy: "format:email",
  base64Strategy: "contentEncoding:base64",
  nameStrategy: "ref"
}, zo = (a) => ({
  ...Ho,
  ...a
}), qo = (a) => {
  const e = zo(a), t = e.name !== void 0 ? [...e.basePath, e.definitionPath, e.name] : e.basePath;
  return {
    ...e,
    currentPath: t,
    propertyPath: void 0,
    seen: new Map(Object.entries(e.definitions).map(([r, n]) => [
      n._def,
      {
        def: n._def,
        path: [...e.basePath, e.definitionPath, r],
        // Resolution of references will be forced even though seen, so it's ok that the schema is undefined here for now.
        jsonSchema: void 0
      }
    ]))
  };
};
function ba(a, e, t, r) {
  r?.errorMessages && t && (a.errorMessage = {
    ...a.errorMessage,
    [e]: t
  });
}
function L(a, e, t, r, n) {
  a[e] = t, ba(a, e, r, n);
}
function Vo() {
  return {};
}
function Go(a, e) {
  const t = {
    type: "array"
  };
  return a.type?._def && a.type?._def?.typeName !== g.ZodAny && (t.items = N(a.type._def, {
    ...e,
    currentPath: [...e.currentPath, "items"]
  })), a.minLength && L(t, "minItems", a.minLength.value, a.minLength.message, e), a.maxLength && L(t, "maxItems", a.maxLength.value, a.maxLength.message, e), a.exactLength && (L(t, "minItems", a.exactLength.value, a.exactLength.message, e), L(t, "maxItems", a.exactLength.value, a.exactLength.message, e)), t;
}
function Jo(a, e) {
  const t = {
    type: "integer",
    format: "int64"
  };
  if (!a.checks)
    return t;
  for (const r of a.checks)
    switch (r.kind) {
      case "min":
        e.target === "jsonSchema7" ? r.inclusive ? L(t, "minimum", r.value, r.message, e) : L(t, "exclusiveMinimum", r.value, r.message, e) : (r.inclusive || (t.exclusiveMinimum = !0), L(t, "minimum", r.value, r.message, e));
        break;
      case "max":
        e.target === "jsonSchema7" ? r.inclusive ? L(t, "maximum", r.value, r.message, e) : L(t, "exclusiveMaximum", r.value, r.message, e) : (r.inclusive || (t.exclusiveMaximum = !0), L(t, "maximum", r.value, r.message, e));
        break;
      case "multipleOf":
        L(t, "multipleOf", r.value, r.message, e);
        break;
    }
  return t;
}
function Wo() {
  return {
    type: "boolean"
  };
}
function wa(a, e) {
  return N(a.type._def, e);
}
const Ko = (a, e) => N(a.innerType._def, e);
function va(a, e, t) {
  const r = t ?? e.dateStrategy;
  if (Array.isArray(r))
    return {
      anyOf: r.map((n, i) => va(a, e, n))
    };
  switch (r) {
    case "string":
    case "format:date-time":
      return {
        type: "string",
        format: "date-time"
      };
    case "format:date":
      return {
        type: "string",
        format: "date"
      };
    case "integer":
      return Qo(a, e);
  }
}
const Qo = (a, e) => {
  const t = {
    type: "integer",
    format: "unix-time"
  };
  if (e.target === "openApi3")
    return t;
  for (const r of a.checks)
    switch (r.kind) {
      case "min":
        L(
          t,
          "minimum",
          r.value,
          // This is in milliseconds
          r.message,
          e
        );
        break;
      case "max":
        L(
          t,
          "maximum",
          r.value,
          // This is in milliseconds
          r.message,
          e
        );
        break;
    }
  return t;
};
function Yo(a, e) {
  return {
    ...N(a.innerType._def, e),
    default: a.defaultValue()
  };
}
function Xo(a, e) {
  return e.effectStrategy === "input" ? N(a.schema._def, e) : {};
}
function eu(a) {
  return {
    type: "string",
    enum: Array.from(a.values)
  };
}
const tu = (a) => "type" in a && a.type === "string" ? !1 : "allOf" in a;
function ru(a, e) {
  const t = [
    N(a.left._def, {
      ...e,
      currentPath: [...e.currentPath, "allOf", "0"]
    }),
    N(a.right._def, {
      ...e,
      currentPath: [...e.currentPath, "allOf", "1"]
    })
  ].filter((i) => !!i);
  let r = e.target === "jsonSchema2019-09" ? { unevaluatedProperties: !1 } : void 0;
  const n = [];
  return t.forEach((i) => {
    if (tu(i))
      n.push(...i.allOf), i.unevaluatedProperties === void 0 && (r = void 0);
    else {
      let s = i;
      if ("additionalProperties" in i && i.additionalProperties === !1) {
        const { additionalProperties: o, ...u } = i;
        s = u;
      } else
        r = void 0;
      n.push(s);
    }
  }), n.length ? {
    allOf: n,
    ...r
  } : void 0;
}
function nu(a, e) {
  const t = typeof a.value;
  return t !== "bigint" && t !== "number" && t !== "boolean" && t !== "string" ? {
    type: Array.isArray(a.value) ? "array" : "object"
  } : e.target === "openApi3" ? {
    type: t === "bigint" ? "integer" : t,
    enum: [a.value]
  } : {
    type: t === "bigint" ? "integer" : t,
    const: a.value
  };
}
let jr;
const se = {
  /**
   * `c` was changed to `[cC]` to replicate /i flag
   */
  cuid: /^[cC][^\s-]{8,}$/,
  cuid2: /^[0-9a-z]+$/,
  ulid: /^[0-9A-HJKMNP-TV-Z]{26}$/,
  /**
   * `a-z` was added to replicate /i flag
   */
  email: /^(?!\.)(?!.*\.\.)([a-zA-Z0-9_'+\-\.]*)[a-zA-Z0-9_+-]@([a-zA-Z0-9][a-zA-Z0-9\-]*\.)+[a-zA-Z]{2,}$/,
  /**
   * Constructed a valid Unicode RegExp
   *
   * Lazily instantiate since this type of regex isn't supported
   * in all envs (e.g. React Native).
   *
   * See:
   * https://github.com/colinhacks/zod/issues/2433
   * Fix in Zod:
   * https://github.com/colinhacks/zod/commit/9340fd51e48576a75adc919bff65dbc4a5d4c99b
   */
  emoji: () => (jr === void 0 && (jr = RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", "u")), jr),
  /**
   * Unused
   */
  uuid: /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
  /**
   * Unused
   */
  ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  ipv4Cidr: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
  /**
   * Unused
   */
  ipv6: /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
  ipv6Cidr: /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
  base64: /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
  base64url: /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
  nanoid: /^[a-zA-Z0-9_-]{21}$/,
  jwt: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/
};
function Ea(a, e) {
  const t = {
    type: "string"
  };
  if (a.checks)
    for (const r of a.checks)
      switch (r.kind) {
        case "min":
          L(t, "minLength", typeof t.minLength == "number" ? Math.max(t.minLength, r.value) : r.value, r.message, e);
          break;
        case "max":
          L(t, "maxLength", typeof t.maxLength == "number" ? Math.min(t.maxLength, r.value) : r.value, r.message, e);
          break;
        case "email":
          switch (e.emailStrategy) {
            case "format:email":
              oe(t, "email", r.message, e);
              break;
            case "format:idn-email":
              oe(t, "idn-email", r.message, e);
              break;
            case "pattern:zod":
              J(t, se.email, r.message, e);
              break;
          }
          break;
        case "url":
          oe(t, "uri", r.message, e);
          break;
        case "uuid":
          oe(t, "uuid", r.message, e);
          break;
        case "regex":
          J(t, r.regex, r.message, e);
          break;
        case "cuid":
          J(t, se.cuid, r.message, e);
          break;
        case "cuid2":
          J(t, se.cuid2, r.message, e);
          break;
        case "startsWith":
          J(t, RegExp(`^${Nr(r.value, e)}`), r.message, e);
          break;
        case "endsWith":
          J(t, RegExp(`${Nr(r.value, e)}$`), r.message, e);
          break;
        case "datetime":
          oe(t, "date-time", r.message, e);
          break;
        case "date":
          oe(t, "date", r.message, e);
          break;
        case "time":
          oe(t, "time", r.message, e);
          break;
        case "duration":
          oe(t, "duration", r.message, e);
          break;
        case "length":
          L(t, "minLength", typeof t.minLength == "number" ? Math.max(t.minLength, r.value) : r.value, r.message, e), L(t, "maxLength", typeof t.maxLength == "number" ? Math.min(t.maxLength, r.value) : r.value, r.message, e);
          break;
        case "includes": {
          J(t, RegExp(Nr(r.value, e)), r.message, e);
          break;
        }
        case "ip": {
          r.version !== "v6" && oe(t, "ipv4", r.message, e), r.version !== "v4" && oe(t, "ipv6", r.message, e);
          break;
        }
        case "base64url":
          J(t, se.base64url, r.message, e);
          break;
        case "jwt":
          J(t, se.jwt, r.message, e);
          break;
        case "cidr": {
          r.version !== "v6" && J(t, se.ipv4Cidr, r.message, e), r.version !== "v4" && J(t, se.ipv6Cidr, r.message, e);
          break;
        }
        case "emoji":
          J(t, se.emoji(), r.message, e);
          break;
        case "ulid": {
          J(t, se.ulid, r.message, e);
          break;
        }
        case "base64": {
          switch (e.base64Strategy) {
            case "format:binary": {
              oe(t, "binary", r.message, e);
              break;
            }
            case "contentEncoding:base64": {
              L(t, "contentEncoding", "base64", r.message, e);
              break;
            }
            case "pattern:zod": {
              J(t, se.base64, r.message, e);
              break;
            }
          }
          break;
        }
        case "nanoid":
          J(t, se.nanoid, r.message, e);
      }
  return t;
}
function Nr(a, e) {
  return e.patternStrategy === "escape" ? iu(a) : a;
}
const au = new Set("ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789");
function iu(a) {
  let e = "";
  for (let t = 0; t < a.length; t++)
    au.has(a[t]) || (e += "\\"), e += a[t];
  return e;
}
function oe(a, e, t, r) {
  a.format || a.anyOf?.some((n) => n.format) ? (a.anyOf || (a.anyOf = []), a.format && (a.anyOf.push({
    format: a.format,
    ...a.errorMessage && r.errorMessages && {
      errorMessage: { format: a.errorMessage.format }
    }
  }), delete a.format, a.errorMessage && (delete a.errorMessage.format, Object.keys(a.errorMessage).length === 0 && delete a.errorMessage)), a.anyOf.push({
    format: e,
    ...t && r.errorMessages && { errorMessage: { format: t } }
  })) : L(a, "format", e, t, r);
}
function J(a, e, t, r) {
  a.pattern || a.allOf?.some((n) => n.pattern) ? (a.allOf || (a.allOf = []), a.pattern && (a.allOf.push({
    pattern: a.pattern,
    ...a.errorMessage && r.errorMessages && {
      errorMessage: { pattern: a.errorMessage.pattern }
    }
  }), delete a.pattern, a.errorMessage && (delete a.errorMessage.pattern, Object.keys(a.errorMessage).length === 0 && delete a.errorMessage)), a.allOf.push({
    pattern: Un(e, r),
    ...t && r.errorMessages && { errorMessage: { pattern: t } }
  })) : L(a, "pattern", Un(e, r), t, r);
}
function Un(a, e) {
  if (!e.applyRegexFlags || !a.flags)
    return a.source;
  const t = {
    i: a.flags.includes("i"),
    m: a.flags.includes("m"),
    s: a.flags.includes("s")
    // `.` matches newlines
  }, r = t.i ? a.source.toLowerCase() : a.source;
  let n = "", i = !1, s = !1, o = !1;
  for (let u = 0; u < r.length; u++) {
    if (i) {
      n += r[u], i = !1;
      continue;
    }
    if (t.i) {
      if (s) {
        if (r[u].match(/[a-z]/)) {
          o ? (n += r[u], n += `${r[u - 2]}-${r[u]}`.toUpperCase(), o = !1) : r[u + 1] === "-" && r[u + 2]?.match(/[a-z]/) ? (n += r[u], o = !0) : n += `${r[u]}${r[u].toUpperCase()}`;
          continue;
        }
      } else if (r[u].match(/[a-z]/)) {
        n += `[${r[u]}${r[u].toUpperCase()}]`;
        continue;
      }
    }
    if (t.m) {
      if (r[u] === "^") {
        n += `(^|(?<=[\r
]))`;
        continue;
      } else if (r[u] === "$") {
        n += `($|(?=[\r
]))`;
        continue;
      }
    }
    if (t.s && r[u] === ".") {
      n += s ? `${r[u]}\r
` : `[${r[u]}\r
]`;
      continue;
    }
    n += r[u], r[u] === "\\" ? i = !0 : s && r[u] === "]" ? s = !1 : !s && r[u] === "[" && (s = !0);
  }
  try {
    new RegExp(n);
  } catch {
    return console.warn(`Could not convert regex pattern at ${e.currentPath.join("/")} to a flag-independent form! Falling back to the flag-ignorant source`), a.source;
  }
  return n;
}
function Oa(a, e) {
  if (e.target === "openAi" && console.warn("Warning: OpenAI may not support records in schemas! Try an array of key-value pairs instead."), e.target === "openApi3" && a.keyType?._def.typeName === g.ZodEnum)
    return {
      type: "object",
      required: a.keyType._def.values,
      properties: a.keyType._def.values.reduce((r, n) => ({
        ...r,
        [n]: N(a.valueType._def, {
          ...e,
          currentPath: [...e.currentPath, "properties", n]
        }) ?? {}
      }), {}),
      additionalProperties: e.rejectedAdditionalProperties
    };
  const t = {
    type: "object",
    additionalProperties: N(a.valueType._def, {
      ...e,
      currentPath: [...e.currentPath, "additionalProperties"]
    }) ?? e.allowedAdditionalProperties
  };
  if (e.target === "openApi3")
    return t;
  if (a.keyType?._def.typeName === g.ZodString && a.keyType._def.checks?.length) {
    const { type: r, ...n } = Ea(a.keyType._def, e);
    return {
      ...t,
      propertyNames: n
    };
  } else {
    if (a.keyType?._def.typeName === g.ZodEnum)
      return {
        ...t,
        propertyNames: {
          enum: a.keyType._def.values
        }
      };
    if (a.keyType?._def.typeName === g.ZodBranded && a.keyType._def.type._def.typeName === g.ZodString && a.keyType._def.type._def.checks?.length) {
      const { type: r, ...n } = wa(a.keyType._def, e);
      return {
        ...t,
        propertyNames: n
      };
    }
  }
  return t;
}
function su(a, e) {
  if (e.mapStrategy === "record")
    return Oa(a, e);
  const t = N(a.keyType._def, {
    ...e,
    currentPath: [...e.currentPath, "items", "items", "0"]
  }) || {}, r = N(a.valueType._def, {
    ...e,
    currentPath: [...e.currentPath, "items", "items", "1"]
  }) || {};
  return {
    type: "array",
    maxItems: 125,
    items: {
      type: "array",
      items: [t, r],
      minItems: 2,
      maxItems: 2
    }
  };
}
function ou(a) {
  const e = a.values, r = Object.keys(a.values).filter((i) => typeof e[e[i]] != "number").map((i) => e[i]), n = Array.from(new Set(r.map((i) => typeof i)));
  return {
    type: n.length === 1 ? n[0] === "string" ? "string" : "number" : ["string", "number"],
    enum: r
  };
}
function uu() {
  return {
    not: {}
  };
}
function cu(a) {
  return a.target === "openApi3" ? {
    enum: ["null"],
    nullable: !0
  } : {
    type: "null"
  };
}
const sr = {
  ZodString: "string",
  ZodNumber: "number",
  ZodBigInt: "integer",
  ZodBoolean: "boolean",
  ZodNull: "null"
};
function lu(a, e) {
  if (e.target === "openApi3")
    return Fn(a, e);
  const t = a.options instanceof Map ? Array.from(a.options.values()) : a.options;
  if (t.every((r) => r._def.typeName in sr && (!r._def.checks || !r._def.checks.length))) {
    const r = t.reduce((n, i) => {
      const s = sr[i._def.typeName];
      return s && !n.includes(s) ? [...n, s] : n;
    }, []);
    return {
      type: r.length > 1 ? r : r[0]
    };
  } else if (t.every((r) => r._def.typeName === "ZodLiteral" && !r.description)) {
    const r = t.reduce((n, i) => {
      const s = typeof i._def.value;
      switch (s) {
        case "string":
        case "number":
        case "boolean":
          return [...n, s];
        case "bigint":
          return [...n, "integer"];
        case "object":
          if (i._def.value === null)
            return [...n, "null"];
        case "symbol":
        case "undefined":
        case "function":
        default:
          return n;
      }
    }, []);
    if (r.length === t.length) {
      const n = r.filter((i, s, o) => o.indexOf(i) === s);
      return {
        type: n.length > 1 ? n : n[0],
        enum: t.reduce((i, s) => i.includes(s._def.value) ? i : [...i, s._def.value], [])
      };
    }
  } else if (t.every((r) => r._def.typeName === "ZodEnum"))
    return {
      type: "string",
      enum: t.reduce((r, n) => [
        ...r,
        ...n._def.values.filter((i) => !r.includes(i))
      ], [])
    };
  return Fn(a, e);
}
const Fn = (a, e) => {
  const t = (a.options instanceof Map ? Array.from(a.options.values()) : a.options).map((r, n) => N(r._def, {
    ...e,
    currentPath: [...e.currentPath, "anyOf", `${n}`]
  })).filter((r) => !!r && (!e.strictUnions || typeof r == "object" && Object.keys(r).length > 0));
  return t.length ? { anyOf: t } : void 0;
};
function du(a, e) {
  if (["ZodString", "ZodNumber", "ZodBigInt", "ZodBoolean", "ZodNull"].includes(a.innerType._def.typeName) && (!a.innerType._def.checks || !a.innerType._def.checks.length))
    return e.target === "openApi3" ? {
      type: sr[a.innerType._def.typeName],
      nullable: !0
    } : {
      type: [
        sr[a.innerType._def.typeName],
        "null"
      ]
    };
  if (e.target === "openApi3") {
    const r = N(a.innerType._def, {
      ...e,
      currentPath: [...e.currentPath]
    });
    return r && "$ref" in r ? { allOf: [r], nullable: !0 } : r && { ...r, nullable: !0 };
  }
  const t = N(a.innerType._def, {
    ...e,
    currentPath: [...e.currentPath, "anyOf", "0"]
  });
  return t && { anyOf: [t, { type: "null" }] };
}
function hu(a, e) {
  const t = {
    type: "number"
  };
  if (!a.checks)
    return t;
  for (const r of a.checks)
    switch (r.kind) {
      case "int":
        t.type = "integer", ba(t, "type", r.message, e);
        break;
      case "min":
        e.target === "jsonSchema7" ? r.inclusive ? L(t, "minimum", r.value, r.message, e) : L(t, "exclusiveMinimum", r.value, r.message, e) : (r.inclusive || (t.exclusiveMinimum = !0), L(t, "minimum", r.value, r.message, e));
        break;
      case "max":
        e.target === "jsonSchema7" ? r.inclusive ? L(t, "maximum", r.value, r.message, e) : L(t, "exclusiveMaximum", r.value, r.message, e) : (r.inclusive || (t.exclusiveMaximum = !0), L(t, "maximum", r.value, r.message, e));
        break;
      case "multipleOf":
        L(t, "multipleOf", r.value, r.message, e);
        break;
    }
  return t;
}
function fu(a, e) {
  const t = e.target === "openAi", r = {
    type: "object",
    properties: {}
  }, n = [], i = a.shape();
  for (const o in i) {
    let u = i[o];
    if (u === void 0 || u._def === void 0)
      continue;
    let c = mu(u);
    c && t && (u instanceof le && (u = u._def.innerType), u.isNullable() || (u = u.nullable()), c = !1);
    const l = N(u._def, {
      ...e,
      currentPath: [...e.currentPath, "properties", o],
      propertyPath: [...e.currentPath, "properties", o]
    });
    l !== void 0 && (r.properties[o] = l, c || n.push(o));
  }
  n.length && (r.required = n);
  const s = pu(a, e);
  return s !== void 0 && (r.additionalProperties = s), r;
}
function pu(a, e) {
  if (a.catchall._def.typeName !== "ZodNever")
    return N(a.catchall._def, {
      ...e,
      currentPath: [...e.currentPath, "additionalProperties"]
    });
  switch (a.unknownKeys) {
    case "passthrough":
      return e.allowedAdditionalProperties;
    case "strict":
      return e.rejectedAdditionalProperties;
    case "strip":
      return e.removeAdditionalStrategy === "strict" ? e.allowedAdditionalProperties : e.rejectedAdditionalProperties;
  }
}
function mu(a) {
  try {
    return a.isOptional();
  } catch {
    return !0;
  }
}
const gu = (a, e) => {
  if (e.currentPath.toString() === e.propertyPath?.toString())
    return N(a.innerType._def, e);
  const t = N(a.innerType._def, {
    ...e,
    currentPath: [...e.currentPath, "anyOf", "1"]
  });
  return t ? {
    anyOf: [
      {
        not: {}
      },
      t
    ]
  } : {};
}, yu = (a, e) => {
  if (e.pipeStrategy === "input")
    return N(a.in._def, e);
  if (e.pipeStrategy === "output")
    return N(a.out._def, e);
  const t = N(a.in._def, {
    ...e,
    currentPath: [...e.currentPath, "allOf", "0"]
  }), r = N(a.out._def, {
    ...e,
    currentPath: [...e.currentPath, "allOf", t ? "1" : "0"]
  });
  return {
    allOf: [t, r].filter((n) => n !== void 0)
  };
};
function _u(a, e) {
  return N(a.type._def, e);
}
function bu(a, e) {
  const r = {
    type: "array",
    uniqueItems: !0,
    items: N(a.valueType._def, {
      ...e,
      currentPath: [...e.currentPath, "items"]
    })
  };
  return a.minSize && L(r, "minItems", a.minSize.value, a.minSize.message, e), a.maxSize && L(r, "maxItems", a.maxSize.value, a.maxSize.message, e), r;
}
function wu(a, e) {
  return a.rest ? {
    type: "array",
    minItems: a.items.length,
    items: a.items.map((t, r) => N(t._def, {
      ...e,
      currentPath: [...e.currentPath, "items", `${r}`]
    })).reduce((t, r) => r === void 0 ? t : [...t, r], []),
    additionalItems: N(a.rest._def, {
      ...e,
      currentPath: [...e.currentPath, "additionalItems"]
    })
  } : {
    type: "array",
    minItems: a.items.length,
    maxItems: a.items.length,
    items: a.items.map((t, r) => N(t._def, {
      ...e,
      currentPath: [...e.currentPath, "items", `${r}`]
    })).reduce((t, r) => r === void 0 ? t : [...t, r], [])
  };
}
function vu() {
  return {
    not: {}
  };
}
function Eu() {
  return {};
}
const Ou = (a, e) => N(a.innerType._def, e), Tu = (a, e, t) => {
  switch (e) {
    case g.ZodString:
      return Ea(a, t);
    case g.ZodNumber:
      return hu(a, t);
    case g.ZodObject:
      return fu(a, t);
    case g.ZodBigInt:
      return Jo(a, t);
    case g.ZodBoolean:
      return Wo();
    case g.ZodDate:
      return va(a, t);
    case g.ZodUndefined:
      return vu();
    case g.ZodNull:
      return cu(t);
    case g.ZodArray:
      return Go(a, t);
    case g.ZodUnion:
    case g.ZodDiscriminatedUnion:
      return lu(a, t);
    case g.ZodIntersection:
      return ru(a, t);
    case g.ZodTuple:
      return wu(a, t);
    case g.ZodRecord:
      return Oa(a, t);
    case g.ZodLiteral:
      return nu(a, t);
    case g.ZodEnum:
      return eu(a);
    case g.ZodNativeEnum:
      return ou(a);
    case g.ZodNullable:
      return du(a, t);
    case g.ZodOptional:
      return gu(a, t);
    case g.ZodMap:
      return su(a, t);
    case g.ZodSet:
      return bu(a, t);
    case g.ZodLazy:
      return () => a.getter()._def;
    case g.ZodPromise:
      return _u(a, t);
    case g.ZodNaN:
    case g.ZodNever:
      return uu();
    case g.ZodEffects:
      return Xo(a, t);
    case g.ZodAny:
      return Vo();
    case g.ZodUnknown:
      return Eu();
    case g.ZodDefault:
      return Yo(a, t);
    case g.ZodBranded:
      return wa(a, t);
    case g.ZodReadonly:
      return Ou(a, t);
    case g.ZodCatch:
      return Ko(a, t);
    case g.ZodPipeline:
      return yu(a, t);
    case g.ZodFunction:
    case g.ZodVoid:
    case g.ZodSymbol:
      return;
    default:
      return /* @__PURE__ */ ((r) => {
      })();
  }
};
function N(a, e, t = !1) {
  const r = e.seen.get(a);
  if (e.override) {
    const o = e.override?.(a, e, r, t);
    if (o !== Bo)
      return o;
  }
  if (r && !t) {
    const o = Su(r, e);
    if (o !== void 0)
      return o;
  }
  const n = { def: a, path: e.currentPath, jsonSchema: void 0 };
  e.seen.set(a, n);
  const i = Tu(a, a.typeName, e), s = typeof i == "function" ? N(i(), e) : i;
  if (s && xu(a, e, s), e.postProcess) {
    const o = e.postProcess(s, a, e);
    return n.jsonSchema = s, o;
  }
  return n.jsonSchema = s, s;
}
const Su = (a, e) => {
  switch (e.$refStrategy) {
    case "root":
      return { $ref: a.path.join("/") };
    case "relative":
      return { $ref: ku(e.currentPath, a.path) };
    case "none":
    case "seen":
      return a.path.length < e.currentPath.length && a.path.every((t, r) => e.currentPath[r] === t) ? (console.warn(`Recursive reference detected at ${e.currentPath.join("/")}! Defaulting to any`), {}) : e.$refStrategy === "seen" ? {} : void 0;
  }
}, ku = (a, e) => {
  let t = 0;
  for (; t < a.length && t < e.length && a[t] === e[t]; t++)
    ;
  return [(a.length - t).toString(), ...e.slice(t)].join("/");
}, xu = (a, e, t) => (a.description && (t.description = a.description, e.markdownDescription && (t.markdownDescription = a.description)), t), Au = (a, e) => {
  const t = qo(e), r = void 0, n = e?.name, i = N(a._def, n === void 0 ? t : {
    ...t,
    currentPath: [...t.basePath, t.definitionPath, n]
  }, !1) ?? {}, s = n === void 0 ? r ? {
    ...i,
    [t.definitionPath]: r
  } : i : {
    $ref: [
      ...t.$refStrategy === "relative" ? [] : t.basePath,
      t.definitionPath,
      n
    ].join("/"),
    [t.definitionPath]: {
      ...r,
      [n]: i
    }
  };
  return t.target === "jsonSchema7" ? s.$schema = "http://json-schema.org/draft-07/schema#" : (t.target === "jsonSchema2019-09" || t.target === "openAi") && (s.$schema = "https://json-schema.org/draft/2019-09/schema#"), t.target === "openAi" && ("anyOf" in s || "oneOf" in s || "allOf" in s || "type" in s && Array.isArray(s.type)) && console.warn("Warning: OpenAI may not support schemas with unions as roots! Try wrapping it in an object property."), s;
};
function $r(a) {
  return a.replace(/[^a-zA-Z-_0-9]/g, "_");
}
const Iu = ["*", "_", "`"];
function Pu(a) {
  let e = "";
  for (const [t, r] of Object.entries(a))
    e += `	classDef ${t} ${r};
`;
  return e;
}
function Cu(a, e, t) {
  const { firstNode: r, lastNode: n, nodeColors: i, withStyles: s = !0, curveStyle: o = "linear", wrapLabelNWords: u = 9 } = t ?? {};
  let c = s ? `%%{init: {'flowchart': {'curve': '${o}'}}}%%
graph TD;
` : `graph TD;
`;
  if (s) {
    const f = "default", p = {
      [f]: "{0}({1})"
    };
    r !== void 0 && (p[r] = "{0}([{1}]):::first"), n !== void 0 && (p[n] = "{0}([{1}]):::last");
    for (const [T, y] of Object.entries(a)) {
      const v = y.name.split(":").pop() ?? "";
      let b = Iu.some((x) => v.startsWith(x) && v.endsWith(x)) ? `<p>${v}</p>` : v;
      Object.keys(y.metadata ?? {}).length && (b += `<hr/><small><em>${Object.entries(y.metadata ?? {}).map(([x, M]) => `${x} = ${M}`).join(`
`)}</em></small>`);
      const $ = (p[T] ?? p[f]).replace("{0}", $r(T)).replace("{1}", b);
      c += `	${$}
`;
    }
  }
  const l = {};
  for (const f of e) {
    const p = f.source.split(":"), T = f.target.split(":"), y = p.filter((v, k) => v === T[k]).join(":");
    l[y] || (l[y] = []), l[y].push(f);
  }
  const h = /* @__PURE__ */ new Set();
  function d(f, p) {
    const T = f.length === 1 && f[0].source === f[0].target;
    if (p && !T) {
      const y = p.split(":").pop();
      if (h.has(y))
        throw new Error(`Found duplicate subgraph '${y}' -- this likely means that you're reusing a subgraph node with the same name. Please adjust your graph to have subgraph nodes with unique names.`);
      h.add(y), c += `	subgraph ${y}
`;
    }
    for (const y of f) {
      const { source: v, target: k, data: b, conditional: $ } = y;
      let x = "";
      if (b !== void 0) {
        let M = b;
        const D = M.split(" ");
        D.length > u && (M = Array.from({ length: Math.ceil(D.length / u) }, (ie, Mt) => D.slice(Mt * u, (Mt + 1) * u).join(" ")).join("&nbsp;<br>&nbsp;")), x = $ ? ` -. &nbsp;${M}&nbsp; .-> ` : ` -- &nbsp;${M}&nbsp; --> `;
      } else
        x = $ ? " -.-> " : " --> ";
      c += `	${$r(v)}${x}${$r(k)};
`;
    }
    for (const y in l)
      y.startsWith(`${p}:`) && y !== p && d(l[y], y);
    p && !T && (c += `	end
`);
  }
  d(l[""] ?? [], "");
  for (const f in l)
    !f.includes(":") && f !== "" && d(l[f], f);
  return s && (c += Pu(i ?? {})), c;
}
async function Ru(a, e) {
  let { backgroundColor: t = "white" } = e ?? {};
  const r = btoa(a);
  t !== void 0 && (/^#(?:[0-9a-fA-F]{3}){1,2}$/.test(t) || (t = `!${t}`));
  const n = `https://mermaid.ink/img/${r}?bgColor=${t}`, i = await fetch(n);
  if (!i.ok)
    throw new Error([
      "Failed to render the graph using the Mermaid.INK API.",
      `Status code: ${i.status}`,
      `Status text: ${i.statusText}`
    ].join(`
`));
  return await i.blob();
}
function ju(a, e) {
  if (a !== void 0 && !dt(a))
    return a;
  if (en(e))
    try {
      let t = e.getName();
      return t = t.startsWith("Runnable") ? t.slice(8) : t, t;
    } catch {
      return e.getName();
    }
  else
    return e.name ?? "UnknownSchema";
}
function Nu(a) {
  return en(a.data) ? {
    type: "runnable",
    data: {
      id: a.data.lc_id,
      name: a.data.getName()
    }
  } : {
    type: "schema",
    data: { ...Au(a.data.schema), title: a.data.name }
  };
}
class hr {
  constructor(e) {
    Object.defineProperty(this, "nodes", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: {}
    }), Object.defineProperty(this, "edges", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: []
    }), this.nodes = e?.nodes ?? this.nodes, this.edges = e?.edges ?? this.edges;
  }
  // Convert the graph to a JSON-serializable format.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toJSON() {
    const e = {};
    return Object.values(this.nodes).forEach((t, r) => {
      e[t.id] = dt(t.id) ? r : t.id;
    }), {
      nodes: Object.values(this.nodes).map((t) => ({
        id: e[t.id],
        ...Nu(t)
      })),
      edges: this.edges.map((t) => {
        const r = {
          source: e[t.source],
          target: e[t.target]
        };
        return typeof t.data < "u" && (r.data = t.data), typeof t.conditional < "u" && (r.conditional = t.conditional), r;
      })
    };
  }
  addNode(e, t, r) {
    if (t !== void 0 && this.nodes[t] !== void 0)
      throw new Error(`Node with id ${t} already exists`);
    const n = t ?? W(), i = {
      id: n,
      data: e,
      name: ju(t, e),
      metadata: r
    };
    return this.nodes[n] = i, i;
  }
  removeNode(e) {
    delete this.nodes[e.id], this.edges = this.edges.filter((t) => t.source !== e.id && t.target !== e.id);
  }
  addEdge(e, t, r, n) {
    if (this.nodes[e.id] === void 0)
      throw new Error(`Source node ${e.id} not in graph`);
    if (this.nodes[t.id] === void 0)
      throw new Error(`Target node ${t.id} not in graph`);
    const i = {
      source: e.id,
      target: t.id,
      data: r,
      conditional: n
    };
    return this.edges.push(i), i;
  }
  firstNode() {
    return Zn(this);
  }
  lastNode() {
    return Bn(this);
  }
  /**
   * Add all nodes and edges from another graph.
   * Note this doesn't check for duplicates, nor does it connect the graphs.
   */
  extend(e, t = "") {
    let r = t;
    Object.values(e.nodes).map((c) => c.id).every(dt) && (r = "");
    const i = (c) => r ? `${r}:${c}` : c;
    Object.entries(e.nodes).forEach(([c, l]) => {
      this.nodes[i(c)] = { ...l, id: i(c) };
    });
    const s = e.edges.map((c) => ({
      ...c,
      source: i(c.source),
      target: i(c.target)
    }));
    this.edges = [...this.edges, ...s];
    const o = e.firstNode(), u = e.lastNode();
    return [
      o ? { id: i(o.id), data: o.data } : void 0,
      u ? { id: i(u.id), data: u.data } : void 0
    ];
  }
  trimFirstNode() {
    const e = this.firstNode();
    e && Zn(this, [e.id]) && this.removeNode(e);
  }
  trimLastNode() {
    const e = this.lastNode();
    e && Bn(this, [e.id]) && this.removeNode(e);
  }
  /**
   * Return a new graph with all nodes re-identified,
   * using their unique, readable names where possible.
   */
  reid() {
    const e = Object.fromEntries(Object.values(this.nodes).map((n) => [n.id, n.name])), t = /* @__PURE__ */ new Map();
    Object.values(e).forEach((n) => {
      t.set(n, (t.get(n) || 0) + 1);
    });
    const r = (n) => {
      const i = e[n];
      return dt(n) && t.get(i) === 1 ? i : n;
    };
    return new hr({
      nodes: Object.fromEntries(Object.entries(this.nodes).map(([n, i]) => [
        r(n),
        { ...i, id: r(n) }
      ])),
      edges: this.edges.map((n) => ({
        ...n,
        source: r(n.source),
        target: r(n.target)
      }))
    });
  }
  drawMermaid(e) {
    const { withStyles: t, curveStyle: r, nodeColors: n = {
      default: "fill:#f2f0ff,line-height:1.2",
      first: "fill-opacity:0",
      last: "fill:#bfb6fc"
    }, wrapLabelNWords: i } = e ?? {}, s = this.reid(), o = s.firstNode(), u = s.lastNode();
    return Cu(s.nodes, s.edges, {
      firstNode: o?.id,
      lastNode: u?.id,
      withStyles: t,
      curveStyle: r,
      nodeColors: n,
      wrapLabelNWords: i
    });
  }
  async drawMermaidPng(e) {
    const t = this.drawMermaid(e);
    return Ru(t, {
      backgroundColor: e?.backgroundColor
    });
  }
}
function Zn(a, e = []) {
  const t = new Set(a.edges.filter((n) => !e.includes(n.source)).map((n) => n.target)), r = [];
  for (const n of Object.values(a.nodes))
    !e.includes(n.id) && !t.has(n.id) && r.push(n);
  return r.length === 1 ? r[0] : void 0;
}
function Bn(a, e = []) {
  const t = new Set(a.edges.filter((n) => !e.includes(n.target)).map((n) => n.source)), r = [];
  for (const n of Object.values(a.nodes))
    !e.includes(n.id) && !t.has(n.id) && r.push(n);
  return r.length === 1 ? r[0] : void 0;
}
function $u(a) {
  const e = new TextEncoder(), t = new ReadableStream({
    async start(r) {
      for await (const n of a)
        r.enqueue(e.encode(`event: data
data: ${JSON.stringify(n)}

`));
      r.enqueue(e.encode(`event: end

`)), r.close();
    }
  });
  return re.fromReadableStream(t);
}
function Hn(a) {
  return typeof a == "object" && a !== null && typeof a[Symbol.iterator] == "function" && // avoid detecting array/set as iterator
  typeof a.next == "function";
}
const Mu = (a) => a != null && typeof a == "object" && "next" in a && typeof a.next == "function";
function Jr(a) {
  return typeof a == "object" && a !== null && typeof a[Symbol.asyncIterator] == "function";
}
function* zn(a, e) {
  for (; ; ) {
    const { value: t, done: r } = $e.runWithConfig(nt(a), e.next.bind(e), !0);
    if (r)
      break;
    yield t;
  }
}
async function* Wr(a, e) {
  const t = e[Symbol.asyncIterator]();
  for (; ; ) {
    const { value: r, done: n } = await $e.runWithConfig(nt(a), t.next.bind(e), !0);
    if (n)
      break;
    yield r;
  }
}
function H(a, e) {
  return a && !Array.isArray(a) && // eslint-disable-next-line no-instanceof/no-instanceof
  !(a instanceof Date) && typeof a == "object" ? a : { [e]: a };
}
class K extends He {
  constructor() {
    super(...arguments), Object.defineProperty(this, "lc_runnable", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: !0
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    });
  }
  getName(e) {
    const t = (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.name ?? this.constructor.lc_name() ?? this.constructor.name
    );
    return e ? `${t}${e}` : t;
  }
  /**
   * Bind arguments to a Runnable, returning a new Runnable.
   * @param kwargs
   * @returns A new RunnableBinding that, when invoked, will apply the bound args.
   */
  bind(e) {
    return new Be({ bound: this, kwargs: e, config: {} });
  }
  /**
   * Return a new Runnable that maps a list of inputs to a list of outputs,
   * by calling invoke() with each input.
   */
  map() {
    return new or({ bound: this });
  }
  /**
   * Add retry logic to an existing runnable.
   * @param kwargs
   * @returns A new RunnableRetry that, when invoked, will retry according to the parameters.
   */
  withRetry(e) {
    return new Lu({
      bound: this,
      kwargs: {},
      config: {},
      maxAttemptNumber: e?.stopAfterAttempt,
      ...e
    });
  }
  /**
   * Bind config to a Runnable, returning a new Runnable.
   * @param config New configuration parameters to attach to the new runnable.
   * @returns A new RunnableBinding with a config matching what's passed.
   */
  withConfig(e) {
    return new Be({
      bound: this,
      config: e,
      kwargs: {}
    });
  }
  /**
   * Create a new runnable from the current one that will try invoking
   * other passed fallback runnables if the initial invocation fails.
   * @param fields.fallbacks Other runnables to call if the runnable errors.
   * @returns A new RunnableWithFallbacks.
   */
  withFallbacks(e) {
    const t = Array.isArray(e) ? e : e.fallbacks;
    return new Uu({
      runnable: this,
      fallbacks: t
    });
  }
  _getOptionsList(e, t = 0) {
    if (Array.isArray(e) && e.length !== t)
      throw new Error(`Passed "options" must be an array with the same length as the inputs, but got ${e.length} options for ${t} inputs`);
    if (Array.isArray(e))
      return e.map(j);
    if (t > 1 && !Array.isArray(e) && e.runId) {
      console.warn("Provided runId will be used only for the first element of the batch.");
      const r = Object.fromEntries(Object.entries(e).filter(([n]) => n !== "runId"));
      return Array.from({ length: t }, (n, i) => j(i === 0 ? e : r));
    }
    return Array.from({ length: t }, () => j(e));
  }
  async batch(e, t, r) {
    const n = this._getOptionsList(t ?? {}, e.length), i = n[0]?.maxConcurrency ?? r?.maxConcurrency, s = new Fo({
      maxConcurrency: i,
      onFailedAttempt: (u) => {
        throw u;
      }
    }), o = e.map((u, c) => s.call(async () => {
      try {
        return await this.invoke(u, n[c]);
      } catch (l) {
        if (r?.returnExceptions)
          return l;
        throw l;
      }
    }));
    return Promise.all(o);
  }
  /**
   * Default streaming implementation.
   * Subclasses should override this method if they support streaming output.
   * @param input
   * @param options
   */
  async *_streamIterator(e, t) {
    yield this.invoke(e, t);
  }
  /**
   * Stream output in chunks.
   * @param input
   * @param options
   * @returns A readable stream that is also an iterable.
   */
  async stream(e, t) {
    const r = j(t), n = new at({
      generator: this._streamIterator(e, r),
      config: r
    });
    return await n.setup, re.fromAsyncGenerator(n);
  }
  _separateRunnableConfigFromCallOptions(e) {
    let t;
    e === void 0 ? t = j(e) : t = j({
      callbacks: e.callbacks,
      tags: e.tags,
      metadata: e.metadata,
      runName: e.runName,
      configurable: e.configurable,
      recursionLimit: e.recursionLimit,
      maxConcurrency: e.maxConcurrency,
      runId: e.runId,
      timeout: e.timeout,
      signal: e.signal
    });
    const r = { ...e };
    return delete r.callbacks, delete r.tags, delete r.metadata, delete r.runName, delete r.configurable, delete r.recursionLimit, delete r.maxConcurrency, delete r.runId, delete r.timeout, delete r.signal, [t, r];
  }
  async _callWithConfig(e, t, r) {
    const n = j(r), s = await (await de(n))?.handleChainStart(this.toJSON(), H(t, "input"), n.runId, n?.runType, void 0, void 0, n?.runName ?? this.getName());
    delete n.runId;
    let o;
    try {
      const u = e.call(this, t, n, s);
      o = await Me(u, r?.signal);
    } catch (u) {
      throw await s?.handleChainError(u), u;
    }
    return await s?.handleChainEnd(H(o, "output")), o;
  }
  /**
   * Internal method that handles batching and configuration for a runnable
   * It takes a function, input values, and optional configuration, and
   * returns a promise that resolves to the output values.
   * @param func The function to be executed for each input value.
   * @param input The input values to be processed.
   * @param config Optional configuration for the function execution.
   * @returns A promise that resolves to the output values.
   */
  async _batchWithConfig(e, t, r, n) {
    const i = this._getOptionsList(r ?? {}, t.length), s = await Promise.all(i.map(de)), o = await Promise.all(s.map(async (c, l) => {
      const h = await c?.handleChainStart(this.toJSON(), H(t[l], "input"), i[l].runId, i[l].runType, void 0, void 0, i[l].runName ?? this.getName());
      return delete i[l].runId, h;
    }));
    let u;
    try {
      const c = e.call(this, t, i, o, n);
      u = await Me(c, i?.[0]?.signal);
    } catch (c) {
      throw await Promise.all(o.map((l) => l?.handleChainError(c))), c;
    }
    return await Promise.all(o.map((c) => c?.handleChainEnd(H(u, "output")))), u;
  }
  /**
   * Helper method to transform an Iterator of Input values into an Iterator of
   * Output values, with callbacks.
   * Use this to implement `stream()` or `transform()` in Runnable subclasses.
   */
  async *_transformStreamWithConfig(e, t, r) {
    let n, i = !0, s, o = !0;
    const u = j(r), c = await de(u);
    async function* l() {
      for await (const d of e) {
        if (i)
          if (n === void 0)
            n = d;
          else
            try {
              n = Oe(n, d);
            } catch {
              n = void 0, i = !1;
            }
        yield d;
      }
    }
    let h;
    try {
      const d = await jo(t.bind(this), l(), async () => c?.handleChainStart(this.toJSON(), { input: "" }, u.runId, u.runType, void 0, void 0, u.runName ?? this.getName()), r?.signal, u);
      delete u.runId, h = d.setup;
      const f = h?.handlers.find(Mo);
      let p = d.output;
      f !== void 0 && h !== void 0 && (p = f.tapOutputIterable(h.runId, p));
      const T = h?.handlers.find(No);
      T !== void 0 && h !== void 0 && (p = T.tapOutputIterable(h.runId, p));
      for await (const y of p)
        if (yield y, o)
          if (s === void 0)
            s = y;
          else
            try {
              s = Oe(s, y);
            } catch {
              s = void 0, o = !1;
            }
    } catch (d) {
      throw await h?.handleChainError(d, void 0, void 0, void 0, {
        inputs: H(n, "input")
      }), d;
    }
    await h?.handleChainEnd(s ?? {}, void 0, void 0, void 0, { inputs: H(n, "input") });
  }
  getGraph(e) {
    const t = new hr(), r = t.addNode({
      name: `${this.getName()}Input`,
      schema: pt.any()
    }), n = t.addNode(this), i = t.addNode({
      name: `${this.getName()}Output`,
      schema: pt.any()
    });
    return t.addEdge(r, n), t.addEdge(n, i), t;
  }
  /**
   * Create a new runnable sequence that runs each individual runnable in series,
   * piping the output of one runnable into another runnable or runnable-like.
   * @param coerceable A runnable, function, or object whose values are functions or runnables.
   * @returns A new runnable sequence.
   */
  pipe(e) {
    return new De({
      first: this,
      last: Ue(e)
    });
  }
  /**
   * Pick keys from the dict output of this runnable. Returns a new runnable.
   */
  pick(e) {
    return this.pipe(new Zu(e));
  }
  /**
   * Assigns new fields to the dict output of this runnable. Returns a new runnable.
   */
  assign(e) {
    return this.pipe(
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      new Fu(
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        new $t({ steps: e })
      )
    );
  }
  /**
   * Default implementation of transform, which buffers input and then calls stream.
   * Subclasses should override this method if they can start producing output while
   * input is still being generated.
   * @param generator
   * @param options
   */
  async *transform(e, t) {
    let r;
    for await (const n of e)
      r === void 0 ? r = n : r = Oe(r, n);
    yield* this._streamIterator(r, j(t));
  }
  /**
   * Stream all output from a runnable, as reported to the callback system.
   * This includes all inner runs of LLMs, Retrievers, Tools, etc.
   * Output is streamed as Log objects, which include a list of
   * jsonpatch ops that describe how the state of the run has changed in each
   * step, and the final state of the run.
   * The jsonpatch ops can be applied in order to construct state.
   * @param input
   * @param options
   * @param streamOptions
   */
  async *streamLog(e, t, r) {
    const n = new Dn({
      ...r,
      autoClose: !1,
      _schemaFormat: "original"
    }), i = j(t);
    yield* this._streamLog(e, n, i);
  }
  async *_streamLog(e, t, r) {
    const { callbacks: n } = r;
    if (n === void 0)
      r.callbacks = [t];
    else if (Array.isArray(n))
      r.callbacks = n.concat([t]);
    else {
      const u = n.copy();
      u.addHandler(t, !0), r.callbacks = u;
    }
    const i = this.stream(e, r);
    async function s() {
      try {
        const u = await i;
        for await (const c of u) {
          const l = new Ae({
            ops: [
              {
                op: "add",
                path: "/streamed_output/-",
                value: c
              }
            ]
          });
          await t.writer.write(l);
        }
      } finally {
        await t.writer.close();
      }
    }
    const o = s();
    try {
      for await (const u of t)
        yield u;
    } finally {
      await o;
    }
  }
  streamEvents(e, t, r) {
    let n;
    if (t.version === "v1")
      n = this._streamEventsV1(e, t, r);
    else if (t.version === "v2")
      n = this._streamEventsV2(e, t, r);
    else
      throw new Error('Only versions "v1" and "v2" of the schema are currently supported.');
    return t.encoding === "text/event-stream" ? $u(n) : re.fromAsyncGenerator(n);
  }
  async *_streamEventsV2(e, t, r) {
    const n = new Lo({
      ...r,
      autoClose: !1
    }), i = j(t), s = i.runId ?? W();
    i.runId = s;
    const o = i.callbacks;
    if (o === void 0)
      i.callbacks = [n];
    else if (Array.isArray(o))
      i.callbacks = o.concat(n);
    else {
      const p = o.copy();
      p.addHandler(n, !0), i.callbacks = p;
    }
    const u = new AbortController(), c = this;
    async function l() {
      try {
        let p;
        t?.signal ? "any" in AbortSignal ? p = AbortSignal.any([
          u.signal,
          t.signal
        ]) : (p = t.signal, t.signal.addEventListener("abort", () => {
          u.abort();
        }, { once: !0 })) : p = u.signal;
        const T = await c.stream(e, {
          ...i,
          signal: p
        }), y = n.tapOutputIterable(s, T);
        for await (const v of y)
          if (u.signal.aborted)
            break;
      } finally {
        await n.finish();
      }
    }
    const h = l();
    let d = !1, f;
    try {
      for await (const p of n) {
        if (!d) {
          p.data.input = e, d = !0, f = p.run_id, yield p;
          continue;
        }
        p.run_id === f && p.event.endsWith("_end") && p.data?.input && delete p.data.input, yield p;
      }
    } finally {
      u.abort(), await h;
    }
  }
  async *_streamEventsV1(e, t, r) {
    let n, i = !1;
    const s = j(t), o = s.tags ?? [], u = s.metadata ?? {}, c = s.runName ?? this.getName(), l = new Dn({
      ...r,
      autoClose: !1,
      _schemaFormat: "streaming_events"
    }), h = new Zo({
      ...r
    }), d = this._streamLog(e, l, s);
    for await (const p of d) {
      if (n ? n = n.concat(p) : n = Ct.fromRunLogPatch(p), n.state === void 0)
        throw new Error('Internal error: "streamEvents" state is missing. Please open a bug report.');
      if (!i) {
        i = !0;
        const k = { ...n.state }, b = {
          run_id: k.id,
          event: `on_${k.type}_start`,
          name: c,
          tags: o,
          metadata: u,
          data: {
            input: e
          }
        };
        h.includeEvent(b, k.type) && (yield b);
      }
      const T = p.ops.filter((k) => k.path.startsWith("/logs/")).map((k) => k.path.split("/")[2]), y = [...new Set(T)];
      for (const k of y) {
        let b, $ = {};
        const x = n.state.logs[k];
        if (x.end_time === void 0 ? x.streamed_output.length > 0 ? b = "stream" : b = "start" : b = "end", b === "start")
          x.inputs !== void 0 && ($.input = x.inputs);
        else if (b === "end")
          x.inputs !== void 0 && ($.input = x.inputs), $.output = x.final_output;
        else if (b === "stream") {
          const M = x.streamed_output.length;
          if (M !== 1)
            throw new Error(`Expected exactly one chunk of streamed output, got ${M} instead. Encountered in: "${x.name}"`);
          $ = { chunk: x.streamed_output[0] }, x.streamed_output = [];
        }
        yield {
          event: `on_${x.type}_${b}`,
          name: x.name,
          run_id: x.id,
          tags: x.tags,
          metadata: x.metadata,
          data: $
        };
      }
      const { state: v } = n;
      if (v.streamed_output.length > 0) {
        const k = v.streamed_output.length;
        if (k !== 1)
          throw new Error(`Expected exactly one chunk of streamed output, got ${k} instead. Encountered in: "${v.name}"`);
        const b = { chunk: v.streamed_output[0] };
        v.streamed_output = [];
        const $ = {
          event: `on_${v.type}_stream`,
          run_id: v.id,
          tags: o,
          metadata: u,
          name: c,
          data: b
        };
        h.includeEvent($, v.type) && (yield $);
      }
    }
    const f = n?.state;
    if (f !== void 0) {
      const p = {
        event: `on_${f.type}_end`,
        name: c,
        run_id: f.id,
        tags: o,
        metadata: u,
        data: {
          output: f.final_output
        }
      };
      h.includeEvent(p, f.type) && (yield p);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static isRunnable(e) {
    return en(e);
  }
  /**
   * Bind lifecycle listeners to a Runnable, returning a new Runnable.
   * The Run object contains information about the run, including its id,
   * type, input, output, error, startTime, endTime, and any tags or metadata
   * added to the run.
   *
   * @param {Object} params - The object containing the callback functions.
   * @param {(run: Run) => void} params.onStart - Called before the runnable starts running, with the Run object.
   * @param {(run: Run) => void} params.onEnd - Called after the runnable finishes running, with the Run object.
   * @param {(run: Run) => void} params.onError - Called if the runnable throws an error, with the Run object.
   */
  withListeners({ onStart: e, onEnd: t, onError: r }) {
    return new Be({
      bound: this,
      config: {},
      configFactories: [
        (n) => ({
          callbacks: [
            new _a({
              config: n,
              onStart: e,
              onEnd: t,
              onError: r
            })
          ]
        })
      ]
    });
  }
  /**
   * Convert a runnable to a tool. Return a new instance of `RunnableToolLike`
   * which contains the runnable, name, description and schema.
   *
   * @template {T extends RunInput = RunInput} RunInput - The input type of the runnable. Should be the same as the `RunInput` type of the runnable.
   *
   * @param fields
   * @param {string | undefined} [fields.name] The name of the tool. If not provided, it will default to the name of the runnable.
   * @param {string | undefined} [fields.description] The description of the tool. Falls back to the description on the Zod schema if not provided, or undefined if neither are provided.
   * @param {z.ZodType<T>} [fields.schema] The Zod schema for the input of the tool. Infers the Zod type from the input type of the runnable.
   * @returns {RunnableToolLike<z.ZodType<T>, RunOutput>} An instance of `RunnableToolLike` which is a runnable that can be used as a tool.
   */
  asTool(e) {
    return Bu(this, e);
  }
}
class Be extends K {
  static lc_name() {
    return "RunnableBinding";
  }
  constructor(e) {
    super(e), Object.defineProperty(this, "lc_namespace", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: ["langchain_core", "runnables"]
    }), Object.defineProperty(this, "lc_serializable", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: !0
    }), Object.defineProperty(this, "bound", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "config", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "kwargs", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "configFactories", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.bound = e.bound, this.kwargs = e.kwargs, this.config = e.config, this.configFactories = e.configFactories;
  }
  getName(e) {
    return this.bound.getName(e);
  }
  async _mergeConfig(...e) {
    const t = $n(this.config, ...e);
    return $n(t, ...this.configFactories ? await Promise.all(this.configFactories.map(async (r) => await r(t))) : []);
  }
  bind(e) {
    return new this.constructor({
      bound: this.bound,
      kwargs: { ...this.kwargs, ...e },
      config: this.config
    });
  }
  withConfig(e) {
    return new this.constructor({
      bound: this.bound,
      kwargs: this.kwargs,
      config: { ...this.config, ...e }
    });
  }
  withRetry(e) {
    return new this.constructor({
      bound: this.bound.withRetry(e),
      kwargs: this.kwargs,
      config: this.config
    });
  }
  async invoke(e, t) {
    return this.bound.invoke(e, await this._mergeConfig(j(t), this.kwargs));
  }
  async batch(e, t, r) {
    const n = Array.isArray(t) ? await Promise.all(t.map(async (i) => this._mergeConfig(j(i), this.kwargs))) : await this._mergeConfig(j(t), this.kwargs);
    return this.bound.batch(e, n, r);
  }
  async *_streamIterator(e, t) {
    yield* this.bound._streamIterator(e, await this._mergeConfig(j(t), this.kwargs));
  }
  async stream(e, t) {
    return this.bound.stream(e, await this._mergeConfig(j(t), this.kwargs));
  }
  async *transform(e, t) {
    yield* this.bound.transform(e, await this._mergeConfig(j(t), this.kwargs));
  }
  streamEvents(e, t, r) {
    const n = this, i = async function* () {
      yield* n.bound.streamEvents(e, {
        ...await n._mergeConfig(j(t), n.kwargs),
        version: t.version
      }, r);
    };
    return re.fromAsyncGenerator(i());
  }
  static isRunnableBinding(e) {
    return e.bound && K.isRunnable(e.bound);
  }
  /**
   * Bind lifecycle listeners to a Runnable, returning a new Runnable.
   * The Run object contains information about the run, including its id,
   * type, input, output, error, startTime, endTime, and any tags or metadata
   * added to the run.
   *
   * @param {Object} params - The object containing the callback functions.
   * @param {(run: Run) => void} params.onStart - Called before the runnable starts running, with the Run object.
   * @param {(run: Run) => void} params.onEnd - Called after the runnable finishes running, with the Run object.
   * @param {(run: Run) => void} params.onError - Called if the runnable throws an error, with the Run object.
   */
  withListeners({ onStart: e, onEnd: t, onError: r }) {
    return new Be({
      bound: this.bound,
      kwargs: this.kwargs,
      config: this.config,
      configFactories: [
        (n) => ({
          callbacks: [
            new _a({
              config: n,
              onStart: e,
              onEnd: t,
              onError: r
            })
          ]
        })
      ]
    });
  }
}
class or extends K {
  static lc_name() {
    return "RunnableEach";
  }
  constructor(e) {
    super(e), Object.defineProperty(this, "lc_serializable", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: !0
    }), Object.defineProperty(this, "lc_namespace", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: ["langchain_core", "runnables"]
    }), Object.defineProperty(this, "bound", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.bound = e.bound;
  }
  /**
   * Binds the runnable with the specified arguments.
   * @param kwargs The arguments to bind the runnable with.
   * @returns A new instance of the `RunnableEach` class that is bound with the specified arguments.
   */
  bind(e) {
    return new or({
      bound: this.bound.bind(e)
    });
  }
  /**
   * Invokes the runnable with the specified input and configuration.
   * @param input The input to invoke the runnable with.
   * @param config The configuration to invoke the runnable with.
   * @returns A promise that resolves to the output of the runnable.
   */
  async invoke(e, t) {
    return this._callWithConfig(this._invoke.bind(this), e, t);
  }
  /**
   * A helper method that is used to invoke the runnable with the specified input and configuration.
   * @param input The input to invoke the runnable with.
   * @param config The configuration to invoke the runnable with.
   * @returns A promise that resolves to the output of the runnable.
   */
  async _invoke(e, t, r) {
    return this.bound.batch(e, q(t, { callbacks: r?.getChild() }));
  }
  /**
   * Bind lifecycle listeners to a Runnable, returning a new Runnable.
   * The Run object contains information about the run, including its id,
   * type, input, output, error, startTime, endTime, and any tags or metadata
   * added to the run.
   *
   * @param {Object} params - The object containing the callback functions.
   * @param {(run: Run) => void} params.onStart - Called before the runnable starts running, with the Run object.
   * @param {(run: Run) => void} params.onEnd - Called after the runnable finishes running, with the Run object.
   * @param {(run: Run) => void} params.onError - Called if the runnable throws an error, with the Run object.
   */
  withListeners({ onStart: e, onEnd: t, onError: r }) {
    return new or({
      bound: this.bound.withListeners({ onStart: e, onEnd: t, onError: r })
    });
  }
}
class Lu extends Be {
  static lc_name() {
    return "RunnableRetry";
  }
  constructor(e) {
    super(e), Object.defineProperty(this, "lc_namespace", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: ["langchain_core", "runnables"]
    }), Object.defineProperty(this, "maxAttemptNumber", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: 3
    }), Object.defineProperty(this, "onFailedAttempt", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: () => {
      }
    }), this.maxAttemptNumber = e.maxAttemptNumber ?? this.maxAttemptNumber, this.onFailedAttempt = e.onFailedAttempt ?? this.onFailedAttempt;
  }
  _patchConfigForRetry(e, t, r) {
    const n = e > 1 ? `retry:attempt:${e}` : void 0;
    return q(t, { callbacks: r?.getChild(n) });
  }
  async _invoke(e, t, r) {
    return Vt((n) => super.invoke(e, this._patchConfigForRetry(n, t, r)), {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onFailedAttempt: (n) => this.onFailedAttempt(n, e),
      retries: Math.max(this.maxAttemptNumber - 1, 0),
      randomize: !0
    });
  }
  /**
   * Method that invokes the runnable with the specified input, run manager,
   * and config. It handles the retry logic by catching any errors and
   * recursively invoking itself with the updated config for the next retry
   * attempt.
   * @param input The input for the runnable.
   * @param runManager The run manager for the runnable.
   * @param config The config for the runnable.
   * @returns A promise that resolves to the output of the runnable.
   */
  async invoke(e, t) {
    return this._callWithConfig(this._invoke.bind(this), e, t);
  }
  async _batch(e, t, r, n) {
    const i = {};
    try {
      await Vt(async (s) => {
        const o = e.map((d, f) => f).filter((d) => i[d.toString()] === void 0 || // eslint-disable-next-line no-instanceof/no-instanceof
        i[d.toString()] instanceof Error), u = o.map((d) => e[d]), c = o.map((d) => this._patchConfigForRetry(s, t?.[d], r?.[d])), l = await super.batch(u, c, {
          ...n,
          returnExceptions: !0
        });
        let h;
        for (let d = 0; d < l.length; d += 1) {
          const f = l[d], p = o[d];
          f instanceof Error && h === void 0 && (h = f, h.input = u[d]), i[p.toString()] = f;
        }
        if (h)
          throw h;
        return l;
      }, {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onFailedAttempt: (s) => this.onFailedAttempt(s, s.input),
        retries: Math.max(this.maxAttemptNumber - 1, 0),
        randomize: !0
      });
    } catch (s) {
      if (n?.returnExceptions !== !0)
        throw s;
    }
    return Object.keys(i).sort((s, o) => parseInt(s, 10) - parseInt(o, 10)).map((s) => i[parseInt(s, 10)]);
  }
  async batch(e, t, r) {
    return this._batchWithConfig(this._batch.bind(this), e, t, r);
  }
}
class De extends K {
  static lc_name() {
    return "RunnableSequence";
  }
  constructor(e) {
    super(e), Object.defineProperty(this, "first", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "middle", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: []
    }), Object.defineProperty(this, "last", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "omitSequenceTags", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: !1
    }), Object.defineProperty(this, "lc_serializable", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: !0
    }), Object.defineProperty(this, "lc_namespace", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: ["langchain_core", "runnables"]
    }), this.first = e.first, this.middle = e.middle ?? this.middle, this.last = e.last, this.name = e.name, this.omitSequenceTags = e.omitSequenceTags ?? this.omitSequenceTags;
  }
  get steps() {
    return [this.first, ...this.middle, this.last];
  }
  async invoke(e, t) {
    const r = j(t), i = await (await de(r))?.handleChainStart(this.toJSON(), H(e, "input"), r.runId, void 0, void 0, void 0, r?.runName);
    delete r.runId;
    let s = e, o;
    try {
      const u = [this.first, ...this.middle];
      for (let c = 0; c < u.length; c += 1) {
        const h = u[c].invoke(s, q(r, {
          callbacks: i?.getChild(this.omitSequenceTags ? void 0 : `seq:step:${c + 1}`)
        }));
        s = await Me(h, t?.signal);
      }
      if (t?.signal?.aborted)
        throw new Error("Aborted");
      o = await this.last.invoke(s, q(r, {
        callbacks: i?.getChild(this.omitSequenceTags ? void 0 : `seq:step:${this.steps.length}`)
      }));
    } catch (u) {
      throw await i?.handleChainError(u), u;
    }
    return await i?.handleChainEnd(H(o, "output")), o;
  }
  async batch(e, t, r) {
    const n = this._getOptionsList(t ?? {}, e.length), i = await Promise.all(n.map(de)), s = await Promise.all(i.map(async (u, c) => {
      const l = await u?.handleChainStart(this.toJSON(), H(e[c], "input"), n[c].runId, void 0, void 0, void 0, n[c].runName);
      return delete n[c].runId, l;
    }));
    let o = e;
    try {
      for (let u = 0; u < this.steps.length; u += 1) {
        const l = this.steps[u].batch(o, s.map((h, d) => {
          const f = h?.getChild(this.omitSequenceTags ? void 0 : `seq:step:${u + 1}`);
          return q(n[d], { callbacks: f });
        }), r);
        o = await Me(l, n[0]?.signal);
      }
    } catch (u) {
      throw await Promise.all(s.map((c) => c?.handleChainError(u))), u;
    }
    return await Promise.all(s.map((u) => u?.handleChainEnd(H(o, "output")))), o;
  }
  async *_streamIterator(e, t) {
    const r = await de(t), { runId: n, ...i } = t ?? {}, s = await r?.handleChainStart(this.toJSON(), H(e, "input"), n, void 0, void 0, void 0, i?.runName), o = [this.first, ...this.middle, this.last];
    let u = !0, c;
    async function* l() {
      yield e;
    }
    try {
      let h = o[0].transform(l(), q(i, {
        callbacks: s?.getChild(this.omitSequenceTags ? void 0 : "seq:step:1")
      }));
      for (let d = 1; d < o.length; d += 1)
        h = await o[d].transform(h, q(i, {
          callbacks: s?.getChild(this.omitSequenceTags ? void 0 : `seq:step:${d + 1}`)
        }));
      for await (const d of h)
        if (t?.signal?.throwIfAborted(), yield d, u)
          if (c === void 0)
            c = d;
          else
            try {
              c = Oe(c, d);
            } catch {
              c = void 0, u = !1;
            }
    } catch (h) {
      throw await s?.handleChainError(h), h;
    }
    await s?.handleChainEnd(H(c, "output"));
  }
  getGraph(e) {
    const t = new hr();
    let r = null;
    return this.steps.forEach((n, i) => {
      const s = n.getGraph(e);
      i !== 0 && s.trimFirstNode(), i !== this.steps.length - 1 && s.trimLastNode(), t.extend(s);
      const o = s.firstNode();
      if (!o)
        throw new Error(`Runnable ${n} has no first node`);
      r && t.addEdge(r, o), r = s.lastNode();
    }), t;
  }
  pipe(e) {
    return De.isRunnableSequence(e) ? new De({
      first: this.first,
      middle: this.middle.concat([
        this.last,
        e.first,
        ...e.middle
      ]),
      last: e.last,
      name: this.name ?? e.name
    }) : new De({
      first: this.first,
      middle: [...this.middle, this.last],
      last: Ue(e),
      name: this.name
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static isRunnableSequence(e) {
    return Array.isArray(e.middle) && K.isRunnable(e);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static from([e, ...t], r) {
    let n = {};
    return typeof r == "string" ? n.name = r : r !== void 0 && (n = r), new De({
      ...n,
      first: Ue(e),
      middle: t.slice(0, -1).map(Ue),
      last: Ue(t[t.length - 1])
    });
  }
}
class $t extends K {
  static lc_name() {
    return "RunnableMap";
  }
  getStepsKeys() {
    return Object.keys(this.steps);
  }
  constructor(e) {
    super(e), Object.defineProperty(this, "lc_namespace", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: ["langchain_core", "runnables"]
    }), Object.defineProperty(this, "lc_serializable", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: !0
    }), Object.defineProperty(this, "steps", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.steps = {};
    for (const [t, r] of Object.entries(e.steps))
      this.steps[t] = Ue(r);
  }
  static from(e) {
    return new $t({ steps: e });
  }
  async invoke(e, t) {
    const r = j(t), i = await (await de(r))?.handleChainStart(this.toJSON(), {
      input: e
    }, r.runId, void 0, void 0, void 0, r?.runName);
    delete r.runId;
    const s = {};
    try {
      const o = Object.entries(this.steps).map(async ([u, c]) => {
        s[u] = await c.invoke(e, q(r, {
          callbacks: i?.getChild(`map:key:${u}`)
        }));
      });
      await Me(Promise.all(o), t?.signal);
    } catch (o) {
      throw await i?.handleChainError(o), o;
    }
    return await i?.handleChainEnd(s), s;
  }
  async *_transform(e, t, r) {
    const n = { ...this.steps }, i = ya(e, Object.keys(n).length), s = new Map(Object.entries(n).map(([o, u], c) => {
      const l = u.transform(i[c], q(r, {
        callbacks: t?.getChild(`map:key:${o}`)
      }));
      return [o, l.next().then((h) => ({ key: o, gen: l, result: h }))];
    }));
    for (; s.size; ) {
      const o = Promise.race(s.values()), { key: u, result: c, gen: l } = await Me(o, r?.signal);
      s.delete(u), c.done || (yield { [u]: c.value }, s.set(u, l.next().then((h) => ({ key: u, gen: l, result: h }))));
    }
  }
  transform(e, t) {
    return this._transformStreamWithConfig(e, this._transform.bind(this), t);
  }
  async stream(e, t) {
    async function* r() {
      yield e;
    }
    const n = j(t), i = new at({
      generator: this.transform(r(), n),
      config: n
    });
    return await i.setup, re.fromAsyncGenerator(i);
  }
}
class tn extends K {
  constructor(e) {
    if (super(e), Object.defineProperty(this, "lc_serializable", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: !1
    }), Object.defineProperty(this, "lc_namespace", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: ["langchain_core", "runnables"]
    }), Object.defineProperty(this, "func", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), !Yr(e.func))
      throw new Error("RunnableTraceable requires a function that is wrapped in traceable higher-order function");
    this.func = e.func;
  }
  async invoke(e, t) {
    const [r] = this._getOptionsList(t ?? {}, 1), n = await de(r), i = this.func(q(r, { callbacks: n }), e);
    return Me(i, r?.signal);
  }
  async *_streamIterator(e, t) {
    const [r] = this._getOptionsList(t ?? {}, 1), n = await this.invoke(e, t);
    if (Jr(n)) {
      for await (const i of n)
        r?.signal?.throwIfAborted(), yield i;
      return;
    }
    if (Mu(n)) {
      for (; ; ) {
        r?.signal?.throwIfAborted();
        const i = n.next();
        if (i.done)
          break;
        yield i.value;
      }
      return;
    }
    yield n;
  }
  static from(e) {
    return new tn({ func: e });
  }
}
function Du(a) {
  if (Yr(a))
    throw new Error("RunnableLambda requires a function that is not wrapped in traceable higher-order function. This shouldn't happen.");
}
class fr extends K {
  static lc_name() {
    return "RunnableLambda";
  }
  constructor(e) {
    if (Yr(e.func))
      return tn.from(e.func);
    super(e), Object.defineProperty(this, "lc_namespace", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: ["langchain_core", "runnables"]
    }), Object.defineProperty(this, "func", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Du(e.func), this.func = e.func;
  }
  static from(e) {
    return new fr({
      func: e
    });
  }
  async _invoke(e, t, r) {
    return new Promise((n, i) => {
      const s = q(t, {
        callbacks: r?.getChild(),
        recursionLimit: (t?.recursionLimit ?? Rr) - 1
      });
      $e.runWithConfig(nt(s), async () => {
        try {
          let o = await this.func(e, {
            ...s
          });
          if (o && K.isRunnable(o)) {
            if (t?.recursionLimit === 0)
              throw new Error("Recursion limit reached.");
            o = await o.invoke(e, {
              ...s,
              recursionLimit: (s.recursionLimit ?? Rr) - 1
            });
          } else if (Jr(o)) {
            let u;
            for await (const c of Wr(s, o))
              if (t?.signal?.throwIfAborted(), u === void 0)
                u = c;
              else
                try {
                  u = Oe(u, c);
                } catch {
                  u = c;
                }
            o = u;
          } else if (Hn(o)) {
            let u;
            for (const c of zn(s, o))
              if (t?.signal?.throwIfAborted(), u === void 0)
                u = c;
              else
                try {
                  u = Oe(u, c);
                } catch {
                  u = c;
                }
            o = u;
          }
          n(o);
        } catch (o) {
          i(o);
        }
      });
    });
  }
  async invoke(e, t) {
    return this._callWithConfig(this._invoke.bind(this), e, t);
  }
  async *_transform(e, t, r) {
    let n;
    for await (const o of e)
      if (n === void 0)
        n = o;
      else
        try {
          n = Oe(n, o);
        } catch {
          n = o;
        }
    const i = q(r, {
      callbacks: t?.getChild(),
      recursionLimit: (r?.recursionLimit ?? Rr) - 1
    }), s = await new Promise((o, u) => {
      $e.runWithConfig(nt(i), async () => {
        try {
          const c = await this.func(n, {
            ...i,
            config: i
          });
          o(c);
        } catch (c) {
          u(c);
        }
      });
    });
    if (s && K.isRunnable(s)) {
      if (r?.recursionLimit === 0)
        throw new Error("Recursion limit reached.");
      const o = await s.stream(n, i);
      for await (const u of o)
        yield u;
    } else if (Jr(s))
      for await (const o of Wr(i, s))
        r?.signal?.throwIfAborted(), yield o;
    else if (Hn(s))
      for (const o of zn(i, s))
        r?.signal?.throwIfAborted(), yield o;
    else
      yield s;
  }
  transform(e, t) {
    return this._transformStreamWithConfig(e, this._transform.bind(this), t);
  }
  async stream(e, t) {
    async function* r() {
      yield e;
    }
    const n = j(t), i = new at({
      generator: this.transform(r(), n),
      config: n
    });
    return await i.setup, re.fromAsyncGenerator(i);
  }
}
class Uu extends K {
  static lc_name() {
    return "RunnableWithFallbacks";
  }
  constructor(e) {
    super(e), Object.defineProperty(this, "lc_namespace", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: ["langchain_core", "runnables"]
    }), Object.defineProperty(this, "lc_serializable", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: !0
    }), Object.defineProperty(this, "runnable", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "fallbacks", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.runnable = e.runnable, this.fallbacks = e.fallbacks;
  }
  *runnables() {
    yield this.runnable;
    for (const e of this.fallbacks)
      yield e;
  }
  async invoke(e, t) {
    const r = j(t), n = await de(r), { runId: i, ...s } = r, o = await n?.handleChainStart(this.toJSON(), H(e, "input"), i, void 0, void 0, void 0, s?.runName), u = q(s, {
      callbacks: o?.getChild()
    });
    return await $e.runWithConfig(u, async () => {
      let l;
      for (const h of this.runnables()) {
        r?.signal?.throwIfAborted();
        try {
          const d = await h.invoke(e, u);
          return await o?.handleChainEnd(H(d, "output")), d;
        } catch (d) {
          l === void 0 && (l = d);
        }
      }
      throw l === void 0 ? new Error("No error stored at end of fallback.") : (await o?.handleChainError(l), l);
    });
  }
  async *_streamIterator(e, t) {
    const r = j(t), n = await de(r), { runId: i, ...s } = r, o = await n?.handleChainStart(this.toJSON(), H(e, "input"), i, void 0, void 0, void 0, s?.runName);
    let u, c;
    for (const h of this.runnables()) {
      r?.signal?.throwIfAborted();
      const d = q(s, {
        callbacks: o?.getChild()
      });
      try {
        const f = await h.stream(e, d);
        c = Wr(d, f);
        break;
      } catch (f) {
        u === void 0 && (u = f);
      }
    }
    if (c === void 0) {
      const h = u ?? new Error("No error stored at end of fallback.");
      throw await o?.handleChainError(h), h;
    }
    let l;
    try {
      for await (const h of c) {
        yield h;
        try {
          l = l === void 0 ? l : Oe(l, h);
        } catch {
          l = void 0;
        }
      }
    } catch (h) {
      throw await o?.handleChainError(h), h;
    }
    await o?.handleChainEnd(H(l, "output"));
  }
  async batch(e, t, r) {
    if (r?.returnExceptions)
      throw new Error("Not implemented.");
    const n = this._getOptionsList(t ?? {}, e.length), i = await Promise.all(n.map((u) => de(u))), s = await Promise.all(i.map(async (u, c) => {
      const l = await u?.handleChainStart(this.toJSON(), H(e[c], "input"), n[c].runId, void 0, void 0, void 0, n[c].runName);
      return delete n[c].runId, l;
    }));
    let o;
    for (const u of this.runnables()) {
      n[0].signal?.throwIfAborted();
      try {
        const c = await u.batch(e, s.map((l, h) => q(n[h], {
          callbacks: l?.getChild()
        })), r);
        return await Promise.all(s.map((l, h) => l?.handleChainEnd(H(c[h], "output")))), c;
      } catch (c) {
        o === void 0 && (o = c);
      }
    }
    throw o ? (await Promise.all(s.map((u) => u?.handleChainError(o))), o) : new Error("No error stored at end of fallbacks.");
  }
}
function Ue(a) {
  if (typeof a == "function")
    return new fr({ func: a });
  if (K.isRunnable(a))
    return a;
  if (!Array.isArray(a) && typeof a == "object") {
    const e = {};
    for (const [t, r] of Object.entries(a))
      e[t] = Ue(r);
    return new $t({
      steps: e
    });
  } else
    throw new Error(`Expected a Runnable, function or object.
Instead got an unsupported type.`);
}
class Fu extends K {
  static lc_name() {
    return "RunnableAssign";
  }
  constructor(e) {
    e instanceof $t && (e = { mapper: e }), super(e), Object.defineProperty(this, "lc_namespace", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: ["langchain_core", "runnables"]
    }), Object.defineProperty(this, "lc_serializable", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: !0
    }), Object.defineProperty(this, "mapper", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.mapper = e.mapper;
  }
  async invoke(e, t) {
    const r = await this.mapper.invoke(e, t);
    return {
      ...e,
      ...r
    };
  }
  async *_transform(e, t, r) {
    const n = this.mapper.getStepsKeys(), [i, s] = ya(e), o = this.mapper.transform(s, q(r, { callbacks: t?.getChild() })), u = o.next();
    for await (const c of i) {
      if (typeof c != "object" || Array.isArray(c))
        throw new Error(`RunnableAssign can only be used with objects as input, got ${typeof c}`);
      const l = Object.fromEntries(Object.entries(c).filter(([h]) => !n.includes(h)));
      Object.keys(l).length > 0 && (yield l);
    }
    yield (await u).value;
    for await (const c of o)
      yield c;
  }
  transform(e, t) {
    return this._transformStreamWithConfig(e, this._transform.bind(this), t);
  }
  async stream(e, t) {
    async function* r() {
      yield e;
    }
    const n = j(t), i = new at({
      generator: this.transform(r(), n),
      config: n
    });
    return await i.setup, re.fromAsyncGenerator(i);
  }
}
class Zu extends K {
  static lc_name() {
    return "RunnablePick";
  }
  constructor(e) {
    (typeof e == "string" || Array.isArray(e)) && (e = { keys: e }), super(e), Object.defineProperty(this, "lc_namespace", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: ["langchain_core", "runnables"]
    }), Object.defineProperty(this, "lc_serializable", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: !0
    }), Object.defineProperty(this, "keys", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.keys = e.keys;
  }
  async _pick(e) {
    if (typeof this.keys == "string")
      return e[this.keys];
    {
      const t = this.keys.map((r) => [r, e[r]]).filter((r) => r[1] !== void 0);
      return t.length === 0 ? void 0 : Object.fromEntries(t);
    }
  }
  async invoke(e, t) {
    return this._callWithConfig(this._pick.bind(this), e, t);
  }
  async *_transform(e) {
    for await (const t of e) {
      const r = await this._pick(t);
      r !== void 0 && (yield r);
    }
  }
  transform(e, t) {
    return this._transformStreamWithConfig(e, this._transform.bind(this), t);
  }
  async stream(e, t) {
    async function* r() {
      yield e;
    }
    const n = j(t), i = new at({
      generator: this.transform(r(), n),
      config: n
    });
    return await i.setup, re.fromAsyncGenerator(i);
  }
}
class qn extends Be {
  constructor(e) {
    const t = De.from([
      fr.from(async (r) => {
        let n;
        if (ei(r))
          try {
            n = await this.schema.parseAsync(r.args);
          } catch {
            throw new ti("Received tool input did not match expected schema", JSON.stringify(r.args));
          }
        else
          n = r;
        return n;
      }).withConfig({ runName: `${e.name}:parse_input` }),
      e.bound
    ]).withConfig({ runName: e.name });
    super({
      bound: t,
      config: e.config ?? {}
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "description", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "schema", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.name = e.name, this.description = e.description, this.schema = e.schema;
  }
  static lc_name() {
    return "RunnableToolLike";
  }
}
function Bu(a, e) {
  const t = e.name ?? a.getName(), r = e.description ?? e.schema?.description;
  return e.schema.constructor === pt.ZodString ? new qn({
    name: t,
    description: r,
    schema: pt.object({
      input: pt.string()
    }).transform((n) => n.input),
    bound: a
  }) : new qn({
    name: t,
    description: r,
    schema: e.schema,
    bound: a
  });
}
class Hu extends K {
  /**
   * Constructs a new `BaseRetriever` instance with optional configuration fields.
   *
   * @param fields - Optional input configuration that can include `callbacks`,
   *                 `tags`, `metadata`, and `verbose` settings for custom retriever behavior.
   */
  constructor(e) {
    super(e), Object.defineProperty(this, "callbacks", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "tags", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "metadata", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "verbose", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.callbacks = e?.callbacks, this.tags = e?.tags ?? [], this.metadata = e?.metadata ?? {}, this.verbose = e?.verbose ?? !1;
  }
  /**
   * TODO: This should be an abstract method, but we'd like to avoid breaking
   * changes to people currently using subclassed custom retrievers.
   * Change it on next major release.
   */
  /**
   * Placeholder method for retrieving relevant documents based on a query.
   *
   * This method is intended to be implemented by subclasses and will be
   * converted to an abstract method in the next major release. Currently, it
   * throws an error if not implemented, ensuring that custom retrievers define
   * the specific retrieval logic.
   *
   * @param _query - The query string used to search for relevant documents.
   * @param _callbacks - (optional) Callback manager for managing callbacks
   *                     during retrieval.
   * @returns A promise resolving to an array of `DocumentInterface` instances relevant to the query.
   * @throws {Error} Throws an error indicating the method is not implemented.
   */
  _getRelevantDocuments(e, t) {
    throw new Error("Not implemented!");
  }
  /**
   * Executes a retrieval operation.
   *
   * @param input - The query string used to search for relevant documents.
   * @param options - (optional) Configuration options for the retrieval run,
   *                  which may include callbacks, tags, and metadata.
   * @returns A promise that resolves to an array of `DocumentInterface` instances
   *          representing the most relevant documents to the query.
   */
  async invoke(e, t) {
    return this.getRelevantDocuments(e, j(t));
  }
  /**
   * @deprecated Use .invoke() instead. Will be removed in 0.3.0.
   *
   * Main method used to retrieve relevant documents. It takes a query
   * string and an optional configuration object, and returns a promise that
   * resolves to an array of `Document` objects. This method handles the
   * retrieval process, including starting and ending callbacks, and error
   * handling.
   * @param query The query string to retrieve relevant documents for.
   * @param config Optional configuration object for the retrieval process.
   * @returns A promise that resolves to an array of `Document` objects.
   */
  async getRelevantDocuments(e, t) {
    const r = j(us(t)), i = await (await ae.configure(r.callbacks, this.callbacks, r.tags, this.tags, r.metadata, this.metadata, { verbose: this.verbose }))?.handleRetrieverStart(this.toJSON(), e, r.runId, void 0, void 0, void 0, r.runName);
    try {
      const s = await this._getRelevantDocuments(e, i);
      return await i?.handleRetrieverEnd(s), s;
    } catch (s) {
      throw await i?.handleRetrieverError(s), s;
    }
  }
}
class Mr extends Hu {
  static lc_name() {
    return "VectorStoreRetriever";
  }
  get lc_namespace() {
    return ["langchain_core", "vectorstores"];
  }
  /**
   * Returns the type of vector store, as defined by the `vectorStore` instance.
   *
   * @returns {string} The vector store type.
   */
  _vectorstoreType() {
    return this.vectorStore._vectorstoreType();
  }
  /**
   * Initializes a new instance of `VectorStoreRetriever` with the specified configuration.
   *
   * This constructor configures the retriever to interact with a given `VectorStore`
   * and supports different retrieval strategies, including similarity search and maximal
   * marginal relevance (MMR) search. Various options allow customization of the number
   * of documents retrieved per query, filtering based on conditions, and fine-tuning
   * MMR-specific parameters.
   *
   * @param fields - Configuration options for setting up the retriever:
   *
   *   - `vectorStore` (required): The `VectorStore` instance implementing `VectorStoreInterface`
   *     that will be used to store and retrieve document embeddings. This is the core component
   *     of the retriever, enabling vector-based similarity and MMR searches.
   *
   *   - `k` (optional): Specifies the number of documents to retrieve per search query. If not
   *     provided, defaults to 4. This count determines the number of most relevant documents returned
   *     for each search operation, balancing performance with comprehensiveness.
   *
   *   - `searchType` (optional): Defines the search approach used by the retriever, allowing for
   *     flexibility between two methods:
   *       - `"similarity"` (default): A similarity-based search, retrieving documents with high vector
   *         similarity to the query. This type prioritizes relevance and is often used when diversity
   *         among results is less critical.
   *       - `"mmr"`: Maximal Marginal Relevance search, which combines relevance with diversity. MMR
   *         is useful for scenarios where varied content is essential, as it selects results that
   *         both match the query and introduce content diversity.
   *
   *   - `filter` (optional): A filter of type `FilterType`, defined by the vector store, that allows
   *     for refined and targeted search results. This filter applies specified conditions to limit
   *     which documents are eligible for retrieval, offering control over the scope of results.
   *
   *   - `searchKwargs` (optional, applicable only if `searchType` is `"mmr"`): Additional settings
   *     for configuring MMR-specific behavior. These parameters allow further tuning of the MMR
   *     search process:
   *       - `fetchK`: The initial number of documents fetched from the vector store before the MMR
   *         algorithm is applied. Fetching a larger set enables the algorithm to select a more
   *         diverse subset of documents.
   *       - `lambda`: A parameter controlling the relevance-diversity balance, where 0 emphasizes
   *         diversity and 1 prioritizes relevance. Intermediate values provide a blend of the two,
   *         allowing customization based on the importance of content variety relative to query relevance.
   */
  constructor(e) {
    super(e), Object.defineProperty(this, "vectorStore", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "k", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: 4
    }), Object.defineProperty(this, "searchType", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "similarity"
    }), Object.defineProperty(this, "searchKwargs", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "filter", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.vectorStore = e.vectorStore, this.k = e.k ?? this.k, this.searchType = e.searchType ?? this.searchType, this.filter = e.filter, e.searchType === "mmr" && (this.searchKwargs = e.searchKwargs);
  }
  /**
   * Retrieves relevant documents based on the specified query, using either
   * similarity or maximal marginal relevance (MMR) search.
   *
   * If `searchType` is set to `"mmr"`, performs an MMR search to balance
   * similarity and diversity among results. If `searchType` is `"similarity"`,
   * retrieves results purely based on similarity to the query.
   *
   * @param query - The query string used to find relevant documents.
   * @param runManager - Optional callback manager for tracking retrieval progress.
   * @returns A promise that resolves to an array of `DocumentInterface` instances
   *          representing the most relevant documents to the query.
   * @throws {Error} Throws an error if MMR search is requested but not supported
   *                 by the vector store.
   * @protected
   */
  async _getRelevantDocuments(e, t) {
    if (this.searchType === "mmr") {
      if (typeof this.vectorStore.maxMarginalRelevanceSearch != "function")
        throw new Error(`The vector store backing this retriever, ${this._vectorstoreType()} does not support max marginal relevance search.`);
      return this.vectorStore.maxMarginalRelevanceSearch(e, {
        k: this.k,
        filter: this.filter,
        ...this.searchKwargs
      }, t?.getChild("vectorstore"));
    }
    return this.vectorStore.similaritySearch(e, this.k, this.filter, t?.getChild("vectorstore"));
  }
  /**
   * Adds an array of documents to the vector store, embedding them as part of
   * the storage process.
   *
   * This method delegates document embedding and storage to the `addDocuments`
   * method of the underlying vector store.
   *
   * @param documents - An array of documents to embed and add to the vector store.
   * @param options - Optional settings to customize document addition.
   * @returns A promise that resolves to an array of document IDs or `void`,
   *          depending on the vector store's implementation.
   */
  async addDocuments(e, t) {
    return this.vectorStore.addDocuments(e, t);
  }
}
class zu extends He {
  /**
   * Initializes a new vector store with embeddings and database configuration.
   *
   * @param embeddings - Instance of `EmbeddingsInterface` used to embed queries.
   * @param dbConfig - Configuration settings for the database or storage system.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(e, t) {
    super(t), Object.defineProperty(this, "lc_namespace", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: ["langchain", "vectorstores", this._vectorstoreType()]
    }), Object.defineProperty(this, "embeddings", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.embeddings = e;
  }
  /**
   * Deletes documents from the vector store based on the specified parameters.
   *
   * @param _params - Flexible key-value pairs defining conditions for document deletion.
   * @returns A promise that resolves once the deletion is complete.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async delete(e) {
    throw new Error("Not implemented.");
  }
  /**
   * Searches for documents similar to a text query by embedding the query and
   * performing a similarity search on the resulting vector.
   *
   * @param query - Text query for finding similar documents.
   * @param k - Number of similar results to return. Defaults to 4.
   * @param filter - Optional filter based on `FilterType`.
   * @param _callbacks - Optional callbacks for monitoring search progress
   * @returns A promise resolving to an array of `DocumentInterface` instances representing similar documents.
   */
  async similaritySearch(e, t = 4, r = void 0, n = void 0) {
    return (await this.similaritySearchVectorWithScore(await this.embeddings.embedQuery(e), t, r)).map((s) => s[0]);
  }
  /**
   * Searches for documents similar to a text query by embedding the query,
   * and returns results with similarity scores.
   *
   * @param query - Text query for finding similar documents.
   * @param k - Number of similar results to return. Defaults to 4.
   * @param filter - Optional filter based on `FilterType`.
   * @param _callbacks - Optional callbacks for monitoring search progress
   * @returns A promise resolving to an array of tuples, each containing a
   *          document and its similarity score.
   */
  async similaritySearchWithScore(e, t = 4, r = void 0, n = void 0) {
    return this.similaritySearchVectorWithScore(await this.embeddings.embedQuery(e), t, r);
  }
  /**
   * Creates a `VectorStore` instance from an array of text strings and optional
   * metadata, using the specified embeddings and database configuration.
   *
   * Subclasses must implement this method to define how text and metadata
   * are embedded and stored in the vector store. Throws an error if not overridden.
   *
   * @param _texts - Array of strings representing the text documents to be stored.
   * @param _metadatas - Metadata for the texts, either as an array (one for each text)
   *                     or a single object (applied to all texts).
   * @param _embeddings - Instance of `EmbeddingsInterface` to embed the texts.
   * @param _dbConfig - Database configuration settings.
   * @returns A promise that resolves to a new `VectorStore` instance.
   * @throws {Error} Throws an error if this method is not overridden by a subclass.
   */
  static fromTexts(e, t, r, n) {
    throw new Error("the Langchain vectorstore implementation you are using forgot to override this, please report a bug");
  }
  /**
   * Creates a `VectorStore` instance from an array of documents, using the specified
   * embeddings and database configuration.
   *
   * Subclasses must implement this method to define how documents are embedded
   * and stored. Throws an error if not overridden.
   *
   * @param _docs - Array of `DocumentInterface` instances representing the documents to be stored.
   * @param _embeddings - Instance of `EmbeddingsInterface` to embed the documents.
   * @param _dbConfig - Database configuration settings.
   * @returns A promise that resolves to a new `VectorStore` instance.
   * @throws {Error} Throws an error if this method is not overridden by a subclass.
   */
  static fromDocuments(e, t, r) {
    throw new Error("the Langchain vectorstore implementation you are using forgot to override this, please report a bug");
  }
  /**
   * Creates a `VectorStoreRetriever` instance with flexible configuration options.
   *
   * @param kOrFields
   *    - If a number is provided, it sets the `k` parameter (number of items to retrieve).
   *    - If an object is provided, it should contain various configuration options.
   * @param filter
   *    - Optional filter criteria to limit the items retrieved based on the specified filter type.
   * @param callbacks
   *    - Optional callbacks that may be triggered at specific stages of the retrieval process.
   * @param tags
   *    - Tags to categorize or label the `VectorStoreRetriever`. Defaults to an empty array if not provided.
   * @param metadata
   *    - Additional metadata as key-value pairs to add contextual information for the retrieval process.
   * @param verbose
   *    - If `true`, enables detailed logging for the retrieval process. Defaults to `false`.
   *
   * @returns
   *    - A configured `VectorStoreRetriever` instance based on the provided parameters.
   *
   * @example
   * Basic usage with a `k` value:
   * ```typescript
   * const retriever = myVectorStore.asRetriever(5);
   * ```
   *
   * Usage with a configuration object:
   * ```typescript
   * const retriever = myVectorStore.asRetriever({
   *   k: 10,
   *   filter: myFilter,
   *   tags: ['example', 'test'],
   *   verbose: true,
   *   searchType: 'mmr',
   *   searchKwargs: { alpha: 0.5 },
   * });
   * ```
   */
  asRetriever(e, t, r, n, i, s) {
    if (typeof e == "number")
      return new Mr({
        vectorStore: this,
        k: e,
        filter: t,
        tags: [...n ?? [], this._vectorstoreType()],
        metadata: i,
        verbose: s,
        callbacks: r
      });
    {
      const o = {
        vectorStore: this,
        k: e?.k,
        filter: e?.filter,
        tags: [...e?.tags ?? [], this._vectorstoreType()],
        metadata: e?.metadata,
        verbose: e?.verbose,
        callbacks: e?.callbacks,
        searchType: e?.searchType
      };
      return e?.searchType === "mmr" ? new Mr({
        ...o,
        searchKwargs: e.searchKwargs
      }) : new Mr({ ...o });
    }
  }
}
class lt {
  constructor(e) {
    Object.defineProperty(this, "pageContent", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "metadata", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "id", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.pageContent = e.pageContent !== void 0 ? e.pageContent.toString() : "", this.metadata = e.metadata ?? {}, this.id = e.id;
  }
}
function qu(a, e) {
  let t = 0, r = 0, n = 0;
  for (let i = 0; i < a.length; i++)
    t += a[i] * e[i], r += a[i] * a[i], n += e[i] * e[i];
  return t / (Math.sqrt(r) * Math.sqrt(n));
}
function Vu(a, e) {
  let t = 0, r = 0, n = 0;
  for (let i = 0; i < a.length; i++)
    t += a[i] * e[i], r += a[i] * a[i], n += e[i] * e[i];
  return t / (Math.sqrt(r) * Math.sqrt(n));
}
function Gu(a, e, t) {
  if (a.length === 0 || a[0].length === 0 || e.length === 0 || e[0].length === 0)
    return [[]];
  if (a[0].length !== e[0].length)
    throw new Error(`Number of columns in X and Y must be the same. X has shape ${[
      a.length,
      a[0].length
    ]} and Y has shape ${[e.length, e[0].length]}.`);
  return a.map((r) => e.map((n) => t(r, n)).map((n) => Number.isNaN(n) ? 0 : n));
}
function Vn(a, e) {
  return Gu(a, e, Vu);
}
function Ju(a, e, t = 0.5, r = 4) {
  if (Math.min(r, e.length) <= 0)
    return [];
  const n = Array.isArray(a[0]) ? a : [a], i = Vn(n, e)[0], s = Wu(i).maxIndex, o = [e[s]], u = [s];
  for (; u.length < Math.min(r, e.length); ) {
    let c = -1 / 0, l = -1;
    const h = Vn(e, o);
    i.forEach((d, f) => {
      if (u.includes(f))
        return;
      const p = Math.max(...h[f]), T = t * d - (1 - t) * p;
      T > c && (c = T, l = f);
    }), o.push(e[l]), u.push(l);
  }
  return u;
}
function Wu(a) {
  if (a.length === 0)
    return {
      maxIndex: -1,
      maxValue: NaN
    };
  let e = a[0], t = 0;
  for (let r = 1; r < a.length; r += 1)
    a[r] > e && (t = r, e = a[r]);
  return { maxIndex: t, maxValue: e };
}
class rn extends zu {
  _vectorstoreType() {
    return "memory";
  }
  constructor(e, { similarity: t, ...r } = {}) {
    super(e, r), Object.defineProperty(this, "memoryVectors", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: []
    }), Object.defineProperty(this, "similarity", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.similarity = t ?? qu;
  }
  /**
   * Method to add documents to the memory vector store. It extracts the
   * text from each document, generates embeddings for them, and adds the
   * resulting vectors to the store.
   * @param documents Array of `Document` instances to be added to the store.
   * @returns Promise that resolves when all documents have been added.
   */
  async addDocuments(e) {
    const t = e.map(({ pageContent: r }) => r);
    return this.addVectors(await this.embeddings.embedDocuments(t), e);
  }
  /**
   * Method to add vectors to the memory vector store. It creates
   * `MemoryVector` instances for each vector and document pair and adds
   * them to the store.
   * @param vectors Array of vectors to be added to the store.
   * @param documents Array of `Document` instances corresponding to the vectors.
   * @returns Promise that resolves when all vectors have been added.
   */
  async addVectors(e, t) {
    const r = e.map((n, i) => ({
      content: t[i].pageContent,
      embedding: n,
      metadata: t[i].metadata,
      id: t[i].id
    }));
    this.memoryVectors = this.memoryVectors.concat(r);
  }
  async _queryVectors(e, t, r) {
    const n = (s) => {
      if (!r)
        return !0;
      const o = new lt({
        metadata: s.metadata,
        pageContent: s.content,
        id: s.id
      });
      return r(o);
    };
    return this.memoryVectors.filter(n).map((s, o) => ({
      similarity: this.similarity(e, s.embedding),
      index: o,
      metadata: s.metadata,
      content: s.content,
      embedding: s.embedding,
      id: s.id
    })).sort((s, o) => s.similarity > o.similarity ? -1 : 0).slice(0, t);
  }
  /**
   * Method to perform a similarity search in the memory vector store. It
   * calculates the similarity between the query vector and each vector in
   * the store, sorts the results by similarity, and returns the top `k`
   * results along with their scores.
   * @param query Query vector to compare against the vectors in the store.
   * @param k Number of top results to return.
   * @param filter Optional filter function to apply to the vectors before performing the search.
   * @returns Promise that resolves with an array of tuples, each containing a `Document` and its similarity score.
   */
  async similaritySearchVectorWithScore(e, t, r) {
    return (await this._queryVectors(e, t, r)).map((s) => [
      new lt({
        metadata: s.metadata,
        pageContent: s.content,
        id: s.id
      }),
      s.similarity
    ]);
  }
  async maxMarginalRelevanceSearch(e, t) {
    const r = await this.embeddings.embedQuery(e), n = await this._queryVectors(r, t.fetchK ?? 20, t.filter), i = n.map((o) => o.embedding);
    return Ju(r, i, t.lambda, t.k).map((o) => new lt({
      metadata: n[o].metadata,
      pageContent: n[o].content,
      id: n[o].id
    }));
  }
  /**
   * Static method to create a `MemoryVectorStore` instance from an array of
   * texts. It creates a `Document` for each text and metadata pair, and
   * adds them to the store.
   * @param texts Array of texts to be added to the store.
   * @param metadatas Array or single object of metadata corresponding to the texts.
   * @param embeddings `Embeddings` instance used to generate embeddings for the texts.
   * @param dbConfig Optional `MemoryVectorStoreArgs` to configure the `MemoryVectorStore` instance.
   * @returns Promise that resolves with a new `MemoryVectorStore` instance.
   */
  static async fromTexts(e, t, r, n) {
    const i = [];
    for (let s = 0; s < e.length; s += 1) {
      const o = Array.isArray(t) ? t[s] : t, u = new lt({
        pageContent: e[s],
        metadata: o
      });
      i.push(u);
    }
    return rn.fromDocuments(i, r, n);
  }
  /**
   * Static method to create a `MemoryVectorStore` instance from an array of
   * `Document` instances. It adds the documents to the store.
   * @param docs Array of `Document` instances to be added to the store.
   * @param embeddings `Embeddings` instance used to generate embeddings for the documents.
   * @param dbConfig Optional `MemoryVectorStoreArgs` to configure the `MemoryVectorStore` instance.
   * @returns Promise that resolves with a new `MemoryVectorStore` instance.
   */
  static async fromDocuments(e, t, r) {
    const n = new this(t, r);
    return await n.addDocuments(e), n;
  }
  /**
   * Static method to create a `MemoryVectorStore` instance from an existing
   * index. It creates a new `MemoryVectorStore` instance without adding any
   * documents or vectors.
   * @param embeddings `Embeddings` instance used to generate embeddings for the documents.
   * @param dbConfig Optional `MemoryVectorStoreArgs` to configure the `MemoryVectorStore` instance.
   * @returns Promise that resolves with a new `MemoryVectorStore` instance.
   */
  static async fromExistingIndex(e, t) {
    return new this(e, t);
  }
}
class Ta extends rn {
  static async fromJSON(e, t) {
    const r = JSON.parse(e);
    if (r.lc == null || r.type !== "constructor" || !Array.isArray(r.id))
      throw new Error("invalid serialization format");
    const n = new Ta(t);
    if (r.kwargs?.docs == null)
      throw new Error("no documents in serialization");
    {
      const i = [], s = [];
      for (const o of r.kwargs.docs)
        o.pageContent && o.vector && (i.push(new lt({
          pageContent: o.pageContent,
          metadata: o.metadata || {}
        })), s.push(o.vector));
      n.addVectors(s, i);
    }
    return n;
  }
}
export {
  Ta as RestorableMemoryVectorStore
};
//# sourceMappingURL=RestorableMemoryVectorStore.js.map
