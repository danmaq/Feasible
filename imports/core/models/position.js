'use strict';

import { Exchange } from '../enums/exchange.js'
import { Rate } from './rate.js'

const DEFAULT_QUANTITY = 1;
const DEFAULT_EXCHANGE = Exchange.BUY;
const DEFAULT_TAKEPROFIT = Number.NaN;

/** Position model. */
export class Position {
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
     * Load from de-serialized object.
     * @param {object} raw Raw object.
     * @return {Position} Position object.
     */
    static load(raw = new Object()) {
        const KEY_RATE = '_rate';
        const KEY_QUANTITY = '_quantity';
        const KEY_EXCHANGE = '_exchange';
        const KEY_TP = '_takeProfit';
        return new Position(
            KEY_RATE in raw ? raw[KEY_RATE] : new Rate(),
            KEY_QUANTITY in raw ? raw[KEY_QUANTITY] : DEFAULT_QUANTITY,
            KEY_EXCHANGE in raw ? raw[KEY_EXCHANGE] : DEFAULT_EXCHANGE,
            KEY_TP in raw ? raw[KEY_TP] : DEFAULT_TAKEPROFIT);
    }

    /**
     * Get gain point.
     * @param {Rate} rate Current rate.
     * @return {number} Gain point.
     */
    gain(rate = new Rate()) {
        var traded = this.rate.tick;
        // TODO: Swap calculation.
        return this.rate.gain(rate, this.exchange) * this.quantity;
    }

    /**
     * Can be take profit.
     * @param {Rate} rate Current rate.
     * @return {boolean} If can be take profit, return true.
     */
    isProfit(rate = new Rate()) {
        const ex = this.exchange;
        const sp = this.rate.stopPoint(ex);
        const tp = this.takeProfit;
        return ex === Exchange.BUY ? sp >= tp : sp <= tp;
    }
}