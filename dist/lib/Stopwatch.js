"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Stopwatch_start, _Stopwatch_end;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stopwatch = void 0;
const datetime_1 = require("../util/datetime");
// MIT Copyright (c) 2020 The Sapphire Community and its contributors, gc
class Stopwatch {
    constructor(digits = 2) {
        Object.defineProperty(this, "digits", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        _Stopwatch_start.set(this, void 0);
        _Stopwatch_end.set(this, void 0);
        Object.defineProperty(this, "lastCheckpoint", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        this.digits = digits;
        __classPrivateFieldSet(this, _Stopwatch_start, performance.now(), "f");
        __classPrivateFieldSet(this, _Stopwatch_end, null, "f");
    }
    get duration() {
        return __classPrivateFieldGet(this, _Stopwatch_end, "f") ? __classPrivateFieldGet(this, _Stopwatch_end, "f") - __classPrivateFieldGet(this, _Stopwatch_start, "f") : performance.now() - __classPrivateFieldGet(this, _Stopwatch_start, "f");
    }
    get running() {
        return Boolean(!__classPrivateFieldGet(this, _Stopwatch_end, "f"));
    }
    restart() {
        __classPrivateFieldSet(this, _Stopwatch_start, performance.now(), "f");
        __classPrivateFieldSet(this, _Stopwatch_end, null, "f");
        return this;
    }
    reset() {
        __classPrivateFieldSet(this, _Stopwatch_start, performance.now(), "f");
        __classPrivateFieldSet(this, _Stopwatch_end, __classPrivateFieldGet(this, _Stopwatch_start, "f"), "f");
        return this;
    }
    start() {
        if (!this.running) {
            __classPrivateFieldSet(this, _Stopwatch_start, performance.now() - this.duration, "f");
            __classPrivateFieldSet(this, _Stopwatch_end, null, "f");
        }
        return this;
    }
    stop() {
        if (this.running)
            __classPrivateFieldSet(this, _Stopwatch_end, performance.now(), "f");
        return this;
    }
    toString() {
        const time = this.duration;
        if (time >= 1000)
            return `${(time / 1000).toFixed(this.digits)}s`;
        if (time >= 1)
            return `${time.toFixed(this.digits)}ms`;
        return `${(time * 1000).toFixed(this.digits)}μs`;
    }
    check(text) {
        const checkTime = performance.now() - (this.lastCheckpoint ?? __classPrivateFieldGet(this, _Stopwatch_start, "f"));
        const checkTimeStr = checkTime > 0 ? `${(0, datetime_1.formatDuration)(checkTime, true)}` : '';
        console.log(`${this.toString()}: ${text} in ${checkTimeStr}`);
        this.lastCheckpoint = performance.now();
    }
}
exports.Stopwatch = Stopwatch;
_Stopwatch_start = new WeakMap(), _Stopwatch_end = new WeakMap();
//# sourceMappingURL=Stopwatch.js.map