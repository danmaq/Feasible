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
     * @return {Rate} Model object.
     */
    clone(override = {}) {
        return super.clone(override);
    }

    /**
     * Clone object.
     * @param {object} override Override object.
     * @return {Rate} Rate object.
     */
    innerClone(override = {}) {
        const keys = ['pair', 'tick', 'ask', 'bid'];
        return new Rate(this.getValues(keys, override));
    }

    /** Load from de-serialized object. */
    static load = (raw = {}) => new Rate().clone(raw);
}

/** Extension of Exchange rate data. */
export class RateUtil {
    /** Get point by exchange type. */
    static orderPoint = (source = new Rate(), exchange = Exchange.BUY) =>
        exchange === Exchange.BUY ? source.ask : source.bid;

    /** Get stop point by exchange type. */
    static stopPoint = (source = new Rate(), exchange = Exchange.BUY) =>
        exchange === Exchange.BUY ? source.bid : source.ask;

    /** Get gap between rate. */
    static gain = (
        from = new Rate(), to = new Rate(), exchange = Exchange.BUY) => {
        const order = RateUtil.orderPoint(from, exchange);
        const stop = RateUtil.stopPoint(to, exchange);
        return (order - stop) * exchange;
    }
}