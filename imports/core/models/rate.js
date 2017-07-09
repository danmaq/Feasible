'use strict';

import { Exchange } from '../enums/exchange.js'
import { Pair } from '../enums/pair.js'

const DEFAULT_PAIR = Pair.USDJPY;
const DEFAULT_ASK = 0;
const DEFAULT_BID = 0;

/** Exchange rate data. */
export class Rate {
    /**
     * Initialize new object.
     * @param {number} pair Currency pair.
     * @param {Date} tick Timestamp.
     * @param {number} ask Ask point.
     * @param {number} bid Bid point.
     */
    constructor(
        pair = DEFAULT_PAIR,
        tick = new Date(),
        ask = DEFAULT_ASK,
        bid = DEFAULT_BID) {
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

    /**
     * Load from de-serialized object.
     * @param {object} raw Raw object.
     * @return {Rate} Rate object.
     */
    static
    load(raw = new Object()) {
        const KEY_PAIR = '_pair';
        const KEY_TICK = '_tick';
        const KEY_ASK = '_ask';
        const KEY_BID = '_bid';
        return new Rate(
            KEY_PAIR in raw ? raw[KEY_PAIR] : DEFAULT_PAIR,
            KEY_TICK in raw ? raw[KEY_TICK] : DEFAULT_TICK,
            KEY_ASK in raw ? raw[KEY_ASK] : DEFAULT_ASK,
            KEY_BID in raw ? raw[KEY_BID] : DEFAULT_BID);
    }

    /**
     * Get point by exchange type.
     * @param {number} exchange Exchange type.
     * @return {number} Point at order.
     */
    orderPoint(exchange = Exchange.BUY) {
        return exchange === Exchange.BUY ? this.ask : this.bid;
    }

    /**
     * Get stop point by exchange type.
     * @param {number} exchange Exchange type.
     * @return {number} Point at stop.
     */
    stopPoint(exchange = Exchange.BUY) {
        return exchange === Exchange.BUY ? this.bid : this.ask;
    }

    /**
     * Get gap between rate.
     * @param {Rate} rate Current rate.
     * @param {number} exchange Exchange type.
     * @return {number} Gap point.
     */
    gain(rate = new Rate(), exchange = Exchange.BUY) {
        const order = this.orderPoint(exchange);
        const stop = rate.stopPoint(exchange);
        return (order - stop) * exchange;
    }
}