'use strict';

import IdModel from './idModel.js';

import { Exchange, ExchangeUtil } from '../enums/exchange.js';
import { Pair } from '../enums/pair.js';

/** Exchange rate data. */
export default class Rate extends IdModel {
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
    clone(override = {}) {
        const keys = ['pair', 'tick', 'ask', 'bid'];
        return new Rate(this.getValues(keys, override));
    }

    /** Load from de-serialized object. */
    static load = (raw = {}) => new Rate().clone(raw);

    /** Get order price by exchange type. */
    static orderPrice = (src = new Rate(), exchange = Exchange.BUY) =>
        exchange === Exchange.BUY ? src.ask : src.bid;

    /** Get stop price by exchange type. */
    static stopPrice = (src = new Rate(), exchange = Exchange.BUY) =>
        exchange === Exchange.BUY ? src.bid : src.ask;

    /** Get price and tick by exchange type. */
    static priceAndTick = (src = new Rate(), exchange = Exchange.BUY) =>
        ({ "price": Rate.orderPrice(src, exchange), "tick": src.tick });

    /** Get gap between rate exclude swap. */
    static gain = (
        from = new Rate(), to = new Rate(), exchange = Exchange.BUY) =>
            (RateUtil.orderPrice(from, exchange) -
             RateUtil.stopPrice(to, exchange)) * exchange;
}
