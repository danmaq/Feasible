'use strict';

import { IdModel } from './idModel.js';
import { Exchange } from '../enums/exchange.js';
import { Pair } from '../enums/pair.js';

/** Exchange rate data. */
export class Rate extends IdModel {
    /** Initialize new object. */
    constructor({
        pair = Pair.USDJPY,
        tick = new Date(),
        ask = 0,
        bid = 0
    } = {}) {
        super();
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
    innerClone(override = {}) {
        const result =
            new Rate(
                {
                    "pair": this.importValue('pair', override),
                    "tick": this.importValue('tick', override),
                    "ask": this.importValue('ask', override),
                    "bid": this.importValue('bid', override)
                });
        return result;
    }

    /**
     * Load from de-serialized object.
     * @param {object} raw Raw object.
     * @return {Rate} Rate object.
     */
    static load(raw = {}) {
        return new Rate().clone(raw);
    }
}

/** Extension of Exchange rate data. */
export class RateUtil {
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