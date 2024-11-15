(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const SYMBOL_OBSERVABLE = Symbol("Observable");
const SYMBOL_OBSERVABLE_FROZEN = Symbol("Observable.Frozen");
const SYMBOL_OBSERVABLE_READABLE = Symbol("Observable.Readable");
const SYMBOL_OBSERVABLE_WRITABLE = Symbol("Observable.Writable");
const SYMBOL_STORE = Symbol("Store");
const SYMBOL_STORE_KEYS = Symbol("Store.Keys");
const SYMBOL_STORE_OBSERVABLE = Symbol("Store.Observable");
const SYMBOL_STORE_TARGET = Symbol("Store.Target");
const SYMBOL_STORE_VALUES = Symbol("Store.Values");
const SYMBOL_STORE_UNTRACKED = Symbol("Store.Untracked");
const SYMBOL_SUSPENSE$1 = Symbol("Suspense");
const SYMBOL_UNCACHED = Symbol("Uncached");
const SYMBOL_UNTRACKED = Symbol("Untracked");
const SYMBOL_UNTRACKED_UNWRAPPED = Symbol("Untracked.Unwrapped");
const castArray$1 = (value) => {
  return isArray$1(value) ? value : [value];
};
const castError$1 = (error) => {
  if (error instanceof Error)
    return error;
  if (typeof error === "string")
    return new Error(error);
  return new Error("Unknown error");
};
const { is } = Object;
const { isArray: isArray$1 } = Array;
const isFunction$1 = (value) => {
  return typeof value === "function";
};
const isObject$1 = (value) => {
  return value !== null && typeof value === "object";
};
const isSymbol = (value) => {
  return typeof value === "symbol";
};
const noop$1 = () => {
  return;
};
const nope = () => {
  return false;
};
function frozenFunction() {
  if (arguments.length) {
    throw new Error("A readonly Observable can not be updated");
  } else {
    return this;
  }
}
function readableFunction() {
  if (arguments.length) {
    throw new Error("A readonly Observable can not be updated");
  } else {
    return this.get();
  }
}
function writableFunction(fn) {
  if (arguments.length) {
    if (isFunction$1(fn)) {
      return this.update(fn);
    } else {
      return this.set(fn);
    }
  } else {
    return this.get();
  }
}
const frozen = (value) => {
  const fn = frozenFunction.bind(value);
  fn[SYMBOL_OBSERVABLE] = true;
  fn[SYMBOL_OBSERVABLE_FROZEN] = true;
  return fn;
};
const readable = (value) => {
  const fn = readableFunction.bind(value);
  fn[SYMBOL_OBSERVABLE] = true;
  fn[SYMBOL_OBSERVABLE_READABLE] = value;
  return fn;
};
const writable = (value) => {
  const fn = writableFunction.bind(value);
  fn[SYMBOL_OBSERVABLE] = true;
  fn[SYMBOL_OBSERVABLE_WRITABLE] = value;
  return fn;
};
const DIRTY_NO = 0;
const DIRTY_MAYBE_NO = 1;
const DIRTY_MAYBE_YES = 2;
const DIRTY_YES = 3;
frozen(false);
frozen(true);
const UNAVAILABLE = new Proxy({}, new Proxy({}, { get() {
  throw new Error("Unavailable value");
} }));
const UNINITIALIZED = function() {
};
const lazyArrayEachRight = (arr, fn) => {
  if (arr instanceof Array) {
    for (let i = arr.length - 1; i >= 0; i--) {
      fn(arr[i]);
    }
  } else if (arr) {
    fn(arr);
  }
};
const lazyArrayPush = (obj, key, value) => {
  const arr = obj[key];
  if (arr instanceof Array) {
    arr.push(value);
  } else if (arr) {
    obj[key] = [arr, value];
  } else {
    obj[key] = value;
  }
};
const lazySetAdd = (obj, key, value) => {
  const set = obj[key];
  if (set instanceof Set) {
    set.add(value);
  } else if (set) {
    if (value !== set) {
      const s = /* @__PURE__ */ new Set();
      s.add(set);
      s.add(value);
      obj[key] = s;
    }
  } else {
    obj[key] = value;
  }
};
const lazySetDelete = (obj, key, value) => {
  const set = obj[key];
  if (set instanceof Set) {
    set.delete(value);
  } else if (set === value) {
    obj[key] = void 0;
  }
};
const lazySetEach = (set, fn) => {
  if (set instanceof Set) {
    for (const value of set) {
      fn(value);
    }
  } else if (set) {
    fn(set);
  }
};
const onCleanup = (cleanup2) => cleanup2.call(cleanup2);
const onDispose = (owner) => owner.dispose(true);
class Owner {
  constructor() {
    this.disposed = false;
    this.cleanups = void 0;
    this.errorHandler = void 0;
    this.contexts = void 0;
    this.observers = void 0;
    this.roots = void 0;
    this.suspenses = void 0;
  }
  /* API */
  catch(error, silent) {
    var _a2;
    const { errorHandler } = this;
    if (errorHandler) {
      errorHandler(error);
      return true;
    } else {
      if ((_a2 = this.parent) == null ? void 0 : _a2.catch(error, true))
        return true;
      if (silent)
        return false;
      throw error;
    }
  }
  dispose(deep) {
    lazyArrayEachRight(this.contexts, onDispose);
    lazyArrayEachRight(this.observers, onDispose);
    lazyArrayEachRight(this.suspenses, onDispose);
    lazyArrayEachRight(this.cleanups, onCleanup);
    this.cleanups = void 0;
    this.disposed = deep;
    this.errorHandler = void 0;
    this.observers = void 0;
    this.suspenses = void 0;
  }
  get(symbol) {
    var _a2;
    return (_a2 = this.context) == null ? void 0 : _a2[symbol];
  }
  wrap(fn, owner, observer) {
    const ownerPrev = OWNER;
    const observerPrev = OBSERVER;
    setOwner(owner);
    setObserver(observer);
    try {
      return fn();
    } catch (error) {
      this.catch(castError$1(error), false);
      return UNAVAILABLE;
    } finally {
      setOwner(ownerPrev);
      setObserver(observerPrev);
    }
  }
}
class SuperRoot extends Owner {
  constructor() {
    super(...arguments);
    this.context = {};
  }
}
let SUPER_OWNER = new SuperRoot();
let OBSERVER;
let OWNER = SUPER_OWNER;
const setObserver = (value) => OBSERVER = value;
const setOwner = (value) => OWNER = value;
let Scheduler$2 = class Scheduler {
  constructor() {
    this.waiting = [];
    this.counter = 0;
    this.locked = false;
    this.flush = () => {
      if (this.locked)
        return;
      if (this.counter)
        return;
      if (!this.waiting.length)
        return;
      try {
        this.locked = true;
        while (true) {
          const queue = this.waiting;
          if (!queue.length)
            break;
          this.waiting = [];
          for (let i = 0, l = queue.length; i < l; i++) {
            queue[i].update();
          }
        }
      } finally {
        this.locked = false;
      }
    };
    this.wrap = (fn) => {
      this.counter += 1;
      fn();
      this.counter -= 1;
      this.flush();
    };
    this.schedule = (observer) => {
      this.waiting.push(observer);
    };
  }
};
const SchedulerSync = new Scheduler$2();
class Observable {
  /* CONSTRUCTOR */
  constructor(value, options2, parent) {
    this.observers = /* @__PURE__ */ new Set();
    this.value = value;
    if (parent) {
      this.parent = parent;
    }
    if ((options2 == null ? void 0 : options2.equals) !== void 0) {
      this.equals = options2.equals || nope;
    }
  }
  /* API */
  get() {
    var _a2, _b2;
    if (!((_a2 = this.parent) == null ? void 0 : _a2.disposed)) {
      (_b2 = this.parent) == null ? void 0 : _b2.update();
      OBSERVER == null ? void 0 : OBSERVER.observables.link(this);
    }
    return this.value;
  }
  set(value) {
    const equals = this.equals || is;
    const fresh = this.value === UNINITIALIZED || !equals(value, this.value);
    if (!fresh)
      return value;
    this.value = value;
    SchedulerSync.counter += 1;
    this.stale(DIRTY_YES);
    SchedulerSync.counter -= 1;
    SchedulerSync.flush();
    return value;
  }
  stale(status) {
    for (const observer of this.observers) {
      if (observer.status !== DIRTY_MAYBE_NO || observer.observables.has(this)) {
        if (observer.sync) {
          observer.status = Math.max(observer.status, status);
          SchedulerSync.schedule(observer);
        } else {
          observer.stale(status);
        }
      }
    }
  }
  update(fn) {
    const value = fn(this.value);
    return this.set(value);
  }
}
class ObservablesArray {
  /* CONSTRUCTOR */
  constructor(observer) {
    this.observer = observer;
    this.observables = [];
    this.observablesIndex = 0;
  }
  /* API */
  dispose(deep) {
    if (deep) {
      const { observer, observables } = this;
      for (let i = 0; i < observables.length; i++) {
        observables[i].observers.delete(observer);
      }
    }
    this.observablesIndex = 0;
  }
  postdispose() {
    const { observer, observables, observablesIndex } = this;
    const observablesLength = observables.length;
    if (observablesIndex < observablesLength) {
      for (let i = observablesIndex; i < observablesLength; i++) {
        observables[i].observers.delete(observer);
      }
      observables.length = observablesIndex;
    }
  }
  empty() {
    return !this.observables.length;
  }
  has(observable2) {
    const index = this.observables.indexOf(observable2);
    return index >= 0 && index < this.observablesIndex;
  }
  link(observable2) {
    const { observer, observables, observablesIndex } = this;
    const observablesLength = observables.length;
    if (observablesLength > 0) {
      if (observables[observablesIndex] === observable2) {
        this.observablesIndex += 1;
        return;
      }
      const index = observables.indexOf(observable2);
      if (index >= 0 && index < observablesIndex) {
        return;
      }
      if (observablesIndex < observablesLength - 1) {
        this.postdispose();
      } else if (observablesIndex === observablesLength - 1) {
        observables[observablesIndex].observers.delete(observer);
      }
    }
    observable2.observers.add(observer);
    observables[this.observablesIndex++] = observable2;
    if (observablesIndex === 128) {
      observer.observables = new ObservablesSet(observer, observables);
    }
  }
  update() {
    var _a2;
    const { observables } = this;
    for (let i = 0, l = observables.length; i < l; i++) {
      (_a2 = observables[i].parent) == null ? void 0 : _a2.update();
    }
  }
}
class ObservablesSet {
  /* CONSTRUCTOR */
  constructor(observer, observables) {
    this.observer = observer;
    this.observables = new Set(observables);
  }
  /* API */
  dispose(deep) {
    for (const observable2 of this.observables) {
      observable2.observers.delete(this.observer);
    }
  }
  postdispose() {
    return;
  }
  empty() {
    return !this.observables.size;
  }
  has(observable2) {
    return this.observables.has(observable2);
  }
  link(observable2) {
    const { observer, observables } = this;
    const sizePrev = observables.size;
    observable2.observers.add(observer);
    const sizeNext = observables.size;
    if (sizePrev === sizeNext)
      return;
    observables.add(observable2);
  }
  update() {
    var _a2;
    for (const observable2 of this.observables) {
      (_a2 = observable2.parent) == null ? void 0 : _a2.update();
    }
  }
}
class Observer extends Owner {
  /* CONSTRUCTOR */
  constructor() {
    super();
    this.parent = OWNER;
    this.context = OWNER.context;
    this.status = DIRTY_YES;
    this.observables = new ObservablesArray(this);
    if (OWNER !== SUPER_OWNER) {
      lazyArrayPush(this.parent, "observers", this);
    }
  }
  /* API */
  dispose(deep) {
    this.observables.dispose(deep);
    super.dispose(deep);
  }
  refresh(fn) {
    this.dispose(false);
    this.status = DIRTY_MAYBE_NO;
    try {
      return this.wrap(fn, this, this);
    } finally {
      this.observables.postdispose();
    }
  }
  run() {
    throw new Error("Abstract method");
  }
  stale(status) {
    throw new Error("Abstract method");
  }
  update() {
    if (this.disposed)
      return;
    if (this.status === DIRTY_MAYBE_YES) {
      this.observables.update();
    }
    if (this.status === DIRTY_YES) {
      this.status = DIRTY_MAYBE_NO;
      this.run();
      if (this.status === DIRTY_MAYBE_NO) {
        this.status = DIRTY_NO;
      } else {
        this.update();
      }
    } else {
      this.status = DIRTY_NO;
    }
  }
}
const cleanup = (fn) => {
  lazyArrayPush(OWNER, "cleanups", fn);
};
class Context extends Owner {
  /* CONSTRUCTOR */
  constructor(context2) {
    super();
    this.parent = OWNER;
    this.context = { ...OWNER.context, ...context2 };
    lazyArrayPush(this.parent, "contexts", this);
  }
  /* API */
  wrap(fn) {
    return super.wrap(fn, this, void 0);
  }
}
function context(symbolOrContext, fn) {
  if (isSymbol(symbolOrContext)) {
    return OWNER.context[symbolOrContext];
  } else {
    return new Context(symbolOrContext).wrap(fn || noop$1);
  }
}
class Scheduler2 {
  constructor() {
    this.waiting = [];
    this.locked = false;
    this.queued = false;
    this.flush = () => {
      if (this.locked)
        return;
      if (!this.waiting.length)
        return;
      try {
        this.locked = true;
        while (true) {
          const queue = this.waiting;
          if (!queue.length)
            break;
          this.waiting = [];
          for (let i = 0, l = queue.length; i < l; i++) {
            queue[i].update();
          }
        }
      } finally {
        this.locked = false;
      }
    };
    this.queue = () => {
      if (this.queued)
        return;
      this.queued = true;
      this.resolve();
    };
    this.resolve = () => {
      queueMicrotask(() => {
        queueMicrotask(() => {
          {
            this.queued = false;
            this.flush();
          }
        });
      });
    };
    this.schedule = (effect2) => {
      this.waiting.push(effect2);
      this.queue();
    };
  }
}
const Scheduler$1 = new Scheduler2();
class Effect extends Observer {
  /* CONSTRUCTOR */
  constructor(fn, options2) {
    super();
    this.fn = fn;
    if ((options2 == null ? void 0 : options2.suspense) !== false) {
      const suspense = this.get(SYMBOL_SUSPENSE$1);
      if (suspense) {
        this.suspense = suspense;
      }
    }
    if ((options2 == null ? void 0 : options2.sync) === true) {
      this.sync = true;
    }
    if ((options2 == null ? void 0 : options2.sync) === "init") {
      this.init = true;
      this.update();
    } else {
      this.schedule();
    }
  }
  /* API */
  run() {
    const result = super.refresh(this.fn);
    if (isFunction$1(result)) {
      lazyArrayPush(this, "cleanups", result);
    }
  }
  schedule() {
    var _a2;
    if ((_a2 = this.suspense) == null ? void 0 : _a2.suspended)
      return;
    if (this.sync) {
      this.update();
    } else {
      Scheduler$1.schedule(this);
    }
  }
  stale(status) {
    const statusPrev = this.status;
    if (statusPrev >= status)
      return;
    this.status = status;
    if (!this.sync || statusPrev !== 2 && statusPrev !== 3) {
      this.schedule();
    }
  }
  update() {
    var _a2;
    if ((_a2 = this.suspense) == null ? void 0 : _a2.suspended)
      return;
    super.update();
  }
}
const effect = (fn, options2) => {
  const effect2 = new Effect(fn, options2);
  const dispose = () => effect2.dispose(true);
  return dispose;
};
const isObservable = (value) => {
  return isFunction$1(value) && SYMBOL_OBSERVABLE in value;
};
function get(value, getFunction = true) {
  const is2 = getFunction ? isFunction$1 : isObservable;
  if (is2(value)) {
    return value();
  } else {
    return value;
  }
}
const isStore = (value) => {
  return isObject$1(value) && SYMBOL_STORE in value;
};
function untrack(fn) {
  if (isFunction$1(fn)) {
    const observerPrev = OBSERVER;
    if (observerPrev) {
      try {
        setObserver(void 0);
        return fn();
      } finally {
        setObserver(observerPrev);
      }
    } else {
      return fn();
    }
  } else {
    return fn;
  }
}
const isBatching = () => {
  return Scheduler$1.queued || Scheduler$1.locked || SchedulerSync.locked;
};
class StoreMap extends Map {
  insert(key, value) {
    super.set(key, value);
    return value;
  }
}
class StoreCleanable {
  constructor() {
    this.count = 0;
  }
  listen() {
    this.count += 1;
    cleanup(this);
  }
  call() {
    this.count -= 1;
    if (this.count)
      return;
    this.dispose();
  }
  dispose() {
  }
}
class StoreKeys extends StoreCleanable {
  constructor(parent, observable2) {
    super();
    this.parent = parent;
    this.observable = observable2;
  }
  dispose() {
    this.parent.keys = void 0;
  }
}
class StoreValues extends StoreCleanable {
  constructor(parent, observable2) {
    super();
    this.parent = parent;
    this.observable = observable2;
  }
  dispose() {
    this.parent.values = void 0;
  }
}
class StoreHas extends StoreCleanable {
  constructor(parent, key, observable2) {
    super();
    this.parent = parent;
    this.key = key;
    this.observable = observable2;
  }
  dispose() {
    var _a2;
    (_a2 = this.parent.has) == null ? void 0 : _a2.delete(this.key);
  }
}
class StoreProperty extends StoreCleanable {
  constructor(parent, key, observable2, node) {
    super();
    this.parent = parent;
    this.key = key;
    this.observable = observable2;
    this.node = node;
  }
  dispose() {
    var _a2;
    (_a2 = this.parent.properties) == null ? void 0 : _a2.delete(this.key);
  }
}
const StoreListenersRegular = {
  /* VARIABLES */
  active: 0,
  listeners: /* @__PURE__ */ new Set(),
  nodes: /* @__PURE__ */ new Set(),
  /* API */
  prepare: () => {
    const { listeners, nodes } = StoreListenersRegular;
    const traversed = /* @__PURE__ */ new Set();
    const traverse = (node) => {
      if (traversed.has(node))
        return;
      traversed.add(node);
      lazySetEach(node.parents, traverse);
      lazySetEach(node.listenersRegular, (listener) => {
        listeners.add(listener);
      });
    };
    nodes.forEach(traverse);
    return () => {
      listeners.forEach((listener) => {
        listener();
      });
    };
  },
  register: (node) => {
    StoreListenersRegular.nodes.add(node);
    StoreScheduler.schedule();
  },
  reset: () => {
    StoreListenersRegular.listeners = /* @__PURE__ */ new Set();
    StoreListenersRegular.nodes = /* @__PURE__ */ new Set();
  }
};
const StoreListenersRoots = {
  /* VARIABLES */
  active: 0,
  nodes: /* @__PURE__ */ new Map(),
  /* API */
  prepare: () => {
    const { nodes } = StoreListenersRoots;
    return () => {
      nodes.forEach((rootsSet, store2) => {
        const roots = Array.from(rootsSet);
        lazySetEach(store2.listenersRoots, (listener) => {
          listener(roots);
        });
      });
    };
  },
  register: (store2, root2) => {
    const roots = StoreListenersRoots.nodes.get(store2) || /* @__PURE__ */ new Set();
    roots.add(root2);
    StoreListenersRoots.nodes.set(store2, roots);
    StoreScheduler.schedule();
  },
  registerWith: (current, parent, key) => {
    if (!parent.parents) {
      const root2 = (current == null ? void 0 : current.store) || untrack(() => parent.store[key]);
      StoreListenersRoots.register(parent, root2);
    } else {
      const traversed = /* @__PURE__ */ new Set();
      const traverse = (node) => {
        if (traversed.has(node))
          return;
        traversed.add(node);
        lazySetEach(node.parents, (parent2) => {
          if (!parent2.parents) {
            StoreListenersRoots.register(parent2, node.store);
          }
          traverse(parent2);
        });
      };
      traverse(current || parent);
    }
  },
  reset: () => {
    StoreListenersRoots.nodes = /* @__PURE__ */ new Map();
  }
};
const StoreScheduler = {
  /* VARIABLES */
  active: false,
  /* API */
  flush: () => {
    const flushRegular = StoreListenersRegular.prepare();
    const flushRoots = StoreListenersRoots.prepare();
    StoreScheduler.reset();
    flushRegular();
    flushRoots();
  },
  flushIfNotBatching: () => {
    if (isBatching()) {
      {
        setTimeout(StoreScheduler.flushIfNotBatching, 0);
      }
    } else {
      StoreScheduler.flush();
    }
  },
  reset: () => {
    StoreScheduler.active = false;
    StoreListenersRegular.reset();
    StoreListenersRoots.reset();
  },
  schedule: () => {
    if (StoreScheduler.active)
      return;
    StoreScheduler.active = true;
    queueMicrotask(StoreScheduler.flushIfNotBatching);
  }
};
const NODES = /* @__PURE__ */ new WeakMap();
const SPECIAL_SYMBOLS = /* @__PURE__ */ new Set([SYMBOL_STORE, SYMBOL_STORE_KEYS, SYMBOL_STORE_OBSERVABLE, SYMBOL_STORE_TARGET, SYMBOL_STORE_VALUES]);
const UNREACTIVE_KEYS = /* @__PURE__ */ new Set(["__proto__", "__defineGetter__", "__defineSetter__", "__lookupGetter__", "__lookupSetter__", "prototype", "constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toSource", "toString", "valueOf"]);
const STORE_TRAPS = {
  /* API */
  get: (target, key) => {
    var _a2, _b2;
    if (SPECIAL_SYMBOLS.has(key)) {
      if (key === SYMBOL_STORE)
        return true;
      if (key === SYMBOL_STORE_TARGET)
        return target;
      if (key === SYMBOL_STORE_KEYS) {
        if (isListenable()) {
          const node2 = getNodeExisting(target);
          node2.keys || (node2.keys = getNodeKeys(node2));
          node2.keys.listen();
          node2.keys.observable.get();
        }
        return;
      }
      if (key === SYMBOL_STORE_VALUES) {
        if (isListenable()) {
          const node2 = getNodeExisting(target);
          node2.values || (node2.values = getNodeValues(node2));
          node2.values.listen();
          node2.values.observable.get();
        }
        return;
      }
      if (key === SYMBOL_STORE_OBSERVABLE) {
        return (key2) => {
          var _a22;
          key2 = typeof key2 === "number" ? String(key2) : key2;
          const node2 = getNodeExisting(target);
          const getter2 = (_a22 = node2.getters) == null ? void 0 : _a22.get(key2);
          if (getter2)
            return getter2.bind(node2.store);
          node2.properties || (node2.properties = new StoreMap());
          const value2 = target[key2];
          const property2 = node2.properties.get(key2) || node2.properties.insert(key2, getNodeProperty(node2, key2, value2));
          const options2 = node2.equals ? { equals: node2.equals } : void 0;
          property2.observable || (property2.observable = getNodeObservable(node2, value2, options2));
          const observable2 = readable(property2.observable);
          return observable2;
        };
      }
    }
    if (UNREACTIVE_KEYS.has(key))
      return target[key];
    const node = getNodeExisting(target);
    const getter = (_a2 = node.getters) == null ? void 0 : _a2.get(key);
    const value = getter || target[key];
    node.properties || (node.properties = new StoreMap());
    const listenable = isListenable();
    const proxiable = isProxiable(value);
    const property = listenable || proxiable ? node.properties.get(key) || node.properties.insert(key, getNodeProperty(node, key, value)) : void 0;
    if (property == null ? void 0 : property.node) {
      lazySetAdd(property.node, "parents", node);
    }
    if (property && listenable) {
      const options2 = node.equals ? { equals: node.equals } : void 0;
      property.listen();
      property.observable || (property.observable = getNodeObservable(node, value, options2));
      property.observable.get();
    }
    if (getter) {
      return getter.call(node.store);
    } else {
      if (typeof value === "function" && value === Array.prototype[key]) {
        return function() {
          return value.apply(node.store, arguments);
        };
      }
      return ((_b2 = property == null ? void 0 : property.node) == null ? void 0 : _b2.store) || value;
    }
  },
  set: (target, key, value) => {
    var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j;
    value = getTarget(value);
    const node = getNodeExisting(target);
    const setter = (_a2 = node.setters) == null ? void 0 : _a2.get(key);
    if (setter) {
      setter.call(node.store, value);
    } else {
      const targetIsArray = isArray$1(target);
      const valuePrev = target[key];
      const hadProperty = !!valuePrev || key in target;
      const equals = node.equals || is;
      if (hadProperty && equals(value, valuePrev) && (key !== "length" || !targetIsArray))
        return true;
      const lengthPrev = targetIsArray && target["length"];
      target[key] = value;
      const lengthNext = targetIsArray && target["length"];
      if (targetIsArray && key !== "length" && lengthPrev !== lengthNext) {
        (_d = (_c = (_b2 = node.properties) == null ? void 0 : _b2.get("length")) == null ? void 0 : _c.observable) == null ? void 0 : _d.set(lengthNext);
      }
      (_e = node.values) == null ? void 0 : _e.observable.set(0);
      if (!hadProperty) {
        (_f = node.keys) == null ? void 0 : _f.observable.set(0);
        (_h = (_g = node.has) == null ? void 0 : _g.get(key)) == null ? void 0 : _h.observable.set(true);
      }
      const property = (_i = node.properties) == null ? void 0 : _i.get(key);
      if (property == null ? void 0 : property.node) {
        lazySetDelete(property.node, "parents", node);
      }
      if (property) {
        (_j = property.observable) == null ? void 0 : _j.set(value);
        property.node = isProxiable(value) ? NODES.get(value) || getNode(value, key, node) : void 0;
      }
      if (property == null ? void 0 : property.node) {
        lazySetAdd(property.node, "parents", node);
      }
      if (StoreListenersRoots.active) {
        StoreListenersRoots.registerWith(property == null ? void 0 : property.node, node, key);
      }
      if (StoreListenersRegular.active) {
        StoreListenersRegular.register(node);
      }
      if (targetIsArray && key === "length") {
        const lengthPrev2 = Number(valuePrev);
        const lengthNext2 = Number(value);
        for (let i = lengthNext2; i < lengthPrev2; i++) {
          if (i in target)
            continue;
          STORE_TRAPS.deleteProperty(target, `${i}`, true);
        }
      }
    }
    return true;
  },
  deleteProperty: (target, key, _force) => {
    var _a2, _b2, _c, _d, _e, _f, _g, _h;
    const hasProperty = key in target;
    if (!_force && !hasProperty)
      return true;
    const deleted = Reflect.deleteProperty(target, key);
    if (!deleted)
      return false;
    const node = getNodeExisting(target);
    (_a2 = node.getters) == null ? void 0 : _a2.delete(key);
    (_b2 = node.setters) == null ? void 0 : _b2.delete(key);
    (_c = node.keys) == null ? void 0 : _c.observable.set(0);
    (_d = node.values) == null ? void 0 : _d.observable.set(0);
    (_f = (_e = node.has) == null ? void 0 : _e.get(key)) == null ? void 0 : _f.observable.set(false);
    const property = (_g = node.properties) == null ? void 0 : _g.get(key);
    if (StoreListenersRoots.active) {
      StoreListenersRoots.registerWith(property == null ? void 0 : property.node, node, key);
    }
    if (property == null ? void 0 : property.node) {
      lazySetDelete(property.node, "parents", node);
    }
    if (property) {
      (_h = property.observable) == null ? void 0 : _h.set(void 0);
      property.node = void 0;
    }
    if (StoreListenersRegular.active) {
      StoreListenersRegular.register(node);
    }
    return true;
  },
  defineProperty: (target, key, descriptor) => {
    var _a2, _b2, _c, _d, _e, _f, _g, _h;
    const node = getNodeExisting(target);
    const equals = node.equals || is;
    const hadProperty = key in target;
    const descriptorPrev = Reflect.getOwnPropertyDescriptor(target, key);
    if ("value" in descriptor && isStore(descriptor.value)) {
      descriptor = { ...descriptor, value: getTarget(descriptor.value) };
    }
    if (descriptorPrev && isEqualDescriptor(descriptorPrev, descriptor, equals))
      return true;
    const defined = Reflect.defineProperty(target, key, descriptor);
    if (!defined)
      return false;
    if (!descriptor.get) {
      (_a2 = node.getters) == null ? void 0 : _a2.delete(key);
    } else if (descriptor.get) {
      node.getters || (node.getters = new StoreMap());
      node.getters.set(key, descriptor.get);
    }
    if (!descriptor.set) {
      (_b2 = node.setters) == null ? void 0 : _b2.delete(key);
    } else if (descriptor.set) {
      node.setters || (node.setters = new StoreMap());
      node.setters.set(key, descriptor.set);
    }
    if (hadProperty !== !!descriptor.enumerable) {
      (_c = node.keys) == null ? void 0 : _c.observable.set(0);
    }
    (_e = (_d = node.has) == null ? void 0 : _d.get(key)) == null ? void 0 : _e.observable.set(true);
    const property = (_f = node.properties) == null ? void 0 : _f.get(key);
    if (StoreListenersRoots.active) {
      StoreListenersRoots.registerWith(property == null ? void 0 : property.node, node, key);
    }
    if (property == null ? void 0 : property.node) {
      lazySetDelete(property.node, "parents", node);
    }
    if (property) {
      if ("get" in descriptor) {
        (_g = property.observable) == null ? void 0 : _g.set(descriptor.get);
        property.node = void 0;
      } else {
        const value = descriptor.value;
        (_h = property.observable) == null ? void 0 : _h.set(value);
        property.node = isProxiable(value) ? NODES.get(value) || getNode(value, key, node) : void 0;
      }
    }
    if (property == null ? void 0 : property.node) {
      lazySetAdd(property.node, "parents", node);
    }
    if (StoreListenersRoots.active) {
      StoreListenersRoots.registerWith(property == null ? void 0 : property.node, node, key);
    }
    if (StoreListenersRegular.active) {
      StoreListenersRegular.register(node);
    }
    return true;
  },
  has: (target, key) => {
    if (key === SYMBOL_STORE)
      return true;
    if (key === SYMBOL_STORE_TARGET)
      return true;
    const value = key in target;
    if (isListenable()) {
      const node = getNodeExisting(target);
      node.has || (node.has = new StoreMap());
      const has = node.has.get(key) || node.has.insert(key, getNodeHas(node, key, value));
      has.listen();
      has.observable.get();
    }
    return value;
  },
  ownKeys: (target) => {
    const keys = Reflect.ownKeys(target);
    if (isListenable()) {
      const node = getNodeExisting(target);
      node.keys || (node.keys = getNodeKeys(node));
      node.keys.listen();
      node.keys.observable.get();
    }
    return keys;
  }
};
const STORE_UNTRACK_TRAPS = {
  /* API */
  has: (target, key) => {
    if (key === SYMBOL_STORE_UNTRACKED)
      return true;
    return key in target;
  }
};
const getNode = (value, key, parent, equals) => {
  if (isStore(value))
    return getNodeExisting(getTarget(value));
  const store2 = isFrozenLike(value, key, parent) ? value : new Proxy(value, STORE_TRAPS);
  const gettersAndSetters = getGettersAndSetters(value);
  const node = { parents: parent, store: store2 };
  if (gettersAndSetters) {
    const { getters, setters } = gettersAndSetters;
    if (getters)
      node.getters = getters;
    if (setters)
      node.setters = setters;
  }
  if (equals === false) {
    node.equals = nope;
  } else if (equals) {
    node.equals = equals;
  } else if (parent == null ? void 0 : parent.equals) {
    node.equals = parent.equals;
  }
  NODES.set(value, node);
  return node;
};
const getNodeExisting = (value) => {
  const node = NODES.get(value);
  if (!node)
    throw new Error("Impossible");
  return node;
};
const getNodeFromStore = (store2) => {
  return getNodeExisting(getTarget(store2));
};
const getNodeKeys = (node) => {
  const observable2 = getNodeObservable(node, 0, { equals: false });
  const keys = new StoreKeys(node, observable2);
  return keys;
};
const getNodeValues = (node) => {
  const observable2 = getNodeObservable(node, 0, { equals: false });
  const values = new StoreValues(node, observable2);
  return values;
};
const getNodeHas = (node, key, value) => {
  const observable2 = getNodeObservable(node, value);
  const has = new StoreHas(node, key, observable2);
  return has;
};
const getNodeObservable = (node, value, options2) => {
  return new Observable(value, options2);
};
const getNodeProperty = (node, key, value) => {
  const observable2 = void 0;
  const propertyNode = isProxiable(value) ? NODES.get(value) || getNode(value, key, node) : void 0;
  const property = new StoreProperty(node, key, observable2, propertyNode);
  node.properties || (node.properties = new StoreMap());
  node.properties.set(key, property);
  return property;
};
const getGettersAndSetters = (value) => {
  if (isArray$1(value))
    return;
  let getters;
  let setters;
  const keys = Object.keys(value);
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i];
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (!descriptor)
      continue;
    const { get: get2, set } = descriptor;
    if (get2) {
      getters || (getters = new StoreMap());
      getters.set(key, get2);
    }
    if (set) {
      setters || (setters = new StoreMap());
      setters.set(key, set);
    }
    if (get2 && !set) {
      setters || (setters = new StoreMap());
      setters.set(key, throwNoSetterError);
    }
  }
  if (!getters && !setters)
    return;
  return { getters, setters };
};
const getStore = (value, options2) => {
  if (isStore(value))
    return value;
  const node = NODES.get(value) || getNode(value, void 0, void 0, options2 == null ? void 0 : options2.equals);
  return node.store;
};
const getTarget = (value) => {
  if (isStore(value))
    return value[SYMBOL_STORE_TARGET];
  return value;
};
const getUntracked = (value) => {
  if (!isObject$1(value))
    return value;
  if (isUntracked$1(value))
    return value;
  return new Proxy(value, STORE_UNTRACK_TRAPS);
};
const isEqualDescriptor = (a, b, equals) => {
  return !!a.configurable === !!b.configurable && !!a.enumerable === !!b.enumerable && !!a.writable === !!b.writable && equals(a.value, b.value) && a.get === b.get && a.set === b.set;
};
const isFrozenLike = (value, key, parent) => {
  if (Object.isFrozen(value))
    return true;
  if (!parent || key === void 0)
    return false;
  const target = store.unwrap(parent.store);
  const descriptor = Reflect.getOwnPropertyDescriptor(target, key);
  if ((descriptor == null ? void 0 : descriptor.configurable) || (descriptor == null ? void 0 : descriptor.writable))
    return false;
  return true;
};
const isListenable = () => {
  return !!OBSERVER;
};
const isProxiable = (value) => {
  if (value === null || typeof value !== "object")
    return false;
  if (SYMBOL_STORE in value)
    return true;
  if (SYMBOL_STORE_UNTRACKED in value)
    return false;
  if (isArray$1(value))
    return true;
  const prototype = Object.getPrototypeOf(value);
  if (prototype === null)
    return true;
  return Object.getPrototypeOf(prototype) === null;
};
const isUntracked$1 = (value) => {
  if (value === null || typeof value !== "object")
    return false;
  return SYMBOL_STORE_UNTRACKED in value;
};
const throwNoSetterError = () => {
  throw new TypeError("Cannot set property value of #<Object> which has only a getter");
};
const store = (value, options2) => {
  if (!isObject$1(value))
    return value;
  if (isUntracked$1(value))
    return value;
  return getStore(value, options2);
};
store.on = (target, listener) => {
  const targets = isStore(target) ? [target] : castArray$1(target);
  const selectors = targets.filter(isFunction$1);
  const nodes = targets.filter(isStore).map(getNodeFromStore);
  StoreListenersRegular.active += 1;
  const disposers = selectors.map((selector) => {
    let inited = false;
    return effect(() => {
      if (inited) {
        StoreListenersRegular.listeners.add(listener);
        StoreScheduler.schedule();
      }
      inited = true;
      selector();
    }, { suspense: false, sync: true });
  });
  nodes.forEach((node) => {
    lazySetAdd(node, "listenersRegular", listener);
  });
  return () => {
    StoreListenersRegular.active -= 1;
    disposers.forEach((disposer) => {
      disposer();
    });
    nodes.forEach((node) => {
      lazySetDelete(node, "listenersRegular", listener);
    });
  };
};
store._onRoots = (target, listener) => {
  if (!isStore(target))
    return noop$1;
  const node = getNodeFromStore(target);
  if (node.parents)
    throw new Error("Only top-level stores are supported");
  StoreListenersRoots.active += 1;
  lazySetAdd(node, "listenersRoots", listener);
  return () => {
    StoreListenersRoots.active -= 1;
    lazySetDelete(node, "listenersRoots", listener);
  };
};
store.reconcile = /* @__PURE__ */ (() => {
  const getType = (value) => {
    if (isArray$1(value))
      return 1;
    if (isProxiable(value))
      return 2;
    return 0;
  };
  const reconcileOuter = (prev, next) => {
    const uprev = getTarget(prev);
    const unext = getTarget(next);
    reconcileInner(prev, next);
    const prevType = getType(uprev);
    const nextType = getType(unext);
    if (prevType === 1 || nextType === 1) {
      prev.length = next.length;
    }
    return prev;
  };
  const reconcileInner = (prev, next) => {
    const uprev = getTarget(prev);
    const unext = getTarget(next);
    const prevKeys = Object.keys(uprev);
    const nextKeys = Object.keys(unext);
    for (let i = 0, l = nextKeys.length; i < l; i++) {
      const key = nextKeys[i];
      const prevValue = uprev[key];
      const nextValue = unext[key];
      if (!is(prevValue, nextValue)) {
        const prevType = getType(prevValue);
        const nextType = getType(nextValue);
        if (prevType && prevType === nextType) {
          reconcileInner(prev[key], nextValue);
          if (prevType === 1) {
            prev[key].length = nextValue.length;
          }
        } else {
          prev[key] = nextValue;
        }
      } else if (prevValue === void 0 && !(key in uprev)) {
        prev[key] = void 0;
      }
    }
    for (let i = 0, l = prevKeys.length; i < l; i++) {
      const key = prevKeys[i];
      if (!(key in unext)) {
        delete prev[key];
      }
    }
    return prev;
  };
  const reconcile = (prev, next) => {
    return untrack(() => {
      return reconcileOuter(prev, next);
    });
  };
  return reconcile;
})();
store.untrack = (value) => {
  return getUntracked(value);
};
store.unwrap = (value) => {
  return getTarget(value);
};
const _with = () => {
  const owner = OWNER;
  const observer = OBSERVER;
  return (fn) => {
    return owner.wrap(() => fn(), owner, observer);
  };
};
const CONTEXTS_DATA = /* @__PURE__ */ new WeakMap();
const DIRECTIVES = {};
const SYMBOL_TEMPLATE_ACCESSOR = Symbol("Template.Accessor");
const SYMBOLS_DIRECTIVES = {};
const SYMBOL_CLONE = Symbol("CloneElement");
const { createComment, createHTMLNode, createSVGNode, createText, createDocumentFragment } = (() => {
  if (typeof via !== "undefined") {
    const document2 = via.document;
    const createComment2 = document2.createComment;
    const createHTMLNode2 = document2.createElement;
    const createSVGNode2 = (name) => document2.createElementNS("http://www.w3.org/2000/svg", name);
    const createText2 = document2.createTextNode;
    const createDocumentFragment2 = document2.createDocumentFragment;
    return { createComment: createComment2, createHTMLNode: createHTMLNode2, createSVGNode: createSVGNode2, createText: createText2, createDocumentFragment: createDocumentFragment2 };
  } else {
    const createComment2 = document.createComment.bind(document, "");
    const createHTMLNode2 = document.createElement.bind(document);
    const createSVGNode2 = document.createElementNS.bind(document, "http://www.w3.org/2000/svg");
    const createText2 = document.createTextNode.bind(document);
    const createDocumentFragment2 = document.createDocumentFragment.bind(document);
    return { createComment: createComment2, createHTMLNode: createHTMLNode2, createSVGNode: createSVGNode2, createText: createText2, createDocumentFragment: createDocumentFragment2 };
  }
})();
const { assign } = Object;
const castArray = (value) => {
  return isArray(value) ? value : [value];
};
const flatten = (arr) => {
  for (let i = 0, l = arr.length; i < l; i++) {
    if (!isArray(arr[i])) continue;
    return arr.flat(Infinity);
  }
  return arr;
};
const { isArray } = Array;
const isBoolean = (value) => {
  return typeof value === "boolean";
};
const isFunction = (value) => {
  return typeof value === "function";
};
const isFunctionReactive = (value) => {
  var _a2, _b2;
  return !(SYMBOL_UNTRACKED in value || SYMBOL_UNTRACKED_UNWRAPPED in value || SYMBOL_OBSERVABLE_FROZEN in value || ((_b2 = (_a2 = value[SYMBOL_OBSERVABLE_READABLE]) == null ? void 0 : _a2.parent) == null ? void 0 : _b2.disposed));
};
const isNil = (value) => {
  return value === null || value === void 0;
};
const isNode = (value) => {
  return value instanceof Node;
};
const isObject = (value) => {
  return typeof value === "object" && value !== null;
};
const isString = (value) => {
  return typeof value === "string";
};
const isSVG = (value) => {
  return !!value["isSVG"];
};
const isSVGElement = /* @__PURE__ */ (() => {
  const svgRe = /^(t(ext$|s)|s[vwy]|g)|^set|tad|ker|p(at|s)|s(to|c$|ca|k)|r(ec|cl)|ew|us|f($|e|s)|cu|n[ei]|l[ty]|[GOP]/;
  const svgCache = {};
  return (element) => {
    const cached = svgCache[element];
    return cached !== void 0 ? cached : svgCache[element] = !element.includes("-") && svgRe.test(element);
  };
})();
const isTemplateAccessor = (value) => {
  return isFunction(value) && SYMBOL_TEMPLATE_ACCESSOR in value;
};
const isVoidChild = (value) => {
  return value === null || value === void 0 || typeof value === "boolean" || typeof value === "symbol";
};
const options = {
  sync: "init"
};
const useRenderEffect = (fn) => {
  return effect(fn, options);
};
const useCheapDisposed = () => {
  let disposed = false;
  const get2 = () => disposed;
  const set = () => disposed = true;
  cleanup(set);
  return get2;
};
const useMicrotask = (fn) => {
  const disposed = useCheapDisposed();
  const runWithOwner = _with();
  queueMicrotask(() => {
    if (disposed()) return;
    runWithOwner(fn);
  });
};
const classesToggle = (element, classes, force) => {
  const { className } = element;
  if (isString(className)) {
    if (!className) {
      if (force) {
        element.className = classes;
        return;
      } else {
        return;
      }
    } else if (!force && className === classes) {
      element.className = "";
      return;
    }
  }
  if (classes.includes(" ")) {
    classes.split(" ").forEach((cls) => {
      if (!cls.length) return;
      element.classList.toggle(cls, !!force);
    });
  } else {
    element.classList.toggle(classes, !!force);
  }
};
const dummyNode = createComment("");
const beforeDummyWrapper = [dummyNode];
const afterDummyWrapper = [dummyNode];
const diff = (parent, before, after, nextSibling) => {
  if (before === after) return;
  if (before instanceof Node) {
    if (after instanceof Node) {
      if (before.parentNode === parent) {
        parent.replaceChild(after, before);
        return;
      }
    }
    beforeDummyWrapper[0] = before;
    before = beforeDummyWrapper;
  }
  if (after instanceof Node) {
    afterDummyWrapper[0] = after;
    after = afterDummyWrapper;
  }
  const bLength = after.length;
  let aEnd = before.length;
  let bEnd = bLength;
  let aStart = 0;
  let bStart = 0;
  let map = null;
  let removable;
  while (aStart < aEnd || bStart < bEnd) {
    if (aEnd === aStart) {
      const node = bEnd < bLength ? bStart ? after[bStart - 1].nextSibling : after[bEnd - bStart] : nextSibling;
      if (bStart < bEnd) {
        if (node) {
          node.before.apply(node, after.slice(bStart, bEnd));
        } else {
          parent.append.apply(parent, after.slice(bStart, bEnd));
        }
        bStart = bEnd;
      }
    } else if (bEnd === bStart) {
      while (aStart < aEnd) {
        if (!map || !map.has(before[aStart])) {
          removable = before[aStart];
          if (removable.parentNode === parent) {
            parent.removeChild(removable);
          }
        }
        aStart++;
      }
    } else if (before[aStart] === after[bStart]) {
      aStart++;
      bStart++;
    } else if (before[aEnd - 1] === after[bEnd - 1]) {
      aEnd--;
      bEnd--;
    } else if (before[aStart] === after[bEnd - 1] && after[bStart] === before[aEnd - 1]) {
      const node = before[--aEnd].nextSibling;
      parent.insertBefore(
        after[bStart++],
        before[aStart++].nextSibling
      );
      parent.insertBefore(after[--bEnd], node);
      before[aEnd] = after[bEnd];
    } else {
      if (!map) {
        map = /* @__PURE__ */ new Map();
        let i = bStart;
        while (i < bEnd)
          map.set(after[i], i++);
      }
      if (map.has(before[aStart])) {
        const index = map.get(before[aStart]);
        if (bStart < index && index < bEnd) {
          let i = aStart;
          let sequence = 1;
          while (++i < aEnd && i < bEnd && map.get(before[i]) === index + sequence)
            sequence++;
          if (sequence > index - bStart) {
            const node = before[aStart];
            if (bStart < index) {
              if (node) {
                node.before.apply(node, after.slice(bStart, index));
              } else {
                parent.append.apply(parent, after.slice(bStart, index));
              }
              bStart = index;
            }
          } else {
            parent.replaceChild(
              after[bStart++],
              before[aStart++]
            );
          }
        } else
          aStart++;
      } else {
        removable = before[aStart++];
        if (removable.parentNode === parent) {
          parent.removeChild(removable);
        }
      }
    }
  }
  beforeDummyWrapper[0] = dummyNode;
  afterDummyWrapper[0] = dummyNode;
};
const NOOP_CHILDREN = [];
const FragmentUtils = {
  make: () => {
    return {
      values: void 0,
      length: 0
    };
  },
  makeWithNode: (node) => {
    return {
      values: node,
      length: 1
    };
  },
  makeWithFragment: (fragment) => {
    return {
      values: fragment,
      fragmented: true,
      length: 1
    };
  },
  getChildrenFragmented: (thiz, children = []) => {
    const { values, length } = thiz;
    if (!length) return children;
    if (values instanceof Array) {
      for (let i = 0, l = values.length; i < l; i++) {
        const value = values[i];
        if (value instanceof Node) {
          children.push(value);
        } else {
          FragmentUtils.getChildrenFragmented(value, children);
        }
      }
    } else {
      if (values instanceof Node) {
        children.push(values);
      } else {
        FragmentUtils.getChildrenFragmented(values, children);
      }
    }
    return children;
  },
  getChildren: (thiz) => {
    if (!thiz.length) return NOOP_CHILDREN;
    if (!thiz.fragmented) return thiz.values;
    if (thiz.length === 1) return FragmentUtils.getChildren(thiz.values);
    return FragmentUtils.getChildrenFragmented(thiz);
  },
  pushFragment: (thiz, fragment) => {
    FragmentUtils.pushValue(thiz, fragment);
    thiz.fragmented = true;
  },
  pushNode: (thiz, node) => {
    FragmentUtils.pushValue(thiz, node);
  },
  pushValue: (thiz, value) => {
    const { values, length } = thiz;
    if (length === 0) {
      thiz.values = value;
    } else if (length === 1) {
      thiz.values = [values, value];
    } else {
      values.push(value);
    }
    thiz.length += 1;
  },
  replaceWithNode: (thiz, node) => {
    thiz.values = node;
    delete thiz.fragmented;
    thiz.length = 1;
  },
  replaceWithFragment: (thiz, fragment) => {
    thiz.values = fragment.values;
    thiz.fragmented = fragment.fragmented;
    thiz.length = fragment.length;
  }
};
const resolveChild = (value, setter, _dynamic = false) => {
  if (isFunction(value)) {
    if (!isFunctionReactive(value)) {
      resolveChild(value(), setter, _dynamic);
    } else {
      useRenderEffect(() => {
        resolveChild(value(), setter, true);
      });
    }
  } else if (isArray(value)) {
    const [values, hasObservables] = resolveArraysAndStatics(value);
    values[SYMBOL_UNCACHED] = value[SYMBOL_UNCACHED];
    setter(values, hasObservables || _dynamic);
  } else {
    setter(value, _dynamic);
  }
};
const resolveClass = (classes, resolved = {}) => {
  if (isString(classes)) {
    classes.split(/\s+/g).filter(Boolean).filter((cls) => {
      resolved[cls] = true;
    });
  } else if (isFunction(classes)) {
    resolveClass(classes(), resolved);
  } else if (isArray(classes)) {
    classes.forEach((cls) => {
      resolveClass(cls, resolved);
    });
  } else if (classes) {
    for (const key in classes) {
      const value = classes[key];
      const isActive = !!get(value);
      if (!isActive) continue;
      resolved[key] = true;
    }
  }
  return resolved;
};
const resolveStyle = (styles, resolved = {}) => {
  if (isString(styles)) {
    return styles;
  } else if (isFunction(styles)) {
    return resolveStyle(styles(), resolved);
  } else if (isArray(styles)) {
    styles.forEach((style) => {
      resolveStyle(style, resolved);
    });
  } else if (styles) {
    for (const key in styles) {
      const value = styles[key];
      resolved[key] = get(value);
    }
  }
  return resolved;
};
const resolveArraysAndStatics = /* @__PURE__ */ (() => {
  const DUMMY_RESOLVED = [];
  const resolveArraysAndStaticsInner = (values, resolved, hasObservables) => {
    for (let i = 0, l = values.length; i < l; i++) {
      const value = values[i];
      const type = typeof value;
      if (type === "string" || type === "number" || type === "bigint") {
        if (resolved === DUMMY_RESOLVED) resolved = values.slice(0, i);
        resolved.push(createText(value));
      } else if (type === "object" && isArray(value)) {
        if (resolved === DUMMY_RESOLVED) resolved = values.slice(0, i);
        hasObservables = resolveArraysAndStaticsInner(value, resolved, hasObservables)[1];
      } else if (type === "function" && isObservable(value)) {
        if (resolved !== DUMMY_RESOLVED) resolved.push(value);
        hasObservables = true;
      } else {
        if (resolved !== DUMMY_RESOLVED) resolved.push(value);
      }
    }
    if (resolved === DUMMY_RESOLVED) resolved = values;
    return [resolved, hasObservables];
  };
  return (values) => {
    return resolveArraysAndStaticsInner(values, DUMMY_RESOLVED, false);
  };
})();
const setAttributeStatic = /* @__PURE__ */ (() => {
  const attributesBoolean = /* @__PURE__ */ new Set(["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"]);
  const attributeCamelCasedRe = /e(r[HRWrv]|[Vawy])|Con|l(e[Tcs]|c)|s(eP|y)|a(t[rt]|u|v)|Of|Ex|f[XYa]|gt|hR|d[Pg]|t[TXYd]|[UZq]/;
  const attributesCache = {};
  const uppercaseRe = /[A-Z]/g;
  const normalizeKeySvg = (key) => {
    return attributesCache[key] || (attributesCache[key] = attributeCamelCasedRe.test(key) ? key : key.replace(uppercaseRe, (char) => `-${char.toLowerCase()}`));
  };
  return (element, key, value) => {
    if (isSVG(element)) {
      key = key === "xlinkHref" || key === "xlink:href" ? "href" : normalizeKeySvg(key);
      if (isNil(value) || value === false && attributesBoolean.has(key)) {
        element.removeAttribute(key);
      } else {
        element.setAttribute(key, String(value));
      }
    } else {
      if (isNil(value) || value === false && attributesBoolean.has(key)) {
        element.removeAttribute(key);
      } else {
        value = value === true ? "" : String(value);
        element.setAttribute(key, value);
      }
    }
  };
})();
const setAttribute = (element, key, value) => {
  if (isFunction(value) && isFunctionReactive(value)) {
    useRenderEffect(() => {
      setAttributeStatic(element, key, value());
    });
  } else {
    setAttributeStatic(element, key, get(value));
  }
};
const setChildReplacementText = (child, childPrev) => {
  if (childPrev.nodeType === 3) {
    childPrev.nodeValue = child;
    return childPrev;
  } else {
    const parent = childPrev.parentElement;
    if (!parent) throw new Error("Invalid child replacement");
    const textNode = createText(child);
    parent.replaceChild(textNode, childPrev);
    return textNode;
  }
};
const setChildStatic = (parent, fragment, fragmentOnly, child, dynamic) => {
  if (!dynamic && isVoidChild(child)) return;
  const prev = FragmentUtils.getChildren(fragment);
  const prevIsArray = prev instanceof Array;
  const prevLength = prevIsArray ? prev.length : 1;
  const prevFirst = prevIsArray ? prev[0] : prev;
  const prevLast = prevIsArray ? prev[prevLength - 1] : prev;
  const prevSibling = (prevLast == null ? void 0 : prevLast.nextSibling) || null;
  if (prevLength === 0) {
    const type = typeof child;
    if (type === "string" || type === "number" || type === "bigint") {
      const textNode = createText(child);
      if (!fragmentOnly) {
        parent.appendChild(textNode);
      }
      FragmentUtils.replaceWithNode(fragment, textNode);
      return;
    } else if (type === "object" && child !== null && typeof child.nodeType === "number") {
      const node = child;
      if (!fragmentOnly) {
        parent.insertBefore(node, null);
      }
      FragmentUtils.replaceWithNode(fragment, node);
      return;
    }
  }
  if (prevLength === 1) {
    const type = typeof child;
    if (type === "string" || type === "number" || type === "bigint") {
      const node = setChildReplacementText(String(child), prevFirst);
      FragmentUtils.replaceWithNode(fragment, node);
      return;
    }
  }
  const fragmentNext = FragmentUtils.make();
  const children = Array.isArray(child) ? child : [child];
  for (let i = 0, l = children.length; i < l; i++) {
    const child2 = children[i];
    const type = typeof child2;
    if (type === "string" || type === "number" || type === "bigint") {
      FragmentUtils.pushNode(fragmentNext, createText(child2));
    } else if (type === "object" && child2 !== null && typeof child2.nodeType === "number") {
      FragmentUtils.pushNode(fragmentNext, child2);
    } else if (type === "function") {
      const fragment2 = FragmentUtils.make();
      let childFragmentOnly = !fragmentOnly;
      FragmentUtils.pushFragment(fragmentNext, fragment2);
      resolveChild(child2, (child3, dynamic2) => {
        const fragmentOnly2 = childFragmentOnly;
        childFragmentOnly = false;
        setChildStatic(parent, fragment2, fragmentOnly2, child3, dynamic2);
      });
    }
  }
  let next = FragmentUtils.getChildren(fragmentNext);
  let nextLength = fragmentNext.length;
  if (nextLength === 0 && prevLength === 1 && prevFirst.nodeType === 8) {
    return;
  }
  if (!fragmentOnly && (nextLength === 0 || prevLength === 1 && prevFirst.nodeType === 8 || children[SYMBOL_UNCACHED])) {
    const { childNodes } = parent;
    if (childNodes.length === prevLength) {
      parent.textContent = "";
      if (nextLength === 0) {
        const placeholder = createComment("");
        FragmentUtils.pushNode(fragmentNext, placeholder);
        if (next !== fragmentNext.values) {
          next = placeholder;
          nextLength += 1;
        }
      }
      if (prevSibling) {
        if (next instanceof Array) {
          prevSibling.before.apply(prevSibling, next);
        } else {
          parent.insertBefore(next, prevSibling);
        }
      } else {
        if (next instanceof Array) {
          parent.append.apply(parent, next);
        } else {
          parent.append(next);
        }
      }
      FragmentUtils.replaceWithFragment(fragment, fragmentNext);
      return;
    }
  }
  if (nextLength === 0) {
    const placeholder = createComment("");
    FragmentUtils.pushNode(fragmentNext, placeholder);
    if (next !== fragmentNext.values) {
      next = placeholder;
      nextLength += 1;
    }
  }
  if (!fragmentOnly) {
    diff(parent, prev, next, prevSibling);
  }
  FragmentUtils.replaceWithFragment(fragment, fragmentNext);
};
const setChild = (parent, child, fragment = FragmentUtils.make()) => {
  resolveChild(child, setChildStatic.bind(void 0, parent, fragment, false));
};
const setClassStatic = classesToggle;
const setClass = (element, key, value) => {
  if (isFunction(value) && isFunctionReactive(value)) {
    useRenderEffect(() => {
      setClassStatic(element, key, value());
    });
  } else {
    setClassStatic(element, key, get(value));
  }
};
const setClassBooleanStatic = (element, value, key, keyPrev) => {
  if (keyPrev && keyPrev !== true) {
    setClassStatic(element, keyPrev, false);
  }
  if (key && key !== true) {
    setClassStatic(element, key, value);
  }
};
const setClassBoolean = (element, value, key) => {
  if (isFunction(key) && isFunctionReactive(key)) {
    let keyPrev;
    useRenderEffect(() => {
      const keyNext = key();
      setClassBooleanStatic(element, value, keyNext, keyPrev);
      keyPrev = keyNext;
    });
  } else {
    setClassBooleanStatic(element, value, get(key));
  }
};
const setClassesStatic = (element, object, objectPrev) => {
  if (isString(object)) {
    if (isSVG(element)) {
      element.setAttribute("class", object);
    } else {
      element.className = object;
    }
  } else {
    if (objectPrev) {
      if (isString(objectPrev)) {
        if (objectPrev) {
          if (isSVG(element)) {
            element.setAttribute("class", "");
          } else {
            element.className = "";
          }
        }
      } else if (isArray(objectPrev)) {
        objectPrev = store.unwrap(objectPrev);
        for (let i = 0, l = objectPrev.length; i < l; i++) {
          if (!objectPrev[i]) continue;
          setClassBoolean(element, false, objectPrev[i]);
        }
      } else {
        objectPrev = store.unwrap(objectPrev);
        for (const key in objectPrev) {
          if (object && key in object) continue;
          setClass(element, key, false);
        }
      }
    }
    if (isArray(object)) {
      if (isStore(object)) {
        for (let i = 0, l = object.length; i < l; i++) {
          const fn = untrack(() => isFunction(object[i]) ? object[i] : object[SYMBOL_STORE_OBSERVABLE](String(i)));
          setClassBoolean(element, true, fn);
        }
      } else {
        for (let i = 0, l = object.length; i < l; i++) {
          if (!object[i]) continue;
          setClassBoolean(element, true, object[i]);
        }
      }
    } else {
      if (isStore(object)) {
        for (const key in object) {
          const fn = untrack(() => isFunction(object[key]) ? object[key] : object[SYMBOL_STORE_OBSERVABLE](key));
          setClass(element, key, fn);
        }
      } else {
        for (const key in object) {
          setClass(element, key, object[key]);
        }
      }
    }
  }
};
const setClasses = (element, object) => {
  if (isFunction(object) || isArray(object)) {
    let objectPrev;
    useRenderEffect(() => {
      const objectNext = resolveClass(object);
      setClassesStatic(element, objectNext, objectPrev);
      objectPrev = objectNext;
    });
  } else {
    setClassesStatic(element, object);
  }
};
const setDirective = (element, directive, args) => {
  const symbol = SYMBOLS_DIRECTIVES[directive] || Symbol();
  const data = context(symbol) || DIRECTIVES[symbol];
  if (!data) throw new Error(`Directive "${directive}" not found`);
  const call = () => data.fn(element, ...castArray(args));
  if (data.immediate) {
    call();
  } else {
    useMicrotask(call);
  }
};
const setEventStatic = /* @__PURE__ */ (() => {
  const delegatedEvents = {
    onauxclick: ["_onauxclick", false],
    onbeforeinput: ["_onbeforeinput", false],
    onclick: ["_onclick", false],
    ondblclick: ["_ondblclick", false],
    onfocusin: ["_onfocusin", false],
    onfocusout: ["_onfocusout", false],
    oninput: ["_oninput", false],
    onkeydown: ["_onkeydown", false],
    onkeyup: ["_onkeyup", false],
    onmousedown: ["_onmousedown", false],
    onmouseup: ["_onmouseup", false]
  };
  const delegate = (event) => {
    const key = `_${event}`;
    document.addEventListener(event.slice(2), (event2) => {
      const targets = event2.composedPath();
      let target = null;
      Object.defineProperty(event2, "currentTarget", {
        configurable: true,
        get() {
          return target;
        }
      });
      for (let i = 0, l = targets.length; i < l; i++) {
        target = targets[i];
        const handler = target[key];
        if (!handler) continue;
        handler(event2);
        if (event2.cancelBubble) break;
      }
      target = null;
    });
  };
  return (element, event, value) => {
    if (event.startsWith("onmiddleclick")) {
      const _value = value;
      event = `onauxclick${event.slice(13)}`;
      value = _value && ((event2) => event2["button"] === 1 && _value(event2));
    }
    const delegated = delegatedEvents[event];
    if (delegated) {
      if (!delegated[1]) {
        delegated[1] = true;
        delegate(event);
      }
      element[delegated[0]] = value;
    } else if (event.endsWith("passive")) {
      const isCapture = event.endsWith("capturepassive");
      const type = event.slice(2, -7 - (isCapture ? 7 : 0));
      const key = `_${event}`;
      const valuePrev = element[key];
      if (valuePrev) element.removeEventListener(type, valuePrev, { capture: isCapture });
      if (value) element.addEventListener(type, value, { passive: true, capture: isCapture });
      element[key] = value;
    } else if (event.endsWith("capture")) {
      const type = event.slice(2, -7);
      const key = `_${event}`;
      const valuePrev = element[key];
      if (valuePrev) element.removeEventListener(type, valuePrev, { capture: true });
      if (value) element.addEventListener(type, value, { capture: true });
      element[key] = value;
    } else {
      element[event] = value;
    }
  };
})();
const setEvent = (element, event, value) => {
  setEventStatic(element, event, value);
};
const setHTMLStatic = (element, value) => {
  element.innerHTML = String(isNil(value) ? "" : value);
};
const setHTML = (element, value) => {
  useRenderEffect(() => {
    setHTMLStatic(element, get(get(value).__html));
  });
};
const setPropertyStatic = (element, key, value) => {
  if (key === "tabIndex" && isBoolean(value)) {
    value = value ? 0 : void 0;
  }
  if (key === "value") {
    if (element.tagName === "PROGRESS") {
      value ?? (value = null);
    } else if (element.tagName === "SELECT" && !element["_$inited"]) {
      element["_$inited"] = true;
      queueMicrotask(() => element[key] = value);
    }
  }
  try {
    element[key] = value;
    if (isNil(value)) {
      setAttributeStatic(element, key, null);
    }
  } catch {
    setAttributeStatic(element, key, value);
  }
};
const setProperty = (element, key, value) => {
  if (isFunction(value) && isFunctionReactive(value)) {
    useRenderEffect(() => {
      setPropertyStatic(element, key, value());
    });
  } else {
    setPropertyStatic(element, key, get(value));
  }
};
const setRef = (element, value) => {
  if (isNil(value)) return;
  const values = flatten(castArray(value)).filter(Boolean);
  if (!values.length) return;
  useMicrotask(() => untrack(() => values.forEach((value2) => value2 == null ? void 0 : value2(element))));
};
const setStyleStatic = /* @__PURE__ */ (() => {
  const propertyNonDimensionalRe = /^(-|f[lo].*[^se]$|g.{5,}[^ps]$|z|o[pr]|(W.{5})?[lL]i.*(t|mp)$|an|(bo|s).{4}Im|sca|m.{6}[ds]|ta|c.*[st]$|wido|ini)/i;
  const propertyNonDimensionalCache = {};
  return (element, key, value) => {
    if (key.charCodeAt(0) === 45) {
      if (isNil(value)) {
        element.style.removeProperty(key);
      } else {
        element.style.setProperty(key, String(value));
      }
    } else if (isNil(value)) {
      element.style[key] = null;
    } else {
      element.style[key] = isString(value) || (propertyNonDimensionalCache[key] || (propertyNonDimensionalCache[key] = propertyNonDimensionalRe.test(key))) ? value : `${value}px`;
    }
  };
})();
const setStyle = (element, key, value) => {
  if (isFunction(value) && isFunctionReactive(value)) {
    useRenderEffect(() => {
      setStyleStatic(element, key, value());
    });
  } else {
    setStyleStatic(element, key, get(value));
  }
};
const setStylesStatic = (element, object, objectPrev) => {
  if (isString(object)) {
    element.setAttribute("style", object);
  } else {
    if (objectPrev) {
      if (isString(objectPrev)) {
        if (objectPrev) {
          element.style.cssText = "";
        }
      } else {
        objectPrev = store.unwrap(objectPrev);
        for (const key in objectPrev) {
          if (object && key in object) continue;
          setStyleStatic(element, key, null);
        }
      }
    }
    if (isStore(object)) {
      for (const key in object) {
        const fn = untrack(() => isFunction(object[key]) ? object[key] : object[SYMBOL_STORE_OBSERVABLE](key));
        setStyle(element, key, fn);
      }
    } else {
      for (const key in object) {
        setStyle(element, key, object[key]);
      }
    }
  }
};
const setStyles = (element, object) => {
  if (isFunction(object) || isArray(object)) {
    let objectPrev;
    useRenderEffect(() => {
      const objectNext = resolveStyle(object);
      setStylesStatic(element, objectNext, objectPrev);
      objectPrev = objectNext;
    });
  } else {
    setStylesStatic(element, get(object));
  }
};
const setTemplateAccessor = (element, key, value) => {
  if (key === "children") {
    const placeholder = createText("");
    element.insertBefore(placeholder, null);
    value(element, "setChildReplacement", void 0, placeholder);
  } else if (key === "ref") {
    value(element, "setRef");
  } else if (key === "style") {
    value(element, "setStyles");
  } else if (key === "class" || key === "className") {
    if (!isSVG(element)) {
      element.className = "";
    }
    value(element, "setClasses");
  } else if (key === "dangerouslySetInnerHTML") {
    value(element, "setHTML");
  } else if (key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110) {
    value(element, "setEvent", key.toLowerCase());
  } else if (key.charCodeAt(0) === 117 && key.charCodeAt(3) === 58) {
    value(element, "setDirective", key.slice(4));
  } else if (key === "innerHTML" || key === "outerHTML" || key === "textContent" || key === "className") ;
  else if (key in element && !isSVG(element)) {
    value(element, "setProperty", key);
  } else {
    element.setAttribute(key, "");
    value(element, "setAttribute", key);
  }
};
const setProp = (element, key, value) => {
  if (value === void 0) return;
  if (isTemplateAccessor(value)) {
    setTemplateAccessor(element, key, value);
  } else if (key === "children") {
    setChild(element, value);
  } else if (key === "ref") {
    setRef(element, value);
  } else if (key === "style") {
    setStyles(element, value);
  } else if (key === "class" || key === "className") {
    setClasses(element, value);
  } else if (key === "dangerouslySetInnerHTML") {
    setHTML(element, value);
  } else if (key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110) {
    setEvent(element, key.toLowerCase(), value);
  } else if (key.charCodeAt(0) === 117 && key.charCodeAt(3) === 58) {
    setDirective(element, key.slice(4), value);
  } else if (key === "innerHTML" || key === "outerHTML" || key === "textContent" || key === "className") ;
  else if (key in element && !isSVG(element)) {
    setProperty(element, key, value);
  } else {
    setAttribute(element, key, value);
  }
};
const setProps = (element, object) => {
  for (const key in object) {
    setProp(element, key, object[key]);
  }
};
const wrapElement = (element) => {
  element[SYMBOL_UNTRACKED_UNWRAPPED] = true;
  return element;
};
const wrapCloneElement = (target, component, props) => {
  target[SYMBOL_CLONE] = { Component: component, props };
  return target;
};
const createElement = (component, _props, ..._children) => {
  const children = _children.length > 1 ? _children : _children.length > 0 ? _children[0] : void 0;
  const hasChildren = !isVoidChild(children);
  if (hasChildren && isObject(_props) && "children" in _props) {
    throw new Error('Providing "children" both as a prop and as rest arguments is forbidden');
  }
  if (isFunction(component)) {
    const props = hasChildren ? { ..._props, children } : _props;
    return wrapElement(() => {
      return untrack(() => component.call(component, props));
    });
  } else if (isString(component)) {
    const isSVG2 = isSVGElement(component);
    const createNode = isSVG2 ? createSVGNode : createHTMLNode;
    return wrapElement(() => {
      const child = createNode(component);
      if (isSVG2) child["isSVG"] = true;
      untrack(() => {
        if (_props) {
          setProps(child, _props);
        }
        if (hasChildren) {
          setChild(child, children);
        }
      });
      return child;
    });
  } else if (isNode(component)) {
    return wrapElement(() => component);
  } else {
    throw new Error("Invalid component");
  }
};
function jsx(component, props, ...children) {
  if (typeof children === "string")
    return wrapCloneElement(createElement(component, props ?? {}, children), component, props);
  if (!props) props = {};
  if (typeof children === "string")
    Object.assign(props, { children });
  return wrapCloneElement(createElement(component, props, props == null ? void 0 : props.key), component, props);
}
class Root extends Owner {
  /* CONSTRUCTOR */
  constructor(register2) {
    super();
    this.parent = OWNER;
    this.context = OWNER.context;
    if (register2) {
      const suspense = this.get(SYMBOL_SUSPENSE$1);
      if (suspense) {
        this.registered = true;
        lazySetAdd(this.parent, "roots", this);
      }
    }
  }
  /* API */
  dispose(deep) {
    if (this.registered) {
      lazySetDelete(this.parent, "roots", this);
    }
    super.dispose(deep);
  }
  wrap(fn) {
    const dispose = () => this.dispose(true);
    const fnWithDispose = () => fn(dispose);
    return super.wrap(fnWithDispose, this, void 0);
  }
}
const root = (fn) => {
  return new Root(true).wrap(fn);
};
const isObservableFrozen = (value) => {
  var _a2, _b2;
  return isFunction$1(value) && (SYMBOL_OBSERVABLE_FROZEN in value || !!((_b2 = (_a2 = value[SYMBOL_OBSERVABLE_READABLE]) == null ? void 0 : _a2.parent) == null ? void 0 : _b2.disposed));
};
const isUntracked = (value) => {
  return isFunction$1(value) && (SYMBOL_UNTRACKED in value || SYMBOL_UNTRACKED_UNWRAPPED in value);
};
class Memo extends Observer {
  /* CONSTRUCTOR */
  constructor(fn, options2) {
    super();
    this.fn = fn;
    this.observable = new Observable(UNINITIALIZED, options2, this);
    if ((options2 == null ? void 0 : options2.sync) === true) {
      this.sync = true;
      this.update();
    }
  }
  /* API */
  run() {
    const result = super.refresh(this.fn);
    if (!this.disposed && this.observables.empty()) {
      this.disposed = true;
    }
    if (result !== UNAVAILABLE) {
      this.observable.set(result);
    }
  }
  stale(status) {
    const statusPrev = this.status;
    if (statusPrev >= status)
      return;
    this.status = status;
    if (statusPrev === DIRTY_MAYBE_YES)
      return;
    this.observable.stale(DIRTY_MAYBE_YES);
  }
}
const memo = (fn, options2) => {
  if (isObservableFrozen(fn)) {
    return fn;
  } else if (isUntracked(fn)) {
    return frozen(fn());
  } else {
    const memo2 = new Memo(fn, options2);
    const observable2 = readable(memo2.observable);
    return observable2;
  }
};
function resolve(value) {
  if (isFunction$1(value)) {
    if (SYMBOL_UNTRACKED_UNWRAPPED in value) {
      return resolve(value());
    } else if (SYMBOL_UNTRACKED in value) {
      return frozen(resolve(value()));
    } else if (SYMBOL_OBSERVABLE in value) {
      return value;
    } else {
      return memo(() => resolve(value()));
    }
  }
  if (value instanceof Array) {
    const resolved = new Array(value.length);
    for (let i = 0, l = resolved.length; i < l; i++) {
      resolved[i] = resolve(value[i]);
    }
    return resolved;
  } else {
    return value;
  }
}
frozen(-1);
frozen(-1);
function observable(value, options2) {
  return writable(new Observable(value, options2));
}
function createContext(defaultValue) {
  const symbol = Symbol();
  const Provider = ({ value, children }) => {
    return context({ [symbol]: value }, () => {
      return resolve(children);
    });
  };
  const Context2 = { Provider };
  CONTEXTS_DATA.set(Context2, { symbol, defaultValue });
  return Context2;
}
var n = function(t2, s, r, e) {
  var u;
  s[0] = 0;
  for (var h = 1; h < s.length; h++) {
    var p = s[h++], a = s[h] ? (s[0] |= p ? 1 : 2, r[s[h++]]) : s[++h];
    3 === p ? e[0] = a : 4 === p ? e[1] = Object.assign(e[1] || {}, a) : 5 === p ? (e[1] = e[1] || {})[s[++h]] = a : 6 === p ? e[1][s[++h]] += a + "" : p ? (u = t2.apply(a, n(t2, a, r, ["", null])), e.push(u), a[0] ? s[0] |= 2 : (s[h - 2] = 0, s[h] = u)) : e.push(a);
  }
  return e;
}, t = /* @__PURE__ */ new Map();
function htm(s) {
  var r = t.get(this);
  return r || (r = /* @__PURE__ */ new Map(), t.set(this, r)), (r = n(this, r.get(s) || (r.set(s, r = function(n2) {
    for (var t2, s2, r2 = 1, e = "", u = "", h = [0], p = function(n3) {
      1 === r2 && (n3 || (e = e.replace(/^\s*\n\s*|\s*\n\s*$/g, ""))) ? h.push(0, n3, e) : 3 === r2 && (n3 || e) ? (h.push(3, n3, e), r2 = 2) : 2 === r2 && "..." === e && n3 ? h.push(4, n3, 0) : 2 === r2 && e && !n3 ? h.push(5, 0, true, e) : r2 >= 5 && ((e || !n3 && 5 === r2) && (h.push(r2, 0, e, s2), r2 = 6), n3 && (h.push(r2, n3, 0, s2), r2 = 6)), e = "";
    }, a = 0; a < n2.length; a++) {
      a && (1 === r2 && p(), p(a));
      for (var l = 0; l < n2[a].length; l++) t2 = n2[a][l], 1 === r2 ? "<" === t2 ? (p(), h = [h], r2 = 3) : e += t2 : 4 === r2 ? "--" === e && ">" === t2 ? (r2 = 1, e = "") : e = t2 + e[0] : u ? t2 === u ? u = "" : e += t2 : '"' === t2 || "'" === t2 ? u = t2 : ">" === t2 ? (p(), r2 = 1) : r2 && ("=" === t2 ? (r2 = 5, s2 = e, e = "") : "/" === t2 && (r2 < 5 || ">" === n2[a][l + 1]) ? (p(), 3 === r2 && (h = h[0]), r2 = h, (h = h[0]).push(2, 0, r2), r2 = 0) : " " === t2 || "	" === t2 || "\n" === t2 || "\r" === t2 ? (p(), r2 = 2) : e += t2), 3 === r2 && "!--" === e && (r2 = 4, h = h[0]);
    }
    return p(), h;
  }(s)), r), arguments, [])).length > 1 ? r : r[0];
}
const render = (child, parent) => {
  if (!parent || !(parent instanceof HTMLElement)) throw new Error("Invalid parent node");
  parent.textContent = "";
  return root((dispose) => {
    setChild(parent, child);
    return () => {
      dispose();
      parent.textContent = "";
    };
  });
};
var _a, _b;
!!((_b = (_a = globalThis.CDATASection) == null ? void 0 : _a.toString) == null ? void 0 : _b.call(_a).match(/^\s*function\s+CDATASection\s*\(\s*\)\s*\{\s*\[native code\]\s*\}\s*$/));
const registry = {};
const h2 = (type, props, ...children) => createElement(registry[type] || type, props, ...children);
const register = (components) => void assign(registry, components);
assign(htm.bind(h2), { register });
let nanoid = (size = 21) => crypto.getRandomValues(new Uint8Array(size)).reduce((id, byte) => {
  byte &= 63;
  if (byte < 36) {
    id += byte.toString(36);
  } else if (byte < 62) {
    id += (byte - 26).toString(36).toUpperCase();
  } else if (byte > 62) {
    id += "-";
  } else {
    id += "_";
  }
  return id;
}, "");
const isTemp = (s) => !!s.raw;
const extract = (C, props, classNames) => {
  const { className, ...p } = props;
  const cls = p.class;
  delete p.class;
  return /* @__PURE__ */ jsx(C, { class: [classNames, cls, className], ...p });
};
const append = (child, parent) => {
  return effect(() => {
    const [c, p] = [get(get(child)), get(get(parent))];
    p.appendChild(c);
    const um = () => p.removeChild(c);
    return um;
  });
};
function Styled(comp) {
  function styled2(strings, ...values) {
    if (isTemp(strings)) {
      const C = comp;
      const N = "_" + nanoid(10);
      effect(() => {
        const r = `.${N} {
${strings.map((str, i) => i < values.length ? str + get(values[i]) : str).join("")}
}`;
        return append(/* @__PURE__ */ jsx("style", { id: N, children: r }), document.head);
      });
      return C ? (props) => extract(C, props, N) : N;
    }
    return Styled(strings).styled;
  }
  return { comp, styled: styled2 };
}
const styled = Styled().styled;
createContext();
function useComputedStyle(target, patterns = []) {
  const styles = observable({});
  effect(() => {
    if (!get(target)) return () => {
    };
    const getMatchingStyles = () => {
      const computedStyle = window.getComputedStyle(get(target));
      const matchedStyles = {};
      for (const property of computedStyle) {
        if (patterns.some(
          (pattern) => typeof pattern === "string" ? property === pattern : pattern.test(property)
        )) {
          matchedStyles[property] = computedStyle.getPropertyValue(property);
        }
      }
      return matchedStyles;
    };
    styles(getMatchingStyles());
    const observer = new MutationObserver(() => {
      const updatedStyles = getMatchingStyles();
      styles((prevStyles) => {
        const hasChanges = Object.keys(updatedStyles).some(
          (key) => updatedStyles[key] !== prevStyles[key]
        );
        return hasChanges ? updatedStyles : prevStyles;
      });
    });
    observer.observe(get(target), {
      attributes: true,
      attributeFilter: ["style", "class"],
      subtree: false
    });
    return () => observer.disconnect();
  });
  return styles;
}
const tooltipDef = `text-left border-b-[#666] border-b border-dotted 
[&:hover_.tpcontents]:visible [&:hover_.tpcontents]:opacity-100
`;
const tooltip = `inline-block relative 
[&:hover_.tpcontents]:visible [&:hover_.tpcontents]:opacity-100
`;
const topDef = `bg-[#eeeeee] min-w-max box-border border shadow-[0_1px_8px_#000000] transition-opacity duration-[0.8s] px-5 py-2.5 rounded-lg border-solid border-[#000000] `;
const top = `absolute z-[99999999] left-2/4 -top-5 `;
const top_i = `absolute overflow-hidden top-full after:content-[''] after:absolute after:-translate-x-2/4 after:-translate-y-2/4 after:rotate-45 after:left-2/4 `;
const rightDef = `bg-[#eeeeee] min-w-max box-border border shadow-[0_1px_8px_#000000] transition-opacity duration-[0.8s] px-5 py-2.5 rounded-lg border-solid border-[#000000] `;
const right = `absolute z-[99999999] ml-5 left-full top-2/4 `;
const right_i = `absolute overflow-hidden right-full after:content-[''] after:absolute after:translate-x-2/4 after:-translate-y-2/4 after:-rotate-45 after:left-0 after:top-2/4 `;
const bottomDef = `bg-[#eeeeee] min-w-max box-border border shadow-[0_1px_8px_#000000] transition-opacity duration-[0.8s] px-5 py-2.5 rounded-lg border-solid border-[#000000] `;
const bottom = `absolute z-[99999999] left-2/4 top-10 `;
const bottom_i = `absolute overflow-hidden bottom-full after:content-[''] after:absolute after:-translate-x-2/4 after:translate-y-2/4 after:rotate-45 after:left-2/4 `;
const leftDef = `bg-[#eeeeee] min-w-max box-border border shadow-[0_1px_8px_#000000] transition-opacity duration-[0.8s] px-5 py-2.5 rounded-lg border-solid border-[#000000] `;
const left = `absolute z-[99999999] mr-5 right-full top-2/4 `;
const left_i = `absolute overflow-hidden left-full after:content-[''] after:absolute after:-translate-x-2/4 after:-translate-y-2/4 after:-rotate-45 after:left-0 after:top-2/4 `;
const Tooltip = ({ children, class: cls = tooltipDef, className, ...props }) => {
  return /* @__PURE__ */ jsx("div", { class: [tooltip, cls, className], children });
};
function cssMultiply(value, multiplier) {
  const match = (get(value) + "").match(/^(-?\d*\.?\d+)([a-z%]*)$/);
  if (!match)
    throw new Error(`Invalid CSS unit: ${get(value)}`);
  const [, numericValue, unit] = match;
  const result = +numericValue * multiplier;
  return `${result}${unit}`;
}
const x2 = (value) => cssMultiply(value, 2);
const translate = (x, y) => `translate(${get(x)}, ${get(y)})`;
const TooltipContent = ({ children, style, class: cls = observable(), className, static: st, position = "top", arrowLocation = "50%", arrowSize = "12px", ...props }) => {
  const setDef = () => {
    if (!get(cls))
      switch (get(position)) {
        case "top":
          cls(topDef);
        case "left":
          cls(leftDef);
        case "right":
          cls(rightDef);
        case "bottom":
          cls(bottomDef);
      }
  };
  effect(setDef);
  setDef();
  const pos = memo(() => {
    switch (get(position)) {
      case "top":
        return top;
      case "right":
        return right;
      case "bottom":
        return bottom;
      case "left":
        return left;
    }
  });
  const transform = memo(() => {
    switch (get(position)) {
      case "top":
        return translate("-" + get(arrowLocation), "-100%");
      case "left":
      case "right":
        return translate("0", "-" + get(arrowLocation));
      case "bottom":
        return translate("-" + get(arrowLocation), "0");
    }
  });
  const ali = memo(() => {
    switch (get(position)) {
      case "bottom":
      case "top":
        return { left: arrowLocation };
      case "left":
      case "right":
        return { top: arrowLocation };
    }
  });
  const ii = memo(() => {
    switch (get(position)) {
      case "top":
        return top_i + styled`  
                margin-left:-${get(arrowSize)};
                width:${x2(arrowSize)};
                height:${get(arrowSize)};

                &::after{
                    width:${get(arrowSize)};
                    height:${get(arrowSize)};
                }
     `;
      case "right":
        return right_i + styled`  
                margin-top:-${get(arrowSize)};
                width:${get(arrowSize)};
                height:${x2(arrowSize)};

                &::after{
                    width:${get(arrowSize)};
                    height:${get(arrowSize)};
                }
     `;
      case "bottom":
        return bottom_i + styled`  
                margin-left:-${get(arrowSize)};
                width:${x2(arrowSize)};
                height:${get(arrowSize)};

                &::after{
                    width:${get(arrowSize)};
                    height:${get(arrowSize)};
                }
     `;
      case "left":
        return left_i + styled`  
                margin-top:-${get(arrowSize)};
                width:${get(arrowSize)};
                height:${x2(arrowSize)};

                &::after{
                    width:${get(arrowSize)};
                    height:${get(arrowSize)};
                }
     `;
    }
  });
  const tp = observable();
  const ir = observable();
  const sty = useComputedStyle(tp, ["background-color", /^border-(?!.*-radius$)/, "box-shadow"]);
  return /* @__PURE__ */ jsx("div", { ref: tp, class: [pos, cls, () => get(st) ? "" : "invisible opacity-0", className, "tpcontents"], style: [style, { transform }], ...props, children: [
    children,
    () => /* @__PURE__ */ jsx("i", { ref: ir, class: [ii, styled`
                &::after{
                    ${Object.keys(get(sty)).map((k) => `${k}:${get(sty)[k]};
`).join("")}
                }
            `], style: ali })
  ] });
};
const Demo = () => {
  observable();
  return /* @__PURE__ */ jsx("div", { class: "place-items-center h-screen bg-gray-100", children: [
    "DEMO",
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("table", { class: "[&_td]:h-[7rem] [&_td]:w-[7rem] [&_td]:text-center ", children: /* @__PURE__ */ jsx("tbody", { children: [
      /* @__PURE__ */ jsx("tr", { children: [
        /* @__PURE__ */ jsx("td", {}),
        /* @__PURE__ */ jsx("td", { children: [
          "  ",
          /* @__PURE__ */ jsx("div", { class: "top", children: /* @__PURE__ */ jsx(Tooltip, { children: [
            "Top",
            /* @__PURE__ */ jsx(TooltipContent, { position: "top", class: `bg-[#009cdc] text-[white] min-w-[300px] box-border border shadow-[0_1px_8px_#000000] transition-opacity duration-[0.8s] px-5 py-2.5 rounded-lg border-solid border-[#000000] `, children: [
              /* @__PURE__ */ jsx("h3", { class: "font-[22px] font-bold", children: "Lorem Ipsum" }),
              /* @__PURE__ */ jsx("ul", { children: [
                /* @__PURE__ */ jsx("li", { children: "Aliquam ac odio ut est" }),
                /* @__PURE__ */ jsx("li", { children: "Cras porttitor orci" })
              ] })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx("td", {})
      ] }),
      /* @__PURE__ */ jsx("tr", { children: [
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(Tooltip, { children: [
          "Left",
          /* @__PURE__ */ jsx(TooltipContent, { position: "left", children: [
            /* @__PURE__ */ jsx("h3", { children: "Lorem Ipsum" }),
            /* @__PURE__ */ jsx("ul", { children: [
              /* @__PURE__ */ jsx("li", { children: "Aliquam ac odio ut est aliquet tempor vitae sed arcu" }),
              /* @__PURE__ */ jsx("li", { children: "Cras porttitor orci ac porta gravida" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("td", {}),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(Tooltip, { children: [
          "Right",
          /* @__PURE__ */ jsx(TooltipContent, { position: "right", class: "min-w-[200px] w-[400px] translate-x-0 -translate-y-2/4 text-[#EEEEEE] bg-[#444444] box-border shadow-[0_1px_8px_rgba(0,0,0,0.5)] transition-opacity duration-[0.8s] p-5 rounded-lg left-full top-2/4", children: [
            /* @__PURE__ */ jsx("img", { src: "https://www.menucool.com/tooltip/cssttp/tooltip-head.jpg" }),
            /* @__PURE__ */ jsx("h3", { class: "font-[22px] font-bold", children: "Fade in Effect" }),
            /* @__PURE__ */ jsx("ul", { children: [
              /* @__PURE__ */ jsx("li", { children: "This demo has fade in/out effect." }),
              /* @__PURE__ */ jsx("li", { children: "It is using CSS opacity, visibility, and transition property to toggle the tooltip." }),
              /* @__PURE__ */ jsx("li", { children: [
                "Other demos are using display property",
                /* @__PURE__ */ jsx("em", { children: "(none or block)" }),
                " for the toggle."
              ] })
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("tr", { children: [
        /* @__PURE__ */ jsx("td", {}),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(Tooltip, { children: [
          "Bottom",
          /* @__PURE__ */ jsx(TooltipContent, { position: "bottom", class: `bg-[#eeeeee] min-w-[400px] box-border border shadow-[0_1px_8px_#000000] transition-opacity duration-[0.8s] px-5 py-2.5 rounded-lg border-solid border-[#000000] `, children: [
            /* @__PURE__ */ jsx("img", { class: "w-[400px]", src: "https://www.menucool.com/tooltip/cssttp/css-tooltip-image.jpg" }),
            /* @__PURE__ */ jsx("h3", { class: "font-[22px] font-bold", children: "CSS Tooltip" }),
            /* @__PURE__ */ jsx("p", { children: "The CSS tooltip appears when user moves the mouse over an element, or when user tap the element with a mobile device." })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("td", {})
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx(Tooltip, { children: [
      "Static & Multiple",
      /* @__PURE__ */ jsx(TooltipContent, { position: "top", static: true, children: "Top" }),
      /* @__PURE__ */ jsx(TooltipContent, { position: "bottom", static: true, children: "Bottom" }),
      /* @__PURE__ */ jsx(TooltipContent, { position: "left", children: "Left" }),
      /* @__PURE__ */ jsx(TooltipContent, { position: "right", children: "Right" })
    ] })
  ] });
};
render(/* @__PURE__ */ jsx(Demo, {}), document.getElementById("app"));
