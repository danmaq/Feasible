'use strict';

import { IdModel } from './idModel.js';
import { Exchange } from '../enums/exchange.js';
import { Rate, RateUtil } from './rate.js';
import { Swap, SwapUtil } from './swap.js';

/** Position model. */
export class Position extends IdModel {
    /** Initialize new object. */
    constructor({
        accountId = '',
        price = 0,
        tick = new Date(),
        quantity = 1,
        exchange = Exchange.BUY,
        takeProfit = Number.NaN
    } = {}) {
        super();
        this._accountId = accountId;
        this._tick = tick;
        this._price = price;
        this._quantity = quantity;
        this._exchange = exchange;
        this._takeProfit = takeProfit;
    }

    /** Key of account. */
    get accountId() {
        return this._accountId;
    }

    /** Date-Time at ordered. */
    get tick() {
        return this._tick;
    }

    /** Price at ordered. */
    get price() {
        return this._price;
    }

    /** Ordered quantity. */
    get quantity() {
        return this._quantity;
    }

    /** Exchange type. */
    get exchange() {
        return this._exchange;
    }

    /** Take profit. */
    get takeProfit() {
        return this._takeProfit;
    }

    /**
     * Clone object.
     * @param {object} override Override object.
     * @return {Position} Position object.
     */
    innerClone(override = {}) {
        const result =
            new Position({
                "acccountId": this.importValue('accountId', override),
                "tick": this.importValue('tick', override),
                "price": this.importValue('price', override),
                "quantity": this.importValue('quantity', override),
                "exchange": this.importValue('exchange', override),
                "takeProfit": this.importValue('takeProfit', override)
            });
        return result;
    }

    /**
     * Export object data for Mongo.
     * @return {object} data object.
     */
    exportWithoutId() {
        let result = super.exportWithoutId();
        result._rate = this.rate.exportWithoutId();
        return result;
    }

    /** Load from de-serialized object. */
    static load = (raw = {}) => new Position().clone(raw);
}

/** Extension of Position model. */
export class PositionUtil {
    /** Get gain point. */
    static gain = ({
        source = new Position(),
        rate = new Rate(),
        swap = new Swap(),
    } = {}) => {
        const gap = rate.tick.getTime() - source.tick.getTime();
        const day = (gap / (86400000)) >> 0;
        const sp = SwapUtil.point(swap, source.exchange) * day;
        // TODO: Swap calculation.
        const ex = source.exchange;
        return RateUtil.gain(source.rate, rate, ex) * source.quantity;
    }

    /** Can be take profit. */
    static profit = ({
        source = new Position(),
        rate = new Rate()
    } = {}) => {
        const ex = source.exchange;
        const sp = RateUtil.stopPoint(rate, ex);
        const tp = source.takeProfit;
        return !Number.isNaN(tp) && ex === Exchange.BUY ? sp >= tp : sp <= tp;
    }
}