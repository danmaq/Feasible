'use strict';

import { Pair, Exchange } from './enum.js'

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
        this._spread = ask - bid;
    }

    /** Currency pair. */
    get pair() {
        return this._pair;
    }

    /** Timestamp. */
    get tick() {
        return this._tick;
    }

    /** Ask point. */
    get ask() {
        return this._ask;
    }

    /** Bid point. */
    get bid() {
        return this._bid;
    }

    /** Spread point. */
    get spread() {
        return this._spread;
    }

    /** Get point by exchange type. */
    getOrderPoint(exType) {
        return exType === Exchange.Buy ? this.ask : this.bid;
    }

    /** Get point by exchange type. */
    getStopPoint(exType) {
        return exType === Exchange.Buy ? this.bid : this.ask;
    }
}

class Position {
    /**
     * Initialize new object.
     * @param rate Rate instance.
     * @param quantity Ordered quantity.
     * @param exType Exchange type.
     */
    constructor(rate, quantity, exType) {
        this._rate = rate;
        this._quantity = quantity;
        this._exType = exType;
    }

    /** Rate instance. */
    get rate() {
        return this._rate;
    }

    /** Ordered quantity. */
    get quantity() {
        return this._quantity;
    }

    /** Exchange type. */
    get exchangeType() {
        return this._exType;
    }
}

class Order {
    /**
     * Initialize new object.
     * @param rate Rate instance.
     * @param quantity Ordered quantity.
     * @param exType Exchange type.
     */
    constructor(rate, quantity, exType) {
        this._rate = rate;
        this._quantity = quantity;
        this._exType = exType;
    }

    /** Rate instance. */
    get rate() {
        return this._rate;
    }

    /** Ordered quantity. */
    get quantity() {
        return this._quantity;
    }

    /** Exchange type. */
    get exchangeType() {
        return this._exType;
    }
}