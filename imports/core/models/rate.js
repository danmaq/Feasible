'use strict';

import { Exchange } from '../enums/exchange.js'
import { Pair } from '../enums/pair.js'

/** Exchange rate data. */
class Rate {
    /**
     * Initialize new object.
     * @param pair Currency pair (See: Pair module).
     * @param tick Timestamp.
     * @param ask Ask point.
     * @param bid Bid point.
     */
    constructor(pair = Pair.USDJPY, tick = new Date(), ask = 0, bid = 0) {
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
    getOrderPoint(exchange = Exchange.Buy) {
        return exchange === Exchange.Buy ? this.ask : this.bid;
    }

    /** Get stop point by exchange type. */
    getStopPoint(exchange = Exchange.Buy) {
        return exchange === Exchange.Buy ? this.bid : this.ask;
    }
}