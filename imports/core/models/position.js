'use strict';

import { Model } from './model.js';
import { Exchange, ExchangeUtil } from '../enums/exchange.js';
import { Rate, RateUtil } from './rate.js';

/** Default ordered quantity value. */
const DEFAULT_QUANTITY = 1;

/** Default exchange type value. */
const DEFAULT_EXCHANGE = Exchange.BUY;

/** Default take profit value. */
const DEFAULT_TAKEPROFIT = Number.NaN;

/** Position model. */
export class Position extends Model {
    /**
     * Initialize new object.
     * @param {Rate} rate Rate at ordered.
     * @param {number} quantity Ordered quantity.
     * @param {number} exchange Exchange type.
     * @param {number} takeProfit Take profit.
     */
    constructor(
        rate = new Rate(),
        quantity = DEFAULT_QUANTITY,
        exchange = DEFAULT_EXCHANGE,
        takeProfit = DEFAULT_TAKEPROFIT) {
        this._rate = rate;
        this._quantity = quantity;
        this._exchange = exchange;
        this._takeProfit = takeProfit;
    }

    /** Rate at ordered. */
    get rate() {
        return this._rate;
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
            new Rate(
                RateUtil.load(this.importValue('rate', override)),
                this.importValue('quantity', override),
                this.importValue('exchange', override),
                this.importValue('takeProfit', override));
        return result;
    }
}

/** Extension of Position model. */
export class PositionUtil {
    /**
     * Load from de-serialized object.
     * @param {object} raw Raw object.
     * @return {Position} Position object.
     */
    static load(raw = {}) {
        return new Position().clone(raw);
    }

    /**
     * Get stringed exchange type.
     * @param {Position} source Source object.
     * @return {string} Stringed exchange type.
     */
    static strExchange(source = new Position()) {
        return ExchangeUtil.toStr(source.exchange);
    }

    /**
     * Get gain point.
     * @param {Position} source Source object.
     * @param {Rate} rate Current rate.
     * @return {number} Gain point.
     */
    static gain(source = new Position(), rate = new Rate()) {
        const traded = source.rate.tick;
        // TODO: Swap calculation.
        const ex = source.exchange;
        return RateUtil.gain(source.rate, rate, ex) * source.quantity;
    }

    /**
     * Can be take profit.
     * @param {Rate} rate Current rate.
     * @return {boolean} If can be take profit, return true.
     */
    static profit(source = new Position(), rate = new Rate()) {
        const ex = source.exchange;
        const sp = RateUtil.stopPoint(source.rate, ex);
        const tp = source.takeProfit;
        return ex === Exchange.BUY ? sp >= tp : sp <= tp;
    }
}