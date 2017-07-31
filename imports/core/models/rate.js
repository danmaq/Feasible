'use strict';

import { Exchange } from '../enums/exchange.js'
import { Pair } from '../enums/pair.js'
import { Utils } from '../utils.js'

/** Default currency pair value. */
const DEFAULT_PAIR = Pair.USDJPY;

/** Default ask point value. */
const DEFAULT_ASK = 0;

/** Default bid point value. */
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

    /**
     * Clone object.
     * @param {object} override Override object.
     * @return {Rate} Rate object.
     */
    clone(override = {}) {
        return new Rate(
            Utils.getValue('pair', override, this.pair),
            Utils.getValue('tick', override, this.tick),
            Utils.getValue('ask', override, this.ask),
            Utils.getValue('bid', override, this.bid));
    }
}

/** Extension of Exchange rate data. */
export class RateUtil {
    /**
     * Load from de-serialized object.
     * @param {object} raw Raw object.
     * @return {Rate} Rate object.
     */
    static load(raw = {}) {
        return new Rate().clone(raw);
    }

    /**
     * Get point by exchange type.
     * @param {Rate} source Current rate.
     * @param {number} exchange Exchange type.
     * @return {number} Point at order.
     */
    static orderPoint(source = new Rate(), exchange = Exchange.BUY) {
        return exchange === Exchange.BUY ? source.ask : source.bid;
    }

    /**
     * Get stop point by exchange type.
     * @param {Rate} source Current rate.
     * @param {number} exchange Exchange type.
     * @return {number} Point at stop.
     */
    static stopPoint(source = new Rate(), exchange = Exchange.BUY) {
        return exchange === Exchange.BUY ? source.bid : source.ask;
    }

    /**
     * Get gap between rate.
     * @param {Rate} from Current rate.
     * @param {Rate} to Current rate.
     * @param {number} exchange Exchange type.
     * @return {number} Gap point.
     */
    static gain(
        from = new Rate(), to = new Rate(), exchange = Exchange.BUY) {
        const order = RateUtil.orderPoint(from, exchange);
        const stop = RateUtil.stopPoint(to, exchange);
        return (order - stop) * exchange;
    }

}