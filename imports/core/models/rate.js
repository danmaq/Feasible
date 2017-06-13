'use strict';

import { Exchange } from '../enums/exchange.js'
import { Pair } from '../enums/pair.js'
import { Swap } from './swap.js'

/** Exchange rate data. */
export class Rate {
    /**
     * Initialize new object.
     * @param pair Currency pair (See: Pair module).
     * @param tick Timestamp.
     * @param ask Ask point.
     * @param bid Bid point.
     * @param swap Swap point.
     */
    constructor(
        pair = Pair.USDJPY,
        tick = new Date(),
        ask = 0,
        bid = 0,
        swap = new Swap()) {
        this._pair = pair;
        this._tick = tick;
        this._ask = ask;
        this._bid = bid;
        this._swap = swap;
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

    /** Swap point. */
    get swap() {
        return this._swap;
    }

    /** Spread point. */
    get spread() {
        return this._spread;
    }

    /** Get point by exchange type. */
    orderPoint(exchange = Exchange.BUY) {
        return exchange === Exchange.BUY ? this.ask : this.bid;
    }

    /** Get stop point by exchange type. */
    stopPoint(exchange = Exchange.BUY) {
        return exchange === Exchange.BUY ? this.bid : this.ask;
    }

    /** Get gap between rate. */
    gain(rate = new Rate(), exchange = Exchange.BUY) {
        const order = this.orderPoint(exchange);
        const stop = rate.stopPoint(exchange);
        return (order - stop) * exchange;
    }
}