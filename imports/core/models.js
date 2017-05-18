'use strict';

import { Pair, Exchange } from './enum.js'

/** Account data. */
class Account {
    /**
     * Initialize new object.
     * @param pair Currency pair (see Pair module)
     * @param step Step range of next action.
     * @param mul Initial multiply rate.
     */
    constructor(pair, step, mul) {
        this._pair = pair;
        this._step = step;
        this._mul = mul;
    }

    /** Currency pair. */
    get pair() {
        return this._pair;
    }

    /** Step range of next action (PIPS). */
    get step() {
        return this._step;
    }

    /** Initial multiply rate. */
    get mul() {
        return this._mul;
    }
}

/** Swap point data. */
class Swap {
    /**
     * Initialize new object.
     * @param long Long swap.
     * @param short Short swap.
     */
    constructor(long, short) {
        this._long = long;
        this._short = short;
    }

    /** Long swap. */
    get long() {
        return this._long;
    }

    /** Short swap. */
    get short() {
        return this._short;
    }

    /** Get swap point. */
    point(exType) {
        return exType === Exchange.Buy ? this.long : this.short;
    }
}

/** Exchange rate data. */
class Rate {
    /**
     * Initialize new object.
     * @param pair Currency pair (See: Pair module).
     * @param tick Timestamp.
     * @param ask Ask point.
     * @param bid Bid point.
     */
    constructor(pair, tick, ask, bid) {
        this._pair = pair;
        this._tick = tick;
        this._ask = ask;
        this._bid = bid;
    }

    /** Currency pair. */
    get pair() {
        return this._pair;
    }
}